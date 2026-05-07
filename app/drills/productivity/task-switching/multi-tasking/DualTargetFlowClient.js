'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Award, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Activity, Trophy, Info, RefreshCw
} from 'lucide-react';

export default function DualTargetFlowClient() {
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef(null);
  const leftContainerRef = useRef(null);
  const rightContainerRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Scoring
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  // Targets
  const [leftTarget, setLeftTarget] = useState('▲');
  const [rightTarget, setRightTarget] = useState('●');
  
  // Refs for game state
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const timerIntervalRef = useRef(null);
  const spawnIntervalLeftRef = useRef(null);
  const spawnIntervalRightRef = useRef(null);
  const targetIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const shapesRef = useRef(['▲', '●', '■', '★', '◆', '⬣', '❖', '⏣']);
  const animationFramesRef = useRef(new Set());

  const PENALTY = 1;

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('dualTargetFlowBestScore');
      if (savedBestScore) setBestScore(parseInt(savedBestScore, 10));
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best score
  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('dualTargetFlowBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('dualTargetFlowBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  }, []);

  const initAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch (e) {
      return null;
    }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      if (!audioCtx) return;
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      const now = audioCtx.currentTime;
      const freqMap = { hit: 880, miss: 440, streak: 1046.5, lifeLost: 330 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      gain.gain.setValueAtTime(type === 'lifeLost' ? 0.15 : type === 'streak' ? 0.12 : 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (type === 'lifeLost' ? 0.2 : 0.15));
      osc.start(now);
      osc.stop(now + (type === 'lifeLost' ? 0.2 : 0.15));
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  const initTargets = useCallback(() => {
    const shapes = shapesRef.current;
    const shuffled = [...shapes].sort(() => 0.5 - Math.random());
    const newLeft = shuffled[0];
    let newRight = shuffled[1];
    
    if (newLeft === newRight) {
      newRight = shuffled[2] || shapes.find(s => s !== newLeft) || '■';
    }
    
    setLeftTarget(newLeft);
    setRightTarget(newRight);
  }, []);

  const handleHit = useCallback((side) => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    hitsRef.current++;
    setSuccessfulHits(prev => prev + 1);
    
    const newStreak = streakRef.current + 1;
    streakRef.current = newStreak;
    setStreak(newStreak);
    
    if (newStreak > bestStreakRef.current) {
      bestStreakRef.current = newStreak;
      setBestStreak(newStreak);
    }
    
    scoreRef.current += 1;
    setScore(scoreRef.current);
    
    playSound('hit');
    
    if (newStreak % 5 === 0 && newStreak > 0) {
      playSound('streak');
      showFeedback(`🔥 ${newStreak} Streak! +1`, 'success');
    } else {
      showFeedback(`✓ Hit! +1 • ${side} target`, 'success');
    }
    
    const total = hitsRef.current + missesRef.current;
    if (total > 0) {
      setAccuracy(Math.round((hitsRef.current / total) * 100));
    }
  }, [playSound, showFeedback]);

  const handleMiss = useCallback((reason) => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    missesRef.current++;
    setMisses(prev => prev + 1);
    
    streakRef.current = 0;
    setStreak(0);
    
    if (livesRef.current > 0) {
      livesRef.current--;
      setLives(livesRef.current);
      playSound('miss');
      
      if (livesRef.current === 0) {
        playSound('lifeLost');
        showFeedback('⚠️ Out of lives! Penalty now active!', 'warning');
      } else {
        showFeedback(`✗ ${reason}! No penalty • ${livesRef.current} lives left`, 'error');
      }
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - PENALTY);
      setScore(scoreRef.current);
      playSound('miss');
      showFeedback(`✗ ${reason}! -${PENALTY}pt`, 'error');
    }
    
    const total = hitsRef.current + missesRef.current;
    if (total > 0) {
      setAccuracy(Math.round((hitsRef.current / total) * 100));
    }
  }, [PENALTY, playSound, showFeedback]);

  const createShape = useCallback((side) => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    const container = side === 'left' ? leftContainerRef.current : rightContainerRef.current;
    const targetGlyph = side === 'left' ? leftTarget : rightTarget;
    
    if (!container) return;
    
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.fontSize = '6.8rem';
    el.style.color = isBoxDarkMode ? '#d1d5db' : '#4a5568';
    el.style.cursor = 'pointer';
    el.style.lineHeight = '1';
    el.style.willChange = 'transform, left';
    el.style.textShadow = '0 0 6px rgba(209, 213, 219, 0.2)';
    el.style.transition = 'transform 0.1s ease-out';
    el.style.zIndex = '10';
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Click if this matches your ${side} target`);
    
    const isTarget = Math.random() < 0.35;
    const shapes = shapesRef.current;
    let glyph = isTarget ? targetGlyph : shapes[Math.floor(Math.random() * shapes.length)];
    
    if (!isTarget && glyph === targetGlyph) {
      glyph = shapes.find(s => s !== targetGlyph) || '■';
    }
    
    el.textContent = glyph;
    
    const containerRect = container.getBoundingClientRect();
    const startX = side === 'left' ? containerRect.width : -120;
    const endX = side === 'left' ? -120 : containerRect.width;
    
    const top = Math.random() * (containerRect.height - 150);
    el.style.top = `${top}px`;
    el.style.left = `${startX}px`;
    
    container.appendChild(el);
    
    const speed = 3.8;
    const duration = 4000 / speed;
    const startTime = performance.now();
    let hit = false;
    
    const handleClick = (e) => {
      e.stopPropagation();
      if (hit) return;
      
      if (glyph === targetGlyph) {
        hit = true;
        el.style.color = '#60a5fa';
        el.style.textShadow = '0 0 20px #60a5fa';
        handleHit(side);
      } else {
        handleMiss('WRONG SHAPE');
      }
    };
    
    el.addEventListener('mousedown', handleClick);
    
    let animId;
    function animate(currentTime) {
      if (!el.isConnected) return;
      
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;
      
      if (progress < 1) {
        const currentX = startX + (endX - startX) * progress;
        el.style.left = `${currentX}px`;
        animId = requestAnimationFrame(animate);
        animationFramesRef.current.add(animId);
      } else {
        el.removeEventListener('mousedown', handleClick);
        el.remove();
        
        if (glyph === targetGlyph && !hit && isActiveRef.current && gameStateRef.current === 'playing') {
          handleMiss('TIMEOUT');
        }
      }
    }
    
    animId = requestAnimationFrame(animate);
    animationFramesRef.current.add(animId);
  }, [leftTarget, rightTarget, isBoxDarkMode, handleHit, handleMiss]);

  const clearAllIntervals = useCallback(() => {
    if (spawnIntervalLeftRef.current) clearInterval(spawnIntervalLeftRef.current);
    if (spawnIntervalRightRef.current) clearInterval(spawnIntervalRightRef.current);
    if (targetIntervalRef.current) clearInterval(targetIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    animationFramesRef.current.forEach(id => cancelAnimationFrame(id));
    animationFramesRef.current.clear();
  }, []);

  const startGame = useCallback(() => {
    clearAllIntervals();
    
    if (leftContainerRef.current) leftContainerRef.current.innerHTML = '';
    if (rightContainerRef.current) rightContainerRef.current.innerHTML = '';
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLives(3);
    setTimeLeft(60);
    setStreak(0);
    setBestStreak(0);
    setSuccessfulHits(0);
    setMisses(0);
    setAccuracy(100);
    setFeedback('');
    
    scoreRef.current = 0;
    livesRef.current = 3;
    streakRef.current = 0;
    bestStreakRef.current = 0;
    hitsRef.current = 0;
    missesRef.current = 0;
    isActiveRef.current = true;
    
    initTargets();
    
    spawnIntervalLeftRef.current = setInterval(() => createShape('left'), 600);
    spawnIntervalRightRef.current = setInterval(() => createShape('right'), 600);
    
    targetIntervalRef.current = setInterval(() => {
      if (isActiveRef.current) {
        initTargets();
        showFeedback('🔄 Targets changed!', 'success');
      }
    }, 30000);
    
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          isActiveRef.current = false;
          clearAllIntervals();
          
          if (leftContainerRef.current) leftContainerRef.current.innerHTML = '';
          if (rightContainerRef.current) rightContainerRef.current.innerHTML = '';
          
          updateBestScore(scoreRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    showFeedback('Go! Click matching target shapes!', 'success');
  }, [clearAllIntervals, initTargets, createShape, showFeedback, updateBestScore]);

  const resetGame = useCallback(() => {
    clearAllIntervals();
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setLives(3);
    setTimeLeft(60);
    setStreak(0);
    setBestStreak(0);
    setSuccessfulHits(0);
    setMisses(0);
    setAccuracy(100);
    setFeedback('');
    
    scoreRef.current = 0;
    livesRef.current = 3;
    streakRef.current = 0;
    bestStreakRef.current = 0;
    hitsRef.current = 0;
    missesRef.current = 0;
    
    if (leftContainerRef.current) leftContainerRef.current.innerHTML = '';
    if (rightContainerRef.current) rightContainerRef.current.innerHTML = '';
  }, [clearAllIntervals]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllIntervals();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, [clearAllIntervals]);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dual-target drill...</p>
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
            "name": "Dual-Target Flow - Multi-Tasking Training",
            "url": "https://skilldrills.online/drills/productivity/task-switching/multi-tasking",
            "description": "Train divided attention by tracking two simultaneous shape streams with different targets. Left and right targets change every 30 seconds. 60-second challenge with 3 lives protection and combo streaks every 5 hits.",
            "applicationCategory": "EducationalApplication",
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
            "educationalUse": ["Multi-Tasking", "Divided Attention", "Visual Tracking", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Divided Attention", "Multi-Target Tracking", "Visual Discrimination", "Parallel Processing"]
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
              <Link href="/drills" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Drills
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li>
              <Link href="/drills/productivity" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Productivity
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Task Switching
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-current="page">
              Dual-Target Flow
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex-shrink-0">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Dual-Target Flow
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                +1 correct • 3 lives • Targets change every 30s • 60s
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset dual-target drill"
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
          <h2>Dual-Target Flow - Multi-Tasking & Divided Attention Training</h2>
          <p>
            Train divided attention by tracking two simultaneous streams of flowing shapes.
            Each side (LEFT and RIGHT) has a unique target shape displayed at the top.
            Shapes flow from center outward on both sides. Click shapes that match your assigned target.
            Left and right targets are always different and change every 30 seconds.
            8 shape types: triangle, circle, square, star, diamond, hexagon, and more.
            +1 point per correct hit. 3 lives protect your score - wrong clicks or missed targets
            deduct a life first. After lives reach 0, each miss deducts 1 point.
            60-second challenge with combo streaks every 5 consecutive correct hits.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Activity className={lives === 0 ? 'text-yellow-500' : 'text-green-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-500" />} value={bestStreak} label="Best Stk" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${
              feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedback || '\u00A0'}
          </div>
        </div>

        {/* Game Canvas Box */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#000000" : "#ffffff",
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {/* Target Headers */}
          <div className="absolute top-5 w-full flex justify-between px-16 z-20 pointer-events-none">
            <div className="flex flex-col items-center gap-1">
              <span className={`text-sm tracking-wider font-bold ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>LEFT TARGET</span>
              <span className={`text-6xl ${isBoxDarkMode ? 'text-white' : 'text-gray-800'}`} style={{ textShadow: '0 0 15px rgba(255,255,255,0.4)' }}>
                {leftTarget}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className={`text-sm tracking-wider font-bold ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>RIGHT TARGET</span>
              <span className={`text-6xl ${isBoxDarkMode ? 'text-white' : 'text-gray-800'}`} style={{ textShadow: '0 0 15px rgba(255,255,255,0.4)' }}>
                {rightTarget}
              </span>
            </div>
          </div>

          {/* Divider Line */}
          <div className="absolute top-0 left-1/2 w-px h-full bg-white/5 z-10" aria-hidden="true" />

          {/* Flow Containers */}
          <div ref={leftContainerRef} className="absolute top-0 left-0 w-1/2 h-full overflow-hidden" aria-label="Left target zone" />
          <div ref={rightContainerRef} className="absolute top-0 right-0 w-1/2 h-full overflow-hidden" aria-label="Right target zone" />

          {/* Fullscreen Controls */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset session" aria-label="Reset dual-target drill">
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

          {/* ============ START SCREEN ============ */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4">
                  <Target className="w-16 h-16 text-blue-500 mx-auto" aria-hidden="true" />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Dual-Target Flow
                </h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60-second challenge • Click matching shapes • 3 lives
                </p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Track two different target shapes flowing in opposite directions. Targets change every 30 seconds.
                </p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Start dual-target training"
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
                  <Clock className="w-10 h-10 text-orange-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Time&apos;s Up!
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Regular dual-target practice improves divided attention and multitasking ability.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={`${bestStreak}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Correct Hits" value={successfulHits} icon={<Target className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  <ResultCard label="Misses" value={misses} icon={<RefreshCw className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/productivity" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
          <footer className="mt-6" aria-label="Drill rules and scoring information">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Click <span className="font-semibold text-blue-500">matching shapes</span> for your left and right targets
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Targets change <span className="font-semibold text-green-500">every 30 seconds</span> automatically
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Shapes flow from <span className="font-semibold text-cyan-500">center outward</span> in both directions
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Correct hit: <span className="font-semibold text-emerald-500">+1 point</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Miss/Wrong: <span className="font-semibold text-red-500">-1 life, then -1pt when 0 lives</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        5 streak = <span className="font-semibold text-yellow-500">bonus notification</span> • Score never below 0
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🛡️ 3 lives protect your score • 8 unique shape types</span>
                  <span>🏆 Best Score saves locally</span>
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
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
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