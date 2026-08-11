'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Clock, Play, Hand, MousePointer,
  Gauge, Crosshair, Sparkles, Home,
  ChevronRight, Cpu
} from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { getDifficultyRank } from '@/lib/scoringEngine';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import StickyMobileCta from '@/components/StickyMobileCta';
import DrillLoading from '@/components/DrillLoading';
import { isIdleFrameSkippable } from '@/lib/performance';
import ResetDrillButton from '@/components/drill/ResetDrillButton';

const motorDrills = DRILLS.filter(d => d.category === 'motor');

// Drills whose saved best score/level is never read back to set a new
// session's starting difficulty (every round always begins at the same base
// difficulty) — no adaptive difficulty, so a "reset progress" button has
// nothing meaningful to reset.
const NO_ADAPTIVE_DIFFICULTY = new Set([
  'keyboard-recognition', 'rapid-tapping', 'steady-hand', 'tracing',
]);

function handleCardMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export default function MotorDrillsClient() {
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
      motorDrills.forEach(d => {
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
            } catch (e) {}
          }
        }
      });
      setDrillLevels(levels);
    } catch (e) {}
  }, [isClient]);

  // Aim coordinate pointer track background animation
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

    let mouse = { x: -100, y: -100 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

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
        ctx.strokeStyle = "rgba(16, 185, 129, 0.08)";
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, canvas.height);
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(canvas.width, mouse.y);
        ctx.stroke();

        ctx.strokeStyle = "rgba(16, 185, 129, 0.25)";
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
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isClient]);

  const categories = [
    { 
      name: 'Hand-Eye Coordination', 
      folderName: 'hand-eye-coordination',
      icon: MousePointer,
      color: 'emerald',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      textColor: 'text-emerald-400',
      description: 'Train aim, click accuracy, and drag-and-drop precision',
      drills: motorDrills.filter(d => ['aim-trainer', 'drag-and-drop', 'precision-flick-shot'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
    },
    { 
      name: 'Movement Speed', 
      folderName: 'movement-speed',
      icon: Gauge,
      color: 'emerald',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      textColor: 'text-emerald-400',
      description: 'Increase movement speed, sequencing, and gesture velocity',
      drills: motorDrills.filter(d => ['finger-sequencing', 'keyboard-recognition', 'rapid-tapping'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
    },
    { 
      name: 'Precision Control', 
      folderName: 'precision-control',
      icon: Crosshair,
      color: 'teal',
      bgColor: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
      textColor: 'text-teal-400',
      description: 'Master fine motor skills and precise cursor movements',
      drills: motorDrills.filter(d => ['steady-hand', 'tracing'].includes(d.folderName)).sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty))
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Hard': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Expert': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const totalDrills = categories.reduce((acc, cat) => acc + cat.drills.length, 0);

  if (!isClient) {
    return <DrillLoading />;
  }

  return (
    <div className="min-h-screen bg-canvas text-ink-1 font-sans selection:bg-emerald-500/30 selection:text-emerald-300 relative overflow-hidden">
      
      <canvas style={{ touchAction: 'none' }} ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />

      {/* Layered premium background accent: hub-tinted mesh blobs + grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-emerald-600/[0.12] rounded-full blur-[150px]" />
        <div className="absolute top-[30%] -right-40 w-[480px] h-[480px] bg-teal-500/[0.08] rounded-full blur-[140px]" />
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
            "name": "Motor Skills Drills - Hand-Eye Coordination, Precision & Speed",
            "url": "https://skilldrills.online/drills/motor",
            "description": `${totalDrills} free motor skills training drills covering Hand-Eye Coordination, Precision Control, and Movement Speed. Improve mouse aim, timing, steady hand, and reaction speed.`,
            "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "Motor Skill Training" },
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
                "url": `https://skilldrills.online/drills/motor/${drill.categoryFolder}/${drill.folderName}`,
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
              <Link href="/" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>HQ</span>
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 text-hairline-2" />
            <li><Link href="/drills" className="hover:text-emerald-400 transition-colors">Drills</Link></li>
            <ChevronRight className="w-3 h-3 text-hairline-2" />
            <li><span className="text-emerald-400 font-bold" aria-current="page">Motor Sector</span></li>
          </ol>
        </nav>

        {/* Desktop Only Mobile Warning Banner */}
        <div className="lg:hidden mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Only Desktop Supported
            </span>
          </div>
          <p className="text-xs leading-relaxed text-emerald-200/90 font-sans">
            This category uses precise mouse and keyboard input and isn't built for touch. You can still browse and read about the drills here, but for the real experience, switch to a laptop or desktop.
          </p>
        </div>

        {/* Header with compact inline chip next to H1 */}
        <Reveal>
          <div className="mb-8 bg-surface-1 border border-hairline rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-600 opacity-70" />
            <div className="flex items-start gap-4">
              <div className="relative p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 shadow-inner shrink-0">
                <div className="absolute -inset-1.5 rounded-2xl bg-emerald-500/30 opacity-60 blur-md -z-10" />
                <Hand className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-1 tracking-tight uppercase">Motor Sector</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-2xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    {totalDrills} DRILLS ONLINE
                  </span>
                </div>
                <p className="text-ink-2 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
                  Refine micro-aim adjustments, drag mechanics, target intercept precision, and click cadence ratios.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Start Here Band */}
        <Reveal className="mb-10">
          <div className="p-5 rounded-3xl bg-surface-1 border border-hairline backdrop-blur-xl shadow-xl">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3">
              Recommended Start Routines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/drills/motor/hand-eye-coordination/drag-and-drop"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-emerald-500/40 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-emerald-400 transition-colors">New to Motor Control</p>
                <p className="text-[10px] text-ink-3 mt-1">Easy drag-and-drop precision baseline</p>
              </Link>
              <Link 
                href="/drills/motor/movement-speed/rapid-tapping"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-emerald-500/40 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-emerald-400 transition-colors">Finger Velocity Warm-up</p>
                <p className="text-[10px] text-ink-3 mt-1">High-speed click cadence drill</p>
              </Link>
              <Link 
                href="/drills/motor/hand-eye-coordination/precision-flick-shot"
                className="p-3.5 rounded-xl bg-surface-2 border border-hairline hover:border-emerald-500/40 active:scale-[0.98] transition-all group"
              >
                <p className="text-xs font-bold text-ink-1 group-hover:text-emerald-400 transition-colors">Full Motor Circuit</p>
                <p className="text-[10px] text-ink-3 mt-1">4-drill motor &amp; kinematics routine</p>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Drills Grid by Category */}
        {categories.map((category) => {
          const categoryDrills = category.drills;
          const Icon = category.icon;

          return (
            <Reveal key={category.name} className="mb-12 relative">
              <div className="flex items-center gap-2 mb-6 border-b border-hairline pb-3">
                <div className="w-1 h-6 rounded-full bg-emerald-500" />
                <h2 className="text-lg font-bold uppercase tracking-wider text-ink-1 font-mono">{category.name}</h2>
                <span className="px-2 py-0.5 text-2xs font-mono rounded bg-surface-2 border border-hairline text-emerald-400 font-bold">
                  {categoryDrills.length} DRILL{categoryDrills.length > 1 ? 'S' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDrills.map((drill, index) => {
                  const bestLevel = drillLevels[drill.folderName];
                  const storageKeys = [
                    `skilldrills_motor_${drill.folderName.replace(/-/g, '_')}_v3`,
                    `skilldrills_motor_${drill.folderName.replace(/-/g, '_')}_v2`,
                    `skilldrills_${drill.folderName.replace(/-/g, '_')}`,
                  ];
                  return (
                  <Link
                    key={index}
                    href={`/drills/motor/${category.folderName}/${drill.folderName}`}
                    onMouseMove={handleCardMouseMove}
                    className="group relative isolate overflow-hidden bg-surface-1 backdrop-blur-xl border border-hairline hover:border-emerald-500/40 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10"
                  >
                    {/* Top accent hairline */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />

                    {/* Cursor-tracked spotlight */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(16,185,129,0.16), transparent 70%)' }}
                    />

                    {/* Tactical corner brackets (targeting-reticle feel) */}
                    <span aria-hidden="true" className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-emerald-500/0 group-hover:border-emerald-500/70 transition-colors duration-300 rounded-tl-sm" />
                    <span aria-hidden="true" className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-emerald-500/0 group-hover:border-emerald-500/70 transition-colors duration-300 rounded-tr-sm" />
                    <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-emerald-500/0 group-hover:border-emerald-500/70 transition-colors duration-300 rounded-bl-sm" />
                    <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-emerald-500/0 group-hover:border-emerald-500/70 transition-colors duration-300 rounded-br-sm" />

                    <div className="relative p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="relative p-2.5 rounded-lg border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                          <div className="absolute -inset-1.5 rounded-xl bg-emerald-500/30 opacity-0 group-hover:opacity-60 blur-md -z-10 transition-opacity" />
                          <Icon className="w-5 h-5" />
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
                            <div className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                              Lv. {bestLevel}
                            </div>
                          )}
                          <div className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide border uppercase ${getDifficultyColor(drill.difficulty)}`}>
                            {drill.difficulty}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-ink-1 mb-2 group-hover:text-emerald-400 transition-colors uppercase tracking-tight font-mono">
                        {drill.name}
                      </h3>
                      
                      <p className="text-xs text-ink-2 mb-4 leading-relaxed min-h-[48px]">
                        {drill.description}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-4 text-2xs font-mono text-ink-3 border-b border-hairline pb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{drill.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Motor Loop</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xs font-bold text-ink-3 uppercase tracking-widest">{category.name}</span>
                        <div className="flex items-center gap-1 text-emerald-400 group-hover:gap-2 transition-all font-bold text-xs uppercase tracking-widest font-mono">
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
              <Sparkles className="w-5 h-5 text-emerald-400" />
              MOTOR KINEMATICS BENEFITS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { emoji: "🖱️", title: "Target Precision", desc: "Augment fine muscle controls to hold mouse trajectories steady." },
                { emoji: "⚡", title: "Click Cadence", desc: "Train optimal finger sequencing for rapid tapping thresholds." },
                { emoji: "🎯", title: "Synchronization", desc: "Perfect coordination timing triggers on visual alignment events." },
                { emoji: "🧬", title: "Reflex Calibration", desc: "Reduce sensory-motor delay margins in dynamic intercept zones." }
              ].map((benefit, i) => (
                <div key={i} className="bg-surface-2 border border-hairline rounded-xl p-4">
                  <h4 className="font-bold text-emerald-400 mb-1 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
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
              <h3 className="font-bold text-ink-1 group-hover:text-violet-400 transition-colors uppercase text-xs font-mono">Cognitive</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Memory &amp; focus</p>
            </Link>
            <Link href="/drills/visual" className="group bg-surface-1 border border-hairline rounded-xl p-5 hover:border-fuchsia-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">👁️</div>
              <h3 className="font-bold text-ink-1 group-hover:text-fuchsia-400 transition-colors uppercase text-xs font-mono">Visual</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Saccades &amp; fov</p>
            </Link>
            <Link href="/drills/fps" className="group bg-surface-1 border border-hairline rounded-xl p-5 hover:border-red-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-bold text-ink-1 group-hover:text-red-400 transition-colors uppercase text-xs font-mono">FPS Aim</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Flick &amp; Pursuit</p>
            </Link>
            <Link href="/drills/memory" className="group bg-surface-1 border border-hairline rounded-xl p-5 hover:border-indigo-500/40 transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">💾</div>
              <h3 className="font-bold text-ink-1 group-hover:text-indigo-400 transition-colors uppercase text-xs font-mono">Memory</h3>
              <p className="text-2xs text-ink-3 uppercase mt-1 font-mono">Sequence recall</p>
            </Link>
          </div>
        </Reveal>
      </div>

      <StickyMobileCta href="/drills/motor/hand-eye-coordination/drag-and-drop" label="Start Motor Drill" categoryName="Motor" />
      <SiteFooter />
    </div>
  );
}