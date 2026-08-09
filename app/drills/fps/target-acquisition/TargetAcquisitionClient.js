'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  AlertCircle, ArrowRight, ChevronRight, Eye, Flame,
  RefreshCw, Target, Timer, TrendingUp, Trophy,
  Volume2, VolumeX, Zap, Share2, Users, LogOut, Award
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { getStartLevel, getDifficultyProgress, getComboBonusLevel } from '../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawPulseRing } from '../../../../lib/canvasFx';
import useUnexpectedExitGuard from '../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../components/drill/FpsStartCard';

const DRILL_DURATION = 45; // 45 seconds focused duration
const POINTS_PER_LEVEL = 300; // Aggressive progression
const ELITE_SCORE = 18000; // 100% mark for letter grade
const STORAGE_KEY = 'skilldrills_fps_target_acquisition_v2';

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


export default function TargetAcquisitionClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [universalSens, setUniversalSens] = useState(1.0);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [flashes, setFlashes] = useState([]);

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, successfulHits: 0, missedClicks: 0, sequenceErrors: 0,
    setsCleared: 0, maxCombo: 0, finalLevel: 1, grade: null
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
    targets: [],
    score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION,
    successfulHits: 0, missedClicks: 0, sequenceErrors: 0, setsCleared: 0,
    totalClicks: 0, correctHits: 0, maxCombo: 0,
    particles: [], hitMarkers: [], screenShake: 0,
    logicalWidth: 800, logicalHeight: 450
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  const triggerFlash = useCallback(() => {
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  // Touch Device Detection & Initial Storage Loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);

      try {
        const savedSens = localStorage.getItem('targetacq_sens');
        if (savedSens) setUniversalSens(parseFloat(savedSens));
      } catch (e) {}

      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestCombo(saved.bestCombo || 0);
      setBestLevel(saved.bestLevel || 1);
    }
  }, []);

  // Countdown Timeout Cleanup on Unmount
  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('targetacq_sens', universalSens.toString()); } catch (e) {}
    }
    drillAudio.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

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

  // Recalibrated Level configuration driving params smoothly up to L15
  const getLevelConfig = (level) => {
    const p = getDifficultyProgress(level); // 0 -> 1 across L1..L15
    return {
      count:        Math.round(2 + p * 4),    // 2 -> 6 targets
      radius:       32 - p * 18,              // 32 -> 14 px
      opacityDelta: 0.45 - p * 0.40,          // 0.45 -> 0.05  (the primary discrimination axis)
      margin:       120 - p * 90,             // 120 -> 30 px
      hitPad:       10 - p * 6,               // 10 -> 4 px
    };
  };

  const spawnTargetSet = useCallback((width, height, currentLevel) => {
    const e = engine.current;
    const config = getLevelConfig(currentLevel);
    
    const targets = [];
    const minSpacing = config.radius * 2.8;

    for (let i = 0; i < config.count; i++) {
      let x, y, overlap;
      let attempts = 0;
      do {
        overlap = false;
        x = config.margin + Math.random() * Math.max(1, width - config.margin * 2);
        y = config.margin + Math.random() * Math.max(1, height - config.margin * 2);
        
        for (const t of targets) {
          if (Math.hypot(t.x - x, t.y - y) < minSpacing) {
            overlap = true;
            break;
          }
        }
        attempts++;
      } while (overlap && attempts < 150);

      targets.push({
        id: i, // 0 = brightest target, count-1 = dimmest
        x,
        y,
        radius: config.radius,
        val: Math.max(0.05, 1.0 - (i * config.opacityDelta)),
        // Pulse phase offset. MUST be random, never derived from `id` — `id`
        // encodes brightness, so a phase tied to it would let a player read the
        // answer off the ring animation instead of the opacity.
        seed: Math.random()
      });
    }

    // Scramble drawing order so array position does not give away target location
    e.targets = [...targets].sort(() => Math.random() - 0.5);
  }, []);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const createHitMarker = (x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  };

  // End Game Management
  const endGame = useCallback(() => {
    gameActiveRef.current = false;
    startingRef.current = false;
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const finalAccuracy = e.totalClicks > 0 ? Math.round((e.correctHits / e.totalClicks) * 100) : 0;
    
    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: finalAccuracy, successfulHits: e.correctHits, missedClicks: e.missedClicks,
      sequenceErrors: e.sequenceErrors, setsCleared: e.setsCleared, maxCombo: e.maxCombo,
      finalLevel: e.level, grade
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const runBestLevel = Math.max(prevSaved.bestLevel, bestLevelRunRef.current);
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
    lastTimeRef.current = DRILL_DURATION;

    const saved = getSavedData();
    const startLevel = getStartLevel(saved.bestLevel);
    bestLevelRunRef.current = startLevel;

    setAnalytics({
      accuracy: 100, successfulHits: 0, missedClicks: 0, sequenceErrors: 0,
      setsCleared: 0, maxCombo: 0, finalLevel: startLevel, grade: null
    });

    const w = engine.current.logicalWidth || 800;
    const h = engine.current.logicalHeight || 450;

    engine.current = {
      crosshair: { ...engine.current.crosshair },
      targets: [],
      score: 0, level: startLevel, combo: 0, timeLeft: DRILL_DURATION,
      successfulHits: 0, missedClicks: 0, sequenceErrors: 0, setsCleared: 0,
      totalClicks: 0, correctHits: 0, maxCombo: 0,
      particles: [], hitMarkers: [], screenShake: 0,
      logicalWidth: w, logicalHeight: h
    };

    spawnTargetSet(w, h, startLevel);

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch(e) {}

    // Countdown sequence: 3 -> 2 -> 1 -> GO
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
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(() => {});
      }
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [spawnTargetSet]);

  // Pointer lock change listener
  useEffect(() => {
    const handlePointerLockChange = () => setPointerLocked(document.pointerLockElement === canvasRef.current);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  // Scoped Raw Input Mouse Move & Mouse Down Event Handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameState !== 'playing' || !pointerLocked || !canvasRef.current) return;
      const w = engine.current.logicalWidth;
      const h = engine.current.logicalHeight;
      const dx = e.movementX * universalSens;
      const dy = e.movementY * universalSens;
      engine.current.crosshair.x = Math.max(0, Math.min(w, engine.current.crosshair.x + dx));
      engine.current.crosshair.y = Math.max(0, Math.min(h, engine.current.crosshair.y + dy));
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (!containerRef.current || !containerRef.current.contains(e.target)) return;

      if (gameState === 'playing') {
        if (!pointerLocked && canvasRef.current) {
          resumeDrill();
        } else if (pointerLocked) {
          const eRef = engine.current;
          eRef.totalClicks++;

          if (eRef.targets.length === 0) return;

          const ch = eRef.crosshair;
          const config = getLevelConfig(eRef.level);

          // Find the target with lowest id (brightest target remaining)
          const requiredTarget = [...eRef.targets].sort((a, b) => a.id - b.id)[0];

          let hitTarget = null;
          for (let i = eRef.targets.length - 1; i >= 0; i--) {
            const t = eRef.targets[i];
            if (Math.hypot(ch.x - t.x, ch.y - t.y) <= t.radius + config.hitPad) {
              hitTarget = t;
              break;
            }
          }

          if (hitTarget) {
            if (hitTarget.id === requiredTarget.id) {
              // CORRECT TARGET HIT
              eRef.correctHits++;
              eRef.combo++;
              if (eRef.combo > eRef.maxCombo) eRef.maxCombo = eRef.combo;

              const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5; // 1.0 -> 1.5
              eRef.score += Math.round(100 * getComboMultiplier(eRef.combo) * levelMult);

              // Monotonic level progression
              const rawLevel = Math.floor(eRef.score / POINTS_PER_LEVEL) + 1 + getComboBonusLevel(eRef.combo);
              eRef.level = Math.max(eRef.level, rawLevel);
              bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);

              eRef.targets = eRef.targets.filter(t => t.id !== hitTarget.id);

              if (eRef.targets.length === 0) {
                // SET FULLY CLEARED
                eRef.setsCleared++;
                eRef.score += Math.round(400 * levelMult);
                drillAudio.playHit();
                
                const w = eRef.logicalWidth;
                const h = eRef.logicalHeight;
                spawnTargetSet(w, h, eRef.level);
              } else {
                drillAudio.playHit();
              }

              createExplosion(hitTarget.x, hitTarget.y, '#f59e0b');
              createHitMarker(ch.x, ch.y);
              setUiScore(eRef.score);

            } else {
              // SEQUENCE ERROR (Wrong target clicked)
              eRef.sequenceErrors++;
              eRef.combo = 0;
              eRef.screenShake = 8;
              triggerFlash();
              drillAudio.playPenalty();
              createExplosion(hitTarget.x, hitTarget.y, '#ef4444');
            }
          } else {
            // MISS (Empty space clicked)
            eRef.missedClicks++;
            eRef.combo = 0;
            eRef.screenShake = 6;
            triggerFlash();
            drillAudio.playPenalty();
            createExplosion(ch.x, ch.y, '#ef4444');
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
  }, [gameState, pointerLocked, universalSens, triggerFlash, resumeDrill, spawnTargetSet]);

  // Main Physics & Canvas Render Loop with Backdrop Caching and Capped DPR
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
            bCtx.strokeStyle = 'rgba(245, 158, 11, 0.04)';
            bCtx.lineWidth = 1;
            const cx = w / 2, cy = h / 2;
            bCtx.beginPath();
            for(let i = -10; i <= 10; i++) {
              bCtx.moveTo(cx, cy); bCtx.lineTo(cx + i * 250, h);
              bCtx.moveTo(cx, cy); bCtx.lineTo(cx + i * 250, 0);
            }
            bCtx.stroke();
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
      const deltaTimeMs = time - lastTime;
      lastTime = time;
      const dt = Math.min(deltaTimeMs / 1000, 0.1); 
      const e = engine.current;
      const dpr = getCanvasDpr();
      const w = e.logicalWidth;
      const h = e.logicalHeight;

      if (gameState === 'playing' && pointerLocked) {
        if (e.timeLeft > 0) {
          e.timeLeft -= dt;
        }

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

      // Draw Targets — byte-identical treatment for decoys & target except opacity t.val
      if (gameState === 'playing' || gameState === 'start') {
        e.targets.forEach((t) => {
          ctx.save();

          // Pulse ring. Alpha is baked into the COLOUR rather than left to
          // drawPulseRing's own globalAlpha, so the ring is scaled by t.val like
          // everything else — an equally-bright ring on every target would add
          // uniform brightness and flatten the opacity cue the drill is built on.
          drawPulseRing(
            ctx, t.x, t.y, t.radius,
            `rgba(245, 158, 11, ${t.val})`,
            ((time / 1600) + t.seed) % 1
          );

          // Body: radial gradient with its origin offset toward the upper-left,
          // which implies a light source and reads as a lit sphere instead of a
          // flat disc. Every stop is scaled by t.val, so the discrimination
          // mechanic is untouched — decoys differ ONLY in opacity.
          const g = ctx.createRadialGradient(
            t.x - t.radius * 0.35, t.y - t.radius * 0.35, t.radius * 0.1,
            t.x, t.y, t.radius
          );
          g.addColorStop(0,    `rgba(255, 214, 138, ${t.val})`); // warm highlight
          g.addColorStop(0.55, `rgba(245, 158, 11,  ${t.val})`); // body
          g.addColorStop(1,    `rgba(154, 71,  8,   ${t.val})`); // deep rim → roundness
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
          ctx.fill();

          // Rim light ON the edge in a related warm tone. The old version stroked
          // pure white 4px OFF the body, which read as a selection outline in an
          // unrelated hue rather than part of the object.
          ctx.strokeStyle = `rgba(253, 230, 138, ${t.val * 0.9})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.radius - 1, 0, Math.PI * 2);
          ctx.stroke();

          ctx.restore();
        });
      }

      // Render Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3);
      }

      // Render Hit Markers
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

      // Draw Crosshair
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#f59e0b' : '#3b82f6';
        ctx.strokeStyle = activeColor;
        ctx.fillStyle = activeColor;
        
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 16, 0, Math.PI * 2); ctx.stroke();

        ctx.lineWidth = 1.5;
        const gap = 6;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - 16); ctx.lineTo(ch.x, ch.y - gap);
        ctx.moveTo(ch.x, ch.y + 16); ctx.lineTo(ch.x, ch.y + gap);
        ctx.moveTo(ch.x - 16, ch.y); ctx.lineTo(ch.x - gap, ch.y);
        ctx.moveTo(ch.x + 16, ch.y); ctx.lineTo(ch.x + gap, ch.y);
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
  }, [gameState, pointerLocked, endGame]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/fps/target-acquisition';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.maxCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Target Acquisition Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Target Acquisition Pro! Accuracy: ${analytics.accuracy}%. Practice visual target selection at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Reflex Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  const accuracy = analytics.accuracy;

  return (
    <div className="min-h-screen select-none bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* BREADCRUMB NAV */}
        {!isFullscreen && (
          <nav className="mb-3">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/fps" className="text-gray-500 hover:text-gray-300 transition-colors">FPS</Link></li>
              <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-amber-400 font-medium">Target Acquisition Pro</li>
            </ol>
          </nav>
        )}

        {/* CENTERED PAGE HEADING */}
        {!isFullscreen && (
          <div className="text-center mb-4">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">
              Target Acquisition Pro
            </h1>
          </div>
        )}

        {/* 4-STAT CARD ROW */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 mb-3">
            <StatCard 
              icon={<Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />} 
              value={uiScore} 
              label="Score" 
            />
            <StatCard 
              icon={<Timer className={`w-4 h-4 sm:w-5 sm:h-5 ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`} />} 
              value={uiTimeLeft} 
              label="Time" 
              unit="s"
            />
            <StatCard 
              icon={<Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />} 
              value={`${accuracy}%`} 
              label="Accuracy" 
            />
            <StatCard 
              icon={<Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />} 
              value={bestScore} 
              label="Best Score" 
            />
          </div>
        )}

        {/* DRILL BOX CONTAINER */}
        <div 
          ref={containerRef} 
          onContextMenu={(e) => { if (gameActiveRef.current) e.preventDefault(); }}
          className={`relative overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#050508] text-white ${
            isFullscreen 
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] rounded-none border-none' 
              : 'w-full rounded-2xl border border-white/10 bg-[#050508] shadow-[0_0_40px_rgba(0,0,0,0.9)] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh]'
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

          {/* IN-GAME HUD SOUND TOGGLE */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setSoundEnabled((v) => {
                  drillAudio.setEnabled(!v);
                  return !v;
                });
              }}
              className="absolute bottom-4 right-4 z-40 p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
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
                <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-1">Game Paused</h2>
                <p className="text-xs text-gray-300 font-medium">Click to resume — fullscreen and cursor lock will re-engage.</p>
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
              icon={Target}
              accent="amber"
              title="Target Acquisition Pro"
              subtitle="Visual Discrimination & Luminal Sorting • 15 Levels"
              rules={[
                { icon: Target, accent: 'amber', title: 'Objective', text: 'Click Brightest Target First' },
                { icon: AlertCircle, accent: 'red', title: 'Failure Rule', text: 'Wrong Click Resets Combo' },
              ]}
              sensitivity={{ value: universalSens, onChange: setUniversalSens, cmPer360 }}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: Flame, label: 'Best Combo', value: `${bestCombo}x`, color: 'text-amber-400', accent: 'amber' },
                { icon: TrendingUp, label: 'Best Level', value: `Lv. ${bestLevel}`, color: 'text-blue-400', accent: 'blue' },
              ]}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY (3-2-1-GO) */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" accent="#f59e0b" />
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
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade.color}`}>
                  {analytics.grade.letter}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1">
                  {analytics.grade.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 tabular-nums">
                  {uiScore}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500">Points</div>
              </div>

              {/* Right Stats & Actions Panel */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
                
                {/* 4 Stat Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.accuracy}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Accuracy</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.setsCleared}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Sets Cleared</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.maxCombo}x</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Max Combo</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">Lv. {analytics.finalLevel}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Level</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Play Again
                  </button>
                  <button 
                    onClick={shareScore} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title="Share Score"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleExitDrill} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title="Exit Fullscreen & Return"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* ACCORDION 1: INSTRUCTIONS & SCORING */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
          <DrillAccordion
            id="rules"
            title="Drill Instructions &amp; Scoring System"
            isOpen={openAccordion === 'rules'}
            onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RuleItem num="1" text="Correct Target Hit" highlight="+100 PTS × Combo × Level" result="Builds combo & score" />
              <RuleItem num="2" text="Set Cleared Bonus" highlight="+400 PTS × Level" result="Spawns next target set" />
              <RuleItem num="3" text="Level Progression" highlight="Every 300 PTS" result="Target count & delta scale" />
              <RuleItem num="4" text="Wrong Click / Miss" highlight="Resets Combo" result="Red flash penalty" />
            </div>
          </DrillAccordion>
          </div>
        )}

        {/* ACCORDION 2: ABOUT TARGET ACQUISITION PRO */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
          <DrillAccordion
            id="about"
            title="About Target Acquisition Pro"
            isOpen={openAccordion === 'about'}
            onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
          >
            <section>
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" /> What Is Target Acquisition Training?
              </h4>
              <p className="text-sm leading-relaxed mb-3">
                <strong>Target Acquisition Training</strong> isolates the cognitive phase of aim: visually scanning a scene, recognizing threat priorities, and executing precise crosshair snaps to the primary target. In tactical shooters like CS2 and Valorant, enemies rarely present themselves in isolation. Winning engagements requires sorting through visual clutter, identifying who to shoot first, and firing before your opponent reacts.
              </p>
              <p className="text-sm leading-relaxed">
                By conditioning your visual cortex to perform high-speed <strong>luminance sorting</strong> under strict time pressure, this drill narrows your visual discrimination latency, ensuring your mechanical flicks are guided by fast, decisive threat recognition.
              </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                  <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">Tactical shooter players, entry fraggers, and gamers who hesitate when multiple enemies appear on screen simultaneously.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                  <h5 className="text-xs font-bold text-white">Benefits of Discrimination</h5>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">Reduces target switching hesitation, eliminates panic clicking, and trains consistent first-shot accuracy on subtle enemy pixels.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                  <h5 className="text-xs font-bold text-white">15-Level Scaling</h5>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">As you level up, target size shrinks, target counts grow up to 6 on screen, and the opacity delta tightens to a challenging 5% difference.</p>
              </div>
            </div>

          </DrillAccordion>
          </div>
        )}

        {/* ACCORDION 3: FAQ — its own top-level section.
            It used to be nested INSIDE the About accordion, so a reader had to open
            About and then scroll to reach it. This section carries the FAQPage
            schema, so it earns its own entry point. */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
          <DrillAccordion
            id="faq"
            title="Frequently Asked Questions"
            isOpen={openAccordion === 'faq'}
            onToggle={() => setOpenAccordion(openAccordion === 'faq' ? null : 'faq')}
          >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FAQItem q="What is target acquisition in FPS games?" a="Target acquisition is the combined process of visually detecting a threat, identifying it as an enemy (not a teammate), deciding to engage, and getting your crosshair on the target fast enough to fire first. It involves both cognitive processing (recognition and decision) and mechanical execution (crosshair movement). This is the skill that separates players who see enemies fast from those who react slowly." />
                <FAQItem q="How does target acquisition differ from reaction time?" a="Reaction time measures the gap between stimulus appearance and your click. Target acquisition includes reaction time but adds the prior cognitive steps: visual scan → target detection → threat confirmation → aim → shoot. Better target acquisition means your brain identifies threats faster, giving your mechanical aim more time to respond accurately." />
                <FAQItem q="Why do some players always seem to see enemies before others?" a="Players with trained target acquisition have learned unconscious threat pattern recognition — their visual system has been trained to flag enemy silhouettes, color cues, and movement patterns faster than untrained players. This creates the illusion that they see first when actually their brain is processing the same visual information faster and more efficiently." />
                <FAQItem q="How does this help in Valorant compared to other drills?" a="Valorant's round-based structure means you often peek corners or angles with partial information. Fast target acquisition is critical for winning the split-second timing battle when two players simultaneously come into view of each other. This drill specifically trains the speed of the visual identification → aim decision → click sequence." />
                <FAQItem q="What cognitive skills does target acquisition training improve?" a="Target acquisition training improves visual processing speed (how fast your eyes register a target), pattern recognition (identifying enemy silhouettes), selective attention (filtering enemies from background), and decision speed (choosing to engage). Together these create the faster perception that high-rank players possess." />
                <FAQItem q="Can target acquisition be trained independently of mechanical aim?" a="Yes, target acquisition isolates the visual identification and decision phase of aim. Training target acquisition helps your brain recognize threat patterns faster, allowing your existing mechanical aim to execute with higher confidence." />
                <FAQItem q="How does target acquisition impact CS2 and tactical shooters?" a="In CS2, time-to-kill is extremely fast. Spotting a target's head pixel a fraction of a second earlier grants the critical advantage needed to secure first-bullet headshots." />
                <FAQItem q="What is the optimal daily target acquisition training routine?" a="We recommend 10 to 15 minutes of target acquisition drills at the start of your gaming session to warm up visual processing speed before entering competitive matches." />
              </div>
          </DrillAccordion>
          </div>
        )}

        {/* RELATED DRILLS GRID */}
        {!isFullscreen && (
          <div className="mt-12 pt-8 border-t border-gray-800 font-sans">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" /> Related FPS Drills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness Pro" desc="Master 180-degree snap turns and peripheral threat detection." />
              <RelatedCard href="/drills/fps/target-switching-swarm" title="Target Switching Swarm" desc="Train multi-target flick switching under high density." />
              <RelatedCard href="/drills/fps/target-prioritization" title="Target Prioritization" desc="Evaluate threat distances and prioritize high-risk targets." />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode with precision flicking." />
              <RelatedCard href="/drills/fps/micro-correction-precision" title="Micro Flicks" desc="Optimize tight-angle crosshair micro corrections." />
              <RelatedCard href="/drills/fps/instant-response" title="Instant Response" desc="Train raw single-stimulus reflex acquisition." />
            </div>
          </div>
        )}

        {/* SITE FOOTER */}
        {!isFullscreen && <DrillFooter />}

      </div>
    </div>
  );
}

// === Subcomponents ===
function StatCard({ icon, value, label, unit = '', accentColor = 'border-white/10' }) {
  return (
    <div className={`rounded-xl border ${accentColor} bg-black backdrop-blur-md p-1.5 sm:p-2.5 text-center flex flex-col items-center justify-center transition-all duration-300 shadow-md hover:-translate-y-0.5 pointer-events-none font-sans`}>
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-black border border-white/10 flex items-center justify-center mb-1 shadow-inner">
        {icon}
      </div>
      <p className="text-xs sm:text-lg lg:text-xl font-black tracking-tight text-white leading-none truncate w-full font-sans font-mono tabular-nums">
        {value}<span className="text-[9px] sm:text-xs font-semibold ml-0.5 text-gray-400 font-sans">{unit}</span>
      </p>
      <p className="text-[8px] sm:text-[9.5px] font-bold uppercase tracking-wider text-gray-400 mt-1 truncate w-full">{label}</p>
    </div>
  );
}

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
    <Link href={href} className="group p-5 bg-black rounded-2xl border border-gray-800 hover:border-amber-500/50 hover:bg-white/[0.02] transition-all flex flex-col justify-between">
      <div>
        <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors mb-1 text-base">{title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{desc}</p>
      </div>
      <div className="flex items-center gap-1 mt-4 text-xs text-amber-400 font-bold font-mono">
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
      <p className="text-xs text-gray-200 leading-relaxed">{a}</p>
    </div>
  );
}