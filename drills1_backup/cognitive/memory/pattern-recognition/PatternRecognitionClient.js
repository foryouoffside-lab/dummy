'use client';

import { Component, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, CheckCircle2, Calculator, ArrowRight, Hash, RefreshCw,
  Users, Share2, LogOut, GraduationCap, Lightbulb, TrendingUp, Play, XCircle,
  ChevronRight, Brain, Award, Grid, Layers
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';

// ============================================================
// LEVEL SYSTEM (Difficulty Scaling)
// ============================================================
const MAX_LEVEL = 15;

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

  playCorrect() { this.playTone(880, 'sine', 0.15, 0.1); }   
  playCombo()   { this.playTone(1046.5, 'triangle', 0.3, 0.12); } 
  playPenalty() { this.playTone(220, 'sawtooth', 0.25, 0.15); } 
  playHint()    { this.playTone(660, 'sine', 0.15, 0.1); }
  
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
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-white text-lg font-bold mb-2">Engine Fault Detected</h3>
            <p className="text-gray-400 text-sm mb-6">The cognitive engine encountered a fatal error.</p>
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
export default function PatternRecognitionClient() {
  
  // === UI State ===
  const [currentScore, setCurrentScore] = useState(0);
  const [combo, setCombo] = useState(0);
  
  const [currentPattern, setCurrentPattern] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  
  // === Persistent State ===
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  // === Custom Precision Timer ===
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // === Fast Absolute Refs ===
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const mountedRef = useRef(false);
  const feedbackTimerRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const hasProcessedEndRef = useRef(false);
  const clickCooldownRef = useRef(false);

  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  const localTimeRef = useRef(60);
  const currentLevelRef = useRef(1);
  const usedPatternsRef = useRef(new Set());

  // === Game Engine Tracker ===
  const engine = useGameEngine({
    category: 'cognitive',
    drillId: 'pattern-recognition',
    drillName: 'Pattern Recognition',
    totalGameTime: 9999, // Handled internally
    lives: 9999,
    infiniteLives: true, 
    sharePath: 'drills/cognitive/problem-solving/pattern-recognition',
  });

  const engineRef = useRef(engine);
  const gameStateRef = useRef(engine.gameState);

  useEffect(() => {
    engineRef.current = engine;
    gameStateRef.current = engine.gameState;
    if (engine.gameState === 'playing') setIsNewBest(false);
  }, [engine.gameState]);

  // Load Initial Data
  useEffect(() => { 
    setIsClient(true); 
    mountedRef.current = true;
    try {
      const savedScore = localStorage.getItem('skilldrills_pattern_recognition_bestScore');
      if (savedScore) setBestScore(parseInt(savedScore) || 0);
      const name = localStorage.getItem('skilldrills_player_name');
      if (name) setPlayerNameInput(name);
    } catch (e) {}

    const t = setTimeout(() => { if (mountedRef.current) setLoading(false); }, 200); 
    return () => clearTimeout(t); 
  }, []);

  // Audio Sync
  useEffect(() => { if (audioSynth) audioSynth.setEnabled(soundEnabled); }, [soundEnabled]);

  // Fullscreen Detection
  useEffect(() => { 
    const h = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', h); 
    return () => document.removeEventListener('fullscreenchange', h); 
  }, []);

  // === Custom Precision Timer ===
  useEffect(() => {
    if (engine.gameState !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }
    
    if (!isTimeUp && localTimeRef.current === 60 && localTimeRemaining === 60) {
      // Empty initialization
    } else if (!isTimeUp && localTimeRef.current <= 0) {
      localTimeRef.current = 60;
      setLocalTimeRemaining(60);
    }

    timerIntervalRef.current = setInterval(() => {
      localTimeRef.current -= 0.1;
      
      if (localTimeRef.current <= 0) {
        localTimeRef.current = 0;
        setLocalTimeRemaining(0);
        setIsTimeUp(true);
        clearInterval(timerIntervalRef.current);
        if (typeof engineRef.current?.endGame === 'function') {
          engineRef.current.endGame();
        }
      } else {
        setLocalTimeRemaining(Math.ceil(localTimeRef.current));
      }
    }, 100);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [engine.gameState, isTimeUp, localTimeRemaining]);

  // Game End Protocol
  useEffect(() => {
    if ((engine.gameState !== 'ended' && !isTimeUp) || hasProcessedEndRef.current) return;
    hasProcessedEndRef.current = true;

    const finalScore = scoreRef.current;
    if (finalScore > bestScore && finalScore > 0) {
      setIsNewBest(true);
      setBestScore(finalScore);
      try { localStorage.setItem('skilldrills_pattern_recognition_bestScore', finalScore.toString()); } catch (e) {}
    }
    
    setCurrentScore(scoreRef.current);
    setCombo(comboRef.current);
  }, [engine.gameState, isTimeUp, bestScore]);

  // === UI Handlers ===
  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen && containerRef.current) { 
        await containerRef.current.requestFullscreen(); 
      } else if (isFullscreen) { 
        await document.exitFullscreen(); 
      } 
    } catch (e) {} 
  }, [isFullscreen]);

  const handleExit = useCallback(async () => {
    if (document.fullscreenElement) {
        await document.exitFullscreen().catch(()=>{});
    }
    if (engineRef.current) engineRef.current.resetGame();
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
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 1200);
  }, []);

  // === DYNAMIC HARD-SCALING GENERATOR ===
  const generatePatternData = useCallback((level) => {
    const generateCandidate = () => {
      const typeRand = Math.random();
      let sequence = [];
      let answer = 0;
      let type = '';
      let hint = '';

      if (level <= 3) {
        if (typeRand < 0.7) {
          const diff = Math.floor(Math.random() * 5) + 2;
          const start = Math.floor(Math.random() * 10) + 1;
          for(let i=0; i<4; i++) sequence.push(start + i*diff);
          answer = start + 4*diff;
          type = 'Arithmetic';
          hint = `Add ${diff} each time`;
        } else {
          const start = Math.floor(Math.random() * 5) + 1;
          for(let i=0; i<4; i++) sequence.push((start + i)**2);
          answer = (start + 4)**2;
          type = 'Squares';
          hint = 'Square each number';
        }
      } else if (level <= 7) {
        if (typeRand < 0.33) {
          const diff = Math.floor(Math.random() * 15) - 5; 
          const safeDiff = diff === 0 ? 5 : diff;
          const start = Math.floor(Math.random() * 50) + 20;
          for(let i=0; i<5; i++) sequence.push(start + i*safeDiff);
          answer = start + 5*safeDiff;
          type = 'Arithmetic';
          hint = `Add ${safeDiff} each step`;
        } else if (typeRand < 0.66) {
          const mult = Math.floor(Math.random() * 2) + 2;
          const start = Math.floor(Math.random() * 5) + 2;
          for(let i=0; i<4; i++) sequence.push(start * (mult**i));
          answer = start * (mult**4);
          type = 'Geometric';
          hint = `Multiply by ${mult} each step`;
        } else {
          const s1 = Math.floor(Math.random() * 10) + 1;
          const s2 = Math.floor(Math.random() * 10) + 5;
          sequence = [s1, s2, s1+s2, s1+2*s2, 2*s1+3*s2];
          answer = 3*s1+5*s2;
          type = 'Fibonacci';
          hint = 'Each number is sum of previous two';
        }
      } else if (level <= 11) {
        if (typeRand < 0.25) {
          const add = Math.floor(Math.random() * 10) + 2;
          const sub = Math.floor(Math.random() * 5) + 1;
          let val = Math.floor(Math.random() * 20) + 10;
          for(let i=0; i<5; i++) {
            sequence.push(val);
            val = i % 2 === 0 ? val + add : val - sub;
          }
          answer = val;
          type = 'Alternating (+/-)';
          hint = `Alternate: +${add}, -${sub}`;
        } else if (typeRand < 0.5) {
          const primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71];
          const startIdx = Math.floor(Math.random() * 10);
          for(let i=0; i<4; i++) sequence.push(primes[startIdx + i]);
          answer = primes[startIdx + 4];
          type = 'Primes';
          hint = 'Prime number sequence';
        } else if (typeRand < 0.75) {
          const start = Math.floor(Math.random() * 4) + 1;
          for(let i=0; i<4; i++) sequence.push((start + i)**3);
          answer = (start + 4)**3;
          type = 'Cubes';
          hint = 'Cube each number';
        } else {
          const mult = Math.floor(Math.random() * 3) + 3;
          const start = Math.floor(Math.random() * 4) + 2;
          for(let i=0; i<4; i++) sequence.push(start * (mult**i));
          answer = start * (mult**4);
          type = 'Geometric';
          hint = `Multiply by ${mult} each step`;
        }
      } else {
        if (typeRand < 0.33) {
          let v = Math.floor(Math.random() * 5) + 2;
          const mult = Math.floor(Math.random() * 2) + 2;
          const add = Math.floor(Math.random() * 5) + 2;
          for(let i=0; i<5; i++) {
            sequence.push(v);
            v = i % 2 === 0 ? v * mult : v + add;
          }
          answer = v;
          type = 'Interleaved (* / +)';
          hint = `Alternate: ×${mult} then +${add}`;
        } else if (typeRand < 0.66) {
          const diffs = [1, 2, 4, 7, 11, 16, 22]; 
          const start = Math.floor(Math.random() * 10) + 1;
          const offset = Math.floor(Math.random() * 2);
          let current = start;
          for(let i=0; i<5; i++) {
            sequence.push(current);
            current += diffs[i + offset];
          }
          answer = current;
          type = 'Nested Arithmetic';
          hint = 'Look at the differences between numbers';
        } else {
          const s1 = Math.floor(Math.random() * 20) + 10;
          const s2 = Math.floor(Math.random() * 30) + 20;
          sequence = [s1, s2, s1+s2, s1+2*s2, 2*s1+3*s2, 3*s1+5*s2];
          answer = 5*s1+8*s2;
          type = 'Advanced Fibonacci';
          hint = 'Each number is sum of previous two';
        }
      }

      return { sequence, answer, type, hint };
    };

    let candidate;
    let attempts = 0;
    do {
      candidate = generateCandidate();
      attempts++;
    } while (usedPatternsRef.current.has(candidate.sequence.join(',')) && attempts < 50);

    usedPatternsRef.current.add(candidate.sequence.join(','));
    return candidate;
  }, []);

  const loadNewPattern = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    const patternData = generatePatternData(currentLevelRef.current);
    
    if (mountedRef.current) {
      setCurrentPattern(patternData);
      setUserAnswer('');
      setShowHint(false);
      setHintUsed(false);
    }
  }, [generatePatternData]);

  // === ANSWER EVALUATION ===
  const checkInputAnswer = useCallback((e) => { 
    if (e) e.preventDefault();
    if (!currentPattern || !userAnswer.trim() || clickCooldownRef.current) return; 
    
    clickCooldownRef.current = true; 
    
    const ua = userAnswer.toLowerCase().trim(); 
    const ca = currentPattern.answer.toString().toLowerCase(); 
    const isCorrect = ua === ca;
    
    if (isCorrect) { 
      setCorrectAnswers(prev => prev + 1);
      
      const scoreGain = hintUsed ? 5 : 15;
      const timeGain = hintUsed ? 5 : 10;

      scoreRef.current += scoreGain; 
      localTimeRef.current = Math.min(60, localTimeRef.current + timeGain);
      setLocalTimeRemaining(Math.ceil(localTimeRef.current));
      
      // Increase Difficulty
      currentLevelRef.current = Math.min(MAX_LEVEL, currentLevelRef.current + 1);
      
      comboRef.current++; 
      if (comboRef.current > bestComboRef.current) bestComboRef.current = comboRef.current;
      
      if (audioSynth) audioSynth.playCorrect();
      triggerFeedback(`✓ Correct! +${scoreGain} PTS | +${timeGain}s`, 'success'); 
      
      if (comboRef.current % 5 === 0) { 
        if (audioSynth) audioSynth.playCombo();
      } 
      
      setCurrentScore(scoreRef.current);
      setCombo(comboRef.current);
      
      setTimeout(() => loadNewPattern(), 600);

    } else { 
      setIncorrectAnswers(prev => prev + 1);
      
      // Penalty: -10 Score, -5s Time
      scoreRef.current = Math.max(0, scoreRef.current - 10); 
      localTimeRef.current = Math.max(0, localTimeRef.current - 5);
      setLocalTimeRemaining(Math.ceil(localTimeRef.current));
      
      // Decrease Difficulty
      currentLevelRef.current = Math.max(1, currentLevelRef.current - 1);
      comboRef.current = 0; 
      
      if (audioSynth) audioSynth.playPenalty(); 
      triggerFeedback('✗ Wrong! -10 PTS | -5s', 'error'); 
      
      setCurrentScore(scoreRef.current);
      setCombo(comboRef.current);
      
      if (localTimeRef.current <= 0) {
        setIsTimeUp(true);
        if (engineRef.current?.endGame) engineRef.current.endGame();
      } else {
        setTimeout(() => { 
          if (inputRef.current) { 
            inputRef.current.focus(); 
            inputRef.current.select();
          } 
        }, 50);
      }
    }
    
    setTimeout(() => { clickCooldownRef.current = false; }, 100);
  }, [currentPattern, userAnswer, hintUsed, loadNewPattern, triggerFeedback]);

  const handleShowHint = useCallback(() => { 
    setShowHint(prev => !prev); 
    if (!showHint) setHintUsed(true); 
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [showHint]);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    
    // Auto-Fullscreen on Start
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request failed", err);
    }

    setIsTimeUp(false);
    hasProcessedEndRef.current = false;
    localTimeRef.current = 60;
    setLocalTimeRemaining(60);
    
    scoreRef.current = 0; 
    comboRef.current = 0; 
    bestComboRef.current = 0; 
    currentLevelRef.current = 1; // Start difficulty
    clickCooldownRef.current = false; 

    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    usedPatternsRef.current.clear();
    
    setCurrentScore(0);
    setCombo(0);
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });

    engineRef.current.startGame();
    gameStateRef.current = 'playing'; // Fix race condition
    loadNewPattern();
  }, [loadNewPattern]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/cognitive/problem-solving/pattern-recognition';
    if (navigator.share) {
      navigator.share({ title: 'Pattern Recognition Drill', text: 'Free cognitive drill! Solve mathematical sequences.', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  const getAccuracy = useCallback(() => { 
    const ta = correctAnswers + incorrectAnswers; 
    if (ta === 0) return 100; 
    return Math.round((correctAnswers / ta) * 100); 
  }, [correctAnswers, incorrectAnswers]);

  if (loading || !isClient) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050508]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Simulation...</p>
        </div>
      </div>
    ); 
  }

  const accuracy = getAccuracy();
  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracy;

  return (
    <div className={`min-h-screen select-none font-sans ${isDarkMode ? 'bg-[#050508] text-white' : 'bg-gray-50 text-gray-900'}`} style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}>
      <GameErrorBoundary>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
              <li className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/cognitive" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>Cognitive</Link></li>
              <li className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/cognitive/problem-solving" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>Problem Solving</Link></li>
              <li className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
              <li className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-current="page">Pattern Recognition</li>
            </ol>
          </nav>
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Pattern Recognition</h1>
                <p className={`text-sm mt-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Identify Sequences • Continuous Survival</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
  
              {engine.gameState === 'playing' && !isTimeUp && (
                <button onPointerDown={e => e.stopPropagation()} onClick={() => { if(engineRef.current) engineRef.current.endGame(); startGame(); }} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'}`} title="Reset">
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button onPointerDown={e => e.stopPropagation()} onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'}`} title="Toggle Theme">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onPointerDown={e => e.stopPropagation()} onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'}`} aria-label="Toggle drill area theme" title="Toggle drill area theme">
                <Eye className="w-5 h-5" />
              </button>
              <button onPointerDown={e => e.stopPropagation()} onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'}`} title="Toggle Audio">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onPointerDown={e => e.stopPropagation()} onClick={toggleFullscreen} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'}`} title="Toggle Fullscreen">
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
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
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-3 mb-2 h-auto py-1 relative z-10">
            <StatCard icon={<Target className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />} value={currentScore} label="Score" isDark={isDarkMode} />
            <StatCard icon={<Timer className={`w-4 h-4 sm:w-5 sm:h-5 ${localTimeRemaining <= 10 ? 'text-red-500 animate-pulse' : 'text-green-500'}`} />} value={localTimeRemaining} label="Time" unit="s" isDark={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-500 w-4 h-4 sm:w-5 sm:h-5" />} value={combo} label="Combo" isDark={isDarkMode} />
            <StatCard icon={<CheckCircle2 className="text-emerald-500 w-4 h-4 sm:w-5 sm:h-5" />} value={correctAnswers} label="Correct" isDark={isDarkMode} />
            <StatCard icon={<BarChart3 className="text-purple-500 w-4 h-4 sm:w-5 sm:h-5" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-500 w-4 h-4 sm:w-5 sm:h-5" />} value={bestScore} label="Best" isDark={isDarkMode} />
          </div>

          {/* Dynamic Feedback Popup */}
          <div className="h-8 mb-2 flex justify-center items-center pointer-events-none relative z-10">
            {localFeedback.visible && (
              <div key={localFeedback.id} className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
                {localFeedback.text}
              </div>
            )}
          </div>

          {/* Game Container */}
          <div ref={containerRef} 
            className={`relative flex flex-col items-center justify-center overflow-hidden transition-all duration-100 ${
              isFullscreen 
                ? `fixed inset-0 z-50 w-[100vw] h-[100dvh] rounded-none ${isBoxDarkMode ? 'bg-[#050508]' : 'bg-white'}` 
                : `w-full rounded-2xl border ${isBoxDarkMode ? 'bg-[#0a0a0a] border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)]' : 'bg-white border-gray-200 shadow-xl'} min-h-[60vh] md:min-h-[500px] md:aspect-video`
            }`}
            style={{ touchAction: (engine.gameState === 'playing' && !isTimeUp) ? 'none' : 'auto' }}>
            
            {/* Time Progress Bar */}
            {engine.gameState === 'playing' && !isTimeUp && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
                <div 
                  className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }}
                />
              </div>
            )}

            {isFullscreen && engine.gameState === 'playing' && !isTimeUp && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={e => e.stopPropagation()} onClick={() => { if(engineRef.current) engineRef.current.endGame(); startGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                <button onPointerDown={e => e.stopPropagation()} onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
                <button onPointerDown={e => e.stopPropagation()} onClick={handleExit} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              </div>
            )}

            {/* Active Gameplay Area */}
            {engine.gameState === 'playing' && !isTimeUp && currentPattern && (
              <div className="w-full max-w-4xl p-2 sm:p-4 lg:p-8 animate-in zoom-in-95 duration-150 flex flex-col h-full justify-center">
                
                {/* Header indicators */}
                <div className="flex justify-between items-center mb-2 landscape:mb-1 md:mb-4 px-1 sm:px-2">
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm ${isBoxDarkMode ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-600 border border-blue-200'}`}>
                    <Target className="w-3 h-3 inline mr-1.5" />{currentPattern.type}
                  </span>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm ${isBoxDarkMode ? 'bg-gray-800 text-gray-400 border border-gray-700' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                    Difficulty: Lvl {currentLevelRef.current}
                  </span>
                </div>
                
                {/* The Sequence Box */}
                <div className={`rounded-xl sm:rounded-3xl p-3 landscape:p-2 sm:p-6 md:p-10 mb-3 landscape:mb-2 sm:mb-8 shadow-2xl text-center flex flex-wrap justify-center items-center gap-1.5 sm:gap-4 md:gap-5 ${isBoxDarkMode ? 'bg-gray-900 border border-gray-800 shadow-[0_0_40px_rgba(0,0,0,0.5)]' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100'}`}>
                  {currentPattern.sequence.map((num, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className={`w-10 h-10 landscape:w-8 landscape:h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-2xl flex items-center justify-center shadow-lg border-2 ${isBoxDarkMode ? 'bg-black border-gray-700 shadow-inner' : 'bg-white border-blue-100'}`}>
                        <span className={`text-base landscape:text-sm sm:text-2xl md:text-3xl font-black tracking-tighter ${isBoxDarkMode ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'text-blue-600'}`}>{num}</span>
                      </div>
                      <span className={`text-sm landscape:text-xs sm:text-xl mx-0.5 sm:mx-2 ${isBoxDarkMode ? 'text-gray-600' : 'text-gray-400'}`} aria-hidden="true"><ArrowRight className="w-3 h-3 sm:w-5 sm:h-5" /></span>
                    </div>
                  ))}
                  <div className={`w-10 h-10 landscape:w-8 landscape:h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-2xl flex items-center justify-center border-2 sm:border-4 border-dashed shadow-lg ${isBoxDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-blue-300 bg-blue-50/50'}`}>
                    <span className={`text-lg landscape:text-base md:text-3xl font-black ${isBoxDarkMode ? 'text-gray-500 animate-pulse' : 'text-blue-300 animate-pulse'}`}>?</span>
                  </div>
                </div>
                
                {/* User Input Form */}
                <div className="text-center">
                  <div className="mb-2 landscape:mb-1 sm:mb-6">
                    <form onSubmit={checkInputAnswer} className="flex justify-center gap-2 sm:gap-3">
                      <input 
                        ref={inputRef} 
                        id="puzzle-answer" 
                        type="text" 
                        value={userAnswer} 
                        onChange={(e) => setUserAnswer(e.target.value)} 
                        className={`w-24 landscape:w-20 sm:w-48 px-3 landscape:px-2 sm:px-5 py-2 landscape:py-1.5 sm:py-4 border-2 rounded-lg sm:rounded-xl outline-none transition text-lg landscape:text-base sm:text-2xl font-black text-center tracking-widest ${isBoxDarkMode ? 'bg-gray-900 border-gray-700 text-white focus:border-blue-500 focus:bg-black shadow-inner' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 shadow-inner'}`} 
                        placeholder="?" 
                        autoFocus 
                        aria-label="Type your answer" 
                      />
                      <button type="submit" className="px-5 landscape:px-4 sm:px-8 py-2 landscape:py-1.5 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl font-black text-sm landscape:text-xs sm:text-lg hover:shadow-lg transition hover:scale-[1.02] active:scale-95 focus:outline-none shrink-0">
                        SOLVE
                      </button>
                    </form>
                  </div>
                </div>
                
                {/* Hint Toggle Button */}
                <div className="flex justify-center mt-1 sm:mt-4 md:mt-6">
                  <button onClick={handleShowHint} className={`flex items-center gap-1.5 text-[10px] sm:text-sm font-bold uppercase tracking-widest transition px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg ${isBoxDarkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-blue-500/10' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'} focus:outline-none`} aria-expanded={showHint}>
                    <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4" />{showHint ? 'Hide Hint' : 'Show Hint'} {hintUsed && '(Used)'}
                  </button>
                </div>
                
                {/* Hint Text Area */}
                {showHint && currentPattern && (
                  <div className={`mt-2 landscape:mt-1 sm:mt-3 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center animate-in fade-in slide-in-from-top-2 ${isBoxDarkMode ? 'bg-yellow-900/20 border border-yellow-700/50' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <p className={`text-[11px] sm:text-sm font-medium ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>
                      <strong>💡 Hint:</strong> {currentPattern.hint}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Clean Start Screen (Scrollable on tight displays) */}
            {engine.gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto flex flex-col">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(37,99,235,0.3)] shrink-0">
                    <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-2 pointer-events-none tracking-tight text-white shrink-0">Pattern Recognition</h2>
                  <p className="text-sm sm:text-base mb-8 text-gray-400 leading-relaxed pointer-events-none shrink-0">Identify mathematical sequences to crack the code and earn massive time extensions.</p>
                  
                  <button 
                    onPointerDown={e => e.stopPropagation()} 
                    onClick={startGame}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(37,99,235,0.3)] mt-auto shrink-0">
                    <Play className="w-5 h-5 fill-white" />
                    START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Premium Custom End Screen (Scrollable) */}
            {(engine.gameState === 'ended' || isTimeUp) && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col my-auto max-h-[95vh] overflow-y-auto">
                  
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
                      <p className="text-blue-400 font-medium text-xs sm:text-sm">Pattern Recognition • Lvl {currentLevelRef.current}</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pointer-events-none shrink-0">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                        <div className="flex items-end gap-1">
                          <span className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tighter">{currentScore}</span>
                          <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">PTS</span>
                        </div>
                      </div>
                      
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                          <path className="text-gray-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path 
                            className={`${accuracy >= 80 ? 'text-green-500' : accuracy >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                            strokeWidth="3" strokeDasharray="100" strokeDashoffset={`${100 - accuracy}`} strokeLinecap="round" stroke="currentColor" fill="none" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-base sm:text-xl font-black ${accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracy}%</span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Solved</div>
                        <div className="text-lg sm:text-xl font-black text-emerald-400">{correctAnswers}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Combo</div>
                        <div className="text-lg sm:text-xl font-black text-yellow-400">{bestComboRef.current}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0 mt-auto">
                    <button onPointerDown={e => e.stopPropagation()} onClick={() => { if(engineRef.current) engineRef.current.endGame(); startGame(); }} className="flex-1 py-3 sm:py-4 bg-blue-600 text-white rounded-xl font-black tracking-wide hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-sm sm:text-base">
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

          {/* Instructions */}
          {!isFullscreen && (
            <section className="mt-10">
              <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
                <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                  <Info className="w-5 h-5 text-blue-400" /><h2 className="font-bold text-white text-lg tracking-tight">Drill Instructions & Scoring</h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <RuleItem color="green" text="Correct Sequence" highlight="+15 PTS | +10s" result="Difficulty Up" isDark={isDarkMode} />
                    <RuleItem color="purple" text="Adaptive Puzzles" highlight="Scales up to 15 Levels" result="Dynamic Generation" isDark={isDarkMode} />
                  </div>
                  <div className="space-y-5">
                    <RuleItem color="red" text="Wrong Answer" highlight="-10 PTS | -5s" result="Difficulty Down" isDark={isDarkMode} />
                    <RuleItem color="orange" text="Time Limit Capped" highlight="Max 60 Seconds" result="Endless Survival" isDark={isDarkMode} />
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
                  <h2 className="font-bold text-white text-lg tracking-tight">About Pattern Recognition</h2>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-sm leading-relaxed mb-6 text-gray-300">
                    This free pattern recognition drill tests and improves your problem-solving skills with unique puzzle types that scale from basic arithmetic up to complex interleaved logical deduction. The dynamic scaling engine adjusts the complexity of the math and the rulesets based on your real-time performance.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                    <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                        <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-gray-400">Competitive exam aspirants (SAT, GRE, GMAT, CAT), mathematical puzzle enthusiasts, and anyone wanting elite-level cognitive conditioning.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                        <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-gray-400">Deep pattern recognition, mathematical modeling, abstract deduction, working memory, and rapid multi-step computational speed.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                        <h3 className="text-sm font-bold text-white tracking-tight">What You'll Track</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-gray-400">Net Score, accuracy percentage, total sequences solved, maximum combo streaks, and error penalties.</p>
                    </div>
                  </div>
                  
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                    </div>
                    <ol className="text-sm leading-relaxed space-y-3 list-decimal pl-5 text-gray-400">
                      <li><strong className="text-gray-200">Avoid Guessing:</strong> Submitting a wrong answer triggers a strict -10 Point and -5 Second penalty, dropping your internal difficulty. Calculate carefully.</li>
                      <li><strong className="text-gray-200">Survival Mechanics:</strong> Every correct answer rewards you with +15 Points and +10 Seconds to keep you alive. The timer hard caps at 60s, so pace yourself without rushing.</li>
                      <li><strong className="text-gray-200">Abandon Linear Thinking:</strong> If standard addition/subtraction fails, look for alternating rulesets, squares, primes, or Fibonacci sequencing.</li>
                    </ol>
                  </div>

                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-4">
                      <Info className="w-5 h-5 text-blue-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-sm font-bold text-gray-200 tracking-tight">How does the difficulty scale work?</h4>
                        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Each correct answer increases your sequence complexity level. Early levels deal with simple additions and squares. As you scale up, you will encounter interleaved sequences, prime sets, cyclic modulo logic, and nested arithmetic differences.</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-200 tracking-tight">Are there penalties for using hints?</h4>
                        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Yes. Using a hint will reduce your correct answer reward to +5 Points and +5 Seconds to balance out the assistance provided.</p>
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
                  Explore Related Free Drills
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <RelatedCard href="/drills/cognitive/memory/card-matching" title="Card Matching" desc="Memorize and clear spatial grids." color="purple" icon={<Grid className="w-4 h-4" />} isDark={isDarkMode} />
                <RelatedCard href="/drills/memory/short-term-memory/digit-span" title="Digit Span" desc="Train numerical short-term memory." color="green" icon={<Hash className="w-4 h-4" />} isDark={isDarkMode} />
                <RelatedCard href="/drills/memory/working-memory/n-back" title="Dual N-Back" desc="Gold standard working memory trainer." color="orange" icon={<Layers className="w-4 h-4" />} isDark={isDarkMode} />
                <RelatedCard href="/drills/academic/math-speed/mental-math" title="Mental Math" desc="Advanced mental calculation challenges." color="blue" icon={<Calculator className="w-4 h-4" />} isDark={isDarkMode} />
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
                      <li><Link href="/drills/mental-fitness" className="hover:text-blue-400 transition-colors">Mental Fitness (6)</Link></li>
                      <li><Link href="/drills/physical" className="hover:text-blue-400 transition-colors">Physical (11)</Link></li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-slate-900 pt-8 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500/25 to-indigo-500/25 border border-blue-500/30 rounded-lg flex items-center justify-center">
                      <Calculator className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                  </div>
                  <p className="text-[10px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                  <p className="text-[10px] max-w-2xl mx-auto leading-relaxed mb-8">
                    Open-source telemetry training platform. Free forever. No downloads required.
                  </p>
                  
                  <div className="flex items-center justify-center gap-3 flex-wrap mt-4">
                    <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                    <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                    <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="X / Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                    <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
                    <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg></a>
                  </div>
                </div>
              </div>
            </footer>
          )}
        </div>
      </GameErrorBoundary>
    </div>
  );
}

// ============================================================
// UI HELPER COMPONENTS
// ============================================================
function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`group rounded-lg sm:rounded-xl border ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white shadow-sm'} p-1.5 sm:p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] ${isDark ? 'hover:border-gray-600' : 'hover:border-blue-300'} backdrop-blur-sm pointer-events-none`}>
      <div className="mb-0.5 flex justify-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
        {icon}
      </div>
      <p className={`text-base sm:text-lg md:text-xl font-extrabold tracking-tight truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {value}
        <span className={`text-[9px] sm:text-[10px] font-semibold ml-0.5 opacity-80 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{unit}</span>
      </p>
      <p className={`text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider truncate mt-0.5 sm:mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
    </div>
  );
}

function RuleItem({ color, text, highlight = '', result, isDark }) {
  const colorMap = { 
    cyan: `bg-cyan-600 text-cyan-100 ${isDark ? 'border-cyan-500' : 'border-cyan-700'}`, 
    blue: `bg-blue-600 text-blue-100 ${isDark ? 'border-blue-500' : 'border-blue-700'}`, 
    red: `bg-red-600 text-red-100 ${isDark ? 'border-red-500' : 'border-red-700'}`, 
    orange: `bg-orange-600 text-orange-100 ${isDark ? 'border-orange-500' : 'border-orange-700'}`,
    green: `bg-green-600 text-green-100 ${isDark ? 'border-green-500' : 'border-green-700'}`,
    purple: `bg-purple-600 text-purple-100 ${isDark ? 'border-purple-500' : 'border-purple-700'}`
  };
  const colors = colorMap[color] || 'bg-gray-600 text-gray-100 border-gray-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border shadow-sm ${isDark ? 'bg-black/40 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
      <div className={`w-3 h-3 rounded-full ${bg} shadow-md flex-shrink-0`}></div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {text}{highlight && <span className={`font-black ${isDark ? 'text-gray-100' : 'text-gray-900'}`}> {highlight}</span>}
        </p>
        <div className={`text-xs font-black px-3 py-1.5 rounded-lg border ${border} ${isDark ? 'bg-[#050811] text-gray-300' : 'bg-white text-gray-700'} whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left`}>
          {result}
        </div>
      </div>
    </div>
  );
}

function RelatedCard({ href, title, desc, color, icon, isDark }) {
  const gradients = {
    blue: 'from-blue-500 to-indigo-500',
    cyan: 'from-cyan-500 to-teal-500',
    purple: 'from-purple-500 to-violet-500',
    orange: 'from-orange-500 to-amber-500',
    green: 'from-green-500 to-emerald-500'
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isDark ? 'border-gray-800 bg-[#0b0f19]/40 hover:border-blue-500/50 hover:shadow-blue-500/10' : 'border-gray-200 bg-white hover:border-blue-400 hover:shadow-blue-500/20'}`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-blue-500 to-indigo-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors shadow-inner ${isDark ? 'bg-[#050508] border-gray-700 text-gray-400 group-hover:text-white' : 'bg-gray-50 border-gray-200 text-gray-500 group-hover:text-blue-600'}`}>
            {icon}
          </div>
        </div>
        <h3 className={`font-bold text-base mb-1.5 transition-colors tracking-tight ${isDark ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}>{title}</h3>
        <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{desc}</p>
        <div className={`flex items-center gap-1.5 mt-4 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}