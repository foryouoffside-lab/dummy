'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
  Activity, BarChart3,
  TrendingUp, Users, Volume2, VolumeX, Zap, ZapOff
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '@/components/ShareScoreCard';
import { getPlayerName } from '@/lib/leaderboard';
import { drillAudio } from '@/lib/drillAudio';
import { useDrillSensitivity } from '@/lib/drillSensitivity';
import { drillFlash } from '@/lib/drillFlash';
import { drillTimeout } from '@/lib/drillTimeout';
import { createBackdropCache, getCanvasDpr, createHitRing, drawHitRings } from '@/lib/canvasFx';
import DrillCountdown from '@/components/drill/DrillCountdown';
import DrillAccordion from '@/components/drill/DrillAccordion';
import FpsStartCard from '@/components/drill/FpsStartCard';
import DrillResultCard from '@/components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';
import { useTranslation } from '@/lib/i18n/useTranslation';
import useUnexpectedExitGuard from '@/lib/useUnexpectedExitGuard';

const DRILL_DURATION = 45;
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

const getCoachAdvice = (cps, totalClicks, score, t) => {
  if (cps < 5) {
    return t ? t('rapidTapping.coachLow', "Low click rate detected — practice single-finger tapping rhythm to build baseline finger speed before attempting advanced techniques.") : "Low click rate detected — practice single-finger tapping rhythm to build baseline finger speed before attempting advanced techniques.";
  }
  if (cps < 8) {
    return t ? t('rapidTapping.coachSolid', "Solid baseline speed! Try experimenting with jitter clicking or butterfly clicking to increase your CPS beyond 10+ clicks per second.") : "Solid baseline speed! Try experimenting with jitter clicking or butterfly clicking to increase your CPS beyond 10+ clicks per second.";
  }
  if (cps < 12) {
    return t ? t('rapidTapping.coachGreat', "Great clicking velocity! Focus on maintaining finger muscle endurance to prevent fatigue as the ball shrink rate accelerates.") : "Great clicking velocity! Focus on maintaining finger muscle endurance to prevent fatigue as the ball shrink rate accelerates.";
  }
  return t ? t('rapidTapping.coachElite', "Elite CPS performance! Your rapid tapping speed and muscle endurance easily rival top-tier competitive Minecraft and FPS players.") : "Elite CPS performance! Your rapid tapping speed and muscle endurance easily rival top-tier competitive Minecraft and FPS players.";
};

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Rapid Tap", highlight: "Expands Ball", result: "Prevents Decay" },
  { num: "2", text: "Click Threshold", highlight: "+1 / 10 Clicks", result: "Session Score" },
  { num: "3", text: "Decay Speed", highlight: "Dynamic Scaling", result: "Pushes Speed Limit" },
  { num: "4", text: "Tapping Form", highlight: "Jitter / Butterfly", result: "Maximizes Peak CPS" }
];

