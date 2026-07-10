'use client';

import React, { Component, useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Eye, Zap, Timer, Trophy, Volume2, VolumeX, Maximize2, Minimize2,
  Info, RefreshCw, RotateCcw, GraduationCap, Lightbulb, TrendingUp, 
  BarChart3, ArrowRight, Brain, Users, AlertTriangle, Target, 
  CheckCircle, XCircle, Play, Share2, ChevronRight, Clock, Search,
  Activity, Layers, Crosshair, LogOut, Sparkles
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';
import PlayAgainButton from '../../../../../components/PlayAgainButton';

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
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
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

  playTargetFlush() { this.playTone(600, 'sine', 0.2, 0.05); } 
  playPerfect()     { this.playTone(880, 'sine', 0.15, 0.1); }   
  playStreak()      { this.playTone(1046.5, 'triangle', 0.3, 0.12); } 
  playFail()        { this.playTone(180, 'sawtooth', 0.2, 0.08); } 
  playDepleted()    { this.playTone(100, 'square', 0.4, 0.15); }
  
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
        <div className="absolute inset-0 flex items-center justify-center bg-[#050508] rounded-2xl z-[100] border border-blue-500/30">
          <div className="text-center p-6 max-w-sm">
            <AlertTriangle className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-white text-lg font-bold mb-2">Engine Fault Detected</h3>
            <p className="text-gray-400 text-sm mb-6">The visual engine encountered a frame error.</p>
            <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]">Reboot Engine</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================
// CONSTANTS
// ============================================================
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous I, O, 0, 1
const GRID_SIZE = 100; // 10x10
const TARGET_REFRESH_INTERVAL = 15000; // Target swaps every 15s

