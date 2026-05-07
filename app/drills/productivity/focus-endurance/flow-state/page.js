import FlowInductionClient from './FlowInductionClient';

export const metadata = {
  title: 'Flow Induction - Flow State Training & Deep Concentration Practice',
  description: 'Achieve flow state by tracking a moving ring with your cursor. Earn +1 point per 0.5 seconds of flow, lose -1 for distractions. Ring speeds up with streaks. 60-second challenge with flow meter and peak tracking.',
  keywords: [
    'flow state training', 'flow induction', 'deep concentration',
    'flow experience', 'focus flow', 'concentration flow',
    'peak performance training', 'cognitive flow', 'mental flow state',
    'zone training', 'flow state drill', 'attention flow',
    'optimal experience', 'flow psychology', 'free flow training'
  ],
  openGraph: {
    title: 'Flow Induction - Flow State & Deep Concentration Training',
    description: 'Track a moving ring to enter flow state. +1pt per 0.5s of flow, streaks increase ring speed. Flow meter with peak tracking. 60-second challenge for optimal experience training.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/focus-endurance/flow-state',
  },
};

export default function FlowInductionPage() {
  return <FlowInductionClient />;
}