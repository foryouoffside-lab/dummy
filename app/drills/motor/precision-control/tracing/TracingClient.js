'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, BarChart3, Flame, RefreshCw, Target,
  Timer, TrendingUp, Trophy, Zap, ZapOff, Users, Share2, LogOut, Volume2, VolumeX
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '@/components/ShareScoreCard';
import { getPlayerName } from '@/lib/leaderboard';
import { drillAudio } from '@/lib/drillAudio';
import { useDrillSensitivity } from '@/lib/drillSensitivity';
import { drillFlash } from '@/lib/drillFlash';
import useUnexpectedExitGuard from '@/lib/useUnexpectedExitGuard';
import DrillFooter from '@/components/drill/DrillFooter';
import DrillCountdown from '@/components/drill/DrillCountdown';
import DrillAccordion from '@/components/drill/DrillAccordion';
import FpsStartCard from '@/components/drill/FpsStartCard';
import useImmersiveMode from '@/lib/useImmersiveMode';
import { useIsTouchOnly, useTouchAim } from '@/lib/useTouchAim';

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

function getGradeForFlow(peakFlow, totalScore) {
  if (peakFlow >= 90 && totalScore >= 1400) return { letter: 'S+', label: 'Grandmaster Flow', color: 'text-fuchsia-400' };
  if (peakFlow >= 80) return { letter: 'S', label: 'Peak Flow State', color: 'text-cyan-400' };
  if (peakFlow >= 60) return { letter: 'A', label: 'Locked-In Tracking', color: 'text-emerald-400' };
  if (peakFlow >= 35) return { letter: 'B', label: 'Steady Tracking', color: 'text-yellow-400' };
  return { letter: 'C', label: 'Tracing Complete', color: 'text-orange-400' };
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FineMotorClient() {
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
  
  // === Game Logic Engine Refs ===
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const crosshairInitRef = useRef(false);
  
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const flowRef = useRef(100);
  const focusTimerRef = useRef(0);
  const distractionTimerRef = useRef(0);

  // Per-instance mutable wave state (was module-level `let`, which leaked
  // across mounts/instances instead of resetting per drill session)
  const currentSpeedRef = useRef(baseSpeed);
  const pointsRef = useRef([]);
  const offsetRef = useRef(0);
  const isOffPathRef = useRef(false);
  const globalTimeRef = useRef(0);

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

  const triggerFlash = useCallback(() => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    drillAudio.playSessionEnd();

    const finalScore = scoreRef.current;
    const peakFlow = Math.floor(flowRef.current);
    const grade = getGradeForFlow(peakFlow, finalScore);

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
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    setIsFullscreen(false);
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    setGameState('start');
  }, []);

  // Stop the drill if the player leaves any way other than the in-app Exit
  // button (back gesture, tab switch, Esc) instead of running invisibly.
  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/motor/precision-control/tracing';
    try {
      const canvas = generateShareCard({
        score: analytics.totalScore,
        bestScore,
        accuracy: `${analytics.peakFlow}%`,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Tracing Complete', emoji: '🌊' },
        newBest: isNewBest,
        drillName: 'Wave Tracing Trainer',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🌊 I scored ${analytics.totalScore} PTS (${analytics.peakFlow}% Flow) on Wave Tracing Trainer! Test your hand-eye coordination at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Wave Tracing Trainer Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [analytics, bestScore, isNewBest]);

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

    setIsFullscreen(true);

    setGameState('countdown');
    setCountdownValue(3);

    setTimeout(() => setCountdownValue(2), 1000);
    setTimeout(() => setCountdownValue(1), 2000);
    setTimeout(() => {
      startActualDrill();
    }, 3000);
  }, [startActualDrill]);



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
    const handlePointerLockChange = () => setPointerLocked(document.pointerLockElement === canvasRef.current);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

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
          }
          isOffPathRef.current = false;

          scoreRef.current += 1;
          streakRef.current += 1;
          if (streakRef.current > bestStreakRef.current) {
            bestStreakRef.current = streakRef.current;
          }

          flowRef.current = Math.min(100, flowRef.current + dt * 15);
          focusTimerRef.current += dt;
          distractionTimerRef.current = 0;

          if (focusTimerRef.current >= 4.0) {
            scoreRef.current += 5;
            flowRef.current = Math.min(100, flowRef.current + 10);
            showFeedback("SUPER FLOW! +5", "success");
            focusTimerRef.current = 0;
          }
        } else {
          if (!isOffPathRef.current) {
            showFeedback("OFF PATH!", "warning");
            triggerFlash();
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

      ctx.strokeStyle = 'rgba(244, 63, 94, 0.04)';
      ctx.lineWidth = 1;
      for(let i = 0; i < cvs.width; i+= 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for(let j = 0; j < cvs.height; j+= 50) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      if (points.length > 0) {
        ctx.beginPath();
        ctx.lineWidth = 2.5;
        ctx.lineJoin = "round";
        ctx.strokeStyle = isOffPath ? "#ef4444" : "#f43f5e";

        ctx.moveTo(0, points[0]);
        for (let i = 1; i < points.length; i += 2) {
          ctx.lineTo(i, points[i]);
        }

        if (!isOffPath) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#f43f5e";
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      const ch = virtualCrosshair.current;
      if (gameState === 'playing' || gameState === 'start') {
        ctx.beginPath();
        ctx.arc(ch.x, ch.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = isOffPath ? "#64748b" : "#00ff88";
        ctx.fill();

        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ch.x - 18, ch.y); ctx.lineTo(ch.x + 18, ch.y);
        ctx.moveTo(ch.x, ch.y - 18); ctx.lineTo(ch.x, ch.y + 18);
        ctx.stroke();

        if (!isOffPath) {
          ctx.beginPath();
          ctx.arc(ch.x, ch.y, 14, 0, Math.PI * 2);
          ctx.strokeStyle = "#00ff88";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, showFeedback, triggerFlash]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              Wave Tracing Trainer
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
                Mouse Tracing Game
              </span>
            </h1>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Flow Score</div>
              <div className="text-lg sm:text-xl font-black text-white tabular-nums">{score}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{timeLeft}s</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Flow Integrity</div>
              <div className="text-lg sm:text-xl font-black text-rose-400 tabular-nums">{flowState}%</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Score</div>
              <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums">{bestScore}</div>
            </div>
          </div>
        )}

        {/* Dynamic Feedback Banner */}
        {feedback && (
          <div className="h-6 flex justify-center items-center pointer-events-none z-50">
            <div className={`animate-in zoom-in-75 fade-in duration-150 px-4 py-1 rounded-full text-white font-black tracking-widest text-xs shadow-xl ${feedbackType === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-yellow-500/20'}`}>
              {feedback}
            </div>
          </div>
        )}

        {/* Game Stage Container */}
        <div 
          ref={containerRef} 
          className={`overflow-hidden transition-all duration-150 select-none bg-[#080811] text-white border border-white/10 ${
            isFullscreen
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#080811] rounded-none border-none flex flex-col items-center justify-center'
              : 'w-full rounded-2xl bg-[#080811] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] relative overflow-hidden flex flex-col'
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
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{score}</p>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time</p>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-rose-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* Paused Overlay */}
          {gameState === 'playing' && !pointerLocked && (
            <div 
              className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center cursor-pointer"
              onClick={(e) => { 
                e.stopPropagation(); 
                if (canvasRef.current) canvasRef.current.requestPointerLock(); 
              }}
            >
              <div className="text-center animate-pulse pointer-events-none">
                <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-2">Game Paused</h2>
                <p className="text-gray-300 font-medium">Click anywhere on the screen to lock cursor and resume.</p>
              </div>
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
              accent="red"
              title="Wave Tracing Trainer"
              subtitle="Raw Input Continuous Tracking • 45s Timer"
              rules={[
                { icon: Target, accent: 'redOrange', title: 'Objective', text: 'Keep Crosshair Perfectly Aligned with Wave' },
                { icon: Zap, accent: 'purple', title: 'Continuous Flow', text: 'Wave Never Stops, Re-acquire to Maintain Flow' },
              ]}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: Flame, label: 'Peak Flow', value: `${analytics.peakFlow}%`, color: 'text-rose-400', accent: 'redOrange' },
                { icon: Timer, label: 'Duration', value: '45s', color: 'text-blue-400', accent: 'blue' },
              ]}
              isTouchOnlyDevice={false}
              onStart={startGame}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" />
          )}

          {/* END SCREEN */}
          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              {/* Left Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(244,63,94,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade.color}`}>
                  {analytics.grade.letter}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1">
                  {analytics.grade.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 tabular-nums">
                  {analytics.totalScore}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Flow Score</div>
              </div>

              {/* Right Stats & Actions Panel */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.totalScore}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Flow Score</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-amber-400">{analytics.maxStreak}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Max Streak Frames</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-rose-400">{analytics.peakFlow}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Flow State</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Train Again
                  </button>
                  <button
                    onClick={shareScore}
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform"
                    title="Share Score"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleExitDrill}
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform"
                    title="Exit Drill & Return"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── ACCORDIONS ── */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
            <DrillAccordion
              id="rules"
              title="Drill Instructions & Scoring System"
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RuleItem num="1" text="Trace the exact" highlight="glowing red wave" result="+1 PT / frame locked-on" />
                <RuleItem num="2" text="Scroll speed ramps" highlight="Dynamically" result="3.6 → 7.2 over 45s" />
                <RuleItem num="3" text="Continuous Flow" highlight="Re-acquire Target" result="Wave never stops!" />
                <RuleItem num="4" text="Strict Tracking" highlight="Desktop Exclusive" result="1:1 Raw Mouse Input" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Wave Tracing Trainer"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-rose-400" /> Continuous Wave Tracking & Flow Endurance
                  </h4>
                  <p className="text-sm leading-relaxed mb-3">
                    This fine motor drill develops hand-eye coordination and path precision by challenging you to physically guide your cursor along a dynamic, scrolling wave. The wave moves continuously regardless of your position, challenging you to quickly re-acquire the target if you slip off, forcing you to develop seamless positional awareness and flow state endurance.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Target Audience</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Esports athletes, graphic designers, digital artists, and individuals seeking to improve hand stability and reduce hand tremors.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Mechanical Benefits</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Fine motor control, continuous hand stability, flow state endurance, and mouse sensitivity mastery.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Telemetry Tracked</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Flow Score, peak flow state percentage, and maximum survival tracking streak frames.</p>
                  </div>
                </div>
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="faq"
              title="Frequently Asked Questions"
              isOpen={openAccordion === 'faq'}
              onToggle={() => setOpenAccordion(openAccordion === 'faq' ? null : 'faq')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FAQItem q="Why does the wave keep moving?" a="The continuous motion mimics tracking smooth dynamic targets in tactical games. Re-acquiring target alignment under motion trains rapid adaptive crosshair recentering." />
                <FAQItem q="How is Flow Integrity calculated?" a="Flow Integrity is a 0-100 meter that rises while your crosshair stays aligned on the wave and drains when you drift off, tracked across your 45-second session." />
              </div>
            </DrillAccordion>
          </div>
        )}

        {/* ── RELATED DRILLS ── */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 font-sans">
              Related Motor &amp; Precision Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <RelatedCard href="/drills/motor/precision-control/steady-hand" title="Steady Hand Circuit" desc="Guide cursor along a jagged line without deviation." />
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer" desc="Hone spatial coordinate click speed." />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Calibrate pulling pattern compensation." />
            </div>
          </section>
        )}

        {/* ── FOOTER ── */}
        {!isFullscreen && <DrillFooter />}

      </main>
    </div>
  );
}

// === Subcomponents ===

function RuleItem({ num, text, highlight = '', result }) {
  return (
    <div className="flex items-center gap-4 bg-black p-4 rounded-xl border border-white/10 shadow-sm">
      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0">{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-100 font-sans">
          {text}{highlight && <span className="font-black text-rose-400"> {highlight}</span>}
        </p>
        <div className="text-xs font-black px-3 py-1.5 rounded-lg bg-[#050811] border border-white/10 text-rose-400 whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left">
          {result}
        </div>
      </div>
    </div>
  );
}

function RelatedCard({ href, title, desc }) {
  return (
    <Link href={href} className="group p-5 bg-black rounded-2xl border border-gray-800 hover:border-rose-500/50 hover:bg-white/[0.02] transition-all flex flex-col justify-between">
      <div>
        <h4 className="font-bold text-white group-hover:text-rose-400 transition-colors mb-1 text-base">{title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{desc}</p>
      </div>
      <div className="flex items-center gap-1 mt-4 text-xs text-rose-400 font-bold font-mono">
        <span>TRY DRILL</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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