function getRandomChar() { return CHARS[Math.floor(Math.random() * CHARS.length)]; }
function getRandomString() { return getRandomChar() + getRandomChar(); }

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function EntropicGridClient() {
  // === UI State ===
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game State (Economy & Metrics) ===
  const [customScore, setCustomScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentTarget, setCurrentTarget] = useState('--');
  const [currentDifficulty, setCurrentDifficulty] = useState(1);

  // === Engine Setup ===
  const engine = useGameEngine({
    category: 'visual',
    drillId: 'entropic-grid',
    drillName: 'Entropic Grid',
    totalGameTime: 9999, // Overridden by local strict economy clock
    sharePath: 'drills/visual/visual-recognition/entropic-grid',
  });

  // Refs for zero-latency tracking
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const engineRef = useRef(engine);
  
  const timerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const targetRefreshIntervalRef = useRef(null);

  const cellsRef = useRef([]); // Stores grid state { text, hitTime, missTime }
  const targetStringRef = useRef('--');
  
  const customScoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const localTimeRef = useRef(60);
  const isActiveRef = useRef(false);
  const isTimeUpRef = useRef(false);
  const gameStateRef = useRef(engine.gameState);
  
  // Dynamic Entropy Timing
  const lastEntropyTimeRef = useRef(0);

  useEffect(() => { 
    gameStateRef.current = engine.gameState; 
    engineRef.current = engine;
  }, [engine]);

  // Init
  useEffect(() => {
    setIsClient(true);
    try { 
      const name = localStorage.getItem('skilldrills_player_name'); 
      if (name) setPlayerNameInput(name); 
      
      const s = localStorage.getItem('entropicGridBestScore_v4'); 
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
      const currentBest = parseInt(localStorage.getItem('entropicGridBestScore_v4') || '0', 10); 
      if (finalScore > currentBest) { 
        localStorage.setItem('entropicGridBestScore_v4', finalScore.toString()); 
        setBestScore(finalScore); 
      } 
    } catch(e) {} 
  }, []);

  // Strict Economy Logic
  const updateEconomy = useCallback((scoreDelta, timeDelta) => {
    setCustomScore(prev => {
      const updated = Math.max(0, prev + scoreDelta);
      customScoreRef.current = updated;
      return updated;
    });

    // Clamp time strictly between 0 and 60
    localTimeRef.current = Math.min(60, Math.max(0, localTimeRef.current + timeDelta));
    setTimeLeft(Math.ceil(localTimeRef.current));

    if (localTimeRef.current <= 0 && !isTimeUpRef.current) {
        isTimeUpRef.current = true;
        isActiveRef.current = false;
        if (typeof engineRef.current.endGame === 'function') engineRef.current.endGame();
    }
  }, []);

  const clearAllIntervals = useCallback((keepAnimation = false) => { 
    if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; }
    if (targetRefreshIntervalRef.current) { clearInterval(targetRefreshIntervalRef.current); targetRefreshIntervalRef.current = null; }
    if (!keepAnimation && animationRef.current) { cancelAnimationFrame(animationRef.current); animationRef.current = null; }
  }, []);

  useEffect(() => {
    if (engine.gameState === 'ended' || engine.gameState === 'start') {
      clearAllIntervals(false);
      isActiveRef.current = false;
      if (engine.gameState === 'ended') updateLocalBestScore(customScoreRef.current);
    }
  }, [engine.gameState, clearAllIntervals, updateLocalBestScore]);

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen) await containerRef.current?.requestFullscreen(); 
      else if (document.fullscreenElement) await document.exitFullscreen(); 
    } catch (err) {} 
  }, [isFullscreen]);

  const handleExitToStart = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    window.location.reload(); 
  }, []);

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
    }, 600);
  }, []);

  // ============================================================
  // DRILL MECHANICS
  // ============================================================
  const initGrid = useCallback(() => {
    const newTarget = getRandomString();
    targetStringRef.current = newTarget; 
    setCurrentTarget(newTarget);
    
    const newCells = new Array(GRID_SIZE);
    for (let i = 0; i < GRID_SIZE; i++) {
        // ~6% chance for target to spawn natively
        newCells[i] = {
            text: Math.random() > 0.06 ? getRandomString() : newTarget,
            hitTime: 0,
            missTime: 0
        };
    }
    cellsRef.current = newCells;
  }, []);

  // Entropy Physics Logic
  const triggerEntropy = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing' || isTimeUpRef.current) return;
    
    // Scaling Difficulty Parameters
    const baseCorruptCount = 2;
    const addedCorruption = Math.floor(customScoreRef.current / 15); // More score = more corruption
    const currentCorruptCount = Math.min(10, baseCorruptCount + addedCorruption);
    
    // Corrupt random cells
    for (let i = 0; i < currentCorruptCount; i++) {
        const idx = Math.floor(Math.random() * GRID_SIZE);
        const cell = cellsRef.current[idx];
        
        // Prevent corrupting recently interacted cells
        if (cell && (Date.now() - Math.max(cell.hitTime, cell.missTime) > 600)) {
            cell.text = Math.random() > 0.05 ? getRandomString() : targetStringRef.current;
        }
    }
  }, []);

  const handleHit = useCallback((idx) => {
    if (isTimeUpRef.current || !isActiveRef.current) return;

    setSuccessfulHits(p => p + 1);
    
    streakRef.current += 1;
    setStreak(streakRef.current);
    if (streakRef.current > bestStreakRef.current) {
        bestStreakRef.current = streakRef.current;
        setBestStreak(bestStreakRef.current);
    }
    
    // SUCCESS MODIFIERS: +3 PTS | +1.5s
    updateEconomy(3, 1.5);
    
    cellsRef.current[idx].hitTime = Date.now();
    cellsRef.current[idx].text = "++";
    
    if (streakRef.current % 5 === 0 && streakRef.current > 0) {
        if (audioSynth) audioSynth.playStreak();
        triggerFeedback(`🔥 SPEED UP! +3 PTS | +1.5s`, 'success');
    } else {
        if (audioSynth) audioSynth.playPerfect();
        triggerFeedback(`✓ INTERCEPT! +3 PTS | +1.5s`, 'success');
    }
    
    setTimeout(() => {
        if (isActiveRef.current && cellsRef.current[idx]) cellsRef.current[idx].text = getRandomString();
    }, 400);

  }, [updateEconomy, triggerFeedback]);

  const handleMiss = useCallback((idx) => {
    if (isTimeUpRef.current || !isActiveRef.current) return;

    setMissedHits(m => m + 1);
    
    streakRef.current = 0;
    setStreak(0);
    
    // ERROR MODIFIERS: 0 PTS | -0.5s
    updateEconomy(0, -0.5);
    
    cellsRef.current[idx].missTime = Date.now();
    
    if (audioSynth) audioSynth.playFail();
    triggerFeedback(`✗ MISS! -0.5s`, 'error');

  }, [updateEconomy, triggerFeedback]);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => { 
      localTimeRef.current -= 0.1; // Smooth drain mapping
      
      if (localTimeRef.current <= 0) { 
        localTimeRef.current = 0;
        setTimeLeft(0);
        isTimeUpRef.current = true;
        isActiveRef.current = false; 
        clearAllIntervals();
        if (engineRef.current && typeof engineRef.current.endGame === 'function') {
          engineRef.current.endGame();
        }
        return;
      } 
      
      setTimeLeft(prev => {
        const currentCeil = Math.ceil(localTimeRef.current);
        if (currentCeil !== prev) {
          return currentCeil;
        }
        return prev;
      });
    }, 100); 
  }, [clearAllIntervals]);

  // Precision Economy 60s Drain
  useEffect(() => { 
    if (engine.gameState !== 'playing') { 
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      return;
    }
    
    if (!timerIntervalRef.current && !isTimeUpRef.current) {
      startTimer();
    }
    
    return () => { 
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }; 
  }, [engine.gameState, startTimer]);

  // Unified Pointer Handler
  const handlePointerDown = useCallback((e) => { 
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    if (gameStateRef.current !== 'playing' || !isActiveRef.current || isTimeUpRef.current) return; 
    
    e.stopPropagation();

    const cvs = canvasRef.current; 
    if (!cvs) return; 
    
    const r = cvs.getBoundingClientRect(); 
    const cx = (e.clientX - r.left) * (cvs.width / r.width); 
    const cy = (e.clientY - r.top) * (cvs.height / r.height); 
    
    const minDim = Math.min(cvs.width, cvs.height);
    const gridDimension = minDim * 0.95; // Use 95% of available space
    const cellW = gridDimension / 10;
    
    const offsetX = (cvs.width - gridDimension) / 2;
    const offsetY = (cvs.height - gridDimension) / 2;
    
    const col = Math.floor((cx - offsetX) / cellW);
    const row = Math.floor((cy - offsetY) / cellW);
    
    if (col >= 0 && col < 10 && row >= 0 && row < 10) {
        const idx = row * 10 + col;
        const cell = cellsRef.current[idx];
        
        if (cell.text === targetStringRef.current) {
            handleHit(idx);
        } else {
            handleMiss(idx);
        }
    }
  }, [handleHit, handleMiss]);

  // High-Performance Engine Loop
  useEffect(() => { 
    if (engine.gameState !== 'playing') return; 
    const cvs = canvasRef.current; if (!cvs) return; 
    const ctx = cvs.getContext('2d'); 
    
    const updateSize = () => { 
      const ct = containerRef.current; if (!ct) return; 
      const cr = ct.getBoundingClientRect(); 
      
      let w = cr.width, h = cr.height; 
      const isMobileLandscape = window.innerWidth > window.innerHeight && window.innerWidth < 1024;
      
      if (!document.fullscreenElement && !isMobileLandscape) {
        h = w * (9/16);
        if (h > cr.height) { h = cr.height; w = h * (16/9); }
      }
      
      cvs.width = w; cvs.height = h; 
      cvs.style.width = `${w}px`; 
      cvs.style.height = `${h}px`;
      cvs.style.position = 'absolute'; 
      cvs.style.left = `${(cr.width - w) / 2}px`; 
      cvs.style.top = `${(cr.height - h) / 2}px`; 
    }; 
    
    const ro = new ResizeObserver(updateSize); 
    if (containerRef.current) ro.observe(containerRef.current); 
    window.addEventListener('resize', updateSize); 
    updateSize(); 
    
    lastEntropyTimeRef.current = Date.now();

    function renderExecutionGraph() { 
      if (!isActiveRef.current || isTimeUpRef.current) return;

      // Entropy Timer Execution (Adaptive Speed)
      const currentInterval = Math.max(200, 1000 - (customScoreRef.current * 15)); 
      setCurrentDifficulty(Math.round((1000 - currentInterval) / 10)); // Visual metric 0-80

      const now = Date.now();
      if (now - lastEntropyTimeRef.current > currentInterval) {
        triggerEntropy();
        lastEntropyTimeRef.current = now;
      }

      // Smooth Water-like Progress Bar Update (60FPS Canvas Loop driven)
      const pBar = document.getElementById('entropic-progress-bar');
      if (pBar) {
         pBar.style.width = `${Math.min(100, (localTimeRef.current / 60) * 100)}%`;
         if (localTimeRef.current <= 10) {
             if (!pBar.classList.contains('bg-red-500')) {
                 pBar.className = 'h-full bg-red-500 animate-pulse';
             }
         } else {
             if (!pBar.classList.contains('bg-blue-500')) {
                 pBar.className = 'h-full bg-blue-500';
             }
         }
      }

      // Draw Background Matrix
      ctx.fillStyle = "#050508"; 
      ctx.fillRect(0, 0, cvs.width, cvs.height); 
      
      const minDim = Math.min(cvs.width, cvs.height);
      const gridDimension = minDim * 0.95; 
      const cellW = gridDimension / 10;
      
      const offsetX = (cvs.width - gridDimension) / 2;
      const offsetY = (cvs.height - gridDimension) / 2;
      
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      
      // Smaller, sharper font mapping
      const fontSize = cellW * 0.38;
      ctx.font = `bold ${fontSize}px monospace`;
      
      // Draw Grid Array
      for (let i = 0; i < GRID_SIZE; i++) {
        const col = i % 10;
        const row = Math.floor(i / 10);
        
        const cx = offsetX + col * cellW;
        const cy = offsetY + row * cellW;
        
        const cell = cellsRef.current[i];
        if (!cell) continue;

        const hitDelta = now - cell.hitTime;
        const missDelta = now - cell.missTime;
        
        let bgColor = "rgba(255,255,255,0.015)"; 
        let textColor = "#6b7280"; // Muted gray (default for all cells including target)
        let textShadow = "none";
        
        if (hitDelta < 400) {
            bgColor = "rgba(59,130,246,0.3)"; 
            textColor = "#93c5fd";
            textShadow = "0 0 12px rgba(96,165,250,0.9)";
        } else if (missDelta < 300) {
            bgColor = "rgba(239,68,68,0.3)"; 
            textColor = "#fca5a5";
            textShadow = "0 0 12px rgba(248,113,113,0.9)";
        }
        // Target text color remains identical to other cells (#6b7280) for true visual search purity.
        
        // Inner Cell Structure
        const pad = cellW * 0.05;
        const innerW = cellW - (pad * 2);

        ctx.fillStyle = bgColor;
        ctx.fillRect(cx + pad, cy + pad, innerW, innerW);
        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        ctx.lineWidth = 1;
        ctx.strokeRect(cx + pad, cy + pad, innerW, innerW);
        
        // Data Payload
        ctx.fillStyle = textColor;
        ctx.shadowColor = textColor;
        ctx.shadowBlur = textShadow !== "none" ? 12 : 0;
        ctx.fillText(cell.text, cx + cellW / 2, cy + cellW / 2);
        ctx.shadowBlur = 0; 
      }
      
      animationRef.current = requestAnimationFrame(renderExecutionGraph); 
    } 
    
    animationRef.current = requestAnimationFrame(renderExecutionGraph); 
    return () => { 
      if (animationRef.current) cancelAnimationFrame(animationRef.current); 
      window.removeEventListener('resize', updateSize); 
      ro.disconnect(); 
    }; 
  }, [engine.gameState, triggerEntropy]);

  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    
    setCustomScore(0); 
    customScoreRef.current = 0;
    
    setSuccessfulHits(0); 
    setMissedHits(0);
    setStreak(0); 
    setBestStreak(0);
    
    setTimeLeft(60);
    localTimeRef.current = 60;
    
    streakRef.current = 0;
    bestStreakRef.current = 0;
    
    isTimeUpRef.current = false;
    isActiveRef.current = true; 
    gameStateRef.current = 'playing';
    
    clearAllIntervals(true); 
    
    // Secure Auto-Fullscreen trigger
    try { 
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      }
    } catch (err) {} 
    
    engine.startGame();
    initGrid();
    
    targetRefreshIntervalRef.current = setInterval(() => {
        if (!isActiveRef.current || isTimeUpRef.current) return;
        initGrid();
        if (audioSynth) audioSynth.playTargetFlush();
        triggerFeedback('🔄 MATRIX FLUSH! New Target', 'warning');
    }, TARGET_REFRESH_INTERVAL);
    
    startTimer();
  }, [clearAllIntervals, initGrid, triggerFeedback, engine, startTimer]);

  const shareDrillLink = async () => {
    const url = 'https://skilldrills.online/drills/visual/visual-recognition/entropic-grid';
    if (navigator.share) {
      try { await navigator.share({ title: 'Entropic Grid Drill', text: 'Train your visual scanning speed and accuracy!', url }); } catch(e){}
    } else {
      try { await navigator.clipboard.writeText(url); alert('Link copied!'); } catch(e){}
    }
  };

  const shareScore = useCallback(() => {
    const accuracy = successfulHits + missedHits > 0 ? Math.round((successfulHits / (successfulHits + missedHits)) * 100) : 0;
    let finalRank = 'Bronze';
    if (customScoreRef.current >= 80 && accuracy >= 85) finalRank = 'Grandmaster';
    else if (customScoreRef.current >= 65 && accuracy >= 75) finalRank = 'Master';
    else if (customScoreRef.current >= 50 && accuracy >= 65) finalRank = 'Diamond';
    else if (customScoreRef.current >= 35 && accuracy >= 55) finalRank = 'Platinum';
    else if (customScoreRef.current >= 20 && accuracy >= 45) finalRank = 'Gold';
    else if (customScoreRef.current >= 10) finalRank = 'Silver';

    const text = `🎯 I scored ${customScoreRef.current} PTS with ${accuracy}% accuracy on the Entropic Grid Concentration Drill! Rank: ${finalRank}. Try it here: https://skilldrills.online/drills/visual/visual-recognition/entropic-grid`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'My SkillDrills Visual Score',
        text: text,
        url: 'https://skilldrills.online/drills/visual/visual-recognition/entropic-grid'
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [successfulHits, missedHits]);

  if (loading || !isClient) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Initializing Engine...</p>
        </div>
      </div>
    ); 
  }

  const accuracyPercentage = (successfulHits + missedHits) === 0 ? 0 : Math.round((successfulHits / (successfulHits + missedHits)) * 100);
  const isNewBest = engine.gameState === 'ended' && customScore > bestScore && customScore > 0;

  let gradeLetter = 'F';
  if (accuracyPercentage >= 85 && customScore >= 80) gradeLetter = 'S';
  else if (accuracyPercentage >= 75 && customScore >= 65) gradeLetter = 'A';
  else if (accuracyPercentage >= 65 && customScore >= 50) gradeLetter = 'B';
  else if (accuracyPercentage >= 55 && customScore >= 35) gradeLetter = 'C';
  else if (accuracyPercentage >= 45 && customScore >= 20) gradeLetter = 'D';

  let rankName = 'Bronze';
  let rankColor = 'text-slate-500';
  if (customScore >= 80 && accuracyPercentage >= 85) {
    rankName = 'Grandmaster';
    rankColor = 'text-fuchsia-400 font-extrabold';
  } else if (customScore >= 65 && accuracyPercentage >= 75) {
    rankName = 'Master';
    rankColor = 'text-red-400 font-extrabold';
  } else if (customScore >= 50 && accuracyPercentage >= 65) {
    rankName = 'Diamond';
    rankColor = 'text-cyan-400 font-extrabold';
  } else if (customScore >= 35 && accuracyPercentage >= 55) {
    rankName = 'Platinum';
    rankColor = 'text-indigo-400 font-extrabold';
  } else if (customScore >= 20 && accuracyPercentage >= 45) {
    rankName = 'Gold';
    rankColor = 'text-yellow-400 font-extrabold';
  } else if (customScore >= 10) {
    rankName = 'Silver';
    rankColor = 'text-gray-300 font-extrabold';
  }

  let diagnostics = "Superb visual scanning speed and spatial stamina! Your focus resists high-entropy noise levels.";
  if (accuracyPercentage < 50) {
    diagnostics = "Low visual scanning accuracy. Slow down slightly to avoid false positives in the grid cells.";
  } else if (customScore < 30) {
    diagnostics = "Increase your strike speed to stay ahead of the natural stamina decay curve and keep the round active.";
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
              <li className="text-blue-400 font-medium">Entropic Grid</li>
            </ol>
          </nav>
        )}
        
        {/* Header Layout */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Search className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Entropic Grid Lab</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Dynamic Visual Search • Rapid Recognition</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              
              {engine.gameState === 'playing' && !isTimeUpRef.current && (
                <button onClick={() => { if(engine.endGame) engine.endGame(); handleStartGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset"><RefreshCw className="w-5 h-5" /></button>
              )}
              <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
            </div>
          </div>
        )}

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

        {/* Telemetry Matrix Grid Display */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
            <StatCard icon={<Target className="text-blue-400" />} value={customScore} label="Score" />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={timeLeft} label="Time" unit="s" />
            <StatCard icon={<Trophy className="text-yellow-400" />} value={Math.max(bestScore, customScore)} label="Best" />
            <StatCard icon={<Activity className="text-purple-400" />} value={accuracyPercentage} label="Accuracy" unit="%" />
            <StatCard icon={<CheckCircle className="text-emerald-400" />} value={successfulHits} label="Hits" />
            <StatCard icon={<XCircle className="text-red-400" />} value={missedHits} label="Miss/Err" />
            <StatCard icon={<TrendingUp className="text-orange-400" />} value={streak} label="Streak" />
            <StatCard icon={<Layers className="text-pink-400" />} value={currentDifficulty} label="Entropy Spd" unit="v" />
          </div>
        )}

        {/* Contextual Strike Feedback Node */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          <div className={`px-5 py-1.5 rounded-full font-black tracking-widest text-sm shadow-xl transition-all duration-200 ${localFeedback.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : localFeedback.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-yellow-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
            {localFeedback.text || '\u00A0'}
          </div>
        </div>

        {/* Core Canvas Frame Block */}
        <GameErrorBoundary>
          <div ref={containerRef} 
            onPointerDown={handlePointerDown}
            className={`relative overflow-hidden flex flex-col transition-all duration-100 z-10 ${
              isFullscreen 
                ? 'fixed inset-0 z-50 w-screen h-screen bg-[#050508]' 
                : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[600px] lg:min-h-[650px]'
            }`}
            style={{ 
              margin: '0 auto', 
              background: '#050508',
              touchAction: 'none'
            }}>
            
            {/* Smooth Time Progress Strip */}
            {engine.gameState === 'playing' && !isTimeUpRef.current && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
                <div 
                  id="entropic-progress-bar"
                  className="h-full bg-blue-500"
                />
              </div>
            )}

            {/* Current Target HUD Node */}
            {engine.gameState === 'playing' && !isTimeUpRef.current && (
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-[60] flex flex-col items-start pointer-events-none">
                <span className="text-[10px] sm:text-xs font-bold text-gray-500 tracking-widest uppercase mb-1">Active Target</span>
                <div className="bg-blue-900/40 border border-blue-500/50 px-4 py-1.5 sm:px-6 sm:py-2 rounded-xl backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <span className="text-xl sm:text-3xl font-black text-blue-400 tracking-[0.2em]">{currentTarget}</span>
                </div>
              </div>
            )}

            {/* Fullscreen HUD Elements */}
            {isFullscreen && engine.gameState === 'playing' && !isTimeUpRef.current && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={() => { if(engine.endGame) engine.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
              </div>
            )}

            <canvas 
              ref={canvasRef} 
              className="block absolute touch-none pointer-events-none z-[10]" 
            />

            {/* Cleaned Mobile-Optimized Start Screen */}
            {engine.gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm p-4 overflow-y-auto pointer-events-auto">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full border border-gray-700 bg-gray-900 shadow-2xl flex flex-col my-auto shrink-0">
                  <div className="flex-1 mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] rotate-3">
                      <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black mb-2 tracking-tight text-white">Entropic Grid</h2>
                  </div>

                  <button onPointerDown={(e)=>e.stopPropagation()} onClick={handleStartGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:outline-none shrink-0">
                    <Play className="w-5 h-5 fill-white" />
                    START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Premium Custom Structural End Card Component */}
            {(engine.gameState === 'ended' || isTimeUpRef.current) && (
              <div className="absolute inset-0 bg-[#05070e]/98 overflow-y-auto p-6 z-[70] select-none scrollbar-thin scroll-smooth backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto">
                <div className="min-h-full flex flex-col justify-center items-center py-4 w-full">
                  <div className="max-w-md w-full text-center">
                    {customScore > 0 && customScore >= (bestScore || 0) && (
                      <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce font-mono">
                        ⭐ NEW PERSONAL BEST!
                      </div>
                    )}
                    
                    <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1 font-mono">
                      Drill Complete
                    </h2>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-mono">
                      Entropic Grid Lab
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
                        <span className="text-sm font-black text-green-400">{bestScore}</span>
                      </div>
                      
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Total Hits</span>
                        <span className="text-sm font-black text-emerald-400">{successfulHits}</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Miss/Error</span>
                        <span className="text-sm font-black text-red-400">{missedHits}</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold font-mono">Grade</span>
                        <span className="text-sm font-black text-pink-400 font-mono">{gradeLetter}</span>
                      </div>
                    </div>

                    <div className="bg-[#0b0f19] border border-slate-850 p-3 rounded-xl mb-4 text-left font-sans">
                      <span className={`text-xs font-black block text-center uppercase tracking-widest ${rankColor} mb-2`}>
                        Rank: {rankName}
                      </span>
                      <div className="w-full h-px bg-slate-850 mb-2"></div>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-white uppercase mb-1 font-mono">
                        <Sparkles className="w-3 h-3 text-amber-500" /> Diagnostics advice:
                      </div>
                      <p className="text-[10px] text-slate-400 leading-normal font-sans">
                        {diagnostics}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <PlayAgainButton
                        onClick={() => { if(engine.endGame) engine.endGame(); handleStartGame(); }}
                        colorTheme="blue"
                      />
                      <button
                        onPointerDown={(e)=>e.stopPropagation()}
                        onClick={shareScore}
                        className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors active:scale-95 flex items-center justify-center"
                        title="Share Score"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      {isFullscreen && (
                        <button
                          onPointerDown={(e)=>e.stopPropagation()}
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

        {/* ========================================== */}
        {/* DRILL RULES / INSTRUCTIONS                 */}
        {/* ========================================== */}
        {!isFullscreen && (
          <section className="mt-10 pointer-events-none">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Correct ID =" highlight="Tap Active Target" result="+3 PTS | +1.5s Clock" />
                  <RuleItem num="2" color="cyan" text="Entropy Scaling" highlight="Speed increases on score" result="Adaptive Matrix System" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Wrong Selection" result="0 PTS | -0.5s Clock" />
                  <RuleItem num="4" color="orange" text="Time Depletion" result="Timer Caps Strictly [0s - 60s]" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================== */}
        {/* ABOUT, HOW TO PLAY & FAQ ACCORDIONS        */}
        {/* ========================================== */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-blue-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About This Entropic Grid Drill</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  Entropic Grid tests pure visual search speed, pattern recognition under noise, and cognitive endurance. It trains your ability to rapidly scan a complex data matrix, locate a specific string, and execute precise physical input before time runs out. The time-attack economy demands high accuracy to survive the constant drain.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Target Audience</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Esports professionals tracking HUD elements, tactical operators scanning radar signatures, and users seeking to optimize rapid visual attention shifting and pattern isolation.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><Activity className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Trained</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Sustained visual attention, conjunctive search speed, cognitive filtering of visual noise, and direct hand-eye execution accuracy.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Performance Metrics</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Total volume of accurate identifications, absolute precision index, accuracy ratio, and adaptation to extreme entropy scaling.</p>
                  </div>
                </div>

                {/* How to Play Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play</h3>
                  </div>
                  <ol className="list-decimal pl-5 space-y-2 text-xs text-gray-400 leading-relaxed">
                    <li><strong className="text-gray-200">Identify the Target:</strong> Observe the active 2-character target displayed in the HUD node (top-left).</li>
                    <li><strong className="text-gray-200">Scan the Grid:</strong> Rapidly scan the 100-cell matrix to find matching string signatures. Multiple copies can exist simultaneously.</li>
                    <li><strong className="text-gray-200">Execute Strike:</strong> Click or tap directly on the matching cell to log a hit.</li>
                    <li><strong className="text-gray-200">Manage Economy:</strong> Striking the correct cell awards points and adds seconds to your timer. Incorrect inputs apply a time penalty (-0.5s) but do not reduce your score.</li>
                  </ol>
                </div>

                {/* FAQ Accordion Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-blue-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">How exactly does the entropy scaling work?</h4>
                      <p className="text-xs text-gray-400 mt-1">Difficulty is dictated by an adaptive engine. As your active score grows, the engine aggressively increases the frequency and volume of background cell corruption, forcing your brain to filter heavier visual noise.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why does my timer not exceed 60 seconds?</h4>
                      <p className="text-xs text-gray-400 mt-1">To ensure the integrity of the endurance pressure, the system institutes a hard 60-second cap. Perfect shots (+1.5s) cannot artificially inflate the clock forever; they simply keep you alive against the constant drain.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ========================================== */}
        {/* RELATED DRILLS (Strictly 4)                */}
        {/* ========================================== */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related visual and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-blue-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/visual/visual-recognition/visual-search" title="Visual Search" desc="Conjunctive search for hidden items." color="blue" icon={<Search className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/visual-recognition/difference-spotter" title="Difference Spotter" desc="Spot the change after a visual blink." color="cyan" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/visual-recognition/rapid-object-id" title="Neural Shape ID" desc="Train rapid shape recognition." color="purple" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/tracking-accuracy/moving-target" title="Kinetic Intercept" desc="Train moving target tracking speed." color="orange" icon={<Crosshair className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* ========================================== */}
        {/* FOOTER                                     */}
        {/* ========================================== */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Visual Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual/visual-recognition/entropic-grid" className="hover:text-blue-400 transition-colors">Entropic Grid</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-blue-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-blue-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-blue-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-blue-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-blue-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-blue-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-blue-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic" className="hover:text-blue-400 transition-colors">Academic (12)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-blue-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500/25 to-indigo-500/25 border border-blue-500/30 rounded-lg flex items-center justify-center">
                    <Search className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
                  Open-source telemetry training platform. Free forever. No downloads required.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {/* YouTube */}
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  {/* Facebook */}
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  {/* Twitter / X */}
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="X / Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  {/* Pinterest */}
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

// ==========================================
// UTILITY COMPONENTS
// ==========================================
function StatCard({ icon, value, label, unit = '' }) {
  return (
    <div className="group rounded-xl border border-slate-900 bg-slate-950/40 p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-slate-800 backdrop-blur-sm">
      <div className="mb-0.5 flex justify-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{icon}</div>
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
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500',
    red: 'bg-red-600 text-red-300 border-red-500', 
    purple: 'bg-purple-600 text-purple-300 border-purple-500',
    green: 'bg-green-600 text-green-300 border-green-500',
    orange: 'bg-orange-600 text-orange-300 border-orange-500'
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
    orange: 'from-orange-500 to-amber-500',
    emerald: 'from-emerald-500 to-green-500',
    indigo: 'from-indigo-500 to-blue-500',
    red: 'from-red-500 to-rose-500',
    green: 'from-green-500 to-emerald-500'
  };
  
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:-translate-y-1 hover:border-blue-500/50">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-blue-500 to-indigo-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-blue-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-blue-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}