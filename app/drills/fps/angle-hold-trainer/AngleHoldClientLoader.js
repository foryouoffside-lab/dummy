'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('./AngleHoldClient'), {
  loading: () => (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="relative w-full aspect-[16/9] bg-[#080811] rounded-2xl border border-white/10 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-400/20 border-t-emerald-400 animate-spin" />
      </div>
    </div>
  )
});
