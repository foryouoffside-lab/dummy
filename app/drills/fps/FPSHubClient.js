'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Crosshair,
  Eye,
  Zap,
  Home,
  ChevronRight,
  Search,
  X,
  Target,
  Clock,
  Play,
  Sparkles,
  MousePointer,
  Cpu,
  Layers
} from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { getDrillTagline } from '@/lib/drillCatalog';
import { getDifficultyRank } from '@/lib/scoringEngine';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import AdjacentHubs from '@/components/AdjacentHubs';
import { useTranslation } from '@/lib/i18n/useTranslation';

// Mapping: drill folderName → actual localStorage STORAGE_KEY
const FOLDER_TO_STORAGE_KEY = {
  'flick-shot-training': 'skilldrills_fps_flick_shot_v3',
  '180-degree-awareness': 'skilldrills_fps_180_awareness_v3',
  'instant-response': 'skilldrills_fps_instant_response_v3',
  'flow-state': 'skilldrills_fps_flow_state_v3',
  'micro-correction-precision': 'skilldrills_fps_micro_correction_v3',
  'angle-hold-trainer': 'skilldrills_fps_angle_hold_v3',
  'anti-strafe-jitter-duel': 'skilldrills_fps_anti_strafe_jitter_v3',
  'anti-zigzag-movement-trainer': 'skilldrills_fps_anti_zigzag_v3',
  'target-acquisition': 'skilldrills_fps_target_acquisition_v3',
  'target-prioritization': 'skilldrills_fps_target_prioritization_v3',
  'target-switching-swarm': 'skilldrills_fps_target_switching_swarm_v3',
  'recoil-control': 'skilldrills_fps_recoil_control_v3',
  'vertical-air-track': 'skilldrills_fps_vertical_air_track_v3',
  'strafe-tracking': 'skilldrills_fps_strafe_tracking_v3',
  'pro-smooth-pursuit': 'skilldrills_fps_pro_smooth_pursuit_v3',
};

