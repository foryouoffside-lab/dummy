'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
  Brain, Play, RefreshCw, TrendingUp, Volume2, VolumeX,
  Zap, ZapOff, Users, Share2, ArrowLeft
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
import { useTranslation } from '@/lib/i18n/useTranslation';

const DRILL_DURATION = 45; // 45 seconds duration
const ELITE_SCORE = 1300; // Target score for S+ rating (rebalanced after combo removal)
const STORAGE_KEY = 'skilldrills_memory_color_sequence_v4';

const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

const COLOR_STYLES = {
  red: 'bg-red-500 hover:bg-red-400 active:bg-red-600 border-red-400/40',
  blue: 'bg-blue-500 hover:bg-blue-400 active:bg-blue-600 border-blue-400/40',
  green: 'bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 border-emerald-400/40',
  yellow: 'bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 border-yellow-300/40 text-black font-black',
  purple: 'bg-purple-500 hover:bg-purple-400 active:bg-purple-600 border-purple-400/40',
  orange: 'bg-orange-500 hover:bg-orange-400 active:bg-orange-600 border-orange-400/40',
};

const COLOR_GLOW = {
  red: 'bg-red-500 border-red-300',
  blue: 'bg-blue-500 border-blue-300',
  green: 'bg-emerald-500 border-emerald-300',
  yellow: 'bg-yellow-400 border-yellow-200',
  purple: 'bg-purple-500 border-purple-300',
  orange: 'bg-orange-500 border-orange-300',
};

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

