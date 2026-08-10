'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Brain, Volume2, VolumeX, Eye, Zap, ZapOff, Heart,
  Share2, ArrowLeft, RefreshCw, Layers, Users, TrendingUp, Repeat, Flame, Trophy, Target
} from 'lucide-react';

import { drillAudio } from '../../../../../lib/drillAudio';
import { drillFlash } from '../../../../../lib/drillFlash';
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
import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45;
const POINTS_PER_HIT = 100;
const POINTS_PER_LEVEL = 150;
const ELITE_SCORE = 4000; // Target score for S+ rating (rebalanced after combo removal)
const STORAGE_KEY = 'skilldrills_concentration_stamina_v3';

const DATA_SETS = {
  VOWELS: ['A', 'E', 'I', 'O', 'U'],
  CONSONANTS: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
  PRIMES: ['2', '3', '5', '7'],
  NON_PRIMES: ['1', '4', '6', '8', '9']
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



// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { title: "Dynamic Rule Switching", text: "Target rule shifts every 10 seconds between VOWELS (A, E, I, O, U) and PRIMES (2, 3, 5, 7)." },
  { title: "Target Tap & Spacebar", text: "Tap screen or press Spacebar as soon as a target stimulus matching the active rule appears." },
  { title: "Inhibitory Control", text: "Ignore non-matching stimuli. False alarms or missed targets cost one life — you have 5 lives per session." }
];

const ABOUT_TEXT = `Concentration Stamina is an advanced Continuous Performance Test (CPT) designed to evaluate sustained visual attention, working memory updating, and task-set switching under speed pressure. Originating from clinical neuropsychology and cognitive ergonomics, continuous stamina tests challenge the brain's executive control network to maintain high vigilance over extended sequences.

By requiring instantaneous categorization of incoming visual stimuli while periodically switching target rules, the drill trains cognitive flexibility, impulse suppression, and focus stability under fatigue.`;

const FAQ_ITEMS = [
  { q: "What is concentration stamina and why does it matter?", a: "Concentration stamina, or cognitive endurance, is your brain's capacity to sustain single-task engagement and accurate performance over extended periods without succumbing to fatigue or distraction. It is critical for high-demand professions, sports performance, and academic settings where lapses cost significant consequences." },
  { q: "What is the vigilance decrement?", a: "The vigilance decrement is the progressive deterioration in signal detection performance during sustained monitoring tasks. Over time, your brain habituates to repetitive stimuli and your ability to detect rare targets drops. Mackworth's Clock Test (1948) was the first systematic study of this phenomenon. This drill tracks your personal decrement curve." },
  { q: "How can I test my concentration level online?", a: "This free online concentration test measures your target discrimination accuracy and response consistency over an extended session. It tracks when and how sharply your accuracy drops relative to your peak early-session performance, giving you a real-time vigilance curve as your cognitive endurance metric." },
  { q: "Why does focus deteriorate during long study sessions?", a: "Mental fatigue depletes glucose and neurotransmitter resources in the prefrontal cortex, the brain region responsible for executive control and target engagement. Once these resources are taxed, your attentional gate weakens, letting irrelevant stimuli through and reducing your discrimination accuracy — this is exactly what this drill quantifies." },
  { q: "How do athletes train mental stamina?", a: "Elite athletes use concentration grids, target discrimination drills, and sustained attention tasks to strengthen their mental endurance. The goal is to push the threshold at which vigilance decrement begins, allowing athletes to maintain focus and decision accuracy during the final minutes of high-pressure competition." },
  { q: "What does target discrimination measure in cognitive tests?", a: "Target discrimination measures your ability to correctly identify and respond to specific target stimuli while ignoring non-target distractors in a rapid stream of stimuli. It requires both perceptual speed (detecting the target) and response inhibition (ignoring the distractors), both of which degrade under prolonged cognitive load." },
  { q: "How long can the average person concentrate without a break?", a: "Research suggests the average adult can maintain intense focused concentration for 20-45 minutes before cognitive performance begins to noticeably decline. Elite performers (surgeons, air traffic controllers, pilots) achieve 90+ minutes through specific training protocols and planned micro-rest cycles." },
  { q: "What is a good score on a concentration stamina test?", a: "A strong performance means maintaining above 90% accuracy throughout the full session with minimal decrement. If your accuracy falls below 80% in the final third of the drill compared to your opening accuracy, your concentration stamina has significant room for improvement through regular practice." },
  { q: "Is this focus endurance test suitable for students and gamers?", a: "Absolutely. Students preparing for long exams, competitive gamers who need sustained accuracy in extended match sessions, and anyone whose work demands prolonged focus will find this drill directly applicable. Regular practice directly translates to better late-session performance." },
  { q: "Is this concentration stamina test free?", a: "Yes. This drill is completely free on SkillDrills with no sign-up, no downloads, and no paywalls. It runs entirely in your web browser and works on both desktop and mobile devices." }
];

