import AwarenessDrillClient from './AwarenessDrillClient';

export const metadata = {
  title: '180° Awareness Drill - FPS Peripheral Vision & Reaction Training',
  description: 'Train extreme peripheral vision with edge-spawning targets. 60-second FPS awareness challenge with 5 lives, combo streaks, and reaction time tracking. Improve your 180-degree field awareness for gaming.',
  keywords: [
    '180 degree awareness', 'FPS awareness training', 'peripheral vision FPS',
    'aim training peripheral', 'gaming awareness drill', 'reaction time FPS',
    'edge target training', 'field of view training', 'FPS aim drill',
    'peripheral reaction test', 'gaming vision training', '180 degree FPS drill',
    'awareness trainer', 'free FPS training'
  ],
  openGraph: {
    title: '180° Awareness Drill - FPS Peripheral Vision Training',
    description: 'Targets spawn at extreme screen edges to train your 180-degree peripheral awareness. 5 lives system, combo streaks, and reaction time tracking. Essential FPS gaming skill.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/180-degree-awareness',
  },
};

export default function AwarenessDrillPage() {
  return <AwarenessDrillClient />;
}