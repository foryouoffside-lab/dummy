'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Zap, Dumbbell, 
  Activity, Hand, Heart,
  Home, ChevronRight, Sparkles
} from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { getDifficultyRank } from '@/lib/scoringEngine';
import { getDrillTagline, sortByInterest } from '@/lib/drillCatalog';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import DrillCarousel from '@/components/drill/DrillCarousel';
import StickyMobileCta from '@/components/StickyMobileCta';
import { isIdleFrameSkippable } from '@/lib/performance';
import { useTranslation } from '@/lib/i18n/useTranslation';

const physDrills = DRILLS.filter(d => d.category === 'physical');

const FOLDER_TO_STORAGE_KEY = {
  'dynamic-grid-evasion': 'skilldrills_physical_grid_evasion_v3',
  'peripheral-threat-sweeper': 'skilldrills_physical_peripheral_sweeper_v3',
  'reaction-chain': 'skilldrills_reaction_chain_v2',
};

// reaction-chain's saved best level is never read back to set a new
// session's starting difficulty (every round begins at the same base
// difficulty) — no adaptive difficulty, so a "reset progress" button has
// nothing meaningful to reset.

export default function PhysicalDrillsClient() {
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
      physDrills.forEach(d => {
        const override = FOLDER_TO_STORAGE_KEY[d.folderName];
        const keys = override ? [override] : [
          `skilldrills_physical_${d.folderName.replace(/-/g, '_')}_v3`,
          `skilldrills_physical_${d.folderName.replace(/-/g, '_')}_v2`,
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

  // Energy speed pulses background animation
  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let lastTime = performance.now();

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const streams = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      streams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.15 + 0.05
      });
    }

    const draw = (time) => {
      if (isIdleFrameSkippable(false, time, lastTime)) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTime = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      streams.forEach((s) => {
        ctx.strokeStyle = `rgba(251, 113, 133, ${s.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.length, s.y + s.length * 0.5);
        ctx.stroke();

        s.x += s.speed;
        s.y += s.speed * 0.5;

        if (s.x > canvas.width || s.y > canvas.height) {
          s.x = -s.length;
          s.y = Math.random() * canvas.height - s.length;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [isClient]);

  const categories = [
    { 
      name: 'Balance Training', 
      folderName: 'balance-training',
      icon: Activity,
      color: 'rose',
      bgColor: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
      textColor: 'text-rose-400',
      description: 'Improve stability, equilibrium, and motor control',
      drills: physDrills.filter(d => ['stability-challenge'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
    },
    { 
      name: 'Coordination', 
      folderName: 'coordination',
      icon: Hand,
      color: 'rose',
      bgColor: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
      textColor: 'text-rose-400',
      description: 'Improve bilateral coordination and motor patterning',
      drills: physDrills.filter(d => ['complex-pattern', 'cross-body-movement', 'dynamic-grid-evasion'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
    },
    { 
      name: 'Fitness', 
      folderName: 'fitness',
      icon: Heart,
      color: 'orange',
      bgColor: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
      textColor: 'text-orange-400',
      description: 'Build agility, speed, and precision movement skills',
      drills: physDrills.filter(d => ['agility-ladder', 'jump-sequence', 'speed-drill'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
    },
    { 
      name: 'Reflex Training', 
      folderName: 'reflex-training',
      icon: Zap,
      color: 'rose',
      bgColor: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
      textColor: 'text-rose-400',
      description: 'Enhance reaction speed, evasion, and impulse control',
      drills: physDrills.filter(d => ['drop-catch', 'quick-dodge', 'reaction-chain', 'peripheral-threat-sweeper'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
    }
  ];

  // Flat, interest-ordered list for the picker. The category grouping above
  // still drives the JSON-LD item list and each drill's icon; it no longer
  // splits the page into four separate walls of cards.
  const orderedPhysicalDrills = sortByInterest(
    categories.flatMap((category) =>
      category.drills.map((drill) => ({ ...drill, icon: category.icon }))
    )
  );

  const totalDrills = categories.reduce((acc, cat) => acc + cat.drills.length, 0);

  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-rose-500/30 selection:text-rose-300 relative overflow-hidden">
      
      <canvas style={{ touchAction: 'none' }} ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30" />

      {/* Layered premium background: hub-tinted mesh blobs + grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-rose-600/[0.12] rounded-full blur-[150px]" />
        <div className="absolute top-[30%] -right-40 w-[480px] h-[480px] bg-red-500/[0.08] rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 10%, black 40%, transparent 90%)',
          }}
        />
      </div>

      {/* SEO structured schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Physical Drills - Agility, Coordination & Balance Training",
            "url": "https://skilldrills.online/drills/physical",
            "description": `${totalDrills} free interactive physical reflex, balance, and coordination training drills. No login required.`,
            "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "Physical Motor Training" },
            "numberOfItems": totalDrills,
            "itemListElement": categories.flatMap(cat => 
              cat.drills.map(drill => ({
                ...drill,
                categoryFolder: cat.folderName
              }))
            ).map((drill, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "WebApplication",
                "name": drill.name,
                "url": `https://skilldrills.online/drills/physical/${drill.categoryFolder}/${drill.folderName}`,
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
          <ol className="flex items-center gap-2 text-xs font-mono text-ink-3 uppercase tracking-wider">
            <li>
              <Link href="/" className="flex items-center gap-1.5 hover:text-rose-400 transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>HQ</span>
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 text-hairline-2" />
            <li><Link href="/drills" className="hover:text-rose-400 transition-colors">Drills</Link></li>
            <ChevronRight className="w-3 h-3 text-hairline-2" />
            <li><span className="text-rose-400 font-bold" aria-current="page">Physical Sector</span></li>
          </ol>
        </nav>

        {/* Desktop Only Mobile Warning Banner */}
        <div className="lg:hidden mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
              Only Desktop Supported
            </span>
          </div>
          <p className="text-xs leading-relaxed text-rose-200/90 font-sans">
            This category uses precise mouse and keyboard input and isn't built for touch. You can still browse and read about the drills here, but for the real experience, switch to a laptop or desktop.
          </p>
        </div>

        {/* Header with compact inline chip next to H1 */}
        <Reveal>
          <div className="mb-8 bg-surface-1 border border-hairline rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500 to-red-600 opacity-70" />
            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 shrink-0">
                <Dumbbell className="w-8 h-8 text-rose-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-1 tracking-tight uppercase">{t('hubs.physical.h1', 'Reflex & Coordination Training')}</h1>
                <p className="text-ink-2 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
                  {t('hubs.physical.desc', 'Tune gross and fine motor coordination, reflex evasion speeds, directional compass responses, and balance stability.')}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Start Here Band */}
        <Reveal className="mb-10">
          <div className="p-5 rounded-2xl bg-surface-1 border border-hairline backdrop-blur-xl shadow-lg">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-3">
              Recommended Start Routines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/drills/physical/reflex-training/drop-catch"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-rose-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-rose-400 transition-colors">New to Physical Training</p>
                <p className="text-[10px] text-ink-3 mt-1">Single-stimulus drop catch baseline</p>
              </Link>
              <Link
                href="/drills/physical/coordination/cross-body-movement"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-rose-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-rose-400 transition-colors">Directional Dial Warm-up</p>
                <p className="text-[10px] text-ink-3 mt-1">WASD directional movement response</p>
              </Link>
              <Link
                href="/drills/physical/reflex-training/reaction-chain"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-rose-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-rose-400 transition-colors">Full Physical Circuit</p>
                <p className="text-[10px] text-ink-3 mt-1">Complete physical agility &amp; reflex circuit</p>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Drill picker: one drill at a time, arrows to move, "View all" for the grid */}
        <Reveal>
          <DrillCarousel
            headingId="physical-drills"
            heading="Reflex drills"
            accent="rose"
            icon={Dumbbell}
            allLabel="View all"
            drills={orderedPhysicalDrills.map((drill) => ({
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
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500 to-red-600 opacity-70" />
            <h3 className="text-lg font-bold uppercase tracking-wider text-ink-1 mb-6 flex items-center gap-2 font-mono">
              <Sparkles className="w-5 h-5 text-rose-400" />
              PHYSICAL PERFORMANCE VECTORS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { emoji: "🧎", title: "Balance Stability", desc: "Sharpen ciliary muscular equilibrium and static stability coefficients." },
                { emoji: "⚡", title: "Reflex Velocity", desc: "Compress reaction time delay in high-speed Dodge/Catch intervals." },
                { emoji: "🌀", title: "Motor Patterning", desc: "Construct durable motor tracing pathways across complex coordinate grids." },
                { emoji: "🏃", title: "Agility Cadence", desc: "Train bilateral coordination sequencing under high velocity metrics." }
              ].map((benefit, i) => (
                <div key={i} className="bg-surface-2 border border-hairline rounded-xl p-4">
                  <h4 className="font-bold text-rose-400 mb-1 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
                    <span>{benefit.emoji}</span>{benefit.title}
                  </h4>
                  <p className="text-xs text-ink-2 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Explore Related Sectors */}
        <Reveal className="mt-12 mb-8 border-t border-hairline pt-12">
          <h2 className="text-base font-bold tracking-widest text-center text-ink-1 font-mono uppercase mb-8">Explore Adjacent Hubs</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/drills/cognitive" className="group bg-surface-1 border border-hairline rounded-xl p-5 hover:border-violet-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">🧠</div>
              <h3 className="font-bold text-ink-1 group-hover:text-violet-400 transition-colors uppercase text-xs font-mono">Cognitive Sector</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Focus &amp; reaction speed</p>
            </Link>
            <Link href="/drills/visual" className="group bg-surface-1 border border-hairline rounded-xl p-5 hover:border-fuchsia-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">👁️</div>
              <h3 className="font-bold text-ink-1 group-hover:text-fuchsia-400 transition-colors uppercase text-xs font-mono">Visual Sector</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Saccades &amp; fov</p>
            </Link>
            <Link href="/drills/fps" className="group bg-surface-1 border border-hairline rounded-xl p-5 hover:border-red-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-bold text-ink-1 group-hover:text-red-400 transition-colors uppercase text-xs font-mono">Tactical Aim</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Flick &amp; Smooth Pursuit</p>
            </Link>
            <Link href="/drills/memory" className="group bg-surface-1 border border-hairline rounded-xl p-5 hover:border-indigo-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">💾</div>
              <h3 className="font-bold text-ink-1 group-hover:text-indigo-400 transition-colors uppercase text-xs font-mono">Memory Sector</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Sequence span tests</p>
            </Link>
          </div>
        </Reveal>
      </div>

      <StickyMobileCta href="/drills/physical/reflex-training/reaction-chain" label="Start Physical Drill" categoryName="Physical" />
      <SiteFooter />
    </div>
  );
}