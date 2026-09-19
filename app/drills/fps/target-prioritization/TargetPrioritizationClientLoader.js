'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('./TargetPrioritizationClient'), {
  loading: () => (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="w-full aspect-[16/9] max-h-[700px] bg-[#080811] border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
        <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    </div>
  ),
});
