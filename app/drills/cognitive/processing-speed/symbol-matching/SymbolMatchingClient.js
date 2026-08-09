'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Target, Volume2, VolumeX,
  Play, RefreshCw, Share2, ArrowLeft, Heart, Users, TrendingUp, Repeat, Zap, Trophy
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import { getDifficultyProgress, getStartLevel } from '../../../../../lib/drillDifficulty';
import useDrillFlash from '../../../../../lib/useDrillFlash';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import DrillFlashOverlay from '../../../../../components/drill/DrillFlashOverlay';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';

const DRILL_DURATION = 45;
const MAX_LIVES = 5;
const POINTS_PER_HIT = 100;
const POINTS_PER_LEVEL = 250;
const ELITE_SCORE = 7500; // Target score for S+ rating (rebalanced after combo removal)
const STORAGE_KEY = 'skilldrills_symbol_matching_v7';

const ALL_SYMBOLS = ['Δ', 'Φ', 'Ω', 'Σ', 'Ξ', 'Π'];

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



const getLevelConfig = (level) => {
  const p = getDifficultyProgress(level); // 0 -> 1 across L1..L15
  return {
    ttl: Math.max(600, Math.round(2200 - p * 1600)) // Trial duration 2200ms -> 600ms
  };
};

const RULES_ITEMS = [
  { title: "Symbol Digit Modality", text: "A key mapping bar at the top assigns 6 unique Greek symbols to digits 1 through 6." },
  { title: "Target Symbol Prompt", text: "A target symbol appears in the central display. Tap the digit button that matches its assigned number." },
  { title: "Visual Search & Translation", text: "Rapidly translate visual symbol patterns into numeric motor responses under strict time pressure." },
  { title: "Precision Matters", text: "Tapping the wrong digit or letting a trial time out triggers a red alert — stay sharp to keep your accuracy high." }
];

const ABOUT_TEXT = `Symbol Matching is modeled after the clinical Symbol Digit Modality Test (SDMT), a gold-standard neuropsychological evaluation for measuring information processing speed, visual scanning efficiency, and working memory translation.

In cognitive testing, SDMT performance correlates strongly with neuro-muscular throughput, executive function, and attentional endurance. By requiring subjects to cross-reference unfamiliar visual symbols against a key matrix, it measures the speed of central information processing.

Regular practice on Symbol Matching enhances visual-spatial scanning, working memory lookup speed, and rapid cognitive translation.`;

