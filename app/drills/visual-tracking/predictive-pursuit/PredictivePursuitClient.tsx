'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Play, RefreshCw, Timer, Share2, LogOut, Check, Sun, Moon, Volume2, VolumeX,
  Target, Trophy, TrendingUp, Zap
} from 'lucide-react';

import DrillFooter from '../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import ZigZagPathPursuitStartCard from '../../../../components/drill/ZigZagPathPursuitStartCard';
import { drillAudio } from '../../../../lib/drillAudio';
import { drawTacticalTarget } from '../../../../lib/canvasFx';
import { generateSessionCard, shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import useUnexpectedExitGuard from '../../../../lib/useUnexpectedExitGuard';

const STORAGE_KEY = 'skilldrills_visual_tracking_predictive_pursuit_v2';

const RELATED_DRILLS = [
  { id: "constant-slow-pursuit", name: "Constant Slow Pursuit", cat: "Visual Tracking", desc: "Condition smooth pursuit tracking along continuous Lissajous curves.", href: "/drills/visual-tracking/constant-slow-pursuit" },
  { id: "directional-chaos-pursuit", name: "Directional Chaos Pursuit", cat: "Visual Tracking", desc: "Complex multi-directional visual tracking with sudden direction shifts.", href: "/drills/visual-tracking/directional-chaos-pursuit" },
  { id: "dynamic-evasion-pursuit", name: "Dynamic Evasion Pursuit", cat: "Visual Tracking", desc: "Re-acquire targets executing rapid evasive directional changes.", href: "/drills/visual-tracking/dynamic-evasion-pursuit" },
  { id: "180-degree-awareness", name: "180° Awareness Pro", cat: "FPS Awareness", desc: "Master 180-degree snap turn awareness for CS2 & Valorant.", href: "/drills/fps/180-degree-awareness" },
  { id: "strafe-tracking", name: "Strafe Tracking", cat: "FPS Tracking", desc: "Smooth pursuit tracking against erratic horizontal targets.", href: "/drills/fps/strafe-tracking" },
  { id: "recoil-control", name: "Recoil Control", cat: "FPS Recoil", desc: "Calibrate pulling pattern compensation for weapons.", href: "/drills/fps/recoil-control" }
];

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { totalSessions: 0 };
    return { totalSessions: 0, ...JSON.parse(raw) };
  } catch (e) {
    return { totalSessions: 0 };
  }
};

const saveData = (data: { totalSessions: number }) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

