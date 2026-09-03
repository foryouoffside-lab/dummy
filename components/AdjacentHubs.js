import Link from 'next/link';
import { SITE_CATEGORIES, getCategoryCount } from '@/lib/siteCategories';

// Six of the eight category hubs ended with a grid of links to neighbouring
// hubs; reaction-speed and visual-tracking ended with a single "back to all
// sectors" link and nothing else. That made them dead ends for visitors and
// for the internal link mesh. This is that grid, driven off the shared
// category list instead of a seventh hand-written copy.
export default function AdjacentHubs({ currentCat, limit = 4 }) {
  const neighbours = SITE_CATEGORIES.filter((c) => c.cat !== currentCat).slice(0, limit);

  return (
    <section className="mt-12 mb-8 border-t border-hairline pt-12" aria-labelledby="adjacent-hubs-heading">
      <h2
        id="adjacent-hubs-heading"
        className="text-base font-bold tracking-widest text-center text-ink-1 font-mono uppercase mb-8"
      >
        Explore Adjacent Hubs
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {neighbours.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.cat}
              href={cat.href}
              className="group bg-surface-1 border border-hairline rounded-xl p-5 hover:border-hairline-2 hover:-translate-y-1 transition-all duration-200 text-center"
            >
              <Icon className={`w-6 h-6 mx-auto mb-2 ${cat.accent}`} />
              <h3 className="font-bold text-ink-1 uppercase text-xs font-mono">{cat.name}</h3>
              <p className="text-2xs text-ink-3 mt-1 font-mono">{getCategoryCount(cat.cat)} drills</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