const FAQ_ITEMS = [
  { q: "What is the Digit Symbol Substitution Test (DSST)?", a: "The Digit Symbol Substitution Test (DSST) is a classic neuropsychological test from the Wechsler Adult Intelligence Scale (WAIS). A legend at the top maps digits (1-9) to unique symbols. You must rapidly scan rows of digits below and write or select the corresponding symbol for each. It measures processing speed, visual scanning efficiency, short-term associative memory, and executive attention." },
  { q: "What does the symbol matching test measure?", a: "Symbol matching measures: (1) Processing speed — how quickly your brain can look up and apply the digit-to-symbol mapping, (2) Visual scanning — efficient eye movement across the legend and test items, (3) Associative learning — binding digit-symbol pairs in short-term memory, (4) Executive attention — sustaining the task over repeated monotonous items, and (5) Motor speed — the time to indicate your response." },
  { q: "What is the difference between DSST and SDMT?", a: "In the DSST (Wechsler), you look at a digit and must write the corresponding symbol. In the SDMT (Symbol Digit Modalities Test by Smith, 1973), you look at a symbol and must write or say the corresponding digit. The SDMT is often preferred in clinical settings because oral administration (saying numbers aloud) removes motor speed as a confounding variable, isolating pure cognitive processing speed." },
  { q: "Is this symbol matching test used for dementia screening?", a: "Yes. The DSST and SDMT are among the most sensitive cognitive screening tools for neurological conditions including multiple sclerosis, Parkinson's disease, traumatic brain injury, and early Alzheimer's disease. Processing speed measured by symbol substitution tests declines measurably years before other cognitive deficits appear, making it a valuable early marker." },
  { q: "How can I improve my cognitive processing speed?", a: "Evidence-based approaches include: (1) Regular computerized cognitive training (speed of processing games like DSST/SDMT), (2) Aerobic exercise (most consistently shown to improve processing speed across all ages), (3) Optimal sleep quality (sleep is critical for synaptic consolidation and myelination), (4) Cardiovascular health management (reduced vascular risk improves white matter integrity), and (5) Reducing chronic stress and inflammation." },
  { q: "What is processing speed and why does it matter?", a: "Cognitive processing speed is the rate at which your brain can take in, comprehend, and begin to respond to information. It is one of the most important global indicators of overall brain health and is highly correlated with general intelligence. Faster processing means you can read faster, make decisions more quickly, follow conversations more easily, and react to environmental changes with less latency." },
  { q: "How does the DSST predict future cognitive decline?", a: "Longitudinal studies show that DSST performance in midlife (ages 40-60) is a strong predictor of cognitive status in older age. Individuals with faster symbol substitution scores at 45-55 years show significantly lower rates of dementia and cognitive impairment at 75-85 years. This makes DSST-style training a potentially high-value preventive cognitive health activity." },
  { q: "What strategies help improve symbol matching speed?", a: "Key strategies: (1) Memorize the legend early — don't look up every symbol, build automatic digit-symbol associations from the start, (2) Use chunking — match 2-3 items before re-scanning the legend, (3) Optimize eye movement — minimize the distance your eye travels between legend and test items with consistent scanning patterns, (4) Practice regularly — DSST performance improves significantly with repeated practice sessions." },
  { q: "What is the average DSST score for adults?", a: "In the WAIS-IV standardization, the average DSST score for adults aged 20-34 is approximately 70-75 correct symbols in 120 seconds. Scores decline with age: 50-64 year-olds average 55-60, and 65-79 year-olds average 45-52. Top performers in cognitive training studies can achieve 85-100+ with extensive practice." },
  { q: "Is this symbol matching test free to play online?", a: "Yes. The Symbol Matching drill on SkillDrills is completely free. No registration, downloads, or subscriptions required. It runs directly in your browser on desktop and mobile, measuring your processing speed and providing performance feedback after each session." }
];

const RELATED_DRILLS = [
  { id: "reaction-time", name: "Reaction Time", cat: "Processing Speed", desc: "Train choice reaction speed and visual reflex latency.", href: "/drills/cognitive/processing-speed/reaction-time" },
  { id: "rsvp-reader", name: "RSVP Speed Reader", cat: "Processing Speed", desc: "Process rapid serial visual presentation text streams.", href: "/drills/cognitive/processing-speed/rsvp-reader" },
  { id: "divided-attention", name: "Divided Attention", cat: "Attention", desc: "Track and react to multiple independent target streams simultaneously.", href: "/drills/cognitive/attention/divided-attention" },
  { id: "distraction-fighter", name: "Distraction Fighter", cat: "Focus", desc: "Filter out high-interference Stroop visual distractors.", href: "/drills/cognitive/focus/distraction-fighter" },
  { id: "concentration-grid", name: "Concentration Grid", cat: "Focus", desc: "Scan and tap sequential numbers on expanding grid matrices.", href: "/drills/cognitive/focus/concentration-grid" },
  { id: "multi-tasking", name: "Multi-Tasking", cat: "Attention", desc: "Track dual independent target streams under speed pressure.", href: "/drills/cognitive/attention/multi-tasking" }
];

