'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { 
  Clock, Play, Crosshair, Zap, Eye, 
  Gamepad2, Home, ChevronRight, Cpu, Sparkles
} from "lucide-react";
import { DRILLS } from '@/lib/drillsRegistry';
import { getDifficultyRank } from '@/lib/scoringEngine';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import StickyMobileCta from '@/components/StickyMobileCta';
import ResetDrillButton from '@/components/drill/ResetDrillButton';

// Mapping: drill folderName → actual localStorage STORAGE_KEY, for drills whose
// key doesn't match the generic `skilldrills_fps_${folderName}_v2` guess below.
const FOLDER_TO_STORAGE_KEY = {
  'flick-shot-training': 'skilldrills_fps_flick_shot_v2',
  '180-degree-awareness': 'skilldrills_fps_180_awareness_v2',
  'angle-hold-trainer': 'skilldrills_fps_angle_hold_v2',
  'anti-strafe-jitter-duel': 'skilldrills_fps_anti_strafe_jitter_v2',
  'anti-zigzag-movement-trainer': 'skilldrills_fps_anti_zigzag_v2',
};

// Mapping: drill folderName → drillId (for tier badge display)
const FOLDER_TO_DRILL_ID = {
  'flick-shot-training': 'pro-flick',
  'target-acquisition': 'target-acquisition',
  'strafe-tracking': 'strafe-tracking',
  'pro-smooth-pursuit': 'pro-smooth-pursuit',
  'vertical-air-track': 'vertical-air-track',
  'recoil-control': 'recoil-control',
  'target-switching-swarm': 'target-switching-swarm',
  'target-prioritization': 'target-prioritization',
  'flow-state': 'flow-state',
  '180-degree-awareness': '180-degree-awareness',
  'angle-hold-trainer': 'angle-hold-trainer',
  'instant-response': 'instant-response',
  'micro-correction-precision': 'micro-correction',
  'anti-strafe-jitter-duel': 'anti-strafe',
  'anti-zigzag-movement-trainer': 'anti-zigzag-movement-trainer',
};

const fpsDrills = DRILLS.filter(d => d.category === 'fps');

