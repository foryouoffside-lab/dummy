import AimTrainerClient from './AimTrainerClient';

export const metadata = {
  title: 'Aim Trainer Elite - Mouse Accuracy & Hand-Eye Coordination Training',
  description: 'Improve your mouse aim, click accuracy, and hand-eye coordination. Dynamic targets that shrink with streak. 60-second challenge with reaction time tracking and lives system. Free, no login required.',
  keywords: [
    'aim trainer', 'mouse accuracy', 'click trainer', 'hand-eye coordination',
    'aim training', 'fps aim practice', 'reaction time test', 'target clicking',
    'mouse precision', 'aim drill', 'accuracy trainer', 'gaming aim trainer',
    'free aim trainer', 'mouse coordination', 'click speed test'
  ],
  openGraph: {
    title: 'Aim Trainer Elite - Mouse Accuracy & Coordination Training',
    description: 'Dynamic aim trainer with shrinking targets, streak tracking, reaction time measurement, and lives system. Perfect for FPS gamers and precision mouse control training.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer',
  },
};

export default function AimTrainerPage() {
  return <AimTrainerClient />;
}