'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Clock, Award, Activity, Play, RefreshCw, 
  Volume2, VolumeX, Maximize2, Minimize2, Lock, Unlock,
  Trophy, Info, Check, ArrowRight, Sparkles, Sliders, 
  TrendingUp, RotateCcw, Share2, Copy, Brain, GraduationCap, Lightbulb, ChevronRight, Crosshair
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
  playHit() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch(e) {}
  }
  playMiss() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch(e) {}
  }
  playLevelUp() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, this.ctx.currentTime + 0.24); // C6
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch(e) {}
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// Score to level utility
const getLevel = (s: number) => {
  if (s < 100) return 1;
  if (s < 250) return 2;
  if (s < 500) return 3;
  if (s < 800) return 4;
  if (s < 1200) return 5;
  return Math.floor((s - 1200) / 500) + 6;
};

export default function ReactionTimeTestClient() {
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hudLocked, setHudLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // Game states
  const [gameState, setGameState] = useState('start'); // start, playing, gameOver
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [bestAccuracy, setBestAccuracy] = useState(0);
  const [highestLevel, setHighestLevel] = useState(1);
  const [bestCombo, setBestCombo] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60.0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [avgReactionTime, setAvgReactionTime] = useState(0);
  
  // Custom configurations (color & effects)
  const [targetSize, setTargetSize] = useState(20);
  const [targetColor, setTargetColor] = useState('#ef4444');
  const [trailEffect, setTrailEffect] = useState(true);
  const [glowEffect, setGlowEffect] = useState(true);
  const [scanlinesActive, setScanlinesActive] = useState(true);
  
  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // High accuracy state refs (to prevent React state delay in the physics loop)
  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const maxComboRef = useRef(0);
  const levelRef = useRef(1);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const timeLeftRef = useRef(60.0);
  const reactionTimesRef = useRef<number[]>([]);
  const lastTargetSpawnTimeRef = useRef(0);
  const bestReactionTimeRef = useRef(9999);
  const survivalStartTimeRef = useRef(0);
  const hasPenalizedRef = useRef(false);
  
  // Custom physics states unique to this snapping target reaction drill
  const trackingState = useRef({
    lastTime: 0,
    tx: 0,
    ty: 0,
    snapTimer: 0
  });
  
  // Device Scale configuration (aim optimization)
  const [deviceScale, setDeviceScale] = useState(1.0);
  
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    if (audioSynth) {
      audioSynth.setEnabled(soundEnabled);
    }
  }, [soundEnabled]);

  // Viewport Orientation Check for Mobile
  useEffect(() => {
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || ('ontouchstart' in window);
      setIsMobileDevice(isMobile);
      
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isMobile && isPortrait) {
        setShowRotateWarning(true);
      } else {
        setShowRotateWarning(false);
      }
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
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || ('ontouchstart' in window);
      if (isMobile && window.innerWidth > window.innerHeight) {
        setIsMobileLandscape(true);
      } else {
        setIsMobileLandscape(false);
      }
    };
    checkLandscape();
    window.addEventListener('resize', checkLandscape);
    window.addEventListener('orientationchange', () => setTimeout(checkLandscape, 150));
    return () => {
      window.removeEventListener('resize', checkLandscape);
      window.removeEventListener('orientationchange', checkLandscape);
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
    setLoading(false);
    
    // Set device scale based on device input and size
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent || '';
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || ('ontouchstart' in window);
      let scale = 1.0;
      if (isMobile) {
        scale = 0.8; // harder on mobile
      } else {
        scale = 1.2; // larger target on desktop
      }
      setDeviceScale(scale);
      
      // Load best records
      try {
        const storedScore = localStorage.getItem('skilldrills_saccadic-snap_best');
        const storedAcc = localStorage.getItem('skilldrills_saccadic-snap_best_acc');
        const storedLvl = localStorage.getItem('skilldrills_saccadic-snap_best_lvl');
        const storedCombo = localStorage.getItem('skilldrills_saccadic-snap_best_combo');
        const storedSessions = localStorage.getItem('skilldrills_saccadic-snap_sessions');

        if (storedScore) setBestScore(parseInt(storedScore, 10));
        if (storedAcc) setBestAccuracy(parseInt(storedAcc, 10));
        if (storedLvl) setHighestLevel(parseInt(storedLvl, 10));
        if (storedCombo) setBestCombo(parseInt(storedCombo, 10));
        if (storedSessions) setTotalSessions(parseInt(storedSessions, 10));
      } catch (e) {}
    }
  }, []);

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

  // Prevent accidental page navigation when HUD is locked
  useEffect(() => {
    if (gameState === 'playing' && hudLocked) {
      window.history.pushState(null, '', window.location.href);
      const handlePopState = () => {
        window.history.pushState(null, '', window.location.href);
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [gameState, hudLocked]);

  // Score increments & hits
  const handleHit = useCallback((x: number, y: number) => {
    hitsRef.current += 1;
    setHits(hitsRef.current);
    
    scoreRef.current += 10;
    setScore(scoreRef.current);
    
    comboRef.current += 1;
    setCombo(comboRef.current);
    if (comboRef.current > maxComboRef.current) {
      maxComboRef.current = comboRef.current;
      setMaxCombo(maxComboRef.current);
    }
    
    // Add +1.0s time bonus, capped at 60s
    timeLeftRef.current = Math.min(60.0, timeLeftRef.current + 1.0);
    setTimeLeft(timeLeftRef.current);
    
    if (audioSynth) audioSynth.playHit();
    
    const nextLvl = getLevel(scoreRef.current);
    if (nextLvl > levelRef.current) {
      levelRef.current = nextLvl;
      setLevel(nextLvl);
      if (audioSynth) audioSynth.playLevelUp();
    }
    
    const now = performance.now();
    const rt = now - lastTargetSpawnTimeRef.current;
    if (rt > 0) {
      reactionTimesRef.current.push(rt);
      bestReactionTimeRef.current = Math.min(bestReactionTimeRef.current, rt);
    }
    lastTargetSpawnTimeRef.current = now;
  }, []);

  const handleMiss = useCallback((x: number, y: number, isTimeout = false) => {
    if (hasPenalizedRef.current) return; // Prevent double penalties per target cycle
    hasPenalizedRef.current = true;
    
    missesRef.current += 1;
    setMisses(missesRef.current);
    
    comboRef.current = 0;
    setCombo(0);
    
    // Deduct -1.0s time penalty
    timeLeftRef.current = Math.max(0.0, timeLeftRef.current - 1.0);
    setTimeLeft(timeLeftRef.current);
    
    if (audioSynth) audioSynth.playMiss();
    
    lastTargetSpawnTimeRef.current = performance.now();
  }, []);

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
          
          // Calculate average reaction time
          const times = reactionTimesRef.current;
          const avg = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
          setAvgReactionTime(avg);
          
          // Accuracy calculation
          const totalAttempts = hitsRef.current + missesRef.current;
          const accuracyVal = totalAttempts === 0 ? 100 : Math.round((hitsRef.current / totalAttempts) * 100);
          
          // Save high score
          try {
            const storedScore = localStorage.getItem('skilldrills_saccadic-snap_best');
            const currentBestScore = storedScore ? parseInt(storedScore, 10) || 0 : 0;
            
            const sessionsCount = (parseInt(localStorage.getItem('skilldrills_saccadic-snap_sessions') || '0', 10) || 0) + 1;
            localStorage.setItem('skilldrills_saccadic-snap_sessions', sessionsCount.toString());
            setTotalSessions(sessionsCount);

            if (scoreRef.current > currentBestScore) {
              localStorage.setItem('skilldrills_saccadic-snap_best', scoreRef.current.toString());
              localStorage.setItem('skilldrills_saccadic-snap_best_acc', accuracyVal.toString());
              localStorage.setItem('skilldrills_saccadic-snap_best_lvl', levelRef.current.toString());
              localStorage.setItem('skilldrills_saccadic-snap_best_combo', maxComboRef.current.toString());
              
              setBestScore(scoreRef.current);
              setBestAccuracy(accuracyVal);
              setHighestLevel(levelRef.current);
              setBestCombo(maxComboRef.current);
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

  // Main Canvas Render Loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d', { alpha: false });
    if (!ctx) return;

    const updateSize = () => {
      const ct = containerRef.current;
      if (!ct) return;
      const rect = ct.getBoundingClientRect();
      cvs.width = rect.width;
      cvs.height = rect.height;
      
      const sizeMult = Math.max(0.45, 1 - (levelRef.current - 1) * 0.08);
      const radiusMult = targetSize * deviceScale * sizeMult;
      
      trackingState.current.tx = radiusMult + Math.random() * (cvs.width - radiusMult * 2);
      trackingState.current.ty = radiusMult + Math.random() * (cvs.height - radiusMult * 2);
      trackingState.current.snapTimer = 0;
    };

    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateSize);
    updateSize();

    trackingState.current.lastTime = 0;
    lastTargetSpawnTimeRef.current = performance.now();
    hasPenalizedRef.current = false;

    const draw = (ts: number) => {
      if (gameStateRef.current !== 'playing') return;
      if (!trackingState.current.lastTime) {
        trackingState.current.lastTime = ts;
      }
      let dt = (ts - trackingState.current.lastTime) / 1000;
      if (dt > 0.1) dt = 0.016;
      trackingState.current.lastTime = ts;

      const W = cvs.width;
      const H = cvs.height;
      const currentLevel = levelRef.current;

      // Draw background
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

      // Loop update physics
      {
        trackingState.current.snapTimer += dt;
        const targetDurationLimit = Math.max(0.45, 1.35 - (currentLevel - 1) * 0.16);
        if (trackingState.current.snapTimer > targetDurationLimit) {
          handleMiss(0, 0, true);
          const sizeMult = Math.max(0.45, 1 - (currentLevel - 1) * 0.08);
          const radiusMult = targetSize * deviceScale * sizeMult;
          trackingState.current.tx = radiusMult + Math.random() * (W - radiusMult * 2);
          trackingState.current.ty = radiusMult + Math.random() * (H - radiusMult * 2);
          trackingState.current.snapTimer = 0;
          hasPenalizedRef.current = false;
        }
      }

      // Target size adjustments
      const sizeMult = Math.max(0.45, 1 - (currentLevel - 1) * 0.08);
      const radius = targetSize * deviceScale * sizeMult;

      // Draw customized targets
      {
        const tx = trackingState.current.tx;
        const ty = trackingState.current.ty;
        
        ctx.shadowColor = targetColor;
        ctx.shadowBlur = glowEffect ? 18 : 0;
        ctx.fillStyle = targetColor;
        ctx.beginPath();
        ctx.arc(tx, ty, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(tx, ty, radius * 0.55, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tx, ty, radius * 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // CRT Scanlines
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
  }, [gameState, targetSize, targetColor, trailEffect, glowEffect, scanlinesActive, deviceScale]);

  // Click & Pointer event interception
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameStateRef.current !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * cvs.width;
    const y = ((e.clientY - rect.top) / rect.height) * cvs.height;
    
    const tx = trackingState.current.tx;
    const ty = trackingState.current.ty;
    const dx = x - tx;
    const dy = y - ty;
    const dist = Math.hypot(dx, dy);
    
    const currentLevel = levelRef.current;
    const sizeMult = Math.max(0.45, 1 - (currentLevel - 1) * 0.08);
    const radius = targetSize * deviceScale * sizeMult;
    const hitRadius = radius * (isMobileDevice ? 2.25 : 1.7);
    
    if (dist <= hitRadius) {
      handleHit(x, y);
      hasPenalizedRef.current = false;
      const bounds = cvs.width * 0.1;
      trackingState.current.tx = radius + Math.random() * (cvs.width - radius * 2);
      trackingState.current.ty = radius + Math.random() * (cvs.height - radius * 2);
      trackingState.current.snapTimer = 0;
    } else {
      handleMiss(x, y);
    }
  };

  const startDrill = useCallback(() => {
    if (audioSynth) audioSynth.init();
    
    // Reset refs
    scoreRef.current = 0;
    comboRef.current = 0;
    maxComboRef.current = 0;
    levelRef.current = 1;
    hitsRef.current = 0;
    missesRef.current = 0;
    timeLeftRef.current = 60.0;
    reactionTimesRef.current = [];
    bestReactionTimeRef.current = 9999;
    survivalStartTimeRef.current = performance.now();
    hasPenalizedRef.current = false;
    
    // Set states
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLevel(1);
    setHits(0);
    setMisses(0);
    setTimeLeft(60.0);
    setIsNewBest(false);
    setHudLocked(false);
    
    const enterFs = async () => {
      try {
        const el = containerRef.current;
        if (el && !document.fullscreenElement) {
          if (el.requestFullscreen) {
            await el.requestFullscreen();
            setIsFullscreen(true);
          }
        }
      } catch (e) {}
    };
    
    enterFs().finally(() => {
      setGameState('playing');
      gameStateRef.current = 'playing';

      const cvs = canvasRef.current;
      const w = cvs ? cvs.width : window.innerWidth;
      const h = cvs ? cvs.height : window.innerHeight;
      
      const sizeMult = Math.max(0.45, 1 - (levelRef.current - 1) * 0.08);
      const radiusMult = targetSize * deviceScale * sizeMult;
      
      trackingState.current.tx = radiusMult + Math.random() * (w - radiusMult * 2);
      trackingState.current.ty = radiusMult + Math.random() * (h - radiusMult * 2);
      trackingState.current.snapTimer = 0;
    });
  }, []);

  const resetDrill = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setTimeLeft(60.0);
    setHudLocked(false);
  }, []);

  const shareScore = useCallback(async () => {
    const text = `🎮 I scored ${score} PTS on Reaction Time Test! Average reaction: ${avgReactionTime}ms. Practice free reflex drills at skilldrills.online! ⚡`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'My SkillDrills Reflex Score',
          text,
          url: 'https://skilldrills.online/drills/reaction-speed/reaction-time-test'
        });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [score, avgReactionTime]);

  const copyPageLink = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://skilldrills.online/drills/reaction-speed/reaction-time-test');
      alert('Link copied to clipboard!');
    }
  }, []);

  const colorPresets = [
    { name: 'Laser Red', value: '#ef4444' },
    { name: 'Neon Green', value: '#10b981' },
    { name: 'Vibrant Blue', value: '#3b82f6' },
    { name: 'Hot Pink', value: '#ec4899' },
    { name: 'Pure White', value: '#ffffff' },
    { name: 'Cyber Orange', value: '#f97316' }
  ];

  // Calculate grade based on score and accuracy
  const totalAttempts = hits + misses;
  const overallAccPercent = totalAttempts === 0 ? 100 : Math.round((hits / totalAttempts) * 100);
  
  let gradeLetter = 'F';
  if (overallAccPercent >= 90 && score >= 800) gradeLetter = 'S';
  else if (overallAccPercent >= 82 && score >= 500) gradeLetter = 'A';
  else if (overallAccPercent >= 72 && score >= 250) gradeLetter = 'B';
  else if (overallAccPercent >= 60 && score >= 100) gradeLetter = 'C';
  else if (overallAccPercent >= 45 && score >= 50) gradeLetter = 'D';

  let rankName = 'Bronze';
  let rankColor = 'text-slate-500';
  if (score >= 1200 && overallAccPercent >= 90) {
    rankName = 'Grandmaster';
    rankColor = 'text-fuchsia-400 font-extrabold';
  } else if (score >= 800 && overallAccPercent >= 82) {
    rankName = 'Master';
    rankColor = 'text-red-400 font-extrabold';
  } else if (score >= 500 && overallAccPercent >= 75) {
    rankName = 'Diamond';
    rankColor = 'text-cyan-400 font-extrabold';
  } else if (score >= 250 && overallAccPercent >= 65) {
    rankName = 'Platinum';
    rankColor = 'text-indigo-400 font-extrabold';
  } else if (score >= 100 && overallAccPercent >= 55) {
    rankName = 'Gold';
    rankColor = 'text-yellow-400 font-extrabold';
  } else if (score >= 50) {
    rankName = 'Silver';
    rankColor = 'text-gray-300 font-extrabold';
  }

  const bestRtVal = bestReactionTimeRef.current === 9999 ? 0 : Math.round(bestReactionTimeRef.current);
  const survivalTimeSec = survivalStartTimeRef.current > 0
    ? parseFloat(((performance.now() - survivalStartTimeRef.current) / 1000).toFixed(1))
    : 0.0;

  let diagnostics = "Solid attempt! Keep your cursor close to the center to reduce sweep distances.";
  if (overallAccPercent < 75) {
    diagnostics = "Low Accuracy detected. Rushing clicks will cause timer penalties. Acquire targets properly before clicking.";
  } else if (avgReactionTime > 400 && hits > 0) {
    diagnostics = "Slow visual response time. Focus on fast-twitch eye snaps (saccades) to locate target positions faster.";
  } else if (maxCombo < 15 && hits > 10) {
    diagnostics = "Combo streak broken too often. Avoid click spamming; timing and tracking rhythm are key to high scores.";
  }

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050508]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Loading Ocular aim engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen select-none bg-[#050508] text-white">
      <div className={`${isFullscreen || isMobileLandscape ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'} relative z-10`}>
        
        {/* Navigation Breadcrumbs */}
        {!isFullscreen && !isMobileLandscape && (
          <div className="mb-6">
            <nav className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills" className="hover:text-gray-300">Drills Hub</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/reaction-speed" className="hover:text-gray-300">Reaction Speed</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-red-400 font-medium">Reaction Time Test</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Reaction Time Test</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Saccadic Snap Drill • Device Adaptive</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {gameState === 'playing' && (
                  <button onClick={resetDrill} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                )}
                <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all">
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile target color selector above HUD */}
        {!isFullscreen && !isMobileLandscape && isMobileDevice && (
          <div className="mb-4 bg-gray-900/60 border border-gray-800 p-3 rounded-xl flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-355">Target Color:</span>
            <div className="flex gap-2">
              {colorPresets.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setTargetColor(c.value)}
                  className="w-6 h-6 rounded-full border transition-all relative flex items-center justify-center"
                  style={{ backgroundColor: c.value, borderColor: targetColor === c.value ? '#ffffff' : 'transparent' }}
                  title={c.name}
                >
                  {targetColor === c.value && (
                    <div className={`w-1.5 h-1.5 rounded-full ${c.value === '#ffffff' ? 'bg-black' : 'bg-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live HUD stats */}
        {!isFullscreen && !isMobileLandscape && (
          <div className="grid grid-cols-4 gap-2 mb-2">
            <StatCard icon={<Trophy className="text-red-400" />} value={score} label="Score" />
            <StatCard icon={<TrendingUp className="text-fuchsia-400" />} value={`Lv. ${level}`} label="Level" />
            <StatCard icon={<Clock className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={timeLeft.toFixed(1)} label="Time Left" unit="s" />
            <StatCard icon={<Info className="text-blue-400" />} value={bestScore} label="Best Score" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Settings Sidebar (Only on Desktop) */}
          {!isFullscreen && !isMobileLandscape && !isMobileDevice && (
            <div className="lg:col-span-1 bg-gray-900/50 border border-gray-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-gray-800 pb-2 mb-4 flex items-center gap-1.5 font-mono">
                  <Sliders className="w-3.5 h-3.5 text-red-500" />
                  DRILL CONFIGS
                </h3>

                {/* Target Color Preset */}
                <div className="mb-5">
                  <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono mb-2">Target Color</label>
                  <div className="flex flex-wrap gap-2">
                    {colorPresets.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setTargetColor(c.value)}
                        className="w-6 h-6 rounded-full border transition-all relative flex items-center justify-center"
                        style={{ backgroundColor: c.value, borderColor: targetColor === c.value ? '#ffffff' : 'transparent' }}
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
                <div className="space-y-3 pt-3 border-t border-gray-855 font-mono">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Gaze Trail</span>
                      <span className="text-[8px] text-slate-665 block">Renders tracking vector</span>
                    </div>
                    <button
                      onClick={() => setTrailEffect(!trailEffect)}
                      className={`w-8 h-4 rounded-full p-0.5 transition-colors focus:outline-none ${trailEffect ? 'bg-red-500' : 'bg-slate-800'}`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform ${trailEffect ? 'transform translate-x-4' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Neon Glow</span>
                      <span className="text-[8px] text-slate-670 block">Target blur filter</span>
                    </div>
                    <button
                      onClick={() => setGlowEffect(!glowEffect)}
                      className={`w-8 h-4 rounded-full p-0.5 transition-colors focus:outline-none ${glowEffect ? 'bg-red-500' : 'bg-slate-800'}`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform ${glowEffect ? 'transform translate-x-4' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Scanlines</span>
                      <span className="text-[8px] text-slate-675 block">Classic terminal grids</span>
                    </div>
                    <button
                      onClick={() => setScanlinesActive(!scanlinesActive)}
                      className={`w-8 h-4 rounded-full p-0.5 transition-colors focus:outline-none ${scanlinesActive ? 'bg-red-500' : 'bg-slate-800'}`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform ${scanlinesActive ? 'transform translate-x-4' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Personal Best Info Card */}
              <div className="mt-6 p-4 bg-[#05060b] border border-gray-800 rounded-xl font-mono text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500 uppercase text-[9px]">Personal Best</span>
                  <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                </div>
                <div className="text-white font-black text-base">{bestScore} PTS</div>
              </div>
            </div>
          )}

          {/* Canvas Interactive Screen Wrapper */}
          <div className={`${isFullscreen ? 'col-span-4' : isMobileDevice ? 'col-span-4' : 'lg:col-span-3'} flex flex-col relative`}>
            <div 
              ref={containerRef} 
              className={`relative overflow-hidden transition-colors outline-none bg-[#05060b] ${
                isFullscreen ? 'w-full h-full' : isMobileLandscape ? 'fixed inset-0 z-50 w-screen h-screen' : 'w-full aspect-video min-h-[380px] rounded-2xl border border-gray-800 shadow-2xl'
              }`}
            >
              {/* Orientation Warning Modal (Portrait Mobile Users) */}
              {showRotateWarning && !isMobileLandscape && (
                <div className="absolute inset-0 z-[100] bg-[#05070e]/98 flex flex-col items-center justify-center p-6 text-center select-none backdrop-blur-md">
                  <div className="animate-bounce mb-5 text-red-500">
                    <RotateCcw className="w-14 h-14 mx-auto" />
                  </div>
                  <h3 className="text-lg font-black text-white uppercase font-mono tracking-widest mb-2">Landscape Recommended</h3>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-6 mx-auto">
                    Please rotate your mobile device to landscape mode for the best target sizes and ocular sweep performance.
                  </p>
                  <div className="flex flex-col gap-2 w-full max-w-[200px]">
                    <button 
                      onClick={() => {
                        setShowRotateWarning(false);
                      }}
                      className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-mono text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition active:scale-95 shadow-lg font-bold"
                    >
                      Rotate Device
                    </button>
                    <button 
                      onClick={() => {
                        setShowRotateWarning(false);
                      }}
                      className="px-6 py-2 bg-slate-900 border border-gray-800 text-slate-400 font-mono text-[9px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition active:scale-95"
                    >
                      Continue Anyway
                    </button>
                  </div>
                </div>
              )}

              {/* In-Game HUD overlay inside fullscreen or landscape */}
              {(isFullscreen || isMobileLandscape) && gameState === 'playing' && (
                <div className="absolute top-4 right-4 z-[35] flex items-center gap-4 text-xs font-mono bg-black/60 border border-gray-800 rounded-xl px-4 py-2 pointer-events-auto">
                  <div className="flex items-center gap-1.5 border-r border-gray-800 pr-3">
                    <Activity className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-white font-bold">{score}</span>
                  </div>
                  <div className="flex items-center gap-1.5 border-r border-gray-800 pr-3">
                    <TrendingUp className="w-3.5 h-3.5 text-fuchsia-400" />
                    <span className="text-white font-bold">Lv.{level}</span>
                  </div>
                  <div className="flex items-center gap-1.5 border-r border-gray-800 pr-3">
                    <Clock className="w-3.5 h-3.5 text-yellow-500" />
                    <span className="text-white font-bold">{timeLeft.toFixed(1)}s</span>
                  </div>
                  <button onClick={() => setSoundEnabled(v => !v)} className="text-gray-400 hover:text-red-400 transition-colors" title="Toggle Sound" disabled={hudLocked}>
                    {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => setHudLocked(v => !v)} className="text-gray-400 hover:text-red-400 transition-colors animate-pulse" title={hudLocked ? "Unlock HUD" : "Lock HUD"}>
                    {hudLocked ? <Lock className="w-3.5 h-3.5 text-yellow-500" /> : <Unlock className="w-3.5 h-3.5" />}
                  </button>
                  {!hudLocked && (
                    <button onClick={resetDrill} className="text-gray-400 hover:text-red-400 transition-colors" title="Restart">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Start Screen */}
              {gameState === 'start' && (!showRotateWarning || isMobileLandscape) && (
                <div className="absolute inset-0 bg-[#05070e]/98 overflow-y-auto p-6 z-30 select-none scrollbar-thin scroll-smooth backdrop-blur-sm">
                  <div className="min-h-full flex flex-col justify-center items-center py-4 w-full">
                    <div className="max-w-md w-full text-center">
                      <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1 font-mono">
                        Reaction Time Test
                      </h2>
                      <p className="text-xs text-slate-555 uppercase tracking-widest mb-6">
                        Saccadic Snap Drill • Mouse / Touch
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                        <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                          <span className="text-[8px] text-slate-500 block uppercase font-bold">Rule</span>
                          <span className="text-sm font-black text-green-400">+10 Pts / +1.0s</span>
                        </div>
                        <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                          <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                          <span className="text-sm font-black text-red-400">-1.0s Penalty</span>
                        </div>
                      </div>

                      <button
                        onClick={startDrill}
                        className="w-full py-3 bg-white hover:bg-gray-100 text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest font-mono transition-all duration-200 active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 fill-black text-black" />
                        Begin Reflex Trial
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Game Over Screen */}
              {gameState === 'gameOver' && (
                <div className="absolute inset-0 bg-[#05070e]/98 overflow-y-auto p-6 z-30 select-none scrollbar-thin scroll-smooth backdrop-blur-sm">
                  <div className="min-h-full flex flex-col justify-center items-center py-4 w-full">
                    <div className="max-w-md w-full text-center">
                      {isNewBest && (
                        <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce font-mono">
                          ⭐ NEW PERSONAL BEST!
                        </div>
                      )}
                      
                      <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1 font-mono">
                        Drill Complete
                      </h2>
                      <p className="text-xs text-slate-555 uppercase tracking-widest mb-6 font-mono">
                        Peak difficulty reached: Level {level}
                      </p>

                      <div className="grid grid-cols-3 gap-2.5 mb-6 text-left font-mono">
                        <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                          <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                          <span className="text-sm font-black text-white">{score}</span>
                        </div>
                        <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                          <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Accuracy</span>
                          <span className="text-sm font-black text-white">{overallAccPercent}%</span>
                        </div>
                        <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                          <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Avg Reaction</span>
                          <span className="text-sm font-black text-blue-400">{avgReactionTime}ms</span>
                        </div>
                        
                        <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                          <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Best Reaction</span>
                          <span className="text-sm font-black text-indigo-400">{bestRtVal}ms</span>
                        </div>
                        <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                          <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Survival Time</span>
                          <span className="text-sm font-black text-green-400">{survivalTimeSec}s</span>
                        </div>
                        <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                          <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Total Hits</span>
                          <span className="text-sm font-black text-teal-400">{hits}</span>
                        </div>
                      </div>

                      <div className="bg-[#0b0f19] border border-slate-850 p-3 rounded-xl mb-4 text-left">
                        <span className={`text-xs font-black block text-center uppercase tracking-widest ${rankColor} mb-2`}>
                          Rank: {rankName}
                        </span>
                        <div className="w-full h-px bg-slate-850 mb-2"></div>
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-white uppercase mb-1 font-mono">
                          <Sparkles className="w-3 h-3 text-yellow-500" /> Diagnostics advice:
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          {diagnostics}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={startDrill}
                          className="flex-1 py-3 bg-white hover:bg-gray-100 text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest font-mono transition-all duration-200 active:scale-95"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-black" />
                          Run another trial
                        </button>
                        <button
                          onClick={shareScore}
                          className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors active:scale-95"
                          title="Share Score"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rendering canvas */}
              {gameState === 'playing' && (
                <canvas 
                  ref={canvasRef} 
                  className="block w-full h-full cursor-crosshair z-10 absolute top-0 left-0" 
                  onPointerDown={handlePointerDown}
                />
              )}

              {/* Screen locked overlay when exited fullscreen */}
              {gameState === 'playing' && hudLocked && !isFullscreen && (
                <div 
                  className="absolute inset-0 z-50 bg-black/85 flex flex-col items-center justify-center p-6 text-center select-none cursor-pointer"
                  onClick={() => {
                    const el = containerRef.current;
                    if (el?.requestFullscreen) {
                      el.requestFullscreen().then(() => {
                        setIsFullscreen(true);
                      }).catch(() => {});
                    }
                  }}
                >
                  <div className="animate-pulse mb-4 text-yellow-500">
                    <Lock className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-sm font-black text-white uppercase font-mono tracking-widest mb-2">Screen Locked</h3>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-mono">
                    Tap anywhere to resume fullscreen play mode.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        {!isFullscreen && !isMobileLandscape && (
          <article className="mt-12 text-gray-300">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-red-400" />
                <h2 className="font-bold text-white text-lg tracking-wide font-mono">About Reaction Time Test</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-white mb-3">What Is This Drill</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    The Reaction Time Test (internally known as Saccadic Snap) is a premium visual reaction speed training test designed to isolate and optimize your visual processing response times. It trains ballistic eye movements (saccades) as targets snap to random, unpredictable locations across your screen.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">How This Drill Works</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    A high-contrast target snaps instantly to random coordinates. You must coordinate your eyes to find it and click/tap it before its duration limit runs out. Successful hits add time to the trial clock, while misses and timeouts deduct time. The difficulty levels scale dynamically with your score.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Reaction Speed Benefits</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Snapping target points force your nervous system to register visual stimuli and translate them into physical clicks instantly, directly reducing latency and reaction times.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Reflex Training Benefits</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Conditioning reflexes against unpredictable target snapping directions builds high-precision muscle memory in the visual cortex.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Visual Tracking Benefits</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    This test challenges saccadic eye movements. Your eyes must rapidly leap from coordinate to coordinate and stabilize focus (foveate) immediately upon arrival.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Gaming Benefits</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Competitive gaming requires clicking targets that suddenly spawn or blink in different screen directions. Snapping visual coordination makes your flick targeting extremely precise.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">FPS Benefits</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Flick shots and target acquisition in FPS games rely heavily on ballistic aim. This drill directly translates to snapping onto target locations with minimal delay.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Esports Benefits</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Esports athletes depend on sub-200ms visual reflexes. The adaptive levels reduce target sizes and snap timers dynamically up to Level 6+, challenging elite cognitive limits.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Sports Benefits</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Traditional sport athletes (in tennis, basketball, or boxing) require high foveal sweep agility to track fast-moving balls and opponent transitions.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Hand Eye Coordination Benefits</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Aligning rapid eye jumps with physical cursor positioning under a tight survival clock sharpens coordination between the visual system and motor pathways.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Visual Processing Benefits</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Repetitive focus snaps condition the visual cortex to interpret spatial coordinate changes faster, improving visual processing speed.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Recommended Training Routine</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Practice the Reaction Time Test for 5-10 minutes daily. Prioritize eye sweeps and click accuracy to establish clean reflex motor paths.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">How Difficulty Progression Works</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Progression scales based on your current score. As you reach higher levels, the target radius decreases, and exposure lifespans shrink smoothly.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Who Should Use This Drill</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Ideal for gamers who want to train ballistic click timing, athletes seeking ocular sweep agility, or anyone looking to test and improve reaction time.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Common Mistakes</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    A common mistake is click-spamming blindly. Rushing clicks leads to miss penalties; maintain target acquisition before clicking the core.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Training Tips</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Play in full-screen landscape mode to maximize snapping spread. Choose high-visibility colors like Laser Red or Neon Green to optimize eye targeting.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Target Score Guide</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Bronze: Under 100 • Silver: 100-250 • Gold: 250-500 • Platinum: 500-800 • Diamond: 800-1200 • Master/Grandmaster: 1200+. Aim for over 85% accuracy.
                  </p>
                </section>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="What is reaction speed training?" a="Reaction speed training refers to repetitive exercises designed to decrease your cognitive reaction time by conditioning visual recognition and motor execution loops." />
                  <FAQItem q="How does this drill improve reflexes?" a="By presenting unpredictable snapping coordinates, it teaches the brain to quickly translate visual coordinate changes into precise motor movements." />
                  <FAQItem q="Can this improve gaming performance?" a="Yes. Fast reaction times and high-precision target tracking are critical for aiming and visual tracking in competitive gaming tournaments." />
                  <FAQItem q="Is this useful for FPS games?" a="Absolutely. Countering strafing players or tracking targets executing slide-cancels relies heavily on detecting sudden speed transitions." />
                  <FAQItem q="Can athletes use this drill?" a="Yes. Ocular tracking and hand-eye coordination training are highly beneficial for real-world sports like tennis, baseball, hockey, and martial arts." />
                  <FAQItem q="How is reaction speed measured?" a="Reaction time is measured in milliseconds (ms) from the moment the target relocates to the moment you successfully click it." />
                  <FAQItem q="Can I use this drill daily?" a="Yes. Consistent daily sessions of 5-10 minutes help establish stable neural response pathways and serve as an excellent reflex warmup." />
                  <FAQItem q="Is this suitable for beginners?" a="Yes. The adaptive level system scales target sizes and duration limits dynamically so players of all skill levels can start training." />
                  <FAQItem q="Does reaction training improve focus?" a="Yes. Eliminating targets before timeouts requires high cognitive concentration, sharpening visual attention and focus under pressure." />
                  <FAQItem q="What is a good score?" a="A score above 500 (Platinum rank) with over 80% accuracy is considered good. Elite competitive gamers often score over 1200 (Master+)." />
                  <FAQItem q="Is this drill free?" a="Yes. All reflex, reaction, and cognitive drills on SkillDrills are 100% free and do not require signups or downloads." />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Related Drills Section */}
        {!isFullscreen && !isMobileLandscape && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-red-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/reaction-speed/reflex-training-drill" title="Reflex Training Drill" desc="Calibrate tracking adjustments against sudden stops." color="red" icon={<Activity className="w-4 h-4" />} />
              <RelatedCard href="/drills/reaction-speed/fps-tracking-trainer" title="FPS Tracking Trainer" desc="Track and hit counter-strafing targets on a central plane." color="indigo" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/reaction-speed/visual-tracking-speed-test" title="Visual Tracking Test" desc="Unpredictable diagonal and dash speed pursuit." color="orange" icon={<Sliders className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* Footer */}
        {!isFullscreen && !isMobileLandscape && (
          <footer className="mt-12 bg-[#05060b] border border-gray-800 text-gray-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Reaction Drills</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/reaction-speed/reaction-time-test" className="hover:text-red-400 transition-colors text-red-400">Reaction Time Test</Link></li>
                    <li><Link href="/drills/reaction-speed/reaction-simulator" className="hover:text-red-400 transition-colors">Reaction Sim</Link></li>
                    <li><Link href="/drills/reaction-speed/fps-tracking-trainer" className="hover:text-red-400 transition-colors">FPS Tracking</Link></li>
                    <li><Link href="/drills/reaction-speed" className="text-red-500 hover:text-red-400 transition-colors font-bold">All Reaction Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-red-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-red-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-red-500 hover:text-red-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-red-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-red-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-red-500 hover:text-red-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-red-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-red-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-red-500 hover:text-red-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-red-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-red-400 transition-colors">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg flex items-center justify-center">
                    <Target className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6 font-sans text-gray-500">
                  Open-source telemetry training platform. Free forever. No downloads required.
                </p>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// === Subcomponents ===

function StatCard({ icon, value, label, unit = '', highlight = false }) {
  return (
    <div className={`group rounded-xl border ${highlight ? 'border-red-500/50 bg-red-500/5' : 'border-gray-800 bg-gray-900/50'} p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-700`}>
      <div className="mb-1 flex justify-center transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <p className="text-xs sm:text-base font-black tracking-tight truncate text-white">
        {value} <span className="text-[10px] font-semibold text-gray-500">{unit}</span>
      </p>
      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-gray-500 truncate">{label}</p>
    </div>
  );
}

function RelatedCard({ href, title, desc, color, icon }) {
  const gradients = {
    blue: 'from-blue-500 to-indigo-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
    purple: 'from-purple-500 to-violet-500',
    green: 'from-green-500 to-emerald-500',
    indigo: 'from-indigo-500 to-purple-500'
  };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-gray-600 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[color]}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white mb-3 shadow-inner">
        {icon}
      </div>
      <div className="font-bold text-base mb-1.5 text-white transition-colors">{title}</div>
      <div className="text-xs text-gray-500 mb-4">{desc}</div>
      <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
        Start Drill <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

function FAQItem({ q, a }) {
  return (
    <div className="bg-[#05060b] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
      <div className="text-sm font-bold text-gray-200 mb-2">{q}</div>
      <div className="text-xs text-gray-400 leading-relaxed">{a}</div>
    </div>
  );
}