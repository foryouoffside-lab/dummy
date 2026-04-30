'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, Trophy, Info, Timer, Music, RefreshCw, Play, RotateCcw
} from 'lucide-react';

const ALL_PATTERNS = [
  // Simple patterns (Rounds 1-3)
  { name: "Rain", beats: [1, 0, 1, 0, 1, 0, 1, 1], emoji: "🌧️" },
  { name: "Heartbeat", beats: [1, 1, 0, 1, 1, 0, 1, 1], emoji: "💓" },
  { name: "Clock", beats: [1, 0, 1, 0, 1, 0, 1, 0], emoji: "🕐" },
  { name: "Drum", beats: [1, 1, 1, 0, 1, 1, 1, 0], emoji: "🥁" },
  { name: "March", beats: [1, 0, 1, 0, 1, 1, 1, 0], emoji: "🥁" },
  { name: "Waltz", beats: [1, 0, 0, 1, 0, 0, 1, 0], emoji: "💃" },
  { name: "Samba", beats: [1, 1, 0, 1, 0, 1, 1, 0], emoji: "🪘" },
  { name: "Echo", beats: [1, 0, 0, 1, 0, 1, 0, 0], emoji: "🔊" },
  { name: "Pulse", beats: [1, 0, 1, 1, 0, 1, 0, 1], emoji: "💫" },
  { name: "Rhythm", beats: [1, 1, 0, 1, 1, 0, 1, 0], emoji: "🎵" },
  
  // Medium patterns (Rounds 4-6)
  { name: "Swing", beats: [1, 0, 1, 1, 0, 1, 1, 0, 0, 1], emoji: "🎷" },
  { name: "Flamenco", beats: [1, 1, 0, 1, 1, 1, 0, 1, 0, 1], emoji: "💃" },
  { name: "Reggae", beats: [1, 0, 1, 0, 0, 1, 1, 0, 0, 1], emoji: "🎸" },
  { name: "Jazz", beats: [1, 0, 1, 1, 0, 1, 0, 1, 1, 0], emoji: "🎹" },
  { name: "Funk", beats: [1, 1, 0, 1, 0, 0, 1, 1, 0, 1], emoji: "🕺" },
  { name: "Bossa", beats: [1, 0, 1, 0, 1, 1, 0, 1, 0, 1], emoji: "🎶" },
  { name: "Tango", beats: [1, 0, 0, 1, 1, 0, 1, 0, 0, 1], emoji: "💃" },
  { name: "Blues", beats: [1, 1, 0, 0, 1, 1, 0, 1, 1, 0], emoji: "🎤" },
  { name: "Rock", beats: [1, 0, 1, 1, 0, 1, 0, 1, 0, 1], emoji: "🎸" },
  { name: "Pop", beats: [1, 1, 0, 1, 1, 0, 1, 1, 0, 1], emoji: "🎵" },
  
  // Complex patterns (Rounds 7-9)
  { name: "Afrobeat", beats: [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1], emoji: "🥁" },
  { name: "Samba2", beats: [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1], emoji: "🪘" },
  { name: "Rumba", beats: [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1], emoji: "💃" },
  { name: "Conga", beats: [1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0], emoji: "🥁" },
  { name: "Mambo", beats: [1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1], emoji: "🕺" },
  { name: "Salsa", beats: [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0], emoji: "💃" },
  { name: "Calypso", beats: [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1], emoji: "🎵" },
  { name: "Merengue", beats: [1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1], emoji: "💃" },
  { name: "Bachata", beats: [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0], emoji: "🎶" },
  { name: "Cumbia", beats: [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1], emoji: "🪘" }
];

