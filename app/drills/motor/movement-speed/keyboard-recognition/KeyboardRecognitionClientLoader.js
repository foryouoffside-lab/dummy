'use client';

import dynamic from 'next/dynamic';

const KeyboardRecognitionClient = dynamic(() => import('./KeyboardRecognitionClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] bg-[#080811] border border-white/10 flex items-center justify-center select-none">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
        <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">Loading Drill...</span>
      </div>
    </div>
  ),
});

export default function KeyboardRecognitionClientLoader(props) {
  return <KeyboardRecognitionClient {...props} />;
}
