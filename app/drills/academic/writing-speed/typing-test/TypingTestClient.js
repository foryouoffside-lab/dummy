'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  Keyboard, Zap, Award, RotateCcw, 
  Sun, Moon, Volume2, VolumeX,
  Eye, Maximize2, Minimize2, Timer,
  ArrowLeft, Target, Activity, AlertCircle,
  Type, RefreshCw, Trophy, BarChart3, Info,
  CheckCircle2, Hash
} from 'lucide-react';

export default function TypingTestClient() {
  const [gameState, setGameState] = useState('start');
  const [input, setInput] = useState('');
  
  // Advanced Metrics
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [rawKpm, setRawKpm] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [correctCharacters, setCorrectCharacters] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  
  // UI State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const startTimeRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const gameStateRef = useRef('start');

  // Quote database - 10 quotes for each difficulty level
  const QUOTES = useMemo(() => ({
    EASY: [
      "The quick brown fox jumps over the lazy dog. This classic pangram contains every letter of the English alphabet and is used by typists worldwide to practice their skills.",
      "Success is not final and failure is not fatal. It is the courage to continue that counts in the journey of life and personal development.",
      "The best way to predict the future is to create it yourself through dedicated effort and unwavering commitment to your goals and aspirations.",
      "Reading is to the mind what exercise is to the body. It strengthens our cognitive abilities and expands our understanding of the world around us.",
      "The sun sets beautifully over the calm ocean waves as seagulls fly across the orange painted sky looking for their evening meal.",
      "Learning new skills requires patience and consistent practice. Every expert was once a beginner who refused to give up on their dreams.",
      "A journey of a thousand miles begins with a single step. Take that first step today and watch how far you can go with determination.",
      "Kindness is a language that the deaf can hear and the blind can see. Small acts of compassion can change someone&apos;s entire world.",
      "Time is the most valuable resource we have because it cannot be renewed or replaced once it has been spent or wasted away.",
      "Music has the power to heal the soul and bring people together across all boundaries of language culture and personal differences."
    ],
    MEDIUM: [
      "The efficiency of a system is often dictated by the friction within its smallest components. In high-velocity environments, the ability to process data with absolute precision is the primary differentiator between success and failure.",
      "Quantum computing leverages the principles of superposition and entanglement to perform calculations at speeds unattainable by classical architectures, representing a paradigm shift in computational power.",
      "Strategic autonomy requires a synthesis of rapid decision-making and long-term vision. Without the discipline to execute small tasks perfectly, the grander objectives remain perpetually out of reach.",
      "The rapid expansion of neural networks has fundamentally altered our approach to pattern recognition, enabling machines to interpret complex datasets with a level of nuance previously reserved for the human mind.",
      "Environmental sustainability demands a fundamental restructuring of industrial processes and consumer behavior patterns that have dominated global economic systems for nearly two centuries.",
      "The intersection of artificial intelligence and biomedical research promises to accelerate drug discovery and personalize treatment protocols in ways previously unimaginable to medical practitioners.",
      "Cryptocurrency and blockchain technology represent a decentralized approach to financial transactions that challenges traditional banking institutions and regulatory frameworks worldwide.",
      "Effective leadership in modern organizations requires emotional intelligence alongside technical competence, as team dynamics become increasingly complex and geographically distributed.",
      "The philosophical implications of consciousness studies continue to challenge our understanding of subjective experience and the fundamental nature of reality itself.",
      "Urban planning in the twenty-first century must balance population density with quality of life considerations, integrating green spaces and efficient public transportation networks."
    ],
    HARD: [
      "Neuroplasticity demonstrates that the brain&apos;s architecture remains malleable throughout adulthood, continuously reorganizing synaptic connections in response to novel stimuli and environmental demands. This extraordinary capacity for adaptation underlies all forms of learning and memory consolidation.",
      "The epistemological foundations of scientific inquiry rest upon falsifiability and empirical verification. Theories must generate testable predictions that withstand rigorous experimental scrutiny to achieve provisional acceptance within the scholarly community.",
      "Cryptographic protocols utilizing elliptic curve mathematics provide robust security guarantees through the computational intractability of the discrete logarithm problem in carefully selected finite fields, ensuring confidentiality and integrity in digital communications.",
      "The hermeneutic tradition in continental philosophy emphasizes the circular nature of interpretation, wherein understanding emerges through iterative engagement with textual and contextual elements that mutually inform one another.",
      "Mitochondrial dysfunction represents a central mechanism in the pathophysiology of numerous neurodegenerative disorders, disrupting cellular energy homeostasis and triggering cascading apoptotic signaling pathways.",
      "The geopolitical ramifications of climate change extend far beyond environmental considerations, encompassing resource allocation conflicts, mass migration patterns, and fundamental challenges to existing international governance structures.",
      "Quantum entanglement challenges classical intuitions about locality and causality, suggesting that spatially separated particles can exhibit correlated behaviors that transcend conventional understandings of information transfer.",
      "The intersectionality framework in critical social theory illuminates how overlapping systems of oppression and discrimination create unique experiential phenomena that cannot be reduced to singular analytical dimensions.",
      "Stochastic gradient descent optimization algorithms navigate high-dimensional loss landscapes to identify parametric configurations that minimize predictive error while avoiding pernicious local minima and saddle points.",
      "Phenomenological approaches to consciousness studies bracket presuppositional frameworks to examine the structures of first-person experience, revealing the intentional character of perceptual and cognitive acts."
    ]
  }), []);

  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  
  const getRandomQuote = useCallback(() => {
    const quotes = QUOTES[difficulty];
    const randomIdx = Math.floor(Math.random() * quotes.length);
    setCurrentQuoteIdx(randomIdx);
    return quotes[randomIdx];
  }, [difficulty, QUOTES]);

  const [targetText, setTargetText] = useState('');

  // Initialize target text
  useEffect(() => {
    setTargetText(QUOTES.MEDIUM[0]);
  }, [QUOTES]);

  // Sync gameState to ref
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Get points based on difficulty
  const getPointsForCorrect = useCallback(() => {
    if (difficulty === 'HARD') return 3;
    if (difficulty === 'MEDIUM') return 2;
    return 1;
  }, [difficulty]);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('typingDrillBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('typingDrillBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
    }
  }, [gameState, score, bestScore]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(async () => {
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
  }, [isFullscreen]);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 600);
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

  // Play sound effect
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
      const freqMap = { start: 660, complete: 880, error: 330, combo: 1046.5 };
      
      oscillator.frequency.setValueAtTime(freqMap[type] || 660, now);
      gainNode.gain.setValueAtTime(type === 'combo' ? 0.12 : type === 'error' ? 0.08 : 0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + (type === 'combo' ? 0.2 : 0.15));
      oscillator.start(now);
      oscillator.stop(now + (type === 'combo' ? 0.2 : 0.15));
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  const startTest = useCallback(() => {
    const newText = getRandomQuote();
    setTargetText(newText);
    setInput('');
    setErrorCount(0);
    setWpm(0);
    setAccuracy(100);
    setRawKpm(0);
    setTimeLeft(60);
    setCharactersTyped(0);
    setCorrectCharacters(0);
    setScore(0);
    setCombo(0);
    setGameState('playing');
    gameStateRef.current = 'playing';
    startTimeRef.current = Date.now();
    
    scoreRef.current = 0;
    comboRef.current = 0;
    
    playSound('start');
    showFeedback(`60s challenge • ${difficulty} mode • +${getPointsForCorrect()}pts per quote`, 'success');
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [getRandomQuote, difficulty, getPointsForCorrect, playSound, showFeedback]);

  const refreshQuote = useCallback(() => {
    const newText = getRandomQuote();
    setTargetText(newText);
    showFeedback(`New ${difficulty} quote loaded`, 'success');
  }, [getRandomQuote, difficulty, showFeedback]);

  const handleInputChange = useCallback((e) => {
    const val = e.target.value;
    setInput(val);
    
    const charsTyped = val.length;
    setCharactersTyped(charsTyped);
    
    // Calculate correct characters
    let correct = 0;
    let errors = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === targetText[i]) {
        correct++;
      } else {
        errors++;
      }
    }
    setCorrectCharacters(correct);
    setErrorCount(errors);
    
    // Calculate WPM and accuracy
    if (startTimeRef.current) {
      const timeElapsed = (Date.now() - startTimeRef.current) / 1000 / 60;
      const wordCount = correct / 5;
      const calculatedWpm = timeElapsed > 0 ? Math.round(wordCount / timeElapsed) : 0;
      setWpm(calculatedWpm);
      setRawKpm(timeElapsed > 0 ? Math.round(charsTyped / timeElapsed) : 0);
      setAccuracy(charsTyped > 0 ? Math.round((correct / charsTyped) * 100) : 100);
    }
    
    // Completion Logic
    if (val === targetText) {
      const pointsEarned = getPointsForCorrect();
      const comboBonus = Math.floor(comboRef.current / 3);
      const totalPoints = pointsEarned + comboBonus;
      
      scoreRef.current = scoreRef.current + totalPoints;
      setScore(scoreRef.current);
      comboRef.current = comboRef.current + 1;
      setCombo(comboRef.current);
      
      if (comboRef.current % 3 === 0 && comboRef.current > 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current} Combo! +${comboBonus} bonus!`, 'success');
      } else {
        playSound('complete');
        showFeedback(`✓ Quote complete! +${totalPoints} points`, 'success');
      }
      
      // Load next quote
      const newText = getRandomQuote();
      setTargetText(newText);
      setInput('');
    }
  }, [targetText, getPointsForCorrect, getRandomQuote, playSound, showFeedback]);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            playSound('complete');
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
  }, [gameState, playSound]);

  const resetGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setInput('');
    setTimeLeft(60);
    setFeedback('');
    setScore(0);
    setWpm(0);
    setAccuracy(100);
    setCombo(0);
    scoreRef.current = 0;
    comboRef.current = 0;
  }, []);

  const getProgress = useCallback(() => {
    return targetText.length > 0 
      ? Math.round((input.length / targetText.length) * 100)
      : 0;
  }, [input.length, targetText.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  // Get point display for difficulty
  const getPointDisplay = useCallback((d) => {
    if (d === 'HARD') return '3pt';
    if (d === 'MEDIUM') return '2pt';
    return '1pt';
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading typing test drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Velocity Command - Typing Speed Test",
            "url": "https://skilldrills.online/drills/academic/writing-speed/typing-test",
            "description": "Typing speed test with 30 unique quotes across Easy, Medium, and Hard levels. 60-second timed challenge tracking WPM, accuracy, error count, and combo streaks. Character-by-character feedback with no penalties.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "Global Drill System"
            },
            "educationalUse": ["Typing Practice", "Keyboard Skills", "Speed Typing", "Productivity Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Typing Speed", "Typing Accuracy", "Keyboard Proficiency", "Focus Training"]
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
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
              Writing Speed
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} aria-current="page">
              Velocity Command
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex-shrink-0">
              <Keyboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Velocity Command
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                60s typing challenge • 10 quotes per level • 3 difficulty modes
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset typing test"
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

        {/* SEO Content */}
        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Velocity Command - Typing Speed Test & Accuracy Training</h2>
          <p>
            Test and improve your typing speed with 30 unique quotes across 3 difficulty levels.
            Easy (1pt): short sentences about life, learning, and nature.
            Medium (2pt): technical and professional vocabulary with complex sentence structures.
            Hard (3pt): academic and scientific passages with specialized terminology.
            Character-by-character feedback shows correct (green) and incorrect (red) typing.
            60-second timed format with WPM, accuracy, error tracking, and combo bonuses every 3 quotes.
            No penalties - just pure typing practice to improve speed and accuracy.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-rose-600" />} value={wpm} label="WPM" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Hash className="text-cyan-600" />} value={difficulty} label="Level" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${
              feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedback || '\u00A0'}
          </div>
        </div>

        {/* Difficulty Selector & Quote Refresh */}
        <div className="flex justify-center gap-3 mb-4">
          <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} role="radiogroup" aria-label="Difficulty level">
            {['EASY', 'MEDIUM', 'HARD'].map(d => (
              <button
                key={d}
                onClick={() => {
                  setDifficulty(d);
                  const quotes = QUOTES[d];
                  setTargetText(quotes[Math.floor(Math.random() * quotes.length)]);
                }}
                role="radio"
                aria-checked={difficulty === d}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  difficulty === d 
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg' 
                    : `${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`
                } focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2`}
                aria-label={`${d} difficulty - ${getPointDisplay(d)} per quote`}
              >
                {d} ({getPointDisplay(d)})
              </button>
            ))}
          </div>
          <button
            onClick={refreshQuote}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-white border border-gray-200 hover:bg-gray-100 text-gray-700'
            } focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2`}
            aria-label="Load a new random quote"
          >
            <RefreshCw className="w-4 h-4" />
            New Quote
          </button>
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
          {/* Fullscreen Controls */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
                aria-label="Reset typing test"
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
                    <Keyboard className="w-16 h-16 text-rose-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Velocity Command
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    60-second challenge • {difficulty} mode • +{getPointsForCorrect()}pts per quote
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Type quotes exactly as shown. Combo bonus every 3 quotes. No penalties - just keep typing!
                  </p>
                  <button 
                    onClick={startTest}
                    className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    aria-label="Start typing speed test"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && (
              <div className="w-full h-full flex flex-col">
                {/* Display Text */}
                <div className="flex-1 overflow-y-auto mb-4 p-4">
                  <div className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed font-mono">
                    {targetText.split('').map((char, i) => {
                      let color = isBoxDarkMode ? 'text-gray-500' : 'text-gray-400';
                      let bg = 'transparent';
                      
                      if (i < input.length) {
                        if (input[i] === targetText[i]) {
                          color = isBoxDarkMode ? 'text-green-400' : 'text-green-600';
                        } else {
                          color = 'text-rose-500';
                          bg = isBoxDarkMode ? 'bg-rose-900/30' : 'bg-rose-100';
                        }
                      }
                      
                      return (
                        <span 
                          key={i} 
                          className={`${color} ${bg} transition-colors duration-75 ${
                            i === input.length ? 'border-l-2 border-rose-500 animate-pulse' : ''
                          }`}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>
                </div>
                
                {/* Input Area */}
                <div className="mt-auto">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    className={`w-full p-4 rounded-xl font-mono text-base sm:text-lg outline-none border-2 transition-all resize-none ${
                      isBoxDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-rose-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-rose-500'
                    }`}
                    placeholder="Start typing here..."
                    rows={3}
                    autoFocus
                    spellCheck={false}
                    aria-label="Type the text shown above"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className={`text-xs ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Quote {currentQuoteIdx + 1} of {QUOTES[difficulty].length} • {difficulty}
                    </p>
                    <p className={`text-xs ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {getProgress()}% complete
                    </p>
                  </div>
                </div>
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
                    Keep practicing to improve your typing speed and accuracy across all difficulty levels.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="WPM" value={wpm} icon={<Zap className="w-4 h-4" />} color="rose" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Max Combo" value={combo} icon={<Activity className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                    <ResultCard label="Errors" value={errorCount} icon={<AlertCircle className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                    <ResultCard label="Characters" value={charactersTyped} icon={<Type className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Difficulty" value={difficulty} icon={<Hash className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </button>
                    </Link>
                    <button 
                      onClick={startTest} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
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
          <footer className="mt-6" aria-label="Drill rules and scoring information">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Type the text <span className="font-semibold text-rose-500">exactly as shown</span> - character by character</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete quote: <span className="font-semibold text-green-500">+{getPointsForCorrect()}pts</span> ({difficulty} mode)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 quotes = <span className="font-semibold text-blue-500">+1 combo bonus</span></p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>10 unique quotes per <span className="font-semibold text-purple-500">difficulty level</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Trains <span className="font-semibold text-yellow-500">speed, accuracy, and focus</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No lives or penalties • <span className="font-semibold text-cyan-500">Just keep typing!</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>⌨️ EASY: +1pt • MEDIUM: +2pt • HARD: +3pt per completed quote</span>
                  <span>🏆 Best Score saves locally</span>
                </div>
              </div>
            </div>
          </footer>
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
    rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-500', icon: 'text-rose-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
  };
  
  const colors = colorMap[color] || colorMap.yellow;
  
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