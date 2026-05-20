'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, Heart, Repeat, RefreshCw,
  GraduationCap, Lightbulb, TrendingUp, CheckCircle2, Star, ArrowRight, Share2, Copy
} from "lucide-react";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
const colorMap = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-400",
  purple: "bg-purple-500",
  orange: "bg-orange-500"
};

export default function ColorSequenceClient() {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const containerRef = useRef(null);
  
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [phase, setPhase] = useState("ready");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showingColor, setShowingColor] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [attemptsAtLevel, setAttemptsAtLevel] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const showIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const levelRef = useRef(1);
  const phaseRef = useRef('ready');
  const audioCtxRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { levelRef.current = level; }, [level]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('colorSequenceBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) {}
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('colorSequenceBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('colorSequenceBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) {}
  }, []);

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
    }, 1200);
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
      const freqMap = { correct: 880, wrong: 440, streak: 1046.5, penalty: 330, levelUp: 1318.5 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 880, now);
      gain.gain.setValueAtTime(type === 'penalty' || type === 'streak' || type === 'levelUp' ? 0.12 : 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current);
              timerIntervalRef.current = null;
            }
            updateBestScore(scoreRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [gameState, updateBestScore]);

  useEffect(() => {
    if (gameState === 'playing' && phase === "ready" && isActiveRef.current) {
      const timeout = setTimeout(() => {
        startRound();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [gameState, phase]);

  useEffect(() => {
    if (phase === "showing" && sequence.length > 0 && gameState === 'playing') {
      let i = 0;
      showIntervalRef.current = setInterval(() => {
        if (i < sequence.length) {
          setShowingColor(sequence[i]);
          setTimeout(() => setShowingColor(null), 500);
          i++;
        } else {
          if (showIntervalRef.current) clearInterval(showIntervalRef.current);
          setPhase("input");
          phaseRef.current = "input";
        }
      }, 1000);
      return () => {
        if (showIntervalRef.current) clearInterval(showIntervalRef.current);
      };
    }
  }, [phase, sequence, gameState]);

  const getCurrentLevelPoints = useCallback(() => {
    return levelRef.current + 2;
  }, []);

  const startGame = useCallback(() => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    scoreRef.current = 0;
    setLevel(1);
    levelRef.current = 1;
    setStreak(0);
    streakRef.current = 0;
    setBestStreak(0);
    setTimeLeft(60);
    setSequence([]);
    setUserSequence([]);
    setShowingColor(null);
    setAttemptsAtLevel(0);
    setPhase("ready");
    phaseRef.current = "ready";
    
    isActiveRef.current = true;
  }, []);

  const startRound = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    const sequenceLength = levelRef.current + 2;
    const newSequence = Array.from({ length: sequenceLength }, () => 
      colors[Math.floor(Math.random() * colors.length)]
    );
    setSequence(newSequence);
    setUserSequence([]);
    setShowingColor(null);
    setPhase("showing");
    phaseRef.current = "showing";
  }, []);

  const handleColorClick = useCallback((color) => {
    if (phaseRef.current !== "input" || !isActiveRef.current) return;
    
    const newUserSeq = [...userSequence, color];
    setUserSequence(newUserSeq);
    
    const currentIndex = newUserSeq.length - 1;
    const isWrong = color !== sequence[currentIndex];
    
    if (isWrong) {
      const penaltyPoints = getCurrentLevelPoints();
      scoreRef.current = Math.max(0, scoreRef.current - penaltyPoints);
      setScore(scoreRef.current);
      
      streakRef.current = 0;
      setStreak(0);
      
      playSound('penalty');
      showFeedback(`✗ Wrong! -${penaltyPoints} points`, 'error');
      setAttemptsAtLevel(prev => prev + 1);
      setUserSequence([]);
      setPhase("showing");
      phaseRef.current = "showing";
      
      const currentLevel = levelRef.current;
      const newSequence = Array.from({ length: currentLevel + 2 }, () => 
        colors[Math.floor(Math.random() * colors.length)]
      );
      setSequence(newSequence);
      return;
    }
    
    if (newUserSeq.length === sequence.length) {
      const pointsEarned = getCurrentLevelPoints();
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      
      streakRef.current++;
      setStreak(streakRef.current);
      
      if (streakRef.current > bestStreak) {
        setBestStreak(streakRef.current);
      }
      
      const nextLevel = levelRef.current + 1;
      setLevel(nextLevel);
      levelRef.current = nextLevel;
      
      playSound('levelUp');
      showFeedback(`✓ Level ${nextLevel}! +${pointsEarned} points`, 'success');
      
      setPhase("result");
      phaseRef.current = "result";
      setTimeout(() => {
        setPhase("ready");
        phaseRef.current = "ready";
      }, 1200);
    }
  }, [userSequence, sequence, bestStreak, getCurrentLevelPoints, playSound, showFeedback]);

  const getAccuracy = useCallback(() => {
    const totalAttempts = attemptsAtLevel + (level - 1);
    const successfulLevels = level - 1;
    return totalAttempts > 0 ? Math.round((successfulLevels / totalAttempts) * 100) : 100;
  }, [attemptsAtLevel, level]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (showIntervalRef.current) clearInterval(showIntervalRef.current);
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    scoreRef.current = 0;
    setLevel(1);
    levelRef.current = 1;
    setStreak(0);
    streakRef.current = 0;
    setBestStreak(0);
    setTimeLeft(60);
    setPhase("ready");
    phaseRef.current = "ready";
    setSequence([]);
    setUserSequence([]);
    setShowingColor(null);
    setFeedback('');
    setAttemptsAtLevel(0);
  }, []);

  const sharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Free Color Sequence Memory Drill | SkillDrills',
          text: 'Train visual short-term memory with color sequences. Free!',
          url: 'https://skilldrills.online/drills/memory/short-term-memory/color-sequence'
        });
      } catch (e) {}
    } else {
      navigator.clipboard.writeText('https://skilldrills.online/drills/memory/short-term-memory/color-sequence');
      alert('Link copied!');
    }
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText('https://skilldrills.online/drills/memory/short-term-memory/color-sequence');
    alert('Link copied!');
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (showIntervalRef.current) clearInterval(showIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading color sequence drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Color Sequence Drill - Visual Short-Term Memory & Pattern Recall Training",
            "url": "https://skilldrills.online/drills/memory/short-term-memory/color-sequence",
            "description": "Free visual short-term memory drill featuring 6 vibrant colors with progressive difficulty. Watch color sequences play automatically then tap colors in correct order. Sequence length equals level + 2 with level-based scoring. 60-second timed challenge with penalty system and streak tracking.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
            "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "publisher": { "@type": "Organization", "name": "SkillDrills" },
            "educationalUse": ["Short-Term Memory", "Visual Memory", "Pattern Recognition", "Sequence Recall", "Cognitive Training"],
            "learningResourceType": ["Interactive Exercise", "Memory Drill", "Visual Training"],
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Visual Sequence Memory", "Pattern Recall", "Short-Term Memory", "Color Recognition", "Sequential Processing"],
            "educationalLevel": "All Levels",
            "typicalAgeRange": "6-80",
            "datePublished": "2026-05-14",
            "dateModified": new Date().toISOString().split('T')[0],
            "version": "1.0",
            "isAccessibleForFree": true,
            "accessMode": ["visual"],
            "accessModeSufficient": ["visual"]
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li>
                <Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                  Home
                </Link>
              </li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
              <li>
                <Link href="/drills/memory" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                  Memory Drills
                </Link>
              </li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Short-Term Memory
              </li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
              <li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">
                Color Sequence
              </li>
            </ol>
          </nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex-shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Color Sequence
                </h1>
                <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Free visual short-term memory drill • Level = Points • 60-second challenge
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-shrink-0">
              {gameState === 'playing' && (
                <button 
                  onClick={resetGame} 
                  className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                  title="Reset session"
                  aria-label="Reset drill session"
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
        )}

        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Color Sequence - Visual Short-Term Memory Training</h2>
          <p>
            Train your visual short-term memory with 6 vibrant colors (red, blue, green, yellow, purple, orange).
            Watch the color sequence play automatically, then tap the colors in the correct order.
            Progressive difficulty: Level 1 = 3 colors (+3 points), Level 2 = 4 colors (+4 points), etc.
            Sequence length = current level + 2. Wrong answer applies penalty equal to current level score.
            Complete a level correctly to advance. 60-second timed challenge tracking level progression and accuracy.
          </p>
        </section>

        {!isFullscreen && (
          <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
            <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
            <StatCard icon={<Award className="text-purple-500" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
            <StatCard icon={<Repeat className="text-green-500" />} value={level} label="Level" isDark={isDarkMode} />
            <StatCard icon={<BarChart3 className="text-cyan-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          </div>
        )}

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
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
                aria-label="Reset drill session"
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

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
            
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Brain className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Color Sequence
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    6 vibrant colors • Progressive difficulty • Level-based scoring
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Watch the color sequence play, then tap colors in order. Sequence length = level + 2. Wrong answer resets with penalty.
                  </p>
                  <button 
                    onClick={startGame} 
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    aria-label="Start color sequence drill"
                  >
                    Start Free Drill
                  </button>
                </div>
              </div>
            )}

            {gameState === 'playing' && (
              <div className="w-full max-w-md mx-auto text-center">
                {(phase === "showing" || phase === "input" || phase === "result") && (
                  <div className="space-y-6">
                    <div className={`w-32 h-32 mx-auto rounded-full transition-all duration-300 shadow-2xl ${
                      showingColor ? colorMap[showingColor] : (isBoxDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-200 border border-gray-300')
                    }`} aria-label={showingColor ? `Showing ${showingColor}` : 'No color'} />
                    
                    <div className="flex gap-2 justify-center" aria-label={`Sequence progress: ${userSequence.length} of ${sequence.length}`}>
                      {sequence.map((color, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded-full transition-all ${
                            i < userSequence.length 
                              ? sequence[i] === userSequence[i] 
                                ? "bg-green-500 shadow-lg shadow-green-500/30" 
                                : "bg-red-500 shadow-lg shadow-red-500/30"
                              : isBoxDarkMode ? "bg-gray-700 border border-gray-600" : "bg-gray-300 border border-gray-400"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <div className={`text-sm font-bold ${isBoxDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                      Level {level} • {sequence.length} colors • +{getCurrentLevelPoints()}pts for correct
                    </div>

                    {phase === "input" && (
                      <>
                        <div className="grid grid-cols-3 gap-3 mt-6" role="group" aria-label="Color buttons">
                          {colors.map(color => (
                            <button
                              key={color}
                              onClick={() => handleColorClick(color)}
                              className={`${colorMap[color]} h-16 rounded-xl transition transform hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black`}
                              aria-label={`Tap ${color}`}
                            />
                          ))}
                        </div>
                        <p className={`text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Repeat the sequence in order
                        </p>
                      </>
                    )}

                    {phase === "showing" && (
                      <p className={`text-sm animate-pulse ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Watch the sequence...
                      </p>
                    )}
                    
                    {phase === "result" && (
                      <p className={`text-sm font-bold ${isBoxDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                        ✓ Correct! Next level...
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

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
                    Keep practicing to improve your visual short-term memory.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Highest Level" value={level} icon={<Brain className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Total Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/memory" className="flex-1">
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
        </div>

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
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Level 1: <span className="font-semibold text-purple-500">3 colors = +3 points</span> for correct sequence
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Level 2: <span className="font-semibold text-blue-500">4 colors = +4 points</span> • Level N = N+2 colors
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Higher levels = <span className="font-semibold text-green-500">longer sequences + more points</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Wrong answer: <span className="font-semibold text-red-500">-{getCurrentLevelPoints()} point penalty</span> • New sequence shown
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Complete level correctly = <span className="font-semibold text-orange-500">advance to next level</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        60-second timer • <span className="font-semibold text-yellow-500">Best Score saves locally</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🎨 Sequence length = level + 2 • 6 colors • Gets progressively harder</span>
                  <span>⚡ Penalty equals current level score • Streak resets on mistake</span>
                </div>
              </div>
            </div>
          </footer>
        )}

        {!isFullscreen && (
          <section className="mt-8" aria-label="About this color sequence drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free Color Sequence Drill</h2>
                </div>
              </div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  This free color sequence drill trains visual short-term memory by challenging you to watch and reproduce increasingly long sequences of colors. With 6 vibrant colors (red, blue, green, yellow, purple, orange), each round displays a color sequence automatically at 1-second intervals. You then tap the colors in the exact order they were shown. The progressive difficulty system starts at Level 1 with 3 colors and increases by 1 color each level. Correct sequences earn points equal to the current level number plus 2, while wrong answers apply an equal penalty and reset the sequence. Perfect for children developing memory skills, adults maintaining cognitive function, and anyone wanting to improve visual pattern recall and sequential processing.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Children developing visual memory, adults maintaining cognitive function, seniors exercising short-term recall, and anyone wanting to improve visual pattern recognition and sequential processing abilities.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Visual short-term memory, pattern recognition, sequential recall, color discrimination, working memory capacity, and the ability to hold and process visual information in correct order.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Score, level progression, streak count, accuracy percentage, best performance records, and real-time green/red feedback on correct vs incorrect color placements during reproduction.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice Color Sequences?</h3>
                    </div>
                    <ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        Builds foundational visual memory skills transferable to daily life
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        Progressive difficulty ensures continuous challenge and growth
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        Simple mechanics make it accessible for all ages and ability levels
                      </li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-orange-50 border-orange-100'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Effectively</h3>
                    </div>
                    <ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                        Focus intently during the showing phase without distractions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                        Say color names silently to reinforce visual memory with verbal encoding
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                        Aim to advance levels as high as possible before the 60-second timer ends
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                        Practice 10-15 minutes daily for best short-term memory improvement
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <section className="mt-8" aria-label="Related memory and cognitive drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-600"></div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Memory Drills</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/memory/short-term-memory/digit-span" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Digit Span</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Recall increasingly long digit sequences to test and improve short-term memory capacity.</p>
                  <div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/working-memory/n-back" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-green-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'} transition-colors`}>Dual N-Back</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Gold standard working memory training with both visual and auditory stimuli combined.</p>
                  <div className="flex items-center gap-1 mt-3 text-green-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/associative-memory/concept-linking" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Star className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>Concept Linking</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Memorize and recall concept chains step by step with adaptive length progression.</p>
                  <div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/long-term-memory/paired-associates" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Paired Associates</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Memorize word pairs then select the correct match from 3 options with adaptive rounds.</p>
                  <div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/spatial-memory/pattern-recall" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-cyan-500' : 'bg-white border-gray-200 hover:border-cyan-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                      <Star className="w-4 h-4 text-cyan-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>Pattern Recall</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Memorize and reproduce spatial patterns on a grid to strengthen visual-spatial memory.</p>
                  <div className="flex items-center gap-1 mt-3 text-cyan-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/associative-memory/sound-pattern" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <Star className="w-4 h-4 text-red-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-red-400' : 'text-gray-900 group-hover:text-red-600'} transition-colors`}>Sound Pattern</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Listen to rhythmic patterns then reproduce them using Tap and Rest buttons.</p>
                  <div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/long-term-memory/story-recall" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                      <Star className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Story Recall</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Read short stories then answer detailed questions to improve narrative memory.</p>
                  <div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/cognitive/memory/card-matching" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-indigo-500' : 'bg-white border-gray-200 hover:border-indigo-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Cognitive</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'} transition-colors`}>Card Matching</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Classic memory card game to improve visual memory and concentration skills.</p>
                  <div className="flex items-center gap-1 mt-3 text-indigo-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">Memory Training</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-white transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/digit-span" className="hover:text-white transition-colors">Digit Span</Link></li>
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-white transition-colors">Dual N-Back</Link></li>
                    <li><Link href="/drills/memory" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 15 Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li>
                    <li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">Academic</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">FPS & Motor</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li>
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/visual" className="hover:text-white transition-colors">Visual (14 drills)</Link></li>
                    <li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-white font-bold text-lg">SkillDrills</span>
                </div>
                <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">
                  Free online color sequence drill for visual short-term memory training. 6 vibrant colors with progressive difficulty where sequence length equals level + 2. Watch then reproduce sequences by tapping colors in order. Level-based scoring with penalty system. Perfect for children adults and seniors wanting to improve visual pattern recall. No registration required. More free memory drills at skilldrills.online.
                </p>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                  <button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share this drill" aria-label="Share this free color sequence drill">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link" aria-label="Copy drill link to clipboard">
                    <Copy className="w-5 h-5" />
                  </button>
                  <a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Twitter X" aria-label="Follow SkillDrills on Twitter X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Instagram" aria-label="Follow SkillDrills on Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Subscribe on YouTube" aria-label="Subscribe to SkillDrills on YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Pinterest" aria-label="Follow SkillDrills on Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

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
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
  };
  
  const colorsObj = colorMap[color] || colorMap.yellow;
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${colorsObj.bg} ${colorsObj.border}`}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={colorsObj.icon} aria-hidden="true">{icon}</div>
        <span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colorsObj.text}`}>{value}{unit}</span>
    </div>
  );
}