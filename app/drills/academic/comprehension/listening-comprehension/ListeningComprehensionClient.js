'use client';

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Award, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Headphones, Check, Trophy, X,
  Play, Pause, FileText, BarChart3, Timer, Info, RefreshCw
} from 'lucide-react';

export default function ListeningComprehensionClient() {
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bestScore, setBestScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [voiceType, setVoiceType] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const inputRef = useRef(null);
  const gameContainerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const timerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const gameStateRef = useRef('start');
  const questionAutoAdvanceRef = useRef(null);

  // Audio Scripts with their questions - Memoized to prevent recreation
  const AUDIO_SCRIPTS = useMemo(() => [
    { 
      id: 0,
      level: 1, 
      text: "The quick brown fox jumps over the lazy dog near the river bank early in the morning.", 
      questions: [
        { q: "What animal jumps over the dog?", options: ["Cat", "Fox", "Rabbit", "Deer"], correct: 1 },
        { q: "Where does this happen?", options: ["Forest", "River bank", "Mountain", "Field"], correct: 1 }
      ], 
      difficulty: "Easy", 
      voice: "Female" 
    },
    { 
      id: 1,
      level: 1, 
      text: "Sarah went to the grocery store to buy apples, bananas, and oranges. She spent $5 on apples, $3 on bananas, and $4 on oranges.", 
      questions: [
        { q: "How much did Sarah spend on bananas?", options: ["$5", "$3", "$4", "$12"], correct: 1 },
        { q: "What fruit did Sarah buy first?", options: ["Bananas", "Oranges", "Apples", "Grapes"], correct: 2 }
      ], 
      difficulty: "Easy", 
      voice: "Male" 
    },
    { 
      id: 2,
      level: 1, 
      text: "The museum opens at 9 AM and closes at 5 PM. It is closed on Mondays. On Tuesdays, there&apos;s a special exhibition about dinosaurs.", 
      questions: [
        { q: "What time does the museum open?", options: ["8 AM", "9 AM", "10 AM", "11 AM"], correct: 1 },
        { q: "What day is the museum closed?", options: ["Tuesday", "Wednesday", "Monday", "Friday"], correct: 2 }
      ], 
      difficulty: "Easy", 
      voice: "Female" 
    },
    { 
      id: 3,
      level: 2, 
      text: "The train from New York to Boston departs at 10:30 AM and arrives at 2:15 PM. The ticket costs $45 for adults and $25 for children.", 
      questions: [
        { q: "How long is the train journey?", options: ["3h 15m", "3h 45m", "4h 15m", "4h 45m"], correct: 1 },
        { q: "How much is a child ticket?", options: ["$45", "$35", "$25", "$20"], correct: 2 }
      ], 
      difficulty: "Medium", 
      voice: "Male" 
    },
    { 
      id: 4,
      level: 2, 
      text: "The Amazon rainforest produces 20% of the world&apos;s oxygen. It spans across 9 countries and is home to over 400 billion trees.", 
      questions: [
        { q: "What percentage of oxygen does the Amazon produce?", options: ["10%", "15%", "20%", "25%"], correct: 2 },
        { q: "How many countries does the Amazon span?", options: ["7", "8", "9", "10"], correct: 2 }
      ], 
      difficulty: "Medium", 
      voice: "Female" 
    },
    { 
      id: 5,
      level: 2, 
      text: "The Great Wall of China is over 13,000 miles long. It was built over 2,000 years ago and took more than 1,000 years to complete.", 
      questions: [
        { q: "How long is the Great Wall?", options: ["10k miles", "11k miles", "12k miles", "13k miles"], correct: 3 },
        { q: "How many years did it take to build?", options: ["500 years", "800 years", "1,000 years", "1,200 years"], correct: 2 }
      ], 
      difficulty: "Medium", 
      voice: "Male" 
    },
    { 
      id: 6,
      level: 3, 
      text: "Mount Everest is 29,029 feet tall. It was first climbed by Sir Edmund Hillary and Tenzing Norgay in 1953. Over 4,000 people have reached the summit.", 
      questions: [
        { q: "Who first climbed Everest in 1953?", options: ["Hillary only", "Norgay only", "Both", "Neither"], correct: 2 },
        { q: "About how many have reached the summit?", options: ["2,000", "3,000", "4,000", "5,000"], correct: 2 }
      ], 
      difficulty: "Hard", 
      voice: "Female" 
    },
    { 
      id: 7,
      level: 3, 
      text: "The human brain has about 86 billion neurons. It consumes 20% of the body&apos;s energy but makes up only 2% of body weight. The brain can process information at 120 meters per second.", 
      questions: [
        { q: "How many neurons are in the human brain?", options: ["50 billion", "86 billion", "100 billion", "120 billion"], correct: 1 },
        { q: "What percentage of energy does the brain consume?", options: ["10%", "15%", "20%", "25%"], correct: 2 }
      ], 
      difficulty: "Hard", 
      voice: "Male" 
    },
    { 
      id: 8,
      level: 3, 
      text: "The Pacific Ocean covers 63 million square miles and is larger than all landmasses combined. Its deepest point, the Mariana Trench, reaches 36,000 feet below sea level.", 
      questions: [
        { q: "How large is the Pacific Ocean?", options: ["50M sq mi", "63M sq mi", "70M sq mi", "80M sq mi"], correct: 1 },
        { q: "How deep is the Mariana Trench?", options: ["30,000 ft", "33,000 ft", "36,000 ft", "40,000 ft"], correct: 2 }
      ], 
      difficulty: "Hard", 
      voice: "Female" 
    }
  ], []);

  // Flatten all questions with their parent script info - Memoized
  const ALL_QUESTIONS = useMemo(() => 
    AUDIO_SCRIPTS.flatMap(script => 
      script.questions.map((q, qIdx) => ({
        ...q,
        scriptText: script.text,
        scriptId: script.id,
        questionId: `${script.id}-${qIdx}`,
        difficulty: script.difficulty,
        voice: script.voice,
        level: script.level
      }))
    ), [AUDIO_SCRIPTS]
  );

  const getAvailableQuestions = useCallback(() => {
    return ALL_QUESTIONS.filter(q => !completedQuestions.has(q.questionId));
  }, [completedQuestions, ALL_QUESTIONS]);

  const stopAudio = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setAudioProgress(0);
  }, []);

  const loadNewQuestion = useCallback(() => {
    stopAudio();
    
    // Clear any pending auto-advance
    if (questionAutoAdvanceRef.current) {
      clearTimeout(questionAutoAdvanceRef.current);
      questionAutoAdvanceRef.current = null;
    }
    
    const available = getAvailableQuestions();
    
    if (available.length === 0) {
      setGameState('complete');
      gameStateRef.current = 'complete';
      return;
    }
    
    const randomQuestion = available[Math.floor(Math.random() * available.length)];
    
    setCurrentQuestion(randomQuestion);
    setUserAnswer('');
    setShowTranscript(false);
    setFeedback('');
    setFeedbackType('');
    setVoiceType(randomQuestion.voice === 'Female' ? 0 : 1);
    
    // Auto-focus input after render
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, [getAvailableQuestions, stopAudio]);

  // Mark as client-side rendered (prevents hydration mismatch)
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score from localStorage
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('listeningComprehensionBestScore');
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
        localStorage.setItem('listeningComprehensionBestScore', score.toString());
      } catch (e) {
        // localStorage not available
      }
    }
  }, [gameState, score, bestScore]);

  // Sync gameState to ref for timer cleanup
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const showFeedbackMessage = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 1000);
  }, []);

  const playAudio = useCallback(() => {
    if (!currentQuestion || !soundEnabled) return;
    
    stopAudio();
    
    setIsPlaying(true);
    setAudioProgress(0);
    
    const duration = Math.max(4000, currentQuestion.scriptText.length * 60);
    const startTime = Date.now();
    
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setAudioProgress(progress);
      
      if (progress >= 100) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        setIsPlaying(false);
      }
    }, 100);
    
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Ensure voices are loaded
      const voices = window.speechSynthesis.getVoices();
      
      const utterance = new SpeechSynthesisUtterance(currentQuestion.scriptText);
      utterance.rate = 0.85;
      utterance.pitch = voiceType === 0 ? 1.2 : 0.9;
      
      // Try to find appropriate voice
      const targetVoice = voices.find(v => 
        voiceType === 0 ? v.name.toLowerCase().includes('female') : v.name.toLowerCase().includes('male')
      );
      if (targetVoice) {
        utterance.voice = targetVoice;
      }
      
      utterance.onend = () => {
        setIsPlaying(false);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        setAudioProgress(100);
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      };
      
      window.speechSynthesis.speak(utterance);
    }
  }, [currentQuestion, soundEnabled, voiceType, stopAudio]);

  const playPenaltySound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {
      // Audio not supported
    }
  }, [soundEnabled]);

  const checkAnswer = useCallback(() => {
    if (!currentQuestion || userAnswer === '') return;
    
    // Clear any pending auto-advance
    if (questionAutoAdvanceRef.current) {
      clearTimeout(questionAutoAdvanceRef.current);
      questionAutoAdvanceRef.current = null;
    }
    
    const isCorrect = parseInt(userAnswer) === currentQuestion.correct;
    setTotalQuestions(prev => prev + 1);
    
    if (isCorrect) {
      const pointsEarned = 1;
      scoreRef.current = scoreRef.current + pointsEarned;
      setScore(scoreRef.current);
      setCorrectAnswers(prev => prev + 1);
      showFeedbackMessage(`✓ Correct! +${pointsEarned}`, 'success');
      setCompletedQuestions(prev => {
        const newSet = new Set(prev);
        newSet.add(currentQuestion.questionId);
        return newSet;
      });
      
      // Auto-advance after correct answer
      questionAutoAdvanceRef.current = setTimeout(() => {
        loadNewQuestion();
      }, 800);
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      setWrongAnswers(prev => prev + 1);
      showFeedbackMessage('✗ Wrong! -1 point penalty', 'error');
      playPenaltySound();
      
      // Auto-advance after wrong answer
      questionAutoAdvanceRef.current = setTimeout(() => {
        loadNewQuestion();
      }, 1000);
    }
  }, [currentQuestion, userAnswer, showFeedbackMessage, playPenaltySound, loadNewQuestion]);

  // Handle keyboard submission
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState === 'playing' && currentQuestion && userAnswer !== '') {
        if (e.key === 'Enter') {
          e.preventDefault();
          checkAnswer();
        }
      }
      // Number keys to select option
      if (gameState === 'playing' && currentQuestion) {
        const numKey = parseInt(e.key);
        if (numKey >= 0 && numKey < currentQuestion.options.length) {
          setUserAnswer(numKey.toString());
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, currentQuestion, userAnswer, checkAnswer]);

  const getAccuracy = useCallback(() => {
    if (totalQuestions === 0) return 100;
    return Math.round((correctAnswers / totalQuestions) * 100);
  }, [totalQuestions, correctAnswers]);

  const toggleGameFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const element = gameContainerRef.current;
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

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing') {
      // Load first question when game starts
      loadNewQuestion();
      
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        stopAudio();
      };
    }
  }, [gameState, loadNewQuestion, stopAudio]);

  const startGame = useCallback(() => {
    // Clean up any existing state
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (questionAutoAdvanceRef.current) clearTimeout(questionAutoAdvanceRef.current);
    stopAudio();
    
    scoreRef.current = 0;
    gameStateRef.current = 'playing';
    
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setTotalQuestions(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setFeedback('');
    setFeedbackType('');
    setCompletedQuestions(new Set());
    setCurrentQuestion(null);
    setUserAnswer('');
    setShowTranscript(false);
    setIsPlaying(false);
    setAudioProgress(0);
  }, [stopAudio]);

  const resetGame = useCallback(() => {
    stopAudio();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }
    if (questionAutoAdvanceRef.current) {
      clearTimeout(questionAutoAdvanceRef.current);
      questionAutoAdvanceRef.current = null;
    }
    
    scoreRef.current = 0;
    gameStateRef.current = 'start';
    
    setGameState('start');
    setScore(0);
    setTimeLeft(60);
    setTotalQuestions(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setFeedback('');
    setFeedbackType('');
    setCompletedQuestions(new Set());
    setCurrentQuestion(null);
    setUserAnswer('');
    setShowTranscript(false);
    setIsPlaying(false);
    setAudioProgress(0);
  }, [stopAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (questionAutoAdvanceRef.current) clearTimeout(questionAutoAdvanceRef.current);
    };
  }, [stopAudio]);

  // Load voices early
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listening comprehension drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SEO Structured Data - Hidden from view, readable by search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Listening Comprehension Drill",
            "url": "https://skilldrills.online/drills/academic/comprehension/listening-comprehension",
            "description": "Interactive listening comprehension drill with 9 audio passages and 18 questions across Easy, Medium, and Hard levels. Features male and female voice synthesis for auditory memory training.",
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
            "educationalUse": ["Listening Comprehension", "Auditory Processing", "Memory Training", "Language Learning"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Listening Skills", "Auditory Memory", "Detail Recall", "Audio Comprehension"]
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
            <li className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-current="page">
              Listening Comprehension
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex-shrink-0">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Listening Comprehension
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                9 passages • 18 questions • 60-second challenge
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
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
              onClick={toggleGameFullscreen} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* SEO Content - Visible to search engines */}
        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Listening Comprehension Drill - Audio Memory Training</h2>
          <p>
            Improve your auditory processing and memory recall with this interactive listening comprehension drill.
            Features 9 audio passages spanning 3 difficulty levels (Easy, Medium, Hard) with 18 total questions.
            Listen to male and female voice narrations, answer multiple-choice questions, and optionally view transcripts.
            This 60-second timed challenge tracks your score, accuracy, and best performance.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Check className="text-emerald-600" />} value={correctAnswers} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<X className="text-red-500" />} value={wrongAnswers} label="Wrong" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Headphones className="text-cyan-600" />} value={`${completedQuestions.size}/18`} label="Completed" isDark={isDarkMode} />
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

        {/* Game Container */}
        <div 
          ref={gameContainerRef}
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
              <button onClick={toggleGameFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen">
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
            
            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && currentQuestion && (
              <div className="w-full max-w-3xl h-full flex flex-col">
                {/* Audio Player */}
                <div className={`rounded-xl p-4 sm:p-6 mb-4 ${isBoxDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100'}`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Headphones className={`w-6 h-6 flex-shrink-0 ${isBoxDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      <h3 className={`text-lg font-semibold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Audio Passage</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        currentQuestion.difficulty === 'Easy' 
                          ? isBoxDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                          : currentQuestion.difficulty === 'Medium'
                          ? isBoxDarkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                          : isBoxDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
                      }`}>
                        {currentQuestion.difficulty}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${isBoxDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-purple-100 text-purple-700'}`}>
                        {currentQuestion.voice} Voice
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={playAudio} 
                        disabled={isPlaying} 
                        className={`p-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${isBoxDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                        aria-label={isPlaying ? 'Audio playing' : 'Play audio passage'}
                      >
                        <Play className="w-5 h-5" />
                        <span className="text-sm font-medium hidden sm:inline">Play</span>
                      </button>
                      <button 
                        onClick={stopAudio} 
                        className={`p-2 rounded-lg transition flex items-center gap-2 ${isBoxDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-500 hover:bg-gray-600 text-white'}`}
                        aria-label="Stop audio"
                      >
                        <Pause className="w-5 h-5" />
                        <span className="text-sm font-medium hidden sm:inline">Stop</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Audio Progress Bar */}
                  <div className="mb-3">
                    <div className={`w-full rounded-full h-2.5 ${isBoxDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                        style={{ width: `${audioProgress}%` }}
                        role="progressbar"
                        aria-valuenow={audioProgress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Audio playback progress"
                      />
                    </div>
                  </div>
                  
                  <p className={`text-sm text-center ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isPlaying ? '🔊 Playing audio...' : audioProgress === 100 ? '✅ Audio completed' : '▶️ Click play to listen'}
                  </p>
                </div>

                {/* Question Section */}
                <div className={`rounded-xl border p-4 sm:p-6 mb-4 flex-1 ${isBoxDarkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-base sm:text-lg font-semibold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Question {totalQuestions + 1}
                    </h3>
                    <span className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Press 1-4 to select, Enter to submit
                    </span>
                  </div>
                  <p className={`mb-6 text-sm sm:text-base ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {currentQuestion.q}
                  </p>
                  
                  <div className="space-y-3 mb-6" role="radiogroup" aria-label="Answer options">
                    {currentQuestion.options.map((option, idx) => (
                      <label 
                        key={idx} 
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          userAnswer === idx.toString() 
                            ? isBoxDarkMode 
                              ? 'border-blue-500 bg-blue-900/30 ring-1 ring-blue-500' 
                              : 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                            : isBoxDarkMode 
                              ? 'border-gray-700 hover:border-gray-500 hover:bg-gray-700/50' 
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="answer" 
                          value={idx} 
                          checked={userAnswer === idx.toString()} 
                          onChange={(e) => setUserAnswer(e.target.value)} 
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className={`text-sm sm:text-base font-medium ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold mr-2 ${
                            isBoxDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                  
                  <button 
                    onClick={checkAnswer} 
                    disabled={userAnswer === ''} 
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Submit your answer"
                  >
                    Submit Answer
                  </button>
                </div>

                {/* Transcript Toggle */}
                <button 
                  onClick={() => setShowTranscript(!showTranscript)} 
                  className={`flex items-center justify-center gap-2 text-sm transition mx-auto ${isBoxDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
                  aria-expanded={showTranscript}
                  aria-label={showTranscript ? 'Hide transcript' : 'Show transcript'}
                >
                  <FileText className="w-4 h-4" />
                  {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
                </button>

                {showTranscript && (
                  <div className={`mt-3 p-4 rounded-lg border text-sm italic ${isBoxDarkMode ? 'bg-gray-800/50 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                    &ldquo;{currentQuestion.scriptText}&rdquo;
                  </div>
                )}
              </div>
            )}

            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Headphones className="w-16 h-16 text-blue-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Listening Comprehension
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    60-second challenge • 18 unique questions
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Listen to audio passages and answer questions. 3 difficulty levels with male and female voices. Transcript available after listening.
                  </p>
                  <button 
                    onClick={startGame} 
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Start listening comprehension drill"
                  >
                    Start Drill
                  </button>
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
                    Keep practicing to improve your listening comprehension speed and accuracy.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Correct" value={correctAnswers} icon={<Check className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Wrong" value={wrongAnswers} icon={<X className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                    <ResultCard label="Completed" value={`${completedQuestions.size}/18`} icon={<Headphones className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
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

            {/* ============ COMPLETE SCREEN ============ */}
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
                    You&apos;ve completed all 18 questions!
                  </p>
                  <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Outstanding listening comprehension. Try again to beat your score.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Correct" value={correctAnswers} icon={<Check className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Wrong" value={wrongAnswers} icon={<X className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                    <ResultCard label="Time Left" value={`${timeLeft}s`} icon={<Timer className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
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

        {/* Rules Section */}
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
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Listen to the <span className="font-semibold text-blue-500">audio passage</span> carefully</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct answer: <span className="font-semibold text-green-500">+1 point</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong answer: <span className="font-semibold text-red-500">-1 point penalty</span></p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-orange-500">60 seconds</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Questions <span className="font-semibold text-yellow-500">never repeat</span> within a session</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Score <span className="font-semibold text-purple-500">never goes below 0</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🎧 9 passages • Male & Female voices • 3 difficulty levels</span>
                  <span>🏆 Best Score saves locally • Keyboard shortcuts (1-4, Enter)</span>
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
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
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