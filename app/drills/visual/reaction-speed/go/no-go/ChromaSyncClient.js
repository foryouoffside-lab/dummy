'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { Volume2, VolumeX, Target, Eye, Users, TrendingUp, Zap, ZapOff, Brain, Crosshair, Heart, Trophy } from 'lucide-react';

import { isIdleFrameSkippable } from '@/lib/performance';
import generateShareCard, { shareScoreCard } from '../../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../../lib/leaderboard';
import { drillAudio } from '../../../../../../lib/drillAudio';
import { drillFlash } from '../../../../../../lib/drillFlash';
import { drillTimeout } from '../../../../../../lib/drillTimeout';
import { drillPenalty } from '../../../../../../lib/drillPenalty';
import { getFpsScoreGrade, getComboMultiplier } from '../../../../../../lib/scoringEngine';
import { getDifficultyProgress, getStartLevel, ramp } from '../../../../../../lib/drillDifficulty';
import { getCanvasDpr } from '../../../../../../lib/canvasFx';
import useDrillFlash from '../../../../../../lib/useDrillFlash';
import useUnexpectedExitGuard from '../../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../../components/drill/DrillAccordion';
import DrillFlashOverlay from '../../../../../../components/drill/DrillFlashOverlay';
import DrillRuleItem from '../../../../../../components/drill/DrillRuleItem';
import DrillFAQItem from '../../../../../../components/drill/DrillFAQItem';
import FpsStartCard from '../../../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../../../components/drill/DrillResultCard';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_GO_HIT = 150;
const POINTS_PER_NOGO_HOLD = 100;
const POINTS_PER_LEVEL = 6300; // 900 -> 6300 (7x)
const ELITE_SCORE = 16000; // 1000 -> 16000 (scaled for unbounded continuous runs)
const TIME_PER_HIT = 0.6; // +0.6s per valid hit / correct hold
const TIME_PENALTY = 0.8; // -0.8s on error / commission / timeout (opt-in gated)
const STORAGE_KEY = 'skilldrills_visual_go_nogo_v5';
const MAX_LIVES = 5;

// Clean 2D Target Renderer matching deploy style (104px diameter / 52px radius)
function draw2dTarget(ctx, x, y, targetVisible, targetType) {
  ctx.save();

  const radius = 52;

  // Main Target Circle
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);

  if (targetVisible) {
    if (targetType === 'GO') {
      ctx.fillStyle = '#10b981'; // Emerald Green
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#10b981';
    } else if (targetType === 'NO_GO') {
      ctx.fillStyle = '#ef4444'; // Crimson Red
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#ef4444';
    }
  } else {
    ctx.fillStyle = '#151515';
    ctx.shadowBlur = 0;
  }
  ctx.fill();
  ctx.shadowBlur = 0;

  // Inner Detailing Ring
  ctx.beginPath();
  ctx.arc(x, y, radius - 3, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Center Dot
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fillStyle = targetVisible ? '#000000' : '#333333';
  ctx.fill();

  ctx.restore();
}

const RELATED_DRILLS = [
  { id: "light-reaction", name: "Light Reaction", cat: "Reaction Speed", desc: "Test raw visual motor reaction speed.", href: "/drills/visual/reaction-speed/light-reaction" },
  { id: "moving-target", name: "Moving Target", cat: "Visual Tracking", desc: "Kinetic visual tracking and target intercept.", href: "/drills/visual/tracking-accuracy/moving-target" },
  { id: "visual-search", name: "Visual Search", cat: "Visual Recognition", desc: "Conjunctive visual search speed & pattern recognition.", href: "/drills/visual/visual-recognition/visual-search" },
  { id: "multiple-targets", name: "Multiple Targets", cat: "Visual Tracking", desc: "Track multiple moving targets across dynamic paths.", href: "/drills/visual/tracking-accuracy/multiple-targets" },
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
    flashWindow: Math.max(100, ramp(600, 160, p) * (1 - heat * 0.25)),
    minDelay: Math.max(120, ramp(400, 150, p) * (1 - heat * 0.20)),
    maxDelay: Math.max(200, ramp(800, 280, p) * (1 - heat * 0.20)),
  };
};

