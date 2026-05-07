'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, Heart, FileText, CheckCircle, XCircle, RefreshCw
} from "lucide-react";

const sentences = [
  { text: "The cat jumped over the fence", word: "cat" },
  { text: "She bought flowers at the market", word: "flowers" },
  { text: "The sun sets in the west", word: "sun" },
  { text: "He played guitar at the concert", word: "guitar" },
  { text: "The coffee was too hot to drink", word: "coffee" },
  { text: "Birds flew south for the winter", word: "birds" },
  { text: "The student aced the difficult exam", word: "student" },
  { text: "Rain fell heavily on the roof", word: "rain" },
  { text: "The dog barked loudly at the stranger", word: "dog" },
  { text: "She wore a beautiful red dress", word: "dress" },
  { text: "The mountain peak was covered in snow", word: "mountain" },
  { text: "He wrote a letter to his grandmother", word: "letter" },
  { text: "The chef prepared a delicious meal", word: "chef" },
  { text: "Stars twinkled in the night sky", word: "stars" },
  { text: "The river flowed gently through the valley", word: "river" },
  { text: "She painted a colorful picture of the ocean", word: "picture" },
  { text: "The teacher explained the complex math problem", word: "teacher" },
  { text: "Leaves fell from the tall oak tree", word: "leaves" },
  { text: "He drove his new car to the beach", word: "car" },
  { text: "The musician played a beautiful melody on the piano", word: "musician" },
  { text: "Clouds gathered before the big storm", word: "clouds" },
  { text: "The athlete broke the world record", word: "athlete" },
  { text: "She planted roses in the garden", word: "roses" },
  { text: "The clock struck twelve at midnight", word: "clock" },
  { text: "He built a wooden table for the kitchen", word: "table" },
  { text: "The photographer captured the perfect moment", word: "photographer" },
  { text: "Waves crashed against the rocky shore", word: "waves" },
  { text: "The doctor prescribed medicine for the illness", word: "doctor" },
  { text: "She baked cookies for the school fundraiser", word: "cookies" },
  { text: "The lion roared in the African savanna", word: "lion" }
];

