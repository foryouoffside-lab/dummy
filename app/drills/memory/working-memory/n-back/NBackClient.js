'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Brain, Play, RefreshCw, TrendingUp, Volume2, VolumeX,
  Zap, ZapOff, Users, Share2, ArrowLeft, Heart, Target, Trophy
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
const MAX_LIVES = 5;
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
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
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
  const [uiLives, setUiLives] = useState(MAX_LIVES);
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
    lives: MAX_LIVES,
    timeLeft: DRILL_DURATION,
    perfectHits: 0,
    missedClicks: 0,
  });

  const startNextLetterRef = useRef(null);

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

  // Check screen / window size
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

      if (!isTimeout) {
        // Wrong click deducts 1 life! Timeouts cost no lives.
        e.lives -= 1;
        const remainingLives = Math.max(0, e.lives);
        setUiLives(remainingLives);

        if (remainingLives <= 0) {
          endGame();
          return;
        }
      }

      setPhase('result');
      phaseRef.current = 'result';

      const tNext = setTimeout(() => {
        if (gameActiveRef.current && startNextLetterRef.current) {
          startNextLetterRef.current();
        }
      }, 600);
      gameTimeoutsRef.current.push(tNext);
    }
  }, [clearGameTimeouts, triggerFlash, endGame]);

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
    setUiLives(MAX_LIVES);
    setUiTimeLeft(DRILL_DURATION);
    setNBackLevel(3);
    setPhase('memorize');
    sequenceRef.current = [];
    displayDurationRef.current = 2000;

    engine.current = {
      score: 0,
      level: 3,
      lives: MAX_LIVES,
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
      {/* ── HEADER / BREADCRUMB ── */}
      {!isFullscreen && (
      <header className="border-b border-white/5 bg-[#080811]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/drills/memory" className="hover:text-white transition-colors">Memory</Link>
            <span>/</span>
            <span className="text-cyan-400 font-medium">Dual N-Back</span>
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

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
            3-BACK TRAINING PRO
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Working Memory & Executive Control Under Speed Constraints
          </p>
        </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
        <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
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
              rules={[
                { icon: Target, accent: 'cyan', title: 'Compare to N Steps Ago', text: 'Determine if current item matches the item N steps back in sequence' },
                { icon: Zap, accent: 'blue', title: 'Match / No Match Decision', text: 'Respond quickly with Match or No Match for each stimulus' },
              ]}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: TrendingUp, label: 'Best Level', value: `${bestLevel}-Back`, color: 'text-purple-400', accent: 'purple' },
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
              <DrillRuleItem num="1" text="Correct Match / No Match" highlight="+150 PTS" result="Per correct judgment" />
              <DrillRuleItem num="2" text="Level Progression" highlight="3-Back → 4-Back+" result="Every 1200 points earned" />
              <DrillRuleItem num="3" text="Display Speeds Up" highlight="2000ms → 1200ms Floor" result="Faster letters at higher levels" />
              <DrillRuleItem num="4" text="Timeout (No Response)" highlight="Zero Penalties" result="No score, time, or life lost" />
              <DrillRuleItem num="5" text="Wrong Judgment" highlight="-1 Life (5 total)" result="Drill ends early if lives reach 0" />
            </div>
          </DrillAccordion>

          {/* ACCORDION 2: ABOUT 3-BACK TRAINING PRO */}
          <DrillAccordion
            id="about"
            title="About 3-Back Training Pro"
            isOpen={openAccordion === 'about'}
            onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
          >
            <div className="space-y-8">
              <section>
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-cyan-400" /> What Is N-Back Training?
                </h4>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>N-Back Training</strong> is the gold-standard cognitive working memory paradigm used across neuroscientific research to measure fluid intelligence and memory updating capacity. The <strong>3-Back Training drill</strong> presents continuous letter streams, requiring you to determine whether the current item matches the letter presented 'N' steps ago.
                </p>
                <p className="text-sm leading-relaxed">
                  By practicing <strong>working memory updating</strong>, you expand your executive control buffer and strengthen information manipulation speed under time pressure.
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                    <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Students improving focus, professionals maintaining mental agility, researchers studying working memory, and cognitive athletes.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                    <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Working memory capacity, cognitive control, sustained attention, information updating, and executive function.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                    <h5 className="text-xs font-bold text-white">Sub-Vocalization</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Mentally repeat the last 3 letters in order to keep your working memory buffer continuously updated.</p>
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
              <DrillFAQItem q="What is the 3-Back Training Pro Drill?" a="A free N-Back working memory task. Letters appear every 2 seconds. Compare current letter to the one from 3 steps back." />
              <DrillFAQItem q="Why is N-Back considered the gold standard?" a="It requires continuous working memory updating and executive control. Neuroscientific research shows improvements in working memory capacity and fluid intelligence." />
              <DrillFAQItem q="How does progressive difficulty work?" a="Starts at 3-Back. Every 1200 points earned (roughly 8 correct judgments) automatically increments the N-Back level to 4-Back and beyond, and the letter display speeds up." />
              <DrillFAQItem q="Are there negative score or time penalties?" a="No incorrect judgment ever deducts score points or reduces remaining timer seconds. A timed-out (unanswered) letter costs nothing at all. A wrong Match/No Match click costs 1 of your 5 lives, though — see the next question." />
              <DrillFAQItem q="What are the hearts / lives for?" a="You start each run with 5 lives. A wrong Match/No Match judgment costs 1 life (a timeout costs none); if you run out, the drill ends immediately and shows your results. This keeps a bad guessing streak from dragging the full 45 seconds." />
              <DrillFAQItem q="Does difficulty decrease on mistakes?" a="No. Your N-Back level only ever goes up — a mistake never takes you back down, so you can safely master your current level." />
              <DrillFAQItem q="How long does each drill session last?" a="Each round is timed for exactly 45 seconds of continuous focus." />
              <DrillFAQItem q="Do I need to sign up?" a="No registration required. This drill runs directly in your browser with instant response." />
              <DrillFAQItem q="What is the difference between N-Back and Dual N-Back?" a="This drill is a single-modality (letter) N-Back. Dual N-Back adds a second, simultaneous stream (typically spatial position) that must be tracked independently — a harder variant sometimes linked to fluid intelligence gains in research, though results are debated." />
              <DrillFAQItem q="Can N-Back training increase IQ?" a="Some early studies suggested N-Back training could raise fluid intelligence scores, though later replication attempts produced mixed results. What is well-supported is that regular N-Back practice reliably improves performance on working-memory tasks themselves." />
              <DrillFAQItem q="What is a good N-Back level to reach?" a="Comfortably sustaining 3-Back with high accuracy is a solid baseline. Advancing to 4-Back or 5-Back with consistent accuracy places you well above average working memory capacity." />
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
              <RelatedCard href="/drills/memory/short-term-memory/word-recall" title="Word Recall" desc="Free recall random word lists under time pressure." cat="Short-Term Memory" />
              <RelatedCard href="/drills/memory/short-term-memory/color-sequence" title="Color Sequence" desc="Watch and recall color sequences." cat="Short-Term Memory" />
              <RelatedCard href="/drills/memory/short-term-memory/digit-span" title="Digit Span" desc="Train numerical short-term memory capacity." cat="Short-Term Memory" />
            </div>
          </section>
        )}
      </main>

      {/* SITE FOOTER */}
      {!isFullscreen && <DrillFooter />}
    </div>
  );
}

// === Subcomponents ===
function RelatedCard({ href, title, desc, cat }) {
  return (
    <Link href={href} className="group bg-[#0c0c16] border border-white/5 hover:border-cyan-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
      <div>
        {cat && <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1">{cat}</div>}
        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">{title}</div>
        <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{desc}</div>
      </div>
      <div className="text-[10px] font-bold text-slate-500 group-hover:text-cyan-400 mt-3 flex items-center gap-1 transition-colors">
        Train Drill <span>→</span>
      </div>
    </Link>
  );
}
