'use client';

import { Component, useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Eye, Zap, Timer, Trophy, Volume2, VolumeX, Maximize2, Minimize2,
  Info, RefreshCw, RotateCcw, GraduationCap, Lightbulb, TrendingUp, 
  BarChart3, ArrowRight, Brain, Users, AlertTriangle, Target, 
  CheckCircle, XCircle, Play, Share2, ChevronRight, Activity, LogOut
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';

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

  playPerfect() { this.playTone(880, 'sine', 0.10, 0.1); }   
  playStreak()  { this.playTone(1046.5, 'triangle', 0.2, 0.12); } 
  playFail()    { this.playTone(150, 'sawtooth', 0.20, 0.2); } 
  
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
export default function DistanceJudgmentClient() {
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
  const [isNewBest, setIsNewBest] = useState(false);
  const [perfectHits, setPerfectHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [speedLevel, setSpeedLevel] = useState(1); // ADDED: Defines the missing speedLevel state
  
  // Velocity Profiling state (used for UI display only)
  const [velocityProfile, setVelocityProfile] = useState('NORMAL');
  
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // === Engine Setup ===
  const engine = useGameEngine({
    category: 'visual',
    drillId: 'distance-judgment',
    drillName: 'Distance Judgment',
    totalGameTime: 9999, 
    sharePath: 'drills/visual/depth-perception/distance-judgment',
  });

  // Refs for zero-latency tracking
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const engineRef = useRef(engine);
  
  const timerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const cycleTimeoutRef = useRef(null);

  const durationRef = useRef(2000); 
  const currentZRef = useRef(0); 
  const targetZRef = useRef(50); 
  const isApproachingRef = useRef(false);
  const lastFrameTimeRef = useRef(0);
  const resultDeviationRef = useRef(0);
  const showResultFlashRef = useRef(false);
  const explosionRadiusRef = useRef(0);
  
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
      
      const s = localStorage.getItem('distJudgmentBestScore_v5'); 
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
      const currentBest = parseInt(localStorage.getItem('distJudgmentBestScore_v5') || '0', 10); 
      if (finalScore > currentBest && finalScore > 0) { 
        localStorage.setItem('distJudgmentBestScore_v5', finalScore.toString()); 
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

  // Cleanup
  const clearAllTimeouts = useCallback(() => { 
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current); 
  }, []);

  useEffect(() => {
    if (engine.gameState === 'ended' || engine.gameState === 'start') {
      clearAllTimeouts();
      isActiveRef.current = false;
      isApproachingRef.current = false;
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  }, [engine.gameState, clearAllTimeouts]);

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
    if (!document.fullscreenElement) {
      await enterFullscreen();
    } else {
      await exitFullscreen();
    }
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
    }, 500); // Faster feedback clear
  }, []);

  // ============================================================
  // DRILL MECHANICS (Randomized Velocity Profile)
  // ============================================================
  const startCycle = useCallback(() => { 
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return; 
    
    // Dynamic Spawn Depth (Between 30% and 80%)
    targetZRef.current = 30 + Math.random() * 50; 
    currentZRef.current = 0; 
    explosionRadiusRef.current = 0; 
    isApproachingRef.current = true;
    showResultFlashRef.current = false;
    lastFrameTimeRef.current = 0; 

    // === RANDOMIZED VELOCITY PROFILE ===
    // We break the rhythm heavily. Speeds range from absurdly fast to agonizingly slow
    const difficultyMultiplier = Math.max(0.3, 1 - (scoreRef.current * 0.015)); // Floor at 0.3
    
    // Base speed randomization (500ms to 2800ms)
    const rawSpeed = 500 + (Math.random() * 2300);
    
    // Apply difficulty scaling (faster on average as score goes up)
    durationRef.current = Math.max(300, rawSpeed * difficultyMultiplier);

    // Update UI profile string based on generated speed
    if (durationRef.current < 600) setVelocityProfile('HYPER');
    else if (durationRef.current < 1200) setVelocityProfile('FAST');
    else if (durationRef.current < 2000) setVelocityProfile('NORMAL');
    else setVelocityProfile('SLOW');

  }, []);

  const handlePenalty = useCallback((type) => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    setMissedHits(m => m + 1);
    streakRef.current = 0;
    setStreak(0);
    
    scoreRef.current = Math.max(0, scoreRef.current - 2); 
    setScore(scoreRef.current); 
    
    localTimeRef.current = Math.max(0, localTimeRef.current - 0.5); 
    setLocalTimeRemaining(localTimeRef.current);
    
    if (localTimeRef.current <= 0) {
      setIsTimeUp(true);
      isActiveRef.current = false;
      if (typeof engineRef.current?.endGame === 'function') {
        engineRef.current.endGame();
      }
      return;
    }

    if (audioSynth) audioSynth.playFail(); 
    triggerFeedback(`MISS! -2 PTS`, 'error'); 

    cycleTimeoutRef.current = setTimeout(() => {
        if (isActiveRef.current) startCycle();
    }, 400); // Shorter reset
  }, [triggerFeedback, startCycle]);

  const handleIntercept = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing' || !isApproachingRef.current) return;
    
    isApproachingRef.current = false;
    showResultFlashRef.current = true;
    explosionRadiusRef.current = 0;
    
    const deviation = Math.abs(currentZRef.current - targetZRef.current);
    resultDeviationRef.current = deviation;
    
    // STRICT ACCURACY REQUIREMENT: Must be <= 3 deviation
    if (deviation <= 3) {
        setPerfectHits(p => p + 1);
        streakRef.current += 1;
        setStreak(streakRef.current);
        
        if (streakRef.current > bestStreakRef.current) { 
           bestStreakRef.current = streakRef.current; 
           setBestStreak(bestStreakRef.current); 
        }
        
        scoreRef.current += 3;
        setScore(scoreRef.current);
        setSpeedLevel(Math.max(1, Math.floor(scoreRef.current / 10) + 1)); // ADDED: dynamically updates level
        localTimeRef.current = Math.min(60, localTimeRef.current + 0.5); 
        setLocalTimeRemaining(localTimeRef.current);
        
        if (streakRef.current > 0 && streakRef.current % 5 === 0) {
           if (audioSynth) audioSynth.playStreak();
        } else {
           if (audioSynth) audioSynth.playPerfect();
        }
        
        triggerFeedback(`ACCURATE! +3 PTS`, 'success');
    } else {
        // ANY DEVIATION > 3 IS A FULL MISS
        handlePenalty('miss');
        return; 
    }
    
    cycleTimeoutRef.current = setTimeout(() => {
        if (isActiveRef.current) startCycle();
    }, 300); // Very fast reset on hits
  }, [handlePenalty, startCycle, triggerFeedback]);

  // Pointer Down (Tapping Anywhere intercepts)
  const handlePointerDown = useCallback((e) => { 
    if (gameStateRef.current !== 'playing' || !isActiveRef.current) return; 
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    e.preventDefault();
    handleIntercept();
  }, [handleIntercept]);

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

  // High-Performance True-3D Canvas Render Loop
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
    
    function draw(time) { 
      if (!isActiveRef.current) return;
      
      // Update Physics
      if (isApproachingRef.current) {
          if (lastFrameTimeRef.current === 0) {
              lastFrameTimeRef.current = time; 
          }
          const dt = time - lastFrameTimeRef.current;
          const clampedDt = Math.min(dt, 50); 
          
          currentZRef.current += (100 / durationRef.current) * clampedDt;
          
          if (currentZRef.current >= 100) {
              isApproachingRef.current = false;
              showResultFlashRef.current = true;
              resultDeviationRef.current = 100; // Force extreme miss
              handlePenalty('timeout');
          }
      }
      lastFrameTimeRef.current = time;

      // Clear Background
      ctx.fillStyle = "#050508"; 
      ctx.fillRect(0, 0, cvs.width, cvs.height); 
      
      // Perspective Grid Lines
      ctx.strokeStyle = 'rgba(255,255,255,0.03)'; 
      ctx.lineWidth = 1; 
      const cx = cvs.width / 2;
      const cy = cvs.height / 2;
      
      for (let i = 0; i <= 10; i++) { 
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cvs.width * (i/10), 0); ctx.stroke(); 
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cvs.width * (i/10), cvs.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(0, cvs.height * (i/10)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cvs.width, cvs.height * (i/10)); ctx.stroke();
      } 

      // Render Scaling factor
      const maxRadius = Math.min(cvs.width, cvs.height) * 0.40;
      
      // 1. Draw Target Ring (Dashed line where ball must hit)
      const targetScale = Math.pow(targetZRef.current / 100, 2.5); 
      const targetRadius = Math.max(2, maxRadius * targetScale);
      
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; 
      ctx.lineWidth = 2 + (2 * targetScale); 
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(1, targetRadius), 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Draw Moving Sphere
      const currentScale = Math.pow(currentZRef.current / 100, 2.5);
      const currentRadius = Math.max(0, maxRadius * currentScale);
      
      if (currentRadius > 0.5) {
          let coreColor = '#9ca3af'; // Gray-400
          let edgeColor = '#4b5563'; // Gray-600
          let shadowColor = 'rgba(0,0,0,0.5)';
          
          if (showResultFlashRef.current) {
              const dev = resultDeviationRef.current;
              // Only green if highly accurate (<= 3)
              if (dev <= 3) { coreColor = '#4ade80'; edgeColor = '#16a34a'; shadowColor = '#22c55e'; }
              else { coreColor = '#f87171'; edgeColor = '#dc2626'; shadowColor = '#e11d48'; }
              
              explosionRadiusRef.current += (1000 / durationRef.current) * 2;
              ctx.beginPath();
              ctx.arc(cx, cy, currentRadius + explosionRadiusRef.current, 0, Math.PI * 2);
              ctx.strokeStyle = shadowColor;
              ctx.lineWidth = Math.max(0.1, 8 - explosionRadiusRef.current * 0.1);
              ctx.stroke();
          }
          
          const gradient = ctx.createRadialGradient(
              cx - currentRadius * 0.25, cy - currentRadius * 0.25, currentRadius * 0.1, 
              cx, cy, currentRadius
          );
          gradient.addColorStop(0, coreColor);
          gradient.addColorStop(0.8, edgeColor);
          gradient.addColorStop(1, '#111111'); 
          
          ctx.beginPath();
          ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          
          ctx.shadowBlur = 10 * currentScale;
          ctx.shadowColor = showResultFlashRef.current ? shadowColor : 'rgba(0,0,0,0.5)';
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
  }, [engine.gameState, handlePenalty]);

  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    await enterFullscreen(); 
    
    setIsTimeUp(false);
    setIsNewBest(false);
    setScore(0); 
    setPerfectHits(0); setMissedHits(0); 
    setStreak(0); setBestStreak(0);
    setSpeedLevel(1); // ADDED: resets level when game starts
    setVelocityProfile('NORMAL');
    
    localTimeRef.current = 60.0;
    setLocalTimeRemaining(60.0);
    
    scoreRef.current = 0; 
    streakRef.current = 0;
    bestStreakRef.current = 0;
    durationRef.current = 2000;
    isActiveRef.current = true; 
    gameStateRef.current = 'playing';
    
    clearAllTimeouts(); 
    
    engine.startGame();
    startCycle();
  }, [clearAllTimeouts, startCycle, engine, enterFullscreen]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/visual/depth-perception/distance-judgment';
    if (navigator.share) {
      navigator.share({ title: 'Distance Judgment Drill', text: 'Train your depth perception and timing! Free!', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  if (loading || !isClient) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(244,63,94,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    ); 
  }

  const totalActions = perfectHits + missedHits;
  const accuracyPercentage = totalActions === 0 ? 100 : Math.round((perfectHits / totalActions) * 100);
  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracyPercentage;

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
            <li className="text-rose-400 font-medium">Distance Judgment</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.3)]">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Distance Judgment</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Depth Perception • Intercept Timing • Precision</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            
            {engine.gameState === 'playing' && !isTimeUp && (
              <button onPointerDown={e => e.stopPropagation()} onClick={() => { engine.endGame(); handleStartGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset"><RefreshCw className="w-5 h-5" /></button>
            )}
            <button onPointerDown={e => e.stopPropagation()} onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onPointerDown={e => e.stopPropagation()} onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
          </div>
        </div>

        {showNameInput && (
          <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-900 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <input type="text" value={playerNameInput} onChange={e => setPlayerNameInput(e.target.value)} placeholder="Enter your display name" maxLength={20}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                onKeyDown={e => e.key === 'Enter' && savePlayerName()} />
              <button onClick={savePlayerName} className="px-5 py-2.5 bg-rose-600 text-white rounded-lg text-sm font-semibold hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/20">Save</button>
            </div>
          </div>
        )}

        {/* Inline Stats Bar */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-2 w-full">
          <StatCard icon={<Target className="text-rose-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
          <StatCard 
            icon={<Zap className={velocityProfile === 'HYPER' ? 'text-red-500' : 'text-yellow-400'} />} 
            value={velocityProfile} 
            label="Velocity" 
          />
          <StatCard icon={<Activity className="text-blue-400" />} value={accuracyPercentage} label="Accuracy" unit="%" />
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
            className={`relative overflow-hidden flex flex-col cursor-pointer transition-colors duration-100 mx-auto ${
              isFullscreen 
                ? 'fixed inset-0 z-50 flex' 
                : 'rounded-2xl border border-gray-700 shadow-2xl w-full h-[65vh] md:h-[75vh] min-h-[400px] max-h-[700px]'
            }`}
            style={{ 
              touchAction: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto', 
              overscrollBehavior: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto',
              backgroundColor: '#050508',
              ...(isFullscreen && { width: '100vw', height: '100vh', maxWidth: 'none', margin: 0, borderRadius: 0, border: 'none' })
            }}
            onPointerDown={handlePointerDown}>
            
            {/* Time Progress Bar */}
            {engine.gameState === 'playing' && !isTimeUp && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
                <div 
                  className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-rose-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
                />
              </div>
            )}

            {showRotateWarning && engine.gameState !== 'playing' && (
              <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 backdrop-blur-sm touch-none">
                <div className="animate-bounce mb-6 text-rose-500">
                  <RotateCcw className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Rotate Device</h3>
                <p className="text-sm text-gray-400 max-w-xs mx-auto">Please rotate your device to landscape mode for the best playing experience.</p>
              </div>
            )}

            {isFullscreen && engine.gameState === 'playing' && !isTimeUp && !showRotateWarning && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); engine.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setSoundEnabled(v => !v); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); exitFullscreen(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
              </div>
            )}

            {engine.gameState === 'playing' && !isTimeUp && !showRotateWarning && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center z-[60] pointer-events-none opacity-60">
                <div className="px-6 py-2 bg-black/40 rounded-full border border-gray-700 backdrop-blur-sm">
                  <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">TAP ANYWHERE TO INTERCEPT</p>
                </div>
              </div>
            )}

            {/* ACTIVE GAME CANVAS */}
            <canvas 
              ref={canvasRef} 
              className={`block absolute touch-none pointer-events-none`} 
            />

            {/* Start Screen (Clean & Optimised for Mobile Landscape) */}
            {engine.gameState === 'start' && !showRotateWarning && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 p-4 backdrop-blur-sm" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full border border-gray-700 bg-gray-900 shadow-2xl flex flex-col justify-center items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                    <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                  <h2 className="text-3xl font-black mb-8 pointer-events-none tracking-tight">Distance Judgment</h2>
                  
                  <button onPointerDown={e => e.stopPropagation()} onClick={handleStartGame}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-black text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none shrink-0 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                    <Play className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Premium Custom End Screen */}
            {(engine.gameState === 'ended' || isTimeUp) && !showRotateWarning && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/90 pointer-events-auto animate-in fade-in duration-300 p-4" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 overflow-hidden flex flex-col max-h-[95vh]">
                  
                  <div className="bg-gradient-to-br from-rose-900/40 to-pink-900/40 p-5 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                      <p className="text-rose-400 font-medium text-sm sm:text-base">Distance Judgment • Lvl {speedLevel}</p>
                    </div>
                  </div>

                  {/* Wrapper allows internal scrolling if needed on very small screens, 
                      but layout should mostly fit without scrolling now */}
                  <div className="flex-1 flex flex-col p-5 sm:p-6 pointer-events-none overflow-y-auto min-h-0">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                        <div className="flex items-end gap-1">
                          <span className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tighter">{score}</span>
                          <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">PTS</span>
                        </div>
                      </div>
                      
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                          <path className="text-gray-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path 
                            className={`${accuracyPercentage >= 80 ? 'text-green-500' : accuracyPercentage >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                            strokeWidth="3" strokeDasharray={`${strokeDasharray}`} strokeDashoffset={`${strokeDashoffset}`} strokeLinecap="round" stroke="currentColor" fill="none" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-lg sm:text-xl font-black ${accuracyPercentage >= 80 ? 'text-green-400' : accuracyPercentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracyPercentage}%</span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="bg-gray-900/50 rounded-xl p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Accurate Hits</div>
                        <div className="text-xl font-black text-green-400">{perfectHits}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Misses</div>
                        <div className="text-xl font-black text-red-400">{missedHits}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 bg-gray-900/80 border-t border-gray-800 flex flex-wrap gap-2 sm:gap-3 shrink-0">
                    <button onPointerDown={e => e.stopPropagation()} onClick={() => { engine.endGame(); handleStartGame(); }} className="flex-1 min-w-[140px] py-3.5 bg-rose-600 text-white rounded-xl font-black tracking-wide hover:bg-rose-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                      <RefreshCw className="w-5 h-5" /> PLAY AGAIN
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={shareDrillLink} className="px-5 py-3.5 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={handleExitGame} className="px-5 py-3.5 bg-gray-800 text-red-400 rounded-xl font-bold hover:bg-gray-700 hover:text-red-300 transition-all active:scale-95 border border-gray-700 flex items-center justify-center">
                      <LogOut className="w-5 h-5" />
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
                <Target className="w-5 h-5 text-rose-400" /><h2 className="font-bold text-white text-lg tracking-wide">Detailed Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Accurate Intercept" highlight="+3 PTS | +0.5s" result="Deviation <= 3%" />
                  <RuleItem num="2" color="blue" text="Dynamic Velocity" highlight="Random speeds" result="Prevents rhythm abuse" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Miss / Timeout" highlight="-2 PTS | -0.5s" result="Deviation > 3%" />
                  <RuleItem num="4" color="orange" text="Timer Max Limit" highlight="60 Seconds" result="Clock drains on misses" />
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
                <GraduationCap className="w-5 h-5 text-rose-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Distance Judgment</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This free Distance Judgment drill trains severe depth perception and interceptive timing through a hardcore Endless Time-Attack format. A sphere will approach you from the distance at randomized velocities. You must tap the screen the exact moment the sphere's edge aligns with the stationary target ring. The engine strictly requires less than 3% deviation for a successful hit, forcing true spatial estimation over rhythm tapping.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Athletes tracking high-speed ball trajectories, drivers estimating sudden stopping distances, gamers improving projectile timing, and pilots.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Depth perception, dynamic spatial estimation, visual processing speed, hand-eye coordination, and interceptive timing under pressure.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score, overall accuracy percentage, accurate intercepts (≤3% deviation), total misses, and ability to handle Hyper velocities.</p>
                  </div>
                </div>
                
                {/* Embedded How To Play (Optimized) */}
                <div className="p-6 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white tracking-wide">How to Play</h3>
                  </div>
                  <ol className="text-sm leading-relaxed space-y-4 list-decimal pl-5 text-gray-300">
                    <li><strong className="text-white">Track the Sphere:</strong> A 3D sphere approaches from the center at entirely random speeds. Do not follow it directly with your eyes; look at the dashed <span className="text-rose-400 font-bold">target ring</span> and use your peripheral vision to gauge approach velocity.</li>
                    <li><strong className="text-white">Tap to Intercept:</strong> Tap anywhere on the screen the exact millisecond the sphere crosses the target ring boundary. The margin for error is extremely tight (≤3%).</li>
                    <li><strong className="text-white">Maintain the Clock:</strong> Highly accurate interceptions add time (+0.5s) to your 60-second clock.</li>
                    <li><strong className="text-white">Avoid Mistakes:</strong> Tapping slightly early, slightly late, or missing entirely will deduct time (-0.5s) and break your streak.</li>
                  </ol>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why did the speed change so drastically?</h4>
                      <p className="text-xs text-gray-400 mt-1">This engine utilizes Randomized Velocity Profiling. The sphere will not approach at a constant, predictable rate. It will fluctuate heavily between SLOW, NORMAL, FAST, and HYPER speeds to prevent you from using rhythmic timing. You must visually react to every individual spawn.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">I felt like I hit it, why did I get a miss?</h4>
                      <p className="text-xs text-gray-400 mt-1">The accuracy requirement is incredibly strict (deviation ≤ 3%). If the ball is slightly inside or slightly outside the dashed target ring, it registers as a full MISS and penalizes your score and time. True precision is required.</p>
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
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-rose-500 to-pink-600"></div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Explore Related Free Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/visual/tracking-accuracy/moving-target" title="Kinetic Intercept" desc="Click fast-moving targets." color="cyan" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/visual-recognition/rapid-object-id" title="Neural Shape ID" desc="Train rapid shape recognition." color="blue" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Flick Shot Trainer" desc="Improve flick shot aim accuracy." color="red" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer" desc="Precision aiming exercises." color="orange" icon={<Target className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FOOTER */}
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
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-600/20">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-black text-xl tracking-tight">SkillDrills</span>
                </div>
                <p className="text-sm mb-3 font-medium">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-8 text-gray-500">
                  Free online distance judgment visual drill. Train depth perception and timing. No registration required.
                </p>
                
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Twitter / X">
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
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    indigo: 'bg-indigo-600 text-indigo-300 border-indigo-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    green: 'bg-green-600 text-green-300 border-green-500',
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500'
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
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500'
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,63,94,0.1)] hover:-translate-y-1 hover:border-rose-500/50 flex flex-col h-full`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-rose-500 to-pink-500'}`}></div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-black border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-rose-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-gray-500 flex-1">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-rose-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}