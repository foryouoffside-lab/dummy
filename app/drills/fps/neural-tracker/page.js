import NeuralTrackerClient from './NeuralTrackerClient';

export const metadata = {
  title: 'Neural Tracker - Smooth Target Following & Continuous Aim Training',
  description: 'Master smooth target tracking with 5 bouncing balls. Track the green target continuously - 2 seconds of 60%+ accuracy earns +1 point. No penalties, pure positive training with combo streaks. Collision physics for realistic movement.',
  keywords: [
    'neural tracker', 'smooth tracking drill', 'continuous aim training',
    'target following practice', 'smooth aim FPS', 'tracking accuracy drill',
    'bouncing ball tracking', 'continuous tracking FPS', 'mouse tracking practice',
    'smooth aim trainer', 'precision tracking drill', 'free tracking trainer',
    'collision physics aim', 'positive reinforcement training'
  ],
  openGraph: {
    title: 'Neural Tracker - Smooth Target Following & Continuous Aim',
    description: 'Track a green target among 5 bouncing balls with collision physics. 2 seconds of 60%+ accuracy = +1 point. No penalties, combo streaks, and real-time accuracy feedback.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/neural-tracker',
  },
};

export default function NeuralTrackerPage() {
  return <NeuralTrackerClient />;
}