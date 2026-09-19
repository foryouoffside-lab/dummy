'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Target, Eye, Users, TrendingUp, Zap, ZapOff, Trophy } from 'lucide-react';

import { isIdleFrameSkippable } from '@/lib/performance';
import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { drillFlash } from '../../../../lib/drillFlash';
import { drillTimeout } from '../../../../lib/drillTimeout';
import { drillPenalty } from '../../../../lib/drillPenalty';
import { getFpsScoreGrade, getComboMultiplier } from '../../../../lib/scoringEngine';
import { getDifficultyProgress, getStartLevel, ramp } from '../../../../lib/drillDifficulty';
import useDrillFlash from '../../../../lib/useDrillFlash';
import useUnexpectedExitGuard from '../../../../lib/useUnexpectedExitGuard';
import { drawTacticalTarget, createHitRing, drawHitRings, type HitRing } from '@/lib/canvasFx';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import DrillFlashOverlay from '../../../../components/drill/DrillFlashOverlay';
import FpsStartCard from '../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';
import { useTranslation } from '@/lib/i18n/useTranslation';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_HIT = 100;
const POINTS_PER_LEVEL = 1750; // 250 -> 1750 (7x)
const ELITE_SCORE = 18000; // 6000 -> 18000 (3x)
const TIME_PER_HIT = 0.6; // +0.6s per valid intercept
const TIME_PENALTY = 0.8; // -0.8s on miss / target escape (opt-in gated)
const STORAGE_KEY = 'skilldrills_reaction_simulator_v3';
const TARGET_FILL_COLOR = '#ef4444';

const RULES_ITEMS = [
  {
    num: "1",
    title: "Intercept Targets",
    detail: "+100 PTS (+0.6s)",
    badge: "×Combo Mult",
  },
  {
    num: "2",
    title: "Streak & Heat",
    detail: "Up to 3.0×",
    badge: "Faster Spawns",
  },
  {
    num: "3",
    title: "Level Progression",
    detail: "+1 Level / 1750 PTS",
    badge: "Adaptive Scaling",
  },
  {
    num: "4",
    title: "Miss & Escape",
    detail: "Penalty",
    badge: "Resets Combo (-0.8s)",
  },
];

const RELATED_DRILLS = [
  { id: "barrier-sequence-pursuit", name: "Jiggle Peek Trainer", cat: "Reaction Speed", desc: "Train angle holding and cover peeking reaction reflexes.", href: "/drills/reaction-speed/barrier-sequence-pursuit" },
  { id: "fps-tracking-trainer", name: "FPS Tracking Trainer", cat: "Reaction Speed", desc: "Condition tracking accuracy against dynamic moving targets.", href: "/drills/reaction-speed/fps-tracking-trainer" },
  { id: "market-doors-pursuit", name: "Corner Checking Trainer", cat: "Reaction Speed", desc: "Saccadic eye sweep & doorway clearing trainer.", href: "/drills/reaction-speed/market-doors-pursuit" },
  { id: "reaction-time-test", name: "Reaction Time Test", cat: "Reaction Speed", desc: "Measure pure visual reaction speed in milliseconds.", href: "/drills/reaction-speed/reaction-time-test" },
  { id: "reflex-training-drill", name: "Reflex Training Drill", cat: "Reaction Speed", desc: "High-speed reflex triggers & visual target hitting.", href: "/drills/reaction-speed/reflex-training-drill" },
  { id: "saccadic-gallery", name: "Saccadic Gallery", cat: "Reaction Speed", desc: "Rapid saccadic eye movement & target acquisition gallery.", href: "/drills/reaction-speed/saccadic-gallery" }
];

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
    return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0, ...JSON.parse(raw) };
  } catch (e) {
    return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
  }
};

const saveData = (data: { bestScore: number; bestCombo?: number; bestLevel: number; totalSessions: number }) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