// Tactical game metadata & categorized discipline taxonomy
const DRILL_METADATA = {
  'flick-shot-training': {
    discipline: 'clicking',
    disciplineName: 'Precision Clicking',
    games: ['Valorant', 'CS2'],
    icon: Crosshair,
    focus: 'Flick Precision',
  },
  'micro-correction-precision': {
    discipline: 'clicking',
    disciplineName: 'Precision Clicking',
    games: ['Valorant', 'CS2'],
    icon: Crosshair,
    focus: 'Micro Adjustments',
  },
  'target-acquisition': {
    discipline: 'clicking',
    disciplineName: 'Precision Clicking',
    games: ['Valorant', 'CS2'],
    icon: Crosshair,
    focus: 'Contrast Snapping',
  },
  'target-prioritization': {
    discipline: 'clicking',
    disciplineName: 'Precision Clicking',
    games: ['Valorant', 'Apex'],
    icon: Crosshair,
    focus: 'Priority Threat',
  },
  'target-switching-swarm': {
    discipline: 'clicking',
    disciplineName: 'Precision Clicking',
    games: ['Apex', 'CS2'],
    icon: Crosshair,
    focus: 'Multi-Switching',
  },
  'strafe-tracking': {
    discipline: 'tracking',
    disciplineName: 'Tracking & Smoothness',
    games: ['Apex', 'Overwatch 2'],
    icon: Eye,
    focus: 'Erratic ADAD Strafe',
  },
  'pro-smooth-pursuit': {
    discipline: 'tracking',
    disciplineName: 'Tracking & Smoothness',
    games: ['Apex', 'Overwatch 2'],
    icon: Eye,
    focus: '360Hz Pursuit Curve',
  },
  'vertical-air-track': {
    discipline: 'tracking',
    disciplineName: 'Tracking & Smoothness',
    games: ['Apex', 'Overwatch 2'],
    icon: Eye,
    focus: 'Parabolic Aerial Trajectory',
  },
  'anti-strafe-jitter-duel': {
    discipline: 'tracking',
    disciplineName: 'Tracking & Smoothness',
    games: ['Apex', 'Close Range'],
    icon: Eye,
    focus: 'Physics Jitter Duel',
  },
  'anti-zigzag-movement-trainer': {
    discipline: 'tracking',
    disciplineName: 'Tracking & Smoothness',
    games: ['Apex', 'Warzone'],
    icon: Eye,
    focus: 'Evasive Direction Shifts',
  },
  'recoil-control': {
    discipline: 'recoil',
    disciplineName: 'Recoil & Angles',
    games: ['CS2', 'Valorant'],
    icon: Target,
    focus: 'S-Curve Spray Counter',
  },
  'angle-hold-trainer': {
    discipline: 'recoil',
    disciplineName: 'Recoil & Angles',
    games: ['CS2', 'Valorant'],
    icon: Target,
    focus: 'Crosshair Placement & Peeks',
  },
  'instant-response': {
    discipline: 'reflex',
    disciplineName: 'Reflex & Reaction',
    games: ['All FPS', 'Warm-Up'],
    icon: Zap,
    focus: 'Visual Trigger Speed',
  },
  '180-degree-awareness': {
    discipline: 'reflex',
    disciplineName: 'Reflex & Reaction',
    games: ['All FPS', 'Tactical'],
    icon: Zap,
    focus: 'Screen Edge Peripheral Snap',
  },
  'flow-state': {
    discipline: 'reflex',
    disciplineName: 'Reflex & Reaction',
    games: ['All FPS', 'Warm-Up'],
    icon: Zap,
    focus: 'Sequential Rhythm',
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
  { id: 'clicking', label: 'Precision Clicking', icon: Crosshair },
  { id: 'tracking', label: 'Tracking & Smoothness', icon: Eye },
  { id: 'recoil', label: 'Recoil & Angles', icon: Target },
  { id: 'reflex', label: 'Reflex & Reaction', icon: Zap },
];

const GAME_PRESETS = [
  { id: 'all', label: 'All Games' },
  { id: 'tactical', label: 'Valorant & CS2' },
  { id: 'tracking', label: 'Apex & Tracking' },
  { id: 'warmup', label: 'Rhythm & Reflex' },
];

export default function FPSHubClient() {
  const { t, localizeHref } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [drillLevels, setDrillLevels] = useState({});
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');
  const [selectedGamePreset, setSelectedGamePreset] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Retrieve saved personal bests from localStorage
  useEffect(() => {
    if (!isClient) return;
    try {
      const levels = {};
      const allFps = DRILLS.filter((d) => d.category === 'fps');
      allFps.forEach((d) => {
        const override = FOLDER_TO_STORAGE_KEY[d.folderName];
        const keys = override
          ? [override]
          : [
              `skilldrills_fps_${d.folderName.replace(/-/g, '_')}_v3`,
              `skilldrills_fps_${d.folderName.replace(/-/g, '_')}_v2`,
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

  // Base list of all FPS drills enriched with presentation metadata
  const baseDrills = useMemo(() => {
    return DRILLS.filter((d) => d.category === 'fps').map((drill) => {
      const meta = DRILL_METADATA[drill.folderName] || {
        discipline: 'clicking',
        disciplineName: 'Precision Clicking',
        games: ['All FPS'],
        icon: Crosshair,
        focus: 'Aim Practice',
      };
      return {
        ...drill,
        tagline: getDrillTagline(drill.href, drill.description),
        discipline: meta.discipline,
        disciplineName: meta.disciplineName,
        games: meta.games,
        icon: meta.icon,
        focus: meta.focus,
      };
    });
  }, []);

  // Discipline drill counts
  const disciplineCounts = useMemo(() => {
    const counts = { all: baseDrills.length, clicking: 0, tracking: 0, recoil: 0, reflex: 0 };
    baseDrills.forEach((d) => {
      if (counts[d.discipline] !== undefined) {
        counts[d.discipline] += 1;
      }
    });
    return counts;
  }, [baseDrills]);

  // Filtered drills based on active filters
  const filteredDrills = useMemo(() => {
    return baseDrills
      .filter((drill) => {
        // Discipline filter
        if (selectedDiscipline !== 'all' && drill.discipline !== selectedDiscipline) {
          return false;
        }

        // Game preset filter
        if (selectedGamePreset === 'tactical') {
          const isTac = drill.games.some((g) => ['Valorant', 'CS2', 'Tactical'].includes(g));
          if (!isTac) return false;
        } else if (selectedGamePreset === 'tracking') {
          const isTrack = drill.games.some((g) =>
            ['Apex', 'Overwatch 2', 'Warzone', 'Close Range'].includes(g)
          );
          if (!isTrack) return false;
        } else if (selectedGamePreset === 'warmup') {
          const isWarm =
            drill.discipline === 'reflex' ||
            ['flick-shot-training', 'flow-state', 'instant-response'].includes(drill.folderName);
          if (!isWarm) return false;
        }

        // Text search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchName = drill.name.toLowerCase().includes(query);
          const matchTagline = drill.tagline.toLowerCase().includes(query);
          const matchFocus = drill.focus.toLowerCase().includes(query);
          const matchGames = drill.games.some((g) => g.toLowerCase().includes(query));
          const matchDiscipline = drill.disciplineName.toLowerCase().includes(query);
          if (!matchName && !matchTagline && !matchFocus && !matchGames && !matchDiscipline) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty));
  }, [baseDrills, selectedDiscipline, selectedGamePreset, searchQuery]);

  const hasActiveFilters = selectedDiscipline !== 'all' || selectedGamePreset !== 'all' || searchQuery.trim() !== '';

  const resetFilters = () => {
    setSelectedDiscipline('all');
    setSelectedGamePreset('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-red-500/30 selection:text-red-200 relative overflow-hidden">
      {/* Tactical ambient background: Red/Orange glow + subtle grid mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-red-600/[0.10] rounded-full blur-[160px]" />
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
                className="flex items-center gap-1.5 hover:text-red-400 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>HQ</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li>
              <Link href={localizeHref('/drills')} className="hover:text-red-400 transition-colors">
                {t('header.allHubs', 'Drills')}
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li>
              <span className="text-red-400 font-bold" aria-current="page">
                {t('header.fps', 'FPS Aim Sector')}
              </span>
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-1">
            {t('hubs.fps.h1', 'Free FPS Aim Trainer')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-2 max-w-2xl leading-relaxed">
            {t(
              'hubs.fps.desc',
              'Zero-latency browser aim training calibrated for Valorant, CS2, and Apex Legends. Master flick shots, micro-adjustments, smooth pursuit tracking, and recoil control.'
            )}
          </p>
        </div>

        {/* Interactive Filter & Search Controls */}
        <div className="mb-6 space-y-4">
          {/* Top Bar: Search + Game Profile Presets */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Real-time Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-ink-3 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search drills by name, skill, or game..."
                className="w-full pl-10 pr-9 py-2.5 bg-surface-1/90 border border-hairline rounded-xl text-xs font-mono text-ink-1 placeholder:text-ink-3 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all shadow-inner"
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

            {/* Game Target Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-2xs font-mono uppercase text-ink-3 mr-1 shrink-0">Focus:</span>
              {GAME_PRESETS.map((preset) => {
                const active = selectedGamePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedGamePreset(preset.id)}
                    className={`px-3 py-1.5 rounded-lg text-2xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 border ${
                      active
                        ? 'bg-red-500/20 text-red-300 border-red-500/40 shadow-sm'
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
                        ? 'bg-red-500 text-white border-red-400 shadow-lg shadow-red-500/20'
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
                className="text-2xs font-mono text-red-400 hover:text-red-300 uppercase tracking-wider shrink-0 underline underline-offset-4"
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
                  className="group relative flex flex-col justify-between rounded-2xl bg-surface-1/90 border border-hairline p-5 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  {/* Subtle top indicator hover line */}
                  <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header: Icon, Tags & Difficulty Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 group-hover:text-red-300 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {userLevel && (
                          <span className="px-2 py-0.5 rounded-md bg-red-500/15 border border-red-500/30 text-red-300 text-[9px] font-mono font-bold tracking-wider">
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
                    <div className="text-[10px] font-mono uppercase tracking-wider text-red-400/80 mb-1">
                      {drill.disciplineName}
                    </div>

                    {/* Drill Name */}
                    <h3 className="text-base font-bold text-ink-1 group-hover:text-red-400 transition-colors tracking-tight line-clamp-1">
                      {drill.name}
                    </h3>

                    {/* Tagline / Subtitle */}
                    <p className="mt-1.5 text-xs text-ink-3 leading-relaxed line-clamp-2">
                      {drill.tagline}
                    </p>

                    {/* Game Target Chips */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {drill.games.map((game) => (
                        <span
                          key={game}
                          className="px-2 py-0.5 rounded bg-surface-2 border border-hairline text-[10px] font-mono text-ink-2"
                        >
                          {game}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[10px] font-mono text-red-300/90">
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

                    <span className="inline-flex items-center gap-1 font-bold text-red-400 group-hover:text-red-300 transition-colors uppercase tracking-wider">
                      <span>Launch Drill</span>
                      <Play className="w-3 h-3 fill-current transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="p-12 text-center bg-surface-1/60 border border-hairline rounded-2xl mb-14">
            <Crosshair className="w-8 h-8 text-ink-3 mx-auto mb-3 opacity-60" />
            <h3 className="text-sm font-bold font-mono uppercase text-ink-1">No drills match your filter</h3>
            <p className="text-xs text-ink-3 mt-1">Try broadening your search query or selecting another discipline.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-surface-2 border border-hairline text-xs font-mono uppercase font-bold text-red-400 hover:text-red-300 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Pro Aim Architecture & Technical Specifications */}
        <Reveal className="mb-14">
          <div className="rounded-3xl bg-surface-1/70 border border-hairline p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-red-400" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                Engine &amp; Hardware Optimization
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-3">
                  <MousePointer className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Raw Pointer Lock
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Bypasses browser cursor boundaries and OS acceleration curves. Your mouse moves with true 1:1 hardware translation just like native esports clients.
                </p>
              </div>

              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-3">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  High Refresh Physics
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Decoupled sub-millisecond physics loops run up to 360Hz refresh rates. Targets glide smoothly without jitter, judder, or frame drops.
                </p>
              </div>

              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-3">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Cross-Game Calibration
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Standardized sensitivity mapping matches your exact Valorant, CS2, or Apex Legends config so muscle memory translates directly into your matches.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Clean Adjacent Hubs Navigation */}
        <AdjacentHubs currentCat="fps" />
      </div>

      <SiteFooter />
    </div>
  );
}