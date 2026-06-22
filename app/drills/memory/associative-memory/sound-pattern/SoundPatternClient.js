'use client';

import { Component, useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2,
  Activity, Award, RefreshCw,
  Play, ChevronRight, Share2,
  GraduationCap, TrendingUp, BarChart3, ArrowRight, Info, RotateCcw, Music, Brain, Hash, Search, LogOut, CheckCircle, XCircle, Repeat, Users, Lightbulb
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';

// Cleaned, standardized rhythmic patterns
const ALL_PATTERNS = [
  { name: "Rain", beats: [1, 0, 1, 0, 1, 0, 1, 1], emoji: "🌧️" },
  { name: "Heartbeat", beats: [1, 1, 0, 1, 1, 0, 1, 1], emoji: "💓" },
  { name: "Clock", beats: [1, 0, 1, 0, 1, 0, 1, 0], emoji: "🕐" },
  { name: "Drum", beats: [1, 1, 1, 0, 1, 1, 1, 0], emoji: "🥁" },
  { name: "March", beats: [1, 0, 1, 0, 1, 1, 1, 0], emoji: "🥁" },
  { name: "Waltz", beats: [1, 0, 0, 1, 0, 0, 1, 0], emoji: "💃" },
  { name: "Samba", beats: [1, 1, 0, 1, 0, 1, 1, 0], emoji: "🪘" },
  { name: "Echo", beats: [1, 0, 0, 1, 0, 1, 0, 0], emoji: "🔊" },
  { name: "Pulse", beats: [1, 0, 1, 1, 0, 1, 0, 1], emoji: "💫" },
  { name: "Rhythm", beats: [1, 1, 0, 1, 1, 0, 1, 0], emoji: "🎵" },
  { name: "Swing", beats: [1, 0, 1, 1, 0, 1, 1, 0, 0, 1], emoji: "🎷" },
  { name: "Flamenco", beats: [1, 1, 0, 1, 1, 1, 0, 1, 0, 1], emoji: "💃" },
  { name: "Reggae", beats: [1, 0, 1, 0, 0, 1, 1, 0, 0, 1], emoji: "🎸" },
  { name: "Jazz", beats: [1, 0, 1, 1, 0, 1, 0, 1, 1, 0], emoji: "🎹" },
  { name: "Funk", beats: [1, 1, 0, 1, 0, 0, 1, 1, 0, 1], emoji: "🕺" },
  { name: "Bossa", beats: [1, 0, 1, 0, 1, 1, 0, 1, 0, 1], emoji: "🎶" },
  { name: "Tango", beats: [1, 0, 0, 1, 1, 0, 1, 0, 0, 1], emoji: "💃" },
  { name: "Blues", beats: [1, 1, 0, 0, 1, 1, 0, 1, 1, 0], emoji: "🎤" },
  { name: "Rock", beats: [1, 0, 1, 1, 0, 1, 0, 1, 0, 1], emoji: "🎸" },
  { name: "Pop", beats: [1, 1, 0, 1, 1, 0, 1, 1, 0, 1], emoji: "🎵" },
  { name: "Afrobeat", beats: [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1], emoji: "🥁" },
  { name: "Samba2", beats: [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1], emoji: "🪘" },
  { name: "Rumba", beats: [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1], emoji: "💃" },
  { name: "Conga", beats: [1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0], emoji: "🥁" },
  { name: "Mambo", beats: [1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1], emoji: "🕺" },
  { name: "Salsa", beats: [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0], emoji: "💃" },
  { name: "Calypso", beats: [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1], emoji: "🎵" },
  { name: "Merengue", beats: [1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1], emoji: "💃" },
  { name: "Bachata", beats: [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0], emoji: "🎶" },
  { name: "Cumbia", beats: [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1], emoji: "🪘" }
];

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

  playMiss() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth'; 
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }

  playRoundComplete() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch(e) {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
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
            <h3 className="text-white text-lg font-bold mb-2">Something went wrong</h3>
            <p className="text-gray-400 text-sm mb-6">The drill encountered an unexpected error. Your progress is safe.</p>
            <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }} className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-500 transition-colors">Try Again</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function SoundPatternClient() {
  
  // === UI State ===
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game State ===
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  const [accuracy, setAccuracy] = useState(100);
  
  // === Phase State ===
  const [currentPattern, setCurrentPattern] = useState(null);
  const [userPattern, setUserPattern] = useState([]);
  const [phase, setPhase] = useState("ready");
  const [isProcessing, setIsProcessing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [patternLength, setPatternLength] = useState(8);
  
  const [stats, setStats] = useState({ roundsCompleted: 0, totalCorrect: 0, totalAttempts: 0 });

  // === Decoupled Engine Refs ===
  const mountedRef = useRef(false);
  const containerRef = useRef(null);
  
  const engine = useGameEngine({
    category: 'memory',
    drillId: 'sound-pattern',
    drillName: 'Sound Pattern',
    totalGameTime: 9999,
    sharePath: 'drills/memory/associative-memory/sound-pattern',
  });

  const gameStateRef = useRef('start');
  const phaseRef = useRef('ready');
  const scoreRef = useRef(0);
  const timeRef = useRef(60.0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const patternLengthRef = useRef(8);
  
  const usedPatternsRef = useRef(new Set());
  const correctPatternRef = useRef(null);
  const playbackTimeoutsRef = useRef([]);
  const audioCtxRef = useRef(null);
  const statsRef = useRef({ roundsCompleted: 0, totalCorrect: 0, totalAttempts: 0 });

  const globalTimerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);

  // Sync to UI
  const syncToUI = useCallback(() => {
    setScore(scoreRef.current);
    setStreak(streakRef.current);
    setPatternLength(patternLengthRef.current);
    setStats({ ...statsRef.current });
    
    if (statsRef.current.totalAttempts > 0) {
      setAccuracy(Math.round((statsRef.current.totalCorrect / statsRef.current.totalAttempts) * 100));
    }
  }, []);

  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    setIsClient(true);
    mountedRef.current = true;
    try {
      const sScore = localStorage.getItem('skilldrills_soundpattern_best_score_v9');
      const sStreak = localStorage.getItem('skilldrills_soundpattern_best_streak_v9');
      if (sScore) setBestScore(parseInt(sScore, 10) || 0);
      if (sStreak) {
        const streakParsed = parseInt(sStreak, 10) || 0;
        setBestStreak(streakParsed);
        bestStreakRef.current = streakParsed;
      }
    } catch (e) {}
    setTimeout(() => { if (mountedRef.current) setLoading(false); }, 100);

    return () => {
      mountedRef.current = false;
      clearTimers();
    };
  }, []);

  // Screen Guard & Landscape Detection
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsHandler);
    
    const checkSize = () => {
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
    
    checkSize();
    window.addEventListener('resize', checkSize);
    window.addEventListener('orientationchange', checkSize);
    
    return () => {
      document.removeEventListener('fullscreenchange', fsHandler);
      window.removeEventListener('resize', checkSize);
      window.removeEventListener('orientationchange', checkSize);
    };
  }, []);

  const clearTimers = useCallback(() => {
    if (globalTimerIntervalRef.current) clearInterval(globalTimerIntervalRef.current);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    clearPlayback();
  }, []);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 800);
  }, []);

  const endGame = useCallback(() => {
    clearTimers();
    gameStateRef.current = 'ended';
    setGameState('ended');
    engine.endGame();
    
    const finalScore = scoreRef.current;
    if (finalScore > bestScore && finalScore > 0) {
      setIsNewBest(true);
      setBestScore(finalScore);
      try { localStorage.setItem('skilldrills_soundpattern_best_score_v9', finalScore.toString()); } catch(e) {}
    }
    syncToUI();
  }, [bestScore, clearTimers, syncToUI, engine]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen && containerRef.current) {
        await containerRef.current.requestFullscreen();
      } else if (isFullscreen) {
        await document.exitFullscreen();
      }
    } catch (err) {}
  }, [isFullscreen]);

  const handleExit = useCallback(async () => {
    if (isFullscreen) {
      try { await document.exitFullscreen(); } catch (e) {}
    }
    window.location.reload();
  }, [isFullscreen]);

  // === CORE GAME LOGIC ===

  const getAvailablePattern = useCallback((length) => {
    const available = ALL_PATTERNS.filter((_, i) => !usedPatternsRef.current.has(i));
    if (available.length < 1) {
      usedPatternsRef.current.clear();
      return ALL_PATTERNS[Math.floor(Math.random() * ALL_PATTERNS.length)];
    }
    const matching = available.filter(p => p.beats.length === length);
    const pool = matching.length > 0 ? matching : available;
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  const clearPlayback = useCallback(() => {
    playbackTimeoutsRef.current.forEach(id => clearTimeout(id));
    playbackTimeoutsRef.current = [];
  }, []);

  const playBeep = useCallback((duration = 0.3, frequency = 440) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const oscillator = audioCtxRef.current.createOscillator();
      const gainNode = audioCtxRef.current.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtxRef.current.destination);
      const now = audioCtxRef.current.currentTime;
      oscillator.frequency.setValueAtTime(frequency, now);
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
      oscillator.start(now);
      oscillator.stop(now + duration);
    } catch (e) {}
  }, [soundEnabled]);

  const startReproduce = useCallback(() => {
    setPhase("reproduce");
    phaseRef.current = "reproduce";
    setIsProcessing(false);
  }, []);

  const playPattern = useCallback((pattern) => {
    clearPlayback();
    setPlaying(true);
    setCurrentBeat(-1);
    
    const timeouts = [];
    const baseTempo = 450;
    const tempo = Math.max(200, baseTempo - (statsRef.current.roundsCompleted * 15));
    
    pattern.beats.forEach((beat, i) => {
      const id = setTimeout(() => {
        if (mountedRef.current && phaseRef.current === "listening") {
          setCurrentBeat(i);
          if (beat === 1) {
            const duration = Math.min(0.3, (tempo / 1000) * 0.8);
            playBeep(duration, 440 + i * 30); 
          }
        }
      }, i * tempo + 300);
      timeouts.push(id);
    });
    
    const endTime = pattern.beats.length * tempo + 800;
    const endId = setTimeout(() => {
      if (mountedRef.current && phaseRef.current === "listening") {
        setPlaying(false);
        setCurrentBeat(-1);
        startReproduce();
      }
    }, endTime);
    timeouts.push(endId);
    
    playbackTimeoutsRef.current = timeouts;
  }, [clearPlayback, playBeep, startReproduce]);

  const startRound = useCallback(() => {
    const length = patternLengthRef.current;
    const pattern = getAvailablePattern(length);
    const idx = ALL_PATTERNS.indexOf(pattern);
    if (idx !== -1) usedPatternsRef.current.add(idx);
    
    correctPatternRef.current = pattern;
    setCurrentPattern(pattern);
    setUserPattern([]);
    setIsProcessing(false);
    setPhase("listening");
    phaseRef.current = "listening";
    
    setTimeout(() => {
      if (gameStateRef.current === 'playing') {
        playPattern(pattern);
      }
    }, 400);
  }, [getAvailablePattern, playPattern]);

  const handleBeatClick = useCallback((isTap) => {
    if (phaseRef.current !== "reproduce" || isProcessing) return;
    
    const beatVal = isTap ? 1 : 0;
    const currentIndex = userPattern.length;
    const correctBeat = correctPatternRef.current.beats[currentIndex];
    
    const newPattern = [...userPattern, beatVal];
    setUserPattern(newPattern);
    
    if (beatVal === correctBeat) {
      if (beatVal === 1) playBeep(0.15, 440);
      
      if (newPattern.length === correctPatternRef.current.beats.length) {
        setIsProcessing(true);
        statsRef.current.totalAttempts += 1;
        statsRef.current.totalCorrect += 1;
        
        // Correct Sequence Rewards
        scoreRef.current += 20;
        timeRef.current = Math.min(60.0, timeRef.current + 15.0);
        streakRef.current++;
        
        if (streakRef.current > bestStreakRef.current) {
          bestStreakRef.current = streakRef.current;
          setBestStreak(streakRef.current);
          try { localStorage.setItem('skilldrills_soundpattern_best_streak_v9', streakRef.current.toString()); } catch (e) {}
        }
        
        if (streakRef.current % 3 === 0 && patternLengthRef.current < 12) {
          patternLengthRef.current = patternLengthRef.current === 8 ? 10 : 12;
        }
        
        if (audioSynth) audioSynth.playRoundComplete();
        triggerFeedback('✓ PERFECT RHYTHM! +20 PTS | +15s', 'success');
        
        setLocalTimeRemaining(Math.max(0, timeRef.current));
        statsRef.current.roundsCompleted += 1;
        syncToUI();
        
        setPhase("result");
        phaseRef.current = "result";
        
        setTimeout(() => {
          if (gameStateRef.current === 'playing') startRound();
        }, 1200);
      }
    } else {
      setIsProcessing(true);
      statsRef.current.totalAttempts += 1;
      
      // Wrong Tap Penalties
      scoreRef.current = Math.max(0, scoreRef.current - 2);
      timeRef.current -= 1.0;
      streakRef.current = 0;
      
      patternLengthRef.current = Math.max(8, patternLengthRef.current - 2); 
      
      if (audioSynth) audioSynth.playMiss();
      triggerFeedback('✗ OFF BEAT! -2 PTS | -1s', 'error');
      
      setLocalTimeRemaining(Math.max(0, timeRef.current));
      statsRef.current.roundsCompleted += 1;
      syncToUI();
      
      setPhase("result");
      phaseRef.current = "result";
      
      if (timeRef.current <= 0) {
        endGame();
      } else {
        setTimeout(() => {
          if (gameStateRef.current === 'playing') startRound();
        }, 1200);
      }
    }
  }, [userPattern, isProcessing, playBeep, syncToUI, triggerFeedback, startRound, endGame]);

  const resetPattern = useCallback(() => {
    setUserPattern([]);
  }, []);

  const replayPattern = useCallback(() => {
    if (correctPatternRef.current && gameStateRef.current === 'playing') {
      setUserPattern([]);
      setPhase("listening");
      phaseRef.current = "listening";
      setTimeout(() => {
        playPattern(correctPatternRef.current);
      }, 200);
    }
  }, [playPattern]);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    
    clearTimers();
    clearPlayback();
    setIsNewBest(false);
    
    // Total hard reset from the beginning
    scoreRef.current = 0;
    timeRef.current = 60.0;
    streakRef.current = 0;
    patternLengthRef.current = 8;
    usedPatternsRef.current = new Set();
    statsRef.current = { roundsCompleted: 0, totalCorrect: 0, totalAttempts: 0 };
    
    setLocalTimeRemaining(60.0);
    setUserPattern([]);
    setCurrentBeat(-1);
    setPlaying(false);
    setIsProcessing(false);
    setPhase('ready');
    phaseRef.current = 'ready';
    
    syncToUI();
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });

    gameStateRef.current = 'playing';
    setGameState('playing');
    engine.startGame();

    try {
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request skipped or blocked", err);
    }

    globalTimerIntervalRef.current = setInterval(() => {
      timeRef.current -= 0.1;
      if (timeRef.current <= 0) {
        timeRef.current = 0;
        setLocalTimeRemaining(0);
        endGame();
      } else {
        setLocalTimeRemaining(timeRef.current);
      }
    }, 100);

    startRound();
  }, [clearTimers, clearPlayback, endGame, startRound, syncToUI, engine]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/memory/associative-memory/sound-pattern';
    if (navigator.share) {
      navigator.share({ title: 'Sound Pattern Memory Drill', text: 'Test your auditory rhythmic memory!', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050508]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(14,165,233,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracy;

  return (
    <div className="min-h-screen select-none bg-[#050508] text-white selection:bg-transparent font-sans" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/memory" className="text-gray-500 hover:text-gray-300 transition-colors">Memory Drills</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-sky-400 font-medium">Sound Pattern</li>
            </ol>
          </nav>
        )}
        
        {/* Header */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                <Music className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Sound Pattern</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Auditory Memory • Rhythm Recall • Endless Survival</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {gameState === 'playing' && (
                <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Restart Drill">
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button onPointerDown={e => e.stopPropagation()} onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Sound">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onPointerDown={e => e.stopPropagation()} onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Fullscreen">
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

        {/* Stats Bar */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-sky-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
          <StatCard icon={<Repeat className="text-orange-400" />} value={patternLength} label="Length" />
          <StatCard icon={<TrendingUp className="text-yellow-400" />} value={streak} label="Streak" />
          <StatCard icon={<Activity className="text-blue-400" />} value={accuracy} label="Accuracy" unit="%" />
          <StatCard icon={<CheckCircle className="text-green-400" />} value={stats.totalCorrect} label="Correct" />
          <StatCard icon={<XCircle className="text-red-400" />} value={stats.totalAttempts - stats.totalCorrect} label="Errors" />
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
            onContextMenu={(e) => { if(gameStateRef.current === 'playing') e.preventDefault(); }}
            className={`relative overflow-hidden flex flex-col transition-all duration-100 ${
              isFullscreen 
                ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-[#050508] rounded-none' 
                : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[500px] md:aspect-video'
            }`}
            style={{ 
              touchAction: gameState === 'playing' ? 'none' : 'auto', 
              overscrollBehavior: gameState === 'playing' ? 'none' : 'auto',
              background: '#050508'
            }}>

            {/* Time Progress Bar */}
            {gameState === 'playing' && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
                <div 
                  className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-sky-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
                />
              </div>
            )}

            {/* Fullscreen Overlay Controls */}
            {isFullscreen && gameState === 'playing' && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); startGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setSoundEnabled(v => !v); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              </div>
            )}

            {/* GAMEPLAY AREA */}
            {gameState === 'playing' && (
              <div className="flex-1 flex flex-col items-center justify-center p-4 h-full w-full relative overflow-y-auto">
                
                {/* LISTENING PHASE */}
                {phase === "listening" && currentPattern && (
                  <div className="w-full flex flex-col items-center justify-center max-w-[90vw] sm:max-w-[600px] space-y-12 animate-in fade-in zoom-in-95 duration-200">
                    <div className="text-7xl sm:text-8xl md:text-9xl drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                      {currentPattern.emoji}
                    </div>
                    
                    <div className="flex gap-2 justify-center flex-wrap">
                      {currentPattern.beats.map((beat, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-200 ${
                            currentBeat === i
                              ? beat === 1
                                ? "bg-green-500 scale-125 shadow-[0_0_20px_rgba(34,197,94,0.8)]"
                                : "bg-gray-500 scale-110 shadow-[0_0_15px_rgba(107,114,128,0.5)]"
                              : "bg-gray-800"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* REPRODUCE PHASE */}
                {phase === "reproduce" && currentPattern && (
                  <div className={`w-full h-full flex ${isMobileLandscape ? 'flex-row' : 'flex-col'} items-center justify-center gap-6 sm:gap-8 max-w-5xl mx-auto p-2 sm:p-4 animate-in slide-in-from-bottom-8 duration-200`}>
                    
                    <div className={`flex flex-col items-center justify-center ${isMobileLandscape ? 'flex-1' : 'mb-auto pt-8'}`}>
                      <div className="text-5xl sm:text-6xl md:text-7xl drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-6 opacity-50">
                        {currentPattern.emoji}
                      </div>
                      {/* Progress Dots */}
                      <div className="flex gap-2 justify-center flex-wrap">
                        {currentPattern.beats.map((_, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full transition-all duration-150 ${
                              i < userPattern.length
                                ? userPattern[i] === 1
                                  ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                  : "bg-gray-500"
                                : "bg-gray-800"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Action Buttons (Square layout) */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-[320px] sm:max-w-[400px] mx-auto mt-auto mb-8 sm:mb-12">
                      <button
                        onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); handleBeatClick(true); }}
                        disabled={isProcessing}
                        className="aspect-square bg-green-500 rounded-[2rem] shadow-[0_8px_0_rgb(21,128,61)] active:translate-y-[8px] active:shadow-none transition-all flex flex-col items-center justify-center gap-2 focus:outline-none touch-none select-none disabled:opacity-50"
                      >
                        <Volume2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-900" />
                        <span className="text-xl sm:text-2xl font-black text-green-900 tracking-widest">TAP</span>
                      </button>
                      
                      <button
                        onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); handleBeatClick(false); }}
                        disabled={isProcessing}
                        className="aspect-square bg-gray-500 rounded-[2rem] shadow-[0_8px_0_rgb(75,85,99)] active:translate-y-[8px] active:shadow-none transition-all flex flex-col items-center justify-center gap-2 focus:outline-none touch-none select-none disabled:opacity-50"
                      >
                        <VolumeX className="w-12 h-12 sm:w-16 sm:h-16 text-gray-900" />
                        <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-widest">REST</span>
                      </button>
                    </div>

                  </div>
                )}

                {/* RESULT PHASE */}
                {phase === "result" && currentPattern && (
                  <div className="w-full flex flex-col items-center justify-center max-w-[90vw] sm:max-w-[600px] animate-in zoom-in-95 duration-300 space-y-12 h-full">
                    <div className="text-7xl sm:text-8xl md:text-9xl drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                      {currentPattern.emoji}
                    </div>
                    <div className="flex gap-2 justify-center flex-wrap" aria-label="Correct pattern">
                      {currentPattern.beats.map((beat, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                            beat === 1 ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* START SCREEN - Clean and Simple */}
            {gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl flex flex-col my-auto max-h-[95vh] overflow-y-auto">
                  {!isMobileLandscape && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                        <Music className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                      </div>
                  )}
                  <h2 className="text-2xl sm:text-3xl font-black mb-2 pointer-events-none tracking-tight">Sound Pattern</h2>
                  <p className="text-sm sm:text-base mb-8 text-gray-400 leading-relaxed pointer-events-none">Listen to the rhythmic sequences and reproduce them flawlessly.</p>
                  
                  <button onPointerDown={e => e.stopPropagation()} onClick={startGame}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none shrink-0 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                    <Play className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Premium Custom End Screen */}
            {gameState === 'ended' && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col my-auto max-h-[95vh]">
                  
                  <div className="bg-gradient-to-br from-sky-900/40 to-indigo-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                      <p className="text-sky-400 font-medium text-xs sm:text-sm">Sound Pattern • Peak Length: {patternLengthRef.current} Beats</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pointer-events-none shrink-0">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tighter">{score}</span>
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
                      <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Rounds</div>
                        <div className="text-base sm:text-xl font-black text-green-400">{stats.roundsCompleted}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Length</div>
                        <div className="text-base sm:text-xl font-black text-cyan-400">{patternLengthRef.current}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Streak</div>
                        <div className="text-base sm:text-xl font-black text-orange-400">{bestStreak}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0 mt-auto">
                    <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="flex-1 py-3 sm:py-4 bg-sky-600 text-white rounded-xl font-black tracking-wide hover:bg-sky-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.4)] text-sm sm:text-base">
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
        </GameErrorBoundary>

        {/* Instructions */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-sky-400" /><h2 className="font-bold text-white text-lg tracking-tight">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="green" text="Perfect Pattern" highlight="+20 PTS | +15s" result="Difficulty Increases" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="red" text="Wrong Tap / Miss" highlight="-2 PTS | -1s" result="Difficulty Decreases" />
                  <RuleItem color="orange" text="Time Limit Capped" highlight="Max 60 Seconds" result="Endless Survival" />
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
                <GraduationCap className="w-5 h-5 text-sky-400" />
                <h2 className="font-bold text-white text-lg tracking-tight">About Sound Pattern</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This auditory memory drill trains your brain's <strong className="text-white font-semibold">temporal processing</strong> and <strong className="text-white font-semibold">rhythm recall</strong> capabilities through a highly challenging Endless Time-Attack format. By forcing rapid ingestion of audio cues mapped in strict time sequences, you strengthen the neural pathways required for language processing, musical timing, and sequential working memory.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Musicians developing internal metronomes, language learners improving auditory parsing, and anyone wanting to improve their ability to remember complex sequential sounds.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Auditory memory capacity, rhythmic recall, temporal processing speed, sequence encoding, and working memory retention under time pressure.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score, accuracy percentage, Total Rounds Completed, Mistakes, and your peak auditory capacity (Max Pattern Length) reached.</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Rhythmic Chunking:</strong> Don't try to remember individual notes. Group them into musical measures or familiar beats. This is scientifically proven to bypass short-term memory limits.</li>
                    <li><strong className="text-gray-200">Physical Involvement:</strong> Subtly nodding your head or tapping your foot while listening activates the motor cortex, reinforcing the auditory memory trace before you input it.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> You are awarded +20 points and +15s time back for perfectly reproducing the entire sequence. However, a single wrong tap instantly drops your difficulty, deducting -1s and -2 points. Focus on accuracy! Maximum time is capped at 60s.</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-sky-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">What exactly is a "REST" beat?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">A Rest beat is a deliberate pause in the sequence where no tone is played. When reproducing the pattern, you must accurately register these silences by pressing the REST button to stay on beat.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Why does the pattern speed up?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">This is an adaptive cognitive engine. Every time you complete a sequence perfectly, the sequence gets longer AND the playback tempo increases. This forces rapid auditory encoding and prevents passive listening.</p>
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
              <div className="w-1 h-5 rounded-full bg-sky-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/memory/short-term-memory/digit-span" title="Digit Span" desc="Train numerical short-term memory." color="purple" icon={<Hash className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/working-memory/n-back" title="Dual N-Back" desc="Gold standard working memory trainer." color="green" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/short-term-memory/color-sequence" title="Color Sequence" desc="Memorize and recall color chains." color="orange" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/visual-recognition/visual-search" title="Visual Search" desc="Conjunctive search for hidden items." color="blue" icon={<Search className="w-4 h-4" />} />
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
                    <li><Link href="/drills/visual/visual-recognition/entropic-grid" className="hover:text-sky-400 transition-colors">Entropic Grid</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-sky-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-sky-450 hover:text-sky-400 transition-colors font-bold">All Visual Drills {'→'}</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-sky-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-sky-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-sky-450 hover:text-sky-400 transition-colors font-bold">All Memory Drills {'→'}</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-sky-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-sky-400 transition-colors">Aim Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-sky-450 hover:text-sky-400 transition-colors font-bold">All FPS Drills {'→'}</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-sky-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-sky-400 transition-colors">Divided Attention</Link></li>
                    <li><Link href="/drills/cognitive" className="text-sky-450 hover:text-sky-400 transition-colors font-bold">All Cognitive Drills {'→'}</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic" className="hover:text-sky-400 transition-colors">Academic (12)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-sky-400 transition-colors">Mental Fitness (6)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-sky-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-sky-500/25 to-indigo-500/25 border border-sky-500/30 rounded-lg flex items-center justify-center">
                    <Activity className="w-3.5 h-3.5 text-sky-400" />
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

// ============================================================
// UI HELPER COMPONENTS
// ============================================================
function StatCard({ icon, value, label, unit = '' }) {
  return (
    <div className="group rounded-xl border border-gray-800 bg-gray-900/50 p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-700 backdrop-blur-sm pointer-events-none">
      <div className="mb-0.5 sm:mb-1.5 flex justify-center opacity-90 scale-75 sm:scale-100">{icon}</div>
      <p className="text-sm sm:text-lg md:text-xl font-black tracking-tighter truncate text-white leading-none mt-0.5 sm:mt-0">
        {value}<span className="text-[10px] sm:text-xs font-bold ml-0.5 text-gray-500">{unit}</span>
      </p>
      <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest truncate text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function RuleItem({ color, text, highlight = '', result }) {
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
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(14,165,233,0.1)] hover:-translate-y-1 hover:border-sky-500/50`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-sky-500 to-indigo-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050508] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-sky-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-sky-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}