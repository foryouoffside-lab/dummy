'use client';

import { Component, useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { 
  Target, Zap, Clock, Award,
  Volume2, VolumeX, Maximize2, Minimize2, 
  Eye, Timer, Trophy, Info, MapPin, Route, TrendingUp, RefreshCw,
  GraduationCap, Lightbulb, BarChart3, CheckCircle2, Star, ArrowRight, Share2,
  Brain, Activity, Play, ChevronRight, LogOut, Users, Search
} from "lucide-react";

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

  playSelect() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch(e) {}
  }

  playHit() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
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
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }

  playStreak() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(1046.5, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1396.9, this.ctx.currentTime + 0.1);
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
const objects = ["🌟", "💎", "🔑", "🎯", "🔥", "⭐", "💡", "🎵", "🌺", "🦋"];

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
export default function ObjectLocationClient() {

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
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  
  // === Grid & Memory State ===
  const [gridSize, setGridSize] = useState(3);
  const [phase, setPhase] = useState("ready"); // "ready", "memorize", "locate", "result"
  const [objectLocations, setObjectLocations] = useState({});
  const [targetObject, setTargetObject] = useState("");
  const [wrongCellIndex, setWrongCellIndex] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // === Decoupled Engine Refs ===
  const mountedRef = useRef(false);
  const containerRef = useRef(null);
  
  const gameStateRef = useRef('start');
  const phaseRef = useRef('ready');
  const scoreRef = useRef(0);
  const timeRef = useRef(60);
  const levelRef = useRef(1);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  
  const gridSizeRef = useRef(3);
  const objectLocationsRef = useRef({});
  const targetObjectRef = useRef("");

  const globalTimerIntervalRef = useRef(null);
  const memorizationTimerRef = useRef(null);
  const resultTimerRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const roundTimeoutRef = useRef(null);

  // Sync to UI
  const syncToUI = useCallback(() => {
    setScore(scoreRef.current);
    setLevel(levelRef.current);
    setStreak(streakRef.current);
    setGridSize(gridSizeRef.current);
  }, []);

  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    setIsClient(true);
    mountedRef.current = true;
    try {
      const sScore = localStorage.getItem('skilldrills_object_best_score');
      const sStreak = localStorage.getItem('skilldrills_object_best_streak');
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
    if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    if (roundTimeoutRef.current) clearTimeout(roundTimeoutRef.current);
    if (memorizationTimerRef.current) clearTimeout(memorizationTimerRef.current);
  }, []);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 800);
  }, []);

  const endGame = useCallback(() => {
    clearTimers();
    gameStateRef.current = 'ended';
    setGameState('ended');
    
    const finalScore = scoreRef.current;
    if (finalScore > bestScore && finalScore > 0) {
      setBestScore(finalScore);
      setIsNewBest(true);
      try { localStorage.setItem('skilldrills_object_best_score', finalScore.toString()); } catch(e) {}
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
      if (!isFullscreen && containerRef.current) {
        await containerRef.current.requestFullscreen();
      } else if (isFullscreen) {
        await document.exitFullscreen();
      }
    } catch (err) {}
  }, [isFullscreen]);

  const handleExit = useCallback(async () => {
    if (document.fullscreenElement) {
      try { await document.exitFullscreen(); } catch (e) {}
    }
    clearTimers();
    setGameState('start');
    gameStateRef.current = 'start';
    syncToUI();
  }, [clearTimers, syncToUI]);

  // === CORE GAME LOGIC ===

  const getCalculatedGridSize = useCallback(() => {
    const objectCount = levelRef.current + 1;
    if (objectCount <= 8) return 3;
    if (objectCount <= 16) return 4;
    if (objectCount <= 25) return 5;
    if (objectCount <= 36) return 6;
    return 7;
  }, []);

  const generateObjects = useCallback(() => {
    const size = getCalculatedGridSize();
    gridSizeRef.current = size;
    setGridSize(size);
    
    const totalCells = size * size;
    const expectedObjects = Math.min(levelRef.current + 1, totalCells);
    const actualNumObjects = Math.min(expectedObjects, objects.length);
    
    const locations = {};
    const usedPositions = new Set();
    const usedObjects = new Set();
    
    for (let i = 0; i < actualNumObjects; i++) {
      let position;
      do {
        position = Math.floor(Math.random() * totalCells);
      } while (usedPositions.has(position));
      usedPositions.add(position);
      
      let obj;
      do {
        obj = objects[Math.floor(Math.random() * objects.length)];
      } while (usedObjects.has(obj));
      usedObjects.add(obj);
      
      locations[position] = obj;
    }
    
    setObjectLocations(locations);
    objectLocationsRef.current = locations;
    
    const placedObjects = Object.values(locations);
    const target = placedObjects[Math.floor(Math.random() * placedObjects.length)];
    
    setTargetObject(target);
    targetObjectRef.current = target;
    setWrongCellIndex(null);
  }, [getCalculatedGridSize]);

  const startRoundTimeout = useCallback(() => {
    if (roundTimeoutRef.current) clearTimeout(roundTimeoutRef.current);
    
    // 10 Second Idle Timeout Rule
    roundTimeoutRef.current = setTimeout(() => {
      if (gameStateRef.current !== 'playing' || phaseRef.current !== "locate") return;
      
      setIsProcessing(true);
      setPhase("result");
      phaseRef.current = "result";
      setWrongCellIndex(null); // No explicit wrong click, just timeout
      
      if (audioSynth) audioSynth.playMiss();
      
      scoreRef.current = Math.max(0, scoreRef.current - 5);
      timeRef.current -= 2;
      streakRef.current = 0;
      levelRef.current = Math.max(1, levelRef.current - 1);
      
      triggerFeedback('⏰ TIMEOUT! -5 PTS | -2s', 'error');
      syncToUI();
      
      if (timeRef.current <= 0) {
        setLocalTimeRemaining(0);
        endGame();
        return;
      }
      
      if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
      resultTimerRef.current = setTimeout(() => {
        if (gameStateRef.current === 'playing') startMemorization();
      }, 1500);
      
    }, 10000);
  }, [endGame, syncToUI, triggerFeedback]);

  const startMemorization = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    
    if (memorizationTimerRef.current) clearTimeout(memorizationTimerRef.current);
    if (roundTimeoutRef.current) clearTimeout(roundTimeoutRef.current);
    
    generateObjects();
    
    setPhase("memorize");
    phaseRef.current = "memorize";
    setIsProcessing(false);
    
    const memorizeTime = levelRef.current <= 3 ? 3000 : 4000;
    
    memorizationTimerRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing') {
        setPhase("locate");
        phaseRef.current = "locate";
        startRoundTimeout();
      }
    }, memorizeTime);
  }, [generateObjects, startRoundTimeout]);

  // Handle cell click with Native Zero-Latency pointer events
  const handleCellClick = useCallback((index, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
    }

    if (phaseRef.current !== "locate" || isProcessing) return;
    if (roundTimeoutRef.current) clearTimeout(roundTimeoutRef.current);
    
    setIsProcessing(true);
    
    const isCorrect = objectLocationsRef.current[index] === targetObjectRef.current;
    
    if (!isCorrect) {
      // WRONG LOCATION (-5 PTS, -2s Time)
      setWrongCellIndex(index);
      setPhase("result");
      phaseRef.current = "result";
      
      if (audioSynth) audioSynth.playMiss();
      
      scoreRef.current = Math.max(0, scoreRef.current - 5);
      timeRef.current -= 2;
      streakRef.current = 0;
      levelRef.current = Math.max(1, levelRef.current - 1);
      
      triggerFeedback('✗ WRONG LOCATION! -5 PTS | -2s', 'error');
      syncToUI();
      
      if (timeRef.current <= 0) {
        setLocalTimeRemaining(0);
        endGame();
        return;
      }
    } else {
      // CORRECT LOCATION (+10 PTS, +5s Time)
      setPhase("result");
      phaseRef.current = "result";
      
      scoreRef.current += 10;
      timeRef.current = Math.min(60, timeRef.current + 5);
      streakRef.current += 1;
      levelRef.current += 1;
      
      if (streakRef.current > bestStreakRef.current) {
        bestStreakRef.current = streakRef.current;
        setBestStreak(streakRef.current);
        try { localStorage.setItem('skilldrills_object_best_streak', streakRef.current.toString()); } catch (e) {}
      }
      
      if (streakRef.current % 5 === 0 && streakRef.current > 0) {
        if (audioSynth) audioSynth.playStreak();
        triggerFeedback(`🔥 ${streakRef.current} STREAK! +10 PTS | +5s`, 'success');
      } else {
        if (audioSynth) audioSynth.playHit();
        triggerFeedback('✓ PERFECT! +10 PTS | +5s', 'success');
      }
      syncToUI();
    }
    
    if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
    resultTimerRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing') startMemorization();
    }, 1500);
    
  }, [isProcessing, endGame, syncToUI, triggerFeedback, startMemorization]);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    
    // Auto Fullscreen on Start
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request failed", err);
    }
    
    clearTimers();
    setGameState('playing');
    gameStateRef.current = 'playing';
    
    setIsNewBest(false);
    
    scoreRef.current = 0;
    timeRef.current = 60;
    levelRef.current = 1;
    streakRef.current = 0;
    gridSizeRef.current = 3;
    
    setLocalTimeRemaining(60);
    syncToUI();
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });

    // Global Countdown Clock
    globalTimerIntervalRef.current = setInterval(() => {
      timeRef.current -= 1;
      if (timeRef.current <= 0) {
        timeRef.current = 0;
        setLocalTimeRemaining(0);
        endGame();
      } else {
        setLocalTimeRemaining(timeRef.current);
      }
    }, 1000);

    startMemorization();

  }, [clearTimers, endGame, startMemorization, syncToUI]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/memory/spatial-memory/object-location';
    if (navigator.share) {
      navigator.share({ title: 'Object Location Drill', text: 'Test your spatial position memory!', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 uppercase tracking-widest text-sm animate-pulse">Loading Drill...</p>
        </div>
      </div>
    );
  }

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
            <li className="text-emerald-400 font-medium">Object Location</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Object Location</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Spatial Memory • +10/-5 Scoring • Endless Survival</p>
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

        {/* Dynamic HUD */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-emerald-500" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining} label="Time" unit="s" />
          <StatCard icon={<TrendingUp className="text-purple-400" />} value={level} label="Level" />
          <StatCard icon={<MapPin className="text-cyan-400" />} value={Math.min(level + 1, 49)} label="Objects" />
          <StatCard icon={<Zap className="text-orange-400" />} value={streak} label="Streak" />
          <StatCard icon={<Trophy className="text-yellow-400" />} value={bestScore} label="Best" />
        </div>

        {/* Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {localFeedback.visible && (
            <div key={localFeedback.id} className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
              {localFeedback.text}
            </div>
          )}
        </div>

        {/* Game Container */}
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
                <div className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} />
              </div>
            )}

            {/* In-Game Controls (Fullscreen) */}
            {isFullscreen && gameState === 'playing' && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); endGame(); startGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setSoundEnabled(v => !v); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
              </div>
            )}

            {/* GAMEPLAY AREA (TEXT-FREE & MOBILE PERFECT) */}
            {gameState === 'playing' && (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                
                {/* Context Headers */}
                {phase === "memorize" && (
                  <div className="mb-4 flex flex-col items-center justify-center w-full">
                    <span className="text-emerald-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2 animate-pulse mb-1">
                      <Eye className="w-4 h-4" /> Memorize Positions
                    </span>
                    <span className="text-gray-400 text-xs uppercase tracking-widest">{Object.keys(objectLocations).length} Objects</span>
                  </div>
                )}

                {(phase === "locate" || phase === "result") && (
                  <div className="mb-4 flex flex-col items-center justify-center w-full">
                    <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4" /> Where was the
                    </span>
                    <span className="text-4xl">{targetObject}</span>
                  </div>
                )}

                {/* The Static, Shape-Stable Grid */}
                <div 
                  className={`grid mx-auto ${gridSize >= 5 ? 'gap-1.5 sm:gap-2' : 'gap-2 sm:gap-4'}`}
                  style={{ 
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    width: 'min(90vw, 70vh)',
                    aspectRatio: '1/1'
                  }}
                >
                  {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                    
                    const hasObject = !!objectLocations[i];
                    const isTargetLocation = objectLocations[i] === targetObject;
                    const isWrongClick = wrongCellIndex === i;

                    let cellStyle = "bg-gray-800 border-gray-700";
                    let content = "";

                    if (phase === "memorize") {
                      if (hasObject) {
                        cellStyle = "bg-gray-700 border-gray-600 shadow-inner";
                        content = objectLocations[i];
                      }
                    } else if (phase === "locate") {
                      cellStyle = "bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600 cursor-pointer";
                    } else if (phase === "result") {
                      if (isTargetLocation) {
                        cellStyle = "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)] border-emerald-400";
                        content = objectLocations[i];
                      } else if (isWrongClick) {
                        cellStyle = "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] border-red-400";
                      }
                    }

                    return (
                      <button
                        key={i}
                        onPointerDown={(e) => handleCellClick(i, e)}
                        disabled={phase !== "locate" || isProcessing}
                        className={`w-full aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-4xl transition-colors duration-150 ease-out focus:outline-none touch-none border-2 ${cellStyle}`}
                        aria-label="Grid Cell"
                      >
                        {content}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* START SCREEN */}
            {gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-800 bg-gray-950 shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] rotate-3">
                    <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight">Object Location</h2>
                  <p className="text-sm sm:text-base mb-8 text-gray-400 leading-relaxed">Memorize the objects on the grid, then quickly tap the exact location of the target.</p>
                  
                  <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0">
                    <Play className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* END SCREEN */}
            {gameState === 'ended' && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[95vh] overflow-y-auto my-auto">
                  <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 p-5 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-green-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                      <p className="text-emerald-400 font-medium text-sm">Object Location • Reached Grid: {gridSizeRef.current}x{gridSizeRef.current}</p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pointer-events-none shrink-0">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                        <div className="flex items-end gap-1">
                          <span className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tighter">{score}</span>
                          <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">PTS</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Level Reached</span>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl sm:text-5xl font-black text-purple-400 leading-none tracking-tighter">{level}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2">
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Objects</div>
                        <div className="text-lg sm:text-xl font-black text-cyan-400">{Math.min(level + 1, 49)}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Streak</div>
                        <div className="text-lg sm:text-xl font-black text-orange-400">{bestStreakRef.current}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Best Score</div>
                        <div className="text-lg sm:text-xl font-black text-yellow-400">{bestScore}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                    <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="flex-1 py-3 sm:py-4 bg-emerald-600 text-white rounded-xl font-black tracking-wide hover:bg-emerald-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] text-sm sm:text-base">
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
        </GameErrorBoundary>

        {/* DRILL RULES & SCORING */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-emerald-500" /><h2 className="font-bold text-white text-lg tracking-tight">Drill Rules & High-Stakes Economy</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="emerald" text="Perfect Location tap" highlight="+10 PTS | +5s" result="Level Up (+1 Obj)" />
                  <RuleItem num="2" color="purple" text="Adaptive Grid Sizing" highlight="3x3 -> 7x7" result="Expands per Level" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Wrong tap / Timeout" highlight="-5 PTS | -2s" result="Level Down (-1 Obj)" />
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
                <GraduationCap className="w-5 h-5 text-emerald-500" />
                <h2 className="font-bold text-white text-lg tracking-tight">About Object Location Training</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This cognitive drill trains <strong className="text-white font-semibold">spatial position memory</strong> and <strong className="text-white font-semibold">visual mapping</strong>. By memorizing where unique objects are placed across an expanding grid, you are strengthening your brain's ability to lock in and retrieve multiple stationary spatial data points—a critical skill for situational awareness and layout recognition.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Students organizing visual layouts mentally, professionals strengthening positional memory, and gamers improving map-awareness.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Spatial position memory, multiple-object location recall, visual-spatial working memory, and layout mapping.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Difficulty Scaling</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Starts gently with a 3x3 grid. With every successful recall, more objects are added, pushing the grid boundaries to a maximum 7x7 map.</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play & Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Observe Phase:</strong> Scan the grid carefully and memorize the specific icons and their exact placement.</li>
                    <li><strong className="text-gray-200">Recall Phase:</strong> Once the grid goes blank, you will be prompted to find ONE specific target. Tap the correct cell instantly.</li>
                    <li><strong className="text-gray-200">Chunking:</strong> Don't look at objects individually. Try grouping them visually into shapes or mini-clusters to aid your recall.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> Perfect taps reward you heavily (+10 PTS, +5s Time) to keep you alive. A wrong tap or taking longer than 10 seconds penalizes you (-5 PTS, -2s Time) and drops your difficulty level. The maximum time limit is 60 seconds.</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">What happens if I tap the wrong grid square?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Accuracy is critical. A wrong tap deducts 5 points and 2 seconds from your timer. It also lowers your level to give you an easier pattern on the next round so you can recover.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Why did the grid size suddenly increase?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">This drill utilizes an adaptive difficulty engine. As your streak of correct locations goes up, it forces your brain to store more information by adding objects and expanding the board up to a 7x7 grid.</p>
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
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-emerald-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/memory/spatial-memory/grid-memorization" title="Grid Memorization" desc="Memorize progressive spatial grid patterns." color="blue" icon={<Star className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/spatial-memory/path-tracing" title="Path Tracing" desc="Watch and repeat complex dot paths." color="orange" icon={<Route className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/working-memory/n-back" title="Dual N-Back" desc="Gold standard working memory training." color="cyan" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/visual-recognition/visual-search" title="Visual Search" desc="Conjunctive search for hidden items." color="purple" icon={<Search className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* GLOBAL FOOTER */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Visual Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual/visual-recognition/entropic-grid" className="hover:text-emerald-400 transition-colors">Entropic Grid</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-emerald-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-emerald-500 hover:text-emerald-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-emerald-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-emerald-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-emerald-500 hover:text-emerald-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-emerald-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-emerald-400 transition-colors">Aim Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-emerald-500 hover:text-emerald-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-emerald-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-emerald-400 transition-colors">Divided Attention</Link></li>
                    <li><Link href="/drills/cognitive" className="text-emerald-500 hover:text-emerald-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic" className="hover:text-emerald-400 transition-colors">Academic (12)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-emerald-400 transition-colors">Mental Fitness (6)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-emerald-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500/25 to-green-500/25 border border-emerald-500/30 rounded-lg flex items-center justify-center">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
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
    emerald: 'bg-emerald-600 text-emerald-300 border-emerald-500', 
    purple: 'bg-purple-600 text-purple-300 border-purple-500', 
    green: 'bg-green-600 text-green-300 border-green-500', 
    red: 'bg-red-600 text-red-300 border-red-500' 
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
    orange: 'from-orange-500 to-amber-500'
  };
  
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:-translate-y-1 hover:border-gray-600">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-emerald-500 to-green-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-black border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-emerald-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-emerald-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}