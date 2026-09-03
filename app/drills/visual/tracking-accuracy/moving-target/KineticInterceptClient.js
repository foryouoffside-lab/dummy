'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { Volume2, VolumeX, Target, Eye, Users, TrendingUp, Zap, ZapOff, Brain, Move, Trophy } from 'lucide-react';

import { isIdleFrameSkippable } from '@/lib/performance';
import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { drillFlash } from '../../../../../lib/drillFlash';
import { drillTimeout } from '../../../../../lib/drillTimeout';
import { drillPenalty } from '../../../../../lib/drillPenalty';
import { getFpsScoreGrade, getComboMultiplier } from '../../../../../lib/scoringEngine';
import { getDifficultyProgress, getStartLevel, ramp } from '../../../../../lib/drillDifficulty';
import { drawTacticalTarget } from '../../../../../lib/canvasFx';
import useDrillFlash from '../../../../../lib/useDrillFlash';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import DrillFlashOverlay from '../../../../../components/drill/DrillFlashOverlay';
import DrillRuleItem from '../../../../../components/drill/DrillRuleItem';
import DrillFAQItem from '../../../../../components/drill/DrillFAQItem';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../../components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_HIT = 150;
const POINTS_PER_LEVEL = 5250; // 750 -> 5250 (7x)
const ELITE_SCORE = 16000; // 1000 -> 16000 (scaled for unbounded continuous runs)
const TIME_PER_HIT = 0.6; // +0.6s per valid hit
const TIME_PENALTY = 0.8; // -0.8s on miss / relocation timeout (opt-in gated)
const STORAGE_KEY = 'skilldrills_visual_moving_target_v5';

