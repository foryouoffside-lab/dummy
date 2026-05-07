import SpeedDrillClient from './SpeedDrillClient';

export const metadata = {
  title: 'Speed Drill Elite - Reaction Time & Precision Clicking Training',
  description: 'Click shrinking rings before they disappear. Adaptive velocity increases with streaks. 3-life protection system with no timeout penalty. 60-second reaction speed challenge with performance metrics.',
  keywords: [
    'speed drill', 'reaction time training', 'precision clicking game',
    'shrinking ring drill', 'click speed test', 'reflex training game',
    'adaptive velocity drill', 'reaction speed practice', 'free aim trainer',
    'click accuracy game', 'speed clicking challenge', 'reaction time test',
    'precision motor skills', 'hand-eye coordination speed', 'reflex improvement'
  ],
  openGraph: {
    title: 'Speed Drill Elite - Reaction Time & Precision Clicking',
    description: 'Click shrinking rings with adaptive velocity. 3-life protection, no timeout penalty. Track reaction time, accuracy, and streak performance. 60-second challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Fitness/speed-drill',
  },
};

export default function SpeedDrillPage() {
  return <SpeedDrillClient />;
}