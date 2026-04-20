'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, Eye,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Timer, Trophy, Heart, Wind, Brain, Info, TrendingUp
} from 'lucide-react';

export default function NaturalReleasePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [currentScript, setCurrentScript] = useState('Take a soft breath in...');
  const [scriptOpacity, setScriptOpacity] = useState(1);
  const [lightScale, setLightScale] = useState(1.0);
  const [lightOpacity, setLightOpacity] = useState(0.5);
  const [sessionCount, setSessionCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [combo, setCombo] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const timerRef = useRef(null);
  const stepTimeoutRef = useRef(null);
  const fadeTimeoutRef = useRef(null);
  const inhaleTimeoutRef = useRef(null);
  const elapsedTimerRef = useRef(null);
  const startTimeRef = useRef(0);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const comboRef = useRef(0);
  const scoreRef = useRef(0);
  const sessionCountRef = useRef(0);
  
  const naturalProtocol = [
    { text: "Take a soft breath in... and just let it fall away.", depth: 1.8 },
    { text: "Notice where your body meets the chair or the floor.", depth: 1.0 },
    { text: "There is nothing you need to do right now.", depth: 1.2 },
    { text: "Release the tiny muscles around your eyes and jaw.", depth: 0.9 },
    { text: "Imagine your breath is like a slow wave on a quiet beach.", depth: 2.1 },
    { text: "Let any thoughts just drift past like clouds in the distance.", depth: 1.1 },
    { text: "Feel a sense of weightlessness flowing through your arms.", depth: 1.4 },
    { text: "Simply exist in this moment of quiet.", depth: 0.8 },
    { text: "Every exhale is a chance to let go a little bit more.", depth: 1.3 },
    { text: "When you are ready, gently bring this stillness with you.", depth: 1.0 }
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
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      setLoading(false);
    } else if (status === 'loading') {
      setLoading(true);
    }
  }, [status, router]);

  // Load best score
  useEffect(() => {
    const savedBestScore = localStorage.getItem('naturalReleaseBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('naturalReleaseBestScore', score.toString());
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
      
      if (type === 'inhale') {
        oscillator.frequency.value = 523.25;
        gainNode.gain.value = 0.05;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.2);
        oscillator.stop(audioContext.currentTime + 0.2);
      } else if (type === 'exhale') {
        oscillator.frequency.value = 392.00;
        gainNode.gain.value = 0.05;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.3);
        oscillator.stop(audioContext.currentTime + 0.3);
      } else if (type === 'combo') {
        oscillator.frequency.value = 660;
        gainNode.gain.value = 0.06;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      } else if (type === 'complete') {
        oscillator.frequency.value = 1046.5;
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

  const runStep = (index) => {
    if (!isActiveRef.current) return;
    
    // Check if we've completed a full cycle
    if (index >= naturalProtocol.length) {
      sessionCountRef.current += 1;
      setSessionCount(sessionCountRef.current);
      
      // Award cycle completion bonus
      scoreRef.current += 10;
      setScore(scoreRef.current);
      
      comboRef.current += 1;
      setCombo(comboRef.current);
      
      if (comboRef.current > 0 && comboRef.current % 3 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current} Cycle Combo! +10`, 'success');
      }
      
      // Start next cycle from beginning
      runStep(0);
      return;
    }

    const data = naturalProtocol[index];
    
    // Award points for each meditation step
    const basePoints = 1;
    const comboBonus = Math.floor(comboRef.current / 3);
    const pointsEarned = basePoints + comboBonus;
    scoreRef.current += pointsEarned;
    setScore(scoreRef.current);
    
    // Fade out current text
    setScriptOpacity(0);
    
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = setTimeout(() => {
      if (!isActiveRef.current) return;
      setCurrentScript(data.text);
      setScriptOpacity(1);
      
      // Inhale animation
      const inhaleScale = (data.depth * 1.5);
      setLightScale(inhaleScale);
      setLightOpacity(0.8);
      playSound('inhale');
      
      if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
      inhaleTimeoutRef.current = setTimeout(() => {
        if (!isActiveRef.current) return;
        setLightScale(1.0);
        setLightOpacity(0.3);
        playSound('exhale');
      }, 5500);
      
    }, 1500);
    
    // Move to next step after 12 seconds
    if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);
    stepTimeoutRef.current = setTimeout(() => {
      if (!isActiveRef.current) return;
      runStep(index + 1);
    }, 12000);
  };

  const startMeditation = () => {
    setGameState('playing');
    
    // Clear any existing timeouts
    if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
    if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
    
    // Reset refs
    isActiveRef.current = true;
    comboRef.current = 0;
    scoreRef.current = 0;
    sessionCountRef.current = 0;
    
    // Reset state
    setIsActive(true);
    setScore(0);
    setSessionCount(0);
    setCombo(0);
    setTimeElapsed(0);
    setCurrentScript('Take a soft breath in...');
    setLightScale(1.0);
    setLightOpacity(0.5);
    setScriptOpacity(1);
    startTimeRef.current = Date.now();
    
    // Start elapsed timer
    elapsedTimerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setTimeElapsed(elapsed);
    }, 1000);
    
    // Start the meditation after a short delay
    timerRef.current = setTimeout(() => {
      if (isActiveRef.current) {
        runStep(0);
      }
    }, 2000);
  };

  const stopMeditation = () => {
    isActiveRef.current = false;
    setIsActive(false);
    setGameState('gameOver');
    
    if (timerRef.current) clearTimeout(timerRef.current);
    if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
    if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setIsActive(false);
    setGameState('start');
    setCurrentScript('Take a soft breath in...');
    setLightScale(1.0);
    setLightOpacity(0.5);
    setScriptOpacity(1);
    setSessionCount(0);
    setScore(0);
    setCombo(0);
    setTimeElapsed(0);
    
    if (timerRef.current) clearTimeout(timerRef.current);
    if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
    if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
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
  if (status === 'unauthenticated') {
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
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Natural Release</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Guided relaxation with biofeedback breathing</p>
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
          <StatCard icon={<Heart className="text-blue-500" />} value={score} label="Presence Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className="text-green-500" />} value={formatTime(timeElapsed)} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Wind className="text-cyan-500" />} value={sessionCount} label="Cycles" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-purple-500" />} value={combo} label="Combo" isDark={isDarkMode} />
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2 shadow-lg'}`}
          style={{ 
            background: isBoxDarkMode ? '#010101' : '#ffffff',
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
                <span>Cycles: <span className="text-green-400 font-bold">{sessionCount}</span></span>
                <span>Combo: <span className="text-purple-400 font-bold">{combo}</span></span>
              </div>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl z-10 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(1,1,1,0.95)' : 'rgba(255,255,255,0.95)' }}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Heart className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Natural Release</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Guided relaxation with biofeedback breathing</p>
                  <button
                    onClick={startMeditation}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Relaxation
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && (
              <div 
                className="meditation-frame"
                style={{
                  textAlign: 'center',
                  width: isFullscreen ? '800px' : '600px',
                  padding: '20px',
                  position: 'relative'
                }}
              >
                {/* Pacer Container */}
                <div
                  className="pacer-container"
                  style={{
                    width: '100%',
                    height: isFullscreen ? '220px' : '150px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: isFullscreen ? '80px' : '60px',
                    position: 'relative'
                  }}
                >
                  {/* The Core Breathing Light */}
                  <div
                    id="light"
                    className="breath-light"
                    style={{
                      width: isFullscreen ? '220px' : '150px',
                      height: isFullscreen ? '220px' : '150px',
                      background: `radial-gradient(circle, ${isBoxDarkMode ? 'rgba(0, 242, 254, 0.12)' : 'rgba(2, 132, 199, 0.08)'} 0%, transparent 70%)`,
                      borderRadius: '50%',
                      filter: `blur(${isFullscreen ? '35px' : '25px'})`,
                      transition: 'transform 5.5s cubic-bezier(0.42, 0, 0.58, 1), opacity 5.5s cubic-bezier(0.42, 0, 0.58, 1)',
                      opacity: lightOpacity,
                      transform: `scale(${lightScale})`,
                      position: 'absolute',
                      zIndex: 1
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '-20px',
                        right: '-20px',
                        bottom: '-20px',
                        background: `radial-gradient(circle, ${isBoxDarkMode ? 'rgba(0,242,254,0.03)' : 'rgba(2,132,199,0.02)'} 0%, transparent 80%)`,
                        borderRadius: '50%',
                        filter: `blur(${isFullscreen ? '45px' : '35px'})`,
                        zIndex: -1
                      }}
                    ></div>
                  </div>
                </div>

                {/* Script Text */}
                <div
                  id="script-text"
                  style={{
                    fontSize: isFullscreen ? '2rem' : '1.5rem',
                    fontWeight: '300',
                    lineHeight: '1.8',
                    minHeight: isFullscreen ? '140px' : '100px',
                    color: isBoxDarkMode ? '#d1d5db' : '#4b5563',
                    transition: 'opacity 1.5s ease-in-out',
                    letterSpacing: '0.5px',
                    position: 'relative',
                    zIndex: 10,
                    opacity: scriptOpacity
                  }}
                >
                  {currentScript}
                </div>

                {/* Stop Button */}
                <button
                  onClick={stopMeditation}
                  className="mt-5 px-6 py-2 rounded-full text-sm transition-all hover:border-red-500 hover:text-red-500"
                  style={{
                    background: 'transparent',
                    border: `1px solid ${isBoxDarkMode ? '#333' : '#ddd'}`,
                    color: isBoxDarkMode ? '#666' : '#999'
                  }}
                >
                  End Session
                </button>
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{ background: isBoxDarkMode ? 'rgba(1,1,1,0.95)' : 'rgba(255,255,255,0.95)' }}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[520px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Award className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Presence Score" value={score} icon={<Heart className="w-4 h-4" />} color="text-blue-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Full Cycles" value={sessionCount} icon={<Wind className="w-4 h-4" />} color="text-cyan-500" />
                    <ResultCard label="Session Duration" value={formatTime(timeElapsed)} icon={<Timer className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Max Combo" value={combo} icon={<TrendingUp className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Relaxation Level" value={Math.min(100, Math.floor(score / 2))} unit="%" icon={<Brain className="w-4 h-4" />} color="text-indigo-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/mental-fitness" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button
                      onClick={resetGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Relaxation Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Follow the <span className="font-semibold text-blue-500">guided scripts</span> - each offers a relaxation cue</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Breathe with the <span className="font-semibold text-cyan-500">pulsing light</span> - 5.5s inhale, 5.5s exhale</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Build <span className="font-semibold text-green-500">combos</span> for bonus points (every 3 cycles adds bonus)</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Base score: <span className="font-semibold text-purple-500">1 point per script</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete cycle bonus: <span className="font-semibold text-orange-500">10 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Let thoughts drift - <span className="font-semibold text-yellow-500">just observe and release</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🧘 Reduces stress and promotes deep relaxation</span>
                  <span>🎵 Gentle audio cues guide your breathing</span>
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