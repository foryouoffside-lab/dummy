'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Target,
  Activity,
  Home,
  ChevronRight
} from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { getDrillTagline, sortByInterest } from '@/lib/drillCatalog';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import DrillCarousel from '@/components/drill/DrillCarousel';
import StickyMobileCta from '@/components/StickyMobileCta';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function VisualTrackingDrillsClient() {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const trackingDrills = DRILLS.filter(d => d.category === 'visual-tracking');

  // Interest-ordered list for the picker: the drill most people want first,
  // rather than three difficulty grids the visitor has to scroll past.
  const orderedTrackingDrills = sortByInterest(trackingDrills);

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
              <Link href="/" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Home className="w-4 h-4" />
                <span>HQ</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-hairline-2" /></li>
            <li>
              <Link href="/drills" className="hover:text-cyan-400 transition-colors">
                DRILLS
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-hairline-2" /></li>
            <li>
              <span className="text-cyan-400 font-semibold uppercase tracking-wider" aria-current="page">
                VISUAL TRACKING
              </span>
            </li>
          </ol>
        </nav>

        {/* Hero Section with compact inline chip next to H1 */}
        <Reveal>
          <div className="relative mb-8 p-6 sm:p-8 rounded-2xl bg-surface-1 border border-hairline shadow-2xl backdrop-blur-xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 opacity-70" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex items-start gap-4">
              <div className="p-3.5 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl shrink-0">
                <Activity className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-1 tracking-tight uppercase">
                  {t('hubs.visual-tracking.h1', 'Visual Tracking Training')}
                </h1>
                <p className="text-ink-2 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
                  {t('hubs.visual-tracking.desc', 'Train smooth ocular pursuit, continuous trajectory prediction, and gaze stability.')}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Start Here Band */}
        <Reveal className="mb-10">
          <div className="p-5 rounded-2xl bg-surface-1/80 backdrop-blur-xl border border-hairline shadow-lg">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3">
              Recommended Start Routines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/drills/visual-tracking/constant-slow-pursuit"
                className="p-3.5 rounded-xl bg-surface-2/80 border border-hairline hover:border-cyan-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-cyan-400 transition-colors">New to Visual Tracking</p>
                <p className="text-[10px] text-ink-3 mt-1">Constant slow pursuit baseline</p>
              </Link>
              <Link
                href="/drills/visual-tracking/sine-wave-pursuit"
                className="p-3.5 rounded-xl bg-surface-2/80 border border-hairline hover:border-cyan-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-cyan-400 transition-colors">Smooth Pursuit Warm-up</p>
                <p className="text-[10px] text-ink-3 mt-1">Sinusoidal motion path tracking</p>
              </Link>
              <Link
                href="/drills/visual-tracking/directional-chaos-pursuit"
                className="p-3.5 rounded-xl bg-surface-2/80 border border-hairline hover:border-cyan-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-cyan-400 transition-colors">Full Tracking Circuit</p>
                <p className="text-[10px] text-ink-3 mt-1">Advanced directional chaos pursuit</p>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Drill picker: one drill at a time, arrows to move, "View all" for the grid */}
        <Reveal>
          <DrillCarousel
            headingId="tracking-drills"
            heading="Tracking drills"
            accent="cyan"
            icon={Target}
            allLabel="View all"
            drills={orderedTrackingDrills.map((drill) => ({
              href: drill.href,
              name: drill.name,
              tagline: getDrillTagline(drill.href, drill.description),
              difficulty: drill.difficulty,
              duration: drill.duration,
            }))}
          />
        </Reveal>

        {/* Back Link */}
        <div className="mt-12 border-t border-hairline pt-6">
          <Link 
            href="/drills"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-ink-3 hover:text-ink-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to All Sectors
          </Link>
        </div>

        <StickyMobileCta href="/drills/visual-tracking/sine-wave-pursuit" label="Start Pursuit Drill" categoryName="Visual Tracking" />
        <SiteFooter />
      </div>
    </div>
  );
}
