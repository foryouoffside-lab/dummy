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

export default function TypingTestDrill() {
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

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const startTimeRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);

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
      "Kindness is a language that the deaf can hear and the blind can see. Small acts of compassion can change someone's entire world.",
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
      "Neuroplasticity demonstrates that the brain's architecture remains malleable throughout adulthood, continuously reorganizing synaptic connections in response to novel stimuli and environmental demands. This extraordinary capacity for adaptation underlies all forms of learning and memory consolidation.",
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
  
  const getRandomQuote = () => {
    const quotes = QUOTES[difficulty];
    const randomIdx = Math.floor(Math.random() * quotes.length);
    setCurrentQuoteIdx(randomIdx);
    return quotes[randomIdx];
  };

  const [targetText, setTargetText] = useState(QUOTES.MEDIUM[0]);

  // Get points based on difficulty
  const getPointsForCorrect = useCallback(() => {
    if (difficulty === 'HARD') return 3;
    if (difficulty === 'MEDIUM') return 2;
    return 1; // EASY
  }, [difficulty]);

  // Load best score
  useEffect(() => {
    const savedBestScore = localStorage.getItem('typingDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('typingDrillBestScore', score.toString());
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

  // Play sound effect
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      if (type === 'start') {
        oscillator.frequency.value = 660;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
        oscillator.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'complete') {
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
        oscillator.stop(audioCtx.currentTime + 0.15);
      } else if (type === 'error') {
        oscillator.frequency.value = 330;
        gainNode.gain.value = 0.08;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
        oscillator.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'combo') {
        oscillator.frequency.value = 1046.5;
        gainNode.gain.value = 0.12;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
        oscillator.stop(audioCtx.currentTime + 0.15);
      }
    } catch (e) {}
  };

  const startTest = () => {
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
    startTimeRef.current = Date.now();
    
    scoreRef.current = 0;
    comboRef.current = 0;
    
    playSound('start');
    showFeedback(`60s challenge • ${difficulty} mode • +${getPointsForCorrect()}pts per quote`, 'success');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const refreshQuote = () => {
    const newText = getRandomQuote();
    setTargetText(newText);
    showFeedback(`New ${difficulty} quote loaded`, 'success');
  };

  const handleInputChange = (e) => {
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
        if (i >= input.length) {
          playSound('error');
        }
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
    
    // Completion Logic - Score based on difficulty
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
  };

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            clearInterval(timerRef.current);
            playSound('complete');
            showFeedback(`Time's up! Final Score: ${scoreRef.current}`, 'success');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const resetGame = () => {
    setGameState('start');
    setInput('');
    setTimeLeft(60);
    setFeedback('');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const getProgress = () => {
    return targetText.length > 0 
      ? Math.round((input.length / targetText.length) * 100)
      : 0;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  // Get point display for difficulty
  const getPointDisplay = (d) => {
    if (d === 'HARD') return '3pt';
    if (d === 'MEDIUM') return '2pt';
    return '1pt';
  };

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/drills/academic" 
            className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Academic Drills
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl">
                <Keyboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Velocity Command</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>60s typing challenge • 10 quotes per level</p>
              </div>
            </div>
            
            {/* Control Buttons */}
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

        {/* Stats Board - Typing specific metrics */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-rose-600" />} value={wpm} label="WPM" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Hash className="text-cyan-600" />} value={difficulty} label="Level" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Difficulty Selector - Always visible */}
        <div className="flex justify-center gap-3 mb-4">
          <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            {['EASY', 'MEDIUM', 'HARD'].map(d => (
              <button
                key={d}
                onClick={() => {
                  setDifficulty(d);
                  const quotes = QUOTES[d];
                  setTargetText(quotes[Math.floor(Math.random() * quotes.length)]);
                }}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  difficulty === d 
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg' 
                    : `${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`
                }`}
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
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            New Quote
          </button>
        </div>

        {/* Game Container - 16:9 Ratio Box */}
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

          {/* Content Area */}
          <div className="absolute inset-0 flex items-center justify-center p-8 overflow-y-auto">
            {/* Start Screen - No rules inside */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Keyboard className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Velocity Command</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • {difficulty} mode</p>
                  <button 
                    onClick={startTest}
                    className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && (
              <div className="w-full h-full flex flex-col">
                {/* Display Text */}
                <div className="flex-1 overflow-y-auto mb-4 p-4">
                  <div className="text-xl md:text-2xl font-medium leading-relaxed font-mono">
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
                    className={`w-full p-4 rounded-xl font-mono text-lg outline-none border-2 transition-all resize-none ${
                      isBoxDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-rose-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-rose-500'
                    }`}
                    placeholder="Start typing here..."
                    rows={3}
                    autoFocus
                    spellCheck={false}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className={`text-xs ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Quote {currentQuoteIdx + 1} of {QUOTES[difficulty].length}
                    </p>
                    <p className={`text-xs ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {getProgress()}% complete
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Test Complete!</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="WPM" value={wpm} icon={<Zap className="w-4 h-4" />} color="text-rose-500" />
                    <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Max Combo" value={combo} icon={<Activity className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Errors" value={errorCount} icon={<AlertCircle className="w-4 h-4" />} color="text-red-500" />
                    <ResultCard label="Characters" value={charactersTyped} icon={<Type className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Difficulty" value={difficulty} icon={<Hash className="w-4 h-4" />} color="text-cyan-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Play Again →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rules Section - Below the drill box */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Type the displayed text <span className="font-semibold text-rose-500">exactly as shown</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete quote: <span className="font-semibold text-green-500">EASY: 1pt • MEDIUM: 2pt • HARD: 3pt</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 quotes = <span className="font-semibold text-blue-500">+1 combo bonus</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>10 unique quotes per <span className="font-semibold text-purple-500">difficulty level</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Trains <span className="font-semibold text-yellow-500">speed, accuracy, and focus</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No lives or penalties • <span className="font-semibold text-cyan-500">Keep typing!</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>⌨️ EASY: 1pt • MEDIUM: 2pt • HARD: 3pt per quote</span>
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
                   color === 'text-rose-500' ? 'bg-rose-500/10' : 
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-blue-500' ? 'bg-blue-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 'bg-cyan-500/10';
  
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