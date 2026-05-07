import StabilityChallengeClient from './StabilityChallengeClient';

export const metadata = {
  title: 'Gravitational Stability - Kinetic Resistance & Balance Training',
  description: 'Resist simulated wind forces to keep your cursor centered. Earn points for sustained stability as difficulty increases. Pure positive scoring with no penalties. 60-second adaptive challenge.',
  keywords: [
    'gravitational stability', 'kinetic resistance training', 'balance challenge',
    'stability drill', 'wind resistance game', 'cursor control training',
    'motor control exercise', 'adaptive difficulty balance', 'stability test',
    'hand-eye coordination', 'force resistance training', 'free balance game',
    'stability metrics', 'motor skills challenge', 'anti-gravity training'
  ],
  openGraph: {
    title: 'Gravitational Stability - Kinetic Resistance Balance Training',
    description: 'Resist randomly shifting wind forces to keep your cursor centered. Earn +1 point every 0.5 seconds of stability. Adaptive difficulty increases as you improve. No penalties.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Balance-Training/stability-challenge',
  },
};

export default function StabilityChallengePage() {
  return <StabilityChallengeClient />;
}