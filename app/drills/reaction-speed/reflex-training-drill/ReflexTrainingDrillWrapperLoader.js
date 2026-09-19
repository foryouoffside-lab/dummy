'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('./ReflexTrainingDrillWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] max-md:portrait:aspect-[3/4] max-md:portrait:min-h-[420px] max-md:portrait:max-h-[76vh] max-md:landscape:min-h-[340px] max-md:landscape:max-h-[85vh] bg-[#080811] border border-white/10 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
    </div>
  ),
});
