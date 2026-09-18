'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Target,
  Home,
  ChevronRight,
  Sparkles,
  Layers,
  Zap,
  Cpu,
  Activity,
  Eye
} from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { getDrillTagline, sortByInterest } from '@/lib/drillCatalog';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import DrillCarousel from '@/components/drill/DrillCarousel';
import StickyMobileCta from '@/components/StickyMobileCta';
import AdjacentHubs from '@/components/AdjacentHubs';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';
import { hasLocalizedRoute } from '@/lib/i18n/locales';

const trackingCategories = [
  {
    id: 'smooth-pursuit',
    name: 'Continuous Smooth Pursuit',
    icon: Eye,
    description: 'Condition steady foveal tracking and eliminate catch-up saccades along harmonic paths',
    drillNames: [
      'constant-slow-pursuit',
      'sine-wave-pursuit',
      'infinity-pursuit',
      'triangular-pursuit',
    ],
  },
  {
    id: 'chaotic-tracking',
    name: 'Chaotic & Evasive Tracking',
    icon: Activity,
    description: 'Track rapid non-linear vector changes, stochastic bounce angles, and velocity spikes',
    drillNames: [
      'directional-chaos-pursuit',
      'dynamic-evasion-pursuit',
      'spatial-shift-pursuit',
      'zig-zag-path-pursuit',
    ],
  },
  {
    id: 'predictive-pursuit',
    name: 'Predictive & Multi-Vector',
    icon: Target,
    description: 'Train trajectory extrapolation during occlusion, split-screen attention, and peripheral pings',
    drillNames: [
      'strobe-prediction-pursuit',
      'predictive-pursuit',
      'split-screen-tracking',
      'staircase-step',
      'peripheral-ping-pursuit',
      'momentum-teleport-pursuit',
      'ghosting-suppress-pursuit',
    ],
  },
];

