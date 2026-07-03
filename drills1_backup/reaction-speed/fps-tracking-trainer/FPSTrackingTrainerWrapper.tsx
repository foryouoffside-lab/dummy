'use client';

import dynamic from 'next/dynamic';

const FPSTrackingTrainerClient = dynamic(
  () => import('./FPSTrackingTrainerClient'),
  { ssr: false }
);

export default function FPSTrackingTrainerWrapper() {
  return <FPSTrackingTrainerClient />;
}
