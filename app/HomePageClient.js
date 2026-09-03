'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';
import { DRILLS, DESKTOP_ONLY_CATEGORIES } from '@/lib/drillsRegistry';
import { SITE_CATEGORIES, getCategoryCount, getCategorySampleNames } from '@/lib/siteCategories';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { LOCALES } from '@/lib/i18n/locales';
import { HOME_FAQ_ITEMS } from '@/lib/homeFaq';
import {
  ArrowRight, Zap, Trophy, Brain, Crosshair,
  Check, ChevronDown, ChevronRight, Sliders,
  ShieldCheck, MousePointerClick, Activity, RotateCcw, Monitor,
  Sparkles, Target, Compass, Gauge, Clock, Eye, Layers, Shield,
  Play, Flame, BarChart3, Terminal, Cpu, CheckCircle2, ChevronUp,
  Volume2, VolumeX, Smartphone, Laptop, Info
} from 'lucide-react';

function handleCardMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

const TOTAL_DRILLS = DRILLS.length;
const CATEGORY_COUNT = SITE_CATEGORIES.length;
const LANGUAGE_COUNT = LOCALES.length;

// Curated 5-minute warm-up routines (human-designed protocols)
const CURATED_PROTOCOLS = [
  {
    id: 'fps-tactical',
    title: 'Pre-Match Tactical Aim',
    duration: '5 min',
    target: 'Valorant • CS2 • Apex',
    objective: 'Flick acquisition, micro-adjustments & smooth cursor tracking.',
    categoryAccent: 'text-red-400 border-red-500/30 bg-red-500/10',
    drills: [
      { name: 'Flick Shot Training', href: '/drills/fps/flick-shot-training', time: '90s', tag: 'Micro-snaps' },
      { name: 'Rapid Tapping', href: '/drills/motor/movement-speed/rapid-tapping', time: '60s', tag: 'Trigger cadence' },
      { name: 'Constant Slow Pursuit', href: '/drills/visual-tracking/constant-slow-pursuit', time: '90s', tag: 'Smooth pursuit' },
    ],
  },
  {
    id: 'reflex-awakening',
    title: 'High-Velocity Reflex Reset',
    duration: '3 min',
    target: 'Twitch Reflexes • Latency Calibration',
    objective: 'Stimulus discrimination, visual impulse control & pure reaction speed.',
    categoryAccent: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    drills: [
      { name: 'Reaction Time Test', href: '/drills/reaction-speed/reaction-time-test', time: '60s', tag: 'Simple reaction' },
      { name: 'Go / No-Go Test', href: '/drills/visual/reaction-speed/go/no-go', time: '60s', tag: 'Inhibitory control' },
      { name: 'Stability Challenge', href: '/drills/physical/balance-training/stability-challenge', time: '60s', tag: 'Motor stability' },
    ],
  },
  {
    id: 'cognitive-focus',
    title: 'Executive Focus & Memory',
    duration: '5 min',
    target: 'Deep Work • Coding • Studying',
    objective: 'Expand working memory buffers and build sustained task-switching stamina.',
    categoryAccent: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    drills: [
      { name: 'Concentration Stamina', href: '/drills/cognitive/attention/concentration-stamina', time: '90s', tag: 'Rule switching' },
      { name: 'Digit Span', href: '/drills/memory/short-term-memory/digit-span', time: '90s', tag: 'Working memory' },
      { name: 'Divided Attention', href: '/drills/cognitive/attention/divided-attention', time: '90s', tag: 'Dual-task load' },
    ],
  },
  {
    id: 'ocular-tracking',
    title: 'Dynamic Visual & Spatial Acuity',
    duration: '4 min',
    target: 'Visual Field • Peripheral Speed',
    objective: 'Expand peripheral awareness and strengthen dynamic gaze stability.',
    categoryAccent: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    drills: [
      { name: 'Constant Slow Pursuit', href: '/drills/visual-tracking/constant-slow-pursuit', time: '90s', tag: 'Gaze hold' },
      { name: 'Go / No-Go Test', href: '/drills/visual/reaction-speed/go/no-go', time: '60s', tag: 'Foveal detection' },
      { name: 'Flick Shot Training', href: '/drills/fps/flick-shot-training', time: '90s', tag: 'Peripheral snap' },
    ],
  },
];

