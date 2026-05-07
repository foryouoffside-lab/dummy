'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Layers, RotateCcw, Move, Award, RefreshCw
} from 'lucide-react';

export default function TowerOfHanoiClient() {
  const containerRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(3);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [towers, setTowers] = useState([[3,2,1], [], []]);
  const [selectedTower, setSelectedTower] = useState(null);
  const [moves, setMoves] = useState(0);
  const [minimumMoves, setMinimumMoves] = useState(7);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);
  const [perfectLevels, setPerfectLevels] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  const feedbackTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
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
      const savedBestScore = localStorage.getItem('hanoiDrillBestScore');
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
        localStorage.setItem('hanoiDrillBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

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
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      
      if (type === 'complete') {
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.linearRampToValueAtTime(1320, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'perfect') {
        osc.frequency.setValueAtTime(1046.5, now);
        osc.frequency.linearRampToValueAtTime(1568, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else {
        const freqMap = { move: 660, select: 440, wrong: 440 };
        const gainMap = { move: 0.12, select: 0.08, wrong: 0.1 };
        const durMap = { move: 0.1, select: 0.08, wrong: 0.1 };
        osc.frequency.setValueAtTime(freqMap[type] || 660, now);
        gain.gain.setValueAtTime(gainMap[type] || 0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (durMap[type] || 0.1));
        osc.start(now);
        osc.stop(now + (durMap[type] || 0.1));
      }
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  // Timer Logic
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setGameState('ended');
          gameStateRef.current = 'ended';
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
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
  }, [gameState]);

  const calculateMinimumMoves = useCallback((disks) => {
    return Math.pow(2, disks) - 1;
  }, []);

  const initializeGame = useCallback((diskCount) => {
    const newTowers = [[], [], []];
    for (let i = diskCount; i > 0; i--) {
      newTowers[0].push(i);
    }
    setTowers(newTowers);
    setSelectedTower(null);
    setMoves(0);
    setGameComplete(false);
    setMinimumMoves(calculateMinimumMoves(diskCount));
  }, [calculateMinimumMoves]);

  const advanceToNextLevel = useCallback(() => {
    if (level < 8) {
      const nextLevel = level + 1;
      setLevel(nextLevel);
      initializeGame(nextLevel);
      setGameComplete(false);
      setMoves(0);
      setSelectedTower(null);
      showFeedback(`Level ${nextLevel}! ${nextLevel} disks`, 'success');
      playSound('complete');
    } else {
      setGameState('ended');
      gameStateRef.current = 'ended';
      showFeedback('🏆 MASTER! All levels complete!', 'success');
    }
  }, [level, initializeGame, playSound, showFeedback]);

  const checkGameComplete = useCallback((currentTowers, currentMoves) => {
    if (currentTowers[2].length === level) {
      setGameComplete(true);
      
      scoreRef.current += 10;
      setScore(scoreRef.current);
      
      if (currentMoves + 1 === minimumMoves) {
        setPerfectLevels(prev => prev + 1);
        playSound('perfect');
        showFeedback('🎯 PERFECT! +10 points!', 'success');
      } else {
        playSound('complete');
        showFeedback('✓ Complete! +10', 'success');
      }
      
      setTimeout(() => {
        advanceToNextLevel();
      }, 1500);
      
      return true;
    }
    return false;
  }, [level, minimumMoves, advanceToNextLevel, playSound, showFeedback]);

  const handleTowerClick = useCallback((towerIndex) => {
    if (gameComplete || gameStateRef.current !== 'playing') return;
    if (clickCooldownRef.current) return;
    
    clickCooldownRef.current = true;
    
    if (selectedTower === null) {
      if (towers[towerIndex].length > 0) {
        setSelectedTower(towerIndex);
        playSound('select');
      }
      setTimeout(() => { clickCooldownRef.current = false; }, 50);
      return;
    }
    
    const fromTower = selectedTower;
    const toTower = towerIndex;
    
    if (fromTower === toTower) {
      setSelectedTower(null);
      setTimeout(() => { clickCooldownRef.current = false; }, 50);
      return;
    }
    
    const fromDisk = towers[fromTower][towers[fromTower].length - 1];
    const toDisk = towers[toTower][towers[toTower].length - 1];
    
    if (fromDisk && (!toDisk || fromDisk < toDisk)) {
      const newTowers = towers.map(t => [...t]);
      const disk = newTowers[fromTower].pop();
      newTowers[toTower].push(disk);
      setTowers(newTowers);
      const newMoves = moves + 1;
      setMoves(newMoves);
      setSelectedTower(null);
      playSound('move');
      
      checkGameComplete(newTowers, newMoves);
    } else {
      showFeedback('✗ Cannot place larger disk on smaller', 'error');
      playSound('wrong');
      setSelectedTower(null);
    }
    
    setTimeout(() => {
      clickCooldownRef.current = false;
    }, 50);
  }, [gameComplete, selectedTower, towers, moves, playSound, showFeedback, checkGameComplete]);

  useEffect(() => {
    if (gameState === 'playing') {
      initializeGame(level);
    }
  }, [gameState, level, initializeGame]);

  const resetLevel = useCallback(() => {
    initializeGame(level);
    setMoves(0);
    setGameComplete(false);
    setSelectedTower(null);
    showFeedback('Level reset', 'success');
  }, [level, initializeGame, showFeedback]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setFeedback('');
    setFeedbackType('');
  }, []);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLevel(3);
    setTimeRemaining(60);
    setMoves(0);
    setGameComplete(false);
    setPerfectLevels(0);
    setFeedback('');
    
    scoreRef.current = 0;
    clickCooldownRef.current = false;
    
    initializeGame(3);
    playSound('select');
  }, [initializeGame, playSound]);

  const getDiskColor = useCallback((diskSize) => {
    const colors = [
      'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 
      'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 
      'bg-purple-500', 'bg-pink-500'
    ];
    return colors[(diskSize - 1) % colors.length];
  }, []);

  const getDiskWidth = useCallback((diskSize, maxDisks) => {
    const maxWidth = 140;
    const minWidth = 40;
    const width = minWidth + ((diskSize - 1) / (maxDisks - 1)) * (maxWidth - minWidth);
    return `${width}px`;
  }, []);

  const getEfficiency = useCallback(() => {
    if (moves === 0) return 100;
    return Math.min(100, Math.round((minimumMoves / moves) * 100));
  }, [moves, minimumMoves]);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tower of hanoi drill...</p>
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
            "name": "Tower of Hanoi Drill",
            "url": "https://skilldrills.online/drills/cognitive/problem-solving/tower-of-hanoi",
            "description": "Classic recursive puzzle with progressive 3-8 disk levels. Auto-advancing difficulty with perfect move celebrations. 60-second challenge with efficiency scoring and no penalties for invalid moves.",
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
            "educationalUse": ["Problem Solving", "Strategic Planning", "Recursive Thinking", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Recursive Problem Solving", "Strategic Planning", "Algorithmic Thinking", "Logical Deduction"]
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
              Problem Solving
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} aria-current="page">
              Tower of Hanoi
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex-shrink-0">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Tower of Hanoi
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Move disks to right tower • +10 per level • No penalties • 3-8 disks
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset tower of hanoi drill"
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
          <h2>Tower of Hanoi - Recursive Problem Solving Training</h2>
          <p>
            Master the classic Tower of Hanoi puzzle with progressive difficulty from 3 to 8 disks.
            Move all disks from Tower 1 to Tower 3 following these rules:
            Only one disk can be moved at a time. Never place a larger disk on top of a smaller disk.
            Each level completion earns +10 points. Perfect solutions (minimum moves) earn special celebration.
            Minimum moves scale exponentially: 3 disks = 7, 4 = 15, 5 = 31, 6 = 63, 7 = 127, 8 = 255.
            No penalties for invalid moves - pure positive problem-solving training.
            60-second timed challenge with best score saved locally.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Layers className="text-purple-500" />} value={level} label="Disks" isDark={isDarkMode} />
          <StatCard icon={<Move className="text-orange-500" />} value={`${moves}/${minimumMoves}`} label="Moves" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-emerald-600" />} value={getEfficiency()} label="Efficiency" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-amber-600" />} value={perfectLevels} label="Perfect" isDark={isDarkMode} />
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
                aria-label="Reset tower of hanoi drill"
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

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
            
            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Layers className="w-16 h-16 text-amber-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Tower of Hanoi
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    60-second challenge • +10 per level • 3-8 disks
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Move all disks from Tower 1 to Tower 3. Never place larger on smaller. Perfect solutions earn special celebration.
                  </p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    aria-label="Start tower of hanoi drill"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && (
              <div className="w-full">
                <div className="flex justify-around items-end">
                  {[0, 1, 2].map((towerIdx) => (
                    <button
                      key={towerIdx} 
                      onClick={() => handleTowerClick(towerIdx)}
                      className={`flex flex-col items-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-2 ${
                        selectedTower === towerIdx ? 'transform scale-105 ring-2 ring-amber-400' : 'hover:scale-102'
                      }`}
                      aria-label={`Tower ${towerIdx + 1}${selectedTower === towerIdx ? ' - selected' : ''}. ${towers[towerIdx].length} disks.`}
                    >
                      <div className="relative flex flex-col items-center">
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 rounded-t-full z-0"
                             style={{ height: `${level * 32 + 20}px`, background: isBoxDarkMode ? 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)' : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)' }} />
                        <div className="flex flex-col-reverse items-center mb-2 relative z-10 min-h-[32px]">
                          {towers[towerIdx].map((disk, diskIdx) => (
                            <div 
                              key={diskIdx} 
                              className={`${getDiskColor(disk)} rounded-lg mb-0.5 transition-all duration-300 shadow-lg`}
                              style={{ width: getDiskWidth(disk, level), height: '28px', border: isBoxDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)' }} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="w-32 sm:w-40 h-2.5 rounded-full mt-1"
                           style={{ background: isBoxDarkMode ? 'linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)' : 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)' }} />
                      <div className={`mt-3 text-sm font-medium ${selectedTower === towerIdx ? 'text-amber-500' : isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Tower {towerIdx + 1}{selectedTower === towerIdx && ' ▼'}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-center gap-4 mt-6 sm:mt-8">
                  <button 
                    onClick={resetLevel} 
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition hover:scale-105 active:scale-95 ${isBoxDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500`}
                    aria-label="Reset current level"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset Level
                  </button>
                </div>
              </div>
            )}

            {/* ============ GAME OVER SCREEN ============ */}
            {gameState === 'ended' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Trophy className="w-10 h-10 text-yellow-500" aria-hidden="true" />
                    <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {level >= 8 ? '🏆 MASTER!' : "Time's Up!"}
                    </h2>
                  </div>
                  
                  <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Keep practicing to master recursive problem solving and strategic planning.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Max Disks" value={level} icon={<Layers className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Perfect Levels" value={perfectLevels} icon={<Award className="w-4 h-4" />} color="amber" isDark={isBoxDarkMode} />
                    <ResultCard label="Total Moves" value={moves} icon={<Move className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                    <ResultCard label="Efficiency" value={`${getEfficiency()}%`} icon={<BarChart3 className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/cognitive" className="flex-1">
                      <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </span>
                    </Link>
                    <button 
                      onClick={startGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      <RotateCcw className="w-4 h-4 inline mr-2" /> Play Again
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Move all disks from <span className="font-semibold text-amber-500">Tower 1 to Tower 3</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete level: <span className="font-semibold text-green-500">+10 points</span> • Fixed reward</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Invalid move: <span className="font-semibold text-blue-500">No penalty</span> • Pure positive training</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Auto-advances: 3 → 4 → ... → <span className="font-semibold text-purple-500">8 disks</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Never place larger disk on <span className="font-semibold text-yellow-500">smaller disk</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Perfect moves = <span className="font-semibold text-orange-500">special celebration sound</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🎯 Min moves: 3→7, 4→15, 5→31, 6→63, 7→127, 8→255 (2ⁿ−1)</span>
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
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-500', icon: 'text-amber-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
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