import KineticTrainerClient from './KineticTrainerClient';

export const metadata = {
  title: 'Kinetic Trainer - Bouncing Target Speed & Prediction Aim Drill',
  description: 'Track and click a bouncing green target that teleports randomly and accelerates with combos. No lives or penalties - pure score building. Speed increases up to 60px/s. 60-second FPS tracking challenge.',
  keywords: [
    'kinetic trainer', 'bouncing target aim', 'moving target practice',
    'prediction aim drill', 'tracking speed trainer', 'FPS moving target',
    'kinetic aim training', 'bouncing ball aim', 'speed tracking drill',
    'target prediction FPS', 'free aim trainer kinetic', 'moving target clicker',
    'FPS tracking practice', 'combo speed aim'
  ],
  openGraph: {
    title: 'Kinetic Trainer - Bouncing Target Speed & Prediction Drill',
    description: 'Green bouncing target with wall physics, random teleports, and accelerating speed. No lives or penalties - pure score building with combo streaks up to 5x bonuses.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/high-speed-kinetic-trainer',
  },
};

export default function KineticTrainerPage() {
  return <KineticTrainerClient />;
}