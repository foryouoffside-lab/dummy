import SynchronizationClient from './SynchronizationClient';

export const metadata = {
  title: 'Synchronization Elite - Bar Alignment Timing & Convergence Training',
  description: 'Master timing precision by clicking when converging bars align at the center line. Variable velocity 400-1200 px/s. 3 lives protect your score. 60-second challenge with streak bonuses. Free, no login.',
  keywords: [
    'synchronization training', 'bar alignment', 'convergence timing', 'timing precision',
    'visual synchronization', 'motor timing drill', 'bar convergence', 'reaction alignment',
    'synchronization elite', 'timing accuracy test', 'visual motor sync',
    'free timing drill', 'precision convergence', 'alignment training'
  ],
  openGraph: {
    title: 'Synchronization Elite - Bar Alignment Timing Training',
    description: 'Click when converging bars align at center. Variable velocity 400-1200px/s. 3 lives protect your score. 60-second challenge with streak bonuses and perfect sync tracking.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/timing-accuracy/synchronization',
  },
};

export default function SynchronizationPage() {
  return <SynchronizationClient />;
}