'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
  Brain, RefreshCw,
  TrendingUp, Volume2, VolumeX,
  Zap, ZapOff, Users, Share2, ArrowLeft,
  Route
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
const ELITE_SCORE = 1000; // Target score for S+ rating (rebalanced after combo removal)
const STORAGE_KEY = 'skilldrills_memory_path_tracing_v4';

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

export default function PathTracingClient({ copy = null }) {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const { flashes, triggerFlash } = useDrillFlash();

  // Grid & Path Memory State
  const [gridSize, setGridSize] = useState(3);
  const [level, setLevel] = useState(1);
  const [phase, setPhase] = useState('showing'); // 'showing' | 'drawing' | 'result'
  const [path, setPath] = useState([]);
  const [userPath, setUserPath] = useState([]);
  const [currentDot, setCurrentDot] = useState(null);
  const [wrongDotIndex, setWrongDotIndex] = useState(null);
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
  const startingRef = useRef(false);
  const gameActiveRef = useRef(false);
  const phaseRef = useRef('showing');

  const engine = useRef({
    score: 0,
    level: 1,
    timeLeft: DRILL_DURATION,
    perfectHits: 0,
    missedClicks: 0,
    gridSize: 3,
    path: [],
    userPath: [],
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
    markIntentionalExit();
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

  // Calculate Grid Size based on level
  const getGridSizeForLevel = useCallback((lvl) => {
    const pathLength = lvl + 2;
    if (pathLength <= 5) return 3;
    if (pathLength <= 8) return 4;
    if (pathLength <= 12) return 5;
    if (pathLength <= 16) return 6;
    return 7;
  }, []);

  // Generate Non-Repeating Adjacent Path
  const generatePath = useCallback(() => {
    const e = engine.current;
    const size = getGridSizeForLevel(e.level);
    e.gridSize = size;
    setGridSize(size);

    const totalCells = size * size;
    const targetLength = Math.min(e.level + 2, totalCells);

    const generatedPath = [];
    const usedCells = new Set();

    let curr = Math.floor(Math.random() * totalCells);
    generatedPath.push(curr);
    usedCells.add(curr);

    const getNeighbors = (index) => {
      const neighbors = [];
      const row = Math.floor(index / size);
      const col = index % size;

      if (row > 0) neighbors.push(index - size);
      if (row < size - 1) neighbors.push(index + size);
      if (col > 0) neighbors.push(index - 1);
      if (col < size - 1) neighbors.push(index + 1);

      return neighbors.filter((n) => !usedCells.has(n));
    };

    while (generatedPath.length < targetLength) {
      const neighbors = getNeighbors(curr);
      if (neighbors.length === 0) break;
      curr = neighbors[Math.floor(Math.random() * neighbors.length)];
      generatedPath.push(curr);
      usedCells.add(curr);
    }

    e.path = generatedPath;
    setPath(generatedPath);
    setWrongDotIndex(null);
    setCurrentDot(null);
  }, [getGridSizeForLevel]);

  // Sequence Player & Cycle Handler
  const startSequenceCycle = useCallback(() => {
    if (!gameActiveRef.current) return;
    clearGameTimeouts();

    generatePath();

    setPhase('showing');
    phaseRef.current = 'showing';
    setIsProcessing(true);
    setUserPath([]);
    engine.current.userPath = [];

    const currentPath = engine.current.path;

    // Play Path Demonstration (500ms per step)
    currentPath.forEach((cellIdx, stepIdx) => {
      const tStep = setTimeout(() => {
        if (!gameActiveRef.current || phaseRef.current !== 'showing') return;
        setCurrentDot(cellIdx);
        drillAudio?.playTick?.();

        const tOff = setTimeout(() => {
          if (!gameActiveRef.current || phaseRef.current !== 'showing') return;
          setCurrentDot(null);

          // Once demonstration ends, start user drawing phase
          if (stepIdx === currentPath.length - 1) {
            setPhase('drawing');
            phaseRef.current = 'drawing';
            setIsProcessing(false);

            // 10s Timeout for drawing phase
            const tDrawTimeout = setTimeout(() => {
              if (gameActiveRef.current && phaseRef.current === 'drawing') {
                const e = engine.current;
                e.missedClicks++;

                // DO NOT reduce difficulty on timeout — difficulty stays at current level!
                drillAudio?.playPenalty?.();
                triggerFlash();

                setPhase('result');
                phaseRef.current = 'result';

                const tNext = setTimeout(() => {
                  if (gameActiveRef.current && startSequenceCycleRef.current) {
                    startSequenceCycleRef.current();
                  }
                }, 1000);
                gameTimeoutsRef.current.push(tNext);
              }
            }, 10000);

            gameTimeoutsRef.current.push(tDrawTimeout);
          }
        }, 350);

        gameTimeoutsRef.current.push(tOff);
      }, stepIdx * 500);

      gameTimeoutsRef.current.push(tStep);
    });
  }, [clearGameTimeouts, generatePath, triggerFlash]);

  useEffect(() => {
    startSequenceCycleRef.current = startSequenceCycle;
  }, [startSequenceCycle]);

  // Handle cell click during drawing phase
  const handleCellClick = useCallback((index, evt) => {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    if (phaseRef.current !== 'drawing' || isProcessing || !gameActiveRef.current) return;

    const e = engine.current;
    const currentStepIndex = e.userPath.length;
    const expectedCell = e.path[currentStepIndex];

    if (index !== expectedCell) {
      // WRONG STEP CLICKED — NO negative score or time deduction! Red flash & penalty sound.
      clearGameTimeouts();
      setIsProcessing(true);
      setWrongDotIndex(index);
      e.missedClicks++;

      // DO NOT reduce difficulty on miss — level remains unchanged!
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

    // VALID STEP SELECTION
    const newUserPath = [...e.userPath, index];
    e.userPath = newUserPath;
    setUserPath(newUserPath);
    drillAudio?.playTick?.();

    // CHECK PATH COMPLETION
    if (newUserPath.length === e.path.length) {
      clearGameTimeouts();
      setIsProcessing(true);
      e.perfectHits++;
      e.score += POINTS_PER_HIT;

      // Advance difficulty level
      e.level = e.level + 1;

      setUiScore(e.score);
      setLevel(e.level);
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
  }, [clearGameTimeouts, isProcessing, triggerFlash]);

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
    setGridSize(3);
    setPhase('showing');

    engine.current = {
      score: 0,
      level: 1,
      timeLeft: DRILL_DURATION,
      perfectHits: 0,
      missedClicks: 0,
      gridSize: 3,
      path: [],
      userPath: [],
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
    const url = 'https://skilldrills.online/drills/memory/spatial-memory/path-tracing';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.grade || analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🗺️' },
        newBest: isNewBest,
        drillName: 'Path Tracing Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Peak Level: ${analytics.finalLevel}) on Path Tracing Pro! Accuracy: ${analytics.accuracy}%. Train spatial memory at skilldrills.online!`;
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
              <span data-seo-kw="1">{copy?.h1Keyword || "Path Tracing Memory Test"}</span>
              {copy?.h1Suffix || null}
            </h1>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              {copy?.subtitle || "Spatial span is the longest sequence of positions you can retrace in order. The Corsi block-tapping task, the standard measure, puts most adults around five to seven steps (Milner, 1971; Corsi, 1972), and it draws on a different store from verbal digit span (Logie, 1995)."}
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: copy?.statScore || "Score", val: uiScore, color: "text-amber-400" },
              { label: copy?.statTime || "Time", val: `${uiTimeLeft}s`, highlight: uiTimeLeft <= 10 },
              { label: copy?.statLevel || "Level", val: `${copy?.levelPrefix || "Lv."} ${level}`, color: "text-indigo-400" },
              { label: copy?.statBestScore || "Best Score", val: bestScore, color: "text-purple-400" },
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* GAMEPLAY CANVAS AREA */}
          {gameState === 'playing' && (
            <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 w-full h-full relative z-20 overflow-hidden my-auto">

              {/* NO TEXT OR BAR ABOVE GRID IN DEMO PHASE (CLEAN SPACER) */}
              {phase === 'showing' && (
                <div className="h-6 sm:h-8 mb-2 sm:mb-4 shrink-0" />
              )}

              {phase === 'drawing' && (
                <div className="flex gap-2 mb-2 sm:mb-4 justify-center w-full max-w-[280px] sm:max-w-[360px] flex-wrap shrink-0">
                  {Array.from({ length: path.length }).map((_, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i < userPath.length ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] scale-110' : 'bg-white/20'}`} />
                  ))}
                </div>
              )}

              {phase === 'result' && (
                <div className="h-6 sm:h-8 mb-2 sm:mb-4 shrink-0" />
              )}

              {/* INTERACTIVE GRID CONTAINER (PORTRAIT & MOBILE PERFECTLY CENTERED) */}
              <div
                className={`grid mx-auto my-auto place-content-center ${gridSize >= 5 ? 'gap-1 sm:gap-1.5' : 'gap-1.5 sm:gap-2.5'}`}
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                  width: 'min(70vw, 35vh)',
                  height: 'min(70vw, 35vh)',
                  aspectRatio: '1/1'
                }}
              >
                {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                  const isCurrentDemoDot = currentDot === i;
                  const isUserStep = userPath.includes(i);
                  const isWrongStep = wrongDotIndex === i;
                  const isPathPoint = path.includes(i);

                  let cellStyle = "bg-white/[0.04] border border-white/10";

                  if (phase === 'showing') {
                    if (isCurrentDemoDot) {
                      cellStyle = "bg-amber-500 border-amber-300 scale-105";
                    }
                  } else if (phase === 'drawing') {
                    if (isUserStep) {
                      cellStyle = "bg-amber-500 border-amber-300 scale-95";
                    } else {
                      cellStyle = "bg-white/[0.04] border border-white/10 hover:bg-white/10 active:scale-95 transition-all cursor-pointer";
                    }
                  } else if (phase === 'result') {
                    if (isWrongStep) {
                      cellStyle = "bg-red-600 border-red-400";
                    } else if (isPathPoint) {
                      cellStyle = "bg-amber-500/60 border border-amber-400/60";
                    }
                  }

                  return (
                    <button
                      key={i}
                      onPointerDown={(e) => handleCellClick(i, e)}
                      disabled={phase !== 'drawing' || isProcessing}
                      className={`w-full aspect-square rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-150 ease-out focus:outline-none touch-none border ${cellStyle}`}
                      aria-label="Grid Cell"
                    >
                      {isUserStep && (
                        <span className="text-xs sm:text-sm font-black text-black font-mono">
                          {userPath.indexOf(i) + 1}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Route}
              accent="amber"
              title={copy?.startTitle || "Path Tracing Pro"}
              subtitle={copy?.startSubtitle || "Spatial Path Memory • Progressive Step Tracing"}
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
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(245,158,11,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    {copy?.newBest || "NEW BEST"}
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
                    <p className="text-sm sm:text-base font-black text-white">{copy?.levelPrefix || "Lv."} {analytics.finalLevel}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{copy?.statPeakLevel || "Peak Level"}</p>
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
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
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
                { num: "1", text: "Memorize & Retrace Path Sequence", highlight: "+150 PTS", result: "Level Up (+1 Step)" },
                { num: "2", text: "Level Progression", highlight: "Grid 3x3 → 7x7", result: "Difficulty naturally scales" },
                { num: "3", text: "Miss / Timeout", highlight: "Zero Penalties", result: "No score or time loss" },
                { num: "4", text: "Difficulty Never Drops", highlight: "Stays at Current Level", result: "A miss just replays the round" }
              ]).map((r, i) => (
                <DrillRuleItem key={i} num={r.num} text={r.text} highlight={r.highlight} result={r.result} />
              ))}
            </div>
          </DrillAccordion>

          {/* ACCORDION 2: ABOUT PATH TRACING */}
          <DrillAccordion
            id="about"
            title={copy?.aboutTitle || "About Path Tracing Memory Test"}
            isOpen={openAccordion === 'about'}
            onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
          >
            <div className="space-y-8">
              <section>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-amber-400" /> What Is Path Tracing Training?
                </h3>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>Path Tracing Training</strong> is an advanced spatial sequence memory drill designed to measure route tracing capacity. The <strong>Path Tracing drill</strong> demonstrates animated step paths on 3x3 to 7x7 matrices, testing your ability to lock in and retrace directional routes in exact order.
                </p>
                <p className="text-sm leading-relaxed">
                  By practicing <strong>sequential spatial chunking</strong>, you expand your visual short-term memory buffer and increase your route navigation speed under time pressure.
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                    <h4 className="text-xs font-bold text-white">Who Should Use This?</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Strategy & MOBA gamers improving map route tracing, STEM students strengthening spatial navigation, and professionals enhancing sequential memory.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                    <h4 className="text-xs font-bold text-white">Skills Improved</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Spatial path memory, route tracing, sequential visual memory, and directional spatial navigation.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                    <h4 className="text-xs font-bold text-white">Path Chunking</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Group individual dot steps into directional vectors (e.g. Up-Right-Down) to memorize longer path lengths effortlessly.</p>
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
