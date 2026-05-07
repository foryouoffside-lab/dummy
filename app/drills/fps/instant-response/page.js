import InstantResponseClient from './InstantResponseClient';

export const metadata = {
  title: 'Instant Response Drill - Reaction Speed & Adaptive Window Training',
  description: 'Test pure reaction speed with center-flash targets at random 0.8-2.5s intervals. Adaptive window shrinks to 80ms with fast hits, expands on misses. 5 lives with penalty scoring. 60-second FPS reflex challenge.',
  keywords: [
    'instant response drill', 'reaction speed test', 'adaptive window training',
    'FPS reflex drill', 'center flash reaction', 'pure reaction time',
    'response window training', 'reaction click test', 'FPS reaction practice',
    'instant reflex drill', 'adaptive reaction training', 'free reaction test',
    'speed response drill', 'reaction time improvement'
  ],
  openGraph: {
    title: 'Instant Response Drill - Reaction Speed & Adaptive Window',
    description: 'Center-flash targets at random intervals with adaptive 80-1200ms window. Window shrinks with fast hits, expands on misses. 5 lives system. Pure reaction speed training.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/instant-response',
  },
};

export default function InstantResponsePage() {
  return <InstantResponseClient />;
}