'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon,
  BarChart3, Info, Puzzle, Lightbulb, TrendingUp, Infinity, RefreshCw, LogOut,
  Star, Users, GraduationCap, ArrowRight, Brain, Calculator, 
  CheckCircle2, ChevronRight, Play, Award, Share2
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';

// ============================================================
// LEVEL SYSTEM (Persistent Progression)
// ============================================================
const MAX_LEVEL = 15;
const POINTS_PER_LEVEL = 200; 

const getLevelDifficulty = (level) => {
  const clampedLevel = Math.max(1, Math.min(MAX_LEVEL, Math.round(level)));
  const progress = (clampedLevel - 1) / (MAX_LEVEL - 1); 
  
  return {
    level: clampedLevel,
    progress: progress
  };
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
  
  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function LogicPuzzlesClient() {
  const containerRef = useRef(null);
  
  // === UI State ===
  const [gameState, setGameState] = useState('start');
  const [currentScore, setCurrentScore] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [combo, setCombo] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
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

  // === Custom Decoupled Timer ===
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);

  // === Refs ===
  const mountedRef = useRef(false);
  const inputRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  const gameStateRef = useRef('start');
  const clickCooldownRef = useRef(false);
  const seenQuestionsRef = useRef(new Set()); 

  const currentLevelRef = useRef(1);
  const totalScoreRef = useRef(0);
  const bestScoreRef = useRef(0);
  const difficultyRef = useRef(getLevelDifficulty(1));
  const hasProcessedEndRef = useRef(false);
  
  const sessionPuzzleLevelRef = useRef(1);
  const localTimeRef = useRef(60);
  const timerIntervalRef = useRef(null);

  // Sync Score function
  const syncScoresToUI = useCallback(() => {
    setCurrentScore(scoreRef.current);
    setCombo(comboRef.current);
  }, []);

  // === Game Engine ===
  const engine = useGameEngine({
    category: 'cognitive',
    drillId: 'logic-puzzles',
    drillName: 'Logic Puzzles',
    totalGameTime: 9999, // Overridden by custom timer
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

  // === Custom Precision Timer (Caps at 60s) ===
  useEffect(() => {
    if (gameState !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      localTimeRef.current -= 1;
      setLocalTimeRemaining(Math.max(0, localTimeRef.current));
      
      if (localTimeRef.current <= 0) {
        clearInterval(timerIntervalRef.current);
        if (typeof engineRef.current?.endGame === 'function') {
          engineRef.current.endGame();
        }
      }
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState]);

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
      mountedRef.current = false;
      clearTimeout(timer);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Fullscreen listener
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', fsHandler); 
    return () => {
      document.removeEventListener('fullscreenchange', fsHandler);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen) { 
        if (containerRef.current?.requestFullscreen) await containerRef.current.requestFullscreen(); 
      } else { 
        if (document.fullscreenElement) await document.exitFullscreen(); 
      } 
    } catch (e) {} 
  }, [isFullscreen]);

  const handleExit = useCallback(async () => {
    if (document.fullscreenElement) {
        await document.exitFullscreen().catch(()=>{});
    }
    if (engineRef.current) engineRef.current.resetGame();
  }, []);

  const showFeedbackMsg = useCallback((message, type) => { 
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); 
    setFeedback(message); 
    setFeedbackType(type); 
    feedbackTimeoutRef.current = setTimeout(() => { 
      if (mountedRef.current) { setFeedback(''); setFeedbackType(''); }
    }, 1200); 
  }, []);

  // Audio effect toggle hook
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Level End & Persistence Protocol
  useEffect(() => {
    if (engine.gameState !== 'ended' || hasProcessedEndRef.current) return;
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
  }, [engine.gameState]);

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

  const checkAnswer = useCallback(() => { 
    if (!currentPuzzle || !userAnswer.trim() || clickCooldownRef.current) return; 
    
    clickCooldownRef.current = true; 
    setTotalAttempts(prev => prev + 1); 
    
    const ua = userAnswer.toLowerCase().trim(); 
    const ca = currentPuzzle.answer.toLowerCase(); 
    const isCorrect = ua === ca;
    
    if (isCorrect) { 
      setTotalSolved(prev => prev + 1);
      
      scoreRef.current += 15; 
      localTimeRef.current = Math.min(60, localTimeRef.current + 10);
      sessionPuzzleLevelRef.current = Math.min(MAX_LEVEL, sessionPuzzleLevelRef.current + 1);
      setLocalTimeRemaining(localTimeRef.current);

      if (!hintUsed) { 
        comboRef.current++; 
        if (comboRef.current > bestComboRef.current) {
          bestComboRef.current = comboRef.current;
        }
        if (audioSynth) audioSynth.playSound('correct'); 
        showFeedbackMsg('✓ Correct! +15 PTS | +10s', 'success'); 
        
        if (comboRef.current % 5 === 0) { 
          if (audioSynth) audioSynth.playSound('combo'); 
          showFeedbackMsg(`🔥 ${comboRef.current}x Combo!`, 'success'); 
        } 
      } else { 
        comboRef.current = 0; 
        if (audioSynth) audioSynth.playSound('hint'); 
        showFeedbackMsg('✓ Solved (Hint Used) • +15 PTS | +10s', 'success'); 
      }
      
      syncScoresToUI();
      generateNewPuzzle(); 
    } else { 
      scoreRef.current = Math.max(0, scoreRef.current - 10); 
      localTimeRef.current -= 5;
      sessionPuzzleLevelRef.current = Math.max(1, sessionPuzzleLevelRef.current - 1);
      setLocalTimeRemaining(Math.max(0, localTimeRef.current));
      
      comboRef.current = 0; 
      if (audioSynth) audioSynth.playSound('wrong'); 
      showFeedbackMsg('✗ Wrong! -10 PTS | -5s', 'error'); 
      syncScoresToUI();
      
      if (localTimeRef.current <= 0) {
        if (engineRef.current?.endGame) engineRef.current.endGame();
      } else {
        setTimeout(() => { 
          if (inputRef.current) inputRef.current.focus(); 
        }, 50);
      }
    }
    
    setTimeout(() => { clickCooldownRef.current = false; }, 100);
  }, [currentPuzzle, userAnswer, hintUsed, generateNewPuzzle, showFeedbackMsg, syncScoresToUI]);

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
    setFeedback(''); 
    setFeedbackType(''); 
    
    engineRef.current?.startGame();
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

  const getAccuracy = useCallback(() => { 
    if (totalAttempts === 0) return 100; 
    return Math.round((totalSolved / totalAttempts) * 100); 
  }, [totalAttempts, totalSolved]);

  const savePlayerName = useCallback(() => {
    const name = playerNameInput.trim() || 'Anonymous Player';
    try { localStorage.setItem('skilldrills_player_name', name); } catch (e) {}
    setShowNameInput(false);
  }, [playerNameInput]);

  if (loading || !isClient) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(147,51,234,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    ); 
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-gray-50 text-gray-900'}`} style={{ touchAction: 'manipulation' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/drills/cognitive" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Cognitive</Link></li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Problem Solving</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
            <li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">Logic Puzzles</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex-shrink-0 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
              <Infinity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Extreme Logic Puzzles</h1>
              <p className={`text-sm sm:text-base font-medium mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Dynamic Time Challenges • Mobile Optimized</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap flex-shrink-0">

            {gameState === 'playing' && (
              <button onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'}`} title="Reset session">
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={isDarkMode ? 'Light mode' : 'Dark mode'}>
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'} title={soundEnabled ? 'Mute' : 'Unmute'}>
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button onClick={toggleFullscreen} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
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

        {/* Dynamic HUD */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-3 mb-4 h-auto min-h-[88px] py-1">
          <StatCard icon={<Target className="text-purple-500" />} value={currentScore} label="Score" />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-500 animate-pulse' : 'text-green-500'} />} value={localTimeRemaining} label="Time" unit="s" />
          <StatCard icon={<CheckCircle2 className="text-emerald-500" />} value={totalSolved} label="Solved" />
          <StatCard icon={<BarChart3 className="text-blue-500" />} value={getAccuracy()} label="Accuracy" unit="%" />
          <StatCard icon={<Zap className="text-orange-500" />} value={combo} label="Combo" />
        </div>

        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {feedback && (
            <div className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${feedbackType === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
              {feedback}
            </div>
          )}
        </div>

        {/* Game Container: Pure black BG, adaptive sizing for mobile vs desktop */}
        <div ref={containerRef} 
          className={`relative flex flex-col items-center justify-center overflow-hidden transition-all duration-100 bg-black ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-full h-[100dvh] rounded-none' 
              : 'w-full rounded-2xl border border-gray-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[500px] md:aspect-video'
          }`} 
          style={{ 
            touchAction: gameState === 'playing' ? 'none' : 'auto', 
            overscrollBehavior: gameState === 'playing' ? 'none' : 'auto'
          }}>
          
          {/* Time Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`}
                style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }}
              />
            </div>
          )}

          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} className="p-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-white hover:bg-gray-800 transition-all active:scale-95"><RefreshCw className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-white hover:bg-gray-800 transition-all active:scale-95">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={handleExit} className="p-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-white hover:bg-gray-800 transition-all active:scale-95"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center p-2 sm:p-8">
            
            {/* Start Screen (Scrollable on mobile) */}
            {gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 overflow-y-auto bg-black/80">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 shadow-2xl border my-auto flex flex-col max-h-[95dvh] bg-gray-900 border-gray-800">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(147,51,234,0.3)] shrink-0">
                    <Infinity className="w-10 h-10 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-black mb-2 tracking-tight shrink-0 text-white">Extreme Logic Puzzles</h2>
                  <p className="mb-8 text-sm font-medium shrink-0 text-gray-400">Evaluate hidden patterns and solve advanced logic models under pressure. Scale up to level 15.</p>

                  <button onClick={handleStartGame} className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-black text-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-auto shrink-0">
                    <Play className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Active Gameplay - Mobile Height Optimized */}
            {gameState === 'playing' && currentPuzzle && (
              <div className="w-full max-w-3xl px-2 sm:px-4 animate-in zoom-in-95 duration-150 flex flex-col items-center">
                <div className="flex justify-center items-center mb-2 md:mb-4 px-1 w-full">
                  <span className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <Puzzle className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1.5" />{currentPuzzle.pattern}
                  </span>
                </div>
                
                <div className="w-full rounded-2xl p-4 sm:p-6 md:p-10 mb-3 md:mb-6 shadow-lg text-center flex flex-col justify-center min-h-[100px] md:min-h-[140px] bg-gray-900 border border-gray-800">
                  <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-relaxed text-gray-100">
                    {currentPuzzle.question}
                  </p>
                </div>
                
                <div className="w-full max-w-md sm:max-w-lg mx-auto mb-2 sm:mb-4">
                  <div className="flex flex-row gap-2 sm:gap-3">
                    <input 
                      ref={inputRef} 
                      id="puzzle-answer" 
                      type="text" 
                      value={userAnswer} 
                      onChange={(e) => setUserAnswer(e.target.value)} 
                      onKeyDown={(e) => e.key === 'Enter' && checkAnswer()} 
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 border border-gray-700 rounded-xl outline-none transition text-xl sm:text-2xl md:text-3xl font-black text-center tracking-widest bg-gray-950 text-white focus:border-purple-500 focus:bg-black shadow-inner min-w-[50%]" 
                      placeholder="?" 
                      autoFocus 
                      aria-label="Type your answer" 
                    />
                    <button onClick={checkAnswer} className="px-4 py-2 sm:px-6 sm:py-3 md:px-10 md:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-black text-sm sm:text-base md:text-xl hover:shadow-lg transition active:scale-95 focus:outline-none shrink-0">
                      SOLVE
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-center mt-2 sm:mt-4 md:mt-6 w-full">
                  <button onClick={handleShowHint} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest transition px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 focus:outline-none" aria-expanded={showHint}>
                    <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4" />{showHint ? 'Hide Hint' : 'Show Hint'} {hintUsed && '(Used)'}
                  </button>
                </div>
                
                {showHint && (
                  <div className="mt-2 sm:mt-3 rounded-xl p-3 sm:p-4 text-center w-full max-w-md animate-in fade-in slide-in-from-top-2 bg-yellow-900/20 border border-yellow-700/50">
                    <p className="text-xs sm:text-sm md:text-base font-medium text-yellow-400">
                      <strong>💡 Hint:</strong> {currentPuzzle.hint}
                    </p>
                    <p className="text-[9px] sm:text-[10px] mt-1 sm:mt-2 font-bold uppercase tracking-widest text-yellow-500/50">
                      Solving with hint grants reduced points
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* End Screen (Scrollable on mobile) */}
            {(gameState === 'ended') && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6">
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[95dvh] my-auto">
                  
                  <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                      <p className="text-purple-400 font-medium text-sm sm:text-base">Extreme Logic Puzzles • Level {currentLevel}</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pointer-events-none shrink-0 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
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
                            className={`${getAccuracy() >= 80 ? 'text-green-500' : getAccuracy() >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                            strokeWidth="3" strokeDasharray="100" strokeDashoffset={`${100 - getAccuracy()}`} strokeLinecap="round" stroke="currentColor" fill="none" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-lg sm:text-xl font-black ${getAccuracy() >= 80 ? 'text-green-400' : getAccuracy() >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{getAccuracy()}%</span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Solved</div>
                        <div className="text-lg sm:text-xl font-black text-emerald-400">{totalSolved}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Combo</div>
                        <div className="text-lg sm:text-xl font-black text-yellow-400">{bestComboRef.current}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Mistakes</div>
                        <div className="text-lg sm:text-xl font-black text-red-400">{totalAttempts - totalSolved}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 shrink-0 rounded-b-3xl">
                    <button onClick={handleStartGame} className="flex-1 py-3 sm:py-4 bg-purple-600 text-white rounded-xl font-black tracking-wide hover:bg-purple-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                    </button>
                    <button onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onClick={handleExit} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DRILL RULES & SCORING */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-purple-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Rules & Scoring Economy</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="indigo" text="Solve Logic Perfectly" highlight="+15 PTS | +10s" result="Increases Difficulty" />
                  <RuleItem num="2" color="purple" text="Adaptive Puzzles" highlight="Scales up to 15 Levels" result="Dynamic Generation" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Wrong Answer Penalty" highlight="-10 PTS | -5s" result="Decreases Difficulty" />
                  <RuleItem num="4" color="green" text="Time Limit Capped" highlight="Max 60 Seconds" result="Endless Survival" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* ABOUT THIS DRILL */}
        {/* ============================================================ */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this logic puzzles drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About This Extreme Logic Puzzles Drill</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This free logic puzzles drill tests and improves your problem-solving skills with unique puzzle types that scale from basic arithmetic up to extreme high-IQ logical deduction. The dynamic scaling engine adjusts the complexity of the math, the depth of the nested patterns, and the obscurity of the rulesets based on your persistent level progression and in-session accuracy.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Competitive exam aspirants (SAT, GRE, GMAT, CAT, UPSC), mathematical puzzle enthusiasts, and anyone wanting elite-level cognitive conditioning.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Deep pattern recognition, mathematical modeling, abstract deduction, working memory, and multi-step computational speed.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
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
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> Solving a puzzle correctly rewards you with <span className="text-green-400 font-bold">+15 PTS and +10s Time</span>. Submitting a wrong answer deducts <span className="text-red-400 font-bold">-10 PTS and -5s Time</span>.</li>
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
                      <p className="text-sm font-bold text-gray-200 tracking-tight">How does the extreme difficulty scale work?</p>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Your scores accumulate persistently to unlock higher levels. Early levels deal with simple additions and quadratic basics. As you approach Level 10 and beyond, you will encounter interleaved sequences, cyclic modulo logic, combinatorics, cubic variables, and multi-variable algebraic deductions. The in-session difficulty also drops temporarily if you make a mistake to help you recover.</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-200 tracking-tight">Is there a penalty for an incorrect input?</p>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Yes. Accuracy is critical. A single incorrect answer deducts 10 points and 5 seconds from your timer, breaking your combo and pushing you closer to a Game Over.</p>
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
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600"></div>
              <h2 className="text-xl font-bold text-white">Explore Related Free Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/cognitive/problem-solving/sudoku" title="Sudoku" desc="Classic number placement logic puzzle." color="purple" icon={<Puzzle className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/problem-solving/tower-of-hanoi" title="Tower of Hanoi" desc="Strategic planning and sequential thinking." color="blue" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/math-speed/mental-math" title="Mental Math" desc="Advanced mental calculation challenges." color="orange" icon={<Calculator className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/comprehension/inference-drill" title="Inference Analytics" desc="Critical reasoning passages & rationales." color="cyan" icon={<Brain className="w-4 h-4" />} />
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
                    <li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">Cognitive</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li>
                    <li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">Academic</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">Visual & Motor</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li>
                    <li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target Tracking</Link></li>
                    <li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-wide">More Categories</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li>
                    <li><Link href="/drills/cognitive" className="hover:text-white transition-colors">Cognitive</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-600/20">
                    <Target className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-white font-bold text-xl tracking-tight">SkillDrills</span>
                </div>
                <p className="text-sm mb-3 font-medium">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-8 text-gray-500">
                  Free online logic puzzles drill with uniquely generated sequences, algebra, combinatorics, and number manipulation. Perfect for SAT, GRE, GMAT, and overall brain training.
                </p>
                
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <button onClick={shareDrillLink} className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Share this drill">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Subscribe on YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Follow on Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Follow on Twitter X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Follow on Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Follow on Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
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
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-1.5 sm:p-3 text-center flex flex-col justify-center h-full transition-all duration-300 pointer-events-none">
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
    purple: 'bg-purple-600 text-purple-300 border-purple-500', 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500', 
    red: 'bg-red-600 text-red-300 border-red-500',
    green: 'bg-green-600 text-green-300 border-green-500',
    indigo: 'bg-indigo-600 text-indigo-300 border-indigo-500'
  };
  const colors = colorMap[color] || 'bg-gray-600 text-gray-300 border-gray-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-gray-800 shadow-sm">
      <div className={`w-8 h-8 rounded-xl ${bg} border border-t-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0`}>{num}</div>
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
    emerald: 'from-emerald-500 to-green-500',
    rose: 'from-rose-500 to-pink-500',
    teal: 'from-teal-500 to-emerald-500',
    indigo: 'from-indigo-500 to-blue-500',
    red: 'from-red-500 to-rose-500'
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