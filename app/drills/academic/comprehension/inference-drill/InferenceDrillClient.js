'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Zap, Award, 
  Volume2, VolumeX, Sun, Moon, 
  Eye, Maximize2, Minimize2, Timer,
  ArrowLeft, Target, Activity, AlertCircle,
  Scale, CheckCircle2, XCircle, Trophy,
  Brain, ChevronRight, BarChart3, Info, RefreshCw
} from 'lucide-react';

export default function InferenceDrillClient() {
  const [loading, setLoading] = useState(true);
  
  // Professional Inference Database - 12 Unique Passages
  const DRILL_SET = useMemo(() => [
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
  ], []);

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
  const [wrongAnswers, setWrongAnswers] = useState(0);
  
  // UI State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);

  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const scoreRef = useRef(0);
  const questionIdxMapRef = useRef(new Map()); // Maps question id to DRILL_SET index

  // Initialize question index map
  useEffect(() => {
    DRILL_SET.forEach((q, idx) => {
      questionIdxMapRef.current.set(q.id, idx);
    });
  }, [DRILL_SET]);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
  }, []);

  const getAvailableQuestions = useCallback(() => {
    return DRILL_SET.filter((_, idx) => !completedQuestions.has(idx));
  }, [completedQuestions, DRILL_SET]);

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
    try {
      const savedBestScore = localStorage.getItem('comprehensionDrillBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) {
          setBestScore(parsed);
        }
      }
    } catch (e) {
      // localStorage not available
    }
  }, []);

  // Update best score
  useEffect(() => {
    if ((gameState === 'gameOver' || gameState === 'complete') && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('comprehensionDrillBestScore', score.toString());
      } catch (e) {
        // localStorage not available
      }
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
        if (element?.requestFullscreen) {
          await element.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  }, []);

  const initAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch (e) {
      return null;
    }
  }, []);

  // Play sound
  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      if (!audioCtx) return;
      
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      const now = audioCtx.currentTime;
      
      if (type === 'correct') {
        oscillator.frequency.setValueAtTime(880, now);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        oscillator.start(now);
        oscillator.stop(now + 0.15);
      } else if (type === 'wrong') {
        oscillator.frequency.setValueAtTime(440, now);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        oscillator.start(now);
        oscillator.stop(now + 0.15);
      } else if (type === 'combo') {
        oscillator.frequency.setValueAtTime(1046.5, now);
        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        oscillator.start(now);
        oscillator.stop(now + 0.2);
      }
    } catch (e) {
      // Audio not supported
    }
  }, [soundEnabled, initAudio]);

  const startGame = useCallback(() => {
    // Clear any existing timer
    if (timerRef.current) clearInterval(timerRef.current);
    
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setCombo(0);
    setTotalCorrect(0);
    setTotalAttempted(0);
    setWrongAnswers(0);
    setCompletedQuestions(new Set());
    setSelectedIdx(null);
    setShowRationale(false);
    setCurrentQuestion(null);
    
    scoreRef.current = 0;
    
    // Load first question after state reset
    setTimeout(() => {
      const available = DRILL_SET.filter((_, idx) => {
        // Fresh start, no completed questions
        return true;
      });
      if (available.length > 0) {
        const randomQuestion = available[Math.floor(Math.random() * available.length)];
        setCurrentQuestion(randomQuestion);
      }
      showFeedback('60 seconds • Answer correctly!', 'success');
    }, 50);
  }, [DRILL_SET, showFeedback]);

  const resetGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('start');
    setScore(0);
    setTimeLeft(60);
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
    
    scoreRef.current = 0;
  }, []);

  const nextQuestion = useCallback(() => {
    setFeedback('');
    setFeedbackType('');
    const available = getAvailableQuestions();
    
    if (available.length === 0) {
      setGameState('complete');
    } else {
      loadNewQuestion();
    }
  }, [getAvailableQuestions, loadNewQuestion]);

  const handleSubmit = useCallback((index) => {
    if (showRationale || !currentQuestion) return;
    
    const isCorrect = index === currentQuestion.correct;
    setSelectedIdx(index);
    setShowRationale(true);
    setTotalAttempted(prev => prev + 1);
    
    if (isCorrect) {
      const pointsEarned = 1;
      scoreRef.current = scoreRef.current + pointsEarned;
      setScore(scoreRef.current);
      setTotalCorrect(prev => prev + 1);
      setCombo(prev => {
        const newCombo = prev + 1;
        if (newCombo > 0 && newCombo % 3 === 0) {
          playSound('combo');
          showFeedback(`🔥 ${newCombo}x Combo!`, 'success');
        }
        return newCombo;
      });
      showFeedback(`✓ Correct! +${pointsEarned}`, 'success');
      playSound('correct');
      
      // Use the map to find the index
      const questionIdx = questionIdxMapRef.current.get(currentQuestion.id);
      if (questionIdx !== undefined) {
        setCompletedQuestions(prev => {
          const newSet = new Set(prev);
          newSet.add(questionIdx);
          return newSet;
        });
      }
    } else {
      setCombo(0);
      setWrongAnswers(prev => prev + 1);
      
      const penaltyPoints = 1;
      scoreRef.current = Math.max(0, scoreRef.current - penaltyPoints);
      setScore(scoreRef.current);
      
      showFeedback(`✗ Incorrect! -${penaltyPoints} point penalty`, 'error');
      playSound('wrong');
    }
  }, [showRationale, currentQuestion, playSound, showFeedback]);

  const getAccuracy = useCallback(() => {
    return totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 100;
  }, [totalCorrect, totalAttempted]);

  // Timer effect - Fixed to prevent memory leaks
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading inference drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SEO Structured Data - Hidden from view but readable by search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Inference Analytics Drill",
            "url": "https://skilldrills.online/drills/academic/comprehension/inference-drill",
            "description": "Interactive critical reasoning drill with 12 unique passages covering logical flaws, causal analysis, argument evaluation, and inference drawing. 60-second timed challenge with detailed answer rationales.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "SkillDrills"
            },
            "educationalUse": ["Critical Thinking", "Logical Reasoning", "Test Preparation", "LSAT Practice", "GMAT Practice"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Inference", "Logical Flaws", "Causal Reasoning", "Argument Analysis", "Critical Reading"]
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation - SEO Friendly */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Home
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li>
              <Link href="/drills/academic" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Academic Drills
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Comprehension
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-current="page">
              Inference Drill
            </li>
          </ol>
        </nav>
        
        {/* Header with Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex-shrink-0">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Inference Analytics
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Critical reasoning • 12 unique passages • 60-second challenge
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {/* Reset button - only visible during gameplay */}
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset drill session"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Light mode' : 'Dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label="Toggle drill area theme"
              title="Toggle drill area theme"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button 
              onClick={toggleFullscreen} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* SEO Content - Visible to search engines, hidden from users */}
        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Inference Drill - Critical Reasoning Practice</h2>
          <p>
            Sharpen your logical reasoning and critical thinking abilities with this interactive inference drill. 
            Features 12 unique passages spanning 6 categories: Logical Flaws, Necessary Assumptions, Causal Analysis, 
            Paradox Resolution, Argument Strengthening, Inference Drawing, Flawed Analogies, Method of Reasoning, 
            Sufficient Assumptions, Argument Evaluation, Parallel Reasoning, and Main Point Identification. 
            Each question includes detailed answer rationales explaining the correct choice. 
            This 60-second timed challenge tracks your score, accuracy, and best performance.
          </p>
        </section>

        {/* Stats Board - 7 columns */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<BookOpen className="text-purple-600" />} value={`${completedQuestions.size}/12`} label="Completed" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-emerald-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle2 className="text-green-500" />} value={totalCorrect} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<XCircle className="text-red-500" />} value={wrongAnswers} label="Wrong" isDark={isDarkMode} />
        </div>

        {/* Live Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${
              feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${
              feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedback || '\u00A0'}
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#0a0a0a" : "#ffffff",
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {/* Fullscreen Controls Overlay */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
                aria-label="Reset drill session"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle drill area theme">
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen">
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
            
            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Scale className="w-16 h-16 text-blue-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Inference Analytics
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    60-second challenge • 12 unique passages
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Sharpen your critical reasoning with logical flaws, causal analysis, paradox resolution, and more.
                  </p>
                  <button 
                    onClick={startGame} 
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Start the inference drill"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && currentQuestion && (
              <div className="w-full max-w-3xl">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${isBoxDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    {currentQuestion.category}
                  </span>
                  {combo >= 3 && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${isBoxDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                      🔥 {combo}x Combo!
                    </span>
                  )}
                </div>

                <blockquote className={`mb-6 p-4 sm:p-6 rounded-xl border-l-4 border-blue-500 italic text-sm sm:text-base ${isBoxDarkMode ? 'bg-gray-800/50 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
                  &ldquo;{currentQuestion.stimulus}&rdquo;
                </blockquote>

                <h3 className={`text-base sm:text-lg font-bold mb-6 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {currentQuestion.question}
                </h3>

                <div className="grid gap-3 mb-6" role="radiogroup" aria-label="Answer options">
                  {currentQuestion.options.map((option, i) => {
                    const isCorrect = i === currentQuestion.correct;
                    const isSelected = i === selectedIdx;
                    const optionLetter = String.fromCharCode(65 + i); // A, B, C, D
                    
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
                              ? 'bg-green-500/20 border-green-500 text-green-600 dark:text-green-400' 
                              : isSelected ? 'bg-red-500/20 border-red-500 text-red-600 dark:text-red-400' : `opacity-50 cursor-not-allowed ${isBoxDarkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`
                            : `cursor-pointer ${isBoxDarkMode ? 'border-gray-700 text-gray-200 hover:border-blue-500 hover:bg-gray-700/50' : 'border-gray-200 text-gray-700 hover:border-blue-500 hover:bg-blue-50'}`
                        } flex items-center justify-between`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                            isBoxDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'
                          }`}>
                            {optionLetter}
                          </span>
                          <span>{option}</span>
                        </span>
                        {showRationale && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" aria-label="Correct answer" />}
                        {showRationale && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" aria-label="Wrong answer" />}
                      </button>
                    );
                  })}
                </div>

                {showRationale && (
                  <div className={`p-4 sm:p-5 rounded-xl ${isBoxDarkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                    <p className={`text-sm font-bold mb-2 ${isBoxDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      📖 Rationale:
                    </p>
                    <p className={`text-sm ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {currentQuestion.rational}
                    </p>
                    <button 
                      onClick={nextQuestion} 
                      className="mt-4 w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      NEXT QUESTION <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ============ GAME OVER SCREEN ============ */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                    <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Time&apos;s Up!
                    </h2>
                  </div>
                  
                  <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Keep practicing to improve your critical reasoning speed and accuracy.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Completed" value={`${completedQuestions.size}/12`} icon={<BookOpen className="w-4 h-4" />} color="green" isDark={isBoxDarkMode} />
                    <ResultCard label="Correct" value={totalCorrect} icon={<CheckCircle2 className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Wrong" value={wrongAnswers} icon={<XCircle className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Play Again →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ============ COMPLETE SCREEN (Mastery) ============ */}
            {gameState === 'complete' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Trophy className="w-10 h-10 text-yellow-500" aria-hidden="true" />
                    <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Mastery Achieved!
                    </h2>
                  </div>
                  
                  <p className={`text-center mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    You&apos;ve completed all 12 passages!
                  </p>
                  <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Outstanding critical reasoning. Try again to beat your score.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Correct" value={totalCorrect} icon={<CheckCircle2 className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Wrong" value={wrongAnswers} icon={<XCircle className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                    <ResultCard label="Time Left" value={`${timeLeft}s`} icon={<Timer className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Play Again →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rules & Info Section */}
        {!isFullscreen && (
          <footer className="mt-6" aria-label="Drill rules and scoring information">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Read the <span className="font-semibold text-blue-500">stimulus passage</span> carefully</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct answer: <span className="font-semibold text-green-500">+1 point</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 correct = <span className="font-semibold text-orange-500">Combo notification</span></p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong answer: <span className="font-semibold text-red-500">-1 point penalty</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-purple-500">60 seconds</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Questions <span className="font-semibold text-yellow-500">never repeat</span> within a session</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>📚 6 categories: Logical Flaws, Assumptions, Causal, Paradox, Analogies, Reasoning</span>
                  <span>📊 Score never goes below 0 • Best Score saves locally</span>
                </div>
              </div>
            </div>
          </footer>
        )}

        {/* Related Drills - Internal Linking for SEO */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="Related training drills">
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Explore Related Drills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link 
                href="/drills/academic/comprehension/reading-comprehension"
                className={`block p-4 rounded-xl border transition-all hover:shadow-md hover:scale-[1.02] ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Reading Comprehension
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Improve text understanding and analysis speed
                </p>
              </Link>
              
              <Link 
                href="/drills/academic/comprehension/listening-comprehension"
                className={`block p-4 rounded-xl border transition-all hover:shadow-md hover:scale-[1.02] ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Listening Comprehension
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Sharpen audio processing and retention skills
                </p>
              </Link>
              
              <Link 
                href="/drills/cognitive/problem-solving/logic-puzzles"
                className={`block p-4 rounded-xl border transition-all hover:shadow-md hover:scale-[1.02] ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Logic Puzzles
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Solve complex logic problems under time pressure
                </p>
              </Link>
              
              <Link 
                href="/drills/cognitive/processing-speed/quick-math"
                className={`block p-4 rounded-xl border transition-all hover:shadow-md hover:scale-[1.02] ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Quick Math
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Boost mental calculation speed and accuracy
                </p>
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ============ HELPER COMPONENTS ============

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div>
      <p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = {
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
  };
  
  const colors = colorMap[color] || colorMap.blue;
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={colors.icon} aria-hidden="true">{icon}</div>
        <span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span>
    </div>
  );
}