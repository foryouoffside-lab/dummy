'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, Trophy, Info, Timer, Link2, RefreshCw, SkipForward
} from 'lucide-react';

const ALL_PAIRS = [
  // Round 1-3: Common pairs
  { pair: ["Dog", "Bone"], distractors: ["Cat", "Bark", "Leash"] },
  { pair: ["Sun", "Moon"], distractors: ["Star", "Sky", "Light"] },
  { pair: ["Salt", "Pepper"], distractors: ["Sugar", "Spice", "Seasoning"] },
  { pair: ["Lock", "Key"], distractors: ["Door", "Chain", "Safe"] },
  { pair: ["Pencil", "Paper"], distractors: ["Pen", "Eraser", "Desk"] },
  { pair: ["Shoes", "Socks"], distractors: ["Hat", "Laces", "Feet"] },
  { pair: ["Bread", "Butter"], distractors: ["Jam", "Toast", "Knife"] },
  { pair: ["Hammer", "Nail"], distractors: ["Screw", "Tool", "Wood"] },
  { pair: ["Table", "Chair"], distractors: ["Desk", "Sofa", "Wood"] },
  { pair: ["Rain", "Umbrella"], distractors: ["Cloud", "Coat", "Storm"] },
  { pair: ["Fish", "Water"], distractors: ["Ocean", "Bowl", "Swim"] },
  { pair: ["Fire", "Water"], distractors: ["Smoke", "Hose", "Heat"] },
  { pair: ["Cup", "Saucer"], distractors: ["Mug", "Plate", "Drink"] },
  { pair: ["Knife", "Fork"], distractors: ["Spoon", "Cut", "Eat"] },
  { pair: ["Brush", "Comb"], distractors: ["Hair", "Mirror", "Style"] },
  
  // Round 4-6: Less common pairs
  { pair: ["Anchor", "Chain"], distractors: ["Boat", "Link", "Heavy"] },
  { pair: ["Candle", "Wick"], distractors: ["Fire", "Wax", "Light"] },
  { pair: ["Helmet", "Visor"], distractors: ["Shield", "Guard", "Face"] },
  { pair: ["Lens", "Focus"], distractors: ["Camera", "Zoom", "Sharp"] },
  { pair: ["Telescope", "Lens"], distractors: ["Tube", "Magnify", "Distant"] },
  { pair: ["Compass", "Magnet"], distractors: ["North", "Needle", "Direction"] },
  { pair: ["Thermometer", "Mercury"], distractors: ["Heat", "Glass", "Fever"] },
  { pair: ["Microphone", "Amplifier"], distractors: ["Sound", "Speaker", "Voice"] },
  { pair: ["Camera", "Shutter"], distractors: ["Lens", "Photo", "Flash"] },
  { pair: ["Battery", "Electrode"], distractors: ["Power", "Charge", "Cell"] },
  { pair: ["Engine", "Piston"], distractors: ["Motor", "Fuel", "Car"] },
  { pair: ["Sieve", "Strainer"], distractors: ["Filter", "Mesh", "Drain"] },
  { pair: ["Scissors", "Shear"], distractors: ["Cut", "Blade", "Paper"] },
  { pair: ["Stamp", "Envelope"], distractors: ["Letter", "Mail", "Post"] },
  { pair: ["Rudder", "Steer"], distractors: ["Boat", "Wheel", "Turn"] },
  
  // Round 7-9: Uncommon pairs
  { pair: ["Gauge", "Measure"], distractors: ["Tool", "Scale", "Width"] },
  { pair: ["Turbine", "Blade"], distractors: ["Motor", "Spin", "Power"] },
  { pair: ["Parachute", "Canopy"], distractors: ["Cord", "Jump", "Float"] },
  { pair: ["Lantern", "Mantle"], distractors: ["Glow", "Camp", "Handle"] },
  { pair: ["Prism", "Spectrum"], distractors: ["Rainbow", "Glass", "Split"] },
  { pair: ["Chisel", "Mallet"], distractors: ["Wood", "Carve", "Stone"] },
  { pair: ["Trowel", "Mortar"], distractors: ["Brick", "Cement", "Build"] },
  { pair: ["Calipers", "Vernier"], distractors: ["Measure", "Precise", "Tool"] },
  { pair: ["Pantograph", "Trace"], distractors: ["Copy", "Draw", "Scale"] },
  { pair: ["Sextant", "Navigate"], distractors: ["Ship", "Stars", "Angle"] },
  { pair: ["Loom", "Weave"], distractors: ["Thread", "Fabric", "Cloth"] },
  { pair: ["Kiln", "Pottery"], distractors: ["Clay", "Fire", "Bake"] },
  { pair: ["Bellows", "Forge"], distractors: ["Fire", "Metal", "Air"] },
  { pair: ["Lathe", "Turn"], distractors: ["Wood", "Spin", "Shape"] },
  { pair: ["Vice", "Clamp"], distractors: ["Grip", "Hold", "Bench"] },
  
  // Round 10-12: Very uncommon pairs
  { pair: ["Pendulum", "Oscillate"], distractors: ["Swing", "Time", "Weight"] },
  { pair: ["Catalyst", "Reaction"], distractors: ["Speed", "Agent", "Bond"] },
  { pair: ["Fulcrum", "Lever"], distractors: ["Pivot", "Lift", "Force"] },
  { pair: ["Solvent", "Solute"], distractors: ["Dissolve", "Liquid", "Mix"] },
  { pair: ["Tendon", "Ligament"], distractors: ["Joint", "Elastic", "Bone"] },
  { pair: ["Alveoli", "Capillary"], distractors: ["Lung", "Blood", "Oxygen"] },
  { pair: ["Synapse", "Neuron"], distractors: ["Brain", "Signal", "Nerve"] },
  { pair: ["Isotope", "Decay"], distractors: ["Atom", "Radiation", "Half"] },
  { pair: ["Chromatic", "Aberration"], distractors: ["Lens", "Color", "Distort"] },
  { pair: ["Osmosis", "Membrane"], distractors: ["Cell", "Water", "Diffuse"] },
  { pair: ["Solder", "Flux"], distractors: ["Metal", "Join", "Heat"] },
  { pair: ["Polarity", "Dipole"], distractors: ["Charge", "Magnet", "Align"] },
  { pair: ["Epoxy", "Resin"], distractors: ["Glue", "Hard", "Plastic"] },
  { pair: ["Alloy", "Amalgam"], distractors: ["Metal", "Mix", "Mercury"] },
  { pair: ["Tensile", "Yield"], distractors: ["Stretch", "Break", "Stress"] },
  
  // Round 13-15: Expert pairs
  { pair: ["Cathode", "Anode"], distractors: ["Battery", "Electron", "Charge"] },
  { pair: ["Quasar", "Redshift"], distractors: ["Star", "Galaxy", "Light"] },
  { pair: ["Nucleotide", "Helix"], distractors: ["DNA", "Base", "Gene"] },
  { pair: ["Entropy", "Disorder"], distractors: ["Chaos", "System", "Heat"] },
  { pair: ["Aperture", "Diaphragm"], distractors: ["Camera", "Light", "Open"] },
  { pair: ["Mitosis", "Cytokinesis"], distractors: ["Cell", "Divide", "Nucleus"] },
  { pair: ["Glycogen", "Glucose"], distractors: ["Sugar", "Liver", "Energy"] },
  { pair: ["Parallax", "Displace"], distractors: ["View", "Angle", "Shift"] },
  { pair: ["Viscosity", "Shear"], distractors: ["Fluid", "Thick", "Flow"] },
  { pair: ["Resonance", "Frequency"], distractors: ["Sound", "Vibrate", "Wave"] },
];

