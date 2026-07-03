'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Zap, Award, 
  Volume2, VolumeX, Maximize2, Minimize2, Timer,
  Scale, CheckCircle2, XCircle, Trophy,
  Brain, ChevronRight, BarChart3, Info, RefreshCw,
  Share2, GraduationCap, TrendingUp, ArrowRight, 
  Play, Target, LogOut, Lightbulb
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
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCorrect() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
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
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
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
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch(e) {}
  }
  
  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

export default function InferenceDrillClient() {
  // === UI State ===
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // === Game State ===
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState(1); // 1 = Easy, 2 = Medium, 3 = Hard
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [showRationale, setShowRationale] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  const [isNewBest, setIsNewBest] = useState(false);

  // === Feedback State ===
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  const STORAGE_BEST_KEY = 'inferenceDrill_bestScore_v4';

  // === Refs ===
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const localTimeRef = useRef(60.0);
  const questionIdxMapRef = useRef(new Map());
  const mountedRef = useRef(false);

  // Categorized Difficulty Drill Set
  const DRILL_SET = useMemo(() => [
    { id: 1, difficulty: 'Medium', category: 'Logical Flaw', stimulus: "The city's new bike lane initiative has failed. Since the lanes were installed last year, the number of reported bicycle accidents has increased by 15%. Therefore, the bike lanes have made cycling more dangerous.", question: "Which of the following, if true, most seriously weakens the argument?", options: ["The cost of maintaining bike lanes is higher than originally estimated.", "The number of total cyclists in the city increased by 50% since the lanes were installed.", "Many motorists have complained about the reduction in car lanes.", "The city also increased the number of traffic police during the same period."], correct: 1, rational: "Rate vs. Raw Number flaw. A 50% increase in cyclists with only 15% more accidents means the accident rate per cyclist actually decreased." },
    { id: 2, difficulty: 'Hard', category: 'Necessary Assumption', stimulus: "Corporate profits are at an all-time high. To ensure long-term economic stability, the government must increase the corporate tax rate immediately.", question: "The argument above relies on which of the following assumptions?", options: ["Higher taxes always lead to increased government spending efficiency.", "Corporate profits are the primary cause of current economic instability.", "Current high profits will not naturally diminish without government intervention.", "Increased tax revenue is a necessary component of economic stability."], correct: 3, rational: "The conclusion requires that tax revenue is necessary for economic stability. Without this assumption, the argument collapses." },
    { id: 3, difficulty: 'Easy', category: 'Causal Flaw', stimulus: "Students who eat breakfast regularly score higher on standardized tests than those who skip breakfast. Therefore, eating breakfast causes improved academic performance.", question: "Which of the following most weakens the causal claim?", options: ["Some students who skip breakfast still score very well on tests.", "Students who eat breakfast also tend to have more stable home environments and better sleep habits.", "Breakfast is considered the most important meal of the day by nutritionists.", "Schools that serve breakfast report higher attendance rates."], correct: 1, rational: "Correlation does not equal causation. The stable home environment could be the actual cause of both eating breakfast and higher test scores." },
    { id: 4, difficulty: 'Medium', category: 'Paradox Resolution', stimulus: "Despite a significant increase in the city's police budget and number of officers, the reported crime rate has remained unchanged for three consecutive years.", question: "Which of the following, if true, best resolves the apparent paradox?", options: ["The city's population has decreased by 15% over the same period.", "More citizens are now reporting crimes that previously went unreported.", "The police department has invested heavily in new technology.", "Neighboring cities have seen crime rates decrease."], correct: 1, rational: "Increased reporting creates the appearance of stable crime rates even as actual crime decreases. The budget increase may be working, but reporting bias masks the effect." },
    { id: 5, difficulty: 'Easy', category: 'Strengthen', stimulus: "A new drug has been shown to reduce blood pressure in 85% of patients during clinical trials. The manufacturer claims this drug will significantly reduce heart disease rates nationwide.", question: "Which of the following, if true, most strengthens the manufacturer's claim?", options: ["The drug is affordable and covered by most insurance plans.", "High blood pressure is the leading risk factor for heart disease.", "The clinical trials included patients from diverse demographic backgrounds.", "Competing drugs only show 70% effectiveness."], correct: 1, rational: "If high blood pressure is the leading cause of heart disease, then reducing it would logically lead to reduced heart disease rates." },
    { id: 6, difficulty: 'Medium', category: 'Inference', stimulus: "Archaeologists discovered pottery fragments at a site dating to 3000 BCE. The pottery contains residue of fermented grains and shows signs of having been sealed with wax.", question: "Which of the following can be most reasonably inferred from the evidence?", options: ["The civilization had developed advanced agricultural techniques.", "The inhabitants intentionally produced and stored alcoholic beverages.", "Trade networks existed between this and neighboring civilizations.", "The pottery was used exclusively for religious ceremonies."], correct: 1, rational: "Fermented grains plus sealed containers strongly suggest intentional production and storage of alcohol. This is a direct inference from the evidence presented." },
    { id: 7, difficulty: 'Easy', category: 'Flawed Analogy', stimulus: "Learning to code is just like learning a foreign language. Therefore, the best way to teach coding is through immersive conversation practice, just as we teach Spanish or French.", question: "The argument is most vulnerable to criticism because:", options: ["Coding languages are less complex than natural languages.", "Computers cannot engage in true conversation like humans can.", "The purpose of coding is fundamentally different from communication.", "Both foreign languages and coding require memorization."], correct: 1, rational: "The analogy fails because natural language learning relies on interactive feedback from another conscious being. Code execution is deterministic and lacks the fluid adaptability of human conversation." },
    { id: 8, difficulty: 'Medium', category: 'Method of Reasoning', stimulus: "Critic: 'Your proposal to reduce traffic by adding tolls is regressive. It disproportionately burdens low-income commuters.' Mayor: 'While tolls may affect some, the revenue will fund free public transportation passes for low-income residents.'", question: "The Mayor responds to the critic by:", options: ["Conceding the critic's point but providing additional context.", "Rejecting the premise that tolls are regressive.", "Offering a mitigation strategy that addresses the stated concern.", "Shifting the discussion to unrelated benefits of the proposal."], correct: 2, rational: "The Mayor doesn't deny the regressive effect but offers a compensatory measure (free passes) that mitigates the harm to low-income residents." },
    { id: 9, difficulty: 'Hard', category: 'Sufficient Assumption', stimulus: "If the museum receives the grant, it will expand the modern art wing. The modern art wing will only be expanded if the museum receives the grant.", question: "Which of the following must be true based on the statements above?", options: ["The museum will expand the modern art wing.", "The museum will not receive the grant.", "Expansion of the modern art wing depends entirely on receiving the grant.", "The modern art wing needs expansion."], correct: 2, rational: "The second sentence establishes that receiving the grant is a necessary condition for expansion. Expansion cannot happen without it." },
    { id: 10, difficulty: 'Hard', category: 'Evaluate the Argument', stimulus: "A company reports that employee productivity increased 20% after implementing a four-day workweek. The CEO claims the shorter week causes higher productivity.", question: "Which of the following would be most useful to evaluate the CEO's claim?", options: ["Whether the company hired new employees during this period.", "Whether employees are working longer hours on the four days they do work.", "Whether the company's competitors have similar policies.", "Whether employee satisfaction surveys show improved morale."], correct: 1, rational: "If employees compressed 40 hours into 4 days, productivity per hour hasn't changed - just scheduling. This is crucial for evaluating the causal claim." },
    { id: 11, difficulty: 'Hard', category: 'Parallel Reasoning', stimulus: "All successful entrepreneurs are risk-takers. Some risk-takers are not successful. Therefore, some successful people are not entrepreneurs.", question: "Which of the following exhibits flawed reasoning most similar to the argument above?", options: ["All dogs are mammals. Some mammals are not pets. Therefore, some dogs are not pets.", "All roses are flowers. Some flowers are red. Therefore, some roses are red.", "All birds can fly. Some flying creatures are not birds. Therefore, some birds cannot fly.", "All metals conduct electricity. Copper conducts electricity. Therefore, copper is a metal."], correct: 0, rational: "The original argument commits a logical error by concluding 'some successful people are not entrepreneurs' from premises about risk-takers. Option A makes a similar invalid inference." },
    { id: 12, difficulty: 'Easy', category: 'Main Point', stimulus: "While electric vehicles produce zero tailpipe emissions, their overall environmental impact depends heavily on how the electricity is generated. In regions where coal powers the grid, EVs may produce more carbon emissions over their lifecycle than efficient gasoline vehicles. However, as renewable energy expands, EVs become increasingly beneficial. The transition to electric transportation should therefore be paired with aggressive grid decarbonization.", question: "The main point of the passage is:", options: ["Electric vehicles are worse for the environment than gasoline cars.", "The environmental benefit of EVs depends on the electricity source.", "Renewable energy is more important than electric vehicles.", "Coal-powered electricity is the primary environmental threat."], correct: 1, rational: "The passage's central thesis is that EV environmental impact is contingent on the energy grid, and the two transitions must happen together." }
  ], []);

  useEffect(() => { 
    DRILL_SET.forEach((q, idx) => { 
      questionIdxMapRef.current.set(q.id, idx); 
    }); 
  }, [DRILL_SET]);

  useEffect(() => { 
    setIsClient(true);
    mountedRef.current = true;
    try {
      const savedBest = localStorage.getItem(STORAGE_BEST_KEY);
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
    const timer = setTimeout(() => { 
      if (mountedRef.current) setLoading(false); 
    }, 200);
    return () => { 
      mountedRef.current = false;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => { 
    const h = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', h); 
    return () => document.removeEventListener('fullscreenchange', h); 
  }, []);

  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      } else if (isFullscreen && document.fullscreenElement) {
        await document.exitFullscreen(); 
      }
    } catch (error) {} 
  }, [isFullscreen]);

  const enterFullscreen = async () => {
    try {
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen();
      }
    } catch (error) {}
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {}
  };

  const showFeedbackMsg = useCallback((message, type) => { 
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); 
    setFeedback(message); 
    setFeedbackType(type); 
    feedbackTimeoutRef.current = setTimeout(() => { 
      if (mountedRef.current) {
        setFeedback(''); 
        setFeedbackType(''); 
      }
    }, 800); 
  }, []);

  const getAvailableQuestions = useCallback(() => { 
    return DRILL_SET.filter((_, idx) => !completedQuestions.has(idx)); 
  }, [completedQuestions, DRILL_SET]);

  const handleGameOver = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    setGameState(prev => {
      // Prevent overwriting 'complete' with 'gameOver' if they hit 0s on the finish screen
      if (prev === 'complete') return 'complete'; 
      return 'gameOver';
    });

    const endScore = scoreRef.current;
    if (endScore > bestScore && endScore > 0) {
      setIsNewBest(true);
      setBestScore(endScore);
      try { localStorage.setItem(STORAGE_BEST_KEY, endScore.toString()); } catch (e) {}
    }
  }, [bestScore]);

  const loadNewQuestion = useCallback(() => { 
    const available = getAvailableQuestions(); 
    if (available.length === 0) { 
      if (timerRef.current) clearInterval(timerRef.current);
      setGameState('complete');
      handleGameOver();
      return; 
    } 
    
    // Map numerical level to difficulty string
    const targetDiff = difficultyLevel === 1 ? 'Easy' : difficultyLevel === 2 ? 'Medium' : 'Hard';
    
    // Filter for target difficulty
    let questionPool = available.filter(q => q.difficulty === targetDiff);

    // Fallback if we ran out of questions in that specific tier
    if (questionPool.length === 0) {
      questionPool = available;
    }

    const randomQuestion = questionPool[Math.floor(Math.random() * questionPool.length)]; 
    setCurrentQuestion(randomQuestion); 
    setSelectedIdx(null); 
    setShowRationale(false); 
  }, [getAvailableQuestions, difficultyLevel, handleGameOver]);

  // Decoupled Precision Timer
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        // Fix floating point math drift
        localTimeRef.current = Number((localTimeRef.current - 0.1).toFixed(1));
        
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
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, handleGameOver]);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    await enterFullscreen();
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    setGameState('playing');
    scoreRef.current = 0;
    localTimeRef.current = 60.0;
    
    setScore(0);
    setLocalTimeRemaining(60.0);
    setDifficultyLevel(1);
    setCombo(0);
    setTotalCorrect(0);
    setTotalAttempted(0);
    setWrongAnswers(0);
    setCompletedQuestions(new Set());
    setSelectedIdx(null);
    setShowRationale(false);
    setCurrentQuestion(null);
    setIsNewBest(false);
    
    setTimeout(() => {
      // Start with Easy question based on logic
      const targetDiff = 'Easy';
      const available = DRILL_SET;
      const pool = available.filter(q => q.difficulty === targetDiff);
      const randomQuestion = pool[Math.floor(Math.random() * pool.length)];
      setCurrentQuestion(randomQuestion);
    }, 50);
  }, [DRILL_SET]);

  const resetGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('start');
    scoreRef.current = 0;
    localTimeRef.current = 60.0;
    setScore(0);
    setLocalTimeRemaining(60.0);
    setDifficultyLevel(1);
    setCombo(0);
    setTotalCorrect(0);
    setTotalAttempted(0);
    setWrongAnswers(0);
    setCompletedQuestions(new Set());
    setCurrentQuestion(null);
    setSelectedIdx(null);
    setShowRationale(false);
    setFeedback('');
    setFeedbackType('');
    setIsNewBest(false);
  }, []);

  const handleExit = async () => {
    await exitFullscreen();
    resetGame();
  };

  const nextQuestion = useCallback(() => {
    setFeedback('');
    setFeedbackType('');
    loadNewQuestion();
  }, [loadNewQuestion]);

  const handleSubmit = useCallback((index) => {
    if (showRationale || !currentQuestion || gameState !== 'playing') return;
    
    const isCorrect = index === currentQuestion.correct;
    setSelectedIdx(index);
    setShowRationale(true);
    setTotalAttempted(prev => prev + 1);
    
    if (isCorrect) {
      const diff = currentQuestion.difficulty;
      let pointsGained = 0;
      let timeGained = 0;

      if (diff === 'Easy') { pointsGained = 10; timeGained = 3.0; }
      else if (diff === 'Medium') { pointsGained = 15; timeGained = 2.0; }
      else { pointsGained = 20; timeGained = 1.0; }

      // Update Score & Time
      scoreRef.current += pointsGained;
      setScore(scoreRef.current);
      
      localTimeRef.current = Math.min(60.0, localTimeRef.current + timeGained);
      setLocalTimeRemaining(localTimeRef.current);
      
      // Increase Difficulty Tier (Max 3)
      setDifficultyLevel(prev => Math.min(3, prev + 1));
      setTotalCorrect(prev => prev + 1);
      
      setCombo(prev => {
        const nc = prev + 1;
        if (nc > 0 && nc % 3 === 0) {
          if (audioSynth) audioSynth.playCombo();
          showFeedbackMsg(`🔥 ${nc}x Combo! +${pointsGained} PTS | +${timeGained}s`, 'success');
        } else {
          if (audioSynth) audioSynth.playCorrect();
          showFeedbackMsg(`✓ CORRECT! +${pointsGained} PTS | +${timeGained}s`, 'success');
        }
        return nc;
      });
      
      const qi = questionIdxMapRef.current.get(currentQuestion.id);
      if (qi !== undefined) {
        setCompletedQuestions(prev => {
          const ns = new Set(prev);
          ns.add(qi);
          return ns;
        });
      }
    } else {
      // Wrong Answer Penalties: -5 Score, -3 Seconds
      setCombo(0);
      setWrongAnswers(prev => prev + 1);
      
      scoreRef.current = Math.max(0, scoreRef.current - 5);
      setScore(scoreRef.current);
      
      localTimeRef.current = Math.max(0, localTimeRef.current - 3.0);
      setLocalTimeRemaining(localTimeRef.current);
      
      // Decrease Difficulty Tier (Floor 1)
      setDifficultyLevel(prev => Math.max(1, prev - 1));
      
      if (audioSynth) audioSynth.playWrong();
      showFeedbackMsg(`✗ INCORRECT! -5 PTS | -3s`, 'error');
      
      if (localTimeRef.current <= 0) {
        handleGameOver();
      }
    }
  }, [showRationale, currentQuestion, gameState, showFeedbackMsg, handleGameOver]);

  const getAccuracy = useCallback(() => {
    return totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 100;
  }, [totalCorrect, totalAttempted]);

  const shareDrillLink = async () => { 
    const url = 'https://skilldrills.online/drills/academic/comprehension/inference-drill';
    if (navigator.share) { 
      try { 
        await navigator.share({ 
          title: 'Inference Drill - Critical Reasoning Practice | SkillDrills', 
          text: 'Sharpen your logical reasoning with adaptive time constraints. Free!', 
          url 
        }); 
      } catch (e) {} 
    } else { 
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {}); 
    } 
  };

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - getAccuracy();

  // Helper for displaying current difficulty tier name
  const difficultyName = difficultyLevel === 1 ? 'Easy' : difficultyLevel === 2 ? 'Medium' : 'Hard';

  return (
    <div className="min-h-screen select-none bg-[#0a0a0a] text-white font-sans" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/drills/academic" className="text-gray-500 hover:text-gray-300 transition-colors">Academic</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-gray-500">Comprehension</li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-blue-400 font-medium">Inference Drill</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Scale className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Critical Reasoning Practice Test</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Logical Reasoning Questions • Inference Practice • LSAT & GMAT Preparation</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {gameState === 'playing' && (
              <button onClick={resetGame} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset">
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Sound">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Fullscreen">
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-blue-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
          <StatCard icon={<TrendingUp className={difficultyLevel === 3 ? "text-orange-400" : difficultyLevel === 2 ? "text-yellow-400" : "text-green-400"} />} value={difficultyName} label="Tier" />
          <StatCard icon={<Zap className="text-yellow-400" />} value={combo} label="Streak" />
          <StatCard icon={<CheckCircle2 className="text-emerald-400" />} value={totalCorrect} label="Correct" />
          <StatCard icon={<XCircle className="text-red-400" />} value={wrongAnswers} label="Misses" />
          <StatCard icon={<BookOpen className="text-purple-400" />} value={`${completedQuestions.size}/12`} label="Done" />
          <StatCard icon={<Trophy className="text-pink-400" />} value={Math.max(bestScore, score)} label="Best" />
        </div>

        {/* Dynamic Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {feedback && (
            <div className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${
              feedbackType === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : 
              'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'
            }`}>
              {feedback}
            </div>
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
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-blue-900/10" />

          {/* Time Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
              <div 
                className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }}
              />
            </div>
          )}

          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-[60] flex gap-2">
              <button onClick={resetGame} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            </div>
          )}

          <div className="flex-1 flex flex-col items-center p-4 sm:p-6 lg:p-8 h-full w-full relative overflow-y-auto overflow-x-hidden">
            
            {/* START SCREEN */}
            {gameState === 'start' && (
              <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-sm overflow-y-auto flex flex-col p-4">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-auto my-auto border border-gray-700 bg-gray-900 shadow-2xl flex flex-col shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(59,130,246,0.3)] shrink-0">
                    <Scale className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black mb-2 pointer-events-none tracking-tight">Inference Analytics</h2>
                  <p className="text-xs sm:text-base mb-6 text-gray-400 leading-relaxed pointer-events-none">
                    Sharpen your critical reasoning with 12 unique analytical passages. Adapts to your performance.
                  </p>
                  
                  <button 
                    onClick={startGame}
                    className="mt-auto w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:outline-none shrink-0">
                    <Play className="w-5 h-5 fill-white" />
                    START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* PLAYING STATE */}
            {gameState === 'playing' && currentQuestion && (
              <div className="w-full max-w-3xl my-auto py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-900/30 text-blue-400 border border-blue-500/20">{currentQuestion.category}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentQuestion.difficulty === 'Easy' ? 'bg-green-900/30 text-green-400 border-green-500/20' : currentQuestion.difficulty === 'Medium' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-500/20' : 'bg-orange-900/30 text-orange-400 border-orange-500/20'}`}>
                    Tier: {currentQuestion.difficulty}
                  </span>
                </div>
                
                <blockquote className="mb-6 p-4 sm:p-6 rounded-xl border-l-4 border-blue-500 italic text-sm sm:text-base bg-gray-800/80 text-gray-200 shadow-inner">
                  &ldquo;{currentQuestion.stimulus}&rdquo;
                </blockquote>
                
                <h3 className="text-base sm:text-lg font-bold mb-6 text-white">{currentQuestion.question}</h3>
                
                <div className="grid gap-3 mb-6" role="radiogroup" aria-label="Answer options">
                  {currentQuestion.options.map((option, i) => { 
                    const isCorrect = i === currentQuestion.correct; 
                    const isSelected = i === selectedIdx; 
                    const optionLetter = String.fromCharCode(65 + i); 
                    return (
                      <button 
                        key={i} 
                        disabled={showRationale} 
                        onClick={() => handleSubmit(i)} 
                        role="radio" 
                        aria-checked={isSelected} 
                        aria-label={`Option ${optionLetter}: ${option}`} 
                        className={`p-3 sm:p-4 rounded-xl text-left font-medium transition-all border-2 ${
                          showRationale 
                            ? isCorrect 
                              ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                              : isSelected 
                                ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                                : 'opacity-50 cursor-not-allowed border-gray-700 text-gray-500'
                            : 'cursor-pointer border-gray-700 bg-gray-800/50 text-gray-200 hover:border-blue-500 hover:bg-gray-700 active:scale-[0.99]'
                        } flex items-center justify-between`}>
                        <span className="flex items-center gap-3">
                          <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${showRationale && (isCorrect || isSelected) ? 'border-current' : 'border-gray-600 text-gray-400'}`}>{optionLetter}</span>
                          <span>{option}</span>
                        </span>
                        {showRationale && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />}
                        {showRationale && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
                      </button>
                    ); 
                  })}
                </div>
                
                {showRationale && (
                  <div className="p-4 sm:p-5 rounded-xl bg-blue-900/20 border border-blue-800 animate-in fade-in slide-in-from-top-4">
                    <p className="text-sm font-bold mb-2 text-blue-400 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Rationale:</p>
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">{currentQuestion.rational}</p>
                    <button 
                      onClick={nextQuestion} 
                      className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                      NEXT QUESTION <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* END SCREENS (GAME OVER / COMPLETE) */}
            {(gameState === 'gameOver' || gameState === 'complete') && (
              <div className="absolute inset-0 z-[70] bg-black/95 animate-in fade-in duration-300 overflow-y-auto flex flex-col p-4">
                <div className="rounded-3xl max-w-md w-full mx-auto my-auto shadow-2xl border border-gray-800 bg-gray-950 flex flex-col shrink-0">
                  
                  <div className={`bg-gradient-to-br ${gameState === 'complete' ? 'from-emerald-900/40 to-green-900/40' : 'from-blue-900/40 to-indigo-900/40'} p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl`}>
                    <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 ${gameState === 'complete' ? 'bg-emerald-500/20' : 'bg-blue-500/20'} rounded-full blur-3xl`}></div>
                    <div className={`absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 ${gameState === 'complete' ? 'bg-green-500/20' : 'bg-indigo-500/20'} rounded-full blur-3xl`}></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">{gameState === 'complete' ? 'Mastery Achieved!' : "Time's Up!"}</h2>
                      <p className={`${gameState === 'complete' ? 'text-emerald-400' : 'text-blue-400'} font-medium text-xs sm:text-sm`}>{gameState === 'complete' ? 'All 12 passages completed!' : 'Inference Analytics • Mission Ended'}</p>
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
                            strokeWidth="3" strokeDasharray={`${strokeDasharray}`} strokeDashoffset={`${strokeDashoffset}`} strokeLinecap="round" stroke="currentColor" fill="none" 
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
                      <EndStat label="Correct" value={totalCorrect} color="emerald" />
                      <EndStat label="Wrong" value={wrongAnswers} color="red" />
                      <EndStat label="Max Tier" value={difficultyName} color="purple" />
                      <EndStat label="Max Streak" value={`${combo}x`} color="orange" />
                      <EndStat label="Done" value={`${completedQuestions.size}/12`} color="blue" />
                      <EndStat label="Best" value={bestScore} color="yellow" />
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                    <button onClick={startGame} className={`flex-1 py-3 sm:py-4 bg-gradient-to-r ${gameState === 'complete' ? 'from-emerald-600 to-green-600 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'from-blue-600 to-indigo-600 shadow-[0_0_20px_rgba(59,130,246,0.4)]'} text-white rounded-xl font-black tracking-wide hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base`}>
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
                <Info className="w-5 h-5 text-blue-400" /><h2 className="font-bold text-white text-lg tracking-tight">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="green" text="Easy Question" highlight="+10 PTS | +3s" result="Correct" />
                  <RuleItem color="yellow" text="Medium Question" highlight="+15 PTS | +2s" result="Correct" />
                  <RuleItem color="orange" text="Hard Question" highlight="+20 PTS | +1s" result="Correct" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="red" text="Wrong Answer" highlight="-5 PTS | -3s" result="Penalty" />
                  <RuleItem color="cyan" text="Combo Multiplier" highlight="Every 3rd Answer" result="Boosts Output" />
                  <RuleItem color="purple" text="Time Limit Capped" highlight="Max 60 Seconds" result="Survival Mode" />
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
                <GraduationCap className="w-5 h-5 text-blue-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About This Critical Reasoning Practice Test</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This highly adaptive Inference Drill forces rapid synthesis of textual information. By binding complex logical deduction to a strict survival timer, you map the cognitive pathways required to isolate logical flaws, identify core assumptions, and process dense arguments efficiently. Adapts dynamically to your performance levels.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <InfoCard icon={<Scale className="w-4 h-4 text-white" />} title="Who It's For" desc="LSAT, GMAT, GRE, and UPSC candidates, alongside analysts needing high-speed, accurate deduction skills." color="blue" />
                  <InfoCard icon={<Brain className="w-4 h-4 text-white" />} title="Skills Optimized" desc="Pattern recognition, argument analysis, logical consistency checks, and complex reading comprehension under pressure." color="green" />
                  <InfoCard icon={<BarChart3 className="w-4 h-4 text-white" />} title="Metrics Tracked" desc="Net Score, Overall Accuracy, Level Scaling, Combo Streaks, and analytical breakdown of logical frameworks." color="purple" />
                </div>

                {/* How to Play Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Isolate the Core:</strong> Don't get bogged down in peripheral details. Quickly identify the argument's primary premise and the final conclusion.</li>
                    <li><strong className="text-gray-200">Pre-phrase the Answer:</strong> Before reading the multiple-choice options, try to anticipate the logical flaw, necessary assumption, or direct inference in your head.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> Consistent accuracy moves you to higher tiers where questions yield more points but fewer fallback seconds. Wrong answers heavily drain your time clock (-3s).</li>
                    <li><strong className="text-gray-200">Review Rationales:</strong> Take a moment to read the rationale after answering, even if you got it right. Understanding the logical structure is the key to leveling up your analytical skills.</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-blue-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <FAQItem question="Why does the timer deduct seconds for incorrect answers?" answer="This simulates high-stakes testing environments where incorrect assumptions cost valuable time. The -3s penalty forces you to balance speed with careful deduction, rather than blindly guessing." />
                    <FAQItem question="How does the dynamic difficulty scaling work?" answer="Answering correctly increases your operational 'Tier' (Easy, Medium, Hard). Harder questions offer higher point multipliers but less buffer time. Incorrect answers drop your tier down to give you space to recover." />
                    <FAQItem question="What constitutes a complete session?" answer="A complete session consists of analyzing all 12 unique logical paradigms without allowing the clock to hit zero. This proves mastery over multiple reasoning types (e.g., Causal Flaws, Paradox Resolution) in a single run." />
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
              <div className="w-1 h-5 rounded-full bg-blue-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/academic/comprehension/reading-comprehension" title="Reading Comprehension" desc="Extensive passages with adaptive quizzing." color="emerald" icon={<BookOpen className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/problem-solving/logic-puzzles" title="Logic Puzzles" desc="Deductive reasoning under strict time limits." color="purple" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/writing-speed/typing-test" title="Typing Speed Test" desc="WPM assessment across rigorous difficulty thresholds." color="rose" icon={<Award className="w-4 h-4" />} />
              <RelatedCard href="/drills/productivity/focus-endurance/deep-work" title="Deep Work Timer" desc="Structured sessions for maximum cognitive output." color="red" icon={<Timer className="w-4 h-4" />} />
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
                    <li><Link href="/drills/academic/comprehension/reading-comprehension" className="hover:text-blue-400 transition-colors">Reading Comprehension</Link></li>
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-blue-400 transition-colors">Typing Speed</Link></li>
                    <li><Link href="/drills/academic" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-blue-400 transition-colors">Logic Puzzles</Link></li>
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-blue-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
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
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Visual Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-blue-400 transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-blue-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory" className="hover:text-blue-400 transition-colors">Memory (15)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-blue-400 transition-colors">Mental Fitness (6)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-blue-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500/25 to-indigo-500/25 border border-blue-500/30 rounded-lg flex items-center justify-center">
                    <Scale className="w-3.5 h-3.5 text-blue-400" />
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
    green: 'text-green-400'
  };
  return (
    <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">{label}</div>
      <div className={`text-base sm:text-xl font-black ${colors[color] || 'text-white'}`}>{value}</div>
    </div>
  );
}

function InfoCard({ icon, title, desc, color }) {
  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600'
  };
  return (
    <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-8 h-8 rounded-lg ${colors[color]} flex items-center justify-center`}>{icon}</div>
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
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500',
    purple: 'bg-purple-600 text-purple-300 border-purple-500'
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
    emerald: 'from-emerald-500 to-green-500',
    orange: 'from-orange-500 to-amber-500',
    indigo: 'from-indigo-500 to-blue-500',
    teal: 'from-teal-500 to-cyan-500',
    purple: 'from-purple-500 to-violet-500',
    rose: 'from-rose-500 to-pink-500',
    red: 'from-red-500 to-rose-500'
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:-translate-y-1 hover:border-blue-500/50`}>
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