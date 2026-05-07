import ProFlickClient from './ProFlickClient';

export const metadata = {
  title: 'Pro Flick Drill - 400ms Target Speed & Precision Flick Training',
  description: 'Master rapid flick shots with 400ms disappearing targets spawning every 500ms. 5 lives system with penalty scoring. Track reaction time, combo streaks, and accuracy. 60-second FPS flick challenge.',
  keywords: [
    'pro flick drill', '400ms targets', 'flick aim practice', 'speed aim drill',
    'rapid flick shots', 'FPS flick training', 'target acquisition speed',
    'flick accuracy training', 'fast aim trainer', 'reaction flick test',
    'FPS aim practice', 'free flick trainer', 'speed target drill',
    'precision flick training'
  ],
  openGraph: {
    title: 'Pro Flick Drill - 400ms Target Speed & Precision Training',
    description: 'Targets appear for 400ms with new spawns every 500ms. 5 lives system with penalty scoring. Master rapid flick shots essential for FPS gaming.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/flick-training',
  },
};

export default function ProFlickPage() {
  return <ProFlickClient />;
}