'use client';

import { useState, useEffect, useRef } from 'react';
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

export default function ConceptLinkingDrill() {
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

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const memorizeTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const roundRef = useRef(1);
  const chainLengthRef = useRef(5);
  const usedChainsRef = useRef(new Set());
  const correctChainRef = useRef([]);
  const userAnswersRef = useRef([]);
  const wrongStepsRef = useRef(new Set());
  const audioCtxRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best scores
  useEffect(() => {
    const savedBestScore = localStorage.getItem('conceptLinkingBestScore');
    const savedBestStreak = localStorage.getItem('conceptLinkingBestStreak');
    if (savedBestScore) setBestScore(parseInt(savedBestScore, 10));
    if (savedBestStreak) setBestStreak(parseInt(savedBestStreak, 10));
  }, []);

  const updateBestScore = (finalScore) => {
    const currentBest = parseInt(localStorage.getItem('conceptLinkingBestScore') || '0', 10);
    if (finalScore > currentBest) {
      localStorage.setItem('conceptLinkingBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  };

  const playSound = (type) => {
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
      
      if (type === 'correct') {
        osc.frequency.value = 880;
        gain.gain.value = 0.1;
      } else if (type === 'wrong') {
        osc.frequency.value = 330;
        gain.gain.value = 0.12;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'roundComplete') {
        osc.frequency.value = 1200;
        gain.gain.value = 0.12;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtxRef.current.currentTime + 0.2);
      osc.stop(audioCtxRef.current.currentTime + 0.2);
    } catch (e) {}
  };

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
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

  // Memorize countdown
  useEffect(() => {
    if (phase === "memorize" && memorizeTime > 0) {
      memorizeTimerRef.current = setInterval(() => {
        setMemorizeTime(t => t - 1);
      }, 1000);
      return () => clearInterval(memorizeTimerRef.current);
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
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
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
  }, [gameState, timeLeft]);

  const getAvailableChain = (length) => {
    const available = ALL_CONCEPT_CHAINS.filter((_, i) => !usedChainsRef.current.has(i));
    if (available.length < 1) {
      usedChainsRef.current.clear();
      return ALL_CONCEPT_CHAINS[Math.floor(Math.random() * ALL_CONCEPT_CHAINS.length)];
    }
    const matching = available.filter(c => c.length === length);
    const pool = matching.length > 0 ? matching : available;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const startRecall = () => {
    setPhase("recall");
    setCurrentStep(0);
    setUserInput("");
    setShowResults(false);
    setUserAnswers([]);
    setWrongSteps(new Set());
    userAnswersRef.current = [];
    wrongStepsRef.current = new Set();
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const skipMemorize = () => {
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    setMemorizeTime(0);
    startRecall();
  };

  const startRound = () => {
    const length = chainLengthRef.current;
    const selectedChain = getAvailableChain(length);
    const idx = ALL_CONCEPT_CHAINS.indexOf(selectedChain);
    if (idx !== -1) usedChainsRef.current.add(idx);
    
    correctChainRef.current = selectedChain.slice(0, Math.min(length, selectedChain.length));
    setChain(correctChainRef.current);
    setChainLength(correctChainRef.current.length);
    setMemorizeTime(5);
    setPhase("memorize");
    setIsProcessing(false);
    setCurrentStep(0);
    setShowResults(false);
  };

  const startGame = () => {
    setGameState('playing');
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
    roundRef.current = 1;
    chainLengthRef.current = 5;
    usedChainsRef.current = new Set();
    
    startRound();
    showFeedback('60 seconds • Recall the chain!', 'success');
  };

  const handleSubmit = () => {
    if (isProcessing || !userInput.trim()) return;
    setIsProcessing(true);
    
    const userAnswer = userInput.trim();
    const correctAnswer = correctChainRef.current[currentStep];
    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    
    // Track answer
    userAnswersRef.current.push({ answer: userAnswer, correct: isCorrect, expected: correctAnswer });
    setUserAnswers(prev => [...prev, { answer: userAnswer, correct: isCorrect, expected: correctAnswer }]);
    
    // Update score per concept
    setTotalAttempts(prev => prev + 1);
    
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
      setWrongSteps(prev => new Set([...prev, currentStep]));
      playSound('wrong');
      showFeedback('✗ -1', 'error');
    }
    
    const newTotal = totalAttempts + 1;
    const newCorrect = totalCorrect + (isCorrect ? 1 : 0);
    setAccuracy(newTotal > 0 ? Math.round((newCorrect / newTotal) * 100) : 100);
    
    // Move to next step or show results
    if (currentStep < correctChainRef.current.length - 1) {
      setCurrentStep(prev => prev + 1);
      setUserInput("");
      setIsProcessing(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      // Chain complete - show results with full path
      setShowResults(true);
      setPhase("result");
      setIsProcessing(false);
      
      // Check if all correct (perfect round)
      const allCorrect = wrongStepsRef.current.size === 0;
      
      if (allCorrect) {
        streakRef.current++;
        setStreak(streakRef.current);
        
        if (streakRef.current > bestStreak) {
          setBestStreak(streakRef.current);
          localStorage.setItem('conceptLinkingBestStreak', streakRef.current.toString());
        }
        
        // Increase chain length every 3 perfect rounds
        if (streakRef.current % 3 === 0 && chainLengthRef.current < 8) {
          chainLengthRef.current++;
        }
        
        playSound('roundComplete');
      } else {
        streakRef.current = 0;
        setStreak(0);
      }
      
      setRoundsCompleted(prev => prev + 1);
      roundRef.current++;
      setRound(roundRef.current);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/drills/memory" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Memory Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Concept Linking</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+1 correct • -1 wrong • Step by step • 60s</p>
              </div>
            </div>
            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} title="Reset session">
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<Link2 className="text-cyan-600" />} value={chainLength} label="Chain" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-emerald-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#0a0a1a" : "#fff1f2",
            aspectRatio: '16/9',
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

          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-full max-w-lg text-center">
              {/* Start Screen */}
              {gameState === 'start' && (
                <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                  <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <Link2 className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                    <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Concept Linking</h3>
                    <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Step by step recall</p>
                    <button 
                      onClick={startGame} 
                      className="px-8 py-3 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Start Training
                    </button>
                  </div>
                </div>
              )}

              {/* Memorize Phase */}
              {gameState === 'playing' && phase === "memorize" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-bold ${isBoxDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                      {memorizeTime}s
                    </span>
                    <button 
                      onClick={skipMemorize}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        isBoxDarkMode ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30' : 'bg-rose-100 text-rose-600 hover:bg-rose-200'
                      }`}
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      Skip
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {chain.map((concept, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`px-4 py-2 rounded-xl text-lg font-semibold ${
                          isBoxDarkMode ? 'bg-white/10 text-white' : 'bg-rose-100 text-gray-900'
                        }`}>
                          {concept}
                        </div>
                        {i < chain.length - 1 && (
                          <span className={`text-2xl ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recall Phase */}
              {gameState === 'playing' && phase === "recall" && !showResults && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <span className={`text-sm font-bold ${isBoxDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      Step {currentStep + 1} of {chain.length}
                    </span>
                  </div>
                  
                  {/* Progress dots */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {chain.map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${
                        i < currentStep 
                          ? wrongSteps.has(i) ? 'bg-red-500' : 'bg-green-500'
                          : i === currentStep 
                            ? 'bg-cyan-500 animate-pulse' 
                            : isBoxDarkMode ? 'bg-white/10' : 'bg-rose-200'
                      }`} />
                    ))}
                  </div>
                  
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`w-full text-xl text-center p-4 rounded-xl border-2 outline-none ${
                      isBoxDarkMode 
                        ? 'bg-white/10 text-white border-rose-400/30 focus:border-rose-400' 
                        : 'bg-white text-gray-900 border-rose-300 focus:border-rose-500'
                    }`}
                    placeholder={`Concept ${currentStep + 1}...`}
                    autoFocus
                  />
                  
                  <button 
                    onClick={handleSubmit} 
                    disabled={!userInput.trim() || isProcessing}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50"
                  >
                    Submit
                  </button>
                  
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Press Enter to submit each concept
                  </p>
                </div>
              )}

              {/* Result Phase - Show full path */}
              {gameState === 'playing' && phase === "result" && showResults && (
                <div className="space-y-4">
                  <p className={`text-lg font-bold ${wrongSteps.size === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {wrongSteps.size === 0 ? '✓ Perfect Round!' : `Round Complete`}
                  </p>
                  
                  <div className="space-y-2">
                    <p className={`text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Actual chain:
                    </p>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      {chain.map((concept, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                            isBoxDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                          }`}>
                            {concept}
                          </div>
                          {i < chain.length - 1 && (
                            <span className={`${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {userAnswers.length > 0 && (
                    <div className="space-y-2">
                      <p className={`text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Your answers:
                      </p>
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        {userAnswers.map((ans, i) => (
                          <div key={i} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                            ans.correct 
                              ? isBoxDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                              : isBoxDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                          }`}>
                            {ans.answer}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button 
                    onClick={startRound} 
                    className="w-full py-3 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-xl font-bold hover:shadow-lg transition"
                  >
                    Next Chain
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40" style={{ background: isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(255,241,242,0.95)' }}>
              <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time's Up!</h3>
                </div>
                
                <p className={`text-center mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60 seconds completed!
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-blue-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-purple-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Rounds" value={roundsCompleted} icon={<Link2 className="w-4 h-4" />} color="text-green-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Max Chain" value={chainLength} icon={<Brain className="w-4 h-4" />} color="text-cyan-500" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/memory" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Memorize the <span className="font-semibold text-rose-500">concept chain</span> for 5 seconds
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">+1 per correct</span> concept
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">-1 per wrong</span> concept
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Wrong answers <span className="font-semibold text-cyan-500">don't reveal full path</span> until end
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">30 unique chains</span> • Chains get longer over time
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Challenge lasts <span className="font-semibold text-yellow-500">60 seconds</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🟢 Green dot = correct • 🔴 Red dot = wrong • Full path shown at end</span>
                  <span>⚡ Best Score saves locally</span>
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

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const bgColor = color === 'text-blue-500' ? 'bg-blue-500/10' : 
                   color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 'bg-cyan-500/10';
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${bgColor}`}>
      <div className="flex items-center gap-2">
        <div className={color}>{icon}</div>
        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-lg ${color}`}>{value}{unit}</span>
    </div>
  );
}