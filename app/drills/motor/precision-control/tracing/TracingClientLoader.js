'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('./TracingClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl mx-auto aspect-[16/10] bg-[#080811] rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-slate-500 tracking-wider font-mono uppercase">Loading Drill Engine...</span>
      </div>
    </div>
  ),
});
