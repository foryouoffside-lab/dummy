'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Brain, Trophy, Timer, Target, Award, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon,
  Eye, RotateCcw, CheckCircle, XCircle
} from 'lucide-react';

export default function MemorySequencePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  
  // Game state
  const [gameState, setGameState] = useState('start'); // start, playing, gameOver
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Drill metrics
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [sequenceLength, setSequenceLength] = useState(3);
  const [accuracy, setAccuracy] = useState(100);
  const [correctSequences, setCorrectSequences] = useState(0);
  const [incorrectSequences, setIncorrectSequences] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalSequences, setTotalSequences] = useState(0);
  
  // Memory sequence state
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [isAcceptingInput, setIsAcceptingInput] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState(''); // success, error
  const [roundComplete, setRoundComplete] = useState(false);
  
  // Timers
  const sequenceTimerRef = useRef(null);
  const inputTimerRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  
  // Audio context ref
  const audioContextRef = useRef(null);

  const cleanButtonClass = "outline-none focus:outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus:ring-transparent select-none active:outline-none shadow-none";

  // Check authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      setLoading(false);
    } else if (status === 'loading') {
      setLoading(true);
    }
  }, [status, router]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
      if (inputTimerRef.current) clearTimeout(inputTimerRef.current);
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Toggle fullscreen
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

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Initialize audio context
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Play sound effect
  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    
    const audioContext = initAudio();
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const now = audioContext.currentTime;
    
    switch(type) {
      case 'highlight':
        oscillator.frequency.value = 523.25; // C5
        gainNode.gain.value = 0.15;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.15);
        oscillator.stop(now + 0.15);
        break;
      case 'correct':
        oscillator.frequency.value = 880; // A5
        gainNode.gain.value = 0.12;
        oscillator.start();
        oscillator.frequency.setValueAtTime(880, now);
        oscillator.frequency.exponentialRampToValueAtTime(1318.51, now + 0.2); // E6
        gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.3);
        oscillator.stop(now + 0.3);
        break;
      case 'incorrect':
        oscillator.frequency.value = 440; // A4
        gainNode.gain.value = 0.15;
        oscillator.start();
        oscillator.frequency.setValueAtTime(440, now);
        oscillator.frequency.exponentialRampToValueAtTime(220, now + 0.3); // A3
        gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.4);
        oscillator.stop(now + 0.4);
        break;
      case 'levelUp':
        oscillator.frequency.value = 659.25; // E5
        gainNode.gain.value = 0.1;
        oscillator.start();
        oscillator.frequency.setValueAtTime(659.25, now);
        oscillator.frequency.exponentialRampToValueAtTime(1046.5, now + 0.25); // C6
        gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.35);
        oscillator.stop(now + 0.35);
        break;
      case 'ready':
        oscillator.frequency.value = 784; // G5
        gainNode.gain.value = 0.08;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.1);
        oscillator.stop(now + 0.1);
        break;
      case 'click':
        oscillator.frequency.value = 1046.5; // C6
        gainNode.gain.value = 0.08;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.08);
        oscillator.stop(now + 0.08);
        break;
    }
  }, [soundEnabled, initAudio]);

  // Generate random sequence
  const generateSequence = useCallback((length) => {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
    const newSequence = [];
    for (let i = 0; i < length; i++) {
      newSequence.push(colors[Math.floor(Math.random() * Math.min(4 + Math.floor(level / 2), colors.length))]);
    }
    return newSequence;
  }, [level]);

  // Start new round
  const startNewRound = useCallback(() => {
    // Clear any existing timers
    if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    if (inputTimerRef.current) clearTimeout(inputTimerRef.current);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    
    const newSequence = generateSequence(sequenceLength);
    setSequence(newSequence);
    setUserInput([]);
    setIsShowingSequence(true);
    setIsAcceptingInput(false);
    setHighlightedIndex(-1);
    setRoundComplete(false);
    setFeedbackMessage('');
    
    // Play sequence
    let index = 0;
    const showNext = () => {
      if (index < newSequence.length) {
        setHighlightedIndex(index);
        playSound('highlight');
        
        sequenceTimerRef.current = setTimeout(() => {
          setHighlightedIndex(-1);
          index++;
          
          sequenceTimerRef.current = setTimeout(() => {
            showNext();
          }, 200);
        }, 500);
      } else {
        setIsShowingSequence(false);
        setIsAcceptingInput(true);
        playSound('ready');
        
        // Set input timeout
        inputTimerRef.current = setTimeout(() => {
          if (isAcceptingInput) {
            handleTimeout();
          }
        }, Math.max(3000, sequenceLength * 800));
      }
    };
    
    sequenceTimerRef.current = setTimeout(() => showNext(), 500);
  }, [sequenceLength, generateSequence, playSound, isAcceptingInput]);

  // Handle input timeout
  const handleTimeout = useCallback(() => {
    if (!isAcceptingInput) return;
    
    setIsAcceptingInput(false);
    setIncorrectSequences(prev => prev + 1);
    setTotalSequences(prev => prev + 1);
    setCurrentStreak(0);
    setScore(prev => Math.max(0, prev - 20));
    setFeedbackMessage('Time\'s up! Too slow!');
    setFeedbackType('error');
    playSound('incorrect');
    
    feedbackTimerRef.current = setTimeout(() => {
      if (gameState === 'playing') {
        startNewRound();
      }
    }, 1500);
  }, [isAcceptingInput, gameState, playSound, startNewRound]);

  // Handle color selection
  const handleColorClick = useCallback((color) => {
    if (!isAcceptingInput || roundComplete) return;
    
    playSound('click');
    
    const newUserInput = [...userInput, color];
    setUserInput(newUserInput);
    
    // Check if input is correct so far
    const isCorrect = newUserInput.every((c, i) => c === sequence[i]);
    
    if (!isCorrect) {
      // Wrong sequence
      setIsAcceptingInput(false);
      setRoundComplete(true);
      setIncorrectSequences(prev => prev + 1);
      setTotalSequences(prev => prev + 1);
      setCurrentStreak(0);
      setScore(prev => Math.max(0, prev - 15));
      setFeedbackMessage('Wrong sequence! Try again!');
      setFeedbackType('error');
      playSound('incorrect');
      
      feedbackTimerRef.current = setTimeout(() => {
        if (gameState === 'playing') {
          startNewRound();
        }
      }, 1500);
    } else if (newUserInput.length === sequence.length) {
      // Complete sequence correct
      setIsAcceptingInput(false);
      setRoundComplete(true);
      
      // Calculate points
      const basePoints = sequenceLength * 10;
      const streakBonus = currentStreak * 5;
      const speedBonus = sequenceLength <= 4 ? 20 : 10;
      const pointsEarned = basePoints + streakBonus + speedBonus;
      
      setScore(prev => prev + pointsEarned);
      setCorrectSequences(prev => prev + 1);
      setTotalSequences(prev => prev + 1);
      setCurrentStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        return newStreak;
      });
      
      setFeedbackMessage(`Perfect! +${pointsEarned} points!`);
      setFeedbackType('success');
      playSound('correct');
      
      // Check for level up
      if (correctSequences > 0 && correctSequences % 3 === 2) {
        setLevel(prev => prev + 1);
        setSequenceLength(prev => Math.min(prev + 1, 12));
        playSound('levelUp');
      }
      
      feedbackTimerRef.current = setTimeout(() => {
        if (gameState === 'playing') {
          startNewRound();
        }
      }, 1500);
    }
  }, [isAcceptingInput, roundComplete, userInput, sequence, currentStreak, bestStreak, correctSequences, gameState, playSound, startNewRound]);

  // Update accuracy
  useEffect(() => {
    if (totalSequences > 0) {
      const newAccuracy = Math.round((correctSequences / totalSequences) * 100);
      setAccuracy(newAccuracy);
    }
  }, [correctSequences, totalSequences]);

  // Start game
  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setSequenceLength(3);
    setAccuracy(100);
    setCorrectSequences(0);
    setIncorrectSequences(0);
    setBestStreak(0);
    setCurrentStreak(0);
    setTotalSequences(0);
    setUserInput([]);
    setFeedbackMessage('');
    setRoundComplete(false);
    
    // Initialize audio on first interaction
    initAudio();
    
    setTimeout(() => startNewRound(), 100);
  }, [startNewRound, initAudio]);

  // End game
  const endGame = useCallback(() => {
    setGameState('gameOver');
    setIsAcceptingInput(false);
    setIsShowingSequence(false);
    
    // Clear all timers
    if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    if (inputTimerRef.current) clearTimeout(inputTimerRef.current);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    
    // Save results to API
    const results = {
      score,
      level,
      accuracy,
      correctSequences,
      totalSequences,
      bestStreak,
      timestamp: new Date().toISOString()
    };
    
    console.log('Drill completed:', results);
    // API call here if needed
  }, [score, level, accuracy, correctSequences, totalSequences, bestStreak]);

  // Color mapping
  const colorMap = {
    red: 'bg-red-500 hover:bg-red-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    orange: 'bg-orange-500 hover:bg-orange-600',
    pink: 'bg-pink-500 hover:bg-pink-600',
    cyan: 'bg-cyan-500 hover:bg-cyan-600'
  };

  const glowMap = {
    red: 'shadow-[0_0_30px_rgba(239,68,68,0.8)]',
    blue: 'shadow-[0_0_30px_rgba(59,130,246,0.8)]',
    green: 'shadow-[0_0_30px_rgba(34,197,94,0.8)]',
    yellow: 'shadow-[0_0_30px_rgba(234,179,8,0.8)]',
    purple: 'shadow-[0_0_30px_rgba(168,85,247,0.8)]',
    orange: 'shadow-[0_0_30px_rgba(249,115,22,0.8)]',
    pink: 'shadow-[0_0_30px_rgba(236,72,153,0.8)]',
    cyan: 'shadow-[0_0_30px_rgba(6,182,212,0.8)]'
  };

  // Show loading state
  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/drills/cognitive" className={`inline-flex items-center gap-2 mb-4 outline-none ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" />
            Back to Cognitive Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Memory Sequence</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Test and improve your short-term memory with sequences</p>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition shadow-sm border ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsBoxDarkMode(!isBoxDarkMode)}
                className={`p-2 rounded-lg transition shadow-sm border ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
                title={isBoxDarkMode ? 'Light Box' : 'Dark Box'}
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition shadow-sm border ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
                title={soundEnabled ? 'Mute' : 'Unmute'}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className={`p-2 rounded-lg transition shadow-sm border ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3 mb-6">
          <div className={`rounded-xl shadow-sm border p-3 text-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
          }`}>
            <Trophy className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{score}</p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score</p>
          </div>
          <div className={`rounded-xl shadow-sm border p-3 text-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
          }`}>
            <Target className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-green-600">{accuracy}%</p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Accuracy</p>
          </div>
          <div className={`rounded-xl shadow-sm border p-3 text-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
          }`}>
            <CheckCircle className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-blue-600">{correctSequences}</p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Correct</p>
          </div>
          <div className={`rounded-xl shadow-sm border p-3 text-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
          }`}>
            <XCircle className="w-5 h-5 text-red-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-red-600">{incorrectSequences}</p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Incorrect</p>
          </div>
          <div className={`rounded-xl shadow-sm border p-3 text-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
          }`}>
            <Award className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-purple-600">{currentStreak}</p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Streak</p>
          </div>
          <div className={`rounded-xl shadow-sm border p-3 text-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
          }`}>
            <Award className="w-5 h-5 text-orange-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-orange-600">{bestStreak}</p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Best Streak</p>
          </div>
          <div className={`rounded-xl shadow-sm border p-3 text-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
          }`}>
            <Brain className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-indigo-600">{level}</p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Level</p>
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2 shadow-lg'}`}
          style={{ 
            background: isBoxDarkMode ? "#0a0a0a" : "#ffffff",
            minHeight: isFullscreen ? '100vh' : '500px',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb'
          }}
        >
          {/* Fullscreen Controls Overlay */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-20 flex gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 bg-black/50 rounded-lg hover:bg-black/70 transition text-white ${cleanButtonClass}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsBoxDarkMode(!isBoxDarkMode)}
                className={`p-2 bg-black/50 rounded-lg hover:bg-black/70 transition text-white ${cleanButtonClass}`}
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 bg-black/50 rounded-lg hover:bg-black/70 transition text-white ${cleanButtonClass}`}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className={`p-2 bg-black/50 rounded-lg hover:bg-black/70 transition text-white ${cleanButtonClass}`}
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Stats Overlay for Fullscreen */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
              <div className="flex gap-4">
                <span>Score: <span className="text-yellow-400 font-bold">{score}</span></span>
                <span>Level: <span className="text-blue-400 font-bold">{level}</span></span>
                <span>Streak: <span className="text-green-400 font-bold">{currentStreak}x</span></span>
                <span>Length: <span className="text-purple-400 font-bold">{sequenceLength}</span></span>
              </div>
            </div>
          )}

          {/* Game Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            {/* Sequence Display */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3">
                {sequence.map((color, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 rounded-xl transition-all duration-200 ${
                      colorMap[color] || 'bg-gray-500'
                    } ${
                      highlightedIndex === index ? `scale-110 ${glowMap[color]}` : ''
                    } ${
                      userInput[index] ? 'opacity-50' : ''
                    }`}
                  />
                ))}
              </div>
              {isShowingSequence && (
                <p className={`text-center mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Watch the sequence...
                </p>
              )}
            </div>

            {/* User Input Display */}
            {isAcceptingInput && (
              <div className="mb-8">
                <div className="flex items-center justify-center gap-3">
                  {userInput.map((color, index) => (
                    <div
                      key={index}
                      className={`w-12 h-12 rounded-lg ${colorMap[color]}`}
                    />
                  ))}
                  {[...Array(sequenceLength - userInput.length)].map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className={`w-12 h-12 rounded-lg border-2 border-dashed ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-center mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Repeat the sequence ({userInput.length}/{sequenceLength})
                </p>
              </div>
            )}

            {/* Feedback Message */}
            {feedbackMessage && (
              <div className={`mb-6 px-6 py-3 rounded-lg ${
                feedbackType === 'success' 
                  ? 'bg-green-500/20 text-green-600 border border-green-500/30'
                  : 'bg-red-500/20 text-red-600 border border-red-500/30'
              }`}>
                <p className="font-semibold text-center">{feedbackMessage}</p>
              </div>
            )}

            {/* Color Buttons */}
            {isAcceptingInput && !roundComplete && (
              <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                {Object.entries(colorMap).slice(0, 8).map(([color, className]) => (
                  <button
                    key={color}
                    onClick={() => handleColorClick(color)}
                    disabled={!isAcceptingInput || roundComplete}
                    className={`w-16 h-16 rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className} ${cleanButtonClass}`}
                  />
                ))}
              </div>
            )}

            {/* End Game Button */}
            {gameState === 'playing' && (
              <button
                onClick={endGame}
                className={`mt-8 px-6 py-2 rounded-lg font-semibold transition ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                End Training
              </button>
            )}
          </div>

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-10 ${
              isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
            }`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${
                isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <Brain className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Memory Sequence Drill</h3>
                <p className={`mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Train your short-term memory!
                </p>
                <div className={`text-left text-sm mb-6 space-y-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p>🧠 Watch the color sequence</p>
                  <p>🎯 Repeat it in the same order</p>
                  <p>✅ Correct: +Points, +Streak</p>
                  <p>❌ Wrong: -15 Points, reset streak</p>
                  <p>⏱️ Timeout: -20 Points</p>
                  <p>📈 Level up every 3 correct sequences</p>
                  <p>🏆 Longer sequences = More points</p>
                </div>
                <button
                  onClick={startGame}
                  className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105 w-full ${cleanButtonClass}`}
                >
                  Start Training
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-10 ${
              isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
            }`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${
                isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-4 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Training Complete!</h3>
                <div className={`space-y-2 mb-6 text-left ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex justify-between">
                    <span>Final Score:</span>
                    <span className="font-bold text-yellow-600">{score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level Reached:</span>
                    <span className="font-bold text-purple-600">{level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="font-bold text-green-600">{accuracy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Correct Sequences:</span>
                    <span className="font-bold text-blue-600">{correctSequences}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Sequences:</span>
                    <span className="font-bold text-gray-600">{totalSequences}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Streak:</span>
                    <span className="font-bold text-orange-600">{bestStreak}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={startGame}
                    className={`flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition ${cleanButtonClass}`}
                  >
                    Train Again
                  </button>
                  <Link
                    href="/drills/cognitive"
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition text-center ${cleanButtonClass} ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Back
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        {!isFullscreen && (
          <div className={`mt-6 p-4 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-100'
          }`}>
            <h4 className={`font-semibold mb-2 flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Brain className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              Memory Sequence Protocol:
            </h4>
            <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• 🧠 Watch the sequence of colors carefully</li>
              <li>• 🎯 Click colors in the exact same order</li>
              <li>• ✅ Complete sequence: +Points (longer = more points)</li>
              <li>• ❌ Wrong color: -15 Points, sequence resets</li>
              <li>• ⏱️ Too slow: -20 Points, sequence resets</li>
              <li>• 📈 Level up every 3 correct sequences</li>
              <li>• 🏆 Streak bonus: +5 points per streak</li>
              <li>• 💰 Points = (Length × 10) + (Streak × 5) + Speed Bonus</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}