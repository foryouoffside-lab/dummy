'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight, Crosshair,
  Eye, GraduationCap, RefreshCw, Target,
  Timer, TrendingUp, Trophy, Volume2, VolumeX,
  Flame, Share2, LogOut,
  Award, Shield, Users, Zap, ZapOff
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { drillFlash } from '../../../../lib/drillFlash';
import { drillTimeout } from '../../../../lib/drillTimeout';
import { drillPenalty } from '../../../../lib/drillPenalty';
import { getStartLevel, getDifficultyProgress, ramp } from '../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawPulseRing, drawTacticalTarget } from '../../../../lib/canvasFx';
import DrillFooter from '../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../components/drill/DrillResultCard';
import useUnexpectedExitGuard from '../../../../lib/useUnexpectedExitGuard';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_LEVEL = 1400; // 200 -> 1400 (7x)
const ELITE_SCORE = 54000; // 18000 -> 54000 (3x)
const TIME_PER_HIT = 0.4; // +0.2s on anchor, +0.2s on micro hit (+0.4s/cycle)
const TIME_PENALTY = 0.6; // opt-in on miss or timeout
const STORAGE_KEY = 'skilldrills_fps_micro_correction_v3';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0, ...JSON.parse(raw) };
    return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
  } catch (e) {
    return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

const getLevelConfig = (level, combo = 0) => {
  const p = getDifficultyProgress(level); // 0 at L1, 1 at L15, unbounded above
  const heat = (getComboMultiplier(combo) - 1) / 2;
  const anchorRadius = Math.max(10, ramp(24, 12, p) * (1 - heat * 0.15));
  const microRadius  = Math.max(5, ramp(10, 5.5, p) * (1 - heat * 0.20));
  return {
    anchorRadius,
    microRadius,
    ttl: Math.max(380, ramp(1800, 500, p) * (1 - heat * 0.25)),
    minDistance: ramp(55, 85, p),
    maxDistance: ramp(90, 145, p),
    anchorHitPad: Math.max(1.5, anchorRadius * (0.55 - 0.2 * Math.min(1, p))),
    microHitPad: Math.max(1.0, microRadius * (0.6 - 0.2 * Math.min(1, p))),
  };
};

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Hit Anchor Target", highlight: "+10 PTS (+0.2s)", result: "Unlocks Secondary Micro Target" },
  { num: "2", text: "Micro Target Hit", highlight: "Up To +585 PTS (+0.2s)", result: "Scaled By Precision × Combo" },
  { num: "3", text: "Level Progression", highlight: "+1 Level / 1400 PTS", result: "Continuous Adaptive Target Scaling" },
  { num: "4", text: "Miss / Timeout", highlight: "Failure Penalty", result: "Combo resets to 0 (-0.6s with Time Penalty enabled)" }
];

const ABOUT_INTRO = [
  "Micro-Correction Aiming is the precise, immediate adjustment of your crosshair position after your initial flick lands close to a target. It bridges the crucial gap between a fast flick and a perfect headshot, a mechanic heavily utilized by professional players in tactical shooters.",
  "By repeatedly training your deceleration control, you condition your wrist and fingers to stop the mouse smoothly and correct spatial errors instantly, preventing over-flicking and increasing first-bullet accuracy in high-stress gunfights."
];

const ABOUT_CARDS = [
  { icon: Users, iconBg: "bg-blue-600", title: "Who Should Use This?", text: "Valorant, CS2, and Rainbow Six Siege players refining headshot precision, plus any tactical shooter player working on flick-to-correction transitions." },
  { icon: TrendingUp, iconBg: "bg-cyan-600", title: "Skills Improved", text: "Deceleration control, micro-flick correction, target reacquisition speed, and first-bullet headshot accuracy under pressure." },
  { icon: Crosshair, iconBg: "bg-purple-600", title: "Anchor-To-Micro Mechanic", text: "Each cycle starts with an Anchor Target that unlocks a much smaller Micro Target nearby — landing the correction cleanly is what pays out major points." },
];

