'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import { useState, useEffect, useRef, useCallback } from 'react';

import {
  Activity, BarChart3,
  TrendingUp, Users, Volume2, VolumeX, Zap, ZapOff
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '@/components/ShareScoreCard';
import { getPlayerName } from '@/lib/leaderboard';
import { drillAudio } from '@/lib/drillAudio';
import { useDrillSensitivity } from '@/lib/drillSensitivity';
import { drillFlash } from '@/lib/drillFlash';
import { createHitRing, drawHitRings } from '@/lib/canvasFx';
import DrillCountdown from '@/components/drill/DrillCountdown';
import DrillAccordion from '@/components/drill/DrillAccordion';
import FpsStartCard from '@/components/drill/FpsStartCard';
import DrillResultCard from '@/components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';
import { useIsTouchOnly, useTouchAim } from '@/lib/useTouchAim';
import useUnexpectedExitGuard from '@/lib/useUnexpectedExitGuard';

// ============================================================
// CORE DRILL LOGIC VARIABLES
// ============================================================
const DRILL_DURATION = 45;
const tolerance = 22;
const baseSpeed = 2.2;

/**
 * Calculates smooth progressive wave Y position for a given screen X coordinate.
 * Wavelength remains constant across screen width so the curve never collapses or clusters over time.
 * Frequency, speed, and amplitude scale smoothly as session time progresses.
 */
function getWaveY(xOnScreen, cvsWidth, cvsHeight, scrollOffset, progress = 0) {
  const worldX = xOnScreen + scrollOffset;
  
  // Wavelength: 520px main wave cycle for a smooth, wide tracking path across the canvas
  const mainFreq = (Math.PI * 2) / 520;
  const harmonicFreq = mainFreq * 2.2;
  
  // Smooth progressive amplitude scaling
  const mainAmp = 90 + progress * 35; // 90px -> 125px vertical span
  const harmonicAmp = 8 + progress * 24; // 8px -> 32px secondary curve

  const mainWave = Math.sin(worldX * mainFreq) * mainAmp;
  const harmonicWave = Math.sin(worldX * harmonicFreq + 0.8) * harmonicAmp;

  const centerY = cvsHeight / 2;
  return centerY + mainWave + harmonicWave;
}

function getGradeForFlow(peakFlow, totalScore, copy) {
  let letter, defaultLabel, color;
  if (peakFlow >= 90 && totalScore >= 1400) { letter = 'S+'; defaultLabel = 'Grandmaster Flow'; color = 'text-fuchsia-400'; }
  else if (peakFlow >= 80) { letter = 'S'; defaultLabel = 'Peak Flow State'; color = 'text-cyan-400'; }
  else if (peakFlow >= 60) { letter = 'A'; defaultLabel = 'Locked-In Tracking'; color = 'text-emerald-400'; }
  else if (peakFlow >= 35) { letter = 'B'; defaultLabel = 'Steady Tracking'; color = 'text-yellow-400'; }
  else { letter = 'C'; defaultLabel = 'Tracing Complete'; color = 'text-orange-400'; }
  const label = copy?.gradeLabels?.[letter] || defaultLabel;
  return { letter, label, color };
}

// Canonical single-line Rules & Scoring Formula
const RULES_ITEMS = [
  { num: '1', text: 'Trace Corridor', highlight: 'Emerald Wave', result: '+1 PT / locked frame' },
  { num: '2', text: 'Speed Ramps', highlight: 'Progressive Wave', result: '2.2 → 3.8 px/f over 45s' },
  { num: '3', text: 'Flow Integrity', highlight: 'Super Flow', result: '4s Lock-on yields +5 Bonus' },
  { num: '4', text: 'Strict Tracking', highlight: 'Tolerance Zone', result: 'Deviation Resets Streak' },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function TracingClient({ copy } = {}) {
  // === UI & Viewport State ===
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [pointerLocked, setPointerLocked] = useState(false);
  const isTouchOnly = useIsTouchOnly();
  
  // === Settings State ===
  const universalSens = useDrillSensitivity();
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);

  // === Gameplay State ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('success');
  const [flashes, setFlashes] = useState([]);

  // Real-time HUD State
  const [flowState, setFlowState] = useState(100);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    peakFlow: 100,
    maxStreak: 0,
    totalScore: 0,
    grade: null
  });

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const timerRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  
  // === Game Logic Engine Refs ===
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const crosshairInitRef = useRef(false);
  
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const flowRef = useRef(100);
  const focusTimerRef = useRef(0);
  const distractionTimerRef = useRef(0);

  // Per-instance mutable wave state
  const currentSpeedRef = useRef(baseSpeed);
  const pointsRef = useRef([]);
  const offsetRef = useRef(0);
  const isOffPathRef = useRef(false);
  const globalTimeRef = useRef(0);
  const particlesRef = useRef([]);
  const hitRingsRef = useRef([]);

  const triggerFlash = useCallback(() => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  const triggerSuperFlowExplosion = useCallback((x, y) => {
    const isHighFlow = flowRef.current >= 80;
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.9,
        size: 2.5,
        color: isHighFlow ? '#34d399' : '#10b981'
      });
    }
    createHitRing(hitRingsRef.current, x, y, isHighFlow ? '#34d399' : '#10b981', 45);
    drillAudio.playHit();
  }, []);

  const triggerDeviationExplosion = useCallback((x, y) => {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 3.0;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.7,
        size: 2.0,
        color: '#ef4444'
      });
    }
    triggerFlash();
    drillAudio.playPenalty();
  }, [triggerFlash]);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedBest = localStorage.getItem('waveTracing_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch {}
    setSoundEnabled(drillAudio.isEnabled());
    setFlashEnabled(drillFlash.isEnabled());
  }, []);

  const showFeedback = useCallback((msg, type = 'success') => {
    setFeedback(msg);
    setFeedbackType(type);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      setFeedback('');
    }, 1200);
  }, []);

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    drillAudio.playSessionEnd();

    const finalScore = scoreRef.current;
    const peakFlow = Math.floor(flowRef.current);
    const grade = getGradeForFlow(peakFlow, finalScore, copy);

    setAnalytics({
      peakFlow,
      maxStreak: bestStreakRef.current,
      totalScore: finalScore,
      grade
    });

    setBestScore(prev => {
      if (finalScore > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('waveTracing_bestScore', finalScore.toString()); } catch {}
        return finalScore;
      }
      return prev;
    });
  }, [copy]);

  const handleExitDrill = useCallback(() => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    setIsFullscreen(false);
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    setGameState('start');
  }, []);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  const shareScore = useCallback(async () => {
    const url = copy?.shareUrl || 'https://skilldrills.online/drills/motor/precision-control/tracing';
    const drillName = copy?.shareDrillName || 'Wave Tracing Trainer';
    try {
      const canvas = generateShareCard({
        score: analytics.totalScore,
        bestScore,
        accuracy: `${analytics.peakFlow}%`,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Tracing Complete', emoji: '🌊' },
        newBest: isNewBest,
        drillName,
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch {
      let text = `🌊 I scored ${analytics.totalScore} PTS (${analytics.peakFlow}% Flow) on ${drillName}! Test your hand-eye coordination at skilldrills.online!`;
      if (copy?.shareTextTemplate) {
        text = copy.shareTextTemplate
          .replace('{score}', analytics.totalScore)
          .replace('{flow}', analytics.peakFlow)
          .replace('{drillName}', drillName);
      }
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: copy?.shareTitle || `${drillName} Score`, text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert(copy?.copiedAlert || 'Score card copied to clipboard!');
      }
    }
  }, [analytics, bestScore, isNewBest, copy]);

  const startActualDrill = useCallback(() => {
    setGameState('playing');
    scoreRef.current = 0;
    streakRef.current = 0;
    bestStreakRef.current = 0;
    flowRef.current = 100;
    focusTimerRef.current = 0;
    distractionTimerRef.current = 0;
    
    offsetRef.current = 0;
    globalTimeRef.current = 0;
    isOffPathRef.current = false;
    currentSpeedRef.current = baseSpeed;
    particlesRef.current = [];
    hitRingsRef.current = [];

    setScore(0);
    setFlowState(100);
    setTimeLeft(DRILL_DURATION);

    if (canvasRef.current) {
      if (isTouchOnly) {
        setPointerLocked(true);
      } else if (!document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(() => {});
      }

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      virtualCrosshair.current = { x: width / 4, y: height / 2 };
      crosshairInitRef.current = true;

      const pts = [];
      for (let i = 0; i <= width; i++) {
        pts.push(getWaveY(i, width, height, offsetRef.current, 0));
      }
      pointsRef.current = pts;
    }
  }, [isTouchOnly]);

  const startGame = useCallback(async () => {
    drillAudio.init(); 

    setIsNewBest(false);
    setFeedback('');
    setTimeLeft(DRILL_DURATION);
    setScore(0);
    setFlowState(100);

    setIsFullscreen(true);

    countdownTimeoutsRef.current.forEach(clearTimeout);

    setGameState('countdown');
    setCountdownValue(3);

    const t1 = setTimeout(() => setCountdownValue(2), 700);
    const t2 = setTimeout(() => setCountdownValue(1), 1400);
    const t3 = setTimeout(() => setCountdownValue('GO'), 2100);
    const t4 = setTimeout(() => {
      startActualDrill();
    }, 2600);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [startActualDrill]);

  // Direct exit listeners on Escape, pointer lock loss, or fullscreen loss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };
    const handlePointerLockChange = () => {
      const isLocked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(isLocked || isTouchOnly);
      if (gameState === 'playing' && !isLocked && !isTouchOnly) {
        handleExitDrill();
      }
    };
    const handleFullscreenChange = () => {
      const isFs = Boolean(document.fullscreenElement);
      setIsFullscreen(isFs);
      if (!isFs && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [gameState, isTouchOnly, handleExitDrill]);

  // Strict Timer Management
  useEffect(() => {
    if (gameState === 'playing' && pointerLocked) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, pointerLocked, endGame]);

  const aimAt = useCallback((x, y) => {
    virtualCrosshair.current.x = x;
    virtualCrosshair.current.y = y;
  }, []);
  useTouchAim({ active: isTouchOnly && gameState === 'playing', canvasRef, onMove: aimAt });

  // Raw Mouse Input Listeners
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameState !== 'playing' || !pointerLocked || !canvasRef.current) return;
      const cvs = canvasRef.current;
      const dx = e.movementX * universalSens;
      const dy = e.movementY * universalSens;
      virtualCrosshair.current.x = Math.max(0, Math.min(cvs.width, virtualCrosshair.current.x + dx));
      virtualCrosshair.current.y = Math.max(0, Math.min(cvs.height, virtualCrosshair.current.y + dy));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [gameState, pointerLocked, universalSens]);

  // Render & Physics Loop
  useEffect(() => {
    const cvs = canvasRef.current; 
    const container = containerRef.current;
    if (!cvs || !container) return;
    const ctx = cvs.getContext('2d', { alpha: false });

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          cvs.width = width;
          cvs.height = height;
          if (!crosshairInitRef.current) {
            virtualCrosshair.current = { x: width / 4, y: height / 2 };
            crosshairInitRef.current = true;
          }
          if (pointsRef.current.length === 0) {
            const pts = [];
            for (let i = 0; i <= width; i++) {
              pts.push(getWaveY(i, width, height, offsetRef.current, 0));
            }
            pointsRef.current = pts;
          }
        }
      }
    });
    resizeObserver.observe(container);

    let lastTime = performance.now();

    const updateGame = (dt) => {
      const ch = virtualCrosshair.current;
      const roundedX = Math.round(ch.x);
      const points = pointsRef.current;

      if (points.length > roundedX && roundedX >= 0) {
        const targetY = points[roundedX];
        const dist = Math.abs(ch.y - targetY);

        if (dist <= tolerance) {
          if (isOffPathRef.current) {
            showFeedback("RE-ENGAGED! +10", "success");
            scoreRef.current += 10;
            triggerSuperFlowExplosion(ch.x, ch.y);
          }
          isOffPathRef.current = false;

          scoreRef.current += 1;
          streakRef.current += 1;
          if (streakRef.current > bestStreakRef.current) {
            bestStreakRef.current = streakRef.current;
          }

          // Subtle tracking particle stream
          if (Math.random() < 0.35) {
            const isHighFlow = flowRef.current >= 80;
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 1.5;
            particlesRef.current.push({
              x: ch.x + (Math.random() - 0.5) * 6,
              y: ch.y + (Math.random() - 0.5) * 6,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: 0.5,
              size: 2.0,
              color: isHighFlow ? '#34d399' : '#10b981'
            });
          }

          flowRef.current = Math.min(100, flowRef.current + dt * 15);
          focusTimerRef.current += dt;
          distractionTimerRef.current = 0;

          if (focusTimerRef.current >= 4.0) {
            scoreRef.current += 5;
            flowRef.current = Math.min(100, flowRef.current + 10);
            showFeedback("SUPER FLOW! +5", "success");
            triggerSuperFlowExplosion(ch.x, ch.y);
            focusTimerRef.current = 0;
          }
        } else {
          if (!isOffPathRef.current) {
            showFeedback("OFF PATH!", "warning");
            triggerDeviationExplosion(ch.x, ch.y);
          }
          isOffPathRef.current = true;
          streakRef.current = 0;
          flowRef.current = Math.max(0, flowRef.current - dt * 25);
          distractionTimerRef.current += dt;
          focusTimerRef.current = 0;
        }
      }

      if (Math.random() < 0.1) {
        setFlowState(Math.floor(flowRef.current));
        setScore(scoreRef.current);
      }

      // Dynamic speed & progressive wave scaling: smooth increase from 2.2 to 3.8 as time progresses
      const progress = Math.min(1, globalTimeRef.current / DRILL_DURATION);
      currentSpeedRef.current = baseSpeed + progress * 1.6;

      offsetRef.current += currentSpeedRef.current;
      globalTimeRef.current += dt;

      const pts = [];
      for (let i = 0; i <= cvs.width; i++) {
        pts.push(getWaveY(i, cvs.width, cvs.height, offsetRef.current, progress));
      }
      pointsRef.current = pts;
    };

    const loop = (time) => {
      if (isIdleFrameSkippable(gameState === 'playing', time, lastTime)) {
        animationRef.current = requestAnimationFrame(loop);
        return;
      }
      const dt = Math.min(0.033, (time - lastTime) / 1000); 
      lastTime = time;
      
      if (gameState === 'playing') {
        updateGame(dt);
      }

      // --- RENDERING PHASE ---
      const points = pointsRef.current;
      const isOffPath = isOffPathRef.current;

      ctx.fillStyle = '#05060b';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      ctx.strokeStyle = 'rgba(16, 185, 129, 0.04)';
      ctx.lineWidth = 1;
      for(let i = 0; i < cvs.width; i+= 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for(let j = 0; j < cvs.height; j+= 50) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      // Tactical Emerald Path / Dynamic Wave Corridor
      if (points.length > 0) {
        ctx.beginPath();
        ctx.lineWidth = 2.8;
        ctx.lineJoin = "round";
        const isHighCombo = streakRef.current >= 60 || flowRef.current >= 80;
        const waveColor = isOffPath ? "#ef4444" : (isHighCombo ? "#34d399" : "#10b981");
        ctx.strokeStyle = waveColor;

        ctx.moveTo(0, points[0]);
        for (let i = 1; i < points.length; i += 2) {
          ctx.lineTo(i, points[i]);
        }

        if (!isOffPath) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = waveColor;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw particles with delta-time alpha decay
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2.5;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw hit rings
      drawHitRings(ctx, hitRingsRef.current, dt);

      // Tactical Pro White Crosshair
      const ch = virtualCrosshair.current;
      if (gameState === 'playing' || gameState === 'start') {
        const radius = 14;
        const gap = 5;
        const dotRadius = 2;

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 3;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;

        // Top line
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - radius);
        ctx.lineTo(ch.x, ch.y - gap);
        ctx.stroke();

        // Bottom line
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y + gap);
        ctx.lineTo(ch.x, ch.y + radius);
        ctx.stroke();

        // Left line
        ctx.beginPath();
        ctx.moveTo(ch.x - radius, ch.y);
        ctx.lineTo(ch.x - gap, ch.y);
        ctx.stroke();

        // Right line
        ctx.beginPath();
        ctx.moveTo(ch.x + gap, ch.y);
        ctx.lineTo(ch.x + radius, ch.y);
        ctx.stroke();

        // Center dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(ch.x, ch.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, showFeedback, triggerSuperFlowExplosion, triggerDeviationExplosion]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title & Scientific Header */}
        {!isFullscreen && (
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              <span data-seo-kw="1">{copy?.title || "Mouse Tracing Game"}</span>
            </h1>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              {copy?.description || "A mouse tracing game asks you to keep the cursor on a path that keeps moving, which measures continuous tracking rather than one-off accuracy. The eye follows a smoothly moving target accurately up to roughly 30°/s; past that it falls behind and has to catch up with saccades (Krauzlis, 2004; Rashbass, 1961), and the hand can only stay on a line the eye is still tracking. The path itself is a Steering Law corridor: time to stay inside it scales with its length divided by its width (Accot & Zhai, 1997)."}
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: copy?.statFlowScore || "Flow Score", val: score },
              { label: copy?.statTimeLeft || "Time Left", val: `${timeLeft}s`, highlight: timeLeft <= 10 },
              { label: copy?.statFlowIntegrity || "Flow Integrity", val: `${flowState}%`, color: "text-emerald-400" },
              { label: copy?.statBestScore || "Best Score", val: bestScore, color: "text-amber-400" },
            ].map((s, i) => (
              <div key={i} className="border border-white/[0.06] bg-white/[0.015] px-2 py-2 rounded-xl text-center">
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">{s.label}</div>
                <div className={`text-xs sm:text-sm md:text-base font-black tabular-nums truncate ${s.highlight ? "text-red-400 animate-pulse" : s.color || "text-white"}`}>{s.val}</div>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Feedback Banner */}
        {feedback && (
          <div className="h-6 flex justify-center items-center pointer-events-none z-50">
            <div className={`animate-in zoom-in-75 fade-in duration-150 px-4 py-1 rounded-full text-white font-black tracking-widest text-xs shadow-xl ${feedbackType === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-emerald-500/20' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-yellow-500/20'}`}>
              {feedback}
            </div>
          </div>
        )}

        {/* Game Stage Container */}
        <div 
          ref={containerRef} 
          className={`overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white ${
            isFullscreen
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] flex flex-col items-center justify-center'
              : 'w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] max-md:portrait:aspect-[3/4] max-md:portrait:min-h-[420px] max-md:portrait:max-h-[76vh] max-md:landscape:min-h-[340px] max-md:landscape:max-h-[85vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col'
          }`}
        >
          {/* DOM Flash Overlay */}
          {flashes.map((f) => (
            <div key={f.id} className="fx-flash fx-flash-red" />
          ))}

          {/* IN-BOX OVERLAY HUD: Score on Left, Time on Right */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.statFlowScore || "Score"}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{score}</p>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.statTimeLeft || "Time"}</p>
                <p className={`text-2xl sm:text-3xl font-bold tabular-nums leading-tight ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{timeLeft}s</p>
              </div>
            </>
          )}

          {/* IN-GAME HUD SOUND + FLASH TOGGLES */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <div className="absolute bottom-4 right-4 z-40 flex items-center gap-2">
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setFlashEnabled((v) => {
                    drillFlash.setEnabled(!v);
                    return !v;
                  });
                }}
                className="p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Toggle Miss Flash"
              >
                {flashEnabled ? <Zap className="w-4 h-4 text-red-400" /> : <ZapOff className="w-4 h-4 text-slate-500" />}
              </button>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setSoundEnabled((v) => {
                    drillAudio.setEnabled(!v);
                    return !v;
                  });
                }}
                className="p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* Core Canvas */}
          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked && !isTouchOnly) canvasRef.current?.requestPointerLock(); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`} 
          />

          {/* START MODAL */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Activity}
              accent="emerald"
              title={copy?.title || "Mouse Tracing Game"}
              subtitle={copy?.subtitle || "Raw Input Continuous Tracking • 45s Timer"}
              startButtonText={copy?.startBtn || "Start Drill"}
              isTouchOnlyDevice={false}
              onStart={startGame}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle={copy?.countdownSubtitle || "GET READY"} />
          )}

          {/* END SCREEN — Standardized DrillResultCard */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="emerald"
              grade={analytics.grade}
              score={analytics.totalScore}
              isNewBest={isNewBest}
              playAgainText={copy?.trainAgain || "Train Again"}
              shareText={copy?.shareTitle || "Share Score"}
              exitText={copy?.exitTitle || "Exit"}
              stats={[
                { value: analytics.totalScore, label: copy?.statFlowScore || "Flow Score" },
                { value: `${analytics.maxStreak}f`, label: copy?.maxStreakLabel || "Max Streak Frames" },
                { value: `${analytics.peakFlow}%`, label: copy?.peakFlowLabel || "Peak Flow State" },
                { value: `${bestScore}`, label: copy?.bestScoreLabel || "Personal Best" },
              ]}
              onPlayAgain={startGame}
              onShare={shareScore}
              onExit={handleExitDrill}
            />
          )}
        </div>

        {/* ── ACCORDIONS ── */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0 font-sans">
            <DrillAccordion
              id="rules"
              title={copy?.rulesTitle || "Drill Instructions & Scoring System"}
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(copy?.rulesItems || RULES_ITEMS).map((item, i) => (
                  <RuleItem
                    key={i}
                    num={item.num}
                    text={item.text}
                    highlight={item.highlight}
                    result={item.result}
                  />
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title={copy?.aboutTitle || "About Mouse Tracing Game"}
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" /> {copy?.aboutHeading || "Continuous Wave Tracking & Flow Endurance"}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {copy?.aboutP1 || "The Mouse Tracing Game develops dynamic hand-eye coordination, fine motor path precision, and smooth pursuit visual tracking. By challenging you to guide your cursor along a continuously scrolling sinusoidal wave filament with a 22px tolerance band, it isolates the micro-stabilizing muscles in your wrist and forearm required for fluid tracking in tactical shooters and digital illustration."}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {copy?.aboutP2 || "Grounded in Johnny Accot & Shumin Zhai's (1997) Steering Law, dynamic trajectory navigation requires continuous velocity modulation. As scroll speed accelerates from 2.2 to 3.8+ px/frame over 45 seconds, the drill engages Robert Woodworth's (1899) closed-loop current control mechanism, demanding continuous visual-motor error correction and smooth pursuit eye movements (Krauzlis 2004, Rashbass 1961) to sustain peak flow integrity."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">{copy?.audienceTitle || "Target Audience"}</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{copy?.audienceText || "Esports athletes, graphic designers, digital artists, and individuals seeking to improve hand stability and reduce hand tremors."}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">{copy?.benefitsTitle || "Mechanical Benefits"}</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{copy?.benefitsText || "Fine motor control, continuous hand stability, flow state endurance, and smooth pursuit tracking mastery."}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">{copy?.telemetryTitle || "Telemetry Tracked"}</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{copy?.telemetryText || "Flow Score, peak flow state percentage, and maximum survival tracking streak frames."}</p>
                  </div>
                </div>
              </div>
            </DrillAccordion>
          </div>
        )}
      </main>
    </div>
  );
}

function RuleItem({ num, text, highlight = '', result }) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 bg-black px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/10 shadow-sm font-sans">
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs sm:text-sm font-black shadow flex-shrink-0">
        {num}
      </div>
      <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
        <p className="text-xs sm:text-sm font-medium text-gray-200 font-sans truncate">
          {text}{highlight && <span className="font-bold text-white"> {highlight}</span>}
        </p>
        <div className="text-[11px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#050811] border border-white/10 text-white whitespace-nowrap shadow-inner flex-shrink-0">
          {result}
        </div>
      </div>
    </div>
  );
}

