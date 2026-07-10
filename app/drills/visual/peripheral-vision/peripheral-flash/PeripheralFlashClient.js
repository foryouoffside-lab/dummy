'use client';

import React, { useEffect, useState, useRef, useCallback, Component } from 'react';
import Link from 'next/link';
import { 
  Eye, Zap, Timer, Trophy, Volume2, VolumeX, Maximize2, Minimize2,
  Info, RefreshCw, RotateCcw, Smartphone, GraduationCap, Lightbulb, 
  TrendingUp, BarChart3, ArrowRight, Brain, Users, Gauge, AlertTriangle, 
  Star, Layers, ScanEye, Target, CheckCircle, XCircle, Play, Share2, ChevronRight,
  Activity, LogOut, MousePointer2, Sparkles
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';
import PlayAgainButton from '../../../../../components/PlayAgainButton';
import { getDifficultyLevel, recordGameScore, getLevelProgress, DIFFICULTY_LEVELS } from '../../../../../lib/difficultyManager';

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

  playFlash()   { this.playTone(1046, 'sine', 0.1, 0.05); } 
  playPerfect() { this.playTone(880, 'sine', 0.2, 0.1); }   
  playPass()    { this.playTone(523, 'triangle', 0.2, 0.1); } 
  playFail()    { this.playTone(330, 'sawtooth', 0.25, 0.08); } 
  
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

const SHAPES = ['circle', 'square', 'triangle', 'diamond'];
const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function PeripheralFlashClient() {
  // === UI State ===
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Drill Economy & Custom Clock ===
  const [customScore, setCustomScore] = useState(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  const [localLevel, setLocalLevel] = useState(1);
  const customScoreRef = useRef(0);
  const localTimeRef = useRef(60);
  const timerIntervalRef = useRef(null);

  // === Drill Mechanics State ===
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashData, setFlashData] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  
  // === Metrics ===
  const [totalHits, setTotalHits] = useState(0);
  const [totalMisses, setTotalMisses] = useState(0);
  const [totalPasses, setTotalPasses] = useState(0);
  const [bestReaction, setBestReaction] = useState(0);

  // === Engine Hook ===
  const engine = useGameEngine({
    category: 'visual',
    drillId: 'peripheral-flash',
    drillName: 'Peripheral Flash Drill',
    totalGameTime: 9999, // Overridden by strict local economy timer
    sharePath: 'drills/visual/peripheral-vision/peripheral-flash',
  });

  // Refs for tracking sequences without lag
  const containerRef = useRef(null);
  const flashSequenceTimeoutRef = useRef(null);
  const sequenceGapTimeoutRef = useRef(null);
  const currentSequenceRef = useRef([]);
  const currentFlashIndexRef = useRef(0);
  const startTimeRef = useRef(0);
  const gameStateRef = useRef(engine.gameState);
  const feedbackTimerRef = useRef(null);
  const engineRef = useRef(engine);

  useEffect(() => { gameStateRef.current = engine.gameState; }, [engine.gameState]);
  useEffect(() => { engineRef.current = engine; }, [engine]);
  
  // Mount Init
  useEffect(() => {
    setIsClient(true);
    try { const name = localStorage.getItem('skilldrills_player_name'); if (name) setPlayerNameInput(name); } catch (e) {}
    const t = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(t);
  }, []);

  // Audio Sync
  useEffect(() => { if (audioSynth) audioSynth.setEnabled(soundEnabled); }, [soundEnabled]);

  // Mobile & Orientation Check
  useEffect(() => {
    const checkEnv = () => {
      if (typeof window === 'undefined') return;
      const mobileCheck = window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsMobile(mobileCheck);
      
      if (mobileCheck && window.innerHeight > window.innerWidth) {
        setShowRotateWarning(true);
      } else {
        setShowRotateWarning(false);
      }
    };
    checkEnv();
    window.addEventListener('resize', checkEnv);
    window.addEventListener('orientationchange', checkEnv);
    return () => { window.removeEventListener('resize', checkEnv); window.removeEventListener('orientationchange', checkEnv); };
  }, []);

  // Fullscreen Detection
  useEffect(() => { 
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', fsHandler); 
    return () => document.removeEventListener('fullscreenchange', fsHandler); 
  }, []);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      localTimeRef.current -= 1;
      
      if (localTimeRef.current <= 0) {
        localTimeRef.current = 0;
        setLocalTimeRemaining(0);
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        if (engineRef.current && typeof engineRef.current.endGame === 'function') {
          engineRef.current.endGame();
        }
      } else {
        setLocalTimeRemaining(localTimeRef.current);
      }
    }, 1000);
  }, []);

  // Timer Setup (Strict Caps & Bug Fixes)
  useEffect(() => {
    if (engine.gameState !== 'playing') {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      return;
    }
    
    if (!timerIntervalRef.current) {
      startTimer();
    }
    
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [engine.gameState, startTimer]);

  const clearTimeouts = () => {
    if (flashSequenceTimeoutRef.current) clearTimeout(flashSequenceTimeoutRef.current);
    if (sequenceGapTimeoutRef.current) clearTimeout(sequenceGapTimeoutRef.current);
  };

  // Cleanups
  useEffect(() => {
    if (engine.gameState === 'ended' || engine.gameState === 'start') {
      clearTimeouts();
      setShowResponse(false); setIsFlashing(false); setFlashData(null);
    }
  }, [engine.gameState]);

  // UI Flow Handlers
  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen) await containerRef.current?.requestFullscreen(); 
      else await document.exitFullscreen(); 
    } catch (err) {} 
  }, [isFullscreen]);

  const handleExitToStart = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    window.location.reload(); 
  }, []);

  const shareDrillLink = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash';
    if (navigator.share) {
      try { await navigator.share({ title: 'Peripheral Flash Drill', url }); } catch (e) {}
    } else {
      try { await navigator.clipboard.writeText(url); alert('Link copied to clipboard!'); } catch (e) {}
    }
  }, []);

  const shareScore = useCallback(() => {
    const totalActions = totalHits + totalMisses + totalPasses;
    const finalAccuracy = totalActions > 0 ? Math.round((totalHits / (totalHits + totalMisses)) * 100) : 100;
    
    let finalRank = 'Bronze';
    if (customScoreRef.current >= 150 && finalAccuracy >= 90) finalRank = 'Grandmaster';
    else if (customScoreRef.current >= 100 && finalAccuracy >= 82) finalRank = 'Master';
    else if (customScoreRef.current >= 70 && finalAccuracy >= 75) finalRank = 'Diamond';
    else if (customScoreRef.current >= 45 && finalAccuracy >= 65) finalRank = 'Platinum';
    else if (customScoreRef.current >= 25 && finalAccuracy >= 55) finalRank = 'Gold';
    else if (customScoreRef.current >= 10) finalRank = 'Silver';

    const text = `👁️ I scored ${customScoreRef.current} PTS with ${finalAccuracy}% accuracy on the Peripheral Flash Vision Drill! Reached Level ${localLevel}. Rank: ${finalRank}. Try it here: https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'My SkillDrills Visual Score',
        text: text,
        url: 'https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash'
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [localLevel, totalHits, totalMisses, totalPasses]);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => { setLocalFeedback(prev => ({ ...prev, visible: false })); }, 800);
  }, []);

  // Update Economy (Strict Limits)
  const updateEconomy = useCallback((scoreDelta, timeDelta) => {
    setCustomScore(prev => {
      const updated = Math.max(0, prev + scoreDelta);
      customScoreRef.current = updated;
      if (engineRef.current && typeof engineRef.current.setScore === 'function') {
        engineRef.current.setScore(updated);
      }
      setLocalLevel(Math.max(1, Math.min(6, Math.floor(updated / 15) + 1)));
      return updated;
    });

    localTimeRef.current = Math.min(60, Math.max(0, localTimeRef.current + timeDelta));
    setLocalTimeRemaining(localTimeRef.current);
    
    if (localTimeRef.current <= 0) {
      localTimeRef.current = 0;
      setLocalTimeRemaining(0);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (engineRef.current && typeof engineRef.current.endGame === 'function') {
        engineRef.current.endGame();
      }
    }
  }, []);

  // ============================================================
  // DRILL MECHANICS
  // ============================================================
  const getDifficultyConfig = useCallback(() => {
    switch(localLevel) {
      case 1: return { flashSpeed: 350, gapSpeed: 450, sequenceMin: 3, sequenceMax: 4 };
      case 2: return { flashSpeed: 300, gapSpeed: 400, sequenceMin: 4, sequenceMax: 5 };
      case 3: return { flashSpeed: 250, gapSpeed: 350, sequenceMin: 5, sequenceMax: 6 };
      case 4: return { flashSpeed: 200, gapSpeed: 300, sequenceMin: 5, sequenceMax: 7 };
      case 5: return { flashSpeed: 175, gapSpeed: 250, sequenceMin: 6, sequenceMax: 8 };
      case 6: return { flashSpeed: 150, gapSpeed: 200, sequenceMin: 7, sequenceMax: 9 };
      default: return { flashSpeed: 300, gapSpeed: 400, sequenceMin: 4, sequenceMax: 5 };
    }
  }, [localLevel]);

  const generateFlashSequence = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    const config = getDifficultyConfig();
    const numFlashes = Math.floor(Math.random() * (config.sequenceMax - config.sequenceMin + 1)) + config.sequenceMin;
    
    const sequence = [];
    const usedPositions = new Set();
    
    for (let i = 0; i < numFlashes; i++) {
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      let position;
      // Exclude center focus zone
      do {
        const area = Math.floor(Math.random() * 8);
        let x, y;
        switch(area) {
          case 0: x = 10 + Math.random() * 20; y = 10 + Math.random() * 20; break; 
          case 1: x = 40 + Math.random() * 20; y = 5 + Math.random() * 15; break;  
          case 2: x = 70 + Math.random() * 20; y = 10 + Math.random() * 20; break; 
          case 3: x = 80 + Math.random() * 15; y = 40 + Math.random() * 20; break; 
          case 4: x = 70 + Math.random() * 20; y = 70 + Math.random() * 20; break; 
          case 5: x = 40 + Math.random() * 20; y = 80 + Math.random() * 15; break; 
          case 6: x = 10 + Math.random() * 20; y = 70 + Math.random() * 20; break; 
          case 7: x = 5 + Math.random() * 15; y = 40 + Math.random() * 20; break;  
          default: x = 20; y = 20;
        }
        position = `${Math.round(x)},${Math.round(y)}`;
      } while (usedPositions.has(position) && usedPositions.size < 8);
      
      usedPositions.add(position);
      const [posX, posY] = position.split(',').map(Number);
      sequence.push({ shape, color, x: posX, y: posY });
    }
    
    currentSequenceRef.current = sequence;
    currentFlashIndexRef.current = 0;
    flashSequenceTimeoutRef.current = setTimeout(() => { showNextFlash(); }, 500);
  }, [getDifficultyConfig]);

  const showNextFlash = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    const sequence = currentSequenceRef.current;
    const index = currentFlashIndexRef.current;
    
    if (index >= sequence.length) {
      setIsFlashing(false); 
      setFlashData(null); 
      startTimeRef.current = performance.now();
      flashSequenceTimeoutRef.current = setTimeout(() => { 
        if (gameStateRef.current === 'playing') setShowResponse(true); 
      }, 150);
      return;
    }

    const flash = sequence[index];
    setFlashData(flash); 
    setIsFlashing(true); 
    if (audioSynth) audioSynth.playFlash();

    const config = getDifficultyConfig();
    flashSequenceTimeoutRef.current = setTimeout(() => {
      setFlashData(null); 
      setIsFlashing(false);
      currentFlashIndexRef.current++;
      
      if (currentFlashIndexRef.current < sequence.length) {
        flashSequenceTimeoutRef.current = setTimeout(() => { showNextFlash(); }, config.gapSpeed);
      } else {
        startTimeRef.current = performance.now();
        flashSequenceTimeoutRef.current = setTimeout(() => { 
          if (gameStateRef.current === 'playing') setShowResponse(true); 
        }, 150);
      }
    }, config.flashSpeed);
  }, [getDifficultyConfig]);

  const handleResponse = useCallback((response) => {
    if (gameStateRef.current !== 'playing') return;
    const sequence = currentSequenceRef.current;
    const targetFlash = sequence[sequence.length - 1];
    const correct = response === targetFlash.shape;
    const reactionTime = Math.round(performance.now() - startTimeRef.current);
    
    if (correct) {
      setTotalHits(h => h + 1);
      if (bestReaction === 0 || reactionTime < bestReaction) setBestReaction(reactionTime);
      
      updateEconomy(5, 2); // +5 Score, +2s Clock
      
      if (audioSynth) audioSynth.playPerfect();
      triggerFeedback(`Hit! +5 PTS | +2s`, 'success');
      
    } else if (response === 'pass') {
      setTotalPasses(p => p + 1);
      if (audioSynth) audioSynth.playPass();
      triggerFeedback(`Passed (Was ${targetFlash.shape})`, 'warning');
    } else {
      setTotalMisses(m => m + 1);
      
      updateEconomy(0, -2); // No PTS Penalty, -2s Clock
      
      if (audioSynth) audioSynth.playFail();
      triggerFeedback(`Miss! -2s`, 'error');
    }
    
    setShowResponse(false); 
    currentSequenceRef.current = []; 
    
    const delay = 800 + Math.random() * 600;
    sequenceGapTimeoutRef.current = setTimeout(() => { generateFlashSequence(); }, delay);
  }, [bestReaction, triggerFeedback, generateFlashSequence, updateEconomy]);

  // Absolute Start Trigger
  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    
    clearTimeouts();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setCustomScore(0); customScoreRef.current = 0;
    setLocalTimeRemaining(60); localTimeRef.current = 60;
    setLocalLevel(1);
    
    setTotalHits(0); setTotalMisses(0); setTotalPasses(0); setBestReaction(0);
    setShowResponse(false); setFlashData(null); setIsFlashing(false);
    currentSequenceRef.current = []; currentFlashIndexRef.current = 0;

    try { 
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      }
    } catch (err) {} 
    
    if (engineRef.current && typeof engineRef.current.startGame === 'function') {
      engineRef.current.startGame();
    }

    triggerFeedback('Focus on center • Detect last shape', 'success');
    if (sequenceGapTimeoutRef.current) clearTimeout(sequenceGapTimeoutRef.current);
    sequenceGapTimeoutRef.current = setTimeout(() => generateFlashSequence(), 1200);
    
    startTimer();
  }, [generateFlashSequence, triggerFeedback, startTimer]);

  // ============================================================
  // RENDER HELPERS
  // ============================================================
  const renderShapeSVG = (shape, color = '#a855f7', size = 56) => {
    const strokeWidth = 3;
    switch(shape) {
      case 'circle': return (<svg width={size} height={size} viewBox="0 0 48 48"><defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><circle cx="24" cy="24" r="20" fill={color} filter="url(#glow)"/><circle cx="24" cy="24" r="20" fill="none" stroke="white" strokeWidth={strokeWidth} opacity="0.8"/></svg>);
      case 'square': return (<svg width={size} height={size} viewBox="0 0 48 48"><defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect x="4" y="4" width="40" height="40" rx="4" fill={color} filter="url(#glow)"/><rect x="4" y="4" width="40" height="40" rx="4" fill="none" stroke="white" strokeWidth={strokeWidth} opacity="0.8"/></svg>);
      case 'triangle': return (<svg width={size} height={size} viewBox="0 0 48 48"><defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><polygon points="24,4 44,44 4,44" fill={color} filter="url(#glow)"/><polygon points="24,4 44,44 4,44" fill="none" stroke="white" strokeWidth={strokeWidth} opacity="0.8"/></svg>);
      case 'diamond': return (<svg width={size} height={size} viewBox="0 0 48 48"><defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><polygon points="24,4 44,24 24,44 4,24" fill={color} filter="url(#glow)"/><polygon points="24,4 44,24 24,44 4,24" fill="none" stroke="white" strokeWidth={strokeWidth} opacity="0.8"/></svg>);
      default: return null;
    }
  };

  if (loading || !isClient) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    ); 
  }

  const totalActions = totalHits + totalMisses + totalPasses;
  const accuracyPercentage = totalActions > 0 ? Math.round((totalHits / (totalHits + totalMisses)) * 100) : 100;
  const isNewBest = engine.gameState === 'ended' && customScore > engine.bestScore && customScore > 0;

  // Calculate grade based on score and accuracy
  let gradeLetter = 'F';
  if (accuracyPercentage >= 90 && customScore >= 120) gradeLetter = 'S';
  else if (accuracyPercentage >= 80 && customScore >= 80) gradeLetter = 'A';
  else if (accuracyPercentage >= 70 && customScore >= 50) gradeLetter = 'B';
  else if (accuracyPercentage >= 60 && customScore >= 30) gradeLetter = 'C';
  else if (accuracyPercentage >= 50 && customScore >= 15) gradeLetter = 'D';

  let rankName = 'Bronze';
  let rankColor = 'text-slate-500';
  if (customScore >= 150 && accuracyPercentage >= 90) {
    rankName = 'Grandmaster';
    rankColor = 'text-fuchsia-400 font-extrabold';
  } else if (customScore >= 100 && accuracyPercentage >= 82) {
    rankName = 'Master';
    rankColor = 'text-red-400 font-extrabold';
  } else if (customScore >= 70 && accuracyPercentage >= 75) {
    rankName = 'Diamond';
    rankColor = 'text-cyan-400 font-extrabold';
  } else if (customScore >= 45 && accuracyPercentage >= 65) {
    rankName = 'Platinum';
    rankColor = 'text-indigo-400 font-extrabold';
  } else if (customScore >= 25 && accuracyPercentage >= 55) {
    rankName = 'Gold';
    rankColor = 'text-yellow-400 font-extrabold';
  } else if (customScore >= 10) {
    rankName = 'Silver';
    rankColor = 'text-gray-300 font-extrabold';
  }

  let diagnostics = "Sensational peripheral awareness! You successfully map shape sequences at high speed in your visual field.";
  if (totalMisses > 6) {
    diagnostics = "High rate of peripheral misidentifications. Keep your eyes completely static at the center and try to notice shapes without looking directly at them.";
  } else if (accuracyPercentage < 60) {
    diagnostics = "Slips in shape recognition detected. Use the 'SKIP' button when uncertain to preserve your time clock.";
  } else if (customScore < 30) {
    diagnostics = "To boost score, focus on keeping high streaks to advance difficulty levels and earn score multipliers.";
  }

  return (
    <div className="min-h-screen select-none bg-black text-white selection:bg-transparent" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/visual" className="text-gray-500 hover:text-gray-300 transition-colors">Visual Drills</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-purple-400 font-medium">Peripheral Flash</li>
            </ol>
          </nav>
        )}
        
        {/* Header */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                <ScanEye className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Peripheral Flash Drill</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Dynamic Foveal Focus • Shape Detection • Adaptive Scaling</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              
              {engine.gameState === 'playing' && (
                <button onClick={() => { if(engineRef.current.endGame) engineRef.current.endGame(); handleStartGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset"><RefreshCw className="w-5 h-5" /></button>
              )}
              <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
            </div>
          </div>
        )}

        {showNameInput && (
          <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-900 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <input type="text" value={playerNameInput} onChange={e => { setPlayerNameInput(e.target.value); try { localStorage.setItem('skilldrills_player_name', e.target.value); } catch(err){} }} placeholder="Enter display name" maxLength={20}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
          </div>
        )}

        {/* Stats Matrix */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
            <StatCard icon={<Target className="text-purple-400" />} value={customScore} label="Score" />
            <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={localTimeRemaining} label="Time" unit="s" />
            <StatCard icon={<Zap className="text-yellow-400" />} value={`Lv.${localLevel}`} label="Difficulty" />
            <StatCard icon={<Activity className="text-blue-400" />} value={bestReaction || '-'} label="Best RT" unit="ms" />
            <StatCard icon={<CheckCircle className="text-green-400" />} value={totalHits} label="Hits" />
            <StatCard icon={<XCircle className="text-red-400" />} value={totalMisses} label="Misses" />
            <StatCard icon={<Trophy className="text-orange-400" />} value={engine.bestScore || 0} label="Best" />
          </div>
        )}

        {/* Dynamic Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {localFeedback.visible && (
            <div key={localFeedback.id} className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : localFeedback.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-yellow-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
              {localFeedback.text}
            </div>
          )}
        </div>

        {/* Game Container (Canvas Engine) */}
        <GameErrorBoundary>
          <div 
            ref={containerRef} 
            className={`relative overflow-hidden flex flex-col transition-all duration-100 z-10 bg-[#050508] ${
              isFullscreen 
                ? 'fixed inset-0 z-50 w-screen h-screen rounded-none border-none' 
                : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[600px] lg:min-h-[650px]'
            }`}
          >
            
            {/* Subtle background grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Time Progress Bar */}
            {engine.gameState === 'playing' && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
                <div 
                  className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
                />
              </div>
            )}

            {showRotateWarning && engine.gameState !== 'playing' && (
              <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 backdrop-blur-sm pointer-events-auto">
                <div className="animate-bounce mb-6 text-purple-500">
                  <RotateCcw className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Rotate Device</h3>
                <p className="text-sm text-gray-400 max-w-xs mx-auto">Please flip your terminal into landscape mode to align the horizontal sensory field.</p>
              </div>
            )}

            {isFullscreen && engine.gameState === 'playing' && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onClick={() => { if(engineRef.current.endGame) engineRef.current.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
                <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
              </div>
            )}

            {/* ACTIVE GAME AREA */}
            {engine.gameState === 'playing' && (
              <div className="absolute inset-0">
                {/* Center Fixation Crosshair */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <svg width="32" height="32" viewBox="0 0 32 32" className="drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] opacity-60">
                    <rect x="15" y="4" width="2" height="24" fill="#a855f7" />
                    <rect x="4" y="15" width="24" height="2" fill="#a855f7" />
                    <circle cx="16" cy="16" r="2" fill="#ec4899" />
                  </svg>
                </div>

                {/* Flashing Shapes */}
                {isFlashing && flashData && (
                  <div className="absolute transition-all duration-200 ease-out" style={{ left: `${flashData.x}%`, top: `${flashData.y}%`, transform: 'translate(-50%, -50%)' }}>
                    <div className="animate-in zoom-in-50 duration-150 ease-out">
                      {renderShapeSVG(flashData.shape, flashData.color, isMobile ? 40 : 64)}
                    </div>
                  </div>
                )}

                {/* Response Input Panel */}
                {showResponse && !isFlashing && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 backdrop-blur-md animate-in fade-in duration-150 p-4 overflow-y-auto">
                    <div className="rounded-3xl p-6 shadow-2xl border border-gray-700 bg-gray-900 max-w-sm w-full mx-auto my-auto shrink-0">
                      <p className="text-sm mb-1 text-center font-bold text-gray-300 uppercase tracking-widest">Identify the</p>
                      <p className="text-xl mb-6 text-center font-black text-purple-400">LAST SHAPE</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {SHAPES.map(shape => (
                          <button key={shape} onClick={() => handleResponse(shape)} 
                            className="p-5 rounded-2xl border border-gray-700 bg-gray-800 hover:border-purple-500 hover:bg-gray-700 transition-all transform active:scale-95 flex flex-col items-center gap-3 shadow-lg">
                            {renderShapeSVG(shape, '#a855f7', isMobile ? 32 : 40)}
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{shape}</span>
                          </button>
                        ))}
                      </div>
                      <button onClick={() => handleResponse('pass')} 
                        className="w-full py-3 rounded-xl border border-gray-700 bg-black text-gray-400 hover:text-white hover:border-gray-500 transition-all font-bold text-sm tracking-wide">
                        SKIP (0 PTS)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile-Optimized Start Screen */}
            {engine.gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm p-4 overflow-y-auto pointer-events-auto">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full border border-gray-700 bg-gray-900 shadow-2xl flex flex-col my-auto shrink-0">
                  <div className="flex-1 mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                      <ScanEye className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black mb-2 tracking-tight text-white">Peripheral Flash</h2>
                  </div>

                  <button onClick={handleStartGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(168,85,247,0.3)] focus:outline-none shrink-0">
                    <Play className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Premium Mobile-Optimized End Screen */}
            {engine.gameState === 'ended' && (
              <div className="absolute inset-0 bg-[#05070e]/98 overflow-y-auto p-6 z-[70] select-none scrollbar-thin scroll-smooth backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto">
                <div className="min-h-full flex flex-col justify-center items-center py-4 w-full">
                  <div className="max-w-md w-full text-center">
                    {customScore > 0 && customScore >= (engine.bestScore || 0) && (
                      <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce font-mono">
                        ⭐ NEW PERSONAL BEST!
                      </div>
                    )}
                    
                    <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1 font-mono">
                      Drill Complete
                    </h2>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-mono">
                      Level Reached: Level {localLevel}
                    </p>

                    <div className="grid grid-cols-3 gap-2.5 mb-6 text-left font-mono">
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                        <span className="text-sm font-black text-white">{customScore} <span className="text-[8px] text-slate-400 font-normal">PTS</span></span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Accuracy</span>
                        <span className="text-sm font-black text-white">{accuracyPercentage}%</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Best Score</span>
                        <span className="text-sm font-black text-yellow-400">{engine.bestScore || 0}</span>
                      </div>
                      
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold font-mono">Target Hits</span>
                        <span className="text-sm font-black text-emerald-400">{totalHits}</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Best RT</span>
                        <span className="text-sm font-black text-cyan-400">{bestReaction}ms</span>
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
                      <PlayAgainButton
                        onClick={() => { if(engineRef.current.endGame) engineRef.current.endGame(); handleStartGame(); }}
                        colorTheme="purple"
                      />
                      <button
                        onClick={shareScore}
                        className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors active:scale-95 flex items-center justify-center"
                        title="Share Score"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      {isFullscreen && (
                        <button
                          onClick={handleExitToStart}
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
        </GameErrorBoundary>

        {/* Instructions */}
        {!isFullscreen && (
          <section className="mt-10 pointer-events-none">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-purple-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Correct Target" highlight="+5 PTS | +2s" result="Progresses Score" />
                  <RuleItem num="2" color="cyan" text="Difficulty Scaling" highlight="Based on Score" result="Increases Every 15 PTS" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Wrong Answer" highlight="0 PTS | -2s" result="Deducts Remaining Time" />
                  <RuleItem num="4" color="yellow" text="Timer Economy" highlight="Max 60s" result="Time Ends = Trial Over" />
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
                <h2 className="font-bold text-white text-lg tracking-wide">About This Peripheral Flash Drill</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This sensory processing drill is designed to expand your functional field of view and improve rapid shape recognition. By locking your foveal vision (central focus) on the crosshair, you force your brain to cognitively map and store visual stimuli flashing unpredictably at the extreme edges of your vision. 
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Target Audience</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Esports athletes, traditional sports players, first-responders, and individuals seeking to process wide-environmental data faster without moving their central gaze.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Functional field of view (UFOV), rapid shape detection, visual working memory, gaze stability, and spatial coordinate mapping in high-stress scenarios.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Performance Metrics</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Total net score economy (+5/0), physical clock management (+2s/-2s), accuracy ratio, best reaction latency (ms), and your sustained difficulty peak.</p>
                  </div>
                </div>

                {/* HOW TO PLAY SECTION */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play</h3>
                  </div>
                  <ol className="list-decimal pl-5 space-y-2 text-xs text-gray-400 leading-relaxed">
                    <li><strong className="text-gray-200">Hold Focus:</strong> Lock your gaze strictly on the absolute center crosshair. If you move your eyes to "look" at the flashing shapes, you break the cognitive constraint of the drill.</li>
                    <li><strong className="text-gray-200">Process the Sequence:</strong> A randomized number of shapes will briefly flash in your periphery.</li>
                    <li><strong className="text-gray-200">Identify:</strong> When the prompt appears, quickly select the <strong className="text-purple-400 uppercase">last shape</strong> shown in the sequence.</li>
                    <li><strong className="text-gray-200">Manage Time:</strong> Correct answers add +2 seconds to your clock. Wrong answers subtract -2 seconds but do not penalize your score. Keep the timer alive for as long as possible.</li>
                  </ol>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why does it flash multiple times?</h4>
                      <p className="text-xs text-gray-400 mt-1">To test your sustained visual attention. The sequence length randomizes (increasing on higher difficulty tiers), forcing you to constantly update your working memory of the "last shape seen" against incoming visual interference.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">How does the difficulty scale?</h4>
                      <p className="text-xs text-gray-400 mt-1">Difficulty scales up dynamically based on your score. Every 15 points you score will advance you to the next difficulty tier, increasing the sequence lengths and shortening the flash/gap speed intervals.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why is my time not going above 60s?</h4>
                      <p className="text-xs text-gray-400 mt-1">The internal physics engine institutes a strict 60-second absolute maximum limit to preserve endurance integrity. Perfect shots cannot artificially inflate the clock forever.</p>
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
              <RelatedCard href="/drills/visual/peripheral-vision/wide-field" title="Wide Field Awareness" desc="Position-based recall training for peripheral memory." color="purple" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/tracking-accuracy/moving-target" title="Kinetic Intercept" desc="Track and click unpredictable moving spheres." color="orange" icon={<MousePointer2 className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/reaction-speed/light-reaction" title="Light Reaction" desc="Test visual reaction time with light stimulus." color="blue" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Divided Attention" desc="Dual-task brain training challenge." color="cyan" icon={<Layers className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FOOTER */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Visual & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-purple-400 transition-colors">Light Reaction Test</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-purple-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/visual" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-purple-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps/target-acquisition" className="hover:text-purple-400 transition-colors">Target Acquisition</Link></li>
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
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-purple-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-purple-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory" className="hover:text-purple-400 transition-colors">Memory (15)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-purple-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500/25 to-pink-500/25 border border-purple-500/30 rounded-lg flex items-center justify-center">
                    <ScanEye className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
                  Open-source telemetry training platform. Free forever. No downloads required.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="X / Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
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

function RuleItem({ num, color, text, highlight = '', result }) {
  const colorMap = { 
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500',
    green: 'bg-green-600 text-green-300 border-green-500' 
  };
  const colors = colorMap[color] || 'bg-slate-600 text-slate-300 border-slate-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-[#0b0f19]/40 p-4 rounded-xl border border-slate-800 shadow-sm">
      <div className={`w-8 h-8 rounded-xl ${bg} border border-t-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0`}>{num}</div>
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
    orange: 'from-orange-500 to-red-500',
    rose: 'from-rose-500 to-pink-500',
  };
  
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:-translate-y-1 hover:border-purple-500/50">
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