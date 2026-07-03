'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Eye,
  BarChart3, Info, RefreshCw,Activity,
  Users, Share2, XCircle, Gauge, TrendingUp,
  GraduationCap, Lightbulb, Brain, Search,
  ChevronRight, ArrowRight, Play, Award, CheckCircle2, LogOut, Hash
} from 'lucide-react';

// ============================================================
// ZERO-LATENCY AUDIO SYNTHESIZER
// ============================================================
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  playSound(type) {
    if (!this.enabled || !this.ctx) return;
    try {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.connect(g);
      g.connect(this.ctx.destination);
      const n = this.ctx.currentTime;
      
      const fm = { correct: 880, wrong: 440, penalty: 220, combo: 1046.5 };
      o.frequency.setValueAtTime(fm[type] || 660, n);
      g.gain.setValueAtTime(type === 'combo' ? 0.12 : type === 'penalty' ? 0.15 : 0.1, n);
      g.gain.exponentialRampToValueAtTime(0.001, n + 0.15);
      
      if (type === 'penalty' || type === 'wrong') {
        o.type = 'sawtooth';
      } else {
        o.type = 'sine';
      }
      
      o.start(n);
      o.stop(n + 0.15);
    } catch (e) {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function SustainedAttentionClient() {
  
  // === UI State ===
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game State ===
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'ended'
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [accuracy, setAccuracy] = useState(100);
  
  const [currentSpeed, setCurrentSpeed] = useState(1000);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  
  const [currentNumber, setCurrentNumber] = useState(null);
  const [targetNumber, setTargetNumber] = useState(null);
  const [isMemorizing, setIsMemorizing] = useState(false);
  const [stats, setStats] = useState({ hits: 0, misses: 0, wrongs: 0, combo: 0 });

  // === Absolute Truth Refs (For Decoupled Processing) ===
  const mountedRef = useRef(false);
  const gameContainerRef = useRef(null);
  
  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const timeRef = useRef(60.0);
  const speedRef = useRef(1000);
  const bestScoreRef = useRef(0);
  
  const targetNumberRef = useRef(null);
  const currentNumberRef = useRef(null);
  const lastNumberRef = useRef(null);
  const wasEvaluatedRef = useRef(true); 
  
  const statsRef = useRef({ hits: 0, misses: 0, wrongs: 0, combo: 0, bestCombo: 0 });

  const flashTimeoutRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const globalTimerIntervalRef = useRef(null);

  // Sync state for UI rendering
  const syncScoresToUI = useCallback(() => {
    setCurrentScore(scoreRef.current);
    setCurrentSpeed(speedRef.current);
    setStats({ ...statsRef.current });
    
    const totalActions = statsRef.current.hits + statsRef.current.wrongs + statsRef.current.misses;
    setAccuracy(totalActions > 0 ? Math.round((statsRef.current.hits / totalActions) * 100) : 100);
  }, []);

  // Audio Sync
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Initial Load
  useEffect(() => {
    setIsClient(true);
    mountedRef.current = true;
    try {
      const saved = localStorage.getItem('skilldrills_sustained_attention_best_v4');
      if (saved) {
        const parsed = parseInt(saved, 10);
        setBestScore(parsed);
        bestScoreRef.current = parsed;
      }
      const name = localStorage.getItem('skilldrills_player_name');
      if (name) setPlayerNameInput(name);
    } catch (e) {}
    
    setTimeout(() => { if (mountedRef.current) setLoading(false); }, 200);
    
    return () => {
      mountedRef.current = false;
      clearTimers();
    };
  }, []);

  // Screen Guard & Rotate Warning (Warning Logic Removed)
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsHandler);
    
    const checkOrientationAndSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) || window.innerWidth < 768;
      
      if (!isMobile) { 
        setIsMobileLandscape(false);
        return; 
      }
      
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
          setIsMobileLandscape(false);
      } else {
          setIsMobileLandscape(true); 
      }
    };
    
    checkOrientationAndSize();
    window.addEventListener('resize', checkOrientationAndSize);
    window.addEventListener('orientationchange', checkOrientationAndSize);
    
    const preventSpace = (e) => {
      if (e.code === 'Space' && gameStateRef.current === 'playing') e.preventDefault();
    };
    window.addEventListener('keydown', preventSpace);
    
    return () => {
      document.removeEventListener('fullscreenchange', fsHandler);
      window.removeEventListener('resize', checkOrientationAndSize);
      window.removeEventListener('orientationchange', checkOrientationAndSize);
      window.removeEventListener('keydown', preventSpace);
    };
  }, []);

  const clearTimers = useCallback(() => {
    if (globalTimerIntervalRef.current) clearInterval(globalTimerIntervalRef.current);
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
  }, []);

  const endGame = useCallback(() => {
    clearTimers();
    gameStateRef.current = 'ended';
    setGameState('ended');
    
    const finalScore = scoreRef.current;
    if (finalScore > bestScoreRef.current && finalScore > 0) {
      setIsNewBest(true);
      setBestScore(finalScore);
      bestScoreRef.current = finalScore;
      try { localStorage.setItem('skilldrills_sustained_attention_best_v4', finalScore.toString()); } catch(e) {}
    }
    syncScoresToUI();
  }, [clearTimers, syncScoresToUI]);

  const handleExit = useCallback(async () => {
    if (isFullscreen) {
      try { await document.exitFullscreen(); } catch (e) {}
    }
    clearTimers();
    gameStateRef.current = 'start';
    setGameState('start');
    setLocalTimeRemaining(60.0);
    setCurrentScore(0);
    setAccuracy(100);
    setCurrentSpeed(1000);
    setStats({ hits: 0, misses: 0, wrongs: 0, combo: 0 });
    setIsMemorizing(false);
    setCurrentNumber(null);
  }, [isFullscreen, clearTimers]);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 500);
  }, []);

  const processPenalty = useCallback((isMiss = false) => {
    statsRef.current.combo = 0;
    scoreRef.current = Math.max(0, scoreRef.current - 10);
    timeRef.current -= 5.0;
    speedRef.current = Math.min(1000, speedRef.current + 50); // Decrease difficulty (slower)
    
    if (audioSynth) audioSynth.playSound(isMiss ? 'penalty' : 'wrong');
    triggerFeedback(isMiss ? '✗ Missed Target -10' : '✗ Wrong Tap -10', 'error');
    
    if (timeRef.current <= 0) {
      timeRef.current = 0;
      setLocalTimeRemaining(0);
      endGame();
      return;
    }
    
    setLocalTimeRemaining(timeRef.current);
    syncScoresToUI();
  }, [triggerFeedback, syncScoresToUI, endGame]);

  const spawnNumber = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    // Evaluate the PREVIOUS flash for a miss
    if (currentNumberRef.current === targetNumberRef.current && !wasEvaluatedRef.current) {
      statsRef.current.misses += 1;
      processPenalty(true);
      if (gameStateRef.current !== 'playing') return; // Might have ended via penalty
    }

    // Determine the next number to flash (~25% target appearance rate)
    let newNum;
    if (Math.random() < 0.25) {
      newNum = targetNumberRef.current;
    } else {
      do {
        newNum = Math.floor(Math.random() * 10);
      } while (newNum === targetNumberRef.current || newNum === lastNumberRef.current);
    }
    
    lastNumberRef.current = newNum;
    currentNumberRef.current = newNum;
    wasEvaluatedRef.current = false;
    
    if (mountedRef.current) {
      setCurrentNumber(newNum);
    }

    flashTimeoutRef.current = setTimeout(() => {
      if (mountedRef.current) spawnNumber();
    }, speedRef.current);

  }, [processPenalty]);

  // INPUT HANDLER
  const handleGameInteraction = useCallback((e, renderedValue) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (gameStateRef.current !== 'playing' || isMemorizing || wasEvaluatedRef.current || renderedValue === null) return;
    
    // Lock evaluation for this flash
    wasEvaluatedRef.current = true;

    if (renderedValue === targetNumberRef.current) {
      // Correct!
      scoreRef.current += 20;
      timeRef.current = Math.min(60.0, timeRef.current + 5.0); // Changed time increment to +5 seconds
      speedRef.current = Math.max(200, speedRef.current - 50); // Increase difficulty (faster)
      
      statsRef.current.hits += 1;
      statsRef.current.combo += 1;
      if (statsRef.current.combo > statsRef.current.bestCombo) {
        statsRef.current.bestCombo = statsRef.current.combo;
      }
      
      if (statsRef.current.combo > 0 && statsRef.current.combo % 5 === 0) {
        if (audioSynth) audioSynth.playSound('combo');
        triggerFeedback(`🔥 ${statsRef.current.combo}x Combo! +20`, 'success');
      } else {
        if (audioSynth) audioSynth.playSound('correct');
        triggerFeedback('✓ Hit! +20', 'success');
      }
    } else {
      // Wrong Tap!
      statsRef.current.wrongs += 1;
      processPenalty(false);
    }
    
    setLocalTimeRemaining(timeRef.current);
    syncScoresToUI();
  }, [isMemorizing, processPenalty, triggerFeedback, syncScoresToUI]);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    
    clearTimers();
    setIsNewBest(false);
    
    gameStateRef.current = 'playing';
    setGameState('playing');
    
    timeRef.current = 60.0;
    scoreRef.current = 0;
    speedRef.current = 1000; // Base speed
    statsRef.current = { hits: 0, misses: 0, wrongs: 0, combo: 0, bestCombo: 0 };
    
    setLocalTimeRemaining(60.0);
    syncScoresToUI();
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });

    try {
      if (!document.fullscreenElement && gameContainerRef.current) {
        await gameContainerRef.current.requestFullscreen();
      }
    } catch (err) {}

    // Precise decoupled timer
    globalTimerIntervalRef.current = setInterval(() => {
      timeRef.current -= 0.1;
      if (timeRef.current <= 0) {
        timeRef.current = 0;
        setLocalTimeRemaining(0);
        endGame();
      } else {
        setLocalTimeRemaining(timeRef.current);
      }
    }, 100);

    const generatedTarget = Math.floor(Math.random() * 10);
    targetNumberRef.current = generatedTarget;
    currentNumberRef.current = null;
    lastNumberRef.current = null;
    wasEvaluatedRef.current = true; // Lock clicks during intro
    
    if (mountedRef.current) {
      setTargetNumber(generatedTarget);
      setCurrentNumber(null);
      setIsMemorizing(true);
    }

    // Memorization Phase
    setTimeout(() => {
      if (gameStateRef.current === 'playing' && mountedRef.current) {
        setIsMemorizing(false);
        spawnNumber();
      }
    }, 2000);

  }, [clearTimers, endGame, spawnNumber, syncScoresToUI]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) await gameContainerRef.current?.requestFullscreen();
      else await document.exitFullscreen();
    } catch (err) {}
  }, []);

  const savePlayerName = useCallback(() => {
    const name = playerNameInput.trim() || 'Anonymous Player';
    try { localStorage.setItem('skilldrills_player_name', name); } catch (e) {}
    setShowNameInput(false);
  }, [playerNameInput]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/cognitive/attention/sustained-attention';
    if (navigator.share) {
      navigator.share({ title: 'Sustained Attention Drill', text: 'Test your sustained attention and reaction speed! Free online cognitive training.', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(234,88,12,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  const totalMistakes = stats.misses + stats.wrongs;
  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracy;

  return (
    <div className="min-h-screen select-none bg-[#050505] text-white selection:bg-transparent font-sans" style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/cognitive" className="text-gray-500 hover:text-gray-300 transition-colors">Cognitive</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-gray-500 hover:text-gray-300 transition-colors">Attention</li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-orange-400 font-medium">Sustained Attention</li>
            </ol>
          </nav>
        )}
        
        {/* Header */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.3)]">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Sustained Attention</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Target Detection • Adaptive Speed • Touch/Click</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">

              {gameState === 'playing' && (
                <button onClick={() => { endGame(); startGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset">
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

        {showNameInput && (
          <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-900 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <input type="text" value={playerNameInput} onChange={e => setPlayerNameInput(e.target.value)} placeholder="Enter your display name" maxLength={20}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                onKeyDown={e => e.key === 'Enter' && savePlayerName()} />
              <button onClick={savePlayerName} className="px-5 py-2.5 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-500 transition-colors shadow-lg shadow-orange-600/20">Save</button>
            </div>
          </div>
        )}

        {/* Dynamic HUD */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-orange-400" />} value={currentScore} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
          <StatCard icon={<Activity className="text-indigo-400" />} value={currentSpeed} label="Speed" unit="ms" />
          <StatCard icon={<Award className="text-purple-400" />} value={accuracy} label="Accuracy" unit="%" />
          <StatCard icon={<Zap className="text-yellow-400" />} value={stats.combo} label="Combo" />
          <StatCard icon={<Trophy className="text-yellow-400" />} value={bestScore} label="Best" />
        </div>

        {/* Dynamic Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {localFeedback.visible && (
            <div key={localFeedback.id} className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
              {localFeedback.text}
            </div>
          )}
        </div>

        {/* Game Container: Adaptive Scale */}
        <div ref={gameContainerRef} 
          onContextMenu={(e) => { if(gameState === 'playing') e.preventDefault(); }}
          className={`relative overflow-hidden w-full flex flex-col items-center justify-center transition-all duration-100 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-[#050505]' 
              : 'rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[500px] md:aspect-video bg-[#050505]'
          }`}
          style={{ 
            touchAction: gameState === 'playing' ? 'none' : 'auto', 
            overscrollBehavior: gameState === 'playing' ? 'none' : 'auto'
          }}>
          
          {/* Subtle grid background */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

          {/* Time Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
              <div 
                className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`}
                style={{ width: `${(localTimeRemaining / 60) * 100}%` }}
              />
            </div>
          )}

          {/* In-Game Controls (Fullscreen) */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-[60] flex gap-2">
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); endGame(); startGame(); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setSoundEnabled(v => !v); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            </div>
          )}

          {/* MAIN GAMEPLAY AREA */}
          {gameState === 'playing' && (
            <button 
              onPointerDown={(e) => handleGameInteraction(e, currentNumber)}
              disabled={isMemorizing}
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center focus:outline-none touch-none disabled:cursor-not-allowed">
              
              {isMemorizing ? (
                <div className="text-center animate-in fade-in zoom-in duration-300 pointer-events-none">
                  <p className="text-xl sm:text-2xl mb-4 font-black text-gray-400 tracking-widest uppercase">Memorize Target:</p>
                  <div className="text-[120px] sm:text-[160px] font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600 drop-shadow-[0_0_30px_rgba(234,88,12,0.6)] leading-none">
                    {targetNumber}
                  </div>
                </div>
              ) : currentNumber !== null ? (
                <>
                  <div key={currentNumber} className="absolute inset-0 flex items-center justify-center animate-in zoom-in-50 fade-in duration-75 pointer-events-none">
                    <div className="text-[150px] sm:text-[250px] font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] leading-none select-none">
                      {currentNumber}
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl text-gray-400 font-bold tracking-widest text-sm shadow-lg pointer-events-none opacity-50">
                    TARGET: <span className="text-orange-400 text-xl ml-1">{targetNumber}</span>
                  </div>
                </>
              ) : null}
            </button>
          )}

          {/* START SCREEN */}
          {gameState === 'start' && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
              <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                {!isMobileLandscape && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(234,88,12,0.3)] rotate-3">
                    <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                )}
                <h2 className="text-xl sm:text-3xl font-black mb-2 tracking-tight">Sustained Attention</h2>
                <p className="text-sm sm:text-base mb-6 text-gray-400 leading-relaxed pointer-events-none">Tap anywhere ONLY when the flashing number matches the target.</p>
                
                <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none shrink-0 shadow-[0_0_20px_rgba(234,88,12,0.3)]">
                  <Play className="w-5 h-5 fill-white" /> START DRILL
                </button>
              </div>
            </div>
          )}

          {/* END SCREEN */}
          {gameState === 'ended' && (
            <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6" onPointerDown={e => e.stopPropagation()}>
              <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[95vh] overflow-y-auto my-auto">
                
                <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    {isNewBest && (
                      <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                        ⭐ New Personal Best
                      </div>
                    )}
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                    <p className="text-orange-400 font-medium text-xs sm:text-sm">Sustained Attention • Peak Speed: {speedRef.current}ms</p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 pointer-events-none shrink-0">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                      <div className="flex items-end gap-1">
                        <span className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tighter">{currentScore}</span>
                        <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">PTS</span>
                      </div>
                    </div>
                    
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <path className="text-gray-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path 
                          className={`${accuracy >= 80 ? 'text-green-500' : accuracy >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                          strokeWidth="3" strokeDasharray={`${strokeDasharray}`} strokeDashoffset={`${strokeDashoffset}`} strokeLinecap="round" stroke="currentColor" fill="none" 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-base sm:text-xl font-black ${accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracy}%</span>
                        <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Perfects</div>
                      <div className="text-base sm:text-xl font-black text-emerald-400">{stats.hits}</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Mistakes</div>
                      <div className="text-base sm:text-xl font-black text-red-400">{totalMistakes}</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Combo</div>
                      <div className="text-base sm:text-xl font-black text-yellow-400">{statsRef.current.bestCombo}</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                  <button onPointerDown={e => e.stopPropagation()} onClick={() => { endGame(); startGame(); }} className="flex-1 py-3 sm:py-4 bg-orange-600 text-white rounded-xl font-black tracking-wide hover:bg-orange-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,88,12,0.4)] text-sm sm:text-base">
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                  </button>
                  <button onPointerDown={e => e.stopPropagation()} onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button onPointerDown={e => e.stopPropagation()} onClick={handleExit} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                
              </div>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* INSTRUCTIONS & INFO */}
        {/* ============================================================ */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-orange-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="green" text="Correct Target" highlight="+20 PTS | +5s" result="Increases Speed" />
                  <RuleItem color="purple" text="Adaptive Speed" highlight="Scales Down" result="Based on Precision" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="red" text="Wrong / Miss" highlight="-10 PTS | -5s" result="Decreases Speed" />
                  <RuleItem color="blue" text="Time Limit Capped" highlight="Max 60 Seconds" result="Endless Survival" />
                </div>
              </div>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-orange-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Sustained Attention</h2>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This cognitive drill tests <strong className="text-white font-semibold">sustained attention</strong> and <strong className="text-white font-semibold">inhibitory control</strong> in a high-pressure, endless time-attack format. By requiring you to rapidly detect target numbers and suppress impulsive reactions to distractors, it builds the mental endurance necessary for long-term focus and precision under fatigue.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Gamers optimizing reaction consistency, students pushing through study sessions, and professionals needing to filter information without losing focus.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Vigilance, sustained attention span, impulse control, visual target detection, and raw processing speed under adaptive pressure.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score, accuracy percentage, target hit ratio, and your absolute peak processing boundary (Flash Speed in ms).</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Rhythmic Processing:</strong> Establish a mental rhythm matching the interval of the flashes. Do not attempt to react immediately; let the visual metronome guide your tap.</li>
                    <li><strong className="text-gray-200">Impulse Suppression:</strong> The engine forces high-speed distractor strings. Keep your finger/cursor ready but <strong className="text-white font-semibold">actively suppress the urge to tap</strong> unless you perfectly verify the target.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> You must maintain accuracy to add time (+5s) and score (+20 PTS) back to your clock. Misses actively drain the clock (-5s). The max time ceiling is 60 seconds.</li>
                  </ul>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-orange-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">How does the difficulty adapt?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">The engine maps directly to your precision. Every successful target scales the presentation speed downward, shrinking the visual flash window to a minimum of 200ms. If you miss or false-alarm, the engine gracefully slows down to allow recovery.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Why did I lose points without tapping?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">This drill penalizes inaction equally. If the target number appears and the timer runs out before you tap, it registers as a "Missed Target" mistake, incurring a direct -10 point penalty and draining 5 seconds from your clock.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* RELATED DRILLS */}
        {/* ============================================================ */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related cognitive drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-orange-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/cognitive/attention/selective-attention" title="Selective Attention" desc="Focus on relevant information while ignoring distractions." color="blue" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Divided Attention" desc="Handle multiple tasks simultaneously with accuracy." color="purple" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/focus/concentration-grid" title="Concentration Grid" desc="Search grids linearly under intense time pressure." color="teal" icon={<Search className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/processing-speed/reaction-time" title="Reaction Time" desc="Raw millisecond visual reaction testing." color="orange" icon={<Zap className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* FOOTER */}
        {/* ============================================================ */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Visual Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual/visual-recognition/entropic-grid" className="hover:text-orange-400 transition-colors">Entropic Grid</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-orange-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-orange-450 hover:text-orange-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-orange-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-orange-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-orange-450 hover:text-orange-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-orange-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-orange-400 transition-colors">Aim Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-orange-450 hover:text-orange-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-orange-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-orange-400 transition-colors">Divided Attention</Link></li>
                    <li><Link href="/drills/cognitive" className="text-orange-450 hover:text-orange-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic" className="hover:text-orange-400 transition-colors">Academic (12)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-orange-400 transition-colors">Mental Fitness (6)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-orange-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500/25 to-red-500/25 border border-orange-500/30 rounded-lg flex items-center justify-center">
                    <Hash className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[10px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[10px] max-w-2xl mx-auto leading-relaxed mb-8">
                  Open-source telemetry training platform. Free forever. No downloads required.
                </p>
                
                <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Twitter / X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// === Subcomponents ===

function StatCard({ icon, value, label, unit = '' }) {
  return (
    <div className="group rounded-xl border border-slate-900 bg-slate-950/40 p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-slate-800 backdrop-blur-sm pointer-events-none">
      <div className="mb-0.5 flex justify-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
        {icon}
      </div>
      <p className="text-xs sm:text-sm md:text-base font-extrabold tracking-tight truncate text-white">
        {value}
        <span className="text-[10px] sm:text-xs font-semibold ml-0.5 opacity-80 text-slate-400">{unit}</span>
      </p>
      <p className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 truncate">{label}</p>
    </div>
  );
}

function RuleItem({ color, text, highlight = '', result }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500', 
    purple: 'bg-purple-600 text-purple-300 border-purple-500', 
    green: 'bg-green-600 text-green-300 border-green-500', 
    red: 'bg-red-600 text-red-300 border-red-500',
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500'
  };
  const colors = colorMap[color] || 'bg-slate-600 text-slate-300 border-slate-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-[#0b0f19]/40 p-4 rounded-xl border border-slate-800 shadow-sm">
      <div className={`w-3 h-3 rounded-full ${bg} shadow-lg flex-shrink-0`}></div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-slate-300">
          {text}{highlight && <span className={`font-black ${txt}`}> {highlight}</span>}
        </p>
        <div className={`text-xs font-black px-3 py-1.5 rounded-lg bg-[#050811] border ${border} ${txt} whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left`}>
          {result}
        </div>
      </div>
    </div>
  );
}

function RelatedCard({ href, title, desc, color, icon }) {
  const gradients = {
    blue: 'from-blue-500 to-indigo-500',
    cyan: 'from-cyan-500 to-teal-500',
    purple: 'from-purple-500 to-violet-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
    teal: 'from-teal-500 to-emerald-500',
    green: 'from-green-500 to-emerald-500'
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:-translate-y-1 hover:border-orange-500/50`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-orange-500 to-red-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050508] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-orange-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-orange-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}