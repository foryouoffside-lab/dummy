'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Zap,
  Dumbbell,
  Activity,
  Hand,
  Heart,
  Home,
  ChevronRight,
  Search,
  X,
  Clock,
  Play,
  Sparkles,
  Layers,
  Compass,
  Gauge
} from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { getDrillTagline } from '@/lib/drillCatalog';
import { getDifficultyRank } from '@/lib/scoringEngine';
import { isIdleFrameSkippable } from '@/lib/performance';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import AdjacentHubs from '@/components/AdjacentHubs';
import { useTranslation } from '@/lib/i18n/useTranslation';

const FOLDER_TO_STORAGE_KEY = {
  'dynamic-grid-evasion': 'skilldrills_physical_grid_evasion_v3',
  'peripheral-threat-sweeper': 'skilldrills_physical_peripheral_sweeper_v3',
  'reaction-chain': 'skilldrills_reaction_chain_v2',
};

// Tactical metadata & categorized discipline taxonomy for Physical / Agility skills
const PHYSICAL_METADATA = {
  'stability-challenge': {
    discipline: 'balance',
    disciplineName: 'Balance & Stability',
    focus: 'Wind-Force Equilibrium',
    skills: ['Centering', 'Force Resistance'],
    icon: Activity,
  },
  'complex-pattern': {
    discipline: 'coordination',
    disciplineName: 'Coordination & Pathing',
    focus: 'Memory Path Reconstruction',
    skills: ['Spatial Memory', 'Path Tracing'],
    icon: Compass,
  },
  'cross-body-movement': {
    discipline: 'coordination',
    disciplineName: 'Coordination & Pathing',
    focus: 'Cross-Screen Coordinate Intercept',
    skills: ['Vector Tracking', 'Bilateral Reach'],
    icon: Hand,
  },
  'dynamic-grid-evasion': {
    discipline: 'coordination',
    disciplineName: 'Coordination & Pathing',
    focus: '3x3 Rapid Directional Dodge',
    skills: ['WASD Footwork', 'Grid Evasion'],
    icon: Gauge,
  },
  'agility-ladder': {
    discipline: 'fitness',
    disciplineName: 'Agility & Fitness',
    focus: 'Scrolling Rung Cadence',
    skills: ['Alternating Cadence', 'Rhythm'],
    icon: Heart,
  },
  'jump-sequence': {
    discipline: 'fitness',
    disciplineName: 'Agility & Fitness',
    focus: 'Charge & Parabolic Steering',
    skills: ['Impulse Control', 'Aerial Vector'],
    icon: Dumbbell,
  },
  'speed-drill': {
    discipline: 'fitness',
    disciplineName: 'Agility & Fitness',
    focus: 'Vanishing Target Acceleration',
    skills: ['Burst Speed', 'Shrinking Rings'],
    icon: Zap,
  },
  'drop-catch': {
    discipline: 'reflex',
    disciplineName: 'Reflex & Evasion',
    focus: 'Falling Target Catch & Decoy Avoidance',
    skills: ['Stimulus Discrimination', 'Drop Timing'],
    icon: Zap,
  },
  'peripheral-threat-sweeper': {
    discipline: 'reflex',
    disciplineName: 'Reflex & Evasion',
    focus: 'Perimeter Radial Scan',
    skills: ['Peripheral Field', 'Threat Intercept'],
    icon: Activity,
  },
  'quick-dodge': {
    discipline: 'reflex',
    disciplineName: 'Reflex & Evasion',
    focus: 'Homing Threat Chaos Evasion',
    skills: ['Dynamic Evasion', 'Collision Avoidance'],
    icon: Gauge,
  },
  'reaction-chain': {
    discipline: 'reflex',
    disciplineName: 'Reflex & Evasion',
    focus: 'Deceleration & Impulse Arrest',
    skills: ['Target Snapping', 'Node Freeze'],
    icon: Zap,
  },
};

