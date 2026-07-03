'use client';

import { Component, useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Timer, Trophy, Volume2, VolumeX, Maximize2, Minimize2,
  Info, RefreshCw, RotateCcw, GraduationCap, Lightbulb, TrendingUp, 
  BarChart3, ArrowRight, Brain, AlertTriangle, Target, 
  XCircle, Play, Share2, ChevronRight, Activity, Eye, Grid, 
  LogOut, Users, Grid3X3, Award, Zap, Star, Hash, SkipForward
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

  playHit() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  playMiss() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth'; 
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }

  playSelect() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch(e) {}
  }

  playLevelUp() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch(e) {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ============================================================
// ERROR BOUNDARY
// ============================================================
class GameErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('Game Error:', error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050508] rounded-2xl z-[100] border border-red-500/30">
          <div className="text-center p-6">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-white text-lg font-bold mb-2">Engine Fault Detected</h3>
            <p className="text-gray-400 text-sm mb-6">The visual engine encountered a fatal error.</p>
            <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }} className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-500 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.3)]">Reboot Engine</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function GridMemorizationClient() {

  // === UI State ===
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game State ===
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  const [accuracy, setAccuracy] = useState(100);
  
  // === Grid State ===
  const [gridSize, setGridSize] = useState(4);
  const [litCells, setLitCells] = useState(5);
  const [cellStates, setCellStates] = useState([]);
  const [phase, setPhase] = useState("ready"); // "ready", "memorize", "recall", "result"
  const [memorizeTime, setMemorizeTime] = useState(5);
  const [userSelections, setUserSelections] = useState(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [stats, setStats] = useState({ roundsCompleted: 0, totalCorrect: 0, totalAttempts: 0 });

  // === Decoupled Engine Refs ===
  const mountedRef = useRef(false);
  const containerRef = useRef(null);
  
  const gameStateRef = useRef('start');
  const phaseRef = useRef('ready');
  const scoreRef = useRef(0);
  const timeRef = useRef(60);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  
  const gridSizeRef = useRef(4);
  const litCellsRef = useRef(5);
  const correctPatternRef = useRef(new Set());
  const userSelectionsRef = useRef(new Set());
  const statsRef = useRef({ roundsCompleted: 0, totalCorrect: 0, totalAttempts: 0 });

  const globalTimerIntervalRef = useRef(null);
  const memorizeTimerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);

  // Sync to UI
  const syncToUI = useCallback(() => {
    setScore(scoreRef.current);
    setStreak(streakRef.current);
    setStats({ ...statsRef.current });
    
    if (statsRef.current.totalAttempts > 0) {
      setAccuracy(Math.round((statsRef.current.totalCorrect / statsRef.current.totalAttempts) * 100));
    }
  }, []);

  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    setIsClient(true);
    mountedRef.current = true;
    try {
      const sScore = localStorage.getItem('skilldrills_grid_best_score');
      const sStreak = localStorage.getItem('skilldrills_grid_best_streak');
      if (sScore) setBestScore(parseInt(sScore, 10) || 0);
      if (sStreak) {
        const streakParsed = parseInt(sStreak, 10) || 0;
        setBestStreak(streakParsed);
        bestStreakRef.current = streakParsed;
      }
    } catch (e) {}
    setTimeout(() => { if (mountedRef.current) setLoading(false); }, 100);

    return () => {
      mountedRef.current = false;
      clearTimers();
    };
  }, []);

  const clearTimers = useCallback(() => {
    if (globalTimerIntervalRef.current) clearInterval(globalTimerIntervalRef.current);
    if (memorizeTimerIntervalRef.current) clearInterval(memorizeTimerIntervalRef.current);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
  }, []);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 1200);
  }, []);

  const endGame = useCallback(() => {
    clearTimers();
    gameStateRef.current = 'ended';
    setGameState('ended');
    
    const finalScore = scoreRef.current;
    if (finalScore > bestScore && finalScore > 0) {
      setBestScore(finalScore);
      setIsNewBest(true);
      try { localStorage.setItem('skilldrills_grid_best_score', finalScore.toString()); } catch(e) {}
    } else {
      setIsNewBest(false);
    }
    syncToUI();
  }, [bestScore, clearTimers, syncToUI]);

  // Fullscreen Guard & Mobile Touch Optimization
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsHandler);
    
    // Prevent default touch behaviors that disrupt gameplay on mobile
    const preventZoom = (e) => {
      if (e.touches && e.touches.length > 1) e.preventDefault();
    };
    document.addEventListener('touchmove', preventZoom, { passive: false });
    
    return () => {
      document.removeEventListener('fullscreenchange', fsHandler);
      document.removeEventListener('touchmove', preventZoom);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) await containerRef.current?.requestFullscreen();
      else await document.exitFullscreen();
    } catch (err) {}
  }, [isFullscreen]);

  // === CORE GAME LOGIC ===

  const generatePattern = useCallback((size, litCount) => {
    const totalCells = size * size;
    const pattern = new Set();
    while (pattern.size < litCount) {
      pattern.add(Math.floor(Math.random() * totalCells));
    }
    return pattern;
  }, []);

  const startRecall = useCallback(() => {
    if (memorizeTimerIntervalRef.current) clearInterval(memorizeTimerIntervalRef.current);
    setPhase("recall");
    phaseRef.current = "recall";
    setUserSelections(new Set());
    userSelectionsRef.current = new Set();
  }, []);

  const skipMemorize = useCallback(() => {
    setMemorizeTime(0);
    startRecall();
  }, [startRecall]);

  const generateRound = useCallback((size, litCount) => {
    const pattern = generatePattern(size, litCount);
    correctPatternRef.current = pattern;
    
    const states = Array(size * size).fill(false);
    pattern.forEach(idx => { states[idx] = true; });
    
    setCellStates(states);
    setGridSize(size);
    gridSizeRef.current = size;
    setLitCells(litCount);
    litCellsRef.current = litCount;
    
    setMemorizeTime(5);
    setPhase("memorize");
    phaseRef.current = "memorize";
    setIsProcessing(false);
    setUserSelections(new Set());
    userSelectionsRef.current = new Set();

    if (memorizeTimerIntervalRef.current) clearInterval(memorizeTimerIntervalRef.current);
    memorizeTimerIntervalRef.current = setInterval(() => {
      setMemorizeTime(prev => {
        if (prev <= 1) {
          startRecall();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

  }, [generatePattern, startRecall]);

  const advanceRound = useCallback(() => {
    const currentGridSize = gridSizeRef.current;
    const currentLitCells = litCellsRef.current;
    const nextLitCells = currentLitCells + 1;
    
    if (nextLitCells <= 9 && currentGridSize === 4) {
      generateRound(4, nextLitCells);
    } else if (currentGridSize === 4) {
      if (audioSynth) audioSynth.playLevelUp();
      triggerFeedback('🎯 LEVEL UP: 5×5 Grid!', 'success');
      generateRound(5, 5);
    } else if (nextLitCells <= 12 && currentGridSize === 5) {
      generateRound(5, nextLitCells);
    } else {
      generateRound(5, 5); // Keeps generating max difficulty
    }
  }, [generateRound, triggerFeedback]);

  // Handle cell click with Native Zero-Latency pointer events
  const toggleCell = useCallback((index, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
    }

    if (phaseRef.current !== "recall" || isProcessing) return;
    
    const correctPattern = correctPatternRef.current;
    
    // WRONG CELL CLICKED (-10 PTS, -5s Time)
    if (!correctPattern.has(index)) {
      setIsProcessing(true);
      if (audioSynth) audioSynth.playMiss();
      
      scoreRef.current = Math.max(0, scoreRef.current - 10);
      timeRef.current -= 5;
      
      statsRef.current.totalAttempts += 1;
      streakRef.current = 0;
      
      triggerFeedback('✗ WRONG! -10 PTS | -5s', 'error');

      // Drop difficulty logic
      let newGrid = gridSizeRef.current;
      let newLit = litCellsRef.current - 1;

      if (newGrid === 5 && newLit < 5) {
        newGrid = 4;
        newLit = 9;
      } else if (newGrid === 4 && newLit < 4) {
        newLit = 4; // minimum penalty threshold
      }
      
      setPhase("result");
      phaseRef.current = "result";
      syncToUI();

      if (timeRef.current <= 0) {
        setLocalTimeRemaining(0);
        endGame();
      } else {
        setLocalTimeRemaining(timeRef.current);
        setTimeout(() => {
          if (gameStateRef.current === 'playing') {
            generateRound(newGrid, newLit);
          }
        }, 800);
      }
      return;
    }
    
    // VALID CELL SELECTION
    const newSelections = new Set(userSelectionsRef.current);
    if (newSelections.has(index)) {
      newSelections.delete(index);
    } else {
      newSelections.add(index);
    }
    
    userSelectionsRef.current = newSelections;
    setUserSelections(newSelections);
    if (audioSynth) audioSynth.playSelect();
    
    // CHECK GRID COMPLETION (+20 PTS, +10s Time)
    if (newSelections.size === correctPattern.size) {
      setIsProcessing(true);
      if (audioSynth) audioSynth.playHit();
      
      scoreRef.current += 20;
      timeRef.current = Math.min(60, timeRef.current + 10);
      
      statsRef.current.totalCorrect += 1;
      statsRef.current.totalAttempts += 1;
      statsRef.current.roundsCompleted += 1;
      
      streakRef.current += 1;
      if (streakRef.current > bestStreakRef.current) {
        bestStreakRef.current = streakRef.current;
        setBestStreak(streakRef.current);
        try { localStorage.setItem('skilldrills_grid_best_streak', streakRef.current.toString()); } catch (e) {}
      }
      
      setLocalTimeRemaining(timeRef.current);
      syncToUI();
      triggerFeedback('✓ GRID CLEARED! +20 PTS | +10s', 'success');
      
      setPhase("result");
      phaseRef.current = "result";
      
      setTimeout(() => { 
        if (gameStateRef.current === 'playing') advanceRound(); 
      }, 500);
    }
  }, [isProcessing, endGame, generateRound, advanceRound, syncToUI, triggerFeedback]);


  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    
    clearTimers();
    setGameState('playing');
    gameStateRef.current = 'playing';
    
    setIsNewBest(false);
    
    scoreRef.current = 0;
    timeRef.current = 60;
    streakRef.current = 0;
    statsRef.current = { roundsCompleted: 0, totalCorrect: 0, totalAttempts: 0 };
    
    setLocalTimeRemaining(60);
    syncToUI();
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });

    // Auto Fullscreen on Start
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request failed", err);
    }

    // Global Countdown Clock
    globalTimerIntervalRef.current = setInterval(() => {
      timeRef.current -= 1;
      if (timeRef.current <= 0) {
        endGame();
      } else {
        setLocalTimeRemaining(timeRef.current);
      }
    }, 1000);

    generateRound(4, 5);

  }, [clearTimers, endGame, generateRound, syncToUI]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/memory/spatial-memory/grid-memorization';
    if (navigator.share) {
      navigator.share({ title: 'Grid Memorization Drill', text: 'Test your spatial memory capacity!', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied to clipboard!')).catch(() => prompt('Copy link:', url));
    }
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracy;

  return (
    <div className="min-h-screen select-none bg-[#050505] text-white selection:bg-transparent font-sans" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/drills/memory" className="text-gray-500 hover:text-gray-300 transition-colors">Memory</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-gray-500">Spatial Memory</li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-indigo-400 font-medium">Grid Memorization</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <Grid3X3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Grid Memorization</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Spatial Memory • High-Speed Recall • Mobile Optimized</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {gameState === 'playing' && (
              <button onClick={() => { endGame(); startGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset">
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Sound">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Fullscreen">
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Dynamic HUD */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-indigo-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining} label="Time" unit="s" />
          <StatCard icon={<Grid3X3 className="text-purple-400" />} value={`${gridSize}x${gridSize}`} label="Current Grid" />
          <StatCard icon={<Award className="text-cyan-400" />} value={accuracy} label="Accuracy" unit="%" />
          <StatCard icon={<Zap className="text-orange-400" />} value={streak} label="Streak" />
          <StatCard icon={<Trophy className="text-yellow-400" />} value={bestScore} label="Best" />
        </div>

        {/* Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {localFeedback.visible && (
            <div key={localFeedback.id} className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : localFeedback.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
              {localFeedback.text}
            </div>
          )}
        </div>

        {/* Game Container: Adaptive sizing for mobile vs desktop */}
        <GameErrorBoundary>
          <div ref={containerRef} 
            onContextMenu={(e) => { if(gameState === 'playing') e.preventDefault(); }}
            className={`relative overflow-hidden flex flex-col items-center justify-center bg-[#050505] transition-all duration-100 ${
              isFullscreen 
                ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] rounded-none' 
                : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[500px] md:aspect-video'
            }`}
            style={{ 
              margin: '0 auto',
              touchAction: gameState === 'playing' ? 'none' : 'auto', 
              overscrollBehavior: gameState === 'playing' ? 'none' : 'auto'
            }}>

            {/* Time Progress Bar */}
            {gameState === 'playing' && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
                <div className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-indigo-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} />
              </div>
            )}

            {/* In-Game Controls (Fullscreen) */}
            {isFullscreen && gameState === 'playing' && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onClick={() => { endGame(); startGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
                <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
              </div>
            )}

            {/* GAMEPLAY AREA */}
            {gameState === 'playing' && (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                
                {/* Visual-Only Headers */}
                {phase === "memorize" && (
                  <div className="flex items-center w-full max-w-[300px] sm:max-w-[400px] gap-3 mb-6">
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 transition-all duration-1000 ease-linear" style={{ width: `${(memorizeTime / 5) * 100}%` }} />
                    </div>
                    <button onPointerDown={(e) => { e.preventDefault(); skipMemorize(); }} className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors shadow-lg active:scale-90 touch-none" title="Skip">
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {phase === "recall" && (
                  <div className="flex gap-2 mb-6 justify-center w-full max-w-[300px] sm:max-w-[400px] flex-wrap">
                    {Array.from({ length: litCells }).map((_, i) => (
                      <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i < userSelections.size ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] scale-110' : 'bg-gray-800'}`} />
                    ))}
                  </div>
                )}

                {phase === "result" && (
                  <div className="h-8 mb-6" /> // Spacer to prevent grid jumping
                )}

                {/* The Mobile-Perfect Scaled Grid */}
                <div 
                  className={`grid mx-auto ${gridSize === 5 ? 'gap-1.5 sm:gap-2' : 'gap-2 sm:gap-3'}`}
                  style={{ 
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    width: 'min(90vw, 55vh)', // Viewport calculation specifically targeting small mobile screens
                    aspectRatio: '1/1'
                  }}
                >
                  {cellStates.map((isLit, i) => {
                    let cellStyle = "bg-gray-900 border border-gray-800"; 
                    
                    if (phase === "memorize") {
                      if (isLit) cellStyle = "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] border-indigo-400";
                    } 
                    else if (phase === "recall") {
                      if (userSelections.has(i)) cellStyle = "bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] border-cyan-400 scale-95";
                      else cellStyle = "bg-gray-900 border border-gray-800 hover:bg-gray-800 active:scale-95 transition-all";
                    } 
                    else if (phase === "result") {
                      if (isLit) cellStyle = "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] border-green-400";
                      else if (userSelections.has(i)) cellStyle = "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] border-red-400"; 
                    }

                    return (
                      <button
                        key={i}
                        onPointerDown={(e) => toggleCell(i, e)}
                        disabled={phase !== "recall" || isProcessing}
                        className={`w-full h-full rounded-lg sm:rounded-2xl transition-all duration-150 ease-out focus:outline-none touch-none ${cellStyle}`}
                        aria-label="Grid Cell"
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* START SCREEN (Scrollable) */}
            {gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.3)] shrink-0">
                    <Grid3X3 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black mb-2 tracking-tight">Grid Memorization</h2>
                  <p className="text-xs sm:text-sm mb-6 text-gray-400 leading-relaxed">Memorize the illuminated patterns. Progressive grid sizing from 4x4 up to 5x5.</p>
                  

                  <button onClick={startGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(99,102,241,0.3)] shrink-0">
                    <Play className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* END SCREEN (Scrollable) */}
            {gameState === 'ended' && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6">
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[95vh] overflow-y-auto my-auto">
                  <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Time Expired</h2>
                      <p className="text-indigo-400 font-medium text-sm">Grid Memorization • Max Grid: {gridSizeRef.current}x{gridSizeRef.current}</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pointer-events-none shrink-0">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                        <div className="flex items-end gap-1">
                          <span className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tighter">{score}</span>
                          <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">PTS</span>
                        </div>
                      </div>
                      
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                          <path className="text-gray-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className={`${accuracy >= 80 ? 'text-green-500' : accuracy >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} strokeWidth="3" strokeDasharray={`${strokeDasharray}`} strokeDashoffset={`${strokeDashoffset}`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-lg sm:text-xl font-black ${accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracy}%</span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2">
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Rounds</div>
                        <div className="text-lg sm:text-xl font-black text-indigo-400">{stats.roundsCompleted}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Streak</div>
                        <div className="text-lg sm:text-xl font-black text-orange-400">{bestStreakRef.current}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Cells</div>
                        <div className="text-lg sm:text-xl font-black text-cyan-400">{litCellsRef.current}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 shrink-0 rounded-b-3xl">
                    <button onClick={startGame} className="flex-1 py-3 sm:py-4 bg-indigo-600 text-white rounded-xl font-black tracking-wide hover:bg-indigo-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                    </button>
                    <button onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onClick={() => { if(isFullscreen) toggleFullscreen(); setGameState('start'); gameStateRef.current = 'start'; }} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  
                </div>
              </div>
            )}
          </div>
        </GameErrorBoundary>

        {/* DRILL RULES & SCORING */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-indigo-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Rules & High-Stakes Economy</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="indigo" text="Recall Grid flawlessly" highlight="+20 PTS | +10s" result="Increases Difficulty" />
                  <RuleItem num="2" color="purple" text="Adaptive Grid Sizing" highlight="4x4 to 5x5" result="Scales on Performance" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Tap ANY wrong cell" highlight="-10 PTS | -5s" result="Decreases Difficulty" />
                  <RuleItem num="4" color="green" text="Time Limit Capped" highlight="Max 60 Seconds" result="Endless Survival" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT THIS DRILL */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Grid Memorization</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This cognitive drill trains <strong className="text-white font-semibold">spatial working memory</strong> and <strong className="text-white font-semibold">visual pattern recognition</strong>. By memorizing the location of lit cells on progressively larger grids, you are strengthening your brain's ability to hold complex spatial maps in short-term memory—a critical skill for navigation, mapping, and positional strategy.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Students developing visual-spatial skills, designers and engineers strengthening spatial reasoning, and gamers improving positional awareness and mini-map memory.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Spatial memory capacity, visual pattern recognition, grid position memory, and precise positional accuracy under pressure.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Difficulty Scaling</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">The drill begins gently on a 4x4 grid. As you successfully clear rounds, the pattern grows up to 9 lit cells, eventually pushing you into a complex 5x5 grid.</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Chunking Shapes:</strong> Do not try to memorize individual scattered blocks. Instead, connect them mentally to form shapes (like an 'L', a square, or a line).</li>
                    <li><strong className="text-gray-200">Spatial Anchoring:</strong> Anchor the shapes to the edges or corners of the grid to orient yourself when the grid goes blank.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> You earn <span className="text-green-400 font-bold">+20 points and +10s time</span> for clearing a grid perfectly. But a single wrong tap instantly deducts <span className="text-red-400 font-bold">-10 points and -5s time</span> while dropping the difficulty. Precision matters more than speed!</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Is there a penalty for an incorrect tap?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Yes! Accuracy is vital. Tapping a single incorrect cell will immediately end the current sequence, deduct 10 points and 5 seconds from your timer, and drop your difficulty level so you can recover your rhythm.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Does the grid get larger?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Yes. The drill dynamically adapts to your success. It starts on a 4x4 grid and slowly increases the number of illuminated cells. If you succeed consistently, it upgrades to a 5x5 grid, offering a much deeper memory challenge.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Related drills">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-600"></div>
              <h2 className="text-xl font-bold text-white">Explore Cognitive Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/memory/short-term-memory/color-sequence" title="Color Sequence" desc="Memorize progressive color sequences." color="blue" icon={<Star className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/short-term-memory/digit-span" title="Digit Span" desc="Recall increasingly long digit strings." color="green" icon={<Hash className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/memory/card-matching" title="Card Matching" desc="Classic matching game for short-term memory." color="purple" icon={<Activity className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/spatial-memory/path-tracing" title="Path Tracing" desc="Watch and repeat complex dot paths." color="cyan" icon={<Grid3X3 className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* GLOBAL FOOTER */}
        {!isFullscreen && (
          <footer className="mt-16 bg-gray-950 text-gray-400 rounded-3xl py-12 px-8 border border-gray-800 shadow-xl" role="contentinfo">
            <div className="max-w-7xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-black text-xl tracking-tight">SkillDrills</span>
              </div>
              <p className="text-sm mb-3 font-medium">&copy; 2026 SkillDrills. All rights reserved.</p>
              <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-8 text-gray-500">
                Premium online cognitive training. Push your brain's processing speed, focus stamina, and spatial memory to the limit with hardcore, data-driven web drills.
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
          </footer>
        )}
      </div>
    </div>
  );
}

// === Subcomponents ===

function StatCard({ icon, value, label, unit = '' }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-1.5 sm:p-3 text-center flex flex-col justify-center h-full transition-all duration-300 pointer-events-none">
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
    indigo: 'bg-indigo-600 text-indigo-300 border-indigo-500', 
    purple: 'bg-purple-600 text-purple-300 border-purple-500', 
    green: 'bg-green-600 text-green-300 border-green-500', 
    red: 'bg-red-600 text-red-300 border-red-500',
    orange: 'bg-orange-600 text-orange-300 border-orange-500'
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
        <div className={`text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-lg bg-gray-900 border ${border} ${txt} whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left`}>
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
    green: 'from-green-500 to-emerald-500'
  };
  
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:-translate-y-1 hover:border-gray-600">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-indigo-500 to-purple-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-black border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-indigo-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-indigo-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}