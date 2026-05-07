import JumpSequenceClient from './JumpSequenceClient';

export const metadata = {
  title: 'Jump Sequence - Precision Jumping & Trajectory Control Training',
  description: 'Charge and launch a ball toward targets with precision trajectory control. Click-hold to charge power, release to jump, steer mid-air with your mouse. 60-second challenge with streak bonuses.',
  keywords: [
    'jump sequence', 'precision jumping game', 'trajectory control training',
    'charge and launch drill', 'motor control jumping', 'aim training game',
    'projectile control practice', 'jump accuracy test', 'free jumping drill',
    'hand-eye coordination jump', 'charged jump practice', 'trajectory aiming',
    'precision motor skills', 'jump timing training', 'ball launching game'
  ],
  openGraph: {
    title: 'Jump Sequence - Precision Jumping & Trajectory Training',
    description: 'Click-hold to charge, release to launch, steer mid-air. Land on targets for points. 60-second challenge with combo streaks and direct miss penalties.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Fitness/jump-sequence',
  },
};

export default function JumpSequencePage() {
  return <JumpSequenceClient />;
}