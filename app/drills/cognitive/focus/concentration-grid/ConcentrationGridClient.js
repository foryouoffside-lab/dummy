'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Compass, Volume2, VolumeX, Eye, Zap, ZapOff, Ban, Heart,
  Share2, ArrowLeft, Trophy, Target, Timer, TrendingUp, RefreshCw, Layers, Users, Play, Flame
} from 'lucide-react';

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
import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45;
const MAX_LIVES = 3;
const ELITE_SCORE = 8000; // Target score for S+ rating (rebalanced: fixed 45s session, no time refill)
const STORAGE_KEY = 'skilldrills_concentration_grid_v4';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, bestGridsCleared: 0, bestLevel: 1, totalSessions: 0 };
    return { bestScore: 0, bestGridsCleared: 0, bestLevel: 1, totalSessions: 0, ...JSON.parse(raw) };
  } catch (e) {
    return { bestScore: 0, bestGridsCleared: 0, bestLevel: 1, totalSessions: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { title: "Sequential Search", text: "Tap numbers in strict numerical order starting from 1 up to the highest number on the grid." },
  { title: "Expanding Grids", text: "Clearing a full grid advances you to larger dimensions (3x3 → 4x4 → 5x5...), testing broader peripheral vision." },
  { title: "One Fixed Session", text: "You get a single 45-second window. Clearing a grid grows the board to the next size but never changes the clock." },
  { title: "Precision & Lives", text: "Wrong taps cost one of your 3 lives and flash a warning. Run out of lives and the session ends immediately, so scan before you tap." }
];

const ABOUT_TEXT = `Concentration Grid is a foundational cognitive training drill designed to measure and improve visual search speed, spatial awareness, and sustained attention under time pressure. Originating from sports psychology performance labs, grid scanning exercises are widely used by elite athletes, pilots, and esports competitors to sharpen rapid visual information processing and mental focus.

By systematically scanning numbers in numerical sequence across expanding grids, players train micro-saccadic eye movement efficiency and peripheral target recognition. Regular practice enhances visual search discipline, suppresses cognitive distraction, and builds concentration stamina under high-speed competitive conditions.

Because the session runs on a single fixed 45-second clock with no time bonuses or penalties, the drill rewards sustained accuracy over lucky bursts of speed — one careless tap costs a life, and every second spent hesitating is time you can't get back, making peak grid size and total grids cleared the truest measures of your focus stamina.`;

const FAQ_ITEMS = [
  { q: "What is Concentration Grid?", a: "Concentration Grid is a timed cognitive exercise where players find and tap numbers in sequential order (1, 2, 3...) on a randomized, expanding grid as fast as possible." },
  { q: "How is score calculated?", a: "Score is awarded for each correct sequential tap, with a speed bonus for fast reaction time. Completing a full grid also grants a large clear bonus based on grid dimension." },
  { q: "Why do grid sizes change?", a: "As you complete smaller grids, the board expands to larger sizes. Tighter spacing and more numbers increase visual clutter, forcing your brain to expand its peripheral scanning field." },
  { q: "Does the timer ever change during a session?", a: "No. Every session runs on one fixed 45-second clock with zero time bonuses or penalties. Clearing a grid grows the board to the next size, but the clock keeps counting down the whole time — chain clears together to rack up as many grids as you can before time's up." },
  { q: "What happens when I run out of lives?", a: "You start each session with 3 lives, shown as hearts in the HUD. Every wrong tap costs one life; losing your last life ends the run immediately, regardless of time remaining." },
  { q: "What cognitive skill does Concentration Grid actually train?", a: "It primarily trains visual search efficiency — the speed at which your brain scans a cluttered field and locates a specific target among distractors. This relies on efficient micro-saccadic eye movements and peripheral vision rather than central foveal focus alone." },
  { q: "Where did the concentration grid exercise originate?", a: "Numbered scanning grids trace back to sports psychology performance labs and are a staple warm-up in football, tennis, and combat sports training. Coaches use them to sharpen an athlete's ability to process a busy visual field quickly before switching attention to the actual game action." },
  { q: "Why do the numbers rotate at larger grid sizes?", a: "From the 5x5 grid onward, each number tile is rendered at a slight random rotation. This removes the shortcut of recognizing a number purely by its shape and orientation, forcing genuine digit recognition and keeping visual search difficulty climbing alongside grid size." },
  { q: "How does this compare to a standard Schulte table?", a: "This drill is a timed, gamified evolution of the classic Schulte table (a fixed 5x5 number grid used in speed-reading and attention training). Instead of one static grid, it chains progressively larger grids together against a single countdown clock, rewarding sustained accuracy over the whole run rather than one isolated attempt." },
  { q: "Is this concentration grid test free to play?", a: "Yes. Concentration Grid on SkillDrills is completely free with no sign-up, downloads, or paywalls. It runs directly in your browser on desktop and mobile." }
];

const RELATED_DRILLS = [
  { id: "concentration-stamina", name: "Concentration Stamina", cat: "Attention", desc: "Sustain continuous visual focus through prolonged high-density sequences.", href: "/drills/cognitive/attention/concentration-stamina" },
  { id: "rsvp-reader", name: "RSVP Speed Reader", cat: "Processing Speed", desc: "Process rapid serial visual presentation text streams.", href: "/drills/cognitive/processing-speed/rsvp-reader" },
  { id: "divided-attention", name: "Divided Attention", cat: "Attention", desc: "Track and react to multiple independent target streams simultaneously.", href: "/drills/cognitive/attention/divided-attention" },
  { id: "multi-tasking", name: "Multi-Tasking", cat: "Attention", desc: "Track dual independent target streams under speed pressure.", href: "/drills/cognitive/attention/multi-tasking" },
  { id: "distraction-fighter", name: "Distraction Fighter", cat: "Focus", desc: "Filter out high-interference Stroop visual distractors.", href: "/drills/cognitive/focus/distraction-fighter" },
  { id: "reaction-time", name: "Reaction Time", cat: "Processing Speed", desc: "Train choice reaction speed and visual reflex latency.", href: "/drills/cognitive/processing-speed/reaction-time" }
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ConcentrationGridClient() {
  const [phase, setPhase] = useState('start'); // 'start' | 'countdown' | 'playing' | 'ended'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Gameplay State
  const [gridSize, setGridSize] = useState(3);
  const [gridData, setGridData] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(DRILL_DURATION);
  const [lives, setLives] = useState(MAX_LIVES);
  const [countdownValue, setCountdownValue] = useState(3);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Stats & Stats Storage
  const [bestScore, setBestScore] = useState(0);
  const [bestGridsCleared, setBestGridsCleared] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);

  // Results
  const [endSummary, setEndSummary] = useState(null);

  // Refs
  const containerRef = useRef(null);
  const clockTimerRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  const gameActiveRef = useRef(false);
  const phaseRef = useRef('start');

  const scoreRef = useRef(0);
  const timeLeftRef = useRef(DRILL_DURATION);
  const livesRef = useRef(MAX_LIVES);
  const gridsClearedRef = useRef(0);
  const gridSizeRef = useRef(3);
  const startGridRef = useRef(3);
  const currentNumberRef = useRef(1);

  const foundNumbersSetRef = useRef(new Set());
  const correctClicksRef = useRef(0);
  const totalClicksRef = useRef(0);
  const penaltyCountRef = useRef(0);
  const lastTapTimeRef = useRef(0);

  const { flashes, triggerFlash } = useDrillFlash();

  const getMaxGridCeiling = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 380) return 7;
    return 8;
  };

  const generateNewGrid = useCallback((size) => {
    const totalCells = size * size;
    const numbers = Array.from({ length: totalCells }, (_, i) => i + 1);

    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    const cells = numbers.map(num => {
      let rotation = 0;
      if (size === 5 || size === 6) {
        rotation = Math.floor(Math.random() * 24) - 12;
      } else if (size >= 7) {
        rotation = Math.floor(Math.random() * 40) - 20;
      }
      return { num, rotation };
    });

    setGridData(cells);
    setGridSize(size);
    gridSizeRef.current = size;
    currentNumberRef.current = 1;
    setCurrentNumber(1);
    foundNumbersSetRef.current.clear();
    lastTapTimeRef.current = performance.now();
  }, []);

  const endGame = useCallback(() => {
    if (phaseRef.current === 'ended') return;
    phaseRef.current = 'ended';
    setPhase('ended');
    gameActiveRef.current = false;

    if (clockTimerRef.current) {
      clearInterval(clockTimerRef.current);
      clockTimerRef.current = null;
    }

    drillAudio.playSessionEnd();

    const totalClicks = totalClicksRef.current;
    const accuracyVal = totalClicks > 0 ? Math.round((correctClicksRef.current / totalClicks) * 100) : 100;
    const finalScore = scoreRef.current;
    const peakLevel = gridSizeRef.current - 2;

    const prev = getSavedData();
    const isNewBest = finalScore > prev.bestScore;
    const updated = {
      bestScore: Math.max(prev.bestScore, finalScore),
      bestGridsCleared: Math.max(prev.bestGridsCleared, gridsClearedRef.current),
      bestLevel: Math.max(prev.bestLevel, peakLevel),
      totalSessions: prev.totalSessions + 1
    };
    saveData(updated);

    setBestScore(updated.bestScore);
    setBestGridsCleared(updated.bestGridsCleared);
    setBestLevel(updated.bestLevel);

    setEndSummary({
      score: finalScore,
      accuracy: accuracyVal,
      peakGrid: gridSizeRef.current,
      gridsCleared: gridsClearedRef.current,
      peakLevel,
      isNewBest
    });
  }, []);

  const handleCellClick = (num, e) => {
    if (e) {
      e.stopPropagation();
      if (e.cancelable) e.preventDefault();
    }

    if (phaseRef.current !== 'playing' || timeLeftRef.current <= 0) return;
    if (foundNumbersSetRef.current.has(num)) return;

    totalClicksRef.current += 1;

    if (num === currentNumberRef.current) {
      drillAudio.playHit();
      correctClicksRef.current += 1;
      foundNumbersSetRef.current.add(num);
      currentNumberRef.current += 1;
      setCurrentNumber(currentNumberRef.current);

      const tapTime = performance.now();
      const reactionTimeMs = lastTapTimeRef.current ? (tapTime - lastTapTimeRef.current) : 1000;
      lastTapTimeRef.current = tapTime;

      const basePoints = 100;
      const speedBonus = Math.max(0, Math.round((1200 - Math.min(1200, reactionTimeMs)) / 10));
      const pointsEarned = basePoints + speedBonus;

      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);

      const totalCells = gridSizeRef.current * gridSizeRef.current;
      if (foundNumbersSetRef.current.size === totalCells) {
        const clearBonus = Math.round(500 * (totalCells / 9));
        scoreRef.current += clearBonus;
        setScore(scoreRef.current);

        gridsClearedRef.current += 1;

        const maxCeiling = getMaxGridCeiling();
        if (gridSizeRef.current < maxCeiling) {
          gridSizeRef.current += 1;
        }
        generateNewGrid(gridSizeRef.current);
      }
    } else {
      // Wrong number clicked
      drillAudio.playPenalty();
      triggerFlash('red');
      penaltyCountRef.current += 1;

      livesRef.current = Math.max(0, livesRef.current - 1);
      setLives(livesRef.current);

      if (livesRef.current <= 0) {
        endGame();
      }
    }
  };

  const handleCellClickRef = useRef(null);
  handleCellClickRef.current = handleCellClick;

  // Game clock tick
  useEffect(() => {
    if (phase !== 'playing') return;

    const tick = () => {
      if (!gameActiveRef.current) return;
      timeLeftRef.current = Math.max(0, timeLeftRef.current - 0.1);
      setTimeRemaining(timeLeftRef.current);
      if (timeLeftRef.current <= 0) {
        endGame();
      }
    };

    clockTimerRef.current = setInterval(tick, 100);
    return () => {
      if (clockTimerRef.current) clearInterval(clockTimerRef.current);
    };
  }, [phase, endGame]);

  const handleCountdownComplete = useCallback(() => {
    setPhase('playing');
    phaseRef.current = 'playing';
    gameActiveRef.current = true;
    generateNewGrid(startGridRef.current);
  }, [generateNewGrid]);

  const enterDrill = useCallback(async () => {
    // 1. Fullscreen request MUST be the literal first await in gesture handler
    if (containerRef.current && !document.fullscreenElement) {
      try { await containerRef.current.requestFullscreen(); } catch (e) {}
    }

    drillAudio.init();

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (clockTimerRef.current) { clearInterval(clockTimerRef.current); clockTimerRef.current = null; }

    const saved = getSavedData();
    const startLevel = getStartLevel(saved.bestLevel || 1);
    const startGrid = Math.min(getMaxGridCeiling(), Math.max(3, startLevel + 2));
    startGridRef.current = startGrid;

    scoreRef.current = 0;
    timeLeftRef.current = DRILL_DURATION;
    livesRef.current = MAX_LIVES;
    gridsClearedRef.current = 0;
    correctClicksRef.current = 0;
    totalClicksRef.current = 0;
    penaltyCountRef.current = 0;

    setScore(0);
    setTimeRemaining(DRILL_DURATION);
    setLives(MAX_LIVES);
    setEndSummary(null);

    setPhase('countdown');
    phaseRef.current = 'countdown';
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
      handleCountdownComplete();
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [handleCountdownComplete]);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (clockTimerRef.current) { clearInterval(clockTimerRef.current); clockTimerRef.current = null; }
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    phaseRef.current = 'start';
    setPhase('start');
  }, []);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: phase === 'playing' || phase === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  const gradeInfo = endSummary ? getFpsScoreGrade(endSummary.score, ELITE_SCORE) : null;

  const shareResult = useCallback(async () => {
    if (!endSummary || !gradeInfo) return;
    const url = 'https://skilldrills.online/drills/cognitive/focus/concentration-grid';
    try {
      const canvas = generateShareCard({
        score: endSummary.score,
        bestScore,
        accuracy: endSummary.accuracy,
        rating: { letter: gradeInfo.grade, label: gradeInfo.label, emoji: '🎯' },
        newBest: endSummary.isNewBest,
        drillName: 'Concentration Grid',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${endSummary.score} PTS (${endSummary.peakGrid}×${endSummary.peakGrid} grid, ${endSummary.gridsCleared} grids cleared) on Concentration Grid! Accuracy: ${endSummary.accuracy}%. Practice free cognitive focus drills at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'Concentration Grid Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(`${text} ${url}`);
      }
    }
  }, [endSummary, gradeInfo, bestScore]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            CONCENTRATION GRID
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Visual Search & Sequential Target Scanning Under Speed Constraints
          </p>
        </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
        <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
            <div className="text-lg sm:text-xl font-black text-cyan-400 tabular-nums">{score}</div>
          </div>
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
            <div className={`text-lg sm:text-xl font-black tabular-nums ${timeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {Math.ceil(timeRemaining)}s
            </div>
          </div>
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Grid Size</div>
            <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">{gridSize}×{gridSize}</div>
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
          {/* Subtle Canvas Background Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Screen Flashes */}
          <DrillFlashOverlay flashes={flashes} />

          {/* IN-BOX HUD */}
          {(phase === 'playing' || phase === 'countdown') && (
            <>
              {/* Score & Lives - Top Left */}
              <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col items-start gap-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                <p className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-tight">{score}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
                    <Heart key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 fill-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
                  ))}
                </div>
              </div>

              {/* Target Indicator - Top Center */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 shadow-lg">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Target:</span>
                  <span className="text-lg sm:text-2xl font-black text-cyan-400 font-mono">{currentNumber}</span>
                </div>
              </div>

              {/* Time Remaining - Top Right */}
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time</p>
                <p className={`text-2xl sm:text-3xl font-black tabular-nums leading-tight ${timeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{Math.ceil(timeRemaining)}s</p>
              </div>
            </>
          )}

          {/* IN-GAME HUD SOUND + FLASH TOGGLES (header's toggle is hidden while fullscreen) */}
          {(phase === 'playing' || phase === 'countdown') && (
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
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  drillAudio.setEnabled(next);
                }}
                className="p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* START CARD */}
          {phase === 'start' && (
            <FpsStartCard
              icon={Compass}
              accent="cyan"
              title="Concentration Grid"
              subtitle="Sequential Number Search"
              rules={[
                { icon: Target, accent: 'emerald', title: 'Tap Numbers in Order (1, 2, 3...)', text: 'Locate and click numbers in strict sequential numerical order' },
                { icon: Zap, accent: 'blue', title: 'Speed & Grid Scaling', text: 'Grid size and search density scale as levels progress' },
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
          {phase === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" />
          )}

          {/* PLAYING GRID BOARD */}
          {phase === 'playing' && (
            <div className="flex-1 flex flex-col items-center justify-center p-4 z-20">
              <GridBoard
                gridData={gridData}
                gridSize={gridSize}
                currentNumber={currentNumber}
                onCellClick={handleCellClickRef}
              />
            </div>
          )}

          {/* RESULT CARD (36/64 SPLIT, VERTICALLY CENTERED) */}
          {phase === 'ended' && endSummary && gradeInfo && (
            <div className="absolute inset-0 z-50 flex bg-[#050508]/98 backdrop-blur-xl select-none font-sans" onPointerDown={(e) => e.stopPropagation()}>
              {/* Left 36% Grade Section */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/10 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(6,182,212,.12), transparent 70%)' }}>
                {endSummary.isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
                  </span>
                )}
                <div className="text-5xl sm:text-6xl font-black leading-none" style={{ color: gradeInfo.color }}>
                  {gradeInfo.grade}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1">
                  {gradeInfo.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 tabular-nums">
                  {endSummary.score.toLocaleString()}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500">Points</div>
              </div>

              {/* Right 64% Stats & Actions, vertically centered */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
                {/* 3 Stat Tiles */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{endSummary.accuracy}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Accuracy</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{endSummary.gridsCleared}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Grids Cleared</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{endSummary.peakGrid}×{endSummary.peakGrid}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Max Grid</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={enterDrill}
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Play Again
                  </button>
                  <button
                    onClick={shareResult}
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform"
                    title="Share Score"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
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

        {/* ── ACCORDIONS: no gap between them, per drill-page layout request ── */}
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

        {/* ── ACCORDION 2: ABOUT CONCENTRATION GRID ── */}
        <DrillAccordion
          id="about"
          title="About Concentration Grid"
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
                <p className="text-xs text-gray-300 leading-relaxed">Elite athletes, pilots, and esports competitors who rely on rapid visual information processing, plus anyone training sustained focus under time pressure.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                  <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">Visual search speed, micro-saccadic eye movement efficiency, spatial scanning discipline, and sustained concentration stamina.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Eye className="w-3.5 h-3.5 text-white" /></div>
                  <h5 className="text-xs font-bold text-white">Peripheral Vision</h5>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">Each cleared grid expands to a larger, denser board, widening the visual field you must scan without losing track of the next target number.</p>
              </div>
            </div>
          </div>
        </DrillAccordion>

        {/* ── ACCORDION 3: FAQ ── */}
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

        {/* ── RELATED COGNITIVE DRILLS (6 CARDS) ── */}
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
      </main>

      {/* ── FOOTER ── */}
      {!isFullscreen && <DrillFooter />}
    </div>
  );
}

// ============================================================
// GRID BOARD COMPONENT
// ============================================================
const GridBoard = React.memo(function GridBoard({ gridData, gridSize, currentNumber, onCellClick }) {
  const fontSize = `${Math.max(12, Math.min(24, 100 / gridSize))}px`;

  return (
    <div
      className="grid mx-auto max-h-full max-w-full relative transition-all duration-300"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        width: 'min(76vw, 46vh)',
        height: 'min(76vw, 46vh)',
        aspectRatio: '1/1',
        gap: gridSize >= 6 ? '4px' : '8px',
      }}
    >
      {gridData.map((cell) => {
        const isFound = cell.num < currentNumber;
        return (
          <button
            key={cell.num}
            onPointerDown={(e) => onCellClick.current?.(cell.num, e)}
            disabled={isFound}
            className={`
              w-full h-full rounded-xl font-black transition-all duration-100 flex items-center justify-center touch-none select-none
              ${isFound
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 scale-95 opacity-40 cursor-default'
                : 'bg-slate-900/90 border border-white/15 text-white hover:bg-slate-800 hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.4)] cursor-pointer'}
            `}
            style={{
              fontSize,
              transform: !isFound && cell.rotation ? `rotate(${cell.rotation}deg)` : 'none'
            }}
          >
            {cell.num}
          </button>
        );
      })}
    </div>
  );
});