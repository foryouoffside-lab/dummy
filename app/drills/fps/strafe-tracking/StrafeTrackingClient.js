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
import { drillPenalty } from '../../../../lib/drillPenalty';
import { getStartLevel, getDifficultyProgress, ramp } from '../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawPulseRing } from '../../../../lib/canvasFx';
import useUnexpectedExitGuard from '../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_LEVEL = 1400; // 200 -> 1400 (7x)
const ELITE_SCORE = 54000; // 18000 -> 54000 (3x)
const TIME_PER_HIT = 0.4; // +0.1s per 0.25s on-target tick (+0.4s/sec)
const TIME_PENALTY = 0.6; // opt-in on 1.0s continuous off-target
const STORAGE_KEY = 'skilldrills_fps_strafe_tracking_v3';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0, ...JSON.parse(raw) };
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

const getLevelConfig = (level, combo = 0) => {
  const p = getDifficultyProgress(level); // 0 at L1, 1 at L15, unbounded above
  const heat = (getComboMultiplier(combo) - 1) / 2;
  return {
    speed:      ramp(280, 750, p) * (1 + heat * 0.15),
    radius:     Math.max(10, ramp(26, 12, p) * (1 - heat * 0.15)),
    height:     Math.max(24, ramp(52, 28, p) * (1 - heat * 0.15)),
    switchFreq: Math.max(120, ramp(600, 200, p) * (1 - heat * 0.20)),
  };
};

