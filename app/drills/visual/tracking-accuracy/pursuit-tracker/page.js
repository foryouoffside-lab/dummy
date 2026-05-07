import AutoPursuitClient from './AutoPursuitClient';

export const metadata = {
  title: 'Auto-Pursuit - Smooth Pursuit Eye Tracking & Coordination Training',
  description: 'Train smooth pursuit tracking by following a randomly moving target with your cursor. +1 point every 0.5 seconds of continuous tracking. 60-second challenge with accuracy tracking and streak records.',
  keywords: [
    'pursuit tracking', 'smooth pursuit training', 'eye tracking drill',
    'cursor tracking practice', 'hand-eye coordination', 'continuous tracking',
    'moving target follow', 'tracking accuracy test', 'visual pursuit',
    'smooth pursuit drill', 'target following practice', 'coordination training',
    'free pursuit tracker', 'visual motor training'
  ],
  openGraph: {
    title: 'Auto-Pursuit - Smooth Pursuit Tracking Training',
    description: 'Keep your cursor on a randomly moving target. +1 point every 0.5 seconds of tracking. 60-second challenge with accuracy, streak records, and jitter for predictive training.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker',
  },
};

export default function AutoPursuitPage() {
  return <AutoPursuitClient />;
}