export default function SentenceSpanClient() {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const containerRef = useRef(null);
  
  const [level, setLevel] = useState(1);
  const [currentSentences, setCurrentSentences] = useState([]);
  const [userWords, setUserWords] = useState("");
  const [phase, setPhase] = useState("ready");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [processing, setProcessing] = useState([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [roundKey, setRoundKey] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const timerIntervalRef = useRef(null);
  const sentenceTimeoutsRef = useRef([]);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const levelRef = useRef(1);
  const audioCtxRef = useRef(null);
  const usedIndicesRef = useRef([]);
  const totalRoundsRef = useRef(0);
  const phaseRef = useRef('ready');
  const currentSentencesRef = useRef([]);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Sync refs
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { levelRef.current = level; }, [level]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { currentSentencesRef.current = currentSentences; }, [currentSentences]);

  // Load best scores
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('sentenceSpanBestScore');
      const savedBestStreak = localStorage.getItem('sentenceSpanBestStreak');
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
      const currentBestScore = parseInt(localStorage.getItem('sentenceSpanBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('sentenceSpanBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) { /* localStorage not available */ }
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
      const freqMap = { correct: 880, wrong: 440, streak: 1046.5, levelUp: 1318.5 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 880, now);
      gain.gain.setValueAtTime(type === 'wrong' ? 0.1 : type === 'streak' || type === 'levelUp' ? 0.12 : 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  // Timer effect
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
            clearSentenceTimeouts();
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

  const clearSentenceTimeouts = useCallback(() => {
    sentenceTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    sentenceTimeoutsRef.current = [];
  }, []);

  const shuffleArray = useCallback((array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const getUniqueSentences = useCallback((count) => {
    if (usedIndicesRef.current.length > sentences.length - count) {
      usedIndicesRef.current = [];
    }
    
    const availableIndices = sentences
      .map((_, index) => index)
      .filter(index => !usedIndicesRef.current.includes(index));
    
    const shuffledIndices = shuffleArray(availableIndices);
    const selectedIndices = shuffledIndices.slice(0, count);
    
    usedIndicesRef.current = [...usedIndicesRef.current, ...selectedIndices];
    
    return shuffleArray(selectedIndices.map(index => ({
      ...sentences[index],
      originalIndex: index
    })));
  }, [shuffleArray]);

  const startGame = useCallback(() => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLevel(1);
    setStreak(0);
    setTimeLeft(60);
    setPhase("ready");
    phaseRef.current = "ready";
    setCurrentSentences([]);
    setUserWords("");
    setProcessing([]);
    setFeedback('');
    setRoundKey(0);
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    streakRef.current = 0;
    levelRef.current = 1;
    usedIndicesRef.current = [];
    totalRoundsRef.current = 0;
    
    startRound();
  }, []);

  const startRound = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    clearSentenceTimeouts();
    
    totalRoundsRef.current += 1;
    
    setUserWords("");
    setRoundKey(prev => prev + 1);
    
    const numSentences = levelRef.current + 2;
    const selected = getUniqueSentences(numSentences);
    setCurrentSentences(selected);
    currentSentencesRef.current = selected;
    setProcessing(selected.map(() => true));
    setPhase("processing");
    phaseRef.current = "processing";
    
    selected.forEach((_, i) => {
      const timeout = setTimeout(() => {
        setProcessing(prev => prev.map((p, idx) => idx <= i ? false : p));
      }, (i + 1) * 2000);
      sentenceTimeoutsRef.current.push(timeout);
    });
    
    const totalTime = numSentences * 2000 + 1000;
    const timeout = setTimeout(() => {
      setPhase("recall");
      phaseRef.current = "recall";
    }, totalTime);
    sentenceTimeoutsRef.current.push(timeout);
  }, [clearSentenceTimeouts, getUniqueSentences]);

  const checkRecall = useCallback(() => {
    if (phaseRef.current !== "recall" || !isActiveRef.current) return;
    
    const recalled = userWords.toLowerCase().split(/[,\s]+/).filter(w => w);
    const targets = currentSentencesRef.current.map(s => s.word.toLowerCase());
    const correctCount = recalled.filter(w => targets.includes(w)).length;
    const totalTargets = targets.length;
    const successRate = correctCount / totalTargets;
    
    if (successRate >= 0.7) {
      const pointsEarned = levelRef.current;
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      
      streakRef.current++;
      setStreak(streakRef.current);
      
      if (streakRef.current > bestStreak) {
        setBestStreak(streakRef.current);
        try {
          localStorage.setItem('sentenceSpanBestStreak', streakRef.current.toString());
        } catch (e) { /* localStorage not available */ }
      }
      
      levelRef.current++;
      setLevel(levelRef.current);
      
      playSound('levelUp');
      showFeedback(`✓ Correct! +${pointsEarned} points`, 'success');
    } else {
      streakRef.current = 0;
      setStreak(0);
      
      playSound('wrong');
      const correctWords = currentSentencesRef.current.map(s => s.word).join(', ');
      showFeedback(`✗ Incorrect! Nouns were: ${correctWords}`, 'error');
    }
    
    if (isActiveRef.current && gameStateRef.current === 'playing') {
      startRound();
    }
  }, [userWords, bestStreak, playSound, showFeedback, startRound]);

  const resetGame = useCallback(() => {
    clearSentenceTimeouts();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setLevel(1);
    setStreak(0);
    setTimeLeft(60);
    setPhase("ready");
    phaseRef.current = "ready";
    setCurrentSentences([]);
    setUserWords("");
    setProcessing([]);
    setFeedback('');
    setRoundKey(0);
  }, [clearSentenceTimeouts]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearSentenceTimeouts();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, [clearSentenceTimeouts]);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sentence span drill...</p>
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
            "name": "Sentence Span Drill",
            "url": "https://skilldrills.online/drills/memory/working-memory/sentence-span",
            "description": "Train verbal working memory with 30 unique sentences. Read sentences (2s each) then recall key nouns. Level-based scoring with 70% accuracy threshold. No penalties. 60-second timed challenge.",
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
            "educationalUse": ["Working Memory", "Verbal Processing", "Reading Span", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Verbal Working Memory", "Sentence Processing", "Noun Recall", "Reading Span"]
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
              Working Memory
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} aria-current="page">
              Sentence Span
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Sentence Span
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Verbal working memory • Score = Level • No penalties • 60s challenge
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
          <h2>Sentence Span - Verbal Working Memory Training</h2>
          <p>
            Train your verbal working memory by reading sentences and recalling key nouns.
            30 unique sentences with auto-advancing display (2 seconds each).
            Level 1 = 3 sentences, Level 2 = 4, Level 3 = 5, progressing infinitely.
            Score equals current level on success (70% accuracy threshold to level up).
            No penalties for wrong answers - correct nouns are shown for learning.
            Fisher-Yates shuffle ensures varied sentence order with no repeats until all used.
            60-second timed challenge tracking level progression and accuracy.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<FileText className="text-cyan-600" />} value={level} label="Level" isDark={isDarkMode} />
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
            
            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Brain className="w-16 h-16 text-cyan-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Sentence Span
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    30 unique sentences • Level-based scoring • No penalties
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Read sentences (2s each), then recall the key nouns. Score = current level. 70% accuracy to level up.
                  </p>
                  <button 
                    onClick={startGame} 
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    aria-label="Start sentence span drill"
                  >
                    Start Training
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && (
              <div className="w-full max-w-2xl mx-auto">
                {phase === "processing" && (
                  <div className="space-y-4">
                    <p className={`text-sm font-bold text-center mb-2 ${isBoxDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      Level {level} • {currentSentences.length} sentences • Read carefully
                    </p>
                    {currentSentences.map((s, i) => (
                      <div 
                        key={i} 
                        className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                          processing[i] 
                            ? `border-2 border-gray-600 bg-gray-800/30 scale-[1.02] shadow-lg`
                            : `border-2 border-gray-700/30 bg-gray-800/10 opacity-50`
                        }`}
                      >
                        <div className="p-5">
                          <p className={`text-lg font-medium ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {s.text}
                          </p>
                        </div>
                      </div>
                    ))}
                    <p className={`text-xs text-center ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Auto-advancing every 2 seconds...
                    </p>
                  </div>
                )}

                {phase === "recall" && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Recall the Nouns
                      </h3>
                      <p className={`${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Type the nouns from each sentence (70% needed to level up)
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <textarea
                        key={roundKey}
                        value={userWords}
                        onChange={(e) => setUserWords(e.target.value)}
                        className={`w-full p-4 rounded-2xl border-2 focus:outline-none transition ${
                          isBoxDarkMode 
                            ? 'bg-gray-800/50 border-gray-700 text-white focus:border-cyan-500 placeholder-gray-500' 
                            : 'bg-white border-gray-200 text-gray-900 focus:border-cyan-500 placeholder-gray-400'
                        }`}
                        rows={4}
                        placeholder="Enter nouns separated by commas or spaces..."
                        autoFocus
                        aria-label="Type all nouns you remember"
                      />
                      
                      <button 
                        onClick={checkRecall} 
                        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-lg transition transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                        aria-label="Submit recalled nouns"
                      >
                        Submit Nouns
                      </button>
                    </div>
                    
                    <div className={`p-4 rounded-2xl ${isBoxDarkMode ? 'bg-gray-800/30 border border-gray-700' : 'bg-gray-100 border border-gray-200'}`}>
                      <p className={`text-sm text-center ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        💡 Look for the main noun (subject) in each sentence
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============ GAME OVER SCREEN ============ */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[520px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                    <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Time&apos;s Up!
                    </h2>
                  </div>
                  
                  <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Keep practicing to increase your verbal working memory span.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Highest Level" value={level} icon={<Brain className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                    <ResultCard label="Rounds" value={totalRoundsRef.current} icon={<Activity className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/memory" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </button>
                    </Link>
                    <button 
                      onClick={startGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">Read sentences</span> - One noun per sentence to remember
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Score = <span className="font-semibold text-green-500">Current Level</span> (Level 1=1pt, Level 2=2pt, etc.)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Level 1 = <span className="font-semibold text-purple-500">3 sentences</span> • Level 2 = 4 • Level 3 = 5...
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-amber-500">70% accuracy</span> to level up & earn points
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">No penalties</span> - Correct words shown on failure
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        60 second challenge • <span className="font-semibold text-yellow-500">Best Score saves locally</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>📝 30 unique sentences • Nouns are the subject of each sentence</span>
                  <span>⚡ Randomized with Fisher-Yates shuffle • No repeated sentences</span>
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
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
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