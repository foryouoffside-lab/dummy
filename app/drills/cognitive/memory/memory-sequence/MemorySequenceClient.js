'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy,
  Volume2, VolumeX, Maximize2, Minimize2, Eye,
  BarChart3, Info, Grid, RefreshCw, LogOut,
  Crosshair, Star, Users, Share2, 
  GraduationCap, Lightbulb, TrendingUp, Clock, ArrowRight,
  Brain, Award, CheckCircle, XCircle,
  ChevronRight, Play, Activity, Grid3X3, RotateCcw, Sparkles
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';
import PlayAgainButton from "../../../../../components/PlayAgainButton";

// ============================================================
// LEVEL & DIFFICULTY SYSTEM
// ============================================================
const MAX_LEVEL = 20;

const getLevelConfig = (level) => {
  const configs = [
    { grid: 3, seq: 3, speed: 600 }, // Lv 1
    { grid: 3, seq: 4, speed: 550 }, // Lv 2
    { grid: 4, seq: 4, speed: 500 }, // Lv 3
    { grid: 4, seq: 5, speed: 450 }, // Lv 4
    { grid: 4, seq: 6, speed: 400 }, // Lv 5
    { grid: 5, seq: 5, speed: 400 }, // Lv 6
    { grid: 5, seq: 6, speed: 350 }, // Lv 7
    { grid: 5, seq: 7, speed: 350 }, // Lv 8
    { grid: 5, seq: 8, speed: 300 }, // Lv 9
    { grid: 5, seq: 9, speed: 250 }, // Lv 10+
  ];
  const idx = Math.min(level - 1, configs.length - 1);
  return configs[idx];
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

  playTone(index) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      
      const baseFreq = 220; 
      const step = 20; 
      osc.frequency.setValueAtTime(baseFreq + (index * step), this.ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      
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
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.15, this.ctx.currentTime);
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
export default function MemorySequenceClient() {
  
  // === UI State ===
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  // === Game Flow State ===
  const [localPhase, setLocalPhase] = useState('start'); // 'start', 'playing', 'ended'

  // === Game State ===
  const [currentLevel, setCurrentLevel] = useState(1);
  const [highestLevelReached, setHighestLevelReached] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  
  const [gridSize, setGridSize] = useState(3);
  const [sequenceLength, setSequenceLength] = useState(3);
  const [activeBlock, setActiveBlock] = useState(null);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [userSequence, setUserSequence] = useState([]); 
  
  const [sequencesCompleted, setSequencesCompleted] = useState(0);
  const [internalMistakes, setInternalMistakes] = useState(0); 
  const [flashColor, setFlashColor] = useState('blue'); 

  // === Custom Decoupled Timer ===
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);

  // === Absolute Truth Refs (Zero-latency) ===
  const mountedRef = useRef(false);
  const gameContainerRef = useRef(null);
  
  const scoreRef = useRef(0);
  const levelRef = useRef(1);
  const highestLevelRef = useRef(1);
  const mistakesRef = useRef(0);
  const localTimeRef = useRef(60);

  const activeSequenceRef = useRef([]);
  const playerInputIndexRef = useRef(0);
  
  const isPlayingRef = useRef(false);
  const isTimeUpRef = useRef(false);
  const isShowingRef = useRef(false);
  const hasProcessedEndRef = useRef(false);

  const sequencePlaybackTimerRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);

  // Sync state for UI rendering
  const syncToUI = useCallback(() => {
    setCurrentScore(scoreRef.current);
    setCurrentLevel(levelRef.current);
    setInternalMistakes(mistakesRef.current);
  }, []);

  // === Game Engine ===
  const engine = useGameEngine({
    category: 'cognitive',
    drillId: 'memory-sequence',
    drillName: 'Memory Sequence',
    totalGameTime: 9999, 
    lives: 9999, 
    infiniteLives: true, 
    sharePath: 'drills/cognitive/memory/memory-sequence',
  });
  const engineRef = useRef(engine);
  useEffect(() => { engineRef.current = engine; }, [engine]);

  // Audio Sync
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Load Best Score on Mount
  useEffect(() => {
    setIsClient(true);
    mountedRef.current = true;
    try {
      const savedScore = localStorage.getItem('skilldrills_memoryseq_bestScore');
      if (savedScore) setBestScore(parseInt(savedScore) || 0);
      const name = localStorage.getItem('skilldrills_player_name');
      if (name) setPlayerNameInput(name);
    } catch (e) {}
    setTimeout(() => { if (mountedRef.current) setLoading(false); }, 200);

    return () => {
      mountedRef.current = false;
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (sequencePlaybackTimerRef.current) clearTimeout(sequencePlaybackTimerRef.current);
    };
  }, []);

  // Fullscreen & Mobile Guard
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsHandler);

    const checkOrientationAndSize = () => {
      if (typeof window === 'undefined') return;
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsMobileLandscape(!isPortrait);
    };
    
    checkOrientationAndSize();
    window.addEventListener('resize', checkOrientationAndSize);
    window.addEventListener('orientationchange', checkOrientationAndSize);
    
    const preventSpace = (e) => { if (e.code === 'Space' && localPhase === 'playing') e.preventDefault(); };
    window.addEventListener('keydown', preventSpace);
    
    const preventZoom = (e) => { if (e.touches && e.touches.length > 1) e.preventDefault(); };
    document.addEventListener('touchmove', preventZoom, { passive: false });

    return () => {
      document.removeEventListener('fullscreenchange', fsHandler);
      window.removeEventListener('resize', checkOrientationAndSize);
      window.removeEventListener('orientationchange', checkOrientationAndSize);
      window.removeEventListener('keydown', preventSpace);
      document.removeEventListener('touchmove', preventZoom);
    };
  }, [localPhase]);

  // Game End Logic (Save Score)
  useEffect(() => {
    if (localPhase !== 'ended' || hasProcessedEndRef.current) return;
    hasProcessedEndRef.current = true;

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    const finalScore = scoreRef.current;
    if (finalScore > bestScore && finalScore > 0) {
      setIsNewBest(true);
      setBestScore(finalScore);
      try { localStorage.setItem('skilldrills_memoryseq_bestScore', finalScore.toString()); } catch (e) {}
    } else {
      setIsNewBest(false);
    }
    syncToUI();
  }, [localPhase, bestScore, syncToUI]);

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

  const handleExit = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(()=>{});
    }
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (sequencePlaybackTimerRef.current) clearTimeout(sequencePlaybackTimerRef.current);
    isPlayingRef.current = false;
    setLocalPhase('start');
  }, []);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 1200);
  }, []);

  // === CORE MECHANICS: Sequence Generation & Playback ===
  const generateSequence = useCallback((gridS, seqLen) => {
    const totalCells = gridS * gridS;
    const newSeq = [];
    for (let i = 0; i < seqLen; i++) {
      let nextBlock;
      do {
        nextBlock = Math.floor(Math.random() * totalCells);
      } while (i > 0 && nextBlock === newSeq[i - 1]); 
      newSeq.push(nextBlock);
    }
    return newSeq;
  }, []);

  const playSequence = useCallback(async (seq, speed) => {
    isShowingRef.current = true;
    setIsShowingSequence(true);
    setFlashColor('blue');
    
    // Pause before starting
    await new Promise(r => { sequencePlaybackTimerRef.current = setTimeout(r, 600); });
    
    for (let i = 0; i < seq.length; i++) {
      // Critical check to prevent sequence continuing after game over/restart
      if (!isPlayingRef.current || isTimeUpRef.current) {
        isShowingRef.current = false;
        return;
      }
      
      const blockIndex = seq[i];
      setActiveBlock(blockIndex);
      if (audioSynth) audioSynth.playTone(blockIndex);
      
      await new Promise(r => { sequencePlaybackTimerRef.current = setTimeout(r, speed); });
      
      setActiveBlock(null);
      
      await new Promise(r => { sequencePlaybackTimerRef.current = setTimeout(r, 150); });
    }
    
    if (isPlayingRef.current && !isTimeUpRef.current) {
      isShowingRef.current = false;
      setIsShowingSequence(false);
      playerInputIndexRef.current = 0; 
    }
  }, []);

  const startRound = useCallback((level) => {
    const config = getLevelConfig(level);
    setGridSize(config.grid);
    setSequenceLength(config.seq);
    
    const newSeq = generateSequence(config.grid, config.seq);
    activeSequenceRef.current = newSeq;
    
    playSequence(newSeq, config.speed);
  }, [generateSequence, playSequence]);

  // === DYNAMIC DIFFICULTY ===
  const updateDifficulty = useCallback(() => {
    const newLevel = Math.min(MAX_LEVEL, Math.floor(scoreRef.current / 30) + 1);
    levelRef.current = newLevel;
    setCurrentLevel(newLevel);
    highestLevelRef.current = Math.max(highestLevelRef.current, newLevel);
    setHighestLevelReached(highestLevelRef.current);
  }, []);

  // === ZERO-LATENCY USER INPUT ===
  const handleBlockClick = useCallback((index, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
      if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
    }

    if (!isPlayingRef.current || isTimeUpRef.current) return;
    if (isShowingRef.current) return; 

    const expectedIndex = activeSequenceRef.current[playerInputIndexRef.current];

    setActiveBlock(index);
    setTimeout(() => { if (mountedRef.current) setActiveBlock(null); }, 150);

    if (index === expectedIndex) {
      // CORRECT HIT
      if (audioSynth) audioSynth.playTone(index);
      playerInputIndexRef.current += 1;
      
      setUserSequence(prev => [...prev, index]); 

      // SEQUENCE CLEARED (+10 PTS | +5s | Diff UP)
      if (playerInputIndexRef.current === activeSequenceRef.current.length) {
        setFlashColor('green');
        if (audioSynth) audioSynth.playLevelUp();
        
        scoreRef.current += 10;
        setSequencesCompleted(prev => prev + 1);
        
        localTimeRef.current = Math.min(60, localTimeRef.current + 5); 
        setLocalTimeRemaining(localTimeRef.current);
        
        updateDifficulty();
        syncToUI();

        triggerFeedback('Perfect! +10 PTS | +5s', 'success');
        
        isShowingRef.current = true; 
        setIsShowingSequence(true);
        setTimeout(() => {
          if (mountedRef.current && isPlayingRef.current) {
            setUserSequence([]); 
            startRound(levelRef.current);
          }
        }, 800);
      }

    } else {
      // WRONG HIT (-3s)
      if (audioSynth) audioSynth.playBuzz();
      setFlashColor('red');
      mistakesRef.current += 1;
      
      localTimeRef.current -= 3;
      updateDifficulty();
      
      setLocalTimeRemaining(Math.max(0, localTimeRef.current));
      syncToUI();
      triggerFeedback(`Wrong! -3s`, 'error');

      if (localTimeRef.current <= 0) {
        isTimeUpRef.current = true;
        isPlayingRef.current = false;
        setLocalPhase('ended');
        if (engineRef.current?.endGame) engineRef.current.endGame();
      } else {
        isShowingRef.current = true;
        setIsShowingSequence(true);
        setTimeout(() => {
          if (mountedRef.current && isPlayingRef.current) {
            setUserSequence([]);
            startRound(levelRef.current); 
          }
        }, 800);
      }
    }
  }, [syncToUI, triggerFeedback, startRound, updateDifficulty]);

  const handleStartGame = useCallback(async () => {
    // 1. Audio init (requires synchronous user interaction)
    if (audioSynth) audioSynth.init(); 
    
    // 2. Fullscreen request (requires synchronous user interaction)
    try {
      if (gameContainerRef.current && !document.fullscreenElement) {
        await gameContainerRef.current.requestFullscreen();
      }
    } catch (err) {}

    // 3. State execution
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (sequencePlaybackTimerRef.current) clearTimeout(sequencePlaybackTimerRef.current);
    
    isPlayingRef.current = true;
    isTimeUpRef.current = false;
    hasProcessedEndRef.current = false;
    isShowingRef.current = false;
    
    setLocalPhase('playing');
    
    scoreRef.current = 0;
    levelRef.current = 1;
    highestLevelRef.current = 1;
    mistakesRef.current = 0;
    setSequencesCompleted(0);
    localTimeRef.current = 60;
    
    setLocalTimeRemaining(60);
    setCurrentLevel(1);
    setHighestLevelReached(1);
    syncToUI();
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });
    setUserSequence([]); 
    
    engineRef.current?.startGame();

    // Setup strictly managed timer directly bound to game lifecycle
    timerIntervalRef.current = setInterval(() => {
      if (!isPlayingRef.current) return;
      
      localTimeRef.current -= 1;
      setLocalTimeRemaining(localTimeRef.current);
      
      if (localTimeRef.current <= 0) {
        clearInterval(timerIntervalRef.current);
        isTimeUpRef.current = true;
        isPlayingRef.current = false;
        setLocalPhase('ended');
        if (typeof engineRef.current?.endGame === 'function') {
          engineRef.current.endGame();
        }
      }
    }, 1000);
    
    // Start grid sequence after a brief pause for fullscreen rendering
    setTimeout(() => startRound(1), 500);
  }, [syncToUI, startRound]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/cognitive/memory/memory-sequence';
    if (navigator.share) {
      navigator.share({ title: 'Memory Sequence Drill', text: 'Free spatial memory drill! Can you beat level 10?', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  const shareScore = useCallback(() => {
    const finalAccuracy = sequencesCompleted + internalMistakes > 0 
      ? Math.round((sequencesCompleted / (sequencesCompleted + internalMistakes)) * 100) 
      : 0;
    
    let finalRank = 'Bronze';
    if (scoreRef.current >= 150 && finalAccuracy >= 90) finalRank = 'Grandmaster';
    else if (scoreRef.current >= 110 && finalAccuracy >= 82) finalRank = 'Master';
    else if (scoreRef.current >= 80 && finalAccuracy >= 75) finalRank = 'Diamond';
    else if (scoreRef.current >= 50 && finalAccuracy >= 65) finalRank = 'Platinum';
    else if (scoreRef.current >= 30 && finalAccuracy >= 55) finalRank = 'Gold';
    else if (scoreRef.current >= 10) finalRank = 'Silver';

    const text = `🧠 I scored ${scoreRef.current} PTS with ${finalAccuracy}% accuracy on the Memory Sequence Spatial Recall Drill! Reached Level ${levelRef.current}. Rank: ${finalRank}. Try it here: https://skilldrills.online/drills/cognitive/memory/memory-sequence`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'My SkillDrills Cognitive Score',
        text: text,
        url: 'https://skilldrills.online/drills/cognitive/memory/memory-sequence'
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [sequencesCompleted, internalMistakes]);

  const accuracy = sequencesCompleted + internalMistakes > 0 
    ? Math.round((sequencesCompleted / (sequencesCompleted + internalMistakes)) * 100) 
    : 0;
  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracy;

  // Calculate grade based on score and accuracy
  let gradeLetter = 'F';
  if (accuracy >= 85 && currentScore >= 120) gradeLetter = 'S';
  else if (accuracy >= 75 && currentScore >= 80) gradeLetter = 'A';
  else if (accuracy >= 65 && currentScore >= 50) gradeLetter = 'B';
  else if (accuracy >= 55 && currentScore >= 30) gradeLetter = 'C';
  else if (accuracy >= 45 && currentScore >= 10) gradeLetter = 'D';

  let rankName = 'Bronze';
  let rankColor = 'text-slate-500';
  if (currentScore >= 150 && accuracy >= 90) {
    rankName = 'Grandmaster';
    rankColor = 'text-fuchsia-400 font-extrabold';
  } else if (currentScore >= 110 && accuracy >= 82) {
    rankName = 'Master';
    rankColor = 'text-red-400 font-extrabold';
  } else if (currentScore >= 80 && accuracy >= 75) {
    rankName = 'Diamond';
    rankColor = 'text-cyan-400 font-extrabold';
  } else if (currentScore >= 50 && accuracy >= 65) {
    rankName = 'Platinum';
    rankColor = 'text-indigo-400 font-extrabold';
  } else if (currentScore >= 30 && accuracy >= 55) {
    rankName = 'Gold';
    rankColor = 'text-yellow-400 font-extrabold';
  } else if (currentScore >= 10) {
    rankName = 'Silver';
    rankColor = 'text-gray-300 font-extrabold';
  }

  let diagnostics = "Flawless sequence mapping! Your working memory encodes spatial patterns and timing sequences with high precision.";
  if (internalMistakes > 4) {
    diagnostics = "High interference rate. Try chunking the sequence into smaller clusters of 2-3 steps to minimize overload.";
  } else if (accuracy < 60) {
    diagnostics = "Attentional fade detected. Focus on the start of the sequence, as the primary effect usually determines overall accuracy.";
  } else if (currentScore < 40) {
    diagnostics = "To improve, mentally trace the path or use spatial visualization (drawing lines between coordinates in your head).";
  }

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Memory Engine...</p>
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
            <li><Link href="/drills/cognitive" className="text-gray-500 hover:text-gray-300 transition-colors">Cognitive</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-gray-500">Memory</li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-blue-400 font-medium">Memory Sequence</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Memory Sequence</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Visual Memory • High-Speed Recall • Mobile Optimized</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">

            {localPhase === 'playing' && (
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
          <StatCard icon={<Target className="text-blue-400" />} value={currentScore} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining} label="Time" unit="s" />
          <StatCard icon={<Award className="text-indigo-400" />} value={`Lv.${currentLevel}`} label="Level" />
          <StatCard icon={<Grid className="text-purple-400" />} value={`${gridSize}x${gridSize}`} label="Grid Size" />
          <StatCard icon={<Activity className="text-pink-400" />} value={sequenceLength} label="Sequence" />
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
          onContextMenu={(e) => { if(localPhase === 'playing') e.preventDefault(); }}
          className={`relative overflow-hidden flex flex-col items-center justify-center bg-[#050505] transition-all duration-100 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-[100vw] h-[100dvh] rounded-none' 
              : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[500px]'
          }`}
          style={{ 
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            margin: '0 auto',
            touchAction: localPhase === 'playing' ? 'none' : 'auto', 
            overscrollBehavior: localPhase === 'playing' ? 'none' : 'auto'
          }}>
          
          {/* Time Progress Bar */}
          {localPhase === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
              />
            </div>
          )}

          {/* In-Game Controls (Fullscreen) */}
          {isFullscreen && localPhase === 'playing' && (
            <div className="absolute top-4 right-4 z-[60] flex gap-2">
              <button onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* Persistent Phase HUD */}
          {localPhase === 'playing' && (
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-[60] pointer-events-none">
              <div className={`border rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2 sm:py-2.5 backdrop-blur-md flex items-center shadow-lg transition-colors duration-300 ${isShowingSequence ? 'bg-blue-900/40 border-blue-500/50' : 'bg-green-900/40 border-green-500/50'}`}>
                {isShowingSequence ? (
                  <><Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 mr-2 animate-pulse"/><span className="text-xs sm:text-sm font-bold text-blue-300 uppercase tracking-widest">Watching</span></>
                ) : (
                  <><Crosshair className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 mr-2"/><span className="text-xs sm:text-sm font-bold text-green-300 uppercase tracking-widest">Your Turn</span></>
                )}
              </div>
            </div>
          )}

          {/* GAMEPLAY AREA - MATHEMATICALLY FORCED SQUARES */}
          {localPhase === 'playing' && (
            <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6">
              <div 
                className="grid mx-auto"
                style={{ 
                  gap: gridSize >= 5 ? '6px' : '10px',
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                  // Force perfect square mathematically scaling to available screen estate
                  width: isFullscreen ? 'min(95vw, 80dvh)' : 'min(90vw, 60vh)', 
                  height: isFullscreen ? 'min(95vw, 80dvh)' : 'min(90vw, 60vh)',
                }}
              >
                {Array.from({length: gridSize * gridSize}).map((_, idx) => {
                  const isActive = activeBlock === idx;
                  const isUserSelected = userSequence.includes(idx);
                  
                  let blockStyle = 'bg-gray-800 border-gray-600 shadow-md';
                  
                  if (isActive) {
                    if (isShowingSequence) {
                      blockStyle = 'bg-blue-500 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.6)] scale-95';
                    } else {
                      if (flashColor === 'blue') blockStyle = 'bg-blue-500 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.6)] scale-95';
                      if (flashColor === 'red') blockStyle = 'bg-red-500 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.6)] scale-95';
                      if (flashColor === 'green') blockStyle = 'bg-green-500 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.6)] scale-95';
                    }
                  } else if (isUserSelected && !isShowingSequence) {
                     blockStyle = 'bg-green-500/40 border-green-500/60 shadow-[inset_0_0_10px_rgba(34,197,94,0.3)]';
                  }

                  return (
                    <button
                      key={idx}
                      onPointerDown={(e) => handleBlockClick(idx, e)}
                      className={`
                        w-full h-full rounded-lg sm:rounded-xl transition-all duration-100 touch-none border focus:outline-none
                        ${blockStyle}
                        ${!isShowingSequence ? 'hover:bg-gray-700 cursor-pointer' : 'cursor-default opacity-80'}
                      `}
                      aria-label="Sequence Block"
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* START SCREEN (Scrollable) */}
          {localPhase === 'start' && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto">
              <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto flex flex-col">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(59,130,246,0.3)] shrink-0">
                  <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black mb-8 tracking-tight">Memory Sequence</h2>
                
                <button 
                  onClick={handleStartGame}
                  className="w-full flex items-center justify-center gap-2 px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)] shrink-0">
                  <Play className="w-5 h-5 fill-white" /> START DRILL
                </button>
              </div>
            </div>
          )}

          {/* END SCREEN */}
          {localPhase === 'ended' && (
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
                    Peak difficulty reached: Level {currentLevel}
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
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Highest Lv</span>
                      <span className="text-sm font-black text-blue-400">Lv.{highestLevelReached}</span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Mistakes</span>
                      <span className="text-sm font-black text-red-400">{internalMistakes}</span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Sequence</span>
                      <span className="text-sm font-black text-pink-400">{sequenceLength}</span>
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

        {/* DRILL RULES & SCORING */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Rules & High-Stakes Economy</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="indigo" text="Repeat sequence perfectly" highlight="+10 PTS | +5s" result="Increases Score" />
                  <RuleItem num="2" color="blue" text="Adaptive Grid Sizing" highlight="Scales to 5x5 Grid" result="Scales on Score" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Tap wrong block" highlight="No PTS Penalty | -3s" result="Reduces Timer" />
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
                <GraduationCap className="w-5 h-5 text-blue-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Memory Sequence</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This cognitive drill is engineered to train <strong className="text-white font-semibold">working memory capacity</strong> and <strong className="text-white font-semibold">sequential pattern recognition</strong>. By watching illuminated blocks and instantly recalling their order under strict time constraints, your brain learns to hold complex sequential spatial maps—a critical skill for situational awareness and rapid information processing.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Students boosting short-term memory for studying, gamers developing visual map awareness, and professionals aiming to combat mental fatigue.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Spatial memory mapping, immediate sequential recall, visual focus duration, and recovery from short-term memory disruption.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Difficulty Scaling</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">The drill dynamically adapts to your performance. Clearing levels increases the sequence length and expands the grid up to a dense 5x5 board.</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play & Practice Effectively</h3>
                  </div>
                  <ol className="text-sm leading-relaxed space-y-3 list-decimal pl-5 text-gray-400">
                    <li><strong className="text-gray-200">Phase 1 (Watch):</strong> The HUD will display "Watching". Do not tap anything. Focus entirely on tracing the path the blocks create.</li>
                    <li><strong className="text-gray-200">Phase 2 (Recall):</strong> The HUD shifts to "Your Turn". Tap the blocks in the exact order they appeared.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> Completing a sequence adds <span className="text-green-400 font-bold">+10 PTS and +5 Seconds</span>. A single mistake instantly stops your turn, deducts <span className="text-red-400 font-bold">-5 PTS and -3 Seconds</span>, and drops you to a lower difficulty level.</li>
                    <li><strong className="text-gray-200">Shape Visualization:</strong> Instead of memorizing individual blocks (1, 4, 3, 2), try to visualize the geometric shape they draw on the grid (e.g., "A triangle pointing left").</li>
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
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Yes. Accuracy is critical. A single incorrect tap instantly ends the sequence attempt, deducts 5 points and 3 seconds, and forces you down a difficulty level where a new sequence will be generated to help you recover.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">How large does the grid get?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">The drill begins on a simple 3x3 grid. As you consistently nail the sequences, the grid will expand to 4x4 and eventually a massive 5x5 board with increasingly long and rapid sequences.</p>
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
              <RelatedCard href="/drills/memory/spatial-memory/grid-memorization" title="Grid Memorization" desc="Memorize the exact location of illuminated cells." color="purple" icon={<Grid className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/short-term-memory/color-sequence" title="Color Sequence" desc="Memorize progressive visual color patterns." color="blue" icon={<Star className="w-4 h-4" />} />
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
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-black text-xl tracking-tight">SkillDrills</span>
                </div>
                <p className="text-sm mb-3 font-medium">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-8 text-gray-500">
                  Premium online cognitive training. Push your brain's processing speed, focus stamina, and spatial memory to the limit with hardcore, data-driven web drills.
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
    rose: 'from-rose-500 to-pink-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
    green: 'from-green-500 to-emerald-500'
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
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-blue-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-blue-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}