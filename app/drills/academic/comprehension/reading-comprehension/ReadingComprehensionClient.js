'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  // ... (keep the same generatePassage function)

  const topics = {
    1: [
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
    2: [
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
    3: [
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
  
  const generateQuestions = (text, title) => {
    const sentences = text.split('. ').filter(s => s.length > 30);
    
    // Pick 3 random unique indices for sentences
    const indices = [];
    while (indices.length < 3 && indices.length < sentences.length) {
      const rand = Math.floor(Math.random() * sentences.length);
      if (!indices.includes(rand)) indices.push(rand);
    }
    
    const questions = [];
    
    // Question 1: Main idea (always first)
    questions.push({
      q: "What is the main topic discussed in this passage?",
      a: `The passage discusses ${title.toLowerCase()} and its key aspects`,
      options: [
        `The passage discusses ${title.toLowerCase()} and its key aspects`,
        `The history of scientific discoveries in the 20th century`,
        `Basic mathematics and arithmetic operations`,
        `Ancient civilizations and their cultural practices`
      ]
    });

    // Question 2 & 3: Based on random sentences
    if (sentences[indices[0]]) {
      const correctSentence = sentences[indices[0]];
      const otherIdx = indices[1] || 0;
      questions.push({
        q: `According to the passage, ${correctSentence.substring(0, 40)}...?`,
        a: correctSentence,
        options: [
          correctSentence,
          sentences[otherIdx] || "An alternative explanation not found in the text",
          "The opposite of what is stated in the passage",
          "A concept not mentioned anywhere in the text"
        ]
      });
    }

    if (sentences[indices[1]] && indices[1] !== indices[0]) {
      const correctSentence = sentences[indices[1]];
      questions.push({
        q: `What does the passage indicate about ${title.toLowerCase()}?`,
        a: correctSentence,
        options: [
          correctSentence,
          sentences[indices[0]] || "A different interpretation from the passage",
          "A commonly held misconception not in the text",
          "An outdated theory not referenced in the passage"
        ]
      });
    }

    return questions;
  };

  return {
    id: Date.now() + Math.random(),
    title: selectedTopic.title,
    level: level,
    text: selectedTopic.text,
    questions: generateQuestions(selectedTopic.text, selectedTopic.title)
  };
};

// StatCard Component
function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div>
      <p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

// ResultCard Component
function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = {
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
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

// Main Component
function ReadingComprehensionClient() {
  const [passages, setPassages] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  
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

  // UI State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);

  // Generate fresh passages on client mount
  useEffect(() => {
    setIsClient(true);
    setPassages([
      generatePassage(1),
      generatePassage(2),
      generatePassage(3)
    ]);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const currentPassage = useMemo(() => passages[currentPassageIdx], [passages, currentPassageIdx]);
  const words = useMemo(() => currentPassage?.text.split(' ') || [], [currentPassage]);
  const availablePassages = useMemo(() => 
    passages.filter((_, idx) => !completedPassages.has(idx)), 
    [passages, completedPassages]
  );

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('readingRSVPDrillBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'complete' && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('readingRSVPDrillBestScore', score.toString());
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

  const showFeedbackMessage = useCallback((message, type) => {
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
      const freqMap = {
        start: 660,
        correct: 880,
        wrong: 440,
        combo: 1046.5,
        complete: 1320
      };
      const durMap = {
        start: 0.1,
        correct: 0.15,
        wrong: 0.15,
        combo: 0.2,
        complete: 0.2
      };
      
      oscillator.frequency.setValueAtTime(freqMap[type] || 660, now);
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + (durMap[type] || 0.15));
      oscillator.start(now);
      oscillator.stop(now + (durMap[type] || 0.15));
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  const startReading = useCallback(() => {
    if (availablePassages.length === 0) {
      setCompletedPassages(new Set());
    }
    setGameState('reading');
    setIsPlaying(true);
    setWordIndex(0);
    playSound('start');
    showFeedbackMessage('Reading started • Focus on the center', 'success');
  }, [availablePassages.length, playSound, showFeedbackMessage]);

  const resetGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    // Generate completely new passages
    setPassages([
      generatePassage(1),
      generatePassage(2),
      generatePassage(3)
    ]);
    setGameState('start');
    setCurrentPassageIdx(0);
    scoreRef.current = 0;
    comboRef.current = 0;
    setScore(0);
    setCombo(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTotalQuestions(0);
    setCompletedPassages(new Set());
    setWordIndex(0);
    setQuizIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setFeedback('');
    setIsPlaying(false);
  }, []);

  const nextPassage = useCallback(() => {
    if (availablePassages.length > 0) {
      const nextIdx = passages.findIndex((_, idx) => !completedPassages.has(idx));
      setCurrentPassageIdx(nextIdx >= 0 ? nextIdx : 0);
      setGameState('start');
      setWordIndex(0);
      setQuizIndex(0);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setGameState('complete');
    }
  }, [availablePassages, completedPassages, passages]);

  // RSVP Timer
  useEffect(() => {
    if (isPlaying && gameState === 'reading' && words.length > 0) {
      const interval = Math.max(50, (60 / wpm) * 1000);
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
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, wpm, words.length, gameState]);

  const handleAnswer = useCallback((selected) => {
    if (!currentPassage || showFeedback) return;
    
    setSelectedOption(selected);
    setShowFeedback(true);
    
    const isCorrect = selected === currentPassage.questions[quizIndex].a;
    setTotalQuestions(prev => prev + 1);
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      const pointsEarned = 5;
      
      comboRef.current = comboRef.current + 1;
      setCombo(comboRef.current);
      
      if (comboRef.current > 0 && comboRef.current % 3 === 0) {
        playSound('combo');
        showFeedbackMessage(`🔥 ${comboRef.current}x Combo! +5 bonus`, 'success');
      }
      
      scoreRef.current = scoreRef.current + pointsEarned;
      setScore(scoreRef.current);
      playSound('correct');
      showFeedbackMessage(`✓ Correct! +${pointsEarned} points`, 'success');
    } else {
      setWrongAnswers(prev => prev + 1);
      const penalty = 5;
      
      comboRef.current = 0;
      setCombo(0);
      scoreRef.current = Math.max(0, scoreRef.current - penalty);
      setScore(scoreRef.current);
      playSound('wrong');
      showFeedbackMessage(`✗ Wrong! -${penalty} point penalty`, 'error');
    }
    
    setTimeout(() => {
      setSelectedOption(null);
      setShowFeedback(false);
      
      if (quizIndex < currentPassage.questions.length - 1) {
        setQuizIndex(prev => prev + 1);
      } else {
        setCompletedPassages(prev => {
          const newSet = new Set(prev);
          newSet.add(currentPassageIdx);
          return newSet;
        });
        setGameState('results');
        playSound('complete');
      }
    }, 800);
  }, [currentPassage, quizIndex, showFeedback, currentPassageIdx, playSound, showFeedbackMessage]);

  const getRetentionRate = useCallback(() => {
    const totalAnswered = correctAnswers + wrongAnswers;
    return totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;
  }, [correctAnswers, wrongAnswers]);

  const handleSpeedUp = useCallback(() => setWpm(w => Math.min(600, w + 50)), []);
  const handleSpeedDown = useCallback(() => setWpm(w => Math.max(100, w - 50)), []);

  const getButtonClass = useCallback((option) => {
    if (!showFeedback || selectedOption !== option) {
      return isBoxDarkMode 
        ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700 cursor-pointer' 
        : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 cursor-pointer';
    }
    
    if (option === currentPassage?.questions[quizIndex]?.a) {
      return 'bg-green-500 border-green-600 text-white cursor-default';
    }
    if (option === selectedOption) {
      return 'bg-red-500 border-red-600 text-white cursor-default';
    }
    return isBoxDarkMode 
      ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-default opacity-50' 
      : 'bg-white border-gray-200 text-gray-400 cursor-default opacity-50';
  }, [showFeedback, selectedOption, isBoxDarkMode, currentPassage, quizIndex]);

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
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reading comprehension drill...</p>
        </div>
      </div>
    );
  }

  if (!currentPassage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Generating fresh passages...</p>
          <button 
            onClick={resetGame} 
            className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition"
          >
            Generate New Passages
          </button>
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
            "name": "RSVP Speed Reading Drill",
            "url": "https://skilldrills.online/drills/academic/comprehension/reading-comprehension",
            "description": "Dynamic RSVP (Rapid Serial Visual Presentation) speed reading drill with fresh passages every session. 3 difficulty levels with comprehension quizzes. Adjustable 100-600 WPM reading speed.",
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
            "educationalUse": ["Speed Reading", "Reading Comprehension", "Vocabulary Building", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Speed Reading", "Reading Comprehension", "Information Retention", "Focus Training"]
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
              Comprehension
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} aria-current="page">
              Reading RSVP Lab
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Reading RSVP Lab
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Speed reading • Fresh passages every session • 3 difficulty levels
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            <button 
              onClick={resetGame} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`}
              title="Generate new passages"
              aria-label="Generate new reading passages"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
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
          <h2>RSVP Speed Reading Drill - Dynamic Comprehension Training</h2>
          <p>
            Improve your reading speed and comprehension with this RSVP (Rapid Serial Visual Presentation) drill.
            Words flash at a single focal point, eliminating eye movement for faster reading.
            Fresh passages generated every session across 3 difficulty levels: Beginner, Intermediate, and Advanced.
            Adjustable speed from 100 to 600 WPM. Each passage includes comprehension questions with +5 points for correct and -5 for wrong answers.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Gauge className="text-purple-600" />} value={wpm} label="WPM" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle2 className="text-green-600" />} value={correctAnswers} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<XCircle className="text-red-600" />} value={wrongAnswers} label="Wrong" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-emerald-600" />} value={getRetentionRate()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${
              feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedback || '\u00A0'}
          </div>
        </div>

        {/* WPM Control */}
        {gameState === 'start' && (
          <div className="flex justify-center mb-4">
            <div className={`flex items-center gap-3 p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Reading Speed:
              </span>
              <button 
                onClick={handleSpeedDown} 
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
                aria-label="Decrease reading speed"
                title="Slower"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className={`text-lg font-bold min-w-[60px] text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {wpm} WPM
              </span>
              <button 
                onClick={handleSpeedUp} 
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
                aria-label="Increase reading speed"
                title="Faster"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

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
          {isFullscreen && gameState !== 'start' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Generate new passages"
                aria-label="Generate new reading passages"
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
                    <BookOpen className="w-16 h-16 text-emerald-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {currentPassage?.title || 'Reading RSVP Lab'}
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Level {currentPassage?.level} • {passages.length} passages • +5/-5 points
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Words flash at a single point. No eye movement needed. Answer comprehension questions after each passage.
                  </p>
                  <button 
                    onClick={startReading} 
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    aria-label="Start speed reading"
                  >
                    Start Reading
                  </button>
                </div>
              </div>
            )}

            {/* ============ READING SCREEN ============ */}
            {gameState === 'reading' && (
              <div className="text-center w-full">
                <div className="flex justify-center mb-4 opacity-20" aria-hidden="true">
                  <div className="w-1 h-8 bg-emerald-500 mx-1" />
                </div>
                
                <div className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight h-24 flex items-center justify-center">
                  <span className={isBoxDarkMode ? 'text-white' : 'text-gray-900'}>
                    {words[wordIndex]}
                  </span>
                </div>

                <div className="flex justify-center mt-4 opacity-20" aria-hidden="true">
                  <div className="w-1 h-8 bg-emerald-500 mx-1" />
                </div>

                {/* Progress Bar */}
                <div className="mt-8 w-64 mx-auto">
                  <div className={`h-1.5 rounded-full ${isBoxDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-200"
                      style={{ width: `${words.length > 0 ? (wordIndex / words.length) * 100 : 0}%` }}
                      role="progressbar"
                      aria-valuenow={words.length > 0 ? Math.round((wordIndex / words.length) * 100) : 0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Reading progress"
                    />
                  </div>
                </div>

                <div className="mt-8 flex gap-4 justify-center">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)} 
                    className={`p-4 rounded-full transition ${isBoxDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                    aria-label={isPlaying ? 'Pause reading' : 'Resume reading'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                </div>
                
                <p className={`mt-4 text-xs ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {wordIndex + 1} of {words.length} words
                </p>
              </div>
            )}

            {/* ============ TESTING SCREEN ============ */}
            {gameState === 'testing' && currentPassage && (
              <div className="w-full max-w-xl">
                <div className="mb-4">
                  <span className={`text-sm font-bold ${isBoxDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    Question {quizIndex + 1} of {currentPassage.questions.length} • +5 correct / -5 wrong
                  </span>
                </div>
                
                <h2 className={`text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 leading-tight ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {currentPassage.questions[quizIndex].q}
                </h2>
                
                <div className="grid gap-3" role="radiogroup" aria-label="Answer options">
                  {currentPassage.questions[quizIndex].options.map((opt, i) => {
                    const letter = String.fromCharCode(65 + i);
                    return (
                      <button
                        key={i}
                        onClick={() => !showFeedback && handleAnswer(opt)}
                        disabled={showFeedback}
                        className={`p-3 sm:p-4 rounded-xl border-2 text-left font-medium transition-all ${getButtonClass(opt)} ${
                          !showFeedback ? 'active:scale-[0.98]' : ''
                        }`}
                        aria-label={`Option ${letter}: ${opt}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                            isBoxDarkMode && !showFeedback ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'
                          }`}>
                            {letter}
                          </span>
                          <span className="text-sm sm:text-base">{opt}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                
                {showFeedback && (
                  <div className={`mt-4 p-4 rounded-lg text-center font-medium ${
                    selectedOption === currentPassage.questions[quizIndex].a 
                      ? isBoxDarkMode ? 'bg-green-900/30 border border-green-800 text-green-400' : 'bg-green-50 border border-green-200 text-green-600'
                      : isBoxDarkMode ? 'bg-red-900/30 border border-red-800 text-red-400' : 'bg-red-50 border border-red-200 text-red-500'
                  }`} role="alert">
                    {selectedOption === currentPassage.questions[quizIndex].a 
                      ? '✓ Correct! +5 points' 
                      : `✗ Incorrect. -5 points.`}
                  </div>
                )}
              </div>
            )}

            {/* ============ RESULTS SCREEN ============ */}
            {gameState === 'results' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[500px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Award className="w-10 h-10 text-yellow-500" aria-hidden="true" />
                    <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Passage Complete!
                    </h2>
                  </div>
                  
                  <p className={`text-center mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {currentPassage.title} • Level {currentPassage.level}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Correct" value={correctAnswers} icon={<Check className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Wrong" value={wrongAnswers} icon={<XCircle className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getRetentionRate()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Combo" value={`${combo}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                    <ResultCard label="WPM" value={wpm} icon={<Gauge className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                    <ResultCard label="Total Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button
                      onClick={nextPassage}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      Next Passage →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ============ COMPLETE SCREEN ============ */}
            {gameState === 'complete' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[500px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Trophy className="w-10 h-10 text-yellow-500" aria-hidden="true" />
                    <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Mastery Achieved!
                    </h2>
                  </div>
                  
                  <p className={`text-center mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    You&apos;ve completed all {passages.length} passages!
                  </p>
                  <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Great speed reading and comprehension. Generate new passages to practice again.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getRetentionRate()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Correct" value={correctAnswers} icon={<Check className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Wrong" value={wrongAnswers} icon={<XCircle className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                    <ResultCard label="Max Combo" value={`${combo}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                    <ResultCard label="Passages" value={`${completedPassages.size}/${passages.length}`} icon={<BookOpen className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                    <ResultCard label="Total Questions" value={totalQuestions} icon={<Target className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
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
          <footer className="mt-6" aria-label="Drill rules and scoring information">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Words flash at a <span className="font-semibold text-emerald-500">single focal point</span> - don&apos;t move your eyes
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Correct answer: <span className="font-semibold text-green-500">+5 points</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Wrong answer: <span className="font-semibold text-red-500">-5 point penalty</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Every 3 correct = <span className="font-semibold text-orange-500">+5 combo bonus</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">Fresh passages</span> every session
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Score <span className="font-semibold text-purple-500">never goes below 0</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🔄 Content regenerates on refresh • New questions every time</span>
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

// Export as named export and default export for compatibility
export { ReadingComprehensionClient };
export default ReadingComprehensionClient;