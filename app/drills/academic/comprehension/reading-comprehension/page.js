'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Zap, Award, 
  Volume2, VolumeX, Sun, Moon, 
  Eye, Maximize2, Minimize2, Timer,
  ArrowLeft, Target, Activity,
  Play, Pause, CheckCircle2, Brain, Trophy,
  ChevronUp, ChevronDown, BarChart3, Info, Gauge,
  RefreshCw, Check, XCircle
} from 'lucide-react';

// Dynamic Passage Generator - Creates unique passages each time
const generatePassage = (level) => {
  const topics = {
    1: [ // Beginner topics
      {
        title: "The Water Cycle",
        text: "Water on Earth is constantly moving through a process called the water cycle. The sun heats water in oceans and lakes, causing it to evaporate into water vapor. This vapor rises into the atmosphere where it cools and condenses into clouds. When the clouds become heavy enough, the water falls back to Earth as precipitation in the form of rain or snow. This water then flows into rivers and streams, eventually returning to the oceans where the cycle begins again. This continuous process has been happening for billions of years and is essential for all life on our planet."
      },
      {
        title: "Photosynthesis Basics",
        text: "Plants are remarkable living organisms that can create their own food through photosynthesis. Using energy from sunlight, plants convert carbon dioxide from the air and water from the soil into glucose, a type of sugar that provides them with energy. During this process, plants release oxygen as a byproduct, which is essential for animals and humans to breathe. The green color in leaves comes from chlorophyll, a special pigment that captures sunlight energy. Without photosynthesis, life on Earth as we know it would not be possible."
      },
      {
        title: "The Five Senses",
        text: "Humans experience the world through five main senses: sight, hearing, smell, taste, and touch. Our eyes detect light and send signals to the brain that create images. Ears capture sound waves vibrating through the air. The nose contains millions of receptors that identify different odors. Taste buds on the tongue distinguish between sweet, sour, salty, bitter, and umami flavors. Finally, our skin contains nerve endings that sense pressure, temperature, and pain. Together, these senses help us navigate and understand our environment."
      }
    ],
    2: [ // Intermediate topics
      {
        title: "Artificial Intelligence Ethics",
        text: "As artificial intelligence systems become more advanced and integrated into daily life, ethical considerations have emerged as a critical area of discussion. AI algorithms now make decisions that affect employment, healthcare, criminal justice, and financial services. Questions arise about bias in training data, transparency in decision-making processes, and accountability when AI systems cause harm. Privacy concerns have also intensified as AI requires vast amounts of personal data to function effectively. Researchers and policymakers are working to establish guidelines that ensure AI development benefits humanity while minimizing potential risks and unintended consequences."
      },
      {
        title: "Sleep and Memory Consolidation",
        text: "Sleep plays a crucial role in memory consolidation, the process by which short-term memories are transformed into stable long-term memories. During deep sleep stages, the brain replays and reorganizes information learned during waking hours. The hippocampus, a region critical for memory formation, communicates with the neocortex to strengthen neural connections representing important experiences. Studies show that students who sleep after learning new material demonstrate significantly better recall compared to those who remain awake. Sleep deprivation not only impairs new learning but also disrupts the consolidation of previously acquired knowledge."
      },
      {
        title: "Renewable Energy Transition",
        text: "The global transition from fossil fuels to renewable energy sources represents one of the most significant economic and technological shifts in modern history. Solar and wind power have experienced dramatic cost reductions, making them increasingly competitive with traditional energy sources. Battery storage technology continues to improve, addressing the intermittency challenge of renewables. Countries around the world are setting ambitious targets for carbon neutrality, driving innovation in grid management and energy efficiency. However, challenges remain including the need for upgraded transmission infrastructure and ensuring a just transition for communities dependent on fossil fuel industries."
      }
    ],
    3: [ // Advanced topics
      {
        title: "Epigenetics and Gene Expression",
        text: "Epigenetics refers to heritable changes in gene expression that do not involve alterations to the underlying DNA sequence. Environmental factors such as diet, stress, and exposure to toxins can trigger epigenetic modifications through mechanisms including DNA methylation and histone modification. These changes can influence whether genes are activated or silenced, potentially affecting an organism's health and development across generations. Research has revealed that traumatic experiences can leave epigenetic marks that influence stress responses in offspring. This field has revolutionized our understanding of inheritance and suggests that lifestyle choices may have consequences extending beyond an individual's lifetime."
      },
      {
        title: "Quantum Computing Principles",
        text: "Quantum computing harnesses the principles of quantum mechanics to process information in fundamentally different ways than classical computers. Unlike classical bits that exist as either 0 or 1, quantum bits or qubits can exist in superposition, representing multiple states simultaneously. Quantum entanglement allows qubits to be correlated in ways that have no classical analog, enabling certain calculations to be performed exponentially faster. Potential applications include simulating complex molecular interactions for drug discovery, optimizing financial portfolios and supply chains, and breaking certain encryption schemes. However, maintaining quantum coherence and scaling to practical numbers of qubits remains significant technical challenges."
      },
      {
        title: "Behavioral Economics Insights",
        text: "Behavioral economics integrates psychological insights into economic theory, challenging the traditional assumption that humans consistently make rational decisions. Pioneering research by Kahneman and Tversky revealed systematic cognitive biases including loss aversion, where losses feel approximately twice as painful as equivalent gains feel pleasurable. The framing effect demonstrates that identical choices presented differently lead to dramatically different decisions. Nudge theory applies these insights to design choice architectures that guide people toward beneficial behaviors without restricting freedom. Governments and organizations increasingly employ behavioral insights to improve retirement savings rates, increase organ donation, and promote sustainable consumption patterns."
      }
    ]
  };

  const levelTopics = topics[level] || topics[1];
  const selectedTopic = levelTopics[Math.floor(Math.random() * levelTopics.length)];
  
  // Generate unique questions based on the passage
  const generateQuestions = (text) => {
    const sentences = text.split('. ').filter(s => s.length > 30);
    const questions = [];
    
    // Question 1: Main idea
    questions.push({
      q: "What is the main topic discussed in this passage?",
      a: `The passage discusses ${selectedTopic.title.toLowerCase()} and its key aspects`,
      options: [
        `The passage discusses ${selectedTopic.title.toLowerCase()} and its key aspects`,
        `The history of scientific discoveries in the 20th century`,
        `Basic mathematics and arithmetic operations`,
        `Ancient civilizations and their cultural practices`
      ]
    });

    // Question 2: Detail from first half
    if (sentences[0]) {
      const words = sentences[0].split(' ');
      const keyPhrase = words.slice(0, 4).join(' ') + '...';
      questions.push({
        q: `According to the beginning of the passage, ${sentences[0].substring(0, 30)}...?`,
        a: sentences[0],
        options: [
          sentences[0],
          sentences[1] || "An alternative explanation",
          "The opposite of what is stated",
          "A completely unrelated concept"
        ]
      });
    }

    // Question 3: Detail from second half
    if (sentences[2]) {
      questions.push({
        q: `What does the passage indicate about ${selectedTopic.title.toLowerCase()}?`,
        a: sentences[2],
        options: [
          sentences[2],
          sentences[1] || "A different interpretation",
          "A commonly held misconception",
          "An outdated theory"
        ]
      });
    }

    return questions.slice(0, 3);
  };

  return {
    id: Date.now() + Math.random(),
    title: selectedTopic.title,
    level: level,
    text: selectedTopic.text,
    questions: generateQuestions(selectedTopic.text)
  };
};

