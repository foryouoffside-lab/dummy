import SingleTargetTrackClient from './SingleTargetTrackClient';

export const metadata = {
  title: 'Single Target Track Drill - Precision Smooth Aim & Lock-On Training',
  description: 'Track a single target that glows green when your cursor is on it. +1 point per 200ms of direct tracking. Arrow indicator shows movement direction when off-target. Lock/unlock sound feedback. No penalties - pure positive aim training.',
  keywords: [
    'single target track', 'precision aim drill', 'smooth tracking practice',
    'lock-on aim training', 'cursor tracking drill', 'FPS aim practice',
    'target following exercise', 'mouse precision training', 'tracking accuracy FPS',
    'green target tracking', 'arrow direction indicator', 'free aim trainer',
    'lock-on feedback', 'smooth mouse control'
  ],
  openGraph: {
    title: 'Single Target Track Drill - Precision Smooth Aim Training',
    description: 'Track a bouncing target that glows green on lock-on. +1pt per 200ms of tracking. Arrow shows direction when off-target. Lock/unlock sounds. 10x streak bonuses. No penalties.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/single-target-track',
  },
};

export default function SingleTargetTrackPage() {
  return <SingleTargetTrackClient />;
}