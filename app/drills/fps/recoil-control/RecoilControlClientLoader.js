'use client';

import dynamic from 'next/dynamic';

const RecoilControlClient = dynamic(
  () => import('./RecoilControlClient'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[600px] flex items-center justify-center bg-[#080811] rounded-2xl border border-white/5">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      </div>
    ),
  }
);

export default function RecoilControlClientLoader(props) {
  return <RecoilControlClient {...props} />;
}
