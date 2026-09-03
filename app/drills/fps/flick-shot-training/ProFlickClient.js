'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight,
  Eye, Flame, RefreshCw, Target,
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, ZapOff,
  Share2, Users, LogOut, Award, Crosshair
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { useDrillSensitivity } from '../../../../lib/drillSensitivity';
import { drillFlash } from '../../../../lib/drillFlash';
import { drillTimeout } from '../../../../lib/drillTimeout';
import { drillPenalty } from '../../../../lib/drillPenalty';
import { getStartLevel, getDifficultyProgress, ramp } from '../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawPulseRing, drawTacticalTarget } from '../../../../lib/canvasFx';
import useUnexpectedExitGuard from '../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock — a run grows past this by performing
// Both of these were calibrated for a run that was hard-capped at 45s and so
// could never climb far past level 15. With an uncapped run the old 250 made
// difficulty outrun the player in roughly 30 hits, after which the rest of the
// session was unwinnable flailing — modelled hit rate collapsed to ~14%.
const POINTS_PER_LEVEL = 1800; // gradual climb: the player meets their ceiling, not a wall
const ELITE_SCORE = 50000; // 100% mark for letter grade — rescaled for open-ended runs

// The whole balance of the drill. The clock always drains at 1s/s on top of these.
// Tuned against this drill's spawn cadence — copied to a drill with a different
// hit rate they will either do nothing or make the run unkillable.
//
// TIME_PENALTY is OPT-IN, gated behind the "Time Penalty" toggle on /drills and
// off by default. Simulation showed a penalty this size inverts session length
// (elite 87s vs casual 100s): a strong player reaches high difficulty, where
// everyone misses, far sooner. Off, session length rises with skill as intended;
// on, it is a hard mode for players who find the drill too easy.
const TIME_PER_HIT = 0.6;
const TIME_PENALTY = 0.8;

// Bumped from _v2: sessions are no longer a fixed 45s, so scores from the old
// fixed-length build are not comparable to these and must not share a best.
const STORAGE_KEY = 'skilldrills_fps_flick_shot_v3';
const TARGET_COLOR = '#10b981'; // fixed tactical-sphere color — matches the drill's emerald identity

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


// Every parameter decays exponentially from its level-1 value toward a floor it
// never actually reaches, so difficulty keeps rising for as long as the player
// survives. The old `Math.max(floor, base - curve * range)` tuning clamped every
// one of these at p = 1 (level 15) — past that the drill stopped getting harder
// at all, which is what let a strong run continue indefinitely.
//
// The floors are chosen so each value at p = 1 matches the old tuning almost
// exactly (radius 13px, ttl 380ms, spawn 130/190ms, pad 3px): the first fifteen
// levels feel identical to before, and the curve simply continues afterwards.
// `ttl` is the terminal driver — it decays toward 90ms, far under human visual
// reaction (~200ms), so every run ends eventually no matter who is playing.
const getLevelConfig = (level, combo = 0) => {
  const p = getDifficultyProgress(level); // 0 at L1, 1 at L15, unbounded above

  // Live "heat": on top of your level, a hot streak keeps tightening things further.
  // Scales with the same tiers as the score combo multiplier (1.0x -> 3.0x maps to 0 -> 1 heat),
  // so max heat lines up with the max 3.0x multiplier at combo 50. A miss/timeout resets combo
  // to 0, which cools heat back to your level's baseline — never below it.
  // Applied as a proportion rather than a fixed subtraction: at high levels the old
  // flat "-150ms" wiped out the entire remaining margin in one step.
  const heat = (getComboMultiplier(combo) - 1) / 2;

  return {
    targetRadius:  Math.max(4, ramp(32,   7,   p) * (1 - heat * 0.30)),
    ttl:                       ramp(1300, 90,  p) * (1 - heat * 0.32),
    spawnDelayMin:             ramp(480,  20,  p) * (1 - heat * 0.31),
    spawnDelayMax:             ramp(680,  35,  p) * (1 - heat * 0.26),
    hitPad:                    ramp(12,   0.2, p) * (1 - heat * 0.67),
  };
};

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Target Hit", highlight: "+100 PTS", result: "× Combo × Level Multiplier" },
  { num: "2", text: "Combo System", highlight: "Up to 3.0x Multiplier", result: "Smaller, faster targets on a hot streak" },
  { num: "3", text: "Level Progression", highlight: "+1 Level / 250 PTS", result: "Radius & TTL shrink across 15 levels" },
  { num: "4", text: "Miss / Timeout / Idle", highlight: "Zero Penalties", result: "Combo resets, no time or score lost" }
];

