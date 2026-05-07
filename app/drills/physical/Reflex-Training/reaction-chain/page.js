import ReactionChainClient from './ReactionChainClient';

export const metadata = {
  title: 'Kinetic Arrest - Precision Stopping & Impulse Control Training',
  description: 'Arrest moving nodes by stopping your cursor precisely over them. No penalties for misses - only positive scoring. Fullscreen doubles nodes and speed. 60-second precision stopping challenge.',
  keywords: [
    'kinetic arrest', 'precision stopping game', 'impulse control training',
    'cursor stopping drill', 'motor inhibition practice', 'reaction chain game',
    'stop cursor challenge', 'precision timing test', 'free impulse control game',
    'motor control stopping', 'reaction inhibition training', 'speed arrest drill',
    'stopping accuracy practice', 'kinetic control game', 'fullscreen reflex challenge'
  ],
  openGraph: {
    title: 'Kinetic Arrest - Precision Stopping & Impulse Control',
    description: 'Stop your cursor on moving nodes to arrest them. No penalties for misses. Fullscreen mode doubles nodes and speed. 60-second precision stopping challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Reflex-Training/reaction-chain',
  },
};

export default function ReactionChainPage() {
  return <ReactionChainClient />;
}