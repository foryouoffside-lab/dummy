'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  BookOpen, Brain, Play, RefreshCw,
  TrendingUp, Volume2, VolumeX,
  Zap, ZapOff, Users, Share2, ArrowLeft,
  SkipForward, Target, Trophy
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
const ELITE_SCORE = 1100; // Target score for S+ rating (rebalanced after combo removal)
const STORAGE_KEY = 'skilldrills_memory_word_recall_v4';

const WORD_BANK = [
  "apple", "bridge", "castle", "diamond", "eagle", "forest", "garden", 
  "hammer", "island", "jungle", "knight", "lantern", "mountain", "needle",
  "ocean", "palace", "queen", "rocket", "sunset", "temple", "umbrella",
  "valley", "window", "yellow", "zebra", "candle", "dragon", "feather",
  "silver", "golden", "marble", "velvet", "crystal", "bronze", "copper",
  "shadow", "spirit", "wisdom", "honor", "glory", "dream", "storm",
  "river", "cloud", "flame", "stone", "thunder", "rainbow", "phoenix"
];

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, bestWords: 3, totalSessions: 0 };
    return { bestScore: 0, bestWords: 3, totalSessions: 0, ...JSON.parse(raw) };
  } catch (e) {
    return { bestScore: 0, bestWords: 3, totalSessions: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

export default function WordRecallClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const { flashes, triggerFlash } = useDrillFlash();

  // Phase inside gameplay: 'memorize' | 'input' | 'feedback'
  const [phase, setPhase] = useState('memorize');
  const [wordCountLevel, setWordCountLevel] = useState(3);
  const [currentWords, setCurrentWords] = useState([]);
  const [userSequence, setUserSequence] = useState('');
  const [memTimeDisplay, setMemTimeDisplay] = useState(8);
  const [lastResult, setLastResult] = useState({ correct: [], missed: [], extra: [] });

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [bestWords, setBestWords] = useState(3);
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
  const inputRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  const gameTimeoutsRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const startingRef = useRef(false);
  const gameActiveRef = useRef(false);
  const phaseRef = useRef('memorize');
  const memorizeTimeRef = useRef(8.0);

  const engine = useRef({
    score: 0,
    level: 3,
    timeLeft: DRILL_DURATION,
    perfectHits: 0,
    missedClicks: 0,
    totalActions: 0,
    currentWords: [],
    userSequence: '',
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
      bestWords: Math.max(prevSaved.bestWords, e.level),
      totalSessions: (prevSaved.totalSessions || 0) + 1,
    };
    saveData(updatedData);

    setBestScore(updatedData.bestScore);
    setBestWords(updatedData.bestWords);

    drillAudio?.playSessionEnd?.();
  }, [clearGameTimeouts]);

  // Skip memorization phase manually or on timer expiry
  const skipMemorization = useCallback(() => {
    if (phaseRef.current === 'memorize' && gameActiveRef.current) {
      setPhase('input');
      phaseRef.current = 'input';

      // Focus input text area
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);

      // 10s Timeout for input phase
      const tInputTimeout = setTimeout(() => {
        if (gameActiveRef.current && phaseRef.current === 'input') {
          // Force submission on timeout
          const e = engine.current;
          e.missedClicks++;
          e.level = Math.max(3, e.level - 1);
          setWordCountLevel(e.level);

          drillAudio?.playPenalty?.();
          triggerFlash();
          setPhase('feedback');
          phaseRef.current = 'feedback';

          const tNext = setTimeout(() => {
            if (gameActiveRef.current && startSequenceCycleRef.current) {
              startSequenceCycleRef.current();
            }
          }, 1500);
          gameTimeoutsRef.current.push(tNext);
        }
      }, 12000);
      gameTimeoutsRef.current.push(tInputTimeout);
    }
  }, [triggerFlash]);

  // Sequence Player & Cycle Handler
  const startSequenceCycle = useCallback(() => {
    if (!gameActiveRef.current) return;
    clearGameTimeouts();

    const e = engine.current;
    const count = e.level;
    const shuffled = [...WORD_BANK].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    e.currentWords = selected;
    e.userSequence = '';
    setCurrentWords(selected);
    setUserSequence('');

    setPhase('memorize');
    phaseRef.current = 'memorize';

    const memTime = 2.0; // Fixed 2-second memorization window
    memorizeTimeRef.current = memTime;
    setMemTimeDisplay(2);
    drillAudio?.playTick?.();

    const tMemTimer = setInterval(() => {
      if (!gameActiveRef.current || phaseRef.current !== 'memorize') {
        clearInterval(tMemTimer);
        return;
      }
      memorizeTimeRef.current -= 0.2;
      if (memorizeTimeRef.current <= 0) {
        clearInterval(tMemTimer);
        skipMemorization();
      } else {
        setMemTimeDisplay(Math.ceil(memorizeTimeRef.current));
      }
    }, 200);

    gameTimeoutsRef.current.push(tMemTimer);
  }, [clearGameTimeouts, skipMemorization]);

  useEffect(() => {
    startSequenceCycleRef.current = startSequenceCycle;
  }, [startSequenceCycle]);

  // Submission & Evaluator Handler
  const handleSubmission = useCallback(() => {
    if (!gameActiveRef.current || phaseRef.current !== 'input') return;
    clearGameTimeouts();

    const e = engine.current;
    const rawInput = e.userSequence.toLowerCase().split(/[,\s]+/).filter(Boolean);
    const recalled = [...new Set(rawInput)];
    const targetWords = e.currentWords.map((w) => w.toLowerCase());

    const correctWords = recalled.filter((w) => targetWords.includes(w));
    const extraWords = recalled.filter((w) => !targetWords.includes(w));
    const missedWords = targetWords.filter((w) => !recalled.includes(w));

    const correctCount = correctWords.length;
    const errorCount = extraWords.length + missedWords.length;

    setLastResult({ correct: correctWords, missed: missedWords, extra: extraWords });
    setPhase('feedback');
    phaseRef.current = 'feedback';

    if (errorCount === 0 && correctCount === targetWords.length) {
      // PERFECT ROUND
      e.perfectHits++;

      const levelBonus = 1 + (e.level - 3) * 0.15;
      const pts = Math.round(150 * levelBonus);

      e.score += pts;
      e.level = Math.min(12, e.level + 1);

      setUiScore(e.score);
      setWordCountLevel(e.level);
      drillAudio?.playHit?.();

      const t = setTimeout(() => {
        if (gameActiveRef.current && startSequenceCycleRef.current) {
          startSequenceCycleRef.current();
        }
      }, 1500);
      gameTimeoutsRef.current.push(t);
    } else {
      // MISS / ERRORS MADE — NO negative score or time deduction! Red flash & penalty sound.
      e.missedClicks++;
      e.level = Math.max(3, e.level - 1);

      setWordCountLevel(e.level);
      drillAudio?.playPenalty?.();
      triggerFlash();

      const t = setTimeout(() => {
        if (gameActiveRef.current && startSequenceCycleRef.current) {
          startSequenceCycleRef.current();
        }
      }, 2000);
      gameTimeoutsRef.current.push(t);
    }
  }, [clearGameTimeouts, triggerFlash]);

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
    setWordCountLevel(3);
    setPhase('memorize');

    engine.current = {
      score: 0,
      level: 3,
      timeLeft: DRILL_DURATION,
      perfectHits: 0,
      missedClicks: 0,
      totalActions: 0,
      currentWords: [],
      userSequence: '',
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
    const url = 'https://skilldrills.online/drills/memory/short-term-memory/word-recall';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.grade || analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '📖' },
        newBest: isNewBest,
        drillName: 'Word Recall Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Peak Word Level: ${analytics.finalLevel}) on Word Recall Pro! Accuracy: ${analytics.accuracy}%. Train verbal memory at skilldrills.online!`;
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
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            WORD RECALL
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verbal Short-Term Memory Recall Under Speed Constraints
          </p>
        </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
        <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
            <div className="text-lg sm:text-xl font-black text-pink-400 tabular-nums">{uiScore}</div>
          </div>
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
            <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {uiTimeLeft}s
            </div>
          </div>
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Words</div>
            <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">{wordCountLevel} Words</div>
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
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 w-full h-full relative z-20 overflow-y-auto">
              
              {/* MEMORIZE PHASE DISPLAY */}
              {phase === 'memorize' && (
                <div className="w-full max-w-xl text-center animate-in fade-in zoom-in-95 duration-200 my-auto">
                  <span className="text-pink-400 font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 block">MEMORIZE WORDS</span>
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-4">
                    {currentWords.map((word, i) => (
                      <span key={i} className="px-4 py-2 sm:px-5 sm:py-2.5 bg-black/60 border border-pink-500/30 rounded-xl text-white font-mono font-black text-xl sm:text-2xl tracking-wider shadow-md">
                        {word}
                      </span>
                    ))}
                  </div>
                  <button
                    onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); skipMemorization(); }}
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:border-pink-500/40 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer touch-none"
                  >
                    <SkipForward className="w-3.5 h-3.5" /> Skip
                  </button>
                </div>
              )}

              {/* INPUT PHASE: TEXT RECALL ENTRY */}
              {phase === 'input' && (
                <div className="w-full max-w-xl flex flex-col items-center justify-center my-auto animate-in fade-in zoom-in-95 duration-200">
                  <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 text-center">TYPE RECALLED WORDS</span>
                  
                  <textarea
                    ref={inputRef}
                    value={userSequence}
                    onChange={(e) => {
                      engine.current.userSequence = e.target.value;
                      setUserSequence(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSubmission();
                      }
                    }}
                    className="w-full h-24 sm:h-32 p-4 rounded-2xl border border-white/20 outline-none resize-none text-base sm:text-xl font-mono transition-all bg-black/80 text-white focus:border-cyan-400 shadow-inner mb-4"
                    placeholder="Type recalled words separated by spaces..."
                    autoFocus
                    spellCheck="false"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                  
                  <button 
                    onClick={handleSubmission}
                    disabled={!userSequence.trim()}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-black tracking-widest text-base sm:text-lg hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-98 cursor-pointer shadow-lg shadow-cyan-600/20"
                  >
                    SUBMIT RECALL
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-2 font-medium">Press Enter to submit</p>
                </div>
              )}

              {/* FEEDBACK PHASE */}
              {phase === 'feedback' && (
                <div className="w-full max-w-xl text-center animate-in fade-in duration-100 my-auto">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">RECALL EVALUATION</span>
                  
                  <div className="bg-gray-900/90 border border-white/10 p-4 sm:p-6 rounded-2xl shadow-inner min-h-[140px]">
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                      {currentWords.map((word, i) => {
                        const isCorrect = lastResult.correct.includes(word.toLowerCase());
                        return (
                          <span key={i} className={`px-3 py-1.5 rounded-lg font-mono font-bold text-sm sm:text-base border ${
                            isCorrect 
                              ? 'bg-green-500/20 text-green-400 border-green-500/40' 
                              : 'bg-red-500/20 text-red-400 border-red-500/40 line-through'
                          }`}>
                            {isCorrect ? '✓' : '✗'} {word}
                          </span>
                        );
                      })}
                    </div>
                    
                    {lastResult.extra.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <span className="text-xs text-gray-400 font-bold uppercase block mb-1.5">Extra / Incorrect Words Typed:</span>
                        <div className="flex flex-wrap items-center justify-center gap-1.5">
                          {lastResult.extra.map((word, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-md bg-orange-500/20 text-orange-400 border border-orange-500/30 font-mono text-xs">
                              {word}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={BookOpen}
              accent="pink"
              title="Word Recall Pro"
              subtitle="Verbal Short-Term Memory • Word Recall"
              rules={[
                { icon: Target, accent: 'purple', title: 'Memorize Word List', text: 'Study the list of words presented during the flash phase' },
                { icon: Zap, accent: 'blue', title: 'Free Verbal Recall', text: 'Type or submit as many words as you can remember' },
              ]}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: TrendingUp, label: 'Best Words', value: `${bestWords} Words`, color: 'text-blue-400', accent: 'blue' },
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
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(236,72,153,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade?.color || 'text-pink-400'}`}>
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
                    <p className="text-sm sm:text-base font-black text-white">{analytics.finalLevel} Words</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Words</p>
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
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
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
              <DrillRuleItem num="1" text="Perfect Recall" highlight="+150 PTS" result="Adds 1 Word to List" />
              <DrillRuleItem num="2" text="Level Bonus" highlight="Up to +135% PTS" result="Longer lists = more points per hit" />
              <DrillRuleItem num="3" text="Miss / Timeout" highlight="-1 Word" result="No score or time loss" />
              <DrillRuleItem num="4" text="Adaptive Span Test" highlight="Rises & Falls" result="Converges on your true word span" />
            </div>
          </DrillAccordion>

          {/* ACCORDION 2: ABOUT WORD RECALL PRO */}
          <DrillAccordion
            id="about"
            title="About Word Recall Pro"
            isOpen={openAccordion === 'about'}
            onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
          >
            <div className="space-y-8">
              <section>
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-pink-400" /> What Is Word Recall Training?
                </h4>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>Word Recall Training</strong> is a free recall verbal memory exercise used in cognitive psychology to evaluate short-term memory capacity. The <strong>Word Recall drill</strong> presents random word lists, testing your ability to memorize and type back exact words without order restrictions.
                </p>
                <p className="text-sm leading-relaxed">
                  By practicing <strong>narrative story linking</strong>, you expand your verbal short-term memory buffer and increase your information retrieval speed under time pressure.
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                    <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Students enhancing study retention, professionals strengthening verbal recall, and anyone wanting to benchmark working memory capacity.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-pink-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                    <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Verbal short-term memory, working memory span, free recall, and focus under time pressure.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                    <h5 className="text-xs font-bold text-white">Narrative Chunking</h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">Connect words into a mini-story (e.g., "The eagle flew over the castle") to bypass standard short-term memory limits.</p>
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
              <DrillFAQItem q="What is the Word Recall Drill?" a="A free verbal memory exercise. Memorize random word lists, then type out recalled words without order constraints." />
              <DrillFAQItem q="What is free recall and why is it important?" a="Retrieving information without cues or multiple choice. More challenging than recognition tests and better reflects real-world memory demands." />
              <DrillFAQItem q="How does progressive difficulty work?" a="Start at 3 words. Perfect recall advances to the next level with +1 word, up to 12. Any mistake drops you back one level." />
              <DrillFAQItem q="Does word order matter when typing?" a="No. This is a free recall test. You can type recalled words in any order separated by spaces." />
              <DrillFAQItem q="Are there negative score or time penalties?" a="No. Missing or extra words never deduct score points or reduce remaining timer seconds — they only decrease the word count level (this drill is an adaptive span test, so that's intentional, not a penalty)." />
              <DrillFAQItem q="Do I need to sign up?" a="No registration required. This drill runs directly in your browser with instant response." />
              <DrillFAQItem q="How long does each drill session last?" a="Each round is timed for exactly 45 seconds of continuous focus." />
              <DrillFAQItem q="Can I skip the memorization timer?" a="Yes! Click the SKIP button as soon as you finish memorizing the word list to enter the typing phase immediately." />
              <DrillFAQItem q="What is the average adult word span?" a="Most adults can freely recall around 5-9 words from a single presented list, consistent with the classic 'magic number seven' finding in short-term memory research." />
              <DrillFAQItem q="How does chunking improve word recall?" a="Grouping unrelated words into a mini-narrative or shared category converts several isolated items into one meaningful unit, letting you effectively store more information within your limited short-term memory capacity." />
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
    <Link href={href} className="group bg-[#0c0c16] border border-white/5 hover:border-pink-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
      <div>
        {cat && <div className="text-[10px] font-bold text-pink-400 uppercase tracking-wider mb-1">{cat}</div>}
        <div className="text-xs font-bold text-white group-hover:text-pink-300 transition-colors">{title}</div>
        <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{desc}</div>
      </div>
      <div className="text-[10px] font-bold text-slate-500 group-hover:text-pink-400 mt-3 flex items-center gap-1 transition-colors">
        Train Drill <span>→</span>
      </div>
    </Link>
  );
}
