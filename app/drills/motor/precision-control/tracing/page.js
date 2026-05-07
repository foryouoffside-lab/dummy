import TracingClient from './TracingClient';

export const metadata = {
  title: 'Fluid Filament - Wave Tracing Precision & Flow State Training',
  description: 'Master smooth cursor tracking by following a dynamic red wave filament. +1 point per second on the wave with 45px tolerance. Auto-pauses when off-wave, resumes when back. 60-second flow state challenge. Free, no login.',
  keywords: [
    'wave tracing', 'cursor tracking', 'flow state training', 'smooth movement',
    'filament tracing', 'mouse precision', 'wave following drill', 'motor control',
    'hand steadiness', 'tracking accuracy', 'precision motor training',
    'dynamic wave tracking', 'free tracing drill', 'cursor control practice',
    'flow state drill'
  ],
  openGraph: {
    title: 'Fluid Filament - Wave Tracing & Flow State Training',
    description: 'Follow a dynamic scrolling red wave filament with your cursor. +1 point per second on the wave. 45px tolerance zone. Two waveform modes: Pulse and Harmonic. 60-second flow state challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/precision-control/tracing',
  },
};

export default function TracingPage() {
  return <TracingClient />;
}