const DIFFICULTY_STYLES = {
  Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Advanced: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Hard: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Expert: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const DISCIPLINES = [
  { id: 'all', label: 'All Drills', icon: Layers },
  { id: 'reflex', label: 'Reflex & Evasion', icon: Zap },
  { id: 'fitness', label: 'Agility & Fitness', icon: Dumbbell },
  { id: 'coordination', label: 'Coordination & Pathing', icon: Hand },
  { id: 'balance', label: 'Balance & Stability', icon: Activity },
];

const FOCUS_PRESETS = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'reflex', label: 'Reflex & Evasion' },
  { id: 'agility', label: 'Agility & Cadence' },
  { id: 'control', label: 'Coordination & Stability' },
];

export default function PhysicalDrillsClient() {
  const { t, localizeHref } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [drillLevels, setDrillLevels] = useState({});
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');
  const [selectedPreset, setSelectedPreset] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Retrieve saved personal bests from localStorage
  useEffect(() => {
    if (!isClient) return;
    try {
      const levels = {};
      const allPhys = DRILLS.filter((d) => d.category === 'physical');
      allPhys.forEach((d) => {
        const override = FOLDER_TO_STORAGE_KEY[d.folderName];
        const keys = override
          ? [override]
          : [
              `skilldrills_physical_${d.folderName.replace(/-/g, '_')}_v3`,
              `skilldrills_physical_${d.folderName.replace(/-/g, '_')}_v2`,
              `skilldrills_${d.folderName.replace(/-/g, '_')}`,
            ];
        for (const k of keys) {
          const raw = localStorage.getItem(k);
          if (raw) {
            try {
              const parsed = JSON.parse(raw);
              if (parsed && parsed.bestLevel) {
                levels[d.folderName] = parsed.bestLevel;
                break;
              }
            } catch (e) {}
          }
        }
      });
      setDrillLevels(levels);
    } catch (e) {}
  }, [isClient]);

  // Subtle speed streams background canvas
  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastTime = performance.now();

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const streams = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      streams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 2.5 + 1.5,
        opacity: Math.random() * 0.12 + 0.04,
      });
    }

    const draw = (time) => {
      if (isIdleFrameSkippable(false, time, lastTime)) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTime = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      streams.forEach((s) => {
        ctx.strokeStyle = `rgba(251, 113, 133, ${s.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.length, s.y + s.length * 0.5);
        ctx.stroke();

        s.x += s.speed;
        s.y += s.speed * 0.5;

        if (s.x > canvas.width || s.y > canvas.height) {
          s.x = -s.length;
          s.y = Math.random() * canvas.height - s.length;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [isClient]);

  // Base physical drills list enriched with presentation metadata
  const baseDrills = useMemo(() => {
    return DRILLS.filter((d) => d.category === 'physical').map((drill) => {
      const meta = PHYSICAL_METADATA[drill.folderName] || {
        discipline: 'reflex',
        disciplineName: 'Reflex & Evasion',
        focus: 'Physical Motor Practice',
        skills: ['Reflex', 'Speed'],
        icon: Zap,
      };
      return {
        ...drill,
        tagline: getDrillTagline(drill.href, drill.description),
        discipline: meta.discipline,
        disciplineName: meta.disciplineName,
        focus: meta.focus,
        skills: meta.skills,
        icon: meta.icon,
      };
    });
  }, []);

  // Discipline drill counts
  const disciplineCounts = useMemo(() => {
    const counts = { all: baseDrills.length, reflex: 0, fitness: 0, coordination: 0, balance: 0 };
    baseDrills.forEach((d) => {
      if (counts[d.discipline] !== undefined) {
        counts[d.discipline] += 1;
      }
    });
    return counts;
  }, [baseDrills]);

  // Filtered drills based on active controls
  const filteredDrills = useMemo(() => {
    return baseDrills
      .filter((drill) => {
        // Discipline filter
        if (selectedDiscipline !== 'all' && drill.discipline !== selectedDiscipline) {
          return false;
        }

        // Preset filter
        if (selectedPreset === 'reflex') {
          if (drill.discipline !== 'reflex') return false;
        } else if (selectedPreset === 'agility') {
          if (drill.discipline !== 'fitness') return false;
        } else if (selectedPreset === 'control') {
          if (!['coordination', 'balance'].includes(drill.discipline)) return false;
        }

        // Text search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = drill.name.toLowerCase().includes(q);
          const matchTagline = drill.tagline.toLowerCase().includes(q);
          const matchFocus = drill.focus.toLowerCase().includes(q);
          const matchSkills = drill.skills.some((s) => s.toLowerCase().includes(q));
          const matchDiscipline = drill.disciplineName.toLowerCase().includes(q);
          if (!matchName && !matchTagline && !matchFocus && !matchSkills && !matchDiscipline) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty));
  }, [baseDrills, selectedDiscipline, selectedPreset, searchQuery]);

  const hasActiveFilters = selectedDiscipline !== 'all' || selectedPreset !== 'all' || searchQuery.trim() !== '';

  const resetFilters = () => {
    setSelectedDiscipline('all');
    setSelectedPreset('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-rose-500/30 selection:text-rose-200 relative overflow-hidden">
      {/* Kinetic velocity stream canvas */}
      <canvas
        style={{ touchAction: 'none' }}
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-25"
      />

      {/* Layered ambient lighting: Rose + Amber glow + subtle grid mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-rose-600/[0.10] rounded-full blur-[160px]" />
        <div className="absolute top-[25%] -right-40 w-[460px] h-[460px] bg-orange-500/[0.07] rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 85% 60% at 50% 15%, black 40%, transparent 90%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-mono text-ink-3 uppercase tracking-wider">
            <li>
              <Link
                href={localizeHref('/')}
                className="flex items-center gap-1.5 hover:text-rose-400 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>HQ</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li>
              <Link href={localizeHref('/drills')} className="hover:text-rose-400 transition-colors">
                {t('header.allHubs', 'Drills')}
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li>
              <span className="text-rose-400 font-bold" aria-current="page">
                {t('header.physical', 'Physical Sector')}
              </span>
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-1">
            {t('hubs.physical.h1', 'Reflex & Coordination Training')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-2 max-w-2xl leading-relaxed">
            {t(
              'hubs.physical.desc',
              'Train gross and fine sensorimotor coordination, high-velocity reflex evasion, dynamic balance equilibrium, and spatial agility ladders.'
            )}
          </p>
        </div>

        {/* Interactive Filter & Search Controls */}
        <div className="mb-6 space-y-4">
          {/* Top Bar: Search + Focus Target Presets */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Real-time Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-ink-3 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search physical drills by name, skill, or mechanics..."
                className="w-full pl-10 pr-9 py-2.5 bg-surface-1/90 border border-hairline rounded-xl text-xs font-mono text-ink-1 placeholder:text-ink-3 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink-1 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Focus Target Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-2xs font-mono uppercase text-ink-3 mr-1 shrink-0">Focus:</span>
              {FOCUS_PRESETS.map((preset) => {
                const active = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedPreset(preset.id)}
                    className={`px-3 py-1.5 rounded-lg text-2xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 border ${
                      active
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                        : 'bg-surface-1/70 text-ink-3 border-hairline hover:text-ink-1 hover:border-hairline-2'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Discipline Navigation Tabs */}
          <div className="flex items-center justify-between gap-3 border-b border-hairline pb-3 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2">
              {DISCIPLINES.map((cat) => {
                const Icon = cat.icon;
                const active = selectedDiscipline === cat.id;
                const count = disciplineCounts[cat.id];
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedDiscipline(cat.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 border ${
                      active
                        ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/20'
                        : 'bg-surface-1/80 text-ink-2 border-hairline hover:text-ink-1 hover:border-hairline-2 hover:bg-surface-2'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{cat.label}</span>
                    <span
                      className={`ml-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                        active ? 'bg-black/20 text-white' : 'bg-surface-2 text-ink-3'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-2xs font-mono text-rose-400 hover:text-rose-300 uppercase tracking-wider shrink-0 underline underline-offset-4"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Drill Matrix Grid - Desktop First, No Hidden Carousels */}
        {filteredDrills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-14">
            {filteredDrills.map((drill) => {
              const Icon = drill.icon;
              const userLevel = drillLevels[drill.folderName];
              const diffStyle = DIFFICULTY_STYLES[drill.difficulty] || DIFFICULTY_STYLES.Medium;

              return (
                <Link
                  key={drill.href}
                  href={drill.href}
                  className="group relative flex flex-col justify-between rounded-2xl bg-surface-1/90 border border-hairline p-5 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-rose-500/40 hover:shadow-xl hover:shadow-rose-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                >
                  {/* Subtle top indicator hover line */}
                  <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-rose-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header: Icon, Tags & Difficulty Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 group-hover:bg-rose-500/20 group-hover:text-rose-300 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {userLevel && (
                          <span className="px-2 py-0.5 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[9px] font-mono font-bold tracking-wider">
                            Lv. {userLevel}
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-md border text-[9px] font-mono font-bold uppercase tracking-wider ${diffStyle}`}
                        >
                          {drill.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Discipline Eyebrow */}
                    <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400/80 mb-1">
                      {drill.disciplineName}
                    </div>

                    {/* Drill Name */}
                    <h3 className="text-base font-bold text-ink-1 group-hover:text-rose-400 transition-colors tracking-tight line-clamp-1">
                      {drill.name}
                    </h3>

                    {/* Tagline / Subtitle */}
                    <p className="mt-1.5 text-xs text-ink-3 leading-relaxed line-clamp-2">
                      {drill.tagline}
                    </p>

                    {/* Skill Focus Chips */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {drill.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded bg-surface-2 border border-hairline text-[10px] font-mono text-ink-2"
                        >
                          {skill}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-[10px] font-mono text-rose-300/90">
                        {drill.focus}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer: Duration & Interactive Launch CTA */}
                  <div className="mt-4 pt-3.5 border-t border-hairline flex items-center justify-between text-2xs font-mono text-ink-3">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-ink-3" />
                      <span>{drill.duration}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 font-bold text-rose-400 group-hover:text-rose-300 transition-colors uppercase tracking-wider">
                      <span>Launch Drill</span>
                      <Play className="w-3 h-3 fill-current transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Empty Filter State */
          <div className="p-12 text-center bg-surface-1/60 border border-hairline rounded-2xl mb-14">
            <Activity className="w-8 h-8 text-ink-3 mx-auto mb-3 opacity-60" />
            <h3 className="text-sm font-bold font-mono uppercase text-ink-1">No drills match your filter</h3>
            <p className="text-xs text-ink-3 mt-1">Try broadening your search query or selecting another discipline.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-surface-2 border border-hairline text-xs font-mono uppercase font-bold text-rose-400 hover:text-rose-300 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Biomechanics & Kinematic Specifications */}
        <Reveal className="mb-14">
          <div className="rounded-3xl bg-surface-1/70 border border-hairline p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-rose-400" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                Biomechanics &amp; Sensorimotor Specifications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Dynamic Evasion Latency
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Compresses reaction delay under chaotic multi-vector obstacle patterns and unexpected trajectory inversions.
                </p>
              </div>

              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                  <Activity className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Equilibrium &amp; Force Resistance
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Develops continuous counter-force centering against simulated environmental wind vectors and momentum drift.
                </p>
              </div>

              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                  <Gauge className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Bilateral Agility Cadence
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Calibrates alternating left-right timing intervals and cross-body coordinate mapping across 3x3 tactical agility matrices.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Clean Adjacent Hubs Navigation */}
        <AdjacentHubs currentCat="physical" />
      </div>

      <SiteFooter />
    </div>
  );
}