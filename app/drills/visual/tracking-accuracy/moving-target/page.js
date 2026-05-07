import KineticInterceptClient from './KineticInterceptClient';

export const metadata = {
  title: 'Kinetic Intercept - Moving Target Tracking & Aim Training',
  description: 'Train hand-eye coordination by clicking fast-moving white targets that spawn from screen edges. 60-second challenge with 3 lives, 5-streak bonuses, and adaptive 12-22 speed targets. Track hit accuracy.',
  keywords: [
    'moving target training', 'target tracking drill', 'aim training',
    'hand-eye coordination', 'moving target clicking', 'tracking accuracy',
    'reflex aim training', 'target interception', 'mouse accuracy drill',
    'kinetic intercept', 'moving ball click', 'tracking speed test',
    'free aim trainer', 'coordination drill'
  ],
  openGraph: {
    title: 'Kinetic Intercept - Moving Target Tracking & Aim Training',
    description: 'Click fast-moving white targets spawning from edges at 12-22 speed. 60-second challenge with 3 lives, 5-streak bonuses, and hit tracking. Cursor turns green on target.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/tracking-accuracy/moving-target',
  },
};

export default function KineticInterceptPage() {
  return <KineticInterceptClient />;
}