export default function RapidTappingClient({ copy } = {}) {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
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
    hitRings: [],
    screenShake: 0,
    logicalWidth: 800,
    logicalHeight: 450
  });

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
      countdownTimeoutsRef.current = [];
      gameActiveRef.current = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleExitDrill = useCallback(() => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    startingRef.current = false;
    gameActiveRef.current = false;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

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

  // Direct exit on Escape, pointer lock loss, or fullscreen exit
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };
    const handlePointerLockChange = () => {
      const isLocked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(isLocked || isTouchOnlyDevice);
      if (gameState === 'playing' && !isLocked && !isTouchOnlyDevice) {
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
  }, [gameState, isTouchOnlyDevice, handleExitDrill]);

  const spawnParticles = useCallback((x, y, color, count) => {
    const e = engine.current;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 220 + 70;
      e.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3.5 + 1.5,
        color,
        life: 0.45,
        maxLife: 0.45
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
    let label = copy?.rankRookie || t('rapidTapping.rankRookie', 'ROOKIE');
    let color = 'text-slate-400';

    if (finalScore >= 60 || finalCps >= 11) { letter = 'S+'; label = copy?.rankElite || t('rapidTapping.rankElite', 'ELITE TAPPER'); color = 'text-yellow-400'; }
    else if (finalScore >= 40 || finalCps >= 9) { letter = 'S'; label = copy?.rankMaster || t('rapidTapping.rankMaster', 'MASTER TAPPER'); color = 'text-cyan-400'; }
    else if (finalScore >= 25 || finalCps >= 7) { letter = 'A'; label = copy?.rankPro || t('rapidTapping.rankPro', 'PRO TAPPER'); color = 'text-emerald-400'; }
    else if (finalScore >= 15 || finalCps >= 5) { letter = 'B'; label = copy?.rankAdvanced || t('rapidTapping.rankAdvanced', 'ADVANCED'); color = 'text-yellow-400'; }
    else if (finalScore >= 5 || finalCps >= 3) { letter = 'C'; label = copy?.rankIntermediate || t('rapidTapping.rankIntermediate', 'INTERMEDIATE'); color = 'text-orange-400'; }

    const grade = { letter, label, color };
    const advice = getCoachAdvice(finalCps, e.clicks, finalScore, t);

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
  }, [t, copy]);

  const handlePointerDown = useCallback((e) => {
    if (!gameActiveRef.current) return;
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

      const recentClicks = eng.clickTimestamps.filter((t) => performance.now() - t <= 2000);
      const curCps = recentClicks.length / 2.0;
      const isMint = curCps >= 10.0 || eng.score >= 20;
      const accentColor = isMint ? '#34d399' : '#10b981';

      if (eng.clicks % 10 === 0) {
        eng.score += 1;
        drillAudio.playHit();
        spawnParticles(cx, cy, accentColor, 14);
        createHitRing(eng.hitRings, cx, cy, accentColor, 55);
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

      e.timeLeft -= dt;
      e.elapsedTime += dt;

      // Shrink Target Ball
      if (drillTimeout.isEnabled()) e.radius -= e.shrinkRate * dt;
      if (drillTimeout.isEnabled() && e.radius <= 0) {
        e.radius = 45;
        drillAudio.playPenalty();
        e.screenShake = 12;
        triggerFlash('red');
        spawnParticles(e.logicalWidth / 2, e.logicalHeight / 2, '#ef4444', 16);
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

      const dpr = getCanvasDpr(ctx);
      const w = e.logicalWidth;
      const h = e.logicalHeight;

      if (!backdropCacheRef.current) {
        backdropCacheRef.current = createBackdropCache(w, h, (bCtx) => {
          bCtx.fillStyle = '#050508';
          bCtx.fillRect(0, 0, w, h);

          bCtx.strokeStyle = 'rgba(16, 185, 129, 0.04)';
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

      // Render Dynamic Target Ball — Tactical Emerald Palette
      const fillPercent = Math.max(0, e.radius / 140);
      const isMint = calcCps >= 10.0 || e.score >= 20;
      const currentRadius = Math.max(2, e.radius);

      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, currentRadius);
      if (fillPercent < 0.28) {
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.85)');
        grad.addColorStop(1, 'rgba(239, 68, 68, 0.2)');
        ctx.strokeStyle = '#ef4444';
      } else if (isMint) {
        grad.addColorStop(0, 'rgba(52, 211, 153, 0.85)');
        grad.addColorStop(1, 'rgba(52, 211, 153, 0.2)');
        ctx.strokeStyle = '#34d399';
      } else {
        grad.addColorStop(0, 'rgba(16, 185, 129, 0.85)');
        grad.addColorStop(1, 'rgba(16, 185, 129, 0.2)');
        ctx.strokeStyle = '#10b981';
      }

      ctx.fillStyle = grad;
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Center Dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Render Particles with delta-time alpha decay
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 2.2;
        if (p.life <= 0) {
          e.particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }

      // Draw Hit Rings
      drawHitRings(ctx, e.hitRings, dt);

      // Render Hit Markers
      for (let i = e.hitMarkers.length - 1; i >= 0; i--) {
        const hm = e.hitMarkers[i];
        hm.life -= dt;
        if (hm.life <= 0) {
          e.hitMarkers.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        const sz = 7 * (1 - hm.life / 0.25);
        ctx.beginPath();
        ctx.moveTo(hm.x - sz, hm.y - sz); ctx.lineTo(hm.x + sz, hm.y + sz);
        ctx.moveTo(hm.x + sz, hm.y - sz); ctx.lineTo(hm.x - sz, hm.y + sz);
        ctx.stroke();
        ctx.restore();
      }

      // Tactical Pro White Crosshair
      const px = e.crosshair.x;
      const py = e.crosshair.y;

      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 3;

      const gap = 5;
      const radius = 14;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;

      // Top line
      ctx.beginPath();
      ctx.moveTo(px, py - radius); ctx.lineTo(px, py - gap);
      ctx.stroke();

      // Bottom line
      ctx.beginPath();
      ctx.moveTo(px, py + gap); ctx.lineTo(px, py + radius);
      ctx.stroke();

      // Left line
      ctx.beginPath();
      ctx.moveTo(px - radius, py); ctx.lineTo(px - gap, py);
      ctx.stroke();

      // Right line
      ctx.beginPath();
      ctx.moveTo(px + gap, py); ctx.lineTo(px + radius, py);
      ctx.stroke();

      // Center dot
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
    gameActiveRef.current = true;

    const e = engine.current;
    e.score = 0;
    e.clicks = 0;
    e.radius = 50;
    e.shrinkRate = 45;
    e.elapsedTime = 0;
    e.timeLeft = DRILL_DURATION;
    e.clickTimestamps = [];
    e.particles = [];
    e.hitRings = [];
    e.hitMarkers = [];

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

    countdownTimeoutsRef.current.forEach(clearTimeout);

    setGameState('countdown');
    setCountdownValue(3);
    drillAudio.playCountdownTick();

    const t1 = setTimeout(() => {
      setCountdownValue(2);
      drillAudio.playCountdownTick();
    }, 700);

    const t2 = setTimeout(() => {
      setCountdownValue(1);
      drillAudio.playCountdownTick();
    }, 1400);

    const t3 = setTimeout(() => {
      setCountdownValue('GO');
      drillAudio.playGo();
    }, 2100);

    const t4 = setTimeout(() => {
      startingRef.current = false;
      startActualDrill();
    }, 2600);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
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

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [universalSens]);

  const shareScore = useCallback(async () => {
    const player = getPlayerName();
    const gradeLetter = analytics.grade ? analytics.grade.letter : 'A';
    const url = copy?.shareUrl || 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping';
    const drillName = copy?.title || t('rapidTapping.title', 'CPS Test');
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: `${analytics.cps} CPS`,
        rating: { letter: gradeLetter, label: analytics.grade?.label || 'Keep Going', emoji: '⚡' },
        newBest: isNewBest,
        drillName,
        playerName: player,
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      let text = `🎯 I scored ${uiScore} PTS (${analytics.cps} CPS) on the ${drillName}! Practice at skilldrills.online!`;
      if (copy?.shareTextTemplate) {
        text = copy.shareTextTemplate
          .replace('{score}', uiScore)
          .replace('{cps}', analytics.cps)
          .replace('{drillName}', drillName);
      }
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: copy?.shareTitle || `${drillName} Score`, text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert(copy?.copiedAlert || 'Score card copied to clipboard!');
      }
    }
  }, [uiScore, analytics, bestScore, isNewBest, t, copy]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title & Scientific Header */}
        {!isFullscreen && (
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              <span data-seo-kw="1">{copy?.title || t('rapidTapping.title', 'CPS Test')}</span>
            </h1>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              {copy?.desc || t('rapidTapping.desc', "A CPS test counts how many times you can click a mouse button in one second. Sustained one-finger clicking runs to roughly 5–7 clicks per second, because the standard finger tapping test puts a healthy adult's dominant index finger near 50–55 taps per 10 seconds (Halstead, 1947) — the much higher numbers quoted online come from jitter and butterfly techniques, which do not use one finger press per click.")}
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: copy?.score || t('rapidTapping.score', "Score"), val: uiScore },
              { label: copy?.timeLeft || t('rapidTapping.timeLeft', "Time Left"), val: `${uiTimeLeft}s`, highlight: uiTimeLeft <= 10 },
              { label: copy?.cpsRate || t('rapidTapping.cpsRate', "CPS Rate"), val: liveCps, color: "text-emerald-400" },
              { label: copy?.bestScore || t('rapidTapping.bestScore', "Best Score"), val: bestScore, color: "text-amber-400" },
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
          onContextMenu={(e) => { if (gameActiveRef.current) e.preventDefault(); }}
          className={`overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white ${
            isFullscreen
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] flex flex-col items-center justify-center'
              : 'w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] max-md:portrait:aspect-[3/4] max-md:portrait:min-h-[420px] max-md:portrait:max-h-[76vh] max-md:landscape:min-h-[340px] max-md:landscape:max-h-[85vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col'
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
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.score || t('rapidTapping.score', 'Score')}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{uiScore}</p>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.timeLeft || t('rapidTapping.time', 'Time')}</p>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
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
              accent="emerald"
              title={copy?.title || t('rapidTapping.title', 'CPS Test')}
              subtitle={copy?.startSubtitle || t('rapidTapping.startSubtitle', 'CPS Click Speed Trainer • Hardware Raw Input')}
              startButtonText={copy?.startButtonText || t('rapidTapping.startBtn', 'Start Drill')}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle={copy?.getReady || t('rapidTapping.getReady', 'GET READY')} />
          )}

          {/* END SCREEN — Standardized DrillResultCard */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="emerald"
              grade={analytics.grade}
              score={analytics.finalScore}
              isNewBest={isNewBest}
              playAgainText={copy?.playAgain || t('rapidTapping.playAgain', 'Play Again')}
              shareText={copy?.shareTitle || copy?.shareScore || t('rapidTapping.shareScore', 'Share Score')}
              exitText={copy?.exitTitle || copy?.exit || t('rapidTapping.exit', 'Exit')}
              stats={[
                { value: `${analytics.cps} CPS`, label: copy?.avgCps || t('rapidTapping.avgCps', 'Average CPS') },
                { value: `${analytics.totalClicks}`, label: copy?.totalClicks || t('rapidTapping.totalClicks', 'Total Clicks') },
                { value: `+${analytics.maxDifficulty}%`, label: copy?.maxDifficulty || t('rapidTapping.maxDifficulty', 'Max Difficulty') },
                { value: `${bestCps} CPS`, label: copy?.peakCps || t('rapidTapping.peakCps', 'Peak CPS') },
              ]}
              onPlayAgain={enterDrill}
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
              title={copy?.rulesTitle || t('rapidTapping.rulesTitle', 'Drill Instructions & Scoring System')}
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
              title={copy?.aboutTitle || t('rapidTapping.aboutTitle', 'About the CPS Test')}
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" /> {copy?.aboutHeading || t('rapidTapping.aboutHeading', 'Neuromuscular Tapping Frequency & Clicking Endurance')}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {copy?.aboutP1 || t('rapidTapping.aboutP1', 'The CPS Test (rapid tapping test) isolates and evaluates the maximum firing rate of your neuromuscular pathway, measuring how many discrete ballistic inputs your motor cortex can generate per second. In competitive gaming environments like Minecraft PvP, MOBA combat, and semi-automatic pistol rounds in CS2/Valorant, click frequency directly determines damage throughput and engagement outcomes.')}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {copy?.aboutP2 || t('rapidTapping.aboutP2', "While casual tapping relies on voluntary finger flexor contractions averaging 5–7 CPS, advanced techniques like jitter clicking (transmitting micro-vibrations via isometric forearm co-contraction) and butterfly clicking (alternating dual-finger actuation) push mechanical switch actuation up to 12–20+ CPS. Grounded in Ward Halstead's (1947) finger tapping norms and Todor & Kyprie's (1980) motor oscillation research, our continuous shrink-rate engine tests both your burst velocity and muscular endurance over a sustained 45-second session.")}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">{copy?.cardAudienceTitle || t('rapidTapping.cardAudienceTitle', 'Target Audience')}</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{copy?.cardAudienceDesc || t('rapidTapping.cardAudienceDesc', 'Competitive Minecraft PvP players, tactical FPS gamers, and rhythm game enthusiasts training finger tapping frequency and endurance.')}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">{copy?.cardPhysioTitle || t('rapidTapping.cardPhysioTitle', 'Physiological Benefits')}</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{copy?.cardPhysioDesc || t('rapidTapping.cardPhysioDesc', 'Strengthens finger extensor and flexor tendons, elevates motor unit recruitment velocity, and delays neuromuscular fatigue.')}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">{copy?.cardDecayTitle || t('rapidTapping.cardDecayTitle', 'Dynamic Decay Engine')}</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{copy?.cardDecayDesc || t('rapidTapping.cardDecayDesc', 'Target decay accelerates up to +600px/sec as score increases, demanding faster CPS and unrelenting tap frequency.')}</p>
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