export default function ColorSequenceClient({ copy = null }) {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const { flashes, triggerFlash } = useDrillFlash();

  // Phase inside gameplay: 'ready' | 'showing' | 'input' | 'result'
  const [phase, setPhase] = useState('ready');
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [showingColor, setShowingColor] = useState(null);

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

  const engine = useRef({
    score: 0,
    level: 1,
    timeLeft: DRILL_DURATION,
    perfectHits: 0,
    missedClicks: 0,
    totalActions: 0,
    sequence: [],
    userSequence: [],
  });

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

  const startSequenceCycleRef = useRef(null);

  const handleInputTimeout = useCallback(() => {
    if (!gameActiveRef.current) return;

    const e = engine.current;
    e.missedClicks++;
    e.level = Math.max(1, e.level - 1);
    setLevel(e.level);

    drillAudio?.playPenalty?.();
    triggerFlash();
    setPhase('result');

    const t = setTimeout(() => {
      if (gameActiveRef.current && startSequenceCycleRef.current) {
        startSequenceCycleRef.current();
      }
    }, 1000);
    gameTimeoutsRef.current.push(t);
  }, [triggerFlash]);

  // Sequence Player & Evaluator (Step-by-step Timeout Queue)
  const playSequenceStep = useCallback((seq, index, flashDuration, gapDuration) => {
    if (!gameActiveRef.current) return;

    if (index >= seq.length) {
      setShowingColor(null);
      setPhase('input');

      const tInputTimeout = setTimeout(() => {
        if (gameActiveRef.current) {
          handleInputTimeout();
        }
      }, 8000);
      gameTimeoutsRef.current.push(tInputTimeout);
      return;
    }

    setShowingColor(seq[index]);
    drillAudio?.playTick?.();

    const tFlash = setTimeout(() => {
      if (!gameActiveRef.current) return;
      setShowingColor(null);

      const tGap = setTimeout(() => {
        if (!gameActiveRef.current) return;
        playSequenceStep(seq, index + 1, flashDuration, gapDuration);
      }, gapDuration);

      gameTimeoutsRef.current.push(tGap);
    }, flashDuration);

    gameTimeoutsRef.current.push(tFlash);
  }, [handleInputTimeout]);

  const startSequenceCycle = useCallback(() => {
    if (!gameActiveRef.current) return;
    clearGameTimeouts();

    const e = engine.current;
    const seqLen = e.level + 2; // Level 1 has 3 colors, Level 2 has 4...
    const newSeq = Array.from({ length: seqLen }, () => COLORS[Math.floor(Math.random() * COLORS.length)]);
    
    e.sequence = newSeq;
    e.userSequence = [];
    setSequence(newSeq);
    setUserSequence([]);

    setPhase('showing');
    setShowingColor(null);

    // Speed increases with level: baseSpeed from 750ms down to 300ms
    const flashDuration = Math.max(250, 750 - e.level * 35);
    const gapDuration = Math.max(150, 300 - e.level * 15);

    playSequenceStep(newSeq, 0, flashDuration, gapDuration);
  }, [clearGameTimeouts, playSequenceStep]);

  useEffect(() => {
    startSequenceCycleRef.current = startSequenceCycle;
  }, [startSequenceCycle]);

  const handleColorClick = useCallback((color) => {
    if (!gameActiveRef.current || phase !== 'input') return;

    clearGameTimeouts();

    const e = engine.current;
    const nextUserSeq = [...e.userSequence, color];
    e.userSequence = nextUserSeq;
    setUserSequence(nextUserSeq);

    const targetSeq = e.sequence;
    const currentIndex = nextUserSeq.length - 1;

    if (nextUserSeq[currentIndex] === targetSeq[currentIndex]) {
      // Correct color tap
      drillAudio?.playHit?.();

      // Check if sequence is complete
      if (nextUserSeq.length === targetSeq.length) {
        e.perfectHits++;

        // No negative points or negative time! Correct sequence adds points cleanly.
        const levelBonus = 1 + e.level * 0.1;
        const pts = Math.round(100 * levelBonus);

        e.score += pts;
        e.level = e.level + 1;
        setUiScore(e.score);
        setLevel(e.level);

        setPhase('result');

        const t = setTimeout(() => {
          if (gameActiveRef.current && startSequenceCycleRef.current) {
            startSequenceCycleRef.current();
          }
        }, 400);
        gameTimeoutsRef.current.push(t);
      } else {
        const tInputTimeout = setTimeout(() => {
          if (gameActiveRef.current) {
            handleInputTimeout();
          }
        }, 8000);
        gameTimeoutsRef.current.push(tInputTimeout);
      }
    } else {
      // Wrong tap — red flash + penalty sound effect!
      e.missedClicks++;
      e.level = Math.max(1, e.level - 1);
      setLevel(e.level);

      drillAudio?.playPenalty?.();
      triggerFlash();
      setPhase('result');

      const t = setTimeout(() => {
        if (gameActiveRef.current && startSequenceCycleRef.current) {
          startSequenceCycleRef.current();
        }
      }, 500);
      gameTimeoutsRef.current.push(t);
    }
  }, [clearGameTimeouts, handleInputTimeout, phase, triggerFlash]);

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
    setPhase('ready');

    engine.current = {
      score: 0,
      level: 1,
      timeLeft: DRILL_DURATION,
      perfectHits: 0,
      missedClicks: 0,
      totalActions: 0,
      sequence: [],
      userSequence: [],
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
    const url = 'https://skilldrills.online/drills/memory/short-term-memory/color-sequence';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.grade || analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🧠' },
        newBest: isNewBest,
        drillName: 'Color Sequence Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Peak Level ${analytics.finalLevel}) on Color Sequence Pro! Accuracy: ${analytics.accuracy}%. Train visual memory at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Memory Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  const accuracy = analytics.accuracy;

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title & Definition Snippet */}
        {!isFullscreen && (
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {copy?.title || t('colorSequence.title', 'Color Memory Game')}
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1">
                {copy?.subtitle || t('colorSequence.subtitle', 'Simon Game Online & Visual Working Memory Sequence Test')}
              </span>
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed -mt-0.5">
              {copy?.caption || t('colorSequence.caption', 'Watch and reproduce the flashing color pattern in the correct order as sequences grow longer.')}
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: copy?.statScore || t('colorSequence.score', 'Score'), val: uiScore, color: "text-purple-400" },
              { label: copy?.statTime || t('colorSequence.time', 'Time'), val: `${uiTimeLeft}s`, highlight: uiTimeLeft <= 10 },
              { label: copy?.statLevel || t('colorSequence.level', 'Level'), val: `Lv. ${level}`, color: "text-indigo-400" },
              { label: copy?.statBestScore || t('colorSequence.bestScore', 'Best Score'), val: bestScore, color: "text-amber-400" },
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
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{uiScore}</p>
              </div>

              {/* TOP CENTER SEQUENCE DOTS */}
              {gameState === 'playing' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center gap-1.5 bg-black/60 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                  {sequence.map((c, i) => {
                    let dotStyle = 'bg-white/20 border-white/10';
                    if (phase === 'result') {
                      dotStyle = userSequence[i] === c ? 'bg-emerald-500 border-emerald-400' : 'bg-red-500 border-red-400';
                    } else if (i < userSequence.length) {
                      dotStyle = COLOR_GLOW[userSequence[i]];
                    }
                    return (
                      <div key={i} className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border transition-all duration-150 ${dotStyle}`} />
                    );
                  })}
                </div>
              )}

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

          {/* GAMEPLAY CANVAS AREA */}
          {gameState === 'playing' && (
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 w-full h-full relative z-20">
              
              {/* SHOWING PHASE DISK */}
              {phase === 'showing' && (
                <div className="flex flex-col items-center justify-center h-full">
                  <div 
                    className={`w-36 h-36 sm:w-48 sm:h-48 rounded-full border-4 transition-all duration-200 flex items-center justify-center ${
                      showingColor 
                        ? COLOR_GLOW[showingColor] 
                        : 'border-white/10 bg-white/5'
                    }`}
                  />
                </div>
              )}

              {/* RESULT / EVALUATING PHASE SPINNER */}
              {phase === 'result' && (
                <div className="flex flex-col items-center justify-center h-full animate-in fade-in duration-100">
                  <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-purple-500 animate-spin mb-2" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{copy?.evaluating || 'Evaluating...'}</span>
                </div>
              )}

              {/* INPUT PHASE: 6 VIBRANT BUTTONS GRID (MOBILE PORTRAIT OPTIMIZED) */}
              {phase === 'input' && (
                <div className="w-full max-w-sm sm:max-w-md my-auto flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-200">
                  <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-purple-400 mb-4 text-center">
                    {copy?.tapPrompt || 'Tap Sequence in Order'} ({userSequence.length} / {sequence.length})
                  </p>
                  <div className="w-full grid grid-cols-3 gap-3 sm:gap-4 px-2">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        onPointerDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleColorClick(color);
                        }}
                        className={`aspect-square rounded-2xl sm:rounded-3xl border-2 transition-all duration-100 active:scale-90 flex items-center justify-center text-xs font-bold capitalize cursor-pointer touch-none ${COLOR_STYLES[color]}`}
                        aria-label={`Select ${color}`}
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Brain}
              accent="purple"
              title={copy?.startCardTitle || "Color Sequence Pro"}
              subtitle={copy?.startCardSubtitle || "Visual Short-Term Memory • Sequence Recall"}
              isTouchOnlyDevice={false}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY (3-2-1-GO) */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle={copy?.getReady || "GET READY"} />
          )}

          {/* END SCREEN (GAME OVER) */}
          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              {/* Left Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(168,85,247,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    {copy?.newBest || 'NEW BEST'}
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
                <div className="text-[9px] uppercase tracking-widest text-slate-500">{copy?.points || 'Points'}</div>
              </div>

              {/* Right Stats & Actions Panel */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
                
                {/* 3 Stat Tiles */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.accuracy}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{copy?.statAccuracy || 'Accuracy'}</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">Lv. {analytics.finalLevel}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{copy?.statPeakLevel || 'Peak Level'}</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.perfectHits}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{copy?.statPerfects || 'Perfects'}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> {copy?.playAgain || 'Play Again'}
                  </button>
                  <button 
                    onClick={shareScore} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title={copy?.shareTitle || "Share Score"}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleExitDrill} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title={copy?.exitTitle || "Exit Drill & Return"}
                  >
                    <ArrowLeft className="w-4 h-4 text-red-400" />
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Drill Caption */}
        {!isFullscreen && (
          <p className="text-xs text-slate-400 leading-relaxed -mt-2">
            {copy?.bottomCaption || copy?.caption || 'Watch and reproduce the flashing color pattern in the correct order as sequences grow longer.'}
          </p>
        )}

        {/* ACCORDION 1: DRILL INSTRUCTIONS & SCORING */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
          <DrillAccordion
            id="rules"
            title={copy?.rulesTitle || t('colorSequence.rulesTitle', 'Drill Instructions & Scoring System')}
            isOpen={openAccordion === 'rules'}
            onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DrillRuleItem num="1" text={copy?.rule1Text || "Sequence Recall"} highlight={copy?.rule1Highlight || "+100 PTS"} result={copy?.rule1Result || "Recreate flashing color sequence in exact order"} />
              <DrillRuleItem num="2" text={copy?.rule2Text || "Level Bonus"} highlight={copy?.rule2Highlight || "+10% PTS per Level"} result={copy?.rule2Result || "Longer sequences = more points"} />
              <DrillRuleItem num="3" text={copy?.rule3Text || "Miss / Timeout"} highlight={copy?.rule3Highlight || "-1 Level"} result={copy?.rule3Result || "No score or time loss"} />
              <DrillRuleItem num="4" text={copy?.rule4Text || "Adaptive Difficulty"} highlight={copy?.rule4Highlight || "Rises & Falls"} result={copy?.rule4Result || "Sequence length tracks your skill"} />
            </div>
          </DrillAccordion>

          {/* ACCORDION 2: ABOUT COLOR SEQUENCE PRO */}
          <DrillAccordion
            id="about"
            title={copy?.aboutTitle || t('colorSequence.aboutTitle', 'About Color Sequence Pro')}
            isOpen={openAccordion === 'about'}
            onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
          >
            <div className="space-y-8">
              <section>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" /> {copy?.overviewTitle || 'What Is Visual Memory Training?'}
                </h3>
                <p className="text-sm leading-relaxed mb-3 text-gray-300">
                  {copy?.overviewLead || 'Visual working memory holds only about four simple items at a time, and that ceiling is set by the number of objects rather than how complex each one is (Luck & Vogel, 1997; Cowan, 2001). A lengthening colour sequence walks you straight into that limit.'}
                </p>
                {copy?.aboutIntro ? (
                  copy.aboutIntro.map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed mb-3 text-gray-300">{para}</p>
                  ))
                ) : (
                  <>
                    <p className="text-sm leading-relaxed mb-3">
                      <strong>Visual Memory Training</strong> isolates and exercises your ability to encode, hold, and manipulate short-term visual patterns. The <strong>Color Sequence drill</strong> presents progressive color strings, challenging your visual working memory capacity and recall speed.
                    </p>
                    <p className="text-sm leading-relaxed">
                      By practicing <strong>pattern sequence recall</strong>, you strengthen memory chunking strategies and improve focus under time pressure.
                    </p>
                  </>
                )}
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {copy?.aboutCards ? (
                  copy.aboutCards.map((card, i) => (
                    <div key={i} className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-7 h-7 rounded-lg ${i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-purple-600' : 'bg-orange-600'} flex items-center justify-center`}>
                          {i === 0 ? <Users className="w-3.5 h-3.5 text-white" /> : i === 1 ? <TrendingUp className="w-3.5 h-3.5 text-white" /> : <Zap className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <h4 className="text-xs font-bold text-white">{card.title}</h4>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{card.text}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                        <h4 className="text-xs font-bold text-white">Who Should Use This?</h4>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">Students enhancing study retention, adults looking to boost working memory capacity, and gamers building fast visual pattern processing.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                        <h4 className="text-xs font-bold text-white">Skills Improved</h4>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">Short-term visual recall, working memory span, sequential pattern encoding, and attentional focus.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                        <h4 className="text-xs font-bold text-white">Working Memory Chunking</h4>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">Group colors into sub-sequences (e.g. Red-Blue pair) to bypass standard short-term capacity limits and reach higher levels.</p>
                    </div>
                  </>
                )}
              </div>

            </div>
          </DrillAccordion>
          </div>
        )}
      </main>

      {/* SITE FOOTER */}
      {!isFullscreen && <DrillFooter />}
    </div>
  );
}
