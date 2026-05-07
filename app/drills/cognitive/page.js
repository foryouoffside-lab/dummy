import CognitiveHubClient from './CognitiveHubClient';

export const metadata = {
  title: 'Cognitive Brain Training - 16 Free Drills for Memory, Focus & Problem Solving',
  description: 'Science-based cognitive training with 16 free drills across 5 domains: Attention, Focus, Memory, Problem Solving, and Processing Speed. Improve working memory, concentration, logic, and reaction time. No login required.',
  keywords: [
    'cognitive training', 'brain training', 'memory games', 'focus training',
    'attention drills', 'problem solving', 'processing speed', 'reaction time',
    'working memory', 'cognitive assessment', 'brain exercises', 'mental fitness',
    'free brain games', 'cognitive enhancement', 'neuro training',
    'concentration drills', 'logic puzzles', 'cognitive psychology'
  ],
  openGraph: {
    title: 'Cognitive Brain Training - Free Memory, Focus & Problem Solving Drills',
    description: '16 science-based cognitive training drills. 5 domains: Attention, Focus, Memory, Problem Solving, and Processing Speed. Train working memory, concentration, logic, and reaction time.',
    type: 'website',
    url: 'https://skilldrills.online/drills/cognitive',
    siteName: 'Global Drill System',
    images: [{
      url: '/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Cognitive Brain Training'
    }]
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive',
  },
};

export default function CognitivePage() {
  return <CognitiveHubClient />;
}