"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Play, Brain, Target, Star, Home, ChevronRight, Cpu, Sparkles } from "lucide-react";
import { DRILLS } from "@/lib/drillsRegistry";
import { getDifficultyRank } from "@/lib/scoringEngine";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import StickyMobileCta from "@/components/StickyMobileCta";
import ResetDrillButton from "@/components/drill/ResetDrillButton";

const memDrills = DRILLS.filter(d => d.category === 'memory');

// Every memory drill always restarts a new round at its base difficulty
// (level 1 / smallest grid) regardless of saved best level — the saved value
// is display-only, never read back to raise the starting difficulty. So
// there's nothing an adaptive-difficulty reset would meaningfully change.
const NO_ADAPTIVE_DIFFICULTY = new Set([
  'color-sequence', 'digit-span', 'word-recall',
  'grid-memorization', 'object-location', 'path-tracing', 'n-back',
]);

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

function handleCardMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export default function MemoryClient() {
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Hard":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "Expert":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

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

        {/* Header with compact inline chip next to H1 */}
        <Reveal>
          <div className="mb-8 bg-surface-1 border border-hairline rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 opacity-70" />
            <div className="flex items-start gap-4">
              <div className="relative p-3.5 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-indigo-400 shadow-inner shrink-0">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-40 blur-lg -z-10" />
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-1 tracking-tight uppercase">
                    Memory Training &amp; Recall
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-2xs font-mono font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    {totalDrills} DRILLS ONLINE
                  </span>
                </div>
                <p className="text-ink-2 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
                  Train working memory recall buffers, digit recall span, and spatial pattern traces.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Start Here Band */}
        <Reveal className="mb-10">
          <div className="p-5 rounded-3xl bg-surface-1 backdrop-blur-xl border border-hairline shadow-xl">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 mb-3">
              Recommended Start Routines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/drills/memory/short-term-memory/digit-span"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-indigo-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-indigo-400 transition-colors">New to Memory Training</p>
                <p className="text-[10px] text-ink-3 mt-1">Single-digit recall span check</p>
              </Link>
              <Link
                href="/drills/memory/working-memory/n-back"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-indigo-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-indigo-400 transition-colors">N-Back Working Memory</p>
                <p className="text-[10px] text-ink-3 mt-1">2-Back stimulus match test</p>
              </Link>
              <Link
                href="/drills/memory/spatial-memory/grid-memorization"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-indigo-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-indigo-400 transition-colors">Full Memory Circuit</p>
                <p className="text-[10px] text-ink-3 mt-1">Spatial grid pattern &amp; sequence routine</p>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Drills Grid by Category */}
        {memoryCategories.filter((category) => category.drills.length > 0).map((category) => {
          const categoryDrills = category.drills;

          return (
            <Reveal key={category.name} className="mb-12 relative">
              <div className="flex items-center gap-2 mb-6 border-b border-hairline pb-3">
                <div className="w-1 h-6 rounded-full bg-indigo-500" />
                <h2 className="text-lg font-bold uppercase tracking-wider text-ink-1 font-mono">{category.name}</h2>
                <span className="px-2 py-0.5 text-2xs font-mono rounded bg-surface-2 border border-hairline text-indigo-400 font-bold">
                  {categoryDrills.length} DRILL{categoryDrills.length > 1 ? "S" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDrills.map((drill, index) => {
                  const bestLevel = drillLevels[drill.folderName];
                  const storageKeys = [
                    `skilldrills_memory_${drill.folderName.replace(/-/g, '_')}_v4`,
                    `skilldrills_memory_${drill.folderName.replace(/-/g, '_')}_v3`,
                    `skilldrills_${drill.folderName.replace(/-/g, '_')}`,
                  ];
                  return (
                  <Link
                    key={index}
                    href={`/drills/memory/${category.folderName}/${drill.folderName}`}
                    onMouseMove={handleCardMouseMove}
                    className="group relative isolate overflow-hidden bg-surface-1 backdrop-blur-xl border border-hairline hover:border-indigo-500/40 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10"
                  >
                    {/* Top accent hairline */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />

                    {/* Cursor-tracked spotlight */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.16), transparent 70%)' }}
                    />

                    {/* Tactical corner brackets */}
                    <span aria-hidden="true" className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-indigo-500/0 group-hover:border-indigo-500/70 transition-colors duration-300 rounded-tl-sm" />
                    <span aria-hidden="true" className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-indigo-500/0 group-hover:border-indigo-500/70 transition-colors duration-300 rounded-tr-sm" />
                    <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-indigo-500/0 group-hover:border-indigo-500/70 transition-colors duration-300 rounded-bl-sm" />
                    <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-indigo-500/0 group-hover:border-indigo-500/70 transition-colors duration-300 rounded-br-sm" />

                    <div className="relative p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="relative p-2.5 rounded-lg border bg-indigo-500/10 border-indigo-500/20 text-indigo-400 group-hover:scale-110 group-hover:border-indigo-500/40 transition-transform">
                          <div className="absolute -inset-1.5 rounded-xl bg-indigo-500/30 opacity-0 group-hover:opacity-60 blur-md -z-10 transition-opacity" />
                          <Brain className="w-5 h-5" />
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
                            <div className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                              Lv. {bestLevel}
                            </div>
                          )}
                          <div
                            className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide border uppercase ${getDifficultyColor(
                              drill.difficulty
                            )}`}
                          >
                            {drill.difficulty}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-ink-1 mb-2 group-hover:text-indigo-400 transition-colors uppercase tracking-tight font-mono">
                        {drill.name}
                      </h3>

                      <p className="text-xs text-ink-2 mb-4 leading-relaxed min-h-[48px]">
                        {drill.description}
                      </p>

                      <div className="flex items-center gap-4 mb-4 text-2xs font-mono text-ink-3 border-b border-hairline pb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{drill.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Memory Bank</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xs font-bold text-ink-3 uppercase tracking-widest">
                          {category.name}
                        </span>
                        <div className="flex items-center gap-1 text-indigo-400 group-hover:gap-2 transition-all font-bold text-xs uppercase tracking-widest font-mono">
                          <span>EXEC_DRILL</span>
                          <Play className="w-3.5 h-3.5 fill-current" />
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