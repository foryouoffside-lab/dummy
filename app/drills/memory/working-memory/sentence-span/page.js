// app/drills/memory/working-memory/sentence-span/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, Heart, FileText, CheckCircle, XCircle, RefreshCw
} from "lucide-react";

// Expanded sentence bank with unique keywords
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

export default function SentenceSpanDrill() {
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
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [roundKey, setRoundKey] = useState(0);
  const [usedSentenceIndices, setUsedSentenceIndices] = useState([]);
  
  const timerIntervalRef = useRef(null);
  const sentenceTimeoutsRef = useRef([]);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const audioCtxRef = useRef(null);
  const usedIndicesRef = useRef([]);
  const totalRoundsRef = useRef(0);

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('sentenceSpanBestScore');
    const savedBestStreak = localStorage.getItem('sentenceSpanBestStreak');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
    if (savedBestStreak) {
      setBestStreak(parseInt(savedBestStreak, 10));
    }
  }, []);

  // Update best score
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('sentenceSpanBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('sentenceSpanBestScore', finalScore.toString());
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

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 1200);
  };

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
        gain.gain.value = 0.1;
      } else if (type === 'wrong') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'levelUp') {
        osc.frequency.value = 1318.5;
        gain.gain.value = 0.15;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
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

  // Clear all sentence timeouts
  const clearSentenceTimeouts = () => {
    sentenceTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    sentenceTimeoutsRef.current = [];
  };

  // Fisher-Yates shuffle algorithm for better randomization
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get unique sentences that haven't been used recently
  const getUniqueSentences = (count) => {
    // If we've used most sentences, reset the tracking
    if (usedIndicesRef.current.length > sentences.length - count) {
      usedIndicesRef.current = [];
    }
    
    // Get available indices
    const availableIndices = sentences
      .map((_, index) => index)
      .filter(index => !usedIndicesRef.current.includes(index));
    
    // Shuffle available indices
    const shuffledIndices = shuffleArray(availableIndices);
    
    // Take the required count
    const selectedIndices = shuffledIndices.slice(0, count);
    
    // Track used indices
    usedIndicesRef.current = [...usedIndicesRef.current, ...selectedIndices];
    setUsedSentenceIndices([...usedIndicesRef.current]);
    
    // Return the selected sentences in randomized order
    return shuffleArray(selectedIndices.map(index => ({
      ...sentences[index],
      originalIndex: index
    })));
  };

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLevel(1);
    setStreak(0);
    setTimeLeft(60);
    setPhase("ready");
    setCurrentSentences([]);
    setUserWords("");
    setProcessing([]);
    setFeedback('');
    setCurrentSentenceIndex(0);
    setRoundKey(0);
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    streakRef.current = 0;
    usedIndicesRef.current = [];
    setUsedSentenceIndices([]);
    totalRoundsRef.current = 0;
    
    startRound();
  };

  const startRound = () => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    clearSentenceTimeouts();
    
    totalRoundsRef.current += 1;
    
    // Clear the answer box for new round
    setUserWords("");
    setRoundKey(prev => prev + 1);
    
    // Level 1 = 3 sentences, Level 2 = 4 sentences, etc.
    const numSentences = level + 2; // Level 1 = 3, Level 2 = 4, Level 3 = 5...
    const selected = getUniqueSentences(numSentences);
    setCurrentSentences(selected);
    setProcessing(selected.map(() => true));
    setCurrentSentenceIndex(0);
    setPhase("processing");
    
    // Auto-advance through sentences
    selected.forEach((_, i) => {
      const timeout = setTimeout(() => {
        setProcessing(prev => prev.map((p, idx) => idx <= i ? false : p));
        setCurrentSentenceIndex(i + 1);
      }, (i + 1) * 2000);
      sentenceTimeoutsRef.current.push(timeout);
    });
    
    const totalTime = numSentences * 2000 + 1000;
    const timeout = setTimeout(() => {
      setPhase("recall");
    }, totalTime);
    sentenceTimeoutsRef.current.push(timeout);
  };

  const checkRecall = () => {
    const recalled = userWords.toLowerCase().split(/[,\s]+/).filter(w => w);
    const targets = currentSentences.map(s => s.word.toLowerCase());
    const correctCount = recalled.filter(w => targets.includes(w)).length;
    const totalTargets = targets.length;
    const successRate = correctCount / totalTargets;
    
    if (successRate >= 0.7) {
      // Success - score equals level (1 point per level)
      const pointsEarned = level;
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      
      const newStreak = streakRef.current + 1;
      streakRef.current = newStreak;
      setStreak(newStreak);
      
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
        localStorage.setItem('sentenceSpanBestStreak', newStreak.toString());
      }
      
      setLevel(prev => prev + 1);
      
      playSound('levelUp');
      showFeedback(`✅ Correct! +${pointsEarned} points!`, 'success');
    } else {
      // Failure - no penalty, just feedback
      streakRef.current = 0;
      setStreak(0);
      
      playSound('wrong');
      const correctWords = currentSentences.map(s => s.word).join(', ');
      showFeedback(`✗ Incorrect! Nouns were: ${correctWords}`, 'error');
    }
    
    // Immediately start next round
    if (isActiveRef.current && gameStateRef.current === 'playing') {
      startRound();
    }
  };

  const resetGame = () => {
    clearSentenceTimeouts();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setLevel(1);
    setStreak(0);
    setTimeLeft(60);
    setPhase("ready");
    setCurrentSentences([]);
    setUserWords("");
    setProcessing([]);
    setFeedback('');
    setCurrentSentenceIndex(0);
    setRoundKey(0);
    setUsedSentenceIndices([]);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearSentenceTimeouts();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sentence Span</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score = Level • No penalty • 60s challenge</p>
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
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<FileText className="text-cyan-600" />} value={level} label="Level" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? "#020202" : "#ffffff",
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={resetGame} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all" title="Reset session">
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
                  <Brain className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Sentence Span</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Read sentences • Remember nouns<br/>
                    Score = Level points • 60 second challenge
                  </p>
                  <button 
                    onClick={startGame} 
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Training
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && (
              <div className="w-full max-w-2xl mx-auto">
                {phase === "processing" && (
                  <div className="space-y-4">
                    {currentSentences.map((s, i) => (
                      <div 
                        key={i} 
                        className={`rounded-[20px] transition-all duration-300 overflow-hidden ${
                          processing[i] 
                            ? `border-2 border-gray-600 bg-gray-800/30 scale-105 shadow-lg`
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
                  </div>
                )}

                {phase === "recall" && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Recall the Nouns</h3>
                      <p className={`${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Type the nouns from each sentence you just read
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <textarea
                        key={roundKey}
                        value={userWords}
                        onChange={(e) => setUserWords(e.target.value)}
                        className={`w-full p-4 rounded-[20px] border-2 focus:outline-none transition ${
                          isBoxDarkMode 
                            ? 'bg-gray-800/50 border-gray-700 text-white focus:border-cyan-500' 
                            : 'bg-white border-gray-200 text-gray-900 focus:border-cyan-500'
                        }`}
                        rows={4}
                        placeholder="Enter nouns separated by commas or spaces..."
                        autoFocus
                      />
                      
                      <button 
                        onClick={checkRecall} 
                        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-[20px] font-semibold hover:shadow-lg transition transform hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Submit Nouns
                      </button>
                    </div>
                    
                    <div className={`p-4 rounded-[20px] ${isBoxDarkMode ? 'bg-gray-800/30 border border-gray-700' : 'bg-gray-100 border border-gray-200'}`}>
                      <p className={`text-sm text-center ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        💡 Remember: Look for the main noun in each sentence
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[520px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Award className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time's Up!</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Highest Level" value={level} icon={<Brain className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Rounds Completed" value={totalRoundsRef.current} icon={<Activity className="w-4 h-4" />} color="text-green-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/memory" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={startGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">Read sentences</span> - One noun per sentence to remember
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">Score = Current Level</span> (Level 1 = 1pt, Level 2 = 2pts, etc.)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Level 1 = 3 sentences</span> • Level 2 = 4 • Level 3 = 5...
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">70% accuracy to level up</span> - More sentences per round
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">No penalties</span> - Wrong answers don't reduce score
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">60 second challenge</span> • Best Score saves locally
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>📝 30 unique sentences • Nouns are the subject of each sentence</span>
                  <span>⚡ No repeated sentences until all used</span>
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
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' : 'bg-blue-500/10';
  
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