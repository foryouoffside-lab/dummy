'use client';

import React, { useEffect, useState, useRef, useCallback, Component } from 'react';
import Link from 'next/link';
import { 
  Eye, Zap, Timer, Trophy, Volume2, VolumeX, Maximize2, Minimize2,
  Info, RefreshCw, RotateCcw, Smartphone, GraduationCap, Lightbulb, 
  TrendingUp, BarChart3, ArrowRight, Brain, Users, Gauge, AlertTriangle, 
  Star, Layers, Target, CheckCircle, XCircle, Play, Share2, ChevronRight,
  Activity, LogOut, ScanEye
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';
import { getDifficultyLevel, recordGameScore, getLevelProgress, DIFFICULTY_LEVELS } from '../../../../../lib/difficultyManager';

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

  playFlash()   { this.playTone(1200, 'sine', 0.1, 0.05); } 
  playRecall()  { this.playTone(600, 'triangle', 0.2, 0.08); } 
  playPerfect() { this.playTone(880, 'sine', 0.2, 0.1); }   
  playFail()    { this.playTone(330, 'sawtooth', 0.25, 0.08); } 
  
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
export default function WideFieldClient() {
  // === UI State ===
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Economy & Difficulty State ===
  const [localLevel, setLocalLevel] = useState(1);
  const [customScore, setCustomScore] = useState(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);

  // === Drill-specific state ===
  const [currentChar, setCurrentChar] = useState('A');
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashPosition, setFlashPosition] = useState({ top: '20%', left: '20%' });
  const [isRecallMode, setIsRecallMode] = useState(false);
  const [recallInput, setRecallInput] = useState('');
  const [recallResults, setRecallResults] = useState([]);
  const [recallDescription, setRecallDescription] = useState(''); 
  const [perfectRecalls, setPerfectRecalls] = useState(0);
  const [failedRecalls, setFailedRecalls] = useState(0);

  // === Engine Setup ===
  const engine = useGameEngine({
    category: 'visual',
    drillId: 'wide-field',
    drillName: 'Wide Field Awareness',
    totalGameTime: 9999, // Overridden by local economy timer
    sharePath: 'drills/visual/peripheral-vision/wide-field',
  });

  // Refs for zero-latency tracking
  const containerRef = useRef(null);
  const flashTimeoutRef = useRef(null);
  const cycleTimeoutRef = useRef(null);
  const recallCheckTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const flashHistoryRef = useRef([]);
  const isRecallActiveRef = useRef(false);
  const flashesSinceLastRecallRef = useRef(0);
  const recallCountRef = useRef(0);
  const randomFlashThresholdRef = useRef(3);
  const recallPositionsRef = useRef([]);
  const customScoreRef = useRef(0);
  const localTimeRef = useRef(60);
  const gameStateRef = useRef(engine.gameState);
  const feedbackTimerRef = useRef(null);
  const engineRef = useRef(engine);

  useEffect(() => { gameStateRef.current = engine.gameState; }, [engine.gameState]);
  useEffect(() => { engineRef.current = engine; }, [engine]);

  const positions = useRef([
    { top: '15%', left: '15%' },
    { top: '15%', left: '85%' },
    { top: '85%', left: '15%' },
    { top: '85%', left: '85%' }
  ]).current;
  
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  // Init
  useEffect(() => {
    setIsClient(true);
    try { const name = localStorage.getItem('skilldrills_player_name'); if (name) setPlayerNameInput(name); } catch (e) {}
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  // Audio Sync
  useEffect(() => { if (audioSynth) audioSynth.setEnabled(soundEnabled); }, [soundEnabled]);

  // Mobile & Orientation Check
  useEffect(() => {
    const checkEnv = () => {
      if (typeof window === 'undefined') return;
      const mobileCheck = window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsMobile(mobileCheck);
      
      if (mobileCheck && window.innerHeight > window.innerWidth) {
        setShowRotateWarning(true);
      } else {
        setShowRotateWarning(false);
      }
    };
    checkEnv();
    window.addEventListener('resize', checkEnv);
    window.addEventListener('orientationchange', checkEnv);
    return () => { window.removeEventListener('resize', checkEnv); window.removeEventListener('orientationchange', checkEnv); };
  }, []);

  // Fullscreen Detection
  useEffect(() => { 
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', fsHandler); 
    return () => document.removeEventListener('fullscreenchange', fsHandler); 
  }, []);

  // Custom Strict Economy Timer Loop
  useEffect(() => {
    if (engine.gameState !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      localTimeRef.current -= 1;
      
      if (localTimeRef.current <= 0) {
        localTimeRef.current = 0;
        setLocalTimeRemaining(0);
        clearInterval(timerIntervalRef.current);
        if (engineRef.current && typeof engineRef.current.endGame === 'function') {
          engineRef.current.endGame();
        }
      } else {
        setLocalTimeRemaining(localTimeRef.current);
      }
    }, 1000);
    
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [engine.gameState]);

  // Cleanup
  useEffect(() => {
    if (engine.gameState === 'ended' || engine.gameState === 'start') {
      clearTimeouts();
      setIsFlashing(false);
      setIsRecallMode(false);
    }
    const preventSpace = (e) => { if (e.code === 'Space' && engine.gameState === 'playing') e.preventDefault(); };
    window.addEventListener('keydown', preventSpace);
    return () => window.removeEventListener('keydown', preventSpace);
  }, [engine.gameState]);

  const clearTimeouts = () => {
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (recallCheckTimeoutRef.current) clearTimeout(recallCheckTimeoutRef.current);
  };

  // UI Flow Handlers
  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen) await containerRef.current?.requestFullscreen(); 
      else await document.exitFullscreen(); 
    } catch (err) {} 
  }, [isFullscreen]);

  const handleExitToStart = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    window.location.reload(); 
  }, []);

  const shareDrillLink = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/visual/peripheral-vision/wide-field';
    if (navigator.share) {
      try { await navigator.share({ title: 'Wide Field Awareness Drill', url }); } catch (e) {}
    } else {
      try { await navigator.clipboard.writeText(url); alert('Link copied to clipboard!'); } catch (e) {}
    }
  }, []);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 1000);
  }, []);

  // Update Economy (Strict Limits)
  const updateEconomy = useCallback((scoreDelta, timeDelta) => {
    setCustomScore(prev => {
      const updated = Math.max(0, prev + scoreDelta);
      customScoreRef.current = updated;
      return updated;
    });

    localTimeRef.current = Math.min(60, Math.max(0, localTimeRef.current + timeDelta));
    setLocalTimeRemaining(localTimeRef.current);
    
    if (localTimeRef.current <= 0) {
      localTimeRef.current = 0;
      setLocalTimeRemaining(0);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (engineRef.current && typeof engineRef.current.endGame === 'function') {
        engineRef.current.endGame();
      }
    }
  }, []);

  // ============================================================
  // DRILL MECHANICS
  // ============================================================
  const getOrdinalText = useCallback((num) => {
    if (num === 1) return 'last';
    if (num === 2) return '2nd last';
    if (num === 3) return '3rd last';
    if (num === 4) return '4th last';
    return `${num}th last`;
  }, []);

  const generateRecallDescription = useCallback((positions) => {
    if (positions.length === 1) {
      const pos = positions[0];
      if (pos === 1) return 'the last flash';
      return `the ${getOrdinalText(pos)} flash`;
    }
    const sorted = [...positions].sort((a, b) => a - b);
    const texts = sorted.map(p => p === 1 ? 'last' : `${getOrdinalText(p)}`);
    if (texts.length === 2) return `the ${texts[0]} and ${texts[1]} flash`;
    return texts.join(', ') + ' flashes';
  }, [getOrdinalText]);

  const getDifficultyParams = useCallback(() => {
    switch(localLevel) {
      case 1: return { flashDuration: 600, recallProbability: 0.15, recallPatterns: [[1], [2], [1, 2]], minFlashesForRecall: [3, 4, 5] };
      case 2: return { flashDuration: 500, recallProbability: 0.18, recallPatterns: [[1], [2], [1, 2], [3]], minFlashesForRecall: [3, 4, 5, 6] };
      case 3: return { flashDuration: 400, recallProbability: 0.22, recallPatterns: [[1], [2], [3], [1, 2], [2, 3]], minFlashesForRecall: [3, 4, 5, 6] };
      case 4: return { flashDuration: 325, recallProbability: 0.25, recallPatterns: [[1], [2], [3], [1, 2], [2, 3], [1, 2, 3]], minFlashesForRecall: [3, 4, 5, 6, 7] };
      case 5: return { flashDuration: 250, recallProbability: 0.28, recallPatterns: [[2], [3], [4], [2, 3], [1, 2, 3], [2, 3, 4]], minFlashesForRecall: [4, 5, 6, 7] };
      case 6: return { flashDuration: 200, recallProbability: 0.32, recallPatterns: [[3], [4], [2, 3], [3, 4], [2, 3, 4]], minFlashesForRecall: [4, 5, 6, 7] };
      default: return { flashDuration: 500, recallProbability: 0.18, recallPatterns: [[1], [2], [1, 2]], minFlashesForRecall: [3, 4, 5] };
    }
  }, [localLevel]);

  const continueFlashing = useCallback(() => {
    if (gameStateRef.current !== 'playing' || isRecallActiveRef.current) return;
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    
    const params = getDifficultyParams();
    const minDelay = params.flashDuration + 100;
    const maxDelay = params.flashDuration + 400;
    const delay = minDelay + Math.random() * (maxDelay - minDelay);
    
    cycleTimeoutRef.current = setTimeout(() => { flashCharacter(); }, delay);
  }, [getDifficultyParams]);

  const closeRecallAndContinue = useCallback(() => {
    isRecallActiveRef.current = false; 
    setIsRecallMode(false); 
    setRecallResults([]);
    setRecallInput('');
    setRecallDescription('');
    recallPositionsRef.current = [];
    flashesSinceLastRecallRef.current = 0;
    if (gameStateRef.current === 'playing') {
      continueFlashing();
    }
  }, [continueFlashing]);

  const startRecallMode = useCallback(() => {
    if (gameStateRef.current !== 'playing' || isRecallActiveRef.current) return;
    
    const params = getDifficultyParams();
    const historyLength = flashHistoryRef.current.length;
    const validPatterns = params.recallPatterns.filter(pattern => pattern.every(pos => pos <= historyLength));
    
    if (validPatterns.length === 0) {
      closeRecallAndContinue();
      return;
    }
    
    const chosenPattern = validPatterns[Math.floor(Math.random() * validPatterns.length)];
    recallPositionsRef.current = chosenPattern;
    
    setRecallDescription(generateRecallDescription(chosenPattern));
    setRecallInput('');
    setRecallResults([]);
    isRecallActiveRef.current = true;
    setIsRecallMode(true);
    if (audioSynth) audioSynth.playRecall();
    recallCountRef.current += 1;
    
    const minFlashOptions = params.minFlashesForRecall || [3, 4, 5, 6, 7];
    randomFlashThresholdRef.current = minFlashOptions[Math.floor(Math.random() * minFlashOptions.length)];
    
    setTimeout(() => { 
      const input = document.getElementById('recall-input'); 
      if (input) input.focus(); 
    }, 100);
  }, [getDifficultyParams, closeRecallAndContinue, generateRecallDescription]);

  const checkRecallAnswer = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    
    const positions = recallPositionsRef.current;
    const historyLength = flashHistoryRef.current.length;
    
    const expectedChars = positions.map(pos => {
      const idx = historyLength - pos;
      return idx >= 0 && idx < flashHistoryRef.current.length ? flashHistoryRef.current[idx].char : '';
    });
    
    const userChars = recallInput.toUpperCase().split('').slice(0, positions.length);
    const results = expectedChars.map((correct, idx) => ({
      correct, user: userChars[idx] || '', isCorrect: userChars[idx] === correct, position: positions[idx]
    }));
    
    setRecallResults(results);
    
    const correctCount = results.filter(r => r.isCorrect).length;
    const allCorrect = correctCount === positions.length;
    
    if (allCorrect) {
      setPerfectRecalls(prev => prev + 1);
      updateEconomy(10, 2); // +10 PTS, +2s
      setLocalLevel(prev => Math.min(6, prev + 1));
      if (audioSynth) audioSynth.playPerfect();
      triggerFeedback(`✓ PERFECT! +10 PTS | +2s | Diff ↑`, 'success');
    } else {
      setFailedRecalls(prev => prev + 1);
      updateEconomy(-5, -2); // -5 PTS, -2s
      setLocalLevel(prev => Math.max(1, prev - 1));
      if (audioSynth) audioSynth.playFail();
      triggerFeedback('✗ MISSED! -5 PTS | -2s | Diff ↓', 'error');
    }
    
    recallCheckTimeoutRef.current = setTimeout(() => { closeRecallAndContinue(); }, 2500);
  }, [recallInput, triggerFeedback, closeRecallAndContinue, updateEconomy]);

  const handleRecallKeyPress = useCallback((e) => { 
    if (e.key === 'Enter') { e.preventDefault(); checkRecallAnswer(); }
  }, [checkRecallAnswer]);

  const flashCharacter = useCallback(() => {
    if (gameStateRef.current !== 'playing' || isRecallActiveRef.current) return;
    
    const pos = positions[Math.floor(Math.random() * positions.length)];
    const char = characters[Math.floor(Math.random() * characters.length)];
    setFlashPosition(pos); 
    setCurrentChar(char); 
    setIsFlashing(true);
    if (audioSynth) audioSynth.playFlash();
    
    flashHistoryRef.current.push({ char, timestamp: Date.now() });
    if (flashHistoryRef.current.length > 15) flashHistoryRef.current.shift();
    
    flashesSinceLastRecallRef.current++;
    
    const params = getDifficultyParams();
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    
    flashTimeoutRef.current = setTimeout(() => {
      setIsFlashing(false);
      
      const needsMoreRecalls = recallCountRef.current < 4;
      const hasEnoughFlashes = flashesSinceLastRecallRef.current >= randomFlashThresholdRef.current;
      const shouldRecallRandom = !isRecallActiveRef.current && flashHistoryRef.current.length >= 2 && 
                                 hasEnoughFlashes && Math.random() < params.recallProbability;
      const shouldForceRecall = needsMoreRecalls && hasEnoughFlashes && flashHistoryRef.current.length >= 2;
      
      if ((shouldRecallRandom || shouldForceRecall) && !isRecallActiveRef.current) {
        startRecallMode();
      } else if (!isRecallActiveRef.current) {
        continueFlashing();
      }
    }, params.flashDuration);
  }, [positions, characters, getDifficultyParams, startRecallMode, continueFlashing]);

  // Absolute Start Trigger
  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    
    clearTimeouts();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setCustomScore(0); customScoreRef.current = 0;
    setLocalTimeRemaining(60); localTimeRef.current = 60;
    setLocalLevel(1);
    recallCountRef.current = 0;
    randomFlashThresholdRef.current = 3;

    try { 
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      }
    } catch (err) {} 
    
    if (engineRef.current && typeof engineRef.current.startGame === 'function') {
      engineRef.current.startGame();
    }
  }, []);

  useEffect(() => {
    if (engine.gameState === 'playing') {
      setPerfectRecalls(0); setFailedRecalls(0);
      setIsFlashing(false); setIsRecallMode(false); setRecallDescription('');
      flashHistoryRef.current = []; isRecallActiveRef.current = false;
      flashesSinceLastRecallRef.current = 0; recallPositionsRef.current = [];
      
      triggerFeedback('Focus entirely on the center cross', 'success');
      setTimeout(() => { flashCharacter(); }, 1200);
    }
  }, [engine.gameState, flashCharacter, triggerFeedback]);

  if (loading || !isClient) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    ); 
  }

  const totalRecalls = perfectRecalls + failedRecalls;
  const accuracyPercentage = totalRecalls > 0 ? Math.round((perfectRecalls / totalRecalls) * 100) : 100;
  const isNewBest = engine.gameState === 'ended' && customScore > engine.bestScore && customScore > 0;

  return (
    <div className="min-h-screen select-none bg-black text-white selection:bg-transparent" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/visual" className="text-gray-500 hover:text-gray-300 transition-colors">Visual Drills</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-purple-400 font-medium">Wide Field Awareness</li>
            </ol>
          </nav>
        )}
        
        {/* Header */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Wide Field Awareness</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Peripheral Memory • Position-Based Recall • Adaptive Scaling</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              
              {engine.gameState === 'playing' && (
                <button onClick={() => { if(engineRef.current.endGame) engineRef.current.endGame(); handleStartGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset"><RefreshCw className="w-5 h-5" /></button>
              )}
              <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
            </div>
          </div>
        )}

        {showNameInput && (
          <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-900 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <input type="text" value={playerNameInput} onChange={e => { setPlayerNameInput(e.target.value); try { localStorage.setItem('skilldrills_player_name', e.target.value); } catch(err){} }} placeholder="Enter display name" maxLength={20}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
          </div>
        )}

        {/* Stats Matrix */}
        {!isFullscreen && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
            <StatCard icon={<Target className="text-purple-400" />} value={customScore} label="Score" />
            <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={localTimeRemaining} label="Time" unit="s" />
            <StatCard icon={<Zap className="text-yellow-400" />} value={`Lv.${localLevel}`} label="Difficulty" />
            <StatCard icon={<CheckCircle className="text-green-400" />} value={perfectRecalls} label="Perfects" />
            <StatCard icon={<XCircle className="text-red-400" />} value={failedRecalls} label="Missed" />
            <StatCard icon={<Trophy className="text-orange-400" />} value={engine.bestScore || 0} label="Best" />
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

        {/* Game Container */}
        <GameErrorBoundary>
          <div ref={containerRef} 
            className={`relative overflow-hidden flex flex-col transition-all duration-100 z-10 bg-[#050508] ${
              isFullscreen 
                ? 'fixed inset-0 z-50 w-screen h-screen rounded-none border-none' 
                : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] h-[75vh] md:h-[600px] lg:h-[650px]'
            }`}
          >
            
            {/* Subtle background grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Time Progress Bar */}
            {engine.gameState === 'playing' && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
                <div 
                  className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`}
                  style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} 
                />
              </div>
            )}

            {showRotateWarning && engine.gameState !== 'playing' && (
              <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 backdrop-blur-sm pointer-events-auto">
                <div className="animate-bounce mb-6 text-purple-500">
                  <RotateCcw className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Rotate Device</h3>
                <p className="text-sm text-gray-400 max-w-xs mx-auto">Please flip your terminal into landscape mode to align the horizontal sensory field.</p>
              </div>
            )}

            {isFullscreen && engine.gameState === 'playing' && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onClick={() => { if(engineRef.current.endGame) engineRef.current.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
                <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
              </div>
            )}

            {/* ACTIVE GAME AREA */}
            {engine.gameState === 'playing' && (
              <div className="absolute inset-0">
                {/* Center Fixation Crosshair */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-gray-500">
                  <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-60 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    <line x1="20" y1="5" x2="20" y2="35" stroke="currentColor" strokeWidth="2" />
                    <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="2" />
                    <circle cx="20" cy="20" r="3" fill="#a855f7" />
                  </svg>
                </div>

                {/* Flashing Character */}
                {!isRecallMode && isFlashing && (
                  <div className="absolute animate-in zoom-in-50 duration-150 ease-out" 
                       style={{ top: flashPosition.top, left: flashPosition.left, transform: 'translate(-50%, -50%)', zIndex: 20 }}>
                    <div className="font-mono font-black text-[40px] md:text-[60px] lg:text-[70px] text-green-400 drop-shadow-[0_0_25px_rgba(74,222,128,0.8)] leading-none">
                      {currentChar}
                    </div>
                  </div>
                )}

                {/* Recall Input Mode */}
                {isRecallMode && recallResults.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-40 animate-in fade-in duration-200">
                    <div className="rounded-3xl p-6 sm:p-8 text-center max-w-md w-full mx-4 shadow-2xl border border-gray-700 bg-gray-900">
                      <div className="mb-4"><Brain className="w-12 h-12 text-purple-500 mx-auto" /></div>
                      <h3 className="text-xl font-black mb-2 text-white tracking-wide">RECALL SEQUENCE</h3>
                      <p className="mb-6 text-sm text-gray-400">
                        Type <span className="font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-1 rounded">{recallDescription}</span>
                      </p>
                      
                      <input 
                        id="recall-input" 
                        type="text" 
                        value={recallInput} 
                        onChange={(e) => setRecallInput(e.target.value.toUpperCase().replace(/[^A-Z2-9]/g, ''))} 
                        onKeyDown={handleRecallKeyPress}
                        maxLength={recallPositionsRef.current.length || 3} 
                        className="w-full px-4 py-4 mb-4 text-center text-4xl font-mono font-black tracking-[0.5em] rounded-xl border-2 outline-none transition-all bg-black border-gray-700 text-green-400 focus:border-purple-500 focus:shadow-[0_0_20px_rgba(168,85,247,0.3)] uppercase" 
                        placeholder={"_".repeat(recallPositionsRef.current.length || 1)} 
                        autoFocus 
                        autoComplete="off"
                      />
                      
                      <div className="flex gap-3">
                        <button onClick={closeRecallAndContinue} className="flex-1 py-3 rounded-xl border border-gray-700 bg-gray-800 text-gray-400 font-bold hover:bg-gray-700 hover:text-white transition-all text-sm uppercase tracking-wider">Skip (-0)</button>
                        <button onClick={checkRecallAnswer} className="flex-[2] py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]">Submit</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recall Results Screen */}
                {isRecallMode && recallResults.length > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-40 animate-in fade-in duration-200">
                    <div className="rounded-3xl p-6 sm:p-8 text-center max-w-md w-full mx-4 shadow-2xl border border-gray-700 bg-gray-900">
                      <h3 className="text-sm font-black mb-6 text-gray-400 uppercase tracking-widest">Sequence Results</h3>
                      
                      <div className="flex justify-center gap-6 mb-8 flex-wrap">
                        {recallResults.map((result, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">{result.position === 1 ? 'Last' : `${result.position}nd last`}</div>
                            <div className="relative mb-2">
                              <div className={`text-4xl font-mono font-black ${result.isCorrect ? 'text-green-500' : 'text-gray-600'}`}>{result.correct}</div>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-mono bg-black px-3 py-1 rounded-lg border border-gray-800">
                              <span className="text-gray-500">You:</span>
                              <span className={`font-bold ${result.isCorrect ? 'text-green-400' : 'text-red-500'}`}>{result.user || '—'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800 mb-6">
                        {recallResults.every(r => r.isCorrect) ? (
                          <p className="text-green-400 font-black tracking-widest uppercase">Perfect! Diff ↑</p>
                        ) : (
                          <p className="text-red-500 font-black tracking-widest uppercase">Sequence Missed! Diff ↓</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile-Optimized Start Screen */}
            {engine.gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm p-4 overflow-y-auto pointer-events-auto">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full border border-gray-700 bg-gray-900 shadow-2xl flex flex-col my-auto shrink-0">
                  <div className="flex-1 mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                      <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black mb-2 tracking-tight text-white">Wide Field Awareness</h2>
                  </div>

                  <button onClick={handleStartGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(168,85,247,0.3)] focus:outline-none shrink-0">
                    <Play className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Premium Mobile-Optimized End Screen */}
            {engine.gameState === 'ended' && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 p-4 overflow-y-auto">
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[90vh] my-auto shrink-0">
                  
                  <div className="flex-1 overflow-y-auto">
                    <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 p-5 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        {isNewBest && (
                          <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                            ⭐ New Personal Best
                          </div>
                        )}
                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                        <p className="text-purple-400 font-medium text-sm">Wide Field Awareness • Level {localLevel}</p>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 pointer-events-none shrink-0">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                          <div className="flex items-end gap-1">
                            <span className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tighter">{customScore}</span>
                            <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">PTS</span>
                          </div>
                        </div>
                        
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                            <path className="text-gray-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path 
                              className={`${accuracyPercentage >= 80 ? 'text-green-500' : accuracyPercentage >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                              strokeWidth="3" strokeDasharray="100" strokeDashoffset={100 - accuracyPercentage} strokeLinecap="round" stroke="currentColor" fill="none" 
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-lg sm:text-xl font-black ${accuracyPercentage >= 80 ? 'text-green-400' : accuracyPercentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracyPercentage}%</span>
                            <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2">
                        <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                          <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Perfect Sequences</div>
                          <div className="text-lg sm:text-xl font-black text-green-400">{perfectRecalls}</div>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                          <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Missed Sequences</div>
                          <div className="text-lg sm:text-xl font-black text-red-400">{failedRecalls}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fixed Bottom Action Row */}
                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 shrink-0 rounded-b-3xl">
                    <button onClick={() => { if(engineRef.current.endGame) engineRef.current.endGame(); handleStartGame(); }} className="flex-1 py-3 sm:py-4 bg-purple-600 text-white rounded-xl font-black tracking-wide hover:bg-purple-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                    </button>
                    <button onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onClick={handleExitToStart} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
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
          <section className="mt-10 pointer-events-none">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-purple-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Perfect Recall" highlight="+10 PTS | +2s" result="Increases Difficulty" />
                  <RuleItem num="2" color="cyan" text="Dynamic Adjustments" highlight="Speed & Flash Count" result="Adaptive Environment" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Missed Sequence" highlight="-5 PTS | -2s" result="Decreases Difficulty" />
                  <RuleItem num="4" color="yellow" text="Timer Economy" highlight="Max 60s" result="Time Ends = Game Over" />
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
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About This Wide Field Awareness Drill</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This wide field awareness drill trains peripheral vision and temporal sequence working memory. Characters flash in 4 distinct corners while you force your foveal vision (central focus) onto the center crosshair.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Target Audience</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Esports athletes, traditional sports players, drivers, and those wanting to process environmental data faster without moving their central gaze.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Functional field of view (UFOV), temporal sequence memory, divided attention, visual tracking resolution, and spatial coordinate mapping.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Performance Metrics</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Total net score economy (+10/-5), physical clock management (+2s/-2s), accuracy ratio, total perfect sequences, misses, and sustained difficulty peak.</p>
                  </div>
                </div>

                {/* HOW TO PLAY SECTION */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play</h3>
                  </div>
                  <ol className="list-decimal pl-5 space-y-2 text-xs text-gray-400 leading-relaxed">
                    <li><strong className="text-gray-200">Hold Focus:</strong> Lock your gaze strictly on the absolute center crosshair. If you move your eyes to look directly at the flashing characters, you break the cognitive constraint of the drill.</li>
                    <li><strong className="text-gray-200">Process the Sequence:</strong> Read and memorize the sequence of characters appearing in your periphery using your working memory.</li>
                    <li><strong className="text-gray-200">Identify the Prompt:</strong> When the recall screen appears, it will ask for specific characters from the sequence (e.g., "Type the last and 2nd last flash").</li>
                    <li><strong className="text-gray-200">Manage Time:</strong> Perfect sequence entries add +2 seconds to your clock and +10 score. Any wrong inputs subtract -2 seconds and -5 score. Keep the timer alive up to the 60s hard limit.</li>
                  </ol>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">What is position-based recall?</h4>
                      <p className="text-xs text-gray-400 mt-1">Instead of always asking for the complete sequence of characters, the engine will query your memory randomly. It might ask for "the last flash", or specifically "the 2nd last and last flash". You must maintain the entire sequence in working memory to answer correctly.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">How does the difficulty scale?</h4>
                      <p className="text-xs text-gray-400 mt-1">Difficulty directly correlates to your input. A correct recall increases the internal difficulty level (speeding up flash rates and extending sequences). A wrong recall drops it down a tier, allowing you to recover.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why is my time not going above 60s?</h4>
                      <p className="text-xs text-gray-400 mt-1">The internal physics engine institutes a strict 60-second absolute maximum limit to preserve endurance integrity. Perfect shots cannot artificially inflate the clock forever.</p>
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
              <div className="w-1 h-5 rounded-full bg-purple-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/visual/peripheral-vision/peripheral-flash" title="Peripheral Flash" desc="Detect rapid flashes in peripheral vision." color="purple" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/short-term-memory/color-sequence" title="Color Sequence" desc="Watch and recall color patterns." color="cyan" icon={<Star className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/spatial-memory/grid-memorization" title="Grid Memorization" desc="Memorize lit cell positions on grids." color="blue" icon={<Layers className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Divided Attention" desc="Dual-task brain training challenge." color="rose" icon={<Brain className="w-4 h-4" />} />
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
                    <li><Link href="/drills/visual/peripheral-vision/wide-field" className="hover:text-purple-400 transition-colors">Wide Field Awareness</Link></li>
                    <li><Link href="/drills/visual/peripheral-vision/peripheral-flash" className="hover:text-purple-400 transition-colors">Peripheral Flash</Link></li>
                    <li><Link href="/drills/visual" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/spatial-memory/grid-memorization" className="hover:text-purple-400 transition-colors">Grid Memorization</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-purple-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-purple-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-purple-400 transition-colors">Aim Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-purple-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-purple-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic" className="hover:text-purple-400 transition-colors">Academic (12)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-purple-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500/25 to-pink-500/25 border border-purple-500/30 rounded-lg flex items-center justify-center">
                    <Eye className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
                  Open-source telemetry training platform. Free forever. No downloads required.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
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

// ==========================================
// UTILITY COMPONENTS
// ==========================================
function StatCard({ icon, value, label, unit = '' }) {
  return (
    <div className="group rounded-xl border border-slate-900 bg-slate-950/40 p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-slate-800 backdrop-blur-sm">
      <div className="mb-0.5 flex justify-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{icon}</div>
      <p className="text-xs sm:text-sm md:text-base font-extrabold tracking-tight truncate text-white">
        {value}
        <span className="text-[10px] sm:text-xs font-semibold ml-0.5 opacity-80 text-slate-400">{unit}</span>
      </p>
      <p className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 truncate">{label}</p>
    </div>
  );
}

function RuleItem({ num, color, text, highlight = '', result }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500',
    red: 'bg-red-600 text-red-300 border-red-500', 
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500',
    green: 'bg-green-600 text-green-300 border-green-500' 
  };
  const colors = colorMap[color] || 'bg-slate-600 text-slate-300 border-slate-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-[#0b0f19]/40 p-4 rounded-xl border border-slate-800 shadow-sm">
      <div className={`w-8 h-8 rounded-xl ${bg} border border-t-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0`}>{num}</div>
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
    orange: 'from-orange-500 to-amber-500',
    emerald: 'from-emerald-500 to-green-500',
    rose: 'from-rose-500 to-pink-500',
    indigo: 'from-indigo-500 to-blue-500',
    red: 'from-red-500 to-rose-500'
  };
  
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:-translate-y-1 hover:border-purple-500/50">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-purple-500 to-pink-500'}`}></div>
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