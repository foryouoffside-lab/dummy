'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Layers, Volume2, VolumeX, Play, RefreshCw, Share2, Users, TrendingUp, Heart, ArrowLeft, Zap, ZapOff, Trophy, Target } from 'lucide-react';

import { isIdleFrameSkippable } from '@/lib/performance';
import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { drillFlash } from '../../../../../lib/drillFlash';
import { drillTimeout } from '../../../../../lib/drillTimeout';
import { drillPenalty } from '../../../../../lib/drillPenalty';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { getFpsScoreGrade, getComboMultiplier } from '../../../../../lib/scoringEngine';
import { getDifficultyProgress, getStartLevel, ramp } from '../../../../../lib/drillDifficulty';
import useDrillFlash from '../../../../../lib/useDrillFlash';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import DrillFlashOverlay from '../../../../../components/drill/DrillFlashOverlay';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../../components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const MAX_LIVES = 5;
const POINTS_PER_HIT = 100;
const POINTS_PER_LEVEL = 1750; // 250 -> 1750 (7x)
const ELITE_SCORE = 24000; // 10000 -> 24000 (~2.4x)
const TIME_PER_HIT = 0.6; // +0.6s on clean hit
const TIME_PENALTY = 0.8; // -0.8s on wrong tap or miss (opt-in gated)
const STORAGE_KEY = 'skilldrills_divided_attention_v8';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
    return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0, ...JSON.parse(raw) };
  } catch (e) {
    return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

// Continuous unbounded difficulty with streak heat
const getLevelConfig = (level, combo = 0) => {
  const p = getDifficultyProgress(level); // 0 at L1, 1 at L15, unbounded above
  const heat = (getComboMultiplier(combo) - 1) / 2;
  return {
    ballSpeed: Math.max(180, ramp(1800, 240, p) * (1 - heat * 0.25)),
    numSpeed: Math.max(220, ramp(2000, 300, p) * (1 - heat * 0.25)),
    ballScale: Math.max(0.45, 1.0 - p * 0.45),
    spawnDelayMin: Math.max(60, ramp(500, 80, p)),
    spawnDelayMax: Math.max(100, ramp(700, 140, p))
  };
};

const RULES_ITEMS = [
  { title: "Dual-Task Processing", text: "Process two independent streams simultaneously: track moving targets on the visual canvas AND tap MATCH when even numbers appear in the number stream." },
  { title: "Visual Target Stream", text: "Tap moving blue targets as soon as they appear before their display timer expires (+100 PTS × Combo, +0.6s)." },
  { title: "Numerical Match Stream", text: "Numbers (0-9) stream continuously on the side panel. Tap MATCH only when an EVEN number is active (+100 PTS × Combo, +0.6s)." },
  { title: "5 Lives & Penalties", text: "You have 5 lives. Missed targets, missed even numbers, or false matches cost 1 life and reset combo (and deduct 0.8s if enabled). Losing all 5 lives ends the drill early." }
];

const ABOUT_TEXT = `Divided Attention is a core cognitive drill designed to measure and train multi-channel visual tracking and simultaneous information processing. Based on dual-task psychological paradigms, this exercise forces the brain to allocate attention across two distinct channels at once: spatial motion tracking and numeric categorization.

In fast-paced tactical environments (such as esports, aviation, high-frequency trading, and emergency response), peak performers must process secondary telemetry while maintaining primary spatial awareness. Divided Attention builds cognitive flexibility by testing your ability to rapidly shift focus between spatial targets and symbolic data streams without sacrificing accuracy on either.

By scaling target speeds and shrinking target dimensions as your score rises, the drill pushes prefrontal executive control networks to their absolute limit.`;

const FAQ_ITEMS = [
  { q: "What is divided attention in psychology?", a: "Divided attention is the cognitive ability to process two or more independent streams of information simultaneously, splitting your mental bandwidth across multiple tasks. It is a core component of executive function and is essential for activities like driving while navigating or reading while listening to instructions." },
  { q: "What is the difference between divided attention and selective attention?", a: "Selective attention means focusing your full cognitive resources on one task while completely filtering out distractions. Divided attention means allocating resources across two or more tasks simultaneously. In everyday life, you use selective attention when studying in a quiet room and divided attention when walking while talking." },
  { q: "What is an example of divided attention?", a: "Common examples include: driving a car while holding a conversation, cooking while watching television, and taking notes while listening to a lecture. In each case, your brain must maintain separate cognitive loops for distinct input channels at the same time." },
  { q: "Can you improve divided attention with training?", a: "Yes. Research in cognitive neuroscience shows that repeated dual-task training expands your brain's bandwidth to handle parallel processing. The key is practicing tasks that use different sensory channels, such as visual-spatial tracking combined with auditory or numerical processing, which avoids bottlenecks in a single sensory pathway." },
  { q: "What does this divided attention test measure?", a: "This test measures your ability to simultaneously track moving visual targets (visuospatial channel) and identify even or odd numbers (numerical cognition channel). It scores your accuracy in both streams, your response speed, and your resistance to divided-attention errors under time pressure." },
  { q: "How does dual-task training improve cognitive performance?", a: "Dual-task drills create a processing bottleneck in the prefrontal cortex, forcing your executive network to develop more efficient resource allocation strategies. Over time, this reduces the interference effect between tasks, allowing you to maintain accuracy in both channels with less cognitive fatigue." },
  { q: "What skills benefit most from divided attention training?", a: "Professionals who benefit most include air traffic controllers, emergency room nurses, competitive esports players (monitoring minimap + targets), sports athletes (tracking ball + opponents simultaneously), and surgeons managing instruments while reading vital signs." },
  { q: "What is a dual-task paradigm?", a: "A dual-task paradigm is a research and training method where participants must perform two tasks simultaneously. The interference between tasks reveals the cognitive cost of divided attention. This drill implements a visual-numerical dual task, one of the most studied paradigms in attention research." },
  { q: "Is this divided attention test free to use?", a: "Yes. This divided attention drill on SkillDrills is completely free to play with no registration, downloads, or subscriptions required. It runs entirely in your web browser." },
  { q: "How does divided attention affect driving safety?", a: "Divided attention is critical for safe driving. You must simultaneously monitor the road ahead, check mirrors, obey traffic signals, and process GPS instructions. Studies show that insufficient divided attention capacity significantly increases collision risk, especially in complex traffic scenarios." }
];

const RELATED_DRILLS = [
  { id: "multi-tasking", name: "Multi-Tasking", cat: "Attention", desc: "Track dual independent target streams under speed pressure.", href: "/drills/cognitive/attention/multi-tasking" },
  { id: "symbol-matching", name: "Symbol Matching", cat: "Processing Speed", desc: "Match rapid symbol pairs under strict time pressure.", href: "/drills/cognitive/processing-speed/symbol-matching" },
  { id: "concentration-stamina", name: "Concentration Stamina", cat: "Attention", desc: "Sustain continuous visual focus through prolonged high-density sequences.", href: "/drills/cognitive/attention/concentration-stamina" },
  { id: "distraction-fighter", name: "Distraction Fighter", cat: "Focus", desc: "Filter out high-interference Stroop visual distractors.", href: "/drills/cognitive/focus/distraction-fighter" },
  { id: "reaction-time", name: "Reaction Time", cat: "Processing Speed", desc: "Train choice reaction speed and visual reflex latency.", href: "/drills/cognitive/processing-speed/reaction-time" },
  { id: "concentration-grid", name: "Concentration Grid", cat: "Focus", desc: "Scan and tap sequential numbers on expanding grid matrices.", href: "/drills/cognitive/focus/concentration-grid" }
];

export default function DividedAttentionClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);

  // Live HUD State
  const [uiScore, setUiScore] = useState(0);
  const [uiLevel, setUiLevel] = useState(1);
  const [lives, setLives] = useState(MAX_LIVES);
  const [uiCombo, setUiCombo] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  // Active Game State
  const [currentTarget, setCurrentTarget] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [wasMatched, setWasMatched] = useState(true);
  const [ballScale, setBallScale] = useState(1.0);

  // Analytics
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    visualHits: 0,
    numberHits: 0,
    visualAttempts: 0,
    numberAttempts: 0,
    maxCombo: 0,
    livesRemaining: MAX_LIVES,
    finalLevel: 1,
    grade: null
  });

  // Engine Refs
  const containerRef = useRef(null);
  const bestLevelRunRef = useRef(1);
  const countdownTimeoutsRef = useRef([]);
  const ballTimerRef = useRef(null);
  const numTimerRef = useRef(null);
  const startingRef = useRef(false);
  const gameActiveRef = useRef(false);
  const lastTimeRef = useRef(DRILL_DURATION);

  const engine = useRef({
    score: 0,
    level: 1,
    combo: 0,
    maxCombo: 0,
    visualHits: 0,
    numberHits: 0,
    visualAttempts: 0,
    numberAttempts: 0,
    mistakes: 0,
    lives: MAX_LIVES,
    timeLeft: DRILL_DURATION,
    currentTargetId: null,
    currentNumber: null,
    wasMatched: true
  });

  const { flashes, triggerFlash } = useDrillFlash();

  // Storage & settings init
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      setPenaltyEnabled(drillPenalty.isEnabled());
      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestCombo(saved.bestCombo || 0);
      setBestLevel(saved.bestLevel || 1);
      setTotalSessions(saved.totalSessions || 0);
    }
  }, []);

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
      if (ballTimerRef.current) clearTimeout(ballTimerRef.current);
      if (numTimerRef.current) clearTimeout(numTimerRef.current);
    };
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (ballTimerRef.current) clearTimeout(ballTimerRef.current);
    if (numTimerRef.current) clearTimeout(numTimerRef.current);
    startingRef.current = false;
    gameActiveRef.current = false;

    setIsFullscreen(false);
    setGameState('start');
  }, []);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  const endGame = useCallback(() => {
    markIntentionalExit();
    gameActiveRef.current = false;
    startingRef.current = false;
    if (ballTimerRef.current) clearTimeout(ballTimerRef.current);
    if (numTimerRef.current) clearTimeout(numTimerRef.current);

    setGameState('gameOver');

    const e = engine.current;

    if (e.currentTargetId !== null) {
      e.visualAttempts += 1;
    }
    if (e.currentNumber !== null && e.currentNumber % 2 === 0 && !e.wasMatched) {
      e.numberAttempts += 1;
    }

    const totalActs = e.visualAttempts + e.numberAttempts;
    const totalHits = e.visualHits + e.numberHits;
    const acc = totalActs > 0 ? Math.round((totalHits / totalActs) * 100) : 100;

    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const gradeObj = {
      letter: rating.grade || rating.letter || 'C',
      label: rating.label || 'Keep Going',
      color: rating.color || 'text-blue-400',
    };

    setAnalytics({
      accuracy: acc,
      visualHits: e.visualHits,
      numberHits: e.numberHits,
      visualAttempts: e.visualAttempts,
      numberAttempts: e.numberAttempts,
      maxCombo: e.maxCombo,
      livesRemaining: e.lives,
      finalLevel: Math.floor(bestLevelRunRef.current),
      grade: gradeObj
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNew = e.score > prevSaved.bestScore;
    setIsNewBest(isNew);

    const runBestLevel = Math.max(prevSaved.bestLevel, Math.floor(bestLevelRunRef.current));
    const updatedData = {
      bestScore: Math.max(prevSaved.bestScore, e.score),
      bestCombo: Math.max(prevSaved.bestCombo || 0, e.maxCombo),
      bestLevel: runBestLevel,
      totalSessions: (prevSaved.totalSessions || 0) + 1
    };
    saveData(updatedData);

    setBestScore(updatedData.bestScore);
    setBestCombo(updatedData.bestCombo);
    setBestLevel(updatedData.bestLevel);
    setTotalSessions(updatedData.totalSessions);

    drillAudio.playSessionEnd();
  }, [markIntentionalExit]);

  // Main RAF loop for clock draining
  useEffect(() => {
    if (gameState !== 'playing') return;

    let animId;
    let lastTime = performance.now();

    const loop = (now) => {
      if (isIdleFrameSkippable(gameState === 'playing', now, lastTime)) {
        animId = requestAnimationFrame(loop);
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const e = engine.current;
      if (gameActiveRef.current) {
        if (e.timeLeft > 0) e.timeLeft -= dt;
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setUiTimeLeft(0);
          endGame();
          return;
        }

        const ceilSec = Math.ceil(e.timeLeft);
        if (ceilSec !== lastTimeRef.current) {
          lastTimeRef.current = ceilSec;
          setUiTimeLeft(ceilSec);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, endGame]);

  const deductLife = useCallback(() => {
    const e = engine.current;
    e.lives = Math.max(0, e.lives - 1);
    if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
    e.combo = 0;
    setUiCombo(0);
    setLives(e.lives);
    triggerFlash();
    drillAudio.playPenalty();

    if (e.lives <= 0) {
      endGame();
    }
  }, [endGame, triggerFlash]);

  // Spawning logic
  const spawnBall = useCallback(() => {
    if (ballTimerRef.current) clearTimeout(ballTimerRef.current);
    if (!gameActiveRef.current) return;

    const e = engine.current;
    const config = getLevelConfig(e.level, e.combo);

    const id = Date.now() + Math.random();
    e.currentTargetId = id;
    const targetObj = {
      id,
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 70
    };
    setCurrentTarget(targetObj);
    setBallScale(config.ballScale);

    ballTimerRef.current = setTimeout(function checkBallExpiry() {
      if (!gameActiveRef.current) return;
      if (!drillTimeout.isEnabled()) {
        ballTimerRef.current = setTimeout(checkBallExpiry, config.ballSpeed);
        return;
      }
      // Missed target timeout
      e.visualAttempts += 1;
      e.mistakes += 1;
      deductLife();
      if (e.lives > 0) {
        spawnBall();
      }
    }, config.ballSpeed);
  }, [deductLife]);

  const spawnNumber = useCallback(() => {
    if (numTimerRef.current) clearTimeout(numTimerRef.current);
    if (!gameActiveRef.current) return;

    const e = engine.current;
    const config = getLevelConfig(e.level, e.combo);

    if (e.currentNumber !== null && e.currentNumber % 2 === 0 && !e.wasMatched && drillTimeout.isEnabled()) {
      // Missed an even number
      e.numberAttempts += 1;
      e.mistakes += 1;
      deductLife();
    }

    if (e.lives <= 0) return;

    let newNum;
    do {
      newNum = Math.floor(Math.random() * 10);
    } while (newNum === e.currentNumber);

    e.currentNumber = newNum;
    e.wasMatched = false;
    setCurrentNumber(newNum);
    setWasMatched(false);

    numTimerRef.current = setTimeout(() => {
      spawnNumber();
    }, config.numSpeed);
  }, [deductLife]);

  // Interaction handlers
  const handleVisualClick = useCallback((id, e) => {
    if (e) e.stopPropagation();
    if (!gameActiveRef.current) return;

    const eng = engine.current;
    if (eng.currentTargetId !== id) return;

    if (ballTimerRef.current) clearTimeout(ballTimerRef.current);

    eng.currentTargetId = null;
    setCurrentTarget(null);

    eng.visualHits += 1;
    eng.visualAttempts += 1;
    eng.combo += 1;
    if (eng.combo > eng.maxCombo) eng.maxCombo = eng.combo;

    const levelMult = 1 + getDifficultyProgress(eng.level) * 0.5;
    eng.score += Math.round(POINTS_PER_HIT * getComboMultiplier(eng.combo) * levelMult);

    // Time bonus on clean hit
    eng.timeLeft += TIME_PER_HIT;

    // Continuous level progression
    const rawLevel = (eng.score / POINTS_PER_LEVEL) + 1;
    eng.level = Math.max(eng.level, rawLevel);
    bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eng.level);

    setUiScore(eng.score);
    setUiLevel(Math.floor(eng.level));
    setUiCombo(eng.combo);
    drillAudio.playHit();

    const config = getLevelConfig(eng.level, eng.combo);
    ballTimerRef.current = setTimeout(spawnBall, config.spawnDelayMin + Math.random() * (config.spawnDelayMax - config.spawnDelayMin));
  }, [spawnBall]);

  const handleNumberCheck = useCallback((e) => {
    if (e) e.stopPropagation();
    if (!gameActiveRef.current) return;

    const eng = engine.current;
    const num = eng.currentNumber;
    if (num === null) return;

    if (eng.wasMatched) {
      // Double tap on an already-resolved number
      eng.numberAttempts += 1;
      eng.mistakes += 1;
      deductLife();
      return;
    }

    eng.wasMatched = true;
    setWasMatched(true);

    if (num % 2 === 0) {
      eng.numberHits += 1;
      eng.numberAttempts += 1;
      eng.combo += 1;
      if (eng.combo > eng.maxCombo) eng.maxCombo = eng.combo;

      const levelMult = 1 + getDifficultyProgress(eng.level) * 0.5;
      eng.score += Math.round(POINTS_PER_HIT * getComboMultiplier(eng.combo) * levelMult);

      // Time bonus on clean hit
      eng.timeLeft += TIME_PER_HIT;

      // Continuous level progression
      const rawLevel = (eng.score / POINTS_PER_LEVEL) + 1;
      eng.level = Math.max(eng.level, rawLevel);
      bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eng.level);

      setUiScore(eng.score);
      setUiLevel(Math.floor(eng.level));
      setUiCombo(eng.combo);
      drillAudio.playHit();
    } else {
      // Wrong match on odd number
      eng.numberAttempts += 1;
      eng.mistakes += 1;
      deductLife();
    }
  }, [deductLife]);

  // Enter Drill
  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    setIsFullscreen(true);

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (ballTimerRef.current) clearTimeout(ballTimerRef.current);
    if (numTimerRef.current) clearTimeout(numTimerRef.current);

    drillAudio.init();

    const startLevel = getStartLevel();
    bestLevelRunRef.current = startLevel;

    setIsNewBest(false);
    setUiScore(0);
    setUiLevel(startLevel);
    setUiCombo(0);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    setLives(MAX_LIVES);

    engine.current = {
      score: 0,
      level: startLevel,
      combo: 0,
      maxCombo: 0,
      visualHits: 0,
      numberHits: 0,
      visualAttempts: 0,
      numberAttempts: 0,
      mistakes: 0,
      lives: MAX_LIVES,
      timeLeft: DRILL_DURATION,
      currentTargetId: null,
      currentNumber: null,
      wasMatched: true
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
      gameActiveRef.current = true;
      startingRef.current = false;
      setGameState('playing');
      spawnBall();
      spawnNumber();
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [spawnBall, spawnNumber]);

  const shareResult = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/cognitive/attention/divided-attention';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        accuracy: analytics.accuracy,
        speed: 0,
        drillName: 'Divided Attention',
        rank: analytics.grade?.letter || 'A',
        rankName: analytics.grade?.label || 'DUAL TASK MASTER',
        playerName: getPlayerName(),
        level: analytics.finalLevel,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        url: 'skilldrills.online/drills/cognitive/attention/divided-attention'
      });
      await shareScoreCard(canvas, {
        title: 'Divided Attention — My Score',
        text: `I scored ${uiScore} (Grade: ${analytics.grade?.letter || 'A'}, Lv. ${analytics.finalLevel}) on Divided Attention at SkillDrills!`,
        url
      });
    } catch (e) {
      if (navigator.share) {
        navigator.share({ title: 'Divided Attention Score', text: `I scored ${uiScore} on Divided Attention!`, url }).catch(() => {});
      }
    }
  }, [uiScore, analytics]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              DIVIDED ATTENTION
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
                Divided Attention Test
              </span>
            </h1>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-blue-400 tabular-nums">{uiScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 && gameState === 'playing' ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {uiTimeLeft}s
              </div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Level</div>
              <div className="text-lg sm:text-xl font-black text-blue-400 tabular-nums">L{uiLevel}</div>
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
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Screen Flashes */}
          <DrillFlashOverlay flashes={flashes} />

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              {/* Score & Lives - Top Left */}
              <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col items-start gap-0.5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                  <p className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-tight">{uiScore}</p>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {Array.from({ length: MAX_LIVES }).map((_, i) => (
                    <Heart
                      key={i}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-200 ${
                        i < lives
                          ? 'text-red-500 fill-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]'
                          : 'text-slate-800 fill-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Time Left - Top Right */}
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time Left</p>
                <p className={`text-2xl sm:text-3xl font-black tabular-nums leading-tight ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</p>
              </div>
            </>
          )}

          {/* IN-GAME HUD SOUND + FLASH TOGGLES */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <div className="absolute bottom-4 max-sm:bottom-32 right-4 z-40 flex items-center gap-2">
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* DUAL-TASK GAMEPLAY PLAYING AREA */}
          {gameState === 'playing' && (
            <div className="relative w-full h-full flex flex-col sm:flex-row">
              {/* Target Canvas Area */}
              <div className="relative flex-1 bg-transparent overflow-hidden">
                {currentTarget && (
                  <button
                    type="button"
                    onPointerDown={(e) => handleVisualClick(currentTarget.id, e)}
                    className="absolute z-20 focus:outline-none touch-none bg-transparent border-none cursor-pointer"
                    style={{
                      left: `${currentTarget.x}%`,
                      top: `${currentTarget.y}%`,
                      transform: `translate(-50%, -50%) scale(${ballScale})`
                    }}
                  >
                    <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 hover:scale-110 active:scale-90 transition-transform duration-100">
                      {/* Outer pulse ring */}
                      <div className="absolute -inset-2 rounded-full border border-[#3b82f6]/50 animate-ping opacity-60 pointer-events-none" />

                      {/* Tactical Target SVG matching 180-degree-awareness */}
                      <svg className="w-full h-full drop-shadow-[0_0_12px_rgba(59,130,246,0.6)] pointer-events-none" viewBox="0 0 100 100">
                        {/* Ghost outer ring */}
                        <circle cx="50" cy="50" r="46" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.25" />
                        {/* Tactical outer ring */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="2.5" opacity="0.6" />
                        {/* Outer crosshair ticks */}
                        <line x1="50" y1="4" x2="50" y2="10" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
                        <line x1="50" y1="90" x2="50" y2="96" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
                        <line x1="4" y1="50" x2="10" y2="50" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
                        <line x1="90" y1="50" x2="96" y2="50" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
                        {/* Filled body */}
                        <circle cx="50" cy="50" r="32" fill="#3b82f6" opacity="0.85" />
                        {/* Inner highlight sheen */}
                        <circle cx="50" cy="50" r="22" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.4" />
                        {/* Bright white core dot */}
                        <circle cx="50" cy="50" r="7" fill="#ffffff" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>

              {/* Number Stream Panel */}
              <div className="w-full sm:w-64 h-[120px] sm:h-full flex-shrink-0 bg-gray-950/95 backdrop-blur-md border-t sm:border-t-0 sm:border-l border-gray-800 z-30 flex flex-row sm:flex-col items-center justify-between sm:justify-center p-3 sm:p-6 sm:space-y-6">
                <div className="hidden sm:block text-center pointer-events-none">
                  <h3 className="text-lg font-black text-white uppercase">Match</h3>
                  <h3 className="text-sm font-bold text-blue-400 tracking-widest animate-pulse">EVEN NUMBERS</h3>
                </div>

                <div className="relative flex items-center justify-center w-20 h-20 sm:w-32 sm:h-32 text-4xl sm:text-6xl font-black rounded-2xl bg-black border border-blue-500/30 text-white pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                  {currentNumber !== null ? (
                    <span key={currentNumber} className="animate-in slide-in-from-bottom-2 fade-in duration-150 block">
                      {currentNumber}
                    </span>
                  ) : '?'}

                  {wasMatched && currentNumber !== null && currentNumber % 2 === 0 && (
                    <div className="absolute inset-0 rounded-2xl bg-green-500/20 border-2 border-green-500" />
                  )}
                </div>

                <div className="flex flex-col items-center w-28 sm:w-full">
                  <button
                    type="button"
                    onPointerDown={handleNumberCheck}
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-black text-lg sm:text-xl active:scale-95 transition-all hover:from-blue-500 hover:to-indigo-500 border border-blue-400/30 cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  >
                    MATCH
                  </button>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Tap when EVEN</p>
                </div>
              </div>
            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Layers}
              accent="blue"
              title="Divided Attention"
              subtitle="Dual-Task Stream • Split Focus"
              rules={[
                { icon: Target, accent: 'blue', title: 'Tap Moving Targets (+100 PTS)', text: '+100 PTS × Combo × Level multiplier (+0.6s per hit)' },
                {
                  icon: Zap,
                  accent: 'blue',
                  title: penaltyEnabled ? '5 Lives & Time Penalty' : 'Match Even Numbers • 5 Lives',
                  text: penaltyEnabled
                    ? 'Tap MATCH on EVEN numbers. Misses cost 1 life and deduct 0.8s'
                    : 'Tap MATCH on EVEN numbers. 5 lives total; misses or wrong matches cost 1 life'
                },
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
            <DrillCountdown value={countdownValue} subtitle="GET READY" />
          )}

          {/* UNIVERSAL RESULT CARD */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="blue"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { label: 'Dual Accuracy', value: analytics.accuracy, suffix: '%' },
                { label: 'Hits', value: analytics.visualHits + analytics.numberHits },
                { label: 'Lives Left', value: `${analytics.livesRemaining}/${MAX_LIVES}` },
                { label: 'Peak Level', value: `Lv. ${analytics.finalLevel}` },
              ]}
              onPlayAgain={enterDrill}
              onShare={shareResult}
              onExit={handleExitDrill}
            />
          )}

        </div>

        {/* ── ACCORDIONS ── */}
        {!isFullscreen && (
        <div className="[&>div]:!mt-0">
        <DrillAccordion
          id="rules"
          title="Drill Instructions & Scoring System"
          isOpen={openAccordion === 'rules'}
          onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {RULES_ITEMS.map((item, i) => (
              <div key={i} className="bg-black p-4 rounded-xl border border-white/10">
                <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                <p className="text-xs text-gray-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </DrillAccordion>

        <DrillAccordion
          id="about"
          title="About Divided Attention"
          isOpen={openAccordion === 'about'}
          onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
        >
          <div className="space-y-8">
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
                <p className="text-xs text-gray-300 leading-relaxed">Air traffic controllers, ER nurses, esports players tracking minimap and targets at once, and drivers who need to safely process multiple input streams.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                  <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">Dual-task capacity, multi-channel visual tracking, numerical cognition, and prefrontal executive resource allocation.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Layers className="w-3.5 h-3.5 text-white" /></div>
                  <h5 className="text-xs font-bold text-white">Parallel Processing</h5>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">Track the spatial target stream and the numerical stream at once — reacting to one without letting accuracy on the other channel collapse.</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="group bg-[#0c0c16] border border-white/5 hover:border-blue-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-blue-400 mt-3 flex items-center gap-1 transition-colors">
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