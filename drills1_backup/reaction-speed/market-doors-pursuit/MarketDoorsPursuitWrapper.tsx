'use client';

import dynamic from 'next/dynamic';

const MarketDoorsPursuitClient = dynamic(
  () => import('./MarketDoorsPursuitClient'),
  { ssr: false }
);

export default function MarketDoorsPursuitWrapper() {
  return <MarketDoorsPursuitClient />;
}
