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
const ELITE_SCORE = 22000; // 7500 -> 22000 (3x)
const TIME_PER_HIT = 0.6; // +0.6s on clean hit
const TIME_PENALTY = 0.8; // -0.8s on wrong target or trial timeout (opt-in gated)
const STORAGE_KEY = 'skilldrills_reaction_time_v8';

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
    ttl: Math.max(100, ramp(1350, 140, p) * (1 - heat * 0.30)), // Target flash duration
  };
};

const RULES_ITEMS = [
  { title: "Dynamic Target Rule", text: "Pay close attention to the active top rule banner (e.g. 'TAP RED' or 'TAP BLUE'). Tap ONLY the target matching the active rule (+100 PTS × Combo, +0.6s)." },
  { title: "Performance Rule Switching", text: "As your performance improves and level increases, the rule dynamically switches between RED and BLUE targets." },
  { title: "Rapid Target Shift", text: "Target nodes shift positions continuously to train visual discrimination and choice reaction speed." },
  { title: "Streak & Penalty Rules", text: "Tapping the wrong target node or letting the active target time out resets your combo streak. A 0.8s time deduction applies when enabled in settings." }
];

const ABOUT_TEXT = `Reaction Time (Dynamic Choice Discrimination) evaluates rapid visual reflex latencies and cognitive flexibility under high-speed execution pressure. Grounded in choice reaction time paradigms, this drill measures motor response speed while training the prefrontal cortex to adapt when rules switch dynamically.

Unlike simple reaction tests with static targets, dynamic choice reaction tasks force the central nervous system to perform visual discrimination before issuing motor commands.

Practicing Choice Reaction Speed sharpens visual reflex latency, motor execution speed, and decision-making efficiency for high-speed sports, gaming, and rapid tactical decision scenarios.`;

const FAQ_ITEMS = [
  { q: "What is a good reaction time in milliseconds?", a: "The average human visual reaction time is 200-250 milliseconds. Below 200ms is considered fast. Below 150ms is in the elite range typical of competitive esports players and trained athletes." },
  { q: "How does rule switching work in this drill?", a: "The active rule banner at the top shows which color target to tap ('TAP RED' or 'TAP BLUE'). As you perform well and level up, the rule switches between RED and BLUE targets to test your cognitive switching speed." },
  { q: "What does this reaction time test measure?", a: "This test measures choice visual reaction time (CRT) — the elapsed time from stimulus onset to motor response execution while discriminating between target rules." },
  { q: "What is the difference between simple and choice reaction time?", a: "Simple reaction time (SRT) requires responding to a single expected stimulus and typically averages 200-250ms. Choice reaction time (CRT), like this drill, requires discriminating between multiple stimuli before responding, adding a decision-making stage that runs 50-100ms slower than SRT. This drill goes further by flipping which color is correct mid-session, layering cognitive flexibility on top of standard CRT." },
  { q: "What is Hick's Law and how does it apply here?", a: "Hick's Law states that reaction time increases logarithmically with the number of choices you must discriminate between before responding. Because this drill forces you to actively verify the current rule before reacting, it directly exercises the decision-time component Hick's Law describes, rather than pure reflex speed alone." },
  { q: "How can I improve my choice reaction time?", a: "Evidence-based approaches include: (1) deliberate practice on choice-based (not just simple) reaction drills, since the two skills don't fully transfer, (2) consistent sleep, since fatigue disproportionately slows the decision stage, (3) regular aerobic exercise, which improves neural conduction velocity, and (4) fast-paced action gaming, shown in research to sharpen visual-motor choice reaction speed." },
  { q: "Why does reaction time matter for gaming and esports?", a: "In competitive gaming, choice reaction time determines how quickly you can distinguish a real threat from a decoy and execute the correct response — exactly the skill this drill isolates. Elite esports athletes consistently test in the 150-180ms range for choice reaction tasks, well below the general population average." },
  { q: "How does scoring and grading work in this drill?", a: "Each correct tap on the active rule's target earns points. Tapping the wrong-colored target resets your combo multiplier. When enabled, an opt-in time penalty of 0.8s is deducted. Your final score is graded against an elite benchmark, awarding letter grades from D up to S+." },
  { q: "Does reaction time change with age?", a: "Yes. Choice reaction time is fastest in the late teens to mid-20s, then slows gradually — roughly 1-2ms per year after age 25, accelerating past 60. Regular training can partially offset this decline by keeping the decision-making pathway well-practiced." },
  { q: "Is this reaction time test free?", a: "Yes. This reaction time test on SkillDrills is completely free. No registration, downloads, or subscriptions required. It runs entirely in your browser on both desktop and mobile devices." }
];

