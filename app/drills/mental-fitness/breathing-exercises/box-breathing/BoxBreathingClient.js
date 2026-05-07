'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, Wind, Clock, Eye,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Timer, Trophy, Square, Brain, Info, TrendingUp, RefreshCw
} from 'lucide-react';

export default function BoxBreathingClient() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [action, setAction] = useState('READY');
  const [timer, setTimer] = useState(4);
  const [currentState, setCurrentState] = useState(0);
  const [totalBreaths, setTotalBreaths] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [combo, setCombo] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const timerIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const stateTimeoutRef = useRef(null);
  const startTimeRef = useRef(0);
  const isActiveRef = useRef(false);
  const currentStateRef = useRef(0);
  const totalBreathsRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const feedbackTimeoutRef = useRef(null);
  const gameStateRef = useRef('start');

  const states = useRef([
    { label: "INHALE", top: "0%", left: "100%" },
    { label: "HOLD", top: "100%", left: "100%" },
    { label: "EXHALE", top: "100%", left: "0%" },
    { label: "HOLD", top: "0%", left: "0%" }
  ]).current;

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

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('boxBreathingBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('boxBreathingBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
      showFeedback('🏆 New Record!', 'success');
    }
  }, [gameState, score, bestScore, showFeedback]);

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
      const freqMap = { tick: 880, transition: 660, complete: 1046.5, combo: 660 };
      
      oscillator.frequency.setValueAtTime(freqMap[type] || 660, now);
      gainNode.gain.setValueAtTime(type === 'tick' ? 0.05 : type === 'combo' ? 0.06 : type === 'complete' ? 0.1 : 0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + (type === 'complete' ? 0.3 : 0.15));
      oscillator.start(now);
      oscillator.stop(now + (type === 'complete' ? 0.3 : 0.15));
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled]);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const updateDotPosition = useCallback((stateIndex) => {
    if (dotRef.current) {
      const state = states[stateIndex];
      dotRef.current.style.top = `calc(${state.top} - 6px)`;
      dotRef.current.style.left = `calc(${state.left} - 6px)`;
    }
  }, [states]);

  const runBoxCycle = useCallback(() => {
    if (!isActiveRef.current) return;
    
    const stateIndex = currentStateRef.current;
    const state = states[stateIndex];
    
    // Update UI
    setAction(state.label);
    setCurrentState(stateIndex);
    updateDotPosition(stateIndex);
    playSound('transition');
    
    // Countdown logic for the 4 seconds
    let count = 4;
    setTimer(count);
    
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    countdownIntervalRef.current = setInterval(() => {
      count--;
      if (count > 0) {
        setTimer(count);
        if (count === 1) {
          playSound('tick');
        }
      } else {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
        }
      }
    }, 1000);
    
    // Track breath completion (after full cycle of 4 states)
    if (stateIndex === 3) {
      totalBreathsRef.current += 1;
      setTotalBreaths(totalBreathsRef.current);
      
      comboRef.current += 1;
      setCombo(comboRef.current);
      
      // Award points every breath with combo bonus
      const basePoints = 5;
      const comboBonus = Math.floor(comboRef.current / 3) * 2;
      const pointsEarned = basePoints + comboBonus;
      
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      
      if (comboRef.current > 0 && comboRef.current % 3 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current} Breath Combo! +${comboBonus} bonus`, 'success');
      }
    }
    
    // Move to next state after 4s
    if (stateTimeoutRef.current) clearTimeout(stateTimeoutRef.current);
    stateTimeoutRef.current = setTimeout(() => {
      currentStateRef.current = (currentStateRef.current + 1) % 4;
      runBoxCycle();
    }, 4000);
  }, [states, updateDotPosition, playSound, showFeedback]);

  const startSession = useCallback(() => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    
    // Clear any existing timeouts/intervals
    if (stateTimeoutRef.current) clearTimeout(stateTimeoutRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    // Reset refs
    isActiveRef.current = true;
    currentStateRef.current = 0;
    totalBreathsRef.current = 0;
    scoreRef.current = 0;
    comboRef.current = 0;
    
    // Reset state
    setIsActive(true);
    setScore(0);
    setTotalBreaths(0);
    setCombo(0);
    setTimeElapsed(0);
    setCurrentState(0);
    setAction('INHALE');
    setTimer(4);
    startTimeRef.current = Date.now();
    
    // Reset dot position
    if (dotRef.current) {
      dotRef.current.style.top = 'calc(0% - 6px)';
      dotRef.current.style.left = 'calc(0% - 6px)';
    }
    
    // Start box breathing after short buffer
    setTimeout(() => {
      if (isActiveRef.current) {
        runBoxCycle();
      }
    }, 300);
    
    // Timer to track elapsed time
    timerIntervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setTimeElapsed(elapsed);
    }, 1000);
  }, [runBoxCycle]);

  const stopSession = useCallback(() => {
    isActiveRef.current = false;
    setIsActive(false);
    setGameState('gameOver');
    gameStateRef.current = 'gameOver';
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (stateTimeoutRef.current) clearTimeout(stateTimeoutRef.current);
  }, []);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (stateTimeoutRef.current) clearTimeout(stateTimeoutRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current = false;
    setIsActive(false);
    
    setGameState('start');
    gameStateRef.current = 'start';
    setCurrentState(0);
    currentStateRef.current = 0;
    setAction('READY');
    setTimer(4);
    setTotalBreaths(0);
    totalBreathsRef.current = 0;
    setScore(0);
    scoreRef.current = 0;
    setCombo(0);
    comboRef.current = 0;
    setTimeElapsed(0);
    setFeedback('');
    if (dotRef.current) {
      dotRef.current.style.top = 'calc(0% - 6px)';
      dotRef.current.style.left = 'calc(0% - 6px)';
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (stateTimeoutRef.current) clearTimeout(stateTimeoutRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading box breathing drill...</p>
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
            "name": "Box Breathing Drill - 4-4-4-4 Tactical Breathing",
            "url": "https://skilldrills.online/drills/mental-fitness/breathing-exercises/box-breathing",
            "description": "Box breathing (4-4-4-4 technique) used by Navy SEALs and first responders. Square visual pacer guides 4s inhale, 4s hold, 4s exhale, 4s hold. 5 points per breath with combo bonuses every 3 breaths.",
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
            "educationalUse": ["Breathing Exercise", "Stress Relief", "Focus Training", "Tactical Breathing"],
            "learningResourceType": "Interactive Exercise",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Box Breathing", "4-4-4-4 Breathing", "Tactical Breathing", "Stress Management", "Focus Enhancement"]
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
              Breathing Exercises
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} aria-current="page">
              Box Breathing
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex-shrink-0">
              <Square className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Box Breathing
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Tactical 4-4-4-4 pattern • 5 points per breath • Combo bonuses • Endless session
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
          <h2>Box Breathing - 4-4-4-4 Tactical Breathing Drill</h2>
          <p>
            Master the box breathing technique used by Navy SEALs, first responders, and elite athletes.
            Also known as square breathing or 4-4-4-4 breathing, this technique involves: inhale 4s,
            hold 4s, exhale 4s, hold 4s - forming a complete &quot;box&quot; cycle.
            Visual square pacer with moving dot guides you through each phase.
            Audio cues signal transitions and countdown ticks.
            Earn 5 points per complete breath with +2 combo bonus every 3 breaths.
            Endless session - continue for as long as you like.
            Proven to reduce stress, improve concentration, and activate parasympathetic response.
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
        <div className="grid grid-cols-5 gap-3 mb-6 h-[88px]">
          <StatCard icon={<Brain className="text-cyan-500" />} value={score} label="Focus Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className="text-blue-500" />} value={formatTime(timeElapsed)} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Wind className="text-green-500" />} value={totalBreaths} label="Breaths" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-purple-500" />} value={combo} label="Combo" isDark={isDarkMode} />
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2 shadow-lg'}`}
          style={{ 
            background: isBoxDarkMode ? '#050505' : '#ffffff',
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb'
          }}
        >
          {/* Fullscreen Controls Overlay */}
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
                Score: <span className="text-yellow-400 font-bold">{score}</span> | Breaths: <span className="text-green-400 font-bold">{totalBreaths}</span> | Combo: <span className="text-purple-400 font-bold">{combo}</span>
              </div>
            </>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            
            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl z-10 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(5,5,5,0.95)' : 'rgba(255,255,255,0.95)' }}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Square className="w-16 h-16 text-cyan-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Box Breathing
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    5 points per breath • Combo bonuses • Endless session
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    4-4-4-4 tactical breathing used by Navy SEALs. Follow the dot around the square: inhale 4s, hold 4s, exhale 4s, hold 4s.
                  </p>
                  <button
                    onClick={startSession}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    aria-label="Start box breathing exercise"
                  >
                    Start Breathing
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && (
              <div className="text-center">
                {/* HUD Frame */}
                <div
                  className="hud-frame"
                  style={{
                    position: 'relative',
                    width: isFullscreen ? '450px' : '300px',
                    height: isFullscreen ? '450px' : '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {/* Box Outline */}
                  <div
                    className="box-outline"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      border: `1px solid ${isBoxDarkMode ? 'rgba(0, 242, 254, 0.1)' : 'rgba(2, 132, 199, 0.15)'}`,
                      borderRadius: '4px'
                    }}
                    aria-hidden="true"
                  />

                  {/* Pacer Dot */}
                  <div
                    ref={dotRef}
                    id="pacer-dot"
                    style={{
                      position: 'absolute',
                      width: isFullscreen ? '18px' : '12px',
                      height: isFullscreen ? '18px' : '12px',
                      background: isBoxDarkMode ? '#00f2fe' : '#0284c7',
                      borderRadius: '2px',
                      boxShadow: `0 0 15px ${isBoxDarkMode ? '#00f2fe' : '#0284c7'}`,
                      top: 'calc(0% - 6px)',
                      left: 'calc(0% - 6px)',
                      transition: 'all 4000ms linear'
                    }}
                    aria-hidden="true"
                  />

                  {/* Center Label */}
                  <div
                    className="center-label"
                    style={{
                      textAlign: 'center',
                      zIndex: 10
                    }}
                  >
                    <div
                      id="action"
                      style={{
                        fontSize: isFullscreen ? '2rem' : '1.5rem',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        color: isBoxDarkMode ? '#00f2fe' : '#0284c7',
                        marginBottom: '10px',
                        fontWeight: '300'
                      }}
                      aria-live="polite"
                      aria-label={`Current phase: ${action}`}
                    >
                      {action}
                    </div>
                    <div
                      id="timer"
                      style={{
                        fontFamily: 'monospace',
                        fontSize: isFullscreen ? '3rem' : '2rem',
                        opacity: 0.5,
                        color: isBoxDarkMode ? '#ffffff' : '#000000'
                      }}
                      aria-label={`${timer} seconds remaining in current phase`}
                    >
                      {timer}
                    </div>
                  </div>
                </div>

                {/* Stop Button */}
                <button
                  onClick={stopSession}
                  className="mt-5 px-6 py-2 rounded-full text-sm transition-all hover:border-red-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  style={{
                    background: 'transparent',
                    border: `1px solid ${isBoxDarkMode ? '#333' : '#ddd'}`,
                    color: isBoxDarkMode ? '#666' : '#999'
                  }}
                  aria-label="End breathing session"
                >
                  End Session
                </button>
              </div>
            )}

            {/* ============ GAME OVER SCREEN ============ */}
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(5,5,5,0.95)' : 'rgba(255,255,255,0.95)' }}>
                <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[520px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Award className="w-10 h-10 text-yellow-500" aria-hidden="true" />
                    <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Session Complete
                    </h2>
                  </div>
                  
                  <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Regular box breathing practice improves focus, reduces stress, and enhances performance under pressure.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Focus Score" value={score} icon={<Brain className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Breaths" value={totalBreaths} icon={<Wind className="w-4 h-4" />} color="green" isDark={isBoxDarkMode} />
                    <ResultCard label="Duration" value={formatTime(timeElapsed)} icon={<Timer className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                    <ResultCard label="Max Combo" value={combo} icon={<TrendingUp className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Focus Level" value={Math.min(100, Math.floor(score / 2))} unit="%" icon={<Square className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/mental-fitness" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Mental Fitness
                      </button>
                    </Link>
                    <button
                      onClick={startSession}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    >
                      Breathe Again →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        {!isFullscreen && (
          <footer className="mt-6" aria-label="Box breathing instructions">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Box Breathing Instructions</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-cyan-500">INHALE</span> deeply through your nose for <span className="font-semibold">4 seconds</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-blue-500">HOLD</span> your breath for <span className="font-semibold">4 seconds</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">EXHALE</span> slowly through your mouth for <span className="font-semibold">4 seconds</span></p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-purple-500">HOLD</span> again for <span className="font-semibold">4 seconds</span> to complete the box</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Each breath: <span className="font-semibold text-orange-500">5 points</span> + combo bonuses every 3 breaths</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Used by <span className="font-semibold text-yellow-500">Navy SEALs</span> for stress control and focus</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🧘 Reduces stress • Improves concentration • Activates parasympathetic response</span>
                  <span>🎵 Audio cues guide your breathing rhythm</span>
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
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
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