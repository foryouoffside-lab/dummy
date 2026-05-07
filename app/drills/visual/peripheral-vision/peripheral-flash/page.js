import PeripheralFlashClient from './PeripheralFlashClient';

export const metadata = {
  title: 'Peripheral Flash - Vision Training & Reaction Speed Drill',
  description: 'Train your peripheral vision by detecting flashes in 8 directions while fixating on center. 60-second challenge with 3 lives, 5-streak bonuses, and adaptive difficulty. Track reaction time and accuracy.',
  keywords: [
    'peripheral flash', 'peripheral vision training', 'reaction time test',
    'visual field training', 'peripheral detection', 'flash detection drill',
    'vision training game', 'peripheral awareness', 'visual reaction speed',
    'eye training drill', 'peripheral vision exercise', 'visual processing',
    'free vision training', 'reaction speed drill'
  ],
  openGraph: {
    title: 'Peripheral Flash - Vision Training & Reaction Speed Drill',
    description: 'Detect flashes in 8 directions while fixating on center. Adaptive difficulty with 3 lives and 5-streak bonuses. Track reaction time and accuracy in a 60-second challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash',
  },
};

export default function PeripheralFlashPage() {
  return <PeripheralFlashClient />;
}