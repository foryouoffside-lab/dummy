'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Volume2, VolumeX,
  Play, RefreshCw, Target, Clock,
  Share2, LogOut, Eye, Users, TrendingUp, Zap, ZapOff, Trophy,
  XSquare, Activity
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { drillFlash } from '../../../../lib/drillFlash';
import { drillTimeout } from '../../../../lib/drillTimeout';
import { getFpsScoreGrade } from '../../../../lib/scoringEngine';
import { getDifficultyProgress, getStartLevel } from '../../../../lib/drillDifficulty';
import useDrillFlash from '../../../../lib/useDrillFlash';
import useUnexpectedExitGuard from '../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import DrillFlashOverlay from '../../../../components/drill/DrillFlashOverlay';
import FpsStartCard from '../../../../components/drill/FpsStartCard';

const FpsStartCardAny = FpsStartCard as React.ComponentType<any>;

const ELITE_SCORE = 5000;
const STORAGE_KEY = 'skilldrills_reaction_time_test_v2';

const RELATED_DRILLS = [
  { id: "barrier-sequence-pursuit", name: "Jiggle Peek Trainer", cat: "Reaction Speed", desc: "Train angle holding and cover peeking reaction reflexes.", href: "/drills/reaction-speed/barrier-sequence-pursuit" },
  { id: "fps-tracking-trainer", name: "FPS Tracking Trainer", cat: "Reaction Speed", desc: "Condition tracking accuracy against dynamic moving targets.", href: "/drills/reaction-speed/fps-tracking-trainer" },
  { id: "market-doors-pursuit", name: "Corner Checking Trainer", cat: "Reaction Speed", desc: "Saccadic eye sweep & doorway clearing trainer.", href: "/drills/reaction-speed/market-doors-pursuit" },
  { id: "reaction-simulator", name: "Reaction Simulator", cat: "Reaction Speed", desc: "Simulate rapid combat reaction scenarios.", href: "/drills/reaction-speed/reaction-simulator" },
  { id: "reflex-training-drill", name: "Reflex Training Drill", cat: "Reaction Speed", desc: "High-speed reflex triggers & visual target hitting.", href: "/drills/reaction-speed/reflex-training-drill" },
  { id: "saccadic-gallery", name: "Saccadic Gallery", cat: "Reaction Speed", desc: "Rapid saccadic eye movement & target acquisition gallery.", href: "/drills/reaction-speed/saccadic-gallery" }
];

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, bestLevel: 1, totalSessions: 0 };
    return { bestScore: 0, bestLevel: 1, totalSessions: 0, ...JSON.parse(raw) };
  } catch (e) {
    return { bestScore: 0, bestLevel: 1, totalSessions: 0 };
  }
};

const saveData = (data: { bestScore: number; bestLevel: number; totalSessions: number }) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

type Particle = { x: number; y: number; vx: number; vy: number; color: string; life: number };

