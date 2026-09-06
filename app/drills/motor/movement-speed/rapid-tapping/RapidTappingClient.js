'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
  Activity, AlertCircle, LogOut, RefreshCw, Share2,
  TrendingUp, Users, Volume2, VolumeX, Zap, ZapOff
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '@/components/ShareScoreCard';
import { getPlayerName } from '@/lib/leaderboard';
import { drillAudio } from '@/lib/drillAudio';
import { useDrillSensitivity } from '@/lib/drillSensitivity';
import { drillFlash } from '@/lib/drillFlash';
import { drillTimeout } from '@/lib/drillTimeout';
import { createBackdropCache, getCanvasDpr, drawPulseRing } from '@/lib/canvasFx';
import useUnexpectedExitGuard from '@/lib/useUnexpectedExitGuard';
import DrillFooter from '@/components/drill/DrillFooter';
import DrillCountdown from '@/components/drill/DrillCountdown';
import DrillAccordion from '@/components/drill/DrillAccordion';
import FpsStartCard from '@/components/drill/FpsStartCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

const DRILL_DURATION = 45;
const ELITE_SCORE = 80;
const STORAGE_KEY = 'skilldrills_motor_rapid_tapping_v2';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, bestCps: 0, totalSessions: 0 };
    return { bestScore: 0, bestCps: 0, totalSessions: 0, ...JSON.parse(raw) };
  } catch (e) {
    return { bestScore: 0, bestCps: 0, totalSessions: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

const getCoachAdvice = (cps, totalClicks, score) => {
  if (cps < 5) {
    return "Low click rate detected — practice single-finger tapping rhythm to build baseline finger speed before attempting advanced techniques.";
  }
  if (cps < 8) {
    return "Solid baseline speed! Try experimenting with jitter clicking or butterfly clicking to increase your CPS beyond 10+ clicks per second.";
  }
  if (cps < 12) {
    return "Great clicking velocity! Focus on maintaining finger muscle endurance to prevent fatigue as the ball shrink rate accelerates.";
  }
  return "Elite CPS performance! Your rapid tapping speed and muscle endurance easily rival top-tier competitive Minecraft and FPS players.";
};


export default function RapidTappingClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const universalSens = useDrillSensitivity();
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [flashes, setFlashes] = useState([]);

  // Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [bestCps, setBestCps] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [liveCps, setLiveCps] = useState(0.0);
  const [totalClicks, setTotalClicks] = useState(0);

  const [analytics, setAnalytics] = useState({
    finalScore: 0, totalClicks: 0, cps: 0, peakCps: 0,
    maxDifficulty: 0, grade: null, coachAdvice: ''
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(DRILL_DURATION);
  const gameActiveRef = useRef(false);
  const startingRef = useRef(false);
  const countdownTimeoutsRef = useRef([]);
  const backdropCacheRef = useRef(null);
  const isPausedRef = useRef(false);

  const engine = useRef({
    crosshair: { x: 0, y: 0 },
    radius: 50,
    shrinkRate: 45,
    baseShrink: 45,
    score: 0,
    clicks: 0,
    elapsedTime: 0,
    timeLeft: DRILL_DURATION,
    clickTimestamps: [],
    particles: [],
    hitMarkers: [],
    screenShake: 0,
    logicalWidth: 800,
    logicalHeight: 450
  });

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const triggerFlash = useCallback((color = 'red') => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id, color }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);

      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestCps(saved.bestCps || 0);
    }
  }, []);

  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // Stop the render loop on unmount (e.g. SPA navigation away mid-drill) so it
  // doesn't keep scheduling requestAnimationFrame callbacks forever.
  useEffect(() => {
    return () => {
      gameActiveRef.current = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    startingRef.current = false;
    gameActiveRef.current = false;
    setIsPaused(false);

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

  const resumeDrill = useCallback(async () => {
    setIsPaused(false);
    setIsFullscreen(true);
    if (canvasRef.current && !document.pointerLockElement) {
      try { await canvasRef.current.requestPointerLock(); } catch (e) {}
    }
  }, []);

  const spawnParticles = useCallback((x, y, color, count) => {
    const e = engine.current;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 220 + 70;
      e.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 4 + 1.5,
        color,
        life: 0.35,
        maxLife: 0.35
      });
    }
  }, []);

  const addHitMarker = useCallback((x, y) => {
    const e = engine.current;
    e.hitMarkers.push({ x, y, life: 0.25 });
  }, []);

  const finishDrillSession = useCallback(() => {
    gameActiveRef.current = false;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    if (document.pointerLockElement) document.exitPointerLock();
    drillAudio.playSessionEnd();

    const e = engine.current;
    const finalTime = Math.max(1, DRILL_DURATION - e.timeLeft);
    const finalCps = parseFloat((e.clicks / finalTime).toFixed(1));
    const finalScore = Math.floor(e.score);

    let letter = 'D';
    let label = 'ROOKIE';
    let color = 'text-slate-400';

    if (finalScore >= 60 || finalCps >= 11) { letter = 'S+'; label = 'ELITE TAPPER'; color = 'text-yellow-400'; }
    else if (finalScore >= 40 || finalCps >= 9) { letter = 'S'; label = 'MASTER TAPPER'; color = 'text-amber-400'; }
    else if (finalScore >= 25 || finalCps >= 7) { letter = 'A'; label = 'PRO TAPPER'; color = 'text-emerald-400'; }
    else if (finalScore >= 15 || finalCps >= 5) { letter = 'B'; label = 'ADVANCED'; color = 'text-cyan-400'; }
    else if (finalScore >= 5 || finalCps >= 3) { letter = 'C'; label = 'INTERMEDIATE'; color = 'text-blue-400'; }

    const grade = { letter, label, color };
    const advice = getCoachAdvice(finalCps, e.clicks, finalScore);

    setAnalytics({
      finalScore,
      totalClicks: e.clicks,
      cps: finalCps,
      peakCps: finalCps,
      maxDifficulty: Math.floor(((e.shrinkRate / e.baseShrink) - 1) * 100),
      grade,
      coachAdvice: advice
    });

    setUiScore(finalScore);

    const saved = getSavedData();
    const isNewRecord = finalScore > saved.bestScore;
    setIsNewBest(isNewRecord);

    const updatedData = {
      bestScore: Math.max(saved.bestScore, finalScore),
      bestCps: Math.max(saved.bestCps, finalCps),
      totalSessions: (saved.totalSessions || 0) + 1
    };

    saveData(updatedData);
    setBestScore(updatedData.bestScore);
    setBestCps(updatedData.bestCps);
    setGameState('gameOver');
  }, []);

  const handlePointerDown = useCallback((e) => {
    if (!gameActiveRef.current || isPausedRef.current) return;
    const eng = engine.current;
    const cvs = canvasRef.current;
    if (!cvs) return;

    if (!document.pointerLockElement && e) {
      const rect = cvs.getBoundingClientRect();
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      if (clientX !== undefined && clientY !== undefined) {
        eng.crosshair.x = Math.max(0, Math.min(eng.logicalWidth, clientX - rect.left));
        eng.crosshair.y = Math.max(0, Math.min(eng.logicalHeight, clientY - rect.top));
      }
    }

    if (!isTouchOnlyDevice && !document.pointerLockElement) {
      cvs.requestPointerLock().catch(() => {});
    }

    const cx = eng.logicalWidth / 2;
    const cy = eng.logicalHeight / 2;
    const distToCenter = Math.hypot(eng.crosshair.x - cx, eng.crosshair.y - cy);

    if (distToCenter <= eng.radius + 18) {
      eng.clicks++;
      eng.radius = Math.min(140, eng.radius + 10);
      eng.clickTimestamps.push(performance.now());

      addHitMarker(eng.crosshair.x, eng.crosshair.y);

      if (eng.clicks % 10 === 0) {
        eng.score += 1;
        drillAudio.playHit();
        spawnParticles(cx, cy, '#d946ef', 14);
        eng.screenShake = 6;

        // Dynamic difficulty shrink acceleration
        if (eng.score % 30 === 0) eng.shrinkRate = Math.min(600, eng.shrinkRate * 1.15);
        else if (eng.score % 20 === 0) eng.shrinkRate = Math.min(600, eng.shrinkRate * 1.12);
        else if (eng.score % 10 === 0) eng.shrinkRate = Math.min(600, eng.shrinkRate * 1.10);
        else if (eng.score % 5 === 0) eng.shrinkRate = Math.min(600, eng.shrinkRate * 1.08);

        setUiScore(eng.score);
      } else {
        drillAudio.playHit();
      }

      setTotalClicks(eng.clicks);
    } else {
      drillAudio.playPenalty();
      triggerFlash('red');
    }
  }, [isTouchOnlyDevice, spawnParticles, addHitMarker, triggerFlash]);

  const runPlayingLoop = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (now) => {
      if (!gameActiveRef.current) return;
      if (isIdleFrameSkippable(gameState === 'playing', now, lastTime)) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const e = engine.current;
      const isCurrentlyPaused = isPausedRef.current;

      if (!isCurrentlyPaused) {
        e.timeLeft -= dt;
        e.elapsedTime += dt;

        // Shrink Target Ball
        if (drillTimeout.isEnabled()) e.radius -= e.shrinkRate * dt;
        if (drillTimeout.isEnabled() && e.radius <= 0) {
          e.radius = 45;
          drillAudio.playPenalty();
          e.screenShake = 12;
          triggerFlash('red');
          spawnParticles(e.logicalWidth / 2, e.logicalHeight / 2, '#ef4444', 18);
        }

        // Live CPS calculation (past 2 seconds window)
        const recentClicks = e.clickTimestamps.filter((t) => now - t <= 2000);
        const calcCps = recentClicks.length > 0 ? parseFloat((recentClicks.length / 2.0).toFixed(1)) : 0.0;
        setLiveCps(calcCps);

        if (Math.abs(e.timeLeft - lastTimeRef.current) > 0.1) {
          lastTimeRef.current = e.timeLeft;
          setUiTimeLeft(Math.max(0, Math.ceil(e.timeLeft)));
        }

        if (e.timeLeft <= 0) {
          finishDrillSession();
          return;
        }

        if (e.screenShake > 0) {
          e.screenShake = Math.max(0, e.screenShake - dt * 35);
        }
      }

      const dpr = getCanvasDpr(ctx);
      const w = e.logicalWidth;
      const h = e.logicalHeight;

      if (!backdropCacheRef.current) {
        backdropCacheRef.current = createBackdropCache(w, h, (bCtx) => {
          bCtx.fillStyle = '#050508';
          bCtx.fillRect(0, 0, w, h);

          bCtx.strokeStyle = 'rgba(217, 70, 239, 0.04)';
          bCtx.lineWidth = 1;
          for (let x = 0; x < w; x += 50) {
            bCtx.beginPath();
            bCtx.moveTo(x, 0);
            bCtx.lineTo(x, h);
            bCtx.stroke();
          }
          for (let y = 0; y < h; y += 50) {
            bCtx.beginPath();
            bCtx.moveTo(0, y);
            bCtx.lineTo(w, y);
            bCtx.stroke();
          }
        });
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.drawImage(backdropCacheRef.current, 0, 0, w, h);

      if (e.screenShake > 0) {
        const sx = (Math.random() - 0.5) * e.screenShake;
        const sy = (Math.random() - 0.5) * e.screenShake;
        ctx.translate(sx, sy);
      }

      const cx = w / 2;
      const cy = h / 2;

      // Maximum Safe Bounds Ring (140px)
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Render Dynamic Target Ball
      const fillPercent = Math.max(0, e.radius / 140);
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(2, e.radius), 0, Math.PI * 2);

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(2, e.radius));
      if (fillPercent < 0.28) {
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.85)');
        grad.addColorStop(1, 'rgba(239, 68, 68, 0.2)');
        ctx.strokeStyle = '#ef4444';
      } else {
        grad.addColorStop(0, 'rgba(217, 70, 239, 0.85)');
        grad.addColorStop(1, 'rgba(217, 70, 239, 0.2)');
        ctx.strokeStyle = '#d946ef';
      }

      ctx.fillStyle = grad;
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.stroke();

      drawPulseRing(ctx, cx, cy, e.radius + 6, fillPercent, fillPercent < 0.28 ? '#ef4444' : '#d946ef');

      // Center Dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Render Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        if (p.life <= 0) {
          e.particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * Math.max(0, p.life / p.maxLife), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      // Render Hit Markers
      for (let i = e.hitMarkers.length - 1; i >= 0; i--) {
        const hm = e.hitMarkers[i];
        hm.life -= dt;
        if (hm.life <= 0) {
          e.hitMarkers.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.strokeStyle = '#d946ef';
        ctx.lineWidth = 2;
        const sz = 8 * (1 - hm.life / 0.25);
        ctx.beginPath();
        ctx.moveTo(hm.x - sz, hm.y - sz); ctx.lineTo(hm.x + sz, hm.y + sz);
        ctx.moveTo(hm.x + sz, hm.y - sz); ctx.lineTo(hm.x - sz, hm.y + sz);
        ctx.stroke();
        ctx.restore();
      }

      // Professional FPS Gaming Reticle Cursor
      const px = e.crosshair.x;
      const py = e.crosshair.y;

      ctx.save();
      ctx.shadowColor = '#d946ef';
      ctx.shadowBlur = 6;

      const gap = 5;
      const len = 7;
      ctx.strokeStyle = '#d946ef';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(px, py - gap); ctx.lineTo(px, py - gap - len);
      ctx.moveTo(px, py + gap); ctx.lineTo(px, py + gap + len);
      ctx.moveTo(px - gap, py); ctx.lineTo(px - gap - len, py);
      ctx.moveTo(px + gap, py); ctx.lineTo(px + gap + len, py);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(217, 70, 239, 0.45)';
      ctx.lineWidth = 1;
      ctx.arc(px, py, 14, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      ctx.restore();

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);
  }, [finishDrillSession, spawnParticles, triggerFlash]);

  const startActualDrill = useCallback(() => {
    setGameState('playing');
    setIsPaused(false);
    gameActiveRef.current = true;

    const e = engine.current;
    e.score = 0;
    e.clicks = 0;
    e.radius = 50;
    e.shrinkRate = 45;
    e.elapsedTime = 0;
    e.timeLeft = DRILL_DURATION;
    e.clickTimestamps = [];

    setUiScore(0);
    setLiveCps(0.0);
    setTotalClicks(0);
    setUiTimeLeft(DRILL_DURATION);

    const cvs = canvasRef.current;
    if (cvs) {
      e.crosshair.x = e.logicalWidth / 2;
      e.crosshair.y = e.logicalHeight / 2;
    }

    runPlayingLoop();
  }, [runPlayingLoop]);

  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    setIsFullscreen(true);

    if (canvasRef.current && !isTouchOnlyDevice && !document.pointerLockElement) {
      try { await canvasRef.current.requestPointerLock(); } catch (e) {}
    }

    setGameState('countdown');
    setCountdownValue(3);
    drillAudio.playCountdownTick();

    const t1 = setTimeout(() => {
      setCountdownValue(2);
      drillAudio.playCountdownTick();
    }, 1000);

    const t2 = setTimeout(() => {
      setCountdownValue(1);
      drillAudio.playCountdownTick();
    }, 2000);

    const t3 = setTimeout(() => {
      drillAudio.playGo();
      startingRef.current = false;
      startActualDrill();
    }, 3000);

    countdownTimeoutsRef.current = [t1, t2, t3];
  }, [isTouchOnlyDevice, startActualDrill]);

  useEffect(() => {
    const cvs = canvasRef.current;
    const container = containerRef.current;
    if (!cvs || !container) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);

      if (w > 0 && h > 0) {
        cvs.width = Math.floor(w * dpr);
        cvs.height = Math.floor(h * dpr);
        cvs.style.width = `${w}px`;
        cvs.style.height = `${h}px`;

        engine.current.logicalWidth = w;
        engine.current.logicalHeight = h;
        backdropCacheRef.current = null;
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && gameState === 'playing') {
        setIsPaused(true);
      }
    };

    const handlePointerLockChange = () => {
      const isLocked = !!document.pointerLockElement;
      setPointerLocked(isLocked);
      if (!isLocked && gameActiveRef.current && !isTouchOnlyDevice) {
        setIsPaused(true);
      }
    };

    const handleMouseMove = (e) => {
      if (!gameActiveRef.current) return;
      const eng = engine.current;
      const cvs = canvasRef.current;

      if (document.pointerLockElement) {
        eng.crosshair.x = Math.max(0, Math.min(eng.logicalWidth, eng.crosshair.x + e.movementX * universalSens));
        eng.crosshair.y = Math.max(0, Math.min(eng.logicalHeight, eng.crosshair.y + e.movementY * universalSens));
      } else if (cvs) {
        const rect = cvs.getBoundingClientRect();
        eng.crosshair.x = Math.max(0, Math.min(eng.logicalWidth, e.clientX - rect.left));
        eng.crosshair.y = Math.max(0, Math.min(eng.logicalHeight, e.clientY - rect.top));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [universalSens, gameState, isTouchOnlyDevice]);

  const shareScore = useCallback(async () => {
    const player = getPlayerName();
    const gradeLetter = analytics.grade ? analytics.grade.letter : 'A';
    const url = 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: `${analytics.cps} CPS`,
        rating: { letter: gradeLetter, label: analytics.grade?.label || 'Keep Going', emoji: '⚡' },
        newBest: isNewBest,
        drillName: 'CPS Test',
        playerName: player,
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (${analytics.cps} CPS) on the CPS Test! Practice at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'CPS Test Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, analytics, bestScore, isNewBest]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title & AIO Header */}
        {!isFullscreen && (
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              CPS Test
            </h1>
            <p className="text-sm text-slate-400 mt-1.5 leading-relaxed max-w-3xl">
              A CPS test counts how many times you can click a mouse button in one second. Sustained one-finger clicking runs to roughly 5&ndash;7 clicks per second, because the standard finger tapping test puts a healthy adult&apos;s dominant index finger near 50&ndash;55 taps per 10 seconds (Halstead, 1947) &mdash; the much higher numbers quoted online come from jitter and butterfly techniques, which do not use one finger press per click.
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-white tabular-nums">{uiScore}</div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Time Left</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">CPS Rate</div>
              <div className="text-lg sm:text-xl font-black text-fuchsia-400 tabular-nums">{liveCps}</div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Best Score</div>
              <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums">{bestScore}</div>
            </div>
          </div>
        )}

        {/* Game Stage Container */}
        <div
          ref={containerRef}
          onContextMenu={(e) => { if (gameActiveRef.current) e.preventDefault(); }}
          className={`overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white border border-white/10 ${
            isFullscreen
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#080811] rounded-none border-none flex flex-col items-center justify-center'
              : 'w-full rounded-2xl bg-[#080811] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] relative overflow-hidden flex flex-col'
          }`}
          style={{ touchAction: gameActiveRef.current ? 'none' : 'auto' }}
        >
          {/* DOM Flash Overlay */}
          {flashes.map((f) => (
            <div key={f.id} className="fx-flash fx-flash-red" />
          ))}

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{uiScore}</p>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time</p>
                <p className={`text-2xl sm:text-3xl font-bold tabular-nums leading-tight ${uiTimeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{uiTimeLeft}s</p>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-fuchsia-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* PAUSE OVERLAY IF GAME IS PAUSED */}
          {gameState === 'playing' && !isTouchOnlyDevice && isPaused && (
            <div
              className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                resumeDrill();
              }}
            >
              <div className="text-center animate-pulse pointer-events-none">
                <AlertCircle className="w-12 h-12 text-fuchsia-400 mx-auto mb-3" />
                <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-1">Game Paused</h2>
                <p className="text-xs text-gray-300 font-medium">Click to resume — drill timer and pointer lock will re-engage.</p>
              </div>
            </div>
          )}

          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`}
          />

          {/* START MODAL */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Activity}
              accent="fuchsia"
              title="CPS Test"
              subtitle="CPS Click Speed Trainer • Hardware Raw Input"
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
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
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(217,70,239,.12), transparent 70%)' }}>
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
                  {uiScore}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500">Points</div>
              </div>

              {/* Right Stats & Actions Panel */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">

                {/* 4 Stat Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.cps}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Average CPS</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.totalClicks}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Total Clicks</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">+{analytics.maxDifficulty}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Max Difficulty</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{bestCps}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak CPS</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={enterDrill}
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Play Again
                  </button>
                  <button
                    onClick={shareScore}
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform"
                    title="Share Score"
                  >
                    <Share2 className="w-4 h-4 text-fuchsia-400" />
                  </button>
                  <button
                    onClick={handleExitDrill}
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform"
                    title="Exit & Return"
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
                <RuleItem num="1" text="Rapid Target Tapping" highlight="(Click Target Ball)" result="Expands target radius & prevents decay" />
                <RuleItem num="2" text="Scoring Threshold" highlight="+1 Point per 10 Clicks" result="Builds final session score" />
                <RuleItem num="3" text="Dynamic Shrink Rate" highlight="Accelerates at higher scores" result="Pushes finger speed & endurance limits" />
                <RuleItem num="4" text="Zero Ball Radius" highlight="Triggers Penalty Reset" result="Resets ball to base size with time penalty" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About the CPS Test"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-fuchsia-400" /> Neuromuscular Tapping Frequency &amp; Clicking Endurance
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300">
                    The <strong>CPS Test (rapid tapping test)</strong> isolates and evaluates the maximum firing rate of your neuromuscular pathway, measuring how many discrete ballistic inputs your motor cortex can generate per second. In competitive gaming environments like <strong>Minecraft PvP, MOBA combat, and semi-automatic pistol rounds in CS2/Valorant</strong>, click frequency directly determines damage throughput and engagement outcomes.
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    While casual tapping relies on voluntary finger flexor contractions averaging 5–7 CPS, advanced techniques like <strong>jitter clicking</strong> (transmitting micro-vibrations via isometric forearm co-contraction) and <strong>butterfly clicking</strong> (alternating dual-finger actuation) push mechanical switch actuation up to 12–20+ CPS. Grounded in Ward Halstead&apos;s (1947) finger tapping norms and Todor &amp; Kyprie&apos;s (1980) motor oscillation research, our continuous shrink-rate engine tests both your burst velocity and muscular endurance over a sustained 45-second session.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-fuchsia-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">Target Audience</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Competitive Minecraft PvP players, tactical FPS gamers, and rhythm game enthusiasts training finger tapping frequency and endurance.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">Physiological Benefits</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Strengthens finger extensor and flexor tendons, elevates motor unit recruitment velocity, and delays neuromuscular fatigue.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-pink-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">Dynamic Decay Engine</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Target decay accelerates up to +600px/sec as score increases, demanding faster CPS and unrelenting tap frequency.</p>
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
function StatCard({ icon, value, label, unit = '', accentColor = 'border-white/10' }) {
  return (
    <div className={`rounded-xl border ${accentColor} bg-black backdrop-blur-md p-1.5 sm:p-2.5 text-center flex flex-col items-center justify-center transition-all duration-300 shadow-md hover:-translate-y-0.5 pointer-events-none font-sans`}>
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-black border border-white/10 flex items-center justify-center mb-1 shadow-inner">
        {icon}
      </div>
      <p className="text-xs sm:text-lg lg:text-xl font-black tracking-tight text-white leading-none truncate w-full font-mono tabular-nums">
        {value}<span className="text-[9px] sm:text-xs font-semibold ml-0.5 text-gray-400 font-sans">{unit}</span>
      </p>
      <p className="text-[8px] sm:text-[9.5px] font-bold uppercase tracking-wider text-gray-400 mt-1 truncate w-full">{label}</p>
    </div>
  );
}

function RuleItem({ num, text, highlight = '', result }) {
  return (
    <div className="flex items-center gap-4 bg-black p-4 rounded-xl border border-white/10 shadow-sm">
      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0">{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-100 font-sans">
          {text}{highlight && <span className="font-black font-sans text-white"> {highlight}</span>}
        </p>
        <div className="text-xs font-black px-3 py-1.5 rounded-lg bg-[#050811] border border-white/10 text-white whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left">
          {result}
        </div>
      </div>
    </div>
  );
}
