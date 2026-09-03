'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
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

import StickyMobileCta from '@/components/StickyMobileCta';
import { useTranslation } from '@/lib/i18n/useTranslation';

const FOLDER_TO_STORAGE_KEY = {
  'visual-search': 'skilldrills_visual_search_v4',
  'no-go': 'skilldrills_visual_go_nogo_v4',
  'pursuit-tracker': 'skilldrills_visual_pursuit_tracker_v2',
  'multiple-targets': 'skilldrills_visual_multiple_targets_v1',
  'rhythm-anomaly': 'rhythmAnomalyBestScore_v8',
};

// Drills whose saved best score/level is never read back to set a new
// session's starting difficulty (every round always begins at the same base
// difficulty) — no adaptive difficulty, so a "reset progress" button has
// nothing meaningful to reset.

export default function VisualDrillsClient() {
  const { t } = useTranslation();
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
        const keys = override ? [override] : [
          `skilldrills_visual_${d.folderName.replace(/-/g, '_')}_v4`,
          `skilldrills_visual_${d.folderName.replace(/-/g, '_')}_v3`,
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

  // Interest-ordered list for the picker: the drill most people want first,
  // rather than four sector grids the visitor has to scroll past.
  const orderedVisualDrills = sortByInterest(drills);

  const totalDrills = drills.length;

  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-fuchsia-500/30">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Visual Drills - Reaction Speed, Tracking & Vision Training",
            "url": "https://skilldrills.online/drills/visual",
            "description": `${totalDrills} free visual training drills across Reaction Speed, Tracking Accuracy, Visual Recognition, and Depth Perception categories.`,
            "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "Visual Skill Training" },
            "numberOfItems": totalDrills,
            "itemListElement": drills.map((drill, index) => ({
              "@type": "ListItem", "position": index + 1,
              "item": { "@type": "WebApplication", "name": drill.name, "url": `https://skilldrills.online${drill.href}`, "description": drill.description, "applicationCategory": "EducationalApplication", "operatingSystem": "Web" }
            }))
          })
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-ink-3 font-mono">
            <li>
              <Link href="/" className="flex items-center gap-1.5 hover:text-fuchsia-400 transition-colors">
                <Home className="w-4 h-4" />
                <span>HQ</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-hairline-2" /></li>
            <li>
              <Link href="/drills" className="hover:text-fuchsia-400 transition-colors">
                DRILLS
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-hairline-2" /></li>
            <li>
              <span className="text-fuchsia-400 font-semibold uppercase tracking-wider" aria-current="page">
                VISUAL HUB
              </span>
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-1">
            {t('hubs.visual.h1', 'Visual Training & Recognition')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-2 max-w-2xl leading-relaxed">
            {t('hubs.visual.desc', 'Calibrate foveal detection, saccadic recognition, and peripheral awareness.')}
          </p>
        </div>

        {/* Drill picker: one drill at a time, arrows to move, "View all" for the grid */}
        <Reveal>
          <DrillCarousel
            headingId="visual-drills"
            heading="Visual drills"
            accent="fuchsia"
            icon={Eye}
            allLabel="View all"
            drills={orderedVisualDrills.map((drill) => ({
              href: drill.href,
              name: drill.name,
              tagline: getDrillTagline(drill.href, drill.description),
              difficulty: drill.difficulty,
              duration: drill.duration,
              badge: drillLevels[drill.folderName] ? `Lv. ${drillLevels[drill.folderName]}` : null,
            }))}
          />
        </Reveal>

        {/* Dynamic Warning Alert banner */}
        <section className="sr-only" aria-label="Visual drills overview">
          <h2>Visual Training Drills Overview</h2>
          <p>
            Access {totalDrills} free visual training drills across 4 categories.
            Reaction Speed: Strobe-Latency Lab and Chroma-Sync Lab.
            Tracking Accuracy: Kinetic Intercept, Auto-Pursuit, and Ghost-Link Tracking.
            Visual Recognition: Visual Search, Entropic Grid, and Rhythm Anomaly.
            Depth Perception: Distance Judgment Lab.
            All drills are free with no login required.
          </p>
        </section>

        {/* Visual Training Tips Panel */}
        <Reveal className="mt-16 mb-12">
        <div className="p-8 bg-surface-1 rounded-3xl border border-hairline shadow-xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-70" />
          <h3 className="text-lg font-bold text-ink-1 mb-6 flex items-center gap-2 tracking-wide font-mono uppercase">
            <Sparkles className="w-5 h-5 text-fuchsia-400" />
            Visual Performance Strategies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
            <div className="p-4 bg-surface-2 rounded-xl border border-hairline">
              <h4 className="font-bold text-ink-1 mb-2 text-sm">1. Saccadic Fixation</h4>
              <p className="text-xs text-ink-2 leading-relaxed">
                Prioritize peripheral target acquisition drills to minimize target re-fixation times. Always calibrate under stable ambient lighting.
              </p>
            </div>
            <div className="p-4 bg-surface-2 rounded-xl border border-hairline">
              <h4 className="font-bold text-ink-1 mb-2 text-sm">2. Contrast Sensitivity</h4>
              <p className="text-xs text-ink-2 leading-relaxed">
                Overloading visual search pathways with entropic grid training improves object isolation in low-contrast, chaotic game scenarios.
              </p>
            </div>
            <div className="p-4 bg-surface-2 rounded-xl border border-hairline">
              <h4 className="font-bold text-ink-1 mb-2 text-sm">3. Dynamic Rest Cycle</h4>
              <p className="text-xs text-ink-2 leading-relaxed">
                Apply the 20-20-20 technique between intense drills to prevent ciliary muscle strain and maintain high kinetic reaction rates.
              </p>
            </div>
          </div>
        </div>
        </Reveal>

        {/* Explore Related Categories Portal */}
        <Reveal className="mt-12 mb-8 border-t border-hairline pt-12">
          <h2 className="text-base font-bold text-ink-1 tracking-widest text-center font-mono uppercase mb-8">
            Explore Related Training Hubs
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">

            <Link
              href="/drills/fps"
              className="group p-5 bg-surface-1 rounded-xl border border-hairline backdrop-blur-xl hover:border-red-500/40 text-center transition-all duration-200 hover:-translate-y-1"
            >
              <div className="text-2xl mb-2 text-red-500">🎮</div>
              <h3 className="font-bold text-sm text-ink-1 group-hover:text-red-400 transition font-mono uppercase">
                FPS Training
              </h3>
              <p className="text-2xs text-ink-3 mt-1 font-mono uppercase">
                Sens calibration &amp; flicks
              </p>
            </Link>

            <Link
              href="/drills/motor"
              className="group p-5 bg-surface-1 rounded-xl border border-hairline backdrop-blur-xl hover:border-emerald-500/40 text-center transition-all duration-200 hover:-translate-y-1"
            >
              <div className="text-2xl mb-2 text-emerald-500">✋</div>
              <h3 className="font-bold text-sm text-ink-1 group-hover:text-emerald-400 transition font-mono uppercase">
                Motor Skills
              </h3>
              <p className="text-2xs text-ink-3 mt-1 font-mono uppercase">
                Accuracy &amp; click reflexes
              </p>
            </Link>

            <Link
              href="/drills/cognitive"
              className="group p-5 bg-surface-1 rounded-xl border border-hairline backdrop-blur-xl hover:border-violet-500/40 text-center transition-all duration-200 hover:-translate-y-1"
            >
              <div className="text-2xl mb-2 text-violet-500">🧠</div>
              <h3 className="font-bold text-sm text-ink-1 group-hover:text-violet-400 transition font-mono uppercase">
                Cognitive Hub
              </h3>
              <p className="text-2xs text-ink-3 mt-1 font-mono uppercase">
                Decision & priority speed
              </p>
            </Link>

            <Link
              href="/drills/memory"
              className="group p-5 bg-surface-1 rounded-xl border border-hairline backdrop-blur-xl hover:border-indigo-500/40 text-center transition-all duration-200 hover:-translate-y-1"
            >
              <div className="text-2xl mb-2 text-indigo-500">💾</div>
              <h3 className="font-bold text-sm text-ink-1 group-hover:text-indigo-400 transition font-mono uppercase">
                Memory Drills
              </h3>
              <p className="text-2xs text-ink-3 mt-1 font-mono uppercase">
                Spatial recall & sequences
              </p>
            </Link>

          </div>
        </Reveal>

        <StickyMobileCta href="/drills/visual/reaction-speed/light-reaction" label="Start Visual Drill" categoryName="Visual" />
        <SiteFooter />
      </div>
    </div>
  );
}