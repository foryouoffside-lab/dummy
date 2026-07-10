'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Maximize2, Minimize2, Sun, Moon, 
  Eye, Volume2, VolumeX, Info, Activity, Target, Clock, Timer,
  Trophy, Zap, RefreshCw, GraduationCap, Lightbulb, TrendingUp, 
  BarChart3, CheckCircle2, Star, ArrowRight, Share2, Copy,
  Brain, Lock, RotateCcw, XCircle, LogOut, Play, Search, Layers ,ChevronRight,Users, Sparkles
} from 'lucide-react';
import PlayAgainButton from "../../../../../components/PlayAgainButton";

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
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  playHit() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  playMiss() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth'; 
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
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
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch(e) {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

export default function SwitchCostIntegratorClient() {
  // === UI & Environment State ===
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // === Game State (Visual Sync) ===
  const [gameState, setGameState] = useState('start'); 
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60.0);
  const [level, setLevel] = useState(1);
  const [highestLevelReached, setHighestLevelReached] = useState(1);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [feedback, setFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Absolute Truth Refs (Zero-Latency Logic) ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const crosshairInitRef = useRef(false);
  
  const gameStateRef = useRef('start'); // FIXED: Added missing Ref declaration
  const scoreRef = useRef(0);
  const timeRef = useRef(60.0);
  const levelRef = useRef(1);
  const highestLevelRef = useRef(1);
  const hitsRef = useRef(0);
  const missRef = useRef(0);
  const effectiveHitsRef = useRef(0); // Used for dynamic difficulty sliding
  const isActiveRef = useRef(false);

  const gameDataRef = useRef({
    orb: { x: 0, y: 0, targetX: 0, targetY: 0, mode: 'direct' },
    isOrbActive: false,
    currentInterval: 1000,
  });

  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const orbTimeoutRef = useRef(null);

  // === Init & Hydration ===
  useEffect(() => { 
    setIsClient(true); 
    const t = setTimeout(() => setLoading(false), 100); 
    return () => clearTimeout(t); 
  }, []);

  useEffect(() => { 
    try { 
      const s = localStorage.getItem('switchCostBestScoreV5'); 
      if (s) setBestScore(parseInt(s, 10)); 
    } catch (e) {} 
  }, []);

  // === Viewport & Mobile Logic ===
  useEffect(() => {
    const checkOrientationAndSize = () => {
      if (typeof window === 'undefined') return;
      const mobileCheck = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(mobileCheck);
      
      if (!mobileCheck) { 
        setShowRotateWarning(false); 
        setIsMobileLandscape(false);
        return; 
      }
      
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
          setShowRotateWarning(true);
          setIsMobileLandscape(false);
      } else {
          setShowRotateWarning(false);
          setIsMobileLandscape(true); 
      }
    };
    checkOrientationAndSize();
    window.addEventListener('resize', checkOrientationAndSize);
    window.addEventListener('orientationchange', checkOrientationAndSize);
    return () => {
      window.removeEventListener('resize', checkOrientationAndSize);
      window.removeEventListener('orientationchange', checkOrientationAndSize);
    };
  }, []);

  // === Pointer Lock Logic ===
  useEffect(() => {
    const handlePointerLockChange = () => setIsPointerLocked(!!document.pointerLockElement);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  const requestPointerLock = useCallback(async () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      if (canvasRef.current && document.pointerLockElement !== canvasRef.current) {
        try { await canvasRef.current.requestPointerLock(); } catch (e) {}
      }
    }
  }, []);

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen && containerRef.current) {
        await containerRef.current.requestFullscreen();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (e) {} 
  }, [isFullscreen]);

  useEffect(() => { 
    const h = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', h); 
    return () => document.removeEventListener('fullscreenchange', h); 
  }, []);

  const handleExit = useCallback(async () => {
    if (document.fullscreenElement) {
      try { await document.exitFullscreen(); } catch (e) {}
    }
    resetGame();
  }, []);

  // === Audio & Feedback System ===
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback(prev => ({ ...prev, visible: false }));
    }, 600);
  }, []);

  // === Dynamic Difficulty Scaling ===
  const updateDifficulty = useCallback(() => {
    const newLevel = Math.floor(scoreRef.current / 50) + 1;
    
    if (newLevel > levelRef.current) {
      if (audioSynth) audioSynth.playLevelUp();
      triggerFeedback(`⚡ Speed Up! Level ${newLevel}`, 'warning');
    }
    
    levelRef.current = newLevel;
    setLevel(newLevel);
    highestLevelRef.current = Math.max(highestLevelRef.current, newLevel);
    setHighestLevelReached(highestLevelRef.current);

    // Scale Speed (1000ms down to tightly bound minimum of 300ms based on score up to 300 points)
    const progress = Math.min(1, scoreRef.current / 300);
    gameDataRef.current.currentInterval = Math.max(300, Math.floor(1000 - (progress * 700)));
  }, [triggerFeedback]);

  // === Game Mechanics ===
  const endGame = useCallback(() => {
    isActiveRef.current = false;
    gameStateRef.current = 'gameOver';
    setGameState('gameOver');
    
    if (scoreRef.current > bestScore) {
      setBestScore(scoreRef.current);
      try { localStorage.setItem('switchCostBestScoreV5', scoreRef.current.toString()); } catch (e) {}
    }
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (orbTimeoutRef.current) clearTimeout(orbTimeoutRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (document.pointerLockElement) document.exitPointerLock();
  }, [bestScore]);

  const applyHit = useCallback(() => {
    if (!isActiveRef.current) return;
    if (audioSynth) audioSynth.playHit();
    
    scoreRef.current += 10;
    timeRef.current = Math.min(60.0, timeRef.current + 2.0); // FIXED: Changed to +2s
    hitsRef.current += 1;
    
    setScore(scoreRef.current);
    setTimeLeft(timeRef.current);
    setSuccessfulHits(hitsRef.current);
    
    updateDifficulty();
    triggerFeedback('Perfect! +10 PTS | +2s', 'success'); // FIXED: Feedback matches 2s
    
    const total = hitsRef.current + missRef.current;
    if (total > 0) setAccuracy(Math.round((hitsRef.current / total) * 100));
  }, [triggerFeedback, updateDifficulty]);

  const applyPenalty = useCallback((reason) => {
    if (!isActiveRef.current) return;
    if (audioSynth) audioSynth.playMiss();
    
    timeRef.current -= 2.0;
    missRef.current += 1;
    
    setScore(scoreRef.current);
    setTimeLeft(timeRef.current);
    setMisses(missRef.current);
    
    updateDifficulty();
    triggerFeedback(`Penalty! ${reason} -2s`, 'error');
    
    const total = hitsRef.current + missRef.current;
    if (total > 0) setAccuracy(Math.round((hitsRef.current / total) * 100));
    
    if (timeRef.current <= 0) {
      setTimeLeft(0);
      endGame();
    }
  }, [triggerFeedback, endGame, updateDifficulty]);

  // === 8-Point Spawning Engine ===
  const spawnOrb = useCallback(() => {
    if (!isActiveRef.current) return;
    if (orbTimeoutRef.current) clearTimeout(orbTimeoutRef.current);
    
    const cvs = canvasRef.current;
    if (!cvs) return;

    const paddingX = isMobile ? 60 : 150; 
    const paddingY = isMobile ? 80 : 120;
    const centerX = cvs.width / 2;
    const centerY = cvs.height / 2;

    const positions = [
      { x: paddingX, y: paddingY }, // Top-Left
      { x: centerX, y: paddingY }, // Top-Center
      { x: cvs.width - paddingX, y: paddingY }, // Top-Right
      { x: paddingX, y: centerY }, // Mid-Left
      { x: cvs.width - paddingX, y: centerY }, // Mid-Right
      { x: paddingX, y: cvs.height - paddingY }, // Bottom-Left
      { x: centerX, y: cvs.height - paddingY }, // Bottom-Center
      { x: cvs.width - paddingX, y: cvs.height - paddingY } // Bottom-Right
    ];

    const pos = positions[Math.floor(Math.random() * positions.length)];
    const mode = Math.random() > 0.5 ? 'opposite' : 'direct';
    
    gameDataRef.current.orb.mode = mode;
    gameDataRef.current.orb.x = pos.x;
    gameDataRef.current.orb.y = pos.y;
    
    if (mode === 'opposite') {
      gameDataRef.current.orb.targetX = cvs.width - pos.x;
      gameDataRef.current.orb.targetY = cvs.height - pos.y;
    } else {
      gameDataRef.current.orb.targetX = pos.x;
      gameDataRef.current.orb.targetY = pos.y;
    }
    
    gameDataRef.current.isOrbActive = true;
    
    orbTimeoutRef.current = setTimeout(() => { 
      if (isActiveRef.current && gameDataRef.current.isOrbActive) {
        gameDataRef.current.isOrbActive = false;
        applyPenalty('TIMEOUT');
        setTimeout(() => { if (isActiveRef.current) spawnOrb(); }, 150);
      }
    }, gameDataRef.current.currentInterval);
  }, [isMobile, applyPenalty]);

  // === Interaction Handling ===
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;

    const handlePointerMove = (e) => {
      if (gameState !== 'playing') return;
      if (document.pointerLockElement === cvs) {
        virtualCrosshair.current.x = Math.max(0, Math.min(cvs.width, virtualCrosshair.current.x + e.movementX));
        virtualCrosshair.current.y = Math.max(0, Math.min(cvs.height, virtualCrosshair.current.y + e.movementY));
      } else {
        const rect = cvs.getBoundingClientRect();
        const scaleX = cvs.width / cvs.clientWidth;
        const scaleY = cvs.height / cvs.clientHeight;
        virtualCrosshair.current.x = Math.max(0, Math.min(cvs.width, (e.clientX - rect.left) * scaleX));
        virtualCrosshair.current.y = Math.max(0, Math.min(cvs.height, (e.clientY - rect.top) * scaleY));
      }
    };

    const handlePointerDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState !== 'playing' || !crosshairInitRef.current || !isActiveRef.current) return;
      
      if (!gameDataRef.current.isOrbActive) {
        applyPenalty('EARLY CLICK');
        return;
      }

      let clickX = virtualCrosshair.current.x;
      let clickY = virtualCrosshair.current.y;

      if (e.pointerType === 'touch' || !isPointerLocked) {
        const rect = cvs.getBoundingClientRect();
        const scaleX = cvs.width / cvs.clientWidth;
        const scaleY = cvs.height / cvs.clientHeight;
        clickX = (e.clientX - rect.left) * scaleX;
        clickY = (e.clientY - rect.top) * scaleY;
        
        virtualCrosshair.current.x = clickX;
        virtualCrosshair.current.y = clickY;
      }

      const targetDist = Math.hypot(clickX - gameDataRef.current.orb.targetX, clickY - gameDataRef.current.orb.targetY);
      const hitRadius = isMobile ? 55 : 35; 

      gameDataRef.current.isOrbActive = false;
      if (orbTimeoutRef.current) clearTimeout(orbTimeoutRef.current);

      if (targetDist <= hitRadius) {
        applyHit();
      } else {
        applyPenalty('WRONG TARGET');
      }

      setTimeout(() => { if (isActiveRef.current) spawnOrb(); }, 150);
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [gameState, isPointerLocked, isMobile, applyHit, applyPenalty, spawnOrb]);

  // === Canvas Render Engine ===
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return; 
    const ctx = cvs.getContext('2d', { alpha: false });
    
    const updateCanvasSize = () => {
      const cr = containerRef.current; if (!cr) return;
      const rr = cr.getBoundingClientRect();
      let w = rr.width, h = rr.height;
      
      // Enforce 16:9 ONLY if not in fullscreen mode
      if (!document.fullscreenElement) {
        h = w * (9 / 16);
        if (h > rr.height) { h = rr.height; w = h * (16 / 9); }
      }
      
      cvs.width = w; cvs.height = h;
      cvs.style.position = 'absolute'; 
      cvs.style.left = `${(rr.width - w) / 2}px`; 
      cvs.style.top = `${(rr.height - h) / 2}px`;
      if (!crosshairInitRef.current) virtualCrosshair.current = { x: w / 2, y: h / 2 };
    };
    
    const ro = new ResizeObserver(updateCanvasSize); 
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize); 
    updateCanvasSize();
    
    const draw = () => {
      const data = gameDataRef.current;
      const baseRadius = isMobile ? 20 : 25;
      
      ctx.fillStyle = isBoxDarkMode ? "#0a0a0a" : "#f3f4f6"; 
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      if (data.isOrbActive) {
        if (data.orb.mode === 'opposite') {
          ctx.beginPath(); ctx.moveTo(data.orb.x, data.orb.y); ctx.lineTo(data.orb.targetX, data.orb.targetY);
          ctx.strokeStyle = isBoxDarkMode ? "rgba(168,85,247,0.3)" : "rgba(168,85,247,0.4)";
          ctx.lineWidth = 1; ctx.stroke();

          ctx.beginPath(); ctx.arc(data.orb.targetX, data.orb.targetY, baseRadius, 0, Math.PI * 2);
          ctx.fillStyle = isBoxDarkMode ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.15)"; ctx.fill();
          ctx.strokeStyle = "#a855f7"; ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]); ctx.stroke(); ctx.setLineDash([]);
        }
        
        ctx.beginPath(); ctx.arc(data.orb.x, data.orb.y, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = isBoxDarkMode ? "#FFF" : "#000"; ctx.fill();
        ctx.beginPath(); ctx.arc(data.orb.x, data.orb.y, baseRadius + 8, 0, Math.PI * 2);
        ctx.fillStyle = isBoxDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"; ctx.fill();
      }
      
      if (!isMobile) {
        const ch = virtualCrosshair.current;
        if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
          ctx.strokeStyle = isPointerLocked ? '#a855f7' : '#3b82f6';
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(ch.x, ch.y, 12, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(ch.x-20, ch.y); ctx.lineTo(ch.x-8, ch.y);
          ctx.moveTo(ch.x+8, ch.y); ctx.lineTo(ch.x+20, ch.y);
          ctx.moveTo(ch.x, ch.y-20); ctx.lineTo(ch.x, ch.y-8);
          ctx.moveTo(ch.x, ch.y+8); ctx.lineTo(ch.x, ch.y+20);
          ctx.stroke();
          ctx.fillStyle = isPointerLocked ? '#a855f7' : '#3b82f6';
          ctx.beginPath(); ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2); ctx.fill();
        }
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    animationRef.current = requestAnimationFrame(draw);
    return () => { 
      if (animationRef.current) cancelAnimationFrame(animationRef.current); 
      window.removeEventListener('resize', updateCanvasSize); 
      ro.disconnect(); 
    };
  }, [gameState, isBoxDarkMode, isPointerLocked, isMobile]);

  // === Flow Control ===
  const startGame = useCallback(async () => {
    if (isActiveRef.current) return;
    
    try { 
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen();
      } 
    } catch (err) {}

    if (audioSynth) audioSynth.init();

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); 
    if (orbTimeoutRef.current) clearTimeout(orbTimeoutRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    scoreRef.current = 0; timeRef.current = 60.0; levelRef.current = 1; highestLevelRef.current = 1;
    hitsRef.current = 0; missRef.current = 0; effectiveHitsRef.current = 0;
    
    gameDataRef.current.isOrbActive = false; gameDataRef.current.currentInterval = 1000;
    isActiveRef.current = true;
    
    setScore(0); setTimeLeft(60.0); setLevel(1); setHighestLevelReached(1); setSuccessfulHits(0); setMisses(0); setAccuracy(100);
    gameStateRef.current = 'playing';
    setGameState('playing'); 
    crosshairInitRef.current = false;
    
    setTimeout(() => requestPointerLock(), 200);
    setTimeout(() => { crosshairInitRef.current = true; spawnOrb(); }, 400);
    
    // 100ms decoupled timer for exact float tracking
    timerIntervalRef.current = setInterval(() => { 
      if (!isActiveRef.current) return;
      timeRef.current -= 0.1;
      if (timeRef.current <= 0) {
        timeRef.current = 0;
        setTimeLeft(0);
        endGame();
        clearInterval(timerIntervalRef.current);
      } else {
        setTimeLeft(timeRef.current);
      }
    }, 100);
    
  }, [spawnOrb, endGame, requestPointerLock]);

  const resetGame = useCallback(() => {
    isActiveRef.current = false;
    gameStateRef.current = 'start';
    setGameState('start'); 
    levelRef.current = 1;
    highestLevelRef.current = 1;
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); 
    if (orbTimeoutRef.current) clearTimeout(orbTimeoutRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (document.pointerLockElement) document.exitPointerLock();
  }, []);

  const shareScore = useCallback(() => {
    let finalRank = 'Bronze';
    if (score >= 400 && accuracy >= 90) finalRank = 'Grandmaster';
    else if (score >= 300 && accuracy >= 82) finalRank = 'Master';
    else if (score >= 220 && accuracy >= 75) finalRank = 'Diamond';
    else if (score >= 150 && accuracy >= 65) finalRank = 'Platinum';
    else if (score >= 80 && accuracy >= 55) finalRank = 'Gold';
    else if (score >= 40) finalRank = 'Silver';

    const text = `🧠 I scored ${score} PTS with ${accuracy}% accuracy on the Task Switching Test! Rank: ${finalRank}. Train your cognitive flexibility: https://skilldrills.online/drills/cognitive/attention/switch-cost`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'My SkillDrills Cognitive Score',
        text: text,
        url: 'https://skilldrills.online/drills/cognitive/attention/switch-cost'
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [score, accuracy]);

  // Calculate grade based on score and accuracy
  let gradeLetter = 'F';
  if (accuracy >= 90 && score >= 300) gradeLetter = 'S';
  else if (accuracy >= 80 && score >= 220) gradeLetter = 'A';
  else if (accuracy >= 70 && score >= 150) gradeLetter = 'B';
  else if (accuracy >= 60 && score >= 80) gradeLetter = 'C';
  else if (accuracy >= 45 && score >= 40) gradeLetter = 'D';

  let rankName = 'Bronze';
  let rankColor = 'text-slate-500';
  if (score >= 400 && accuracy >= 90) {
    rankName = 'Grandmaster';
    rankColor = 'text-fuchsia-400 font-extrabold';
  } else if (score >= 300 && accuracy >= 82) {
    rankName = 'Master';
    rankColor = 'text-red-400 font-extrabold';
  } else if (score >= 220 && accuracy >= 75) {
    rankName = 'Diamond';
    rankColor = 'text-cyan-400 font-extrabold';
  } else if (score >= 150 && accuracy >= 65) {
    rankName = 'Platinum';
    rankColor = 'text-indigo-400 font-extrabold';
  } else if (score >= 80 && accuracy >= 55) {
    rankName = 'Gold';
    rankColor = 'text-yellow-400 font-extrabold';
  } else if (score >= 40) {
    rankName = 'Silver';
    rankColor = 'text-gray-300 font-extrabold';
  }

  let diagnostics = "Superb set-shifting speed! You successfully minimized context-switching lag and reconfigured rulesets with minimal errors.";
  if (accuracy < 60) {
    diagnostics = "High error rate. Make sure to look closely at whether the spawning target has a dashed shadow before clicking.";
  } else if (misses > successfulHits * 0.4) {
    diagnostics = "High timeout rate. Establish a rapid scanning sequence. Look for the dashed opposite shadow first.";
  } else if (score < 80) {
    diagnostics = "Slow set-shifting speed. Practice rule alternation regularly to reduce your brain's context-switching cost.";
  }

  // === RENDER ===
  if (loading || !isClient) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
    </div>
  );

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300 font-sans`} style={{ WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Breadcrumbs */}
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/cognitive" className="hover:text-purple-400 transition-colors">Cognitive</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-gray-500">Productivity</li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-purple-500 font-medium">Switch-Cost Integrator</li>
            </ol>
          </nav>
        )}
        
        {/* Header Options */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-purple-500/20">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Switch-Cost Integrator</h1>
                <p className="text-sm mt-1 font-medium text-gray-500">
                  {isPointerLocked ? '🟢 Raw input locked' : '🔴 Raw input inactive'} • Adaptive Multi-Tasking
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {gameState === 'playing' && (
                <button onClick={resetGame} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95">
                  <RotateCcw className="w-5 h-5" />
                </button>
              )}
              <button onClick={()=>setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95">
                {isDarkMode ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
              </button>
              <button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95" title="Toggle Canvas Contrast">
                <Eye className="w-5 h-5"/>
              </button>
              <button onClick={()=>setSoundEnabled(!soundEnabled)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95">
                {soundEnabled ? <Volume2 className="w-5 h-5"/> : <VolumeX className="w-5 h-5"/>}
              </button>
              <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95">
                {isFullscreen ? <Minimize2 className="w-5 h-5"/> : <Maximize2 className="w-5 h-5"/>}
              </button>
            </div>
          </div>
        )}
        
        {/* Dynamic HUD */}
        {!isFullscreen && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-2 h-auto py-1">
            <StatCard icon={<Target className="text-purple-400" />} value={score} label="Score" isDark={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={timeLeft.toFixed(1)} label="Time" unit="s" isDark={isDarkMode} />
            <StatCard icon={<Zap className="text-yellow-400" />} value={`Lv.${level}`} label="Difficulty" isDark={isDarkMode} />
            <StatCard icon={<Activity className="text-blue-400" />} value={`${accuracy}%`} label="Accuracy" isDark={isDarkMode} />
            <StatCard icon={<XCircle className="text-red-400" />} value={misses} label="Mistakes" isDark={isDarkMode} />
            <StatCard icon={<Trophy className="text-orange-400" />} value={bestScore} label="Best" isDark={isDarkMode} />
          </div>
        )}
        
        {/* Dynamic Feedback Popups */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {feedback.visible && (
            <div className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full font-black tracking-widest text-sm shadow-xl ${
              feedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 
              feedback.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' : 
              'bg-red-500/20 text-red-400 border border-red-500/50'
            }`}>
              {feedback.text}
            </div>
          )}
        </div>
        
        {/* Main Canvas Area */}
        <div ref={containerRef} 
          onContextMenu={(e) => { if(gameStateRef.current === 'playing') e.preventDefault(); }}
          className={`relative overflow-hidden w-full flex flex-col items-center justify-center transition-all duration-100 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-black' 
              : 'rounded-2xl border shadow-2xl min-h-[60vh] md:min-h-[500px] aspect-video bg-black ' + (isDarkMode ? 'border-gray-800' : 'border-gray-200')
          }`}
          style={{ 
            touchAction: gameStateRef.current === 'playing' ? 'none' : 'auto', 
            overscrollBehavior: gameStateRef.current === 'playing' ? 'none' : 'auto'
          }}>
          
          <canvas ref={canvasRef} className="block cursor-none" />

          {/* Time Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
              <div className={`h-full transition-all duration-100 ease-linear ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`} style={{ width: `${Math.min(100, (timeLeft / 60) * 100)}%` }} />
            </div>
          )}

          {/* Rotate Device Warning Overlay */}
          {showRotateWarning && gameState !== 'playing' && (
            <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 backdrop-blur-sm">
              <div className="animate-bounce mb-6 text-purple-500"><RotateCcw className="w-16 h-16 mx-auto" /></div>
              <h3 className="text-2xl font-bold text-white mb-3">Rotate Device</h3>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">Please rotate your device to landscape mode for the best playing experience and maximum visual area.</p>
            </div>
          )}

          {/* Fullscreen Controls overlay */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-[60] flex gap-2">
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); resetGame(); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            </div>
          )}
          
          {/* Start Screen */}
          {gameState === 'start' && !showRotateWarning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-40 overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
              <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-800 bg-gray-950 shadow-2xl my-auto">
                {!isMobileLandscape && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)] pointer-events-none rotate-3">
                    <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                )}
                <h2 className="text-xl sm:text-3xl font-black mb-2 tracking-tight text-white pointer-events-none">Switch-Cost Integrator</h2>
                <p className="text-sm sm:text-base mb-8 text-gray-400 leading-relaxed pointer-events-none">Time-Attack. Tests your cognitive flexibility by randomly mixing Direct visual targets with Opposite spatial targets.</p>

                <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(168,85,247,0.3)] shrink-0 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5 fill-white" /> START DRILL
                </button>
              </div>
            </div>
          )}
          
          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 bg-[#05070e]/98 overflow-y-auto p-6 z-[70] select-none scrollbar-thin scroll-smooth backdrop-blur-sm" onPointerDown={e => e.stopPropagation()}>
              <div className="min-h-full flex flex-col justify-center items-center py-4 w-full">
                <div className="max-w-md w-full text-center">
                  {score > 0 && score >= bestScore && (
                    <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce font-mono">
                      ⭐ NEW PERSONAL BEST!
                    </div>
                  )}
                  
                  <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1 font-mono">
                    Drill Complete
                  </h2>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-mono">
                    Peak difficulty reached: Level {highestLevelReached}
                  </p>

                  <div className="grid grid-cols-3 gap-2.5 mb-6 text-left font-mono">
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                      <span className="text-sm font-black text-white">{score} <span className="text-[8px] text-slate-400 font-normal">PTS</span></span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Accuracy</span>
                      <span className="text-sm font-black text-white">{accuracy}%</span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Best Score</span>
                      <span className="text-sm font-black text-yellow-400">{bestScore}</span>
                    </div>
                    
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Target Hits</span>
                      <span className="text-sm font-black text-emerald-400">{successfulHits}</span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Mistakes</span>
                      <span className="text-sm font-black text-red-400">{misses}</span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                      <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Peak Level</span>
                      <span className="text-sm font-black text-purple-400">Lv.{level}</span>
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
                    <PlayAgainButton onClick={() => { resetGame(); startGame(); }} colorTheme="purple" />
                    <button
                      onClick={shareScore}
                      className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors active:scale-95"
                      title="Share Score"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleExit}
                      className="p-3 bg-red-900/30 border border-red-900/55 hover:bg-red-900/50 text-red-400 rounded-xl transition-colors active:scale-95 flex items-center justify-center"
                      title="Exit Drill"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Drill Rules */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className={`rounded-2xl border overflow-hidden shadow-xl pointer-events-none ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className={`px-6 py-5 border-b flex items-center gap-3 ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                <Info className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <h2 className={`font-bold text-lg tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <RuleItem color="green" text="Solid Orb ONLY = " highlight="DIRECT MODE" result="Click Orb" isDark={isDarkMode} />
                  <RuleItem color="purple" text="Orb + Dashed Shadow = " highlight="OPPOSITE MODE" result="Click Shadow" isDark={isDarkMode} />
                  <RuleItem color="blue" text="Target Hit" highlight="Correct" result="+10 PTS | +2s" isDark={isDarkMode} />
                </div>
                <div className="space-y-4">
                  <RuleItem color="red" text="Tapping wrong / Miss" highlight="Penalty" result="No PTS Penalty | -2s" isDark={isDarkMode} />
                  <RuleItem color="orange" text="Targets spawn in 8 dynamic locations =" highlight="Random" result="Stay Alert" isDark={isDarkMode} />
                  <RuleItem color="yellow" text="Difficulty scales directly with score =" highlight="Speed Up" result="Adaptive" isDark={isDarkMode} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className={`rounded-2xl border overflow-hidden shadow-xl ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className={`px-6 py-5 border-b flex items-center gap-3 ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                <GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <h2 className={`font-bold text-lg tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About The Switch-Cost Integrator</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  This rigorous cognitive drill is engineered to attack <strong className="font-semibold">cognitive lag</strong>—the micro-delay your brain experiences when shifting between different rulesets. The engine randomly positions an orb in dynamic locations. Occasionally, a dashed shadow will appear across from it. This simple visual cue completely reverses the mechanical task, forcing you to inhibit your initial impulse and rapidly recalculate your physical trajectory.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-purple-50 border-purple-100'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Professionals heavily reliant on multitasking, gamers needing elite cognitive flexibility, and anyone looking to condition their executive function to eliminate context-switching lag.</p>
                  </div>
                  <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-green-50 border-green-100'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mental agility, inhibitory control, rule-based motor routing, cognitive flexibility, and visual-spatial mapping under intense time limits.</p>
                  </div>
                  <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-blue-50 border-blue-100'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Your core capability is measured via Net Score, strict Time-Attack survival, accuracy ratios, and the adaptive speed boundary (Level) you can sustain.</p>
                  </div>
                </div>
                
                <div className={`p-5 rounded-xl border mb-8 ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-yellow-50 border-yellow-100'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <h3 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Master It</h3>
                  </div>
                  <ul className={`text-xs space-y-3 pl-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li><strong className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>Inhibit the Impulse:</strong> The most common error is rushing. Visually confirm if the shadow spawned before initiating your mechanical movement.</li>
                    <li><strong className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>Center Your Gaze:</strong> Keep your eyes relatively central to easily spot the entire perimeter using peripheral vision.</li>
                    <li><strong className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>Adaptive Survival:</strong> While incorrect actions do not deduct points, they still drain time (-2s) and break combos. Balance speed with inhibition to maximize your score.</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Info className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    <h3 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>How does the dynamic difficulty work?</h4>
                      <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>The engine tracks your score. Every 50 points you earn increases your difficulty Level, shrinking the spawn interval down to a minimum of 300ms. If you miss, you lose time, but your level and score are protected.</p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>What exactly is "Switch-Cost"?</h4>
                      <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>In psychology, "Switch-Cost" refers to the loss of speed and accuracy that occurs when shifting between different tasks or rules. This drill conditions your prefrontal cortex to minimize that biological delay.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Drills */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Related drills">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600"></div>
              <h2 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Divided Attention" desc="Manage dual-task streams with visual targets and math equations." color="blue" icon={<Eye className="w-4 h-4" />} isDark={isDarkMode} cat="Cognitive" />
              <RelatedCard href="/drills/cognitive/attention/switch-cost" title="Context Switch Lab" desc="Dual-rule task switching between parity and magnitude." color="purple" icon={<Brain className="w-4 h-4" />} isDark={isDarkMode} cat="Productivity" />
              <RelatedCard href="/drills/cognitive/problem-solving/priority-sorting" title="Priority Sorting" desc="Click color-coded targets with dynamic rule changes." color="green" icon={<Target className="w-4 h-4" />} isDark={isDarkMode} cat="Productivity" />
              <RelatedCard href="/drills/memory/working-memory/n-back" title="3-Back Training" desc="Classic N-Back working memory task up to 3-back difficulty." color="orange" icon={<Star className="w-4 h-4" />} isDark={isDarkMode} cat="Memory" />
            </div>
          </section>
        )}

        {/* Extended Footer */}
        {!isFullscreen && (
          <footer className={`mt-16 rounded-3xl py-12 px-8 border shadow-xl ${isDarkMode ? 'bg-gray-950 text-gray-400 border-gray-800' : 'bg-white text-gray-600 border-gray-200'}`} role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
                <div>
                  <h3 className={`font-bold mb-4 text-sm tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Productivity</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/cognitive/attention/switch-cost" className="hover:text-purple-500 transition-colors">Switch-Cost Integrator</Link></li>
                    <li><Link href="/drills/cognitive/attention/switch-cost" className="hover:text-purple-500 transition-colors">Context Switch Lab</Link></li>
                    <li><Link href="/drills/cognitive/problem-solving/priority-sorting" className="hover:text-purple-500 transition-colors">Priority Sorting</Link></li>
                    <li><Link href="/drills/cognitive" className="text-purple-500 hover:text-purple-400 font-bold transition-colors mt-2 block">All Productivity →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className={`font-bold mb-4 text-sm tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cognitive</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-purple-500 transition-colors">Divided Attention</Link></li>
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-purple-500 transition-colors">Card Matching</Link></li>
                    <li><Link href="/drills/cognitive/attention/selective-attention" className="hover:text-purple-500 transition-colors">Selective Attention</Link></li>
                    <li><Link href="/drills/cognitive" className="text-purple-500 hover:text-purple-400 font-bold transition-colors mt-2 block">All Cognitive →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className={`font-bold mb-4 text-sm tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Visual & Motor</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-purple-500 transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/visual/tracking-accuracy/multiple-targets" className="hover:text-purple-500 transition-colors">Ghost-Link Tracking</Link></li>
                    <li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-purple-500 transition-colors">Kinetic Intercept</Link></li>
                    <li><Link href="/drills/visual" className="text-purple-500 hover:text-purple-400 font-bold transition-colors mt-2 block">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className={`font-bold mb-4 text-sm tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>FPS Training</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-purple-500 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps/target-acquisition" className="hover:text-purple-500 transition-colors">Target Acquisition</Link></li>
                    <li><Link href="/drills/fps" className="text-purple-500 hover:text-purple-400 font-bold transition-colors mt-2 block">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className={`font-bold mb-4 text-sm tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>More Sections</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/academic" className="hover:text-purple-500 transition-colors">Academic (12 drills)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-purple-500 transition-colors">Physical (11 drills)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className={`border-t pt-10 text-center ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <span className={`font-black text-xl tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SkillDrills</span>
                </div>
                <p className={`text-sm mb-3 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className={`text-xs max-w-2xl mx-auto leading-relaxed mb-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Free online Switch-Cost Integrator drill. Train your cognitive flexibility by dynamically switching between direct and opposite motor responses in an adaptive Time-Attack environment.
                </p>
                
                <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="Twitter / X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="Pinterest">
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
// UI SUBCOMPONENTS
// ============================================================
function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl border p-2 sm:p-3 text-center flex flex-col justify-center h-full pointer-events-none transition-colors ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="mb-1 flex justify-center scale-90">{icon}</div>
      <p className={`text-sm sm:text-xl font-black tracking-tighter truncate leading-none ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {value}<span className="text-[10px] font-bold ml-0.5 text-gray-500">{unit}</span>
      </p>
      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function RuleItem({ color, text, highlight = '', result, isDark }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500 text-blue-600', 
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500 text-cyan-600', 
    red: 'bg-red-600 text-red-300 border-red-500 text-red-600', 
    purple: 'bg-purple-600 text-purple-300 border-purple-500 text-purple-600',
    orange: 'bg-orange-600 text-orange-300 border-orange-500 text-orange-600',
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500 text-yellow-600',
    green: 'bg-green-600 text-green-300 border-green-500 text-green-600'
  };
  const c = colorMap[color] || 'bg-slate-600 text-slate-300 border-slate-500 text-slate-600';
  const [bg, txtDark, border, txtLight] = c.split(' ');
  const txt = isDark ? txtDark : txtLight;

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border shadow-sm ${isDark ? 'bg-black/40 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
      <div className={`w-3 h-3 rounded-full ${bg} shadow-lg flex-shrink-0`}></div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{text} <span className={`font-black ${txt}`}>{highlight}</span></p>
        <div className={`text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-lg border ${border} ${txt} whitespace-nowrap shadow-inner ${isDark ? 'bg-gray-900' : 'bg-white'}`}>{result}</div>
      </div>
    </div>
  );
}

function RelatedCard({ href, title, desc, color, icon, isDark, cat }) {
  const gradients = {
    blue: 'from-blue-500 to-indigo-500',
    cyan: 'from-cyan-500 to-teal-500',
    purple: 'from-purple-500 to-violet-500',
    orange: 'from-orange-500 to-amber-500',
    green: 'from-green-500 to-emerald-500'
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDark ? 'bg-gray-900 border-gray-800 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-400'}`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color]}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors shadow-inner ${isDark ? 'bg-black border-gray-700 text-gray-400 group-hover:text-white' : 'bg-gray-50 border-gray-200 text-gray-500 group-hover:text-gray-900'}`}>
            {icon}
          </div>
          <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{cat}</span>
        </div>
        <h3 className={`font-bold text-base mb-1.5 transition-colors tracking-tight ${isDark ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}>{title}</h3>
        <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-blue-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}