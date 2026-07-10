'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Eye, Zap, Timer, Trophy, Volume2, VolumeX, Sun, Moon, 
  Target, Activity, Maximize2, Minimize2, Check, Info, 
  RefreshCw, RotateCcw, Smartphone, GraduationCap, Lightbulb, 
  TrendingUp, BarChart3, CheckCircle2, Star, ArrowRight, Share2, 
  Copy, Brain, AlertTriangle, Play, Settings, MousePointer2,
  Users, Crosshair, Calculator, Code2, Layers, LogOut, Sparkles
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';
import PlayAgainButton from '../../../../../components/PlayAgainButton';

// ==========================================
// ERROR BOUNDARY
// ==========================================
class GameErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('Ghost-Link Error:', error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/95 rounded-xl z-50 border border-purple-500/30">
          <div className="text-center p-6 max-w-sm">
            <AlertTriangle className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-white text-lg font-bold mb-2">Memory Engine Desync</h3>
            <p className="text-gray-400 text-sm mb-4">The visual engine encountered a frame error. Let's reboot the runtime.</p>
            <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }} className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]">Restart Sequence</button>
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
export default function GhostLinkClient() {
  // === UI State ===
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  
  // === Drill Configurations ===
  const [drillDuration, setDrillDuration] = useState(60);
  const [ballSpeed, setBallSpeed] = useState(5);
  const [totalBalls, setTotalBalls] = useState(8);

  // === Game State (Synchronized with Refs for 60FPS loop) ===
  const [customScore, setCustomScore] = useState(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  const [phase, setPhase] = useState("MEMORIZE"); 
  const [accuracy, setAccuracy] = useState(100);

  // Sync Bridges (Solves tearing during re-renders)
  const [selectedBalls, setSelectedBalls] = useState([]);
  const selectedBallsRef = useRef([]);
  const handleSetSelectedBalls = useCallback((val) => {
    const newVal = typeof val === 'function' ? val(selectedBallsRef.current) : val;
    selectedBallsRef.current = newVal;
    setSelectedBalls(newVal);
  }, []);

  const [showResults, setShowResults] = useState(false);
  const showResultsRef = useRef(false);
  const handleSetShowResults = useCallback((val) => {
    showResultsRef.current = val;
    setShowResults(val);
  }, []);

  const [correctCount, setCorrectCount] = useState(0);
  const correctCountRef = useRef(0);
  const handleSetCorrectCount = useCallback((val) => {
    correctCountRef.current = val;
    setCorrectCount(val);
  }, []);

  // === Standard Refs ===
  const customScoreRef = useRef(0);
  const localTimeRef = useRef(60);

  const ballsRef = useRef([]);
  const targetIndicesRef = useRef([]);
  const phaseRef = useRef("MEMORIZE");
  const memorizeTimerRef = useRef(2.0);
  
  const timerIntervalRef = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const isActiveRef = useRef(false);
  const hasInitializedRoundRef = useRef(false);
  const audioCtxRef = useRef(null);
  const currentSoundRef = useRef(null);

  // Updated Rules Constants
  const TARGET_COUNT = 3;
  const HIT_POINTS = 20;
  const MISS_PENALTY = 0;

  // === Base Engine Hook ===
  const engine = useGameEngine({
    category: 'visual',
    drillId: 'ghost-link',
    drillName: 'Ghost-Link Tracking',
    totalGameTime: 9999,
    lives: 9999,
    infiniteLives: true,
    sharePath: 'drills/visual/tracking-accuracy/multiple-targets',
  });

  const gameStateRef = useRef(engine.gameState);
  const engineRef = useRef(engine);
  const soundEnabledRef = useRef(soundEnabled);
  
  useEffect(() => { gameStateRef.current = engine.gameState; }, [engine.gameState]);
  useEffect(() => { engineRef.current = engine; }, [engine]);
  useEffect(() => { soundEnabledRef.current = soundEnabled; }, [soundEnabled]);

  useEffect(() => { 
    setIsClient(true); 
    const timer = setTimeout(() => setLoading(false), 100); 
    return () => clearTimeout(timer);
  }, []);

  // === Zero-Latency Synthesis Audio ===
  const initAudio = useCallback(() => { 
    try { 
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); 
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); 
      return audioCtxRef.current; 
    } catch (e) { return null; } 
  }, []);

  useEffect(() => { return () => { if (audioCtxRef.current) { audioCtxRef.current.close().catch(() => {}); audioCtxRef.current = null; } }; }, []);

  const playDrillSound = useCallback((profile) => { 
    if (!soundEnabledRef.current) return; 
    try { 
      if (currentSoundRef.current) { try { currentSoundRef.current.stop(); } catch(e){} }
      const ctx = initAudio(); if (!ctx) return; 
      
      const osc = ctx.createOscillator(); 
      const gainNode = ctx.createGain(); 
      osc.connect(gainNode); 
      gainNode.connect(ctx.destination); 
      
      const now = ctx.currentTime; 
      if (profile === 'select') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(880, now);
        gainNode.gain.setValueAtTime(0.1, now); gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      } else if (profile === 'deselect') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(440, now);
        gainNode.gain.setValueAtTime(0.1, now); gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      } else if (profile === 'memorize') {
        osc.type = 'triangle'; osc.frequency.setValueAtTime(660, now);
        gainNode.gain.setValueAtTime(0.1, now); gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      } else if (profile === 'bonus') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(1046.5, now);
        gainNode.gain.setValueAtTime(0.15, now); gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      } else if (profile === 'fail') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, now);
        gainNode.gain.setValueAtTime(0.1, now); gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      }
      osc.start(now); osc.stop(now + 0.4);
      currentSoundRef.current = osc;
    } catch (e) {} 
  }, [initAudio]);

  const setPhaseState = useCallback((newPhase) => {
    phaseRef.current = newPhase;
    setPhase(newPhase);
  }, []);

  const triggerIdentificationPhase = useCallback(() => {
    setPhaseState("IDENTIFY");
    isActiveRef.current = false;
    playDrillSound('select');
  }, [playDrillSound, setPhaseState]);

  // === Custom Clock Loop ===
  useEffect(() => {
    if (engine.gameState !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }
    
    timerIntervalRef.current = setInterval(() => {
      if (phaseRef.current === "TRACKING") {
        setLocalTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            triggerIdentificationPhase();
            localTimeRef.current = 0;
            return 0;
          }
          localTimeRef.current = prev - 1; 
          return prev - 1;
        });
      }
    }, 1000);
    
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [engine.gameState, triggerIdentificationPhase]);

  // === Environment Guard ===
  useEffect(() => {
    const checkEnvironment = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMob = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua) || window.innerWidth < 768;

      if (isMob && window.innerHeight > window.innerWidth) {
        setShowRotateWarning(true);
      } else {
        setShowRotateWarning(false);
      }
    };
    checkEnvironment();
    window.addEventListener('resize', checkEnvironment);
    window.addEventListener('orientationchange', checkEnvironment);
    return () => { window.removeEventListener('resize', checkEnvironment); window.removeEventListener('orientationchange', checkEnvironment); };
  }, []);

  useEffect(() => { 
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', handleFsChange); 
    return () => document.removeEventListener('fullscreenchange', handleFsChange); 
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

  // === Core Drill Mechanics ===
  const initDrillVariables = useCallback((w, h) => {
    ballsRef.current = [];
    targetIndicesRef.current = [];
    handleSetSelectedBalls([]);
    handleSetShowResults(false);
    handleSetCorrectCount(0);
    
    setCustomScore(0);
    customScoreRef.current = 0;
    
    // Scale difficulty based on high score
    const bestSc = engineRef.current ? (engineRef.current.bestScore || 0) : 0;
    const dynamicBallsCount = Math.min(13, totalBalls + Math.floor(bestSc / 30));

    // Dynamic Size Optimization for Mobile Devices
    const currentRadius = w < 768 ? 12 : 22;

    const indices = [];
    while (indices.length < TARGET_COUNT) { 
      const idx = Math.floor(Math.random() * dynamicBallsCount); 
      if (!indices.includes(idx)) indices.push(idx); 
    }
    targetIndicesRef.current = indices;
    
    for (let i = 0; i < dynamicBallsCount; i++) { 
      const angle = Math.random() * Math.PI * 2; 
      ballsRef.current.push({ 
        x: currentRadius + Math.random() * (w - currentRadius * 2), 
        y: currentRadius + Math.random() * (h - currentRadius * 2), 
        r: currentRadius, 
        dx: Math.cos(angle), 
        dy: Math.sin(angle), 
        isTarget: targetIndicesRef.current.includes(i) 
      }); 
    }
    
    setPhaseState("MEMORIZE"); 
    memorizeTimerRef.current = 2.0;
    playDrillSound('memorize');
  }, [playDrillSound, totalBalls, setPhaseState, handleSetSelectedBalls, handleSetShowResults, handleSetCorrectCount]);

  const calculateResults = useCallback(() => {
    let cCount = 0;
    let errors = 0;
    
    selectedBallsRef.current.forEach(idx => {
      if (targetIndicesRef.current.includes(idx)) cCount++;
      else errors++;
    });

    const netScore = Math.max(0, (cCount * HIT_POINTS) - (errors * MISS_PENALTY));
    
    handleSetCorrectCount(cCount); 
    setCustomScore(netScore); 
    customScoreRef.current = netScore;
    setAccuracy(Math.round((cCount / TARGET_COUNT) * 100));
    handleSetShowResults(true);

    if (netScore > 0) playDrillSound('bonus');
    else playDrillSound('fail');

    if (engineRef.current) {
      if (typeof engineRef.current.setScore === 'function') {
        engineRef.current.setScore(netScore);
      }
      if (netScore > engineRef.current.bestScore) {
        try { localStorage.setItem('ghostLinkBestScore', netScore.toString()); } catch(e){}
      }
    }
    
    setTimeout(() => { 
      if (engineRef.current && typeof engineRef.current.endGame === 'function') engineRef.current.endGame(); 
    }, 2500);
  }, [playDrillSound, handleSetCorrectCount, handleSetShowResults]);

  // === Unified Input Pointer Handler ===
  const handleInputStrikes = useCallback((e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    if (gameStateRef.current !== 'playing' || phaseRef.current !== 'IDENTIFY' || showResultsRef.current) return;
    
    e.stopPropagation();

    const cvs = canvasRef.current;
    if (!cvs) return;
    
    const rect = cvs.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * (cvs.width / rect.width);
    const clickY = (e.clientY - rect.top) * (cvs.height / rect.height);

    const currentSelected = selectedBallsRef.current;

    // Check Confirm Button Click First
    if (currentSelected.length === TARGET_COUNT) {
      const bx = cvs.width / 2 - 80;
      const by = cvs.height - 80;
      if (clickX >= bx && clickX <= bx + 160 && clickY >= by && clickY <= by + 50) {
        calculateResults();
        return;
      }
    }

    // Check Ball Click (+20px padding prevents mobile fat-finger misses)
    ballsRef.current.forEach((b, i) => {
      if (Math.hypot(clickX - b.x, clickY - b.y) <= b.r + 20) {
        if (currentSelected.includes(i)) {
          handleSetSelectedBalls(prev => prev.filter(item => item !== i));
          playDrillSound('deselect');
        } else if (currentSelected.length < TARGET_COUNT) {
          handleSetSelectedBalls(prev => [...prev, i]);
          playDrillSound('select');
        }
      }
    });
  }, [calculateResults, playDrillSound, handleSetSelectedBalls]);

  // === Native Structural Render & Physics Loop ===
  useEffect(() => {
    if (engine.gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');
    let lastTime = performance.now();

    const scaleLayoutFrame = () => {
      const container = containerRef.current; if (!container) return;
      
      const w = container.clientWidth;
      const h = container.clientHeight;
      
      cvs.width = w;
      cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;

      if (hasInitializedRoundRef.current && ballsRef.current.length > 0) {
        ballsRef.current.forEach(b => {
          if (b.x > w - b.r) b.x = w - b.r;
          if (b.x < b.r) b.x = b.r;
          if (b.y > h - b.r) b.y = h - b.r;
          if (b.y < b.r) b.y = b.r;
        });
      }

      if (!hasInitializedRoundRef.current) {
        initDrillVariables(w, h);
        hasInitializedRoundRef.current = true;
      }
    };

    const trackingObserver = new ResizeObserver(scaleLayoutFrame);
    if (containerRef.current) trackingObserver.observe(containerRef.current);
    window.addEventListener('resize', scaleLayoutFrame);
    scaleLayoutFrame();

    const executionRenderingGraph = (now) => {
      let dt = (now - lastTime) / 1000;
      if (dt > 0.05) dt = 0.05; // clamp
      lastTime = now;

      // --- TIMERS ---
      if (isActiveRef.current && phaseRef.current === "MEMORIZE") {
        memorizeTimerRef.current -= dt;
        if (memorizeTimerRef.current <= 0) {
          setPhaseState("TRACKING");
          playDrillSound('select');
        }
      }

      // --- PHYSICS (2D Elastic Collisions) ---
      if (isActiveRef.current && phaseRef.current === "TRACKING") {
        const balls = ballsRef.current;
        const w = cvs.width;
        const h = cvs.height;
        const bestSc = engineRef.current ? (engineRef.current.bestScore || 0) : 0;
        const dynamicSpeed = Math.min(13, ballSpeed + (bestSc / 30));
        const speedMultiplier = dynamicSpeed * 60 * dt; 

        // Move & Wall Bounce
        for (let i = 0; i < balls.length; i++) {
          let b = balls[i];
          b.x += b.dx * speedMultiplier;
          b.y += b.dy * speedMultiplier;

          if (b.x <= b.r) { b.x = b.r; b.dx *= -1; }
          else if (b.x >= w - b.r) { b.x = w - b.r; b.dx *= -1; }
          
          if (b.y <= b.r) { b.y = b.r; b.dy *= -1; }
          else if (b.y >= h - b.r) { b.y = h - b.r; b.dy *= -1; }
        }

        // Ball-to-Ball Elastic Collisions
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            let b1 = balls[i];
            let b2 = balls[j];
            
            let dx = b2.x - b1.x;
            let dy = b2.y - b1.y;
            let dist = Math.hypot(dx, dy);
            let minDist = b1.r + b2.r;

            if (dist < minDist) {
              if (dist === 0) { dx = 1; dist = 1; } // Safety against NaN coordinates
              let overlap = minDist - dist;
              let nx = dx / dist;
              let ny = dy / dist;
              
              b1.x -= nx * (overlap / 2);
              b1.y -= ny * (overlap / 2);
              b2.x += nx * (overlap / 2);
              b2.y += ny * (overlap / 2);

              let kx = b1.dx - b2.dx;
              let ky = b1.dy - b2.dy;
              let p = 2 * (nx * kx + ny * ky) / 2;
              
              b1.dx -= p * nx;
              b1.dy -= p * ny;
              b2.dx += p * nx;
              b2.dy += p * ny;
            }
          }
        }
      }

      // --- RENDER ---
      ctx.fillStyle = isBoxDarkMode ? "#050508" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      ctx.strokeStyle = isBoxDarkMode ? "rgba(168,85,247,0.03)" : "rgba(0,0,0,0.03)";
      ctx.lineWidth = 1;
      for (let w = 0; w < cvs.width; w += 50) { ctx.beginPath(); ctx.moveTo(w, 0); ctx.lineTo(w, cvs.height); ctx.stroke(); }
      for (let h = 0; h < cvs.height; h += 50) { ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(cvs.width, h); ctx.stroke(); }

      // Draw Balls
      ballsRef.current.forEach((b, i) => {
        const isSelected = selectedBallsRef.current.includes(i);
        
        ctx.beginPath(); 
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        
        if (phaseRef.current === "IDENTIFY") {
          if (showResultsRef.current) {
            ctx.fillStyle = b.isTarget ? "#00ff88" : (isBoxDarkMode ? "#1f1f2e" : "#e2e8f0");
            ctx.shadowBlur = b.isTarget ? 30 : 0;
            ctx.shadowColor = b.isTarget ? "#00ff88" : "transparent";
          } else {
            ctx.fillStyle = isSelected ? "#f97316" : (isBoxDarkMode ? "#334155" : "#cbd5e1");
            ctx.shadowBlur = isSelected ? 20 : 0;
            ctx.shadowColor = isSelected ? "#f97316" : "transparent";
          }
        } else if (phaseRef.current === "MEMORIZE") {
          ctx.fillStyle = b.isTarget ? "#00ff88" : (isBoxDarkMode ? "#1f1f2e" : "#e2e8f0");
          ctx.shadowBlur = b.isTarget ? 30 : 0;
          ctx.shadowColor = b.isTarget ? "#00ff88" : "transparent";
        } else {
          // TRACKING PHASE
          ctx.fillStyle = isBoxDarkMode ? "#e2e8f0" : "#334155";
          ctx.shadowBlur = 0;
        }
        
        ctx.fill(); ctx.shadowBlur = 0;
        
        ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Selection Checkmark
        if (phaseRef.current === "IDENTIFY" && !showResultsRef.current && isSelected) {
          ctx.font = "bold 16px Arial";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("✓", b.x, b.y + 1);
        }
      });

      // UI Overlays
      if (phaseRef.current === "IDENTIFY") {
        ctx.font = "bold 20px Arial";
        ctx.fillStyle = isBoxDarkMode ? "#ffffff" : "#000000";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        
        if (showResultsRef.current) {
          ctx.fillText(`Target Acquired: ${correctCountRef.current}/${TARGET_COUNT}`, cvs.width / 2, 30);
        } else {
          ctx.fillText(`Identify the Targets (${selectedBallsRef.current.length}/${TARGET_COUNT})`, cvs.width / 2, 30);
          
          if (selectedBallsRef.current.length === TARGET_COUNT) {
            const bx = cvs.width / 2 - 80;
            const by = cvs.height - 80;
            
            ctx.fillStyle = "#a855f7"; 
            ctx.shadowBlur = 20;
            ctx.shadowColor = "#a855f7";
            ctx.beginPath();
            ctx.roundRect(bx, by, 160, 50, 10);
            ctx.fill();
            ctx.shadowBlur = 0;
            
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 16px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("CONFIRM", cvs.width / 2, by + 25);
          }
        }
      }

      animationRef.current = requestAnimationFrame(executionRenderingGraph);
    };

    animationRef.current = requestAnimationFrame(executionRenderingGraph);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', scaleLayoutFrame);
      trackingObserver.disconnect();
    };
  }, [engine.gameState, isBoxDarkMode, ballSpeed, totalBalls, playDrillSound, initDrillVariables, setPhaseState]); 

  // === Absolute Initializing Trigger ===
  const handleStartGame = useCallback(async () => {
    initAudio();
    
    // Explicit sync-wipes fixes the Restart button not properly restarting the simulation
    setCustomScore(0);
    customScoreRef.current = 0;
    setLocalTimeRemaining(drillDuration);
    localTimeRef.current = drillDuration;

    gameStateRef.current = 'playing';
    isActiveRef.current = true;

    // Force exact variable initialization synchronously
    if (containerRef.current && canvasRef.current) {
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      initDrillVariables(w, h);
      hasInitializedRoundRef.current = true;
    }

    // Auto-Fullscreen Trigger
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (err) {}

    engine.startGame();
  }, [engine, initAudio, drillDuration, initDrillVariables]);

  const shareScore = useCallback(() => {
    let finalRank = 'Bronze';
    if (customScoreRef.current >= 60 && accuracy >= 90) finalRank = 'Grandmaster';
    else if (customScoreRef.current >= 60 && accuracy >= 82) finalRank = 'Master';
    else if (customScoreRef.current >= 40 && accuracy >= 75) finalRank = 'Diamond';
    else if (customScoreRef.current >= 40 && accuracy >= 65) finalRank = 'Platinum';
    else if (customScoreRef.current >= 20 && accuracy >= 55) finalRank = 'Gold';
    else if (customScoreRef.current >= 20) finalRank = 'Silver';

    const text = `🎯 I scored ${customScoreRef.current} PTS with ${accuracy}% accuracy on the Multiple Object Tracking test! Rank: ${finalRank}. Try it here: https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'My SkillDrills Visual Score',
        text: text,
        url: 'https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets'
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [accuracy]);

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

  let gradeLetter = 'F';
  if (accuracy >= 90 && customScore >= 60) gradeLetter = 'S';
  else if (accuracy >= 80 && customScore >= 60) gradeLetter = 'A';
  else if (accuracy >= 70 && customScore >= 40) gradeLetter = 'B';
  else if (accuracy >= 60 && customScore >= 40) gradeLetter = 'C';
  else if (accuracy >= 50 && customScore >= 20) gradeLetter = 'D';

  let rankName = 'Bronze';
  let rankColor = 'text-slate-500';
  if (customScore >= 60 && accuracy >= 90) {
    rankName = 'Grandmaster';
    rankColor = 'text-fuchsia-400 font-extrabold';
  } else if (customScore >= 60 && accuracy >= 82) {
    rankName = 'Master';
    rankColor = 'text-red-400 font-extrabold';
  } else if (customScore >= 40 && accuracy >= 75) {
    rankName = 'Diamond';
    rankColor = 'text-cyan-400 font-extrabold';
  } else if (customScore >= 40 && accuracy >= 65) {
    rankName = 'Platinum';
    rankColor = 'text-indigo-400 font-extrabold';
  } else if (customScore >= 20 && accuracy >= 55) {
    rankName = 'Gold';
    rankColor = 'text-yellow-400 font-extrabold';
  } else if (customScore >= 20) {
    rankName = 'Silver';
    rankColor = 'text-gray-300 font-extrabold';
  }

  let diagnostics = "Outstanding multiple object tracking capacity! Your visual attention spans smoothly across active vectors.";
  if (correctCount < 2) {
    diagnostics = "Low target identification accuracy. Anchor your gaze centrally and track target coordinates peripherally to avoid losing targets during collisions.";
  } else if (accuracy < 60) {
    diagnostics = "Low precision rates. Take your time during the identification phase to prevent false selections.";
  } else if (customScore < 40) {
    diagnostics = "Improve your score by tracking all 3 target indices successfully to earn the maximum 60-point bonus.";
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
              <li className="text-purple-400 font-medium" aria-current="page">Ghost-Link Lab</li>
            </ol>
          </nav>
        )}

        {/* Header Layout */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Ghost-Link Lab</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Multi-Object Tracking • Visual Working Memory</p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0 flex-wrap">
              {engine.gameState === 'playing' && <button onClick={() => { if(engine.endGame) engine.endGame(); handleStartGame(); }} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`} title="Reset"><RefreshCw className="w-5 h-5" /></button>}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`} title="Toggle inner canvas theme"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
            </div>
          </div>
        )}

        {/* Player Name Input */}
        {showNameInput && (
          <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-900 shadow-xl animate-in fade-in slide-in-from-top-2">
            <input type="text" value={playerNameInput} onChange={e => { setPlayerNameInput(e.target.value); try { localStorage.setItem('skilldrills_player_name', e.target.value); } catch (err) {} }} placeholder="Enter display name" maxLength={20} className="w-full sm:w-64 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
          </div>
        )}

        {/* Telemetry Matrix Grid Display */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-1.5 sm:gap-3 mb-4 h-auto py-1">
            <StatCard icon={<Target className="text-purple-400" />} value={customScore} label="Score" />
            <StatCard icon={<Timer className={localTimeRemaining <= 10 && phase === 'TRACKING' ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={phase === 'TRACKING' ? localTimeRemaining : '-'} label="Time" unit="s" />
            <StatCard icon={<Trophy className="text-yellow-400" />} value={engine.bestScore || (typeof window !== 'undefined' ? localStorage.getItem('ghostLinkBestScore') : 0) || 0} label="Best" />
            <StatCard icon={<Activity className="text-green-400" />} value={phase === 'IDENTIFY' ? 'WAIT' : phase} label="Phase" />
          </div>
        )}

        {/* Dynamic Controls BEFORE start */}
        {engine.gameState !== 'playing' && !isFullscreen && !showResults && (
          <div className="mb-6 p-5 rounded-xl border border-gray-800 bg-[#0c1224]/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2"><Timer className="w-4 h-4 text-purple-400"/> Tracking Duration</label>
                <span className="text-purple-400 font-mono text-xs font-bold">{drillDuration}s</span>
              </div>
              <input 
                type="range" min="15" max="60" step="15" 
                value={drillDuration} 
                onChange={(e) => setDrillDuration(parseInt(e.target.value))} 
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500" 
              />
            </div>
            
            <div className="w-full border-t border-gray-800 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2"><Zap className="w-4 h-4 text-pink-400"/> Ball Velocity</label>
                <span className="text-pink-400 font-mono text-xs font-bold">LVL {ballSpeed}</span>
              </div>
              <input 
                type="range" min="2" max="12" step="1" 
                value={ballSpeed} 
                onChange={(e) => setBallSpeed(parseInt(e.target.value))} 
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500" 
              />
            </div>

            <div className="w-full border-t border-gray-800 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2"><Layers className="w-4 h-4 text-cyan-400"/> Total Balls</label>
                <span className="text-cyan-400 font-mono text-xs font-bold">{totalBalls}</span>
              </div>
              <input 
                type="range" min="4" max="10" step="1" 
                value={totalBalls} 
                onChange={(e) => setTotalBalls(parseInt(e.target.value))} 
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
              />
            </div>
          </div>
        )}

        {/* Core Canvas Frame Block */}
        <GameErrorBoundary>
          <div 
            ref={containerRef} 
            onPointerDown={handleInputStrikes}
            className={`relative overflow-hidden flex flex-col transition-all duration-100 z-10 ${
              isFullscreen 
                ? 'fixed inset-0 z-50 w-screen h-screen rounded-none' 
                : 'w-full rounded-2xl border shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[600px] lg:min-h-[650px]'
            }`} 
            style={{ 
              margin: '0 auto', 
              borderColor: isDarkMode ? '#374151' : '#e5e7eb',
              backgroundColor: isBoxDarkMode ? '#050811' : '#f9fafb',
              touchAction: 'none'
            }}
          >
            {/* Countdown Strip */}
            {engine.gameState === 'playing' && phase === 'TRACKING' && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
                <div className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`} style={{ width: `${Math.min(100, (localTimeRemaining / drillDuration) * 100)}%` }} />
              </div>
            )}

            {/* Mobile Orientation Safeguard */}
            {showRotateWarning && engine.gameState !== 'playing' && (
              <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 backdrop-blur-sm pointer-events-auto">
                <div className="animate-bounce mb-6 text-purple-500">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Rotate Device</h3>
                <p className="text-sm text-gray-400 max-w-xs mx-auto">Please flip your device to landscape mode to align the horizontal sensory field.</p>
              </div>
            )}

            {/* Fullscreen HUD Elements */}
            {isFullscreen && engine.gameState === 'playing' && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={() => { if(engine.endGame) engine.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={() => setSoundEnabled(!soundEnabled)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
              </div>
            )}

            <canvas 
              ref={canvasRef} 
              className={`block absolute touch-none pointer-events-none z-[10]`} 
            />

            {/* Clean Mobile-Optimized Start Screen */}
            {engine.gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm p-4 overflow-y-auto pointer-events-auto">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full border border-gray-700 bg-gray-900 shadow-2xl flex flex-col my-auto shrink-0">
                  <div className="flex-1 mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                      <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black mb-2 tracking-tight text-white">Ghost-Link Lab</h2>
                  </div>

                  <button onPointerDown={(e)=>e.stopPropagation()} onClick={handleStartGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(168,85,247,0.3)] focus:outline-none shrink-0">
                    <Play className="w-5 h-5 fill-white" />
                    START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Premium Custom Structural End Card Component */}
            {engine.gameState === 'ended' && (
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
                      Ghost-Link Lab
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
                        <span className="text-sm font-black text-purple-400">{engine.bestScore || 0}</span>
                      </div>
                      
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Correct Links</span>
                        <span className="text-sm font-black text-emerald-400">{correctCount}</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Errors</span>
                        <span className="text-sm font-black text-red-400">{TARGET_COUNT - correctCount}</span>
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
                        colorTheme="purple"
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
                <Info className="w-5 h-5 text-purple-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="purple" text="Accurate Identification" highlight="Correct Target Selection" result={`+20 PTS per target`} />
                  <RuleItem num="2" color="cyan" text="Dynamic Adjustments" highlight="Ball Count & Speed" result="Personalized Difficulty" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="False Identification" highlight="Clicking wrong ball" result="0 PTS penalty" />
                  <RuleItem num="4" color="blue" text="True 2D Collisions" highlight="Physics Deflections" result="Extreme Unpredictability" />
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
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About This Ghost-Link Drill</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  Ghost-Link Lab focuses on Multiple Object Tracking (MOT) and Visual Working Memory. This paradigm forces the brain to isolate, store, and continuously update the spatial coordinates of multiple identical moving objects in real-time, even through chaotic and unpredictable collisions.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Target Audience</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Team-based Esports players (MOBA, Hero Shooters), tactical athletes, and individuals looking to enhance divided peripheral attention and situational awareness.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Divided visual attention, working memory capacity, spatial tracking resolution, and motion prediction through intersecting visual clutter.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Performance Metrics</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Total net scores (+20 points per hit), overall identification accuracy percentage, and peak progression through advanced speed and quantity configurations.</p>
                  </div>
                </div>

                {/* How to Play Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play</h3>
                  </div>
                  <ol className="list-decimal pl-5 space-y-2 text-xs text-gray-400 leading-relaxed">
                    <li><strong className="text-gray-200">Memorize:</strong> Upon starting, 3 balls will illuminate bright green. You have exactly 2 seconds to burn their initial positions into your visual working memory.</li>
                    <li><strong className="text-gray-200">Track Visually:</strong> The balls will camouflage (turn white) and begin bouncing off walls and each other. Do not click. Follow your 3 specific targets with your eyes.</li>
                    <li><strong className="text-gray-200">Identify:</strong> When the tracking timer hits zero, all movement ceases. Tap or click exactly 3 balls that you believe are the original targets.</li>
                    <li><strong className="text-gray-200">Confirm:</strong> Press the large purple CONFIRM button to execute your choices and receive your score evaluation.</li>
                  </ol>
                </div>

                {/* FAQ Accordion Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Can my score drop below zero?</h4>
                      <p className="text-xs text-gray-400 mt-1">No. The internal engine strictly enforces a minimum score bound of 0 PTS. Incorrect selections do not reduce your score; they simply result in 0 points for that pick.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">How do the collisions work?</h4>
                      <p className="text-xs text-gray-400 mt-1">The engine runs a custom 2D elastic collision mathematical loop. The balls perfectly exchange momentum vectors upon impact, causing unpredictable directional splits that force you to rely on true visual tracking rather than simple linear prediction.</p>
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
              <div className="w-1 h-5 rounded-full bg-purple-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/visual/tracking-accuracy/moving-target" title="Kinetic Intercept" desc="Track and click unpredictable moving spheres." color="orange" icon={<MousePointer2 className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/reaction-speed/sound-reaction" title="Neuro-Switch Lab" desc="Auditory Go/No-Go impulse control." color="purple" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Elite Neuro-Switch" desc="Click RED targets while ignoring BLUE distractors." color="red" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Divided Attention" desc="Focus on relevant information while ignoring distractions." color="cyan" icon={<Eye className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-purple-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-purple-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-purple-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-purple-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Memory Drills →</Link></li>
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
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-purple-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-purple-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-purple-400 transition-colors">Visual (14)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-purple-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500/25 to-pink-500/25 border border-purple-500/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-purple-400" />
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
    green: 'bg-green-600 text-green-300 border-green-500',
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
    green: 'from-green-500 to-emerald-500',
    yellow: 'from-yellow-500 to-orange-500'
  };
  
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:-translate-y-1 hover:border-purple-500/50">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-purple-500 to-pink-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
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