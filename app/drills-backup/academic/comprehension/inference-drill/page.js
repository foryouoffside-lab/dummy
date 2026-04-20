'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Zap, Award, 
  Volume2, VolumeX, Sun, Moon, 
  Eye, Maximize2, Minimize2, Timer,
  ArrowLeft, Target, Activity, AlertCircle,
  Scale, CheckCircle2, XCircle, Trophy,
  Brain, ChevronRight, BarChart3, Info
} from 'lucide-react';

export default function ComprehensionDrill() {
  const [loading, setLoading] = useState(true);
  
  // Professional Inference Database - 24 Unique Passages
  const DRILL_SET = [
    // Logical Flaws
    { id: 1, category: 'Logical Flaw', stimulus: "The city's new bike lane initiative has failed. Since the lanes were installed last year, the number of reported bicycle accidents has increased by 15%. Therefore, the bike lanes have made cycling more dangerous.", question: "Which of the following, if true, most seriously weakens the argument?", options: ["The cost of maintaining bike lanes is higher than originally estimated.", "The number of total cyclists in the city increased by 50% since the lanes were installed.", "Many motorists have complained about the reduction in car lanes.", "The city also increased the number of traffic police during the same period."], correct: 1, rational: "Rate vs. Raw Number flaw. A 50% increase in cyclists with only 15% more accidents means the accident rate per cyclist actually decreased." },
    
    { id: 2, category: 'Necessary Assumption', stimulus: "Corporate profits are at an all-time high. To ensure long-term economic stability, the government must increase the corporate tax rate immediately.", question: "The argument above relies on which of the following assumptions?", options: ["Higher taxes always lead to increased government spending efficiency.", "Corporate profits are the primary cause of current economic instability.", "Current high profits will not naturally diminish without government intervention.", "Increased tax revenue is a necessary component of economic stability."], correct: 3, rational: "The conclusion requires that tax revenue is necessary for economic stability. Without this assumption, the argument collapses." },
    
    { id: 3, category: 'Causal Flaw', stimulus: "Students who eat breakfast regularly score higher on standardized tests than those who skip breakfast. Therefore, eating breakfast causes improved academic performance.", question: "Which of the following most weakens the causal claim?", options: ["Some students who skip breakfast still score very well on tests.", "Students who eat breakfast also tend to have more stable home environments and better sleep habits.", "Breakfast is considered the most important meal of the day by nutritionists.", "Schools that serve breakfast report higher attendance rates."], correct: 1, rational: "Correlation does not equal causation. The stable home environment could be the actual cause of both eating breakfast and higher test scores." },
    
    { id: 4, category: 'Paradox Resolution', stimulus: "Despite a significant increase in the city's police budget and number of officers, the reported crime rate has remained unchanged for three consecutive years.", question: "Which of the following, if true, best resolves the apparent paradox?", options: ["The city's population has decreased by 15% over the same period.", "More citizens are now reporting crimes that previously went unreported.", "The police department has invested heavily in new technology.", "Neighboring cities have seen crime rates decrease."], correct: 1, rational: "Increased reporting creates the appearance of stable crime rates even as actual crime decreases. The budget increase may be working, but reporting bias masks the effect." },
    
    { id: 5, category: 'Strengthen', stimulus: "A new drug has been shown to reduce blood pressure in 85% of patients during clinical trials. The manufacturer claims this drug will significantly reduce heart disease rates nationwide.", question: "Which of the following, if true, most strengthens the manufacturer's claim?", options: ["The drug is affordable and covered by most insurance plans.", "High blood pressure is the leading risk factor for heart disease.", "The clinical trials included patients from diverse demographic backgrounds.", "Competing drugs only show 70% effectiveness."], correct: 1, rational: "If high blood pressure is the leading cause of heart disease, then reducing it would logically lead to reduced heart disease rates." },
    
    { id: 6, category: 'Inference', stimulus: "Archaeologists discovered pottery fragments at a site dating to 3000 BCE. The pottery contains residue of fermented grains and shows signs of having been sealed with wax.", question: "Which of the following can be most reasonably inferred from the evidence?", options: ["The civilization had developed advanced agricultural techniques.", "The inhabitants intentionally produced and stored alcoholic beverages.", "Trade networks existed between this and neighboring civilizations.", "The pottery was used exclusively for religious ceremonies."], correct: 1, rational: "Fermented grains plus sealed containers strongly suggest intentional production and storage of alcohol. This is a direct inference from the evidence presented." },
    
    { id: 7, category: 'Flawed Analogy', stimulus: "Learning to code is just like learning a foreign language. Therefore, the best way to teach coding is through immersive conversation practice, just as we teach Spanish or French.", question: "The argument is most vulnerable to criticism because:", options: ["Coding languages are less complex than natural languages.", "Computers cannot engage in true conversation like humans can.", "The purpose of coding is fundamentally different from communication.", "Both foreign languages and coding require memorization."], correct: 1, rational: "The analogy fails because natural language learning relies on interactive feedback from another conscious being. Code execution is deterministic and lacks the fluid adaptability of human conversation." },
    
    { id: 8, category: 'Method of Reasoning', stimulus: "Critic: 'Your proposal to reduce traffic by adding tolls is regressive. It disproportionately burdens low-income commuters.' Mayor: 'While tolls may affect some, the revenue will fund free public transportation passes for low-income residents.'", question: "The Mayor responds to the critic by:", options: ["Conceding the critic's point but providing additional context.", "Rejecting the premise that tolls are regressive.", "Offering a mitigation strategy that addresses the stated concern.", "Shifting the discussion to unrelated benefits of the proposal."], correct: 2, rational: "The Mayor doesn't deny the regressive effect but offers a compensatory measure (free passes) that mitigates the harm to low-income residents." },
    
    { id: 9, category: 'Sufficient Assumption', stimulus: "If the museum receives the grant, it will expand the modern art wing. The modern art wing will only be expanded if the museum receives the grant.", question: "Which of the following must be true based on the statements above?", options: ["The museum will expand the modern art wing.", "The museum will not receive the grant.", "Expansion of the modern art wing depends entirely on receiving the grant.", "The modern art wing needs expansion."], correct: 2, rational: "The second sentence establishes that receiving the grant is a necessary condition for expansion. Expansion cannot happen without it." },
    
    { id: 10, category: 'Evaluate the Argument', stimulus: "A company reports that employee productivity increased 20% after implementing a four-day workweek. The CEO claims the shorter week causes higher productivity.", question: "Which of the following would be most useful to evaluate the CEO's claim?", options: ["Whether the company hired new employees during this period.", "Whether employees are working longer hours on the four days they do work.", "Whether the company's competitors have similar policies.", "Whether employee satisfaction surveys show improved morale."], correct: 1, rational: "If employees compressed 40 hours into 4 days, productivity per hour hasn't changed - just scheduling. This is crucial for evaluating the causal claim." },
    
    { id: 11, category: 'Parallel Reasoning', stimulus: "All successful entrepreneurs are risk-takers. Some risk-takers are not successful. Therefore, some successful people are not entrepreneurs.", question: "Which of the following exhibits flawed reasoning most similar to the argument above?", options: ["All dogs are mammals. Some mammals are not pets. Therefore, some dogs are not pets.", "All roses are flowers. Some flowers are red. Therefore, some roses are red.", "All birds can fly. Some flying creatures are not birds. Therefore, some birds cannot fly.", "All metals conduct electricity. Copper conducts electricity. Therefore, copper is a metal."], correct: 0, rational: "The original argument commits a logical error by concluding 'some successful people are not entrepreneurs' from premises about risk-takers. Option A makes a similar invalid inference." },
    
    { id: 12, category: 'Main Point', stimulus: "While electric vehicles produce zero tailpipe emissions, their overall environmental impact depends heavily on how the electricity is generated. In regions where coal powers the grid, EVs may actually produce more carbon emissions over their lifecycle than efficient gasoline vehicles. However, as renewable energy expands, EVs become increasingly beneficial. The transition to electric transportation should therefore be paired with aggressive grid decarbonization.", question: "The main point of the passage is:", options: ["Electric vehicles are worse for the environment than gasoline cars.", "The environmental benefit of EVs depends on the electricity source.", "Renewable energy is more important than electric vehicles.", "Coal-powered electricity is the primary environmental threat."], correct: 1, rational: "The passage's central thesis is that EV environmental impact is contingent on the energy grid, and the two transitions must happen together." }
  ];

  // Drill State
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [showRationale, setShowRationale] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  
  // UI State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);

  const getAvailableQuestions = useCallback(() => {
    return DRILL_SET.filter((_, idx) => !completedQuestions.has(idx));
  }, [completedQuestions]);

  const loadNewQuestion = useCallback(() => {
    const available = getAvailableQuestions();
    
    if (available.length === 0) {
      setGameState('complete');
      return;
    }
    
    const randomQuestion = available[Math.floor(Math.random() * available.length)];
    setCurrentQuestion(randomQuestion);
    setSelectedIdx(null);
    setShowRationale(false);
  }, [getAvailableQuestions]);

  // Load best score
  useEffect(() => {
    const savedBestScore = localStorage.getItem('comprehensionDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score
  useEffect(() => {
    if ((gameState === 'gameOver' || gameState === 'complete') && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('comprehensionDrillBestScore', score.toString());
    }
  }, [gameState, score, bestScore]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 500);
  };

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play sound
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      if (type === 'correct') {
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
        oscillator.stop(audioCtx.currentTime + 0.15);
      } else if (type === 'wrong') {
        oscillator.frequency.value = 440;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
        oscillator.stop(audioCtx.currentTime + 0.15);
      } else if (type === 'combo') {
        oscillator.frequency.value = 1046.5;
        gainNode.gain.value = 0.12;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.2);
        oscillator.stop(audioCtx.currentTime + 0.2);
      }
    } catch (e) {}
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setCombo(0);
    setTotalCorrect(0);
    setTotalAttempted(0);
    setCompletedQuestions(new Set());
    loadNewQuestion();
    showFeedback('60 seconds • Answer quickly!', 'success');
  };

  const resetGame = () => {
    startGame();
  };

  const handleSubmit = (index) => {
    if (showRationale || !currentQuestion) return;
    
    const isCorrect = index === currentQuestion.correct;
    setSelectedIdx(index);
    setShowRationale(true);
    setTotalAttempted(prev => prev + 1);
    
    if (isCorrect) {
      const basePoints = 15;
      const comboBonus = Math.floor(combo / 3) * 5;
      const totalPoints = basePoints + comboBonus;
      
      setScore(prev => prev + totalPoints);
      setTotalCorrect(prev => prev + 1);
      setCombo(prev => {
        const newCombo = prev + 1;
        if (newCombo > 0 && newCombo % 3 === 0) {
          playSound('combo');
          showFeedback(`🔥 ${newCombo}x Combo! +${comboBonus} bonus!`, 'success');
        }
        return newCombo;
      });
      showFeedback(`✓ Correct! +${totalPoints}`, 'success');
      playSound('correct');
      
      const questionIdx = DRILL_SET.findIndex(q => q.id === currentQuestion.id);
      setCompletedQuestions(prev => new Set([...prev, questionIdx]));
    } else {
      setCombo(0);
      showFeedback(`✗ Incorrect`, 'error');
      playSound('wrong');
    }
  };

  const nextQuestion = () => {
    setFeedback('');
    setFeedbackType('');
    const available = getAvailableQuestions();
    
    if (available.length === 0) {
      setGameState('complete');
    } else {
      loadNewQuestion();
    }
  };

  const getAccuracy = () => {
    return totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 100;
  };

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, timeLeft]);

  useEffect(() => {
    }
  }, [status, router]);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/drills/academic" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Academic Drills
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Inference Analytics</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Critical reasoning • 12 unique passages</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Board - Drill Specific */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<BookOpen className="text-purple-600" />} value={`${completedQuestions.size}/12`} label="Completed" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-emerald-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle2 className="text-green-600" />} value={totalCorrect} label="Correct" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#0a0a0a" : "#ffffff",
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center p-8 overflow-y-auto">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Scale className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Inference Analytics</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • 12 unique passages</p>
                  <button 
                    onClick={startGame} 
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && currentQuestion && (
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${isBoxDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    {currentQuestion.category}
                  </span>
                </div>

                <div className={`mb-6 p-6 rounded-xl border-l-4 border-blue-500 italic text-base ${isBoxDarkMode ? 'bg-gray-800/50 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
                  "{currentQuestion.stimulus}"
                </div>

                <h3 className={`text-lg font-bold mb-6 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {currentQuestion.question}
                </h3>

                <div className="grid gap-3 mb-6">
                  {currentQuestion.options.map((option, i) => {
                    const isCorrect = i === currentQuestion.correct;
                    const isSelected = i === selectedIdx;
                    
                    return (
                      <button
                        key={i}
                        disabled={showRationale}
                        onClick={() => handleSubmit(i)}
                        className={`p-4 rounded-xl text-left font-medium transition-all border-2 ${
                          showRationale
                            ? isCorrect 
                              ? 'bg-green-500/20 border-green-500 text-green-600 dark:text-green-400' 
                              : isSelected ? 'bg-red-500/20 border-red-500 text-red-600 dark:text-red-400' : `opacity-50 ${isBoxDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`
                            : `${isBoxDarkMode ? 'border-gray-700 text-gray-200 hover:border-blue-500 hover:bg-gray-700/50' : 'border-gray-200 text-gray-700 hover:border-blue-500 hover:bg-blue-50'}`
                        } flex items-center justify-between`}
                      >
                        <span>{option}</span>
                        {showRationale && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        {showRationale && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                      </button>
                    );
                  })}
                </div>

                {showRationale && (
                  <div className={`p-5 rounded-xl ${isBoxDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className={`text-sm font-bold mb-2 ${isBoxDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Rationale:</p>
                    <p className={`text-sm ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{currentQuestion.rational}</p>
                    <button 
                      onClick={nextQuestion} 
                      className="mt-4 w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                    >
                      NEXT QUESTION <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Award className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Complete!</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Completed" value={`${completedQuestions.size}/12`} icon={<BookOpen className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Correct" value={totalCorrect} icon={<CheckCircle2 className="w-4 h-4" />} color="text-emerald-500" />
                    <ResultCard label="Max Combo" value={`${combo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Play Again →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Complete Screen (Mastery) */}
            {gameState === 'complete' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Mastery Achieved!</h3>
                  </div>
                  
                  <p className={`text-center mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    You've completed all 12 passages!
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Correct" value={totalCorrect} icon={<CheckCircle2 className="w-4 h-4" />} color="text-emerald-500" />
                    <ResultCard label="Max Combo" value={`${combo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Time Left" value={`${timeLeft}s`} icon={<Timer className="w-4 h-4" />} color="text-blue-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Play Again →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rules Section */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Read the <span className="font-semibold text-blue-500">stimulus passage</span> carefully</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct answer: <span className="font-semibold text-green-500">15 points + combo bonus</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 correct = <span className="font-semibold text-orange-500">+5 combo bonus</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong answer: <span className="font-semibold text-red-500">0 points</span> + combo resets</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-purple-500">60 seconds</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Questions <span className="font-semibold text-yellow-500">never repeat</span> within a session</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>📚 6 categories • Detailed rationales after each answer</span>
                  <span>🏆 Best Score saves locally</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-3 text-center flex flex-col justify-center h-full ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center">{icon}</div>
      <p className={`text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color }) {
  const bgColor = color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-emerald-500' ? 'bg-emerald-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 'bg-blue-500/10';
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${bgColor}`}>
      <div className="flex items-center gap-2">
        <div className={color}>{icon}</div>
        <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      </div>
      <span className={`font-bold text-lg ${color}`}>{value}{unit}</span>
    </div>
  );
}