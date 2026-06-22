'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Clock, Award, Activity, Play, RefreshCw, 
  Volume2, VolumeX, Maximize2, Minimize2, Eye, EyeOff,
  Trophy, Info, Check, ArrowRight, Sparkles, Sliders, 
  HelpCircle, Compass, ShieldAlert, Zap, Share2, Copy, Brain
} from 'lucide-react';

export default function ReactiveStrafePursuitClient() {
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("Rotate Your Device");
  const hasBypassedWarningRef = useRef(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  // Viewport Orientation Check for Mobile
  useEffect(() => {
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      if (!isMobile) {
        setShowRotateWarning(false);
        return;
      }
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
        if (window.innerWidth < 768 && !hasBypassedWarningRef.current) {
          setShowRotateWarning(true);
          setWarningMessage("Rotate Your Device");
          return;
        }
      } else {
        if (window.innerHeight < 320 && !hasBypassedWarningRef.current) {
          setShowRotateWarning(true);
          setWarningMessage("Screen height too small. Try entering Fullscreen mode.");
          return;
        }
      }
      setShowRotateWarning(false);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    window.addEventListener('orientationchange', checkSize);
    return () => {
      window.removeEventListener('resize', checkSize);
      window.removeEventListener('orientationchange', checkSize);
    };
  }, []);

  // Mobile Landscape Full-Viewport Detection
  useEffect(() => {
    const checkLandscape = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      if (isMobile && window.innerWidth > window.innerHeight && window.innerWidth >= 480) {
        setIsMobileLandscape(true);
      } else {
        setIsMobileLandscape(false);
      }
    };
    checkLandscape();
    window.addEventListener('resize', checkLandscape);
    window.addEventListener('orientationchange', () => setTimeout(checkLandscape, 100));
    return () => {
      window.removeEventListener('resize', checkLandscape);
      window.removeEventListener('orientationchange', checkLandscape);
    };
  }, []);

  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // ============ USER SETTINGS STATES ============
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [targetSize, setTargetSize] = useState(15);
  const [targetColor, setTargetColor] = useState('#ef4444'); // Default Neon Red
  const [scanlinesActive, setScanlinesActive] = useState(true);
  const [trailEffect, setTrailEffect] = useState(true);
  const [glowEffect, setGlowEffect] = useState(true);

  // ============ GAME CONTROL STATES ============
  const [gameState, setGameState] = useState('start'); // start, playing, gameOver
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalTrials, setTotalTrials] = useState(0);

  // ============ REFS FOR HIGH PERFORMANCE CANVAS LOOP ============
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Tracking position states in refs to bypass React state latency
  const trackingState = useRef({
    lastTime: 0,
    px: 0,
    vx: 8,
    timer: 0,
    nextSwitch: 300,
    trail: [] as { x: number; y: number }[]
  });

  // Sync React states to ref for rendering loop reading
  const settingsRef = useRef({
    speedMultiplier,
    targetSize,
    targetColor,
    scanlinesActive,
    trailEffect,
    glowEffect
  });

  useEffect(() => {
    settingsRef.current = {
      speedMultiplier,
      targetSize,
      targetColor,
      scanlinesActive,
      trailEffect,
      glowEffect
    };
  }, [speedMultiplier, targetSize, targetColor, scanlinesActive, trailEffect, glowEffect]);

  // Audio cues initialization
  const initAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch (e) {
      return null;
    }
  }, []);

  const playSound = useCallback((type: 'start' | 'transition' | 'end') => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      
      const now = ctx.currentTime;
      if (type === 'start') {
        o.frequency.setValueAtTime(440, now);
        o.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        g.gain.setValueAtTime(0.08, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        o.start(now);
        o.stop(now + 0.2);
      } else if (type === 'transition') {
        o.frequency.setValueAtTime(587.33, now); // D5 note
        g.gain.setValueAtTime(0.04, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        o.start(now);
        o.stop(now + 0.1);
      } else if (type === 'end') {
        o.frequency.setValueAtTime(880, now);
        o.frequency.exponentialRampToValueAtTime(220, now + 0.3);
        g.gain.setValueAtTime(0.08, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        o.start(now);
        o.stop(now + 0.4);
      }
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  // Handle Fullscreen Toggle
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const el = containerRef.current;
        if (el?.requestFullscreen) {
          await el.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (e) {}
  }, [isFullscreen]);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Base client component mount
  useEffect(() => {
    setIsClient(true);
    setLoading(false);
    
    // Load best score/trials if needed
    try {
      const stored = localStorage.getItem('visualTrackingReactiveStrafePursuitClientTrialsCount');
      if (stored) setTotalTrials(parseInt(stored, 10));
    } catch (e) {}
  }, []);

  // Timer Interval Setup
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(p => {
          if (p <= 1) {
            setGameState('gameOver');
            playSound('end');
            setTotalTrials(prev => {
              const next = prev + 1;
              try {
                localStorage.setItem('visualTrackingReactiveStrafePursuitClientTrialsCount', next.toString());
              } catch (e) {}
              return next;
            });
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            return 0;
          }
          return p - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState, playSound]);

  // Main high-performance render loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    // Responsive Canvas Resize logic
    const updateSize = () => {
      const ct = containerRef.current;
      if (!ct) return;
      const rect = ct.getBoundingClientRect();
      
      // Keep exact 16:9 ratio fit
      const w = rect.width;
      const h = rect.height;
      
      cvs.width = w;
      cvs.height = h;
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rect.width - w) / 2}px`;
      cvs.style.top = `${(rect.height - h) / 2}px`;

      trackingState.current.px = w * 0.5;
      trackingState.current.vx = 8;
      trackingState.current.timer = 0;
      trackingState.current.nextSwitch = 300;
    };

    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateSize);
    updateSize();

    // Reset physics timing
    trackingState.current.lastTime = 0;

    // Render loop function
    const draw = (ts: number) => {
      if (!trackingState.current.lastTime) {
        trackingState.current.lastTime = ts;
      }
      let dt = (ts - trackingState.current.lastTime) / 1000;
      if (dt > 0.1) dt = 0.016;
      trackingState.current.lastTime = ts;

      const W = cvs.width;
      const H = cvs.height;
      const { speedMultiplier, targetSize, targetColor, scanlinesActive, trailEffect, glowEffect } = settingsRef.current;
      const scaledDt = dt * speedMultiplier;

      // Clear background
      ctx.fillStyle = '#05070f';
      ctx.fillRect(0, 0, W, H);

      // Render gridlines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let xPos = 0; xPos < W; xPos += gridSize) {
        ctx.beginPath(); ctx.moveTo(xPos, 0); ctx.lineTo(xPos, H); ctx.stroke();
      }
      for (let yPos = 0; yPos < H; yPos += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, yPos); ctx.lineTo(W, yPos); ctx.stroke();
      }

      // Randomize strafe timing
        trackingState.current.timer += scaledDt * 1000;
        if (trackingState.current.timer > trackingState.current.nextSwitch) {
          trackingState.current.vx = (Math.random() > 0.5 ? 1 : -1) * (7 + Math.random() * 5);
          trackingState.current.nextSwitch = 200 + Math.random() * 600;
          trackingState.current.timer = 0;
          playSound('transition');
        }

        trackingState.current.px += trackingState.current.vx * (scaledDt / 0.016);

        // Keep inside bounds
        const bounds = W * 0.3;
        if (trackingState.current.px < bounds) {
          trackingState.current.px = bounds;
          trackingState.current.vx = Math.abs(trackingState.current.vx);
          trackingState.current.timer = 0;
        } else if (trackingState.current.px > W - bounds) {
          trackingState.current.px = W - bounds;
          trackingState.current.vx = -Math.abs(trackingState.current.vx);
          trackingState.current.timer = 0;
        }

        // Draw boundaries
        ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bounds, H/2 - 20); ctx.lineTo(bounds, H/2 + 20);
        ctx.moveTo(W - bounds, H/2 - 20); ctx.lineTo(W - bounds, H/2 + 20);
        ctx.stroke();

        // Draw target
        ctx.shadowColor = targetColor;
        ctx.shadowBlur = glowEffect ? 18 : 0;
        ctx.fillStyle = targetColor;
        ctx.beginPath();
        ctx.arc(trackingState.current.px, H / 2, targetSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(trackingState.current.px, H / 2, 3, 0, Math.PI * 2);
        ctx.fill();

      // Visual overlay scanlines
      if (scanlinesActive) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.012)';
        for (let i = 0; i < H; i += 4) {
          ctx.fillRect(0, i, W, 1.5);
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
      ro.disconnect();
    };
  }, [gameState, playSound]);

  // Start visual tracking session
  const startDrill = useCallback(() => {
    initAudio();
    playSound('start');
    setGameState('playing');
    setTimeLeft(60);
    
    // Reset positions
    const cvs = canvasRef.current;
    const w = cvs ? cvs.width : window.innerWidth;
    const h = cvs ? cvs.height : window.innerHeight;
    
    // Default initializations
    trackingState.current.trail = [];
    
    // Auto-fullscreen on start
    try {
      if (!document.fullscreenElement) {
        const el = containerRef.current;
        if (el?.requestFullscreen) {
          el.requestFullscreen().then(() => {
            setIsFullscreen(true);
          }).catch((err) => {
            console.warn("Fullscreen request failed:", err);
          });
        }
      }
    } catch (err) {}

    trackingState.current.px = w * 0.5;
      trackingState.current.vx = 8;
      trackingState.current.timer = 0;
      trackingState.current.nextSwitch = 300;
  }, [initAudio, playSound]);

  // Reset drill configurations
  const resetDrill = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('start');
    setTimeLeft(60);
  }, []);

  const sharePage = useCallback(async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Free Reactive Strafe Pursuit Drill | SkillDrills',
          text: 'Stabilize horizontal gaze pursuit against erratic, human-like target strafes.',
          url: 'https://skilldrills.online/drills/visual-tracking/reactive-strafe-pursuit'
        });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://skilldrills.online/drills/visual-tracking/reactive-strafe-pursuit');
      alert('Link copied to clipboard!');
    }
  }, []);

  const copyPageLink = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://skilldrills.online/drills/visual-tracking/reactive-strafe-pursuit');
      alert('Link copied to clipboard!');
    }
  }, []);

  const colorPresets = [
    { name: 'Cyber Red', value: '#ef4444' },
    { name: 'Emerald Green', value: '#10b981' },
    { name: 'Neon Blue', value: '#3b82f6' },
    { name: 'Pure White', value: '#ffffff' },
    { name: 'Laser Orange', value: '#f97316' },
    { name: 'High-Vis Yellow', value: '#eab308' }
  ];

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Initialising Ocular aim engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-red-500/30">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-955/5 via-transparent to-black/30 pointer-events-none z-0" />

      <div className={`${isFullscreen || isMobileLandscape ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {/* Navigation Breadcrumbs */}
        {!isFullscreen && !isMobileLandscape && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-[10px] text-slate-550 uppercase tracking-widest font-mono">
              <li><Link href="/" className="hover:text-red-400 transition-colors">Home</Link></li>
              <li><span className="text-slate-755">/</span></li>
              <li><Link href="/drills" className="hover:text-red-400 transition-colors">Drills Hub</Link></li>
              <li><span className="text-slate-755">/</span></li>
              <li><Link href="/drills/visual-tracking" className="hover:text-red-400 transition-colors">Visual Tracking</Link></li>
              <li><span className="text-slate-755">/</span></li>
              <li><span className="text-red-400 font-bold">Reactive Strafe Pursuit</span></li>
            </ol>
          </nav>
        )}

        {/* Drill Header */}
        {!isFullscreen && !isMobileLandscape && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-red-950/30 border border-red-500/20 text-red-500 rounded-xl shadow-lg shadow-red-950/20">
                <Compass className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Reactive Strafe Pursuit
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5">
                  Visual Gaze Calibration � Advanced Sector
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button 
                  onClick={resetDrill}
                  className="p-2.5 rounded-lg border border-slate-800 bg-[#0b0f19] text-slate-400 hover:text-white hover:border-slate-700 transition-all active:scale-95"
                  title="Reset Drill"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2.5 rounded-lg border border-slate-800 bg-[#0b0f19] text-slate-400 hover:text-white hover:border-slate-700 transition-all active:scale-95"
                title="Toggle Audio Cues"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button 
                onClick={toggleFullscreen}
                className="p-2.5 rounded-lg border border-slate-800 bg-[#0b0f19] text-slate-400 hover:text-white hover:border-slate-700 transition-all active:scale-95"
                title="Toggle Viewport Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}



        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Settings Sidebar */}
          {!isFullscreen && !isMobileLandscape && (
            <div className="lg:col-span-1 bg-[#0b0f19]/80 border border-slate-900/90 rounded-2xl p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-850 pb-2 mb-4 flex items-center gap-1.5 font-mono">
                  <Sliders className="w-3.5 h-3.5 text-red-400" />
                  DRILL CONFIGS
                </h3>

                {/* Speed Multiplier */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Target Speed</label>
                    <span className="text-red-400 font-mono text-xs font-bold">{speedMultiplier.toFixed(1)}x</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="7.0" 
                    step="0.1"
                    value={speedMultiplier} 
                    onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))} 
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-red-500 focus:outline-none mb-3" 
                  />
                  <div className="grid grid-cols-6 gap-1">
                    {[0.5, 1.0, 2.0, 3.0, 5.0, 7.0].map((sm) => (
                      <button
                        key={sm}
                        onClick={() => setSpeedMultiplier(sm)}
                        className={`py-1 rounded text-[9px] font-mono font-bold border transition ${
                          speedMultiplier === sm
                            ? 'bg-red-950/40 text-red-400 border-red-500/40 shadow-sm shadow-red-500/5'
                            : 'bg-slate-950/60 border-slate-905 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {sm.toFixed(1)}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Size Slider */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Target Size</label>
                    <span className="text-red-400 font-mono text-xs font-bold">{targetSize}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="50" 
                    step="1"
                    value={targetSize} 
                    onChange={(e) => setTargetSize(parseInt(e.target.value, 10))} 
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-red-500 focus:outline-none" 
                  />
                  <div className="flex justify-between text-[8px] text-slate-600 font-mono mt-0.5">
                    <span>MIN</span>
                    <span>MAX</span>
                  </div>
                </div>

                {/* Presets Color */}
                <div className="mb-5">
                  <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono mb-2">Target Color</label>
                  <div className="flex flex-wrap gap-2">
                    {colorPresets.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setTargetColor(c.value)}
                        className={`w-6 h-6 rounded-full border transition-all relative flex items-center justify-center`}
                        style={{ backgroundColor: c.value === '#ffffff' ? '#ffffff' : c.value, borderColor: targetColor === c.value ? '#ffffff' : 'transparent' }}
                        title={c.name}
                      >
                        {targetColor === c.value && (
                          <div className={`w-1.5 h-1.5 rounded-full ${c.value === '#ffffff' ? 'bg-black' : 'bg-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Display Toggles */}
                <div className="space-y-3 pt-3 border-t border-slate-900/60 font-mono">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Gaze Trail</span>
                      <span className="text-[8px] text-slate-600 block">Renders tracking velocity</span>
                    </div>
                    <button
                      onClick={() => setTrailEffect(!trailEffect)}
                      className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${trailEffect ? 'bg-red-500' : 'bg-slate-900'}`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-200 ${trailEffect ? 'transform translate-x-4' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Neon Glow</span>
                      <span className="text-[8px] text-slate-600 block">Renders target glow blur</span>
                    </div>
                    <button
                      onClick={() => setGlowEffect(!glowEffect)}
                      className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${glowEffect ? 'bg-red-500' : 'bg-slate-900'}`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-200 ${glowEffect ? 'transform translate-x-4' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">CRT Scanlines</span>
                      <span className="text-[8px] text-slate-600 block">Esports screen overlay</span>
                    </div>
                    <button
                      onClick={() => setScanlinesActive(!scanlinesActive)}
                      className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${scanlinesActive ? 'bg-red-500' : 'bg-slate-900'}`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-200 ${scanlinesActive ? 'transform translate-x-4' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Card inside Sidebar */}
              <div className="mt-6 p-4 bg-slate-950/60 border border-slate-900 rounded-xl font-mono text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500 uppercase text-[9px]">Ocular Trials Count</span>
                  <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                </div>
                <div className="text-white font-black text-base">{totalTrials} Completed</div>
              </div>
            </div>
          )}

          {/* Viewport Canvas Wrapper */}
          <div className={`${isFullscreen ? 'col-span-4' : 'lg:col-span-3'} flex flex-col`}>
            
            {/* Viewport HUD */}
            {!isFullscreen && !isMobileLandscape && (
              <div className="flex justify-between items-center mb-3 text-xs font-mono">
                <div className="flex items-center gap-1 bg-[#0b0f19]/60 border border-slate-900 rounded-lg px-3 py-1.5">
                  <Activity className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-slate-400 uppercase text-[9px] tracking-wider">Status:</span>
                  <span className="text-white font-bold">{gameState === 'playing' ? 'CALIBRATING GAZE' : 'STANDBY'}</span>
                </div>

                <div className="flex items-center gap-1 bg-[#0b0f19]/60 border border-slate-900 rounded-lg px-3 py-1.5">
                  <Clock className="w-3.5 h-3.5 text-yellow-500" />
                  <span className="text-slate-400 uppercase text-[9px] tracking-wider">Session Time:</span>
                  <span className="text-white font-bold">{timeLeft}s</span>
                </div>
              </div>
            )}

            {/* Interactive Viewport Area */}
            <div 
              ref={containerRef} 
              className={
                isFullscreen 
                  ? 'fixed inset-0 z-50 bg-[#020306] flex items-center justify-center' 
                  : isMobileLandscape
                  ? 'fixed inset-0 z-40 bg-[#020306] flex items-center justify-center'
                  : 'relative w-full aspect-video min-h-[380px] lg:min-h-[440px] bg-[#020306] border border-slate-900 rounded-2xl flex items-center justify-center shadow-2xl'
              }
              style={{ overflow: 'hidden' }}
            >
              {/* Orientation Warnings (Inside Drill Box) */}
              {showRotateWarning && !isMobileLandscape && (
                <div className="absolute inset-0 z-50 bg-[#05070e]/95 flex flex-col items-center justify-center p-6 text-center select-none">
                  <div className="animate-bounce mb-4 text-red-500">
                    <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-widest mb-1.5">Rotate Your Device</h3>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-6 mx-auto">
                    Please rotate your mobile device to landscape orientation for a better training experience.
                  </p>
                  <div className="flex justify-center">
                    <button 
                      onClick={() => {
                        hasBypassedWarningRef.current = true;
                        setShowRotateWarning(false);
                        if (gameState === 'start') {
                          startDrill();
                        }
                      }}
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-mono text-[10px] uppercase tracking-wider rounded-lg flex items-center gap-2 transition active:scale-95 shadow-lg font-bold"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              
              {/* Start Overlay Screen */}
              {gameState === 'start' && (
                <div className="absolute inset-0 bg-[#05070e]/95 flex flex-col items-center justify-center p-6 z-30 select-none">
                  <div className="max-w-md text-center">
                    <div className="w-14 h-14 mx-auto mb-4 border border-red-500/25 bg-red-500/5 rounded-full flex items-center justify-center shadow-lg shadow-red-950/10">
                      <Eye className="w-6 h-6 text-red-500" />
                    </div>
                    
                    <h2 className="text-lg font-black text-white uppercase tracking-wider mb-2 font-mono">
                      Reactive Strafe Pursuit
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      Stabilize horizontal gaze pursuit against erratic, human-like target strafes. Focus your eyes on the moving target. Do not use your head or mouse.
                    </p>

                    <button
                      onClick={startDrill}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(59,130,246,0.5)] uppercase tracking-widest font-mono transition-all duration-300 active:scale-95 mx-auto"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      Initiate Tracking Trial
                    </button>
                  </div>
                </div>
              )}

              {/* Game Over Screen */}
              {gameState === 'gameOver' && (
                <div className="absolute inset-0 bg-[#05070e]/95 flex flex-col items-center justify-center p-6 z-30 select-none">
                  <div className="max-w-md text-center">
                    <div className="w-14 h-14 mx-auto mb-4 border border-green-500/20 bg-green-500/5 rounded-full flex items-center justify-center shadow-lg shadow-green-950/10">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    
                    <h2 className="text-lg font-black text-white uppercase tracking-wider mb-2 font-mono">
                      Gaze Calibration Complete
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      Your ocular muscles have successfully tracked the target across {speedMultiplier.toFixed(1)}x speed configuration. Gaze stabilization completed.
                    </p>

                    <button
                      onClick={startDrill}
                      className="px-6 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-100 font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest font-mono transition-all duration-200 active:scale-95 mx-auto"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      Run Another Trial
                    </button>
                  </div>
                </div>
              )}

              {/* Rendering Canvas */}
              {gameState === 'playing' && (
                <canvas ref={canvasRef} className="block" />
              )}
            </div>

            {/* Bottom status tip */}
            {!isFullscreen && !isMobileLandscape && (
              <div className="mt-3 text-center text-[10px] text-slate-550 flex items-center justify-center gap-2 font-mono">
                <Info className="w-3.5 h-3.5 text-slate-550" />
                <span>Drill is non-interactive. Keep your eyes centered on the target to condition foveal stability.</span>
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        {!isFullscreen && !isMobileLandscape && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-900 pt-8">
            <div className="md:col-span-2 bg-[#0b0f19]/40 border border-slate-900 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono flex items-center gap-2 mb-3.5">
                  <Activity className="w-4 h-4 text-red-500" />
                  ABOUT THIS DRILL: SPORTS-SCIENCE ANALYSIS
                </h3>
                <p className="text-xs leading-relaxed text-slate-400 mb-4 font-sans">
                  The Reactive Strafe Pursuit focuses on horizontal smooth pursuit under irregular direction swaps. By randomizing velocity speeds and strafe timings within a central window, the eye is trained to track human-like movements during long-range strafe tracking.
                </p>
              </div>
            </div>

            <div className="bg-[#0b0f19]/40 border border-slate-905 p-6 rounded-2xl">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono flex items-center gap-2 mb-3.5">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                TRAINING BENEFITS
              </h3>
              <ul className="space-y-3 text-xs text-slate-400 font-mono">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Strafe Tracking</strong>: Overclocks eye stability during horizontal target shifts.</span>
                </li>\n                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Vector Decoupling</strong>: Separates predictions from steady patterns.</span>
                </li>\n                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Refocus Latency</strong>: Minimizes re-targeting delay during target direction swaps.</span>
                </li>\n
              </ul>
            </div>
          </div>
        )}

        {/* Related Drills Section */}
        {!isFullscreen && !isMobileLandscape && (
          <section className="mt-8 border-t border-slate-900 pt-8" aria-label="Related training drills">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-red-500 to-orange-600"></div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest font-mono">Explore Related Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              <Link href="/drills/visual/tracking-accuracy/pursuit-tracker" className="group relative overflow-hidden rounded-xl border border-slate-900 bg-[#0b0f19]/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-950/20 border border-red-500/20 flex items-center justify-center">
                      <Target className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-505 uppercase tracking-widest">Visual</span>
                  </div>
                  <h3 className="font-bold text-xs text-white group-hover:text-red-400 transition-colors font-mono uppercase mb-1">Auto-Pursuit</h3>
                  <p className="text-[10px] leading-relaxed text-slate-405">Keep cursor on moving target with jitter. +1pt every 0.5s tracking.</p>
                  <div className="flex items-center gap-1 mt-3 text-red-500 text-[9px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Start Drill <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
              <Link href="/drills/visual/tracking-accuracy/moving-target" className="group relative overflow-hidden rounded-xl border border-slate-900 bg-[#0b0f19]/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-950/20 border border-red-500/20 flex items-center justify-center">
                      <Compass className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-505 uppercase tracking-widest">Visual</span>
                  </div>
                  <h3 className="font-bold text-xs text-white group-hover:text-red-400 transition-colors font-mono uppercase mb-1">Kinetic Intercept</h3>
                  <p className="text-[10px] leading-relaxed text-slate-405">Click fast-moving targets spawning from edges with green cursor feedback.</p>
                  <div className="flex items-center gap-1 mt-3 text-red-500 text-[9px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Start Drill <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
              <Link href="/drills/academic/reading-speed/rsvp-reader" className="group relative overflow-hidden rounded-xl border border-slate-900 bg-[#0b0f19]/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-950/20 border border-red-500/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-505 uppercase tracking-widest">Academic</span>
                  </div>
                  <h3 className="font-bold text-xs text-white group-hover:text-red-400 transition-colors font-mono uppercase mb-1">RSVP Speed Reader</h3>
                  <p className="text-[10px] leading-relaxed text-slate-405">Rapid Serial Visual Presentation with ORP alignment.</p>
                  <div className="flex items-center gap-1 mt-3 text-red-500 text-[9px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Start Drill <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
              <Link href="/drills/visual/tracking-accuracy/multiple-targets" className="group relative overflow-hidden rounded-xl border border-slate-900 bg-[#0b0f19]/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-950/20 border border-red-500/20 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-505 uppercase tracking-widest">Visual</span>
                  </div>
                  <h3 className="font-bold text-xs text-white group-hover:text-red-400 transition-colors font-mono uppercase mb-1">Ghost-Link Tracking</h3>
                  <p className="text-[10px] leading-relaxed text-slate-405">Memorize 2 targets among 11 moving balls then identify after 60s.</p>
                  <div className="flex items-center gap-1 mt-3 text-red-500 text-[9px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Start Drill <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Footer */}
        {!isFullscreen && !isMobileLandscape && (
          <footer className="mt-16 border-t border-slate-900 bg-[#05070e]/40 text-slate-550 rounded-2xl py-10 px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8 font-mono text-xs text-left">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Visual Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual/visual-recognition/difference-spotter" className="hover:text-red-400 transition-colors">Difference Spotter</Link></li>
                    <li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-red-400 transition-colors">Kinetic Intercept</Link></li>
                    <li><Link href="/drills/visual/tracking-accuracy/multiple-targets" className="hover:text-red-400 transition-colors">Ghost-Link Tracking</Link></li>
                    <li><Link href="/drills/visual" className="text-red-500 hover:text-red-400 transition-colors font-bold">All 14 Visual Drills ?</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-red-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-red-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory/spatial-memory/path-tracing" className="hover:text-red-400 transition-colors">Path Tracing</Link></li>
                    <li><Link href="/drills/memory" className="text-red-500 hover:text-red-400 transition-colors font-bold">All 15 Memory Drills ?</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-red-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps/reactive-sphere-tracking" className="hover:text-red-400 transition-colors">Reactive Tracking</Link></li>
                    <li><Link href="/drills/fps/target-acquisition" className="hover:text-red-400 transition-colors">Target Acquisition</Link></li>
                    <li><Link href="/drills/fps" className="text-red-500 hover:text-red-400 transition-colors font-bold">All 21 FPS Drills ?</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-red-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-red-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-red-500 hover:text-red-400 transition-colors font-bold">All 16 Cognitive Drills ?</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Drills</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic" className="hover:text-red-400 transition-colors">Academic (12 drills)</Link></li>
                    <li><Link href="/drills/cognitive" className="hover:text-red-400 transition-colors">Cognitive</Link></li>
                    
                    <li><Link href="/drills/physical" className="hover:text-red-400 transition-colors">Physical (11 drills)</Link></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-white font-bold text-lg font-mono tracking-widest">SkillDrills</span>
                </div>
                <p className="text-xs mb-2 font-mono">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[10px] max-w-2xl mx-auto leading-relaxed mb-6 font-sans text-slate-700">
                  Free online Reactive Strafe Pursuit drill for visual gaze tracking and foveal stability training. Train foveal pursuit and coordinate re-acquisition speeds under speed configurations. Perfect for gamers, athletes, and attention diagnostics. No registration required. More free drills at skilldrills.online.
                </p>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                  <button onClick={sharePage} className="text-slate-650 hover:text-white transition-colors" title="Share" aria-label="Share page link"><Share2 className="w-4 h-4" /></button>
                  <button onClick={copyPageLink} className="text-slate-650 hover:text-white transition-colors" title="Copy link" aria-label="Copy page link to clipboard"><Copy className="w-4 h-4" /></button>
        <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-slate-650 hover:text-white transition-colors" title="Follow on Facebook" aria-label="Follow SkillDrills on Facebook"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-slate-650 hover:text-white transition-colors" title="Follow on Twitter" aria-label="Follow SkillDrills on Twitter"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-slate-650 hover:text-white transition-colors" title="Follow on Instagram" aria-label="Follow SkillDrills on Instagram"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-slate-650 hover:text-white transition-colors" title="Follow on YouTube" aria-label="Follow SkillDrills on YouTube"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-slate-650 hover:text-white transition-colors" title="Follow on Pinterest" aria-label="Follow SkillDrills on Pinterest"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
