'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, Eye,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Timer, Trophy, Activity as ActivityIcon, Target, Brain, Info, TrendingUp
} from 'lucide-react';

export default function BodyScanPage() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const scanLineRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [currentPart, setCurrentPart] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [combo, setCombo] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const currentIdxRef = useRef(0);
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(0);
  const elapsedTimerRef = useRef(null);
  const isActiveRef = useRef(false);
  const comboRef = useRef(0);
  const scoreRef = useRef(0);
  const feedbackTimeoutRef = useRef(null);

  const parts = [
    "CROWN OF HEAD", "EYES & JAW", "NECK & SHOULDERS", 
    "CHEST & HEART", "UPPER BACK", "ARMS & HANDS", 
    "ABDOMEN", "HIPS & GLUTES", "THIGHS & KNEES", "ANKLES & FEET"
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
    const savedBestScore = localStorage.getItem('bodyScanBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('bodyScanBestScore', score.toString());
      showFeedback(`🏆 New Record! ${score}`, 'success');
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
        gainNode.gain.value = 0.06;
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const updateScanLinePosition = (index) => {
    if (scanLineRef.current) {
      const topPos = (index / (parts.length - 1)) * 92;
      scanLineRef.current.style.top = `${topPos}%`;
    }
  };

  const runStep = () => {
    if (!isActiveRef.current) return;
    
    if (currentIdxRef.current >= parts.length) {
      setScanComplete(true);
      setIsScanning(false);
      setCurrentPart("SCAN COMPLETE");
      if (scanLineRef.current) {
        scanLineRef.current.style.display = 'none';
      }
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
      playSound('complete');
      
      // Award completion bonus
      scoreRef.current += 10;
      setScore(scoreRef.current);
      comboRef.current += 1;
      setCombo(comboRef.current);
      if (comboRef.current % 3 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current} Scan Combo! +10`, 'success');
      }
      return;
    }

    const part = parts[currentIdxRef.current];
    setCurrentPart(part);
    setCurrentIndex(currentIdxRef.current);
    
    updateScanLinePosition(currentIdxRef.current);
    playSound('transition');
    
    // Award points for each body part
    const basePoints = 1;
    const comboBonus = Math.floor(comboRef.current / 3);
    const pointsEarned = basePoints + comboBonus;
    
    scoreRef.current += pointsEarned;
    setScore(scoreRef.current);
    
    timeoutRef.current = setTimeout(() => {
      if (isActiveRef.current) {
        currentIdxRef.current++;
        runStep();
      }
    }, 8000);
  };

  const startScan = () => {
    setGameState('playing');
    setIsScanning(true);
    setScanComplete(false);
    setCurrentIndex(0);
    setCurrentPart(parts[0]);
    setScore(0);
    setCombo(0);
    setTimeElapsed(0);
    
    // Reset refs
    isActiveRef.current = true;
    currentIdxRef.current = 0;
    comboRef.current = 0;
    scoreRef.current = 0;
    startTimeRef.current = Date.now();
    
    // Clear any existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
    
    // Start elapsed timer
    elapsedTimerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setTimeElapsed(elapsed);
    }, 1000);
    
    if (scanLineRef.current) {
      scanLineRef.current.style.display = 'block';
      scanLineRef.current.style.top = '0%';
    }
    
    timeoutRef.current = setTimeout(() => {
      if (isActiveRef.current) {
        currentIdxRef.current++;
        runStep();
      }
    }, 8000);
  };

  const resetGame = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
    isActiveRef.current = false;
    setIsScanning(false);
    setScanComplete(false);
    setCurrentPart('');
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setTimeElapsed(0);
    currentIdxRef.current = 0;
    if (scanLineRef.current) {
      scanLineRef.current.style.display = 'none';
      scanLineRef.current.style.top = '0%';
    }
    setGameState('start');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
    };
  }, []);

  // Show loading state
  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                <ActivityIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Body Scan</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Systematic body awareness training</p>
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
          <StatCard icon={<Brain className="text-blue-500" />} value={score} label="Mindfulness" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className="text-green-500" />} value={formatTime(timeElapsed)} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Target className="text-cyan-500" />} value={`${currentIndex}/${parts.length}`} label="Progress" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-purple-500" />} value={combo} label="Combo" isDark={isDarkMode} />
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2 shadow-lg'}`}
          style={{ 
            background: isBoxDarkMode ? '#020617' : '#f0f9ff',
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
                <span>Progress: <span className="text-cyan-400 font-bold">{currentIndex}/{parts.length}</span></span>
                <span>Combo: <span className="text-purple-400 font-bold">{combo}</span></span>
              </div>
            </div>
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl z-10 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(2,6,23,0.95)' : 'rgba(240,249,255,0.95)' }}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <ActivityIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Body Scan</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Systematic body awareness training - 10 regions</p>
                  <button
                    onClick={startScan}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Begin Scan
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && (
              <>
                {/* Instruction Box */}
                <div 
                  className="instruction-box"
                  style={{
                    textAlign: 'center',
                    marginBottom: isFullscreen ? '60px' : '40px',
                    height: isFullscreen ? '80px' : '60px'
                  }}
                >
                  <div style={{ 
                    fontSize: isFullscreen ? '1rem' : '0.8rem', 
                    letterSpacing: '1px',
                    color: isBoxDarkMode ? '#94a3b8' : '#64748b'
                  }}>
                    CURRENT FOCUS
                  </div>
                  <div 
                    id="action-text"
                    style={{
                      fontSize: isFullscreen ? '2rem' : '1.4rem',
                      color: isBoxDarkMode ? '#38bdf8' : '#0284c7',
                      marginTop: '10px',
                      fontWeight: 'bold'
                    }}
                  >
                    {currentPart || "READY TO SCAN"}
                  </div>
                </div>

                {/* Scan Container */}
                <div 
                  className="scan-container"
                  style={{
                    position: 'relative',
                    width: isFullscreen ? '450px' : '300px',
                    height: isFullscreen ? '650px' : '500px',
                    border: `1px solid ${isBoxDarkMode ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.2)'}`,
                    borderRadius: '20px',
                    background: isBoxDarkMode 
                      ? 'linear-gradient(180deg, rgba(15, 23, 42, 1) 0%, rgba(2, 6, 23, 1) 100%)'
                      : 'linear-gradient(180deg, rgba(241, 245, 249, 1) 0%, rgba(248, 250, 252, 1) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 0'
                  }}
                >
                  {/* The Moving Scan Line */}
                  <div 
                    ref={scanLineRef}
                    className="scan-line"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '4px',
                      background: `linear-gradient(90deg, transparent, ${isBoxDarkMode ? '#38bdf8' : '#0284c7'}, transparent)`,
                      boxShadow: `0 0 15px ${isBoxDarkMode ? '#38bdf8' : '#0284c7'}`,
                      top: '0%',
                      zIndex: 5,
                      transition: 'top 2000ms linear',
                      display: 'none'
                    }}
                  ></div>

                  {/* Body Labels */}
                  {parts.map((part, idx) => (
                    <div 
                      key={idx}
                      className="body-label"
                      style={{
                        fontSize: isFullscreen ? '1rem' : '0.75rem',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        opacity: idx === currentIndex && isScanning ? 1 : 0.3,
                        color: idx === currentIndex && isScanning ? (isBoxDarkMode ? '#38bdf8' : '#0284c7') : (isBoxDarkMode ? '#94a3b8' : '#64748b'),
                        fontWeight: idx === currentIndex && isScanning ? 'bold' : 'normal',
                        transition: 'opacity 0.5s, color 0.5s'
                      }}
                    >
                      {part}
                    </div>
                  ))}
                </div>

                {/* Start Button (only when not scanning and not complete) */}
                {!isScanning && !scanComplete && (
                  <button
                    onClick={startScan}
                    className="mt-8 px-8 py-2 rounded-md text-sm transition-all hover:bg-blue-500 hover:text-white"
                    style={{
                      background: 'transparent',
                      border: `1px solid ${isBoxDarkMode ? '#38bdf8' : '#0284c7'}`,
                      color: isBoxDarkMode ? '#38bdf8' : '#0284c7',
                      letterSpacing: '2px'
                    }}
                  >
                    START SCAN
                  </button>
                )}

                {/* New Scan Button (when complete) */}
                {scanComplete && (
                  <button
                    onClick={resetGame}
                    className="mt-8 px-8 py-2 rounded-md text-sm transition-all hover:bg-blue-500 hover:text-white"
                    style={{
                      background: 'transparent',
                      border: `1px solid ${isBoxDarkMode ? '#38bdf8' : '#0284c7'}`,
                      color: isBoxDarkMode ? '#38bdf8' : '#0284c7',
                      letterSpacing: '2px'
                    }}
                  >
                    NEW SCAN
                  </button>
                )}

                {/* End Session Button */}
                {isScanning && (
                  <button
                    onClick={() => {
                      isActiveRef.current = false;
                      setIsScanning(false);
                      setGameState('gameOver');
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
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
              </>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(2,6,23,0.95)' : 'rgba(240,249,255,0.95)' }}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[520px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Award className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Mindfulness Score" value={score} icon={<Brain className="w-4 h-4" />} color="text-blue-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Regions Scanned" value={`${currentIndex}/${parts.length}`} icon={<Target className="w-4 h-4" />} color="text-cyan-500" />
                    <ResultCard label="Session Duration" value={formatTime(timeElapsed)} icon={<Timer className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Max Combo" value={combo} icon={<TrendingUp className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Awareness Level" value={Math.min(100, Math.floor(score * 5))} unit="%" icon={<ActivityIcon className="w-4 h-4" />} color="text-indigo-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/mental-fitness" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button
                      onClick={resetGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Body Scan Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Move attention through <span className="font-semibold text-blue-500">10 body regions</span> from head to feet</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Build <span className="font-semibold text-green-500">combos</span> for bonus points (every 3 scans adds bonus)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Base score: <span className="font-semibold text-purple-500">1 point per region</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete scan bonus: <span className="font-semibold text-orange-500">10 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>The scan line moves down to <span className="font-semibold text-cyan-500">indicate current focus</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Notice sensations <span className="font-semibold text-yellow-500">without judgment</span> - complete as many scans as you'd like</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🧘 Cultivates body awareness and present-moment focus</span>
                  <span>🎵 Gentle audio cues at each transition</span>
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
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 'bg-indigo-500/10';
  
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