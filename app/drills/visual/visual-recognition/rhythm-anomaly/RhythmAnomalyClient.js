'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, Award, Brain, ChevronRight,
  Eye, GraduationCap, Play, RefreshCw, RotateCw, Target,
  Timer, TrendingUp, Trophy, Volume2, VolumeX,
  Zap, Users, Sparkles, Share2, LogOut, CheckCircle, XCircle,
  Grid3X3, Search, AlertTriangle
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import useDrillFlash from '../../../../../lib/useDrillFlash';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import DrillFlashOverlay from '../../../../../components/drill/DrillFlashOverlay';
import DrillRuleItem from '../../../../../components/drill/DrillRuleItem';
import DrillFAQItem from '../../../../../components/drill/DrillFAQItem';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';

const DRILL_DURATION = 45; // Exactly 45 seconds round duration
const ELITE_SCORE = 200; // Target score for S+ rating (20 hits x 10 PTS = 200 PTS)
const STORAGE_KEY = 'rhythmAnomalyBestScore_v8';

const GRID_COLS = 6;
const GRID_ROWS = 6;
const TOTAL_CELLS = GRID_COLS * GRID_ROWS;

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0 };
    const p = parseInt(raw, 10);
    return { bestScore: isNaN(p) ? 0 : p };
  } catch (e) {
    return { bestScore: 0 };
  }
};

const saveData = (score) => {
  try {
    const currentBest = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    if (score > currentBest && score > 0) {
      localStorage.setItem(STORAGE_KEY, score.toString());
    }
  } catch (e) {}
};

const RELATED_DRILLS = [
  { id: "entropic-grid", name: "Entropic Grid", cat: "Visual Recognition", desc: "Find 2-character target codes under dynamic noise.", href: "/drills/visual/visual-recognition/entropic-grid" },
  { id: "visual-search", name: "Visual Search", cat: "Visual Recognition", desc: "Conjunctive search for target symbols among noise.", href: "/drills/visual/visual-recognition/visual-search" },
  { id: "moving-target", name: "Moving Target Pro", cat: "Visual Tracking", desc: "Kinetic visual tracking and smooth pursuit interception.", href: "/drills/visual/tracking-accuracy/moving-target" },
  { id: "multiple-targets", name: "Multiple Targets", cat: "Visual Tracking", desc: "Multi-object tracking & visual working memory.", href: "/drills/visual/tracking-accuracy/multiple-targets" },
  { id: "pursuit-tracker", name: "Pursuit Tracker", cat: "Visual Tracking", desc: "Smooth pursuit tracking accuracy and velocity alignment.", href: "/drills/visual/tracking-accuracy/pursuit-tracker" },
  { id: "distance-judgment", name: "Distance Judgment Pro", cat: "Depth Perception", desc: "3D stereoscopic depth estimation & intercept timing.", href: "/drills/visual/depth-perception/distance-judgment" }
];

