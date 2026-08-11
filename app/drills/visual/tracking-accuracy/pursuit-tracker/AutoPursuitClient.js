'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Volume2, VolumeX,
  Play, RefreshCw, Crosshair,
  Share2, LogOut, RotateCw, Eye, Users, TrendingUp, Zap, ZapOff, Brain, Move, AlertTriangle, Trophy, Target
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { drillFlash } from '../../../../../lib/drillFlash';
import { getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import { drawTacticalTarget } from '../../../../../lib/canvasFx';
import useDrillFlash from '../../../../../lib/useDrillFlash';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import DrillFlashOverlay from '../../../../../components/drill/DrillFlashOverlay';
import DrillRuleItem from '../../../../../components/drill/DrillRuleItem';
import DrillFAQItem from '../../../../../components/drill/DrillFAQItem';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';

const DRILL_DURATION = 45; // 45 seconds duration
const ELITE_SCORE = 180; // Target score for S+ rating in 45s
const STORAGE_KEY = 'skilldrills_visual_pursuit_tracker_v2';

const RELATED_DRILLS = [
  { id: "moving-target", name: "Moving Target Pro", cat: "Visual Tracking", desc: "Kinetic visual tracking and smooth pursuit interception.", href: "/drills/visual/tracking-accuracy/moving-target" },
  { id: "multiple-targets", name: "Multiple Targets", cat: "Visual Tracking", desc: "Multi-object tracking & visual working memory.", href: "/drills/visual/tracking-accuracy/multiple-targets" },
  { id: "light-reaction", name: "Light Reaction", cat: "Reaction Speed", desc: "Test raw visual motor reaction speed.", href: "/drills/visual/reaction-speed/light-reaction" },
  { id: "go-no-go", name: "Go / No-Go", cat: "Reaction Speed", desc: "Response inhibition & selective reaction speed.", href: "/drills/visual/reaction-speed/go/no-go" },
  { id: "distance-judgment", name: "Distance Judgment Pro", cat: "Depth Perception", desc: "3D stereoscopic depth estimation & intercept timing.", href: "/drills/visual/depth-perception/distance-judgment" },
  { id: "entropic-grid", name: "Entropic Grid", cat: "Visual Recognition", desc: "Visual search speed & pattern recognition grid.", href: "/drills/visual/visual-recognition/entropic-grid" }
];

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, bestStreak: 0, totalSessions: 0 };
    return { bestScore: 0, bestStreak: 0, totalSessions: 0, ...JSON.parse(raw) };
  } catch (e) {
    return { bestScore: 0, bestStreak: 0, totalSessions: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

// ==========================================
// ERROR BOUNDARY
// ==========================================
class GameErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('Pursuit Tracker Error:', error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/95 rounded-xl z-50 border border-green-500/30">
          <div className="text-center p-6 max-w-sm">
            <AlertTriangle className="w-12 h-12 text-green-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-white text-lg font-bold mb-2">Tracking Engine Desync</h3>
            <p className="text-gray-400 text-sm mb-4">The visual engine encountered a frame error.</p>
            <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }} className="w-full py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(34,197,94,0.4)]">Reset Frame</button>
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
export default function AutoPursuitClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const { flashes, triggerFlash } = useDrillFlash();

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [streak, setStreak] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [targetSpeed, setTargetSpeed] = useState(6);

  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    trackingPulses: 0,
    failedTracking: 0,
    maxStreak: 0,
    grade: null,
  });

  // DOM & Canvas Engine Refs
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const countdownTimeoutsRef = useRef([]);
  const gameTimeoutsRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const startingRef = useRef(false);
  const gameActiveRef = useRef(false);

  // Target physics & tracking refs
  const TARGET_RADIUS = 18; 
  const targetRef = useRef({ x: 150, y: 150, vx: 5, vy: 5, radius: 18 });
  const pointerRef = useRef({ x: -1000, y: -1000 });

  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const hitFramesRef = useRef(0);
  const totalFramesRef = useRef(0);
  const continuousTrackingFramesRef = useRef(0);
  const noTrackingFramesRef = useRef(0);

  const engine = useRef({
    score: 0,
    timeLeft: DRILL_DURATION,
    trackingPulses: 0,
    failedTracking: 0,
  });

  // Load saved metrics
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestStreak(saved.bestStreak || 0);
    }
  }, []);

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
    gameActiveRef.current = false;

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    setGameState('start');
  }, [clearGameTimeouts]);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  // End Game Management
  const endGame = useCallback(() => {
    gameActiveRef.current = false;
    startingRef.current = false;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    clearGameTimeouts();
    setGameState('gameOver');

    const e = engine.current;
    const finalAccuracy = totalFramesRef.current > 0 
      ? Math.round((hitFramesRef.current / totalFramesRef.current) * 100) 
      : 100;

    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = {
      letter: rating.letter || rating.grade || 'C',
      label: rating.label || 'Keep Going',
      color: rating.color || 'text-emerald-400',
      emoji: rating.emoji || '🎯'
    };

    setAnalytics({
      accuracy: finalAccuracy,
      trackingPulses: e.trackingPulses,
      failedTracking: e.failedTracking,
      maxStreak: bestStreakRef.current,
      grade,
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const updatedData = {
      bestScore: Math.max(prevSaved.bestScore, e.score),
      bestStreak: Math.max(prevSaved.bestStreak, bestStreakRef.current),
      totalSessions: (prevSaved.totalSessions || 0) + 1,
    };
    saveData(updatedData);

    setBestScore(updatedData.bestScore);
    setBestStreak(updatedData.bestStreak);

    drillAudio?.playSessionEnd?.();
  }, [clearGameTimeouts]);

  // Pointer position listeners (hover & touch)
  const handlePointerMove = useCallback((e) => {
    if (!gameActiveRef.current) return;
    const cvs = canvasRef.current; if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
    
    pointerRef.current = {
      x: (clientX - rect.left) * (cvs.width / rect.width),
      y: (clientY - rect.top) * (cvs.height / rect.height)
    };
  }, []);

  const handlePointerDown = useCallback((e) => {
    if (!gameActiveRef.current) return;
    const cvs = canvasRef.current; if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
    
    pointerRef.current = {
      x: (clientX - rect.left) * (cvs.width / rect.width),
      y: (clientY - rect.top) * (cvs.height / rect.height)
    };
  }, []);

  const handlePointerLeave = useCallback(() => {
    pointerRef.current = { x: -1000, y: -1000 };
  }, []);

  // High Performance Render & Pursuit Physics Loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const updateSize = () => {
      const ct = containerRef.current; if (!ct) return;
      const cr = ct.getBoundingClientRect();
      const w = cr.width;
      const h = cr.height;
      cvs.width = w;
      cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
    };

    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateSize);
    updateSize();

    function draw() {
      if (!gameActiveRef.current) return;

      const w = cvs.width;
      const h = cvs.height;
      const tr = targetRef.current;
      const ptr = pointerRef.current;

      const currentRadius = Math.max(9, TARGET_RADIUS - (engine.current.score * 0.04));

      // Physics update
      tr.x += tr.vx;
      tr.y += tr.vy;

      if (Math.random() > 0.95) {
        tr.vx += (Math.random() - 0.5) * 10;
        tr.vy += (Math.random() - 0.5) * 10;
        
        const baseSpeedFromScore = 6 + (engine.current.score * 0.1);
        const maxSpd = baseSpeedFromScore + (streakRef.current * 0.5);
        const mag = Math.hypot(tr.vx, tr.vy);
        if (mag > maxSpd) {
          tr.vx = (tr.vx / mag) * maxSpd;
          tr.vy = (tr.vy / mag) * maxSpd;
        }
        setTargetSpeed(Math.round(maxSpd));
      }

      if (tr.x < currentRadius || tr.x > w - currentRadius) tr.vx *= -1;
      if (tr.y < currentRadius || tr.y > h - currentRadius) tr.vy *= -1;
      tr.x = Math.max(currentRadius, Math.min(w - currentRadius, tr.x));
      tr.y = Math.max(currentRadius, Math.min(h - currentRadius, tr.y));

      // Pursuit Tracking Logic
      totalFramesRef.current++;
      const dist = Math.hypot(ptr.x - tr.x, ptr.y - tr.y);
      const isTracked = dist < currentRadius + 35; // Generous touch padding

      if (isTracked) {
        hitFramesRef.current++;
        noTrackingFramesRef.current = 0;
        continuousTrackingFramesRef.current++;

        if (continuousTrackingFramesRef.current >= 60) { // ~1 Second Continuous Tracking
          continuousTrackingFramesRef.current = 0;
          
          engine.current.trackingPulses++;
          streakRef.current++;
          setStreak(streakRef.current);
          if (streakRef.current > bestStreakRef.current) bestStreakRef.current = streakRef.current;

          engine.current.score += 5;
          setUiScore(engine.current.score);

          drillAudio?.playHit?.();
        }
      } else {
        continuousTrackingFramesRef.current = 0; // Break pulse streak
        noTrackingFramesRef.current++;

        if (noTrackingFramesRef.current >= 120) { // >2 Seconds No Tracking
          noTrackingFramesRef.current = 0;
          
          streakRef.current = 0; // Reset streak without score loss
          setStreak(0);
          engine.current.failedTracking++;

          drillAudio?.playPenalty?.();
          triggerFlash();
        }
      }

      // Render Stage Background
      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "rgba(255,255,255,0.02)";
      for (let x = 0; x < w; x += 50) ctx.fillRect(x, 0, 1, h);
      for (let y = 0; y < h; y += 50) ctx.fillRect(0, y, w, 1);

      // Draw Canonical Tactical Target Sphere (Matching moving-target style)
      drawTacticalTarget(ctx, tr.x, tr.y, currentRadius, isTracked ? "#10b981" : "#f97316", true);

      // Draw Lock-On Circular Progress Ring around target when tracked
      if (isTracked) {
        const progressAngle = (continuousTrackingFramesRef.current / 60) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(tr.x, tr.y, currentRadius + 8, -Math.PI / 2, -Math.PI / 2 + progressAngle);
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }


      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
      ro.disconnect();
    };
  }, [gameState, triggerFlash]);

  // Enter Drill (Start Countdown -> Playing)
  const enterDrill = useCallback(() => {
    if (startingRef.current) return;
    startingRef.current = true;

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    clearGameTimeouts();

    drillAudio?.init?.();

    setIsNewBest(false);
    setUiScore(0);
    setUiTimeLeft(DRILL_DURATION);
    setStreak(0);

    streakRef.current = 0;
    bestStreakRef.current = 0;
    hitFramesRef.current = 0;
    totalFramesRef.current = 0;
    continuousTrackingFramesRef.current = 0;
    noTrackingFramesRef.current = 0;

    engine.current = {
      score: 0,
      timeLeft: DRILL_DURATION,
      trackingPulses: 0,
      failedTracking: 0,
    };

    // Auto Fullscreen on Start (non-blocking)
    if (containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    }

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
      gameActiveRef.current = true;
      startingRef.current = false;
      setGameState('playing');

      const cvs = canvasRef.current;
      if (cvs) {
        targetRef.current.x = cvs.width / 2;
        targetRef.current.y = cvs.height / 2;
        const angle = Math.random() * Math.PI * 2;
        targetRef.current.vx = Math.cos(angle) * 6;
        targetRef.current.vy = Math.sin(angle) * 6;
      }

      // Start 45s decimal timer
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      let lastTime = performance.now();

      timerIntervalRef.current = setInterval(() => {
        const now = performance.now();
        const deltaSec = (now - lastTime) / 1000;
        lastTime = now;

        const eRef = engine.current;
        if (eRef.timeLeft > 0) {
          eRef.timeLeft = Math.max(0, eRef.timeLeft - deltaSec);
          setUiTimeLeft(Math.ceil(eRef.timeLeft));
        }

        if (eRef.timeLeft <= 0) {
          eRef.timeLeft = 0;
          setUiTimeLeft(0);
          endGame();
        }
      }, 100);
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [clearGameTimeouts, endGame]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Smooth Pursuit Tracker (45s)',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I achieved Grade ${analytics.grade?.letter || 'C'} (${analytics.grade?.label || 'Good'}) with ${uiScore} PTS and ${analytics.accuracy}% accuracy on Smooth Pursuit Tracker (45s)! Try it: ${url}`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Pursuit Tracking Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
              PURSUIT TRACKER PRO
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              45-Second Continuous Smooth Pursuit Visual Tracking
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-base sm:text-lg font-black text-emerald-400 tabular-nums">{uiScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Streak</div>
              <div className="text-base sm:text-lg font-black text-emerald-300 tabular-nums">{streak}x</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-base sm:text-lg font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {uiTimeLeft}s
              </div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Score</div>
              <div className="text-base sm:text-lg font-black text-amber-400 tabular-nums">{bestScore}</div>
            </div>
          </div>
        )}

        {/* Game Stage Container */}
        <GameErrorBoundary>
          <div 
            ref={containerRef} 
            className={
              isFullscreen ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] flex flex-col items-center justify-center' : 'w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] max-md:portrait:aspect-[3/4] max-md:portrait:min-h-[420px] max-md:portrait:max-h-[76vh] max-md:landscape:min-h-[340px] max-md:landscape:max-h-[85vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col'
            }
          >
            {/* Red Flash Overlay */}
            <DrillFlashOverlay flashes={flashes} />

            {/* IN-BOX OVERLAY HUD */}
            {gameState === 'playing' && (
              <>
                <div className="absolute top-4 left-4 z-30 pointer-events-none">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                  <p className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-tight">{uiScore}</p>
                </div>
                <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time Left</p>
                  <p className={`text-2xl sm:text-3xl font-black tabular-nums leading-tight ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</p>
                </div>
              </>
            )}

            {/* IN-GAME HUD SOUND + FLASH TOGGLES */}
            {gameState === 'playing' && (
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

            {/* CANVAS */}
            <canvas
              ref={canvasRef}
              onPointerMove={handlePointerMove}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerLeave}
              onPointerLeave={handlePointerLeave}
              className="block absolute top-0 left-0 w-full h-full z-10 cursor-pointer touch-none"
            />

            {/* START CARD */}
            {gameState === 'start' && (
              <FpsStartCard
                icon={Crosshair}
                accent="emerald"
                title="Pursuit Tracker Pro"
                subtitle="Smooth Pursuit Eye Movement • Aim Latency"
                rules={[
                  { icon: Target, accent: 'emerald', title: 'Track Moving Orb', text: 'Maintain continuous cursor alignment over moving target orb (+5 PTS/s)' },
                  { icon: Zap, accent: 'amber', title: 'Accelerating Speed', text: 'Orb velocity escalates continuously as tracking streak increases' },
                ]}
                stats={[
                  { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                  { icon: TrendingUp, label: 'Best Streak', value: `${bestStreak}s`, color: 'text-emerald-400', accent: 'blue' },
                ]}
                isTouchOnlyDevice={false}
                onStart={enterDrill}
              />
            )}

            {/* COUNTDOWN OVERLAY */}
            {gameState === 'countdown' && (
              <DrillCountdown value={countdownValue} subtitle="GET READY" />
            )}

            {/* END SCREEN — OPTIMIZED RESULTS DISPLAY (MATCHING MOVING-TARGET) */}
            {gameState === 'gameOver' && analytics.grade && (
              <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
                
                {/* Left Grade Panel */}
                <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(34,197,94,.12), transparent 70%)' }}>
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
                      <p className="text-sm sm:text-base font-black text-emerald-400">{analytics.trackingPulses}</p>
                      <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Pulses</p>
                    </div>
                    <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                      <p className="text-sm sm:text-base font-black text-red-400">{analytics.failedTracking}</p>
                      <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Lost Links</p>
                    </div>
                    <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                      <p className="text-sm sm:text-base font-black text-amber-400">{bestScore}</p>
                      <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Best Score</p>
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
                      className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5 relative z-50 pointer-events-auto"
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

        {/* ACCORDIONS */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
            <DrillAccordion
              id="rules"
              title="Drill Instructions & Scoring System"
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DrillRuleItem num="1" text="Sustained Tracking (1s)" highlight="+5 PTS" result="Maintain Cursor Contact" />
                <DrillRuleItem num="2" text="Progressive Difficulty" highlight="Faster & Smaller" result="Orb speed rises, hitbox shrinks" />
                <DrillRuleItem num="3" text="Lost Tracking (>2s)" highlight="Zero Penalties" result="Streak resets, no score or time loss" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Pursuit Tracker Pro"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-emerald-400" /> What Is Smooth Pursuit Tracking?
                  </h4>
                  <p className="text-sm leading-relaxed mb-3">
                    <strong>Smooth Pursuit Training</strong> measures how accurately your eyes and cursor can continuously follow a moving object, rather than reacting to a single discrete event. The <strong>Pursuit Tracker drill</strong> presents an orb that accelerates and changes direction unpredictably, requiring your cursor to stay locked onto it in real time over a <strong>45-second round</strong>.
                  </p>
                  <p className="text-sm leading-relaxed">
                    Unlike discrete reaction tests, this continuously scores how much of every second your cursor stays in contact with the target — building the sustained visual-motor coordination used in tracking moving objects, opponents, or vehicles.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">FPS gamers tracking moving opponents, racket-sport athletes following a ball, and anyone training sustained visual-motor coordination.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Smooth pursuit eye movement, continuous cursor tracking, velocity prediction, and sustained visual attention.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Tracking Tip</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Anticipate the orb's next direction rather than chasing its current position — it changes speed and heading without warning.</p>
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
                <DrillFAQItem q="What is the Smooth Pursuit Tracker?" a="An interactive tool to train and assess smooth pursuit eye movement and hand-eye alignment by maintaining a cursor on a moving visual target." />
                <DrillFAQItem q="How is the performance score calculated?" a="You earn +5 PTS every time you keep your cursor locked onto the moving target for a full continuous second." />
                <DrillFAQItem q="How does difficulty scale?" a="As your score and streak increase, the orb's maximum speed rises and its hitbox shrinks slightly — with no hard ceiling on either, so the challenge keeps building the longer you last." />
                <DrillFAQItem q="Are there negative score or time penalties?" a="No. Losing the target for more than 2 seconds resets your streak, but you never lose accrued score points or remaining timer seconds." />
                <DrillFAQItem q="How long does each drill session last?" a="Each round is timed for exactly 45 seconds of continuous tracking." />
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
                  className="group bg-[#0c0c16] border border-white/5 hover:border-emerald-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-emerald-400 mt-3 flex items-center gap-1 transition-colors">
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
