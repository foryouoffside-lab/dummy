'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

import { 
  Volume2, VolumeX,
  Play, RefreshCw, Target,
  Share2, LogOut, RotateCw, Eye, Users, TrendingUp, Zap, ZapOff, Brain, Crosshair, Trophy
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { drillFlash } from '../../../../../lib/drillFlash';
import { drillTimeout } from '../../../../../lib/drillTimeout';
import { getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import { MAX_LEVEL } from '../../../../../lib/drillDifficulty';
import useDrillFlash from '../../../../../lib/useDrillFlash';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import DrillFlashOverlay from '../../../../../components/drill/DrillFlashOverlay';
import DrillRuleItem from '../../../../../components/drill/DrillRuleItem';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';
import useImmersiveMode from '@/lib/useImmersiveMode';
import { useTranslation } from '@/lib/i18n/useTranslation';

const DRILL_DURATION = 45; // 45 seconds duration
const POINTS_PERFECT = 150;
const POINTS_CLOSE = 100;
const POINTS_PER_LEVEL = 750; // Level up every 750 points
const ELITE_SCORE = 1500; // Target score for S+ rating
const STORAGE_KEY = 'skilldrills_visual_distance_judgment_v4';

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

export default function DistanceJudgmentClient({ copy = null }) {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const { flashes, triggerFlash } = useDrillFlash();

  // Depth Intercept State
  const [level, setLevel] = useState(1);
  const [lastDeviationPercent, setLastDeviationPercent] = useState(0);

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

  // DOM & Canvas Engine Refs
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const countdownTimeoutsRef = useRef([]);
  const gameTimeoutsRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const cycleTimeoutRef = useRef(null);
  const startingRef = useRef(false);
  const gameActiveRef = useRef(false);

  const currentZRef = useRef(0);
  const targetZRef = useRef(50);
  const durationRef = useRef(2000);
  const approachStartTimeRef = useRef(0);
  const isApproachingRef = useRef(false);

  const engine = useRef({
    score: 0,
    level: 1,
    timeLeft: DRILL_DURATION,
    perfectHits: 0,
    missedClicks: 0,
  });

  // Storage loading & sound init
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestLevel(saved.bestLevel || 1);
    }
  }, []);

  const clearGameTimeouts = useCallback(() => {
    gameTimeoutsRef.current.forEach(clearTimeout);
    gameTimeoutsRef.current = [];
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
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
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    startingRef.current = false;
    gameActiveRef.current = false;

    setIsFullscreen(false);
    setGameState('start');
  }, [clearGameTimeouts]);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  // End Game Management & Grade Evaluation
  const endGame = useCallback(() => {
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
      color: rating.color || 'text-cyan-400',
      emoji: rating.emoji || '🎯'
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
  }, [clearGameTimeouts]);

  // Start Next Sphere Approach Cycle (Dynamic Difficulty Scaling: Speed & Target Depth Window)
  const startNextApproach = useCallback(() => {
    if (!gameActiveRef.current) return;

    currentZRef.current = 0;
    
    const lvl = engine.current.level;
    // Dynamic target depth placement: expands from 30%-70% up to 20%-80%
    const minZ = Math.max(20, 35 - lvl * 2);
    const maxZ = Math.min(80, 65 + lvl * 2);
    targetZRef.current = minZ + Math.floor(Math.random() * (maxZ - minZ));

    // Dynamic approach speed acceleration: base duration scales down from 2200ms to 500ms
    const baseDuration = Math.max(500, 2200 - lvl * 130);
    const jitterBand = Math.min(0.50, 0.08 + lvl * 0.04);
    const jitter = 1 + (Math.random() * 2 - 1) * jitterBand;
    durationRef.current = Math.max(400, Math.round(baseDuration * jitter));

    approachStartTimeRef.current = performance.now();
    isApproachingRef.current = true;
  }, []);

  // Handle Intercept Tap / Click
  const handleIntercept = useCallback((evt) => {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    if (!gameActiveRef.current || !isApproachingRef.current) return;
    isApproachingRef.current = false;

    const e = engine.current;
    const currentZ = currentZRef.current;
    const targetZ = targetZRef.current;
    const deviation = Math.abs(currentZ - targetZ);
    setLastDeviationPercent(Math.round(deviation));

    // Difficulty-scaled tolerance thresholds
    const lvl = e.level;
    const perfectTolerance = Math.max(4, 7 - Math.floor(lvl * 0.3)); // 7% -> 4%
    const closeTolerance = Math.max(10, 16 - Math.floor(lvl * 0.5));   // 16% -> 10%

    const checkLevelUp = () => {
      const nextLevel = Math.floor(e.score / POINTS_PER_LEVEL) + 1;
      if (nextLevel > e.level) {
        e.level = nextLevel;
        setLevel(e.level);
      }
    };

    if (deviation <= perfectTolerance) {
      // PERFECT DEPTH MATCH
      e.perfectHits++;
      e.score += POINTS_PERFECT;
      checkLevelUp();

      setUiScore(e.score);
      drillAudio?.playHit?.();

      cycleTimeoutRef.current = setTimeout(() => {
        if (!gameActiveRef.current) return;
        startNextApproach();
      }, 350);
    } else if (deviation <= closeTolerance) {
      // CLOSE MATCH
      e.perfectHits++;
      e.score += POINTS_CLOSE;
      checkLevelUp();

      setUiScore(e.score);
      drillAudio?.playHit?.();

      cycleTimeoutRef.current = setTimeout(() => {
        if (!gameActiveRef.current) return;
        startNextApproach();
      }, 350);
    } else {
      // FAR MISS (>tolerance) — Red flash & penalty sound (no score deduction)
      e.missedClicks++;

      drillAudio?.playPenalty?.();
      triggerFlash();

      cycleTimeoutRef.current = setTimeout(() => {
        if (!gameActiveRef.current) return;
        startNextApproach();
      }, 400);
    }
  }, [startNextApproach, triggerFlash]);

  // High Performance 3D Depth Canvas Render Loop
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

    function draw() {
      if (!gameActiveRef.current) return;

      const now = performance.now();
      const w = cvs.width;
      const h = cvs.height;
      const centerX = w / 2;
      const centerY = h / 2;

      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, w, h);

      // Draw 3D Tunnel Grid Lines
      ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
      ctx.lineWidth = 1;

      for (let depth = 10; depth <= 100; depth += 18) {
        const scale = depth / 100;
        const rw = w * 0.85 * scale;
        const rh = h * 0.85 * scale;
        ctx.strokeRect(centerX - rw / 2, centerY - rh / 2, rw, rh);
      }

      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(centerX - w * 0.425, centerY - h * 0.425);
      ctx.moveTo(w, 0); ctx.lineTo(centerX + w * 0.425, centerY - h * 0.425);
      ctx.moveTo(0, h); ctx.lineTo(centerX - w * 0.425, centerY + h * 0.425);
      ctx.moveTo(w, h); ctx.lineTo(centerX + w * 0.425, centerY + h * 0.425);
      ctx.stroke();

      // Draw Target Depth Ring
      const targetScale = targetZRef.current / 100;
      const targetRadius = (Math.min(w, h) * 0.35) * targetScale;

      ctx.beginPath();
      ctx.arc(centerX, centerY, targetRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "#06b6d4";
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Update Approaching Sphere Z position
      if (isApproachingRef.current) {
        const elapsed = now - approachStartTimeRef.current;
        const progress = drillTimeout.isEnabled() ? Math.min(1, elapsed / durationRef.current) : Math.min(0.999, elapsed / durationRef.current);
        currentZRef.current = progress * 100;

        if (drillTimeout.isEnabled() && progress >= 1) {
          // Reached end without intercept: handle miss
          isApproachingRef.current = false;
          const e = engine.current;
          e.missedClicks++;
          drillAudio?.playPenalty?.();
          triggerFlash();

          cycleTimeoutRef.current = setTimeout(() => {
            if (!gameActiveRef.current) return;
            startNextApproach();
          }, 450);
        }
      }

      // Draw Approaching Sphere
      const sphereScale = Math.max(0.1, currentZRef.current / 100);
      const sphereRadius = (Math.min(w, h) * 0.35) * sphereScale;

      if (sphereRadius > 0.5) {
        // Ambient glow behind sphere
        ctx.beginPath();
        ctx.arc(centerX, centerY, sphereRadius + 12, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.22)";
        ctx.fill();

        // Lit 3D Sphere Body
        const lightX = centerX - sphereRadius * 0.35;
        const lightY = centerY - sphereRadius * 0.35;
        const sphereGradient = ctx.createRadialGradient(
          lightX, lightY, sphereRadius * 0.05,
          centerX, centerY, sphereRadius
        );
        sphereGradient.addColorStop(0, '#e0f7ff');
        sphereGradient.addColorStop(0.35, '#38bdf8');
        sphereGradient.addColorStop(0.75, '#0891b2');
        sphereGradient.addColorStop(1, '#0e3a4d');

        ctx.beginPath();
        ctx.arc(centerX, centerY, sphereRadius, 0, Math.PI * 2);
        ctx.fillStyle = sphereGradient;
        ctx.fill();

        // Rim light
        ctx.lineWidth = Math.max(1, sphereRadius * 0.04);
        ctx.strokeStyle = 'rgba(224, 247, 255, 0.5)';
        ctx.stroke();

        // Specular highlight
        ctx.beginPath();
        ctx.arc(lightX, lightY, sphereRadius * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
      ro.disconnect();
    };
  }, [gameState, startNextApproach, triggerFlash]);

  // Enter Drill (Start Countdown -> Playing)
  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    clearGameTimeouts();

    drillAudio?.init?.();

    setIsNewBest(false);
    setUiScore(0);
    setUiTimeLeft(DRILL_DURATION);
    setLevel(1);
    setLastDeviationPercent(0);

    engine.current = {
      score: 0,
      level: 1,
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

      // Start 45s timer
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

      startNextApproach();
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [clearGameTimeouts, endGame, startNextApproach]);

  const shareScore = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://skilldrills.online/drills/visual/depth-perception/distance-judgment';
    const drillName = copy?.shareDrillName || 'Depth Perception Test';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName,
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = copy?.shareText
        ? copy.shareText.replace('{score}', uiScore).replace('{level}', analytics.finalLevel).replace('{accuracy}', analytics.accuracy)
        : `🎯 I scored ${uiScore} PTS (Peak Level: Lvl ${analytics.finalLevel}) on ${drillName}! Accuracy: ${analytics.accuracy}%. Train stereoscopic depth perception at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: copy?.shareTitle || 'My Depth Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert(copy?.copiedAlert || 'Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest, copy]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title — left-aligned sentence-case H1 and 2-sentence definition snippet */}
        {!isFullscreen && (
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
              {copy?.title || "Depth Perception Test"}
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1">
                {copy?.subtitle || "Distance Judgment & Visual Intercept Lab"}
              </span>
            </h1>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              {copy?.caption || "Depth perception is judging how far away things are and in what order. Two cues carry most of it: binocular disparity, the small difference between the images from your two eyes — which random-dot stereograms showed is enough on its own, with no other cue present, to produce a sense of depth (Julesz, 1971) — and optical expansion, the rate at which an approaching object's image grows on the retina, which specifies time-to-contact without your needing to know the object's size or speed (Lee, 1976; Regan & Beverley, 1978). A flat monitor removes the first cue, so a browser test measures the second: this drill times your judgement of expansion and intercept, not your stereo acuity, which needs the two-rod apparatus Howard (1919) described."}
            </p>
          </div>
        )}

        {/* Live Stat Cards — full width hairline grid */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{copy?.statScore || "Score"}</div>
              <div className="text-lg sm:text-xl font-black text-cyan-400 tabular-nums">{uiScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{copy?.statTime || "Time"}</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {uiTimeLeft}s
              </div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{copy?.statLevel || "Level"}</div>
              <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">L{level}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{copy?.statBestScore || "Best Score"}</div>
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
          {/* DOM Flash Overlay */}
          <DrillFlashOverlay flashes={flashes} />

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.statScore || "Score"}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{uiScore}</p>
              </div>

              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.statTime || "Time"}</p>
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
                    drillAudio?.setEnabled?.(!v);
                    return !v;
                  });
                }}
                className="p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* GAMEPLAY CANVAS SURFACE */}
          {gameState === 'playing' && (
            <div 
              onPointerDown={handleIntercept}
              className="w-full h-full relative cursor-pointer touch-none flex items-center justify-center"
            >
              <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
              
            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Eye}
              accent="cyan"
              title={copy?.startTitle || "Distance Judgment Pro"}
              subtitle={copy?.startSubtitle || "3D Stereoscopic Intercept • Depth Estimation"}
              startButtonText={copy?.startBtn || "Start Drill"}
              isTouchOnlyDevice={false}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle={copy?.getReady || "GET READY"} />
          )}

          {/* END SCREEN (GAME OVER WITH RESULT GRADE) */}
          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              {/* Left 36% Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(6,182,212,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    {copy?.newBest || "NEW BEST"}
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade.color}`}>
                  {analytics.grade.letter}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1">
                  {analytics.grade.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 tabular-nums">
                  {uiScore.toLocaleString()}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500">{copy?.statPoints || "Points"}</div>
              </div>

              {/* Right Stats & Actions Panel */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
                
                {/* 3 Stat Tiles */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.accuracy}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{copy?.statAccuracy || "Accuracy"}</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">Lvl {analytics.finalLevel}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{copy?.statPeakLevel || "Peak Level"}</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.perfectHits}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{copy?.statIntercepts || "Intercepts"}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5 relative z-50 pointer-events-auto"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> {copy?.playAgain || "Play Again"}
                  </button>
                  <button 
                    type="button"
                    onClick={shareScore} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform relative z-50 pointer-events-auto" 
                    title={copy?.shareScore || "Share Score"}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={handleExitDrill} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform relative z-50 pointer-events-auto" 
                    title={copy?.returnOptions || "Return to Options"}
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* ACCORDION 1: DRILL INSTRUCTIONS & SCORING */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
            <DrillAccordion
              id="rules"
              title={copy?.rulesTitle || "Drill Instructions & Scoring System"}
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DrillRuleItem num="1" text={copy?.rule1Text || "Perfect Intercept Match"} highlight={copy?.rule1Highlight || "+150 PTS"} result={copy?.rule1Result || "<5% Depth Error"} />
                <DrillRuleItem num="2" text={copy?.rule2Text || "Close Intercept Match"} highlight={copy?.rule2Highlight || "+100 PTS"} result={copy?.rule2Result || "<12% Depth Error"} />
                <DrillRuleItem num="3" text={copy?.rule3Text || "Accelerating Approach"} highlight={copy?.rule3Highlight || "Faster Speeds"} result={copy?.rule3Result || "Sphere velocity increases with level"} />
                <DrillRuleItem num="4" text={copy?.rule4Text || "Miss / Timeout"} highlight={copy?.rule4Highlight || "Zero Penalties"} result={copy?.rule4Result || "No score or time loss"} />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title={copy?.aboutTitle || "About Distance Judgment Pro"}
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              {copy?.aboutCards ? (
                <div className="space-y-8">
                  <section>
                    <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-cyan-400" /> {copy.overviewTitle}
                    </h3>
                    <p className="text-sm leading-relaxed mb-3">{copy.overviewLead}</p>
                    {copy.overviewBody && <p className="text-sm leading-relaxed">{copy.overviewBody}</p>}
                  </section>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {copy.aboutCards.map((card, i) => (
                      <div key={i} className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className={`w-7 h-7 rounded-lg ${card.iconBg || 'bg-blue-600'} flex items-center justify-center`}>
                            <Target className="w-3.5 h-3.5 text-white" />
                          </div>
                          <h4 className="text-xs font-bold text-white">{card.title}</h4>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">{card.text}</p>
                      </div>
                    ))}
                  </div>
                  {copy.aboutSections?.map((sec, i) => (
                    <section key={i}>
                      <h4 className="text-sm font-bold text-white mb-1.5">{sec.title}</h4>
                      {sec.paragraphs.map((p, j) => (
                        <p key={j} className="text-xs text-gray-300 leading-relaxed mb-2 last:mb-0">{p}</p>
                      ))}
                    </section>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  <section>
                    <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-cyan-400" /> What Is Distance Judgment Training?
                    </h3>
                    <p className="text-sm leading-relaxed mb-3">
                      <strong>Distance Judgment Training</strong> develops binocular stereoscopic depth perception and visual intercept timing. The drill projects a 3D sphere along a deep visual tunnel toward a target depth plane.
                    </p>
                    <p className="text-sm leading-relaxed">
                      By training your visual cortex to calculate looming velocity and relative depth cues under accelerating speeds, you enhance spatial awareness and intercept precision.
                    </p>
                  </section>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                        <h4 className="text-xs font-bold text-white">Who Should Use This?</h4>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">Athletes in intercept sports (baseball, tennis, esports), pilots, drivers, and cognitive vision training enthusiasts.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                        <h4 className="text-xs font-bold text-white">Skills Improved</h4>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">3D depth perception, looming velocity estimation, visual motor intercept timing, and spatial anticipation.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                        <h4 className="text-xs font-bold text-white">Depth Calibration</h4>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">Track the expanding sphere shadow against the target depth ring to time your intercept tap accurately.</p>
                    </div>
                  </div>
                </div>
              )}
            </DrillAccordion>
          </div>
        )}

        {/* SITE FOOTER */}
        {!isFullscreen && <DrillFooter />}

      </main>
    </div>
  );
}
