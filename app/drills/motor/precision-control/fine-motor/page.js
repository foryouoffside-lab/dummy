import FineMotorClient from './FineMotorClient';

export const metadata = {
  title: 'Calibrated Dynamic Flow - Fine Motor Precision & Path Tracking Training',
  description: 'Master fine motor control by tracking a dynamically scrolling wave path. +1 point per second on path with no penalties. 60-second challenge with Dynamic and Extreme phases. Free, no login required.',
  keywords: [
    'fine motor control', 'path tracking', 'mouse precision', 'steady hand training',
    'precision tracking', 'motor accuracy drill', 'hand steadiness', 'cursor control',
    'wave tracking', 'fine motor skills', 'mouse control practice', 'smooth movement',
    'free motor drill', 'precision motor training', 'hand-eye tracking'
  ],
  openGraph: {
    title: 'Calibrated Dynamic Flow - Fine Motor Precision Training',
    description: 'Track a scrolling wave path with your cursor. +1 point per second on path. Two phases: Dynamic (0-30s) and Extreme (30-60s). No penalties - pure flow state training.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/precision-control/fine-motor',
  },
};

export default function FineMotorPage() {
  return <FineMotorClient />;
}