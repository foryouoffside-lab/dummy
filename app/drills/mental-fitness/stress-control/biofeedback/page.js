'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, TrendingUp, Wind, Brain, Info, Trophy, RefreshCw
} from 'lucide-react';

export default function CoherenceDrillPage() {
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
  
  const isActiveRef = useRef(false);
  const timerIntervalRef = useRef(null);
  const inhaleTimeoutRef = useRef(null);
  const exhaleTimeoutRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  
  const inhaleTime = 5000;
  const exhaleTime = 6000;

  const cleanButtonClass = "outline-none focus:outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus:ring-transparent select-none active:outline-none shadow-none";

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

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

  // Load best breaths record
  useEffect(() => {
    const savedBestBreaths = localStorage.getItem('coherenceBreathingBestBreaths');
    if (savedBestBreaths) {
      setBestBreaths(parseInt(savedBestBreaths));
    }
  }, []);

  // Update best breaths record
  useEffect(() => {
    if (gameState === 'gameOver' && totalBreaths > bestBreaths) {
      setBestBreaths(totalBreaths);
      localStorage.setItem('coherenceBreathingBestBreaths', totalBreaths.toString());
      showFeedback(`🏆 New Record! ${totalBreaths} breaths`, 'success');
    }
  }, [gameState, totalBreaths, bestBreaths]);

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
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  function runCycle() {
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
        // Show milestone feedback
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
  }

  function startDrill() {
    setGameState('playing');
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
          // End drill
          clearInterval(timerIntervalRef.current);
          if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
          if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
          isActiveRef.current = false;
          setInstruction('COMPLETE');
          playSound('complete');
          setGameState('gameOver');
          showFeedback(`🎯 Session Complete!`, 'success');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
    if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
    isActiveRef.current = false;
    setGameState('start');
    setInstruction('');
    setTotalBreaths(0);
    setTimeLeft(300);
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
    };
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
          <Link href="/drills/mental-fitness" className={`inline-flex items-center gap-2 mb-4 outline-none ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" />
            Back to Mental Fitness
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Coherence Breathing</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>5:6 breath ratio • 5 min session • Track your progress</p>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button
                  onClick={resetGame}
                  className={`p-2 rounded-lg transition shadow-sm border transition-all hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                      : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                  title="Reset session"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
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
        <div className="grid grid-cols-4 gap-3 mb-6 h-[88px]">
          <StatCard icon={<Wind className="text-cyan-500" />} value={totalBreaths} label="Total Breaths" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestBreaths} label="Best Session" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 60 ? 'text-red-500' : 'text-blue-500'} />} value={updateTimerDisplay(timeLeft)} label="Time Left" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-purple-500" />} value="5:6" label="Breath Ratio" isDark={isDarkMode} />
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2 shadow-lg'}`}
          style={{ 
            background: isBoxDarkMode ? '#0a0a1a' : '#f0f9ff',
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
                fontSize: isFullscreen ? '2rem' : '1.3rem',
                height: isFullscreen ? '40px' : '28px',
                marginBottom: isFullscreen ? '40px' : '30px',
                letterSpacing: '2px',
                userSelect: 'none',
                color: isBoxDarkMode ? '#38bdf8' : '#0284c7',
                fontWeight: 'bold'
              }}
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
              ></div>

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
                  transition: 'transform linear',
                  cursor: 'none'
                }}
              ></div>
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
            <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(240,249,255,0.95)' }}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Wind className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Coherence Breathing</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>5:6 breath ratio • 5 min session • Track your progress</p>
                <button
                  onClick={startDrill}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Begin Breathing
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(240,249,255,0.95)' }}>
              <div className={`rounded-2xl p-8 shadow-xl border w-[520px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Total Breaths" value={totalBreaths} icon={<Wind className="w-4 h-4" />} color="text-cyan-500" />
                  <ResultCard label="Best Session" value={bestBreaths} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Session Duration" value="5:00" icon={<Timer className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Breath Ratio" value="5:6" icon={<TrendingUp className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Coherence Level" value={Math.min(100, Math.floor(totalBreaths / 3))} unit="%" icon={<Brain className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Heart Rate Sync" value={totalBreaths > 50 ? "High" : totalBreaths > 25 ? "Medium" : "Building"} icon={<Activity className="w-4 h-4" />} color="text-orange-500" />
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={resetGame}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={startDrill}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Coherence Breathing Protocol</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-cyan-500">INHALE (5 seconds)</span> - Watch the circle expand, follow with your breath</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-blue-500">EXHALE (6 seconds)</span> - Watch the circle contract, breathe out slowly</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-purple-500">5:6 breath ratio</span> - Proven optimal for heart rate coherence</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">Audio guidance</span> - Gentle tones mark inhale/exhale transitions</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">Mindfulness focus</span> - Pure presence, no pressure</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-orange-500">5-minute session</span> - Complete the full duration for best results</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>💓 Optimizes heart rate variability and vagal tone</span>
                  <span>🎵 523Hz inhale tone • 392Hz exhale tone</span>
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
  const bgColor = color === 'text-cyan-500' ? 'bg-cyan-500/10' : 
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