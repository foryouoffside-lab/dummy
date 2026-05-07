'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Trophy, Info, Brain, TrendingUp, BookOpen, BookMarked, SkipForward, CheckCircle, RefreshCw
} from "lucide-react";

const allStories = [
  {
    id: 1,
    text: "Sarah went to the market on Tuesday morning. She bought 3 red apples, 2 loaves of bread, and a bouquet of sunflowers for her grandmother. The cashier was wearing a blue hat and told her about a sale on oranges.",
    questions: [
      { q: "What day did Sarah go to the market?", a: "Tuesday" },
      { q: "How many apples did she buy?", a: "3" },
      { q: "What color was the cashier&apos;s hat?", a: "Blue" },
      { q: "Who were the sunflowers for?", a: "Grandmother" }
    ]
  },
  {
    id: 2,
    text: "Dr. Martinez parked his red bicycle outside the library at 3 PM. He spent two hours reading about ancient Egypt and borrowed a book on pyramids. On his way home, it started raining and he took shelter under a large oak tree.",
    questions: [
      { q: "What color was the bicycle?", a: "Red" },
      { q: "What time did he arrive at the library?", a: "3 PM" },
      { q: "What topic was he reading about?", a: "Ancient Egypt" },
      { q: "Where did he take shelter?", a: "Oak tree" }
    ]
  },
  {
    id: 3,
    text: "Emma and her father visited the aquarium on Saturday. They saw 8 dolphins, 12 clownfish, and a giant sea turtle named Shelly. Emma&apos;s favorite part was touching starfish in the touch pool. Her father bought her a plush octopus from the gift shop.",
    questions: [
      { q: "What day did Emma visit the aquarium?", a: "Saturday" },
      { q: "How many dolphins did they see?", a: "8" },
      { q: "What was the sea turtle named?", a: "Shelly" },
      { q: "What did her father buy her?", a: "Octopus" }
    ]
  },
  {
    id: 4,
    text: "Professor Williams lives in a cottage by a small lake. Every morning at 7 AM, he feeds breadcrumbs to the ducks. He has a vegetable garden where he grows tomatoes, cucumbers, and bell peppers. In the evenings, he sits on his porch and plays acoustic guitar until sunset.",
    questions: [
      { q: "What time does Professor Williams feed the ducks?", a: "7 AM" },
      { q: "What three vegetables does he grow?", a: "Tomatoes cucumbers bell peppers" },
      { q: "What instrument does he play?", a: "Guitar" },
      { q: "Where does he play music?", a: "Porch" }
    ]
  },
  {
    id: 5,
    text: "The annual town carnival was held on Main Street. There were 12 game booths, a ferris wheel, and a cotton candy stand that sold 500 cones in one day. Tommy won a giant teddy bear at the ring toss. His sister Emily ate three hot dogs and felt sick afterward.",
    questions: [
      { q: "Where was the carnival held?", a: "Main Street" },
      { q: "How many game booths were there?", a: "12" },
      { q: "What prize did Tommy win?", a: "Teddy bear" },
      { q: "What did Emily eat?", a: "Hot dogs" }
    ]
  }
];