export default function StrafeTrackingClient() {
  const [gameState, setGameState] = useState('start');
  const [countdownValue, setCountdownValue] = useState(3);
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
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
      setPenaltyEnabled(drillPenalty.isEnabled());
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
    const peakLevel = Math.floor(bestLevelRunRef.current);
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

    const startLvl = getStartLevel();
    setLevel(startLvl);
    bestLevelRunRef.current = startLvl;

    const w = engine.current.logicalWidth || canvasRef.current?.width || 800;
    const h = engine.current.logicalHeight || canvasRef.current?.height || 600;

    const cfg = getLevelConfig(startLvl, 0);
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

    setIsFullscreen(true);
    if (canvasRef.current && !document.pointerLockElement) {
      try { await canvasRef.current.requestPointerLock(); } catch (e) {}
    }
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    setIsFullscreen(false);
    if (document.pointerLockElement) document.exitPointerLock();
    setGameState('start');
  }, []);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  const resumeDrill = useCallback(async () => {
    setIsFullscreen(true);
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

      const cfg = getLevelConfig(e.level, e.combo);
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
            const baseScore = 50;
            const levelMult = 1 + getDifficultyProgress(e.level) * 0.5;
            const gained = Math.round(baseScore * getComboMultiplier(e.combo) * levelMult);
            e.score += gained;
            e.timeLeft += 0.1; // +0.1s per 0.25s = +0.4s per full second on target
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

            const rawLevel = (e.score / POINTS_PER_LEVEL) + 1;
            e.level = Math.max(e.level, rawLevel);
            bestLevelRunRef.current = Math.max(bestLevelRunRef.current, e.level);
            setLevel(Math.floor(e.level));
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
            if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
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
              <div className={`text-lg sm:text-xl font-black tabular-nums ${timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-white"}`}>
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
          className={`overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#050508] text-white ${
            isFullscreen 
              ? "fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] rounded-none border-none" 
              : "relative w-full rounded-2xl border border-white/10 bg-[#050508] shadow-[0_0_40px_rgba(0,0,0,0.9)] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh]"
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
                <p className={`text-2xl sm:text-3xl font-bold tabular-nums leading-tight ${timeLeft <= 10 ? "text-red-400" : "text-white"}`}>{timeLeft}s</p>
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
                <p className="text-xs text-gray-300 font-medium">Click to resume — cursor lock will re-engage.</p>
              </div>
            </div>
          )}

          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked) resumeDrill(); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === "playing" ? "cursor-none" : ""}`}
          />

          {gameState === 'start' && (
            <FpsStartCard
              icon={Target}
              accent="green"
              title="Strafe Tracking"
              subtitle="Hardware Raw Input • Endless Level Progression"
              rules={[
                { icon: Target, accent: "green", title: "Objective", text: "Continuous Crosshair Lock (+0.4s/s)" },
                { icon: AlertCircle, accent: "red", title: "Failure Rule", text: penaltyEnabled ? "Off-Target 1s → Resets Combo, -0.6s" : "Off-Target 1s → Resets Combo" },
              ]}
              sensitivity={{ value: universalSens, onChange: setUniversalSens, cmPer360 }}
              stats={[
                { icon: Trophy, label: "Best Score", value: bestScore, color: "text-white", accent: "slate" },
                { icon: Flame, label: "Best Combo", value: `${bestCombo}x`, color: "text-green-400", accent: "green" },
                { icon: TrendingUp, label: "Best Level", value: `Lv. ${bestLevel}`, color: "text-blue-400", accent: "blue" },
              ]}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" />
          )}

          {/* END SCREEN — Universal Result Card */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="green"
              grade={analytics.grade}
              score={score}
              isNewBest={isNewBest}
              stats={[
                { value: analytics.accuracy, suffix: "%", label: "Tracking Accuracy" },
                { value: `${analytics.bestCombo}s`, label: "Max Lock Streak" },
                { value: `Lv. ${analytics.levelReached}`, label: "Peak Level" },
                { value: `${analytics.offTargetTime}s`, label: "Off-Target Time" },
              ]}
              onPlayAgain={enterDrill}
              onShare={shareDrillLink}
              onExit={handleExitDrill}
            />
          )}
        </div>

        {/* ACCORDIONS SECTION */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0 font-sans">
            <DrillAccordion
              id="rules"
              title="Drill Instructions & Settings"
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                <RuleItem num="1" text="Target Tracking" highlight="Pure Reactive (+0.4s/s)" result="Keep crosshair locked on target" />
                <RuleItem num="2" text="Time Adjusting" highlight={`${DRILL_DURATION}s Starting Duration`} result="Uncapped session timer" />
                <RuleItem num="3" text="Off-Target Penalty" highlight="Combo Reset / -0.6s" result="1s off-target resets streak" />
                <RuleItem num="4" text="Level Progression" highlight="+1 Level / 1400 PTS" result="Continuous Speed & Direction Frequency" />
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
                      <h5 className="text-xs font-bold text-white">Hardware Raw Input</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">1:1 unaccelerated pointer lock mouse movement calibrated to simulate true in-game competitive mouse feel.</p>
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
              <div className="space-y-4 font-sans">
                {FAQ_ITEMS.map((item, idx) => (
                  <div key={idx} className="border-b border-gray-800/80 pb-3 last:border-0 last:pb-0">
                    <h5 className="text-xs font-bold text-white mb-1">{item.q}</h5>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </DrillAccordion>
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      {!isFullscreen && <DrillFooter />}
    </div>
  );
}

const FAQ_ITEMS = [
  { q: "What is tracking aim in FPS games?", a: "Tracking aim is the mechanical ability to keep your crosshair continuously locked onto an opponent moving in a 3D environment, which is highly critical in games with a high time-to-kill (TTK)." },
  { q: "How is tracking different from flicking?", a: "Flicking requires rapid muscle memory snaps to hit a target and reset, while tracking requires continuous visual pursuit, direction change recognition, and smooth speed adjustment." },
  { q: "How do I improve reactive tracking?", a: "Improve reactive tracking by practicing against fast, unpredictable strafe speeds. Learn to read momentum changes without over-predicting or tensing your wrist." },
  { q: "Why do I overtrack targets?", a: "Overtracking happens when your crosshair moves faster than the target during a direction swap, which is often caused by predictive aiming or excessive mouse acceleration." },
  { q: "What causes shaky aim during tracking?", a: "Shaky aim is caused by excessive wrist tension, inappropriate mouse grip, or too high sensitivity. Smoothness aim drills help condition your hand to glide without micro-jitters." },
  { q: "How are errors penalised in Strafe Tracking?", a: "Losing contact with the target resets your active combo multiplier. When the optional Time Penalty setting is enabled, falling off-target for 1.0 cumulative second also deducts 0.6s from your timer." },
  { q: "Is tracking more important than flicking?", a: "It depends on the game. Tracking is primary in high-TTK games (Apex Legends, Overwatch 2, The Finals), whereas flicking is more critical in tactical, low-TTK shooters (Valorant, CS2)." },
  { q: "Can tracking improve Apex Legends aim?", a: "Yes. Gunfights in Apex Legends require landing full automatic magazines on dodging enemies. Consistent tracking practice is the single best way to improve Apex aim." },
  { q: "What sensitivity is best for tracking?", a: "Medium-to-low sensitivity (30cm to 45cm per 360°) offers the best balance between smoothness and speed for reactive tracking." },
  { q: "Is this strafe tracking drill free?", a: "Yes, 100% free with unaccelerated raw input in your browser without downloads or signups." }
];

// === Subcomponents ===
function RuleItem({ num, text, highlight = '', result }) {
  return (
    <div className="flex items-center gap-4 bg-black p-4 rounded-xl border border-white/10 shadow-sm font-sans">
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