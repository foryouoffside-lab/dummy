'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Scan, Trophy, Target, Brain, Info, TrendingUp
} from 'lucide-react';

export default function SensoryScanPage() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [currentInstruction, setCurrentInstruction] = useState('INITIALIZING SENSORS...');
  const [progress, setProgress] = useState(0);
  const [nodeScale, setNodeScale] = useState(0.5);
  const [itemsCompleted, setItemsCompleted] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [combo, setCombo] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const comboRef = useRef(0);
  const scoreRef = useRef(0);
  const itemsCompletedRef = useRef(0);
  const feedbackTimeoutRef = useRef(null);
  
  const database = [
    { text: "Find the smallest text in your visual field", size: 0.5, category: "Visual" },
    { text: "Identify 3 items that are the same color", size: 2.5, category: "Visual" },
    { text: "Notice the way light reflects off a surface", size: 1.8, category: "Visual" },
    { text: "Isolate the sound of your own breathing", size: 0.8, category: "Auditory" },
    { text: "Listen for a hum or buzz of electronics", size: 1.2, category: "Auditory" },
    { text: "Find the quietest sound in the room", size: 0.4, category: "Auditory" },
    { text: "Feel the texture of your clothing on your skin", size: 2.0, category: "Tactile" },
    { text: "Notice the temperature of the air on your face", size: 1.5, category: "Tactile" },
    { text: "Feel the weight of your hands in your lap", size: 2.2, category: "Tactile" },
    { text: "Expand your awareness to the walls behind you", size: 3.5, category: "Spatial" },
    { text: "Estimate the distance between you and the door", size: 2.8, category: "Spatial" },
    { text: "Notice which of your muscles is most relaxed", size: 1.1, category: "Tactile" },
    { text: "Slowly wiggle your toes and feel each one", size: 0.9, category: "Tactile" }
  ];

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
    const savedBestScore = localStorage.getItem('sensoryScanBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('sensoryScanBestScore', score.toString());
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
      
      if (type === 'transition') {
        oscillator.frequency.value = 523.25;
        gainNode.gain.value = 0.08;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.15);
        oscillator.stop(audioContext.currentTime + 0.15);
      } else if (type === 'complete') {
        oscillator.frequency.value = 1046.5;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.3);
        oscillator.stop(audioContext.currentTime + 0.3);
      } else if (type === 'combo') {
        oscillator.frequency.value = 660;
        gainNode.gain.value = 0.06;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      }
    } catch (e) {
      // Ignore audio errors
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const runStep = (pool, index) => {
    if (!isActiveRef.current) return;
    
    if (index >= pool.length) {
      const newPool = [...database].sort(() => 0.5 - Math.random());
      runStep(newPool, 0);
      return;
    }

    const data = pool[index];
    setCurrentInstruction(data.text);
    setNodeScale(data.size);
    setProgress(0);
    
    playSound('transition');
    
    // Award points for each scan
    const basePoints = 10;
    const comboBonus = Math.floor(comboRef.current / 5);
    const pointsEarned = basePoints + comboBonus;
    
    scoreRef.current += pointsEarned;
    setScore(scoreRef.current);
    
    itemsCompletedRef.current += 1;
    setItemsCompleted(itemsCompletedRef.current);
    
    comboRef.current += 1;
    setCombo(comboRef.current);
    
    if (comboRef.current > 0 && comboRef.current % 5 === 0) {
      playSound('combo');
      showFeedback(`ðŸ”¥ ${comboRef.current} Scan Combo! +${comboBonus}`, 'success');
    }
    
    const duration = 8000;
    const interval = 20;
    let currentProgress = 0;
    
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    progressIntervalRef.current = setInterval(() => {
      if (!isActiveRef.current) return;
      currentProgress += (interval / duration) * 100;
      setProgress(Math.min(100, currentProgress));
      
      if (currentProgress >= 100) {
        clearInterval(progressIntervalRef.current);
        runStep(pool, index + 1);
      }
    }, interval);
  };

  const startSession = () => {
    setGameState('playing');
    setIsActive(true);
    isActiveRef.current = true;
    comboRef.current = 0;
    scoreRef.current = 0;
    itemsCompletedRef.current = 0;
    setScore(0);
    setItemsCompleted(0);
    setCombo(0);
    setProgress(0);
    setTimeRemaining(600);
    
    const sessionPool = [...database].sort(() => 0.5 - Math.random());
    runStep(sessionPool, 0);
    
    // Countdown timer
    countdownIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          stopSession();
          setGameState('gameOver');
          playSound('complete');
          showFeedback(`ðŸŽ¯ Session Complete! +10 Bonus`, 'success');
          scoreRef.current += 10;
          setScore(scoreRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    timerRef.current = setTimeout(() => {
      if (isActiveRef.current) {
        stopSession();
        setGameState('gameOver');
        playSound('complete');
      }
    }, 600000);
  };

  const stopSession = () => {
    isActiveRef.current = false;
    setIsActive(false);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
  };

  const resetGame = () => {
    stopSession();
    setGameState('start');
    setCurrentInstruction('INITIALIZING SENSORS...');
    setProgress(0);
    setNodeScale(0.5);
    setItemsCompleted(0);
    setScore(0);
    setCombo(0);
    setTimeRemaining(600);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  // Show loading state
  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                <Scan className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sensory Scan Meditation</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Professional sensory awareness training</p>
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
          <StatCard icon={<Brain className="text-emerald-500" />} value={score} label="Awareness Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 60 ? 'text-red-500' : 'text-blue-500'} />} value={formatTime(timeRemaining)} label="Time Left" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-cyan-500" />} value={itemsCompleted} label="Scans" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-purple-500" />} value={combo} label="Combo" isDark={isDarkMode} />
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2 shadow-lg'}`}
          style={{ 
            background: isBoxDarkMode ? '#050505' : '#ffffff',
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
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
                <span>Scans: <span className="text-cyan-400 font-bold">{itemsCompleted}</span></span>
                <span>Combo: <span className="text-purple-400 font-bold">{combo}</span></span>
              </div>
            </div>
          )}

          <div className="text-center" style={{ width: isFullscreen ? '700px' : '500px', padding: '40px' }}>
            {/* Target Ring */}
            <div
              className="target-ring"
              style={{
                width: isFullscreen ? '260px' : '180px',
                height: isFullscreen ? '260px' : '180px',
                border: `1px solid ${isBoxDarkMode ? 'rgba(0, 242, 254, 0.15)' : 'rgba(2, 132, 199, 0.15)'}`,
                borderRadius: '50%',
                margin: '0 auto 50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              {/* Focus Node */}
              <div
                id="focus-node"
                style={{
                  width: isFullscreen ? '22px' : '15px',
                  height: isFullscreen ? '22px' : '15px',
                  background: isBoxDarkMode ? '#00f2fe' : '#0284c7',
                  borderRadius: '50%',
                  boxShadow: `0 0 25px ${isBoxDarkMode ? '#00f2fe' : '#0284c7'}`,
                  transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: `scale(${nodeScale})`
                }}
              ></div>
            </div>

            {/* Instruction Text */}
            <div
              id="instruction"
              style={{
                fontSize: isFullscreen ? '2rem' : '1.4rem',
                fontWeight: '300',
                lineHeight: '1.6',
                height: isFullscreen ? '140px' : '100px',
                marginBottom: '30px',
                color: isBoxDarkMode ? '#f8fafc' : '#1f2937',
                letterSpacing: '0.5px'
              }}
            >
              {currentInstruction}
            </div>

            {/* Timer Bar */}
            <div
              className="timer-bar"
              style={{
                width: '100%',
                height: '2px',
                background: isBoxDarkMode ? '#111' : '#e5e7eb',
                position: 'relative'
              }}
            >
              <div
                id="fill"
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: isBoxDarkMode ? '#00f2fe' : '#0284c7',
                  transition: 'width 0.02s linear'
                }}
              ></div>
            </div>

            {/* Stop Button */}
            {gameState === 'playing' && (
              <button
                onClick={() => {
                  stopSession();
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
                <Scan className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Sensory Scan Meditation</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Professional sensory awareness training - 10 minutes</p>
                <button
                  onClick={startSession}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Begin Scan
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
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Awareness Score" value={score} icon={<Brain className="w-4 h-4" />} color="text-emerald-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Scans Completed" value={itemsCompleted} icon={<Activity className="w-4 h-4" />} color="text-cyan-500" />
                  <ResultCard label="Session Duration" value="10:00" icon={<Timer className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Max Combo" value={combo} icon={<TrendingUp className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Sensory Awareness" value={Math.min(100, Math.floor(score / 3))} unit="%" icon={<Scan className="w-4 h-4" />} color="text-teal-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/mental-fitness" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      â† Back
                    </button>
                  </Link>
                  <button
                    onClick={resetGame}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sensory Scan Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-emerald-500">ðŸ‘ï¸ Visual awareness</span> - Scan for text, colors, light reflections, distances</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-blue-500">ðŸ‘‚ Auditory attention</span> - Listen for breathing, electronics, quietest sounds</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-purple-500">ðŸ–ï¸ Tactile sensation</span> - Feel textures, temperature, weight, relaxation</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-cyan-500">ðŸ§  Spatial awareness</span> - Expand awareness to environment, estimate distances</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>â­ Earn <span className="font-semibold text-yellow-500">10 points per scan</span> + combo bonuses every 5 scans</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>ðŸŽ¯ The <span className="font-semibold text-pink-500">pulsing circle scales</span> to guide your attention focus</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>ðŸ§˜ Builds comprehensive sensory awareness across all modalities</span>
                  <span>ðŸ”„ Tasks shuffle randomly for adaptive training</span>
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
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
                   color === 'text-blue-500' ? 'bg-blue-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 'bg-teal-500/10';
  
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