const RELATED_DRILLS = [
  { id: "concentration-grid", name: "Concentration Grid", cat: "Focus", desc: "Scan and tap sequential numbers on expanding grid matrices.", href: "/drills/cognitive/focus/concentration-grid" },
  { id: "rsvp-reader", name: "RSVP Speed Reader", cat: "Processing Speed", desc: "Process rapid serial visual presentation text streams.", href: "/drills/cognitive/processing-speed/rsvp-reader" },
  { id: "divided-attention", name: "Divided Attention", cat: "Attention", desc: "Track dual independent target streams and number matches simultaneously.", href: "/drills/cognitive/attention/divided-attention" },
  { id: "multi-tasking", name: "Multi-Tasking", cat: "Attention", desc: "Track dual independent target streams under speed pressure.", href: "/drills/cognitive/attention/multi-tasking" },
  { id: "distraction-fighter", name: "Distraction Fighter", cat: "Focus", desc: "Filter out high-interference Stroop visual distractors.", href: "/drills/cognitive/focus/distraction-fighter" },
  { id: "reaction-time", name: "Reaction Time", cat: "Processing Speed", desc: "Train choice reaction speed and visual reflex latency.", href: "/drills/cognitive/processing-speed/reaction-time" }
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ConcentrationStaminaClient() {
  const [phase, setPhase] = useState('start'); // 'start' | 'countdown' | 'playing' | 'ended'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Gameplay State
  const [currentStim, setCurrentStim] = useState('');
  const [activeRule, setActiveRule] = useState('VOWELS');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(DRILL_DURATION);
  const [countdownValue, setCountdownValue] = useState(3);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Stats & Storage
  const [bestScore, setBestScore] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);

  // Results
  const [endSummary, setEndSummary] = useState(null);

  // Refs
  const containerRef = useRef(null);
  const clockTimerRef = useRef(null);
  const ruleTimerRef = useRef(null);
  const stimTimerRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  const gameActiveRef = useRef(false);
  const phaseRef = useRef('start');

  const scoreRef = useRef(0);
  const timeLeftRef = useRef(DRILL_DURATION);
  const levelRef = useRef(1);
  const maxLevelRef = useRef(1);
  const livesRef = useRef(5);

  const activeRuleRef = useRef('VOWELS');
  const currentStimRef = useRef('');
  const isTargetRef = useRef(false);
  const hasActedRef = useRef(false);

  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const falseAlarmsRef = useRef(0);

  // Check window size
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
        setIsPortrait(window.innerHeight > window.innerWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);

    const saved = getSavedData();
    setBestScore(saved.bestScore);
    setBestLevel(saved.bestLevel);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('fullscreenchange', handleFsChange);
      clearAllTimers();
    };
  }, []);

  const clearAllTimers = useCallback(() => {
    if (clockTimerRef.current) clearInterval(clockTimerRef.current);
    if (ruleTimerRef.current) clearInterval(ruleTimerRef.current);
    if (stimTimerRef.current) clearTimeout(stimTimerRef.current);
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
  }, []);

  const { flashes, triggerFlash } = useDrillFlash();

  const getLevelConfig = (currentLvl) => {
    const p = getDifficultyProgress(currentLvl);
    return {
      displaySpeed: Math.max(260, Math.round(1100 - p * 840)),
      intervalSpeed: Math.max(50, Math.round(150 - p * 100)),
      targetRatio: Math.min(0.48, 0.30 + p * 0.18),
    };
  };

  const endGame = useCallback(() => {
    if (phaseRef.current === 'ended') return;
    phaseRef.current = 'ended';
    setPhase('ended');
    gameActiveRef.current = false;
    clearAllTimers();

    drillAudio.playSessionEnd();

    const totalActions = hitsRef.current + falseAlarmsRef.current + missesRef.current;
    const accuracyVal = totalActions > 0 ? Math.round((hitsRef.current / totalActions) * 100) : 100;
    const finalScore = scoreRef.current;
    const peakLevel = maxLevelRef.current;

    const prev = getSavedData();
    const isNewBest = finalScore > prev.bestScore;
    const updated = {
      bestScore: Math.max(prev.bestScore, finalScore),
      bestLevel: Math.max(prev.bestLevel, peakLevel),
      totalSessions: prev.totalSessions + 1
    };
    saveData(updated);

    setBestScore(updated.bestScore);
    setBestLevel(updated.bestLevel);

    setEndSummary({
      score: finalScore,
      accuracy: accuracyVal,
      peakLevel,
      isNewBest
    });
  }, [clearAllTimers]);

  const spawnStimulus = useCallback(() => {
    if (phaseRef.current !== 'playing') return;
    if (stimTimerRef.current) clearTimeout(stimTimerRef.current);

    hasActedRef.current = false;
    const config = getLevelConfig(levelRef.current);
    const isTarget = Math.random() < config.targetRatio;
    isTargetRef.current = isTarget;

    let stim = '';
    if (activeRuleRef.current === 'VOWELS') {
      stim = isTarget
        ? DATA_SETS.VOWELS[Math.floor(Math.random() * DATA_SETS.VOWELS.length)]
        : DATA_SETS.CONSONANTS[Math.floor(Math.random() * DATA_SETS.CONSONANTS.length)];
    } else {
      stim = isTarget
        ? DATA_SETS.PRIMES[Math.floor(Math.random() * DATA_SETS.PRIMES.length)]
        : DATA_SETS.NON_PRIMES[Math.floor(Math.random() * DATA_SETS.NON_PRIMES.length)];
    }

    currentStimRef.current = stim;
    setCurrentStim(stim);

    stimTimerRef.current = setTimeout(() => {
      if (phaseRef.current === 'playing') {
        if (!hasActedRef.current && isTargetRef.current) {
          // Missed a target stimulus
          drillAudio.playPenalty();
          triggerFlash('red');
          missesRef.current += 1;
          livesRef.current = Math.max(0, livesRef.current - 1);
          setLives(livesRef.current);
          if (livesRef.current <= 0) {
            endGame();
            return;
          }
        }

        setCurrentStim('');
        stimTimerRef.current = setTimeout(() => {
          if (phaseRef.current === 'playing') spawnStimulus();
        }, config.intervalSpeed);
      }
    }, config.displaySpeed);
  }, [endGame, triggerFlash]);

  const handleInteraction = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (phaseRef.current !== 'playing' || hasActedRef.current || !currentStimRef.current) return;

    hasActedRef.current = true;

    if (isTargetRef.current) {
      // Hit target
      drillAudio.playHit();
      hitsRef.current += 1;

      scoreRef.current += POINTS_PER_HIT;
      setScore(scoreRef.current);

      const newLevel = Math.floor(scoreRef.current / POINTS_PER_LEVEL) + 1;
      levelRef.current = newLevel;
      setLevel(newLevel);
      if (newLevel > maxLevelRef.current) {
        maxLevelRef.current = newLevel;
      }
    } else {
      // False alarm (wrong target)
      drillAudio.playPenalty();
      triggerFlash('red');
      falseAlarmsRef.current += 1;
      livesRef.current = Math.max(0, livesRef.current - 1);
      setLives(livesRef.current);
      if (livesRef.current <= 0) {
        endGame();
        return;
      }
    }

    if (stimTimerRef.current) clearTimeout(stimTimerRef.current);
    setCurrentStim('');

    stimTimerRef.current = setTimeout(() => {
      if (phaseRef.current === 'playing') spawnStimulus();
    }, 120);
  }, [endGame, spawnStimulus, triggerFlash]);

  // Keyboard spacebar listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.code === 'Space' || e.code === 'Enter') && phaseRef.current === 'playing') {
        handleInteraction(e);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInteraction]);

  const handleCountdownComplete = useCallback(() => {
    setPhase('playing');
    phaseRef.current = 'playing';
    gameActiveRef.current = true;

    // Clock Interval
    clockTimerRef.current = setInterval(() => {
      timeLeftRef.current = Math.max(0, timeLeftRef.current - 0.1);
      setTimeRemaining(timeLeftRef.current);
      if (timeLeftRef.current <= 0) {
        endGame();
      }
    }, 100);

    // Rule Switcher (Every 10 seconds)
    ruleTimerRef.current = setInterval(() => {
      if (phaseRef.current !== 'playing') return;
      drillAudio.playHit();
      const nextRule = activeRuleRef.current === 'VOWELS' ? 'PRIMES' : 'VOWELS';
      activeRuleRef.current = nextRule;
      setActiveRule(nextRule);
    }, 10000);

    spawnStimulus();
  }, [endGame, spawnStimulus]);

  const enterDrill = useCallback(async () => {
    if (containerRef.current && !document.fullscreenElement) {
      try { await containerRef.current.requestFullscreen(); } catch (e) {}
    }

    drillAudio.init();

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    clearAllTimers();

    const saved = getSavedData();
    const startLevel = getStartLevel(saved.bestLevel || 1);
    levelRef.current = startLevel;
    maxLevelRef.current = startLevel;

    scoreRef.current = 0;
    timeLeftRef.current = DRILL_DURATION;
    livesRef.current = 5;
    hitsRef.current = 0;
    missesRef.current = 0;
    falseAlarmsRef.current = 0;
    activeRuleRef.current = 'VOWELS';

    setScore(0);
    setLives(5);
    setLevel(startLevel);
    setTimeRemaining(DRILL_DURATION);
    setActiveRule('VOWELS');
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
  }, [clearAllTimers, handleCountdownComplete]);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    clearAllTimers();
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    phaseRef.current = 'start';
    setPhase('start');
  }, [clearAllTimers]);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: phase === 'playing' || phase === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  const gradeInfo = endSummary ? getFpsScoreGrade(endSummary.score, ELITE_SCORE) : null;

  const shareResult = useCallback(async () => {
    if (!endSummary || !gradeInfo) return;
    const url = 'https://skilldrills.online/drills/cognitive/attention/concentration-stamina';
    try {
      const canvas = generateShareCard({
        score: endSummary.score,
        bestScore,
        accuracy: endSummary.accuracy,
        rating: { letter: gradeInfo.grade, label: gradeInfo.label, emoji: '🧠' },
        newBest: endSummary.isNewBest,
        drillName: 'Concentration Stamina',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🧠 I scored ${endSummary.score} PTS (Level ${endSummary.peakLevel}) on Concentration Stamina! Accuracy: ${endSummary.accuracy}%. Practice free cognitive focus drills at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'Concentration Stamina Score', text, url }).catch(() => {});
      }
    }
  }, [endSummary, gradeInfo, bestScore]);

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
            <span className="text-indigo-400 font-medium">Concentration Stamina</span>
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

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
            CONCENTRATION STAMINA
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Continuous Category Rule Switching & Inhibitory Control
          </p>
        </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
        <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
            <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">{score}</div>
          </div>
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
            <div className={`text-lg sm:text-xl font-black tabular-nums ${timeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {Math.ceil(timeRemaining)}s
            </div>
          </div>
          <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Level</div>
            <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">L{level}</div>
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
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Screen Flashes (Reference vignette style) */}
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

              {/* Active Rule - Centered at Top */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <div className="flex items-center gap-2 bg-indigo-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-indigo-500/30 shadow-lg">
                  <span className="text-xs font-bold text-indigo-300">Rule:</span>
                  <span className="text-xs sm:text-sm font-black text-white">{activeRule === 'VOWELS' ? 'VOWELS (A E I O U)' : 'PRIMES (2 3 5 7)'}</span>
                </div>
              </div>

              {/* Time - Top Right */}
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time</p>
                <p className={`text-2xl sm:text-3xl font-black tabular-nums leading-tight ${timeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{Math.ceil(timeRemaining)}s</p>
              </div>
            </>
          )}

          {/* START CARD */}
          {phase === 'start' && (
            <FpsStartCard
              icon={Brain}
              accent="indigo"
              title="Concentration Stamina"
              subtitle="Category Rule Switching CPT"
              rules={[
                { icon: Zap, accent: 'emerald', title: 'Dynamic Rule Shifts (10s)', text: 'Category rule shifts between VOWELS and PRIMES every 10 seconds' },
                { icon: Target, accent: 'red', title: 'Impulse Control Penalty', text: 'Tapping invalid targets or missing valid targets loses lives' },
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* PLAYING CANVAS/SURFACE */}
          {phase === 'playing' && (
            <div
              onPointerDown={handleInteraction}
              className="flex-1 w-full h-full flex flex-col items-center justify-center cursor-pointer z-20 touch-none"
            >
              {currentStim ? (
                <div className="text-8xl sm:text-9xl font-mono font-black tracking-widest text-white drop-shadow-[0_0_35px_rgba(99,102,241,0.6)]">
                  {currentStim}
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 animate-spin" />
              )}
            </div>
          )}

          {/* RESULT CARD OVERLAY (Reference drill optimization) */}
          {phase === 'ended' && endSummary && gradeInfo && (
            <div className="absolute inset-0 z-50 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              {/* Left 36% Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(99,102,241,.12), transparent 70%)' }}>
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

              {/* Right Stats & Actions Panel */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
                
                {/* 3 Stat Tiles */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{endSummary.accuracy}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Accuracy</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{lives}/5</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Lives Left</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">Lv. {endSummary.peakLevel}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Level</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-indigo-500 to-cyan-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
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
          title="About Concentration Stamina"
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
                <p className="text-xs text-gray-300 leading-relaxed">Students preparing for long exams, competitive gamers who need consistent accuracy deep into matches, and professionals in high-vigilance roles who must sustain focus for extended periods.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                  <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">Sustained attention, target discrimination, vigilance under fatigue, and resistance to the vigilance decrement over long sessions.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Repeat className="w-3.5 h-3.5 text-white" /></div>
                  <h5 className="text-xs font-bold text-white">Cognitive Flexibility</h5>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">Every 10-second rule switch between VOWELS and PRIMES forces you to re-categorize stimuli on the fly, training rapid task-set switching.</p>
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

        {/* RELATED COGNITIVE DRILLS (6 CARDS) */}
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
                className="group bg-[#0c0c16] border border-white/5 hover:border-indigo-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                  <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">{drill.name}</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                </div>
                <div className="text-[10px] font-bold text-slate-500 group-hover:text-indigo-400 mt-3 flex items-center gap-1 transition-colors">
                  Train Drill <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        )}
      </main>

      {/* FOOTER */}
      {!isFullscreen && <DrillFooter />}
    </div>
  );
}