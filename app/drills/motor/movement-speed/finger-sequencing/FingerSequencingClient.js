'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
  AlertCircle, Target, TrendingUp, Volume2, VolumeX,
  Zap, ZapOff, Users
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
import { createBackdropCache, getCanvasDpr, createHitRing, drawHitRings } from '@/lib/canvasFx';
import DrillCountdown from '@/components/drill/DrillCountdown';
import DrillAccordion from '@/components/drill/DrillAccordion';
import FpsStartCard from '@/components/drill/FpsStartCard';
import DrillResultCard from '@/components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';
import useUnexpectedExitGuard from '@/lib/useUnexpectedExitGuard';

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

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Ordered Node", highlight: "+150 PTS (+0.6s)", result: "×Combo Mult" },
  { num: "2", text: "Chain Streak", highlight: "Up to 3.0× PTS", result: "Maintains Flow" },
  { num: "3", text: "Level Up", highlight: "+1 / 1750 PTS", result: "Shrink & Speed" },
  { num: "4", text: "Miss / Timeout", highlight: "Penalty", result: "Resets Combo (-0.8s)" }
];

export default function FingerSequencingClient({ copy } = {}) {
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
    particles: [], hitMarkers: [], hitRings: [], screenShake: 0, logicalWidth: 800, logicalHeight: 450
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

  const handleExitDrill = useCallback(() => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    startingRef.current = false;
    gameActiveRef.current = false;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

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

  const spawnParticles = useCallback((x, y, color, count = 14) => {
    const e = engine.current;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 220 + 70;
      e.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3.5 + 1.5,
        color,
        life: 0.45,
        maxLife: 0.45
      });
    }
  }, []);

  const finishDrillSession = useCallback(() => {
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
  }, []);

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

      const hitColor = eng.combo >= 10 ? '#34d399' : '#10b981';
      spawnParticles(target.x, target.y, hitColor, 14);
      eng.hitRings.push(createHitRing(target.x, target.y, target.r, hitColor));
      drillAudio.playHit();

      if (eng.activeIndex >= eng.chain.length) {
        eng.chainsCompleted++;
        eng.combo++;
        if (eng.combo > eng.maxCombo) eng.maxCombo = eng.combo;

        const mult = getComboMultiplier(eng.combo);
        const levelBonus = 1 + getDifficultyProgress(eng.level) * 0.5;
        eng.score += Math.round(150 * mult * levelBonus);

        spawnParticles(target.x, target.y, '#34d399', 14);

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

      const activeColor = e.combo >= 10 ? '#34d399' : '#10b981';

      if (e.chain.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = e.combo >= 10 ? 'rgba(52, 211, 153, 0.35)' : 'rgba(16, 185, 129, 0.35)';
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

        if (isCompleted) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(16,185,129,0.15)';
          ctx.strokeStyle = 'rgba(16,185,129,0.4)';
          ctx.lineWidth = 1;
          ctx.fill();
          ctx.stroke();
        } else if (isActive) {
          const glowGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 1.8);
          glowGrad.addColorStop(0, e.combo >= 10 ? 'rgba(52, 211, 153, 0.45)' : 'rgba(16, 185, 129, 0.45)');
          glowGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
          ctx.fillStyle = glowGrad;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          ctx.fillStyle = activeColor;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.5;
          ctx.fill();
          ctx.stroke();

          // Sequence number inside active node
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${Math.max(10, Math.round(node.r * 0.9))}px ui-sans-serif, system-ui, -apple-system, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${i + 1}`, node.x, node.y);
        } else {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();

          // Sequence number in pending nodes
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.font = `600 ${Math.max(9, Math.round(node.r * 0.85))}px ui-sans-serif, system-ui, -apple-system, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${i + 1}`, node.x, node.y);
        }
      }

      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 2.2;
        if (p.life <= 0) {
          e.particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * Math.max(0, p.life / p.maxLife), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      drawHitRings(ctx, e.hitRings, dt);

      const cx = e.crosshair.x;
      const cy = e.crosshair.y;

      // Tactical Pro White Crosshair Reticle
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 3;

      const gap = 5;
      const len = 7;
      ctx.strokeStyle = '#ffffff';
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
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
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
      if (e.key === 'Escape' && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };

    const handlePointerLockChange = () => {
      const isLocked = !!document.pointerLockElement;
      setPointerLocked(isLocked);
      if (!isLocked && gameActiveRef.current && !isTouchOnlyDevice) {
        handleExitDrill();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
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
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [universalSens, gameState, isTouchOnlyDevice, handleExitDrill]);

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
        {/* Title & AIO Header */}
        {!isFullscreen && (
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              <span data-seo-kw="1">{copy?.title || "Sequence Aim Trainer"}</span>
            </h1>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              {copy?.desc || "Sequential target switching means clicking a set of targets in a required order rather than whichever one is easiest to reach. An ordered sequence like that runs as a single pre-planned motor program instead of one fresh decision per target (Lashley, 1951; Keele, 1968), so the time is spent in the transitions between targets, not in the clicks. Each transition is itself a Fitts's Law movement, timed by the log of the gap between two targets divided by their width (Fitts, 1954)."}
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: copy?.score || "Score", val: uiScore },
              { label: copy?.timeLeft || "Time Left", val: `${uiTimeLeft}s`, highlight: uiTimeLeft <= 10 },
              { label: copy?.accuracy || "Accuracy", val: `${liveAccuracy}%`, color: "text-emerald-400" },
              { label: copy?.bestScore || "Best Score", val: bestScore, color: "text-amber-400" },
            ].map((s, i) => (
              <div key={i} className="border border-white/[0.06] bg-white/[0.015] px-2 py-2 rounded-xl text-center">
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">{s.label}</div>
                <div className={`text-xs sm:text-sm md:text-base font-black tabular-nums truncate ${s.highlight ? "text-red-400 animate-pulse" : s.color || "text-white"}`}>{s.val}</div>
              </div>
            ))}
          </div>
        )}

        {/* DRILL BOX CONTAINER */}
        <div
          ref={containerRef}
          onContextMenu={(e) => { if (gameActiveRef.current) e.preventDefault(); }}
          className={`overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white ${
            isFullscreen
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] flex flex-col items-center justify-center'
              : 'w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] max-md:portrait:aspect-[3/4] max-md:portrait:min-h-[420px] max-md:portrait:max-h-[76vh] max-md:landscape:min-h-[340px] max-md:landscape:max-h-[85vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col'
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
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.score || "Score"}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{uiScore}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.timeLeft || "Time"}</p>
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
              title={copy?.title || "Sequence Aim Trainer"}
              subtitle={copy?.startSubtitle || "Motor Precision & Sequential Pathing • Continuous Scaling"}
              buttonText={copy?.startButtonText}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY (3-2-1-GO) */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle={copy?.getReady || "GET READY"} />
          )}

          {/* UNIVERSAL RESULT CARD */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="emerald"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { label: copy?.accuracy || 'Accuracy', value: analytics.accuracy, suffix: '%' },
                { label: copy?.chainsCleared || 'Chains Cleared', value: analytics.successfulHits },
                { label: copy?.peakLevel || 'Peak Level', value: `Lv. ${analytics.finalLevel}` },
                { label: copy?.maxCombo || 'Max Combo', value: analytics.maxCombo, suffix: 'x' },
              ]}
              playAgainText={copy?.playAgain}
              shareText={copy?.shareTitle}
              exitText={copy?.exitTitle}
              onPlayAgain={enterDrill}
              onShare={shareScore}
              onExit={handleExitDrill}
            />
          )}

        </div>

        {/* ── ACCORDIONS ── */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0 font-sans">
            <DrillAccordion
              id="rules"
              title={copy?.rulesTitle || "Drill Instructions & Scoring System"}
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(copy?.rulesItems || RULES_ITEMS).map((item, idx) => (
                  <RuleItem key={idx} num={item.num} text={item.text} highlight={item.highlight} result={item.result} />
                ))}
              </div>
            </DrillAccordion>
          </div>
        )}

      </main>
    </div>
  );
}

// === Subcomponents ===
function RuleItem({ num, text, highlight = '', result }) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 bg-black px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/10 shadow-sm font-sans">
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs sm:text-sm font-black shadow flex-shrink-0">
        {num}
      </div>
      <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
        <p className="text-xs sm:text-sm font-medium text-gray-200 font-sans truncate">
          {text}{highlight && <span className="font-bold text-white"> {highlight}</span>}
        </p>
        <div className="text-[11px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#050811] border border-white/10 text-white whitespace-nowrap shadow-inner flex-shrink-0">
          {result}
        </div>
      </div>
    </div>
  );
}