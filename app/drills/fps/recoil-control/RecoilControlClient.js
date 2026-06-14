'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import Link from 'next/link';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

import { Activity, AlertCircle, ArrowRight, Award, BarChart3, Calculator, CheckCircle2, ChevronRight, Clock, Cpu, Crosshair, Eye, GraduationCap, Home, Info, Lightbulb, Lock, Maximize2, Minimize2, Moon, Play, RefreshCw, Shield, Sparkles, Star, Sun, Target, Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap } from 'lucide-react';

const DRILL_DURATION = 60;

// Single weapon with increased recoil
const WEAPON_CONFIG = {
  name: "AK-47 (Heavy Recoil)",
  magazine: 30,
  fireRate: 90,
  recoilScale: 2.5, // Increased from 1.6
  pattern: [
    {x: 0, y: 0}, {x: 0, y: -15}, {x: 2, y: -32}, {x: -2, y: -48}, {x: -5, y: -62},
    {x: -8, y: -74}, {x: -6, y: -84}, {x: -2, y: -92}, {x: 5, y: -98}, {x: 12, y: -102},
    {x: 18, y: -104}, {x: 22, y: -104}, {x: 24, y: -104}, {x: 20, y: -104}, {x: 12, y: -104},
    {x: 2, y: -104}, {x: -8, y: -104}, {x: -18, y: -104}, {x: -25, y: -104}, {x: -30, y: -104},
    {x: -33, y: -104}, {x: -30, y: -104}, {x: -22, y: -104}, {x: -14, y: -104}, {x: -3, y: -104},
    {x: 8, y: -104}, {x: 17, y: -104}, {x: 24, y: -104}, {x: 28, y: -104}, {x: 25, y: -104}
  ],
  inaccuracy: 2.0 // Increased from 1.5
};

const FAQ_ITEMS = [
  {
    q: "What is recoil spray control in FPS games?",
    a: "Recoil control (or spray control) is the physical mouse technique used to counter automatic weapon kickback. Players pull down and sweep their mouse in the inverse shape of the weapon's spray pattern to keep bullets concentrated on target."
  },
  {
    q: "Why is recoil training important for competitive players?",
    a: "In competitive shooters like Valorant and CS2, automatic weapons kick upwards and sideways in predefined patterns. Knowing how to compensate for these patterns ensures your multi-shot sprays remain accurate at medium-to-long distances."
  },
  {
    q: "How does the online recoil simulator work?",
    a: "It simulates the exact vertical S-curve and horizontal sway patterns of tactical rifles. Raw mouse input via Pointer Lock API maps your adjustments to compare them against the perfect pattern profile in real time."
  },
  {
    q: "Is this recoil control tool free?",
    a: "Yes, this recoil control lab runs entirely in modern web browsers for free, requiring no software installation or registration."
  }
];

const StatCard = ({ icon, value, label }) => (
  <div className="rounded-xl border p-2 sm:p-3 text-center flex flex-col justify-center h-full bg-slate-950/60 border-slate-900 shadow-sm">
    <div className="mb-1 flex justify-center text-slate-450">{icon}</div>
    <p className="text-lg sm:text-xl font-bold truncate text-white">{value}</p>
    <p className="text-[10px] sm:text-xs truncate text-slate-500 font-mono uppercase tracking-wider">{label}</p>
  </div>
);

