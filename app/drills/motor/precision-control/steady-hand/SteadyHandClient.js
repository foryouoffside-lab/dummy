'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import { useState, useEffect, useRef, useCallback } from 'react';

import {
  AlertCircle, ArrowRight, LogOut, RefreshCw, Route, Share2,
  TrendingUp, Users, Volume2, VolumeX, Zap, ZapOff
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

const DRILL_DURATION = 45; // Fixed 45-second session

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function SteadyHandClient({ copy = null }) {
  // === UI & Viewport State ===
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [pointerLocked, setPointerLocked] = useState(false);
  const isTouchOnly = useIsTouchOnly();
  const [flashes, setFlashes] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);

  // === Settings State ===
  const universalSens = useDrillSensitivity();
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);

  // === Gameplay State ===
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  const [flashBg, setFlashBg] = useState(null);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    laps: 0,
    mistakes: 0,
    maxStreak: 0,
    speedLevel: 1,
    grade: null
  });

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const timerRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  
  // === Game Logic Engine Refs ===
  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    path: [],
    pathThickness: 2.5,
    streak: 0,
    score: 0,
    timeLeft: DRILL_DURATION,
    laps: 0,
    mistakes: 0,
    maxStreak: 0,
    screenShake: 0
  });

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedBest = localStorage.getItem('steadyHand_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch {}
    setSoundEnabled(drillAudio.isEnabled());
    setFlashEnabled(drillFlash.isEnabled());
  }, []);

  const triggerRedFlash = useCallback(() => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((prev) => [...prev, { id }]);
    setTimeout(() => {
      setFlashes((prev) => prev.filter((f) => f.id !== id));
    }, 150);
  }, []);

  const getGradeForLaps = (laps, mistakes) => {
    let letter, defaultLabel, color;
    if (laps >= 8 && mistakes === 0) {
      letter = 'S+';
      defaultLabel = 'Grandmaster Stability';
      color = 'text-fuchsia-400';
    } else if (laps >= 6 && mistakes <= 1) {
      letter = 'S';
      defaultLabel = 'Master Stability';
      color = 'text-cyan-400';
    } else if (laps >= 4 && mistakes <= 2) {
      letter = 'A';
      defaultLabel = 'Diamond Precision';
      color = 'text-emerald-400';
    } else if (laps >= 2) {
      letter = 'B';
      defaultLabel = 'Platinum Control';
      color = 'text-yellow-400';
    } else {
      letter = 'C';
      defaultLabel = 'Gold Steady';
      color = 'text-orange-400';
    }
    const label = copy?.gradeLabels?.[letter] || defaultLabel;
    return { letter, label, color };
  };

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    drillAudio.playSessionEnd();
    
    const e = engine.current;
    const grade = getGradeForLaps(e.laps, e.mistakes);

    setAnalytics({
      laps: e.laps,
      mistakes: e.mistakes,
      maxStreak: e.maxStreak,
      speedLevel: e.laps + 1,
      grade
    });

    setBestScore(prev => {
      if (e.laps > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('steadyHand_bestScore', e.laps.toString()); } catch {}
        return e.laps;
      }
      return prev;
    });
  }, []);

  const generatePath = useCallback((width, height, streak) => {
    const segments = Math.min(120, 15 + (streak * 8)); 
    const startX = 100;
    const endX = width - 100;
    const step = (endX - startX) / segments;
    const amplitude = Math.min((height / 2) - 40, 60 + (streak * 30)); 
    
    const newPath = [];
    let curY = height / 2;
    
    for (let i = 0; i <= segments; i++) {
      if (i === 0 || i === segments) {
        curY = height / 2;
      } else {
        curY += (Math.random() - 0.5) * amplitude;
        curY = Math.max(60, Math.min(height - 60, curY));
      }
      newPath.push({ x: startX + i * step, y: curY });
    }
    return newPath;
  }, []);

  const resetCrosshairToStart = useCallback((height) => {
    engine.current.crosshair.x = 50;
    engine.current.crosshair.y = height / 2;
  }, []);

  const startActualDrill = useCallback(() => {
    setGameState('playing');
    engine.current = {
      crosshair: { ...engine.current.crosshair },
      path: [],
      pathThickness: 2.5,
      streak: 0,
      score: 0,
      timeLeft: DRILL_DURATION,
      laps: 0, mistakes: 0, maxStreak: 0, screenShake: 0
    };

    if (!canvasRef.current) return;
    if (isTouchOnly) {
      setPointerLocked(true);
    } else if (!document.pointerLockElement) {
      canvasRef.current.requestPointerLock().catch(() => {});
    }
    engine.current.path = generatePath(canvasRef.current.width, canvasRef.current.height, 0);
    resetCrosshairToStart(canvasRef.current.height);
  }, [generatePath, resetCrosshairToStart, isTouchOnly]);

  const startGame = useCallback(async () => {
    drillAudio.init();
    setIsNewBest(false);
    setAnalytics({ laps: 0, mistakes: 0, maxStreak: 0, speedLevel: 1, grade: null });
    setTimeLeft(DRILL_DURATION);

    setIsFullscreen(true);

    countdownTimeoutsRef.current.forEach(clearTimeout);

    setGameState('countdown');
    setCountdownValue(3);

    const t1 = setTimeout(() => { setCountdownValue(2); }, 700);
    const t2 = setTimeout(() => { setCountdownValue(1); }, 1400);
    const t3 = setTimeout(() => { setCountdownValue('GO'); }, 2100);
    const t4 = setTimeout(() => {
      startActualDrill();
    }, 2600);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [startActualDrill]);

  const handleExitDrill = useCallback(() => {
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
    const url = copy?.shareUrl || 'https://skilldrills.online/drills/motor/precision-control/steady-hand';
    const gradeLetter = analytics.grade?.letter || 'B';
    const accuracy = analytics.mistakes === 0 ? '100%' : `${Math.max(0, 100 - analytics.mistakes * 5)}%`;
    const drillName = copy?.shareDrillName || 'Steady Hand Circuit';
    try {
      const canvas = generateShareCard({
        score: analytics.laps,
        bestScore,
        accuracy,
        rating: { letter: gradeLetter, label: analytics.grade?.label || 'Keep Going', emoji: '🖐️' },
        newBest: isNewBest,
        drillName,
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      let text = `🖐️ I completed ${analytics.laps} laps (${accuracy}) on ${drillName}! Practice at skilldrills.online!`;
      if (copy?.shareTextTemplate) {
        text = copy.shareTextTemplate
          .replace('{laps}', analytics.laps)
          .replace('{acc}', accuracy)
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

  const aimAt = useCallback((x, y) => {
    engine.current.crosshair.x = x;
    engine.current.crosshair.y = y;
  }, []);
  useTouchAim({ active: isTouchOnly && gameState === 'playing', canvasRef, onMove: aimAt });

  // Strict Timer Management
  useEffect(() => {
    if (gameState === 'playing' && pointerLocked) {
      timerRef.current = setInterval(() => {
        engine.current.timeLeft -= 1;
        setTimeLeft(engine.current.timeLeft);
        if (engine.current.timeLeft <= 0) {
          clearInterval(timerRef.current);
          endGame();
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, pointerLocked, endGame]);

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
      engine.current.crosshair.x = Math.max(0, Math.min(cvs.width, engine.current.crosshair.x + dx));
      engine.current.crosshair.y = Math.max(0, Math.min(cvs.height, engine.current.crosshair.y + dy));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [gameState, pointerLocked, universalSens]);

  // === Render & Physics Loop ===
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
          if (engine.current.path.length === 0) {
            engine.current.path = generatePath(width, height, 0);
          }
          if (!engine.current.crosshair.initialized) {
            resetCrosshairToStart(height);
            engine.current.crosshair.initialized = true;
          }
        }
      }
    });
    resizeObserver.observe(container);

    let lastTime = performance.now();
    const loop = (time) => {
      if (isIdleFrameSkippable(gameState === 'playing', time, lastTime)) {
        animationRef.current = requestAnimationFrame(loop);
        return;
      }
      lastTime = time;
      const e = engine.current;

      if (gameState === 'playing' && pointerLocked && e.path.length > 0) {
        const ch = e.crosshair;
        const startZoneEnd = 100;
        const endZoneStart = cvs.width - 100;

        // Collision Logic
        if (ch.x > startZoneEnd && ch.x < endZoneStart) {
          let onPath = false;
          
          for (let i = 0; i < e.path.length - 1; i++) {
            const p1 = e.path[i];
            const p2 = e.path[i + 1];
            
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const lenSq = dx * dx + dy * dy;
            
            let t = ((ch.x - p1.x) * dx + (ch.y - p1.y) * dy) / lenSq;
            t = Math.max(0, Math.min(1, t));
            
            const projX = p1.x + t * dx;
            const projY = p1.y + t * dy;
            
            const dist = Math.hypot(ch.x - projX, ch.y - projY);
            
            if (dist <= e.pathThickness) {
              onPath = true;
              break;
            }
          }

          if (!onPath) {
            e.mistakes++;
            e.streak = 0;
            e.screenShake = 15;
            
            triggerRedFlash();
            
            setFlashBg('red');
            setTimeout(() => setFlashBg(null), 100);

            resetCrosshairToStart(cvs.height);
          }

        } else if (ch.x >= endZoneStart) {
          e.laps++;
          e.streak++;
          if (e.streak > e.maxStreak) e.maxStreak = e.streak;
          
          // Reset timer back to DRILL_DURATION (45s) on goal completion
          e.timeLeft = DRILL_DURATION;
          
          e.path = generatePath(cvs.width, cvs.height, e.streak);
          
          setTimeLeft(e.timeLeft);
          
          setFlashBg('green');
          setTimeout(() => setFlashBg(null), 100);

          resetCrosshairToStart(cvs.height);
        }
      }

      // --- RENDERING PHASE ---
      ctx.save();
      
      if (e.screenShake > 0) {
        const sx = (Math.random() - 0.5) * e.screenShake;
        const sy = (Math.random() - 0.5) * e.screenShake;
        ctx.translate(sx, sy);
        e.screenShake *= 0.85;
        if (e.screenShake < 0.5) e.screenShake = 0;
      }

      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)';
      ctx.lineWidth = 1; 
      for(let i = 0; i < cvs.width; i+= 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for(let j = 0; j < cvs.height; j+= 50) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      ctx.fillStyle = 'rgba(0, 255, 136, 0.1)';
      ctx.fillRect(0, 0, 100, cvs.height);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.fillRect(cvs.width - 100, 0, 100, cvs.height);

      if (e.path.length > 0 && (gameState === 'playing' || gameState === 'start')) {
        ctx.beginPath();
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 4;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.moveTo(e.path[0].x, e.path[0].y);
        for (let i = 1; i < e.path.length; i++) {
          ctx.lineTo(e.path[i].x, e.path[i].y);
        }
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#06b6d4';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#00ff88' : '#f59e0b';
        ctx.fillStyle = activeColor;
        ctx.beginPath(); 
        ctx.arc(ch.x, ch.y, 4, 0, Math.PI * 2); 
        ctx.fill();
      }

      ctx.restore();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, generatePath, resetCrosshairToStart, triggerRedFlash]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title & AIO Header */}
        {!isFullscreen && (
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {copy?.h1Prefix || null}
              <span data-seo-kw="1">{copy?.h1Keyword || "Steady Hand Game"}</span>
              {copy?.h1Suffix || null}
            </h1>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              {copy?.caption || (
                <>
                  A steady hand game asks you to move a cursor along a narrow path without touching its edges, which measures fine motor steadiness rather than speed. The Steering Law sets the difficulty: the time to travel a corridor scales with its length divided by its width, so a corridor half as wide takes about twice as long to cross without a contact (Accot &amp; Zhai, 1997). Staying on the centreline is a closed-loop task &mdash; vision continuously corrects the hand while the movement is still under way (Woodworth, 1899).
                </>
              )}
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: copy?.statLaps || "Laps Cleared", val: analytics.laps || (gameState === 'playing' ? engine.current.laps : 0), color: "text-cyan-400" },
              { label: copy?.statTime || "Time Left", val: `${timeLeft}s`, highlight: timeLeft <= 10 },
              { label: copy?.statStreak || "Current Streak", val: gameState === 'playing' ? engine.current.streak : 0, color: "text-emerald-400" },
              { label: copy?.statBest || "Best Laps", val: bestScore, color: "text-amber-400" },
            ].map((s, i) => (
              <div key={i} className="border border-white/[0.06] bg-white/[0.015] px-2 py-2 rounded-xl text-center">
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">{s.label}</div>
                <div className={`text-xs sm:text-sm md:text-base font-black tabular-nums truncate ${s.highlight ? "text-red-400 animate-pulse" : s.color || "text-white"}`}>{s.val}</div>
              </div>
            ))}
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
          style={{ backgroundColor: flashBg === 'red' ? '#450a0a' : flashBg === 'green' ? '#064e3b' : '#080811' }}
        >
          {/* DOM Flash Overlay */}
          {flashes.map((f) => (
            <div key={f.id} className="fx-flash fx-flash-red" />
          ))}

          {/* IN-BOX OVERLAY HUD: Laps on Left, Time on Right */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.statLaps || "Laps"}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{analytics.laps || (gameState === 'playing' ? engine.current.laps : 0)}</p>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.statTime || "Time"}</p>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
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
                <AlertCircle className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-2">{copy?.pausedTitle || "Game Paused"}</h2>
                <p className="text-gray-300 font-medium">{copy?.pausedPrompt || "Click anywhere on the screen to lock cursor and resume."}</p>
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
              icon={Route}
              accent="cyan"
              title={copy?.startTitle || "Steady Hand Circuit"}
              subtitle={copy?.startSubtitle || "Motor Precision & Line Tracking • 45s Timer"}
              startButtonText={copy?.startBtn || "Start Drill"}
              isTouchOnlyDevice={false}
              onStart={startGame}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle={copy?.countdownSubtitle || "GET READY"} />
          )}

          {/* END SCREEN */}
          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              {/* Left Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(6,182,212,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    {copy?.newBest || "NEW BEST"}
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade.color}`}>
                  {analytics.grade.letter}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1">
                  {analytics.grade.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 tabular-nums">
                  {analytics.laps}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">{copy?.statLaps || "Laps Cleared"}</div>
              </div>

              {/* Right Stats & Actions Panel */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.laps}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{copy?.statLaps || "Laps Cleared"}</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-red-400">{analytics.mistakes}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{copy?.errorsLabel || "Off-Path Errors"}</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-amber-400">{analytics.maxStreak}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{copy?.maxStreakLabel || "Max Streak"}</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-cyan-400">{analytics.speedLevel}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{copy?.difficultyLabel || "Difficulty Level"}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> {copy?.trainAgain || "Train Again"}
                  </button>
                  <button
                    onClick={shareScore}
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform"
                    title={copy?.shareTitle || "Share Score"}
                  >
                    <Share2 className="w-4 h-4 text-cyan-400" />
                  </button>
                  <button
                    onClick={handleExitDrill}
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform"
                    title={copy?.exitTitle || "Exit & Return"}
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
              title={copy?.rulesTitle || "Drill Instructions & Scoring System"}
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RuleItem num="1" text={copy?.rule1Text || "Trace the exact"} highlight={copy?.rule1Highlight || "glowing cyan line"} result={copy?.rule1Result || "Goal Clear resets timer to 45s"} />
                <RuleItem num="2" text={copy?.rule2Text || "Reaching Goal"} highlight={copy?.rule2Highlight || "Endless scaling"} result={copy?.rule2Result || "More segments & jagged"} />
                <RuleItem num="3" text={copy?.rule3Text || "Off-Path Reset"} highlight={copy?.rule3Highlight || "Line Deviation"} result={copy?.rule3Result || "Resets position to start"} />
                <RuleItem num="4" text={copy?.rule4Text || "Strict Tracking"} highlight={copy?.rule4Highlight || "Desktop Exclusive"} result={copy?.rule4Result || "1:1 Raw Mouse Input"} />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title={copy?.aboutTitle || "About Steady Hand Game"}
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Route className="w-4 h-4 text-cyan-400" /> {copy?.aboutHeading || "Continuous Path Precision & Hand Tremor Suppression"}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {copy?.aboutP1 || (
                      <>The <strong>Steady Hand Game</strong> develops hand-eye coordination, fine motor control, and continuous path-tracing stability. By challenging you to guide your cursor precisely along a winding, jagged trajectory corridor without crossing boundary tolerances, it isolates the micro-stabilizing muscles in your wrist and forearm required for surgical mouse control.</>
                    )}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {copy?.aboutP2 || (
                      <>Grounded in Johnny Accot &amp; Shumin Zhai&apos;s (1997) Steering Law, movement time through constrained tunnels depends on the integral of path length divided by corridor width. As your lap count increases, path complexity multiplies and tolerance margins tighten from 50px down to 12px, forcing your motor cortex to recruit closed-loop visual feedback corrections (Woodworth 1899) and suppress physiological tremor.</>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">{copy?.aboutCard1Title || "Target Audience"}</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{copy?.aboutCard1Text || "Esports athletes, digital artists, graphic designers, surgeons, and individuals seeking to improve hand stability and reduce cursor jitter."}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">{copy?.aboutCard2Title || "Mechanical Benefits"}</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{copy?.aboutCard2Text || "Fine motor coordination, continuous hand steadiness, smooth velocity regulation, and antagonist muscle stabilization."}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">{copy?.aboutCard3Title || "Dynamic Tightening"}</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{copy?.aboutCard3Text || "Corridor width contracts dynamically while vertex angles become sharper, demanding rigorous micro-steering discipline."}</p>
                  </div>
                </div>
              </div>
            </DrillAccordion>
          </div>
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
          {text}{highlight && <span className="font-black text-cyan-400"> {highlight}</span>}
        </p>
        <div className="text-xs font-black px-3 py-1.5 rounded-lg bg-[#050811] border border-white/10 text-cyan-400 whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left">
          {result}
        </div>
      </div>
    </div>
  );
}

function RelatedDrillCard({ title, desc, href }) {
  return (
    <Link href={href} className="group p-5 bg-black rounded-2xl border border-gray-800 hover:border-cyan-500/50 hover:bg-white/[0.02] transition-all flex flex-col justify-between">
      <div>
        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors mb-1 text-base">{title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{desc}</p>
      </div>
      <div className="flex items-center gap-1 mt-4 text-xs text-cyan-400 font-bold font-mono">
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