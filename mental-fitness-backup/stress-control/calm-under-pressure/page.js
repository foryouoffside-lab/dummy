'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, TrendingUp, Wind, Brain, Info, Trophy
} from 'lucide-react';

export default function CalmUnderPressurePage() {
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
  
  const isActiveRef = useRef(false);
  const timerIntervalRef = useRef(null);
  const inhaleTimeoutRef = useRef(null);
  const exhaleTimeoutRef = useRef(null);
  const loadIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const breathsRef = useRef(0);
  
  const inhaleTime = 5000;
  const exhaleTime = 6000;

  const cleanButtonClass = "outline-none focus:outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus:ring-transparent select-none active:outline-none shadow-none";

  // Show feedback
  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 600);
  };

  // Check authentication
  useEffect(() => {
    } else if (status === 'authenticated') {
      setLoading(false);
    } else if (status === 'loading') {
      setLoading(true);
    }
  }, [status, router]);

  // Load best score
  useEffect(() => {
    const savedBestScore = localStorage.getItem('calmUnderPressureBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('calmUnderPressureBestScore', score.toString());
      showFeedback(`ðŸ† New Record! ${score}`, 'success');
    }
  }, [gameState, score, bestScore]);

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

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Play sound effect
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (type === 'inhale') {
        oscillator.frequency.value = 523.25;
        gainNode.gain.value = 0.08;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.2);
        oscillator.stop(audioContext.currentTime + 0.2);
      } else if (type === 'exhale') {
        oscillator.frequency.value = 392.00;
        gainNode.gain.value = 0.08;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.3);
        oscillator.stop(audioContext.currentTime + 0.3);
      } else if (type === 'load') {
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.06;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.1);
        oscillator.stop(audioContext.currentTime + 0.1);
      } else if (type === 'complete') {
        oscillator.frequency.value = 1046.5;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.3);
        oscillator.stop(audioContext.currentTime + 0.3);
      }
    } catch (e) {
      // Ignore audio errors
    }
  };

  const updateTimerDisplay = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startCognitiveLoad = () => {
    if (loadIntervalRef.current) return;
    
    setCognitiveLoad(true);
    showFeedback(`ðŸ§  Cognitive Load Active!`, 'warning');
    
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
  };

  const stopCognitiveLoad = () => {
    if (loadIntervalRef.current) {
      clearInterval(loadIntervalRef.current);
      loadIntervalRef.current = null;
    }
    setCognitiveLoad(false);
    setShowNumber(false);
    showFeedback(`ðŸ§˜ Cognitive Load Ended`, 'success');
  };

  const controlCognitiveLoad = (currentTimeLeft) => {
    const elapsed = 180 - currentTimeLeft;
    // Pressure window: 20s to 140s
    const inLoadWindow = elapsed > 20 && elapsed < 140;
    
    if (inLoadWindow && !loadIntervalRef.current) {
      startCognitiveLoad();
    } else if (!inLoadWindow && loadIntervalRef.current) {
      stopCognitiveLoad();
    }
  };

  function runBreathingCycle() {
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
        // Bonus points for maintaining coherence under cognitive load
        const pointsEarned = cognitiveLoad ? 20 : 10;
        scoreRef.current += pointsEarned;
        setScore(scoreRef.current);
        if (cognitiveLoad) {
          showFeedback(`ðŸ’ª +${pointsEarned} - Maintained Under Load!`, 'success');
        } else {
          showFeedback(`âœ¨ +${pointsEarned} - Coherence Maintained!`, 'success');
        }
      }

      // After exhaleTime, run the next cycle
      exhaleTimeoutRef.current = setTimeout(() => {
        runBreathingCycle();
      }, exhaleTime);
    }, inhaleTime);
  }

  function startDrill() {
    setGameState('playing');
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
          // End drill
          clearInterval(timerIntervalRef.current);
          if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
          if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
          stopCognitiveLoad();
          isActiveRef.current = false;
          setInstruction('COMPLETE');
          playSound('complete');
          setGameState('gameOver');
          showFeedback(`ðŸŽ¯ Training Complete!`, 'success');
          return 0;
        }
        
        const newTime = prev - 1;
        controlCognitiveLoad(newTime);
        return newTime;
      });
    }, 1000);
  }

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
    if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
    if (loadIntervalRef.current) clearInterval(loadIntervalRef.current);
    isActiveRef.current = false;
    setGameState('start');
    setInstruction('');
    setTotalBreaths(0);
    setScore(0);
    setTimeLeft(180);
    setCognitiveLoad(false);
    setShowNumber(false);
    if (pacerRef.current) {
      pacerRef.current.style.transform = 'scale(1)';
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
      if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
      if (loadIntervalRef.current) clearInterval(loadIntervalRef.current);
    };
  }, []);

  // Show loading state
  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
    return null;
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/drills/mental-fitness" className={`inline-flex items-center gap-2 mb-4 outline-none ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" />
            Back to Mental Fitness
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Calm Under Pressure</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Maintain coherence under cognitive load</p>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition shadow-sm border transition-all hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsBoxDarkMode(!isBoxDarkMode)}
                className={`p-2 rounded-lg transition shadow-sm border transition-all hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
                title={isBoxDarkMode ? 'Light Box' : 'Dark Box'}
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition shadow-sm border transition-all hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
                title={soundEnabled ? 'Mute' : 'Unmute'}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className={`p-2 rounded-lg transition shadow-sm border transition-all hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-orange-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Drill-specific stats board */}
        <div className="grid grid-cols-5 gap-3 mb-6 h-[88px]">
          <StatCard icon={<Activity className="text-blue-500" />} value={score} label="Resilience Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
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
            aspectRatio: '16/9',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb'
          }}
        >
          {/* Fullscreen Controls Overlay */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition text-white"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsBoxDarkMode(!isBoxDarkMode)}
                className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition text-white"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition text-white"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition text-white"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Stats Overlay for Fullscreen */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
              <div className="flex gap-4">
                <span>Score: <span className="text-yellow-400 font-bold">{score}</span></span>
                <span>Breaths: <span className="text-cyan-400 font-bold">{totalBreaths}</span></span>
                <span>Time: <span className="text-blue-400 font-bold">{updateTimerDisplay(timeLeft)}</span></span>
              </div>
            </div>
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
                alignItems: 'center',
                position: 'relative'
              }}
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
                  transition: 'transform linear, background 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'none'
                }}
              ></div>
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
                }}
                className="mt-8 px-6 py-2 rounded-full text-sm transition-all hover:border-red-500 hover:text-red-500"
                style={{
                  background: 'transparent',
                  border: `1px solid ${isBoxDarkMode ? '#333' : '#ddd'}`,
                  color: isBoxDarkMode ? '#666' : '#999'
                }}
              >
                End Session
              </button>
            )}
          </div>

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(5,5,5,0.95)' : 'rgba(255,255,255,0.95)' }}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Brain className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Calm Under Pressure</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Maintain coherence under cognitive load - 3 minute challenge</p>
                <button
                  onClick={startDrill}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Begin Training
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(5,5,5,0.95)' : 'rgba(255,255,255,0.95)' }}>
              <div className={`rounded-2xl p-8 shadow-xl border w-[520px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Training Complete!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Resilience Score" value={score} icon={<Activity className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Total Breaths" value={totalBreaths} icon={<Wind className="w-4 h-4" />} color="text-cyan-500" />
                  <ResultCard label="Session Duration" value="3:00" icon={<Timer className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Cognitive Load" value="120s" icon={<Brain className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Focus Under Pressure" value={Math.min(100, Math.floor(score / 2))} unit="%" icon={<TrendingUp className="w-4 h-4" />} color="text-orange-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/mental-fitness" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      â† Back
                    </button>
                  </Link>
                  <button
                    onClick={resetGame}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Main Menu
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cognitive Resilience Protocol</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-purple-500">INHALE (5 seconds)</span> - Watch the circle expand, follow with your breath</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-cyan-500">EXHALE (6 seconds)</span> - Watch the circle contract, breathe out slowly</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-orange-500">Cognitive Load Phase (20s - 140s)</span> - Random numbers (1-9) appear every 3 seconds</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">Dual-task training</span> - Maintain breathing rhythm while noticing numbers</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">Scoring</span> - 10 points per 5 breaths normally, 20 points during cognitive load</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-pink-500">3-minute session</span> - Build cognitive resilience under pressure</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>ðŸ§  Improves focus under distraction and cognitive flexibility</span>
                  <span>ðŸŽµ 523Hz inhale â€¢ 392Hz exhale â€¢ 880Hz load tone</span>
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
  const bgColor = color === 'text-blue-500' ? 'bg-blue-500/10' : 
                   color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 'bg-orange-500/10';
  
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