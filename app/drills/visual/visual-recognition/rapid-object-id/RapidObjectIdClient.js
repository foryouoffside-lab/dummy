'use client';

import React, { useEffect, useState, useRef, useCallback, Component } from 'react';
import Link from 'next/link';
import { 
  Eye, Zap, Timer, Trophy, Volume2, VolumeX, Maximize2, Minimize2,
  Info, RefreshCw, RotateCcw, Smartphone, GraduationCap, Lightbulb, 
  TrendingUp, BarChart3, ArrowRight, Brain, Users, Gauge, AlertTriangle, 
  Target, CheckCircle, XCircle, Play, Share2, ChevronRight, Circle, Square,
  Activity, LogOut, Sparkles
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

  playFlash()   { this.playTone(900, 'sine', 0.1, 0.03); } 
  playPerfect() { this.playTone(880, 'sine', 0.15, 0.1); }   
  playFail()    { this.playTone(330, 'sawtooth', 0.2, 0.08); } 
  
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
export default function RapidObjectIdClient() {
  // === UI State ===
  const [isSmallHeight, setIsSmallHeight] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game State ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [bestReaction, setBestReaction] = useState(0);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  const [speedLevel, setSpeedLevel] = useState(1);

  // Uncoupled from rendering state (fixes black screen on restart)
  const currentShapeRef = useRef(null);
  const isShapeVisibleRef = useRef(false);

  // === Engine Setup ===
  const engine = useGameEngine({
    category: 'visual',
    drillId: 'rapid-object-id',
    drillName: 'Neural Shape ID',
    totalGameTime: 9999, // Overridden by custom timer
    sharePath: 'drills/visual/visual-recognition/rapid-object-id',
  });

  // Refs
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const flashTimeoutRef = useRef(null);
  const cycleTimeoutRef = useRef(null);
  const responseWindowRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);

  const startTimeRef = useRef(0);
  const flashDurationRef = useRef(350);
  const gapDurationRef = useRef(600);
  
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const localTimeRef = useRef(60.0);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef(engine.gameState);
  const engineRef = useRef(engine);

  useEffect(() => { gameStateRef.current = engine.gameState; }, [engine.gameState]);
  useEffect(() => { engineRef.current = engine; }, [engine]);

  // Init
  useEffect(() => {
    setIsClient(true);
    try { 
      const name = localStorage.getItem('skilldrills_player_name'); 
      if (name) setPlayerNameInput(name); 
      const s = localStorage.getItem('shapeIdBestScore_v3'); 
      if (s) { const p = parseInt(s,10); if (!isNaN(p)) setBestScore(p); }
    } catch (e) {}
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  // Audio Sync
  useEffect(() => { if (audioSynth) audioSynth.setEnabled(soundEnabled); }, [soundEnabled]);

  // Mobile & Size Guard
  useEffect(() => {
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const mobileCheck = window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsMobile(mobileCheck);
      setIsSmallHeight(window.innerHeight < 500);
    };
    
    checkSize();
    window.addEventListener('resize', checkSize);
    window.addEventListener('orientationchange', checkSize);
    return () => { 
      window.removeEventListener('resize', checkSize); 
      window.removeEventListener('orientationchange', checkSize); 
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
      const currentBest = parseInt(localStorage.getItem('shapeIdBestScore_v3') || '0', 10); 
      if (finalScore > currentBest) { 
        localStorage.setItem('shapeIdBestScore_v3', finalScore.toString()); 
        setBestScore(finalScore); 
      } 
    } catch(e) {} 
  }, []);

  // Custom Decimal Timer Logic
  useEffect(() => {
    if (engine.gameState !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      localTimeRef.current -= 0.1;
      
      if (localTimeRef.current <= 0) {
        localTimeRef.current = 0;
        setLocalTimeRemaining(0);
        clearInterval(timerIntervalRef.current);
        if (engineRef.current && typeof engineRef.current.endGame === 'function') {
          engineRef.current.endGame();
        }
      } else {
        setLocalTimeRemaining(localTimeRef.current);
      }
    }, 100);
    
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [engine.gameState]);

  // Game End Logic
  useEffect(() => {
    if (engine.gameState === 'ended') {
      if (document.fullscreenElement) { try { document.exitFullscreen(); } catch (e) {} }
      updateLocalBestScore(scoreRef.current);
    }
  }, [engine.gameState, updateLocalBestScore]);

  // Cleanup
  const clearAllTimeouts = useCallback(() => { 
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current); 
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current); 
    if (responseWindowRef.current) clearTimeout(responseWindowRef.current); 
  }, []);

  useEffect(() => {
    if (engine.gameState === 'ended' || engine.gameState === 'start') {
      clearAllTimeouts();
      isShapeVisibleRef.current = false;
      currentShapeRef.current = null;
      isActiveRef.current = false;
    }
  }, [engine.gameState, clearAllTimeouts]);

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
  // DRILL MECHANICS (ENDLESS TIME ATTACK)
  // ============================================================
  const applyPenalty = useCallback((reason) => { 
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return; 
    
    setMissedHits(m => m + 1);
    streakRef.current = 0;
    setStreak(0);

    // Remove negative scoring penalty
    setScore(scoreRef.current); 
    if (engineRef.current && typeof engineRef.current.setScore === 'function') {
      engineRef.current.setScore(scoreRef.current);
    }
    
    localTimeRef.current = Math.max(0, localTimeRef.current - 2.0); // 2 SECOND PENALTY
    setLocalTimeRemaining(localTimeRef.current);
    
    triggerFeedback('Miss! -2s', 'error'); 
    if (audioSynth) audioSynth.playFail(); 
    
    const baseSpeedShift = Math.floor(scoreRef.current / 15) * 8;
    flashDurationRef.current = Math.min(400, 350 - baseSpeedShift + 25); 
    gapDurationRef.current = Math.min(800, 600 - baseSpeedShift + 30);
    setSpeedLevel(Math.max(1, Math.floor((400 - flashDurationRef.current) / 15)));
  }, [triggerFeedback]);

  const fail = useCallback((reason) => { 
    clearAllTimeouts(); 
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return; 
    
    applyPenalty(reason); 
    isShapeVisibleRef.current = false; 
    currentShapeRef.current = null; 
    
    setTimeout(() => { 
      if (isActiveRef.current && gameStateRef.current === 'playing') startCycle(); 
    }, 300); 
  }, [clearAllTimeouts, applyPenalty]);

  const handleSuccess = useCallback((selectedShape) => { 
    clearAllTimeouts(); 
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return; 
    
    const rt = Math.floor(performance.now() - startTimeRef.current); 
    setSuccessfulHits(p => p + 1); 
    if (bestReaction === 0 || rt < bestReaction) setBestReaction(rt); 
    
    streakRef.current += 1;
    setStreak(streakRef.current);
    if (streakRef.current > bestStreakRef.current) {
        bestStreakRef.current = streakRef.current;
        setBestStreak(bestStreakRef.current);
    }
    
    scoreRef.current += 5; 
    setScore(scoreRef.current); 
    if (engineRef.current && typeof engineRef.current.setScore === 'function') {
      engineRef.current.setScore(scoreRef.current);
    }
    
    localTimeRef.current = Math.min(60.0, localTimeRef.current + 2.0); 
    setLocalTimeRemaining(localTimeRef.current);
    
    if (audioSynth) audioSynth.playPerfect(); 
    triggerFeedback(`Hit! +5 PTS | +2s`, 'success'); 
    
    const baseSpeedShift = Math.floor(scoreRef.current / 15) * 8;
    const dynamicMinFlash = Math.max(30, 50 - Math.floor(scoreRef.current / 20) * 5);
    flashDurationRef.current = Math.max(dynamicMinFlash, 350 - baseSpeedShift - (streakRef.current * 4)); 
    gapDurationRef.current = Math.max(150, 600 - baseSpeedShift - (streakRef.current * 5));
    setSpeedLevel(Math.max(1, Math.floor((400 - flashDurationRef.current) / 15)));
    
    isShapeVisibleRef.current = false; 
    currentShapeRef.current = null; 
    
    setTimeout(() => { 
      if (isActiveRef.current && gameStateRef.current === 'playing') startCycle(); 
    }, 150); 
  }, [bestReaction, clearAllTimeouts, triggerFeedback]);

  const spawnShape = useCallback(() => { 
    clearAllTimeouts(); 
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return; 
    
    const shape = Math.random() > 0.5 ? "CIRCLE" : "SQUARE"; 
    currentShapeRef.current = shape; 
    isShapeVisibleRef.current = true; 
    if (audioSynth) audioSynth.playFlash(); 
    
    startTimeRef.current = performance.now(); 
    
    flashTimeoutRef.current = setTimeout(() => { 
      isShapeVisibleRef.current = false; 
    }, flashDurationRef.current); 
    
    responseWindowRef.current = setTimeout(() => { 
      if (isActiveRef.current && gameStateRef.current === 'playing') fail("TIMEOUT"); 
    }, flashDurationRef.current + 400); 
  }, [clearAllTimeouts, fail]);

  const startCycle = useCallback(() => { 
    clearAllTimeouts(); 
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return; 
    
    const delay = gapDurationRef.current + (Math.random() * 200); 
    cycleTimeoutRef.current = setTimeout(() => { spawnShape(); }, delay); 
  }, [clearAllTimeouts, spawnShape]);

  // Input Handlers
  const handleLeftClick = useCallback(() => { 
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return; 
    if (currentShapeRef.current === "CIRCLE") handleSuccess("CIRCLE"); 
    else if (currentShapeRef.current === "SQUARE") fail("WRONG"); 
    else fail("EARLY"); 
  }, [handleSuccess, fail]);

  const handleRightClick = useCallback(() => { 
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return; 
    if (currentShapeRef.current === "SQUARE") handleSuccess("SQUARE"); 
    else if (currentShapeRef.current === "CIRCLE") fail("WRONG"); 
    else fail("EARLY"); 
  }, [handleSuccess, fail]);

  // Keyboard Listeners
  useEffect(() => { 
    const h = (e) => { 
      if (gameStateRef.current !== 'playing' || !isActiveRef.current) return; 
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { 
        e.preventDefault(); handleLeftClick(); 
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { 
        e.preventDefault(); handleRightClick(); 
      } 
    }; 
    window.addEventListener('keydown', h); 
    return () => window.removeEventListener('keydown', h); 
  }, [handleLeftClick, handleRightClick]);

  // Canvas Render Loop
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
      
      cvs.width = w; 
      cvs.height = h; 
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
    
    function draw() { 
      ctx.fillStyle = "#050508"; 
      ctx.fillRect(0, 0, cvs.width, cvs.height); 
      
      ctx.strokeStyle = 'rgba(255,255,255,0.03)'; 
      ctx.lineWidth = 1; 
      for (let i = 0; i < cvs.width; i += 50) { 
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); 
        ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke(); 
      } 
      
      const cx = cvs.width / 2, cy = cvs.height / 2; 
      const minDim = Math.min(cvs.width, cvs.height);
      const shapeSize = minDim * 0.15; 
      
      if (isShapeVisibleRef.current && currentShapeRef.current) { 
        ctx.fillStyle = "#FFFFFF"; 
        ctx.shadowBlur = 15; 
        ctx.shadowColor = "rgba(255,255,255,0.4)"; 
        ctx.beginPath(); 
        if (currentShapeRef.current === "CIRCLE") {
          ctx.arc(cx, cy, shapeSize / 2, 0, Math.PI * 2); 
        } else {
          ctx.rect(cx - shapeSize/2, cy - shapeSize/2, shapeSize, shapeSize); 
        }
        ctx.fill(); 
        ctx.shadowBlur = 0; 
      } 
      
      animationRef.current = requestAnimationFrame(draw); 
    } 
    
    animationRef.current = requestAnimationFrame(draw); 
    return () => { 
      if (animationRef.current) cancelAnimationFrame(animationRef.current); 
      window.removeEventListener('resize', updateSize); 
      ro.disconnect(); 
    }; 
  }, [engine.gameState]);

  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    
    setScore(0); setBestReaction(0); 
    setSpeedLevel(1); setSuccessfulHits(0); setMissedHits(0);
    setStreak(0); setBestStreak(0);
    
    isShapeVisibleRef.current = false;
    currentShapeRef.current = null;
    
    localTimeRef.current = 60.0;
    setLocalTimeRemaining(60.0);
    
    flashDurationRef.current = 350; 
    gapDurationRef.current = 600;
    scoreRef.current = 0; 
    streakRef.current = 0;
    bestStreakRef.current = 0;
    isActiveRef.current = true; 
    
    clearAllTimeouts(); 
    
    try { 
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      }
    } catch (err) {} 
    
    if (engineRef.current && typeof engineRef.current.startGame === 'function') {
      engineRef.current.startGame();
    }
    
    setTimeout(() => { 
      if (isActiveRef.current && gameStateRef.current === 'playing') startCycle(); 
    }, 1000); 
  }, [clearAllTimeouts, startCycle]);

  const shareDrillLink = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/visual/visual-recognition/rapid-object-id';
    if (navigator.share) {
      try { await navigator.share({ title: 'Neural Shape ID Drill', url }); } catch(e){}
    } else {
      try { await navigator.clipboard.writeText(url); alert('Link copied!'); } catch(e){}
    }
  }, []);

  const shareScore = useCallback(() => {
    const accuracy = successfulHits + missedHits > 0 ? Math.round((successfulHits / (successfulHits + missedHits)) * 100) : 0;
    let finalRank = 'Bronze';
    if (scoreRef.current >= 80 && accuracy >= 85) finalRank = 'Grandmaster';
    else if (scoreRef.current >= 65 && accuracy >= 75) finalRank = 'Master';
    else if (scoreRef.current >= 50 && accuracy >= 65) finalRank = 'Diamond';
    else if (scoreRef.current >= 35 && accuracy >= 55) finalRank = 'Platinum';
    else if (scoreRef.current >= 20 && accuracy >= 45) finalRank = 'Gold';
    else if (scoreRef.current >= 10) finalRank = 'Silver';

    const text = `🎯 I scored ${scoreRef.current} PTS with ${accuracy}% accuracy on the Neural Shape ID Drill! Rank: ${finalRank}. Try it here: https://skilldrills.online/drills/visual/visual-recognition/rapid-object-id`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'My SkillDrills Visual Score',
        text: text,
        url: 'https://skilldrills.online/drills/visual/visual-recognition/rapid-object-id'
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
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    ); 
  }

  const accuracyPercentage = (successfulHits + missedHits) === 0 ? 100 : Math.round((successfulHits / (successfulHits + missedHits)) * 100);
  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracyPercentage;
  const isNewBest = engine.gameState === 'ended' && score > bestScore && score > 0;

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

  let diagnostics = "Phenomenal visual speed! Your neural shape discrimination and latency thresholds are operating at elite levels.";
  if (accuracyPercentage < 50) {
    diagnostics = "Low shape classification accuracy. Slow down your click responses to confirm the flashed shape before inputting.";
  } else if (bestReaction > 350) {
    diagnostics = "Good accuracy, but shape processing speed is sluggish. Try using the keyboard (A/D) to bypass cursor travel latency.";
  } else if (score < 30) {
    diagnostics = "Keep your correct hit streak active to accelerate the flash duration and compound your points.";
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
              <li className="text-blue-400 font-medium">Neural Shape ID</li>
            </ol>
          </nav>
        )}
        
        {/* Header */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Neural Shape ID</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Object Recognition • Endless Time-Attack</p>
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
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
          </div>
        )}

        {/* Stats Bar */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
            <StatCard icon={<Target className="text-blue-400" />} value={score} label="Score" />
            <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
            <StatCard icon={<Zap className="text-yellow-400" />} value={`Lv.${speedLevel}`} label="Speed" />
            <StatCard icon={<TrendingUp className="text-orange-400" />} value={streak} label="Streak" />
            <StatCard icon={<Activity className="text-emerald-400" />} value={bestReaction || '-'} label="Best RT" unit="ms" />
            <StatCard icon={<CheckCircle className="text-green-400" />} value={successfulHits} label="Hits" />
            <StatCard icon={<XCircle className="text-red-400" />} value={missedHits} label="Misses" />
            <StatCard icon={<Trophy className="text-purple-400" />} value={Math.max(bestScore, score)} label="Best" />
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

        {/* Game Container */}
        <GameErrorBoundary>
          <div ref={containerRef} 
            className={`relative overflow-hidden flex flex-col transition-all duration-100 z-10 bg-[#050508] ${
              isFullscreen 
                ? 'fixed inset-0 z-50 w-screen h-screen rounded-none border-none' 
                : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[65vh] md:min-h-[600px] lg:min-h-[650px]'
            }`}
          >
            
            {/* Subtle background grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Time Progress Bar */}
            {engine.gameState === 'playing' && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
                <div 
                  className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
                />
              </div>
            )}

            {isFullscreen && engine.gameState === 'playing' && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onClick={() => { if(engineRef.current.endGame) engineRef.current.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
                <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
              </div>
            )}

            {/* ACTIVE GAME CANVAS */}
            <canvas 
              ref={canvasRef} 
              className={`block absolute touch-none ${engine.gameState === 'playing' ? '' : 'pointer-events-none'}`} 
            />

            {/* Mobile/Touch Controls */}
            {engine.gameState === 'playing' && (
              <div className={`absolute left-0 right-0 flex justify-center px-4 z-[60] ${isSmallHeight ? 'bottom-2 gap-8' : 'bottom-6 gap-4 sm:gap-12'}`}>
                <button 
                  onClick={handleLeftClick} 
                  className={`flex-1 rounded-2xl bg-gradient-to-t from-blue-700 to-cyan-600 border border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] active:scale-95 transition-transform flex items-center justify-center group ${isSmallHeight ? 'max-w-[160px] py-2 flex-row gap-2' : 'max-w-[200px] py-4 sm:py-6 flex-col gap-1.5 sm:gap-2'}`}
                >
                  <Circle className={`text-white drop-shadow-md group-active:scale-90 transition-transform ${isSmallHeight ? 'w-4 h-4' : 'w-6 h-6 sm:w-10 sm:h-10'}`} />
                  <span className={`font-black tracking-widest uppercase text-blue-100 ${isSmallHeight ? 'text-[10px]' : 'text-xs sm:text-sm'}`}>Left / A</span>
                </button>
                
                <button 
                  onClick={handleRightClick} 
                  className={`flex-1 rounded-2xl bg-gradient-to-t from-red-700 to-pink-600 border border-red-400/50 shadow-[0_0_15px_rgba(239,68,68,0.3)] active:scale-95 transition-transform flex items-center justify-center group ${isSmallHeight ? 'max-w-[160px] py-2 flex-row gap-2' : 'max-w-[200px] py-4 sm:py-6 flex-col gap-1.5 sm:gap-2'}`}
                >
                  <Square className={`text-white drop-shadow-md group-active:scale-90 transition-transform fill-transparent ${isSmallHeight ? 'w-4 h-4' : 'w-6 h-6 sm:w-10 sm:h-10'}`} />
                  <span className={`font-black tracking-widest uppercase text-red-100 ${isSmallHeight ? 'text-[10px]' : 'text-xs sm:text-sm'}`}>Right / D</span>
                </button>
              </div>
            )}

            {/* Mobile-Optimized Start Screen */}
            {engine.gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm p-4 overflow-y-auto pointer-events-auto">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full border border-gray-700 bg-gray-900 shadow-2xl flex flex-col my-auto shrink-0">
                  <div className="flex-1 mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mx-auto flex items-center justify-center mb-4 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                      <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black mb-2 pointer-events-none tracking-tight">Neural Shape ID</h2>
                  </div>

                  <button onClick={handleStartGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:outline-none shrink-0">
                    <Play className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Premium Custom End Screen */}
            {engine.gameState === 'ended' && (
              <div className="absolute inset-0 bg-[#05070e]/98 overflow-y-auto p-6 z-[70] select-none scrollbar-thin scroll-smooth backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto">
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
                      Neural Shape ID • Lvl {speedLevel}
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
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Best RT</span>
                        <span className="text-sm font-black text-cyan-400">{bestReaction > 0 ? `${bestReaction}ms` : '-'}</span>
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
                        onClick={() => { if(engineRef.current.endGame) engineRef.current.endGame(); handleStartGame(); }}
                        colorTheme="blue"
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

        {!isFullscreen && (
          <section className="mt-10 pointer-events-none">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Correct Target" highlight="+5 PTS | +2s" result="Increases Difficulty" />
                  <RuleItem num="2" color="cyan" text="Dynamic Adjustments" highlight="Speed Configurations" result="Adaptive Environment" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Wrong Answer" highlight="0 PTS | -2s" result="Decreases Difficulty" />
                  <RuleItem num="4" color="yellow" text="Timer Economy" highlight="Max 60s" result="Time Ends = Game Over" />
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
                <h2 className="font-bold text-white text-lg tracking-wide">About Neural Shape ID</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This free Neural Shape ID drill trains rapid visual object recognition and response selection through an intense Endless Time-Attack format. As you string together correct answers, the shapes flash faster (scaling infinitely down to a near-invisible 50ms) to test your absolute cognitive processing limits.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Brain className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Target Audience</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Esports athletes, traditional sports players, drivers, and anyone wanting faster visual processing and dual-choice reaction time.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Rapid visual processing, structural form recognition, response selection, and reaction speed under severe adaptive time pressure.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Performance Metrics</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net score economy (+5 PTS), clock management (+2s/-2s), accuracy percentage, total hits, misses, best reaction time (ms), and maximum dynamic speed level.</p>
                  </div>
                </div>
                
                {/* HOW TO PLAY SECTION */}
                <div className="bg-[#0b0f19]/40 rounded-xl p-6 border border-gray-800 mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    How to Play & Scoring
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-300">
                    <ol className="space-y-3 list-decimal pl-5">
                      <li><strong className="text-white">Start the Drill:</strong> Follow the on-screen prompt to begin the visual sequence.</li>
                      <li><strong className="text-white">Track the Targets:</strong> Desktop users rest fingers lightly on <kbd className="bg-gray-800 px-1 py-0.5 rounded border border-gray-700">A</kbd> and <kbd className="bg-gray-800 px-1 py-0.5 rounded border border-gray-700">D</kbd> keys. Mobile users tap LEFT or RIGHT.</li>
                      <li><strong className="text-white">React Quickly:</strong> Respond to the shape shown as fast as possible before it disappears to maximize your score.</li>
                    </ol>
                    <ul className="space-y-3 list-disc pl-5 border-l border-gray-800/50 sm:pl-6">
                      <li><strong className="text-green-400">Accuracy (+5 PTS | +2s):</strong> Correct identifications keep your streak alive and reward you with time.</li>
                      <li><strong className="text-blue-400">Speed Level:</strong> Faster reaction times scale the difficulty higher, testing pure cognitive form perception.</li>
                      <li><strong className="text-red-400">Errors (0 PTS | -2s):</strong> Misses or false positives will drain the clock but will not reduce your score.</li>
                    </ul>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-blue-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why does it keep getting faster?</h4>
                      <p className="text-xs text-gray-400 mt-1">This is an adaptive engine. For every correct answer, the flash duration shrinks by 8ms. This forces your brain to identify the object purely by "form perception" rather than actively studying the shape.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">How do I get a high score?</h4>
                      <p className="text-xs text-gray-400 mt-1">Survive. This is an Endless Time-Attack mode. You must consistently land correct hits (+2.0s) to offset the natural decay of the timer and the heavy penalties (-2.0s) for mistakes.</p>
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
              <div className="w-1 h-5 rounded-full bg-blue-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/visual/reaction-speed/sound-reaction" title="Neuro-Switch" desc="React to audio cues under pressure." color="blue" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/visual-recognition/difference-spotter" title="Difference Spotter" desc="Spot the change after a sudden visual blink." color="cyan" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/reactive-sphere-tracking" title="Reactive Tracking" desc="Track unpredictable moving targets." color="rose" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Divided Attention" desc="Dual-task brain training challenge." color="purple" icon={<Brain className="w-4 h-4" />} />
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
                    <li><Link href="/drills/visual/visual-recognition/rapid-object-id" className="hover:text-blue-400 transition-colors">Neural Shape ID</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/difference-spotter" className="hover:text-blue-400 transition-colors">Difference Spotter</Link></li>
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
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500/25 to-cyan-500/25 border border-blue-500/30 rounded-lg flex items-center justify-center">
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
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
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:-translate-y-1 hover:border-blue-500/50">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-blue-500 to-cyan-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050508] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
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