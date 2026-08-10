'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Brain, Play, RefreshCw,
  TrendingUp, Volume2, VolumeX,
  Zap, ZapOff, Users, Share2, ArrowLeft,
  Hash, Delete, Check, Target, Trophy
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
const ELITE_SCORE = 1300; // Target score for S+ rating (rebalanced after combo removal)
const STORAGE_KEY = 'skilldrills_memory_digit_span_v4';

function getEditDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
}

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, bestLevel: 3, totalSessions: 0 };
    return { bestScore: 0, bestLevel: 3, totalSessions: 0, ...JSON.parse(raw) };
  } catch (e) {
    return { bestScore: 0, bestLevel: 3, totalSessions: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

export default function DigitSpanClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const { flashes, triggerFlash } = useDrillFlash();

  // Phase inside gameplay: 'memorize' | 'input' | 'feedback'
  const [phase, setPhase] = useState('memorize');
  const [targetSequence, setTargetSequence] = useState('');
  const [userSequence, setUserSequence] = useState('');
  const [digitCount, setDigitCount] = useState(3);

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [bestLevel, setBestLevel] = useState(3);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    perfectHits: 0,
    missedClicks: 0,
    finalLevel: 3,
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
    level: 3,
    timeLeft: DRILL_DURATION,
    perfectHits: 0,
    missedClicks: 0,
    totalActions: 0,
    targetSequence: '',
    userSequence: '',
    displayDuration: 2500,
  });

  const startSequenceCycleRef = useRef(null);

  // Storage loading & sound init
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestLevel(saved.bestLevel || 3);
    }
  }, []);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Screen size / orientation listener (drives responsive drill box sizing)
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

  // Input Phase Timeout (8 seconds to enter digits)
  const handleInputTimeout = useCallback(() => {
    if (!gameActiveRef.current) return;

    const e = engine.current;
    e.missedClicks++;
    e.level = Math.max(3, e.level - 1);
    e.displayDuration = Math.min(2500, e.displayDuration + 200);
    setDigitCount(e.level);

    drillAudio?.playPenalty?.();
    triggerFlash();
    setPhase('feedback');
    phaseRef.current = 'feedback';

    const t = setTimeout(() => {
      if (gameActiveRef.current && startSequenceCycleRef.current) {
        startSequenceCycleRef.current();
      }
    }, 1000);
    gameTimeoutsRef.current.push(t);
  }, [triggerFlash]);

  // Sequence Player & Cycle Handler
  const startSequenceCycle = useCallback(() => {
    if (!gameActiveRef.current) return;
    clearGameTimeouts();

    const e = engine.current;
    const len = e.level;
    let newSeq = '';
    for (let i = 0; i < len; i++) {
      newSeq += Math.floor(Math.random() * 10).toString();
    }

    e.targetSequence = newSeq;
    e.userSequence = '';
    setTargetSequence(newSeq);
    setUserSequence('');

    setPhase('memorize');
    phaseRef.current = 'memorize';
    drillAudio?.playTick?.();

    // After displayDuration, switch to input phase
    const t1 = setTimeout(() => {
      if (!gameActiveRef.current) return;
      setPhase('input');
      phaseRef.current = 'input';

      // 8s Timeout for input phase
      const tInputTimeout = setTimeout(() => {
        if (gameActiveRef.current && phaseRef.current === 'input') {
          handleInputTimeout();
        }
      }, 8000);
      gameTimeoutsRef.current.push(tInputTimeout);
    }, e.displayDuration);

    gameTimeoutsRef.current.push(t1);
  }, [clearGameTimeouts, handleInputTimeout]);

  useEffect(() => {
    startSequenceCycleRef.current = startSequenceCycle;
  }, [startSequenceCycle]);

  // Submission & Numpad Handler
  const handleSubmission = useCallback((isTimeout = false) => {
    if (!gameActiveRef.current || phaseRef.current !== 'input') return;
    clearGameTimeouts();

    setPhase('feedback');
    phaseRef.current = 'feedback';

    const e = engine.current;
    const target = e.targetSequence;
    const user = e.userSequence;

    let distance = getEditDistance(target, user);
    if (isTimeout) distance = 999;

    if (distance === 0) {
      // PERFECT MATCH
      e.perfectHits++;

      const levelBonus = 1 + (e.level - 3) * 0.1;
      const pts = Math.round(100 * levelBonus);

      e.score += pts;
      e.level = Math.min(15, e.level + 1);
      e.displayDuration = Math.max(800, e.displayDuration - 100);

      setUiScore(e.score);
      setDigitCount(e.level);
      drillAudio?.playHit?.();

      const t = setTimeout(() => {
        if (gameActiveRef.current && startSequenceCycleRef.current) {
          startSequenceCycleRef.current();
        }
      }, 800);
      gameTimeoutsRef.current.push(t);
    } else {
      // MISS — NO negative score or time deduction! Red flash & penalty sound.
      e.missedClicks++;
      e.level = Math.max(3, e.level - 1);
      e.displayDuration = Math.min(2500, e.displayDuration + 200);

      setDigitCount(e.level);
      drillAudio?.playPenalty?.();
      triggerFlash();

      const t = setTimeout(() => {
        if (gameActiveRef.current && startSequenceCycleRef.current) {
          startSequenceCycleRef.current();
        }
      }, 1000);
      gameTimeoutsRef.current.push(t);
    }
  }, [clearGameTimeouts, triggerFlash]);

  const handleNumpad = useCallback((key) => {
    if (phaseRef.current !== 'input' || !gameActiveRef.current) return;
    drillAudio?.playTick?.();

    const e = engine.current;
    if (key === 'DEL') {
      e.userSequence = e.userSequence.slice(0, -1);
    } else if (key === 'ENTER') {
      if (e.userSequence.length > 0) handleSubmission(false);
    } else {
      if (e.userSequence.length < 15) {
        e.userSequence += key;
      }
    }
    setUserSequence(e.userSequence);
  }, [handleSubmission]);

  // Desktop Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (phaseRef.current !== 'input' || !gameActiveRef.current) return;
      if (evt.key >= '0' && evt.key <= '9') {
        handleNumpad(evt.key);
      } else if (evt.key === 'Backspace' || evt.key === 'Delete') {
        handleNumpad('DEL');
      } else if (evt.key === 'Enter') {
        handleNumpad('ENTER');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumpad]);

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
    setDigitCount(3);
    setPhase('memorize');

    engine.current = {
      score: 0,
      level: 3,
      timeLeft: DRILL_DURATION,
      perfectHits: 0,
      missedClicks: 0,
      totalActions: 0,
      targetSequence: '',
      userSequence: '',
      displayDuration: 2500,
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
    const url = 'https://skilldrills.online/drills/memory/short-term-memory/digit-span';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.grade || analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🔢' },
        newBest: isNewBest,
        drillName: 'Digit Span Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Peak Digit Span: ${analytics.finalLevel}) on Digit Span Pro! Accuracy: ${analytics.accuracy}%. Train visual memory at skilldrills.online!`;
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
      {/* ── HEADER / BREADCRUMB ── */}
      {!isFullscreen && (
      <header className="border-b border-white/5 bg-[#080811]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/drills/memory" className="hover:text-white transition-colors">Memory</Link>
            <span>/</span>
            <span className="text-purple-400 font-medium">Digit Span</span>
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
            DIGIT SPAN
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Numerical Short-Term Memory Capacity Under Speed Constraints
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
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Span</div>
            <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">{digitCount} Digits</div>
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
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 w-full h-full relative z-20">
              
              {/* MEMORIZE PHASE DISPLAY */}
              {phase === 'memorize' && (
                <div className="text-center animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center justify-center">
                  <span className="text-purple-400 font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 block">MEMORIZE SEQUENCE</span>
                  <div className="py-4">
                    <span className="font-mono font-black text-white tracking-[0.25em] sm:tracking-[0.35em] drop-shadow-[0_0_24px_rgba(168,85,247,0.4)]" style={{ fontSize: `${Math.max(32, 72 - digitCount * 3)}px` }}>
                      {targetSequence}
                    </span>
                  </div>
                </div>
              )}

              {/* INPUT PHASE: TACTICAL NUMPAD GRID (MOBILE PORTRAIT OPTIMIZED) */}
              {phase === 'input' && (
                <div className="w-full max-w-sm flex flex-col items-center justify-center my-auto animate-in fade-in zoom-in-95 duration-200">
                  {/* Sequence Input Display Box */}
                  <div className="w-full bg-gray-900/90 border border-white/10 rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 text-center shadow-inner min-h-[64px] sm:min-h-[76px] flex items-center justify-center">
                    <span className="font-mono font-black text-purple-300 tracking-[0.2em] sm:tracking-[0.3em] break-all" style={{ fontSize: `${Math.max(20, 48 - userSequence.length * 1.5)}px` }}>
                      {userSequence || <span className="text-gray-600 animate-pulse">_</span>}
                    </span>
                  </div>
                  
                  {/* Tactical Numpad (Scaled for touch) */}
                  <div className="w-full grid grid-cols-3 gap-2 sm:gap-3">
                    {[1,2,3,4,5,6,7,8,9].map((num) => (
                      <button 
                        key={num}
                        onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); handleNumpad(num.toString()); }}
                        className="h-12 sm:h-16 bg-white/[0.04] border border-white/10 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black text-white hover:bg-white/10 active:bg-purple-600 active:scale-95 transition-all shadow-md touch-none cursor-pointer"
                      >
                        {num}
                      </button>
                    ))}
                    <button 
                      onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); handleNumpad('DEL'); }}
                      className="h-12 sm:h-16 bg-red-950/40 border border-red-500/30 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-900/50 active:scale-95 transition-all shadow-md touch-none cursor-pointer"
                    >
                      <Delete className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button 
                      onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); handleNumpad('0'); }}
                      className="h-12 sm:h-16 bg-white/[0.04] border border-white/10 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black text-white hover:bg-white/10 active:bg-purple-600 active:scale-95 transition-all shadow-md touch-none cursor-pointer"
                    >
                      0
                    </button>
                    <button 
                      onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); handleNumpad('ENTER'); }}
                      className="h-12 sm:h-16 bg-gradient-to-r from-emerald-600 to-teal-600 border border-emerald-400/40 rounded-xl flex items-center justify-center text-white hover:brightness-110 active:scale-95 transition-all shadow-md touch-none cursor-pointer"
                    >
                      <Check className="w-6 h-6 sm:w-7 sm:h-7" />
                    </button>
                  </div>
                </div>
              )}

              {/* FEEDBACK PHASE */}
              {phase === 'feedback' && (
                <div className="text-center animate-in fade-in duration-100 flex flex-col items-center justify-center h-full">
                  <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-purple-500 animate-spin mb-2"></div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Evaluating...</span>
                </div>
              )}

            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Hash}
              accent="purple"
              title="Digit Span Pro"
              subtitle="Numerical Short-Term Memory • Digit Sequence Recall"
              rules={[
                { icon: Target, accent: 'purple', title: 'Memorize Digit Sequence', text: 'Watch the flashing numbers displayed on screen' },
                { icon: Zap, accent: 'blue', title: 'Recall with On-Screen Numpad', text: 'Enter the exact sequence of digits using the numpad' },
              ]}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: TrendingUp, label: 'Best Span', value: `${bestLevel} Digits`, color: 'text-blue-400', accent: 'blue' },
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
                    <p className="text-sm sm:text-base font-black text-white">{analytics.finalLevel} Digits</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Span</p>
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
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
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
              <DrillRuleItem num="1" text="Perfect Recall" highlight="+100 PTS" result="Adds 1 Digit to Span" />
              <DrillRuleItem num="2" text="Level Bonus" highlight="Up to +120% PTS" result="Higher span = more points per hit" />
              <DrillRuleItem num="3" text="Miss / Timeout" highlight="-1 Digit" result="No score or time loss" />
              <DrillRuleItem num="4" text="Adaptive Span Test" highlight="Rises & Falls" result="Converges on your true digit span" />
            </div>
          </DrillAccordion>

          {/* ACCORDION 2: ABOUT DIGIT SPAN PRO */}
          <DrillAccordion
            id="about"
            title="About Digit Span Pro"
            isOpen={openAccordion === 'about'}
            onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
          >
            <div className="space-y-8">
              <section>
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" /> What Is Digit Span Training?
                </h4>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>Digit Span Training</strong> is a gold-standard cognitive exercise used in WAIS IQ and clinical memory evaluations to measure working memory capacity. The <strong>Digit Span drill</strong> presents random numerical sequences, testing your capacity to memorize and type back exact strings.
                </p>
                <p className="text-sm leading-relaxed">
                  By practicing <strong>numerical recall chunking</strong>, you expand your short-term memory buffer and increase your visual processing speed under time pressure.
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                    <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Students expanding numerical retention, professionals needing strong number memory, and anyone wanting to benchmark working memory capacity.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                    <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Numerical short-term memory, working memory span, phone number encoding, and focus under pressure.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                    <h5 className="text-xs font-bold text-white">Digit Chunking</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Group digits into pairs or triplets (e.g. 472-913) to bypass standard memory limits and reach higher digit spans.</p>
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
              <DrillFAQItem q="What is the Digit Span Drill?" a="A free working memory exercise based on the digit span test. Memorize random digit sequences, then type the exact order." />
              <DrillFAQItem q="How does progressive difficulty work?" a="Sequence length = level. Level 3 has 3 digits, Level 4 has 4, and so on as you score perfect rounds." />
              <DrillFAQItem q="Are there negative score or time penalties?" a="No. Incorrect entries or timeouts never deduct score points or reduce remaining timer seconds." />
              <DrillFAQItem q="Does my digit span go down after a mistake?" a="Yes — unlike other drills on this site, Digit Span is an adaptive staircase test: a miss drops your span by 1 digit while a perfect round adds 1. This up-and-down design is the standard method real memory assessments use to converge on your true capacity, so it's intentional here, not a penalty." />
              <DrillFAQItem q="Why is digit span important?" a="It measures working memory capacity used in cognitive performance. Average adult span is 7±2 digits." />
              <DrillFAQItem q="Do I need to sign up?" a="No registration required. This drill runs directly in your browser with instant response." />
              <DrillFAQItem q="How long does each drill session last?" a="Each round is timed for exactly 45 seconds of continuous focus." />
              <DrillFAQItem q="What is the WAIS Digit Span subtest?" a="Digit Span is a core subtest of the Wechsler Adult Intelligence Scale (WAIS), used clinically to assess working memory and attention. This drill mirrors the forward-recall format of that assessment in a free, gamified form." />
              <DrillFAQItem q="Why is 7±2 considered the average digit span?" a="Psychologist George Miller's influential 1956 paper described short-term memory capacity as limited to about seven items, plus or minus two — a benchmark digit span tests have used as a reference point ever since, though modern estimates trend closer to 4±1 without chunking." />
              <DrillFAQItem q="How can I increase my digit span?" a="Chunking digits into pairs or triplets, rehearsing sequences aloud (sub-vocalization), and regular practice are the most effective evidence-based methods for extending your working digit span." />
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
              <RelatedCard href="/drills/memory/spatial-memory/grid-memorization" title="Grid Memorization" desc="Memorize progressive spatial grid patterns." cat="Spatial Memory" />
              <RelatedCard href="/drills/memory/working-memory/n-back" title="Dual N-Back" desc="The gold standard working memory trainer." cat="Working Memory" />
              <RelatedCard href="/drills/memory/short-term-memory/word-recall" title="Word Recall" desc="Free recall random word lists under time pressure." cat="Short-Term Memory" />
              <RelatedCard href="/drills/memory/short-term-memory/color-sequence" title="Color Sequence" desc="Watch and recall color sequences." cat="Short-Term Memory" />
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
