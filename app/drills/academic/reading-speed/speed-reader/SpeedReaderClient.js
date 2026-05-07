'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  Zap, RotateCcw, 
  Sun, Moon, Volume2, VolumeX,
  Eye, Maximize2, Minimize2,
  ArrowLeft, FileText, Target, Timer, Trophy,
  Columns, RefreshCw, ChevronUp, ChevronDown, Gauge,
  BarChart3, Info, CheckCircle2
} from 'lucide-react';

export default function SpeedReaderClient() {
  const [gameState, setGameState] = useState('start');
  const [wpm, setWpm] = useState(400);
  const [activeColumn, setActiveColumn] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [columnWidth, setColumnWidth] = useState(280);
  
  // 60 second timer
  const [timeLeft, setTimeLeft] = useState(60);
  
  // Multiple columns of text - 10 different passages
  const textColumns = useMemo(() => [
    "Speed reading transforms how we process written information by eliminating subvocalization and expanding visual span. The brain can recognize words as complete visual units rather than sequential letters.",
    "Neuroplasticity enables the brain to form new neural pathways through dedicated practice. Reading at accelerated speeds strengthens connections between visual cortex and language centers.",
    "Peripheral vision captures information beyond the focal point. Training this ability allows readers to process multiple words simultaneously, dramatically increasing reading efficiency.",
    "Research shows the average reader processes 200-300 words per minute. With proper training, speeds exceeding 1000 WPM are achievable while maintaining comprehension.",
    "Columnar reading reduces horizontal eye movements by presenting text in narrow vertical blocks. This technique minimizes saccadic jumps and reduces reading fatigue.",
    "The human brain processes images 60,000 times faster than text. By treating words as visual symbols, speed readers bypass phonological processing limitations.",
    "Cognitive load theory explains why traditional reading is inefficient. Working memory becomes bottlenecked by subvocalization, limiting information intake to speaking speed.",
    "Professional speed readers use meta-guiding techniques to pace their eyes. Visual guides help maintain consistent reading rhythm and prevent regression.",
    "Comprehension and speed are not mutually exclusive. Advanced readers develop layered processing where main ideas are extracted rapidly while details are noted.",
    "Regular practice with RSVP technology produces lasting neuroplastic changes. The visual word form area becomes more efficient at rapid lexical processing."
  ], []);
  
  // Pick 10 random columns on each refresh
  const getRandomColumns = useCallback(() => {
    const shuffled = [...textColumns].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [textColumns]);
  
  const [columns, setColumns] = useState([]);
  
  // Metrics
  const [wordsRead, setWordsRead] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  
  // UI State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);

  const timerRef = useRef(null);
  const streamTimerRef = useRef(null);
  const containerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  
  // Use refs to avoid dependency issues
  const wpmRef = useRef(wpm);
  const columnsRef = useRef(columns);
  const activeColumnRef = useRef(activeColumn);
  const wordsReadRef = useRef(wordsRead);
  const timeLeftRef = useRef(timeLeft);
  const isPlayingRef = useRef(isPlaying);
  const gameStateRef = useRef(gameState);

  // Initialize columns on client
  useEffect(() => {
    setIsClient(true);
    setColumns(getRandomColumns());
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [getRandomColumns]);

  // Sync refs with state
  useEffect(() => { wpmRef.current = wpm; }, [wpm]);
  useEffect(() => { columnsRef.current = columns; }, [columns]);
  useEffect(() => { activeColumnRef.current = activeColumn; }, [activeColumn]);
  useEffect(() => { wordsReadRef.current = wordsRead; }, [wordsRead]);
  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // Calculate total words and effective WPM
  const totalWords = useMemo(() => {
    return columns.reduce((sum, col) => {
      return sum + col.split(/\s+/).filter(w => w.length > 0).length;
    }, 0);
  }, [columns]);

  const effectiveWPM = useMemo(() => 
    timeLeft < 60 && wordsRead > 0 
      ? Math.round((wordsRead / (60 - timeLeft)) * 60) 
      : 0,
    [timeLeft, wordsRead]
  );

  const progress = useMemo(() => 
    columns.length > 0 ? Math.round((activeColumn / columns.length) * 100) : 0,
    [columns.length, activeColumn]
  );
  
  const columnsCompleted = activeColumn;

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('columnScannerDrillBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && effectiveWPM > bestScore) {
      setBestScore(effectiveWPM);
      try {
        localStorage.setItem('columnScannerDrillBestScore', effectiveWPM.toString());
      } catch (e) { /* localStorage not available */ }
    }
  }, [gameState, effectiveWPM, bestScore]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Toggle fullscreen
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

  // Play sound effect
  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      if (!audioCtx) return;
      
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      const now = audioCtx.currentTime;
      
      if (type === 'start') {
        oscillator.frequency.setValueAtTime(660, now);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
      } else if (type === 'complete') {
        oscillator.frequency.setValueAtTime(880, now);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        oscillator.start(now);
        oscillator.stop(now + 0.15);
      }
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  // Refresh columns
  const refreshColumns = useCallback(() => {
    const newColumns = getRandomColumns();
    setColumns(newColumns);
    columnsRef.current = newColumns;
    const newTotal = newColumns.reduce((sum, col) => sum + col.split(/\s+/).filter(w => w.length > 0).length, 0);
    showFeedback(`New columns loaded • ${newTotal} total words`, 'success');
  }, [getRandomColumns, showFeedback]);

  const startDrill = useCallback(() => {
    if (columns.length === 0) return;
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setIsPlaying(true);
    isPlayingRef.current = true;
    setActiveColumn(0);
    activeColumnRef.current = 0;
    setTimeLeft(60);
    timeLeftRef.current = 60;
    setWordsRead(0);
    wordsReadRef.current = 0;
    playSound('start');
    showFeedback(`60s challenge started • Target: ${wpm} WPM`, 'success');
  }, [columns.length, wpm, playSound, showFeedback]);

  const resetGame = useCallback(() => {
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    setIsPlaying(false);
    isPlayingRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setActiveColumn(0);
    activeColumnRef.current = 0;
    setTimeLeft(60);
    timeLeftRef.current = 60;
    setWordsRead(0);
    wordsReadRef.current = 0;
    setFeedback('');
    
    // Generate new columns on reset
    const newColumns = getRandomColumns();
    setColumns(newColumns);
    columnsRef.current = newColumns;
  }, [getRandomColumns]);

  const handleWpmUp = useCallback(() => setWpm(w => Math.min(800, w + 25)), []);
  const handleWpmDown = useCallback(() => setWpm(w => Math.max(100, w - 25)), []);
  const handleWidthUp = useCallback(() => setColumnWidth(w => Math.min(500, w + 20)), []);
  const handleWidthDown = useCallback(() => setColumnWidth(w => Math.max(200, w - 20)), []);

  // Column reading effect
  useEffect(() => {
    const runColumnStream = () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
      
      if (!isPlayingRef.current || gameStateRef.current !== 'playing') return;
      
      const currentColumn = activeColumnRef.current;
      const cols = columnsRef.current;
      
      if (currentColumn >= cols.length) return;
      
      const currentText = cols[currentColumn];
      const wordCount = currentText?.split(/\s+/).length || 8;
      const msPerColumn = (wordCount / (wpmRef.current / 60)) * 1000;
      
      streamTimerRef.current = setInterval(() => {
        const nextIndex = activeColumnRef.current + 1;
        const colsLength = columnsRef.current.length;
        
        // Count words from current column
        if (activeColumnRef.current < colsLength) {
          const words = columnsRef.current[activeColumnRef.current].split(/\s+/).filter(w => w.length > 0).length;
          const newWordsRead = wordsReadRef.current + words;
          wordsReadRef.current = newWordsRead;
          setWordsRead(newWordsRead);
        }
        
        if (nextIndex >= colsLength) {
          clearInterval(streamTimerRef.current);
          if (timerRef.current) clearInterval(timerRef.current);
          setIsPlaying(false);
          isPlayingRef.current = false;
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          playSound('complete');
          return;
        }
        
        activeColumnRef.current = nextIndex;
        setActiveColumn(nextIndex);
        
        runColumnStream();
      }, msPerColumn);
    };
    
    if (isPlaying && gameState === 'playing') {
      runColumnStream();
    }
    
    return () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    };
  }, [isPlaying, gameState, playSound]);

  // Timer effect - 60 second countdown
  useEffect(() => {
    if (isPlaying && gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          timeLeftRef.current = newTime;
          
          if (newTime <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            if (streamTimerRef.current) clearInterval(streamTimerRef.current);
            setIsPlaying(false);
            isPlayingRef.current = false;
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            playSound('complete');
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, gameState, timeLeft, playSound]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading column scanner drill...</p>
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
            "name": "60s Column Scanner - Speed Reading Drill",
            "url": "https://skilldrills.online/drills/academic/reading-speed/speed-reader",
            "description": "Columnar speed reading drill with 10 rotating text columns. Adjustable 100-800 WPM speed and 200-500px column width. Trains peripheral vision, reduces eye movements, and improves reading stamina in a 60-second challenge.",
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
            "educationalUse": ["Speed Reading", "Columnar Reading", "Peripheral Vision", "Reading Stamina"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Columnar Reading", "Peripheral Vision", "Speed Reading", "Visual Processing"]
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
              <Link href="/drills/academic" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Academic Drills
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Reading Speed
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} aria-current="page">
              60s Column Scanner
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex-shrink-0">
              <Columns className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                60s Column Scanner
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                10 rotating columns • 60 second challenge • Adjustable speed & width
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            <button 
              onClick={resetGame} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`}
              title="Reset session"
              aria-label="Reset column scanner"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
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
          <h2>60s Column Scanner - Columnar Speed Reading Training</h2>
          <p>
            Train columnar reading with 10 rotating text columns covering speed reading techniques,
            neuroplasticity, peripheral vision, cognitive load theory, and meta-guiding.
            Adjustable 100-800 WPM speed and 200-500px column width.
            Columns rotate automatically in a 60-second timed challenge.
            Trains peripheral vision, reduces horizontal eye movements (saccadic jumps),
            and improves reading stamina by eliminating subvocalization.
            Click &quot;New Columns&quot; to refresh with randomized content order.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Zap className="text-emerald-600" />} value={effectiveWPM} label="Effective WPM" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best WPM" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Gauge className="text-blue-600" />} value={wpm} label="Target WPM" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle2 className="text-purple-600" />} value={`${columnsCompleted}/${columns.length}`} label="Columns" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-orange-600" />} value={progress} label="Progress" unit="%" isDark={isDarkMode} />
          <StatCard icon={<FileText className="text-cyan-600" />} value={`${wordsRead}/${totalWords}`} label="Words" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${
              feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${feedbackType === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedback || '\u00A0'}
          </div>
        </div>

        {/* Controls */}
        {gameState === 'start' && (
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <div className={`flex items-center gap-3 p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>WPM:</span>
              <button onClick={handleWpmDown} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition" aria-label="Decrease WPM">
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className={`text-lg font-bold min-w-[60px] text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{wpm}</span>
              <button onClick={handleWpmUp} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition" aria-label="Increase WPM">
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
            
            <div className={`flex items-center gap-3 p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Width:</span>
              <button onClick={handleWidthDown} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition" aria-label="Decrease column width">
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className={`text-lg font-bold min-w-[60px] text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{columnWidth}px</span>
              <button onClick={handleWidthUp} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition" aria-label="Increase column width">
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={refreshColumns}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold transition ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                  : 'bg-white border border-gray-200 hover:bg-gray-100 text-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
              aria-label={`Load new columns. Currently ${totalWords} total words`}
            >
              <RefreshCw className="w-4 h-4" />
              New Columns ({totalWords} words)
            </button>
          </div>
        )}

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#0a0a0a" : "#ffffff",
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {/* Fullscreen Controls */}
          {isFullscreen && gameState !== 'start' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
                aria-label="Reset column scanner"
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
                    <Columns className="w-16 h-16 text-emerald-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    60s Column Scanner
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {columns.length} columns • Target: {wpm} WPM • Width: {columnWidth}px
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Columns rotate automatically. Keep eyes centered and let text flow. Trains peripheral vision and reading stamina.
                  </p>
                  <button 
                    onClick={startDrill}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    aria-label="Start column scanner drill"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && (
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <div 
                  className="text-center transition-all duration-300"
                  style={{ width: `${columnWidth}px` }}
                >
                  <div className={`text-lg sm:text-xl md:text-2xl font-bold leading-relaxed ${
                    isBoxDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    {columns[activeColumn]}
                  </div>
                </div>
              </div>
            )}

            {/* ============ GAME OVER SCREEN ============ */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                    <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Drill Complete!
                    </h2>
                  </div>
                  
                  <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Regular columnar reading practice improves peripheral vision and reading speed.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Effective WPM" value={effectiveWPM} icon={<Zap className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Best WPM" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Target WPM" value={wpm} icon={<Gauge className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                    <ResultCard label="Columns Read" value={`${columnsCompleted}/${columns.length}`} icon={<Columns className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Words Read" value={wordsRead} icon={<FileText className="w-4 h-4" />} color="green" isDark={isBoxDarkMode} />
                    <ResultCard label="Progress" value={`${progress}%`} icon={<BarChart3 className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How Column Scanner Works</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Keep eyes <span className="font-semibold text-emerald-500">centered</span> - let text come to you</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>10 columns rotate <span className="font-semibold text-green-500">automatically</span> at set WPM</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Adjust <span className="font-semibold text-blue-500">WPM (100-800)</span> and width (200-500px)</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click <span className="font-semibold text-purple-500">&quot;New Columns&quot;</span> to refresh content order</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Trains <span className="font-semibold text-orange-500">peripheral vision</span> and reading stamina</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60 second <span className="font-semibold text-yellow-500">timed challenge</span> • Best WPM saves locally</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>📖 10 unique speed reading passages • Randomized each session</span>
                  <span>🏆 Best WPM saves locally</span>
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
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
  };
  
  const colors = colorMap[color] || colorMap.emerald;
  
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