const ABOUT_INTRO = [
  "Pro Flick Trainer isolates macro flicking and stopping deceleration, the two mechanical skills that decide most off-angle duels in tactical FPS games like CS2, Valorant, and Apex Legends. Enemies rarely appear where your crosshair already rests. Winning those engagements requires snapping your crosshair from a neutral position to an arbitrary target coordinate in a single, fluid motor movement, then killing the momentum before you overshoot.",
  "Each round spawns a single target at a random point inside your field of view — no pattern to memorize, no predictable rhythm, every flick starts cold, exactly like a real peek. Target radius and time-to-live both shrink as your score climbs, so the drill keeps pace with you instead of staying static once you've adapted to it."
];

const ABOUT_CARDS = [
  { icon: Users, iconBg: 'bg-blue-600', title: "Who Should Use This?", text: "CS2, Valorant, and Apex Legends players sharpening off-angle duels, plus any FPS player chasing first-shot accuracy without hardware acceleration." },
  { icon: TrendingUp, iconBg: 'bg-emerald-600', title: "Skills Improved", text: "Macro flicking, stopping deceleration, muscle memory, and first-shot accuracy under pressure." },
  { icon: Zap, iconBg: 'bg-purple-600', title: "Heat & Difficulty", text: "Targets shrink and speed up across 15 levels, plus a live combo 'heat' system that tightens further the longer your streak runs." },
];

const ABOUT_SECTIONS = [
  {
    icon: Activity,
    title: "Progressive Difficulty & The Heat System",
    paragraphs: [
      "The difficulty curve is intentionally progressive rather than linear. Early levels stay approachable so you can warm up your tracking and settle into a sensitivity, while the back half of the 15-level curve compresses fast, pushing target radius down to 13px and time-to-live down to 380ms — mirroring how real aim duels feel, forgiving early, unforgiving in the clutch rounds that matter.",
      "Layered on top is a live streak \"heat\" system: the longer your hit streak runs, the smaller and faster targets get in real time, independent of level, capping out at the same 50-combo streak that caps your score multiplier. A miss cools the heat back down to your current level's baseline — never below it — so the drill keeps escalating for as long as you keep performing."
    ]
  },
  {
    icon: Target,
    title: "What The Drill Tracks",
    paragraphs: [
      "Average flick time tells you how quickly your motor cortex converts a spotted target into a completed click. Max combo shows how consistently you chain first-shot hits without a miss breaking your rhythm — a better predictor of in-game performance than raw accuracy alone. Peak level reached tells you how far up the curve your mechanics held before target size and time-to-live outpaced your reaction speed — the curve has no ceiling, so every run ends here eventually."
    ]
  },
  {
    icon: Eye,
    title: "Runs Client-Side, Zero Install",
    paragraphs: [
      "Everything runs client-side with raw, unaccelerated mouse input captured through the Pointer Lock API, so there's no server lag distorting your times and nothing to install. Play in fullscreen with your in-game sensitivity dialed in through the universal cm/360 converter in the drills-hub session settings, and your results — best score, best combo, best level — persist locally so you can chart real progress over weeks of practice."
    ]
  }
];

