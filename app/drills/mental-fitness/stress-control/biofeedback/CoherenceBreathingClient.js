'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, TrendingUp, Wind, Brain, Info, Trophy, RefreshCw
} from 'lucide-react';

export default function CoherenceBreathingClient() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const pacerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [totalBreaths, setTotalBreaths] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [instruction, setInstruction] = useState('');
  const [bestBreaths, setBestBreaths] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const isActiveRef = useRef(false);
  const timerIntervalRef = useRef(null);
  const inhaleTimeoutRef = useRef(null);
  const exhaleTimeoutRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const gameStateRef = useRef('start');
  
  const inhaleTime = 5000;
  const exhaleTime = 6000;

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Sync gameState to ref
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Show feedback
  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  }, []);

  // Load best breaths record
  useEffect(() => {
    try {
      const savedBestBreaths = localStorage.getItem('coherenceBreathingBestBreaths');
      if (savedBestBreaths) {
        const parsed = parseInt(savedBestBreaths, 10);
        if (!isNaN(parsed)) setBestBreaths(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best breaths record
  useEffect(() => {
    if (gameState === 'gameOver' && totalBreaths > bestBreaths) {
      setBestBreaths(totalBreaths);
      try {
        localStorage.setItem('coherenceBreathingBestBreaths', totalBreaths.toString());
      } catch (e) { /* localStorage not available */ }
      showFeedback(`🏆 New Record! ${totalBreaths} breaths`, 'success');
    }
  }, [gameState, totalBreaths, bestBreaths, showFeedback]);

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

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Play sound effect
  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const now = audioContext.currentTime;
      
      if (type === 'inhale') {
        oscillator.frequency.setValueAtTime(523.25, now);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        oscillator.start(now);
        oscillator.stop(now + 0.2);
      } else if (type === 'exhale') {
        oscillator.frequency.setValueAtTime(392.00, now);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
      } else if (type === 'complete') {
        oscillator.frequency.setValueAtTime(1046.5, now);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
      }
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled]);

  const updateTimerDisplay = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const runCycle = useCallback(() => {
    if (!isActiveRef.current) return;

    // INHALE
    setInstruction('INHALE');
    if (pacerRef.current) {
      pacerRef.current.style.transition = `transform ${inhaleTime}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      pacerRef.current.style.transform = 'scale(2.5)';
    }
    playSound('inhale');

    // After inhaleTime, start exhale
    inhaleTimeoutRef.current = setTimeout(() => {
      if (!isActiveRef.current) return;

      // EXHALE
      setInstruction('EXHALE');
      if (pacerRef.current) {
        pacerRef.current.style.transition = `transform ${exhaleTime}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        pacerRef.current.style.transform = 'scale(1)';
      }
      playSound('exhale');

      // Count breath cycle
      setTotalBreaths(prev => {
        const newCount = prev + 1;
        if (newCount % 10 === 0) {
          showFeedback(`🎯 ${newCount} Breaths Complete!`, 'success');
        }
        return newCount;
      });

      // After exhaleTime, run the next cycle
      exhaleTimeoutRef.current = setTimeout(() => {
        runCycle();
      }, exhaleTime);
    }, inhaleTime);
  }, [playSound, showFeedback]);

  const startDrill = useCallback(() => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    if (isActiveRef.current) return;

    isActiveRef.current = true;
    setTimeLeft(300);
    setTotalBreaths(0);
    setInstruction('INHALE');
    
    // Reset pacer
    if (pacerRef.current) {
      pacerRef.current.style.transform = 'scale(1)';
      pacerRef.current.style.transition = 'none';
    }
    
    // Clear any existing timeouts
    if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
    if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
    
    // Start the breath cycle
    runCycle();

    // Timer countdown
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
          if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
          isActiveRef.current = false;
          setInstruction('COMPLETE');
          playSound('complete');
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          showFeedback('🎯 Session Complete!', 'success');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [runCycle, playSound, showFeedback]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
    if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setInstruction('');
    setTotalBreaths(0);
    setTimeLeft(300);
    setFeedback('');
    if (pacerRef.current) {
      pacerRef.current.style.transform = 'scale(1)';
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
      if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading coherence breathing drill...</p>
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
            "name": "Coherence Breathing - 5:6 HRV Biofeedback",
            "url": "https://skilldrills.online/drills/mental-fitness/stress-control/biofeedback",
            "description": "5:6 ratio coherence breathing to optimize heart rate variability. 5s inhale, 6s exhale with expanding/contracting visual pacer and audio tones at 523Hz/392Hz. 5-minute guided session for vagal tone improvement.",
            "applicationCategory": "HealthApplication",
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
            "educationalUse": ["Heart Rate Variability", "Biofeedback", "Stress Reduction", "Vagal Tone"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT5M",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Coherence Breathing", "HRV Optimization", "Resonance Frequency Breathing", "Cardiac Coherence"]
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
              <Link href="/drills/mental-fitness" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Mental Fitness
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Stress Control
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} aria-current="page">
              Coherence Breathing
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex-shrink-0">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Coherence Breathing
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                5:6 breath ratio • 5-minute session • HRV biofeedback training
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button
                onClick={resetGame}
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`}
                title="Reset session"
                aria-label="Reset breathing session"
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
          <h2>Coherence Breathing - 5:6 Ratio Heart Rate Variability Biofeedback</h2>
          <p>
            Optimize your heart rate variability with the scientifically-proven 5:6 coherence breathing ratio.
            Inhale for 5 seconds while the visual pacer expands, exhale for 6 seconds while it contracts.
            This resonance frequency breathing pattern synchronizes heart rate, blood pressure, and respiration
            to maximize vagal tone and parasympathetic activation.
            Audio tones at 523Hz (inhale) and 392Hz (exhale) provide additional sensory guidance.
            Complete the full 5-minute session for optimal HRV benefits.
            Track your total breaths and best session records.
          </p>
        </section>

        {/* Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${
              feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-orange-500' : 'bg-red-500'}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedback || '\u00A0'}
          </div>
        </div>

        {/* Stats Board */}
        <div className="grid grid-cols-4 gap-3 mb-6 h-[88px]">
          <StatCard icon={<Wind className="text-cyan-500" />} value={totalBreaths} label="Breaths" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestBreaths} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 60 ? 'text-red-500' : 'text-blue-500'} />} value={updateTimerDisplay(timeLeft)} label="Time Left" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-purple-500" />} value="5:6" label="Ratio" isDark={isDarkMode} />
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2 shadow-lg'}`}
          style={{ 
            background: isBoxDarkMode ? '#0a0a1a' : '#f0f9ff',
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb'
          }}
        >
          {/* Fullscreen Controls */}
          {isFullscreen && gameState === 'playing' && (
            <>
              <div className="absolute top-4 right-4 z-30 flex gap-3">
                <button
                  onClick={resetGame}
                  className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white"
                  title="Reset session"
                  aria-label="Reset breathing session"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsBoxDarkMode(!isBoxDarkMode)}
                  className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white"
                  aria-label="Toggle drill area theme"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white"
                  aria-label="Toggle sound"
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white"
                  aria-label="Exit fullscreen"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm" aria-live="polite">
                Breaths: <span className="text-cyan-400 font-bold">{totalBreaths}</span> | Time: <span className="text-blue-400 font-bold">{updateTimerDisplay(timeLeft)}</span>
              </div>
            </>
          )}

          <div className="text-center">
            {/* Instruction Text */}
            <div 
              className="instruction"
              style={{
                fontSize: isFullscreen ? '2rem' : '1.3rem',
                height: isFullscreen ? '40px' : '28px',
                marginBottom: isFullscreen ? '40px' : '30px',
                letterSpacing: '2px',
                userSelect: 'none',
                color: isBoxDarkMode ? '#38bdf8' : '#0284c7',
                fontWeight: 'bold'
              }}
              aria-live="polite"
              aria-label={`Current phase: ${instruction}`}
            >
              {instruction}
            </div>

            {/* Circle Container */}
            <div 
              className="circle-container"
              style={{
                position: 'relative',
                width: isFullscreen ? '400px' : '300px',
                height: isFullscreen ? '400px' : '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto'
              }}
              aria-hidden="true"
            >
              {/* Outer Glow */}
              <div 
                className="outer-glow"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${isBoxDarkMode ? 'rgba(56,189,248,0.12)' : 'rgba(2,132,199,0.08)'} 0%, transparent 70%)`
                }}
              />

              {/* Pacer Circle */}
              <div 
                ref={pacerRef}
                className="pacer-circle"
                style={{
                  width: isFullscreen ? '133px' : '100px',
                  height: isFullscreen ? '133px' : '100px',
                  background: isBoxDarkMode ? '#38bdf8' : '#0284c7',
                  borderRadius: '50%',
                  boxShadow: `0 0 50px ${isBoxDarkMode ? 'rgba(56,189,248,0.5)' : 'rgba(2,132,199,0.3)'}`,
                  transition: 'transform linear'
                }}
              />
            </div>

            {/* Timer */}
            <div 
              className="timer"
              style={{
                marginTop: isFullscreen ? '50px' : '40px',
                fontSize: isFullscreen ? '2rem' : '1.6rem',
                letterSpacing: '2px',
                userSelect: 'none',
                color: isBoxDarkMode ? '#38bdf8' : '#0284c7'
              }}
              aria-label={`${updateTimerDisplay(timeLeft)} remaining`}
            >
              {updateTimerDisplay(timeLeft)}
            </div>

            {/* Stop Button */}
            {gameState === 'playing' && (
              <button
                onClick={() => {
                  if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
                  if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
                  if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
                  isActiveRef.current = false;
                  setGameState('gameOver');
                  gameStateRef.current = 'gameOver';
                }}
                className="mt-8 px-6 py-2 rounded-full text-sm transition-all hover:border-red-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                style={{
                  background: 'transparent',
                  border: `1px solid ${isBoxDarkMode ? '#333' : '#ddd'}`,
                  color: isBoxDarkMode ? '#666' : '#999'
                }}
                aria-label="End breathing session early"
              >
                End Session
              </button>
            )}
          </div>

          {/* ============ START SCREEN ============ */}
          {gameState === 'start' && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(240,249,255,0.95)' }}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4">
                  <Wind className="w-16 h-16 text-cyan-500 mx-auto" aria-hidden="true" />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Coherence Breathing
                </h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  5:6 breath ratio • 5-minute session
                </p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Scientifically proven to optimize heart rate variability. Inhale 5s as circle expands, exhale 6s as it contracts. Audio tones guide each phase.
                </p>
                <button
                  onClick={startDrill}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                  aria-label="Start 5-minute coherence breathing session"
                >
                  Begin Breathing
                </button>
              </div>
            </div>
          )}

          {/* ============ GAME OVER SCREEN ============ */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(240,249,255,0.95)' }}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[520px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Award className="w-10 h-10 text-yellow-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Session Complete
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Regular 5:6 coherence breathing improves HRV, reduces stress, and enhances emotional regulation.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Total Breaths" value={totalBreaths} icon={<Wind className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Session" value={bestBreaths} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Duration" value="5:00" icon={<Timer className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Breath Ratio" value="5:6" icon={<TrendingUp className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Coherence" value={Math.min(100, Math.floor(totalBreaths / 3))} unit="%" icon={<Brain className="w-4 h-4" />} color="green" isDark={isBoxDarkMode} />
                  <ResultCard label="HRV Sync" value={totalBreaths > 50 ? "Optimal" : totalBreaths > 25 ? "Good" : "Building"} icon={<Activity className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/mental-fitness" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back to Mental Fitness
                    </button>
                  </Link>
                  <button
                    onClick={startDrill}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                  >
                    Breathe Again →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        {!isFullscreen && (
          <footer className="mt-6" aria-label="Coherence breathing protocol instructions">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Coherence Breathing Protocol</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-cyan-500">INHALE (5s)</span> - Circle expands, breathe in slowly through your nose</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-blue-500">EXHALE (6s)</span> - Circle contracts, breathe out gently through your mouth</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-purple-500">5:6 ratio</span> - Proven resonance frequency for cardiac coherence</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">Audio guidance</span> - 523Hz inhale tone • 392Hz exhale tone</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">Mindfulness focus</span> - Pure presence, follow the pacer naturally</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-orange-500">5-minute session</span> - Complete full duration for optimal HRV benefits</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>💓 Optimizes heart rate variability and vagal tone</span>
                  <span>🎵 523Hz (C5) inhale • 392Hz (G4) exhale tones</span>
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
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
  };
  
  const colors = colorMap[color] || colorMap.cyan;
  
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