import DeepWorkLabClient from './DeepWorkLabClient';

export const metadata = {
  title: 'Deep Work Lab - Focus Endurance & Sustained Attention Training',
  description: 'Train deep focus by tracking a moving ring with your cursor. Earn +1 point per second of sustained focus, lose -1 point for distractions. 60-second challenge with real-time focus meter and peak focus tracking.',
  keywords: [
    'deep work training', 'focus endurance', 'sustained attention',
    'concentration drill', 'focus training', 'attention span training',
    'deep focus exercise', 'productivity training', 'focus meter',
    'distraction resistance', 'flow state training', 'cognitive endurance',
    'focus stamina', 'attention control', 'free focus training'
  ],
  openGraph: {
    title: 'Deep Work Lab - Focus Endurance & Attention Training',
    description: 'Track a moving ring to train sustained attention. +1pt per second of focus, -1pt for distractions. Real-time focus meter with peak tracking. 60-second challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/focus-endurance/deep-work',
  },
};

export default function DeepWorkLabPage() {
  return <DeepWorkLabClient />;
}