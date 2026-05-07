import SingleLegEquilibriumClient from './SingleLegEquilibriumClient';

export const metadata = {
  title: 'Single Leg Equilibrium - Balance Stability & Motor Control Training',
  description: 'Train balance stability by maintaining a link between cursor and bouncing anchor point. Earn points for sustained connection. 60-second challenge with stability metrics and penalty tracking.',
  keywords: [
    'single leg balance', 'equilibrium training', 'balance stability drill',
    'motor control exercise', 'cursor tracking stability', 'balance game',
    'hand-eye coordination training', 'stability practice', 'balance test',
    'motor skills assessment', 'reaction balance training', 'free balance drill',
    'stability metrics', 'coordination exercise', 'balance challenge'
  ],
  openGraph: {
    title: 'Single Leg Equilibrium - Balance Stability Training',
    description: 'Maintain a link between your cursor and a bouncing anchor point. Earn +1 point every 2 seconds connected. Track stability percentage and streak performance in a 60-second challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Balance-Training/single-leg-hold',
  },
};

export default function SingleLegEquilibriumPage() {
  return <SingleLegEquilibriumClient />;
}