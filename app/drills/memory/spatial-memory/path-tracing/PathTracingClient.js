'use client';

import { Component, useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { 
  Target, Zap, Clock, Award,
  Volume2, VolumeX, Maximize2, Minimize2, 
  Eye, Timer, Trophy, Info, Route, TrendingUp, RefreshCw,
  GraduationCap, Lightbulb, BarChart3, CheckCircle2, Star, ArrowRight, Share2,
  Brain, Activity, Play, ChevronRight, LogOut, Hash, Users, CheckCircle, XCircle, AlertTriangle
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

  playPathDot() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
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
export default function PathTracingClient() {

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
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  const [perfectHits, setPerfectHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  
  // === Grid & Path State ===
  const [gridSize, setGridSize] = useState(3);
  const [phase, setPhase] = useState("ready"); // "ready", "showing", "drawing", "result"
  const [path, setPath] = useState([]);
  const [userPath, setUserPath] = useState([]);
  const [currentDot, setCurrentDot] = useState(null);
  const [wrongDotIndex, setWrongDotIndex] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // === Decoupled Engine Refs ===
  const mountedRef = useRef(false);
  const containerRef = useRef(null);
  
  const gameStateRef = useRef('start');
  const phaseRef = useRef('ready');
  const scoreRef = useRef(0);
  const timeRef = useRef(60.0);
  const levelRef = useRef(1);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  
  const gridSizeRef = useRef(3);
  const pathRef = useRef([]);
  const userPathRef = useRef([]);

  const globalTimerIntervalRef = useRef(null);
  const animationTimeoutsRef = useRef([]);
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
      const sScore = localStorage.getItem('skilldrills_path_best_score_v2');
      const sStreak = localStorage.getItem('skilldrills_path_best_streak_v2');
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
    animationTimeoutsRef.current.forEach(t => clearTimeout(t));
    animationTimeoutsRef.current = [];
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
      try { localStorage.setItem('skilldrills_path_best_score_v2', finalScore.toString()); } catch(e) {}
    } else {
      setIsNewBest(false);
    }
    syncToUI();
  }, [bestScore, clearTimers, syncToUI]);

  const exitDrill = useCallback(() => {
    if (document.fullscreenElement) {
      try { document.exitFullscreen(); } catch (e) {}
    }
    clearTimers();
    gameStateRef.current = 'start';
    setGameState('start');
  }, [clearTimers]);

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

  // === CORE GAME LOGIC ===

  const getCalculatedGridSize = useCallback(() => {
    const pathLength = levelRef.current + 3;
    if (pathLength <= 4) return 3;
    if (pathLength <= 6) return 4;
    if (pathLength <= 8) return 5;
    if (pathLength <= 10) return 6;
    return 7;
  }, []);

  const getNeighbors = useCallback((index, size) => {
    const row = Math.floor(index / size);
    const col = index % size;
    const neighbors = [];
    if (row > 0) neighbors.push(index - size);
    if (row < size - 1) neighbors.push(index + size);
    if (col > 0) neighbors.push(index - 1);
    if (col < size - 1) neighbors.push(index + 1);
    return neighbors;
  }, []);

  // UPDATED path generation to ensure self-avoiding walk
  const generatePath = useCallback(() => {
    const size = getCalculatedGridSize();
    gridSizeRef.current = size;
    setGridSize(size);
    
    const pathLength = levelRef.current + 3;
    const totalCells = size * size;
    
    let newPath = [];
    let validPathFound = false;

    // Retry loop: Keep generating until we get a path that never crosses itself
    while (!validPathFound) {
      newPath = [];
      let current = Math.floor(Math.random() * totalCells);
      newPath.push(current);
      let trapped = false;
      
      for (let i = 1; i < pathLength; i++) {
        const neighbors = getNeighbors(current, size);
        // Only look at neighbors we haven't visited yet
        const unvisited = neighbors.filter(n => !newPath.includes(n));
        
        if (unvisited.length > 0) {
          // Move to a random unvisited neighbor
          const next = unvisited[Math.floor(Math.random() * unvisited.length)];
          newPath.push(next);
          current = next;
        } else {
          // We got trapped in a corner! Break the loop and try again.
          trapped = true;
          break;
        }
      }
      
      // If we finished the loop without getting trapped, the path is valid!
      if (!trapped) {
        validPathFound = true;
      }
    }
    
    return newPath;
  }, [getCalculatedGridSize, getNeighbors]);

  const startRoundTimeout = useCallback(() => {
    if (roundTimeoutRef.current) clearTimeout(roundTimeoutRef.current);
    
    // 15 Second Idle Timeout Rule
    roundTimeoutRef.current = setTimeout(() => {
      if (gameStateRef.current !== 'playing' || phaseRef.current !== "drawing") return;
      
      setIsProcessing(true);
      setPhase("result");
      phaseRef.current = "result";
      
      if (audioSynth) audioSynth.playMiss();
      
      // TIMEOUT PENALTY (-8 Score, -5s Time, Level Drop)
      scoreRef.current = Math.max(0, scoreRef.current - 8);
      timeRef.current -= 5.0;
      streakRef.current = 0;
      levelRef.current = Math.max(1, levelRef.current - 1);
      setMissedHits(prev => prev + 1);
      
      triggerFeedback('⏳ TIMEOUT! -8 PTS | -5s', 'error');
      syncToUI();
      
      if (timeRef.current <= 0) {
        setLocalTimeRemaining(0);
        endGame();
        return;
      }
      
      if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
      resultTimerRef.current = setTimeout(() => {
        if (gameStateRef.current === 'playing') startNewRound();
      }, 1500);
      
    }, 15000);
  }, [endGame, syncToUI, triggerFeedback]);

  const startPathAnimation = useCallback((pathArray) => {
    setPath(pathArray);
    pathRef.current = pathArray;
    
    setUserPath([]);
    userPathRef.current = [];
    
    setCurrentDot(null);
    setWrongDotIndex(null);
    
    setPhase("showing");
    phaseRef.current = "showing";
    setIsProcessing(false);
    
    animationTimeoutsRef.current.forEach(t => clearTimeout(t));
    animationTimeoutsRef.current = [];
    if (roundTimeoutRef.current) clearTimeout(roundTimeoutRef.current);
    
    pathArray.forEach((dot, i) => {
      const timeout = setTimeout(() => {
        if (gameStateRef.current !== 'playing') return;
        setCurrentDot(dot);
        if (audioSynth) audioSynth.playPathDot();
      }, i * 500);
      animationTimeoutsRef.current.push(timeout);
    });
    
    const finalTimeout = setTimeout(() => {
      if (gameStateRef.current !== 'playing') return;
      setCurrentDot(null);
      setPhase("drawing");
      phaseRef.current = "drawing";
      startRoundTimeout(); // Start the trace clock
    }, pathArray.length * 500 + 400);
    
    animationTimeoutsRef.current.push(finalTimeout);
  }, [startRoundTimeout]);

  const startNewRound = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    const newPath = generatePath();
    startPathAnimation(newPath);
  }, [generatePath, startPathAnimation]);

  // Handle dot click with Native Zero-Latency pointer events
  const handleDotClick = useCallback((index, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
    }

    if (phaseRef.current !== "drawing" || isProcessing) return;
    if (userPathRef.current.includes(index)) return; // Prevent double clicking
    
    if (roundTimeoutRef.current) clearTimeout(roundTimeoutRef.current); 
    
    const targetPath = pathRef.current;
    const currentIndex = userPathRef.current.length;
    const isCorrectDot = targetPath[currentIndex] === index;
    
    // WRONG DOT CLICKED (-8 PTS, -5s Time, Level Drop)
    if (!isCorrectDot) {
      setIsProcessing(true);
      setWrongDotIndex(index);
      setPhase("result");
      phaseRef.current = "result";
      
      if (audioSynth) audioSynth.playMiss();
      
      scoreRef.current = Math.max(0, scoreRef.current - 8);
      timeRef.current -= 5.0;
      streakRef.current = 0;
      levelRef.current = Math.max(1, levelRef.current - 1);
      setMissedHits(prev => prev + 1);
      
      const newUserPath = [...userPathRef.current, index];
      userPathRef.current = newUserPath;
      setUserPath(newUserPath);
      
      triggerFeedback('✗ WRONG PATH! -8 PTS | -5s', 'error');
      syncToUI();
      
      if (timeRef.current <= 0) {
        setLocalTimeRemaining(0);
        endGame();
        return;
      }
      
      if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
      resultTimerRef.current = setTimeout(() => {
        if (gameStateRef.current === 'playing') startNewRound();
      }, 1500);
      return;
    }
    
    // VALID DOT CLICKED
    const newUserPath = [...userPathRef.current, index];
    userPathRef.current = newUserPath;
    setUserPath(newUserPath);
    
    if (audioSynth) audioSynth.playSelect();
    
    // PATH COMPLETED (+15 PTS, +10s Time, Capped at 60s)
    if (newUserPath.length === targetPath.length) {
      setIsProcessing(true);
      setPhase("result");
      phaseRef.current = "result";
      
      scoreRef.current += 15;
      timeRef.current = Math.min(60.0, timeRef.current + 10.0);
      streakRef.current += 1;
      levelRef.current += 1;
      setPerfectHits(prev => prev + 1);
      
      if (streakRef.current > bestStreakRef.current) {
        bestStreakRef.current = streakRef.current;
        setBestStreak(streakRef.current);
        try { localStorage.setItem('skilldrills_path_best_streak_v2', streakRef.current.toString()); } catch (e) {}
      }
      
      if (streakRef.current % 5 === 0 && streakRef.current > 0) {
        if (audioSynth) audioSynth.playStreak();
        triggerFeedback(`🔥 ${streakRef.current} STREAK! +15 PTS | +10s`, 'success');
      } else {
        if (audioSynth) audioSynth.playHit();
        triggerFeedback('✓ PERFECT! +15 PTS | +10s', 'success');
      }
      
      syncToUI();
      
      if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
      resultTimerRef.current = setTimeout(() => {
        if (gameStateRef.current === 'playing') startNewRound();
      }, 1200);
    } else {
      startRoundTimeout(); 
    }
  }, [isProcessing, syncToUI, triggerFeedback, startNewRound, startRoundTimeout, endGame]);


  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    
    clearTimers();
    setGameState('playing');
    gameStateRef.current = 'playing';
    
    setIsNewBest(false);
    
    scoreRef.current = 0;
    timeRef.current = 60.0;
    levelRef.current = 1;
    streakRef.current = 0;
    gridSizeRef.current = 3;
    setPerfectHits(0);
    setMissedHits(0);
    
    setLocalTimeRemaining(60.0);
    syncToUI();
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });

    // AUTO FULLSCREEN ON START
    try { 
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      }
    } catch (err) {
      console.warn("Fullscreen request failed", err);
    } 

    // Global Countdown Clock
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

    startNewRound();

  }, [clearTimers, endGame, startNewRound, syncToUI]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/memory/spatial-memory/path-tracing';
    if (navigator.share) {
      navigator.share({ title: 'Path Tracing Drill', text: 'Test your spatial sequence memory!', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(245,158,11,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  const accuracyPercentage = perfectHits + missedHits === 0 ? 100 : Math.round((perfectHits / (perfectHits + missedHits)) * 100);
  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracyPercentage;

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
            <li className="text-amber-400 font-medium">Path Tracing</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <Route className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Path Tracing</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Spatial Memory • Path Recall • Endless Survival</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {gameState === 'playing' && (
              <button onPointerDown={e => e.stopPropagation()} onClick={() => { endGame(); startGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset">
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button onPointerDown={e => e.stopPropagation()} onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Sound">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button onPointerDown={e => e.stopPropagation()} onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Fullscreen">
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Dynamic HUD */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-amber-500" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
          <StatCard icon={<Route className="text-purple-400" />} value={level + 3} label="Length" />
          <StatCard icon={<TrendingUp className="text-orange-400" />} value={streak} label="Streak" />
          <StatCard icon={<Activity className="text-blue-400" />} value={accuracyPercentage} label="Accuracy" unit="%" />
          <StatCard icon={<CheckCircle className="text-green-400" />} value={perfectHits} label="Perfects" />
          <StatCard icon={<XCircle className="text-red-400" />} value={missedHits} label="Misses" />
          <StatCard icon={<Trophy className="text-yellow-400" />} value={bestScore} label="Best" />
        </div>

        {/* Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {localFeedback.visible && (
            <div key={localFeedback.id} className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
              {localFeedback.text}
            </div>
          )}
        </div>

        {/* Game Container Wrapper */}
        <GameErrorBoundary>
          <div ref={containerRef} 
            onContextMenu={(e) => { if(gameState === 'playing') e.preventDefault(); }}
            className={`relative overflow-hidden flex flex-col items-center justify-center transition-all duration-100 ${
              isFullscreen 
                ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-[#050508] rounded-none' 
                : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[#050508] min-h-[60vh] md:min-h-[500px] md:aspect-video'
            }`}
            style={{ 
              touchAction: gameState === 'playing' ? 'none' : 'auto', 
              overscrollBehavior: gameState === 'playing' ? 'none' : 'auto'
            }}>

            {/* Time Progress Bar */}
            {gameState === 'playing' && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
                <div className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} />
              </div>
            )}

            {/* Fullscreen HUD Controls */}
            {isFullscreen && gameState === 'playing' && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); endGame(); startGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setSoundEnabled(v => !v); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              </div>
            )}

            {/* GAMEPLAY AREA */}
            {gameState === 'playing' && (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto">
                
                {/* Context Headers */}
                {phase === "showing" && (
                  <div className="mb-4 sm:mb-6 flex justify-center w-full">
                    <span className="text-amber-500 font-bold uppercase tracking-widest text-[10px] sm:text-sm flex items-center gap-2 animate-pulse">
                      <Eye className="w-4 h-4" /> Watch Path Sequence
                    </span>
                  </div>
                )}

                {(phase === "drawing" || phase === "result") && (
                  <div className="mb-4 sm:mb-6 flex justify-center w-full">
                    <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px] sm:text-sm flex items-center gap-2">
                      <Route className="w-4 h-4" /> Retrace Path
                    </span>
                  </div>
                )}

                {/* Adaptive Grid */}
                <div 
                  className={`grid mx-auto ${gridSize >= 5 ? 'gap-1.5 sm:gap-2' : 'gap-2 sm:gap-4'}`}
                  style={{ 
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    width: 'min(90vw, 55vh)', 
                    aspectRatio: '1/1'
                  }}
                >
                  {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                    
                    const isTargetDot = path.includes(i);
                    const clickOrder = userPath.indexOf(i);
                    const isClicked = clickOrder !== -1;
                    const isCorrectClick = isClicked && path[clickOrder] === i;
                    const isWrongClick = wrongDotIndex === i;
                    
                    const isCurrentAnimDot = currentDot === i;
                    const isPreviousAnimDot = phase === "showing" && isTargetDot && path.indexOf(i) < path.indexOf(currentDot);
                    
                    const isMissedTarget = phase === "result" && isTargetDot && !isClicked && wrongDotIndex !== null;

                    let dotStyle = "bg-gray-800 border-gray-700";

                    if (phase === "showing") {
                      if (isCurrentAnimDot) {
                        dotStyle = "bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.6)] border-amber-400";
                      } else if (isPreviousAnimDot) {
                        dotStyle = "bg-amber-500/30 border-amber-500/20";
                      }
                    } else {
                      if (isWrongClick) {
                        dotStyle = "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] border-red-400";
                      } else if (isCorrectClick) {
                        dotStyle = "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)] border-blue-400";
                      } else if (isMissedTarget) {
                        dotStyle = "bg-green-500/40 border-green-500/50";
                      } else if (phase === "drawing") {
                        dotStyle = "bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600";
                      }
                    }

                    return (
                      <button
                        key={i}
                        onPointerDown={(e) => handleDotClick(i, e)}
                        disabled={phase !== "drawing" || isProcessing || isClicked}
                        className={`w-full aspect-square rounded-full transition-colors duration-150 ease-out focus:outline-none touch-none border-2 ${dotStyle}`}
                        aria-label="Path Dot"
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* START SCREEN (Scrollable for Mobile) */}
            {gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-800 bg-gray-950 shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                    <Route className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight">Path Tracing</h2>
                  <p className="text-sm sm:text-base mb-6 text-gray-400 leading-relaxed">Watch the sequence illuminate, then retrace the exact path perfectly. Adapts to your skill level.</p>

                  <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all active:scale-95 shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                    <Play className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* PREMIUM END SCREEN (Scrollable) */}
            {gameState === 'ended' && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[95vh] my-auto">
                  
                  <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                      <p className="text-amber-400 font-medium text-xs sm:text-sm">Path Tracing • Reached Grid: {gridSizeRef.current}x{gridSizeRef.current}</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pointer-events-none shrink-0 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tighter">{score}</span>
                          <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">PTS</span>
                        </div>
                      </div>
                      
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                          <path className="text-gray-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path 
                            className={`${accuracyPercentage >= 80 ? 'text-green-500' : accuracyPercentage >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                            strokeWidth="3" strokeDasharray={`${strokeDasharray}`} strokeDashoffset={`${strokeDashoffset}`} strokeLinecap="round" stroke="currentColor" fill="none" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-base sm:text-xl font-black ${accuracyPercentage >= 80 ? 'text-green-400' : accuracyPercentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracyPercentage}%</span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Path Length</div>
                        <div className="text-base sm:text-xl font-black text-cyan-400">{level + 3}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Streak</div>
                        <div className="text-base sm:text-xl font-black text-orange-400">{bestStreakRef.current}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Best Score</div>
                        <div className="text-base sm:text-xl font-black text-yellow-400">{bestScore}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                    <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="flex-1 py-3 sm:py-4 bg-amber-600 text-white rounded-xl font-black tracking-wide hover:bg-amber-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={exitDrill} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
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
                <Info className="w-5 h-5 text-amber-500" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="green" text="Perfect Sequence" highlight="+15 PTS | +10s" result="Grid Expands" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="red" text="Wrong Tap / Timeout" highlight="-8 PTS | -5s" result="Grid Shrinks" />
                  <RuleItem color="orange" text="Time Limit Capped" highlight="Max 60 Seconds" result="Endless Survival" />
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
                <GraduationCap className="w-5 h-5 text-amber-500" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Path Tracing</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This cognitive drill trains <strong className="text-white font-semibold">sequential spatial memory</strong> and <strong className="text-white font-semibold">route encoding</strong>. By watching an animated dot path and retracing it in the exact order, you are strengthening your brain's ability to hold complex, ordered spatial maps in short-term memory—a critical skill for navigation, procedural tasks, and tactical execution.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Students developing sequential memory, professionals strengthening route planning, and gamers improving positional sequence recall.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Spatial sequence memory, route recall, sequential processing, and the ability to reproduce precise ordered spatial information.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Difficulty Scaling</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">The drill begins on a 3x3 grid. With every perfect clear, the path grows longer, naturally forcing the grid to expand dynamically up to 7x7.</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Draw with your eyes:</strong> As the path illuminates, mentally draw lines connecting the dots rather than memorizing their individual coordinates.</li>
                    <li><strong className="text-gray-200">Chunking shapes:</strong> Group the movements into familiar geometric shapes (e.g., "a triangle, then a zig-zag down") to bypass short-term memory limits.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> You are awarded +15 points and +10s time back for completing a full route perfectly. A single wrong tap deducts -5s and -8 points, and drops your level to let you recover. Max time is 60s.</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-amber-500" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Is there a penalty for a wrong tap?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Yes. Accuracy is paramount. A single incorrect dot tap will immediately end the round, deducting 8 points and 5 seconds from your timer, as well as dropping your difficulty level.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">How long does the sequence get?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">It grows indefinitely based on your performance. Every perfect sequence adds a dot, eventually scaling the grid size to accommodate longer and more complex routes.</p>
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
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-amber-500 to-orange-600"></div>
              <h2 className="text-xl font-bold text-white">Explore Cognitive Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/memory/short-term-memory/digit-span" title="Digit Span" desc="Train numerical short-term memory." color="purple" icon={<Hash className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/working-memory/n-back" title="Dual N-Back" desc="Gold standard working memory trainer." color="green" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/associative-memory/concept-linking" title="Concept Linking" desc="Memorize and recall concept chains." color="orange" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/short-term-memory/color-sequence" title="Color Sequence" desc="Visual sequence memory tracking." color="blue" icon={<Eye className="w-4 h-4" />} />
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
                    <li><Link href="/drills/visual/visual-recognition/entropic-grid" className="hover:text-amber-400 transition-colors">Entropic Grid</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-amber-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-amber-500 hover:text-amber-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-amber-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-amber-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-amber-500 hover:text-amber-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-amber-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-amber-400 transition-colors">Aim Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-amber-500 hover:text-amber-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-amber-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-amber-400 transition-colors">Divided Attention</Link></li>
                    <li><Link href="/drills/cognitive" className="text-amber-500 hover:text-amber-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic" className="hover:text-amber-400 transition-colors">Academic (12)</Link></li>
                    <li><Link href="/drills/visual-tracking" className="hover:text-amber-400 transition-colors">Tracking (25 drills)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-amber-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500/25 to-orange-500/25 border border-amber-500/30 rounded-lg flex items-center justify-center">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[10px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[10px] max-w-2xl mx-auto leading-relaxed mb-8 text-gray-500">
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
    <div className="group rounded-xl border border-slate-900 bg-slate-950/40 p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-slate-800 backdrop-blur-sm">
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
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500', 
    pink: 'bg-pink-600 text-pink-300 border-pink-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    green: 'bg-green-600 text-green-300 border-green-500',
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500',
    amber: 'bg-amber-600 text-amber-300 border-amber-500',
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
    rose: 'from-rose-500 to-pink-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
    green: 'from-green-500 to-emerald-500'
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:-translate-y-1 hover:border-amber-500/50`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-amber-500 to-orange-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050508] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-amber-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-amber-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}