'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, 
  BarChart3, Info, Compass, RefreshCw, 
  Crosshair, Users, Share2, 
  GraduationCap, Lightbulb, TrendingUp, ArrowRight,
  Brain, Keyboard, CheckCircle, XCircle, LogOut,
  ChevronRight, Play, Calculator, Code2, Eye
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';

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
  }

  playPop() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  playBuzz() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth'; 
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }
  
  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ============================================================
// LOCAL STORAGE
// ============================================================
const STORAGE_KEY = 'skilldrills_symbol_matching_v4';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0 };
    const data = JSON.parse(raw);
    return { bestScore: Math.max(0, parseInt(data.bestScore) || 0) };
  } catch (e) {
    return { bestScore: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ bestScore: data.bestScore }));
  } catch (e) {}
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function SymbolMatchingClient() {
  
  // === UI State ===
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game State ===
  const SYMBOLS = useRef(['Δ', 'Φ', 'Ω', 'Σ', 'Ξ', 'Π', 'Ψ', 'Γ', 'Θ']);
  const [keyMap, setKeyMap] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [flashBg, setFlashBg] = useState(null); 

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [currentSpeedLvl, setCurrentSpeedLvl] = useState(1);

  // === Custom Decoupled Timer ===
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // === Absolute Truth Refs ===
  const mountedRef = useRef(false);
  const gameContainerRef = useRef(null);
  
  const scoreRef = useRef(0);
  const correctRef = useRef(0);
  const mistakesRef = useRef(0);
  const localTimeRef = useRef(60);

  // Adaptive Speed Refs
  const speedRef = useRef(2500);
  const currentTargetRef = useRef(null);

  const targetTimerRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  
  const gameStateRef = useRef('start');

  // Sync state for UI rendering
  const syncToUI = useCallback(() => {
    setScore(scoreRef.current);
    setCorrectCount(correctRef.current);
    setMistakes(mistakesRef.current);
    setCurrentSpeedLvl(Math.floor(correctRef.current / 10) + 1);
  }, []);

  // === Game Engine ===
  const engine = useGameEngine({
    category: 'cognitive',
    drillId: 'symbol-matching',
    drillName: 'Symbol Matching',
    totalGameTime: 9999, 
    lives: 9999, 
    infiniteLives: true, 
    sharePath: 'drills/cognitive/processing-speed/symbol-matching',
  });

  const engineRef = useRef(engine);

  useEffect(() => {
    engineRef.current = engine;
    gameStateRef.current = engine.gameState;
    if (engine.gameState === 'playing') {
      setIsNewBest(false);
    }
  }, [engine.gameState]);

  // === Custom Precision Clock ===
  useEffect(() => {
    if (engine.gameState !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }
    
    if (!isTimeUp && localTimeRef.current === 60 && localTimeRemaining === 60) {
      // Init
    } else if (!isTimeUp && localTimeRef.current <= 0) {
      localTimeRef.current = 60;
      setLocalTimeRemaining(60);
    }

    timerIntervalRef.current = setInterval(() => {
      localTimeRef.current -= 1;
      
      if (localTimeRef.current <= 0) {
        localTimeRef.current = 0;
        setLocalTimeRemaining(0);
        clearInterval(timerIntervalRef.current);
        setIsTimeUp(true); 
        
        if (typeof engineRef.current?.endGame === 'function') {
          engineRef.current.endGame();
        }
      } else {
        setLocalTimeRemaining(localTimeRef.current);
      }
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [engine.gameState, isTimeUp, localTimeRemaining]);

  // Audio Sync
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Load Data
  useEffect(() => {
    setIsClient(true);
    mountedRef.current = true;
    try {
      const savedData = getSavedData();
      if (savedData.bestScore) setBestScore(savedData.bestScore);
      const name = localStorage.getItem('skilldrills_player_name');
      if (name) setPlayerNameInput(name);
    } catch (e) {}
    setTimeout(() => { if (mountedRef.current) setLoading(false); }, 200);

    return () => {
      mountedRef.current = false;
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (targetTimerRef.current) clearTimeout(targetTimerRef.current);
    };
  }, []);

  // Screen Guard & Fullscreen Sync
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsHandler);
    
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '') && window.innerWidth < 1024;
      
      // Force rotation warning if in portrait mode on mobile
      if (isMobile && window.innerHeight > window.innerWidth) { 
        setShowRotateWarning(true); 
      } else {
        setShowRotateWarning(false);
      }
    };
    
    checkSize();
    window.addEventListener('resize', checkSize);
    window.addEventListener('orientationchange', checkSize);
    return () => {
      document.removeEventListener('fullscreenchange', fsHandler);
      window.removeEventListener('resize', checkSize);
      window.removeEventListener('orientationchange', checkSize);
    };
  }, []);

  // Game End Logic (Save Score)
  useEffect(() => {
    if (engine.gameState === 'ended' || isTimeUp) {
      const finalScore = scoreRef.current;
      if (finalScore > bestScore && finalScore > 0) {
        setIsNewBest(true);
        setBestScore(finalScore);
        saveData({ bestScore: finalScore });
      }
      syncToUI();
      if (targetTimerRef.current) clearTimeout(targetTimerRef.current);
    }
  }, [engine.gameState, isTimeUp, bestScore, syncToUI]);

  // === UI Handlers ===
  const savePlayerName = useCallback(() => {
    const name = playerNameInput.trim() || 'Anonymous Player';
    try { localStorage.setItem('skilldrills_player_name', name); } catch (e) {}
    setShowNameInput(false);
  }, [playerNameInput]);

  const enterFullscreen = useCallback(async () => {
    if (!gameContainerRef.current) return;
    try {
      const el = gameContainerRef.current;
      const reqFS = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
      if (reqFS) await reqFS.call(el);
    } catch (err) {}
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {}
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await enterFullscreen();
    } else {
      await exitFullscreen();
    }
  }, [enterFullscreen, exitFullscreen]);

  const handleExitGame = useCallback(async () => {
    await exitFullscreen();
    window.location.reload();
  }, [exitFullscreen]);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 600);
  }, []);

  // === CORE MECHANICS ===
  const applyPenalty = useCallback((reason) => {
    if (audioSynth) audioSynth.playBuzz();
    
    // Penalties: -5 Score, -2s Time, decrease difficulty (increase time allowed)
    scoreRef.current = Math.max(0, scoreRef.current - 5); 
    mistakesRef.current += 1;
    localTimeRef.current -= 2; 
    
    if (localTimeRef.current <= 0) {
      localTimeRef.current = 0;
      setLocalTimeRemaining(0);
      setIsTimeUp(true);
      if (typeof engineRef.current?.endGame === 'function') {
        engineRef.current.endGame();
      }
      return;
    }
    
    setLocalTimeRemaining(localTimeRef.current);
    
    // Forgiveness: Slow the game down slightly by 50ms
    speedRef.current = Math.min(2500, speedRef.current + 50);

    syncToUI();
    triggerFeedback(reason === 'timeout' ? 'Too Slow! -5 PTS | -2s' : 'Wrong! -5 PTS | -2s', 'error');
    
    setFlashBg('red');
    setTimeout(() => setFlashBg(null), 100);
  }, [syncToUI, triggerFeedback]);

  const spawnNextTarget = useCallback(() => {
    if (targetTimerRef.current) clearTimeout(targetTimerRef.current);
    if (gameStateRef.current !== 'playing' || localTimeRef.current <= 0) return;

    // Generate New Map
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5); 
    const newMap = SYMBOLS.current.map((symbol, i) => ({ symbol, number: numbers[i] })); 
    setKeyMap(newMap);

    // Pick random target
    const target = newMap[Math.floor(Math.random() * newMap.length)];
    currentTargetRef.current = target;
    setCurrentTarget(target);

    // Auto-Timeout Loop
    targetTimerRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing' && mountedRef.current && localTimeRef.current > 0) {
        applyPenalty('timeout');
        if (localTimeRef.current > 0) {
          spawnNextTarget();
        }
      }
    }, speedRef.current);
  }, [applyPenalty]);

  // === INTERACTION HANDLERS ===
  const handleInput = useCallback((num) => {
    if (gameStateRef.current !== 'playing' || localTimeRef.current <= 0) return;
    
    const target = currentTargetRef.current;
    if (!target) return;
    currentTargetRef.current = null; 

    if (num === target.number) {
      // CORRECT HIT: +20 Score, +10s Time (Max 60), Increase difficulty
      if (audioSynth) audioSynth.playPop();
      
      scoreRef.current += 20; 
      correctRef.current += 1;
      localTimeRef.current = Math.min(60, localTimeRef.current + 10);
      setLocalTimeRemaining(localTimeRef.current);
      
      // Speed Ramp: Increase speed by 30ms (cap at 400ms)
      speedRef.current = Math.max(400, speedRef.current - 30);
      
      syncToUI();
      triggerFeedback('Perfect! +20 PTS | +10s', 'success');
      
      setFlashBg('green');
      setTimeout(() => setFlashBg(null), 100);

      spawnNextTarget();
    } else {
      // WRONG HIT
      applyPenalty('wrong_match');
      if (localTimeRef.current > 0) {
        spawnNextTarget();
      }
    }
  }, [applyPenalty, syncToUI, triggerFeedback, spawnNextTarget]);

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStateRef.current !== 'playing') return;
      const n = parseInt(e.key);
      if (n >= 1 && n <= 9) {
        e.preventDefault(); 
        handleInput(n);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput]);

  // Start sequence
  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    
    // Auto Fullscreen Trigger
    await enterFullscreen();
    
    setIsTimeUp(false);
    localTimeRef.current = 60;
    setLocalTimeRemaining(60);
    
    scoreRef.current = 0;
    correctRef.current = 0;
    mistakesRef.current = 0;
    speedRef.current = 2500; 
    currentTargetRef.current = null;
    
    syncToUI();
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });
    
    engineRef.current.startGame();

    setTimeout(() => spawnNextTarget(), 300);
  }, [syncToUI, spawnNextTarget, enterFullscreen]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/cognitive/processing-speed/symbol-matching';
    if (navigator.share) {
      navigator.share({ title: 'Symbol Matching Speed Drill', text: 'Hardcore cognitive reaction drill! Can you keep up?', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(139,92,246,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Decoder...</p>
        </div>
      </div>
    );
  }

  const totalActions = correctCount + mistakes;
  const accuracy = totalActions > 0 ? Math.round((correctCount / totalActions) * 100) : 100;
  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracy;

  return (
    <div className="min-h-screen select-none bg-black text-white selection:bg-transparent" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/drills/cognitive" className="text-gray-500 hover:text-gray-300 transition-colors">Cognitive</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-gray-500">Processing Speed</li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-violet-400 font-medium">Symbol Matching</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Symbol Matching</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Endless Time-Attack • Precision Scoring</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            
            {engine.gameState === 'playing' && !isTimeUp && (
              <button onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset">
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

        {showNameInput && (
          <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-900 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <input type="text" value={playerNameInput} onChange={e => setPlayerNameInput(e.target.value)} placeholder="Enter your display name" maxLength={20}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                onKeyDown={e => e.key === 'Enter' && savePlayerName()} />
              <button onClick={savePlayerName} className="px-5 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-500 transition-colors shadow-lg shadow-violet-600/20">Save</button>
            </div>
          </div>
        )}

        {/* Inline Stats Bar (Responsive) */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-2 w-full">
          <StatCard icon={<Target className="text-violet-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining} label="Time" unit="s" />
          <StatCard icon={<Zap className="text-indigo-400" />} value={`Lv.${currentSpeedLvl}`} label="Speed Lvl" />
          <StatCard icon={<CheckCircle className="text-emerald-400" />} value={correctCount} label="Matches" />
          <StatCard icon={<XCircle className="text-red-400" />} value={mistakes} label="Penalties" />
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

        {/* Game Container (Optimized for Mobile Landscape & Fullscreen) */}
        <div ref={gameContainerRef} 
          onContextMenu={(e) => { if(engine.gameState === 'playing' && !isTimeUp) e.preventDefault(); }}
          className={`relative overflow-hidden flex flex-col transition-colors duration-100 bg-[#0a0a0a] mx-auto ${
            isFullscreen 
              ? 'fixed inset-0 z-50' 
              : 'rounded-2xl border border-gray-700 shadow-2xl w-full h-[65vh] md:h-[75vh] min-h-[400px] max-h-[700px]'
          }`}
          style={{ 
            touchAction: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto', 
            overscrollBehavior: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto',
            backgroundColor: flashBg === 'red' ? '#450a0a' : flashBg === 'green' ? '#064e3b' : '#0a0a0a',
            ...(isFullscreen && { width: '100vw', height: '100vh', maxWidth: 'none', margin: 0, borderRadius: 0, border: 'none' })
          }}>
          
          {/* Subtle background gradient */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-violet-900/10" />

          {/* Time Progress Bar */}
          {engine.gameState === 'playing' && !isTimeUp && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-violet-500'}`}
                style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }}
              />
            </div>
          )}

          {showRotateWarning && engine.gameState !== 'playing' && (
            <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 backdrop-blur-sm touch-none">
              <div className="animate-bounce mb-6 text-violet-500">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Rotate Device</h3>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">Please rotate your device to landscape mode for the best playing experience.</p>
            </div>
          )}

          {isFullscreen && engine.gameState === 'playing' && !isTimeUp && !showRotateWarning && (
            <div className="absolute top-4 right-4 z-[60] flex gap-2">
              <button onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={exitFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* === PHASE 2: ACTIVE GAMEPLAY === */}
          {engine.gameState === 'playing' && !isTimeUp && !showRotateWarning && currentTarget && (
            <div className="flex flex-col w-full h-full p-2 sm:p-4 pb-4">
              
              {/* Reference Key (Top Row) */}
              <div className="w-full bg-gray-900/50 rounded-xl border border-gray-800 p-1 sm:p-2 shadow-md backdrop-blur-sm z-10 shrink-0">
                <div className="grid grid-cols-9 gap-1 sm:gap-2">
                  {keyMap.map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-full py-1 sm:py-2 flex items-center justify-center text-[10px] sm:text-base md:text-xl font-bold rounded-t border-b-2 bg-gray-800 border-gray-700 text-white shadow-inner">
                        {item.symbol}
                      </div>
                      <div className="w-full py-0.5 sm:py-1.5 flex items-center justify-center text-[9px] sm:text-sm md:text-base font-black rounded-b bg-gray-950 text-violet-400">
                        {item.number}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Symbol (Center) */}
              <div className="flex-1 flex items-center justify-center relative min-h-0">
                <div key={currentTarget.symbol} className="font-bold leading-none text-5xl sm:text-[6rem] md:text-[8rem] text-white animate-in zoom-in-75 duration-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {currentTarget.symbol}
                </div>
              </div>

              {/* Number Pad (Bottom Row) */}
              <div className="w-full shrink-0">
                <div className="grid grid-cols-9 gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                    <button 
                      key={n} 
                      onPointerDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleInput(n);
                      }} 
                      className="h-10 sm:h-12 md:h-16 rounded-lg sm:rounded-xl font-black flex items-center justify-center border-2 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-500 text-base sm:text-xl md:text-2xl bg-gray-800 border-gray-700 text-white hover:border-violet-500 hover:bg-gray-700 shadow-md touch-none"
                      aria-label={`Press ${n}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Minimal Start Screen */}
          {engine.gameState === 'start' && !showRotateWarning && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 p-4 backdrop-blur-sm">
              <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                  <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black mb-8 pointer-events-none tracking-tight">Symbol Matching</h2>
                
                <button 
                  onClick={handleStartGame}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-black text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(139,92,246,0.3)] focus:outline-none">
                  <Play className="w-5 h-5 fill-white" />
                  START DRILL
                </button>
              </div>
            </div>
          )}

          {/* Premium Custom End Screen */}
          {(engine.gameState === 'ended' || isTimeUp) && !showRotateWarning && (
            <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/90 pointer-events-auto animate-in fade-in duration-300 p-4">
              <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 overflow-hidden flex flex-col max-h-[95vh]">
                
                <div className="bg-gradient-to-br from-violet-900/40 to-purple-900/40 p-5 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    {isNewBest && (
                      <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                        ⭐ New Personal Best
                      </div>
                    )}
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                    <p className="text-violet-400 font-medium text-sm sm:text-base">Symbol Matching • Speed Lvl {currentSpeedLvl}</p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pointer-events-none overflow-y-auto flex-1">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                      <div className="flex items-end gap-1">
                        <span className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tighter">{score}</span>
                        <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">PTS</span>
                      </div>
                    </div>
                    
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <path className="text-gray-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path 
                          className={`${accuracy >= 80 ? 'text-green-500' : accuracy >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                          strokeWidth="3" strokeDasharray={`${strokeDasharray}`} strokeDashoffset={`${strokeDashoffset}`} strokeLinecap="round" stroke="currentColor" fill="none" 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-lg sm:text-xl font-black ${accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracy}%</span>
                        <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-gray-900/50 rounded-xl p-3 text-center border border-gray-800">
                      <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Correct Matches</div>
                      <div className="text-xl font-black text-cyan-400">{correctCount}</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-3 text-center border border-gray-800">
                      <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Penalties</div>
                      <div className="text-xl font-black text-red-400">{mistakes}</div>
                    </div>
                  </div>
                </div>

                {/* Sticky Action Buttons */}
                <div className="p-4 sm:p-5 bg-gray-900/80 border-t border-gray-800 flex flex-wrap gap-2 sm:gap-3 shrink-0">
                  <button onClick={handleStartGame} className="flex-1 min-w-[140px] py-3.5 bg-violet-600 text-white rounded-xl font-black tracking-wide hover:bg-violet-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                    <RefreshCw className="w-5 h-5" /> PLAY AGAIN
                  </button>
                  <button onClick={shareDrillLink} className="px-5 py-3.5 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button onClick={handleExitGame} className="px-5 py-3.5 bg-gray-800 text-red-400 rounded-xl font-bold hover:bg-gray-700 hover:text-red-300 transition-all active:scale-95 border border-gray-700 flex items-center justify-center">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
                
              </div>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* DRILL INFO SECTIONS */}
        {/* ============================================================ */}

        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Target className="w-5 h-5 text-violet-400" /><h2 className="font-bold text-white text-lg tracking-wide">Detailed Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="blue" text="Tap the" highlight="matching number" result="+20 PTS | +10s Time" />
                  <RuleItem num="2" color="indigo" text="Speed up on hits" highlight="Endless scaling" result="Increases Difficulty" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Timeout / Wrong Match" result="-5 PTS | -2s Time" />
                  <RuleItem num="4" color="purple" text="Keyboard support" highlight="Press 1-9" result="Use for maximum speed" />
                </div>
              </div>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-violet-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About This Symbol Matching Drill</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This free Symbol Matching drill trains cognitive flexibility and raw processing speed. By forcing your brain to constantly re-map distinct symbols to numbers on the fly under extreme time constraints, you actively break and re-build neural associations. It scales infinitely to match your processing limit.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Gamers, coders, students, and professionals needing to process shifting visual data without freezing under pressure.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Cognitive flexibility, visual processing speed, visual-motor mapping, and rapid subconscious pattern recognition.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score, overall accuracy percentage, total correct matches, penalty count, and your peak dynamic speed level.</p>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white tracking-wide">How to Play</h3>
                  </div>
                  <ol className="text-sm leading-relaxed space-y-4 list-decimal pl-5 text-gray-300">
                    <li>Identify the large <span className="font-bold text-white">target symbol</span> displayed in the center of the screen.</li>
                    <li>Quickly scan the top reference grid to find the corresponding <span className="text-violet-400 font-bold">number</span> matched to that symbol.</li>
                    <li>Tap the correct number on the keypad (or use your physical keyboard keys <span className="font-bold text-gray-200">1-9</span> for maximum speed).</li>
                    <li>With each correct match, you bank time, score points, and the drill speeds up. Hesitation causes the target to timeout, heavily draining your clock.</li>
                  </ol>
                </div>

                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why does the timer seem to drop randomly?</h4>
                      <p className="text-xs text-gray-400 mt-1">Every wrong answer or timeout applies an instant -2 second penalty to your clock. If you aren't paying close attention, these mistakes will drain your time extremely fast.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">How do I increase my response speed?</h4>
                      <p className="text-xs text-gray-400 mt-1">Look at the target symbol first, keep that image in your working memory, and then scan the key block. Do not waste time reading every symbol in the grid. On desktop, resting your fingers on the number row keys allows instant reactions.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why does the target change before I click?</h4>
                      <p className="text-xs text-gray-400 mt-1">This is an Endless Time-Attack mode. The target has a specific duration based on your current speed level. If you don't answer in time, it counts as a penalty miss and moves to the next symbol automatically.</p>
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
          <section className="mt-14" aria-label="Related drills">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-violet-500 to-purple-600"></div>
              <h2 className="text-xl font-bold text-white">Explore Related Free Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/cognitive/attention/elite-neuro-switch" title="Elite Neuro-Switch" desc="Click RED targets while ignoring BLUE distractors." color="red" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Divided Attention" desc="Focus on relevant information while ignoring distractions." color="blue" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/focus/concentration-grid" title="Concentration Grid" desc="Find numbers in sequence under time pressure." color="purple" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/processing-speed/reaction-time" title="Reaction Time" desc="Test visual reaction speed with simple click response." color="orange" icon={<Zap className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* FOOTER */}
        {/* ============================================================ */}
        {!isFullscreen && (
          <footer className="mt-16 bg-gray-950 text-gray-400 rounded-3xl py-12 px-8 border border-gray-800 shadow-xl" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">FPS Training</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li>
                    <li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 font-medium transition-colors mt-2 block">All 21 FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">Cognitive</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Divided Attention</Link></li>
                    <li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 font-medium transition-colors mt-2 block">All 16 Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">Academic</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li>
                    <li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 font-medium transition-colors mt-2 block">All 12 Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">Visual & Motor</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li>
                    <li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 font-medium transition-colors mt-2 block">All 14 Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">More Sections</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li>
                    <li><Link href="/drills/cognitive" className="hover:text-white transition-colors">Cognitive</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/20">
                    <Compass className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-black text-xl tracking-tight">SkillDrills</span>
                </div>
                <p className="text-sm mb-3 font-medium">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-8 text-gray-500">
                  Free online symbol matching drill. Train your cognitive flexibility and processing speed in an endless Time-Attack challenge.
                </p>
                
                <div className="flex items-center justify-center gap-6 flex-wrap">
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

function StatCard({ icon, value, label, unit = '' }) {
  return (
    <div className="flex-1 min-w-[28%] sm:min-w-[15%] rounded-xl border border-gray-800 bg-gray-900 p-1.5 sm:p-3 text-center flex flex-col justify-center h-full min-h-[70px] sm:min-h-[80px] transition-all duration-300 hover:border-gray-600 shadow-md pointer-events-none">
      <div className="mb-0.5 sm:mb-1.5 flex justify-center opacity-90 scale-75 sm:scale-100">{icon}</div>
      <p className="text-sm sm:text-2xl lg:text-3xl font-black tracking-tighter truncate text-white leading-none mt-0.5 sm:mt-0">
        {value}<span className="text-[10px] sm:text-sm font-bold ml-0.5 text-gray-500">{unit}</span>
      </p>
      <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest truncate text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function RuleItem({ num, color, text, highlight = '', result }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    indigo: 'bg-indigo-600 text-indigo-300 border-indigo-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    purple: 'bg-purple-600 text-purple-300 border-purple-500' 
  };
  const colors = colorMap[color] || 'bg-gray-600 text-gray-300 border-gray-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-gray-800 shadow-sm">
      <div className={`w-8 h-8 rounded-xl ${bg} border border-t-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0`}>{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-300">
          {text}{highlight && <span className={`font-black ${txt}`}> {highlight}</span>}
        </p>
        <div className={`text-xs font-black px-3 py-1.5 rounded-lg bg-gray-900 border ${border} ${txt} whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left`}>
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
    emerald: 'from-emerald-500 to-green-500',
    rose: 'from-rose-500 to-pink-500',
    indigo: 'from-indigo-500 to-blue-500',
    red: 'from-red-500 to-rose-500'
  };
  
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:-translate-y-1 hover:border-gray-600 flex flex-col h-full">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-blue-500 to-indigo-500'}`}></div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-black border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-violet-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-gray-500 flex-1">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-violet-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}