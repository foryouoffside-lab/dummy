'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Move, Brain, TrendingUp, Trophy, Info, Timer, AlertCircle, Grid, RefreshCw
} from 'lucide-react';

// Ladder class definition (outside component to avoid recreation)
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
        return { type: 'complete', points: 2 };
      }
      return { type: 'step', points: 1 };
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
    
    // Completion checkmark
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

export default function AgilityLadderClient() {
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
  const [currentSpeed, setCurrentSpeed] = useState(150);
  const [isClient, setIsClient] = useState(false);
  
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
  const laddersValue = useRef(0);
  const bestStreakValue = useRef(0);
  const canvasSize = useRef({ width: 0, height: 0 });
  const gameStateRef = useRef('start');

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Load best score
  useEffect(() => {
    try {
      const saved = localStorage.getItem('monochromeAgilityBestScore');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerInterval.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            if (timerInterval.current) {
              clearInterval(timerInterval.current);
              timerInterval.current = null;
            }
            if (animationId.current) cancelAnimationFrame(animationId.current);
            const finalScore = Math.floor(scoreValue.current);
            try {
              const savedBest = parseInt(localStorage.getItem('monochromeAgilityBestScore') || '0', 10);
              if (finalScore > savedBest) {
                localStorage.setItem('monochromeAgilityBestScore', finalScore.toString());
                setBestScore(finalScore);
              }
            } catch (e) { /* localStorage not available */ }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }
    };
  }, [gameState]);

  const playSound = useCallback((type) => {
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
      
      const now = audioCtx.current.currentTime;
      const freqMap = { step: 660, complete: 880, fail: 440 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      gain.gain.setValueAtTime(type === 'complete' ? 0.12 : type === 'fail' ? 0.1 : 0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled]);

  const showFeedback = useCallback((message, type) => {
    setFeedback(message);
    setFeedbackType(type);
    setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  }, []);

  const applyPenalty = useCallback(() => {
    if (isPenaltyActive.current) return;
    
    isPenaltyActive.current = true;
    
    const penaltyAmount = 10;
    scoreValue.current = Math.max(0, scoreValue.current - penaltyAmount);
    setScore(scoreValue.current);
    
    streakValue.current = 0;
    setStreak(0);
    
    playSound('fail');
    showFeedback(`✗ Missed ladder! -${penaltyAmount} points`, 'error');
    
    scrollSpeed.current = Math.max(100, scrollSpeed.current - 20);
    setCurrentSpeed(Math.floor(scrollSpeed.current));
    
    setTimeout(() => {
      isPenaltyActive.current = false;
    }, 300);
  }, [playSound, showFeedback]);

  // Mouse tracking
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
      
      // Check steps and failures
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
          if (result.type === 'step') {
            streakValue.current++;
            scoreValue.current += result.points;
            setScore(scoreValue.current);
            setStreak(streakValue.current);
            if (streakValue.current > bestStreakValue.current) {
              bestStreakValue.current = streakValue.current;
              setBestStreak(bestStreakValue.current);
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
            
            if (streakValue.current > bestStreakValue.current) {
              bestStreakValue.current = streakValue.current;
              setBestStreak(bestStreakValue.current);
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
      
      // Manage ladders (remove off-screen, add new)
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
      
      // Draw ladders
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
  }, [gameState, isBoxDarkMode, applyPenalty, playSound, showFeedback]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element?.requestFullscreen) {
          await element.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [isFullscreen]);

  const startGame = useCallback(() => {
    if (timerInterval.current) clearInterval(timerInterval.current);
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setFeedback('');
    setLaddersCompleted(0);
    setCurrentSpeed(150);
    
    scoreValue.current = 0;
    streakValue.current = 0;
    bestStreakValue.current = 0;
    laddersValue.current = 0;
    scrollSpeed.current = 150;
    scrollY.current = 0;
    isPenaltyActive.current = false;
    ladders.current = [];
  }, []);

  const resetGame = useCallback(() => {
    if (animationId.current) cancelAnimationFrame(animationId.current);
    if (timerInterval.current) clearInterval(timerInterval.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setFeedback('');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading agility ladder drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Monochrome Agility Ladder",
            "url": "https://skilldrills.online/drills/physical/Fitness/agility-ladder",
            "description": "Sequence coordination drill with scrolling ladders. Step on rungs in Left→Right→Left→Right order. Adaptive speed increases with completion. 60-second challenge with scoring and penalties.",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "Global Drill System"
            },
            "educationalUse": ["Agility Training", "Sequence Coordination", "Motor Planning", "Speed Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Motor Sequencing", "Agility", "Pattern Recognition", "Speed Adaptation"]
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Home
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li>
              <Link href="/drills/physical" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Physical Drills
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Fitness
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} aria-current="page">
              Agility Ladder
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex-shrink-0">
              <Grid className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Monochrome Agility Ladder
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Step rungs in sequence • Left→Right→Left→Right • 60s challenge
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset agility ladder drill"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Light mode' : 'Dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label="Toggle drill area theme"
              title="Toggle drill area theme"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button 
              onClick={toggleFullscreen} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* SEO Content */}
        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Monochrome Agility Ladder - Sequence Coordination Training</h2>
          <p>
            Train motor sequencing and agility by navigating scrolling ladder rungs.
            Ladders scroll upward with adaptive speed that increases +8 px/s with each completion.
            Step on rungs in the correct Left→Right→Left→Right sequence.
            Each correct rung earns +1 point. Completing all 4 rungs earns +2 bonus points.
            Missing an entire ladder incurs a -10 point penalty and reduces speed.
            60-second timed challenge with best score saved locally.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Grid className="text-gray-500" />} value={laddersCompleted} label="Ladders" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-orange-500" />} value={currentSpeed} label="Speed" unit="px/s" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${
              feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedback || '\u00A0'}
          </div>
        </div>

        {/* Game Canvas */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#020202" : "#ffffff",
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {/* Fullscreen Controls */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
                aria-label="Reset agility ladder drill"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle drill area theme">
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen">
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} aria-label="Agility ladder canvas - move cursor to step on rungs in sequence" />

          {/* ============ START SCREEN ============ */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4">
                  <Grid className="w-16 h-16 text-gray-500 mx-auto" aria-hidden="true" />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Monochrome Agility Ladder
                </h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Step rungs in sequence • Left→Right→Left→Right
                </p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Ladders scroll upward. +1 per rung, +2 for completion. Speed increases with each ladder. Miss a ladder = -10 points.
                </p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  aria-label="Start agility ladder training"
                >
                  Start Training
                </button>
              </div>
            </div>
          )}

          {/* ============ GAME OVER SCREEN ============ */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[520px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Session Complete!
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Regular agility ladder training improves motor sequencing and speed adaptation.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Ladders Done" value={laddersCompleted} icon={<Grid className="w-4 h-4" />} color="gray" isDark={isBoxDarkMode} />
                  <ResultCard label="Peak Speed" value={currentSpeed} unit="px/s" icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/physical" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back to Drills
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
          <footer className="mt-6" aria-label="Drill rules and instructions">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Step rungs in sequence: <span className="font-semibold">Left→Right→Left→Right</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct rung: <span className="font-semibold text-green-500">+1 point</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete 4 rungs: <span className="font-semibold text-emerald-500">+2 bonus points</span> + speed ↑</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Miss ladder: <span className="font-semibold text-red-500">-10 points penalty</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Speed increases <span className="font-semibold text-purple-500">+8 px/s per ladder</span> completed</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60 second timer • <span className="font-semibold text-yellow-500">Best Score saves locally</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>⬅️ Left → ➡️ Right → ⬅️ Left → ➡️ Right • Green outline = next rung</span>
                  <span>⚡ Miss entire ladder = -10pt • Speed decreases on miss</span>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// ============ HELPER COMPONENTS ============

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div>
      <p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = {
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    gray: { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-500', icon: 'text-gray-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
  };
  
  const colors = colorMap[color] || colorMap.yellow;
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={colors.icon} aria-hidden="true">{icon}</div>
        <span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span>
    </div>
  );
}