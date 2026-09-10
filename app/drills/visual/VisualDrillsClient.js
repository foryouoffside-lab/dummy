'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Eye,
  Home,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { getDrillTagline, sortByInterest } from '@/lib/drillCatalog';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import DrillCarousel from '@/components/drill/DrillCarousel';
import AdjacentHubs from '@/components/AdjacentHubs';
import StickyMobileCta from '@/components/StickyMobileCta';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';
import { hasLocalizedRoute } from '@/lib/i18n/locales';

const FOLDER_TO_STORAGE_KEY = {
  'visual-search': 'skilldrills_visual_search_v4',
  'no-go': 'skilldrills_visual_go_nogo_v5',
  'light-reaction': 'skilldrills_visual_light_reaction_v5',
  'moving-target': 'skilldrills_visual_moving_target_v5',
  'pursuit-tracker': 'skilldrills_visual_pursuit_tracker_v2',
  'multiple-targets': 'skilldrills_visual_multiple_targets_v1',
  'distance-judgment': 'skilldrills_visual_distance_judgment_v4',
  'entropic-grid': 'skilldrills_visual_entropic_grid_v4',
  'rhythm-anomaly': 'rhythmAnomalyBestScore_v8',
};

export default function VisualDrillsClient({ faqs = [] }) {
  const { locale, localizeHref, t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [drillLevels, setDrillLevels] = useState({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const drills = DRILLS.filter(d => d.category === 'visual');

  useEffect(() => {
    if (!isClient) return;
    try {
      const levels = {};
      drills.forEach(d => {
        const override = FOLDER_TO_STORAGE_KEY[d.folderName];
        const slug = d.folderName.replace(/-/g, '_');
        const keys = override ? [override, override.replace(/_v\d+$/, '_v4'), override.replace(/_v\d+$/, '')] : [
          `skilldrills_visual_${slug}_v5`,
          `skilldrills_visual_${slug}_v4`,
          `skilldrills_visual_${slug}_v3`,
          `skilldrills_${slug}`,
        ];
        for (const k of keys) {
          const raw = localStorage.getItem(k);
          if (raw) {
            try {
              const parsed = JSON.parse(raw);
              if (parsed && typeof parsed === 'object') {
                if (typeof parsed.bestLevel === 'number') {
                  levels[d.folderName] = `Lv. ${parsed.bestLevel}`;
                  break;
                } else if (typeof parsed.bestScore === 'number' && parsed.bestScore > 0) {
                  levels[d.folderName] = `Score: ${parsed.bestScore}`;
                  break;
                } else if (typeof parsed.totalSessions === 'number' && parsed.totalSessions > 0) {
                  levels[d.folderName] = `${parsed.totalSessions} ${parsed.totalSessions === 1 ? 'run' : 'runs'}`;
                  break;
                }
              } else if (typeof parsed === 'number' && parsed > 0) {
                levels[d.folderName] = `Best: ${parsed}`;
                break;
              }
            } catch {
              const num = parseInt(raw, 10);
              if (!isNaN(num) && num > 0) {
                levels[d.folderName] = `Best: ${num}`;
                break;
              }
            }
          }
        }
      });
      setDrillLevels(levels);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  // Interest-ordered list for the picker: the drill most people want first,
  // rather than four sector grids the visitor has to scroll past.
  const orderedVisualDrills = sortByInterest(drills);

  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-fuchsia-500/30 relative overflow-hidden">

      {/* Layered premium background: hub-tinted mesh blobs + grid + grain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-fuchsia-600/[0.12] rounded-full blur-[150px]" />
        <div className="absolute top-[30%] -right-40 w-[480px] h-[480px] bg-pink-500/[0.08] rounded-full blur-[140px]" />
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
              <Link href={localizeHref('/')} className="flex items-center gap-1.5 hover:text-fuchsia-400 transition-colors">
                <Home className="w-4 h-4" />
                <span>{t('ui.nav.hq', 'HQ')}</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-hairline-2" /></li>
            <li>
              <Link href={hasLocalizedRoute(locale, '/drills') ? localizeHref('/drills') : '/drills'} className="hover:text-fuchsia-400 transition-colors">
                {t('ui.nav.drills', 'DRILLS')}
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-hairline-2" /></li>
            <li>
              <span className="text-fuchsia-400 font-semibold uppercase tracking-wider" aria-current="page">
                {t('header.visual', 'VISUAL TRAINING')}
              </span>
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-1">
            {t('hubs.visual.h1', 'Visual Training & Recognition')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-2 leading-relaxed">
            {t(
              'hubs.visual.desc',
              'Visual training drills measure how quickly and how accurately your visual system finds, follows and judges things on a screen. Each one isolates a different function: simple visual reaction, which runs about 200–250 ms in healthy adults (Woods et al., 2015); smooth pursuit, which stays accurate to roughly 30°/s before the eye needs catch-up saccades (Krauzlis, 2004); visual search; multiple object tracking; and depth judgement. Free, no sign-up, and every score stays in your browser.'
            )}
          </p>
        </div>

        {/* Drill picker: one drill at a time, arrows to move, "View all" for the grid */}
        <Reveal>
          <DrillCarousel
            headingId="visual-drills"
            heading={t('hubs.visual.drillsHeading', 'Visual drills')}
            accent="fuchsia"
            icon={Eye}
            showcase
            allLabel={t('ui.viewAll', 'View all')}
            drills={orderedVisualDrills.map((drill) => {
              const fallbackTagline = getDrillTagline(drill.href, drill.description);
              const localized = getLocalizedDrill(drill.href, locale, drill.name, fallbackTagline);
              return {
                href: drill.href,
                name: localized.name,
                tagline: localized.tagline,
                difficulty: drill.difficulty,
                duration: drill.duration,
                badge: drillLevels[drill.folderName] || null,
              };
            })}
          />
        </Reveal>

        {/* Visual Training Tips Panel */}
        <Reveal className="mt-16 mb-12">
          <div className="p-8 bg-surface-1 rounded-3xl border border-hairline shadow-xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-70" />
            <h2 className="text-lg font-bold text-ink-1 mb-6 flex items-center gap-2 tracking-wide font-mono uppercase">
              <Sparkles className="w-5 h-5 text-fuchsia-400" />
              Visual Performance Strategies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
              <div className="p-4 bg-surface-2 rounded-xl border border-hairline">
                <h3 className="font-bold text-ink-1 mb-2 text-sm">1. Saccadic Fixation</h3>
                <p className="text-xs text-ink-2 leading-relaxed">
                  Prioritize peripheral target acquisition drills to minimize target re-fixation times. Always calibrate under stable ambient lighting.
                </p>
              </div>
              <div className="p-4 bg-surface-2 rounded-xl border border-hairline">
                <h3 className="font-bold text-ink-1 mb-2 text-sm">2. Contrast Sensitivity</h3>
                <p className="text-xs text-ink-2 leading-relaxed">
                  Overloading visual search pathways with entropic grid training improves object isolation in low-contrast, chaotic game scenarios.
                </p>
              </div>
              <div className="p-4 bg-surface-2 rounded-xl border border-hairline">
                <h3 className="font-bold text-ink-1 mb-2 text-sm">3. Dynamic Rest Cycle</h3>
                <p className="text-xs text-ink-2 leading-relaxed">
                  Apply the 20-20-20 technique between intense drills to prevent ciliary muscle strain and maintain high kinetic reaction rates.
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
                <Sparkles className="w-5 h-5 text-fuchsia-400" />
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                  {t('home.faqTitle', 'Frequently Asked Questions')}
                </h2>
              </div>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqs.map((f, i) => (
                  <div key={i} className="bg-surface-2/80 border border-hairline rounded-2xl p-5 flex flex-col justify-start">
                    <dt className="font-bold text-ink-1 text-sm font-sans flex items-start gap-2.5">
                      <span className="text-fuchsia-400 font-mono text-xs font-bold shrink-0 mt-0.5">
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

        <AdjacentHubs currentCat="visual" />

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
          href={hasLocalizedRoute(locale, '/drills/visual/reaction-speed/light-reaction') ? localizeHref('/drills/visual/reaction-speed/light-reaction') : '/drills/visual/reaction-speed/light-reaction'}
          label={t('hubs.visual.startCta', 'Start Visual Drill')}
          categoryName={t('header.visual', 'Visual')}
        />
        <SiteFooter />
      </div>
    </div>
  );
}