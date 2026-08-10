'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Brain, Play, RefreshCw, TrendingUp, Volume2, VolumeX,
  Zap, ZapOff, Users, Share2, ArrowLeft, Grid3X3, Target, Trophy
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

export default function GridMemorizationClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
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

  // Storage loading & sound init
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestLevel(saved.bestLevel || 4);
    }
  }, []);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Screen size / orientation listener
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
        setIsPortrait(window.innerHeight > window.innerWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      {/* ── HEADER / BREADCRUMB ── */}
      {!isFullscreen && (
      <header className="border-b border-white/5 bg-[#080811]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/drills/memory" className="hover:text-white transition-colors">Memory</Link>
            <span>/</span>
            <span className="text-purple-400 font-medium">Grid Memorization</span>
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
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
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
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
            GRID MEMORIZATION
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Spatial Pattern Recall Under Speed Constraints
          </p>
        </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
        <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
            <div className="text-lg sm:text-xl font-black text-purple-400 tabular-nums">{uiScore}</div>
          </div>
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
            <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {uiTimeLeft}s
            </div>
          </div>
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Grid Size</div>
            <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">{gridSize}x{gridSize}</div>
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
              title="Grid Memorization Pro"
              subtitle="Spatial Short-Term Memory • Pattern Recall"
              rules={[
                { icon: Target, accent: 'purple', title: 'Memorize Spatial Pattern', text: 'Study the lit cell positions on the expanding grid matrix' },
                { icon: Zap, accent: 'blue', title: 'Recreate Lit Positions', text: 'Tap the matching grid tiles to reconstruct the exact spatial pattern' },
              ]}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: TrendingUp, label: 'Best Cells', value: `${bestLevel} Cells`, color: 'text-blue-400', accent: 'blue' },
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
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(168,85,247,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
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
                    <p className="text-sm sm:text-base font-black text-white">{analytics.finalLevel} Cells</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Pattern</p>
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
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
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
              <DrillRuleItem num="1" text="Perfect Recall" highlight="+150 PTS" result="Adds 1 Lit Cell" />
              <DrillRuleItem num="2" text="Level Progression" highlight="Grid 4x4 → 5x5" result="Difficulty naturally scales" />
              <DrillRuleItem num="3" text="Miss / Timeout" highlight="Zero Penalties" result="No score or time loss" />
              <DrillRuleItem num="4" text="Difficulty Never Drops" highlight="Stays at Current Level" result="A miss just replays the round" />
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
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" /> What Is Grid Memorization Training?
                </h4>
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
                    <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Gamers improving map awareness, STEM students strengthening spatial reasoning, and professionals wanting to enhance visual pattern retention.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                    <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Spatial short-term memory, working memory span, pattern recognition, and visual precision under pressure.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                    <h5 className="text-xs font-bold text-white">Spatial Chunking</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Group lit cells into familiar shapes (like an 'L', square, or line) to bypass standard visual memory limits and handle larger grids.</p>
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
              <DrillFAQItem q="What is the Grid Memorization Pro Drill?" a="A free spatial working memory exercise. Memorize illuminated cells on a grid for 1.5 seconds, then tap all pattern cells back." />
              <DrillFAQItem q="How does progressive difficulty work?" a="Start at a 4x4 grid with 5 lit cells. Clearing rounds adds 1 cell up to 7, then upgrades to a 5x5 grid starting again at 5 cells and scaling toward 12." />
              <DrillFAQItem q="Are there negative score or time penalties?" a="No. Tapping a wrong cell never deducts score points or reduces remaining timer seconds — the round just replays at the same difficulty." />
              <DrillFAQItem q="Does difficulty decrease on mistakes?" a="No. Your lit-cell level only ever goes up — a mistake never takes you back down, so you can safely master your current pattern size." />
              <DrillFAQItem q="How long does each drill session last?" a="Each round is timed for exactly 45 seconds of continuous focus." />
              <DrillFAQItem q="Do I need to sign up?" a="No registration required. This drill runs directly in your browser with instant response." />
              <DrillFAQItem q="What cognitive skill does Grid Memorization train?" a="It isolates visuospatial short-term memory — encoding a static configuration of illuminated cells and holding it in mind for immediate recall, independent of any verbal or sequential component." />
              <DrillFAQItem q="How is this related to real IQ test subtests?" a="Grid-pattern recall tasks are a close relative of the Corsi Block-Tapping Test and the Visual Patterns Test, both established clinical tools for assessing visuospatial working memory capacity." />
              <DrillFAQItem q="What is a good score on Grid Memorization?" a="Reliably recalling 7-8 lit cells on a 4x4 grid is a strong result. Elite performers extend into the 5x5 grid tier while maintaining 10+ cell patterns using shape-chunking strategies." />
              <DrillFAQItem q="Does Grid Memorization improve real-world memory?" a="Yes — the visuospatial working memory trained here transfers to tasks like reading maps, remembering furniture layouts, and mental rotation problems common in STEM fields." />
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
              <RelatedCard href="/drills/memory/spatial-memory/object-location" title="Object Location" desc="Memorize and locate emoji objects on grids." cat="Spatial Memory" />
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
    <Link href={href} className="group bg-[#0c0c16] border border-white/5 hover:border-purple-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
      <div>
        {cat && <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1">{cat}</div>}
        <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">{title}</div>
        <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{desc}</div>
      </div>
      <div className="text-[10px] font-bold text-slate-500 group-hover:text-purple-400 mt-3 flex items-center gap-1 transition-colors">
        Train Drill <span>→</span>
      </div>
    </Link>
  );
}
