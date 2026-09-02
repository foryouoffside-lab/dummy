'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';

// Visible breadcrumb nav for leaf drill pages only (HQ > Drills > Category > Drill).
// Hub pages already render their own hand-rolled breadcrumb (e.g. FPSHubClient.js),
// so this renders nothing unless the current path is an exact drill href — safe to
// mount once for the whole /drills route tree with zero risk of a duplicate crumb.
//
// Stays on one line at every width: the three ancestors never shrink and the drill
// name truncates, because on a phone "Cognitive Drills > Divided Attention" wrapped
// to a second line and pushed the H1 down. Nothing is lost to the truncation — the
// page's H1, directly below, is the drill name in full.
export default function DrillBreadcrumb() {
  const pathname = usePathname();

  const drill = DRILLS.find((d) => d.href === pathname);
  if (!drill) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
      <ol className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wider min-w-0">
        <li className="shrink-0">
          <Link href="/" className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>HQ</span>
          </Link>
        </li>
        <li className="shrink-0"><ChevronRight className="w-3 h-3 text-gray-700" /></li>
        <li className="shrink-0"><Link href="/drills" className="hover:text-red-400 transition-colors">Drills</Link></li>
        <li className="shrink-0"><ChevronRight className="w-3 h-3 text-gray-700" /></li>
        <li className="shrink-0">
          <Link href={`/drills/${drill.category}`} className="hover:text-red-400 transition-colors">
            {drill.categoryLabel}
          </Link>
        </li>
        <li className="shrink-0"><ChevronRight className="w-3 h-3 text-gray-700" /></li>
        <li className="min-w-0"><span className="block truncate text-red-400 font-bold" aria-current="page">{drill.name}</span></li>
      </ol>
    </nav>
  );
}
