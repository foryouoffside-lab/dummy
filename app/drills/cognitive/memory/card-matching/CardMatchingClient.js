'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Award, Grid, Heart, Star, Circle, Square,
  Triangle, Diamond, Hexagon, Activity, Clock, CheckCircle, RefreshCw
} from 'lucide-react';

export default function CardMatchingClient() {
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [gridCols, setGridCols] = useState(4);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // Refs
  const gameContainerRef = useRef(null);
  const timeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const gameStateRef = useRef('start');
  const clickCooldownRef = useRef(false);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('cardMatchingDrillBestScore');
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
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('cardMatchingDrillBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const element = gameContainerRef.current;
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
      
      const freqMap = { flip: 660, match: 880, mismatch: 440, levelup: 660, combo: 1046.5 };
      const gainMap = { flip: 0.08, match: 0.12, mismatch: 0.1, levelup: 0.15, combo: 0.12 };
      const durMap = { flip: 0.08, match: 0.15, mismatch: 0.1, levelup: 0.4, combo: 0.15 };
      
      if (type === 'levelup') {
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.2);
        osc.frequency.linearRampToValueAtTime(1320, now + 0.3);
        g.gain.setValueAtTime(0.15, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else {
        osc.frequency.setValueAtTime(freqMap[type] || 660, now);
        g.gain.setValueAtTime(gainMap[type] || 0.1, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + (durMap[type] || 0.15));
        osc.start(now);
        osc.stop(now + (durMap[type] || 0.15));
      }
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  // Card icons for different levels
  const getCardIcons = useCallback(() => {
    const iconSets = [
      { icon: Heart, name: 'heart', color: 'text-red-500' },
      { icon: Star, name: 'star', color: 'text-yellow-500' },
      { icon: Circle, name: 'circle', color: 'text-blue-500' },
      { icon: Square, name: 'square', color: 'text-green-500' },
      { icon: Triangle, name: 'triangle', color: 'text-purple-500' },
      { icon: Diamond, name: 'diamond', color: 'text-pink-500' },
      { icon: Target, name: 'target', color: 'text-orange-500' },
      { icon: Award, name: 'award', color: 'text-indigo-500' },
      { icon: Zap, name: 'zap', color: 'text-amber-500' },
      { icon: Trophy, name: 'trophy', color: 'text-yellow-600' },
      { icon: Hexagon, name: 'hexagon', color: 'text-cyan-500' },
      { icon: Grid, name: 'grid', color: 'text-teal-500' },
      { icon: Eye, name: 'eye', color: 'text-emerald-500' },
      { icon: Activity, name: 'activity', color: 'text-rose-500' },
      { icon: Clock, name: 'clock', color: 'text-sky-500' }
    ];
    
    let pairsCount;
    let cols;
    
    if (level === 1) { pairsCount = 6; cols = 3; }
    else if (level === 2) { pairsCount = 8; cols = 4; }
    else if (level === 3) { pairsCount = 10; cols = 4; }
    else if (level === 4) { pairsCount = 12; cols = 4; }
    else if (level === 5) { pairsCount = 14; cols = 4; }
    else if (level === 6) { pairsCount = 16; cols = 4; }
    else { pairsCount = Math.min(16 + Math.floor((level - 6) / 2) * 2, 32); cols = pairsCount <= 20 ? 5 : 6; }
    
    setGridCols(cols);
    
    const selectedIcons = iconSets.slice(0, pairsCount);
    
    let cardDeck = [];
    selectedIcons.forEach((iconSet, idx) => {
      cardDeck.push({ id: idx * 2, icon: iconSet.icon, name: iconSet.name, color: iconSet.color, matched: false });
      cardDeck.push({ id: idx * 2 + 1, icon: iconSet.icon, name: iconSet.name, color: iconSet.color, matched: false });
    });
    
    for (let i = cardDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardDeck[i], cardDeck[j]] = [cardDeck[j], cardDeck[i]];
    }
    
    return cardDeck;
  }, [level]);

  const initGame = useCallback(() => {
    const newCards = getCardIcons();
    setCards(newCards);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setMoves(0);
    setMatches(0);
    setWaiting(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [getCardIcons]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          playSound('levelup');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [gameState, playSound]);

  useEffect(() => {
    if (gameState === 'playing') {
      initGame();
    }
  }, [gameState, level, initGame]);

  const getAccuracy = useCallback(() => {
    if (moves === 0) return 100;
    return Math.round((matches / moves) * 100);
  }, [moves, matches]);

  const levelComplete = useCallback(() => {
    scoreRef.current += 10;
    setScore(scoreRef.current);
    showFeedback(`🎯 Level ${level} Complete! +10`, 'success');
    playSound('levelup');
    
    setTimeout(() => {
      setLevel(prev => prev + 1);
      setMatches(0);
      comboRef.current = 0;
      setCombo(0);
      setFlippedIndices([]);
      setMatchedIndices([]);
    }, 1200);
  }, [level, playSound, showFeedback]);

  const checkMatch = useCallback((idx1, idx2) => {
    const card1 = cards[idx1];
    const card2 = cards[idx2];
    
    if (card1.name === card2.name) {
      setMatches(prev => prev + 1);
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current > bestCombo) {
        setBestCombo(comboRef.current);
      }
      
      const newMatched = [...matchedIndices, idx1, idx2];
      setMatchedIndices(newMatched);
      setFlippedIndices([]);
      
      if (comboRef.current % 3 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo!`, 'success');
      } else {
        playSound('match');
        showFeedback('✓ Match!', 'success');
      }
      
      if (newMatched.length === cards.length) {
        levelComplete();
      }
    } else {
      comboRef.current = 0;
      setCombo(0);
      showFeedback('✗ No match', 'error');
      playSound('mismatch');
      
      setWaiting(true);
      timeoutRef.current = setTimeout(() => {
        setFlippedIndices([]);
        setWaiting(false);
      }, 600);
    }
  }, [cards, matchedIndices, bestCombo, playSound, showFeedback, levelComplete]);

  const handleCardClick = useCallback((index) => {
    if (waiting) return;
    if (matchedIndices.includes(index)) return;
    if (flippedIndices.includes(index)) return;
    if (flippedIndices.length === 2) return;
    if (gameStateRef.current !== 'playing') return;
    if (clickCooldownRef.current) return;

    clickCooldownRef.current = true;
    playSound('flip');
    
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);
    
    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      checkMatch(newFlipped[0], newFlipped[1]);
    }
    
    setTimeout(() => {
      clickCooldownRef.current = false;
    }, 100);
  }, [waiting, matchedIndices, flippedIndices, playSound, checkMatch]);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLevel(1);
    setTimeRemaining(60);
    setMoves(0);
    setMatches(0);
    setCombo(0);
    setBestCombo(0);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setFeedback('');
    setWaiting(false);
    setGridCols(3);
    
    scoreRef.current = 0;
    comboRef.current = 0;
    clickCooldownRef.current = false;
    
    initGame();
  }, [initGame]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setFeedback('');
    setFeedbackType('');
  }, []);

  const getCardSize = useCallback(() => {
    if (level <= 2) return { min: '70px', max: '90px', icon: 'w-6 h-6 md:w-7 md:h-7' };
    if (level <= 4) return { min: '60px', max: '80px', icon: 'w-5 h-5 md:w-6 md:h-6' };
    if (level <= 6) return { min: '50px', max: '70px', icon: 'w-5 h-5 md:w-5 md:h-5' };
    return { min: '40px', max: '55px', icon: 'w-4 h-4 md:w-4 md:h-4' };
  }, [level]);

  const getGridTemplate = useCallback(() => {
    const totalCards = cards.length;
    const rows = Math.ceil(totalCards / gridCols);
    return {
      gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`
    };
  }, [cards.length, gridCols]);

  const cardSize = getCardSize();

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading card matching drill...</p>
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
            "name": "Card Matching Drill - Visual Memory Training",
            "url": "https://skilldrills.online/drills/cognitive/memory/card-matching",
            "description": "Visual memory pair matching game with 15+ unique icons on expanding grids from 12 to 32+ cards. Progressive difficulty, combo streaks, and +10 points per grid completion. 60-second timed challenge.",
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
            "educationalUse": ["Visual Memory", "Pattern Recognition", "Concentration", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Visual Memory", "Spatial Recall", "Pattern Matching", "Concentration"]
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
              Memory
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`} aria-current="page">
              Card Matching
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex-shrink-0">
              <Grid className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Card Matching
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Match pairs • 60-second challenge • +10 per grid • Progressive levels
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset card matching drill"
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
          <h2>Card Matching - Visual Memory & Pair Recall Training</h2>
          <p>
            Train visual memory by matching pairs of icons on progressively expanding grids.
            15+ unique icons including shapes, symbols, and objects with distinct colors.
            Grids expand from 12 cards (3×4) at level 1 to 32+ cards (6×6+) at higher levels.
            Earn +10 points for completing each grid. Combo streaks at every 3 consecutive matches.
            No penalties - pure positive reinforcement memory training.
            60-second timed challenge with best score saved locally.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-600" />} value={level} label="Level" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle className="text-emerald-600" />} value={matches} label="Pairs" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-amber-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
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
          ref={gameContainerRef}
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
                aria-label="Reset card matching drill"
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

          <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
            
            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Grid className="w-16 h-16 text-pink-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Card Matching
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    60-second challenge • +10 per grid • Progressive levels
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Flip cards to find matching pairs. Grids expand as you progress. No penalties - pure positive memory training.
                  </p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    aria-label="Start card matching drill"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && cards.length > 0 && (
              <div className="w-full h-full flex items-center justify-center">
                <div 
                  className="grid gap-1.5 sm:gap-2 md:gap-2.5 place-items-center"
                  style={{
                    ...getGridTemplate(),
                    maxWidth: gridCols <= 3 ? '350px' : gridCols <= 4 ? '450px' : gridCols <= 5 ? '550px' : '650px',
                  }}
                  role="grid"
                  aria-label={`Card matching grid - Level ${level} with ${cards.length / 2} pairs`}
                >
                  {cards.map((card, index) => {
                    const isFlipped = flippedIndices.includes(index);
                    const isMatched = matchedIndices.includes(index);
                    const IconComponent = card.icon;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleCardClick(index)}
                        disabled={isMatched || waiting}
                        className={`
                          aspect-square rounded-lg font-bold transition-all duration-200
                          ${isMatched ? 'opacity-0 pointer-events-none' : ''}
                          ${isFlipped ? 'bg-white shadow-md scale-95' : `shadow-sm hover:scale-[0.98] ${isBoxDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-pink-400 to-rose-500'}`}
                          ${!isFlipped && !isMatched ? 'cursor-pointer' : ''}
                          flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-pink-500
                        `}
                        style={{
                          width: '100%',
                          height: '100%',
                          minWidth: cardSize.min,
                          minHeight: cardSize.min,
                          maxWidth: cardSize.max,
                          maxHeight: cardSize.max,
                        }}
                        aria-label={isFlipped || isMatched ? `${card.name} - ${isMatched ? 'matched' : 'flipped'}` : 'Hidden card'}
                      >
                        <div className="flex items-center justify-center w-full h-full">
                          {(isFlipped || isMatched) ? (
                            <IconComponent className={`${cardSize.icon} ${card.color}`} />
                          ) : (
                            <Grid className={`${cardSize.icon} ${isBoxDarkMode ? 'text-gray-500' : 'text-white opacity-60'}`} />
                          )}
                        </div>
                      </button>
                    );
                  })}
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
                    Keep practicing to improve your visual memory and pattern recognition speed.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Level" value={level} icon={<Award className="w-4 h-4" />} color="pink" isDark={isBoxDarkMode} />
                    <ResultCard label="Pairs Matched" value={matches} icon={<CheckCircle className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Max Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/cognitive" className="flex-1">
                      <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </span>
                    </Link>
                    <button 
                      onClick={startGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Flip cards to <span className="font-semibold text-pink-500">find matching pairs</span> of identical icons</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Grid complete: <span className="font-semibold text-green-500">+10 points</span> • Fixed reward</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No penalties • <span className="font-semibold text-blue-500">Pure positive reinforcement</span></p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Grids expand: <span className="font-semibold text-purple-500">12 cards → 32+ cards</span> per level</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 combo = <span className="font-semibold text-orange-500">bonus notification</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>15+ unique icons • <span className="font-semibold text-yellow-500">60 second challenge</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🎴 Hearts, Stars, Shapes & more • Progressive difficulty scaling</span>
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
    pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-500', icon: 'text-pink-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
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