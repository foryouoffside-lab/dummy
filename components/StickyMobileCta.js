'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function StickyMobileCta({ href, label = 'Start Recommended Drill', categoryName }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-canvas/90 backdrop-blur-xl border-t border-hairline lg:hidden z-40 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-mono text-ink-3 uppercase tracking-wider block">
            {categoryName ? `${categoryName} Hub` : 'SkillDrills'}
          </span>
          <span className="text-xs font-semibold text-ink-1 truncate block">
            Ready to train?
          </span>
        </div>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg active:scale-[0.97] transition-transform shrink-0"
        >
          <span>{label}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
