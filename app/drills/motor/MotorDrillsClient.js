'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Hand,
  MousePointer,
  Gauge,
  Crosshair,
  Home,
  ChevronRight,
  Sparkles,
  Layers,
  Activity,
  Keyboard,
  Compass
} from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { getDrillTagline, sortByInterest } from '@/lib/drillCatalog';
import { getDifficultyRank } from '@/lib/scoringEngine';
import { isIdleFrameSkippable } from '@/lib/performance';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import AdjacentHubs from '@/components/AdjacentHubs';
import { useTranslation } from '@/lib/i18n/useTranslation';
import DrillCarousel from '@/components/drill/DrillCarousel';
import StickyMobileCta from '@/components/StickyMobileCta';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';
import { hasLocalizedRoute } from '@/lib/i18n/locales';

// Tactical metadata & categorized discipline taxonomy for Motor skills
const MOTOR_METADATA = {
  'aim-trainer': {
    discipline: 'coordination',
    disciplineName: 'Hand-Eye Coordination',
    focus: 'Dynamic Shrink Snapping',
    skills: ['Mouse Precision', 'Streak Aim'],
    icon: Crosshair,
  },
  'drag-and-drop': {
    discipline: 'coordination',
    disciplineName: 'Hand-Eye Coordination',
    focus: 'Teleporting Ring Intercept',
    skills: ['Cursor Grip', 'Spatial Timing'],
    icon: MousePointer,
  },
  'precision-flick-shot': {
    discipline: 'coordination',
    disciplineName: 'Hand-Eye Coordination',
    focus: 'Aperture Centering Snap',
    skills: ['Flick Precision', 'Motor Centering'],
    icon: Crosshair,
  },
  'finger-sequencing': {
    discipline: 'speed',
    disciplineName: 'Movement Speed',
    focus: 'Scale-Ordered Node Tap',
    skills: ['Finger Dexterity', 'Cognitive Rhythm'],
    icon: Hand,
  },
  'keyboard-recognition': {
    discipline: 'speed',
    disciplineName: 'Movement Speed',
    focus: 'Keybind Muscle Memory',
    skills: ['Key Speed', 'Spatial Layout'],
    icon: Keyboard,
  },
  'rapid-tapping': {
    discipline: 'speed',
    disciplineName: 'Movement Speed',
    focus: 'CPS Click Cadence',
    skills: ['CPS Burst', 'Tapping Endurance'],
    icon: Gauge,
  },
  'steady-hand': {
    discipline: 'precision',
    disciplineName: 'Precision Control',
    focus: 'Narrow Corridor Traversal',
    skills: ['Tremor Suppression', 'Path Tracing'],
    icon: Compass,
  },
  'tracing': {
    discipline: 'precision',
    disciplineName: 'Precision Control',
    focus: 'Wave Filament Tracking',
    skills: ['Continuous Tracking', 'Smooth Motion'],
    icon: Activity,
  },
};

const motorDrills = DRILLS.filter((d) => d.category === 'motor');

const motorCategories = [
  {
    id: 'coordination',
    name: 'Hand-Eye Coordination',
    icon: MousePointer,
    description: 'Calibrate cursor trajectory, snap accuracy, and dynamic target acquisition',
    drills: motorDrills
      .filter((d) => MOTOR_METADATA[d.folderName]?.discipline === 'coordination')
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)),
  },
  {
    id: 'speed',
    name: 'Movement Speed',
    icon: Gauge,
    description: 'Develop peak click cadence, finger dexterity, and rapid key actuation',
    drills: motorDrills
      .filter((d) => MOTOR_METADATA[d.folderName]?.discipline === 'speed')
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)),
  },
  {
    id: 'precision',
    name: 'Precision Control',
    icon: Compass,
    description: 'Train sub-pixel cursor steadiness, path tracing, and micro-tremor suppression',
    drills: motorDrills
      .filter((d) => MOTOR_METADATA[d.folderName]?.discipline === 'precision')
      .sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)),
  },
];

// Flat, interest-ordered list for the carousel picker
const orderedMotorDrills = sortByInterest(
  motorCategories.flatMap((category) =>
    category.drills.map((drill) => ({
      ...drill,
      tagline: getDrillTagline(drill.href, drill.description),
      icon: category.icon,
    }))
  )
);

