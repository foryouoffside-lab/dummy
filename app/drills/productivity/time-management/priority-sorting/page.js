'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, GitBranch, Brain, X, Trophy, Info, Timer, Circle, Heart
} from 'lucide-react';

export default function PrioritySortingPage() {
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
  const [currentRule, setCurrentRule] = useState("RED");
  const [totalCleared, setTotalCleared] = useState(0);
  const [priorityCleared, setPriorityCleared] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const itemsRef = useRef([]);
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const totalAttemptsRef = useRef(0);
  const hitsRef = useRef(0);
  const priorityHitsRef = useRef(0);
  const currentRuleRef = useRef("RED");
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const spawnTimerRef = useRef(0);
  const ruleTimerRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  
  const colors = {
    "RED": "#FF3E3E",
    "GREEN": "#3EFF3E",
    "BLUE": "#3E3EFF"
  };
  const colorNames = Object.keys(colors);

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('prioritySortingBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('prioritySortingBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('prioritySortingBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

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
      
      if (type === 'correct') {
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
      } else if (type === 'priority') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'wrong') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1318.5;
        gain.gain.value = 0.12;
      } else if (type === 'rule') {
        osc.frequency.value = 660;
        gain.gain.value = 0.08;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.12);
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
  };

  // SIMPLIFIED: +1 point for correct clicks
  const calculatePoints = () => {
    return 1;
  };

  // Get penalty points (same as correct points)
  const getPenaltyPoints = () => {
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

  const fail = (reason) => {
    if (!isActiveRef.current) return;
    
    const penaltyPoints = getPenaltyPoints();
    
    streakRef.current = 0;
    setStreak(0);
    
    // Lose 1 life on mistake
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      showFeedback(`✗ ${reason}! -1 life (${livesRef.current} lives left)`, 'error');
      playSound('wrong');
      
      // When lives become 0, start applying point penalty
      if (livesRef.current === 0) {
        showFeedback(`⚠️ No lives left! Now penalties will deduct points!`, 'warning');
      }
    } else {
      // Lives are 0 - apply point penalty
      scoreRef.current = Math.max(0, scoreRef.current - penaltyPoints);
      setScore(scoreRef.current);
      playSound('wrong');
      showFeedback(`✗ ${reason}! -${penaltyPoints} point penalty`, 'error');
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

  class PriorityItem {
    constructor(forcedType = null, cvs) {
      const padding = 100;
      this.name = forcedType || colorNames[Math.floor(Math.random() * colorNames.length)];
      this.color = colors[this.name];
      this.x = padding + Math.random() * (cvs.width - padding * 2);
      this.y = padding + 60 + Math.random() * (cvs.height - padding * 2 - 60);
      this.baseSize = 28;
      this.life = 1.0;
      this.decayRate = 0.0025 + (Math.random() * 0.002);
      this.isPriority = this.name === currentRuleRef.current;
    }

    update() {
      this.life -= this.decayRate;
      return this.life > 0;
    }

    draw(ctx, currentRule, isBoxDarkMode) {
      const currentSize = Math.max(0, this.baseSize * this.life);
      const opacity = Math.max(0.3, this.life);
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = opacity;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      // Simple white border for all items
      ctx.beginPath();
      ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
      ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  const changeRule = () => {
    if (!isActiveRef.current) return;
    const newRule = colorNames[Math.floor(Math.random() * colorNames.length)];
    currentRuleRef.current = newRule;
    setCurrentRule(newRule);
    ruleTimerRef.current = 0;
    playSound('rule');
    
    if (canvasRef.current) {
      itemsRef.current.push(new PriorityItem(newRule, canvasRef.current));
    }
  };

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.button !== 0) return;
      if (gameState !== 'playing' || !isActiveRef.current) return;
      
      const mouse = mousePositionRef.current;
      let hitIdx = -1;
      
      for (let i = itemsRef.current.length - 1; i >= 0; i--) {
        const dist = Math.hypot(mouse.x - itemsRef.current[i].x, mouse.y - itemsRef.current[i].y);
        if (dist < itemsRef.current[i].baseSize + 8) {
          hitIdx = i;
          break;
        }
      }

      if (hitIdx !== -1) {
        const item = itemsRef.current[hitIdx];
        const isPriority = item.name === currentRuleRef.current;
        const priorityExists = itemsRef.current.some(it => it.name === currentRuleRef.current);
        
        totalAttemptsRef.current++;
        
        if (isPriority) {
          hitsRef.current++;
          priorityHitsRef.current++;
          setPriorityCleared(prev => prev + 1);
          setTotalCleared(prev => prev + 1);
          
          const pointsEarned = calculatePoints();
          
          const newStreak = streakRef.current + 1;
          streakRef.current = newStreak;
          setStreak(newStreak);
          
          if (newStreak > bestStreak) {
            setBestStreak(newStreak);
          }
          
          scoreRef.current += pointsEarned;
          setScore(scoreRef.current);
          
          if (newStreak % 5 === 0 && newStreak > 0) {
            playSound('streak');
            showFeedback(`🔥 ${newStreak} Streak! +${pointsEarned}`, 'success');
          } else {
            playSound('priority');
            showFeedback(`✓ Priority! +${pointsEarned}`, 'success');
          }
          
          itemsRef.current.splice(hitIdx, 1);
        } else if (priorityExists) {
          fail("Wrong Priority");
          itemsRef.current.splice(hitIdx, 1);
        } else {
          hitsRef.current++;
          setTotalCleared(prev => prev + 1);
          
          const pointsEarned = calculatePoints();
          
          const newStreak = streakRef.current + 1;
          streakRef.current = newStreak;
          setStreak(newStreak);
          
          if (newStreak > bestStreak) {
            setBestStreak(newStreak);
          }
          
          scoreRef.current += pointsEarned;
          setScore(scoreRef.current);
          
          showFeedback(`✓ +${pointsEarned}`, 'success');
          playSound('correct');
          
          itemsRef.current.splice(hitIdx, 1);
        }
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, [gameState, bestStreak]);

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
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    itemsRef.current = [];
    for (let i = 0; i < 4; i++) {
      itemsRef.current.push(new PriorityItem(null, cvs));
    }

    function updateGame() {
      if (!isActiveRef.current) return;
      
      spawnTimerRef.current++;
      if (spawnTimerRef.current > 35 && itemsRef.current.length < 12) {
        const forcePriority = Math.random() < 0.3 ? currentRuleRef.current : null;
        itemsRef.current.push(new PriorityItem(forcePriority, cvs));
        spawnTimerRef.current = 0;
      }

      ruleTimerRef.current++;
      if (ruleTimerRef.current > 200) changeRule();

      for (let i = itemsRef.current.length - 1; i >= 0; i--) {
        if (!itemsRef.current[i].update()) {
          if (itemsRef.current[i].name === currentRuleRef.current) {
            fail("Priority Missed");
          }
          itemsRef.current.splice(i, 1);
        }
      }
    }

    function draw() {
      updateGame();
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Subtle grid pattern
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      for (let i = 0; i < cvs.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke();
      }

      // Current Rule Display
      ctx.font = "bold 40px monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = colors[currentRuleRef.current];
      ctx.fillText(currentRuleRef.current, cvs.width / 2, 55);
      
      ctx.font = "bold 11px monospace";
      ctx.fillStyle = isBoxDarkMode ? "#666" : "#999";
      ctx.fillText("PRIORITY TARGET", cvs.width / 2, 75);

      // Draw Items
      for (const item of itemsRef.current) {
        item.draw(ctx, currentRuleRef.current, isBoxDarkMode);
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
  }, [gameState, isBoxDarkMode]);

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTotalCleared(0);
    setPriorityCleared(0);
    setTimeLeft(60);
    setLives(3);
    setFeedback('');
    setCurrentRule("RED");
    
    isActiveRef.current = true;
    streakRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = 3;
    totalAttemptsRef.current = 0;
    hitsRef.current = 0;
    priorityHitsRef.current = 0;
    currentRuleRef.current = "RED";
    itemsRef.current = [];
    spawnTimerRef.current = 0;
    ruleTimerRef.current = 0;
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTotalCleared(0);
    setPriorityCleared(0);
    setTimeLeft(60);
    setLives(3);
    setFeedback('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/productivity" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Productivity Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Priority Sorting</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click priority items • Rule changes every 3-4s</p>
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

        {/* Stats Board - Simplified with Lives */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Circle className="text-green-500" />} value={priorityCleared} label="Priority" isDark={isDarkMode} />
          <StatCard icon={<Target className="text-purple-500" />} value={totalCleared} label="Total" isDark={isDarkMode} />
          <StatCard icon={<Heart className={lives > 0 ? 'text-red-500' : 'text-gray-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
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
                Score: <span className="text-yellow-400">{score}</span> | Time: <span className={timeLeft < 15 ? 'text-red-400' : 'text-green-400'}>{timeLeft}s</span> | Lives: <span className="text-red-400">{lives}</span>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {/* Start Screen - No rules inside */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <GitBranch className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Priority Sorting</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Click priority targets</p>
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
                  <ResultCard label="Priority Hits" value={priorityCleared} icon={<Circle className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Total Cleared" value={totalCleared} icon={<Target className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Lives Left" value={lives} icon={<Heart className="w-4 h-4" />} color="text-red-500" />
                  <ResultCard label="Efficiency" value={totalCleared > 0 ? Math.round((priorityCleared / totalCleared) * 100) : 0} unit="%" icon={<Brain className="w-4 h-4" />} color="text-pink-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/productivity" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
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
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Click items matching the current color rule</span> (displayed at top)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">Any correct click: +1 point</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">Priority items: priority bonus +1 point</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">Wrong click: -1 life</span> (3 lives total)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">Rule changes every 3-4 seconds</span> • Stay alert
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">After lives reach 0 → -1 point penalty</span> • Best Score saves locally
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span> Items shrink and disappear over time • Click quickly</span>
                  <span> Game continues even at 0 lives • Best Score saves locally</span>
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
                   color === 'text-purple-500' ? 'bg-purple-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' : 'bg-pink-500/10';
  
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