'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ChevronRight, Volume2, VolumeX, Zap, ZapOff } from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';
import { drillAudio } from '@/lib/drillAudio';
import { drillFlash } from '@/lib/drillFlash';

// Visible breadcrumb nav for leaf drill pages only (HQ > Drills > Category > Drill).
// Hub pages already render their own hand-rolled breadcrumb (e.g. FPSHubClient.js),
// so this renders nothing unless the current path is an exact drill href — safe to
// mount once for the whole /drills route tree with zero risk of a duplicate crumb.
//
// Also carries the sound/flash toggles (each drill page used to duplicate its own
// copy of these next to a second, redundant breadcrumb) — drillAudio/drillFlash are
// module-level singletons backed by localStorage, so reading/writing them here stays
// in sync with every drill's in-game HUD toggle without any prop drilling.
export default function DrillBreadcrumb() {
  const pathname = usePathname();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);

  useEffect(() => {
    setSoundEnabled(drillAudio.isEnabled());
    setFlashEnabled(drillFlash.isEnabled());
  }, []);

  const drill = DRILLS.find((d) => d.href === pathname);
  if (!drill) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex items-center justify-between gap-3 flex-wrap">
      <ol className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wider flex-wrap">
        <li>
          <Link href="/" className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>HQ</span>
          </Link>
        </li>
        <li><ChevronRight className="w-3 h-3 text-gray-700" /></li>
        <li><Link href="/drills" className="hover:text-red-400 transition-colors">Drills</Link></li>
        <li><ChevronRight className="w-3 h-3 text-gray-700" /></li>
        <li>
          <Link href={`/drills/${drill.category}`} className="hover:text-red-400 transition-colors">
            {drill.categoryLabel}
          </Link>
        </li>
        <li><ChevronRight className="w-3 h-3 text-gray-700" /></li>
        <li><span className="text-red-400 font-bold" aria-current="page">{drill.name}</span></li>
      </ol>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            drillAudio.setEnabled(next);
          }}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
        </button>
        <button
          type="button"
          onClick={() => {
            const next = !flashEnabled;
            setFlashEnabled(next);
            drillFlash.setEnabled(next);
          }}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          title={flashEnabled ? 'Disable Miss Flash' : 'Enable Miss Flash'}
        >
          {flashEnabled ? <Zap className="w-4 h-4 text-red-400" /> : <ZapOff className="w-4 h-4 text-gray-500" />}
        </button>
      </div>
    </nav>
  );
}
