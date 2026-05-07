'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, CheckCircle, Activity, RotateCcw, Clock, Compass, RefreshCw
} from 'lucide-react';

export default function SymbolMatchingClient() {
  const containerRef = useRef(null);
  
  // Professional Symbol Set - Greek letters (using ref to avoid re-renders)
  const SYMBOLS = useRef(['Δ', 'Φ', 'Ω', 'Σ', 'Ξ', 'Π', 'Ψ', 'Γ', 'Θ']);
  
  // Drill State
  const [keyMap, setKeyMap] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [gameState, setGameState] = useState('start');
  
  // Performance Metrics
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(75);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [bestReactionTime, setBestReactionTime] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [lives, setLives] = useState(3);
  
  // UI State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastFeedback, setLastFeedback] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  const startTimeRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const livesRef = useRef(3);
  const gameStateRef = useRef('start');
  const soundEnabledRef = useRef(true);
  const clickCooldownRef = useRef(false);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('symbolMatchingDrillBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Sync gameState to ref
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Sync soundEnabled to ref
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('symbolMatchingDrillBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioContextRef.current) {
        try { audioContextRef.current.close(); } catch (e) { /* ignore */ }
      }
    };
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, []);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 600);
  }, []);

  const initAudio = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      return audioContextRef.current;
    } catch (e) { return null; }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabledRef.current) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      const now = ctx.currentTime;
      const freqMap = { correct: 880, wrong: 440, penalty: 220, combo: 1046.5 };
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      g.gain.setValueAtTime(type === 'combo' ? 0.12 : type === 'penalty' ? 0.15 : 0.1, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now); osc.stop(now + 0.15);
    } catch (e) { /* Audio not supported */ }
  }, [initAudio]);

  const getAccuracy = useCallback(() => {
    const total = correctCount + wrongCount;
    if (total === 0) return 100;
    return Math.round((correctCount / total) * 100);
  }, [correctCount, wrongCount]);

  // Timer Logic
  useEffect(() => {
    if (gameState !== 'playing') return;
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [gameState]);

  const generateKeyMap = useCallback(() => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
    const newMap = SYMBOLS.current.map((symbol, i) => ({ symbol, number: numbers[i] }));
    setKeyMap(newMap);
    return newMap;
  }, []);

  const nextTarget = useCallback((currentMap) => {
    const map = currentMap || keyMap;
    if (map.length === 0) return;
    const randomEntry = map[Math.floor(Math.random() * map.length)];
    setCurrentTarget(randomEntry);
    startTimeRef.current = Date.now();
  }, [keyMap]);

  const handleMiss = useCallback(() => {
    setWrongCount(prev => prev + 1);
    comboRef.current = 0;
    setCombo(0);
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('wrong');
      showFeedback('❌ WRONG! -1 life', 'error');
    }
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      playSound('penalty');
      showFeedback('❌ WRONG! -1 point', 'error');
    }
  }, [playSound, showFeedback]);

  const handleInput = useCallback((num) => {
    if (gameStateRef.current !== 'playing' || !currentTarget) return;
    if (clickCooldownRef.current) return;
    clickCooldownRef.current = true;
    
    const rt = Date.now() - startTimeRef.current;
    setTotalAttempts(prev => prev + 1);

    if (num === currentTarget.number) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      setCorrectCount(prev => prev + 1);
      setReactionTimes(prev => [...prev, rt]);
      if (bestReactionTime === 0 || rt < bestReactionTime) setBestReactionTime(rt);
      comboRef.current++;
      setCombo(comboRef.current);
      if (comboRef.current > bestCombo) setBestCombo(comboRef.current);
      setLastFeedback('correct');
      if (comboRef.current % 5 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo! +1 (${rt}ms)`, 'success');
      } else {
        playSound('correct');
        showFeedback(`✓ +1 (${rt}ms)`, 'success');
      }
      const newMap = generateKeyMap();
      nextTarget(newMap);
    } else {
      handleMiss();
      setLastFeedback('wrong');
      const newMap = generateKeyMap();
      nextTarget(newMap);
    }
    setTimeout(() => {
      setLastFeedback(null);
      clickCooldownRef.current = false;
    }, 300);
  }, [currentTarget, bestReactionTime, bestCombo, generateKeyMap, nextTarget, playSound, showFeedback, handleMiss]);

  // Physical Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 9) {
        handleInput(num);
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput]);

  const startDrill = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    const map = generateKeyMap();
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setTimeLeft(75);
    setTotalAttempts(0);
    setCorrectCount(0);
    setWrongCount(0);
    setReactionTimes([]);
    setBestReactionTime(0);
    setCombo(0);
    setBestCombo(0);
    setLives(3);
    setLastFeedback(null);
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 3;
    clickCooldownRef.current = false;
    
    nextTarget(map);
  }, [generateKeyMap, nextTarget]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setFeedback('');
    setFeedbackType('');
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading symbol matching drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Symbol Matching Drill", "url": "https://skilldrills.online/drills/cognitive/processing-speed/symbol-matching", "description": "Cognitive flexibility training: match Greek symbols to numbers with keys that change after every answer. 75-second challenge with reaction time tracking, 3 lives, and keyboard shortcuts.", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "author": { "@type": "Organization", "name": "Global Drill System" }, "educationalUse": ["Cognitive Flexibility", "Processing Speed", "Symbol Recognition", "Cognitive Training"], "learningResourceType": "Interactive Exercise", "timeRequired": "PT75S", "interactivityType": "active", "inLanguage": "en-US", "teaches": ["Cognitive Flexibility", "Symbol-Number Association", "Processing Speed", "Visual Discrimination"] }) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li><Link href="/drills/cognitive" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Cognitive Drills</Link></li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Processing Speed</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} aria-current="page">Symbol Matching</li>
          </ol>
        </nav>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex-shrink-0">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Symbol Matching</h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keys change every answer • 75-second challenge • 3 lives</p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset session" aria-label="Reset symbol matching drill">
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={isDarkMode ? 'Light mode' : 'Dark mode'}>
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle drill area theme" title="Toggle drill area theme">
              <Eye className="w-5 h-5" />
            </button>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'} title={soundEnabled ? 'Mute' : 'Unmute'}>
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Symbol Matching - Cognitive Flexibility Training</h2>
          <p>Train cognitive flexibility by matching Greek symbols (Δ, Φ, Ω, Σ, Ξ, Π, Ψ, Γ, Θ) to numbers 1-9. The reference key changes after every answer, forcing constant cognitive switching. 75-second timed challenge with 3 lives, reaction time tracking in milliseconds, combo streaks, and keyboard support (press 1-9 keys).</p>
        </section>
        <div className="grid grid-cols-8 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Clock className={timeLeft < 20 ? 'text-red-600' : 'text-green-600'} />} value={`${timeLeft}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle className="text-emerald-600" />} value={correctCount} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-cyan-600" />} value={bestReactionTime || '-'} label="Best RT" unit="ms" isDark={isDarkMode} />
          <StatCard icon={<Heart className="text-red-500" />} value={lives} label="Lives" isDark={isDarkMode} />
        </div>
        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'}`} role="status" aria-live="polite" aria-atomic="true">
            {feedback || '\u00A0'}
          </div>
        </div>
        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50 overflow-auto' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset session" aria-label="Reset symbol matching drill"><RefreshCw className="w-5 h-5" /></button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle drill area theme"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}
          <div className="p-4 sm:p-6 md:p-8">
            <div className={`p-4 md:p-6 rounded-2xl mb-6 border-2 transition-all ${isBoxDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-violet-50/50 border-violet-100'}`}>
              <h3 className={`text-center text-xs font-bold uppercase tracking-wider mb-4 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Reference Key (Changes Every Answer)</h3>
              <div className="grid grid-cols-9 gap-1.5 sm:gap-2 md:gap-3">
                {keyMap.length > 0 ? keyMap.map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-full aspect-square flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold rounded-t-xl border-b-2 transition-colors ${isBoxDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-violet-200 text-gray-900'}`}>{item.symbol}</div>
                    <div className={`w-full py-1.5 sm:py-2 flex items-center justify-center text-base sm:text-lg font-bold rounded-b-xl ${isBoxDarkMode ? 'bg-gray-700 text-violet-400' : 'bg-violet-100 text-violet-600'}`}>{item.number}</div>
                  </div>
                )) : Array(9).fill(0).map((_, i) => (
                  <div key={i} className={`aspect-square rounded-2xl animate-pulse ${isBoxDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>
            <div className={`relative min-h-[300px] sm:min-h-[400px] rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col items-center transition-all ${isBoxDarkMode ? 'bg-gray-900/30' : 'bg-white'}`}>
              {gameState === 'start' && (
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-3xl z-40">
                  <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="mb-4"><Compass className="w-16 h-16 text-violet-500 mx-auto" aria-hidden="true" /></div>
                    <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Symbol Matching</h2>
                    <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>75-second challenge • +1 per correct • 3 lives</p>
                    <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Match Greek symbols to numbers. Reference key changes after every answer. Use keyboard (1-9) for fastest response.</p>
                    <button onClick={startDrill} className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2" aria-label="Start symbol matching challenge">Start Challenge</button>
                  </div>
                </div>
              )}
              {gameState === 'playing' && currentTarget && (
                <>
                  <div className="text-center w-full"><div className={`text-xs font-bold uppercase tracking-widest mb-2 ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Active Target</div></div>
                  <div className="flex-1 flex items-center justify-center w-full min-h-[120px] sm:min-h-[150px]">
                    <div className={`text-5xl sm:text-[7rem] md:text-[8rem] font-bold leading-none transition-all ${lastFeedback === 'wrong' ? 'text-red-500' : isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>{currentTarget.symbol}</div>
                  </div>
                  <div className="w-full mt-4 sm:mt-6">
                    <div className="grid grid-cols-3 md:grid-cols-9 gap-2 max-w-2xl mx-auto">
                      {[1,2,3,4,5,6,7,8,9].map(n => (
                        <button key={n} onClick={() => handleInput(n)} className={`h-10 sm:h-12 md:h-14 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center border-2 transition-all hover:scale-105 active:scale-95 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700 text-white hover:border-violet-500 hover:bg-gray-700' : 'bg-gray-50 border-gray-200 text-gray-900 hover:border-violet-500 hover:bg-white hover:shadow-lg'} focus:outline-none focus:ring-2 focus:ring-violet-500`} aria-label={`Press ${n}`}>{n}</button>
                      ))}
                    </div>
                    <div className="max-w-xs mx-auto mt-4 sm:mt-6">
                      <div className={`h-1.5 rounded-full overflow-hidden ${isBoxDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                        <div className={`h-full transition-all duration-1000 ${timeLeft < 20 ? 'bg-gradient-to-r from-red-500 to-orange-600' : 'bg-gradient-to-r from-violet-500 to-purple-600'}`} style={{ width: `${(timeLeft / 75) * 100}%` }} role="progressbar" aria-valuenow={timeLeft} aria-valuemin={0} aria-valuemax={75} aria-label={`${timeLeft} seconds remaining`} />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {gameState === 'gameOver' && (
                <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-3xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                  <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                      <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time&apos;s Up!</h2>
                    </div>
                    <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keep practicing to improve your cognitive flexibility and symbol processing speed.</p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                      <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                      <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                      <ResultCard label="Correct" value={correctCount} icon={<CheckCircle className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                      <ResultCard label="Best Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                      <ResultCard label="Best Reaction" value={`${bestReactionTime || 0}ms`} icon={<Activity className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                    </div>
                    <div className="flex gap-3">
                      <Link href="/drills/cognitive" className="flex-1">
                        <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Drills</span>
                      </Link>
                      <button onClick={startDrill} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
                        <RotateCcw className="w-4 h-4 inline mr-2" /> Play Again
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {!isFullscreen && (
          <footer className="mt-6" aria-label="Drill rules and scoring information">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Reference key <span className="font-semibold text-violet-500">changes after every answer</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct match: <span className="font-semibold text-green-500">+1 point</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong match: <span className="font-semibold text-red-500">-1 life</span> • 3 lives total</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>At 0 lives: <span className="font-semibold text-orange-500">-1 point penalty</span> per mistake</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Keyboard: <span className="font-semibold text-blue-500">Press 1-9</span> for fastest response</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>9 Greek symbols • <span className="font-semibold text-yellow-500">75-second challenge</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>⌨️ Δ Φ Ω Σ Ξ Π Ψ Γ Θ • Keys re-randomize every answer</span>
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
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' }
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