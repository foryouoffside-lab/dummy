'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2,
  Activity, Award, RefreshCw, Eye,
  Crosshair, Play, ChevronRight, Share2,
  GraduationCap, TrendingUp, BarChart3, ArrowRight, Info, Layers, RotateCcw,
  LogOut, Hash, Brain, Search, Users, Lightbulb
} from 'lucide-react';

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

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

export default function BatchProcessingClient() {
  
  // === UI State ===
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });

  // === Game State ===
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [accuracy, setAccuracy] = useState(100);
  
  const [currentSpeed, setCurrentSpeed] = useState(2000);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60.0);
  const [stats, setStats] = useState({ hits: 0, misses: 0, falseAlarms: 0, batches: 0 });

  // === Engine Refs ===
  const mountedRef = useRef(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const timeRef = useRef(60.0);
  const speedRef = useRef(2000);
  
  const typesRef = useRef(["RED", "BLUE", "GREEN"]);
  const itemsRef = useRef([]); // Holds moving balls
  const particlesRef = useRef([]); // Holds hit/miss explosions
  
  const currentBatchRef = useRef('');
  const statsRef = useRef({ hits: 0, misses: 0, falseAlarms: 0, batches: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });

  const globalTimerIntervalRef = useRef(null);
  const batchTimerRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const animationRef = useRef(null);

  // UI Sync
  const syncToUI = useCallback(() => {
    setScore(scoreRef.current);
    setCurrentSpeed(speedRef.current);
    setStats({ ...statsRef.current });
    
    const totalActions = statsRef.current.hits + statsRef.current.falseAlarms + statsRef.current.misses;
    setAccuracy(totalActions > 0 ? Math.round((statsRef.current.hits / totalActions) * 100) : 100);
  }, []);

  // Audio Sync
  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Init Data
  useEffect(() => {
    setIsClient(true);
    mountedRef.current = true;
    try {
      const saved = localStorage.getItem('skilldrills_batch_best_v3');
      if (saved) setBestScore(parseInt(saved) || 0);
    } catch (e) {}
    setTimeout(() => { if (mountedRef.current) setLoading(false); }, 200);

    return () => {
      mountedRef.current = false;
      clearTimers();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Screen Guard & Rotate Warning
  useEffect(() => {
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsHandler);
    
    const checkOrientationAndSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) || window.innerWidth < 768;
      
      if (!isMobile) { 
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
      document.removeEventListener('fullscreenchange', fsHandler);
      window.removeEventListener('resize', checkOrientationAndSize);
      window.removeEventListener('orientationchange', checkOrientationAndSize);
    };
  }, []);

  const clearTimers = useCallback(() => {
    if (globalTimerIntervalRef.current) clearInterval(globalTimerIntervalRef.current);
    if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
  }, []);

  const endGame = useCallback(() => {
    clearTimers();
    gameStateRef.current = 'ended';
    setGameState('ended');
    
    const finalScore = scoreRef.current;
    if (finalScore > bestScore && finalScore > 0) {
      setIsNewBest(true);
      setBestScore(finalScore);
      try { localStorage.setItem('skilldrills_batch_best_v3', finalScore.toString()); } catch(e) {}
    }
    syncToUI();
  }, [bestScore, clearTimers, syncToUI]);

  const handleExit = useCallback(async () => {
    if (isFullscreen) {
      try { await document.exitFullscreen(); } catch (e) {}
    }
    clearTimers();
    gameStateRef.current = 'start';
    setGameState('start');
    setLocalTimeRemaining(60.0);
    setScore(0);
    setAccuracy(100);
    setCurrentSpeed(2000);
    setStats({ hits: 0, misses: 0, falseAlarms: 0, batches: 0 });
  }, [isFullscreen, clearTimers]);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setLocalFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setLocalFeedback(prev => ({ ...prev, visible: false }));
    }, 600);
  }, []);

  // === DYNAMIC DIFFICULTY ===
  const updateDifficulty = useCallback(() => {
    const progress = Math.min(1, statsRef.current.batches / 40); 
    speedRef.current = Math.max(600, Math.floor(2000 - (progress * 1400)));
  }, []);

  const spawnExplosion = useCallback((x, y, r, type) => {
    particlesRef.current.push({ x, y, r, alpha: 1, type });
  }, []);

  // === MECHANICS: Economy ===
  const applyReward = useCallback(() => {
    if (audioSynth) audioSynth.playHit();
    scoreRef.current += 10;
    timeRef.current = Math.min(60.0, timeRef.current + 5.0); // +5s, Max 60
    statsRef.current.hits += 1;
    setLocalTimeRemaining(timeRef.current);
    
    syncToUI();
    triggerFeedback('HIT! +10 PTS | +5s', 'success');
  }, [syncToUI, triggerFeedback]);

  const applyPenalty = useCallback((reason) => {
    if (audioSynth) audioSynth.playMiss();
    
    scoreRef.current = Math.max(0, scoreRef.current - 5);
    timeRef.current -= 2.5; // -2.5s
    
    // Decrease difficulty on wrong answer
    statsRef.current.batches = Math.max(0, statsRef.current.batches - 1);
    updateDifficulty();
    
    if (reason === 'false_alarm') {
      statsRef.current.falseAlarms += 1;
      triggerFeedback('WRONG! -5 PTS | -2.5s', 'error');
    } else {
      statsRef.current.misses += 1;
      triggerFeedback('TIMEOUT! -5 PTS | -2.5s', 'error');
      // Explode the correct targets that were missed
      itemsRef.current.forEach(item => {
        if (item.type === currentBatchRef.current) {
          spawnExplosion(item.x, item.y, item.r, 'wrong');
        }
      });
    }
    
    if (timeRef.current <= 0) {
      timeRef.current = 0;
      setLocalTimeRemaining(0);
      endGame();
      return;
    }
    
    setLocalTimeRemaining(timeRef.current);
    syncToUI();
  }, [syncToUI, triggerFeedback, endGame, spawnExplosion, updateDifficulty]);

  // === CORE GAME LOOP: Spawner ===
  const spawnBatch = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    if (batchTimerRef.current) clearTimeout(batchTimerRef.current);

    const w = canvasSizeRef.current.width;
    const h = canvasSizeRef.current.height;
    
    if (w === 0 || h === 0) {
      setTimeout(spawnBatch, 50);
      return;
    }

    const targetType = typesRef.current[Math.floor(Math.random() * typesRef.current.length)];
    currentBatchRef.current = targetType;

    const progress = Math.min(1, statsRef.current.batches / 40);
    const numItems = Math.min(8, 3 + Math.floor(statsRef.current.batches / 5));
    
    // Size decreases based on progress (shrinks up to 50%)
    const scaleFactor = 1 - (progress * 0.5); 
    
    const isSmallScreen = Math.min(window.innerWidth, window.innerHeight) < 500;
    const baseRadius = isSmallScreen ? 25 : 36; 
    const radius = Math.max(isSmallScreen ? 13 : 16, baseRadius * scaleFactor); 
    
    // Speed increases based on progress
    const moveSpeed = isSmallScreen ? 1.0 + (progress * 2.5) : 1.5 + (progress * 3.5);

    itemsRef.current = [];
    const padding = radius + 10;
    const topHUD = h < 400 ? 50 : 90; 

    const safeW = Math.max(1, w - padding * 2);
    const safeH = Math.max(1, h - topHUD - padding * 2);

    for (let i = 0; i < numItems; i++) {
      let type = targetType;
      if (i > 0) { 
        const distractors = typesRef.current.filter(t => t !== targetType);
        type = distractors[Math.floor(Math.random() * distractors.length)];
      }

      let x = 0, y = 0, valid = false, attempts = 0;
      while (!valid && attempts < 50) {
        x = padding + Math.random() * safeW;
        y = topHUD + padding + Math.random() * safeH;
        valid = true;
        for (const other of itemsRef.current) {
          if (Math.hypot(other.x - x, other.y - y) < radius * 2.5) {
            valid = false;
            break;
          }
        }
        attempts++;
      }
      
      const angle = Math.random() * Math.PI * 2;
      const vx = Math.cos(angle) * moveSpeed;
      const vy = Math.sin(angle) * moveSpeed;
      const seed = Math.random() * 100; 

      itemsRef.current.push({ x, y, r: radius, type, vx, vy, speed: moveSpeed, seed });
    }

    itemsRef.current.sort(() => Math.random() - 0.5);

    batchTimerRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing' && mountedRef.current) {
        applyPenalty('timeout'); 
        spawnBatch(); 
      }
    }, speedRef.current);

  }, [applyPenalty]);

  // === INPUT HANDLER ===
  const handlePointerDown = useCallback((e) => {
    if (gameStateRef.current !== 'playing') return;
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
    }
    
    const cvs = canvasRef.current;
    if (!cvs) return;
    
    const rect = cvs.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
    const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    let hitIdx = -1;
    for (let i = itemsRef.current.length - 1; i >= 0; i--) {
      const item = itemsRef.current[i];
      if (Math.hypot(item.x - x, item.y - y) <= item.r + 30) { 
        hitIdx = i;
        break;
      }
    }
    
    if (hitIdx !== -1) {
      const item = itemsRef.current[hitIdx];
      
      if (item.type === currentBatchRef.current) {
        spawnExplosion(item.x, item.y, item.r, 'correct');
        applyReward();
        statsRef.current.batches += 1;
        updateDifficulty();
        spawnBatch(); 
      } else {
        spawnExplosion(item.x, item.y, item.r, 'wrong');
        applyPenalty('false_alarm');
        itemsRef.current.splice(hitIdx, 1);
      }
    }
  }, [applyReward, applyPenalty, spawnBatch, updateDifficulty, spawnExplosion]);

  // === 60FPS GAME LOOP (Movement & Draw) ===
  useEffect(() => {
    const draw = () => {
      const cvs = canvasRef.current;
      
      if (cvs) {
        const ctx = cvs.getContext('2d');
        const rect = cvs.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        if (cvs.width !== rect.width * dpr || cvs.height !== rect.height * dpr) {
          cvs.width = rect.width * dpr;
          cvs.height = rect.height * dpr;
        }
        
        canvasSizeRef.current = { width: rect.width, height: rect.height };

        if (ctx) {
          ctx.save();
          ctx.scale(dpr, dpr);

          ctx.fillStyle = '#050505';
          ctx.fillRect(0, 0, rect.width, rect.height);

          const time = performance.now() * 0.001;
          const topHUD = rect.height < 400 ? 50 : 90;

          if (gameStateRef.current === 'playing' && currentBatchRef.current) {
            
            ctx.strokeStyle = 'rgba(255,255,255,0.03)';
            ctx.lineWidth = 1;
            for (let i = 0; i < rect.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, rect.height); ctx.stroke(); }
            for (let i = 0; i < rect.height; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(rect.width, i); ctx.stroke(); }

            const colorsObj = { 
              "RED": { main: "#ef4444", dark: "#991b1b", light: "#fca5a5" }, 
              "BLUE": { main: "#3b82f6", dark: "#3730a3", light: "#93c5fd" }, 
              "GREEN": { main: "#22c55e", dark: "#166534", light: "#86efac" } 
            };

            const c = colorsObj[currentBatchRef.current] || colorsObj["BLUE"];
            ctx.textAlign = "center";
            ctx.fillStyle = c.main;
            const textY = rect.height < 400 ? 30 : 50;
            const textPt = rect.height < 400 ? "32px" : "48px";
            ctx.font = `900 ${textPt} sans-serif`;
            ctx.fillText(currentBatchRef.current, rect.width / 2, textY);

            itemsRef.current.forEach(it => {
              it.vx += Math.sin(time * 2 + it.seed) * 0.1;
              it.vy += Math.cos(time * 2.5 + it.seed) * 0.1;

              const currentVel = Math.hypot(it.vx, it.vy);
              if (currentVel > it.speed) {
                it.vx = (it.vx / currentVel) * it.speed;
                it.vy = (it.vy / currentVel) * it.speed;
              }

              it.x += it.vx;
              it.y += it.vy;

              if (it.x - it.r < 0) { it.x = it.r; it.vx *= -1; }
              if (it.x + it.r > rect.width) { it.x = rect.width - it.r; it.vx *= -1; }
              if (it.y - it.r < topHUD) { it.y = topHUD + it.r; it.vy *= -1; }
              if (it.y + it.r > rect.height) { it.y = rect.height - it.r; it.vy *= -1; }

              const sphereColor = colorsObj[it.type] || colorsObj["BLUE"];

              const pulseScale = Math.sin(time * 5 + it.seed) * 0.15 + 1.15;
              ctx.beginPath();
              ctx.arc(it.x, it.y, it.r * pulseScale, 0, Math.PI * 2);
              ctx.fillStyle = sphereColor.main;
              ctx.globalAlpha = 0.2;
              ctx.fill();
              ctx.globalAlpha = 1.0;

              const grad = ctx.createLinearGradient(it.x - it.r, it.y - it.r, it.x + it.r, it.y + it.r);
              grad.addColorStop(0, sphereColor.light);
              grad.addColorStop(1, sphereColor.dark);
              
              ctx.beginPath();
              ctx.arc(it.x, it.y, it.r, 0, Math.PI * 2);
              ctx.fillStyle = grad;
              ctx.fill();
              
              ctx.strokeStyle = sphereColor.light;
              ctx.lineWidth = 2;
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(it.x, it.y, it.r * 0.55, 0, Math.PI * 2);
              ctx.strokeStyle = 'rgba(255,255,255,0.5)';
              ctx.lineWidth = 1.5;
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(it.x, it.y, it.r * 0.25, 0, Math.PI * 2);
              ctx.fillStyle = '#ffffff';
              ctx.fill();
            });

            for (let i = particlesRef.current.length - 1; i >= 0; i--) {
              let p = particlesRef.current[i];
              p.r += 3;
              p.alpha -= 0.05;
              
              if (p.alpha <= 0) {
                particlesRef.current.splice(i, 1);
                continue;
              }

              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              ctx.globalAlpha = p.alpha;
              ctx.strokeStyle = p.type === 'correct' ? '#4ade80' : '#f87171';
              ctx.lineWidth = 3;
              ctx.stroke();
              
              ctx.fillStyle = p.type === 'correct' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)';
              ctx.fill();
              ctx.globalAlpha = 1.0;
            }
          }
          ctx.restore();
        }
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 
    
    clearTimers();
    setIsNewBest(false);
    
    gameStateRef.current = 'playing';
    setGameState('playing');
    
    timeRef.current = 60.0;
    scoreRef.current = 0;
    speedRef.current = 2000;
    statsRef.current = { hits: 0, misses: 0, falseAlarms: 0, batches: 0 };
    particlesRef.current = []; 
    
    setLocalTimeRemaining(60.0);
    syncToUI();
    setLocalFeedback({ id: 0, text: '', type: 'success', visible: false });

    try {
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen();
      }
    } catch (err) {}

    // Precise 100ms decoupled timer for exact float tracking
    globalTimerIntervalRef.current = setInterval(() => {
      timeRef.current -= 0.1;
      if (timeRef.current <= 0) {
        timeRef.current = 0;
        setLocalTimeRemaining(0);
        endGame();
        clearInterval(globalTimerIntervalRef.current);
      } else {
        setLocalTimeRemaining(timeRef.current);
      }
    }, 100);

    setTimeout(() => {
      if (gameStateRef.current === 'playing') spawnBatch();
    }, 200);

  }, [clearTimers, endGame, spawnBatch, syncToUI]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) await containerRef.current?.requestFullscreen();
      else await document.exitFullscreen();
    } catch (err) {}
  }, []);

  const shareDrillLink = useCallback(() => {
    const url = 'https://skilldrills.online/drills/cognitive/attention/batch-processing';
    if (navigator.share) {
      navigator.share({ title: 'Batch Processing Drill', text: 'Test your visual grouping speed! Free online training.', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 uppercase tracking-widest text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - accuracy;

  return (
    <div className="min-h-screen select-none bg-[#050505] text-white selection:bg-transparent font-sans" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/cognitive" className="text-gray-500 hover:text-gray-300 transition-colors">Cognitive</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-gray-500 hover:text-gray-300 transition-colors">Attention</li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-blue-400 font-medium">Batch Processing</li>
            </ol>
          </nav>
        )}
        
        {/* Header */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Layers className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Batch Processing</h1>
                <p className="text-sm text-gray-400 mt-1 font-medium">Visual Filtering • Fast Paced • Touch/Click Targeting</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {gameState === 'playing' && (
                <button onClick={() => { endGame(); startGame(); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset">
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95">
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

        {/* Dynamic HUD */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Target className="text-blue-400" />} value={score} label="Score" />
          <StatCard icon={<Timer className={localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={localTimeRemaining.toFixed(1)} label="Time" unit="s" />
          <StatCard icon={<Activity className="text-indigo-400" />} value={currentSpeed} label="Flash" unit="ms" />
          <StatCard icon={<Award className="text-purple-400" />} value={accuracy} label="Accuracy" unit="%" />
          <StatCard icon={<Layers className="text-cyan-400" />} value={stats.batches} label="Batches" />
          <StatCard icon={<Trophy className="text-yellow-400" />} value={bestScore} label="Best" />
        </div>

        {/* Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {localFeedback.visible && (
            <div key={localFeedback.id} className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${localFeedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : localFeedback.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-yellow-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'}`}>
              {localFeedback.text}
            </div>
          )}
        </div>

        {/* Game Container */}
        <div ref={containerRef} 
          onContextMenu={(e) => { if(gameStateRef.current === 'playing') e.preventDefault(); }}
          className={`relative overflow-hidden w-full flex flex-col items-center justify-center transition-all duration-100 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-[#050505]' 
              : 'rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[500px] md:aspect-video bg-[#050505]'
          }`}
          style={{ 
            touchAction: gameStateRef.current === 'playing' ? 'none' : 'auto', 
            overscrollBehavior: gameStateRef.current === 'playing' ? 'none' : 'auto'
          }}>

          {/* Time Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60] pointer-events-none">
              <div className={`h-full transition-all duration-100 ease-linear ${localTimeRemaining <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(100, (localTimeRemaining / 60) * 100)}%` }} />
            </div>
          )}

          {/* Mobile Rotation Blocker */}
          {showRotateWarning && gameState !== 'playing' && (
            <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 backdrop-blur-sm">
              <div className="animate-bounce mb-6 text-blue-500">
                <RotateCcw className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Rotate Device</h3>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">Please rotate your device to landscape mode for the optimal playing experience.</p>
            </div>
          )}

          {/* In-Game Controls (Fullscreen) */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-[60] flex gap-2">
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); endGame(); startGame(); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setSoundEnabled(v => !v); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            </div>
          )}

          {/* Canvas Gameplay Layer */}
          <canvas 
            ref={canvasRef} 
            onPointerDown={handlePointerDown}
            className={`absolute inset-0 z-10 w-full h-full block ${gameState === 'playing' ? 'cursor-crosshair' : 'cursor-default'}`}
          />

          {/* START SCREEN */}
          {gameState === 'start' && !showRotateWarning && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
              <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                {!isMobileLandscape && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] rotate-3">
                    <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                )}
                <h2 className="text-xl sm:text-3xl font-black mb-2 tracking-tight">Batch Processing</h2>
                <p className="text-sm sm:text-base mb-6 text-gray-400 leading-relaxed pointer-events-none">Visual tracking challenge. Tap the correct colored spheres rapidly.</p>
                
                <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Play className="w-5 h-5 fill-white" /> START DRILL
                </button>
              </div>
            </div>
          )}

          {/* END SCREEN */}
          {gameState === 'ended' && (
            <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black/95 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto px-4 py-6" onPointerDown={e => e.stopPropagation()}>
              <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[95vh] overflow-y-auto my-auto">
                <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    {isNewBest && (
                      <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                        ⭐ New Personal Best
                      </div>
                    )}
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Mission Complete</h2>
                    <p className="text-blue-400 font-medium text-xs sm:text-sm">Batch Processing • Peak Speed: {speedRef.current}ms</p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 pointer-events-none shrink-0">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                      <div className="flex items-end gap-1">
                        <span className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tighter">{score}</span>
                        <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">PTS</span>
                      </div>
                    </div>
                    
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <path className="text-gray-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className={`${accuracy >= 80 ? 'text-green-500' : accuracy >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} strokeWidth="3" strokeDasharray={`${strokeDasharray}`} strokeDashoffset={`${strokeDashoffset}`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-base sm:text-xl font-black ${accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracy}%</span>
                        <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Perfects</div>
                      <div className="text-base sm:text-xl font-black text-green-400">{stats.hits}</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Misses</div>
                      <div className="text-base sm:text-xl font-black text-orange-400">{stats.misses}</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Errors</div>
                      <div className="text-base sm:text-xl font-black text-red-400">{stats.falseAlarms}</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                  <button onPointerDown={e => e.stopPropagation()} onClick={() => { endGame(); startGame(); }} className="flex-1 py-3 sm:py-4 bg-blue-600 text-white rounded-xl font-black tracking-wide hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-sm sm:text-base">
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                  </button>
                  <button onPointerDown={e => e.stopPropagation()} onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button onPointerDown={e => e.stopPropagation()} onClick={handleExit} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info & Footer */}
        {!isFullscreen && (
          <>
            <section className="mt-10">
              <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
                <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                  <Info className="w-5 h-5 text-blue-400" /><h2 className="font-bold text-white text-lg tracking-tight">Drill Instructions & Scoring</h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <RuleItem color="green" text="Correct Target" highlight="+10 PTS | +5s" result="Increases Difficulty" />
                    <RuleItem color="purple" text="Adaptive Speed" highlight="Scales Down" result="Based on Precision" />
                  </div>
                  <div className="space-y-5">
                    <RuleItem color="red" text="Wrong / Timeout" highlight="-5 PTS | -2.5s" result="Decreases Difficulty" />
                    <RuleItem color="blue" text="Time Limit Capped" highlight="Max 60 Seconds" result="Endless Survival" />
                  </div>
                </div>
              </div>
            </section>
            
            <section className="mt-12" aria-label="About this drill">
              <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
                <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                  <h2 className="font-bold text-white text-lg tracking-tight">About Batch Processing</h2>
                </div>
                
                <div className="p-6 sm:p-8">
                  <p className="text-sm leading-relaxed mb-6 text-gray-300">
                    This advanced cognitive drill tests <strong className="text-white font-semibold">visual target acquisition</strong> and <strong className="text-white font-semibold">task grouping efficiency</strong> in an endless time-attack format. By forcing you to visually parse, verify, and execute actions on fast-moving grouped data under severe constraints, it builds the mental framework required for rapid data filtering and processing.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                    <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                        <h3 className="text-sm font-bold text-white tracking-tight">Who It's For</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-gray-400">Knowledge workers optimizing workflows, gamers requiring rapid target selection, and anyone wanting to develop absolute efficiency in filtering moving targets.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                        <h3 className="text-sm font-bold text-white tracking-tight">Skills Improved</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-gray-400">Visual tracking, task batching efficiency, divided attention, processing speed, and rapid color identification under high time pressure.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                        <h3 className="text-sm font-bold text-white tracking-tight">What You'll Track</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-gray-400">Net Score, target accuracy percentage, completed batches, and your peak working speed (Flash Speed in ms) reached.</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                    </div>
                    <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                      <li><strong className="text-gray-200">Peripheral Vision:</strong> Do not follow individual targets with your eyes. Keep your gaze centrally anchored near the target word and rely on peripheral vision to track the moving spheres.</li>
                      <li><strong className="text-gray-200">Pre-Aiming:</strong> Since the targets bounce predictably, attempt to predict their trajectory and position your cursor/finger ahead of them rather than chasing them.</li>
                      <li><strong className="text-gray-200">Survival Mechanics:</strong> You must maintain accuracy to add time (+5s) and score (+10 PTS) to your clock. Misses actively drain the clock (-2.5s). The absolute max time ceiling is 60 seconds.</li>
                    </ul>
                  </div>

                  {/* FAQ Section */}
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-4">
                      <Info className="w-5 h-5 text-blue-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-sm font-bold text-gray-200 tracking-tight">How does the difficulty scale?</h4>
                        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">The engine adapts directly to your precision. Every time you successfully clear a target, the visual spawn timer decreases, the target sizes shrink, and the velocity increases. If you miss or click an incorrect target, the difficulty actively decreases to give you a chance to recover.</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-200 tracking-tight">Why is my time dropping rapidly?</h4>
                        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Unlike passive drills, you are penalized dynamically (-2.5 seconds) for either missing the active flash window or clicking a distraction color. You must be both fast AND accurate to survive.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* RELATED DRILLS */}
            <section className="mt-14" aria-label="Explore related cognitive drills">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 rounded-full bg-blue-500"></div>
                <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                  Explore Related Drills
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Divided Attention" desc="Manage multiple parallel tasks seamlessly." color="purple" icon={<Layers className="w-4 h-4" />} />
                <RelatedCard href="/drills/visual/visual-recognition/visual-search" title="Visual Search" desc="Conjunctive search for hidden visual items." color="blue" icon={<Search className="w-4 h-4" />} />
                <RelatedCard href="/drills/memory/short-term-memory/color-sequence" title="Color Sequence" desc="Watch and rapidly recall color orders." color="cyan" icon={<Eye className="w-4 h-4" />} />
                <RelatedCard href="/drills/cognitive/memory/card-matching" title="Memory Grid" desc="Train spatial awareness and positioning." color="green" icon={<Brain className="w-4 h-4" />} />
              </div>
            </section>

            {/* FOOTER */}
            <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                  <div>
                    <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Visual Training</h3>
                    <ul className="space-y-2">
                      <li><Link href="/drills/visual/visual-recognition/entropic-grid" className="hover:text-blue-400 transition-colors">Entropic Grid</Link></li>
                      <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-blue-400 transition-colors">Visual Search</Link></li>
                      <li><Link href="/drills/visual" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All Visual Drills →</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory Training</h3>
                    <ul className="space-y-2">
                      <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-blue-400 transition-colors">3-Back Training</Link></li>
                      <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-blue-400 transition-colors">Color Sequence</Link></li>
                      <li><Link href="/drills/memory" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All Memory Drills →</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                    <ul className="space-y-2">
                      <li><Link href="/drills/fps/flick-shot-training" className="hover:text-blue-400 transition-colors">Flick Shot Trainer</Link></li>
                      <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-blue-400 transition-colors">Aim Trainer</Link></li>
                      <li><Link href="/drills/fps" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All FPS Drills →</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                    <ul className="space-y-2">
                      <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-blue-400 transition-colors">Memory Games</Link></li>
                      <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-blue-400 transition-colors">Divided Attention</Link></li>
                      <li><Link href="/drills/cognitive" className="text-blue-450 hover:text-blue-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                    <ul className="space-y-2">
                      <li><Link href="/drills/academic" className="hover:text-blue-400 transition-colors">Academic (12)</Link></li>
                      <li><Link href="/drills/visual-tracking" className="hover:text-blue-400 transition-colors">Tracking (25 drills)</Link></li>
                      <li><Link href="/drills/physical" className="hover:text-blue-400 transition-colors">Physical (11)</Link></li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-slate-900 pt-8 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500/25 to-indigo-500/25 border border-blue-500/30 rounded-lg flex items-center justify-center">
                      <Hash className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                  </div>
                  <p className="text-[10px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                  <p className="text-[10px] max-w-2xl mx-auto leading-relaxed mb-8">
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
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Pinterest">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </>
        )}

      </div>
    </div>
  );
}

// === Subcomponents ===

function StatCard({ icon, value, label, unit = '' }) {
  return (
    <div className="group rounded-xl border border-slate-900 bg-slate-950/40 p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-slate-800 backdrop-blur-sm pointer-events-none">
      <div className="mb-0.5 flex justify-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
        {icon}
      </div>
      <p className="text-xs sm:text-sm md:text-base font-extrabold tracking-tight truncate text-white">
        {value}
        <span className="text-[10px] sm:text-xs font-semibold ml-0.5 opacity-80 text-slate-400">{unit}</span>
      </p>
      <p className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 truncate">{label}</p>
    </div>
  );
}

function RuleItem({ color, text, highlight = '', result }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500', 
    purple: 'bg-purple-600 text-purple-300 border-purple-500', 
    green: 'bg-green-600 text-green-300 border-green-500', 
    red: 'bg-red-600 text-red-300 border-red-500',
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500'
  };
  const colors = colorMap[color] || 'bg-slate-600 text-slate-300 border-slate-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-[#0b0f19]/40 p-4 rounded-xl border border-slate-800 shadow-sm">
      <div className={`w-3 h-3 rounded-full ${bg} shadow-lg flex-shrink-0`}></div>
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
    rose: 'from-rose-500 to-pink-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
    green: 'from-green-500 to-emerald-500'
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:-translate-y-1 hover:border-blue-500/50`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-blue-500 to-indigo-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050508] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-blue-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-blue-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}