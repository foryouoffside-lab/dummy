'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Focus, TrendingUp, RefreshCw
} from 'lucide-react';

export default function ContinuousFocusRipples() {
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [focusScore, setFocusScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  // Refs
  const containerRef = useRef(null);
  const rippleIntervalRef = useRef(null);
  const focusIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const focusScoreRef = useRef(0);
  const comboRef = useRef(0);
  const gameStateRef = useRef('start');

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('focusRipplesDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Sync gameState to ref
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Update best score when game ends
  useEffect(() => {
    if (gameState === 'ended' && focusScore > bestScore) {
      setBestScore(focusScore);
      localStorage.setItem('focusRipplesDrillBestScore', focusScore.toString());
    }
  }, [gameState, focusScore, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (rippleIntervalRef.current) clearInterval(rippleIntervalRef.current);
      if (focusIntervalRef.current) clearInterval(focusIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

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

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 500);
  };

  // Initialize audio context
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  // Play sound effect
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      
      if (type === 'start') {
        osc.frequency.value = 523.25;
        g.gain.value = 0.12;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === 'complete') {
        osc.frequency.value = 1046.50;
        g.gain.value = 0.15;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1);
        osc.stop(ctx.currentTime + 1);
      } else if (type === 'milestone') {
        osc.frequency.value = 880;
        g.gain.value = 0.1;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {}
  };

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        // Milestone notifications
        if (prev === 240) {
          showFeedback('1 minute complete!', 'success');
          playSound('milestone');
        } else if (prev === 180) {
          showFeedback('2 minutes complete!', 'success');
          playSound('milestone');
        } else if (prev === 120) {
          showFeedback('3 minutes complete!', 'success');
          playSound('milestone');
        } else if (prev === 60) {
          showFeedback('4 minutes complete! 1 minute left!', 'success');
          playSound('milestone');
        }
        
        if (prev <= 1) {
          setGameState('ended');
          gameStateRef.current = 'ended';
          playSound('complete');
          showFeedback('Session Complete! Great focus!', 'success');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState]);

  // Focus score accumulation - 1 point every 5 seconds
  useEffect(() => {
    if (gameState === 'playing') {
      let secondCounter = 0;
      focusIntervalRef.current = setInterval(() => {
        secondCounter++;
        comboRef.current++;
        setCombo(comboRef.current);
        
        // Award 1 point every 5 seconds
        if (secondCounter % 5 === 0) {
          focusScoreRef.current += 1;
          setFocusScore(focusScoreRef.current);
        }
        
        if (comboRef.current > bestCombo) {
          setBestCombo(comboRef.current);
        }
        
        // Combo milestones (every 30 seconds = 6 points)
        if (comboRef.current % 30 === 0) {
          showFeedback(`🔥 ${comboRef.current / 60} minute streak!`, 'success');
        }
      }, 1000);
    }
    return () => {
      if (focusIntervalRef.current) {
        clearInterval(focusIntervalRef.current);
      }
    };
  }, [gameState, bestCombo]);

  // Ripple animation effect
  useEffect(() => {
    if (gameState !== 'playing' || !containerRef.current) return;

    const container = containerRef.current;

    function createRipple() {
      const ripple = document.createElement('div');
      ripple.className = 'ripple-element';
      ripple.style.position = 'absolute';
      ripple.style.top = '50%';
      ripple.style.left = '50%';
      ripple.style.width = '0';
      ripple.style.height = '0';
      ripple.style.borderRadius = '50%';
      ripple.style.border = isBoxDarkMode 
        ? '1px solid rgba(180, 215, 255, 0.45)' 
        : '1px solid rgba(79, 70, 229, 0.35)';
      ripple.style.boxShadow = isBoxDarkMode
        ? '0 0 6px rgba(180, 215, 255, 0.15)'
        : '0 0 6px rgba(79, 70, 229, 0.1)';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.animation = 'expandRipple 18s linear forwards';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '1';
      
      container.appendChild(ripple);

      ripple.addEventListener('animationend', () => {
        if (ripple && ripple.remove) {
          ripple.remove();
        }
      });
    }

    createRipple();
    rippleIntervalRef.current = setInterval(createRipple, 4500);

    return () => {
      if (rippleIntervalRef.current) {
        clearInterval(rippleIntervalRef.current);
      }
      if (containerRef.current) {
        const ripples = containerRef.current.querySelectorAll('.ripple-element');
        ripples.forEach(ripple => ripple.remove());
      }
    };
  }, [gameState, isBoxDarkMode]);

  const startDrill = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setTimeRemaining(300);
    setFocusScore(0);
    setCombo(0);
    setBestCombo(0);
    setFeedback('');
    
    focusScoreRef.current = 0;
    comboRef.current = 0;
    
    playSound('start');
    showFeedback('Keep your gaze on the center point', 'success');
  };

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (rippleIntervalRef.current) clearInterval(rippleIntervalRef.current);
    if (focusIntervalRef.current) clearInterval(focusIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    // Clear all ripple elements
    if (containerRef.current) {
      const ripples = containerRef.current.querySelectorAll('.ripple-element');
      ripples.forEach(ripple => ripple.remove());
    }
    
    setGameState('start');
    gameStateRef.current = 'start';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCompletion = () => {
    return Math.round((focusScore / 60) * 100);
  };

  const getFocusQuality = () => {
    if (focusScore >= 56) return 'Excellent';
    if (focusScore >= 50) return 'Good';
    if (focusScore >= 40) return 'Fair';
    return 'Keep Practicing';
  };

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/drills/cognitive" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Cognitive Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
                <Focus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Focus Ripples</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>5 minute focus training • 1 point per 5 seconds</p>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button 
                  onClick={resetGame} 
                  className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} 
                  title="Reset session"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={focusScore} label="Focus Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 30 ? 'text-red-600' : 'text-green-600'} />} value={formatTime(timeRemaining)} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Streak" unit="s" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getCompletion()} label="Completion" unit="%" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-emerald-600" />} value={bestCombo} label="Best Streak" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Focus className="text-cyan-600" />} value="60" label="Max Score" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? '#070711' : '#f9fafb',
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            backgroundImage: isBoxDarkMode 
              ? 'radial-gradient(circle at center, #0d0f1f 0%, #070711 70%)'
              : 'radial-gradient(circle at center, #e0e7ff 0%, #c7d2fe 70%)',
            overflow: 'hidden'
          }}
        >
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* Glow effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none" 
               style={{
                 background: isBoxDarkMode 
                   ? 'radial-gradient(circle, rgba(140, 180, 240, 0.08), transparent 70%)'
                   : 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%)',
                 filter: 'blur(60px)'
               }}>
          </div>
          
          {/* Center point */}
          <div className="absolute top-1/2 left-1/2 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none"
               style={{
                 width: '8px',
                 height: '8px',
                 background: isBoxDarkMode 
                   ? 'rgba(190, 220, 255, 0.95)'
                   : 'rgba(79, 70, 229, 0.95)',
                 boxShadow: isBoxDarkMode
                   ? '0 0 12px rgba(190, 220, 255, 0.6)'
                   : '0 0 12px rgba(79, 70, 229, 0.4)'
               }}>
          </div>

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Focus className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Focus Ripples</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>5-minute focus training • 1 point per 5 seconds</p>
                <button 
                  onClick={startDrill}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start 5 Minute Focus
                </button>
              </div>
            </div>
          )}

          {/* Guidance text */}
          {gameState === 'playing' && timeRemaining > 280 && (
            <div className="absolute bottom-[8%] w-full text-center pointer-events-none z-20">
              <p className="text-sm animate-fade-out" style={{ 
                color: isBoxDarkMode ? 'rgba(200, 220, 255, 0.6)' : 'rgba(79, 70, 229, 0.6)',
                letterSpacing: '0.4px'
              }}>
                Keep your attention gently on the center point
              </p>
            </div>
          )}

          {/* End Screen */}
          {gameState === 'ended' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Trophy className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Focus Score" value={`${focusScore}/60`} icon={<Target className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Completion" value={`${getCompletion()}%`} icon={<BarChart3 className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Best Streak" value={`${bestCombo}s`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Focus Quality" value={getFocusQuality()} icon={<Focus className="w-4 h-4" />} color="text-indigo-500" />
                  <ResultCard label="Time Completed" value="5:00" icon={<Timer className="w-4 h-4" />} color="text-blue-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/cognitive" className="flex-1">
                    <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </span>
                  </Link>
                  <button 
                    onClick={startDrill}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Play Again →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rules Section */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Fix gaze on the <span className="font-semibold text-purple-500">center point</span> - don't follow ripples</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Observe ripples with <span className="font-semibold text-green-500">peripheral awareness only</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Breathe naturally - <span className="font-semibold text-blue-500">blink normally</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Score accumulates <span className="font-semibold text-orange-500">+1 per 5 seconds</span> of focus</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Session lasts <span className="font-semibold text-cyan-500">5 minutes (300 seconds)</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Regular practice improves <span className="font-semibold text-yellow-500">concentration & flow state</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Max score: 60 • Milestone notifications at each minute</span>
                  <span>🏆 Best Score saves locally</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes expandRipple {
          0% {
            width: 0;
            height: 0;
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          100% {
            width: 120vmax;
            height: 120vmax;
            opacity: 0;
          }
        }
        
        @keyframes fadeOut {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        .animate-fade-out {
          animation: fadeOut 4s ease forwards;
        }
        
        .ripple-element {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 1;
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
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-indigo-500' ? 'bg-indigo-500/10' : 'bg-blue-500/10';
  
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