'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Zap,
  Home,
  ChevronRight
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

const FOLDER_TO_STORAGE_KEY: Record<string, string> = {
  'market-doors-pursuit': 'skilldrills_market_doors_v2',
  'fps-tracking-trainer': 'skilldrills_fps_tracking_v2',
};

export default function ReactionSpeedDrillsClient() {
  const { t } = useTranslation();
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
        const keys = override ? [override] : [
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
            } catch (e) {}
          }
        }
      });
      setDrillLevels(levels);
    } catch (e) {}
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
              <Link href="/" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <Home className="w-4 h-4" />
                <span>HQ</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-hairline-2" /></li>
            <li>
              <Link href="/drills" className="hover:text-amber-400 transition-colors">
                DRILLS
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-hairline-2" /></li>
            <li>
              <span className="text-amber-400 font-semibold uppercase tracking-wider" aria-current="page">
                REACTION SPEED
              </span>
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-1">
            {t('hubs.reaction-speed.h1', 'Reaction Time Test & Drills')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-2 max-w-2xl leading-relaxed">
            {t('hubs.reaction-speed.desc', 'Test and accelerate simple & choice stimulus response times, visual trigger reflexes, and latency stability.')}
          </p>
        </div>

        {/* Drill picker: one drill at a time, arrows to move, "View all" for the grid */}
        <Reveal>
          <DrillCarousel
            headingId="reaction-drills"
            heading="Reaction drills"
            accent="amber"
            icon={Zap}
            allLabel="View all"
            drills={orderedReactiveDrills.map((drill) => ({
              href: drill.href,
              name: drill.name,
              tagline: getDrillTagline(drill.href, drill.description),
              difficulty: drill.difficulty,
              duration: drill.duration,
              badge: drillLevels[drill.folderName] ? `Lv. ${drillLevels[drill.folderName]}` : null,
            }))}
          />
        </Reveal>

        <AdjacentHubs currentCat="reaction-speed" />

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

        <StickyMobileCta href="/drills/reaction-speed/reaction-time-test" label="Start Reaction Test" categoryName="Reaction Speed" />
        <SiteFooter />
      </div>
    </div>
  );
}
