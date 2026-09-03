"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Brain, Target, Home, ChevronRight, Sparkles } from "lucide-react";
import { DRILLS } from "@/lib/drillsRegistry";
import { getDifficultyRank } from "@/lib/scoringEngine";
import { getDrillTagline, sortByInterest } from "@/lib/drillCatalog";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import DrillCarousel from "@/components/drill/DrillCarousel";
import StickyMobileCta from "@/components/StickyMobileCta";
import { useTranslation } from '@/lib/i18n/useTranslation';

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
    icon: Brain,
    color: "indigo",
    bgColor: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    textColor: "text-indigo-400",
    description: "Enhance your ability to manipulate and process information mentally",
    drills: memDrills.filter(d => ['n-back'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
  },
  {
    name: "Spatial Memory",
    folderName: "spatial-memory",
    icon: Brain,
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

export default function MemoryClient() {
  const { t } = useTranslation();
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

  // Binary data grid background animation
  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const columns = Math.floor(canvas.width / 24);
    const dropPositions = Array(columns).fill(0);

    let lastTime = 0;
    const draw = (timestamp) => {
      if (!timestamp) timestamp = 0;
      const elapsed = timestamp - lastTime;
      if (elapsed > 45) {
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
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [isClient]);

  const totalDrills = memoryCategories.reduce((acc, cat) => acc + cat.drills.length, 0);

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

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Memory Training Drills - Free Brain Memory Exercises",
            url: "https://skilldrills.online/drills/memory",
            description: `${totalDrills} free memory training drills across Short-Term, Working, and Spatial Memory.`,
            isPartOf: {
              "@type": "WebSite",
              name: "SkillDrills",
              url: "https://skilldrills.online",
            },
            about: {
              "@type": "Thing",
              name: "Memory Training & Cognitive Enhancement",
            },
            numberOfItems: totalDrills,
            itemListElement: memoryCategories
              .flatMap((category) =>
                category.drills.map((drill) => ({
                  ...drill,
                  categoryFolder: category.folderName,
                }))
              )
              .map((drill, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "WebApplication",
                  name: drill.name,
                  url: `https://skilldrills.online/drills/memory/${drill.categoryFolder}/${drill.folderName}`,
                  description: drill.description,
                  applicationCategory: "EducationalApplication",
                  operatingSystem: "Web",
                },
              })),
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-ink-3 uppercase tracking-wider">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>HQ</span>
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 text-hairline-2" />
            <li>
              <Link
                href="/drills"
                className="hover:text-indigo-400 transition-colors"
              >
                Drills
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 text-hairline-2" />
            <li>
              <span className="text-indigo-400 font-bold" aria-current="page">
                Memory Hub
              </span>
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-1">
            {t('hubs.memory.h1', 'Memory Training & Recall')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-2 max-w-2xl leading-relaxed">
            {t('hubs.memory.desc', 'Train working memory recall buffers, digit recall span, and spatial pattern traces.')}
          </p>
        </div>

        {/* Drill picker: one drill at a time, arrows to move, "View all" for the grid */}
        <Reveal>
          <DrillCarousel
            headingId="memory-drills"
            heading="Memory drills"
            accent="indigo"
            icon={Brain}
            allLabel="View all"
            drills={orderedMemoryDrills.map((drill) => ({
              href: drill.href,
              name: drill.name,
              tagline: getDrillTagline(drill.href, drill.description),
              difficulty: drill.difficulty,
              duration: drill.duration,
              icon: drill.icon,
              badge: drillLevels[drill.folderName] ? `Lv. ${drillLevels[drill.folderName]}` : null,
            }))}
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
                  emoji: "💾",
                  title: "Working Buffer",
                  desc: "Augment sensory sequence mapping and pattern retention grids.",
                },
                {
                  emoji: "🎯",
                  title: "Spatial Tracing",
                  desc: "Sharpen layout memory recall and path tracking resolution.",
                },
                {
                  emoji: "🧬",
                  title: "Recall Streaks",
                  desc: "Build durable concept connections across non-adjacent recall points.",
                },
                {
                  emoji: "⚡",
                  title: "N-Back Endurance",
                  desc: "Maximize mental data processing rates under progressive cognitive loads.",
                },
              ].map((benefit, i) => (
                <div key={i} className="bg-surface-2 border border-hairline rounded-xl p-4">
                  <h4 className="font-bold text-indigo-400 mb-1 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
                    <span>{benefit.emoji}</span>
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-ink-2 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Explore Related Hubs (Fixed 4 unique links - Defect #6) */}
        <Reveal className="mt-12 mb-8 border-t border-hairline pt-12">
          <h2 className="text-base font-bold tracking-widest text-center text-ink-1 font-mono uppercase mb-8">
            Explore Adjacent Hubs
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/drills/cognitive" className="group bg-surface-1 backdrop-blur-xl border border-hairline rounded-xl p-5 hover:border-violet-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">🧠</div>
              <h3 className="font-bold text-ink-1 group-hover:text-violet-400 transition-colors uppercase text-xs font-mono">Cognitive Hub</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Focus &amp; decision speed</p>
            </Link>
            <Link href="/drills/visual-tracking" className="group bg-surface-1 backdrop-blur-xl border border-hairline rounded-xl p-5 hover:border-cyan-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">👁️</div>
              <h3 className="font-bold text-ink-1 group-hover:text-cyan-400 transition-colors uppercase text-xs font-mono">Visual Tracking</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Smooth pursuit labs</p>
            </Link>
            <Link href="/drills/reaction-speed" className="group bg-surface-1 backdrop-blur-xl border border-hairline rounded-xl p-5 hover:border-amber-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-bold text-ink-1 group-hover:text-amber-400 transition-colors uppercase text-xs font-mono">Reaction Speed</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Reflex latency tests</p>
            </Link>
            <Link href="/drills/fps" className="group bg-surface-1 backdrop-blur-xl border border-hairline rounded-xl p-5 hover:border-red-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-bold text-ink-1 group-hover:text-red-400 transition-colors uppercase text-xs font-mono">Tactical Aim</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Aim &amp; click accuracy</p>
            </Link>
          </div>
        </Reveal>
      </div>

      <StickyMobileCta href="/drills/memory/short-term-memory/digit-span" label="Start Memory Drill" categoryName="Memory" />
      <SiteFooter />
    </div>
  );
}