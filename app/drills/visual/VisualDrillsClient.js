'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  Play,
  Eye,
  Activity,
  Home,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { getDifficultyRank } from '@/lib/scoringEngine';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';

import StickyMobileCta from '@/components/StickyMobileCta';
import ResetDrillButton from '@/components/drill/ResetDrillButton';

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
const NO_ADAPTIVE_DIFFICULTY = new Set([
  'visual-search', 'rhythm-anomaly', 'entropic-grid', 'distance-judgment',
  'light-reaction', 'no-go', 'pursuit-tracker', 'multiple-targets', 'moving-target',
]);

function handleCardMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export default function VisualDrillsClient() {
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

  const categories = ['Reaction Speed', 'Tracking Accuracy', 'Visual Recognition', 'Depth Perception'];

  const getDifficultyStyles = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Advanced': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Expert': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getCategoryStyles = (category) => {
    switch(category) {
      case 'Reaction Speed': return {
        glow: 'shadow-[0_0_15px_rgba(232,121,249,0.15)] border-fuchsia-500/30',
        gradient: 'from-fuchsia-500 to-pink-600',
        text: 'text-fuchsia-400',
        bg: 'bg-fuchsia-500/10',
        badge: 'bg-fuchsia-500/20 text-fuchsia-300'
      };
      case 'Tracking Accuracy': return {
        glow: 'shadow-[0_0_15px_rgba(244,114,182,0.15)] border-pink-500/30',
        gradient: 'from-pink-500 to-rose-600',
        text: 'text-pink-400',
        bg: 'bg-pink-500/10',
        badge: 'bg-pink-500/20 text-pink-300'
      };
      case 'Peripheral Vision': return {
        glow: 'shadow-[0_0_15px_rgba(217,70,239,0.15)] border-fuchsia-500/30',
        gradient: 'from-fuchsia-500 to-purple-600',
        text: 'text-fuchsia-400',
        bg: 'bg-fuchsia-500/10',
        badge: 'bg-fuchsia-500/20 text-fuchsia-300'
      };
      case 'Visual Recognition': return {
        glow: 'shadow-[0_0_15px_rgba(236,72,153,0.15)] border-pink-500/30',
        gradient: 'from-pink-500 to-rose-600',
        text: 'text-pink-400',
        bg: 'bg-pink-500/10',
        badge: 'bg-pink-500/20 text-pink-300'
      };
      case 'Depth Perception': return {
        glow: 'shadow-[0_0_15px_rgba(244,114,182,0.15)] border-pink-500/30',
        gradient: 'from-pink-500 to-fuchsia-600',
        text: 'text-pink-400',
        bg: 'bg-pink-500/10',
        badge: 'bg-pink-500/20 text-pink-300'
      };
      default: return {
        glow: 'shadow-[0_0_15px_rgba(232,121,249,0.15)] border-fuchsia-500/30',
        gradient: 'from-fuchsia-500 to-pink-600',
        text: 'text-fuchsia-400',
        bg: 'bg-fuchsia-500/10',
        badge: 'bg-fuchsia-500/20 text-fuchsia-300'
      };
    }
  };

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

        {/* Hero Section with compact inline chip next to H1 */}
        <Reveal>
          <div className="relative mb-8 p-6 sm:p-8 rounded-3xl bg-surface-1 border border-hairline shadow-2xl backdrop-blur-xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-70" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex items-start gap-4">
              <div className="relative p-3.5 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-2xl shadow-lg shrink-0">
                <div className="absolute -inset-1.5 rounded-2xl bg-fuchsia-500/30 opacity-60 blur-md -z-10" />
                <Eye className="w-8 h-8 text-fuchsia-400 animate-pulse" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-1 tracking-tight uppercase">
                    Visual Training &amp; Recognition
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-2xs font-mono font-bold bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
                    {totalDrills} DRILLS ONLINE
                  </span>
                </div>
                <p className="text-ink-2 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
                  Calibrate foveal detection, saccadic recognition, and peripheral awareness.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Start Here Band */}
        <Reveal className="mb-10">
          <div className="p-5 rounded-2xl bg-surface-1 border border-hairline">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-fuchsia-400 mb-3">
              Recommended Start Routines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/drills/visual/reaction-speed/light-reaction"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-fuchsia-500/40 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-fuchsia-400 transition-colors">New to Visual Training</p>
                <p className="text-[10px] text-ink-3 mt-1">Light reaction reflex baseline test</p>
              </Link>
              <Link
                href="/drills/visual/depth-perception/distance-judgment"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-fuchsia-500/40 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-fuchsia-400 transition-colors">Depth Perception Warm-Up</p>
                <p className="text-[10px] text-ink-3 mt-1">Judge 3D approaching target distance</p>
              </Link>
              <Link
                href="/drills/visual/visual-recognition/visual-search"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-fuchsia-500/40 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-fuchsia-400 transition-colors">Conjunctive Search Challenge</p>
                <p className="text-[10px] text-ink-3 mt-1">Find target letters under time pressure</p>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Sectors Grid */}
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryDrills = drills.filter(d => d.subcategory === category.toLowerCase().replace(/\s+/g, '-')).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty));
            if (categoryDrills.length === 0) return null;
            
            const styles = getCategoryStyles(category);

            return (
              <Reveal key={category} className="relative">

                {/* Sector Header */}
                <div className="flex items-center justify-between mb-6 border-b border-hairline pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${styles.gradient}`} />
                    <h2 className="text-lg font-bold text-ink-1 tracking-wide font-mono uppercase">
                      {category}
                    </h2>
                    <span className="px-2 py-0.5 text-2xs font-mono rounded bg-surface-2 border border-hairline text-ink-3">
                      {categoryDrills.length} DRILL{categoryDrills.length > 1 ? 'S' : ''}
                    </span>
                  </div>

                  <span className={`text-2xs font-mono hidden sm:inline-block tracking-widest ${styles.text}`}>
                    SECTOR // {category.toUpperCase().replace(' ', '_')}
                  </span>
                </div>

                {/* Drills Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryDrills.map((drill) => {
                    const drillPath = drill.href;
                    const bestLevel = drillLevels[drill.folderName];
                    const resetOverride = FOLDER_TO_STORAGE_KEY[drill.folderName];
                    const storageKeys = resetOverride ? [resetOverride] : [
                      `skilldrills_visual_${drill.folderName.replace(/-/g, '_')}_v4`,
                      `skilldrills_visual_${drill.folderName.replace(/-/g, '_')}_v3`,
                      `skilldrills_${drill.folderName.replace(/-/g, '_')}`,
                    ];

                    return (
                      <Link
                        key={drill.id}
                        href={drillPath}
                        onMouseMove={handleCardMouseMove}
                        className={`group relative isolate bg-surface-1 border border-hairline rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-200 hover:border-fuchsia-500/40 hover:-translate-y-1.5 active:scale-[0.98] hover:shadow-2xl hover:shadow-fuchsia-500/10 ${styles.glow} focus:outline-none focus:ring-1 focus:ring-fuchsia-500/50`}
                        aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}
                      >
                        {/* Top accent hairline */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />

                        {/* Cursor-tracked spotlight */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(232,121,249,0.16), transparent 70%)' }}
                        />

                        {/* Tactical corner brackets (targeting-reticle feel) */}
                        <span aria-hidden="true" className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-fuchsia-500/0 group-hover:border-fuchsia-500/70 transition-colors duration-300 rounded-tl-sm" />
                        <span aria-hidden="true" className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-fuchsia-500/0 group-hover:border-fuchsia-500/70 transition-colors duration-300 rounded-tr-sm" />
                        <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-fuchsia-500/0 group-hover:border-fuchsia-500/70 transition-colors duration-300 rounded-bl-sm" />
                        <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-fuchsia-500/0 group-hover:border-fuchsia-500/70 transition-colors duration-300 rounded-br-sm" />

                        <div className="relative p-6">

                          {/* Card Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className={`relative p-2 rounded-lg ${styles.bg}`}>
                              <div className="absolute -inset-1.5 rounded-xl bg-fuchsia-500/30 opacity-0 group-hover:opacity-60 blur-md -z-10 transition-opacity" />
                              <Eye className={`w-5 h-5 ${styles.text}`} />
                            </div>
                            <div className="flex items-center gap-1.5">
                              {!NO_ADAPTIVE_DIFFICULTY.has(drill.folderName) && (
                                <ResetDrillButton
                                  storageKeys={storageKeys}
                                  drillName={drill.name}
                                  onReset={() => setDrillLevels((prev) => {
                                    const next = { ...prev };
                                    delete next[drill.folderName];
                                    return next;
                                  })}
                                />
                              )}
                              {bestLevel && (
                                <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 ${styles.text}`}>
                                  Lv. {bestLevel}
                                </span>
                              )}
                              <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full border ${getDifficultyStyles(drill.difficulty)}`}>
                                {drill.difficulty}
                              </span>
                            </div>
                          </div>

                          {/* Drill Meta details */}
                          <h3 className="text-base font-bold text-ink-1 group-hover:text-fuchsia-400 transition-colors mb-2">
                            {drill.name}
                          </h3>

                          <p className="text-xs text-ink-2 leading-relaxed min-h-[48px] mb-4">
                            {drill.description}
                          </p>

                          <div className="flex items-center gap-4 text-2xs text-ink-3 font-mono mb-4 border-b border-hairline pb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{drill.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Activity className="w-3.5 h-3.5" />
                              <span>Stamina Mode</span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex items-center justify-between">
                            <span className="text-2xs text-ink-3 font-mono tracking-wider uppercase">
                              Start Training
                            </span>
                            <div className={`flex items-center gap-1 ${styles.text} text-xs font-mono font-bold group-hover:gap-2 transition-all`}>
                              <span>EXEC_DRILL</span>
                              <Play className="w-3 h-3 fill-current" />
                            </div>
                          </div>

                        </div>
                      </Link>
                    );
                  })}
                </div>
              </Reveal>
            );
          })}
        </div>

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