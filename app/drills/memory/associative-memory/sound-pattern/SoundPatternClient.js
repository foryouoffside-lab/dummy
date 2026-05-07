'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, Trophy, Info, Timer, Music, RefreshCw, Play, RotateCcw
} from 'lucide-react';

const ALL_PATTERNS = [
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

export default function SoundPatternClient() {
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
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [patternLength, setPatternLength] = useState(8);
  const [isClient, setIsClient] = useState(false);

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
      const savedBestScore = localStorage.getItem('soundPatternBestScore');
      const savedBestStreak = localStorage.getItem('soundPatternBestStreak');
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
      const currentBest = parseInt(localStorage.getItem('soundPatternBestScore') || '0', 10);
      if (finalScore > currentBest) {
        localStorage.setItem('soundPatternBestScore', finalScore.toString());
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

  const clearPlayback = useCallback(() => {
    playbackTimeoutsRef.current.forEach(id => clearTimeout(id));
    playbackTimeoutsRef.current = [];
  }, []);

  const playBeep = useCallback((duration = 0.3, frequency = 440) => {
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
      const now = audioCtxRef.current.currentTime;
      oscillator.frequency.setValueAtTime(frequency, now);
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
      oscillator.start(now);
      oscillator.stop(now + duration);
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

  // 60 second game timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            gameActiveRef.current = false;
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

  const getAvailablePattern = useCallback((length) => {
    const available = ALL_PATTERNS.filter((_, i) => !usedPatternsRef.current.has(i));
    if (available.length < 1) {
      usedPatternsRef.current.clear();
      return ALL_PATTERNS[Math.floor(Math.random() * ALL_PATTERNS.length)];
    }
    const matching = available.filter(p => p.beats.length === length);
    const pool = matching.length > 0 ? matching : available;
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  const startReproduce = useCallback(() => {
    setPhase("reproduce");
    phaseRef.current = "reproduce";
    setIsProcessing(false);
  }, []);

  const playPattern = useCallback((pattern) => {
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
    
    const endTime = pattern.beats.length * 500 + 800;
    const endId = setTimeout(() => {
      setPlaying(false);
      setCurrentBeat(-1);
      startReproduce();
    }, endTime);
    timeouts.push(endId);
    
    playbackTimeoutsRef.current = timeouts;
  }, [clearPlayback, playBeep, startReproduce]);

  const startRound = useCallback(() => {
    const length = patternLengthRef.current;
    const pattern = getAvailablePattern(length);
    const idx = ALL_PATTERNS.indexOf(pattern);
    if (idx !== -1) usedPatternsRef.current.add(idx);
    
    correctPatternRef.current = pattern;
    setCurrentPattern(pattern);
    setUserPattern([]);
    setIsProcessing(false);
    setPhase("listening");
    phaseRef.current = "listening";
    
    setTimeout(() => {
      playPattern(pattern);
    }, 300);
  }, [getAvailablePattern, playPattern]);

  const startGame = useCallback(() => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    gameActiveRef.current = true;
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setAccuracy(100);
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
  }, [startRound, showFeedback]);

  const handleBeatClick = useCallback((beat) => {
    if (phaseRef.current !== "reproduce" || isProcessing) return;
    
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
          try {
            localStorage.setItem('soundPatternBestStreak', streakRef.current.toString());
          } catch (e) { /* localStorage not available */ }
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
      
      setPhase("result");
      phaseRef.current = "result";
      
      setTimeout(() => {
        if (gameActiveRef.current) {
          startRound();
        }
      }, 600);
    }
  }, [userPattern, isProcessing, totalAttempts, totalCorrect, bestStreak, playBeep, showFeedback, startRound]);

  const resetPattern = useCallback(() => {
    setUserPattern([]);
  }, []);

  const replayPattern = useCallback(() => {
    if (correctPatternRef.current && gameActiveRef.current) {
      setUserPattern([]);
      setPhase("listening");
      phaseRef.current = "listening";
      setTimeout(() => {
        playPattern(correctPatternRef.current);
      }, 200);
    }
  }, [playPattern]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    gameActiveRef.current = false;
    clearPlayback();
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    
    setGameState('start');
    gameStateRef.current = 'start';
    setPhase('ready');
    phaseRef.current = 'ready';
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setAccuracy(100);
    setPatternLength(8);
    patternLengthRef.current = 8;
    usedPatternsRef.current = new Set();
    setUserPattern([]);
    setFeedback('');
    setFeedbackType('');
  }, [clearPlayback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      gameActiveRef.current = false;
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      clearPlayback();
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, [clearPlayback]);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sound pattern drill...</p>
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
            "name": "Sound Pattern Drill",
            "url": "https://skilldrills.online/drills/memory/associative-memory/sound-pattern",
            "description": "Train auditory memory by listening to and reproducing rhythmic beat patterns. 30 unique patterns with adaptive difficulty (8, 10, 12 beats). Tap and rest buttons for pattern reproduction with replay option.",
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
            "educationalUse": ["Auditory Memory", "Rhythm Training", "Pattern Recognition", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Auditory Memory", "Rhythm Recall", "Pattern Reproduction", "Sound Sequence Memory"]
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
            <li className={`font-medium ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`} aria-current="page">
              Sound Pattern
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl flex-shrink-0">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Sound Pattern
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Auditory memory • +2 correct / -2 wrong • Adaptive patterns • 60s
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
          <h2>Sound Pattern - Auditory Memory & Rhythm Recall Training</h2>
          <p>
            Train your auditory memory by listening to and reproducing rhythmic beat patterns.
            30 unique patterns across 3 difficulty levels: 8-beat (simple), 10-beat (medium), and 12-beat (complex).
            Each pattern is played as audio beeps with visual indicators. Then reproduce the pattern using Tap and Rest buttons.
            +2 points for perfect reproduction, -2 for incorrect. Pattern length increases with consecutive perfect scores.
            Reset and replay buttons available during reproduction. 60-second timed challenge.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<Music className="text-cyan-600" />} value={patternLength} label="Length" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? "#0a0a1a" : "#f0f9ff",
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
                      <Music className="w-16 h-16 text-sky-500 mx-auto" aria-hidden="true" />
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Sound Pattern
                    </h2>
                    <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      60-second challenge • 30 unique patterns • Adaptive difficulty
                    </p>
                    <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Listen to rhythmic patterns then reproduce them with tap/rest buttons. Patterns grow longer with perfect scores.
                    </p>
                    <button 
                      onClick={startGame} 
                      className="px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                      aria-label="Start sound pattern drill"
                    >
                      Start Training
                    </button>
                  </div>
                </div>
              )}

              {/* ============ LISTENING PHASE ============ */}
              {gameState === 'playing' && phase === "listening" && currentPattern && (
                <div className="space-y-6">
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${isBoxDarkMode ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-600'}`}>
                    Listening...
                  </span>
                  
                  <p className="text-6xl" role="img" aria-label={currentPattern.name}>{currentPattern.emoji}</p>
                  
                  <div className="flex gap-2 justify-center flex-wrap" aria-label={`Pattern visualization: ${currentPattern.beats.length} beats`}>
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
                        aria-hidden="true"
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

              {/* ============ REPRODUCE PHASE ============ */}
              {gameState === 'playing' && phase === "reproduce" && currentPattern && (
                <div className="space-y-5">
                  <div className="text-center mb-4">
                    <span className={`text-sm font-bold ${isBoxDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      Reproduce the pattern
                    </span>
                  </div>
                  
                  <div className="flex gap-2 justify-center flex-wrap mb-4" aria-label={`Your pattern: ${userPattern.length} of ${currentPattern.beats.length} beats`}>
                    {currentPattern.beats.map((_, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full transition-all ${
                          i < userPattern.length
                            ? userPattern[i] === 1
                              ? "bg-green-500 shadow-lg shadow-green-500/20"
                              : "bg-gray-600"
                            : isBoxDarkMode ? 'bg-white/10 border border-white/10' : 'bg-sky-100 border border-sky-200'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => handleBeatClick(true)}
                      disabled={isProcessing}
                      className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      aria-label="Tap beat"
                    >
                      Tap 🔊
                    </button>
                    <button
                      onClick={() => handleBeatClick(false)}
                      disabled={isProcessing}
                      className="px-6 py-3 bg-gray-500 text-white font-bold rounded-xl hover:bg-gray-600 transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      aria-label="Rest (no beat)"
                    >
                      Rest ⏸
                    </button>
                  </div>
                  
                  <div className="flex gap-2 justify-center mt-4">
                    <button 
                      onClick={resetPattern}
                      disabled={isProcessing}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-50 ${
                        isBoxDarkMode ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-red-100 text-red-600 hover:bg-red-200'
                      } focus:outline-none focus:ring-2 focus:ring-red-500`}
                      aria-label="Reset your pattern"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset
                    </button>
                    <button 
                      onClick={replayPattern}
                      disabled={isProcessing}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-50 ${
                        isBoxDarkMode ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      aria-label="Replay the pattern"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Replay
                    </button>
                  </div>
                  
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {userPattern.length} / {currentPattern.beats.length} beats
                  </p>
                </div>
              )}

              {/* ============ RESULT PHASE ============ */}
              {gameState === 'playing' && phase === "result" && currentPattern && (
                <div className="space-y-4">
                  <div className="text-5xl" role="img" aria-label={currentPattern.name}>{currentPattern.emoji}</div>
                  <div className="flex gap-2 justify-center flex-wrap" aria-label="Correct pattern">
                    {currentPattern.beats.map((beat, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full ${
                          beat === 1 ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ============ GAME OVER SCREEN ============ */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40" style={{ background: isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(240,249,255,0.95)' }}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Time&apos;s Up!
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Keep practicing to strengthen your auditory memory and pattern recall.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Rounds" value={roundsCompleted} icon={<Music className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  <ResultCard label="Max Length" value={patternLength} icon={<Brain className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/memory" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back to Drills
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Listen to the <span className="font-semibold text-sky-500">audio pattern</span> carefully
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Perfect match = <span className="font-semibold text-green-500">+2 points</span> | Wrong = -2
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Use <span className="font-semibold text-red-500">Tap/Rest buttons</span> to reproduce
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">30 unique patterns</span> • Never repeats in session
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Pattern length: <span className="font-semibold text-purple-500">8 → 10 → 12</span> beats
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Reset & replay <span className="font-semibold text-yellow-500">available during reproduction</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🔊 Tap/Rest buttons • Reset and replay available • Beeps for feedback</span>
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