'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Zap,
  Dumbbell,
  Activity,
  Hand,
  Heart,
  Home,
  ChevronRight,
  Sparkles,
  Layers,
  Compass,
  Gauge
} from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { getDrillTagline, sortByInterest } from '@/lib/drillCatalog';
import { getDifficultyRank } from '@/lib/scoringEngine';
import { isIdleFrameSkippable } from '@/lib/performance';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import AdjacentHubs from '@/components/AdjacentHubs';
import DrillCarousel from '@/components/drill/DrillCarousel';
import StickyMobileCta from '@/components/StickyMobileCta';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';
import { hasLocalizedRoute } from '@/lib/i18n/locales';

const FOLDER_TO_STORAGE_KEY = {
  'dynamic-grid-evasion': 'skilldrills_physical_grid_evasion_v3',
  'peripheral-threat-sweeper': 'skilldrills_physical_peripheral_sweeper_v3',
  'reaction-chain': 'skilldrills_reaction_chain_v2',
};

// Tactical metadata & categorized discipline taxonomy for Physical / Agility skills
const PHYSICAL_METADATA = {
  'stability-challenge': {
    discipline: 'balance',
    disciplineName: 'Balance & Stability',
    focus: 'Wind-Force Equilibrium',
    skills: ['Centering', 'Force Resistance'],
    icon: Activity,
  },
  'complex-pattern': {
    discipline: 'coordination',
    disciplineName: 'Coordination & Pathing',
    focus: 'Memory Path Reconstruction',
    skills: ['Spatial Memory', 'Path Tracing'],
    icon: Compass,
  },
  'cross-body-movement': {
    discipline: 'coordination',
    disciplineName: 'Coordination & Pathing',
    focus: 'Cross-Screen Coordinate Intercept',
    skills: ['Vector Tracking', 'Bilateral Reach'],
    icon: Hand,
  },
  'dynamic-grid-evasion': {
    discipline: 'coordination',
    disciplineName: 'Coordination & Pathing',
    focus: '3x3 Rapid Directional Dodge',
    skills: ['WASD Footwork', 'Grid Evasion'],
    icon: Gauge,
  },
  'agility-ladder': {
    discipline: 'fitness',
    disciplineName: 'Agility & Fitness',
    focus: 'Scrolling Rung Cadence',
    skills: ['Alternating Cadence', 'Rhythm'],
    icon: Heart,
  },
  'jump-sequence': {
    discipline: 'fitness',
    disciplineName: 'Agility & Fitness',
    focus: 'Charge & Parabolic Steering',
    skills: ['Impulse Control', 'Aerial Vector'],
    icon: Dumbbell,
  },
  'speed-drill': {
    discipline: 'fitness',
    disciplineName: 'Agility & Fitness',
    focus: 'Vanishing Target Acceleration',
    skills: ['Burst Speed', 'Shrinking Rings'],
    icon: Zap,
  },
  'drop-catch': {
    discipline: 'reflex',
    disciplineName: 'Reflex & Evasion',
    focus: 'Falling Target Catch & Decoy Avoidance',
    skills: ['Stimulus Discrimination', 'Drop Timing'],
    icon: Zap,
  },
  'peripheral-threat-sweeper': {
    discipline: 'reflex',
    disciplineName: 'Reflex & Evasion',
    focus: 'Perimeter Radial Scan',
    skills: ['Peripheral Field', 'Threat Intercept'],
    icon: Activity,
  },
  'quick-dodge': {
    discipline: 'reflex',
    disciplineName: 'Reflex & Evasion',
    focus: 'Homing Threat Chaos Evasion',
    skills: ['Dynamic Evasion', 'Collision Avoidance'],
    icon: Gauge,
  },
  'reaction-chain': {
    discipline: 'reflex',
    disciplineName: 'Reflex & Evasion',
    focus: 'Deceleration & Impulse Arrest',
    skills: ['Target Snapping', 'Node Freeze'],
    icon: Zap,
  },
};

