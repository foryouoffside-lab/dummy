'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, TrendingUp, Wind, Brain, Info, Trophy, RefreshCw
} from 'lucide-react';

export default function CalmUnderPressureClient() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const pacerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [totalBreaths, setTotalBreaths] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [instruction, setInstruction] = useState('');
  const [cognitiveLoad, setCognitiveLoad] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [showNumber, setShowNumber] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const isActiveRef = useRef(false);
  const timerIntervalRef = useRef(null);
  const inhaleTimeoutRef = useRef(null);
  const exhaleTimeoutRef = useRef(null);
  const loadIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const breathsRef = useRef(0);
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

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('calmUnderPressureBestScore');
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
        localStorage.setItem('calmUnderPressureBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
      showFeedback(`🏆 New Record! ${score}`, 'success');
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
      } else if (type === 'load') {
        oscillator.frequency.setValueAtTime(880, now);
        gainNode.gain.setValueAtTime(0.06, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
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
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const stopCognitiveLoad = useCallback(() => {
    if (loadIntervalRef.current) {
      clearInterval(loadIntervalRef.current);
      loadIntervalRef.current = null;
    }
    setCognitiveLoad(false);
    setShowNumber(false);
  }, []);

  const startCognitiveLoad = useCallback(() => {
    if (loadIntervalRef.current) return;
    
    setCognitiveLoad(true);
    showFeedback('🧠 Cognitive Load Active! Double points!', 'warning');
    
    loadIntervalRef.current = setInterval(() => {
      if (!isActiveRef.current) return;
      const num = Math.floor(Math.random() * 9) + 1;
      setCurrentNumber(num.toString());
      setShowNumber(true);
      playSound('load');
      
      setTimeout(() => {
        setShowNumber(false);
      }, 800);
    }, 3000);
  }, [playSound, showFeedback]);

  const controlCognitiveLoad = useCallback((currentTimeLeft) => {
    const elapsed = 180 - currentTimeLeft;
    // Pressure window: 20s to 140s
    const inLoadWindow = elapsed > 20 && elapsed < 140;
    
    if (inLoadWindow && !loadIntervalRef.current) {
      startCognitiveLoad();
    } else if (!inLoadWindow && loadIntervalRef.current) {
      stopCognitiveLoad();
      if (elapsed >= 140) {
        showFeedback('🧘 Pressure Phase Complete - Cool Down', 'success');
      }
    }
  }, [startCognitiveLoad, stopCognitiveLoad, showFeedback]);

  const runBreathingCycle = useCallback(() => {
    if (!isActiveRef.current) return;

    // INHALE
    setInstruction('INHALE');
    if (pacerRef.current) {
      pacerRef.current.style.transition = `transform ${inhaleTime}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      pacerRef.current.style.transform = 'scale(2.8)';
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
      breathsRef.current += 1;
      setTotalBreaths(breathsRef.current);
      
      // Award points every 5 breaths
      if (breathsRef.current % 5 === 0) {
        const pointsEarned = cognitiveLoad ? 20 : 10;
        scoreRef.current += pointsEarned;
        setScore(scoreRef.current);
        if (cognitiveLoad) {
          showFeedback(`💪 +${pointsEarned} - Maintained Under Load!`, 'success');
        } else {
          showFeedback(`✨ +${pointsEarned} - Coherence Maintained!`, 'success');
        }
      }

      // After exhaleTime, run the next cycle
      exhaleTimeoutRef.current = setTimeout(() => {
        runBreathingCycle();
      }, exhaleTime);
    }, inhaleTime);
  }, [cognitiveLoad, playSound, showFeedback]);

  const startDrill = useCallback(() => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    if (isActiveRef.current) return;

    isActiveRef.current = true;
    setTimeLeft(180);
    setTotalBreaths(0);
    setScore(0);
    setCognitiveLoad(false);
    setShowNumber(false);
    setInstruction('');
    scoreRef.current = 0;
    breathsRef.current = 0;
    
    // Reset pacer
    if (pacerRef.current) {
      pacerRef.current.style.transform = 'scale(1)';
      pacerRef.current.style.transition = 'none';
    }
    
    // Clear any existing timeouts
    if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
    if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
    if (loadIntervalRef.current) clearInterval(loadIntervalRef.current);
    
    // Start the breath cycle
    runBreathingCycle();

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
          stopCognitiveLoad();
          isActiveRef.current = false;
          setInstruction('COMPLETE');
          playSound('complete');
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          showFeedback('🎯 Training Complete!', 'success');
          return 0;
        }
        
        const newTime = prev - 1;
        controlCognitiveLoad(newTime);
        return newTime;
      });
    }, 1000);
  }, [runBreathingCycle, stopCognitiveLoad, controlCognitiveLoad, playSound, showFeedback]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
    if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
    if (loadIntervalRef.current) clearInterval(loadIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setInstruction('');
    setTotalBreaths(0);
    setScore(0);
    setTimeLeft(180);
    setCognitiveLoad(false);
    setShowNumber(false);
    setFeedback('');
    
    scoreRef.current = 0;
    breathsRef.current = 0;
    
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
      if (loadIntervalRef.current) clearInterval(loadIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading stress inoculation drill...</p>
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
            "name": "Calm Under Pressure - Stress Inoculation Training",
            "url": "https://skilldrills.online/drills/mental-fitness/stress-control/calm-under-pressure",
            "description": "Dual-task stress inoculation drill combining 5:6 coherence breathing with cognitive load distractions. Random numbers flash during pressure phase. 2x points for maintaining coherence under load. 3-minute challenge.",
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
            "educationalUse": ["Stress Inoculation", "Cognitive Resilience", "Dual-Task Training", "Pressure Performance"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT3M",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Stress Management", "Cognitive Load Handling", "Coherence Under Pressure", "Resilience Building"]
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
            <li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">
              Calm Under Pressure
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Calm Under Pressure
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Stress inoculation • 5:6 breathing + cognitive load • 3-minute challenge
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button
                onClick={resetGame}
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`}
                title="Reset session"
                aria-label="Reset training session"
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
          <h2>Calm Under Pressure - Dual-Task Stress Inoculation Training</h2>
          <p>
            Build cognitive resilience with dual-task stress inoculation training.
            Maintain 5:6 coherence breathing (5s inhale, 6s exhale) while random numbers (1-9)
            flash every 3 seconds as cognitive distractions during the pressure phase (20s-140s).
            Earn 10 points per 5 breaths normally, and 20 points during cognitive load phase.
            3-minute session with cool-down period. Visual pacer changes color to red during load phase.
            Audio tones at 523Hz (inhale), 392Hz (exhale), and 880Hz (cognitive load alert).
            Improves focus under distraction and real-world stress resilience.
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
          <StatCard icon={<Activity className="text-blue-500" />} value={score} label="Resilience" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Wind className="text-cyan-500" />} value={totalBreaths} label="Breaths" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 60 ? 'text-red-500' : 'text-green-500'} />} value={updateTimerDisplay(timeLeft)} label="Time Left" isDark={isDarkMode} />
          <StatCard icon={<Brain className="text-purple-500" />} value={cognitiveLoad ? "ACTIVE" : "REST"} label="Load Phase" isDark={isDarkMode} />
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2 shadow-lg'}`}
          style={{ 
            background: isBoxDarkMode ? '#050505' : '#ffffff',
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
                  aria-label="Reset training session"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white" aria-label="Toggle dark mode">
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white" aria-label="Toggle drill area theme">
                  <Eye className="w-5 h-5" />
                </button>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white" aria-label="Toggle sound">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white" aria-label="Exit fullscreen">
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm" aria-live="polite">
                Score: <span className="text-yellow-400 font-bold">{score}</span> | Breaths: <span className="text-cyan-400 font-bold">{totalBreaths}</span> | Time: <span className="text-blue-400 font-bold">{updateTimerDisplay(timeLeft)}</span>
              </div>
            </>
          )}

          <div className="text-center">
            {/* Instruction Text */}
            <div 
              className="instruction"
              style={{
                fontSize: isFullscreen ? '2rem' : '1.4rem',
                height: isFullscreen ? '45px' : '32px',
                marginBottom: isFullscreen ? '35px' : '25px',
                letterSpacing: '3px',
                userSelect: 'none',
                color: cognitiveLoad ? '#ff6b6b' : (isBoxDarkMode ? '#00f2fe' : '#0284c7'),
                fontWeight: 'bold',
                transition: 'color 0.3s ease'
              }}
              aria-live="polite"
              aria-label={`Current phase: ${instruction}`}
            >
              {instruction}
            </div>

            {/* Pacer Ring Container */}
            <div 
              className="pacer-ring"
              style={{
                position: 'relative',
                width: isFullscreen ? '280px' : '200px',
                height: isFullscreen ? '280px' : '200px',
                border: `2px solid ${cognitiveLoad ? 'rgba(255, 107, 107, 0.3)' : (isBoxDarkMode ? 'rgba(0, 242, 254, 0.2)' : 'rgba(2, 132, 199, 0.2)')}`,
                borderRadius: '50%',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              aria-hidden="true"
            >
              {/* Cognitive Load Number Display */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: isFullscreen ? '4rem' : '3rem',
                  fontWeight: '800',
                  color: isBoxDarkMode ? '#ffffff' : '#000000',
                  opacity: showNumber ? 1 : 0,
                  transition: 'opacity 0.2s',
                  zIndex: 15,
                  pointerEvents: 'none'
                }}
                aria-live="assertive"
                aria-label={showNumber ? `Distraction number: ${currentNumber}` : ''}
              >
                {currentNumber}
              </div>

              {/* Pacer Circle */}
              <div 
                ref={pacerRef}
                style={{
                  width: isFullscreen ? '84px' : '60px',
                  height: isFullscreen ? '84px' : '60px',
                  background: cognitiveLoad ? '#ff6b6b' : (isBoxDarkMode ? '#00f2fe' : '#0284c7'),
                  borderRadius: '50%',
                  boxShadow: `0 0 30px ${cognitiveLoad ? 'rgba(255, 107, 107, 0.5)' : (isBoxDarkMode ? '#00f2fe' : '#0284c7')}`,
                  transition: 'transform linear, background 0.3s ease, box-shadow 0.3s ease'
                }}
              />
            </div>

            {/* Timer */}
            <div 
              className="timer"
              style={{
                marginTop: isFullscreen ? '50px' : '40px',
                fontSize: isFullscreen ? '2rem' : '1.4rem',
                letterSpacing: '2px',
                userSelect: 'none',
                opacity: 0.7,
                color: isBoxDarkMode ? '#ffffff' : '#000000'
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
                  if (loadIntervalRef.current) clearInterval(loadIntervalRef.current);
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
                aria-label="End training session early"
              >
                End Session
              </button>
            )}
          </div>

          {/* ============ START SCREEN ============ */}
          {gameState === 'start' && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(5,5,5,0.95)' : 'rgba(255,255,255,0.95)' }}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4">
                  <Brain className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Calm Under Pressure
                </h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  5:6 breathing + cognitive load • 3-minute challenge
                </p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Maintain breathing coherence while random numbers flash as distraction. 10pts/5 breaths normally, 20pts during load phase.
                </p>
                <button
                  onClick={startDrill}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label="Start stress inoculation training"
                >
                  Begin Training
                </button>
              </div>
            </div>
          )}

          {/* ============ GAME OVER SCREEN ============ */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(5,5,5,0.95)' : 'rgba(255,255,255,0.95)' }}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[520px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Award className="w-10 h-10 text-yellow-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Training Complete!
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Regular dual-task practice builds real-world cognitive resilience and stress tolerance.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Resilience Score" value={score} icon={<Activity className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Total Breaths" value={totalBreaths} icon={<Wind className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                  <ResultCard label="Duration" value="3:00" icon={<Timer className="w-4 h-4" />} color="green" isDark={isBoxDarkMode} />
                  <ResultCard label="Load Phase" value="120s" icon={<Brain className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Focus Level" value={Math.min(100, Math.floor(score / 2))} unit="%" icon={<TrendingUp className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/mental-fitness" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back to Mental Fitness
                    </button>
                  </Link>
                  <button
                    onClick={resetGame}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Train Again →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        {!isFullscreen && (
          <footer className="mt-6" aria-label="Cognitive resilience protocol instructions">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cognitive Resilience Protocol</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-purple-500">INHALE (5s)</span> - Circle expands, breathe in slowly</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-cyan-500">EXHALE (6s)</span> - Circle contracts, breathe out gently</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-orange-500">Load Phase (20s-140s)</span> - Numbers 1-9 flash every 3s</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">Dual-task training</span> - Breathe while noticing numbers</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">Scoring</span> - 10pts/5 breaths (rest), 20pts/5 breaths (load)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-pink-500">3-minute session</span> - Best score saves locally</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🧠 Improves focus under distraction • Builds real-world stress resilience</span>
                  <span>🎵 523Hz inhale • 392Hz exhale • 880Hz load alert tone</span>
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
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
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