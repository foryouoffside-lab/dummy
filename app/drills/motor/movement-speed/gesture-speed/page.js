import GestureSpeedClient from './GestureSpeedClient';

export const metadata = {
  title: 'Vector Recoil - Flick & Return Gesture Speed Training',
  description: 'Train rapid flick-and-return mouse gestures. Click gates within 350ms then return to center for +1 point per cycle. 60-second challenge with 3 lives and streak tracking. Free, no login required.',
  keywords: [
    'gesture speed', 'flick training', 'mouse gesture', 'rapid movement',
    'flick and return', 'motor speed drill', 'vector recoil', 'mouse speed test',
    'gesture precision', 'rapid mouse movement', 'movement speed training',
    'flick accuracy', 'free motor drill', 'reflex training', 'speed gesture'
  ],
  openGraph: {
    title: 'Vector Recoil - Flick & Return Gesture Speed Training',
    description: 'Click gates within 350ms then return to center. 3 lives protect your score. Complete cycles earn +1 point. 60-second challenge with streak bonuses.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/movement-speed/gesture-speed',
  },
};

export default function GestureSpeedPage() {
  return <GestureSpeedClient />;
}