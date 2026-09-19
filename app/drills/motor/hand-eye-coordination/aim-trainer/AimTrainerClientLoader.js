'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('./AimTrainerClient'), {
  loading: () => (
    <div className="w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] bg-[#080811] border border-white/10 flex flex-col items-center justify-center gap-3">
      <div className="w-9 h-9 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Aim Trainer...</span>
    </div>
  ),
});