export default function MotorDrillsClient({ faqs = [] }) {
  const { locale, t, localizeHref } = useTranslation();
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
      const allMotor = DRILLS.filter((d) => d.category === 'motor');
      allMotor.forEach((d) => {
        const keys = [
          `skilldrills_motor_${d.folderName.replace(/-/g, '_')}_v3`,
          `skilldrills_motor_${d.folderName.replace(/-/g, '_')}_v2`,
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

  // Subtle interactive cursor tracking coordinate canvas
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

    let mouse = { x: -100, y: -100 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const trail = [];
    const draw = (time) => {
      if (isIdleFrameSkippable(false, time, lastTime)) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTime = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouse.x > 0 && mouse.y > 0) {
        trail.push({ x: mouse.x, y: mouse.y, age: 0 });
      }
      if (trail.length > 20) trail.shift();

      if (mouse.x > 0 && mouse.y > 0) {
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, canvas.height);
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(canvas.width, mouse.y);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      trail.forEach((p) => {
        p.age += 1;
        const opacity = Math.max(0, 1 - p.age / 20) * 0.15;
        ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient]);


  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-hidden">
      {/* Interactive cursor coordinate guide canvas */}
      <canvas
        style={{ touchAction: 'none' }}
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
      />

      {/* Layered ambient lighting: Emerald + Teal glow + subtle grid mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-emerald-600/[0.10] rounded-full blur-[160px]" />
        <div className="absolute top-[25%] -right-40 w-[460px] h-[460px] bg-teal-500/[0.07] rounded-full blur-[140px]" />
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
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>{t('ui.nav.hq', 'HQ')}</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li>
              <Link
                href={hasLocalizedRoute(locale, '/drills') ? localizeHref('/drills') : '/drills'}
                className="hover:text-emerald-400 transition-colors"
              >
                {t('ui.nav.drills', 'DRILLS')}
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-hairline-2" /></li>
            <li>
              <span className="text-emerald-400 font-bold" aria-current="page">
                {t('header.motor', 'MOTOR')}
              </span>
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-1">
            {t('hubs.motor.h1', 'Mouse Precision & Motor Drills')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-2 leading-relaxed">
            {t(
              'hubs.motor.desc',
              'Motor skill drills measure how precisely and how fast you can control a mouse, a keyboard or a touchscreen. They all sit on one trade-off, Fitts’s Law: movement time grows with the logarithm of the distance to a target divided by that target’s width, so speed and accuracy cannot both be maximised at once (Fitts, 1954). Free, no sign-up, and every score stays in your browser.'
            )}
          </p>
        </div>

        {/* Drill Matrix - Swipeable Carousel */}
        <Reveal className="mb-14">
          <DrillCarousel
            headingId="motor-drills"
            heading={t('hubs.motor.drillsHeading', 'Motor precision drills')}
            accent="emerald"
            icon={Crosshair}
            showcase
            allLabel={t('ui.viewAll', 'View all')}
            drills={orderedMotorDrills.map((drill) => {
              const localized = getLocalizedDrill(drill.href, locale, drill.name, drill.tagline);
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

        {/* Motor Training Domains - 3 Category Cards with Crawlable Links */}
        <Reveal className="mb-14">
          <div className="bg-surface-1 border border-hairline rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="w-5 h-5 text-emerald-400" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                Motor Training Domains
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {motorCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="bg-surface-2/80 border border-hairline rounded-2xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-ink-1">
                            {cat.name}
                          </h3>
                          <span className="text-[10px] font-mono text-emerald-400">
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
                            className="group/item flex items-center justify-between p-2 rounded-xl bg-surface-1/60 hover:bg-emerald-500/10 border border-hairline hover:border-emerald-500/30 transition-all text-xs"
                          >
                            <span className="font-medium text-ink-1 group-hover/item:text-emerald-300 transition-colors truncate pr-2">
                              {localized.name}
                            </span>
                            <span className="text-[10px] font-mono text-ink-3 group-hover/item:text-emerald-400 shrink-0 flex items-center gap-1">
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

        {/* Motor Kinematics Architecture & Technical Specifications */}
        <Reveal className="mb-14">
          <div className="rounded-3xl bg-surface-1/70 border border-hairline p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                Kinematics &amp; Motor Performance Specifications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <MousePointer className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Sub-Pixel Path Smoothing
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Continuous coordinate sampling trains involuntary micro-tremor suppression and stabilizes fine mouse corridors for surgical cursor guidance.
                </p>
              </div>

              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Gauge className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Click Cadence &amp; CPS Sampling
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  High-frequency down/up actuation detection records peak click-per-second thresholds and maintains steady endurance without finger cramping.
                </p>
              </div>

              <div className="bg-surface-2/80 border border-hairline rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Activity className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1 mb-1.5">
                  Visuomotor Synchronization
                </h3>
                <p className="text-2xs text-ink-3 leading-relaxed">
                  Tightens neuromuscular feedback loops bridging instantaneous visual target identification directly with rapid motor execution.
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
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-ink-1 font-mono">
                  {t('home.faqTitle', 'Frequently Asked Questions')}
                </h2>
              </div>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqs.map((f, i) => (
                  <div key={i} className="bg-surface-2/80 border border-hairline rounded-2xl p-5 flex flex-col justify-start">
                    <dt className="font-bold text-ink-1 text-sm font-sans flex items-start gap-2.5">
                      <span className="text-emerald-400 font-mono text-xs font-bold shrink-0 mt-0.5">
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
        <AdjacentHubs currentCat="motor" />

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
          href={hasLocalizedRoute(locale, '/drills/motor/hand-eye-coordination/aim-trainer') ? localizeHref('/drills/motor/hand-eye-coordination/aim-trainer') : '/drills/motor/hand-eye-coordination/aim-trainer'}
          label={t('hubs.motor.startCta', 'Start Aim Trainer')}
          categoryName={t('header.motor', 'Motor')}
        />
      </div>

      <SiteFooter />
    </div>
  );
}