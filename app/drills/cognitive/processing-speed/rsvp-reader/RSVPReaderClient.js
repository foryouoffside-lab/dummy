'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Volume2, VolumeX,
  Play, RefreshCw, Share2, ArrowLeft, BookOpen, Users, TrendingUp, Zap, ZapOff, Target, Trophy
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { drillFlash } from '../../../../../lib/drillFlash';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import { getStartLevel } from '../../../../../lib/drillDifficulty';
import useDrillFlash from '../../../../../lib/useDrillFlash';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import DrillFlashOverlay from '../../../../../components/drill/DrillFlashOverlay';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

const DRILL_DURATION = 45;

const PASSAGE_WORDS = [
  "Neuroplasticity", "is", "the", "brain's", "remarkable", "ability", "to", "reorganize", "itself", "by", "forming", "new", "neural", "connections", "throughout", "life.",
  "This", "extraordinary", "process", "allows", "neurons", "in", "the", "brain", "to", "compensate", "for", "injury", "and", "disease.",
  "Rapid", "Serial", "Visual", "Presentation", "leverages", "the", "brain's", "natural", "visual", "cortex", "processing", "speed.",
  "Traditional", "reading", "involves", "saccadic", "eye", "movements", "where", "the", "eyes", "jump", "from", "word", "to", "word.",
  "RSVP", "technology", "eliminates", "these", "inefficient", "eye", "jump", "movements", "entirely.",
  "By", "presenting", "words", "sequentially", "at", "a", "fixed", "focal", "point,", "RSVP", "maximizes", "reading", "throughput.",
  "Each", "word", "has", "an", "Optimal", "Recognition", "Point", "where", "the", "brain", "most", "efficiently", "decodes", "it.",
  "Regular", "practice", "with", "RSVP", "trains", "working", "memory", "and", "lexical", "processing", "speed."
];

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

const MAX_LEVEL = 5;
const POINTS_PER_HIT = 100;
const POINTS_PER_LEVEL = 200;
const ELITE_SCORE = 2500; // Target score for S+ rating in 5-level system
const STORAGE_KEY = 'skilldrills_rsvp_reader_v8';

const LEVEL_CONFIGS = {
  1: { wpm: 250, label: 'Level 1 (250 WPM)' },
  2: { wpm: 350, label: 'Level 2 (350 WPM)' },
  3: { wpm: 480, label: 'Level 3 (480 WPM)' },
  4: { wpm: 650, label: 'Level 4 (650 WPM)' },
  5: { wpm: 850, label: 'Level 5 (850 WPM)' }
};

const getLevelConfig = (level) => {
  const clamped = Math.min(MAX_LEVEL, Math.max(1, level));
  return LEVEL_CONFIGS[clamped];
};

const pickUpcomingTarget = (currentWordIdx) => {
  for (let offset = 6; offset <= 14; offset++) {
    const candidateIdx = (currentWordIdx + offset) % PASSAGE_WORDS.length;
    const candidate = PASSAGE_WORDS[candidateIdx];
    const clean = candidate.toLowerCase().replace(/[^a-z]/g, '');
    if (clean.length >= 4) {
      return { clean, targetIdx: candidateIdx };
    }
  }
  return { clean: 'brain', targetIdx: (currentWordIdx + 6) % PASSAGE_WORDS.length };
};

const getORP = (word) => {
  if (!word) return { prefix: '', pivot: '', suffix: '' };
  const len = word.length;
  let pivotIndex = Math.floor((len - 1) / 3);
  if (len === 1) pivotIndex = 0;

  return {
    prefix: word.substring(0, pivotIndex),
    pivot: word.substring(pivotIndex, pivotIndex + 1),
    suffix: word.substring(pivotIndex + 1)
  };
};

const RULES_ITEMS = [
  { title: "Upcoming Target Word", text: "A designated TARGET WORD (not yet shown) is displayed in the top banner. Watch the focal stream carefully." },
  { title: "ORP Focal Stream", text: "Words flash sequentially at a single focal point (Optimal Recognition Point) with zero eye movements required." },
  { title: "Target Catch Trigger", text: "Tap TARGET DETECTED immediately when the active target word appears in the focal display." },
  { title: "5-Level Speed System", text: "Progress across 5 professional speed tiers from Level 1 (250 WPM) up to Level 5 (850 WPM)." }
];

const ABOUT_TEXT = `RSVP (Rapid Serial Visual Presentation) is a high-throughput reading technology and cognitive processing speed drill. In traditional reading, up to 80% of reading time is spent executing saccadic eye movements — jumping your eyes from word to word.

RSVP eliminates saccadic eye movements by displaying text sequentially at a single focal point, aligned to the Optimal Recognition Point (ORP) of each word. This allows the visual cortex to process lexical tokens at speeds exceeding 850 words per minute.

Practicing RSVP trains visual token decoding speed, working memory buffer capacity, and attentional focus under high information throughput.`;

