'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Volume2, VolumeX,
  Play, RefreshCw, Target,
  Share2, LogOut, Eye, Users, TrendingUp, Zap, ZapOff, Trophy
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

const DRILL_DURATION = 45; // 45 seconds focused duration
const POINTS_PER_HIT = 100;
const POINTS_PER_LEVEL = 250;
const ELITE_SCORE = 6000; // Rebalanced after combo removal
const STORAGE_KEY = 'skilldrills_reflex_training_drill_v2';

const RELATED_DRILLS = [
  { id: "barrier-sequence-pursuit", name: "Jiggle Peek Trainer", cat: "Reaction Speed", desc: "Train angle holding and cover peeking reaction reflexes.", href: "/drills/reaction-speed/barrier-sequence-pursuit" },
  { id: "fps-tracking-trainer", name: "FPS Tracking Trainer", cat: "Reaction Speed", desc: "Condition tracking accuracy against dynamic moving targets.", href: "/drills/reaction-speed/fps-tracking-trainer" },
  { id: "market-doors-pursuit", name: "Corner Checking Trainer", cat: "Reaction Speed", desc: "Saccadic eye sweep & doorway clearing trainer.", href: "/drills/reaction-speed/market-doors-pursuit" },
  { id: "reaction-simulator", name: "Reaction Simulator", cat: "Reaction Speed", desc: "Simulate rapid combat reaction scenarios.", href: "/drills/reaction-speed/reaction-simulator" },
  { id: "reaction-time-test", name: "Reaction Time Test", cat: "Reaction Speed", desc: "Measure pure visual reaction speed in milliseconds.", href: "/drills/reaction-speed/reaction-time-test" },
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


// Smooth difficulty curve parameters driving Level 1 to Level 15
const getLevelConfig = (level: number) => {
  const p = getDifficultyProgress(level); // 0 -> 1 across L1..L15
  return {
    radius: Math.max(12, Math.round(26 - p * 14)),          // 26px -> 12px
    ttl: Math.max(750, Math.round(1900 - p * 1150)),         // 1900ms -> 750ms (needs headroom to scan multiple targets)
    concurrent: Math.min(5, 2 + Math.floor(p * 3.2)),        // 2 -> 5 simultaneous burst targets
    spawnStagger: Math.max(50, Math.round(220 - p * 150)),    // 220ms -> 70ms between burst refills
  };
};

type BurstTarget = { id: number; x: number; y: number; radius: number; spawnTime: number; ttl: number };
type Particle = { x: number; y: number; vx: number; vy: number; color: string; life: number };
type RingBurst = { x: number; y: number; startR: number; maxR: number; life: number; maxLife: number; color: string };

export default function ReflexTrainingDrillClient() {
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
  const [uiTimeLeft, setUiTimeLeft] = useState<number>(DRILL_DURATION);
  const [bestScore, setBestScore] = useState<number>(0);
  const [bestLevel, setBestLevel] = useState<number>(1);
  const [totalSessions, setTotalSessions] = useState<number>(0);
  const [isNewBest, setIsNewBest] = useState<boolean>(false);

  // End Session Analytics
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    successfulHits: 0,
    missedClicks: 0,
    timeouts: 0,
    avgReactionTime: 0,
    finalLevel: 1,
    grade: null as any
  });

  // DOM & Engine Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const countdownTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const engine = useRef({
    score: 0,
    level: 1,
    successfulHits: 0,
    missedClicks: 0,
    timeouts: 0,
    reactionTimes: [] as number[],
    timeLeft: DRILL_DURATION,
    screenShake: 0,
    particles: [] as Particle[],
    rings: [] as RingBurst[],
    targets: [] as BurstTarget[],
    nextId: 1,
    nextSpawnTime: 0
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
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Exit Drill cleanly
  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    setGameState('start');
  }, []);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  // Complete Drill Session cleanly
  const endGame = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    setGameState('gameOver');

    const e = engine.current;
    const totalActions = e.successfulHits + e.missedClicks + e.timeouts;
    const acc = totalActions > 0 ? Math.round((e.successfulHits / totalActions) * 100) : 100;
    const avgRt = e.reactionTimes.length > 0
      ? Math.round(e.reactionTimes.reduce((a, b) => a + b, 0) / e.reactionTimes.length)
      : 0;

    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const gradeObj = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: acc,
      successfulHits: e.successfulHits,
      missedClicks: e.missedClicks,
      timeouts: e.timeouts,
      avgReactionTime: avgRt,
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

  // Burst Target Spawn — fills open slots up to the level's concurrent target count,
  // rejecting spawn points that overlap an already-active target
  const spawnBurstTarget = useCallback((W: number, H: number, level: number) => {
    const e = engine.current;
    const config = getLevelConfig(level);

    const baseR = isMobile ? 26 : 24;
    const radius = Math.max(12, Math.round(baseR - (getDifficultyProgress(level) * 10)));

    const marginX = W * 0.13;
    const marginY = H * 0.17;

    let x = 0, y = 0, attempts = 0;
    do {
      x = marginX + Math.random() * (W - marginX * 2);
      y = marginY + Math.random() * (H - marginY * 2);
      attempts += 1;
    } while (
      attempts < 20 &&
      e.targets.some((t) => Math.hypot(x - t.x, y - t.y) < (radius + t.radius) * 1.8)
    );

    e.targets.push({
      id: e.nextId++,
      x, y, radius,
      spawnTime: performance.now(),
      ttl: config.ttl,
    });
  }, [isMobile]);

  // Enter Drill (Full Screen -> 321GO Countdown with Sound -> Playing)
  const enterDrill = useCallback(async () => {
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (e) {}

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    drillAudio.init();

    const saved = getSavedData();
    const startLevel = getStartLevel(saved.bestLevel);

    setUiScore(0);
    setUiTimeLeft(DRILL_DURATION);

    engine.current = {
      score: 0,
      level: startLevel,
      successfulHits: 0,
      missedClicks: 0,
      timeouts: 0,
      reactionTimes: [],
      timeLeft: DRILL_DURATION,
      screenShake: 0,
      particles: [],
      rings: [],
      targets: [],
      nextId: 1,
      nextSpawnTime: 0
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

      // Start 1-second Interval Timer (45 seconds duration)
      let remaining = DRILL_DURATION;
      timerIntervalRef.current = setInterval(() => {
        remaining -= 1;
        setUiTimeLeft(remaining);
        if (remaining <= 0) {
          endGame();
        }
      }, 1000);

    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [endGame]);

  // Target Click / Tap Handler — hit-tests against every live target in the burst,
  // most-recently-spawned first
  const handleCanvasInteraction = useCallback((clientX: number, clientY: number) => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;

    const rect = cvs.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;

    const e = engine.current;
    const hitPad = isMobile ? 24 : 14;

    let hitIndex = -1;
    for (let i = e.targets.length - 1; i >= 0; i--) {
      const t = e.targets[i];
      const dist = Math.hypot(clickX - t.x, clickY - t.y);
      if (dist <= t.radius + hitPad) { hitIndex = i; break; }
    }

    if (hitIndex !== -1) {
      const hitTarget = e.targets[hitIndex];
      const rt = Math.round(performance.now() - hitTarget.spawnTime);
      e.reactionTimes.push(rt);
      e.successfulHits += 1;
      e.score += POINTS_PER_HIT;

      // Monotonic level progression as user scores points
      const rawLevel = Math.floor(e.score / POINTS_PER_LEVEL) + 1;
      e.level = Math.max(e.level, rawLevel);

      setUiScore(e.score);
      drillAudio.playHit();

      // Particles explosion (Constant Red)
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 2 + Math.random() * 4;
        e.particles.push({
          x: hitTarget.x,
          y: hitTarget.y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          color: '#ef4444',
          life: 1.0
        });
      }

      // Ring Burst Effect
      e.rings.push({
        x: hitTarget.x,
        y: hitTarget.y,
        startR: hitTarget.radius * 0.4,
        maxR: hitTarget.radius * 2.6,
        life: 0.28,
        maxLife: 0.28,
        color: '#ef4444'
      });

      e.targets.splice(hitIndex, 1);
      return;
    }

    // Missed click on empty space: no penalty, just flash + audio feedback
    e.missedClicks += 1;
    e.screenShake = 6;
    triggerFlash();
    drillAudio.playPenalty();
  }, [gameState, isMobile, triggerFlash]);

  // Canvas Physics & Render Loop (Multi-Target Burst Reflex Engine)
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current;
    const container = containerRef.current;
    if (!cvs || !container) return;

    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cvs.width = rect.width * dpr;
      cvs.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(container);

    let lastTime = performance.now();

    const draw = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const rect = container.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const e = engine.current;

      // Screen Shake Effect
      ctx.save();
      if (e.screenShake > 0) {
        const sx = (Math.random() - 0.5) * e.screenShake;
        const sy = (Math.random() - 0.5) * e.screenShake;
        ctx.translate(sx, sy);
        e.screenShake *= 0.85;
        if (e.screenShake < 0.2) e.screenShake = 0;
      }

      // Clear Canvas (Deep Dark `#050508`)
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, W, H);

      // Render subtle background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Refill the burst up to the level's concurrent target count, staggered
      // slightly so a fresh wave doesn't all snap in on the same frame
      if (now >= e.nextSpawnTime) {
        const config = getLevelConfig(e.level);
        if (e.targets.length < config.concurrent) {
          spawnBurstTarget(W, H, e.level);
          e.nextSpawnTime = now + config.spawnStagger;
        } else {
          e.nextSpawnTime = now + 120;
        }
      }

      // Timeout Check — each burst target ages out independently
      for (let i = e.targets.length - 1; i >= 0; i--) {
        const t = e.targets[i];
        const age = now - t.spawnTime;
        if (drillTimeout.isEnabled() && age >= t.ttl) {
          e.targets.splice(i, 1);
          e.timeouts += 1;
          e.screenShake = 6;
          triggerFlash();
          drillAudio.playPenalty();
        }
      }

      // Draw every live burst target (Tactical Red Target Sphere matching reference design)
      for (const t of e.targets) {
        const r = t.radius;
        const remaining = Math.max(0, 1 - (now - t.spawnTime) / t.ttl);
        ctx.save();

        // Depleting countdown arc — critical when several targets are alive at once
        // so the player can see which one is about to expire
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = remaining < 0.3 ? '#ef4444' : '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(t.x, t.y, r + 8, -Math.PI / 2, -Math.PI / 2 + remaining * Math.PI * 2);
        ctx.stroke();

        // Ghost outer ring
        ctx.globalAlpha = 0.2;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(t.x, t.y, r + 5, 0, Math.PI * 2);
        ctx.stroke();

        // Tactical outer ring
        ctx.globalAlpha = 0.55;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(t.x, t.y, r, 0, Math.PI * 2);
        ctx.stroke();

        // Filled red body with subtle glow
        ctx.globalAlpha = 0.88;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 14;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(t.x, t.y, r * 0.82, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Highlight sheen
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(t.x - r * 0.2, t.y - r * 0.2, r * 0.28, 0, Math.PI * 2);
        ctx.fill();

        // Bright white center core
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(t.x, t.y, Math.max(2.5, r * 0.18), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Ring Bursts Draw
      for (let i = e.rings.length - 1; i >= 0; i--) {
        const ring = e.rings[i];
        ring.life -= dt;
        if (ring.life <= 0) { e.rings.splice(i, 1); continue; }
        const progress = 1 - ring.life / ring.maxLife;
        const currentR = ring.startR + (ring.maxR - ring.startR) * progress;
        ctx.save();
        ctx.globalAlpha = (ring.life / ring.maxLife) * 0.75;
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, currentR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Particles Update & Draw
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2.5;
        if (p.life <= 0) {
          e.particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      ctx.restore();
      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      ro.disconnect();
    };
  }, [gameState, spawnBurstTarget, triggerFlash, isMobile]);

  // Share Score Card helper
  const sharePage = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/reaction-speed/reflex-training-drill';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Reflex Training Drill',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Reflex Training Drill! Multi-target burst accuracy: ${analytics.accuracy}%. Practice free reflex drills at skilldrills.online! ⚡`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'Reflex Training Drill Score', text, url }).catch(() => {});
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
              <span className="text-red-400 font-medium">Reflex Training Drill</span>
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
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-red-400 bg-clip-text text-transparent">
              REFLEX TRAINING DRILL
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Multi-Target Burst Reflex & Divided Attention
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-red-400 tabular-nums">{uiScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {uiTimeLeft}s
              </div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Level</div>
              <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">L{engine.current.level}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Score</div>
              <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums">{bestScore}</div>
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

          {/* IN-BOX SCORE / TIMER HUD */}
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

          {/* IN-GAME SOUND + FLASH TOGGLES */}
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* CANVAS */}
          <canvas 
            ref={canvasRef} 
            onPointerDown={(e) => handleCanvasInteraction(e.clientX, e.clientY)}
            className="block absolute top-0 left-0 w-full h-full z-10 cursor-crosshair touch-none" 
          />

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Target}
              accent="red"
              title="Reflex Training Drill"
              subtitle="Multi-Target Burst • Divided Attention Reflex"
              rules={[
                { icon: Target, accent: 'red', title: 'Clear Simultaneous Targets', text: 'Multiple targets flash on screen at once — tap every one before it vanishes' },
                { icon: Zap, accent: 'orange', title: 'Divided Attention Reflex', text: 'More targets join the burst as your level climbs, testing split-second scanning' },
              ]}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: TrendingUp, label: 'Best Level', value: `Lv. ${bestLevel}`, color: 'text-blue-400', accent: 'blue' },
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
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(239,68,68,.12), transparent 70%)' }}>
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
                
                {/* 3 Stat Tiles */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.accuracy}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Accuracy</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.avgReactionTime}<span className="text-[10px] text-gray-500">ms</span></p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Avg Reaction</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">Lv. {analytics.finalLevel}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Level</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={enterDrill}
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
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
                <RuleItem num="1" text="Clear Burst Targets" highlight="+100 PTS" result="Adds to score & levels you up" />
                <RuleItem num="2" text="Level Progression" highlight="Every 250 PTS" result="More targets join the burst & shrink" />
                <RuleItem num="3" text="Miss / Timeout" highlight="No Penalty" result="Triggers red alert, score safe" />
                <RuleItem num="4" text="Session Length" highlight="45 Seconds" result="Beat your best before time's up" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Reflex Training Drill"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8 font-sans">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-red-400" /> What Is Multi-Target Burst & Divided Attention Reflex Training?
                  </h4>
                  <p className="text-sm leading-relaxed mb-3 text-gray-300">
                    <strong>Reflex Training Drill</strong> flashes several static targets on screen at once instead of one at a time, forcing you to divide your attention across simultaneous stimuli and clear the whole burst before any of them expire.
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Real firefights and fast-paced team sports rarely present one threat in isolation. Conditioning your eyes and hands to process several targets in parallel — rather than tracking a single moving point — builds the split-attention scanning that single-target drills can't train.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Gamers, esports athletes, and vision trainees looking to sharpen simultaneous multi-target acquisition and divided attention.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Adaptive Burst Size</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">The number of simultaneous targets climbs from 2 up to 5 as you level up, alongside shrinking radius and tighter timeouts.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Split-Attention Scanning</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">A depleting countdown ring on each target shows exactly how much time is left, so you learn to triage the burst under pressure.</p>
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
                <FAQItem q="What is a reflex training drill?" a="It is an interactive vision utility where several targets flash on screen at once and you must tap every one before it times out, measuring divided-attention reflex speed." />
                <FAQItem q="What is divided attention in gaming?" a="Divided attention is the ability to process and react to multiple simultaneous stimuli instead of tracking a single target — critical when several enemies or events appear at once." />
                <FAQItem q="Can you train divided attention and multi-target reflexes?" a="Yes. Repeated exposure to simultaneous stimuli strengthens parallel visual processing and reduces the tunnel-vision effect of fixating on one target." />
                <FAQItem q="How does this drill differ from single-target reaction tests?" a="Single-target tests present one stimulus at a time. This drill spawns 2 to 5 targets simultaneously, so you must scan and clear a full burst under a shared time limit." />
                <FAQItem q="Does monitor refresh rate affect burst reflex scores?" a="Yes. Higher refresh rate monitors (144Hz, 240Hz, 360Hz) render each target's countdown ring more smoothly, helping you triage the burst with less input lag." />
                <FAQItem q="Is this reflex trainer free?" a="Yes, all drills on SkillDrills are 100% free with no signups, downloads, or pop-up ads required." />
                <FAQItem q="What games benefit from multi-target burst training?" a="Fast arena shooters, battle royales (Apex Legends, Overwatch 2, Fortnite), and tactical shooters (Valorant, CS2) where multiple enemies can appear at once benefit heavily." />
                <FAQItem q="How does level progression work?" a="Every 250 points earned levels up the drill, adding more simultaneous burst targets (up to 5), shrinking their radius, and tightening each target's timeout." />
                <FAQItem q="What happens if I miss a click?" a="Clicking empty background space triggers a red alert flash and a miss is logged against your accuracy — there's no score penalty, so keep going." />
                <FAQItem q="Can traditional athletes use this drill?" a="Yes. Sports vision research shows multi-object tracking and divided-attention drills enhance spatial awareness for tennis, hockey, and martial arts." />
                <FAQItem q="Does this drill support touchscreens and mobile devices?" a="Yes! It features generous touch hitpads and automatic orientation warnings for mobile devices." />
                <FAQItem q="How often should I practice divided attention reflexes?" a="A daily 5-10 minute session warms up your eye-hand coordination and maintains optimal visual alertness across multiple stimuli." />
                <FAQItem q="Which target should I clear first in a burst?" a="Watch the depleting countdown ring around each target and prioritize whichever is closest to timing out, not just the nearest one to your cursor." />
                <FAQItem q="Does mouse DPI affect burst reflex performance?" a="Using a comfortable mouse DPI (400-1600 DPI) ensures smooth, quick cursor jumps between the multiple targets in a burst." />
                <FAQItem q="What is a good score on this drill?" a="A score above 5,000 indicates strong divided-attention reflexes, while scores exceeding 10,000 represent elite multi-target acquisition speed." />
              </div>
            </DrillAccordion>
          </div>
        )}

        {/* RELATED DRILLS GRID */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              Related Reaction Speed Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {RELATED_DRILLS.map((drill) => (
                <Link
                  key={drill.id}
                  href={drill.href}
                  className="group bg-[#0c0c16] border border-white/5 hover:border-red-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-red-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-red-400 mt-3 flex items-center gap-1 transition-colors">
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
      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0">{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-100 font-sans">
          {text}{highlight && <span className="font-black text-white"> ({highlight})</span>}
        </p>
        <div className="text-xs font-black px-3 py-1.5 rounded-lg bg-[#050811] border border-white/10 text-white whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left">
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
