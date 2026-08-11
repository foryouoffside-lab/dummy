'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Brain, Play, RefreshCw,
  TrendingUp, Volume2, VolumeX,
  Zap, ZapOff, Users, Share2, ArrowLeft,
  MapPin, Target, Trophy
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
import DrillFAQItem from '../../../../../components/drill/DrillFAQItem';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';

const DRILL_DURATION = 45; // 45 seconds duration
const POINTS_PER_HIT = 150;
const ELITE_SCORE = 1000; // Target score for S+ rating (rebalanced after combo removal)
const STORAGE_KEY = 'skilldrills_memory_object_location_v4';
const EMOJI_OBJECTS = ["🌟", "💎", "🔑", "🎯", "🔥", "⭐", "💡", "🎵", "🌺", "🦋"];

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

export default function ObjectLocationClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const { flashes, triggerFlash } = useDrillFlash();

  // Grid & Object Memory State
  const [gridSize, setGridSize] = useState(3);
  const [level, setLevel] = useState(1);
  const [phase, setPhase] = useState('memorize'); // 'memorize' | 'locate' | 'result'
  const [objectLocations, setObjectLocations] = useState({});
  const [targetObject, setTargetObject] = useState('');
  const [wrongCellIndex, setWrongCellIndex] = useState(null);
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
  const phaseRef = useRef('memorize');

  const engine = useRef({
    score: 0,
    level: 1,
    timeLeft: DRILL_DURATION,
    perfectHits: 0,
    missedClicks: 0,
    gridSize: 3,
    objectLocations: {},
    targetObject: '',
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

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    setGameState('start');
  }, [clearGameTimeouts]);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  // Stop all timers/intervals on unmount (e.g. in-app nav away mid-drill) —
  // visibilitychange/pagehide/fullscreenchange don't fire on SPA route changes.
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

  // Calculate Grid Size based on level
  const getGridSizeForLevel = useCallback((lvl) => {
    const count = lvl + 1;
    if (count <= 8) return 3;
    if (count <= 15) return 4;
    if (count <= 24) return 5;
    if (count <= 35) return 6;
    return 7;
  }, []);

  // Generate Object Placements
  const generateObjects = useCallback(() => {
    const e = engine.current;
    const size = getGridSizeForLevel(e.level);
    e.gridSize = size;
    setGridSize(size);

    const totalCells = size * size;
    const numObjects = Math.min(e.level + 1, totalCells, EMOJI_OBJECTS.length);

    const locations = {};
    const usedPositions = new Set();
    const usedObjects = new Set();

    for (let i = 0; i < numObjects; i++) {
      let pos;
      do {
        pos = Math.floor(Math.random() * totalCells);
      } while (usedPositions.has(pos));
      usedPositions.add(pos);

      let obj;
      do {
        obj = EMOJI_OBJECTS[Math.floor(Math.random() * EMOJI_OBJECTS.length)];
      } while (usedObjects.has(obj));
      usedObjects.add(obj);

      locations[pos] = obj;
    }

    e.objectLocations = locations;
    setObjectLocations(locations);

    const placedObjects = Object.values(locations);
    const target = placedObjects[Math.floor(Math.random() * placedObjects.length)];

    e.targetObject = target;
    setTargetObject(target);
    setWrongCellIndex(null);
  }, [getGridSizeForLevel]);

  // Sequence Player & Cycle Handler
  const startSequenceCycle = useCallback(() => {
    if (!gameActiveRef.current) return;
    clearGameTimeouts();

    generateObjects();

    setPhase('memorize');
    phaseRef.current = 'memorize';
    setIsProcessing(false);

    drillAudio?.playTick?.();

    // 1.5 Seconds Memorization Time (1500ms)
    const tMem = setTimeout(() => {
      if (!gameActiveRef.current || phaseRef.current !== 'memorize') return;

      setPhase('locate');
      phaseRef.current = 'locate';

      // 8s Timeout for locate phase
      const tLocateTimeout = setTimeout(() => {
        if (gameActiveRef.current && phaseRef.current === 'locate') {
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
      }, 8000);

      gameTimeoutsRef.current.push(tLocateTimeout);
    }, 1500);

    gameTimeoutsRef.current.push(tMem);
  }, [clearGameTimeouts, generateObjects, triggerFlash]);

  useEffect(() => {
    startSequenceCycleRef.current = startSequenceCycle;
  }, [startSequenceCycle]);

  // Handle cell click in locate phase
  const handleCellClick = useCallback((index, evt) => {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    if (phaseRef.current !== 'locate' || isProcessing || !gameActiveRef.current) return;
    clearGameTimeouts();

    setIsProcessing(true);
    const e = engine.current;
    const isCorrect = e.objectLocations[index] === e.targetObject;

    if (!isCorrect) {
      // WRONG LOCATION — NO negative score or time deduction! Red flash & penalty sound.
      setWrongCellIndex(index);
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
    } else {
      // PERFECT LOCATION MATCH
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
    setPhase('memorize');

    engine.current = {
      score: 0,
      level: 1,
      timeLeft: DRILL_DURATION,
      perfectHits: 0,
      missedClicks: 0,
      gridSize: 3,
      objectLocations: {},
      targetObject: '',
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

      startSequenceCycle();
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [clearGameTimeouts, endGame, startSequenceCycle]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/memory/spatial-memory/object-location';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.grade || analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '📍' },
        newBest: isNewBest,
        drillName: 'Object Location Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Peak Level: ${analytics.finalLevel}) on Object Location Pro! Accuracy: ${analytics.accuracy}%. Train spatial memory at skilldrills.online!`;
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
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
            OBJECT LOCATION
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Spatial Object Memory Recall Under Speed Constraints
          </p>
        </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
        <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
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
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Level</div>
            <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">Lv. {level}</div>
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
            <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 w-full h-full relative z-20 overflow-hidden">
              
              <div className="flex flex-col items-center justify-center my-auto w-full">
                {/* MEMORIZE PHASE PROMPT BADGE DIRECTLY ABOVE GRID */}
                {phase === 'memorize' && (
                  <div className="mb-1.5 flex flex-col items-center justify-center shrink-0 animate-in fade-in duration-200">
                    <div className="px-3.5 py-1 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        MEMORIZE OBJECT LOCATIONS
                      </span>
                    </div>
                  </div>
                )}

                {/* TARGET PROMPT BADGE DIRECTLY ABOVE GRID */}
                {(phase === 'locate' || phase === 'result') && (
                  <div className="mb-1.5 flex flex-col items-center justify-center shrink-0 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-2 px-3.5 py-1 rounded-xl bg-cyan-950/60 border border-cyan-500/40">
                      <span className="text-xs font-black uppercase tracking-widest text-cyan-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> TARGET:
                      </span>
                      <span className="text-2xl sm:text-3xl">
                        {targetObject}
                      </span>
                    </div>
                  </div>
                )}

                {/* INTERACTIVE GRID CONTAINER (PORTRAIT & MOBILE PERFECTLY CENTERED) */}
                <div 
                  className={`grid mx-auto place-content-center ${gridSize >= 5 ? 'gap-1.5 sm:gap-2' : 'gap-2 sm:gap-3.5'}`}
                  style={{ 
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                    width: 'min(88vw, 44vh)',
                    height: 'min(88vw, 44vh)',
                    aspectRatio: '1/1'
                  }}
                >
                {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                  const hasObject = !!objectLocations[i];
                  const isTargetLocation = objectLocations[i] === targetObject;
                  const isWrongClick = wrongCellIndex === i;

                  let cellStyle = "bg-white/[0.04] border border-white/10";
                  let content = "";

                  if (phase === 'memorize') {
                    if (hasObject) {
                      cellStyle = "bg-white/10 border border-white/20 shadow-inner";
                      content = objectLocations[i];
                    }
                  } else if (phase === 'locate') {
                    cellStyle = "bg-white/[0.04] border border-white/10 hover:bg-white/10 active:scale-95 transition-all cursor-pointer";
                  } else if (phase === 'result') {
                    if (isTargetLocation) {
                      cellStyle = "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)] border-emerald-300";
                      content = objectLocations[i];
                    } else if (isWrongClick) {
                      cellStyle = "bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.6)] border-red-400";
                    }
                  }

                  return (
                    <button
                      key={i}
                      onPointerDown={(e) => handleCellClick(i, e)}
                      disabled={phase !== 'locate' || isProcessing}
                      className={`w-full aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl md:text-4xl transition-all duration-150 ease-out focus:outline-none touch-none border ${cellStyle}`}
                      aria-label="Grid Cell"
                    >
                      {content}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={MapPin}
              accent="emerald"
              title="Object Location Pro"
              subtitle="Spatial Object Memory • Location Recall"
              rules={[
                { icon: Target, accent: 'emerald', title: 'Memorize Object Positions', text: 'Study where each emoji object is placed on the grid' },
                { icon: Zap, accent: 'blue', title: 'Locate Target Object', text: 'Tap the correct grid cell when prompted for a target object' },
              ]}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: TrendingUp, label: 'Best Level', value: `Lv. ${bestLevel}`, color: 'text-purple-400', accent: 'purple' },
              ]}
              isTouchOnlyDevice={false}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY (3-2-1-GO) */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" />
          )}

          {/* END SCREEN (GAME OVER) */}
          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              {/* Left Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(16,185,129,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade?.color || 'text-emerald-400'}`}>
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
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
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
                    title="Exit Fullscreen & Return"
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
            title="Drill Instructions & Scoring System"
            isOpen={openAccordion === 'rules'}
            onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DrillRuleItem num="1" text="Find Target Location" highlight="+150 PTS" result="Level Up (+1 Obj)" />
              <DrillRuleItem num="2" text="Level Progression" highlight="Grid 3x3 → 7x7" result="Difficulty naturally scales" />
              <DrillRuleItem num="3" text="Miss / Timeout" highlight="Zero Penalties" result="No score or time loss" />
              <DrillRuleItem num="4" text="Difficulty Never Drops" highlight="Stays at Current Level" result="A miss just replays the round" />
            </div>
          </DrillAccordion>

          {/* ACCORDION 2: ABOUT OBJECT LOCATION PRO */}
          <DrillAccordion
            id="about"
            title="About Object Location Pro"
            isOpen={openAccordion === 'about'}
            onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
          >
            <div className="space-y-8">
              <section>
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-emerald-400" /> What Is Object Location Training?
                </h4>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>Object Location Training</strong> is a core spatial position memory exercise designed to measure visual mapping capacity. The <strong>Object Location drill</strong> presents multiple emoji objects on 3x3 to 7x7 matrices, testing your ability to lock in object positions and identify specific target locations when the grid goes blank.
                </p>
                <p className="text-sm leading-relaxed">
                  By practicing <strong>spatial position anchoring</strong>, you expand your visual short-term memory buffer and increase your layout retrieval speed under time pressure.
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                    <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Gamers improving map awareness, STEM students strengthening spatial reasoning, and professionals wanting to enhance visual position retention.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                    <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Spatial position memory, multiple object location recall, visual-spatial working memory, and layout mapping.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                    <h5 className="text-xs font-bold text-white">Spatial Anchoring</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Associate specific icons with grid corners or edges to quickly locate targets when the grid resets.</p>
                </div>
              </div>

            </div>
          </DrillAccordion>

          {/* ACCORDION 3: FREQUENTLY ASKED QUESTIONS */}
          <DrillAccordion
            id="faq"
            title="Frequently Asked Questions"
            isOpen={openAccordion === 'faq'}
            onToggle={() => setOpenAccordion(openAccordion === 'faq' ? null : 'faq')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DrillFAQItem q="What is the Object Location Drill?" a="A free spatial position memory exercise. Memorize illuminated object locations, then tap the target object's position on a blank grid." />
              <DrillFAQItem q="How does progressive difficulty work?" a="Starts on a 3x3 grid with 2 objects. Clearing rounds adds objects and expands the grid up to 7x7." />
              <DrillFAQItem q="Are there negative score or time penalties?" a="No. Tapping a wrong location never deducts score points or reduces remaining timer seconds — the round just replays at the same difficulty." />
              <DrillFAQItem q="Does difficulty decrease on mistakes?" a="No. Your level only ever goes up — a mistake never takes you back down, so you can safely master your current grid size." />
              <DrillFAQItem q="How long does each drill session last?" a="Each round is timed for exactly 45 seconds of continuous focus." />
              <DrillFAQItem q="Do I need to sign up?" a="No registration required. This drill runs directly in your browser with instant response." />
              <DrillFAQItem q="What cognitive skill does Object Location train?" a="It trains spatial position memory — binding a specific item to a specific location in a mental map, then retrieving that binding once the visual cues disappear. Each object-location pair has to be individually encoded." />
              <DrillFAQItem q="How is this different from Grid Memorization?" a="Grid Memorization recalls which cells were lit, treating them as a single pattern. Object Location requires binding a specific object identity to a specific position, then retrieving one target location on demand — closer to real-world 'where did I put that' memory." />
              <DrillFAQItem q="What is object-location binding and why is it useful?" a="Object-location binding is how the brain links 'what' and 'where' information into a single memory trace, powered largely by the hippocampus. Practicing it strengthens the same memory systems used to remember where you parked or left your keys." />
              <DrillFAQItem q="What is a good score on this drill?" a="Consistently clearing 5x5 grids with 6+ objects is a strong intermediate benchmark. Elite spatial memorizers track object positions on 7x7 grids with 10+ items using systematic anchor-point strategies." />
            </div>
          </DrillAccordion>
          </div>
        )}

        {/* RELATED DRILLS GRID */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              Related Memory Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <RelatedCard href="/drills/memory/spatial-memory/path-tracing" title="Path Tracing" desc="Retrace animated path sequences on expanding grids." cat="Spatial Memory" />
              <RelatedCard href="/drills/memory/spatial-memory/grid-memorization" title="Grid Memorization" desc="Memorize progressive spatial grid patterns." cat="Spatial Memory" />
              <RelatedCard href="/drills/memory/working-memory/n-back" title="Dual N-Back" desc="The gold standard working memory trainer." cat="Working Memory" />
              <RelatedCard href="/drills/memory/short-term-memory/word-recall" title="Word Recall" desc="Free recall random word lists under time pressure." cat="Short-Term Memory" />
              <RelatedCard href="/drills/memory/short-term-memory/color-sequence" title="Color Sequence" desc="Watch and recall color sequences." cat="Short-Term Memory" />
              <RelatedCard href="/drills/memory/short-term-memory/digit-span" title="Digit Span" desc="Train numerical short-term memory capacity." cat="Short-Term Memory" />
            </div>
          </section>
        )}
      </main>

      {/* ── FOOTER ── */}
      {!isFullscreen && <DrillFooter />}
    </div>
  );
}

// === Subcomponents ===
function RelatedCard({ href, title, desc, cat }) {
  return (
    <Link href={href} className="group bg-[#0c0c16] border border-white/5 hover:border-emerald-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
      <div>
        {cat && <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">{cat}</div>}
        <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">{title}</div>
        <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{desc}</div>
      </div>
      <div className="text-[10px] font-bold text-slate-500 group-hover:text-emerald-400 mt-3 flex items-center gap-1 transition-colors">
        Train Drill <span>→</span>
      </div>
    </Link>
  );
}
