'use client';

import { Component, useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Eye, Zap, Timer, Trophy, Volume2, VolumeX, Maximize2, Minimize2,
  Info, RefreshCw, RotateCcw, GraduationCap, Lightbulb, TrendingUp, 
  BarChart3, ArrowRight, Brain, Users, AlertTriangle, Target, 
  CheckCircle, XCircle, Play, Share2, ChevronRight, Activity, 
  Grid3X3, Search, LogOut, Sparkles
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
  playStreak()  { this.playTone(1046.5, 'triangle', 0.3, 0.12); } 
  playFail()    { this.playTone(330, 'sawtooth', 0.2, 0.08); } 
  playTimeout() { this.playTone(220, 'square', 0.3, 0.1); }
  
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
// CONSTANTS
// ============================================================
const GRID_COLS = 6;
const GRID_ROWS = 6;
const TOTAL_CELLS = GRID_COLS * GRID_ROWS;
const STEADY_PULSE_DURATION = 2000;

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function RhythmAnomalyClient() {
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
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [timeouts, setTimeouts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [speedLevel, setSpeedLevel] = useState(1);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);

  // === Engine Setup ===
  const engine = useGameEngine({
    category: 'visual',
    drillId: 'rhythm-anomaly',
    drillName: 'Rhythm Anomaly',
    totalGameTime: 9999, 
    sharePath: 'drills/visual/visual-recognition/rhythm-anomaly',
  });

  // Refs for zero-latency tracking
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const engineRef = useRef(engine);
  
  const timerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);

  const cellsRef = useRef([]); 
  const anomalyIndexRef = useRef(-1);
  const anomalySpawnTimeRef = useRef(0);
  const anomalyDurationRef = useRef(1400); 
  const entropyIntervalRef = useRef(800);
  const timeoutLimitRef = useRef(8000); 
  
  const lastEntropyTimeRef = useRef(0);
  
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const localTimeRef = useRef(60.0);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef(engine.gameState);

  useEffect(() => { 
    gameStateRef.current = engine.gameState; 
    engineRef.current = engine;
    if (engine.gameState === 'playing') {
      setIsNewBest(false);
    }
  }, [engine.gameState]);

  // Init
  useEffect(() => {
    setIsClient(true);
    try { 
      const name = localStorage.getItem('skilldrills_player_name'); 
      if (name) setPlayerNameInput(name); 
      
      const s = localStorage.getItem('rhythmAnomalyBestScore_v6'); 
      if (s) { const p = parseInt(s,10); if (!isNaN(p)) setBestScore(p); }
    } catch (e) {}
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  // Audio Sync
  useEffect(() => { if (audioSynth) audioSynth.setEnabled(soundEnabled); }, [soundEnabled]);

  // Mobile & Orientation Guard
  useEffect(() => {
    const checkOrientationAndSize = () => {
      if (typeof window === 'undefined') return;
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '') || window.innerWidth < 1024;
      
      if (!isMobile) { 
        setShowRotateWarning(false); 
        return; 
      }
      
      const isPortrait = window.innerHeight > window.innerWidth;
      setShowRotateWarning(isPortrait);
    };
    
    checkOrientationAndSize();
    window.addEventListener('resize', checkOrientationAndSize);
    window.addEventListener('orientationchange', checkOrientationAndSize);
    return () => { 
      window.removeEventListener('resize', checkOrientationAndSize); 
      window.removeEventListener('orientationchange', checkOrientationAndSize); 
    };
  }, []);

  // Fullscreen Detection
  useEffect(() => { 
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', fsHandler); 
    return () => document.removeEventListener('fullscreenchange', fsHandler); 
  }, []);

  const updateLocalBestScore = useCallback((finalScore) => { 
    try { 
      const currentBest = parseInt(localStorage.getItem('rhythmAnomalyBestScore_v6') || '0', 10); 
      if (finalScore > currentBest && finalScore > 0) { 
        localStorage.setItem('rhythmAnomalyBestScore_v6', finalScore.toString()); 
        setBestScore(finalScore); 
        setIsNewBest(true);
      } 
    } catch(e) {} 
  }, []);

  // Game End Logic
  useEffect(() => {
    if (engine.gameState === 'ended') {
      updateLocalBestScore(scoreRef.current);
    }
  }, [engine.gameState, updateLocalBestScore]);

  useEffect(() => {
    if (engine.gameState === 'ended' || engine.gameState === 'start') {
      isActiveRef.current = false;
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  }, [engine.gameState]);

  const enterFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    try {
      const el = containerRef.current;
      const reqFS = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
      if (reqFS) await reqFS.call(el);
    } catch (err) {}
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {}
  }, []);

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!document.fullscreenElement) await enterFullscreen(); 
      else await exitFullscreen(); 
    } catch (err) {} 
  }, [enterFullscreen, exitFullscreen]);

  const handleExitGame = useCallback(async () => {
    await exitFullscreen();
    window.location.reload();
  }, [exitFullscreen]);

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
  // DRILL MECHANICS (Endless Time-Attack)
  // ============================================================
  const relocateAnomaly = useCallback(() => {
    let newIdx;
    do { newIdx = Math.floor(Math.random() * TOTAL_CELLS); } 
    while (newIdx === anomalyIndexRef.current);
    
    anomalyIndexRef.current = newIdx;
    anomalySpawnTimeRef.current = performance.now();
  }, []);

  const initGrid = useCallback(() => {
    const newCells = new Array(TOTAL_CELLS);
    for (let i = 0; i < TOTAL_CELLS; i++) {
        newCells[i] = { hitTime: 0, missTime: 0, entropyTime: 0 };
    }
    cellsRef.current = newCells;
    relocateAnomaly();
  }, [relocateAnomaly]);

  const handlePenalty = useCallback((type) => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    streakRef.current = 0;
    setStreak(0);
    
    // Remove negative scoring penalty
    setScore(scoreRef.current);
    if (engineRef.current && typeof engineRef.current.setScore === 'function') {
      engineRef.current.setScore(scoreRef.current);
    }
    
    localTimeRef.current = Math.max(0, localTimeRef.current - 1);
    setLocalTimeRemaining(localTimeRef.current);
    
    const baseSpeedShift = Math.floor(scoreRef.current / 12) * 20;
    anomalyDurationRef.current = Math.min(1950, 1400 + baseSpeedShift);
    entropyIntervalRef.current = Math.min(800, 800 - (scoreRef.current * 5) + 50);
    timeoutLimitRef.current = Math.min(8000, 8000 - (scoreRef.current * 100) + 500);
    setSpeedLevel(Math.max(1, Math.floor((anomalyDurationRef.current - 1400) / 20) + 1));

    if (localTimeRef.current <= 0) {
      setIsTimeUp(true);
      isActiveRef.current = false;
      if (typeof engineRef.current?.endGame === 'function') {
        engineRef.current.endGame();
      }
      return;
    }

    if (type === 'miss') {
      setMissedHits(m => m + 1);
      if (audioSynth) audioSynth.playFail();
      triggerFeedback(`✗ Wrong! -1s`, 'error');
    } else {
      setTimeouts(t => t + 1);
      if (audioSynth) audioSynth.playTimeout();
      triggerFeedback(`⏳ Timeout! -1s`, 'warning');
      relocateAnomaly(); 
    }
  }, [triggerFeedback, relocateAnomaly]);

  const handleHit = useCallback((idx) => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    setSuccessfulHits(p => p + 1);
    
    streakRef.current += 1;
    setStreak(streakRef.current);
    if (streakRef.current > bestStreakRef.current) {
        bestStreakRef.current = streakRef.current;
        setBestStreak(bestStreakRef.current);
    }
    
    scoreRef.current += 3;
    setScore(scoreRef.current);
    if (engineRef.current && typeof engineRef.current.setScore === 'function') {
      engineRef.current.setScore(scoreRef.current);
    }
    
    localTimeRef.current = Math.min(60, localTimeRef.current + 2);
    setLocalTimeRemaining(localTimeRef.current);
    
    const baseSpeedShift = Math.floor(scoreRef.current / 12) * 20;
    anomalyDurationRef.current = Math.min(1950, 1400 + baseSpeedShift + (streakRef.current * 4));
    entropyIntervalRef.current = Math.max(200, 800 - (scoreRef.current * 5));
    timeoutLimitRef.current = Math.max(3000, 8000 - (scoreRef.current * 100));
    
    setSpeedLevel(Math.max(1, Math.floor((anomalyDurationRef.current - 1400) / 20) + 1));

    cellsRef.current[idx].hitTime = Date.now();
    
    if (streakRef.current % 5 === 0 && streakRef.current > 0) {
        if (audioSynth) audioSynth.playStreak();
        triggerFeedback(`🔥 ${streakRef.current} Streak! +3 PTS | +2s`, 'success');
    } else {
        if (audioSynth) audioSynth.playPerfect();
        triggerFeedback(`✓ Found! +3 PTS | +2s`, 'success');
    }
    
    relocateAnomaly();
  }, [triggerFeedback, relocateAnomaly]);

  // Decoupled Precision Timer
  useEffect(() => { 
    if (engine.gameState === 'playing') { 
      timerIntervalRef.current = setInterval(() => { 
        localTimeRef.current -= 0.1;
        
        if (localTimeRef.current <= 0) { 
          localTimeRef.current = 0;
          setLocalTimeRemaining(0);
          setIsTimeUp(true);
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

  // Click / Touch Handler on Canvas Grid
  const handlePointerDown = useCallback((e) => { 
    if (gameStateRef.current !== 'playing' || !isActiveRef.current) return; 
    
    const cvs = canvasRef.current; 
    if (!cvs) return; 
    
    const r = cvs.getBoundingClientRect(); 
    const cx = e.clientX - r.left; 
    const cy = e.clientY - r.top; 
    
    // Grid bounds calculations
    const minDim = Math.min(cvs.width, cvs.height);
    const gridDimension = minDim * 0.90; 
    const cellW = gridDimension / GRID_COLS;
    
    const offsetX = (cvs.width - gridDimension) / 2;
    const offsetY = (cvs.height - gridDimension) / 2;
    
    const col = Math.floor((cx - offsetX) / cellW);
    const row = Math.floor((cy - offsetY) / cellW);
    
    // Bounds check
    if (col >= 0 && col < GRID_COLS && row >= 0 && row < GRID_ROWS) {
        const idx = row * GRID_COLS + col;
        if (idx === anomalyIndexRef.current) {
            handleHit(idx);
        } else {
            cellsRef.current[idx].missTime = Date.now();
            handlePenalty('miss');
        }
    }
  }, [handleHit, handlePenalty]);

  // High-Performance Canvas Render Loop
  useEffect(() => { 
    if (engine.gameState !== 'playing') return; 
    const cvs = canvasRef.current; if (!cvs) return; 
    const ctx = cvs.getContext('2d'); 
    
    const updateSize = () => { 
      const ct = containerRef.current; if (!ct) return; 
      const cr = ct.getBoundingClientRect(); 
      const w = cr.width; 
      const h = cr.height; 
      cvs.width = w; 
      cvs.height = h; 
      cvs.style.width = `${w}px`; 
      cvs.style.height = `${h}px`;
      cvs.style.position = 'absolute'; 
      cvs.style.left = `0px`; 
      cvs.style.top = `0px`; 
    }; 
    
    const ro = new ResizeObserver(updateSize); 
    if (containerRef.current) ro.observe(containerRef.current); 
    window.addEventListener('resize', updateSize); 
    updateSize(); 
    
    function draw() { 
      if (!isActiveRef.current) return;
      const now = performance.now();

      // Clear Background (Pure Black to isolate flashes)
      ctx.fillStyle = "#020202"; 
      ctx.fillRect(0, 0, cvs.width, cvs.height); 
      
      const minDim = Math.min(cvs.width, cvs.height);
      const gridDimension = minDim * 0.90; 
      const cellW = gridDimension / GRID_COLS;
      
      const offsetX = (cvs.width - gridDimension) / 2;
      const offsetY = (cvs.height - gridDimension) / 2;
      
      // Calculate Pulses (Math.pow gives a sharp, sudden flash)
      const steadyPhase = (now % STEADY_PULSE_DURATION) / STEADY_PULSE_DURATION;
      const anomalyPhase = (now % anomalyDurationRef.current) / anomalyDurationRef.current;

      const steadyIntensity = Math.pow(Math.sin(steadyPhase * Math.PI), 6);
      const anomalyIntensity = Math.pow(Math.sin(anomalyPhase * Math.PI), 6);

      // Generate exact Hex-equivalent RGBs
      const getRGB = (intensity, peakAdd) => {
          const v = Math.floor(10 + peakAdd * intensity); 
          return `rgb(${v}, ${v}, ${v})`; 
      };
      
      const steadyColor = getRGB(steadyIntensity, 16); 
      const anomalyColor = getRGB(anomalyIntensity, 32); 

      // Handle Entropy Scrambling
      if (now - lastEntropyTimeRef.current > entropyIntervalRef.current) {
          for (let k = 0; k < 3; k++) {
              const rIdx = Math.floor(Math.random() * TOTAL_CELLS);
              if (cellsRef.current[rIdx]) {
                  cellsRef.current[rIdx].entropyTime = now;
              }
          }
          lastEntropyTimeRef.current = now;
      }

      // Handle Timeout check
      if (now - anomalySpawnTimeRef.current > timeoutLimitRef.current) {
          handlePenalty('timeout');
      }

      const sysTime = Date.now();

      // Draw Grid
      for (let i = 0; i < TOTAL_CELLS; i++) {
        const col = i % GRID_COLS;
        const row = Math.floor(i / GRID_COLS);
        
        const cx = offsetX + col * cellW;
        const cy = offsetY + row * cellW;
        
        const cell = cellsRef.current[i];
        if (!cell) continue;

        let bgColor = i === anomalyIndexRef.current ? anomalyColor : steadyColor;
        
        // Visual Hit/Miss/Entropy Feedback Overrides
        const hitDelta = sysTime - cell.hitTime;
        const missDelta = sysTime - cell.missTime;
        const entropyDelta = now - cell.entropyTime;
        
        if (hitDelta < 400) {
            bgColor = "rgba(59,130,246,0.6)"; // Bright Blue
        } else if (missDelta < 400) {
            bgColor = "rgba(239,68,68,0.6)"; // Bright Red
        } else if (entropyDelta < 150) {
            bgColor = "rgba(255,255,255,0.04)"; // Subtle visual flicker distraction
        }
        
        // Draw Cell Background / Border
        ctx.fillStyle = bgColor;
        ctx.fillRect(cx + 2, cy + 2, cellW - 4, cellW - 4);
        
        // Almost invisible border
        ctx.strokeStyle = "rgba(255,255,255,0.02)"; 
        ctx.lineWidth = 1;
        ctx.strokeRect(cx + 2, cy + 2, cellW - 4, cellW - 4);
      }
      
      animationRef.current = requestAnimationFrame(draw); 
    } 
    
    animationRef.current = requestAnimationFrame(draw); 
    return () => { 
      if (animationRef.current) cancelAnimationFrame(animationRef.current); 
      window.removeEventListener('resize', updateSize); 
      ro.disconnect(); 
    }; 
  }, [engine.gameState, handlePenalty]);

  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    await enterFullscreen();
    
    setScore(0); 
    setIsNewBest(false);
    setIsTimeUp(false);
    setSuccessfulHits(0); setMissedHits(0); setTimeouts(0);
    setStreak(0); setBestStreak(0); setSpeedLevel(1);
    
    localTimeRef.current = 60.0;
    setLocalTimeRemaining(60.0);
    
    scoreRef.current = 0; 
    streakRef.current = 0;
    bestStreakRef.current = 0;
    anomalyDurationRef.current = 1400; // Reset to base speed
    entropyIntervalRef.current = 800;
    timeoutLimitRef.current = 8000;
    isActiveRef.current = true; 
    gameStateRef.current = 'playing';
    
    engine.startGame();
    initGrid();
  }, [initGrid, engine, enterFullscreen]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly';
    if (navigator.share) {
      navigator.share({ title: 'Rhythm Anomaly Drill', text: 'Train your visual scanning and temporal perception! Free!', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  const shareScore = useCallback(() => {
    const accuracy = successfulHits + missedHits + timeouts > 0 ? Math.round((successfulHits / (successfulHits + missedHits + timeouts)) * 100) : 0;
    let finalRank = 'Bronze';
    if (scoreRef.current >= 80 && accuracy >= 85) finalRank = 'Grandmaster';
    else if (scoreRef.current >= 65 && accuracy >= 75) finalRank = 'Master';
    else if (scoreRef.current >= 50 && accuracy >= 65) finalRank = 'Diamond';
    else if (scoreRef.current >= 35 && accuracy >= 55) finalRank = 'Platinum';
    else if (scoreRef.current >= 20 && accuracy >= 45) finalRank = 'Gold';
    else if (scoreRef.current >= 10) finalRank = 'Silver';

    const text = `🎯 I scored ${scoreRef.current} PTS with ${accuracy}% accuracy on the Rhythm Anomaly Visual Timing Drill! Rank: ${finalRank}. Try it here: https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'My SkillDrills Visual Score',
        text: text,
        url: 'https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly'
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [successfulHits, missedHits, timeouts]);

  if (loading || !isClient) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    ); 
  }

  const accuracyPercentage = (successfulHits + missedHits + timeouts) === 0 ? 100 : Math.round((successfulHits / (successfulHits + missedHits + timeouts)) * 100);
  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracyPercentage;

  let gradeLetter = 'F';
  if (accuracyPercentage >= 85 && score >= 80) gradeLetter = 'S';
  else if (accuracyPercentage >= 75 && score >= 65) gradeLetter = 'A';
  else if (accuracyPercentage >= 65 && score >= 50) gradeLetter = 'B';
  else if (accuracyPercentage >= 55 && score >= 35) gradeLetter = 'C';
  else if (accuracyPercentage >= 45 && score >= 20) gradeLetter = 'D';

  let rankName = 'Bronze';
  let rankColor = 'text-slate-500';
  if (score >= 80 && accuracyPercentage >= 85) {
    rankName = 'Grandmaster';
    rankColor = 'text-fuchsia-400 font-extrabold';
  } else if (score >= 65 && accuracyPercentage >= 75) {
    rankName = 'Master';
    rankColor = 'text-red-400 font-extrabold';
  } else if (score >= 50 && accuracyPercentage >= 65) {
    rankName = 'Diamond';
    rankColor = 'text-cyan-400 font-extrabold';
  } else if (score >= 35 && accuracyPercentage >= 55) {
    rankName = 'Platinum';
    rankColor = 'text-indigo-400 font-extrabold';
  } else if (score >= 20 && accuracyPercentage >= 45) {
    rankName = 'Gold';
    rankColor = 'text-yellow-400 font-extrabold';
  } else if (score >= 10) {
    rankName = 'Silver';
    rankColor = 'text-gray-300 font-extrabold';
  }

  let diagnostics = "Sensational temporal tracking! Your ability to isolate subtle phase differences against visual noise is superior.";
  if (accuracyPercentage < 50) {
    diagnostics = "Low rhythm discrimination accuracy. Watch the pulse intervals longer to confirm the faster anomaly.";
  } else if (timeouts > 3) {
    diagnostics = "Too many timeouts. Scan the grid columns faster to locate the anomaly before the timeout limit hits.";
  } else if (score < 30) {
    diagnostics = "Speed up your clicks to keep the dynamic scaling active and build your score multiplier.";
  }

  return (
    <div className="min-h-screen select-none bg-black text-white selection:bg-transparent" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/drills/visual" className="text-gray-500 hover:text-gray-300 transition-colors">Visual Drills</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-blue-400 font-medium">Rhythm Anomaly</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Grid3X3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Rhythm Anomaly</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Temporal Perception • Pulse Detection • Endless Survival</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            
            {engine.gameState === 'playing' && !isTimeUp && (
              <button onClick={() => { engine.endGame(); handleStartGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset"><RefreshCw className="w-5 h-5" /></button>
            )}
            <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
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

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-2 w-full">
          <StatCard icon={<Target className="text-blue-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
          <StatCard icon={<Zap className="text-yellow-400" />} value={`Lv.${speedLevel}`} label="Speed" />
          <StatCard icon={<Activity className="text-emerald-400" />} value={accuracyPercentage} label="Accuracy" unit="%" />
          <StatCard icon={<Trophy className="text-purple-400" />} value={Math.max(bestScore, score)} label="Best" />
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
            className={`relative overflow-hidden flex flex-col transition-colors duration-100 mx-auto ${
              isFullscreen 
                ? 'fixed inset-0 z-50 flex items-center justify-center' 
                : 'rounded-2xl border border-gray-700 shadow-2xl w-full h-[65vh] md:h-[75vh] min-h-[400px] max-h-[700px]'
            }`}
            style={{ 
              touchAction: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto', 
              overscrollBehavior: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto',
              backgroundColor: '#050508',
              ...(isFullscreen && { width: '100vw', height: '100vh', maxWidth: 'none', margin: 0, borderRadius: 0, border: 'none' })
            }}>
            
            {/* Time Progress Bar */}
            {engine.gameState === 'playing' && !isTimeUp && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
                <div 
                  className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
                />
              </div>
            )}

            {showRotateWarning && engine.gameState !== 'playing' && (
              <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 backdrop-blur-sm touch-none">
                <div className="animate-bounce mb-6 text-blue-500">
                  <RotateCcw className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Rotate Device</h3>
                <p className="text-sm text-gray-400 max-w-xs mx-auto">Please rotate your device to landscape mode for the best playing experience.</p>
              </div>
            )}

            {isFullscreen && engine.gameState === 'playing' && !isTimeUp && !showRotateWarning && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); engine.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
                <button onClick={(e) => { e.stopPropagation(); setSoundEnabled(v => !v); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onClick={(e) => { e.stopPropagation(); exitFullscreen(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
              </div>
            )}

            {/* ACTIVE GAME CANVAS (Raw cursor active) */}
            <canvas 
              ref={canvasRef} 
              onPointerDown={handlePointerDown}
              className={`block absolute touch-none ${engine.gameState === 'playing' && !isTimeUp ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'}`} 
            />

            {/* Start Screen */}
            {engine.gameState === 'start' && !showRotateWarning && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 p-4 backdrop-blur-sm" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full border border-gray-700 bg-gray-900 shadow-2xl flex flex-col justify-center items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                    <Grid3X3 className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                  <h2 className="text-3xl font-black mb-8 pointer-events-none tracking-tight">Rhythm Anomaly</h2>
                  
                  <button onClick={handleStartGame}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-black text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <Play className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Premium Custom End Screen */}
            {(engine.gameState === 'ended' || isTimeUp) && !showRotateWarning && (
              <div className="absolute inset-0 bg-[#05070e]/98 overflow-y-auto p-6 z-[70] select-none scrollbar-thin scroll-smooth backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto" onPointerDown={e => e.stopPropagation()}>
                <div className="min-h-full flex flex-col justify-center items-center py-4 w-full">
                  <div className="max-w-md w-full text-center">
                    {score > 0 && score >= (bestScore || 0) && (
                      <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce font-mono">
                        ⭐ NEW PERSONAL BEST!
                      </div>
                    )}
                    
                    <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1 font-mono">
                      Drill Complete
                    </h2>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-mono">
                      Rhythm Anomaly • Lvl {speedLevel}
                    </p>

                    <div className="grid grid-cols-3 gap-2.5 mb-6 text-left font-mono">
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                        <span className="text-sm font-black text-white">{score} <span className="text-[8px] text-slate-400 font-normal">PTS</span></span>
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
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Target Hits</span>
                        <span className="text-sm font-black text-emerald-400">{successfulHits}</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Misses / TOs</span>
                        <span className="text-sm font-black text-red-400">{missedHits + timeouts}</span>
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
                        onClick={(e) => { e.stopPropagation(); engine.endGame(); handleStartGame(); }}
                        colorTheme="blue"
                      />
                      <button
                        onClick={(e) => { e.stopPropagation(); shareScore(); }}
                        className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors active:scale-95 flex items-center justify-center"
                        title="Share Score"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      {isFullscreen && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleExitGame(); }}
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

        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Spot Fast Pulse" highlight="+3 PTS | +2s" result="Changes Position" />
                  <RuleItem num="2" color="cyan" text="Entropy" highlight="Corrupts Cells" result="Ignore Text Changes" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Wrong Click" highlight="0 PTS | -1s" result="Resets Streak" />
                  <RuleItem num="4" color="orange" text="Timeout" highlight="0 PTS | -1s" result="If taking too long" />
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
                <h2 className="font-bold text-white text-lg tracking-wide">About Rhythm Anomaly</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This free Rhythm Anomaly drill trains visual rhythm perception and temporal anomaly detection through a highly challenging Endless Time-Attack format. A 6x6 grid of 36 cells all pulse continuously. Thirty-five cells pulse at a steady 2.0-second interval, while one anomaly cell pulses faster. As you score points, the anomaly's pulse rate creeps closer and closer to 2.0s, pushing your temporal discrimination limits.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Musicians developing rhythm perception, quality control inspectors, gamers improving visual timing, and anyone wanting better temporal discrimination.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Visual rhythm perception, temporal anomaly detection, pulse discrimination, sustained visual attention, and cognitive stamina under time pressure.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score, accuracy percentage, total hits, misses, timeouts, and your maximum dynamic speed level reached.</p>
                  </div>
                </div>
                
                {/* Embedded How To Play (Optimized to match FAQ style) */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play & Scoring</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Instructions</h4>
                      <ol className="text-sm text-gray-300 space-y-3 list-decimal pl-4 marker:text-gray-500">
                        <li><strong className="text-white">Scan the Grid:</strong> Watch the 6x6 grid of pulsing cells. Compare adjacent cells rather than staring at the center.</li>
                        <li><strong className="text-white">Find the Anomaly:</strong> One cell will pulse faster and slightly brighter than the rest of the grid.</li>
                        <li><strong className="text-white">Tap to Neutralize:</strong> Tap the anomaly cell as quickly as possible.</li>
                        <li><strong className="text-white">Ignore Distractions:</strong> Random cells will occasionally flicker (entropy). This is visual noise. Ignore them.</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Scoring Rules</h4>
                      <ul className="text-sm text-gray-300 space-y-3 list-disc pl-4 marker:text-gray-500">
                        <li><strong className="text-green-400">Correct (+3 PTS | +2s):</strong> Hitting the true anomaly rewards you with points, adds valuable time, and increases the difficulty slightly.</li>
                        <li><strong className="text-red-400">Wrong (0 PTS | -1s):</strong> Tapping a normal or flickering cell directly drains your clock but does not reduce your score.</li>
                        <li><strong className="text-orange-400">Timeout (0 PTS | -1s):</strong> Failing to find the anomaly within the allowed time limit drains your clock and relocates the target.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-blue-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why does it keep getting harder to see?</h4>
                      <p className="text-xs text-gray-400 mt-1">This is an adaptive engine. At Level 1, the anomaly pulses at 1.4s vs the steady 2.0s grid. Every time you find it, the anomaly pulse rate creeps up by 20ms (maxing out at 1.95s). At high levels, the visual difference is microscopic.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why did the anomaly move before I clicked it?</h4>
                      <p className="text-xs text-gray-400 mt-1">You took too long. Depending on your current level, you only have between 2.5 to 8 seconds to identify the anomaly. Failing to do so triggers a Timeout, penalizes your time, and forces the anomaly to relocate.</p>
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
              <div className="w-1 h-5 rounded-full bg-blue-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/visual/visual-recognition/visual-search" title="Visual Search" desc="Conjunctive search for hidden items." color="blue" icon={<Search className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/visual-recognition/difference-spotter" title="Difference Spotter" desc="Spot the change after a visual blink." color="cyan" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/visual-recognition/rapid-object-id" title="Neural Shape ID" desc="Train rapid shape recognition." color="purple" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Divided Attention" desc="Dual-task brain training challenge." color="rose" icon={<Brain className="w-4 h-4" />} />
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
                    <li><Link href="/drills/visual/visual-recognition/entropic-grid" className="hover:text-blue-400 transition-colors">Entropic Grid</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-blue-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-blue-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-blue-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-blue-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-blue-400 transition-colors">Aim Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-blue-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-blue-400 transition-colors">Divided Attention</Link></li>
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
                    <Grid3X3 className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
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
    <div className="flex-1 min-w-[28%] sm:min-w-[15%] rounded-xl border border-gray-800 bg-gray-900 p-1.5 sm:p-3 text-center flex flex-col justify-center h-full min-h-[70px] sm:min-h-[80px] transition-all duration-300 hover:border-gray-600 shadow-md pointer-events-none">
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
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500', 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    green: 'bg-green-600 text-green-300 border-green-500' 
  };
  const colors = colorMap[color] || 'bg-gray-600 text-gray-300 border-gray-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-gray-800 shadow-sm">
      {num && <div className={`w-8 h-8 rounded-xl ${bg} border border-t-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0`}>{num}</div>}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-300">
          {text}{highlight && <span className={`font-black ${txt}`}> {highlight}</span>}
        </p>
        <div className={`text-xs font-black px-3 py-1.5 rounded-lg bg-gray-900 border ${border} ${txt} whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left`}>
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
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:-translate-y-1 hover:border-blue-500/50 flex flex-col h-full`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-blue-500 to-cyan-500'}`}></div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-black border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-blue-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-gray-500 flex-1">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-blue-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}