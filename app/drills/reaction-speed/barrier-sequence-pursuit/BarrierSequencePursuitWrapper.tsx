'use client';

import dynamic from 'next/dynamic';

const BarrierSequencePursuitClient = dynamic(
  () => import('./BarrierSequencePursuitClient'),
  { ssr: false }
);

export default function BarrierSequencePursuitWrapper() {
  return <BarrierSequencePursuitClient />;
}
