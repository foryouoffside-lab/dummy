'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, Clock, Eye,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Timer, Trophy, Flame, Wind, Brain, Info, TrendingUp
} from 'lucide-react';

export default function WHMPowerPage() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [action, setAction] = useState('READY');
  const [breathCount, setBreathCount] = useState(0);
  const [subData, setSubData] = useState('BREATH 0 / 30');
  const [nodeScale, setNodeScale] = useState(1);
  const [nodeOpacity, setNodeOpacity] = useState(1);
  const [showTimer, setShowTimer] = useState(false);
  const [retentionTime, setRetentionTime] = useState(0);
  const [bestRetention, setBestRetention] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [combo, setCombo] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const targetBreaths = 30;
  const timerIntervalRef = useRef(null);
  const breathTimeoutRef = useRef(null);
  const retentionStartRef = useRef(0);
  const isActiveRef = useRef(false);
  const breathCountRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
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

  // Load best score and best retention
  useEffect(() => {
    const savedBestScore = localStorage.getItem('whmPowerBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
    const savedBestRetention = localStorage.getItem('whmPowerBestRetention');
    if (savedBestRetention) {
      setBestRetention(parseInt(savedBestRetention));
    }
  }, []);

  // Update best score and best retention
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('whmPowerBestScore', score.toString());
      showFeedback(`🏆 New Record! ${score}`, 'success');
    }
    if (retentionTime > bestRetention && retentionTime > 0) {
      setBestRetention(retentionTime);
      localStorage.setItem('whmPowerBestRetention', retentionTime.toString());
    }
  }, [gameState, score, bestScore, retentionTime, bestRetention]);

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
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.08;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.15);
        oscillator.stop(audioContext.currentTime + 0.15);
      } else if (type === 'exhale') {
        oscillator.frequency.value = 660;
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
      console.log('Audio error:', e);
    }
  };

  const formatRetentionTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const performInhale = () => {
    if (!isActiveRef.current) return;
    
    setAction("INHALE");
    setNodeScale(5);
    setNodeOpacity(1);
    playSound('inhale');
    
    breathTimeoutRef.current = setTimeout(() => {
      performExhale();
    }, 1500);
  };

  const performExhale = () => {
    if (!isActiveRef.current) return;
    
    setAction("EXHALE");
    setNodeScale(1);
    playSound('exhale');
    
    // Increment breath count
    const newCount = breathCountRef.current + 1;
    breathCountRef.current = newCount;
    setBreathCount(newCount);
    setSubData(`BREATH ${newCount} / ${targetBreaths}`);
    
    comboRef.current += 1;
    setCombo(comboRef.current);
    
    // Award points with combo bonus
    const basePoints = 1;
    const comboBonus = Math.floor(comboRef.current / 5) * 1;
    const pointsEarned = basePoints + comboBonus;
    
    scoreRef.current += pointsEarned;
    setScore(scoreRef.current);
    
    if (comboRef.current > 0 && comboRef.current % 5 === 0) {
      playSound('combo');
      showFeedback(`🔥 ${comboRef.current} Breath Combo! +${comboBonus}`, 'success');
    }
    
    // Check if we should continue or enter retention
    if (newCount < targetBreaths) {
      breathTimeoutRef.current = setTimeout(() => {
        performInhale();
      }, 1500);
    } else {
      breathTimeoutRef.current = setTimeout(() => {
        enterRetention();
      }, 1500);
    }
  };

  const enterRetention = () => {
    if (!isActiveRef.current) return;
    
    setAction("HOLD");
    setSubData("RETENTION - LUNGS EMPTY");
    setNodeOpacity(0.1);
    setNodeScale(0.8);
    setShowTimer(true);
    playSound('complete');
    
    // Award completion bonus
    scoreRef.current += 30;
    setScore(scoreRef.current);
    showFeedback(`🎯 Complete! +30 Bonus`, 'success');
    
    retentionStartRef.current = Date.now();
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - retentionStartRef.current) / 1000);
      setRetentionTime(elapsed);
    }, 100);
  };

  const resetDrill = () => {
    isActiveRef.current = false;
    setIsActive(false);
    setBreathCount(0);
    breathCountRef.current = 0;
    setAction('READY');
    setSubData('BREATH 0 / 30');
    setNodeScale(1);
    setNodeOpacity(1);
    setShowTimer(false);
    setRetentionTime(0);
    setCombo(0);
    comboRef.current = 0;
    
    if (breathTimeoutRef.current) clearTimeout(breathTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const startDrill = () => {
    setGameState('playing');
    if (breathTimeoutRef.current) clearTimeout(breathTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setScore(0);
    scoreRef.current = 0;
    setBreathCount(0);
    breathCountRef.current = 0;
    setCombo(0);
    comboRef.current = 0;
    setAction('INHALE');
    setSubData('BREATH 0 / 30');
    setNodeScale(1);
    setNodeOpacity(1);
    setShowTimer(false);
    setRetentionTime(0);
    
    isActiveRef.current = true;
    setIsActive(true);
    
    setTimeout(() => {
      if (isActiveRef.current) {
        performInhale();
      }
    }, 300);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      if (breathTimeoutRef.current) clearTimeout(breathTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Show loading state
  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>WHM Power Breathing</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Wim Hof Method - 30 power breaths + retention</p>
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
          <StatCard icon={<Flame className="text-orange-500" />} value={score} label="Power Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className="text-blue-500" />} value={formatRetentionTime(retentionTime)} label="Retention" isDark={isDarkMode} />
          <StatCard icon={<Wind className="text-green-500" />} value={`${breathCount}/30`} label="Breaths" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-purple-500" />} value={combo} label="Combo" isDark={isDarkMode} />
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2 shadow-lg'}`}
          style={{ 
            background: isBoxDarkMode ? '#030303' : '#ffffff',
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
                <span>Breaths: <span className="text-green-400 font-bold">{breathCount}/30</span></span>
                <span>Combo: <span className="text-purple-400 font-bold">{combo}</span></span>
              </div>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl z-10 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(3,3,3,0.95)' : 'rgba(255,255,255,0.95)' }}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Flame className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>WHM Power Breathing</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>30 power breaths + retention • Wim Hof Method</p>
                  <button
                    onClick={startDrill}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Breathing
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && (
              <div className="text-center" style={{ width: isFullscreen ? '550px' : '400px' }}>
                {/* Action Label */}
                <div
                  id="action-label"
                  style={{
                    fontSize: isFullscreen ? '3rem' : '2.2rem',
                    fontWeight: '200',
                    letterSpacing: '8px',
                    height: isFullscreen ? '85px' : '65px',
                    color: isBoxDarkMode ? '#ffffff' : '#000000',
                    textTransform: 'uppercase'
                  }}
                >
                  {action}
                </div>

                {/* Pacer Ring */}
                <div
                  className="pacer-ring"
                  style={{
                    width: isFullscreen ? '260px' : '180px',
                    height: isFullscreen ? '260px' : '180px',
                    border: `1px solid ${isBoxDarkMode ? 'rgba(0, 212, 255, 0.1)' : 'rgba(2, 132, 199, 0.15)'}`,
                    borderRadius: '50%',
                    margin: '0 auto 50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                  }}
                >
                  {/* Node */}
                  <div
                    id="node"
                    style={{
                      width: isFullscreen ? '45px' : '30px',
                      height: isFullscreen ? '45px' : '30px',
                      background: isBoxDarkMode ? '#00d4ff' : '#0284c7',
                      borderRadius: '50%',
                      boxShadow: `0 0 35px ${isBoxDarkMode ? '#00d4ff' : '#0284c7'}`,
                      transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.5s ease',
                      transform: `scale(${nodeScale})`,
                      opacity: nodeOpacity
                    }}
                  ></div>
                </div>

                {/* Timer Display */}
                <div
                  id="timer"
                  style={{
                    fontSize: isFullscreen ? '5rem' : '3.5rem',
                    fontFamily: 'monospace',
                    fontWeight: '100',
                    display: showTimer ? 'block' : 'none',
                    color: isBoxDarkMode ? '#ffffff' : '#000000'
                  }}
                >
                  {formatRetentionTime(retentionTime)}
                </div>

                {/* Sub Data */}
                <div
                  id="sub-data"
                  style={{
                    fontSize: isFullscreen ? '1rem' : '0.8rem',
                    letterSpacing: '3px',
                    color: isBoxDarkMode ? '#00d4ff' : '#0284c7',
                    opacity: 0.5,
                    marginTop: '20px'
                  }}
                >
                  {subData}
                </div>

                {/* Stop Button */}
                {!showTimer && (
                  <button
                    onClick={() => {
                      resetDrill();
                      setGameState('gameOver');
                    }}
                    className="mt-5 px-6 py-2 rounded-full text-sm transition-all hover:border-red-500 hover:text-red-500"
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
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(3,3,3,0.95)' : 'rgba(255,255,255,0.95)' }}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[520px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Award className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Power Score" value={score} icon={<Flame className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Breaths Completed" value={`${breathCount}/30`} icon={<Wind className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Retention Time" value={formatRetentionTime(retentionTime)} icon={<Timer className="w-4 h-4" />} color="text-blue-500" />
                    <ResultCard label="Best Retention" value={formatRetentionTime(bestRetention)} icon={<Trophy className="w-4 h-4" />} color="text-cyan-500" />
                    <ResultCard label="Max Combo" value={combo} icon={<TrendingUp className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Completion Bonus" value={breathCount >= 30 ? 30 : 0} icon={<Award className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Oxygen Boost" value={Math.min(100, Math.floor(score / 1.5))} unit="%" icon={<Brain className="w-4 h-4" />} color="text-cyan-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/mental-fitness" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
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
        </div>

        {/* Instructions */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Wim Hof Method Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-cyan-500">INHALE</span> deeply through your nose for <span className="font-semibold">1.5 seconds</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">EXHALE</span> passively for <span className="font-semibold">1.5 seconds</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Repeat for <span className="font-semibold text-orange-500">30 power breaths</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>After last exhale, <span className="font-semibold text-purple-500">hold on empty lungs</span> as long as comfortable</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every <span className="font-semibold text-yellow-500">5 breaths = combo bonus (+1 point)</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete all 30 breaths for <span className="font-semibold text-red-500">+30 bonus points</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🔥 Increases oxygen saturation and energy</span>
                  <span>🧘 Best practiced on an empty stomach</span>
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
  const bgColor = color === 'text-orange-500' ? 'bg-orange-500/10' : 
                   color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-blue-500' ? 'bg-blue-500/10' :
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 'bg-red-500/10';
  
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