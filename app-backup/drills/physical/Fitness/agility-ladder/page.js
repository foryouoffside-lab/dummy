'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Move, Brain, TrendingUp, Trophy, Info, Timer, AlertCircle, Grid
} from 'lucide-react';

export default function MonochromeAgilityLadderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
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
  const [laddersCompleted, setLaddersCompleted] = useState(0);
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(150);
  
  // Game refs
  const mousePos = useRef({ x: 0, y: 0 });
  const ladders = useRef([]);
  const scrollY = useRef(0);
  const scrollSpeed = useRef(150);
  const isPenaltyActive = useRef(false);
  const animationId = useRef(null);
  const timerInterval = useRef(null);
  const audioCtx = useRef(null);
  const scoreValue = useRef(0);
  const streakValue = useRef(0);
  const penaltyValue = useRef(0);
  const laddersValue = useRef(0);
  const canvasSize = useRef({ width: 0, height: 0 });

  // Ladder class
  class Ladder {
    constructor(yPos) {
      this.y = yPos;
      this.rungs = [
        { side: 'left', x: -40, active: false, stepped: false },
        { side: 'right', x: 40, active: false, stepped: false },
        { side: 'left', x: -40, active: false, stepped: false },
        { side: 'right', x: 40, active: false, stepped: false }
      ];
      this.currentRungIndex = 0;
      this.completed = false;
      this.failed = false;
    }

    checkStep(mouseX, mouseY, scrollOffset, canvasWidth, canvasHeight) {
      if (this.completed || this.failed) return false;
      
      const screenY = this.y + scrollOffset;
      const centerX = canvasWidth / 2;
      const rungSpacing = 45;
      
      if (screenY > canvasHeight + 100 || screenY < -100) return false;
      
      const currentRung = this.rungs[this.currentRungIndex];
      const rungY = screenY + (this.currentRungIndex * rungSpacing);
      const rungX = centerX + currentRung.x;
      
      const dist = Math.hypot(mouseX - rungX, mouseY - rungY);
      
      if (dist < 15 && !currentRung.stepped) {
        currentRung.stepped = true;
        currentRung.active = true;
        this.currentRungIndex++;
        
        if (this.currentRungIndex >= 4) {
          this.completed = true;
          return { type: 'complete', points: 50 };
        }
        return { type: 'step', points: 10 };
      }
      
      return false;
    }

    checkFailure(scrollOffset, canvasHeight) {
      if (this.completed || this.failed) return false;
      
      const screenY = this.y + scrollOffset;
      if (screenY > canvasHeight - 50 && this.currentRungIndex < 4) {
        this.failed = true;
        return true;
      }
      return false;
    }

    draw(ctx, scrollOffset, canvasWidth, canvasHeight) {
      const screenY = this.y + scrollOffset;
      const centerX = canvasWidth / 2;
      const rungSpacing = 45;
      
      if (screenY > canvasHeight + 200 || screenY < -200) return;
      
      // Draw rails
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX - 50, screenY - 20);
      ctx.lineTo(centerX - 50, screenY + 180);
      ctx.moveTo(centerX + 50, screenY - 20);
      ctx.lineTo(centerX + 50, screenY + 180);
      ctx.stroke();
      
      // Draw rungs
      this.rungs.forEach((rung, i) => {
        const rungY = screenY + (i * rungSpacing);
        const rungX = centerX + rung.x;
        
        ctx.beginPath();
        ctx.rect(rungX - 12, rungY - 12, 24, 24);
        
        if (rung.stepped) {
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
        } else if (i === this.currentRungIndex && !this.completed && !this.failed) {
          ctx.strokeStyle = "#00ff88";
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          ctx.strokeStyle = this.failed ? "#222222" : "#555555";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });
      
      // Draw completion indicator (checkmark)
      if (this.completed) {
        ctx.beginPath();
        ctx.moveTo(centerX - 8, screenY + 85);
        ctx.lineTo(centerX - 2, screenY + 93);
        ctx.lineTo(centerX + 10, screenY + 78);
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  }

  // Load best score
  useEffect(() => {
    const saved = localStorage.getItem('monochromeAgilityBestScore');
    if (saved) setBestScore(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerInterval.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            if (timerInterval.current) clearInterval(timerInterval.current);
            if (animationId.current) cancelAnimationFrame(animationId.current);
            const finalScore = Math.floor(scoreValue.current);
            const savedBest = parseInt(localStorage.getItem('monochromeAgilityBestScore') || '0', 10);
            if (finalScore > savedBest) {
              localStorage.setItem('monochromeAgilityBestScore', finalScore.toString());
              setBestScore(finalScore);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, [gameState]);

  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.current.state === 'suspended') {
        audioCtx.current.resume();
      }
      const osc = audioCtx.current.createOscillator();
      const gain = audioCtx.current.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.current.destination);
      
      if (type === 'step') {
        osc.frequency.value = 660;
        gain.gain.value = 0.08;
      } else if (type === 'complete') {
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
      } else if (type === 'fail') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.current.currentTime + 0.15);
      osc.stop(audioCtx.current.currentTime + 0.15);
    } catch (e) {}
  };

  const showFeedback = (message, type) => {
    setFeedback(message);
    setFeedbackType(type);
    setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  };

  const applyPenalty = () => {
    if (isPenaltyActive.current) return;
    
    isPenaltyActive.current = true;
    
    streakValue.current = 0;
    const penaltyAmount = 20;
    scoreValue.current = Math.max(0, scoreValue.current - penaltyAmount);
    penaltyValue.current++;
    scrollSpeed.current = Math.max(100, scrollSpeed.current - 20);
    
    setScore(scoreValue.current);
    setStreak(0);
    setPenaltyCount(penaltyValue.current);
    setCurrentSpeed(Math.floor(scrollSpeed.current));
    
    playSound('fail');
    showFeedback(`✗ Missed rung! -${penaltyAmount}`, 'error');
    
    setTimeout(() => {
      isPenaltyActive.current = false;
    }, 300);
  };

  // Mouse event handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      mousePos.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation and drawing
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      let width = rect.width;
      let height = width * (9 / 16);
      if (height > rect.height) {
        height = rect.height;
        width = height * (16 / 9);
      }
      canvas.width = width;
      canvas.height = height;
      canvas.style.position = 'absolute';
      canvas.style.left = `${(rect.width - width) / 2}px`;
      canvas.style.top = `${(rect.height - height) / 2}px`;
      
      canvasSize.current = { width, height };
    };
    
    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    resizeCanvas();
    
    // Initialize ladders
    ladders.current = [];
    for (let i = 0; i < 5; i++) {
      ladders.current.push(new Ladder(-i * 250));
    }
    scrollY.current = 0;
    
    let lastFrameTime = performance.now();
    
    const draw = () => {
      const now = performance.now();
      let dt = Math.min(0.033, (now - lastFrameTime) / 1000);
      lastFrameTime = now;
      
      if (dt > 0.05) dt = 0.033;
      
      const ctx = canvas.getContext('2d');
      const { width: canvasWidth, height: canvasHeight } = canvasSize.current;
      
      if (canvasWidth === 0 || canvasHeight === 0) {
        animationId.current = requestAnimationFrame(draw);
        return;
      }
      
      // Update scroll position
      scrollY.current += scrollSpeed.current * dt;
      
      // Check for rung steps and failures
      let stepResult = null;
      for (let i = 0; i < ladders.current.length; i++) {
        const ladder = ladders.current[i];
        
        const result = ladder.checkStep(
          mousePos.current.x, 
          mousePos.current.y, 
          scrollY.current, 
          canvasWidth, 
          canvasHeight
        );
        
        if (result) {
          stepResult = result;
          if (result.type === 'step') {
            streakValue.current++;
            scoreValue.current += result.points;
            setScore(scoreValue.current);
            setStreak(streakValue.current);
            if (streakValue.current > bestStreak) {
              setBestStreak(streakValue.current);
            }
            playSound('step');
            showFeedback(`✓ Rung! +${result.points}`, 'success');
          } else if (result.type === 'complete') {
            streakValue.current++;
            scoreValue.current += result.points;
            laddersValue.current++;
            scrollSpeed.current += 8;
            
            setScore(scoreValue.current);
            setStreak(streakValue.current);
            setLaddersCompleted(laddersValue.current);
            setCurrentSpeed(Math.floor(scrollSpeed.current));
            
            if (streakValue.current > bestStreak) {
              setBestStreak(streakValue.current);
            }
            playSound('complete');
            showFeedback(`🎉 Ladder Complete! +${result.points}`, 'success');
          }
          break;
        }
        
        const failed = ladder.checkFailure(scrollY.current, canvasHeight);
        if (failed) {
          applyPenalty();
          break;
        }
      }
      
      // Remove off-screen ladders and add new ones
      if (ladders.current.length > 0) {
        const firstLadder = ladders.current[0];
        if (firstLadder.y + scrollY.current > canvasHeight + 300) {
          ladders.current.shift();
          const lastY = ladders.current[ladders.current.length - 1].y;
          ladders.current.push(new Ladder(lastY - 250));
        }
      }
      
      // Background
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      
      // Grid lines
      ctx.strokeStyle = isBoxDarkMode ? "#0a0a0a" : "#e5e7eb";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvasWidth; i += 100) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasHeight);
        ctx.stroke();
      }
      
      // Draw all ladders
      ladders.current.forEach(ladder => {
        ladder.draw(ctx, scrollY.current, canvasWidth, canvasHeight);
      });
      
      // Center line
      ctx.strokeStyle = isBoxDarkMode ? "#111111" : "#dddddd";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2, 0);
      ctx.lineTo(canvasWidth / 2, canvasHeight);
      ctx.stroke();
      
      // Cursor
      const mouse = mousePos.current;
      if (mouse.x > 0 && mouse.x < canvasWidth && mouse.y > 0 && mouse.y < canvasHeight) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = isPenaltyActive.current ? "#ff0000" : "#FFFFFF";
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = isPenaltyActive.current ? "#ff0000" : "#FFFFFF";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      animationId.current = requestAnimationFrame(draw);
    };
    
    animationId.current = requestAnimationFrame(draw);
    
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
      resizeObserver.disconnect();
    };
  }, [gameState, isBoxDarkMode]);

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

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setFeedback('');
    setLaddersCompleted(0);
    setPenaltyCount(0);
    setCurrentSpeed(150);
    
    scoreValue.current = 0;
    streakValue.current = 0;
    penaltyValue.current = 0;
    laddersValue.current = 0;
    scrollSpeed.current = 150;
    scrollY.current = 0;
    isPenaltyActive.current = false;
    ladders.current = [];
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
          <Link href="/drills/physical" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Physical Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl">
                <Grid className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Monochrome Agility Ladder</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Step on rungs in sequence: Left → Right → Left → Right</p>
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
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Grid className="text-gray-500" />} value={laddersCompleted} label="Ladders" isDark={isDarkMode} />
          <StatCard icon={<AlertCircle className="text-red-500" />} value={penaltyCount} label="Penalties" isDark={isDarkMode} />
        </div>

        {/* Feedback */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Canvas */}
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
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none', width: '100%', height: '100%' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Grid className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Monochrome Agility Ladder</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Step on rungs in sequence: Left → Right → Left → Right</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Ladders Completed" value={laddersCompleted} icon={<Grid className="w-4 h-4" />} color="text-gray-500" />
                  <ResultCard label="Peak Speed" value={currentSpeed} unit="px/s" icon={<Activity className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Penalties" value={penaltyCount} icon={<AlertCircle className="w-4 h-4" />} color="text-red-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/physical" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Play Again →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rules */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Step on rungs in sequence: <span className="font-semibold">Left → Right → Left → Right</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-black text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct step = <span className="font-semibold text-green-500">+10 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete all 4 rungs = <span className="font-semibold text-green-500">+50 points bonus</span> + speed increase</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Miss a rung = <span className="font-semibold text-red-500">-20 point penalty</span> + speed decrease</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Speed increases with each ladder completed (+8 px/s)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60 second timer - Stay agile and maintain rhythm</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>⬅️ Left rung → ➡️ Right rung → ⬅️ Left rung → ➡️ Right rung</span>
                  <span>⚡ Hover over the highlighted rung to step</span>
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
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 
                   color === 'text-gray-500' ? 'bg-gray-500/10' :
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