const physDrills = DRILLS.filter((d) => d.category === 'physical');

const physicalCategories = [
  {
    id: 'reflex',
    name: 'Reflex & Evasion',
    icon: Zap,
    description: 'Visual trigger reaction, stimulus discrimination, and dynamic threat evasion',
    drills: physDrills
      .filter((d) => PHYSICAL_METADATA[d.folderName]?.discipline === 'reflex')
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)),
  },
  {
    id: 'fitness',
    name: 'Agility & Fitness',
    icon: Dumbbell,
    description: 'Movement cadence, alternating footwork rhythm, and acceleration bursts',
    drills: physDrills
      .filter((d) => PHYSICAL_METADATA[d.folderName]?.discipline === 'fitness')
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)),
  },
  {
    id: 'coordination',
    name: 'Coordination & Pathing',
    icon: Hand,
    description: 'Cross-body bilateral reaching, spatial memory pathing, and grid evasion',
    drills: physDrills
      .filter((d) => PHYSICAL_METADATA[d.folderName]?.discipline === 'coordination')
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)),
  },
  {
    id: 'balance',
    name: 'Balance & Stability',
    icon: Activity,
    description: 'Continuous force equilibrium, center-of-mass corrections, and motor steadiness',
    drills: physDrills
      .filter((d) => PHYSICAL_METADATA[d.folderName]?.discipline === 'balance')
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)),
  },
];

// Flat, interest-ordered list for the carousel picker
const orderedPhysicalDrills = sortByInterest(
  physicalCategories.flatMap((category) =>
    category.drills.map((drill) => ({ ...drill, icon: category.icon }))
  )
);