const ABOUT_SECTIONS = [
  {
    icon: Activity,
    title: "Continuous Dynamic Scaling",
    paragraphs: [
      "Target radius shrinks and time-to-live tightens smoothly with continuous level progression, training fine motor wrist and finger control for headshot accuracy in games like Valorant, CS2, and Rainbow Six Siege."
    ]
  },
  {
    icon: Target,
    title: "What The Drill Tracks",
    paragraphs: [
      "Average correction time measures how quickly you convert an anchor hit into a locked-on micro-target click. Precision score rates how close to dead-center each micro-target hit lands, translating into a rating from Acceptable Precision up to Pixel-Perfect Master."
    ]
  }
];

const FAQ_ITEMS = [
  { q: "What is a micro-correction in aiming?", a: "A micro-correction is a tiny, precise adjustment made to your crosshair position after your initial flick aim lands close to the target. It bridges the gap between a fast flick and a perfect headshot, which is critical in tactical shooters like Valorant and CS2." },
  { q: "How do I improve headshot accuracy?", a: "Improve headshot accuracy by practicing crosshair placement, training mouse deceleration to stop flicks cleanly, using micro-correction drills to refine your aim on tiny targets, and ensuring target confirmation before clicking." },
  { q: "Why do I overflick targets?", a: "Overflicking is caused by poor mouse deceleration control, tensing your muscles, or running an excessively high sensitivity. Training micro-correction helps build the motor control to stop the mouse exactly on target." },
  { q: "What is mouse deceleration?", a: "Mouse deceleration is the mechanical skill of stopping your mouse quickly and stably at the end of a swipe. Developing deceleration control prevents your crosshair from sliding past the enemy model." },
  { q: "How do pro Valorant players aim?", a: "Professional Valorant players aim by keeping their crosshair at head-height (crosshair placement), executing clean flicks close to the target, making immediate micro-corrections, and timing their clicks perfectly." },
  { q: "How do CS2 players train precision?", a: "CS2 players train precision using tactical aim drills, practicing counter-strafing timing, refining their crosshair micro-adjustments, and repeating click-timing patterns on static micro-targets." },
  { q: "Can micro-correction drills improve aim?", a: "Yes. Most players miss targets because their initial flick is slightly off. Micro-correction drills train the brain and hand muscles to automatically adjust and hit the target center, increasing hit consistency." },
  { q: "Why do I miss easy headshots?", a: "Missing headshots is usually due to clicking before your crosshair has fully stopped on the target's center (poor click-timing) or failing to correct a near-miss flick." },
  { q: "Why does missing or timing out reset my combo and how are penalties applied?", a: "By default, missing a shot or allowing a target to expire resets your combo multiplier without reducing your time or score. If you want a more punishing tactical challenge, you can enable Time Penalty in the session settings to deduct 0.6s per error." },
  { q: "What is target confirmation?", a: "Target confirmation is the cognitive split-second where your visual cortex registers that the crosshair is locked onto the target model before you trigger your index finger to click/shoot." },
  { q: "What is precision aiming?", a: "Precision aiming is the mechanical capacity to hit extremely small targets consistently. It depends on fine motor control of the wrist and fingers, low-friction mouse movements, and disciplined click timing." },
  { q: "How often should I train micro-corrections?", a: "We recommend training micro-corrections for 10–15 minutes daily as part of your FPS warm-up routine, or up to 30 minutes for a dedicated mechanical accuracy training session." },
  { q: "Can this improve flick accuracy?", a: "Yes. By training the deceleration and correction phase, your muscle memory learns to flick close and transition smoothly into a micro-flick adjustment rather than overshooting." },
  { q: "Does this help tactical shooters?", a: "Definitely. Tactical shooters like Valorant, CS2, Rainbow Six Siege, Spectre Divide, and FragPunk rely heavily on low-TTK headshots, making micro-adjustments the most common aiming mechanic in gunfights." },
  { q: "Is this aim trainer free?", a: "Yes, this Micro-Correction Precision Aim Trainer is 100% free, runs in any desktop browser using raw hardware pointer input, and contains no ads." },
  { q: "What skills does this drill improve?", a: "This drill improves micro-flicking adjustments, click timing, snap deceleration, target reacquisition speed, headshot precision, and consistency under pressure." }
];

