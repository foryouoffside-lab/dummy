import AnchorFlickClient from './AnchorFlickClient';

export const metadata = {
  title: 'Anchor Flick Drill - Distance-Based Flick Aim & Precision Training',
  description: 'Master flick shots by clicking an anchor then flicking to a green target. Tracks flick distance in pixels. 5 lives system with penalty scoring. Anchor→Flick→Repeat cycle. 60-second FPS challenge.',
  keywords: [
    'anchor flick drill', 'distance flick training', 'flick aim practice',
    'anchor to target flick', 'flick distance tracker', 'FPS flick drill',
    'precision flick training', 'anchor based aim', 'flick shot distance',
    'flick accuracy drill', 'FPS aim practice', 'free flick trainer',
    'pixel distance flick', 'anchor target drill'
  ],
  openGraph: {
    title: 'Anchor Flick Drill - Distance-Based Flick Aim Training',
    description: 'Click the white anchor to spawn a green target, then flick to hit it. Tracks flick distance in pixels. 5 lives with penalty scoring. Build combo streaks. Anchor→Flick→Repeat.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/flick-training',
  },
};

export default function AnchorFlickPage() {
  return <AnchorFlickClient />;
}