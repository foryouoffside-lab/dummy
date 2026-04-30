'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, Trophy, Info, Timer, Images, RefreshCw, SkipForward
} from 'lucide-react';

const ALL_ITEMS = [
  // Common items (Rounds 1-3)
  { item: "Fire", emoji: "🔥", associations: ["hot", "red", "flame", "smoke", "burn"] },
  { item: "Ocean", emoji: "🌊", associations: ["blue", "waves", "fish", "salt", "deep"] },
  { item: "Forest", emoji: "🌳", associations: ["green", "trees", "animals", "leaves", "nature"] },
  { item: "Clock", emoji: "⏰", associations: ["time", "hands", "tick", "numbers", "watch"] },
  { item: "Music", emoji: "🎵", associations: ["notes", "sound", "rhythm", "melody", "song"] },
  { item: "Winter", emoji: "❄️", associations: ["cold", "snow", "ice", "white", "freeze"] },
  { item: "Garden", emoji: "🌻", associations: ["flowers", "soil", "green", "grow", "water"] },
  { item: "Kitchen", emoji: "🍳", associations: ["cook", "food", "heat", "knife", "plate"] },
  { item: "Library", emoji: "📚", associations: ["books", "quiet", "read", "shelves", "study"] },
  { item: "Airport", emoji: "✈️", associations: ["fly", "travel", "luggage", "ticket", "gate"] },
  
  // Less common items (Rounds 4-6)
  { item: "Volcano", emoji: "🌋", associations: ["lava", "erupt", "mountain", "ash", "crater"] },
  { item: "Desert", emoji: "🏜️", associations: ["sand", "dry", "cactus", "hot", "dunes"] },
  { item: "Lighthouse", emoji: "🏮", associations: ["beacon", "coast", "guide", "tower", "ships"] },
  { item: "Observatory", emoji: "🔭", associations: ["stars", "telescope", "dome", "space", "planet"] },
  { item: "Bakery", emoji: "🥖", associations: ["bread", "oven", "flour", "yeast", "sweet"] },
  { item: "Harbor", emoji: "⚓", associations: ["boats", "dock", "cargo", "sail", "port"] },
  { item: "Laboratory", emoji: "🔬", associations: ["experiment", "chemicals", "beaker", "research", "data"] },
  { item: "Stadium", emoji: "🏟️", associations: ["crowd", "game", "cheer", "field", "sport"] },
  { item: "Greenhouse", emoji: "🌿", associations: ["plants", "glass", "warm", "humid", "grow"] },
  { item: "Aquarium", emoji: "🐠", associations: ["fish", "water", "tank", "coral", "swim"] },
  
  // Abstract concepts (Rounds 7-9)
  { item: "Democracy", emoji: "🗳️", associations: ["vote", "freedom", "people", "ballot", "rights"] },
  { item: "Gravity", emoji: "🪐", associations: ["pull", "mass", "Newton", "orbit", "force"] },
  { item: "Justice", emoji: "⚖️", associations: ["law", "fair", "court", "judge", "balance"] },
  { item: "Evolution", emoji: "🧬", associations: ["species", "adapt", "Darwin", "survival", "genes"] },
  { item: "Harmony", emoji: "🎶", associations: ["balance", "peace", "chord", "unity", "blend"] },
  { item: "Legacy", emoji: "📜", associations: ["heritage", "inherit", "history", "tradition", "will"] },
  { item: "Innovation", emoji: "💡", associations: ["invent", "create", "new", "idea", "future"] },
  { item: "Wisdom", emoji: "🦉", associations: ["knowledge", "experience", "sage", "insight", "learn"] },
  { item: "Resilience", emoji: "🪨", associations: ["strong", "bounce", "endure", "tough", "survive"] },
  { item: "Mystery", emoji: "🔮", associations: ["secret", "puzzle", "unknown", "clue", "detective"] }
];

