'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('./BarrierSequencePursuitWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl mx-auto aspect-video bg-[#080811] rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl">
      <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});
