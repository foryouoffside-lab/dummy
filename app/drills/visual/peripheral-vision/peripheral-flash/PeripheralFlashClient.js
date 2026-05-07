'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Award, Activity, BarChart3, RefreshCw, ScanEye,
  Circle, Square, Triangle
} from 'lucide-react';

// Adjusted timing for better training experience
const FLASH_DURATION = 300; // Increased from 150ms to 300ms - more visible
const FLASH_GAP = 500; // Increased from 300ms to 500ms - clearer separation between flashes
const SEQUENCE_GAP_MIN = 2000; // Increased to give more processing time
const SEQUENCE_GAP_MAX = 4000; // Increased max gap
const FLASHES_MIN = 1;
const FLASHES_MAX = 4; // Reduced from 5 to 4 for better learning curve
const PERIPHERAL_DISTANCE = 35; // Slightly reduced for better initial detection
const GAME_DURATION = 60;
const CORRECT_BONUS = 10; // Increased from 1 for better score progression
const WRONG_PENALTY = 0;
const STREAK_BONUS_THRESHOLD = 3; // Reduced from 5 for more frequent rewards

const SHAPES = ['circle', 'square', 'triangle', 'diamond'];
const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function PeripheralFlashClient() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const gameAreaRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [totalHits, setTotalHits] = useState(0);
  const [totalMisses, setTotalMisses] = useState(0);
  const [totalPasses, setTotalPasses] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashData, setFlashData] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [flashCount, setFlashCount] = useState(0);
  const [totalFlashesInSequence, setTotalFlashesInSequence] = useState(0);
  const [showSequenceIndicator, setShowSequenceIndicator] = useState(false);
  
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const flashSequenceTimeoutRef = useRef(null);
  const sequenceGapTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const totalHitsRef = useRef(0);
  const totalMissesRef = useRef(0);
  const totalPassesRef = useRef(0);
  const bestStreakRef = useRef(0);
  const currentSequenceRef = useRef([]);
  const currentFlashIndexRef = useRef(0);
  const flashAnimationRef = useRef(null);

  // Mark as client-side
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('peripheralFlashBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best score
  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBest = parseInt(localStorage.getItem('peripheralFlashBestScore') || '0', 10);
      if (finalScore > currentBest) {
        localStorage.setItem('peripheralFlashBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element?.requestFullscreen) { await element.requestFullscreen(); setIsFullscreen(true); }
      } else {
        if (document.fullscreenElement) await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) { console.error('Fullscreen error:', error); }
  }, [isFullscreen]);

  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 2000);
  }, []);

  const initAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
      return audioCtxRef.current;
    } catch (e) { return null; }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio(); if (!ctx) return;
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      const now = ctx.currentTime;
      const f = { correct: 880, wrong: 440, streak: 1046.5, flash: 660, pass: 330 };
      o.frequency.setValueAtTime(f[type] || 440, now);
      g.gain.setValueAtTime(type === 'wrong' ? 0.05 : 0.08, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      o.start(now); o.stop(now + 0.2);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  const clearAllIntervals = useCallback(() => {
    if (flashSequenceTimeoutRef.current) clearTimeout(flashSequenceTimeoutRef.current);
    if (sequenceGapTimeoutRef.current) clearTimeout(sequenceGapTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (flashAnimationRef.current) cancelAnimationFrame(flashAnimationRef.current);
  }, []);

  const generateFlashSequence = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    // Generate random number of flashes
    const numFlashes = Math.floor(Math.random() * (FLASHES_MAX - FLASHES_MIN + 1)) + FLASHES_MIN;
    setTotalFlashesInSequence(numFlashes);
    setShowSequenceIndicator(numFlashes > 1);
    
    // Generate flash sequence with better positioning
    const sequence = [];
    const usedPositions = new Set();
    
    for (let i = 0; i < numFlashes; i++) {
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      
      // Better peripheral positioning with overlap prevention
      let position;
      do {
        const area = Math.floor(Math.random() * 8); // 8 directional areas
        let x, y;
        
        switch(area) {
          case 0: // top
            x = 20 + Math.random() * 60;
            y = 5 + Math.random() * 20;
            break;
          case 1: // top-right
            x = 70 + Math.random() * 25;
            y = 5 + Math.random() * 20;
            break;
          case 2: // right
            x = 80 + Math.random() * 15;
            y = 20 + Math.random() * 60;
            break;
          case 3: // bottom-right
            x = 70 + Math.random() * 25;
            y = 80 + Math.random() * 15;
            break;
          case 4: // bottom
            x = 20 + Math.random() * 60;
            y = 80 + Math.random() * 15;
            break;
          case 5: // bottom-left
            x = 5 + Math.random() * 25;
            y = 80 + Math.random() * 15;
            break;
          case 6: // left
            x = 5 + Math.random() * 15;
            y = 20 + Math.random() * 60;
            break;
          case 7: // top-left
            x = 5 + Math.random() * 25;
            y = 5 + Math.random() * 20;
            break;
        }
        position = `${Math.round(x)},${Math.round(y)}`;
      } while (usedPositions.has(position) && usedPositions.size < 8);
      
      usedPositions.add(position);
      const [posX, posY] = position.split(',').map(Number);
      
      sequence.push({ shape, color, x: posX, y: posY });
    }
    
    currentSequenceRef.current = sequence;
    currentFlashIndexRef.current = 0;
    
    // Small delay before starting sequence
    flashSequenceTimeoutRef.current = setTimeout(() => {
      showNextFlash();
    }, 500);
  }, []);

  const showNextFlash = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    const sequence = currentSequenceRef.current;
    const index = currentFlashIndexRef.current;
    
    if (index >= sequence.length) {
      // Sequence complete, show response UI
      setIsFlashing(false);
      setFlashData(null);
      setShowSequenceIndicator(false);
      
      // Small delay before showing response
      flashSequenceTimeoutRef.current = setTimeout(() => {
        if (isActiveRef.current && gameStateRef.current === 'playing') {
          setShowResponse(true);
        }
      }, 300);
      return;
    }
    
    // Show current flash with smooth animation
    const flash = sequence[index];
    setFlashData(flash);
    setIsFlashing(true);
    setFlashCount(index + 1);
    playSound('flash');
    
    // Hide after flash duration with smooth transition
    flashSequenceTimeoutRef.current = setTimeout(() => {
      // Fade out animation
      if (flashAnimationRef.current) cancelAnimationFrame(flashAnimationRef.current);
      
      setFlashData(null);
      setIsFlashing(false);
      
      currentFlashIndexRef.current++;
      
      // Show next flash after gap
      if (currentFlashIndexRef.current < sequence.length) {
        flashSequenceTimeoutRef.current = setTimeout(() => {
          showNextFlash();
        }, FLASH_GAP);
      } else {
        // All flashes shown
        setShowSequenceIndicator(false);
        flashSequenceTimeoutRef.current = setTimeout(() => {
          if (isActiveRef.current && gameStateRef.current === 'playing') {
            setShowResponse(true);
          }
        }, FLASH_GAP);
      }
    }, FLASH_DURATION);
  }, [playSound]);

  const handleResponse = useCallback((response) => {
    if (!isActiveRef.current) return;
    
    const sequence = currentSequenceRef.current;
    const targetFlash = sequence[sequence.length - 1];
    const correct = response === targetFlash.shape;
    
    if (correct) {
      scoreRef.current += CORRECT_BONUS + (streakRef.current * 2); // Bonus for streak
      setScore(scoreRef.current);
      totalHitsRef.current++;
      setTotalHits(totalHitsRef.current);
      streakRef.current++;
      setStreak(streakRef.current);
      
      if (streakRef.current > bestStreakRef.current) {
        bestStreakRef.current = streakRef.current;
        setBestStreak(streakRef.current);
      }
      
      playSound('correct');
      
      if (streakRef.current % STREAK_BONUS_THRESHOLD === 0) {
        playSound('streak');
        showFeedback(`🔥 ${streakRef.current} Streak! +${CORRECT_BONUS + (streakRef.current * 2)}`, 'success');
      } else {
        showFeedback(`✓ Correct! +${CORRECT_BONUS + (streakRef.current * 2)}`, 'success');
      }
    } else {
      totalMissesRef.current++;
      setTotalMisses(totalMissesRef.current);
      streakRef.current = 0;
      setStreak(0);
      
      if (response === 'pass') {
        totalPassesRef.current++;
        setTotalPasses(totalPassesRef.current);
        playSound('pass');
        showFeedback(`Passed - Shape was ${targetFlash.shape}`, 'warning');
      } else {
        playSound('wrong');
        showFeedback(`Wrong - Shape was ${targetFlash.shape}`, 'error');
      }
    }
    
    // Reset for next sequence
    setShowResponse(false);
    currentSequenceRef.current = [];
    setFlashCount(0);
    setTotalFlashesInSequence(0);
    
    // Schedule next sequence after random gap
    scheduleNextSequence();
  }, [playSound, showFeedback]);

  const scheduleNextSequence = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    const delay = Math.random() * (SEQUENCE_GAP_MAX - SEQUENCE_GAP_MIN) + SEQUENCE_GAP_MIN;
    sequenceGapTimeoutRef.current = setTimeout(() => {
      generateFlashSequence();
    }, delay);
  }, [generateFlashSequence]);

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(p => {
          if (p <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            clearAllIntervals();
            updateBestScore(scoreRef.current);
            setShowResponse(false);
            setIsFlashing(false);
            setFlashData(null);
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current);
              timerIntervalRef.current = null;
            }
            return 0;
          }
          return p - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [gameState, timeLeft, updateBestScore, clearAllIntervals]);

  const startGame = useCallback(() => {
    clearAllIntervals();
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(GAME_DURATION);
    setTotalHits(0);
    setTotalMisses(0);
    setTotalPasses(0);
    setFeedback('');
    setShowResponse(false);
    setFlashData(null);
    setIsFlashing(false);
    setFlashCount(0);
    setTotalFlashesInSequence(0);
    setShowSequenceIndicator(false);
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    streakRef.current = 0;
    bestStreakRef.current = 0;
    totalHitsRef.current = 0;
    totalMissesRef.current = 0;
    totalPassesRef.current = 0;
    currentSequenceRef.current = [];
    currentFlashIndexRef.current = 0;
    
    showFeedback('Focus on center • Detect flashes in periphery', 'success');
    
    // Start first sequence after a delay
    setTimeout(() => generateFlashSequence(), 2000);
  }, [clearAllIntervals, generateFlashSequence, showFeedback]);

  const resetGame = useCallback(() => {
    clearAllIntervals();
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setFeedback('');
    setFeedbackType('');
    setShowResponse(false);
    setFlashData(null);
    setIsFlashing(false);
    setFlashCount(0);
    setTotalFlashesInSequence(0);
    setShowSequenceIndicator(false);
  }, [clearAllIntervals]);

  const getAccuracy = useCallback(() => {
    const t = totalHits + totalMisses;
    return t > 0 ? Math.round((totalHits / t) * 100) : 0;
  }, [totalHits, totalMisses]);

  useEffect(() => {
    return () => {
      clearAllIntervals();
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, [clearAllIntervals]);

  // Render shapes more professionally
  const renderShapeSVG = (shape, color = '#6366f1', size = 48) => {
    const strokeWidth = 3;
    switch(shape) {
      case 'circle':
        return (
          <svg width={size} height={size} viewBox="0 0 48 48">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <circle cx="24" cy="24" r="20" fill={color} opacity="0.9" filter="url(#glow)"/>
            <circle cx="24" cy="24" r="20" fill="none" stroke="white" strokeWidth={strokeWidth} opacity="0.8"/>
          </svg>
        );
      case 'square':
        return (
          <svg width={size} height={size} viewBox="0 0 48 48">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <rect x="4" y="4" width="40" height="40" rx="4" fill={color} opacity="0.9" filter="url(#glow)"/>
            <rect x="4" y="4" width="40" height="40" rx="4" fill="none" stroke="white" strokeWidth={strokeWidth} opacity="0.8"/>
          </svg>
        );
      case 'triangle':
        return (
          <svg width={size} height={size} viewBox="0 0 48 48">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <polygon points="24,4 44,44 4,44" fill={color} opacity="0.9" filter="url(#glow)"/>
            <polygon points="24,4 44,44 4,44" fill="none" stroke="white" strokeWidth={strokeWidth} opacity="0.8"/>
          </svg>
        );
      case 'diamond':
        return (
          <svg width={size} height={size} viewBox="0 0 48 48">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <polygon points="24,4 44,24 24,44 4,24" fill={color} opacity="0.9" filter="url(#glow)"/>
            <polygon points="24,4 44,24 24,44 4,24" fill="none" stroke="white" strokeWidth={strokeWidth} opacity="0.8"/>
          </svg>
        );
      default:
        return null;
    }
  };

  if (loading || !isClient) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Preparing peripheral vision training...</p>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen select-none transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ 
        "@context": "https://schema.org", 
        "@type": "WebApplication", 
        "name": "Peripheral Flash", 
        "url": "https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash", 
        "description": "Professional peripheral vision training with controlled flash sequences. Progressive difficulty with variable sequences of 1-4 flashes at 300ms each.", 
        "applicationCategory": "EducationalApplication", 
        "operatingSystem": "Web", 
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, 
        "author": { "@type": "Organization", "name": "Global Drill System" }
      }) }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className={`hover:underline transition-colors ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
            <li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`} aria-hidden="true">/</li>
            <li><Link href="/drills/visual" className={`hover:underline transition-colors ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Visual Drills</Link></li>
            <li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode?'text-purple-400':'text-purple-600'}`} aria-current="page">Peripheral Flash</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex-shrink-0 shadow-lg">
              <ScanEye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Peripheral Flash</h1>
              <p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Professional vision training • Controlled sequences • 60s rounds</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex gap-2 flex-shrink-0">
            {gameState==='playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2.5 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700':'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset" 
                aria-label="Reset"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={()=>setIsDarkMode(!isDarkMode)} 
              className={`p-2.5 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} 
              aria-label={isDarkMode?'Light mode':'Dark mode'}
            >
              {isDarkMode?<Sun className="w-5 h-5" />:<Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} 
              className={`p-2.5 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} 
              aria-label="Toggle game area theme"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button 
              onClick={()=>setSoundEnabled(!soundEnabled)} 
              className={`p-2.5 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} 
              aria-label={soundEnabled?'Mute sound':'Enable sound'}
            >
              {soundEnabled?<Volume2 className="w-5 h-5" />:<VolumeX className="w-5 h-5" />}
            </button>
            <button 
              onClick={toggleFullscreen} 
              className={`p-2.5 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} 
              aria-label={isFullscreen?'Exit fullscreen':'Enter fullscreen'}
            >
              {isFullscreen?<Minimize2 className="w-5 h-5" />:<Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mb-4">
          <StatCard icon={<Target className="w-4 h-4" />} value={score} label="Score" color="blue" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="w-4 h-4" />} value={bestScore} label="Best" color="yellow" isDark={isDarkMode} />
          <StatCard icon={<Timer className="w-4 h-4" />} value={timeLeft} label="Time" unit="s" color={timeLeft<20?'red':'green'} isDark={isDarkMode} />
          <StatCard icon={<Zap className="w-4 h-4" />} value={streak} label="Streak" color="orange" isDark={isDarkMode} />
          <StatCard icon={<Award className="w-4 h-4" />} value={totalHits} label="Hits" color="emerald" isDark={isDarkMode} className="hidden sm:block" />
          <StatCard icon={<Activity className="w-4 h-4" />} value={getAccuracy()} label="Accuracy" unit="%" color="purple" isDark={isDarkMode} className="hidden sm:block" />
          <StatCard icon={<ScanEye className="w-4 h-4" />} value={totalPasses} label="Passed" color="pink" isDark={isDarkMode} className="hidden sm:block" />
        </div>

        {/* Mobile Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 sm:hidden">
          <div className={`text-center p-2 rounded-lg ${isDarkMode?'bg-gray-800':'bg-white'} border ${isDarkMode?'border-gray-700':'border-gray-200'}`}>
            <span className="text-xs text-gray-500">Hits</span>
            <p className={`font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>{totalHits}</p>
          </div>
          <div className={`text-center p-2 rounded-lg ${isDarkMode?'bg-gray-800':'bg-white'} border ${isDarkMode?'border-gray-700':'border-gray-200'}`}>
            <span className="text-xs text-gray-500">Accuracy</span>
            <p className={`font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>{getAccuracy()}%</p>
          </div>
          <div className={`text-center p-2 rounded-lg ${isDarkMode?'bg-gray-800':'bg-white'} border ${isDarkMode?'border-gray-700':'border-gray-200'}`}>
            <span className="text-xs text-gray-500">Passed</span>
            <p className={`font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>{totalPasses}</p>
          </div>
        </div>

        {/* Feedback */}
        <div className="h-12 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-2 rounded-lg text-white font-semibold text-sm transition-all duration-300 ${
              feedback ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            } ${
              feedbackType==='success'?'bg-green-500':''
            }${
              feedbackType==='warning'?'bg-yellow-500':''
            }${
              feedbackType==='error'?'bg-red-500':''
            }`} 
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
          className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-2xl border-2 shadow-2xl'}`} 
          style={{
            background: isBoxDarkMode ? 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0a0a1a 100%)' : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden',
            cursor: 'default'
          }}
        >
          {/* Grid overlay for reference */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at center, ${isBoxDarkMode ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Game Area */}
          <div 
            ref={gameAreaRef}
            className="absolute inset-0"
          >
            {/* Central focus point */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-500/50" />
                <div className="absolute inset-0 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-75" />
                {gameState === 'playing' && !isFlashing && !showResponse && (
                  <p className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap ${
                    isBoxDarkMode?'text-gray-400':'text-gray-500'
                  }`}>
                    Fix gaze here
                  </p>
                )}
              </div>
            </div>

            {/* Sequence indicator */}
            {gameState === 'playing' && showSequenceIndicator && totalFlashesInSequence > 1 && (
              <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
                isBoxDarkMode ? 'bg-white/10 text-white/80' : 'bg-black/10 text-black/80'
              }`}>
                Flash {flashCount} of {totalFlashesInSequence}
              </div>
            )}

            {/* Peripheral flash with smooth animation */}
            {isFlashing && flashData && (
              <div 
                className="absolute transition-all duration-200 ease-out"
                style={{
                  left: `${flashData.x}%`,
                  top: `${flashData.y}%`,
                  transform: 'translate(-50%, -50%) scale(1)',
                  opacity: 1,
                  animation: 'flashAppear 0.2s ease-out'
                }}
              >
                <style jsx>{`
                  @keyframes flashAppear {
                    from {
                      transform: translate(-50%, -50%) scale(0.8);
                      opacity: 0;
                    }
                    to {
                      transform: translate(-50%, -50%) scale(1);
                      opacity: 1;
                    }
                  }
                `}</style>
                {renderShapeSVG(flashData.shape, flashData.color, 56)}
              </div>
            )}

            {/* Response UI */}
            {showResponse && !isFlashing && gameState === 'playing' && (
              <div className="absolute inset-0 flex items-center justify-center z-20 animate-in fade-in zoom-in duration-300">
                <div className={`rounded-2xl p-6 shadow-2xl border backdrop-blur-xl ${
                  isBoxDarkMode ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50'
                } max-w-md mx-4`}>
                  <p className={`text-sm mb-1 text-center font-medium ${isBoxDarkMode?'text-gray-300':'text-gray-700'}`}>
                    What was the <strong className="text-purple-500">last</strong> shape?
                  </p>
                  {totalFlashesInSequence > 1 && (
                    <p className={`text-xs mb-4 text-center ${isBoxDarkMode?'text-gray-500':'text-gray-400'}`}>
                      {totalFlashesInSequence} shapes were shown in sequence
                    </p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {SHAPES.map(shape => (
                      <button
                        key={shape}
                        onClick={() => handleResponse(shape)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 active:scale-95 ${
                          isBoxDarkMode 
                            ? 'bg-white/5 border-white/10 hover:border-purple-400/50 hover:bg-white/10' 
                            : 'bg-gray-50 border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                        }`}
                        aria-label={`Select ${shape}`}
                      >
                        <div className="flex justify-center mb-2">
                          {renderShapeSVG(shape, '#8b5cf6', 36)}
                        </div>
                        <p className={`text-xs capitalize text-center font-medium ${isBoxDarkMode?'text-gray-300':'text-gray-700'}`}>
                          {shape}
                        </p>
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handleResponse('pass')}
                    className={`w-full py-2.5 rounded-lg border transition-all hover:bg-opacity-80 text-sm ${
                      isBoxDarkMode 
                        ? 'border-gray-600 text-gray-400 hover:border-gray-500 hover:bg-white/5' 
                        : 'border-gray-300 text-gray-500 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                    aria-label="Skip this one"
                  >
                    Skip (I didn't see it)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Start Screen */}
          {gameState==='start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-2xl z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-2xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                <div className="mb-6">
                  <div className="relative inline-block">
                    <ScanEye className="w-20 h-20 text-purple-500 mx-auto" aria-hidden="true" />
                    <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full"></div>
                  </div>
                </div>
                
                <h2 className={`text-3xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>
                  Peripheral Flash
                </h2>
                <p className={`mb-3 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>
                  Professional Vision Training
                </p>
                <p className={`mb-6 text-sm leading-relaxed ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>
                  Train your peripheral vision to detect and identify shapes
                  appearing in controlled flash sequences. Keep your eyes fixed
                  on the center point while shapes appear in your peripheral field.
                </p>
                
                <div className={`mb-6 p-4 rounded-xl ${isBoxDarkMode?'bg-gray-700/30':'bg-gray-50'} border ${isBoxDarkMode?'border-gray-600':'border-gray-200'}`}>
                  <p className={`font-semibold mb-3 text-sm ${isBoxDarkMode?'text-gray-300':'text-gray-700'}`}>
                    Shape Types:
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {SHAPES.map(shape => (
                      <div key={shape} className="flex flex-col items-center">
                        {renderShapeSVG(shape, '#8b5cf6', 32)}
                        <span className={`text-xs mt-1 capitalize ${isBoxDarkMode?'text-gray-400':'text-gray-600'}`}>
                          {shape}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={`mb-6 text-xs text-left space-y-2 ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    <span>1-4 flashes per sequence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span>300ms per flash</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span>Identify the LAST shape</span>
                  </div>
                </div>
                
                <button 
                  onClick={startGame} 
                  className="w-full px-8 py-3.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-label="Start peripheral flash training"
                >
                  Start Training Session
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState==='gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-2xl z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-2xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="p-2 bg-green-500/10 rounded-full">
                    <Trophy className="w-10 h-10 text-green-500" aria-hidden="true" />
                  </div>
                </div>
                
                <h2 className={`text-2xl font-bold text-center mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>
                  Session Complete!
                </h2>
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>
                  Great job training your peripheral vision
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Hits" value={totalHits} icon={<Award className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Passed" value={totalPasses} icon={<ScanEye className="w-4 h-4" />} color="pink" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/visual" className="flex-1">
                    <button className={`w-full px-4 py-3 rounded-lg font-semibold transition-all ${
                      isDarkMode?'bg-gray-700 text-gray-300 hover:bg-gray-600':'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}>
                      ← Back to Drills
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Train Again →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions Footer */}
        {!isFullscreen && (
          <footer className="mt-6">
            <div className={`rounded-xl border overflow-hidden shadow-lg ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
              <div className={`px-5 py-4 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-5 h-5 ${isDarkMode?'text-purple-400':'text-purple-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Training Protocol</h2>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode?'text-purple-400':'text-purple-600'}`}>
                      <Target className="w-4 h-4" />
                      Setup
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span className={isDarkMode?'text-gray-300':'text-gray-600'}>
                          Position yourself at a comfortable distance from the screen
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span className={isDarkMode?'text-gray-300':'text-gray-600'}>
                          Keep your eyes fixed on the center dot at all times
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span className={isDarkMode?'text-gray-300':'text-gray-600'}>
                          Use fullscreen mode for best results
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode?'text-blue-400':'text-blue-600'}`}>
                      <ScanEye className="w-4 h-4" />
                      The Flash Sequence
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className={isDarkMode?'text-gray-300':'text-gray-600'}>
                          1-4 shapes appear randomly in your peripheral vision
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className={isDarkMode?'text-gray-300':'text-gray-600'}>
                          Each shape is shown for 300ms with 500ms gaps
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className={isDarkMode?'text-gray-300':'text-gray-600'}>
                          Focus on detecting without moving your eyes
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode?'text-green-400':'text-green-600'}`}>
                      <Award className="w-4 h-4" />
                      Response & Scoring
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className={isDarkMode?'text-gray-300':'text-gray-600'}>
                          Identify the LAST shape in the sequence
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className={isDarkMode?'text-gray-300':'text-gray-600'}>
                          10 points per correct answer + streak bonus
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className={isDarkMode?'text-gray-300':'text-gray-600'}>
                          Use "Skip" if unsure - it's better than guessing
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className={`mt-5 pt-4 border-t text-xs text-center ${isDarkMode?'border-gray-700 text-gray-400':'border-gray-200 text-gray-500'}`}>
                  <strong>Pro Tip:</strong> Start with single flashes to build confidence, then progress to sequences. 
                  Regular practice improves peripheral awareness and visual processing speed.
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', color, isDark, className = '' }) { 
  const colorMap = {
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
    green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' }
  };
  
  const c = colorMap[color] || colorMap.blue;
  
  return (
    <div className={`rounded-xl shadow-sm border p-3 text-center flex flex-col justify-center h-full transition-all hover:scale-[1.02] ${c.bg} ${c.border} ${className}`}>
      <div className={`mb-1 flex justify-center ${c.text}`} aria-hidden="true">{icon}</div>
      <p className={`text-lg sm:text-xl font-bold truncate ${isDark?'text-white':'text-gray-900'}`}>
        {value}{unit}
      </p>
      <p className={`text-[10px] sm:text-xs truncate ${isDark?'text-gray-400':'text-gray-500'}`}>
        {label}
      </p>
    </div>
  ); 
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) { 
  const colorMap = { 
    blue: {bg:'bg-blue-500/10', border:'border-blue-500/20', text:'text-blue-400', icon:'text-blue-400'}, 
    yellow: {bg:'bg-yellow-500/10', border:'border-yellow-500/20', text:'text-yellow-400', icon:'text-yellow-400'}, 
    orange: {bg:'bg-orange-500/10', border:'border-orange-500/20', text:'text-orange-400', icon:'text-orange-400'}, 
    purple: {bg:'bg-purple-500/10', border:'border-purple-500/20', text:'text-purple-400', icon:'text-purple-400'}, 
    emerald: {bg:'bg-emerald-500/10', border:'border-emerald-500/20', text:'text-emerald-400', icon:'text-emerald-400'}, 
    pink: {bg:'bg-pink-500/10', border:'border-pink-500/20', text:'text-pink-400', icon:'text-pink-400'}
  }; 
  const c = colorMap[color] || colorMap.blue; 
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${c.bg} ${c.border}`}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={c.icon} aria-hidden="true">{icon}</div>
        <span className={`text-xs sm:text-sm truncate ${isDark?'text-gray-300':'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${c.text}`}>
        {value}{unit}
      </span>
    </div>
  ); 
}