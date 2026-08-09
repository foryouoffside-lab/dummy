'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Volume2, VolumeX,
  Play, RefreshCw, Share2, ArrowLeft, ShieldCheck, Users, TrendingUp, Brain, Heart, Flame, Trophy, Target, Zap
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
const STORAGE_KEY = 'skilldrills_distraction_fighter_v9';

const COLOR_NAMES = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];
const COLOR_STYLES = {
  Red: { textClass: 'text-red-500', hex: '#ef4444' },
  Blue: { textClass: 'text-blue-500', hex: '#3b82f6' },
  Green: { textClass: 'text-emerald-500', hex: '#10b981' },
  Yellow: { textClass: 'text-yellow-400', hex: '#eab308' },
  Purple: { textClass: 'text-purple-500', hex: '#a855f7' },
  Orange: { textClass: 'text-orange-500', hex: '#f97316' }
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

const getLevelConfig = (level) => {
  const p = getDifficultyProgress(level); // 0 -> 1 across L1..L15
  return {
    ttl: Math.max(380, Math.round(1700 - p * 1320)), // Trial time window speeds up from 1700ms down to 380ms
    choiceCount: level >= 4 ? 6 : 4                  // Distractor options scale up from 4 to 6 choices
  };
};

const RULES_ITEMS = [
  { title: "Stroop Effect Challenge", text: "A color word flashes on screen (e.g. 'BLUE'), printed in a conflicting ink color (e.g. RED ink)." },
  { title: "Target Selection Rule", text: "Tap the button matching the INK COLOR (e.g., tap Red), ignoring the semantic word meaning." },
  { title: "Cognitive Inhibition", text: "Suppress top-down reading impulses to isolate raw visual color perception under strict speed pressure." },
  { title: "Precision Matters", text: "Tapping the semantic word color or letting the trial time out triggers a red alert — stay sharp to keep your accuracy high." }
];

const ABOUT_TEXT = `Distraction Fighter is a classical cognitive focus drill grounded in the Stroop Effect and prefrontal inhibitory control research. The Stroop effect demonstrates the cognitive interference that occurs when processing competing visual features — specifically, reading a word versus identifying its font color.

Reading is an automated implicit cognitive process. When a color word is printed in a non-matching ink color, your brain's anterior cingulate cortex and dorsolateral prefrontal cortex must actively suppress the word meaning to report the ink color.

Regular practice on Distraction Fighter strengthens top-down cognitive inhibition, helping athletes, esports competitors, and professionals maintain laser focus amidst high-noise environment distractors.`;

const FAQ_ITEMS = [
  { q: "Why are humans so easily distracted?", a: "Humans have an evolved orienting reflex that automatically directs attention toward novel, moving, or salient stimuli — a survival mechanism to detect threats and opportunities. In modern environments, this reflex is constantly triggered by notifications, movement, and bright colors, undermining voluntary focus. Training inhibitory control helps you override this reflex." },
  { q: "What is the Stroop test and how does it measure distraction resistance?", a: "The Stroop test (1935) requires naming the ink color of color words printed in conflicting colors (e.g., the word 'RED' in blue ink). The interference between the automatic reading response and the voluntary color-naming response measures your cognitive inhibition strength. A longer reaction time or more errors indicates stronger Stroop interference — weaker distraction resistance." },
  { q: "What is inhibitory control and why does it matter?", a: "Inhibitory control is the executive function that suppresses automatic, habitual, or impulse-driven responses in favor of more deliberate, goal-directed actions. It is essential for resisting distractions, suppressing irrelevant memories, controlling impulsive behavior, and maintaining task focus. It is one of the three core executive functions alongside working memory and cognitive flexibility." },
  { q: "How can I train my brain to block out distractions?", a: "Effective methods include: (1) Stroop test and Flanker task practice (strengthens top-down inhibitory pathways), (2) mindfulness meditation (increases prefrontal cortex gray matter density), (3) single-tasking practice (training sustained focus without device interruptions), and (4) progressive exposure to distractor-rich environments during deliberate practice. This drill provides direct gamified inhibitory control exercise." },
  { q: "What is the Flanker task and how does it relate to distraction?", a: "The Eriksen Flanker Task displays a central target surrounded by congruent (same direction) or incongruent (opposite direction) flanker stimuli. The incongruent condition creates response competition — your brain must inhibit the incorrect flanker response to respond correctly to the central target. This resistance to flanker distraction is precisely what this game trains." },
  { q: "Can distraction-resistance training help with open-office productivity?", a: "Yes. Workers in open offices face continuous visual and auditory distractors. Training inhibitory control makes it cognitively cheaper to suppress peripheral visual movement (colleagues walking), auditory interruptions, and environmental noise, allowing deeper sustained focus during critical work intervals." },
  { q: "What is the orienting reflex and how does it cause distraction?", a: "The orienting reflex is an automatic neurological response to novel stimuli — your brain involuntarily redirects attention to unexpected sounds, movement, or visual changes. Mediated by the superior colliculus and thalamus, it evolved to ensure threat detection. Inhibitory control training helps the prefrontal cortex override this reflex when distraction is unhelpful." },
  { q: "How does this distraction fighter game work?", a: "The game presents a primary target task while simultaneously spawning deceptive visual distractors. You must successfully complete your primary task while resisting clicking or responding to the distractors. Each successful distractor resistance builds your inhibitory control score, while each distractor click counts as an impulse control failure." },
  { q: "Does inhibitory control training help children with ADHD?", a: "Inhibitory control deficits are a hallmark of ADHD. Computerized inhibitory control training shows promise as a supplemental intervention, with studies showing improvements in stop-signal reaction times, Stroop interference, and classroom behavior with regular practice. Always combine cognitive training with clinical treatment and professional guidance." },
  { q: "Is this distraction-fighter game free to play?", a: "Yes. The Distraction Fighter drill on SkillDrills is completely free. No sign-up, no downloads, no subscriptions. It runs entirely in your browser on both desktop and mobile devices." }
];

const RELATED_DRILLS = [
  { id: "concentration-stamina", name: "Concentration Stamina", cat: "Attention", desc: "Sustain continuous visual focus through prolonged high-density sequences.", href: "/drills/cognitive/attention/concentration-stamina" },
  { id: "concentration-grid", name: "Concentration Grid", cat: "Focus", desc: "Scan and tap sequential numbers on expanding grid matrices.", href: "/drills/cognitive/focus/concentration-grid" },
  { id: "reaction-time", name: "Reaction Time", cat: "Processing Speed", desc: "Train choice reaction speed and visual reflex latency.", href: "/drills/cognitive/processing-speed/reaction-time" },
  { id: "divided-attention", name: "Divided Attention", cat: "Attention", desc: "Track and react to multiple independent target streams simultaneously.", href: "/drills/cognitive/attention/divided-attention" },
  { id: "multi-tasking", name: "Multi-Tasking", cat: "Attention", desc: "Track dual independent target streams under speed pressure.", href: "/drills/cognitive/attention/multi-tasking" },
  { id: "symbol-matching", name: "Symbol Matching", cat: "Processing Speed", desc: "Match rapid symbol pairs under strict time pressure.", href: "/drills/cognitive/processing-speed/symbol-matching" }
];

export default function DistractionFighterClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);

  // Live HUD State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [lives, setLives] = useState(MAX_LIVES);
  const [bestScore, setBestScore] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  // Stroop Prompt State
  const [currentPrompt, setCurrentPrompt] = useState({ textName: 'Blue', inkName: 'Red' });
  const [options, setOptions] = useState([]);

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
    successfulHits: 0,
    mistakes: 0,
    timeouts: 0,
    lives: MAX_LIVES,
    timeLeft: DRILL_DURATION,
    currentPrompt: { textName: 'Blue', inkName: 'Red' }
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

    // Pick random text color name and conflicting ink color name
    const textName = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
    let inkName = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
    if (inkName === textName) {
      inkName = COLOR_NAMES[(COLOR_NAMES.indexOf(inkName) + 1) % COLOR_NAMES.length];
    }

    e.currentPrompt = { textName, inkName };
    setCurrentPrompt({ textName, inkName });

    // Options: choices including correct ink color name
    const count = Math.min(COLOR_NAMES.length, config.choiceCount || 4);
    const choices = new Set([inkName]);
    while (choices.size < count) {
      const c = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
      choices.add(c);
    }
    const shuffled = Array.from(choices).sort(() => Math.random() - 0.5);
    setOptions(shuffled);

    trialTimerRef.current = setTimeout(() => {
      // Trial timeout miss
      e.timeouts += 1;
      e.lives -= 1;
      setLives(e.lives);
      triggerFlash();
      drillAudio.playPenalty();

      if (e.lives <= 0) {
        endGame();
      } else {
        spawnTrial();
      }
    }, config.ttl);
  }, [triggerFlash, endGame]);

  const handleOptionClick = useCallback((selectedColor, ev) => {
    if (ev) ev.stopPropagation();
    if (trialTimerRef.current) clearTimeout(trialTimerRef.current);

    const eng = engine.current;
    const correctInk = eng.currentPrompt.inkName;

    if (selectedColor === correctInk) {
      eng.successfulHits += 1;

      eng.score += POINTS_PER_HIT;

      const rawLevel = Math.floor(eng.score / POINTS_PER_LEVEL) + 1;
      eng.level = Math.max(eng.level, rawLevel);

      setUiScore(eng.score);
      drillAudio.playHit();
      spawnTrial();
    } else {
      eng.mistakes += 1;
      eng.lives -= 1;
      setLives(eng.lives);
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

    setUiScore(0);
    setUiTimeLeft(DRILL_DURATION);
    setLives(MAX_LIVES);

    engine.current = {
      score: 0,
      level: startLevel,
      successfulHits: 0,
      mistakes: 0,
      timeouts: 0,
      lives: MAX_LIVES,
      timeLeft: DRILL_DURATION,
      currentPrompt: { textName: 'Blue', inkName: 'Red' }
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
    const url = 'https://skilldrills.online/drills/cognitive/focus/distraction-fighter';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.grade || analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Distraction Fighter',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Distraction Fighter! Stroop suppression accuracy: ${analytics.accuracy}%. Practice free cognitive focus drills at skilldrills.online! ⚡`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'Distraction Fighter Score', text, url }).catch(() => {});
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
            <span className="text-rose-400 font-medium">Distraction Fighter</span>
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
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-rose-400 bg-clip-text text-transparent">
            DISTRACTION FIGHTER
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            High-Interference Stroop Categorization & Impulse Control
          </p>
        </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
        <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
            <div className="text-lg sm:text-xl font-black text-rose-400 tabular-nums">{uiScore}</div>
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
          {/* Red Flash Overlay */}
          <DrillFlashOverlay flashes={flashes} />

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              {/* Score & Lives - Top Left */}
              <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col items-start gap-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                <p className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-tight">{uiScore}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
                    <Heart key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 fill-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
                  ))}
                </div>
              </div>

              {/* Time Remaining - Top Right */}
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time Left</p>
                <p className={`text-2xl sm:text-3xl font-black tabular-nums leading-tight ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</p>
              </div>
            </>
          )}

          {/* PLAYING FIELD */}
          {gameState === 'playing' && (
            <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6">
              {/* Background Grid */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              {/* Stroop Prompt Display (Clean Target Color Text, No Square Container) */}
              <div className="flex-1 flex flex-col items-center justify-center z-20">
                <div className="text-center">
                  <span className="text-6xl sm:text-7xl font-black tracking-wider select-none drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]" style={{ color: COLOR_STYLES[currentPrompt.inkName]?.hex || '#ffffff' }}>
                    {currentPrompt.textName}
                  </span>
                </div>
              </div>

              {/* Color Button Grid Bottom (No Color Swatches) */}
              <div className={`z-20 w-full max-w-lg grid ${options.length > 4 ? 'grid-cols-3 sm:grid-cols-6 max-w-xl' : 'grid-cols-2 sm:grid-cols-4'} gap-2.5 mb-2`}>
                {options.map((colName) => (
                  <button
                    key={colName}
                    type="button"
                    onPointerDown={(e) => handleOptionClick(colName, e)}
                    className="py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/10 hover:border-white/30 text-white font-bold text-xs sm:text-sm uppercase tracking-wide cursor-pointer active:scale-95 transition-transform flex items-center justify-center"
                  >
                    {colName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={ShieldCheck}
              accent="emerald"
              title="Distraction Fighter"
              subtitle="Stroop Interference • Executive Focus"
              rules={[
                { icon: Target, accent: 'emerald', title: 'Tap Matching INK COLOR', text: 'Select the color button that matches the INK COLOR of the displayed text' },
                { icon: Zap, accent: 'red', title: 'Ignore Word Meaning (Stroop Effect)', text: 'Suppress cognitive interference by ignoring the actual written word' },
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
            <DrillCountdown value={countdownValue} subtitle="GET READY" accent="#fb7185" />
          )}

          {/* END SCREEN */}
          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              {/* Left Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(244,63,94,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade?.color || 'text-rose-400'}`}>
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
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
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
                  <div key={i} className="bg-[#0d0d18] p-4 rounded-xl border border-white/5">
                    <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Distraction Fighter"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8 font-sans">
                <section>
                  <div className="space-y-4">
                    {ABOUT_TEXT.split('\n\n').map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-gray-400">{para}</p>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Open-office workers fighting visual and auditory noise, students building single-task discipline, and anyone who wants to strengthen impulse control against notifications.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Stroop interference resistance, cognitive inhibition, top-down attentional control, and resistance to the automatic orienting reflex.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Brain className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Inhibitory Control</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Suppress the automatic urge to read the word and tap its semantic color — success means isolating raw ink-color perception under time pressure.</p>
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
                  <div key={i} className="bg-[#0d0d18] border border-white/5 rounded-xl p-5">
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
                  className="group bg-[#0c0c16] border border-white/5 hover:border-rose-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-rose-400 mt-3 flex items-center gap-1 transition-colors">
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