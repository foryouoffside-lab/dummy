'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, GitBranch, Brain, X, Trophy, Info
} from 'lucide-react';

export default function ContextSwitchPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
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
  const [bestLatency, setBestLatency] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [flashIntensity, setFlashIntensity] = useState(0);
  
  const stateRef = useRef("IDLE");
  const currentValRef = useRef(null);
  const currentZoneRef = useRef("");
  const startTimeRef = useRef(0);
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const totalAttemptsRef = useRef(0);
  const hitsRef = useRef(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const autoChangeTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const flashTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const spawnTimeoutRef = useRef(null);
  const potentialPointsRef = useRef(0); // Store potential points for penalty

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('contextSwitchBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('contextSwitchBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('contextSwitchBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
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

  const triggerFlash = () => {
    setFlashIntensity(40);
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    flashTimeoutRef.current = setTimeout(() => setFlashIntensity(0), 100);
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
      
      if (type === 'correct') {
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
      } else if (type === 'wrong') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'switch') {
        osc.frequency.value = 660;
        gain.gain.value = 0.06;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.08);
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
  };

  // Calculate potential points based on current streak
  const calculatePotentialPoints = () => {
    const newStreak = streakRef.current + 1;
    let pointsEarned = 0;
    const elapsed = performance.now() - startTimeRef.current;
    
    if (elapsed < 500) pointsEarned = 40;
    else if (elapsed < 800) pointsEarned = 30;
    else if (elapsed < 1100) pointsEarned = 20;
    else pointsEarned = 10;
    
    const streakBonus = Math.floor(newStreak / 5) * 5;
    pointsEarned += streakBonus;
    
    return pointsEarned;
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            if (autoChangeTimeoutRef.current) clearTimeout(autoChangeTimeoutRef.current);
            if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
            
            // Calculate final accuracy
            const total = successfulHits + mistakes;
            const finalAccuracy = total === 0 ? 100 : Math.round((successfulHits / total) * 100);
            setAccuracy(finalAccuracy);
            
            // Update best score ONLY when game ends
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
  }, [gameState, timeLeft, successfulHits, mistakes]);

  const nextQuestion = () => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    // Clear any pending timeouts
    if (autoChangeTimeoutRef.current) clearTimeout(autoChangeTimeoutRef.current);
    if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
    
    let val = Math.floor(Math.random() * 9) + 1;
    if (val === 5) val = 7;
    currentValRef.current = val;
    
    currentZoneRef.current = Math.random() > 0.5 ? "TOP" : "BOTTOM";
    stateRef.current = "ACTIVE";
    startTimeRef.current = performance.now();
    
    triggerFlash();
    playSound('switch');
    
    // Auto-fail after 1.5 seconds
    autoChangeTimeoutRef.current = setTimeout(() => {
      if (stateRef.current === "ACTIVE" && isActiveRef.current && gameStateRef.current === 'playing') {
        fail("TIMEOUT");
      }
    }, 1500);
  };

  const fail = (reason) => {
    if (!isActiveRef.current) return;
    
    if (autoChangeTimeoutRef.current) clearTimeout(autoChangeTimeoutRef.current);
    if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
    
    // Calculate penalty points (same as potential gain)
    const penaltyPoints = calculatePotentialPoints();
    
    streakRef.current = 0;
    setStreak(0);
    setMistakes(prev => prev + 1);
    const newScore = Math.max(0, scoreRef.current - penaltyPoints);
    scoreRef.current = newScore;
    setScore(newScore);
    showFeedback(`✗ ${reason}! -${penaltyPoints}`, 'error');
    playSound('wrong');
    triggerFlash();
    
    setMistakes(prev => {
      const newMistakes = prev + 1;
      if (newMistakes >= 5) {
        setScore(0);
        scoreRef.current = 0;
        showFeedback('⚠️ Score reset! 5 mistakes!', 'warning');
        return 0;
      }
      return newMistakes;
    });
    
    stateRef.current = "COOLDOWN";
    
    // Next question after short delay
    spawnTimeoutRef.current = setTimeout(() => {
      if (isActiveRef.current && gameStateRef.current === 'playing') {
        nextQuestion();
      }
    }, 300);
  };

  const getButtons = (cvs) => {
    const cx = cvs.width / 2;
    const cy = currentZoneRef.current === "TOP" ? cvs.height * 0.3 : cvs.height * 0.7;
    const btnW = 140;
    const btnH = 50;
    const gap = 20;
    
    return {
      left: { 
        x: cx - btnW - gap/2, 
        y: cy + 40, 
        w: btnW, 
        h: btnH, 
        text: currentZoneRef.current === "TOP" ? "EVEN" : "< 5" 
      },
      right: { 
        x: cx + gap/2, 
        y: cy + 40, 
        w: btnW, 
        h: btnH, 
        text: currentZoneRef.current === "TOP" ? "ODD" : "> 5" 
      }
    };
  };

  useEffect(() => {
    const handleMouseDown = () => {
      if (gameState !== 'playing' || !isActiveRef.current) return;
      
      if (stateRef.current === "IDLE") {
        nextQuestion();
        return;
      }
      if (stateRef.current !== "ACTIVE") return;
      
      const cvs = canvasRef.current;
      if (!cvs) return;
      
      const mouse = mousePositionRef.current;
      const btns = getButtons(cvs);
      
      const isLeft = mouse.x > btns.left.x && mouse.x < btns.left.x + btns.left.w && 
                     mouse.y > btns.left.y && mouse.y < btns.left.y + btns.left.h;
      const isRight = mouse.x > btns.right.x && mouse.x < btns.right.x + btns.right.w && 
                      mouse.y > btns.right.y && mouse.y < btns.right.y + btns.right.h;
      
      if (!isLeft && !isRight) return;
      
      totalAttemptsRef.current++;
      
      let correct = false;
      if (currentZoneRef.current === "TOP") {
        const even = currentValRef.current % 2 === 0;
        correct = (even && isLeft) || (!even && isRight);
      } else {
        const less = currentValRef.current < 5;
        correct = (less && isLeft) || (!less && isRight);
      }
      
      if (correct) {
        if (autoChangeTimeoutRef.current) clearTimeout(autoChangeTimeoutRef.current);
        
        const latency = Math.floor(performance.now() - startTimeRef.current);
        hitsRef.current++;
        setSuccessfulHits(prev => prev + 1);
        
        if (bestLatency === 0 || latency < bestLatency) {
          setBestLatency(latency);
        }
        
        const newStreak = streakRef.current + 1;
        streakRef.current = newStreak;
        setStreak(newStreak);
        
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        
        let pointsEarned = 0;
        if (latency < 500) pointsEarned = 40;
        else if (latency < 800) pointsEarned = 30;
        else if (latency < 1100) pointsEarned = 20;
        else pointsEarned = 10;
        
        const streakBonus = Math.floor(newStreak / 5) * 5;
        pointsEarned += streakBonus;
        
        scoreRef.current += pointsEarned;
        setScore(scoreRef.current);
        showFeedback(`✓ ${latency}ms | +${pointsEarned}`, 'success');
        
        if (newStreak % 5 === 0 && newStreak > 0) {
          playSound('streak');
          showFeedback(`🔥 ${newStreak} Streak!`, 'success');
        } else {
          playSound('correct');
        }
        
        stateRef.current = "COOLDOWN";
        
        // Next question after short delay
        spawnTimeoutRef.current = setTimeout(() => {
          if (isActiveRef.current && gameStateRef.current === 'playing') {
            nextQuestion();
          }
        }, 250);
      } else {
        fail("WRONG");
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [gameState, bestLatency, bestStreak]);

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
      if (autoChangeTimeoutRef.current) clearTimeout(autoChangeTimeoutRef.current);
      if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
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
    
    setTimeout(() => {
      if (isActiveRef.current && gameStateRef.current === 'playing' && stateRef.current === "IDLE") {
        nextQuestion();
      }
    }, 300);

    function draw() {
      // Base background with flash effect
      const flashBg = flashIntensity > 0 ? `rgb(${20 + flashIntensity}, ${20 + flashIntensity}, ${20 + flashIntensity})` : (isBoxDarkMode ? "#020202" : "#f9fafb");
      ctx.fillStyle = flashBg;
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Subtle grid pattern
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, cvs.height);
        ctx.stroke();
      }
      
      // Horizontal divider
      ctx.beginPath();
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 2;
      ctx.moveTo(0, cvs.height / 2);
      ctx.lineTo(cvs.width, cvs.height / 2);
      ctx.stroke();

      // Zone labels
      ctx.font = "bold 12px monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = isBoxDarkMode ? "#666" : "#999";
      ctx.fillText("PARITY ZONE (Even/Odd)", cvs.width / 2, 25);
      ctx.fillText("MAGNITUDE ZONE (<5 / >5)", cvs.width / 2, cvs.height - 15);

      if (stateRef.current === "ACTIVE" && currentValRef.current !== null) {
        const btns = getButtons(cvs);
        const yText = currentZoneRef.current === "TOP" ? cvs.height * 0.3 : cvs.height * 0.7;
        
        // Zone indicator
        ctx.fillStyle = currentZoneRef.current === "TOP" ? "rgba(255, 165, 0, 0.1)" : "rgba(0, 165, 255, 0.1)";
        ctx.fillRect(0, currentZoneRef.current === "TOP" ? 0 : cvs.height / 2, cvs.width, cvs.height / 2);
        
        ctx.fillStyle = isBoxDarkMode ? "#FFFFFF" : "#000000";
        ctx.font = "bold 80px monospace";
        ctx.textAlign = "center";
        ctx.fillText(currentValRef.current, cvs.width / 2, yText);
        
        ctx.font = "bold 14px monospace";
        
        [btns.left, btns.right].forEach(btn => {
          const m = mousePositionRef.current;
          const isHover = m.x > btn.x && m.x < btn.x + btn.w && m.y > btn.y && m.y < btn.y + btn.h;
          
          ctx.strokeStyle = isHover ? "#00ff88" : (isBoxDarkMode ? "#444" : "#ccc");
          ctx.lineWidth = isHover ? 3 : 1.5;
          ctx.strokeRect(btn.x, btn.y, btn.w, btn.h);
          ctx.fillStyle = isHover ? "#00ff88" : (isBoxDarkMode ? "#888" : "#999");
          ctx.fillText(btn.text, btn.x + btn.w / 2, btn.y + btn.h / 2 + 5);
        });
      }

      // Crosshair
      const m = mousePositionRef.current;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) {
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x - 14, m.y); ctx.lineTo(m.x + 14, m.y);
        ctx.moveTo(m.x, m.y - 14); ctx.lineTo(m.x, m.y + 14);
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
  }, [gameState, isBoxDarkMode, flashIntensity]);

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setBestLatency(0);
    setTimeLeft(60);
    setMistakes(0);
    setSuccessfulHits(0);
    setFeedback('');
    setAccuracy(100);
    
    isActiveRef.current = true;
    stateRef.current = "IDLE";
    streakRef.current = 0;
    scoreRef.current = 0;
    totalAttemptsRef.current = 0;
    hitsRef.current = 0;
    
    if (autoChangeTimeoutRef.current) clearTimeout(autoChangeTimeoutRef.current);
    if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
    
    setTimeout(() => {
      if (isActiveRef.current) {
        nextQuestion();
      }
    }, 300);
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setBestLatency(0);
    setTimeLeft(60);
    setMistakes(0);
    setSuccessfulHits(0);
    setFeedback('');
    setAccuracy(100);
    
    if (autoChangeTimeoutRef.current) clearTimeout(autoChangeTimeoutRef.current);
    if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
  };

  const formatTime = (s) => `${s}s`;

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  if (status === 'unauthenticated') return null;

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/productivity" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Productivity Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Context Switch Lab</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Flash questioning • 1.5s per question</p>
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
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Current Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time Left" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-500" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<X className="text-red-500" />} value={`${mistakes}/5`} label="Mistakes" isDark={isDarkMode} />
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
            <>
              <div className="absolute top-4 right-4 z-30 flex gap-3">
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
                <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
              </div>
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
                Score: <span className="text-yellow-400">{score}</span> | Time: <span className={timeLeft < 15 ? 'text-red-400' : 'text-green-400'}>{timeLeft}s</span> | Streak: <span className="text-orange-400">{streak}</span>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <GitBranch className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Context Switch Lab</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • 1.5s per question • Symmetric scoring</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <ResultCard label="Best Latency" value={bestLatency || '-'} unit="ms" icon={<Timer className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Mistakes" value={mistakes} icon={<X className="w-4 h-4" />} color="text-red-500" />
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={resetGame} 
                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">TOP ZONE (Orange):</span> Even → Left / Odd → Right
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">BOTTOM ZONE (Blue):</span> &lt;5 → Left / &gt;5 → Right
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">1.5 seconds per question</span> - Answer fast or auto-fail
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">Wrong = Lose what you could have gained</span> (symmetric scoring)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Faster = More Points</span> (&lt;500ms: +40, &lt;800ms: +30, &lt;1100ms: +20, else +10)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">5 mistakes reset score</span> • Best Score saves locally
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🔄 Flash on new question • Zone highlighted in orange/blue</span>
                  <span>⚡ Streak bonus: +5 per 5 streak • 250ms cooldown</span>
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
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' :
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