const RELATED_DRILLS = [
  { id: "multiple-targets", name: "Multiple Targets", cat: "Visual Tracking", desc: "Track multiple moving targets across dynamic paths.", href: "/drills/visual/tracking-accuracy/multiple-targets" },
  { id: "pursuit-tracker", name: "Pursuit Tracker", cat: "Visual Tracking", desc: "Smooth pursuit tracking accuracy and velocity alignment.", href: "/drills/visual/tracking-accuracy/pursuit-tracker" },
  { id: "light-reaction", name: "Light Reaction", cat: "Reaction Speed", desc: "Test raw visual motor reaction speed.", href: "/drills/visual/reaction-speed/light-reaction" },
  { id: "go-no-go", name: "Go / No-Go", cat: "Reaction Speed", desc: "Response inhibition & selective reaction speed.", href: "/drills/visual/reaction-speed/go/no-go" },
  { id: "distance-judgment", name: "Distance Judgment Pro", cat: "Depth Perception", desc: "3D stereoscopic depth estimation & intercept timing.", href: "/drills/visual/depth-perception/distance-judgment" },
  { id: "entropic-grid", name: "Entropic Grid", cat: "Visual Recognition", desc: "Visual search speed & pattern recognition grid.", href: "/drills/visual/visual-recognition/entropic-grid" }
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

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

// Continuous unbounded difficulty with streak heat
const getLevelConfig = (level, combo = 0) => {
  const p = getDifficultyProgress(level);
  const heat = (getComboMultiplier(combo) - 1) / 2;
  return {
    radius: Math.max(8, ramp(26, 8, p) * (1 - heat * 0.25)),
    speed: ramp(120, 750, p) * (1 + heat * 0.40),
    moveInterval: Math.max(0.12, ramp(1.0, 0.20, p) * (1 - heat * 0.30)),
    hitTolerance: Math.max(12, ramp(32, 12, p) * (1 - heat * 0.35)),
  };
};

export default function KineticInterceptClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const { flashes, triggerFlash } = useDrillFlash();

  // Target State
  const [uiLevel, setUiLevel] = useState(1);
  const [uiCombo, setUiCombo] = useState(0);
  const [currentInterval, setCurrentInterval] = useState(1.0);

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    perfectHits: 0,
    missedClicks: 0,
    finalLevel: 1,
    maxCombo: 0,
    finalPace: '1.00',
    grade: null,
  });

  // DOM & Canvas Engine Refs
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const countdownTimeoutsRef = useRef([]);
  const gameTimeoutsRef = useRef([]);
  const startingRef = useRef(false);
  const gameActiveRef = useRef(false);
  const bestLevelRunRef = useRef(1);
  const lastTimeRef = useRef(DRILL_DURATION);

  const targetRef = useRef({ x: 150, y: 150, vx: 2, vy: 1.5, radius: 22, active: false, moveInterval: 1.0, lastRelocateTime: 0 });

  const engine = useRef({
    score: 0,
    level: 1,
    combo: 0,
    maxCombo: 0,
    timeLeft: DRILL_DURATION,
    perfectHits: 0,
    missedClicks: 0,
  });

  // Storage loading & sound init
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      setPenaltyEnabled(drillPenalty.isEnabled());
      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestCombo(saved.bestCombo || 0);
      setBestLevel(saved.bestLevel || 1);
      setTotalSessions(saved.totalSessions || 0);
    }
  }, []);

  const clearGameTimeouts = useCallback(() => {
    gameTimeoutsRef.current.forEach(clearTimeout);
    gameTimeoutsRef.current = [];
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    clearGameTimeouts();
    startingRef.current = false;
    gameActiveRef.current = false;

    setIsFullscreen(false);
    setGameState('start');
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
    clearGameTimeouts();
    setGameState('gameOver');

    const e = engine.current;
    const totalTries = e.perfectHits + e.missedClicks;
    const finalAccuracy = totalTries > 0 ? Math.round((e.perfectHits / totalTries) * 100) : 100;

    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = {
      letter: rating.letter || rating.grade || 'C',
      label: rating.label || 'Keep Going',
      color: rating.color || 'text-orange-400',
    };

    setAnalytics({
      accuracy: finalAccuracy,
      perfectHits: e.perfectHits,
      missedClicks: e.missedClicks,
      finalLevel: Math.floor(bestLevelRunRef.current),
      maxCombo: e.maxCombo,
      finalPace: (targetRef.current?.moveInterval || 1.0).toFixed(2),
      grade,
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const runBestLevel = Math.max(prevSaved.bestLevel, Math.floor(bestLevelRunRef.current));
    const updatedData = {
      bestScore: Math.max(prevSaved.bestScore, e.score),
      bestCombo: Math.max(prevSaved.bestCombo || 0, e.maxCombo),
      bestLevel: runBestLevel,
      totalSessions: (prevSaved.totalSessions || 0) + 1,
    };
    saveData(updatedData);

    setBestScore(updatedData.bestScore);
    setBestCombo(updatedData.bestCombo);
    setBestLevel(updatedData.bestLevel);
    setTotalSessions(updatedData.totalSessions);

    drillAudio?.playSessionEnd?.();
  }, [clearGameTimeouts, markIntentionalExit]);

  // Spawn Next Kinetic Target
  const spawnTarget = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;

    const w = cvs.width || 300;
    const h = cvs.height || 300;

    const eng = engine.current;
    const config = getLevelConfig(eng.level, eng.combo);

    const radius = config.radius;
    const speed = config.speed / 60; // px per frame
    const angle = Math.random() * Math.PI * 2;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    const moveInterval = config.moveInterval;
    setCurrentInterval(moveInterval);

    // Spawn inside margin
    const x = radius + Math.random() * (w - radius * 2);
    const y = radius + Math.random() * (h - radius * 2);

    targetRef.current = {
      x,
      y,
      vx,
      vy,
      radius,
      active: true,
      moveInterval,
      lastRelocateTime: performance.now(),
    };
  }, []);

  // Pointer Down on Canvas
  const handlePointerDown = useCallback((e) => {
    if (!gameActiveRef.current) return;
    const cvs = canvasRef.current;
    if (!cvs) return;

    const r = cvs.getBoundingClientRect();
    if (!r.width || !r.height) return;

    const scaleX = cvs.width / r.width;
    const scaleY = cvs.height / r.height;

    const cx = (e.clientX - r.left) * scaleX;
    const cy = (e.clientY - r.top) * scaleY;

    const t = targetRef.current;
    if (!t.active) return;

    const eng = engine.current;
    const config = getLevelConfig(eng.level, eng.combo);

    const dist = Math.hypot(cx - t.x, cy - t.y);
    const hitTolerance = Math.max(t.radius + config.hitTolerance, 20);

    if (dist <= hitTolerance) {
      // PERFECT KINETIC TARGET INTERCEPT
      eng.perfectHits++;
      eng.combo += 1;
      if (eng.combo > eng.maxCombo) eng.maxCombo = eng.combo;

      const levelMult = 1 + getDifficultyProgress(eng.level) * 0.5;
      eng.score += Math.round(POINTS_PER_HIT * getComboMultiplier(eng.combo) * levelMult);

      // Time bonus on clean hit
      eng.timeLeft += TIME_PER_HIT;

      // Continuous level progression
      const nextLevel = (eng.score / POINTS_PER_LEVEL) + 1;
      eng.level = Math.max(eng.level, nextLevel);
      bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eng.level);

      setUiScore(eng.score);
      setUiLevel(Math.floor(eng.level));
      setUiCombo(eng.combo);
      drillAudio?.playHit?.();

      spawnTarget();
    } else {
      // MISCLICK
      eng.missedClicks++;
      if (drillPenalty.isEnabled()) eng.timeLeft -= TIME_PENALTY;
      eng.combo = 0;
      setUiCombo(0);

      drillAudio?.playPenalty?.();
      triggerFlash();
    }
  }, [spawnTarget, triggerFlash]);

  // High Performance HTML5 Canvas Render & Relocation Loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const updateSize = () => {
      const ct = containerRef.current;
      if (!ct) return;
      const cr = ct.getBoundingClientRect();
      const w = cr.width;
      const h = cr.height;
      cvs.width = w;
      cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
    };

    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateSize);
    updateSize();

    let lastTime = performance.now();

    function draw(now) {
      if (isIdleFrameSkippable(gameState === 'playing', now, lastTime)) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const e = engine.current;
      if (gameActiveRef.current) {
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

      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      const t = targetRef.current;
      if (t.active) {
        const elapsed = (now - (t.lastRelocateTime || now)) / 1000;
        const interval = t.moveInterval || 1.0;

        // Relocation when time-to-live expires
        if (elapsed >= interval) {
          if (drillTimeout.isEnabled()) {
            e.missedClicks++;
            if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
            e.combo = 0;
            setUiCombo(0);
            drillAudio?.playPenalty?.();
            triggerFlash();
          }

          const config = getLevelConfig(e.level, e.combo);
          const newInterval = config.moveInterval;
          const speed = config.speed / 60;
          const radius = config.radius;
          const angle = Math.random() * Math.PI * 2;

          t.moveInterval = newInterval;
          setCurrentInterval(newInterval);
          t.radius = radius;
          t.vx = Math.cos(angle) * speed;
          t.vy = Math.sin(angle) * speed;
          t.x = radius + Math.random() * (cvs.width - radius * 2);
          t.y = radius + Math.random() * (cvs.height - radius * 2);
          t.lastRelocateTime = now;
        } else {
          // Bounce off walls while moving
          t.x += t.vx;
          t.y += t.vy;

          if (t.x - t.radius <= 0) { t.x = t.radius; t.vx = -t.vx; }
          if (t.x + t.radius >= cvs.width) { t.x = cvs.width - t.radius; t.vx = -t.vx; }
          if (t.y - t.radius <= 0) { t.y = t.radius; t.vy = -t.vy; }
          if (t.y + t.radius >= cvs.height) { t.y = cvs.height - t.radius; t.vy = -t.vy; }
        }

        // Draw main target sphere
        drawTacticalTarget(ctx, t.x, t.y, t.radius, "#f97316", true);

        // Draw visual relocation countdown arc & timestamp badge around target
        const currentElapsed = (performance.now() - (t.lastRelocateTime || performance.now())) / 1000;
        const progress = Math.min(1, Math.max(0, currentElapsed / (t.moveInterval || 1.0)));
        const remaining = Math.max(0, (t.moveInterval || 1.0) - currentElapsed);

        const outerR = t.radius + 6;
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (1 - progress) * Math.PI * 2;

        // Outer background ring
        ctx.beginPath();
        ctx.arc(t.x, t.y, outerR, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Remaining relocation time arc
        ctx.beginPath();
        ctx.arc(t.x, t.y, outerR, startAngle, endAngle, false);
        ctx.strokeStyle = progress > 0.75 ? "#ef4444" : "#f97316";
        ctx.lineWidth = 3;
        ctx.shadowColor = progress > 0.75 ? "#ef4444" : "#f97316";
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Timestamp badge text above target
        ctx.font = "bold 10px monospace";
        ctx.fillStyle = progress > 0.75 ? "#fca5a5" : "#fdba74";
        ctx.textAlign = "center";
        ctx.fillText(`${remaining.toFixed(1)}s`, t.x, t.y - t.radius - 10);
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
      ro.disconnect();
    };
  }, [gameState, endGame, triggerFlash]);

  // Enter Drill (Start Countdown -> Playing)
  const enterDrill = useCallback(() => {
    if (startingRef.current) return;
    startingRef.current = true;

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    clearGameTimeouts();

    drillAudio?.init?.();

    const startLevel = getStartLevel();
    bestLevelRunRef.current = startLevel;

    setIsNewBest(false);
    setUiScore(0);
    setUiLevel(startLevel);
    setUiCombo(0);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    setCurrentInterval(1.0);

    engine.current = {
      score: 0,
      level: startLevel,
      combo: 0,
      maxCombo: 0,
      timeLeft: DRILL_DURATION,
      perfectHits: 0,
      missedClicks: 0,
    };

    setIsFullscreen(true);

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
      spawnTarget();
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [clearGameTimeouts, spawnTarget]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/visual/tracking-accuracy/moving-target';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        accuracy: analytics.accuracy,
        speed: 0,
        drillName: 'Moving Target Pro',
        rank: analytics.grade?.letter || 'A',
        rankName: analytics.grade?.label || 'ELITE REFLEX',
        playerName: getPlayerName(),
        level: analytics.finalLevel,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        url: 'skilldrills.online/drills/visual/tracking-accuracy/moving-target'
      });
      await shareScoreCard(canvas, {
        title: 'Moving Target Pro — My Score',
        text: `I scored ${uiScore} (Grade: ${analytics.grade?.letter || 'A'}, Lv. ${analytics.finalLevel}) on Moving Target Pro at SkillDrills!`,
        url
      });
    } catch (e) {
      if (navigator.share) {
        navigator.share({ title: 'My Tracking Score', text: `I scored ${uiScore} on Moving Target Pro!`, url }).catch(() => {});
      }
    }
  }, [uiScore, analytics]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              MOVING TARGET PRO
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
                Moving Target Intercept Test
              </span>
            </h1>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-base sm:text-lg font-black text-orange-400 tabular-nums">{uiScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Shift Pace</div>
              <div className="text-base sm:text-lg font-black text-amber-400 tabular-nums">{currentInterval.toFixed(2)}s</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-base sm:text-lg font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {uiTimeLeft}s
              </div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Score</div>
              <div className="text-base sm:text-lg font-black text-amber-400 tabular-nums">{bestScore}</div>
            </div>
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
              <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col gap-1">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                  <p className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-tight">{uiScore}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time Left</p>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-orange-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* CANVAS */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            className="block absolute top-0 left-0 w-full h-full z-10 cursor-pointer touch-none"
          />

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Move}
              accent="orange"
              title="Moving Target Pro"
              subtitle="Kinetic Visual Tracking • Intercept Accuracy"
              rules={[
                { icon: Target, accent: 'orange', title: 'Intercept Target', text: '+150 PTS × Combo × Level multiplier (+0.6s per hit)' },
                {
                  icon: Zap,
                  accent: 'amber',
                  title: penaltyEnabled ? 'Time Penalty (-0.8s)' : 'Escalating Target Pace',
                  text: penaltyEnabled
                    ? 'Misclicks or relocation timeouts subtract 0.8s and reset combo'
                    : 'Target relocation speed accelerates. Misclicks reset combo (no time deducted)'
                },
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

          {/* UNIVERSAL RESULT CARD */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="orange"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { label: 'Accuracy', value: analytics.accuracy, suffix: '%' },
                { label: 'Intercepts', value: analytics.perfectHits },
                { label: 'Peak Level', value: `Lv. ${analytics.finalLevel}` },
                { label: 'Max Combo', value: analytics.maxCombo, suffix: 'x' },
              ]}
              onPlayAgain={enterDrill}
              onShare={shareScore}
              onExit={handleExitDrill}
            />
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
                <DrillRuleItem num="1" text="Intercept Kinetic Target" highlight="+150 PTS" result="× Combo × Level bonus (+0.6s clock per hit)" />
                <DrillRuleItem num="2" text="Dynamic Relocation" highlight="Tightens Continuously" result="Changes location faster as streak climbs" />
                <DrillRuleItem num="3" text="Progressive Difficulty" highlight="Faster & Smaller" result="Speed rises, hitbox shrinks" />
                <DrillRuleItem 
                  num="4" 
                  text="Misclick / Relocation Penalty" 
                  highlight={penaltyEnabled ? "-0.8s Penalty" : "Zero Penalties (Default)"} 
                  result={penaltyEnabled ? "Deducts 0.8s & resets combo" : "Resets combo. Time penalty is opt-in via settings"} 
                />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Moving Target Pro"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-orange-400" /> What Is Kinetic Target Intercept Training?
                  </h4>
                  <p className="text-sm leading-relaxed mb-3">
                    <strong>Kinetic Target Intercept Training</strong> is a high-speed smooth pursuit drill designed to test visual tracking and motor interception accuracy. The <strong>Moving Target drill</strong> renders bouncing target spheres traveling across a 2D bounding viewport at dynamic velocities.
                  </p>
                  <p className="text-sm leading-relaxed">
                    By matching your eye gaze and motor cursor with moving targets, you build smooth pursuit eye movement coordination, crucial for aiming in esports and fast visual inspection.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">FPS gamers tracking moving opponents, athletes refining hand-eye motor speed, and visual tracking trainees.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Smooth pursuit tracking, motor interception accuracy, hand-eye coordination, and velocity prediction.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Smooth Pursuit</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Lead the moving target slightly ahead of its trajectory vector to click cleanly with high accuracy.</p>
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
                <DrillFAQItem q="What is the Moving Target Pro Drill?" a="A free visual tracking exercise. Intercept bouncing target spheres traveling across a 2D bounding viewport." />
                <DrillFAQItem q="What skills does this drill improve?" a="Smooth pursuit tracking, hand-eye coordination, velocity prediction, and motor interception accuracy under dynamic time limits." />
                <DrillFAQItem q="How does progressive difficulty work?" a="As your score and combo climb, target movement velocity accelerates and hitboxes shrink continuously." />
                <DrillFAQItem q="Are there negative score or time penalties?" a="By default, misclicks or timeouts only reset your combo multiplier. An opt-in time penalty (-0.8s per error) is available in session settings for hard-mode training." />
                <DrillFAQItem q="Does difficulty decrease on mistakes?" a="No. Your level progression is monotonic — a mistake never takes you back down, allowing you to master your current level." />
                <DrillFAQItem q="How long does each drill session last?" a="Each round starts with 45 seconds on the clock, and successful intercepts add +0.6s to extend your run." />
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
                  className="group bg-[#0c0c16] border border-white/5 hover:border-orange-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-orange-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-orange-400 mt-3 flex items-center gap-1 transition-colors">
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
