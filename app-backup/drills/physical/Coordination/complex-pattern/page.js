'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, GitBranch, Brain, TrendingUp, Trophy, Info, Timer, AlertCircle
} from 'lucide-react';

export default function ComplexPatternElitePage() {
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
  const [patternsCompleted, setPatternsCompleted] = useState(0);
  const [currentComplexity, setCurrentComplexity] = useState(3);
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [phase, setPhase] = useState('memorize');
  
  const targetPattern = useRef([]);
  const userDrawing = useRef([]);
  const isDrawing = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const scoreValue = useRef(0);
  const streakValue = useRef(0);
  const complexityValue = useRef(3);
  const penaltyValue = useRef(0);
  const memorizeStartTime = useRef(0);
  const resultStartTime = useRef(0);
  const animationId = useRef(null);
  const timerInterval = useRef(null);
  const audioCtx = useRef(null);

  useEffect(() => {
    const savedBestScore = localStorage.getItem('complexPatternBestScore');
    if (savedBestScore) setBestScore(parseInt(savedBestScore, 10));
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerInterval.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            if (timerInterval.current) clearInterval(timerInterval.current);
            if (animationId.current) cancelAnimationFrame(animationId.current);
            const finalScore = Math.floor(scoreValue.current);
            const savedBest = parseInt(localStorage.getItem('complexPatternBestScore') || '0', 10);
            if (finalScore > savedBest) {
              localStorage.setItem('complexPatternBestScore', finalScore.toString());
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

  const generatePattern = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const numWaypoints = Math.min(6, Math.max(1, Math.floor(complexityValue.current) - 1));
    const pattern = [];
    const padding = 100;
    
    pattern.push({
      x: padding + Math.random() * (canvas.width - padding * 2),
      y: padding + Math.random() * (canvas.height - padding * 2),
      type: 'start',
      order: 0
    });
    
    for (let i = 0; i < numWaypoints; i++) {
      pattern.push({
        x: padding + Math.random() * (canvas.width - padding * 2),
        y: padding + Math.random() * (canvas.height - padding * 2),
        type: 'waypoint',
        order: i + 1
      });
    }
    
    pattern.push({
      x: padding + Math.random() * (canvas.width - padding * 2),
      y: padding + Math.random() * (canvas.height - padding * 2),
      type: 'end',
      order: pattern.length
    });
    
    targetPattern.current = pattern;
  };

  const startNewPattern = () => {
    generatePattern();
    setPhase('memorize');
    memorizeStartTime.current = performance.now();
    userDrawing.current = [];
    isDrawing.current = false;
  };

  const checkAccuracy = () => {
    if (targetPattern.current.length === 0 || userDrawing.current.length < 2) {
      return { accurate: false, error: 100, matchedWaypoints: 0, totalWaypoints: 0, accuracyPercent: 0 };
    }
    
    const waypoints = targetPattern.current.filter(p => p.type === 'waypoint');
    if (waypoints.length === 0) {
      return { accurate: true, error: 0, matchedWaypoints: 0, totalWaypoints: 0, accuracyPercent: 100 };
    }
    
    let matchedWaypoints = 0;
    let totalDistanceToWaypoints = 0;
    
    waypoints.forEach(waypoint => {
      let minDist = Infinity;
      userDrawing.current.forEach(userPoint => {
        const dist = Math.hypot(waypoint.x - userPoint.x, waypoint.y - userPoint.y);
        if (dist < minDist) minDist = dist;
      });
      totalDistanceToWaypoints += minDist;
      if (minDist < 40) matchedWaypoints++;
    });
    
    const avgError = totalDistanceToWaypoints / waypoints.length;
    const waypointAccuracy = (matchedWaypoints / waypoints.length) * 100;
    const accurate = avgError < 50 && waypointAccuracy > 60;
    
    return { 
      accurate, 
      error: avgError, 
      matchedWaypoints, 
      totalWaypoints: waypoints.length,
      accuracyPercent: waypointAccuracy
    };
  };

  const submitDrawing = () => {
    const result = checkAccuracy();
    
    if (result.accurate) {
      // Success - gain points
      streakValue.current++;
      const pointsEarned = 100 + (Math.floor(complexityValue.current) * 20);
      scoreValue.current += pointsEarned;
      complexityValue.current = Math.min(8, complexityValue.current + 0.5);
      
      setScore(scoreValue.current);
      setStreak(streakValue.current);
      setCurrentComplexity(Math.floor(complexityValue.current));
      setPatternsCompleted(prev => prev + 1);
      
      if (streakValue.current > bestStreak) {
        setBestStreak(streakValue.current);
      }
      
      playSound('success');
      showFeedback(`✓ Success! +${pointsEarned}`, 'success');
    } else {
      // Failure - apply penalty
      streakValue.current = 0;
      const penaltyAmount = 25;
      scoreValue.current = Math.max(0, scoreValue.current - penaltyAmount);
      complexityValue.current = Math.max(2, complexityValue.current - 0.5);
      penaltyValue.current++;
      
      setScore(scoreValue.current);
      setStreak(0);
      setCurrentComplexity(Math.floor(complexityValue.current));
      setPenaltyCount(penaltyValue.current);
      
      playSound('fail');
      showFeedback(`✗ Failed! -${penaltyAmount} penalty`, 'error');
    }
    
    setPhase('result');
    resultStartTime.current = performance.now();
  };

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
      
      if (type === 'success') {
        osc.frequency.value = 880;
        gain.gain.value = 0.1;
      } else {
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
      
      if (phase === 'draw' && isDrawing.current) {
        userDrawing.current.push({ ...mousePos.current });
      }
    };
    
    const handleMouseDown = () => {
      if (gameState === 'playing' && phase === 'draw') {
        isDrawing.current = true;
        userDrawing.current = [];
      }
    };
    
    const handleMouseUp = () => {
      if (gameState === 'playing' && phase === 'draw' && isDrawing.current) {
        isDrawing.current = false;
        if (userDrawing.current.length > 5) {
          submitDrawing();
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gameState, phase]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const checkPhaseTimer = setInterval(() => {
      if (phase === 'memorize') {
        const elapsed = (performance.now() - memorizeStartTime.current) / 1000;
        if (elapsed >= 2.0) {
          setPhase('draw');
        }
      } else if (phase === 'result') {
        const elapsed = (performance.now() - resultStartTime.current) / 1000;
        if (elapsed >= 1.0) {
          startNewPattern();
        }
      }
    }, 50);
    
    return () => clearInterval(checkPhaseTimer);
  }, [gameState, phase]);

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
      
      if (targetPattern.current.length === 0) {
        startNewPattern();
      }
    };
    
    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    resizeCanvas();
    
    const draw = () => {
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Grid
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }
      
      // Always show START and END points
      if (targetPattern.current.length > 0) {
        const startPoint = targetPattern.current.find(p => p.type === 'start');
        const endPoint = targetPattern.current.find(p => p.type === 'end');
        
        if (startPoint) {
          ctx.beginPath();
          ctx.arc(startPoint.x, startPoint.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = "#00FFFF";
          ctx.fill();
        }
        
        if (endPoint) {
          ctx.beginPath();
          ctx.arc(endPoint.x, endPoint.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = "#FF00FF";
          ctx.fill();
        }
      }
      
      if (phase === 'memorize') {
        // Show full pattern
        if (targetPattern.current.length > 0) {
          ctx.beginPath();
          ctx.moveTo(targetPattern.current[0].x, targetPattern.current[0].y);
          for (let i = 1; i < targetPattern.current.length; i++) {
            ctx.lineTo(targetPattern.current[i].x, targetPattern.current[i].y);
          }
          ctx.strokeStyle = "#00ff88";
          ctx.lineWidth = 3;
          ctx.stroke();
          
          // Show waypoints
          targetPattern.current.forEach((point) => {
            if (point.type === 'waypoint') {
              ctx.beginPath();
              ctx.arc(point.x, point.y, 7, 0, Math.PI * 2);
              ctx.fillStyle = "#00ff88";
              ctx.fill();
            }
          });
        }
      }
      
      else if (phase === 'draw') {
        // Show user drawing
        if (userDrawing.current.length > 1) {
          ctx.beginPath();
          ctx.moveTo(userDrawing.current[0].x, userDrawing.current[0].y);
          for (let i = 1; i < userDrawing.current.length; i++) {
            ctx.lineTo(userDrawing.current[i].x, userDrawing.current[i].y);
          }
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }
      
      else if (phase === 'result') {
        // Show target pattern
        if (targetPattern.current.length > 0) {
          ctx.beginPath();
          ctx.moveTo(targetPattern.current[0].x, targetPattern.current[0].y);
          for (let i = 1; i < targetPattern.current.length; i++) {
            ctx.lineTo(targetPattern.current[i].x, targetPattern.current[i].y);
          }
          ctx.strokeStyle = "#00ff88";
          ctx.lineWidth = 2;
          ctx.stroke();
          
          targetPattern.current.forEach((point) => {
            if (point.type === 'waypoint') {
              ctx.beginPath();
              ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
              ctx.fillStyle = "#00ff88";
              ctx.fill();
            }
          });
        }
        
        // Show user drawing
        if (userDrawing.current.length > 1) {
          ctx.beginPath();
          ctx.moveTo(userDrawing.current[0].x, userDrawing.current[0].y);
          for (let i = 1; i < userDrawing.current.length; i++) {
            ctx.lineTo(userDrawing.current[i].x, userDrawing.current[i].y);
          }
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
      
      // Crosshair
      const mouse = mousePos.current;
      if (mouse.x > 0 && mouse.x < canvas.width && mouse.y > 0 && mouse.y < canvas.height) {
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 14, mouse.y); ctx.lineTo(mouse.x + 14, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 14); ctx.lineTo(mouse.x, mouse.y + 14);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.stroke();
      }
      
      animationId.current = requestAnimationFrame(draw);
    };
    
    animationId.current = requestAnimationFrame(draw);
    
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
      resizeObserver.disconnect();
    };
  }, [gameState, phase, isBoxDarkMode]);

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
    setCurrentComplexity(3);
    setTimeLeft(60);
    setFeedback('');
    setPatternsCompleted(0);
    setPenaltyCount(0);
    
    scoreValue.current = 0;
    streakValue.current = 0;
    complexityValue.current = 3;
    penaltyValue.current = 0;
    targetPattern.current = [];
    userDrawing.current = [];
    setPhase('memorize');
    memorizeStartTime.current = performance.now();
    
    setTimeout(() => {
      if (canvasRef.current) {
        startNewPattern();
      }
    }, 100);
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Complex Pattern Elite</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Memorize and draw patterns - 60 second challenge</p>
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

        {/* Drill-specific stats board */}
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Current Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time Left" unit="s" isDark={isDarkMode} />
          <StatCard icon={<GitBranch className="text-cyan-600" />} value={currentComplexity} label="Complexity" isDark={isDarkMode} />
          <StatCard icon={<AlertCircle className="text-red-500" />} value={penaltyCount} label="Penalties" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
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
                <GitBranch className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Complex Pattern Elite</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Memorize and draw patterns</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <ResultCard label="Patterns Completed" value={patternsCompleted} icon={<GitBranch className="w-4 h-4" />} color="text-cyan-500" />
                  <ResultCard label="Peak Complexity" value={currentComplexity} icon={<Activity className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Total Penalties" value={penaltyCount} icon={<AlertCircle className="w-4 h-4" />} color="text-red-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/physical" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Memorize the full pattern shown for 2 seconds</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pattern disappears - only Cyan and Magenta points remain</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click and drag to draw the path from Cyan to Magenta</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Release mouse to submit - Accuracy based on hitting waypoints</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Success: +100+(20×complexity) pts • Failure: -25 penalty</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60 second timer - Complexity increases with success</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🟢 Cyan = Start • 🟣 Magenta = End • 🟢 Green = Waypoints (memorize)</span>
                  <span>⚡ Draw path must pass near green waypoints to score • Each failure adds a penalty</span>
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