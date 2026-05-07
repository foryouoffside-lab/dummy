'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, Trophy, Info, Timer, Link2, RefreshCw, SkipForward
} from 'lucide-react';

const ALL_CONCEPT_CHAINS = [
  // Common chains (Rounds 1-3)
  ["Sun", "Light", "Plant", "Oxygen", "Life"],
  ["Water", "Clouds", "Rain", "River", "Ocean"],
  ["Seed", "Tree", "Fruit", "Food", "Energy"],
  ["Idea", "Plan", "Action", "Result", "Success"],
  ["Student", "Study", "Knowledge", "Career", "Achievement"],
  ["Egg", "Chick", "Bird", "Flight", "Sky"],
  ["Seed", "Sprout", "Flower", "Bee", "Honey"],
  ["Clay", "Brick", "Wall", "House", "Home"],
  ["Note", "Melody", "Song", "Album", "Legend"],
  ["Coal", "Heat", "Steam", "Engine", "Train"],
  
  // Less common chains (Rounds 4-6)
  ["Sand", "Glass", "Lens", "Telescope", "Discovery"],
  ["Spore", "Fungus", "Network", "Forest", "Ecosystem"],
  ["Thought", "Theory", "Experiment", "Proof", "Law"],
  ["Cotton", "Thread", "Fabric", "Garment", "Fashion"],
  ["Ore", "Metal", "Tool", "Machine", "Industry"],
  ["Spark", "Flame", "Forge", "Steel", "Bridge"],
  ["Grain", "Flour", "Dough", "Bread", "Feast"],
  ["Echo", "Sound", "Music", "Emotion", "Memory"],
  ["Drop", "Stream", "Cascade", "Rapids", "Waterfall"],
  ["Pixel", "Image", "Scene", "Film", "Cinema"],
  
  // Abstract chains (Rounds 7-9)
  ["Doubt", "Question", "Search", "Wisdom", "Truth"],
  ["Dream", "Vision", "Mission", "Journey", "Legacy"],
  ["Rumor", "Myth", "Belief", "Tradition", "Culture"],
  ["Whisper", "Voice", "Speech", "Movement", "Revolution"],
  ["Puzzle", "Pattern", "Insight", "Solution", "Innovation"],
  ["Ember", "Hope", "Courage", "Action", "Change"],
  ["Ripple", "Wave", "Tide", "Current", "Transformation"],
  ["Moment", "Memory", "Story", "History", "Identity"],
  ["Fragment", "Mosaic", "Design", "Blueprint", "Creation"],
  ["Silence", "Reflection", "Clarity", "Purpose", "Fulfillment"]
];

