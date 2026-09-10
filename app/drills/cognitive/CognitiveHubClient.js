"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  Layers,
  Compass,
  Zap,
  Home,
  ChevronRight,
  Sparkles,
  Shuffle,
  Target,
  Eye,
  Activity
} from "lucide-react";
import { DRILLS } from "@/lib/drillsRegistry";
import { getDifficultyRank } from "@/lib/scoringEngine";
import { getDrillTagline, sortByInterest } from "@/lib/drillCatalog";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import DrillCarousel from "@/components/drill/DrillCarousel";
import StickyMobileCta from "@/components/StickyMobileCta";
import AdjacentHubs from "@/components/AdjacentHubs";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { hasLocalizedRoute } from "@/lib/i18n/locales";
import { getLocalizedDrill } from "@/lib/i18n/drillNames";
import { isIdleFrameSkippable } from "@/lib/performance";

const cogDrills = DRILLS.filter((d) => d.category === "cognitive");

const FOLDER_TO_STORAGE_KEY = {
  "concentration-stamina": "skilldrills_concentration_stamina_v3",
  "divided-attention": "skilldrills_divided_attention_v7",
  "multi-tasking": "skilldrills_multi_tasking_v7",
  "concentration-grid": "skilldrills_concentration_grid_v4",
  "distraction-fighter": "skilldrills_distraction_fighter_v9",
  "reaction-time": "skilldrills_reaction_time_v7",
  "symbol-matching": "skilldrills_symbol_matching_v7",
  "rsvp-reader": "skilldrills_rsvp_reader_v8",
};

const cognitiveCategories = [
  {
    name: "Focus & Inhibition",
    folderName: "focus",
    icon: Target,
    color: "purple",
    bgColor: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    textColor: "text-purple-400",
    description: "Train selective focus, suppress distractions, and master inhibitory control",
    drills: cogDrills
      .filter((d) => ["distraction-fighter", "concentration-grid"].includes(d.folderName))
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)),
  },
  {
    name: "Processing Speed",
    folderName: "processing-speed",
    icon: Zap,
    color: "purple",
    bgColor: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    textColor: "text-purple-400",
    description: "Accelerate visual identification, rapid recognition, and decision speed",
    drills: cogDrills
      .filter((d) => ["symbol-matching", "reaction-time", "rsvp-reader"].includes(d.folderName))
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)),
  },
  {
    name: "Attention & Task Switching",
    folderName: "attention",
    icon: Shuffle,
    color: "purple",
    bgColor: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    textColor: "text-purple-400",
    description: "Enhance divided attention, multi-tasking, and vigilance endurance",
    drills: cogDrills
      .filter((d) => ["divided-attention", "multi-tasking", "concentration-stamina"].includes(d.folderName))
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)),
  },
];

// Flat, interest-ordered list for the carousel picker
const orderedCognitiveDrills = sortByInterest(
  cognitiveCategories.flatMap((category) =>
    category.drills.map((drill) => ({ ...drill, icon: category.icon }))
  )
);

