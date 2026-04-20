'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Clock, Zap, Award, Activity, Brain, 
  Crosshair, AlertCircle, Trophy, Volume2, VolumeX, 
  Maximize2, Minimize2, Sun, Moon, Eye, Timer, X,
  BarChart3, Info, CheckCircle
} from 'lucide-react';

export default function EliteNeuroSwitch() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [successes, setSuccesses] = useState(0);
  const [failures, setFailures] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const pulseTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  
  // Game state
  const redPos = useRef({ x: 400, y: 300 });
  const bluePos = useRef({ x: 200, y: 300 });
  const mousePos = useRef({ x: 0, y: 0 });
  const isRunning = useRef(false);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const gameStateRef = useRef('start');

  const PULSE_RATE = 950;
  const BALL_RADIUS = 28;
  const INNER_DOT_RADIUS = 4;
  const BORDER_WIDTH = 5;

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('eliteNeuroSwitchBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Sync gameState to ref
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

  // Update best score when game ends
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('eliteNeuroSwitchBestScore', score.toString());
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  // Toggle fullscreen
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
      const ctx = initAudio();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'success') {
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'fail') {
        osc.frequency.value = 220;
        gain.gain.value = 0.1;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'pulse') {
        osc.frequency.value = 523.25;
        gain.gain.value = 0.06;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.08);
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'combo') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {}
  };

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          isRunning.current = false;
          if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw subtle grid
    ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    // Draw RED target
    ctx.beginPath();
    ctx.arc(redPos.current.x, redPos.current.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = BORDER_WIDTH;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(redPos.current.x, redPos.current.y, INNER_DOT_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = isBoxDarkMode ? "#FFFFFF" : "#FF0000";
    ctx.fill();
    
    // Draw BLUE target
    ctx.beginPath();
    ctx.arc(bluePos.current.x, bluePos.current.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = "#0000FF";
    ctx.lineWidth = BORDER_WIDTH;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(bluePos.current.x, bluePos.current.y, INNER_DOT_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = isBoxDarkMode ? "#FFFFFF" : "#0000FF";
    ctx.fill();
    
    // Draw crosshair
    if (mousePos.current.x > 0 && mousePos.current.y > 0) {
      ctx.strokeStyle = "#00ff88";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(mousePos.current.x - 12, mousePos.current.y);
      ctx.lineTo(mousePos.current.x + 12, mousePos.current.y);
      ctx.moveTo(mousePos.current.x, mousePos.current.y - 12);
      ctx.lineTo(mousePos.current.x, mousePos.current.y + 12);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(mousePos.current.x, mousePos.current.y, 15, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
      ctx.stroke();
    }
  };

  const showFlash = (color) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Redraw targets on top
    ctx.beginPath();
    ctx.arc(redPos.current.x, redPos.current.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = BORDER_WIDTH;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(redPos.current.x, redPos.current.y, INNER_DOT_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(bluePos.current.x, bluePos.current.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = "#0000FF";
    ctx.lineWidth = BORDER_WIDTH;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(bluePos.current.x, bluePos.current.y, INNER_DOT_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    
    ctx.restore();
    
    setTimeout(() => {
      draw();
    }, 100);
  };

  const getRandPos = (canvas) => {
    const pad = 100;
    return {
      x: pad + Math.random() * (canvas.width - pad * 2),
      y: pad + Math.random() * (canvas.height - pad * 2)
    };
  };

  const updatePositions = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const minDistance = Math.min(canvas.width, canvas.height) * 0.35;
    redPos.current = getRandPos(canvas);
    let attempts = 0;
    let distance = 0;
    do {
      bluePos.current = getRandPos(canvas);
      const dx = redPos.current.x - bluePos.current.x;
      const dy = redPos.current.y - bluePos.current.y;
      distance = Math.sqrt(dx * dx + dy * dy);
      attempts++;
    } while (distance < minDistance && attempts < 50);
    
    draw();
  };

  const pulse = () => {
    if (!isRunning.current) return;
    updatePositions();
    playSound('pulse');
    pulseTimeoutRef.current = setTimeout(pulse, PULSE_RATE);
  };

  const getAccuracy = () => {
    if (successes + failures === 0) return 100;
    return Math.round((successes / (successes + failures)) * 100);
  };

  // Initialize canvas
  useEffect(() => {
    const setupCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return false;
      
      const container = canvas.parentElement;
      const width = container.clientWidth;
      canvas.width = Math.max(width, 800);
      canvas.height = Math.min(canvas.width * 9 / 16, 600);
      canvas.style.width = '100%';
      canvas.style.height = 'auto';
      
      draw();
      
      const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        mousePos.current = {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY
        };
        if (isRunning.current) draw();
      };
      
      const handleClick = (e) => {
        if (!isRunning.current || gameStateRef.current !== 'playing') return;
        
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;
        
        const dxRed = clickX - redPos.current.x;
        const dyRed = clickY - redPos.current.y;
        const distRed = Math.sqrt(dxRed * dxRed + dyRed * dyRed);
        
        const dxBlue = clickX - bluePos.current.x;
        const dyBlue = clickY - bluePos.current.y;
        const distBlue = Math.sqrt(dxBlue * dxBlue + dyBlue * dyBlue);
        
        if (distRed < BALL_RADIUS) {
          setSuccesses(prev => prev + 1);
          
          const basePoints = 10;
          const comboBonus = Math.floor(comboRef.current / 3) * 5;
          const totalPoints = basePoints + comboBonus;
          
          scoreRef.current += totalPoints;
          setScore(scoreRef.current);
          comboRef.current++;
          setCombo(comboRef.current);
          
          if (comboRef.current > bestCombo) {
            setBestCombo(comboRef.current);
          }
          
          if (comboRef.current % 3 === 0) {
            playSound('combo');
            showFeedback(`🔥 ${comboRef.current}x Combo! +${totalPoints}`, 'success');
          } else {
            playSound('success');
            showFeedback(`✓ +${totalPoints}`, 'success');
          }
          
          showFlash("rgba(0, 255, 0, 0.2)");
        } else if (distBlue < BALL_RADIUS) {
          setFailures(prev => prev + 1);
          setMistakes(prev => prev + 1);
          scoreRef.current = Math.max(0, scoreRef.current - 10);
          setScore(scoreRef.current);
          comboRef.current = 0;
          setCombo(0);
          showFeedback('✗ Wrong Target! -10', 'error');
          playSound('fail');
          showFlash("rgba(255, 0, 0, 0.2)");
          
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
        } else {
          setFailures(prev => prev + 1);
          setMistakes(prev => prev + 1);
          scoreRef.current = Math.max(0, scoreRef.current - 5);
          setScore(scoreRef.current);
          comboRef.current = 0;
          setCombo(0);
          showFeedback('✗ Miss! -5', 'error');
          playSound('fail');
          showFlash("rgba(255, 0, 0, 0.15)");
          
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
        }
      };
      
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('click', handleClick);
      
      const handleResize = () => {
        canvas.width = Math.max(canvas.parentElement.clientWidth, 800);
        canvas.height = Math.min(canvas.width * 9 / 16, 600);
        draw();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('click', handleClick);
        window.removeEventListener('resize', handleResize);
        if (pulseTimeoutRef.current) {
          clearTimeout(pulseTimeoutRef.current);
        }
      };
    };
    
    let cleanup = setupCanvas();
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [gameState, isBoxDarkMode]);

  const startDrill = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setSuccesses(0);
    setFailures(0);
    setMistakes(0);
    setTimeLeft(60);
    setCombo(0);
    setBestCombo(0);
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    
    initAudio();
    isRunning.current = true;
    
    setTimeout(() => {
      if (canvasRef.current) {
        updatePositions();
        pulse();
      }
    }, 100);
  };

  const resetDrill = () => {
    if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    isRunning.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setSuccesses(0);
    setFailures(0);
    setMistakes(0);
    setTimeLeft(60);
    setCombo(0);
    setFeedback('');
    
    if (canvasRef.current) {
      draw();
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading neuro drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/drills/cognitive" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Cognitive Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-red-500 to-purple-600 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Elite Neuro-Switch</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Target RED circles • Ignore BLUE • 60s</p>
              </div>
            </div>
            
            {/* Control Buttons */}
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
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={`${timeLeft}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle className="text-emerald-600" />} value={successes} label="Hits" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<AlertCircle className="text-red-500" />} value={`${mistakes}/5`} label="Mistakes" isDark={isDarkMode} />
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
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          <canvas
            ref={canvasRef}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              cursor: 'none'
            }}
          />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Brain className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Elite Neuro-Switch</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Target RED, ignore BLUE</p>
                <button 
                  onClick={startDrill}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Neuro Training
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Trophy className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Complete!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Hits (RED)" value={successes} icon={<CheckCircle className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Misses" value={failures} icon={<X className="w-4 h-4" />} color="text-red-500" />
                  <ResultCard label="Mistakes" value={mistakes} icon={<AlertCircle className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Best Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="text-amber-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/cognitive" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startDrill}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click ONLY on <span className="font-semibold text-red-500">RED circles</span> (+10 + combo)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ignore <span className="font-semibold text-blue-500">BLUE circles</span> (-10 points penalty)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Miss click: <span className="font-semibold text-orange-500">-5 points</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 combo = <span className="font-semibold text-green-500">+5 bonus points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Targets reposition <span className="font-semibold text-purple-500">every ~950ms</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">5 mistakes reset score</span> to 0</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>💚 Green flash = Success • ❤️ Red flash = Failure</span>
                  <span>🏆 Best Score saves locally</span>
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
                   color === 'text-red-500' ? 'bg-red-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 'bg-amber-500/10';
  
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