const FAQ_ITEMS = [
  { q: "What is flick aim?", a: "Flick aim is the mechanical ability to quickly snap your crosshair to a target outside of your immediate focus area using a single, swift mouse movement." },
  { q: "How do I improve flick aim?", a: "Improve flick aim by practicing raw input drills that penalize misses and reward speed, forcing you to map the physical mousepad space to your monitor accurately." },
  { q: "What is a good flick accuracy?", a: "A good baseline flick accuracy is around 70%. Advanced players aim for 80%+, while professional esports players maintain 90%+ precision during high-speed target acquisition." },
  { q: "Does flick training help Valorant?", a: "Yes, Valorant heavily relies on crosshair placement and first-shot accuracy. Flick training improves your ability to react and snap to off-angle enemies instantly." },
  { q: "Does flick training help CS2?", a: "Absolutely. Counter-Strike requires immense micro and macro flicking, especially with AWPing or reacting to unexpected peekers." },
  { q: "Can flick aim be learned?", a: "Yes, flick aim is a physical motor skill. Through repetitive practice with zero hardware acceleration, you develop muscle memory that makes flicking subconscious." },
  { q: "How long should I practice?", a: "Aim for 15-20 minutes of dedicated flick aim training daily before playing competitive matches to optimize muscle memory retention without causing fatigue." },
  { q: "Should I use arm aim?", a: "For macro-flicks (large distances across the screen), arm aiming is generally preferred as it provides better stability and consistency on low sensitivities." },
  { q: "Should I use wrist aim?", a: "Wrist and fingertip aiming should be used for micro-flicks and fine adjustments once your arm brings the crosshair near the target." },
  { q: "How important is sensitivity?", a: "Sensitivity is crucial. You must find a consistent sensitivity (eDPI) and stick to it so your brain can properly map physical hand movement to virtual crosshair movement." },
  { q: "Can aim trainers improve rank?", a: "Yes, aim trainers isolate mechanical flaws. By improving your raw mechanical skill, you win more aim duels, which naturally translates to ranking up." },
  { q: "What is target acquisition?", a: "Target acquisition is the combined cognitive and physical process of visually locating an enemy and moving your crosshair onto them." },
  { q: "What is snap aiming?", a: "Snap aiming is another term for flicking. It emphasizes the fast, abrupt 'snapping' motion of the crosshair onto a target." },
  { q: "Why do I overshoot targets?", a: "Overshooting usually means your sensitivity is too high, or you haven't built enough stopping power (deceleration control) in your wrist." },
  { q: "How do pro players train aim?", a: "Pros use a combination of dedicated aim trainers (like this one), in-game deathmatches, and routine warmup regimens to maintain peak mechanical precision." },
  { q: "How does the scoring system work?", a: "Hits grant base points multiplied by your combo multiplier and level multiplier. Misses and timeouts reset your combo multiplier." },
  { q: "Does the drill get harder while I'm on a streak?", a: "Yes. Beyond the 15-level curve, a live streak 'heat' system shrinks targets and speeds up spawns the longer your hit streak runs, capping out at the same 50-combo streak that maxes your score multiplier. A miss cools the heat back to your level's baseline, so a hot run never gets easier to sustain." }
];

