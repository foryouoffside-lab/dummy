'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight, Crosshair,
  Eye, Flame, GraduationCap, Play, RefreshCw, Target,
  Timer, TrendingUp, Trophy, Volume2, VolumeX,
  Zap, ZapOff, Users, Sparkles, Share2, Sliders,
  LogOut, Award
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '@/components/ShareScoreCard';
import { getPlayerName } from '@/lib/leaderboard';
import { drillAudio } from '@/lib/drillAudio';
import { useDrillSensitivity } from '@/lib/drillSensitivity';
import { drillFlash } from '@/lib/drillFlash';
import { drillPenalty } from '@/lib/drillPenalty';
import { drillTimeout } from '@/lib/drillTimeout';
import { MAX_LEVEL, getStartLevel, getDifficultyProgress, ramp } from '@/lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '@/lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawPulseRing } from '@/lib/canvasFx';
import useUnexpectedExitGuard from '@/lib/useUnexpectedExitGuard';
import DrillFooter from '@/components/drill/DrillFooter';
import DrillCountdown from '@/components/drill/DrillCountdown';
import DrillAccordion from '@/components/drill/DrillAccordion';
import FpsStartCard from '@/components/drill/FpsStartCard';
import DrillResultCard from '@/components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_LEVEL = 1750; // 250 -> 1750 (7x)
const ELITE_SCORE = 24000; // 16000 -> 24000 (1.5x)
const TIME_PER_HIT = 0.6; // +0.6s on node hit
const TIME_PENALTY = 0.8; // -0.8s on miss/timeout (opt-in gated)
const STORAGE_KEY = 'skilldrills_motor_finger_sequencing_v3';

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
  const nodeCount = level >= 8 ? 5 : (level >= 4 ? 4 : 3);
  return {
    nodeCount,
    r0: Math.max(8, ramp(32, 10, p) * (1 - heat * 0.20)),
    r1: Math.max(6, ramp(24, 8, p) * (1 - heat * 0.20)),
    r2: Math.max(5, ramp(18, 7, p) * (1 - heat * 0.20)),
    r3: Math.max(5, ramp(14, 6, p) * (1 - heat * 0.20)),
    r4: Math.max(4, ramp(11, 5, p) * (1 - heat * 0.20)),
    r5: Math.max(4, ramp(9, 4, p) * (1 - heat * 0.20)),
    maxTime: Math.max(0.6, ramp(3.2, 0.85, p) * (1 - heat * 0.25)),
    spread: ramp(120, 380, p),
    hitMargin: Math.max(3, ramp(12, 4, p))
  };
};

const FAQ_ITEMS = [
  {
    q: "What is a sequence aim trainer?",
    a: "A sequence aim trainer is a specialized mouse accuracy tool designed to practice moving the crosshair to multiple targets in a specific size order under time pressure, simulating multi-target acquisition in competitive shooters."
  },
  {
    q: "How does finger sequencing improve FPS aiming?",
    a: "Finger sequencing conditions your brain and motor pathways to execute precise multi-target micro-flicks in rapid succession without crosshair overshooting or hesitation between target transfers."
  },
  {
    q: "How is this different from a simple click speed test (CPS)?",
    a: "A CPS test measures raw spam clicks on a stationary box. Sequence Aim Training measures spatial accuracy, rapid crosshair pathing, micro-adjustments, and ordered visual recognition under strict time limits."
  },
  {
    q: "Does sequential target training help in Valorant and CS2?",
    a: "Yes. In clutch situations where multiple enemies push your angle, being able to clear targets in quick sequential succession from primary threat to secondary threat is critical to winning rounds."
  },
  {
    q: "How do you calculate accuracy in this sequence trainer?",
    a: "Accuracy is calculated as the ratio of successful ordered node hits to total mouse click actions. Missed clicks on empty canvas space or clicking nodes out of size order penalizes your accuracy."
  },
  {
    q: "What is the best mouse sensitivity for finger sequencing drills?",
    a: "We recommend using your exact in-game competitive sensitivity (typically 25cm - 45cm per 360 turn) so that your motor memory directly translates to in-game target switching."
  },
  {
    q: "How does difficulty scaling work in Level 1 to 15?",
    a: "As your score increases, target node radii shrink, allowed sequence window times tighten, and distance spreads expand continuously."
  },
  {
    q: "Can I train on mobile or touch screen devices?",
    a: "Yes! The drill fully supports high-speed touch interactions on mobile and tablet displays, allowing you to train finger dexterity on any device."
  },
  {
    q: "How often should I practice sequence aim training?",
    a: "Integrating 5 to 10 minutes of sequential click training into your daily warmup routine before ranked matches builds sharp muscle memory and warm finger reflexes."
  },
  {
    q: "What is the combo multiplier system?",
    a: "Completing node chains sequentially builds your combo streak. Sustaining consecutive unbroken chains boosts your point multiplier up to 3.0x, driving elite leaderboard scores."
  },
  {
    q: "Why do node sizes change within each chain?",
    a: "Node sizes descend from largest to smallest to train initial broad flicking followed by fine micro-correction, mimicking initial enemy target locking followed by headshot refinement."
  },
  {
    q: "Is this sequence aim trainer completely free?",
    a: "Yes, SkillDrills Sequence Aim Trainer is 100% free with no sign-ups, downloads, or paywalls required."
  },
  {
    q: "What games benefit most from finger sequence training?",
    a: "Valorant, Counter-Strike 2, Apex Legends, Overwatch 2, Rainbow Six Siege, and Call of Duty: Warzone."
  },
  {
    q: "How can I share my score card results?",
    a: "After completing a drill session, click the 'Share Score' button in the results modal to instantly copy or share your verified performance summary."
  }
];

