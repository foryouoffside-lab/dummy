'use client';

import { Component, useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Timer, Trophy, Volume2, VolumeX, Maximize2, Minimize2,
  Info, RefreshCw, RotateCcw, GraduationCap, Lightbulb, TrendingUp, 
  BarChart3, ArrowRight, Brain, AlertTriangle, Target, 
  XCircle, Play, Share2, ChevronRight, Activity, Search, 
  SkipForward, Hash, Link2, LogOut, Users, CheckCircle
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';

const ALL_PAIRS = [
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
  }
  playTone(freq, type, duration, vol) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type; 
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch(e) {}
  }
  playPerfect() { this.playTone(880, 'sine', 0.15, 0.1); }   
  playStreak()  { this.playTone(1046.5, 'triangle', 0.3, 0.12); } 
  playFail()    { this.playTone(220, 'sawtooth', 0.25, 0.15); } 
  playTick()    { this.playTone(1200, 'sine', 0.05, 0.02); }
  playComplete(){ this.playTone(1318.5, 'sine', 0.4, 0.12); }
  setEnabled(status) { this.enabled = status; }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ============================================================
// ERROR BOUNDARY
// ============================================================
class GameErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('Game Error:', error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050505] rounded-2xl z-[100] border border-red-500/30">
          <div className="text-center p-6">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-white text-lg font-bold mb-2">Engine Fault Detected</h3>
            <p className="text-gray-400 text-sm mb-6">The visual engine encountered a fatal error.</p>
            <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }} className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-500 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.3)]">Reboot Engine</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function PairedAssociatesClient() {
  // === UI State ===
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  // === Game State ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  const [totalCorrectStats, setTotalCorrectStats] = useState(0);
  const [totalErrorStats, setTotalErrorStats] = useState(0);
  
  const [isLocalGameOver, setIsLocalGameOver] = useState(false);
  
  // === Drill Specific State ===
  const [phase, setPhase] = useState('ready'); 
  const [round, setRound] = useState(1);
  const [currentPairs, setCurrentPairs] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [memorizeTimeDisplay, setMemorizeTimeDisplay] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const totalAttempts = totalCorrectStats + totalErrorStats;
  const accuracyPercentage = totalAttempts === 0 ? 100 : Math.round((totalCorrectStats / totalAttempts) * 100);
  const roundsCompleted = round > 1 ? round - 1 : 0;

  const engine = useGameEngine({
    category: 'memory',
    drillId: 'paired-associates',
    drillName: 'Paired Associates',
    totalGameTime: 999999, 
    sharePath: 'drills/memory/long-term-memory/paired-associates',
  });

  const { gameState } = engine;

  const containerRef = useRef(null);
  const engineRef = useRef(engine);
  const timerIntervalRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const phaseTimeoutRef = useRef(null);

  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const roundRef = useRef(1);
  const localTimeRef = useRef(60.0);
  const memorizeTimeRef = useRef(10.0);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef(gameState);
  
  const phaseRef = useRef('ready');
  const currentPairsRef = useRef([]);
  const questionIndexRef = useRef(0);
  const usedPairsRef = useRef(new Set());
  
  const totalCorrectRef = useRef(0);
  const totalErrorRef = useRef(0);

  useEffect(() => { 
    gameStateRef.current = gameState; 
    engineRef.current = engine;
  }, [gameState, engine]);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
    try { 
      const s = localStorage.getItem('pairedAssociatesBestScore_v3'); 
      if (s) { const p = parseInt(s,10); if (!isNaN(p)) setBestScore(p); }
    } catch (e) {}
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { if (audioSynth) audioSynth.setEnabled(soundEnabled); }, [soundEnabled]);

  // Mobile Landscape Detection
  useEffect(() => {
    const checkOrientationAndSize = () => {
      if (typeof window === 'undefined') return;
      const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '') || window.innerWidth <= 850;
      const isLandscapeView = window.innerWidth > window.innerHeight;
      
      setIsMobileLandscape(isMobileDevice && isLandscapeView);
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
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', fsHandler); 
    return () => document.removeEventListener('fullscreenchange', fsHandler); 
  }, []);

  const updateLocalBestScore = useCallback((finalScore) => { 
    try { 
      const currentBest = parseInt(localStorage.getItem('pairedAssociatesBestScore_v3') || '0', 10); 
      if (finalScore > currentBest) { 
        localStorage.setItem('pairedAssociatesBestScore_v3', finalScore.toString()); 
        setBestScore(finalScore); 
      } 
    } catch(e) {} 
  }, []);

  useEffect(() => {
    if (gameState === 'ended' || gameState === 'gameOver' || isLocalGameOver) {
      updateLocalBestScore(scoreRef.current);
    }
  }, [gameState, isLocalGameOver, updateLocalBestScore]);

  const clearAllTimeouts = useCallback(() => { 
    if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current); 
  }, []);

  useEffect(() => {
    if (gameState === 'ended' || gameState === 'start' || gameState === 'gameOver') {
      clearAllTimeouts();
      isActiveRef.current = false;
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  }, [gameState, clearAllTimeouts]);

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      } else if (isFullscreen) {
        await document.exitFullscreen(); 
      }
    } catch (err) { console.warn(err); } 
  }, [isFullscreen]);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 1200);
  }, []);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/memory/long-term-memory/paired-associates';
    if (navigator.share) {
      navigator.share({ title: 'Paired Associates Drill', text: 'Test your associative memory capacity!', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  const handleExit = useCallback(async () => {
    engineRef.current.endGame();
    if (document.fullscreenElement) {
      try { await document.exitFullscreen(); } catch (e) { console.warn(e); }
    }
  }, []);

  const getAvailablePairs = useCallback((count) => {
    const available = ALL_PAIRS.filter((_, i) => !usedPairsRef.current.has(i));
    if (available.length < count) {
      usedPairsRef.current.clear();
      return [...ALL_PAIRS].sort(() => Math.random() - 0.5).slice(0, count);
    }
    return [...available].sort(() => Math.random() - 0.5).slice(0, count);
  }, []);

  const generateQuestion = useCallback((pairsList, qIndex) => {
    if (qIndex >= pairsList.length) return;
    const pair = pairsList[qIndex];
    const allDistractors = pairsList
      .filter(p => p !== pair).map(p => p.pair[1]).concat(pair.distractors)
      .filter((v, i, a) => a.indexOf(v) === i);
    const shuffledDistractors = allDistractors.sort(() => Math.random() - 0.5).slice(0, 2);
    const options = [pair.pair[1], ...shuffledDistractors].sort(() => Math.random() - 0.5);
    
    setCurrentQuestion({
      prompt: `What goes with "${pair.pair[0]}"?`,
      correct: pair.pair[1],
      options: options
    });
  }, []);

  const startRound = useCallback((rnd) => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    const numPairs = Math.min(rnd + 2, ALL_PAIRS.length);
    const selectedPairs = getAvailablePairs(numPairs);
    
    selectedPairs.forEach(p => {
      const idx = ALL_PAIRS.indexOf(p);
      if (idx !== -1) usedPairsRef.current.add(idx);
    });
    
    currentPairsRef.current = selectedPairs;
    setCurrentPairs(selectedPairs);
    questionIndexRef.current = 0;
    setQuestionIndex(0);
    setIsProcessing(false);
    setSelectedAnswer(null);
    
    const fixedMemorizeTime = 10.0;
    memorizeTimeRef.current = fixedMemorizeTime;
    setMemorizeTimeDisplay(10);
    
    setPhase("learning");
    phaseRef.current = "learning";
    if (audioSynth) audioSynth.playTick(); 
  }, [getAvailablePairs]);

  const startRoundRef = useRef();
  useEffect(() => { startRoundRef.current = startRound; }, [startRound]);

  const handleAnswer = useCallback((answer) => {
    if (isProcessing || gameStateRef.current !== 'playing') return;
    setIsProcessing(true);
    setSelectedAnswer(answer);
    
    const isCorrect = answer === currentQuestion.correct;
    
    if (isCorrect) {
      scoreRef.current += 10;
      localTimeRef.current = Math.min(60.0, Number((localTimeRef.current + 3.0).toFixed(1)));
      streakRef.current += 1;
      totalCorrectRef.current += 1;
      if (streakRef.current > bestStreakRef.current) {
        bestStreakRef.current = streakRef.current;
        setBestStreak(streakRef.current);
      }
      if (audioSynth) audioSynth.playStreak();
      triggerFeedback('✓ Correct! +10 PTS | +3s', 'success');
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 5);
      localTimeRef.current = Math.max(0, Number((localTimeRef.current - 2.0).toFixed(1)));
      streakRef.current = 0;
      totalErrorRef.current += 1;
      
      // Decrease Difficulty on error
      roundRef.current = Math.max(1, roundRef.current - 1);
      
      if (audioSynth) audioSynth.playFail();
      triggerFeedback(`✗ Wrong! -5 PTS | -2s`, 'error');
    }
    
    setScore(scoreRef.current);
    setStreak(streakRef.current);
    setLocalTimeRemaining(Math.max(0, localTimeRef.current));
    setTotalCorrectStats(totalCorrectRef.current);
    setTotalErrorStats(totalErrorRef.current);
    
    phaseTimeoutRef.current = setTimeout(() => {
      if (!isActiveRef.current) return;
      const nextIndex = questionIndexRef.current + 1;
      
      // If we haven't finished the questions for the current batch
      if (nextIndex < currentPairsRef.current.length) {
        setQuestionIndex(nextIndex);
        questionIndexRef.current = nextIndex;
        generateQuestion(currentPairsRef.current, nextIndex);
        setIsProcessing(false);
        setSelectedAnswer(null);
      } else {
        // Move to next round
        // If they got it wrong, roundRef was decreased above, so the next generated round will be easier
        const nextRoundNum = roundRef.current + 1;
        setRound(nextRoundNum);
        roundRef.current = nextRoundNum;
        if (audioSynth) audioSynth.playComplete();
        triggerFeedback(`Round Complete! Preparing Next...`, 'success');
        setTimeout(() => {
          if (isActiveRef.current && startRoundRef.current) { startRoundRef.current(nextRoundNum); }
        }, 800);
      }
    }, 600); 
  }, [isProcessing, currentQuestion, triggerFeedback, generateQuestion]);

  const skipMemorize = useCallback(() => {
    if (phaseRef.current === 'learning' && isActiveRef.current) {
        memorizeTimeRef.current = 0;
        setPhase('testing');
        phaseRef.current = 'testing';
        generateQuestion(currentPairsRef.current, 0);
    }
  }, [generateQuestion]);

  useEffect(() => { 
    if (gameState === 'playing' && !isLocalGameOver) { 
      timerIntervalRef.current = setInterval(() => { 
        
        localTimeRef.current = Number(Math.max(0, localTimeRef.current - 0.1).toFixed(1));
        
        if (localTimeRef.current <= 0) { 
          localTimeRef.current = 0;
          setLocalTimeRemaining(0);
          isActiveRef.current = false; 
          
          setIsLocalGameOver(true);
          
          engineRef.current.endGame();
          clearInterval(timerIntervalRef.current);
          return;
        } 
        setLocalTimeRemaining(localTimeRef.current);

        if (phaseRef.current === 'learning') {
            memorizeTimeRef.current = Number(Math.max(0, memorizeTimeRef.current - 0.1).toFixed(1));
            if (memorizeTimeRef.current <= 0) {
                skipMemorize();
            } else {
                setMemorizeTimeDisplay(Math.ceil(memorizeTimeRef.current));
            }
        }
      }, 100); 
    } 
    return () => { 
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); 
    }; 
  }, [gameState, isLocalGameOver, skipMemorize]);

  const handleStartGame = useCallback(async () => {
    if (isActiveRef.current || gameStateRef.current === 'playing') return; 
    if (audioSynth) audioSynth.init();
    
    setScore(0); setStreak(0); setBestStreak(0); 
    setTotalCorrectStats(0); setTotalErrorStats(0); setRound(1);
    
    localTimeRef.current = 60.0; 
    setLocalTimeRemaining(60.0);
    
    scoreRef.current = 0; streakRef.current = 0; bestStreakRef.current = 0; roundRef.current = 1;
    totalCorrectRef.current = 0; totalErrorRef.current = 0;
    usedPairsRef.current = new Set();

    isActiveRef.current = true; 
    gameStateRef.current = 'playing';
    
    setIsLocalGameOver(false);
    clearAllTimeouts(); 
    
    // Auto Fullscreen Trigger
    try { 
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      }
    } catch (err) { console.warn("Fullscreen request failed", err); } 
    
    engine.startGame();
    startRound(1);
  }, [clearAllTimeouts, startRound, engine]);

  if (loading || !isClient) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(139,92,246,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    ); 
  }

  const isGameOverVisual = gameState === 'ended' || gameState === 'gameOver' || isLocalGameOver;

  return (
    <div className="min-h-screen flex flex-col select-none bg-[#050505] text-white selection:bg-transparent font-sans" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col">
        
        {!isFullscreen && (
          <nav className="mb-4 flex-shrink-0">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/memory" className="text-gray-500 hover:text-gray-300 transition-colors">Memory</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-gray-500">Long-Term Memory</li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-violet-400 font-medium">Paired Associates</li>
            </ol>
          </nav>
        )}

        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Paired Associates</h1>
                <p className="text-sm sm:text-base text-gray-400">Memory Encoding • Semantic Recall • Endless Survival</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-shrink-0">
              {gameState === 'playing' && (
                <button 
                  onClick={() => { engine.endGame(); handleStartGame(); }}
                  className="p-2.5 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all hover:scale-105 active:scale-95"
                  title="Reset session"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all">
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

        {/* Dynamic HUD */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-3 mb-2 h-auto py-1 flex-shrink-0">
            <StatCard icon={<Target className="text-violet-400" />} value={score} label="Score" />
            <StatCard icon={<Trophy className="text-pink-400" />} value={bestScore} label="Best" />
            <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
            <StatCard icon={<TrendingUp className="text-orange-400" />} value={streak} label="Streak" />
            <StatCard icon={<Link2 className="text-blue-400" />} value={round} label="Round" />
            <StatCard icon={<Activity className="text-emerald-400" />} value={accuracyPercentage} label="Accuracy" unit="%" />
            <StatCard icon={<XCircle className="text-red-400" />} value={totalErrorStats} label="Errors" />
          </div>
        )}

        {/* Dynamic Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {localFeedback.visible && (
            <div key={localFeedback.id} className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : localFeedback.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-yellow-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
              {localFeedback.text}
            </div>
          )}
        </div>

        <GameErrorBoundary>
          {/* Main Game Container */}
          <div 
            ref={containerRef} 
            onContextMenu={(e) => { if(gameState === 'playing') e.preventDefault(); }}
            className={`relative overflow-hidden w-full flex flex-col items-center justify-center bg-[#050505] transition-all duration-100 ${
              isFullscreen 
                ? 'fixed inset-0 h-[100vh] w-[100vw] z-50 rounded-none max-h-none' 
                : 'rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[500px] md:aspect-video'
            }`}
            style={{ 
              touchAction: gameState === 'playing' ? 'none' : 'auto', 
              overscrollBehavior: gameState === 'playing' ? 'none' : 'auto'
            }}
          >

            {/* Time Progress Bar */}
            {gameState === 'playing' && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
                <div 
                  className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-violet-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
                />
              </div>
            )}

            {isFullscreen && gameState === 'playing' && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={e => e.stopPropagation()} onClick={() => { engine.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button onPointerDown={e => e.stopPropagation()} onClick={() => setSoundEnabled(!soundEnabled)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">
                  {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
                <button onPointerDown={e => e.stopPropagation()} onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">
                  <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            )}

            {/* Game Phases */}
            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 overflow-y-auto w-full">
              <div className="w-full max-w-2xl mt-4">
                
                {/* START SCREEN */}
                {gameState === 'start' && (
                  <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 bg-black/90 p-4">
                    <div className="rounded-3xl p-5 sm:p-8 text-center max-w-sm w-full border border-gray-700 bg-gray-900 shadow-2xl flex flex-col max-h-[95vh]">
                      
                      <div className="overflow-y-auto shrink pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {!isMobileLandscape && (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                            <Link2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" aria-hidden="true" />
                          </div>
                        )}
                        <h2 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight text-white">Paired Associates</h2>
                        <p className="mb-6 font-medium text-gray-400 text-sm">Memorize pairs, then recall associations under pressure.</p>
                      </div>
                      <div className="shrink-0 mt-4">
                        <button 
                          onPointerDown={e => e.stopPropagation()}
                          onClick={handleStartGame} 
                          disabled={isActiveRef.current}
                          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform active:scale-95"
                        >
                           <Play className="w-5 h-5 fill-white" /> START DRILL
                        </button>
                      </div>

                    </div>
                  </div>
                )}

                {/* LEARNING PHASE */}
                {gameState === 'playing' && phase === "learning" && (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
                        {memorizeTimeDisplay}s remaining
                      </span>
                      <button onPointerDown={e => e.stopPropagation()} onClick={skipMemorize} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700 active:scale-95">
                        <SkipForward className="w-3.5 h-3.5" /> Skip
                      </button>
                    </div>
                    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                      {currentPairs.map((p, i) => (
                        <div key={i} className="p-4 sm:p-5 rounded-2xl text-center font-black tracking-tight bg-gray-900/60 border border-gray-800 shadow-inner text-xl sm:text-2xl">
                          <span className="text-white">{p.pair[0]}</span>
                          <span className="mx-2 text-violet-500 opacity-60">↔</span>
                          <span className="text-cyan-400">{p.pair[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TESTING PHASE */}
                {gameState === 'playing' && phase === "testing" && currentQuestion && (
                  <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-8 duration-200">
                    <div className="text-center mb-2">
                      <span className="text-sm font-bold tracking-widest uppercase text-violet-400 bg-violet-900/20 px-4 py-1.5 rounded-full">
                        Round {round} • Q {questionIndex + 1}/{currentPairs.length}
                      </span>
                    </div>
                    <p className="text-center font-black tracking-tight text-white text-2xl sm:text-4xl mb-4 sm:mb-8">
                      {currentQuestion.prompt}
                    </p>
                    
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                      {currentQuestion.options.map((option, i) => {
                          let btnColor = "bg-gray-900/60 hover:bg-gray-800 text-white border-gray-800"; 
                          if (isProcessing && selectedAnswer === option) {
                              btnColor = option === currentQuestion.correct 
                                  ? "bg-green-500/20 border-green-500 text-green-400 scale-[1.02]" 
                                  : "bg-red-500/20 border-red-500 text-red-400 line-through scale-95";
                          } else if (isProcessing && option === currentQuestion.correct) {
                              btnColor = "bg-green-500/10 border-green-500/50 text-green-400"; 
                          } else if (isProcessing) {
                              btnColor = "bg-gray-900/30 border-gray-800/30 text-gray-600 opacity-50"; 
                          }

                          return (
                            <button
                              key={i}
                              onPointerDown={e => e.stopPropagation()}
                              onClick={() => handleAnswer(option)}
                              disabled={isProcessing}
                              className={`w-full font-black tracking-wide py-4 sm:py-6 text-lg sm:text-xl rounded-2xl transition-all border-2 focus:outline-none ${btnColor}`}
                            >
                              {option}
                            </button>
                          );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Premium End Screen (Scrollable) */}
            {isGameOverVisual && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col my-auto max-h-[95vh]">
                  
                  <div className="bg-gradient-to-br from-violet-900/40 to-purple-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {score > bestScore && score > 0 && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                      <p className="text-violet-400 font-medium text-xs sm:text-sm">Associative Memory • Peak Level: {round}</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pointer-events-none overflow-y-auto shrink">
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
                            className={`${accuracyPercentage >= 80 ? 'text-green-500' : accuracyPercentage >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                            strokeWidth="3" strokeDasharray="100" strokeDashoffset={`${100 - accuracyPercentage}`} strokeLinecap="round" stroke="currentColor" fill="none" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-base sm:text-xl font-black ${accuracyPercentage >= 80 ? 'text-green-400' : accuracyPercentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracyPercentage}%</span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <ResultCard label="Best Score" value={Math.max(bestScore, score)} icon={<Trophy className="w-4 h-4" />} color="yellow" />
                      <ResultCard label="Best Streak" value={bestStreak} icon={<TrendingUp className="w-4 h-4" />} color="orange" />
                      <ResultCard label="Rounds" value={roundsCompleted} icon={<Link2 className="w-4 h-4" />} color="purple" />
                      <ResultCard label="Correct Hits" value={totalCorrectStats} icon={<CheckCircle className="w-4 h-4" />} color="emerald" />
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                    <button onPointerDown={e => e.stopPropagation()} onClick={() => { engine.endGame(); handleStartGame(); }} className="flex-1 py-3 sm:py-4 bg-violet-600 text-white rounded-xl font-black tracking-wide hover:bg-violet-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={handleExit} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </GameErrorBoundary>

        {/* Instructions */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-violet-400" />
                <h2 className="font-bold text-white text-lg tracking-tight">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="green" text="Perfect Recall" highlight="+10 PTS | +3s" result="Increases Pairs" />
                  <RuleItem color="cyan" text="Memorize Time" highlight="10 Seconds" result="Per Round" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="red" text="Wrong Match" highlight="-5 PTS | -2s" result="Drops Difficulty" />
                  <RuleItem color="orange" text="Time Limit Capped" highlight="Max 60 Seconds" result="Endless Mode" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT THIS DRILL */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-violet-400" />
                <h2 className="font-bold text-white text-lg tracking-tight">About Paired Associates</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This cognitive drill is modeled after the classic Paired-Associate Learning (PAL) test. It trains episodic memory and relational binding by forcing your brain to create rapid semantic associations between abstract or distinct concepts, directly enhancing overall long-term memory formation.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Students boosting study retention, professionals tasked with remembering client details, and anyone seeking to strengthen their episodic and semantic memory pathways.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Relational binding, semantic memory encoding, concept linking, rapid retrieval, and resilience against cognitive distractors.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score, aggregate accuracy percentage, maximum streak multiplier, and peak difficulty round reached before time depletion.</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Mnemonic Imagery:</strong> To master this drill, don't just read the words. Create a vivid, bizarre mental image connecting the two words (e.g., if the pair is Dog ↔ Bone, imagine a massive dog using a glowing bone as a baseball bat).</li>
                    <li><strong className="text-gray-200">Skip the Timer:</strong> You are given exactly 10 seconds to memorize the pairs. If you memorize them faster, hit "Skip" to save time on your main clock.</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> Accuracy fuels your clock. Correct answers yield +10 points and +3 seconds. Wrong answers immediately drain 5 points and 2 seconds, whilst scaling down the difficulty. Max time is permanently capped at 60 seconds.</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-violet-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">What happens when I pick a wrong association?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Selecting an incorrect distractor severely penalizes your run by subtracting 5 points and 2 seconds from the clock. Additionally, the engine dynamically lowers the difficulty (reducing the number of pairs) in the subsequent round to allow recovery.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Why do the distractors seem related?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">The multiple-choice options are deliberately populated with semantic distractors—words related to the pair's context—to force genuine episodic recall rather than simple process-of-elimination guessing.</p>
                    </div>
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
              <div className="w-1 h-5 rounded-full bg-violet-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/memory/short-term-memory/digit-span" title="Digit Span" desc="Train numerical short-term memory." color="purple" icon={<Hash className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/working-memory/n-back" title="Dual N-Back" desc="Gold standard working memory trainer." color="green" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/short-term-memory/color-sequence" title="Color Sequence" desc="Memorize and recall color patterns." color="orange" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/visual-recognition/visual-search" title="Visual Search" desc="Conjunctive search for hidden items." color="blue" icon={<Search className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FOOTER */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Visual Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual/visual-recognition/entropic-grid" className="hover:text-violet-400 transition-colors">Entropic Grid</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-violet-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-violet-450 hover:text-violet-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-violet-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-violet-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-violet-450 hover:text-violet-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-violet-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-violet-400 transition-colors">Aim Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-violet-450 hover:text-violet-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-violet-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-violet-400 transition-colors">Divided Attention</Link></li>
                    <li><Link href="/drills/cognitive" className="text-violet-450 hover:text-violet-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic" className="hover:text-violet-400 transition-colors">Academic (12)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-violet-400 transition-colors">Mental Fitness (6)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-violet-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-violet-500/25 to-purple-500/25 border border-violet-500/30 rounded-lg flex items-center justify-center">
                    <Activity className="w-3.5 h-3.5 text-violet-400" />
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="X / Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
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
// UI HELPER COMPONENTS
// ============================================================
function StatCard({ icon, value, label, unit = '' }) {
  return (
    <div className="group rounded-xl border border-slate-900 bg-slate-950/40 p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-slate-800 backdrop-blur-sm">
      <div className="mb-0.5 flex justify-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
        {icon}
      </div>
      <p className="text-xs sm:text-sm md:text-base font-extrabold tracking-tight truncate text-white">
        {value}
        <span className="text-[10px] sm:text-xs font-semibold ml-0.5 opacity-80 text-slate-400">{unit}</span>
      </p>
      <p className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 truncate">{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color }) {
  const colorMap = {
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
  };
  const c = colorMap[color] || colorMap.yellow;
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${c.bg} ${c.border}`}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={c.icon} aria-hidden="true">{icon}</div>
        <span className="text-xs sm:text-sm truncate text-gray-300">{label}</span>
      </div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${c.text}`}>{value}{unit}</span>
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

function RelatedCard({ href, title, desc, color, icon }) {
  const gradients = {
    blue: 'from-blue-500 to-indigo-500',
    cyan: 'from-cyan-500 to-teal-500',
    purple: 'from-purple-500 to-violet-500',
    rose: 'from-rose-500 to-pink-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
    green: 'from-green-500 to-emerald-500'
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:-translate-y-1 hover:border-purple-500/50`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-purple-500 to-indigo-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050508] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-purple-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-purple-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}