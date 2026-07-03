'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, 
  Info, Brain, RefreshCw,
  Crosshair, Users, Share2, 
  GraduationCap, Lightbulb, TrendingUp, ArrowRight,
  ChevronRight, Play, CheckCircle, XCircle, LogOut ,BarChart3, Eye,
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

  playPop() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.1);
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
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }
  
  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ============================================================
// LOCAL STORAGE
// ============================================================
const STORAGE_KEY = 'skilldrills_neuroswitch_v4';

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

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function EliteNeuroSwitch() {
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
  
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(1200);

  const [redTarget, setRedTarget] = useState({ x: 50, y: 50 });
  const [blueTarget, setBlueTarget] = useState({ x: 20, y: 20 });
  const [flashBg, setFlashBg] = useState(null);

  // === Custom Decoupled Timer ===
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // === Absolute Truth Refs ===
  const mountedRef = useRef(false);
  const gameContainerRef = useRef(null);
  
  const scoreRef = useRef(0);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const localTimeRef = useRef(60);
  const speedRef = useRef(1200);
  const redTargetRef = useRef({ x: 50, y: 50 }); // Track for distance calculations
  
  const mainLoopTimerRef = useRef(null);
  const backgroundTimerRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  
  const gameStateRef = useRef('start');

  // Sync state for UI rendering
  const syncToUI = useCallback(() => {
    setScore(scoreRef.current);
    setHits(hitsRef.current);
    setMisses(missesRef.current);
    setCurrentSpeed(speedRef.current);
  }, []);

  // === Game Engine ===
  const engine = useGameEngine({
    category: 'cognitive',
    drillId: 'elite-neuro-switch',
    drillName: 'Elite Neuro-Switch',
    totalGameTime: 9999, // Handled by our custom timer entirely
    lives: 9999, 
    infiniteLives: true, 
    sharePath: 'drills/cognitive/processing-speed/reaction-time',
  });

  const engineRef = useRef(engine);

  useEffect(() => {
    engineRef.current = engine;
    gameStateRef.current = engine.gameState;
    if (engine.gameState === 'playing') {
      setIsNewBest(false);
    }
  }, [engine.gameState]);

  // === STRICT PRECISION CLOCK ===
  useEffect(() => {
    if (engine.gameState !== 'playing' || isTimeUp) {
      if (backgroundTimerRef.current) clearInterval(backgroundTimerRef.current);
      return;
    }

    backgroundTimerRef.current = setInterval(() => {
      localTimeRef.current -= 1;
      
      if (localTimeRef.current <= 0) {
        localTimeRef.current = 0;
        setLocalTimeRemaining(0);
        clearInterval(backgroundTimerRef.current);
        setIsTimeUp(true); 
        
        if (typeof engineRef.current?.endGame === 'function') {
          engineRef.current.endGame();
        }
      } else {
        setLocalTimeRemaining(localTimeRef.current);
      }
    }, 1000);
    
    return () => {
      if (backgroundTimerRef.current) clearInterval(backgroundTimerRef.current);
    };
  }, [engine.gameState, isTimeUp]);

  // Audio Sync
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Load Data
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
      if (backgroundTimerRef.current) clearInterval(backgroundTimerRef.current);
      if (mainLoopTimerRef.current) clearTimeout(mainLoopTimerRef.current);
    };
  }, []);

  // Screen Guard
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsHandler);
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) && window.screen && Math.max(window.screen.width, window.screen.height) < 1024;
      if (!isMobile) { setShowRotateWarning(false); return; }
      setShowRotateWarning(window.innerHeight > window.innerWidth && window.innerWidth < 768);
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
    if (engine.gameState === 'ended' || isTimeUp) {
      const finalScore = scoreRef.current;
      if (finalScore > bestScore && finalScore > 0) {
        setIsNewBest(true);
        setBestScore(finalScore);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ bestScore: finalScore })); } catch(e){}
      }
      syncToUI();
      if (mainLoopTimerRef.current) clearTimeout(mainLoopTimerRef.current);
    }
  }, [engine.gameState, isTimeUp, bestScore, syncToUI]);

  // === UI Handlers ===
  const savePlayerName = useCallback(() => {
    const name = playerNameInput.trim() || 'Anonymous Player';
    try { localStorage.setItem('skilldrills_player_name', name); } catch (e) {}
    setShowNameInput(false);
  }, [playerNameInput]);

  const enterFullscreen = useCallback(async () => {
    if (!gameContainerRef.current) return;
    try {
      const el = gameContainerRef.current;
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
    // Use location reload to guarantee a 100% clean reset to the start screen state
    window.location.reload();
  }, [exitFullscreen]);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 600);
  }, []);

  // === CORE MECHANICS: Positioning & Loop ===
  const spawnTargets = useCallback(() => {
    if (gameStateRef.current !== 'playing' || isTimeUp) return;

    let rx, ry, bx, by, distBlueToRed, distToPrev;
    
    // Prevent spawning near the previous RED target location to force eye movement
    do {
      rx = 10 + Math.random() * 80;
      ry = 10 + Math.random() * 80;
      distToPrev = Math.sqrt(Math.pow(rx - redTargetRef.current.x, 2) + Math.pow(ry - redTargetRef.current.y, 2));
    } while (distToPrev < 35); // 35% distance

    // Prevent BLUE target from overlapping the RED target
    do {
      bx = 10 + Math.random() * 80;
      by = 10 + Math.random() * 80;
      distBlueToRed = Math.sqrt(Math.pow(rx - bx, 2) + Math.pow(ry - by, 2));
    } while (distBlueToRed < 30); // 30% distance

    redTargetRef.current = { x: rx, y: ry };
    setRedTarget({ x: rx, y: ry });
    setBlueTarget({ x: bx, y: by });

    // Auto-Timeout Loop
    if (mainLoopTimerRef.current) clearTimeout(mainLoopTimerRef.current);
    mainLoopTimerRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing' && mountedRef.current && !isTimeUp) {
        
        // TIMEOUT (Too Slow): -3 Score, -1s Time Penalty, decrease difficulty
        scoreRef.current = Math.max(0, scoreRef.current - 3);
        missesRef.current += 1;
        
        localTimeRef.current = Math.max(0, localTimeRef.current - 1);
        setLocalTimeRemaining(localTimeRef.current);
        
        // Decrease speed (make it easier)
        speedRef.current = Math.min(1200, speedRef.current + 20);

        if (localTimeRef.current <= 0) {
          setIsTimeUp(true);
          if (typeof engineRef.current?.endGame === 'function') engineRef.current.endGame();
          return;
        }
        
        syncToUI();
        triggerFeedback('Too Slow! -3 PTS | -1s', 'error');
        setFlashBg('red');
        setTimeout(() => setFlashBg(null), 150);
        
        spawnTargets();
      }
    }, speedRef.current);
  }, [isTimeUp, syncToUI, triggerFeedback]);

  // === INTERACTION HANDLERS ===
  const handleRedClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    if (gameStateRef.current !== 'playing' || isTimeUp) return;

    if (audioSynth) audioSynth.playPop();
    
    // PERFECT HIT: +5 Score, +2s Time (Max 60), Increase difficulty
    scoreRef.current += 5;
    hitsRef.current += 1;
    
    localTimeRef.current = Math.min(60, localTimeRef.current + 2);
    setLocalTimeRemaining(localTimeRef.current);
    
    // Speed Ramp: Increase speed by 20ms (cap at 400ms)
    speedRef.current = Math.max(400, speedRef.current - 20);
    
    syncToUI();
    triggerFeedback('Perfect! +5 PTS | +2s', 'success');
    
    setFlashBg('green');
    setTimeout(() => setFlashBg(null), 100);

    spawnTargets();
  }, [isTimeUp, syncToUI, triggerFeedback, spawnTargets]);

  const handlePenaltyClick = useCallback((e, type) => {
    e.stopPropagation();
    e.preventDefault();
    if (gameStateRef.current !== 'playing' || isTimeUp) return;

    if (audioSynth) audioSynth.playBuzz();
    
    // WRONG HIT: -3 Score, -1s Time, Decrease difficulty
    scoreRef.current = Math.max(0, scoreRef.current - 3);
    missesRef.current += 1;
    
    localTimeRef.current = Math.max(0, localTimeRef.current - 1);
    setLocalTimeRemaining(localTimeRef.current);
    
    speedRef.current = Math.min(1200, speedRef.current + 20);
    
    // Check for immediate Game Over
    if (localTimeRef.current <= 0) {
      setIsTimeUp(true);
      if (typeof engineRef.current?.endGame === 'function') {
        engineRef.current.endGame();
      }
      return;
    }
    
    syncToUI();
    triggerFeedback(type === 'blue' ? 'Wrong Target! -3 PTS | -1s' : 'Missed! -3 PTS | -1s', 'error');
    
    setFlashBg('red');
    setTimeout(() => setFlashBg(null), 100);

    spawnTargets();
  }, [isTimeUp, syncToUI, triggerFeedback, spawnTargets]);

  // Start sequence
  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    
    // Auto Fullscreen Trigger
    await enterFullscreen();

    // Hard Reset state
    setIsTimeUp(false);
    localTimeRef.current = 60;
    setLocalTimeRemaining(60);
    
    scoreRef.current = 0;
    hitsRef.current = 0;
    missesRef.current = 0;
    speedRef.current = 1200; 
    
    syncToUI();
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });
    
    engineRef.current.startGame();

    setTimeout(() => spawnTargets(), 300);
  }, [syncToUI, spawnTargets, enterFullscreen]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/cognitive/attention/elite-neuro-switch';
    if (navigator.share) {
      navigator.share({ title: 'Elite Neuro-Switch Drill', text: 'Hardcore cognitive reaction drill! Can you survive?', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(239,68,68,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Neuro-Switch...</p>
        </div>
      </div>
    );
  }

  const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 100;
  const calculatedLevel = Math.max(1, Math.floor((1200 - currentSpeed) / 50) + 1);

  // Dynamic scaling: as currentSpeed drops from 1200 down to 400, scale goes from 1.0 down to 0.5
  const scaleFactor = Math.max(0, Math.min(1, (currentSpeed - 400) / 800));
  const dynamicScale = 0.5 + (scaleFactor * 0.5);

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
            <li className="text-gray-500">Attention</li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-red-400 font-medium">Elite Neuro-Switch</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Elite Neuro-Switch</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Endless Time-Attack • Precision Scoring</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            
            {engine.gameState === 'playing' && !isTimeUp && (
              <button onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset">
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {showNameInput && (
          <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-900 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <input type="text" value={playerNameInput} onChange={e => setPlayerNameInput(e.target.value)} placeholder="Enter your display name" maxLength={20}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                onKeyDown={e => e.key === 'Enter' && savePlayerName()} />
              <button onClick={savePlayerName} className="px-5 py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-500 transition-colors shadow-lg shadow-red-600/20">Save</button>
            </div>
          </div>
        )}

        {/* Optimized Inline Stats Bar (Clean & Responsive) */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-2 w-full">
          <StatCard icon={<Target className="text-red-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining} label="Time" unit="s" />
          <StatCard icon={<Zap className="text-indigo-400" />} value={`Lv.${calculatedLevel}`} label="Speed Lvl" />
          <StatCard icon={<Crosshair className="text-purple-400" />} value={`${accuracy}%`} label="Acc" />
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

        {/* Game Container (Optimized for True Fullscreen & Balanced Landscape/Desktop View) */}
        <div ref={gameContainerRef} 
          onContextMenu={(e) => { if(engine.gameState === 'playing' && !isTimeUp) e.preventDefault(); }}
          onPointerDown={(e) => handlePenaltyClick(e, 'background')}
          className={`relative overflow-hidden transition-colors duration-100 mx-auto ${
            isFullscreen 
              ? 'fixed inset-0 z-50 flex items-center justify-center' 
              : 'rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] w-full aspect-[4/3] md:aspect-video min-h-[400px] max-h-[650px]'
          }`}
          style={{ 
            touchAction: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto', 
            overscrollBehavior: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto',
            backgroundColor: flashBg === 'red' ? '#450a0a' : flashBg === 'green' ? '#064e3b' : '#0a0a0a',
            ...(isFullscreen && { width: '100vw', height: '100vh', maxWidth: 'none', margin: 0, borderRadius: 0, border: 'none' })
          }}>
          
          {/* Subtle grid lines for depth */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

          {/* Time Progress Bar */}
          {engine.gameState === 'playing' && !isTimeUp && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-red-500'}`}
                style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
              />
            </div>
          )}

          {/* Rotation Notification Wrapper */}
          {showRotateWarning && engine.gameState !== 'playing' && (
            <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 touch-none">
              <div className="animate-bounce mb-6 text-red-500">
                <svg className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Rotate Device</h3>
              <p className="text-gray-400 mb-8 max-w-xs mx-auto">This drill requires a landscape view to play effectively.</p>
            </div>
          )}

          {isFullscreen && engine.gameState === 'playing' && !isTimeUp && (
            <div className="absolute top-4 right-4 z-[60] flex gap-2">
              <button onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={exitFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* Phase 2: The Targets (Instant Spawning, No Travel Animations) */}
          {engine.gameState === 'playing' && !isTimeUp && !showRotateWarning && (
            <>
              {/* RED TARGET (The Good One) */}
              <div 
                className="absolute z-20"
                style={{ left: `${redTarget.x}%`, top: `${redTarget.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <button
                  onPointerDown={handleRedClick}
                  className="touch-none focus:outline-none hover:brightness-125 active:scale-95 transition-transform"
                  style={{ transform: `scale(${dynamicScale})` }}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-500 border-4 border-red-300 shadow-[0_0_20px_rgba(239,68,68,0.8)] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full" />
                  </div>
                </button>
              </div>

              {/* BLUE DISTRACTOR (The Bad One) */}
              <div 
                className="absolute z-10"
                style={{ left: `${blueTarget.x}%`, top: `${blueTarget.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <button
                  onPointerDown={(e) => handlePenaltyClick(e, 'blue')}
                  className="touch-none focus:outline-none hover:brightness-125 active:scale-95 transition-transform"
                  style={{ transform: `scale(${dynamicScale})` }}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-500 border-4 border-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.6)] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full" />
                  </div>
                </button>
              </div>
            </>
          )}

          {/* Clean Start Screen (Just title and button) */}
          {engine.gameState === 'start' && !showRotateWarning && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 p-4">
              <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full border border-gray-700 bg-gray-900 shadow-2xl flex flex-col justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl mx-auto flex items-center justify-center mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                  <Brain className="w-10 h-10 text-white -rotate-3" />
                </div>
                <h2 className="text-3xl font-black mb-8 pointer-events-none tracking-tight">Elite Neuro-Switch</h2>
                
                <button 
                  onClick={handleStartGame}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-black text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(239,68,68,0.3)] shrink-0">
                  <Play className="w-5 h-5 fill-white" />
                  START DRILL
                </button>
              </div>
            </div>
          )}

          {/* Premium Custom End Screen (Optimized for Mobile visibility) */}
          {(engine.gameState === 'ended' || isTimeUp) && !showRotateWarning && (
            <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/90 pointer-events-auto animate-in fade-in duration-300 p-4">
              <div className="rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 bg-gray-950 overflow-hidden flex flex-col max-h-[95vh]">
                
                <div className="bg-gradient-to-br from-red-900/40 to-rose-900/40 p-5 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    {isNewBest && (
                      <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                        ⭐ New Personal Best
                      </div>
                    )}
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                    <p className="text-red-400 font-medium text-sm sm:text-base">Elite Neuro-Switch • Reached Speed Lvl {calculatedLevel}</p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pointer-events-none overflow-y-auto flex-1">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                      <div className="flex items-end gap-1">
                        <span className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tighter">{score}</span>
                        <span className="text-base sm:text-lg text-gray-500 font-bold mb-1">PTS</span>
                      </div>
                    </div>
                    
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
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
                        <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-900/50 rounded-xl p-3 text-center border border-gray-800">
                      <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Total Hits</div>
                      <div className="text-xl font-black text-green-400">{hits}</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-3 text-center border border-gray-800">
                      <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Total Mistakes</div>
                      <div className="text-xl font-black text-red-400">{misses}</div>
                    </div>
                  </div>
                </div>

                {/* Sticky Action Buttons */}
                <div className="p-4 sm:p-5 bg-gray-900/80 border-t border-gray-800 flex flex-wrap gap-2 sm:gap-3 shrink-0">
                  <button onClick={handleStartGame} className="flex-1 min-w-[140px] py-3.5 bg-red-600 text-white rounded-xl font-black tracking-wide hover:bg-red-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                    <RefreshCw className="w-5 h-5" /> PLAY AGAIN
                  </button>
                  <button onClick={shareDrillLink} className="px-5 py-3.5 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button onClick={handleExitGame} className="px-5 py-3.5 bg-gray-800 text-red-400 rounded-xl font-bold hover:bg-gray-700 hover:text-red-300 transition-all active:scale-95 border border-gray-700 flex items-center justify-center">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
                
              </div>
            </div>
          )}
        </div>

        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Target className="w-5 h-5 text-red-400" /><h2 className="font-bold text-white text-lg tracking-wide">Detailed Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="red" text="Tap the" highlight="RED target" result="+5 PTS | +2s" />
                  <RuleItem num="2" color="blue" text="Tapping the" highlight="BLUE target" result="-3 PTS | -1s" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="orange" text="Tapping the background" result="-3 PTS | -1s" />
                  <RuleItem num="4" color="purple" text="Missing the target entirely" result="-3 PTS | -1s" />
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
                <GraduationCap className="w-5 h-5 text-red-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About This Elite Neuro-Switch Drill</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This free Elite Neuro-Switch drill aggressively trains your selective attention, cognitive switching capability, and impulse control. It forces your brain to rapidly identify and engage a specific target (RED) while actively resisting a prominent distractor (BLUE). The Endless Time-Attack mode dynamically scales in difficulty—the faster you process the visual information accurately, the faster the targets shift and the smaller they shrink.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">FPS Gamers needing to spot enemies faster amidst chaos, athletes seeking quicker visual discrimination, and anyone wanting sharper selective attention.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Selective attention, visual-motor cognitive switching, impulse control, dynamic target acquisition, and sustained focus under pressure.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Overall score, hit/miss ratio, overall accuracy percentage, and the absolute maximum dynamic speed tier your brain can handle.</p>
                  </div>
                </div>

                {/* How to Play Section inside About Section */}
                <div className="p-6 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white tracking-wide">How to Play</h3>
                  </div>
                  <ol className="text-sm leading-relaxed space-y-4 list-decimal pl-5 text-gray-300">
                    <li>Instantly tap the <span className="text-red-400 font-bold">RED target</span> as soon as it appears on the screen.</li>
                    <li>Do NOT tap the <span className="text-blue-400 font-bold">BLUE target</span> or the empty background.</li>
                    <li>As you correctly hit targets, the drill speeds up and <span className="font-bold text-amber-400">targets dynamically shrink</span>, requiring extreme precision.</li>
                    <li>Manage your 60-second clock. Perfect hits bank time; misses drastically drain it.</li>
                  </ol>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-300">Why does my time suddenly jump down?</h4>
                      <p className="text-xs text-gray-400 mt-1">Every mistake (hitting the wrong target, clicking the background, or letting a target expire) costs you 1 second off the clock, along with a 3-point penalty.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-300">Is it possible to play infinitely?</h4>
                      <p className="text-xs text-gray-400 mt-1">Theoretically, yes. As long as you maintain high accuracy and speed, you gain +2 seconds per correct hit (capped at 60 seconds). However, the speed constantly increases and targets shrink, eventually forcing errors.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-300">How do I increase my accuracy?</h4>
                      <p className="text-xs text-gray-400 mt-1">Keep your eyes soft and focused on the center of the screen, relying on your peripheral vision to spot the red flash rather than moving your eyes frantically to every corner.</p>
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
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-red-500 to-rose-600"></div>
              <h2 className="text-xl font-bold text-white">Explore Related Free Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Divided Attention" desc="Focus on relevant information while ignoring distractions." color="blue" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/sustained-attention" title="Sustained Attention" desc="Maintain focus over extended periods without distraction." color="cyan" icon={<Timer className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/focus/concentration-grid" title="Concentration Grid" desc="Find numbers in sequence under time pressure." color="purple" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/processing-speed/reaction-time" title="Reaction Time" desc="Test visual reaction speed with simple click response." color="orange" icon={<Zap className="w-4 h-4" />} />
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
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-black text-xl tracking-tight">SkillDrills</span>
                </div>
                <p className="text-sm mb-3 font-medium">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-8 text-gray-500">
                  Free online elite neuro-switch cognitive drill. Train your selective attention and cognitive switching speed. No registration required.
                </p>
                
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779&sk=directory_intro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook">
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
    <div className="flex-1 min-w-[28%] sm:min-w-[15%] rounded-xl border border-gray-800 bg-gray-900 p-3 text-center flex flex-col justify-center min-h-[80px] transition-all duration-300 hover:border-gray-600 shadow-md pointer-events-none">
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
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    purple: 'bg-purple-600 text-purple-300 border-purple-500' 
  };
  const colors = colorMap[color] || 'bg-gray-600 text-gray-300 border-gray-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-gray-800 shadow-sm">
      <div className={`w-8 h-8 rounded-xl ${bg} border border-t-white/20 flex items-center justify-center text-white text-base font-black shadow-lg shrink-0`}>{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-300">
          {text}{highlight && <span className={`font-black ${txt}`}> {highlight}</span>}
        </p>
        <div className={`text-xs font-black px-3 py-1.5 rounded-lg bg-gray-900 border ${border} ${txt} whitespace-nowrap shadow-inner tracking-wide text-center shrink-0`}>
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
    indigo: 'from-indigo-500 to-blue-500',
    red: 'from-red-500 to-rose-500'
  };
  
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:-translate-y-1 hover:border-gray-600 flex flex-col h-full">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-blue-500 to-indigo-500'}`}></div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-black border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-red-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-gray-500 flex-1">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-red-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}