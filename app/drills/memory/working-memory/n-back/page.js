// app/drills/memory/working-memory/n-back/page.js
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Trophy, Info, Hash, TrendingUp, Brain
} from "lucide-react";

export default function NBackDrill() {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [n, setN] = useState(3);
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [currentLetter, setCurrentLetter] = useState("");
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [canAnswer, setCanAnswer] = useState(true);
  const [gameActive, setGameActive] = useState(false);
  const [letterTimeoutActive, setLetterTimeoutActive] = useState(false);

  const timerIntervalRef = useRef(null);
  const letterTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const totalRef = useRef(0);
  const sequenceRef = useRef([]);
  const currentIndexRef = useRef(0);
  const isActiveRef = useRef(false);
  const canAnswerRef = useRef(true);
  const waitingForNextRef = useRef(false);

  const cleanButtonClass = "outline-none focus:outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus:ring-transparent select-none active:outline-none shadow-none";

  // Generate a random letter (A-Z)
  const getRandomLetter = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
  };

  // Generate sequence of 60 letters with at least 23 matches
  const generateSequence = useCallback(() => {
    const seq = [];
    let matchCount = 0;
    const targetMatches = 23;
    
    for (let i = 0; i < 60; i++) {
      if (i >= 3 && matchCount < targetMatches && Math.random() < 0.5) {
        seq.push(seq[i - 3]);
        matchCount++;
      } else {
        let newLetter;
        do {
          newLetter = getRandomLetter();
        } while (i >= 3 && newLetter === seq[i - 3]);
        seq.push(newLetter);
      }
    }
    
    sequenceRef.current = seq;
    setSequence(seq);
    return seq;
  }, []);

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('nbackBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('nbackBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('nbackBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

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
      } else if (type === 'wrong') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'penalty') {
        osc.frequency.value = 330;
        gain.gain.value = 0.1;
      } else if (type === 'next') {
        osc.frequency.value = 660;
        gain.gain.value = 0.06;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 500);
  };

  // Apply penalty for wrong answer (5 points)
  const applyPenalty = () => {
    const penaltyPoints = 5;
    scoreRef.current = Math.max(0, scoreRef.current - penaltyPoints);
    setScore(scoreRef.current);
    playSound('penalty');
    showFeedback(`✗ Wrong! -${penaltyPoints} points`, 'error');
  };

  // Move to next letter
  const moveToNextLetter = useCallback(() => {
    if (!isActiveRef.current) return;
    if (waitingForNextRef.current) return;
    
    waitingForNextRef.current = true;
    
    const nextIndex = currentIndexRef.current + 1;
    
    if (nextIndex < sequenceRef.current.length) {
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
      setCurrentLetter(sequenceRef.current[nextIndex]);
      setCanAnswer(true);
      canAnswerRef.current = true;
      setLetterTimeoutActive(true);
      waitingForNextRef.current = false;
      playSound('next');
      
      // Start timer for auto-move to next letter (changed from 1500 to 1000)
      if (letterTimerRef.current) clearTimeout(letterTimerRef.current);
      letterTimerRef.current = setTimeout(() => {
        if (isActiveRef.current && canAnswerRef.current && currentIndexRef.current >= n) {
          // Timeout - user didn't answer
          totalRef.current += 1;
          setTotal(totalRef.current);
          streakRef.current = 0;
          setStreak(0);
          
          const totalCorrect = scoreRef.current;
          const totalAttempts = totalRef.current;
          setAccuracy(totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 100);
          
          setCanAnswer(false);
          canAnswerRef.current = false;
          setLetterTimeoutActive(false);
          
          showFeedback(`⏰ Timeout!`, 'warning');
          
          // Move to next letter after timeout
          setTimeout(() => {
            moveToNextLetter();
          }, 300);
        } else if (currentIndexRef.current < n) {
          // Not enough letters yet, just move to next
          setLetterTimeoutActive(false);
          setTimeout(() => {
            moveToNextLetter();
          }, 300);
        }
      }, 1000); // Changed from 1500 to 1000
    } else {
      // End of sequence - start a new round
      const finalScore = scoreRef.current;
      setRoundsCompleted(prev => prev + 1);
      
      if (finalScore > bestScore) {
        updateBestScore(finalScore);
      }
      
      const newSeq = generateSequence();
      setSequence(newSeq);
      currentIndexRef.current = 0;
      setCurrentIndex(0);
      setCurrentLetter(newSeq[0]);
      setCanAnswer(true);
      canAnswerRef.current = true;
      setLetterTimeoutActive(true);
      waitingForNextRef.current = false;
      showFeedback(`Round Complete! Score: ${finalScore}`, 'success');
      
      // Start timer for first letter of new round (changed from 1500 to 1000)
      if (letterTimerRef.current) clearTimeout(letterTimerRef.current);
      letterTimerRef.current = setTimeout(() => {
        if (isActiveRef.current && canAnswerRef.current && currentIndexRef.current >= n) {
          totalRef.current += 1;
          setTotal(totalRef.current);
          streakRef.current = 0;
          setStreak(0);
          
          const totalCorrect = scoreRef.current;
          const totalAttempts = totalRef.current;
          setAccuracy(totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 100);
          
          setCanAnswer(false);
          canAnswerRef.current = false;
          setLetterTimeoutActive(false);
          
          moveToNextLetter();
        } else if (currentIndexRef.current < n) {
          moveToNextLetter();
        }
      }, 1000); // Changed from 1500 to 1000
    }
  }, [bestScore, generateSequence, n]);

  // Check answer
  const checkAnswer = (isMatch) => {
    if (!canAnswerRef.current || !isActiveRef.current) return;
    if (currentIndexRef.current < n) {
      showFeedback(`Wait for ${n} letters first!`, 'warning');
      return;
    }
    
    // Clear the timeout since user answered
    if (letterTimerRef.current) clearTimeout(letterTimerRef.current);
    setLetterTimeoutActive(false);
    
    const currentIdx = currentIndexRef.current;
    const previousIdx = currentIdx - n;
    const currentLetterValue = sequenceRef.current[currentIdx];
    const previousLetter = sequenceRef.current[previousIdx];
    const actualMatch = currentLetterValue === previousLetter;
    
    totalRef.current += 1;
    setTotal(totalRef.current);
    
    if (isMatch === actualMatch) {
      // Correct answer: +1 point
      const pointsEarned = 1;
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      
      streakRef.current += 1;
      setStreak(streakRef.current);
      
      if (streakRef.current > bestStreak) {
        setBestStreak(streakRef.current);
      }
      
      if (streakRef.current % 5 === 0 && streakRef.current > 0) {
        playSound('streak');
        showFeedback(`🔥 ${streakRef.current} Streak! +${pointsEarned}`, 'success');
      } else {
        playSound('correct');
        showFeedback(`✓ Correct! +${pointsEarned}`, 'success');
      }
    } else {
      // Wrong answer: -5 points penalty
      streakRef.current = 0;
      setStreak(0);
      applyPenalty();
    }
    
    setCanAnswer(false);
    canAnswerRef.current = false;
    
    const totalCorrect = scoreRef.current;
    const totalAttempts = totalRef.current;
    setAccuracy(totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 100);
    
    // Move to next letter after delay
    setTimeout(() => {
      moveToNextLetter();
    }, 500);
  };

  // Timer effect for game duration
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            if (letterTimerRef.current) clearTimeout(letterTimerRef.current);
            setGameActive(false);
            isActiveRef.current = false;
            setGameState('gameOver');
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
  }, [gameActive, timeLeft]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTotal(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setRoundsCompleted(0);
    setAccuracy(100);
    setFeedback('');
    setCanAnswer(true);
    setGameActive(true);
    setLetterTimeoutActive(true);
    
    scoreRef.current = 0;
    streakRef.current = 0;
    totalRef.current = 0;
    isActiveRef.current = true;
    canAnswerRef.current = true;
    waitingForNextRef.current = false;
    
    if (letterTimerRef.current) clearTimeout(letterTimerRef.current);
    
    const newSeq = generateSequence();
    setSequence(newSeq);
    currentIndexRef.current = 0;
    setCurrentIndex(0);
    setCurrentLetter(newSeq[0]);
    
    // Start timer for first letter (changed from 1500 to 1000)
    letterTimerRef.current = setTimeout(() => {
      if (isActiveRef.current && canAnswerRef.current && currentIndexRef.current >= n) {
        totalRef.current += 1;
        setTotal(totalRef.current);
        streakRef.current = 0;
        setStreak(0);
        
        const totalCorrect = scoreRef.current;
        const totalAttempts = totalRef.current;
        setAccuracy(totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 100);
        
        setCanAnswer(false);
        canAnswerRef.current = false;
        setLetterTimeoutActive(false);
        
        moveToNextLetter();
      } else if (currentIndexRef.current < n) {
        moveToNextLetter();
      }
    }, 1000); // Changed from 1500 to 1000
  };

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (letterTimerRef.current) clearTimeout(letterTimerRef.current);
    setGameActive(false);
    setGameState('start');
    setScore(0);
    setTotal(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setFeedback('');
    setCurrentLetter('');
    setCanAnswer(true);
    setSequence([]);
    setCurrentIndex(0);
    setLetterTimeoutActive(false);
    scoreRef.current = 0;
    streakRef.current = 0;
    totalRef.current = 0;
    isActiveRef.current = false;
    canAnswerRef.current = true;
    waitingForNextRef.current = false;
    sequenceRef.current = [];
    currentIndexRef.current = 0;
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

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (letterTimerRef.current) clearTimeout(letterTimerRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
          <Link href="/drills/memory" className={`inline-flex items-center gap-2 mb-4 outline-none ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" />
            Back to Memory Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3-Back Training</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Match current letter with 3 steps back - 60 seconds</p>
              </div>
            </div>
            
            <div className="flex gap-2">
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
        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-500" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-emerald-500" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? "#0a0a2a" : "#ffffff",
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

          <div className="absolute inset-0 flex items-center justify-center p-8">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Brain className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>3-Back Training</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Working memory</p>
                  <button 
                    onClick={startGame} 
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Training
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && sequence.length > 0 && (
              <div className="w-full max-w-md text-center">
                {/* Current Letter Display */}
                <div className={`text-8xl md:text-9xl font-bold mb-8 ${isBoxDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                  {currentLetter || "?"}
                </div>
                
                {/* REMOVED: Timer Indicator - "Answer within 1.5 seconds..." text */}
                
                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => checkAnswer(true)}
                    disabled={!canAnswer || currentIndex < n}
                    className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl transition text-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Match ✓
                  </button>
                  <button
                    onClick={() => checkAnswer(false)}
                    disabled={!canAnswer || currentIndex < n}
                    className="flex-1 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-xl transition text-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    No Match ✗
                  </button>
                </div>
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Award className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time's Up!</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Rounds" value={roundsCompleted} icon={<Brain className="w-4 h-4" />} color="text-cyan-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/memory" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3-Back Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Letters appear every 1 second</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Compare current letter with <span className="font-semibold text-green-500">letter from 3 steps back</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click <span className="font-semibold text-blue-500">Match</span> or <span className="font-semibold text-blue-500">No Match</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct: <span className="font-semibold text-orange-500">+1 point</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong: <span className="font-semibold text-red-500">-5 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60 seconds • 60 letters per round</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🧠 ~23 guaranteed matches per round</span>
                  <span>⚡ 5 streak bonus notification</span>
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
                   color === 'text-purple-500' ? 'bg-purple-500/10' :
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' : 
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