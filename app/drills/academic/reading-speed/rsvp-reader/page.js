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

export default function RSVPReader() {
  const [gameState, setGameState] = useState('start');
  const [wpm, setWpm] = useState(400);
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Default text about neuroplasticity and speed reading
  const defaultText = `Neuroplasticity is the brain's remarkable ability to reorganize itself by forming new neural connections throughout life. This extraordinary process allows the neurons in the brain to compensate for injury and disease and to adjust their activities in response to new situations or to changes in their environment. The human brain contains approximately eighty-six billion neurons, each capable of forming thousands of synaptic connections with other neurons. This vast network is constantly being reshaped by our experiences, thoughts, and learning. Rapid Serial Visual Presentation represents a revolutionary approach to reading that leverages the brain's natural plasticity. Traditional reading involves saccadic eye movements where the eyes jump from word to word, fixating on each for approximately two hundred to two hundred fifty milliseconds. These constant movements create significant cognitive overhead and limit reading speed to around two hundred to three hundred words per minute for most educated adults. RSVP technology eliminates these inefficient eye movements entirely. By presenting words sequentially at a fixed focal point, RSVP allows the visual cortex to process lexical tokens at a rate significantly higher than standard reading methods permit. Research conducted at leading universities has demonstrated that with proper training, individuals can achieve reading speeds exceeding one thousand words per minute while maintaining comprehension levels comparable to traditional reading. This represents a three to four fold increase in information processing capacity. The key to RSVP's effectiveness lies in the Optimal Recognition Point theory. Each word has a specific letter position where the brain most efficiently recognizes and processes it. For most English words, this point falls slightly left of center. By aligning this ORP consistently, the brain can process words with minimal cognitive effort. Regular practice with RSVP technology has been shown to produce lasting changes in the brain's reading networks. The implications extend far beyond personal productivity. In fields requiring rapid assimilation of large volumes of text such as law, medicine, and academic research, RSVP could fundamentally transform how professionals engage with written information. Students could potentially process entire textbooks in hours rather than days. As we continue to understand the brain's remarkable capacity for change, technologies like RSVP will play an increasingly important role in human cognitive enhancement.`;
  
  const [inputText, setInputText] = useState(defaultText);
  
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

  const timerRef = useRef(null);
  const streamTimerRef = useRef(null);
  const containerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  
  const words = useMemo(() => inputText.trim().split(/\s+/).filter(w => w.length > 0), [inputText]);

  // Calculate effective WPM
  const effectiveWPM = timeElapsed > 0 ? Math.round((wordsRead / timeElapsed) * 60) : 0;

  // Load best score
  useEffect(() => {
    const savedBestScore = localStorage.getItem('rsvpReaderDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score when game ends
  useEffect(() => {
    if (gameState === 'gameOver' && effectiveWPM > bestScore) {
      setBestScore(effectiveWPM);
      localStorage.setItem('rsvpReaderDrillBestScore', effectiveWPM.toString());
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

  // Calculate ORP (Optimal Recognition Point)
  const getORP = (word) => {
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
  };

  const startReading = () => {
    if (words.length === 0) return;
    
    setGameState('playing');
    setIsPlaying(true);
    setWordIndex(0);
    setTimeElapsed(0);
    setWordsRead(0);
    playSound('start');
    showFeedback(`Reading started at ${wpm} WPM`, 'success');
  };

  const pauseReading = () => {
    setIsPlaying(false);
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);
  };

  const resumeReading = () => {
    setIsPlaying(true);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setGameState('start');
    setWordIndex(0);
    setTimeElapsed(0);
    setWordsRead(0);
    setFeedback('');
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
  };

  const handleSpeedUp = () => setWpm(w => Math.min(1000, w + 50));
  const handleSpeedDown = () => setWpm(w => Math.max(100, w - 50));

  // RSVP Stream Effect
  useEffect(() => {
    if (isPlaying && gameState === 'playing') {
      const currentWord = words[wordIndex];
      const msPerWord = (60 / wpm) * 1000;
      const length = currentWord?.length || 5;
      const weight = length > 8 ? 1.2 : length < 4 ? 0.9 : 1.0;
      
      streamTimerRef.current = setInterval(() => {
        setWordIndex((prev) => {
          const nextIndex = prev + 1;
          setWordsRead(nextIndex);
          
          if (nextIndex >= words.length) {
            clearInterval(streamTimerRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
            setIsPlaying(false);
            setGameState('gameOver');
            playSound('complete');
            showFeedback(`Complete! Effective WPM: ${effectiveWPM}`, 'success');
            return prev;
          }
          return nextIndex;
        });
      }, msPerWord * weight);
    }
    
    return () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    };
  }, [isPlaying, wpm, words, wordIndex, gameState, effectiveWPM]);

  // Timer Effect
  useEffect(() => {
    if (isPlaying && gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, gameState]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState === 'playing') {
        if (e.code === 'Space') {
          e.preventDefault();
          if (isPlaying) {
            pauseReading();
          } else {
            resumeReading();
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  const { prefix, pivot, suffix } = getORP(words[wordIndex] || '');
  const progress = words.length > 0 ? Math.round((wordIndex / words.length) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
              <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>RSVP Intake Lab</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rapid Serial Visual Presentation • Speed reading</p>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button 
                  onClick={resetGame} 
                  className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} 
                  title="Reset session"
                >
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

        {/* Stats Board - RSVP Reader specific metrics */}
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
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* WPM Control - Below Stats Board */}
        {gameState === 'start' && (
          <div className="flex justify-center mb-4">
            <div className={`flex items-center gap-3 p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Target WPM:
              </span>
              <button onClick={handleSpeedDown} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className={`text-lg font-bold min-w-[60px] text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{wpm} WPM</span>
              <button onClick={handleSpeedUp} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
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
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
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
                  <Zap className="w-16 h-16 text-violet-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>RSVP Intake Lab</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{words.length} words • Target: {wpm} WPM</p>
                  <button 
                    onClick={startReading}
                    disabled={words.length === 0}
                    className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Start Reading
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && (
              <div 
                className="text-center w-full cursor-pointer" 
                onClick={() => isPlaying ? pauseReading() : resumeReading()}
              >
                {/* ORP Alignment Guides */}
                <div className="flex flex-col items-center gap-2 mb-4 opacity-30">
                  <div className="w-0.5 h-8 bg-violet-500" />
                </div>
                
                {/* Word Display with ORP */}
                <div className="text-5xl md:text-7xl font-bold flex justify-center items-baseline">
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

                <div className="flex flex-col items-center gap-2 mt-4 opacity-30">
                  <div className="w-0.5 h-8 bg-violet-500" />
                </div>

                {/* Progress Bar */}
                <div className="mt-8 w-full max-w-md mx-auto">
                  <div className={`h-2 rounded-full ${isBoxDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
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
                    }`}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); resetGame(); }}
                    className={`p-4 rounded-full transition-all ${
                      isBoxDarkMode 
                        ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>
                </div>

                <p className={`mt-4 text-xs ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Click anywhere or press SPACE to {isPlaying ? 'pause' : 'resume'}
                </p>
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Reading Complete!</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Effective WPM" value={effectiveWPM} icon={<Zap className="w-4 h-4" />} color="text-violet-500" />
                    <ResultCard label="Best WPM" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Words Read" value={words.length} icon={<FileText className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Time Elapsed" value={`${timeElapsed}s`} icon={<Timer className="w-4 h-4" />} color="text-blue-500" />
                    <ResultCard label="Target WPM" value={wpm} icon={<Target className="w-4 h-4" />} color="text-emerald-500" />
                    <ResultCard label="Progress" value={`${progress}%`} icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Fixate on the <span className="font-semibold text-violet-500">highlighted pivot letter</span> (ORP)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Words flash at <span className="font-semibold text-green-500">Optimal Recognition Point</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Longer words stay <span className="font-semibold text-blue-500">slightly longer</span> on screen</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Press <span className="font-semibold text-purple-500">SPACEBAR</span> or click to pause/resume</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Adjust <span className="font-semibold text-orange-500">target WPM</span> before starting (100-1000)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Regular RSVP training can <span className="font-semibold text-yellow-500">3-4x reading speed</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>📖 250+ words • Neuroplasticity & speed reading text</span>
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
  const bgColor = color === 'text-violet-500' ? 'bg-violet-500/10' : 
                   color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-blue-500' ? 'bg-blue-500/10' :
                   color === 'text-emerald-500' ? 'bg-emerald-500/10' : 'bg-purple-500/10';
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${bgColor}`}>
      <div className="flex items-center gap-2">
        <div className={color}>{icon}</div>
        <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      </div>
      <span className={`font-bold text-lg ${color}`}>{typeof value === 'string' ? value : value}{unit}</span>
    </div>
  );
}