'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { 
  Keyboard, Zap, Award, 
  Volume2, VolumeX, Maximize2, Minimize2, Timer,
  Target, Activity,
  Play, CheckCircle2, Brain, Trophy,
  RefreshCw, XCircle, SkipForward,
  GraduationCap, TrendingUp, ArrowRight,
  Code2, Hash, Share2, LogOut, Lightbulb, Info, BookOpen, ChevronRight, BarChart3
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
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { return; }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
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
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
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
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
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
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.12);
        osc.stop(this.ctx.currentTime + i * 0.12 + 0.2);
      });
    } catch(e) {}
  }
  
  setEnabled(status) { this.enabled = status; }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function EndlessTypingClient() {
  // === UI State ===
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // === Game State ===
  const [gameState, setGameState] = useState('start'); // start | playing | gameOver
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [input, setInput] = useState('');
  const [targetText, setTargetText] = useState('');
  
  // === Live Metrics ===
  const [liveWpm, setLiveWpm] = useState(0);
  const [liveAccuracy, setLiveAccuracy] = useState(100);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [quotesCompleted, setQuotesCompleted] = useState(0);
  const [elapsedTimeStr, setElapsedTimeStr] = useState('00:00');

  // === Feedback ===
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isNewBest, setIsNewBest] = useState(false);

  const STORAGE_BEST_KEY = 'endlessTyping_bestScore_v1';

  // === Refs for Performance ===
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const globalTimerRef = useRef(null);
  
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const quotesRef = useRef(0);
  
  // Timing & Accuracy Trackers
  const sessionStartTimeRef = useRef(null);
  const phraseStartTimeRef = useRef(null);
  const globalCorrectCharsRef = useRef(0);
  const globalTotalTypedRef = useRef(0);
  const mountedRef = useRef(false);

  const QUOTES = useMemo(() => ({
    EASY: [
      "The quick brown fox jumps over the lazy dog.",
      "Success is not final and failure is not fatal.",
      "A journey of a thousand miles begins with a single step.",
      "Kindness is a language that the deaf can hear.",
      "Learning new skills requires patience and practice.",
      "The sun sets beautifully over the calm ocean waves.",
      "Reading is to the mind what exercise is to the body.",
      "Every expert was once a beginner who refused to quit.",
      "Small acts of compassion can change someone's world.",
      "Music has the power to heal the soul and unite us."
    ],
    MEDIUM: [
      "The efficiency of a system is often dictated by the friction within its smallest components.",
      "Strategic autonomy requires a synthesis of rapid decision-making and long-term vision.",
      "Quantum computing leverages the principles of superposition and entanglement.",
      "Environmental sustainability demands a fundamental restructuring of industrial processes.",
      "The rapid expansion of neural networks has fundamentally altered pattern recognition.",
      "Cryptocurrency and blockchain technology represent a decentralized approach to finance.",
      "Effective leadership requires emotional intelligence alongside technical competence.",
      "The intersection of artificial intelligence and biomedical research promises to accelerate discovery.",
      "Urban planning in the twenty-first century must balance population density with quality of life.",
      "The philosophical implications of consciousness studies challenge our understanding of reality."
    ],
    HARD: [
      "Neuroplasticity demonstrates that the brain's architecture remains malleable throughout adulthood, continuously reorganizing synaptic connections in response to novel stimuli.",
      "The epistemological foundations of scientific inquiry rest upon falsifiability and empirical verification, demanding rigorous experimental scrutiny.",
      "Cryptographic protocols utilizing elliptic curve mathematics provide robust security guarantees through the computational intractability of the discrete logarithm problem.",
      "The hermeneutic tradition in continental philosophy emphasizes the circular nature of interpretation, wherein understanding emerges through iterative engagement.",
      "Mitochondrial dysfunction represents a central mechanism in the pathophysiology of numerous neurodegenerative disorders, disrupting cellular energy homeostasis.",
      "Stochastic gradient descent optimization algorithms navigate high-dimensional loss landscapes to identify parametric configurations that minimize predictive error.",
      "Quantum entanglement challenges classical intuitions about locality and causality, suggesting spatially separated particles can exhibit correlated behaviors.",
      "The intersectionality framework in critical social theory illuminates how overlapping systems of oppression create unique experiential phenomena.",
      "Phenomenological approaches to consciousness studies bracket presuppositional frameworks to examine the pure structures of first-person experience.",
      "The geopolitical ramifications of climate change extend beyond environmental considerations, encompassing resource allocation conflicts and mass migration."
    ]
  }), []);

  const getRandomQuote = useCallback((diff) => {
    const quotes = QUOTES[diff];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, [QUOTES]);

  useEffect(() => { 
    setIsClient(true);
    mountedRef.current = true;
    setTargetText(getRandomQuote('MEDIUM'));
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
  }, [getRandomQuote]);

  useEffect(() => { 
    const h = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', h); 
    return () => document.removeEventListener('fullscreenchange', h); 
  }, []);

  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

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

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      } else if (isFullscreen && document.fullscreenElement) {
        await document.exitFullscreen(); 
      }
    } catch (error) {} 
  }, [isFullscreen]);

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

  // Format MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Start the global timer for elapsed time & live metrics
  const startGlobalTimer = useCallback(() => {
    if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    sessionStartTimeRef.current = Date.now();
    
    globalTimerRef.current = setInterval(() => {
      const now = Date.now();
      const totalSeconds = Math.floor((now - sessionStartTimeRef.current) / 1000);
      setElapsedTimeStr(formatTime(totalSeconds));
    }, 1000);
  }, []);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    await enterFullscreen();
    
    setTargetText(getRandomQuote(difficulty));
    setInput('');
    setGameState('playing');
    
    // Reset Stats
    scoreRef.current = 0;
    comboRef.current = 0;
    quotesRef.current = 0;
    globalCorrectCharsRef.current = 0;
    globalTotalTypedRef.current = 0;
    
    setScore(0);
    setCombo(0);
    setQuotesCompleted(0);
    setLiveWpm(0);
    setLiveAccuracy(100);
    setIsNewBest(false);
    
    startGlobalTimer();
    phraseStartTimeRef.current = Date.now();
    
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
    
    showFeedbackMsg('Endless Mode Started! Type accurately.', 'success');
  }, [difficulty, getRandomQuote, startGlobalTimer, showFeedbackMsg]);

  const endGame = useCallback(async () => {
    if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    
    const endScore = scoreRef.current;
    if (endScore > bestScore && endScore > 0) {
      setIsNewBest(true);
      setBestScore(endScore);
      try { localStorage.setItem(STORAGE_BEST_KEY, endScore.toString()); } catch (e) {}
    }
    
    if (audioSynth) audioSynth.playComplete();
    setGameState('gameOver');
    await exitFullscreen();
  }, [bestScore]);

  const skipQuote = useCallback(() => {
    setTargetText(getRandomQuote(difficulty));
    setInput('');
    phraseStartTimeRef.current = Date.now(); // Reset phrase timer so WPM isn't ruined
    comboRef.current = 0;
    setCombo(0);
    if (inputRef.current) inputRef.current.focus();
    showFeedbackMsg('Quote Skipped. Combo Reset.', 'error');
  }, [difficulty, getRandomQuote, showFeedbackMsg]);

  const handleInputChange = useCallback((e) => {
    const val = e.target.value;
    setInput(val);
    
    const now = Date.now();
    let correct = 0;
    
    // Calculate live phrase correctness
    for (let i = 0; i < val.length; i++) {
      if (val[i] === targetText[i]) correct++;
    }
    
    // Live WPM for current phrase
    const timeElapsedMins = (now - phraseStartTimeRef.current) / 60000;
    const currentWpm = timeElapsedMins > 0 ? Math.round((correct / 5) / timeElapsedMins) : 0;
    setLiveWpm(currentWpm);
    
    // Live Accuracy
    const accuracy = val.length > 0 ? Math.round((correct / val.length) * 100) : 100;
    setLiveAccuracy(accuracy);

    // Quote Completed!
    if (val === targetText) {
      // 1. Calculate Score for this phrase
      const diffMultiplier = difficulty === 'HARD' ? 2 : difficulty === 'MEDIUM' ? 1.5 : 1;
      
      // Points = WPM * Difficulty * (Accuracy / 100)
      // This naturally rewards speed and accuracy without explicit negative points.
      const earnedPoints = Math.round(currentWpm * diffMultiplier * (accuracy / 100));
      
      scoreRef.current += earnedPoints;
      setScore(scoreRef.current);
      
      // Update Globals
      globalCorrectCharsRef.current += correct;
      globalTotalTypedRef.current += val.length;
      quotesRef.current += 1;
      setQuotesCompleted(quotesRef.current);
      
      // Combo Logic
      comboRef.current += 1;
      setCombo(comboRef.current);
      
      if (comboRef.current % 3 === 0 && comboRef.current > 0) {
        if (audioSynth) audioSynth.playCombo();
        const comboBonus = comboRef.current * 5;
        scoreRef.current += comboBonus;
        setScore(scoreRef.current);
        showFeedbackMsg(`🔥 ${comboRef.current}x Combo! +${earnedPoints + comboBonus} PTS`, 'success');
      } else {
        if (audioSynth) audioSynth.playCorrect();
        showFeedbackMsg(`✓ +${earnedPoints} PTS (${currentWpm} WPM)`, 'success');
      }
      
      // Load next phrase
      setTargetText(getRandomQuote(difficulty));
      setInput('');
      phraseStartTimeRef.current = Date.now();
    }
  }, [targetText, difficulty, getRandomQuote, showFeedbackMsg]);

  const resetGame = useCallback(() => {
    if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    setInput('');
    setFeedback('');
    setScore(0);
    setLiveWpm(0);
    setLiveAccuracy(100);
    setCombo(0);
    setQuotesCompleted(0);
    setElapsedTimeStr('00:00');
    setIsNewBest(false);
    
    scoreRef.current = 0;
    comboRef.current = 0;
    quotesRef.current = 0;
    globalCorrectCharsRef.current = 0;
    globalTotalTypedRef.current = 0;
  }, []);

  const shareDrillLink = async () => { 
    const url = 'https://skilldrills.online/drills/academic/writing-speed/typing-test';
    if (navigator.share) { 
      try { 
        await navigator.share({ 
          title: 'Endless Typing Speed Test | SkillDrills', 
          text: 'Practice typing with an untimed endless mode based purely on speed and accuracy. Free!', 
          url 
        }); 
      } catch (e) {} 
    } else { 
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {}); 
    } 
  };

  // Calculate final session accuracy for End Screen
  const finalAccuracy = globalTotalTypedRef.current > 0 
    ? Math.round((globalCorrectCharsRef.current / globalTotalTypedRef.current) * 100) 
    : 0;

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(225,29,72,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - finalAccuracy;

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
            <li className="text-gray-500">Writing Speed</li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-rose-400 font-medium">Typing Speed Test</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.3)]">
              <Keyboard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Typing Speed Test</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Endless Mode • Speed & Accuracy • No Time Limit</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {gameState !== 'start' && (
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
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-rose-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className="text-blue-400" />} value={elapsedTimeStr} label="Time" />
          <StatCard icon={<Zap className="text-yellow-400" />} value={liveWpm} label="Live WPM" />
          <StatCard icon={<Activity className="text-green-400" />} value={liveAccuracy} label="Accuracy" unit="%" />
          <StatCard icon={<CheckCircle2 className="text-emerald-400" />} value={quotesCompleted} label="Quotes" />
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
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-rose-900/10" />

          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-[60] flex gap-2">
              <button onClick={skipQuote} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors" title="Skip Quote"><SkipForward className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors" title="Toggle Sound">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors" title="Toggle Fullscreen"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onClick={endGame} className="p-2.5 sm:p-3 bg-red-900/40 border border-red-700/50 rounded-xl text-red-400 hover:bg-red-900/60 transition-colors" title="End Drill"><LogOut className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            </div>
          )}

          <div className="flex-1 flex flex-col items-center p-4 sm:p-6 lg:p-8 h-full w-full relative overflow-y-auto overflow-x-hidden">
            
            {/* START SCREEN */}
            {gameState === 'start' && (
              <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-sm overflow-y-auto flex flex-col p-4">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-auto my-auto border border-gray-700 bg-gray-900 shadow-2xl flex flex-col shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(225,29,72,0.3)] shrink-0">
                    <Keyboard className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black mb-2 pointer-events-none tracking-tight">Typing Speed Test</h2>
                  <p className="text-xs sm:text-base mb-6 text-gray-400 leading-relaxed pointer-events-none">
                    Endless mode. Type accurately and rapidly to maximize your score. 
                  </p>
                  
                  {/* Difficulty Controls inside Start Modal */}
                  <div className="flex flex-col gap-3 mb-6 p-4 rounded-xl bg-black/40 border border-gray-700">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Select Difficulty</span>
                    <div className="flex rounded-xl bg-gray-800 p-1" role="radiogroup">
                      {['EASY', 'MEDIUM', 'HARD'].map(d => (
                        <button
                          key={d}
                          onClick={() => setDifficulty(d)}
                          role="radio"
                          aria-checked={difficulty === d}
                          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                            difficulty === d
                              ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
                              : 'text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={startGame}
                    className="mt-auto w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(225,29,72,0.3)] focus:outline-none shrink-0">
                    <Play className="w-5 h-5 fill-white" />
                    START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* PLAYING STATE */}
            {gameState === 'playing' && (
              <div className="w-full max-w-4xl my-auto py-4 animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col h-full">
                
                {/* Non-fullscreen Top Bar (Fullscreen has its own absolute bar) */}
                {!isFullscreen && (
                  <div className="flex justify-between items-center mb-4 w-full">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-900/30 text-rose-400 border border-rose-500/20">{difficulty} MODE</span>
                    <div className="flex gap-2">
                      <button onClick={skipQuote} className="px-3 py-1.5 rounded-lg border border-gray-700 bg-gray-800 text-xs font-bold text-gray-300 hover:bg-gray-700 transition flex items-center gap-1">
                        <SkipForward className="w-3.5 h-3.5" /> Skip
                      </button>
                      <button onClick={endGame} className="px-3 py-1.5 rounded-lg border border-red-900/50 bg-red-900/30 text-xs font-bold text-red-400 hover:bg-red-900/50 transition flex items-center gap-1">
                        End Drill
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Visualizer */}
                <div className="w-full p-4 sm:p-6 rounded-2xl bg-gray-900/80 border border-gray-700 shadow-inner mb-6 overflow-y-auto max-h-[30vh] sm:max-h-[40vh]">
                  <div className="text-lg sm:text-2xl md:text-3xl font-medium leading-relaxed font-mono">
                    {targetText.split('').map((char, i) => {
                      let color = 'text-gray-500';
                      let bg = 'transparent';
                      if (i < input.length) {
                        if (input[i] === targetText[i]) color = 'text-emerald-400';
                        else { color = 'text-rose-400'; bg = 'bg-rose-900/30'; }
                      }
                      return (
                        <span key={i} className={`${color} ${bg} transition-colors duration-75 ${i === input.length ? 'border-l-2 border-rose-500 animate-pulse' : ''}`}>
                          {char}
                        </span>
                      );
                    })}
                  </div>
                </div>
                
                {/* Mobile-Friendly Textarea */}
                <div className="mt-auto w-full">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    className="w-full p-4 sm:p-5 rounded-2xl font-mono text-base sm:text-xl outline-none border-2 transition-all resize-none bg-black border-gray-700 text-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 shadow-lg"
                    placeholder="Type the phrase above here..."
                    rows={2}
                    autoFocus
                    spellCheck={false}
                    autoCorrect="off"
                    autoCapitalize="off"
                    aria-label="Type the text shown above"
                  />
                </div>
              </div>
            )}

            {/* END SCREEN (GAME OVER) */}
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 z-[70] bg-black/95 animate-in fade-in duration-300 overflow-y-auto flex flex-col p-4">
                <div className="rounded-3xl max-w-md w-full mx-auto my-auto shadow-2xl border border-gray-800 bg-gray-950 flex flex-col shrink-0">
                  
                  <div className="bg-gradient-to-br from-rose-900/40 to-pink-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Session Ended!</h2>
                      <p className="text-rose-400 font-medium text-xs sm:text-sm">Typing Speed Test • {difficulty}</p>
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
                            className={`${finalAccuracy >= 80 ? 'text-green-500' : finalAccuracy >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                            strokeWidth="3" strokeDasharray={`${strokeDasharray}`} strokeDashoffset={`${strokeDashoffset}`} strokeLinecap="round" stroke="currentColor" fill="none" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-base sm:text-xl font-black ${finalAccuracy >= 80 ? 'text-green-400' : finalAccuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{finalAccuracy}%</span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <EndStat label="Total Time" value={elapsedTimeStr} color="blue" />
                      <EndStat label="Quotes" value={quotesCompleted} color="emerald" />
                      <EndStat label="Max Streak" value={`${combo}x`} color="orange" />
                      <EndStat label="Chars" value={globalTotalTypedRef.current} color="purple" />
                      <EndStat label="Difficulty" value={difficulty} color="rose" />
                      <EndStat label="Best" value={bestScore} color="yellow" />
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                    <button onClick={resetGame} className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-black tracking-wide hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                    </button>
                    <button onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <Link href="/drills/academic" className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
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
                <Info className="w-5 h-5 text-rose-400" /><h2 className="font-bold text-white text-lg tracking-tight">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="green" text="Complete Phrase" highlight="+ Score" result="Based on WPM & Difficulty" />
                  <RuleItem color="red" text="Typing Errors" highlight="No Negative Score" result="Lowers Accuracy %" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="orange" text="Timing Strategy" highlight="Untimed / Endless Mode" result="Play at Your Pace" />
                  <RuleItem color="cyan" text="Combo Multiplier" highlight="Every 3 Quotes" result="Bonus Points" />
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
                <GraduationCap className="w-5 h-5 text-rose-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Endless Typing Speed Test</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This untimed, endless typing drill replaces the traditional 60-second sprint with a stamina-focused endurance test. By dynamically calculating your Words Per Minute (WPM) and accuracy upon the completion of each phrase, it rewards consistent, rapid execution over long periods. Perfect for data entry professionals, writers, and competitive typists looking to build unshakeable muscle memory.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <InfoCard icon={<Keyboard className="w-4 h-4 text-white" />} title="Who It's For" desc="Programmers, copywriters, data entry specialists, and exam candidates requiring high WPM." color="rose" />
                  <InfoCard icon={<Brain className="w-4 h-4 text-white" />} title="Skills Optimized" desc="Keyboard familiarity, hand-eye coordination, error recovery speed, and stamina." color="green" />
                  <InfoCard icon={<BarChart3 className="w-4 h-4 text-white" />} title="Metrics Tracked" desc="Live WPM, Net Score, Global Accuracy, Quotes Completed, and Max Combo Streaks." color="purple" />
                </div>

                {/* How to Practice Effectively Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Select Difficulty:</strong> Easy phrases are short and simple. Hard phrases contain complex vocabulary and heavy punctuation. The harder the difficulty, the higher the score multiplier.</li>
                    <li><strong className="text-gray-200">Focus on Accuracy First:</strong> Score is heavily weighted by your accuracy percentage on a completed phrase. Typing fast but making constant backspaces will hurt your final payout.</li>
                    <li><strong className="text-gray-200">Endless Format:</strong> There is no countdown clock. You must manually click the "End Drill" button (the red logout icon) when you are satisfied with your score to save it to the leaderboard.</li>
                    <li><strong className="text-gray-200">Skip if Stuck:</strong> If your hands fumble a phrase entirely, use the "Skip" button to get a fresh quote. Note: This will reset your combo multiplier.</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-rose-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <FAQItem question="How is the score calculated?" answer="Upon finishing a quote perfectly, the engine calculates your WPM for that specific quote. Your points are calculated as: WPM × Difficulty Multiplier × Accuracy Percentage. Faster, harder, and more accurate typing yields massive scores." />
                    <FAQItem question="Why are there no negative points for typos?" answer="Errors do not explicitly subtract from your total score. However, every typo drops your live accuracy percentage. Because your final payout for a quote is multiplied by your accuracy, making mistakes implicitly costs you large amounts of potential points." />
                    <FAQItem question="Is there a time limit?" answer="No. This is an endless stamina drill. Play at your own pace and press the 'End Drill' button to finalize your session." />
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
              <div className="w-1 h-5 rounded-full bg-rose-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/academic/writing-speed/typing-test" title="Code Typing" desc="Practice JS, Python & HTML syntax." color="orange" icon={<Code2 className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/comprehension/reading-comprehension" title="Reading Comprehension" desc="RSVP speed reading with adaptive quizzing." color="emerald" icon={<BookOpen className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/comprehension/inference-drill" title="Inference Analytics" desc="Critical reasoning passages with logic mapping." color="blue" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/productivity/focus-endurance/deep-work" title="Deep Work Timer" desc="Structured sessions for maximum cognitive output." color="indigo" icon={<Timer className="w-4 h-4" />} />
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
                    <li><Link href="/drills/academic/comprehension/reading-comprehension" className="hover:text-rose-400 transition-colors">Reading Comprehension</Link></li>
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-rose-400 transition-colors">Typing Speed</Link></li>
                    <li><Link href="/drills/academic" className="text-rose-450 hover:text-rose-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-rose-400 transition-colors">Logic Puzzles</Link></li>
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-rose-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive" className="text-rose-450 hover:text-rose-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-rose-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-rose-400 transition-colors">Aim Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-rose-450 hover:text-rose-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Visual Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-rose-400 transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-rose-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-rose-450 hover:text-rose-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory" className="hover:text-rose-400 transition-colors">Memory (15)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-rose-400 transition-colors">Mental Fitness (6)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-rose-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-rose-500/25 to-pink-500/25 border border-rose-500/30 rounded-lg flex items-center justify-center">
                    <Keyboard className="w-3.5 h-3.5 text-rose-400" />
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
    rose: 'text-rose-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400',
    emerald: 'text-emerald-400',
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
    rose: 'bg-rose-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    blue: 'bg-blue-600'
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
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(225,29,72,0.1)] hover:-translate-y-1 hover:border-rose-500/50`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-rose-500 to-pink-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050508] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-rose-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-rose-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}