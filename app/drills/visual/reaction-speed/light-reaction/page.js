import StrobeLatencyClient from './StrobeLatencyClient';

export const metadata = {
  title: 'Strobe-Latency Lab - Light Reaction Speed & Reflex Training',
  description: 'Test your visual reaction speed by clicking when a center ball flashes white. Adaptive window tightens with success (100-200ms). 60-second challenge with 3 lives, 5-streak bonuses, and reaction time tracking.',
  keywords: [
    'light reaction test', 'visual reaction speed', 'reaction time drill',
    'strobe latency', 'reflex training', 'visual stimulus reaction',
    'reaction speed game', 'light flash test', 'simple reaction time',
    'visual reflex training', 'reaction window training', 'speed test',
    'free reaction time test', 'strobe latency lab'
  ],
  openGraph: {
    title: 'Strobe-Latency Lab - Light Reaction Speed Training',
    description: 'Click when the center ball flashes white. Adaptive 100-200ms window tightens with success. 60-second challenge with 3 lives, 5-streak bonuses, and reaction time tracking.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/reaction-speed/light-reaction',
  },
};

export default function StrobeLatencyPage() {
  return <StrobeLatencyClient />;
}