export default function ImageAssociationDrill() {
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
  
  const [currentItem, setCurrentItem] = useState(null);
  const [userAssociations, setUserAssociations] = useState("");
  const [phase, setPhase] = useState("ready");
  const [round, setRound] = useState(1);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [memorizeTime, setMemorizeTime] = useState(5);

  const containerRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const memorizeTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const roundRef = useRef(1);
  const usedItemsRef = useRef(new Set());
  const audioCtxRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best scores
  useEffect(() => {
    const savedBestScore = localStorage.getItem('imageAssociationBestScore');
    const savedBestStreak = localStorage.getItem('imageAssociationBestStreak');
    if (savedBestScore) setBestScore(parseInt(savedBestScore, 10));
    if (savedBestStreak) setBestStreak(parseInt(savedBestStreak, 10));
  }, []);

  const updateBestScore = (finalScore) => {
    const currentBest = parseInt(localStorage.getItem('imageAssociationBestScore') || '0', 10);
    if (finalScore > currentBest) {
      localStorage.setItem('imageAssociationBestScore', finalScore.toString());
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
      setPhase("recall");
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

  const getAvailableItem = () => {
    const available = ALL_ITEMS.filter((_, i) => !usedItemsRef.current.has(i));
    if (available.length === 0) {
      usedItemsRef.current.clear();
      return ALL_ITEMS[Math.floor(Math.random() * ALL_ITEMS.length)];
    }
    return available[Math.floor(Math.random() * available.length)];
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
    usedItemsRef.current = new Set();
    
    startRound();
    showFeedback('60 seconds • Memorize the associations!', 'success');
  };

  const startRound = () => {
    const random = getAvailableItem();
    const idx = ALL_ITEMS.indexOf(random);
    if (idx !== -1) usedItemsRef.current.add(idx);
    
    setCurrentItem(random);
    setUserAssociations("");
    setMemorizeTime(5);
    setPhase("memorize");
  };

  const skipMemorize = () => {
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    setMemorizeTime(0);
    setPhase("recall");
  };

  const checkAssociations = () => {
    const userWords = userAssociations.toLowerCase().split(/[,\s]+/).filter(w => w);
    const targetWords = currentItem.associations.map(w => w.toLowerCase());
    const correct = userWords.filter(w => targetWords.includes(w)).length;
    const wrong = userWords.length - correct;
    
    setTotalAttempts(prev => prev + targetWords.length);
    
    // +1 per correct association, -1 per wrong
    const pointsEarned = correct;
    const pointsLost = wrong;
    
    scoreRef.current += pointsEarned;
    scoreRef.current = Math.max(0, scoreRef.current - pointsLost);
    setScore(scoreRef.current);
    
    setTotalCorrect(prev => prev + correct);
    
    if (correct >= targetWords.length * 0.8) {
      streakRef.current++;
      setStreak(streakRef.current);
      if (streakRef.current > bestStreak) {
        setBestStreak(streakRef.current);
        localStorage.setItem('imageAssociationBestStreak', streakRef.current.toString());
      }
      playSound('correct');
      showFeedback(`✓ +${pointsEarned} | ${correct}/${targetWords.length} correct`, 'success');
    } else {
      streakRef.current = 0;
      setStreak(0);
      playSound('wrong');
      showFeedback(`✗ ${correct}/${targetWords.length} | -${pointsLost}`, 'error');
    }
    
    const newTotal = totalAttempts + targetWords.length;
    const newCorrect = totalCorrect + correct;
    setAccuracy(newTotal > 0 ? Math.round((newCorrect / newTotal) * 100) : 100);
    
    setRoundsCompleted(prev => prev + 1);
    const newRound = roundRef.current + 1;
    roundRef.current = newRound;
    setRound(newRound);
    
    playSound('roundComplete');
    setPhase("result");
    
    // Auto advance after 1.5 seconds
    setTimeout(() => {
      if (gameState === 'playing') {
        startRound();
      }
    }, 1500);
  };

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    setGameState('start');
    setPhase('ready');
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setAccuracy(100);
    setRound(1);
    setTotalCorrect(0);
    setTotalAttempts(0);
    setRoundsCompleted(0);
    roundRef.current = 1;
    usedItemsRef.current = new Set();
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-fuchsia-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
              <div className="p-3 bg-gradient-to-r from-fuchsia-500 to-pink-600 rounded-xl">
                <Images className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Image Association</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+1 correct • -1 wrong • Auto-advance • 60s</p>
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
          <StatCard icon={<Images className="text-cyan-600" />} value={round} label="Round" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? "#0a0a1a" : "#fdf2f8",
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center p-8 overflow-y-auto">
            <div className="w-full max-w-lg">
              {/* Start Screen */}
              {gameState === 'start' && (
                <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                  <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <Images className="w-16 h-16 text-fuchsia-500 mx-auto mb-4" />
                    <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Image Association</h3>
                    <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Memorize item associations</p>
                    <button 
                      onClick={startGame} 
                      className="px-8 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Start Training
                    </button>
                  </div>
                </div>
              )}

              {/* Memorize Phase */}
              {gameState === 'playing' && phase === "memorize" && currentItem && (
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-bold ${isBoxDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`}>
                      Round {round} • {memorizeTime}s
                    </span>
                    <button 
                      onClick={skipMemorize}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        isBoxDarkMode ? 'bg-fuchsia-500/20 text-fuchsia-400 hover:bg-fuchsia-500/30' : 'bg-fuchsia-100 text-fuchsia-600 hover:bg-fuchsia-200'
                      }`}
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      Skip
                    </button>
                  </div>
                  <div className="text-7xl mb-4">{currentItem.emoji}</div>
                  <p className={`text-4xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>{currentItem.item}</p>
                  <div className="flex flex-wrap gap-2 justify-center mt-6">
                    {currentItem.associations.map((word, i) => (
                      <span key={i} className={`px-4 py-2 rounded-full text-lg font-medium ${
                        isBoxDarkMode ? 'bg-white/10 text-white' : 'bg-fuchsia-100 text-gray-900'
                      }`}>
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recall Phase */}
              {gameState === 'playing' && phase === "recall" && currentItem && (
                <div className="space-y-4">
                  <div className="text-center mb-2">
                    <span className={`text-sm font-bold ${isBoxDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      Round {round} • Recall the associations
                    </span>
                  </div>
                  <p className={`text-center text-xl ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    What words were associated with
                  </p>
                  <p className={`text-3xl font-bold text-center ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {currentItem.item}?
                  </p>
                  <textarea
                    value={userAssociations}
                    onChange={(e) => setUserAssociations(e.target.value)}
                    className={`w-full h-32 p-4 rounded-xl border outline-none resize-none text-lg ${
                      isBoxDarkMode 
                        ? 'bg-white/10 text-white border-fuchsia-400/30' 
                        : 'bg-white text-gray-900 border-fuchsia-300'
                    }`}
                    placeholder="Enter associations separated by commas..."
                    autoFocus
                  />
                  <button 
                    onClick={checkAssociations} 
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition"
                  >
                    Submit
                  </button>
                </div>
              )}

              {/* Result Phase */}
              {gameState === 'playing' && phase === "result" && currentItem && (
                <div className="space-y-4 text-center">
                  <p className={`text-xl font-bold ${isBoxDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`}>
                    Associations for {currentItem.item}:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {currentItem.associations.map((word, i) => (
                      <span key={i} className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        userAssociations.toLowerCase().includes(word)
                          ? 'bg-green-500/20 text-green-400' 
                          : isBoxDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                      }`}>
                        {word}
                      </span>
                    ))}
                  </div>
                  <p className={`text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Green = recalled • Red = missed
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40" style={{ background: isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(253,242,248,0.95)' }}>
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
                  <ResultCard label="Rounds" value={roundsCompleted} icon={<Images className="w-4 h-4" />} color="text-green-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Peak Round" value={round} icon={<Brain className="w-4 h-4" />} color="text-cyan-500" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={resetGame} 
                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-fuchsia-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Memorize <span className="font-semibold text-fuchsia-500">item + 5 associations</span> for 5 seconds
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">+1 per correct</span> word recalled
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">-1 per wrong</span> word entered
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">30 unique items</span> • Never repeats in session
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Auto-advances</span> to next round after result
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
                  <span>🟢 Green = Recalled • 🔴 Red = Missed • 5s memorization with skip option</span>
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