'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Volume2, VolumeX, Maximize2, Minimize2,
  Sun, Moon, Eye, Timer, Trophy, CheckCircle, XCircle, AlertCircle,
  BarChart3, Info, Zap
} from 'lucide-react';

export default function SelectiveAttentionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  
  // Drill Core State
  const [gameState, setGameState] = useState('start');
  const [items, setItems] = useState([]);
  const [targetColor, setTargetColor] = useState('');
  const [targetShape, setTargetShape] = useState('');
  const [showTargetDisplay, setShowTargetDisplay] = useState(true);
  
  // Professional Metrics
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [correctHits, setCorrectHits] = useState(0);
  const [wrongHits, setWrongHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [roundTime, setRoundTime] = useState(2000);
  
  // UI State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  // Timers
  const timerIntervalRef = useRef(null);
  const roundTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const roundTimeRef = useRef(2000);
  const timeRemainingRef = useRef(60);
  const gameStateRef = useRef('start');

  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
  const shapes = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond'];
  
  const shapeIcons = {
    circle: '⚪',
    square: '⬛',
    triangle: '🔺',
    star: '⭐',
    heart: '❤️',
    diamond: '💎'
  };

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('selectiveAttentionDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Sync gameState to ref
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Check authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

  // Update best score when game ends
  useEffect(() => {
    if (gameState === 'ended' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('selectiveAttentionDrillBestScore', score.toString());
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (roundTimerRef.current) clearTimeout(roundTimerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Timer logic - 60 second countdown
  useEffect(() => {
    if (gameState === 'playing' && !showTargetDisplay) {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          timeRemainingRef.current = newTime;
          
          if (newTime <= 0) {
            handleTimeUp();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState, showTargetDisplay]);

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
    }, 400);
  };

  // Initialize audio context
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // Play sound
  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    
    try {
      const ctx = initAudio();
      
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      
      if (type === 'correct') {
        osc.frequency.value = 880;
        g.gain.value = 0.12;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'wrong') {
        osc.frequency.value = 440;
        g.gain.value = 0.08;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'miss') {
        osc.frequency.value = 330;
        g.gain.value = 0.06;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'combo') {
        osc.frequency.value = 1046.5;
        g.gain.value = 0.12;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (error) {}
  }, [soundEnabled, initAudio]);

  // Handle time up
  const handleTimeUp = useCallback(() => {
    if (roundTimerRef.current) {
      clearTimeout(roundTimerRef.current);
      roundTimerRef.current = null;
    }
    setGameState('ended');
  }, []);

  // Generate new round with NEW target and NEW placements
  const generateNewRound = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    
    // Clear any existing round timer
    if (roundTimerRef.current) {
      clearTimeout(roundTimerRef.current);
      roundTimerRef.current = null;
    }
    
    // Generate completely new target
    const newTargetColor = colors[Math.floor(Math.random() * colors.length)];
    const newTargetShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    setTargetColor(newTargetColor);
    setTargetShape(newTargetShape);
    
    const newItems = [];
    const numDistractors = 5;
    
    // Add target item with new random position
    newItems.push({
      id: Date.now(),
      color: newTargetColor,
      shape: newTargetShape,
      isTarget: true,
      x: Math.random() * 70 + 15,
      y: Math.random() * 60 + 20
    });
    
    // Add distractor items with new random positions
    for (let i = 0; i < numDistractors; i++) {
      let distractorColor, distractorShape;
      if (Math.random() > 0.5) {
        distractorColor = colors.find(c => c !== newTargetColor) || 'blue';
        distractorShape = newTargetShape;
      } else {
        distractorColor = newTargetColor;
        distractorShape = shapes.find(s => s !== newTargetShape) || 'circle';
      }
      
      newItems.push({
        id: Date.now() + i + 1,
        color: distractorColor,
        shape: distractorShape,
        isTarget: false,
        x: Math.random() * 70 + 15,
        y: Math.random() * 60 + 20
      });
    }
    
    setItems(newItems);
    
    // Set timeout for next round
    roundTimerRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing' && !showTargetDisplay) {
        handleMiss();
      }
    }, roundTimeRef.current);
  }, [showTargetDisplay]);

  // Handle miss (timeout) - penalty and new round, round time stays same
  const handleMiss = useCallback(() => {
    if (gameStateRef.current !== 'playing' || showTargetDisplay) return;
    
    setMissedHits(prev => prev + 1);
    comboRef.current = 0;
    setCombo(0);
    setScore(prev => Math.max(0, prev - 5));
    scoreRef.current = Math.max(0, scoreRef.current - 5);
    showFeedback('✗ Missed! -5', 'error');
    playSound('miss');
    
    // Round time stays the same (doesn't decrease on miss)
    // Generate new round
    generateNewRound();
  }, [gameState, showTargetDisplay, playSound, generateNewRound]);

  // Get accuracy
  const getAccuracy = () => {
    const total = correctHits + wrongHits + missedHits;
    if (total === 0) return 100;
    return Math.round((correctHits / total) * 100);
  };

  // Handle item click
  const handleItemClick = useCallback((item, isTarget) => {
    if (gameStateRef.current !== 'playing' || showTargetDisplay) return;
    
    if (roundTimerRef.current) {
      clearTimeout(roundTimerRef.current);
      roundTimerRef.current = null;
    }
    
    if (isTarget) {
      // CORRECT! Decrease round time (user is fast)
      const newRoundTime = Math.max(900, roundTimeRef.current - 100);
      roundTimeRef.current = newRoundTime;
      setRoundTime(newRoundTime);
      
      const basePoints = 12;
      const comboBonus = Math.floor(comboRef.current / 3) * 3;
      const totalPoints = basePoints + comboBonus;
      
      scoreRef.current += totalPoints;
      setScore(scoreRef.current);
      setCorrectHits(prev => prev + 1);
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current > bestCombo) {
        setBestCombo(comboRef.current);
      }
      
      if (comboRef.current % 3 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo! +${comboBonus} bonus!`, 'success');
      } else {
        playSound('correct');
        showFeedback(`✓ +${totalPoints}`, 'success');
      }
      
      // Generate new round with faster time
      generateNewRound();
    } else {
      // WRONG! Penalty
      setWrongHits(prev => prev + 1);
      comboRef.current = 0;
      setCombo(0);
      setScore(prev => Math.max(0, prev - 8));
      scoreRef.current = Math.max(0, scoreRef.current - 8);
      showFeedback('✗ Wrong! -8', 'error');
      playSound('wrong');
      
      // Remove the wrong item and reposition remaining
      setItems(prev => {
        const remainingItems = prev.filter(i => i.id !== item.id);
        return remainingItems.map(i => ({
          ...i,
          x: Math.random() * 70 + 15,
          y: Math.random() * 60 + 20
        }));
      });
      
      // Reset timer for same target (round time stays same)
      roundTimerRef.current = setTimeout(() => {
        if (gameStateRef.current === 'playing' && !showTargetDisplay) {
          handleMiss();
        }
      }, roundTimeRef.current);
    }
  }, [gameState, showTargetDisplay, bestCombo, playSound, generateNewRound, handleMiss]);

  // Start game
  const startGame = useCallback(() => {
    // Reset all state
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setCorrectHits(0);
    setWrongHits(0);
    setMissedHits(0);
    setCombo(0);
    setBestCombo(0);
    setTimeRemaining(60);
    setRoundTime(2000);
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    roundTimeRef.current = 2000;
    timeRemainingRef.current = 60;
    
    initAudio();
    
    // Show initial target for 2 seconds
    const newTargetColor = colors[Math.floor(Math.random() * colors.length)];
    const newTargetShape = shapes[Math.floor(Math.random() * shapes.length)];
    setTargetColor(newTargetColor);
    setTargetShape(newTargetShape);
    setShowTargetDisplay(true);
    
    setTimeout(() => {
      setShowTargetDisplay(false);
      generateNewRound();
    }, 2000);
  }, [generateNewRound, initAudio]);

  const resetGame = () => {
    if (roundTimerRef.current) clearTimeout(roundTimerRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
  };

  // Get color style
  const getColorStyle = (color) => {
    const colorMap = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      pink: 'bg-pink-500',
      cyan: 'bg-cyan-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

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

  if (status === 'unauthenticated') {
    return null;
  }

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
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Selective Attention</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Find matching color & shape • 60s</p>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex gap-2">
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
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle className="text-emerald-500" />} value={correctHits} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Timer className="text-cyan-600" />} value={`${roundTime}ms`} label="Round Time" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* The Drill Core */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? '#0a0a0a' : '#ffffff',
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {isFullscreen && (gameState === 'playing') && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* Game Content */}
          <div className="absolute inset-0">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Eye className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Selective Attention</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Find matching color & shape</p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Target Display */}
            {gameState === 'playing' && showTargetDisplay && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className={`text-xl mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Find and click:</p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className={`w-14 h-14 rounded-full ${getColorStyle(targetColor)}`}></div>
                    <span className="text-2xl font-bold">+</span>
                    <div className="text-5xl">{shapeIcons[targetShape]}</div>
                  </div>
                  <p className="text-sm text-gray-500">Get ready...</p>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && !showTargetDisplay && (
              <>
                {/* Target reminder */}
                <div className="absolute top-4 right-4 z-10">
                  <div className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm ${isBoxDarkMode ? 'bg-zinc-800 text-gray-300 border border-zinc-700' : 'bg-gray-200 text-gray-700 border border-gray-300'}`}>
                    <div className={`w-5 h-5 rounded-full ${getColorStyle(targetColor)}`}></div>
                    <span>+</span>
                    <span className="text-xl">{shapeIcons[targetShape]}</span>
                  </div>
                </div>

                {/* All Items */}
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item, item.isTarget)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110"
                    style={{ 
                      left: `${item.x}%`, 
                      top: `${item.y}%`
                    }}
                  >
                    <div className={`w-14 h-14 rounded-full ${getColorStyle(item.color)} flex items-center justify-center shadow-lg`}>
                      <span className="text-3xl">{shapeIcons[item.shape]}</span>
                    </div>
                  </button>
                ))}
              </>
            )}

            {/* Game Over Screen */}
            {gameState === 'ended' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Complete!</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Correct Hits" value={correctHits} icon={<CheckCircle className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Wrong Hits" value={wrongHits} icon={<XCircle className="w-4 h-4" />} color="text-red-500" />
                    <ResultCard label="Missed" value={missedHits} icon={<AlertCircle className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Max Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="text-amber-500" />
                    <ResultCard label="Final Round Time" value={`${roundTime}ms`} icon={<Timer className="w-4 h-4" />} color="text-cyan-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/cognitive" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Play Again →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rules Section */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Find items matching <span className="font-semibold text-purple-500">BOTH color and shape</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct: <span className="font-semibold text-green-500">+12 points + combo bonus</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong: <span className="font-semibold text-red-500">-8 points</span> + combo resets</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Miss (timeout): <span className="font-semibold text-orange-500">-5 points</span> + NEW target</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Fast hits <span className="font-semibold text-blue-500">decrease round time</span> (2000ms → 900ms)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 combo = <span className="font-semibold text-yellow-500">+3 bonus points</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 8 colors • 6 shapes • Round time decreases on success only</span>
                  <span>🏆 Best Score saves locally</span>
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
  const bgColor = color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-amber-500' ? 'bg-amber-500/10' : 'bg-cyan-500/10';
  
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