const fpsCategories = [
  {
    name: "Precision Clicking",
    folderName: "fps",
    icon: Crosshair,
    color: "red",
    bgColor: "bg-red-500/10 border-red-500/20 text-red-400",
    textColor: "text-red-400",
    description: "Master flick shots, precision clicking, and cognitive prioritization",
    drills: fpsDrills.filter(d => ['flick-shot-training', 'target-acquisition', 'micro-correction-precision', 'target-prioritization', 'target-switching-swarm'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
  },
  {
    name: "Tracking & Switching",
    folderName: "fps",
    icon: Eye,
    color: "red",
    bgColor: "bg-red-500/10 border-red-500/20 text-red-400",
    textColor: "text-red-400",
    description: "Smooth aim, reactive tracking, and multi-target flick-switching",
    drills: fpsDrills.filter(d => ['strafe-tracking', 'pro-smooth-pursuit', 'vertical-air-track', 'anti-strafe-jitter-duel', 'anti-zigzag-movement-trainer'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
  },
  {
    name: "Movement & Recoil",
    folderName: "fps",
    icon: Gamepad2,
    color: "orange",
    bgColor: "bg-orange-500/10 border-orange-500/20 text-orange-400",
    textColor: "text-orange-400",
    description: "Strafing-shooting synchronization, cover peeking, and spray patterns",
    drills: fpsDrills.filter(d => ['recoil-control', 'angle-hold-trainer'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
  },
  {
    name: "Reflex & Awareness",
    folderName: "fps",
    icon: Zap,
    color: "red",
    bgColor: "bg-red-500/10 border-red-500/20 text-red-400",
    textColor: "text-red-400",
    description: "Instant reflex response, extreme-speed prediction, and peripheral vision",
    drills: fpsDrills.filter(d => ['instant-response', '180-degree-awareness', 'flow-state'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
  }
];

function handleCardMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export default function FPSHubClient() {
  const [isClient, setIsClient] = useState(false);
  const [drillLevels, setDrillLevels] = useState({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    try {
      const levels = {};
      fpsDrills.forEach(d => {
        const override = FOLDER_TO_STORAGE_KEY[d.folderName];
        const keys = override ? [override] : [
          `skilldrills_fps_${d.folderName.replace(/-/g, '_')}_v2`,
          `skilldrills_fps_${d.folderName.replace(/-/g, '_')}_v1`,
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


  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Advanced': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Expert': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const totalDrills = fpsCategories.reduce((acc, cat) => acc + cat.drills.length, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "FPS Aim Training Drills",
    "url": "https://skilldrills.online/drills/fps",
    "description": `${totalDrills} free FPS aim training drills for Valorant, CS2, Apex Legends, Overwatch 2 and all FPS games.`,
    "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
    "about": { "@type": "Thing", "name": "FPS Gaming Aim Training" },
    "numberOfItems": totalDrills,
    "itemListElement": fpsCategories.flatMap(cat => cat.drills).map((drill, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "WebApplication",
        "name": drill.name,
        "url": `https://skilldrills.online${drill.href}`,
        "description": drill.description,
        "applicationCategory": "GameApplication",
        "operatingSystem": "Web"
      }
    }))
  };


  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-red-500/30 selection:text-red-300 relative overflow-hidden">

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />

      {/* Layered premium background: hub-tinted mesh blobs + grid + grain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-red-600/[0.12] rounded-full blur-[150px]" />
        <div className="absolute top-[30%] -right-40 w-[480px] h-[480px] bg-orange-500/[0.08] rounded-full blur-[140px]" />
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-ink-3 uppercase tracking-wider">
            <li><Link href="/" className="flex items-center gap-1.5 hover:text-red-400 transition-colors"><Home className="w-3.5 h-3.5" /><span>HQ</span></Link></li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li><Link href="/drills" className="hover:text-red-400 transition-colors">Drills</Link></li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li><span className="text-red-400 font-bold" aria-current="page">FPS Sector</span></li>
          </ol>
        </nav>

        {/* Desktop Only Mobile Warning Banner */}
        <div className="lg:hidden mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
              Only Desktop Supported
            </span>
          </div>
          <p className="text-xs leading-relaxed text-red-200/90 font-sans">
            This category uses precise mouse and keyboard input and isn't built for touch. You can still browse and read about the drills here, but for the real experience, switch to a laptop or desktop.
          </p>
        </div>

        {/* Header with compact inline chip next to H1 */}
        <Reveal>
          <div className="mb-8 bg-surface-1/80 border border-hairline rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500 opacity-70" />
            <div className="flex items-start gap-4">
              <div className="relative p-3.5 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl text-white shadow-lg shrink-0">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 opacity-40 blur-lg -z-10" />
                <Gamepad2 className="w-8 h-8" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-1 tracking-tight uppercase">Free FPS Aim Trainer</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-2xs font-mono font-bold bg-red-500/10 border border-red-500/20 text-red-400">
                    {totalDrills} DRILLS ONLINE
                  </span>
                </div>
                <p className="text-ink-2 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
                  Hone mouse raw-input reflexes, smooth target tracking, and extreme 180° awareness indicators.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Start Here Band */}
        <Reveal className="mb-10">
          <div className="p-5 rounded-2xl bg-surface-1/80 backdrop-blur-xl border border-hairline shadow-lg">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 mb-3">
              Recommended Start Routines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/drills/fps/flick-shot-training"
                className="p-3.5 rounded-xl bg-surface-2/80 border border-hairline hover:border-red-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-red-400 transition-colors">New to FPS Aim Training</p>
                <p className="text-[10px] text-ink-3 mt-1">Single-target flick precision baseline</p>
              </Link>
              <Link
                href="/drills/fps/strafe-tracking"
                className="p-3.5 rounded-xl bg-surface-2/80 border border-hairline hover:border-red-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-red-400 transition-colors">Tracking &amp; Smooth Aim</p>
                <p className="text-[10px] text-ink-3 mt-1">Continuous target tracking routine</p>
              </Link>
              <Link
                href="/drills/fps/target-switching-swarm"
                className="p-3.5 rounded-xl bg-surface-2/80 border border-hairline hover:border-red-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-red-400 transition-colors">Full FPS Aim Circuit</p>
                <p className="text-[10px] text-ink-3 mt-1">Complete target switching &amp; recoil circuit</p>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Drills Grid by Category */}
        {fpsCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <Reveal key={category.name} className="mb-12 relative">
              <div className="flex items-center gap-2 mb-6 border-b border-hairline pb-3">
                <div className="w-1 h-6 rounded-full bg-red-500" />
                <h2 className="text-lg font-bold uppercase tracking-wider text-ink-1 font-mono">{category.name}</h2>
                <span className="px-2 py-0.5 text-2xs font-mono rounded bg-surface-2 border border-hairline text-red-400 font-bold">
                  {category.drills.length} DRILL{category.drills.length > 1 ? 'S' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.drills.map((drill, index) => {
                  const drillPath = drill.href;
                  const bestLevel = drillLevels[drill.folderName];
                  const resetOverride = FOLDER_TO_STORAGE_KEY[drill.folderName];
                  const storageKeys = resetOverride ? [resetOverride] : [
                    `skilldrills_fps_${drill.folderName.replace(/-/g, '_')}_v2`,
                    `skilldrills_fps_${drill.folderName.replace(/-/g, '_')}_v1`,
                    `skilldrills_${drill.folderName.replace(/-/g, '_')}`,
                  ];
                  return (
                    <Link
                      key={index}
                      href={drillPath}
                      onMouseMove={handleCardMouseMove}
                      className="group relative isolate overflow-hidden bg-surface-1/80 backdrop-blur-xl border border-hairline hover:border-red-500/40 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-1 focus:ring-red-500/50 shadow-xl hover:shadow-2xl hover:shadow-red-500/10"
                    >
                      {/* Top accent hairline */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />

                      {/* Cursor-tracked spotlight */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(239,68,68,0.16), transparent 70%)' }}
                      />

                      {/* Tactical corner brackets (targeting-reticle feel) */}
                      <span aria-hidden="true" className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-red-500/0 group-hover:border-red-500/70 transition-colors duration-300 rounded-tl-sm" />
                      <span aria-hidden="true" className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-red-500/0 group-hover:border-red-500/70 transition-colors duration-300 rounded-tr-sm" />
                      <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-red-500/0 group-hover:border-red-500/70 transition-colors duration-300 rounded-bl-sm" />
                      <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-red-500/0 group-hover:border-red-500/70 transition-colors duration-300 rounded-br-sm" />

                      <div className="relative p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="relative p-2.5 rounded-xl border bg-red-500/10 border-red-500/20 text-red-400 group-hover:scale-110 group-hover:border-red-500/40 transition-transform">
                            <div className="absolute -inset-1.5 rounded-xl bg-red-500/30 opacity-0 group-hover:opacity-60 blur-md -z-10 transition-opacity" />
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
                              <div className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide border border-blue-500/20 bg-blue-500/10 text-blue-400">
                                Lv. {bestLevel}
                              </div>
                            )}
                            <div className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide border uppercase ${getDifficultyColor(drill.difficulty)}`}>
                              {drill.difficulty}
                            </div>
                          </div>
                        </div>

                        <h3 className="text-base font-bold text-ink-1 mb-2 group-hover:text-red-400 transition-colors uppercase tracking-tight font-mono">
                          {drill.name}
                        </h3>

                        <p className="text-xs text-ink-2 mb-4 leading-relaxed min-h-[48px]">
                          {drill.description}
                        </p>

                        <div className="flex items-center gap-4 mb-4 text-2xs font-mono text-ink-3 border-b border-hairline pb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-red-400" />
                            <span>{drill.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Cpu className="w-3.5 h-3.5 text-red-400" />
                            <span>Aim Engine</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-2xs font-bold text-ink-3 uppercase tracking-widest">{category.name}</span>
                          <div className="flex items-center gap-1 text-red-400 group-hover:gap-2 transition-all font-bold text-xs uppercase tracking-widest font-mono">
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

        {/* Training Guide Section */}
        <Reveal className="mb-12">
          <div className="bg-surface-1/80 border border-hairline rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl shadow-xl">
            <h3 className="text-lg font-bold uppercase tracking-wider text-ink-1 mb-6 flex items-center gap-2 font-mono">
              <Sparkles className="w-5 h-5 text-red-400" />
              RECOMMENDED TRAINING PROTOCOLS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-2 border border-hairline rounded-xl p-4">
                <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
                  <span>🌅</span> Phase 01: Warm-Up
                </h4>
                <ul className="text-2xs font-mono text-ink-2 space-y-1.5">
                  <li className="flex items-start gap-1"><span className="text-red-400">•</span> Single Target Track (2 runs)</li>
                  <li className="flex items-start gap-1"><span className="text-red-400">•</span> Instant Response (2 runs)</li>
                  <li className="flex items-start gap-1"><span className="text-red-400">•</span> Pro Smooth Pursuit (1 run)</li>
                </ul>
              </div>
              <div className="bg-surface-2 border border-hairline rounded-xl p-4">
                <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
                  <span>🎯</span> Phase 02: Core Load
                </h4>
                <ul className="text-2xs font-mono text-ink-2 space-y-1.5">
                  <li className="flex items-start gap-1"><span className="text-red-400">•</span> Flick Shot Training (3 runs)</li>
                  <li className="flex items-start gap-1"><span className="text-red-400">•</span> Reactive Tracking (3 runs)</li>
                  <li className="flex items-start gap-1"><span className="text-red-400">•</span> Peripheral Awareness (2 runs)</li>
                </ul>
              </div>
              <div className="bg-surface-2 border border-hairline rounded-xl p-4">
                <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
                  <span>⚡</span> Phase 03: Overload
                </h4>
                <ul className="text-2xs font-mono text-ink-2 space-y-1.5">
                  <li className="flex items-start gap-1"><span className="text-red-400">•</span> 360Hz Pro Tracking (2 runs)</li>
                  <li className="flex items-start gap-1"><span className="text-red-400">•</span> Predictive Tracking (2 runs)</li>
                  <li className="flex items-start gap-1"><span className="text-red-400">•</span> Target Swarm (2 runs)</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Explore Related Hubs */}
        <Reveal className="mt-12 mb-8 border-t border-hairline pt-12">
          <h2 className="text-base font-bold tracking-widest text-center text-ink-1 font-mono uppercase mb-8">Explore Adjacent Hubs</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/drills/cognitive" className="group bg-surface-1 border border-hairline rounded-xl p-5 hover:border-violet-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">🧠</div>
              <h3 className="font-bold text-ink-1 group-hover:text-violet-400 transition-colors uppercase text-xs font-mono">Cognitive Hub</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Focus &amp; decision speed</p>
            </Link>
            <Link href="/drills/visual" className="group bg-surface-1 border border-hairline rounded-xl p-5 hover:border-fuchsia-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">👁️</div>
              <h3 className="font-bold text-ink-1 group-hover:text-fuchsia-400 transition-colors uppercase text-xs font-mono">Visual Hub</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Saccades &amp; fov</p>
            </Link>
            <Link href="/drills/motor" className="group bg-surface-1 border border-hairline rounded-xl p-5 hover:border-emerald-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">🖐️</div>
              <h3 className="font-bold text-ink-1 group-hover:text-emerald-400 transition-colors uppercase text-xs font-mono">Motor Control</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Hand-eye coordination</p>
            </Link>
            <Link href="/drills/memory" className="group bg-surface-1 border border-hairline rounded-xl p-5 hover:border-indigo-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">💾</div>
              <h3 className="font-bold text-ink-1 group-hover:text-indigo-400 transition-colors uppercase text-xs font-mono">Memory Hub</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Working &amp; sequence recall</p>
            </Link>
          </div>
        </Reveal>
      </div>

      <StickyMobileCta href="/drills/fps/flick-shot-training" label="Start FPS Drill" categoryName="FPS" />
      <SiteFooter />
    </div>
  );
}