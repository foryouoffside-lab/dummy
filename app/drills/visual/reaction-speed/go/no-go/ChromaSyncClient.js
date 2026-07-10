'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Clock, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Trophy, Info, Share2,
  GraduationCap, Lightbulb, TrendingUp, BarChart3,
  Brain, Users, ArrowRight,
  RefreshCw, Award, XCircle,
  AlertTriangle, Crosshair, Calculator, Code2, LogOut, Check, Sparkles
} from 'lucide-react';
import useGameEngine from '../../../../../../lib/useGameEngine';
import PlayAgainButton from '../../../../../../components/PlayAgainButton';

// ==========================================
// ZERO-LATENCY AUDIO SYNTHESIZER
// ==========================================
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

  playDrillSound(type) { 
    if (!this.enabled || !this.ctx) return; 
    try { 
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const o = this.ctx.createOscillator(); 
      const g = this.ctx.createGain(); 
      o.connect(g); 
      g.connect(this.ctx.destination); 
      const n = this.ctx.currentTime; 
      
      const fm = { success: 880, penalty: 150, flash: 1046, fail: 120, inhibit: 440 }; 
      const gm = { success: 0.2, penalty: 0.3, flash: 0.05, fail: 0.3, inhibit: 0.1 }; 
      
      if (type === 'fail' || type === 'penalty') o.type = 'triangle';
      else o.type = 'sine';
      
      o.frequency.setValueAtTime(fm[type] || 440, n); 
      if (type === 'success') o.frequency.exponentialRampToValueAtTime(1046.50, n + 0.15);
      
      g.gain.setValueAtTime(gm[type] || 0.1, n); 
      g.gain.exponentialRampToValueAtTime(0.001, n + 0.2); 
      o.start(n); o.stop(n + 0.2); 
    } catch (e) {} 
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ==========================================
// ERROR BOUNDARY
// ==========================================
class GameErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('Chroma-Sync Error:', error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/95 rounded-xl z-50 border border-green-500/30">
          <div className="text-center p-6 max-w-sm">
            <AlertTriangle className="w-12 h-12 text-green-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-white text-lg font-bold mb-2">Engine Desync</h3>
            <p className="text-gray-400 text-sm mb-4">The visual engine encountered a frame error. Let's reboot the runtime.</p>
            <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }} className="w-full py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(34,197,94,0.4)]">Restart Sequence</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function ChromaSyncClient() {
  // === UI State ===
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  // === Economy & Custom Precision Clock ===
  const [customScore, setCustomScore] = useState(0);
  const customScoreRef = useRef(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  const localTimeRef = useRef(60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const timerIntervalRef = useRef(null);

  // === Metrics & Mechanics ===
  const [perfectHits, setPerfectHits] = useState(0); 
  const [inhibitedCount, setInhibitedCount] = useState(0); 
  const [failedHits, setFailedHits] = useState(0); 
  const [bestReaction, setBestReaction] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  
  const stateRef = useRef("IDLE");
  const targetColorRef = useRef(null); 
  const startTimeRef = useRef(0);
  
  // God-Level Mechanics Refs
  const isFlashingRef = useRef(false);
  const flashDurationRef = useRef(250); // Starts at 250ms, shrinks to 8ms
  const reactionLimit = 250; // Strictly capped at 250ms limit
  
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const bestReactionRef = useRef(0);
  
  const delayTimeoutRef = useRef(null);
  const visualTimeoutRef = useRef(null);
  const reactionTimeoutRef = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const isActiveRef = useRef(false);
  const hasInitializedRoundRef = useRef(false);

  // Dynamic feedback
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });
  const feedbackTimerRef = useRef(null);

  // Visual Consts 
  const BALL_RADIUS = 52; 
  const colorPalette = { GO: "#FFFFFF", NO_GO: "#EF4444" }; 

  // === Base Engine Hook ===
  const engine = useGameEngine({
    category: 'visual',
    drillId: 'chroma-sync',
    drillName: 'Chroma-Sync Lab',
    totalGameTime: 9999, 
    lives: 9999,
    infiniteLives: true,
    sharePath: 'drills/visual/response-inhibition/chroma-sync',
  });

  const gameStateRef = useRef(engine.gameState);
  const engineRef = useRef(engine);
  
  // === Sync Refs ===
  useEffect(() => { gameStateRef.current = engine.gameState; }, [engine.gameState]);
  useEffect(() => { engineRef.current = engine; }, [engine]);

  // === Mount Logic ===
  useEffect(() => { 
    setIsClient(true); 
    const timer = setTimeout(() => setLoading(false), 100); 
    return () => clearTimeout(timer);
  }, []);

  // === Audio Engine Setup ===
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // === Custom Decoupled Timer ===
  useEffect(() => {
    if (engine.gameState !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }
    
    if (!isTimeUp && localTimeRef.current === 60 && localTimeRemaining === 60) {
      // Init sync
    } else if (!isTimeUp && localTimeRef.current <= 0) {
      localTimeRef.current = 60;
      setLocalTimeRemaining(60);
    }

    timerIntervalRef.current = setInterval(() => {
      localTimeRef.current -= 1;
      
      if (localTimeRef.current <= 0) {
        localTimeRef.current = 0;
        setLocalTimeRemaining(0);
        clearInterval(timerIntervalRef.current);
        setIsTimeUp(true); 
        if (typeof engineRef.current.endGame === 'function') engineRef.current.endGame();
      } else {
        setLocalTimeRemaining(localTimeRef.current);
      }
    }, 1000);
    
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [engine.gameState, isTimeUp]);

  useEffect(() => {
    try { const savedName = localStorage.getItem('skilldrills_player_name'); if (savedName) setPlayerNameInput(savedName); } catch (e) {}
  }, []);

  useEffect(() => { 
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', handleFsChange); 
    return () => document.removeEventListener('fullscreenchange', handleFsChange); 
  }, []);

  const cleanupAllTimers = useCallback(() => {
    if (delayTimeoutRef.current) { clearTimeout(delayTimeoutRef.current); delayTimeoutRef.current = null; }
    if (visualTimeoutRef.current) { clearTimeout(visualTimeoutRef.current); visualTimeoutRef.current = null; }
    if (reactionTimeoutRef.current) { clearTimeout(reactionTimeoutRef.current); reactionTimeoutRef.current = null; }
    if (animationRef.current) { cancelAnimationFrame(animationRef.current); animationRef.current = null; }
  }, []);

  const updateEconomy = useCallback((scoreDelta, timeDelta) => {
    setCustomScore(prev => {
      const updated = Math.max(0, prev + scoreDelta);
      customScoreRef.current = updated;
      if (engineRef.current && typeof engineRef.current.setScore === 'function') {
        engineRef.current.setScore(updated);
      }
      // Score-based difficulty scaling: shrink baseline flash duration as score grows
      flashDurationRef.current = Math.max(80, 250 - Math.floor(updated * 1.5));
      return updated;
    });

    localTimeRef.current = Math.min(60, Math.max(0, localTimeRef.current + timeDelta));
    if (localTimeRef.current <= 0) {
      localTimeRef.current = 0;
      setLocalTimeRemaining(0);
      setIsTimeUp(true);
      if (typeof engineRef.current.endGame === 'function') engineRef.current.endGame();
    } else {
      setLocalTimeRemaining(localTimeRef.current);
    }
  }, []);

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen) { await containerRef.current?.requestFullscreen(); } 
      else { if (document.fullscreenElement) await document.exitFullscreen(); } 
    } catch (err) {} 
  }, [isFullscreen]);

  const handleExitToStart = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    window.location.reload(); 
  }, []);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 800);
  }, []);

  // === Core Drill Engine Sequencing (God Level) ===
  const startCycle = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing' || isTimeUp) return;
    
    stateRef.current = "WAITING";
    targetColorRef.current = null;
    isFlashingRef.current = false;
    
    if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current);
    if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
    if (visualTimeoutRef.current) clearTimeout(visualTimeoutRef.current);

    const delay = 600 + Math.random() * 1200; 

    delayTimeoutRef.current = setTimeout(() => {
      if (!isActiveRef.current || gameStateRef.current !== 'playing' || isTimeUp) return;
      
      stateRef.current = "SIGNAL";
      const isGo = Math.random() < 0.6; // 60% chance of White (GO)
      targetColorRef.current = isGo ? 'GO' : 'NOGO';
      startTimeRef.current = performance.now();

      isFlashingRef.current = true;
      if (audioSynth) audioSynth.playDrillSound('flash');

      // 1. Visual Off Timer (Shrinking Duration down to 8ms)
      visualTimeoutRef.current = setTimeout(() => {
        isFlashingRef.current = false;
      }, flashDurationRef.current);

      // 2. Strict 250ms Reaction Boundary Timer
      reactionTimeoutRef.current = setTimeout(() => {
        if (stateRef.current === "SIGNAL" && isActiveRef.current && !isTimeUp) {
          
          if (targetColorRef.current === 'GO') {
            // MISSED WHITE (Timeout)
            stateRef.current = "IDLE";
            isFlashingRef.current = false;

            streakRef.current = 0;
            setStreak(0);
            setFailedHits(prev => prev + 1);

            updateEconomy(0, -2); // No PTS Penalty, -2s
            flashDurationRef.current = Math.min(250, flashDurationRef.current + 15);

            if (audioSynth) audioSynth.playDrillSound('fail');
            triggerFeedback('⏳ TIMEOUT (>250ms)! -2s', 'error');

            // eslint-disable-next-line no-use-before-define
            scheduleNextCycle();

          } else if (targetColorRef.current === 'NOGO') {
            // SUCCESSFULLY INHIBITED RED
            stateRef.current = "IDLE";
            isFlashingRef.current = false;

            const incrementalStreak = streakRef.current + 1;
            streakRef.current = incrementalStreak;
            setStreak(incrementalStreak);
            if (incrementalStreak > bestStreakRef.current) { 
              bestStreakRef.current = incrementalStreak; 
              setBestStreak(incrementalStreak); 
            }

            setInhibitedCount(prev => prev + 1);
            updateEconomy(1, 1);
            if (audioSynth) audioSynth.playDrillSound('inhibit');
            triggerFeedback('✓ INHIBITED! +1 PTS | +1s', 'success');

            // eslint-disable-next-line no-use-before-define
            scheduleNextCycle();
          }
        }
      }, reactionLimit); // STRICT 250MS BOUNDARY

    }, delay);
  }, [isTimeUp, updateEconomy, triggerFeedback]);

  const scheduleNextCycle = useCallback(() => {
    setTimeout(() => {
      if (isActiveRef.current && gameStateRef.current === 'playing' && !isTimeUp) {
        startCycle();
      }
    }, 300);
  }, [isTimeUp, startCycle]);


  // === Synchronized Processing Thread Matrix ===
  useEffect(() => {
    if (engine.gameState === 'playing' && !isTimeUp) {
      if (!hasInitializedRoundRef.current) {
        setPerfectHits(0);
        setInhibitedCount(0);
        setFailedHits(0);
        setBestReaction(0);
        setStreak(0);
        setBestStreak(0);
        setCustomScore(0);
        customScoreRef.current = 0;
        localTimeRef.current = 60;
        setLocalTimeRemaining(60);

        isActiveRef.current = true;
        stateRef.current = "WAITING";
        targetColorRef.current = null;
        isFlashingRef.current = false;
        flashDurationRef.current = 250; // Force initial window to 250ms
        
        streakRef.current = 0;
        bestStreakRef.current = 0;
        bestReactionRef.current = 0;

        cleanupAllTimers();
        startCycle();
        hasInitializedRoundRef.current = true;
      }
    } else {
      hasInitializedRoundRef.current = false;
    }
  }, [engine.gameState, isTimeUp, startCycle, cleanupAllTimers]);

  useEffect(() => {
    if (engine.gameState === 'ended' || engine.gameState === 'start' || isTimeUp) {
      cleanupAllTimers();
      isActiveRef.current = false;
      stateRef.current = "IDLE";
      isFlashingRef.current = false;
    }
  }, [engine.gameState, isTimeUp, cleanupAllTimers]);

  // === Unified Input Pointer Handler ===
  const handleInputStrikes = useCallback((e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    if (gameStateRef.current !== 'playing' || !isActiveRef.current || isTimeUp) return;
    
    e.stopPropagation();

    // Check hit boundaries
    const cvs = canvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const cx = cvs.width / 2;
    const cy = cvs.height / 2;

    const physicalClickRadius = BALL_RADIUS + 60; // Generous hitbox 
    if (Math.hypot(clickX - cx, clickY - cy) > physicalClickRadius) return;
    
    if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
    if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current);

    if (stateRef.current === "SIGNAL") {
      stateRef.current = "IDLE";
      isFlashingRef.current = false;

      if (targetColorRef.current === 'GO') {
        // HIT WHITE
        const currentLatency = Math.floor(performance.now() - startTimeRef.current);
        
        if (currentLatency > reactionLimit) return; // Failsafe for 250ms bound

        if (bestReactionRef.current === 0 || currentLatency < bestReactionRef.current) {
          bestReactionRef.current = currentLatency;
          setBestReaction(currentLatency);
        }

        setPerfectHits(prev => prev + 1);
        const incrementalStreak = streakRef.current + 1;
        streakRef.current = incrementalStreak;
        setStreak(incrementalStreak);
        if (incrementalStreak > bestStreakRef.current) { 
          bestStreakRef.current = incrementalStreak; 
          setBestStreak(incrementalStreak); 
        }

        updateEconomy(10, 3); // Reward: +10 PTS, +3s
        flashDurationRef.current = Math.max(8, flashDurationRef.current - 12); // God Level Shrink
        
        if (audioSynth) audioSynth.playDrillSound('success');
        triggerFeedback(`✓ HIT! +10 PTS | +3s (${currentLatency}ms)`, 'success');

      } else if (targetColorRef.current === 'NOGO') {
        // CLICKED RED (FALSE ALARM)
        streakRef.current = 0;
        setStreak(0);
        setFailedHits(prev => prev + 1);
        
        updateEconomy(0, -2); // No PTS Penalty, -2s
        flashDurationRef.current = Math.min(250, flashDurationRef.current + 15);

        if (audioSynth) audioSynth.playDrillSound('fail');
        triggerFeedback(`✗ FALSE ALARM! -2s`, 'error');
      }
      
      scheduleNextCycle();

    } else if (stateRef.current === "WAITING") {
      // CLICKED BEFORE SIGNAL (EARLY CLICK)
      stateRef.current = "IDLE";
      streakRef.current = 0;
      setStreak(0);
      setFailedHits(prev => prev + 1);
      
      updateEconomy(0, -2); // No PTS Penalty, -2s
      flashDurationRef.current = Math.min(250, flashDurationRef.current + 15);

      if (audioSynth) audioSynth.playDrillSound('fail');
      triggerFeedback(`✗ TOO EARLY! -2s`, 'error');
      
      scheduleNextCycle();
    }
  }, [isTimeUp, updateEconomy, triggerFeedback, scheduleNextCycle]);

  // === Flat 2D Render Loop ===
  useEffect(() => {
    if (engine.gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const scaleLayoutFrame = () => {
      const container = containerRef.current; if (!container) return;
      const rr = container.getBoundingClientRect();
      
      // Fully responsive fill-container scale (optimal for portrait & landscape)
      cvs.width = rr.width; 
      cvs.height = rr.height;
      cvs.style.position = 'absolute';
      cvs.style.left = `0px`;
      cvs.style.top = `0px`;
    };

    const trackingObserver = new ResizeObserver(scaleLayoutFrame);
    if (containerRef.current) trackingObserver.observe(containerRef.current);
    window.addEventListener('resize', scaleLayoutFrame);
    scaleLayoutFrame();

    const executionRenderingGraph = () => {
      if (!isActiveRef.current && gameStateRef.current !== 'playing') return;

      // Background Grid
      ctx.fillStyle = isBoxDarkMode ? "#050508" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      ctx.fillStyle = isBoxDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
      for (let w = 0; w < cvs.width; w += 40) ctx.fillRect(w, 0, 1, cvs.height);
      for (let h = 0; h < cvs.height; h += 40) ctx.fillRect(0, h, cvs.width, 1);

      const cx = cvs.width / 2;
      const cy = cvs.height / 2;

      // Draw Main Flat Circle
      ctx.beginPath();
      ctx.arc(cx, cy, BALL_RADIUS, 0, Math.PI * 2);
      
      if (stateRef.current === "SIGNAL" && isFlashingRef.current) {
        ctx.fillStyle = targetColorRef.current === 'GO' ? colorPalette.GO : colorPalette.NO_GO;
        ctx.shadowBlur = 30;
        ctx.shadowColor = ctx.fillStyle;
      } else {
        ctx.fillStyle = isBoxDarkMode ? "#151515" : "#e0e0e0";
        ctx.shadowBlur = 0;
      }
      ctx.fill(); 
      ctx.shadowBlur = 0;

      // Inner Detailing Ring
      ctx.beginPath(); 
      ctx.arc(cx, cy, BALL_RADIUS - 3, 0, Math.PI * 2);
      ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
      ctx.lineWidth = 1; 
      ctx.stroke();

      // Center Dot
      ctx.beginPath(); 
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = (stateRef.current === "SIGNAL" && isFlashingRef.current) ? "#000000" : (isBoxDarkMode ? "#333333" : "#999999");
      ctx.fill();

      animationRef.current = requestAnimationFrame(executionRenderingGraph);
    };

    animationRef.current = requestAnimationFrame(executionRenderingGraph);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', scaleLayoutFrame);
      trackingObserver.disconnect();
    };
  }, [engine.gameState, isBoxDarkMode, colorPalette.GO, colorPalette.NO_GO]);

  const handleStartGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    setIsTimeUp(false);
    setCustomScore(0);
    customScoreRef.current = 0;
    localTimeRef.current = 60;
    setLocalTimeRemaining(60);

    gameStateRef.current = 'playing';
    isActiveRef.current = true;

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (err) {}

    engine.startGame();
  }, [engine]);

  const totalStrikes = perfectHits + failedHits + inhibitedCount;
  const accuracy = totalStrikes > 0 ? Math.round(((perfectHits + inhibitedCount) / totalStrikes) * 100) : 0;

  const sharePage = async () => {
    const url = 'https://skilldrills.online/drills/visual/reaction-speed/go/no-go';
    if (navigator.share) {
      try { await navigator.share({ title: 'Chroma-Sync Drill', text: 'Train impulse control with this God-Level reaction drill!', url }); } catch (e) {}
    } else { try { await navigator.clipboard.writeText(url); alert('Link copied!'); } catch (e) {} }
  };

  const shareScore = useCallback(() => {
    const totalStrikes = perfectHits + failedHits + inhibitedCount;
    const finalAccuracy = totalStrikes > 0 ? Math.round(((perfectHits + inhibitedCount) / totalStrikes) * 100) : 0;
    
    let finalRank = 'Bronze';
    if (customScoreRef.current >= 200 && finalAccuracy >= 90) finalRank = 'Grandmaster';
    else if (customScoreRef.current >= 140 && finalAccuracy >= 82) finalRank = 'Master';
    else if (customScoreRef.current >= 90 && finalAccuracy >= 75) finalRank = 'Diamond';
    else if (customScoreRef.current >= 55 && finalAccuracy >= 65) finalRank = 'Platinum';
    else if (customScoreRef.current >= 25 && finalAccuracy >= 55) finalRank = 'Gold';
    else if (customScoreRef.current >= 10) finalRank = 'Silver';

    const text = `🎯 I scored ${customScoreRef.current} PTS with ${finalAccuracy}% accuracy on the Go/No-Go impulse control test! Rank: ${finalRank}. Try it here: https://skilldrills.online/drills/visual/reaction-speed/go/no-go`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'My SkillDrills Visual Score',
        text: text,
        url: 'https://skilldrills.online/drills/visual/reaction-speed/go/no-go'
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [perfectHits, failedHits, inhibitedCount]);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(34,197,94,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  let gradeLetter = 'F';
  if (accuracy >= 90 && customScore >= 150) gradeLetter = 'S';
  else if (accuracy >= 80 && customScore >= 100) gradeLetter = 'A';
  else if (accuracy >= 70 && customScore >= 60) gradeLetter = 'B';
  else if (accuracy >= 60 && customScore >= 35) gradeLetter = 'C';
  else if (accuracy >= 50 && customScore >= 15) gradeLetter = 'D';

  let rankName = 'Bronze';
  let rankColor = 'text-slate-500';
  if (customScore >= 200 && accuracy >= 90) {
    rankName = 'Grandmaster';
    rankColor = 'text-fuchsia-400 font-extrabold';
  } else if (customScore >= 140 && accuracy >= 82) {
    rankName = 'Master';
    rankColor = 'text-red-400 font-extrabold';
  } else if (customScore >= 90 && accuracy >= 75) {
    rankName = 'Diamond';
    rankColor = 'text-cyan-400 font-extrabold';
  } else if (customScore >= 55 && accuracy >= 65) {
    rankName = 'Platinum';
    rankColor = 'text-indigo-400 font-extrabold';
  } else if (customScore >= 25 && accuracy >= 55) {
    rankName = 'Gold';
    rankColor = 'text-yellow-400 font-extrabold';
  } else if (customScore >= 10) {
    rankName = 'Silver';
    rankColor = 'text-gray-300 font-extrabold';
  }

  let diagnostics = "Sensational impulse control! You perfectly inhibit response to distractors while retaining rapid reaction speeds.";
  if (failedHits > 6) {
    diagnostics = "High rate of false alarms or timeouts. Focus on wait-and-react stability, making sure to identify the color fully before initiating motor movement.";
  } else if (accuracy < 60) {
    diagnostics = "Impulsive errors detected. Slow down slightly to establish absolute accuracy, then rebuild speed.";
  } else if (customScore < 40) {
    diagnostics = "To raise scores, maintain high streaks of perfect hits and correct inhibits to keep the clock charged.";
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`} style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
              <li className="text-gray-600">/</li>
              <li><Link href="/drills/visual" className="text-gray-500 hover:text-gray-300 transition-colors">Visual Drills</Link></li>
              <li className="text-gray-600">/</li>
              <li className="text-green-400 font-medium" aria-current="page">Chroma-Sync Lab</li>
            </ol>
          </nav>
        )}

        {/* Header Layout */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Chroma-Sync Lab</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Response Inhibition • Endless Go/No-Go</p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0 flex-wrap">
              
              {engine.gameState === 'playing' && !isTimeUp && <button onClick={() => { if(engine.endGame) engine.endGame(); handleStartGame(); }} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-green-500' : 'bg-white border-gray-200 text-gray-700'}`} title="Reset"><RefreshCw className="w-5 h-5" /></button>}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-green-500' : 'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-green-500' : 'bg-white border-gray-200 text-gray-700'}`} title="Toggle inner canvas theme"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-green-500' : 'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-green-500' : 'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
            </div>
          </div>
        )}

        {showNameInput && (
          <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-900 shadow-xl animate-in fade-in slide-in-from-top-2">
            <input type="text" value={playerNameInput} onChange={e => { setPlayerNameInput(e.target.value); try { localStorage.setItem('skilldrills_player_name', e.target.value); } catch (err) {} }} placeholder="Enter display name" maxLength={20} className="w-full sm:w-64 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500 transition-colors" />
          </div>
        )}

        {/* Telemetry Matrix */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
            <StatCard icon={<Target className="text-green-400" />} value={customScore} label="Score" />
            <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={localTimeRemaining} label="Time" unit="s" />
            <StatCard icon={<Trophy className="text-yellow-400" />} value={engine.bestScore || 0} label="Best" />
            <StatCard icon={<Check className="text-blue-400" />} value={perfectHits} label="Hits" />
            <StatCard icon={<XCircle className="text-red-400" />} value={failedHits} label="Errors" />
            <StatCard icon={<Zap className="text-orange-400" />} value={streak} label="Streak" />
            <StatCard icon={<BarChart3 className="text-purple-400" />} value={accuracy} label="Accuracy" unit="%" />
          </div>
        )}

        {/* Feedback Node */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          <div className={`px-5 py-1.5 rounded-full font-black tracking-widest text-sm shadow-xl transition-all duration-200 ${localFeedback.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
            {localFeedback.text || '\u00A0'}
          </div>
        </div>

        {/* Core Canvas Frame Block */}
        <GameErrorBoundary>
          <div 
            ref={containerRef} 
            onPointerDown={handleInputStrikes}
            className={`relative overflow-hidden flex flex-col transition-all duration-100 z-10 ${
              isFullscreen 
                ? 'fixed inset-0 z-50 w-screen h-screen' 
                : 'w-full rounded-2xl border shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[600px] lg:min-h-[650px] md:aspect-video'
            }`} 
            style={{ 
              margin: '0 auto', 
              borderColor: isDarkMode ? '#374151' : '#e5e7eb',
              backgroundColor: isBoxDarkMode ? '#050811' : '#f9fafb',
              touchAction: 'none' 
            }}
          >
            
            {engine.gameState === 'playing' && !isTimeUp && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
                <div className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} />
              </div>
            )}

            {isFullscreen && engine.gameState === 'playing' && !isTimeUp && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={() => { if(engine.endGame) engine.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={() => setSoundEnabled(!soundEnabled)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
              </div>
            )}

            <canvas 
              ref={canvasRef} 
              className={`block absolute touch-none z-[10] pointer-events-none ${engine.gameState === 'playing' ? 'cursor-crosshair' : 'cursor-default'}`} 
            />

            {/* Clean Start Screen */}
            {engine.gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm p-4 overflow-y-auto pointer-events-auto">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full border border-gray-700 bg-gray-900 shadow-2xl flex flex-col my-auto shrink-0">
                  <div className="flex-1 mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                      <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black mb-2 tracking-tight text-white">Chroma-Sync Lab</h2>
                    <p className="text-sm text-gray-400 font-medium">Response Inhibition • Endless Go/No-Go</p>
                  </div>

                  <button onPointerDown={(e)=>e.stopPropagation()} onClick={handleStartGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(34,197,94,0.3)] focus:outline-none shrink-0">
                    <Target className="w-5 h-5 fill-white" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Premium End Display */}
            {(engine.gameState === 'ended' || isTimeUp) && (
              <div className="absolute inset-0 bg-[#05070e]/98 overflow-y-auto p-6 z-[70] select-none scrollbar-thin scroll-smooth backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto">
                <div className="min-h-full flex flex-col justify-center items-center py-4 w-full">
                  <div className="max-w-md w-full text-center">
                    {customScore > 0 && customScore >= (engine.bestScore || 0) && (
                      <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce font-mono">
                        ⭐ NEW PERSONAL BEST!
                      </div>
                    )}
                    
                    <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1 font-mono">
                      Drill Complete
                    </h2>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-mono">
                      Impulse Control Matrix
                    </p>

                    <div className="grid grid-cols-3 gap-2.5 mb-6 text-left font-mono">
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                        <span className="text-sm font-black text-white">{customScore} <span className="text-[8px] text-slate-400 font-normal">PTS</span></span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Accuracy</span>
                        <span className="text-sm font-black text-white">{accuracy}%</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Best Score</span>
                        <span className="text-sm font-black text-yellow-400">{engine.bestScore || 0}</span>
                      </div>
                      
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Perfect Hits</span>
                        <span className="text-sm font-black text-emerald-400">{perfectHits}</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Inhibited</span>
                        <span className="text-sm font-black text-blue-400">{inhibitedCount}</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold font-mono">Grade</span>
                        <span className="text-sm font-black text-pink-400 font-mono">{gradeLetter}</span>
                      </div>
                    </div>

                    <div className="bg-[#0b0f19] border border-slate-850 p-3 rounded-xl mb-4 text-left font-sans">
                      <span className={`text-xs font-black block text-center uppercase tracking-widest ${rankColor} mb-2`}>
                        Rank: {rankName}
                      </span>
                      <div className="w-full h-px bg-slate-850 mb-2"></div>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-white uppercase mb-1 font-mono">
                        <Sparkles className="w-3 h-3 text-amber-500" /> Diagnostics advice:
                      </div>
                      <p className="text-[10px] text-slate-400 leading-normal font-sans">
                        {diagnostics}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <PlayAgainButton
                        onClick={() => { if(engine.endGame) engine.endGame(); handleStartGame(); }}
                        colorTheme="green"
                      />
                      <button
                        onPointerDown={(e)=>e.stopPropagation()}
                        onClick={shareScore}
                        className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors active:scale-95 flex items-center justify-center"
                        title="Share Score"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      {isFullscreen && (
                        <button
                          onPointerDown={(e)=>e.stopPropagation()}
                          onClick={handleExitToStart}
                          className="p-3 bg-red-900/30 border border-red-900/55 hover:bg-red-900/50 text-red-400 rounded-xl transition-colors active:scale-95 flex items-center justify-center"
                          title="Exit Drill"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </GameErrorBoundary>

        {/* ========================================== */}
        {/* DRILL RULES / INSTRUCTIONS                 */}
        {/* ========================================== */}
        {!isFullscreen && (
          <section className="mt-10 pointer-events-none">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-green-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="gray" text="GO Command =" highlight="Click WHITE Sphere" result={`+10 PTS | +3s Clock`} />
                  <RuleItem num="2" color="blue" text="INHIBIT Command =" highlight="Ignore RED Sphere" result={`+1 PTS | +1s Clock`} />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="False Alarm (Click Red)" result="0 PTS | -2s Clock" />
                  <RuleItem num="4" color="orange" text="Miss / Early Click (>250ms)" result="0 PTS | -2s Clock" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================== */}
        {/* ABOUT, HOW TO PLAY & FAQ ACCORDIONS        */}
        {/* ========================================== */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-green-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About This Chroma-Sync Drill</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  Chroma-Sync Lab focuses strictly on the neurological pathways governing response inhibition and visual discrimination. By forcing quick motor responses based on color cues, it sharpens selective attention, eliminates trigger discipline issues, and builds cognitive resilience under pressure.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Esports professionals tracking multi-layered visual cues, tactical athletes building trigger discipline, and students optimizing attention shifting.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Visual processing speed, color classification accuracy, physical response mapping, and conflict resolution latency bounds.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net score indices, strike accuracy ratios, total perfect inputs, successfully inhibited actions, timeout failures, and maximum sequential streak levels.</p>
                  </div>
                </div>

                {/* How to Play Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play</h3>
                  </div>
                  <ol className="list-decimal pl-5 space-y-2 text-xs text-gray-400 leading-relaxed">
                    <li><strong className="text-gray-200">Prepare for Visuals:</strong> Keep your eyes tracking the center. This drill requires immediate interpretation of colors.</li>
                    <li><strong className="text-gray-200">Decode the Signal:</strong> The sphere turning WHITE dictates a strike. The sphere turning RED commands you to inhibit and ignore it.</li>
                    <li><strong className="text-gray-200">Execute the Selection:</strong> Tap or click anywhere on the screen the absolute millisecond you register the WHITE strobe.</li>
                    <li><strong className="text-gray-200">God Level Mechanics:</strong> To hit the White target, you must click within a strict 250ms reaction window. As you succeed, the flash duration shrinks from 250ms down to 8ms, pushing your perception limits.</li>
                  </ol>
                </div>

                {/* FAQ Accordion Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-green-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why does the target expiration window shrink?</h4>
                      <p className="text-xs text-gray-400 mt-1">This represents our God Level adaptive difficulty scaling. Building a streak demonstrates cognitive mastery over the current visual pacing, prompting the engine to trim the lifespan down from 250ms toward an intense 8ms window to push your limits.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">What constitutes a high-tier performance score?</h4>
                      <p className="text-xs text-gray-400 mt-1">Maintaining an accuracy ratio above 85% while driving scores past 120 points highlights excellent cognitive efficiency and low visual processing lag.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ========================================== */}
        {/* RELATED DRILLS                             */}
        {/* ========================================== */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related visual and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-green-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/visual/reaction-speed/light-reaction" title="Light Reaction" desc="Test visual reaction time with color changes." color="blue" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Raw input aim training for competitive FPS." color="green" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/reaction-speed/sound-reaction" title="Neuro-Switch Lab" desc="Auditory Go/No-Go impulse control." color="purple" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/tracking-accuracy/moving-target" title="Moving Target" desc="Track and click unpredictable moving spheres." color="orange" icon={<Activity className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Elite Neuro-Switch" desc="Click RED targets while ignoring BLUE distractors." color="red" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Divided Attention" desc="Focus on relevant information while ignoring distractions." color="cyan" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/math-speed/mental-math" title="Mental Math" desc="Advanced mental calculation speed tests." color="indigo" icon={<Calculator className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/writing-speed/typing-test" title="Code Typing" desc="Practice syntax speed with visual constraints." color="emerald" icon={<Code2 className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* ========================================== */}
        {/* FOOTER                                     */}
        {/* ========================================== */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-green-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-green-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-green-450 hover:text-green-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-green-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-green-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-green-450 hover:text-green-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-green-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-green-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-green-450 hover:text-green-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-green-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-green-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-green-450 hover:text-green-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-green-400 transition-colors">Visual (14)</Link></li>
                                        
                    <li><Link href="/drills/physical" className="hover:text-green-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500/25 to-teal-500/25 border border-green-500/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
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
    purple: 'bg-purple-600 text-purple-300 border-purple-500',
    gray: 'bg-gray-600 text-gray-300 border-gray-500',
    orange: 'bg-orange-600 text-orange-300 border-orange-500'
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
    indigo: 'from-indigo-500 to-blue-500',
    red: 'from-red-500 to-rose-500',
    gray: 'from-gray-500 to-slate-500',
    green: 'from-green-500 to-teal-500'
  };
  
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:-translate-y-1 hover:border-green-500/50">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-green-500 to-teal-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-green-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-green-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}