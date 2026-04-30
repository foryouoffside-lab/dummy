'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, GitBranch, Brain, Trophy, Info, Timer, TrendingUp, Heart, RefreshCw
} from 'lucide-react';

export default function ReactionChainProPage() {
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
  const [tempo, setTempo] = useState(1.0);
  const [bestTempo, setBestTempo] = useState(1.0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [bestReaction, setBestReaction] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [penalties, setPenalties] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [accuracy, setAccuracy] = useState(100);
  const [hitsCount, setHitsCount] = useState(0);
  
  const nodesRef = useRef([]);
  const scoreRef = useRef(0);
  const tempoRef = useRef(1.0);
  const streakRef = useRef(0);
  const livesRef = useRef(3);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(performance.now());
  const spawnTimerRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const totalAttemptsRef = useRef(0);
  const hitsRef = useRef(0);
  const penaltyAccumulatorRef = useRef(0);
  const hasActiveTargetRef = useRef(false);

  // Penalty settings
  const PENALTY = 1;
  // Base time for circle to disappear (300ms)
  const BASE_LIFE_TIME = 0.3; // 300 milliseconds

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('reactionChainBestScore');
    const savedBestStreak = localStorage.getItem('reactionChainBestStreak');
    if (savedBestScore) setBestScore(parseInt(savedBestScore, 10));
    if (savedBestStreak) setBestStreak(parseInt(savedBestStreak, 10));
  }, []);

  // Update best score only when game ends
  const updateBestScore = (finalScore) => {
    const currentBest = parseInt(localStorage.getItem('reactionChainBestScore') || '0', 10);
    if (finalScore > currentBest) {
      localStorage.setItem('reactionChainBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  // Update best tempo
  useEffect(() => {
    if (tempoRef.current > bestTempo) {
      setBestTempo(tempoRef.current);
    }
  }, [tempo]);

  // Calculate accuracy
  useEffect(() => {
    if (totalAttemptsRef.current > 0) {
      const acc = (hitsRef.current / totalAttemptsRef.current) * 100;
      setAccuracy(Math.round(acc));
    }
  }, [hitsCount, penalties]);

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
      const audioCtx = initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'hit') {
        osc.frequency.value = 880;
        gain.gain.value = 0.1;
      } else if (type === 'miss') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'highscore') {
        osc.frequency.value = 1318.52;
        gain.gain.value = 0.12;
      } else if (type === 'lifeLost') {
        osc.frequency.value = 330;
        gain.gain.value = 0.15;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.2);
        osc.stop(audioCtx.currentTime + 0.2);
        return;
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
            
            // Update best score ONLY when game ends
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

  const handleMiss = (reason) => {
    if (!isActiveRef.current) return;
    
    totalAttemptsRef.current++;
    setPenalties(prev => prev + 1);
    
    streakRef.current = 0;
    setStreak(0);
    tempoRef.current = Math.max(0.8, tempoRef.current - 0.1);
    setTempo(tempoRef.current);
    
    // Check lives
    if (livesRef.current > 0) {
      livesRef.current--;
      setLives(livesRef.current);
      playSound('miss');
      
      if (livesRef.current === 0) {
        playSound('lifeLost');
        showFeedback(`Out of lives! Penalty now active!`, 'warning');
      } else {
        showFeedback(`✗ ${reason}! No penalty • ${livesRef.current}  left`, 'error');
      }
    } else {
      // Out of lives - apply penalty
      scoreRef.current = Math.max(0, scoreRef.current - PENALTY);
      setScore(Math.floor(scoreRef.current));
      playSound('miss');
      showFeedback(`✗ ${reason}! -${PENALTY} point penalty`, 'error');
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

  const spawnNode = (cvs) => {
    if (!cvs) return;
    
    const padding = 100;
    // Life decreases as tempo increases (faster disappearance)
    const lifeTime = BASE_LIFE_TIME / tempoRef.current;
    
    nodesRef.current.push({
      x: padding + Math.random() * (cvs.width - padding * 2),
      y: padding + Math.random() * (cvs.height - padding * 2),
      r: 32,
      life: lifeTime,
      birth: performance.now()
    });
    
    hasActiveTargetRef.current = true;
  };

  useEffect(() => {
    const handleMouseDown = () => {
      if (gameState !== 'playing' || !isActiveRef.current) return;
      
      const mouse = mousePositionRef.current;
      
      // Check if there's an active target
      if (nodesRef.current.length === 0) {
        // Click with no ball - penalty
        handleMiss('Empty click');
        return;
      }
      
      const target = nodesRef.current[0];
      const dist = Math.hypot(mouse.x - target.x, mouse.y - target.y);
      const hitRadius = target.r + 15;

      if (dist < hitRadius) {
        const reactionMs = Math.floor(performance.now() - target.birth);
        
        totalAttemptsRef.current++;
        hitsRef.current++;
        setHitsCount(hitsRef.current);
        
        if (bestReaction === 0 || reactionMs < bestReaction) {
          setBestReaction(reactionMs);
        }
        
        nodesRef.current.shift();
        hasActiveTargetRef.current = nodesRef.current.length > 0;
        
        // +1 point per hit
        scoreRef.current += 1;
        setScore(Math.floor(scoreRef.current));
        
        const newStreak = streakRef.current + 1;
        streakRef.current = newStreak;
        setStreak(newStreak);
        
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
          localStorage.setItem('reactionChainBestStreak', newStreak.toString());
        }
        
        // Increase tempo with each hit (makes circles disappear faster)
        tempoRef.current = Math.min(2.5, tempoRef.current + 0.025);
        setTempo(tempoRef.current);
        
        if (scoreRef.current > bestScore && scoreRef.current > parseInt(localStorage.getItem('reactionChainBestScore') || '0', 10)) {
          playSound('highscore');
          showFeedback(`🏆 New Record! ${scoreRef.current}`, 'success');
        } else if (newStreak % 5 === 0 && newStreak > 0) {
          playSound('streak');
          showFeedback(`🔥 ${newStreak} Streak!`, 'success');
        } else {
          playSound('hit');
          showFeedback(`✓ ${reactionMs}ms | +1`, 'success');
        }
      } else {
        // Clicked but missed the ball
        handleMiss('Miss');
        nodesRef.current = [];
        spawnTimerRef.current = 0;
        hasActiveTargetRef.current = false;
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, [gameState, bestReaction, bestStreak]);

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
    
    let lastFrameTime = performance.now();

    function update(dt, now, cvs) {
      if (!isActiveRef.current) return;
      
      // Spawn new nodes - faster spawn as tempo increases
      spawnTimerRef.current += dt;
      const interval = Math.max(0.2, 0.6 / tempoRef.current);
      if (spawnTimerRef.current > interval && nodesRef.current.length < 8) {
        spawnNode(cvs);
        spawnTimerRef.current = 0;
      }
      
      // Check for timeouts (circle disappeared without being clicked) - NO PENALTY
      for (let i = nodesRef.current.length - 1; i >= 0; i--) {
        const node = nodesRef.current[i];
        const age = (now - node.birth) / 1000;
        if (age >= node.life) {
          // Timeout - just remove the node, no penalty
          nodesRef.current = [];
          spawnTimerRef.current = 0;
          hasActiveTargetRef.current = false;
          break;
        }
      }
    }

    function draw() {
      const now = performance.now();
      const dt = Math.min(0.033, (now - lastFrameTime) / 1000);
      lastFrameTime = now;
      
      update(dt, now, cvs);
      
      // Clear canvas
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Background grid
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
        ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke();
      }
      
      const mouse = mousePositionRef.current;
      
      // Draw nodes from oldest to newest
      for (let i = nodesRef.current.length - 1; i >= 0; i--) {
        const node = nodesRef.current[i];
        const age = (now - node.birth) / 1000;
        const prog = Math.min(1, age / node.life);
        
        if (prog >= 1) continue;
        
        const isFirst = (i === 0);
        const shrinkFactor = 1 - prog * 0.4;
        
        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * shrinkFactor, 0, Math.PI * 2);
        
        if (isFirst) {
          ctx.strokeStyle = "#00ff88";
          ctx.lineWidth = 3.5;
        } else {
          ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
          ctx.lineWidth = 1.5;
        }
        ctx.stroke();
        
        if (isFirst) {
          // Inner dot
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#00ff88";
          ctx.fill();
          
          // Timer ring (shows remaining time)
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r + 6, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * (1 - prog)));
          ctx.strokeStyle = "#00ff88";
          ctx.lineWidth = 2.5;
          ctx.stroke();
          
          // Guide line to target
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = "rgba(0, 255, 136, 0.2)";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([5, 8]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Rounded Cursor Circle
      if (mouse.x > 0 && mouse.x < cvs.width && mouse.y > 0 && mouse.y < cvs.height) {
        // Outer ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Inner dot
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#00ff88";
        ctx.fill();
        
        // Crosshair lines
        ctx.strokeStyle = "rgba(0, 255, 136, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 20, mouse.y); ctx.lineTo(mouse.x - 14, mouse.y);
        ctx.moveTo(mouse.x + 14, mouse.y); ctx.lineTo(mouse.x + 20, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 20); ctx.lineTo(mouse.x, mouse.y - 14);
        ctx.moveTo(mouse.x, mouse.y + 14); ctx.lineTo(mouse.x, mouse.y + 20);
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
    setTempo(1.0);
    setBestTempo(1.0);
    setStreak(0);
    setTimeLeft(60);
    setLives(3);
    setPenalties(0);
    setFeedback('');
    setAccuracy(100);
    setHitsCount(0);
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    tempoRef.current = 1.0;
    streakRef.current = 0;
    livesRef.current = 3;
    nodesRef.current = [];
    spawnTimerRef.current = 0;
    totalAttemptsRef.current = 0;
    hitsRef.current = 0;
    penaltyAccumulatorRef.current = 0;
    hasActiveTargetRef.current = false;
    
    showFeedback('60 seconds • Click targets before they disappear!', 'success');
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setTempo(1.0);
    setStreak(0);
    setTimeLeft(60);
    setLives(3);
    setPenalties(0);
    setFeedback('');
    setAccuracy(100);
    setHitsCount(0);
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
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
          <Link href="/drills/physical" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Physical Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Reaction Chain Pro</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+1 per hit • Timeout = NO penalty • 3  • 60s</p>
              </div>
            </div>
            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} title="Reset session">
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

        {/* Drill-specific stats board */}
        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Heart className={lives === 0 ? 'text-yellow-500' : 'text-red-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-purple-600" />} value={tempo.toFixed(2)} label="Tempo" unit="x" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
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
            overflow: 'hidden',
            cursor: 'none'
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

          {/* Lives indicator overlay */}
          {gameState === 'playing' && lives === 0 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-yellow-500/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-yellow-400 text-sm font-medium">⚠️ PENALTY ACTIVE - Each miss costs 1 point</span>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <GitBranch className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Reaction Chain Pro</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Click targets • Timeout = NO penalty</p>
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
              <div className={`rounded-2xl p-8 shadow-xl border w-[520px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time's Up!</h3>
                </div>
                
                <p className={`text-center mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60 seconds completed!
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-blue-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Reaction" value={bestReaction || '-'} unit="ms" icon={<Timer className="w-4 h-4" />} color="text-green-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-purple-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Hits" value={hitsCount} icon={<Target className="w-4 h-4" />} color="text-cyan-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Peak Tempo" value={bestTempo.toFixed(2)} unit="x" icon={<TrendingUp className="w-4 h-4" />} color="text-pink-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Lives Left" value={lives} icon={<Heart className="w-4 h-4" />} color="text-red-500" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/physical" className="flex-1">
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

        {/* Drill Rules Section */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click the <span className="font-semibold text-green-500">GREEN target</span> before it disappears</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-emerald-500">+1 point per successful hit</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-red-500">-1 point penalty</span> ONLY when out of lives (for misses/empty clicks)</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Each hit increases <span className="font-semibold text-purple-500">Tempo</span> - targets disappear faster</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-pink-500">3  protection</span> • No score penalty until lives reach 0</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">Timeout = NO penalty</span> • Only misses cost lives/points</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Base time: 300ms • Shrinking ring = remaining time</span>
                  <span>⚡ Best Score saves locally</span>
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

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const bgColor = color === 'text-blue-500' ? 'bg-blue-500/10' : 
                   color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' :
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' : 
                   color === 'text-pink-500' ? 'bg-pink-500/10' : 'bg-red-500/10';
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${bgColor}`}>
      <div className="flex items-center gap-2">
        <div className={color}>{icon}</div>
        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-lg ${color}`}>{value}{unit}</span>
    </div>
  );
}