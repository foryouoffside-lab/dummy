'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import HeroReactionTest from '@/components/HeroReactionTest';
import SiteFooter from '@/components/SiteFooter';
import { DRILLS, DESKTOP_ONLY_CATEGORIES } from '@/lib/drillsRegistry';
import {
  Target, ArrowRight, Zap, Trophy, BarChart3,
  Brain, Crosshair, Eye, Dumbbell, Database, Shield, Users,
  Activity, CheckCircle2, LineChart
} from 'lucide-react';

const categoryConfigs = [
  {
    id: 'fps',
    name: 'FPS Training',
    description: 'Aim trainer, flick shots, tracking and reflex drills for competitive gaming',
    icon: Crosshair,
    href: '/drills/fps',
    iconBg: 'bg-gradient-to-br from-red-500 to-orange-500',
    accentColor: 'text-red-400',
    glow: 'rgba(239,68,68,0.28)',
    featured: true
  },
  {
    id: 'cognitive',
    name: 'Cognitive',
    description: 'Memory, attention, focus and problem solving exercises',
    icon: Brain,
    href: '/drills/cognitive',
    iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-500',
    accentColor: 'text-purple-400',
    glow: 'rgba(168,85,247,0.28)'
  },
  {
    id: 'memory',
    name: 'Memory',
    description: 'Working memory, spatial recall and long-term retention',
    icon: Database,
    href: '/drills/memory',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    accentColor: 'text-indigo-400',
    glow: 'rgba(99,102,241,0.28)'
  },
  {
    id: 'motor',
    name: 'Motor Skills',
    description: 'Hand-eye coordination, precision control and timing accuracy',
    icon: Dumbbell,
    href: '/drills/motor',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    accentColor: 'text-emerald-400',
    glow: 'rgba(16,185,129,0.28)'
  },
  {
    id: 'physical',
    name: 'Physical',
    description: 'Balance training, directional reflex and coordination drills',
    icon: Activity,
    href: '/drills/physical',
    iconBg: 'bg-gradient-to-br from-rose-500 to-red-500',
    accentColor: 'text-rose-400',
    glow: 'rgba(251,113,133,0.28)'
  },
  {
    id: 'visual',
    name: 'Visual Training',
    description: 'Peripheral awareness, saccadic recognition and flash detection',
    icon: Eye,
    href: '/drills/visual',
    iconBg: 'bg-gradient-to-br from-fuchsia-500 to-pink-500',
    accentColor: 'text-fuchsia-400',
    glow: 'rgba(232,121,249,0.28)'
  },
  {
    id: 'visual-tracking',
    name: 'Visual Tracking',
    description: 'Smooth pursuit, continuous path tracking, and trajectory prediction',
    icon: Activity,
    href: '/drills/visual-tracking',
    iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-500',
    accentColor: 'text-cyan-400',
    glow: 'rgba(34,211,238,0.28)'
  },
  {
    id: 'reaction-speed',
    name: 'Reaction Speed',
    description: 'Simple and choice stimulus latency calibration and reflex response',
    icon: Zap,
    href: '/drills/reaction-speed',
    iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-500',
    accentColor: 'text-amber-400',
    glow: 'rgba(245,158,11,0.28)'
  },
];

const features = [
  {
    icon: Zap,
    title: 'Real-time Telemetry',
    description: 'Instant latency, precision, and accuracy metrics updated every millisecond',
    gradient: 'from-amber-400 to-yellow-500',
  },
  {
    icon: BarChart3,
    title: 'Local Progress Curves',
    description: 'Track scores and neural adaptation rates privately in your browser',
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    icon: Trophy,
    title: 'Adaptive Progression',
    description: 'Dynamic difficulty curves adjust target speeds to keep you in peak flow',
    gradient: 'from-orange-400 to-red-500',
  },
  {
    icon: Shield,
    title: 'Validated Paradigms',
    description: 'Modeled directly on established cognitive psych instruments and esports standards',
    gradient: 'from-purple-400 to-violet-500',
  },
  {
    icon: Target,
    title: 'Focused Skill Vectors',
    description: 'Target specific bottlenecks across 8 specialized performance categories',
    gradient: 'from-emerald-400 to-green-500',
  },
  {
    icon: Users,
    title: 'Zero Latency & Friction',
    description: '100% free, client-side execution with zero account registration or credit card',
    gradient: 'from-pink-400 to-rose-500',
  },
];

