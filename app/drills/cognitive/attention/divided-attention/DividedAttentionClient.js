'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Eye,
  BarChart3, Info, Layers, Circle, Hash, RefreshCw,
  Users, Share2, XCircle, TrendingUp,
  GraduationCap, Lightbulb, Brain, RotateCcw,
  ChevronRight, ArrowRight, Play, LogOut, Search, Flame
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
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  playSoothingPop() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(880, this.ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  playSoftThud() {
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

  playComboAlert() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(554.37, this.ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.2);
      osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
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
const STORAGE_KEY = 'skilldrills_divided_attention_v5';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, highestCombo: 0, highestLevel: 1, totalSessions: 0, totalVisualHits: 0, totalNumberMatches: 0, totalActions: 0 };
    return JSON.parse(raw);
  } catch (e) {
    return { bestScore: 0, highestCombo: 0, highestLevel: 1, totalSessions: 0, totalVisualHits: 0, totalNumberMatches: 0, totalActions: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function DividedAttentionClient() {
  
  // === UI State ===
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game State (Visual Sync) ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  
  const [visualHits, setVisualHits] = useState(0);
  const [numberHits, setNumberHits] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  
  const [visualAttempts, setVisualAttempts] = useState(0);
  const [numberAttempts, setNumberAttempts] = useState(0);
  
  const [combo, setCombo] = useState(0);
  const [highestCombo, setHighestCombo] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [highestLevelReached, setHighestLevelReached] = useState(1);

  const [currentTarget, setCurrentTarget] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [ballScaleUI, setBallScaleUI] = useState(1);

  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  const [forceStart, setForceStart] = useState(false);
  
  // Overall Stats
  const [sessionStats, setSessionStats] = useState(null);

  // === Absolute Truth Refs (Decoupled to fix "Play Again" bug) ===
  const mountedRef = useRef(false);
  const gameContainerRef = useRef(null);
  const gameActiveRef = useRef(false); // Replaces dependency on engine.gameState for inner loop
  
  const scoreRef = useRef(0);
  const visualHitsRef = useRef(0);
  const numberHitsRef = useRef(0);
  const visualAttemptsRef = useRef(0);
  const numberAttemptsRef = useRef(0);
  const mistakesRef = useRef(0);
  
  const comboRef = useRef(0);
  const highestComboRef = useRef(0);
  const levelRef = useRef(1);
  const highestLevelRef = useRef(1);
  
  const localTimeRef = useRef(60.0);

  // Adaptive Scaling Refs
  const ballSpeedRef = useRef(1800);
  const numSpeedRef = useRef(2000);
  const ballScaleRef = useRef(1.0);
  
  const currentTargetIdRef = useRef(null);
  const currentNumberRef = useRef(null);
  const wasMatchedRef = useRef(true);

  const ballTimerRef = useRef(null);
  const numTimerRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  
  // Sync state for UI rendering
  const syncToUI = useCallback(() => {
    setScore(scoreRef.current);
    setVisualHits(visualHitsRef.current);
    setNumberHits(numberHitsRef.current);
    setVisualAttempts(visualAttemptsRef.current);
    setNumberAttempts(numberAttemptsRef.current);
    setMistakes(mistakesRef.current);
    setCombo(comboRef.current);
    setHighestCombo(highestComboRef.current);
    setCurrentLevel(levelRef.current);
    setHighestLevelReached(highestLevelRef.current);
    setBallScaleUI(ballScaleRef.current);
  }, []);

  // === Game Engine ===
  const engine = useGameEngine({
    category: 'cognitive',
    drillId: 'divided-attention',
    drillName: 'Divided Attention',
    totalGameTime: 9999, 
    lives: 9999, 
    infiniteLives: true, 
    sharePath: 'drills/cognitive/attention/divided-attention',
  });
  const engineRef = useRef(engine);

  useEffect(() => {
    engineRef.current = engine;
    if (engine.gameState === 'playing') {
      setIsNewBest(false);
    }
  }, [engine.gameState]);

  // Load Data
  useEffect(() => {
    setIsClient(true);
    mountedRef.current = true;
    try {
      const savedData = getSavedData();
      if (savedData.bestScore) setBestScore(savedData.bestScore);
    } catch (e) {}
    setTimeout(() => { if (mountedRef.current) setLoading(false); }, 200);

    return () => {
      mountedRef.current = false;
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (ballTimerRef.current) clearTimeout(ballTimerRef.current);
      if (numTimerRef.current) clearTimeout(numTimerRef.current);
    };
  }, []);

  // Screen Guard & Rotate Warning
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
    return () => {
      document.removeEventListener('fullscreenchange', fsHandler);
      window.removeEventListener('resize', checkOrientationAndSize);
      window.removeEventListener('orientationchange', checkOrientationAndSize);
    };
  }, []);

  const saveStatsLocally = useCallback(() => {
    const finalScore = scoreRef.current;
    if (finalScore > bestScore && finalScore > 0) {
      setIsNewBest(true);
      setBestScore(finalScore);
    }
    
    const stats = getSavedData();
    stats.bestScore = Math.max(stats.bestScore, finalScore);
    stats.highestCombo = Math.max(stats.highestCombo, highestComboRef.current);
    stats.highestLevel = Math.max(stats.highestLevel, highestLevelRef.current);
    stats.totalSessions += 1;
    stats.totalVisualHits += visualHitsRef.current;
    stats.totalNumberMatches += numberHitsRef.current;
    stats.totalActions += (visualAttemptsRef.current + numberAttemptsRef.current);
    
    saveData(stats);
    setSessionStats(stats);
  }, [bestScore]);

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
    }, 600);
  }, []);

  // === DYNAMIC DIFFICULTY SCALING ===
  const updateDifficulty = useCallback(() => {
    const totalHits = visualHitsRef.current + numberHitsRef.current;
    const newLevel = Math.floor(totalHits / 10) + 1;
    
    if (newLevel > levelRef.current) {
      triggerFeedback(`⚡ LEVEL UP: ${newLevel}!`, 'success');
      if (audioSynth) audioSynth.playComboAlert();
    }
    
    levelRef.current = newLevel;
    highestLevelRef.current = Math.max(highestLevelRef.current, newLevel);
    
    const progress = Math.min(1, (newLevel - 1) / 15); // Caps around level 16
    
    ballSpeedRef.current = Math.max(700, 1800 - (progress * 1100));
    numSpeedRef.current = Math.max(800, 2000 - (progress * 1200));
    ballScaleRef.current = Math.max(0.6, 1.0 - (progress * 0.4)); 
  }, [triggerFeedback]);

  // === CORE MECHANICS ===
  const applyPenalty = useCallback((reason) => {
    if (!gameActiveRef.current) return;
    if (audioSynth) audioSynth.playSoftThud();
    
    // Break Combo
    if (comboRef.current > 0) {
      triggerFeedback(`Combo Broken!`, 'error');
    } else {
      triggerFeedback(`Penalty! -3 PTS | -1.5s`, 'error');
    }
    
    comboRef.current = 0;
    scoreRef.current = Math.max(0, scoreRef.current - 3);
    mistakesRef.current += 1;
    localTimeRef.current -= 1.5;
    
    if (reason === 'missed_target') visualAttemptsRef.current += 1;
    if (['missed_even', 'wrong_match', 'double_click'].includes(reason)) numberAttemptsRef.current += 1;
    
    if (localTimeRef.current <= 0) {
      localTimeRef.current = 0;
      setLocalTimeRemaining(0);
      gameActiveRef.current = false;
      saveStatsLocally();
      if (typeof engineRef.current?.endGame === 'function') {
        engineRef.current.endGame();
      }
      return;
    }
    
    setLocalTimeRemaining(localTimeRef.current);
    syncToUI();
  }, [syncToUI, triggerFeedback, saveStatsLocally]);

  const applyReward = useCallback((type) => {
    if (!gameActiveRef.current) return;
    
    comboRef.current += 1;
    highestComboRef.current = Math.max(highestComboRef.current, comboRef.current);
    
    let bonus = 0;
    if (comboRef.current > 0 && comboRef.current % 5 === 0) {
      if (comboRef.current === 5) bonus = 5;
      else if (comboRef.current === 10) bonus = 15;
      else if (comboRef.current === 15) bonus = 30;
      else bonus = 50;
      
      triggerFeedback(`🔥 ${comboRef.current} COMBO! +${bonus} Bonus`, 'success');
      if (audioSynth) audioSynth.playComboAlert();
    } else {
      triggerFeedback(`Target! +5 PTS | +2s`, 'success');
      if (audioSynth) audioSynth.playSoothingPop();
    }
    
    scoreRef.current += (5 + bonus);
    
    if (type === 'visual') {
      visualHitsRef.current += 1;
      visualAttemptsRef.current += 1;
    } else {
      numberHitsRef.current += 1;
      numberAttemptsRef.current += 1;
    }

    localTimeRef.current = Math.min(60.0, localTimeRef.current + 2.0);
    setLocalTimeRemaining(localTimeRef.current);

    updateDifficulty();
    syncToUI();
  }, [syncToUI, triggerFeedback, updateDifficulty]);

  const spawnNewBall = useCallback(() => {
    if (ballTimerRef.current) clearTimeout(ballTimerRef.current);
    if (!gameActiveRef.current) return;

    const id = Date.now() + Math.random();
    currentTargetIdRef.current = id;
    
    setCurrentTarget({
      id,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80
    });

    ballTimerRef.current = setTimeout(() => {
      if (gameActiveRef.current && mountedRef.current) {
        applyPenalty('missed_target');
        spawnNewBall(); 
      }
    }, ballSpeedRef.current);
  }, [applyPenalty]);

  const spawnNewNumber = useCallback(() => {
    if (numTimerRef.current) clearTimeout(numTimerRef.current);
    if (!gameActiveRef.current) return;

    const prevNum = currentNumberRef.current;
    if (prevNum !== null && prevNum % 2 === 0 && !wasMatchedRef.current) {
      applyPenalty('missed_even');
    }

    let newNum;
    do {
      newNum = Math.floor(Math.random() * 10);
    } while (newNum === currentNumberRef.current);

    currentNumberRef.current = newNum;
    wasMatchedRef.current = false;
    setCurrentNumber(newNum);

    numTimerRef.current = setTimeout(() => {
      if (gameActiveRef.current && mountedRef.current) {
        spawnNewNumber();
      }
    }, numSpeedRef.current);
  }, [applyPenalty]);

  // === INTERACTION HANDLERS ===
  const handleVisualClick = useCallback((id, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
      if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
    }

    if (!gameActiveRef.current) return;
    if (currentTargetIdRef.current !== id) return;

    currentTargetIdRef.current = null;
    setCurrentTarget(null);

    applyReward('visual');
    spawnNewBall();
  }, [spawnNewBall, applyReward]);

  const handleNumberCheck = useCallback((e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
      if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
    }

    if (!gameActiveRef.current) return;
    
    const num = currentNumberRef.current;
    if (num === null) return;

    if (wasMatchedRef.current) {
      applyPenalty('double_click');
      return;
    }

    if (num % 2 === 0) {
      wasMatchedRef.current = true; 
      applyReward('number');
    } else {
      wasMatchedRef.current = true; 
      applyPenalty('wrong_match');
    }
  }, [applyPenalty, applyReward]);

  const handleBackgroundClick = useCallback((e) => {
    if (!gameActiveRef.current) return;
  }, []);

  // Exit Game
  const handleExit = useCallback(async () => {
    if (isFullscreen) {
      try { await document.exitFullscreen(); } catch (e) {}
    }
    gameActiveRef.current = false;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (ballTimerRef.current) clearTimeout(ballTimerRef.current);
    if (numTimerRef.current) clearTimeout(numTimerRef.current);
    
    if (engineRef.current && engineRef.current.endGame) {
        engineRef.current.endGame();
    }
    setForceStart(true);
    
    localTimeRef.current = 60.0;
    setLocalTimeRemaining(60.0);
    scoreRef.current = 0;
    comboRef.current = 0;
    visualHitsRef.current = 0;
    numberHitsRef.current = 0;
    mistakesRef.current = 0;
    levelRef.current = 1;
    syncToUI();
  }, [isFullscreen, syncToUI]);

  // Start sequence
  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    
    // 1. Force Stop Everything First
    gameActiveRef.current = false;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (ballTimerRef.current) clearTimeout(ballTimerRef.current);
    if (numTimerRef.current) clearTimeout(numTimerRef.current);

    setForceStart(false);
    
    // 2. Reset All Refs
    localTimeRef.current = 60.0;
    setLocalTimeRemaining(60.0);
    scoreRef.current = 0;
    visualHitsRef.current = 0;
    numberHitsRef.current = 0;
    visualAttemptsRef.current = 0;
    numberAttemptsRef.current = 0;
    mistakesRef.current = 0;
    comboRef.current = 0;
    highestComboRef.current = 0;
    levelRef.current = 1;
    highestLevelRef.current = 1;
    
    ballSpeedRef.current = 1800;
    numSpeedRef.current = 2000;
    ballScaleRef.current = 1.0;
    
    currentNumberRef.current = null;
    currentTargetIdRef.current = null;
    wasMatchedRef.current = true; 
    
    syncToUI();
    setCurrentNumber(null);
    setCurrentTarget(null);
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });
    
    // 3. UI Fullscreen
    try {
      if (!document.fullscreenElement && gameContainerRef.current) {
        await gameContainerRef.current.requestFullscreen();
      }
    } catch (err) {}

    // 4. Activate Engine
    engineRef.current.startGame();
    gameActiveRef.current = true;
    
    // 5. Start Precise Timer
    timerIntervalRef.current = setInterval(() => {
      if (!gameActiveRef.current) {
        clearInterval(timerIntervalRef.current);
        return;
      }
      localTimeRef.current -= 0.1;
      if (localTimeRef.current <= 0) {
        localTimeRef.current = 0;
        setLocalTimeRemaining(0);
        gameActiveRef.current = false;
        clearInterval(timerIntervalRef.current);
        saveStatsLocally();
        if (typeof engineRef.current?.endGame === 'function') {
          engineRef.current.endGame();
        }
      } else {
        setLocalTimeRemaining(localTimeRef.current);
      }
    }, 100);

    // 6. Start Loops
    setTimeout(() => {
      if (gameActiveRef.current) {
        spawnNewBall();
        spawnNewNumber();
      }
    }, 300);
  }, [syncToUI, spawnNewBall, spawnNewNumber, saveStatsLocally]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/cognitive/attention/divided-attention';
    if (navigator.share) {
      navigator.share({ title: 'Divided Attention Drill', text: 'Hardcore dual-tasking cognitive test. Measure your executive function limits!', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Dual-Task Engine...</p>
        </div>
      </div>
    );
  }

  // Calculate Accuracies
  const totalActions = visualAttempts + numberAttempts;
  const overallAcc = totalActions > 0 ? Math.round(((visualHits + numberHits) / totalActions) * 100) : 100;
  const visAcc = visualAttempts > 0 ? Math.round((visualHits / visualAttempts) * 100) : 100;
  const numAcc = numberAttempts > 0 ? Math.round((numberHits / numberAttempts) * 100) : 100;

  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - overallAcc;

  return (
    <div className="min-h-screen select-none bg-[#050505] text-white selection:bg-transparent font-sans" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/cognitive" className="text-gray-500 hover:text-gray-300 transition-colors">Cognitive</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-gray-500 hover:text-gray-300 transition-colors">Attention</li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-blue-400 font-medium">Divided Attention Test</li>
            </ol>
          </nav>
        )}
        
        {/* Header */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Layers className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Divided Attention</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Dual-Task Training • Cognitive Flexibility</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {engine.gameState === 'playing' && (
                <button onClick={(e) => { e.stopPropagation(); handleStartGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset">
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

        {/* Dynamic Mobile-Optimized Stats Bar */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-blue-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
          <StatCard icon={<TrendingUp className="text-indigo-400" />} value={`Lv.${currentLevel}`} label="Level" />
          <StatCard icon={<Flame className={combo >= 5 ? "text-orange-500 animate-pulse" : "text-orange-300"} />} value={combo} label="Combo" />
          <StatCard icon={<Circle className="text-cyan-400" />} value={visualHits} label="Targets" />
          <StatCard icon={<Hash className="text-purple-400" />} value={numberHits} label="Numbers" />
          <StatCard icon={<XCircle className="text-red-400" />} value={mistakes} label="Errors" />
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

        {/* Game Container: Adaptive Flex Layout */}
        <div ref={gameContainerRef} 
          onContextMenu={(e) => { if(gameActiveRef.current) e.preventDefault(); }}
          className={`relative overflow-hidden flex flex-col sm:flex-row transition-all duration-100 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-[#050505]' 
              : 'rounded-2xl border border-gray-700 bg-[#050505] shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[500px] md:aspect-video'
          }`}
          style={{ 
            touchAction: gameActiveRef.current ? 'none' : 'auto', 
            overscrollBehavior: gameActiveRef.current ? 'none' : 'auto'
          }}>
          
          {/* Subtle grid lines for depth */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

          {/* Time Progress Bar */}
          {gameActiveRef.current && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
              <div 
                className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }}
              />
            </div>
          )}

          {/* Internal Mobile Rotation Enforcer */}
          {showRotateWarning && !gameActiveRef.current && (
            <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 backdrop-blur-sm">
              <div className="animate-bounce mb-6 text-blue-500">
                <RotateCcw className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Rotate Device</h3>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">Please rotate your device to landscape mode for the full optimal playing experience.</p>
            </div>
          )}

          {/* In-Game Controls (Fullscreen) */}
          {isFullscreen && gameActiveRef.current && (
            <div className="absolute top-4 right-4 z-[60] flex gap-2">
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setSoundEnabled(v => !v); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* Combo Multiplier UI Float */}
          {gameActiveRef.current && combo >= 5 && (
            <div className="absolute top-4 left-4 z-[60] pointer-events-none animate-in slide-in-from-left-4 fade-in">
              <div className="bg-orange-500/20 border border-orange-500 text-orange-400 px-4 py-1.5 rounded-full font-black flex items-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                <Flame className="w-4 h-4 fill-orange-500" /> {combo}x COMBO
              </div>
            </div>
          )}

          {/* Phase 2: Game Area */}
          {gameActiveRef.current && (
            <>
              {/* Target Area (Takes available space) */}
              <div className="relative flex-1 bg-transparent overflow-hidden" onPointerDown={handleBackgroundClick}>
                {currentTarget && (
                  <button 
                    onPointerDown={(e) => handleVisualClick(currentTarget.id, e)} 
                    className="absolute z-20 focus:outline-none touch-none bg-transparent border-none"
                    style={{ left: `${currentTarget.x}%`, top: `${currentTarget.y}%`, transform: `translate(-50%, -50%) scale(${ballScaleUI})` }}>
                    
                    <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 hover:scale-110 active:scale-90 transition-transform duration-100 animate-in zoom-in-50 duration-150">
                      <div className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping opacity-75" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-blue-300 flex items-center justify-center pointer-events-none shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                        <div className="w-[55%] h-[55%] rounded-full border-2 border-white/50 flex items-center justify-center">
                          <div className="w-[40%] h-[40%] rounded-full bg-white" />
                        </div>
                      </div>
                    </div>
                  </button>
                )}
              </div>

              {/* Number Panel (Bottom on Mobile, Right on Desktop) */}
              <div className="w-full sm:w-64 h-[120px] sm:h-full flex-shrink-0 bg-gray-950/95 backdrop-blur-md border-t sm:border-t-0 sm:border-l border-gray-800 z-30 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-row sm:flex-col items-center justify-between sm:justify-center p-3 sm:p-6 sm:space-y-8">
                
                <div className="hidden sm:block text-center pointer-events-none">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">Match</h3>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-400 tracking-widest animate-pulse">EVEN</h3>
                </div>
                
                <div className="relative flex items-center justify-center w-24 h-24 sm:w-40 sm:h-40 text-5xl sm:text-7xl font-black rounded-2xl bg-black border border-blue-500/30 text-white pointer-events-none overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)] ml-4 sm:ml-0">
                  {currentNumber !== null ? (
                    <span key={currentNumber} className="animate-in slide-in-from-bottom-2 fade-in zoom-in-90 duration-150 block">
                      {currentNumber}
                    </span>
                  ) : '?'}
                  
                  {wasMatchedRef.current && currentNumber !== null && currentNumber % 2 === 0 && (
                    <div className="absolute inset-0 rounded-2xl bg-green-500/20 border-2 border-green-500" />
                  )}
                </div>
                
                <div className="flex flex-col items-center mr-4 sm:mr-0 sm:w-full w-32">
                  <button 
                    onPointerDown={handleNumberCheck} 
                    className="w-full py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-black text-xl sm:text-2xl active:scale-95 transition-all hover:from-blue-500 hover:to-indigo-500 border border-blue-400/30 touch-none focus:outline-none shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    MATCH
                  </button>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1.5 sm:mt-2 pointer-events-none">Tap when EVEN</p>
                </div>
              </div>
            </>
          )}

          {/* Start Screen */}
          {(!gameActiveRef.current && (engine.gameState === 'start' || forceStart)) && !showRotateWarning && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
              <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                {!isMobileLandscape && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                    <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                )}
                <h2 className="text-xl sm:text-3xl font-black mb-2 pointer-events-none tracking-tight">Divided Attention</h2>
                <p className="text-sm sm:text-base mb-8 text-gray-400 leading-relaxed pointer-events-none">Intense dual-task training. Tap moving targets while matching EVEN numbers. Maintain high accuracy to survive.</p>
                
                <button 
                  onPointerDown={e => e.stopPropagation()} 
                  onClick={handleStartGame}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:outline-none shrink-0">
                  <Play className="w-5 h-5 fill-white" />
                  START DRILL
                </button>
              </div>
            </div>
          )}

          {/* End Screen */}
          {(!gameActiveRef.current && (engine.gameState === 'ended' || localTimeRemaining <= 0)) && !forceStart && (
            <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6" onPointerDown={e => e.stopPropagation()}>
              <div className="rounded-3xl max-w-[500px] w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[95vh] overflow-y-auto my-auto">
                
                <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    {isNewBest && (
                      <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                        ⭐ New Personal Best
                      </div>
                    )}
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                    <p className="text-blue-400 font-medium text-xs sm:text-sm">Divided Attention • Maximum Level: {highestLevelReached}</p>
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
                          className={`${overallAcc >= 80 ? 'text-green-500' : overallAcc >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                          strokeWidth="3" strokeDasharray={`${strokeDasharray}`} strokeDashoffset={`${strokeDashoffset}`} strokeLinecap="round" stroke="currentColor" fill="none" 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-base sm:text-xl font-black ${overallAcc >= 80 ? 'text-green-400' : overallAcc >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{overallAcc}%</span>
                        <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                      </div>
                    </div>
                  </div>

                  {/* High Density Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
                    <EndStat label="Visual Acc" value={`${visAcc}%`} color="cyan" />
                    <EndStat label="Number Acc" value={`${numAcc}%`} color="indigo" />
                    <EndStat label="Highest Combo" value={`${highestCombo}x`} color="orange" />
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    <EndStat label="Visual Hits" value={visualHits} color="white" />
                    <EndStat label="Num Hits" value={numberHits} color="white" />
                    <EndStat label="Errors" value={mistakes} color="red" />
                    <EndStat label="Best Score" value={bestScore} color="yellow" />
                  </div>
                </div>

                <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                  <button onPointerDown={e => e.stopPropagation()} onClick={() => { handleStartGame(); }} className="flex-1 py-3 sm:py-4 bg-blue-600 text-white rounded-xl font-black tracking-wide hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-sm sm:text-base">
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

        {/* DRILL RULES & SCORING */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="green" text="Correct Action" highlight="+5 PTS | +2s" result="Increases Level" />
                  <RuleItem color="orange" text="Combo System" highlight="Bonus PTS" result="Every 5 Hits" />
                  <RuleItem color="blue" text="Tap Even Numbers" highlight="0, 2, 4, 6, 8" result="Matches earn rewards" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="red" text="Wrong / Miss" highlight="-3 PTS | -1.5s" result="Breaks Combo" />
                  <RuleItem color="cyan" text="Level Scaling" highlight="Speed & Size" result="Every 10 Hits" />
                  <RuleItem color="purple" text="Time Limit Capped" highlight="Max 60 Seconds" result="Endless Survival" />
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
                <h2 className="font-bold text-white text-lg tracking-wide">About Divided Attention Test</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This advanced cognitive drill serves as an intense <strong className="text-white font-semibold">Divided Attention Test</strong>, pushing your parallel processing and dual task training capabilities to the limit. By forcing you to actively engage with rapid visual target acquisition while simultaneously calculating numeric parity, it builds the mental framework required for superior <strong className="text-white font-semibold">Cognitive Flexibility</strong> and multitasking training without suffering cognitive degradation.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Competitive gamers managing maps, professionals juggling fast-paced data streams, and individuals looking for rigorous executive function training to enhance real-world attention control under stress.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Divided attention, rapid target acquisition, parallel numerical processing, cognitive flexibility, and high-stakes attention training.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score, visual vs numeric accuracy percentages, peak combo multipliers, and your absolute maximum cognitive performance level limit.</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Peripheral Anchoring:</strong> Avoid hyper-focusing exclusively on the numbers or the visual field. Relax your eyes centrally and use peripheral vision to track the moving spheres while your core focus evaluates the numbers.</li>
                    <li><strong className="text-gray-200">Rhythm Maintenance:</strong> The stimuli spawn on independent intervals. Establish a mental cadence to parse information streams without freezing when both trigger simultaneously.</li>
                    <li><strong className="text-gray-200">Survival & Combos:</strong> You must maintain accuracy to add time (+2s) and score (+5 PTS) back to your clock. Build combos (5, 10, 15, 20+) to unlock massive score bonuses. Misses drain the clock (-1.5s) and break combos instantly.</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-blue-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">How does the difficulty scaling work?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">The engine tracks your successful actions. Every 10 combined hits increases your Level. Higher levels force the spawn timers to compress and shrink the target geometry, significantly amplifying the dual task training pressure.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Why am I losing time when I don't click anything?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">This is an active survival drill for attention control. Failing to engage with an even number before it changes, or allowing a visual target to despawn untouched, counts as an omission error. This triggers a penalty (-3 Points, -1.5 Seconds, and breaks your combo).</p>
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
          <section className="mt-14" aria-label="Explore related cognitive drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-blue-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/cognitive/attention/selective-attention" title="Selective Attention" desc="Focus entirely on specific data while ignoring noise." color="cyan" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/sustained-attention" title="Concentration Stamina" desc="Maintain focus over extended periods without distraction." color="green" icon={<Timer className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/focus/concentration-grid" title="Concentration Grid" desc="Search grids linearly under intense time pressure." color="purple" icon={<Search className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/processing-speed/reaction-time" title="Reaction Time" desc="Raw millisecond reaction testing." color="orange" icon={<Zap className="w-4 h-4" />} />
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
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-black text-xl tracking-tight">SkillDrills</span>
                </div>
                <p className="text-sm mb-3 font-medium">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-8 text-gray-500">
                  Open-source telemetry training platform. Free forever. No downloads required.
                </p>
                
                <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
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

function EndStat({ label, value, color }) {
  const colors = {
    cyan: 'text-cyan-400',
    indigo: 'text-indigo-400',
    orange: 'text-orange-400',
    white: 'text-white',
    red: 'text-red-400',
    yellow: 'text-yellow-400'
  };
  return (
    <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">{label}</div>
      <div className={`text-base sm:text-xl font-black ${colors[color] || 'text-white'}`}>{value}</div>
    </div>
  );
}

function RuleItem({ color, text, highlight = '', result }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500', 
    purple: 'bg-purple-600 text-purple-300 border-purple-500', 
    green: 'bg-green-600 text-green-300 border-green-500', 
    red: 'bg-red-600 text-red-300 border-red-500',
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500',
    orange: 'bg-orange-600 text-orange-300 border-orange-500'
  };
  const colors = colorMap[color] || 'bg-slate-600 text-slate-300 border-slate-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-[#0b0f19]/40 p-4 rounded-xl border border-slate-800 shadow-sm">
      <div className={`w-3 h-3 rounded-full ${bg} shadow-lg flex-shrink-0`}></div>
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
    rose: 'from-rose-500 to-pink-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
    green: 'from-green-500 to-emerald-500'
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:-translate-y-1 hover:border-blue-500/50`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-blue-500 to-indigo-500'}`}></div>
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