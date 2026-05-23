import CognitiveHubClient from './CognitiveHubClient';

export const metadata = {
  title: 'Cognitive Training - Memory & Focus | SkillDrills',
  description: 'Science-based cognitive training with 16 free drills across 5 domains: Attention, Focus, Memory, Problem Solving, and Processing Speed. No sign-up.',
  keywords: [
    'cognitive training', 'brain training', 'memory games', 'focus training',
    'attention drills', 'problem solving', 'processing speed', 'reaction time',
    'working memory', 'cognitive assessment', 'brain exercises', 'mental fitness',
    'free brain games', 'cognitive enhancement', 'neuro training',
    'concentration drills', 'logic puzzles', 'cognitive psychology',
    'divided attention', 'selective attention', 'sustained attention',
    'concentration grid', 'distraction fighter', 'focus timer',
    'card matching', 'memory sequence', 'number recall', 'pattern recognition',
    'logic puzzles', 'sudoku', 'tower of hanoi', 'quick math', 'symbol matching',
    'skilldrills cognitive', 'skilldrills brain training', 'free cognitive drills',
  ],
  openGraph: {
    title: 'Cognitive Training - Memory & Focus | SkillDrills',
    description: 'Science-based cognitive training with 16 free drills across 5 domains: Attention, Focus, Memory, Problem Solving, and Processing Speed. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/cognitive',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Cognitive Brain Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cognitive Training - Memory & Focus | SkillDrills',
    description: 'Science-based cognitive training with 16 free drills across 5 domains: Attention, Focus, Memory, Problem Solving, and Processing Speed. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive',
  },
};

export default function CognitivePage() {
  return (
    <>
      
      <CognitiveHubClient />
    </>
  );
}