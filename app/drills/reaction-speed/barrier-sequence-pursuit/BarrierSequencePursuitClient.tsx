'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Clock, Award, Activity, Play, RefreshCw, 
  Volume2, VolumeX, Maximize2, Minimize2, Trophy, Info, 
  Check, ArrowRight, Sparkles, Sliders, Zap, Share2, Copy, 
  Brain, RotateCcw, Compass, ChevronRight, GraduationCap, 
  CheckCircle2, XCircle, AlertCircle, TrendingUp, Lightbulb, Crosshair, Lock, Unlock
} from 'lucide-react';

type Particle = { x: number; y: number; text: string; color: string; life: number; maxLife: number };
type RingBurst = { x: number; y: number; startR: number; maxR: number; life: number; maxLife: number; color: string };

// ============================================================
// ZERO-LATENCY AUDIO SYNTHESIZER
// ============================================================
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
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
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
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
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
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch(e) {}
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// Score to adaptive level mapper
const getLevel = (score: number) => {
  if (score < 100) return 1;
  if (score < 250) return 2;
  if (score < 500) return 3;
  if (score < 800) return 4;
  if (score < 1200) return 5;
  return Math.floor((score - 1200) / 400) + 6;
};

// Level parameters selector
const getLevelParameters = (lvl: number) => {
  let peekDuration = 1.0;
  let targetDurationLimit = 1.6;
  if (lvl === 1) {
    peekDuration = 1.0;
    targetDurationLimit = 1.6;
  } else if (lvl === 2) {
    peekDuration = 0.75;
    targetDurationLimit = 1.25;
  } else if (lvl === 3) {
    peekDuration = 0.55;
    targetDurationLimit = 0.95;
  } else if (lvl === 4) {
    peekDuration = 0.42;
    targetDurationLimit = 0.75;
  } else if (lvl === 5) {
    peekDuration = 0.32;
    targetDurationLimit = 0.60;
  } else {
    peekDuration = Math.max(0.15, 0.24 - (lvl - 6) * 0.02);
    targetDurationLimit = Math.max(0.30, 0.45 - (lvl - 6) * 0.03);
  }
  return { peekDuration, targetDurationLimit };
};

