'use client';

import { Component, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Puzzle, Lightbulb, TrendingUp, Infinity, RefreshCw, LogOut,
  Star, Users, GraduationCap, ArrowRight, Brain, Calculator, 
  CheckCircle2, ChevronRight, Play, Award, Share2, Sparkles, XCircle, Grid, Hash, Layers
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';
import PlayAgainButton from "../../../../../components/PlayAgainButton";

// ============================================================
// LEVEL SYSTEM (Persistent + Dynamic Progression)
// ============================================================
const MAX_LEVEL = 15;
const POINTS_PER_LEVEL = 200; 

const getLevelDifficulty = (level) => {
  const clampedLevel = Math.max(1, Math.min(MAX_LEVEL, Math.round(level)));
  const progress = (clampedLevel - 1) / (MAX_LEVEL - 1); 
  return { level: clampedLevel, progress: progress };
};

const getRequiredScore = (level) => level * POINTS_PER_LEVEL;

const getLevelFromScore = (totalScore) => {
  let level = 1;
  while (level < MAX_LEVEL && totalScore >= getRequiredScore(level)) {
    level++;
  }
  return level;
};

// ============================================================
// LOCAL STORAGE
// ============================================================
const STORAGE_KEY = 'skilldrills_logic_puzzles_v5';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { currentLevel: 1, totalScore: 0, bestScore: 0, difficulty: getLevelDifficulty(1) };
    
    const data = JSON.parse(raw);
    const totalScore = Math.max(0, parseInt(data.totalScore) || 0);
    const bestScore = Math.max(0, parseInt(data.bestScore) || 0);
    const savedLevel = Math.max(1, Math.min(MAX_LEVEL, parseInt(data.currentLevel) || 1));
    const calculatedLevel = getLevelFromScore(totalScore);
    const finalLevel = Math.max(savedLevel, calculatedLevel);
    
    let difficulty = data.difficulty || getLevelDifficulty(finalLevel);
    return { currentLevel: finalLevel, totalScore, bestScore, difficulty };
  } catch (e) {
    return { currentLevel: 1, totalScore: 0, bestScore: 0, difficulty: getLevelDifficulty(1) };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      currentLevel: data.currentLevel,
      totalScore: data.totalScore,
      bestScore: data.bestScore,
      difficulty: data.difficulty || getLevelDifficulty(data.currentLevel)
    }));
  } catch (e) {}
};

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

  playSound(type) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      
      const now = this.ctx.currentTime;
      
      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'combo') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(880, now + 0.2);
        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.linearRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'hint') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch(e) {}
  }
  
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
export default function LogicPuzzlesClient() {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  
  // === UI State ===
  const [gameState, setGameState] = useState('start');
  const [currentScore, setCurrentScore] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });
  const [combo, setCombo] = useState(0);
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [totalSolved, setTotalSolved] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // === Persistent Level State ===
  const [currentLevel, setCurrentLevel] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [levelUpMessage, setLevelUpMessage] = useState('');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // === Custom Decoupled Timer ===
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);

  // === Refs ===
  const mountedRef = useRef(false);
  const feedbackTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const hasProcessedEndRef = useRef(false);
  const clickCooldownRef = useRef(false);
  const seenQuestionsRef = useRef(new Set()); 

  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  const gameStateRef = useRef('start');

  const currentLevelRef = useRef(1);
  const totalScoreRef = useRef(0);
  const bestScoreRef = useRef(0);
  const difficultyRef = useRef(getLevelDifficulty(1));
  
  const sessionPuzzleLevelRef = useRef(1); // Scales dynamically in-game
  const localTimeRef = useRef(60);

  // === Game Engine ===
  const engine = useGameEngine({
    category: 'cognitive',
    drillId: 'logic-puzzles',
    drillName: 'Logic Puzzles',
    totalGameTime: 9999, // Overridden by precision timer
    lives: 9999, 
    infiniteLives: true, 
    sharePath: 'drills/cognitive/problem-solving/logic-puzzles',
  });

  const engineRef = useRef(engine);
  useEffect(() => { engineRef.current = engine; }, [engine]);

  useEffect(() => {
    gameStateRef.current = engine.gameState;
    setGameState(engine.gameState);
    if (engine.gameState === 'playing') {
      hasProcessedEndRef.current = false;
      setIsNewBest(false);
    }
  }, [engine.gameState]);

  // Sync Score function
  const syncScoresToUI = useCallback(() => {
    setCurrentScore(scoreRef.current);
    setCombo(comboRef.current);
  }, []);

  // Initial Data Load
  useEffect(() => {
    setIsClient(true);
    mountedRef.current = true;
    
    const saved = getSavedData();
    setCurrentLevel(saved.currentLevel);
    setTotalScore(saved.totalScore);
    setBestScore(saved.bestScore);
    currentLevelRef.current = saved.currentLevel;
    totalScoreRef.current = saved.totalScore;
    bestScoreRef.current = saved.bestScore;
    difficultyRef.current = saved.difficulty;
    
    try {
      const name = localStorage.getItem('skilldrills_player_name');
      if (name) setPlayerNameInput(name);
    } catch (e) {}
    
    const timer = setTimeout(() => {
      if (mountedRef.current) setLoading(false);
    }, 200);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Audio effect toggle hook
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Fullscreen listener
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', fsHandler); 
    return () => { document.removeEventListener('fullscreenchange', fsHandler); };
  }, []);

  // === Custom Precision Timer (Caps at 60s) ===
  useEffect(() => {
    if (gameState !== 'playing') {
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
      // Fix float drift
      localTimeRef.current = Number((localTimeRef.current - 0.1).toFixed(1));
      
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
  }, [gameState, isTimeUp, localTimeRemaining]);


  // Level End & Persistence Protocol
  useEffect(() => {
    if ((gameState !== 'ended' && !isTimeUp) || hasProcessedEndRef.current) return;
    hasProcessedEndRef.current = true;
    
    const finalScore = scoreRef.current;
    const newTotalScore = totalScoreRef.current + finalScore;
    
    if (finalScore > bestScoreRef.current && finalScore > 0) {
      setIsNewBest(true);
    }
    const newBestScore = Math.max(bestScoreRef.current, finalScore);
    
    const calculatedLevel = getLevelFromScore(newTotalScore);
    const prevLevel = currentLevelRef.current;
    
    if (calculatedLevel > prevLevel) {
      setLevelUpMessage(`Level ${calculatedLevel} Unlocked!`);
      setShowLevelUp(true);
      setTimeout(() => { if (mountedRef.current) setShowLevelUp(false); }, 3500);
    }
    
    const newDifficulty = getLevelDifficulty(calculatedLevel);
    
    saveData({
      currentLevel: calculatedLevel,
      totalScore: newTotalScore,
      bestScore: newBestScore,
      difficulty: newDifficulty
    });
    
    setCurrentLevel(calculatedLevel);
    setTotalScore(newTotalScore);
    setBestScore(newBestScore);
    currentLevelRef.current = calculatedLevel;
    totalScoreRef.current = newTotalScore;
    bestScoreRef.current = newBestScore;
    difficultyRef.current = newDifficulty;
  }, [gameState, isTimeUp]);


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
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => {
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 1200);
  }, []);

  // Dynamic Puzzle Generator
  const generatePuzzleData = useCallback((level) => {
    const generateCandidate = () => {
      const puzzles = [];

      // BASELINE: Medium-Hard (Level 1-3)
      if (level >= 1) {
        const k = Math.floor(Math.random() * 5) + 1;
        puzzles.push({
          q: `Sequence: ${1+k}, ${4+k}, ${9+k}, ${16+k}, ?`,
          a: (25+k).toString(),
          h: `These are perfect squares (1, 4, 9, 16) plus ${k}`,
          p: 'Quadratic Pattern'
        });
        
        const s1 = Math.floor(Math.random() * 5) + 1;
        const i1 = Math.floor(Math.random() * 3) + 2;
        const s2 = Math.floor(Math.random() * 20) + 10;
        const i2 = Math.floor(Math.random() * 3) + 1;
        puzzles.push({
          q: `Sequence: ${s1}, ${s2}, ${s1+i1}, ${s2-i2}, ${s1+i1*2}, ${s2-i2*2}, ?`,
          a: (s1+i1*3).toString(),
          h: `Two alternating patterns interleaved. Look at the 1st, 3rd, 5th numbers.`,
          p: 'Interleaved'
        });
      }
      
      if (level >= 2) {
        const a = Math.floor(Math.random() * 8) + 2;
        const b = Math.floor(Math.random() * 8) + 2;
        puzzles.push({
          q: `If A + B = ${a+b} and A × B = ${a*b}. What is A² + B²?`,
          a: (a*a + b*b).toString(),
          h: `Find A and B first, square them, then add together.`,
          p: 'Systems of Equations'
        });
      }

      if (level >= 3) {
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 5) + 1;
        puzzles.push({
          q: `Sequence: ${a}, ${b}, ${a+b}, ${a+2*b}, ${2*a+3*b}, ?`,
          a: (3*a+5*b).toString(),
          h: `Each number is the sum of the previous two numbers.`,
          p: 'Fibonacci-like'
        });
      }
      
      // HARD (Level 4-7)
      if (level >= 4) {
        const x = Math.floor(Math.random() * 10) + 1;
        const y = Math.floor(Math.random() * 10) + 1;
        const z = Math.floor(Math.random() * 10) + 1;
        puzzles.push({
          q: `A+B=${x+y}, B+C=${y+z}, A+C=${x+z}. What is A+B+C?`,
          a: (x+y+z).toString(),
          h: `Add all three equations together, then divide by 2.`,
          p: 'Advanced Algebra System'
        });
      }
      
      if (level >= 5) {
        const n1 = Math.floor(Math.random() * 80) + 11;
        const n2 = Math.floor(Math.random() * 80) + 11;
        const dSum = (n) => String(n).split('').reduce((a,b)=>a+Number(b),0);
        puzzles.push({
          q: `If ${n1} ➞ ${dSum(n1)}, and ${n2} ➞ ${dSum(n2)}. What is ${n1+n2} ➞ ?`,
          a: dSum(n1+n2).toString(),
          h: `Calculate the exact sum of the single digits of the total.`,
          p: 'Digital Root Logic'
        });
      }
      
      if (level >= 6) {
        const base = Math.floor(Math.random() * 4) + 2;
        const exp = Math.floor(Math.random() * 3) + 2;
        puzzles.push({
          q: `If ${base}^X = ${Math.pow(base, exp)}, what is X²?`,
          a: (exp*exp).toString(),
          h: `Solve for X as the exponent, then square the result.`,
          p: 'Exponents'
        });
      }
      
      if (level >= 7) {
        const h = Math.floor(Math.random() * 40) + 15;
        puzzles.push({
          q: `If a 12-hour clock reads 5 o'clock, what time will it read after ${h} hours?`,
          a: (((5 + h - 1) % 12) + 1).toString(),
          h: `Use modulo 12 arithmetic to find the remainder.`,
          p: 'Cyclic Time Logic'
        });
      }

      // EXTREME IQ (Level 8-15)
      if (level >= 8) {
        const n = Math.floor(Math.random() * 6) + 5;
        puzzles.push({
          q: `In a room of ${n} people, everyone shakes hands exactly once. Total handshakes?`,
          a: ((n * (n-1)) / 2).toString(),
          h: `Formula: n × (n - 1) / 2`,
          p: 'Combinatorics'
        });
      }
      
      if (level >= 10) {
        const p = [2,3,5,7,11,13,17,19,23,29,31,37];
        const s = Math.floor(Math.random() * 5);
        puzzles.push({
          q: `Sequence: ${p[s]}, ${p[s+1]}, ${p[s+2]}, ${p[s+3]}, ?`,
          a: p[s+4].toString(),
          h: `These are consecutive prime numbers in order.`,
          p: 'Prime Sequence'
        });
      }
      
      if (level >= 12) {
        const n = Math.floor(Math.random() * 3) + 2;
        const seq = [n, n+1, n+2, n+3].map(x => (x**3)-x);
        puzzles.push({
          q: `Sequence: ${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, ?`,
          a: ((n+4)**3 - (n+4)).toString(),
          h: `Pattern strictly follows n³ - n for increasing integers.`,
          p: 'Cubic Logic'
        });
      }
      
      if (level >= 13) {
        const sums = [2,3,4,5,6,7,8,9,10,11,12];
        const targetSum = sums[Math.floor(Math.random() * sums.length)];
        const getCombos = (ts) => {
          let count = 0;
          for(let i=1; i<=6; i++) for(let j=1; j<=6; j++) if(i+j === ts) count++;
          return count;
        };
        puzzles.push({
          q: `Two 6-sided dice are rolled. How many total possible combinations give a sum of ${targetSum}?`,
          a: getCombos(targetSum).toString(),
          h: `Count the pairs (e.g. 1+6, 2+5, etc). Max combinations for 7 is six.`,
          p: 'Probability Maps'
        });
      }
      
      if (level >= 14) {
        const startFib = Math.floor(Math.random() * 3) + 1; 
        const S = Math.floor(Math.random() * 5) + 1; 
        const fibDiffs = [1, 2, 3, 5, 8, 13, 21];
        const seq = [
          S, 
          S + fibDiffs[0], 
          S + fibDiffs[0] + fibDiffs[1], 
          S + fibDiffs[0] + fibDiffs[1] + fibDiffs[2], 
          S + fibDiffs[0] + fibDiffs[1] + fibDiffs[2] + fibDiffs[3],
          S + fibDiffs[0] + fibDiffs[1] + fibDiffs[2] + fibDiffs[3] + fibDiffs[4]
        ];
        const nextAnswer = seq[5] + fibDiffs[5];
        
        puzzles.push({
          q: `Sequence: ${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, ${seq[4]}, ${seq[5]}, ?`,
          a: nextAnswer.toString(),
          h: `The differences between adjacent numbers form the Fibonacci sequence.`,
          p: 'Nested Sequences'
        });
      }

      return puzzles[Math.floor(Math.random() * puzzles.length)];
    };

    let candidate;
    let attempts = 0;
    do {
      candidate = generateCandidate();
      attempts++;
    } while (seenQuestionsRef.current.has(candidate.q) && attempts < 50);

    seenQuestionsRef.current.add(candidate.q);

    return {
      id: `puz_${Date.now()}_${Math.random()}`,
      question: candidate.q,
      answer: candidate.a,
      hint: candidate.h,
      pattern: candidate.p
    };
  }, []);

  const generateNewPuzzle = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    
    const newPuz = generatePuzzleData(sessionPuzzleLevelRef.current);
    
    setCurrentPuzzle(newPuz); 
    setUserAnswer(''); 
    setShowHint(false); 
    setHintUsed(false);
    
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 50);
  }, [generatePuzzleData]);

  // === DYNAMIC DIFFICULTY ===
  const updateDifficulty = useCallback(() => {
    // Persistent level + Session scaling (harder every 45 points)
    const newLevel = Math.min(MAX_LEVEL, currentLevelRef.current + Math.floor(scoreRef.current / 45));
    sessionPuzzleLevelRef.current = newLevel;
  }, []);

  const checkAnswer = useCallback((e) => { 
    if (e) e.preventDefault();
    if (!currentPuzzle || !userAnswer.trim() || clickCooldownRef.current) return; 
    
    clickCooldownRef.current = true; 
    setTotalAttempts(prev => prev + 1); 
    
    // Strip commas gracefully
    const ua = userAnswer.toLowerCase().replace(/,/g, '').trim(); 
    const ca = currentPuzzle.answer.toLowerCase(); 
    const isCorrect = ua === ca;
    
    if (isCorrect) { 
      setTotalSolved(prev => prev + 1);
      
      const scoreGain = hintUsed ? 5 : 15;
      const timeGain = hintUsed ? 2 : 5; // +5s standard, +2s with hint

      scoreRef.current += scoreGain; 
      localTimeRef.current = Math.min(60, localTimeRef.current + timeGain);
      setLocalTimeRemaining(Math.ceil(localTimeRef.current));
      
      updateDifficulty();

      if (!hintUsed) { 
        comboRef.current++; 
        if (comboRef.current > bestComboRef.current) {
          bestComboRef.current = comboRef.current;
        }
        if (audioSynth) audioSynth.playSound('correct'); 
        triggerFeedback(`✓ Correct! +${scoreGain} PTS | +${timeGain}s`, 'success'); 
        
        if (comboRef.current % 5 === 0) { 
          if (audioSynth) audioSynth.playSound('combo'); 
        } 
      } else { 
        comboRef.current = 0; 
        if (audioSynth) audioSynth.playSound('hint'); 
        triggerFeedback(`✓ Solved (Hint Used) • +${scoreGain} PTS | +${timeGain}s`, 'success'); 
      }
      
      syncScoresToUI();
      setTimeout(() => generateNewPuzzle(), 600);
      
    } else { 
      // Penalty: -5s Time (No PTS Penalty)
      localTimeRef.current = Math.max(0, localTimeRef.current - 5);
      setLocalTimeRemaining(Math.ceil(localTimeRef.current));
      
      updateDifficulty();
      comboRef.current = 0; 
      
      if (audioSynth) audioSynth.playSound('wrong'); 
      triggerFeedback('✗ Wrong! -5s', 'error'); 
      syncScoresToUI();
      
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
  }, [currentPuzzle, userAnswer, hintUsed, generateNewPuzzle, triggerFeedback, syncScoresToUI, updateDifficulty]);

  const handleShowHint = useCallback(() => { 
    setShowHint(prev => !prev); 
    if (!showHint) setHintUsed(true); 
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [showHint]);

  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (err) {}

    setIsTimeUp(false);
    hasProcessedEndRef.current = false;

    scoreRef.current = 0; 
    comboRef.current = 0; 
    bestComboRef.current = 0; 
    clickCooldownRef.current = false; 
    seenQuestionsRef.current.clear(); 
    sessionPuzzleLevelRef.current = currentLevelRef.current;
    
    localTimeRef.current = 60;
    setLocalTimeRemaining(60);
    setTotalSolved(0); 
    setTotalAttempts(0); 
    setCurrentPuzzle(null); 
    
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });
    
    engineRef.current?.startGame();
    gameStateRef.current = 'playing';
    
    syncScoresToUI();
    if (audioSynth) audioSynth.playSound('correct'); 
    
    const newPuz = generatePuzzleData(sessionPuzzleLevelRef.current);
    setCurrentPuzzle(newPuz);
    setUserAnswer('');
    setShowHint(false);
    setHintUsed(false);
    
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 50);
  }, [generatePuzzleData, syncScoresToUI]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/cognitive/problem-solving/logic-puzzles';
    if (navigator.share) {
      navigator.share({ title: 'Extreme Logic Puzzles Drill', text: 'Free cognitive drill! 15 scaling difficulty levels.', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  const shareScore = useCallback(() => {
    const finalAccuracy = totalAttempts > 0 ? Math.round((totalSolved / totalAttempts) * 100) : 100;
    
    let finalRank = 'Bronze';
    if (scoreRef.current >= 200 && finalAccuracy >= 90) finalRank = 'Grandmaster';
    else if (scoreRef.current >= 150 && finalAccuracy >= 82) finalRank = 'Master';
    else if (scoreRef.current >= 100 && finalAccuracy >= 75) finalRank = 'Diamond';
    else if (scoreRef.current >= 60 && finalAccuracy >= 65) finalRank = 'Platinum';
    else if (scoreRef.current >= 30 && finalAccuracy >= 55) finalRank = 'Gold';
    else if (scoreRef.current >= 15) finalRank = 'Silver';

    const text = `🧠 I scored ${scoreRef.current} PTS with ${finalAccuracy}% accuracy on the Extreme Logic Puzzles Drill! Reached Level ${sessionPuzzleLevelRef.current}. Rank: ${finalRank}. Try it here: https://skilldrills.online/drills/cognitive/problem-solving/logic-puzzles`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'My SkillDrills Cognitive Score',
        text: text,
        url: 'https://skilldrills.online/drills/cognitive/problem-solving/logic-puzzles'
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [totalSolved, totalAttempts]);

  const getAccuracy = useCallback(() => { 
    if (totalAttempts === 0) return 100; 
    return Math.round((totalSolved / totalAttempts) * 100); 
  }, [totalAttempts, totalSolved]);

  if (loading || !isClient) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050508]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(147,51,234,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Simulation...</p>
        </div>
      </div>
    ); 
  }

  const accuracy = getAccuracy();

  // Calculate grade based on score and accuracy
  let gradeLetter = 'F';
  if (accuracy >= 85 && currentScore >= 150) gradeLetter = 'S';
  else if (accuracy >= 75 && currentScore >= 100) gradeLetter = 'A';
  else if (accuracy >= 65 && currentScore >= 60) gradeLetter = 'B';
  else if (accuracy >= 55 && currentScore >= 30) gradeLetter = 'C';
  else if (accuracy >= 45 && currentScore >= 15) gradeLetter = 'D';

  let rankName = 'Bronze';
  let rankColor = 'text-slate-500';
  if (currentScore >= 200 && accuracy >= 90) {
    rankName = 'Grandmaster';
    rankColor = 'text-fuchsia-400 font-extrabold';
  } else if (currentScore >= 150 && accuracy >= 82) {
    rankName = 'Master';
    rankColor = 'text-red-400 font-extrabold';
  } else if (currentScore >= 100 && accuracy >= 75) {
    rankName = 'Diamond';
    rankColor = 'text-cyan-400 font-extrabold';
  } else if (currentScore >= 60 && accuracy >= 65) {
    rankName = 'Platinum';
    rankColor = 'text-indigo-400 font-extrabold';
  } else if (currentScore >= 30 && accuracy >= 55) {
    rankName = 'Gold';
    rankColor = 'text-yellow-400 font-extrabold';
  } else if (currentScore >= 15) {
    rankName = 'Silver';
    rankColor = 'text-gray-300 font-extrabold';
  }

  let diagnostics = "Phenomenal deductive logic and sequence analysis! Your prefrontal cortex processes complex variable relations and equations effortlessly.";
  if (totalAttempts - totalSolved > 4) {
    diagnostics = "High calculation error rate. Utilize scratchpads to write down algebraic variables and sequence steps instead of mental estimates.";
  } else if (accuracy < 60) {
    diagnostics = "Speed-accuracy trade-off imbalance. Slow down on exponents and modular time logic to ensure precision before submitting.";
  } else if (currentScore < 50) {
    diagnostics = "To improve, memorize basic combinations formulas (e.g. n*(n-1)/2 for handshakes) and key prime sequences.";
  }

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
              <li><Link href="/drills/cognitive" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>Problem Solving</Link></li>
              <li className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
              <li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">Logic Puzzles</li>
            </ol>
          </nav>
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                <Infinity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Extreme Logic Puzzles</h1>
                <p className={`text-sm mt-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Evaluate hidden patterns • Dynamic Scaling</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap flex-shrink-0">
  
              {engine.gameState === 'playing' && !isTimeUp && (
                <button onPointerDown={e => e.stopPropagation()} onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'}`} title="Reset">
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
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  onKeyDown={e => e.key === 'Enter' && savePlayerName()} />
                <button onClick={savePlayerName} className="px-5 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/20">Save</button>
              </div>
            </div>
          )}

          {showLevelUp && (
            <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] animate-bounce pointer-events-none">
              <div className="bg-gradient-to-r from-yellow-400 to-amber-600 text-black px-8 py-3 rounded-full font-bold text-lg shadow-[0_0_40px_rgba(251,191,36,0.6)] border border-yellow-300 flex items-center gap-2">
                <Star className="w-5 h-5 fill-black" />
                {levelUpMessage}
              </div>
            </div>
          )}

          {/* Stats Bar */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-3 mb-2 h-auto py-1 relative z-10">
            <StatCard icon={<Target className="text-purple-500 w-4 h-4 sm:w-5 sm:h-5" />} value={currentScore} label="Score" isDark={isDarkMode} />
            <StatCard icon={<Timer className={`w-4 h-4 sm:w-5 sm:h-5 ${localTimeRemaining <= 10 ? 'text-red-500 animate-pulse' : 'text-green-500'}`} />} value={localTimeRemaining} label="Time" unit="s" isDark={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-500 w-4 h-4 sm:w-5 sm:h-5" />} value={combo} label="Combo" isDark={isDarkMode} />
            <StatCard icon={<CheckCircle2 className="text-emerald-500 w-4 h-4 sm:w-5 sm:h-5" />} value={totalSolved} label="Solved" isDark={isDarkMode} />
            <StatCard icon={<BarChart3 className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
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
                  className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }}
                />
              </div>
            )}

            {isFullscreen && engine.gameState === 'playing' && !isTimeUp && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={e => e.stopPropagation()} onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                <button onPointerDown={e => e.stopPropagation()} onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
                <button onPointerDown={e => e.stopPropagation()} onClick={handleExit} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              </div>
            )}

            {/* Active Gameplay Area */}
            {engine.gameState === 'playing' && !isTimeUp && currentPuzzle && (
              <div className="w-full max-w-4xl p-2 sm:p-4 lg:p-8 animate-in zoom-in-95 duration-150 flex flex-col h-full justify-center">
                
                {/* Header indicators */}
                <div className="flex justify-between items-center mb-2 landscape:mb-1 md:mb-4 px-1 sm:px-2">
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm ${isBoxDarkMode ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-purple-100 text-purple-600 border border-purple-200'}`}>
                    <Puzzle className="w-3 h-3 inline mr-1.5" />{currentPuzzle.pattern}
                  </span>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm ${isBoxDarkMode ? 'bg-gray-800 text-gray-400 border border-gray-700' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                    Difficulty: Lvl {sessionPuzzleLevelRef.current}
                  </span>
                </div>
                
                {/* The Sequence Box */}
                <div className={`rounded-xl sm:rounded-3xl p-4 sm:p-6 md:p-10 mb-4 sm:mb-8 shadow-2xl text-center flex flex-col justify-center min-h-[100px] md:min-h-[140px] border ${isBoxDarkMode ? 'bg-gray-900 border-gray-800 shadow-[0_0_40px_rgba(0,0,0,0.5)]' : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100'}`}>
                  <p className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-relaxed ${isBoxDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {currentPuzzle.question}
                  </p>
                </div>
                
                {/* User Input Form */}
                <div className="text-center">
                  <div className="mb-2 landscape:mb-1 sm:mb-6">
                    <form onSubmit={checkAnswer} className="flex justify-center gap-2 sm:gap-3">
                      <input 
                        ref={inputRef} 
                        id="puzzle-answer" 
                        type="text" 
                        inputMode="numeric"
                        pattern="[0-9\-]*"
                        value={userAnswer} 
                        onChange={(e) => setUserAnswer(e.target.value)} 
                        className={`w-24 landscape:w-20 sm:w-48 px-3 landscape:px-2 sm:px-5 py-2 landscape:py-1.5 sm:py-4 border-2 rounded-lg sm:rounded-xl outline-none transition text-lg landscape:text-base sm:text-2xl font-black text-center tracking-widest ${isBoxDarkMode ? 'bg-gray-900 border-gray-700 text-white focus:border-purple-500 focus:bg-black shadow-inner' : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500 shadow-inner'}`} 
                        placeholder="?" 
                        autoFocus 
                        aria-label="Type your answer" 
                      />
                      <button type="submit" className="px-5 landscape:px-4 sm:px-8 py-2 landscape:py-1.5 sm:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg sm:rounded-xl font-black text-sm landscape:text-xs sm:text-lg hover:shadow-lg transition hover:scale-[1.02] active:scale-95 focus:outline-none shrink-0">
                        SOLVE
                      </button>
                    </form>
                  </div>
                </div>
                
                {/* Hint Toggle Button */}
                <div className="flex justify-center mt-1 sm:mt-4 md:mt-6">
                  <button onClick={handleShowHint} className={`flex items-center gap-1.5 text-[10px] sm:text-sm font-bold uppercase tracking-widest transition px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg ${isBoxDarkMode ? 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'} focus:outline-none`} aria-expanded={showHint}>
                    <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4" />{showHint ? 'Hide Hint' : 'Show Hint'} {hintUsed && '(Used)'}
                  </button>
                </div>
                
                {/* Hint Text Area */}
                {showHint && currentPuzzle && (
                  <div className={`mt-2 landscape:mt-1 sm:mt-3 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center animate-in fade-in slide-in-from-top-2 mx-auto max-w-md ${isBoxDarkMode ? 'bg-yellow-900/20 border border-yellow-700/50' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <p className={`text-[11px] sm:text-sm font-medium ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>
                      <strong>💡 Hint:</strong> {currentPuzzle.hint}
                    </p>
                    <p className={`text-[9px] sm:text-[10px] mt-1 sm:mt-2 font-bold uppercase tracking-widest ${isBoxDarkMode ? 'text-yellow-500/50' : 'text-yellow-700/70'}`}>
                      Solving with hint grants reduced points
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Clean Start Screen (Scrollable on tight displays) */}
            {engine.gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto flex flex-col">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(147,51,234,0.3)] shrink-0">
                    <Infinity className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-2 pointer-events-none tracking-tight text-white shrink-0">Extreme Logic Puzzles</h2>
                  <p className="text-sm sm:text-base mb-8 text-gray-400 leading-relaxed pointer-events-none shrink-0">Evaluate hidden patterns and solve advanced logic models under pressure. Scale up to level 15.</p>
                  
                  <button 
                    onPointerDown={e => e.stopPropagation()} 
                    onClick={handleStartGame}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(147,51,234,0.3)] mt-auto shrink-0">
                    <Play className="w-5 h-5 fill-white" />
                    START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Premium Custom End Screen */}
            {(engine.gameState === 'ended' || isTimeUp) && (
              <div className="absolute inset-0 bg-[#05070e]/98 overflow-y-auto p-6 z-[70] select-none scrollbar-thin scroll-smooth backdrop-blur-sm animate-in fade-in duration-300" onPointerDown={e => e.stopPropagation()}>
                <div className="min-h-full flex flex-col justify-center items-center py-4 w-full">
                  <div className="max-w-md w-full text-center">
                    {currentScore > 0 && currentScore >= bestScore && (
                      <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce font-mono">
                        ⭐ NEW PERSONAL BEST!
                      </div>
                    )}
                    
                    <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1 font-mono">
                      Drill Complete
                    </h2>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-mono">
                      Peak difficulty reached: Level {sessionPuzzleLevelRef.current}
                    </p>

                    <div className="grid grid-cols-3 gap-2.5 mb-6 text-left font-mono">
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                        <span className="text-sm font-black text-white">{currentScore} <span className="text-[8px] text-slate-400 font-normal">PTS</span></span>
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
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Solved</span>
                        <span className="text-sm font-black text-emerald-400">{totalSolved}</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Incorrect</span>
                        <span className="text-sm font-black text-red-400">{totalAttempts - totalSolved}</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Combo</span>
                        <span className="text-sm font-black text-pink-400">{bestComboRef.current}</span>
                      </div>
                    </div>

                    <div className="bg-[#0b0f19] border border-slate-850 p-3 rounded-xl mb-4 text-left">
                      <span className={`text-xs font-black block text-center uppercase tracking-widest ${rankColor} mb-2`}>
                        Rank: {rankName}
                      </span>
                      <div className="w-full h-px bg-slate-850 mb-2"></div>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-white uppercase mb-1 font-mono">
                        <Sparkles className="w-3 h-3 text-purple-500" /> Diagnostics advice:
                      </div>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        {diagnostics}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <PlayAgainButton onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} colorTheme="purple" />
                      <button
                        onPointerDown={e => e.stopPropagation()}
                        onClick={shareScore}
                        className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors active:scale-95"
                        title="Share Score"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      {isFullscreen && (
                        <button
                          onPointerDown={e => e.stopPropagation()}
                          onClick={handleExit}
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

          {/* Instructions */}
          {!isFullscreen && (
            <section className="mt-10">
              <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
                <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                  <Info className="w-5 h-5 text-purple-400" /><h2 className="font-bold text-white text-lg tracking-tight">Drill Instructions & Scoring</h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <RuleItem color="green" text="Solve Logic Perfectly" highlight="+15 PTS | +5s" result="Increases Score" isDark={isDarkMode} />
                    <RuleItem color="purple" text="Adaptive Puzzles" highlight="Scales up to 15 Levels" result="Scales on Score" isDark={isDarkMode} />
                  </div>
                  <div className="space-y-5">
                    <RuleItem color="red" text="Wrong Answer Penalty" highlight="No PTS Penalty | -5s" result="Reduces Timer" isDark={isDarkMode} />
                    <RuleItem color="orange" text="Time Limit Capped" highlight="Max 60 Seconds" result="Endless Survival" isDark={isDarkMode} />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ABOUT THIS DRILL */}
          {!isFullscreen && (
            <section className="mt-12" aria-label="About this logic puzzles drill">
              <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
                <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                  <h2 className="font-bold text-white text-lg tracking-tight">About This Extreme Logic Puzzles Drill</h2>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-sm leading-relaxed mb-6 text-gray-300">
                    This free logic puzzles drill tests and improves your problem-solving skills with unique puzzle types that scale from basic arithmetic up to extreme high-IQ logical deduction. The dynamic scaling engine adjusts the complexity of the math, the depth of the nested patterns, and the obscurity of the rulesets based on your persistent level progression and in-session accuracy.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                    <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                        <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-gray-400">Competitive exam aspirants (SAT, GRE, GMAT, CAT, UPSC), mathematical puzzle enthusiasts, and anyone wanting elite-level cognitive conditioning.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                        <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-gray-400">Deep pattern recognition, mathematical modeling, abstract deduction, working memory, and multi-step computational speed.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                        <h3 className="text-sm font-bold text-white tracking-tight">What You'll Track</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-gray-400">Net Score, accuracy percentage, solved count, maximum combo streaks, and progression up to the ultimate Level 15.</p>
                    </div>
                  </div>
                  
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play & Practice Effectively</h3>
                    </div>
                    <ul className="text-sm leading-relaxed space-y-3 list-decimal pl-5 text-gray-400">
                      <li><strong className="text-gray-200">Analyze the Ruleset:</strong> Each puzzle features a specific pattern (e.g., Quadratic, Fibonacci, Exponents). Identify the structural logic before crunching numbers.</li>
                      <li><strong className="text-gray-200">Survival Mechanics:</strong> Solving a puzzle correctly rewards you with <span className="text-green-400 font-bold">+15 PTS and +5s Time</span>. Submitting a wrong answer deducts <span className="text-red-400 font-bold">-5s Time</span>.</li>
                      <li><strong className="text-gray-200">Use Hints Wisely:</strong> Using a hint will reveal the core logic, but doing so drops your score reward drastically and breaks your combo streak.</li>
                      <li><strong className="text-gray-200">Continuous Conditioning:</strong> It forces the brain to abandon "linear" thinking and seek nested or alternative solutions when the obvious pattern fails.</li>
                    </ul>
                  </div>
                  
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-4">
                      <Info className="w-5 h-5 text-purple-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-sm font-bold text-gray-200 tracking-tight">How does the extreme difficulty scale work?</h4>
                        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Your scores accumulate persistently to unlock higher base levels. Beyond that, the difficulty also dynamically increases <em>during your session</em> for every 45 points you score. Early levels deal with simple additions and quadratic basics, while later stages introduce cyclic modulo logic, combinatorics, cubic variables, and nested algebraic sequences.</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-200 tracking-tight">Is there a penalty for an incorrect input?</h4>
                        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Yes. Accuracy is critical. A single incorrect answer deducts 5 seconds from your timer, breaking your combo and pushing you closer to a Game Over.</p>
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
                <div className="w-1 h-5 rounded-full bg-purple-500"></div>
                <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                  Explore Related Free Drills
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <RelatedCard href="/drills/cognitive/problem-solving/sudoku" title="Sudoku" desc="Classic number placement logic puzzle." color="purple" icon={<Puzzle className="w-4 h-4" />} isDark={isDarkMode} />
                <RelatedCard href="/drills/cognitive/problem-solving/tower-of-hanoi" title="Tower of Hanoi" desc="Strategic planning and sequential thinking." color="blue" icon={<Brain className="w-4 h-4" />} isDark={isDarkMode} />
                <RelatedCard href="/drills/academic/math-speed/mental-math" title="Mental Math" desc="Advanced mental calculation challenges." color="orange" icon={<Calculator className="w-4 h-4" />} isDark={isDarkMode} />
                <RelatedCard href="/drills/academic/comprehension/inference-drill" title="Inference Analytics" desc="Critical reasoning passages & rationales." color="cyan" icon={<Brain className="w-4 h-4" />} isDark={isDarkMode} />
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
                      <li><Link href="/drills/visual/visual-recognition/entropic-grid" className="hover:text-purple-400 transition-colors">Entropic Grid</Link></li>
                      <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-purple-400 transition-colors">Visual Search</Link></li>
                      <li><Link href="/drills/visual" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Visual Drills →</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory Training</h3>
                    <ul className="space-y-2">
                      <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-purple-400 transition-colors">3-Back Training</Link></li>
                      <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-purple-400 transition-colors">Color Sequence</Link></li>
                      <li><Link href="/drills/memory" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Memory Drills →</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                    <ul className="space-y-2">
                      <li><Link href="/drills/fps/flick-shot-training" className="hover:text-purple-400 transition-colors">Flick Shot Trainer</Link></li>
                      <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-purple-400 transition-colors">Aim Trainer</Link></li>
                      <li><Link href="/drills/fps" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All FPS Drills →</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                    <ul className="space-y-2">
                      <li><Link href="/drills/cognitive/problem-solving/pattern-recognition" className="hover:text-purple-400 transition-colors">Pattern Recognition</Link></li>
                      <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-purple-400 transition-colors">Divided Attention</Link></li>
                      <li><Link href="/drills/cognitive" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                    <ul className="space-y-2">
                      <li><Link href="/drills/academic" className="hover:text-purple-400 transition-colors">Academic (12)</Link></li>
                      <li><Link href="/drills/visual-tracking" className="hover:text-purple-400 transition-colors">Tracking (25 drills)</Link></li>
                      <li><Link href="/drills/physical" className="hover:text-purple-400 transition-colors">Physical (11)</Link></li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-slate-900 pt-8 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500/25 to-indigo-500/25 border border-purple-500/30 rounded-lg flex items-center justify-center">
                      <Infinity className="w-3.5 h-3.5 text-purple-400" />
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
    <div className={`group rounded-lg sm:rounded-xl border ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white shadow-sm'} p-1.5 sm:p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] ${isDark ? 'hover:border-gray-600' : 'hover:border-purple-300'} backdrop-blur-sm pointer-events-none`}>
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
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isDark ? 'border-gray-800 bg-[#0b0f19]/40 hover:border-purple-500/50 hover:shadow-purple-500/10' : 'border-gray-200 bg-white hover:border-purple-400 hover:shadow-purple-500/20'}`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-purple-500 to-indigo-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors shadow-inner ${isDark ? 'bg-[#050508] border-gray-700 text-gray-400 group-hover:text-white' : 'bg-gray-50 border-gray-200 text-gray-500 group-hover:text-purple-600'}`}>
            {icon}
          </div>
        </div>
        <h3 className={`font-bold text-base mb-1.5 transition-colors tracking-tight ${isDark ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'}`}>{title}</h3>
        <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{desc}</p>
        <div className={`flex items-center gap-1.5 mt-4 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}