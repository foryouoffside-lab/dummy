'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight, Crosshair,
  Eye, GraduationCap, RefreshCw, Target,
  Timer, TrendingUp, Trophy, Volume2, VolumeX,
  Flame, Share2, LogOut,
  Award, Shield, Users, Zap, ZapOff
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { drillFlash } from '../../../../lib/drillFlash';
import { getStartLevel, getDifficultyProgress, getComboBonusLevel } from '../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawPulseRing } from '../../../../lib/canvasFx';
import useUnexpectedExitGuard from '../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../components/drill/FpsStartCard';

const DRILL_DURATION = 45;
const POINTS_PER_LEVEL = 60; // Reach L15 in the first third of the run under strong play, not at ~78%
const ELITE_SCORE = 4200; // Calibrated against simulated perfect-play ceiling (~4488) for this tick-based tracking formula
const STORAGE_KEY = 'skilldrills_fps_strafe_tracking_v2';
const OLD_STORAGE_KEY = 'strafeTrack_bestScore2';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0, ...JSON.parse(raw) };
    const legacy = localStorage.getItem(OLD_STORAGE_KEY);
    if (legacy) return { bestScore: parseInt(legacy, 10) || 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
    return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
  } catch (e) {
    return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};


const getLevelConfig = (level) => {
  const p = getDifficultyProgress(level);
  return {
    speed: 280 + p * 470,
    radius: Math.max(12, 26 - p * 14),
    height: Math.max(28, 52 - p * 24),
    switchFreq: Math.max(150, 600 - p * 400)
  };
};

