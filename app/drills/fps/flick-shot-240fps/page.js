import FlickShot240Client from './FlickShot240Client';

export const metadata = {
  title: 'Flick Shot 240FPS Drill - Adaptive Speed FPS Aim & Reflex Training',
  description: 'Master flick shots at 240FPS with adaptive target windows (150-1000ms). Window shrinks with fast hits and expands on misses. Timer ring shows remaining time (Green→Yellow→Red). 5 lives system with penalty scoring. 60-second challenge.',
  keywords: [
    'flick shot 240fps', 'adaptive flick drill', 'FPS flick training', 'aim trainer flick',
    'speed flick practice', 'reflex flick training', 'target window aim', 'FPS aim drill',
    'flick shot accuracy', 'adaptive window trainer', 'reaction flick test', 'free aim trainer',
    '240fps flick shots', 'timer ring aim drill'
  ],
  openGraph: {
    title: 'Flick Shot 240FPS Drill - Adaptive Speed Aim Training',
    description: 'White targets with adaptive shrinking window (150-1000ms). Timer ring visual feedback (green→yellow→red). Window shrinks with fast hits, expands on misses. 5 lives with penalty scoring.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/flick-shot-240fps',
  },
};

export default function FlickShot240Page() {
  return <FlickShot240Client />;
}