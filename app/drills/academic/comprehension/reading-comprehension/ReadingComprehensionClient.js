'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Zap, Award, 
  Volume2, VolumeX, Maximize2, Minimize2, Timer,
  Target,
  Play, Pause, CheckCircle2, Brain, Trophy,
  ChevronUp, ChevronDown, BarChart3, Info, Gauge,
  RefreshCw, XCircle,
  GraduationCap, TrendingUp, ArrowRight,
  Headphones, Code2, Hash, Share2, LogOut, Lightbulb , ChevronRight ,Scale 
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
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCorrect() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch(e) {}
  }

  playWrong() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
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
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
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
      const notes = [660, 880, 1100, 1320];
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
  
  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ============================================================
// PASSAGE GENERATOR
// ============================================================
const generatePassage = (level) => {
  const topics = {
    1: [
      { title: "The Water Cycle", text: "Water on Earth is constantly moving through a process called the water cycle. The sun heats water in oceans and lakes, causing it to evaporate into water vapor. This vapor rises into the atmosphere where it cools and condenses into clouds. When the clouds become heavy enough, the water falls back to Earth as precipitation in the form of rain or snow. This water then flows into rivers and streams, eventually returning to the oceans where the cycle begins again. This continuous process has been happening for billions of years and is essential for all life on our planet." },
      { title: "Photosynthesis Basics", text: "Plants are remarkable living organisms that can create their own food through photosynthesis. Using energy from sunlight, plants convert carbon dioxide from the air and water from the soil into glucose, a type of sugar that provides them with energy. During this process, plants release oxygen as a byproduct, which is essential for animals and humans to breathe. The green color in leaves comes from chlorophyll, a special pigment that captures sunlight energy. Without photosynthesis, life on Earth as we know it would not be possible." },
      { title: "The Five Senses", text: "Humans experience the world through five main senses: sight, hearing, smell, taste, and touch. Our eyes detect light and send signals to the brain that create images. Ears capture sound waves vibrating through the air. The nose contains millions of receptors that identify different odors. Taste buds on the tongue distinguish between sweet, sour, salty, bitter, and umami flavors. Finally, our skin contains nerve endings that sense pressure, temperature, and pain. Together, these senses help us navigate and understand our environment." }
    ],
    2: [
      { title: "Artificial Intelligence Ethics", text: "As artificial intelligence systems become more advanced and integrated into daily life, ethical considerations have emerged as a critical area of discussion. AI algorithms now make decisions that affect employment, healthcare, criminal justice, and financial services. Questions arise about bias in training data, transparency in decision-making processes, and accountability when AI systems cause harm. Privacy concerns have also intensified as AI requires vast amounts of personal data to function effectively. Researchers and policymakers are working to establish guidelines that ensure AI development benefits humanity while minimizing potential risks and unintended consequences." },
      { title: "Sleep and Memory Consolidation", text: "Sleep plays a crucial role in memory consolidation, the process by which short-term memories are transformed into stable long-term memories. During deep sleep stages, the brain replays and reorganizes information learned during waking hours. The hippocampus, a region critical for memory formation, communicates with the neocortex to strengthen neural connections representing important experiences. Studies show that students who sleep after learning new material demonstrate significantly better recall compared to those who remain awake. Sleep deprivation not only impairs new learning but also disrupts the consolidation of previously acquired knowledge." },
      { title: "Renewable Energy Transition", text: "The global transition from fossil fuels to renewable energy sources represents one of the most significant economic and technological shifts in modern history. Solar and wind power have experienced dramatic cost reductions, making them increasingly competitive with traditional energy sources. Battery storage technology continues to improve, addressing the intermittency challenge of renewables. Countries around the world are setting ambitious targets for carbon neutrality, driving innovation in grid management and energy efficiency. However, challenges remain including the need for upgraded transmission infrastructure and ensuring a just transition for communities dependent on fossil fuel industries." }
    ],
    3: [
      { title: "Epigenetics and Gene Expression", text: "Epigenetics refers to heritable changes in gene expression that do not involve alterations to the underlying DNA sequence. Environmental factors such as diet, stress, and exposure to toxins can trigger epigenetic modifications through mechanisms including DNA methylation and histone modification. These changes can influence whether genes are activated or silenced, potentially affecting an organism's health and development across generations. Research has revealed that traumatic experiences can leave epigenetic marks that influence stress responses in offspring. This field has revolutionized our understanding of inheritance and suggests that lifestyle choices may have consequences extending beyond an individual's lifetime." },
      { title: "Quantum Computing Principles", text: "Quantum computing harnesses the principles of quantum mechanics to process information in fundamentally different ways than classical computers. Unlike classical bits that exist as either 0 or 1, quantum bits or qubits can exist in superposition, representing multiple states simultaneously. Quantum entanglement allows qubits to be correlated in ways that have no classical analog, enabling certain calculations to be performed exponentially faster. Potential applications include simulating complex molecular interactions for drug discovery, optimizing financial portfolios and supply chains, and breaking certain encryption schemes. However, maintaining quantum coherence and scaling to practical numbers of qubits remains significant technical challenges." },
      { title: "Behavioral Economics Insights", text: "Behavioral economics integrates psychological insights into economic theory, challenging the traditional assumption that humans consistently make rational decisions. Pioneering research by Kahneman and Tversky revealed systematic cognitive biases including loss aversion, where losses feel approximately twice as painful as equivalent gains feel pleasurable. The framing effect demonstrates that identical choices presented differently lead to dramatically different decisions. Nudge theory applies these insights to design choice architectures that guide people toward beneficial behaviors without restricting freedom. Governments and organizations increasingly employ behavioral insights to improve retirement savings rates, increase organ donation, and promote sustainable consumption patterns." }
    ]
  };

  const levelTopics = topics[level] || topics[1];
  const selectedTopic = levelTopics[Math.floor(Math.random() * levelTopics.length)];
  
  const generateQuestions = (text, title) => {
    const sentences = text.split('. ').filter(s => s.length > 30);
    const indices = [];
    while (indices.length < 3 && indices.length < sentences.length) {
      const rand = Math.floor(Math.random() * sentences.length);
      if (!indices.includes(rand)) indices.push(rand);
    }
    const questions = [];
    
    questions.push({ 
      q: "What is the main topic discussed in this passage?", 
      a: `The passage discusses ${title.toLowerCase()} and its key aspects`, 
      options: [
        `The passage discusses ${title.toLowerCase()} and its key aspects`, 
        "The history of scientific discoveries in the 20th century", 
        "Basic mathematics and arithmetic operations", 
        "Ancient civilizations and their cultural practices"
      ] 
    });
    
    if (sentences[indices[0]]) { 
      const cs = sentences[indices[0]]; 
      const oi = indices[1] || 0; 
      questions.push({ 
        q: `According to the passage, ${cs.substring(0, 60)}...?`, 
        a: cs, 
        options: [
          cs, 
          sentences[oi] || "An alternative explanation not found in the text", 
          "The opposite of what is stated in the passage", 
          "A concept not mentioned anywhere in the text"
        ] 
      }); 
    }
    
    if (sentences[indices[1]] && indices[1] !== indices[0]) { 
      const cs = sentences[indices[1]]; 
      questions.push({ 
        q: `What does the passage indicate about ${title.toLowerCase()}?`, 
        a: cs, 
        options: [
          cs, 
          sentences[indices[0]] || "A different interpretation from the passage", 
          "A commonly held misconception not in the text", 
          "An outdated theory not referenced in the passage"
        ] 
      }); 
    }
    
    // Simple shuffle for options
    questions.forEach(q => {
      q.options.sort(() => Math.random() - 0.5);
    });

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

export default function RSVPSpeedReadingClient() {
  // === UI State ===
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // === Game State ===
  const [passages, setPassages] = useState([]);
  const [currentPassageIdx, setCurrentPassageIdx] = useState(0);
  const [gameState, setGameState] = useState('start'); // 'start' | 'reading' | 'testing' | 'results' | 'complete'
  const [wpm, setWpm] = useState(300);
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [completedPassages, setCompletedPassages] = useState(new Set());
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  // === Feedback State ===
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  const STORAGE_BEST_KEY = 'rsvpDrill_bestScore_v3';

  // === Refs ===
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const mountedRef = useRef(false);

  useEffect(() => { 
    setIsClient(true);
    mountedRef.current = true;
    setPassages([generatePassage(1), generatePassage(2), generatePassage(3)]); 
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
  }, []);

  const currentPassage = useMemo(() => passages[currentPassageIdx] || null, [passages, currentPassageIdx]);
  const words = useMemo(() => currentPassage?.text?.split(' ') || [], [currentPassage]);
  const availablePassages = useMemo(() => passages.filter((_, idx) => !completedPassages.has(idx)), [passages, completedPassages]);

  // Mobile Guard & Landscape Detection
  useEffect(() => {
    const checkOrientationAndSize = () => {
      if (typeof window === 'undefined') return;
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '') || window.innerWidth < 768;
      
      if (!isMobile) { 
        setShowRotateWarning(false); 
        return; 
      }
      
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
          setShowRotateWarning(true);
      } else {
          setShowRotateWarning(false);
      }
    };
    
    checkOrientationAndSize();
    window.addEventListener('resize', checkOrientationAndSize);
    window.addEventListener('orientationchange', checkOrientationAndSize);
    return () => { 
      window.removeEventListener('resize', checkOrientationAndSize); 
      window.removeEventListener('orientationchange', checkOrientationAndSize); 
    };
  }, []);

  useEffect(() => { 
    const h = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', h); 
    return () => document.removeEventListener('fullscreenchange', h); 
  }, []);

  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      } else if (isFullscreen && document.fullscreenElement) {
        await document.exitFullscreen(); 
      }
    } catch (error) {} 
  }, [isFullscreen]);

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

  const saveBestIfNeeded = useCallback((newScore) => {
    if (newScore > bestScore && newScore > 0) {
      setIsNewBest(true);
      setBestScore(newScore);
      try { localStorage.setItem(STORAGE_BEST_KEY, newScore.toString()); } catch (e) {}
    }
  }, [bestScore]);

  // ============================================================
  // READING & GAMEPLAY LOGIC
  // ============================================================
  const startReading = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    if (!currentPassage) return;
    
    await enterFullscreen();
    
    if (availablePassages.length === 0) setCompletedPassages(new Set()); 
    setGameState('reading'); 
    setIsPlaying(true); 
    setWordIndex(0);
    setQuizIndex(0);
    setSelectedOption(null);
    setShowAnswerFeedback(false);
    showFeedbackMsg('Reading started • Focus on the center', 'success'); 
  }, [currentPassage, availablePassages.length, showFeedbackMsg]);

  const resetGame = useCallback(() => { 
    if (timerRef.current) clearInterval(timerRef.current); 
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); 
    setPassages([generatePassage(1), generatePassage(2), generatePassage(3)]); 
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
    setShowAnswerFeedback(false); 
    setFeedback(''); 
    setIsPlaying(false);
    setIsNewBest(false);
  }, []);

  const handleExit = async () => {
    await exitFullscreen();
    resetGame();
  };

  const nextPassage = useCallback(() => { 
    if (availablePassages.length > 0) { 
      const ni = passages.findIndex((_, idx) => !completedPassages.has(idx)); 
      setCurrentPassageIdx(ni >= 0 ? ni : 0); 
      setGameState('start'); 
      setWordIndex(0); 
      setQuizIndex(0); 
      setSelectedOption(null); 
      setShowAnswerFeedback(false); 
      setFeedback('');
    } else { 
      const endScore = scoreRef.current;
      saveBestIfNeeded(endScore);
      if (audioSynth) audioSynth.playComplete();
      setGameState('complete'); 
    } 
  }, [availablePassages, completedPassages, passages, saveBestIfNeeded]);

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
    if (!currentPassage || showAnswerFeedback || gameState !== 'testing') return; 
    
    setSelectedOption(selected); 
    setShowAnswerFeedback(true); 
    
    const currentQ = currentPassage.questions[quizIndex];
    if (!currentQ) return;
    
    const isCorrect = selected === currentQ.a; 
    setTotalQuestions(prev => prev + 1); 
    
    if (isCorrect) { 
      setCorrectAnswers(prev => prev + 1); 
      comboRef.current = comboRef.current + 1; 
      setCombo(comboRef.current); 
      
      scoreRef.current += 10; 
      setScore(scoreRef.current); 
      
      if (comboRef.current > 0 && comboRef.current % 3 === 0) { 
        if (audioSynth) audioSynth.playCombo();
        showFeedbackMsg(`🔥 ${comboRef.current}x Combo! +10 PTS`, 'success'); 
      } else {
        if (audioSynth) audioSynth.playCorrect();
        showFeedbackMsg('✓ CORRECT! +10 PTS', 'success');
      }
    } else { 
      setWrongAnswers(prev => prev + 1); 
      comboRef.current = 0; 
      setCombo(0); 
      
      scoreRef.current = Math.max(0, scoreRef.current - 5); 
      setScore(scoreRef.current); 
      
      if (audioSynth) audioSynth.playWrong();
      showFeedbackMsg('✗ INCORRECT! -5 PTS', 'error'); 
    } 
    
    setTimeout(() => { 
      setSelectedOption(null); 
      setShowAnswerFeedback(false); 
      setFeedback('');
      
      if (quizIndex < currentPassage.questions.length - 1) { 
        setQuizIndex(prev => prev + 1); 
      } else { 
        if (audioSynth) audioSynth.playComplete();
        setCompletedPassages(prev => { 
          const ns = new Set(prev); 
          ns.add(currentPassageIdx); 
          return ns; 
        }); 
        setGameState('results'); 
      } 
    }, 1000); 
  }, [currentPassage, quizIndex, showAnswerFeedback, currentPassageIdx, showFeedbackMsg, gameState]);

  const getAccuracy = useCallback(() => {
    return totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 100;
  }, [correctAnswers, totalQuestions]);

  const handleSpeedUp = useCallback(() => setWpm(w => Math.min(1000, w + 50)), []);
  const handleSpeedDown = useCallback(() => setWpm(w => Math.max(100, w - 50)), []);

  const shareDrillLink = async () => { 
    const url = 'https://skilldrills.online/drills/academic/comprehension/reading-comprehension';
    if (navigator.share) { 
      try { 
        await navigator.share({ 
          title: 'RSVP Speed Reading Drill | SkillDrills', 
          text: 'Master speed reading with fresh passages and comprehension quizzes. Free!', 
          url 
        }); 
      } catch (e) {} 
    } else { 
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {}); 
    } 
  };

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - getAccuracy();

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
            <li className="text-gray-500">Comprehension</li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-emerald-400 font-medium">RSVP Speed Reading</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">RSVP Speed Reading</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Rapid Visual Presentation • Adaptive Comprehension</p>
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
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-emerald-400" />} value={score} label="Score" />
          <StatCard icon={<Trophy className="text-yellow-400" />} value={Math.max(bestScore, score)} label="Best" />
          <StatCard icon={<Gauge className="text-purple-400" />} value={wpm} label="WPM" />
          <StatCard icon={<CheckCircle2 className="text-emerald-400" />} value={correctAnswers} label="Correct" />
          <StatCard icon={<XCircle className="text-red-400" />} value={wrongAnswers} label="Misses" />
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
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-emerald-900/10" />

          {/* Mobile Rotation Blocker */}
          {showRotateWarning && gameState !== 'reading' && (
            <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 backdrop-blur-sm">
              <div className="animate-bounce mb-6 text-emerald-500">
                <RefreshCw className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Rotate Device</h3>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">Please rotate your device to landscape mode for the best reading experience.</p>
            </div>
          )}

          {isFullscreen && gameState !== 'start' && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-[60] flex gap-2">
              <button onClick={resetGame} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            </div>
          )}

          <div className="flex-1 flex flex-col items-center p-4 sm:p-6 lg:p-8 h-full w-full relative overflow-y-auto overflow-x-hidden">
            
            {/* START SCREEN */}
            {gameState === 'start' && !showRotateWarning && currentPassage && (
              <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-sm overflow-y-auto flex flex-col p-4">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-auto my-auto border border-gray-700 bg-gray-900 shadow-2xl flex flex-col shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(16,185,129,0.3)] shrink-0">
                    <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black mb-2 pointer-events-none tracking-tight">{currentPassage.title}</h2>
                  <p className="text-xs sm:text-base mb-6 text-gray-400 leading-relaxed pointer-events-none">
                    Level {currentPassage.level} • Focus on the center.
                  </p>
                  
                  {/* WPM Controls inside Start Modal */}
                  <div className="flex items-center justify-center gap-4 mb-6 p-4 rounded-xl bg-black/40 border border-gray-700">
                    <button onClick={handleSpeedDown} className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all active:scale-95 border border-gray-600" aria-label="Decrease speed"><ChevronDown className="w-5 h-5" /></button>
                    <div className="flex flex-col items-center min-w-[80px]">
                      <span className="text-2xl sm:text-3xl font-black text-white leading-none">{wpm}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">WPM</span>
                    </div>
                    <button onClick={handleSpeedUp} className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all active:scale-95 border border-gray-600" aria-label="Increase speed"><ChevronUp className="w-5 h-5" /></button>
                  </div>
                  
                  <button 
                    onClick={startReading}
                    className="mt-auto w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(16,185,129,0.3)] focus:outline-none shrink-0">
                    <Play className="w-5 h-5 fill-white" />
                    START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* READING STATE */}
            {gameState === 'reading' && (
              <div className="text-center w-full my-auto flex flex-col justify-center animate-in fade-in duration-300">
                <div className="flex justify-center mb-4 opacity-20 pointer-events-none" aria-hidden="true">
                  <div className="w-1 h-8 sm:h-12 bg-emerald-500 mx-1 rounded-full" />
                </div>
                
                <div className="h-24 sm:h-32 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white break-all max-w-[90vw] leading-none">
                    {words[wordIndex] || ''}
                  </span>
                </div>
                
                <div className="flex justify-center mt-4 opacity-20 pointer-events-none" aria-hidden="true">
                  <div className="w-1 h-8 sm:h-12 bg-emerald-500 mx-1 rounded-full" />
                </div>
                
                <div className="mt-12 w-64 max-w-[80vw] mx-auto pointer-events-none">
                  <div className="h-1.5 rounded-full bg-gray-800">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-200" 
                      style={{ width: `${words.length > 0 ? (wordIndex / words.length) * 100 : 0}%` }} 
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex gap-4 justify-center">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="p-4 sm:p-5 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-all active:scale-95 shadow-lg" aria-label={isPlaying ? 'Pause reading' : 'Resume reading'}>
                    {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
                  </button>
                </div>
                <p className="mt-4 text-xs font-bold tracking-widest uppercase text-gray-500">{wordIndex + 1} / {words.length} words</p>
              </div>
            )}

            {/* TESTING STATE */}
            {gameState === 'testing' && currentPassage && currentPassage.questions[quizIndex] && (
              <div className="w-full max-w-3xl my-auto py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-900/30 text-emerald-400 border border-emerald-500/20">Question {quizIndex + 1} of {currentPassage.questions.length}</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 leading-tight text-white">
                  {currentPassage.questions[quizIndex].q}
                </h3>
                
                <div className="grid gap-3" role="radiogroup" aria-label="Answer options">
                  {currentPassage.questions[quizIndex].options.map((opt, i) => { 
                    const isCorrectAnswer = opt === currentPassage.questions[quizIndex].a;
                    const isSelectedAnswer = opt === selectedOption;
                    const letter = String.fromCharCode(65 + i);
                    return (
                      <button 
                        key={i} 
                        onClick={() => !showAnswerFeedback && handleAnswer(opt)} 
                        disabled={showAnswerFeedback} 
                        className={`p-3 sm:p-4 rounded-xl text-left font-medium transition-all border-2 ${
                          showAnswerFeedback 
                            ? isCorrectAnswer 
                              ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                              : isSelectedAnswer 
                                ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                                : 'opacity-50 cursor-not-allowed border-gray-700 text-gray-500'
                            : 'cursor-pointer border-gray-700 bg-gray-800/50 text-gray-200 hover:border-emerald-500 hover:bg-gray-700 active:scale-[0.99]'
                        } flex items-center justify-between`} 
                      >
                        <span className="flex items-center gap-3">
                          <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${showAnswerFeedback && (isCorrectAnswer || isSelectedAnswer) ? 'border-current' : 'border-gray-600 text-gray-400'}`}>{letter}</span>
                          <span className="text-sm sm:text-base leading-snug">{opt}</span>
                        </span>
                        {showAnswerFeedback && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />}
                        {showAnswerFeedback && isSelectedAnswer && !isCorrectAnswer && <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
                      </button>
                    ); 
                  })}
                </div>
              </div>
            )}

            {/* RESULTS SCREEN (Between Passages) */}
            {gameState === 'results' && (
              <div className="absolute inset-0 z-[70] bg-black/95 animate-in fade-in duration-300 overflow-y-auto flex flex-col p-4">
                <div className="rounded-3xl max-w-md w-full mx-auto my-auto shadow-2xl border border-gray-800 bg-gray-950 flex flex-col shrink-0">
                  
                  <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Passage Complete!</h2>
                      <p className="text-emerald-400 font-medium text-xs sm:text-sm">{currentPassage?.title} • Level {currentPassage?.level}</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pointer-events-none shrink-0">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Current Score</span>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tighter">{score}</span>
                          <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">PTS</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <EndStat label="Correct" value={correctAnswers} color="emerald" />
                      <EndStat label="Misses" value={wrongAnswers} color="red" />
                      <EndStat label="WPM" value={wpm} color="blue" />
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                    <button onClick={nextPassage} className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-black tracking-wide hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] text-sm sm:text-base">
                      NEXT PASSAGE <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* COMPLETE SCREEN */}
            {gameState === 'complete' && (
              <div className="absolute inset-0 z-[70] bg-black/95 animate-in fade-in duration-300 overflow-y-auto flex flex-col p-4">
                <div className="rounded-3xl max-w-md w-full mx-auto my-auto shadow-2xl border border-gray-800 bg-gray-950 flex flex-col shrink-0">
                  
                  <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mastery Achieved!</h2>
                      <p className="text-emerald-400 font-medium text-xs sm:text-sm">All Passages Completed</p>
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
                            className={`${getAccuracy() >= 80 ? 'text-green-500' : getAccuracy() >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                            strokeWidth="3" strokeDasharray={`${strokeDasharray}`} strokeDashoffset={`${strokeDashoffset}`} strokeLinecap="round" stroke="currentColor" fill="none" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-base sm:text-xl font-black ${getAccuracy() >= 80 ? 'text-green-400' : getAccuracy() >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{getAccuracy()}%</span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <EndStat label="Correct" value={correctAnswers} color="emerald" />
                      <EndStat label="Misses" value={wrongAnswers} color="red" />
                      <EndStat label="WPM" value={wpm} color="blue" />
                      <EndStat label="Passages" value={`${completedPassages.size}/${passages.length}`} color="purple" />
                      <EndStat label="Questions" value={totalQuestions} color="orange" />
                      <EndStat label="Best" value={bestScore} color="yellow" />
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                    <button onClick={resetGame} className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-black tracking-wide hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                    </button>
                    <button onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onClick={handleExit} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
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
                <Info className="w-5 h-5 text-emerald-400" /><h2 className="font-bold text-white text-lg tracking-tight">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="green" text="Correct Answer" highlight="+10 PTS" result="Boosts Score" />
                  <RuleItem color="red" text="Wrong Answer" highlight="-5 PTS" result="Penalizes Score" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="orange" text="Timing Free" highlight="No Countdown" result="Focus on WPM" />
                  <RuleItem color="cyan" text="Combo Multiplier" highlight="Every 3rd Answer" result="Audio Reward" />
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
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About RSVP Speed Reading</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  Rapid Serial Visual Presentation (RSVP) is a scientifically validated method that eliminates the saccadic eye movements normally required for reading. By flashing words at a single focal point, your brain can process text at dramatically higher speeds (up to 1,000 WPM) while maintaining robust comprehension. This drill binds the RSVP mechanic to comprehension testing to ensure you aren't just "seeing" words, but actually encoding them.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <InfoCard icon={<Scale className="w-4 h-4 text-white" />} title="Who It's For" desc="Students, analysts, and candidates for IELTS, TOEFL, GRE, GMAT, CAT, and UPSC exams." color="blue" />
                  <InfoCard icon={<Brain className="w-4 h-4 text-white" />} title="Skills Optimized" desc="Visual processing speed, working memory retention, and rapid semantic comprehension." color="green" />
                  <InfoCard icon={<BarChart3 className="w-4 h-4 text-white" />} title="Metrics Tracked" desc="Net Score, Comprehension Accuracy, Peak WPM Threshold, and Combo Streaks." color="purple" />
                </div>

                {/* How to Practice Effectively Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Start Slow, Scale Up:</strong> If you're new to RSVP, begin at a comfortable 200-250 WPM. Once you achieve 100% accuracy on a level, bump the speed up by 50 WPM.</li>
                    <li><strong className="text-gray-200">Suppress Subvocalization:</strong> RSVP is designed to bypass the "inner voice" (subvocalization). Do not try to "say" the words in your head as they flash; simply look and absorb the meaning.</li>
                    <li><strong className="text-gray-200">Embrace the Blur:</strong> At higher speeds (400+ WPM), individual words may blur. Trust your brain's peripheral and pattern recognition systems to assemble the context.</li>
                    <li><strong className="text-gray-200">No Guessing:</strong> Incorrect answers penalize your score (-5 PTS) and break your combo. Read to understand, not just to finish.</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <FAQItem question="Why is there no countdown timer?" answer="RSVP inherently uses time to dictate reading speed. The drill focuses purely on your ability to comprehend at a set Words Per Minute (WPM), rather than rushing you through a 60-second window." />
                    <FAQItem question="Does this automatically enter fullscreen?" answer="Yes! When you click START DRILL, the reading area automatically enters fullscreen mode to eliminate visual distractions. You can exit anytime using the on-screen exit button or the ESC key." />
                    <FAQItem question="Are the passages different each time?" answer="Yes. The engine dynamically generates a fresh set of 3 passages (varying in academic complexity) every time you start a new session." />
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
              <div className="w-1 h-5 rounded-full bg-emerald-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/academic/comprehension/inference-drill" title="Inference Analytics" desc="Critical reasoning passages with logic mapping." color="blue" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/writing-speed/typing-test" title="Typing Speed Test" desc="WPM assessment across rigorous difficulty thresholds." color="rose" icon={<Award className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/focus/concentration-grid" title="Concentration Grid" desc="Search for items rapidly without losing spatial focus." color="teal" icon={<Target className="w-4 h-4" />} />
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
                    <li><Link href="/drills/academic/comprehension/inference-drill" className="hover:text-emerald-400 transition-colors">Inference Analytics</Link></li>
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-emerald-400 transition-colors">Typing Speed</Link></li>
                    <li><Link href="/drills/academic" className="text-emerald-450 hover:text-emerald-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-emerald-400 transition-colors">Logic Puzzles</Link></li>
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-emerald-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive" className="text-emerald-450 hover:text-emerald-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-emerald-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-emerald-400 transition-colors">Aim Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-emerald-450 hover:text-emerald-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Visual Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-emerald-400 transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-emerald-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-emerald-450 hover:text-emerald-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory" className="hover:text-emerald-400 transition-colors">Memory (15)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-emerald-400 transition-colors">Mental Fitness (6)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-emerald-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500/25 to-teal-500/25 border border-emerald-500/30 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
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
    emerald: 'text-emerald-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400',
    green: 'text-green-400'
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
    emerald: 'bg-emerald-600',
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
    cyan: 'from-cyan-500 to-teal-500',
    purple: 'from-purple-500 to-violet-500',
    rose: 'from-rose-500 to-pink-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
    emerald: 'from-emerald-500 to-green-500',
    teal: 'from-teal-500 to-cyan-500',
    indigo: 'from-indigo-500 to-purple-500'
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:-translate-y-1 hover:border-emerald-500/50`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-emerald-500 to-teal-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050508] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-emerald-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-emerald-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="text-white font-bold mb-4 text-sm tracking-wide">{title}</h3>
      <ul className="space-y-3 text-sm">
        {links.map((link, i) => (
          <li key={i}>
            <Link href={link.href} className={`hover:text-white transition-colors ${link.highlight ? 'text-emerald-400 hover:text-emerald-300 font-medium' : ''}`}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}