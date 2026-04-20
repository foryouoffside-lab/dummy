'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Award, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Headphones, Check, Trophy,
  Play, Pause, FileText, BarChart3, Timer, Info
} from 'lucide-react';

export default function ListeningComprehensionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bestScore, setBestScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [combo, setCombo] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [voiceType, setVoiceType] = useState(0);
  
  const inputRef = useRef(null);
  const gameContainerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const timerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);

  // Audio Scripts with their questions
  const AUDIO_SCRIPTS = [
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
      text: "The museum opens at 9 AM and closes at 5 PM. It is closed on Mondays. On Tuesdays, there's a special exhibition about dinosaurs.", 
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
      text: "The Amazon rainforest produces 20% of the world's oxygen. It spans across 9 countries and is home to over 400 billion trees.", 
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
      text: "The human brain has about 86 billion neurons. It consumes 20% of the body's energy but makes up only 2% of body weight. The brain can process information at 120 meters per second.", 
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
  ];

  // Flatten all questions with their parent script info
  const ALL_QUESTIONS = AUDIO_SCRIPTS.flatMap(script => 
    script.questions.map((q, qIdx) => ({
      ...q,
      scriptText: script.text,
      scriptId: script.id,
      questionId: `${script.id}-${qIdx}`,
      difficulty: script.difficulty,
      voice: script.voice,
      level: script.level
    }))
  );

  const getAvailableQuestions = useCallback(() => {
    return ALL_QUESTIONS.filter(q => !completedQuestions.has(q.questionId));
  }, [completedQuestions]);

  const loadNewQuestion = useCallback(() => {
    const available = getAvailableQuestions();
    
    if (available.length === 0) {
      setGameState('complete');
      return;
    }
    
    const randomQuestion = available[Math.floor(Math.random() * available.length)];
    
    setCurrentQuestion(randomQuestion);
    setUserAnswer('');
    setShowTranscript(false);
    setFeedback('');
    setFeedbackType('');
    setVoiceType(randomQuestion.voice === 'Female' ? 0 : 1);
    stopAudio();
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [getAvailableQuestions]);

  // Load best score
  useEffect(() => {
    const savedBestScore = localStorage.getItem('listeningComprehensionBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score
  useEffect(() => {
    if ((gameState === 'gameOver' || gameState === 'complete') && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('listeningComprehensionBestScore', score.toString());
    }
  }, [gameState, score, bestScore]);

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  };

  const playAudio = () => {
    if (!currentQuestion || !soundEnabled) return;
    
    setIsPlaying(true);
    setAudioProgress(0);
    
    const duration = Math.max(4000, currentQuestion.scriptText.length * 55);
    const startTime = Date.now();
    
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setAudioProgress(progress);
      
      if (progress >= 100) {
        clearInterval(progressIntervalRef.current);
        setIsPlaying(false);
      }
    }, 100);
    
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(currentQuestion.scriptText);
      utterance.rate = 0.85 + (voiceType * 0.05);
      utterance.pitch = voiceType === 0 ? 1.2 : 0.9;
      utterance.voice = window.speechSynthesis.getVoices().find(v => 
        voiceType === 0 ? v.name.includes('Female') : v.name.includes('Male')
      ) || null;
      
      utterance.onend = () => {
        setIsPlaying(false);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setAudioProgress(100);
      };
      
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setAudioProgress(0);
  };

  const checkAnswer = () => {
    if (!currentQuestion || !userAnswer) return;
    
    const isCorrect = parseInt(userAnswer) === currentQuestion.correct;
    setTotalQuestions(prev => prev + 1);
    
    if (isCorrect) {
      const basePoints = 15;
      const comboBonus = Math.floor(combo / 3) * 5;
      const totalPoints = basePoints + comboBonus;
      
      setScore(prev => prev + totalPoints);
      setCorrectAnswers(prev => prev + 1);
      setCombo(prev => prev + 1);
      showFeedback(`✓ Correct! +${totalPoints}`, 'success');
      setCompletedQuestions(prev => new Set([...prev, currentQuestion.questionId]));
      
      setTimeout(() => loadNewQuestion(), 800);
    } else {
      setCombo(0);
      setScore(prev => Math.max(0, prev - 10));
      showFeedback(`✗ Wrong! -10`, 'error');
      
      setTimeout(() => loadNewQuestion(), 800);
    }
  };

  const getAccuracy = () => {
    if (totalQuestions === 0) return 100;
    return Math.round((correctAnswers / totalQuestions) * 100);
  };

  const toggleGameFullscreen = async () => {
    try {
      if (!isFullscreen) {
        const element = gameContainerRef.current;
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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    setLoading(false);
  }, [status, router]);

  useEffect(() => {
    if (gameState === 'playing') {
      loadNewQuestion();
      
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameState('gameOver');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        clearInterval(timerRef.current);
        stopAudio();
      };
    }
  }, [gameState, loadNewQuestion]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setCombo(0);
    setTotalQuestions(0);
    setCorrectAnswers(0);
    setFeedback('');
    setFeedbackType('');
    setCompletedQuestions(new Set());
    loadNewQuestion();
  };

  const resetGame = () => {
    startGame();
  };

  useEffect(() => {
    return () => {
      stopAudio();
      if (timerRef.current) clearInterval(timerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listening drill...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

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
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Listening Comprehension</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>9 passages • 18 questions • 60 seconds</p>
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
              <button onClick={toggleGameFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
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
          <StatCard icon={<Check className="text-emerald-600" />} value={correctAnswers} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Headphones className="text-cyan-600" />} value={`${completedQuestions.size}/18`} label="Completed" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={gameContainerRef}
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
              <button onClick={toggleGameFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center p-8 overflow-y-auto">
            {/* Playing Screen */}
            {gameState === 'playing' && currentQuestion && (
              <div className="w-full h-full flex flex-col">
                {/* Audio Player */}
                <div className={`rounded-xl p-6 mb-4 ${isBoxDarkMode ? 'bg-gray-800/50' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Headphones className={`w-6 h-6 ${isBoxDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      <h3 className={`text-lg font-semibold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Audio Passage</h3>
                      <span className={`text-xs px-2 py-1 rounded ${isBoxDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-100 text-blue-700'}`}>
                        {currentQuestion.difficulty}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={playAudio} 
                        disabled={isPlaying} 
                        className={`p-2 rounded-lg transition disabled:opacity-50 ${isBoxDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                      >
                        <Play className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={stopAudio} 
                        className={`p-2 rounded-lg transition ${isBoxDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-500 hover:bg-gray-600 text-white'}`}
                      >
                        <Pause className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className={`w-full rounded-full h-2 ${isBoxDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${audioProgress}%` }} />
                    </div>
                  </div>
                  
                  <p className={`text-sm text-center ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isPlaying ? '🔊 Playing audio...' : '▶️ Click play to listen'}
                  </p>
                </div>

                {/* Question */}
                <div className={`rounded-xl border p-6 mb-4 flex-1 ${isBoxDarkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Question {totalQuestions + 1}:
                  </h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{currentQuestion.q}</p>
                  
                  <div className="space-y-3 mb-6">
                    {currentQuestion.options.map((option, idx) => (
                      <label key={idx} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                        userAnswer === idx.toString() 
                          ? isBoxDarkMode ? 'border-blue-500 bg-blue-900/30' : 'border-blue-500 bg-blue-50'
                          : isBoxDarkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                        <input type="radio" name="answer" value={idx} checked={userAnswer === idx.toString()} onChange={(e) => setUserAnswer(e.target.value)} className="w-4 h-4 text-blue-600" />
                        <span className={isBoxDarkMode ? 'text-gray-300' : 'text-gray-700'}>{String.fromCharCode(65 + idx)}. {option}</span>
                      </label>
                    ))}
                  </div>
                  
                  <button 
                    onClick={checkAnswer} 
                    disabled={!userAnswer} 
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Submit Answer
                  </button>
                </div>

                {/* Transcript Toggle */}
                <button 
                  onClick={() => setShowTranscript(!showTranscript)} 
                  className={`flex items-center justify-center gap-2 text-sm transition ${isBoxDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <FileText className="w-4 h-4" />
                  {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
                </button>

                {showTranscript && (
                  <div className={`mt-3 p-4 rounded-lg border ${isBoxDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <p className={`text-sm italic ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      "{currentQuestion.scriptText}"
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Headphones className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Listening Comprehension</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • 18 unique questions</p>
                  <button 
                    onClick={startGame} 
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
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
                    <ResultCard label="Correct" value={correctAnswers} icon={<Check className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Completed" value={`${completedQuestions.size}/18`} icon={<Headphones className="w-4 h-4" />} color="text-blue-500" />
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

            {/* Complete Screen */}
            {gameState === 'complete' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Mastery Achieved!</h3>
                  </div>
                  
                  <p className={`text-center mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    You've completed all 18 questions!
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Correct" value={correctAnswers} icon={<Check className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Max Combo" value={`${combo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Time Left" value={`${timeLeft}s`} icon={<Timer className="w-4 h-4" />} color="text-cyan-500" />
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
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Listen to the <span className="font-semibold text-blue-500">audio passage</span> carefully</p>
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
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong answer: <span className="font-semibold text-red-500">-10 points</span> + combo resets</p>
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
                  <span>🎧 9 passages • Male & Female voices • Show transcript available</span>
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
                   color === 'text-blue-500' ? 'bg-blue-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 'bg-cyan-500/10';
  
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