const RELATED_DRILLS = [
  { id: "flick-shot-training", name: "Pro Flick Trainer", cat: "FPS Flicking", desc: "Snap to targets in time-attack mode with precision flicking.", href: "/drills/fps/flick-shot-training" },
  { id: "180-degree-awareness", name: "180° Awareness Pro", cat: "FPS Awareness", desc: "Macro flicks under a forced 180-degree turn.", href: "/drills/fps/180-degree-awareness" },
  { id: "recoil-control", name: "Recoil Control", cat: "FPS Recoil", desc: "Calibrate pulling pattern compensation for weapons.", href: "/drills/fps/recoil-control" },
  { id: "angle-hold-trainer", name: "Angle Hold Trainer", cat: "FPS Reaction", desc: "Test crosshair placement reaction speed on tight corners.", href: "/drills/fps/angle-hold-trainer" },
  { id: "instant-response", name: "Instant Response", cat: "FPS Reaction", desc: "Raw reaction speed against a fixed center-screen flash.", href: "/drills/fps/instant-response" },
  { id: "target-acquisition", name: "Target Acquisition", cat: "FPS Precision", desc: "Train rapid target identification and click timing.", href: "/drills/fps/target-acquisition" }
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function MicroCorrectionClient() {
  const [gameState, setGameState] = useState('start'); // start | countdown | playing | gameOver
  const [countdownValue, setCountdownValue] = useState(3);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  
  const [universalSens, setUniversalSens] = useState(1.0);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [level, setLevel] = useState(1);
  const [bestLevel, setBestLevel] = useState(1);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  const [flashes, setFlashes] = useState([]);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, successfulCycles: 0, missedClicks: 0, timeouts: 0, bestCombo: 0,
    avgCorrectionTime: 0, avgPrecisionScore: 0, microTargetAccuracy: 0,
    levelReached: 1, precisionRating: 'Acceptable Precision', consistencyScore: 0,
    grade: null
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(DRILL_DURATION);
  const lastAccuracyRef = useRef(100);
  const bestLevelRunRef = useRef(1);
  const backdropCacheRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  const startingRef = useRef(false);

  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    anchor: { active: false, x: 0, y: 0, radius: 24, age: 0, ttl: 1800 },
    micro: { active: false, x: 0, y: 0, radius: 10, age: 0, ttl: 1800 },
    level: 1, score: 0, timeLeft: DRILL_DURATION,
    totalClicks: 0, successfulHits: 0, missedClicks: 0, timeouts: 0, totalCycles: 0,
    combo: 0, bestCombo: 0, precisionScores: [], correctionTimes: [], totalMicroClicks: 0, microHits: 0,
    microSpawnTime: 0, particles: [], hitMarkers: [], screenShake: 0, logicalWidth: 0, logicalHeight: 0
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('microcorr_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
    } catch (e) {}

    const saved = getSavedData();
    setBestScore(saved.bestScore || 0);
    setBestCombo(saved.bestCombo || 0);
    setBestLevel(saved.bestLevel || 1);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      setPenaltyEnabled(drillPenalty.isEnabled());
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);
    }
  }, []);

  useEffect(() => {
    return () => countdownTimeoutsRef.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (gameState !== 'playing' && gameState !== 'countdown') {
      try { localStorage.setItem('microcorr_sens', universalSens.toString()); } catch (e) {}
    }
  }, [universalSens, gameState]);

  const triggerFlash = useCallback(() => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  const spawnAnchor = useCallback((width, height, currentLevel = engine.current.level, currentCombo = engine.current.combo) => {
    const e = engine.current;
    const cfg = getLevelConfig(currentLevel, currentCombo);
    const padding = 120;
    
    e.anchor.x = padding + Math.random() * (width - padding * 2);
    e.anchor.y = padding + Math.random() * (height - padding * 2);
    e.anchor.radius = cfg.anchorRadius;
    e.anchor.active = true;
    e.anchor.age = 0;
    e.anchor.ttl = cfg.ttl;
    e.micro.active = false;
  }, []);

  const spawnMicro = useCallback((anchorX, anchorY, width, height, currentLevel = engine.current.level, currentCombo = engine.current.combo) => {
    const e = engine.current;
    const cfg = getLevelConfig(currentLevel, currentCombo);
    const angle = Math.random() * Math.PI * 2;
    const distance = cfg.minDistance + Math.random() * (cfg.maxDistance - cfg.minDistance);
    
    let targetX = anchorX + Math.cos(angle) * distance;
    let targetY = anchorY + Math.sin(angle) * distance;

    const borderPadding = 60;
    targetX = Math.max(borderPadding, Math.min(width - borderPadding, targetX));
    targetY = Math.max(borderPadding, Math.min(height - borderPadding, targetY));

    e.micro.x = targetX;
    e.micro.y = targetY;
    e.micro.radius = cfg.microRadius;
    e.micro.active = true;
    e.micro.age = 0;
    e.micro.ttl = cfg.ttl;
  }, []);

  const createExplosion = useCallback((x, y, color) => {
    const e = engine.current;
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      e.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  }, []);

  const createHitMarker = useCallback((x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  }, []);

  const endGame = useCallback(() => {
    setGameState('gameOver');
    drillAudio.playSessionEnd();
    if (document.pointerLockElement) document.exitPointerLock();

    const e = engine.current;
    const finalAccuracy = e.totalClicks > 0 ? Math.round((e.successfulHits / e.totalClicks) * 100) : 100;
    const microAcc = e.totalMicroClicks > 0 ? Math.round((e.microHits / e.totalMicroClicks) * 100) : 0;
    const avgCorrTime = e.correctionTimes.length > 0
      ? Math.round(e.correctionTimes.reduce((a, b) => a + b, 0) / e.correctionTimes.length)
      : 0;
    const avgPrec = e.precisionScores.length > 0
      ? Math.round(e.precisionScores.reduce((a, b) => a + b, 0) / e.precisionScores.length)
      : 0;

    let precisionRating = 'Acceptable Precision';
    if (avgPrec > 85) precisionRating = 'Pixel-Perfect Master';
    else if (avgPrec > 70) precisionRating = 'High Precision';

    const peakLevel = Math.floor(bestLevelRunRef.current);
    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAccuracy(finalAccuracy);
    setAnalytics({
      accuracy: finalAccuracy,
      successfulCycles: e.totalCycles,
      missedClicks: e.missedClicks,
      timeouts: e.timeouts,
      bestCombo: e.bestCombo,
      avgCorrectionTime: avgCorrTime,
      avgPrecisionScore: avgPrec,
      microTargetAccuracy: microAcc,
      levelReached: peakLevel,
      precisionRating,
      consistencyScore: Math.max(0, 100 - (e.missedClicks * 8)),
      grade
    });

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const runBestLevel = Math.max(prevSaved.bestLevel, bestLevelRunRef.current);
    const updatedData = {
      bestScore: Math.max(prevSaved.bestScore, e.score),
      bestCombo: Math.max(prevSaved.bestCombo, e.bestCombo),
      bestLevel: runBestLevel,
      totalSessions: (prevSaved.totalSessions || 0) + 1
    };
    saveData(updatedData);

    setBestScore(updatedData.bestScore);
    setBestCombo(updatedData.bestCombo);
    setBestLevel(updatedData.bestLevel);
  }, []);

  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];

    drillAudio.init();

    setIsNewBest(false);
    setScore(0);
    setCombo(0);
    setAccuracy(100);
    setTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    lastAccuracyRef.current = 100;

    const startLevel = getStartLevel();
    bestLevelRunRef.current = startLevel;
    setLevel(startLevel);

    setAnalytics({
      accuracy: 100, successfulCycles: 0, missedClicks: 0, timeouts: 0, bestCombo: 0,
      avgCorrectionTime: 0, avgPrecisionScore: 0, microTargetAccuracy: 0,
      levelReached: startLevel, precisionRating: 'Acceptable Precision', consistencyScore: 0,
      grade: null
    });

    const w = engine.current.logicalWidth || 800;
    const h = engine.current.logicalHeight || 450;

    engine.current = {
      crosshair: { ...engine.current.crosshair },
      anchor: { active: false, x: 0, y: 0, radius: 24, age: 0, ttl: 1800 },
      micro: { active: false, x: 0, y: 0, radius: 10, age: 0, ttl: 1800 },
      level: startLevel, score: 0, timeLeft: DRILL_DURATION,
      totalClicks: 0, successfulHits: 0, missedClicks: 0, timeouts: 0, totalCycles: 0,
      combo: 0, bestCombo: 0, precisionScores: [], correctionTimes: [], totalMicroClicks: 0, microHits: 0,
      microSpawnTime: 0, particles: [], hitMarkers: [], screenShake: 0, logicalWidth: w, logicalHeight: h
    };

    spawnAnchor(w, h, startLevel, 0);

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch(e) {}

    setGameState('countdown');
    setCountdownValue(3);
    drillAudio.playCountdownTick();

    const t1 = setTimeout(() => { setCountdownValue(2); drillAudio.playCountdownTick(); }, 700);
    const t2 = setTimeout(() => { setCountdownValue(1); drillAudio.playCountdownTick(); }, 1400);
    const t3 = setTimeout(() => { setCountdownValue('GO'); drillAudio.playGo(); }, 2100);
    const t4 = setTimeout(() => {
      startingRef.current = false;
      setGameState('playing');
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(() => {});
      }
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [spawnAnchor]);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    startingRef.current = false;

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
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
    if (containerRef.current && !document.fullscreenElement) {
      try { await containerRef.current.requestFullscreen(); } catch (e) {}
    }
    if (canvasRef.current && !document.pointerLockElement) {
      try { await canvasRef.current.requestPointerLock(); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const handlePointerLockChange = () => setPointerLocked(document.pointerLockElement === canvasRef.current);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
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
          const cfg = getLevelConfig(eRef.level, eRef.combo);
          const now = performance.now();

          eRef.totalClicks++;

          if (eRef.anchor.active) {
            const dist = Math.hypot(ch.x - eRef.anchor.x, ch.y - eRef.anchor.y);
            if (dist <= eRef.anchor.radius + cfg.anchorHitPad) {
              eRef.successfulHits++;
              eRef.anchor.active = false;
              eRef.score += 10;
              eRef.timeLeft += 0.2;
              setScore(eRef.score);

              drillAudio.playHit();
              createExplosion(eRef.anchor.x, eRef.anchor.y, '#06b6d4');
              createHitMarker(ch.x, ch.y);

              eRef.microSpawnTime = now;
              spawnMicro(eRef.anchor.x, eRef.anchor.y, eRef.logicalWidth, eRef.logicalHeight, eRef.level, eRef.combo);
            } else {
              eRef.missedClicks++;
              if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
              eRef.combo = 0;
              setCombo(0);
              eRef.screenShake = 6;
              triggerFlash();
              drillAudio.playPenalty();
              createExplosion(ch.x, ch.y, '#ef4444');
            }
          } else if (eRef.micro.active) {
            eRef.totalMicroClicks++;
            const dist = Math.hypot(ch.x - eRef.micro.x, ch.y - eRef.micro.y);
            if (dist <= eRef.micro.radius + cfg.microHitPad) {
              eRef.successfulHits++;
              eRef.microHits++;
              eRef.totalCycles++;

              eRef.combo++;
              if (eRef.combo > eRef.bestCombo) eRef.bestCombo = eRef.combo;
              setCombo(eRef.combo);
              setBestCombo(eRef.bestCombo);

              const maxEffectivePad = cfg.microRadius + cfg.microHitPad;
              const precisionRatio = Math.max(0, 1 - (dist / maxEffectivePad));
              const precisionScore = Math.round(precisionRatio * 100);
              eRef.precisionScores.push(precisionScore);

              const corrTime = now - eRef.microSpawnTime;
              eRef.correctionTimes.push(corrTime);

              const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5;
              const basePts = 100 + Math.round(precisionRatio * 50);
              eRef.score += Math.round(basePts * getComboMultiplier(eRef.combo) * levelMult);
              eRef.timeLeft += 0.2; // +0.2s on micro hit, total +0.4s/cycle
              setScore(eRef.score);

              const rawLevel = (eRef.score / POINTS_PER_LEVEL) + 1;
              eRef.level = Math.max(eRef.level, rawLevel);
              bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);
              setLevel(Math.floor(eRef.level));

              drillAudio.playHit();
              createExplosion(eRef.micro.x, eRef.micro.y, '#00ff88');
              createHitMarker(ch.x, ch.y);

              spawnAnchor(eRef.logicalWidth, eRef.logicalHeight, eRef.level, eRef.combo);
            } else {
              eRef.missedClicks++;
              if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
              eRef.combo = 0;
              setCombo(0);
              eRef.screenShake = 6;
              triggerFlash();
              drillAudio.playPenalty();
              createExplosion(ch.x, ch.y, '#ef4444');
            }
          }

          if (eRef.totalClicks > 0) {
            const acc = Math.round((eRef.successfulHits / eRef.totalClicks) * 100);
            if (acc !== lastAccuracyRef.current) {
              setAccuracy(acc);
              lastAccuracyRef.current = acc;
            }
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
  }, [gameState, pointerLocked, universalSens, triggerFlash, spawnAnchor, spawnMicro, createExplosion, createHitMarker, resumeDrill]);

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
          if (gameState === 'start') {
            spawnAnchor(width, height);
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
          setTimeLeft(0);
          endGame();
          return;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
          setTimeLeft(intTime);
          lastTimeRef.current = intTime;
        }

        if (e.anchor.active) {
          e.anchor.age += deltaTimeMs;
          if (drillTimeout.isEnabled() && e.anchor.age >= e.anchor.ttl) {
            e.timeouts++;
            if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
            e.combo = 0;
            setCombo(0);
            e.screenShake = 6;
            triggerFlash();
            drillAudio.playPenalty();
            spawnAnchor(w, h, e.level, e.combo);
          }
        } else if (e.micro.active) {
          e.micro.age += deltaTimeMs;
          if (drillTimeout.isEnabled() && e.micro.age >= e.micro.ttl) {
            e.timeouts++;
            if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
            e.combo = 0;
            setCombo(0);
            e.screenShake = 6;
            triggerFlash();
            drillAudio.playPenalty();
            spawnAnchor(w, h, e.level, e.combo);
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

      if (gameState === 'playing' || gameState === 'start') {
        if (e.anchor.active) {
          const progress = Math.min(1, e.anchor.age / e.anchor.ttl);
          const targetColor = '#06b6d4';

          drawPulseRing(ctx, e.anchor.x, e.anchor.y, e.anchor.radius, targetColor, progress);
          drawTacticalTarget(ctx, e.anchor.x, e.anchor.y, e.anchor.radius, targetColor, true);
        } else if (e.micro.active) {
          const progress = Math.min(1, e.micro.age / e.micro.ttl);
          const targetColor = '#00ff88';

          drawPulseRing(ctx, e.micro.x, e.micro.y, e.micro.radius, targetColor, progress);
          drawTacticalTarget(ctx, e.micro.x, e.micro.y, e.micro.radius, targetColor, true);
        }
      }

      ctx.lineWidth = 2.0;
      for (let i = e.hitMarkers.length - 1; i >= 0; i--) {
        const hm = e.hitMarkers[i];
        hm.life -= dt * 4.5;
        if (hm.life <= 0) { e.hitMarkers.splice(i, 1); continue; }
        ctx.globalAlpha = hm.life; ctx.strokeStyle = '#06b6d4';
        const s = 5 + (1 - hm.life) * 6;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#06b6d4' : '#eab308';
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
  }, [gameState, pointerLocked, endGame, triggerFlash, spawnAnchor]);

  const shareDrillLink = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/fps/micro-correction-precision';
    try {
      const canvas = generateShareCard({
        score,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.bestCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Micro-Correction Aim',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${score} PTS (Level ${analytics.levelReached}) on Micro-Correction Aim Trainer! Precision Accuracy: ${analytics.accuracy}%. Test your reflexes at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Micro-Correction Aim Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [score, bestScore, analytics, isNewBest]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              Micro-Correction Aim Trainer
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Hardware Raw Input • Endless Level Progression
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-white tabular-nums">{score}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-white"}`}>{timeLeft}s</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Accuracy</div>
              <div className="text-lg sm:text-xl font-black text-cyan-400 tabular-nums">{accuracy}%</div>
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
          onContextMenu={(e) => { if (gameState === 'playing') e.preventDefault(); }}
          className={`relative overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white border border-white/10 ${
            isFullscreen 
              ? "fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#080811] rounded-none border-none flex flex-col items-center justify-center" 
              : "w-full rounded-2xl bg-[#080811] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] relative overflow-hidden flex flex-col"
          }`}
          style={{ touchAction: gameState === 'playing' ? 'none' : 'auto' }}
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
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{score}</p>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time</p>
                <p className={`text-2xl sm:text-3xl font-bold tabular-nums leading-tight ${timeLeft <= 10 ? "text-red-400" : "text-white"}`}>{timeLeft}s</p>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
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
                <AlertCircle className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-1">Game Paused</h2>
                <p className="text-xs text-gray-300 font-medium">Click to resume — fullscreen and cursor lock will re-engage.</p>
              </div>
            </div>
          )}

          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked) resumeDrill(); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === "playing" ? "cursor-none" : ""}`}
          />

          {/* START MODAL */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Crosshair}
              accent="cyan"
              title="Micro-Correction Aim Trainer"
              subtitle="Hardware Raw Input • Endless Level Progression"
              rules={[
                { icon: Target, accent: "cyan", title: "Objective (+10 Anchor / +100+ Micro)", text: "Hit Anchor → Snap-Click Adjacent Micro" },
                { icon: AlertCircle, accent: "red", title: "Failure Rule", text: penaltyEnabled ? "Miss / Timeout → Resets Combo, -0.6s" : "Miss / Timeout → Resets Combo" },
              ]}
              sensitivity={{ value: universalSens, onChange: setUniversalSens, cmPer360 }}
              stats={[
                { icon: Trophy, label: "Best Score", value: bestScore, color: "text-white", accent: "slate" },
                { icon: Flame, label: "Best Combo", value: `${bestCombo}x`, color: "text-cyan-400", accent: "cyan" },
                { icon: TrendingUp, label: "Best Level", value: `Lv. ${bestLevel}`, color: "text-blue-400", accent: "blue" },
              ]}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" />
          )}

          {/* END SCREEN — Universal Result Card */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="cyan"
              grade={analytics.grade}
              score={score}
              isNewBest={isNewBest}
              stats={[
                { value: analytics.accuracy, suffix: "%", label: "Accuracy" },
                { value: analytics.avgCorrectionTime, suffix: "ms", label: "Avg Correction" },
                { value: `${analytics.bestCombo}x`, label: "Max Combo" },
                { value: `Lv. ${analytics.levelReached}`, label: "Peak Level" },
              ]}
              onPlayAgain={enterDrill}
              onShare={shareDrillLink}
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
              title="About Micro-Correction Aim Trainer"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-cyan-400" /> What Is Micro-Correction Aiming?
                  </h4>
                  {ABOUT_INTRO.map((para, i) => (
                    <p key={i} className={`text-sm leading-relaxed text-gray-300 ${i < ABOUT_INTRO.length - 1 ? "mb-3" : ""}`}>{para}</p>
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
                      <section.icon className="w-4 h-4 text-cyan-400" /> {section.title}
                    </h4>
                    {section.paragraphs.map((para, j) => (
                      <p key={j} className={`text-sm leading-relaxed text-gray-300 ${j < section.paragraphs.length - 1 ? "mb-3" : ""}`}>{para}</p>
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
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              Related FPS Drills
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