export default function FingerSequencingClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const universalSens = useDrillSensitivity();
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [flashes, setFlashes] = useState([]);

  // Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [isNewBest, setIsNewBest] = useState(false);
  const [liveAccuracy, setLiveAccuracy] = useState(100);
  const [comboMult, setComboMult] = useState(1.0);
  const [uiLevel, setUiLevel] = useState(1);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, successfulHits: 0, missedClicks: 0, timeouts: 0,
    avgReactionTime: 0, maxCombo: 0, finalLevel: 1, grade: null
  });

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
    chain: [],
    activeIndex: 0,
    score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION,
    sequenceTimer: 2.8, maxSequenceTime: 2.8,
    successfulHits: 0, missedClicks: 0, timeouts: 0, maxCombo: 0,
    reactionTimes: [], totalActions: 0, chainsCompleted: 0,
    particles: [], hitMarkers: [], screenShake: 0, logicalWidth: 800, logicalHeight: 450
  });

  const triggerFlash = useCallback(() => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

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

  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    return () => {
      gameActiveRef.current = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    startingRef.current = false;
    gameActiveRef.current = false;
    setIsPaused(false);

    setIsFullscreen(false);
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    setGameState('start');
  }, []);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  const resumeDrill = useCallback(async () => {
    setIsPaused(false);
    setIsFullscreen(true);
    if (canvasRef.current && !document.pointerLockElement) {
      try { await canvasRef.current.requestPointerLock(); } catch (e) {}
    }
  }, []);

  const spawnChain = useCallback((width, height, currentLevel) => {
    const e = engine.current;
    const config = getLevelConfig(currentLevel, e.combo);
    const count = config.nodeCount;
    const pad = 65;
    const chain = [];

    const baseRadii = [config.r0, config.r1, config.r2, config.r3, config.r4, config.r5];

    let x0 = pad + Math.random() * (width - pad * 2);
    let y0 = pad + Math.random() * (height - pad * 2);
    chain.push({ x: x0, y: y0, r: baseRadii[0], opacity: 1.0, index: 0, spawnTime: performance.now() });

    for (let i = 1; i < count; i++) {
      let attempts = 0;
      let nx = x0;
      let ny = y0;
      const r = baseRadii[i];

      while (attempts < 30) {
        attempts++;
        const angle = Math.random() * Math.PI * 2;
        const dist = 70 + Math.random() * config.spread;
        const tx = Math.max(pad + r, Math.min(width - pad - r, chain[i - 1].x + Math.cos(angle) * dist));
        const ty = Math.max(pad + r, Math.min(height - pad - r, chain[i - 1].y + Math.sin(angle) * dist));

        let overlaps = false;
        for (let j = 0; j < chain.length; j++) {
          const d = Math.hypot(tx - chain[j].x, ty - chain[j].y);
          if (d < (r + chain[j].r + 18)) {
            overlaps = true;
            break;
          }
        }

        if (!overlaps || attempts === 30) {
          nx = tx;
          ny = ty;
          break;
        }
      }

      chain.push({
        x: nx,
        y: ny,
        r: r,
        opacity: 1.0 - (i * 0.14),
        index: i,
        spawnTime: performance.now()
      });
    }

    e.chain = chain;
    e.activeIndex = 0;
    e.sequenceTimer = config.maxTime;
    e.maxSequenceTime = config.maxTime;
  }, []);

  const spawnParticles = useCallback((x, y, color, count) => {
    const e = engine.current;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 220 + 70;
      e.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 4 + 1.5,
        color,
        life: 0.35,
        maxLife: 0.35
      });
    }
  }, []);

  const finishDrillSession = useCallback(() => {
    markIntentionalExit();
    gameActiveRef.current = false;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    if (document.pointerLockElement) document.exitPointerLock();
    drillAudio.playSessionEnd();

    const e = engine.current;
    const totalAcc = e.totalActions > 0 ? Math.round((e.successfulHits / e.totalActions) * 100) : 0;
    const avgRt = e.reactionTimes.length > 0
      ? Math.round(e.reactionTimes.reduce((a, b) => a + b, 0) / e.reactionTimes.length)
      : 0;

    const finalScore = Math.floor(e.score);
    const rating = getFpsScoreGrade(finalScore, ELITE_SCORE);
    const grade = { letter: rating.grade || rating.letter || 'C', label: rating.label || 'Keep Going', color: rating.color || 'text-emerald-400' };

    setAnalytics({
      accuracy: totalAcc,
      successfulHits: e.chainsCompleted,
      missedClicks: e.missedClicks,
      timeouts: e.timeouts,
      avgReactionTime: avgRt,
      maxCombo: e.maxCombo,
      finalLevel: Math.floor(bestLevelRunRef.current),
      grade
    });

    setUiScore(finalScore);

    const saved = getSavedData();
    const isNewRecord = finalScore > saved.bestScore;
    setIsNewBest(isNewRecord);

    const runBestLevel = Math.max(saved.bestLevel || 1, Math.floor(bestLevelRunRef.current));
    const updatedData = {
      bestScore: Math.max(saved.bestScore, finalScore),
      bestCombo: Math.max(saved.bestCombo, e.maxCombo),
      bestLevel: runBestLevel,
      totalSessions: (saved.totalSessions || 0) + 1
    };

    saveData(updatedData);
    setBestScore(updatedData.bestScore);
    setBestCombo(updatedData.bestCombo);
    setBestLevel(updatedData.bestLevel);
    setGameState('gameOver');
  }, [markIntentionalExit]);

  const triggerPenalty = useCallback((type) => {
    const e = engine.current;
    e.totalActions++;
    if (type === 'timeout') {
      e.timeouts++;
    } else {
      e.missedClicks++;
    }

    if (drillPenalty.isEnabled()) {
      e.timeLeft -= TIME_PENALTY;
    }

    e.combo = 0;
    e.screenShake = 12;

    drillAudio.playPenalty();
    triggerFlash();

    const activeNode = e.chain[e.activeIndex] || { x: e.logicalWidth / 2, y: e.logicalHeight / 2 };
    spawnParticles(activeNode.x, activeNode.y, '#ef4444', 15);

    setComboMult(1.0);
    setLiveAccuracy(e.totalActions > 0 ? Math.round((e.successfulHits / e.totalActions) * 100) : 100);

    if (canvasRef.current) {
      spawnChain(e.logicalWidth, e.logicalHeight, e.level);
    }
  }, [spawnChain, triggerFlash, spawnParticles]);

  const handlePointerDown = useCallback((e) => {
    if (!gameActiveRef.current) return;
    const eng = engine.current;
    const cvs = canvasRef.current;
    if (!cvs || eng.chain.length === 0) return;

    // Sync crosshair position from click/tap event if not in pointer lock
    if (!document.pointerLockElement && e) {
      const rect = cvs.getBoundingClientRect();
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      if (clientX !== undefined && clientY !== undefined) {
        eng.crosshair.x = Math.max(0, Math.min(eng.logicalWidth, clientX - rect.left));
        eng.crosshair.y = Math.max(0, Math.min(eng.logicalHeight, clientY - rect.top));
      }
    }

    // Attempt pointer lock in background for desktop mouse
    if (!isTouchOnlyDevice && !document.pointerLockElement) {
      cvs.requestPointerLock().catch(() => {});
    }

    eng.totalActions++;
    const target = eng.chain[eng.activeIndex];
    const config = getLevelConfig(eng.level, eng.combo);
    const dist = Math.hypot(eng.crosshair.x - target.x, eng.crosshair.y - target.y);
    const hitRadius = target.r + config.hitMargin + 6;

    if (dist <= hitRadius) {
      eng.successfulHits++;
      eng.timeLeft += TIME_PER_HIT;

      const rt = performance.now() - target.spawnTime;
      eng.reactionTimes.push(rt);
      eng.activeIndex++;

      spawnParticles(target.x, target.y, '#10b981', 10);
      drillAudio.playHit();

      if (eng.activeIndex >= eng.chain.length) {
        eng.chainsCompleted++;
        eng.combo++;
        if (eng.combo > eng.maxCombo) eng.maxCombo = eng.combo;

        const mult = getComboMultiplier(eng.combo);
        const levelBonus = 1 + getDifficultyProgress(eng.level) * 0.5;
        eng.score += Math.round(150 * mult * levelBonus);

        spawnParticles(target.x, target.y, '#34d399', 20);

        // Continuous level progression
        const rawLevel = (eng.score / POINTS_PER_LEVEL) + 1;
        eng.level = Math.max(eng.level, rawLevel);
        bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eng.level);

        setUiLevel(Math.floor(eng.level));
        setComboMult(mult);
        setUiScore(Math.floor(eng.score));

        spawnChain(eng.logicalWidth, eng.logicalHeight, eng.level);
      }

      setLiveAccuracy(Math.round((eng.successfulHits / eng.totalActions) * 100));
    } else {
      triggerPenalty('miss');
    }
  }, [isTouchOnlyDevice, spawnParticles, triggerPenalty, spawnChain]);

  const pointerLockedRef = useRef(false);
  useEffect(() => {
    pointerLockedRef.current = pointerLocked;
  }, [pointerLocked]);

  const runPlayingLoop = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (now) => {
      if (!gameActiveRef.current) return;
      if (isIdleFrameSkippable(gameState === 'playing', now, lastTime)) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const e = engine.current;
      const isCurrentlyPaused = isPausedRef.current;

      if (!isCurrentlyPaused) {
        e.timeLeft -= dt;

        if (Math.abs(e.timeLeft - lastTimeRef.current) > 0.1) {
          lastTimeRef.current = e.timeLeft;
          setUiTimeLeft(Math.max(0, Math.ceil(e.timeLeft)));
        }

        if (e.timeLeft <= 0) {
          finishDrillSession();
          return;
        }

        if (e.chain.length > 0 && e.activeIndex < e.chain.length) {
          if (drillTimeout.isEnabled()) {
            e.sequenceTimer -= dt;
            if (e.sequenceTimer <= 0) {
              triggerPenalty('timeout');
            }
          }
        }

        if (e.screenShake > 0) {
          e.screenShake = Math.max(0, e.screenShake - dt * 35);
        }
      }

      const dpr = getCanvasDpr(ctx);
      const w = e.logicalWidth;
      const h = e.logicalHeight;

      if (!backdropCacheRef.current) {
        backdropCacheRef.current = createBackdropCache(w, h, (bCtx) => {
          bCtx.fillStyle = '#050508';
          bCtx.fillRect(0, 0, w, h);

          bCtx.strokeStyle = 'rgba(16,185,129,0.04)';
          bCtx.lineWidth = 1;
          for (let x = 0; x < w; x += 50) {
            bCtx.beginPath();
            bCtx.moveTo(x, 0);
            bCtx.lineTo(x, h);
            bCtx.stroke();
          }
          for (let y = 0; y < h; y += 50) {
            bCtx.beginPath();
            bCtx.moveTo(0, y);
            bCtx.lineTo(w, y);
            bCtx.stroke();
          }
        });
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.drawImage(backdropCacheRef.current, 0, 0, w, h);

      if (e.screenShake > 0) {
        const sx = (Math.random() - 0.5) * e.screenShake;
        const sy = (Math.random() - 0.5) * e.screenShake;
        ctx.translate(sx, sy);
      }

      if (e.chain.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(16,185,129,0.35)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        for (let i = 0; i < e.chain.length; i++) {
          if (i === 0) ctx.moveTo(e.chain[i].x, e.chain[i].y);
          else ctx.lineTo(e.chain[i].x, e.chain[i].y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      for (let i = 0; i < e.chain.length; i++) {
        const node = e.chain[i];
        const isActive = i === e.activeIndex;
        const isCompleted = i < e.activeIndex;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);

        if (isCompleted) {
          ctx.fillStyle = 'rgba(16,185,129,0.15)';
          ctx.strokeStyle = 'rgba(16,185,129,0.4)';
          ctx.lineWidth = 1;
        } else if (isActive) {
          const glowGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 1.8);
          glowGrad.addColorStop(0, 'rgba(16,185,129,0.45)');
          glowGrad.addColorStop(1, 'rgba(16,185,129,0)');
          ctx.fillStyle = glowGrad;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981';
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.5;

          const progressRatio = Math.max(0, e.sequenceTimer / e.maxSequenceTime);
          drawPulseRing(ctx, node.x, node.y, node.r + 6, progressRatio, '#10b981');
        } else {
          ctx.fillStyle = 'rgba(255,255,255,0.06)';
          ctx.strokeStyle = 'rgba(255,255,255,0.2)';
          ctx.lineWidth = 1.5;
        }

        ctx.fill();
        ctx.stroke();
      }

      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        if (p.life <= 0) {
          e.particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * Math.max(0, p.life / p.maxLife), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      const cx = e.crosshair.x;
      const cy = e.crosshair.y;

      // Professional FPS Gaming Reticle Cursor
      ctx.save();
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 6;

      const gap = 5;
      const len = 7;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      // 4 Precision Crosshair Lines
      ctx.beginPath();
      ctx.moveTo(cx, cy - gap); ctx.lineTo(cx, cy - gap - len);
      ctx.moveTo(cx, cy + gap); ctx.lineTo(cx, cy + gap + len);
      ctx.moveTo(cx - gap, cy); ctx.lineTo(cx - gap - len, cy);
      ctx.moveTo(cx + gap, cy); ctx.lineTo(cx + gap + len, cy);
      ctx.stroke();

      // Outer Accent Ring
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
      ctx.lineWidth = 1;
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Precision Dot
      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      ctx.restore();

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);
  }, [finishDrillSession, triggerPenalty]);

  const startActualDrill = useCallback(() => {
    setGameState('playing');
    setIsPaused(false);
    gameActiveRef.current = true;

    const startLvl = getStartLevel();
    bestLevelRunRef.current = startLvl;

    const e = engine.current;
    e.score = 0;
    e.level = startLvl;
    e.combo = 0;
    e.maxCombo = 0;
    e.timeLeft = DRILL_DURATION;
    e.successfulHits = 0;
    e.missedClicks = 0;
    e.timeouts = 0;
    e.reactionTimes = [];
    e.totalActions = 0;
    e.chainsCompleted = 0;

    setUiScore(0);
    setUiLevel(startLvl);
    setComboMult(1.0);
    setLiveAccuracy(100);
    setUiTimeLeft(DRILL_DURATION);

    const cvs = canvasRef.current;
    if (cvs) {
      e.crosshair.x = e.logicalWidth / 2;
      e.crosshair.y = e.logicalHeight / 2;
      spawnChain(e.logicalWidth, e.logicalHeight, startLvl);
    }

    runPlayingLoop();
  }, [spawnChain, runPlayingLoop]);

  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    setIsFullscreen(true);

    if (canvasRef.current && !isTouchOnlyDevice && !document.pointerLockElement) {
      try { await canvasRef.current.requestPointerLock(); } catch (e) {}
    }

    setGameState('countdown');
    setCountdownValue(3);
    drillAudio.playCountdownTick();

    const t1 = setTimeout(() => {
      setCountdownValue(2);
      drillAudio.playCountdownTick();
    }, 1000);

    const t2 = setTimeout(() => {
      setCountdownValue(1);
      drillAudio.playCountdownTick();
    }, 2000);

    const t3 = setTimeout(() => {
      drillAudio.playGo();
      startingRef.current = false;
      startActualDrill();
    }, 3000);

    countdownTimeoutsRef.current = [t1, t2, t3];
  }, [isTouchOnlyDevice, startActualDrill]);

  useEffect(() => {
    const cvs = canvasRef.current;
    const container = containerRef.current;
    if (!cvs || !container) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);

      if (w > 0 && h > 0) {
        cvs.width = Math.floor(w * dpr);
        cvs.height = Math.floor(h * dpr);
        cvs.style.width = `${w}px`;
        cvs.style.height = `${h}px`;

        engine.current.logicalWidth = w;
        engine.current.logicalHeight = h;
        backdropCacheRef.current = null;
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && gameState === 'playing') {
        setIsPaused(true);
      }
    };

    const handlePointerLockChange = () => {
      const isLocked = !!document.pointerLockElement;
      setPointerLocked(isLocked);
      if (!isLocked && gameActiveRef.current && !isTouchOnlyDevice) {
        setIsPaused(true);
      }
    };

    const handleMouseMove = (e) => {
      if (!gameActiveRef.current) return;
      const eng = engine.current;
      const cvs = canvasRef.current;

      if (document.pointerLockElement) {
        eng.crosshair.x = Math.max(0, Math.min(eng.logicalWidth, eng.crosshair.x + e.movementX * universalSens));
        eng.crosshair.y = Math.max(0, Math.min(eng.logicalHeight, eng.crosshair.y + e.movementY * universalSens));
      } else if (cvs) {
        const rect = cvs.getBoundingClientRect();
        eng.crosshair.x = Math.max(0, Math.min(eng.logicalWidth, e.clientX - rect.left));
        eng.crosshair.y = Math.max(0, Math.min(eng.logicalHeight, e.clientY - rect.top));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [universalSens, gameState, isTouchOnlyDevice]);

  const shareScore = useCallback(async () => {
    const player = getPlayerName();
    const gradeLetter = analytics.grade ? analytics.grade.letter : 'A';
    const url = 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: `${analytics.accuracy}%`,
        rating: { letter: gradeLetter, label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Sequence Aim Trainer',
        playerName: player,
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Sequence Aim Trainer! Accuracy: ${analytics.accuracy}%. Practice at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'Sequence Aim Trainer Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
      }
    }
  }, [uiScore, analytics, bestScore, isNewBest]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              Sequence Aim Trainer
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
              <div className="text-lg sm:text-xl font-black text-emerald-400 tabular-nums">{liveAccuracy}%</div>
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
          onContextMenu={(e) => { if (gameActiveRef.current) e.preventDefault(); }}
          className={`overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white border border-white/10 ${
            isFullscreen
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#080811] rounded-none border-none flex flex-col items-center justify-center'
              : 'w-full rounded-2xl bg-[#080811] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] relative overflow-hidden flex flex-col'
          }`}
          style={{ touchAction: gameActiveRef.current ? 'none' : 'auto' }}
        >
          {/* DOM Flash Overlay (Red only) */}
          {flashes.map((f) => (
            <div key={f.id} className="fx-flash fx-flash-red" />
          ))}

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col gap-1">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{uiScore}</p>
                </div>
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

          {/* PAUSE OVERLAY IF GAME IS PAUSED (ESC KEY) */}
          {gameState === 'playing' && !isTouchOnlyDevice && isPaused && (
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
            onPointerDown={handlePointerDown}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`}
          />

          {/* START MODAL */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Target}
              accent="emerald"
              title="Sequence Aim Trainer"
              subtitle="Motor Precision & Sequential Pathing • Continuous Scaling"
              rules={[
                { icon: Target, accent: 'emerald', title: 'Click Green Target Nodes in Size Order', text: '+150 PTS × Combo × Level bonus (+0.6s per hit)' },
                {
                  icon: Zap,
                  accent: 'teal',
                  title: penaltyEnabled ? 'Time Penalty (-0.8s)' : 'Streak & Sequence Rules',
                  text: penaltyEnabled
                    ? 'Misses or sequence timeouts subtract 0.8s and reset combo'
                    : 'Clear node chains before the timer expires. Misses reset combo'
                },
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

          {/* COUNTDOWN OVERLAY (3-2-1-GO) */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" />
          )}

          {/* UNIVERSAL RESULT CARD */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="emerald"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { label: 'Accuracy', value: analytics.accuracy, suffix: '%' },
                { label: 'Chains Cleared', value: analytics.successfulHits },
                { label: 'Peak Level', value: `Lv. ${analytics.finalLevel}` },
                { label: 'Max Combo', value: analytics.maxCombo, suffix: 'x' },
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
                <RuleItem num="1" text="Ordered Node Hits" highlight="(Green Nodes)" result="+150 PTS × Combo (+0.6s)" />
                <RuleItem num="2" text="Combo Multiplier" highlight="Up to 3.0x" result="Boosts point earnings exponentially" />
                <RuleItem num="3" text="Level Progression" highlight="Continuous PPL" result="Target sizes shrink continuously" />
                <RuleItem num="4" text="Miss / Timeout" highlight="Resets Combo" result="Deducts 0.8s when enabled in settings" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Sequence Aim Trainer"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-400" /> Mastering Sequential Target Acquisition
                  </h4>
                  <p className="text-sm leading-relaxed mb-3">
                    <strong>Sequence Aim Training</strong> isolates and exercises your motor cortex's ability to plan crosshair paths across multiple targets in rapid succession. In competitive shooters like <strong>Valorant, CS2, and Apex Legends</strong>, engagements frequently demand clearing an enemy on a primary angle before micro-flicking to a secondary target.
                  </p>
                  <p className="text-sm leading-relaxed">
                    By forcing ordered node clicks from largest to smallest, the drill trains the transition from broad initial flicks to tight micro-corrections, eliminating hesitation and crosshair overshooting between target transfers.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Target Audience</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">FPS players looking to sharpen target switching, finger dexterity, micro-flick precision, and multi-kill clutch consistency.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Mechanical Benefits</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Conditions smooth crosshair deceleration, reduces finger friction, and builds muscle memory for rapid multi-target transfers.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Difficulty Scaling</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Continuous exponential scaling smoothly tightens sequence timer windows, shrinks target node radii, and expands spatial node spreads.</p>
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
                {FAQ_ITEMS.map((item, idx) => (
                  <FAQItem key={idx} q={item.q} a={item.a} />
                ))}
              </div>
            </DrillAccordion>
          </div>
        )}

        {/* ── RELATED DRILLS ── */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 font-sans">
              Related Motor &amp; Speed Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer Pro" desc="Train raw click precision and reaction timing on dynamic targets." />
              <RelatedCard href="/drills/motor/hand-eye-coordination/precision-flick-shot" title="Precision Flick Shot" desc="Master high-speed flick shots with strict pixel accuracy." />
              <RelatedCard href="/drills/motor/precision-control/steady-hand" title="Steady Hand Trainer" desc="Trace a winding path corridor with shrinking width on streak." />
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness Pro" desc="Master wide horizontal flicks and peripheral target detection." />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode with precision flicking." />
              <RelatedCard href="/drills/fps/target-acquisition" title="Target Acquisition" desc="Train rapid target identification and click timing." />
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
    <div className="flex items-center gap-4 bg-black p-4 rounded-xl border border-white/10 shadow-sm">
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

function RelatedCard({ href, title, desc }) {
  return (
    <Link href={href} className="group p-5 bg-black rounded-2xl border border-gray-800 hover:border-emerald-500/50 hover:bg-white/[0.02] transition-all flex flex-col justify-between">
      <div>
        <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors mb-1 text-base">{title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{desc}</p>
      </div>
      <div className="flex items-center gap-1 mt-4 text-xs text-emerald-400 font-bold font-mono">
        <span>TRY DRILL</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

function FAQItem({ q, a }) {
  return (
    <div className="bg-[#05060b] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
      <h4 className="text-sm font-bold text-gray-200 mb-2">{q}</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{a}</p>
    </div>
  );
}