export default function BarrierSequencePursuitClient() {
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // Game states
  const [gameState, setGameState] = useState('start'); // start, playing, gameOver
  const [hudLocked, setHudLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60.0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [avgReactionTime, setAvgReactionTime] = useState(0);
  
  // Settings & Customization
  const [targetColor, setTargetColor] = useState('#ef4444');
  const [trailEffect, setTrailEffect] = useState(true);
  const [glowEffect, setGlowEffect] = useState(false);
  const [scanlinesActive, setScanlinesActive] = useState(true);
  
  // DOM Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // High-performance state tracking refs
  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const maxComboRef = useRef(0);
  const levelRef = useRef(1);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const timeLeftRef = useRef(60.0);
  const reactionTimesRef = useRef<number[]>([]);
  const bestReactionTimeRef = useRef(9999);
  const survivalStartTimeRef = useRef(0);
  const lastTargetSpawnTimeRef = useRef(0);
  const hasPenalizedRef = useRef(false); // Double penalty prevention flag
  
  // Unique physics tracking
  const trackingState = useRef({
    lastTime: 0,
    particles: [] as Particle[],
    rings: [] as RingBurst[],
    barriers: [] as number[][],
    seq: 0,
    seqT: 0,
    peek: 1.0
  });

  const [deviceScale, setDeviceScale] = useState(1.0);

  const getTargetRadius = useCallback((W: number, H: number, currentLevel: number) => {
    const sizeMult = Math.max(0.45, 1.0 - (currentLevel - 1) * 0.07);
    if (isMobileDevice) {
      const screenFactor = Math.min(W / 800, H / 450);
      return Math.max(9, Math.round(15 * screenFactor * sizeMult * deviceScale));
    } else {
      const baseRadius = 35;
      if (isFullscreen) {
        return Math.max(12, Math.round(baseRadius * sizeMult));
      } else {
        return Math.max(12, Math.round(baseRadius * (H / 1080) * sizeMult));
      }
    }
  }, [isMobileDevice, deviceScale, isFullscreen]);
  
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Orientation Check for Mobile
  useEffect(() => {
    const checkOrientation = () => {
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
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Landscape full screen viewport offset detection
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
    
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent || '';
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || ('ontouchstart' in window);
      let scale = 1.0;
      if (isMobile) {
        scale = 0.8; // slightly smaller targets for touch controls to maintain visual difficulty
      } else {
        scale = 1.2; // larger targets for mouse cursor coordination
      }
      setDeviceScale(scale);
      
      try {
        const stored = localStorage.getItem('skilldrills_barrier_sequence_bestScore');
        if (stored) setBestScore(parseInt(stored, 10));
      } catch (e) {}
    }
  }, []);

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

  // Correct hit scoring
  const handleHit = useCallback((x: number, y: number) => {
    hitsRef.current += 1;
    setHits(hitsRef.current);
    
    scoreRef.current += 10;
    setScore(scoreRef.current);
    trackingState.current.particles.push({
      x, y, text: '+10', color: '#4ade80', life: 1.0, maxLife: 1.0
    });
    
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
    
    // Check adaptive level
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

  // Error and timeout miss penalty
  const handleMiss = useCallback((x: number, y: number, isTimeout = false) => {
    if (hasPenalizedRef.current) return; // Prevent double penalties per target cycle
    hasPenalizedRef.current = true;
    
    missesRef.current += 1;
    setMisses(missesRef.current);
    
    comboRef.current = 0;
    setCombo(0);
    const cvs = canvasRef.current;
    const px = isTimeout ? (cvs ? cvs.width / 2 : 150) : x;
    const py = isTimeout ? (cvs ? cvs.height / 2 : 150) : y;
    const text = isTimeout ? 'Time Out! -1s' : '-1s Miss';
    trackingState.current.particles.push({
      x: px, y: py, text, color: '#ef4444', life: 1.2, maxLife: 1.2
    });
    
    // Deduct -1s time penalty
    timeLeftRef.current = Math.max(0.0, timeLeftRef.current - 1.0);
    setTimeLeft(timeLeftRef.current);
    
    if (audioSynth) audioSynth.playMiss();
    
    lastTargetSpawnTimeRef.current = performance.now();
    
  }, []);

  // Countdown timer clock
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
          
          const times = reactionTimesRef.current;
          const avg = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
          setAvgReactionTime(avg);
          
          try {
            const stored = localStorage.getItem('skilldrills_barrier_sequence_bestScore');
            const currentBest = stored ? parseInt(stored, 10) || 0 : 0;
            if (scoreRef.current > currentBest) {
              localStorage.setItem('skilldrills_barrier_sequence_bestScore', scoreRef.current.toString());
              setBestScore(scoreRef.current);
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

  // Render & Cycle Physics
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d', { alpha: false });
    if (!ctx) return;

    const updateDimensions = () => {
      const ct = containerRef.current;
      if (!ct) return;
      const rect = ct.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      cvs.width = rect.width * dpr;
      cvs.height = rect.height * dpr;
      cvs.style.width = rect.width + 'px';
      cvs.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const W = rect.width;
      const H = rect.height;
      
      // Coordinate adaptation for portrait vs landscape layouts
      const isPortrait = H > W;
      if (isPortrait) {
        trackingState.current.barriers = [
          [W * 0.22, H * 0.32],
          [W * 0.78, H * 0.32],
          [W * 0.22, H * 0.68],
          [W * 0.78, H * 0.68]
        ];
      } else {
        trackingState.current.barriers = [
          [W * 0.25, H * 0.28],
          [W * 0.75, H * 0.28],
          [W * 0.25, H * 0.72],
          [W * 0.75, H * 0.72]
        ];
      }
      trackingState.current.seq = 0;
      trackingState.current.seqT = 0;
      trackingState.current.peek = 1.0;
    };

    const ro = new ResizeObserver(updateDimensions);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    trackingState.current.lastTime = 0;
    lastTargetSpawnTimeRef.current = performance.now();
    hasPenalizedRef.current = false;

    const drawLoop = (ts: number) => {
      if (gameStateRef.current !== 'playing') return;
      if (!trackingState.current.lastTime) {
        trackingState.current.lastTime = ts;
      }
      let dt = (ts - trackingState.current.lastTime) / 1000;
      if (dt > 0.15) dt = 0.016; // caps frame lag
      trackingState.current.lastTime = ts;

      const dpr = window.devicePixelRatio || 1;
      const W = cvs.width / dpr;
      const H = cvs.height / dpr;
      const currentLevel = levelRef.current;

      // Draw background
      ctx.fillStyle = '#05060b';
      ctx.fillRect(0, 0, W, H);

      // Dot-matrix tactical grid
      ctx.fillStyle = 'rgba(59, 130, 246, 0.055)';
      const dotSpacing = 40;
      for (let gx = dotSpacing; gx < W; gx += dotSpacing) {
        for (let gy = dotSpacing; gy < H; gy += dotSpacing) {
          ctx.fillRect(gx - 0.5, gy - 0.5, 1, 1);
        }
      }

      // Physics State Transitions
      {
        trackingState.current.seqT += dt;
        const { peekDuration, targetDurationLimit } = getLevelParameters(currentLevel);
        
        if (trackingState.current.seqT > targetDurationLimit) {
          handleMiss(0, 0, true);
          hasPenalizedRef.current = false;
          trackingState.current.seq = Math.floor(Math.random() * 4);
          trackingState.current.peek = peekDuration;
          trackingState.current.seqT = 0;
        }
        
        if (trackingState.current.peek > 0) {
          trackingState.current.peek -= dt;
        }
      }

      const radius = getTargetRadius(W, H, currentLevel);

      // Draw Cover Barriers (relative dimensions)
      const bW = Math.max(45, W * 0.12);
      const bH = Math.max(55, H * 0.15);

      ctx.fillStyle = '#111827';
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 1.5;
      
      const barriers = trackingState.current.barriers;
      if (barriers.length === 4) {
        for (let i = 0; i < 4; i++) {
          const bx = barriers[i][0];
          const by = barriers[i][1];
          
          if (i !== trackingState.current.seq || trackingState.current.peek <= 0) {
            // Draw closed cover panel
            ctx.fillRect(bx - bW / 2, by - bH / 2, bW, bH);
            ctx.strokeRect(bx - bW / 2, by - bH / 2, bW, bH);
            
            // Draw diagonal grid hatch lines inside cover panel
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
            ctx.beginPath();
            ctx.moveTo(bx - bW / 2, by - bH / 2);
            ctx.lineTo(bx + bW / 2, by + bH / 2);
            ctx.moveTo(bx - bW / 2 + 15, by - bH / 2);
            ctx.lineTo(bx + bW / 2, by + bH / 2 - 15);
            ctx.moveTo(bx - bW / 2, by - bH / 2 + 15);
            ctx.lineTo(bx + bW / 2 - 15, by + bH / 2);
            ctx.stroke();
            ctx.strokeStyle = '#1f2937';
          } else {
            // Draw peeking open slot
            ctx.fillStyle = 'rgba(59, 130, 246, 0.05)';
            ctx.fillRect(bx - bW / 2, by - bH / 2, bW, bH);
            ctx.fillStyle = '#111827';
          }
        }

        // Draw premium target (only if peeking)
        if (trackingState.current.peek > 0) {
          const active = barriers[trackingState.current.seq];
          const tx = active[0];
          const ty = active[1];
          const r = radius;

          ctx.save();
          // Ghost outer ring
          ctx.globalAlpha = 0.2;
          ctx.strokeStyle = targetColor;
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.arc(tx, ty, r + 5, 0, Math.PI * 2);
          ctx.stroke();
          // Tactical ring
          ctx.globalAlpha = 0.55;
          ctx.strokeStyle = targetColor;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(tx, ty, r, 0, Math.PI * 2);
          ctx.stroke();
          // Filled body
          ctx.globalAlpha = 0.88;
          ctx.fillStyle = targetColor;
          ctx.beginPath();
          ctx.arc(tx, ty, r * 0.82, 0, Math.PI * 2);
          ctx.fill();
          // Highlight sheen
          ctx.globalAlpha = 0.3;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(tx - r * 0.2, ty - r * 0.2, r * 0.28, 0, Math.PI * 2);
          ctx.fill();
          // Bright center core
          ctx.globalAlpha = 1.0;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(tx, ty, r * 0.18, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Render Trail Effect
          if (trailEffect) {
            ctx.strokeStyle = `rgba(${parseInt(targetColor.slice(1,3), 16) || 239}, ${parseInt(targetColor.slice(3,5), 16) || 68}, ${parseInt(targetColor.slice(5,7), 16) || 68}, 0.15)`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(active[0], active[1], radius + 8, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      // CRT overlay scanlines
      if (scanlinesActive) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
        for (let y = 0; y < H; y += 4) {
          ctx.fillRect(0, y, W, 1.5);
        }
      }

      
      // Draw Hit Ring Bursts
      const rings = trackingState.current.rings;
      if (rings && rings.length > 0) {
        for (let i = rings.length - 1; i >= 0; i--) {
          const ring = rings[i];
          ring.life -= dt;
          if (ring.life <= 0) { rings.splice(i, 1); continue; }
          const progress = 1 - ring.life / ring.maxLife;
          const currentR = ring.startR + (ring.maxR - ring.startR) * progress;
          ctx.save();
          ctx.globalAlpha = (ring.life / ring.maxLife) * 0.75;
          ctx.strokeStyle = ring.color;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, currentR, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      // Draw In-Canvas Feedback Particles
      const particles = trackingState.current.particles;
      if (particles) {
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `bold ${isMobileDevice ? 19 : 16}px monospace`;
        
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life -= dt;
          p.y -= dt * 38;
          
          const alpha = Math.max(0, p.life / p.maxLife);
          let r = 255, g = 255, b = 255;
          if (p.color.startsWith('#') && p.color.length === 7) {
            r = parseInt(p.color.slice(1, 3), 16);
            g = parseInt(p.color.slice(3, 5), 16);
            b = parseInt(p.color.slice(5, 7), 16);
          }
          
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fillText(p.text, p.x, p.y);
          
          if (p.life <= 0) particles.splice(i, 1);
        }
        ctx.restore();
      }
animationRef.current = requestAnimationFrame(drawLoop);
    };

    animationRef.current = requestAnimationFrame(drawLoop);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateDimensions);
      ro.disconnect();
    };
  }, [gameState, targetColor, trailEffect, glowEffect, scanlinesActive, deviceScale]);

  // Pointer click handler
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameStateRef.current !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const barriers = trackingState.current.barriers;
    if (trackingState.current.peek > 0 && barriers.length === 4) {
      const active = barriers[trackingState.current.seq];
      const dx = x - active[0];
      const dy = y - active[1];
      const dist = Math.hypot(dx, dy);
      
      const currentLevel = levelRef.current;
      const dpr2 = window.devicePixelRatio || 1;
      const W = cvs.width / dpr2;
      const H = cvs.height / dpr2;
      const radius = getTargetRadius(W, H, currentLevel);
      
      // Generous hit boundary margin for touch devices
      const hitRadius = radius * (isMobileDevice ? 2.25 : 1.75);
      
      if (dist <= hitRadius) {
        handleHit(x, y);
        hasPenalizedRef.current = false; // Reset penalize flag for next cycle
        trackingState.current.rings.push({ x, y, startR: radius * 0.4, maxR: radius * 2.8, life: 0.28, maxLife: 0.28, color: targetColor });
        
        // Setup next target immediately
        const { peekDuration } = getLevelParameters(levelRef.current);
        trackingState.current.seq = Math.floor(Math.random() * 4);
        trackingState.current.peek = peekDuration;
        trackingState.current.seqT = 0;
      } else {
        handleMiss(x, y);
      }
    } else {
      handleMiss(x, y);
    }
  };

  const startDrill = useCallback(() => {
    if (audioSynth) audioSynth.init();
    
    scoreRef.current = 0;
    comboRef.current = 0;
    trackingState.current.particles = [];
    maxComboRef.current = 0;
    levelRef.current = 1;
    hitsRef.current = 0;
    missesRef.current = 0;
    timeLeftRef.current = 60.0;
    reactionTimesRef.current = [];
    bestReactionTimeRef.current = 9999;
    survivalStartTimeRef.current = performance.now();
    hasPenalizedRef.current = false;
    
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
      } catch (e) {
        console.error('Fullscreen request failed', e);
      }
    };
    
    enterFs().finally(() => {
      setGameState('playing');
      gameStateRef.current = 'playing';

      const cvs = canvasRef.current;
      const w = cvs ? cvs.width : window.innerWidth;
      const h = cvs ? cvs.height : window.innerHeight;
      
      trackingState.current.barriers = [
        [w * 0.25, h * 0.28],
        [w * 0.75, h * 0.28],
        [w * 0.25, h * 0.72],
        [w * 0.75, h * 0.72]
      ];
      trackingState.current.seq = 0;
      trackingState.current.seqT = 0;
      trackingState.current.peek = 1.0;
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
    const text = `🎮 I scored ${score} PTS on Barrier Sequence Pursuit reaction test! Average reaction: ${avgReactionTime}ms. Practice free reflex drills at skilldrills.online! ⚡`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'My SkillDrills Reflex Score',
          text,
          url: 'https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit'
        });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [score, avgReactionTime]);

  const copyPageLink = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit');
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

  // Grade & Rank assignment
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

  let diagnostics = 'Solid attempt! Focus on visual scanning lines. Anticipate peeks based on the sequence intervals.';
  if (overallAccPercent < 75) {
    diagnostics = 'Low Accuracy detected. You are clicking barriers when closed. Focus on target presence confirmation before execution.';
  } else if (avgReactionTime > 450 && hits > 0) {
    diagnostics = 'Slow visual acquisition delay. Practice broad eye sweeps and minimize click decision hesitation.';
  } else if (maxCombo < 10 && hits > 8) {
    diagnostics = 'Combo streak broken too often. Rushing clicks causes penalty chains. Maintain steady rhythm control.';

  }

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050508]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
                <li><Link href="/drills" className="hover:text-gray-300">Drills</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/reaction-speed" className="hover:text-gray-300">Reaction Speed</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-amber-400 font-medium">Barrier Sequence Pursuit</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Barrier Sequence Pursuit</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Cover Peeking Visual Test • Device Adaptive</p>
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
            <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-350">Target Color:</span>
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
            <StatCard icon={<Trophy className="text-amber-400" />} value={score} label="Score" />
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
                  <Sliders className="w-3.5 h-3.5 text-amber-500" />
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
                <div className="space-y-3 pt-3 border-t border-gray-850 font-mono">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Gaze Trail</span>
                      <span className="text-[8px] text-slate-600 block">Renders tracking ring</span>
                    </div>
                    <button
                      onClick={() => setTrailEffect(!trailEffect)}
                      className={`w-8 h-4 rounded-full p-0.5 transition-colors focus:outline-none ${trailEffect ? 'bg-amber-500' : 'bg-slate-800'}`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform ${trailEffect ? 'transform translate-x-4' : ''}`} />
                    </button>
                  </div>

                  

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Scanlines</span>
                      <span className="text-[8px] text-slate-600 block">Classic terminal grids</span>
                    </div>
                    <button
                      onClick={() => setScanlinesActive(!scanlinesActive)}
                      className={`w-8 h-4 rounded-full p-0.5 transition-colors focus:outline-none ${scanlinesActive ? 'bg-amber-500' : 'bg-slate-800'}`}
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
                  <div className="animate-bounce mb-5 text-amber-500">
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
                      className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-mono text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition active:scale-95 shadow-lg font-bold"
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

              {/* In-Game HUD overlay inside fullscreen or landscape — controls only, no score text */}
              {(isFullscreen || isMobileLandscape) && gameState === 'playing' && (
                <div className="absolute top-4 right-4 z-[35] flex items-center gap-4 bg-black/60 border border-gray-800 rounded-xl px-4 py-2 pointer-events-auto">
                  <button onClick={() => setSoundEnabled(v => !v)} className="text-gray-400 hover:text-amber-400 transition-colors" title="Toggle Sound" disabled={hudLocked}>
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setHudLocked(v => !v)} className="text-gray-400 hover:text-red-400 transition-colors animate-pulse" title={hudLocked ? "Unlock HUD" : "Lock HUD"}>
                    {hudLocked ? <Lock className="w-4 h-4 text-yellow-500" /> : <Unlock className="w-4 h-4" />}
                  </button>
                  {!hudLocked && (
                    <button onClick={resetDrill} className="text-gray-400 hover:text-red-400 transition-colors" title="Restart">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {/* Floating Combo overlay (Top Left) */}
              {gameState === 'playing' && combo >= 5 && (
                <div className="absolute top-4 left-4 z-[35] pointer-events-none animate-pulse font-mono">
                  <div className="bg-orange-500/20 border border-orange-500 text-orange-400 px-3 py-1.5 rounded-full text-[10px] font-black shadow-[0_0_15px_rgba(249,115,22,0.4)] tracking-widest uppercase">
                    🔥 {combo}x Combo
                  </div>
                </div>
              )}

              {/* Start Screen */}
              {gameState === 'start' && (!showRotateWarning || isMobileLandscape) && (
                <div className="absolute inset-0 bg-[#05070e]/98 overflow-y-auto p-6 z-30 select-none scrollbar-thin scroll-smooth backdrop-blur-sm">
                  <div className="min-h-full flex flex-col justify-center items-center py-4 w-full">
                    <div className="max-w-md w-full text-center">
                    <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1 font-mono">
                      Barrier Sequence Pursuit
                    </h2>
                    <p className="text-xs text-slate-550 uppercase tracking-widest mb-6">
                      Reflex Cover Peeking Test • Mouse / Touch
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
                      className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest font-mono transition-all duration-200 active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
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
                    <p className="text-xs text-slate-550 uppercase tracking-widest mb-6 font-mono">
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
                        className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest font-mono transition-all duration-200 active:scale-95"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
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
                  style={{ touchAction: 'none' }}
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
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <h2 className="font-bold text-white text-lg tracking-wide font-mono">About Barrier Sequence Pursuit</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-white mb-3">What is Barrier Sequence Pursuit?</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Barrier Sequence Pursuit is a specialized visual reaction and re-acquisition reflex drill. Unlike mouse aim trainers that evaluate raw motor flick coordination, this drill tests your eye scanning reflexes. Multiple barrier panels slide open in sequence to expose a target peeking from cover, forcing your brain to process and eliminate threats before they hide.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Why Cover Recognition Matters</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    In competitive gaming, cover is life. Shooting targets that peek out from box corners or columns requires instant spatial coordination. Developing cover recognition muscle memory trains your eyes to lock onto cover boundaries, reducing reaction delay when an enemy peeks out.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">How This Improves Reaction Speed</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    By scaling down peeking duration limits as your score climbs, the drill conditions your visual cortex to recognize and process movement faster. It shortens the Neuromuscular Delay (the latency between seeing a target and clicking it), building fast-twitch reflexes.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6 text-left">
                  <h2 className="text-xl font-bold text-white mb-3">Targeted Training Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-black/30 p-4 border border-gray-800 rounded-lg">
                      <h4 className="font-bold text-white mb-2 font-mono uppercase text-xs">Benefits For FPS Players</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Improves your ability to hold angles and shut down enemies trying to pop-flash or shoulder-peek. Builds extreme scanning and click consistency under box dynamics.
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 border border-gray-800 rounded-lg">
                      <h4 className="font-bold text-white mb-2 font-mono uppercase text-xs">Benefits For Athletes</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Trains broad foveal scanning, eye-hand synchronization, and rapid target tracking across multiple quadrants, enhancing performance in sports like tennis or baseball.
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 border border-gray-800 rounded-lg">
                      <h4 className="font-bold text-white mb-2 font-mono uppercase text-xs">Benefits For Cognitive Training</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Sharpens attention shifting, suppresses distraction, and develops robust decision-making speeds by conditioning visual sorting under pressure.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="What is Barrier Sequence Pursuit?" a="Barrier Sequence Pursuit is a reflex aim drill that isolates cover-peeking detection by spawning targets behind shifting cover barriers, testing your re-acquisition speed." />
                  <FAQItem q="How does this improve reaction time?" a="By training your eyes to detect peripheral movement and execute instant cursor corrections, decreasing your visual-motor processing delay." />
                  <FAQItem q="Does this help FPS gaming?" a="Yes, in shooters like Valorant, CS2, and Apex Legends, players frequently peek from behind boxes and corners. This drill directly translates to catching peeking enemies." />
                  <FAQItem q="Does this improve visual processing speed?" a="Absolutely. By scaling cycles down to fractions of a second, it forces the visual cortex to identify and execute actions on targets with short exposure windows." />
                  <FAQItem q="Is this useful for athletes?" a="Yes. Any sport requiring rapid visual acquisition and eye-hand coordination (such as tennis, baseball, or boxing) benefits from training tracking response and peripheral focus." />
                  <FAQItem q="How does adaptive difficulty work?" a="As your score climbs, targets shrink in size, peeks occur faster, exposure duration decreases, and barrier cycle timing becomes completely unpredictable." />
                  <FAQItem q="Why do targets appear behind barriers?" a="To simulate realistic cover and peeking dynamics in FPS gunfights, conditioning players to anticipate and snap onto target cores at exit boundaries." />
                  <FAQItem q="How often should I train reaction speed?" a="We recommend practicing for 5-10 minutes daily as a cognitive warmup or reflex conditioning routine to establish consistent neurological performance." />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Related Drills Section */}
        {!isFullscreen && !isMobileLandscape && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-amber-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness" desc="Situational target acquisition flicks." color="indigo" icon={<Sliders className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/strafe-tracking" title="Strafe Tracking Pro" desc="Unpredictable dynamic tracking pursuit." color="orange" icon={<Sliders className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Calibrate pulling pattern compensation." color="red" icon={<Activity className="w-4 h-4" />} />
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
                    <li><Link href="/drills/reaction-speed/saccadic-snap" className="hover:text-amber-400 transition-colors">Saccadic Snap</Link></li>
                    <li><Link href="/drills/reaction-speed/reaction-simulator" className="hover:text-amber-400 transition-colors">Reaction Sim</Link></li>
                    <li><Link href="/drills/reaction-speed/stop-and-go-dash" className="hover:text-amber-400 transition-colors">Stop & Go Dash</Link></li>
                    <li><Link href="/drills/reaction-speed" className="text-amber-500 hover:text-amber-400 transition-colors font-bold">All Reaction Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-amber-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-amber-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-amber-500 hover:text-amber-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-amber-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-amber-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-amber-500 hover:text-amber-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-amber-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-amber-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-amber-500 hover:text-amber-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-amber-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-amber-400 transition-colors">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg flex items-center justify-center">
                    <Target className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6 font-sans text-gray-500">
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
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

// === Subcomponents ===

function StatCard({ icon, value, label, unit = '', highlight = false }) {
  return (
    <div className={`group rounded-xl border ${highlight ? 'border-amber-500/50 bg-amber-500/5' : 'border-gray-800 bg-gray-900/50'} p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-700`}>
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

function RuleItem({ num, color, text, highlight = '', result }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    indigo: 'bg-indigo-600 text-indigo-300 border-indigo-500', 
    purple: 'bg-purple-600 text-purple-300 border-purple-500',
    fuchsia: 'bg-fuchsia-600 text-fuchsia-300 border-fuchsia-500',
    gray: 'bg-gray-600 text-gray-300 border-gray-500', 
    green: 'bg-green-600 text-green-300 border-green-500',
    red: 'bg-red-600 text-red-300 border-red-500',
    orange: 'bg-orange-600 text-orange-300 border-orange-500'
  };
  const colors = colorMap[color] || 'bg-slate-600 text-slate-300 border-slate-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-[#0b0f19]/40 p-4 rounded-xl border border-gray-800 shadow-sm">
      <div className={`w-8 h-8 rounded-xl ${bg} border border-t-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0`}>{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-300">
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
      <h3 className="font-bold text-base mb-1.5 text-white transition-colors">{title}</h3>
      <p className="text-xs text-gray-500 mb-4">{desc}</p>
      <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
        Start Drill <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

function FAQItem({ q, a }) {
  return (
    <div className="bg-[#05060b] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
      <h4 className="text-sm font-bold text-gray-200 mb-2">{q}</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{a}</p>
    </div>
  );
}