const RELATED_DRILLS = [
  { id: "180-degree-awareness", name: "180° Awareness Pro", cat: "FPS Awareness", desc: "Macro flicks under a forced 180-degree turn.", href: "/drills/fps/180-degree-awareness" },
  { id: "target-acquisition", name: "Target Acquisition Pro", cat: "FPS Precision", desc: "Visual discrimination and click timing under pressure.", href: "/drills/fps/target-acquisition" },
  { id: "recoil-control", name: "Recoil Control Pro", cat: "FPS Recoil", desc: "Sustained motor compensation against a moving target.", href: "/drills/fps/recoil-control" },
  { id: "micro-correction-precision", name: "Micro Flicks", cat: "FPS Precision", desc: "Tight-angle crosshair corrections after the initial flick.", href: "/drills/fps/micro-correction-precision" },
  { id: "target-switching-swarm", name: "Target Switching Swarm", cat: "FPS Multi-Kill", desc: "Rapid multi-target switching under time pressure.", href: "/drills/fps/target-switching-swarm" },
  { id: "strafe-tracking", name: "Strafe Tracking", cat: "FPS Tracking", desc: "Smooth pursuit against erratic horizontal movement.", href: "/drills/fps/strafe-tracking" }
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ProFlickClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  const universalSens = useDrillSensitivity();
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [flashes, setFlashes] = useState([]);

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [uiAccuracy, setUiAccuracy] = useState(100);
  const [bestScore, setBestScore] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [isNewBest, setIsNewBest] = useState(false);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, successfulHits: 0, missedClicks: 0, idleClicks: 0,
    timeouts: 0, avgFlickMs: 0, maxCombo: 0, finalLevel: 1, grade: null
  });

  // DOM & Engine Refs
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(DRILL_DURATION);
  const gameActiveRef = useRef(false);
  const startingRef = useRef(false);
  const countdownTimeoutsRef = useRef([]);
  const backdropCacheRef = useRef(null);
  const bestLevelRunRef = useRef(1);

  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    target: { active: false, x: 0, y: 0, radius: 32, spawnTime: 0, ttl: 1300, pulseSeed: 0.5 },
    score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION, nextSpawnTime: 0,
    successfulHits: 0, missedClicks: 0, idleClicks: 0, timeouts: 0, totalActions: 0,
    flickTimes: [], maxCombo: 0, particles: [], hitMarkers: [], hitRings: [], screenShake: 0,
    logicalWidth: 800, logicalHeight: 450
  });

  const triggerFlash = useCallback(() => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  // Touch Device Detection & Initial Storage Loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      setPenaltyEnabled(drillPenalty.isEnabled());
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);

      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestCombo(saved.bestCombo || 0);
      setBestLevel(saved.bestLevel || 1);
    }
  }, []);

  // Timeout Cleanup on Unmount
  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    startingRef.current = false;

    setIsFullscreen(false);
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    setGameState('start');
  }, []);

  // Stop the drill if the player leaves any way other than the in-app Exit
  // button (back gesture, tab switch, Esc) instead of running invisibly.
  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  const resumeDrill = useCallback(async () => {
    setIsFullscreen(true);
    if (canvasRef.current && !document.pointerLockElement) {
      try { await canvasRef.current.requestPointerLock(); } catch (e) {}
    }
  }, []);

  const spawnTarget = useCallback((time, width, height, currentLevel, currentCombo) => {
    const e = engine.current;
    const config = getLevelConfig(currentLevel, currentCombo);
    const padding = Math.max(config.targetRadius + 15, 40);

    const spawnX = padding + Math.random() * (width - padding * 2);
    const spawnY = padding + Math.random() * (height - padding * 2);

    e.target = {
      active: true,
      x: spawnX,
      y: spawnY,
      radius: config.targetRadius,
      spawnTime: time,
      ttl: config.ttl,
      pulseSeed: Math.random()
    };

    drillAudio.playBeep(580 + Math.random() * 200, 'triangle', 0.05);
  }, []);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const createHitMarker = (x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  };

  const createHitRing = (x, y, radius, color) => {
    engine.current.hitRings.push({ x, y, radius, life: 1.0, color });
  };

  // End Game Management
  const endGame = useCallback(() => {
    gameActiveRef.current = false;
    startingRef.current = false;
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const totalAttempts = e.successfulHits + e.missedClicks + e.idleClicks + e.timeouts;
    const finalAccuracy = totalAttempts > 0 ? Math.round((e.successfulHits / totalAttempts) * 100) : 0;
    const avgFlickMs = e.flickTimes.length > 0 
      ? Math.round(e.flickTimes.reduce((a, b) => a + b, 0) / e.flickTimes.length) 
      : 0;

    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: finalAccuracy, successfulHits: e.successfulHits, missedClicks: e.missedClicks,
      idleClicks: e.idleClicks, timeouts: e.timeouts, avgFlickMs, maxCombo: e.maxCombo,
      finalLevel: Math.floor(e.level), grade
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const runBestLevel = Math.max(prevSaved.bestLevel, Math.floor(bestLevelRunRef.current));
    const updatedData = {
      bestScore: Math.max(prevSaved.bestScore, e.score),
      bestCombo: Math.max(prevSaved.bestCombo, e.maxCombo),
      bestLevel: runBestLevel,
      totalSessions: (prevSaved.totalSessions || 0) + 1
    };
    saveData(updatedData);

    setBestScore(updatedData.bestScore);
    setBestCombo(updatedData.bestCombo);
    setBestLevel(updatedData.bestLevel);

    drillAudio.playSessionEnd();
  }, []);

  // Enter Drill (Start Countdown -> Playing)
  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];

    drillAudio.init();

    setIsNewBest(false);
    setUiScore(0);
    setUiTimeLeft(DRILL_DURATION);
    setUiAccuracy(100);
    lastTimeRef.current = DRILL_DURATION;

    const saved = getSavedData();
    const startLevel = getStartLevel(); // always 1 — difficulty is never persisted
    bestLevelRunRef.current = startLevel;

    setAnalytics({
      accuracy: 100, successfulHits: 0, missedClicks: 0, idleClicks: 0,
      timeouts: 0, avgFlickMs: 0, maxCombo: 0, finalLevel: startLevel, grade: null
    });

    const w = engine.current.logicalWidth || 800;
    const h = engine.current.logicalHeight || 450;

    engine.current = {
      crosshair: { ...engine.current.crosshair },
      target: { active: false, x: 0, y: 0, radius: 32, spawnTime: 0, ttl: 1300, pulseSeed: 0.5 },
      score: 0, level: startLevel, combo: 0, timeLeft: DRILL_DURATION,
      nextSpawnTime: performance.now() + 400, successfulHits: 0, missedClicks: 0,
      idleClicks: 0, timeouts: 0, totalActions: 0, flickTimes: [], maxCombo: 0,
      particles: [], hitMarkers: [], hitRings: [], screenShake: 0, logicalWidth: w, logicalHeight: h
    };

    setIsFullscreen(true);

    setGameState('countdown');
    setCountdownValue(3);
    drillAudio.playCountdownTick();

    const t1 = setTimeout(() => { setCountdownValue(2); drillAudio.playCountdownTick(); }, 700);
    const t2 = setTimeout(() => { setCountdownValue(1); drillAudio.playCountdownTick(); }, 1400);
    const t3 = setTimeout(() => { setCountdownValue('GO'); drillAudio.playGo(); }, 2100);
    const t4 = setTimeout(() => {
      gameActiveRef.current = true;
      startingRef.current = false;
      setGameState('playing');
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(() => {});
      }
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, []);

  useEffect(() => {
    const handlePointerLockChange = () => setPointerLocked(document.pointerLockElement === canvasRef.current);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameState !== 'playing' || !pointerLocked || !canvasRef.current) return;
      const w = engine.current.logicalWidth;
      const h = engine.current.logicalHeight;
      const sens = universalSens;
      engine.current.crosshair.x = Math.max(0, Math.min(w, engine.current.crosshair.x + e.movementX * sens));
      engine.current.crosshair.y = Math.max(0, Math.min(h, engine.current.crosshair.y + e.movementY * sens));
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (!containerRef.current || !containerRef.current.contains(e.target)) return;

      if (gameState === 'playing') {
        if (!pointerLocked && canvasRef.current) {
          resumeDrill();
        } else if (pointerLocked) {
          const eRef = engine.current;
          const ch = eRef.crosshair;
          const tgt = eRef.target;
          const config = getLevelConfig(eRef.level, eRef.combo);

          eRef.totalActions++;

          if (!tgt.active) {
            eRef.idleClicks++;
            if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
            eRef.combo = 0;
            eRef.screenShake = 6;
            triggerFlash();
            drillAudio.playPenalty();
          } else {
            const dist = Math.hypot(ch.x - tgt.x, ch.y - tgt.y);

            if (dist <= tgt.radius + config.hitPad) {
              eRef.successfulHits++;
              eRef.combo++;
              if (eRef.combo > eRef.maxCombo) eRef.maxCombo = eRef.combo;

              const flickMs = performance.now() - tgt.spawnTime;
              eRef.flickTimes.push(flickMs);

              const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5;
              eRef.score += Math.round(100 * getComboMultiplier(eRef.combo) * levelMult);

              // A clean hit buys clock. Nothing ever takes clock away: a miss simply
              // earns nothing while the timer keeps draining, which keeps the drill's
              // long-standing "no negative score, no negative time" contract intact.
              eRef.timeLeft += TIME_PER_HIT;

              // Continuous level — no Math.floor, so difficulty rises with every point
              // instead of stepping at each 250-point threshold, and no combo bonus
              // level, which used to add a whole level every 4th consecutive hit. Both
              // were sudden jumps. Combo still drives the score multiplier and heat.
              const rawLevel = (eRef.score / POINTS_PER_LEVEL) + 1;
              eRef.level = Math.max(eRef.level, rawLevel);
              bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);

              drillAudio.playHit();
              createExplosion(tgt.x, tgt.y, TARGET_COLOR);
              createHitRing(tgt.x, tgt.y, tgt.radius, TARGET_COLOR);
              createHitMarker(ch.x, ch.y);
              setUiScore(eRef.score);

              tgt.active = false;
              const nextConfig = getLevelConfig(eRef.level, eRef.combo);
              eRef.nextSpawnTime = performance.now() + (nextConfig.spawnDelayMin + Math.random() * (nextConfig.spawnDelayMax - nextConfig.spawnDelayMin));
            } else {
              eRef.missedClicks++;
              if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
              eRef.combo = 0;
              eRef.screenShake = 6;
              triggerFlash();
              drillAudio.playPenalty();
              createExplosion(ch.x, ch.y, '#ef4444');
            }
          }

          const currentTotal = eRef.successfulHits + eRef.missedClicks + eRef.idleClicks + eRef.timeouts;
          if (currentTotal > 0) {
            setUiAccuracy(Math.round((eRef.successfulHits / currentTotal) * 100));
          }
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [gameState, pointerLocked, universalSens, triggerFlash, resumeDrill]);

  useEffect(() => {
    const cvs = canvasRef.current;
    const container = containerRef.current;
    if (!cvs || !container) return;
    const ctx = cvs.getContext('2d', { alpha: false });

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          const dpr = getCanvasDpr();
          cvs.width = Math.ceil(width * dpr);
          cvs.height = Math.ceil(height * dpr);
          engine.current.logicalWidth = width;
          engine.current.logicalHeight = height;

          backdropCacheRef.current = createBackdropCache(width, height, (bCtx, w, h) => {
            bCtx.fillStyle = '#050508';
            bCtx.fillRect(0, 0, w, h);

            bCtx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            bCtx.lineWidth = 1;
            const gridSize = 40;
            for (let x = 0; x < w; x += gridSize) {
              bCtx.beginPath(); bCtx.moveTo(x, 0); bCtx.lineTo(x, h); bCtx.stroke();
            }
            for (let y = 0; y < h; y += gridSize) {
              bCtx.beginPath(); bCtx.moveTo(0, y); bCtx.lineTo(w, y); bCtx.stroke();
            }
          });

          if (!engine.current.crosshair.initialized) {
            engine.current.crosshair.x = width / 2;
            engine.current.crosshair.y = height / 2;
            engine.current.crosshair.initialized = true;
          }
        }
      }
    });
    resizeObserver.observe(container);

    let lastTime = performance.now();

    const loop = (time) => {
      if (isIdleFrameSkippable(gameState === 'playing', time, lastTime)) {
        animationRef.current = requestAnimationFrame(loop);
        return;
      }
      const deltaTimeMs = time - lastTime;
      lastTime = time;
      const dt = Math.min(deltaTimeMs / 1000, 0.1);
      const e = engine.current;
      const dpr = getCanvasDpr();
      const w = e.logicalWidth;
      const h = e.logicalHeight;

      if (gameState === 'playing' && pointerLocked) {
        if (e.timeLeft > 0) e.timeLeft -= dt;
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setUiTimeLeft(0);
          endGame();
          return;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
          setUiTimeLeft(intTime);
          lastTimeRef.current = intTime;
        }

        if (!e.target.active && time >= e.nextSpawnTime) {
          spawnTarget(time, w, h, e.level, e.combo);
        }

        if (e.target.active) {
          const tgt = e.target;
          const age = time - tgt.spawnTime;

          if (drillTimeout.isEnabled() && age >= tgt.ttl) {
            tgt.active = false;
            e.timeouts++;
            e.totalActions++;
            if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
            e.combo = 0;
            e.screenShake = 6;
            triggerFlash();
            drillAudio.playPenalty();
            createExplosion(tgt.x, tgt.y, '#ef4444');

            const nextConfig = getLevelConfig(e.level, e.combo);
            e.nextSpawnTime = time + (nextConfig.spawnDelayMin + Math.random() * (nextConfig.spawnDelayMax - nextConfig.spawnDelayMin));

            const currentTotal = e.successfulHits + e.missedClicks + e.idleClicks + e.timeouts;
            if (currentTotal > 0) {
              setUiAccuracy(Math.round((e.successfulHits / currentTotal) * 100));
            }
          }
        }
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      if (e.screenShake > 0) {
        const sx = (Math.random() - 0.5) * e.screenShake;
        const sy = (Math.random() - 0.5) * e.screenShake;
        ctx.translate(sx, sy);
        e.screenShake *= 0.85;
        if (e.screenShake < 0.5) e.screenShake = 0;
      }

      if (backdropCacheRef.current) {
        ctx.drawImage(backdropCacheRef.current, 0, 0, w, h);
      } else {
        ctx.fillStyle = '#050508';
        ctx.fillRect(0, 0, w, h);
      }

      if ((gameState === 'playing' || gameState === 'start') && e.target.active) {
        const tgt = e.target;
        const age = time - tgt.spawnTime;
        const progress = Math.min(1, age / tgt.ttl);
        const lifePercent = 1 - progress;

        drawPulseRing(ctx, tgt.x, tgt.y, tgt.radius, TARGET_COLOR, progress);

        drawTacticalTarget(ctx, tgt.x, tgt.y, tgt.radius, TARGET_COLOR);

        const ringColor = lifePercent > 0.5 ? TARGET_COLOR : (lifePercent > 0.25 ? '#eab308' : '#ef4444');
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(tgt.x, tgt.y, tgt.radius + 4 + (Math.max(0, lifePercent) * 10), 0, Math.PI * 2); ctx.stroke();
      }

      for (let i = e.hitRings.length - 1; i >= 0; i--) {
        const hr = e.hitRings[i];
        hr.life -= dt * 3.2;
        if (hr.life <= 0) { e.hitRings.splice(i, 1); continue; }
        const grown = hr.radius + (1 - hr.life) * 26;
        ctx.globalAlpha = hr.life * 0.8;
        ctx.strokeStyle = hr.color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(hr.x, hr.y, grown, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      ctx.lineWidth = 2.0;
      for (let i = e.hitMarkers.length - 1; i >= 0; i--) {
        const hm = e.hitMarkers[i];
        hm.life -= dt * 4.5;
        if (hm.life <= 0) { e.hitMarkers.splice(i, 1); continue; }
        ctx.globalAlpha = hm.life; ctx.strokeStyle = '#ffffff';
        const s = 6 + (1 - hm.life) * 8;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#10b981' : '#eab308';
        ctx.strokeStyle = activeColor;
        ctx.fillStyle = activeColor;

        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 14, 0, Math.PI * 2); ctx.stroke();

        ctx.lineWidth = 1.5;
        const gap = 5;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - 14); ctx.lineTo(ch.x, ch.y - gap);
        ctx.moveTo(ch.x, ch.y + 14); ctx.lineTo(ch.x, ch.y + gap);
        ctx.moveTo(ch.x - 14, ch.y); ctx.lineTo(ch.x - gap, ch.y);
        ctx.moveTo(ch.x + 14, ch.y); ctx.lineTo(ch.x + gap, ch.y);
        ctx.stroke();

        ctx.beginPath(); ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2); ctx.fill();
      }

      ctx.restore();
      if (gameState !== 'gameOver') {
        animationRef.current = requestAnimationFrame(loop);
      }
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, spawnTarget, endGame, triggerFlash]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/fps/flick-shot-training';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.maxCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Pro Flick Trainer',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Pro Flick Trainer! Accuracy: ${analytics.accuracy}%. Test your reflexes at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Pro Flick Trainer Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  const accuracy = gameState === 'gameOver' ? analytics.accuracy : uiAccuracy;

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              PRO FLICK TRAINER
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
                Flick Shot Trainer
              </span>
            </h1>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-white tabular-nums">{uiScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Accuracy</div>
              <div className="text-lg sm:text-xl font-black text-blue-400 tabular-nums">{accuracy}%</div>
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
          onContextMenu={(e) => { if (gameActiveRef.current) e.preventDefault(); }}
          className={`overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white border border-white/10 ${
            isFullscreen 
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#080811] rounded-none border-none flex flex-col items-center justify-center' 
              : 'w-full rounded-2xl bg-[#080811] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] relative overflow-hidden flex flex-col'
          }`}
          style={{ touchAction: gameActiveRef.current ? 'none' : 'auto' }}
        >
          {/* DOM Flash Overlay */}
          {flashes.map((f) => (
            <div key={f.id} className="fx-flash fx-flash-red" />
          ))}

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
                    drillAudio.setEnabled(!v);
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

          {/* PAUSE OVERLAY IF POINTER LOCK LOST DURING PLAY */}
          {gameState === 'playing' && !pointerLocked && (
            <div 
              className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center cursor-pointer"
              onClick={(e) => { 
                e.stopPropagation(); 
                resumeDrill();
              }}
            >
              <div className="text-center animate-pulse pointer-events-none">
                <AlertCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-1">Game Paused</h2>
                <p className="text-xs text-gray-300 font-medium">Click to resume — cursor lock will re-engage.</p>
              </div>
            </div>
          )}

          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked) resumeDrill(); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`} 
          />

          {/* START MODAL */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Crosshair}
              accent="emerald"
              title="Pro Flick Trainer"
              subtitle="Macro Flicking & Target Acquisition • Endless Levels"
              rules={[
                { icon: Target, accent: 'emerald', title: 'Objective', text: 'Snap & Click Targets' },
                { icon: AlertCircle, accent: 'red', title: 'Failure Rule', text: penaltyEnabled ? 'Miss / Timeout → Combo Reset, -0.8s' : 'Miss / Timeout → Combo Reset' },
              ]}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: Flame, label: 'Best Combo', value: `${bestCombo}x`, color: 'text-emerald-400', accent: 'emerald' },
                { icon: TrendingUp, label: 'Best Level', value: `Lv. ${bestLevel}`, color: 'text-blue-400', accent: 'blue' },
              ]}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" />
          )}

          {/* END SCREEN — universal card, shared by every drill */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="emerald"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { value: analytics.accuracy, suffix: '%', label: 'Accuracy' },
                { value: analytics.avgFlickMs, suffix: 'ms', label: 'Avg Flick' },
                { value: `${analytics.maxCombo}x`, label: 'Max Combo' },
                { value: `Lv. ${analytics.finalLevel}`, label: 'Peak Level' },
              ]}
              onPlayAgain={enterDrill}
              onShare={shareScore}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RULES_ITEMS.map((item, i) => (
                  <RuleItem key={i} num={item.num} text={item.text} highlight={item.highlight} result={item.result} />
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Pro Flick Trainer"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-red-400" /> What Is Flick Aim Training?
                  </h4>
                  {ABOUT_INTRO.map((para, i) => (
                    <p key={i} className={`text-sm leading-relaxed text-gray-300 ${i < ABOUT_INTRO.length - 1 ? 'mb-3' : ''}`}>{para}</p>
                  ))}
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {ABOUT_CARDS.map((card, i) => (
                    <div key={i} className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-7 h-7 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                          <card.icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <h5 className="text-xs font-bold text-white">{card.title}</h5>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{card.text}</p>
                    </div>
                  ))}
                </div>

                {ABOUT_SECTIONS.map((section, i) => (
                  <section key={i}>
                    <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <section.icon className="w-4 h-4 text-red-400" /> {section.title}
                    </h4>
                    {section.paragraphs.map((para, j) => (
                      <p key={j} className={`text-sm leading-relaxed text-gray-300 ${j < section.paragraphs.length - 1 ? 'mb-3' : ''}`}>{para}</p>
                    ))}
                  </section>
                ))}
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
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </DrillAccordion>
          </div>
        )}

        {/* ── RELATED FPS DRILLS ── */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 font-sans">
              Related FPS Drills
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

        {/* ── FOOTER ── */}
        {!isFullscreen && <DrillFooter />}

      </main>
    </div>
  );
}

// === Subcomponents ===
function RuleItem({ num, text, highlight = '', result }) {
  return (
    <div className="flex items-center gap-4 bg-black p-4 rounded-xl border border-white/10 shadow-sm font-sans">
      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0">{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-100 font-sans">
          {text}{highlight && <span className="font-black font-sans text-white"> {highlight}</span>}
        </p>
        <div className="text-xs font-black px-3 py-1.5 rounded-lg bg-[#050811] border border-white/10 text-white whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left">
          {result}
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  return (
    <div className="bg-[#05060b] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors font-sans">
      <h4 className="text-sm font-bold text-gray-200 mb-2">{q}</h4>
      <p className="text-xs text-gray-200 leading-relaxed">{a}</p>
    </div>
  );
}