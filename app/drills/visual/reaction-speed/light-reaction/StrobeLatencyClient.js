'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Clock, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Trophy, Info, Share2,
  GraduationCap, Lightbulb, TrendingUp, BarChart3,
  Brain, Users, ArrowRight,
  RefreshCw, Award, XCircle,
  AlertTriangle, Crosshair, Calculator, Code2, LogOut
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';

// ==========================================
// ZERO-LATENCY AUDIO SYNTHESIZER
// ==========================================
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

  playDrillSound(type) { 
    if (!this.enabled || !this.ctx) return; 
    try { 
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const o = this.ctx.createOscillator(); 
      const g = this.ctx.createGain(); 
      o.connect(g); 
      g.connect(this.ctx.destination); 
      const n = this.ctx.currentTime; 
      
      const fm = { perfect: 880, penalty: 150, flash: 1046 }; 
      const gm = { perfect: 0.2, penalty: 0.3, flash: 0.05 }; 
      
      if (type === 'penalty') o.type = 'triangle';
      else o.type = 'sine';
      
      o.frequency.setValueAtTime(fm[type] || 440, n); 
      g.gain.setValueAtTime(gm[type] || 0.1, n); 
      g.gain.exponentialRampToValueAtTime(0.001, n + 0.2); 
      o.start(n); o.stop(n + 0.2); 
    } catch (e) {} 
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ==========================================
// ERROR BOUNDARY
// ==========================================
class GameErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('Game Error:', error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 rounded-xl z-50 border border-red-500/30">
          <div className="text-center p-6">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-white text-lg font-bold mb-2">Engine Fault Detected</h3>
            <p className="text-gray-400 text-sm mb-4">The visual engine encountered a fatal error.</p>
            <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Reboot Engine</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function StrobeLatencyClient() {
  // === UI State ===
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  // === Game State ===
  const [customScore, setCustomScore] = useState(0);
  const customScoreRef = useRef(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  const localTimeRef = useRef(60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const timerIntervalRef = useRef(null);

  // === God-Level Mechanics ===
  const [isFlashing, setIsFlashing] = useState(false);
  const isFlashingRef = useRef(false); // Visual Truth
  const isReactionWindowOpenRef = useRef(false); // Input Truth (Locked to 200ms)
  
  const [perfectHits, setPerfectHits] = useState(0);
  const [failedHits, setFailedHits] = useState(0);
  const [bestReaction, setBestReaction] = useState(0);
  
  const flashDurationRef = useRef(200); // Visual duration shrinks from 200ms to 8ms
  const startTimeRef = useRef(0);
  const bestReactionRef = useRef(0);
  
  const cycleTimeoutRef = useRef(null);
  const visualTimeoutRef = useRef(null);
  const reactionTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const hasInitializedRoundRef = useRef(false);

  // Dynamic feedback
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });
  const feedbackTimerRef = useRef(null);

  // === Engine ===
  const engine = useGameEngine({
    category: 'visual',
    drillId: 'strobe-latency',
    drillName: 'Strobe Latency Lab',
    totalGameTime: 9999, // Custom local timer overriding this
    lives: 9999,
    infiniteLives: true,
    sharePath: 'drills/visual/reaction-speed/strobe-latency',
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  
  const gameStateRef = useRef(engine.gameState);
  const engineRef = useRef(engine);
  
  // === Sync Refs ===
  useEffect(() => { gameStateRef.current = engine.gameState; }, [engine.gameState]);
  useEffect(() => { engineRef.current = engine; }, [engine]);
  useEffect(() => { customScoreRef.current = customScore; }, [customScore]);

  // === Mount Logic ===
  useEffect(() => { 
    setIsClient(true); 
    const timer = setTimeout(() => setLoading(false), 100); 
    return () => clearTimeout(timer);
  }, []);

  // === Audio Engine Setup ===
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // === Custom Decoupled Timer ===
  useEffect(() => {
    if (engine.gameState !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }
    
    if (!isTimeUp && localTimeRef.current === 60 && localTimeRemaining === 60) {
      // Intial sync 
    } else if (!isTimeUp && localTimeRef.current <= 0) {
      localTimeRef.current = 60;
      setLocalTimeRemaining(60);
    }

    timerIntervalRef.current = setInterval(() => {
      localTimeRef.current -= 1;
      
      if (localTimeRef.current <= 0) {
        localTimeRef.current = 0;
        setLocalTimeRemaining(0);
        clearInterval(timerIntervalRef.current);
        setIsTimeUp(true); 
        
        if (typeof engineRef.current.endGame === 'function') engineRef.current.endGame();
      } else {
        setLocalTimeRemaining(localTimeRef.current);
      }
    }, 1000);
    
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [engine.gameState, isTimeUp, localTimeRemaining]);

  // === UI Handlers ===
  useEffect(() => {
    try { const name = localStorage.getItem('skilldrills_player_name'); if (name) setPlayerNameInput(name); } catch (e) {}
  }, []);

  useEffect(() => { 
    const h = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', h); 
    return () => document.removeEventListener('fullscreenchange', h); 
  }, []);

  const cleanupAllTimers = useCallback(() => {
    if (cycleTimeoutRef.current) { clearTimeout(cycleTimeoutRef.current); cycleTimeoutRef.current = null; }
    if (visualTimeoutRef.current) { clearTimeout(visualTimeoutRef.current); visualTimeoutRef.current = null; }
    if (reactionTimeoutRef.current) { clearTimeout(reactionTimeoutRef.current); reactionTimeoutRef.current = null; }
    if (animationRef.current) { cancelAnimationFrame(animationRef.current); animationRef.current = null; }
  }, []);

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen) { await containerRef.current?.requestFullscreen(); } 
      else { if (document.fullscreenElement) await document.exitFullscreen(); } 
    } catch (err) {} 
  }, [isFullscreen]);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 800);
  }, []);

  // === Score & Time Mutator ===
  const updateEconomy = useCallback((points, timeModifier) => {
    setCustomScore(prev => {
      const ns = Math.max(0, prev + points);
      customScoreRef.current = ns;
      return ns;
    });
    
    // Max 60 seconds strict clamp
    localTimeRef.current = Math.min(60, Math.max(0, localTimeRef.current + timeModifier));
    setLocalTimeRemaining(localTimeRef.current);
    
    if (localTimeRef.current <= 0) {
      setIsTimeUp(true);
      if (typeof engineRef.current.endGame === 'function') engineRef.current.endGame();
    }
  }, []);

  // === God-Level Drill Mechanics ===
  const startFlash = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing' || isTimeUp) return;
    
    // Both windows open
    isReactionWindowOpenRef.current = true;
    isFlashingRef.current = true;
    setIsFlashing(true);
    
    startTimeRef.current = performance.now();
    if (audioSynth) audioSynth.playDrillSound('flash');
    
    // 1. Visual Off (Shrinking Duration)
    visualTimeoutRef.current = setTimeout(() => {
      isFlashingRef.current = false;
      setIsFlashing(false);
    }, flashDurationRef.current);
    
    // 2. Strict 200ms Reaction Penalty
    reactionTimeoutRef.current = setTimeout(() => {
      if (isActiveRef.current && gameStateRef.current === 'playing' && !isTimeUp && isReactionWindowOpenRef.current) {
        
        isReactionWindowOpenRef.current = false;
        isFlashingRef.current = false;
        setIsFlashing(false);
        setFailedHits(prev => prev + 1);
        
        // Timeout penalty: -5 Score, -2 Seconds
        updateEconomy(-5, -2);
        flashDurationRef.current = Math.min(200, flashDurationRef.current + 15); // Expand visual window slightly on failure
        
        if (audioSynth) audioSynth.playDrillSound('penalty');
        triggerFeedback('⏳ TIMEOUT (>200ms)! -5 PTS | -2s', 'error');
        
        // eslint-disable-next-line no-use-before-define
        scheduleNextFlash();
      }
    }, 200);

  }, [updateEconomy, isTimeUp, triggerFeedback]);

  const scheduleNextFlash = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing' || isTimeUp) return;
    
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    
    const delay = 800 + Math.random() * 2000; 
    cycleTimeoutRef.current = setTimeout(() => {
      if (!isActiveRef.current || gameStateRef.current !== 'playing' || isTimeUp) return;
      startFlash();
    }, delay);
  }, [isTimeUp, startFlash]);

  // SAFE INITIALIZATION LOOP
  useEffect(() => {
    if (engine.gameState === 'playing' && !isTimeUp) {
      if (!hasInitializedRoundRef.current) {
        setPerfectHits(0);
        setFailedHits(0);
        setBestReaction(0);
        
        isFlashingRef.current = false;
        setIsFlashing(false);
        isReactionWindowOpenRef.current = false;
        
        setCustomScore(0);
        customScoreRef.current = 0;
        isActiveRef.current = true;
        bestReactionRef.current = 0;
        flashDurationRef.current = 200; 
        
        cleanupAllTimers();
        scheduleNextFlash();

        hasInitializedRoundRef.current = true;
      }
    } else {
      hasInitializedRoundRef.current = false;
    }
  }, [engine.gameState, isTimeUp, scheduleNextFlash, cleanupAllTimers]);

  useEffect(() => {
    if (engine.gameState === 'ended' || engine.gameState === 'start' || isTimeUp) {
      cleanupAllTimers();
      isFlashingRef.current = false;
      setIsFlashing(false);
      isReactionWindowOpenRef.current = false;
      isActiveRef.current = false;
    }
  }, [engine.gameState, isTimeUp, cleanupAllTimers]);

  // === Zero-Latency Universal Input Handler ===
  const handleInteraction = useCallback((e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    if (gameStateRef.current !== 'playing' || !isActiveRef.current || isTimeUp) return;
    
    e.stopPropagation();

    if (isReactionWindowOpenRef.current) {
      // CORRECT HIT (+10 PTS | +3s | Increase Visual Difficulty)
      const reaction = Math.floor(performance.now() - startTimeRef.current);
      
      if (reaction > 200) return; // Failsafe for strict bound

      if (bestReactionRef.current === 0 || reaction < bestReactionRef.current) {
        bestReactionRef.current = reaction;
        setBestReaction(reaction);
      }
      
      updateEconomy(10, 3);
      setPerfectHits(prev => prev + 1);
      
      // God Level Shrink: Minimum 8ms Flash Duration
      flashDurationRef.current = Math.max(8, flashDurationRef.current - 12);
      
      if (audioSynth) audioSynth.playDrillSound('perfect');
      triggerFeedback(`✓ ${reaction}ms! +10 PTS | +3s`, 'success');
      
      isReactionWindowOpenRef.current = false;
      isFlashingRef.current = false;
      setIsFlashing(false);
      
      if (visualTimeoutRef.current) clearTimeout(visualTimeoutRef.current);
      if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
      if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
      
      setTimeout(() => {
        if (gameStateRef.current === 'playing' && isActiveRef.current) {
          scheduleNextFlash();
        }
      }, 300);

    } else {
      // EARLY CLICK PENALTY (-5 PTS | -2s | Decrease Visual Difficulty)
      updateEconomy(-5, -2);
      setFailedHits(prev => prev + 1);
      flashDurationRef.current = Math.min(200, flashDurationRef.current + 15); 
      
      if (audioSynth) audioSynth.playDrillSound('penalty');
      triggerFeedback('✗ EARLY! -5 PTS | -2s', 'error');
      
      if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
      if (visualTimeoutRef.current) clearTimeout(visualTimeoutRef.current);
      if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
      
      isReactionWindowOpenRef.current = false;
      isFlashingRef.current = false;
      setIsFlashing(false);
      
      setTimeout(() => {
        if (gameStateRef.current === 'playing' && isActiveRef.current) {
          scheduleNextFlash();
        }
      }, 400);
    }
  }, [isTimeUp, scheduleNextFlash, updateEconomy, triggerFeedback]);

  // === Canvas Render Loop ===
  useEffect(() => {
    if (engine.gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const update = () => {
      const container = containerRef.current; if (!container) return;
      const rr = container.getBoundingClientRect();
      
      let w = rr.width, h = rr.height;
      
      if (!document.fullscreenElement) {
        h = w * (9 / 16);
        if (h > rr.height) { h = rr.height; w = h * (16 / 9); }
      }

      cvs.width = w; cvs.height = h;
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rr.width - w) / 2}px`;
      cvs.style.top = `${(rr.height - h) / 2}px`;
    };

    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', update);
    update();

    const loop = () => {
      if (!isActiveRef.current && engine.gameState !== 'playing') return;
      
      ctx.fillStyle = isBoxDarkMode ? "#050508" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      ctx.fillStyle = isBoxDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
      for(let i=0; i<cvs.width; i+=40) ctx.fillRect(i, 0, 1, cvs.height);
      for(let i=0; i<cvs.height; i+=40) ctx.fillRect(0, i, cvs.width, 1);
      
      const cx = cvs.width / 2, cy = cvs.height / 2, radius = 52;
      
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      
      if (isFlashingRef.current) { 
        ctx.fillStyle = "#FFFFFF"; 
        ctx.shadowBlur = 30; 
        ctx.shadowColor = "#FFFFFF"; 
      } else { 
        ctx.fillStyle = isBoxDarkMode ? "#151515" : "#e0e0e0"; 
        ctx.shadowBlur = 0; 
      }
      ctx.fill(); ctx.shadowBlur = 0;
      
      ctx.beginPath(); ctx.arc(cx, cy, radius - 3, 0, Math.PI * 2);
      ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
      ctx.lineWidth = 1; ctx.stroke();
      
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = isFlashingRef.current ? "#000000" : (isBoxDarkMode ? "#333333" : "#999999");
      ctx.fill();
      
      animationRef.current = requestAnimationFrame(loop);
    };
    
    animationRef.current = requestAnimationFrame(loop);
    return () => { 
      cancelAnimationFrame(animationRef.current); 
      window.removeEventListener('resize', update); 
      ro.disconnect(); 
    };
  }, [engine.gameState, isBoxDarkMode]);

  // === Start / Exit Routines ===
  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    setIsTimeUp(false);
    setCustomScore(0);
    customScoreRef.current = 0;
    localTimeRef.current = 60;
    setLocalTimeRemaining(60);
    
    // Auto-Fullscreen on Start
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (err) {}

    engine.startGame();
  }, [engine]);

  const handleExitToStart = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    window.location.reload(); 
  }, []);

  const sharePage = async () => {
    const url = 'https://skilldrills.online/drills/visual/reaction-speed/strobe-latency';
    if (navigator.share) {
      try { await navigator.share({ title: 'Strobe Latency Drill', text: 'Train pure visual reaction speed!', url }); } catch (e) {}
    } else { try { await navigator.clipboard.writeText(url); alert('Link copied!'); } catch (e) {} }
  };

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

  const totalHits = perfectHits + failedHits;
  const accuracy = totalHits > 0 ? Math.round((perfectHits / totalHits) * 100) : 0;

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`} style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
              <li className="text-gray-600">/</li>
              <li><Link href="/drills/visual" className="text-gray-500 hover:text-gray-300 transition-colors">Visual Drills</Link></li>
              <li className="text-gray-600">/</li>
              <li className="text-blue-400 font-medium" aria-current="page">Strobe Latency Lab</li>
            </ol>
          </nav>
        )}
        
        {/* Header */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Timer className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Strobe Latency Lab</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Endless Time-Attack • Reaction Training • Direct Input</p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0 flex-wrap">
              
              {engine.gameState === 'playing' && !isTimeUp && <button onClick={() => { if(engine.endGame) engine.endGame(); handleStartGame(); }} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`} title="Reset"><RefreshCw className="w-5 h-5" /></button>}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`} title="Toggle inner canvas theme"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
            </div>
          </div>
        )}

        {/* Player Name Input */}
        {showNameInput && (
          <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-900 shadow-xl animate-in fade-in slide-in-from-top-2">
            <input type="text" value={playerNameInput} onChange={e => { setPlayerNameInput(e.target.value); try { localStorage.setItem('skilldrills_player_name', e.target.value); } catch (err) {} }} placeholder="Enter display name" maxLength={20} className="w-full sm:w-64 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
        )}

        {/* Stats Bar */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
            <StatCard icon={<Target className="text-blue-400" />} value={customScore} label="Score" d={isDarkMode} />
            <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={localTimeRemaining} label="Time" unit="s" d={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-400" />} value={engine.bestScore || 0} label="Best" d={isDarkMode} />
            <StatCard icon={<Award className="text-green-400" />} value={perfectHits} label="Hits" d={isDarkMode} />
            <StatCard icon={<XCircle className="text-red-400" />} value={failedHits} label="Misses" d={isDarkMode} />
            <StatCard icon={<Clock className="text-purple-400" />} value={bestReaction || '-'} label="Best RT" unit="ms" d={isDarkMode} />
            <StatCard icon={<BarChart3 className="text-indigo-400" />} value={accuracy} label="Accuracy" unit="%" d={isDarkMode} />
          </div>
        )}

        {/* Dynamic Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {localFeedback.visible && (
            <div key={localFeedback.id} className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
              {localFeedback.text}
            </div>
          )}
        </div>

        {/* Game Area (Optimized for Universal Input) */}
        <GameErrorBoundary>
          <div ref={containerRef} 
               onPointerDown={handleInteraction}
               className={`relative overflow-hidden flex flex-col transition-all duration-100 ${
                 isFullscreen 
                   ? 'fixed inset-0 z-50 w-screen h-screen' 
                   : 'w-full rounded-2xl border shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[600px] lg:min-h-[650px] md:aspect-video'
               }`} 
               style={{ 
                 margin: '0 auto', 
                 borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                 backgroundColor: isBoxDarkMode ? '#050811' : '#f9fafb',
                 touchAction: 'none' // Crucial: Stops mobile from zooming or scrolling when tapping
               }}>
            
            {/* Time Progress Bar */}
            {engine.gameState === 'playing' && !isTimeUp && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
                <div className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`} style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} />
              </div>
            )}

            {/* Fullscreen HUD */}
            {isFullscreen && engine.gameState === 'playing' && !isTimeUp && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={() => { if(engine.endGame) engine.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={() => setSoundEnabled(!soundEnabled)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
              </div>
            )}

            <canvas ref={canvasRef} className="block absolute touch-none cursor-crosshair z-[10] pointer-events-none" />
            
            {/* Start Screen (Clean & Simple) */}
            {engine.gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm p-4 overflow-y-auto pointer-events-auto">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full border border-gray-700 bg-gray-900 shadow-2xl flex flex-col my-auto shrink-0">
                  <div className="flex-1 mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                      <Timer className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">Strobe Latency Lab</h2>
                  </div>

                  <button onPointerDown={(e)=>e.stopPropagation()} onClick={handleStartGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:outline-none shrink-0">
                    <Timer className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* End Screen (Optimized for Mobile Visibility) */}
            {(engine.gameState === 'ended' || isTimeUp) && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 p-4 overflow-y-auto">
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[90vh] my-auto shrink-0">
                  
                  <div className="flex-1 overflow-y-auto">
                    <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-5 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        {customScore > (engine.bestScore || 0) && customScore > 0 && (
                          <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                            ⭐ New Personal Best
                          </div>
                        )}
                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                        <p className="text-blue-400 font-medium text-sm">Strobe Latency Lab</p>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 pointer-events-none shrink-0">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                          <div className="flex items-end gap-1">
                            <span className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tighter">{customScore}</span>
                            <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">PTS</span>
                          </div>
                        </div>
                        
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                            <path className="text-gray-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path 
                              className={`${accuracy >= 80 ? 'text-blue-500' : accuracy >= 50 ? 'text-cyan-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                              strokeWidth="3" strokeDasharray="100" strokeDashoffset={100 - accuracy} strokeLinecap="round" stroke="currentColor" fill="none" 
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-lg sm:text-xl font-black ${accuracy >= 80 ? 'text-blue-400' : accuracy >= 50 ? 'text-cyan-400' : 'text-red-400'}`}>{accuracy}%</span>
                            <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2">
                        <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                          <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Perfect Hits</div>
                          <div className="text-lg sm:text-xl font-black text-green-400">{perfectHits}</div>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                          <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Miss/Early</div>
                          <div className="text-lg sm:text-xl font-black text-red-400">{failedHits}</div>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                          <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Best RT</div>
                          <div className="text-lg sm:text-xl font-black text-purple-400">{bestReaction ? `${bestReaction}ms` : '-'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 shrink-0 rounded-b-3xl">
                    <button onPointerDown={(e)=>e.stopPropagation()} onClick={() => { if(engine.endGame) engine.endGame(); handleStartGame(); }} className="flex-1 py-3 sm:py-4 bg-blue-600 text-white rounded-xl font-black tracking-wide hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                    </button>
                    <button onPointerDown={(e)=>e.stopPropagation()} onClick={sharePage} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onPointerDown={(e)=>e.stopPropagation()} onClick={handleExitToStart} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
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
                  <RuleItem num="1" color="blue" text="Click ONLY on the" highlight="White Flash" result="+10 PTS | +3s" />
                  <RuleItem num="2" color="cyan" text="God Level Scaling" highlight="Flash shrinks to 8ms" result="Limit remains 200ms" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Early click or >200ms" result="-5 PTS | -2s" />
                  <RuleItem num="4" color="purple" text="Zero Latency Input" highlight="Desktop & Mobile" result="Direct Touch Support" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================== */}
        {/* ABOUT, HOW TO PLAY, & FAQ                  */}
        {/* ========================================== */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-blue-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About This Strobe Latency Drill</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This pure visual reaction speed drill tests your ability to detect and respond to sudden sensory input within milliseconds. By strictly penalizing any clicks slower than 200ms and shrinking the actual visual stimulus down to a fraction of a frame, it isolates true reactive processing speed and pushes you toward genetic limits.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Target Audience</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Esports athletes, competitive FPS gamers, martial artists, and individuals seeking to establish and push their absolute genetic reaction boundaries.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Trained</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Visual strobe detection latency, impulse inhibition (suppressing early predictive clicks), sustained focal attention, and neuro-motor output speed.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Performance Metrics</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score progression, aggregate accuracy mapping, true millisecond (ms) best response, and raw precision vs anticipation failure rates.</p>
                  </div>
                </div>

                {/* How to Play Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play</h3>
                  </div>
                  <ol className="list-decimal pl-5 space-y-2 text-xs text-gray-400 leading-relaxed">
                    <li><strong className="text-gray-200">Centralized Gaze:</strong> Anchor your vision directly onto the dark indicator sphere. Do not let your eyes wander across the canvas.</li>
                    <li><strong className="text-gray-200">Unpredictable Strobe:</strong> The target will flash brilliant white at completely chaotic, randomly generated intervals.</li>
                    <li><strong className="text-gray-200">Instant Execution:</strong> Click your physical mouse button or tap anywhere on the screen the absolute millisecond you register the bright strobe.</li>
                    <li><strong className="text-gray-200">Maintain Impulse Discipline:</strong> Avoid predictive click rhythms. Pre-firing early clicks or missing the strictly capped 200ms reaction window strips your total remaining time.</li>
                  </ol>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-blue-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why does the screen flash randomly?</h4>
                      <p className="text-xs text-gray-400 mt-1">If the flash happened at a consistent rhythm, your brain would use predictive timing to click rather than true visual reaction. The randomness guarantees the latency measured is purely your reflex arc.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">How exactly does the scoring and time work?</h4>
                      <p className="text-xs text-gray-400 mt-1">This is an Endless Time-Attack mode. You start with 60 seconds. A perfect reaction grants +10 Points and adds +3 seconds to your clock. Missing a flash or clicking early applies a -5 Point deduction and strips 2 seconds away.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">What makes this "God Level"?</h4>
                      <p className="text-xs text-gray-400 mt-1">Average human visual reaction speed falls between 200ms and 250ms. By setting a hard reaction limit of 200ms and shrinking the actual visual flash down to 8ms, this drill pushes your sensory processing to absolute peak genetic execution.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ========================================== */}
        {/* RELATED DRILLS                             */}
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
              <RelatedCard href="/drills/visual/reaction-speed/light-reaction" title="Light Reaction" desc="Test basic visual reaction time with color changes." color="blue" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Raw input aim training for competitive FPS." color="green" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/reaction-speed/go/no-go" title="Chroma-Sync Lab" desc="Go/No-Go impulse control with adaptive window." color="purple" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/tracking-accuracy/moving-target" title="Moving Target" desc="Track and click unpredictable moving spheres." color="orange" icon={<Activity className="w-4 h-4" />} />
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
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-blue-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-blue-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All FPS Drills →</Link></li>
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
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-blue-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-blue-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-blue-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-blue-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-blue-400 transition-colors">Visual (14)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-blue-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500/25 to-cyan-500/25 border border-blue-500/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-blue-400" />
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
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
    purple: 'bg-purple-600 text-purple-300 border-purple-500'
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
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-blue-500 to-cyan-500'}`}></div>
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