const audienceData = [
  {
    icon: Crosshair,
    gradient: 'from-red-500 to-orange-500',
    title: 'Competitive Gamers',
    description: 'Sharpen flick accuracy, target tracking, and reaction times for Valorant, CS2, Overwatch, and Apex Legends.'
  },
  {
    icon: Brain,
    gradient: 'from-blue-500 to-indigo-500',
    title: 'Cognitive Performers',
    description: 'Expand working memory span, improve attention stamina, and accelerate processing speed.'
  },
  {
    icon: BarChart3,
    gradient: 'from-emerald-500 to-green-500',
    title: 'Daily Training Enthusiasts',
    description: '5-minute micro-sessions designed for quick mental warm-ups and daily mechanical calibration.'
  },
];

export default function HomePageClient({ copy = {} }) {
  const [profile, setProfile] = useState(null);

  const totalDrillsCount = DRILLS.length;
  const totalCategoriesCount = categoryConfigs.length;

  const t = (key, fallback) => copy[key] ?? fallback;
  const catCopy = (id, field, fallback) => copy.categories?.[id]?.[field] ?? fallback;
  const featureCopy = (idx, field, fallback) => copy.features?.[idx]?.[field] ?? fallback;
  const audienceCopy = (idx, field, fallback) => copy.audience?.[idx]?.[field] ?? fallback;

  useEffect(() => {
    try {
      const keys = Object.keys(localStorage);
      let totalDrillsPlayed = 0;
      let totalLevel = 0;
      let maxLevel = 1;
      let totalXp = 0;
      let drillCount = 0;
      
      const sectorStats = {
        fps: { name: 'FPS Aim', count: 0, levels: 0, games: 0 },
        cognitive: { name: 'Cognitive', count: 0, levels: 0, games: 0 },
        memory: { name: 'Memory', count: 0, levels: 0, games: 0 },
        visual: { name: 'Visual', count: 0, levels: 0, games: 0 },
        'visual-tracking': { name: 'Visual Tracking', count: 0, levels: 0, games: 0 },
        motor: { name: 'Motor Skills', count: 0, levels: 0, games: 0 },
        physical: { name: 'Physical', count: 0, levels: 0, games: 0 },
        'reaction-speed': { name: 'Reaction Speed', count: 0, levels: 0, games: 0 },
      };
      
      keys.forEach(key => {
        if (key.endsWith('_progression')) {
          const data = localStorage.getItem(key);
          if (data) {
            try {
              const parsed = JSON.parse(data);
              totalDrillsPlayed += parsed.totalGames || 0;
              totalLevel += parsed.level || 1;
              totalXp += parsed.xp || 0;
              if (parsed.level > maxLevel) maxLevel = parsed.level;
              drillCount++;
              
              for (const sector in sectorStats) {
                if (key.includes('/' + sector + '/')) {
                  sectorStats[sector].count++;
                  sectorStats[sector].levels += parsed.level || 1;
                  sectorStats[sector].games += parsed.totalGames || 0;
                  break;
                }
              }
            } catch {}
          }
        }
      });

      if (totalDrillsPlayed > 0 || drillCount > 0) {
        setProfile({
          gamesPlayed: totalDrillsPlayed,
          avgLevel: drillCount > 0 ? Math.round(totalLevel / drillCount) : 1,
          maxLevel,
          drillsCount: drillCount,
          totalXp,
          fitnessRating: Math.min(100, Math.round((totalLevel * 5) + (totalDrillsPlayed * 2))),
          sectors: sectorStats
        });
      }
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans relative overflow-hidden">
      {/* Layered premium background: mesh blobs + grid + grain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[560px] bg-blue-600/[0.14] rounded-full blur-[160px]" />
        <div className="absolute top-[20%] -left-40 w-[520px] h-[520px] bg-purple-600/[0.10] rounded-full blur-[140px]" />
        <div className="absolute top-[45%] -right-40 w-[520px] h-[480px] bg-cyan-500/[0.08] rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* SEO Structured Content */}
      <section className="sr-only" aria-label="Platform description">
        <h2>{t('srH2', 'SkillDrills - Free Brain Training and FPS Aim Trainer Platform')}</h2>
        <p>
          {t('srBody', `SkillDrills is a free online training platform offering ${totalDrillsCount} interactive drills across ${totalCategoriesCount} categories: FPS aim training, cognitive brain exercises, visual tracking, working memory games, hand-eye motor skills, physical reflex drills, visual recognition, and reaction speed testing. Zero registration, 100% browser-native performance drills.`)}
        </p>
      </section>

      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10" aria-labelledby="hero-heading">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Text Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <h1 id="hero-heading" className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] uppercase text-white">
                {t('heroH1', 'Master Your Mind & Mechanics')}
              </h1>

              <p className="text-base sm:text-lg text-ink-2 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t('heroSub', `Build mechanical precision, target acquisition velocity, and working memory capacity. Access ${totalDrillsCount} zero-friction, browser-native drills across ${totalCategoriesCount} performance domains. Free, open, and instant.`)}
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
                <Link
                  href="/drills"
                  className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] transition-all"
                >
                  {t('heroExploreCta', `Explore All ${totalDrillsCount} Drills`)}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/drills/fps"
                  className="inline-flex items-center justify-center gap-2 bg-surface-1/90 border border-white/10 text-white px-7 py-3.5 rounded-xl font-bold hover:bg-surface-2 hover:border-white/20 active:scale-[0.98] transition-all"
                >
                  <Crosshair className="w-4.5 h-4.5 text-red-400" aria-hidden="true" />
                  {t('fpsHubCta', 'FPS Aim Hub')}
                </Link>
              </div>

              {/* Telemetry Architecture Specs */}
              <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0 pt-7 border-t border-white/10">
                <div className="text-left">
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">{totalDrillsCount}</p>
                  <p className="text-2xs font-mono font-bold text-ink-3 uppercase tracking-widest mt-0.5">{t('statFreeDrills', 'Free Drills')}</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">{totalCategoriesCount}</p>
                  <p className="text-2xs font-mono font-bold text-ink-3 uppercase tracking-widest mt-0.5">{t('statDomains', 'Domains')}</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">0ms</p>
                  <p className="text-2xs font-mono font-bold text-ink-3 uppercase tracking-widest mt-0.5">{t('statServerDelay', 'Server Delay')}</p>
                </div>
              </div>

              {/* Mobile Hero Visual Substitute */}
              <div className="lg:hidden mt-6 p-4 rounded-2xl bg-surface-1/90 border border-white/10 text-left space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {t('hudEngineTelemetry', 'ENGINE TELEMETRY')}
                  </span>
                  <span className="text-emerald-400 font-bold">{t('hudReady', 'READY')}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-2">
                  <div className="p-2.5 rounded-xl bg-surface-2/80 border border-white/5">
                    <p className="text-xs font-bold text-white">140ms</p>
                    <p className="text-[10px] text-ink-3 font-mono">{t('hudAvgLatency', 'Avg Latency')}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-2/80 border border-white/5">
                    <p className="text-xs font-bold text-white">98.4%</p>
                    <p className="text-[10px] text-ink-3 font-mono">{t('hudPrecision', 'Precision')}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-2/80 border border-white/5">
                    <p className="text-xs font-bold text-white">240 Hz</p>
                    <p className="text-[10px] text-ink-3 font-mono">{t('hudFrameSync', 'Frame Sync')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Desktop Widget Column - playable reaction test */}
            <div className="lg:col-span-5 hidden lg:block">
              <HeroReactionTest copy={copy.reactionTest ?? {}} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. METHODOLOGY & PRECISION ENGINE SHOWCASE */}
      <section className="py-14 border-y border-white/10 bg-surface-1/40 relative" aria-label="Methodology and Engine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Column A: Telemetry & Calibration HUD */}
              <div className="md:col-span-5 bg-surface-1/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-70" />
                
                {/* HUD Header */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/5 text-2xs font-mono text-ink-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500/80" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="font-bold text-white tracking-wider ml-1">{t('hudCalibration', 'TELEMETRY CALIBRATION')}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono">
                    {t('hudSubPixel', 'SUB-PIXEL ENGINE')}
                  </span>
                </div>

                {/* Simulated Target Acquisition Canvas */}
                <div className="relative aspect-[16/10] bg-canvas rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                  {/* Grid background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />
                  
                  {/* Coordinate crosshairs */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-blue-500/20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-blue-500/10" />
                  </div>

                  {/* Target Snap Simulation */}
                  <div className="relative w-full h-full p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start text-[10px] font-mono text-ink-3">
                      <span className="bg-canvas/80 px-2 py-0.5 rounded border border-white/10 text-cyan-400">
                        LATENCY: 148ms
                      </span>
                      <span className="bg-canvas/80 px-2 py-0.5 rounded border border-white/10 text-emerald-400">
                        ACCURACY: 98.4%
                      </span>
                    </div>

                    {/* Animated target points */}
                    <div className="absolute top-1/3 left-1/4">
                      <div className="w-7 h-7 rounded-full border border-red-500/50 bg-red-500/20 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
                      </div>
                      <span className="absolute -bottom-4 left-0 text-[8px] font-mono text-ink-3 tracking-widest">TGT_A</span>
                    </div>

                    <div className="absolute bottom-1/3 right-1/4">
                      <div className="w-7 h-7 rounded-full border border-cyan-400/50 bg-cyan-400/20 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                      </div>
                      <span className="absolute -bottom-4 left-0 text-[8px] font-mono text-ink-3 tracking-widest">TGT_B</span>
                    </div>

                    <div className="flex justify-between items-end text-[10px] font-mono text-ink-3">
                      <span className="text-zinc-400">DISPERSION: &plusmn;1.2px</span>
                      <span className="text-zinc-400">FPS: 240Hz SYNC</span>
                    </div>
                  </div>
                </div>

                {/* HUD Footer Readout */}
                <div className="flex items-center justify-between pt-3.5 text-2xs font-mono text-ink-3">
                  <span className="text-zinc-400">INPUT POLLING: RAW EVENT</span>
                  <span className="text-emerald-400 font-semibold">MOTOR RESPONSE: NORMALIZED</span>
                </div>
              </div>

              {/* Column B: Methodology & Paradigm Validation */}
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-2xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t('methodologyBadge', 'Cognitive & Mechanical Paradigms')}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                  {t('methodologyH2', 'Rooted in Cognitive Science & Esports Mechanics')}
                </h2>

                <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
                  {t('methodologyBody', 'Every drill is modeled directly on validated psychometric tests and competitive esports motor demands—isolating distinct neurological stimulus-response pathways and hand-eye coordination mechanics.')}
                </p>

                {/* Paradigm Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  <div className="p-3 rounded-2xl bg-surface-1/80 border border-white/10 text-center">
                    <p className="text-xs font-bold text-white">{t('pillDigitSpan', 'Digit Span')}</p>
                    <p className="text-[10px] text-ink-3 font-mono mt-0.5">{t('pillDigitSpanSub', 'Working Memory')}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-surface-1/80 border border-white/10 text-center">
                    <p className="text-xs font-bold text-white">{t('pillNBack', 'N-Back Task')}</p>
                    <p className="text-[10px] text-ink-3 font-mono mt-0.5">{t('pillNBackSub', 'Executive Control')}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-surface-1/80 border border-white/10 text-center">
                    <p className="text-xs font-bold text-white">{t('pillChoiceRT', 'Choice RT')}</p>
                    <p className="text-[10px] text-ink-3 font-mono mt-0.5">{t('pillChoiceRTSub', 'Latency Calibration')}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-surface-1/80 border border-white/10 text-center">
                    <p className="text-xs font-bold text-white">{t('pillSmoothPursuit', 'Smooth Pursuit')}</p>
                    <p className="text-[10px] text-ink-3 font-mono mt-0.5">{t('pillSmoothPursuitSub', 'Oculomotor Tracking')}</p>
                  </div>
                </div>

                {/* Example Progress Curve Note */}
                <div className="p-3.5 rounded-2xl bg-canvas border border-white/10 flex items-center justify-between text-xs text-ink-3 font-mono">
                  <div className="flex items-center gap-2.5">
                    <LineChart className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-ink-2">{t('adaptationCurve', 'Typical Adaptation Curve: 15–22% latency reduction over 14 days')}</span>
                  </div>
                  <span className="text-[10px] text-ink-3 font-sans italic opacity-75 hidden sm:inline">{t('empiricalNote', '(Empirical progress model)')}</span>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. DIAGNOSTIC PROFILE (Returning Users) */}
      {profile && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Reveal>
            <div className="bg-surface-1/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-70" />
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                    <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 opacity-40 blur-lg -z-10" />
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight">{t('profileH2', 'Your Diagnostic Profile')}</h2>
                    <p className="text-xs text-ink-3">{t('profileSub', 'Local browser progression aggregated across completed drills')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
                  <div className="bg-canvas border border-white/10 p-3.5 rounded-xl text-center">
                    <p className="text-xl font-black text-white">{profile.gamesPlayed}</p>
                    <p className="text-[10px] font-mono font-bold text-ink-3 uppercase tracking-widest mt-0.5">{t('profileSessions', 'Sessions')}</p>
                  </div>
                  <div className="bg-canvas border border-white/10 p-3.5 rounded-xl text-center">
                    <p className="text-xl font-black text-white">{profile.drillsCount}</p>
                    <p className="text-[10px] font-mono font-bold text-ink-3 uppercase tracking-widest mt-0.5">{t('profileDrills', 'Drills')}</p>
                  </div>
                  <div className="bg-canvas border border-white/10 p-3.5 rounded-xl text-center">
                    <p className="text-xl font-black text-white">{t('profileLvlPrefix', 'Lvl')} {profile.avgLevel}</p>
                    <p className="text-[10px] font-mono font-bold text-ink-3 uppercase tracking-widest mt-0.5">{t('profileAvgLevel', 'Avg Level')}</p>
                  </div>
                  <div className="bg-canvas border border-white/10 p-3.5 rounded-xl text-center">
                    <p className="text-xl font-black text-amber-400 flex items-center justify-center gap-1">
                      <Trophy className="w-4 h-4" />
                      {profile.fitnessRating}%
                    </p>
                    <p className="text-[10px] font-mono font-bold text-ink-3 uppercase tracking-widest mt-0.5">{t('profileRating', 'Rating')}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* 4. CATEGORIES SECTION (ALL 8 CATEGORIES) */}
      <section className="py-18 sm:py-22 relative" aria-labelledby="categories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14 space-y-3">
            <h2 id="categories-heading" className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              {t('categoriesH2', 'Training Categories')}
            </h2>
            <p className="text-ink-2 max-w-2xl mx-auto text-sm sm:text-base">
              {t('categoriesSub', 'Select a specialized skill vector to begin your performance calibration.')}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categoryConfigs.map((cat, idx) => {
              const Icon = cat.icon;
              const count = DRILLS.filter(d => d.category === cat.id).length;
              const isDesktopOnly = DESKTOP_ONLY_CATEGORIES.includes(cat.id);
              return (
                <Reveal key={cat.id} delay={idx * 40} className="h-full">
                  <Link
                    href={cat.href}
                    className="group relative isolate flex h-full flex-col justify-between overflow-hidden bg-surface-1/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-white/25 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`relative w-11 h-11 rounded-xl ${cat.iconBg} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                          <div className={`absolute -inset-1.5 rounded-xl ${cat.iconBg} opacity-40 blur-md -z-10 group-hover:opacity-70 transition-opacity`} />
                          <Icon className="w-5.5 h-5.5" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          {isDesktopOnly && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                              {t('desktopOnly', 'Desktop Only')}
                            </span>
                          )}
                          <span className="text-2xs font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 text-ink-3 border border-white/10">
                            {count} {t('drillsSuffix', 'Drills')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className={`text-base font-bold text-white transition-colors group-hover:${cat.accentColor}`}>
                          {catCopy(cat.id, 'name', cat.name)}
                        </h3>
                        {cat.featured && (
                          <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold uppercase rounded-full">
                            {t('popular', 'Popular')}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-ink-2 leading-relaxed mb-4 line-clamp-2">{catCopy(cat.id, 'description', cat.description)}</p>
                    </div>

                    <div className={`relative pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold ${cat.accentColor}`}>
                      <span>{t('exploreCategory', 'Explore Category')}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FEATURES / ARCHITECTURE */}
      <section className="py-18 sm:py-22 border-t border-white/10 bg-surface-1/40" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14 space-y-3">
            <h2 id="features-heading" className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              {t('featuresH2', 'Engine Diagnostics & Features')}
            </h2>
            <p className="text-ink-2 max-w-2xl mx-auto text-sm sm:text-base">
              {t('featuresSub', 'Built for high-refresh rates and instant tactile response in all modern browsers.')}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal key={index} delay={index * 50}>
                  <article className="group relative overflow-hidden bg-surface-1/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/25 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <div className={`absolute -inset-1.5 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-50 blur-md -z-10 transition-opacity`} />
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 uppercase tracking-tight">{featureCopy(index, 'title', feature.title)}</h3>
                    <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">{featureCopy(index, 'description', feature.description)}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. AUDIENCE PROFILE ADAPTATION */}
      <section className="py-18 sm:py-22 border-t border-white/10" aria-labelledby="audience-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14 space-y-3">
            <h2 id="audience-heading" className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              {t('audienceH2', 'Target Audience')}
            </h2>
            <p className="text-ink-2 max-w-2xl mx-auto text-sm sm:text-base">
              {t('audienceSub', 'Tailored training paths whether you are calibrating aim or expanding cognitive limits.')}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {audienceData.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={index} delay={index * 60}>
                  <div className="group text-center p-7 bg-surface-1/80 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/25 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className={`relative w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-40 blur-md -z-10 transition-opacity`} />
                      <Icon className="w-6.5 h-6.5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 uppercase tracking-tight">{audienceCopy(index, 'title', item.title)}</h3>
                    <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">{audienceCopy(index, 'description', item.description)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-22 sm:py-26 border-t border-white/10 bg-surface-1/60 relative overflow-hidden" aria-labelledby="cta-heading">
        {/* Glow backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-600/[0.10] rounded-full blur-[140px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Reveal>
            <h2 id="cta-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              {t('ctaH2', 'Start Training Now')}
            </h2>
            <p className="text-ink-2 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              {t('ctaSub', `No accounts. No payments. ${totalDrillsCount} browser-native drills ready for instant calibration.`)}
            </p>
            <div className="pt-5 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/drills"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-9 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] transition-all"
              >
                {t('ctaExploreCta', `Browse All ${totalDrillsCount} Drills`)}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="/drills/fps"
                className="inline-flex items-center gap-2 bg-surface-2 border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-surface-1 hover:border-white/20 active:scale-[0.98] transition-all"
              >
                <Crosshair className="w-4.5 h-4.5 text-red-400" aria-hidden="true" />
                {t('fpsHubCta', 'FPS Aim Hub')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}