export default function StrafeTrackingClient() {
  const [gameState, setGameState] = useState('start');
  const [countdownValue, setCountdownValue] = useState(3);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  
  const [universalSens, setUniversalSens] = useState(1.0);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [level, setLevel] = useState(1);
  const [bestLevel, setBestLevel] = useState(1);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  const [flashes, setFlashes] = useState([]);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, onTargetFrames: 0, totalFrames: 0, offTargetTime: 0,
    bestCombo: 0, levelReached: 1, grade: null
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(DRILL_DURATION);
  const lastAccuracyRef = useRef(100);
  const bestLevelRunRef = useRef(1);
  const backdropCacheRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);

  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    target: { x: 400, y: 300, vx: 300, vy: 0, radius: 22, height: 45, groundY: 300 },
    level: 1, score: 0, timeLeft: DRILL_DURATION,
    combo: 0, bestCombo: 0,
    onTargetTimer: 0, continuousTrackTime: 0, msOffTarget: 0, offTargetTotalTime: 0,
    totalFrames: 0, framesOnTarget: 0,
    particles: [], hitMarkers: [], screenShake: 0, nextDecisionTime: 0,
    logicalWidth: 0, logicalHeight: 0
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('strafeTrack_sens2');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
    } catch (e) {}

    const saved = getSavedData();
    setBestScore(saved.bestScore || 0);
    setBestCombo(saved.bestCombo || 0);
    setBestLevel(saved.bestLevel || 1);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);
    }
  }, []);

  useEffect(() => {
    return () => countdownTimeoutsRef.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (gameState !== 'playing' && gameState !== 'countdown') {
      try { localStorage.setItem('strafeTrack_sens2', universalSens.toString()); } catch (e) {}
    }
  }, [universalSens, gameState]);

  const triggerFlash = useCallback(() => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  const createExplosion = useCallback((x, y, color) => {
    const e = engine.current;
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.5;
      e.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  }, []);

  const createHitMarker = useCallback((x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  }, []);

  const endGame = useCallback(() => {
    setGameState('gameOver');
    drillAudio.playSessionEnd();
    if (document.pointerLockElement) document.exitPointerLock();

    const e = engine.current;
    const finalAccuracy = e.totalFrames > 0 ? Math.round((e.framesOnTarget / e.totalFrames) * 100) : 100;
    const peakLevel = bestLevelRunRef.current;
    const grade = getFpsScoreGrade(e.score, ELITE_SCORE);

    setAccuracy(finalAccuracy);
    setAnalytics({
      accuracy: finalAccuracy,
      onTargetFrames: e.framesOnTarget,
      totalFrames: e.totalFrames,
      offTargetTime: Math.round(e.offTargetTotalTime),
      bestCombo: e.bestCombo,
      levelReached: peakLevel,
      grade
    });

    const saved = getSavedData();
    const newBestScore = Math.max(saved.bestScore, e.score);
    const newBestCombo = Math.max(saved.bestCombo, e.bestCombo);
    const newBestLevel = Math.max(saved.bestLevel, peakLevel);
    const isNew = e.score > saved.bestScore;

    saveData({
      bestScore: newBestScore,
      bestCombo: newBestCombo,
      bestLevel: newBestLevel,
      totalSessions: (saved.totalSessions || 0) + 1
    });

    if (isNew) setIsNewBest(true);
    setBestScore(newBestScore);
    setBestCombo(newBestCombo);
    setBestLevel(newBestLevel);
  }, []);

  const enterDrill = useCallback(async () => {
    drillAudio.init();
    drillAudio.playCountdownTick();

    setIsNewBest(false);
    setScore(0);
    setCombo(0);
    setAccuracy(100);
    setTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    lastAccuracyRef.current = 100;

    const saved = getSavedData();
    const startLvl = getStartLevel(saved.bestLevel);
    setLevel(startLvl);
    bestLevelRunRef.current = startLvl;

    const w = engine.current.logicalWidth || canvasRef.current?.width || 800;
    const h = engine.current.logicalHeight || canvasRef.current?.height || 600;

    const cfg = getLevelConfig(startLvl);
    engine.current = {
      crosshair: { x: w / 2, y: h / 2, initialized: true },
      target: { x: w / 2, y: h / 2, vx: cfg.speed, vy: 0, radius: cfg.radius, height: cfg.height, groundY: h / 2 },
      level: startLvl,
      score: 0,
      timeLeft: DRILL_DURATION,
      combo: 0,
      bestCombo: 0,
      onTargetTimer: 0,
      continuousTrackTime: 0,
      msOffTarget: 0,
      offTargetTotalTime: 0,
      totalFrames: 0,
      framesOnTarget: 0,
      particles: [],
      hitMarkers: [],
      screenShake: 0,
      nextDecisionTime: 0,
      logicalWidth: w,
      logicalHeight: h
    };

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];

    setGameState('countdown');
    setCountdownValue(3);

    const t1 = setTimeout(() => { setCountdownValue(2); drillAudio.playCountdownTick(); }, 700);
    const t2 = setTimeout(() => { setCountdownValue(1); drillAudio.playCountdownTick(); }, 1400);
    const t3 = setTimeout(() => { setCountdownValue('GO'); drillAudio.playGo(); }, 2100);
    const t4 = setTimeout(() => {
      setGameState('playing');
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];

    if (containerRef.current && !document.fullscreenElement) {
      try { await containerRef.current.requestFullscreen(); } catch (e) {}
    }
    if (canvasRef.current && !document.pointerLockElement) {
      try { await canvasRef.current.requestPointerLock(); } catch (e) {}
    }
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
    if (document.pointerLockElement) document.exitPointerLock();
    setGameState('start');
  }, []);

  // Stop the drill if the player leaves any way other than the in-app Exit
  // button (back gesture, tab switch, Esc) instead of running invisibly.
  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  const resumeDrill = useCallback(async () => {
    if (containerRef.current && !document.fullscreenElement) {
      try { await containerRef.current.requestFullscreen(); } catch (e) {}
    }
    if (canvasRef.current && !document.pointerLockElement) {
      try { await canvasRef.current.requestPointerLock(); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const handlePointerLockChange = () => setPointerLocked(document.pointerLockElement === canvasRef.current);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if ((gameState !== 'playing' && gameState !== 'countdown') || !pointerLocked || !canvasRef.current) return;
      const ch = engine.current.crosshair;
      const sens = universalSens;
      const width = engine.current.logicalWidth || canvasRef.current.width;
      const height = engine.current.logicalHeight || canvasRef.current.height;
      ch.x = Math.max(0, Math.min(width, ch.x + e.movementX * sens));
      ch.y = Math.max(0, Math.min(height, ch.y + e.movementY * sens));
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (!containerRef.current || !containerRef.current.contains(e.target)) return;
      if (gameState !== 'playing') return;
      if (!pointerLocked) {
        resumeDrill();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [gameState, pointerLocked, universalSens, resumeDrill]);

  useEffect(() => {
    const fsListener = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsListener);
    return () => document.removeEventListener('fullscreenchange', fsListener);
  }, []);

  useEffect(() => {
    const cvs = canvasRef.current;
    const container = containerRef.current;
    if (!cvs || !container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          const dpr = getCanvasDpr();
          cvs.width = Math.ceil(width * dpr);
          cvs.height = Math.ceil(height * dpr);
          engine.current.logicalWidth = width;
          engine.current.logicalHeight = height;

          backdropCacheRef.current = createBackdropCache(width, height, (bCtx, w, h) => {
            bCtx.fillStyle = '#050508';
            bCtx.fillRect(0, 0, w, h);
            bCtx.strokeStyle = 'rgba(34, 197, 94, 0.04)';
            bCtx.lineWidth = 1;
            const cx = w / 2, cy = h / 2;
            bCtx.beginPath();
            for(let i = -10; i <= 10; i++) {
              bCtx.moveTo(cx, cy); bCtx.lineTo(cx + i * 250, h);
              bCtx.moveTo(cx, cy); bCtx.lineTo(cx + i * 250, 0);
            }
            bCtx.stroke();
          });

          if (!engine.current.crosshair.initialized) {
            engine.current.crosshair.x = width / 2;
            engine.current.crosshair.y = height / 2;
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
      const dtMs = time - lastTime;
      lastTime = time;
      const dt = Math.min(dtMs / 1000, 0.1);
      const e = engine.current;
      const ctx = cvs.getContext('2d', { alpha: false });
      const dpr = getCanvasDpr();
      const width = e.logicalWidth || cvs.width / dpr;
      const height = e.logicalHeight || cvs.height / dpr;

      const cfg = getLevelConfig(e.level);
      const t = e.target;
      t.radius = cfg.radius;
      t.height = cfg.height;

      if (gameState === 'playing' && pointerLocked) {
        if (e.timeLeft > 0) e.timeLeft -= dt;
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setTimeLeft(0);
          endGame();
          return;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
          setTimeLeft(intTime);
          lastTimeRef.current = intTime;
        }

        if (time >= e.nextDecisionTime) {
          t.vx = (Math.random() > 0.5 ? 1 : -1) * cfg.speed;
          e.nextDecisionTime = time + cfg.switchFreq + Math.random() * 200;
        }

        t.x += t.vx * dt;

        if (t.x - t.radius < 30) {
          t.x = 30 + t.radius;
          t.vx = Math.abs(t.vx);
        } else if (t.x + t.radius > width - 30) {
          t.x = width - 30 - t.radius;
          t.vx = -Math.abs(t.vx);
        }

        const ch = e.crosshair;
        const segAY = t.y - t.height;
        const segBY = t.y + t.height;
        const lineLen = segBY - segAY;
        let tParam = (ch.y - segAY) / (lineLen || 1);
        tParam = Math.max(0, Math.min(1, tParam));
        const closestY = segAY + tParam * lineLen;
        const dist = Math.hypot(ch.x - t.x, ch.y - closestY);
        const isOnTarget = dist <= t.radius;

        e.totalFrames++;

        if (isOnTarget) {
          e.framesOnTarget++;
          e.onTargetTimer += dt;
          if (e.onTargetTimer >= 0.25) {
            const baseScore = 10;
            const levelMult = 1 + getDifficultyProgress(e.level) * 0.5;
            const gained = Math.round(baseScore * getComboMultiplier(e.combo) * levelMult);
            e.score += gained;
            e.onTargetTimer -= 0.25;
            setScore(e.score);
            drillAudio.playHit();
            createHitMarker(ch.x, ch.y);
          }

          e.continuousTrackTime += dt;
          if (e.continuousTrackTime >= 1.0) {
            e.continuousTrackTime -= 1.0;
            e.combo++;
            if (e.combo > e.bestCombo) e.bestCombo = e.combo;
            setCombo(e.combo);

            const rawLevel = Math.floor(e.score / POINTS_PER_LEVEL) + 1 + getComboBonusLevel(e.combo);
            e.level = Math.max(e.level, rawLevel);
            bestLevelRunRef.current = Math.max(bestLevelRunRef.current, e.level);
            setLevel(e.level);
          }
          e.msOffTarget = 0;
        } else {
          if (e.combo !== 0) setCombo(0);
          e.combo = 0;
          e.continuousTrackTime = 0;

          e.msOffTarget += dt;
          e.offTargetTotalTime += dt;
          if (e.msOffTarget >= 1.0) {
            e.msOffTarget -= 1.0;
            e.screenShake = 6;
            drillAudio.playPenalty();
            triggerFlash();
          }
        }

        if (e.totalFrames > 0) {
          const liveAcc = Math.round((e.framesOnTarget / e.totalFrames) * 100);
          if (liveAcc !== lastAccuracyRef.current) {
            setAccuracy(liveAcc);
            lastAccuracyRef.current = liveAcc;
          }
        }
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      if (e.screenShake > 0) {
        const sx = (Math.random() - 0.5) * e.screenShake;
        const sy = (Math.random() - 0.5) * e.screenShake;
        ctx.translate(sx, sy);
        e.screenShake *= 0.85;
        if (e.screenShake < 0.5) e.screenShake = 0;
      }

      if (backdropCacheRef.current) {
        ctx.drawImage(backdropCacheRef.current, 0, 0, width, height);
      } else {
        ctx.fillStyle = '#050508';
        ctx.fillRect(0, 0, width, height);
      }

      if (gameState === 'playing' || gameState === 'start') {
        const ch = e.crosshair;
        const segAY = t.y - t.height;
        const segBY = t.y + t.height;
        const lineLen = segBY - segAY;
        let tParam = (ch.y - segAY) / (lineLen || 1);
        tParam = Math.max(0, Math.min(1, tParam));
        const closestY = segAY + tParam * lineLen;
        const dist = Math.hypot(ch.x - t.x, ch.y - closestY);
        const isOnTarget = dist <= t.radius && gameState === 'playing' && pointerLocked;

        const targetColor = isOnTarget ? '#00ff88' : '#22c55e';

        drawPulseRing(ctx, t.x, t.y, t.radius + 6, targetColor, 0.4);

        ctx.save();
        ctx.shadowBlur = isOnTarget ? 20 : 10;
        ctx.shadowColor = targetColor;
        ctx.fillStyle = isOnTarget ? 'rgba(0, 255, 136, 0.2)' : 'rgba(34, 197, 94, 0.15)';
        ctx.strokeStyle = targetColor;
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.arc(t.x, t.y - t.height, t.radius, Math.PI, 0, false);
        ctx.lineTo(t.x + t.radius, t.y + t.height);
        ctx.arc(t.x, t.y + t.height, t.radius, 0, Math.PI, false);
        ctx.lineTo(t.x - t.radius, t.y - t.height);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2.2;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
      }

      ctx.lineWidth = 2;
      for (let i = e.hitMarkers.length - 1; i >= 0; i--) {
        const hm = e.hitMarkers[i];
        hm.life -= dt * 4.0;
        if (hm.life <= 0) { e.hitMarkers.splice(i, 1); continue; }
        ctx.globalAlpha = hm.life; ctx.strokeStyle = '#ffffff';
        const s = 6 + (1 - hm.life) * 8;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start' || gameState === 'countdown')) {
        const activeColor = pointerLocked ? '#22c55e' : '#eab308';
        ctx.fillStyle = activeColor;
        ctx.strokeStyle = activeColor;

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ch.x, ch.y, 16, 0, Math.PI * 2);
        ctx.stroke();

        const gap = 6;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - 16); ctx.lineTo(ch.x, ch.y - gap);
        ctx.moveTo(ch.x, ch.y + 16); ctx.lineTo(ch.x, ch.y + gap);
        ctx.moveTo(ch.x - 16, ch.y); ctx.lineTo(ch.x - gap, ch.y);
        ctx.moveTo(ch.x + 16, ch.y); ctx.lineTo(ch.x + gap, ch.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2);
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
  }, [gameState, pointerLocked, triggerFlash, endGame]);

  const shareDrillLink = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/fps/strafe-tracking';
    try {
      const canvas = generateShareCard({
        score,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.bestCombo,
        rating: { letter: analytics.grade?.grade || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Strafe Tracking',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${score} PTS on Strafe Tracking Trainer! Accuracy: ${analytics.accuracy}%. Master your reactive tracking at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Reflex Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [score, bestScore, analytics, isNewBest]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              STRAFE TRACKING
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
                Strafe Tracking Aim Trainer
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Erratic Horizontal Target Motion & Continuous Tracking
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Status</div>
              <div className="text-lg sm:text-xl font-black text-green-400 tabular-nums">
                {gameState === 'playing' ? 'TRACKING' : gameState === 'gameOver' ? 'COMPLETE' : 'STANDBY'}
              </div>
            </div>

            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time Left</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {timeLeft}s
              </div>
            </div>

            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Accuracy</div>
              <div className="text-lg sm:text-xl font-black text-green-400 tabular-nums">
                {accuracy}%
              </div>
            </div>

            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Score</div>
              <div className="text-lg sm:text-xl font-black text-yellow-400 tabular-nums">
                {bestScore}
              </div>
            </div>
          </div>
        )}

        {/* ── CANVAS / DRILL STAGE CONTAINER ── */}
        <div 
          ref={containerRef} 
          onContextMenu={(e) => { if (gameState === 'playing' || gameState === 'countdown') e.preventDefault(); }}
          className={`relative overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#050508] text-white ${
            isFullscreen 
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] rounded-none border-none' 
              : 'w-full rounded-2xl border border-white/10 bg-[#050508] shadow-[0_0_40px_rgba(0,0,0,0.9)] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh]'
          }`}
          style={{ touchAction: (gameState === 'playing' || gameState === 'countdown') ? 'none' : 'auto' }}
        >
          {flashes.map((f) => (
            <div key={f.id} className="fx-flash fx-flash-red" />
          ))}

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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-green-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {gameState === 'playing' && !pointerLocked && (
            <div 
              className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center cursor-pointer"
              onClick={(e) => { 
                e.stopPropagation(); 
                resumeDrill();
              }}
            >
              <div className="text-center animate-pulse pointer-events-none">
                <AlertCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-1">Game Paused</h2>
                <p className="text-xs text-gray-300 font-medium">Click to resume — fullscreen and cursor lock will re-engage.</p>
              </div>
            </div>
          )}

          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked) resumeDrill(); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`} 
          />

          {gameState === 'start' && (
            <FpsStartCard
              icon={Target}
              accent="green"
              title="Strafe Tracking"
              subtitle="Hardware Raw Input • 15 Difficulty Levels"
              rules={[
                { icon: Target, accent: 'green', title: 'Objective', text: 'Continuous Crosshair Lock' },
                { icon: AlertCircle, accent: 'red', title: 'Failure Rule', text: 'Off-Target 1s → Resets Combo' },
              ]}
              sensitivity={{ value: universalSens, onChange: setUniversalSens, cmPer360 }}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: Flame, label: 'Best Combo', value: `${bestCombo}x`, color: 'text-green-400', accent: 'green' },
                { icon: TrendingUp, label: 'Best Level', value: `Lv. ${bestLevel}`, color: 'text-blue-400', accent: 'blue' },
              ]}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" />
          )}

          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(34,197,94,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade.color}`}>
                  {analytics.grade.grade}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1">
                  {analytics.grade.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 tabular-nums">
                  {score.toLocaleString()}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500">Points</div>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.accuracy}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Accuracy</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">Lvl {analytics.levelReached}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Level</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.bestCombo}x</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Best Streak</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Play Again
                  </button>
                  <button 
                    onClick={shareDrillLink} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title="Share Score"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleExitDrill} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title="Return to Options"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* ACCORDIONS SECTION */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
            <DrillAccordion
              id="rules"
              title="Drill Instructions & Settings"
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                <RuleItem num="1" text="Target Tracking" highlight="Pure Reactive" result="Keep crosshair locked on target" />
                <RuleItem num="2" text="Time Adjusting" highlight={`${DRILL_DURATION}s Duration`} result="Standard session timer" />
                <RuleItem num="3" text="Off-Target Penalty" highlight="Combo Reset" result="1s off-target resets streak" />
                <RuleItem num="4" text="Raw Input" highlight="1:1 Pointer Lock" result="Direct hardware mouse calibration" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Strafe Tracking"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-6 font-sans">
                <section>
                  <h4 className="text-base font-bold text-white mb-2">
                    What Is Strafe Tracking Training?
                  </h4>
                  <p className="text-sm leading-relaxed mb-3 text-gray-300">
                    <strong>Strafe Tracking Training</strong> builds the continuous motor compensation required to keep your crosshair locked onto targets moving erratically horizontally across your screen.
                  </p>
                </section>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Ranked players and esports competitors looking to track fast ADAD strafing and erratic movement patterns.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-fuchsia-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Skills Trained</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Reactive tracking, aim smoothness, counter-strafe reading, directional transition speed, and wrist glide control.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Why It Is Harder</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Predicting target direction leads to overtracking. This drill trains raw visual reaction over guess-aiming.</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                <FAQItem q="What is tracking aim in FPS games?" a="Tracking aim is the mechanical ability to keep your crosshair continuously locked onto an opponent moving in a 3D environment, which is highly critical in games with a high time-to-kill (TTK)." />
                <FAQItem q="How is tracking different from flicking?" a="Flicking requires rapid muscle memory snaps to hit a target and reset, while tracking requires continuous visual pursuit, direction change recognition, and smooth speed adjustment." />
                <FAQItem q="How do I improve reactive tracking?" a="Improve reactive tracking by practicing against fast, unpredictable strafe speeds. Learn to read momentum changes without over-predicting or tensing your wrist." />
                <FAQItem q="Why do I overtrack targets?" a="Overtracking happens when your crosshair moves faster than the target during a direction swap, which is often caused by predictive aiming or excessive mouse acceleration." />
                <FAQItem q="What causes shaky aim during tracking?" a="Shaky aim is caused by excessive wrist tension, inappropriate mouse grip, or too high sensitivity. Smoothness aim drills help condition your hand to glide without micro-jitters." />
                <FAQItem q="How much should I practice tracking?" a="We recommend practicing tracking for 10-15 minutes daily as a pre-game warmup routine to establish muscle memory consistency." />
                <FAQItem q="Is tracking more important than flicking?" a="It depends on the game. Tracking is primary in high-TTK games (Apex Legends, Overwatch 2, The Finals), whereas flicking is more critical in tactical, low-TTK shooters (Valorant, CS2)." />
                <FAQItem q="Can tracking improve Apex Legends aim?" a="Yes. Gunfights in Apex Legends require landing full automatic magazines on dodging enemies. Consistent tracking practice is the single best way to improve Apex aim." />
                <FAQItem q="Can tracking improve Overwatch 2 aim?" a="Target tracking is critical for heroes like Soldier: 76, Tracer, Zarya, and Sombra who rely on smooth pursuit and direction change recognition to maximize damage output." />
                <FAQItem q="What is counter-strafe reading?" a="Counter-strafe reading is your neurological speed in registering when an enemy reverses their horizontal direction, allowing you to re-align your crosshair with minimal lag." />
                <FAQItem q="What is aim smoothness?" a="Smoothness refers to moving your mouse at a constant, matching speed to the target without micro-corrections, jitters, or abrupt jerking movements." />
                <FAQItem q="How do professional players train tracking?" a="Pros use specialized software aim trainers to practice isolating horizontal sweeps, vertical tracking, and reaction speed under variable speeds." />
                <FAQItem q="What sensitivity is best for tracking?" a="A moderate-to-low sensitivity (e.g., 25cm to 45cm per 360 rotation) is generally best for tracking, as it provides enough physical space to make smooth micro-adjustments." />
                <FAQItem q="Can this drill improve mouse control?" a="Yes. Keeping your crosshair on dodging targets forces your wrist and fingers to build subtle motor-control adjustments, optimizing mouse handling." />
                <FAQItem q="How long does it take to improve tracking?" a="Most players notice improvements in crosshair smoothness and reaction time after 2 weeks of daily, focused 10-minute training sessions." />
              </div>
            </DrillAccordion>
          </div>
        )}

        {/* RELATED DRILLS GRID */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              Related FPS & Visual Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Link
                href="/drills/visual-tracking/constant-slow-pursuit"
                className="group bg-[#0c0c16] border border-white/5 hover:border-green-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1">Visual Tracking</div>
                  <div className="text-xs font-bold text-white group-hover:text-green-300 transition-colors">Constant Slow Pursuit</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">Smooth pursuit tracking along Lissajous curves.</div>
                </div>
              </Link>

              <Link
                href="/drills/visual-tracking/sine-wave-pursuit"
                className="group bg-[#0c0c16] border border-white/5 hover:border-green-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1">Visual Tracking</div>
                  <div className="text-xs font-bold text-white group-hover:text-green-300 transition-colors">Sine-Wave Pursuit</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">Smooth pursuit along vertical and horizontal sine oscillations.</div>
                </div>
              </Link>

              <Link
                href="/drills/visual-tracking/infinity-pursuit"
                className="group bg-[#0c0c16] border border-white/5 hover:border-green-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1">Visual Tracking</div>
                  <div className="text-xs font-bold text-white group-hover:text-green-300 transition-colors">Infinity Pursuit</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">Track targets along figure-8 infinity loops at custom speeds.</div>
                </div>
              </Link>

              <Link
                href="/drills/visual-tracking/directional-chaos-pursuit"
                className="group bg-[#0c0c16] border border-white/5 hover:border-green-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1">Visual Tracking</div>
                  <div className="text-xs font-bold text-white group-hover:text-green-300 transition-colors">Directional Chaos Pursuit</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">Complex multi-directional visual tracking with sudden direction shifts.</div>
                </div>
              </Link>

              <Link
                href="/drills/fps/180-degree-awareness"
                className="group bg-[#0c0c16] border border-white/5 hover:border-green-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1">FPS Awareness</div>
                  <div className="text-xs font-bold text-white group-hover:text-green-300 transition-colors">180° Awareness Pro</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">Master 180-degree snap turn awareness for CS2 & Valorant.</div>
                </div>
              </Link>

              <Link
                href="/drills/fps/flow-state"
                className="group bg-[#0c0c16] border border-white/5 hover:border-green-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1">FPS Tracking</div>
                  <div className="text-xs font-bold text-white group-hover:text-green-300 transition-colors">Flow State Induction</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">Sustained visual focus & smooth crosshair tracking.</div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {!isFullscreen && <DrillFooter />}
      </main>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', accentColor = 'border-white/10' }) {
  return (
    <div className={`rounded-xl border ${accentColor} bg-black backdrop-blur-md p-1.5 sm:p-2.5 text-center flex flex-col items-center justify-center transition-all duration-300 shadow-md hover:-translate-y-0.5 pointer-events-none font-sans`}>
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-black border border-white/10 flex items-center justify-center mb-1 shadow-inner">
        {icon}
      </div>
      <p className="text-xs sm:text-lg lg:text-xl font-black tracking-tight text-white leading-none truncate w-full font-sans font-mono tabular-nums">
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

function RelatedCard({ href, title, desc }) {
  return (
    <Link href={href} className="group p-5 bg-black rounded-2xl border border-gray-800 hover:border-green-500/50 hover:bg-white/[0.02] transition-all flex flex-col justify-between">
      <div>
        <h4 className="font-bold text-white group-hover:text-green-400 transition-colors mb-1 text-base">{title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{desc}</p>
      </div>
      <div className="flex items-center gap-1 mt-4 text-xs text-green-400 font-bold font-mono">
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
      <p className="text-xs text-gray-200 leading-relaxed">{a}</p>
    </div>
  );
}