export default function ReadingComprehensionDrill() {
  // Generate fresh passages on component mount
  const generateFreshPassages = () => {
    return [
      generatePassage(1),
      generatePassage(2),
      generatePassage(3)
    ];
  };

  const [passages, setPassages] = useState(generateFreshPassages);
  
  // Drill State
  const [currentPassageIdx, setCurrentPassageIdx] = useState(0);
  const [gameState, setGameState] = useState('start');
  const [wpm, setWpm] = useState(300);
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [completedPassages, setCompletedPassages] = useState(new Set());
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalScoreEarned, setTotalScoreEarned] = useState(0);

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

  const currentPassage = passages[currentPassageIdx];
  const words = currentPassage?.text.split(' ') || [];
  const availablePassages = passages.filter((_, idx) => !completedPassages.has(idx));

  // Regenerate fresh passages on refresh
  useEffect(() => {
    // Always generate new passages when component mounts (page refresh)
    setPassages(generateFreshPassages());
  }, []);

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
    // Generate completely new passages on reset
    setPassages(generateFreshPassages());
    setGameState('start');
    setCurrentPassageIdx(0);
    setScore(0);
    setCombo(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTotalQuestions(0);
    setTotalScoreEarned(0);
    setCompletedPassages(new Set());
    setWordIndex(0);
    setQuizIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setFeedback('');
  };

  const nextPassage = () => {
    if (availablePassages.length > 0) {
      const nextIdx = passages.findIndex((_, idx) => !completedPassages.has(idx));
      setCurrentPassageIdx(nextIdx);
      setGameState('start');
      setWordIndex(0);
      setQuizIndex(0);
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
    setTotalQuestions(prev => prev + 1);
    
    let pointsEarned = 0;
    let penalty = 0;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      pointsEarned = 5;
      
      setCombo(prev => {
        const newCombo = prev + 1;
        if (newCombo > 0 && newCombo % 3 === 0) {
          playSound('combo');
          showFeedbackMessage(`🔥 ${newCombo}x Combo! +5 bonus`, 'success');
        }
        return newCombo;
      });
      
      setScore(prev => prev + pointsEarned);
      setTotalScoreEarned(prev => prev + pointsEarned);
      playSound('correct');
      showFeedbackMessage(`✓ Correct! +${pointsEarned} points`, 'success');
    } else {
      setWrongAnswers(prev => prev + 1);
      penalty = 5;
      
      // Penalty: -5 points for wrong answer (score never goes below 0)
      setScore(prev => Math.max(0, prev - penalty));
      setCombo(0); // Reset combo on wrong answer
      playSound('wrong');
      showFeedbackMessage(`✗ Wrong! -${penalty} point penalty`, 'error');
    }
    
    setTimeout(() => {
      setSelectedOption(null);
      setShowFeedback(false);
      
      if (quizIndex < currentPassage.questions.length - 1) {
        setQuizIndex(prev => prev + 1);
      } else {
        // Passage complete
        setCompletedPassages(prev => new Set([...prev, currentPassageIdx]));
        setGameState('results');
        playSound('complete');
      }
    }, 800);
  };

  const getRetentionRate = () => {
    const totalAnswered = correctAnswers + wrongAnswers;
    return totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;
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
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Speed reading • Fresh passages every session
                </p>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
                title="New passages"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
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
          <StatCard icon={<CheckCircle2 className="text-green-600" />} value={correctAnswers} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<XCircle className="text-red-600" />} value={wrongAnswers} label="Wrong" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-emerald-600" />} value={getOverallAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
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
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {currentPassage?.title || 'Reading RSVP Lab'}
                  </h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Level {currentPassage?.level} • {passages.length} passages • +5 points correct / -5 wrong
                  </p>
                  <button 
                    onClick={startReading} 
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Reading
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
                    Question {quizIndex + 1} of {currentPassage.questions.length} • +5 correct / -5 wrong
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
                      ? '✓ Correct! +5 points' 
                      : `✗ Incorrect. -5 points. Correct: ${currentPassage.questions[quizIndex].a}`}
                  </div>
                )}
              </div>
            )}

            {/* Results Screen - Optimized Display */}
            {gameState === 'results' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[500px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Award className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Passage Complete!</h3>
                  </div>
                  
                  <p className={`text-center mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {currentPassage.title} • Level {currentPassage.level}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Correct" value={correctAnswers} icon={<Check className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Wrong" value={wrongAnswers} icon={<XCircle className="w-4 h-4" />} color="text-red-500" />
                    <ResultCard label="Accuracy" value={getRetentionRate()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Combo" value={`${combo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="WPM" value={wpm} icon={<Gauge className="w-4 h-4" />} color="text-blue-500" />
                    <ResultCard label="Total Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button
                      onClick={nextPassage}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Next Passage →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* All Complete Screen - Enhanced Display */}
            {gameState === 'complete' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[500px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Mastery Achieved!</h3>
                  </div>
                  
                  <p className={`text-center mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    You've completed all {passages.length} passages!
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Accuracy" value={getOverallAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Correct" value={correctAnswers} icon={<Check className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Wrong" value={wrongAnswers} icon={<XCircle className="w-4 h-4" />} color="text-red-500" />
                    <ResultCard label="Max Combo" value={`${combo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Passages" value={`${completedPassages.size}/${passages.length}`} icon={<BookOpen className="w-4 h-4" />} color="text-blue-500" />
                    <ResultCard label="Total Questions" value={totalQuestions} icon={<Target className="w-4 h-4" />} color="text-cyan-500" />
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
                      New Passages →
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
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Words flash at a <span className="font-semibold text-emerald-500">single focal point</span> - don't move your eyes
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Correct answer: <span className="font-semibold text-green-500">+5 points</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Wrong answer: <span className="font-semibold text-red-500">-5 point penalty</span> (score never below 0)
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Every 3 correct = <span className="font-semibold text-orange-500">+5 combo bonus</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">Fresh passages</span> every session • Never the same content
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Score <span className="font-semibold text-purple-500">never goes below 0</span> • Combo resets on wrong answer
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🔄 Content regenerates on refresh • New questions every time</span>
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
                   color === 'text-red-500' ? 'bg-red-500/10' :
                   color === 'text-blue-500' ? 'bg-blue-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' : 'bg-gray-500/10';
  
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