export default function PairedAssociatesDrill() {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [accuracy, setAccuracy] = useState(100);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const [currentPairs, setCurrentPairs] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [phase, setPhase] = useState("ready");
  const [round, setRound] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [memorizeTime, setMemorizeTime] = useState(5);

  const containerRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const memorizeTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const roundRef = useRef(1);
  const usedPairsRef = useRef(new Set());
  const audioCtxRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best scores
  useEffect(() => {
    const savedBestScore = localStorage.getItem('pairedAssociatesBestScore');
    const savedBestStreak = localStorage.getItem('pairedAssociatesBestStreak');
    if (savedBestScore) setBestScore(parseInt(savedBestScore, 10));
    if (savedBestStreak) setBestStreak(parseInt(savedBestStreak, 10));
  }, []);

  const updateBestScore = (finalScore) => {
    const currentBest = parseInt(localStorage.getItem('pairedAssociatesBestScore') || '0', 10);
    if (finalScore > currentBest) {
      localStorage.setItem('pairedAssociatesBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  };

  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      
      if (type === 'correct') {
        osc.frequency.value = 880;
        gain.gain.value = 0.1;
      } else if (type === 'wrong') {
        osc.frequency.value = 330;
        gain.gain.value = 0.12;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'roundComplete') {
        osc.frequency.value = 1200;
        gain.gain.value = 0.12;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtxRef.current.currentTime + 0.2);
      osc.stop(audioCtxRef.current.currentTime + 0.2);
    } catch (e) {}
  };

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Memorize countdown
  useEffect(() => {
    if (phase === "learning" && memorizeTime > 0) {
      memorizeTimerRef.current = setInterval(() => {
        setMemorizeTime(t => t - 1);
      }, 1000);
      return () => clearInterval(memorizeTimerRef.current);
    } else if (phase === "learning" && memorizeTime === 0) {
      startTesting();
    }
  }, [phase, memorizeTime]);

  // 60 second game timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            updateBestScore(scoreRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState, timeLeft]);

  // Get available pairs (not yet used in this session)
  const getAvailablePairs = useCallback((count) => {
    const available = ALL_PAIRS.filter((_, i) => !usedPairsRef.current.has(i));
    
    // If we've used all pairs, reset the used set
    if (available.length < count) {
      usedPairsRef.current.clear();
      return [...ALL_PAIRS].sort(() => Math.random() - 0.5).slice(0, count);
    }
    
    return [...available].sort(() => Math.random() - 0.5).slice(0, count);
  }, []);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setAccuracy(100);
    setRound(1);
    setTotalCorrect(0);
    setTotalAttempts(0);
    setRoundsCompleted(0);
    setFeedback('');
    
    scoreRef.current = 0;
    streakRef.current = 0;
    roundRef.current = 1;
    usedPairsRef.current = new Set();
    
    startRound(1);
    showFeedback('60 seconds • Memorize the pairs!', 'success');
  };

  const startRound = (rnd) => {
    const numPairs = Math.min(rnd + 2, ALL_PAIRS.length);
    const selectedPairs = getAvailablePairs(numPairs);
    
    // Mark selected pairs as used
    selectedPairs.forEach(p => {
      const idx = ALL_PAIRS.indexOf(p);
      if (idx !== -1) usedPairsRef.current.add(idx);
    });
    
    setCurrentPairs(selectedPairs);
    setQuestionIndex(0);
    setIsProcessing(false);
    setMemorizeTime(5);
    setPhase("learning");
  };

  const skipMemorize = () => {
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    setMemorizeTime(0);
    startTesting();
  };

  const startTesting = () => {
    if (currentPairs.length > 0) {
      generateQuestion(currentPairs, 0);
      setPhase("testing");
    }
  };

  const generateQuestion = (pairsList, qIndex) => {
    if (qIndex >= pairsList.length) return;
    
    const pair = pairsList[qIndex];
    
    const allDistractors = pairsList
      .filter(p => p !== pair)
      .map(p => p.pair[1])
      .concat(pair.distractors)
      .filter((v, i, a) => a.indexOf(v) === i);
    
    const shuffledDistractors = allDistractors.sort(() => Math.random() - 0.5).slice(0, 2);
    const options = [pair.pair[1], ...shuffledDistractors].sort(() => Math.random() - 0.5);
    
    setCurrentQuestion({
      prompt: `What goes with "${pair.pair[0]}"?`,
      correct: pair.pair[1],
      options: options
    });
  };

  const handleAnswer = (answer) => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    const isCorrect = answer === currentQuestion.correct;
    
    setTotalAttempts(prev => prev + 1);
    
    if (isCorrect) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      
      setTotalCorrect(prev => prev + 1);
      streakRef.current++;
      setStreak(streakRef.current);
      
      if (streakRef.current > bestStreak) {
        setBestStreak(streakRef.current);
        localStorage.setItem('pairedAssociatesBestStreak', streakRef.current.toString());
      }
      
      playSound('correct');
      showFeedback('✓ Correct! +1', 'success');
      
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      
      streakRef.current = 0;
      setStreak(0);
      
      playSound('wrong');
      showFeedback(`✗ Wrong! Answer: ${currentQuestion.correct}`, 'error');
    }
    
    const newTotal = totalAttempts + 1;
    const newCorrect = totalCorrect + (isCorrect ? 1 : 0);
    setAccuracy(newTotal > 0 ? Math.round((newCorrect / newTotal) * 100) : 100);
    
    const nextIndex = questionIndex + 1;
    
    if (nextIndex < currentPairs.length) {
      setQuestionIndex(nextIndex);
      setTimeout(() => {
        generateQuestion(currentPairs, nextIndex);
        setIsProcessing(false);
      }, 300);
    } else {
      setRoundsCompleted(prev => prev + 1);
      
      const newRound = roundRef.current + 1;
      roundRef.current = newRound;
      setRound(newRound);
      
      playSound('roundComplete');
      showFeedback(`Round ${roundRef.current - 1} Complete! +1 Pair`, 'success');
      
      setIsProcessing(false);
      
      setTimeout(() => {
        if (gameState === 'playing') {
          startRound(newRound);
        }
      }, 800);
    }
  };

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    setGameState('start');
    setPhase('ready');
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setAccuracy(100);
    setRound(1);
    setTotalCorrect(0);
    setTotalAttempts(0);
    setRoundsCompleted(0);
    roundRef.current = 1;
    usedPairsRef.current = new Set();
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
          <Link href="/drills/memory" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Memory Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Paired Associates</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+1 correct • -1 wrong • +1 pair/round • No repeats • 60s</p>
              </div>
            </div>
            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} title="Reset session">
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
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

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<Link2 className="text-cyan-600" />} value={round} label="Round" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-emerald-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#0a0a1a" : "#f5f3ff",
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

          <div className="absolute inset-0 flex items-center justify-center p-8 overflow-y-auto">
            <div className="w-full max-w-lg">
              {/* Start Screen */}
              {gameState === 'start' && (
                <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                  <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <Link2 className="w-16 h-16 text-violet-500 mx-auto mb-4" />
                    <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Paired Associates</h3>
                    <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • +1 pair each round</p>
                    <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>80 unique word pairs • No repeats within session</p>
                    <button 
                      onClick={startGame} 
                      className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Start Training
                    </button>
                  </div>
                </div>
              )}

              {/* Learning Phase */}
              {gameState === 'playing' && phase === "learning" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-bold ${isBoxDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                      Round {round} • {currentPairs.length} pairs • {memorizeTime}s
                    </span>
                    <button 
                      onClick={skipMemorize}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        isBoxDarkMode ? 'bg-violet-500/20 text-violet-400 hover:bg-violet-500/30' : 'bg-violet-100 text-violet-600 hover:bg-violet-200'
                      }`}
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      Skip
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {currentPairs.map((p, i) => (
                      <div key={i} className={`p-4 rounded-xl text-center text-lg ${isBoxDarkMode ? 'bg-white/10 text-white' : 'bg-violet-100 text-gray-900'}`}>
                        <span className="font-bold">{p.pair[0]}</span>
                        <span className="mx-2 text-violet-500">↔</span>
                        <span className="font-bold">{p.pair[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testing Phase */}
              {gameState === 'playing' && phase === "testing" && currentQuestion && (
                <div className="space-y-6">
                  <div className="text-center mb-2">
                    <span className={`text-sm font-bold ${isBoxDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                      Round {round} • {currentPairs.length} pairs
                    </span>
                  </div>
                  <p className={`text-2xl text-center font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {currentQuestion.prompt}
                  </p>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(option)}
                        disabled={isProcessing}
                        className={`w-full font-semibold py-4 rounded-xl transition text-lg ${
                          isBoxDarkMode 
                            ? 'bg-white/10 hover:bg-white/20 text-white' 
                            : 'bg-violet-100 hover:bg-violet-200 text-gray-900'
                        } disabled:opacity-50`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <p className={`text-center text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {questionIndex + 1} of {currentPairs.length}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40" style={{ background: isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(245,243,255,0.95)' }}>
              <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time's Up!</h3>
                </div>
                
                <p className={`text-center mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60 seconds completed!
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-blue-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Rounds" value={roundsCompleted} icon={<Link2 className="w-4 h-4" />} color="text-purple-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-green-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Peak Round" value={round} icon={<Brain className="w-4 h-4" />} color="text-cyan-500" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={resetGame} 
                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Play Again →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rules Section */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Memorize pairs for <span className="font-semibold text-violet-500">5 seconds</span> (or skip)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Correct = <span className="font-semibold text-green-500">+1 point</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Wrong = <span className="font-semibold text-red-500">-1 point</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">+1 pair each round</span> • Auto-advances
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">80 unique pairs</span> • Never repeats in session
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Challenge lasts <span className="font-semibold text-yellow-500">60 seconds</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🧠 Round 1: 3 pairs → Round 2: 4 pairs → ... → Round 15: 17 pairs</span>
                  <span>⚡ Best Score saves locally</span>
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

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const bgColor = color === 'text-blue-500' ? 'bg-blue-500/10' : 
                   color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 'bg-cyan-500/10';
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${bgColor}`}>
      <div className="flex items-center gap-2">
        <div className={color}>{icon}</div>
        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-lg ${color}`}>{value}{unit}</span>
    </div>
  );
}