import PredictiveTrackingClient from './PredictiveTrackingClient';

export const metadata = {
  title: 'Predictive Tracking Drill - Enemy Movement Anticipation & Lead Aim Training',
  description: 'Master predictive aim by clicking where the target WILL be, not where it is. Velocity arrow and dashed prediction line show 12-frame lead. Shatter effects confirm hits. 5 lives with penalty scoring. 60-second FPS challenge.',
  keywords: [
    'predictive tracking', 'lead aim training', 'movement anticipation drill',
    'predictive aim FPS', 'enemy prediction practice', 'leading shots training',
    'velocity prediction drill', 'target leading aim', 'FPS prediction trainer',
    'movement reading drill', 'predictive click training', 'free aim prediction',
    'lead aim practice', 'anticipation tracking FPS'
  ],
  openGraph: {
    title: 'Predictive Tracking Drill - Enemy Movement Anticipation Training',
    description: 'Click the green prediction circle 12 frames ahead of a moving ghost target. Velocity arrow and dashed line show the predicted path. Shatter effects on hit. 5 lives with penalty scoring.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/predictive-tracking',
  },
};

export default function PredictiveTrackingPage() {
  return <PredictiveTrackingClient />;
}