export default function ConceptLinkingClient() {
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
  
  const [chain, setChain] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [phase, setPhase] = useState("ready");
  const [round, setRound] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [memorizeTime, setMemorizeTime] = useState(5);
  const [chainLength, setChainLength] = useState(5);
  const [wrongSteps, setWrongSteps] = useState(new Set());
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const memorizeTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const chainLengthRef = useRef(5);
  const usedChainsRef = useRef(new Set());
  const correctChainRef = useRef([]);
  const userAnswersRef = useRef([]);
  const wrongStepsRef = useRef(new Set());
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
      const savedBestScore = localStorage.getItem('conceptLinkingBestScore');
      const savedBestStreak = localStorage.getItem('conceptLinkingBestStreak');
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
      const currentBest = parseInt(localStorage.getItem('conceptLinkingBestScore') || '0', 10);
      if (finalScore > currentBest) {
        localStorage.setItem('conceptLinkingBestScore', finalScore.toString());
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
      const freqMap = { correct: 880, wrong: 330, streak: 1046.5, roundComplete: 1200 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 880, now);
      gain.gain.setValueAtTime(type === 'wrong' || type === 'streak' || type === 'roundComplete' ? 0.12 : 0.1, now);
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

  // Memorize countdown
  useEffect(() => {
    if (phase === "memorize" && memorizeTime > 0) {
      memorizeTimerRef.current = setInterval(() => {
        setMemorizeTime(t => t - 1);
      }, 1000);
      return () => {
        if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
      };
    } else if (phase === "memorize" && memorizeTime === 0) {
      startRecall();
    }
  }, [phase, memorizeTime]);

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

  const getAvailableChain = useCallback((length) => {
    const available = ALL_CONCEPT_CHAINS.filter((_, i) => !usedChainsRef.current.has(i));
    if (available.length < 1) {
      usedChainsRef.current.clear();
      return ALL_CONCEPT_CHAINS[Math.floor(Math.random() * ALL_CONCEPT_CHAINS.length)];
    }
    const matching = available.filter(c => c.length === length);
    const pool = matching.length > 0 ? matching : available;
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  const startRecall = useCallback(() => {
    setPhase("recall");
    phaseRef.current = "recall";
    setCurrentStep(0);
    setUserInput("");
    setShowResults(false);
    setUserAnswers([]);
    setWrongSteps(new Set());
    userAnswersRef.current = [];
    wrongStepsRef.current = new Set();
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const skipMemorize = useCallback(() => {
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    setMemorizeTime(0);
    startRecall();
  }, [startRecall]);

  const startRound = useCallback(() => {
    const length = chainLengthRef.current;
    const selectedChain = getAvailableChain(length);
    const idx = ALL_CONCEPT_CHAINS.indexOf(selectedChain);
    if (idx !== -1) usedChainsRef.current.add(idx);
    
    correctChainRef.current = selectedChain.slice(0, Math.min(length, selectedChain.length));
    setChain(correctChainRef.current);
    setChainLength(correctChainRef.current.length);
    setMemorizeTime(5);
    setPhase("memorize");
    phaseRef.current = "memorize";
    setIsProcessing(false);
    setCurrentStep(0);
    setShowResults(false);
  }, [getAvailableChain]);

  const startGame = useCallback(() => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setAccuracy(100);
    setRound(1);
    setTotalCorrect(0);
    setTotalAttempts(0);
    setRoundsCompleted(0);
    setFeedback('');
    
    scoreRef.current = 0;
    streakRef.current = 0;
    chainLengthRef.current = 5;
    usedChainsRef.current = new Set();
    
    startRound();
    showFeedback('60 seconds • Recall the chain step by step!', 'success');
  }, [startRound, showFeedback]);

  const handleSubmit = useCallback(() => {
    if (isProcessing || !userInput.trim()) return;
    setIsProcessing(true);
    
    const userAnswer = userInput.trim();
    const correctAnswer = correctChainRef.current[currentStep];
    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    
    userAnswersRef.current.push({ answer: userAnswer, correct: isCorrect, expected: correctAnswer });
    setUserAnswers([...userAnswersRef.current]);
    
    const newTotal = totalAttempts + 1;
    setTotalAttempts(newTotal);
    
    if (isCorrect) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      setTotalCorrect(prev => prev + 1);
      playSound('correct');
      showFeedback('✓ +1', 'success');
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      wrongStepsRef.current.add(currentStep);
      setWrongSteps(new Set([...wrongStepsRef.current]));
      playSound('wrong');
      showFeedback('✗ -1', 'error');
    }
    
    const newCorrect = totalCorrect + (isCorrect ? 1 : 0);
    setAccuracy(newTotal > 0 ? Math.round((newCorrect / newTotal) * 100) : 100);
    
    if (currentStep < correctChainRef.current.length - 1) {
      setCurrentStep(prev => prev + 1);
      setUserInput("");
      setIsProcessing(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setShowResults(true);
      setPhase("result");
      phaseRef.current = "result";
      setIsProcessing(false);
      
      const allCorrect = wrongStepsRef.current.size === 0;
      
      if (allCorrect) {
        streakRef.current++;
        setStreak(streakRef.current);
        
        if (streakRef.current > bestStreak) {
          setBestStreak(streakRef.current);
          try {
            localStorage.setItem('conceptLinkingBestStreak', streakRef.current.toString());
          } catch (e) { /* localStorage not available */ }
        }
        
        if (streakRef.current % 3 === 0 && chainLengthRef.current < 8) {
          chainLengthRef.current++;
        }
        
        playSound('roundComplete');
      } else {
        streakRef.current = 0;
        setStreak(0);
      }
      
      setRoundsCompleted(prev => prev + 1);
      setRound(prev => prev + 1);
    }
  }, [isProcessing, userInput, currentStep, totalAttempts, totalCorrect, bestStreak, playSound, showFeedback]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }, [handleSubmit]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setFeedback('');
    setFeedbackType('');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading concept linking drill...</p>
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
            "name": "Concept Linking Drill",
            "url": "https://skilldrills.online/drills/memory/associative-memory/concept-linking",
            "description": "Train associative memory by recalling concept chains step by step. 30 unique chains across common, scientific, and abstract categories. 5-second memorization phase followed by sequential recall.",
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
            "educationalUse": ["Associative Memory", "Sequential Recall", "Cognitive Training", "Memory Improvement"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Associative Memory", "Sequential Recall", "Concept Linking", "Pattern Recognition"]
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
              Associative Memory
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} aria-current="page">
              Concept Linking
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl flex-shrink-0">
              <Link2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Concept Linking
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Associative memory • +1 correct / -1 wrong • 60-second challenge
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
          <h2>Concept Linking - Associative Memory Training Drill</h2>
          <p>
            Train your associative memory by memorizing and recalling concept chains step by step.
            30 unique chains across 3 categories: common (rounds 1-3), scientific/technical (rounds 4-6), and abstract (rounds 7-9).
            Each round begins with a 5-second memorization phase showing the full chain.
            Then recall each concept in order. +1 point per correct concept, -1 per wrong.
            Perfect rounds increase your streak. Every 3 perfect rounds increases chain length up to 8 concepts.
            Full path with correct answers shown after each round. 60-second timed challenge.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<Link2 className="text-cyan-600" />} value={chainLength} label="Chain" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-emerald-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
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

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#0a0a1a" : "#fff1f2",
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

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-lg text-center">
              
              {/* ============ START SCREEN ============ */}
              {gameState === 'start' && (
                <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                  <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="mb-4">
                      <Link2 className="w-16 h-16 text-rose-500 mx-auto" aria-hidden="true" />
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Concept Linking
                    </h2>
                    <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      60-second challenge • 30 unique chains • 3 categories
                    </p>
                    <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Memorize concept chains for 5 seconds, then recall step by step. Chains grow longer with perfect rounds.
                    </p>
                    <button 
                      onClick={startGame} 
                      className="px-8 py-3 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                      aria-label="Start concept linking drill"
                    >
                      Start Training
                    </button>
                  </div>
                </div>
              )}

              {/* ============ MEMORIZE PHASE ============ */}
              {gameState === 'playing' && phase === "memorize" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${isBoxDarkMode ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600'}`}>
                      {memorizeTime}s remaining
                    </span>
                    <button 
                      onClick={skipMemorize}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        isBoxDarkMode ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30' : 'bg-rose-100 text-rose-600 hover:bg-rose-200'
                      } focus:outline-none focus:ring-2 focus:ring-rose-500`}
                      aria-label="Skip memorization and start recall"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      Skip
                    </button>
                  </div>
                  <p className={`text-sm mb-4 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Memorize this chain:
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {chain.map((concept, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`px-4 py-2 rounded-xl text-lg font-semibold transition-all ${
                          isBoxDarkMode ? 'bg-white/10 text-white border border-white/20' : 'bg-rose-100 text-gray-900 border border-rose-200'
                        }`}>
                          {concept}
                        </div>
                        {i < chain.length - 1 && (
                          <span className={`text-xl font-bold ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ============ RECALL PHASE ============ */}
              {gameState === 'playing' && phase === "recall" && !showResults && (
                <div className="space-y-6">
                  <div className="text-center mb-4">
                    <span className={`text-sm font-bold ${isBoxDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      Step {currentStep + 1} of {chain.length}
                    </span>
                  </div>
                  
                  {/* Progress dots */}
                  <div className="flex items-center justify-center gap-2 mb-6" aria-label={`Progress: ${currentStep} of ${chain.length} concepts recalled`}>
                    {chain.map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-3 h-3 rounded-full transition-all ${
                          i < currentStep 
                            ? wrongSteps.has(i) ? 'bg-red-500' : 'bg-green-500'
                            : i === currentStep 
                              ? 'bg-cyan-500 animate-pulse scale-125' 
                              : isBoxDarkMode ? 'bg-white/10' : 'bg-rose-200'
                        }`} 
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`w-full text-xl text-center p-4 rounded-xl border-2 outline-none transition-all ${
                      isBoxDarkMode 
                        ? 'bg-white/10 text-white border-rose-400/30 focus:border-rose-400 placeholder-gray-500' 
                        : 'bg-white text-gray-900 border-rose-300 focus:border-rose-500 placeholder-gray-400'
                    }`}
                    placeholder={`Concept ${currentStep + 1}...`}
                    autoFocus
                    aria-label={`Enter concept ${currentStep + 1} of ${chain.length}`}
                  />
                  
                  <button 
                    onClick={handleSubmit} 
                    disabled={!userInput.trim() || isProcessing}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    aria-label="Submit your answer"
                  >
                    Submit
                  </button>
                  
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Press Enter to submit each concept
                  </p>
                </div>
              )}

              {/* ============ RESULT PHASE ============ */}
              {gameState === 'playing' && phase === "result" && showResults && (
                <div className="space-y-5">
                  <p className={`text-lg font-bold ${wrongSteps.size === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {wrongSteps.size === 0 ? '✓ Perfect Round!' : 'Round Complete'}
                  </p>
                  
                  <div className="space-y-3">
                    <p className={`text-sm font-semibold ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Correct Chain:
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {chain.map((concept, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                            isBoxDarkMode ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-600 border border-green-200'
                          }`}>
                            {concept}
                          </div>
                          {i < chain.length - 1 && (
                            <span className={isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'} aria-hidden="true">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {userAnswers.length > 0 && (
                    <div className="space-y-3">
                      <p className={`text-sm font-semibold ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Your Answers:
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {userAnswers.map((ans, i) => (
                          <div key={i} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                            ans.correct 
                              ? isBoxDarkMode ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-600 border border-green-200'
                              : isBoxDarkMode ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-100 text-red-600 border border-red-200'
                          }`}>
                            {ans.answer}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button 
                    onClick={startRound} 
                    className="w-full py-3 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-xl font-bold hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    aria-label="Start next concept chain"
                  >
                    Next Chain
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ============ GAME OVER SCREEN ============ */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40" style={{ background: isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(255,241,242,0.95)' }}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Time&apos;s Up!
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Keep practicing to strengthen your associative memory and sequential recall.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Rounds" value={roundsCompleted} icon={<Link2 className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  <ResultCard label="Max Chain" value={chainLength} icon={<Brain className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/memory" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back to Drills
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Memorize the <span className="font-semibold text-rose-500">concept chain</span> for 5 seconds
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">+1 per correct</span> concept recalled
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">-1 per wrong</span> concept
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Full path <span className="font-semibold text-cyan-500">shown after each round</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">30 unique chains</span> • 3 categories (common, scientific, abstract)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Perfect rounds <span className="font-semibold text-yellow-500">increase chain length</span> up to 8
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🟢 Green = correct • 🔴 Red = wrong • Full path shown at round end</span>
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
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
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