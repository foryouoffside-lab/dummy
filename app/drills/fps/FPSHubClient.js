'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Crosshair,
  Eye,
  Zap,
  Home,
  ChevronRight,
  Target,
  Sparkles,
  MousePointer,
  Cpu,
  Layers
} from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { getDrillTagline, sortByInterest } from '@/lib/drillCatalog';
import { getDifficultyRank } from '@/lib/scoringEngine';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import AdjacentHubs from '@/components/AdjacentHubs';
import { useTranslation } from '@/lib/i18n/useTranslation';
import DrillCarousel from '@/components/drill/DrillCarousel';
import StickyMobileCta from '@/components/StickyMobileCta';
import { hasLocalizedRoute } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

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

const fpsDrills = DRILLS.filter((d) => d.category === 'fps');

const fpsCategories = [
  {
    id: 'clicking',
    name: 'Precision Clicking',
    icon: Crosshair,
    description: 'Target snapping, micro-corrections, and rapid single-shot precision clicking',
    drills: fpsDrills
      .filter((d) => DRILL_METADATA[d.folderName]?.discipline === 'clicking')
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)),
  },
  {
    id: 'tracking',
    name: 'Tracking & Smoothness',
    icon: Eye,
    description: 'Continuous crosshair maintenance on evasive, accelerating, and aerial targets',
    drills: fpsDrills
      .filter((d) => DRILL_METADATA[d.folderName]?.discipline === 'tracking')
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)),
  },
  {
    id: 'recoil',
    name: 'Recoil & Angles',
    icon: Target,
    description: 'Pattern compensation, crosshair placement, and tactical angle holding',
    drills: fpsDrills
      .filter((d) => DRILL_METADATA[d.folderName]?.discipline === 'recoil')
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)),
  },
  {
    id: 'reflex',
    name: 'Reflex & Reaction',
    icon: Zap,
    description: 'Simple and choice reaction speed, peripheral awareness, and rhythm flow',
    drills: fpsDrills
      .filter((d) => DRILL_METADATA[d.folderName]?.discipline === 'reflex')
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)),
  },
];

// Flat, interest-ordered list for the carousel picker
const orderedFpsDrills = sortByInterest(
  fpsCategories.flatMap((category) =>
    category.drills.map((drill) => ({ ...drill, icon: category.icon }))
  )
);