export default function StoryRecallClient() {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [phase, setPhase] = useState("ready");
  const [currentStory, setCurrentStory] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [readingTimeLeft, setReadingTimeLeft] = useState(15);
  const [showResults, setShowResults] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completedStories, setCompletedStories] = useState([]);
  const [allStoriesCompleted, setAllStoriesCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const timerIntervalRef = useRef(null);
  const readingTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const completedStoriesRef = useRef([]);
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

  // Load best score from localStorage
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('storyRecallBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best score
  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('storyRecallBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('storyRecallBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Show feedback
  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  }, []);

  // Timer effect for game duration
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            if (readingTimerRef.current) clearTimeout(readingTimerRef.current);
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

  // Reading timer
  useEffect(() => {
    if (phase === "reading" && readingTimeLeft > 0) {
      readingTimerRef.current = setInterval(() => {
        setReadingTimeLeft(prev => {
          if (prev <= 1) {
            setPhase("questions");
            phaseRef.current = "questions";
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        if (readingTimerRef.current) clearInterval(readingTimerRef.current);
      };
    }
  }, [phase, readingTimeLeft]);

  // Play sound effect
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
      const freqMap = { correct: 880, wrong: 440, streak: 1046.5, complete: 1318.5 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 880, now);
      gain.gain.setValueAtTime(type === 'wrong' ? 0.1 : type === 'streak' || type === 'complete' ? 0.12 : 0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  const skipReading = useCallback(() => {
    if (phase === "reading") {
      if (readingTimerRef.current) clearInterval(readingTimerRef.current);
      setPhase("questions");
      phaseRef.current = "questions";
      setReadingTimeLeft(15);
      showFeedback("Reading skipped!", "success");
    }
  }, [phase, showFeedback]);

  const getAvailableStories = useCallback(() => {
    return allStories.filter(story => !completedStoriesRef.current.includes(story.id));
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      const element = containerRef.current;
      if (!isFullscreen && element?.requestFullscreen) {
        await element.requestFullscreen();
        setIsFullscreen(true);
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
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

  const startNewRound = useCallback(() => {
    const availableStories = getAvailableStories();
    
    if (availableStories.length === 0) {
      setAllStoriesCompleted(true);
      setGameState('gameOver');
      gameStateRef.current = 'gameOver';
      isActiveRef.current = false;
      if (readingTimerRef.current) clearInterval(readingTimerRef.current);
      updateBestScore(scoreRef.current);
      playSound('complete');
      showFeedback("🎉 Congratulations! You&apos;ve completed all stories! 🎉", "success");
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * availableStories.length);
    const story = availableStories[randomIndex];
    
    setCurrentStory(story);
    setAnswers({});
    setShowResults(false);
    setPhase("reading");
    phaseRef.current = "reading";
    setReadingTimeLeft(15);
    setTotalQuestions(story.questions.length);
  }, [getAvailableStories, updateBestScore, playSound, showFeedback]);

  const startGame = useCallback(() => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setRoundsCompleted(0);
    setFeedback('');
    setPhase("ready");
    phaseRef.current = "ready";
    setShowResults(false);
    setAnswers({});
    setCorrectAnswers(0);
    setCompletedStories([]);
    setAllStoriesCompleted(false);
    
    scoreRef.current = 0;
    streakRef.current = 0;
    isActiveRef.current = true;
    completedStoriesRef.current = [];
    
    startNewRound();
  }, [startNewRound]);

  const handleSubmit = useCallback(() => {
    if (!currentStory || gameStateRef.current !== 'playing') return;
    
    let correct = 0;
    currentStory.questions.forEach((q, i) => {
      if (answers[i]?.toLowerCase().trim() === q.a.toLowerCase().trim()) {
        correct++;
      }
    });
    
    const allCorrect = correct === currentStory.questions.length;
    setCorrectAnswers(correct);
    
    setRoundsCompleted(prev => prev + 1);
    
    if (!completedStoriesRef.current.includes(currentStory.id)) {
      completedStoriesRef.current.push(currentStory.id);
      setCompletedStories([...completedStoriesRef.current]);
    }
    
    const wrongAnswers = currentStory.questions.length - correct;
    let pointsEarned = correct - wrongAnswers;
    
    if (pointsEarned > 0) {
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      
      if (allCorrect) {
        streakRef.current += 1;
        setStreak(streakRef.current);
        
        if (streakRef.current > bestStreak) {
          setBestStreak(streakRef.current);
        }
        
        if (streakRef.current % 3 === 0 && streakRef.current > 0) {
          playSound('streak');
          showFeedback(`🔥 ${streakRef.current} Story Streak! +${pointsEarned}`, 'success');
        } else {
          playSound('correct');
          showFeedback(`✓ Perfect! +${pointsEarned} points`, 'success');
        }
      } else {
        streakRef.current = 0;
        setStreak(0);
        playSound('correct');
        showFeedback(`✓ +${pointsEarned} points`, 'success');
      }
    } else {
      scoreRef.current = Math.max(0, scoreRef.current + pointsEarned);
      setScore(scoreRef.current);
      streakRef.current = 0;
      setStreak(0);
      playSound('wrong');
      showFeedback(`✗ -${Math.abs(pointsEarned)} points`, 'error');
    }
    
    setShowResults(true);
    setPhase("results");
    phaseRef.current = "results";
  }, [currentStory, answers, bestStreak, playSound, showFeedback]);

  const nextRound = useCallback(() => {
    if (gameStateRef.current === 'playing') {
      startNewRound();
    }
  }, [startNewRound]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (readingTimerRef.current) clearTimeout(readingTimerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setRoundsCompleted(0);
    setFeedback('');
    setPhase("ready");
    phaseRef.current = "ready";
    setCurrentStory(null);
    setShowResults(false);
    setAnswers({});
    setCompletedStories([]);
    setAllStoriesCompleted(false);
    
    scoreRef.current = 0;
    streakRef.current = 0;
    isActiveRef.current = false;
    completedStoriesRef.current = [];
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (readingTimerRef.current) clearTimeout(readingTimerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading story recall drill...</p>
        </div>
      </div>
    );
  }

  const remainingStories = allStories.length - completedStories.length;

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Story Recall Drill",
            "url": "https://skilldrills.online/drills/memory/long-term-memory/story-recall",
            "description": "Train narrative memory with 5 unique stories. 15-second reading per story then answer 4 detailed questions. +1 per correct answer, -1 per wrong. Complete all stories for mastery achievement.",
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
            "educationalUse": ["Narrative Memory", "Reading Comprehension", "Long-Term Memory", "Detail Recall"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Story Recall", "Narrative Memory", "Detail Retention", "Reading Comprehension"]
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
              Long-Term Memory
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`} aria-current="page">
              Story Recall
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl flex-shrink-0">
              <BookMarked className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Story Recall
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Read each story once • +1 correct / -1 wrong • 5 unique stories • 60s
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
          <h2>Story Recall - Narrative Memory & Detail Recall Training</h2>
          <p>
            Train your narrative memory by reading short stories and recalling key details.
            5 unique stories covering everyday scenarios, each with 4 specific questions.
            15-second reading time per story with skip option. +1 point per correct answer, -1 per wrong.
            Perfect score on all questions earns a story streak. Complete all 5 stories for mastery achievement.
            60-second timed challenge tracking rounds completed and accuracy.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-500" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<BookOpen className="text-cyan-500" />} value={roundsCompleted} label="Rounds" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle className="text-emerald-500" />} value={`${completedStories.length}/5`} label="Stories" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? "#0a1a1a" : "#f0fdf4",
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
                    <BookMarked className="w-16 h-16 text-teal-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Story Recall
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    5 unique stories • 4 questions each • +1/-1 scoring
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Read each story once (15s reading time with skip). Answer detailed questions. Each story appears only once per session.
                  </p>
                  <button 
                    onClick={startGame} 
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    aria-label="Start story recall drill"
                  >
                    Start Training
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && currentStory && (
              <div className="w-full max-w-lg">
                {phase === "reading" && (
                  <div className="space-y-5">
                    <div className={`rounded-xl p-6 text-base md:text-lg leading-relaxed ${isBoxDarkMode ? 'bg-teal-900/30 text-gray-200 border border-teal-800/50' : 'bg-teal-50 text-gray-800 border border-teal-200'}`}>
                      {currentStory.text}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className={`text-sm font-mono font-bold px-3 py-1 rounded-full ${isBoxDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-600'}`}>
                        Reading: {readingTimeLeft}s
                      </div>
                      <button
                        onClick={skipReading}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                          isBoxDarkMode 
                            ? 'bg-teal-500/20 text-teal-400 hover:bg-teal-500/30' 
                            : 'bg-teal-100 text-teal-600 hover:bg-teal-200'
                        } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        aria-label="Skip reading"
                      >
                        <SkipForward className="w-3.5 h-3.5" />
                        Skip
                      </button>
                    </div>
                    <div className={`text-xs text-center ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Stories completed: {completedStories.length}/5
                    </div>
                  </div>
                )}

                {phase === "questions" && !showResults && (
                  <div className="space-y-5">
                    <h3 className={`text-xl font-bold text-center ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Answer the Questions
                    </h3>
                    <div className={`text-sm text-center ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      +1 per correct • -1 per wrong
                    </div>
                    <div className={`text-xs text-center font-bold ${isBoxDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      Story {completedStories.length + 1}/5
                    </div>
                    {currentStory.questions.map((q, i) => (
                      <div key={i} className="space-y-2">
                        <label className={`text-base font-medium ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {q.q}
                        </label>
                        <input
                          type="text"
                          value={answers[i] || ""}
                          onChange={(e) => setAnswers({...answers, [i]: e.target.value})}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
                          className={`w-full p-3 rounded-xl border-2 outline-none transition ${
                            isBoxDarkMode 
                              ? 'bg-white/10 text-white border-teal-500/30 focus:border-teal-500 placeholder-gray-500' 
                              : 'bg-white text-gray-900 border-teal-300 focus:border-teal-500 placeholder-gray-400'
                          }`}
                          placeholder="Type your answer..."
                          aria-label={`Question ${i + 1}: ${q.q}`}
                        />
                      </div>
                    ))}
                    <button
                      onClick={handleSubmit}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                      aria-label="Submit all answers"
                    >
                      Submit Answers
                    </button>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-5 text-center">
                    <div className={`text-3xl md:text-4xl font-bold ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      {correctAnswers} / {totalQuestions}
                    </div>
                    <div className={`text-base ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Score: +{correctAnswers} / -{totalQuestions - correctAnswers}
                    </div>
                    <div className="space-y-2 text-left">
                      <p className={`text-sm font-semibold text-center ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Correct answers:
                      </p>
                      {currentStory.questions.map((q, i) => {
                        const isCorrect = answers[i]?.toLowerCase().trim() === q.a.toLowerCase().trim();
                        return (
                          <div key={i} className={`p-3 rounded-lg text-sm ${
                            isCorrect 
                              ? isBoxDarkMode ? 'bg-green-900/30 text-green-400 border border-green-800/50' : 'bg-green-100 text-green-700 border border-green-200'
                              : isBoxDarkMode ? 'bg-red-900/30 text-red-400 border border-red-800/50' : 'bg-red-100 text-red-700 border border-red-200'
                          }`}>
                            <span className="font-medium">{q.q}</span>
                            <span className="ml-2">
                              {isCorrect ? "✓" : `✗ Correct: ${q.a}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      onClick={nextRound}
                      className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                      aria-label={remainingStories > 1 ? `Next story - ${remainingStories - 1} remaining` : "Complete session"}
                    >
                      {remainingStories > 1 ? `Next Story (${remainingStories - 1} remaining) →` : "Complete Session →"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ============ GAME OVER SCREEN ============ */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    {allStoriesCompleted ? (
                      <Trophy className="w-10 h-10 text-yellow-500" aria-hidden="true" />
                    ) : (
                      <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                    )}
                    <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {allStoriesCompleted ? "Mastery Achieved!" : "Time&apos;s Up!"}
                    </h2>
                  </div>
                  
                  {allStoriesCompleted && (
                    <p className={`text-center mb-4 font-semibold ${isBoxDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                      🎉 You completed all 5 stories! 🎉
                    </p>
                  )}
                  
                  <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {allStoriesCompleted ? 'Outstanding narrative memory!' : 'Keep practicing to improve your story recall.'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                    <ResultCard label="Rounds" value={roundsCompleted} icon={<BookOpen className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Stories" value={`${completedStories.length}/5`} icon={<BookMarked className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/memory" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
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
          <footer className="mt-6" aria-label="Drill rules and instructions">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Read the <span className="font-semibold text-teal-500">story carefully</span> - 15 seconds with skip option</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Answer <span className="font-semibold text-green-500">4 questions</span> about each story</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct answer: <span className="font-semibold text-blue-500">+1 point</span> | Wrong: -1 point</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Each story <span className="font-semibold text-cyan-500">appears only once</span> per session</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Press <span className="font-semibold text-purple-500">Enter</span> to submit answers quickly</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete all 5 stories for <span className="font-semibold text-yellow-500">mastery achievement</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>📖 5 unique stories • Each appears once per session • 4 questions each</span>
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
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
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