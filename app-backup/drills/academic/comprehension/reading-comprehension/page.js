'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Zap, Award, 
  Volume2, VolumeX, Sun, Moon, 
  Eye, Maximize2, Minimize2, Timer,
  ArrowLeft, Target, Activity,
  Play, Pause, CheckCircle2, Brain, Trophy,
  ChevronUp, ChevronDown, BarChart3, Info, Gauge
} from 'lucide-react';

export default function ReadingComprehensionDrill() {
  // Professional Reading Passages - 10 unique passages with increasing difficulty
  const PASSAGES = [
    {
      id: 1,
      title: "Neural Plasticity",
      level: 1,
      text: "Neuroplasticity, also known as neural plasticity or brain plasticity, is the ability of the brain to change throughout an individual's life. Brain activity associated with a given function can be transferred to a different location, the proportion of grey matter can change, and synapses may strengthen or weaken over time. This process is fundamental to learning, memory, and recovery from brain injury. Research has shown that the adult brain is not 'hard-wired' with fixed neuronal circuits but remains adaptable and malleable.",
      questions: [
        { 
          q: "According to the passage, what is the primary characteristic of neuroplasticity?", 
          a: "The brain's ability to reorganize and adapt throughout life", 
          options: [
            "The brain's ability to reorganize and adapt throughout life",
            "The brain's fixed and unchangeable structure",
            "The speed at which neurons fire",
            "The size of the brain increasing over time"
          ] 
        },
        { 
          q: "What can happen to grey matter during neuroplasticity?", 
          a: "Its proportion can change", 
          options: [
            "It becomes permanently fixed",
            "Its proportion can change",
            "It converts to white matter",
            "It stops developing after childhood"
          ] 
        },
        { 
          q: "Where can brain activity be transferred according to the passage?", 
          a: "To a different location", 
          options: [
            "Only to the opposite hemisphere",
            "To a different location",
            "It cannot be transferred",
            "Exclusively to the spinal cord"
          ] 
        }
      ]
    },
    {
      id: 2,
      title: "The Fermi Paradox",
      level: 2,
      text: "The Fermi paradox is the apparent contradiction between the high probability of extraterrestrial civilizations existing and the lack of evidence for such civilizations. The Milky Way contains approximately 100-400 billion stars, many of which are billions of years older than our Sun. Given the vastness of cosmic time and space, even with slow interstellar travel, the galaxy could be completely colonized in a few million years. Yet we observe no signs of intelligent alien life. This paradox suggests fundamental gaps in our understanding of abiogenesis, the development of intelligence, or the longevity of technological civilizations.",
      questions: [
        { 
          q: "What is the core contradiction described in the Fermi Paradox?", 
          a: "High probability of alien life versus complete lack of evidence", 
          options: [
            "The age of the universe versus the age of Earth",
            "High probability of alien life versus complete lack of evidence",
            "The size of stars versus their brightness",
            "Human technology versus alien technology"
          ] 
        },
        { 
          q: "Approximately how many stars are estimated to exist in the Milky Way?", 
          a: "100-400 billion", 
          options: [
            "1-4 million",
            "10-40 billion",
            "100-400 billion",
            "1-4 trillion"
          ] 
        },
        { 
          q: "What does the paradox suggest about our understanding?", 
          a: "It contains fundamental gaps", 
          options: [
            "It is completely accurate",
            "It contains fundamental gaps",
            "It only applies to nearby stars",
            "It has been solved by recent research"
          ] 
        }
      ]
    },
    {
      id: 3,
      title: "Quantum Entanglement",
      level: 3,
      text: "Quantum entanglement is a physical phenomenon occurring when pairs or groups of particles are generated, interact, or share spatial proximity in ways such that the quantum state of each particle cannot be described independently of the state of the others, even when separated by large distances. Albert Einstein famously characterized this as 'spooky action at a distance.' Measurements of physical properties such as position, momentum, spin, and polarization performed on entangled particles are found to be perfectly correlated. This phenomenon has been experimentally verified and forms the foundation for emerging technologies in quantum computing and quantum cryptography.",
      questions: [
        { 
          q: "How did Einstein characterize quantum entanglement?", 
          a: "Spooky action at a distance", 
          options: [
            "The greatest discovery of the century",
            "Spooky action at a distance",
            "A complete mathematical impossibility",
            "The key to unlimited energy"
          ] 
        },
        { 
          q: "What happens to entangled particles when separated by large distances?", 
          a: "Their quantum states remain correlated", 
          options: [
            "They lose all connection immediately",
            "Their quantum states remain correlated",
            "They travel faster than light",
            "They become different types of particles"
          ] 
        },
        { 
          q: "Which technologies use quantum entanglement as a foundation?", 
          a: "Quantum computing and quantum cryptography", 
          options: [
            "Classical computing and email encryption",
            "Nuclear fusion and solar panels",
            "Quantum computing and quantum cryptography",
            "Artificial intelligence and machine learning"
          ] 
        }
      ]
    }
  ];

  // Drill State
  const [currentPassageIdx, setCurrentPassageIdx] = useState(0);
  const [gameState, setGameState] = useState('start');
  const [wpm, setWpm] = useState(300);
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [completedPassages, setCompletedPassages] = useState(new Set());
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  // UI State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const startTimeRef = useRef(null);
  const audioCtxRef = useRef(null);

  const currentPassage = PASSAGES[currentPassageIdx];
  const words = currentPassage.text.split(' ');
  const availablePassages = PASSAGES.filter((_, idx) => !completedPassages.has(idx));

  // Load best score
  useEffect(() => {
    const savedBestScore = localStorage.getItem('readingRSVPDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'complete' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('readingRSVPDrillBestScore', score.toString());
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

  const showFeedbackMessage = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
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
      } else if (type === 'correct') {
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
        oscillator.stop(audioCtx.currentTime + 0.15);
      } else if (type === 'wrong') {
        oscillator.frequency.value = 330;
        gainNode.gain.value = 0.08;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
        oscillator.stop(audioCtx.currentTime + 0.15);
      } else if (type === 'combo') {
        oscillator.frequency.value = 1046.5;
        gainNode.gain.value = 0.12;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.2);
        oscillator.stop(audioCtx.currentTime + 0.2);
      } else if (type === 'complete') {
        oscillator.frequency.value = 1320;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.2);
        oscillator.stop(audioCtx.currentTime + 0.2);
      }
    } catch (e) {}
  };

  const startReading = () => {
    if (availablePassages.length === 0) {
      setCompletedPassages(new Set());
    }
    setGameState('reading');
    setIsPlaying(true);
    setWordIndex(0);
    startTimeRef.current = Date.now();
    playSound('start');
    showFeedbackMessage('Reading started • Focus on the center', 'success');
  };

  const resetGame = () => {
    setGameState('start');
    setCurrentPassageIdx(0);
    setScore(0);
    setCombo(0);
    setCompletedPassages(new Set());
    setWordIndex(0);
    setQuizIndex(0);
    setCorrectAnswers(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setFeedback('');
  };

  const nextPassage = () => {
    if (availablePassages.length > 0) {
      const nextIdx = PASSAGES.findIndex((_, idx) => !completedPassages.has(idx));
      setCurrentPassageIdx(nextIdx);
      setGameState('start');
      setWordIndex(0);
      setQuizIndex(0);
      setCorrectAnswers(0);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setGameState('complete');
    }
  };

  useEffect(() => {
    if (isPlaying && gameState === 'reading') {
      const interval = (60 / wpm) * 1000;
      timerRef.current = setInterval(() => {
        setWordIndex((prev) => {
          if (prev >= words.length - 1) {
            clearInterval(timerRef.current);
            setIsPlaying(false);
            setTimeout(() => setGameState('testing'), 500);
            return prev;
          }
          return prev + 1;
        });
      }, interval);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, wpm, words.length, gameState]);

  const handleAnswer = (selected) => {
    setSelectedOption(selected);
    setShowFeedback(true);
    
    const isCorrect = selected === currentPassage.questions[quizIndex].a;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setCombo(prev => {
        const newCombo = prev + 1;
        if (newCombo > 0 && newCombo % 3 === 0) {
          playSound('combo');
          showFeedbackMessage(`🔥 ${newCombo}x Combo!`, 'success');
        }
        return newCombo;
      });
      playSound('correct');
      showFeedbackMessage(`✓ Correct!`, 'success');
    } else {
      setCombo(0);
      playSound('wrong');
      showFeedbackMessage(`✗ Incorrect`, 'error');
    }
    
    setTimeout(() => {
      setSelectedOption(null);
      setShowFeedback(false);
      
      if (quizIndex < currentPassage.questions.length - 1) {
        setQuizIndex(prev => prev + 1);
      } else {
        // Passage complete
        const basePoints = 20;
        const retentionBonus = Math.round((correctAnswers / currentPassage.questions.length) * 30);
        const comboBonus = Math.floor(combo / 3) * 5;
        const totalPoints = basePoints + retentionBonus + (isCorrect ? comboBonus : 0);
        
        setScore(prev => prev + totalPoints);
        setCompletedPassages(prev => new Set([...prev, currentPassageIdx]));
        setGameState('results');
        playSound('complete');
      }
    }, 800);
  };

  const getRetentionRate = () => {
    const total = currentPassage.questions.length;
    return total > 0 ? Math.round((correctAnswers / total) * 100) : 0;
  };

  const getOverallAccuracy = () => {
    return getRetentionRate();
  };

  const getButtonClass = (option) => {
    if (!showFeedback || selectedOption !== option) {
      return isBoxDarkMode 
        ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' 
        : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50';
    }
    
    if (option === currentPassage.questions[quizIndex].a) {
      return 'bg-green-500 border-green-600 text-white';
    }
    if (option === selectedOption) {
      return 'bg-red-500 border-red-600 text-white';
    }
    return isBoxDarkMode 
      ? 'bg-gray-800 border-gray-700 text-gray-500' 
      : 'bg-white border-gray-200 text-gray-400';
  };

  const handleSpeedUp = () => setWpm(w => Math.min(600, w + 50));
  const handleSpeedDown = () => setWpm(w => Math.max(100, w - 50));

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
          <Link 
            href="/drills/academic" 
            className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Academic Drills
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Reading RSVP Lab</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Speed reading • 3 unique passages</p>
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

        {/* Stats Board - Drill Specific */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Gauge className="text-purple-600" />} value={wpm} label="WPM" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle2 className="text-green-600" />} value={`${completedPassages.size}/${PASSAGES.length}`} label="Completed" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-emerald-600" />} value={getOverallAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<BookOpen className="text-cyan-600" />} value={currentPassage?.level || 1} label="Level" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* WPM Control - Below Stats Board */}
        {gameState === 'start' && (
          <div className="flex justify-center mb-4">
            <div className={`flex items-center gap-3 p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Reading Speed:
              </span>
              <button onClick={handleSpeedDown} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className={`text-lg font-bold min-w-[60px] text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{wpm} WPM</span>
              <button onClick={handleSpeedUp} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

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
          {isFullscreen && gameState !== 'start' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* Content Area */}
          <div className="absolute inset-0 flex items-center justify-center p-8 overflow-y-auto">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <BookOpen className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Reading RSVP Lab</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{PASSAGES.length} passages • Adjust WPM to your level</p>
                  <button 
                    onClick={startReading} 
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Reading Screen */}
            {gameState === 'reading' && (
              <div className="text-center w-full">
                <div className="flex justify-center mb-4 opacity-20">
                  <div className="w-1 h-8 bg-emerald-500 mx-1" />
                </div>
                
                <div className="text-5xl md:text-7xl font-bold tracking-tight h-24 flex items-center justify-center">
                  <span className={isBoxDarkMode ? 'text-white' : 'text-gray-900'}>
                    {words[wordIndex]}
                  </span>
                </div>

                <div className="flex justify-center mt-4 opacity-20">
                  <div className="w-1 h-8 bg-emerald-500 mx-1" />
                </div>

                <div className="mt-8 w-64 mx-auto">
                  <div className={`h-1.5 rounded-full ${isBoxDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${(wordIndex / words.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mt-8 flex gap-4 justify-center">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)} 
                    className={`p-4 rounded-full ${isBoxDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                </div>
                
                <p className={`mt-4 text-xs ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {wordIndex + 1} of {words.length} words
                </p>
              </div>
            )}

            {/* Testing Screen */}
            {gameState === 'testing' && (
              <div className="w-full max-w-xl">
                <div className="mb-6">
                  <h3 className={`text-sm font-bold ${isBoxDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    Question {quizIndex + 1} of {currentPassage.questions.length}
                  </h3>
                </div>
                
                <h2 className={`text-xl md:text-2xl font-bold mb-8 leading-tight ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {currentPassage.questions[quizIndex].q}
                </h2>
                
                <div className="grid gap-3">
                  {currentPassage.questions[quizIndex].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => !showFeedback && handleAnswer(opt)}
                      disabled={showFeedback}
                      className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${getButtonClass(opt)} ${
                        !showFeedback ? 'hover:scale-[1.02]' : ''
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                
                {showFeedback && (
                  <div className={`mt-4 p-3 rounded-lg text-center ${
                    selectedOption === currentPassage.questions[quizIndex].a 
                      ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
                      : 'bg-red-500/20 text-red-500 dark:text-red-400'
                  }`}>
                    {selectedOption === currentPassage.questions[quizIndex].a 
                      ? '✓ Correct!' 
                      : `✗ Incorrect. Correct: ${currentPassage.questions[quizIndex].a}`}
                  </div>
                )}
              </div>
            )}

            {/* Results Screen */}
            {gameState === 'results' && (
              <div className={`rounded-2xl p-8 text-center max-w-md shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Passage Complete!
                </h3>
                <p className={`text-4xl font-bold mb-4 ${getRetentionRate() >= 70 ? 'text-green-500' : getRetentionRate() >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {getRetentionRate()}%
                </p>
                
                <div className={`space-y-2 mb-6 text-left ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex justify-between">
                    <span>Correct Answers:</span>
                    <span className="font-bold text-green-600">{correctAnswers}/{currentPassage.questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reading Speed:</span>
                    <span className="font-bold text-blue-600">{wpm} WPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Combo Bonus:</span>
                    <span className="font-bold text-orange-600">+{Math.floor(combo / 3) * 5}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={nextPassage}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-bold hover:shadow-lg transition"
                  >
                    Next Passage
                  </button>
                  <button
                    onClick={resetGame}
                    className={`flex-1 px-4 py-2 rounded-lg font-bold transition ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Menu
                  </button>
                </div>
              </div>
            )}

            {/* All Complete Screen */}
            {gameState === 'complete' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Mastery Achieved!</h3>
                  </div>
                  
                  <p className={`text-center mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    You've completed all {PASSAGES.length} passages!
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Passages" value={`${completedPassages.size}/${PASSAGES.length}`} icon={<BookOpen className="w-4 h-4" />} color="text-green-500" />
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
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Words flash at a <span className="font-semibold text-emerald-500">single focal point</span> - don't move your eyes</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Adjust WPM (100-600) to match your <span className="font-semibold text-green-500">processing speed</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 correct = <span className="font-semibold text-orange-500">+5 combo bonus</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Score = 20 base + <span className="font-semibold text-blue-500">retention bonus</span> + combo bonus</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete all <span className="font-semibold text-purple-500">{PASSAGES.length} passages</span> to master speed reading</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pause/resume anytime during reading</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>📚 3 difficulty levels • Retention tested after each passage</span>
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
                   color === 'text-green-500' ? 'bg-green-500/10' :
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