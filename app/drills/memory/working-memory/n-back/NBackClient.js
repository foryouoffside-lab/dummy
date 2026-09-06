'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
  Brain, RefreshCw, TrendingUp, Volume2, VolumeX,
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

const DRILL_DURATION = 45; // 45 seconds duration
const POINTS_PER_HIT = 150;
const POINTS_PER_LEVEL = 1200; // 8 matches per level, matching the old cadence
const START_LEVEL = 3; // 3-Back is the starting difficulty
const ELITE_SCORE = 1000; // Target score for S+ rating (rebalanced after combo removal)
const STORAGE_KEY = 'skilldrills_memory_n_back_v4';
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

export default function NBackClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const { flashes, triggerFlash } = useDrillFlash();

  // Drill Specific State
  const [nBackLevel, setNBackLevel] = useState(3);
  const [currentLetter, setCurrentLetter] = useState('');
  const [phase, setPhase] = useState('memorize'); // 'memorize' | 'input' | 'result'
  const [isProcessing, setIsProcessing] = useState(false);

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

  const sequenceRef = useRef([]);
  const displayDurationRef = useRef(2000); // 2000ms per letter

  const engine = useRef({
    score: 0,
    level: 3,
    timeLeft: DRILL_DURATION,
    perfectHits: 0,
    missedClicks: 0,
  });

  const startNextLetterRef = useRef(null);

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

  // Judgment Handler
  const handleJudgment = useCallback((userSaidMatch, isTimeout = false) => {
    if (!gameActiveRef.current || phaseRef.current !== 'input') return;
    clearGameTimeouts();

    setIsProcessing(true);
    const e = engine.current;
    const seq = sequenceRef.current;
    const n = e.level;

    const current = seq[seq.length - 1];
    const previousN = seq[seq.length - 1 - n];
    const actualMatch = current === previousN;

    const isCorrect = !isTimeout && (userSaidMatch === actualMatch);

    if (isCorrect) {
      // PERFECT / CORRECT (+150 PTS)
      e.perfectHits++;
      e.score += POINTS_PER_HIT;

      const nextLevel = START_LEVEL + Math.floor(e.score / POINTS_PER_LEVEL);
      if (nextLevel > e.level) {
        e.level = nextLevel;
        setNBackLevel(e.level);
        displayDurationRef.current = Math.max(1200, displayDurationRef.current - 100);
      }

      setUiScore(e.score);
      drillAudio?.playHit?.();

      setPhase('result');
      phaseRef.current = 'result';

      const tNext = setTimeout(() => {
        if (gameActiveRef.current && startNextLetterRef.current) {
          startNextLetterRef.current();
        }
      }, 400);
      gameTimeoutsRef.current.push(tNext);
    } else {
      // WRONG / TIMEOUT
      e.missedClicks++;
      drillAudio?.playPenalty?.();
      triggerFlash();

      setPhase('result');
      phaseRef.current = 'result';

      const tNext = setTimeout(() => {
        if (gameActiveRef.current && startNextLetterRef.current) {
          startNextLetterRef.current();
        }
      }, 600);
      gameTimeoutsRef.current.push(tNext);
    }
  }, [clearGameTimeouts, triggerFlash]);

  // Generate and Display Next Letter
  const startNextLetter = useCallback(() => {
    if (!gameActiveRef.current) return;
    clearGameTimeouts();

    const e = engine.current;
    const seq = sequenceRef.current;
    const n = e.level;

    // 35% Chance of being a match if sequence is long enough
    let newLetter = '';
    if (seq.length >= n && Math.random() < 0.35) {
      newLetter = seq[seq.length - n];
    } else {
      do {
        newLetter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      } while (seq.length >= n && newLetter === seq[seq.length - n]);
    }

    sequenceRef.current.push(newLetter);
    setCurrentLetter(newLetter);
    drillAudio?.playTick?.();

    // If sequence length <= N, user cannot answer yet
    if (sequenceRef.current.length <= n) {
      setPhase('memorize');
      phaseRef.current = 'memorize';
      setIsProcessing(true);

      const tNext = setTimeout(() => {
        if (gameActiveRef.current && startNextLetterRef.current) {
          startNextLetterRef.current();
        }
      }, displayDurationRef.current);
      gameTimeoutsRef.current.push(tNext);
    } else {
      setPhase('input');
      phaseRef.current = 'input';
      setIsProcessing(false);

      // Input Phase Timeout
      const tInputTimeout = setTimeout(() => {
        if (gameActiveRef.current && phaseRef.current === 'input') {
          handleJudgment(null, true);
        }
      }, displayDurationRef.current);
      gameTimeoutsRef.current.push(tInputTimeout);
    }
  }, [clearGameTimeouts, handleJudgment]);

  useEffect(() => {
    startNextLetterRef.current = startNextLetter;
  }, [startNextLetter]);

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
    setNBackLevel(3);
    setPhase('memorize');
    sequenceRef.current = [];
    displayDurationRef.current = 2000;

    engine.current = {
      score: 0,
      level: 3,
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

      startNextLetter();
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [clearGameTimeouts, endGame, startNextLetter]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/memory/working-memory/n-back';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.grade || analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🧠' },
        newBest: isNewBest,
        drillName: '3-Back Training Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Peak Level: ${analytics.finalLevel}-Back) on 3-Back Training Pro! Accuracy: ${analytics.accuracy}%. Train working memory at skilldrills.online!`;
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
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
        <div className="text-left">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            N-Back Working Memory Test
          </h1>
          <p className="text-[13px] text-slate-400 leading-relaxed mt-1">
            The n-back task asks whether the current item matches the one n steps earlier, so you have to hold a short list and update it continuously at the same time. That combination of storage plus manipulation is what working memory means in Baddeley and Hitch's (1974) model, and its capacity sits near four items (Cowan, 2001).
          </p>
        </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
        <div className="grid grid-cols-4 gap-2 w-full">
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
            <div className="text-lg sm:text-xl font-black text-cyan-400 tabular-nums">{uiScore}</div>
          </div>
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
            <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {uiTimeLeft}s
            </div>
          </div>
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Level</div>
            <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">{nBackLevel}-Back</div>
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
            <div className="absolute bottom-4 max-sm:bottom-28 right-4 z-40 flex items-center gap-2">
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

          {/* GAMEPLAY CANVAS AREA */}
          {gameState === 'playing' && (
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 w-full h-full relative z-20 overflow-y-auto">
              
              {/* N-Back Mode Indicator */}
              <div className="mb-2 px-4 py-1 rounded-full bg-white/[0.04] border border-white/10 text-cyan-400 font-extrabold tracking-widest text-xs uppercase">
                {nBackLevel}-BACK TRAINING
              </div>

              {/* Letter Display Box */}
              <div className="flex-1 flex items-center justify-center w-full min-h-[160px]">
                <div className="text-8xl sm:text-[140px] font-black tracking-tighter text-white drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
                  {currentLetter || "?"}
                </div>
              </div>

              {/* Action Buttons & Memorize Indicator */}
              <div className="w-full max-w-md flex flex-col gap-3 mt-auto pb-2 shrink-0">
                {phase === 'memorize' && (
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest animate-pulse text-center mb-1">
                    Memorizing first {nBackLevel} letters...
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 sm:gap-5">
                  <button 
                    onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); handleJudgment(true); }}
                    disabled={phase !== 'input' || isProcessing}
                    className={`py-4 sm:py-5 rounded-2xl font-extrabold tracking-widest text-base sm:text-lg transition-all border ${
                      phase !== 'input' || isProcessing
                        ? 'bg-white/[0.02] text-slate-600 border-white/5 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95 cursor-pointer'
                    }`}
                  >
                    MATCH
                  </button>
                  <button 
                    onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); handleJudgment(false); }}
                    disabled={phase !== 'input' || isProcessing}
                    className={`py-4 sm:py-5 rounded-2xl font-extrabold tracking-widest text-base sm:text-lg transition-all border ${
                      phase !== 'input' || isProcessing
                        ? 'bg-white/[0.02] text-slate-600 border-white/5 cursor-not-allowed'
                        : 'bg-white/10 text-white border-white/20 shadow-lg active:scale-95 cursor-pointer'
                    }`}
                  >
                    NO MATCH
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Brain}
              accent="cyan"
              title="Dual N-Back Training Pro"
              subtitle="Working Memory • Sequence Updating"
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
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(6,182,212,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade?.color || 'text-cyan-400'}`}>
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
                    <p className="text-sm sm:text-base font-black text-white">{analytics.finalLevel}-Back</p>
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
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
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
            title="Drill Instructions & Scoring System"
            isOpen={openAccordion === 'rules'}
            onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DrillRuleItem num="1" text="Correct Match / No Match (N Steps Ago)" highlight="+150 PTS" result="Per correct judgment" />
              <DrillRuleItem num="2" text="Level Progression" highlight="3-Back → 4-Back+" result="Every 1200 points earned" />
              <DrillRuleItem num="3" text="Display Speeds Up" highlight="2000ms → 1200ms Floor" result="Faster letters at higher levels" />
              <DrillRuleItem num="4" text="Timeout (No Response)" highlight="Zero Penalties" result="No score, time, or life lost" />
              <DrillRuleItem num="5" text="Wrong Judgment" highlight="Breaks your streak" result="Costs no score and no time — the run lasts the full clock" />
            </div>
          </DrillAccordion>

          {/* ACCORDION 2: ABOUT N-BACK TRAINING */}
          <DrillAccordion
            id="about"
            title="About N-Back Working Memory Test"
            isOpen={openAccordion === 'about'}
            onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
          >
            <div className="space-y-8">
              <section>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-cyan-400" /> What Is N-Back Training?
                </h3>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>N-Back Training</strong> is the gold-standard cognitive working memory paradigm used across neuroscientific research to measure fluid intelligence and memory updating capacity. The <strong>N-Back Working Memory Test</strong> presents continuous stimulus streams, requiring you to determine whether the current item matches the item presented 'N' steps ago.
                </p>
                <p className="text-sm leading-relaxed">
                  By practicing <strong>working memory updating</strong>, you expand your executive control buffer and strengthen information manipulation speed under time pressure.
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                    <h4 className="text-xs font-bold text-white">Who Should Use This?</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Students improving focus, professionals maintaining mental agility, researchers studying working memory, and cognitive athletes.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                    <h4 className="text-xs font-bold text-white">Skills Improved</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Working memory capacity, cognitive control, sustained attention, information updating, and executive function.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                    <h4 className="text-xs font-bold text-white">Sub-Vocalization</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Mentally repeat the last N items in order to keep your working memory buffer continuously updated.</p>
                </div>
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