// Honest comparison matrix: SkillDrills vs Heavy Desktop Suites
const COMPARISON_SPECS = [
  {
    feature: 'Startup to First Click',
    skilldrills: '0.0s (Instant in browser tab)',
    desktopSuites: '45s+ (Launcher, Steam, patch checks)',
    highlight: true,
  },
  {
    feature: 'Storage Footprint',
    skilldrills: '0 KB (Browser-native)',
    desktopSuites: '12 GB – 18 GB on SSD',
    highlight: true,
  },
  {
    feature: 'Input Latency Timing',
    skilldrills: 'Native performance.now() sub-ms clock',
    desktopSuites: 'Engine overhead + 3D frame queues',
    highlight: false,
  },
  {
    feature: 'Account & Sign-Up',
    skilldrills: 'None. Never required.',
    desktopSuites: 'Mandatory login & email capture',
    highlight: true,
  },
  {
    feature: 'Data Privacy',
    skilldrills: '100% on-device (localStorage only)',
    desktopSuites: 'Cloud telemetry & gameplay logging',
    highlight: false,
  },
  {
    feature: 'Hardware Portability',
    skilldrills: 'Any PC, Mac, Linux, hotel/work laptop',
    desktopSuites: 'Dedicated Windows gaming rigs only',
    highlight: false,
  },
  {
    feature: 'Price & Tiers',
    skilldrills: 'Free forever. All 81 drills included.',
    desktopSuites: '$9.99/mo or paid battle-passes',
    highlight: true,
  },
];