export default function PhysicalDrillsClient({ faqs = [] }) {
  const { locale, localizeHref, t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [drillLevels, setDrillLevels] = useState({});
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Retrieve saved personal bests from localStorage
  useEffect(() => {
    if (!isClient) return;
    try {
      const levels = {};
      const allPhys = DRILLS.filter((d) => d.category === 'physical');
      allPhys.forEach((d) => {
        const override = FOLDER_TO_STORAGE_KEY[d.folderName];
        const keys = override
          ? [override]
          : [
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
            } catch {}
          }
        }
      });
      setDrillLevels(levels);
    } catch {}
  }, [isClient]);

  // Subtle speed streams background canvas
  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastTime = performance.now();

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const streams = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      streams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 2.5 + 1.5,
        opacity: Math.random() * 0.12 + 0.04,
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
      window.removeEventListener('resize', resize);
    };
  }, [isClient]);



  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-rose-500/30 selection:text-rose-200 relative overflow-hidden">
      {/* Kinetic velocity stream canvas */}
      <canvas
        style={{ touchAction: 'none' }}
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-25"
      />

      {/* Layered ambient lighting: Rose + Amber glow + subtle grid mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-rose-600/[0.10] rounded-full blur-[160px]" />
        <div className="absolute top-[25%] -right-40 w-[460px] h-[460px] bg-orange-500/[0.07] rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 85% 60% at 50% 15%, black 40%, transparent 90%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-mono text-ink-3 uppercase tracking-wider">
            <li>
              <Link
                href={localizeHref('/')}
                className="flex items-center gap-1.5 hover:text-rose-400 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>{t('ui.nav.hq', 'HQ')}</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li>
              <Link
                href={hasLocalizedRoute(locale, '/drills') ? localizeHref('/drills') : '/drills'}
                className="hover:text-rose-400 transition-colors"
              >
                {t('ui.nav.drills', 'DRILLS')}
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li>
              <span className="text-rose-400 font-bold" aria-current="page">
                {t('header.physical', 'PHYSICAL')}
              </span>
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-1">
            {t('hubs.physical.h1', 'Reflex & Coordination Training')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-2 leading-relaxed">
            {t(
              'hubs.physical.desc',
              'Reflex and coordination drills measure how fast you can react to something appearing, and how accurately you can steer, stop and sequence a movement once you have. Simple visual reaction costs about 200–250 ms before any of that starts (Woods et al., 2015), and vision needs roughly 100–150 ms more to correct a movement already under way (Woodworth, 1899) — which is why the faster drills reward prediction over reaction. These run in a browser through a mouse or touchscreen, so they train the timing and the decision rather than physical fitness. Free, no sign-up, and every score stays in your browser.'
            )}
          </p>
        </div>

        {/* Drill Matrix - Swipeable Carousel */}
        <Reveal>
          <DrillCarousel
            headingId="physical-drills"
            heading={t('hubs.physical.drillsHeading', 'Agility & reflex drills')}
            accent="rose"
            icon={Activity}
            showcase
            allLabel={t('ui.viewAll', 'View all')}
            drills={orderedPhysicalDrills.map((drill) => {
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

        {/* Physical Training Domains - 4 Category Cards with Crawlable Links */}
        <Reveal className="mb-14">
          <div className="bg-surface-1 border border-hairline rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="w-5 h-5 text-rose-400" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                Physical Training Domains
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {physicalCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="bg-surface-2/80 border border-hairline rounded-2xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-ink-1">
                            {cat.name}
                          </h3>
                          <span className="text-[10px] font-mono text-rose-400">
                            {cat.drills.length} {cat.drills.length === 1 ? 'Drill' : 'Drills'}
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
                            className="group/item flex items-center justify-between p-2 rounded-xl bg-surface-1/60 hover:bg-rose-500/10 border border-hairline hover:border-rose-500/30 transition-all text-xs"
                          >
                            <span className="font-medium text-ink-1 group-hover/item:text-rose-300 transition-colors truncate pr-2">
                              {localized.name}
                            </span>
                            <span className="text-[10px] font-mono text-ink-3 group-hover/item:text-rose-400 shrink-0 flex items-center gap-1">
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

        {/* Biomechanics & Kinematic Specifications */}
        <Reveal className="mb-14">
          <div className="rounded-3xl bg-surface-1/70 border border-hairline p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-rose-400" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                Biomechanics &amp; Sensorimotor Specifications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Dynamic Evasion Latency
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Compresses reaction delay under chaotic multi-vector obstacle patterns and unexpected trajectory inversions.
                </p>
              </div>

              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                  <Activity className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Equilibrium &amp; Force Resistance
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Develops continuous counter-force centering against simulated environmental wind vectors and momentum drift.
                </p>
              </div>

              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                  <Gauge className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Bilateral Agility Cadence
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Calibrates alternating left-right timing intervals and cross-body coordinate mapping across 3x3 tactical agility matrices.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Frequently Asked Questions (SEO / AEO / GEO) */}
        {faqs?.length > 0 && (
          <Reveal className="mb-14">
            <div className="rounded-3xl bg-surface-1/70 border border-hairline p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-rose-400" />
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                  {t('home.faqTitle', 'Frequently Asked Questions')}
                </h2>
              </div>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqs.map((f, i) => (
                  <div key={i} className="bg-surface-2/80 border border-hairline rounded-2xl p-5 flex flex-col justify-start">
                    <dt className="font-bold text-ink-1 text-sm font-sans flex items-start gap-2.5">
                      <span className="text-rose-400 font-mono text-xs font-bold shrink-0 mt-0.5">
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
        <AdjacentHubs currentCat="physical" />

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

        <StickyMobileCta
          href={hasLocalizedRoute(locale, '/drills/physical/reflex-training/quick-dodge') ? localizeHref('/drills/physical/reflex-training/quick-dodge') : '/drills/physical/reflex-training/quick-dodge'}
          label={t('hubs.physical.startCta', 'Start Agility Drill')}
          categoryName={t('header.physical', 'Physical')}
        />
      </div>

      <SiteFooter />
    </div>
  );
}