'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, CheckCircle, RefreshCw
} from 'lucide-react';

export default function SelectiveAttentionClient() {
  // Drill Core State
  const [gameState, setGameState] = useState('start');
  const [items, setItems] = useState([]);
  const [targetColor, setTargetColor] = useState('');
  const [targetShape, setTargetShape] = useState('');
  const [showTargetDisplay, setShowTargetDisplay] = useState(true);
  
  // Professional Metrics
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [correctHits, setCorrectHits] = useState(0);
  const [wrongHits, setWrongHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [roundTime, setRoundTime] = useState(2000);
  const [lives, setLives] = useState(5);
  
  // UI State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // Refs for game logic
  const containerRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const roundTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const livesRef = useRef(5);
  const roundTimeRef = useRef(2000);
  const gameStateRef = useRef('start');

  const colors = useRef(['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan']);
  const shapes = useRef(['circle', 'square', 'triangle', 'star', 'heart', 'diamond']);
  
  const shapeIcons = useRef({
    circle: '⚪',
    square: '⬛',
    triangle: '🔺',
    star: '⭐',
    heart: '❤️',
    diamond: '💎'
  });

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('selectiveAttentionDrillBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Sync gameState to ref
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Update best score
  useEffect(() => {
    if (gameState === 'ended' && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('selectiveAttentionDrillBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (roundTimerRef.current) clearTimeout(roundTimerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Timer logic - 60 second countdown
  useEffect(() => {
    if (gameState === 'playing' && !showTargetDisplay) {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            handleTimeUp();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [gameState, showTargetDisplay]);

  // Toggle fullscreen
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

  // Handle fullscreen change
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
    }, 600);
  }, []);

  const initAudio = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      return audioContextRef.current;
    } catch (e) {
      return null;
    }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      
      const now = ctx.currentTime;
      const freqMap = { correct: 880, wrong: 440, penalty: 220, combo: 1046.5 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      g.gain.setValueAtTime(type === 'combo' ? 0.12 : type === 'penalty' ? 0.15 : 0.1, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (error) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  // Handle time up
  const handleTimeUp = useCallback(() => {
    if (roundTimerRef.current) {
      clearTimeout(roundTimerRef.current);
      roundTimerRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setGameState('ended');
    gameStateRef.current = 'ended';
  }, []);

  const handleMiss = useCallback((reason) => {
    if (gameStateRef.current !== 'playing') return;
    
    setMissedHits(prev => prev + 1);
    comboRef.current = 0;
    setCombo(0);
    
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('wrong');
      showFeedback(`✗ ${reason}! -1 life`, 'error');
    }
    
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      playSound('penalty');
      showFeedback(`✗ ${reason}! -1 point`, 'error');
    }
  }, [playSound, showFeedback]);

  // Generate new round
  const generateNewRound = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    
    if (roundTimerRef.current) {
      clearTimeout(roundTimerRef.current);
      roundTimerRef.current = null;
    }
    
    const newTargetColor = colors.current[Math.floor(Math.random() * colors.current.length)];
    const newTargetShape = shapes.current[Math.floor(Math.random() * shapes.current.length)];
    
    setTargetColor(newTargetColor);
    setTargetShape(newTargetShape);
    
    const newItems = [];
    const numDistractors = 5;
    
    // Add target item
    newItems.push({
      id: Date.now(),
      color: newTargetColor,
      shape: newTargetShape,
      isTarget: true,
      x: Math.random() * 70 + 15,
      y: Math.random() * 60 + 20
    });
    
    // Add distractor items
    for (let i = 0; i < numDistractors; i++) {
      let distractorColor, distractorShape;
      if (Math.random() > 0.5) {
        distractorColor = colors.current.find(c => c !== newTargetColor) || 'blue';
        distractorShape = newTargetShape;
      } else {
        distractorColor = newTargetColor;
        distractorShape = shapes.current.find(s => s !== newTargetShape) || 'circle';
      }
      
      newItems.push({
        id: Date.now() + i + 1,
        color: distractorColor,
        shape: distractorShape,
        isTarget: false,
        x: Math.random() * 70 + 15,
        y: Math.random() * 60 + 20
      });
    }
    
    setItems(newItems);
    
    roundTimerRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing' && !showTargetDisplay) {
        handleMiss('Timeout');
        generateNewRound();
      }
    }, roundTimeRef.current);
  }, [showTargetDisplay, handleMiss]);

  // Get accuracy
  const getAccuracy = useCallback(() => {
    const total = correctHits + wrongHits + missedHits;
    if (total === 0) return 100;
    return Math.round((correctHits / total) * 100);
  }, [correctHits, wrongHits, missedHits]);

  // Handle item click
  const handleItemClick = useCallback((item, isTarget) => {
    if (gameStateRef.current !== 'playing' || showTargetDisplay) return;
    
    if (roundTimerRef.current) {
      clearTimeout(roundTimerRef.current);
      roundTimerRef.current = null;
    }
    
    if (isTarget) {
      const newRoundTime = Math.max(900, roundTimeRef.current - 100);
      roundTimeRef.current = newRoundTime;
      setRoundTime(newRoundTime);
      
      scoreRef.current += 1;
      setScore(scoreRef.current);
      setCorrectHits(prev => prev + 1);
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current > bestCombo) {
        setBestCombo(comboRef.current);
      }
      
      if (comboRef.current % 5 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo!`, 'success');
      } else {
        playSound('correct');
        showFeedback('✓ +1', 'success');
      }
      
      generateNewRound();
    } else {
      setWrongHits(prev => prev + 1);
      handleMiss('Wrong');
      
      // Remove wrong item and reposition
      setItems(prev => {
        const remaining = prev.filter(i => i.id !== item.id);
        return remaining.map(i => ({
          ...i,
          x: Math.random() * 70 + 15,
          y: Math.random() * 60 + 20
        }));
      });
      
      roundTimerRef.current = setTimeout(() => {
        if (gameStateRef.current === 'playing' && !showTargetDisplay) {
          handleMiss('Timeout');
          generateNewRound();
        }
      }, roundTimeRef.current);
    }
  }, [showTargetDisplay, bestCombo, playSound, showFeedback, generateNewRound, handleMiss]);

  // Start game
  const startGame = useCallback(() => {
    if (roundTimerRef.current) clearTimeout(roundTimerRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setCorrectHits(0);
    setWrongHits(0);
    setMissedHits(0);
    setCombo(0);
    setBestCombo(0);
    setTimeRemaining(60);
    setRoundTime(2000);
    setLives(5);
    setItems([]);
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 5;
    roundTimeRef.current = 2000;
    
    initAudio();
    
    const newTargetColor = colors.current[Math.floor(Math.random() * colors.current.length)];
    const newTargetShape = shapes.current[Math.floor(Math.random() * shapes.current.length)];
    setTargetColor(newTargetColor);
    setTargetShape(newTargetShape);
    setShowTargetDisplay(true);
    
    setTimeout(() => {
      setShowTargetDisplay(false);
      generateNewRound();
    }, 2000);
  }, [generateNewRound, initAudio]);

  const resetGame = useCallback(() => {
    if (roundTimerRef.current) clearTimeout(roundTimerRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    setGameState('start');
    gameStateRef.current = 'start';
    setItems([]);
    setShowTargetDisplay(true);
    setScore(0);
    setCorrectHits(0);
    setWrongHits(0);
    setMissedHits(0);
    setCombo(0);
    setBestCombo(0);
    setTimeRemaining(60);
    setRoundTime(2000);
    setLives(5);
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 5;
    roundTimeRef.current = 2000;
  }, []);

  // Get color style
  const getColorStyle = useCallback((color) => {
    const colorMap = {
      red: 'bg-red-500', blue: 'bg-blue-500', green: 'bg-green-500',
      yellow: 'bg-yellow-500', purple: 'bg-purple-500', orange: 'bg-orange-500',
      pink: 'bg-pink-500', cyan: 'bg-cyan-500'
    };
    return colorMap[color] || 'bg-gray-500';
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading selective attention drill...</p>
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
            "name": "Selective Attention Drill",
            "url": "https://skilldrills.online/drills/cognitive/attention/selective-attention",
            "description": "Visual search training drill requiring matching both color and shape among distractors. Adaptive speed from 2000ms to 900ms. 60-second challenge with 5 lives, combo streaks, and 8 colors × 6 shapes.",
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
            "educationalUse": ["Selective Attention", "Visual Search", "Cognitive Training", "Focus Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Selective Attention", "Visual Discrimination", "Target Identification", "Distractor Filtering"]
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
              <Link href="/drills/cognitive" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Cognitive Drills
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Attention
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">
              Selective Attention
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex-shrink-0">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Selective Attention
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Find matching color & shape • 60-second challenge • 5 lives system
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset selective attention drill"
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
          <h2>Selective Attention - Visual Search & Target Identification Training</h2>
          <p>
            Train your selective attention by finding items that match BOTH a target color and shape among distractors.
            8 colors (red, blue, green, yellow, purple, orange, pink, cyan) and 6 shapes (circle, square, triangle, star, heart, diamond).
            Adaptive round speed decreases from 2000ms to 900ms with each correct hit.
            Distractors share either the color OR shape but not both, requiring focused visual discrimination.
            60-second challenge with 5 lives, combo streaks every 5 correct, and best score tracking.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-8 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle className="text-emerald-500" />} value={correctHits} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Timer className="text-cyan-600" />} value={`${roundTime}ms`} label="Speed" isDark={isDarkMode} />
          <StatCard icon={<Heart className="text-red-500" />} value={lives} label="Lives" isDark={isDarkMode} />
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

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? '#0a0a0a' : '#ffffff',
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
                aria-label="Reset selective attention drill"
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

          <div className="absolute inset-0">
            
            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Eye className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Selective Attention
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    60-second challenge • +1 per hit • 5 lives system
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Find items matching BOTH the target color and shape. Distractors share only one attribute. Speed increases with correct answers.
                  </p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    aria-label="Start selective attention drill"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* ============ TARGET DISPLAY ============ */}
            {gameState === 'playing' && showTargetDisplay && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className={`text-xl mb-4 font-semibold ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Find and click:
                  </p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className={`w-14 h-14 rounded-full shadow-lg ${getColorStyle(targetColor)}`}></div>
                    <span className="text-2xl font-bold">+</span>
                    <span className="text-5xl">{shapeIcons.current[targetShape]}</span>
                  </div>
                  <p className={`text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Target color: <span className="font-semibold capitalize">{targetColor}</span> | Target shape: <span className="font-semibold capitalize">{targetShape}</span>
                  </p>
                  <p className={`text-xs mt-2 ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Get ready...</p>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && !showTargetDisplay && (
              <>
                {/* Target reminder */}
                <div className="absolute top-4 right-4 z-10">
                  <div className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium ${isBoxDarkMode ? 'bg-zinc-800 text-gray-300 border border-zinc-700' : 'bg-gray-200 text-gray-700 border border-gray-300'}`}>
                    <div className={`w-5 h-5 rounded-full ${getColorStyle(targetColor)}`}></div>
                    <span>+</span>
                    <span className="text-xl">{shapeIcons.current[targetShape]}</span>
                  </div>
                </div>

                {/* All Items */}
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item, item.isTarget)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full"
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    aria-label={`${item.color} ${item.shape}${item.isTarget ? ' - TARGET' : ''}`}
                  >
                    <div className={`w-14 h-14 rounded-full ${getColorStyle(item.color)} flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow`}>
                      <span className="text-3xl">{shapeIcons.current[item.shape]}</span>
                    </div>
                  </button>
                ))}
              </>
            )}

            {/* ============ GAME OVER SCREEN ============ */}
            {gameState === 'ended' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                    <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Time&apos;s Up!
                    </h2>
                  </div>
                  
                  <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Keep practicing to improve your visual search speed and selective attention.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Correct Hits" value={correctHits} icon={<CheckCircle className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Max Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                    <ResultCard label="Final Speed" value={`${roundTime}ms`} icon={<Timer className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/cognitive" className="flex-1">
                      <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </span>
                    </Link>
                    <button 
                      onClick={resetGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      Play Again →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rules Section */}
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
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Find items matching <span className="font-semibold text-purple-500">BOTH color AND shape</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct hit: <span className="font-semibold text-green-500">+1 point</span> • Speed increases (-100ms)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong/Timeout: <span className="font-semibold text-red-500">-1 life</span> • 5 lives total</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>At 0 lives: <span className="font-semibold text-orange-500">-1 point penalty</span> per mistake</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Adaptive speed: <span className="font-semibold text-blue-500">2000ms → 900ms</span> with correct hits</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 5 combo = <span className="font-semibold text-yellow-500">bonus notification</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🎯 8 colors × 6 shapes • Distractors match only one attribute</span>
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
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-500', icon: 'text-amber-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
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