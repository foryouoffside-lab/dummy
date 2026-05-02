"use client";

import { useState, useEffect, useRef } from "react";
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
      { q: "What color was the cashier's hat?", a: "Blue" },
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
    text: "Emma and her father visited the aquarium on Saturday. They saw 8 dolphins, 12 clownfish, and a giant sea turtle named Shelly. Emma's favorite part was touching starfish in the touch pool. Her father bought her a plush octopus from the gift shop.",
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

export default function StoryRecallDrill() {
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

  const cleanButtonClass = "outline-none focus:outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus:ring-transparent select-none active:outline-none shadow-none";

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('storyRecallBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('storyRecallBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('storyRecallBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Show feedback
  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 600);
  };

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
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState]);

  // Reading timer
  useEffect(() => {
    if (phase === "reading" && readingTimeLeft > 0) {
      readingTimerRef.current = setInterval(() => {
        setReadingTimeLeft(prev => {
          if (prev <= 1) {
            setPhase("questions");
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(readingTimerRef.current);
    }
  }, [phase, readingTimeLeft]);

  // Play sound effect
  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'correct') {
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'wrong') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'complete') {
        osc.frequency.value = 1318.5;
        gain.gain.value = 0.15;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  const skipReading = () => {
    if (phase === "reading") {
      if (readingTimerRef.current) clearInterval(readingTimerRef.current);
      setPhase("questions");
      setReadingTimeLeft(15);
      showFeedback("Reading skipped!", "success");
    }
  };

  const getAvailableStories = () => {
    return allStories.filter(story => !completedStoriesRef.current.includes(story.id));
  };

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setRoundsCompleted(0);
    setFeedback('');
    setPhase("ready");
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
  };

  const startNewRound = () => {
    // Check if all stories are completed
    const availableStories = getAvailableStories();
    
    if (availableStories.length === 0) {
      setAllStoriesCompleted(true);
      setGameState('gameOver');
      isActiveRef.current = false;
      if (readingTimerRef.current) clearInterval(readingTimerRef.current);
      updateBestScore(scoreRef.current);
      playSound('complete');
      showFeedback("🎉 Congratulations! You've completed all stories! 🎉", "success");
      return;
    }
    
    // Pick a random story from remaining ones
    const randomIndex = Math.floor(Math.random() * availableStories.length);
    const story = availableStories[randomIndex];
    
    setCurrentStory(story);
    setAnswers({});
    setShowResults(false);
    setPhase("reading");
    setReadingTimeLeft(15);
    setTotalQuestions(story.questions.length);
  };

  const handleSubmit = () => {
    let correct = 0;
    currentStory.questions.forEach((q, i) => {
      if (answers[i]?.toLowerCase().trim() === q.a.toLowerCase().trim()) {
        correct++;
      }
    });
    
    const allCorrect = correct === currentStory.questions.length;
    setCorrectAnswers(correct);
    
    setRoundsCompleted(prev => prev + 1);
    
    // Mark this story as completed
    if (!completedStoriesRef.current.includes(currentStory.id)) {
      completedStoriesRef.current.push(currentStory.id);
      setCompletedStories(prev => [...prev, currentStory.id]);
    }
    
    // Calculate score: +1 per correct answer, -1 per wrong answer
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
      // Negative or zero points
      scoreRef.current = Math.max(0, scoreRef.current + pointsEarned);
      setScore(scoreRef.current);
      streakRef.current = 0;
      setStreak(0);
      playSound('wrong');
      showFeedback(`✗ -${Math.abs(pointsEarned)} points`, 'error');
    }
    
    setShowResults(true);
  };

  const nextRound = () => {
    if (gameStateRef.current === 'playing') {
      startNewRound();
    }
  };

  const resetGame = () => {
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
    setCurrentStory(null);
    setShowResults(false);
    setAnswers({});
    setCompletedStories([]);
    setAllStoriesCompleted(false);
    
    scoreRef.current = 0;
    streakRef.current = 0;
    isActiveRef.current = false;
    completedStoriesRef.current = [];
  };

  const toggleFullscreen = async () => {
    try {
      const element = containerRef.current;
      if (!isFullscreen && element?.requestFullscreen) {
        await element.requestFullscreen();
        setIsFullscreen(true);
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (readingTimerRef.current) clearTimeout(readingTimerRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  const remainingStories = allStories.length - completedStories.length;

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/drills/memory" className={`inline-flex items-center gap-2 mb-4 outline-none ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" />
            Back to Memory Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl">
                <BookMarked className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Story Recall</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Read each story once - 60 seconds</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {/* Reset button - only visible during gameplay */}
              {gameState === 'playing' && (
                <button
                  onClick={resetGame}
                  className={`p-2 rounded-lg transition shadow-sm border transition-all hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                      : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                  title="Reset session"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition shadow-sm border transition-all hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsBoxDarkMode(!isBoxDarkMode)}
                className={`p-2 rounded-lg transition shadow-sm border transition-all hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition shadow-sm border transition-all hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className={`p-2 rounded-lg transition shadow-sm border transition-all hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

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
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#0a1a1a" : "#f0fdf4",
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              {/* Reset button in fullscreen */}
              <button 
                onClick={resetGame} 
                className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center p-8 overflow-y-auto">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <BookMarked className="w-16 h-16 text-teal-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Story Recall</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>5 unique stories • Each story appears only once</p>
                  <button 
                    onClick={startGame} 
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Training
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && currentStory && (
              <div className="w-full max-w-lg">
                {phase === "reading" && (
                  <div className="space-y-4">
                    <div className={`rounded-xl p-6 text-base md:text-lg leading-relaxed ${isBoxDarkMode ? 'bg-teal-900/30 text-gray-200' : 'bg-teal-50 text-gray-800'}`}>
                      {currentStory.text}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className={`text-sm font-mono ${isBoxDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                        Reading time: {readingTimeLeft}s remaining
                      </div>
                      <button
                        onClick={skipReading}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-all ${
                          isBoxDarkMode 
                            ? 'bg-white/10 text-white hover:bg-white/20' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        <SkipForward className="w-3 h-3" />
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
                    <div className={`text-xs text-center ${isBoxDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
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
                          className={`w-full p-3 rounded-xl border outline-none transition ${
                            isBoxDarkMode 
                              ? 'bg-white/10 text-white border-teal-500/30 focus:border-teal-500' 
                              : 'bg-white text-gray-900 border-teal-300 focus:border-teal-500'
                          }`}
                          placeholder="Type your answer..."
                        />
                      </div>
                    ))}
                    <button
                      onClick={handleSubmit}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg transition"
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
                    <div className="space-y-2">
                      <p className={`text-sm font-semibold ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Correct answers:
                      </p>
                      {currentStory.questions.map((q, i) => {
                        const isCorrect = answers[i]?.toLowerCase().trim() === q.a.toLowerCase().trim();
                        return (
                          <div key={i} className={`p-2 rounded-lg text-sm ${
                            isCorrect 
                              ? isBoxDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                              : isBoxDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
                          }`}>
                            <span className="font-medium">{q.q}</span>
                            <span className="ml-2">
                              {isCorrect ? "✓" : "✗"} 
                              {!isCorrect && ` Correct: ${q.a}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      onClick={nextRound}
                      className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition"
                    >
                      {remainingStories > 1 ? `Next Story (${remainingStories - 1} remaining) →` : "Complete Session →"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Award className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {allStoriesCompleted ? "Mastery Achieved!" : "Time's Up!"}
                    </h3>
                  </div>
                  
                  {allStoriesCompleted && (
                    <p className={`text-center mb-4 ${isBoxDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                      🎉 You completed all 5 stories! 🎉
                    </p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Stories Completed" value={`${completedStories.length}/5`} icon={<BookOpen className="w-4 h-4" />} color="text-cyan-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/memory" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Play Again →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rules Section - Below the drill box */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Read the <span className="font-semibold text-teal-500">story carefully</span> - 15 seconds reading time</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Answer <span className="font-semibold text-green-500">4 questions</span> about the story</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct answer: <span className="font-semibold text-orange-500">+1 point</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong answer: <span className="font-semibold text-red-500">-1 point</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Each story appears <span className="font-semibold text-cyan-500">only once per session</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete all 5 stories for mastery!</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>📖 5 unique stories • Each story appears only once per session</span>
                  <span>⚡ +1 per correct • -1 per wrong • 60 second timer</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-3 text-center flex flex-col justify-center h-full ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center">{icon}</div>
      <p className={`text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color }) {
  const bgColor = color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 
                   color === 'text-red-500' ? 'bg-red-500/10' : 'bg-green-500/10';
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${bgColor}`}>
      <div className="flex items-center gap-2">
        <div className={color}>{icon}</div>
        <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      </div>
      <span className={`font-bold text-lg ${color}`}>{value}{unit}</span>
    </div>
  );
}