'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, Trophy, Info, Timer, BookOpen, RefreshCw, SkipForward
} from 'lucide-react';

const wordBank = [
  "apple", "bridge", "castle", "diamond", "eagle", "forest", "garden", 
  "hammer", "island", "jungle", "knight", "lantern", "mountain", "needle",
  "ocean", "palace", "queen", "rocket", "sunset", "temple", "umbrella",
  "valley", "window", "yellow", "zebra", "candle", "dragon", "feather",
  "silver", "golden", "marble", "velvet", "crystal", "bronze", "copper",
  "shadow", "spirit", "wisdom", "honor", "glory", "dream", "storm",
  "river", "cloud", "flame", "stone", "thunder", "rainbow", "phoenix"
];

export default function WordRecallClient() {
  const [loading, setLoading] = useState(true);
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
  const [accuracy, setAccuracy] = useState(100);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const [words, setWords] = useState([]);
  const [userWords, setUserWords] = useState("");
  const [phase, setPhase] = useState("ready");
  const [memorizeTimeLeft, setMemorizeTimeLeft] = useState(10);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const memorizeTimerRef = useRef(null);
  const resultTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const levelRef = useRef(3);
  const audioCtxRef = useRef(null);
  const gameStateRef = useRef('start');
  const phaseRef = useRef('ready');

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Sync refs
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // Load best scores
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('wordRecallBestScore');
      const savedBestStreak = localStorage.getItem('wordRecallBestStreak');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
      if (savedBestStreak) {
        const parsed = parseInt(savedBestStreak, 10);
        if (!isNaN(parsed)) setBestStreak(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBest = parseInt(localStorage.getItem('wordRecallBestScore') || '0', 10);
      if (finalScore > currentBest) {
        localStorage.setItem('wordRecallBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) { /* localStorage not available */ }
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

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      
      const now = audioCtxRef.current.currentTime;
      const freqMap = { correct: 880, wrong: 330, streak: 1046.5, levelUp: 1200 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 880, now);
      gain.gain.setValueAtTime(type === 'wrong' || type === 'streak' || type === 'levelUp' ? 0.12 : 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled]);

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

  const skipMemorization = useCallback(() => {
    if (phase === "memorize") {
      if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
      setPhase("recall");
      phaseRef.current = "recall";
      setMemorizeTimeLeft(10);
      if (inputRef.current) {
        setTimeout(() => inputRef.current.focus(), 100);
      }
    }
  }, [phase]);

  // Memorize timer
  useEffect(() => {
    if (phase === "memorize" && memorizeTimeLeft > 0) {
      memorizeTimerRef.current = setInterval(() => {
        setMemorizeTimeLeft(t => {
          if (t <= 1) {
            setPhase("recall");
            phaseRef.current = "recall";
            setTimeout(() => inputRef.current?.focus(), 100);
            return 10;
          }
          return t - 1;
        });
      }, 1000);
      return () => {
        if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
      };
    }
  }, [phase, memorizeTimeLeft]);

  // Result timer - auto restart same level after 2 seconds
  useEffect(() => {
    if (showResult) {
      resultTimerRef.current = setTimeout(() => {
        setShowResult(false);
        startRound(levelRef.current);
      }, 2000);
      return () => {
        if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
      };
    }
  }, [showResult]);

  // 60 second game timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
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

  const startGame = useCallback(() => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setAccuracy(100);
    setTotalCorrect(0);
    setTotalAttempts(0);
    setRoundsCompleted(0);
    setPenaltyCount(0);
    setFeedback('');
    setShowResult(false);
    
    scoreRef.current = 0;
    streakRef.current = 0;
    levelRef.current = 3;
    
    startRound(3);
  }, []);

  const startRound = useCallback((wordCount) => {
    const shuffled = [...wordBank].sort(() => Math.random() - 0.5);
    setWords(shuffled.slice(0, wordCount));
    setMemorizeTimeLeft(10);
    setPhase("memorize");
    phaseRef.current = "memorize";
    setUserWords("");
    setShowResult(false);
  }, []);

  const checkRecall = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    
    const recalled = userWords.toLowerCase().split(/[,\s]+/).filter(w => w);
    const correctWords = recalled.filter(w => words.includes(w));
    const correct = correctWords.length;
    const wrong = recalled.length - correct;
    
    const allCorrect = correct === words.length && wrong === 0;
    
    setTotalCorrect(prev => prev + correct);
    setTotalAttempts(prev => prev + words.length);
    setRoundsCompleted(prev => prev + 1);
    setPenaltyCount(prev => prev + wrong);
    
    if (allCorrect) {
      const pointsEarned = correct;
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      
      streakRef.current++;
      setStreak(streakRef.current);
      
      if (streakRef.current > bestStreak) {
        setBestStreak(streakRef.current);
        try {
          localStorage.setItem('wordRecallBestStreak', streakRef.current.toString());
        } catch (e) { /* localStorage not available */ }
      }
      
      const newLevel = levelRef.current + 1;
      levelRef.current = newLevel;
      
      playSound('levelUp');
      showFeedback(`🎉 Perfect! +${pointsEarned}`, 'success');
      
      setTimeout(() => {
        if (gameStateRef.current === 'playing') {
          startRound(newLevel);
        }
      }, 800);
    } else {
      const penaltyAmount = words.length;
      scoreRef.current = Math.max(0, scoreRef.current - penaltyAmount);
      setScore(scoreRef.current);
      
      streakRef.current = 0;
      setStreak(0);
      
      playSound('wrong');
      showFeedback(`✗ -${penaltyAmount}`, 'error');
      
      setPhase("result");
      phaseRef.current = "result";
      setShowResult(true);
    }
    
    const totalCorrectWords = totalCorrect + correct;
    const totalWords = totalAttempts + words.length;
    setAccuracy(totalWords > 0 ? Math.round((totalCorrectWords / totalWords) * 100) : 100);
  }, [userWords, words, totalCorrect, totalAttempts, bestStreak, playSound, showFeedback, startRound]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter" && phase === "recall" && e.ctrlKey) {
      e.preventDefault();
      checkRecall();
    }
  }, [phase, checkRecall]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    setGameState('start');
    gameStateRef.current = 'start';
    setPhase('ready');
    phaseRef.current = 'ready';
    setFeedback('');
    setFeedbackType('');
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
      if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading word recall drill...</p>
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
            "name": "Word Recall Drill",
            "url": "https://skilldrills.online/drills/memory/short-term-memory/word-recall",
            "description": "Train verbal short-term memory by memorizing and recalling word lists. 50 unique words with progressive difficulty starting at 3 words. 10-second memorization with skip. +1 per correct word, penalty equals word count on mistakes.",
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
            "educationalUse": ["Verbal Memory", "Short-Term Memory", "Word Recall", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Word Recall", "Verbal Short-Term Memory", "Free Recall", "List Learning"]
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
              <Link href="/drills/memory" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Memory Drills
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Short-Term Memory
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`} aria-current="page">
              Word Recall
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Word Recall
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Verbal short-term memory • +1 per word • Penalty = word count • 60s
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

        {/* SEO Content */}
        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Word Recall - Verbal Short-Term Memory Training</h2>
          <p>
            Train your verbal short-term memory by memorizing and recalling word lists.
            50 unique words with progressive difficulty starting at 3 words per round.
            10-second memorization phase with skip option, then type all words you remember.
            +1 point per correct word. Any mistake applies penalty equal to total word count and restarts same level.
            Perfect recall advances to next level (+1 word). 60-second timed challenge tracking rounds and accuracy.
            Green = recalled words, Red = missed words shown after submission.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<BookOpen className="text-cyan-600" />} value={roundsCompleted} label="Rounds" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-emerald-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? "#0a0a1a" : "#fdf2f8",
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
            <div className="w-full max-w-lg">
              
              {/* ============ START SCREEN ============ */}
              {gameState === 'start' && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl backdrop-blur-sm z-10" style={{ background: isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(253,242,248,0.95)' }}>
                  <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="mb-4">
                      <BookOpen className="w-16 h-16 text-pink-500 mx-auto" aria-hidden="true" />
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Word Recall
                    </h2>
                    <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      60-second challenge • 50 unique words • Progressive difficulty
                    </p>
                    <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Memorize word lists for 10 seconds (with skip), then type all you remember. Perfect recall advances to more words.
                    </p>
                    <button 
                      onClick={startGame} 
                      className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                      aria-label="Start word recall drill"
                    >
                      Start Training
                    </button>
                  </div>
                </div>
              )}

              {/* ============ MEMORIZE PHASE ============ */}
              {gameState === 'playing' && phase === "memorize" && !showResult && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className={`text-sm font-bold px-3 py-1 rounded-full ${isBoxDarkMode ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-600'}`}>
                      Memorize • {memorizeTimeLeft}s • {words.length} words
                    </div>
                    <button
                      onClick={skipMemorization}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      aria-label="Skip memorization"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      Skip
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {words.map((word, i) => (
                      <div key={i} className={`p-3 rounded-lg text-center font-semibold text-lg transition-all ${
                        isBoxDarkMode ? 'bg-white/10 text-white border border-white/10' : 'bg-pink-100 text-gray-900 border border-pink-200'
                      }`}>
                        {word}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ============ RECALL PHASE ============ */}
              {gameState === 'playing' && phase === "recall" && !showResult && (
                <div className="space-y-5">
                  <div className={`text-sm font-bold text-center ${isBoxDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    Type all words you remember ({words.length} words)
                  </div>
                  <textarea
                    ref={inputRef}
                    value={userWords}
                    onChange={(e) => setUserWords(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className={`w-full h-32 p-4 rounded-xl border-2 outline-none resize-none text-lg transition-all ${
                      isBoxDarkMode 
                        ? 'bg-white/10 text-white border-pink-400/30 focus:border-pink-400 placeholder-gray-500' 
                        : 'bg-white text-gray-900 border-pink-300 focus:border-pink-500 placeholder-gray-400'
                    }`}
                    placeholder="Type words separated by commas or spaces..."
                    autoFocus
                    aria-label="Type all words you remember"
                  />
                  <button 
                    onClick={checkRecall}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    aria-label="Submit your recalled words"
                  >
                    Submit
                  </button>
                  <p className={`text-xs text-center ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Ctrl+Enter to submit quickly
                  </p>
                </div>
              )}

              {/* ============ RESULT PHASE ============ */}
              {showResult && (
                <div className="space-y-5 text-center">
                  <p className={`text-lg font-semibold ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Words were ({words.length} total):
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {words.map((word, i) => {
                      const recalled = userWords.toLowerCase().includes(word.toLowerCase());
                      return (
                        <span key={i} className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                          recalled 
                            ? isBoxDarkMode ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-600 border border-green-200'
                            : isBoxDarkMode ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-100 text-red-600 border border-red-200'
                        }`}>
                          {recalled ? '✓' : '✗'} {word}
                        </span>
                      );
                    })}
                  </div>
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Green = recalled • Red = missed • Auto-restarting in 2s
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ============ GAME OVER SCREEN ============ */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40" style={{ background: isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(253,242,248,0.95)' }}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Time&apos;s Up!
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Keep practicing to improve your verbal short-term memory and word recall.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Rounds" value={roundsCompleted} icon={<BookOpen className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  <ResultCard label="Mistakes" value={penaltyCount} icon={<Brain className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/memory" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back to Drills
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Memorize words for <span className="font-semibold text-pink-500">10 seconds</span> (with skip option)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        All correct = <span className="font-semibold text-green-500">+1 per word + next level</span> (+1 word)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Any wrong = <span className="font-semibold text-red-500">-word count penalty + auto restart same level</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Starts with <span className="font-semibold text-cyan-500">3 words</span> • Increases with perfect recall
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Use <span className="font-semibold text-orange-500">Skip button</span> to jump directly to recall phase
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Challenge lasts <span className="font-semibold text-yellow-500">60 seconds</span> • Ctrl+Enter to submit
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🟢 Green = Recalled • 🔴 Red = Missed • 50 unique words total</span>
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
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
  };
  
  const colorsObj = colorMap[color] || colorMap.blue;
  
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