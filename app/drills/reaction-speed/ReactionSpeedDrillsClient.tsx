'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Zap,
  Home,
  ChevronRight,
  Sparkles,
  Layers,
  Clock,
  Cpu,
  MousePointer,
  Target,
  Eye,
} from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { getDifficultyRank } from '@/lib/scoringEngine';
import { getDrillTagline, sortByInterest } from '@/lib/drillCatalog';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import DrillCarousel from '@/components/drill/DrillCarousel';
import StickyMobileCta from '@/components/StickyMobileCta';
import AdjacentHubs from '@/components/AdjacentHubs';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';
import { hasLocalizedRoute } from '@/lib/i18n/locales';

const reactionCategories = [
  {
    id: 'simple-latency',
    name: 'Simple Latency & Reflexes',
    icon: Zap,
    description: 'Measure raw neuromuscular response time and burst reflex execution',
    drillNames: [
      'reaction-time-test',
      'reflex-training-drill',
      'reaction-game',
    ],
  },
  {
    id: 'saccadic-reflexes',
    name: 'Saccadic Eye Reflexes',
    icon: Eye,
    description: 'Condition ballistic gaze shifts, corner checks, and visual acquisition',
    drillNames: [
      'saccadic-gallery',
      'market-doors-pursuit',
      'barrier-sequence-pursuit',
    ],
  },
  {
    id: 'dynamic-pursuit',
    name: 'Dynamic Pursuit & Tracking',
    icon: Target,
    description: 'Track erratic high-speed dash movements and sudden directional changes',
    drillNames: [
      'visual-tracking-speed-test',
      'fps-tracking-trainer',
    ],
  },
];

const FOLDER_TO_STORAGE_KEY: Record<string, string> = {
  'market-doors-pursuit': 'skilldrills_market_doors_v3',
  'fps-tracking-trainer': 'skilldrills_fps_tracking_v3',
  'reaction-game': 'skilldrills_reaction_simulator_v3',
};

type HubFaq = { q: string; a: string };

