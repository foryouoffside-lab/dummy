'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import { useState, useEffect, useRef, useCallback } from 'react';

import {
  Route, Share2, Volume2, VolumeX, Zap, ZapOff
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

const DRILL_DURATION = 45; // Fixed 45-second session

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Trace Corridor", highlight: "Lap Clear", result: "+45s Reset" },
  { num: "2", text: "Reach Goal", highlight: "Endless Scaling", result: "Narrows Path" },
  { num: "3", text: "Wall Collision", highlight: "Mistake", result: "Resets to Start" },
  { num: "4", text: "Mouse Input", highlight: "Desktop", result: "1:1 Raw Tracking" }
];

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
    screenShake: 0,
    particles: [],
    hitRings: [],
    hitMarkers: []
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

  const createHitMarker = useCallback((x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  }, []);

  const createGoalExplosion = useCallback((x, y, isHighCombo) => {
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.0;
      engine.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.9,
        size: 2.0 + Math.random() * 2.0,
        color: isHighCombo ? '#34d399' : '#10b981'
      });
    }
    createHitRing(engine.current.hitRings, x, y, isHighCombo ? '#34d399' : '#10b981', 50);
    createHitMarker(x, y);
  }, [createHitMarker]);

  const createDeviationExplosion = useCallback((x, y) => {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 3.5;
      engine.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.7,
        size: 2.0,
        color: '#ef4444'
      });
    }
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
      laps: 0, mistakes: 0, maxStreak: 0, screenShake: 0,
      particles: [],
      hitRings: [],
      hitMarkers: []
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
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    setIsFullscreen(false);
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    setGameState('start');
  }, []);

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
      const deltaTimeMs = time - lastTime;
      lastTime = time;
      const dt = Math.min(deltaTimeMs / 1000, 0.1);
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
            drillAudio.playPenalty();
            createDeviationExplosion(ch.x, ch.y);
            
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
          drillAudio.playHit();
          createGoalExplosion(ch.x, ch.y, e.streak >= 10);
          
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

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1; 
      for(let i = 0; i < cvs.width; i+= 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for(let j = 0; j < cvs.height; j+= 50) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      // Start zone (0 to 100)
      ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.fillRect(0, 0, 100, cvs.height);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(0, 0, 100, cvs.height);

      // Goal zone (cvs.width - 100 to cvs.width)
      const endZoneX = cvs.width - 100;
      const isHighCombo = e.streak >= 10;
      ctx.fillStyle = isHighCombo ? 'rgba(52, 211, 153, 0.12)' : 'rgba(16, 185, 129, 0.08)';
      ctx.fillRect(endZoneX, 0, 100, cvs.height);
      ctx.strokeStyle = isHighCombo ? 'rgba(52, 211, 153, 0.35)' : 'rgba(16, 185, 129, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(endZoneX, 0, 100, cvs.height);

      // Tactical Emerald Path
      if (e.path.length > 0 && (gameState === 'playing' || gameState === 'start')) {
        const pathColor = isHighCombo ? '#34d399' : '#10b981';
        ctx.beginPath();
        ctx.strokeStyle = pathColor;
        ctx.lineWidth = 4;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.moveTo(e.path[0].x, e.path[0].y);
        for (let i = 1; i < e.path.length; i++) {
          ctx.lineTo(e.path[i].x, e.path[i].y);
        }
        ctx.shadowBlur = 12;
        ctx.shadowColor = pathColor;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Render Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size || 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Draw Hit Rings
      drawHitRings(ctx, e.hitRings, dt);

      // Draw Hit Markers
      ctx.lineWidth = 2.0;
      for (let i = e.hitMarkers.length - 1; i >= 0; i--) {
        const hm = e.hitMarkers[i];
        hm.life -= dt * 4.5;
        if (hm.life <= 0) { e.hitMarkers.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, hm.life);
        ctx.strokeStyle = '#ffffff';
        const s = 6 + (1 - hm.life) * 8;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Tactical Pro White Crosshair
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 3;
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#ffffff';

        // Outer reticle circle
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ch.x, ch.y, 14, 0, Math.PI * 2);
        ctx.stroke();

        // Reticle cross lines with center gap
        ctx.lineWidth = 1.5;
        const gap = 5;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - 14); ctx.lineTo(ch.x, ch.y - gap);
        ctx.moveTo(ch.x, ch.y + 14); ctx.lineTo(ch.x, ch.y + gap);
        ctx.moveTo(ch.x - 14, ch.y); ctx.lineTo(ch.x - gap, ch.y);
        ctx.moveTo(ch.x + 14, ch.y); ctx.lineTo(ch.x + gap, ch.y);
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
      if (gameState !== 'gameOver') {
        animationRef.current = requestAnimationFrame(loop);
      }
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, generatePath, resetCrosshairToStart, triggerRedFlash, createGoalExplosion, createDeviationExplosion]);

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
              accent="emerald"
              title={copy?.startTitle || copy?.title || "Steady Hand Circuit"}
              subtitle={copy?.startSubtitle || copy?.subtitle || "Motor Precision & Line Tracking • 45s Timer"}
              startButtonText={copy?.startBtn || copy?.startButtonText || "Start Drill"}
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
              score={analytics.laps}
              isNewBest={isNewBest}
              playAgainText={copy?.trainAgain || copy?.playAgainText || "Train Again"}
              shareText={copy?.shareTitle || copy?.shareText || "Share Score"}
              exitText={copy?.exitTitle || copy?.exitText || "Exit"}
              stats={[
                { value: analytics.laps, label: copy?.statLaps || "Laps Cleared" },
                { value: analytics.mistakes, label: copy?.errorsLabel || "Off-Path Errors" },
                { value: `${analytics.maxStreak}x`, label: copy?.maxStreakLabel || "Max Streak" },
                { value: `Lv. ${analytics.speedLevel}`, label: copy?.difficultyLabel || "Difficulty Level" },
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
                  <RuleItem key={i} num={item.num} text={item.text} highlight={item.highlight} result={item.result} />
                ))}
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
                    <Route className="w-4 h-4 text-emerald-400" /> {copy?.aboutHeading || "Continuous Path Precision & Hand Tremor Suppression"}
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
                    <h4 className="text-xs font-bold text-white mb-1.5">{copy?.aboutCard1Title || "Target Audience"}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{copy?.aboutCard1Text || "Esports athletes, digital artists, graphic designers, surgeons, and individuals seeking to improve hand stability and reduce cursor jitter."}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h4 className="text-xs font-bold text-white mb-1.5">{copy?.aboutCard2Title || "Mechanical Benefits"}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{copy?.aboutCard2Text || "Fine motor coordination, continuous hand steadiness, smooth velocity regulation, and antagonist muscle stabilization."}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h4 className="text-xs font-bold text-white mb-1.5">{copy?.aboutCard3Title || "Dynamic Tightening"}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{copy?.aboutCard3Text || "Corridor width contracts dynamically while vertex angles become sharper, demanding rigorous micro-steering discipline."}</p>
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

// === Subcomponents ===
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