'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Eye,
  BarChart3, Info, Grid, RefreshCw, Gauge,
  Crosshair, Star, Users, Share2, 
  GraduationCap, Lightbulb, TrendingUp, Clock, ArrowRight,
  Brain, Keyboard, Layers, Award, CheckCircle, XCircle,
  ChevronRight, Play, LogOut, Hash, Search, Sparkles
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';
import PlayAgainButton from "../../../../../components/PlayAgainButton";

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
      const gainNode = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
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
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
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
export default function ConcentrationGridClient() {
  
  // === UI State ===
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game State (Visual Sync) ===
  const [gridSize, setGridSize] = useState(3);
  const [gridData, setGridData] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [foundNumbers, setFoundNumbers] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [correctClicks, setCorrectClicks] = useState(0);
  const [penaltyCount, setPenaltyCount] = useState(0);
  
  // === Level & Score State ===
  const [currentScore, setCurrentScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  // === Custom Decoupled Timer ===
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // === Absolute Truth Refs (Zero-latency) ===
  const mountedRef = useRef(false);
  const gameContainerRef = useRef(null);
  
  const scoreRef = useRef(0);
  const levelRef = useRef(1);
  const gridSizeRef = useRef(3);
  const currentNumberRef = useRef(1);
  const foundNumbersRef = useRef([]);
  const totalClicksRef = useRef(0);
  const correctClicksRef = useRef(0);
  const penaltyCountRef = useRef(0);
  const localTimeRef = useRef(60.0);

  const timerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const gameStateRef = useRef('start');
  const hasProcessedEndRef = useRef(false);

  // Sync state for UI rendering
  const syncToUI = useCallback(() => {
    setCurrentScore(scoreRef.current);
    setCurrentLevel(levelRef.current);
    setGridSize(gridSizeRef.current);
    setCurrentNumber(currentNumberRef.current);
    setFoundNumbers([...foundNumbersRef.current]);
    setTotalClicks(totalClicksRef.current);
    setCorrectClicks(correctClicksRef.current);
    setPenaltyCount(penaltyCountRef.current);
  }, []);

  // === Game Engine (Timer & State only) ===
  const engine = useGameEngine({
    category: 'cognitive',
    drillId: 'concentration-grid',
    drillName: 'Concentration Grid',
    totalGameTime: 9999, 
    lives: 9999, 
    infiniteLives: true, 
    sharePath: 'drills/cognitive/focus/concentration-grid',
  });

  const engineRef = useRef(engine);

  useEffect(() => {
    engineRef.current = engine;
    gameStateRef.current = engine.gameState;
    if (engine.gameState === 'playing') {
      setIsNewBest(false);
    }
  }, [engine]);

  // === Custom Precision Timer ===
  useEffect(() => {
    if (engine.gameState !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }
    
    // Only reset time if we are starting fresh
    if (!isTimeUp && localTimeRef.current === 60.0 && localTimeRemaining === 60.0) {
      // Timer already initialized
    } else if (!isTimeUp && localTimeRef.current <= 0) {
      localTimeRef.current = 60.0;
      setLocalTimeRemaining(60.0);
    }

    timerIntervalRef.current = setInterval(() => {
      localTimeRef.current -= 0.1;
      
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
    }, 100);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [engine.gameState, isTimeUp]);

  // Audio Sync
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Load Best Score on Mount
  useEffect(() => {
    setIsClient(true);
    mountedRef.current = true;

    try {
      const savedScore = localStorage.getItem('skilldrills_concentration_bestScore_v3');
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
    
    const checkOrientationAndSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) || window.innerWidth < 768;
      
      if (!isMobile) { 
        setIsMobileLandscape(false);
        return; 
      }
      
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsMobileLandscape(!isPortrait);
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

  // Game End Logic (Save Score safely when time is up)
  useEffect(() => {
    if ((engine.gameState !== 'ended' && !isTimeUp) || hasProcessedEndRef.current) return;
    hasProcessedEndRef.current = true;

    if (document.fullscreenElement) {
      try { document.exitFullscreen(); } catch (e) {}
    }
    const finalScore = scoreRef.current;
    if (finalScore > bestScore && finalScore > 0) {
      setIsNewBest(true);
      setBestScore(finalScore);
      try { localStorage.setItem('skilldrills_concentration_bestScore_v3', finalScore.toString()); } catch (e) {}
    }
    syncToUI();
  }, [engine.gameState, isTimeUp, bestScore, syncToUI]);

  // === UI & Button Handlers ===
  const savePlayerName = useCallback(() => {
    const name = playerNameInput.trim() || 'Anonymous Player';
    try { localStorage.setItem('skilldrills_player_name', name); } catch (e) {}
    setShowNameInput(false);
  }, [playerNameInput]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) await gameContainerRef.current?.requestFullscreen();
      else await document.exitFullscreen();
    } catch (err) {}
  }, []);

  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    setIsTimeUp(false);
    hasProcessedEndRef.current = false;
    localTimeRef.current = 60.0;
    setLocalTimeRemaining(60.0);
    
    try {
      if (!document.fullscreenElement && gameContainerRef.current) {
        await gameContainerRef.current.requestFullscreen();
      }
    } catch (err) {}

    engineRef.current.startGame();
  }, []);

  const handleExit = useCallback(async () => {
    if (isFullscreen) {
      try { await document.exitFullscreen(); } catch (e) {}
    }
    // Return to drill start state reliably
    window.location.reload();
  }, [isFullscreen]);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 600);
  }, []);

  // === UPDATED DIFFICULTY SCALING ===
  const updateDifficulty = useCallback(() => {
    const newLevel = Math.floor(scoreRef.current / 50) + 1;
    levelRef.current = newLevel;
    setCurrentLevel(newLevel);
    
    // Grid size starts at 3, and increases by 1 for EVERY new level.
    const targetGridSize = Math.min(8, 3 + (newLevel - 1));
    
    if (gridSizeRef.current !== targetGridSize) {
      gridSizeRef.current = targetGridSize;
      setGridSize(targetGridSize);
    }
  }, []);

  const shareScore = useCallback(() => {
    const accuracyVal = totalClicksRef.current > 0 ? Math.round((correctClicksRef.current / totalClicksRef.current) * 100) : 100;
    let finalRank = 'Bronze';
    if (scoreRef.current >= 400 && accuracyVal >= 90) finalRank = 'Grandmaster';
    else if (scoreRef.current >= 300 && accuracyVal >= 82) finalRank = 'Master';
    else if (scoreRef.current >= 220 && accuracyVal >= 75) finalRank = 'Diamond';
    else if (scoreRef.current >= 150 && accuracyVal >= 65) finalRank = 'Platinum';
    else if (scoreRef.current >= 80 && accuracyVal >= 55) finalRank = 'Gold';
    else if (scoreRef.current >= 40) finalRank = 'Silver';

    const text = `🧠 I scored ${scoreRef.current} PTS with ${accuracyVal}% accuracy on the Concentration Grid Test! Rank: ${finalRank}. Challenge your focus: https://skilldrills.online/drills/cognitive/focus/concentration-grid`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'My SkillDrills Cognitive Score',
        text: text,
        url: 'https://skilldrills.online/drills/cognitive/focus/concentration-grid'
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, []);

  // === CORE MECHANICS: Grid Generation ===
  const generateNewGrid = useCallback((size) => {
    const totalCells = size * size;
    const numbers = Array.from({ length: totalCells }, (_, i) => i + 1);
    
    // Fisher-Yates Shuffle
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    setGridData(numbers);
    currentNumberRef.current = 1;
    foundNumbersRef.current = [];
    syncToUI();
  }, [syncToUI]);

  // === ZERO-LATENCY CELL CLICK ===
  const handleCellClick = useCallback((num, e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);

    if (gameStateRef.current !== 'playing' || isTimeUp) return;
    if (foundNumbersRef.current.includes(num)) return;

    totalClicksRef.current += 1;

    if (num === currentNumberRef.current) {
      // CORRECT CLICK
      if (audioSynth) audioSynth.playPop();
      correctClicksRef.current += 1;
      foundNumbersRef.current.push(num);
      currentNumberRef.current += 1;

      const totalCells = gridSizeRef.current * gridSizeRef.current;
      
      // GRID COMPLETION LOGIC
      if (foundNumbersRef.current.length === totalCells) {
        if (audioSynth) audioSynth.playLevelUp();
        
        // Exact custom score logic: +20 Score
        scoreRef.current += 20;
        if (engineRef.current && typeof engineRef.current.setScore === 'function') {
          engineRef.current.setScore(scoreRef.current);
        }
        
        // Add +10 seconds (Max 60)
        localTimeRef.current = Math.min(60.0, localTimeRef.current + 10.0);
        setLocalTimeRemaining(localTimeRef.current);
        
        updateDifficulty();
        
        triggerFeedback(`Grid Cleared! +20 PTS | +10s Time`, 'success');
        generateNewGrid(gridSizeRef.current);
      } else {
        syncToUI();
      }

    } else {
      // WRONG CLICK (Mistake Penalty)
      if (audioSynth) audioSynth.playBuzz();
      penaltyCountRef.current += 1;
      
      // Exact custom penalty logic: no score penalty, -2s time
      localTimeRef.current -= 2.0;
      
      updateDifficulty();
      
      triggerFeedback(`Mistake! -2s`, 'error');

      if (localTimeRef.current <= 0) {
        localTimeRef.current = 0;
        setLocalTimeRemaining(0);
        setIsTimeUp(true);
        if (engineRef.current?.endGame) engineRef.current.endGame();
      } else {
        setLocalTimeRemaining(localTimeRef.current);
      }
      syncToUI();
    }
  }, [generateNewGrid, triggerFeedback, syncToUI, isTimeUp, updateDifficulty]);

  // Start sequence resets
  useEffect(() => {
    if (engine.gameState !== 'playing') return;
    
    scoreRef.current = 0;
    levelRef.current = 1;
    gridSizeRef.current = 3; 
    totalClicksRef.current = 0;
    correctClicksRef.current = 0;
    penaltyCountRef.current = 0;
    
    generateNewGrid(3);
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });
    
  }, [engine.gameState, generateNewGrid]);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  const accuracy = totalClicks > 0 ? Math.round((correctClicks / totalClicks) * 100) : 100;

  // Calculate grade based on score and accuracy
  let gradeLetter = 'F';
  if (accuracy >= 90 && currentScore >= 80) gradeLetter = 'S';
  else if (accuracy >= 80 && currentScore >= 60) gradeLetter = 'A';
  else if (accuracy >= 70 && currentScore >= 40) gradeLetter = 'B';
  else if (accuracy >= 60 && currentScore >= 20) gradeLetter = 'C';
  else if (accuracy >= 45 && currentScore >= 20) gradeLetter = 'D';

  let rankName = 'Bronze';
  let rankColor = 'text-slate-500';
  if (currentScore >= 160 && accuracy >= 90) {
    rankName = 'Grandmaster';
    rankColor = 'text-fuchsia-400 font-extrabold';
  } else if (currentScore >= 120 && accuracy >= 82) {
    rankName = 'Master';
    rankColor = 'text-red-400 font-extrabold';
  } else if (currentScore >= 80 && accuracy >= 75) {
    rankName = 'Diamond';
    rankColor = 'text-cyan-400 font-extrabold';
  } else if (currentScore >= 60 && accuracy >= 65) {
    rankName = 'Platinum';
    rankColor = 'text-indigo-400 font-extrabold';
  } else if (currentScore >= 40 && accuracy >= 55) {
    rankName = 'Gold';
    rankColor = 'text-yellow-400 font-extrabold';
  } else if (currentScore >= 20) {
    rankName = 'Silver';
    rankColor = 'text-gray-300 font-extrabold';
  }

  let diagnostics = "Superb visual search efficiency! Your eyes processed the grid matrix numbers systematically without getting overwhelmed by the visual noise.";
  if (accuracy < 60) {
    diagnostics = "High search error rate. Ensure you click the correct next sequential number. Speed up your search before you commit to click.";
  } else if (penaltyCount > 3) {
    diagnostics = "Impulsive motor actions detected. Take a split second to scan and confirm number orientation before clicking.";
  } else if (currentScore < 40) {
    diagnostics = "Visual scanning delay. Try using systemic saccadic eye movements (e.g. scanning rows/cols or spiral outward) to find numbers faster.";
  }
  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracy;

  return (
    <div className="min-h-screen select-none bg-[#050505] text-white selection:bg-transparent font-sans" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/cognitive" className="text-gray-500 hover:text-gray-300 transition-colors">Cognitive</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-gray-500 hover:text-gray-300 transition-colors">Focus</li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-cyan-400 font-medium">Concentration Grid</li>
            </ol>
          </nav>
        )}
        
        {/* Header */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Grid className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Concentration Grid</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Find numbers 1→N in sequence • Adaptive Time Challenge</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
 
              {engine.gameState === 'playing' && !isTimeUp && (
                <button onClick={handleStartGame} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset">
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

        {showNameInput && !isFullscreen && (
          <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-900 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <input type="text" value={playerNameInput} onChange={e => setPlayerNameInput(e.target.value)} placeholder="Enter your display name" maxLength={20}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                onKeyDown={e => e.key === 'Enter' && savePlayerName()} />
              <button onClick={savePlayerName} className="px-5 py-2.5 bg-cyan-600 text-white rounded-lg text-sm font-semibold hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-600/20">Save</button>
            </div>
          </div>
        )}

        {/* Dynamic HUD */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-cyan-400" />} value={currentScore} label="Score" />
          <StatCard icon={<Award className="text-blue-400" />} value={`Lv.${currentLevel}`} label="Level" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
          <StatCard icon={<Grid className="text-indigo-400" />} value={`${gridSize}x${gridSize}`} label="Matrix" />
          <StatCard icon={<Crosshair className="text-purple-400" />} value={`${accuracy}%`} label="Acc" />
          <StatCard icon={<XCircle className="text-red-400" />} value={penaltyCount} label="Errors" />
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

        {/* Game Container: Adaptive Scale */}
        <div ref={gameContainerRef} 
          onContextMenu={(e) => { if(engine.gameState === 'playing' && !isTimeUp) e.preventDefault(); }}
          className={`relative overflow-hidden w-full flex flex-col items-center justify-center transition-all duration-100 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-[#050505]' 
              : 'rounded-2xl border border-gray-700 bg-[#050505] shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[70vh] md:min-h-[500px] md:aspect-video'
          }`}
          style={{ 
            touchAction: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto', 
            overscrollBehavior: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto'
          }}>
          
          {/* Time Progress Bar */}
          {engine.gameState === 'playing' && !isTimeUp && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
              <div 
                className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`}
                style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
              />
            </div>
          )}

          {isFullscreen && engine.gameState === 'playing' && !isTimeUp && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-[60] flex gap-2">
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); handleStartGame(); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setSoundEnabled(v => !v); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            </div>
          )}

          {/* Persistent Next Number HUD */}
          {engine.gameState === 'playing' && !isTimeUp && (
            <div className="absolute top-6 left-6 z-[60] pointer-events-none">
              <div className="bg-black/60 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-md flex flex-col items-center shadow-lg">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Find Next</span>
                <span className="text-4xl font-black text-cyan-400 leading-none">{currentNumber}</span>
              </div>
            </div>
          )}

          {/* GAMEPLAY AREA */}
          {engine.gameState === 'playing' && !isTimeUp && (
            <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
              <div 
                className="grid gap-1.5 sm:gap-3 mx-auto max-h-full max-w-full"
                style={{ 
                  gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                  width: 'min(90vh, 90vw)',
                  height: 'min(90vh, 90vw)',
                  aspectRatio: '1/1'
                }}
              >
                {gridData.map((num) => {
                  const isFound = foundNumbers.includes(num);
                  return (
                    <button
                      key={num}
                      onPointerDown={(e) => handleCellClick(num, e)}
                      disabled={isFound}
                      className={`
                        w-full h-full rounded-lg sm:rounded-xl font-black transition-all duration-100 flex items-center justify-center touch-none
                        ${isFound 
                          ? 'bg-green-500/20 text-green-500 border border-green-500/30 scale-95 opacity-50 cursor-default' 
                          : 'bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 hover:scale-105 active:scale-95 shadow-md cursor-pointer'}
                      `}
                      style={{
                        fontSize: `clamp(1rem, ${40 / gridSize}vw, ${100 / gridSize}px)`
                      }}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* START SCREEN */}
          {engine.gameState === 'start' && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
              <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                {!isMobileLandscape && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)] rotate-3">
                    <Grid className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                )}
                <h2 className="text-xl sm:text-3xl font-black mb-2 tracking-tight">Concentration Grid</h2>
                <p className="text-sm sm:text-base mb-8 text-gray-400 leading-relaxed pointer-events-none">Find the numbers in exact sequential order (1, 2, 3...) to clear the matrices and survive.</p>
                
                <button onPointerDown={e => e.stopPropagation()} onClick={handleStartGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Play className="w-5 h-5 fill-white" /> START DRILL
                </button>
              </div>
            </div>
          )}

          {/* END SCREEN */}
          {(engine.gameState === 'ended' || isTimeUp) && (
            <div className="absolute inset-0 bg-[#05070e]/98 overflow-y-auto p-6 z-[70] select-none scrollbar-thin scroll-smooth backdrop-blur-sm" onPointerDown={e => e.stopPropagation()}>
              <div className="min-h-full flex flex-col justify-center items-center py-4 w-full">
                <div className="max-w-md w-full text-center">
                  {currentScore > 0 && currentScore >= bestScore && (
                    <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce font-mono">
                      ⭐ NEW PERSONAL BEST!
                    </div>
                  )}
                  
                  <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1 font-mono">
                    Drill Complete
                  </h2>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-mono">
                    Peak difficulty reached: Level {currentLevel} • Matrix Size: {gridSize}x{gridSize}
                  </p>

                  <div className="grid grid-cols-3 gap-2.5 mb-6 text-left font-mono">
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                      <span className="text-sm font-black text-white">{currentScore} <span className="text-[8px] text-slate-400 font-normal">PTS</span></span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Accuracy</span>
                      <span className="text-sm font-black text-white">{accuracy}%</span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Best Score</span>
                      <span className="text-sm font-black text-yellow-400">{bestScore}</span>
                    </div>
                    
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Correct Clicks</span>
                      <span className="text-sm font-black text-emerald-400">{correctClicks}</span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Errors</span>
                      <span className="text-sm font-black text-red-400">{penaltyCount}</span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Peak Size</span>
                      <span className="text-sm font-black text-purple-400">{gridSize}x{gridSize}</span>
                    </div>
                  </div>

                  <div className="bg-[#0b0f19] border border-slate-850 p-3 rounded-xl mb-4 text-left">
                    <span className={`text-xs font-black block text-center uppercase tracking-widest ${rankColor} mb-2`}>
                      Rank: {rankName}
                    </span>
                    <div className="w-full h-px bg-slate-850 mb-2"></div>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-white uppercase mb-1 font-mono">
                      <Sparkles className="w-3 h-3 text-yellow-500" /> Diagnostics advice:
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      {diagnostics}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <PlayAgainButton onClick={handleStartGame} colorTheme="blue" />
                    <button
                      onClick={shareScore}
                      className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors active:scale-95"
                      title="Share Score"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    {isFullscreen && (
                      <button
                        onClick={handleExit}
                        className="p-3 bg-red-900/30 border border-red-900/55 hover:bg-red-900/50 text-red-400 rounded-xl transition-colors active:scale-95 flex items-center justify-center"
                        title="Exit Drill"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* DRILL RULES & SCORING */}
        {/* ============================================================ */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-cyan-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="blue" text="Find Sequence" highlight="Tap 1, 2, 3..." result="Progress Grid" />
                  <RuleItem color="green" text="Clear Grid" highlight="+20 PTS | +10s" result="Increases Difficulty" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="red" text="Wrong Tap" highlight="No PTS Penalty | -2s" result="Reduces Timer" />
                  <RuleItem color="purple" text="Time Limit Capped" highlight="Max 60 Seconds" result="Endless Survival" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* ABOUT THIS DRILL */}
        {/* ============================================================ */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Concentration Grid</h2>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  Based on the clinically proven Schulte Table exercises, this cognitive drill forces your brain to systematically filter visual noise. Finding sequential numbers in an aggressively expanding, randomized matrix heavily taxes your working memory, broadens your peripheral vision field, and vastly improves your visual scanning speed.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Students seeking to eliminate test-fatigue, professionals needing to extract data from dense spreadsheets quickly, and tactical gamers improving radar awareness.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Sustained focus, visual tracking, selective attention, spatial awareness, and rapid target filtering under immense time pressure.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score, accuracy percentage, maximum grid dimensions reached (up to 8x8), and total errors committed.</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Peripheral Anchoring:</strong> Do not read the grid left-to-right like a book. Softly focus your eyes in the center of the grid and force your peripheral vision to detect the shapes of the numbers.</li>
                    <li><strong className="text-gray-200">Parallel Processing:</strong> While your finger/cursor is moving to click the current number, your eyes should already be scanning the board for the next number in the sequence.</li>
                    <li><strong className="text-gray-200">Economy:</strong> You are actively rewarded (+10s and +20 points) for clearing grids. While wrong answers do not deduct points, they still drain time (-2s) from your clock. Keep scoring to extend your play session.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Why am I losing time rapidly?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Incorrect taps result in a 2-second time penalty. While wrong answers do not deduct points, they reduce your remaining time. Prioritize accuracy alongside speed to survive.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">What is the maximum grid size?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">The engine tracks your score. Every 50 points you earn increases your difficulty Level, scaling the matrix size up from 3x3 to a maximum of 8x8 (64 items). Your Level is protected even if you make mistakes.</p>
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
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-cyan-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Free Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/cognitive/attention/selective-attention" title="Selective Attention" desc="Focus on specific targets while ignoring noise." color="blue" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/concentration-stamina" title="Concentration Stamina" desc="Sustain focus through dynamic rule switching." color="cyan" icon={<Timer className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/visual-recognition/visual-search" title="Visual Search" desc="Locate hidden anomalies in complex visual fields." color="purple" icon={<Search className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/processing-speed/reaction-time" title="Reaction Time" desc="Test absolute visual processing speed bounds." color="orange" icon={<Zap className="w-4 h-4" />} />
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
                    <li><Link href="/drills/fps" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors mt-2 block">All 21 FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">Cognitive</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Divided Attention</Link></li>
                    <li><Link href="/drills/cognitive" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors mt-2 block">All 16 Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">Academic</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li>
                    <li><Link href="/drills/academic" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors mt-2 block">All 12 Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">Visual & Motor</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li>
                    <li><Link href="/drills/visual" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors mt-2 block">All 14 Visual Drills →</Link></li>
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
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-600/20">
                    <Hash className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-black text-xl tracking-tight">SkillDrills</span>
                </div>
                <p className="text-sm mb-3 font-medium">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-8 text-gray-500">
                  Open-source telemetry training platform. Free forever. No downloads required. Train your processing speed and cognitive stamina.
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
        <div className={`text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-lg bg-[#050811] border ${border} ${txt} whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left`}>
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
    teal: 'from-teal-500 to-emerald-500',
    green: 'from-green-500 to-emerald-500'
  };
  
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:-translate-y-1 hover:border-gray-600">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-purple-500 to-indigo-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-black border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-cyan-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-cyan-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}