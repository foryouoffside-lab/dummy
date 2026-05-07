import DividedAttentionClient from './DividedAttentionClient';

export const metadata = {
  title: 'Divided Attention Drill - Dual-Task Cognitive Training',
  description: 'Train your multitasking ability by tracking moving balls while matching even numbers simultaneously. 60-second dual-task challenge with 5 lives, combo streaks, and dual scoring system.',
  keywords: [
    'divided attention', 'dual task training', 'multitasking drill',
    'cognitive training', 'attention splitting', 'visual tracking',
    'number matching', 'cognitive flexibility', 'attention span',
    'brain training game', 'multitasking test', 'divided focus',
    'dual n-back alternative', 'cognitive assessment'
  ],
  openGraph: {
    title: 'Divided Attention Drill - Dual-Task Cognitive Training',
    description: 'Master multitasking with simultaneous visual tracking and number matching. 60-second challenge with lives system, combo streaks, and dual scoring for ball hits and even number identification.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/attention/divided-attention',
  },
};

export default function DividedAttentionPage() {
  return <DividedAttentionClient />;
}