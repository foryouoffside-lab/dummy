'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Target, Volume2, VolumeX, Play, RefreshCw, Share2, LogOut, ArrowLeft, Users, TrendingUp, Zap, ZapOff, Trophy } from 'lucide-react';

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
const POINTS_PER_HIT = 100;
const POINTS_PER_LEVEL = 1750; // 250 -> 1750 (7x)
const ELITE_SCORE = 24000; // 7500 -> 24000 (~3.2x)
const TIME_PER_HIT = 0.6; // +0.6s on clean hit
const TIME_PENALTY = 0.8; // -0.8s on wrong tap or missed target (opt-in gated)
const STORAGE_KEY = 'skilldrills_multi_tasking_v8';

const SHAPES = ['▲', '●', '■', '★', '◆', '⬣', '❖', '⏣'];

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
    speed: ramp(3.2, 9.5, p) * (1 + heat * 0.25),
    spawnRate: Math.max(160, ramp(950, 220, p) * (1 - heat * 0.25))
  };
};

const RULES_ITEMS = [
  { title: "Dual Target Streams", text: "Two independent shape streams flow simultaneously across the screen (top/bottom in portrait mode, left/right in landscape)." },
  { title: "Target Matching", text: "Check your active TOP and BOTTOM target shapes. Tap only matching shapes (+100 PTS × Combo, +0.6s)." },
  { title: "Opposite Flow Directions", text: "Streams travel in opposing directions to challenge bilateral hemispheric visual tracking." },
  { title: "Progressive Challenge", text: "Stream speed accelerates and target shapes diverge as your streak climbs. Misses reset combo (and deduct 0.8s if enabled)." }
];

const ABOUT_TEXT = `Multi-Tasking (Dual-Target Flow) is an advanced cognitive drill designed to assess and train multi-stream visual tracking and divided attention under severe time constraints. Derived from cognitive workload research in aviation and high-speed motor sports, this drill challenges the brain's executive control system to monitor two independent perceptual channels concurrently.

By streaming distinct geometric shapes across left and right visual fields, the drill exercises bilateral hemispheric processing. Players must maintain a wide peripheral gaze while executing discrete, rapid taps on valid targets matching active target templates.

As your score increases, stream velocity accelerates and target templates diverge, pushing your visual processing throughput to elite levels.`;

const FAQ_ITEMS = [
  { q: "Can humans actually multitask?", a: "True simultaneous multitasking is largely a myth for cognitive tasks. What humans call multitasking is actually rapid task switching — alternating between tasks very quickly. The brain serializes most cognitive work, but the speed and efficiency of this switching can be significantly improved with targeted training." },
  { q: "What is the difference between multitasking and task switching?", a: "Multitasking implies parallel processing two cognitive tasks simultaneously. Task switching (set-shifting) is the rapid alternation between tasks. Research shows that most human multitasking is high-speed task switching. Each switch carries a 'switch cost' — a brief latency and accuracy penalty while the brain reloads the new task's rules." },
  { q: "How can I improve my multitasking skills?", a: "Effective multitasking improvement comes from: (1) practicing tasks that use different sensory channels simultaneously, (2) training rapid rule-switching with minimal errors, and (3) building automaticity in component tasks so they demand less conscious oversight. This drill exercises all three through its dual-target flow mechanics." },
  { q: "Why does multitasking drain mental energy?", a: "Each task-set reconfiguration requires the prefrontal cortex to disengage old task rules, flush working memory, and load new task parameters. This cognitive overhead consumes glucose and neurotransmitters rapidly. The cumulative energy cost of many switches explains the brain drain of multitasking-heavy workdays." },
  { q: "What are the negative effects of multitasking on performance?", a: "Studies show unregulated multitasking can reduce task performance quality by up to 40%, increase error rates, fragment attention, and elevate cortisol. However, trained and structured multitasking with clear task boundaries and practiced switching can dramatically reduce these penalties." },
  { q: "What does this multitasking test measure?", a: "This dual-target flow test measures your ability to track and respond to multiple concurrent tasks with overlapping deadlines. It evaluates your accuracy across parallel streams, your switching speed when task demands converge, and how well you maintain performance across both channels under increasing cognitive load." },
  { q: "How does executive function control multitasking?", a: "The dorsolateral prefrontal cortex acts as the central executive, maintaining multiple task representations in working memory, deciding which task gets priority at any moment, and managing the motor output queue. Multitasking training directly strengthens this executive control network." },
  { q: "Can multitasking games improve work productivity?", a: "Yes. By training your brain's task-switching latency and executive control, multitasking games help you manage real work streams more efficiently. You will find it easier to maintain quality across multiple projects, handle interruptions, and return to primary tasks with less context reload time." },
  { q: "Who benefits most from multitasking training?", a: "Air traffic controllers, emergency dispatchers, surgeons, esports players, teachers, project managers, stock traders, and emergency first responders are among the professions where high-quality multitasking or rapid task-switching is a critical performance variable. This drill targets all these audiences." },
  { q: "Is this multitasking test free to play?", a: "Yes. The Dual Target Flow multitasking drill on SkillDrills is completely free with no registration, downloads, or subscriptions required. It runs directly in your web browser." }
];