// Continuous unbounded difficulty with streak heat
const getLevelConfig = (level: number, combo = 0) => {
  const p = getDifficultyProgress(level); // 0 at L1, 1 at L15, unbounded above
  const heat = (getComboMultiplier(combo) - 1) / 2;

  return {
    radius:        Math.max(6, ramp(28, 7, p) * (1 - heat * 0.25)),
    fallSpeed:     ramp(180, 850, p) * (1 + heat * 0.30),
    spawnDelayMin: ramp(600, 20, p) * (1 - heat * 0.30),
    spawnDelayMax: ramp(850, 35, p) * (1 - heat * 0.30),
    hitPad:        Math.max(4, ramp(14, 2, p) * (1 - heat * 0.50)),
  };
};

type Particle = { x: number; y: number; vx: number; vy: number; color: string; life: number };
type FallingTarget = { id: number; x: number; y: number; radius: number; vy: number; spawnTime: number };

interface ReactionSimulatorClientProps {
  copy?: {
    title?: string;
    subtitle?: string;
    caption?: string;
  };
}

export default function ReactionSimulatorClient({ copy }: ReactionSimulatorClientProps = {}) {
  const { t, locale } = useTranslation();
  const [gameState, setGameState] = useState<'start' | 'countdown' | 'playing' | 'gameOver'>('start');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [countdownValue, setCountdownValue] = useState<number | string>(3);

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState<number>(0);
  const [uiTimeLeft, setUiTimeLeft] = useState<number>(DRILL_DURATION);
  const [uiLevel, setUiLevel] = useState<number>(1);
  const [uiCombo, setUiCombo] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [bestCombo, setBestCombo] = useState<number>(0);
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
    maxCombo: 0,
    finalLevel: 1,
    grade: null as any
  });

  // DOM & Engine Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const countdownTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const bestLevelRunRef = useRef(1);
  const lastTimeRef = useRef(DRILL_DURATION);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);

  const engine = useRef({
    score: 0,
    level: 1,
    combo: 0,
    maxCombo: 0,
    successfulHits: 0,
    missedClicks: 0,
    timeouts: 0,
    reactionTimes: [] as number[],
    timeLeft: DRILL_DURATION,
    screenShake: 0,
    particles: [] as Particle[],
    hitRings: [] as HitRing[],
    targets: [] as FallingTarget[],
    nextSpawnTime: 0,
    nextId: 1,
  });

  const { flashes, triggerFlash } = useDrillFlash();

  // Mobile Detection & Device Orientation Tracking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      setPenaltyEnabled(drillPenalty.isEnabled());

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
      setBestCombo(saved.bestCombo || 0);
      setBestLevel(saved.bestLevel || 1);
      setTotalSessions(saved.totalSessions || 0);

      return () => {
        window.removeEventListener('resize', checkDeviceAndOrientation);
        window.removeEventListener('orientationchange', checkDeviceAndOrientation);
      };
    }
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

    setIsFullscreen(false);
    setGameState('start');
  }, []);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  // Direct Escape and Fullscreen Exit Handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        handleExitDrill();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [gameState, isFullscreen, handleExitDrill]);

  // Complete Drill Session cleanly
  const endGame = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

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
      maxCombo: e.maxCombo,
      finalLevel: Math.floor(bestLevelRunRef.current),
      grade: gradeObj
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNew = e.score > prevSaved.bestScore;
    setIsNewBest(isNew);

    const runBestLevel = Math.max(prevSaved.bestLevel, Math.floor(bestLevelRunRef.current));
    const updatedData = {
      bestScore: Math.max(prevSaved.bestScore, e.score),
      bestCombo: Math.max(prevSaved.bestCombo || 0, e.maxCombo),
      bestLevel: runBestLevel,
      totalSessions: (prevSaved.totalSessions || 0) + 1
    };
    saveData(updatedData);

    setBestScore(updatedData.bestScore);
    setBestCombo(updatedData.bestCombo);
    setBestLevel(updatedData.bestLevel);
    setTotalSessions(updatedData.totalSessions);

    drillAudio.playSessionEnd();
  }, []);

  // Target Spawn Logic (Falling vertically from top)
  const spawnFallingTarget = useCallback((W: number, H: number, level: number, combo: number) => {
    const e = engine.current;
    const config = getLevelConfig(level, combo);

    const baseR = isMobile ? config.radius + 2 : config.radius;
    const radius = Math.max(6, baseR);

    const margin = W * 0.10;
    const spawnX = margin + Math.random() * (W - margin * 2);
    const spawnY = -radius;

    const fallSpeed = config.fallSpeed * (0.85 + Math.random() * 0.3);

    e.targets.push({
      id: e.nextId++,
      x: spawnX,
      y: spawnY,
      radius,
      vy: fallSpeed,
      spawnTime: performance.now(),
    });
  }, [isMobile]);

  // Enter Drill (Full Screen -> 321GO Countdown with Sound -> Playing)
  const enterDrill = useCallback(async () => {
    setIsFullscreen(true);

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];

    drillAudio.init();

    const startLevel = getStartLevel();
    bestLevelRunRef.current = startLevel;

    setUiScore(0);
    setUiLevel(startLevel);
    setUiCombo(0);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    setIsNewBest(false);
    mousePosRef.current = null;

    engine.current = {
      score: 0,
      level: startLevel,
      combo: 0,
      maxCombo: 0,
      successfulHits: 0,
      missedClicks: 0,
      timeouts: 0,
      reactionTimes: [],
      timeLeft: DRILL_DURATION,
      screenShake: 0,
      particles: [],
      hitRings: [],
      targets: [],
      nextSpawnTime: 0,
      nextId: 1,
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
      engine.current.nextSpawnTime = performance.now() + 200;
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, []);

  // Target Click / Tap Handler
  const handleCanvasInteraction = useCallback((clientX: number, clientY: number) => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;

    const rect = cvs.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;

    const e = engine.current;
    const config = getLevelConfig(e.level, e.combo);
    let hitIndex = -1;

    // Check hit against falling targets (bottom-most target priority)
    for (let i = e.targets.length - 1; i >= 0; i--) {
      const t = e.targets[i];
      const dist = Math.hypot(clickX - t.x, clickY - t.y);
      const hitPad = isMobile ? config.hitPad + 10 : config.hitPad;

      if (dist <= t.radius + hitPad) {
        hitIndex = i;
        break;
      }
    }

    if (hitIndex !== -1) {
      const hitTarget = e.targets[hitIndex];
      const rt = Math.round(performance.now() - hitTarget.spawnTime);
      e.reactionTimes.push(rt);
      e.successfulHits += 1;
      e.combo += 1;
      if (e.combo > e.maxCombo) e.maxCombo = e.combo;

      const levelMult = 1 + getDifficultyProgress(e.level) * 0.5;
      e.score += Math.round(POINTS_PER_HIT * getComboMultiplier(e.combo) * levelMult);

      // Time bonus on clean hit
      e.timeLeft += TIME_PER_HIT;

      // Continuous unbounded level progression
      const rawLevel = (e.score / POINTS_PER_LEVEL) + 1;
      e.level = Math.max(e.level, rawLevel);
      bestLevelRunRef.current = Math.max(bestLevelRunRef.current, e.level);

      setUiScore(e.score);
      setUiLevel(Math.floor(e.level));
      setUiCombo(e.combo);
      drillAudio.playHit();

      // Particles explosion with combo color shift
      const hitColor = e.combo >= 10 ? '#34d399' : e.combo >= 5 ? '#f59e0b' : TARGET_FILL_COLOR;
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 2 + Math.random() * 5;
        e.particles.push({
          x: hitTarget.x,
          y: hitTarget.y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          color: hitColor,
          life: 1.0
        });
      }

      // Tactical Dual Hit Rings
      e.hitRings.push(createHitRing(hitTarget.x, hitTarget.y, hitTarget.radius, hitColor));

      e.targets.splice(hitIndex, 1);
      return;
    }

    // Missed click on empty space: optional time penalty + combo reset
    e.missedClicks += 1;
    if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
    e.combo = 0;
    setUiCombo(0);
    e.screenShake = 6;
    triggerFlash();
    drillAudio.playPenalty();
  }, [gameState, isMobile, triggerFlash]);

  // Canvas Physics & Render Loop (Falling Targets Interception Engine)
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
      if (isIdleFrameSkippable(gameState === 'playing', now, lastTime)) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const rect = container.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const e = engine.current;

      // Clock draining in RAF loop
      if (gameState === 'playing') {
        if (e.timeLeft > 0) e.timeLeft -= dt;
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setUiTimeLeft(0);
          endGame();
          return;
        }

        const ceilSec = Math.ceil(e.timeLeft);
        if (ceilSec !== lastTimeRef.current) {
          lastTimeRef.current = ceilSec;
          setUiTimeLeft(ceilSec);
        }
      }

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

      // Bottom Interception Boundary Line (Danger Zone)
      const dangerY = H * 0.88;
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(W * 0.05, dangerY);
      ctx.lineTo(W * 0.95, dangerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Spawn falling targets dynamically
      if (now >= e.nextSpawnTime) {
        spawnFallingTarget(W, H, e.level, e.combo);
        const config = getLevelConfig(e.level, e.combo);
        const delay = config.spawnDelayMin + Math.random() * (config.spawnDelayMax - config.spawnDelayMin);
        e.nextSpawnTime = now + delay;
      }

      // Update & Draw Falling Targets
      for (let i = e.targets.length - 1; i >= 0; i--) {
        const t = e.targets[i];
        t.y += t.vy * dt;

        // Target Escaped Bottom Boundary -> Timeout / Penalty
        if (t.y > H + t.radius) {
          e.targets.splice(i, 1);
          e.timeouts += 1;
          if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
          e.combo = 0;
          setUiCombo(0);
          e.screenShake = 6;
          triggerFlash();
          drillAudio.playPenalty();
          continue;
        }

        // Draw Tactical Target
        drawTacticalTarget(ctx, t.x, t.y, t.radius, TARGET_FILL_COLOR);
      }

      // Tactical Dual Hit Rings Update & Draw
      drawHitRings(ctx, e.hitRings, dt);

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

      // Tactical Pro White Crosshair
      if (mousePosRef.current) {
        const { x: mx, y: my } = mousePosRef.current;
        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 3;

        const gap = 4;
        const len = 14;

        // Top
        ctx.beginPath();
        ctx.moveTo(mx, my - gap);
        ctx.lineTo(mx, my - gap - len);
        ctx.stroke();

        // Bottom
        ctx.beginPath();
        ctx.moveTo(mx, my + gap);
        ctx.lineTo(mx, my + gap + len);
        ctx.stroke();

        // Left
        ctx.beginPath();
        ctx.moveTo(mx - gap, my);
        ctx.lineTo(mx - gap - len, my);
        ctx.stroke();

        // Right
        ctx.beginPath();
        ctx.moveTo(mx + gap, my);
        ctx.lineTo(mx + gap + len, my);
        ctx.stroke();

        // Center dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(mx, my, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();
      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      ro.disconnect();
    };
  }, [gameState, endGame, spawnFallingTarget, triggerFlash, isMobile]);

  // Share Score Card helper
  const sharePage = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/reaction-speed/reaction-game';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        accuracy: analytics.accuracy,
        speed: analytics.avgReactionTime,
        drillName: 'Reaction Game',
        rank: analytics.grade?.letter || 'A',
        rankName: analytics.grade?.label || 'ELITE REFLEX',
        playerName: getPlayerName(),
        level: analytics.finalLevel,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        url: 'skilldrills.online/drills/reaction-speed/reaction-game'
      });

      await shareScoreCard(canvas, {
        title: 'Reaction Game — My Score',
        text: `I scored ${uiScore} (Grade: ${analytics.grade?.letter || 'A'}, Lv. ${analytics.finalLevel}) on Reaction Game at SkillDrills!`,
        url
      });
    } catch (err) {
      if (navigator.share) {
        navigator.share({
          title: 'Reaction Game',
          text: `I scored ${uiScore} on Reaction Game! Can you beat my score?`,
          url
        }).catch(() => {});
      }
    }
  }, [uiScore, analytics]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      
      {/* Mobile Orientation Alert */}
      {isMobile && isPortrait && (
        <div className="w-full bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-center text-xs text-amber-300 flex items-center justify-center gap-2">
          <span>{t('reactionGame.rotateLandscape', 'Rotate to landscape mode for a wider reflex interception field.')}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        

        {/* Title — left-aligned and sitting directly on the drill box below it,
            so the page reads top-left to bottom-right like a document rather than
            a centred splash screen. */}
        {!isFullscreen && (
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              <span data-seo-kw="1">{copy?.title || t('reactionGame.title', 'Reaction Game')}</span>
            </h1>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              {copy?.caption || t('reactionGame.caption', 'A typical adult reacts to a visual cue in 200–250 ms (Kosinski, 2008). Intercepting a falling target adds tracking and aiming time on top of that, so scores here sit above a plain reaction time test.')}
            </p>
          </div>
        )}

        {/* Live Stat Cards — full width so the row's outer edges line up with the
            drill box beneath it. */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: t('reactionGame.score', 'Score'), value: uiScore, color: 'text-red-400' },
              { label: t('reactionGame.time', 'Time'), value: `${uiTimeLeft}s`, color: uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white' },
              { label: t('reactionGame.level', 'Level'), value: `L${uiLevel}`, color: 'text-indigo-400' },
              { label: t('reactionGame.bestScore', 'Best Score'), value: bestScore, color: 'text-amber-400' },
            ].map((card) => (
              <div key={card.label} className="border border-white/[0.06] bg-white/[0.015] px-2 py-2 rounded-xl text-center">
                <div className="text-[10px] font-bold tracking-wider uppercase text-slate-500">{card.label}</div>
                <div className={`text-base sm:text-lg font-black tabular-nums ${card.color || 'text-white'}`}>{card.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Game Stage Container */}
        <div 
          ref={containerRef} 
          className={
            isFullscreen ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] flex flex-col items-center justify-center' : 'w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] max-md:portrait:aspect-[3/4] max-md:portrait:min-h-[420px] max-md:portrait:max-h-[76vh] max-md:landscape:min-h-[340px] max-md:landscape:max-h-[85vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col'
          }
        >
          {/* Red Flash Overlay */}
          <DrillFlashOverlay flashes={flashes} />

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{t('reactionGame.score', 'Score')}</p>
                <p className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-tight">{uiScore}</p>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{t('reactionGame.timeLeft', 'Time Left')}</p>
                <p className={`text-2xl sm:text-3xl font-black tabular-nums leading-tight ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</p>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* CANVAS */}
          <canvas 
            ref={canvasRef} 
            onPointerDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
              handleCanvasInteraction(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
            }}
            onPointerLeave={() => {
              mousePosRef.current = null;
            }}
            className={`block absolute top-0 left-0 w-full h-full z-10 touch-none ${gameState === 'playing' ? 'cursor-none' : 'cursor-crosshair'}`} 
          />

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Target}
              accent="red"
              title={copy?.title || t('reactionGame.title', 'Reaction Game')}
              subtitle={copy?.subtitle || t('reactionGame.subtitle', 'Reflex Interception • Vertical Tracking')}
              isTouchOnlyDevice={false}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle={t('reactionGame.getReady', 'GET READY')} />
          )}

          {/* UNIVERSAL RESULT CARD */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="rose"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { label: t('reactionGame.accuracy', 'Accuracy'), value: analytics.accuracy, suffix: '%' },
                { label: t('reactionGame.avgReaction', 'Avg Reaction'), value: analytics.avgReactionTime, suffix: 'ms' },
                { label: t('reactionGame.peakLevel', 'Peak Level'), value: `Lv. ${analytics.finalLevel}` },
                { label: t('reactionGame.maxCombo', 'Max Combo'), value: analytics.maxCombo, suffix: 'x' },
              ]}
              onPlayAgain={enterDrill}
              onShare={sharePage}
              onExit={handleExitDrill}
            />
          )}

        </div>

        {/* ACCORDIONS */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
            <DrillAccordion
              id="rules"
              title={t('reactionGame.rulesTitle', 'Drill Instructions & Scoring System')}
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
                {RULES_ITEMS.map((item) => (
                  <RuleItem
                    key={item.num}
                    num={item.num}
                    title={item.title}
                    detail={item.detail}
                    badge={item.badge}
                  />
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title={t('reactionGame.aboutTitle', 'About Reaction Game')}
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8 font-sans">
                <section>
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-red-400" /> {t('reactionGame.aboutHeading', 'What Is Reflex Interception & Vertical Tracking Training?')}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3 text-gray-300">
                    {t('reactionGame.aboutP1', 'Reaction Game isolates and conditions vertical visual tracking, fast-twitch motor responses, and rapid spatial interception. In tactical shooters like Apex Legends, Overwatch 2, and Fortnite, targets frequently drop from high ledges or vertical ziplines.')}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {t('reactionGame.aboutP2', 'Intercepting accelerating downward targets requires precise foveal pursuit and timing. Training vertical tracking reduces motor reaction delay and improves hand-eye synchronization.')}
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.012]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">{t('reactionGame.card1Title', 'Who Should Use This?')}</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{t('reactionGame.card1Desc', 'Gamers, esports athletes, and traditional sports competitors looking to sharpen vertical reflex speed and hand-eye reaction timing.')}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.012]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">{t('reactionGame.card2Title', 'Vertical Tracking Control')}</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{t('reactionGame.card2Desc', 'Trains your eyes and mouse hand to follow accelerating downward trajectories smoothly without panic snapping or over-aiming.')}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.012]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">{t('reactionGame.card3Title', 'Fast-Twitch Interception')}</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{t('reactionGame.card3Desc', 'Conditioning fast-twitch motor responses allows you to click targets higher up the screen, maximizing score efficiency.')}</p>
                  </div>
                </div>
              </div>
            </DrillAccordion>

            {/* The FAQ is rendered by DrillGuide below, mapped from
                faqSchema.mainEntity so the page's FAQPage JSON-LD and the visible
                questions cannot drift. */}
          </div>
        )}

        {/* RELATED DRILLS GRID */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              {t('reactionGame.relatedTitle', 'Related Reaction Speed Drills')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {RELATED_DRILLS.map((drill) => (
                <Link
                  key={drill.id}
                  href={locale && locale !== 'en' ? `/${locale}${drill.href}` : drill.href}
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

      </main>
    </div>
  );
}

// === Subcomponents ===
function RuleItem({ num, title, detail, badge }: { num: string; title: string; detail: string; badge: string }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-black px-4 py-3 rounded-xl border border-white/10 shadow-sm font-sans">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-black shrink-0">
          {num}
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-bold text-white truncate">{title}</span>
          <span className="text-xs text-white/50 truncate hidden sm:inline">{detail}</span>
        </div>
      </div>
      <div className="text-xs font-black px-2.5 py-1 rounded-md bg-[#050811] border border-white/10 text-white shrink-0">
        {badge}
      </div>
    </div>
  );
}