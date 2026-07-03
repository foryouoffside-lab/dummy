'use client';

import { Component, useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { 
  Eye, Timer, Trophy, Volume2, VolumeX, Maximize2, Minimize2,
  Info, RefreshCw, RotateCcw, GraduationCap, Lightbulb, TrendingUp, 
  BarChart3, ArrowRight, Brain, Users, AlertTriangle, Target, 
  CheckCircle, XCircle, Play, Share2, ChevronRight, BookOpen,
  Activity, Search, Copy, SkipForward, Hash, Heart, Star, Images,
  CheckCircle2, LogOut, Repeat
} from "lucide-react";
import useGameEngine from '../../../../../lib/useGameEngine';

const ALL_ITEMS = [
  { item: "Fire", emoji: "🔥", associations: ["hot", "red", "flame", "smoke", "burn"] },
  { item: "Ocean", emoji: "🌊", associations: ["blue", "waves", "fish", "salt", "deep"] },
  { item: "Forest", emoji: "🌳", associations: ["green", "trees", "animals", "leaves", "nature"] },
  { item: "Clock", emoji: "⏰", associations: ["time", "hands", "tick", "numbers", "watch"] },
  { item: "Music", emoji: "🎵", associations: ["notes", "sound", "rhythm", "melody", "song"] },
  { item: "Winter", emoji: "❄️", associations: ["cold", "snow", "ice", "white", "freeze"] },
  { item: "Garden", emoji: "🌻", associations: ["flowers", "soil", "green", "grow", "water"] },
  { item: "Kitchen", emoji: "🍳", associations: ["cook", "food", "heat", "knife", "plate"] },
  { item: "Library", emoji: "📚", associations: ["books", "quiet", "read", "shelves", "study"] },
  { item: "Airport", emoji: "✈️", associations: ["fly", "travel", "luggage", "ticket", "gate"] },
  { item: "Volcano", emoji: "🌋", associations: ["lava", "erupt", "mountain", "ash", "crater"] },
  { item: "Desert", emoji: "🏜️", associations: ["sand", "dry", "cactus", "hot", "dunes"] },
  { item: "Lighthouse", emoji: "🏮", associations: ["beacon", "coast", "guide", "tower", "ships"] },
  { item: "Observatory", emoji: "🔭", associations: ["stars", "telescope", "dome", "space", "planet"] },
  { item: "Bakery", emoji: "🥖", associations: ["bread", "oven", "flour", "yeast", "sweet"] },
  { item: "Harbor", emoji: "⚓", associations: ["boats", "dock", "cargo", "sail", "port"] },
  { item: "Laboratory", emoji: "🔬", associations: ["experiment", "chemicals", "beaker", "research", "data"] },
  { item: "Stadium", emoji: "🏟️", associations: ["crowd", "game", "cheer", "field", "sport"] },
  { item: "Greenhouse", emoji: "🌿", associations: ["plants", "glass", "warm", "humid", "grow"] },
  { item: "Aquarium", emoji: "🐠", associations: ["fish", "water", "tank", "coral", "swim"] },
  { item: "Democracy", emoji: "🗳️", associations: ["vote", "freedom", "people", "ballot", "rights"] },
  { item: "Gravity", emoji: "🪐", associations: ["pull", "mass", "Newton", "orbit", "force"] },
  { item: "Justice", emoji: "⚖️", associations: ["law", "fair", "court", "judge", "balance"] },
  { item: "Evolution", emoji: "🧬", associations: ["species", "adapt", "Darwin", "survival", "genes"] },
  { item: "Harmony", emoji: "🎶", associations: ["balance", "peace", "chord", "unity", "blend"] },
  { item: "Legacy", emoji: "📜", associations: ["heritage", "inherit", "history", "tradition", "will"] },
  { item: "Innovation", emoji: "💡", associations: ["invent", "create", "new", "idea", "future"] },
  { item: "Wisdom", emoji: "🦉", associations: ["knowledge", "experience", "sage", "insight", "learn"] },
  { item: "Resilience", emoji: "🪨", associations: ["strong", "bounce", "endure", "tough", "survive"] },
  { item: "Mystery", emoji: "🔮", associations: ["secret", "puzzle", "unknown", "clue", "detective"] }
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
        <div className="absolute inset-0 flex items-center justify-center bg-[#050508] rounded-2xl z-[100] border border-red-500/30">
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
export default function ImageAssociationClient() {
  // === UI State ===
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game State ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalCorrectStats, setTotalCorrectStats] = useState(0);
  const [totalErrorStats, setTotalErrorStats] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [level, setLevel] = useState(1);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  
  // === Drill Specific State ===
  const [phase, setPhase] = useState('ready'); // 'ready' | 'memorize' | 'recall' | 'result'
  const [currentItem, setCurrentItem] = useState(null);
  const [userAssociations, setUserAssociations] = useState("");
  const [memorizeTime, setMemorizeTime] = useState(10);

  // === Performance Metric Derivations ===
  const totalAttempts = totalCorrectStats + totalErrorStats;
  const accuracyPercentage = totalAttempts === 0 ? 100 : Math.round((totalCorrectStats / totalAttempts) * 100);
  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracyPercentage;

  // === Engine Setup ===
  const engine = useGameEngine({
    category: 'memory',
    drillId: 'image-association',
    drillName: 'Image Association',
    totalGameTime: 999999, // Overridden by precise local interval
    sharePath: 'drills/memory/long-term-memory/image-association',
  });

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const engineRef = useRef(engine);
  const timerIntervalRef = useRef(null);
  const memorizeTimerRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const phaseTimeoutRef = useRef(null);

  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const levelRef = useRef(1);
  const localTimeRef = useRef(60.0);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef(engine.gameState);
  const phaseRef = useRef('ready');
  const usedItemsRef = useRef(new Set());
  
  const totalCorrectRef = useRef(0);
  const totalErrorRef = useRef(0);

  useEffect(() => { 
    gameStateRef.current = engine.gameState; 
    engineRef.current = engine;
  }, [engine.gameState, engine]);

  // Init
  useEffect(() => {
    setIsClient(true);
    try { 
      const name = localStorage.getItem('skilldrills_player_name'); 
      if (name) setPlayerNameInput(name); 
      
      const s = localStorage.getItem('imgAssocBestScore_survival'); 
      if (s) { const p = parseInt(s,10); if (!isNaN(p)) setBestScore(p); }
    } catch (e) {}
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  // Audio Sync
  useEffect(() => { if (audioSynth) audioSynth.setEnabled(soundEnabled); }, [soundEnabled]);

  // Mobile Guard & Landscape Detection
  useEffect(() => {
    const checkOrientationAndSize = () => {
      if (typeof window === 'undefined') return;
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '') || window.innerWidth < 768;
      
      if (!isMobile) { 
        setIsMobileLandscape(false);
        return; 
      }
      
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsMobileLandscape(!isPortrait && isMobile);
    };
    
    checkOrientationAndSize();
    window.addEventListener('resize', checkOrientationAndSize);
    window.addEventListener('orientationchange', checkOrientationAndSize);
    return () => { 
      window.removeEventListener('resize', checkOrientationAndSize); 
      window.removeEventListener('orientationchange', checkOrientationAndSize); 
    };
  }, []);

  // Fullscreen Detection
  useEffect(() => { 
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', fsHandler); 
    return () => document.removeEventListener('fullscreenchange', fsHandler); 
  }, []);

  const updateLocalBestScore = useCallback((finalScore) => { 
    try { 
      const currentBest = parseInt(localStorage.getItem('imgAssocBestScore_survival') || '0', 10); 
      if (finalScore > currentBest) { 
        localStorage.setItem('imgAssocBestScore_survival', finalScore.toString()); 
        setBestScore(finalScore); 
      } 
    } catch(e) {} 
  }, []);

  useEffect(() => {
    if (engine.gameState === 'ended') {
      updateLocalBestScore(scoreRef.current);
    }
  }, [engine.gameState, updateLocalBestScore]);

  const clearAllTimeouts = useCallback(() => { 
    if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current); 
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
  }, []);

  useEffect(() => {
    if (engine.gameState === 'ended' || engine.gameState === 'start') {
      clearAllTimeouts();
      isActiveRef.current = false;
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  }, [engine.gameState, clearAllTimeouts]);

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      } else if (isFullscreen) {
        await document.exitFullscreen(); 
      }
    } catch (err) {
      console.warn("Fullscreen toggle failed", err);
    } 
  }, [isFullscreen]);

  const savePlayerName = useCallback(() => {
    const name = playerNameInput.trim() || 'Anonymous Player';
    try { localStorage.setItem('skilldrills_player_name', name); } catch (e) {}
    setShowNameInput(false);
  }, [playerNameInput]);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 1500);
  }, []);

  // Decoupled Global Precision Timer
  useEffect(() => { 
    if (engine.gameState === 'playing') { 
      timerIntervalRef.current = setInterval(() => { 
        localTimeRef.current -= 0.1;
        
        if (localTimeRef.current <= 0) { 
          localTimeRef.current = 0;
          setLocalTimeRemaining(0);
          isActiveRef.current = false; 
          engineRef.current.endGame();
          clearInterval(timerIntervalRef.current);
          return;
        } 
        setLocalTimeRemaining(localTimeRef.current);
      }, 100); 
    } 
    return () => { 
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); 
    }; 
  }, [engine.gameState]);

  // ============================================================
  // DRILL MECHANICS
  // ============================================================

  const getAvailableItem = useCallback(() => {
    const available = ALL_ITEMS.filter((_, i) => !usedItemsRef.current.has(i));
    if (available.length === 0) {
      return null;
    }
    return available[Math.floor(Math.random() * available.length)];
  }, []);

  const startRound = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;

    const randomItem = getAvailableItem();
    
    // If no more items, end game early
    if (!randomItem) {
      engineRef.current.endGame();
      if (audioSynth) audioSynth.playComplete();
      triggerFeedback("🎉 Mastery Achieved! All items completed!", "success");
      return;
    }
    
    const idx = ALL_ITEMS.indexOf(randomItem);
    if (idx !== -1) usedItemsRef.current.add(idx);
    
    setCurrentItem(randomItem);
    setUserAssociations("");
    setMemorizeTime(10); // Updated to 10 seconds
    setPhase("memorize");
    phaseRef.current = "memorize";
    
    if (audioSynth) audioSynth.playTick(); 

    // Handle 10-second memorization timer (Reading Phase)
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    memorizeTimerRef.current = setInterval(() => {
        setMemorizeTime(prev => {
            if (prev <= 1) {
                clearInterval(memorizeTimerRef.current);
                setPhase("recall");
                phaseRef.current = "recall";
                setTimeout(() => inputRef.current?.focus(), 50);
                return 0;
            }
            return prev - 1;
        });
    }, 1000);

  }, [getAvailableItem, triggerFeedback]);

  const startRoundRef = useRef();
  useEffect(() => {
    startRoundRef.current = startRound;
  }, [startRound]);

  const checkAssociations = useCallback(() => {
      if (!isActiveRef.current || gameStateRef.current !== 'playing' || phaseRef.current !== 'recall') return;
      clearAllTimeouts();
      
      const userWords = userAssociations.toLowerCase().split(/[,\s]+/).filter(w => w);
      const targetWords = currentItem.associations.map(w => w.toLowerCase());
      
      const correct = userWords.filter(w => targetWords.includes(w)).length;
      const wrong = userWords.length - correct;
      
      totalCorrectRef.current += correct;
      totalErrorRef.current += wrong;
      setTotalCorrectStats(totalCorrectRef.current);
      setTotalErrorStats(totalErrorRef.current);

      // Define Success as guessing at least 80% of words (4 out of 5 usually)
      const isSuccess = correct >= targetWords.length * 0.8;
      
      if (isSuccess) {
          streakRef.current += 1;
          if (bestStreakRef.current < streakRef.current) {
              bestStreakRef.current = streakRef.current;
              setBestStreak(streakRef.current);
          }
          
          scoreRef.current += 15;
          setScore(scoreRef.current);
          
          localTimeRef.current = Math.min(60.0, localTimeRef.current + 5.0);
          setLocalTimeRemaining(localTimeRef.current);

          levelRef.current += 1;
          setLevel(levelRef.current);
          
          if (audioSynth) audioSynth.playStreak();
          triggerFeedback(`Great Job! +15 PTS | +5s`, 'success');
      } else {
          streakRef.current = 0;
          
          scoreRef.current = Math.max(0, scoreRef.current - 5);
          setScore(scoreRef.current);

          localTimeRef.current -= 3.0;
          setLocalTimeRemaining(Math.max(0, localTimeRef.current));

          levelRef.current = Math.max(1, levelRef.current - 1);
          setLevel(levelRef.current);

          if (audioSynth) audioSynth.playFail();
          triggerFeedback(`${wrong} Errors! -5 PTS | -3s`, 'error');
      }

      // CRITICAL FIX: If penalty drops time to 0, kill the game instantly
      if (localTimeRef.current <= 0) {
          isActiveRef.current = false;
          clearAllTimeouts();
          engineRef.current.endGame();
          return;
      }
      
      setStreak(streakRef.current);
      setRoundsCompleted(prev => prev + 1);
      
      setPhase('result');
      phaseRef.current = 'result';

      // Auto-advance after 2 seconds
      phaseTimeoutRef.current = setTimeout(() => {
          if (isActiveRef.current && startRoundRef.current) {
              startRoundRef.current();
          }
      }, 2000);

  }, [currentItem, userAssociations, triggerFeedback, clearAllTimeouts]);


  const skipMemorize = useCallback(() => {
    if (phaseRef.current === 'memorize' && isActiveRef.current) {
        if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
        setMemorizeTime(0);
        setPhase('recall');
        phaseRef.current = 'recall';
        setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter" && phase === "recall") {
      e.preventDefault();
      checkAssociations();
    }
  }, [phase, checkAssociations]);

  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    
    setScore(0); 
    setStreak(0); setBestStreak(0); 
    setTotalCorrectStats(0); setTotalErrorStats(0);
    setRoundsCompleted(0);
    
    localTimeRef.current = 60.0;
    setLocalTimeRemaining(60.0);
    levelRef.current = 1;
    setLevel(1);
    
    scoreRef.current = 0; 
    streakRef.current = 0;
    bestStreakRef.current = 0;
    
    totalCorrectRef.current = 0;
    totalErrorRef.current = 0;
    usedItemsRef.current = new Set();
    
    // CRITICAL: Set states synchronously so startRound() works immediately
    isActiveRef.current = true; 
    gameStateRef.current = 'playing';
    
    clearAllTimeouts(); 
    
    // Auto Fullscreen Trigger
    try { 
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      }
    } catch (err) {
      console.warn("Fullscreen request failed", err);
    } 
    
    engine.startGame();
    startRound();
  }, [clearAllTimeouts, startRound, engine]);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/memory/long-term-memory/image-association';
    if (navigator.share) {
      navigator.share({ title: 'Image Association Memory Drill', text: 'Train your visual memory! Free!', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  if (loading || !isClient) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050508]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(217,70,239,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    ); 
  }

  const isNewBest = engine.gameState === 'ended' && score > bestScore && score > 0;

  return (
    <div className="min-h-screen select-none bg-[#050508] text-white selection:bg-transparent font-sans" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Image Association Drill - Visual Memory & Word Association Training",
            "url": "https://skilldrills.online/drills/memory/long-term-memory/image-association",
            "description": "Free visual association memory drill featuring 30 unique items. Time-Attack Survival mode based on memorization speed and precision.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" }
          })
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/drills/memory" className="text-gray-500 hover:text-gray-300 transition-colors">Memory Drills</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-fuchsia-400 font-medium">Image Association</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.3)]">
              <Images className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Image Association</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Visual Memory • Word Association • Time-Attack Survival</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
          
            {engine.gameState === 'playing' && (
              <button onPointerDown={e => e.stopPropagation()} onClick={() => { engine.endGame(); handleStartGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset"><RefreshCw className="w-5 h-5" /></button>
            )}
            <button onPointerDown={e => e.stopPropagation()} onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">
                {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            <button onPointerDown={e => e.stopPropagation()} onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
          </div>
        </div>

        {showNameInput && (
          <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-900 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <input type="text" value={playerNameInput} onChange={e => setPlayerNameInput(e.target.value)} placeholder="Enter your display name" maxLength={20}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-fuchsia-500 transition-colors"
                onKeyDown={e => e.key === 'Enter' && savePlayerName()} />
              <button onClick={savePlayerName} className="px-5 py-2.5 bg-fuchsia-600 text-white rounded-lg text-sm font-semibold hover:bg-fuchsia-500 transition-colors shadow-lg shadow-fuchsia-600/20">Save</button>
            </div>
          </div>
        )}

        {/* Stats Bar */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-fuchsia-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
          <StatCard icon={<Repeat className="text-yellow-400" />} value={level} label="Level" />
          <StatCard icon={<TrendingUp className="text-orange-400" />} value={streak} label="Streak" />
          <StatCard icon={<Activity className="text-emerald-400" />} value={accuracyPercentage} label="Accuracy" unit="%" />
          <StatCard icon={<CheckCircle className="text-green-400" />} value={totalCorrectStats} label="Hits" />
          <StatCard icon={<XCircle className="text-red-400" />} value={totalErrorStats} label="Errors" />
          <StatCard icon={<Trophy className="text-purple-400" />} value={Math.max(bestScore, score)} label="Best" />
        </div>

        {/* Dynamic Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {localFeedback.visible && (
            <div key={localFeedback.id} className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : localFeedback.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-yellow-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
              {localFeedback.text}
            </div>
          )}
        </div>

        {/* Game Container */}
        <GameErrorBoundary>
          <div ref={containerRef} 
            className={`relative overflow-hidden flex flex-col transition-all duration-100 ${
              isFullscreen 
                ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-[#050508]' 
                : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[500px] md:aspect-video'
            }`}
            style={{ background: '#050508' }}>
            
            {/* Global Time Progress Bar */}
            {engine.gameState === 'playing' && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
                <div 
                  className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-fuchsia-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
                />
              </div>
            )}

            {/* Story Completion Progress Bar (Secondary) */}
            {engine.gameState === 'playing' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 z-[60] pointer-events-none">
                <div 
                  className="h-full bg-blue-500/50 transition-all duration-300 ease-out"
                  style={{ width: `${(roundsCompleted / 30) * 100}%` }} 
                />
              </div>
            )}

            {isFullscreen && engine.gameState === 'playing' && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); engine.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setSoundEnabled(v => !v); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">
                    {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              </div>
            )}

            {/* ACTIVE GAMEPLAY AREA */}
            {engine.gameState === 'playing' && currentItem && (
              <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 h-full w-full relative overflow-y-auto">
                  
                  {/* MEMORIZE PHASE */}
                  {phase === 'memorize' && (
                    <div className="space-y-5 text-center animate-in fade-in zoom-in-95 duration-200 w-full max-w-3xl">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30">
                                {memorizeTime}s reading
                            </span>
                            <button 
                                onPointerDown={e => e.stopPropagation()}
                                onClick={skipMemorize}
                                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                            >
                                <SkipForward className="w-3.5 h-3.5" /> Skip & Save Time
                            </button>
                        </div>
                        <div className="text-7xl sm:text-8xl mb-4 drop-shadow-2xl">{currentItem.emoji}</div>
                        <p className="text-3xl sm:text-4xl font-black tracking-tight text-white">{currentItem.item}</p>
                        
                        <div className="flex flex-wrap gap-3 justify-center mt-6 p-4 rounded-2xl bg-gray-900/40 border border-gray-800/50 shadow-inner">
                            {currentItem.associations.map((word, i) => (
                                <span key={i} className="px-5 py-2.5 rounded-xl text-lg font-bold transition-all shadow-sm bg-white/10 text-white border border-white/10">
                                    {word}
                                </span>
                            ))}
                        </div>
                    </div>
                  )}

                  {/* RECALL PHASE */}
                  {phase === 'recall' && (
                      <div className="w-full max-w-2xl flex flex-col animate-in slide-in-from-bottom-8 duration-200">
                          <span className="text-fuchsia-500 font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 text-center">TYPE RECALLED WORDS</span>
                          
                          <div className="flex flex-col items-center justify-center mb-6">
                              <p className="text-center text-lg font-medium mb-2 text-gray-400">
                                What words were associated with:
                              </p>
                              <div className="flex items-center gap-3">
                                  <span className="text-4xl">{currentItem.emoji}</span>
                                  <p className="text-4xl font-black tracking-tight text-white">
                                    {currentItem.item}?
                                  </p>
                              </div>
                          </div>

                          <textarea
                              ref={inputRef}
                              value={userAssociations}
                              onChange={(e) => setUserAssociations(e.target.value)}
                              onKeyDown={handleKeyPress}
                              className="w-full h-28 sm:h-32 p-4 rounded-xl border-2 outline-none resize-none text-xl font-mono transition-all shadow-inner bg-gray-900 text-white border-gray-700 focus:border-fuchsia-500 placeholder-gray-600 mb-4"
                              placeholder="Type words separated by spaces..."
                              autoFocus
                              spellCheck="false"
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                          />
                          
                          <button 
                              onClick={checkAssociations}
                              disabled={!userAssociations.trim()}
                              className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white rounded-xl font-black tracking-widest text-lg hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                          >
                              SUBMIT RECALL
                          </button>
                          <p className="text-xs text-center font-semibold text-gray-500 mt-3">
                            Press Enter to submit quickly
                          </p>
                      </div>
                  )}

                  {/* FEEDBACK PHASE */}
                  {phase === 'result' && (
                      <div className="w-full max-w-2xl text-center animate-in fade-in duration-100">
                          <p className="text-xs font-bold uppercase tracking-widest mb-4 block text-gray-500">
                              EVALUATION FOR {currentItem.item}
                          </p>
                          
                          <div className="p-6 rounded-2xl shadow-inner min-h-[150px] bg-gray-900 border border-gray-800 flex items-center justify-center">
                              <div className="flex flex-wrap gap-3 justify-center">
                                {currentItem.associations.map((word, i) => {
                                  const recalled = userAssociations.toLowerCase().includes(word.toLowerCase());
                                  return (
                                    <span key={i} className={`px-5 py-2.5 rounded-xl text-base font-bold font-mono transition-all border ${
                                      recalled ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30 line-through'
                                    }`}>
                                      {recalled ? '✓' : '✗'} {word}
                                    </span>
                                  );
                                })}
                              </div>
                          </div>
                      </div>
                  )}
              </div>
            )}

            {/* Start Screen (Scrollable on tight displays) */}
            {engine.gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                  {!isMobileLandscape && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-2xl mx-auto flex items-center justify-center mb-4 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(217,70,239,0.3)]">
                        <Images className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                      </div>
                  )}
                  <h2 className="text-2xl sm:text-3xl font-black mb-2 pointer-events-none tracking-tight">Image Association</h2>
                  <p className="text-sm sm:text-base mb-6 text-gray-400 leading-relaxed pointer-events-none">Link the image to its associated words. A fast-paced Survival format mapping 30 unique challenges.</p>
                  
                  <button onPointerDown={e => e.stopPropagation()} onClick={handleStartGame}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none shrink-0">
                    <Play className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Premium Custom End Screen (Scrollable) */}
            {engine.gameState === 'ended' && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col my-auto">
                  
                  <div className="bg-gradient-to-br from-fuchsia-900/40 to-pink-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      {isNewBest && (
                        <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                          ⭐ New Personal Best
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Run Complete</h2>
                      <p className="text-fuchsia-400 font-medium text-xs sm:text-sm">Image Association • Level: {level}</p>
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
                            className={`${accuracyPercentage >= 80 ? 'text-green-500' : accuracyPercentage >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                            strokeWidth="3" strokeDasharray={`${strokeDasharray}`} strokeDashoffset={`${strokeDashoffset}`} strokeLinecap="round" stroke="currentColor" fill="none" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-base sm:text-xl font-black ${accuracyPercentage >= 80 ? 'text-green-400' : accuracyPercentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracyPercentage}%</span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Total Hits</div>
                        <div className="text-base sm:text-xl font-black text-green-400">{totalCorrectStats}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Total Errors</div>
                        <div className="text-base sm:text-xl font-black text-red-400">{totalErrorStats}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Streak</div>
                        <div className="text-base sm:text-xl font-black text-orange-400">{bestStreak}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                    <button onPointerDown={e => e.stopPropagation()} onClick={() => { engine.endGame(); handleStartGame(); }} className="flex-1 py-3 sm:py-4 bg-fuchsia-600 text-white rounded-xl font-black tracking-wide hover:bg-fuchsia-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(217,70,239,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={() => { if(isFullscreen) toggleFullscreen(); engine.endGame(); }} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
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
                <Info className="w-5 h-5 text-fuchsia-400" /><h2 className="font-bold text-white text-lg tracking-tight">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="green" text="Correct Recall (80%+)" highlight="+15 PTS | +5s" result="Level Up" />
                  <RuleItem color="fuchsia" text="Memorize Faster" highlight="Use Skip Button" result="Save Global Time" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="red" text="Wrong Recall (<80%)" highlight="-5 PTS | -3s" result="Level Down" />
                  <RuleItem color="orange" text="Time Limit Capped" highlight="Max 60 Seconds" result="Endless Survival" />
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
                <GraduationCap className="w-5 h-5 text-fuchsia-400" />
                <h2 className="font-bold text-white text-lg tracking-tight">About Image Association</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This fast-paced Image Association drill trains visual working memory capacity and word linkage through a challenging Survival Time-Attack format. You are given up to 10 seconds to read and map 5 associated words to a specific visual emoji. As soon as you begin recalling, your global timer continues to drop. Efficient encoding is key to scoring massive combos while keeping your clock alive.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Students building vocabulary connections, language learners strengthening word associations, professionals improving information retention, and anyone wanting to enhance visual-verbal memory linking under pressure.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Visual association memory, free recall accuracy, rapid long-term memory encoding, and the ability to process multi-faceted conceptual networks rapidly under time duress.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white tracking-tight">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Survival Net Score, accuracy percentage, precision hits vs misses, and peak level capacity logged securely to your local storage.</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Information Linking:</strong> Create mental narratives linking each word to the core item to construct a story in your mind rather than just rote reading.</li>
                    <li><strong className="text-gray-200">Global Clock Awareness:</strong> Remember that your 60-second global clock ticks even during reading. Skipping the reading phase early actively saves precious seconds!</li>
                    <li><strong className="text-gray-200">Survival Mechanics:</strong> Typing 4 out of 5 words correctly guarantees +15 PTS and +5s of survival time. Failing that threshold penalizes your time by -3s!</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-fuchsia-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">How does the timer work?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">This drill operates on a 60-second survival clock. The clock runs simultaneously while you read and while you type. Being fast adds back up to 5 seconds, but it strictly caps at 60s.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Why should I skip the reading phase?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">If you finish committing the 5 words to memory in 3 seconds, click Skip! Waiting for the full 10 seconds to deplete simply bleeds 7 seconds away from your global survival clock.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related visual drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-fuchsia-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/memory/associative-memory/concept-linking" title="Concept Linking" desc="Memorize and recall concept chains." color="blue" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/associative-memory/name-face" title="Name-Face Memory" desc="Memorize names with emoji faces and roles." color="green" icon={<Heart className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/associative-memory/sound-pattern" title="Sound Pattern" desc="Listen to and reproduce rhythmic patterns." color="purple" icon={<Star className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/working-memory/n-back" title="Dual N-Back" desc="Gold standard working memory trainer." color="orange" icon={<Brain className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FOOTER */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/long-term-memory/image-association" className="hover:text-fuchsia-400 transition-colors">Image Association</Link></li>
                    <li><Link href="/drills/memory/associative-memory/concept-linking" className="hover:text-fuchsia-400 transition-colors">Concept Linking</Link></li>
                    <li><Link href="/drills/memory/associative-memory/name-face" className="hover:text-fuchsia-400 transition-colors">Name-Face Memory</Link></li>
                    <li><Link href="/drills/memory" className="text-fuchsia-450 hover:text-fuchsia-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-fuchsia-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-fuchsia-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-fuchsia-400 transition-colors">Logic Puzzles</Link></li>
                    <li><Link href="/drills/cognitive" className="text-fuchsia-450 hover:text-fuchsia-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-fuchsia-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-fuchsia-400 transition-colors">Speed Reader</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-fuchsia-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-fuchsia-450 hover:text-fuchsia-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-fuchsia-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-fuchsia-400 transition-colors">Aim Trainer</Link></li>
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-fuchsia-400 transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/fps" className="text-fuchsia-450 hover:text-fuchsia-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-fuchsia-400 transition-colors">Visual (14 drills)</Link></li>
                    <li><Link href="/drills/cognitive" className="hover:text-fuchsia-400 transition-colors">Productivity (10 drills)</Link></li>
                    <li><Link href="/drills/visual-tracking" className="hover:text-fuchsia-400 transition-colors">Tracking (25 drills)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-fuchsia-400 transition-colors">Physical (11 drills)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-fuchsia-500/25 to-blue-500/25 border border-fuchsia-500/30 rounded-lg flex items-center justify-center">
                    <Brain className="w-3.5 h-3.5 text-fuchsia-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[10px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[10px] max-w-2xl mx-auto leading-relaxed mb-6">
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

function RuleItem({ color, text, highlight = '', result }) {
  const colorMap = { 
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500', 
    pink: 'bg-pink-600 text-pink-300 border-pink-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    green: 'bg-green-600 text-green-300 border-green-500',
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500',
    fuchsia: 'bg-fuchsia-600 text-fuchsia-300 border-fuchsia-500'
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
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,70,239,0.1)] hover:-translate-y-1 hover:border-fuchsia-500/50`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-fuchsia-500 to-pink-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050508] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-fuchsia-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-fuchsia-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}