export default function HomePageClient() {
  const { t, localizeHref } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [openFaq, setOpenFaq] = useState(-1);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('all');

  // Interactive 5-Target Calibration Workbench
  const [sandboxState, setSandboxState] = useState('idle'); // 'idle' | 'running' | 'done'
  const [currentTarget, setCurrentTarget] = useState(null);
  const [hitCount, setHitCount] = useState(0);
  const [latencies, setLatencies] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [rippleFeedback, setRippleFeedback] = useState(null);
  const spawnTimeRef = useRef(0);
  const audioCtxRef = useRef(null);

  // Read local progress
  useEffect(() => {
    try {
      let totalGames = 0;
      let levelSum = 0;
      let maxLevel = 1;
      let drillCount = 0;

      Object.keys(localStorage).forEach((key) => {
        if (!key.endsWith('_progression')) return;
        const raw = localStorage.getItem(key);
        if (!raw) return;
        try {
          const parsed = JSON.parse(raw);
          totalGames += parsed.totalGames || 0;
          levelSum += parsed.level || 1;
          if (parsed.level > maxLevel) maxLevel = parsed.level;
          drillCount++;
        } catch (e) {}
      });

      if (drillCount > 0) {
        setProfile({
          gamesPlayed: totalGames,
          drillsCount: drillCount,
          avgLevel: Math.round(levelSum / drillCount),
          maxLevel,
        });
      }
    } catch (e) {}
  }, []);

  // Synthetic haptic audio click via Web Audio API (zero external assets needed)
  const playHitSound = useCallback(() => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {}
  }, [soundEnabled]);

  const spawnTarget = useCallback((index) => {
    if (index >= 5) {
      setSandboxState('done');
      setCurrentTarget(null);
      return;
    }
    // Well-distributed tactical target coordinates
    const positions = [
      { x: 30, y: 35, size: 52 },
      { x: 72, y: 62, size: 48 },
      { x: 26, y: 68, size: 54 },
      { x: 70, y: 30, size: 46 },
      { x: 50, y: 50, size: 50 },
    ];
    const pos = positions[index] || {
      x: Math.floor(Math.random() * 58) + 21,
      y: Math.floor(Math.random() * 52) + 24,
      size: Math.floor(Math.random() * 8) + 48,
    };

    setCurrentTarget({
      ...pos,
      id: index,
    });
    spawnTimeRef.current = performance.now();
  }, []);

  const startSandbox = () => {
    setSandboxState('running');
    setHitCount(0);
    setLatencies([]);
    setRippleFeedback(null);
    spawnTarget(0);
  };

  const handleTargetHit = (e) => {
    e.stopPropagation();
    if (sandboxState !== 'running' || !currentTarget) return;

    const delta = Math.round(performance.now() - spawnTimeRef.current);
    playHitSound();

    // Trigger visual hit ripple
    setRippleFeedback({
      x: currentTarget.x,
      y: currentTarget.y,
      latency: delta,
    });

    setLatencies((prev) => [...prev, delta]);
    const next = hitCount + 1;
    setHitCount(next);
    spawnTarget(next);
  };

  const avgLatency = latencies.length
    ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
    : 0;
  const bestLatency = latencies.length ? Math.min(...latencies) : 0;
  const latencySpread = latencies.length > 1
    ? Math.max(...latencies) - bestLatency
    : 0;

  // Evaluation tier calculation
  const getRatingTier = (ms) => {
    if (ms < 210) return { label: 'Elite Tier', rank: 'S-Rank', badge: 'Top 1% Reflex', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
    if (ms < 250) return { label: 'Competitive Tier', rank: 'A-Rank', badge: 'High Precision', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' };
    if (ms < 300) return { label: 'Solid Baseline', rank: 'B-Rank', badge: 'Balanced Reflex', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
    return { label: 'Calibration Needed', rank: 'Developing', badge: 'Warm Up Required', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' };
  };

  const rating = getRatingTier(avgLatency);

  // Category filter tabs
  const filteredCategories = useMemo(() => {
    if (selectedCategoryTab === 'aim') {
      return SITE_CATEGORIES.filter((c) => ['fps', 'motor', 'physical'].includes(c.cat));
    }
    if (selectedCategoryTab === 'reflex') {
      return SITE_CATEGORIES.filter((c) => ['reaction-speed', 'visual'].includes(c.cat));
    }
    if (selectedCategoryTab === 'cognitive') {
      return SITE_CATEGORIES.filter((c) => ['cognitive', 'memory', 'visual-tracking'].includes(c.cat));
    }
    return SITE_CATEGORIES;
  }, [selectedCategoryTab]);

  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans relative overflow-x-hidden selection:bg-blue-500/25 selection:text-cyan-300">

      {/* ─────────────────────────────────────────────────────────
          PRECISION BACKGROUND ARCHITECTURE (ENGINEERED GRID)
          Subtle mathematical grid + atmospheric lighting
          ───────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Subtle atmospheric ambient glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-blue-600/[0.12] rounded-full blur-[160px]" />
        <div className="absolute top-[28%] -left-36 w-[560px] h-[560px] bg-indigo-600/[0.08] rounded-full blur-[150px]" />
        <div className="absolute top-[48%] -right-36 w-[560px] h-[520px] bg-cyan-600/[0.07] rounded-full blur-[150px]" />

        {/* Precision millimeter line grid */}
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 85% 70% at 50% 25%, black 40%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 25%, black 40%, transparent 95%)',
          }}
        />

        {/* Micro coordinate markers */}
        <div className="absolute top-24 left-8 text-[10px] font-mono text-white/[0.08] select-none tracking-widest hidden lg:block">
          COORD // 40.7128° N, 74.0060° W [SYS.01]
        </div>
        <div className="absolute top-24 right-8 text-[10px] font-mono text-white/[0.08] select-none tracking-widest hidden lg:block">
          CALIBRATION // 1000Hz TIMER READY
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          1. HERO — COMMAND BAR & THE LIVE CALIBRATOR
          Confidence, typographic discipline, and instant tactile utility
          ───────────────────────────────────────────────────────── */}
      <section
        className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
        aria-labelledby="hero-title"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Command & Rationale */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">

            {/* System Status Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-1/90 border border-hairline-2 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-ink-2">
                {t('home.badge', `${TOTAL_DRILLS} browser-native drills · zero account · zero install`)}
              </span>
            </div>

            {/* Editorial Headline */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-ink-1 tracking-tight leading-[1.02]"
            >
              Train your reflexes, aim, and attention at the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 font-black">
                speed of thought.
              </span>
            </h1>

            {/* Grounded Subtitle */}
            <p className="text-ink-2 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t('home.heroSubtitle', `High-precision online drills for tactical FPS aim, reaction latency, working memory, and ocular tracking. No sign-up, no 15GB downloads, no telemetry. Calibrate below in 10 seconds.`)}
            </p>

            {/* Hardware & Privacy Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2.5 pt-1">
              {[
                { icon: ShieldCheck, text: '100% On-Device Storage' },
                { icon: Clock, text: 'Sub-ms performance.now()' },
                { icon: Monitor, text: '144Hz / 240Hz Display-Sync' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-1.5 text-2xs sm:text-xs font-mono font-medium text-ink-3 tracking-wide">
                    <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <Link
                href={localizeHref('/drills')}
                className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-xl shadow-blue-600/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
              >
                <span>Browse All {TOTAL_DRILLS} Drills</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>

              <Link
                href={localizeHref('/drills/reaction-speed/reaction-time-test')}
                className="inline-flex items-center justify-center gap-2.5 bg-surface-1/90 backdrop-blur-xl border border-hairline-2 text-ink-1 hover:text-white px-6 py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-surface-2 hover:border-hairline-2 active:scale-[0.98] transition-all shadow-md"
              >
                <Zap className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>Reaction Time Benchmark</span>
              </Link>
            </div>

            {/* Hardware Metrics Row */}
            <dl className="grid grid-cols-3 gap-3 pt-6 border-t border-hairline max-w-lg mx-auto lg:mx-0">
              <div className="bg-surface-1/50 border border-hairline/60 rounded-xl p-3 text-left">
                <dd className="text-2xl sm:text-3xl font-black text-ink-1 font-mono tracking-tight leading-none">{TOTAL_DRILLS}</dd>
                <dt className="text-2xs font-mono font-bold text-ink-3 uppercase tracking-wider mt-1.5">Free Drills</dt>
              </div>
              <div className="bg-surface-1/50 border border-hairline/60 rounded-xl p-3 text-left">
                <dd className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight leading-none">0.0<span className="text-sm font-sans text-ink-3 ml-0.5">s</span></dd>
                <dt className="text-2xs font-mono font-bold text-ink-3 uppercase tracking-wider mt-1.5">Launch Time</dt>
              </div>
              <div className="bg-surface-1/50 border border-hairline/60 rounded-xl p-3 text-left">
                <dd className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight leading-none">0<span className="text-sm font-sans text-ink-3 ml-0.5">KB</span></dd>
                <dt className="text-2xs font-mono font-bold text-ink-3 uppercase tracking-wider mt-1.5">Disk Footprint</dt>
              </div>
            </dl>
          </div>

          {/* Right Column: The Tactical Calibration Console */}
          <div className="lg:col-span-6">
            <div className="relative bg-surface-1/90 backdrop-blur-2xl border border-hairline-2 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">

              {/* Console Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0A0E17]/80 border-b border-hairline text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-blue-500/20 border border-blue-400 flex items-center justify-center">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                  </div>
                  <span className="font-bold text-ink-1 tracking-wider uppercase text-[11px]">
                    SYS.CALIBRATE // 5-SHOT BENCHMARK
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sound feedback toggle */}
                  <button
                    type="button"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-1 rounded text-ink-3 hover:text-ink-1 transition-colors"
                    title={soundEnabled ? 'Audio cues enabled' : 'Audio cues muted'}
                    aria-label="Toggle calibration audio"
                  >
                    {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-ink-3" />}
                  </button>

                  <span className="px-2 py-0.5 rounded bg-surface-2 border border-hairline text-2xs font-mono text-ink-3">
                    {sandboxState === 'running' ? `TARGET ${hitCount + 1}/5` : '1000Hz CLOCK'}
                  </span>
                </div>
              </div>

              {/* Console Screen Canvas */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-[#05080E] select-none overflow-hidden">

                {/* Tactical Reticle Grid Lines */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-500/[0.08]" />
                  <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/[0.08]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-cyan-500/[0.05]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-cyan-500/[0.03]" />
                  <div className="absolute top-3 left-3 text-[9px] font-mono text-white/10">[Q1]</div>
                  <div className="absolute top-3 right-3 text-[9px] font-mono text-white/10">[Q2]</div>
                  <div className="absolute bottom-3 left-3 text-[9px] font-mono text-white/10">[Q3]</div>
                  <div className="absolute bottom-3 right-3 text-[9px] font-mono text-white/10">[Q4]</div>
                </div>

                {/* IDLE STATE: Calibration Ready */}
                {sandboxState === 'idle' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                    <div className="relative mb-5 group cursor-pointer" onClick={startSandbox}>
                      {/* Pulse ring */}
                      <div className="absolute -inset-3 rounded-full bg-cyan-400/20 blur-md animate-pulse" />
                      
                      {/* Tactical Target Button */}
                      <button
                        type="button"
                        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl shadow-cyan-500/20 border-2 border-white/20 flex items-center justify-center group-hover:scale-105 active:scale-95 transition-all duration-150"
                        aria-label="Click to start 5-shot calibration"
                      >
                        <Crosshair className="w-7 h-7 text-white" />
                        <span className="absolute inset-[30%] rounded-full border border-white/40" />
                        <span className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                      </button>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-ink-1 tracking-tight mb-1.5">
                      Click the target to start calibration
                    </h2>
                    <p className="text-xs text-ink-2 max-w-sm leading-relaxed mb-4">
                      Five dynamic targets will appear across the grid. Measures your reaction latency, target acquisition speed, and cursor micro-corrections.
                    </p>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1 border border-hairline text-2xs font-mono text-ink-3">
                      <Terminal className="w-3 h-3 text-cyan-400" />
                      <span>Zero network latency · Native event loop</span>
                    </div>
                  </div>
                )}

                {/* RUNNING STATE: Active Targets */}
                {sandboxState === 'running' && currentTarget && (
                  <div className="absolute inset-0">
                    {/* Live shot latency feedback banner */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-surface-1/90 border border-hairline text-2xs font-mono text-cyan-300 flex items-center gap-2 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span>CLICK TARGET {hitCount + 1} OF 5</span>
                    </div>

                    {/* Ripple feedback from previous hit */}
                    {rippleFeedback && (
                      <div
                        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${rippleFeedback.x}%`, top: `${rippleFeedback.y}%` }}
                      >
                        <div className="w-16 h-16 rounded-full border-2 border-cyan-400/60 animate-ping" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-[11px] font-mono font-bold text-cyan-300 bg-surface-1/90 px-1.5 py-0.5 rounded border border-hairline whitespace-nowrap shadow">
                          {rippleFeedback.latency} ms
                        </div>
                      </div>
                    )}

                    {/* Active Target */}
                    <button
                      type="button"
                      onClick={handleTargetHit}
                      className="absolute rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_32px_rgba(34,211,238,0.7)] border border-white/60 active:scale-90 transition-transform cursor-crosshair group"
                      style={{
                        left: `${currentTarget.x}%`,
                        top: `${currentTarget.y}%`,
                        width: currentTarget.size,
                        height: currentTarget.size,
                        transform: 'translate(-50%, -50%)',
                      }}
                      aria-label={`Target ${hitCount + 1} of 5`}
                    >
                      {/* Outer target ring */}
                      <span className="absolute inset-[15%] rounded-full border border-black/30 group-hover:border-black/50" />
                      {/* Center core */}
                      <span className="absolute inset-[36%] rounded-full bg-white shadow-sm flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      </span>
                    </button>
                  </div>
                )}

                {/* COMPLETED STATE: Diagnostic Evaluation Card */}
                {sandboxState === 'done' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-canvas/95 backdrop-blur-md">
                    <div className="space-y-4 max-w-sm w-full">
                      
                      {/* Tier Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider mx-auto shadow-sm"
                           style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-ink-1">{rating.label}</span>
                        <span className="text-ink-3">·</span>
                        <span className="text-cyan-400">{rating.rank}</span>
                      </div>

                      {/* Giant Latency Display */}
                      <div>
                        <div className="text-5xl sm:text-6xl font-black text-ink-1 font-mono tracking-tight leading-none">
                          {avgLatency}
                          <span className="text-xl text-ink-3 font-sans font-medium ml-1.5">ms</span>
                        </div>
                        <p className="text-xs font-mono text-ink-3 uppercase tracking-wider mt-2">
                          Average 5-shot acquisition latency
                        </p>
                      </div>

                      {/* Stat Breakdown Grid */}
                      <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                        <div className="bg-surface-1 border border-hairline p-2.5 rounded-xl">
                          <span className="text-2xs text-ink-3 uppercase block mb-0.5">Best Single Shot</span>
                          <span className="text-sm font-bold text-emerald-400">{bestLatency} ms</span>
                        </div>
                        <div className="bg-surface-1 border border-hairline p-2.5 rounded-xl">
                          <span className="text-2xs text-ink-3 uppercase block mb-0.5">Latency Spread</span>
                          <span className="text-sm font-bold text-cyan-300">± {latencySpread} ms</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-ink-3 leading-relaxed">
                        Includes mouse transit time. Pure reaction time without moving the mouse is typically 40–70ms faster.
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-1">
                        <button
                          type="button"
                          onClick={startSandbox}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-2 border border-hairline text-ink-1 text-xs font-bold hover:bg-surface-1 active:scale-[0.98] transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Recalibrate
                        </button>
                        <Link
                          href={localizeHref('/drills/reaction-speed/reaction-time-test')}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
                        >
                          Pure Reflex Test <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Console Status Footer */}
              <div className="px-4 py-2.5 bg-[#0A0E17]/90 border-t border-hairline flex items-center justify-between text-[11px] font-mono text-ink-3">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  <span>Hardware polling: Native OS clock</span>
                </span>
                <span className="text-emerald-400">Zero data leaves this device</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          2. RETURNING VISITOR DOSSIER (IF LOCAL DATA EXISTS)
          Grounded, respectful, 100% private
          ───────────────────────────────────────────────────────── */}
      {profile && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10" aria-label="Your local training history">
          <div className="bg-surface-1/90 border border-hairline-2 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink-1 tracking-tight">Pilot Dossier Active</h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                    Local Device
                  </span>
                </div>
                <p className="text-xs text-ink-3 mt-0.5">Read directly from this browser session — zero tracking cookies or cloud telemetry.</p>
              </div>
            </div>

            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto font-mono text-center">
              {[
                ['Rounds Played', profile.gamesPlayed],
                ['Drills Explored', profile.drillsCount],
                ['Avg Level', profile.avgLevel],
                ['Peak Level', profile.maxLevel],
              ].map(([label, value]) => (
                <div key={label} className="bg-canvas border border-hairline px-4 py-2.5 rounded-xl">
                  <dd className="text-lg sm:text-xl font-black text-ink-1 leading-none">{value}</dd>
                  <dt className="text-[10px] font-bold text-ink-3 uppercase tracking-wider mt-1">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────
          3. CURATED 5-MINUTE PROTOCOLS (HUMAN TRAINING ROUTINES)
          Give users clear, verified routines tailored to their goals
          ───────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-t border-hairline relative z-10 bg-surface-1/30" aria-labelledby="protocols-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1 border border-hairline text-2xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Targeted Warm-Up Protocols</span>
            </div>
            <h2 id="protocols-title" className="text-2xl sm:text-4xl font-extrabold text-ink-1 tracking-tight">
              Pick a verified 5-minute routine
            </h2>
            <p className="text-ink-2 text-sm sm:text-base leading-relaxed">
              Don&rsquo;t know where to begin among {TOTAL_DRILLS} drills? These human-curated protocols target specific neuromuscular mechanisms.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CURATED_PROTOCOLS.map((protocol, idx) => (
              <Reveal key={protocol.id} delay={idx * 60} className="h-full">
                <div className="h-full flex flex-col bg-surface-1/80 backdrop-blur-xl border border-hairline-2 rounded-2xl p-6 hover:border-hairline-2 transition-all shadow-lg">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${protocol.categoryAccent}`}>
                          {protocol.duration} PROTOCOL
                        </span>
                        <span className="text-2xs font-mono text-ink-3">{protocol.target}</span>
                      </div>
                      <h3 className="text-lg font-bold text-ink-1 tracking-tight">{protocol.title}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-ink-2 leading-relaxed mb-5">{protocol.objective}</p>

                  {/* Drill Sequence */}
                  <div className="space-y-2 mt-auto">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-3 block">
                      Sequence (3 drills):
                    </span>
                    <div className="space-y-1.5">
                      {protocol.drills.map((d, dIdx) => (
                        <Link
                          key={d.name}
                          href={localizeHref(d.href)}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-canvas/70 border border-hairline hover:border-hairline-2 hover:bg-surface-2 transition-all group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-5 h-5 rounded bg-surface-1 border border-hairline text-[10px] font-mono font-bold text-ink-3 flex items-center justify-center shrink-0">
                              0{dIdx + 1}
                            </span>
                            <span className="text-xs font-semibold text-ink-1 group-hover:text-blue-400 transition-colors truncate">
                              {d.name}
                            </span>
                            <span className="text-[10px] font-mono text-ink-3 hidden sm:inline">({d.tag})</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-mono text-ink-3">{d.time}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-ink-3 group-hover:text-ink-1 group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-hairline flex items-center justify-between">
                    <span className="text-2xs font-mono text-ink-3">Opens directly in current tab</span>
                    <Link
                      href={localizeHref(protocol.drills[0].href)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>Start routine</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          4. THE 8 TRAINING DISCIPLINES (INTERACTIVE DIRECTORY MATRIX)
          Filterable by objective tab, full category depth
          ───────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-t border-hairline relative z-10" aria-labelledby="disciplines-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1 border border-hairline text-2xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>8 Disciplines · {TOTAL_DRILLS} Interactive Drills</span>
              </div>
              <h2 id="disciplines-title" className="text-2xl sm:text-4xl font-extrabold text-ink-1 tracking-tight">
                Calibrated for specific physical & cognitive functions
              </h2>
              <p className="text-ink-2 text-sm sm:text-base leading-relaxed">
                Choose the exact faculty you want to train. Every drill opens straight into play with zero preamble.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-surface-1/90 border border-hairline rounded-xl backdrop-blur-md self-start md:self-auto">
              {[
                { id: 'all', label: 'All Disciplines (8)' },
                { id: 'aim', label: 'Aim & Mechanics (3)' },
                { id: 'reflex', label: 'Reflex & Latency (2)' },
                { id: 'cognitive', label: 'Mind & Memory (3)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategoryTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    selectedCategoryTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-ink-3 hover:text-ink-1 hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredCategories.map((cat, idx) => {
              const Icon = cat.icon;
              const count = getCategoryCount(cat.cat);
              const samples = getCategorySampleNames(cat.cat, 3);
              const isDesktopOnly = DESKTOP_ONLY_CATEGORIES.includes(cat.cat);

              return (
                <Reveal key={cat.cat} delay={idx * 30} className="h-full">
                  <Link
                    href={localizeHref(cat.href)}
                    onMouseMove={handleCardMouseMove}
                    className={`group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-surface-1/80 backdrop-blur-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-hairline-2 shadow-lg ${cat.ring} hover:shadow-2xl`}
                  >
                    {/* Hover radial glow */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), ${cat.glow}, transparent 70%)` }}
                    />

                    {/* Header */}
                    <div className="relative flex items-start gap-3.5 mb-3">
                      <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300 shadow-md`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="text-base font-bold text-ink-1 leading-tight group-hover:text-white transition-colors truncate">
                            {cat.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-2xs font-mono font-bold text-ink-3 uppercase">
                            {count} Drills
                          </span>
                          <span className="text-ink-3/40">·</span>
                          <span className={`text-[10px] font-mono flex items-center gap-1 ${isDesktopOnly ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {isDesktopOnly ? <Laptop className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                            <span>{isDesktopOnly ? 'Desktop' : 'Touch/Mobile'}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Blurb */}
                    <p className="relative text-xs text-ink-2 leading-relaxed mb-4 line-clamp-2">
                      {cat.blurb}
                    </p>

                    {/* Direct Sample Jump Links */}
                    <div className="relative mt-auto pt-3 border-t border-hairline space-y-1">
                      <span className="text-[10px] font-mono text-ink-3 uppercase tracking-wider block mb-1">
                        Featured Drills:
                      </span>
                      <ul className="space-y-1 text-2xs text-ink-2 font-mono">
                        {samples.map((name) => (
                          <li key={name} className="truncate flex items-center gap-1.5 hover:text-white transition-colors">
                            <span className="w-1 h-1 rounded-full bg-cyan-400" />
                            <span>{name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer link */}
                    <div className={`relative mt-4 pt-3 border-t border-hairline flex items-center justify-between text-xs font-semibold ${cat.accent}`}>
                      <span>Enter Hub</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          5. THE HONEST COMPARISON (WHY BROWSER-NATIVE WINS)
          Clean engineering matrix: SkillDrills vs Bloated Desktop Software
          ───────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-t border-hairline bg-surface-1/40 relative z-10" aria-labelledby="comparison-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1 border border-hairline text-2xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Architecture & Speed</span>
            </div>
            <h2 id="comparison-title" className="text-2xl sm:text-4xl font-extrabold text-ink-1 tracking-tight">
              A warm-up shouldn&rsquo;t take 10 minutes to load
            </h2>
            <p className="text-ink-2 text-sm sm:text-base leading-relaxed">
              Traditional training software demands multi-gigabyte downloads, mandatory account logins, and constant launcher updates. We built SkillDrills because we just wanted to warm up instantly before a match.
            </p>
          </Reveal>

          {/* Spec Comparison Table */}
          <Reveal>
            <div className="bg-surface-1/80 border border-hairline-2 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-hairline bg-canvas/80 font-mono text-2xs uppercase tracking-wider text-ink-3">
                      <th className="py-4 px-6 font-bold">Metric / Feature</th>
                      <th className="py-4 px-6 font-bold text-cyan-400 bg-cyan-500/5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          <span>SkillDrills Web Engine</span>
                        </div>
                      </th>
                      <th className="py-4 px-6 font-bold text-ink-3">
                        Traditional Desktop Trainers (Aim Lab / Kovaak&rsquo;s)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {COMPARISON_SPECS.map((row) => (
                      <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-6 font-semibold text-ink-1">
                          {row.feature}
                        </td>
                        <td className="py-4 px-6 font-mono text-xs font-bold text-emerald-400 bg-cyan-500/5">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{row.skilldrills}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-mono text-xs text-ink-3">
                          {row.desktopSuites}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Clarifying engineer note */}
              <div className="p-4 bg-canvas/90 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-3 font-mono">
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Honest note: Desktop 3D engines are required for exact 3D in-game FOV/sens translation. SkillDrills is built for 2D reaction, micro-mechanics, and instant warmup.</span>
                </span>
                <Link
                  href={localizeHref('/drills')}
                  className="shrink-0 text-cyan-300 font-bold hover:underline inline-flex items-center gap-1"
                >
                  Start training now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          6. SCIENTIFIC & TECHNICAL UNDERPINNINGS
          Real credibility: event loop, sub-ms clock, privacy
          ───────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" aria-labelledby="engineering-title">
        <Reveal className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1 border border-hairline text-2xs font-mono text-purple-400 font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Engineered Credibility</span>
          </div>
          <h2 id="engineering-title" className="text-2xl sm:text-4xl font-extrabold text-ink-1 tracking-tight">
            How the browser timing loop works
          </h2>
          <p className="text-ink-2 text-sm sm:text-base leading-relaxed">
            Standard web timers drift and lag. Here is how SkillDrills delivers precision measurement directly in a browser tab.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              step: '01',
              title: 'Sub-Millisecond Clock',
              body: 'We measure input timestamps using window.performance.now() with microsecond resolution relative to navigation start. It is immune to system clock adjustments and OS clock skew.',
              tag: 'performance.now()',
            },
            {
              step: '02',
              title: 'Display Refresh Synchronization',
              body: 'Drills render on native HTML5 Canvas synced with requestAnimationFrame, executing at your monitor’s native refresh rate (60Hz, 144Hz, 240Hz) without synthetic frame drops.',
              tag: '144Hz / 240Hz Ready',
            },
            {
              step: '03',
              title: 'Zero-Knowledge Local Storage',
              body: 'Personal bests, levels, and progression records never leave your computer. Everything is stored in your browser’s localStorage. Clearing site data erases your records cleanly.',
              tag: 'Zero Telemetry',
            },
          ].map((item, i) => (
            <Reveal key={item.step} delay={i * 80} className="h-full">
              <div className="h-full bg-surface-1/80 backdrop-blur-xl border border-hairline rounded-2xl p-6 relative overflow-hidden shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                      SYS // {item.step}
                    </span>
                    <span className="text-2xs font-mono text-ink-3">{item.tag}</span>
                  </div>
                  <h3 className="text-base font-bold text-ink-1 tracking-tight mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          7. FREQUENTLY ASKED QUESTIONS (GROUNDED & HONEST)
          Rendered in DOM for SEO FAQPage schema compliance
          ───────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" aria-labelledby="faq-title">
        <Reveal className="mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1 border border-hairline text-2xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Clear Answers</span>
          </div>
          <h2 id="faq-title" className="text-2xl sm:text-4xl font-extrabold text-ink-1 tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-ink-2 text-sm sm:text-base leading-relaxed">
            Honest answers about hardware accuracy, browser input lag, and how scores are preserved.
          </p>
        </Reveal>

        <div className="space-y-3">
          {HOME_FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={item.q}
                className="bg-surface-1/80 backdrop-blur-xl border border-hairline rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-ink-1 hover:text-cyan-300 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-ink-3 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={`faq-answer-${idx}`}
                  hidden={!isOpen}
                  className="px-5 pb-5 pt-1 text-xs sm:text-sm text-ink-2 leading-relaxed border-t border-hairline/60"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          8. CLOSING CALL TO ACTION
          Sleek, direct, non-condescending closing statement
          ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 border-t border-hairline bg-surface-1/40 relative overflow-hidden" aria-labelledby="closing-title">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/[0.14] rounded-full blur-[160px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <Reveal className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
              <span>Ready in 1 second · No account needed</span>
            </div>

            <h2 id="closing-title" className="text-3xl sm:text-5xl font-extrabold text-ink-1 tracking-tight">
              Start your warm-up right now.
            </h2>

            <p className="text-ink-2 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Open any drill in this tab. Your scores stay on this machine, and the clock starts on your first click.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href={localizeHref('/drills')}
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all w-full sm:w-auto"
              >
                <span>Browse all {TOTAL_DRILLS} drills</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href={localizeHref('/drills/fps')}
                className="inline-flex items-center justify-center gap-2 bg-surface-1 border border-hairline text-ink-1 hover:text-white px-7 py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-surface-2 hover:border-hairline-2 active:scale-[0.98] transition-all w-full sm:w-auto"
              >
                <Crosshair className="w-4 h-4 text-red-400" />
                <span>FPS Aim Trainer Hub</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Global Site Footer */}
      <SiteFooter />
    </div>
  );
}