export default function ReactionTimeTestClient() {
  const [gameState, setGameState] = useState<'start' | 'countdown' | 'playing' | 'gameOver'>('start');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [countdownValue, setCountdownValue] = useState<number | string>(3);

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState<number>(0);
  const [uiRounds, setUiRounds] = useState<number>(0);
  const [uiLevel, setUiLevel] = useState<number>(1);
  const [liveAvgError, setLiveAvgError] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [bestLevel, setBestLevel] = useState<number>(1);
  const [totalSessions, setTotalSessions] = useState<number>(0);
  const [isNewBest, setIsNewBest] = useState<boolean>(false);

  // End Session Analytics
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    successfulHits: 0,
    misses: 0,
    exactHits: 0,
    perfectHits: 0,
    avgReactionTime: 0, // avg error in ms
    finalLevel: 1,
    grade: null as any
  });

  // DOM & Engine Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const countdownTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const engine = useRef({
    state: 'TARGET', // 'TARGET' | 'TIMER' | 'RESULT'
    targetTime: 1000,
    startTime: 0,
    displayTimer: 1.5,
    resultTimer: 1.0,
    lastError: 0,
    clickedTime: 0,
    lastRating: '',
    lastColor: '',
    score: 0,
    level: 1,
    combo: 0,
    maxCombo: 0,
    comboMultiplier: 1.0,
    totalAttempts: 0,
    hits: 0,
    misses: 0,
    exactHits: 0,
    perfectHits: 0,
    totalErrorAbs: 0,
    reactionTimes: [] as number[],
    mousePos: { x: 0, y: 0 },
    particles: [] as Particle[],
    screenShake: 0,
    flashRed: 0,
    totalFrames: 0
  });

  const { flashes, triggerFlash } = useDrillFlash();

  // Mobile Detection & Device Orientation Tracking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      const checkDeviceAndOrientation = () => {
        const ua = navigator.userAgent || '';
        const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        const mobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || (window.innerWidth < 768) || hasTouch;
        setIsMobile(mobileDevice);

        const portrait = window.innerHeight > window.innerWidth;
        setIsPortrait(portrait);
      };

      checkDeviceAndOrientation();
      window.addEventListener('resize', checkDeviceAndOrientation);
      window.addEventListener('orientationchange', checkDeviceAndOrientation);

      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestLevel(saved.bestLevel || 1);
      setTotalSessions(saved.totalSessions || 0);

      return () => {
        window.removeEventListener('resize', checkDeviceAndOrientation);
        window.removeEventListener('orientationchange', checkDeviceAndOrientation);
      };
    }
  }, []);

  // Fullscreen Listener
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Cleanup Timeouts on Unmount
  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // Exit Drill cleanly
  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    setGameState('start');
  }, []);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  // Complete Drill Session cleanly when user clicks "End Drill"
  const endGame = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    setGameState('gameOver');

    const e = engine.current;
    const totalActions = e.totalAttempts;
    const acc = totalActions > 0 ? Math.round((e.hits / totalActions) * 100) : 100;
    const avgErr = e.hits > 0 ? Math.round(e.totalErrorAbs / e.hits) : 0;

    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const gradeObj = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: acc,
      successfulHits: e.hits,
      misses: e.misses,
      exactHits: e.exactHits,
      perfectHits: e.perfectHits,
      avgReactionTime: avgErr,
      finalLevel: e.level,
      grade: gradeObj
    });

    const isNew = e.score > bestScore;
    if (isNew) {
      setIsNewBest(true);
      setBestScore(e.score);
    } else {
      setIsNewBest(false);
    }

    const newBestLevel = Math.max(bestLevel, e.level);
    setBestLevel(newBestLevel);

    setTotalSessions((prev) => {
      const next = prev + 1;
      saveData({
        bestScore: Math.max(bestScore, e.score),
        bestLevel: newBestLevel,
        totalSessions: next
      });
      return next;
    });

    drillAudio.playSessionEnd();
  }, [bestScore, bestLevel]);

  // Generate New Timing Trial
  const generateNewRound = useCallback(() => {
    const e = engine.current;
    const minTarget = 1000;
    const maxTarget = Math.min(8000, 1800 + (e.level * 450));
    e.targetTime = minTarget + Math.floor(Math.random() * (maxTarget - minTarget));

    e.displayTimer = Math.max(0.5, 1.6 - (e.level * 0.05));
    e.resultTimer = Math.max(0.5, 1.2 - (e.level * 0.05));
    e.state = 'TARGET';
    drillAudio.playTick();
  }, []);

  // Enter Drill (Full Screen -> 321GO Countdown with Sound -> Playing)
  const enterDrill = useCallback(async () => {
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen().catch(() => {});
      }
    } catch (e) {}

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];

    drillAudio.init();

    const saved = getSavedData();
    const startLevel = getStartLevel(saved.bestLevel);

    setUiScore(0);
    setUiRounds(0);
    setUiLevel(startLevel);
    setLiveAvgError(0);
    setIsNewBest(false);

    engine.current = {
      state: 'TARGET',
      targetTime: 1000,
      startTime: 0,
      displayTimer: 1.5,
      resultTimer: 1.0,
      lastError: 0,
      clickedTime: 0,
      lastRating: '',
      lastColor: '',
      score: 0,
      level: startLevel,
      combo: 0,
      maxCombo: 0,
      comboMultiplier: 1.0,
      totalAttempts: 0,
      hits: 0,
      misses: 0,
      exactHits: 0,
      perfectHits: 0,
      totalErrorAbs: 0,
      reactionTimes: [],
      mousePos: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      particles: [],
      screenShake: 0,
      flashRed: 0,
      totalFrames: 0
    };

    // Countdown sequence: 3 -> 2 -> 1 -> GO with Audio Cues
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
      setGameState('playing');
      generateNewRound();
      drillAudio.playGo();
    }, 2600);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [generateNewRound]);

  // Particle Explosions
  const createExplosion = useCallback((x: number, y: number, color: string, count: number) => {
    const e = engine.current;
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 5 + 1;
      e.particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1.0, color });
    }
  }, []);

  // Handle User Input Click / Tap during gameplay
  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (gameState !== 'playing') return;

    const eRef = engine.current;
    const cvs = canvasRef.current;
    if (!cvs) return;

    const cx = cvs.width / 2;
    const cy = cvs.height / 2;

    if (eRef.state === 'TIMER') {
      const now = performance.now();
      const elapsed = now - eRef.startTime;
      const error = elapsed - eRef.targetTime;
      const errorAbs = Math.abs(error);

      eRef.lastError = error;
      eRef.clickedTime = elapsed;
      eRef.totalAttempts++;

      // Tolerance Formula
      const baseTolerance = 50 + (eRef.targetTime * 0.05);
      const tExact = 10;
      const tPerfect = baseTolerance * 0.2;
      const tExcellent = baseTolerance * 0.4;
      const tGood = baseTolerance * 0.6;
      const tOk = baseTolerance * 0.8;
      const tHit = baseTolerance;

      if (errorAbs <= tHit) {
        // Successful Hit!
        eRef.hits++;
        eRef.totalErrorAbs += errorAbs;
        eRef.combo++;
        if (eRef.combo > eRef.maxCombo) eRef.maxCombo = eRef.combo;

        eRef.comboMultiplier = Math.min(3.0, 1.0 + (eRef.combo * 0.1));

        let flashColor = '#06b6d4';
        let basePts = 0;
        let rating = '';

        if (errorAbs <= tExact) {
          basePts = 25; rating = 'EXACT'; flashColor = '#fbbf24';
          eRef.exactHits++;
        } else if (errorAbs <= tPerfect) {
          basePts = 10; rating = 'PERFECT'; flashColor = '#00ff88';
          eRef.perfectHits++;
        } else if (errorAbs <= tExcellent) {
          basePts = 8; rating = 'EXCELLENT'; flashColor = '#3b82f6';
        } else if (errorAbs <= tGood) {
          basePts = 5; rating = 'GOOD'; flashColor = '#06b6d4';
        } else if (errorAbs <= tOk) {
          basePts = 3; rating = 'OK'; flashColor = '#f59e0b';
        } else {
          basePts = 1; rating = 'HIT'; flashColor = '#d946ef';
        }

        const ptsGained = Math.round(basePts * eRef.comboMultiplier * 10);
        eRef.score += ptsGained;
        eRef.lastRating = rating;
        eRef.lastColor = flashColor;

        drillAudio.playHit();
        createExplosion(cx, cy, flashColor, basePts * 2);

        // Endless Leveling
        const newLevel = Math.floor(eRef.score / 250) + 1;
        if (newLevel > eRef.level) {
          eRef.level = newLevel;
          drillAudio.playGo();
        }

        eRef.state = 'RESULT';
      } else {
        // Miss - Timing Penalty
        eRef.misses++;
        eRef.combo = 0;
        eRef.comboMultiplier = 1.0;
        eRef.screenShake = 12;
        eRef.flashRed = 0.25;
        eRef.lastRating = 'MISS';
        eRef.lastColor = '#ef4444';

        triggerFlash();
        drillAudio.playPenalty();

        eRef.state = 'RESULT';
      }

      setUiScore(Math.floor(eRef.score));
      setUiRounds(eRef.totalAttempts);
      setUiLevel(eRef.level);
      setLiveAvgError(Math.round(eRef.totalErrorAbs / Math.max(1, eRef.hits)));

    } else if (eRef.state === 'RESULT') {
      // Immediate advance to next round on fast click
      generateNewRound();
    }
  }, [gameState, generateNewRound, createExplosion, triggerFlash]);

  // Main Render & Physics Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const cvs = canvasRef.current;
    const container = containerRef.current;
    if (!cvs || !container) return;

    const ctx = cvs.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          cvs.width = width;
          cvs.height = height;
        }
      }
    });
    resizeObserver.observe(container);

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.033);
      lastTime = time;
      const e = engine.current;

      // State Timers
      if (e.state === 'TARGET') {
        e.displayTimer -= dt;
        if (e.displayTimer <= 0) {
          e.state = 'TIMER';
          e.startTime = performance.now();
        }
      } else if (e.state === 'RESULT') {
        e.resultTimer -= dt;
        if (e.resultTimer <= 0) {
          generateNewRound();
        }
      }

      // FX Decay
      if (e.screenShake > 0) e.screenShake -= dt * 35;
      if (e.flashRed > 0) e.flashRed -= dt * 2.0;

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

      const cx = cvs.width / 2;
      const cy = cvs.height / 2;

      // Professional Background Tactical Grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 50) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      for (let j = 0; j < cvs.height; j += 50) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke();
      }

      // --- State Specific Professional Render ---
      if (e.state === 'TARGET') {
        ctx.fillStyle = "#ffffff";
        ctx.font = "900 64px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${(e.targetTime / 1000).toFixed(3)}s`, cx, cy + 15);

        // Progress bar for memorization phase
        const maxDisplay = Math.max(0.5, 1.6 - (e.level * 0.05));
        const prog = e.displayTimer / maxDisplay;
        ctx.fillStyle = "rgba(6, 182, 212, 0.15)";
        ctx.fillRect(cx - 110, cy + 50, 220, 4);
        ctx.fillStyle = "#06b6d4";
        ctx.fillRect(cx - 110, cy + 50, Math.max(0, 220 * prog), 4);
      }

      if (e.state === 'TIMER') {
        const elapsed = performance.now() - e.startTime;

        // Center Glowing Orb
        ctx.beginPath();
        ctx.arc(cx, cy, 12, 0, Math.PI * 2);
        ctx.fillStyle = "#06b6d4";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#06b6d4";
        ctx.fill();
        ctx.shadowBlur = 0;

        // Rotating inner dashed ring
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(elapsed * 0.0012);
        ctx.beginPath();
        ctx.arc(0, 0, 52, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(6, 182, 212, 0.5)";
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 15]);
        ctx.stroke();
        ctx.restore();

        // Counter-rotating outer orbital ring
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-elapsed * 0.0006);
        ctx.beginPath();
        ctx.arc(0, 0, 75, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
        ctx.lineWidth = 1.2;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.restore();

        // Pulsing rings
        const pulse = (elapsed % 1000) / 1000;
        ctx.beginPath();
        ctx.arc(cx, cy, 75 + (pulse * 42), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.4 * (1 - pulse)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (e.state === 'RESULT') {
        const color = e.lastColor;

        ctx.fillStyle = "#ffffff";
        ctx.font = "900 64px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${(e.clickedTime / 1000).toFixed(3)}s`, cx, cy - 5);

        ctx.fillStyle = color;
        ctx.font = "bold 26px monospace";
        ctx.fillText(`${e.lastError > 0 ? '+' : ''}${e.lastError.toFixed(0)}ms`, cx, cy + 42);

        // Next round progress bar
        const maxResult = Math.max(0.5, 1.2 - (e.level * 0.05));
        const prog = e.resultTimer / maxResult;
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fillRect(cx - 100, cy + 75, 200, 3);
        ctx.fillStyle = color;
        ctx.fillRect(cx - 100, cy + 75, Math.max(0, 200 * prog), 3);
      }

      if (e.flashRed > 0) {
        ctx.fillStyle = `rgba(239, 68, 68, ${e.flashRed})`;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
      }

      // Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;
        p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 4, 4);
      }
      ctx.globalAlpha = 1.0;

      ctx.restore();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, generateNewRound]);

  // Share Score Card helper
  const sharePage = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/reaction-speed/reaction-time-test';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Reaction Time Test',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Avg Error: ±${analytics.avgReactionTime}ms) on Reaction Time Test! Practice free reflex drills at skilldrills.online! ⚡`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'Reaction Time Test Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(`${text} ${url}`);
        alert('Score & drill link copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── HEADER / BREADCRUMB ── */}
      {!isFullscreen && (
        <header className="border-b border-white/5 bg-[#080811]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/drills/reaction-speed" className="hover:text-white transition-colors">Reaction Speed</Link>
              <span>/</span>
              <span className="text-cyan-400 font-medium">Reaction Time Test</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  drillAudio.setEnabled(next);
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={soundEnabled ? "Mute Sound" : "Unmute Sound"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-red-400" />}
              </button>
              <button
                onClick={() => {
                  const next = !flashEnabled;
                  setFlashEnabled(next);
                  drillFlash.setEnabled(next);
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={flashEnabled ? "Disable Miss Flash" : "Enable Miss Flash"}
              >
                {flashEnabled ? <Zap className="w-4 h-4 text-red-400" /> : <ZapOff className="w-4 h-4 text-red-400" />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
              REACTION TIME TEST
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Visual Latency & Mental Chronometry • Unlimited Practice
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-cyan-400 tabular-nums font-mono">{uiScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Avg Error</div>
              <div className="text-lg sm:text-xl font-black text-white tabular-nums font-mono">
                ±{liveAvgError}<span className="text-xs text-slate-400">ms</span>
              </div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Level</div>
              <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums font-mono">L{uiLevel}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Score</div>
              <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums font-mono">{bestScore}</div>
            </div>
          </div>
        )}

        {/* Game Stage Container */}
        <div
          ref={containerRef}
          className={
            isFullscreen
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] flex flex-col items-center justify-center'
              : isMobile
                ? (isPortrait
                    ? 'w-full rounded-2xl aspect-[3/4] min-h-[420px] max-h-[76vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col'
                    : 'w-full rounded-2xl aspect-video min-h-[340px] max-h-[85vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col')
                : 'w-full rounded-2xl aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col'
          }
        >
          {/* Red Flash Overlay */}
          <DrillFlashOverlay flashes={flashes} />

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50 font-mono">Score</p>
                <p className="text-2xl sm:text-3xl font-black text-white tabular-nums font-mono leading-tight">{uiScore}</p>
              </div>

              {/* End Drill Action Button in HUD */}
              {gameState === 'playing' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40">
                  <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      endGame();
                    }}
                    className="px-4 py-1.5 rounded-full bg-red-600/90 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg border border-red-400/40 cursor-pointer active:scale-95 transition-all"
                  >
                    <XSquare className="w-3.5 h-3.5" /> End Drill
                  </button>
                </div>
              )}


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

          {/* CANVAS */}
          <canvas
            ref={canvasRef}
            onPointerDown={(e) => handleInteraction(e.clientX, e.clientY)}
            className="block absolute top-0 left-0 w-full h-full z-10 cursor-pointer touch-none"
          />

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCardAny
              icon={Clock}
              accent="cyan"
              title="Reaction Time Test"
              subtitle="Visual Latency • Mental Chronometry"
              rules={[
                { icon: Clock, accent: 'cyan', title: 'Memorize Target Interval', text: 'Note the exact target time displayed before estimation starts' },
                { icon: Target, accent: 'orange', title: 'Click at Exact Time', text: 'Click as close to 0ms error as possible when time elapses' },
                { icon: Zap, accent: 'emerald', title: 'Time-Free Practice', text: 'Play unlimited rounds at your pace. Click End Drill whenever ready!' }
              ]}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: TrendingUp, label: 'Best Level', value: `Lv. ${bestLevel}`, color: 'text-cyan-400', accent: 'blue' },
              ]}
              isTouchOnlyDevice={false}
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
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(6,182,212,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade.color} font-mono`}>
                  {analytics.grade.letter}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1 font-mono">
                  {analytics.grade.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 tabular-nums font-mono">
                  {uiScore}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500 font-mono">Points</div>
              </div>

              {/* Right Stats & Actions Panel */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">

                {/* 3 Stat Tiles */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white font-mono">{analytics.accuracy}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5 font-mono">Accuracy</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-cyan-400 font-mono">±{analytics.avgReactionTime}<span className="text-[10px] text-gray-500">ms</span></p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5 font-mono">Avg Error</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white font-mono">Lv. {analytics.finalLevel}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5 font-mono">Peak Level</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={enterDrill}
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Play Again
                  </button>
                  <button
                    type="button"
                    onClick={sharePage}
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform"
                    title="Share Score"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
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

        {/* ACCORDIONS */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
            <DrillAccordion
              id="rules"
              title="Drill Instructions & Scoring System"
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                <RuleItem num="1" text="Timing Accuracy" highlight="Up to +250 PTS" result="Sub-10ms error earns EXACT bonus" />
                <RuleItem num="2" text="Combo Stacking" highlight="Up to 3.0x" result="Consecutive hits multiply point gains" />
                <RuleItem num="3" text="Timing Miss" highlight="Combo Reset" result="Triggers red alert, score safe" />
                <RuleItem num="4" text="Unlimited Time" highlight="Free Mode" result="Play at your pace until you click End Drill" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Reaction Time Test"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8 font-sans">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-cyan-400" /> What Is Visual Reaction Time & Mental Chronometry?
                  </h4>
                  <p className="text-sm leading-relaxed mb-3 text-gray-300">
                    <strong>Reaction Time Test</strong> measures and conditions visual latency, internal clock calibration, and mental chronometry. In fast-paced FPS, racing, and sports games, judging timing intervals and visual cues with sub-millisecond precision is essential for winning duels.
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    This drill isolates time estimation and visual stimulus latency. Training your temporal processing reduces visual reaction delay, improves hand-eye synchronization, and helps you execute actions with peak consistency.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Gamers, esports athletes, musicians, and drivers looking to refine visual response speed and internal timing rhythm.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Temporal Calibration</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Trains your brain to track seconds smoothly without relying on visual metronomes or rushing clicks.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Sustained Focus</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Unlimited practice mode allows you to build flow-state focus and track millisecond error statistics over time.</p>
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
                <FAQItem q="What is the Reaction Time Test?" a="It is an online visual reaction speed game that measures your response latency and internal clock timing accuracy in milliseconds." />
                <FAQItem q="What is a good reaction time?" a="Average human visual reaction time is 200-250ms. Elite gamers and athletes achieve reaction speeds under 180ms." />
                <FAQItem q="Can you improve reaction speed?" a="Yes! Dedicated practice sharpens neural processing efficiency, reducing decision time and motor execution delay." />
                <FAQItem q="How does the time-free mode work?" a="You can play as many rounds as you want without a timer forcing the game to end. Click End Drill whenever you wish to view your full session analytics." />
                <FAQItem q="Is this reflex trainer free?" a="Yes, all drills on SkillDrills are 100% free with no signups or ads." />
              </div>
            </DrillAccordion>
          </div>
        )}

        {/* RELATED DRILLS GRID */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 font-mono">
              Related Reaction Speed Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {RELATED_DRILLS.map((drill) => (
                <Link
                  key={drill.id}
                  href={drill.href}
                  className="group bg-[#0c0c16] border border-white/5 hover:border-cyan-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1 font-mono">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-cyan-400 mt-3 flex items-center gap-1 transition-colors font-mono">
                    Train Drill <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SITE FOOTER */}
        {!isFullscreen && <DrillFooter />}

      </main>
    </div>
  );
}

// === Subcomponents ===
function RuleItem({ num, text, highlight = '', result }: { num: string; text: string; highlight?: string; result: string }) {
  return (
    <div className="flex items-center gap-4 bg-black p-4 rounded-xl border border-white/10 shadow-sm font-sans">
      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0 font-mono">{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-100 font-sans">
          {text}{highlight && <span className="font-black text-white font-mono"> ({highlight})</span>}
        </p>
        <div className="text-xs font-black px-3 py-1.5 rounded-lg bg-[#050811] border border-white/10 text-white whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left font-mono">
          {result}
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="bg-[#05060b] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors font-sans">
      <h4 className="text-sm font-bold text-gray-200 mb-2">{q}</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{a}</p>
    </div>
  );
}