const FAQ_ITEMS = [
  { q: "How does the target word system work in RSVP Speed Reader?", a: "The banner at top center displays an upcoming target word. Watch the focal stream as words flash. The moment the target word appears, tap 'TARGET DETECTED'. Once detected or passed, a new upcoming target word is assigned." },
  { q: "What is an RSVP speed reader?", a: "RSVP (Rapid Serial Visual Presentation) displays words one at a time at a single focal point, eliminating saccadic eye movements. Words flash at the Optimal Recognition Point (ORP) for maximum reading throughput." },
  { q: "What are the 5 difficulty levels?", a: "Level 1 (250 WPM), Level 2 (350 WPM), Level 3 (480 WPM), Level 4 (650 WPM), and Level 5 (850 WPM). Level increases progressively up to Level 5 as you hit target words with high precision." },
  { q: "What is the Optimal Recognition Point (ORP)?", a: "The ORP is the position within a word where the human visual cortex can recognize it most efficiently — typically just left of center, weighted toward the beginning. Aligning each word at its ORP lets your eyes stay fixed at one point while still decoding the full word, accelerating visual token decoding." },
  { q: "Why do saccadic eye movements slow down normal reading?", a: "In conventional reading, the eyes don't move smoothly across a line — they jump between fixation points (saccades) and pause briefly at each word. Research suggests up to 80% of reading time is spent on these jumps and pauses rather than actual word recognition. RSVP removes the jumps entirely by bringing the words to a fixed focal point instead." },
  { q: "Can RSVP training actually increase my reading speed?", a: "RSVP reliably increases raw word-recognition throughput because it removes eye-movement overhead, and regular practice measurably improves how quickly your visual cortex parses each flashed word. Comprehension at very high WPM tiers depends on the material and the reader, which is why this drill also tracks accuracy alongside speed rather than raw WPM alone." },
  { q: "Is RSVP the same technique used in speed-reading apps?", a: "Yes. RSVP is the core mechanism behind most commercial speed-reading apps and browser extensions. This drill isolates the technique as a trainable cognitive skill — a target-detection task — rather than a passive reading tool, so you get a measurable score and progression instead of just a WPM counter." },
  { q: "What is a good WPM score for this drill?", a: "The average adult reads prose at 200-300 WPM with full comprehension. Reaching Level 3 (480 WPM) with high accuracy is a strong result; sustaining Level 5 (850 WPM) while still catching target words reliably puts you in elite speed-reading territory." },
  { q: "Who benefits most from RSVP training?", a: "Students processing dense reading loads, professionals who read large volumes of text daily, and competitive gamers who need to parse on-screen information streams quickly all benefit from sharper visual word-recognition speed." },
  { q: "Is this RSVP speed reader free?", a: "Yes. SkillDrills RSVP Speed Reader is 100% free with no ads, downloads, or registration required. It runs entirely in your browser on desktop and mobile." }
];

const RELATED_DRILLS = [
  { id: "symbol-matching", name: "Symbol Matching", cat: "Processing Speed", desc: "Match rapid symbol pairs under strict time pressure.", href: "/drills/cognitive/processing-speed/symbol-matching" },
  { id: "reaction-time", name: "Reaction Time", cat: "Processing Speed", desc: "Train choice reaction speed and visual reflex latency.", href: "/drills/cognitive/processing-speed/reaction-time" },
  { id: "concentration-stamina", name: "Concentration Stamina", cat: "Attention", desc: "Sustain continuous visual focus through prolonged high-density sequences.", href: "/drills/cognitive/attention/concentration-stamina" },
  { id: "distraction-fighter", name: "Distraction Fighter", cat: "Focus", desc: "Filter out high-interference Stroop visual distractors.", href: "/drills/cognitive/focus/distraction-fighter" },
  { id: "concentration-grid", name: "Concentration Grid", cat: "Focus", desc: "Scan and tap sequential numbers on expanding grid matrices.", href: "/drills/cognitive/focus/concentration-grid" },
  { id: "divided-attention", name: "Divided Attention", cat: "Attention", desc: "Track and react to multiple independent target streams simultaneously.", href: "/drills/cognitive/attention/divided-attention" }
];

