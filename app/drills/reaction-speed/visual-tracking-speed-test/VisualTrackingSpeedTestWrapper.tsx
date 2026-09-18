'use client';

import VisualTrackingSpeedTestClient, { VisualTrackingSpeedTestClientProps } from './VisualTrackingSpeedTestClient';

export default function VisualTrackingSpeedTestWrapper(props: VisualTrackingSpeedTestClientProps) {
  return <VisualTrackingSpeedTestClient {...props} />;
}
