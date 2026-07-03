'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Eye,
  BarChart3, Info, Grid3X3, CheckCircle2, RefreshCw,
  Crosshair, Users, Share2,
  GraduationCap, Lightbulb, TrendingUp, ArrowRight,
  ChevronRight, Play, XCircle
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';

// ============================================================
// LEVEL & DIFFICULTY SYSTEM
// ============================================================
const DIFFICULTY_LEVELS = [
  { level: 1, name: 'Normal', color: 'text-blue-500', emoji: '🎯', promoteThreshold: Infinity }
];

// ============================================================
// LOCAL STORAGE
// ============================================================
const STORAGE_KEY = 'skilldrills_sudoku_v2';

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
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  playCorrect() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
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
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
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
      osc.frequency.setValueAtTime(660, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(880, this.ctx.currentTime + 0.1);
      osc.frequency.linearRampToValueAtTime(1320, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
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
// MAIN COMPONENT
// ============================================================
export default function SudokuClient() {
  
  // === UI State ===
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game State ===
  const [gridSize, setGridSize] = useState(4);
  const [grid, setGrid] = useState([]);
  const [solution, setSolution] = useState([]);
  const [initialIndices, setInitialIndices] = useState(new Set());
  const [selectedCell, setSelectedCell] = useState(null);
  
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [completedGrids, setCompletedGrids] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);

  // === Custom Decoupled Timer ===
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // === Absolute Truth Refs (Zero-latency) ===
  const mountedRef = useRef(false);
  const gameContainerRef = useRef(null);
  
  const scoreRef = useRef(0);
  const gridSizeRef = useRef(4);
  const mistakesRef = useRef(0);
  const localTimeRef = useRef(60);

  const timerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const gameStateRef = useRef('start');
  const clickCooldownRef = useRef(false);
  const hasProcessedEndRef = useRef(false);

  // === Game Engine ===
  const engine = useGameEngine({
    category: 'cognitive',
    drillId: 'sudoku-speed',
    drillName: 'Sudoku Speed-Logic',
    totalGameTime: 9999, 
    lives: 9999, 
    infiniteLives: true, 
    sharePath: 'drills/cognitive/problem-solving/sudoku',
  });

  const engineRef = useRef(engine);

  useEffect(() => {
    engineRef.current = engine;
    gameStateRef.current = engine.gameState;
    if (engine.gameState === 'playing') {
      setIsNewBest(false);
    }
  }, [engine.gameState]);

  // === Custom Precision Timer ===
  useEffect(() => {
    if (engine.gameState !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }
    
    if (!isTimeUp && localTimeRef.current === 60 && localTimeRemaining === 60) {
      // Intentionally empty init logic
    } else if (!isTimeUp && localTimeRef.current <= 0) {
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
  }, [engine.gameState, isTimeUp, localTimeRemaining]);

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

  // Fullscreen Guard & Touch Restrictions
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsHandler);
    
    const preventZoom = (e) => { if (e.touches && e.touches.length > 1) e.preventDefault(); };
    document.addEventListener('touchmove', preventZoom, { passive: false });

    return () => {
      document.removeEventListener('fullscreenchange', fsHandler);
      document.removeEventListener('touchmove', preventZoom);
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
      if (!document.fullscreenElement && gameContainerRef.current) {
        await gameContainerRef.current.requestFullscreen();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {}
  }, []);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 800);
  }, []);

  // === SUDOKU ENGINE ===
  const isValid = useCallback((checkGrid, row, col, num, size) => { 
    for (let x = 0; x < size; x++) { if (checkGrid[row * size + x] === num) return false; } 
    for (let x = 0; x < size; x++) { if (checkGrid[x * size + col] === num) return false; } 
    if (size === 6) { 
      const br = Math.floor(row / 2); const bc = Math.floor(col / 3); 
      for (let i = 0; i < 2; i++) { 
        for (let j = 0; j < 3; j++) { if (checkGrid[(br * 2 + i) * size + (bc * 3 + j)] === num) return false; } 
      } 
    } else if (size === 5 || size === 7) { 
      return true; // Latin Square constraints
    } else { 
      const bs = Math.floor(Math.sqrt(size)); 
      for (let i = 0; i < bs; i++) { 
        for (let j = 0; j < bs; j++) { if (checkGrid[(Math.floor(row / bs) * bs + i) * size + (Math.floor(col / bs) * bs + j)] === num) return false; } 
      } 
    } 
    return true; 
  }, []);

  const solveSudoku = useCallback((gridToSolve, size) => { 
    const solve = (ga) => { 
      for (let i = 0; i < size * size; i++) { 
        if (ga[i] === null) { 
          const row = Math.floor(i / size); const col = i % size; 
          const nums = Array.from({ length: size }, (_, n) => n + 1); 
          for (let k = nums.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [nums[k], nums[j]] = [nums[j], nums[k]]; } 
          for (const num of nums) { 
            if (isValid(ga, row, col, num, size)) { ga[i] = num; if (solve(ga)) return true; ga[i] = null; } 
          } 
          return false; 
        } 
      } 
      return true; 
    }; 
    const gc = [...gridToSolve]; 
    solve(gc); 
    return gc; 
  }, [isValid]);

  const generateSudoku = useCallback((size) => { 
    const tc = size * size; 
    const eg = Array(tc).fill(null); 
    const solved = solveSudoku(eg, size); 
    const puzzle = [...solved]; 
    const initial = new Set(); 
    
    let ctk; 
    if (size === 4) ctk = 8; 
    else if (size === 5) ctk = 10; 
    else if (size === 6) ctk = 14; 
    else ctk = 18; 
    
    const indices = Array.from({ length: tc }, (_, i) => i).sort(() => Math.random() - 0.5); 
    for (let i = 0; i < tc; i++) { 
      if (i < ctk) { initial.add(indices[i]); } 
      else { puzzle[indices[i]] = null; } 
    } 
    
    setSolution(solved); 
    setGrid(puzzle); 
    setInitialIndices(initial); 
  }, [solveSudoku]);

  // === INPUT HANDLER (STRICT SCORING) ===
  const handleNumberInput = useCallback((num, e) => { 
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    if (selectedCell === null || gameStateRef.current !== 'playing' || isTimeUp) return; 
    if (clickCooldownRef.current) return; 
    clickCooldownRef.current = true; 
    
    const isCorrect = solution[selectedCell] === num; 
    
    if (isCorrect) { 
      const ng = [...grid]; 
      ng[selectedCell] = num; 
      setGrid(ng); 
      setTotalCorrect(prev => prev + 1); 
      if (audioSynth) audioSynth.playCorrect();
      setSelectedCell(null); 
      
      // GRID COMPLETION CHECK
      if (!ng.includes(null)) { 
        setCompletedGrids(prev => prev + 1); 
        
        scoreRef.current += 20; 
        setScore(scoreRef.current); 
        
        localTimeRef.current = Math.min(60, localTimeRef.current + 15);
        setLocalTimeRemaining(localTimeRef.current);

        if (audioSynth) audioSynth.playComplete(); 
        triggerFeedback(`Grid Cleared! +20 PTS | +15s`, 'success'); 
        
        if (gridSizeRef.current < 7) {
          gridSizeRef.current += 1;
          setGridSize(gridSizeRef.current);
        }
        
        setTimeout(() => generateSudoku(gridSizeRef.current), 150); 
      } 
    } else { 
      mistakesRef.current += 1;
      setMistakes(mistakesRef.current);
      
      scoreRef.current = Math.max(0, scoreRef.current - 2); 
      setScore(scoreRef.current); 

      localTimeRef.current -= 2;
      setLocalTimeRemaining(Math.max(0, localTimeRef.current));
      
      if (audioSynth) audioSynth.playPenalty(); 
      triggerFeedback('Mistake! -2 PTS | -2s', 'error'); 

      if (localTimeRef.current <= 0) {
        setIsTimeUp(true);
        if (engineRef.current?.endGame) engineRef.current.endGame();
      }
    } 
    
    setTimeout(() => { clickCooldownRef.current = false; }, 100); 
  }, [selectedCell, solution, grid, isTimeUp, generateSudoku, triggerFeedback]);

  const handleCellClick = useCallback((index, e) => { 
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (gameStateRef.current !== 'playing' || initialIndices.has(index)) return; 
    setSelectedCell(index); 
  }, [initialIndices]);

  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    
    try {
      if (gameContainerRef.current && !document.fullscreenElement) {
        await gameContainerRef.current.requestFullscreen();
      }
    } catch (err) {}

    setIsTimeUp(false);
    hasProcessedEndRef.current = false;
    localTimeRef.current = 60;
    setLocalTimeRemaining(60);
    
    scoreRef.current = 0;
    setScore(0);
    
    gridSizeRef.current = 4;
    setGridSize(4);
    
    mistakesRef.current = 0;
    setMistakes(0);
    
    setCompletedGrids(0);
    setTotalCorrect(0);
    setSelectedCell(null);
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });
    
    generateSudoku(4); 
    engineRef.current.startGame();
  }, [generateSudoku]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/cognitive/problem-solving/sudoku';
    if (navigator.share) {
      navigator.share({ title: 'Sudoku Speed-Logic Drill', text: 'Free progressive Sudoku drill! Can you beat my score?', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  const getGridLabel = useCallback(() => { if (gridSize === 4) return '4×4'; if (gridSize === 5) return '5×5'; if (gridSize === 6) return '6×6'; return '7×7'; }, [gridSize]);
  const getAvailableNumbers = useCallback(() => Array.from({ length: gridSize }, (_, i) => i + 1), [gridSize]);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  const accuracy = totalCorrect + mistakes > 0 
    ? Math.round((totalCorrect / (totalCorrect + mistakes)) * 100) 
    : 0;
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
            <li className="text-gray-500">Problem Solving</li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-blue-400 font-medium">Sudoku Speed-Logic</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Grid3X3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Sudoku Speed-Logic</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Progressive Grids • Endless Mode • Time Attack</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            
            {engine.gameState === 'playing' && !isTimeUp && (
              <button onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset">
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
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                onKeyDown={e => e.key === 'Enter' && savePlayerName()} />
              <button onClick={savePlayerName} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">Save</button>
            </div>
          </div>
        )}

        {/* Dynamic HUD */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-blue-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining} label="Time" unit="s" />
          <StatCard icon={<Grid3X3 className="text-cyan-400" />} value={getGridLabel()} label="Grid Size" />
          <StatCard icon={<CheckCircle2 className="text-emerald-400" />} value={completedGrids} label="Cleared" />
          <StatCard icon={<XCircle className="text-red-400" />} value={mistakes} label="Penalties" />
          <StatCard icon={<Trophy className="text-yellow-400" />} value={bestScore} label="Best Score" />
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
          onContextMenu={(e) => { if(engine.gameState === 'playing') e.preventDefault(); }}
          className={`relative overflow-hidden flex flex-col items-center justify-center bg-[#050505] transition-all duration-100 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-[100vw] h-[100dvh] rounded-none' 
              : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[500px]'
          }`}
          style={{ 
            aspectRatio: 'auto',
            margin: '0 auto',
            touchAction: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto', 
            overscrollBehavior: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto'
          }}>
          
          {/* Time Progress Bar */}
          {engine.gameState === 'playing' && !isTimeUp && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
              />
            </div>
          )}

          {/* In-Game Controls (Fullscreen) */}
          {isFullscreen && engine.gameState === 'playing' && !isTimeUp && (
            <div className="absolute top-4 right-4 z-[60] flex gap-2">
              <button onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* Phase 2: The Grid Area */}
          {engine.gameState === 'playing' && !isTimeUp && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 my-auto">
              <div 
                className="grid mx-auto"
                style={{ 
                  gap: gridSize >= 6 ? '4px' : '6px',
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                  width: isFullscreen ? 'min(90vw, 65dvh)' : 'min(90vw, 55vh)', 
                  height: isFullscreen ? 'min(90vw, 65dvh)' : 'min(90vw, 55vh)',
                }}
              >
                {grid.map((val, i) => { 
                  const isInitial = initialIndices.has(i); 
                  const isSelected = selectedCell === i; 
                  return (
                    <button 
                      key={i} 
                      onPointerDown={(e) => handleCellClick(i, e)} 
                      className={`
                        w-full h-full rounded-md sm:rounded-lg font-black transition-all flex items-center justify-center relative touch-none
                        text-base sm:text-xl md:text-2xl lg:text-3xl focus:outline-none
                        ${isInitial ? 'bg-gray-800 text-gray-500 cursor-default shadow-inner' : val !== null ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default' : 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600 cursor-pointer shadow-md'} 
                        ${isSelected ? 'ring-2 sm:ring-4 ring-blue-500 transform scale-105 z-10' : ''} 
                        active:scale-95
                      `} 
                    >
                      {val}
                      {isSelected && !isInitial && !val && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                        </div>
                      )}
                    </button>
                  ); 
                })}
              </div>

              {/* Number Input Bar */}
              <div className="mt-6 sm:mt-10 flex justify-center gap-1.5 sm:gap-2 flex-wrap max-w-lg w-full">
                {getAvailableNumbers().map(num => (
                  <button 
                    key={num} 
                    onPointerDown={(e) => handleNumberInput(num, e)} 
                    className={`
                      flex-1 py-2 sm:py-3 rounded-lg sm:rounded-xl text-lg sm:text-xl font-black transition-all touch-none
                      bg-gradient-to-br from-blue-600 to-cyan-600 border border-blue-400 text-white
                      hover:scale-105 active:scale-95 focus:outline-none shadow-lg shadow-blue-500/20 min-w-[40px] sm:min-w-[50px]
                    `}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* START SCREEN (Scrollable) */}
          {engine.gameState === 'start' && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto">
              <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto flex flex-col">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mx-auto flex items-center justify-center mb-8 rotate-3 shadow-[0_0_30px_rgba(59,130,246,0.3)] shrink-0">
                  <Grid3X3 className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black mb-2 tracking-tight">Sudoku Speed-Logic</h2>
                <p className="text-xs sm:text-sm mb-8 text-gray-400 leading-relaxed">Pure Endless Time-Attack mode. No lives, no combos. Only speed and accuracy matter.</p>
                
                <button 
                  onClick={handleStartGame}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)] shrink-0">
                  <Play className="w-5 h-5 fill-white" /> START DRILL
                </button>
              </div>
            </div>
          )}

          {/* END SCREEN (Scrollable) */}
          {(engine.gameState === 'ended' || isTimeUp) && (
            <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6">
              <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[95vh] overflow-y-auto my-auto">
                
                <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    {isNewBest && (
                      <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                        ⭐ New Personal Best
                      </div>
                    )}
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Time Expired</h2>
                    <p className="text-blue-400 font-medium text-sm">Sudoku Speed-Logic • {completedGrids} Clears</p>
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
                      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Matrix Size</div>
                      <div className="text-lg sm:text-xl font-black text-cyan-400">{gridSize}x{gridSize}</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Total Penalties</div>
                      <div className="text-lg sm:text-xl font-black text-red-400">{mistakes}</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 shrink-0 rounded-b-3xl">
                  <button onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} className="flex-1 py-3 sm:py-4 bg-blue-600 text-white rounded-xl font-black tracking-wide hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-sm sm:text-base">
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                  </button>
                  <button onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
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
                <Info className="w-5 h-5 text-blue-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Rules & High-Stakes Economy</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="blue" text="Tap empty cell" highlight="and input number" result="Zero Points" />
                  <RuleItem num="2" color="indigo" text="Complete the entire grid" result="+20 PTS & +15s Time" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Inputting a wrong number" result="-2 PTS & -2s Penalty" />
                  <RuleItem num="4" color="purple" text="Scale up to" highlight="7x7 Grids" result="Adaptive Difficulty" />
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
                <GraduationCap className="w-5 h-5 text-blue-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Sudoku Speed-Logic</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This cognitive drill is engineered to train <strong className="text-white font-semibold">rapid constraint satisfaction</strong> and <strong className="text-white font-semibold">logical deduction under pressure</strong>. Unlike standard slow-paced puzzles, this is an aggressive Time-Attack mode. You are constantly fighting the clock, but completing grids quickly awards you with crucial time extensions and mass score bonuses.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Puzzle enthusiasts, students improving mathematical deduction, and professionals seeking to combat mental fatigue through active problem solving.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Logical deduction, constraint pattern recognition, visual spatial filtering, and high-speed decision-making.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Difficulty Scaling</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">The drill dynamically adapts. As you clear matrices, the grid will progressively expand from a simple 4x4 up to a complex 7x7 board.</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play & Practice Effectively</h3>
                  </div>
                  <ol className="text-sm leading-relaxed space-y-3 list-decimal pl-5 text-gray-400">
                    <li><strong className="text-gray-200">Phase 1 (Analyze):</strong> Look for rows, columns, or sub-grids that are mostly filled. These constrained areas are your easiest targets.</li>
                    <li><strong className="text-gray-200">Phase 2 (Execute):</strong> Tap an empty cell on the grid, then immediately select the correct number from the input bar at the bottom.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> Clearing a full grid adds <span className="text-cyan-400 font-bold">+15 Seconds</span> and <span className="text-green-400 font-bold">+20 Points</span>. However, a single mistake instantly deducts <span className="text-red-400 font-bold">-2 Seconds and -2 Points</span>.</li>
                    <li><strong className="text-gray-200">Zero Guessing:</strong> Do not randomly guess numbers. The penalty system will destroy your score very quickly. Use strict logic.</li>
                  </ol>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-blue-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Is there a penalty for an incorrect tap?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Yes. A strict -2 point and -2 second penalty is applied immediately for every incorrect number placed. However, unlike standard endless modes, it does not end your game—you must keep fighting the clock to recover.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">How does the timer work?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">You start with exactly 60 seconds. The only way to survive and extend your run is by completely solving grids, which grants a +15 second time extension per completion.</p>
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
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600"></div>
              <h2 className="text-xl font-bold text-white">Explore Cognitive Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/cognitive/memory/card-matching" title="Card Matching" desc="Find hidden matching pairs under pressure." color="rose" icon={<Grid3X3 className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/selective-attention" title="Selective Attention" desc="Focus on relevant info while ignoring distractions." color="cyan" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/memory/memory-sequence" title="Memory Sequence" desc="Memorize progressive visual pattern sequences." color="purple" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/math-speed/mental-math" title="Mental Math Speed" desc="Calculate equations rapidly against the clock." color="blue" icon={<Zap className="w-4 h-4" />} />
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
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Grid3X3 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-black text-xl tracking-tight">SkillDrills</span>
                </div>
                <p className="text-sm mb-3 font-medium">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-8 text-gray-500">
                  Premium online cognitive training. Push your brain's processing speed, focus stamina, and deductive logic to the limit with hardcore, data-driven web drills.
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
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    indigo: 'bg-indigo-600 text-indigo-300 border-indigo-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    purple: 'bg-purple-600 text-purple-300 border-purple-500',
    green: 'bg-green-600 text-green-300 border-green-500'
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
    emerald: 'from-emerald-500 to-green-500',
    rose: 'from-rose-500 to-pink-500',
    teal: 'from-teal-500 to-emerald-500',
    indigo: 'from-indigo-500 to-blue-500',
    red: 'from-red-500 to-rose-500'
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
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-purple-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-purple-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}