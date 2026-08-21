'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Zap,
  Home,
  ChevronRight,
  Play
} from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { getDifficultyRank } from '@/lib/scoringEngine';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import StickyMobileCta from '@/components/StickyMobileCta';
import ResetDrillButton from '@/components/drill/ResetDrillButton';

const FOLDER_TO_STORAGE_KEY: Record<string, string> = {
  'market-doors-pursuit': 'skilldrills_market_doors_v2',
  'fps-tracking-trainer': 'skilldrills_fps_tracking_v2',
};

function handleCardMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export default function ReactionSpeedDrillsClient() {
  const [isClient, setIsClient] = useState(false);
  const [drillLevels, setDrillLevels] = useState<Record<string, number>>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const reactiveDrills = DRILLS.filter(d => d.category === 'reaction-speed').sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty));

  useEffect(() => {
    if (!isClient) return;
    try {
      const levels: Record<string, number> = {};
      reactiveDrills.forEach(d => {
        const override = FOLDER_TO_STORAGE_KEY[d.folderName];
        const keys = override ? [override] : [
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

  const getDifficultyStyles = (difficulty: string) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Advanced': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Expert': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

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

        {/* Hero Section with compact inline chip next to H1 */}
        <Reveal>
          <div className="relative mb-8 p-6 sm:p-8 rounded-2xl bg-surface-1 border border-hairline shadow-2xl backdrop-blur-xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 to-yellow-500 opacity-70" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex items-start gap-4">
              <div className="relative p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl shadow-lg shrink-0">
                <div className="absolute -inset-2 rounded-2xl bg-amber-500/30 opacity-40 blur-lg -z-10" />
                <Zap className="w-8 h-8 text-amber-400 animate-pulse" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-1 tracking-tight uppercase">
                    Reaction Time Test &amp; Drills
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-2xs font-mono font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    {reactiveDrills.length} DRILLS ONLINE
                  </span>
                </div>
                <p className="text-ink-2 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
                  Test and accelerate simple &amp; choice stimulus response times, visual trigger reflexes, and latency stability.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Start Here Band */}
        <Reveal className="mb-10">
          <div className="p-5 rounded-2xl bg-surface-1 border border-hairline">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-3">
              Recommended Start Routines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link 
                href="/drills/reaction-speed/reaction-time-test"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-amber-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-amber-400 transition-colors">New to Reaction Speed</p>
                <p className="text-[10px] text-ink-3 mt-1">Single-stimulus latency baseline test</p>
              </Link>
              <Link 
                href="/drills/reaction-speed/reflex-training-drill"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-amber-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-amber-400 transition-colors">Divided Attention Warm-up</p>
                <p className="text-[10px] text-ink-3 mt-1">Multi-target simultaneous burst reflex</p>
              </Link>
              <Link 
                href="/drills/reaction-speed/saccadic-gallery"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-amber-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-amber-400 transition-colors">Full Reflex Circuit</p>
                <p className="text-[10px] text-ink-3 mt-1">Complete visual reaction circuit</p>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* REACTIVE DRILLS SECTION */}
        <Reveal>
          <div className="space-y-12">
            <div className="relative">
              <div className="flex items-center justify-between mb-6 border-b border-hairline pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-amber-500 to-orange-600" />
                  <Zap className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-bold text-ink-1 tracking-wide font-mono uppercase">
                    Reflex Speed Training Drills
                  </h2>
                  <span className="px-2 py-0.5 text-2xs font-mono rounded bg-surface-2 border border-hairline text-amber-400 font-bold">
                    {reactiveDrills.length} DRILLS
                  </span>
                </div>
                <span className="text-2xs font-mono hidden sm:inline-block tracking-widest text-amber-400 font-bold">
                  SECTOR // ACTIVE_REACTION
                </span>
              </div>

              {/* Reactive Drills Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {reactiveDrills.map((drill) => {
                  const drillPath = `/drills/reaction-speed/${drill.folderName}`;
                  const bestLevel = drillLevels[drill.folderName];
                  const resetOverride = FOLDER_TO_STORAGE_KEY[drill.folderName];
                  const storageKeys = resetOverride ? [resetOverride] : [
                    `skilldrills_${drill.folderName.replace(/-/g, '_')}_v2`,
                    `skilldrills_${drill.folderName.replace(/-/g, '_')}`,
                  ];

                  return (
                    <Link
                      key={drill.id}
                      href={drillPath}
                      onMouseMove={handleCardMouseMove}
                      className="group relative isolate overflow-hidden bg-surface-1 border border-hairline hover:border-amber-500/40 rounded-2xl backdrop-blur-xl transition-all duration-200 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                    >
                      {/* Top accent hairline */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 to-yellow-500 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />

                      {/* Cursor-tracked spotlight */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(245,158,11,0.16), transparent 70%)' }}
                      />

                      {/* Tactical corner brackets (targeting-reticle feel) */}
                      <span aria-hidden="true" className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-amber-500/0 group-hover:border-amber-500/70 transition-colors duration-300 rounded-tl-sm" />
                      <span aria-hidden="true" className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-amber-500/0 group-hover:border-amber-500/70 transition-colors duration-300 rounded-tr-sm" />
                      <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-amber-500/0 group-hover:border-amber-500/70 transition-colors duration-300 rounded-bl-sm" />
                      <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-amber-500/0 group-hover:border-amber-500/70 transition-colors duration-300 rounded-br-sm" />

                      <div className="relative p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="relative p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
                            <div className="absolute -inset-1.5 rounded-xl bg-amber-500/30 opacity-0 group-hover:opacity-60 blur-md -z-10 transition-opacity" />
                            <Zap className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-1.5">
                            <ResetDrillButton
                              storageKeys={storageKeys}
                              drillName={drill.name}
                              onReset={() => setDrillLevels((prev) => {
                                const next = { ...prev };
                                delete next[drill.folderName];
                                return next;
                              })}
                            />
                            {bestLevel && (
                              <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400">
                                Lv. {bestLevel}
                              </span>
                            )}
                            <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold rounded-full border uppercase tracking-wider ${getDifficultyStyles(drill.difficulty)}`}>
                              {drill.difficulty}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-base font-bold text-ink-1 group-hover:text-amber-400 transition-colors mb-2 uppercase tracking-wide">
                          {drill.name}
                        </h3>
                        
                        <p className="text-xs text-ink-2 leading-relaxed min-h-[48px] mb-6">
                          {drill.description}
                        </p>

                        <div className="flex items-center justify-between border-t border-hairline pt-4 text-2xs font-mono text-ink-3">
                          <span className="flex items-center gap-1.5 uppercase font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                            <Clock className="w-3.5 h-3.5" />
                            {drill.duration}
                          </span>
                          <span className="flex items-center gap-1 group-hover:text-amber-400 transition-colors uppercase font-bold">
                            LOAD ENGINE
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
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

        <StickyMobileCta href="/drills/reaction-speed/reaction-time-test" label="Start Reaction Test" categoryName="Reaction Speed" />
        <SiteFooter />
      </div>
    </div>
  );
}
