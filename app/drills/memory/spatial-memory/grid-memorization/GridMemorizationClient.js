'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
  Brain, Play, RefreshCw, TrendingUp, Volume2, VolumeX,
  Zap, ZapOff, Users, Share2, ArrowLeft, Grid3X3
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { drillFlash } from '../../../../../lib/drillFlash';
import { getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import useDrillFlash from '../../../../../lib/useDrillFlash';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import DrillFlashOverlay from '../../../../../components/drill/DrillFlashOverlay';
import DrillRuleItem from '../../../../../components/drill/DrillRuleItem';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

const DRILL_DURATION = 45; // 45 seconds duration
const POINTS_PER_HIT = 150;
const ELITE_SCORE = 1150; // Target score for S+ rating (rebalanced after combo removal)
const STORAGE_KEY = 'skilldrills_memory_grid_memorization_v4';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, bestLevel: 4, totalSessions: 0 };
    return { bestScore: 0, bestLevel: 4, totalSessions: 0, ...JSON.parse(raw) };
  } catch (e) {
    return { bestScore: 0, bestLevel: 4, totalSessions: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

export default function GridMemorizationClient({ copy = null }) {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const { flashes, triggerFlash } = useDrillFlash();

  // Grid Gameplay State
  const [gridSize, setGridSize] = useState(4);
  const [litCells, setLitCells] = useState(5);
  const [cellStates, setCellStates] = useState([]);
  const [phase, setPhase] = useState('memorize'); // 'memorize' | 'recall' | 'result'
  const [userSelections, setUserSelections] = useState(new Set());
  const [isProcessing, setIsProcessing] = useState(false);

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [bestLevel, setBestLevel] = useState(4);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    perfectHits: 0,
    missedClicks: 0,
    finalLevel: 4,
    grade: null,
  });

  // DOM & Engine Refs
  const containerRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  const gameTimeoutsRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const startingRef = useRef(false);
  const gameActiveRef = useRef(false);
  const phaseRef = useRef('memorize');

  const engine = useRef({
    score: 0,
    gridSize: 4,
    litCells: 5,
    timeLeft: DRILL_DURATION,
    perfectHits: 0,
    missedClicks: 0,
    correctPattern: new Set(),
    userSelections: new Set(),
  });

  const startSequenceCycleRef = useRef(null);

  const clearGameTimeouts = useCallback(() => {
    gameTimeoutsRef.current.forEach(clearTimeout);
    gameTimeoutsRef.current = [];
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

  // Stop all timers/intervals on unmount (e.g. in-app nav away mid-drill) —
  // visibilitychange/pagehide don't fire on SPA route changes.
  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
      gameTimeoutsRef.current.forEach(clearTimeout);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      gameActiveRef.current = false;
      startingRef.current = false;
    };
  }, []);

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

    const grade = getFpsScoreGrade(e.score, ELITE_SCORE);

    setAnalytics({
      accuracy: finalAccuracy,
      perfectHits: e.perfectHits,
      missedClicks: e.missedClicks,
      finalLevel: e.litCells,
      grade,
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const updatedData = {
      bestScore: Math.max(prevSaved.bestScore, e.score),
      bestLevel: Math.max(prevSaved.bestLevel, e.litCells),
      totalSessions: (prevSaved.totalSessions || 0) + 1,
    };
    saveData(updatedData);

    setBestScore(updatedData.bestScore);
    setBestLevel(updatedData.bestLevel);

    drillAudio?.playSessionEnd?.();
  }, [clearGameTimeouts]);

  // Pattern Generator
  const generatePattern = useCallback((size, litCount) => {
    const totalCells = size * size;
    const pattern = new Set();
    while (pattern.size < litCount) {
      pattern.add(Math.floor(Math.random() * totalCells));
    }
    return pattern;
  }, []);

  const startRecallPhase = useCallback(() => {
    setPhase('recall');
    phaseRef.current = 'recall';
    setUserSelections(new Set());
    engine.current.userSelections = new Set();
  }, []);

  // Sequence Player & Cycle Handler
  const startSequenceCycle = useCallback(() => {
    if (!gameActiveRef.current) return;
    clearGameTimeouts();

    const e = engine.current;
    const size = e.gridSize;
    const litCount = e.litCells;

    const pattern = generatePattern(size, litCount);
    e.correctPattern = pattern;

    const states = Array(size * size).fill(false);
    pattern.forEach((idx) => { states[idx] = true; });

    setCellStates(states);
    setGridSize(size);
    setLitCells(litCount);

    setPhase('memorize');
    phaseRef.current = 'memorize';
    setIsProcessing(false);
    setUserSelections(new Set());
    e.userSelections = new Set();

    drillAudio?.playTick?.();

    // 1.5 Seconds Memorization Time (1500ms)
    const tMemTimer = setTimeout(() => {
      if (!gameActiveRef.current || phaseRef.current !== 'memorize') return;
      startRecallPhase();
    }, 1500);

    gameTimeoutsRef.current.push(tMemTimer);
  }, [clearGameTimeouts, generatePattern, startRecallPhase]);

  useEffect(() => {
    startSequenceCycleRef.current = startSequenceCycle;
  }, [startSequenceCycle]);

  // Handle cell selection
  const toggleCell = useCallback((index, evt) => {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    if (phaseRef.current !== 'recall' || isProcessing || !gameActiveRef.current) return;

    const e = engine.current;
    const correctPattern = e.correctPattern;

    // WRONG CELL CLICKED — NO negative score or time deduction! Red flash & penalty sound.
    if (!correctPattern.has(index)) {
      setIsProcessing(true);
      e.missedClicks++;

      // DO NOT reduce difficulty on miss — difficulty remains at current level
      drillAudio?.playPenalty?.();
      triggerFlash();

      setPhase('result');
      phaseRef.current = 'result';

      const t = setTimeout(() => {
        if (gameActiveRef.current && startSequenceCycleRef.current) {
          startSequenceCycleRef.current();
        }
      }, 1000);
      gameTimeoutsRef.current.push(t);
      return;
    }

    // VALID CELL SELECTION
    const newSelections = new Set(e.userSelections);
    if (!newSelections.has(index)) {
      newSelections.add(index);
      e.userSelections = newSelections;
      setUserSelections(newSelections);
      drillAudio?.playTick?.();
    }

    // CHECK GRID COMPLETION
    if (newSelections.size === correctPattern.size) {
      setIsProcessing(true);
      e.perfectHits++;
      e.score += POINTS_PER_HIT;

      // Advance difficulty
      if (e.gridSize === 4 && e.litCells < 7) {
        e.litCells += 1;
      } else if (e.gridSize === 4 && e.litCells >= 7) {
        e.gridSize = 5;
        e.litCells = 5;
      } else if (e.gridSize === 5 && e.litCells < 12) {
        e.litCells += 1;
      }

      setUiScore(e.score);
      setLitCells(e.litCells);
      drillAudio?.playHit?.();

      setPhase('result');
      phaseRef.current = 'result';

      const t = setTimeout(() => {
        if (gameActiveRef.current && startSequenceCycleRef.current) {
          startSequenceCycleRef.current();
        }
      }, 600);
      gameTimeoutsRef.current.push(t);
    }
  }, [isProcessing, triggerFlash]);

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
    setGridSize(4);
    setLitCells(5);
    setPhase('memorize');

    engine.current = {
      score: 0,
      gridSize: 4,
      litCells: 5,
      timeLeft: DRILL_DURATION,
      perfectHits: 0,
      missedClicks: 0,
      correctPattern: new Set(),
      userSelections: new Set(),
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

      startSequenceCycle();
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [clearGameTimeouts, endGame, startSequenceCycle]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/memory/spatial-memory/grid-memorization';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.grade || analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🧩' },
        newBest: isNewBest,
        drillName: 'Grid Memorization Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Peak Grid Level: ${analytics.finalLevel} cells) on Grid Memorization Pro! Accuracy: ${analytics.accuracy}%. Train spatial memory at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Memory Score', text, url }).catch(() => {});
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
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {copy?.h1Prefix || null}
              <span data-seo-kw="1">{copy?.h1Keyword || "Visual Memory Test"}</span>
              {copy?.h1Suffix || null}
            </h1>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              {copy?.caption || "Visual working memory stores roughly four objects at once, and the limit is the number of objects rather than the detail in each (Luck & Vogel, 1997). Static grid patterns test the visual cache, the passive store for form and layout (Logie, 1995)."}
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: copy?.statScore || "Score", val: uiScore, color: "text-purple-400" },
              { label: copy?.statTime || "Time", val: `${uiTimeLeft}s`, highlight: uiTimeLeft <= 10 },
              { label: copy?.statGridSize || "Grid Size", val: `${gridSize}x${gridSize}`, color: "text-indigo-400" },
              { label: copy?.statBest || "Best Score", val: bestScore, color: "text-amber-400" },
            ].map((s, i) => (
              <div key={i} className="border border-white/[0.06] bg-white/[0.015] px-2 py-2 rounded-xl text-center">
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">{s.label}</div>
                <div className={`text-xs sm:text-sm md:text-base font-black tabular-nums truncate ${s.highlight ? "text-red-400 animate-pulse" : s.color || "text-white"}`}>{s.val}</div>
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
          {/* DOM Flash Overlay (Red only) */}
          <DrillFlashOverlay flashes={flashes} />

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.hudScore || "Score"}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{uiScore}</p>
              </div>

              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.hudTime || "Time"}</p>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* GAMEPLAY CANVAS AREA */}
          {gameState === 'playing' && (
            <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 w-full h-full relative z-20 overflow-hidden my-auto">
              
              {/* MEMORIZE PHASE INDICATOR (NO SKIP BUTTON, 1.5s DURATION) */}
              {phase === 'memorize' && (
                <div className="h-6 sm:h-8 mb-2 sm:mb-4 shrink-0" />
              )}

              {phase === 'recall' && (
                <div className="flex gap-2 mb-2 sm:mb-4 justify-center w-full max-w-[280px] sm:max-w-[360px] flex-wrap shrink-0">
                  {Array.from({ length: litCells }).map((_, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i < userSelections.size ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] scale-110' : 'bg-white/20'}`} />
                  ))}
                </div>
              )}

              {phase === 'result' && (
                <div className="h-6 sm:h-8 mb-2 sm:mb-4 shrink-0" />
              )}

              {/* INTERACTIVE GRID CONTAINER (PORTRAIT & MOBILE PERFECTLY CENTERED) */}
              <div 
                className={`grid mx-auto my-auto place-content-center ${gridSize === 5 ? 'gap-2 sm:gap-3' : 'gap-2.5 sm:gap-4'}`}
                style={{ 
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                  width: 'min(88vw, 44vh)',
                  height: 'min(88vw, 44vh)',
                  aspectRatio: '1/1'
                }}
              >
                {cellStates.map((isLit, i) => {
                  let cellStyle = "bg-white/[0.04] border border-white/10"; 
                  
                  if (phase === 'memorize') {
                    if (isLit) cellStyle = "bg-purple-600 border-purple-400";
                  } 
                  else if (phase === 'recall') {
                    if (userSelections.has(i)) cellStyle = "bg-cyan-500 border-cyan-300 scale-95";
                    else cellStyle = "bg-white/[0.04] border border-white/10 hover:bg-white/10 active:scale-95 transition-all cursor-pointer";
                  } 
                  else if (phase === 'result') {
                    if (isLit) cellStyle = "bg-emerald-500 border-emerald-300";
                    else if (userSelections.has(i)) cellStyle = "bg-red-600 border-red-400"; 
                  }

                  return (
                    <button
                      key={i}
                      onPointerDown={(e) => toggleCell(i, e)}
                      disabled={phase !== 'recall' || isProcessing}
                      className={`w-full h-full aspect-square rounded-xl sm:rounded-2xl transition-all duration-150 ease-out focus:outline-none touch-none ${cellStyle}`}
                      aria-label="Grid Cell"
                    />
                  );
                })}
              </div>

            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Grid3X3}
              accent="purple"
              title={copy?.startTitle || "Grid Memorization Pro"}
              subtitle={copy?.startSubtitle || "Spatial Short-Term Memory • Pattern Recall"}
              isTouchOnlyDevice={false}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY (3-2-1-GO) */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle={copy?.countdownSubtitle || "GET READY"} />
          )}

          {/* END SCREEN (GAME OVER) */}
          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              {/* Left Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(168,85,247,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    {copy?.newBest || "NEW BEST"}
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade?.color || 'text-purple-400'}`}>
                  {analytics.grade?.grade || analytics.grade?.letter || 'C'}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1">
                  {analytics.grade?.label || 'Good Effort'}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 tabular-nums">
                  {uiScore}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500">{copy?.pointsLabel || "Points"}</div>
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
                    <p className="text-sm sm:text-base font-black text-white">{analytics.finalLevel} {copy?.cellsUnit || "Cells"}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{copy?.statPeakPattern || "Peak Pattern"}</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.perfectHits}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{copy?.statPerfects || "Perfects"}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> {copy?.btnPlayAgain || "Play Again"}
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
                    title="Exit Drill & Return"
                  >
                    <ArrowLeft className="w-4 h-4 text-red-400" />
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
              {(copy?.rulesItems || [
                { num: "1", text: "Pattern Recall", highlight: "+150 PTS", result: "Memorize lit cell positions & tap tiles to recreate" },
                { num: "2", text: "Level Progression", highlight: "Grid 4x4 → 5x5", result: "Difficulty naturally scales" },
                { num: "3", text: "Miss / Timeout", highlight: "Zero Penalties", result: "No score or time loss" },
                { num: "4", text: "Difficulty Never Drops", highlight: "Stays at Current Level", result: "A miss just replays the round" }
              ]).map((item, idx) => (
                <DrillRuleItem key={idx} num={item.num} text={item.text} highlight={item.highlight} result={item.result} />
              ))}
            </div>
          </DrillAccordion>

          {/* ACCORDION 2: ABOUT GRID MEMORIZATION PRO */}
          <DrillAccordion
            id="about"
            title="About Grid Memorization Pro"
            isOpen={openAccordion === 'about'}
            onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
          >
            <div className="space-y-8">
              <section>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" /> What Is Grid Memorization Training?
                </h3>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>Grid Memorization Training</strong> is a core spatial working memory exercise designed to measure visual pattern recall. The <strong>Grid Memorization drill</strong> presents illuminated cell patterns on 4x4 to 5x5 matrices, testing your ability to encode spatial maps and recreate them accurately.
                </p>
                <p className="text-sm leading-relaxed">
                  By practicing <strong>spatial shape chunking</strong>, you expand your visual short-term memory buffer and increase your pattern recognition speed under time pressure.
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                    <h4 className="text-xs font-bold text-white">Who Should Use This?</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Gamers improving map awareness, STEM students strengthening spatial reasoning, and professionals wanting to enhance visual pattern retention.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                    <h4 className="text-xs font-bold text-white">Skills Improved</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Spatial short-term memory, working memory span, pattern recognition, and visual precision under pressure.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                    <h4 className="text-xs font-bold text-white">Spatial Chunking</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Group lit cells into familiar shapes (like an &apos;L&apos;, square, or line) to bypass standard visual memory limits and handle larger grids.</p>
                </div>
              </div>

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
