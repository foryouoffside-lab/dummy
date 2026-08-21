'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DRILLS } from '@/lib/drillsRegistry';
import { getRelatedDrills } from '@/lib/relatedDrills';
import { DRILL_SEO } from '@/lib/drillSeo';

// Keyword-bearing cross-links between drill pages.
//
// Mounted once in app/drills/layout.js and self-gating: it renders nothing
// unless the current path is an exact drill href, so hub pages (which have
// their own drill grids) are untouched.
//
// It is a client component only because it reads the path from usePathname().
// Everything it renders is derived from the static registry, so the markup is
// identical on the server and the client — the links are in the initial HTML
// and a crawler sees them without executing any JavaScript. That matters here:
// the GSC URL Inspection API showed 64 of 81 drill URLs with no referring URL
// at all, which is exactly why they never got crawled.
//
// The visible link text is the drill's target search phrase from lib/drillSeo.js
// rather than its product name. Names like "Ghost-Link Tracking" and "Triangular
// Pursuit" have no search volume; "Multiple Object Tracking Test" and "Eye
// Tracking Accuracy Drill" do, and anchor text is one of the few keyword signals
// a low-authority page can actually earn for itself.

const CATEGORY_HUB = {
  fps: { href: '/drills/fps', label: 'FPS aim training' },
  cognitive: { href: '/drills/cognitive', label: 'brain training' },
  memory: { href: '/drills/memory', label: 'memory training' },
  motor: { href: '/drills/motor', label: 'mouse precision drills' },
  physical: { href: '/drills/physical', label: 'reflex and coordination drills' },
  visual: { href: '/drills/visual', label: 'visual training' },
  'visual-tracking': { href: '/drills/visual-tracking', label: 'eye tracking training' },
  'reaction-speed': { href: '/drills/reaction-speed', label: 'reaction time drills' },
};

const RELATION_LABEL = {
  'same-subcategory': 'Same skill',
  'same-category': 'Same category',
  'related-topic': 'Related skill',
  'more-drills': 'More drills',
};

export default function RelatedDrills() {
  const pathname = usePathname();
  const drill = DRILLS.find((d) => d.href === pathname);
  if (!drill) return null;

  const related = getRelatedDrills(drill.href, 6);
  if (related.length === 0) return null;

  const hub = CATEGORY_HUB[drill.category];
  const term = DRILL_SEO[drill.href]?.term;

  return (
    <section
      className="max-w-6xl w-full mx-auto px-4 pb-12 font-sans"
      aria-labelledby="related-drills-heading"
    >
      <div className="border border-gray-800 bg-black rounded-2xl px-6 py-7">
        <h2
          id="related-drills-heading"
          className="text-xl font-bold text-white tracking-tight mb-1.5"
        >
          Drills related to {term || drill.name}
        </h2>
        <p className="text-sm leading-relaxed text-gray-400 mb-6">
          Train the same skill from a different angle. Every drill below runs free in the
          browser with no sign-up.
        </p>

        <nav aria-label="Related drills">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {related.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="group flex h-full flex-col gap-1.5 p-4 rounded-xl border border-gray-800 bg-white/[0.02] hover:bg-white/[0.05] hover:border-gray-700 transition-colors duration-200"
                >
                  <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                    {r.anchor}
                  </span>
                  <span className="text-xs text-gray-400">{r.name}</span>
                  <span className="mt-auto pt-2 text-[11px] uppercase tracking-wide text-gray-500">
                    {RELATION_LABEL[r.relation]} · {r.categoryLabel} · {r.duration}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {hub && (
          <p className="mt-6 text-sm text-gray-400">
            Or browse every{' '}
            <Link href={hub.href} className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
              {hub.label} drill
            </Link>
            {' '}·{' '}
            <Link href="/drills" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
              all {DRILLS.length} free online drills
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
