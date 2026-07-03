'use client';

import { Component, useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Eye, Timer, Trophy, Volume2, VolumeX, Maximize2, Minimize2,
  Info, RefreshCw, GraduationCap, Lightbulb, TrendingUp, 
  BarChart3, ArrowRight, Brain, AlertTriangle, Target, 
  CheckCircle, XCircle, Play, Share2, ChevronRight, Activity, Search, 
  Repeat, Hash, LogOut, Users
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';

const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];

const COLOR_STYLES = {
  red: "bg-red-500 hover:bg-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]",
  blue: "bg-blue-500 hover:bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]",
  green: "bg-green-500 hover:bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]",
  yellow: "bg-yellow-400 hover:bg-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.5)]",
  purple: "bg-purple-500 hover:bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]",
  orange: "bg-orange-500 hover:bg-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
};

const COLOR_BASE = {
  red: "bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.8)]",
  blue: "bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.8)]",
  green: "bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.8)]",
  yellow: "bg-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.8)]",
  purple: "bg-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.8)]",
  orange: "bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.8)]"
};

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

  playTone(freq, type, duration, vol) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type; 
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch(e) {}
  }

  playPerfect() { this.playTone(880, 'sine', 0.15, 0.1); }   
  playClose()   { this.playTone(660, 'sine', 0.15, 0.1); }
  playStreak()  { this.playTone(1046.5, 'triangle', 0.3, 0.12); } 
  playFail()    { this.playTone(220, 'sawtooth', 0.25, 0.15); } 
  playTick()    { this.playTone(1200, 'sine', 0.05, 0.02); }
  
  setEnabled(status) { this.enabled = status; }
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
export default function ColorSequenceClient() {
  // === UI State ===
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game State ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [perfectHits, setPerfectHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  
  // === Drill Specific State ===
  const [phase, setPhase] = useState('ready'); // 'ready' | 'showing' | 'input' | 'result'
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [showingColor, setShowingColor] = useState(null);

  // === Engine Setup ===
  const engine = useGameEngine({
    category: 'memory',
    drillId: 'color-sequence',
    drillName: 'Color Sequence',
    totalGameTime: 9999, // Overridden by custom decimal timer
    sharePath: 'drills/memory/short-term-memory/color-sequence',
  });

  const containerRef = useRef(null);
  const engineRef = useRef(engine);
  
  const timerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const sequenceTimeoutRef = useRef(null);
  const inputTimeoutRef = useRef(null);

  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const localTimeRef = useRef(60.0);
  const levelRef = useRef(1);
  const isActiveRef = useRef(false);
  const phaseRef = useRef('ready');
  const gameStateRef = useRef(engine.gameState);
  
  const sequenceRef = useRef([]);
  const userSequenceRef = useRef([]);

  // Sync refs
  useEffect(() => { 
    gameStateRef.current = engine.gameState; 
    engineRef.current = engine;
  }, [engine.gameState, engine]);

  // Init
  useEffect(() => {
    setIsClient(true);
    try { 
      const name = localStorage.getItem('skilldrills_player_name'); 
      if (name) setPlayerNameInput(name); 
      
      const s = localStorage.getItem('colorSeqBestScore_v7'); 
      if (s) { const p = parseInt(s,10); if (!isNaN(p)) setBestScore(p); }
    } catch (e) {}
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  // Audio Sync
  useEffect(() => { if (audioSynth) audioSynth.setEnabled(soundEnabled); }, [soundEnabled]);

  // Fullscreen Detection
  useEffect(() => { 
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', fsHandler); 
    return () => document.removeEventListener('fullscreenchange', fsHandler); 
  }, []);

  const updateLocalBestScore = useCallback((finalScore) => { 
    try { 
      const currentBest = parseInt(localStorage.getItem('colorSeqBestScore_v7') || '0', 10); 
      if (finalScore > currentBest) { 
        localStorage.setItem('colorSeqBestScore_v7', finalScore.toString()); 
        setBestScore(finalScore); 
      } 
    } catch(e) {} 
  }, []);

  useEffect(() => {
    if (engine.gameState === 'ended') {
      updateLocalBestScore(scoreRef.current);
    }
  }, [engine.gameState, updateLocalBestScore]);

  const clearAllTimeouts = useCallback(() => { 
    if (sequenceTimeoutRef.current) clearTimeout(sequenceTimeoutRef.current); 
    if (inputTimeoutRef.current) clearTimeout(inputTimeoutRef.current); 
  }, []);

  useEffect(() => {
    if (engine.gameState === 'ended' || engine.gameState === 'start') {
      clearAllTimeouts();
      isActiveRef.current = false;
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  }, [engine.gameState, clearAllTimeouts]);

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      } else if (isFullscreen) {
        await document.exitFullscreen(); 
      }
    } catch (err) {} 
  }, [isFullscreen]);

  const savePlayerName = useCallback(() => {
    const name = playerNameInput.trim() || 'Anonymous Player';
    try { localStorage.setItem('skilldrills_player_name', name); } catch (e) {}
    setShowNameInput(false);
  }, [playerNameInput]);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 1200);
  }, []);

  // ============================================================
  // DRILL MECHANICS
  // ============================================================
  
  const startCycleRef = useRef();

  const evaluateSequence = useCallback((isTimeout = false) => {
      if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
      clearAllTimeouts();
      
      setPhase('result');
      phaseRef.current = 'result';
      
      if (isTimeout) {
          // TIMEOUT PENALTY (-10 Score, -3s Time)
          setMissedHits(p => p + 1);
          streakRef.current = 0;
          setStreak(0);
          
          scoreRef.current = Math.max(0, scoreRef.current - 10);
          setScore(scoreRef.current);
          
          localTimeRef.current -= 3.0;
          setLocalTimeRemaining(Math.max(0, localTimeRef.current));
          
          levelRef.current = Math.max(1, levelRef.current - 1);
          setLevel(levelRef.current);
          
          if (audioSynth) audioSynth.playFail();
          triggerFeedback(`⏳ TIMEOUT! -10 PTS | -3s`, 'error');
          
      } else {
          // PERFECT ROUND (+15 Score, +5s Time, Capped at 60s)
          setPerfectHits(p => p + 1);
          streakRef.current += 1;
          setStreak(streakRef.current);
          if (streakRef.current > bestStreakRef.current) { bestStreakRef.current = streakRef.current; setBestStreak(streakRef.current); }
          
          scoreRef.current += 15;
          setScore(scoreRef.current);
          
          localTimeRef.current = Math.min(60.0, localTimeRef.current + 5.0);
          setLocalTimeRemaining(localTimeRef.current);
          
          levelRef.current += 1;
          setLevel(levelRef.current);
          
          if (streakRef.current % 5 === 0 && streakRef.current > 0) {
              if (audioSynth) audioSynth.playStreak();
              triggerFeedback(`🔥 ${streakRef.current} Streak! +15 PTS | +5s`, 'success');
          } else {
              if (audioSynth) audioSynth.playPerfect();
              triggerFeedback(`✓ PERFECT! +15 PTS | +5s`, 'success');
          }
      }
      
      // Delay before next round
      sequenceTimeoutRef.current = setTimeout(() => {
          if (isActiveRef.current && startCycleRef.current) startCycleRef.current();
      }, 1500);

  }, [triggerFeedback, clearAllTimeouts]);

  const playSequence = useCallback(async (seq) => {
      setPhase('showing');
      phaseRef.current = 'showing';
      setShowingColor(null);
      
      // Adaptive speed based on level
      const baseSpeed = Math.max(300, 1000 - (levelRef.current * 40));
      
      for (let i = 0; i < seq.length; i++) {
          if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
          
          await new Promise(r => { sequenceTimeoutRef.current = setTimeout(r, baseSpeed * 0.3); });
          
          if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
          setShowingColor(seq[i]);
          if (audioSynth) audioSynth.playTick(); 
          
          await new Promise(r => { sequenceTimeoutRef.current = setTimeout(r, baseSpeed * 0.7); });
          
          if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
          setShowingColor(null);
      }
      
      if (isActiveRef.current && gameStateRef.current === 'playing') {
          setPhase('input');
          phaseRef.current = 'input';
          
          // Input Phase Timeout (15s to complete sequence)
          if(inputTimeoutRef.current) clearTimeout(inputTimeoutRef.current);
          inputTimeoutRef.current = setTimeout(() => {
              if(isActiveRef.current && phaseRef.current === 'input') {
                  evaluateSequence(true); // Force timeout evaluation
              }
          }, 15000); 
      }
  }, [evaluateSequence]);

  const startCycle = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    // Sequence Length = Level + 2
    const len = levelRef.current + 2; 
    const newSeq = [];
    for(let i=0; i<len; i++) {
        newSeq.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
    }
    
    sequenceRef.current = newSeq;
    setSequence(newSeq);
    userSequenceRef.current = [];
    setUserSequence([]);
    
    setPhase('ready');
    phaseRef.current = 'ready';

    sequenceTimeoutRef.current = setTimeout(() => {
        if (isActiveRef.current) playSequence(newSeq);
    }, 800);
    
  }, [playSequence]);

  // Bind ref to avoid circular dependency loop warnings
  useEffect(() => {
    startCycleRef.current = startCycle;
  }, [startCycle]);

  const handleColorClick = useCallback((color) => {
      if (phaseRef.current !== 'input' || !isActiveRef.current) return;
      
      const newSeq = [...userSequenceRef.current, color];
      userSequenceRef.current = newSeq;
      setUserSequence(newSeq);
      
      const targetSeq = sequenceRef.current;
      const currentIndex = newSeq.length - 1;
      
      if (newSeq[currentIndex] === targetSeq[currentIndex]) {
          // CORRECT TAP
          if (audioSynth) audioSynth.playTick();
          
          // Check if sequence is fully complete
          if (newSeq.length === targetSeq.length) {
              if(inputTimeoutRef.current) clearTimeout(inputTimeoutRef.current);
              // Small delay before evaluation so user sees their last tap
              setTimeout(() => evaluateSequence(false), 300);
          }
      } else {
          // WRONG TAP (Instant failure: -10 Score, -3s Time)
          if(inputTimeoutRef.current) clearTimeout(inputTimeoutRef.current);
          setPhase('result');
          phaseRef.current = 'result';
          
          scoreRef.current = Math.max(0, scoreRef.current - 10);
          setScore(scoreRef.current);
          
          localTimeRef.current -= 3.0; 
          setLocalTimeRemaining(Math.max(0, localTimeRef.current));
          
          setMissedHits(m => m + 1);
          streakRef.current = 0;
          setStreak(0);
          
          levelRef.current = Math.max(1, levelRef.current - 1); // Drop difficulty to recover
          setLevel(levelRef.current);
          
          if (audioSynth) audioSynth.playFail();
          triggerFeedback(`Wrong Color! -10 PTS | -3s`, 'error');
          
          sequenceTimeoutRef.current = setTimeout(() => {
              if (isActiveRef.current && startCycleRef.current) startCycleRef.current();
          }, 1500);
      }
      
  }, [evaluateSequence, triggerFeedback]);


  // Decoupled Precision Timer
  useEffect(() => { 
    if (engine.gameState === 'playing') { 
      timerIntervalRef.current = setInterval(() => { 
        localTimeRef.current -= 0.1;
        
        if (localTimeRef.current <= 0) { 
          localTimeRef.current = 0;
          setLocalTimeRemaining(0);
          isActiveRef.current = false; 
          engineRef.current.endGame();
          clearInterval(timerIntervalRef.current);
          return;
        } 
        setLocalTimeRemaining(localTimeRef.current);
      }, 100); 
    } 
    return () => { 
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); 
    }; 
  }, [engine.gameState]);

  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    
    setScore(0); 
    setPerfectHits(0); setMissedHits(0); 
    setStreak(0); setBestStreak(0); 
    
    localTimeRef.current = 60.0;
    setLocalTimeRemaining(60.0);
    
    scoreRef.current = 0; 
    streakRef.current = 0;
    bestStreakRef.current = 0;
    levelRef.current = 1;
    setLevel(1);
    
    // CRITICAL: Set states synchronously so startCycle() works immediately
    isActiveRef.current = true; 
    gameStateRef.current = 'playing';
    
    clearAllTimeouts(); 
    
    // AUTO FULLSCREEN ON START
    try { 
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      }
    } catch (err) {
      console.warn("Fullscreen request failed", err);
    } 
    
    engine.startGame();
    startCycle();
  }, [clearAllTimeouts, startCycle, engine]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/memory/short-term-memory/color-sequence';
    if (navigator.share) {
      navigator.share({ title: 'Color Sequence Memory Drill', text: 'Train your visual memory! Free!', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  if (loading || !isClient) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050508]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    ); 
  }

  const accuracyPercentage = perfectHits + missedHits === 0 ? 100 : Math.round((perfectHits / (perfectHits + missedHits)) * 100);
  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracyPercentage;
  const isNewBest = engine.gameState === 'ended' && score > bestScore && score > 0;

  return (
    <div className="min-h-screen select-none bg-[#050508] text-white selection:bg-transparent font-sans" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/drills/memory" className="text-gray-500 hover:text-gray-300 transition-colors">Memory Drills</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-purple-400 font-medium">Color Sequence</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Color Sequence</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Visual Memory • Pattern Recall • Endless Survival</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {engine.gameState === 'playing' && (
              <button onPointerDown={e => e.stopPropagation()} onClick={() => { engine.endGame(); handleStartGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset"><RefreshCw className="w-5 h-5" /></button>
            )}
            <button onPointerDown={e => e.stopPropagation()} onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onPointerDown={e => e.stopPropagation()} onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Fullscreen">{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-purple-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
          <StatCard icon={<Repeat className="text-yellow-400" />} value={level} label="Level" />
          <StatCard icon={<TrendingUp className="text-orange-400" />} value={streak} label="Streak" />
          <StatCard icon={<Activity className="text-blue-400" />} value={accuracyPercentage} label="Accuracy" unit="%" />
          <StatCard icon={<CheckCircle className="text-green-400" />} value={perfectHits} label="Correct" />
          <StatCard icon={<XCircle className="text-red-400" />} value={missedHits} label="Errors" />
          <StatCard icon={<Trophy className="text-pink-400" />} value={Math.max(bestScore, score)} label="Best" />
        </div>

        {/* Dynamic Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {localFeedback.visible && (
            <div key={localFeedback.id} className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : localFeedback.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-yellow-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
              {localFeedback.text}
            </div>
          )}
        </div>

        {/* Game Container */}
        <GameErrorBoundary>
          <div ref={containerRef} 
            className={`relative overflow-hidden flex flex-col transition-all duration-100 ${
              isFullscreen 
                ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-[#050508]' 
                : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[500px] md:aspect-video'
            }`}
            style={{ background: '#050508' }}>
            
            {/* Time Progress Bar */}
            {engine.gameState === 'playing' && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
                <div 
                  className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
                />
              </div>
            )}

            {isFullscreen && engine.gameState === 'playing' && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); engine.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setSoundEnabled(v => !v); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              </div>
            )}

            {/* ACTIVE GAMEPLAY AREA */}
            {engine.gameState === 'playing' && (
              <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 h-full w-full relative overflow-y-auto">
                  
                  {/* Sequence Progress HUD */}
                  <div className="absolute top-6 left-0 right-0 flex justify-center pointer-events-none">
                      <div className="flex flex-wrap items-center justify-center gap-2 max-w-xs sm:max-w-md bg-gray-900/60 p-2 sm:p-3 rounded-2xl backdrop-blur-sm border border-gray-800">
                          {sequence.map((c, i) => {
                              let statusClass = "bg-gray-800 border-gray-700";
                              if (phase === 'result') {
                                  statusClass = userSequence[i] === c ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]";
                              } else if (i < userSequence.length) {
                                  statusClass = COLOR_BASE[userSequence[i]];
                              }
                              return (
                                  <div key={i} className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full border transition-all duration-200 ${statusClass}`} />
                              );
                          })}
                      </div>
                  </div>

                  {/* SHOWING PHASE */}
                  {phase === 'showing' && (
                      <div className="text-center animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center justify-center h-full">
                          <div className={`w-32 h-32 sm:w-48 sm:h-48 rounded-full transition-all duration-200 shadow-2xl ${
                              showingColor ? COLOR_BASE[showingColor] : 'bg-gray-900 border-2 border-gray-800'
                          } ${showingColor ? `shadow-${showingColor}-500/40` : ''}`} />
                      </div>
                  )}

                  {/* READY / RESULT PHASE */}
                  {(phase === 'ready' || phase === 'result') && (
                      <div className="text-center animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center justify-center h-full">
                          <div className={`w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 transition-all duration-200 shadow-2xl flex items-center justify-center ${
                              phase === 'result' ? 'border-gray-800 bg-gray-900/50' : 'border-purple-500/30 bg-purple-900/20 shadow-[0_0_40px_rgba(168,85,247,0.2)] animate-pulse'
                          }`}>
                              {phase === 'ready' && <span className="text-purple-400 font-black tracking-widest text-sm sm:text-lg uppercase">READY</span>}
                              {phase === 'result' && <span className="text-gray-400 font-bold tracking-widest text-xs uppercase">EVALUATING</span>}
                          </div>
                      </div>
                  )}

                  {/* INPUT PHASE */}
                  {phase === 'input' && (
                      <div className="w-full max-w-md flex flex-col items-center justify-center h-full animate-in slide-in-from-bottom-8 duration-200">
                          <div className="w-full grid grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-12">
                              {COLORS.map((color) => (
                                  <button 
                                      key={color}
                                      onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); handleColorClick(color); }}
                                      className={`aspect-square sm:aspect-auto sm:h-24 ${COLOR_STYLES[color]} border-2 border-white/10 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all active:scale-90`}
                                      aria-label={`Select ${color}`}
                                  />
                              ))}
                          </div>
                      </div>
                  )}
              </div>
            )}

            {/* Start Screen (Scrollable on tight displays) */}
            {engine.gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                    <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-2 pointer-events-none tracking-tight">Color Sequence</h2>
                  <p className="text-sm sm:text-base mb-6 text-gray-400 leading-relaxed pointer-events-none">Watch the color sequence closely, then repeat it exactly. Adapts to your skill level.</p>
                  
                  <button onPointerDown={e => e.stopPropagation()} onClick={handleStartGame}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none shrink-0">
                    <Play className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Premium End Screen (Scrollable) */}
            {engine.gameState === 'ended' && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col my-auto">
                  
                  <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                      <p className="text-purple-400 font-medium text-xs sm:text-sm">Color Sequence • Peak Capacity: {level} Colors</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pointer-events-none shrink-0">
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
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Perfects</div>
                        <div className="text-base sm:text-xl font-black text-green-400">{perfectHits}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Errors</div>
                        <div className="text-base sm:text-xl font-black text-red-400">{missedHits}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Streak</div>
                        <div className="text-base sm:text-xl font-black text-orange-400">{bestStreak}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                    <button onPointerDown={e => e.stopPropagation()} onClick={() => { engine.endGame(); handleStartGame(); }} className="flex-1 py-3 sm:py-4 bg-purple-600 text-white rounded-xl font-black tracking-wide hover:bg-purple-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={() => { if(isFullscreen) toggleFullscreen(); engine.endGame(); }} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </GameErrorBoundary>

        {/* Instructions */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-purple-400" /><h2 className="font-bold text-white text-lg tracking-tight">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="green" text="Perfect Sequence" highlight="+15 PTS | +5s" result="Level Up (+1 Color)" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="red" text="Wrong Tap / Timeout" highlight="-10 PTS | -3s" result="Level Down (-1 Color)" />
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
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <h2 className="font-bold text-white text-lg tracking-tight">About Color Sequence</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This free Color Sequence drill trains visual working memory capacity through a highly challenging Endless Time-Attack format. You are shown a sequence of flashing colors to memorize. As you successfully input the correct sequence, the strings get longer and the display speed gets faster, actively pushing the limits of your short-term visual recall.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Students improving visual study retention, professionals needing strong pattern recall, seniors maintaining cognitive function, and anyone wanting to benchmark visual working memory.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Visual short-term memory, working memory capacity, pattern recall, sequential color processing, and concentration under time pressure.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score, accuracy percentage, Perfects, Misses, and your peak visual capacity (Max Colors) reached.</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Chunking:</strong> Don't try to remember individual colors (e.g., Red-Blue-Green-Red). Group them into pairs or patterns (Red-Blue, Green-Red). This is scientifically proven to bypass short-term memory limits.</li>
                    <li><strong className="text-gray-200">Sub-vocalization:</strong> Silently repeating the colors in your head ("Red, Blue, Green...") activates the phonological loop, reinforcing the visual memory trace before you tap.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> You are awarded +15 points and +5s time back for perfectly completing a full sequence. However, a single wrong tap instantly deducts -3s and -10 points. Focus on accuracy! Maximum time is capped at 60s.</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Is there a penalty for a wrong tap?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Yes! Accuracy is paramount. A single incorrect color tap will immediately end the round, deducting 10 points and 3 seconds from your timer, as well as dropping your difficulty level to let you recover.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Why does it flash by so fast?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">This is an adaptive engine. Every time you complete a sequence perfectly, the sequence gets one color longer AND the display speed gets faster. This forces rapid memory encoding and prevents passive viewing.</p>
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
              <div className="w-1 h-5 rounded-full bg-purple-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/memory/short-term-memory/digit-span" title="Digit Span" desc="Train numerical short-term memory." color="purple" icon={<Hash className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/working-memory/n-back" title="Dual N-Back" desc="Gold standard working memory trainer." color="green" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/associative-memory/concept-linking" title="Concept Linking" desc="Memorize and recall concept chains." color="orange" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/visual-recognition/visual-search" title="Visual Search" desc="Conjunctive search for hidden items." color="blue" icon={<Search className="w-4 h-4" />} />
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
                    <li><Link href="/drills/visual/visual-recognition/entropic-grid" className="hover:text-purple-400 transition-colors">Entropic Grid</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-purple-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-purple-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-purple-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-purple-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-purple-400 transition-colors">Aim Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-purple-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-purple-400 transition-colors">Divided Attention</Link></li>
                    <li><Link href="/drills/cognitive" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic" className="hover:text-purple-400 transition-colors">Academic (12)</Link></li>
                    <li><Link href="/drills/visual-tracking" className="hover:text-purple-400 transition-colors">Tracking (25 drills)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-purple-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500/25 to-pink-500/25 border border-purple-500/30 rounded-lg flex items-center justify-center">
                    <Hash className="w-3.5 h-3.5 text-purple-400" />
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
    rose: 'from-rose-500 to-pink-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
    green: 'from-green-500 to-emerald-500'
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:-translate-y-1 hover:border-purple-500/50`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-purple-500 to-pink-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050508] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-purple-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-purple-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}