const RELATED_DRILLS = [
  { id: "divided-attention", name: "Divided Attention", cat: "Attention", desc: "Track and react to multiple independent target streams simultaneously.", href: "/drills/cognitive/attention/divided-attention" },
  { id: "rsvp-reader", name: "RSVP Speed Reader", cat: "Processing Speed", desc: "Process rapid serial visual presentation text streams.", href: "/drills/cognitive/processing-speed/rsvp-reader" },
  { id: "concentration-stamina", name: "Concentration Stamina", cat: "Attention", desc: "Sustain continuous visual focus through prolonged high-density sequences.", href: "/drills/cognitive/attention/concentration-stamina" },
  { id: "distraction-fighter", name: "Distraction Fighter", cat: "Focus", desc: "Filter out high-interference Stroop visual distractors.", href: "/drills/cognitive/focus/distraction-fighter" },
  { id: "reaction-time", name: "Reaction Time", cat: "Processing Speed", desc: "Train choice reaction speed and visual reflex latency.", href: "/drills/cognitive/processing-speed/reaction-time" },
  { id: "concentration-grid", name: "Concentration Grid", cat: "Focus", desc: "Scan and tap sequential numbers on expanding grid matrices.", href: "/drills/cognitive/focus/concentration-grid" }
];

export default function DualTargetFlowClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);

  // Live HUD State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [uiLevel, setUiLevel] = useState(1);
  const [uiCombo, setUiCombo] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  // Active Target Indicators
  const [leftTarget, setLeftTarget] = useState('▲');
  const [rightTarget, setRightTarget] = useState('▲');

  // Analytics
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    successfulHits: 0,
    misses: 0,
    maxCombo: 0,
    finalLevel: 1,
    grade: null
  });

  // DOM & Engine Refs
  const containerRef = useRef(null);
  const leftContainerRef = useRef(null);
  const rightContainerRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  const leftSpawnTimerRef = useRef(null);
  const rightSpawnTimerRef = useRef(null);
  const targetChangeIntervalRef = useRef(null);
  const animationFramesRef = useRef(new Set());
  const startingRef = useRef(false);
  const gameActiveRef = useRef(false);
  const bestLevelRunRef = useRef(1);
  const lastTimeRef = useRef(DRILL_DURATION);

  const engine = useRef({
    score: 0,
    level: 1,
    combo: 0,
    maxCombo: 0,
    successfulHits: 0,
    misses: 0,
    timeLeft: DRILL_DURATION,
    leftTarget: '▲',
    rightTarget: '▲',
    isDiverged: false
  });

  const { flashes, triggerFlash } = useDrillFlash();

  // Responsive device check & storage load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      setPenaltyEnabled(drillPenalty.isEnabled());
      const checkDevice = () => {
        setIsMobile(window.innerWidth < 768);
        setIsPortrait(window.innerHeight > window.innerWidth);
      };
      checkDevice();
      window.addEventListener('resize', checkDevice);
      window.addEventListener('orientationchange', checkDevice);

      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestCombo(saved.bestCombo || 0);
      setBestLevel(saved.bestLevel || 1);
      setTotalSessions(saved.totalSessions || 0);

      return () => {
        window.removeEventListener('resize', checkDevice);
        window.removeEventListener('orientationchange', checkDevice);
      };
    }
  }, []);

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
      if (leftSpawnTimerRef.current) clearTimeout(leftSpawnTimerRef.current);
      if (rightSpawnTimerRef.current) clearTimeout(rightSpawnTimerRef.current);
      if (targetChangeIntervalRef.current) clearInterval(targetChangeIntervalRef.current);
      animationFramesRef.current.forEach(id => cancelAnimationFrame(id));
      animationFramesRef.current.clear();
    };
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (leftSpawnTimerRef.current) clearTimeout(leftSpawnTimerRef.current);
    if (rightSpawnTimerRef.current) clearTimeout(rightSpawnTimerRef.current);
    if (targetChangeIntervalRef.current) clearInterval(targetChangeIntervalRef.current);
    animationFramesRef.current.forEach(id => cancelAnimationFrame(id));
    animationFramesRef.current.clear();
    startingRef.current = false;
    gameActiveRef.current = false;

    if (leftContainerRef.current) leftContainerRef.current.innerHTML = '';
    if (rightContainerRef.current) rightContainerRef.current.innerHTML = '';

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
    if (leftSpawnTimerRef.current) clearTimeout(leftSpawnTimerRef.current);
    if (rightSpawnTimerRef.current) clearTimeout(rightSpawnTimerRef.current);
    if (targetChangeIntervalRef.current) clearInterval(targetChangeIntervalRef.current);
    animationFramesRef.current.forEach(id => cancelAnimationFrame(id));
    animationFramesRef.current.clear();

    if (leftContainerRef.current) leftContainerRef.current.innerHTML = '';
    if (rightContainerRef.current) rightContainerRef.current.innerHTML = '';

    setGameState('gameOver');

    const e = engine.current;
    const totalActs = e.successfulHits + e.misses;
    const acc = totalActs > 0 ? Math.round((e.successfulHits / totalActs) * 100) : 100;

    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const gradeObj = {
      letter: rating.grade || rating.letter || 'C',
      label: rating.label || 'Keep Going',
      color: rating.color || 'text-blue-400',
    };

    setAnalytics({
      accuracy: acc,
      successfulHits: e.successfulHits,
      misses: e.misses,
      maxCombo: e.maxCombo,
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

  const setRandomTargets = useCallback(() => {
    const e = engine.current;
    const shuffled = [...SHAPES].sort(() => 0.5 - Math.random());
    const newLeft = shuffled[0];
    const newRight = e.isDiverged ? shuffled[1] : newLeft;

    e.leftTarget = newLeft;
    e.rightTarget = newRight;
    setLeftTarget(newLeft);
    setRightTarget(newRight);
  }, []);

  const applyHit = useCallback(() => {
    const e = engine.current;
    e.successfulHits += 1;
    e.combo += 1;
    if (e.combo > e.maxCombo) e.maxCombo = e.combo;

    const levelMult = 1 + getDifficultyProgress(e.level) * 0.5;
    e.score += Math.round(POINTS_PER_HIT * getComboMultiplier(e.combo) * levelMult);

    // Time bonus on clean hit
    e.timeLeft += TIME_PER_HIT;

    // Continuous level progression
    const rawLevel = (e.score / POINTS_PER_LEVEL) + 1;
    e.level = Math.max(e.level, rawLevel);
    bestLevelRunRef.current = Math.max(bestLevelRunRef.current, e.level);
    if (e.level >= 3) e.isDiverged = true;

    setUiScore(e.score);
    setUiLevel(Math.floor(e.level));
    setUiCombo(e.combo);
    drillAudio.playHit();
  }, []);

  const applyPenalty = useCallback(() => {
    const e = engine.current;
    e.misses += 1;
    if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
    e.combo = 0;
    setUiCombo(0);
    triggerFlash();
    drillAudio.playPenalty();
  }, [triggerFlash]);

  // DOM Shape Spawner
  const createShape = useCallback((side) => {
    const container = side === 'left' ? leftContainerRef.current : rightContainerRef.current;
    if (!container || !gameActiveRef.current) return;

    const e = engine.current;
    const targetGlyph = side === 'left' ? e.leftTarget : e.rightTarget;
    const config = getLevelConfig(e.level, e.combo);

    const el = document.createElement('div');
    el.style.position = 'absolute';
    const isSmall = window.innerWidth < 768;
    el.style.fontSize = isSmall ? '2.8rem' : '4.5rem';
    el.style.color = '#d1d5db';
    el.style.cursor = 'pointer';
    el.style.lineHeight = '1';
    el.style.willChange = 'transform, left';
    el.style.textShadow = '0 0 10px rgba(209, 213, 219, 0.3)';
    el.style.touchAction = 'none';
    el.style.zIndex = '10';
    el.style.userSelect = 'none';

    const isTarget = Math.random() < 0.35;
    let glyph = isTarget ? targetGlyph : SHAPES[Math.floor(Math.random() * SHAPES.length)];
    if (!isTarget && glyph === targetGlyph) glyph = SHAPES.find(s => s !== targetGlyph) || '■';
    el.textContent = glyph;

    const containerRect = container.getBoundingClientRect();
    const startX = side === 'left' ? containerRect.width : -80;
    const endX = side === 'left' ? -80 : containerRect.width;

    const topOffset = isSmall ? 50 : 80;
    const top = Math.random() * Math.max(50, containerRect.height - topOffset);

    el.style.top = `${top}px`;
    el.style.left = `${startX}px`;
    container.appendChild(el);

    const duration = 4000 / config.speed;
    const startTime = performance.now();
    let isHandled = false;

    const handleInteraction = (evt) => {
      if (evt) {
        evt.stopPropagation();
        evt.preventDefault();
      }
      if (isHandled || !gameActiveRef.current) return;
      isHandled = true;

      const currentTarget = side === 'left' ? engine.current.leftTarget : engine.current.rightTarget;

      if (glyph === currentTarget) {
        el.style.color = '#60a5fa';
        el.style.textShadow = '0 0 20px #60a5fa';
        applyHit();
        setTimeout(() => { if (el.isConnected) el.remove(); }, 120);
      } else {
        applyPenalty();
        el.style.color = '#ef4444';
        setTimeout(() => { if (el.isConnected) el.remove(); }, 120);
      }
    };

    el.onpointerdown = handleInteraction;

    let animId;
    function animate(currentTime) {
      if (!el.isConnected || !gameActiveRef.current) return;
      const elapsed = currentTime - startTime;
      const progress = drillTimeout.isEnabled() ? elapsed / duration : Math.min(elapsed / duration, 0.999);

      if (progress < 1) {
        const currentX = startX + (endX - startX) * progress;
        el.style.left = `${currentX}px`;
        animId = requestAnimationFrame(animate);
        animationFramesRef.current.add(animId);
      } else {
        el.remove();
        const currentTarget = side === 'left' ? engine.current.leftTarget : engine.current.rightTarget;
        if (glyph === currentTarget && !isHandled && gameActiveRef.current) {
          applyPenalty();
        }
      }
    }
    animId = requestAnimationFrame(animate);
    animationFramesRef.current.add(animId);
  }, [applyHit, applyPenalty]);

  const scheduleLeftSpawn = useCallback(() => {
    if (!gameActiveRef.current) return;
    createShape('left');
    const config = getLevelConfig(engine.current.level, engine.current.combo);
    leftSpawnTimerRef.current = setTimeout(scheduleLeftSpawn, config.spawnRate);
  }, [createShape]);

  const scheduleRightSpawn = useCallback(() => {
    if (!gameActiveRef.current) return;
    createShape('right');
    const config = getLevelConfig(engine.current.level, engine.current.combo);
    rightSpawnTimerRef.current = setTimeout(scheduleRightSpawn, config.spawnRate);
  }, [createShape]);

  // Enter Drill
  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    setIsFullscreen(true);

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (leftSpawnTimerRef.current) clearTimeout(leftSpawnTimerRef.current);
    if (rightSpawnTimerRef.current) clearTimeout(rightSpawnTimerRef.current);
    if (targetChangeIntervalRef.current) clearInterval(targetChangeIntervalRef.current);
    animationFramesRef.current.forEach(id => cancelAnimationFrame(id));
    animationFramesRef.current.clear();

    if (leftContainerRef.current) leftContainerRef.current.innerHTML = '';
    if (rightContainerRef.current) rightContainerRef.current.innerHTML = '';

    drillAudio.init();

    const startLevel = getStartLevel();
    bestLevelRunRef.current = startLevel;

    setIsNewBest(false);
    setUiScore(0);
    setUiLevel(startLevel);
    setUiCombo(0);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;

    engine.current = {
      score: 0,
      level: startLevel,
      combo: 0,
      maxCombo: 0,
      successfulHits: 0,
      misses: 0,
      timeLeft: DRILL_DURATION,
      leftTarget: '▲',
      rightTarget: '▲',
      isDiverged: startLevel >= 3
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
      setRandomTargets();

      scheduleLeftSpawn();
      setTimeout(scheduleRightSpawn, 300);

      targetChangeIntervalRef.current = setInterval(() => {
        setRandomTargets();
      }, 20000);
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [setRandomTargets, scheduleLeftSpawn, scheduleRightSpawn]);

  const shareResult = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/cognitive/attention/multi-tasking';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        accuracy: analytics.accuracy,
        speed: 0,
        drillName: 'Multi-Tasking',
        rank: analytics.grade?.letter || 'A',
        rankName: analytics.grade?.label || 'DUAL FLOW MASTER',
        playerName: getPlayerName(),
        level: analytics.finalLevel,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        url: 'skilldrills.online/drills/cognitive/attention/multi-tasking'
      });
      await shareScoreCard(canvas, {
        title: 'Multi-Tasking — My Score',
        text: `I scored ${uiScore} (Grade: ${analytics.grade?.letter || 'A'}, Lv. ${analytics.finalLevel}) on Multi-Tasking at SkillDrills!`,
        url
      });
    } catch (e) {
      if (navigator.share) {
        navigator.share({ title: 'Multi-Tasking Score', text: `I scored ${uiScore} on Multi-Tasking!`, url }).catch(() => {});
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
            MULTI-TASKING
            <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
              Multitasking Test
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
            <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {uiTimeLeft}s
            </div>
          </div>
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Level</div>
            <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">L{uiLevel}</div>
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
          {/* Red Flash Overlay */}
          <DrillFlashOverlay flashes={flashes} />

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col gap-1">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                  <p className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-tight">{uiScore}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time Left</p>
                <p className={`text-2xl sm:text-3xl font-black tabular-nums leading-tight ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</p>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* DUAL STREAM PLAYING AREA */}
          {gameState === 'playing' && (
            <div className={`relative w-full h-full flex ${isPortrait ? 'flex-col' : 'flex-row'}`}>
              {/* Subtle background grid */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              {/* Stream 1 Container (Left in landscape, Top in portrait - Right to Left flow) */}
              <div className={`relative flex-1 ${isPortrait ? 'w-full h-1/2 border-b border-white/10' : 'h-full w-1/2 border-r border-white/10'} overflow-hidden`}>
                {/* Top / Left Target Badge */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                  <div className="bg-black/75 backdrop-blur-md px-3.5 py-1 rounded-xl border border-white/10 flex items-center gap-2 shadow-lg">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">TARGET:</span>
                    <span className="text-xl sm:text-2xl font-black text-blue-400">{leftTarget}</span>
                  </div>
                </div>
                <div ref={leftContainerRef} className="absolute inset-0 overflow-hidden" />
              </div>

              {/* Stream 2 Container (Right in landscape, Bottom in portrait - Left to Right flow) */}
              <div className={`relative flex-1 ${isPortrait ? 'w-full h-1/2' : 'h-full w-1/2'} overflow-hidden`}>
                {/* Bottom / Right Target Badge */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                  <div className="bg-black/75 backdrop-blur-md px-3.5 py-1 rounded-xl border border-white/10 flex items-center gap-2 shadow-lg">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">TARGET:</span>
                    <span className="text-xl sm:text-2xl font-black text-cyan-400">{rightTarget}</span>
                  </div>
                </div>
                <div ref={rightContainerRef} className="absolute inset-0 overflow-hidden" />
              </div>
            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Target}
              accent="blue"
              title="Multi-Tasking"
              subtitle="Dual-Stream Tracking • Peripheral Focus"
              rules={[
                { icon: Target, accent: 'emerald', title: 'Tap Shapes Matching Active Targets', text: '+100 PTS × Combo × Level multiplier (+0.6s per hit)' },
                {
                  icon: Zap,
                  accent: 'blue',
                  title: penaltyEnabled ? 'Time Penalty (-0.8s)' : 'Dual Stream Focus',
                  text: penaltyEnabled
                    ? 'Misclicks or missed targets subtract 0.8s and reset combo'
                    : 'Track parallel streams under accelerating flow speed. Misses reset combo'
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
              accent="cyan"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { label: 'Accuracy', value: analytics.accuracy, suffix: '%' },
                { label: 'Hits', value: analytics.successfulHits },
                { label: 'Peak Level', value: `Lv. ${analytics.finalLevel}` },
                { label: 'Max Combo', value: analytics.maxCombo, suffix: 'x' },
              ]}
              onPlayAgain={enterDrill}
              onShare={shareResult}
              onExit={handleExitDrill}
            />
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
                  <div key={i} className="bg-black p-4 rounded-xl border border-white/10">
                    <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                    <p className="text-xs text-gray-300 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Multi-Tasking"
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
                    <p className="text-xs text-gray-300 leading-relaxed">Air traffic controllers, emergency dispatchers, esports players, project managers, and anyone who juggles multiple live task streams under time pressure.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Dual-stream visual tracking, peripheral target acquisition, bilateral hemispheric processing, and prefrontal executive control.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Task-Switching Speed</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Left and right target templates rotate and diverge as you level up, forcing you to reload task rules fast and minimize switch-cost errors.</p>
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