const RELATED_DRILLS = [
  { id: "symbol-matching", name: "Symbol Matching", cat: "Processing Speed", desc: "Match rapid symbol pairs under strict time pressure.", href: "/drills/cognitive/processing-speed/symbol-matching" },
  { id: "rsvp-reader", name: "RSVP Speed Reader", cat: "Processing Speed", desc: "Process rapid serial visual presentation text streams.", href: "/drills/cognitive/processing-speed/rsvp-reader" },
  { id: "concentration-grid", name: "Concentration Grid", cat: "Focus", desc: "Scan and tap sequential numbers on expanding grid matrices.", href: "/drills/cognitive/focus/concentration-grid" },
  { id: "distraction-fighter", name: "Distraction Fighter", cat: "Focus", desc: "Filter out high-interference Stroop visual distractors.", href: "/drills/cognitive/focus/distraction-fighter" },
  { id: "multi-tasking", name: "Multi-Tasking", cat: "Attention", desc: "Track dual independent target streams under speed pressure.", href: "/drills/cognitive/attention/multi-tasking" },
  { id: "concentration-stamina", name: "Concentration Stamina", cat: "Attention", desc: "Sustain continuous visual focus through prolonged high-density sequences.", href: "/drills/cognitive/attention/concentration-stamina" }
];