export default function SoundPatternDrill() {
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
  
  const [currentPattern, setCurrentPattern] = useState(null);
  const [userPattern, setUserPattern] = useState([]);
  const [phase, setPhase] = useState("ready");
  const [round, setRound] = useState(1);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [patternLength, setPatternLength] = useState(8);

  const containerRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const patternLengthRef = useRef(8);
  const usedPatternsRef = useRef(new Set());
  const correctPatternRef = useRef(null);
  const playbackTimeoutsRef = useRef([]);
  const audioCtxRef = useRef(null);
  const gameActiveRef = useRef(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best scores
  useEffect(() => {
    const savedBestScore = localStorage.getItem('soundPatternBestScore');
    const savedBestStreak = localStorage.getItem('soundPatternBestStreak');
    if (savedBestScore) setBestScore(parseInt(savedBestScore, 10));
    if (savedBestStreak) setBestStreak(parseInt(savedBestStreak, 10));
  }, []);

  const updateBestScore = (finalScore) => {
    const currentBest = parseInt(localStorage.getItem('soundPatternBestScore') || '0', 10);
    if (finalScore > currentBest) {
      localStorage.setItem('soundPatternBestScore', finalScore.toString());
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

  const clearPlayback = () => {
    playbackTimeoutsRef.current.forEach(id => clearTimeout(id));
    playbackTimeoutsRef.current = [];
  };

  const playBeep = (duration = 0.3, frequency = 440) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const oscillator = audioCtxRef.current.createOscillator();
      const gainNode = audioCtxRef.current.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtxRef.current.destination);
      oscillator.frequency.value = frequency;
      gainNode.gain.value = 0.3;
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + duration);
      oscillator.stop(audioCtxRef.current.currentTime + duration);
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

  // 60 second game timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameActiveRef.current = false;
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

  const getAvailablePattern = (length) => {
    const available = ALL_PATTERNS.filter((_, i) => !usedPatternsRef.current.has(i));
    if (available.length < 1) {
      usedPatternsRef.current.clear();
      return ALL_PATTERNS[Math.floor(Math.random() * ALL_PATTERNS.length)];
    }
    const matching = available.filter(p => p.beats.length === length);
    const pool = matching.length > 0 ? matching : available;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const startReproduce = () => {
    setPhase("reproduce");
    setIsProcessing(false);
  };

  const playPattern = (pattern) => {
    clearPlayback();
    setPlaying(true);
    setCurrentBeat(-1);
    
    const timeouts = [];
    
    pattern.beats.forEach((beat, i) => {
      const id = setTimeout(() => {
        setCurrentBeat(i);
        if (beat === 1) {
          playBeep(0.3, 440 + i * 30);
        }
      }, i * 500 + 300);
      timeouts.push(id);
    });
    
    // End playback and move to reproduce
    const endTime = pattern.beats.length * 500 + 800;
    const endId = setTimeout(() => {
      setPlaying(false);
      setCurrentBeat(-1);
      startReproduce();
    }, endTime);
    timeouts.push(endId);
    
    playbackTimeoutsRef.current = timeouts;
  };

  const startRound = () => {
    const length = patternLengthRef.current;
    const pattern = getAvailablePattern(length);
    const idx = ALL_PATTERNS.indexOf(pattern);
    if (idx !== -1) usedPatternsRef.current.add(idx);
    
    correctPatternRef.current = pattern;
    setCurrentPattern(pattern);
    setUserPattern([]);
    setIsProcessing(false);
    setPhase("listening");
    
    // Small delay before starting playback
    setTimeout(() => {
      playPattern(pattern);
    }, 300);
  };

  const startGame = () => {
    setGameState('playing');
    gameActiveRef.current = true;
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setAccuracy(100);
    setRound(1);
    setTotalCorrect(0);
    setTotalAttempts(0);
    setRoundsCompleted(0);
    setFeedback('');
    setPatternLength(8);
    
    scoreRef.current = 0;
    streakRef.current = 0;
    patternLengthRef.current = 8;
    usedPatternsRef.current = new Set();
    
    startRound();
    showFeedback('60 seconds • Reproduce the pattern!', 'success');
  };

  const handleBeatClick = (beat) => {
    if (phase !== "reproduce" || isProcessing) return;
    
    const newPattern = [...userPattern, beat ? 1 : 0];
    setUserPattern(newPattern);
    
    if (beat) playBeep(0.2, 440);
    
    if (newPattern.length === correctPatternRef.current.beats.length) {
      setIsProcessing(true);
      
      const correct = newPattern.every((b, i) => b === correctPatternRef.current.beats[i]);
      
      setTotalAttempts(prev => prev + 1);
      
      if (correct) {
        scoreRef.current += 2;
        setScore(scoreRef.current);
        
        setTotalCorrect(prev => prev + 1);
        streakRef.current++;
        setStreak(streakRef.current);
        
        if (streakRef.current > bestStreak) {
          setBestStreak(streakRef.current);
          localStorage.setItem('soundPatternBestStreak', streakRef.current.toString());
        }
        
        if (streakRef.current % 3 === 0 && patternLengthRef.current < 12) {
          patternLengthRef.current = patternLengthRef.current === 8 ? 10 : 12;
          setPatternLength(patternLengthRef.current);
        }
        
        playBeep(0.4, 880);
        showFeedback('✓ Perfect! +2', 'success');
        
      } else {
        scoreRef.current = Math.max(0, scoreRef.current - 2);
        setScore(scoreRef.current);
        
        streakRef.current = 0;
        setStreak(0);
        
        playBeep(0.4, 220);
        showFeedback('✗ Wrong! -2', 'error');
      }
      
      const newTotal = totalAttempts + 1;
      const newCorrect = totalCorrect + (correct ? 1 : 0);
      setAccuracy(newTotal > 0 ? Math.round((newCorrect / newTotal) * 100) : 100);
      
      setRoundsCompleted(prev => prev + 1);
      setRound(prev => prev + 1);
      
      setPhase("result");
      
      setTimeout(() => {
        if (gameActiveRef.current) {
          startRound();
        }
      }, 600);
    }
  };

  const resetPattern = () => {
    setUserPattern([]);
  };

  const replayPattern = () => {
    if (correctPatternRef.current && gameActiveRef.current) {
      setUserPattern([]);
      setPhase("listening");
      setTimeout(() => {
        playPattern(correctPatternRef.current);
      }, 200);
    }
  };

  const resetGame = () => {
    gameActiveRef.current = false;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    clearPlayback();
    setGameState('start');
    setPhase('ready');
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setAccuracy(100);
    setPatternLength(8);
    patternLengthRef.current = 8;
    usedPatternsRef.current = new Set();
  };

  useEffect(() => {
    return () => {
      gameActiveRef.current = false;
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      clearPlayback();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
              <div className="p-3 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sound Pattern</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+2 correct • -2 wrong • Adaptive patterns • 60s</p>
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
          <StatCard icon={<Music className="text-cyan-600" />} value={patternLength} label="Length" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? "#0a0a1a" : "#f0f9ff",
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
            <div className="w-full max-w-lg text-center">
              {/* Start Screen */}
              {gameState === 'start' && (
                <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                  <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <Music className="w-16 h-16 text-sky-500 mx-auto mb-4" />
                    <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Sound Pattern</h3>
                    <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Listen and reproduce patterns</p>
                    <button 
                      onClick={startGame} 
                      className="px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Start Training
                    </button>
                  </div>
                </div>
              )}

              {/* Listening Phase */}
              {gameState === 'playing' && phase === "listening" && currentPattern && (
                <div className="space-y-6">
                  <span className={`text-sm font-bold ${isBoxDarkMode ? 'text-sky-400' : 'text-sky-600'}`}>
                    Listening...
                  </span>
                  
                  <p className="text-6xl">{currentPattern.emoji}</p>
                  
                  <div className="flex gap-2 justify-center flex-wrap">
                    {currentPattern.beats.map((beat, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full transition-all ${
                          currentBeat === i
                            ? beat === 1
                              ? "bg-green-500 scale-125 shadow-lg shadow-green-500/30"
                              : "bg-gray-600"
                            : isBoxDarkMode ? 'bg-white/10' : 'bg-sky-100'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {playing && (
                    <p className={`text-sm animate-pulse ${isBoxDarkMode ? 'text-sky-400' : 'text-sky-600'}`}>
                      Playing pattern...
                    </p>
                  )}
                </div>
              )}

              {/* Reproduce Phase */}
              {gameState === 'playing' && phase === "reproduce" && currentPattern && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <span className={`text-sm font-bold ${isBoxDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      Reproduce the pattern
                    </span>
                  </div>
                  
                  <div className="flex gap-2 justify-center flex-wrap mb-4">
                    {currentPattern.beats.map((_, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full transition-all ${
                          i < userPattern.length
                            ? userPattern[i] === 1
                              ? "bg-green-500"
                              : "bg-gray-600"
                            : isBoxDarkMode ? 'bg-white/10' : 'bg-sky-100'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => handleBeatClick(true)}
                      className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition"
                    >
                      Tap 🔊
                    </button>
                    <button
                      onClick={() => handleBeatClick(false)}
                      className="px-6 py-3 bg-gray-500 text-white font-bold rounded-xl hover:bg-gray-600 transition"
                    >
                      Rest ⏸
                    </button>
                  </div>
                  
                  <div className="flex gap-2 justify-center mt-4">
                    <button 
                      onClick={resetPattern}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        isBoxDarkMode ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset
                    </button>
                    <button 
                      onClick={replayPattern}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        isBoxDarkMode ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5" />
                      Replay
                    </button>
                  </div>
                  
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {userPattern.length} / {currentPattern.beats.length}
                  </p>
                </div>
              )}

              {/* Result Phase */}
              {gameState === 'playing' && phase === "result" && currentPattern && (
                <div className="space-y-4">
                  <div className="text-5xl">{currentPattern.emoji}</div>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {currentPattern.beats.map((beat, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full ${
                          beat === 1 ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40" style={{ background: isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(240,249,255,0.95)' }}>
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
                  <ResultCard label="Rounds" value={roundsCompleted} icon={<Music className="w-4 h-4" />} color="text-green-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Max Length" value={patternLength} icon={<Brain className="w-4 h-4" />} color="text-cyan-500" isDark={isBoxDarkMode} />
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
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Listen to the <span className="font-semibold text-sky-500">audio pattern</span> carefully
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Correct pattern = <span className="font-semibold text-green-500">+2 points</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Wrong pattern = <span className="font-semibold text-red-500">-2 point penalty</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">30 unique patterns</span> • Never repeats in session
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Pattern length: <span className="font-semibold text-purple-500">8→10→12</span> beats
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
                  <span>🔊 Tap/rest buttons • Reset and replay available</span>
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