'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Volume2, VolumeX, Maximize2, Minimize2, 
  Sun, Moon, Eye, Timer, Trophy, Layers, Circle, Hash,
  BarChart3, Info, CheckCircle2, XCircle, Zap
} from 'lucide-react';

export default function DividedAttentionPage() {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  
  // Task 1: Visual Tracking (Ball)
  const [currentTarget, setCurrentTarget] = useState(null);
  const [lastSpawnTime, setLastSpawnTime] = useState(0);
  const [visualHits, setVisualHits] = useState(0);
  
  // Task 2: Cognitive Stream (Numbers)
  const [currentNumber, setCurrentNumber] = useState(null);
  const [numberHits, setNumberHits] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const [wrongMatches, setWrongMatches] = useState(0);
  
  // UI State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const gameContainerRef = useRef(null);
  const numberIntervalRef = useRef(null);
  const ballIntervalRef = useRef(null);
  const prevNumberRef = useRef(null);
  const wasMatchedRef = useRef(true);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('dividedAttentionDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  useEffect(() => {
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

  // Update best score when game ends
  useEffect(() => {
    if (gameState === 'ended' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('dividedAttentionDrillBestScore', score.toString());
    }
  }, [gameState, score, bestScore]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        await gameContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 500);
  };

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      if (type === 'correct') {
        osc.frequency.value = 880;
        gain.gain.value = 0.1;
      } else if (type === 'wrong') {
        osc.frequency.value = 440;
        gain.gain.value = 0.08;
      } else if (type === 'combo') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (error) {}
  };

  // Main Game Loop
  useEffect(() => {
    if (gameState === 'playing') {
      spawnNewBall();
      startNumberStream();
      return () => {
        if (numberIntervalRef.current) clearInterval(numberIntervalRef.current);
        if (ballIntervalRef.current) clearInterval(ballIntervalRef.current);
      };
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setGameState('ended');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameState]);

  const getAccuracy = () => {
    const total = visualHits + numberHits + missedCount + wrongMatches;
    if (total === 0) return 100;
    return Math.round(((visualHits + numberHits) / total) * 100);
  };

  const spawnNewBall = () => {
    if (ballIntervalRef.current) clearInterval(ballIntervalRef.current);
    const newTarget = { 
      id: Date.now(), 
      x: Math.random() * 80 + 10, 
      y: Math.random() * 70 + 15 
    };
    setCurrentTarget(newTarget);
    setLastSpawnTime(Date.now());
    ballIntervalRef.current = setInterval(() => handleBallMiss(), 1000);
  };

  const handleBallMiss = () => {
    setMissedCount(prev => prev + 1);
    comboRef.current = 0;
    setCombo(0);
    setScore(prev => Math.max(0, prev - 8));
    scoreRef.current = Math.max(0, scoreRef.current - 8);
    showFeedback('✗ Ball Miss! -8', 'error');
    playSound('wrong');
    spawnNewBall();
  };

  const handleVisualClick = (e) => {
    e.stopPropagation();
    if (gameState !== 'playing' || !currentTarget) return;
    
    const reactionTime = Date.now() - lastSpawnTime;
    const basePoints = Math.max(5, Math.floor(20 - reactionTime / 80));
    const comboBonus = Math.floor(comboRef.current / 3) * 2;
    const totalPoints = basePoints + comboBonus;
    
    setVisualHits(prev => prev + 1);
    scoreRef.current += totalPoints;
    setScore(scoreRef.current);
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
    
    spawnNewBall();
  };

  const startNumberStream = () => {
    numberIntervalRef.current = setInterval(() => {
      if (currentNumber !== null && currentNumber % 2 === 0 && !wasMatchedRef.current) {
        setMissedCount(prev => prev + 1);
        comboRef.current = 0;
        setCombo(0);
        setScore(prev => Math.max(0, prev - 6));
        scoreRef.current = Math.max(0, scoreRef.current - 6);
        showFeedback('✗ Number Miss! -6', 'error');
        playSound('wrong');
      }

      let nextNum;
      do {
        nextNum = Math.floor(Math.random() * 10);
      } while (nextNum === prevNumberRef.current);
      
      prevNumberRef.current = nextNum;
      wasMatchedRef.current = false;
      setCurrentNumber(nextNum);
    }, 1200);
  };

  const handleNumberCheck = () => {
    if (gameState !== 'playing') return;
    const isCorrect = currentNumber % 2 === 0;

    if (isCorrect) {
      const basePoints = 8;
      const comboBonus = Math.floor(comboRef.current / 3) * 2;
      const totalPoints = basePoints + comboBonus;
      
      setNumberHits(prev => prev + 1);
      scoreRef.current += totalPoints;
      setScore(scoreRef.current);
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current > bestCombo) {
        setBestCombo(comboRef.current);
      }
      
      wasMatchedRef.current = true;
      
      if (comboRef.current % 3 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo! +${comboBonus} bonus!`, 'success');
      } else {
        playSound('correct');
        showFeedback(`✓ +${totalPoints}`, 'success');
      }
    } else {
      setWrongMatches(prev => prev + 1);
      comboRef.current = 0;
      setCombo(0);
      setScore(prev => Math.max(0, prev - 12));
      scoreRef.current = Math.max(0, scoreRef.current - 12);
      showFeedback('✗ Wrong Match! -12', 'error');
      playSound('wrong');
    }
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setTimeRemaining(60);
    setVisualHits(0);
    setNumberHits(0);
    setMissedCount(0);
    setWrongMatches(0);
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    prevNumberRef.current = null;
    wasMatchedRef.current = true;
    
    playSound('correct');
  };

  const resetGame = () => {
    setGameState('start');
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setTimeRemaining(60);
    setVisualHits(0);
    setNumberHits(0);
    setMissedCount(0);
    setWrongMatches(0);
    setFeedback('');
    
    if (numberIntervalRef.current) clearInterval(numberIntervalRef.current);
    if (ballIntervalRef.current) clearInterval(ballIntervalRef.current);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (numberIntervalRef.current) clearInterval(numberIntervalRef.current);
      if (ballIntervalRef.current) clearInterval(ballIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/cognitive" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Cognitive Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Divided Attention</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Track ball + Match even numbers • 60s</p>
              </div>
            </div>
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
          <StatCard icon={<Circle className="text-blue-500" />} value={visualHits} label="Ball Hits" isDark={isDarkMode} />
          <StatCard icon={<Hash className="text-indigo-500" />} value={numberHits} label="Number Hits" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
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
          className={`relative overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} 
          style={{ 
            background: isBoxDarkMode ? '#0a0a0a' : '#ffffff', 
            aspectRatio: isFullscreen ? 'auto' : '16/9', 
            maxWidth: isFullscreen ? '100%' : '100%', 
            margin: isFullscreen ? '0' : '0 auto', 
            borderColor: isDarkMode ? '#374151' : '#e5e7eb' 
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

          {/* Ball Tracking Area */}
          <div className={`absolute inset-0 ${isFullscreen ? 'right-80' : ''}`}>
            {gameState === 'playing' && currentTarget && (
              <button 
                onClick={handleVisualClick} 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300"
                style={{ left: `${currentTarget.x}%`, top: `${currentTarget.y}%` }}
              >
                <div className={`relative flex items-center justify-center ${isFullscreen ? 'w-28 h-28' : 'w-20 h-20'}`}>
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.4)] border-3 border-white/20"></div>
                </div>
              </button>
            )}
          </div>

          {/* Number Matching Panel */}
          <div 
            className={`absolute top-0 right-0 h-full flex flex-col p-6 z-30 ${isFullscreen ? 'w-80 border-l border-white/10 bg-black/40 backdrop-blur-3xl' : 'w-64 border-l border-gray-200 dark:border-gray-700'}`} 
            style={{ background: isFullscreen ? undefined : (isBoxDarkMode ? '#1a1a1a' : '#f9fafb') }}
          >
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <h3 className={`text-xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Match <span className="text-blue-500">Even</span>
              </h3>
              <div className={`relative flex items-center justify-center ${isFullscreen ? 'w-36 h-36 text-6xl' : 'w-32 h-32 text-5xl'} font-bold rounded-xl border-3 ${isBoxDarkMode ? 'border-blue-500/30 text-blue-400' : 'border-blue-500/30 text-blue-600'}`}>
                {currentNumber ?? '?'}
              </div>
              <button 
                onClick={handleNumberCheck} 
                disabled={gameState !== 'playing'} 
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
              >
                MATCH
              </button>
            </div>
          </div>

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Layers className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Divided Attention</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Track ball + Match even numbers</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Drill
                </button>
              </div>
            </div>
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
                  <ResultCard label="Ball Hits" value={visualHits} icon={<Circle className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Number Hits" value={numberHits} icon={<Hash className="w-4 h-4" />} color="text-indigo-500" />
                  <ResultCard label="Misses" value={missedCount} icon={<XCircle className="w-4 h-4" />} color="text-red-500" />
                  <ResultCard label="Wrong Matches" value={wrongMatches} icon={<XCircle className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Max Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="text-amber-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/cognitive" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={resetGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click <span className="font-semibold text-blue-500">blue balls</span> quickly - faster = higher score</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Press MATCH when number is <span className="font-semibold text-indigo-500">EVEN only</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ball Hit: 5-20pts • Number Hit: 8pts + combo</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ball Miss: -8pts • Number Miss: -6pts</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong Match: -12pts • Every 3 combo = +2 bonus</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-purple-500">60 seconds</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Ball speed scoring • Number appears every 1.2s</span>
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
                   color === 'text-blue-500' ? 'bg-blue-500/10' :
                   color === 'text-indigo-500' ? 'bg-indigo-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 'bg-amber-500/10';
  
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