'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Target, Sparkles, Gamepad2, Brain, Eye, Dumbbell, Database,
  ChevronRight, Activity, Zap, Compass, ShieldCheck, MousePointerClick, Timer, Infinity as InfinityIcon
} from 'lucide-react';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import DrillGlobalSettings from '@/components/drill/DrillGlobalSettings';
import { DRILLS, DESKTOP_ONLY_CATEGORIES } from '@/lib/drillsRegistry';

const categoryData = [
  {
    name: 'FPS Gaming',
    cat: 'fps',
    color: 'from-red-500 to-orange-600',
    ring: 'group-hover:shadow-red-500/20',
    glow: 'rgba(239,68,68,0.28)',
    accent: 'text-red-400',
    icon: Gamepad2,
    description: 'Aim trainer, flick shots, tracking and recoil control for competitive shooters',
    actionText: 'Track and flick-click moving target nodes in precision space',
    goals: ['aim', '5min'],
    href: '/drills/fps'
  },
  {
    name: 'Cognitive Drills',
    cat: 'cognitive',
    color: 'from-purple-500 to-indigo-600',
    ring: 'group-hover:shadow-purple-500/20',
    glow: 'rgba(168,85,247,0.28)',
    accent: 'text-purple-400',
    icon: Brain,
    description: 'Executive control, attention stamina, focus, and multi-tasking exercises',
    actionText: 'Process rapid rule switches and dual-stimulus streams',
    goals: ['new', 'remember', '5min'],
    href: '/drills/cognitive'
  },
  {
    name: 'Memory Training',
    cat: 'memory',
    color: 'from-indigo-500 to-purple-600',
    ring: 'group-hover:shadow-indigo-500/20',
    glow: 'rgba(99,102,241,0.28)',
    accent: 'text-indigo-400',
    icon: Database,
    description: 'Short-term digit span, working memory N-back, and spatial pattern recall',
    actionText: 'Hold and repeat progressive digit and spatial sequences',
    goals: ['remember', 'new'],
    href: '/drills/memory'
  },
  {
    name: 'Motor Skills',
    cat: 'motor',
    color: 'from-emerald-500 to-teal-600',
    ring: 'group-hover:shadow-emerald-500/20',
    glow: 'rgba(16,185,129,0.28)',
    accent: 'text-emerald-400',
    icon: Dumbbell,
    description: 'Hand-eye coordination, timing accuracy, precision control, and finger speed',
    actionText: 'Perform micro-target snaps and rhythm timing clicks',
    goals: ['aim', '5min'],
    href: '/drills/motor'
  },
  {
    name: 'Physical Drills',
    cat: 'physical',
    color: 'from-rose-500 to-red-600',
    ring: 'group-hover:shadow-rose-500/20',
    glow: 'rgba(251,113,133,0.28)',
    accent: 'text-rose-400',
    icon: Compass,
    description: 'Balance training, WASD directional reflex, and body coordination challenges',
    actionText: 'Execute directional WASD key reflexes and spatial evasion',
    goals: ['react', 'new'],
    href: '/drills/physical'
  },
  {
    name: 'Visual Training',
    cat: 'visual',
    color: 'from-fuchsia-500 to-pink-600',
    ring: 'group-hover:shadow-fuchsia-500/20',
    glow: 'rgba(232,121,249,0.28)',
    accent: 'text-fuchsia-400',
    icon: Eye,
    description: 'Peripheral vision flash detection, discrete saccade snaps, and visual recognition',
    actionText: 'Find and fixate on flash stimuli across wide visual fields',
    goals: ['react', '5min'],
    href: '/drills/visual'
  },
  {
    name: 'Visual Tracking',
    cat: 'visual-tracking',
    color: 'from-cyan-500 to-blue-600',
    ring: 'group-hover:shadow-cyan-500/20',
    glow: 'rgba(34,211,238,0.28)',
    accent: 'text-cyan-400',
    icon: Activity,
    description: 'Continuous pursuit smooth tracking, gaze stability, and trajectory prediction',
    actionText: 'Maintain continuous cursor pursuit on smooth motion paths',
    goals: ['aim', 'react'],
    href: '/drills/visual-tracking'
  },
  {
    name: 'Reaction Speed',
    cat: 'reaction-speed',
    color: 'from-amber-500 to-yellow-600',
    ring: 'group-hover:shadow-amber-500/20',
    glow: 'rgba(245,158,11,0.28)',
    accent: 'text-amber-400',
    icon: Zap,
    description: 'Simple & choice stimulus response, barrier pursuit, and reflex calibration',
    actionText: 'React to instant visual color triggers and latency spikes',
    goals: ['react', '5min', 'new'],
    href: '/drills/reaction-speed'
  },
];

const goalsList = [
  { id: 'all', label: 'All Categories', icon: InfinityIcon },
  { id: 'new', label: 'New Here', icon: Sparkles },
  { id: 'aim', label: 'Improve My Aim', icon: Target },
  { id: 'react', label: 'React Faster', icon: Zap },
  { id: 'remember', label: 'Remember More', icon: Database },
  { id: '5min', label: 'Just 5 Minutes', icon: Timer },
];

const trustStrip = [
  { icon: ShieldCheck, label: 'No sign-up, ever' },
  { icon: MousePointerClick, label: 'Instant start, zero installs' },
  { icon: Activity, label: '100% runs in your browser' },
];

function handleCardMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export default function DrillsDirectoryClient() {
  const [selectedGoal, setSelectedGoal] = useState('all');
  const [isMobile, setIsMobile] = useState(false);

  const totalDrills = DRILLS.length;

  // Detect mobile viewport so desktop-only categories can be pushed to the end
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const updateIsMobile = () => setIsMobile(mq.matches);
    updateIsMobile();
    mq.addEventListener('change', updateIsMobile);
    return () => mq.removeEventListener('change', updateIsMobile);
  }, []);

  // On mobile, mobile-supported categories lead and desktop-only ones move to the end
  const baseCategories = isMobile
    ? [...categoryData].sort((a, b) => {
        const aDesktopOnly = DESKTOP_ONLY_CATEGORIES.includes(a.cat);
        const bDesktopOnly = DESKTOP_ONLY_CATEGORIES.includes(b.cat);
        if (aDesktopOnly === bDesktopOnly) return 0;
        return aDesktopOnly ? 1 : -1;
      })
    : categoryData;

  // Re-sort categories based on selected goal
  const sortedCategories = [...baseCategories].sort((a, b) => {
    if (selectedGoal === 'all') return 0;
    const aMatch = a.goals.includes(selectedGoal);
    const bMatch = b.goals.includes(selectedGoal);
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans relative overflow-hidden flex flex-col justify-between">

      {/* Layered premium background: mesh blobs + grid + grain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] bg-blue-600/[0.14] rounded-full blur-[150px]" />
        <div className="absolute top-[22%] -left-40 w-[520px] h-[520px] bg-purple-600/[0.10] rounded-full blur-[140px]" />
        <div className="absolute top-[38%] -right-40 w-[520px] h-[480px] bg-cyan-500/[0.08] rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 relative z-10 w-full flex-1">

        {/* Hero Banner */}
        <Reveal className="text-center max-w-3xl mx-auto mb-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 font-bold uppercase tracking-wider shadow-[0_0_20px_-6px_rgba(59,130,246,0.5)]">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Complete Training Hub Directory</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-ink-1 uppercase tracking-tight leading-[0.95]">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Training Hubs</span>
          </h1>
          <p className="text-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {totalDrills} scientific, browser-native performance drills across 8 specialized categories. Zero installs, instant start.
          </p>

          {/* Trust Strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2">
            {trustStrip.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-1.5 text-2xs sm:text-xs font-mono font-semibold text-ink-3 uppercase tracking-wider">
                  <Icon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Universal Session Settings (sound / red flash / target timeouts) */}
        <Reveal className="max-w-2xl mx-auto mb-10">
          <DrillGlobalSettings />
        </Reveal>

        {/* Goal Picker Pills Bar (Horizontal scrollable on mobile) */}
        <Reveal className="mb-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            <span className="text-2xs font-mono font-bold text-ink-3 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
              Filter Goal:
            </span>
            {goalsList.map((goal) => {
              const isSelected = selectedGoal === goal.id;
              const GoalIcon = goal.icon;
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400/50 shadow-lg shadow-blue-500/25'
                      : 'bg-surface-1/80 backdrop-blur text-ink-2 border-hairline hover:border-hairline-2 hover:text-ink-1 hover:bg-surface-2'
                  }`}
                >
                  <GoalIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-ink-3'}`} />
                  {goal.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {sortedCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const catDrillsCount = DRILLS.filter(d => d.category === cat.cat).length;
            const isMatch = selectedGoal === 'all' || cat.goals.includes(selectedGoal);
            const isDesktopOnly = DESKTOP_ONLY_CATEGORIES.includes(cat.cat);

            return (
              <Reveal key={cat.cat} delay={idx * 40} className="h-full">
                <Link
                  href={cat.href}
                  onMouseMove={handleCardMouseMove}
                  className={`group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-3xl border bg-surface-1/70 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${cat.ring} hover:shadow-2xl ${
                    isMatch ? 'border-hairline hover:border-hairline-2 opacity-100' : 'border-hairline/50 opacity-55 hover:opacity-90'
                  }`}
                >
                  {/* Cursor-tracked spotlight */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), ${cat.glow}, transparent 70%)` }}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-5 gap-3">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`relative shrink-0 w-13 h-13 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                          <div className={`absolute -inset-1.5 rounded-2xl bg-gradient-to-br ${cat.color} opacity-40 blur-md -z-10 group-hover:opacity-70 transition-opacity`} />
                          <Icon className="w-6 h-6" />
                        </div>
                        <h2 className={`text-xl font-bold text-ink-1 transition-colors group-hover:${cat.accent} truncate`}>
                          {cat.name}
                        </h2>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        {isDesktopOnly && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                            Desktop Only
                          </span>
                        )}
                        <span className="text-2xs font-mono font-semibold px-2.5 py-1 rounded-full bg-surface-2 text-ink-3 border border-hairline">
                          {catDrillsCount} Drills
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-ink-2 leading-relaxed mb-3.5 line-clamp-2">
                      {cat.description}
                    </p>

                    {/* Action Description Line */}
                    <div className="p-3 rounded-xl bg-canvas/80 border border-hairline text-2xs text-ink-3 font-mono mb-5">
                      <span className={`${cat.accent} font-bold block mb-0.5`}>What you do:</span>
                      <span className="text-ink-2">{cat.actionText}</span>
                    </div>
                  </div>

                  <div className={`relative pt-4 border-t border-hairline flex items-center justify-between text-xs font-semibold ${cat.accent}`}>
                    <span>Enter Hub</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
