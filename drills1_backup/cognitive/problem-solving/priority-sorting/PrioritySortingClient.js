'use client';

import { useEffect, useState, useRef, useCallback, Component } from 'react';
import Link from 'next/link';
import { 
  Maximize2, Minimize2, Sun, Moon, 
  Eye, Volume2, VolumeX, Info, Activity, Target, Clock, Timer,
  Trophy, Zap, RefreshCw, GraduationCap, Lightbulb, TrendingUp, 
  BarChart3, CheckCircle2, Star, ArrowRight, Share2, Copy,
  Brain, Lock, RotateCcw, XCircle, GitBranch, LogOut, ChevronRight, Play, Users 
} from 'lucide-react';
import useGameEngine from '../../../../../lib/useGameEngine';

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

  playHit() { this.playTone(800, 'sine', 0.1, 0.1); }
  playMiss() { this.playTone(200, 'triangle', 0.2, 0.15); }
  playRule() { this.playTone(600, 'square', 0.15, 0.1); }
  
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
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
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
export default function PrioritySortingClient() {
  // === UI & Environment State ===
  const [showRotateWarning, setShowRotateWarning] = useState(false);
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
  const [timeLeft, setTimeLeft] = useState(60);
  const [level, setLevel] = useState(1);
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
  
  const scoreRef = useRef(0);
  const timeRef = useRef(60);
  const levelRef = useRef(1);
  const hitsRef = useRef(0);
  const missRef = useRef(0);
  const isActiveRef = useRef(false);

  const currentRuleRef = useRef("RED");
  const itemsRef = useRef([]);
  const spawnTimerRef = useRef(0);
  const ruleTimerRef = useRef(0);

  const colors = useRef({ 
    "RED": { hex: "#ef4444", rgb: "239, 68, 68" }, 
    "GREEN": { hex: "#22c55e", rgb: "34, 197, 94" }, 
    "BLUE": { hex: "#3b82f6", rgb: "59, 130, 246" } 
  });
  const colorNames = useRef(["RED", "GREEN", "BLUE"]);

  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const hasProcessedEndRef = useRef(false);

  // === Game Engine Tracker ===
  const engine = useGameEngine({
    category: 'cognitive',
    drillId: 'priority-sorting',
    drillName: 'Priority Sorting',
    totalGameTime: 9999, // Handled internally
    lives: 9999,
    infiniteLives: true, 
    sharePath: 'drills/cognitive/problem-solving/priority-sorting',
  });

  const engineRef = useRef(engine);

  // === Init & Hydration ===
  useEffect(() => { 
    engineRef.current = engine;
    if (engine.gameState === 'playing') hasProcessedEndRef.current = false;
  }, [engine.gameState]);

  useEffect(() => { 
    setIsClient(true); 
    const t = setTimeout(() => setLoading(false), 100); 
    return () => clearTimeout(t); 
  }, []);

  useEffect(() => { 
    try { 
      const s = localStorage.getItem('skilldrills_prioritySortBestV5'); 
      if (s) setBestScore(parseInt(s, 10)); 
    } catch (e) {} 
  }, []);

  // === Viewport & Mobile Logic ===
  useEffect(() => {
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const mobileCheck = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent) || 
                       (navigator.maxTouchPoints > 0 && 
                        window.screen && Math.max(window.screen.width, window.screen.height) < 1024);
      setIsMobile(mobileCheck);
      
      if (mobileCheck && window.innerHeight > window.innerWidth) {
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
      if (!isFullscreen && containerRef.current) await containerRef.current.requestFullscreen(); 
      else if (document.fullscreenElement) await document.exitFullscreen(); 
    } catch (e) {} 
  }, [isFullscreen]);

  useEffect(() => { 
    const h = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', h); 
    return () => document.removeEventListener('fullscreenchange', h); 
  }, []);

  // === Audio Sync ===
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

  // === Game Mechanics ===
  const endGame = useCallback(() => {
    isActiveRef.current = false;
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    if (scoreRef.current > bestScore) {
      setBestScore(scoreRef.current);
      try { localStorage.setItem('skilldrills_prioritySortBestV5', scoreRef.current.toString()); } catch (e) {}
    }
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (engineRef.current?.endGame) engineRef.current.endGame();
  }, [bestScore]);

  const applyHit = useCallback(() => {
    if (!isActiveRef.current) return;
    if (audioSynth) audioSynth.playHit();
    
    // Updated Scoring: +5 Score, +2 Seconds
    scoreRef.current += 5;
    timeRef.current = Math.min(60, timeRef.current + 2);
    hitsRef.current += 1;
    
    // Scale Level based on hits instantly
    levelRef.current = Math.min(15, Math.floor(hitsRef.current / 10) + 1);
    setLevel(levelRef.current);
    
    setScore(scoreRef.current);
    setTimeLeft(timeRef.current);
    setSuccessfulHits(hitsRef.current);
    
    triggerFeedback('Target! +5 PTS | +2s', 'success');
    
    const total = hitsRef.current + missRef.current;
    if (total > 0) setAccuracy(Math.round((hitsRef.current / total) * 100));
  }, [triggerFeedback]);

  const applyPenalty = useCallback((reason) => {
    if (!isActiveRef.current) return;
    if (audioSynth) audioSynth.playMiss();
    
    // Updated Penalty: -5 Score, -1 Second
    scoreRef.current = Math.max(0, scoreRef.current - 5);
    timeRef.current -= 1;
    missRef.current += 1;
    
    // Drop level on penalty to recover slightly
    levelRef.current = Math.max(1, levelRef.current - 1);
    setLevel(levelRef.current);
    
    setScore(scoreRef.current);
    setTimeLeft(Math.max(0, timeRef.current));
    setMisses(missRef.current);
    
    triggerFeedback(`Penalty! ${reason} -5 PTS | -1s`, 'error');
    
    const total = hitsRef.current + missRef.current;
    if (total > 0) setAccuracy(Math.round((hitsRef.current / total) * 100));
    
    if (timeRef.current <= 0) {
      endGame();
    }
  }, [triggerFeedback, endGame]);

  // === Item Spawning Engine (Mobile Optimized Targets) ===
  class PriorityItem {
    constructor(forcedType, cvs, isMobileObj, lvl) {
      // Normal device-adaptive sizing - slightly smaller for mobile so they don't clog screen, but large enough to tap
      const baseMobileRadius = 20; 
      const baseDesktopRadius = 36;
      
      const startSize = isMobileObj ? baseMobileRadius : baseDesktopRadius;
      const sizeReduction = Math.min(isMobileObj ? 8 : 20, lvl * (isMobileObj ? 0.5 : 1.2)); 
      this.baseSize = Math.max(isMobileObj ? 12 : 16, startSize - sizeReduction);

      const padding = this.baseSize + 10;
      this.name = forcedType || colorNames.current[Math.floor(Math.random() * colorNames.current.length)];
      this.colorObj = colors.current[this.name];
      
      const centerX = cvs.width / 2;
      const centerY = cvs.height / 2;
      let validSpawn = false;
      
      while(!validSpawn) {
        this.x = padding + Math.random() * (cvs.width - padding * 2);
        this.y = padding + Math.random() * (cvs.height - padding * 2);
        const distToCenter = Math.hypot(this.x - centerX, this.y - centerY);
        if (distToCenter > 120) validSpawn = true;
      }
      
      // Dynamic Velocity: Base speed increases with level
      const baseSpeed = isMobileObj ? 0.6 : 1.0;
      const speedMultiplier = 1 + (lvl * 0.12); 
      const speed = (baseSpeed + Math.random() * 1.5) * speedMultiplier;
      
      // Random direction
      const angle = Math.random() * Math.PI * 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      
      this.life = 1.0;
      this.decayRate = (0.003 + (Math.random() * 0.002)) * (1 + (lvl * 0.1));
    }
    
    update(cvs) { 
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x - this.baseSize < 0) { this.x = this.baseSize; this.vx *= -1; }
      else if (this.x + this.baseSize > cvs.width) { this.x = cvs.width - this.baseSize; this.vx *= -1; }
      
      if (this.y - this.baseSize < 0) { this.y = this.baseSize; this.vy *= -1; }
      else if (this.y + this.baseSize > cvs.height) { this.y = cvs.height - this.baseSize; this.vy *= -1; }

      const centerX = cvs.width / 2;
      const centerY = cvs.height / 2;
      const boxW = 200;
      const boxH = 90;
      
      if (
          this.x + this.baseSize > centerX - boxW/2 && 
          this.x - this.baseSize < centerX + boxW/2 && 
          this.y + this.baseSize > centerY - boxH/2 && 
          this.y - this.baseSize < centerY + boxH/2
      ) {
         this.vx *= -1;
         this.vy *= -1;
         this.x += this.vx * 2; 
         this.y += this.vy * 2;
      }

      this.life -= this.decayRate; 
      return this.life > 0; 
    }
    
    draw(ctx, isDark) {
      const cs = Math.max(0, this.baseSize * this.life);
      const op = Math.max(0.2, this.life);
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, cs, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.colorObj.rgb}, ${op})`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, cs, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? `rgba(${this.colorObj.rgb}, 0.8)` : `rgba(${this.colorObj.rgb}, 1)`;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  const changeRule = useCallback(() => { 
    if (!isActiveRef.current) return; 
    const newRule = colorNames.current[Math.floor(Math.random() * colorNames.current.length)]; 
    currentRuleRef.current = newRule; 
    ruleTimerRef.current = 0; 
    if (audioSynth) audioSynth.playRule(); 
    if (canvasRef.current) itemsRef.current.push(new PriorityItem(newRule, canvasRef.current, isMobile, levelRef.current)); 
  }, [isMobile]);

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

      let hitIdx = -1;
      for (let i = itemsRef.current.length - 1; i >= 0; i--) { 
        const item = itemsRef.current[i];
        // Dynamic hit detection based on item's current size, adding generous padding for touch
        if (Math.hypot(clickX - item.x, clickY - item.y) < item.baseSize + (isMobile ? 20 : 15)) { 
          hitIdx = i; 
          break; 
        } 
      }

      if (hitIdx !== -1) {
        const item = itemsRef.current[hitIdx];
        const isPriority = item.name === currentRuleRef.current;
        
        if (isPriority) {
          applyHit();
        } else {
          applyPenalty('WRONG COLOR');
        }
        itemsRef.current.splice(hitIdx, 1);
      }
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [gameState, isPointerLocked, isMobile, applyHit, applyPenalty]);

  // === Canvas Render Engine ===
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return; 
    const ctx = cvs.getContext('2d', { alpha: false });
    
    const updateCanvasSize = () => {
      const cr = containerRef.current; if (!cr) return;
      const rr = cr.getBoundingClientRect();
      
      cvs.width = rr.width; 
      cvs.height = rr.height;
      cvs.style.width = '100%';
      cvs.style.height = '100%';

      if (!crosshairInitRef.current) virtualCrosshair.current = { x: rr.width / 2, y: rr.height / 2 };
    };
    
    const ro = new ResizeObserver(updateCanvasSize); 
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize); 
    updateCanvasSize();
    
    itemsRef.current = [];
    for(let i=0; i<3; i++) itemsRef.current.push(new PriorityItem(null, cvs, isMobile, levelRef.current));

    const draw = () => {
      if (!isActiveRef.current) return;
      
      spawnTimerRef.current++;
      const spawnThreshold = Math.max(15, 45 - (levelRef.current * 4)); 
      
      if (spawnTimerRef.current > spawnThreshold && itemsRef.current.length < (isMobile ? 8 : 15)) {
        const forceType = Math.random() < 0.35 ? currentRuleRef.current : null;
        itemsRef.current.push(new PriorityItem(forceType, cvs, isMobile, levelRef.current));
        spawnTimerRef.current = 0;
      }
      
      ruleTimerRef.current++;
      const ruleThreshold = Math.max(120, 240 - (levelRef.current * 10)); 
      if (ruleTimerRef.current > ruleThreshold) changeRule();

      for (let i = itemsRef.current.length - 1; i >= 0; i--) {
        if (!itemsRef.current[i].update(cvs)) {
          if (itemsRef.current[i].name === currentRuleRef.current) {
            applyPenalty('PRIORITY FADED');
          }
          itemsRef.current.splice(i, 1);
        }
      }

      ctx.fillStyle = isBoxDarkMode ? "#0a0a0a" : "#f3f4f6"; 
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'; 
      ctx.lineWidth = 1; 
      for (let i = 0; i < cvs.width; i += 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); } 
      for (let i = 0; i < cvs.height; i += 50) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke(); }

      const ruleStr = currentRuleRef.current;
      const ruleColor = colors.current[ruleStr].hex;
      
      ctx.fillStyle = isBoxDarkMode ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)";
      ctx.beginPath();
      ctx.roundRect(cvs.width / 2 - 100, cvs.height / 2 - 45, 200, 90, 16);
      ctx.fill();
      ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
      ctx.stroke();

      ctx.font = "bold 32px monospace"; 
      ctx.textAlign = "center"; 
      ctx.textBaseline = "middle";
      ctx.fillStyle = ruleColor; 
      ctx.fillText(ruleStr, cvs.width / 2, cvs.height / 2 - 5); 
      
      ctx.font = "bold 11px monospace"; 
      ctx.fillStyle = isBoxDarkMode ? "#6b7280" : "#9ca3af"; 
      ctx.fillText("PRIORITY TARGET", cvs.width / 2, cvs.height / 2 + 25); 
      
      for (const item of itemsRef.current) item.draw(ctx, isBoxDarkMode);
      
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
  }, [gameState, isBoxDarkMode, isPointerLocked, isMobile, changeRule, applyPenalty]);

  // === Flow Control ===
  const startGame = useCallback(async () => {
    if (isActiveRef.current) return;
    
    if (audioSynth) audioSynth.init();
    
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (err) {}

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); 
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    scoreRef.current = 0; timeRef.current = 60; levelRef.current = 1; hitsRef.current = 0; missRef.current = 0;
    isActiveRef.current = true;
    spawnTimerRef.current = 0; ruleTimerRef.current = 0;
    
    setScore(0); setTimeLeft(60); setLevel(1); setSuccessfulHits(0); setMisses(0); setAccuracy(100);
    setGameState('playing'); crosshairInitRef.current = false;
    currentRuleRef.current = "RED"; 
    
    setTimeout(() => requestPointerLock(), 200);
    setTimeout(() => { crosshairInitRef.current = true; }, 400);
    
    timerIntervalRef.current = setInterval(() => { 
      if (!isActiveRef.current) return;
      timeRef.current -= 1;
      if (timeRef.current <= 0) {
        timeRef.current = 0;
        setTimeLeft(0);
        endGame();
      } else {
        setTimeLeft(timeRef.current);
      }
    }, 1000);
    
    if (engineRef.current?.startGame) engineRef.current.startGame();
  }, [endGame, requestPointerLock]);

  const resetGame = useCallback(async () => {
    isActiveRef.current = false;
    setGameState('start'); 
    
    if (document.fullscreenElement) {
      try { await document.exitFullscreen(); } catch(e) {}
    }

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); 
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (document.pointerLockElement) document.exitPointerLock();
  }, []);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/cognitive/problem-solving/priority-sorting';
    if (navigator.share) {
      navigator.share({ title: 'Priority Sorting Drill', text: 'Free cognitive drill! Test your priority switching.', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  // === RENDER ===
  if (loading || !isClient) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050508]">
      <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
    </div>
  );

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-[#050508] text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300 font-sans`} style={{ WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}>
      <GameErrorBoundary>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Navigation Breadcrumbs */}
          {!isFullscreen && (
            <nav className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
                <li><ChevronRight className="w-4 h-4" /></li>
                <li><Link href="/drills/cognitive" className="hover:text-purple-400 transition-colors">Cognitive</Link></li>
                <li><ChevronRight className="w-4 h-4" /></li>
                <li>Problem Solving</li>
                <li><ChevronRight className="w-4 h-4" /></li>
                <li className="text-purple-500 font-medium">Priority Sorting</li>
              </ol>
            </nav>
          )}
          
          {/* Header Options */}
          {!isFullscreen && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <GitBranch className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Priority Sorting</h1>
                  <p className="text-sm mt-1 font-medium text-gray-500">
                    {isPointerLocked ? '🟢 Raw input locked' : '🔴 Raw input inactive'} • Dynamic Targeting
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {gameState === 'playing' && (
                  <button onClick={resetGame} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95" title="Reset">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                )}
                <button onClick={()=>setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95" title="Toggle Theme">
                  {isDarkMode ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
                </button>
                <button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95" title="Toggle Box Theme">
                  <Eye className="w-5 h-5"/>
                </button>
                <button onClick={()=>setSoundEnabled(!soundEnabled)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95" title="Toggle Sound">
                  {soundEnabled ? <Volume2 className="w-5 h-5"/> : <VolumeX className="w-5 h-5"/>}
                </button>
                <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95" title="Toggle Fullscreen">
                  {isFullscreen ? <Minimize2 className="w-5 h-5"/> : <Maximize2 className="w-5 h-5"/>}
                </button>
              </div>
            </div>
          )}
          
          {/* Mobile Stats Bar */}
          {!isFullscreen && (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
              <StatCard icon={<Target className="text-purple-500" />} value={score} label="Score" isDark={isDarkMode} />
              <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-green-500'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
              <StatCard icon={<Zap className="text-yellow-500" />} value={`Lv.${level}`} label="Difficulty" isDark={isDarkMode} />
              <StatCard icon={<Activity className="text-blue-500" />} value={`${accuracy}%`} label="Accuracy" isDark={isDarkMode} />
              <StatCard icon={<XCircle className="text-red-500" />} value={misses} label="Penalties" isDark={isDarkMode} />
              <StatCard icon={<Trophy className="text-orange-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
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
          <div 
            ref={containerRef} 
            className={`relative overflow-hidden w-full transition-all duration-300 ${
              isFullscreen 
                ? 'fixed inset-0 z-50 bg-black rounded-none' 
                : 'rounded-2xl border shadow-[0_0_40px_rgba(0,0,0,0.5)] aspect-[4/3] sm:aspect-video min-h-[50vh] sm:min-h-[500px]'
            } ${isDarkMode ? 'border-gray-800 bg-[#0a0a0a]' : 'border-gray-200 bg-white'}`}
            style={{ touchAction: 'none' }}
          >
            <canvas ref={canvasRef} className="block cursor-none w-full h-full" />

            {/* Time Progress Bar */}
            {gameState === 'playing' && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
                <div className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`} style={{ width: `${Math.min(100, (timeLeft / 60) * 100)}%` }} />
              </div>
            )}

            {/* Mobile Rotation Blocker */}
            {showRotateWarning && gameState !== 'playing' && !isFullscreen && (
              <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 backdrop-blur-sm">
                <div className="animate-bounce mb-6 text-purple-500">
                  <RotateCcw className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Rotate Device</h3>
                <p className="text-gray-400 max-w-xs mx-auto text-sm">Please rotate your device to landscape mode or enter fullscreen to play.</p>
              </div>
            )}

            {/* Fullscreen Minimize Overlay */}
            {isFullscreen && gameState === 'playing' && (
              <div className="absolute top-4 right-4 z-30 flex gap-3">
                <button onClick={resetGame} className="p-3 bg-black/60 backdrop-blur-sm rounded-xl text-white hover:bg-black/70 transition-all border border-gray-600"><RotateCcw className="w-5 h-5" /></button>
                <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 backdrop-blur-sm rounded-xl text-white hover:bg-black/70 transition-all border border-gray-600">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onClick={toggleFullscreen} className="p-3 bg-black/60 backdrop-blur-sm rounded-xl text-white hover:bg-black/70 transition-all border border-gray-600"><Minimize2 className="w-5 h-5" /></button>
              </div>
            )}
            
            {/* Start Screen */}
            {gameState === 'start' && !showRotateWarning && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-40 overflow-y-auto">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-800 bg-gray-950 shadow-2xl flex flex-col max-h-[95dvh]">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)] pointer-events-none shrink-0">
                    <GitBranch className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black mb-6 tracking-tight text-white pointer-events-none shrink-0">Priority Sorting</h2>
                  
                  <button onClick={startGame} className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-black text-lg hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.3)] shrink-0 mt-auto">
                    <Play className="w-5 h-5 inline mr-2" />
                    START DRILL
                  </button>
                </div>
              </div>
            )}
            
            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/95 z-[70] animate-in fade-in duration-300 overflow-y-auto px-4 py-6" onPointerDown={e => e.stopPropagation()}>
                <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[95dvh] my-auto">
                  <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Time's Up!</h2>
                      <p className="text-purple-400 font-medium text-sm sm:text-base">Priority Sorting • Speed Lv.{level}</p>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 pointer-events-none shrink-0 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                        <div className="flex items-end gap-1">
                          <span className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tighter">{score}</span>
                          <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">PTS</span>
                        </div>
                      </div>
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                          <path className="text-gray-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className={`${accuracy >= 80 ? 'text-green-500' : accuracy >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} strokeWidth="3" strokeDasharray="100" strokeDashoffset={`${100 - accuracy}`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-lg sm:text-xl font-black ${accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracy}%</span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Target Hits</div>
                        <div className="text-lg sm:text-xl font-black text-green-400">{successfulHits}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
                        <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Mistakes</div>
                        <div className="text-lg sm:text-xl font-black text-red-400">{misses}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0 mt-auto">
                    <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="flex-1 py-3 sm:py-4 bg-purple-600 text-white rounded-xl font-black tracking-wide hover:bg-purple-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onPointerDown={e => e.stopPropagation()} onClick={resetGame} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
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
                    <RuleItem num="1" color="purple" text="Check center rule =" highlight="TARGET COLOR" result="Memorize" isDark={isDarkMode} />
                    <RuleItem num="2" color="blue" text="Click targets matching rule" highlight="+5 PTS | +2s" result="Difficulty Up" isDark={isDarkMode} />
                  </div>
                  <div className="space-y-4">
                    <RuleItem num="3" color="red" text="Tapping wrong / Miss Rule" highlight="-5 PTS | -1s" result="Difficulty Down" isDark={isDarkMode} />
                    <RuleItem num="4" color="orange" text="Rule shifts randomly" highlight="Every ~3s" result="Re-Adapt" isDark={isDarkMode} />
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
                  <h2 className={`font-bold text-lg tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Priority Sorting Trainer</h2>
                </div>
                
                <div className="p-8">
                  <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    This Priority Sorting drill trains cognitive selection and impulse control. A constantly shifting rule (RED, GREEN, or BLUE) dictates your current target. Colored orbs spawn and fade out continuously. Your objective is to hunt down and click only the orbs that match the center rule, while actively inhibiting the impulse to click distractors. As you succeed, the game speeds up—orbs fade faster, spawn quicker, and rules shift more frequently.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                    <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-purple-50 border-purple-100'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                        <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3>
                      </div>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Professionals needing rapid triage abilities, competitive gamers developing target-prioritization, and students building strong selective attention filters.</p>
                    </div>
                    <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-green-50 border-green-100'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                        <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3>
                      </div>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Selective attention, impulse inhibition, rapid visual triage, cognitive agility, and dynamic rule adherence.</p>
                    </div>
                    <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-blue-50 border-blue-100'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                        <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3>
                      </div>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Net Score, Time-Attack clock, accuracy percentage, successful priority hits, total mistakes, and adaptive speed level.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-yellow-50 border-yellow-100'}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div>
                        <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice This?</h3>
                      </div>
                      <ul className={`text-xs space-y-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500 flex-shrink-0" /> Forces your brain to abandon old rules the instant a new priority emerges.</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500 flex-shrink-0" /> Punishing impulsive clicks builds a robust cognitive filter over time.</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500 flex-shrink-0" /> Endless Time-Attack mode demands sustained, high-focus tracking.</li>
                      </ul>
                    </div>
                    
                    <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-orange-50 border-orange-100'}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div>
                        <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Master It</h3>
                      </div>
                      <ol className={`text-xs space-y-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li className="flex items-start gap-2"><span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold">1</span> Keep one eye locked on the center text. It is the absolute source of truth.</li>
                        <li className="flex items-start gap-2"><span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold">2</span> Do not chase fading targets if you aren't 100% sure they match the rule.</li>
                        <li className="flex items-start gap-2"><span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold">3</span> Do not tap distractors! Let them fade away safely.</li>
                      </ol>
                    </div>
                  </div>

                  {/* FAQ */}
                  <div className={`mt-8 p-5 rounded-xl border ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <Info className="w-5 h-5 text-blue-500" />
                      <h3 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h3>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <h4 className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>How does the difficulty scale?</h4>
                        <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>As you successfully hit priority targets, your level increases. With higher levels, the targets become smaller and move faster, requiring more precise tracking and quicker reactions.</p>
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Is there a penalty for an incorrect input?</h4>
                        <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Yes. Accuracy is critical. A single incorrect tap instantly deducts 5 points and 1 second from your timer, pushing you closer to a Game Over.</p>
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
                <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-600"></div>
                <h2 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Free Drills</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <RelatedCard href="/drills/cognitive/attention/switch-cost" title="Switch-Cost Integrator" desc="Train task switching with direct vs opposite spatial modes." color="blue" icon={<GitBranch className="w-4 h-4" />} isDark={isDarkMode} cat="Productivity" />
                <RelatedCard href="/drills/cognitive/attention/selective-attention" title="Selective Attention" desc="Focus on relevant information while ignoring distractors." color="cyan" icon={<Target className="w-4 h-4" />} isDark={isDarkMode} cat="Cognitive" />
                <RelatedCard href="/drills/cognitive/attention/switch-cost" title="Context Switch Lab" desc="Dual-rule task switching between parity and magnitude." color="purple" icon={<Brain className="w-4 h-4" />} isDark={isDarkMode} cat="Productivity" />
                <RelatedCard href="/drills/visual/visual-recognition/visual-search" title="Visual Search" desc="Find a specific letter among dense rotating distractors." color="orange" icon={<Eye className="w-4 h-4" />} isDark={isDarkMode} cat="Visual" />
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
                      <li><Link href="/drills/cognitive" className="text-purple-500 hover:text-purple-400 font-bold transition-colors mt-2 block">All Productivity {'→'}</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className={`font-bold mb-4 text-sm tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cognitive</h3>
                    <ul className="space-y-3 text-sm">
                      <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-purple-500 transition-colors">Divided Attention</Link></li>
                      <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-purple-500 transition-colors">Card Matching</Link></li>
                      <li><Link href="/drills/cognitive/attention/selective-attention" className="hover:text-purple-500 transition-colors">Selective Attention</Link></li>
                      <li><Link href="/drills/cognitive" className="text-purple-500 hover:text-purple-400 font-bold transition-colors mt-2 block">All Cognitive {'→'}</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className={`font-bold mb-4 text-sm tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Visual & Motor</h3>
                    <ul className="space-y-3 text-sm">
                      <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-purple-500 transition-colors">Reaction Time Test</Link></li>
                      <li><Link href="/drills/visual/tracking-accuracy/multiple-targets" className="hover:text-purple-500 transition-colors">Ghost-Link Tracking</Link></li>
                      <li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-purple-500 transition-colors">Kinetic Intercept</Link></li>
                      <li><Link href="/drills/visual" className="text-purple-500 hover:text-purple-400 font-bold transition-colors mt-2 block">All Visual Drills {'→'}</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className={`font-bold mb-4 text-sm tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>FPS Training</h3>
                    <ul className="space-y-3 text-sm">
                      <li><Link href="/drills/fps/flick-shot-training" className="hover:text-purple-500 transition-colors">Flick Shot Trainer</Link></li>
                      <li><Link href="/drills/fps/target-acquisition" className="hover:text-purple-500 transition-colors">Target Acquisition</Link></li>
                      <li><Link href="/drills/fps" className="text-purple-500 hover:text-purple-400 font-bold transition-colors mt-2 block">All FPS Drills {'→'}</Link></li>
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
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <span className={`font-black text-xl tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SkillDrills</span>
                  </div>
                  <p className={`text-sm mb-3 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>&copy; 2026 SkillDrills. All rights reserved.</p>
                  <p className={`text-xs max-w-2xl mx-auto leading-relaxed mb-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Free online Priority Sorting drill. Train your cognitive agility and impulse control by hunting dynamic color priorities in an adaptive Time-Attack environment.
                  </p>
                  
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <button onClick={shareDrillLink} className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="Share this drill">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="Subscribe on YouTube">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="Follow on Facebook">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="Follow on Twitter X">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="Follow on Instagram">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="Follow on Pinterest">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          )}
        </div>
      </GameErrorBoundary>
    </div>
  );
}

// ============================================================
// UI HELPER COMPONENTS
// ============================================================
function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`group rounded-lg sm:rounded-xl border ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white shadow-sm'} p-1.5 sm:p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] ${isDark ? 'hover:border-gray-600' : 'hover:border-purple-300'} backdrop-blur-sm pointer-events-none`}>
      <div className="mb-0.5 flex justify-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
        {icon}
      </div>
      <p className={`text-base sm:text-lg md:text-xl font-extrabold tracking-tight truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {value}
        <span className={`text-[9px] sm:text-[10px] font-semibold ml-0.5 opacity-80 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{unit}</span>
      </p>
      <p className={`text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider truncate mt-0.5 sm:mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
    </div>
  );
}

function RuleItem({ num, color, text, highlight = '', result, isDark }) {
  const colorMap = { 
    cyan: `bg-cyan-600 text-cyan-100 ${isDark ? 'border-cyan-500' : 'border-cyan-700'}`, 
    blue: `bg-blue-600 text-blue-100 ${isDark ? 'border-blue-500' : 'border-blue-700'}`, 
    red: `bg-red-600 text-red-100 ${isDark ? 'border-red-500' : 'border-red-700'}`, 
    orange: `bg-orange-600 text-orange-100 ${isDark ? 'border-orange-500' : 'border-orange-700'}`,
    green: `bg-green-600 text-green-100 ${isDark ? 'border-green-500' : 'border-green-700'}`,
    purple: `bg-purple-600 text-purple-100 ${isDark ? 'border-purple-500' : 'border-purple-700'}`
  };
  const c = colorMap[color] || 'bg-gray-600 text-gray-100 border-gray-500';
  const [bg, txtDark, border, txtLight] = c.split(' ');
  const txt = isDark ? txtDark : txtLight;

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border shadow-sm ${isDark ? 'bg-black/40 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
      <div className={`w-8 h-8 rounded-xl ${bg} border flex items-center justify-center font-black shadow-lg flex-shrink-0 text-white`}>{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {text}{highlight && <span className={`font-black ${isDark ? 'text-gray-100' : 'text-gray-900'}`}> {highlight}</span>}
        </p>
        <div className={`text-xs font-black px-3 py-1.5 rounded-lg border ${border} ${txt} whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left ${isDark ? 'bg-[#050811]' : 'bg-white'}`}>
          {result}
        </div>
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
        <h3 className={`font-bold text-base mb-1.5 transition-colors tracking-tight ${isDark ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'}`}>{title}</h3>
        <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-purple-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}