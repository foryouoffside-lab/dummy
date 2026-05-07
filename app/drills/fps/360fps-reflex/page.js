import ReactiveStrafeClient from './ReactiveStrafeClient';

export const metadata = {
  title: 'Reactive Strafe Tracking - FPS Aim & Target Following Training',
  description: 'Master horizontal target tracking with adaptive speed. Zone-based scoring: Perfect (1pt), Good (0.5pt), Edge (0.25pt). Speed adapts to your accuracy. No penalties - pure score building with combo streaks.',
  keywords: [
    'reactive strafe tracking', 'FPS tracking drill', 'aim tracking training',
    'target following practice', 'horizontal strafe aim', 'tracking accuracy FPS',
    'adaptive speed tracking', 'aim trainer strafe', 'FPS aim drill',
    'reactive tracking test', 'mouse tracking practice', 'gaming aim training',
    'free aim trainer', 'strafe tracking drill'
  ],
  openGraph: {
    title: 'Reactive Strafe Tracking - FPS Aim & Target Following',
    description: 'Track a horizontally strafing target with adaptive speed. Zone-based scoring rewards precision. No penalties - perfect for building tracking consistency and mouse control.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/reactive-tracking',
  },
};

export default function ReactiveStrafePage() {
  return <ReactiveStrafeClient />;
}