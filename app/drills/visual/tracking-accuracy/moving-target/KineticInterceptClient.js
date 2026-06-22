'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Clock, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Move, Brain, Trophy, Info, Share2,
  GraduationCap, Lightbulb, TrendingUp, BarChart3, ArrowRight,
  RefreshCw, RotateCcw, Smartphone, Award, XCircle, Check,
  AlertTriangle, Crosshair, Calculator, Code2, Users, Layers, LogOut
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';

// ==========================================
// ERROR BOUNDARY
// ==========================================
class GameErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('Kinetic Intercept Error:', error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/95 rounded-xl z-50 border border-orange-500/30">
          <div className="text-center p-6 max-w-sm">
            <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-white text-lg font-bold mb-2">System Re-calibration Required</h3>
            <p className="text-gray-400 text-sm mb-4">The visual engine encountered a frame error. Let's restart the runtime sync.</p>
            <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }} className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(234,88,12,0.4)]">Reset Frame</button>
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
export default function KineticInterceptClient() {
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

  // === Economy & Custom Precision Clock ===
  const [customScore, setCustomScore] = useState(0);
  const customScoreRef = useRef(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  const localTimeRef = useRef(60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const timerIntervalRef = useRef(null);

  // === Metrics & Mechanics ===
  const [perfectHits, setPerfectHits] = useState(0);
  const [failedHits, setFailedHits] = useState(0); 
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  
  // Smaller Target radius for precision
  const TARGET_RADIUS = 20; 
  const targetRef = useRef({ x: -100, y: -100, vx: 0, vy: 0, active: false });
  
  const spawnTimeoutRef = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const isActiveRef = useRef(false);
  const hasInitializedRoundRef = useRef(false);
  const audioCtxRef = useRef(null);
  const currentSoundRef = useRef(null);

  // === Base decoupling engine hook ===
  const engine = useGameEngine({
    category: 'visual',
    drillId: 'kinetic-intercept',
    drillName: 'Kinetic Intercept',
    totalGameTime: 9999, // Overridden by local strict economy clock
    lives: 9999,
    infiniteLives: true,
    sharePath: 'drills/visual/tracking-accuracy/kinetic-intercept',
  });

  const gameStateRef = useRef(engine.gameState);
  const showFeedbackRef = useRef(engine.showFeedback);
  const engineRef = useRef(engine);
  const soundEnabledRef = useRef(soundEnabled);
  
  // === Sync Refs ===
  useEffect(() => { gameStateRef.current = engine.gameState; }, [engine.gameState]);
  useEffect(() => { showFeedbackRef.current = engine.showFeedback; }, [engine.showFeedback]);
  useEffect(() => { engineRef.current = engine; }, [engine]);
  useEffect(() => { soundEnabledRef.current = soundEnabled; }, [soundEnabled]);
  useEffect(() => { customScoreRef.current = customScore; }, [customScore]);

  // === Mount Logic ===
  useEffect(() => { 
    setIsClient(true); 
    const timer = setTimeout(() => setLoading(false), 100); 
    return () => clearTimeout(timer);
  }, []);

  // === Custom Clock Processing Loop ===
  useEffect(() => {
    if (engine.gameState !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
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

  // === Environment & Screen Orientation Guard ===
  useEffect(() => {
    const checkEnvironment = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMob = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua) || 
                   (navigator.maxTouchPoints > 0 && window.screen && Math.max(window.screen.width, window.screen.height) < 1024);

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
    try { const savedName = localStorage.getItem('skilldrills_player_name'); if (savedName) setPlayerNameInput(savedName); } catch (e) {}
  }, []);

  useEffect(() => { 
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', handleFsChange); 
    return () => document.removeEventListener('fullscreenchange', handleFsChange); 
  }, []);

  const cleanupAllTimers = useCallback(() => {
    if (spawnTimeoutRef.current) { clearTimeout(spawnTimeoutRef.current); spawnTimeoutRef.current = null; }
    if (animationRef.current) { cancelAnimationFrame(animationRef.current); animationRef.current = null; }
  }, []);

  // === Time & Score Economic Modifiers (Strict Caps Applied) ===
  const updateEconomy = useCallback((scoreDelta, timeDelta) => {
    setCustomScore(prev => {
      const updated = Math.max(0, prev + scoreDelta);
      customScoreRef.current = updated;
      return updated;
    });

    // Clamp strictly between 0 and 60 seconds
    localTimeRef.current = Math.min(60, Math.max(0, localTimeRef.current + timeDelta));
    setLocalTimeRemaining(localTimeRef.current);
    
    if (localTimeRef.current <= 0) {
      setIsTimeUp(true);
      if (typeof engineRef.current.endGame === 'function') engineRef.current.endGame();
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
      if (profile === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); 
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); 
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now); osc.stop(now + 0.2);
      } else if (profile === 'fail') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(130, now + 0.2);
        gainNode.gain.setValueAtTime(0.25, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now); osc.stop(now + 0.25);
      }
      currentSoundRef.current = osc;
    } catch (e) {} 
  }, [initAudio]);

  // === Core Drill Engine Sequencing ===
  const spawnTarget = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing' || isTimeUp) return;
    const cvs = canvasRef.current; if (!cvs) return;
    
    const side = Math.floor(Math.random() * 4);
    const margin = 50; 
    let spawnX, spawnY;

    if (side === 0) {
      spawnX = -margin;
      spawnY = Math.random() * cvs.height;
    } else if (side === 1) {
      spawnX = cvs.width + margin;
      spawnY = Math.random() * cvs.height;
    } else if (side === 2) {
      spawnX = Math.random() * cvs.width;
      spawnY = -margin;
    } else {
      spawnX = Math.random() * cvs.width;
      spawnY = cvs.height + margin;
    }

    const angleToCenter = Math.atan2((cvs.height / 2) - spawnY, (cvs.width / 2) - spawnX);
    const randomizedAngle = angleToCenter + (Math.random() - 0.5) * 1.0; 

    // Difficulty scaling: Speed increases with streak
    const calculatedSpeed = Math.min(30, 6 + (streakRef.current * 0.9) + (Math.random() * 3));
    
    targetRef.current = {
      x: spawnX,
      y: spawnY,
      vx: Math.cos(randomizedAngle) * calculatedSpeed,
      vy: Math.sin(randomizedAngle) * calculatedSpeed,
      active: true
    };

    setCurrentSpeed(Math.round(calculatedSpeed));

  }, [isTimeUp]);

  const triggerTargetMiss = useCallback(() => {
    if (!isActiveRef.current || isTimeUp) return;
    
    targetRef.current.active = false;
    streakRef.current = 0; // Dropping streak reduces speed (Decreases Difficulty)
    setStreak(0);
    setFailedHits(prev => prev + 1);
    
    updateEconomy(-3, -1);
    playDrillSound('fail');
    showFeedbackRef.current?.(`⏰ ESCAPED! -3 PTS | -1s`, 'error');

    spawnTimeoutRef.current = setTimeout(() => {
      if (isActiveRef.current && gameStateRef.current === 'playing' && !isTimeUp) spawnTarget();
    }, 400);
  }, [isTimeUp, updateEconomy, playDrillSound, spawnTarget]);

  // === Synchronized Processing Thread Matrix ===
  useEffect(() => {
    if (engine.gameState === 'playing' && !isTimeUp) {
      if (!hasInitializedRoundRef.current) {
        setPerfectHits(0);
        setFailedHits(0);
        setStreak(0);
        setBestStreak(0);
        setCustomScore(0);
        customScoreRef.current = 0;
        localTimeRef.current = 60;
        setLocalTimeRemaining(60);

        isActiveRef.current = true;
        streakRef.current = 0;
        bestStreakRef.current = 0;

        cleanupAllTimers();
        spawnTarget();
        hasInitializedRoundRef.current = true;
      }
    } else {
      hasInitializedRoundRef.current = false;
    }
  }, [engine.gameState, isTimeUp, spawnTarget, cleanupAllTimers]);

  useEffect(() => {
    if (engine.gameState === 'ended' || engine.gameState === 'start' || isTimeUp) {
      cleanupAllTimers();
      isActiveRef.current = false;
    }
  }, [engine.gameState, isTimeUp, cleanupAllTimers]);

  // === Unified Input Pointer Handler ===
  const handleInputStrikes = useCallback((e) => {
    // Ignore UI overlay clicks
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    if (gameStateRef.current !== 'playing' || !isActiveRef.current || isTimeUp) return;
    
    e.stopPropagation();

    const cvs = canvasRef.current;
    if (!cvs) return;
    
    const rect = cvs.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * (cvs.width / rect.width);
    const clickY = (e.clientY - rect.top) * (cvs.height / rect.height);

    // Padding allows mobile fat-fingers despite smaller orb
    const physicalClickRadius = TARGET_RADIUS + 30; 
    const distanceToTarget = Math.hypot(clickX - targetRef.current.x, clickY - targetRef.current.y);

    if (targetRef.current.active && distanceToTarget <= physicalClickRadius) {
      // SUCCESS HIT -> +5 PTS | +3s | Increase Difficulty
      targetRef.current.active = false;
      
      setPerfectHits(prev => prev + 1);
      const incrementalStreak = streakRef.current + 1;
      streakRef.current = incrementalStreak;
      setStreak(incrementalStreak);
      
      if (incrementalStreak > bestStreakRef.current) {
        bestStreakRef.current = incrementalStreak;
        setBestStreak(incrementalStreak);
      }

      updateEconomy(5, 3);
      playDrillSound('success');
      showFeedbackRef.current?.(`✓ INTERCEPT! +5 PTS | +3s`, 'success');

      if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
      spawnTimeoutRef.current = setTimeout(() => {
        if (isActiveRef.current && gameStateRef.current === 'playing') spawnTarget();
      }, 300);

    } else {
      // FALSE ALARM (Clicked canvas, missed target) -> -3 PTS | -1s | Decrease Difficulty
      streakRef.current = 0; // Resets speed mapping downward
      setStreak(0);
      setFailedHits(prev => prev + 1);
      
      updateEconomy(-3, -1);
      playDrillSound('fail');
      showFeedbackRef.current?.(`✗ MISS CLICK! -3 PTS | -1s`, 'error');
    }
  }, [isTimeUp, spawnTarget, updateEconomy, playDrillSound]);

  // === Native Structural Render Loops (3D Shading & Physics) ===
  useEffect(() => {
    if (engine.gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const scaleLayoutFrame = () => {
      const container = containerRef.current; if (!container) return;
      const rr = container.getBoundingClientRect();
      
      let w = rr.width, h = rr.height;
      const isMobileLandscape = window.innerWidth > window.innerHeight && window.innerWidth < 1024;
      
      // If not strictly fullscreen AND not mobile landscape, we apply the 16:9 constraint.
      // Otherwise, we allow it to take 100% of the bounds.
      if (!document.fullscreenElement && !isMobileLandscape) {
        h = w * (9 / 16);
        if (h > rr.height) { h = rr.height; w = h * (16 / 9); }
      }

      cvs.width = w; cvs.height = h;
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rr.width - w) / 2}px`;
      cvs.style.top = `${(rr.height - h) / 2}px`;
    };

    const trackingObserver = new ResizeObserver(scaleLayoutFrame);
    if (containerRef.current) trackingObserver.observe(containerRef.current);
    window.addEventListener('resize', scaleLayoutFrame);
    scaleLayoutFrame();

    const executionRenderingGraph = () => {
      if (!isActiveRef.current && gameStateRef.current !== 'playing') return;

      // Deep clean field matrix backgrounds
      ctx.fillStyle = isBoxDarkMode ? "#050508" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      ctx.fillStyle = isBoxDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
      for (let w = 0; w < cvs.width; w += 50) ctx.fillRect(w, 0, 1, cvs.height);
      for (let h = 0; h < cvs.height; h += 50) ctx.fillRect(0, h, cvs.width, 1);

      // Physics update logic inside render loop
      if (targetRef.current.active) {
        targetRef.current.x += targetRef.current.vx;
        targetRef.current.y += targetRef.current.vy;

        const tr = targetRef.current;
        // Check out of bounds (Escaped)
        if (
          (tr.x < -100 && tr.vx < 0) || 
          (tr.x > cvs.width + 100 && tr.vx > 0) ||
          (tr.y < -100 && tr.vy < 0) || 
          (tr.y > cvs.height + 100 && tr.vy > 0)
        ) {
          setTimeout(() => triggerTargetMiss(), 0);
        } else {
          // Render 3D Target Orb
          const tx = tr.x;
          const ty = tr.y;

          const gradient = ctx.createRadialGradient(tx - TARGET_RADIUS*0.3, ty - TARGET_RADIUS*0.3, TARGET_RADIUS*0.1, tx, ty, TARGET_RADIUS);
          gradient.addColorStop(0, '#ffffff'); // Bright core
          gradient.addColorStop(0.5, '#f97316'); // Orange edge
          gradient.addColorStop(1, '#ea580c'); // Deep orange rim

          ctx.beginPath();
          ctx.arc(tx, ty, TARGET_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          
          ctx.shadowColor = '#f97316';
          ctx.shadowBlur = 20;
          
          ctx.fill();

          // Pulse Core Indicator
          ctx.beginPath();
          ctx.arc(tx, ty, TARGET_RADIUS * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.8)';
          ctx.fill();

          ctx.shadowBlur = 0;
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
  }, [engine.gameState, isBoxDarkMode, triggerTargetMiss]);

  // === Absolute Initializing Trigger ===
  const handleStartGame = useCallback(async () => {
    initAudio();
    setIsTimeUp(false);
    setCustomScore(0);
    customScoreRef.current = 0;
    localTimeRef.current = 60;
    setLocalTimeRemaining(60);

    gameStateRef.current = 'playing';
    isActiveRef.current = true;

    // Secure Auto-Fullscreen trigger on Start or Play Again
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (err) {}

    engine.startGame();
  }, [engine, initAudio]);

  const totalStrikes = perfectHits + failedHits;
  const accuracy = totalStrikes > 0 ? Math.round((perfectHits / totalStrikes) * 100) : 0;

  const sharePage = async () => {
    const url = 'https://skilldrills.online/drills/visual/tracking-accuracy/kinetic-intercept';
    if (navigator.share) {
      try { await navigator.share({ title: 'Kinetic Intercept Drill', text: 'Train moving target tracking speed!', url }); } catch (e) {}
    } else { try { await navigator.clipboard.writeText(url); alert('Link copied!'); } catch (e) {} }
  };

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(249,115,22,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
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
              <li className="text-orange-400 font-medium" aria-current="page">Kinetic Intercept Lab</li>
            </ol>
          </nav>
        )}

        {/* Header Layout */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                <Move className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Kinetic Intercept Lab</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Moving Target Tracking • Kinetic Predictive Aim</p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0 flex-wrap">
              
              {engine.gameState === 'playing' && !isTimeUp && <button onClick={() => { if(engine.endGame) engine.endGame(); handleStartGame(); }} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`} title="Reset"><RefreshCw className="w-5 h-5" /></button>}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`} title="Toggle inner canvas theme"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className={`p-2.5 rounded-lg border transition-all active:scale-95 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
            </div>
          </div>
        )}

        {showNameInput && (
          <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-900 shadow-xl animate-in fade-in slide-in-from-top-2">
            <input type="text" value={playerNameInput} onChange={e => { setPlayerNameInput(e.target.value); try { localStorage.setItem('skilldrills_player_name', e.target.value); } catch (err) {} }} placeholder="Enter display name" maxLength={20} className="w-full sm:w-64 px-4 py-2.5 rounded-lg border border-gray-600 bg-black text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
          </div>
        )}

        {/* Telemetry Matrix Grid Display */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
            <StatCard icon={<Target className="text-orange-400" />} value={customScore} label="Score" />
            <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={localTimeRemaining} label="Time" unit="s" />
            <StatCard icon={<Trophy className="text-yellow-400" />} value={engine.bestScore} label="Best" />
            <StatCard icon={<Check className="text-green-400" />} value={perfectHits} label="Hits" />
            <StatCard icon={<XCircle className="text-red-400" />} value={failedHits} label="Miss/Error" />
            <StatCard icon={<Zap className="text-orange-400" />} value={streak} label="Streak" />
            <StatCard icon={<Move className="text-purple-400" />} value={currentSpeed} label="Max Spd" unit="v" />
          </div>
        )}

        {/* Contextual Strike Feedback Node */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          <div className={`px-5 py-1.5 rounded-full font-black tracking-widest text-sm shadow-xl transition-all duration-200 ${engine.feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${engine.feedbackType === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
            {engine.feedback || '\u00A0'}
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
                : 'w-full rounded-2xl border shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[600px] lg:min-h-[650px] aspect-video md:aspect-video'
            }`} 
            style={{ 
              margin: '0 auto', 
              borderColor: isDarkMode ? '#374151' : '#e5e7eb',
              backgroundColor: isBoxDarkMode ? '#050811' : '#f9fafb',
              touchAction: 'none'
            }}
          >
            
            {/* Countdown Strip */}
            {engine.gameState === 'playing' && !isTimeUp && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
                <div className={`h-full transition-all duration-1000 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`} style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} />
              </div>
            )}

            {/* Mobile Orientation Safeguard */}
            {showRotateWarning && engine.gameState !== 'playing' && (
              <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 backdrop-blur-sm pointer-events-auto">
                <div className="animate-bounce mb-6 text-orange-500">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Rotate Device</h3>
                <p className="text-sm text-gray-400 max-w-xs mx-auto">Please rotate your device to landscape mode for the optimal horizontal sensory tracking field.</p>
              </div>
            )}

            {/* Fullscreen HUD Elements */}
            {isFullscreen && engine.gameState === 'playing' && !isTimeUp && (
              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={() => { if(engine.endGame) engine.endGame(); handleStartGame(); }} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-5 h-5" /></button>
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={() => setSoundEnabled(!soundEnabled)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onPointerDown={(e)=>e.stopPropagation()} onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-5 h-5" /></button>
              </div>
            )}

            <canvas 
              ref={canvasRef} 
              className="block absolute touch-none pointer-events-none z-[10]" 
            />

            {/* Cleaned Mobile-Optimized Start Screen */}
            {engine.gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm p-4 overflow-y-auto pointer-events-auto">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full border border-gray-700 bg-gray-900 shadow-2xl flex flex-col my-auto shrink-0">
                  <div className="flex-1 mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                      <Move className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black mb-2 tracking-tight text-white">Kinetic Intercept</h2>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">Predictive target tracking. Click the orb before it escapes.</p>
                  </div>

                  <button onPointerDown={(e)=>e.stopPropagation()} onClick={handleStartGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none shadow-[0_0_20px_rgba(249,115,22,0.3)] focus:outline-none shrink-0">
                    <Target className="w-5 h-5 fill-white" />
                    START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* Premium Custom Structural End Card Component (Optimized for Mobile Visibility) */}
            {(engine.gameState === 'ended' || isTimeUp) && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 p-4 overflow-y-auto">
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[90vh] my-auto shrink-0">
                  
                  <div className="flex-1 overflow-y-auto">
                    <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 p-5 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        {customScore > (engine.bestScore || 0) && customScore > 0 && (
                          <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                            ⭐ New Personal Best
                          </div>
                        )}
                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                        <p className="text-orange-400 font-medium text-sm">Kinetic Intercept Lab</p>
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
                              className={`${accuracy >= 80 ? 'text-green-500' : accuracy >= 50 ? 'text-orange-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                              strokeWidth="3" strokeDasharray="100" strokeDashoffset={100 - accuracy} strokeLinecap="round" stroke="currentColor" fill="none" 
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-lg sm:text-xl font-black ${accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-orange-400' : 'text-red-400'}`}>{accuracy}%</span>
                            <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2">
                        <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                          <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Total Hits</div>
                          <div className="text-lg sm:text-xl font-black text-green-400">{perfectHits}</div>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                          <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Miss/Escape</div>
                          <div className="text-lg sm:text-xl font-black text-red-400">{failedHits}</div>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                          <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Max Streak</div>
                          <div className="text-lg sm:text-xl font-black text-orange-400">{bestStreak}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fixed Bottom Action Row */}
                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 shrink-0 rounded-b-3xl">
                    <button onPointerDown={(e)=>e.stopPropagation()} onClick={() => { if(engine.endGame) engine.endGame(); handleStartGame(); }} className="flex-1 py-3 sm:py-4 bg-orange-600 text-white rounded-xl font-black tracking-wide hover:bg-orange-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,88,12,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                    </button>
                    <button onPointerDown={(e)=>e.stopPropagation()} onClick={sharePage} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onPointerDown={(e)=>e.stopPropagation()} onClick={handleExitToStart} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
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
                <Info className="w-5 h-5 text-orange-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Intercept Target =" highlight="Tap/Click the moving Orb" result={`+5 PTS | +3s Clock`} />
                  <RuleItem num="2" color="orange" text="Velocity Scaling" highlight="Speed accelerates on hit" result="Adaptive Pacing System" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Target Escapes Off-Screen" result="-3 PTS | -1s Clock" />
                  <RuleItem num="4" color="purple" text="Missed Strike / Early Click" result="-3 PTS | -1s Clock" />
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
                <GraduationCap className="w-5 h-5 text-orange-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About This Kinetic Intercept Drill</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  Kinetic Intercept tests raw visual-motor pursuit and dynamic hand-eye coordination. It trains your ability to track moving objects across a horizontal plane and execute precise motor intercepts before the object escapes your field of view. The time-attack nature demands extreme visual processing speed and direct input fidelity.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center"><Target className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Target Audience</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Esports professionals focusing on tracking aim, ball-sports athletes tracking fast trajectory lines, and users seeking to optimize rapid visual attention shifting and precise cursor control.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center"><Activity className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Trained</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Moving target tracking, physical hand-eye mapping speed, visual pursuit latency, kinetic prediction and intercept reliability.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Performance Metrics</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Total hit volume, absolute accuracy index, kinetic escape failures, precision misclick data, and tracking velocity capacity.</p>
                  </div>
                </div>

                {/* How to Play Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play</h3>
                  </div>
                  <ol className="list-decimal pl-5 space-y-2 text-xs text-gray-400 leading-relaxed">
                    <li><strong className="text-gray-200">Track the Vector:</strong> A target orb will spawn dynamically from any edge and glide across the visual frame.</li>
                    <li><strong className="text-gray-200">Predict Trajectory:</strong> Determine the target's direct path and synchronize your physical input to intercept it.</li>
                    <li><strong className="text-gray-200">Instant Execution:</strong> Tap or click exactly on the orb before it vanishes off-screen.</li>
                    <li><strong className="text-gray-200">Manage Economy:</strong> Striking the target awards points and adds seconds to your timer. Missing the orb or letting it escape strips away points and precious seconds. Your maximum time limit is capped at a strict 60 seconds.</li>
                  </ol>
                </div>

                {/* FAQ Accordion Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-orange-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">How exactly does the velocity scale?</h4>
                      <p className="text-xs text-gray-400 mt-1">Velocity is dictated by an adaptive difficulty engine. For every consecutive target you successfully strike, your hit streak grows. As your streak compounds, the engine violently accelerates the speed of spawning targets until you miscalculate, which drops the difficulty back down.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why does my timer not exceed 60 seconds?</h4>
                      <p className="text-xs text-gray-400 mt-1">To ensure the integrity of the endurance pressure, the system institutes a hard 60-second cap. Perfect shots (+3s) cannot artificially inflate the clock forever; they simply keep you alive against the constant drain.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ========================================== */}
        {/* RELATED DRILLS (Strictly 4)                */}
        {/* ========================================== */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related visual and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-orange-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/visual/reaction-speed/light-reaction" title="Light Reaction" desc="Test pure visual reaction speed to color changes." color="blue" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Raw input aim training for competitive FPS mapping." color="green" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/tracking-accuracy/multiple-objects" title="Multi-Target Pursuit" desc="Track and engage multiple dynamic objects." color="orange" icon={<Layers className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/reaction-speed/go-no-go" title="Chroma-Sync Lab" desc="Response impulse inhibition and control." color="purple" icon={<Target className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-orange-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-orange-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-orange-450 hover:text-orange-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-orange-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-orange-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-orange-450 hover:text-orange-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-orange-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-orange-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-orange-450 hover:text-orange-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-orange-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-orange-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-orange-450 hover:text-orange-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-orange-400 transition-colors">Visual Drills (14)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-orange-400 transition-colors">Physical Drills (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500/25 to-red-500/25 border border-orange-500/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
                  Open-source telemetry training platform. Free forever. No downloads required.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {/* YouTube */}
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  {/* Facebook */}
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  {/* Twitter / X */}
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="X / Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  {/* Pinterest */}
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
    green: 'from-green-500 to-emerald-500'
  };
  
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,88,12,0.1)] hover:-translate-y-1 hover:border-orange-500/50">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-orange-500 to-red-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-orange-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-orange-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}