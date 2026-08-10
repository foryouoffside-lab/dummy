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
const STORAGE_KEY = 'skilldrills_market_doors_v2';

const RELATED_DRILLS = [
  { id: "barrier-sequence-pursuit", name: "Jiggle Peek Trainer", cat: "Reaction Speed", desc: "Train angle holding and cover peeking reaction reflexes.", href: "/drills/reaction-speed/barrier-sequence-pursuit" },
  { id: "fps-tracking-trainer", name: "FPS Tracking Trainer", cat: "Reaction Speed", desc: "Condition tracking accuracy against dynamic moving targets.", href: "/drills/reaction-speed/fps-tracking-trainer" },
  { id: "reaction-time-test", name: "Reaction Time Test", cat: "Reaction Speed", desc: "Measure pure visual reaction speed in milliseconds.", href: "/drills/reaction-speed/reaction-time-test" },
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


// Smooth difficulty curve parameters driving Level 1 to Level 15
const getLevelConfig = (level: number) => {
  const p = getDifficultyProgress(level); // 0 -> 1 across L1..L15
  return {
    radius: Math.max(12, Math.round(28 - p * 16)),           // 28px -> 12px
    ttl: Math.max(380, Math.round(1300 - p * 880)),           // 1300ms -> 380ms
    spawnDelayMin: Math.max(120, Math.round(550 - p * 400)), // 550ms -> 150ms
    spawnDelayMax: Math.max(180, Math.round(750 - p * 520)), // 750ms -> 230ms
  };
};

type Particle = { x: number; y: number; vx: number; vy: number; color: string; life: number };
type RingBurst = { x: number; y: number; startR: number; maxR: number; life: number; maxLife: number; color: string };
type Door = { x: number; y: number; w: number; h: number };

export default function MarketDoorsPursuitClient() {
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
    doors: [] as Door[],
    target: {
      active: false,
      x: 0,
      y: 0,
      radius: 24,
      spawnTime: 0,
      ttl: 1200,
      doorIdx: 0,
    },
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

  // Target Spawn Logic inside Doorways
  const spawnTarget = useCallback((W: number, H: number, level: number) => {
    const e = engine.current;
    if (e.doors.length === 0) return;

    // Pick a random doorway
    const doorIdx = Math.floor(Math.random() * e.doors.length);
    const d = e.doors[doorIdx];

    const config = getLevelConfig(level);
    const baseR = isMobile ? 26 : 24;
    const radius = Math.max(14, Math.round(baseR - (getDifficultyProgress(level) * 8)));

    // Spawn inside doorway center with micro position variance
    const targetX = d.x + d.w * 0.5 + (Math.random() - 0.5) * (d.w * 0.3);
    const targetY = d.y + d.h * 0.4 + (Math.random() - 0.5) * (d.h * 0.2);

    e.target = {
      active: true,
      x: targetX,
      y: targetY,
      radius,
      spawnTime: performance.now(),
      ttl: config.ttl,
      doorIdx,
    };
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
      doors: [],
      target: {
        active: false,
        x: 0, y: 0, radius: 24, spawnTime: 0, ttl: 1200, doorIdx: 0
      },
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

  // Target Click / Tap Handler
  const handleCanvasInteraction = useCallback((clientX: number, clientY: number) => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;

    const rect = cvs.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;

    const e = engine.current;

    if (e.target.active) {
      const dist = Math.hypot(clickX - e.target.x, clickY - e.target.y);
      // Hit target (Target Radius + generous touch hitpad)
      const hitPad = isMobile ? 24 : 14;
      if (dist <= e.target.radius + hitPad) {
        const rt = Math.round(performance.now() - e.target.spawnTime);
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
            x: e.target.x,
            y: e.target.y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            color: '#ef4444',
            life: 1.0
          });
        }

        // Ring Burst Effect
        e.rings.push({
          x: e.target.x,
          y: e.target.y,
          startR: e.target.radius * 0.4,
          maxR: e.target.radius * 2.6,
          life: 0.28,
          maxLife: 0.28,
          color: '#ef4444'
        });

        e.target.active = false;
        const config = getLevelConfig(e.level);
        const delay = config.spawnDelayMin + Math.random() * (config.spawnDelayMax - config.spawnDelayMin);
        e.nextSpawnTime = performance.now() + delay;
        return;
      }
    }

    // Missed click on empty space: no penalty, just flash + audio feedback
    e.missedClicks += 1;
    e.screenShake = 6;
    triggerFlash();
    drillAudio.playPenalty();
  }, [gameState, isMobile, triggerFlash]);

  // Canvas Physics & Render Loop (Market Entry Doorways Engine)
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

      const W = rect.width;
      const H = rect.height;
      const isPortraitLayout = H > W;

      // Adaptive Doorway layout for Mobile Portrait vs Landscape
      if (isPortraitLayout) {
        // 2x2 Doorway layout for portrait mode
        const dw = W * 0.25;
        const dh = H * 0.20;
        engine.current.doors = [
          { x: W * 0.18, y: H * 0.20, w: dw, h: dh },
          { x: W * 0.57, y: H * 0.20, w: dw, h: dh },
          { x: W * 0.18, y: H * 0.54, w: dw, h: dh },
          { x: W * 0.57, y: H * 0.54, w: dw, h: dh }
        ];
      } else {
        // 5 Doorways arranged with 100% equal margins from both left and right screen edges (8% margin each)
        const dw = W * 0.12;
        const dh = H * 0.44;
        const dy = H * 0.28;
        engine.current.doors = [
          { x: W * 0.08, y: dy, w: dw, h: dh },
          { x: W * 0.26, y: dy, w: dw, h: dh },
          { x: W * 0.44, y: dy, w: dw, h: dh },
          { x: W * 0.62, y: dy, w: dw, h: dh },
          { x: W * 0.80, y: dy, w: dw, h: dh }
        ];
      }
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

      // Draw Entry Doorways (Market Doors Geometry)
      for (let i = 0; i < e.doors.length; i++) {
        const d = e.doors[i];
        
        // Doorway Arch/Frame
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.fillRect(d.x, d.y, d.w, d.h);
        ctx.strokeRect(d.x, d.y, d.w, d.h);

        // Doorway Header Arch Accent
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(d.x - 4, d.y - 8, d.w + 8, 8);
        ctx.strokeRect(d.x - 4, d.y - 8, d.w + 8, 8);

        // Subtle Doorway Number Label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`D${i + 1}`, d.x + d.w / 2, d.y - 12);
      }

      // Spawn Target if inactive
      if (!e.target.active && now >= e.nextSpawnTime) {
        spawnTarget(W, H, e.level);
      }

      // Target Timeout Check
      if (e.target.active) {
        const age = now - e.target.spawnTime;
        if (drillTimeout.isEnabled() && age >= e.target.ttl) {
          e.target.active = false;
          e.timeouts += 1;
          e.screenShake = 6;
          triggerFlash();
          drillAudio.playPenalty();
          const config = getLevelConfig(e.level);
          const delay = config.spawnDelayMin + Math.random() * (config.spawnDelayMax - config.spawnDelayMin);
          e.nextSpawnTime = now + delay;
        }
      }

      // Draw Target (Tactical Red Target Sphere matching reference design)
      if (e.target.active) {
        const t = e.target;
        const r = t.radius;
        ctx.save();

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
  }, [gameState, spawnTarget, triggerFlash, isMobile]);

  // Share Score Card helper
  const sharePage = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/reaction-speed/market-doors-pursuit';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Corner Checking Trainer',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Corner Checking Trainer! Average reaction: ${analytics.avgReactionTime}ms. Practice free reflex drills at skilldrills.online! ⚡`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'Corner Checking Trainer Score', text, url }).catch(() => {});
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
              <span className="text-red-400 font-medium">Corner Checking Trainer</span>
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
              CORNER CHECKING TRAINER
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Market Doors Pursuit & Saccadic Eye Sweeps
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
              title="Corner Checking Trainer"
              subtitle="Market Doors Pursuit • Saccadic Eye Sweeps"
              rules={[
                { icon: Target, accent: 'red', title: 'Clear Doorway Threats', text: 'Scan doorways and eliminate emerging threat targets' },
                { icon: Zap, accent: 'orange', title: 'Angle Clearing Sweeps', text: 'Perform quick visual sweeps to check corners as doors break out' },
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
                <RuleItem num="1" text="Clear Doorway Threats" highlight="+100 PTS" result="Adds to score & levels you up" />
                <RuleItem num="2" text="Level Progression" highlight="Every 250 PTS" result="Doorway targets peek faster & shrink" />
                <RuleItem num="3" text="Miss / Timeout" highlight="No Penalty" result="Triggers red alert, score safe" />
                <RuleItem num="4" text="Session Length" highlight="45 Seconds" result="Beat your best before time's up" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Corner Checking Trainer"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8 font-sans">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-red-400" /> What Is Corner Checking & Saccadic Eye Movement Training?
                  </h4>
                  <p className="text-sm leading-relaxed mb-3 text-gray-300">
                    <strong>Corner Checking Training</strong> (Market Doors Pursuit) isolates and conditions your saccadic eye movement speed, visual scanning efficiency, and angle clearing reflexes. In tactical shooters like CS2, Valorant, and Rainbow Six Siege, players entering a site or hallway must check multiple entry doorways in rapid succession—a tactical movement known as <em>"slicing the pie."</em>
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Saccades are high-speed, ballistic eye movements between fixations. Training saccadic accuracy and visual re-acquisition reduces cognitive fixation lag, sharpens peripheral threat awareness, and allows you to neutralize enemies holding tight doorway angles before they react.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Entry fraggers, site anchors, and tactical FPS players looking to improve corner clearing and angle acquisition in Valorant, CS2, and Siege.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Slicing the Pie Precision</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Teaches your visual cortex to scan sequential doorways methodically without skipping high-danger angles or over-aiming.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Saccadic Eye Sweeps</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Conditions fast, precise eye movements between entry points, minimizing foveal fixation delays and boosting reaction speed.</p>
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
                <FAQItem q="What is Corner Checking Trainer (Market Doors Pursuit)?" a="It is a visual reflex drill designed to train saccadic eye movements, corner checking, and angle clearing across multiple entry doorways." />
                <FAQItem q="What does 'slicing the pie' mean in FPS games?" a="Slicing the pie is a tactical technique where a player sweeps around a corner incrementally to clear narrow angles one by one." />
                <FAQItem q="What are saccadic eye movements?" a="Saccades are rapid, jerky eye movements between points of fixation. Fast saccades allow gamers to scan multiple angles quickly." />
                <FAQItem q="How does this drill improve site entry in Valorant and CS2?" a="Site entries require checking multiple doorways simultaneously. Training saccadic sweeps reduces hesitation when clearing entry points." />
                <FAQItem q="Why is corner checking important in tactical shooters?" a="Failing to check a corner often leads to instant elimination by holding defenders. Dedicated practice builds automatic checking habits." />
                <FAQItem q="Does this drill train choice reaction time?" a="Yes. Targets appear randomly in any doorway, forcing your visual cortex to process spatial location and execute immediate taps." />
                <FAQItem q="How does adaptive level difficulty work?" a="As your score increases, target exposure times shorten, targets shrink in size, and doorway spawn delays speed up." />
                <FAQItem q="Is this corner checking trainer free?" a="Yes, all drills on SkillDrills are 100% free with no downloads, signups, or pop-up ads." />
                <FAQItem q="Does monitor refresh rate affect corner checking speed?" a="Higher refresh rate monitors (144Hz+) render doorway target appearances with lower display latency, improving visual re-acquisition." />
                <FAQItem q="How often should I practice corner checking?" a="A daily 5-10 minute session as part of your FPS pre-game warmup routine conditions consistent saccadic eye sweeps." />
                <FAQItem q="What mechanical skills does Market Doors Pursuit train?" a="It isolates saccadic eye speed, spatial awareness, choice reaction speed, and crosshair placement at entry angles." />
                <FAQItem q="Can traditional athletes benefit from saccadic vision training?" a="Yes. Sports vision research shows that saccadic eye training improves peripheral scanning and reaction speed in court/field sports." />
                <FAQItem q="Should I look at the doorways or my crosshair?" a="Focus your eyes directly on the open doorway spaces while allowing your motor reflex to snap the crosshair onto emerging targets." />
                <FAQItem q="What games benefit most from corner checking training?" a="Tactical FPS titles such as CS2, Valorant, Rainbow Six Siege, and Tarkov benefit heavily from disciplined angle clearing." />
                <FAQItem q="Does this drill support mobile devices?" a="Yes! It features touch-optimized hitpads and automatic portrait orientation warnings." />
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
