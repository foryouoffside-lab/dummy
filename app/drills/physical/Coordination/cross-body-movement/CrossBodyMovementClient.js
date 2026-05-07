'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Maximize2, Minimize2, Sun, Moon, 
  Eye, Move, Trophy, Info, Timer, RefreshCw
} from 'lucide-react';

export default function CrossBodyMovementClient() {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [connectionsCompleted, setConnectionsCompleted] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  // Game refs
  const nodeA = useRef({ x: 0, y: 0, active: true });
  const nodeB = useRef({ x: 0, y: 0, active: true });
  const mousePos = useRef({ x: 0, y: 0 });
  const isConnecting = useRef(false);
  const isPenalty = useRef(false);
  const animationId = useRef(null);
  const timerInterval = useRef(null);
  const scoreValue = useRef(0);
  const streakValue = useRef(0);
  const connectionsValue = useRef(0);
  const bestStreakValue = useRef(0);
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
      const savedScore = localStorage.getItem('linearCrossBodyBestScore');
      const savedStreak = localStorage.getItem('linearCrossBodyBestStreak');
      if (savedScore) {
        const parsed = parseInt(savedScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
      if (savedStreak) {
        const parsed = parseInt(savedStreak, 10);
        if (!isNaN(parsed)) setBestStreak(parsed);
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
              const savedBest = parseInt(localStorage.getItem('linearCrossBodyBestScore') || '0', 10);
              if (finalScore > savedBest) {
                localStorage.setItem('linearCrossBodyBestScore', finalScore.toString());
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

  // Spawn nodes on opposite sides
  const spawnNodes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const padding = 100;
    const side = Math.random() > 0.5;
    
    nodeA.current = {
      x: side ? padding : canvas.width - padding,
      y: Math.random() * (canvas.height - 200) + 100,
      active: true
    };
    
    nodeB.current = {
      x: !side ? padding : canvas.width - padding,
      y: Math.random() * (canvas.height - 200) + 100,
      active: true
    };
    
    isConnecting.current = false;
  }, []);

  // Distance from point to line segment
  const getDistToSegment = useCallback((px, py, x1, y1, x2, y2) => {
    const l2 = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
  }, []);

  const showFeedback = useCallback((message, type) => {
    setFeedback(message);
    setFeedbackType(type);
    setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 600);
  }, []);

  const handleMiss = useCallback(() => {
    streakValue.current = 0;
    setStreak(0);
    showFeedback('✗ Off path! Streak reset', 'error');
  }, [showFeedback]);

  // Update game logic
  const updateGame = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    
    const mouse = mousePos.current;
    const distA = Math.hypot(mouse.x - nodeA.current.x, mouse.y - nodeA.current.y);
    const distB = Math.hypot(mouse.x - nodeB.current.x, mouse.y - nodeB.current.y);

    // Start connection at Node A
    if (distA < 15 && !isConnecting.current) {
      isConnecting.current = true;
    }

    if (isConnecting.current) {
      const offPathDist = getDistToSegment(
        mouse.x, mouse.y, 
        nodeA.current.x, nodeA.current.y, 
        nodeB.current.x, nodeB.current.y
      );
      
      if (offPathDist > 6) {
        isConnecting.current = false;
        isPenalty.current = true;
        
        handleMiss();
        
        setTimeout(() => { 
          isPenalty.current = false; 
        }, 200);
      }

      // Complete connection at Node B
      if (distB < 15) {
        streakValue.current++;
        const pointsEarned = 5;
        scoreValue.current += pointsEarned;
        connectionsValue.current++;
        
        setScore(scoreValue.current);
        setStreak(streakValue.current);
        setConnectionsCompleted(connectionsValue.current);
        
        if (streakValue.current > bestStreakValue.current) {
          bestStreakValue.current = streakValue.current;
          setBestStreak(bestStreakValue.current);
          try {
            localStorage.setItem('linearCrossBodyBestStreak', streakValue.current.toString());
          } catch (e) { /* localStorage not available */ }
        }
        
        if (streakValue.current % 5 === 0 && streakValue.current > 0) {
          showFeedback(`🔥 ${streakValue.current} Streak! +${pointsEarned}`, 'success');
        } else {
          showFeedback(`✓ Connection complete! +${pointsEarned}`, 'success');
        }
        
        spawnNodes();
        isConnecting.current = false;
      }
    }
  }, [getDistToSegment, showFeedback, handleMiss, spawnNodes]);

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
      
      if (nodeA.current.x === 0) {
        spawnNodes();
      }
    };
    
    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    resizeCanvas();
    
    const draw = () => {
      updateGame();
      
      const ctx = canvas.getContext('2d');
      
      // Background
      ctx.fillStyle = isPenalty.current ? "#1a0000" : (isBoxDarkMode ? "#020202" : "#f9fafb");
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Midline
      ctx.strokeStyle = isBoxDarkMode ? "#080808" : "#e5e7eb";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      
      // Target Nodes
      ctx.lineWidth = 2;
      
      // Node A
      ctx.beginPath();
      ctx.arc(nodeA.current.x, nodeA.current.y, 10, 0, Math.PI * 2);
      ctx.strokeStyle = isConnecting.current ? "#00ff88" : (isBoxDarkMode ? "#FFF" : "#333");
      ctx.stroke();
      
      // Node B
      ctx.beginPath();
      ctx.arc(nodeB.current.x, nodeB.current.y, 10, 0, Math.PI * 2);
      ctx.strokeStyle = isConnecting.current ? "#00ff88" : (isBoxDarkMode ? "#FFF" : "#333");
      ctx.stroke();
      
      // The Vector Path
      ctx.beginPath();
      ctx.moveTo(nodeA.current.x, nodeA.current.y);
      ctx.lineTo(nodeB.current.x, nodeB.current.y);
      ctx.lineWidth = 10;
      ctx.strokeStyle = isConnecting.current 
        ? "rgba(0, 255, 136, 0.2)" 
        : (isBoxDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)");
      ctx.stroke();
      
      // Current drawing line
      if (isConnecting.current) {
        ctx.beginPath();
        ctx.moveTo(nodeA.current.x, nodeA.current.y);
        ctx.lineTo(mousePos.current.x, mousePos.current.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#00ff88";
        ctx.stroke();
      }
      
      // Cursor
      const mouse = mousePos.current;
      if (mouse.x > 0 && mouse.x < canvas.width && mouse.y > 0 && mouse.y < canvas.height) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = isPenalty.current ? "#ff0000" : "#00ff88";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = isPenalty.current ? "#ff0000" : "#00ff88";
        ctx.fill();
        
        ctx.strokeStyle = isPenalty.current ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 255, 136, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 20, mouse.y); ctx.lineTo(mouse.x - 14, mouse.y);
        ctx.moveTo(mouse.x + 14, mouse.y); ctx.lineTo(mouse.x + 20, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 20); ctx.lineTo(mouse.x, mouse.y - 14);
        ctx.moveTo(mouse.x, mouse.y + 14); ctx.lineTo(mouse.x, mouse.y + 20);
        ctx.stroke();
      }
      
      animationId.current = requestAnimationFrame(draw);
    };
    
    animationId.current = requestAnimationFrame(draw);
    
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
      resizeObserver.disconnect();
    };
  }, [gameState, isBoxDarkMode, updateGame, spawnNodes]);

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
    setTimeLeft(60);
    setFeedback('');
    setConnectionsCompleted(0);
    
    scoreValue.current = 0;
    streakValue.current = 0;
    connectionsValue.current = 0;
    bestStreakValue.current = 0;
    isConnecting.current = false;
    isPenalty.current = false;
    
    showFeedback('60 seconds • Connect the nodes!', 'success');
    
    setTimeout(() => {
      if (canvasRef.current) {
        spawnNodes();
      }
    }, 100);
  }, [showFeedback, spawnNodes]);

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
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cross-body movement drill...</p>
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
            "name": "Linear Cross-Body Drill",
            "url": "https://skilldrills.online/drills/physical/Coordination/cross-body-movement",
            "description": "Bilateral coordination drill connecting nodes across the screen along straight vector paths. +5 points per successful connection with streak bonuses. 60-second timed challenge with no penalties.",
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
            "educationalUse": ["Bilateral Coordination", "Cross-Body Movement", "Motor Control", "Hand-Eye Coordination"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Bilateral Coordination", "Vector Path Tracking", "Cross-Body Movement", "Motor Precision"]
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
              Coordination
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">
              Linear Cross-Body
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex-shrink-0">
              <Move className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Linear Cross-Body Drill
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Connect nodes along the vector • +5 per connection • 60s challenge
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset cross-body drill"
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
          <h2>Linear Cross-Body Drill - Bilateral Coordination Training</h2>
          <p>
            Train bilateral coordination by connecting nodes placed on opposite sides of the screen.
            Nodes spawn on left and right sides randomly. Move your cursor from the first node to the second
            while staying within the straight vector path between them.
            Earn +5 points per successful connection with streak bonuses every 5 consecutive connections.
            Off-path movement resets the streak but applies no point penalty.
            60-second timed challenge that saves your best score and best streak locally.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-4 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
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
            overflow: 'hidden',
            cursor: 'none'
          }}
        >
          {/* Fullscreen Controls */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
                aria-label="Reset cross-body drill"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle drill area theme">
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen">
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} aria-label="Cross-body movement canvas - connect nodes from one side to the other" />

          {/* ============ START SCREEN ============ */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4">
                  <Move className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Linear Cross-Body Drill
                </h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60-second challenge • +5 per connection • No penalties
                </p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Connect nodes from one side to the other along the vector path. Stay on the line for a successful connection.
                </p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label="Start cross-body movement training"
                >
                  Start Training
                </button>
              </div>
            </div>
          )}

          {/* ============ GAME OVER SCREEN ============ */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Time&apos;s Up!
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Regular cross-body training improves bilateral coordination and motor control.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Connections" value={connectionsCompleted} icon={<Move className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/physical" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back to Drills
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
          <footer className="mt-6" aria-label="Drill rules and scoring information">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Move cursor from <span className="font-semibold text-cyan-500">first node</span> to the second node</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Stay within the <span className="font-semibold text-green-500">vector path</span> (6px tolerance)</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Success: <span className="font-semibold text-emerald-500">+5 points per connection</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Off path: <span className="font-semibold text-yellow-500">streak reset only</span> • No point penalty</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>⚪ White nodes = Connection points • Green path = Active connection</span>
                  <span>🏆 Best Score & Streak save locally</span>
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
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
  };
  
  const colors = colorMap[color] || colorMap.blue;
  
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