'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('./TargetSwitchingSwarmClient'), {
  loading: () => (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center">
      <div className="w-full max-w-4xl aspect-[16/9] bg-[#080811] rounded-2xl border border-white/5 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    </div>
  ),
});