export default function ChromaSyncClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const { flashes, triggerFlash } = useDrillFlash();

  // Signal & Target State
  const [uiLevel, setUiLevel] = useState(1);
  const [uiCombo, setUiCombo] = useState(0);
  const [targetType, setTargetType] = useState(null); // null | 'GO' | 'NO_GO'
  const [targetVisible, setTargetVisible] = useState(false);
  const [isSpamming, setIsSpamming] = useState(false);

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [uiLives, setUiLives] = useState(MAX_LIVES);
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
    livesLeft: MAX_LIVES,
    outOfLives: false,
    grade: null,
  });

  // DOM & Engine Canvas Refs
  const containerRef = useRef(null);
  const targetCanvasRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  const gameTimeoutsRef = useRef([]);
  const spawnTimeoutRef = useRef(null);
  const signalTimeoutRef = useRef(null);
  const spamCooldownTimerRef = useRef(null);
  const startingRef = useRef(false);
  const gameActiveRef = useRef(false);
  const bestLevelRunRef = useRef(1);
  const lastTimeRef = useRef(DRILL_DURATION);

  const currentTypeRef = useRef(null);
  const hasRespondedRef = useRef(false);
  const lastClickTimeRef = useRef(0);
  const isSpammingRef = useRef(false);

  const engine = useRef({
    score: 0,
    level: 1,
    combo: 0,
    maxCombo: 0,
    timeLeft: DRILL_DURATION,
    perfectHits: 0,
    missedClicks: 0,
    lives: MAX_LIVES,
  });

  // Precision 2D target renderer (fixed 104px diameter, 52px radius)
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

    // Background Grid
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    for (let i = 0; i < w; i += 40) ctx.fillRect(i, 0, 1, h);
    for (let i = 0; i < h; i += 40) ctx.fillRect(0, i, w, 1);

    const cx = w / 2;
    const cy = h / 2;

    const showTarget = targetVisible && !isSpamming;
    draw2dTarget(ctx, cx, cy, showTarget, targetType);
  }, [targetVisible, targetType, isSpamming]);

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

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const clearGameTimeouts = useCallback(() => {
    gameTimeoutsRef.current.forEach(clearTimeout);
    gameTimeoutsRef.current = [];
    if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
    if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
    if (spamCooldownTimerRef.current) clearTimeout(spamCooldownTimerRef.current);
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    clearGameTimeouts();
    startingRef.current = false;
    gameActiveRef.current = false;

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
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
      letter: rating.grade || rating.letter || 'C',
      label: rating.label || 'Keep Going',
      color: rating.color || 'text-emerald-400',
    };

    setAnalytics({
      accuracy: finalAccuracy,
      perfectHits: e.perfectHits,
      missedClicks: e.missedClicks,
      finalLevel: Math.floor(bestLevelRunRef.current),
      maxCombo: e.maxCombo,
      livesLeft: e.lives,
      outOfLives: e.lives <= 0,
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

  // Main RAF loop for clock draining
  useEffect(() => {
    if (gameState !== 'playing') return;

    let animId;
    let lastTime = performance.now();

    const loop = (now) => {
      if (isIdleFrameSkippable(gameState === 'playing', now, lastTime)) {
        animId = requestAnimationFrame(loop);
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

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, endGame]);

  // Spawn Next Signal Target (Green GO vs Red NO-GO)
  const spawnNextSignal = useCallback(() => {
    if (!gameActiveRef.current || isSpammingRef.current) return;

    setTargetVisible(false);
    hasRespondedRef.current = false;

    const e = engine.current;
    const config = getLevelConfig(e.level, e.combo);

    // Random inter-stimulus interval
    const delay = Math.floor(config.minDelay + Math.random() * (config.maxDelay - config.minDelay));

    spawnTimeoutRef.current = setTimeout(() => {
      if (!gameActiveRef.current || isSpammingRef.current) return;

      const isGoSignal = Math.random() < 0.7; // 70% GO, 30% NO-GO
      const type = isGoSignal ? 'GO' : 'NO_GO';
      currentTypeRef.current = type;
      setTargetType(type);

      // Fixed at center
      setTargetVisible(true);

      const flashWindow = config.flashWindow;

      signalTimeoutRef.current = setTimeout(() => {
        if (!gameActiveRef.current || isSpammingRef.current) return;
        setTargetVisible(false);

        // If it was a NO-GO signal and user correctly inhibited response: AWARD POINTS!
        if (currentTypeRef.current === 'NO_GO' && !hasRespondedRef.current) {
          e.perfectHits++;
          e.combo += 1;
          if (e.combo > e.maxCombo) e.maxCombo = e.combo;

          const levelMult = 1 + getDifficultyProgress(e.level) * 0.5;
          e.score += Math.round(POINTS_PER_NOGO_HOLD * getComboMultiplier(e.combo) * levelMult);

          // Time bonus on successful hold
          e.timeLeft += TIME_PER_HIT;

          // Continuous level progression
          const nextLevel = (e.score / POINTS_PER_LEVEL) + 1;
          e.level = Math.max(e.level, nextLevel);
          bestLevelRunRef.current = Math.max(bestLevelRunRef.current, e.level);

          setUiScore(e.score);
          setUiLevel(Math.floor(e.level));
          setUiCombo(e.combo);
          drillAudio?.playHit?.();
        } else if (currentTypeRef.current === 'GO' && !hasRespondedRef.current && drillTimeout.isEnabled()) {
          // Missed GO signal (timeout / omission error)
          e.missedClicks++;
          if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
          e.combo = 0;
          setUiCombo(0);
          drillAudio?.playPenalty?.();
          triggerFlash();
        }

        spawnNextSignal();
      }, flashWindow);

    }, delay);
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

    // Detect rapid continuous clicking or clicking during idle gap between targets
    const isRapidClick = timeSinceLastClick > 0 && timeSinceLastClick < 320;
    const isClickingIdleGap = !targetVisible;

    const e = engine.current;

    if (isRapidClick || isClickingIdleGap || hasRespondedRef.current || isSpammingRef.current) {
      // Continuous / spam clicking detected — hide target & delay spawn
      isSpammingRef.current = true;
      setIsSpamming(true);
      setTargetVisible(false);
      hasRespondedRef.current = true;

      e.missedClicks++;
      if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
      e.combo = 0;
      setUiCombo(0);

      // Clear active timers so target DOES NOT APPEAR
      if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
      if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);

      drillAudio?.playPenalty?.();
      triggerFlash();

      // Target will ONLY appear after 1.2 seconds of zero clicking
      if (spamCooldownTimerRef.current) clearTimeout(spamCooldownTimerRef.current);
      spamCooldownTimerRef.current = setTimeout(() => {
        if (!gameActiveRef.current) return;
        isSpammingRef.current = false;
        setIsSpamming(false);
        spawnNextSignal();
      }, 1200);

      return;
    }

    hasRespondedRef.current = true;
    const type = currentTypeRef.current;

    if (type === 'GO' && targetVisible) {
      // PERFECT HIT ON GREEN GO SIGNAL
      e.perfectHits++;
      e.combo += 1;
      if (e.combo > e.maxCombo) e.maxCombo = e.combo;

      const levelMult = 1 + getDifficultyProgress(e.level) * 0.5;
      e.score += Math.round(POINTS_PER_GO_HIT * getComboMultiplier(e.combo) * levelMult);

      // Time bonus on clean hit
      e.timeLeft += TIME_PER_HIT;

      // Continuous level progression
      const nextLevel = (e.score / POINTS_PER_LEVEL) + 1;
      e.level = Math.max(e.level, nextLevel);
      bestLevelRunRef.current = Math.max(bestLevelRunRef.current, e.level);

      setUiScore(e.score);
      setUiLevel(Math.floor(e.level));
      setUiCombo(e.combo);
      drillAudio?.playHit?.();
      setTargetVisible(false);

      if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
      spawnNextSignal();
    } else if (type === 'NO_GO' && targetVisible) {
      // WRONG CLICK ON RED NO-GO SIGNAL — costs 1 life.
      e.missedClicks++;
      e.lives = Math.max(0, e.lives - 1);
      if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
      e.combo = 0;
      setUiCombo(0);
      setUiLives(e.lives);

      drillAudio?.playPenalty?.();
      triggerFlash();
      setTargetVisible(false);

      if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);

      if (e.lives <= 0) {
        endGame();
        return;
      }
      spawnNextSignal();
    }
  }, [targetVisible, spawnNextSignal, triggerFlash, endGame]);

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

    const startLevel = getStartLevel();
    bestLevelRunRef.current = startLevel;

    setIsNewBest(false);
    setUiScore(0);
    setUiLevel(startLevel);
    setUiCombo(0);
    setUiTimeLeft(DRILL_DURATION);
    setUiLives(MAX_LIVES);
    lastTimeRef.current = DRILL_DURATION;
    setTargetVisible(false);

    engine.current = {
      score: 0,
      level: startLevel,
      combo: 0,
      maxCombo: 0,
      timeLeft: DRILL_DURATION,
      perfectHits: 0,
      missedClicks: 0,
      lives: MAX_LIVES,
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
      spawnNextSignal();
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [clearGameTimeouts, spawnNextSignal]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/visual/reaction-speed/go/no-go';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        accuracy: analytics.accuracy,
        speed: 0,
        drillName: 'Go/No-Go Pro',
        rank: analytics.grade?.letter || 'A',
        rankName: analytics.grade?.label || 'ELITE REFLEX',
        playerName: getPlayerName(),
        level: analytics.finalLevel,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        url: 'skilldrills.online/drills/visual/reaction-speed/go/no-go'
      });
      await shareScoreCard(canvas, {
        title: 'Go/No-Go Pro — My Score',
        text: `I scored ${uiScore} (Grade: ${analytics.grade?.letter || 'A'}, Lv. ${analytics.finalLevel}) on Go/No-Go Pro at SkillDrills!`,
        url
      });
    } catch (e) {
      if (navigator.share) {
        navigator.share({ title: 'My Reaction Score', text: `I scored ${uiScore} on Go/No-Go Pro!`, url }).catch(() => {});
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
              GO/NO-GO PRO
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
                Go/No-Go Impulse Control Test
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Response Inhibition & Selective Impulse Control
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-emerald-400 tabular-nums">{uiScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {uiTimeLeft}s
              </div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Lives</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${uiLives <= 1 ? 'text-red-400 animate-pulse' : 'text-rose-400'}`}>{uiLives}</div>
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
            isFullscreen ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] flex flex-col items-center justify-center' : 'w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] max-md:portrait:aspect-[3/4] max-md:portrait:min-h-[420px] max-md:portrait:max-h-[76vh] max-md:landscape:min-h-[340px] max-md:landscape:max-h-[85vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col'
          }
        >
          {/* Red Flash Overlay */}
          <DrillFlashOverlay flashes={flashes} />

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              {/* TOP-LEFT: SCORE & LIVES */}
              <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col gap-1">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                  <p className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-tight">{uiScore}</p>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: MAX_LIVES }).map((_, i) => (
                    <Heart
                      key={i}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-200 ${
                        i < uiLives
                          ? 'text-red-500 fill-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]'
                          : 'text-gray-700 fill-gray-800/40'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* TOP-RIGHT: TIME LEFT */}
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
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
              icon={Crosshair}
              accent="emerald"
              title="Go/No-Go Pro"
              subtitle="Response Inhibition • Impulse Control"
              rules={[
                { icon: Target, accent: 'emerald', title: 'Green GO Stimulus', text: '+150 PTS × Combo × Level multiplier (+0.6s per tap)' },
                { icon: Zap, accent: 'red', title: 'Red STOP Stimulus', text: '+100 PTS on successful restraint (+0.6s). Wrong tap costs 1 life' },
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
              accent="emerald"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { label: 'Accuracy', value: analytics.accuracy, suffix: '%' },
                { label: 'Lives Left', value: `${analytics.livesLeft}/${MAX_LIVES}` },
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
                <DrillRuleItem num="1" text="Green GO Signal" highlight="+150 PTS" result="× Combo × Level bonus (+0.6s clock per hit)" />
                <DrillRuleItem num="2" text="Red NO-GO Signal" highlight="+100 PTS" result="Restrain response (+0.6s clock)" />
                <DrillRuleItem 
                  num="3" 
                  text="Wrong Click (False Alarm)" 
                  highlight={penaltyEnabled ? "-1 Life & -0.8s" : "-1 Life"} 
                  result={penaltyEnabled ? "Costs 1 life, deducts 0.8s, resets combo" : "Costs 1 life & resets combo. No time loss (default)"} 
                />
                <DrillRuleItem num="4" text="Missed GO (Timeout)" highlight="Streak Reset" result="No life lost. Resets combo multiplier" />
                <DrillRuleItem num="5" text="5 Lives Per Run" highlight="Game Over at 0" result="Drill ends early if lives run out" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Go/No-Go Pro"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-emerald-400" /> What Is Go/No-Go Response Inhibition?
                  </h4>
                  <p className="text-sm leading-relaxed mb-3">
                    <strong>Go/No-Go Training</strong> is the gold standard neuroscientific task for measuring motor response inhibition and impulse control. The <strong>Go/No-Go drill</strong> requires you to react as quickly as possible to green target signals ('Go') while suppressing motor actions when red distractor signals ('No-Go') appear.
                  </p>
                  <p className="text-sm leading-relaxed">
                    Training with this task strengthens prefrontal cortex executive control, reducing premature responses and trigger impulsivity in high-stakes environments.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">FPS gamers refining trigger discipline, pilots & drivers improving split-second decision making, and impulse control trainees.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Response inhibition, impulse control, selective motor control, trigger discipline, and reaction speed.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Trigger Control</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Restrain your thumb/finger from tapping instinctively when a red STOP target appears — every successful hold is worth points too.</p>
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
                <DrillFAQItem q="What is the Go/No-Go Drill?" a="A free response inhibition task. React instantly to Green 'GO' targets while suppressing motor actions when Red 'STOP' targets spawn." />
                <DrillFAQItem q="How does progressive difficulty work?" a="As your score and combo climb, signal display windows tighten continuously, challenging your impulse control boundaries." />
                <DrillFAQItem q="Are there negative score or time penalties?" a="By default, wrong clicks on red NO-GO signals cost 1 life without deducting time. An opt-in time penalty (-0.8s per error) is available in session settings for hard-mode training." />
                <DrillFAQItem q="What happens if I run out of lives?" a="You start each run with 5 lives. Every wrong click on a red NO-GO signal costs 1 life; missing a green GO signal (timeout) costs no life at all. Reach 0 lives and the drill ends immediately, even if time remains." />
                <DrillFAQItem q="Does difficulty decrease on mistakes?" a="No. Your level progression is monotonic — a mistake never takes you back down, so you can safely master your current level." />
                <DrillFAQItem q="How long does each drill session last?" a="Each round starts with 45 seconds on the clock (extendable by hitting GO targets and holding NO-GOs), or until your 5 lives run out." />
                <DrillFAQItem q="Do I need to sign up?" a="No registration required. This drill runs directly in your browser with instant response." />
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
                  className="group bg-[#0c0c16] border border-white/5 hover:border-emerald-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-emerald-400 mt-3 flex items-center gap-1 transition-colors">
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
