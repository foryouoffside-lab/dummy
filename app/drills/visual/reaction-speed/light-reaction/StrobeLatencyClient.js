'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Volume2, VolumeX,
  Play, RefreshCw, Target,
  Share2, ArrowLeft, RotateCw, Eye, Users, TrendingUp, Zap, Brain, Sun, Trophy
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import { MAX_LEVEL } from '../../../../../lib/drillDifficulty';
import { drawTacticalTarget, getCanvasDpr } from '../../../../../lib/canvasFx';
import useDrillFlash from '../../../../../lib/useDrillFlash';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import DrillFlashOverlay from '../../../../../components/drill/DrillFlashOverlay';
import DrillRuleItem from '../../../../../components/drill/DrillRuleItem';
import DrillFAQItem from '../../../../../components/drill/DrillFAQItem';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';

const DRILL_DURATION = 45; // 45 seconds duration
const POINTS_PER_HIT = 150;
const POINTS_PER_LEVEL = 750; // 5 hits per level, matching the old cadence
const ELITE_SCORE = 1000; // Target score for S+ rating (rebalanced after combo removal)
const STORAGE_KEY = 'skilldrills_visual_light_reaction_v4';

const RELATED_DRILLS = [
  { id: "go-no-go", name: "Go / No-Go", cat: "Reaction Speed", desc: "Response inhibition & selective reaction speed.", href: "/drills/visual/reaction-speed/go/no-go" },
  { id: "moving-target", name: "Moving Target", cat: "Visual Tracking", desc: "Kinetic visual tracking and target intercept.", href: "/drills/visual/tracking-accuracy/moving-target" },
  { id: "visual-search", name: "Visual Search", cat: "Visual Recognition", desc: "Conjunctive visual search speed & pattern recognition.", href: "/drills/visual/visual-recognition/visual-search" },
  { id: "multiple-targets", name: "Multiple Targets", cat: "Visual Tracking", desc: "Track multiple moving targets across dynamic paths.", href: "/drills/visual/tracking-accuracy/multiple-targets" },
  { id: "distance-judgment", name: "Distance Judgment Pro", cat: "Depth Perception", desc: "3D stereoscopic depth estimation & intercept timing.", href: "/drills/visual/depth-perception/distance-judgment" },
  { id: "entropic-grid", name: "Entropic Grid", cat: "Visual Recognition", desc: "Visual search speed & pattern recognition grid.", href: "/drills/visual/visual-recognition/entropic-grid" }
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

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

// Premium 2D Tactical Target Renderer (100px diameter / 50px radius)
function draw2dLightTarget(ctx, x, y, targetState, lastLatencyMs, isSpamming) {
  ctx.save();

  const radius = 50;

  // Base color palette definitions based on target state
  let primaryColor = '#1e293b';
  let centerHighlight = '#475569';
  let edgeDark = '#0f172a';
  let glowColor = 'rgba(255, 255, 255, 0.08)';

  if (isSpamming) {
    primaryColor = '#64748b';
    centerHighlight = '#94a3b8';
    edgeDark = '#334155';
    glowColor = 'rgba(100, 116, 139, 0.2)';
  } else if (targetState === 'flashing') {
    primaryColor = '#fbbf24'; // Vibrant Amber
    centerHighlight = '#fef08a';
    edgeDark = '#d97706';
    glowColor = 'rgba(251, 191, 36, 0.8)';
  } else if (targetState === 'hit') {
    primaryColor = '#10b981'; // Emerald Green
    centerHighlight = '#a7f3d0';
    edgeDark = '#047857';
    glowColor = 'rgba(16, 185, 129, 0.8)';
  } else if (targetState === 'miss') {
    primaryColor = '#ef4444'; // Crimson Red
    centerHighlight = '#fecaca';
    edgeDark = '#b91c1c';
    glowColor = 'rgba(239, 68, 68, 0.8)';
  }

  // 1. Outer Ambient Radial Glow Aura
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = targetState === 'flashing' ? 38 : (targetState === 'hit' || targetState === 'miss' ? 28 : 16);

  // 2. Outer Tactical Bezel Ring
  ctx.beginPath();
  ctx.arc(x, y, radius + 10, 0, Math.PI * 2);
  ctx.strokeStyle = isSpamming ? 'rgba(239, 68, 68, 0.35)' : (targetState === 'flashing' ? 'rgba(251, 191, 36, 0.45)' : 'rgba(255, 255, 255, 0.15)');
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 3. Main Target Sphere (3D Radial Gradient)
  const sphereGrad = ctx.createRadialGradient(
    x - radius * 0.25,
    y - radius * 0.25,
    radius * 0.08,
    x,
    y,
    radius
  );
  sphereGrad.addColorStop(0, centerHighlight);
  sphereGrad.addColorStop(0.55, primaryColor);
  sphereGrad.addColorStop(1, edgeDark);

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = sphereGrad;
  ctx.fill();

  // Reset shadow for crisp inner detailing
  ctx.shadowBlur = 0;

  // 4. Premium Inner Rim Highlight
  ctx.beginPath();
  ctx.arc(x, y, radius - 1.5, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 5. Tactical Crosshair Reticle Tick Marks (N, S, E, W)
  const tickLen = 8;
  const tickGap = radius + 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  // North
  ctx.moveTo(x, y - tickGap); ctx.lineTo(x, y - tickGap - tickLen);
  // South
  ctx.moveTo(x, y + tickGap); ctx.lineTo(x, y + tickGap + tickLen);
  // West
  ctx.moveTo(x - tickGap, y); ctx.lineTo(x - tickGap - tickLen, y);
  // East
  ctx.moveTo(x + tickGap, y); ctx.lineTo(x + tickGap + tickLen, y);
  ctx.stroke();

  // 6. High-Precision Center Core Dot (White Core with Specular Glow)
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fill();

  // Inner Pinpoint Specular Dot
  ctx.fillStyle = '#ffffff';
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.arc(x - 1.5, y - 1.5, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}


export default function StrobeLatencyClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const { flashes, triggerFlash } = useDrillFlash();

  useEffect(() => {
    const checkViewport = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsMobile(w < 768);
      setIsPortrait(h > w);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Strobe Target State
  const [level, setLevel] = useState(1);
  const [targetState, setTargetState] = useState('idle'); // 'idle' | 'waiting' | 'flashing' | 'hit' | 'miss'
  const [lastLatencyMs, setLastLatencyMs] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpamming, setIsSpamming] = useState(false);

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    perfectHits: 0,
    missedClicks: 0,
    finalLevel: 1,
    grade: null,
  });

  // DOM & Engine Refs
  const containerRef = useRef(null);
  const targetCanvasRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  const gameTimeoutsRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const flashDelayTimeoutRef = useRef(null);
  const flashWindowTimeoutRef = useRef(null);
  const spamCooldownTimerRef = useRef(null);
  const startingRef = useRef(false);
  const gameActiveRef = useRef(false);

  const flashStartTimeRef = useRef(0);
  const isFlashingRef = useRef(false);
  const lastClickTimeRef = useRef(0);
  const isSpammingRef = useRef(false);

  const engine = useRef({
    score: 0,
    level: 1,
    timeLeft: DRILL_DURATION,
    perfectHits: 0,
    missedClicks: 0,
  });

  // Precision 2D target renderer (fixed 100px diameter, 50px radius)
  const drawTarget = useCallback(() => {
    const cvs = targetCanvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const dpr = getCanvasDpr();
    const w = cvs.clientWidth;
    const h = cvs.clientHeight;
    if (cvs.width !== Math.round(w * dpr) || cvs.height !== Math.round(h * dpr)) {
      cvs.width = Math.round(w * dpr);
      cvs.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;

    draw2dLightTarget(ctx, cx, cy, targetState, lastLatencyMs, isSpamming);
  }, [targetState, lastLatencyMs, isSpamming]);

  useEffect(() => {
    drawTarget();
  }, [drawTarget]);

  useEffect(() => {
    const onResize = () => drawTarget();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [drawTarget]);

  // Storage loading & sound init
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestLevel(saved.bestLevel || 1);
    }
  }, []);

  useEffect(() => {
    drillAudio?.setEnabled?.(soundEnabled);
  }, [soundEnabled]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const clearGameTimeouts = useCallback(() => {
    gameTimeoutsRef.current.forEach(clearTimeout);
    gameTimeoutsRef.current = [];
    if (flashDelayTimeoutRef.current) clearTimeout(flashDelayTimeoutRef.current);
    if (flashWindowTimeoutRef.current) clearTimeout(flashWindowTimeoutRef.current);
    if (spamCooldownTimerRef.current) clearTimeout(spamCooldownTimerRef.current);
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    clearGameTimeouts();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    startingRef.current = false;
    gameActiveRef.current = false;

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    setGameState('start');
    // markIntentionalExit is a stable ref-backed callback (empty deps in
    // useUnexpectedExitGuard) declared below — omitted here to avoid a
    // temporal-dead-zone reference in this dependency array.
  }, [clearGameTimeouts]);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  // End Game Management
  const endGame = useCallback(() => {
    markIntentionalExit();
    gameActiveRef.current = false;
    startingRef.current = false;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    clearGameTimeouts();
    setGameState('gameOver');

    const e = engine.current;
    const totalTries = e.perfectHits + e.missedClicks;
    const finalAccuracy = totalTries > 0 ? Math.round((e.perfectHits / totalTries) * 100) : 100;

    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = {
      letter: rating.grade || rating.letter || 'C',
      label: rating.label || 'Keep Going',
      color: rating.color || 'text-amber-400',
    };

    setAnalytics({
      accuracy: finalAccuracy,
      perfectHits: e.perfectHits,
      missedClicks: e.missedClicks,
      finalLevel: e.level,
      grade,
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const updatedData = {
      bestScore: Math.max(prevSaved.bestScore, e.score),
      bestLevel: Math.max(prevSaved.bestLevel, e.level),
      totalSessions: (prevSaved.totalSessions || 0) + 1,
    };
    saveData(updatedData);

    setBestScore(updatedData.bestScore);
    setBestLevel(updatedData.bestLevel);

    drillAudio?.playSessionEnd?.();
  }, [clearGameTimeouts, markIntentionalExit]);

  // Trigger Next Strobe Flash Cycle
  const triggerNextStrobeCycle = useCallback(() => {
    if (!gameActiveRef.current || isSpammingRef.current) return;

    setTargetState('waiting');
    isFlashingRef.current = false;

    // Random inter-flash delay interval (1000ms to 2500ms)
    const randomDelay = Math.floor(1000 + Math.random() * 1500);

    flashDelayTimeoutRef.current = setTimeout(() => {
      if (!gameActiveRef.current || isSpammingRef.current) return;

      isFlashingRef.current = true;
      flashStartTimeRef.current = performance.now();
      setTargetState('flashing');

      // Strobe flash duration window (shrinks from 300ms down to 100ms as level advances)
      const flashWindow = Math.max(100, 300 - engine.current.level * 15);

      flashWindowTimeoutRef.current = setTimeout(() => {
        if (!gameActiveRef.current || isSpammingRef.current) return;
        if (isFlashingRef.current) {
          // Missed flash window: NO negative score or time deduction!
          isFlashingRef.current = false;
          const e = engine.current;
          e.missedClicks++;
          setTargetState('miss');

          drillAudio?.playPenalty?.();
          triggerFlash();

          setTimeout(() => {
            if (!gameActiveRef.current) return;
            triggerNextStrobeCycle();
          }, 350);
        }
      }, flashWindow);

    }, randomDelay);
  }, [triggerFlash]);

  // Handle User Click / Tap on Viewport
  const handleViewportClick = useCallback((evt) => {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    if (!gameActiveRef.current) return;

    const now = performance.now();
    const timeSinceLastClick = now - lastClickTimeRef.current;
    lastClickTimeRef.current = now;

    // Detect rapid continuous clicking or clicking during idle/waiting gap
    const isRapidClick = timeSinceLastClick > 0 && timeSinceLastClick < 320;
    const isClickingIdleGap = !isFlashingRef.current;

    if (isRapidClick || isClickingIdleGap || isSpammingRef.current) {
      // Continuous / spam clicking detected — suppress light flash
      isSpammingRef.current = true;
      setIsSpamming(true);
      setTargetState('idle');
      isFlashingRef.current = false;

      if (flashDelayTimeoutRef.current) clearTimeout(flashDelayTimeoutRef.current);
      if (flashWindowTimeoutRef.current) clearTimeout(flashWindowTimeoutRef.current);

      drillAudio?.playPenalty?.();
      triggerFlash();

      // Light strobe will ONLY resume after 1.2 seconds of zero clicking
      if (spamCooldownTimerRef.current) clearTimeout(spamCooldownTimerRef.current);
      spamCooldownTimerRef.current = setTimeout(() => {
        if (!gameActiveRef.current) return;
        isSpammingRef.current = false;
        setIsSpamming(false);
        triggerNextStrobeCycle();
      }, 1200);

      return;
    }

    const e = engine.current;

    if (isFlashingRef.current) {
      // PERFECT STROBE FLASH HIT!
      isFlashingRef.current = false;
      if (flashWindowTimeoutRef.current) clearTimeout(flashWindowTimeoutRef.current);

      const reactionTime = Math.round(performance.now() - flashStartTimeRef.current);
      setLastLatencyMs(reactionTime);

      e.perfectHits++;
      e.score += POINTS_PER_HIT;

      // Level up every POINTS_PER_LEVEL score earned (score-based, monotonic —
      // never gated on a streak, so a miss can never take a level away)
      const nextLevel = Math.floor(e.score / POINTS_PER_LEVEL) + 1;
      if (nextLevel > e.level) {
        e.level = nextLevel;
        setLevel(e.level);
      }

      setUiScore(e.score);
      setTargetState('waiting');
      drillAudio?.playHit?.();
      triggerNextStrobeCycle();
    }
  }, [triggerNextStrobeCycle, triggerFlash]);

  // Enter Drill (Start Countdown -> Playing)
  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    clearGameTimeouts();

    isSpammingRef.current = false;
    setIsSpamming(false);
    lastClickTimeRef.current = 0;
    if (spamCooldownTimerRef.current) clearTimeout(spamCooldownTimerRef.current);

    drillAudio?.init?.();

    setIsNewBest(false);
    setUiScore(0);
    setUiTimeLeft(DRILL_DURATION);
    setLevel(1);
    setTargetState('idle');
    setLastLatencyMs(0);

    engine.current = {
      score: 0,
      level: 1,
      timeLeft: DRILL_DURATION,
      perfectHits: 0,
      missedClicks: 0,
    };

    // Auto Fullscreen on Start
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (e) {}

    // Countdown sequence: 3 -> 2 -> 1 -> GO
    setGameState('countdown');
    setCountdownValue(3);
    drillAudio?.playCountdownTick?.();

    const t1 = setTimeout(() => {
      setCountdownValue(2);
      drillAudio?.playCountdownTick?.();
    }, 700);

    const t2 = setTimeout(() => {
      setCountdownValue(1);
      drillAudio?.playCountdownTick?.();
    }, 1400);

    const t3 = setTimeout(() => {
      setCountdownValue('GO');
      drillAudio?.playGo?.();
    }, 2100);

    const t4 = setTimeout(() => {
      gameActiveRef.current = true;
      startingRef.current = false;
      setGameState('playing');

      // Start 45s decimal timer
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      let lastTime = performance.now();

      timerIntervalRef.current = setInterval(() => {
        const now = performance.now();
        const deltaSec = (now - lastTime) / 1000;
        lastTime = now;

        const eRef = engine.current;
        if (eRef.timeLeft > 0) {
          eRef.timeLeft = Math.max(0, eRef.timeLeft - deltaSec);
          setUiTimeLeft(Math.ceil(eRef.timeLeft));
        }

        if (eRef.timeLeft <= 0) {
          eRef.timeLeft = 0;
          setUiTimeLeft(0);
          endGame();
        }
      }, 100);

      triggerNextStrobeCycle();
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [clearGameTimeouts, endGame, triggerNextStrobeCycle]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/visual/reaction-speed/light-reaction';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '⚡' },
        newBest: isNewBest,
        drillName: 'Light Reaction Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Peak Level: Lvl ${analytics.finalLevel}) on Light Reaction Pro! Accuracy: ${analytics.accuracy}%. Train visual reflexes at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Reflex Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
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
              <Link href="/drills/visual" className="hover:text-white transition-colors">Visual</Link>
              <span>/</span>
              <span className="text-amber-400 font-medium">Light Reaction Pro</span>
            </div>

            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                drillAudio.setEnabled(next);
              }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={soundEnabled ? "Mute Sound" : "Unmute Sound"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-red-400" />}
            </button>
          </div>
        </header>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-amber-400 bg-clip-text text-transparent">
              LIGHT REACTION PRO
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Visual Strobe Latency & Millisecond Reflex Speed
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums">{uiScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {uiTimeLeft}s
              </div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Level</div>
              <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">L{level}</div>
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

          {/* IN-BOX OVERLAY HUD */}
          {gameState === 'playing' && (
            <>
              {/* TOP-LEFT: SCORE & LATENCY */}
              <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col gap-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                  <p className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-tight">{uiScore}</p>
                </div>
                {lastLatencyMs > 0 && (
                  <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 w-fit">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/60">Latency</span>
                    <span className="text-xs font-black text-emerald-400">{lastLatencyMs}ms</span>
                  </div>
                )}
              </div>

              {/* TOP-RIGHT: TIME LEFT */}
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time Left</p>
                <p className={`text-2xl sm:text-3xl font-black tabular-nums leading-tight ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</p>
              </div>
            </>
          )}

          {/* IN-GAME HUD SOUND TOGGLE */}
          {gameState === 'playing' && (
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setSoundEnabled((v) => {
                  drillAudio.setEnabled(!v);
                  return !v;
                });
              }}
              className="absolute bottom-4 right-4 z-40 p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          )}

          {/* GAMEPLAY AREA */}
          {gameState === 'playing' && (
            <div
              onPointerDown={handleViewportClick}
              className="flex-1 flex flex-col items-center justify-center w-full h-full relative z-20 overflow-hidden cursor-pointer"
            >
              <canvas
                ref={targetCanvasRef}
                className="w-full h-full"
              />
            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Zap}
              accent="amber"
              title="Light Reaction Pro"
              subtitle="Visual Strobe Latency • Reflex Speed"
              rules={[
                { icon: Target, accent: 'amber', title: 'Strobe Flash Stimulus', text: 'Tap instantly when target circle flashes (+150 PTS)' },
                { icon: Zap, accent: 'orange', title: 'Millisecond Reflex Latency', text: 'Benchmark pure visual motor reaction speed across random intervals' },
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
            <DrillCountdown value={countdownValue} subtitle="GET READY" accent="#f59e0b" />
          )}

          {/* END SCREEN */}
          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              {/* Left Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(245,158,11,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade?.color || 'text-amber-400'}`}>
                  {analytics.grade?.grade || analytics.grade?.letter || 'C'}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1">
                  {analytics.grade?.label || 'Good Effort'}
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
                    <p className="text-sm sm:text-base font-black text-white">Lvl {analytics.finalLevel}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Level</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.perfectHits}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Perfects</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Play Again
                  </button>
                  <button 
                    onClick={shareScore} 
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
                    <ArrowLeft className="w-4 h-4 text-red-400" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DrillRuleItem num="1" text="White Strobe Flash" highlight="+150 PTS" result="Tap Instantly" />
                <DrillRuleItem num="2" text="Progressive Difficulty" highlight="300ms → 100ms Floor" result="Flash window shrinks per level" />
                <DrillRuleItem num="3" text="Anti-Spam Detection" highlight="1.2s Cooldown" result="Rapid/early taps pause the strobe" />
                <DrillRuleItem num="4" text="False Start / Missed Flash" highlight="Zero Penalties" result="No score or time loss" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Light Reaction Pro"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-amber-400" /> What Is Light Reaction Training?
                  </h4>
                  <p className="text-sm leading-relaxed mb-3">
                    <strong>Light Reaction Training</strong> measures visual motor latency and raw reflex response speed. The <strong>Light Reaction drill</strong> presents a central target that flashes white at unpredictable millisecond intervals, challenging you to react instantly upon visual stimulus onset.
                  </p>
                  <p className="text-sm leading-relaxed">
                    By training with randomized strobe intervals, you reduce visual reaction latency and build millisecond-level reflex precision for athletics and competitive esports.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">FPS gamers, sprinters, martial artists, and drivers building lightning-fast visual motor reaction speed.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Visual reaction speed, motor latency, reflex speed, millisecond stimulus detection, and visual focus readiness.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Reflex Readiness</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Maintain relaxed visual focus on the center reticle to respond immediately without anticipating or false-starting.</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DrillFAQItem q="What is the Light Reaction Pro Drill?" a="A free visual reflex speed test. Tap the target as fast as possible when it flashes bright white." />
                <DrillFAQItem q="What is a good visual reaction time?" a="Average human visual reaction time is ~250ms, while elite gamers and reflex athletes consistently achieve sub-180ms reaction latencies." />
                <DrillFAQItem q="How does progressive difficulty work?" a="Every 5 successful hits you level up, and the flash window shrinks from 300ms down to a 100ms floor. The inter-flash delay stays randomized between 1000ms and 2500ms so the strobe timing can't be anticipated." />
                <DrillFAQItem q="Are there negative score or time penalties?" a="No. Premature taps or missed flashes never deduct score points or reduce remaining timer seconds — you simply wait for the next flash." />
                <DrillFAQItem q="Does difficulty decrease on mistakes?" a="No. Your level only ever goes up — a mistake never takes you back down, so you can safely push your current level to its limit." />
                <DrillFAQItem q="Why did my tap not register?" a="Tapping before the flash appears, or tapping faster than roughly 3 times per second, is treated as spam clicking rather than a genuine reaction — the strobe pauses for 1.2 seconds of stillness before resuming, so guessing can't substitute for a real reaction." />
                <DrillFAQItem q="How long does each drill session last?" a="Each round is timed for exactly 45 seconds of continuous focus." />
                <DrillFAQItem q="Do I need to sign up?" a="No registration required. This drill is completely free and works instantly in your browser." />
              </div>
            </DrillAccordion>
          </div>
        )}

        {/* RELATED DRILLS GRID */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              Related Visual Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {RELATED_DRILLS.map((drill) => (
                <Link
                  key={drill.id}
                  href={drill.href}
                  className="group bg-[#0c0c16] border border-white/5 hover:border-amber-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-amber-400 mt-3 flex items-center gap-1 transition-colors">
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