export default function RSVPReaderClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);

  // Live HUD State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [uiWpm, setUiWpm] = useState(300);
  const [bestScore, setBestScore] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  // Active RSVP Stream State
  const [targetWord, setTargetWord] = useState('brain');
  const [currentWord, setCurrentWord] = useState('Neuroplasticity');

  // Analytics
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    successfulHits: 0,
    misses: 0,
    falseAlarms: 0,
    finalLevel: 1,
    grade: null
  });

  // DOM & Engine Refs
  const containerRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const streamTimerRef = useRef(null);

  const engine = useRef({
    score: 0,
    level: 1,
    successfulHits: 0,
    misses: 0,
    falseAlarms: 0,
    timeLeft: DRILL_DURATION,
    wordIdx: 0,
    targetWord: 'brain',
    currentWord: 'Neuroplasticity',
    wasResponded: false
  });

  const { flashes, triggerFlash } = useDrillFlash();

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (streamTimerRef.current) clearTimeout(streamTimerRef.current);
    };
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (streamTimerRef.current) clearTimeout(streamTimerRef.current);

    setIsFullscreen(false);
    setGameState('start');
  }, []);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  const endGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (streamTimerRef.current) clearTimeout(streamTimerRef.current);

    setGameState('gameOver');

    const e = engine.current;
    const totalActs = e.successfulHits + e.misses + e.falseAlarms;
    const acc = totalActs > 0 ? Math.round((e.successfulHits / totalActs) * 100) : 100;

    const gradeObj = getFpsScoreGrade(e.score, ELITE_SCORE);

    setAnalytics({
      accuracy: acc,
      successfulHits: e.successfulHits,
      misses: e.misses,
      falseAlarms: e.falseAlarms,
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

  const assignNextTarget = useCallback((currentIdx) => {
    const e = engine.current;
    const { clean } = pickUpcomingTarget(currentIdx);
    e.targetWord = clean;
    setTargetWord(clean);
  }, []);

  // Stream Flash Loop
  const flashStream = useCallback(() => {
    if (streamTimerRef.current) clearTimeout(streamTimerRef.current);
    const e = engine.current;
    const config = getLevelConfig(e.level);
    setUiWpm(config.wpm);

    // Check if previous target word was missed (appeared, was not responded, and stream moved past it)
    const cleanPrev = e.currentWord.toLowerCase().replace(/[^a-z]/g, '');
    const cleanTarget = e.targetWord.toLowerCase().replace(/[^a-z]/g, '');

    if (cleanPrev === cleanTarget && !e.wasResponded) {
      e.misses += 1;
      triggerFlash();
      drillAudio.playPenalty();
      assignNextTarget(e.wordIdx);
    }

    // Advance word index
    e.wordIdx = (e.wordIdx + 1) % PASSAGE_WORDS.length;
    const nextWord = PASSAGE_WORDS[e.wordIdx];

    e.currentWord = nextWord;
    e.wasResponded = false;
    setCurrentWord(nextWord);

    const msPerWord = Math.round((60 / config.wpm) * 1000);

    streamTimerRef.current = setTimeout(() => {
      flashStream();
    }, msPerWord);
  }, [triggerFlash, assignNextTarget]);

  const handleRespond = useCallback((ev) => {
    if (ev) ev.stopPropagation();
    const eng = engine.current;

    if (eng.wasResponded) {
      eng.falseAlarms += 1;
      triggerFlash();
      drillAudio.playPenalty();
      return;
    }

    eng.wasResponded = true;

    const cleanCurrent = eng.currentWord.toLowerCase().replace(/[^a-z]/g, '');
    const cleanTarget = eng.targetWord.toLowerCase().replace(/[^a-z]/g, '');

    if (cleanCurrent === cleanTarget) {
      eng.successfulHits += 1;
      eng.score += POINTS_PER_HIT;

      const rawLevel = Math.min(MAX_LEVEL, Math.floor(eng.score / POINTS_PER_LEVEL) + 1);
      eng.level = Math.max(eng.level, rawLevel);

      setUiScore(eng.score);
      drillAudio.playHit();

      assignNextTarget(eng.wordIdx);
    } else {
      // Wrong click (tapped when current word is NOT the target): counts against
      // accuracy, but the run always plays out the clock.
      eng.falseAlarms += 1;
      triggerFlash();
      drillAudio.playPenalty();
    }
  }, [triggerFlash, assignNextTarget]);

  // Enter Drill
  const enterDrill = useCallback(async () => {
    setIsFullscreen(true);

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (streamTimerRef.current) clearTimeout(streamTimerRef.current);

    drillAudio.init();

    const saved = getSavedData();
    const startLevel = Math.min(MAX_LEVEL, getStartLevel(saved.bestLevel));
    const initialConfig = getLevelConfig(startLevel);
    const initialTarget = pickUpcomingTarget(0);

    setUiScore(0);
    setUiTimeLeft(DRILL_DURATION);
    setUiWpm(initialConfig.wpm);
    setTargetWord(initialTarget.clean);

    engine.current = {
      score: 0,
      level: startLevel,
      successfulHits: 0,
      misses: 0,
      falseAlarms: 0,
      timeLeft: DRILL_DURATION,
      wordIdx: 0,
      targetWord: initialTarget.clean,
      currentWord: PASSAGE_WORDS[0],
      wasResponded: true
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

      flashStream();
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [endGame, flashStream]);

  const shareResult = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.grade || analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'RSVP Speed Reader',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS at ${uiWpm} WPM (Level ${analytics.finalLevel}) on RSVP Speed Reader! Processing accuracy: ${analytics.accuracy}%. Practice free cognitive focus drills at skilldrills.online! ⚡`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'RSVP Speed Reader Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(`${text} ${url}`);
      }
    }
  }, [uiScore, bestScore, uiWpm, analytics, isNewBest]);

  const orp = getORP(currentWord);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            RSVP SPEED READER
            <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
              Reading Speed Test
            </span>
          </h1>
        </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
        <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
            <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums">{uiScore}</div>
          </div>
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
            <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {uiTimeLeft}s
            </div>
          </div>
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Speed</div>
            <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">{uiWpm} WPM</div>
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
              <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col items-start gap-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                <p className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-tight">{uiScore}</p>
              </div>

              {/* Top Right: Time Left */}
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time Left</p>
                <p className={`text-2xl sm:text-3xl font-black tabular-nums leading-tight ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</p>
              </div>
            </>
          )}

          {/* IN-GAME HUD SOUND + FLASH TOGGLES */}
          {gameState === 'playing' && (
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
                    drillAudio.setEnabled(!v);
                    return !v;
                  });
                }}
                className="p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* PLAYING FIELD */}
          {gameState === 'playing' && (
            <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6">
              {/* Background Grid */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              {/* Target Prompt Banner Top Center */}
              <div className="z-20 bg-black/70 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 flex items-center gap-2 shadow-lg pointer-events-none mt-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Target Word:</span>
                <span className="text-sm font-black text-amber-400 uppercase tracking-wider">{targetWord}</span>
              </div>

              {/* ORP RSVP Focal Word Display (Clean, Boxless Stream, No Center Reticle Line) */}
              <div className="relative flex items-center justify-center w-full max-w-lg h-36 sm:h-44 font-mono text-4xl sm:text-6xl font-black my-auto pointer-events-none">
                <div className="flex items-center justify-center tracking-tight">
                  <span className="text-slate-300 text-right min-w-[120px] sm:min-w-[180px]">{orp.prefix}</span>
                  <span className="text-red-500 font-black px-0.5 underline decoration-red-500 decoration-2">{orp.pivot}</span>
                  <span className="text-slate-300 text-left min-w-[120px] sm:min-w-[180px]">{orp.suffix}</span>
                </div>
              </div>

              {/* Catch Target Trigger Button */}
              <button
                type="button"
                onPointerDown={handleRespond}
                className="w-full max-w-sm py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-2xl font-black text-xl sm:text-2xl active:scale-95 transition-transform shadow-[0_0_25px_rgba(245,158,11,0.35)] cursor-pointer border border-amber-400/30 z-30 mb-2"
              >
                TARGET DETECTED
              </button>
            </div>
          )}

          {/* START CARD */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={BookOpen}
              accent="amber"
              title="RSVP Speed Reader"
              subtitle="Lexical Decoding • ORP Focus"
              rules={[
                { icon: Target, accent: 'amber', title: 'Tap When Target Word Flashes', text: 'Detect designated target words in the rapid focal stream' },
                { icon: Zap, accent: 'blue', title: 'ORP Focal Stream', text: 'Words flash sequentially at a single focal point without eye movement' },
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

          {/* END SCREEN */}
          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              {/* Left Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(245,158,11,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade?.color || 'text-amber-400'}`}>
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
                    <p className="text-sm sm:text-base font-black text-red-400">{analytics.misses}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Errors</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
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
              title="About RSVP Speed Reader"
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
                    <p className="text-xs text-gray-300 leading-relaxed">Students and professionals who need to process large volumes of text quickly, speed-reading enthusiasts, and anyone wanting to train visual word-recognition throughput beyond normal saccadic reading speed.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Visual word-recognition speed, working memory buffer capacity for rapid lexical streams, and sustained attention at high information throughput.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Progressive Speed Tiers</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">5 professional WPM tiers (250 to 850) push your focal recognition point further with each level, training the visual cortex to decode words without saccadic eye movement.</p>
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
                  className="group bg-[#0c0c16] border border-white/5 hover:border-amber-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-amber-400 mt-3 flex items-center gap-1 transition-colors">
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