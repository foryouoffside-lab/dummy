'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';
import { DRILLS, DESKTOP_ONLY_CATEGORIES } from '@/lib/drillsRegistry';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { LOCALES } from '@/lib/i18n/locales';
import {
  Target, ArrowRight, Zap, Trophy, BarChart3, Sparkles,
  Brain, Crosshair, Shield, CheckCircle2, Globe,
  Check, Play, RotateCcw, Award, ChevronDown, ChevronRight,
  MousePointer, Timer, Layers, Sliders, Gamepad2, Database,
  Dumbbell, Compass, Eye, Activity, ShieldCheck, MousePointerClick,
  Infinity as InfinityIcon
} from 'lucide-react';

function handleCardMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

// Verifiable platform facts, derived from the drill registry and locale config
const CATEGORY_COUNT = new Set(DRILLS.map((d) => d.category)).size;
const LANGUAGE_COUNT = LOCALES.length;

// Headline platform facts
const PLATFORM_FACTS = [
  {
    value: `${DRILLS.length}`,
    label: 'Interactive Drills',
    detail: 'Aim, reaction, memory, attention, coordination, and visual tracking — every drill playable immediately.',
    icon: Target,
    gradient: 'from-blue-500 to-cyan-500',
    accent: 'text-cyan-400',
    hoverBorder: 'hover:border-blue-500/40',
  },
  {
    value: `${CATEGORY_COUNT}`,
    label: 'Skill Categories',
    detail: 'Dedicated hubs grouping drills by cognitive and motor discipline for structured daily progression.',
    icon: Layers,
    gradient: 'from-purple-500 to-indigo-600',
    accent: 'text-purple-400',
    hoverBorder: 'hover:border-purple-500/40',
  },
  {
    value: `${LANGUAGE_COUNT}`,
    label: 'World Languages',
    detail: 'English, Português, Español, 日本語, Deutsch, and 한국어 across all hubs with native locale routing.',
    icon: Globe,
    gradient: 'from-emerald-500 to-teal-500',
    accent: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/40',
  },
  {
    value: '0',
    label: 'Accounts & Installs',
    detail: 'No registration, no software downloads, no paywalls. Everything executes locally in your browser tab.',
    icon: Shield,
    gradient: 'from-amber-500 to-orange-500',
    accent: 'text-amber-400',
    hoverBorder: 'hover:border-amber-500/40',
  },
];

// 8 Primary Training Categories matching DrillsDirectoryClient
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
    actionText: 'Track and flick-click moving targets under time pressure',
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
    actionText: 'React to sudden colour triggers and see your response time',
    goals: ['react', '5min', 'new'],
    href: '/drills/reaction-speed'
  },
];

// Goal filter pills
const goalsList = [
  { id: 'all', label: 'All Categories', icon: InfinityIcon },
  { id: 'new', label: 'New Here', icon: Sparkles },
  { id: 'aim', label: 'Improve My Aim', icon: Target },
  { id: 'react', label: 'React Faster', icon: Zap },
  { id: 'remember', label: 'Remember More', icon: Database },
  { id: '5min', label: 'Just 5 Minutes', icon: Timer },
];

// Trust badges strip
const trustStrip = [
  { icon: ShieldCheck, label: 'No sign-up, ever' },
  { icon: MousePointerClick, label: 'Instant start, zero installs' },
  { icon: Activity, label: '100% runs in your browser' },
];

// Flagship Featured Showcase
const FLAGSHIP_DRILLS = [
  {
    id: 'fps-precision',
    category: 'FPS Precision',
    badge: 'Flagship Aim Drill',
    title: '180° Peripheral Scan & Flick Acquisition',
    href: '/drills/fps/180-degree-awareness',
    difficulty: 'Intermediate',
    duration: '45s+',
    paradigm: "Fitts's Law Target Acquisition",
    description: 'Calibrates spatial saccades and high-angle flick shots against spontaneous peripheral threats. Simulates tactical arena wide swings with zero input delay.',
    metrics: [
      { label: 'Stimulus Window', value: '400 - 800ms' },
      { label: 'Target Arc', value: '180° Horizontal' },
      { label: 'Evaluation', value: 'Time-to-hit' },
      { label: 'Primary Benefit', value: 'Peripheral Saccades' },
    ],
    accentGradient: 'from-red-500 via-orange-500 to-amber-500',
    accentColor: 'text-red-400',
    previewType: 'fps'
  },
  {
    id: 'cognitive-focus',
    category: 'Cognitive Control',
    badge: 'Attention Endurance',
    title: 'Concentration Stamina & Rule-Switching',
    href: '/drills/cognitive/attention/concentration-stamina',
    difficulty: 'Advanced',
    duration: '45s',
    paradigm: 'Executive Function & Task Switching',
    description: 'Forces your prefrontal cortex to alternate cognitive rules between Vowels and Prime numbers under rapid auditory and visual distraction stressors.',
    metrics: [
      { label: 'Rule Interval', value: 'Every 10s' },
      { label: 'Stimulus Shift', value: 'Bimodal Audio/Visual' },
      { label: 'Evaluation', value: 'Switching Cost ms' },
      { label: 'Primary Benefit', value: 'Cognitive Flexibility' },
    ],
    accentGradient: 'from-purple-500 via-indigo-500 to-blue-500',
    accentColor: 'text-purple-400',
    previewType: 'cognitive'
  },
  {
    id: 'memory-nback',
    category: 'Working Memory',
    badge: 'Neuropsych Benchmark',
    title: 'Digit Span & Spatial Chunking Matrix',
    href: '/drills/memory/short-term-memory/digit-span',
    difficulty: 'Adaptive',
    duration: '45s',
    paradigm: "Miller's Law (7 ± 2 Items)",
    description: 'Tests and systematically expands your working memory buffer using forward and reverse rapid number sequences that dynamically adapt to your performance ceiling.',
    metrics: [
      { label: 'Starting Span', value: '3 Digits' },
      { label: 'Max Span', value: '12+ Digits' },
      { label: 'Evaluation', value: 'Sequence Recall %' },
      { label: 'Primary Benefit', value: 'Short-Term Capacity' },
    ],
    accentGradient: 'from-indigo-500 via-blue-500 to-cyan-500',
    accentColor: 'text-indigo-400',
    previewType: 'memory'
  },
  {
    id: 'reaction-strobe',
    category: 'Reaction Speed',
    badge: 'Neural Latency Benchmark',
    title: 'Chroma-Sync Go / No-Go Discrimination',
    href: '/drills/visual/reaction-speed/go/no-go',
    difficulty: 'Intermediate',
    duration: '45s+',
    paradigm: 'Hick-Hyman Law (Choice Reaction)',
    description: 'Isolates motor response inhibition. React instantly to positive chromatic triggers while suppressing false flicks on high-speed distractor stimuli.',
    metrics: [
      { label: 'Target Window', value: '180 - 320ms' },
      { label: 'False Positives', value: 'Zero Tolerance' },
      { label: 'Evaluation', value: 'Mean RT & Misses' },
      { label: 'Primary Benefit', value: 'Inhibitory Control' },
    ],
    accentGradient: 'from-amber-500 via-emerald-500 to-cyan-500',
    accentColor: 'text-amber-400',
    previewType: 'reaction'
  }
];

