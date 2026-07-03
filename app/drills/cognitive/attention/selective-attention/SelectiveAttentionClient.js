'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Eye,
  BarChart3, Info, RefreshCw,
  Users, Share2, XCircle, Star, TrendingUp,
  GraduationCap, Lightbulb, Brain,
  ChevronRight, ArrowRight, Play, Award, Layers, CheckCircle2,
  Crosshair, Search, LogOut, Hash, RotateCcw
} from 'lucide-react';

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

  playHit() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  playMiss() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth'; 
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  playCombo() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(1046.5, this.ctx.currentTime); // C6
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
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
// MAIN COMPONENT
// ============================================================
export default function SelectiveAttentionClient() {
  
  // === UI State ===
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game State (Visual Sync) ===
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'ended'
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [wrongHits, setWrongHits] = useState(0);
  const [combo, setCombo] = useState(0);
  
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  const [targetColor, setTargetColor] = useState('');
  const [targetShape, setTargetShape] = useState('');
  const [items, setItems] = useState([]);
  const [showTargetDisplay, setShowTargetDisplay] = useState(true);

  // === Absolute Truth Refs (For lag-free processing & strict sync) ===
  const mountedRef = useRef(false);
  const gameContainerRef = useRef(null);
  
  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const timeRef = useRef(60.0);
  const speedRef = useRef(2000); // Dynamic difficulty speed
  
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const wrongsRef = useRef(0);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  
  const colors = useRef(['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan']);
  const shapes = useRef(['circle', 'square', 'triangle', 'star', 'heart', 'diamond']);
  const shapeIcons = useRef({ circle: '⚪', square: '⬛', triangle: '🔺', star: '⭐', heart: '❤️', diamond: '💎' });
  
  const targetColorRef = useRef('');
  const targetShapeRef = useRef('');
  const showTargetDisplayRef = useRef(true);
  
  const globalTimerIntervalRef = useRef(null);
  const roundTimerRef = useRef(null);
  const feedbackTimerRef = useRef(null);

  // Cross-reference declarations to prevent dependency cycles
  const handleTimeoutRef = useRef();
  const generateNewRoundRef = useRef();

  // Sync state for UI rendering safely
  const syncScoresToUI = useCallback(() => {
    setCurrentScore(scoreRef.current);
    setSuccessfulHits(hitsRef.current);
    setMissedHits(missesRef.current);
    setWrongHits(wrongsRef.current);
    setCombo(comboRef.current);
  }, []);

  // Audio Sync
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Initial Sync
  useEffect(() => {
    setIsClient(true);
    mountedRef.current = true;
    
    try {
      const savedBest = localStorage.getItem('skilldrills_selective_attention_best_v5');
      if (savedBest) setBestScore(parseInt(savedBest) || 0);
      
      const name = localStorage.getItem('skilldrills_player_name');
      if (name) setPlayerNameInput(name);
    } catch (e) {}
    
    const timer = setTimeout(() => {
      if (mountedRef.current) setLoading(false);
    }, 200);
    
    return () => {
      mountedRef.current = false;
      clearTimeout(timer);
      clearTimers();
    };
  }, []);

  const clearTimers = useCallback(() => {
    if (globalTimerIntervalRef.current) clearInterval(globalTimerIntervalRef.current);
    if (roundTimerRef.current) clearTimeout(roundTimerRef.current);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
  }, []);

  // Fullscreen & Mobile Guard
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsHandler);
    
    const checkOrientationAndSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) || window.innerWidth < 768;
      
      if (!isMobile) { 
        setShowRotateWarning(false); 
        setIsMobileLandscape(false);
        return; 
      }
      
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
          setShowRotateWarning(true);
          setIsMobileLandscape(false);
      } else {
          setShowRotateWarning(false);
          setIsMobileLandscape(true); 
      }
    };
    checkOrientationAndSize();
    window.addEventListener('resize', checkOrientationAndSize);
    window.addEventListener('orientationchange', checkOrientationAndSize);
    
    const preventSpace = (e) => {
      if (e.code === 'Space' && gameStateRef.current === 'playing') e.preventDefault();
    };
    window.addEventListener('keydown', preventSpace);
    
    return () => {
      document.removeEventListener('fullscreenchange', fsHandler);
      window.removeEventListener('resize', checkOrientationAndSize);
      window.removeEventListener('orientationchange', checkOrientationAndSize);
      window.removeEventListener('keydown', preventSpace);
    };
  }, []);

  const endGame = useCallback(() => {
    clearTimers();
    gameStateRef.current = 'ended';
    setGameState('ended');
    
    const finalScore = scoreRef.current;
    if (finalScore > bestScore && finalScore > 0) {
      setIsNewBest(true);
      setBestScore(finalScore);
      try { localStorage.setItem('skilldrills_selective_attention_best_v5', finalScore.toString()); } catch(e) {}
    }
    syncScoresToUI();
  }, [bestScore, clearTimers, syncScoresToUI]);

  const handleExit = useCallback(async () => {
    if (isFullscreen) {
      try { await document.exitFullscreen(); } catch (e) {}
    }
    clearTimers();
    gameStateRef.current = 'start';
    setGameState('start');
    setLocalTimeRemaining(60.0);
    setItems([]);
    scoreRef.current = 0;
    syncScoresToUI();
  }, [isFullscreen, clearTimers, syncScoresToUI]);

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
    }, 500);
  }, []);

  const updateDifficulty = useCallback(() => {
    const netHits = Math.max(0, hitsRef.current - ((wrongsRef.current + missesRef.current) * 0.5));
    const progress = Math.min(1, netHits / 40); // 40 net hits for max speed
    speedRef.current = Math.max(600, Math.floor(2000 - (progress * 1400))); // Scales from 2000ms down to 600ms
  }, []);

  const handleTimeout = useCallback(() => {
    missesRef.current += 1;
    comboRef.current = 0;
    
    scoreRef.current = Math.max(0, scoreRef.current - 7);
    timeRef.current -= 3.0;
    
    if (audioSynth) audioSynth.playMiss();
    triggerFeedback('✗ Missed! -7 PTS | -3s', 'error');
    
    updateDifficulty();
    syncScoresToUI();
    
    if (timeRef.current <= 0) {
      timeRef.current = 0;
      setLocalTimeRemaining(0);
      endGame();
      return;
    }
    
    setLocalTimeRemaining(timeRef.current);
    if (generateNewRoundRef.current) generateNewRoundRef.current();
  }, [triggerFeedback, syncScoresToUI, updateDifficulty, endGame]);

  handleTimeoutRef.current = handleTimeout;

  const spawnItems = useCallback((nc, ns) => {
    const ni = [{ id: Date.now(), color: nc, shape: ns, isTarget: true, x: Math.random() * 70 + 15, y: Math.random() * 60 + 20 }];
    for (let i = 0; i < 5; i++) {
      let dc, ds;
      if (Math.random() > 0.5) { 
        dc = colors.current.find(c => c !== nc) || colors.current[0]; 
        ds = ns; 
      } else { 
        dc = nc; 
        ds = shapes.current.find(s => s !== ns) || shapes.current[0]; 
      }
      ni.push({ id: Date.now() + i + 1, color: dc, shape: ds, isTarget: false, x: Math.random() * 70 + 15, y: Math.random() * 60 + 20 });
    }
    
    if (mountedRef.current) setItems(ni);

    roundTimerRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing' && !showTargetDisplayRef.current && mountedRef.current) {
        if (handleTimeoutRef.current) handleTimeoutRef.current();
      }
    }, speedRef.current);
  }, []);

  const generateNewRound = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    if (roundTimerRef.current) {
        clearTimeout(roundTimerRef.current);
        roundTimerRef.current = null;
    }

    const nc = colors.current[Math.floor(Math.random() * colors.current.length)];
    const ns = shapes.current[Math.floor(Math.random() * shapes.current.length)];
    
    targetColorRef.current = nc;
    targetShapeRef.current = ns;

    if (mountedRef.current) {
      setTargetColor(nc);
      setTargetShape(ns);
    }

    spawnItems(nc, ns);
  }, [spawnItems]);

  generateNewRoundRef.current = generateNewRound;

  // ZERO-LATENCY GAME BUTTON
  const handleItemClick = useCallback((e, isTarget) => {
    e.stopPropagation();
    e.preventDefault();
    if (gameStateRef.current !== 'playing' || showTargetDisplayRef.current) return;
    
    if (roundTimerRef.current) {
        clearTimeout(roundTimerRef.current);
        roundTimerRef.current = null;
    }

    if (isTarget) {
      scoreRef.current += 15;
      timeRef.current = Math.min(60.0, timeRef.current + 5.0); // +5 seconds on hit
      hitsRef.current += 1;
      comboRef.current += 1;
      
      if (comboRef.current > bestComboRef.current) {
        bestComboRef.current = comboRef.current;
      }
      
      if (audioSynth) {
        comboRef.current % 5 === 0 ? audioSynth.playCombo() : audioSynth.playHit();
      }
      triggerFeedback('✓ Hit! +15 PTS | +5s', 'success');
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 7);
      timeRef.current -= 3.0; // -3 seconds on wrong
      wrongsRef.current += 1;
      comboRef.current = 0;
      
      if (audioSynth) audioSynth.playMiss();
      triggerFeedback('✗ Wrong! -7 PTS | -3s', 'error');
    }
    
    updateDifficulty();
    syncScoresToUI();
    
    if (timeRef.current <= 0) {
      timeRef.current = 0;
      setLocalTimeRemaining(0);
      endGame();
      return;
    }
    
    setLocalTimeRemaining(timeRef.current);
    if (generateNewRoundRef.current) generateNewRoundRef.current();
  }, [triggerFeedback, syncScoresToUI, updateDifficulty, endGame]);

  // Start sequence
  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    
    clearTimers();
    setIsNewBest(false);
    
    gameStateRef.current = 'playing';
    setGameState('playing');
    
    timeRef.current = 60.0;
    scoreRef.current = 0;
    hitsRef.current = 0;
    missesRef.current = 0;
    wrongsRef.current = 0;
    comboRef.current = 0;
    bestComboRef.current = 0;
    speedRef.current = 2000;
    
    setLocalTimeRemaining(60.0);
    setItems([]);
    setShowTargetDisplay(true);
    showTargetDisplayRef.current = true;
    syncScoresToUI();
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });

    try {
      if (!document.fullscreenElement && gameContainerRef.current) {
        await gameContainerRef.current.requestFullscreen();
      }
    } catch (err) {}
    
    const nc = colors.current[Math.floor(Math.random() * colors.current.length)];
    const ns = shapes.current[Math.floor(Math.random() * shapes.current.length)];
    targetColorRef.current = nc;
    targetShapeRef.current = ns;
    
    if (mountedRef.current) {
        setTargetColor(nc);
        setTargetShape(ns);
    }
    
    setTimeout(() => {
      if (mountedRef.current && gameStateRef.current === 'playing') {
        setShowTargetDisplay(false);
        showTargetDisplayRef.current = false;
        
        // Start Global Timer
        globalTimerIntervalRef.current = setInterval(() => {
          timeRef.current -= 0.1;
          if (timeRef.current <= 0) {
            timeRef.current = 0;
            setLocalTimeRemaining(0);
            endGame();
            clearInterval(globalTimerIntervalRef.current);
          } else {
            setLocalTimeRemaining(timeRef.current);
          }
        }, 100);

        spawnItems(nc, ns);
      }
    }, 1500);
  }, [syncScoresToUI, spawnItems, clearTimers, endGame]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/cognitive/attention/selective-attention';
    if (navigator.share) {
      navigator.share({ title: 'Selective Attention Drill', text: 'Free adaptive cognitive drill! Train your focus.', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  const getColorStyle = useCallback((color) => {
    const cm = { 
        red: 'bg-red-500 text-white', 
        blue: 'bg-blue-500 text-white', 
        green: 'bg-green-500 text-white', 
        yellow: 'bg-yellow-400 text-black', 
        purple: 'bg-purple-500 text-white', 
        orange: 'bg-orange-500 text-white', 
        pink: 'bg-pink-500 text-white', 
        cyan: 'bg-cyan-400 text-black' 
    };
    return cm[color] || 'bg-gray-500 text-white';
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(147,51,234,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Drill...</p>
        </div>
      </div>
    );
  }

  const totalActions = successfulHits + missedHits + wrongHits;
  const accuracy = totalActions > 0 ? Math.round((successfulHits / totalActions) * 100) : 100;
  const totalMistakes = missedHits + wrongHits;

  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracy;

  return (
    <div className="min-h-screen select-none bg-[#050505] text-white selection:bg-transparent font-sans" style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/cognitive" className="text-gray-500 hover:text-gray-300 transition-colors">Cognitive</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-gray-500">Attention</li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-purple-400 font-medium">Selective Attention</li>
            </ol>
          </nav>
        )}
        
        {/* Header */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Selective Attention</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Find Matching Color & Shape • Endless Survival</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
 
              {gameState === 'playing' && (
                <button onClick={() => { endGame(); startGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset">
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
        )}

        {showNameInput && (
          <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-900 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <input type="text" value={playerNameInput} onChange={e => setPlayerNameInput(e.target.value)} placeholder="Enter your display name" maxLength={20}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                onKeyDown={e => e.key === 'Enter' && savePlayerName()} />
              <button onClick={savePlayerName} className="px-5 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/20">Save</button>
            </div>
          </div>
        )}

        {/* Stats Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-purple-400" />} value={currentScore} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
          <StatCard icon={<CheckCircle2 className="text-emerald-400" />} value={successfulHits} label="Hits" />
          <StatCard icon={<Zap className="text-yellow-500" />} value={combo} label="Combo" />
          <StatCard icon={<XCircle className="text-red-500" />} value={totalMistakes} label="Errors" />
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
          onContextMenu={(e) => { if(gameState === 'playing') e.preventDefault(); }}
          className={`relative overflow-hidden transition-all duration-100 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-[#050505]' 
              : 'rounded-2xl border border-gray-700 bg-black min-h-[60vh] md:min-h-[500px] md:aspect-video shadow-[0_0_40px_rgba(0,0,0,0.5)]'
          }`}
          style={{ 
            touchAction: gameState === 'playing' ? 'none' : 'auto', 
            overscrollBehavior: gameState === 'playing' ? 'none' : 'auto'
          }}>
          
          {/* Time Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
              <div 
                className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`}
                style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }}
              />
            </div>
          )}

          {showRotateWarning && gameState !== 'playing' && (
            <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 backdrop-blur-sm">
              <div className="animate-bounce mb-6 text-purple-500">
                <RotateCcw className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Rotate Device</h3>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">Please rotate your device to landscape mode for the optimal playing experience.</p>
            </div>
          )}

          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-[60] flex gap-2">
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); endGame(); startGame(); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setSoundEnabled(v => !v); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            </div>
          )}

          {/* MAIN GAMEPLAY AREA */}
          <div className="absolute inset-0">
            {/* Start Screen */}
            {gameState === 'start' && !showRotateWarning && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                  {!isMobileLandscape && (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(147,51,234,0.3)] rotate-3">
                      <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                    </div>
                  )}
                  <h2 className="text-xl sm:text-3xl font-black mb-2 tracking-tight">Selective Attention</h2>
                  <p className="text-sm sm:text-base mb-8 text-gray-400 leading-relaxed pointer-events-none">Find items matching BOTH the target color and shape. Engine speed adapts to your accuracy.</p>
                  
                  <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none shrink-0 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                    <Play className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Target Memorization Overlay */}
            {gameState === 'playing' && showTargetDisplay && (
              <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-300 z-30 pointer-events-none">
                <div className="text-center p-8 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl">
                  <p className="text-xl mb-6 font-bold tracking-wider uppercase text-white">Find and click:</p>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className={`w-20 h-20 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] ${getColorStyle(targetColor)} border-4 border-white/20`}></div>
                    <span className="text-4xl font-black text-white/50">+</span>
                    <span className="text-7xl drop-shadow-2xl">{shapeIcons.current[targetShape]}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-6 animate-pulse">Get ready...</p>
                </div>
              </div>
            )}

            {/* Active Gameplay */}
            {gameState === 'playing' && !showTargetDisplay && (
              <>
                <div className={`absolute z-10 pointer-events-none ${isMobileLandscape ? 'top-2 left-2 scale-75 origin-top-left' : 'top-4 left-4'}`}>
                  <div className="px-4 py-2 rounded-xl flex items-center gap-3 text-sm font-bold shadow-lg backdrop-blur-md bg-black/60 text-white border border-white/10">
                    <div className={`w-6 h-6 rounded-full shadow-inner ${getColorStyle(targetColor)}`}></div>
                    <span className="opacity-50">+</span>
                    <span className="text-2xl drop-shadow-sm">{shapeIcons.current[targetShape]}</span>
                  </div>
                </div>
                {items.map((item) => (
                  <button key={item.id} onPointerDown={(e) => handleItemClick(e, item.isTarget)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 hover:scale-110 active:scale-95 focus:outline-none rounded-full animate-in zoom-in-50 touch-none"
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    aria-label={`${item.color} ${item.shape}${item.isTarget ? ' - TARGET' : ''}`}>
                    <div className={`${isMobileLandscape ? 'w-10 h-10 border' : 'w-14 h-14 sm:w-16 sm:h-16 border-2'} rounded-full ${getColorStyle(item.color)} flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] border-white/20`}>
                      <span className={`${isMobileLandscape ? 'text-2xl' : 'text-3xl sm:text-4xl'} drop-shadow-md`}>{shapeIcons.current[item.shape]}</span>
                    </div>
                  </button>
                ))}
              </>
            )}

            {/* Premium Custom End Screen */}
            {gameState === 'ended' && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[95vh] overflow-y-auto my-auto">
                  
                  <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                      <p className="text-purple-400 font-medium text-xs sm:text-sm">Selective Attention • Peak Speed: {speedRef.current}ms</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pointer-events-none shrink-0">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tighter">{currentScore}</span>
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
                          <span className={`text-base sm:text-xl font-black ${accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracy}%</span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Correct Hits</div>
                        <div className="text-base sm:text-xl font-black text-emerald-400">{successfulHits}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Combo</div>
                        <div className="text-base sm:text-xl font-black text-yellow-400">{bestComboRef.current}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Mistakes</div>
                        <div className="text-base sm:text-xl font-black text-red-400">{totalMistakes}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                    <button onPointerDown={e => e.stopPropagation()} onClick={() => { endGame(); startGame(); }} className="flex-1 py-3 sm:py-4 bg-purple-600 text-white rounded-xl font-black tracking-wide hover:bg-purple-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={handleExit} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* DRILL RULES & SCORING */}
        {/* ============================================================ */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-purple-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="purple" text="Memorize the" highlight="target shape & color" result="Shown at Start" />
                  <RuleItem color="green" text="Tap Correct Target" highlight="+15 PTS | +5s" result="Increases Speed" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="red" text="Wrong Tap / Miss" highlight="-7 PTS | -3s" result="Decreases Speed" />
                  <RuleItem color="indigo" text="Time Limit Capped" highlight="Max 60 Seconds" result="Endless Survival" />
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
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Selective Attention</h2>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This adaptive selective attention drill trains your brain to filter out distractions and focus exclusively on relevant data. By requiring you to identify a specific target based on a conjunction of features (both color and shape) among closely related distractors, it rigorously engages your visual search pathways and cognitive inhibition logic.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Gamers needing rapid target acquisition in cluttered environments, professionals operating in high-distraction settings, and anyone looking to enhance their concentration under chaotic conditions.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Selective visual attention, distractor inhibition, rapid decision-making, visual search speed, and cognitive flexibility.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score, target accuracy percentage, maximum streak combos, and your absolute peak processing boundary (Flash Speed in ms).</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Pre-Processing:</strong> Memorize the target conjunction (e.g., "Red Triangle") clearly in your mind before scanning.</li>
                    <li><strong className="text-gray-200">Impulse Control:</strong> Ignore partial matches. If you see a Red Square or a Blue Triangle, skip them immediately. Accuracy is critical.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> The engine dynamically adapts. You must maintain accuracy to add time (+5s) and score (+15 PTS). Errors actively drain the clock (-3s) and reduce the score (-7 PTS).</li>
                  </ul>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">How does the difficulty adapt?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">The engine tracks your net precision. Every successful target scales the presentation speed downward, shrinking the visual flash window to challenge your reaction time. If you miss or false-alarm, the engine slows down to allow recovery.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Why did I lose points without tapping?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">This drill penalizes inaction equally. If you fail to find and click the correct target before the current speed interval runs out, it registers as a "Missed Target", incurring a -7 point and -3 second penalty.</p>
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
          <section className="mt-14" aria-label="Related cognitive drills">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600"></div>
              <h2 className="text-xl font-bold text-white uppercase tracking-widest font-mono">Explore Related Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Divided Attention" desc="Handle multiple tasks simultaneously with accuracy." color="blue" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/sustained-attention" title="Sustained Attention" desc="Maintain focus over extended periods without distraction." color="cyan" icon={<Timer className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/focus/concentration-grid" title="Concentration Grid" desc="Search grids linearly under intense time pressure." color="teal" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/processing-speed/reaction-time" title="Reaction Time" desc="Test and improve visual reaction speed." color="orange" icon={<Zap className="w-4 h-4" />} />
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
                    <li><Link href="/drills/fps" className="text-purple-400 hover:text-purple-300 font-medium transition-colors mt-2 block">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">Cognitive</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Divided Attention</Link></li>
                    <li><Link href="/drills/cognitive" className="text-purple-400 hover:text-purple-300 font-medium transition-colors mt-2 block">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">Academic</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li>
                    <li><Link href="/drills/academic" className="text-purple-400 hover:text-purple-300 font-medium transition-colors mt-2 block">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">Visual & Motor</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li>
                    <li><Link href="/drills/visual" className="text-purple-400 hover:text-purple-300 font-medium transition-colors mt-2 block">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">More Sections</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory Drills</Link></li>
                    <li><Link href="/drills/visual-tracking" className="hover:text-white transition-colors">Mental Fitness</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical Drills</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
                    <Hash className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-black text-xl tracking-tight">SkillDrills</span>
                </div>
                <p className="text-sm mb-3 font-medium">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-8 text-gray-500">
                  Open-source telemetry training platform. Free forever. No downloads required. Train your focus, reaction speed, and cognitive flexibility.
                </p>
                
                <div className="flex items-center justify-center gap-4 flex-wrap">
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

function RuleItem({ color, text, highlight = '', result }) {
  const colorMap = { 
    purple: 'bg-purple-600 text-purple-300 border-purple-500', 
    green: 'bg-green-600 text-green-300 border-green-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    indigo: 'bg-indigo-600 text-indigo-300 border-indigo-500',
    blue: 'bg-blue-600 text-blue-300 border-blue-500'
  };
  const colors = colorMap[color] || 'bg-gray-600 text-gray-300 border-gray-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-gray-800 shadow-sm">
      <div className={`w-3 h-3 rounded-full ${bg} shadow-lg flex-shrink-0`}></div>
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
    teal: 'from-teal-500 to-emerald-500'
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