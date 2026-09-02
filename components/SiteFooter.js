import Link from 'next/link';
import { Crosshair, Brain, Database, Eye, Activity, Dumbbell, Zap, Sparkles } from 'lucide-react';
import { DRILLS, DESKTOP_ONLY_CATEGORIES } from '@/lib/drillsRegistry';

const categoryConfigs = [
  { key: 'fps', name: 'FPS Training', href: '/drills/fps', icon: Crosshair, color: 'text-red-400' },
  { key: 'cognitive', name: 'Cognitive', href: '/drills/cognitive', icon: Brain, color: 'text-purple-400' },
  { key: 'memory', name: 'Memory', href: '/drills/memory', icon: Database, color: 'text-indigo-400' },
  { key: 'motor', name: 'Motor Skills', href: '/drills/motor', icon: Dumbbell, color: 'text-emerald-400' },
  { key: 'physical', name: 'Physical', href: '/drills/physical', icon: Activity, color: 'text-rose-400' },
  { key: 'visual', name: 'Visual Training', href: '/drills/visual', icon: Eye, color: 'text-fuchsia-400' },
  { key: 'visual-tracking', name: 'Visual Tracking', href: '/drills/visual-tracking', icon: Activity, color: 'text-cyan-400' },
  { key: 'reaction-speed', name: 'Reaction Speed', href: '/drills/reaction-speed', icon: Zap, color: 'text-amber-400' },
];

export default function SiteFooter() {
  const totalDrills = DRILLS.length;

  return (
    <footer className="bg-canvas border-t border-hairline text-ink-2 py-16 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-hairline">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/logo.svg"
                alt="SkillDrills"
                width={32}
                height={32}
                className="w-8 h-8 shrink-0"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                Skill<span className="text-blue-400">Drills</span>
              </span>
            </Link>
            <p className="text-sm text-ink-2 leading-relaxed">
              {totalDrills} free interactive training drills for FPS aim, cognitive speed, working memory, hand-eye coordination, and visual mechanics. No sign-up required.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-ink-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>100% Free &amp; Browser-Native</span>
            </div>
          </div>

          {/* All 8 Categories Link Grid */}
          <div className="md:col-span-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-ink-1 font-bold mb-4">
              Training Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categoryConfigs.map((cat) => {
                const Icon = cat.icon;
                const count = DRILLS.filter((d) => d.category === cat.key).length;
                const isDesktopOnly = DESKTOP_ONLY_CATEGORIES.includes(cat.key);
                return (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="p-3 rounded-xl bg-surface-1 hover:bg-surface-2 border border-hairline hover:border-hairline-2 active:scale-[0.98] transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${cat.color}`} />
                      <span className="text-xs font-semibold text-ink-1 group-hover:text-blue-400 transition-colors truncate">
                        {cat.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-ink-3 font-mono block">
                        {count} drills
                      </span>
                      {isDesktopOnly && (
                        <span className="text-[9px] font-mono text-red-400">
                          Desktop Only
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-3 gap-4">
          <p>&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-ink-1 transition-colors">Home</Link>
            <Link href="/drills" className="hover:text-ink-1 transition-colors">All Hubs</Link>
            <Link href="/search" className="hover:text-ink-1 transition-colors">Search Drills</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