export default function EliteNeuroSwitchClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);

  // Active Target Rule State ('RED' | 'BLUE')
  const [activeRule, setActiveRule] = useState('RED');

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

  // Target Node Positions (%)
  const [redTarget, setRedTarget] = useState({ x: 50, y: 50 });
  const [blueTarget, setBlueTarget] = useState({ x: 20, y: 20 });

  // Analytics
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    successfulHits: 0,
    misses: 0,
    falseAlarms: 0,
    maxCombo: 0,
    finalLevel: 1,
    grade: null
  });

  // DOM & Engine Refs
  const containerRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  const trialTimerRef = useRef(null);
  const startingRef = useRef(false);
  const gameActiveRef = useRef(false);
  const bestLevelRunRef = useRef(1);
  const lastTimeRef = useRef(DRILL_DURATION);

  const engine = useRef({
    score: 0,
    level: 1,
    combo: 0,
    maxCombo: 0,
    activeRule: 'RED',
    hitsOnCurrentRule: 0,
    successfulHits: 0,
    misses: 0,
    falseAlarms: 0,
    timeLeft: DRILL_DURATION,
    redTarget: { x: 50, y: 50 },
    blueTarget: { x: 20, y: 20 }
  });

  const { flashes, triggerFlash } = useDrillFlash();

  // Storage loading & sound init
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
      if (trialTimerRef.current) clearTimeout(trialTimerRef.current);
    };
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (trialTimerRef.current) clearTimeout(trialTimerRef.current);
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
    if (trialTimerRef.current) clearTimeout(trialTimerRef.current);

    setGameState('gameOver');

    const e = engine.current;
    const totalActs = e.successfulHits + e.misses + e.falseAlarms;
    const acc = totalActs > 0 ? Math.round((e.successfulHits / totalActs) * 100) : 100;

    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const gradeObj = {
      letter: rating.grade || rating.letter || 'C',
      label: rating.label || 'Keep Going',
      color: rating.color || 'text-red-400',
    };

    setAnalytics({
      accuracy: acc,
      successfulHits: e.successfulHits,
      misses: e.misses,
      falseAlarms: e.falseAlarms,
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

  // Target Spawner
  const spawnTargets = useCallback(() => {
    if (trialTimerRef.current) clearTimeout(trialTimerRef.current);
    const e = engine.current;
    const config = getLevelConfig(e.level, e.combo);

    let rx, ry, bx, by, distBlueToRed, distToPrev;
    const prevRed = e.redTarget;

    // Pick RED position distant from previous RED
    do {
      rx = 18 + Math.random() * 64;
      ry = 22 + Math.random() * 56;
      distToPrev = Math.hypot(rx - prevRed.x, ry - prevRed.y);
    } while (distToPrev < 30);

    // Pick BLUE position distant from RED
    do {
      bx = 18 + Math.random() * 64;
      by = 22 + Math.random() * 56;
      distBlueToRed = Math.hypot(rx - bx, ry - by);
    } while (distBlueToRed < 25);

    e.redTarget = { x: rx, y: ry };
    e.blueTarget = { x: bx, y: by };
    setRedTarget({ x: rx, y: ry });
    setBlueTarget({ x: bx, y: by });

    trialTimerRef.current = setTimeout(function checkTrialExpiry() {
      if (!drillTimeout.isEnabled()) {
        trialTimerRef.current = setTimeout(checkTrialExpiry, config.ttl);
        return;
      }
      // Timeout miss
      e.misses += 1;
      if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
      e.combo = 0;
      setUiCombo(0);
      triggerFlash();
      drillAudio.playPenalty();
      spawnTargets();
    }, config.ttl);
  }, [triggerFlash]);

  const handleTargetClick = useCallback((clickedColor, ev) => {
    if (ev) ev.stopPropagation();
    if (!gameActiveRef.current) return;
    if (trialTimerRef.current) clearTimeout(trialTimerRef.current);

    const eng = engine.current;
    const currentRule = eng.activeRule;

    if (clickedColor === currentRule) {
      eng.successfulHits += 1;
      eng.hitsOnCurrentRule += 1;
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

      // Rule switching mechanism: as level increases, rules switch dynamically
      if (eng.level >= 2) {
        const switchThreshold = Math.max(2, 6 - Math.floor(eng.level / 3));
        if (eng.hitsOnCurrentRule >= switchThreshold) {
          eng.hitsOnCurrentRule = 0;
          eng.activeRule = eng.activeRule === 'RED' ? 'BLUE' : 'RED';
          setActiveRule(eng.activeRule);
        }
      }

      setUiScore(eng.score);
      setUiLevel(Math.floor(eng.level));
      setUiCombo(eng.combo);
      drillAudio.playHit();
    } else {
      // False alarm on wrong color target
      eng.falseAlarms += 1;
      if (drillPenalty.isEnabled()) eng.timeLeft -= TIME_PENALTY;
      eng.combo = 0;
      setUiCombo(0);
      triggerFlash();
      drillAudio.playPenalty();
    }

    spawnTargets();
  }, [spawnTargets, triggerFlash]);

  // Enter Drill
  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    setIsFullscreen(true);

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (trialTimerRef.current) clearTimeout(trialTimerRef.current);

    drillAudio.init();

    const startLevel = getStartLevel();
    bestLevelRunRef.current = startLevel;

    setIsNewBest(false);
    setUiScore(0);
    setUiLevel(startLevel);
    setUiCombo(0);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    setActiveRule('RED');

    engine.current = {
      score: 0,
      level: startLevel,
      combo: 0,
      maxCombo: 0,
      activeRule: 'RED',
      hitsOnCurrentRule: 0,
      successfulHits: 0,
      misses: 0,
      falseAlarms: 0,
      timeLeft: DRILL_DURATION,
      redTarget: { x: 50, y: 50 },
      blueTarget: { x: 20, y: 20 }
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
      spawnTargets();
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [spawnTargets]);

  const shareResult = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/cognitive/processing-speed/reaction-time';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        accuracy: analytics.accuracy,
        speed: 0,
        drillName: 'Reaction Time',
        rank: analytics.grade?.letter || 'A',
        rankName: analytics.grade?.label || 'ELITE REFLEX',
        playerName: getPlayerName(),
        level: analytics.finalLevel,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        url: 'skilldrills.online/drills/cognitive/processing-speed/reaction-time'
      });
      await shareScoreCard(canvas, {
        title: 'Reaction Time — My Score',
        text: `I scored ${uiScore} (Grade: ${analytics.grade?.letter || 'A'}, Lv. ${analytics.finalLevel}) on Reaction Time at SkillDrills!`,
        url
      });
    } catch (e) {
      if (navigator.share) {
        navigator.share({ title: 'Reaction Time Score', text: `I scored ${uiScore} on Reaction Time!`, url }).catch(() => {});
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
            REACTION TIME
            <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
              Neuro Speed &amp; Reflex Test
            </span>
          </h1>
        </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
        <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
            <div className="text-lg sm:text-xl font-black text-red-400 tabular-nums">{uiScore}</div>
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
              {/* Top Left: Score */}
              <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col gap-1">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                  <p className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-tight">{uiScore}</p>
                </div>
              </div>

              {/* Active Target Rule Banner at Top Center */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <div className="bg-black/75 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 shadow-lg">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">RULE:</span>
                  <span className={`text-xs sm:text-sm font-black uppercase tracking-wider ${activeRule === 'RED' ? 'text-red-400' : 'text-cyan-400'}`}>
                    TAP {activeRule} TARGET
                  </span>
                </div>
              </div>

              {/* Top Right: Time Left */}
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* PLAYING FIELD */}
          {gameState === 'playing' && (
            <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6">
              {/* Background Grid */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              {/* Target Nodes Container */}
              <div className="relative w-full h-full">
                {/* RED TARGET */}
                <button
                  type="button"
                  onPointerDown={(e) => handleTargetClick('RED', e)}
                  className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-500/10 border-2 border-red-500/60 active:scale-90 transition-transform cursor-pointer flex items-center justify-center"
                  style={{ left: `${redTarget.x}%`, top: `${redTarget.y}%` }}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center relative">
                    <div className="absolute top-1.5 left-2 w-3.5 h-3.5 rounded-full bg-white/35" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </button>

                {/* BLUE TARGET */}
                <button
                  type="button"
                  onPointerDown={(e) => handleTargetClick('BLUE', e)}
                  className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-500/10 border-2 border-blue-500/60 active:scale-90 transition-transform cursor-pointer flex items-center justify-center"
                  style={{ left: `${blueTarget.x}%`, top: `${blueTarget.y}%` }}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center relative">
                    <div className="absolute top-1.5 left-2 w-3.5 h-3.5 rounded-full bg-white/35" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Target}
              accent="red"
              title="Reaction Time"
              subtitle="Choice Discrimination • Reflex Latency"
              rules={[
                { icon: Target, accent: 'emerald', title: 'Tap Active Target Rule', text: '+100 PTS × Combo × Level multiplier (+0.6s per hit)' },
                {
                  icon: Zap,
                  accent: 'red',
                  title: penaltyEnabled ? 'Time Penalty (-0.8s)' : 'Dynamic Neuro-Switching',
                  text: penaltyEnabled
                    ? 'Wrong target taps or timeouts subtract 0.8s and reset combo'
                    : 'Discriminate target rules under escalating speed. Misses reset combo'
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
              accent="rose"
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
              title="About Reaction Time"
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
                    <p className="text-xs text-gray-300 leading-relaxed">Competitive gamers and esports players who need split-second target discrimination, drivers and pilots training hazard response, and anyone wanting sharper visual-motor reflexes under rule-switching pressure.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Choice reaction time, visual discrimination speed, motor response execution, and resistance to interference from non-target stimuli.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Rule-Switch Agility</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Every rule flip forces your prefrontal cortex to update its active response mapping on the fly, training rapid cognitive set-shifting alongside raw reflex speed.</p>
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
                  className="group bg-[#0c0c16] border border-white/5 hover:border-red-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-red-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-red-400 mt-3 flex items-center gap-1 transition-colors">
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