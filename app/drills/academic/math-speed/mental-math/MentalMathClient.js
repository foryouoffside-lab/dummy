'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Calculator, RefreshCw, 
  Users, Share2, LogOut,
  GraduationCap, Lightbulb, TrendingUp, ArrowRight,
  Brain, Keyboard, CheckCircle, XCircle,
  ChevronRight, Play, AlertCircle,
  Hash, Compass, Code2, BookOpen
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

  playSoothingPop() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
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
      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }

  playComboSound() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
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
const STORAGE_KEY = 'skilldrills_mental_math_v5';

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

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ bestScore: data.bestScore }));
  } catch (e) {}
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function MentalMathClient() {
  
  // === UI State ===
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // === Game State ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeouts, setTimeouts] = useState(0);
  const [combo, setCombo] = useState(0);
  const [currentDifficultyLvl, setCurrentDifficultyLvl] = useState(1);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [flashBg, setFlashBg] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [canSelect, setCanSelect] = useState(true);

  // === Custom Decoupled Timer ===
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // === Absolute Truth Refs (Zero-latency mechanics) ===
  const mountedRef = useRef(false);
  const gameContainerRef = useRef(null);
  
  const scoreRef = useRef(0);
  const correctRef = useRef(0);
  const mistakesRef = useRef(0);
  const timeoutsRef = useRef(0);
  const comboRef = useRef(0);
  const localTimeRef = useRef(60);

  // Difficulty Scaling Refs
  const difficultyRef = useRef(1);
  const usedQuestionsRef = useRef(new Set());
  
  const problemTimerRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const clickCooldownRef = useRef(false);
  const transitionTimerRef = useRef(null);
  
  const gameStateRef = useRef('start');

  // Sync state for UI rendering
  const syncToUI = useCallback(() => {
    setScore(scoreRef.current);
    setCorrectCount(correctRef.current);
    setMistakes(mistakesRef.current);
    setTimeouts(timeoutsRef.current);
    setCombo(comboRef.current);
    setCurrentDifficultyLvl(difficultyRef.current);
  }, []);

  // === Game Engine ===
  const engine = useGameEngine({
    category: 'academic',
    drillId: 'mental-math',
    drillName: 'Mental Math',
    totalGameTime: 9999, // Overridden by custom timer
    lives: 9999, 
    infiniteLives: true, 
    sharePath: 'drills/academic/math-speed/mental-math',
  });

  const engineRef = useRef(engine);

  useEffect(() => {
    engineRef.current = engine;
    gameStateRef.current = engine.gameState;
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
      if (problemTimerRef.current) clearTimeout(problemTimerRef.current);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  // Audio Sync
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Screen Guard
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsHandler);
    
    return () => {
      document.removeEventListener('fullscreenchange', fsHandler);
    };
  }, []);

  // === Custom Precision Clock ===
  useEffect(() => {
    if (gameStateRef.current !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }
    
    if (!isTimeUp && localTimeRef.current === 60 && localTimeRemaining === 60) {
      // Init
    } else if (!isTimeUp && localTimeRef.current <= 0) {
      localTimeRef.current = 60;
      setLocalTimeRemaining(60);
    }

    timerIntervalRef.current = setInterval(() => {
      localTimeRef.current -= 0.5;
      
      if (localTimeRef.current <= 0) {
        localTimeRef.current = 0;
        setLocalTimeRemaining(0);
        clearInterval(timerIntervalRef.current);
        setIsTimeUp(true);
        gameStateRef.current = 'ended';
        
        // Clean up active problem timers to stop background execution
        if (problemTimerRef.current) clearTimeout(problemTimerRef.current);
        if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
        
        if (typeof engineRef.current?.endGame === 'function') {
          engineRef.current.endGame();
        }
      } else {
        setLocalTimeRemaining(localTimeRef.current);
      }
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [engine.gameState, isTimeUp, localTimeRemaining]);

  // Game End Logic (Save Score)
  useEffect(() => {
    if (engine.gameState === 'ended' || isTimeUp) {
      const finalScore = scoreRef.current;
      if (finalScore > bestScore && finalScore > 0) {
        setIsNewBest(true);
        setBestScore(finalScore);
        saveData({ bestScore: finalScore });
      }
      syncToUI();
      if (problemTimerRef.current) clearTimeout(problemTimerRef.current);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      setCurrentProblem(null);
    }
  }, [engine.gameState, isTimeUp, bestScore, syncToUI]);

  // === UI Handlers ===
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

  // === CORE MECHANICS ===
  const generateProblem = useCallback(() => {
    const level = difficultyRef.current;
    let a, b, op, query, answer;
    const ops = ['+', '-', '*'];
    
    if (level <= 3) {
      a = Math.floor(Math.random() * 20) + 2;
      b = Math.floor(Math.random() * 20) + 2;
      op = ops[Math.floor(Math.random() * 2)]; 
    } else if (level <= 7) {
      a = Math.floor(Math.random() * 50) + 10;
      b = Math.floor(Math.random() * 30) + 5;
      op = ops[Math.floor(Math.random() * 3)];
    } else {
      a = Math.floor(Math.random() * 80) + 20;
      b = Math.floor(Math.random() * 70) + 10;
      op = ops[Math.floor(Math.random() * 3)];
      if (op === '*') {
        a = Math.floor(a / 4) + 2;
        b = Math.floor(b / 2) + 2;
      }
    }
    
    // Prevent negative answers
    if (op === '-') {
      if (a < b) {
        let temp = a;
        a = b;
        b = temp;
      }
      if (a === b) a += Math.floor(Math.random() * 5) + 1; 
    }

    switch (op) {
      case '+': query = `${a} + ${b}`; answer = a + b; break;
      case '-': query = `${a} - ${b}`; answer = a - b; break;
      case '*': query = `${a} × ${b}`; answer = a * b; break;
      default: query = `${a} + ${b}`; answer = a + b;
    }
    
    const questionKey = `${query}=${answer}`;
    if (usedQuestionsRef.current.has(questionKey) && usedQuestionsRef.current.size < 200) {
      return generateProblem();
    }
    usedQuestionsRef.current.add(questionKey);
    if (usedQuestionsRef.current.size > 300) {
      usedQuestionsRef.current.clear();
    }
    
    const options = [answer];
    const variance = level <= 3 ? 5 : level <= 7 ? 10 : 20;
    let attempts = 0;

    while (options.length < 4 && attempts < 50) {
      let fake = answer + (Math.floor(Math.random() * variance * 2) - variance);
      if (fake >= 0 && !options.includes(fake)) {
        options.push(fake);
      }
      attempts++;
    }
    
    // Safety fallback
    let fallback = answer + 1;
    while (options.length < 4) {
      if (!options.includes(fallback)) options.push(fallback);
      fallback++;
    }
    
    const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
    return { query, answer, options: shuffledOptions, key: Date.now() };
  }, []);

  const applyPenalty = useCallback((reason) => {
    if (audioSynth) audioSynth.playSoftThud();
    
    scoreRef.current = Math.max(0, scoreRef.current - 3); 
    localTimeRef.current -= 0.5; 
    comboRef.current = 0;
    
    if (reason === 'timeout') {
      timeoutsRef.current += 1;
      triggerFeedback('Too Slow! -3 PTS | -0.5s', 'error');
    } else {
      mistakesRef.current += 1;
      triggerFeedback('Wrong! -3 PTS | -0.5s', 'error');
    }
    
    if (localTimeRef.current <= 0) {
      localTimeRef.current = 0;
      setLocalTimeRemaining(0);
      setIsTimeUp(true);
      gameStateRef.current = 'ended';
      if (typeof engineRef.current?.endGame === 'function') {
        engineRef.current.endGame();
      }
      return false;
    }
    
    setLocalTimeRemaining(localTimeRef.current);
    
    // Decrease difficulty slightly on mistakes
    difficultyRef.current = Math.max(1, difficultyRef.current - 1);
    setCurrentDifficultyLvl(difficultyRef.current);
    
    syncToUI();
    setFlashBg('red');
    setTimeout(() => setFlashBg(null), 100);
    
    return false;
  }, [syncToUI, triggerFeedback]);

  const spawnNextProblem = useCallback(() => {
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    if (problemTimerRef.current) clearTimeout(problemTimerRef.current);
    
    if (gameStateRef.current !== 'playing' || localTimeRef.current <= 0) return;
    
    setSelectedOption(null);
    setCanSelect(true);
    clickCooldownRef.current = false;
    
    const problem = generateProblem();
    setCurrentProblem(problem);
    
    // Time per problem decreases with difficulty (min 1.5s)
    const timePerProblem = Math.max(1500, 5000 - (difficultyRef.current * 300));
    
    problemTimerRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing' && mountedRef.current && localTimeRef.current > 0) {
        applyPenalty('timeout');
        if (localTimeRef.current > 0) {
          transitionTimerRef.current = setTimeout(() => {
            spawnNextProblem();
          }, 300);
        }
      }
    }, timePerProblem);
    
  }, [generateProblem, applyPenalty]);

  const handleOptionSelect = useCallback((selectedAnswer) => {
    if (gameStateRef.current !== 'playing' || isTimeUp || clickCooldownRef.current || !canSelect) return;
    
    if (problemTimerRef.current) clearTimeout(problemTimerRef.current);
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);

    clickCooldownRef.current = true;
    setCanSelect(false);
    setSelectedOption(selectedAnswer);
    
    const correctAnswer = currentProblem?.answer;
    
    if (selectedAnswer === correctAnswer) {
      // CORRECT ANSWER
      if (audioSynth) audioSynth.playSoothingPop();
      
      scoreRef.current += 5; 
      correctRef.current += 1;
      comboRef.current += 1;
      localTimeRef.current = Math.min(60, localTimeRef.current + 0.5); // +0.5s Time (Max 60 limit enforced)
      setLocalTimeRemaining(localTimeRef.current);
      
      // Difficulty scaling up
      difficultyRef.current = Math.min(15, difficultyRef.current + 1);
      setCurrentDifficultyLvl(difficultyRef.current);
      
      // Combo bonus feedback
      if (comboRef.current > 0 && comboRef.current % 3 === 0) {
        if (audioSynth) audioSynth.playComboSound();
        triggerFeedback(`🔥 ${comboRef.current}x Combo! +5 PTS | +0.5s`, 'success');
      } else {
        triggerFeedback('Correct! +5 PTS | +0.5s', 'success');
      }
      
      syncToUI();
      setFlashBg('green');
      setTimeout(() => setFlashBg(null), 100);
      
    } else {
      // WRONG ANSWER
      applyPenalty('wrong');
    }
    
    // Transition to next problem
    transitionTimerRef.current = setTimeout(() => {
      if (localTimeRef.current > 0 && gameStateRef.current === 'playing') {
        spawnNextProblem();
      }
    }, 250);
    
  }, [isTimeUp, canSelect, currentProblem, applyPenalty, syncToUI, triggerFeedback, spawnNextProblem]);

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStateRef.current !== 'playing' || isTimeUp || !canSelect) return;
      
      const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3 };
      const optionIndex = keyMap[e.key];
      
      if (optionIndex !== undefined && currentProblem?.options[optionIndex] !== undefined) {
        e.preventDefault();
        handleOptionSelect(currentProblem.options[optionIndex]);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleOptionSelect, isTimeUp, canSelect, currentProblem]);

  // Start sequence
  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    
    // Clear any lingering state/timers
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (problemTimerRef.current) clearTimeout(problemTimerRef.current);
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);

    setIsTimeUp(false);
    localTimeRef.current = 60;
    setLocalTimeRemaining(60);
    
    scoreRef.current = 0;
    correctRef.current = 0;
    mistakesRef.current = 0;
    timeoutsRef.current = 0;
    comboRef.current = 0;
    difficultyRef.current = 1;
    usedQuestionsRef.current.clear();
    clickCooldownRef.current = false;
    
    syncToUI();
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });
    setIsNewBest(false);
    setSelectedOption(null);
    setCanSelect(true);
    
    gameStateRef.current = 'playing';
    
    // Auto-Fullscreen Activation
    try {
      if (!document.fullscreenElement && gameContainerRef.current) {
        await gameContainerRef.current.requestFullscreen();
      }
    } catch (err) {}
    
    if (engineRef.current) engineRef.current.startGame();
    setTimeout(() => spawnNextProblem(), 300);
  }, [syncToUI, spawnNextProblem]);

  const handleExitToStart = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    window.location.reload(); 
  }, []);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (problemTimerRef.current) clearTimeout(problemTimerRef.current);
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    
    gameStateRef.current = 'start';
    setIsTimeUp(false);
    setCurrentProblem(null);
    setSelectedOption(null);
    setCanSelect(true);
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });
  }, []);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/academic/math-speed/mental-math';
    if (navigator.share) {
      navigator.share({ title: 'Mental Math Speed Drill', text: 'Master mental arithmetic with this adaptive difficulty math challenge!', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(249,115,22,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  const totalActions = correctCount + mistakes + timeouts;
  const accuracy = totalActions > 0 ? Math.round((correctCount / totalActions) * 100) : 100;
  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracy;

  return (
    <div className="min-h-screen select-none bg-black text-white selection:bg-transparent font-sans" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/drills/academic" className="text-gray-500 hover:text-gray-300 transition-colors">Academic</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-gray-500">Math Speed</li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-orange-400 font-medium">Mental Math</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Mental Math</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Adaptive Speed Challenge • 60s</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {gameStateRef.current === 'playing' && !isTimeUp && (
              <button onClick={resetGame} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset">
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Theme">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Box Theme">
              <Eye className="w-5 h-5" />
            </button>
            <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Sound">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Fullscreen">
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-orange-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining} label="Time" unit="s" />
          <StatCard icon={<Zap className="text-purple-400" />} value={`Lv.${currentDifficultyLvl}`} label="Level" />
          <StatCard icon={<CheckCircle className="text-emerald-400" />} value={correctCount} label="Correct" />
          <StatCard icon={<AlertCircle className="text-orange-400" />} value={timeouts} label="Timeouts" />
          <StatCard icon={<XCircle className="text-red-400" />} value={mistakes} label="Mistakes" />
          <StatCard icon={<Trophy className="text-yellow-400" />} value={bestScore} label="Best Score" />
        </div>

        {/* Dynamic Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {localFeedback.visible && (
            <div key={localFeedback.id} className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
              {localFeedback.text}
            </div>
          )}
        </div>

        {/* Game Container (Optimized with vmin for universal portrait/landscape scaling) */}
        <div ref={gameContainerRef} 
          onContextMenu={(e) => { if(gameStateRef.current === 'playing' && !isTimeUp) e.preventDefault(); }}
          className={`relative overflow-hidden flex flex-col transition-colors duration-100 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-screen h-screen' 
              : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[600px] lg:min-h-[650px] md:aspect-video'
          }`}
          style={{ 
            margin: '0 auto',
            touchAction: (gameStateRef.current === 'playing' && !isTimeUp) ? 'none' : 'auto', 
            overscrollBehavior: (gameStateRef.current === 'playing' && !isTimeUp) ? 'none' : 'auto',
            backgroundColor: flashBg === 'red' ? '#450a0a' : flashBg === 'green' ? '#064e3b' : (isBoxDarkMode ? '#0a0a0a' : '#ffffff'),
            color: isBoxDarkMode ? '#ffffff' : '#111827'
          }}>
          
          {/* Subtle background grid */}
          <div className={`absolute inset-0 pointer-events-none ${isBoxDarkMode ? 'opacity-20' : 'opacity-5'}`} style={{ backgroundImage: `radial-gradient(circle, ${isBoxDarkMode ? '#ffffff' : '#000000'} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

          {/* Time Progress Bar */}
          {gameStateRef.current === 'playing' && !isTimeUp && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`}
                style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
              />
            </div>
          )}

          {/* Fullscreen UI Buttons */}
          {isFullscreen && gameStateRef.current === 'playing' && !isTimeUp && (
            <div className="absolute top-4 right-4 z-[60] flex gap-2">
              <button onClick={resetGame} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* === ACTIVE GAMEPLAY === */}
          {gameStateRef.current === 'playing' && !isTimeUp && (
            <div className="flex flex-col items-center justify-center w-full h-full px-4" style={{ padding: 'clamp(1rem, 4vmin, 3rem)' }}>
              
              {/* Equation Display (Scaled purely with vmin) */}
              <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
                {currentProblem ? (
                  <div key={currentProblem.key} 
                       className={`font-black tracking-tighter animate-in zoom-in-75 duration-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] text-center w-full whitespace-nowrap overflow-hidden text-ellipsis ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}
                       style={{ fontSize: 'clamp(2rem, 12vmin, 8rem)' }}>
                    {currentProblem.query} = ?
                  </div>
                ) : (
                  <div className={`text-3xl sm:text-5xl font-bold animate-pulse ${isBoxDarkMode ? 'text-gray-700' : 'text-gray-300'}`}>
                    Preparing...
                  </div>
                )}
              </div>

              {/* Answer Options Grid (Scaled using vmin to fit both portrait and landscape perfectly) */}
              <div className="w-full max-w-lg sm:max-w-3xl grid grid-cols-2 mx-auto shrink-0" style={{ gap: 'clamp(0.5rem, 2vmin, 1.5rem)', marginTop: 'clamp(0.5rem, 3vmin, 2rem)' }}>
                {currentProblem?.options.map((option, index) => {
                  const keyNum = index + 1;
                  const isSelected = selectedOption === option;
                  const isCorrect = option === currentProblem?.answer;
                  
                  let buttonStyles = isBoxDarkMode 
                    ? 'bg-gray-800/80 border-gray-700 text-white hover:bg-gray-700 hover:border-gray-500'
                    : 'bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200 hover:border-gray-400';
                  
                  if (isSelected && !isCorrect) {
                    buttonStyles = 'bg-red-600 border-red-500 text-white';
                  } else if (isSelected && isCorrect) {
                    buttonStyles = 'bg-green-600 border-green-500 text-white';
                  }
                  
                  if (!canSelect) {
                    buttonStyles += ' opacity-60 cursor-not-allowed';
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => canSelect && !selectedOption && handleOptionSelect(option)}
                      disabled={!canSelect || selectedOption !== null}
                      onPointerDown={(e) => {
                        if (canSelect && !selectedOption) {
                          e.preventDefault();
                          handleOptionSelect(option);
                        }
                      }}
                      className={`relative w-full rounded-2xl font-black transition-all ${
                        canSelect && !selectedOption ? 'hover:scale-[1.02] active:scale-95' : ''
                      } ${buttonStyles} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      style={{ 
                        height: 'clamp(3rem, 12vmin, 7rem)', 
                        fontSize: 'clamp(1.2rem, 5vmin, 3rem)',
                        borderWidth: 'clamp(2px, 0.5vmin, 4px)'
                      }}
                    >
                      <span className="absolute top-2 left-3 opacity-40 font-mono" style={{ fontSize: 'clamp(0.6rem, 2vmin, 1rem)' }}>{keyNum}</span>
                      {option}
                    </button>
                  );
                })}
              </div>
              
              <p className={`text-center font-medium ${isBoxDarkMode ? 'text-gray-600' : 'text-gray-400'}`} style={{ fontSize: 'clamp(0.6rem, 2vmin, 0.875rem)', marginTop: 'clamp(0.5rem, 2vmin, 1.5rem)' }}>
                Press 1-4 keys to answer faster
              </p>
            </div>
          )}

          {/* Start Screen */}
          {gameStateRef.current === 'start' && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm p-4 overflow-y-auto">
              <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full border border-gray-700 bg-gray-900 shadow-2xl flex flex-col my-auto shrink-0">
                <div className="flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                    <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black mb-2 pointer-events-none tracking-tight">Mental Math</h2>
                  <p className="text-xs sm:text-sm mb-8 text-gray-400 leading-relaxed pointer-events-none">Adaptive difficulty arithmetic challenge. Solve addition, subtraction & multiplication problems under time pressure.</p>
                </div>
                
                <button 
                  onClick={handleStartGame}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(249,115,22,0.3)] focus:outline-none shrink-0">
                  <Play className="w-5 h-5 fill-white" />
                  START DRILL
                </button>
              </div>
            </div>
          )}

          {/* End Screen */}
          {(gameStateRef.current === 'ended' || isTimeUp) && (
            <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 p-4 overflow-y-auto">
              <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[90vh] my-auto shrink-0">
                
                <div className="flex-1 overflow-y-auto">
                  <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 p-5 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Time's Up!</h2>
                      <p className="text-orange-400 font-medium text-sm">Mental Math • Lv.{currentDifficultyLvl}</p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pointer-events-none shrink-0">
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
                            className={`${accuracy >= 80 ? 'text-green-500' : accuracy >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                            strokeWidth="3" strokeDasharray={`${strokeDasharray}`} strokeDashoffset={`${strokeDashoffset}`} strokeLinecap="round" stroke="currentColor" fill="none" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-lg sm:text-xl font-black ${accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracy}%</span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-2">
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Correct</div>
                        <div className="text-lg sm:text-xl font-black text-emerald-400">{correctCount}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Timeouts</div>
                        <div className="text-lg sm:text-xl font-black text-orange-400">{timeouts}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Mistakes</div>
                        <div className="text-lg sm:text-xl font-black text-red-400">{mistakes}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Combo</div>
                        <div className="text-lg sm:text-xl font-black text-purple-400">{combo}x</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Level Reached</div>
                        <div className="text-lg sm:text-xl font-black text-cyan-400">{currentDifficultyLvl}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Best Score</div>
                        <div className="text-lg sm:text-xl font-black text-yellow-400">{bestScore}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 shrink-0 rounded-b-3xl">
                  <button onClick={() => { if(engineRef.current) engineRef.current.endGame(); handleStartGame(); }} className="flex-1 py-3 sm:py-4 bg-orange-600 text-white rounded-xl font-black tracking-wide hover:bg-orange-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.4)] text-sm sm:text-base">
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                  </button>
                  <button onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button onClick={handleExitToStart} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                
              </div>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* DRILL RULES & SCORING */}
        {/* ============================================================ */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-orange-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Rules & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="orange" text="Select the correct answer" highlight="From 4 options" result="+5 PTS | +0.5s Time" />
                  <RuleItem num="2" color="indigo" text="Answer correctly to scale" highlight="Up to Lv.15" result="Difficulty increases" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Wrong Match / Timeout" result="-3 PTS | -0.5s Time" />
                  <RuleItem num="4" color="purple" text="Keyboard optimization" highlight="Press 1-4 to answer" result="Use for maximum speed" />
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
                <GraduationCap className="w-5 h-5 text-orange-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About This Mental Math Drill</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  Engineered for profound cognitive stimulation, this drill forces rapid calculation and problem-solving within a high-pressure, endless loop. Featuring an adaptive difficulty engine that spans from elementary arithmetic to complex multiplication, it ruthlessly tests and expands your mental math capacity while heavily penalizing hesitation.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Target Audience</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Competitive exam candidates (SAT, GRE, GMAT), STEM professionals, and individuals seeking to drastically enhance mental computation speed and cognitive agility.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Trained</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Advanced mental arithmetic shortcuts, visual reaction time, high-stress decision making, and sustained attention span over long periods.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Performance Metrics</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score progression, aggregate accuracy mapping, precision versus timeout analysis, and dynamic survival level milestones.</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play</h3>
                  </div>
                  <ol className="text-sm leading-relaxed space-y-3 list-decimal pl-5 text-gray-400">
                    <li><strong className="text-gray-200">Hardware Utilization:</strong> For peak operational speed, rest your fingers on the `1`, `2`, `3`, and `4` keys. Relying strictly on keyboard inputs bypasses the mechanical delay of mouse tracking.</li>
                    <li><strong className="text-gray-200">Rhythmic Processing:</strong> Hesitation is heavily penalized. The response window tightens drastically as difficulty scales up. Do not lose momentum.</li>
                    <li><strong className="text-gray-200">Employ Heuristics:</strong> On harder levels, don't always compute the exact number. Quickly check the last digits of the options to eliminate impossible answers.</li>
                  </ol>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why does my timer deplete unexpectedly?</h4>
                      <p className="text-xs text-gray-400 mt-1">Mistakes carry severe consequences. Every incorrect input or missed timeout instantly subtracts 1 second from your total time allowance while deducting 5 points from your score. Precision is just as vital as speed.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why does the equation shift before I can react?</h4>
                      <p className="text-xs text-gray-400 mt-1">This module operates on an Endless Time-Attack framework. The exposure duration of each equation tightens dynamically as your speed level increases. Failing to input a response within this tightening window registers as a Timeout.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">What constitutes an elite score?</h4>
                      <p className="text-xs text-gray-400 mt-1">Sustaining a score over 300 points reflects exceptional cognitive agility. Achieving Speed Level 10 or higher categorizes your mental arithmetic and reaction synchronicity within the top percentile of academic performers.</p>
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
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-orange-500 to-red-600"></div>
              <h2 className="text-xl font-bold text-white">Explore Related Academic Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/academic/math-speed/Math-Reaction" title="Math Reaction" desc="ODD/EVEN parity recognition with adaptive speed scaling." color="cyan" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/math-speed/Math-Reaction" title="Arithmetic Race" desc="Speed math with combo system across 3 difficulty tiers." color="blue" icon={<Calculator className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/math-speed/Math-Reaction" title="Multiplication Tables" desc="Master times tables up to 20×20 with high-friction focus." color="purple" icon={<Hash className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/math-speed/mental-math" title="Quick Math" desc="Rapid fire mental arithmetic practice for competitive exams." color="emerald" icon={<Brain className="w-4 h-4" />} />
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
                    <li><Link href="/drills/visual-tracking" className="hover:text-white transition-colors">Tracking (25 drills)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-black text-xl tracking-tight">SkillDrills</span>
                </div>
                <p className="text-sm mb-3 font-medium">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-8 text-gray-500">
                  Free online mental math speed drill. Train your mental calculation speed and agility in an endless Time-Attack challenge.
                </p>
                
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
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
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-1.5 sm:p-3 text-center flex flex-col justify-center h-full transition-all duration-300 hover:border-gray-600 shadow-md pointer-events-none">
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
    orange: 'bg-orange-600 text-orange-300 border-orange-500', 
    indigo: 'bg-indigo-600 text-indigo-300 border-indigo-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    purple: 'bg-purple-600 text-purple-300 border-purple-500',
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500' 
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
        <div className={`text-xs font-black px-3 py-1.5 rounded-lg bg-gray-900 border ${border} ${txt} whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left`}>
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
    red: 'from-red-500 to-rose-500',
    teal: 'from-teal-500 to-green-500'
  };
  
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:-translate-y-1 hover:border-gray-600">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-orange-500 to-red-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-black border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-orange-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-orange-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}