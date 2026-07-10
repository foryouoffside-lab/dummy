'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2,
  Activity, Award, RefreshCw, Eye,
  Crosshair, Play, ChevronRight, Share2,
  GraduationCap, TrendingUp, BarChart3, ArrowRight, Info, RotateCcw,
  LogOut, Hash, Brain, Search, Users, Lightbulb, Layers, Sparkles
} from 'lucide-react';
import PlayAgainButton from "../../../../../components/PlayAgainButton";

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

  playRuleSwitch() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square'; 
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(660, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
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
// DATA SETS
// ============================================================
const DATA_SETS = {
  VOWELS: ['A', 'E', 'I', 'O', 'U'],
  CONSONANTS: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
  PRIMES: ['2', '3', '5', '7'],
  NON_PRIMES: ['1', '4', '6', '8', '9']
};

export default function ConcentrationStaminaClient() {
  
  // === UI State ===
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game State (Visual Sync) ===
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'ended'
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [accuracy, setAccuracy] = useState(100);
  const [level, setLevel] = useState(1);
  const [highestLevelReached, setHighestLevelReached] = useState(1);
  
  const [currentStim, setCurrentStim] = useState('G');
  const [activeRule, setActiveRule] = useState('VOWELS'); // 'VOWELS' or 'PRIMES'
  const [currentSpeed, setCurrentSpeed] = useState(1000);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  
  const [visualState, setVisualState] = useState('idle'); // 'idle', 'hit', 'miss'
  const [stats, setStats] = useState({ hits: 0, misses: 0, falseAlarms: 0 });

  // === Absolute Truth Refs (Decoupled Engine prevents stale closures) ===
  const mountedRef = useRef(false);
  const gameContainerRef = useRef(null);
  
  const gameStateRef = useRef('start'); // Real-time state for intervals
  const scoreRef = useRef(0);
  const timeRef = useRef(60.0);
  const speedRef = useRef(1000); // Starts at 1000ms
  const levelRef = useRef(1);
  const highestLevelRef = useRef(1);
  
  const activeRuleRef = useRef('VOWELS');
  const currentStimRef = useRef('');
  const isTargetRef = useRef(false);
  const hasActedRef = useRef(false); // Prevents double actions on one stim

  const statsRef = useRef({ hits: 0, misses: 0, falseAlarms: 0 });

  const globalTimerIntervalRef = useRef(null);
  const ruleTimerIntervalRef = useRef(null);
  const stimulusTimeoutRef = useRef(null);
  const feedbackTimerRef = useRef(null);

  // Sync state for UI rendering
  const syncToUI = useCallback(() => {
    setScore(scoreRef.current);
    setCurrentSpeed(speedRef.current);
    setStats({ ...statsRef.current });
    
    const totalActions = statsRef.current.hits + statsRef.current.falseAlarms + statsRef.current.misses;
    setAccuracy(totalActions > 0 ? Math.round((statsRef.current.hits / totalActions) * 100) : 100);
  }, []);

  // Audio Sync
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Load Best Score
  useEffect(() => {
    setIsClient(true);
    mountedRef.current = true;
    try {
      const saved = localStorage.getItem('skilldrills_concentration_best_v2');
      if (saved) setBestScore(parseInt(saved) || 0);
    } catch (e) {}
    setTimeout(() => { if (mountedRef.current) setLoading(false); }, 200);

    return () => {
      mountedRef.current = false;
      clearTimers();
    };
  }, []);

  // Screen Guard
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsHandler);
    
    const checkOrientationAndSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) || window.innerWidth < 768;
      
      if (!isMobile) { 
        setIsMobileLandscape(false);
        return; 
      }
      
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsMobileLandscape(!isPortrait);
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

  const clearTimers = useCallback(() => {
    if (globalTimerIntervalRef.current) clearInterval(globalTimerIntervalRef.current);
    if (ruleTimerIntervalRef.current) clearInterval(ruleTimerIntervalRef.current);
    if (stimulusTimeoutRef.current) clearTimeout(stimulusTimeoutRef.current);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
  }, []);

  const endGame = useCallback(() => {
    clearTimers();
    gameStateRef.current = 'ended';
    setGameState('ended');
    
    const finalScore = scoreRef.current;
    if (finalScore > bestScore && finalScore > 0) {
      setIsNewBest(true);
      setBestScore(finalScore);
      try { localStorage.setItem('skilldrills_concentration_best_v2', finalScore.toString()); } catch(e) {}
    }
    syncToUI();
  }, [bestScore, clearTimers, syncToUI]);

  const handleExit = useCallback(async () => {
    if (isFullscreen) {
      try { await document.exitFullscreen(); } catch (e) {}
    }
    clearTimers();
    gameStateRef.current = 'start';
    setGameState('start');
    setLocalTimeRemaining(60.0);
    setScore(0);
    setAccuracy(100);
    setCurrentSpeed(1000);
    setStats({ hits: 0, misses: 0, falseAlarms: 0 });
    setVisualState('idle');
  }, [isFullscreen, clearTimers]);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 600);
  }, []);

  const triggerVisualState = useCallback((state) => {
    setVisualState(state);
    setTimeout(() => {
      if (mountedRef.current) setVisualState('idle');
    }, 150);
  }, []);

  // === DYNAMIC DIFFICULTY ===
  const updateDifficulty = useCallback(() => {
    const newLevel = Math.floor(scoreRef.current / 50) + 1;
    levelRef.current = newLevel;
    setLevel(newLevel);
    highestLevelRef.current = Math.max(highestLevelRef.current, newLevel);
    setHighestLevelReached(highestLevelRef.current);

    const progress = Math.min(1, (newLevel - 1) / 10); 
    speedRef.current = Math.max(250, Math.floor(1000 - (progress * 750)));
  }, []);

  // === MECHANICS: Rewards & Penalties ===
  const applyReward = useCallback(() => {
    if (audioSynth) audioSynth.playHit();
    triggerVisualState('hit');
    
    scoreRef.current += 10;
    timeRef.current = Math.min(60.0, timeRef.current + 2.0); // Changed to +2s
    statsRef.current.hits += 1;
    setLocalTimeRemaining(timeRef.current);
    
    updateDifficulty();
    syncToUI();
    triggerFeedback('PERFECT! +10 PTS | +2s', 'success');
  }, [syncToUI, triggerFeedback, updateDifficulty, triggerVisualState]);

  const applyPenalty = useCallback((reason) => {
    if (audioSynth) audioSynth.playMiss();
    triggerVisualState('miss');
    
    timeRef.current -= 2.0; // -2s
    
    updateDifficulty();
    
    if (reason === 'false_alarm') {
      statsRef.current.falseAlarms += 1;
      triggerFeedback('WRONG! -2s', 'error');
    } else {
      statsRef.current.misses += 1;
      triggerFeedback('MISSED TARGET! -2s', 'error');
    }
    
    if (timeRef.current <= 0) {
      timeRef.current = 0;
      setLocalTimeRemaining(0);
      endGame();
      return;
    }
    
    setLocalTimeRemaining(timeRef.current);
    syncToUI();
  }, [syncToUI, triggerFeedback, endGame, triggerVisualState, updateDifficulty]);

  // === CORE GAME LOOP ===
  const spawnStimulus = useCallback(() => {
    // Rely strictly on Ref state to avoid React stale closures
    if (gameStateRef.current !== 'playing') return;
    if (stimulusTimeoutRef.current) clearTimeout(stimulusTimeoutRef.current);

    hasActedRef.current = false;
    
    // 30% chance for a target
    const isTarget = Math.random() < 0.3;
    isTargetRef.current = isTarget;

    let newStim = '';
    if (activeRuleRef.current === 'VOWELS') {
      newStim = isTarget 
        ? DATA_SETS.VOWELS[Math.floor(Math.random() * DATA_SETS.VOWELS.length)]
        : DATA_SETS.CONSONANTS[Math.floor(Math.random() * DATA_SETS.CONSONANTS.length)];
    } else {
      newStim = isTarget 
        ? DATA_SETS.PRIMES[Math.floor(Math.random() * DATA_SETS.PRIMES.length)]
        : DATA_SETS.NON_PRIMES[Math.floor(Math.random() * DATA_SETS.NON_PRIMES.length)];
    }

    currentStimRef.current = newStim;
    setCurrentStim(newStim);

    // Timeout for the stimulus duration
    stimulusTimeoutRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing' && mountedRef.current) {
        if (!hasActedRef.current) {
          if (isTargetRef.current) {
            applyPenalty('miss'); // Timeout without action on a target
          }
        }
        
        // Small gap before next spawn
        setCurrentStim(''); 
        setTimeout(() => {
          if (gameStateRef.current === 'playing') spawnStimulus();
        }, 150);
      }
    }, speedRef.current);

  }, [applyPenalty]);

  // === INPUT HANDLER ===
  const handleInteraction = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
    }
    if (gameStateRef.current !== 'playing' || hasActedRef.current || !currentStimRef.current) return;

    hasActedRef.current = true;
    
    if (isTargetRef.current) {
      applyReward();
    } else {
      applyPenalty('false_alarm');
    }

    // Immediately clear current and spawn next
    if (stimulusTimeoutRef.current) clearTimeout(stimulusTimeoutRef.current);
    setCurrentStim('');
    
    setTimeout(() => {
      if (gameStateRef.current === 'playing') spawnStimulus();
    }, 150);

  }, [applyReward, applyPenalty, spawnStimulus]);

  // Handle Keyboard Spacebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.code === 'Space' || e.code === 'Enter') && gameStateRef.current === 'playing') {
        handleInteraction(e);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInteraction]);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    
    clearTimers();
    setIsNewBest(false);
    
    gameStateRef.current = 'playing';
    setGameState('playing');
    
    timeRef.current = 60.0;
    scoreRef.current = 0;
    speedRef.current = 1000;
    levelRef.current = 1;
    highestLevelRef.current = 1;
    activeRuleRef.current = 'VOWELS';
    statsRef.current = { hits: 0, misses: 0, falseAlarms: 0 };
    
    setLocalTimeRemaining(60.0);
    setActiveRule('VOWELS');
    setLevel(1);
    setHighestLevelReached(1);
    syncToUI();
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });

    try {
      if (!document.fullscreenElement && gameContainerRef.current) {
        await gameContainerRef.current.requestFullscreen();
      }
    } catch (err) {}

    // Precise 100ms decoupled timer for exact float tracking
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

    // Rule Switcher (Every 10 seconds)
    ruleTimerIntervalRef.current = setInterval(() => {
      if (audioSynth) audioSynth.playRuleSwitch();
      const newRule = activeRuleRef.current === 'VOWELS' ? 'PRIMES' : 'VOWELS';
      activeRuleRef.current = newRule;
      setActiveRule(newRule);
      triggerFeedback(`RULE SWITCH: ${newRule}!`, 'warning');
    }, 10000);

    // Delay first spawn
    setTimeout(() => {
      if (gameStateRef.current === 'playing') spawnStimulus();
    }, 500);

  }, [clearTimers, endGame, spawnStimulus, syncToUI, triggerFeedback]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) await gameContainerRef.current?.requestFullscreen();
      else await document.exitFullscreen();
    } catch (err) {}
  }, []);

  const shareScore = useCallback(() => {
    let finalRank = 'Bronze';
    if (score >= 400 && accuracy >= 90) finalRank = 'Grandmaster';
    else if (score >= 300 && accuracy >= 82) finalRank = 'Master';
    else if (score >= 220 && accuracy >= 75) finalRank = 'Diamond';
    else if (score >= 150 && accuracy >= 65) finalRank = 'Platinum';
    else if (score >= 80 && accuracy >= 55) finalRank = 'Gold';
    else if (score >= 40) finalRank = 'Silver';

    const text = `🧠 I scored ${score} PTS with ${accuracy}% accuracy on the Concentration Stamina Test! Rank: ${finalRank}. Challenge your brain: https://skilldrills.online/drills/cognitive/attention/concentration-stamina`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'My SkillDrills Cognitive Score',
        text: text,
        url: 'https://skilldrills.online/drills/cognitive/attention/concentration-stamina'
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [score, accuracy]);

  // Calculate grade based on score and accuracy
  let gradeLetter = 'F';
  if (accuracy >= 90 && score >= 300) gradeLetter = 'S';
  else if (accuracy >= 80 && score >= 220) gradeLetter = 'A';
  else if (accuracy >= 70 && score >= 150) gradeLetter = 'B';
  else if (accuracy >= 60 && score >= 80) gradeLetter = 'C';
  else if (accuracy >= 45 && score >= 40) gradeLetter = 'D';

  let rankName = 'Bronze';
  let rankColor = 'text-slate-500';
  if (score >= 400 && accuracy >= 90) {
    rankName = 'Grandmaster';
    rankColor = 'text-fuchsia-400 font-extrabold';
  } else if (score >= 300 && accuracy >= 82) {
    rankName = 'Master';
    rankColor = 'text-red-400 font-extrabold';
  } else if (score >= 220 && accuracy >= 75) {
    rankName = 'Diamond';
    rankColor = 'text-cyan-400 font-extrabold';
  } else if (score >= 150 && accuracy >= 65) {
    rankName = 'Platinum';
    rankColor = 'text-indigo-400 font-extrabold';
  } else if (score >= 80 && accuracy >= 55) {
    rankName = 'Gold';
    rankColor = 'text-yellow-400 font-extrabold';
  } else if (score >= 40) {
    rankName = 'Silver';
    rankColor = 'text-gray-300 font-extrabold';
  }

  let diagnostics = "Superb sustained focus capacity! You successfully filtered non-targets and sustained speed through rapid rule re-configurations.";
  if (accuracy < 60) {
    diagnostics = "High false-alarm rate. Inhibit your impulse to press space/click immediately. Always double check if the item matches the active rule category.";
  } else if (stats.misses > stats.hits * 0.4) {
    diagnostics = "Attentional blindness / Slow processing detected. Try to register the stimuli faster and react quickly before they time out.";
  } else if (score < 80) {
    diagnostics = "Executive stamina bottleneck. Practice longer sessions to condition your prefrontal cortex to sustain concentration under rules-switching pressure.";
  }

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 uppercase tracking-widest text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  // Calculate progress for stroke ring
  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracy;

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
              <li className="text-blue-400 font-medium">Concentration Stamina</li>
            </ol>
          </nav>
        )}
        
        {/* Header */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Concentration Stamina</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Sustained Focus • Adaptive 1000ms-250ms • Rule Switching</p>
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

        {/* Dynamic HUD */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-blue-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
          <StatCard icon={<Activity className="text-indigo-400" />} value={currentSpeed} label="Speed" unit="ms" />
          <StatCard icon={<Award className="text-purple-400" />} value={accuracy} label="Accuracy" unit="%" />
          <StatCard icon={<Zap className="text-cyan-400" />} value={stats.hits} label="Targets Hit" />
          <StatCard icon={<Trophy className="text-yellow-400" />} value={bestScore} label="Best" />
        </div>

        {/* Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {localFeedback.visible && (
            <div key={localFeedback.id} className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : localFeedback.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-yellow-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
              {localFeedback.text}
            </div>
          )}
        </div>

        {/* Game Container: Adaptive Scale */}
        <div ref={gameContainerRef} 
          onContextMenu={(e) => { if(gameStateRef.current === 'playing') e.preventDefault(); }}
          className={`relative overflow-hidden w-full flex flex-col items-center justify-center transition-all duration-100 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-[#050505]' 
              : 'rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[500px] md:aspect-video bg-[#050505]'
          }`}
          style={{ 
            touchAction: gameStateRef.current === 'playing' ? 'none' : 'auto', 
            overscrollBehavior: gameStateRef.current === 'playing' ? 'none' : 'auto'
          }}>
          
          {/* Subtle grid */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

          {/* Time Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
              <div className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} />
            </div>
          )}

          {/* In-Game Controls (Fullscreen) */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-[60] flex gap-2">
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); endGame(); startGame(); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setSoundEnabled(v => !v); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            </div>
          )}

          {/* GAMEPLAY AREA */}
          {gameState === 'playing' && (
            <div 
              className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-crosshair focus:outline-none w-full h-full"
              onPointerDown={handleInteraction}
              tabIndex={0}
            >
              {/* Active Rule Indicator (Minimal) */}
              <div className="absolute top-6 sm:top-8 pointer-events-none z-20">
                <div className={`px-5 py-1.5 rounded-full border-2 text-lg sm:text-xl font-black tracking-widest bg-black/50 backdrop-blur-md ${activeRule === 'VOWELS' ? 'border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-purple-500 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]'}`}>
                  {activeRule}
                </div>
              </div>

              {/* Central Stimulus Display */}
              <div className={`text-[12rem] sm:text-[15rem] leading-none font-black transition-transform duration-100 ease-out select-none pointer-events-none
                ${visualState === 'hit' ? 'text-green-400 scale-110 drop-shadow-[0_0_30px_rgba(74,222,128,0.8)]' : 
                  visualState === 'miss' ? 'text-red-500 scale-90 drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]' : 
                  'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]'}`}
              >
                {currentStim || '\u00A0'}
              </div>
            </div>
          )}

          {/* START SCREEN */}
          {gameState === 'start' && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
              <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                {!isMobileLandscape && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] rotate-3">
                    <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                )}
                <h2 className="text-xl sm:text-3xl font-black mb-2 tracking-tight">Concentration Stamina</h2>
                <p className="text-sm sm:text-base mb-6 text-gray-400 leading-relaxed pointer-events-none">Sustained focus challenge. Tap targets accurately while ignoring distractors.</p>
                
                <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Play className="w-5 h-5 fill-white" /> START DRILL
                </button>
              </div>
            </div>
          )}

          {/* END SCREEN */}
          {gameState === 'ended' && (
            <div className="absolute inset-0 bg-[#05070e]/98 overflow-y-auto p-6 z-[70] select-none scrollbar-thin scroll-smooth backdrop-blur-sm" onPointerDown={e => e.stopPropagation()}>
              <div className="min-h-full flex flex-col justify-center items-center py-4 w-full">
                <div className="max-w-md w-full text-center">
                  {score > 0 && score >= bestScore && (
                    <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce font-mono">
                      ⭐ NEW PERSONAL BEST!
                    </div>
                  )}
                  
                  <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1 font-mono">
                    Drill Complete
                  </h2>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-mono">
                    Peak difficulty reached: Level {highestLevelReached}
                  </p>

                  <div className="grid grid-cols-3 gap-2.5 mb-6 text-left font-mono">
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                      <span className="text-sm font-black text-white">{score} <span className="text-[8px] text-slate-400 font-normal">PTS</span></span>
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
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Target Hits</span>
                      <span className="text-sm font-black text-emerald-400">{stats.hits}</span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Mistakes</span>
                      <span className="text-sm font-black text-red-400">{stats.falseAlarms + stats.misses}</span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Peak Level</span>
                      <span className="text-sm font-black text-purple-400">Lv.{level}</span>
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
                    <PlayAgainButton onClick={() => { endGame(); startGame(); }} colorTheme="blue" />
                    <button
                      onClick={shareScore}
                      className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors active:scale-95"
                      title="Share Score"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleExit}
                      className="p-3 bg-red-900/30 border border-red-900/55 hover:bg-red-900/50 text-red-400 rounded-xl transition-colors active:scale-95 flex items-center justify-center"
                      title="Exit Drill"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
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
                <Info className="w-5 h-5 text-blue-400" /><h2 className="font-bold text-white text-lg tracking-tight">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="green" text="Correct Target" highlight="+10 PTS | +2s" result="Increases Difficulty" />
                  <RuleItem color="purple" text="Adaptive Rules" highlight="Switch Every 10s" result="VOWELS / PRIMES" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="red" text="Wrong / Miss" highlight="No PTS Penalty | -2s" result="Reduces Timer" />
                  <RuleItem color="blue" text="Time Limit Capped" highlight="Max 60 Seconds" result="Endless Survival" />
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
                <h2 className="font-bold text-white text-lg tracking-tight">About Concentration Stamina</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This advanced cognitive drill tests <strong className="text-white font-semibold">sustained attention</strong> and <strong className="text-white font-semibold">inhibitory control</strong> under extreme time constraints. By utilizing a continuous Go/No-Go architecture with dynamic rule-switching, your brain is forced to rapidly process stimuli and overwrite its working memory of active targets.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Students pushing through intense study sessions, professionals dealing with rapid data verification, and athletes needing to maintain absolute focus without impulsive reactions.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Concentration endurance, impulse control (preventing false alarms), rapid task switching, and visual processing speed under adaptive pressure.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score, accuracy percentage, Perfect Hits vs. Errors, and your absolute peak processing boundary (Flash Speed in ms).</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Pre-Processing:</strong> Do not just wait for the character to appear. Actively repeat the current rule ("Vowels, Vowels, Vowels") internally to prime your motor response.</li>
                    <li><strong className="text-gray-200">Impulse Control:</strong> The engine will deliberately throw strings of non-targets at high speeds. Avoid rhythm-clicking; confirm the target before committing to a strike.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> While wrong answers do not deduct points, they still drain time (-2s) from your clock. Keep scoring to extend your play session.</li>
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
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">How does the difficulty adapt?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">The engine tracks your score. Every 50 points you earn increases your difficulty Level, shrinking character flash windows down to a minimum of 250ms. Your Level is protected even if you make mistakes.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">What happens during a rule switch?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Every 10 seconds, the target class flips between "VOWELS" and "PRIMES" accompanied by an audio cue and visual indicator change. This forcibly clears your working memory and prevents passive tracking.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related cognitive drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-blue-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Divided Attention" desc="Manage multiple chaotic streams simultaneously." color="purple" icon={<Layers className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/selective-attention" title="Selective Attention" desc="Focus entirely on specific data while ignoring noise." color="cyan" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/focus/concentration-grid" title="Concentration Grid" desc="Search grids linearly under intense time pressure." color="green" icon={<Search className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/processing-speed/reaction-time" title="Reaction Time" desc="Raw millisecond reaction testing." color="orange" icon={<Zap className="w-4 h-4" />} />
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
                    <li><Link href="/drills/visual-tracking" className="hover:text-blue-400 transition-colors">Tracking (25 drills)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-blue-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500/25 to-indigo-500/25 border border-blue-500/30 rounded-lg flex items-center justify-center">
                    <Hash className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[10px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[10px] max-w-2xl mx-auto leading-relaxed mb-8">
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

function RuleItem({ color, text, highlight = '', result }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500', 
    purple: 'bg-purple-600 text-purple-300 border-purple-500', 
    green: 'bg-green-600 text-green-300 border-green-500', 
    red: 'bg-red-600 text-red-300 border-red-500',
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500'
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