const RelatedDrillCard = ({ title, category, href, description, colorClass = "from-red-500 to-orange-500", icon: Icon }) => (
  <Link href={href} className="group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-slate-950/40 border-slate-900 hover:border-red-500/50">
    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClass}`} />
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-red-950/30 flex items-center justify-center text-red-500">
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-450 font-mono font-bold uppercase">{category}</span>
      </div>
      <h3 className="font-bold text-sm mb-1 text-white group-hover:text-red-400 transition-colors">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed mt-2">{description}</p>
      <div className="flex items-center gap-1 mt-3 text-red-500 text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
        Start Drill <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  </Link>
);

export default function RecoilControlClient() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua) || 
                       (navigator.maxTouchPoints > 0 && 
                        window.screen && Math.max(window.screen.width, window.screen.height) < 1024);
      if (isMobile) {
        setShowRotateWarning(true);
        setWarningMessage("This drill cannot be played on mobile phones");
        return;
      }
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
        if (window.innerWidth < 768) {
          setShowRotateWarning(true);
          setWarningMessage("Rotate Your Device");
          return;
        }
      } else {
        if (window.innerHeight < 320) {
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
  
  const [gameState, setGameState] = useState('start');
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("Rotate Your Device");
  const [activeFaq, setActiveFaq] = useState(null);

  const [universalSens, setUniversalSens] = useState(1.0);
  const gameType = 'universal';
  const dpi = 800;
  const inGameSens = universalSens;
  const cmPer360 = (30 / universalSens).toFixed(1);

  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('universalSens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState === 'playing') return;
    try {
      localStorage.setItem('universalSens', universalSens.toString());
    } catch (e) {}
  }, [universalSens, gameState]);

  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined' && document.pointerLockElement) {
        document.exitPointerLock();
      }
    };
  }, []);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [showPatternGuide, setShowPatternGuide] = useState(true);
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const isFiring = useRef(false);
  
  const bulletIndex = useRef(0);
  const lastShotTime = useRef(0);
  const sprayStartTime = useRef(0);
  const recoilOffset = useRef({ x: 0, y: 0 });
  const targetRef = useRef(null);
  const decalsRef = useRef([]);
  
  const scoreRef = useRef(0);
  const timeLeftRef = useRef(DRILL_DURATION);
  const timerIntervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const crosshairInitializedRef = useRef(false);

  const [analytics, setAnalytics] = useState({
    targetsEliminated: 0,
    totalShots: 0,
    headshots: 0,
    bodyshots: 0,
    misses: 0,
    accuracy: 100,
    avgTimeToKill: 0
  });
  
  const analyticsRef = useRef({
    targetsEliminated: 0,
    totalShots: 0,
    headshots: 0,
    bodyshots: 0,
    misses: 0,
    spawnTimes: [],
    killTimes: []
  });

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('start');
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, []);

  useEffect(() => {
    try {
      const savedScore = localStorage.getItem('recoilBestScore');
      if (savedScore) {
        const parsed = parseInt(savedScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) {}
  }, []);

  const initAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch (e) {
      return null;
    }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      
      if (type === 'shoot') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.09);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === 'dink') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2200, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'kill') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      }
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBest = parseInt(localStorage.getItem('recoilBestScore') || '0', 10);
      if (finalScore > currentBest) {
        localStorage.setItem('recoilBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) {}
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const el = pageRef.current;
        if (el?.requestFullscreen) {
          el.requestFullscreen().catch((e) => console.warn("Fullscreen request blocked", e));
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
    const handleFullscreenChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (!active && gameState === 'playing') {
        resetGame();
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [gameState, resetGame]);

  const requestPointerLock = useCallback(() => {
    canvasRef.current?.requestPointerLock();
  }, []);

  const handleCanvasClick = useCallback(() => {
    if (gameState === 'playing' && !document.pointerLockElement) {
      canvasRef.current?.requestPointerLock();
    }
  }, [gameState]);

  useEffect(() => {
    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(locked);
      if (locked) {
        crosshairInitializedRef.current = true;
      } else if (gameState === 'playing') {
        isFiring.current = false;
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, [gameState]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (document.pointerLockElement !== canvasRef.current && !document.pointerLockElement) return;
      const dx = (e.movementX || 0) * universalSens;
      const dy = (e.movementY || 0) * universalSens;
      const c = canvasRef.current;
      if (c) {
        virtualCrosshair.current.x = Math.max(0, Math.min(c.width, virtualCrosshair.current.x + dx));
        virtualCrosshair.current.y = Math.max(0, Math.min(c.height, virtualCrosshair.current.y + dy));
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState === 'playing') {
        if (!pointerLocked) {
          requestPointerLock();
        } else {
          isFiring.current = true;
          sprayStartTime.current = performance.now();
          lastShotTime.current = 0;
          bulletIndex.current = 0;
        }
      }
    };

    const handleMouseUp = (e) => {
      isFiring.current = false;
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gameState, pointerLocked, requestPointerLock]);

  const spawnTarget = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return null;
    
    const pad = 100;
    const tX = Math.random() * (cvs.width - pad * 2) + pad;
    const tY = Math.random() * (cvs.height - pad * 2) + pad;
    
    analyticsRef.current.spawnTimes.push(performance.now());
    
    return {
      x: tX,
      y: tY,
      health: 250, // Increased from 100
      maxHealth: 250
    };
  }, []);

  const fireBullet = useCallback((wp) => {
    if (bulletIndex.current >= wp.magazine) {
      playSound('click');
      isFiring.current = false;
      return;
    }

    const idx = bulletIndex.current;
    const currentRecoil = wp.pattern[idx] || wp.pattern[wp.pattern.length - 1];
    
    let rx = 0;
    let ry = 0;
    
    if (idx > 0) {
      const prevRecoil = wp.pattern[idx - 1];
      rx = (currentRecoil.x - prevRecoil.x) * wp.recoilScale;
      ry = (currentRecoil.y - prevRecoil.y) * wp.recoilScale;
    } else {
      rx = currentRecoil.x * wp.recoilScale;
      ry = currentRecoil.y * wp.recoilScale;
    }
    
    recoilOffset.current.x += rx;
    recoilOffset.current.y += ry;
    
    virtualCrosshair.current.x += rx;
    virtualCrosshair.current.y += ry;
    
    const bloomAngle = Math.random() * Math.PI * 2;
    const bloomDist = Math.random() * wp.inaccuracy;
    
    const bulletX = virtualCrosshair.current.x + Math.cos(bloomAngle) * bloomDist;
    const bulletY = virtualCrosshair.current.y + Math.sin(bloomAngle) * bloomDist;
    
    playSound('shoot');
    analyticsRef.current.totalShots++;
    
    const target = targetRef.current;
    let hitType = 'miss';
    
    if (target) {
      const headDist = Math.hypot(bulletX - target.x, bulletY - (target.y - 25));
      const inChestX = Math.abs(bulletX - target.x) <= 18;
      const inChestY = bulletY >= (target.y - 5) && bulletY <= (target.y + 35);
      const inLimbsX = Math.abs(bulletX - target.x) <= 12;
      const inLimbsY = bulletY > (target.y + 35) && bulletY <= (target.y + 65);
      
      if (headDist <= 12) {
        hitType = 'head';
        target.health -= 100;
        analyticsRef.current.headshots++;
        playSound('dink');
      } else if (inChestX && inChestY) {
        hitType = 'chest';
        target.health -= 25; // Reduced damage for body shots
        analyticsRef.current.bodyshots++;
      } else if (inLimbsX && inLimbsY) {
        hitType = 'limbs';
        target.health -= 12; // Reduced damage for limb shots
        analyticsRef.current.bodyshots++;
      } else {
        analyticsRef.current.misses++;
      }
      
      if (target.health <= 0) {
        playSound('kill');
        scoreRef.current++;
        setScore(scoreRef.current);
        analyticsRef.current.targetsEliminated++;
        analyticsRef.current.killTimes.push(performance.now());
        
        targetRef.current = spawnTarget();
        decalsRef.current = [];
      }
    } else {
      analyticsRef.current.misses++;
    }
    
    decalsRef.current.push({
      x: bulletX,
      y: bulletY,
      time: performance.now(),
      type: hitType
    });
    
    bulletIndex.current++;
  }, [playSound, spawnTarget]);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    timeLeftRef.current = DRILL_DURATION;
    setTimeLeft(DRILL_DURATION);
    
    timerIntervalRef.current = setInterval(() => {
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);
      
      if (timeLeftRef.current <= 0) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        setGameState('gameOver');
        document.exitPointerLock();
        updateBestScore(scoreRef.current);
        
        try {
          recordDrillResult('recoil-control', {
            score: scoreRef.current,
            accuracy: null,
            reactionTimeMs: null,
            trackingAccuracy: null,
            comboMax: 0,
            overshoots: 0,
            undershoots: 0,
            sensitivity: inGameSens,
            dpi,
            gameType,
            duration: DRILL_DURATION
          });
        } catch (e) {}
        
        const tShots = analyticsRef.current.totalShots || 1;
        const totalHits = analyticsRef.current.headshots + analyticsRef.current.bodyshots;
        
        let totalTtk = 0;
        let killCount = 0;
        for (let i = 0; i < analyticsRef.current.killTimes.length; i++) {
          if (analyticsRef.current.spawnTimes[i]) {
            totalTtk += (analyticsRef.current.killTimes[i] - analyticsRef.current.spawnTimes[i]) / 1000;
            killCount++;
          }
        }
        
        setAnalytics({
          targetsEliminated: analyticsRef.current.targetsEliminated,
          totalShots: analyticsRef.current.totalShots,
          headshots: analyticsRef.current.headshots,
          bodyshots: analyticsRef.current.bodyshots,
          misses: analyticsRef.current.misses,
          accuracy: Math.round((totalHits / tShots) * 100),
          avgTimeToKill: killCount > 0 ? (totalTtk / killCount).toFixed(2) : 0
        });
      }
    }, 1000);
  }, [updateBestScore]);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    try {
      const el = pageRef.current;
      if (el && !document.fullscreenElement) {
        el.requestFullscreen().catch((e) => console.warn("Fullscreen request blocked", e));
        setIsFullscreen(true);
      }
    } catch (e) {
      console.warn("Fullscreen request blocked", e);
    }

    setGameState('playing');
    setScore(0);
    scoreRef.current = 0;
    
    analyticsRef.current = {
      targetsEliminated: 0,
      totalShots: 0,
      headshots: 0,
      bodyshots: 0,
      misses: 0,
      spawnTimes: [],
      killTimes: []
    };
    
    decalsRef.current = [];
    recoilOffset.current = { x: 0, y: 0 };
    isFiring.current = false;
    bulletIndex.current = 0;
    
    targetRef.current = spawnTarget();
    startTimer();
    
    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitializedRef.current = true;
  }, [startTimer, requestPointerLock, spawnTarget]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    
    const updateSize = () => {
      const cr = containerRef.current;
      if (!cr) return;
      const rect = cr.getBoundingClientRect();
      
      let w = rect.width;
      let h = w * (9 / 16);
      if (h > rect.height) {
        h = rect.height;
        w = h * (16 / 9);
      }
      cvs.width = w;
      cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rect.width - w) / 2}px`;
      cvs.style.top = `${(rect.height - h) / 2}px`;
      
      if (w > 0 && h > 0 && !crosshairInitializedRef.current) {
        virtualCrosshair.current = { x: w / 2, y: h / 2 };
        crosshairInitializedRef.current = true;
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    let lastFrameTime = performance.now();
    
    const wp = WEAPON_CONFIG;
    
    const run = (timestamp) => {
      if (gameState !== 'playing') return;
      
      let dt = (timestamp - lastFrameTime) / 1000;
      lastFrameTime = timestamp;
      if (dt > 0.1) dt = 0.1;
      
      if (isFiring.current) {
        const timeSinceStart = timestamp - sprayStartTime.current;
        const nextShotDue = bulletIndex.current * wp.fireRate;
        
        if (timeSinceStart >= nextShotDue) {
          fireBullet(wp);
        }
      } else {
        const recoveryRate = 12.0;
        const decayX = recoilOffset.current.x * (1 - Math.exp(-recoveryRate * dt));
        const decayY = recoilOffset.current.y * (1 - Math.exp(-recoveryRate * dt));
        
        recoilOffset.current.x -= decayX;
        recoilOffset.current.y -= decayY;
        
        virtualCrosshair.current.x -= decayX;
        virtualCrosshair.current.y -= decayY;
      }
      
      ctx.fillStyle = '#080d1a';
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Grid
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.04)';
      ctx.lineWidth = 1;
      const gSpacing = 60;
      for (let x = 0; x < cvs.width; x += gSpacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, cvs.height); ctx.stroke();
      }
      for (let y = 0; y < cvs.height; y += gSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cvs.width, y); ctx.stroke();
      }
      
      // Target
      const target = targetRef.current;
      if (target) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.15)';
        
        // Torso
        ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        const rx = target.x - 17.5;
        const ry = target.y - 5;
        const rw = 35;
        const rh = 40;
        const radius = 8;
        ctx.moveTo(rx + radius, ry);
        ctx.lineTo(rx + rw - radius, ry);
        ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + radius);
        ctx.lineTo(rx + rw, ry + rh - radius);
        ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - radius, ry + rh);
        ctx.lineTo(rx + radius, ry + rh);
        ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - radius);
        ctx.lineTo(rx, ry + radius);
        ctx.quadraticCurveTo(rx, ry, rx + radius, ry);
        ctx.closePath();
        ctx.fill(); ctx.stroke();
        
        // Head
        ctx.beginPath();
        ctx.arc(target.x, target.y - 25, 12, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        
        // Legs
        ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.beginPath();
        ctx.rect(target.x - 12.5, target.y + 35, 25, 30);
        ctx.fill(); ctx.stroke();
        
        ctx.shadowBlur = 0;
        
        // Health bar
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(target.x - 25, target.y - 55, 50, 5);
        
        const healthPercent = Math.max(0, target.health / target.maxHealth);
        ctx.fillStyle = healthPercent > 0.5 ? '#ef4444' : healthPercent > 0.25 ? '#f59e0b' : '#22c55e';
        ctx.fillRect(target.x - 25, target.y - 55, 50 * healthPercent, 5);
      }
      
      // Spray pattern guide
      if (showPatternGuide && target) {
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.12)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        
        ctx.beginPath();
        wp.pattern.forEach((pt, i) => {
          const x = target.x + pt.x * wp.recoilScale;
          const y = target.y + pt.y * wp.recoilScale;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
        ctx.setLineDash([]);
        
        if (isFiring.current && bulletIndex.current < wp.pattern.length) {
          const pt = wp.pattern[bulletIndex.current];
          ctx.fillStyle = 'rgba(0, 255, 136, 0.5)';
          ctx.beginPath();
          ctx.arc(target.x + pt.x * wp.recoilScale, target.y + pt.y * wp.recoilScale, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Bullet holes
      decalsRef.current.forEach((d) => {
        const age = timestamp - d.time;
        const opacity = Math.max(0.1, 1 - (age / 8000));
        
        if (d.type === 'head') {
          ctx.fillStyle = `rgba(0, 255, 136, ${opacity})`;
        } else if (d.type === 'chest' || d.type === 'limbs') {
          ctx.fillStyle = `rgba(239, 68, 68, ${opacity})`;
        } else {
          ctx.fillStyle = `rgba(255, 187, 0, ${opacity})`;
        }
        
        ctx.beginPath();
        ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Crosshair
      {
        const ch = virtualCrosshair.current;
        if (ch && ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
          const activeColor = pointerLocked ? '#00ff88' : '#ffbb00';
          ctx.strokeStyle = activeColor;
          
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ch.x, ch.y, 16, 0, Math.PI * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.lineWidth = 1.5;
          const innerGap = 6;
          ctx.moveTo(ch.x, ch.y - 16); ctx.lineTo(ch.x, ch.y - innerGap);
          ctx.moveTo(ch.x, ch.y + 16); ctx.lineTo(ch.x, ch.y + innerGap);
          ctx.moveTo(ch.x - 16, ch.y); ctx.lineTo(ch.x - innerGap, ch.y);
          ctx.moveTo(ch.x + 16, ch.y); ctx.lineTo(ch.x + innerGap, ch.y);
          ctx.stroke();
          
          ctx.fillStyle = activeColor;
          ctx.beginPath(); ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2); ctx.fill();
        }
      }
      
      animationRef.current = requestAnimationFrame(run);
    };
    
    animationRef.current = requestAnimationFrame(run);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [gameState, pointerLocked, showPatternGuide, fireBullet]);

  const avgTTK = analytics.avgTimeToKill;
  
  const displayScore = score;
  const displayBest = bestScore;
  const displayTime = `${timeLeft}s`;
  const displayAccuracy = gameState === 'gameOver' ? `${analytics.accuracy}%` : '100%';
  const displayCombo = 0;
  const displayMaxCombo = 0;
  const displayReaction = '-';
  const displaySens = `${universalSens.toFixed(2)}x`;
  const handleResetClick = resetGame;

  return (
    <div ref={pageRef} className="min-h-screen select-none font-sans bg-black text-slate-100 relative overflow-hidden">
      
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/10 via-black to-black pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(239,68,68,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(239,68,68,0.015)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      <div className={isFullscreen ? "w-full h-screen p-0 m-0" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10"}>
        
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
              <li><Link href="/" className="hover:text-red-400 transition-colors">HQ</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/drills/fps" className="hover:text-red-400 transition-colors">FPS Sector</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-red-500" aria-current="page">Recoil Spray Control Lab</li>
            </ol>
          </nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl flex-shrink-0">
                <Crosshair className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Recoil Spray Control Lab</h1>
                <p className="text-sm text-slate-400 mt-1">
                  {pointerLocked ? "🟢 RAW INPUT CAPTURING" : "🔴 CLICK CANVAS TO CAPTURE"} • Pro FPS aim training mechanics
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {gameState === "playing" && (
                <button onClick={handleResetClick} className="p-2 rounded-lg border border-slate-900 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-800 transition-all hover:scale-105 active:scale-95" title="Reset Session">
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 rounded-lg border border-slate-900 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-800 transition-all hover:scale-105 active:scale-95" title={soundEnabled ? "Mute Sounds" : "Enable Sounds"}>
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className="p-2 rounded-lg border border-slate-900 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-800 transition-all hover:scale-105 active:scale-95" title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

        {!isFullscreen && (
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3 mb-6 h-auto min-h-[88px] py-1">
            <StatCard icon={<Target className="text-red-500 w-5 h-5" />} value={displayScore} label="Score" />
            <StatCard icon={<Trophy className="text-yellow-500 w-5 h-5" />} value={displayBest} label="Best" />
            <StatCard icon={<Timer className="text-green-500 w-5 h-5" />} value={displayTime} label="Time" />
            <StatCard icon={<BarChart3 className="text-purple-500 w-5 h-5" />} value={displayAccuracy} label="Accuracy" />
            <StatCard icon={<Zap className="text-orange-500 w-5 h-5" />} value={displayCombo} label="Combo" />
            <StatCard icon={<Star className="text-yellow-400 w-5 h-5" />} value={displayMaxCombo} label="Max Combo" />
            <StatCard icon={<Clock className="text-blue-500 w-5 h-5" />} value={displayReaction} label="Avg Reaction" />
            <StatCard icon={<Crosshair className="text-green-400 w-5 h-5" />} value={displaySens} label="Sens" />
          </div>
        )}

        <div className={isFullscreen ? "w-full h-full" : "block"}>
          <div 
            ref={containerRef} 
            className={isFullscreen 
              ? "w-full h-full bg-black relative overflow-hidden flex items-center justify-center cursor-none" 
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-black border border-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center cursor-none"}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />
            
            {gameState === 'start' && (
              <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
                    <div>
                      <h3 className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                        <Info className="w-4 h-4" />
                        DRILL PROTOCOLS
                      </h3>
                      <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">1.</span>
                          <span>Hold down left-click to begin firing. The AK-47 spray recoil will push your crosshair heavily upward and sideways.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">2.</span>
                          <span>Counter-steer the climb! Pull down and sweep your mouse opposite to the recoil pattern to keep bullets on target.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">3.</span>
                          <span>Targets have 250HP. Headshots deal 100 damage, chest hits 25, limb hits 12. Requires sustained accuracy!</span>
                        </li>
                        <li className="flex items-start gap-2 text-green-400">
                          <span className="text-green-400 font-bold">★</span>
                          <span>Practice full 30-round magazine sprays. The ghost line shows the expected bullet path.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-900 text-[10px] text-slate-500 leading-normal">
                      AK-47 Heavy Recoil • 250HP Targets • 30 Round Magazine
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                        <Cpu className="w-4 h-4 text-red-400" />
                        RECOIL CALIBRATION
                      </h3>
                      
                      <div className="mb-6 p-4 bg-black/45 rounded border border-slate-900">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Universal Sens</label>
                          <span className="text-green-400 font-mono text-xs font-bold">{universalSens.toFixed(2)}x</span>
                        </div>
                        <input 
                          type="range" min="0.1" max="3.0" step="0.05" 
                          value={universalSens} 
                          onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500" 
                        />
                      </div>

                      <div className="p-4 bg-black/80 rounded border border-slate-900 flex justify-between items-center text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase">Matched 360 Distance</span>
                          <span className="text-white font-bold text-sm">{cmPer360} cm</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block uppercase">Weapon</span>
                          <span className="text-red-400 font-bold">AK-47 Heavy Recoil</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-900 pt-6">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Personal Best Record</span>
                        <span className="text-white font-bold text-lg flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          {bestScore} Kills
                        </span>
                      </div>
                      
                      <button
                        onClick={startGame}
                        className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 uppercase tracking-wider transition"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        Initiate Spray Control Lab
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
                <div className="bg-[#0c1224]/80 border border-slate-900 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto">
                  <h2 className="text-xl font-bold text-red-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    LAB REPORT: RECOIL RESULTS
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <div className="bg-black p-4 rounded border border-slate-900">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 uppercase">Targets Eliminated</span>
                          <span className="text-white font-bold text-lg">{analytics.targetsEliminated} Kills</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black p-3 rounded border border-slate-900 text-center">
                          <span className="text-[10px] text-slate-500 block uppercase">Total Shots</span>
                          <span className="text-white font-bold text-sm">{analytics.totalShots}</span>
                        </div>
                        <div className="bg-black p-3 rounded border border-slate-900 text-center">
                          <span className="text-[10px] text-slate-500 block uppercase">Spray Accuracy</span>
                          <span className="text-white font-bold text-sm">{analytics.accuracy}%</span>
                        </div>
                      </div>

                      <div className="bg-black p-4 rounded border border-slate-900">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-slate-500 uppercase">Average Time-to-Kill</span>
                          <span className="text-red-400 font-bold">{avgTTK}s</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-black p-4 rounded border border-slate-900">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                          HITBOX LANDINGS
                        </h4>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Headshots (100 DMG):</span>
                            <span className="text-green-400 font-bold">{analytics.headshots}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Body Hits:</span>
                            <span className="text-blue-400 font-bold">{analytics.bodyshots}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Misses:</span>
                            <span className="text-red-500 font-bold">{analytics.misses}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
                    <button
                      onClick={startGame}
                      className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Retrain Spray
                    </button>
                    <Link href="/drills/fps" className="w-full sm:w-auto">
                      <button className="w-full px-6 py-2.5 bg-slate-900 border border-slate-900 hover:border-slate-700 text-slate-350 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition">
                        Return to Sector
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DRILL RULES & PRO FEATURES */}
        {!isFullscreen && (
          <footer className="mt-8">
            <div className="rounded-xl border border-slate-900 bg-slate-950/40 overflow-hidden backdrop-blur-md">
              <div className="px-5 py-4 border-b border-slate-900 bg-slate-950/60 flex items-center gap-2">
                <Info className="w-4 h-4 text-red-500" />
                <h2 className="font-bold text-sm text-white">
                  Drill Rules & Professional Features
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400">
                  <div className="space-y-3">
                    <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Crosshair className="w-4 h-4 text-red-500" />
                      How to Play
                    </h3>
                    <ol className="space-y-2 list-decimal pl-4">
                      <li>Click <span className="text-white">Launch Fullscreen Training</span> to begin.</li>
                      <li>Allow browser to lock cursor for <span className="text-red-400">1:1 raw mouse input</span>.</li>
                      <li>Hold left-click to spray. Pull mouse down and counter-sway the recoil.</li>
                      <li>Eliminate targets to maximize score. Headshots deal 100 damage.</li>
                    </ol>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      Scoring
                    </h3>
                    <ul className="space-y-2 list-disc pl-4">
                      <li><span className="text-red-400 font-bold">Kills</span>: Each eliminated target adds 1 point.</li>
                      <li><span className="text-green-400 font-bold">Headshots</span>: Critical 100 damage for instant kills.</li>
                      <li><span className="text-slate-300 font-bold">Accuracy</span>: Tracked for precision benchmarking.</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-500" />
                      Pro Features
                    </h3>
                    <ul className="space-y-2 list-disc pl-4">
                      <li><span className="text-red-400">Pointer Lock API</span> locks cursor to capture raw input.</li>
                      <li><span className="text-blue-400">Recoil Physics</span>: Real weapon pattern simulation.</li>
                      <li><span className="text-purple-400">Spray Guide</span>: Ghost line shows expected bullet path.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}

        {/* ABOUT DRILL */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="About this recoil trainer">
            <div className="rounded-xl border border-slate-900 bg-slate-950/40 overflow-hidden backdrop-blur-md">
              <div className="px-5 py-4 border-b border-slate-900 bg-slate-950/60 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-red-500" />
                <h2 className="font-bold text-sm text-white uppercase tracking-wider font-mono">
                  Recoil Control & Spray Simulator Training Guide
                </h2>
              </div>
              <div className="p-6 space-y-8">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-5 rounded-xl border border-slate-900 bg-slate-950/20">
                    <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest font-mono mb-2">What This Drill Trains</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      The Esports Recoil Spray Control Lab trains muscle memory for weapon spray pattern compensation. Automatic weapons generate recoil kickback, causing bullets to climb vertically and drift horizontally in predetermined paths. This drill isolates and trains the counter-movements required to keep your weapon's bullet grouping tightly concentrated on target.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl border border-slate-900 bg-slate-950/20">
                    <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest font-mono mb-2">How to Practice Effectively</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Click and hold left click on the target to initiate a continuous spray. Pull down and sway your mouse in the inverse shape of the weapon's spray path. Follow the ghost pattern outline for guidance. Targets have 250HP - headshots deal 100 damage, requiring sustained accuracy for eliminations.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl border border-slate-900 bg-slate-950/20">
                    <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest font-mono mb-2">Reflex & Focus Benefits</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Mastering recoil patterns provides a massive competitive advantage during spray transfers and long-range duels. The simulator's real-time accuracy telemetry quantifies your progression, helping identify over-compensation or under-compensation at specific stages of the magazine.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-900 pt-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                    <Info className="w-4 h-4 text-red-500" />
                    Frequently Asked Questions (FAQ)
                  </h3>
                  <div className="space-y-3">
                    {FAQ_ITEMS.map((item, idx) => {
                      const isOpen = activeFaq === idx;
                      return (
                        <div key={idx} className="border border-slate-900 rounded-lg overflow-hidden bg-slate-950/10">
                          <button
                            onClick={() => setActiveFaq(isOpen ? null : idx)}
                            className="w-full px-5 py-3.5 text-left flex items-center justify-between text-xs font-bold font-mono text-slate-200 hover:text-white hover:bg-slate-950/30 transition-all"
                            aria-expanded={isOpen}
                          >
                            <span>{item.q}</span>
                            <span className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-90 text-red-500' : 'text-slate-500'}`}>▶</span>
                          </button>
                          {isOpen && (
                            <div className="px-5 py-4 border-t border-slate-900/60 bg-slate-950/5 text-[11px] text-slate-400 leading-relaxed">
                              {item.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-red-500"></div>
              <h2 className="text-xl font-bold text-white">
                Explore Related Drills
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-450 font-mono font-bold uppercase">
                8 Drills
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedDrillCard 
                title="Aim Trainer" 
                category="Motor Sector" 
                href="/drills/motor/hand-eye-coordination/aim-trainer" 
                description="Hone spatial coordinate click speed."
                icon={Target}
                colorClass="from-blue-500 to-indigo-500"
              />
              <RelatedDrillCard 
                title="Click Accuracy" 
                category="Motor Sector" 
                href="/drills/motor/hand-eye-coordination/click-accuracy" 
                description="Develop micro-click spatial accuracy."
                icon={Target}
                colorClass="from-blue-500 to-indigo-500"
              />
              <RelatedDrillCard 
                title="Reflex Grade" 
                category="Visual Tracking" 
                href="/drills/visual-tracking/reaction-simulator" 
                description="Test visual stimulus identification speed."
                icon={Timer}
                colorClass="from-cyan-500 to-blue-500"
              />
              <RelatedDrillCard 
                title="Saccadic Calibration" 
                category="Visual Tracking" 
                href="/drills/visual-tracking/saccadic-snap" 
                description="Optimize saccadic gaze acquisition limits."
                icon={Eye}
                colorClass="from-cyan-500 to-blue-500"
              />
              <RelatedDrillCard 
                title="180° Awareness" 
                category="FPS Sector" 
                href="/drills/fps/180-degree-awareness" 
                description="Alternate snapping between opposite horizons."
                icon={Eye}
                colorClass="from-red-500 to-orange-500"
              />
              <RelatedDrillCard 
                title="Angle Hold Trainer" 
                category="FPS Sector" 
                href="/drills/fps/angle-hold-trainer" 
                description="Hone tactical crosshair placement holds."
                icon={Shield}
                colorClass="from-red-500 to-orange-500"
              />
              <RelatedDrillCard 
                title="Counter Strafe" 
                category="FPS Sector" 
                href="/drills/fps/counter-strafe-trainer" 
                description="Coordinate movement deadzones and firing accuracy."
                icon={Zap}
                colorClass="from-red-500 to-orange-500"
              />
              <RelatedDrillCard 
                title="Flick Shot Trainer" 
                category="FPS Sector" 
                href="/drills/fps/flick-shot-training" 
                description="Raw input flick training with adaptive target windows."
                icon={Crosshair}
                colorClass="from-red-500 to-orange-500"
              />
            </div>
          </section>
        )}

        {/* FOOTER */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-red-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-red-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-red-450 hover:text-red-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-red-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-red-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-red-450 hover:text-red-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-red-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-red-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-red-455 hover:text-red-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-red-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-red-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-red-450 hover:text-red-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-red-400 transition-colors">Visual (14)</Link></li>
                    <li><Link href="/drills/productivity" className="hover:text-red-400 transition-colors">Productivity (10)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-red-400 transition-colors">Mental Fitness (6)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-red-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500/25 to-orange-500/25 border border-red-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
                  Open-source telemetry training platform using hardware pointer lock. Free forever. No downloads required.
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap text-slate-500">
                  <button onClick={() => { if (typeof window !== "undefined" && navigator.share) { navigator.share({ title: document.title, url: window.location.href }).catch(() => {}); } }} className="hover:text-white transition-colors">Share Page</button>
                  <button onClick={() => { if (typeof window !== "undefined") { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); } }} className="hover:text-white transition-colors">Copy Link</button>
                  <a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter X</a>
                  <a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Pinterest</a>
                </div>
              </div>
            </div>
          </footer>
        )}

      </div>
    </div>
  );
}