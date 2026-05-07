import DynamicBalanceClient from './DynamicBalanceClient';

export const metadata = {
  title: 'Dynamic Balance Elite - Motor Control & Tracking Precision Training',
  description: 'Train hand-eye coordination and motor control by tracking a moving target with your cursor. Lissajous trajectory pattern. Earn points for sustained tracking. 60-second challenge with accuracy metrics.',
  keywords: [
    'dynamic balance training', 'motor control drill', 'hand-eye coordination',
    'tracking precision', 'cursor tracking game', 'motor skills training',
    'balance coordination exercise', 'fine motor control', 'target tracking',
    'physical therapy exercise', 'reaction training', 'precision movement',
    'balance drill', 'coordination training', 'free motor skills test'
  ],
  openGraph: {
    title: 'Dynamic Balance Elite - Motor Control & Tracking Training',
    description: 'Track a Lissajous-trajectory target with your cursor. Build tracking streaks for points. 60-second challenge to test and improve motor control precision.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Balance-Training/dynamic-balance',
  },
};

export default function DynamicBalancePage() {
  return <DynamicBalanceClient />;
}