import CrossBodyMovementClient from './CrossBodyMovementClient';

export const metadata = {
  title: 'Linear Cross-Body Drill - Bilateral Coordination & Motor Control Training',
  description: 'Train bilateral coordination by connecting nodes across the screen along straight vector paths. Earn +5 points per successful connection. 60-second challenge with streak tracking and no penalties.',
  keywords: [
    'cross body movement', 'bilateral coordination', 'linear movement drill',
    'motor control training', 'node connection game', 'hand-eye coordination',
    'cross body exercise', 'motor skills practice', 'coordination drill',
    'bilateral integration', 'movement accuracy test', 'free coordination game',
    'vector path training', 'motor precision', 'cross lateral training'
  ],
  openGraph: {
    title: 'Linear Cross-Body Drill - Bilateral Coordination Training',
    description: 'Connect nodes across the screen along straight vector paths. +5 points per connection. Train bilateral coordination with streak bonuses. 60-second timed challenge with no penalties.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Coordination/cross-body-movement',
  },
};

export default function CrossBodyMovementPage() {
  return <CrossBodyMovementClient />;
}