// Marquee Ticker Hrefs
const TICKER_HREFS = [
  '/drills/fps/180-degree-awareness',
  '/drills/reaction-speed/barrier-sequence-pursuit',
  '/drills/memory/short-term-memory/digit-span',
  '/drills/motor/hand-eye-coordination/aim-trainer',
  '/drills/cognitive/attention/concentration-stamina',
  '/drills/visual-tracking/constant-slow-pursuit',
  '/drills/visual/depth-perception/distance-judgment',
  '/drills/physical/balance-training/stability-challenge',
  '/drills/fps/angle-hold-trainer',
  '/drills/cognitive/attention/divided-attention',
  '/drills/visual/reaction-speed/go/no-go',
  '/drills/motor/hand-eye-coordination/precision-flick-shot',
];

const CATEGORY_ACCENTS = {
  fps: 'text-red-400',
  cognitive: 'text-purple-400',
  memory: 'text-indigo-400',
  motor: 'text-emerald-400',
  physical: 'text-rose-400',
  visual: 'text-fuchsia-400',
  'visual-tracking': 'text-cyan-400',
  'reaction-speed': 'text-amber-400',
};

const tickerDrills = TICKER_HREFS
  .map((href) => DRILLS.find((d) => d.href === href))
  .filter(Boolean);

// Frequently Asked Questions
const FAQ_ITEMS = [
  {
    q: 'Are all the drills really free, with no account?',
    a: 'Yes. Every drill on the site is 100% open — no sign-up, no email wall, and no paid tier. Drills execute entirely inside your local browser tab rather than on an external server, eliminating any usage fees.'
  },
  {
    q: 'How does the site measure reaction time?',
    a: 'Drills time your input with the browser’s high-precision Performance API (performance.now()) and render on HTML5 canvas at your monitor’s native refresh rate. Scores provide a consistent, reproducible benchmark to track your personal performance trajectory.'
  },
  {
    q: 'Where are my scores and progress stored?',
    a: 'Directly in your browser’s localStorage on the device you train with. Your personal bests, XP, and completed session history are never uploaded or synced to external databases.'
  },
  {
    q: 'Can this replace desktop aim trainers like Aim Lab or KovaaK’s?',
    a: 'Desktop trainers excel at 3D custom engine hooks and game-specific sensitivity clones. SkillDrills is engineered for immediate zero-install reflex calibration, warmup routines, and cognitive training that launches in under a second in any tab.'
  },
  {
    q: 'What is the recommended daily training routine?',
    a: 'A proven 5-to-10 minute session consists of: 1 baseline reaction speed test, 2 aim or tracking drills, and 1 memory or cognitive focus challenge. Consistent daily calibration produces measurable improvement over time.'
  }
];