export default function FPSHubClient({ faqs = [] }) {
  const { locale, t, localizeHref } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [drillLevels, setDrillLevels] = useState({});

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
            } catch {}
          }
        }
      });
      setDrillLevels(levels);
    } catch {}
  }, [isClient]);

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
                <span>{t('ui.nav.hq', 'HQ')}</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li>
              <Link
                href={hasLocalizedRoute(locale, '/drills') ? localizeHref('/drills') : '/drills'}
                className="hover:text-red-400 transition-colors"
              >
                {t('ui.nav.drills', 'DRILLS')}
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li>
              <span className="text-red-400 font-bold" aria-current="page">
                {t('header.fps', 'FPS AIM')}
              </span>
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-1">
            {t('hubs.fps.h1', 'Free FPS Aim Trainer')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-2 leading-relaxed">
            {t(
              'hubs.fps.desc',
              'Zero-latency browser aim training calibrated for Valorant, CS2, and Apex Legends. Master flick shots, micro-adjustments, smooth pursuit tracking, and recoil control.'
            )}
          </p>
        </div>

        {/* Drill Matrix - Swipeable Carousel */}
        <Reveal>
          <DrillCarousel
            headingId="fps-drills"
            heading={t('hubs.fps.drillsHeading', 'FPS aim drills')}
            accent="red"
            icon={Crosshair}
            showcase
            allLabel={t('ui.viewAll', 'View all')}
            drills={orderedFpsDrills.map((drill) => {
              const fallbackTagline = getDrillTagline(drill.href, drill.description);
              const localized = getLocalizedDrill(drill.href, locale, drill.name, fallbackTagline);
              return {
                href: drill.href,
                name: localized.name,
                tagline: localized.tagline,
                difficulty: drill.difficulty,
                duration: drill.duration,
                icon: drill.icon,
                badge: drillLevels[drill.folderName] ? `Lv. ${drillLevels[drill.folderName]}` : null,
              };
            })}
          />
        </Reveal>

        {/* FPS Training Domains - 4 Category Cards with Crawlable Links */}
        <Reveal className="mb-14">
          <div className="bg-surface-1 border border-hairline rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="w-5 h-5 text-red-400" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                FPS Training Domains
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {fpsCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="bg-surface-2/80 border border-hairline rounded-2xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-ink-1">
                            {cat.name}
                          </h3>
                          <span className="text-[10px] font-mono text-red-400">
                            {cat.drills.length} {cat.drills.length === 1 ? 'Drill' : 'Drills'}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-ink-2 leading-relaxed mb-4">
                        {cat.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-hairline">
                      {cat.drills.map((drill) => {
                        const href = hasLocalizedRoute(locale, drill.href)
                          ? localizeHref(drill.href)
                          : drill.href;
                        const fallbackTagline = getDrillTagline(drill.href, drill.description);
                        const localized = getLocalizedDrill(drill.href, locale, drill.name, fallbackTagline);
                        return (
                          <Link
                            key={drill.href}
                            href={href}
                            className="group/item flex items-center justify-between p-2 rounded-xl bg-surface-1/60 hover:bg-red-500/10 border border-hairline hover:border-red-500/30 transition-all text-xs"
                          >
                            <span className="font-medium text-ink-1 group-hover/item:text-red-300 transition-colors truncate pr-2">
                              {localized.name}
                            </span>
                            <span className="text-[10px] font-mono text-ink-3 group-hover/item:text-red-400 shrink-0 flex items-center gap-1">
                              {drill.duration}
                              <ChevronRight className="w-3 h-3 transition-transform group-hover/item:translate-x-0.5" />
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

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
                  Physics runs decoupled from rendering and keeps up with refresh rates to 360Hz. Targets glide smoothly without jitter, judder, or frame drops.
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

        {/* Frequently Asked Questions (SEO / AEO / GEO) */}
        {faqs?.length > 0 && (
          <Reveal className="mb-14">
            <div className="rounded-3xl bg-surface-1/70 border border-hairline p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-red-400" />
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                  {t('home.faqTitle', 'Frequently Asked Questions')}
                </h2>
              </div>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqs.map((f, i) => (
                  <div key={i} className="bg-surface-2/80 border border-hairline rounded-2xl p-5 flex flex-col justify-start">
                    <dt className="font-bold text-ink-1 text-sm font-sans flex items-start gap-2.5">
                      <span className="text-red-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                        Q{i + 1}.
                      </span>
                      <span>{f.q}</span>
                    </dt>
                    <dd className="mt-2.5 text-xs text-ink-3 leading-relaxed pl-6 font-sans">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        )}

        {/* Clean Adjacent Hubs Navigation */}
        <AdjacentHubs currentCat="fps" />

        {/* Back Link */}
        <div className="mt-12 border-t border-hairline pt-6">
          <Link 
            href={hasLocalizedRoute(locale, '/drills') ? localizeHref('/drills') : '/drills'}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-ink-3 hover:text-ink-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('ui.returnToAllSectors', 'Return to All Sectors')}
          </Link>
        </div>

        <StickyMobileCta
          href={hasLocalizedRoute(locale, '/drills/fps/flick-shot-training') ? localizeHref('/drills/fps/flick-shot-training') : '/drills/fps/flick-shot-training'}
          label={t('hubs.fps.startCta', 'Start FPS Drill')}
          categoryName={t('header.fps', 'FPS Aim')}
        />
      </div>

      <SiteFooter />
    </div>
  );
}