'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';
import { DRILLS, DESKTOP_ONLY_CATEGORIES } from '@/lib/drillsRegistry';
import {
  Target, ArrowRight, Zap, Trophy, BarChart3, Sparkles,
  TrendingUp, Brain, Crosshair, Eye, Timer,
  Dumbbell, Database, Star, Shield, Users, Activity, CheckCircle2, LineChart
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

function handleCardMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

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

export default function HomePageClient() {
  const [profile, setProfile] = useState(null);

  const totalDrillsCount = DRILLS?.length || 113;
  const totalCategoriesCount = categoryConfigs.length;

  useEffect(() => {
    try {
      const keys = Object.keys(localStorage);
      let totalDrillsPlayed = 0;
      let totalLevel = 0;
      let maxLevel = 1;
      let totalXp = 0;
      let drillCount = 0;
      let totalBestScore = 0;
      
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
            } catch (e) {}
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
    } catch (e) {}
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
        <h2>SkillDrills - Free Brain Training and FPS Aim Trainer Platform</h2>
        <p>
          SkillDrills is a free online training platform offering {totalDrillsCount} interactive drills across {totalCategoriesCount} categories:
          FPS aim training, cognitive brain exercises, visual tracking, working memory games, hand-eye motor skills, physical reflex drills, visual recognition, and reaction speed testing.
          Zero registration, 100% browser-native performance drills.
        </p>
      </section>

      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10" aria-labelledby="hero-heading">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Text Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mx-auto lg:mx-0">
                <Sparkles className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span className="text-2xs sm:text-xs text-blue-300 font-mono font-bold uppercase tracking-wider">
                  Scientific Browser-Native Training System
                </span>
              </div>
              
              <h1 id="hero-heading" className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase text-ink-1">
                Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Mind</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">Mechanics</span>
              </h1>
              
              <p className="text-base sm:text-lg text-ink-2 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Build mechanical precision, visual tracking velocity, and working memory span. Access {totalDrillsCount} zero-latency drills across {totalCategoriesCount} performance categories. Instant start, no installs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
                <Link 
                  href="/drills" 
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-7 py-3.5 rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] transition-all"
                >
                  Explore All {totalDrillsCount} Drills
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link 
                  href="/drills/fps" 
                  className="inline-flex items-center justify-center gap-2 bg-surface-1 border border-hairline text-ink-1 px-7 py-3.5 rounded-xl font-bold hover:bg-surface-2 hover:border-hairline-2 active:scale-[0.98] transition-all"
                >
                  <Crosshair className="w-4.5 h-4.5 text-red-400" aria-hidden="true" />
                  FPS Aim Hub
                </Link>
              </div>
              
              {/* Metric Chips */}
              <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0 pt-6 border-t border-hairline">
                <div className="text-left">
                  <p className="text-2xl sm:text-3xl font-black text-ink-1 tracking-tight">{totalDrillsCount}</p>
                  <p className="text-2xs font-mono font-bold text-ink-3 uppercase tracking-widest mt-0.5">Free Drills</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl sm:text-3xl font-black text-ink-1 tracking-tight">{totalCategoriesCount}</p>
                  <p className="text-2xs font-mono font-bold text-ink-3 uppercase tracking-widest mt-0.5">Categories</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl sm:text-3xl font-black text-ink-1 tracking-tight">0ms</p>
                  <p className="text-2xs font-mono font-bold text-ink-3 uppercase tracking-widest mt-0.5">Server Delay</p>
                </div>
              </div>

              {/* Mobile Hero Visual Substitute (Replaces hidden widget on < lg screens) */}
              <div className="lg:hidden mt-6 p-4 rounded-2xl bg-surface-1 border border-hairline text-left space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold">&gt; PLATFORM TELEMETRY</span>
                  <span className="text-emerald-400 font-bold">READY</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-2">
                  <div className="p-2 rounded-xl bg-surface-2 border border-hairline">
                    <p className="text-xs font-bold text-ink-1">~140ms</p>
                    <p className="text-[10px] text-ink-3 font-mono">Avg Latency</p>
                  </div>
                  <div className="p-2 rounded-xl bg-surface-2 border border-hairline">
                    <p className="text-xs font-bold text-ink-1">98.4%</p>
                    <p className="text-[10px] text-ink-3 font-mono">Precision</p>
                  </div>
                  <div className="p-2 rounded-xl bg-surface-2 border border-hairline">
                    <p className="text-xs font-bold text-ink-1">240 Hz</p>
                    <p className="text-[10px] text-ink-3 font-mono">Frame Target</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Desktop Widget Column */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative bg-surface-1 border border-hairline rounded-3xl p-6 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-60" />
                
                {/* Aiming Radar Interface */}
                <div className="relative aspect-square max-w-[300px] mx-auto bg-canvas/80 rounded-full border border-blue-500/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-2 border border-blue-500/10 rounded-full" />
                  <div className="absolute inset-16 border border-blue-500/10 rounded-full" />
                  <div className="absolute inset-32 border border-blue-500/5 rounded-full" />
                  
                  {/* Radar sweep */}
                  <div className="absolute w-[2px] h-1/2 bg-gradient-to-t from-blue-500 to-transparent top-0 left-1/2 origin-bottom animate-[spin_4s_linear_infinite]" />
                  
                  {/* Target nodes */}
                  <div className="absolute w-3.5 h-3.5 bg-emerald-400 rounded-full top-1/4 left-1/3 animate-ping shadow-[0_0_12px_#4ade80]" />
                  <div className="absolute w-2 h-2 bg-emerald-500 rounded-full top-1/4 left-1/3 shadow-[0_0_8px_#22c55e]" />
                  
                  <div className="absolute w-3 h-3 bg-red-400 rounded-full bottom-1/3 right-1/4 animate-ping shadow-[0_0_10px_#f87171]" style={{ animationDelay: '1s' }} />
                  <div className="absolute w-1.5 h-1.5 bg-red-500 rounded-full bottom-1/3 right-1/4 shadow-[0_0_6px_#ef4444]" />

                  <div className="absolute w-4 h-4 bg-purple-400 rounded-full top-1/2 right-1/3 animate-ping shadow-[0_0_14px_#c084fc]" style={{ animationDelay: '2.5s' }} />
                  <div className="absolute w-2 h-2 bg-purple-500 rounded-full top-1/2 right-1/3 shadow-[0_0_8px_#a855f7]" />
                  
                  {/* Center crosshair */}
                  <div className="absolute text-blue-400 w-8 h-8 flex items-center justify-center font-light"><Crosshair className="w-6 h-6 animate-pulse" /></div>
                </div>

                {/* Telemetry Log */}
                <div className="mt-5 bg-canvas/90 rounded-xl border border-hairline p-4 font-mono text-2xs space-y-2 text-ink-3">
                  <p className="flex justify-between"><span className="text-cyan-400">&gt; NEURAL_LATENCY:</span> <span className="text-emerald-400 font-bold">142ms (EXCELLENT)</span></p>
                  <p className="flex justify-between"><span className="text-cyan-400">&gt; AIM_MATCHING:</span> <span className="text-ink-1">DPI_800 | SENS_0.35</span></p>
                  <p className="flex justify-between"><span className="text-cyan-400">&gt; STABILITY_INDEX:</span> <span className="text-cyan-300 font-bold">98.6%</span></p>
                  <div className="h-1 bg-white/5 rounded overflow-hidden mt-1">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[92%] animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. PROOF BAND (Flagship Preview + Methodology Paradigms + Progress Curve) */}
      <section className="py-12 border-y border-hairline bg-surface-1/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Column A: Flagship Drill Preview Frame */}
              <div className="md:col-span-5 bg-surface-1/80 backdrop-blur-xl border border-hairline rounded-2xl p-4 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-blue-500 opacity-50" />
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-hairline text-2xs font-mono text-ink-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    <span className="ml-2 font-bold text-ink-2">Flick Shot Calibration</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">LIVE ENGINE</span>
                </div>
                <div className="relative aspect-video bg-canvas rounded-xl border border-hairline flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                  
                  {/* Simulated Drill Target Motion */}
                  <div className="relative w-full h-full">
                    <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full border-2 border-red-500 bg-red-500/20 flex items-center justify-center animate-ping" />
                    <div className="absolute top-1/3 left-1/4 w-6 h-6 rounded-full bg-red-500 border border-white flex items-center justify-center shadow-lg shadow-red-500/50">
                      <div className="w-1 h-1 bg-white rounded-full" />
                    </div>
                    
                    <div className="absolute bottom-1/4 right-1/3 w-6 h-6 rounded-full border-2 border-blue-400 bg-blue-400/20 flex items-center justify-center animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/3 w-4 h-4 rounded-full bg-blue-400 border border-white shadow-lg" />
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-ink-3 text-2xs font-mono">
                      [ +100 PTS | 165ms ]
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 text-2xs font-mono text-ink-3">
                  <span>Target Snap: 42px</span>
                  <span>Accuracy: 98.2%</span>
                </div>
              </div>

              {/* Column B: Methodology & Paradigm Validation */}
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-2xs font-mono text-indigo-400 font-bold uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Cognitive &amp; Mechanical Paradigms</span>
                </div>
                
                <h2 className="text-xl sm:text-2xl font-bold text-ink-1">
                  Rooted in Cognitive Science &amp; Esports Mechanics
                </h2>

                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                  Every drill is modeled on established psychometric tests and competitive gaming requirements — designed to isolate specific neurological and physical reaction components.
                </p>

                {/* Paradigm Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <div className="p-2.5 rounded-xl bg-surface-1 border border-hairline text-center">
                    <p className="text-xs font-bold text-ink-1">Digit Span</p>
                    <p className="text-[10px] text-ink-3 font-mono">Working Memory</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-1 border border-hairline text-center">
                    <p className="text-xs font-bold text-ink-1">N-Back Task</p>
                    <p className="text-[10px] text-ink-3 font-mono">Cognitive Control</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-1 border border-hairline text-center">
                    <p className="text-xs font-bold text-ink-1">Choice RT</p>
                    <p className="text-[10px] text-ink-3 font-mono">Latency Calibration</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-1 border border-hairline text-center">
                    <p className="text-xs font-bold text-ink-1">Task Switch</p>
                    <p className="text-[10px] text-ink-3 font-mono">Executive Control</p>
                  </div>
                </div>

                {/* Example Progress Curve Note */}
                <div className="p-3 rounded-xl bg-canvas border border-hairline flex items-center justify-between text-xs text-ink-3 font-mono">
                  <div className="flex items-center gap-2">
                    <LineChart className="w-4 h-4 text-emerald-400" />
                    <span>Typical Adaptation Curve: 15-22% latency reduction over 14 days</span>
                  </div>
                  <span className="text-[10px] text-ink-3 font-sans italic opacity-75 hidden sm:inline">(Example progress curve)</span>
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
            <div className="bg-surface-1/80 border border-hairline rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-60" />
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                    <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 opacity-40 blur-lg -z-10" />
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-ink-1 uppercase tracking-tight">Your Diagnostic Profile</h2>
                    <p className="text-xs text-ink-3">Local browser progression aggregated across completed drills</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
                  <div className="bg-canvas border border-hairline p-3.5 rounded-xl text-center">
                    <p className="text-xl font-black text-ink-1">{profile.gamesPlayed}</p>
                    <p className="text-[10px] font-mono font-bold text-ink-3 uppercase tracking-widest mt-0.5">Sessions</p>
                  </div>
                  <div className="bg-canvas border border-hairline p-3.5 rounded-xl text-center">
                    <p className="text-xl font-black text-ink-1">{profile.drillsCount}</p>
                    <p className="text-[10px] font-mono font-bold text-ink-3 uppercase tracking-widest mt-0.5">Drills</p>
                  </div>
                  <div className="bg-canvas border border-hairline p-3.5 rounded-xl text-center">
                    <p className="text-xl font-black text-ink-1">Lvl {profile.avgLevel}</p>
                    <p className="text-[10px] font-mono font-bold text-ink-3 uppercase tracking-widest mt-0.5">Avg Level</p>
                  </div>
                  <div className="bg-canvas border border-hairline p-3.5 rounded-xl text-center">
                    <p className="text-xl font-black text-amber-400 flex items-center justify-center gap-1">
                      <Trophy className="w-4 h-4" />
                      {profile.fitnessRating}%
                    </p>
                    <p className="text-[10px] font-mono font-bold text-ink-3 uppercase tracking-widest mt-0.5">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* 4. CATEGORIES SECTION (ALL 8 CATEGORIES) */}
      <section className="py-16 relative" aria-labelledby="categories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12 space-y-2">
            <h2 id="categories-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-ink-1 uppercase">
              Training Categories
            </h2>
            <p className="text-ink-2 max-w-2xl mx-auto text-sm sm:text-base">
              Select a specialized skill vector to begin your performance calibration.
            </p>
          </Reveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categoryConfigs.map((cat, idx) => {
              const Icon = cat.icon;
              const count = DRILLS.filter(d => d.category === cat.id).length;
              const isDesktopOnly = DESKTOP_ONLY_CATEGORIES.includes(cat.id);
              return (
                <Reveal key={cat.id} delay={idx * 50} className="h-full">
                  <Link
                    href={cat.href}
                    onMouseMove={handleCardMouseMove}
                    className="group relative isolate flex h-full flex-col justify-between overflow-hidden bg-surface-1/70 backdrop-blur-xl border border-hairline rounded-2xl p-5 hover:border-hairline-2 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    {/* Top accent hairline */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${cat.iconBg.replace('bg-gradient-to-br ', '')} opacity-70`} />

                    {/* Cursor-tracked spotlight */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), ${cat.glow}, transparent 70%)` }}
                    />

                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`relative w-11 h-11 rounded-xl ${cat.iconBg} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                          <div className={`absolute -inset-1.5 rounded-xl ${cat.iconBg} opacity-40 blur-md -z-10 group-hover:opacity-70 transition-opacity`} />
                          <Icon className="w-5.5 h-5.5" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          {isDesktopOnly && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                              Desktop Only
                            </span>
                          )}
                          <span className="text-2xs font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 text-ink-3 border border-hairline">
                            {count} Drills
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className={`text-base font-bold text-ink-1 transition-colors group-hover:${cat.accentColor}`}>
                          {cat.name}
                        </h3>
                        {cat.featured && (
                          <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold uppercase rounded-full">
                            Popular
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-ink-2 leading-relaxed mb-4 line-clamp-2">{cat.description}</p>
                    </div>

                    <div className={`relative pt-4 border-t border-hairline flex items-center justify-between text-xs font-semibold ${cat.accentColor}`}>
                      <span>Explore Category</span>
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
      <section className="py-16 border-t border-hairline bg-surface-1/40" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12 space-y-2">
            <h2 id="features-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-ink-1 uppercase">
              Engine Diagnostics &amp; Features
            </h2>
            <p className="text-ink-2 max-w-2xl mx-auto text-sm sm:text-base">
              Built for high-refresh rates and instant tactile response in all modern browsers.
            </p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal key={index} delay={index * 50}>
                  <article className="group relative overflow-hidden bg-surface-1/70 backdrop-blur-xl border border-hairline rounded-2xl p-5 hover:border-hairline-2 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <div className={`absolute -inset-1.5 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-50 blur-md -z-10 transition-opacity`} />
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-ink-1 mb-1.5 uppercase tracking-tight">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">{feature.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. AUDIENCE PROFILE ADAPTATION */}
      <section className="py-16 border-t border-hairline" aria-labelledby="audience-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12 space-y-2">
            <h2 id="audience-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-ink-1 uppercase">
              Target Audience
            </h2>
            <p className="text-ink-2 max-w-2xl mx-auto text-sm sm:text-base">
              Tailored training paths whether you are calibrating aim or expanding cognitive limits.
            </p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {audienceData.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={index} delay={index * 60}>
                  <div className="group text-center p-6 bg-surface-1/70 backdrop-blur-xl border border-hairline rounded-2xl hover:border-hairline-2 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className={`relative w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-40 blur-md -z-10 transition-opacity`} />
                      <Icon className="w-6.5 h-6.5" />
                    </div>
                    <h3 className="text-base font-bold text-ink-1 mb-2 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-20 border-t border-hairline bg-surface-1/60 relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Reveal>
            <h2 id="cta-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-ink-1 uppercase">
              Start Training Now
            </h2>
            <p className="text-ink-2 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              No accounts. No payments. {totalDrillsCount} browser-native drills ready for instant calibration.
            </p>
            <div className="pt-4">
              <Link 
                href="/drills" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-9 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] transition-all"
              >
                Browse All {totalDrillsCount} Drills
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}