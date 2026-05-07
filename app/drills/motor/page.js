import MotorDrillsClient from './MotorDrillsClient';

export const metadata = {
  title: 'Motor Skills Drills - Hand-Eye Coordination, Timing, Precision & Speed Training',
  description: 'Free motor skills training with 12 drills across Hand-Eye Coordination, Timing Accuracy, Precision Control, and Movement Speed. Improve mouse aim, timing, steady hand, and reaction speed. No login required.',
  keywords: [
    'motor skills drills', 'hand-eye coordination training', 'timing accuracy practice',
    'precision control drills', 'movement speed training', 'aim trainer', 'click accuracy',
    'rhythm tap', 'stopwatch timing', 'synchronization drill', 'steady hand maze',
    'fine motor control', 'tracing practice', 'rapid tapping', 'finger sequencing',
    'gesture speed', 'free motor training', 'mouse skills', 'reaction training'
  ],
  openGraph: {
    title: 'Motor Skills Drills - Free Hand-Eye Coordination & Timing Training',
    description: '12 free motor skills drills covering Hand-Eye Coordination, Timing Accuracy, Precision Control, and Movement Speed. Track progress, improve skills. No login required.',
    type: 'website',
    url: 'https://skilldrills.online/drills/motor',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor',
  },
};

export default function MotorDrillsPage() {
  return <MotorDrillsClient />;
}