'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Grid3X3, CheckCircle2, RefreshCw,
  Crosshair, Dumbbell, Database, Keyboard, Star, Users,
  GraduationCap, Lightbulb, TrendingUp, Clock, ArrowRight,
  BookOpen, Brain, Code2, Hash, Calculator, Layers,
  RotateCcw, Move, Award, ChevronRight, Play, CheckCircle, XCircle, Share2, Sparkles, LogOut
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';
import PlayAgainButton from "../../../../../components/PlayAgainButton";

// ============================================================
// LEVEL & DIFFICULTY SYSTEM
// ============================================================
const MAX_LEVEL = 8; // Disks from 3 to 8

const getLevelDifficulty = (level) => {
  return { level: Math.max(1, Math.min(MAX_LEVEL, level)) };
};

// ============================================================
// LOCAL STORAGE
// ============================================================
const STORAGE_KEY = 'skilldrills_hanoi_v2';

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

  playSelect() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch(e) {}
  }

  playMove() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch(e) {}
  }

  playPenalty() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }

  playComplete() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1320, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch(e) {}
  }

  playPerfect() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(1046.5, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1568, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
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
export default function TowerOfHanoiClient() {
  
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
  const [towers, setTowers] = useState([[3,2,1], [], []]);
  const [selectedTower, setSelectedTower] = useState(null);
  
  const [currentLevel, setCurrentLevel] = useState(3); // Start at 3 disks
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [moves, setMoves] = useState(0);
  const [minimumMoves, setMinimumMoves] = useState(7);
  const [penalties, setPenalties] = useState(0);

  // === Custom Decoupled Timer (+10s Bonus Logic) ===
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // === Absolute Truth Refs ===
  const mountedRef = useRef(false);
  const gameContainerRef = useRef(null);
  
  const scoreRef = useRef(0);
  const levelRef = useRef(3);
  const movesRef = useRef(0);
  const penaltiesRef = useRef(0);
  const localTimeRef = useRef(60);

  const timerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const gameStateRef = useRef('start');
  const clickCooldownRef = useRef(false);
  const hasProcessedEndRef = useRef(false);

  // === Game Engine ===
  const engine = useGameEngine({
    category: 'cognitive',
    drillId: 'tower-of-hanoi',
    drillName: 'Tower of Hanoi',
    totalGameTime: 9999, // Custom timer handles the clock
    lives: 9999, 
    infiniteLives: true, 
    sharePath: 'drills/cognitive/problem-solving/tower-of-hanoi',
  });

  const engineRef = useRef(engine);

  useEffect(() => {
    engineRef.current = engine;
    gameStateRef.current = engine.gameState;
    if (engine.gameState === 'playing') {
      setIsNewBest(false);
    }
  }, [engine.gameState]);

  // Sync state for UI rendering
  const syncToUI = useCallback(() => {
    setScore(scoreRef.current);
    setCurrentLevel(levelRef.current);
    setMoves(movesRef.current);
    setPenalties(penaltiesRef.current);
  }, []);

  // === Custom Precision Timer ===
  useEffect(() => {
    if (engine.gameState !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }
    
    if (!isTimeUp && localTimeRef.current <= 0) {
      localTimeRef.current = 60;
      setLocalTimeRemaining(60);
    }

    timerIntervalRef.current = setInterval(() => {
      localTimeRef.current -= 1;
      setLocalTimeRemaining(localTimeRef.current);
      
      if (localTimeRef.current <= 0) {
        clearInterval(timerIntervalRef.current);
        setIsTimeUp(true); 
        if (typeof engineRef.current?.endGame === 'function') {
          engineRef.current.endGame();
        }
      }
    }, 1000);
    
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
    };
  }, []);

  // Fullscreen & Mobile Guard
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsHandler);
    
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) && window.screen && Math.max(window.screen.width, window.screen.height) < 1024;
      if (!isMobile) { setShowRotateWarning(false); return; }
      
      // Strongly trigger rotation warning on mobile if height > width
      setShowRotateWarning(window.innerHeight > window.innerWidth);
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
    if ((engine.gameState !== 'ended' && !isTimeUp) || hasProcessedEndRef.current) return;
    hasProcessedEndRef.current = true;

    if (document.fullscreenElement) {
      try { document.exitFullscreen(); } catch (e) {}
    }
    const finalScore = scoreRef.current;
    if (finalScore > bestScore && finalScore > 0) {
      setIsNewBest(true);
      setBestScore(finalScore);
      saveData({ bestScore: finalScore });
    }
  }, [engine.gameState, isTimeUp, bestScore]);

  // === UI Handlers ===
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

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 600);
  }, []);

  // === HANOI CORE LOGIC ===
  const calculateMinimumMoves = useCallback((disks) => Math.pow(2, disks) - 1, []);

  const initializeGame = useCallback((diskCount) => { 
    const nt = [[], [], []]; 
    for (let i = diskCount; i > 0; i--) nt[0].push(i); 
    setTowers(nt); 
    setSelectedTower(null); 
    movesRef.current = 0;
    setMoves(0); 
    setMinimumMoves(calculateMinimumMoves(diskCount)); 
  }, [calculateMinimumMoves]);

  const advanceToNextLevel = useCallback(() => { 
    if (levelRef.current < MAX_LEVEL) { 
      levelRef.current += 1; 
      initializeGame(levelRef.current); 
      triggerFeedback(`Level Up! ${levelRef.current} Disks`, 'success'); 
      if (audioSynth) audioSynth.playComplete(); 
    } 
    syncToUI();
  }, [initializeGame, triggerFeedback, syncToUI]);

  const checkGameComplete = useCallback((currentTowers, currentMoves) => { 
    if (currentTowers[2].length === levelRef.current) { 
      
      scoreRef.current += 20; 
      localTimeRef.current += 10; // The +10s Bonus
      setLocalTimeRemaining(localTimeRef.current);

      if (currentMoves === minimumMoves) { 
        if (audioSynth) audioSynth.playPerfect(); 
        triggerFeedback('Perfect Solve! +20 PTS | +10s', 'success'); 
      } else { 
        if (audioSynth) audioSynth.playComplete(); 
        triggerFeedback('Level Complete! +20 PTS | +10s', 'success'); 
      } 
      
      syncToUI();

      // Pause briefly before loading next tower
      setTimeout(() => { advanceToNextLevel(); }, 1500); 
    } 
  }, [minimumMoves, advanceToNextLevel, triggerFeedback, syncToUI]);

  // ZERO-LATENCY TOWER CLICK
  const handleTowerClick = useCallback((towerIndex, e) => { 
    e.stopPropagation();
    e.preventDefault();
    if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);

    if (gameStateRef.current !== 'playing' || isTimeUp) return; 
    if (clickCooldownRef.current) return; 
    clickCooldownRef.current = true; 
    
    // Select a tower
    if (selectedTower === null) { 
      if (towers[towerIndex].length > 0) { 
        setSelectedTower(towerIndex); 
        if (audioSynth) audioSynth.playSelect(); 
      } 
      setTimeout(() => { clickCooldownRef.current = false; }, 50); 
      return; 
    } 
    
    const ft = selectedTower; 
    const tt = towerIndex; 
    
    // Deselect if clicking same tower
    if (ft === tt) { 
      setSelectedTower(null); 
      setTimeout(() => { clickCooldownRef.current = false; }, 50); 
      return; 
    } 
    
    const fd = towers[ft][towers[ft].length - 1]; 
    const td = towers[tt][towers[tt].length - 1]; 
    
    // VALID MOVE
    if (fd && (!td || fd < td)) { 
      const nt = towers.map(t => [...t]); 
      const d = nt[ft].pop(); 
      nt[tt].push(d); 
      setTowers(nt); 
      
      movesRef.current += 1;
      setSelectedTower(null); 
      
      if (audioSynth) audioSynth.playMove(); 
      checkGameComplete(nt, movesRef.current); 
      syncToUI();
    } else { 
      // INVALID MOVE PENALTY (No PTS Penalty | -2 Seconds)
      penaltiesRef.current += 1;
      
      // Apply the time penalty, ensuring it doesn't go below 0
      localTimeRef.current = Math.max(0, localTimeRef.current - 2);
      setLocalTimeRemaining(localTimeRef.current);

      // If penalty brings time to 0, trigger endgame
      if (localTimeRef.current <= 0) {
         setIsTimeUp(true);
         if (typeof engineRef.current?.endGame === 'function') engineRef.current.endGame();
      }
      
      setSelectedTower(null); 
      if (audioSynth) audioSynth.playPenalty(); 
      triggerFeedback('Invalid Move! -2s', 'error'); 
      syncToUI();
    } 
    
    setTimeout(() => { clickCooldownRef.current = false; }, 50); 
  }, [selectedTower, towers, isTimeUp, checkGameComplete, triggerFeedback, syncToUI]);

  const handleStartGame = useCallback(() => {
    if (audioSynth) audioSynth.init(); 
    setIsTimeUp(false);
    hasProcessedEndRef.current = false;
    localTimeRef.current = 60;
    setLocalTimeRemaining(60);
    
    scoreRef.current = 0;
    levelRef.current = 3; // Starts at 3 disks
    movesRef.current = 0;
    penaltiesRef.current = 0;
    
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });
    
    initializeGame(3); 
    syncToUI();
    
    engineRef.current.startGame();
    
    try {
      if (gameContainerRef.current && !document.fullscreenElement) {
        gameContainerRef.current.requestFullscreen().catch(() => {});
      }
    } catch (err) {}
  }, [initializeGame, syncToUI]);

  const resetLevel = useCallback(() => { 
    initializeGame(levelRef.current); 
    triggerFeedback('Level Reset', 'success'); 
  }, [initializeGame, triggerFeedback]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/cognitive/problem-solving/tower-of-hanoi';
    if (navigator.share) {
      navigator.share({ title: 'Tower of Hanoi Speed Drill', text: 'Free progressive Hanoi drill! Can you beat my score?', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  const shareScore = useCallback(() => {
    const finalAccuracy = moves + penalties > 0 ? Math.round((moves / (moves + penalties)) * 100) : 100;
    
    let finalRank = 'Bronze';
    if (scoreRef.current >= 150 && finalAccuracy >= 90) finalRank = 'Grandmaster';
    else if (scoreRef.current >= 100 && finalAccuracy >= 82) finalRank = 'Master';
    else if (scoreRef.current >= 60 && finalAccuracy >= 75) finalRank = 'Diamond';
    else if (scoreRef.current >= 40 && finalAccuracy >= 65) finalRank = 'Platinum';
    else if (scoreRef.current >= 20 && finalAccuracy >= 55) finalRank = 'Gold';
    else if (scoreRef.current >= 10) finalRank = 'Silver';

    const text = `🧠 I scored ${scoreRef.current} PTS with ${finalAccuracy}% accuracy on the Tower of Hanoi Speed-Logic Drill! Solved with ${currentLevel} disks. Rank: ${finalRank}. Try it here: https://skilldrills.online/drills/cognitive/problem-solving/tower-of-hanoi`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'My SkillDrills Cognitive Score',
        text: text,
        url: 'https://skilldrills.online/drills/cognitive/problem-solving/tower-of-hanoi'
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [currentLevel, moves, penalties]);

  const getDiskColor = useCallback((ds) => { 
    const c = ['bg-red-500','bg-orange-500','bg-yellow-500','bg-green-500','bg-blue-500','bg-indigo-500','bg-purple-500','bg-pink-500']; 
    return c[(ds - 1) % c.length]; 
  }, []);
  
  const getDiskWidth = useCallback((ds, md) => { 
    const mw = 140; const miw = 40; 
    return `${miw + ((ds - 1) / (md - 1)) * (mw - miw)}px`; 
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(245,158,11,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Towers...</p>
        </div>
      </div>
    );
  }

  const accuracy = moves + penalties > 0 
    ? Math.round((moves / (moves + penalties)) * 100) 
    : 100;

  // Calculate grade based on score and accuracy
  let gradeLetter = 'F';
  if (accuracy >= 85 && score >= 100) gradeLetter = 'S';
  else if (accuracy >= 75 && score >= 60) gradeLetter = 'A';
  else if (accuracy >= 65 && score >= 40) gradeLetter = 'B';
  else if (accuracy >= 55 && score >= 20) gradeLetter = 'C';
  else if (accuracy >= 45 && score >= 10) gradeLetter = 'D';

  let rankName = 'Bronze';
  let rankColor = 'text-slate-500';
  if (score >= 150 && accuracy >= 90) {
    rankName = 'Grandmaster';
    rankColor = 'text-fuchsia-400 font-extrabold';
  } else if (score >= 100 && accuracy >= 82) {
    rankName = 'Master';
    rankColor = 'text-red-400 font-extrabold';
  } else if (score >= 60 && accuracy >= 75) {
    rankName = 'Diamond';
    rankColor = 'text-cyan-400 font-extrabold';
  } else if (score >= 40 && accuracy >= 65) {
    rankName = 'Platinum';
    rankColor = 'text-indigo-400 font-extrabold';
  } else if (score >= 20 && accuracy >= 55) {
    rankName = 'Gold';
    rankColor = 'text-yellow-400 font-extrabold';
  } else if (score >= 10) {
    rankName = 'Silver';
    rankColor = 'text-gray-300 font-extrabold';
  }

  let diagnostics = "Phenomenal recursive thinking! Your brain solves the sub-problems of moving smaller disk piles effortlessly, planning moves in advance.";
  if (penalties > 4) {
    diagnostics = "High rate of invalid disk movements. Take a brief moment to trace the relative sizes of target and source disk configurations.";
  } else if (accuracy < 60) {
    diagnostics = "Slips in sequential logic detected. Maintain focus on the minimum move target to train optimal recursive pathways.";
  } else if (score < 40) {
    diagnostics = "To improve your score, focus on resolving the 3 and 4 disk levels with minimal moves to bank time extensions.";
  }
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
            <li className="text-gray-500">Problem Solving</li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-amber-400 font-medium">Tower of Hanoi</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <Layers className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tower of Hanoi</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Precision Time-Attack • +10s per solve</p>
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
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                onKeyDown={e => e.key === 'Enter' && savePlayerName()} />
              <button onClick={savePlayerName} className="px-5 py-2.5 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-500 transition-colors shadow-lg shadow-amber-600/20">Save</button>
            </div>
          </div>
        )}

        {/* Optimized Responsive Stats Board */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-2 w-full">
          <StatCard icon={<Target className="text-amber-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining} label="Time" unit="s" />
          <StatCard icon={<Layers className="text-blue-400" />} value={currentLevel} label="Disks" />
          <StatCard icon={<Move className="text-purple-400" />} value={`${moves}/${minimumMoves}`} label="Moves" />
          <StatCard icon={<XCircle className="text-red-400" />} value={penalties} label="Mistakes" />
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

        {/* Game Container */}
        <div ref={gameContainerRef} 
          onContextMenu={(e) => { if(engine.gameState === 'playing' && !isTimeUp) e.preventDefault(); }}
          className={`relative flex flex-col items-center justify-center overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'rounded-2xl border border-gray-700 bg-[#0a0a0a] shadow-[0_0_40px_rgba(0,0,0,0.5)]'}`}
          style={{ 
            aspectRatio: isFullscreen ? 'auto' : '16/9', 
            maxWidth: '100%', 
            margin: '0 auto',
            touchAction: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto', 
            overscrollBehavior: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto'
          }}>
          
          {/* Time Progress Bar */}
          {engine.gameState === 'playing' && !isTimeUp && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`}
                style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
              />
            </div>
          )}

          {/* Portrait Rotation Warning Override */}
          {showRotateWarning && (
            <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 touch-none">
              <div className="animate-bounce mb-6 text-amber-500">
                <svg className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Rotate Device</h3>
              <p className="text-gray-400 mb-8 max-w-xs mx-auto">This drill requires a landscape view to play effectively.</p>
            </div>
          )}

          {isFullscreen && engine.gameState === 'playing' && !isTimeUp && !showRotateWarning && (
            <div className="absolute top-4 right-4 z-[60] flex gap-2">
              <button onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* Phase 2: Game Area */}
          {engine.gameState === 'playing' && !isTimeUp && !showRotateWarning && (
            <div className="w-full flex flex-col items-center">
              <div className="flex w-full justify-around items-end px-4 sm:px-12 mt-10">
                {[0, 1, 2].map((ti) => (
                  <button 
                    key={ti} 
                    onPointerDown={(e) => handleTowerClick(ti, e)} 
                    className={`
                      flex flex-col items-center transition-all duration-100 touch-none rounded-lg p-2 sm:p-4 w-[30%]
                      ${selectedTower === ti ? 'bg-white/5 ring-2 ring-amber-400/50 scale-105 shadow-xl' : 'hover:bg-white/5'}
                    `} 
                    aria-label={`Tower ${ti + 1}`}
                  >
                    <div className="relative flex flex-col items-center w-full">
                      {/* Tower Pole */}
                      <div 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 rounded-t-full z-0 shadow-inner" 
                        style={{ height: `${currentLevel * 35 + 30}px`, background: 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)' }} 
                      />
                      {/* Disks */}
                      <div className="flex flex-col-reverse items-center relative z-10 w-full" style={{ minHeight: `${currentLevel * 35}px`}}>
                        {towers[ti].map((disk, di) => (
                          <div 
                            key={di} 
                            className={`${getDiskColor(disk)} rounded-lg mb-1 transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.5)] border border-white/20 flex items-center justify-center`} 
                            style={{ width: getDiskWidth(disk, currentLevel), height: '30px' }} 
                          >
                            <div className="w-2/3 h-1 bg-white/30 rounded-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Tower Base */}
                    <div className="w-[110%] h-4 rounded-full mt-1 shadow-lg border border-gray-600" style={{ background: 'linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)' }} />
                    <div className={`mt-4 text-xs sm:text-sm font-black tracking-widest uppercase ${selectedTower === ti ? 'text-amber-500' : 'text-gray-500'}`}>
                      Tower {ti + 1}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex justify-center mt-10">
                <button 
                  onClick={resetLevel} 
                  className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 bg-gray-800 text-gray-300 border border-gray-600 shadow-md hover:bg-gray-700"
                >
                  <RotateCcw className="w-5 h-5" /> Reset Tower
                </button>
              </div>
            </div>
          )}

          {/* Start Screen */}
          {engine.gameState === 'start' && !showRotateWarning && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90">
              <div className="rounded-3xl p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mx-auto flex items-center justify-center mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                  <Layers className="w-10 h-10 text-white -rotate-3" />
                </div>
                <h2 className="text-2xl font-black mb-2 pointer-events-none tracking-tight">Tower of Hanoi</h2>
                <p className="text-sm mb-6 text-gray-400 leading-relaxed pointer-events-none">Precision Time-Attack. Solve the puzzle correctly to bank time and points. Careless moves are heavily penalized.</p>
                
                <button 
                  onClick={handleStartGame}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-black text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  <Play className="w-5 h-5 fill-white" />
                  START DRILL
                </button>
              </div>
            </div>
          )}

          {/* Premium Custom End Screen */}
          {(engine.gameState === 'ended' || isTimeUp) && !showRotateWarning && (
            <div className="absolute inset-0 bg-[#05070e]/98 overflow-y-auto p-6 z-[70] select-none scrollbar-thin scroll-smooth backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto" onPointerDown={e => e.stopPropagation()}>
              <div className="min-h-full flex flex-col justify-center items-center py-4 w-full">
                <div className="max-w-md w-full text-center">
                  {score > 0 && score >= bestScore && (
                    <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce font-mono">
                      ⭐ NEW PERSONAL BEST!
                    </div>
                  )}
                  
                  <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1 font-mono">
                    Drill Complete
                  </h2>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-mono">
                    Max Level Reached: {currentLevel} Disks
                  </p>

                  <div className="grid grid-cols-3 gap-2.5 mb-6 text-left font-mono">
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                      <span className="text-sm font-black text-white">{score} <span className="text-[8px] text-slate-400 font-normal">PTS</span></span>
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
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold font-mono">Total Moves</span>
                      <span className="text-sm font-black text-emerald-400">{moves}</span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Penalties</span>
                      <span className="text-sm font-black text-red-400">{penalties}</span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Grade</span>
                      <span className="text-sm font-black text-pink-400">{gradeLetter}</span>
                    </div>
                  </div>

                  <div className="bg-[#0b0f19] border border-slate-850 p-3 rounded-xl mb-4 text-left">
                    <span className={`text-xs font-black block text-center uppercase tracking-widest ${rankColor} mb-2`}>
                      Rank: {rankName}
                    </span>
                    <div className="w-full h-px bg-slate-850 mb-2"></div>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-white uppercase mb-1 font-mono">
                      <Sparkles className="w-3 h-3 text-amber-500" /> Diagnostics advice:
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      {diagnostics}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <PlayAgainButton onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} colorTheme="orange" />
                    <button
                      onPointerDown={e => e.stopPropagation()}
                      onClick={shareScore}
                      className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors active:scale-95 flex items-center justify-center"
                      title="Share Score"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    {isFullscreen && (
                      <button
                        onPointerDown={e => e.stopPropagation()}
                        onClick={() => { if(engineRef.current) engineRef.current.endGame(); }}
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

        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-amber-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="blue" text="Move the entire tower to" highlight="Peg 3" result="Win Level" />
                  <RuleItem num="2" color="indigo" text="Complete a tower" result="+20 PTS & +10s Time" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Dropping large disk on small" result="No PTS Penalty & -2s Penalty" />
                  <RuleItem num="4" color="amber" text="Complete in minimum moves" result="Perfect Bonus" />
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
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About This Tower of Hanoi Drill</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This free Tower of Hanoi drill challenges your recursive problem-solving and strategic planning abilities under strict time constraints. Unlike standard versions, this is an aggressive Time-Attack mode. You are constantly fighting the clock, but completing towers awards you with massive score and time bonuses. Careless, invalid moves are heavily penalized.
                </p>
                
                {/* How to Play section replacing old Tips */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-white">How to Play</h3>
                  </div>
                  <ol className="text-sm leading-relaxed space-y-3 list-decimal pl-5 text-gray-400">
                    <li>Your objective is to move the entire stack of disks to the rightmost peg (Peg 3).</li>
                    <li>You can only move one disk at a time, taking the upper disk from one of the stacks and placing it on top of another.</li>
                    <li><strong>Core Rule:</strong> No disk may be placed on top of a smaller disk.</li>
                    <li>Complete the tower to advance to the next difficulty level (+20 Points, +10 Seconds).</li>
                    <li>Avoid invalid moves! Dropping a larger disk on a smaller one costs you -5 Points and takes away 2 Seconds.</li>
                  </ol>
                </div>

                {/* Newly added FAQs */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-300">What happens when time runs out?</h4>
                      <p className="text-xs text-gray-400 mt-1">The drill ends immediately. Your final score is calculated based on completed towers and points accumulated during your run.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-300">How many levels are there?</h4>
                      <p className="text-xs text-gray-400 mt-1">The drill currently supports up to 8 disks in height. The move requirement scales exponentially, meaning the final levels demand intense speed and memory.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-300">Why did I lose time suddenly?</h4>
                      <p className="text-xs text-gray-400 mt-1">Attempting an invalid move triggers an immediate 2-second time penalty along with a 5-point deduction. Careful planning is rewarded over reckless clicking.</p>
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
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-amber-500 to-orange-600"></div>
              <h2 className="text-xl font-bold text-white">Explore Related Free Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/cognitive/problem-solving/sudoku" title="Sudoku Speed-Logic" desc="Progressive grid puzzles for logical reasoning." color="blue" icon={<Grid3X3 className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/problem-solving/logic-puzzles" title="Logic Puzzles" desc="Solve deductive reasoning and pattern challenges." color="purple" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/focus/concentration-grid" title="Concentration Grid" desc="Find numbers in sequence under time pressure." color="cyan" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/math-speed/mental-math" title="Mental Math" desc="Advanced mental calculation speed tests." color="orange" icon={<Calculator className="w-4 h-4" />} />
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
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-600/20">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-black text-xl tracking-tight">SkillDrills</span>
                </div>
                <p className="text-sm mb-3 font-medium">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-8 text-gray-500">
                  Free online Tower of Hanoi cognitive drill. Train recursive algorithmic thinking and sequential problem-solving. No registration required.
                </p>
                
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <button onClick={shareDrillLink} className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Share this drill">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  </button>
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
    <div className="flex-1 min-w-[30%] sm:min-w-[15%] rounded-xl border border-gray-800 bg-gray-900 p-3 text-center flex flex-col justify-center h-full min-h-[80px] transition-all duration-300 hover:border-gray-600 shadow-md pointer-events-none">
      <div className="mb-1.5 flex justify-center opacity-90">{icon}</div>
      <p className="text-2xl sm:text-3xl font-black tracking-tighter truncate text-white">
        {value}<span className="text-sm font-bold ml-0.5 text-gray-500">{unit}</span>
      </p>
      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest truncate text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function RuleItem({ num, color, text, highlight = '', result }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    indigo: 'bg-indigo-600 text-indigo-300 border-indigo-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    amber: 'bg-amber-600 text-amber-300 border-amber-500',
    purple: 'bg-purple-600 text-purple-300 border-purple-500' 
  };
  const colors = colorMap[color] || 'bg-gray-600 text-gray-300 border-gray-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-gray-800 shadow-sm">
      <div className={`w-8 h-8 rounded-xl ${bg} border border-t-white/20 flex items-center justify-center text-white text-base font-black shadow-lg`}>{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-300">
          {text}{highlight && <span className={`font-black ${txt}`}> {highlight}</span>}
        </p>
        <div className={`text-xs font-black px-3 py-1.5 rounded-lg bg-gray-900 border ${border} ${txt} whitespace-nowrap shadow-inner tracking-wide`}>
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
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-blue-500 to-indigo-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-black border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-amber-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-amber-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}