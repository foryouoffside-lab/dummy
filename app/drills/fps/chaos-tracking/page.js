import PeripheralTrackingClient from './PeripheralTrackingClient';

export const metadata = {
  title: 'Peripheral Tracking - Dual Target FPS Awareness & Vision Training',
  description: 'Train peripheral vision by tracking two moving targets simultaneously. Focus on the cyan primary target while tracking the magenta secondary with peripheral vision. 0.5s tracking = 1 point. 60-second challenge with combo streaks.',
  keywords: [
    'peripheral tracking', 'dual target tracking', 'FPS peripheral vision',
    'multi-target awareness', 'peripheral vision training', 'tracking drill FPS',
    'dual sphere tracking', 'vision training FPS', 'spatial awareness drill',
    'peripheral focus training', 'gaming vision drill', 'free aim trainer',
    'peripheral awareness FPS', 'multi target aim training'
  ],
  openGraph: {
    title: 'Peripheral Tracking - Dual Target FPS Vision Training',
    description: 'Track cyan (focus) and magenta (peripheral) targets simultaneously. Earn 1 point per 0.5s of accurate tracking. Build combo streaks up to 10x. Essential FPS peripheral awareness training.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/peripheral-awareness',
  },
};

export default function PeripheralTrackingPage() {
  return <PeripheralTrackingClient />;
}