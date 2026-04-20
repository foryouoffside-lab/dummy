'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Award, Grid, Heart, Star, Circle, Square,
  Triangle, Diamond, Hexagon, Activity, Clock, CheckCircle
} from 'lucide-react';

export default function CardMatchingPage() {
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [gridCols, setGridCols] = useState(4);
  
  // Refs
  const gameContainerRef = useRef(null);
  const timeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const gameStateRef = useRef('start');
  const clickCooldownRef = useRef(false);

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('cardMatchingDrillBestScore');
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
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('cardMatchingDrillBestScore', score.toString());
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        const element = gameContainerRef.current;
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
      
      if (type === 'flip') {
        osc.frequency.value = 660;
        g.gain.value = 0.08;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.08);
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'match') {
        osc.frequency.value = 880;
        g.gain.value = 0.12;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'mismatch') {
        osc.frequency.value = 440;
        g.gain.value = 0.1;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'levelup') {
        osc.frequency.value = 660;
        g.gain.value = 0.15;
        osc.start();
        osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.2);
        osc.frequency.linearRampToValueAtTime(1320, ctx.currentTime + 0.3);
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.4);
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'combo') {
        osc.frequency.value = 1046.5;
        g.gain.value = 0.12;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  // Card icons for different levels
  const getCardIcons = useCallback(() => {
    const iconSets = [
      { icon: Heart, name: 'heart', color: 'text-red-500' },
      { icon: Star, name: 'star', color: 'text-yellow-500' },
      { icon: Circle, name: 'circle', color: 'text-blue-500' },
      { icon: Square, name: 'square', color: 'text-green-500' },
      { icon: Triangle, name: 'triangle', color: 'text-purple-500' },
      { icon: Diamond, name: 'diamond', color: 'text-pink-500' },
      { icon: Target, name: 'target', color: 'text-orange-500' },
      { icon: Award, name: 'award', color: 'text-indigo-500' },
      { icon: Zap, name: 'zap', color: 'text-amber-500' },
      { icon: Trophy, name: 'trophy', color: 'text-yellow-600' },
      { icon: Hexagon, name: 'hexagon', color: 'text-cyan-500' },
      { icon: Grid, name: 'grid', color: 'text-teal-500' },
      { icon: Eye, name: 'eye', color: 'text-emerald-500' },
      { icon: Activity, name: 'activity', color: 'text-rose-500' },
      { icon: Clock, name: 'clock', color: 'text-sky-500' }
    ];
    
    let pairsCount;
    let cols;
    
    if (level === 1) {
      pairsCount = 6;
      cols = 3;
    } else if (level === 2) {
      pairsCount = 8;
      cols = 4;
    } else if (level === 3) {
      pairsCount = 10;
      cols = 4;
    } else if (level === 4) {
      pairsCount = 12;
      cols = 4;
    } else if (level === 5) {
      pairsCount = 14;
      cols = 4;
    } else if (level === 6) {
      pairsCount = 16;
      cols = 4;
    } else {
      pairsCount = Math.min(16 + Math.floor((level - 6) / 2) * 2, 32);
      cols = pairsCount <= 20 ? 5 : 6;
    }
    
    setGridCols(cols);
    
    const selectedIcons = iconSets.slice(0, pairsCount);
    
    let cardDeck = [];
    selectedIcons.forEach((iconSet, idx) => {
      cardDeck.push({ id: idx * 2, icon: iconSet.icon, name: iconSet.name, color: iconSet.color, matched: false });
      cardDeck.push({ id: idx * 2 + 1, icon: iconSet.icon, name: iconSet.name, color: iconSet.color, matched: false });
    });
    
    for (let i = cardDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardDeck[i], cardDeck[j]] = [cardDeck[j], cardDeck[i]];
    }
    
    return cardDeck;
  }, [level]);

  const initGame = useCallback(() => {
    const newCards = getCardIcons();
    setCards(newCards);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setMoves(0);
    setMatches(0);
    setWaiting(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [getCardIcons]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          playSound('levelup');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState, playSound]);

  useEffect(() => {
    if (gameState === 'playing') {
      initGame();
    }
  }, [gameState, level, initGame]);

  const getAccuracy = () => {
    if (moves === 0) return 100;
    return Math.round((matches / moves) * 100);
  };

  const handleCardClick = (index) => {
    if (waiting) return;
    if (matchedIndices.includes(index)) return;
    if (flippedIndices.includes(index)) return;
    if (flippedIndices.length === 2) return;
    if (gameStateRef.current !== 'playing') return;
    if (clickCooldownRef.current) return;

    clickCooldownRef.current = true;
    playSound('flip');
    
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);
    
    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      checkMatch(newFlipped[0], newFlipped[1]);
    }
    
    setTimeout(() => {
      clickCooldownRef.current = false;
    }, 100);
  };

  const checkMatch = (idx1, idx2) => {
    const card1 = cards[idx1];
    const card2 = cards[idx2];
    
    if (card1.name === card2.name) {
      setMatches(prev => prev + 1);
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current > bestCombo) {
        setBestCombo(comboRef.current);
      }
      
      setMatchedIndices(prev => [...prev, idx1, idx2]);
      setFlippedIndices([]);
      
      if (comboRef.current % 3 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo!`, 'success');
      } else {
        playSound('match');
        showFeedback(`✓ Match!`, 'success');
      }
      
      if (matchedIndices.length + 2 === cards.length) {
        levelComplete();
      }
    } else {
      comboRef.current = 0;
      setCombo(0);
      showFeedback('✗ No match', 'error');
      playSound('mismatch');
      
      setWaiting(true);
      timeoutRef.current = setTimeout(() => {
        setFlippedIndices([]);
        setWaiting(false);
      }, 600);
    }
  };

  const levelComplete = () => {
    // +10 points per grid completion
    scoreRef.current += 10;
    setScore(scoreRef.current);
    showFeedback(`🎯 Level ${level} Complete! +10`, 'success');
    playSound('levelup');
    
    setTimeout(() => {
      setLevel(prev => prev + 1);
      setMatches(0);
      comboRef.current = 0;
      setCombo(0);
      setFlippedIndices([]);
      setMatchedIndices([]);
    }, 1200);
  };

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLevel(1);
    setTimeRemaining(60);
    setMoves(0);
    setMatches(0);
    setCombo(0);
    setBestCombo(0);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setFeedback('');
    setWaiting(false);
    setGridCols(3);
    
    scoreRef.current = 0;
    comboRef.current = 0;
    clickCooldownRef.current = false;
    
    initGame();
  };

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
  };

  const getCardSize = () => {
    if (level <= 2) return { min: '70px', max: '90px', icon: 'w-6 h-6 md:w-7 md:h-7' };
    if (level <= 4) return { min: '60px', max: '80px', icon: 'w-5 h-5 md:w-6 md:h-6' };
    if (level <= 6) return { min: '50px', max: '70px', icon: 'w-5 h-5 md:w-5 md:h-5' };
    return { min: '40px', max: '55px', icon: 'w-4 h-4 md:w-4 md:h-4' };
  };

  const getGridTemplate = () => {
    const totalCards = cards.length;
    const rows = Math.ceil(totalCards / gridCols);
    return {
      gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`
    };
  };

  const cardSize = getCardSize();

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
              <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl">
                <Grid className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Card Matching</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Match pairs • +10 per grid completion</p>
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

        {/* Stats Board - 7 columns */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-600" />} value={level} label="Level" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle className="text-emerald-600" />} value={matches} label="Pairs" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-amber-600" />} value={getAccuracy()} label="Acc" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={gameContainerRef}
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
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* Game Area */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Grid className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Card Matching</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • +10 per grid completion</p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && cards.length > 0 && (
              <div className="w-full h-full flex items-center justify-center">
                <div 
                  className="grid gap-2 md:gap-2.5 place-items-center"
                  style={{
                    ...getGridTemplate(),
                    maxWidth: gridCols <= 3 ? '350px' : gridCols <= 4 ? '450px' : gridCols <= 5 ? '550px' : '650px',
                  }}
                >
                  {cards.map((card, index) => {
                    const isFlipped = flippedIndices.includes(index);
                    const isMatched = matchedIndices.includes(index);
                    const IconComponent = card.icon;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleCardClick(index)}
                        disabled={isMatched || waiting}
                        className={`
                          aspect-square rounded-lg font-bold transition-all duration-200
                          ${isMatched ? 'opacity-0 pointer-events-none' : ''}
                          ${isFlipped ? 'bg-white shadow-md scale-95' : `shadow-sm hover:scale-[0.98] ${isBoxDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-pink-400 to-rose-500'}`}
                          ${!isFlipped && !isMatched ? 'cursor-pointer' : ''}
                          flex items-center justify-center
                        `}
                        style={{
                          width: '100%',
                          height: '100%',
                          minWidth: cardSize.min,
                          minHeight: cardSize.min,
                          maxWidth: cardSize.max,
                          maxHeight: cardSize.max,
                        }}
                      >
                        <div className="flex items-center justify-center w-full h-full">
                          {(isFlipped || isMatched) ? (
                            <IconComponent className={`${cardSize.icon} ${card.color}`} />
                          ) : (
                            <Grid className={`${cardSize.icon} ${isBoxDarkMode ? 'text-gray-500' : 'text-white opacity-60'}`} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time's Up!</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Level Reached" value={level} icon={<Award className="w-4 h-4" />} color="text-pink-500" />
                    <ResultCard label="Pairs Matched" value={matches} icon={<CheckCircle className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Max Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/cognitive" className="flex-1">
                      <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </span>
                    </Link>
                    <button 
                      onClick={resetGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click cards to <span className="font-semibold text-pink-500">reveal and match pairs</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Grid complete: <span className="font-semibold text-green-500">+10 points</span> • Fixed reward</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No penalties • <span className="font-semibold text-blue-500">Pure positive training</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Grid expands: 3×4 → 4×4 → ... → <span className="font-semibold text-purple-500">6×10+</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 combo = <span className="font-semibold text-orange-500">bonus notification</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-yellow-500">60 seconds</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎴 15+ unique icons • Progressive difficulty</span>
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
                   color === 'text-pink-500' ? 'bg-pink-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-blue-500' ? 'bg-blue-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 'bg-cyan-500/10';
  
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