export default function SymbolMatchingClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);

  // Live HUD State
  const [uiScore, setUiScore] = useState(0);
  const [uiLives, setUiLives] = useState(MAX_LIVES);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  // Active Symbol Key Mapping & Target
  const [keyMap, setKeyMap] = useState([]); // [{ digit: 1, symbol: 'Δ' }, ...]
  const [currentTarget, setCurrentTarget] = useState(null); // { digit: 1, symbol: 'Δ' }

  // Analytics
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    successfulHits: 0,
    mistakes: 0,
    timeouts: 0,
    finalLevel: 1,
    grade: null
  });

  // DOM & Engine Refs
  const containerRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const trialTimerRef = useRef(null);

  const engine = useRef({
    score: 0,
    level: 1,
    lives: MAX_LIVES,
    successfulHits: 0,
    mistakes: 0,
    timeouts: 0,
    timeLeft: DRILL_DURATION,
    keyMap: [],
    currentTarget: null
  });

  const { flashes, triggerFlash } = useDrillFlash();

  // Screen/Orientation tracking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkDevice = () => {
        setIsMobile(window.innerWidth < 768);
        setIsPortrait(window.innerHeight > window.innerWidth);
      };
      checkDevice();
      window.addEventListener('resize', checkDevice);
      window.addEventListener('orientationchange', checkDevice);

      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestLevel(saved.bestLevel || 1);
      setTotalSessions(saved.totalSessions || 0);

      const handleFs = () => setIsFullscreen(!!document.fullscreenElement);
      document.addEventListener('fullscreenchange', handleFs);

      return () => {
        window.removeEventListener('resize', checkDevice);
        window.removeEventListener('orientationchange', checkDevice);
        document.removeEventListener('fullscreenchange', handleFs);
      };
    }
  }, []);

  // Sound sync
  useEffect(() => {
    drillAudio.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (trialTimerRef.current) clearTimeout(trialTimerRef.current);
    };
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (trialTimerRef.current) clearTimeout(trialTimerRef.current);

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    setGameState('start');
  }, []);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  const endGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (trialTimerRef.current) clearTimeout(trialTimerRef.current);

    setGameState('gameOver');

    const e = engine.current;
    const totalActs = e.successfulHits + e.mistakes + e.timeouts;
    const acc = totalActs > 0 ? Math.round((e.successfulHits / totalActs) * 100) : 100;

    const gradeObj = getFpsScoreGrade(e.score, ELITE_SCORE);

    setAnalytics({
      accuracy: acc,
      successfulHits: e.successfulHits,
      mistakes: e.mistakes,
      timeouts: e.timeouts,
      finalLevel: e.level,
      grade: gradeObj
    });

    const isNew = e.score > bestScore;
    if (isNew) {
      setIsNewBest(true);
      setBestScore(e.score);
    } else {
      setIsNewBest(false);
    }

    const newBestLevel = Math.max(bestLevel, e.level);
    setBestLevel(newBestLevel);

    setTotalSessions((prev) => {
      const next = prev + 1;
      saveData({
        bestScore: Math.max(bestScore, e.score),
        bestLevel: newBestLevel,
        totalSessions: next
      });
      return next;
    });

    drillAudio.playSessionEnd();
  }, [bestScore, bestLevel]);

  // Trial Spawner
  const spawnTrial = useCallback(() => {
    if (trialTimerRef.current) clearTimeout(trialTimerRef.current);
    const e = engine.current;
    const config = getLevelConfig(e.level);

    // Pick random item from key map
    const target = e.keyMap[Math.floor(Math.random() * e.keyMap.length)];
    e.currentTarget = target;
    setCurrentTarget(target);

    trialTimerRef.current = setTimeout(() => {
      // Timeout miss - NO life lost (timeouts do not cost lives)
      e.timeouts += 1;
      triggerFlash();
      drillAudio.playPenalty();
      spawnTrial();
    }, config.ttl);
  }, [triggerFlash]);

  const handleDigitClick = useCallback((digit, ev) => {
    if (ev) ev.stopPropagation();
    if (trialTimerRef.current) clearTimeout(trialTimerRef.current);

    const eng = engine.current;

    if (eng.currentTarget && digit === eng.currentTarget.digit) {
      eng.successfulHits += 1;

      eng.score += POINTS_PER_HIT;

      const rawLevel = Math.floor(eng.score / POINTS_PER_LEVEL) + 1;
      eng.level = Math.max(eng.level, rawLevel);

      setUiScore(eng.score);
      drillAudio.playHit();
      spawnTrial();
    } else {
      // Wrong click / mistake: lose 1 life!
      eng.mistakes += 1;
      eng.lives -= 1;
      setUiLives(Math.max(0, eng.lives));
      triggerFlash();
      drillAudio.playPenalty();

      if (eng.lives <= 0) {
        endGame();
      } else {
        spawnTrial();
      }
    }
  }, [spawnTrial, triggerFlash, endGame]);

  // Enter Drill
  const enterDrill = useCallback(async () => {
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (e) {}

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (trialTimerRef.current) clearTimeout(trialTimerRef.current);

    drillAudio.init();

    const saved = getSavedData();
    const startLevel = getStartLevel(saved.bestLevel);

    // Generate random symbol-to-digit key mapping (6 digits: 1 to 6)
    const shuffledSymbols = [...ALL_SYMBOLS].sort(() => Math.random() - 0.5);
    const newKeyMap = shuffledSymbols.slice(0, 6).map((sym, idx) => ({ digit: idx + 1, symbol: sym }));
    setKeyMap(newKeyMap);

    setUiScore(0);
    setUiLives(MAX_LIVES);
    setUiTimeLeft(DRILL_DURATION);

    engine.current = {
      score: 0,
      level: startLevel,
      lives: MAX_LIVES,
      successfulHits: 0,
      mistakes: 0,
      timeouts: 0,
      timeLeft: DRILL_DURATION,
      keyMap: newKeyMap,
      currentTarget: newKeyMap[0]
    };

    setGameState('countdown');
    setCountdownValue(3);
    drillAudio.playCountdownTick();

    const t1 = setTimeout(() => {
      setCountdownValue(2);
      drillAudio.playCountdownTick();
    }, 700);

    const t2 = setTimeout(() => {
      setCountdownValue(1);
      drillAudio.playCountdownTick();
    }, 1400);

    const t3 = setTimeout(() => {
      setCountdownValue('GO');
      drillAudio.playGo();
    }, 2100);

    const t4 = setTimeout(() => {
      setGameState('playing');

      let remaining = DRILL_DURATION;
      timerIntervalRef.current = setInterval(() => {
        remaining -= 1;
        setUiTimeLeft(remaining);
        if (remaining <= 0) {
          endGame();
        }
      }, 1000);

      spawnTrial();
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [endGame, spawnTrial]);

  const shareResult = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/cognitive/processing-speed/symbol-matching';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.grade || analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Symbol Matching',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Symbol Matching! SDMT processing accuracy: ${analytics.accuracy}%. Practice free cognitive focus drills at skilldrills.online! ⚡`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'Symbol Matching Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(`${text} ${url}`);
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
            <Link href="/drills/cognitive" className="hover:text-white transition-colors">Cognitive</Link>
            <span>/</span>
            <span className="text-cyan-400 font-medium">Symbol Matching</span>
          </div>

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
        </div>
      </header>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
            SYMBOL MATCHING
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Rapid Visual Matching & Symbol Discrimination Under Pressure
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
            <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">L{engine.current.level}</div>
          </div>
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Score</div>
            <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums">{bestScore}</div>
          </div>
        </div>
        )}

        {/* DRILL BOX CONTAINER */}
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
          {/* Red Flash Overlay */}
          {flashes.map((f) => (
            <div key={f.id} className="fx-flash fx-flash-red" />
          ))}

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              {/* Top Left: Score & 5 Hearts */}
              <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col items-start gap-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                <p className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-tight">{uiScore}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {Array.from({ length: MAX_LIVES }).map((_, idx) => {
                    const active = idx < uiLives;
                    return (
                      <Heart
                        key={idx}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-200 ${
                          active
                            ? 'fill-red-500 text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]'
                            : 'fill-slate-800 text-slate-800'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Top Right: Time Left */}
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time Left</p>
                <p className={`text-2xl sm:text-3xl font-black tabular-nums leading-tight ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</p>
              </div>
            </>
          )}

          {/* IN-GAME HUD SOUND TOGGLE */}
          {gameState === 'playing' && (
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setSoundEnabled((v) => {
                  drillAudio.setEnabled(!v);
                  return !v;
                });
              }}
              className="absolute bottom-4 right-4 z-40 p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          )}

          {/* PLAYING BOARD */}
          {gameState === 'playing' && (
            <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6">
              {/* Background Grid */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              {/* Legend Key Mapping Header (6 Symbol-Digit Pairs - Centered to prevent Score & Time overlap) */}
              <div className="z-20 w-full max-w-[280px] sm:max-w-xs md:max-w-md bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 p-1.5 sm:p-2.5 shadow-xl grid grid-cols-6 gap-1 sm:gap-2 mt-1 sm:mt-2">
                {keyMap.map((pair) => (
                  <div key={pair.digit} className="flex flex-col items-center justify-center bg-white/[0.03] border border-white/5 rounded-xl py-1 sm:py-1.5">
                    <span className="text-sm sm:text-lg font-bold text-white font-serif leading-none">{pair.symbol}</span>
                    <span className="text-[9px] sm:text-xs font-black text-slate-400 mt-1 leading-none">{pair.digit}</span>
                  </div>
                ))}
              </div>

              {/* Target Symbol Center Prompt */}
              <div className="flex-1 flex flex-col items-center justify-center z-20 my-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Target Symbol</div>
                <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                  <span className="text-5xl sm:text-6xl font-black text-white font-serif">
                    {currentTarget ? currentTarget.symbol : '?'}
                  </span>
                </div>
              </div>

              {/* 6 Digit Touch Buttons Grid Bottom (Lifted higher to prevent Sound Button interference) */}
              <div className="z-20 w-full max-w-[320px] sm:max-w-md grid grid-cols-6 gap-1.5 sm:gap-2.5 mb-6 sm:mb-8">
                {[1, 2, 3, 4, 5, 6].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    onPointerDown={(e) => handleDigitClick(digit, e)}
                    className="py-3 sm:py-4 rounded-xl bg-black/70 border border-white/10 hover:border-white/40 hover:bg-white/10 text-white font-black text-base sm:text-lg cursor-pointer active:scale-95 transition-transform flex items-center justify-center shadow-lg"
                  >
                    {digit}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Target}
              accent="cyan"
              title="Symbol Matching"
              subtitle="SDMT Paradigm • Visual Search"
              rules={[
                { icon: Target, accent: 'cyan', title: 'Match Target Symbol to Digit', text: 'Locate target symbol and tap the matching number key' },
                { icon: Zap, accent: 'blue', title: 'Top Key Mapping', text: 'Cross-reference unfamiliar symbols against the top key legend' },
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
            <DrillCountdown value={countdownValue} subtitle="GET READY" accent="#22d3ee" />
          )}

          {/* END SCREEN */}
          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              {/* Left Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(34,211,238,.12), transparent 70%)' }}>
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
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.accuracy}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Accuracy</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-emerald-400">{analytics.successfulHits}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Hits</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-red-400">{analytics.mistakes + analytics.timeouts}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Errors</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Play Again
                  </button>
                  <button 
                    type="button"
                    onClick={shareResult} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title="Share Score"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={handleExitDrill} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title="Exit Drill"
                  >
                    <ArrowLeft className="w-4 h-4 text-red-400" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                {RULES_ITEMS.map((item, i) => (
                  <div key={i} className="bg-[#080811] p-4 rounded-xl border border-white/10">
                    <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                    <p className="text-xs text-gray-300 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Symbol Matching"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8 font-sans">
                <section>
                  <div className="space-y-4">
                    {ABOUT_TEXT.split('\n\n').map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-gray-300">{para}</p>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Anyone who wants a quick self-check on processing speed, students and professionals tracking cognitive health over time, and gamers looking to sharpen rapid visual-to-motor translation.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Information processing speed, visual scanning efficiency, associative working memory, and sustained executive attention over repetitive trials.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Repeat className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Rotating Key Mapping</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">The symbol-to-digit key changes after every answer, preventing rote memorization and forcing a fresh visual lookup on each trial — just like the clinical SDMT.</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i} className="bg-[#05060b] border border-gray-800 rounded-xl p-5">
                    <h4 className="text-sm font-bold text-gray-200 mb-2">{item.q}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </DrillAccordion>
          </div>
        )}

        {/* RELATED DRILLS GRID */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              Related Cognitive Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {RELATED_DRILLS.map((drill) => (
                <Link
                  key={drill.id}
                  href={drill.href}
                  className="group bg-[#0c0c16] border border-white/5 hover:border-cyan-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-cyan-400 mt-3 flex items-center gap-1 transition-colors">
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