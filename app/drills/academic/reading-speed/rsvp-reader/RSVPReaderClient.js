'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  Zap, RotateCcw, 
  Sun, Moon, Volume2, VolumeX,
  Play, Pause, Eye, Maximize2, Minimize2,
  ArrowLeft, FileText, Target, Timer, Trophy,
  BarChart3, Info, BookOpen, ChevronUp, ChevronDown, RefreshCw
} from 'lucide-react';

export default function RSVPReaderClient() {
  const [gameState, setGameState] = useState('start');
  const [wpm, setWpm] = useState(400);
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Default text about neuroplasticity and speed reading
  const defaultText = useMemo(() => `Neuroplasticity is the brain&apos;s remarkable ability to reorganize itself by forming new neural connections throughout life. This extraordinary process allows the neurons in the brain to compensate for injury and disease and to adjust their activities in response to new situations or to changes in their environment. The human brain contains approximately eighty-six billion neurons, each capable of forming thousands of synaptic connections with other neurons. This vast network is constantly being reshaped by our experiences, thoughts, and learning. Rapid Serial Visual Presentation represents a revolutionary approach to reading that leverages the brain&apos;s natural plasticity. Traditional reading involves saccadic eye movements where the eyes jump from word to word, fixating on each for approximately two hundred to two hundred fifty milliseconds. These constant movements create significant cognitive overhead and limit reading speed to around two hundred to three hundred words per minute for most educated adults. RSVP technology eliminates these inefficient eye movements entirely. By presenting words sequentially at a fixed focal point, RSVP allows the visual cortex to process lexical tokens at a rate significantly higher than standard reading methods permit. Research conducted at leading universities has demonstrated that with proper training, individuals can achieve reading speeds exceeding one thousand words per minute while maintaining comprehension levels comparable to traditional reading. This represents a three to four fold increase in information processing capacity. The key to RSVP&apos;s effectiveness lies in the Optimal Recognition Point theory. Each word has a specific letter position where the brain most efficiently recognizes and processes it. For most English words, this point falls slightly left of center. By aligning this ORP consistently, the brain can process words with minimal cognitive effort. Regular practice with RSVP technology has been shown to produce lasting changes in the brain&apos;s reading networks. The implications extend far beyond personal productivity. In fields requiring rapid assimilation of large volumes of text such as law, medicine, and academic research, RSVP could fundamentally transform how professionals engage with written information. Students could potentially process entire textbooks in hours rather than days. As we continue to understand the brain&apos;s remarkable capacity for change, technologies like RSVP will play an increasingly important role in human cognitive enhancement.`, []);
  
  const [inputText] = useState(defaultText);
  
  // Metrics
  const [timeElapsed, setTimeElapsed] = useState(0);
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
  const gameStateRef = useRef('start');
  const isPlayingRef = useRef(false);
  
  const words = useMemo(() => inputText.trim().split(/\s+/).filter(w => w.length > 0), [inputText]);

  // Calculate effective WPM
  const effectiveWPM = useMemo(() => 
    timeElapsed > 0 ? Math.round((wordsRead / timeElapsed) * 60) : 0,
    [timeElapsed, wordsRead]
  );

  // Sync refs
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('rsvpReaderDrillBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best score when game ends
  useEffect(() => {
    if (gameState === 'gameOver' && effectiveWPM > bestScore) {
      setBestScore(effectiveWPM);
      try {
        localStorage.setItem('rsvpReaderDrillBestScore', effectiveWPM.toString());
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

  // Calculate ORP (Optimal Recognition Point)
  const getORP = useCallback((word) => {
    if (!word) return { prefix: '', pivot: '', suffix: '' };
    const length = word.length;
    if (length <= 1) return { prefix: '', pivot: word, suffix: '' };
    if (length <= 3) return { prefix: word[0], pivot: word[1], suffix: word.slice(2) };
    const pivotIndex = Math.floor(length / 2.5);
    return {
      prefix: word.substring(0, pivotIndex),
      pivot: word.charAt(pivotIndex),
      suffix: word.substring(pivotIndex + 1)
    };
  }, []);

  const startReading = useCallback(() => {
    if (words.length === 0) return;
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setIsPlaying(true);
    isPlayingRef.current = true;
    setWordIndex(0);
    setTimeElapsed(0);
    setWordsRead(0);
    playSound('start');
    showFeedback(`Reading started at ${wpm} WPM`, 'success');
  }, [words.length, wpm, playSound, showFeedback]);

  const pauseReading = useCallback(() => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }
  }, []);

  const resumeReading = useCallback(() => {
    setIsPlaying(true);
    isPlayingRef.current = true;
  }, []);

  const resetGame = useCallback(() => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setWordIndex(0);
    setTimeElapsed(0);
    setWordsRead(0);
    setFeedback('');
    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
  }, []);

  const handleSpeedUp = useCallback(() => setWpm(w => Math.min(1000, w + 50)), []);
  const handleSpeedDown = useCallback(() => setWpm(w => Math.max(100, w - 50)), []);

  // RSVP Stream Effect
  useEffect(() => {
    if (isPlaying && gameState === 'playing' && wordIndex < words.length) {
      const currentWord = words[wordIndex];
      const msPerWord = (60 / wpm) * 1000;
      const length = currentWord?.length || 5;
      const weight = length > 8 ? 1.2 : length < 4 ? 0.9 : 1.0;
      
      streamTimerRef.current = setInterval(() => {
        setWordIndex((prev) => {
          const nextIndex = prev + 1;
          setWordsRead(nextIndex);
          
          if (nextIndex >= words.length) {
            if (streamTimerRef.current) {
              clearInterval(streamTimerRef.current);
              streamTimerRef.current = null;
            }
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            setIsPlaying(false);
            isPlayingRef.current = false;
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            playSound('complete');
            return prev;
          }
          return nextIndex;
        });
      }, msPerWord * weight);
    }
    
    return () => {
      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);
        streamTimerRef.current = null;
      }
    };
  }, [isPlaying, wpm, words, wordIndex, gameState, playSound]);

  // Timer Effect
  useEffect(() => {
    if (isPlaying && gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, gameState]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameStateRef.current === 'playing') {
        if (e.code === 'Space') {
          e.preventDefault();
          if (isPlayingRef.current) {
            pauseReading();
          } else {
            resumeReading();
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [pauseReading, resumeReading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  const { prefix, pivot, suffix } = useMemo(() => 
    getORP(words[wordIndex] || ''), 
    [getORP, words, wordIndex]
  );
  
  const progress = useMemo(() => 
    words.length > 0 ? Math.round((wordIndex / words.length) * 100) : 0,
    [words.length, wordIndex]
  );

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading RSVP reader drill...</p>
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
            "name": "RSVP Intake Lab - Speed Reading Drill",
            "url": "https://skilldrills.online/drills/academic/reading-speed/rsvp-reader",
            "description": "RSVP (Rapid Serial Visual Presentation) speed reading drill with Optimal Recognition Point alignment. Train at 100-1000 WPM with adaptive word timing. Eliminates eye movements for 3-4x reading speed improvement.",
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
            "educationalUse": ["Speed Reading", "RSVP Training", "Visual Processing", "Cognitive Enhancement"],
            "learningResourceType": "Interactive Exercise",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Speed Reading", "RSVP Method", "Optimal Recognition Point", "Visual Word Processing"]
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
            <li className={`font-medium ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} aria-current="page">
              RSVP Intake Lab
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                RSVP Intake Lab
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Rapid Serial Visual Presentation • Speed reading with ORP alignment
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset RSVP reader"
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
          <h2>RSVP Intake Lab - Rapid Serial Visual Presentation Speed Reading</h2>
          <p>
            Master speed reading with RSVP (Rapid Serial Visual Presentation) technology.
            Words flash sequentially at a single focal point using Optimal Recognition Point (ORP) alignment,
            eliminating inefficient saccadic eye movements. Train at adjustable speeds from 100 to 1000 WPM.
            Research shows RSVP training can improve reading speed by 3-4x while maintaining comprehension.
            Features adaptive word timing based on word length, pause/resume with spacebar, and progress tracking.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Zap className="text-violet-600" />} value={effectiveWPM} label="Effective WPM" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best WPM" isDark={isDarkMode} />
          <StatCard icon={<Timer className="text-blue-600" />} value={timeElapsed} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<FileText className="text-green-600" />} value={`${wordsRead}/${words.length}`} label="Words" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={progress} label="Progress" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Target className="text-emerald-600" />} value={wpm} label="Target WPM" isDark={isDarkMode} />
          <StatCard icon={<BookOpen className="text-cyan-600" />} value={words.length} label="Total Words" isDark={isDarkMode} />
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

        {/* WPM Control */}
        {gameState === 'start' && (
          <div className="flex justify-center mb-4">
            <div className={`flex items-center gap-3 p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Target WPM:
              </span>
              <button 
                onClick={handleSpeedDown} 
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
                aria-label="Decrease target WPM"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className={`text-lg font-bold min-w-[60px] text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {wpm} WPM
              </span>
              <button 
                onClick={handleSpeedUp} 
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
                aria-label="Increase target WPM"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
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
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
                aria-label="Reset RSVP reader"
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
                    <Zap className="w-16 h-16 text-violet-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    RSVP Intake Lab
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {words.length} words • Target: {wpm} WPM
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Words flash at the Optimal Recognition Point. Fixate on the highlighted pivot letter. Press SPACE or click to pause/resume.
                  </p>
                  <button 
                    onClick={startReading}
                    disabled={words.length === 0}
                    className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                    aria-label="Start RSVP speed reading"
                  >
                    Start Reading
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && (
              <div 
                className="text-center w-full cursor-pointer" 
                onClick={() => isPlaying ? pauseReading() : resumeReading()}
                role="button"
                tabIndex={0}
                aria-label={isPlaying ? 'Click to pause reading' : 'Click to resume reading'}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); isPlaying ? pauseReading() : resumeReading(); }}}
              >
                {/* ORP Alignment Guides */}
                <div className="flex flex-col items-center gap-2 mb-4 opacity-30" aria-hidden="true">
                  <div className="w-0.5 h-8 bg-violet-500" />
                </div>
                
                {/* Word Display with ORP */}
                <div className="text-4xl sm:text-5xl md:text-7xl font-bold flex justify-center items-baseline">
                  <span className={`text-right flex-1 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {prefix}
                  </span>
                  <span className="text-violet-500 dark:text-violet-400 px-1">
                    {pivot}
                  </span>
                  <span className={`text-left flex-1 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {suffix}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2 mt-4 opacity-30" aria-hidden="true">
                  <div className="w-0.5 h-8 bg-violet-500" />
                </div>

                {/* Progress Bar */}
                <div className="mt-8 w-full max-w-md mx-auto">
                  <div className={`h-2 rounded-full ${isBoxDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Reading progress"
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="mt-8 flex gap-4 justify-center items-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); isPlaying ? pauseReading() : resumeReading(); }}
                    className={`p-4 rounded-full transition-all ${
                      isBoxDarkMode 
                        ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2`}
                    aria-label={isPlaying ? 'Pause reading' : 'Resume reading'}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); resetGame(); }}
                    className={`p-4 rounded-full transition-all ${
                      isBoxDarkMode 
                        ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2`}
                    aria-label="Reset reading"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>
                </div>

                <p className={`mt-4 text-xs ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Click anywhere or press SPACE to {isPlaying ? 'pause' : 'resume'}
                </p>
              </div>
            )}

            {/* ============ GAME OVER SCREEN ============ */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Trophy className="w-10 h-10 text-yellow-500" aria-hidden="true" />
                    <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Reading Complete!
                    </h2>
                  </div>
                  
                  <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Regular RSVP training can improve your reading speed by 3-4x.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Effective WPM" value={effectiveWPM} icon={<Zap className="w-4 h-4" />} color="violet" isDark={isBoxDarkMode} />
                    <ResultCard label="Best WPM" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Words Read" value={words.length} icon={<FileText className="w-4 h-4" />} color="green" isDark={isBoxDarkMode} />
                    <ResultCard label="Time" value={`${timeElapsed}s`} icon={<Timer className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                    <ResultCard label="Target WPM" value={wpm} icon={<Target className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Progress" value={`${progress}%`} icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How RSVP Reading Works</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Fixate on the <span className="font-semibold text-violet-500">highlighted pivot letter</span> (ORP)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Words flash at <span className="font-semibold text-green-500">Optimal Recognition Point</span> for efficient processing</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Longer words stay <span className="font-semibold text-blue-500">slightly longer</span> (1.2x) for better comprehension</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Press <span className="font-semibold text-purple-500">SPACE</span> or click anywhere to pause/resume</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Adjust <span className="font-semibold text-orange-500">target WPM</span> before starting (100-1000)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Regular RSVP training can <span className="font-semibold text-yellow-500">3-4x reading speed</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>📖 250+ words • Neuroplasticity & speed reading educational text</span>
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
    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-500', icon: 'text-violet-500' },
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
  };
  
  const colors = colorMap[color] || colorMap.violet;
  
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