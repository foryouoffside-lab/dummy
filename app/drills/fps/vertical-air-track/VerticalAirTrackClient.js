'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import Link from 'next/link';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

import { Activity, ArrowRight, Award, BarChart3, CheckCircle2, ChevronRight, Clock, Crosshair, Eye, GraduationCap, Home, Info, Lightbulb, Maximize2, Minimize2, Play, RefreshCw, Shield, Sparkles, Star, Target, Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, Cpu } from 'lucide-react';

const DRILL_DURATION = 60;
const GRAVITY_CONSTANT = 350;

const DIFFICULTY_SETTINGS = {
  easy: { targetSize: 35, speedMultiplier: 0.7, scoreMultiplier: 1 },
  medium: { targetSize: 28, speedMultiplier: 1.0, scoreMultiplier: 2 },
  hard: { targetSize: 22, speedMultiplier: 1.3, scoreMultiplier: 3 },
  elite: { targetSize: 16, speedMultiplier: 1.6, scoreMultiplier: 5 }
};

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

export default function VerticalAirTrackClient() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const pageRef = useRef(null);

  // Viewport Orientation & Mobile Check
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

  // Pure 2D Universal Standard States
  const [universalSens, setUniversalSens] = useState(1.0);
  const [difficulty, setDifficulty] = useState('medium');

  const gameType = 'universal';
  const dpi = 800;
  const inGameSens = universalSens;
  const cmPer360 = (30 / universalSens).toFixed(1);

  // Load saved settings
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('universalSens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
    } catch (e) {}
  }, []);

  // Auto-save user preferences
  useEffect(() => {
    if (gameState === 'playing') return;
    try {
      localStorage.setItem('universalSens', universalSens.toString());
    } catch (e) {}
  }, [universalSens, gameState]);

  // Pointer Lock Safety Cleanup
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
  const [shotsHit, setShotsHit] = useState(0);
  const [totalShots, setTotalShots] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [pointerLocked, setPointerLocked] = useState(false);

  const virtualCrosshair = useRef({ x: 400, y: 225 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const crosshairInitRef = useRef(false);
  
  const targetRef = useRef({ x: 400, y: 300, vx: 50, vy: -300, r: 28, active: false });
  const scoreRef = useRef(0);
  const shotsHitRef = useRef(0);
  const totalShotsRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(DRILL_DURATION);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);

  const feedbacksRef = useRef([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  useEffect(() => {
    try {
      const s = localStorage.getItem('verticalAirTrackBestScore');
      if (s) {
        const p = parseInt(s, 10);
        if (!isNaN(p)) setBestScore(p);
      }
    } catch(e){}
  }, []);

  const showFeedbackText = useCallback((text, type) => {
    const id = Math.random().toString(36).substr(2, 9);
    feedbacksRef.current.push({ id, text, type });
    setFeedbacks([...feedbacksRef.current]);
    setTimeout(() => {
      feedbacksRef.current = feedbacksRef.current.filter(f => f.id !== id);
      setFeedbacks([...feedbacksRef.current]);
    }, 1000);
  }, []);

  const initAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
      return audioCtxRef.current;
    } catch(e){ return null; }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio(); if (!ctx) return;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      const now = ctx.currentTime;
      
      if (type === 'hit') {
        o.type = 'sine';
        o.frequency.setValueAtTime(800, now);
        o.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
        o.frequency.exponentialRampToValueAtTime(600, now + 0.1);
        g.gain.setValueAtTime(0.08, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        o.start(now); o.stop(now + 0.15);
      } else if (type === 'miss') {
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(200, now);
        o.frequency.exponentialRampToValueAtTime(100, now + 0.2);
        g.gain.setValueAtTime(0.04, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        o.start(now); o.stop(now + 0.2);
      } else if (type === 'combo') {
        const o2 = ctx.createOscillator();
        o2.connect(g);
        o.type = 'sine';
        o2.type = 'triangle';
        o.frequency.setValueAtTime(523, now);
        o2.frequency.setValueAtTime(659, now);
        g.gain.setValueAtTime(0.1, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        o.start(now); o2.start(now);
        o.stop(now + 0.3); o2.stop(now + 0.3);
      } else if (type === 'target_spawn') {
        o.type = 'sine';
        o.frequency.setValueAtTime(440, now);
        o.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        g.gain.setValueAtTime(0.05, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        o.start(now); o.stop(now + 0.1);
      }
    } catch(e){}
  }, [soundEnabled, initAudio]);

  const handleCanvasClick = useCallback(() => {
    if (gameState === 'playing' && !document.pointerLockElement) {
      canvasRef.current?.requestPointerLock();
    }
  }, [gameState]);

  // Handle mouse click for shooting
  useEffect(() => {
    const handleShoot = (e) => {
      if (gameState !== 'playing' || !isActiveRef.current || !pointerLocked) return;
      
      e.preventDefault();
      totalShotsRef.current++;
      setTotalShots(totalShotsRef.current);
      
      const target = targetRef.current;
      const crosshair = virtualCrosshair.current;
      
      if (target.active) {
        const dist = Math.hypot(crosshair.x - target.x, crosshair.y - target.y);
        
        if (dist < target.r) {
          comboRef.current++;
          shotsHitRef.current++;
          setShotsHit(shotsHitRef.current);
          
          if (comboRef.current > bestComboRef.current) {
            bestComboRef.current = comboRef.current;
          }
          
          const diffSettings = DIFFICULTY_SETTINGS[difficulty];
          const basePoints = 10 * diffSettings.scoreMultiplier;
          const comboBonus = Math.floor(comboRef.current / 5) * 5;
          const points = basePoints + comboBonus;
          
          scoreRef.current += points;
          setScore(scoreRef.current);
          
          showFeedbackText(`+${points}`, 'success');
          playSound('hit');
          
          if (comboRef.current % 10 === 0 && comboRef.current > 0) {
            playSound('combo');
            showFeedbackText(`🔥 ${comboRef.current}x COMBO!`, 'success');
          }
          
          setTimeout(() => launchNewTarget(), 200);
          target.active = false;
        } else {
          comboRef.current = 0;
          playSound('miss');
          showFeedbackText('MISS', 'error');
        }
      }
    };
    
    document.addEventListener('mousedown', handleShoot);
    return () => document.removeEventListener('mousedown', handleShoot);
  }, [gameState, pointerLocked, difficulty, playSound, showFeedbackText]);

  // Track mouse movement for crosshair
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameState !== 'playing') return;
      
      const dx = (e.movementX || 0) * universalSens;
      const dy = (e.movementY || 0) * universalSens;
      const c = canvasRef.current;
      if (c && crosshairInitRef.current) {
        virtualCrosshair.current.x = Math.max(0, Math.min(c.width, virtualCrosshair.current.x + dx));
        virtualCrosshair.current.y = Math.max(0, Math.min(c.height, virtualCrosshair.current.y + dy));
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [gameState, universalSens]);

  // Pointer lock change handler
  useEffect(() => {
    const h = () => {
      const locked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(locked);
      
      if (locked) {
        crosshairInitRef.current = true;
        const c = canvasRef.current;
        if (c && (virtualCrosshair.current.x === 0 || virtualCrosshair.current.y === 0)) {
          virtualCrosshair.current = { x: c.width / 2, y: c.height / 2 };
        }
      }
    };
    document.addEventListener('pointerlockchange', h);
    return () => document.removeEventListener('pointerlockchange', h);
  }, []);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setShotsHit(0); setTotalShots(0);
    scoreRef.current = 0; shotsHitRef.current = 0; totalShotsRef.current = 0;
    comboRef.current = 0; bestComboRef.current = 0;
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    crosshairInitRef.current = false;
    targetRef.current.active = false;
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, []);

  useEffect(() => {
    const h = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (!active && gameStateRef.current === 'playing') {
        resetGame();
      }
    };
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, [resetGame]);

  const updateBestScore = useCallback((fs) => {
    try {
      const c = parseInt(localStorage.getItem('verticalAirTrackBestScore') || '0', 10);
      if (fs > c) {
        localStorage.setItem('verticalAirTrackBestScore', fs.toString());
        setBestScore(fs);
      }
    } catch(e){}
  }, []);

  const launchNewTarget = useCallback(() => {
    const { width: cw, height: ch } = canvasSizeRef.current;
    if (cw <= 0 || ch <= 0) return;

    const diffSettings = DIFFICULTY_SETTINGS[difficulty];
    
    targetRef.current.x = cw * (0.2 + Math.random() * 0.6);
    targetRef.current.y = ch - 20;
    targetRef.current.r = diffSettings.targetSize;
    targetRef.current.vy = -(350 + Math.random() * 120) * diffSettings.speedMultiplier;
    targetRef.current.vx = (Math.random() - 0.5) * 220 * diffSettings.speedMultiplier;
    targetRef.current.active = true;
    
    playSound('target_spawn');
  }, [difficulty, playSound]);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      if (gameStateRef.current === 'playing' && isActiveRef.current) {
        timeLeftRef.current -= 1;
        setTimeLeft(timeLeftRef.current);
        if (timeLeftRef.current <= 0) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          isActiveRef.current = false;
          targetRef.current.active = false;
          updateBestScore(scoreRef.current);
          
          try {
            const accuracy = totalShotsRef.current > 0 
              ? Math.round((shotsHitRef.current / totalShotsRef.current) * 100) 
              : 0;
            recordDrillResult('vertical-air-track', {
              score: scoreRef.current,
              accuracy: accuracy,
              reactionTimeMs: null,
              trackingAccuracy: accuracy,
              comboMax: bestComboRef.current,
              overshoots: 0,
              undershoots: 0,
              sensitivity: inGameSens,
              dpi,
              gameType,
              duration: DRILL_DURATION
            });
          } catch (e) {}

          if (document.pointerLockElement) {
            document.exitPointerLock();
          }
        }
      }
    }, 1000);
  }, [updateBestScore, inGameSens]);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    try {
      const el = pageRef.current;
      if (el && !document.fullscreenElement) {
        el.requestFullscreen().catch((e) => console.warn("Fullscreen request blocked", e));
        setIsFullscreen(true);
      }
    } catch(e) {
      console.warn("Fullscreen request blocked", e);
    }

    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); scoreRef.current = 0;
    setShotsHit(0); shotsHitRef.current = 0;
    setTotalShots(0); totalShotsRef.current = 0;
    comboRef.current = 0; bestComboRef.current = 0;
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    isActiveRef.current = true;

    const c = canvasRef.current;
    if (c) {
      // Force canvas size update
      const cr = containerRef.current;
      if (cr) {
        const rect = cr.getBoundingClientRect();
        let w = rect.width, h = w * (9/16);
        if (h > rect.height) { h = rect.height; w = h * (16/9); }
        c.width = w;
        c.height = h;
        c.style.width = `${w}px`;
        c.style.height = `${h}px`;
        canvasSizeRef.current = { width: w, height: h };
        c.style.position = 'absolute';
        c.style.left = `${(rect.width - w) / 2}px`;
        c.style.top = `${(rect.height - h) / 2}px`;
        virtualCrosshair.current = { x: w / 2, y: h / 2 };
        crosshairInitRef.current = true;
      }
    }

    setTimeout(() => launchNewTarget(), 300);
    startTimer();

    setTimeout(() => {
      if (canvasRef.current) {
        try {
          canvasRef.current.requestPointerLock();
        } catch (e) {
          console.warn("Pointer lock blocked", e);
        }
      }
    }, 200);
  }, [startTimer, launchNewTarget]);

  // Main rendering loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const updateCanvasLayout = () => {
      const cr = containerRef.current; if (!cr) return;
      const rect = cr.getBoundingClientRect();
      let w = rect.width, h = w * (9/16);
      if (h > rect.height) { h = rect.height; w = h * (16/9); }
      cvs.width = w; cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rect.width - w) / 2}px`;
      cvs.style.top = `${(rect.height - h) / 2}px`;

      if (w > 0 && h > 0 && !crosshairInitRef.current) {
        virtualCrosshair.current = { x: w / 2, y: h / 2 };
        crosshairInitRef.current = true;
      }
    };

    updateCanvasLayout();
    window.addEventListener('resize', updateCanvasLayout);

    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const canvasW = canvasSizeRef.current.width;
      const canvasH = canvasSizeRef.current.height;
      const target = targetRef.current;
      const crosshairPos = virtualCrosshair.current;

      if (isActiveRef.current && canvasW > 0 && canvasH > 0 && target.active) {
        target.x += target.vx * dt;
        target.y += target.vy * dt;
        target.vy += GRAVITY_CONSTANT * dt;

        if (target.x - target.r < 0) {
          target.x = target.r; 
          target.vx = Math.abs(target.vx);
        } else if (target.x + target.r > canvasW) {
          target.x = canvasW - target.r; 
          target.vx = -Math.abs(target.vx);
        }

        if ((target.y > canvasH + 50 && target.vy > 0) || target.y < -200) {
          launchNewTarget();
        }
      }

      // Draw background
      ctx.fillStyle = '#060a13';
      ctx.fillRect(0, 0, canvasW, canvasH);

      // Grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvasW; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvasH); ctx.stroke();
      }

      // Draw target
      if (target.active) {
        const dist = Math.hypot(crosshairPos.x - target.x, crosshairPos.y - target.y);
        const isAimed = dist < target.r;
        
        // Glow
        const gradient = ctx.createRadialGradient(target.x, target.y, target.r * 0.5, target.x, target.y, target.r * 2);
        gradient.addColorStop(0, isAimed ? 'rgba(59, 130, 246, 0.5)' : 'rgba(239, 68, 68, 0.35)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.r * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Body
        ctx.fillStyle = isAimed ? '#3b82f6' : '#ef4444';
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.r, 0, Math.PI * 2);
        ctx.fill();

        // Rings
        ctx.strokeStyle = isAimed ? '#60a5fa' : '#f87171';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.r + 4, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.r + 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // CROSSHAIR - Always draw when initialized
      if (crosshairInitRef.current && crosshairPos.x >= 0 && crosshairPos.y >= 0 && canvasW > 0 && canvasH > 0) {
        const activeColor = pointerLocked ? '#00ff88' : '#ffbb00';
        
        // Draw crosshair
        ctx.strokeStyle = activeColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(crosshairPos.x, crosshairPos.y, 18, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.moveTo(crosshairPos.x, crosshairPos.y - 18);
        ctx.lineTo(crosshairPos.x, crosshairPos.y - 6);
        ctx.moveTo(crosshairPos.x, crosshairPos.y + 18);
        ctx.lineTo(crosshairPos.x, crosshairPos.y + 6);
        ctx.moveTo(crosshairPos.x - 18, crosshairPos.y);
        ctx.lineTo(crosshairPos.x - 6, crosshairPos.y);
        ctx.moveTo(crosshairPos.x + 18, crosshairPos.y);
        ctx.lineTo(crosshairPos.x + 6, crosshairPos.y);
        ctx.stroke();
        
        ctx.fillStyle = activeColor;
        ctx.beginPath(); 
        ctx.arc(crosshairPos.x, crosshairPos.y, 2.5, 0, Math.PI * 2); 
        ctx.fill();
      }

      // Feedback texts
      feedbacksRef.current.forEach(fb => {
        ctx.fillStyle = fb.type === 'success' ? '#00ff88' : '#ef4444';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(fb.text, crosshairPos.x, crosshairPos.y - 40);
      });

      // Instruction text
      if (pointerLocked && targetRef.current.active) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('LEFT CLICK TO SHOOT', canvasW / 2, 20);
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateCanvasLayout);
    };
  }, [gameState, pointerLocked, launchNewTarget, difficulty]);

  const toggleFullscreen = async () => {
    try {
      const container = pageRef.current || document.documentElement;
      if (!container) return;
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
      } else {
        if (document.fullscreenElement) await document.exitFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen toggle error:", err);
    }
  };

  const accuracy = totalShots > 0 ? Math.round((shotsHit / totalShots) * 100) : 0;
  const displayScore = score;
  const displayBest = bestScore;
  const displayTime = `${timeLeft}s`;
  const displayAccuracy = `${accuracy}%`;
  const displayCombo = comboRef.current;
  const displayMaxCombo = bestComboRef.current;
  const displayReaction = '-';
  const displaySens = `${universalSens.toFixed(2)}x`;
  const handleResetClick = resetGame;

  return (
    <div ref={pageRef} className="min-h-screen select-none font-sans bg-black text-slate-100 relative overflow-hidden">
      
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/10 via-black to-black pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(59,130,246,0.015)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      <div className={isFullscreen ? "w-full h-screen p-0 m-0" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10"}>
        
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
              <li><Link href="/" className="hover:text-red-400 transition-colors">HQ</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/drills/fps" className="hover:text-red-400 transition-colors">FPS Sector</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-blue-500" aria-current="page">Vertical Air-Track</li>
            </ol>
          </nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl flex-shrink-0">
                <Crosshair className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Vertical Air-Track</h1>
                <p className="text-sm text-slate-400 mt-1">
                  {pointerLocked ? "🟢 RAW INPUT CAPTURING" : "🔴 CLICK CANVAS TO CAPTURE"} • Shoot falling targets in parabolic arcs
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
              ? "w-full h-full bg-black relative overflow-hidden flex items-center justify-center" 
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-black border border-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center"}
            style={{ cursor: gameState === 'playing' ? 'none' : 'crosshair' }}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />
            
            {gameState === 'start' && (
              <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
                    <div>
                      <h3 className="text-xs font-bold text-blue-400 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2 uppercase tracking-wider">
                        <Info className="w-4 h-4" />
                        AIR TRAJECTORY MECHANICS
                      </h3>
                      <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">1.</span>
                          <span>Targets launch from the bottom and follow parabolic trajectories. Click to shoot them out of the air.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">2.</span>
                          <span>Each hit spawns a new target. Maintain your combo for bonus points. Misses reset your streak.</span>
                        </li>
                        <li className="flex items-start gap-2 text-blue-300">
                          <span className="text-blue-400 font-bold">★</span>
                          <span>Higher difficulties feature smaller, faster targets with greater score multipliers.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2 uppercase tracking-wider">
                        <Cpu className="w-4 h-4 text-blue-400" />
                        Aim Settings Calibration
                      </h3>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Difficulty</label>
                          <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="w-full bg-black border border-slate-900 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50 font-mono"
                          >
                            <option value="easy">Beginner (Large target, slow)</option>
                            <option value="medium">Intermediate (Standard target)</option>
                            <option value="hard">Advanced (Small target, fast)</option>
                            <option value="elite">Elite (Tiny target, hyper speed)</option>
                          </select>
                        </div>
                        <div className="p-4 bg-black/45 rounded border border-slate-900">
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
                      </div>

                      <div className="p-4 bg-black/80 rounded border border-slate-900 flex justify-between items-center text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase">Calculated cm/360</span>
                          <span className="text-white font-bold text-sm">{cmPer360} cm</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block uppercase">Target Size</span>
                          <span className="text-blue-400 font-bold">
                            {DIFFICULTY_SETTINGS[difficulty].targetSize} px
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-900 pt-6">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Personal Best Record</span>
                        <span className="text-white font-bold text-lg flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          {bestScore} Points
                        </span>
                      </div>
                      <button
                        onClick={startGame}
                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 uppercase tracking-wider transition"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        Launch Fullscreen Training
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
                <div className="bg-[#0c1224]/80 border border-slate-900 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto">
                  <h2 className="text-xl font-bold text-blue-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    AIR TRAJECTORY COMPLETED
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <div className="bg-black p-4 rounded border border-slate-900">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 block uppercase">Final Score:</span>
                          <span className="text-white font-bold text-xl">{score} PTS</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black p-3 rounded border border-slate-900 text-center">
                          <span className="text-[10px] text-slate-500 block uppercase">Best Combo</span>
                          <span className="text-white font-bold text-sm">{bestComboRef.current}x</span>
                        </div>
                        <div className="bg-black p-3 rounded border border-slate-900 text-center">
                          <span className="text-[10px] text-slate-500 block uppercase">Accuracy</span>
                          <span className="text-white font-bold text-sm">{accuracy}%</span>
                        </div>
                      </div>
                      
                      <div className="bg-black p-4 rounded border border-slate-900">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Shots Fired:</span>
                          <span className="text-white font-bold">{totalShots}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs mt-2">
                          <span className="text-slate-500">Targets Hit:</span>
                          <span className="text-green-400 font-bold">{shotsHit}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-black p-4 rounded border border-slate-900">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                          PERFORMANCE RANK
                        </h4>
                        <div className="text-center">
                          {(() => {
                            let rank, color;
                            if (score >= 1000) { rank = 'GRANDMASTER'; color = 'text-yellow-400'; }
                            else if (score >= 700) { rank = 'DIAMOND'; color = 'text-cyan-400'; }
                            else if (score >= 500) { rank = 'PLATINUM'; color = 'text-blue-400'; }
                            else if (score >= 300) { rank = 'GOLD'; color = 'text-yellow-600'; }
                            else { rank = 'SILVER'; color = 'text-gray-400'; }
                            return <span className={`${color} font-bold text-2xl`}>{rank}</span>;
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-5 mb-8 text-left shadow-inner">
                    <h3 className="text-xs font-bold text-blue-400 font-mono uppercase tracking-widest border-b border-slate-900 pb-2 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                      AI COACH DIAGNOSTICS
                    </h3>
                    <div className="text-xs leading-relaxed text-slate-350">
                      <p className="mb-2">
                        {accuracy >= 80 ? "🔥 Exceptional accuracy!" : accuracy >= 60 ? "⚠️ Good performance." : "📉 Keep practicing."}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
                    <button onClick={startGame} className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition">
                      <RefreshCw className="w-4 h-4" />Train Again
                    </button>
                    <Link href="/drills/fps" className="w-full sm:w-auto">
                      <button className="w-full px-6 py-2.5 bg-slate-900 border border-slate-900 hover:border-slate-700 text-slate-350 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition">
                        Return to Lobby
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
                      <li>Track falling targets and left-click to shoot them.</li>
                      <li>Build combos for higher scores and better rankings.</li>
                    </ol>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      Scoring
                    </h3>
                    <ul className="space-y-2 list-disc pl-4">
                      <li><span className="text-red-400 font-bold">Hits</span>: +10 base points with difficulty multiplier.</li>
                      <li><span className="text-yellow-400 font-bold">Combos</span>: +5 bonus points per 5 consecutive hits.</li>
                      <li><span className="text-red-500/70 font-bold">Misses</span>: Resets combo multiplier to zero.</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-500" />
                      Pro Features
                    </h3>
                    <ul className="space-y-2 list-disc pl-4">
                      <li><span className="text-red-400">Pointer Lock API</span> for raw mouse input.</li>
                      <li><span className="text-blue-400">Parabolic Physics</span>: Real gravity-based trajectories.</li>
                      <li><span className="text-purple-400">AI Diagnostics</span>: Performance analysis and feedback.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}

        {/* ABOUT DRILL */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="About this drill">
            <div className="rounded-xl border border-slate-900 bg-slate-950/40 overflow-hidden backdrop-blur-md">
              <div className="px-5 py-4 border-b border-slate-900 bg-slate-950/60 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-red-500" />
                <h2 className="font-bold text-sm text-white">
                  About Vertical Air-Track
                </h2>
              </div>
              <div className="p-6">
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  This vertical air-track drill is designed to refine tactical mechanical reflexes, hand-eye coordination, and spatial mouse accuracy. By using 1:1 hardware raw input via the Pointer Lock API, it bypasses operating system cursor acceleration to build consistent physical muscle memory. With dynamic difficulty and AI-powered performance diagnostics, this tool conditions esports players for high-velocity target acquisition in games like CS2, Valorant, Apex Legends, and Overwatch.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-red-500" />
                      </div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Who It's For</h3>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Esports athletes, competitive FPS gamers, and players looking to build consistent, acceleration-free muscle memory.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-blue-450" />
                      </div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Skills Improved</h3>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Motor reflex speed, spatial coordinate sweep precision, wrist control, deceleration timing, and foveal target acquisition.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-purple-400" />
                      </div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">What You'll Track</h3>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Score, hit accuracy, maximum streak combo, fastest reaction speed, and shot efficiency via real-time telemetry logs.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-400">
                  <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      <h3 className="font-bold text-white uppercase tracking-wider">Why Practice Vertical Air-Track?</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Directly translates to higher precision in competitive aim duels.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Bypasses OS mouse acceleration to isolate physical arm/wrist muscle memory.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Builds robust peripheral reaction limits via adaptive target decay rates.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <h3 className="font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                    </div>
                    <ol className="space-y-2 list-decimal pl-4">
                      <li>Prioritize absolute accuracy and straight trajectory paths over high speeds.</li>
                      <li>Practice in short, focused blocks of 10-15 minutes to avoid cognitive fatigue.</li>
                      <li>Track your hit speed consistency and aim for continuous improvement.</li>
                      <li>Calibrate the universal sensitivity slider to match your primary game's multiplier.</li>
                    </ol>
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
                title="Recoil Control" 
                category="FPS Sector" 
                href="/drills/fps/recoil-control" 
                description="Calibrate mouse pulling pattern compensation."
                icon={Activity}
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
                  <button 
                    onClick={() => { if (typeof window !== "undefined" && navigator.share) { navigator.share({ title: document.title, url: window.location.href }).catch(() => {}); } }} 
                    className="hover:text-white transition-colors"
                  >
                    Share Page
                  </button>
                  <button 
                    onClick={() => { if (typeof window !== "undefined") { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); } }} 
                    className="hover:text-white transition-colors"
                  >
                    Copy Link
                  </button>
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