export default function PredictivePursuitClient() {
  const [gameState, setGameState] = useState<'start' | 'countdown' | 'playing' | 'gameOver'>('start');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [countdownValue, setCountdownValue] = useState<number | string>(3);
  const [dayMode, setDayMode] = useState<boolean>(false); // Day Mode (White BG) / Night Mode (Dark BG)

  // User Settings States (ALL INITIALLY OFF BY DEFAULT)
  const [selectedDuration, setSelectedDuration] = useState<number>(60); // 30, 45, 60, 90, 120 seconds
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0); // 0.5x to 9.0x
  const [targetSize, setTargetSize] = useState<number>(16); // 10px to 50px
  const [targetColor, setTargetColor] = useState<string>('#ef4444'); // Default Cyber Red
  const [mathInvisible, setMathInvisible] = useState<boolean>(false); // OFF initially
  const [randomSpeed, setRandomSpeed] = useState<boolean>(false); // OFF initially
  const [trailEffect, setTrailEffect] = useState<boolean>(false); // OFF initially
  const [glowEffect, setGlowEffect] = useState<boolean>(true); // ON by default — matches barrier-sequence-pursuit's target look
  const [scanlinesActive, setScanlinesActive] = useState<boolean>(false); // OFF initially

  // Session Stats
  const [uiTimeLeft, setUiTimeLeft] = useState<number>(60);
  const [totalTrials, setTotalTrials] = useState<number>(0);

  // DOM & Physics Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const countdownTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const trackingState = useRef({
    travelT: 0,
    travel: 0,
    landed: 0,
    sx: 0,
    sy: 0,
    tx: 0,
    ty: 0,
    trail: [] as { x: number; y: number }[]
  });

  const settingsRef = useRef({
    speedMultiplier,
    targetSize,
    targetColor,
    mathInvisible,
    randomSpeed,
    trailEffect,
    glowEffect,
    scanlinesActive,
    dayMode
  });

  useEffect(() => {
    settingsRef.current = {
      speedMultiplier,
      targetSize,
      targetColor,
      mathInvisible,
      randomSpeed,
      trailEffect,
      glowEffect,
      scanlinesActive,
      dayMode
    };
  }, [speedMultiplier, targetSize, targetColor, mathInvisible, randomSpeed, trailEffect, glowEffect, scanlinesActive, dayMode]);

  // Mobile Detection & Saved Stats Loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const ua = navigator.userAgent || '';
        const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || (window.innerWidth < 768);
        setIsMobile(mobileCheck);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);

      const saved = getSavedData();
      setTotalTrials(saved.totalSessions || 0);

      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Fullscreen Change Listener
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Cleanup Timeouts on Unmount
  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const sharePage = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/visual-tracking/predictive-pursuit';
    try {
      const canvas = generateSessionCard({
        drillName: 'Predictive Pursuit',
        badgeText: 'Smooth Pursuit Calibrated',
        stats: [
          { label: 'Session Time', value: `${selectedDuration}s` },
          { label: 'Base Speed', value: `${speedMultiplier.toFixed(1)}x` },
          { label: 'Math Line', value: mathInvisible ? 'Invisible' : 'Visible' },
          { label: 'Speed Acceleration', value: randomSpeed ? 'Enabled' : 'Fixed' },
        ],
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = 'Predictive Pursuit — Free Visual Tracking & Gaze Calibration Drill!';
      if (typeof navigator !== 'undefined' && navigator.share) {
        try {
          await navigator.share({ title: 'Predictive Pursuit Drill', text, url });
        } catch (e) {}
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(url);
        alert('Drill link copied to clipboard!');
      }
    }
  }, [selectedDuration, speedMultiplier, mathInvisible, randomSpeed]);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    setGameState('start');
  }, []);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  // Complete Drill Session cleanly
  const endGame = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    setGameState('gameOver');
    // Fullscreen is preserved on result display until user clicks Exit/Return button

    setTotalTrials((prev) => {
      const next = prev + 1;
      saveData({ totalSessions: next });
      return next;
    });
    drillAudio.playSessionEnd();
  }, []);

  // Enter Drill (Auto Fullscreen -> 321GO Countdown with Sound -> Playing)
  const enterDrill = useCallback(async () => {
    // 1. Auto Fullscreen on Start
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (e) {}

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    drillAudio.init();

    setUiTimeLeft(selectedDuration);

    const cvs = canvasRef.current;
    const w = cvs ? cvs.width : 800;
    const h = cvs ? cvs.height : 450;
    trackingState.current = {
      travelT: 0,
      travel: 1.5,
      landed: 0,
      sx: w * 0.2,
      sy: h * 0.5,
      tx: w * 0.8,
      ty: h * 0.5,
      trail: []
    };

    // Countdown sequence: 3 -> 2 -> 1 -> GO with Audio Cues
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

      // Start 1-second Interval Timer
      let remaining = selectedDuration;
      timerIntervalRef.current = setInterval(() => {
        remaining -= 1;
        setUiTimeLeft(remaining);
        if (remaining <= 0) {
          endGame();
        }
      }, 1000);

    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [selectedDuration, endGame]);

  // Canvas Render Loop (Predictive Pursuit Physics)
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current;
    const container = containerRef.current;
    if (!cvs || !container) return;

    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cvs.width = rect.width * dpr;
      cvs.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(container);

    let lastTime = performance.now();

    const draw = (ts: number) => {
      const deltaTimeMs = ts - lastTime;
      lastTime = ts;
      const dt = Math.min(deltaTimeMs / 1000, 0.1);

      const rect = container.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      const { speedMultiplier, targetSize, targetColor, mathInvisible, randomSpeed, trailEffect, glowEffect, scanlinesActive, dayMode: isDay } = settingsRef.current;

      // Calculate dynamic speed multiplier with random acceleration if enabled
      let effectiveSpeed = speedMultiplier;
      if (randomSpeed) {
        const sec = ts / 1000;
        const perturb = 0.5 + 0.4 * Math.sin(sec * 1.7) * Math.cos(sec * 0.9) + 0.3 * Math.sin(sec * 3.2);
        effectiveSpeed = speedMultiplier * (0.6 + perturb * 1.1);
      }

      const scaledDt = dt * effectiveSpeed;

      // Clear Canvas Background (Pure White in Day Mode `#ffffff`, Deep Black in Night Mode `#050508`)
      ctx.fillStyle = isDay ? '#ffffff' : '#050508';
      ctx.fillRect(0, 0, W, H);

      // Render subtle background grid
      ctx.strokeStyle = isDay ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Render Predicted Trajectory Path Vector ONLY if math is NOT invisible
      if (!mathInvisible) {
        ctx.strokeStyle = isDay ? 'rgba(2, 132, 199, 0.45)' : 'rgba(56, 189, 248, 0.22)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(trackingState.current.sx, trackingState.current.sy);
        ctx.lineTo(trackingState.current.tx, trackingState.current.ty);
        ctx.stroke();
      }

      // Update Predictive Trajectory State
      trackingState.current.travelT += scaledDt;
      const cycleTime = randomSpeed ? 1.8 + Math.random() * 1.2 : 2.2;

      if (trackingState.current.travelT > cycleTime) {
        trackingState.current.travel = 1.5;
        trackingState.current.travelT = 0;
        trackingState.current.landed = 0;
        trackingState.current.tx = targetSize * 2 + Math.random() * (W - targetSize * 4);
        trackingState.current.ty = H * 0.2 + Math.random() * (H * 0.6);
      }

      if (trackingState.current.travel > 0) {
        trackingState.current.travel -= scaledDt;
        trackingState.current.sx += (trackingState.current.tx - trackingState.current.sx) * scaledDt * 3.5;
        trackingState.current.sy += (trackingState.current.ty - trackingState.current.sy) * scaledDt * 3.5;
      } else {
        trackingState.current.landed = 0.3;
      }

      // Gaze Trail Effect
      if (trailEffect) {
        const trail = trackingState.current.trail;
        trail.push({ x: trackingState.current.sx, y: trackingState.current.sy });
        if (trail.length > 12) trail.shift();

        for (let i = 0; i < trail.length; i++) {
          const pt = trail[i];
          const alpha = ((i + 1) / trail.length) * 0.3;
          ctx.fillStyle = targetColor;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, targetSize * (0.3 + 0.6 * (i / trail.length)), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;
      }

      drawTacticalTarget(ctx, trackingState.current.sx, trackingState.current.sy, targetSize, targetColor, glowEffect);

      // CRT Scanlines Overlay
      if (scanlinesActive) {
        ctx.fillStyle = isDay ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.015)';
        for (let i = 0; i < H; i += 4) {
          ctx.fillRect(0, i, W, 1.5);
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      ro.disconnect();
    };
  }, [gameState]);

  const colorPresets = [
    { name: 'Cyber Red', value: '#ef4444' },
    { name: 'Emerald Green', value: '#10b981' },
    { name: 'Neon Blue', value: '#38bdf8' },
    { name: 'Laser Orange', value: '#f97316' },
    { name: 'High-Vis Yellow', value: '#eab308' },
    { name: 'Pure White', value: '#ffffff' }
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-red-400 bg-clip-text text-transparent">
              PREDICTIVE PURSUIT
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Trajectory Interpolation & Vector Landing Prediction
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Status</div>
              <div className="text-lg sm:text-xl font-black text-red-400 tabular-nums">
                {gameState === 'playing' ? 'TRACKING' : gameState === 'gameOver' ? 'COMPLETE' : 'STANDBY'}
              </div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time Left</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 && gameState === 'playing' ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {uiTimeLeft}s
              </div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Speed</div>
              <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">{speedMultiplier.toFixed(1)}x</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Sessions</div>
              <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums">{totalTrials}</div>
            </div>
          </div>
        )}

        {/* Game Stage Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden flex flex-col transition-all duration-150 select-none border border-white/10 ${
            dayMode ? 'bg-[#ffffff]' : 'bg-[#080811]'
          } ${dayMode ? 'text-slate-900' : 'text-white'} ${
            isFullscreen ? 'fixed inset-0 z-[100] w-screen h-[100dvh] rounded-none border-none flex flex-col items-center justify-center' : 'w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] max-md:aspect-[3/4] max-md:min-h-[420px] max-md:max-h-[76vh] relative overflow-hidden flex flex-col'
          }`}
        >

          {/* IN-BOX OVERLAY HUD: ONLY TIMER WHEN PLAYING */}
          {gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
              <p className={`text-3xl sm:text-4xl font-black font-sans tabular-nums leading-none ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : (dayMode ? 'text-slate-900' : 'text-white/90')}`}>
                {uiTimeLeft}s
              </p>
            </div>
          )}

          {/* CANVAS */}
          <canvas 
            ref={canvasRef} 
            className="block absolute top-0 left-0 w-full h-full z-10 pointer-events-none" 
          />

          {/* START CARD */}
          {gameState === 'start' && (
            <ZigZagPathPursuitStartCard
              selectedDuration={selectedDuration}
              onDurationChange={setSelectedDuration}
              speedMultiplier={speedMultiplier}
              onSpeedChange={setSpeedMultiplier}
              targetSize={targetSize}
              onTargetSizeChange={setTargetSize}
              targetColor={targetColor}
              onTargetColorChange={setTargetColor}
              mathInvisible={mathInvisible}
              onMathInvisibleToggle={() => setMathInvisible(!mathInvisible)}
              randomSpeed={randomSpeed}
              onRandomSpeedToggle={() => setRandomSpeed(!randomSpeed)}
              trailEffect={trailEffect}
              onTrailEffectToggle={() => setTrailEffect(!trailEffect)}
              glowEffect={glowEffect}
              onGlowEffectToggle={() => setGlowEffect(!glowEffect)}
              scanlinesActive={scanlinesActive}
              onScanlinesToggle={() => setScanlinesActive(!scanlinesActive)}
              dayMode={dayMode}
              onDayModeToggle={() => setDayMode(!dayMode)}
              isMobile={isMobile}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" accent="#ef4444" />
          )}

          {/* END SCREEN */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              {/* Left Panel */}
              <div className="w-[38%] flex flex-col items-center justify-center gap-2 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(239,68,68,.12), transparent 70%)' }}>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div className="text-lg sm:text-2xl font-black text-white text-center tracking-tight leading-tight mt-1">
                  SESSION COMPLETE
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 text-center font-bold">
                  Smooth Pursuit Calibrated
                </div>
              </div>

              {/* Right Stats & Actions Panel */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
                
                {/* 4 Stat Tiles */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{selectedDuration}s</p>
                    <p className="text-[8px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Session Time</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{speedMultiplier.toFixed(1)}x</p>
                    <p className="text-[8px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Base Speed</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-xs sm:text-sm font-black text-white">{mathInvisible ? 'Invisible' : 'Visible'}</p>
                    <p className="text-[8px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Math Line</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-xs sm:text-sm font-black text-white">{randomSpeed ? 'Enabled' : 'Fixed'}</p>
                    <p className="text-[8px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Speed Acceleration</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Play Again
                  </button>
                  <button 
                    type="button"
                    onClick={sharePage} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title="Share Score"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={handleExitDrill} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title="Return to Options"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* ACCORDION SECTION */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
            <DrillAccordion
              id="rules"
              title="Drill Instructions & Settings"
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RuleItem num="1" text="Predictive Interpolation" highlight="Pure Visual" result="Predict landing coordinates" />
                <RuleItem num="2" text="Time Adjusting" highlight={`${selectedDuration}s Duration`} result="Customizable session timer" />
                <RuleItem num="3" text="Hide Line" highlight={mathInvisible ? "Enabled (Invisible)" : "Disabled (Visible)"} result="Toggle path guide lines" />
                <RuleItem num="4" text="Random Speed" highlight={randomSpeed ? "Enabled Acceleration" : "Disabled Velocity"} result="Erratic acceleration control" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Predictive Pursuit"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-6 font-sans">
                <section>
                  <h4 className="text-base font-bold text-white mb-2">
                    What Is Predictive Pursuit Training?
                  </h4>
                  <p className="text-sm leading-relaxed mb-3 text-gray-300">
                    <strong>Predictive Pursuit Training</strong> conditions trajectory interpolation by requiring your eyes to predict upcoming target landing coordinates along smooth motion vectors.
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    By utilizing features like <strong>Hide Line</strong> and <strong>Random Speed Acceleration</strong>, your visual cortex learns to calculate landing coordinates mentally without visual path cues.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <h5 className="text-xs font-bold text-white mb-1.5">Target Audience</h5>
                    <p className="text-xs text-gray-300 leading-relaxed">Gamers, athletes, and vision training practitioners looking to build predictive tracking.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <h5 className="text-xs font-bold text-white mb-1.5">Mental Interpolation</h5>
                    <p className="text-xs text-gray-300 leading-relaxed">Teaches eye muscles to calculate future target positions before visual confirmation.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <h5 className="text-xs font-bold text-white mb-1.5">Invisible Line Mode</h5>
                    <p className="text-xs text-gray-300 leading-relaxed">Hides path lines so tracking relies 100% on real-time visual input.</p>
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
                <FAQItem q="What is the Predictive Pursuit drill?" a="The Predictive Pursuit drill exercises trajectory interpolation by requiring your eyes to predict upcoming target landing coordinates along smooth motion vectors." />
                <FAQItem q="Why use the 'Hide Line' setting?" a="Hiding trajectory prediction lines forces your visual motor cortex to calculate target landing points mentally without static path guides." />
                <FAQItem q="What does the Random Speed feature do?" a="Random Speed introduces unpredictable interpolation speeds and variable landing intervals, strengthening eye muscle modulation under erratic speeds." />
                <FAQItem q="How long should I practice visual tracking daily?" a="We recommend 5 to 10 minutes of daily visual tracking training before gaming or athletic practice to warm up ocular muscles and reduce eye fatigue." />
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

        {/* SITE FOOTER */}
        {!isFullscreen && <DrillFooter />}

      </main>
    </div>
  );
}

// === Subcomponents ===
function RuleItem({ num, text, highlight = '', result }: { num: string; text: string; highlight?: string; result: string }) {
  return (
    <div className="flex items-center gap-4 bg-black p-4 rounded-xl border border-white/10 shadow-sm font-sans">
      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0">{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-100 font-sans">
          {text}{highlight && <span className="font-black text-white"> ({highlight})</span>}
        </p>
        <div className="text-xs font-black px-3 py-1.5 rounded-lg bg-[#050811] border border-white/10 text-white whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left">
          {result}
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="bg-[#05060b] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors font-sans">
      <h4 className="text-sm font-bold text-gray-200 mb-2">{q}</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{a}</p>
    </div>
  );
}