// ==========================================
// ERROR BOUNDARY
// ==========================================
class GameErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('Rhythm Anomaly Error:', error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/95 rounded-xl z-50 border border-purple-500/30">
          <div className="text-center p-6 max-w-sm">
            <AlertTriangle className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-white text-lg font-bold mb-2">Temporal Engine Desync</h3>
            <p className="text-gray-400 text-sm mb-4">The visual rhythm engine encountered a frame error.</p>
            <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }} className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]">Reset Frame</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function RhythmAnomalyClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const { flashes, triggerFlash } = useDrillFlash();
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
        setIsPortrait(window.innerHeight > window.innerWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initial Game State
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [timeouts, setTimeouts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [speedLevel, setSpeedLevel] = useState(1);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    perfectHits: 0,
    missedClicks: 0,
    maxCombo: 0,
    finalLevel: 1,
    grade: null,
  });

  // DOM & Engine Canvas Refs
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  const countdownTimeoutsRef = useRef([]);
  const gameTimeoutsRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const startingRef = useRef(false);

  const cellsRef = useRef([]);
  const anomalyIndexRef = useRef(-1);
  const anomalySpawnTimeRef = useRef(0);
  const steadyPulseDurationRef = useRef(1600);
  const anomalyDurationRef = useRef(1100);
  const entropyIntervalRef = useRef(800);
  const timeoutLimitRef = useRef(6000);
  const lastEntropyTimeRef = useRef(0);

  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const localTimeRef = useRef(DRILL_DURATION);
  const isActiveRef = useRef(false);
  const lastClickTimeRef = useRef(0);

  // Storage loading & sound init
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
    }
  }, []);

  useEffect(() => {
    drillAudio?.setEnabled?.(soundEnabled);
  }, [soundEnabled]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const clearGameTimeouts = useCallback(() => {
    gameTimeoutsRef.current.forEach(clearTimeout);
    gameTimeoutsRef.current = [];
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    clearGameTimeouts();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    startingRef.current = false;
    isActiveRef.current = false;

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    setGameState('start');
  }, [clearGameTimeouts]);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  // End Game Management & Grade Evaluation
  const endGame = useCallback(() => {
    isActiveRef.current = false;
    startingRef.current = false;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    clearGameTimeouts();
    setGameState('gameOver');

    const totalTries = hitsRef.current + missesRef.current;
    const finalAccuracy = totalTries > 0 ? Math.round((hitsRef.current / totalTries) * 100) : 100;

    const rating = getFpsScoreGrade(scoreRef.current, ELITE_SCORE);
    const grade = {
      letter: rating.grade || rating.letter || 'C',
      label: rating.label || 'Keep Going',
      color: rating.color || 'text-purple-400',
      emoji: rating.emoji || '⚡'
    };

    setAnalytics({
      accuracy: finalAccuracy,
      perfectHits: hitsRef.current,
      missedClicks: missesRef.current,
      maxCombo: bestStreakRef.current,
      finalLevel: speedLevel,
      grade,
    });

    const isNewHigh = scoreRef.current > bestScore;
    setIsNewBest(isNewHigh);
    if (isNewHigh) setBestScore(scoreRef.current);
    saveData(scoreRef.current);

    drillAudio?.playSessionEnd?.();
  }, [clearGameTimeouts, speedLevel, bestScore]);

  // Relocate Anomaly Cell
  const relocateAnomaly = useCallback(() => {
    let newIdx;
    do {
      newIdx = Math.floor(Math.random() * TOTAL_CELLS);
    } while (newIdx === anomalyIndexRef.current);

    anomalyIndexRef.current = newIdx;
    anomalySpawnTimeRef.current = performance.now();
  }, []);

  // Init Grid Cells
  const initGrid = useCallback(() => {
    const newCells = new Array(TOTAL_CELLS);
    for (let i = 0; i < TOTAL_CELLS; i++) {
      newCells[i] = { hitTime: 0, missTime: 0, entropyTime: 0 };
    }
    cellsRef.current = newCells;
    relocateAnomaly();
  }, [relocateAnomaly]);

  // Penalty (Wrong Click or Timeout): streak reset only — no score or time loss
  const handlePenalty = useCallback((type) => {
    if (!isActiveRef.current) return;

    streakRef.current = 0;
    setStreak(0);

    triggerFlash('red');

    if (type === 'miss') {
      missesRef.current += 1;
      setMissedHits(missesRef.current);
      drillAudio?.playPenalty?.();
    } else {
      setTimeouts((t) => t + 1);
      drillAudio?.playPenalty?.();
      relocateAnomaly();
    }
  }, [relocateAnomaly, triggerFlash]);

  // Handle Target Hit & Escalating Grid Pulse Speed (+10 PTS per Hit)
  const handleHit = useCallback((idx) => {
    if (!isActiveRef.current) return;

    hitsRef.current += 1;
    setSuccessfulHits(hitsRef.current);

    streakRef.current += 1;
    setStreak(streakRef.current);
    if (streakRef.current > bestStreakRef.current) {
      bestStreakRef.current = streakRef.current;
      setBestStreak(bestStreakRef.current);
    }

    // 10 PTS per correct pulse hit
    scoreRef.current += 10;
    setScore(scoreRef.current);

    // ACCELERATE GRID PULSE RATE AS USER PERFORMS:
    // 1. steadyPulseDurationRef speeds up from 1600ms down to 600ms as user hits more targets.
    // 2. anomalyDurationRef accelerates proportionally (steadyDuration * 0.72).
    // 3. Timeout limit & entropy noise speed up dynamically.
    const currentHits = hitsRef.current;
    const newLevel = Math.floor(currentHits / 3) + 1;
    setSpeedLevel(newLevel);

    const newSteady = Math.max(600, 1600 - (currentHits * 40));
    steadyPulseDurationRef.current = newSteady;
    anomalyDurationRef.current = Math.max(400, Math.floor(newSteady * 0.72));
    entropyIntervalRef.current = Math.max(200, 800 - (currentHits * 25));
    timeoutLimitRef.current = Math.max(1800, 6000 - (currentHits * 150));

    if (cellsRef.current[idx]) {
      cellsRef.current[idx].hitTime = Date.now();
    }

    drillAudio?.playHit?.();
    relocateAnomaly();
  }, [relocateAnomaly]);

  // Precision Timer Loop (45s, displayed in integer seconds only)
  useEffect(() => {
    if (gameState === 'playing') {
      timerIntervalRef.current = setInterval(() => {
        localTimeRef.current -= 0.1;

        if (localTimeRef.current <= 0) {
          localTimeRef.current = 0;
          setLocalTimeRemaining(0);
          endGame();
          clearInterval(timerIntervalRef.current);
          return;
        }
        setLocalTimeRemaining(localTimeRef.current);
      }, 100);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState, endGame]);

  // Pointer Down on Canvas
  const handlePointerDown = useCallback((e) => {
    if (e) {
      e.stopPropagation();
    }
    const now = performance.now();
    if (now - lastClickTimeRef.current < 120) return;
    lastClickTimeRef.current = now;

    if (!isActiveRef.current) return;
    const cvs = canvasRef.current;
    if (!cvs) return;

    const r = cvs.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;

    const minDim = Math.min(cvs.width, cvs.height);
    const gridDimension = minDim * 0.90;
    const cellW = gridDimension / GRID_COLS;

    const offsetX = (cvs.width - gridDimension) / 2;
    const offsetY = (cvs.height - gridDimension) / 2;

    const col = Math.floor((cx - offsetX) / cellW);
    const row = Math.floor((cy - offsetY) / cellW);

    if (col >= 0 && col < GRID_COLS && row >= 0 && row < GRID_ROWS) {
      const idx = row * GRID_COLS + col;
      if (idx === anomalyIndexRef.current) {
        handleHit(idx);
      } else {
        if (cellsRef.current[idx]) cellsRef.current[idx].missTime = Date.now();
        handlePenalty('miss');
      }
    }
  }, [handleHit, handlePenalty]);

  // Canvas High-Performance Render Loop with Accelerating Pulse Frequencies
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const updateSize = () => {
      const ct = containerRef.current;
      if (!ct) return;
      const cr = ct.getBoundingClientRect();
      const w = cr.width;
      const h = cr.height;
      cvs.width = w;
      cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      cvs.style.position = 'absolute';
      cvs.style.left = `0px`;
      cvs.style.top = `0px`;
    };

    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateSize);
    updateSize();

    function draw() {
      if (!isActiveRef.current) return;
      const now = performance.now();

      ctx.fillStyle = "#020202";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      const minDim = Math.min(cvs.width, cvs.height);
      const gridDimension = minDim * 0.90;
      const cellW = gridDimension / GRID_COLS;

      const offsetX = (cvs.width - gridDimension) / 2;
      const offsetY = (cvs.height - gridDimension) / 2;

      const steadyDur = steadyPulseDurationRef.current;
      const anomalyDur = anomalyDurationRef.current;

      const steadyPhase = (now % steadyDur) / steadyDur;
      const anomalyPhase = (now % anomalyDur) / anomalyDur;

      const steadyIntensity = Math.pow(Math.sin(steadyPhase * Math.PI), 6);
      const anomalyIntensity = Math.pow(Math.sin(anomalyPhase * Math.PI), 6);

      const getRGB = (intensity, peakAdd) => {
        const v = Math.floor(10 + peakAdd * intensity);
        return `rgb(${v}, ${v}, ${v})`;
      };

      const steadyColor = getRGB(steadyIntensity, 16);
      const anomalyColor = getRGB(anomalyIntensity, 32);

      // Handle Entropy Scrambling
      if (now - lastEntropyTimeRef.current > entropyIntervalRef.current) {
        for (let k = 0; k < 3; k++) {
          const rIdx = Math.floor(Math.random() * TOTAL_CELLS);
          if (cellsRef.current[rIdx]) {
            cellsRef.current[rIdx].entropyTime = now;
          }
        }
        lastEntropyTimeRef.current = now;
      }

      // Handle Timeout check
      if (now - anomalySpawnTimeRef.current > timeoutLimitRef.current) {
        handlePenalty('timeout');
      }

      const sysTime = Date.now();

      // Draw Grid
      for (let i = 0; i < TOTAL_CELLS; i++) {
        const col = i % GRID_COLS;
        const row = Math.floor(i / GRID_COLS);

        const cx = offsetX + col * cellW;
        const cy = offsetY + row * cellW;

        const cell = cellsRef.current[i];
        if (!cell) continue;

        let bgColor = i === anomalyIndexRef.current ? anomalyColor : steadyColor;

        const hitDelta = sysTime - cell.hitTime;
        const missDelta = sysTime - cell.missTime;
        const entropyDelta = now - cell.entropyTime;

        if (hitDelta < 400) {
          bgColor = "rgba(168,85,247,0.6)"; // Bright Purple
        } else if (missDelta < 400) {
          bgColor = "rgba(239,68,68,0.6)"; // Bright Red
        } else if (entropyDelta < 150) {
          bgColor = "rgba(255,255,255,0.04)"; // Visual flicker distraction
        }

        ctx.fillStyle = bgColor;
        ctx.fillRect(cx + 2, cy + 2, cellW - 4, cellW - 4);

        ctx.strokeStyle = "rgba(255,255,255,0.02)";
        ctx.lineWidth = 1;
        ctx.strokeRect(cx + 2, cy + 2, cellW - 4, cellW - 4);
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
      ro.disconnect();
    };
  }, [gameState, handlePenalty]);

  // Enter Drill (Start Countdown -> Playing)
  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    clearGameTimeouts();

    drillAudio?.init?.();

    setIsNewBest(false);
    setScore(0);
    scoreRef.current = 0;
    setStreak(0);
    streakRef.current = 0;
    bestStreakRef.current = 0;
    hitsRef.current = 0;
    missesRef.current = 0;
    setSuccessfulHits(0);
    setMissedHits(0);
    setTimeouts(0);
    setSpeedLevel(1);
    localTimeRef.current = DRILL_DURATION;
    setLocalTimeRemaining(DRILL_DURATION);

    steadyPulseDurationRef.current = 1600;
    anomalyDurationRef.current = 1100;
    entropyIntervalRef.current = 800;
    timeoutLimitRef.current = 6000;

    initGrid();

    // Auto Fullscreen on Start
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (e) {}

    // Countdown sequence: 3 -> 2 -> 1 -> GO
    setGameState('countdown');
    setCountdownValue(3);
    drillAudio?.playCountdownTick?.();

    const t1 = setTimeout(() => {
      setCountdownValue(2);
      drillAudio?.playCountdownTick?.();
    }, 700);

    const t2 = setTimeout(() => {
      setCountdownValue(1);
      drillAudio?.playCountdownTick?.();
    }, 1400);

    const t3 = setTimeout(() => {
      setCountdownValue('GO');
      drillAudio?.playGo?.();
    }, 2100);

    const t4 = setTimeout(() => {
      isActiveRef.current = true;
      startingRef.current = false;
      setGameState('playing');
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [clearGameTimeouts, initGrid]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly';
    try {
      const canvas = generateShareCard({
        score,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '⚡' },
        newBest: isNewBest,
        drillName: 'Rhythm Anomaly Pro (45s)',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${score} PTS (Grade ${analytics.grade?.letter || 'C'} - ${analytics.grade?.label || 'Good'}) on Rhythm Anomaly Pro (45s)! Accuracy: ${analytics.accuracy}%. Try it: ${url}`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Rhythm Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [score, bestScore, analytics, isNewBest]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── HEADER / BREADCRUMB ── */}
      {!isFullscreen && (
        <header className="border-b border-white/5 bg-[#080811]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/drills/visual" className="hover:text-white transition-colors">Visual</Link>
              <span>/</span>
              <span className="text-purple-400 font-medium">Rhythm Anomaly</span>
            </div>

            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                drillAudio?.setEnabled?.(next);
              }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={soundEnabled ? "Mute Sound" : "Unmute Sound"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4 text-red-400" />}
            </button>
          </div>
        </header>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
              RHYTHM ANOMALY
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              45-Second Visual Temporal Perception & Flicker Discrimination
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-purple-400 tabular-nums">{score}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${localTimeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {Math.ceil(localTimeRemaining)}s
              </div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Level</div>
              <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">L{speedLevel}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Score</div>
              <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums">{bestScore}</div>
            </div>
          </div>
        )}

        {/* Game Stage Container */}
        <GameErrorBoundary>
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
            {/* DOM Flash Overlay */}
            <DrillFlashOverlay flashes={flashes} />

            {/* IN-BOX OVERLAY HUD — Timer formatted in integer seconds only */}
            {(gameState === 'playing' || gameState === 'countdown') && (
              <>
                <div className="absolute top-4 left-4 z-30 pointer-events-none">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{score}</p>
                </div>

                <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time</p>
                  <p className={`text-2xl sm:text-3xl font-bold tabular-nums leading-tight ${localTimeRemaining <= 10 ? 'text-red-400' : 'text-white'}`}>{Math.ceil(localTimeRemaining)}s</p>
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
                    drillAudio?.setEnabled?.(!v);
                    return !v;
                  });
                }}
                className="absolute bottom-4 right-4 z-40 p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            )}

            {/* CANVAS GAMEPLAY AREA */}
            {gameState === 'playing' && (
              <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-5 w-full h-full relative z-20 overflow-hidden my-auto">
                
                {/* CANVAS VIEWPORT */}
                <div className="relative w-full h-full flex items-center justify-center my-auto">
                  <canvas 
                    ref={canvasRef} 
                    onPointerDown={handlePointerDown}
                    className="cursor-pointer touch-none"
                  />
                </div>

              </div>
            )}

            {/* START CARD */}
            {gameState === 'start' && (
              <FpsStartCard
                icon={Zap}
                accent="purple"
                title="Rhythm Anomaly"
                subtitle="Visual Temporal Perception • Flicker Discrimination"
                rules={[
                  { icon: Target, accent: 'purple', title: 'Find Anomaly Cell', text: 'Identify the grid cell pulsing at an off-beat rhythm anomaly (+10 PTS)' },
                  { icon: Zap, accent: 'indigo', title: 'Visual Temporal Perception', text: 'Grid pulse speeds up and flicker phase differences tighten as level rises' },
                ]}
                stats={[
                  { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                  { icon: TrendingUp, label: 'Best Streak', value: `${bestStreak}x`, color: 'text-purple-400', accent: 'blue' },
                ]}
                isTouchOnlyDevice={false}
                onStart={enterDrill}
              />
            )}

            {/* COUNTDOWN OVERLAY */}
            {gameState === 'countdown' && (
              <DrillCountdown value={countdownValue} subtitle="GET READY" accent="#a855f7" />
            )}

            {/* END SCREEN (RESULT GRADES MODAL) */}
            {gameState === 'gameOver' && analytics.grade && (
              <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
                
                {/* Left 36% Grade Panel */}
                <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(168,85,247,.12), transparent 70%)' }}>
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
                    {score}
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
                      <p className="text-sm sm:text-base font-black text-white">Lvl {analytics.finalLevel}</p>
                      <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Level</p>
                    </div>
                    <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                      <p className="text-sm sm:text-base font-black text-purple-400">{analytics.maxCombo}x</p>
                      <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Max Streak</p>
                    </div>
                    <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                      <p className="text-sm sm:text-base font-black text-emerald-400">{analytics.perfectHits}</p>
                      <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Hits</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        enterDrill();
                      }} 
                      className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5 relative z-50 pointer-events-auto"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Play Again
                    </button>
                    <button 
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        shareScore();
                      }} 
                      className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform relative z-50 pointer-events-auto" 
                      title="Share Score"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button 
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExitDrill();
                      }} 
                      className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform relative z-50 pointer-events-auto" 
                      title="Return to Options"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        </GameErrorBoundary>

        {/* ACCORDION 1: DRILL INSTRUCTIONS & SCORING */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
            <DrillAccordion
              id="rules"
              title="Drill Instructions & Scoring System"
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DrillRuleItem num="1" text="Find Faster Pulsing Cell" highlight="+10 PTS" result="Anomaly Match" />
                <DrillRuleItem num="2" text="Entropy Scramble" highlight="Random Cells Flicker" result="Background distractor noise" />
                <DrillRuleItem num="3" text="Miss / Timeout" highlight="Zero Penalties" result="No score or time loss" />
                <DrillRuleItem num="4" text="Accelerating Grid Tempo" highlight="Faster Pulses" result="Whole grid pulses faster as level rises" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Rhythm Anomaly Pro"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-400" /> What Is Rhythm Anomaly Training?
                  </h4>
                  <p className="text-sm leading-relaxed mb-3">
                    <strong>Rhythm Anomaly Training</strong> is a specialized visual temporal perception drill designed to test out-of-sync motion discrimination. The <strong>Rhythm Anomaly drill</strong> displays a 6x6 matrix of 36 pulsing cells, challenging your visual system to detect the single cell pulsing at a higher temporal frequency than the surrounding grid over a <strong>45-second session</strong>.
                  </p>
                  <p className="text-sm leading-relaxed">
                    By practicing <strong>peripheral temporal discrimination</strong>, you improve your ability to spot micro-movements, flickers, and timing anomalies across wide visual fields.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">FPS gamers spotting subtle peripheral movements, pilots & drivers improving motion anomaly detection, and visual athletes.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Visual temporal discrimination, peripheral motion perception, micro-flicker detection, and visual attention stamina.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Soft-Focus Technique</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Avoid hard-focusing on individual cells. Soft-focus your eyes over the entire grid so temporal anomalies jump out automatically.</p>
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
                <DrillFAQItem q="What is the Rhythm Anomaly Drill?" a="A free visual temporal discrimination exercise. 6x6 grid of 36 pulsing cells. Find the cell pulsing at a faster frequency than the steady grid rhythm." />
                <DrillFAQItem q="Are there negative score or time penalties?" a="No. Each round is a fixed 45 seconds. Correct hits earn +10 PTS; misclicks and timeouts reset your current streak, but never deduct score points or reduce remaining timer seconds." />
                <DrillFAQItem q="How does speed scaling work?" a="Consecutive hits increase the speed level, accelerating the overall grid pulse frequency and tightening timeout limits." />
                <DrillFAQItem q="What is the random cell flicker I sometimes see?" a="That's the entropy scramble — a handful of random non-target cells flash briefly as background visual noise." />
                <DrillFAQItem q="Does difficulty decrease on mistakes?" a="No. Your level only ever goes up — a mistake never takes you back down, so you can safely master your current speed." />
                <DrillFAQItem q="How long does each drill session last?" a="Each round is timed for exactly 45 seconds of continuous focus." />
                <DrillFAQItem q="Do I need to sign up?" a="No registration required. This drill runs directly in your browser with instant response." />
              </div>
            </DrillAccordion>
          </div>
        )}

        {/* RELATED DRILLS GRID */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              Related Visual Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {RELATED_DRILLS.map((drill) => (
                <Link
                  key={drill.id}
                  href={drill.href}
                  className="group bg-[#0c0c16] border border-white/5 hover:border-purple-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-purple-400 mt-3 flex items-center gap-1 transition-colors">
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
