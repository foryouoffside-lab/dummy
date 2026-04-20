'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, Eye,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Timer, Trophy, Brain, Activity, Info, TrendingUp
} from 'lucide-react';

export default function TranscendentalPulsePage() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pulseCycles, setPulseCycles] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showPrompt, setShowPrompt] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [combo, setCombo] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const timerIntervalRef = useRef(null);
  const cycleIntervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const isActiveRef = useRef(false);
  const comboRef = useRef(0);
  const scoreRef = useRef(0);
  const cyclesRef = useRef(0);
  const feedbackTimeoutRef = useRef(null);

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
    const savedBestScore = localStorage.getItem('transcendentalPulseBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('transcendentalPulseBestScore', score.toString());
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
      
      if (type === 'cycle') {
        oscillator.frequency.value = 432;
        gainNode.gain.value = 0.06;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.2);
        oscillator.stop(audioContext.currentTime + 0.2);
      } else if (type === 'combo') {
        oscillator.frequency.value = 660;
        gainNode.gain.value = 0.06;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      } else if (type === 'complete') {
        oscillator.frequency.value = 528;
        gainNode.gain.value = 0.08;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.3);
        oscillator.stop(audioContext.currentTime + 0.3);
      }
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = () => {
    setGameState('playing');
    
    // Clear any existing intervals
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
    
    // Reset refs
    isActiveRef.current = true;
    comboRef.current = 0;
    scoreRef.current = 0;
    cyclesRef.current = 0;
    
    // Reset state
    setIsActive(true);
    setScore(0);
    setPulseCycles(0);
    setCombo(0);
    setTimeElapsed(0);
    setShowPrompt(true);
    startTimeRef.current = Date.now();
    
    // Hide prompt after 10 seconds
    setTimeout(() => {
      if (isActiveRef.current) {
        setShowPrompt(false);
      }
    }, 10000);
    
    // Cycle every 15 seconds
    cycleIntervalRef.current = setInterval(() => {
      if (!isActiveRef.current) return;
      
      cyclesRef.current += 1;
      setPulseCycles(cyclesRef.current);
      
      const basePoints = 2;
      const comboBonus = Math.floor(comboRef.current / 4);
      const pointsEarned = basePoints + comboBonus;
      
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      
      comboRef.current += 1;
      setCombo(comboRef.current);
      
      if (comboRef.current > 0 && comboRef.current % 4 === 0) {
        playSound('combo');
        showFeedback(`ðŸ”¥ ${comboRef.current} Cycle Combo! +${comboBonus}`, 'success');
      } else {
        playSound('cycle');
      }
    }, 15000);
    
    // Timer to track elapsed time
    timerIntervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setTimeElapsed(elapsed);
    }, 1000);
  };

  const stopSession = () => {
    isActiveRef.current = false;
    setIsActive(false);
    setGameState('gameOver');
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setIsActive(false);
    setGameState('start');
    setPulseCycles(0);
    setScore(0);
    setCombo(0);
    setTimeElapsed(0);
    setShowPrompt(true);
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
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
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Transcendental Pulse</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Deep meditation with neural frequency pacing</p>
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
          <StatCard icon={<Brain className="text-purple-500" />} value={score} label="Transcendence" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className="text-blue-500" />} value={formatTime(timeElapsed)} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-cyan-500" />} value={pulseCycles} label="Cycles" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-pink-500" />} value={combo} label="Combo" isDark={isDarkMode} />
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
                <span>Cycles: <span className="text-cyan-400 font-bold">{pulseCycles}</span></span>
                <span>Combo: <span className="text-pink-400 font-bold">{combo}</span></span>
              </div>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl z-10 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(5,5,5,0.95)' : 'rgba(255,255,255,0.95)' }}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Brain className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Transcendental Pulse</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Deep meditation with neural frequency pacing</p>
                  <button
                    onClick={startSession}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Begin Meditation
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && (
              <>
                {/* Initial Prompt */}
                {showPrompt && (
                  <div
                    className="initial-prompt"
                    style={{
                      position: 'absolute',
                      color: isBoxDarkMode ? '#a78bfa' : '#8b5cf6',
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: '10px',
                      fontSize: isFullscreen ? '1rem' : '0.7rem',
                      textTransform: 'uppercase',
                      animation: 'fadeAway 10s forwards',
                      zIndex: 20,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -150%)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Release Effort
                  </div>
                )}

                {/* The Neural Pulse Orb */}
                <div
                  className="pulse-orb"
                  style={{
                    width: isFullscreen ? '200px' : '120px',
                    height: isFullscreen ? '200px' : '120px',
                    background: `radial-gradient(circle, ${isBoxDarkMode ? 'rgba(168, 85, 247, 0.3)' : 'rgba(147, 51, 234, 0.2)'} 0%, transparent 70%)`,
                    borderRadius: '50%',
                    filter: `blur(${isFullscreen ? '40px' : '30px'})`,
                    animation: 'transcendentalCycle 15s infinite ease-in-out',
                    position: 'absolute'
                  }}
                ></div>

                {/* Stop Button */}
                <button
                  onClick={stopSession}
                  className="absolute bottom-8 px-6 py-2 rounded-full text-sm transition-all hover:border-red-500 hover:text-red-500"
                  style={{
                    background: 'transparent',
                    border: `1px solid ${isBoxDarkMode ? '#333' : '#ddd'}`,
                    color: isBoxDarkMode ? '#666' : '#999'
                  }}
                >
                  End Session
                </button>
              </>
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
                    <ResultCard label="Transcendence Score" value={score} icon={<Brain className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Pulse Cycles" value={pulseCycles} icon={<Activity className="w-4 h-4" />} color="text-cyan-500" />
                    <ResultCard label="Session Duration" value={formatTime(timeElapsed)} icon={<Timer className="w-4 h-4" />} color="text-blue-500" />
                    <ResultCard label="Max Combo" value={combo} icon={<TrendingUp className="w-4 h-4" />} color="text-pink-500" />
                    <ResultCard label="Meditation Depth" value={Math.min(100, Math.floor(score * 2))} unit="%" icon={<Brain className="w-4 h-4" />} color="text-indigo-500" />
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
        </div>

        {/* Instructions */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Meditation Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Watch the orb <span className="font-semibold text-purple-500">expand and contract</span> in 15-second cycles</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Build <span className="font-semibold text-green-500">combos</span> for bonus points (every 4 cycles adds bonus)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Base score: <span className="font-semibold text-yellow-500">2 points per pulse cycle</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-cyan-500">Release all effort</span> - just observe the natural rhythm</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-orange-500">432Hz audio cues</span> at each pulse peak</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Continue for as long as you'd like to <span className="font-semibold text-pink-500">deepen meditation</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>ðŸ§˜ Deepens meditative states through rhythmic entrainment</span>
                  <span>ðŸŽµ 432Hz frequency promotes relaxation and focus</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes transcendentalCycle {
          0%, 100% { transform: scale(0.8); opacity: 0.15; }
          50% { transform: scale(3.5); opacity: 0.5; }
        }
        
        @keyframes fadeAway {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
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
  const bgColor = color === 'text-purple-500' ? 'bg-purple-500/10' : 
                   color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
                   color === 'text-blue-500' ? 'bg-blue-500/10' :
                   color === 'text-pink-500' ? 'bg-pink-500/10' : 'bg-indigo-500/10';
  
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