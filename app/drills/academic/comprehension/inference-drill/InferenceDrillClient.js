'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Zap, Award, 
  Volume2, VolumeX, Sun, Moon, 
  Eye, Maximize2, Minimize2, Timer,
  ArrowLeft, Target, Activity, AlertCircle,
  Scale, CheckCircle2, XCircle, Trophy,
  Brain, ChevronRight, BarChart3, Info, RefreshCw,
  Crosshair, Dumbbell, Database, Keyboard, Star, Users,
  GraduationCap, Lightbulb, TrendingUp, Clock, FileText, ArrowRight, Sparkles, Hash
} from 'lucide-react';

export default function InferenceDrillClient() {
  const [loading, setLoading] = useState(true);
  
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
  const [isDarkMode, setIsDarkMode] = useState(true);
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
  const questionIdxMapRef = useRef(new Map());

  useEffect(() => { DRILL_SET.forEach((q, idx) => { questionIdxMapRef.current.set(q.id, idx); }); }, [DRILL_SET]);
  useEffect(() => { setIsClient(true); }, []);

  const getAvailableQuestions = useCallback(() => { return DRILL_SET.filter((_, idx) => !completedQuestions.has(idx)); }, [completedQuestions, DRILL_SET]);
  const loadNewQuestion = useCallback(() => { const available = getAvailableQuestions(); if (available.length === 0) { setGameState('complete'); return; } const randomQuestion = available[Math.floor(Math.random() * available.length)]; setCurrentQuestion(randomQuestion); setSelectedIdx(null); setShowRationale(false); }, [getAvailableQuestions]);

  useEffect(() => { try { const s = localStorage.getItem('comprehensionDrillBestScore'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {} }, []);
  useEffect(() => { if ((gameState === 'gameOver' || gameState === 'complete') && score > bestScore) { setBestScore(score); try { localStorage.setItem('comprehensionDrillBestScore', score.toString()); } catch (e) {} } }, [gameState, score, bestScore]);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { const h = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', h); return () => document.removeEventListener('fullscreenchange', h); }, []);

  const toggleFullscreen = async () => { try { if (!isFullscreen) { const e = containerRef.current; if (e?.requestFullscreen) { await e.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); } } catch (error) { console.error('Fullscreen error:', error); } };
  const showFeedback = useCallback((message, type) => { if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setFeedback(message); setFeedbackType(type); feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 800); }, []);
  const initAudio = useCallback(() => { try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); return audioCtxRef.current; } catch (e) { return null; } }, []);
  const playSound = useCallback((type) => { if (!soundEnabled) return; try { const a = initAudio(); if (!a) return; const o = a.createOscillator(); const g = a.createGain(); o.connect(g); g.connect(a.destination); const n = a.currentTime; if (type === 'correct') { o.frequency.setValueAtTime(880, n); g.gain.setValueAtTime(0.1, n); g.gain.exponentialRampToValueAtTime(0.001, n + 0.15); o.start(n); o.stop(n + 0.15); } else if (type === 'wrong') { o.frequency.setValueAtTime(440, n); g.gain.setValueAtTime(0.1, n); g.gain.exponentialRampToValueAtTime(0.001, n + 0.15); o.start(n); o.stop(n + 0.15); } else if (type === 'combo') { o.frequency.setValueAtTime(1046.5, n); g.gain.setValueAtTime(0.12, n); g.gain.exponentialRampToValueAtTime(0.001, n + 0.2); o.start(n); o.stop(n + 0.2); } } catch (e) {} }, [soundEnabled, initAudio]);

  const startGame = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}
 if (timerRef.current) clearInterval(timerRef.current); setGameState('playing'); setScore(0); setTimeLeft(60); setCombo(0); setTotalCorrect(0); setTotalAttempted(0); setWrongAnswers(0); setCompletedQuestions(new Set()); setSelectedIdx(null); setShowRationale(false); setCurrentQuestion(null); scoreRef.current = 0; setTimeout(() => { const available = DRILL_SET.filter(() => true); if (available.length > 0) { const randomQuestion = available[Math.floor(Math.random() * available.length)]; setCurrentQuestion(randomQuestion); } showFeedback('60 seconds • Answer correctly!', 'success'); }, 50); }, [DRILL_SET, showFeedback]);
  const resetGame = useCallback(() => { if (timerRef.current) clearInterval(timerRef.current); setGameState('start'); setScore(0); setTimeLeft(60); setCombo(0); setTotalCorrect(0); setTotalAttempted(0); setWrongAnswers(0); setCompletedQuestions(new Set()); setCurrentQuestion(null); setSelectedIdx(null); setShowRationale(false); setFeedback(''); setFeedbackType(''); scoreRef.current = 0; }, []);
  const nextQuestion = useCallback(() => { setFeedback(''); setFeedbackType(''); const available = getAvailableQuestions(); if (available.length === 0) { setGameState('complete'); } else { loadNewQuestion(); } }, [getAvailableQuestions, loadNewQuestion]);

  const handleSubmit = useCallback((index) => { if (showRationale || !currentQuestion) return; const isCorrect = index === currentQuestion.correct; setSelectedIdx(index); setShowRationale(true); setTotalAttempted(prev => prev + 1); if (isCorrect) { const pts = 1; scoreRef.current = scoreRef.current + pts; setScore(scoreRef.current); setTotalCorrect(prev => prev + 1); setCombo(prev => { const nc = prev + 1; if (nc > 0 && nc % 3 === 0) { playSound('combo'); showFeedback(`🔥 ${nc}x Combo!`, 'success'); } return nc; }); showFeedback(`✓ Correct! +${pts}`, 'success'); playSound('correct'); const qi = questionIdxMapRef.current.get(currentQuestion.id); if (qi !== undefined) { setCompletedQuestions(prev => { const ns = new Set(prev); ns.add(qi); return ns; }); } } else { setCombo(0); setWrongAnswers(prev => prev + 1); const pp = 1; scoreRef.current = Math.max(0, scoreRef.current - pp); setScore(scoreRef.current); showFeedback(`✗ Incorrect! -${pp} point penalty`, 'error'); playSound('wrong'); } }, [showRationale, currentQuestion, playSound, showFeedback]);
  const getAccuracy = useCallback(() => { return totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 100; }, [totalCorrect, totalAttempted]);

  useEffect(() => { if (gameState === 'playing' && timeLeft > 0) { timerRef.current = setInterval(() => { setTimeLeft(prev => { if (prev <= 1) { setGameState('gameOver'); if (timerRef.current) clearInterval(timerRef.current); return 0; } return prev - 1; }); }, 1000); } return () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } }; }, [gameState]);
  useEffect(() => { return () => { if (timerRef.current) clearInterval(timerRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); }; }, []);

  if (loading || !isClient) {
    return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading inference drill...</p></div></div>);
  }

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Free Inference Drill - Critical Reasoning Practice | SkillDrills', text: 'Sharpen logical reasoning with 12 passages. Free!', url: 'https://skilldrills.online/drills/academic/comprehension/inference-drill' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/academic/comprehension/inference-drill'); alert('Link copied!'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/academic/comprehension/inference-drill'); alert('Link copied!'); };

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li><Link href="/drills/academic" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Academic Drills</Link></li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Comprehension</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-current="page">Inference Drill</li>
          </ol>
        </nav>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex-shrink-0"><Scale className="w-6 h-6 text-white" /></div>
            <div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Inference Analytics</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Critical reasoning • 12 unique passages • 60-second challenge • Free LSAT & GMAT practice</p></div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (<button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset session" aria-label="Reset drill session"><RefreshCw className="w-5 h-5" /></button>)}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={isDarkMode ? 'Light mode' : 'Dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle drill area theme" title="Toggle drill area theme"><Eye className="w-5 h-5" /></button>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'} title={soundEnabled ? 'Mute' : 'Unmute'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
          </div>
        </div>

        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Free Inference Drill - Critical Reasoning Practice for LSAT GMAT GRE CLAT CAT UPSC SSC Banking Exams</h2>
          <p>Sharpen logical reasoning and critical thinking with this free interactive inference drill. Features 12 unique passages spanning logical flaws, necessary assumptions, sufficient assumptions, causal analysis, paradox resolution, argument strengthening, inference drawing, flawed analogies, method of reasoning, argument evaluation, parallel reasoning, and main point identification. Each question includes detailed answer rationales explaining the correct choice. Perfect for LSAT logical reasoning, GMAT critical reasoning, GRE verbal, CLAT, CAT, UPSC, SSC, banking exams, and placement aptitude tests. 60-second timed challenge with score tracking, accuracy monitoring, combo streaks, and best performance saving.</p>
        </section>

        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<BookOpen className="text-purple-600" />} value={`${completedQuestions.size}/12`} label="Completed" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-emerald-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle2 className="text-green-500" />} value={totalCorrect} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<XCircle className="text-red-500" />} value={wrongAnswers} label="Wrong" isDark={isDarkMode} />
        </div>

        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} role="status" aria-live="polite" aria-atomic="true">{feedback || '\u00A0'}</div></div>

        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#0a0a0a" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
          {/* Mobile Rotate Device Warning Overlay */}
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 text-center p-6 md:hidden portrait:flex landscape:hidden" aria-hidden="true">
            <div className="animate-bounce mb-4 text-blue-500">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Rotate Your Device</h3>
            <p className="text-sm text-gray-400">Please rotate your device to landscape orientation for the best training experience.</p>
          </div>

          {isFullscreen && gameState === 'playing' && (<div className="absolute top-4 right-4 z-30 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset session" aria-label="Reset drill session"><RefreshCw className="w-5 h-5" /></button><button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle drill area theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button></div>)}

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
            {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="mb-4"><Scale className="w-16 h-16 text-blue-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Inference Analytics</h2><p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • 12 unique passages</p><p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sharpen critical reasoning with logical flaws, causal analysis, paradox resolution, argument evaluation, inference drawing, flawed analogies, method of reasoning, sufficient and necessary assumptions, parallel reasoning, and main point identification. Detailed rationales after every question.</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Start the free inference drill">Start Free Drill</button></div></div>)}

            {gameState === 'playing' && currentQuestion && (<div className="w-full max-w-3xl"><div className="flex flex-wrap justify-between items-center gap-2 mb-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${isBoxDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>{currentQuestion.category}</span>{combo >= 3 && (<span className={`px-3 py-1 rounded-full text-xs font-bold ${isBoxDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>🔥 {combo}x Combo!</span>)}</div><blockquote className={`mb-6 p-4 sm:p-6 rounded-xl border-l-4 border-blue-500 italic text-sm sm:text-base ${isBoxDarkMode ? 'bg-gray-800/50 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>&ldquo;{currentQuestion.stimulus}&rdquo;</blockquote><h3 className={`text-base sm:text-lg font-bold mb-6 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>{currentQuestion.question}</h3><div className="grid gap-3 mb-6" role="radiogroup" aria-label="Answer options">{currentQuestion.options.map((option, i) => { const isCorrect = i === currentQuestion.correct; const isSelected = i === selectedIdx; const optionLetter = String.fromCharCode(65 + i); return (<button key={i} disabled={showRationale} onClick={() => handleSubmit(i)} role="radio" aria-checked={isSelected} aria-label={`Option ${optionLetter}: ${option}`} className={`p-3 sm:p-4 rounded-xl text-left font-medium transition-all border-2 ${showRationale ? isCorrect ? 'bg-green-500/20 border-green-500 text-green-600 dark:text-green-400' : isSelected ? 'bg-red-500/20 border-red-500 text-red-600 dark:text-red-400' : `opacity-50 cursor-not-allowed ${isBoxDarkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}` : `cursor-pointer ${isBoxDarkMode ? 'border-gray-700 text-gray-200 hover:border-blue-500 hover:bg-gray-700/50' : 'border-gray-200 text-gray-700 hover:border-blue-500 hover:bg-blue-50'}`} flex items-center justify-between`}><span className="flex items-center gap-3"><span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${isBoxDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}`}>{optionLetter}</span><span>{option}</span></span>{showRationale && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" aria-label="Correct answer" />}{showRationale && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" aria-label="Wrong answer" />}</button>); })}</div>{showRationale && (<div className={`p-4 sm:p-5 rounded-xl ${isBoxDarkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}><p className={`text-sm font-bold mb-2 ${isBoxDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>📖 Rationale:</p><p className={`text-sm ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{currentQuestion.rational}</p><button onClick={nextQuestion} className="mt-4 w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">NEXT QUESTION <ChevronRight className="w-4 h-4" /></button></div>)}</div>)}

            {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time&apos;s Up!</h2></div><p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keep practicing to improve critical reasoning speed for LSAT, GMAT, GRE, and competitive exams.</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} /><ResultCard label="Completed" value={`${completedQuestions.size}/12`} icon={<BookOpen className="w-4 h-4" />} color="green" isDark={isBoxDarkMode} /><ResultCard label="Correct" value={totalCorrect} icon={<CheckCircle2 className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} /><ResultCard label="Wrong" value={wrongAnswers} icon={<XCircle className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/academic" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Drills</button></Link><button onClick={resetGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}

            {gameState === 'complete' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Trophy className="w-10 h-10 text-yellow-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Mastery Achieved!</h2></div><p className={`text-center mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>You&apos;ve completed all 12 passages!</p><p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Outstanding critical reasoning skills. Try again to beat your score.</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} /><ResultCard label="Correct" value={totalCorrect} icon={<CheckCircle2 className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} /><ResultCard label="Wrong" value={wrongAnswers} icon={<XCircle className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} /><ResultCard label="Time Left" value={`${timeLeft}s`} icon={<Timer className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/academic" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Drills</button></Link><button onClick={resetGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}
          </div>
        </div>

        {!isFullscreen && (<footer className="mt-6" aria-label="Drill rules and scoring information"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Read the <span className="font-semibold text-blue-500">stimulus passage</span> carefully</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct answer: <span className="font-semibold text-green-500">+1 point</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 correct = <span className="font-semibold text-orange-500">Combo notification</span></p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong answer: <span className="font-semibold text-red-500">-1 point penalty</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-purple-500">60 seconds</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Questions <span className="font-semibold text-yellow-500">never repeat</span> within a session</p></div></div></div><div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}><span>📚 12 topics: Logical Flaws, Assumptions, Causal, Paradox, Analogies, Reasoning</span><span>📊 Score never below 0 • Best Score saves locally • Free forever</span></div></div></div></footer>)}

        {!isFullscreen && (
          <section className="mt-8" aria-label="About this inference drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free Inference Drill</h2>
                </div>
              </div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  This free inference drill is designed to sharpen your critical reasoning and logical thinking abilities through 12 carefully crafted passages. Each passage targets a specific reasoning skill including logical flaws, necessary and sufficient assumptions, causal analysis, paradox resolution, argument strengthening, inference drawing, flawed analogies, method of reasoning, argument evaluation, parallel reasoning, and main point identification. Every question includes detailed answer rationales explaining the logical principles behind the correct choice.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>LSAT, GMAT, GRE, CLAT, CAT, UPSC, SSC, banking exam aspirants, law students, consultants, and anyone seeking sharper analytical thinking skills.</p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Logical reasoning, argument analysis, inference drawing, critical thinking speed, identifying flawed reasoning, and reading comprehension.</p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score, accuracy percentage, combo streaks, questions completed out of 12, and detailed answer review with rationales.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice Critical Reasoning?</h3>
                    </div>
                    <ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Essential for LSAT Logical Reasoning section (50% of score)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> GMAT Critical Reasoning tests identical question types</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Improves decision-making in professional and personal life</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Builds immunity to logical fallacies in media and advertising</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Strengthens analytical writing for essays and reports</li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-orange-50 border-orange-100'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Effectively</h3>
                    </div>
                    <ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span> Read the stimulus passage carefully before viewing options</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span> Identify the question category to know what to look for</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span> Eliminate clearly wrong answers first, then compare remaining</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span> Study the detailed rationale after each answer to learn the logic</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">5</span> Practice 2-3 times daily for best improvement in 2-3 weeks</li>
                    </ol>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-indigo-50 border-indigo-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center"><FileText className="w-4 h-4 text-white" /></div>
                    <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>12 Critical Reasoning Topics Covered</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Logical Flaws', 'Necessary Assumptions', 'Sufficient Assumptions', 'Causal Analysis', 'Paradox Resolution', 'Argument Strengthening', 'Inference Drawing', 'Flawed Analogies', 'Method of Reasoning', 'Argument Evaluation', 'Parallel Reasoning', 'Main Point Identification'].map(topic => (
                      <span key={topic} className={`text-xs px-2.5 py-1 rounded-full font-medium ${isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-white text-indigo-700 border border-indigo-200'}`}>{topic}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <section className="mt-8" aria-label="Related training drills and resources">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600"></div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Free Drills</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/academic/comprehension/reading-comprehension" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><BookOpen className="w-4 h-4 text-emerald-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Comprehension</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-emerald-400' : 'text-gray-900 group-hover:text-emerald-600'} transition-colors`}>Reading Comprehension</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Fresh passages with scored quizzes across 3 difficulty levels and adjustable WPM.</p>
                  <div className="flex items-center gap-1 mt-3 text-emerald-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/academic/comprehension/listening-comprehension" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-cyan-500' : 'bg-white border-gray-200 hover:border-cyan-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center"><Volume2 className="w-4 h-4 text-cyan-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Comprehension</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>Listening Comprehension</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>9 audio passages with male/female voices, transcript option, and recall questions.</p>
                  <div className="flex items-center gap-1 mt-3 text-cyan-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/cognitive/problem-solving/logic-puzzles" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Brain className="w-4 h-4 text-purple-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Cognitive</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>Logic Puzzles</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Solve complex deductive reasoning and pattern recognition puzzles under time pressure.</p>
                  <div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/cognitive/processing-speed/quick-math" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Zap className="w-4 h-4 text-orange-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Processing Speed</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Quick Math</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Rapid fire mental arithmetic practice for competitive exams and brain training.</p>
                  <div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/academic/writing-speed/typing-test" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-rose-500' : 'bg-white border-gray-200 hover:border-rose-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center"><Keyboard className="w-4 h-4 text-rose-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Writing Speed</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-rose-400' : 'text-gray-900 group-hover:text-rose-600'} transition-colors`}>Typing Speed Test</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>WPM test with 30 quotes across Easy/Medium/Hard levels and real-time feedback.</p>
                  <div className="flex items-center gap-1 mt-3 text-rose-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/cognitive/memory/number-recall" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><Hash className="w-4 h-4 text-teal-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Number Recall</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Memorize and reproduce increasingly long number sequences accurately.</p>
                  <div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/cognitive/focus/concentration-grid" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Target className="w-4 h-4 text-blue-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Focus</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Concentration Grid</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Find numbers in sequence under time pressure to build sustained attention.</p>
                  <div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/productivity/focus-endurance/deep-work" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Timer className="w-4 h-4 text-red-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Productivity</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-red-400' : 'text-gray-900 group-hover:text-red-600'} transition-colors`}>Deep Work Timer</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Build focus endurance with structured deep work sessions for study and productivity.</p>
                  <div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {!isFullscreen && (<footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8"><div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Academic</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li><li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li><li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Visual & Motor</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target Tracking</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div></div><div className="border-t border-gray-800 pt-8 text-center"><div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-white" aria-hidden="true" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div><p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p><p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online inference drill for critical reasoning practice. Sharpen logical thinking for LSAT, GMAT, GRE, CLAT, CAT, UPSC, SSC, banking, and placement exams. 12 unique passages with detailed rationales. No registration required. More free drills at skilldrills.online.</p><div className="flex items-center justify-center gap-5 flex-wrap"><button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share this drill" aria-label="Share this free inference drill"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button><button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link" aria-label="Copy drill link to clipboard"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></button><a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Twitter X" aria-label="Follow SkillDrills on Twitter X"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Instagram" aria-label="Follow SkillDrills on Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a><a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Subscribe on YouTube" aria-label="Subscribe to SkillDrills on YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a><a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Pinterest" aria-label="Follow SkillDrills on Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>);
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = { yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' }, purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' }, emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' }, red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' }, blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' } };
  const colors = colorMap[color] || colorMap.blue;
  return (<div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}><div className="flex items-center gap-2 min-w-0"><div className={colors.icon} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span></div>);
}