export default function ReactionSpeedDrillsClient({ faqs = [] }: { faqs?: HubFaq[] }) {
  const { locale, localizeHref, t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [drillLevels, setDrillLevels] = useState<Record<string, number>>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const reactiveDrills = DRILLS.filter(d => d.category === 'reaction-speed').sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty));

  // Interest-ordered list for the picker: the drill most people want first.
  // reaction-time-test leads on measured demand (`reaction time test`, 10,978
  // Bing exact/mo) rather than on difficulty order.
  const orderedReactiveDrills = sortByInterest(reactiveDrills);

  useEffect(() => {
    if (!isClient) return;
    try {
      const levels: Record<string, number> = {};
      reactiveDrills.forEach(d => {
        const override = FOLDER_TO_STORAGE_KEY[d.folderName];
        const keys = override ? [override, override.replace(/_v3$/, '_v2'), override.replace(/_v3$/, '')] : [
          `skilldrills_${d.folderName.replace(/-/g, '_')}_v3`,
          `skilldrills_${d.folderName.replace(/-/g, '_')}_v2`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-amber-500/30 relative overflow-hidden">

      {/* Layered premium background: hub-tinted mesh blobs + grid + grain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-amber-500/[0.12] rounded-full blur-[150px]" />
        <div className="absolute top-[30%] -right-40 w-[480px] h-[480px] bg-yellow-500/[0.08] rounded-full blur-[140px]" />
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
              <Link href={localizeHref('/')} className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <Home className="w-4 h-4" />
                <span>{t('ui.nav.hq', 'HQ')}</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-hairline-2" /></li>
            <li>
              <Link href={hasLocalizedRoute(locale, '/drills') ? localizeHref('/drills') : '/drills'} className="hover:text-amber-400 transition-colors">
                {t('ui.nav.drills', 'DRILLS')}
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-hairline-2" /></li>
            <li>
              <span className="text-amber-400 font-semibold uppercase tracking-wider" aria-current="page">
                {t('header.reaction', 'REACTION SPEED')}
              </span>
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-1">
            {t('hubs.reaction-speed.h1', 'Reaction Time Test & Drills')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-2 leading-relaxed">
            {t('hubs.reaction-speed.desc', 'Test and accelerate simple & choice stimulus response times, visual trigger reflexes, and latency stability.')}
          </p>
        </div>

        {/* Drill picker: one drill at a time, arrows to move, "View all" for the grid */}
        <Reveal>
          <DrillCarousel
            headingId="reaction-drills"
            heading={t('hubs.reaction-speed.drillsHeading', 'Reaction drills')}
            accent="amber"
            icon={Zap}
            showcase
            allLabel={t('ui.viewAll', 'View all')}
            drills={orderedReactiveDrills.map((drill) => {
              const fallbackTagline = getDrillTagline(drill.href, drill.description);
              const localized = getLocalizedDrill(drill.href, locale, drill.name, fallbackTagline);
              return {
                href: drill.href,
                name: localized.name,
                tagline: localized.tagline,
                difficulty: drill.difficulty,
                duration: drill.duration,
                badge: drillLevels[drill.folderName] ? `Lv. ${drillLevels[drill.folderName]}` : null,
              };
            })}
          />
        </Reveal>

        {/* Reaction Training Domains - 3 Category Cards with Crawlable Links */}
        <Reveal className="mb-14">
          <div className="bg-surface-1 border border-hairline rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="w-5 h-5 text-amber-400" />
              <h2 className="text-base sm:text-lg font-semibold tracking-tight text-ink-1">
                Reaction Training Domains
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {reactionCategories.map((cat) => {
                const Icon = cat.icon;
                const drillsInCat = reactiveDrills.filter(d => cat.drillNames.includes(d.folderName));
                return (
                  <div
                    key={cat.id}
                    className="bg-surface-2/80 border border-hairline rounded-2xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold tracking-tight text-ink-1">
                            {cat.name}
                          </h3>
                          <span className="text-xs font-medium text-amber-400">
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
                            className="group/item flex items-center justify-between p-2 rounded-xl bg-surface-1/60 hover:bg-amber-500/10 border border-hairline hover:border-amber-500/30 transition-all text-sm"
                          >
                            <span className="font-medium text-ink-1 group-hover/item:text-amber-300 transition-colors truncate pr-2">
                              {localized.name}
                            </span>
                            <span className="text-xs font-medium text-ink-3 group-hover/item:text-amber-400 shrink-0 flex items-center gap-1">
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
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-base sm:text-lg font-semibold tracking-tight text-ink-1">
                Engine &amp; Hardware Optimization
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-ink-1 mb-1.5">
                  Hardware-Polled Timestamping
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Bypasses synthetic timer limits using monotonic high-resolution performance clocks. Records physical switch inputs at the browser's native ~1ms timer resolution.
                </p>
              </div>

              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <MousePointer className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-ink-1 mb-1.5">
                  Sub-Pixel Trigger Interception
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Captures raw pointer events immediately on device contact, eliminating event bubbling overhead and OS cursor smoothing lag.
                </p>
              </div>

              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-ink-1 mb-1.5">
                  240Hz+ Display Frame Sync
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Decoupled rendering loop matches native display refresh rates up to 360Hz. Visual cues appear without dropped frames or tearing artifacts.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Frequently Asked Questions (SEO / AEO / GEO) */}
        {faqs.length > 0 && (
          <Reveal className="mb-14">
            <div className="rounded-3xl bg-surface-1/70 border border-hairline p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-base sm:text-lg font-semibold tracking-tight text-ink-1">
                  {t('home.faqTitle', 'Frequently Asked Questions')}
                </h2>
              </div>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqs.map((f, i) => (
                  <div
                    key={f.q}
                    className="bg-surface-2/80 border border-hairline rounded-2xl p-5 flex flex-col justify-start"
                  >
                    <dt className="font-bold text-ink-1 text-sm font-sans flex items-start gap-2.5">
                      <span className="text-amber-400 font-mono text-xs font-bold shrink-0 mt-0.5">
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

        <AdjacentHubs currentCat="reaction-speed" />

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
          href={hasLocalizedRoute(locale, '/drills/reaction-speed/reaction-time-test') ? localizeHref('/drills/reaction-speed/reaction-time-test') : '/drills/reaction-speed/reaction-time-test'}
          label={t('hubs.reaction-speed.startReactionTest', 'Start Reaction Test')}
          categoryName={t('header.reaction', 'Reaction Speed')}
        />
        <SiteFooter />
      </div>
    </div>
  );
}
