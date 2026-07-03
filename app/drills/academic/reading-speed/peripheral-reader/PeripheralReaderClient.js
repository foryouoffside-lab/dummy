'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { 
  Eye, Volume2, VolumeX, Maximize2, Minimize2, Timer,
  Target, Zap, Trophy, ChevronUp, ChevronDown, MoveLeft, MoveRight, GitBranch,
  BarChart3, Info, CheckCircle2, XCircle, RefreshCw,
  GraduationCap, TrendingUp, ArrowRight, Share2, LogOut, Lightbulb,
  BookOpen, Brain, Code2, Hash, Keyboard ,ChevronRight ,Play
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
      try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  playCorrect() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, this.ctx.currentTime);
      osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.25);
    } catch(e) {}
  }

  playWrong() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }

  playCombo() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1108.73, this.ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.35);
    } catch(e) {}
  }

  playComplete() {
    if (!this.enabled || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.12 + 0.2);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.12);
        osc.stop(this.ctx.currentTime + i * 0.12 + 0.2);
      });
    } catch(e) {}
  }

  setEnabled(status) { this.enabled = status; }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

const WORD_BANK = [
  'DATA', 'CORE', 'VIEW', 'FAST', 'SPAN', 'LINK', 'NODE', 'FLOW',
  'READ', 'MIND', 'EDGE', 'GRID', 'ZONE', 'PEAK', 'BOLD', 'TRUE',
  'CODE', 'SYNC', 'WAVE', 'PATH', 'VOID', 'RISE', 'DEEP', 'HIGH',
  'MOVE', 'JUMP', 'RACE', 'TIME', 'FOCUS', 'SHARP', 'QUICK', 'CLEAR',
  'BYTE', 'CHIP', 'DASH', 'ECHO', 'FLEX', 'GLOW', 'HASH', 'IRIS',
  'MOCK', 'VARY', 'ZOOM', 'WIND', 'FIRE', 'GULF', 'STAR', 'MOON'
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function PeripheralReaderClient() {
  // === UI State ===
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // === Game State ===
  const [gameState, setGameState] = useState('start');
  const [difficulty, setDifficulty] = useState('BOTH');
  const [speed, setSpeed] = useState(500);
  const [wordPair, setWordPair] = useState({ left: 'READY', right: 'START' });
  const [score, setScore] = useState(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  
  // === Interaction State ===
  const [showInput, setShowInput] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [usedWords, setUsedWords] = useState(new Set());
  const [currentTargetSide, setCurrentTargetSide] = useState(null);
  const [currentTargetWord, setCurrentTargetWord] = useState('');
  const [isNewBest, setIsNewBest] = useState(false);

  const STORAGE_BEST_KEY = 'peripheralReaderDrillBestScore_v3';

  // === Refs ===
  const globalTimerRef = useRef(null);
  const flashTimerRef = useRef(null);
  const answerTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const localTimeRef = useRef(60.0);
  
  const isGameRunningRef = useRef(false);
  const isWaitingForAnswerRef = useRef(false);
  const flashesBeforeQuestionRef = useRef(0);
  const targetFlashesBeforeQuestion = useRef(5);
  const gameStateRef = useRef('start');
  const mountedRef = useRef(false);

  useEffect(() => { 
    setIsClient(true); mountedRef.current = true;
    try { const s = localStorage.getItem(STORAGE_BEST_KEY); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {}
    const t = setTimeout(() => { if (mountedRef.current) setLoading(false); }, 200);
    return () => { mountedRef.current = false; clearTimeout(t); };
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { if (audioSynth) audioSynth.setEnabled(soundEnabled); }, [soundEnabled]);

  // Mobile Guard & Landscape Detection
  useEffect(() => {
    const checkOrientationAndSize = () => {
      if (typeof window === 'undefined') return;
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '') || window.innerWidth < 768;
      
      if (!isMobile) { 
        setShowRotateWarning(false); 
        return; 
      }
      
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
          setShowRotateWarning(true);
      } else {
          setShowRotateWarning(false);
      }
    };
    
    checkOrientationAndSize();
    window.addEventListener('resize', checkOrientationAndSize);
    window.addEventListener('orientationchange', checkOrientationAndSize);
    return () => { 
      window.removeEventListener('resize', checkOrientationAndSize); 
      window.removeEventListener('orientationchange', checkOrientationAndSize); 
    };
  }, []);

  useEffect(() => { 
    const h = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', h); 
    return () => document.removeEventListener('fullscreenchange', h); 
  }, []);

  const enterFullscreen = useCallback(async () => { 
    try { 
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      }
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
    if (isFullscreen) await exitFullscreen(); 
    else await enterFullscreen(); 
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  const showFeedbackMsg = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { if (mountedRef.current) { setFeedback(''); setFeedbackType(''); } }, 800);
  }, []);

  const handleGameOver = useCallback(() => {
    if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    if (flashTimerRef.current) clearInterval(flashTimerRef.current);
    if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
    
    const endScore = scoreRef.current;
    if (endScore > bestScore && endScore > 0) {
      setIsNewBest(true);
      setBestScore(endScore);
      try { localStorage.setItem(STORAGE_BEST_KEY, endScore.toString()); } catch (e) {}
    }
    
    if (audioSynth) audioSynth.playComplete();
    setGameState('gameOver'); 
    gameStateRef.current = 'gameOver';
    setShowInput(false);
    isGameRunningRef.current = false;
    isWaitingForAnswerRef.current = false;
    exitFullscreen();
  }, [bestScore, exitFullscreen]);

  const generateWordPair = useCallback(() => {
    if (gameStateRef.current !== 'playing' || isWaitingForAnswerRef.current) return;
    
    const availableWords = WORD_BANK.filter(w => !usedWords.has(w));
    let left, right;
    
    if (availableWords.length >= 2) {
      const sh = [...availableWords].sort(() => Math.random() - 0.5);
      if (difficulty === 'LEFT') { left = sh[0]; right = '----'; setUsedWords(prev => new Set([...prev, left])); }
      else if (difficulty === 'RIGHT') { left = '----'; right = sh[0]; setUsedWords(prev => new Set([...prev, right])); }
      else { left = sh[0]; right = sh[1]; setUsedWords(prev => new Set([...prev, left, right])); }
    } else {
      setUsedWords(new Set());
      const sh = [...WORD_BANK].sort(() => Math.random() - 0.5);
      if (difficulty === 'LEFT') { left = sh[0]; right = '----'; setUsedWords(new Set([left])); }
      else if (difficulty === 'RIGHT') { left = '----'; right = sh[0]; setUsedWords(new Set([right])); }
      else { left = sh[0]; right = sh[1]; setUsedWords(new Set([left, right])); }
    }
    
    setWordPair({ left, right });
    flashesBeforeQuestionRef.current++;
    
    if (flashesBeforeQuestionRef.current >= targetFlashesBeforeQuestion.current) {
      flashesBeforeQuestionRef.current = 0;
      targetFlashesBeforeQuestion.current = Math.floor(Math.random() * 6) + 5; // Next question in 5-10 flashes
      askRandomQuestion();
    }
  }, [usedWords, difficulty]);

  const resetAfterAnswer = useCallback(() => {
    setShowInput(false); setUserAnswer('');
    setCurrentTargetSide(null); setCurrentTargetWord('');
    isWaitingForAnswerRef.current = false;
    
    if (flashTimerRef.current) clearInterval(flashTimerRef.current);
    flashTimerRef.current = setInterval(() => {
      if (gameStateRef.current === 'playing' && !isWaitingForAnswerRef.current) {
        generateWordPair();
      }
    }, speed);
  }, [speed, generateWordPair]);

  const askRandomQuestion = useCallback(() => {
    if (isWaitingForAnswerRef.current || gameStateRef.current !== 'playing') return;
    
    isWaitingForAnswerRef.current = true;
    if (flashTimerRef.current) { clearInterval(flashTimerRef.current); flashTimerRef.current = null; }
    
    let targetSide;
    if (difficulty === 'LEFT') targetSide = 'left';
    else if (difficulty === 'RIGHT') targetSide = 'right';
    else targetSide = Math.random() < 0.5 ? 'left' : 'right';
    
    const targetWord = targetSide === 'left' ? wordPair.left : wordPair.right;
    setCurrentTargetSide(targetSide);
    setCurrentTargetWord(targetWord);
    setShowInput(true);
    
    if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
    answerTimeoutRef.current = setTimeout(() => {
      if (isWaitingForAnswerRef.current && gameStateRef.current === 'playing') {
        const isBoth = difficulty === 'BOTH';
        const penaltyPts = isBoth ? 10 : 5;
        const timePenalty = isBoth ? 5 : 2;

        scoreRef.current = Math.max(0, scoreRef.current - penaltyPts);
        setScore(scoreRef.current);
        
        localTimeRef.current = Math.max(0, localTimeRef.current - timePenalty);
        setLocalTimeRemaining(localTimeRef.current);
        
        setSpeed(s => Math.min(1000, s + 50)); // Decrease difficulty

        setIncorrectCount(prev => prev + 1);
        comboRef.current = 0; setCombo(0);
        
        if (audioSynth) audioSynth.playWrong();
        showFeedbackMsg(`⏰ TIMEOUT! -${penaltyPts} PTS | -${timePenalty}s`, 'error');
        
        if (localTimeRef.current <= 0) {
          handleGameOver();
        } else {
          setTimeout(() => resetAfterAnswer(), 1000);
        }
      }
    }, 4000); // Allow 4 seconds to type the word
    
    setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 100);
  }, [difficulty, wordPair, showFeedbackMsg, resetAfterAnswer, handleGameOver]);

  const handleSubmitAnswer = useCallback(() => {
    if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
    
    const answer = userAnswer.toUpperCase().trim();
    const correct = answer === currentTargetWord;
    const isBoth = difficulty === 'BOTH';
    
    const pts = isBoth ? 30 : 10;
    const timeBonus = isBoth ? 15 : 5;
    const penaltyPts = isBoth ? 10 : 5;
    const timePenalty = isBoth ? 5 : 2;
    
    if (correct) {
      scoreRef.current += pts; 
      setScore(scoreRef.current);
      
      localTimeRef.current = Math.min(60.0, localTimeRef.current + timeBonus);
      setLocalTimeRemaining(localTimeRef.current);
      
      setSpeed(s => Math.max(100, s - 25)); // Increase difficulty
      
      setCorrectCount(prev => prev + 1);
      comboRef.current++; setCombo(comboRef.current);
      
      if (comboRef.current % 3 === 0 && comboRef.current > 0) {
        if (audioSynth) audioSynth.playCombo();
        showFeedbackMsg(`🔥 ${comboRef.current}x Combo! +${pts} PTS | +${timeBonus}s`, 'success');
      } else {
        if (audioSynth) audioSynth.playCorrect();
        showFeedbackMsg(`✓ CORRECT! +${pts} PTS | +${timeBonus}s`, 'success');
      }
      setTimeout(() => resetAfterAnswer(), 600);
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - penaltyPts); 
      setScore(scoreRef.current);
      
      localTimeRef.current = Math.max(0, localTimeRef.current - timePenalty);
      setLocalTimeRemaining(localTimeRef.current);
      
      setSpeed(s => Math.min(1000, s + 50)); // Decrease difficulty
      
      setIncorrectCount(prev => prev + 1);
      comboRef.current = 0; setCombo(0);
      
      if (audioSynth) audioSynth.playWrong();
      showFeedbackMsg(`✗ INCORRECT! -${penaltyPts} PTS | -${timePenalty}s`, 'error');
      
      if (localTimeRef.current <= 0) {
        handleGameOver();
      } else {
        setTimeout(() => resetAfterAnswer(), 1200);
      }
    }
  }, [userAnswer, currentTargetWord, difficulty, showFeedbackMsg, resetAfterAnswer, handleGameOver]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && userAnswer.trim()) handleSubmitAnswer();
  }, [userAnswer, handleSubmitAnswer]);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    await enterFullscreen();
    
    if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    if (flashTimerRef.current) clearInterval(flashTimerRef.current);
    if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
    
    setGameState('playing'); 
    gameStateRef.current = 'playing';
    
    scoreRef.current = 0; 
    comboRef.current = 0;
    localTimeRef.current = 60.0;
    
    setScore(0); 
    setLocalTimeRemaining(60.0); 
    setCorrectCount(0); 
    setIncorrectCount(0);
    setCombo(0); 
    setShowInput(false); 
    setUserAnswer('');
    setFeedback(''); 
    setUsedWords(new Set());
    setCurrentTargetSide(null); 
    setCurrentTargetWord(''); 
    setIsNewBest(false);
    
    isGameRunningRef.current = false; 
    isWaitingForAnswerRef.current = false;
    flashesBeforeQuestionRef.current = 0;
    targetFlashesBeforeQuestion.current = Math.floor(Math.random() * 6) + 5;
    
    const sh = [...WORD_BANK].sort(() => Math.random() - 0.5);
    if (difficulty === 'LEFT') { setWordPair({ left: sh[0], right: '----' }); setUsedWords(new Set([sh[0]])); }
    else if (difficulty === 'RIGHT') { setWordPair({ left: '----', right: sh[0] }); setUsedWords(new Set([sh[0]])); }
    else { setWordPair({ left: sh[0], right: sh[1] }); setUsedWords(new Set([sh[0], sh[1]])); }
  }, [difficulty, enterFullscreen]);

  const resetGame = useCallback(() => {
    if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    if (flashTimerRef.current) clearInterval(flashTimerRef.current);
    if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    setGameState('start'); 
    gameStateRef.current = 'start';
    
    isGameRunningRef.current = false; 
    isWaitingForAnswerRef.current = false;
    setShowInput(false); 
    setFeedback(''); 
    setFeedbackType('');
    setIsNewBest(false);
  }, []);

  const handleExit = async () => {
    await exitFullscreen();
    resetGame();
  };

  // Game loop
  useEffect(() => {
    if (gameState === 'playing' && !isGameRunningRef.current) {
      isGameRunningRef.current = true;
      isWaitingForAnswerRef.current = false;
      flashesBeforeQuestionRef.current = 0;
      targetFlashesBeforeQuestion.current = Math.floor(Math.random() * 6) + 5;
      
      if (flashTimerRef.current) clearInterval(flashTimerRef.current);
      flashTimerRef.current = setInterval(() => {
        if (gameStateRef.current === 'playing' && !isWaitingForAnswerRef.current) generateWordPair();
      }, speed);
      
      if (globalTimerRef.current) clearInterval(globalTimerRef.current);
      globalTimerRef.current = setInterval(() => {
        localTimeRef.current -= 0.1;
        if (localTimeRef.current <= 0) {
          localTimeRef.current = 0;
          setLocalTimeRemaining(0);
          handleGameOver();
        } else {
          setLocalTimeRemaining(localTimeRef.current);
        }
      }, 100);
    }
    return () => {
      if (gameState !== 'playing' && isGameRunningRef.current) {
        if (flashTimerRef.current) clearInterval(flashTimerRef.current);
        if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
        if (globalTimerRef.current) clearInterval(globalTimerRef.current);
        isGameRunningRef.current = false;
        isWaitingForAnswerRef.current = false;
      }
    };
  }, [gameState, speed, generateWordPair, handleGameOver]);

  const handleSpeedUp = useCallback(() => setSpeed(s => Math.max(100, s - 50)), []);
  const handleSpeedDown = useCallback(() => setSpeed(s => Math.min(1000, s + 50)), []);

  const getAccuracy = useCallback(() => {
    const t = correctCount + incorrectCount;
    return t > 0 ? Math.round((correctCount / t) * 100) : 100;
  }, [correctCount, incorrectCount]);

  const getDifficultyGradient = useCallback(() => {
    if (difficulty === 'LEFT') return 'from-blue-600 to-cyan-600';
    if (difficulty === 'RIGHT') return 'from-emerald-600 to-green-600';
    return 'from-purple-600 to-pink-600';
  }, [difficulty]);

  useEffect(() => { return () => {
    if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    if (flashTimerRef.current) clearInterval(flashTimerRef.current);
    if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
  }; }, []);

  const shareDrillLink = async () => {
    const url = 'https://skilldrills.online/drills/academic/reading-speed/peripheral-reader';
    if (navigator.share) {
      try { await navigator.share({ title: 'Peripheral Vision Training | SkillDrills', text: 'Expand visual span for faster reading. Free!', url }); } catch (e) {}
    } else {
      navigator.clipboard.writeText(url).then(() => showFeedbackMsg('Link copied!', 'success')).catch(() => {});
    }
  };

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(147,51,234,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - getAccuracy();

  return (
    <div className="min-h-screen select-none bg-[#0a0a0a] text-white font-sans" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-4" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/drills/academic" className="text-gray-500 hover:text-gray-300 transition-colors">Academic</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-gray-500">Reading Speed</li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-purple-400 font-medium">Peripheral Vision</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${getDifficultyGradient()} shadow-[0_0_20px_rgba(147,51,234,0.3)]`}>
              <Eye className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Peripheral Vision Training</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Extrafoveal Processing • Focus Hold • Reaction Time</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {gameState !== 'start' && (
              <button onClick={resetGame} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset"><RefreshCw className="w-5 h-5" /></button>
            )}
            <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Fullscreen">{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-purple-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
          <StatCard icon={<TrendingUp className="text-orange-400" />} value={speed} label="Speed" unit="ms" />
          <StatCard icon={<Zap className="text-yellow-400" />} value={combo} label="Streak" />
          <StatCard icon={<CheckCircle2 className="text-emerald-400" />} value={correctCount} label="Correct" />
          <StatCard icon={<XCircle className="text-red-400" />} value={incorrectCount} label="Misses" />
          <StatCard icon={<BarChart3 className="text-blue-400" />} value={getAccuracy()} label="Accuracy" unit="%" />
          <StatCard icon={<Trophy className="text-pink-400" />} value={Math.max(bestScore, score)} label="Best" />
        </div>

        {/* Feedback */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {feedback && (
            <div className={`px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl transition-all duration-200 ${
              feedbackType === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'
            }`}>{feedback}</div>
          )}
        </div>

        {/* Game Container */}
        <div ref={containerRef} 
          className={`relative overflow-hidden flex flex-col transition-all duration-100 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-[#0a0a0a]' 
              : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[65vh] md:min-h-[550px] md:aspect-video'
          }`}
          style={{ backgroundColor: '#0a0a0a' }}>
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-purple-900/10" />

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
                <RefreshCw className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Rotate Device</h3>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">Please rotate to landscape mode for the best training experience.</p>
            </div>
          )}

          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-[60] flex gap-2">
              <button onClick={resetGame} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            </div>
          )}

          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 h-full w-full relative overflow-y-auto overflow-x-hidden">
            
            {/* START SCREEN */}
            {gameState === 'start' && !showRotateWarning && (
              <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-sm overflow-y-auto flex flex-col p-4">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-auto my-auto border border-gray-700 bg-gray-900 shadow-2xl flex flex-col shrink-0">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${getDifficultyGradient()} rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(147,51,234,0.3)] shrink-0`}>
                    <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black mb-2 pointer-events-none tracking-tight">Peripheral Vision</h2>
                  <p className="text-xs sm:text-base mb-6 text-gray-400 leading-relaxed pointer-events-none">
                    Fixate on the center. Read extrafoveally.
                  </p>
                  
                  {/* Mode & Speed Controls inside Start Modal */}
                  <div className="flex flex-col gap-3 mb-6 p-4 rounded-xl bg-black/40 border border-gray-700">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Select Mode & Speed</span>
                    <div className="flex rounded-xl bg-gray-800 p-1" role="radiogroup" aria-label="Training mode">
                      {[{ id: 'LEFT', label: 'Left' }, { id: 'RIGHT', label: 'Right' }, { id: 'BOTH', label: 'Both' }].map(d => (
                        <button key={d.id} onClick={() => setDifficulty(d.id)} role="radio" aria-checked={difficulty === d.id}
                          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                            difficulty === d.id
                              ? d.id === 'LEFT' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                                : d.id === 'RIGHT' ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg'
                                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                              : 'text-gray-400 hover:text-gray-200'
                          }`}>
                          {d.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <button onClick={handleSpeedDown} className="p-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all active:scale-95 border border-gray-600"><ChevronDown className="w-4 h-4" /></button>
                      <div className="flex flex-col items-center min-w-[70px]">
                        <span className="text-xl font-black text-white leading-none">{speed}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">MS</span>
                      </div>
                      <button onClick={handleSpeedUp} className="p-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all active:scale-95 border border-gray-600"><ChevronUp className="w-4 h-4" /></button>
                    </div>
                  </div>

                  <button onClick={startGame} className={`mt-auto w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r ${getDifficultyGradient()} text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(147,51,234,0.3)] focus:outline-none shrink-0`}>
                    <Play className="w-5 h-5 fill-white" />
                    START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* PLAYING STATE */}
            {gameState === 'playing' && (
              <div className="relative w-full h-full flex flex-col items-center justify-center animate-in fade-in duration-300">
                {!showInput ? (
                  <>
                    {/* Focal Crosshair */}
                    <div className="absolute z-10 w-12 h-12 flex items-center justify-center pointer-events-none" aria-hidden="true">
                      <div className="absolute w-full h-0.5 bg-gray-600" />
                      <div className="absolute h-full w-0.5 bg-gray-600" />
                      <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${difficulty === 'LEFT' ? 'bg-cyan-500' : difficulty === 'RIGHT' ? 'bg-emerald-500' : 'bg-purple-500'}`} />
                    </div>
                    
                    <div className="absolute inset-x-0 flex justify-between items-center px-4 sm:px-12 md:px-24">
                      <div className={`text-4xl sm:text-5xl md:text-7xl font-black tracking-tight transition-opacity duration-100 ${difficulty === 'LEFT' || difficulty === 'BOTH' ? 'text-white' : 'opacity-0'}`}>
                        {difficulty === 'RIGHT' ? '' : wordPair.left}
                      </div>
                      <div className={`text-4xl sm:text-5xl md:text-7xl font-black tracking-tight transition-opacity duration-100 ${difficulty === 'RIGHT' || difficulty === 'BOTH' ? 'text-white' : 'opacity-0'}`}>
                        {difficulty === 'LEFT' ? '' : wordPair.right}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center w-full max-w-lg px-4 flex flex-col items-center animate-in zoom-in-95 duration-200">
                    <div className="mb-6 p-5 w-full rounded-2xl bg-gray-800/90 border border-gray-700 shadow-xl backdrop-blur-sm">
                      <p className={`text-lg sm:text-xl font-bold mb-2 ${currentTargetSide === 'left' ? 'text-blue-400' : 'text-emerald-400'}`}>
                        What word was on the <span className="uppercase underline font-black">{currentTargetSide}</span> side?
                      </p>
                    </div>
                    <input 
                      ref={inputRef} 
                      type="text" 
                      value={userAnswer} 
                      onChange={(e) => setUserAnswer(e.target.value)} 
                      onKeyPress={handleKeyPress}
                      className="w-full p-4 sm:p-5 rounded-2xl text-center text-2xl sm:text-3xl font-black outline-none border-2 transition-all bg-black border-gray-700 text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 uppercase tracking-widest shadow-lg"
                      placeholder={`TYPE ${currentTargetSide.toUpperCase()} WORD`} 
                      autoFocus 
                      spellCheck={false}
                      autoCorrect="off"
                      autoComplete="off"
                    />
                    <button 
                      onClick={handleSubmitAnswer} 
                      disabled={!userAnswer.trim()}
                      className={`w-full mt-5 px-6 py-4 bg-gradient-to-r ${getDifficultyGradient()} text-white rounded-xl font-black hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg`}>
                      SUBMIT ANSWER
                    </button>
                    <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mt-4">Answer fast before timeout</p>
                  </div>
                )}
              </div>
            )}

            {/* END SCREEN (GAME OVER) */}
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 z-[70] bg-black/95 animate-in fade-in duration-300 overflow-y-auto flex flex-col p-4">
                <div className="rounded-3xl max-w-md w-full mx-auto my-auto shadow-2xl border border-gray-800 bg-gray-950 flex flex-col shrink-0">
                  
                  <div className={`bg-gradient-to-br ${getDifficultyGradient()} p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl`}>
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-black/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Time's Up!</h2>
                      <p className="text-white/80 font-medium text-xs sm:text-sm">Peripheral Vision • {difficulty} Mode</p>
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
                            className={`${getAccuracy() >= 80 ? 'text-green-500' : getAccuracy() >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                            strokeWidth="3" strokeDasharray="100" strokeDashoffset={`${100 - getAccuracy()}`} strokeLinecap="round" stroke="currentColor" fill="none" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-base sm:text-xl font-black ${getAccuracy() >= 80 ? 'text-green-400' : getAccuracy() >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{getAccuracy()}%</span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <EndStat label="Correct" value={correctCount} color="emerald" />
                      <EndStat label="Misses" value={incorrectCount} color="red" />
                      <EndStat label="Max Streak" value={`${combo}x`} color="orange" />
                      <EndStat label="Final Speed" value={`${speed}ms`} color="blue" />
                      <EndStat label="Mode" value={difficulty} color="purple" />
                      <EndStat label="Best" value={bestScore} color="yellow" />
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                    <button onClick={startGame} className={`flex-1 py-3 sm:py-4 bg-gradient-to-r ${getDifficultyGradient()} text-white rounded-xl font-black tracking-wide hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.4)] text-sm sm:text-base`}>
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

        {/* Instructions / Rules */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-purple-400" /><h2 className="font-bold text-white text-lg tracking-tight">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="blue" text="Single Side (L/R) Correct" highlight="+10 PTS | +5s" result="Increases Speed" />
                  <RuleItem color="pink" text="Both Sides Correct" highlight="+30 PTS | +15s" result="Increases Speed" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="red" text="Wrong / Timeout" highlight="-5 to -10 PTS | -2 to -5s" result="Decreases Speed" />
                  <RuleItem color="orange" text="Time Limit Capped" highlight="Max 60 Seconds" result="Survival Mode" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT SECTION */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Peripheral Vision Training</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  When reading, the human eye processes a sharp central focal point (foveal vision) alongside a blurrier surrounding area (extrafoveal vision). By training your brain to accurately identify words in your peripheral field, you can dramatically expand your visual span. This allows you to absorb entire phrases in a single eye fixation, vastly increasing reading speed and overall comprehension.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <InfoCard icon={<Eye className="w-4 h-4 text-white" />} title="Who It's For" desc="Speed readers, competitive test-takers (LSAT, GMAT), and professionals handling large document loads." color="purple" />
                  <InfoCard icon={<Brain className="w-4 h-4 text-white" />} title="Skills Optimized" desc="Visual span width, extrafoveal word recognition, and saccadic efficiency." color="green" />
                  <InfoCard icon={<BarChart3 className="w-4 h-4 text-white" />} title="Metrics Tracked" desc="Net Score, Accuracy, Max Speed (ms) reached, and Combo Streaks." color="blue" />
                </div>

                {/* How to Practice Effectively Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Lock the Center:</strong> Do not let your eyes dart left or right to read the words. Keep your pupils locked dead center on the pulsing dot.</li>
                    <li><strong className="text-gray-200">Embrace the Blur:</strong> It will feel uncomfortable initially. Trust your brain's subconscious pattern recognition to decode the blurry words on the edges.</li>
                    <li><strong className="text-gray-200">Scale the Difficulty:</strong> Start with single-sided training (Left or Right) before attempting "Both." The "Both" mode yields massive points (+30) but requires significantly higher cognitive load.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> You must answer correctly to add time (+5s or +15s) to your clock. Wrong answers or timeouts will penalize both your score and your remaining time.</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <FAQItem question="Why does the speed change automatically?" answer="This is an adaptive engine. Every correct answer increases the difficulty by reducing the flash time (speeding it up). Answering incorrectly slows it back down, ensuring you are constantly pushed to the absolute edge of your capability." />
                    <FAQItem question="Why do I lose points if I don't answer?" answer="The drill tests rapid recall. When the prompt asks for the word, you have only a few seconds to type it. Hesitation indicates weak encoding, resulting in a timeout penalty (-5 PTS, -2s)." />
                    <FAQItem question="Does it automatically go fullscreen?" answer="Yes! Clicking START DRILL automatically enters fullscreen mode to eliminate visual distractions and guarantee the words map correctly to your peripheral field." />
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-purple-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/academic/reading-speed/speed-reader" title="Speed Reader" desc="Column scanning for vertical reading efficiency." color="emerald" icon={<BookOpen className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/reading-speed/rsvp-reader" title="RSVP Speed Reader" desc="Rapid single word focal presentation." color="rose" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/comprehension/reading-comprehension" title="Reading Comprehension" desc="Passages with scored analytical quizzes." color="blue" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/reaction-speed/light-reaction" title="Reaction Time Test" desc="Raw millisecond reaction speed mapping." color="indigo" icon={<Timer className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FOOTER */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/comprehension/reading-comprehension" className="hover:text-purple-400 transition-colors">Reading Comprehension</Link></li>
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-purple-400 transition-colors">Typing Speed</Link></li>
                    <li><Link href="/drills/academic" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-purple-400 transition-colors">Logic Puzzles</Link></li>
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-purple-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
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
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Visual Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-purple-400 transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-purple-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory" className="hover:text-purple-400 transition-colors">Memory (15)</Link></li>
                    <li><Link href="/drills/visual-tracking" className="hover:text-purple-400 transition-colors">Tracking (25 drills)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-purple-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500/25 to-pink-500/25 border border-purple-500/30 rounded-lg flex items-center justify-center">
                    <Eye className="w-3.5 h-3.5 text-purple-400" />
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

// ============================================================
// HELPER COMPONENTS
// ============================================================

function StatCard({ icon, value, label, unit = '' }) {
  return (
    <div className="group rounded-xl border border-slate-900 bg-slate-950/40 p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-slate-800 backdrop-blur-sm pointer-events-none">
      <div className="mb-0.5 flex justify-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{icon}</div>
      <p className="text-xs sm:text-sm md:text-base font-extrabold tracking-tight truncate text-white">
        {value}<span className="text-[10px] sm:text-xs font-semibold ml-0.5 opacity-80 text-slate-400">{unit}</span>
      </p>
      <p className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 truncate">{label}</p>
    </div>
  );
}

function EndStat({ label, value, color }) {
  const colors = {
    emerald: 'text-emerald-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400',
  };
  return (
    <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">{label}</div>
      <div className={`text-base sm:text-xl font-black ${colors[color] || 'text-white'}`}>{value}</div>
    </div>
  );
}

function InfoCard({ icon, title, desc, color }) {
  const bgColors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600'
  };
  return (
    <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-8 h-8 rounded-lg ${bgColors[color]} flex items-center justify-center`}>{icon}</div>
        <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
      </div>
      <p className="text-xs leading-relaxed text-gray-400">{desc}</p>
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
    blue: 'bg-blue-600 text-blue-300 border-blue-500'
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

function FAQItem({ question, answer }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-gray-200 tracking-tight">{question}</h4>
      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{answer}</p>
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
    emerald: 'from-emerald-500 to-green-500',
    violet: 'from-violet-500 to-purple-500',
    indigo: 'from-indigo-500 to-blue-500'
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.1)] hover:-translate-y-1 hover:border-purple-500/50`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-purple-500 to-pink-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050508] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-purple-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-purple-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}