export default function CognitiveHubClient({ faqs = [] }) {
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
      cogDrills.forEach((d) => {
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

  // Neural particle background effect
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

    const particles = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2 + 1,
        color: i % 2 === 0 ? "rgba(168, 85, 247, " : "rgba(129, 140, 248, ",
      });
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "0.3)";
        ctx.fill();
      });
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "0.35)";
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 125) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.08 * (1 - dist / 125)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
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
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-purple-500/30 selection:text-purple-300 relative overflow-hidden">
      <canvas
        style={{ touchAction: "none" }}
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-25"
      />

      {/* Layered premium background: hub-tinted mesh blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-purple-600/[0.12] rounded-full blur-[150px]" />
        <div className="absolute top-[30%] -right-40 w-[480px] h-[480px] bg-indigo-500/[0.08] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-ink-3 uppercase tracking-wider">
            <li>
              <Link
                href={localizeHref("/")}
                className="flex items-center gap-1.5 hover:text-purple-400 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>{t("ui.nav.hq", "HQ")}</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-hairline-2" />
            </li>
            <li>
              <Link
                href={hasLocalizedRoute(locale, "/drills") ? localizeHref("/drills") : "/drills"}
                className="hover:text-purple-400 transition-colors"
              >
                {t("ui.nav.drills", "DRILLS")}
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-hairline-2" />
            </li>
            <li>
              <span className="text-purple-400 font-bold" aria-current="page">
                {t("header.cognitive", "COGNITIVE")}
              </span>
            </li>
          </ol>
        </nav>

        {/* Page heading — crisp white typography, no images */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-1">
            {t("hubs.cognitive.h1", "Cognitive Brain Training & Decision Speed")}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-2 leading-relaxed">
            {t(
              "hubs.cognitive.desc",
              "Cognitive training targets the mental control networks that direct attention, suppress distraction, and accelerate decision speed. These 8 drills challenge selective attention, visual search, Stroop inhibition, and rapid task switching in short, focused blocks. Free to play online with no install, no account, and all performance scores stored privately in your browser."
            )}
          </p>
        </div>

        {/* Drill picker: one drill at a time, arrows to move, 'View all' for grid with live autonomous animations */}
        <Reveal>
          <DrillCarousel
            headingId="cognitive-drills"
            heading={t("hubs.cognitive.drillsHeading", "Cognitive drills")}
            accent="purple"
            icon={Brain}
            showcase
            allLabel={t("ui.viewAll", "View all")}
            drills={orderedCognitiveDrills.map((drill) => {
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

        {/* Cognitive Training Domains - 3 Category Cards with Crawlable Links */}
        <Reveal className="mb-12">
          <div className="bg-surface-1 border border-hairline rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="w-5 h-5 text-purple-400" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                Cognitive Training Domains
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {cognitiveCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.folderName}
                    className="bg-surface-2/80 border border-hairline rounded-2xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-ink-1">
                            {cat.name}
                          </h3>
                          <span className="text-[10px] font-mono text-purple-400">
                            {cat.drills.length} {cat.drills.length === 1 ? "Drill" : "Drills"}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-ink-2 leading-relaxed mb-4">
                        {cat.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-hairline">
                      {cat.drills.map((drill) => {
                        const href = hasLocalizedRoute(locale, drill.href)
                          ? localizeHref(drill.href)
                          : drill.href;
                        const fallbackTagline = getDrillTagline(drill.href, drill.description);
                        const localized = getLocalizedDrill(drill.href, locale, drill.name, fallbackTagline);
                        return (
                          <Link
                            key={drill.href}
                            href={href}
                            className="group/item flex items-center justify-between p-2 rounded-xl bg-surface-1/60 hover:bg-purple-500/10 border border-hairline hover:border-purple-500/30 transition-all text-xs"
                          >
                            <span className="font-medium text-ink-1 group-hover/item:text-purple-300 transition-colors truncate pr-2">
                              {localized.name}
                            </span>
                            <span className="text-[10px] font-mono text-ink-3 group-hover/item:text-purple-400 shrink-0 flex items-center gap-1">
                              {drill.duration}
                              <ChevronRight className="w-3 h-3 transition-transform group-hover/item:translate-x-0.5" />
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Benefits Grid */}
        <Reveal className="mb-12">
          <div className="bg-surface-1 border border-hairline rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                Cognitive Capacity Improvement Vectors
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: Eye,
                  title: "Selective Attention",
                  desc: "Augment signal-vs-noise filtering and target lock retention.",
                },
                {
                  icon: Zap,
                  title: "Processing Speed",
                  desc: "Accelerate visual identification and reflex reaction latencies.",
                },
                {
                  icon: Shuffle,
                  title: "Task Flexibility",
                  desc: "Minimize cognitive friction during high-speed rule and context switches.",
                },
                {
                  icon: Target,
                  title: "Inhibitory Control",
                  desc: "Suppress impulsive misclicks and sustain precision under heavy distraction.",
                },
              ].map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <div key={i} className="bg-surface-2 border border-hairline rounded-xl p-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-purple-400 mb-1 uppercase text-xs tracking-wider font-mono">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-ink-2 leading-relaxed">{benefit.desc}</p>
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
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                  {t("home.faqTitle", "Frequently Asked Questions")}
                </h2>
              </div>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqs.map((f, i) => (
                  <div key={i} className="bg-surface-2/80 border border-hairline rounded-2xl p-5 flex flex-col justify-start">
                    <dt className="font-bold text-ink-1 text-sm font-sans flex items-start gap-2.5">
                      <span className="text-purple-400 font-mono text-xs font-bold shrink-0 mt-0.5">
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
        <AdjacentHubs currentCat="cognitive" />

        {/* Back Link */}
        <div className="mt-12 border-t border-hairline pt-6">
          <Link
            href={hasLocalizedRoute(locale, "/drills") ? localizeHref("/drills") : "/drills"}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-ink-3 hover:text-ink-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("ui.returnToAllSectors", "Return to All Sectors")}
          </Link>
        </div>
      </div>

      <StickyMobileCta
        href={
          hasLocalizedRoute(locale, "/drills/cognitive/focus/distraction-fighter")
            ? localizeHref("/drills/cognitive/focus/distraction-fighter")
            : "/drills/cognitive/focus/distraction-fighter"
        }
        label={t("hubs.cognitive.startCta", "Start Cognitive Drill")}
        categoryName={t("header.cognitive", "Cognitive")}
      />
      <SiteFooter />
    </div>
  );
}
