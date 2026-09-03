import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { DRILLS, DESKTOP_ONLY_CATEGORIES } from '@/lib/drillsRegistry';
import { SITE_CATEGORIES, getCategoryCount } from '@/lib/siteCategories';

// The footer is the last chance to answer "who runs this and can I trust it".
// Privacy, terms and account deletion pages already existed but were reachable
// from nowhere — a dead end for both visitors and crawlers.
const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/delete-account', label: 'Delete data' },
];

const SITE_LINKS = [
  { href: '/drills', label: 'All drills' },
  { href: '/search', label: 'Search' },
];

export default function SiteFooter() {
  const totalDrills = DRILLS.length;

  return (
    <footer className="bg-canvas border-t border-hairline text-ink-2 py-14 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-hairline">

          {/* Brand */}
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
            <p className="text-sm text-ink-2 leading-relaxed max-w-sm">
              {totalDrills} free training drills for aim, reaction speed, memory, focus and
              coordination. They run in your browser, and your scores stay on your device.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-ink-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Free · no account · no installs</span>
            </div>
          </div>

          {/* Categories */}
          <nav className="md:col-span-8" aria-label="Training categories">
            <h2 className="text-xs font-mono uppercase tracking-widest text-ink-1 font-bold mb-4">
              Training categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SITE_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const count = getCategoryCount(cat.cat);
                const isDesktopOnly = DESKTOP_ONLY_CATEGORIES.includes(cat.cat);
                return (
                  <Link
                    key={cat.cat}
                    href={cat.href}
                    className="p-3 rounded-xl bg-surface-1 hover:bg-surface-2 border border-hairline hover:border-hairline-2 active:scale-[0.98] transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${cat.accent}`} />
                      <span className="text-xs font-semibold text-ink-1 group-hover:text-blue-400 transition-colors truncate">
                        {cat.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] text-ink-3 font-mono">{count} drills</span>
                      {isDesktopOnly && (
                        <span className="text-[9px] font-mono text-ink-3">desktop</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-3 gap-4">
          <p>&copy; {new Date().getFullYear()} SkillDrills</p>
          <nav aria-label="Site and legal links" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {[...SITE_LINKS, ...LEGAL_LINKS].map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-ink-1 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
