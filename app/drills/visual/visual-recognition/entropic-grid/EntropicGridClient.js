'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Volume2, VolumeX,
  Play, RefreshCw, Target,
  Share2, LogOut, RotateCw, Eye, Users, TrendingUp, Zap, ZapOff, Brain, Crosshair, Trophy
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { drillFlash } from '../../../../../lib/drillFlash';
import { getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import { MAX_LEVEL } from '../../../../../lib/drillDifficulty';
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
const POINTS_PER_LEVEL = 750; // 5 finds per level, matching the old cadence
const ELITE_SCORE = 1000; // Target score for S+ rating (rebalanced after combo removal)
const STORAGE_KEY = 'skilldrills_visual_entropic_grid_v4';
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const RELATED_DRILLS = [
  { id: "visual-search", name: "Visual Search", cat: "Visual Recognition", desc: "Conjunctive search for target symbols among noise.", href: "/drills/visual/visual-recognition/visual-search" },
  { id: "rhythm-anomaly", name: "Rhythm Anomaly", cat: "Visual Recognition", desc: "Temporal anomaly detection & visual flash tracking.", href: "/drills/visual/visual-recognition/rhythm-anomaly" },
  { id: "moving-target", name: "Moving Target Pro", cat: "Visual Tracking", desc: "Kinetic visual tracking and smooth pursuit interception.", href: "/drills/visual/tracking-accuracy/moving-target" },
  { id: "multiple-targets", name: "Multiple Targets", cat: "Visual Tracking", desc: "Multi-object tracking & visual working memory.", href: "/drills/visual/tracking-accuracy/multiple-targets" },
  { id: "pursuit-tracker", name: "Pursuit Tracker", cat: "Visual Tracking", desc: "Smooth pursuit tracking accuracy and velocity alignment.", href: "/drills/visual/tracking-accuracy/pursuit-tracker" },
  { id: "distance-judgment", name: "Distance Judgment Pro", cat: "Depth Perception", desc: "3D stereoscopic depth estimation & intercept timing.", href: "/drills/visual/depth-perception/distance-judgment" }
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

const getRandomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];
const getRandomString = () => getRandomChar() + getRandomChar();

export default function EntropicGridClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const { flashes, triggerFlash } = useDrillFlash();

  // Grid & Target State
  const [targetString, setTargetString] = useState('--');
  const [level, setLevel] = useState(1);
  const [cells, setCells] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

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
  const countdownTimeoutsRef = useRef([]);
  const gameTimeoutsRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const entropyIntervalRef = useRef(null);
  const targetSwapIntervalRef = useRef(null);
  const startingRef = useRef(false);
  const gameActiveRef = useRef(false);

  const cellsRef = useRef([]);
  const targetRef = useRef('--');
  const lastClickTimeRef = useRef(0);

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

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const clearGameTimeouts = useCallback(() => {
    gameTimeoutsRef.current.forEach(clearTimeout);
    gameTimeoutsRef.current = [];
    if (entropyIntervalRef.current) clearInterval(entropyIntervalRef.current);
    if (targetSwapIntervalRef.current) clearInterval(targetSwapIntervalRef.current);
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
  }, [clearGameTimeouts]);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  // End Game Management
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
      color: rating.color || 'text-blue-400',
      emoji: rating.emoji || '🔍'
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

  // Generate 100-cell Grid with Guaranteed Target Placements
  const generateGrid = useCallback(() => {
    const e = engine.current;
    const newTarget = getRandomString();
    targetRef.current = newTarget;
    setTargetString(newTarget);

    const newCells = Array.from({ length: 100 }, () => ({
      text: getRandomString(),
      status: 'normal', // 'normal' | 'hit' | 'miss'
    }));

    // Ensure at least 2 guaranteed target instances in grid
    const targetCount = Math.min(2 + Math.floor(e.level / 3), 6);
    const usedPositions = new Set();
    while (usedPositions.size < targetCount) {
      const pos = Math.floor(Math.random() * 100);
      usedPositions.add(pos);
      newCells[pos].text = newTarget;
    }

    cellsRef.current = newCells;
    setCells([...newCells]);
  }, []);

  // Entropy Corruptor (Regenerates 3 non-target cells every 700ms)
  const applyEntropyNoise = useCallback(() => {
    if (!gameActiveRef.current) return;
    const currentTarget = targetRef.current;
    const updated = [...cellsRef.current];

    let corrupted = 0;
    while (corrupted < 3) {
      const idx = Math.floor(Math.random() * 100);
      if (updated[idx].text !== currentTarget && updated[idx].status === 'normal') {
        updated[idx].text = getRandomString();
        corrupted++;
      }
    }

    cellsRef.current = updated;
    setCells(updated);
  }, []);

  // Handle Cell Click
  const handleCellClick = useCallback((index, evt) => {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    const now = performance.now();
    if (now - lastClickTimeRef.current < 120) return;
    lastClickTimeRef.current = now;

    if (!gameActiveRef.current || isProcessing) return;

    const e = engine.current;
    const cell = cellsRef.current[index];
    const isTargetMatch = cell.text === targetRef.current;

    if (!isTargetMatch) {
      // WRONG CELL CLICKED — NO negative score or time deduction! Red flash & penalty sound.
      e.missedClicks++;

      // DO NOT reduce difficulty on miss — level remains unchanged!
      const updated = [...cellsRef.current];
      updated[index].status = 'miss';
      cellsRef.current = updated;
      setCells(updated);

      drillAudio?.playPenalty?.();
      triggerFlash();

      setTimeout(() => {
        if (!gameActiveRef.current) return;
        const resetCells = [...cellsRef.current];
        resetCells[index].status = 'normal';
        cellsRef.current = resetCells;
        setCells(resetCells);
      }, 400);
    } else {
      // PERFECT TARGET MATCH
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
      drillAudio?.playHit?.();

      // Replace hit target with new random char and spawn new target if none left
      const updated = [...cellsRef.current];
      updated[index].text = getRandomString();
      updated[index].status = 'hit';
      cellsRef.current = updated;
      setCells(updated);

      // Check if target still exists on grid; if not, generate new target
      const remainingTargets = updated.filter((c) => c.text === targetRef.current).length;
      if (remainingTargets === 0) {
        generateGrid();
      }

      setTimeout(() => {
        if (!gameActiveRef.current) return;
        const resetCells = [...cellsRef.current];
        resetCells[index].status = 'normal';
        cellsRef.current = resetCells;
        setCells(resetCells);
      }, 300);
    }
  }, [generateGrid, isProcessing, triggerFlash]);

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

      generateGrid();

      // Start Entropy Noise Generator (every 700ms)
      if (entropyIntervalRef.current) clearInterval(entropyIntervalRef.current);
      entropyIntervalRef.current = setInterval(applyEntropyNoise, 700);

      // Target swap interval (every 12s)
      if (targetSwapIntervalRef.current) clearInterval(targetSwapIntervalRef.current);
      targetSwapIntervalRef.current = setInterval(generateGrid, 12000);
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [applyEntropyNoise, clearGameTimeouts, endGame, generateGrid]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/visual/visual-recognition/entropic-grid';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🔍' },
        newBest: isNewBest,
        drillName: 'Entropic Grid Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Peak Level: Lvl ${analytics.finalLevel}) on Entropic Grid Pro! Accuracy: ${analytics.accuracy}%. Train visual focus at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Focus Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              ENTROPIC GRID
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Visual Noise Suppression & Code Recognition
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-blue-400 tabular-nums">{uiScore}</div>
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
            isFullscreen ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] flex flex-col items-center justify-center' : 'w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] max-md:portrait:aspect-[3/4] max-md:portrait:min-h-[420px] max-md:portrait:max-h-[76vh] max-md:landscape:min-h-[340px] max-md:landscape:max-h-[85vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col'
          }
        >
          {/* DOM Flash Overlay (Red only) */}
          <DrillFlashOverlay flashes={flashes} />

          {/* IN-BOX OVERLAY HUD */}
          {gameState === 'playing' && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                <p className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-tight">{uiScore}</p>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time Left</p>
                <p className={`text-2xl sm:text-3xl font-black tabular-nums leading-tight ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</p>
              </div>
            </>
          )}

          {/* IN-GAME HUD SOUND + FLASH TOGGLES */}
          {gameState === 'playing' && (
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* GAMEPLAY AREA */}
          {gameState === 'playing' && (
            <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-5 w-full h-full relative z-20 overflow-hidden my-auto">
              
              {/* Target Display Indicator */}
              <div className="mb-2 flex flex-col items-center justify-center shrink-0">
                <span className="text-blue-400 font-extrabold uppercase tracking-widest text-[11px] sm:text-xs flex items-center gap-1.5 mb-0.5">
                  <Crosshair className="w-3.5 h-3.5" /> FIND TARGET CODE
                </span>
                <div className="px-3.5 py-0.5 sm:py-1 rounded-xl bg-blue-600/20 border border-blue-500/40 text-xl sm:text-3xl font-black tracking-widest text-white font-mono shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  {targetString}
                </div>
              </div>

              {/* 10x10 GRID VIEWPORT */}
              <div 
                className="relative mx-auto my-auto border border-white/10 bg-black/80 rounded-2xl p-1.5 sm:p-2 grid grid-cols-10 gap-0.5 sm:gap-1"
                style={{ 
                  width: 'min(88vw, 44vh)',
                  height: 'min(88vw, 44vh)',
                  aspectRatio: '1/1'
                }}
              >
                {cells.map((cell, index) => {
                  let bgClass = "bg-white/[0.04] text-slate-300 border-white/5 hover:bg-white/10";
                  if (cell.status === 'hit') {
                    bgClass = "bg-green-600/60 text-white border-green-400 scale-95 shadow-[0_0_10px_rgba(34,197,94,0.5)]";
                  } else if (cell.status === 'miss') {
                    bgClass = "bg-red-600/60 text-white border-red-400 scale-95 shadow-[0_0_10px_rgba(239,68,68,0.5)]";
                  }

                  return (
                    <button
                      key={index}
                      onPointerDown={(e) => handleCellClick(index, e)}
                      onClick={(e) => handleCellClick(index, e)}
                      className={`w-full h-full rounded-md border flex items-center justify-center font-mono font-bold text-[9px] sm:text-[11px] md:text-xs select-none transition-all duration-100 cursor-pointer ${bgClass}`}
                    >
                      {cell.text}
                    </button>
                  );
                })}
              </div>

            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Crosshair}
              accent="blue"
              title="Entropic Grid"
              subtitle="Visual Noise Suppression • Target Recognition"
              rules={[
                { icon: Target, accent: 'blue', title: 'Find Target Code', text: 'Scan noisy letter grid to locate target code pair (+150 PTS)' },
                { icon: Zap, accent: 'cyan', title: 'Dynamic Noise Reshuffle', text: 'Distractor grid elements reshuffle every 700ms under timed pressure' },
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
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(59,130,246,.12), transparent 70%)' }}>
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
                    type="button"
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5 relative z-50 pointer-events-auto"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DrillRuleItem num="1" text="Find Target Code Cell" highlight="+150 PTS" result="Target Match" />
                <DrillRuleItem num="2" text="Progressive Difficulty" highlight="Up to 6 Live Targets" result="Guaranteed placements grow with level" />
                <DrillRuleItem num="3" text="Entropy Noise Engine" highlight="700ms Regeneration" result="Dynamic visual noise" />
                <DrillRuleItem num="4" text="Miss / Timeout" highlight="Zero Penalties" result="No score or time loss" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Entropic Grid Pro"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-blue-400" /> What Is Entropic Grid Training?
                  </h4>
                  <p className="text-sm leading-relaxed mb-3">
                    <strong>Entropic Grid Training</strong> is an advanced visual search and concentration drill designed to measure visual noise suppression capacity. The <strong>Entropic Grid drill</strong> presents a 100-cell alphanumeric grid with dynamic entropy noise continuously regenerating background characters, testing your ability to isolate and click specific 2-character targets.
                  </p>
                  <p className="text-sm leading-relaxed">
                    By practicing <strong>peripheral visual noise filtering</strong>, you expand your visual search field and increase target recognition speed under high-distraction environments.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Gamers improving visual scanning speed, pilots & drivers enhancing visual focus under noise, and professionals building concentration stamina.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Visual search speed, selective attention, visual noise filtering, target recognition, and sustained concentration stamina.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Quadrant Scanning</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Scan the 100-cell grid systematically in 4 quadrants to rapidly isolate target codes despite background noise.</p>
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
                <DrillFAQItem q="What is the Entropic Grid Drill?" a="A free visual search and concentration exercise. Find target 2-character codes on a 100-cell grid while entropy noise continuously reshuffles background cells." />
                <DrillFAQItem q="How does progressive difficulty work?" a="Every 5 targets found you level up, the target code swaps to a new 12-second cycle, and the number of guaranteed live target cells on the grid grows (up to 6)." />
                <DrillFAQItem q="Are there negative score or time penalties?" a="No. Tapping a wrong cell never deducts score points or reduces remaining timer seconds — the cell just flashes red and you keep scanning." />
                <DrillFAQItem q="Does difficulty decrease on mistakes?" a="No. Your level only ever goes up — a mistake never takes you back down, so you can safely master your current grid size." />
                <DrillFAQItem q="How long does each drill session last?" a="Each round is timed for exactly 45 seconds of continuous focus." />
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
                  className="group bg-[#0c0c16] border border-white/5 hover:border-blue-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-blue-400 mt-3 flex items-center gap-1 transition-colors">
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
