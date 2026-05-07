import DifferenceSpotterClient from './DifferenceSpotterClient';

export const metadata = {
  title: 'Difference Spotter - Visual Change Detection & Recognition Training',
  description: 'Train visual change detection by spotting differences in object arrays. Study 5 objects, detect position/color changes after blink. Adaptive study time (2-5s). 60-second challenge with 3 lives and streak bonuses.',
  keywords: [
    'difference spotter', 'change detection', 'visual recognition training',
    'spot the difference', 'change blindness test', 'visual memory drill',
    'object change detection', 'visual comparison game', 'attention to detail',
    'visual discrimination', 'pattern change detection', 'cognitive training',
    'free visual recognition test', 'change spotting drill'
  ],
  openGraph: {
    title: 'Difference Spotter - Visual Change Detection Training',
    description: 'Study 5 objects, then spot which one changed position or color after a blink. Adaptive study time (2-5s). 60-second challenge with 3 lives, streak bonuses, and detection speed tracking.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/visual-recognition/difference-spotter',
  },
};

export default function DifferenceSpotterPage() {
  return <DifferenceSpotterClient />;
}