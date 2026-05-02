'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { 
  Zap, RotateCcw, 
  Sun, Moon, Volume2, VolumeX,
  Eye, Maximize2, Minimize2,
  ArrowLeft, FileText, Target, Timer, Trophy,
  Columns, RefreshCw, ChevronUp, ChevronDown, Gauge,
  BarChart3, Info, CheckCircle2
} from 'lucide-react';

export default function SpeedReaderDrill() {
  const [gameState, setGameState] = useState('start');
  const [wpm, setWpm] = useState(400);
  const [activeColumn, setActiveColumn] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [columnWidth, setColumnWidth] = useState(280);
  
  // 60 second timer
  const [timeLeft, setTimeLeft] = useState(60);
  
  // Multiple columns of text - 10 different passages
  const textColumns = [
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
  ];
  
  // Pick 10 random columns on each refresh
  const getRandomColumns = () => {
    const shuffled = [...textColumns].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  };
  
  const [columns, setColumns] = useState(getRandomColumns());
  
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

  // Sync refs with state
  useEffect(() => {
    wpmRef.current = wpm;
  }, [wpm]);

  useEffect(() => {
    columnsRef.current = columns;
  }, [columns]);

  useEffect(() => {
    activeColumnRef.current = activeColumn;
  }, [activeColumn]);

  useEffect(() => {
    wordsReadRef.current = wordsRead;
  }, [wordsRead]);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Calculate total words and effective WPM
  const totalWords = useMemo(() => {
    return columns.reduce((sum, col) => {
      return sum + col.split(/\s+/).filter(w => w.length > 0).length;
    }, 0);
  }, [columns]);

  const effectiveWPM = timeLeft < 60 && wordsRead > 0 
    ? Math.round((wordsRead / (60 - timeLeft)) * 60) 
    : 0;

  const progress = columns.length > 0 ? Math.round((activeColumn / columns.length) * 100) : 0;
  const columnsCompleted = activeColumn;

  // Load best score
  useEffect(() => {
    const savedBestScore = localStorage.getItem('columnScannerDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && effectiveWPM > bestScore) {
      setBestScore(effectiveWPM);
      localStorage.setItem('columnScannerDrillBestScore', effectiveWPM.toString());
    }
  }, [gameState, effectiveWPM, bestScore]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
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

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 500);
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

  // Play sound effect
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      if (type === 'start') {
        oscillator.frequency.value = 660;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
        oscillator.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'complete') {
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
        oscillator.stop(audioCtx.currentTime + 0.15);
      }
    } catch (e) {
      // Ignore audio errors
    }
  };

  // Refresh columns
  const refreshColumns = () => {
    const newColumns = getRandomColumns();
    setColumns(newColumns);
    columnsRef.current = newColumns;
    showFeedback(`New columns loaded • ${totalWords} total words`, 'success');
  };

  const startDrill = () => {
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
  };

  const resetGame = () => {
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
  };

  const handleWpmUp = () => setWpm(w => Math.min(800, w + 25));
  const handleWpmDown = () => setWpm(w => Math.max(100, w - 25));
  const handleWidthUp = () => setColumnWidth(w => Math.min(500, w + 20));
  const handleWidthDown = () => setColumnWidth(w => Math.max(200, w - 20));

  // Column reading effect - using refs to avoid dependency issues
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
          // Finished all columns
          clearInterval(streamTimerRef.current);
          if (timerRef.current) clearInterval(timerRef.current);
          setIsPlaying(false);
          isPlayingRef.current = false;
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          playSound('complete');
          
          const effectiveWPM = timeLeftRef.current < 60 && wordsReadRef.current > 0 
            ? Math.round((wordsReadRef.current / (60 - timeLeftRef.current)) * 60) 
            : 0;
          showFeedback(`Complete! Effective WPM: ${effectiveWPM}`, 'success');
          return;
        }
        
        activeColumnRef.current = nextIndex;
        setActiveColumn(nextIndex);
        
        // Restart with new interval for next column
        runColumnStream();
      }, msPerColumn);
    };
    
    if (isPlaying && gameState === 'playing') {
      runColumnStream();
    }
    
    return () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    };
  }, [isPlaying, gameState]); // Only depend on these two

  // Timer effect - 60 second countdown
  useEffect(() => {
    if (isPlaying && gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          timeLeftRef.current = newTime;
          
          if (newTime <= 0) {
            clearInterval(timerRef.current);
            if (streamTimerRef.current) clearInterval(streamTimerRef.current);
            setIsPlaying(false);
            isPlayingRef.current = false;
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            playSound('complete');
            
            const effectiveWPM = newTime < 60 && wordsReadRef.current > 0 
              ? Math.round((wordsReadRef.current / (60 - newTime)) * 60) 
              : 0;
            showFeedback(`Time's up! Effective WPM: ${effectiveWPM}`, 'success');
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, gameState, timeLeft]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
          <Link 
            href="/drills/academic" 
            className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Academic Drills
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                <Columns className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>60s Column Scanner</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>10 rotating columns • 60 second challenge</p>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex gap-2">
              {/* Reset button - always visible */}
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
                title="Reset session"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
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

        {/* Stats Board - Column Scanner specific metrics */}
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
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Controls (Start Screen) */}
        {gameState === 'start' && (
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <div className={`flex items-center gap-3 p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>WPM:</span>
              <button onClick={handleWpmDown} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className={`text-lg font-bold min-w-[60px] text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{wpm}</span>
              <button onClick={handleWpmUp} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
            
            <div className={`flex items-center gap-3 p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Width:</span>
              <button onClick={handleWidthDown} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className={`text-lg font-bold min-w-[60px] text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{columnWidth}px</span>
              <button onClick={handleWidthUp} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={refreshColumns}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold transition ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                  : 'bg-white border border-gray-200 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              New Columns ({totalWords} words)
            </button>
          </div>
        )}

        {/* Game Container - 16:9 Ratio Box */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#0a0a0a" : "#ffffff",
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {isFullscreen && gameState !== 'start' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              {/* Reset button in fullscreen */}
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

          {/* Content Area */}
          <div className="absolute inset-0 flex items-center justify-center p-8 overflow-y-auto">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Columns className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>60s Column Scanner</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{columns.length} columns • Target: {wpm} WPM</p>
                  <button 
                    onClick={startDrill}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && (
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <div 
                  className="text-center transition-all duration-300"
                  style={{ width: `${columnWidth}px` }}
                >
                  <div className={`text-xl md:text-2xl font-bold leading-relaxed ${
                    isBoxDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    {columns[activeColumn]}
                  </div>
                </div>
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Complete!</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Effective WPM" value={effectiveWPM} icon={<Zap className="w-4 h-4" />} color="text-emerald-500" />
                    <ResultCard label="Best WPM" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Target WPM" value={wpm} icon={<Gauge className="w-4 h-4" />} color="text-blue-500" />
                    <ResultCard label="Columns Read" value={`${columnsCompleted}/${columns.length}`} icon={<Columns className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Words Read" value={wordsRead} icon={<FileText className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Progress" value={`${progress}%`} icon={<BarChart3 className="w-4 h-4" />} color="text-orange-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Keep eyes <span className="font-semibold text-emerald-500">centered</span> - let text come to you</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>10 columns rotate <span className="font-semibold text-green-500">automatically</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Adjust <span className="font-semibold text-blue-500">WPM (100-800)</span> and width (200-500px)</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click <span className="font-semibold text-purple-500">"New Columns"</span> to refresh content</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Trains <span className="font-semibold text-orange-500">peripheral vision</span> and reading stamina</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60 second <span className="font-semibold text-yellow-500">timed challenge</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>📖 10 unique passages • 60 second timed challenge</span>
                  <span>🏆 Best WPM saves locally</span>
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
  const bgColor = color === 'text-emerald-500' ? 'bg-emerald-500/10' : 
                   color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-blue-500' ? 'bg-blue-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' : 'bg-orange-500/10';
  
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