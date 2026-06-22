'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Eye,
  BarChart3, Info, Grid, RefreshCw, LogOut,
  Star, Users, Share2, 
  GraduationCap, Lightbulb, TrendingUp, Clock, ArrowRight,
  Award, CheckCircle, XCircle,
  ChevronRight, Play, Heart, Circle, Square, Triangle, 
  Diamond, Hexagon, Activity, Grid3X3
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';

// ============================================================
// LEVEL & DIFFICULTY SYSTEM (Local & Crash-Proof)
// ============================================================
const MAX_LEVEL = 20;

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

  playPop() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch(e) {}
  }

  playMatch() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      gainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  playBuzz() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      gainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }

  playLevelUp() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(554.37, this.ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch(e) {}
  }
  
  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function CardMatchingClient() {
  
  // === UI State ===
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game Flow State ===
  const [localPhase, setLocalPhase] = useState('start'); // 'start', 'playing', 'ended'

  // === Game State (Visual Sync) ===
  const [cards, setCards] = useState([]);
  const [gridCols, setGridCols] = useState(4);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  
  const [totalClicks, setTotalClicks] = useState(0);
  const [correctMatches, setCorrectMatches] = useState(0);
  const [penaltyCount, setPenaltyCount] = useState(0);
  
  // === Level & Score State ===
  const [currentScore, setCurrentScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  // === Custom Decoupled Timer ===
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // === Absolute Truth Refs (Zero-latency) ===
  const mountedRef = useRef(false);
  const gameContainerRef = useRef(null);
  
  const cardsRef = useRef([]);
  const flippedIndicesRef = useRef([]);
  const matchedIndicesRef = useRef([]);
  const flipCountsRef = useRef({}); 
  const waitingRef = useRef(false);

  const scoreRef = useRef(0);
  const levelRef = useRef(1);
  const totalClicksRef = useRef(0);
  const correctMatchesRef = useRef(0);
  const penaltyCountRef = useRef(0);
  const localTimeRef = useRef(60);

  const timerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const hasProcessedEndRef = useRef(false);

  // Sync state for UI rendering
  const syncToUI = useCallback(() => {
    setCurrentScore(scoreRef.current);
    setCurrentLevel(levelRef.current);
    setTotalClicks(totalClicksRef.current);
    setCorrectMatches(correctMatchesRef.current);
    setPenaltyCount(penaltyCountRef.current);
  }, []);

  // === Game Engine (Stats Tracking Background) ===
  const engine = useGameEngine({
    category: 'cognitive',
    drillId: 'card-matching',
    drillName: 'Card Matching',
    totalGameTime: 9999, 
    lives: 9999, 
    infiniteLives: true, 
    sharePath: 'drills/cognitive/memory/card-matching',
  });
  const engineRef = useRef(engine);

  useEffect(() => {
    engineRef.current = engine;
  }, [engine]);

  // === Custom Precision Timer ===
  useEffect(() => {
    if (localPhase !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      localTimeRef.current -= 1;
      setLocalTimeRemaining(localTimeRef.current);
      
      if (localTimeRef.current <= 0) {
        clearInterval(timerIntervalRef.current);
        setIsTimeUp(true); 
        setLocalPhase('ended');
        if (typeof engineRef.current?.endGame === 'function') {
          engineRef.current.endGame();
        }
      }
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [localPhase, isTimeUp]);

  // Audio Sync
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Load Best Score on Mount
  useEffect(() => {
    setIsClient(true);
    mountedRef.current = true;
    try {
      const savedScore = localStorage.getItem('skilldrills_card_matching_bestScore');
      if (savedScore) setBestScore(parseInt(savedScore) || 0);
      const name = localStorage.getItem('skilldrills_player_name');
      if (name) setPlayerNameInput(name);
    } catch (e) {}
    
    setTimeout(() => {
      if (mountedRef.current) setLoading(false);
    }, 200);

    return () => {
      mountedRef.current = false;
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Fullscreen & Mobile Guard
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsHandler);
    
    const preventSpace = (e) => {
      if (e.code === 'Space' && localPhase === 'playing') e.preventDefault();
    };
    window.addEventListener('keydown', preventSpace);
    
    const preventZoom = (e) => {
      if (e.touches && e.touches.length > 1) e.preventDefault();
    };
    document.addEventListener('touchmove', preventZoom, { passive: false });

    return () => {
      document.removeEventListener('fullscreenchange', fsHandler);
      window.removeEventListener('keydown', preventSpace);
      document.removeEventListener('touchmove', preventZoom);
    };
  }, [localPhase]);

  // Game End Logic
  useEffect(() => {
    if (localPhase !== 'ended' || hasProcessedEndRef.current) return;
    hasProcessedEndRef.current = true;

    const finalScore = scoreRef.current;
    if (finalScore > bestScore && finalScore > 0) {
      setIsNewBest(true);
      setBestScore(finalScore);
      try { localStorage.setItem('skilldrills_card_matching_bestScore', finalScore.toString()); } catch (e) {}
    } else {
      setIsNewBest(false);
    }
    syncToUI();
  }, [localPhase, bestScore, syncToUI]);

  // === UI & Button Handlers ===
  const savePlayerName = useCallback(() => {
    const name = playerNameInput.trim() || 'Anonymous Player';
    try { localStorage.setItem('skilldrills_player_name', name); } catch (e) {}
    setShowNameInput(false);
  }, [playerNameInput]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement && gameContainerRef.current) {
        await gameContainerRef.current.requestFullscreen();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {}
  }, []);

  const handleExit = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(()=>{});
    }
    setLocalPhase('start');
  }, []);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 1200);
  }, []);

  // === CORE MECHANICS: Card Generation ===
  const getCardIcons = useCallback(() => {
    const iconSets = [
      { icon: Heart, name: 'heart', color: 'text-red-500' }, { icon: Star, name: 'star', color: 'text-yellow-500' },
      { icon: Circle, name: 'circle', color: 'text-blue-500' }, { icon: Square, name: 'square', color: 'text-green-500' },
      { icon: Triangle, name: 'triangle', color: 'text-purple-500' }, { icon: Diamond, name: 'diamond', color: 'text-pink-500' },
      { icon: Target, name: 'target', color: 'text-orange-500' }, { icon: Award, name: 'award', color: 'text-indigo-500' },
      { icon: Zap, name: 'zap', color: 'text-amber-500' }, { icon: Trophy, name: 'trophy', color: 'text-yellow-600' },
      { icon: Hexagon, name: 'hexagon', color: 'text-cyan-500' }, { icon: Grid, name: 'grid', color: 'text-teal-500' },
      { icon: Eye, name: 'eye', color: 'text-emerald-500' }, { icon: Activity, name: 'activity', color: 'text-rose-500' },
      { icon: Clock, name: 'clock', color: 'text-sky-500' }
    ];
    
    // Scale pairs with level: Lvl 1 = 6 pairs. Max = 15 pairs.
    let pairsCount = 6 + (levelRef.current - 1) * 2;
    pairsCount = Math.min(pairsCount, 15);

    const cols = pairsCount <= 6 ? 4 : pairsCount <= 8 ? 4 : pairsCount <= 10 ? 5 : 6;
    setGridCols(cols);

    const selectedIcons = iconSets.slice(0, pairsCount);
    let cardDeck = [];
    selectedIcons.forEach((iconSet) => { 
      cardDeck.push({ icon: iconSet.icon, name: iconSet.name, color: iconSet.color }); 
      cardDeck.push({ icon: iconSet.icon, name: iconSet.name, color: iconSet.color }); 
    });
    
    // Fisher-Yates Shuffle
    for (let i = cardDeck.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [cardDeck[i], cardDeck[j]] = [cardDeck[j], cardDeck[i]]; 
    }
    
    return cardDeck;
  }, []);

  const initGrid = useCallback(() => {
    const newDeck = getCardIcons();
    cardsRef.current = newDeck;
    setCards(newDeck);
    
    flippedIndicesRef.current = [];
    matchedIndicesRef.current = [];
    flipCountsRef.current = {}; 
    
    setFlippedIndices([]);
    setMatchedIndices([]);
    syncToUI();
  }, [getCardIcons, syncToUI]);

  // Match Resolution
  const checkMatch = useCallback((idx1, idx2) => {
    const c1 = cardsRef.current[idx1];
    const c2 = cardsRef.current[idx2];

    if (c1.name === c2.name) {
      // MATCH
      if (audioSynth) audioSynth.playMatch();
      correctMatchesRef.current += 1;
      
      matchedIndicesRef.current = [...matchedIndicesRef.current, idx1, idx2];
      setMatchedIndices([...matchedIndicesRef.current]);
      
      flippedIndicesRef.current = [];
      setFlippedIndices([]);

      // GRID COMPLETION LOGIC (+20 PTS | +15s | Increase Diff)
      if (matchedIndicesRef.current.length === cardsRef.current.length) {
        if (audioSynth) audioSynth.playLevelUp();
        
        scoreRef.current += 20;
        localTimeRef.current = Math.min(60, localTimeRef.current + 15);
        levelRef.current = Math.min(MAX_LEVEL, levelRef.current + 1);
        
        setLocalTimeRemaining(localTimeRef.current);
        triggerFeedback('✓ GRID CLEARED! +20 PTS | +15s', 'success');
        
        waitingRef.current = true;
        setTimeout(() => {
          waitingRef.current = false;
          initGrid();
        }, 800);
      } else {
        syncToUI();
      }

    } else {
      // MISMATCH
      if (audioSynth) audioSynth.playBuzz();
      waitingRef.current = true;
      
      setTimeout(() => {
        flippedIndicesRef.current = [];
        setFlippedIndices([]);
        waitingRef.current = false;
      }, 600);
    }
  }, [triggerFeedback, syncToUI, initGrid]);

  // === ZERO-LATENCY CELL CLICK ===
  const handleCardClick = useCallback((index, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
      if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
    }

    if (localPhase !== 'playing' || isTimeUp) return;
    if (waitingRef.current) return;
    if (matchedIndicesRef.current.includes(index)) return;
    if (flippedIndicesRef.current.includes(index)) return;
    if (flippedIndicesRef.current.length >= 2) return;

    totalClicksRef.current += 1;

    // >5 FLIP MEMORY PENALTY (-2 PTS | -1s | Decrease Diff)
    const currentFlips = (flipCountsRef.current[index] || 0) + 1;
    flipCountsRef.current[index] = currentFlips;

    if (currentFlips > 5) {
      if (audioSynth) audioSynth.playBuzz();
      penaltyCountRef.current += 1;
      
      scoreRef.current = Math.max(0, scoreRef.current - 2); 
      localTimeRef.current -= 1;
      levelRef.current = Math.max(1, levelRef.current - 1); 
      
      setLocalTimeRemaining(localTimeRef.current);
      triggerFeedback('✗ PENALTY! -2 PTS | -1s', 'error');

      if (localTimeRef.current <= 0) {
        setIsTimeUp(true);
        setLocalPhase('ended');
        if (engineRef.current?.endGame) engineRef.current.endGame();
      }
    } else {
      if (audioSynth) audioSynth.playPop();
    }

    const newFlipped = [...flippedIndicesRef.current, index];
    flippedIndicesRef.current = newFlipped;
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      checkMatch(newFlipped[0], newFlipped[1]);
    }
    
    syncToUI();
  }, [localPhase, isTimeUp, checkMatch, triggerFeedback, syncToUI]);

  // Core Game Start/Restart
  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setLocalPhase('playing');
    setIsTimeUp(false);
    hasProcessedEndRef.current = false;
    
    scoreRef.current = 0;
    levelRef.current = 1;
    totalClicksRef.current = 0;
    correctMatchesRef.current = 0;
    penaltyCountRef.current = 0;
    localTimeRef.current = 60;
    
    setLocalTimeRemaining(60);
    initGrid();
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });
    
    engineRef.current?.startGame();

    // Auto Fullscreen on Start/Restart
    try {
      if (gameContainerRef.current && !document.fullscreenElement) {
        await gameContainerRef.current.requestFullscreen();
      }
    } catch (err) {}
  }, [initGrid]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/cognitive/memory/card-matching';
    if (navigator.share) {
      navigator.share({ title: 'Card Matching Memory Drill', text: 'Test your spatial memory capacity!', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied to clipboard!')).catch(() => prompt('Copy link:', url));
    }
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(236,72,153,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  const accuracy = totalClicks > 0 ? Math.round(((correctMatches * 2) / totalClicks) * 100) : 0;
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
            <li><Link href="/drills/cognitive" className="text-gray-500 hover:text-gray-300 transition-colors">Cognitive</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-gray-500">Memory</li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-pink-400 font-medium">Card Matching</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              <Grid3X3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Card Matching</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Visual Memory • High-Speed Recall • Mobile Optimized</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">

            {localPhase === 'playing' && !isTimeUp && (
              <button onClick={handleStartGame} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset">
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

        {showNameInput && (
          <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-900 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <input type="text" value={playerNameInput} onChange={e => setPlayerNameInput(e.target.value)} placeholder="Enter your display name" maxLength={20}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-pink-500 transition-colors"
                onKeyDown={e => e.key === 'Enter' && savePlayerName()} />
              <button onClick={savePlayerName} className="px-5 py-2.5 bg-pink-600 text-white rounded-lg text-sm font-semibold hover:bg-pink-500 transition-colors shadow-lg shadow-pink-600/20">Save</button>
            </div>
          </div>
        )}

        {/* Dynamic HUD */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-pink-400" />} value={currentScore} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining} label="Time" unit="s" />
          <StatCard icon={<Award className="text-blue-400" />} value={`Lv.${currentLevel}`} label="Level" />
          <StatCard icon={<CheckCircle className="text-emerald-400" />} value={correctMatches} label="Pairs" />
          <StatCard icon={<XCircle className="text-red-400" />} value={penaltyCount} label="Penalties" />
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

        {/* Game Container: Adaptive sizing for mobile vs desktop */}
        <div ref={gameContainerRef} 
          onContextMenu={(e) => { if(localPhase === 'playing') e.preventDefault(); }}
          className={`relative overflow-hidden flex flex-col items-center justify-center bg-[#050505] transition-all duration-100 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-[100vw] h-[100dvh] rounded-none' 
              : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[500px] md:aspect-video'
          }`}
          style={{ 
            margin: '0 auto',
            touchAction: localPhase === 'playing' ? 'none' : 'auto', 
            overscrollBehavior: localPhase === 'playing' ? 'none' : 'auto'
          }}>
          
          {/* Time Progress Bar */}
          {localPhase === 'playing' && !isTimeUp && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-pink-500'}`}
                style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
              />
            </div>
          )}

          {/* In-Game Controls (Fullscreen) */}
          {isFullscreen && localPhase === 'playing' && !isTimeUp && (
            <div className="absolute top-4 right-4 z-[60] flex gap-2">
              <button onClick={handleStartGame} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* GAMEPLAY AREA */}
          {localPhase === 'playing' && !isTimeUp && (
            <div className="w-full h-full flex items-center justify-center p-4 sm:p-6">
              <div 
                className="grid gap-2 sm:gap-3 mx-auto justify-center content-center max-h-full max-w-full"
                style={{ 
                  gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                  width: 'min(95vw, 85vh)' // Generous bounding box for responsive matrices
                }}
              >
                {cards.map((card, index) => {
                  const isFlipped = flippedIndices.includes(index);
                  const isMatched = matchedIndices.includes(index);
                  const IconComp = card.icon;

                  return (
                    <button
                      key={index}
                      onPointerDown={(e) => handleCardClick(index, e)}
                      disabled={isMatched || isFlipped}
                      className={`
                        aspect-square w-full h-full rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center focus:outline-none touch-none
                        ${isMatched ? 'opacity-0 pointer-events-none scale-50' : ''}
                        ${isFlipped ? 'bg-gray-800 border border-gray-600 scale-95 shadow-inner' : 'bg-gradient-to-br from-pink-500 to-rose-600 border border-pink-400 hover:scale-[1.03] active:scale-95 shadow-md cursor-pointer'}
                      `}
                      style={{
                        minHeight: '40px',
                        maxHeight: '120px' // Increased to allow cells to grow much larger on desktop/landscape mobile
                      }}
                      aria-label="Card"
                    >
                      {isFlipped && (
                        <div className="animate-in zoom-in fade-in duration-200">
                          <IconComp className={`w-8 h-8 sm:w-12 sm:h-12 ${card.color}`} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* START SCREEN (Scrollable) */}
          {localPhase === 'start' && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto">
              <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto flex flex-col">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(236,72,153,0.3)] shrink-0">
                  <Grid3X3 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black mb-2 tracking-tight">Card Matching</h2>
                <p className="text-xs sm:text-sm mb-6 text-gray-400 leading-relaxed shrink-0">Memorize the card positions and match pairs. Avoid guessing to prevent memory penalties.</p>
                
                <button 
                  onClick={handleStartGame}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(236,72,153,0.3)] shrink-0">
                  <Play className="w-5 h-5 fill-white" /> START DRILL
                </button>
              </div>
            </div>
          )}

          {/* END SCREEN (Scrollable) */}
          {(localPhase === 'ended' || isTimeUp) && (
            <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6">
              <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[95vh] overflow-y-auto my-auto">
                
                <div className="bg-gradient-to-br from-pink-900/40 to-rose-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    {isNewBest && (
                      <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                        ⭐ New Personal Best
                      </div>
                    )}
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Time Expired</h2>
                    <p className="text-pink-400 font-medium text-sm">Card Matching • Reached Level {currentLevel}</p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 pointer-events-none shrink-0">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                      <div className="flex items-end gap-1">
                        <span className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tighter">{currentScore}</span>
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
                        <span className={`text-lg sm:text-xl font-black ${accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracy}%</span>
                        <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2">
                    <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Pairs Matched</div>
                      <div className="text-lg sm:text-xl font-black text-pink-400">{correctMatches}</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Memory Penalties</div>
                      <div className="text-lg sm:text-xl font-black text-red-400">{penaltyCount}</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 shrink-0 rounded-b-3xl">
                  <button onClick={handleStartGame} className="flex-1 py-3 sm:py-4 bg-pink-600 text-white rounded-xl font-black tracking-wide hover:bg-pink-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.4)] text-sm sm:text-base">
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                  </button>
                  <button onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button onClick={handleExit} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                
              </div>
            </div>
          )}
        </div>

        {/* DRILL RULES & SCORING */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-pink-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Rules & High-Stakes Economy</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="indigo" text="Clear the Grid Flawlessly" highlight="+20 PTS | +15s" result="Increases Difficulty" />
                  <RuleItem num="2" color="purple" text="Adaptive Grid Sizing" highlight="Scale up to 30 Cards" result="Scales on Performance" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="View identical card >5 times" highlight="-2 PTS | -1s" result="Decreases Difficulty" />
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
                <GraduationCap className="w-5 h-5 text-pink-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Card Matching</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This cognitive drill trains <strong className="text-white font-semibold">spatial working memory</strong> and <strong className="text-white font-semibold">visual pattern retention</strong>. By memorizing icon locations across dynamically scaling grids and penalizing blind guessing, this drill pushes your brain to establish rapid short-term memories rather than relying on luck.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Students needing high-retention study habits, competitive gamers mapping positional awareness, and professionals preventing cognitive decline.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Spatial memory mapping, immediate visual recall grouping, sustained concentration under time pressure, and grid position accuracy.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Difficulty Scaling</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">The drill begins gently with a small grid. Clearing grids safely expands the matrix up to 30 active cards. Taking memory penalties shrinks the board.</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Vocal Anchoring:</strong> Say the icon's color and shape out loud to utilize auditory memory alongside visual memory (e.g., "Pink Diamond, Top Left").</li>
                    <li><strong className="text-gray-200">Stop Guessing:</strong> Clicking randomly triggers the anti-guessing mechanic. Re-checking the same card more than 5 times results in a <span className="text-red-400 font-bold">-2 point and -1 second</span> penalty.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> You earn <span className="text-green-400 font-bold">+20 points and +15 seconds</span> for entirely clearing a grid. Speed is good, but memory accuracy keeps you alive.</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-pink-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">How does the memory penalty work?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">If you blindly guess and flip the same card more than 5 times without successfully matching it, you trigger the penalty. You immediately lose 2 points, 1 second is deducted from your timer, and your difficulty level temporarily drops.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">How do I extend my time?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">You begin with 60 seconds. Every time you perfectly match all cards and clear the entire grid, you are rewarded with 20 points and a massive 15-second time extension (which is strictly capped at the 60-second maximum).</p>
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
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-pink-500 to-rose-600"></div>
              <h2 className="text-xl font-bold text-white">Explore Cognitive Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/memory/short-term-memory/color-sequence" title="Color Sequence" desc="Memorize progressive color sequences." color="blue" icon={<Star className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/selective-attention" title="Selective Attention" desc="Focus on relevant info while ignoring distractions." color="cyan" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/spatial-memory/grid-memorization" title="Grid Memorization" desc="Memorize the exact location of illuminated cells." color="purple" icon={<Grid3X3 className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/spatial-memory/path-tracing" title="Path Tracing" desc="Watch and repeat complex dot paths." color="rose" icon={<Activity className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* GLOBAL FOOTER */}
        {!isFullscreen && (
          <footer className="mt-16 bg-gray-950 text-gray-400 rounded-3xl py-12 px-8 border border-gray-800 shadow-xl" role="contentinfo">
            <div className="max-w-7xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-600/20">
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
    blue: 'bg-blue-600 text-blue-300 border-blue-500'
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
    green: 'from-green-500 to-emerald-500',
    rose: 'from-rose-500 to-pink-500'
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
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-pink-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-pink-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}