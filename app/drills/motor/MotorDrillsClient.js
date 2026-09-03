'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Hand,
  MousePointer,
  Gauge,
  Crosshair,
  Home,
  ChevronRight,
  Search,
  X,
  Clock,
  Play,
  Sparkles,
  Layers,
  Activity,
  Keyboard,
  Compass
} from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { getDrillTagline } from '@/lib/drillCatalog';
import { getDifficultyRank } from '@/lib/scoringEngine';
import { isIdleFrameSkippable } from '@/lib/performance';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import AdjacentHubs from '@/components/AdjacentHubs';
import { useTranslation } from '@/lib/i18n/useTranslation';

// Tactical metadata & categorized discipline taxonomy for Motor skills
const MOTOR_METADATA = {
  'aim-trainer': {
    discipline: 'coordination',
    disciplineName: 'Hand-Eye Coordination',
    focus: 'Dynamic Shrink Snapping',
    skills: ['Mouse Precision', 'Streak Aim'],
    icon: Crosshair,
  },
  'drag-and-drop': {
    discipline: 'coordination',
    disciplineName: 'Hand-Eye Coordination',
    focus: 'Teleporting Ring Intercept',
    skills: ['Cursor Grip', 'Spatial Timing'],
    icon: MousePointer,
  },
  'precision-flick-shot': {
    discipline: 'coordination',
    disciplineName: 'Hand-Eye Coordination',
    focus: 'Aperture Centering Snap',
    skills: ['Flick Precision', 'Motor Centering'],
    icon: Crosshair,
  },
  'finger-sequencing': {
    discipline: 'speed',
    disciplineName: 'Movement Speed',
    focus: 'Scale-Ordered Node Tap',
    skills: ['Finger Dexterity', 'Cognitive Rhythm'],
    icon: Hand,
  },
  'keyboard-recognition': {
    discipline: 'speed',
    disciplineName: 'Movement Speed',
    focus: 'Keybind Muscle Memory',
    skills: ['Key Speed', 'Spatial Layout'],
    icon: Keyboard,
  },
  'rapid-tapping': {
    discipline: 'speed',
    disciplineName: 'Movement Speed',
    focus: 'CPS Click Cadence',
    skills: ['CPS Burst', 'Tapping Endurance'],
    icon: Gauge,
  },
  'steady-hand': {
    discipline: 'precision',
    disciplineName: 'Precision Control',
    focus: 'Narrow Corridor Traversal',
    skills: ['Tremor Suppression', 'Path Tracing'],
    icon: Compass,
  },
  'tracing': {
    discipline: 'precision',
    disciplineName: 'Precision Control',
    focus: 'Wave Filament Tracking',
    skills: ['Continuous Tracking', 'Smooth Motion'],
    icon: Activity,
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
  { id: 'coordination', label: 'Hand-Eye Coordination', icon: MousePointer },
  { id: 'speed', label: 'Movement Speed', icon: Gauge },
  { id: 'precision', label: 'Precision Control', icon: Crosshair },
];

const SKILL_PRESETS = [
  { id: 'all', label: 'All Skills' },
  { id: 'aim', label: 'Aim & Flicks' },
  { id: 'speed', label: 'Speed & Tapping' },
  { id: 'control', label: 'Steady Micro-Control' },
];

export default function MotorDrillsClient() {
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
      const allMotor = DRILLS.filter((d) => d.category === 'motor');
      allMotor.forEach((d) => {
        const keys = [
          `skilldrills_motor_${d.folderName.replace(/-/g, '_')}_v3`,
          `skilldrills_motor_${d.folderName.replace(/-/g, '_')}_v2`,
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

  // Subtle interactive cursor tracking coordinate canvas
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

    let mouse = { x: -100, y: -100 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const trail = [];
    const draw = (time) => {
      if (isIdleFrameSkippable(false, time, lastTime)) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTime = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouse.x > 0 && mouse.y > 0) {
        trail.push({ x: mouse.x, y: mouse.y, age: 0 });
      }
      if (trail.length > 20) trail.shift();

      if (mouse.x > 0 && mouse.y > 0) {
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, canvas.height);
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(canvas.width, mouse.y);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      trail.forEach((p) => {
        p.age += 1;
        const opacity = Math.max(0, 1 - p.age / 20) * 0.15;
        ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient]);

  // Base motor drills list enriched with presentation metadata
  const baseDrills = useMemo(() => {
    return DRILLS.filter((d) => d.category === 'motor').map((drill) => {
      const meta = MOTOR_METADATA[drill.folderName] || {
        discipline: 'coordination',
        disciplineName: 'Hand-Eye Coordination',
        focus: 'Motor Skill Practice',
        skills: ['Precision', 'Timing'],
        icon: MousePointer,
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
    const counts = { all: baseDrills.length, coordination: 0, speed: 0, precision: 0 };
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
        if (selectedPreset === 'aim') {
          const isAim = ['aim-trainer', 'precision-flick-shot', 'drag-and-drop'].includes(drill.folderName);
          if (!isAim) return false;
        } else if (selectedPreset === 'speed') {
          const isSpeed = ['rapid-tapping', 'finger-sequencing', 'keyboard-recognition'].includes(drill.folderName);
          if (!isSpeed) return false;
        } else if (selectedPreset === 'control') {
          const isControl = ['steady-hand', 'tracing'].includes(drill.folderName);
          if (!isControl) return false;
        }

        // Text query
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
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-hidden">
      {/* Interactive cursor coordinate guide canvas */}
      <canvas
        style={{ touchAction: 'none' }}
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
      />

      {/* Layered ambient lighting: Emerald + Teal glow + subtle grid mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-emerald-600/[0.10] rounded-full blur-[160px]" />
        <div className="absolute top-[25%] -right-40 w-[460px] h-[460px] bg-teal-500/[0.07] rounded-full blur-[140px]" />
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
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>HQ</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li>
              <Link href={localizeHref('/drills')} className="hover:text-emerald-400 transition-colors">
                {t('header.allHubs', 'Drills')}
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li>
              <span className="text-emerald-400 font-bold" aria-current="page">
                {t('header.motor', 'Motor Sector')}
              </span>
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-1">
            {t('hubs.motor.h1', 'Mouse Precision & Motor Drills')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-2 max-w-2xl leading-relaxed">
            {t(
              'hubs.motor.desc',
              'Calibrate fine hand-eye coordination, rapid click speed thresholds, and sub-pixel path tracing. 100% browser-native with raw cursor feedback and zero input lag.'
            )}
          </p>
        </div>

        {/* Interactive Filter & Search Controls */}
        <div className="mb-6 space-y-4">
          {/* Top Bar: Search + Skill Focus Presets */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Real-time Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-ink-3 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search drills by name, skill, or mechanic..."
                className="w-full pl-10 pr-9 py-2.5 bg-surface-1/90 border border-hairline rounded-xl text-xs font-mono text-ink-1 placeholder:text-ink-3 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
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

            {/* Skill Target Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-2xs font-mono uppercase text-ink-3 mr-1 shrink-0">Focus:</span>
              {SKILL_PRESETS.map((preset) => {
                const active = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedPreset(preset.id)}
                    className={`px-3 py-1.5 rounded-lg text-2xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 border ${
                      active
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
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
                        ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20'
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
                className="text-2xs font-mono text-emerald-400 hover:text-emerald-300 uppercase tracking-wider shrink-0 underline underline-offset-4"
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
                  className="group relative flex flex-col justify-between rounded-2xl bg-surface-1/90 border border-hairline p-5 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {/* Subtle top indicator hover line */}
                  <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header: Icon, Tags & Difficulty Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {userLevel && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[9px] font-mono font-bold tracking-wider">
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
                    <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80 mb-1">
                      {drill.disciplineName}
                    </div>

                    {/* Drill Name */}
                    <h3 className="text-base font-bold text-ink-1 group-hover:text-emerald-400 transition-colors tracking-tight line-clamp-1">
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
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300/90">
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

                    <span className="inline-flex items-center gap-1 font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors uppercase tracking-wider">
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
            <Crosshair className="w-8 h-8 text-ink-3 mx-auto mb-3 opacity-60" />
            <h3 className="text-sm font-bold font-mono uppercase text-ink-1">No drills match your filter</h3>
            <p className="text-xs text-ink-3 mt-1">Try broadening your search query or choosing another discipline.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-surface-2 border border-hairline text-xs font-mono uppercase font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Motor Kinematics Architecture & Technical Specifications */}
        <Reveal className="mb-14">
          <div className="rounded-3xl bg-surface-1/70 border border-hairline p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                Kinematics &amp; Motor Performance Specifications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <MousePointer className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Sub-Pixel Path Smoothing
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Continuous coordinate sampling trains involuntary micro-tremor suppression and stabilizes fine mouse corridors for surgical cursor guidance.
                </p>
              </div>

              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Gauge className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Click Cadence &amp; CPS Sampling
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  High-frequency down/up actuation detection records peak click-per-second thresholds and maintains steady endurance without finger cramping.
                </p>
              </div>

              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Activity className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Visuomotor Synchronization
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Tightens neuromuscular feedback loops bridging instantaneous visual target identification directly with rapid motor execution.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Clean Adjacent Hubs Navigation */}
        <AdjacentHubs currentCat="motor" />
      </div>

      <SiteFooter />
    </div>
  );
}