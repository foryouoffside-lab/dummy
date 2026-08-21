"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Brain, Target, Star, Clock, Play, Eye, Zap, Home, ChevronRight, Cpu, Sparkles } from "lucide-react";
import { DRILLS } from "@/lib/drillsRegistry";
import { getDifficultyRank } from "@/lib/scoringEngine";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import StickyMobileCta from "@/components/StickyMobileCta";
import ResetDrillButton from "@/components/drill/ResetDrillButton";

const cogDrills = DRILLS.filter(d => d.category === 'cognitive');

const FOLDER_TO_STORAGE_KEY = {
  'concentration-stamina': 'skilldrills_concentration_stamina_v3',
  'divided-attention': 'skilldrills_divided_attention_v7',
  'multi-tasking': 'skilldrills_multi_tasking_v7',
  'concentration-grid': 'skilldrills_concentration_grid_v4',
  'distraction-fighter': 'skilldrills_distraction_fighter_v9',
  'reaction-time': 'skilldrills_reaction_time_v7',
  'symbol-matching': 'skilldrills_symbol_matching_v7',
  'rsvp-reader': 'skilldrills_rsvp_reader_v8',
};

const cognitiveCategories = [
  {
    name: "Attention Training",
    folderName: "attention",
    icon: Eye,
    color: "violet",
    bgColor: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    textColor: "text-violet-400",
    description: "Train divided, selective, and sustained attention with structured focus challenges.",
    drills: cogDrills.filter(d => ['divided-attention', 'multi-tasking', 'concentration-stamina'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
  },
  {
    name: "Focus & Concentration",
    folderName: "focus",
    icon: Target,
    color: "purple",
    bgColor: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    textColor: "text-purple-400",
    description: "Build deep work stamina, resist distractions, and stay lock-in ready.",
    drills: cogDrills.filter(d => ['concentration-grid', 'distraction-fighter'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
  },
  {
    name: "Processing Speed",
    folderName: "processing-speed",
    icon: Zap,
    color: "purple",
    bgColor: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    textColor: "text-purple-400",
    description: "Reaction time tests, cognitive flexibility, and symbol matching exercises.",
    drills: cogDrills.filter(d => ['reaction-time', 'symbol-matching', 'rsvp-reader'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
  },
];

function handleCardMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export default function CognitiveHubClient() {
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
      cogDrills.forEach(d => {
        const k = FOLDER_TO_STORAGE_KEY[d.folderName];
        if (!k) return;
        const raw = localStorage.getItem(k);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.bestLevel) {
              levels[d.folderName] = parsed.bestLevel;
            }
          } catch (e) {}
        }
      });
      setDrillLevels(levels);
    } catch (e) {}
  }, [isClient]);

  // Neural connection background animation with tab visibility pause
  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1
      });
    }

    const draw = () => {
      if (isTabVisible) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(168, 85, 247, 0.25)";
        ctx.strokeStyle = "rgba(168, 85, 247, 0.05)";

        particles.forEach((p, index) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isClient]);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Advanced': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Expert': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const totalDrills = cognitiveCategories.reduce((acc, cat) => acc + cat.drills.length, 0);

  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-violet-500/30 selection:text-violet-300 relative overflow-hidden">
      
      <canvas style={{ touchAction: 'none' }} ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />

      {/* Structured SEO Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Cognitive Brain Training - Free Drills",
            "url": "https://skilldrills.online/drills/cognitive",
            "description": `${totalDrills} cognitive training drills across Attention, Focus, and Processing Speed.`,
            "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "Cognitive Training" },
            "numberOfItems": totalDrills,
            "itemListElement": cognitiveCategories.flatMap(category =>
              category.drills.map(drill => ({
                ...drill,
                categoryFolder: category.folderName
              }))
            ).map((drill, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "WebApplication",
                "name": drill.name,
                "url": `https://skilldrills.online/drills/cognitive/${drill.categoryFolder}/${drill.folderName}`,
                "description": drill.description,
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Web"
              }
            }))
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-mono text-ink-3 uppercase tracking-wider">
            <li><Link href="/" className="flex items-center gap-1.5 hover:text-violet-400 transition-colors"><Home className="w-3.5 h-3.5" /><span>HQ</span></Link></li>
            <li className="text-hairline-2" aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
            <li><Link href="/drills" className="hover:text-violet-400 transition-colors">Drills</Link></li>
            <li className="text-hairline-2" aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
            <li><span className="text-violet-400 font-bold" aria-current="page">Cognitive Hub</span></li>
          </ol>
        </nav>

        {/* Header with compact inline chip next to H1 */}
        <Reveal>
          <div className="mb-8 bg-surface-1 border border-hairline rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 opacity-70" />
            <div className="flex items-start gap-4">
              <div className="relative p-3.5 bg-violet-500/10 border border-violet-500/30 rounded-2xl text-violet-400 shadow-inner shrink-0">
                <div className="absolute -inset-1.5 rounded-2xl bg-violet-500/30 opacity-60 blur-md -z-10" />
                <Brain className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-1 tracking-tight uppercase">Brain Training &amp; Decision Speed</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-2xs font-mono font-bold bg-violet-500/10 border border-violet-500/20 text-violet-400">
                    {totalDrills} DRILLS ONLINE
                  </span>
                </div>
                <p className="text-ink-2 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
                  Train reaction speeds, selective attention thresholds, and cognitive processing flexibility.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Start Here Band */}
        <Reveal className="mb-10">
          <div className="p-5 rounded-3xl bg-surface-1 border border-hairline backdrop-blur-xl shadow-xl">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-violet-400 mb-3">
              Recommended Start Routines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/drills/cognitive/focus/distraction-fighter"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-violet-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-violet-400 transition-colors">New to Cognitive Training</p>
                <p className="text-[10px] text-ink-3 mt-1">Stroop task interference &amp; focus check</p>
              </Link>
              <Link
                href="/drills/cognitive/focus/concentration-grid"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-violet-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-violet-400 transition-colors">Concentration Grid Warm-up</p>
                <p className="text-[10px] text-ink-3 mt-1">Sequential scanning &amp; visual search</p>
              </Link>
              <Link
                href="/drills/cognitive/processing-speed/reaction-time"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-violet-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-violet-400 transition-colors">Full Cognitive Circuit</p>
                <p className="text-[10px] text-ink-3 mt-1">Reflex & attention finisher</p>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Drills Grid by Category */}
        {cognitiveCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <Reveal key={category.name} className="mb-12 relative">
              <div className="flex items-center gap-2 mb-6 border-b border-hairline pb-3">
                <div className="w-1 h-6 rounded-full bg-violet-500" />
                <h2 className="text-lg font-bold uppercase tracking-wider text-ink-1 font-mono">{category.name}</h2>
                <span className="px-2 py-0.5 text-2xs font-mono rounded bg-surface-2 border border-hairline text-violet-400 font-bold">
                  {category.drills.length} DRILL{category.drills.length > 1 ? 'S' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.drills.map((drill, index) => {
                  const bestLevel = drillLevels[drill.folderName];
                  const storageKeys = [FOLDER_TO_STORAGE_KEY[drill.folderName]].filter(Boolean);
                  return (
                  <Link
                    key={index}
                    href={`/drills/cognitive/${category.folderName}/${drill.folderName}`}
                    onMouseMove={handleCardMouseMove}
                    className="group relative isolate overflow-hidden bg-surface-1 backdrop-blur-xl rounded-2xl border border-hairline hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500/50 shadow-xl hover:shadow-2xl hover:shadow-violet-500/10"
                  >
                    {/* Top accent hairline */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />

                    {/* Cursor-tracked spotlight */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(139,92,246,0.16), transparent 70%)' }}
                    />

                    {/* Tactical corner brackets (targeting-reticle feel) */}
                    <span aria-hidden="true" className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-violet-500/0 group-hover:border-violet-500/70 transition-colors duration-300 rounded-tl-sm" />
                    <span aria-hidden="true" className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-violet-500/0 group-hover:border-violet-500/70 transition-colors duration-300 rounded-tr-sm" />
                    <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-violet-500/0 group-hover:border-violet-500/70 transition-colors duration-300 rounded-bl-sm" />
                    <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-violet-500/0 group-hover:border-violet-500/70 transition-colors duration-300 rounded-br-sm" />

                    <div className="relative p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="relative p-2.5 rounded-lg border bg-violet-500/10 border-violet-500/20 text-violet-400 group-hover:scale-110 group-hover:border-violet-500/40 transition-transform">
                          <div className="absolute -inset-1.5 rounded-xl bg-violet-500/30 opacity-0 group-hover:opacity-60 blur-md -z-10 transition-opacity" />
                          <CategoryIcon className="w-5 h-5" />
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
                            <div className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide border border-violet-500/20 bg-violet-500/10 text-violet-400">
                              Lv. {bestLevel}
                            </div>
                          )}
                          <div className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide border uppercase ${getDifficultyColor(drill.difficulty)}`}>
                            {drill.difficulty}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-base font-bold text-ink-1 mb-2 group-hover:text-violet-400 transition-colors uppercase tracking-tight font-mono">
                        {drill.name}
                      </h3>
                      
                      <p className="text-xs text-ink-2 mb-4 leading-relaxed min-h-[48px]">
                        {drill.description}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-4 text-2xs font-mono text-ink-3 border-b border-hairline pb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-violet-400" />
                          <span>{drill.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Cpu className="w-3.5 h-3.5 text-violet-400" />
                          <span>Cognitive Loop</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xs font-bold text-ink-3 uppercase tracking-widest">{category.name}</span>
                        <div className="flex items-center gap-1 text-violet-400 group-hover:gap-2 transition-all font-bold text-xs uppercase tracking-widest font-mono">
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
              <Sparkles className="w-5 h-5 text-violet-400" />
              COGNITIVE CAPACITY METRICS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { emoji: "🧠", title: "Selective Attention", desc: "Augment signal-vs-noise filtering and target lock retention." },
                { emoji: "🎯", title: "Focus Inhibition", desc: "Suppress cognitive ambient noise to preserve high focus waveforms." },
                { emoji: "⚡", title: "Synapse Speed", desc: "Optimize dual-task response coefficients under split-load tests." },
                { emoji: "🧩", title: "Task Switching", desc: "Maximize rule-switching agility and recursive analysis vectors." }
              ].map((benefit, i) => (
                <div key={i} className="bg-surface-2 border border-hairline rounded-xl p-4">
                  <h4 className="font-bold text-violet-400 mb-1 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
                    <span>{benefit.emoji}</span>{benefit.title}
                  </h4>
                  <p className="text-xs text-ink-2 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Explore Related Hubs */}
        <Reveal className="mt-12 mb-8 border-t border-hairline pt-12">
          <h2 className="text-base font-bold tracking-widest text-center text-ink-1 font-mono uppercase mb-8">Explore Adjacent Hubs</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/drills/memory" className="group bg-surface-1 backdrop-blur-xl border border-hairline rounded-xl p-5 hover:border-indigo-500/40 transition-all duration-200 hover:-translate-y-0.5 text-center">
              <div className="text-2xl mb-2">💾</div>
              <h3 className="font-bold text-ink-1 group-hover:text-indigo-400 transition-colors uppercase text-xs font-mono">Memory Hub</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Working &amp; spatial recall</p>
            </Link>
            <Link href="/drills/reaction-speed" className="group bg-surface-1 backdrop-blur-xl border border-hairline rounded-xl p-5 hover:border-amber-500/40 transition-all duration-200 hover:-translate-y-0.5 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-bold text-ink-1 group-hover:text-amber-400 transition-colors uppercase text-xs font-mono">Reaction Speed</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Reflex latency tests</p>
            </Link>
            <Link href="/drills/visual-tracking" className="group bg-surface-1 backdrop-blur-xl border border-hairline rounded-xl p-5 hover:border-cyan-500/40 transition-all duration-200 hover:-translate-y-0.5 text-center">
              <div className="text-2xl mb-2">👁️</div>
              <h3 className="font-bold text-ink-1 group-hover:text-cyan-400 transition-colors uppercase text-xs font-mono">Visual Tracking</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Smooth pursuit labs</p>
            </Link>
            <Link href="/drills/motor" className="group bg-surface-1 backdrop-blur-xl border border-hairline rounded-xl p-5 hover:border-emerald-500/40 transition-all duration-200 hover:-translate-y-0.5 text-center">
              <div className="text-2xl mb-2">🖐️</div>
              <h3 className="font-bold text-ink-1 group-hover:text-emerald-400 transition-colors uppercase text-xs font-mono">Motor Control</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Aim &amp; click accuracy</p>
            </Link>
          </div>
        </Reveal>
      </div>

      <StickyMobileCta href="/drills/cognitive/focus/distraction-fighter" label="Start Cognitive Drill" categoryName="Cognitive" />
      <SiteFooter />
    </div>
  );
}