import FingerSequencingClient from './FingerSequencingClient';

export const metadata = {
  title: 'Fractal Link - Finger Sequencing Speed & Precision Motor Training',
  description: 'Train rapid finger sequencing by clicking nodes from largest to smallest within 2 seconds. 3-chain sequences with pulsing active node indicators. 60-second challenge with lives protection and streak tracking. Free, no login.',
  keywords: [
    'finger sequencing', 'motor sequencing', 'rapid clicking', 'finger speed training',
    'sequence training', 'motor control drill', 'click order practice', 'precision sequencing',
    'finger dexterity', 'chain clicking', 'motor learning', 'sequencing speed',
    'free motor drill', 'finger coordination', 'rapid targeting'
  ],
  openGraph: {
    title: 'Fractal Link - Finger Sequencing Speed Training',
    description: 'Click 3 nodes in size order within 2 seconds per chain. Active node pulses green with dashed guide lines. 60-second challenge with 3 lives and streak bonuses.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing',
  },
};

export default function FingerSequencingPage() {
  return <FingerSequencingClient />;
}