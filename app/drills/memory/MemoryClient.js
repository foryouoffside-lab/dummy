"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  Layers,
  Compass,
  Database,
  GitBranch,
  Zap,
  Home,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { DRILLS } from "@/lib/drillsRegistry";
import { getDifficultyRank } from "@/lib/scoringEngine";
import { getDrillTagline, sortByInterest } from "@/lib/drillCatalog";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import DrillCarousel from "@/components/drill/DrillCarousel";
import StickyMobileCta from "@/components/StickyMobileCta";
import AdjacentHubs from "@/components/AdjacentHubs";
import { useTranslation } from '@/lib/i18n/useTranslation';
import { hasLocalizedRoute } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';
import { isIdleFrameSkippable } from '@/lib/performance';

const memDrills = DRILLS.filter(d => d.category === 'memory');

// Every memory drill always restarts a new round at its base difficulty
// (level 1 / smallest grid) regardless of saved best level — the saved value
// is display-only, never read back to raise the starting difficulty. So
// there's nothing an adaptive-difficulty reset would meaningfully change.

const memoryCategories = [
  {
    name: "Short-Term Memory",
    folderName: "short-term-memory",
    icon: Brain,
    color: "indigo",
    bgColor: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    textColor: "text-indigo-400",
    description: "Improve your ability to hold information temporarily in conscious awareness",
    drills: memDrills.filter(d => ['digit-span', 'word-recall', 'color-sequence'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
  },
  {
    name: "Working Memory",
    folderName: "working-memory",
    icon: Layers,
    color: "indigo",
    bgColor: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    textColor: "text-indigo-400",
    description: "Enhance your ability to manipulate and process information mentally",
    drills: memDrills.filter(d => ['n-back'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
  },
  {
    name: "Spatial Memory",
    folderName: "spatial-memory",
    icon: Compass,
    color: "indigo",
    bgColor: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    textColor: "text-indigo-400",
    description: "Train your ability to remember positions, paths, and spatial layouts",
    drills: memDrills.filter(d => ['grid-memorization', 'path-tracing', 'object-location'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
  }
];

// Flat, interest-ordered list for the picker. The category grouping above still
// drives the JSON-LD item list and each drill's icon; it no longer splits the
// page into three separate walls of cards.
const orderedMemoryDrills = sortByInterest(
  memoryCategories.flatMap((category) =>
    category.drills.map((drill) => ({ ...drill, icon: category.icon }))
  )
);

export default function MemoryClient({ faqs = [] }) {
  const { locale, t, localizeHref } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [drillLevels, setDrillLevels] = useState({});
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    try {
      const levels = {};
      memDrills.forEach(d => {
        const keys = [
          `skilldrills_memory_${d.folderName.replace(/-/g, '_')}_v4`,
          `skilldrills_memory_${d.folderName.replace(/-/g, '_')}_v3`,
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

  // Binary data grid background animation with reduced motion & intersection awareness
  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const columns = Math.floor(canvas.width / 24);
    const dropPositions = Array(columns).fill(0);

    // If reduced-motion is requested, render a static poster frame and skip RAF
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ctx.fillStyle = "rgba(8, 13, 26, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(99, 102, 241, 0.08)";
      ctx.font = "12px monospace";
      for (let x = 0; x < columns; x++) {
        for (let y = 16; y < canvas.height; y += 32) {
          if (Math.random() > 0.4) {
            ctx.fillText(Math.random() > 0.5 ? "1" : "0", x * 24, y);
          }
        }
      }
      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    let lastTime = 0;
    const draw = (timestamp) => {
      if (!timestamp) timestamp = 0;
      if (!isVisible || isIdleFrameSkippable(false, timestamp, lastTime)) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;
      ctx.fillStyle = "rgba(8, 13, 26, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(99, 102, 241, 0.12)";
      ctx.font = "12px monospace";

      dropPositions.forEach((y, x) => {
        const text = Math.random() > 0.5 ? "1" : "0";
        const xCoord = x * 24;
        ctx.fillText(text, xCoord, y);

        if (y > canvas.height && Math.random() > 0.985) {
          dropPositions[x] = 0;
        } else {
          dropPositions[x] = y + 16;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [isClient]);

  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-indigo-500/30 selection:text-indigo-300 relative overflow-hidden">
      <canvas
        style={{ touchAction: "none" }}
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20"
      />

      {/* Layered premium background: hub-tinted mesh blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-indigo-600/[0.12] rounded-full blur-[150px]" />
        <div className="absolute top-[30%] -right-40 w-[480px] h-[480px] bg-purple-500/[0.08] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-ink-3 uppercase tracking-wider">
            <li>
              <Link
                href={localizeHref('/')}
                className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>{t('ui.nav.hq', 'HQ')}</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li>
              <Link
                href={hasLocalizedRoute(locale, '/drills') ? localizeHref('/drills') : '/drills'}
                className="hover:text-indigo-400 transition-colors"
              >
                {t('ui.nav.drills', 'DRILLS')}
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li>
              <span className="text-indigo-400 font-bold" aria-current="page">
                {t('header.memory', 'MEMORY')}
              </span>
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-1">
            {t('hubs.memory.h1', 'Memory Training & Recall')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-2 leading-relaxed">
            {t('hubs.memory.desc', 'Train working memory recall buffers, digit recall span, and spatial pattern traces.')}
          </p>
        </div>

        {/* Drill picker: one drill at a time, arrows to move, "View all" for the grid */}
        <Reveal>
          <DrillCarousel
            headingId="memory-drills"
            heading={t('hubs.memory.drillsHeading', 'Memory drills')}
            accent="indigo"
            icon={Brain}
            showcase
            allLabel={t('ui.viewAll', 'View all')}
            drills={orderedMemoryDrills.map((drill) => {
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

        {/* Benefits Grid */}
        <Reveal className="mb-12">
          <div className="bg-surface-1 border border-hairline rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl shadow-xl">
            <h3 className="text-lg font-bold uppercase tracking-wider text-ink-1 mb-6 flex items-center gap-2 font-mono">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              MEMORY STACK IMPROVEMENT VECTORS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: Database,
                  title: "Working Buffer",
                  desc: "Augment sensory sequence mapping and pattern retention grids.",
                },
                {
                  icon: Compass,
                  title: "Spatial Tracing",
                  desc: "Sharpen layout memory recall and path tracking resolution.",
                },
                {
                  icon: GitBranch,
                  title: "Recall Streaks",
                  desc: "Build durable concept connections across non-adjacent recall points.",
                },
                {
                  icon: Zap,
                  title: "N-Back Endurance",
                  desc: "Maximize mental data processing rates under progressive cognitive loads.",
                },
              ].map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <div key={i} className="bg-surface-2 border border-hairline rounded-xl p-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-indigo-400 mb-1 uppercase text-xs tracking-wider font-mono">
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-ink-2 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* FAQs Section (SEO / AEO / GEO) */}
        {faqs?.length > 0 && (
          <Reveal className="mb-14">
            <div className="rounded-3xl bg-surface-1/70 border border-hairline p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                  {t('home.faqTitle', 'Frequently Asked Questions')}
                </h2>
              </div>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqs.map((f, i) => (
                  <div key={i} className="bg-surface-2/80 border border-hairline rounded-2xl p-5 flex flex-col justify-start">
                    <dt className="font-bold text-ink-1 text-sm font-sans flex items-start gap-2.5">
                      <span className="text-indigo-400 font-mono text-xs font-bold shrink-0 mt-0.5">
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
        <AdjacentHubs currentCat="memory" />

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
      </div>

      <StickyMobileCta
        href={hasLocalizedRoute(locale, '/drills/memory/short-term-memory/digit-span') ? localizeHref('/drills/memory/short-term-memory/digit-span') : '/drills/memory/short-term-memory/digit-span'}
        label={t('hubs.memory.startCta', 'Start Memory Drill')}
        categoryName={t('header.memory', 'Memory')}
      />
      <SiteFooter />
    </div>
  );
}