export default function VisualTrackingDrillsClient({ faqs = [] }: { faqs?: Array<{ q: string; a: string }> }) {
  const { locale, localizeHref, t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [drillBadges, setDrillBadges] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const trackingDrills = DRILLS.filter(d => d.category === 'visual-tracking');

  // Interest-ordered list for the picker: the drill most people want first,
  // rather than three difficulty grids the visitor has to scroll past.
  const orderedTrackingDrills = sortByInterest(trackingDrills);

  useEffect(() => {
    if (!isClient) return;
    try {
      const badges: Record<string, string> = {};
      trackingDrills.forEach((d) => {
        const slug = d.folderName.replace(/-/g, '_');
        const keys = [
          `skilldrills_visual_tracking_${slug}_v2`,
          `skilldrills_visual_tracking_${slug}`,
          `skilldrills_${slug}_v2`,
          `skilldrills_${slug}`,
        ];
        for (const k of keys) {
          const raw = localStorage.getItem(k);
          if (raw) {
            try {
              const parsed = JSON.parse(raw);
              if (parsed) {
                if (typeof parsed.bestLevel === 'number') {
                  badges[d.folderName] = `Lv. ${parsed.bestLevel}`;
                  break;
                } else if (typeof parsed.totalSessions === 'number' && parsed.totalSessions > 0) {
                  badges[d.folderName] = `${parsed.totalSessions} ${parsed.totalSessions === 1 ? 'run' : 'runs'}`;
                  break;
                }
              }
            } catch {}
          }
        }
      });
      setDrillBadges(badges);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-cyan-500/30 relative overflow-hidden">

      {/* Layered premium background: hub-tinted mesh blobs + grid + grain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-cyan-600/[0.12] rounded-full blur-[150px]" />
        <div className="absolute top-[30%] -right-40 w-[480px] h-[480px] bg-blue-500/[0.08] rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 10%, black 40%, transparent 90%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-ink-3 font-mono">
            <li>
              <Link href={localizeHref('/')} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Home className="w-4 h-4" />
                <span>{t('ui.nav.hq', 'HQ')}</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-hairline-2" /></li>
            <li>
              <Link href={hasLocalizedRoute(locale, '/drills') ? localizeHref('/drills') : '/drills'} className="hover:text-cyan-400 transition-colors">
                {t('ui.nav.drills', 'DRILLS')}
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-hairline-2" /></li>
            <li>
              <span className="text-cyan-400 font-semibold uppercase tracking-wider" aria-current="page">
                {t('header.tracking', 'VISUAL TRACKING')}
              </span>
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-1">
            {t('hubs.visual-tracking.h1', 'Visual Tracking Training')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-2 leading-relaxed">
            {t('hubs.visual-tracking.desc', 'Train smooth ocular pursuit, continuous trajectory prediction, and gaze stability.')}
          </p>
        </div>

        {/* Drill picker: one drill at a time, arrows to move, "View all" for the grid */}
        <Reveal>
          <DrillCarousel
            headingId="tracking-drills"
            heading={t('hubs.visual-tracking.drillsHeading', 'Tracking drills')}
            accent="cyan"
            icon={Target}
            showcase
            allLabel={t('ui.viewAll', 'View all')}
            drills={orderedTrackingDrills.map((drill) => {
              const fallbackTagline = getDrillTagline(drill.href, drill.description);
              const localized = getLocalizedDrill(drill.href, locale, drill.name, fallbackTagline);
              return {
                href: drill.href,
                name: localized.name,
                tagline: localized.tagline,
                difficulty: drill.difficulty,
                duration: drill.duration,
                badge: drillBadges[drill.folderName] || null,
              };
            })}
          />
        </Reveal>

        {/* Visual Tracking Domains - 3 Category Cards with Crawlable Links */}
        <Reveal className="mb-14">
          <div className="bg-surface-1 border border-hairline rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="w-5 h-5 text-cyan-400" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                Tracking Domains
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {trackingCategories.map((cat) => {
                const Icon = cat.icon;
                const drillsInCat = trackingDrills.filter((d) => cat.drillNames.includes(d.folderName));
                return (
                  <div
                    key={cat.id}
                    className="bg-surface-2/80 border border-hairline rounded-2xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-ink-1">
                            {cat.name}
                          </h3>
                          <span className="text-[10px] font-mono text-cyan-400">
                            {drillsInCat.length} {drillsInCat.length === 1 ? 'Drill' : 'Drills'}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-ink-2 leading-relaxed mb-4">
                        {cat.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-hairline">
                      {drillsInCat.map((drill) => {
                        const href = hasLocalizedRoute(locale, drill.href)
                          ? localizeHref(drill.href)
                          : drill.href;
                        const fallbackTagline = getDrillTagline(drill.href, drill.description);
                        const localized = getLocalizedDrill(drill.href, locale, drill.name, fallbackTagline);
                        return (
                          <Link
                            key={drill.href}
                            href={href}
                            className="group/item flex items-center justify-between p-2 rounded-xl bg-surface-1/60 hover:bg-cyan-500/10 border border-hairline hover:border-cyan-500/30 transition-all text-xs"
                          >
                            <span className="font-medium text-ink-1 group-hover/item:text-cyan-300 transition-colors truncate pr-2">
                              {localized.name}
                            </span>
                            <span className="text-[10px] font-mono text-ink-3 group-hover/item:text-cyan-400 shrink-0 flex items-center gap-1">
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

        {/* Engine & Hardware Optimization */}
        <Reveal className="mb-14">
          <div className="rounded-3xl bg-surface-1/70 border border-hairline p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                Engine &amp; Hardware Optimization
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Decoupled Physics Engine
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Calculates target trajectory kinematics completely decoupled from render frame rates, eliminating path warping across high-refresh monitors.
                </p>
              </div>

              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                  <Activity className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Sub-Pixel Vector Smoothing
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  True 64-bit floating point coordinate integration ensures targets glide seamlessly across display boundaries without staircasing artifacts.
                </p>
              </div>

              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  360Hz Display Calibration
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Synchronized browser canvas frame scheduling matches ultra-fast gaming panels, eliminating motion judder and micro-stuttering.
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
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                  {t('home.faqTitle', 'Frequently Asked Questions')}
                </h2>
              </div>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqs.map((f, i) => (
                  <div key={i} className="bg-surface-2/80 border border-hairline rounded-2xl p-5 flex flex-col justify-start">
                    <dt className="font-bold text-ink-1 text-sm font-sans flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs font-bold shrink-0 mt-0.5">
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

        <AdjacentHubs currentCat="visual-tracking" />

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
          href={hasLocalizedRoute(locale, '/drills/visual-tracking/sine-wave-pursuit') ? localizeHref('/drills/visual-tracking/sine-wave-pursuit') : '/drills/visual-tracking/sine-wave-pursuit'}
          label={t('hubs.visual-tracking.startCta', 'Start Pursuit Drill')}
          categoryName={t('header.tracking', 'Visual Tracking')}
        />
        <SiteFooter />
      </div>
    </div>
  );
}
