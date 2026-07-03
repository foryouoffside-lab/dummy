'use client';

import { Component, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, 
  Brain, Trophy, Info, Timer, Link2, RefreshCw, SkipForward,
  GraduationCap, Lightbulb, TrendingUp, CheckCircle2,BarChart3,
  BookOpen, Hash, Users, Star, ArrowRight, Share2, Copy, Play, ChevronRight, RotateCcw, AlertTriangle, LogOut, Search
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';

const ALL_CONCEPT_CHAINS = [
  ["Sun", "Light", "Plant", "Oxygen", "Life"],
  ["Water", "Clouds", "Rain", "River", "Ocean"],
  ["Seed", "Tree", "Fruit", "Food", "Energy"],
  ["Idea", "Plan", "Action", "Result", "Success"],
  ["Student", "Study", "Knowledge", "Career", "Achievement"],
  ["Egg", "Chick", "Bird", "Flight", "Sky"],
  ["Seed", "Sprout", "Flower", "Bee", "Honey"],
  ["Clay", "Brick", "Wall", "House", "Home"],
  ["Note", "Melody", "Song", "Album", "Legend"],
  ["Coal", "Heat", "Steam", "Engine", "Train"],
  ["Sand", "Glass", "Lens", "Telescope", "Discovery"],
  ["Spore", "Fungus", "Network", "Forest", "Ecosystem"],
  ["Thought", "Theory", "Experiment", "Proof", "Law"],
  ["Cotton", "Thread", "Fabric", "Garment", "Fashion"],
  ["Ore", "Metal", "Tool", "Machine", "Industry"],
  ["Spark", "Flame", "Forge", "Steel", "Bridge"],
  ["Grain", "Flour", "Dough", "Bread", "Feast"],
  ["Echo", "Sound", "Music", "Emotion", "Memory"],
  ["Drop", "Stream", "Cascade", "Rapids", "Waterfall"],
  ["Pixel", "Image", "Scene", "Film", "Cinema"],
  ["Doubt", "Question", "Search", "Wisdom", "Truth"],
  ["Dream", "Vision", "Mission", "Journey", "Legacy"],
  ["Rumor", "Myth", "Belief", "Tradition", "Culture"],
  ["Whisper", "Voice", "Speech", "Movement", "Revolution"],
  ["Puzzle", "Pattern", "Insight", "Solution", "Innovation"],
  ["Ember", "Hope", "Courage", "Action", "Change"],
  ["Ripple", "Wave", "Tide", "Current", "Transformation"],
  ["Moment", "Memory", "Story", "History", "Identity"],
  ["Fragment", "Mosaic", "Design", "Blueprint", "Creation"],
  ["Silence", "Reflection", "Clarity", "Purpose", "Fulfillment"]
];

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

  playRoundComplete() {
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
        <div className="absolute inset-0 flex items-center justify-center bg-[#050508] rounded-2xl z-[100] border border-red-500/30 p-6">
          <div className="text-center max-w-sm">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-white text-xl font-bold mb-2">Something went wrong</h3>
            <p className="text-gray-400 text-sm mb-6">The drill encountered an unexpected error. Your progress is safe. Please try again or explore other free drills.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }} className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-500 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.3)]">Try Again</button>
              <Link href="/" className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-colors border border-gray-700">Go Home</Link>
            </div>
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
export default function ConceptLinkingClient() {
  
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
  const [chainLength, setChainLength] = useState(3);
  
  // === Phase State ===
  const [chain, setChain] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [phase, setPhase] = useState("ready"); // "ready", "memorize", "recall", "result"
  const [memorizeTime, setMemorizeTime] = useState(5);
  const [currentStep, setCurrentStep] = useState(0);
  const [wrongSteps, setWrongSteps] = useState(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [stats, setStats] = useState({ roundsCompleted: 0, totalCorrect: 0, totalAttempts: 0 });

  // === Decoupled Engine Refs ===
  const engine = useGameEngine({
    category: 'memory',
    drillId: 'concept-linking',
    drillName: 'Concept Linking',
    totalGameTime: 9999, // Overridden by custom decimal timer
    sharePath: 'drills/memory/associative-memory/concept-linking',
  });

  const mountedRef = useRef(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  
  const gameStateRef = useRef('start');
  const phaseRef = useRef('ready');
  const scoreRef = useRef(0);
  const timeRef = useRef(60);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const chainLengthRef = useRef(3);
  
  const usedChainsRef = useRef(new Set());
  const correctChainRef = useRef([]);
  const wrongStepsRef = useRef(new Set());
  const statsRef = useRef({ roundsCompleted: 0, totalCorrect: 0, totalAttempts: 0 });

  const globalTimerIntervalRef = useRef(null);
  const memorizeTimerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);

  // Sync to UI
  const syncToUI = useCallback(() => {
    setScore(scoreRef.current);
    setStreak(streakRef.current);
    setChainLength(chainLengthRef.current);
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
      const sScore = localStorage.getItem('skilldrills_concept_best_score_v2');
      const sStreak = localStorage.getItem('skilldrills_concept_best_streak_v2');
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
    }, 800);
  }, []);

  const endGame = useCallback(() => {
    clearTimers();
    gameStateRef.current = 'ended';
    setGameState('ended');
    engine.endGame();
    
    if (document.fullscreenElement) {
      try { document.exitFullscreen(); } catch (e) {}
    }
    
    const finalScore = scoreRef.current;
    if (finalScore > bestScore && finalScore > 0) {
      setIsNewBest(true);
      setBestScore(finalScore);
      try { localStorage.setItem('skilldrills_concept_best_score_v2', finalScore.toString()); } catch(e) {}
    }
    syncToUI();
  }, [bestScore, clearTimers, syncToUI, engine]);

  // Screen Guard & Rotate Warning Removed -> Only tracking fullscreen
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsHandler);
    
    return () => {
      document.removeEventListener('fullscreenchange', fsHandler);
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

  const getAvailableChain = useCallback((length) => {
    const available = ALL_CONCEPT_CHAINS.filter((_, i) => !usedChainsRef.current.has(i));
    if (available.length < 1) {
      usedChainsRef.current.clear();
      return ALL_CONCEPT_CHAINS[Math.floor(Math.random() * ALL_CONCEPT_CHAINS.length)];
    }
    
    // Prioritize chains that match requested length
    const matching = available.filter(c => c.length >= length);
    const pool = matching.length > 0 ? matching : available;
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  const startRecall = useCallback(() => {
    if (memorizeTimerIntervalRef.current) clearInterval(memorizeTimerIntervalRef.current);
    setPhase("recall");
    phaseRef.current = "recall";
    setCurrentStep(0);
    setUserInput("");
    setWrongSteps(new Set());
    wrongStepsRef.current = new Set();
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const skipMemorize = useCallback(() => {
    setMemorizeTime(0);
    startRecall();
  }, [startRecall]);

  const startRound = useCallback(() => {
    const length = chainLengthRef.current;
    const selectedChainFull = getAvailableChain(length);
    
    const idx = ALL_CONCEPT_CHAINS.indexOf(selectedChainFull);
    if (idx !== -1) usedChainsRef.current.add(idx);
    
    const targetChain = selectedChainFull.slice(0, Math.min(length, selectedChainFull.length));
    
    correctChainRef.current = targetChain;
    setChain(targetChain);
    
    setMemorizeTime(5);
    setPhase("memorize");
    phaseRef.current = "memorize";
    setIsProcessing(false);
    setCurrentStep(0);

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
  }, [getAvailableChain, startRecall]);

  const handleSubmit = useCallback(() => {
    if (isProcessing || !userInput.trim()) return;
    setIsProcessing(true);
    
    const userAnswer = userInput.trim();
    const expectedAnswer = correctChainRef.current[currentStep];
    const isCorrect = userAnswer.toLowerCase() === expectedAnswer.toLowerCase();
    
    statsRef.current.totalAttempts += 1;
    
    if (isCorrect) {
      scoreRef.current += 5;
      timeRef.current = Math.min(60, timeRef.current + 5);
      statsRef.current.totalCorrect += 1;
      if (audioSynth) audioSynth.playHit();
      triggerFeedback('✓ +5 PTS | +5s', 'success');
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 3);
      timeRef.current = Math.max(0, timeRef.current - 2);
      wrongStepsRef.current.add(currentStep);
      setWrongSteps(new Set([...wrongStepsRef.current]));
      if (audioSynth) audioSynth.playMiss();
      triggerFeedback('✗ -3 PTS | -2s', 'error');
    }
    
    setLocalTimeRemaining(timeRef.current);
    syncToUI();

    // Check game over instantly
    if (timeRef.current <= 0) {
      endGame();
      return;
    }

    // Move to next step or finish round
    if (currentStep < correctChainRef.current.length - 1) {
      setCurrentStep(prev => prev + 1);
      setUserInput("");
      setIsProcessing(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      // ROUND FINISHED
      const allCorrect = wrongStepsRef.current.size === 0;
      
      if (allCorrect) {
        streakRef.current += 1;
        chainLengthRef.current = Math.min(8, chainLengthRef.current + 1);
        
        if (streakRef.current > bestStreakRef.current) {
          bestStreakRef.current = streakRef.current;
          setBestStreak(streakRef.current);
          try { localStorage.setItem('skilldrills_concept_best_streak_v2', streakRef.current.toString()); } catch (e) {}
        }
        
        if (audioSynth) audioSynth.playRoundComplete();
      } else {
        streakRef.current = 0;
        chainLengthRef.current = Math.max(3, chainLengthRef.current - 1);
      }
      
      statsRef.current.roundsCompleted += 1;
      syncToUI();
      
      setPhase("result");
      phaseRef.current = "result";
      setIsProcessing(false);

      setTimeout(() => {
        if (gameStateRef.current === 'playing') {
          startRound();
        }
      }, 1500);
    }
  }, [isProcessing, userInput, currentStep, syncToUI, triggerFeedback, startRound, endGame]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }, [handleSubmit]);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    
    clearTimers();
    setIsNewBest(false);
    setGameState('playing');
    gameStateRef.current = 'playing';
    engine.startGame();
    
    scoreRef.current = 0;
    timeRef.current = 60;
    streakRef.current = 0;
    chainLengthRef.current = 3;
    usedChainsRef.current = new Set();
    statsRef.current = { roundsCompleted: 0, totalCorrect: 0, totalAttempts: 0 };
    
    setLocalTimeRemaining(60);
    syncToUI();
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });

    // Auto-Fullscreen Trigger
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request failed", err);
    }

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

    startRound();
  }, [clearTimers, endGame, startRound, syncToUI, engine]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/memory/associative-memory/concept-linking';
    if (navigator.share) {
      navigator.share({ title: 'Concept Linking Drill', text: 'Test your associative memory!', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050508]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(225,29,72,0.5)]"></div>
          <p className="text-gray-400 uppercase tracking-widest text-sm animate-pulse font-medium">Loading Engine...</p>
        </div>
      </div>
    );
  }

  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracy;

  return (
    <div className="min-h-screen select-none bg-[#050508] text-white selection:bg-transparent font-sans" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/memory" className="text-gray-500 hover:text-gray-300 transition-colors">Memory</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-gray-500">Associative Memory</li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-rose-400 font-medium">Concept Linking</li>
            </ol>
          </nav>
        )}
        
        {/* Header */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                <Link2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Concept Linking</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Sequential Recall • Endless Survival • Adaptive Chains</p>
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

        {/* Dynamic HUD */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-rose-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={localTimeRemaining} label="Time" unit="s" />
          <StatCard icon={<Link2 className="text-orange-400" />} value={chainLength} label="Chain Size" />
          <StatCard icon={<Award className="text-blue-400" />} value={accuracy} label="Accuracy" unit="%" />
          <StatCard icon={<Zap className="text-yellow-400" />} value={streak} label="Streak" />
          <StatCard icon={<CheckCircle2 className="text-green-400" />} value={stats.totalCorrect} label="Correct" />
          <StatCard icon={<Activity className="text-purple-400" />} value={stats.roundsCompleted} label="Rounds" />
          <StatCard icon={<Trophy className="text-pink-400" />} value={Math.max(bestScore, score)} label="Best" />
        </div>

        {/* Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {localFeedback.visible && (
            <div key={localFeedback.id} className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : localFeedback.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
              {localFeedback.text}
            </div>
          )}
        </div>

        {/* Game Container */}
        <GameErrorBoundary>
          <div ref={containerRef} 
            onContextMenu={(e) => { if(gameState === 'playing') e.preventDefault(); }}
            className={`relative overflow-hidden w-full flex flex-col items-center justify-center transition-all duration-100 ${
              isFullscreen 
                ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-[#050508] rounded-none' 
                : 'rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[#050508] min-h-[60vh] md:min-h-[500px] md:aspect-video'
            }`}
            style={{ 
              touchAction: gameState === 'playing' ? 'none' : 'auto', 
              overscrollBehavior: gameState === 'playing' ? 'none' : 'auto'
            }}>

            {/* Time Progress Bar */}
            {gameState === 'playing' && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
                <div className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-rose-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} />
              </div>
            )}

            {/* In-Game Controls (Fullscreen) */}
            {isFullscreen && gameState === 'playing' && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={e => e.stopPropagation()} onClick={() => { endGame(); startGame(); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                <button onPointerDown={e => e.stopPropagation()} onClick={() => setSoundEnabled(v => !v)} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
                <button onPointerDown={e => e.stopPropagation()} onClick={toggleFullscreen} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              </div>
            )}

            {/* GAMEPLAY AREA */}
            {gameState === 'playing' && (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                
                {/* LEARNING PHASE */}
                {phase === "memorize" && (
                  <div className="w-full flex flex-col items-center justify-center max-w-[90vw] sm:max-w-[600px] animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center w-full gap-3 mb-8">
                      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 transition-all duration-1000 ease-linear" style={{ width: `${(memorizeTime / 5) * 100}%` }} />
                      </div>
                      <button onPointerDown={e => e.stopPropagation()} onClick={skipMemorize} className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors shadow-lg active:scale-90" title="Skip">
                        <SkipForward className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {chain.map((concept, i) => (
                        <div key={i} className="flex items-center gap-2 sm:gap-3">
                          <div className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-base sm:text-xl font-black tracking-wide bg-gray-900 border border-gray-700 text-white shadow-[0_0_15px_rgba(225,29,72,0.15)]">
                            {concept}
                          </div>
                          {i < chain.length - 1 && (
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* RECALL PHASE */}
                {phase === "recall" && (
                  <div className="w-full flex flex-col items-center justify-center max-w-[90vw] sm:max-w-[400px] animate-in slide-in-from-bottom-8 duration-200">
                    
                    {/* Progress Dots */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                      {chain.map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            i < currentStep 
                              ? wrongSteps.has(i) ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]'
                              : i === currentStep 
                                ? 'bg-rose-500 scale-125 shadow-[0_0_10px_rgba(225,29,72,0.8)] animate-pulse' 
                                : 'bg-gray-800'
                          }`} 
                        />
                      ))}
                    </div>
                    
                    {/* Text Input */}
                    <input
                      ref={inputRef}
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="w-full text-xl sm:text-2xl font-black tracking-wide text-center p-3 sm:p-4 rounded-xl bg-gray-900 text-white border-2 border-gray-700 focus:border-rose-500 focus:outline-none mb-4"
                      placeholder="Type concept..."
                      autoFocus
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                    
                    <button 
                      onPointerDown={e => e.stopPropagation()}
                      onClick={handleSubmit} 
                      disabled={!userInput.trim() || isProcessing}
                      className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-rose-600/20"
                    >
                      SUBMIT
                    </button>
                  </div>
                )}

                {/* RESULT PHASE */}
                {phase === "result" && (
                  <div className="w-full flex flex-col items-center justify-center max-w-[90vw] sm:max-w-[600px] animate-in zoom-in-95 duration-300">
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                      {chain.map((concept, i) => {
                        const isWrong = wrongSteps.has(i);
                        return (
                          <div key={i} className="flex items-center gap-2 sm:gap-3">
                            <div className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-base sm:text-xl font-black tracking-wide border shadow-lg ${
                              isWrong 
                                ? 'bg-red-500/10 border-red-500 text-red-400' 
                                : 'bg-green-500/10 border-green-500 text-green-400'
                            }`}>
                              {concept}
                            </div>
                            {i < chain.length - 1 && (
                              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* START SCREEN */}
            {gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm p-4" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_30px_rgba(225,29,72,0.3)]">
                    <Link2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight">Concept Linking</h2>
                  <p className="text-sm sm:text-base mb-6 text-gray-400 leading-relaxed">Memorize concept chains and retype them sequentially. Adapts dynamically to your skill level.</p>
                  
                  <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all active:scale-95 animate-pulse hover:animate-none shadow-[0_0_20px_rgba(225,29,72,0.3)] flex-shrink-0">
                    <Play className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* END SCREEN */}
            {gameState === 'ended' && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 p-4" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[95vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="bg-gradient-to-br from-rose-900/40 to-red-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none flex-shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                      <p className="text-rose-400 font-medium text-xs sm:text-sm">Concept Linking • Peak Capacity: {chainLength} Links</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pointer-events-none flex-shrink-0">
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
                          <path className={`${accuracy >= 80 ? 'text-green-500' : accuracy >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} strokeWidth="3" strokeDasharray={`${strokeDasharray}`} strokeDashoffset={`${strokeDashoffset}`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-base sm:text-xl font-black ${accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracy}%</span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2">
                      <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Total Words</div>
                        <div className="text-base sm:text-xl font-black text-rose-400">{stats.totalCorrect}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Streak</div>
                        <div className="text-base sm:text-xl font-black text-orange-400">{bestStreakRef.current}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Chain</div>
                        <div className="text-base sm:text-xl font-black text-cyan-400">{chainLength}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl flex-shrink-0 mt-auto">
                    <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="flex-1 py-3 sm:py-4 bg-rose-600 text-white rounded-xl font-black tracking-wide hover:bg-rose-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={() => { if(isFullscreen) toggleFullscreen(); endGame(); }} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
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
                <Info className="w-5 h-5 text-rose-400" /><h2 className="font-bold text-white text-lg tracking-tight">Drill Rules & High-Stakes Economy</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Correct Word" highlight="+5 PTS | +5s" result="Time Capped at 60s" />
                  <RuleItem num="2" color="red" text="Wrong Word" highlight="-3 PTS | -2s" result="Penalty Deducted Instantly" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="rose" text="Perfect Chain" result="Difficulty Increases (+1 Link)" />
                  <RuleItem num="4" color="orange" text="Flawed Chain" result="Difficulty Decreases (-1 Link)" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* MERGED ABOUT THIS DRILL, HOW TO PLAY & FAQ */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-rose-400" />
                <h2 className="font-bold text-white text-lg tracking-tight">About Concept Linking</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This associative memory drill trains your brain's <strong className="text-white font-semibold">sequential encoding</strong> and <strong className="text-white font-semibold">verbal linking</strong> capabilities. By forcing rapid ingestion of related concepts mapped in a strict sequence, you strengthen the neural pathways required for learning complex processes, remembering arguments, and delivering speeches without notes.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Students studying for exams, public speakers, professionals needing strong information retention, and anyone wanting to improve sequential verbal recall.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Associative memory capacity, sequential linguistic recall, rapid information encoding, conceptual linking, and active working memory.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score, accuracy percentage, total successful words recalled, Max Streak, and your peak working memory capacity (Max Chain Length).</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ol className="space-y-3 list-decimal pl-5 text-sm text-gray-400 leading-relaxed">
                    <li><strong className="text-gray-200">Observe & Link:</strong> Instead of memorizing isolated words (e.g., "Seed, Tree, Fruit"), visualize them as a living process (a seed growing into a tree that bears fruit).</li>
                    <li><strong className="text-gray-200">Sub-vocalization:</strong> Read the words actively out loud in your head. The phonological loop highly reinforces the memory trace before the recall phase.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> You receive <span className="text-green-400 font-bold">+5 points and +5 seconds</span> per correct word typed. However, an incorrect word actively punishes you with <span className="text-red-400 font-bold">-3 points and -2 seconds</span>. Accuracy is paramount!</li>
                  </ol>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">How does the difficulty scaling work?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">The drill actively monitors your success. If you complete a full chain flawlessly without a single typo, the engine automatically adds another concept to the sequence (up to a maximum of 8 words) for the next round. If you make a mistake, the chain length decreases to allow you to recover.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Does spelling matter?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Yes. However, the system is strictly case-insensitive, meaning "Sun" and "sun" are evaluated equally. But an incorrect letter will count as an immediate error.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related visual drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-rose-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/memory/short-term-memory/color-sequence" title="Color Sequence" desc="Memorize progressive visual sequences." color="blue" icon={<Star className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/short-term-memory/digit-span" title="Digit Span" desc="Recall increasingly long digit strings." color="green" icon={<Hash className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/working-memory/n-back" title="Dual N-Back" desc="Gold standard working memory trainer." color="orange" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/visual-recognition/visual-search" title="Visual Search" desc="Conjunctive search for hidden items." color="cyan" icon={<Search className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FOOTER */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Visual Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual/visual-recognition/entropic-grid" className="hover:text-rose-400 transition-colors">Entropic Grid</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-rose-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-rose-450 hover:text-rose-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-rose-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-rose-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-rose-450 hover:text-rose-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-rose-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-rose-400 transition-colors">Aim Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-rose-450 hover:text-rose-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-rose-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-rose-400 transition-colors">Divided Attention</Link></li>
                    <li><Link href="/drills/cognitive" className="text-rose-450 hover:text-rose-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic" className="hover:text-rose-400 transition-colors">Academic (12)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-rose-400 transition-colors">Mental Fitness (6)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-rose-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-rose-500/25 to-red-500/25 border border-rose-500/30 rounded-lg flex items-center justify-center">
                    <Activity className="w-3.5 h-3.5 text-rose-400" />
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
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="X / Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
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

// ============================================================
// UI HELPER COMPONENTS
// ============================================================
function StatCard({ icon, value, label, unit = '' }) {
  return (
    <div className="group rounded-xl border border-gray-800 bg-gray-900/50 p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-700 backdrop-blur-sm pointer-events-none">
      <div className="mb-0.5 sm:mb-1.5 flex justify-center opacity-90 scale-75 sm:scale-100">{icon}</div>
      <p className="text-sm sm:text-lg md:text-xl font-black tracking-tighter truncate text-white leading-none mt-0.5 sm:mt-0">
        {value}<span className="text-[10px] sm:text-xs font-bold ml-0.5 text-gray-500">{unit}</span>
      </p>
      <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest truncate text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function RuleItem({ num, color, text, highlight = '', result }) {
  const colorMap = { 
    rose: 'bg-rose-600 text-rose-300 border-rose-500', 
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
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-rose-500 to-red-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-black border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-rose-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-rose-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}