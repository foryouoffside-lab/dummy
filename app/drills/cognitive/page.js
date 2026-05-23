import CognitiveHubClient from './CognitiveHubClient';

export const metadata = {
  title: 'Cognitive Brain Training - Memory, Focus & Problem Solving | SkillDrills',
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
    title: 'Cognitive Brain Training - Free Memory & Focus Drills | SkillDrills',
    description: '16 science-based cognitive training drills. 5 domains: Attention, Focus, Memory, Problem Solving, and Processing Speed. Free, no sign-up.',
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
    title: 'Cognitive Brain Training | SkillDrills',
    description: '16 free cognitive drills. Memory, focus, problem solving. No sign-up.',
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
      <noscript>
        <h1>Cognitive Brain Training - 16 Free Drills for Memory, Focus & Problem Solving</h1>
        <p>Science-based cognitive training with 16 free drills across 5 domains. No sign-up required.</p>
      </noscript>
      <CognitiveHubClient />
    </>
  );
}