export default function HomePageClient() {
  const { t, localizeHref } = useTranslation();
  const [selectedGoal, setSelectedGoal] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [profile, setProfile] = useState(null);
  const [activeFlagshipTab, setActiveFlagshipTab] = useState('fps-precision');
  const [openFaq, setOpenFaq] = useState(0);

  // Playable Mini-Drill State (5-target reaction sandbox)
  const [sandboxState, setSandboxState] = useState('idle'); // 'idle' | 'running' | 'completed'
  const [currentTarget, setCurrentTarget] = useState(null);
  const [targetCount, setTargetCount] = useState(0);
  const [latencies, setLatencies] = useState([]);
  const [lastClickMs, setLastClickMs] = useState(0);
  const targetSpawnTimeRef = useRef(0);

  const totalDrillsCount = DRILLS.length;

  // Mobile viewport detection for responsive category sorting
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const updateIsMobile = () => setIsMobile(mq.matches);
    updateIsMobile();
    mq.addEventListener('change', updateIsMobile);
    return () => mq.removeEventListener('change', updateIsMobile);
  }, []);

  // On mobile, mobile-supported categories lead; desktop-only ones move to the end
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

  // Load returning athlete dashboard from local storage
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
          sectors: sectorStats
        });
      }
    } catch (e) {}
  }, []);

  // Sandbox Target Spawner
  const spawnNextTarget = useCallback((index) => {
    if (index >= 5) {
      setSandboxState('completed');
      setCurrentTarget(null);
      return;
    }

    const x = Math.floor(Math.random() * 66) + 17;
    const y = Math.floor(Math.random() * 60) + 20;
    const size = Math.floor(Math.random() * 10) + 44; // Touch-friendly 44px-54px

    setCurrentTarget({ x, y, size, id: Date.now() });
    targetSpawnTimeRef.current = performance.now();
  }, []);

  const startSandboxTest = () => {
    setSandboxState('running');
    setTargetCount(0);
    setLatencies([]);
    setLastClickMs(0);
    spawnNextTarget(0);
  };

  const handleTargetClick = (e) => {
    e.stopPropagation();
    if (sandboxState !== 'running') return;

    const hitTime = performance.now();
    const delta = Math.round(hitTime - targetSpawnTimeRef.current);
    
    setLatencies((prev) => [...prev, delta]);
    setLastClickMs(delta);
    const nextCount = targetCount + 1;
    setTargetCount(nextCount);

    spawnNextTarget(nextCount);
  };

  const avgLatency = latencies.length > 0 
    ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) 
    : 0;

  const activeFlagship = FLAGSHIP_DRILLS.find(d => d.id === activeFlagshipTab) || FLAGSHIP_DRILLS[0];

  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans relative overflow-x-hidden selection:bg-blue-500/30 selection:text-cyan-300">
      
      {/* ─────────────────────────────────────────────────────────────
          LAYERED MESH BACKGROUND (Matching DrillsDirectoryClient)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] bg-blue-600/[0.14] rounded-full blur-[150px]" />
        <div className="absolute top-[22%] -left-40 w-[520px] h-[520px] bg-purple-600/[0.10] rounded-full blur-[140px]" />
        <div className="absolute top-[38%] -right-40 w-[520px] h-[480px] bg-cyan-500/[0.08] rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* SEO Semantic Header */}
      <section className="sr-only" aria-label="Platform overview">
        <h2>SkillDrills - Free FPS Aim Trainer & Cognitive Brain Training Platform</h2>
        <p>
          Master your flick mechanics, reaction speed, memory span, and visual tracking with {totalDrillsCount} free interactive training drills. Zero download, 100% client-side precision.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Unified Professional Typography & Mobile CTAs)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-14 sm:pt-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10" aria-labelledby="hero-heading">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Main Copy Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Eyebrow Badge matching DrillsDirectoryClient */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 font-bold uppercase tracking-wider shadow-[0_0_20px_-6px_rgba(59,130,246,0.5)] mx-auto lg:mx-0">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{t('home.badge', `${totalDrillsCount} Free Drills • No Account • Instant Start`)}</span>
              </div>
              
              {/* Master Headline matching DrillsDirectoryClient font scale */}
              <h1 id="hero-heading" className="text-4xl sm:text-6xl lg:text-7xl font-black text-ink-1 uppercase tracking-tight leading-[0.95]">
                {t('home.heroTitlePrefix', 'Master Your')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  {t('home.heroTitleHighlight', 'Mind & Mechanics')}
                </span>
              </h1>
              
              {/* Professional Subtitle */}
              <p className="text-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                {t('home.heroSubtitle', `${totalDrillsCount} free training drills across 8 categories. FPS aim, reaction speed, working memory, attention, and visual tracking. Powered by high-resolution browser clocks with zero installs and instant access.`)}
              </p>

              {/* Trust Strip matching DrillsDirectoryClient */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-1">
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
              
              {/* Action Buttons (Full-width on mobile, side-by-side on desktop) */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <Link 
                  href={localizeHref('/drills')} 
                  className="group relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-bold text-sm sm:text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/45 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  <span>{t('home.exploreBtn', `Browse All ${totalDrillsCount} Free Drills`)}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                
                <Link 
                  href={localizeHref('/drills/reaction-speed/reaction-time-test')} 
                  className="inline-flex items-center justify-center gap-2 bg-surface-1/90 backdrop-blur-md border border-hairline-2 text-ink-1 hover:text-white px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl font-bold text-sm sm:text-base hover:bg-surface-2 hover:border-blue-500/40 active:scale-[0.98] transition-all shadow-lg w-full sm:w-auto"
                >
                  <Zap className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  <span>{t('home.quickStartBtn', 'Take Reaction Test')}</span>
                </Link>
              </div>

              {/* Quick Launch Hotlinks */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs font-mono text-ink-3">
                <span className="uppercase tracking-wider mr-1">Popular:</span>
                <Link 
                  href={localizeHref('/drills/motor/movement-speed/rapid-tapping')}
                  className="px-3 py-1.5 rounded-xl bg-surface-1/80 border border-hairline hover:border-emerald-500/40 hover:text-emerald-300 transition-colors text-ink-2"
                >
                  ⚡ CPS Test
                </Link>
                <Link 
                  href={localizeHref('/drills/fps/flick-shot-training')}
                  className="px-3 py-1.5 rounded-xl bg-surface-1/80 border border-hairline hover:border-red-500/40 hover:text-red-300 transition-colors text-ink-2"
                >
                  🎯 Flick Aim
                </Link>
                <Link 
                  href={localizeHref('/drills/reaction-speed/reaction-time-test')}
                  className="px-3 py-1.5 rounded-xl bg-surface-1/80 border border-hairline hover:border-amber-500/40 hover:text-amber-300 transition-colors text-ink-2"
                >
                  ⚡ Reaction Speed
                </Link>
                <Link 
                  href={localizeHref('/drills/memory/short-term-memory/digit-span')}
                  className="px-3 py-1.5 rounded-xl bg-surface-1/80 border border-hairline hover:border-indigo-500/40 hover:text-indigo-300 transition-colors text-ink-2"
                >
                  🧠 Digit Span
                </Link>
              </div>
              
              {/* Stat Chips */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 max-w-xl mx-auto lg:mx-0 pt-4 border-t border-hairline/80">
                <div className="text-left bg-surface-1/70 backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 border border-hairline shadow-lg">
                  <p className="text-2xl sm:text-4xl font-black text-ink-1 tracking-tight leading-none">{totalDrillsCount}</p>
                  <p className="text-2xs sm:text-xs font-mono font-bold text-ink-3 uppercase tracking-wider mt-1.5">{t('home.statsDrills', 'Free Drills')}</p>
                </div>
                <div className="text-left bg-surface-1/70 backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 border border-hairline shadow-lg">
                  <p className="text-2xl sm:text-4xl font-black text-cyan-400 tracking-tight leading-none">{CATEGORY_COUNT}</p>
                  <p className="text-2xs sm:text-xs font-mono font-bold text-ink-3 uppercase tracking-wider mt-1.5">{t('home.statsCategories', 'Categories')}</p>
                </div>
                <div className="text-left bg-surface-1/70 backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 border border-hairline shadow-lg">
                  <p className="text-2xl sm:text-4xl font-black text-emerald-400 tracking-tight leading-none">$0</p>
                  <p className="text-2xs sm:text-xs font-mono font-bold text-ink-3 uppercase tracking-wider mt-1.5">{t('home.statsCost', 'Forever Free')}</p>
                </div>
              </div>
            </div>

            {/* Right Desktop Visualizer & Aim Telemetry Panel */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative bg-surface-1/85 backdrop-blur-2xl border border-hairline-2 rounded-3xl p-6 shadow-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300">
                
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
                
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-hairline text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-ink-1 font-bold tracking-wider uppercase">Drill Engine</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/20 font-bold">
                    CLIENT-SIDE
                  </span>
                </div>

                <div className="relative aspect-square max-w-[270px] mx-auto bg-canvas/90 rounded-full border border-blue-500/20 flex items-center justify-center overflow-hidden shadow-inner">
                  <div className="absolute inset-2 border border-blue-500/10 rounded-full" />
                  <div className="absolute inset-12 border border-blue-500/15 rounded-full" />
                  <div className="absolute inset-24 border border-blue-500/10 rounded-full" />
                  
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-blue-500/20" />
                  <div className="absolute inset-y-0 left-1/2 w-[1px] bg-blue-500/20" />

                  <div className="absolute w-[2px] h-1/2 bg-gradient-to-t from-cyan-400 via-blue-500 to-transparent top-0 left-1/2 origin-bottom animate-[spin_3.5s_linear_infinite]" />
                  
                  <div className="absolute w-4 h-4 bg-emerald-400 rounded-full top-1/4 left-1/3 animate-ping shadow-[0_0_14px_#4ade80]" />
                  <div className="absolute w-2 h-2 bg-emerald-500 rounded-full top-1/4 left-1/3 shadow-[0_0_8px_#22c55e]" />
                  
                  <div className="absolute w-3.5 h-3.5 bg-red-400 rounded-full bottom-1/3 right-1/4 animate-ping shadow-[0_0_12px_#f87171]" style={{ animationDelay: '1.2s' }} />
                  <div className="absolute w-1.5 h-1.5 bg-red-500 rounded-full bottom-1/3 right-1/4 shadow-[0_0_6px_#ef4444]" />

                  <div className="absolute w-4 h-4 bg-purple-400 rounded-full top-1/2 right-1/3 animate-ping shadow-[0_0_14px_#c084fc]" style={{ animationDelay: '2.4s' }} />
                  <div className="absolute w-2 h-2 bg-purple-500 rounded-full top-1/2 right-1/3 shadow-[0_0_8px_#a855f7]" />
                  
                  <div className="absolute text-cyan-400 w-8 h-8 flex items-center justify-center font-light">
                    <Crosshair className="w-6 h-6 animate-pulse" />
                  </div>
                </div>

                <div className="mt-4 bg-canvas/95 rounded-2xl border border-hairline p-4 font-mono text-xs space-y-2.5 text-ink-2">
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-cyan-300 font-bold">&gt; DRILLS:</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{totalDrillsCount} live</span>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-cyan-300 font-bold">&gt; RENDER:</span>
                    <span className="text-ink-1 font-bold">Canvas @ native Hz</span>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-cyan-300 font-bold">&gt; TIMER:</span>
                    <span className="text-ink-1 font-bold">performance.now()</span>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-cyan-300 font-bold">&gt; SCORES:</span>
                    <span className="text-purple-300 font-bold">Browser localStorage</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </Reveal>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. TRAINING DISCIPLINES / CATEGORY HUBS DIRECTORY
             (Exact font sizes, cards, and spotlight effects from DrillsDirectoryClient)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-t border-hairline relative z-10" aria-labelledby="categories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 font-bold uppercase tracking-wider shadow-[0_0_20px_-6px_rgba(59,130,246,0.5)]">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{t('home.sectorsBadge', 'Training Disciplines')}</span>
            </div>
            <h2 id="categories-heading" className="text-3xl sm:text-5xl font-black text-ink-1 uppercase tracking-tight leading-[0.95]">
              {t('home.sectorsTitlePrefix', 'Explore All')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                {t('home.sectorsTitleHighlight', '8 Disciplines')}
              </span>
            </h2>
            <p className="text-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {t('home.sectorsSubtitle', 'Targeted interactive drills for aim, reaction speed, memory, focus, and visual coordination. Choose a discipline to begin.')}
            </p>
          </Reveal>

          {/* Goal Picker Pills Bar (Horizontal scrollable on mobile) */}
          <Reveal className="mb-10">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCategories.map((cat, idx) => {
              const Icon = cat.icon;
              const catDrillsCount = DRILLS.filter(d => d.category === cat.cat).length;
              const isMatch = selectedGoal === 'all' || cat.goals.includes(selectedGoal);
              const isDesktopOnly = DESKTOP_ONLY_CATEGORIES.includes(cat.cat);
              const catTitle = t('sectors.' + cat.cat + '.title', cat.name);
              const catDesc = t('sectors.' + cat.cat + '.desc', cat.description);
              const catHref = localizeHref(cat.href);

              return (
                <Reveal key={cat.cat} delay={idx * 30} className="h-full">
                  <Link
                    href={catHref}
                    onMouseMove={handleCardMouseMove}
                    className={`group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-3xl border bg-surface-1/70 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${cat.ring} hover:shadow-2xl ${
                      isMatch ? 'border-hairline hover:border-hairline-2 opacity-100' : 'border-hairline/50 opacity-55 hover:opacity-90'
                    }`}
                  >
                    {/* Spotlight tracking cursor */}
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
                          <h3 className={`text-xl font-bold text-ink-1 transition-colors group-hover:${cat.accent} truncate`}>
                            {catTitle}
                          </h3>
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
                        {catDesc}
                      </p>

                      {/* Action Description Line */}
                      <div className="p-3 rounded-xl bg-canvas/80 border border-hairline text-2xs text-ink-3 font-mono mb-5">
                        <span className={`${cat.accent} font-bold block mb-0.5`}>What you do:</span>
                        <span className="text-ink-2">{cat.actionText}</span>
                      </div>
                    </div>

                    <div className={`relative pt-4 border-t border-hairline flex items-center justify-between text-xs font-semibold ${cat.accent}`}>
                      <span>{t('home.viewHub', 'Enter Hub')}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. PLAYABLE IN-PAGE MINI DRILL (Interactive Reaction Sandbox)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-t border-hairline bg-surface-1/40 relative overflow-hidden" aria-labelledby="sandbox-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="bg-surface-1/90 border border-hairline-2 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden relative">
              
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Info Column */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Instant Live Benchmark</span>
                  </div>

                  <h2 id="sandbox-heading" className="text-2xl sm:text-4xl font-black text-ink-1 uppercase tracking-tight leading-tight">
                    Test Your Reaction &amp; Aim Right Now
                  </h2>

                  <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
                    Click or tap the 5 glowing targets sequentially as fast as they appear. Measures stimulus-to-click latency via the browser&rsquo;s high-resolution timer.
                  </p>

                  {/* Latency feedback stats */}
                  <div className="grid grid-cols-2 gap-3 pt-1 font-mono">
                    <div className="p-3 rounded-xl bg-canvas border border-hairline">
                      <p className="text-2xs text-ink-3 uppercase tracking-wider font-bold">Last Target</p>
                      <p className="text-xl font-black text-cyan-400 mt-0.5">
                        {lastClickMs > 0 ? `${lastClickMs} ms` : '--'}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-canvas border border-hairline">
                      <p className="text-2xs text-ink-3 uppercase tracking-wider font-bold">Average Latency</p>
                      <p className="text-xl font-black text-emerald-400 mt-0.5">
                        {avgLatency > 0 ? `${avgLatency} ms` : '--'}
                      </p>
                    </div>
                  </div>

                  {sandboxState === 'completed' && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
                        <Award className="w-4 h-4" />
                        <span>Calibration Complete! Average: {avgLatency}ms</span>
                      </div>
                      <p className="text-ink-2 text-xs leading-relaxed">
                        {avgLatency < 220 
                          ? '🔥 Elite reaction tier — well inside competitive esports reflex ranges.' 
                          : avgLatency < 280 
                          ? '⚡ Solid reflex speed. Consistent flick sessions will push you sub-220ms.' 
                          : '🎯 Good foundational baseline. Train your saccadic response in the Reaction Speed hub.'}
                      </p>
                      <Link 
                        href={localizeHref('/drills/reaction-speed')}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 pt-1"
                      >
                        Train Reaction Drills <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Right Interactive Target Arena */}
                <div className="lg:col-span-7">
                  <div 
                    className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-canvas/95 rounded-2xl border border-hairline-2 overflow-hidden shadow-inner flex items-center justify-center select-none touch-manipulation"
                  >
                    {/* Tech Grid Backdrop */}
                    <div 
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    />

                    {/* State 1: Idle Screen */}
                    {sandboxState === 'idle' && (
                      <div className="text-center space-y-4 p-6 z-10">
                        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-cyan-400 shadow-lg shadow-blue-500/10">
                          <MousePointer className="w-7 h-7 animate-bounce" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-ink-1 uppercase tracking-wider">Ready For Calibration?</p>
                          <p className="text-xs text-ink-3 mt-1">Acquire 5 targets sequentially to benchmark your reaction speed.</p>
                        </div>
                        <button
                          type="button"
                          onClick={startSandboxTest}
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all"
                        >
                          Start 5-Target Test
                        </button>
                      </div>
                    )}

                    {/* State 2: Running Target Mode */}
                    {sandboxState === 'running' && currentTarget && (
                      <>
                        <div className="absolute top-3 left-4 text-xs font-mono text-ink-3 z-10 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>TARGET {targetCount + 1} OF 5</span>
                        </div>

                        {/* Interactive Target (Touch-friendly minimum size) */}
                        <button
                          type="button"
                          onClick={handleTargetClick}
                          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-red-500 to-rose-600 border-2 border-white flex items-center justify-center shadow-[0_0_20px_#ef4444] hover:scale-110 active:scale-90 transition-transform cursor-crosshair group touch-manipulation"
                          style={{
                            left: `${currentTarget.x}%`,
                            top: `${currentTarget.y}%`,
                            width: `${currentTarget.size}px`,
                            height: `${currentTarget.size}px`,
                          }}
                          aria-label="Click target"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
                          <span className="absolute inset-0 rounded-full border border-red-300 animate-ping pointer-events-none opacity-75" />
                        </button>
                      </>
                    )}

                    {/* State 3: Completed Screen */}
                    {sandboxState === 'completed' && (
                      <div className="text-center space-y-4 p-6 z-10">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                          <Trophy className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="text-xl font-black text-ink-1 tracking-tight">{avgLatency} ms Avg Reaction</p>
                          <p className="text-xs text-ink-3 mt-0.5">5 of 5 Targets Acquired Successfully</p>
                        </div>
                        <button
                          type="button"
                          onClick={startSandboxTest}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-1 border border-hairline-2 text-ink-1 font-bold text-xs hover:bg-surface-2 transition-all active:scale-95"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Retest Latency
                        </button>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. PLATFORM FACTS (Verified Architecture)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-t border-hairline relative z-10" aria-labelledby="facts-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5 text-cyan-300" />
              <span>Platform Specifications</span>
            </div>

            <h2 id="facts-heading" className="text-3xl sm:text-5xl font-black text-ink-1 uppercase tracking-tight leading-[0.95]">
              The Entire Library, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">100% Open</span>
            </h2>

            <p className="text-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Zero paywalls, zero accounts, and zero bloated installers. What you see is available immediately in your browser.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLATFORM_FACTS.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <Reveal key={fact.label} delay={index * 50}>
                  <div
                    onMouseMove={handleCardMouseMove}
                    className={`group relative h-full bg-surface-1/70 backdrop-blur-xl border border-hairline rounded-3xl p-6 hover:-translate-y-1.5 transition-all duration-300 shadow-xl overflow-hidden ${fact.hoverBorder}`}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${fact.gradient}`} />
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${fact.gradient} flex items-center justify-center text-white shadow-lg mb-4`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-3xl sm:text-4xl font-black text-ink-1 tracking-tight leading-none">{fact.value}</p>
                    <h3 className={`text-xs font-mono font-bold uppercase tracking-wider mt-2.5 mb-2 ${fact.accent}`}>{fact.label}</h3>
                    <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">{fact.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <p className="mt-8 text-center text-xs sm:text-sm text-ink-3 max-w-3xl mx-auto leading-relaxed">
              Drill and category counts are derived dynamically from the build registry. Your metrics remain strictly on your personal device.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. FLAGSHIP SHOWCASE (Interactive Tabbed Drill Deep-Dive)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-t border-hairline bg-surface-1/40 relative overflow-hidden" aria-labelledby="flagship-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <Reveal className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Flagship Mechanics</span>
            </div>
            
            <h2 id="flagship-heading" className="text-3xl sm:text-5xl font-black text-ink-1 uppercase tracking-tight leading-[0.95]">
              Science-Backed Training Formats
            </h2>
            
            <p className="text-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Structured on validated experimental neuropsychology paradigms and Fitts&rsquo;s motor targeting principles.
            </p>

            {/* Interactive Tab Switcher */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {FLAGSHIP_DRILLS.map((drill) => (
                <button
                  key={drill.id}
                  type="button"
                  onClick={() => setActiveFlagshipTab(drill.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
                    activeFlagshipTab === drill.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 scale-105'
                      : 'bg-surface-1/80 border border-hairline text-ink-3 hover:text-ink-1 hover:border-hairline-2'
                  }`}
                >
                  {drill.category}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Active Flagship Display Card */}
          <Reveal>
            <div className="bg-surface-1/90 border border-hairline-2 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl overflow-hidden relative">
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${activeFlagship.accentGradient}`} />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Detail Column */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-2xs font-mono font-bold px-2.5 py-1 rounded-full bg-white/5 border border-hairline ${activeFlagship.accentColor}`}>
                      {activeFlagship.badge}
                    </span>
                    <span className="text-2xs font-mono text-ink-3 bg-canvas px-2.5 py-1 rounded-full border border-hairline">
                      Paradigm: {activeFlagship.paradigm}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-ink-1 tracking-tight">
                    {activeFlagship.title}
                  </h3>

                  <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
                    {activeFlagship.description}
                  </p>

                  {/* 4 Metric Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                    {activeFlagship.metrics.map((m) => (
                      <div key={m.label} className="p-2.5 rounded-xl bg-canvas border border-hairline text-center">
                        <p className="text-2xs font-mono text-ink-3 uppercase">{m.label}</p>
                        <p className="text-xs font-bold text-ink-1 mt-0.5">{m.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      href={localizeHref(activeFlagship.href)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white px-7 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider hover:shadow-lg shadow-blue-500/25 active:scale-95 transition-all"
                    >
                      <Play className="w-4 h-4 fill-white" /> Launch {activeFlagship.category} Drill
                    </Link>
                  </div>
                </div>

                {/* Right Animated Simulation Graphic */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-video bg-canvas/95 rounded-2xl border border-hairline-2 overflow-hidden shadow-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-2xs font-mono text-ink-3 border-b border-hairline pb-2">
                      <span className="text-cyan-300 font-bold">DRILL SIMULATION</span>
                      <span>PREVIEW</span>
                    </div>

                    <div className="relative w-full h-36 flex items-center justify-center">
                      <div 
                        className="absolute inset-0 opacity-15"
                        style={{
                          backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
                          backgroundSize: '16px 16px',
                        }}
                      />

                      {activeFlagship.previewType === 'fps' && (
                        <>
                          <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full border-2 border-red-500 bg-red-500/20 animate-ping" />
                          <div className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-red-500 border border-white flex items-center justify-center shadow-lg shadow-red-500/50">
                            <div className="w-1 h-1 bg-white rounded-full" />
                          </div>
                          <div className="absolute bottom-1/4 right-1/3 w-5 h-5 rounded-full bg-amber-400 border border-white shadow-md animate-pulse" />
                        </>
                      )}

                      {activeFlagship.previewType === 'cognitive' && (
                        <div className="grid grid-cols-3 gap-2">
                          <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500 flex items-center justify-center font-mono font-black text-purple-300 text-lg">A</div>
                          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500 flex items-center justify-center font-mono font-black text-indigo-300 text-lg">7</div>
                          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500 flex items-center justify-center font-mono font-black text-cyan-300 text-lg">E</div>
                        </div>
                      )}

                      {activeFlagship.previewType === 'memory' && (
                        <div className="flex gap-2 font-mono">
                          {['4', '9', '2', '7', '?'].map((d, i) => (
                            <div key={i} className={`w-10 h-12 rounded-lg border flex items-center justify-center font-bold text-base ${i === 4 ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 animate-pulse' : 'border-hairline bg-surface-1 text-white'}`}>
                              {d}
                            </div>
                          ))}
                        </div>
                      )}

                      {activeFlagship.previewType === 'reaction' && (
                        <div className="relative flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center animate-ping" />
                          <div className="absolute w-14 h-14 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white font-mono font-bold text-xs shadow-[0_0_20px_#10b981]">
                            GO!
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-2xs font-mono text-ink-3 border-t border-hairline pt-2">
                      <span>STIMULUS PROTOCOL</span>
                      <span className="text-emerald-400 font-bold">CLIENT RUNTIME</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. THE 3-STEP ROUTINE ("How Daily Skill Mastery Works")
          ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" aria-labelledby="steps-heading">
        <Reveal className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <Timer className="w-3.5 h-3.5 text-emerald-400" />
            <span>The 5-Minute Daily Routine</span>
          </div>

          <h2 id="steps-heading" className="text-3xl sm:text-5xl font-black text-ink-1 uppercase tracking-tight leading-[0.95]">
            How Daily Skill Mastery Works
          </h2>

          <p className="text-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Zero complex setups or driver installations. Complete your daily warmup or cognitive training session in three streamlined steps.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal delay={0}>
            <div className="h-full bg-surface-1/70 backdrop-blur-xl border border-hairline rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-xl hover:border-blue-500/40 transition-all">
              <span className="text-5xl font-black text-white/5 absolute top-4 right-5 font-mono select-none">01</span>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5">
                <Crosshair className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-ink-1 uppercase tracking-tight mb-2">
                1. Calibrate Your Baseline
              </h3>
              <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                Open any drill directly in your browser. Complete a 45-second calibration round to establish your current reaction latency, flick accuracy, or memory span.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full bg-surface-1/70 backdrop-blur-xl border border-hairline rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-xl hover:border-purple-500/40 transition-all">
              <span className="text-5xl font-black text-white/5 absolute top-4 right-5 font-mono select-none">02</span>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-ink-1 uppercase tracking-tight mb-2">
                2. Adaptive Progressive Drills
              </h3>
              <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                As your accuracy improves, our client engine dynamically tightens stimulus intervals, shrinks target radii, and introduces multi-tasking stressors.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="h-full bg-surface-1/70 backdrop-blur-xl border border-hairline rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-xl hover:border-emerald-500/40 transition-all">
              <span className="text-5xl font-black text-white/5 absolute top-4 right-5 font-mono select-none">03</span>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-ink-1 uppercase tracking-tight mb-2">
                3. Private Local Progression
              </h3>
              <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                Review your session logs, reaction graphs and personal bests. Everything is written to your browser&rsquo;s local storage on this device &mdash; private and instant.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. RETURNING ATHLETE LOCAL DASHBOARD (If Data Exists)
          ───────────────────────────────────────────────────────────── */}
      {profile && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Reveal>
            <div className="bg-surface-1/85 border border-hairline-2 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-70" />
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-ink-1 uppercase tracking-tight">Your Local Training Dashboard</h2>
                    <p className="text-xs text-ink-3">Locally stored metrics across completed sessions</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto font-mono">
                  <div className="bg-canvas border border-hairline p-3.5 rounded-2xl text-center">
                    <p className="text-xl font-black text-ink-1">{profile.gamesPlayed}</p>
                    <p className="text-2xs font-bold text-ink-3 uppercase tracking-widest mt-0.5">Sessions</p>
                  </div>
                  <div className="bg-canvas border border-hairline p-3.5 rounded-2xl text-center">
                    <p className="text-xl font-black text-ink-1">{profile.drillsCount}</p>
                    <p className="text-2xs font-bold text-ink-3 uppercase tracking-widest mt-0.5">Drills</p>
                  </div>
                  <div className="bg-canvas border border-hairline p-3.5 rounded-2xl text-center">
                    <p className="text-xl font-black text-ink-1">Lvl {profile.avgLevel}</p>
                    <p className="text-2xs font-bold text-ink-3 uppercase tracking-widest mt-0.5">Avg Level</p>
                  </div>
                  <div className="bg-canvas border border-hairline p-3.5 rounded-2xl text-center">
                    <p className="text-xl font-black text-amber-400 flex items-center justify-center gap-1">
                      <Trophy className="w-4 h-4" />
                      {profile.maxLevel}
                    </p>
                    <p className="text-2xs font-bold text-ink-3 uppercase tracking-widest mt-0.5">Best Level</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          8. LIVE DRILL TICKER (Continuously scrolling library marquee)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-t border-hairline overflow-hidden" aria-labelledby="ticker-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10 space-y-2">
            <h2 id="ticker-heading" className="text-3xl sm:text-5xl font-black text-ink-1 uppercase tracking-tight leading-[0.95]">
              Inside The Library
            </h2>
            <p className="text-ink-2 text-base sm:text-lg max-w-2xl mx-auto">
              A preview of the {totalDrillsCount} drills available to launch right now. Hover to pause, click any card to begin.
            </p>
          </Reveal>
        </div>

        <div
          className="marquee-viewport relative w-full"
          style={{
            maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div className="marquee-track flex" style={{ '--marquee-duration': '65s' }}>
            {[0, 1].map((pass) => (
              <div key={pass} className="flex shrink-0" aria-hidden={pass === 1 ? 'true' : undefined}>
                {tickerDrills.map((drill) => {
                  const accent = CATEGORY_ACCENTS[drill.category] || 'text-blue-400';
                  const card = (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className={`text-2xs font-mono font-bold uppercase tracking-wider ${accent}`}>
                          {drill.categoryLabel}
                        </span>
                        <span className="text-2xs font-mono px-2 py-0.5 rounded-full bg-white/5 text-ink-3 border border-hairline shrink-0">
                          {drill.difficulty}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-ink-1 mb-1.5 tracking-tight">{drill.name}</h3>
                      <p className="text-xs text-ink-2 leading-relaxed line-clamp-3">{drill.description}</p>
                      <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between text-2xs font-mono text-ink-3">
                        <span>{drill.subcategory || 'Drill'}</span>
                        <span className="text-cyan-400 font-semibold">{drill.duration}</span>
                      </div>
                    </>
                  );
                  const cls = 'w-[280px] shrink-0 mr-4 bg-surface-1/70 backdrop-blur-xl border border-hairline rounded-3xl p-5 shadow-lg';
                  return pass === 1 ? (
                    <div key={`${drill.id}-clone`} className={cls}>{card}</div>
                  ) : (
                    <Link
                      key={drill.id}
                      href={localizeHref(drill.href)}
                      className={`${cls} block hover:border-hairline-2 hover:bg-surface-2/80 hover:-translate-y-1 transition-all duration-200`}
                    >
                      {card}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. ARCHITECTURE MANIFESTO & THE REAL COMPARISON
          ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="bg-surface-1/70 border border-hairline-2 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Mission Story */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Why We Built This</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-ink-1 uppercase tracking-tight">
                  Aim Trainers &amp; Brain Apps Got Bloated. We Built Pure Performance.
                </h2>

                <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
                  Too many training utilities require subscriptions, multi-gigabyte client installs, or email capture before you ever interact with a drill. A warmup for your reaction speed, aim mechanics, and working memory should execute the moment you open a tab.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-canvas/60 border border-hairline">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-ink-1">Instant Browser Launch</p>
                      <p className="text-2xs text-ink-3">Zero installation or wait times.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-canvas/60 border border-hairline">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-ink-1">Scientific Formats</p>
                      <p className="text-2xs text-ink-3">Digit span, N-back &amp; Fitts targeting.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-canvas/60 border border-hairline">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-ink-1">Privacy By Design</p>
                      <p className="text-2xs text-ink-3">Scores stay strictly on your device.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-canvas/60 border border-hairline">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-ink-1">100% Free Forever</p>
                      <p className="text-2xs text-ink-3">No hidden trials or premium tiers.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column: The Deal Summary */}
              <div className="lg:col-span-5 bg-canvas/90 border border-hairline-2 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-hairline text-xs font-mono">
                  <span className="text-ink-3 uppercase tracking-wider font-bold">The Deal</span>
                  <span className="text-cyan-300 font-bold">No Asterisks</span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-1 border border-hairline">
                    <span className="text-ink-2">Price</span>
                    <span className="text-emerald-400 font-bold font-mono">$0, all drills</span>
                  </div>

                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-1 border border-hairline">
                    <span className="text-ink-2">Account</span>
                    <span className="text-emerald-400 font-bold font-mono">Not required</span>
                  </div>

                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-1 border border-hairline">
                    <span className="text-ink-2">Install size</span>
                    <span className="text-emerald-400 font-bold font-mono">0 KB (web)</span>
                  </div>

                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-1 border border-hairline">
                    <span className="text-ink-2">Your scores</span>
                    <span className="text-emerald-400 font-bold font-mono">Stored locally</span>
                  </div>
                </div>

                <Link
                  href={localizeHref('/drills')}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all uppercase tracking-wider"
                >
                  Start Training Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        </Reveal>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. GLOBAL REACH & ACCESSIBILITY
          ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-t border-hairline bg-surface-1/40 relative overflow-hidden" aria-labelledby="reach-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <Reveal className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-cyan-300" />
              <span>Reach &amp; Availability</span>
            </div>

            <h2 id="reach-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-ink-1 uppercase leading-[0.95]">
              Open To <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Anyone</span> With A Browser
            </h2>

            <p className="text-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              No region lock, no waitlists, and no special hardware requirements beyond modern web standards.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Reveal delay={0}>
              <div
                onMouseMove={handleCardMouseMove}
                className="group relative h-full bg-surface-1/70 backdrop-blur-xl border border-hairline rounded-3xl p-6 sm:p-7 hover:border-blue-500/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400" />
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg mb-5">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-ink-1 tracking-tight mb-2">Six Languages</h3>
                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                  The home page and every category hub are translated into English, Português, Español, 日本語, Deutsch, and 한국어 with native SEO hreflang tags.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div
                onMouseMove={handleCardMouseMove}
                className="group relative h-full bg-surface-1/70 backdrop-blur-xl border border-hairline rounded-3xl p-6 sm:p-7 hover:border-purple-500/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-400" />
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg mb-5">
                  <MousePointer className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-ink-1 tracking-tight mb-2">Desktop &amp; Mobile Responsive</h3>
                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                  Memory, cognitive, visual, and tracking drills are fully calibrated for mobile touch. FPS and precision motor drills are labeled desktop-only for mouse inputs.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div
                onMouseMove={handleCardMouseMove}
                className="group relative h-full bg-surface-1/70 backdrop-blur-xl border border-hairline rounded-3xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400" />
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg mb-5">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-ink-1 tracking-tight mb-2">On-Device Privacy</h3>
                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                  No tracking profiles or personal identifiable data. Drill performance remains securely on your machine in local browser storage.
                </p>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. FREQUENTLY ASKED QUESTIONS (Interactive Accordion)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" aria-labelledby="faq-heading">
        <Reveal className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Common Questions</span>
          </div>

          <h2 id="faq-heading" className="text-3xl sm:text-5xl font-black text-ink-1 uppercase tracking-tight leading-[0.95]">
            Frequently Asked Questions
          </h2>

          <p className="text-ink-2 text-base sm:text-lg leading-relaxed">
            Everything you need to know about our browser drills, scoring accuracy, and local data privacy.
          </p>
        </Reveal>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <Reveal key={idx} delay={idx * 30}>
                <div className="bg-surface-1/70 backdrop-blur-xl border border-hairline rounded-2xl overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-ink-1 hover:text-cyan-300 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-5 h-5 text-ink-3 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-3 text-xs sm:text-sm text-ink-2 leading-relaxed border-t border-hairline/60">
                      {item.a}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          12. CALL TO ACTION (Fast One-Click Entry)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 border-t border-hairline bg-surface-1/40 relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/[0.18] rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">
              <Play className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ready In Under 2 Seconds</span>
            </div>

            <h2 id="cta-heading" className="text-3xl sm:text-5xl font-black text-ink-1 uppercase tracking-tight leading-[0.95]">
              Start Sharpening Your Reflexes Today
            </h2>
            
            <p className="text-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              No registration forms. No credit cards. Zero setup time. Open any drill and test your limits instantly.
            </p>
            
            <div className="pt-6 flex flex-col sm:flex-row gap-3.5 justify-center items-center">
              <Link 
                href={localizeHref('/drills')} 
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white px-9 py-4 rounded-2xl font-bold text-sm sm:text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all w-full sm:w-auto"
              >
                Browse All {totalDrillsCount} Drills
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link 
                href={localizeHref('/drills/fps')} 
                className="inline-flex items-center justify-center gap-2 bg-surface-1 border border-hairline text-ink-1 hover:text-white px-8 py-4 rounded-2xl font-bold text-sm sm:text-base hover:bg-surface-2 hover:border-hairline-2 active:scale-[0.98] transition-all w-full sm:w-auto"
              >
                <Crosshair className="w-4.5 h-4.5 text-red-400" />
                FPS Aim Hub
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
