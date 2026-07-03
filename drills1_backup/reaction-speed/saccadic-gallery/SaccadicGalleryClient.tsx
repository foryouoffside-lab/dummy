'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Clock, Activity, Play, RefreshCw, 
  Volume2, VolumeX, Maximize2, Lock, Unlock,
  Trophy, Info, Sparkles, Sliders, 
  TrendingUp, RotateCcw, Share2, GraduationCap, Lightbulb, ChevronRight, Crosshair, ShieldAlert
} from 'lucide-react';

// Unified audio context synthesizer class (zero-latency)
class AudioSynthesizer {
  ctx: AudioContext | null = null;
  enabled = true;
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }
  setEnabled(status: boolean) {
    this.enabled = status;
  }
  playHitmarker() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch(e) {}
  }
  playNeutralized() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }
  playPenalty() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }
  playLevelUp() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch(e) {}
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

const getLevel = (s: number) => {
  if (s < 100) return 1;
  if (s < 250) return 2;
  if (s < 500) return 3;
  if (s < 800) return 4;
  if (s < 1200) return 5;
  return Math.floor((s - 1200) / 500) + 6;
};

export default function DynamicStrafeTracking() {
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hudLocked, setHudLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // HUD Game states
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [bestTrackingAcc, setBestTrackingAcc] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [maxCombo, setMaxCombo] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60.0);
  
  // Analytics
  const [finalAccuracy, setFinalAccuracy] = useState(0);
  const [targetsNeutralized, setTargetsNeutralized] = useState(0);
  const [targetsEvaded, setTargetsEvaded] = useState(0);
  
  // Custom Configs
  const [targetSize, setTargetSize] = useState(24);
  const [targetColor, setTargetColor] = useState('#38bdf8'); // Switched to a professional sky blue default
  const [trailEffect, setTrailEffect] = useState(true);
  const [glowEffect, setGlowEffect] = useState(true);
  const [scanlinesActive, setScanlinesActive] = useState(false); // Default off for cleaner look
  const [deviceScale, setDeviceScale] = useState(1.0);
  
  // Engine Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Physics High-Frequency Refs
  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const maxComboRef = useRef(0);
  const levelRef = useRef(1);
  const timeLeftRef = useRef(60.0);
  const survivalStartTimeRef = useRef(0);
  
  const statsRef = useRef({
    totalTrackingTime: 0,
    totalTimeFired: 0,
    targetsDestroyed: 0,
    targetsEscaped: 0
  });

  const pointerState = useRef({ x: 0, y: 0, isDown: false });
  
  const targetRef = useRef({
    x: 0, y: 0,
    vx: 0, vy: 0,
    health: 100,
    lifespan: 0,
    maxLifespan: 4.0,
    zigzagTimer: 0,
    lastHitmarker: 0,
    history: [] as {x: number, y: number}[]
  });
  
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { if (audioSynth) audioSynth.setEnabled(soundEnabled); }, [soundEnabled]);

  // Mobile Detection & Orientation
  useEffect(() => {
    const checkViewport = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || ('ontouchstart' in window);
      setIsMobileDevice(isMobile);
      
      const isPortrait = window.innerHeight > window.innerWidth;
      setShowRotateWarning(isMobile && isPortrait);
      setIsMobileLandscape(isMobile && !isPortrait);
      
      setDeviceScale(isMobile ? 0.85 : 1.15);
    };
    
    checkViewport();
    window.addEventListener('resize', checkViewport);
    window.addEventListener('orientationchange', () => setTimeout(checkViewport, 150));
    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('orientationchange', checkViewport);
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
    setLoading(false);
    try {
      const storedScore = localStorage.getItem('skilldrills_dynamic_strafe_best');
      const storedAcc = localStorage.getItem('skilldrills_dynamic_strafe_best_acc');
      if (storedScore) setBestScore(parseInt(storedScore, 10));
      if (storedAcc) setBestTrackingAcc(parseInt(storedAcc, 10));
    } catch (e) {}
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (e) {}
  }, [isFullscreen]);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && hudLocked) {
      window.history.pushState(null, '', window.location.href);
      const handlePopState = () => window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [gameState, hudLocked]);

  const spawnTarget = (W: number, H: number, currentLevel: number) => {
    const radiusMult = targetSize * deviceScale * Math.max(0.5, 1 - (currentLevel - 1) * 0.08);
    
    targetRef.current.x = radiusMult + Math.random() * (W - radiusMult * 2);
    targetRef.current.y = radiusMult + Math.random() * (H - radiusMult * 2);
    
    const speedMult = 1 + (currentLevel - 1) * 0.25;
    const baseSpeed = (isMobileDevice ? 220 : 350) * speedMult;
    
    targetRef.current.vx = (Math.random() > 0.5 ? 1 : -1) * baseSpeed;
    targetRef.current.vy = (Math.random() - 0.5) * baseSpeed * 0.4;
    
    targetRef.current.health = 100;
    targetRef.current.lifespan = 0;
    targetRef.current.maxLifespan = Math.max(1.8, 4.0 - (currentLevel - 1) * 0.3);
    targetRef.current.zigzagTimer = Math.max(0.3, 1.2 - (currentLevel - 1) * 0.15);
    targetRef.current.history = [];
  };

  const handleNeutralize = () => {
    statsRef.current.targetsDestroyed++;
    
    scoreRef.current += 10;
    setScore(scoreRef.current);
    
    comboRef.current += 1;
    if (comboRef.current > maxComboRef.current) {
      maxComboRef.current = comboRef.current;
      setMaxCombo(maxComboRef.current);
    }
    
    timeLeftRef.current = Math.min(60.0, timeLeftRef.current + 1.0);
    setTimeLeft(timeLeftRef.current);
    
    if (audioSynth) audioSynth.playNeutralized();
    
    const nextLvl = getLevel(scoreRef.current);
    if (nextLvl > levelRef.current) {
      levelRef.current = nextLvl;
      setLevel(nextLvl);
      if (audioSynth) audioSynth.playLevelUp();
    }
    
    if (canvasRef.current) {
      spawnTarget(canvasRef.current.width, canvasRef.current.height, levelRef.current);
    }
  };

  const handleEscape = () => {
    statsRef.current.targetsEscaped++;
    comboRef.current = 0;
    
    timeLeftRef.current = Math.max(0.0, timeLeftRef.current - 1.0);
    setTimeLeft(timeLeftRef.current);
    
    if (audioSynth) audioSynth.playPenalty();
    
    if (canvasRef.current) {
      spawnTarget(canvasRef.current.width, canvasRef.current.height, levelRef.current);
    }
  };

  // Main countdown game interval
  useEffect(() => {
    if (gameState === 'playing') {
      timerIntervalRef.current = setInterval(() => {
        timeLeftRef.current = Math.max(0, timeLeftRef.current - 0.1);
        setTimeLeft(timeLeftRef.current);
        
        if (timeLeftRef.current <= 0) {
          timeLeftRef.current = 0;
          setTimeLeft(0);
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          
          const acc = statsRef.current.totalTimeFired > 0 
            ? Math.round((statsRef.current.totalTrackingTime / statsRef.current.totalTimeFired) * 100) 
            : 0;
            
          setFinalAccuracy(acc);
          setTargetsNeutralized(statsRef.current.targetsDestroyed);
          setTargetsEvaded(statsRef.current.targetsEscaped);
          
          try {
            const storedScore = parseInt(localStorage.getItem('skilldrills_dynamic_strafe_best') || '0', 10);
            if (scoreRef.current > storedScore) {
              localStorage.setItem('skilldrills_dynamic_strafe_best', scoreRef.current.toString());
              localStorage.setItem('skilldrills_dynamic_strafe_best_acc', acc.toString());
              setBestScore(scoreRef.current);
              setBestTrackingAcc(acc);
              setIsNewBest(true);
            }
          } catch (e) {}
        }
      }, 100);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState]);

  // Physics & Render Loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current;
    const ctx = cvs?.getContext('2d', { alpha: false });
    if (!cvs || !ctx) return;

    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      cvs.width = rect.width;
      cvs.height = rect.height;
    };
    
    window.addEventListener('resize', updateSize);
    updateSize();
    spawnTarget(cvs.width, cvs.height, levelRef.current);

    let lastTime = performance.now();

    const draw = (ts: number) => {
      if (gameStateRef.current !== 'playing') return;
      let dt = (ts - lastTime) / 1000;
      if (dt > 0.1) dt = 0.016;
      lastTime = ts;

      const W = cvs.width;
      const H = cvs.height;
      const currentLevel = levelRef.current;
      const tgt = targetRef.current;

      // Draw background (cleaner, deeper slate)
      ctx.fillStyle = '#09090b'; 
      ctx.fillRect(0, 0, W, H);

      // Render refined gridlines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      for (let xPos = 0; xPos < W; xPos += 50) { ctx.beginPath(); ctx.moveTo(xPos, 0); ctx.lineTo(xPos, H); ctx.stroke(); }
      for (let yPos = 0; yPos < H; yPos += 50) { ctx.beginPath(); ctx.moveTo(0, yPos); ctx.lineTo(W, yPos); ctx.stroke(); }

      const radius = targetSize * deviceScale * Math.max(0.5, 1 - (currentLevel - 1) * 0.08);
      const hitRadius = radius * (isMobileDevice ? 2.5 : 1.7);

      // --- Physics Update ---
      tgt.x += tgt.vx * dt;
      tgt.y += tgt.vy * dt;

      // Wall Bounce
      if (tgt.x < radius) { tgt.x = radius; tgt.vx *= -1; }
      if (tgt.x > W - radius) { tgt.x = W - radius; tgt.vx *= -1; }
      if (tgt.y < radius) { tgt.y = radius; tgt.vy *= -1; }
      if (tgt.y > H - radius) { tgt.y = H - radius; tgt.vy *= -1; }

      // Zigzag / Evasive Logic
      tgt.zigzagTimer -= dt;
      if (tgt.zigzagTimer <= 0) {
        tgt.vx = -tgt.vx * 1.15; 
        tgt.vy = (Math.random() - 0.5) * Math.abs(tgt.vx) * 0.8; 
        tgt.zigzagTimer = Math.max(0.25, 1.2 - (currentLevel - 1) * 0.15) * (0.8 + Math.random() * 0.4);
      }

      // Escape Logic
      tgt.lifespan += dt;
      if (tgt.lifespan >= tgt.maxLifespan) {
        handleEscape();
      }

      // History for trails
      tgt.history.push({ x: tgt.x, y: tgt.y });
      if (tgt.history.length > 10) tgt.history.shift();

      // Damage & Tracking Logic
      let isHitting = false;
      if (pointerState.current.isDown) {
        statsRef.current.totalTimeFired += dt;
        const dist = Math.hypot(pointerState.current.x - tgt.x, pointerState.current.y - tgt.y);
        
        if (dist <= hitRadius) {
          isHitting = true;
          statsRef.current.totalTrackingTime += dt;
          
          const damagePerSec = isMobileDevice ? 180 : 130;
          tgt.health -= damagePerSec * dt;
          
          if (ts - tgt.lastHitmarker > 90) {
            if (audioSynth) audioSynth.playHitmarker();
            tgt.lastHitmarker = ts;
          }
          
          if (tgt.health <= 0) handleNeutralize();
        }
      }

      // --- Rendering ---
      
      // Clinical Trail Effect
      if (trailEffect && tgt.history.length > 1) {
        ctx.beginPath();
        ctx.moveTo(tgt.history[0].x, tgt.history[0].y);
        for (let i = 1; i < tgt.history.length; i++) ctx.lineTo(tgt.history[i].x, tgt.history[i].y);
        ctx.strokeStyle = `${targetColor}25`;
        ctx.lineWidth = radius * 0.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Precise Lock-on Reticle
      if (isHitting) {
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, hitRadius * 1.1, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Tactical Target Core
      ctx.shadowColor = targetColor;
      ctx.shadowBlur = glowEffect ? 12 : 0;
      
      // Outer ring
      ctx.strokeStyle = targetColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(tgt.x, tgt.y, radius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Inner fill
      ctx.fillStyle = `${targetColor}40`;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Center dot
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(tgt.x, tgt.y, radius * 0.25, 0, Math.PI * 2);
      ctx.fill();

      // Clinical Health Arc (Inner)
      if (tgt.health < 100) {
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, radius - 4, -Math.PI/2, -Math.PI/2 + (tgt.health / 100) * Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Escape Timer Arc (Outer)
      ctx.beginPath();
      ctx.arc(tgt.x, tgt.y, radius + 6, -Math.PI/2, -Math.PI/2 + (1 - tgt.lifespan / tgt.maxLifespan) * Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // CRT Scanlines (Subtle)
      if (scanlinesActive) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
        for (let i = 0; i < H; i += 3) ctx.fillRect(0, i, W, 1);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [gameState, targetSize, targetColor, trailEffect, glowEffect, scanlinesActive, deviceScale]);

  // Pointer Input Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameStateRef.current !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    pointerState.current.x = ((e.clientX - rect.left) / rect.width) * cvs.width;
    pointerState.current.y = ((e.clientY - rect.top) / rect.height) * cvs.height;
    pointerState.current.isDown = true;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameStateRef.current !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    pointerState.current.x = ((e.clientX - rect.left) / rect.width) * cvs.width;
    pointerState.current.y = ((e.clientY - rect.top) / rect.height) * cvs.height;
  };

  const startDrill = useCallback(() => {
    if (audioSynth) audioSynth.init();
    
    scoreRef.current = 0;
    comboRef.current = 0;
    maxComboRef.current = 0;
    levelRef.current = 1;
    timeLeftRef.current = 60.0;
    survivalStartTimeRef.current = performance.now();
    
    statsRef.current = { totalTrackingTime: 0, totalTimeFired: 0, targetsDestroyed: 0, targetsEscaped: 0 };
    pointerState.current.isDown = false;
    
    setScore(0);
    setMaxCombo(0);
    setLevel(1);
    setTimeLeft(60.0);
    setIsNewBest(false);
    setHudLocked(false);
    
    const enterFs = async () => {
      try {
        if (containerRef.current && !document.fullscreenElement && containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } catch (e) {}
    };
    
    enterFs().finally(() => {
      setGameState('playing');
    });
  }, []);

  const resetDrill = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('start');
    setTimeLeft(60.0);
    setHudLocked(false);
  }, []);

  const shareScore = useCallback(async () => {
    const text = `🎯 I scored ${score} PTS on the Dynamic Strafe Tracking Simulator! Tracking Accuracy: ${finalAccuracy}%. Optimize motor control at skilldrills.online! ⚡`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try { await navigator.share({ title: 'Dynamic Strafe Tracking Performance', text, url: 'https://skilldrills.online/drills/reaction-speed/dynamic-strafe-tracking' }); } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Diagnostic metrics copied to clipboard!');
    }
  }, [score, finalAccuracy]);

  const colorPresets = [
    { name: 'Tactical Blue', value: '#38bdf8' },
    { name: 'Optic Green', value: '#10b981' },
    { name: 'Alert Red', value: '#ef4444' },
    { name: 'High-Vis Pink', value: '#ec4899' },
    { name: 'Pure White', value: '#ffffff' },
    { name: 'Amber Warning', value: '#f59e0b' }
  ];

  // Clinical Grading Logic
  let gradeLetter = 'Needs Focus';
  if (finalAccuracy >= 80 && score >= 800) gradeLetter = 'Exceptional';
  else if (finalAccuracy >= 70 && score >= 500) gradeLetter = 'Advanced';
  else if (finalAccuracy >= 60 && score >= 250) gradeLetter = 'Proficient';
  else if (finalAccuracy >= 45 && score >= 100) gradeLetter = 'Developing';

  let rankName = 'Novice';
  let rankColor = 'text-zinc-400';
  if (score >= 1200 && finalAccuracy >= 80) { rankName = 'Grandmaster'; rankColor = 'text-sky-400 font-extrabold'; }
  else if (score >= 800 && finalAccuracy >= 70) { rankName = 'Master'; rankColor = 'text-indigo-400 font-extrabold'; }
  else if (score >= 500 && finalAccuracy >= 60) { rankName = 'Elite'; rankColor = 'text-emerald-400 font-extrabold'; }
  else if (score >= 250 && finalAccuracy >= 50) { rankName = 'Advanced'; rankColor = 'text-amber-400 font-extrabold'; }
  else if (score >= 100 && finalAccuracy >= 40) { rankName = 'Intermediate'; rankColor = 'text-zinc-200 font-extrabold'; }

  const survivalTimeSec = survivalStartTimeRef.current > 0 ? parseFloat(((performance.now() - survivalStartTimeRef.current) / 1000).toFixed(1)) : 0.0;

  let diagnostics = "Optimal tracking alignment. Continue centering crosshair on the target's core to anticipate sudden directional shifts.";
  if (finalAccuracy < 40) diagnostics = "Sub-optimal tracking efficiency. You are over-compensating or lagging behind target momentum. Focus on the crossover inflection point rather than chasing.";
  else if (targetsEvaded > targetsNeutralized && targetsNeutralized > 0) diagnostics = "High target evasion rate. Damage application is inconsistent. Prioritize maintaining contact during high-frequency strafe transitions.";
  else if (maxCombo < 10 && targetsNeutralized > 10) diagnostics = "Tracking continuity interrupted frequently. Re-acquisition latency is high following directional snaps. Practice micro-corrections.";

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
        <div className="w-10 h-10 border-[3px] border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen select-none bg-[#09090b] text-zinc-100 font-sans">
      <div className={`${isFullscreen || isMobileLandscape ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'} relative z-10`}>
        
        {/* Navigation Breadcrumbs */}
        {!isFullscreen && !isMobileLandscape && (
          <div className="mb-6">
            <nav className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 font-medium">
                <li><Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link></li>
                <li><ChevronRight className="w-3.5 h-3.5" /></li>
                <li><Link href="/drills" className="hover:text-zinc-300 transition-colors">Training Hub</Link></li>
                <li><ChevronRight className="w-3.5 h-3.5" /></li>
                <li><Link href="/drills/reaction-speed" className="hover:text-zinc-300 transition-colors">Motor Control</Link></li>
                <li><ChevronRight className="w-3.5 h-3.5" /></li>
                <li className="text-sky-400 font-semibold">Dynamic Strafe Tracking</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-zinc-800 border border-zinc-700 rounded-xl shadow-sm">
                  <Crosshair className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Dynamic Strafe Tracking</h1>
                  <p className="text-sm text-zinc-400 mt-1 font-medium">Optimize Reactive Tracking & Motor Control</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {gameState === 'playing' && (
                  <button onClick={resetDrill} className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Settings */}
        {!isFullscreen && !isMobileLandscape && isMobileDevice && (
          <div className="mb-4 bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-zinc-400">Optic Color:</span>
            <div className="flex gap-2">
              {colorPresets.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setTargetColor(c.value)}
                  className="w-5 h-5 rounded-full border flex items-center justify-center transition-transform active:scale-90"
                  style={{ backgroundColor: c.value, borderColor: targetColor === c.value ? '#ffffff' : 'transparent' }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Live HUD stats */}
        {!isFullscreen && !isMobileLandscape && (
          <div className="grid grid-cols-4 gap-2 mb-3">
            <StatCard icon={<Trophy className="text-sky-400" />} value={score} label="Score" />
            <StatCard icon={<TrendingUp className="text-emerald-400" />} value={`Lv. ${level}`} label="Difficulty" />
            <StatCard icon={<Clock className={timeLeft <= 10 ? 'text-amber-400 animate-pulse' : 'text-zinc-300'} />} value={timeLeft.toFixed(1)} label="Time Left" unit="s" />
            <StatCard icon={<Activity className="text-indigo-400" />} value={`${bestTrackingAcc}%`} label="Peak Accuracy" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Settings Sidebar */}
          {!isFullscreen && !isMobileLandscape && !isMobileDevice && (
            <div className="lg:col-span-1 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2 mb-5 flex items-center gap-1.5 font-mono">
                  <Sliders className="w-3.5 h-3.5 text-sky-500" />
                  Simulator Configuration
                </h3>

                <div className="mb-6">
                  <label className="block text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-mono mb-3">Optic Reticle Color</label>
                  <div className="flex flex-wrap gap-2.5">
                    {colorPresets.map((c) => (
                      <button
                        key={c.value}
                        title={c.name}
                        onClick={() => setTargetColor(c.value)}
                        className="w-5 h-5 rounded-full border transition-all flex items-center justify-center hover:scale-110"
                        style={{ backgroundColor: c.value, borderColor: targetColor === c.value ? '#ffffff' : 'transparent' }}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-800/50 font-mono">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-300 font-bold uppercase block">Trajectory Trails</span>
                      <span className="text-[9px] text-zinc-500 block">Render movement vectors</span>
                    </div>
                    <button onClick={() => setTrailEffect(!trailEffect)} className={`w-8 h-4 rounded-full p-0.5 transition-colors ${trailEffect ? 'bg-sky-500' : 'bg-zinc-700'}`}>
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform ${trailEffect ? 'transform translate-x-4' : ''}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-300 font-bold uppercase block">Optic Bloom</span>
                      <span className="text-[9px] text-zinc-500 block">Visual target diffusion</span>
                    </div>
                    <button onClick={() => setGlowEffect(!glowEffect)} className={`w-8 h-4 rounded-full p-0.5 transition-colors ${glowEffect ? 'bg-sky-500' : 'bg-zinc-700'}`}>
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform ${glowEffect ? 'transform translate-x-4' : ''}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-300 font-bold uppercase block">Diagnostic Overlay</span>
                      <span className="text-[9px] text-zinc-500 block">Render CRT tracking grid</span>
                    </div>
                    <button onClick={() => setScanlinesActive(!scanlinesActive)} className={`w-8 h-4 rounded-full p-0.5 transition-colors ${scanlinesActive ? 'bg-sky-500' : 'bg-zinc-700'}`}>
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform ${scanlinesActive ? 'transform translate-x-4' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-zinc-500 uppercase text-[9px] font-bold">Personal Peak</span>
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-white font-black text-lg">{bestScore} PTS</div>
              </div>
            </div>
          )}

          {/* Canvas Wrapper */}
          <div className={`${isFullscreen ? 'col-span-4' : isMobileDevice ? 'col-span-4' : 'lg:col-span-3'} flex flex-col relative`}>
            <div 
              ref={containerRef} 
              className={`relative overflow-hidden transition-colors outline-none bg-[#09090b] ${
                isFullscreen ? 'w-full h-full' : isMobileLandscape ? 'fixed inset-0 z-50 w-screen h-screen' : 'w-full aspect-video min-h-[380px] rounded-2xl border border-zinc-800 shadow-2xl'
              }`}
            >
              {showRotateWarning && !isMobileLandscape && (
                <div className="absolute inset-0 z-[100] bg-zinc-950/95 flex flex-col items-center justify-center p-6 text-center select-none backdrop-blur-md">
                  <RotateCcw className="w-12 h-12 mx-auto animate-bounce mb-5 text-sky-400" />
                  <h3 className="text-base font-bold text-white uppercase font-mono tracking-widest mb-2">Orientation Locked</h3>
                  <p className="text-xs text-zinc-400 max-w-xs mb-6 mx-auto leading-relaxed">This simulation requires a horizontal viewport to correctly render horizontal strafe matrices. Please rotate your device.</p>
                  <div className="flex flex-col gap-2 max-w-[220px] w-full mx-auto">
                    <button onClick={() => setShowRotateWarning(false)} className="px-6 py-3 bg-white text-zinc-900 font-mono text-[10px] uppercase rounded-md font-bold shadow-sm">Rotate Device</button>
                    <button onClick={() => setShowRotateWarning(false)} className="px-6 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[9px] uppercase rounded-md">Bypass Warning</button>
                  </div>
                </div>
              )}

              {/* HUD Override */}
              {(isFullscreen || isMobileLandscape) && gameState === 'playing' && (
                <div className="absolute top-4 right-4 z-[35] flex items-center gap-4 text-xs font-mono bg-zinc-950/80 border border-zinc-800 rounded-lg px-4 py-2 pointer-events-auto backdrop-blur-sm shadow-lg">
                  <div className="flex items-center gap-1.5 border-r border-zinc-700 pr-3"><Activity className="w-3.5 h-3.5 text-sky-400" /><span className="text-white font-bold">{score}</span></div>
                  <div className="flex items-center gap-1.5 border-r border-zinc-700 pr-3"><TrendingUp className="w-3.5 h-3.5 text-emerald-400" /><span className="text-white font-bold">Lv.{level}</span></div>
                  <div className="flex items-center gap-1.5 border-r border-zinc-700 pr-3"><Clock className="w-3.5 h-3.5 text-amber-400" /><span className="text-white font-bold">{timeLeft.toFixed(1)}s</span></div>
                  <button onClick={() => setSoundEnabled(v => !v)} className="text-zinc-400 hover:text-white transition-colors">{soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}</button>
                  <button onClick={() => setHudLocked(v => !v)} className="text-zinc-400 hover:text-white transition-colors">{hudLocked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}</button>
                  {!hudLocked && <button onClick={resetDrill} className="text-zinc-400 hover:text-white transition-colors"><RefreshCw className="w-3.5 h-3.5" /></button>}
                </div>
              )}

              {/* Start Screen */}
              {gameState === 'start' && (!showRotateWarning || isMobileLandscape) && (
                <div className="absolute inset-0 bg-zinc-950/90 p-6 z-30 select-none backdrop-blur-sm flex flex-col justify-center items-center">
                  <div className="max-w-md w-full text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-zinc-900 border border-zinc-800 rounded-2xl mb-4 shadow-sm">
                      <Target className="w-6 h-6 text-sky-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-2 font-mono">Dynamic Strafe Simulator</h2>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mb-8 font-semibold">Hold Input to Establish Tracking</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-8 text-left">
                      <div className="bg-zinc-900/80 border border-zinc-800 p-3.5 rounded-xl shadow-inner">
                        <span className="text-[9px] text-zinc-500 block uppercase font-bold tracking-wider mb-1">Neutralize Target</span>
                        <span className="text-sm font-black text-emerald-400 font-mono">+10 Pts / +1.0s</span>
                      </div>
                      <div className="bg-zinc-900/80 border border-zinc-800 p-3.5 rounded-xl shadow-inner">
                        <span className="text-[9px] text-zinc-500 block uppercase font-bold tracking-wider mb-1">Target Evaded</span>
                        <span className="text-sm font-black text-amber-500 font-mono">-1.0s Penalty</span>
                      </div>
                    </div>

                    {/* Highly Professional Pristine White Button */}
                    <button
                      onClick={startDrill}
                      className="w-full py-3.5 bg-white hover:bg-zinc-100 text-zinc-950 font-black rounded-xl text-xs flex items-center justify-center gap-2.5 shadow-[0_4px_14px_rgba(255,255,255,0.15)] uppercase tracking-widest font-mono transition-all duration-200 active:scale-95 border border-transparent"
                    >
                      <Play className="w-4 h-4 fill-zinc-950" />
                      Initialize Simulation
                    </button>
                  </div>
                </div>
              )}

              {/* Game Over Screen */}
              {gameState === 'gameOver' && (
                <div className="absolute inset-0 bg-zinc-950/95 p-6 z-30 select-none backdrop-blur-md flex flex-col justify-center items-center overflow-y-auto">
                  <div className="max-w-lg w-full text-center my-auto">
                    {isNewBest && (
                      <div className="inline-block bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md mb-4 shadow-[0_0_15px_rgba(56,189,248,0.15)] font-mono">
                        New Peak Performance Logged
                      </div>
                    )}
                    <h2 className="text-xl font-extrabold text-white uppercase tracking-wider mb-1 font-mono">Simulation Concluded</h2>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-8 font-mono font-semibold">Peak Difficulty Threshold: Level {level}</p>

                    <div className="grid grid-cols-3 gap-3 mb-6 text-left font-mono">
                      <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-lg">
                        <span className="text-[8px] text-zinc-500 block uppercase font-bold tracking-wider">Final Score</span>
                        <span className="text-base font-black text-white">{score}</span>
                      </div>
                      <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-lg">
                        <span className="text-[8px] text-zinc-500 block uppercase font-bold tracking-wider">Tracking Acc.</span>
                        <span className="text-base font-black text-sky-400">{finalAccuracy}%</span>
                      </div>
                      <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-lg">
                        <span className="text-[8px] text-zinc-500 block uppercase font-bold tracking-wider">Max Continuity</span>
                        <span className="text-base font-black text-indigo-400">{maxCombo}</span>
                      </div>
                      <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-lg">
                        <span className="text-[8px] text-zinc-500 block uppercase font-bold tracking-wider">Neutralized</span>
                        <span className="text-base font-black text-emerald-400">{targetsNeutralized}</span>
                      </div>
                      <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-lg">
                        <span className="text-[8px] text-zinc-500 block uppercase font-bold tracking-wider">Evaded</span>
                        <span className="text-base font-black text-amber-500">{targetsEvaded}</span>
                      </div>
                      <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-lg">
                        <span className="text-[8px] text-zinc-500 block uppercase font-bold tracking-wider">Uptime</span>
                        <span className="text-base font-black text-zinc-200">{survivalTimeSec}s</span>
                      </div>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl mb-6 text-left">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Performance Tier</span>
                        <span className={`text-xs font-black uppercase tracking-widest ${rankColor} font-mono`}>{rankName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-300 uppercase mb-2 font-mono tracking-wider">
                        <ShieldAlert className="w-3.5 h-3.5 text-sky-400" /> Diagnostic Overview
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                        {diagnostics}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      {/* Highly Professional Pristine White Restart Button */}
                      <button
                        onClick={startDrill}
                        className="flex-1 py-3.5 bg-white hover:bg-zinc-100 text-zinc-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(255,255,255,0.15)] uppercase tracking-widest font-mono transition-all duration-200 active:scale-95"
                      >
                        <RefreshCw className="w-4 h-4 text-zinc-950" />
                        Restart Simulation
                      </button>
                      <button onClick={shareScore} className="px-5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-xl hover:text-white hover:border-zinc-700 transition-colors shadow-sm">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Interaction Canvas Layer */}
              {gameState === 'playing' && (
                <canvas 
                  ref={canvasRef} 
                  className="block w-full h-full cursor-crosshair z-10 absolute top-0 left-0 touch-none" 
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={() => pointerState.current.isDown = false}
                  onPointerLeave={() => pointerState.current.isDown = false}
                  onPointerCancel={() => pointerState.current.isDown = false}
                />
              )}

              {/* HUD Screen Lock Overlay */}
              {gameState === 'playing' && hudLocked && !isFullscreen && (
                <div 
                  className="absolute inset-0 z-50 bg-zinc-950/90 flex flex-col items-center justify-center p-6 text-center cursor-pointer backdrop-blur-sm"
                  onClick={() => containerRef.current?.requestFullscreen?.()}
                >
                  <Lock className="w-10 h-10 mx-auto animate-pulse mb-4 text-amber-500" />
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-widest mb-2">Display Locked</h3>
                  <p className="text-[11px] text-zinc-400 font-mono">Tap interface to resume fullscreen visualization.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Extensive About & Educational Section */}
        {!isFullscreen && !isMobileLandscape && (
          <article className="mt-14 text-zinc-300">
            <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900/50 shadow-sm">
              <div className="px-6 py-5 border-b border-zinc-800 bg-zinc-950/50 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-sky-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">Optimizing Motor Control for Evasive Targets</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-white mb-3">Simulator Purpose</h2>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    The Dynamic Strafe Tracking Simulator is a clinical-grade aiming exercise designed to condition reactive tracking pathways. It is engineered for competitors in high-mobility tactical shooters (e.g., Apex Legends, Call of Duty) who need to optimize continuous crosshair alignment against highly evasive opponents utilizing sudden directional shifts.
                  </p>
                </section>

                <section className="border-t border-zinc-800/60 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Countering High-Frequency Directional Changes</h2>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    Opponents often exploit rapid, alternating horizontal movements (commonly referred to as "zigzagging" or "slide-canceling") to disrupt target acquisition. This technique relies on visual latency and network desynchronization. This simulator replicates those sudden momentum inversions to train the visual-motor system to process changes faster and reduce over-compensation errors.
                  </p>
                </section>

                <section className="border-t border-zinc-800/60 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Tactical Execution</h2>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    A common physiological error during high-frequency strafe tracking is attempting to predict the target's path, resulting in over-flicking. Optimal execution requires aiming at the <strong>inflection point</strong> (the center of their movement bounds), processing the visual change, and applying micro-corrections rather than macroscopic sweeps.
                  </p>
                </section>

                <section className="border-t border-zinc-800/60 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Engine Mechanics</h2>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    The rendered optic maintains high horizontal velocity before executing a synchronized reverse trajectory, coupled with minor vertical deviation. The operator must maintain continuous input (Hold/Fire) and keep the reticle anchored to the target's core to deplete integrity before the evasion timer expires.
                  </p>
                </section>
              </div>

              <div className="bg-zinc-950 border-t border-zinc-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-bold text-white">Operational FAQ</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="What constitutes a competitive accuracy threshold?" a="A Tracking Accuracy above 60% indicates highly proficient motor control. Sustaining over 70% accuracy at Level 5+ indicates elite reactive tracking capabilities." />
                  <FAQItem q="Why does the target shift vertically?" a="Pure horizontal tracking rarely occurs in live scenarios due to terrain variance and character animation states. Minor vertical deviations force continuous multi-axis adjustments." />
                  <FAQItem q="Is this calibrated for touch interfaces?" a="Yes. The physics engine dynamically adjusts target hitboxes and required velocity parameters based on whether input is received via touch digitizer or mouse optic sensor." />
                  <FAQItem q="How do I reduce tracking latency?" a="Minimize predictive movements. Allow your visual cortex to register the directional shift first, then initiate the motor response. Tension in the aiming hand often exacerbates latency." />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Footer */}
        {!isFullscreen && !isMobileLandscape && (
          <footer className="mt-12 bg-zinc-950 border border-zinc-800 text-zinc-500 rounded-xl py-10 px-6 font-mono text-[10px]">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-6 h-6 bg-zinc-900 border border-zinc-700 rounded-md flex items-center justify-center shadow-sm">
                  <Crosshair className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <span className="text-zinc-200 font-bold tracking-widest text-xs uppercase">SkillDrills Analytics</span>
              </div>
              <p className="text-[9px] text-zinc-600 mb-2">&copy; {new Date().getFullYear()} SkillDrills Platform. All rights reserved.</p>
              <p className="text-[9px] text-zinc-600 max-w-sm text-center">Engineered for precise cognitive and motor skill optimization.</p>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '' }) {
  return (
    <div className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-2.5 text-center flex flex-col justify-center h-full transition-all duration-300 hover:border-zinc-600 shadow-sm">
      <div className="mb-1.5 flex justify-center transition-transform duration-300 group-hover:scale-110">{icon}</div>
      <p className="text-xs sm:text-base font-black tracking-tight truncate text-white">{value} <span className="text-[10px] font-semibold text-zinc-500">{unit}</span></p>
      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-500 truncate">{label}</p>
    </div>
  );
}

function FAQItem({ q, a }) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
      <div className="text-sm font-bold text-zinc-200 mb-2.5 leading-snug">{q}</div>
      <div className="text-xs text-zinc-400 leading-relaxed font-medium">{a}</div>
    </div>
  );
}