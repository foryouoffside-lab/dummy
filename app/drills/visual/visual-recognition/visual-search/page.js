import VisualSearchClient from './VisualSearchClient';

export const metadata = {
  title: 'Visual Search - Conjunctive Search & Visual Scanning Training',
  description: 'Train visual scanning and selective attention by finding the letter C among O distractors in a 16×10 grid. +1 point per correct find, -1 for wrong clicks. 60-second challenge with streak bonuses and search time tracking.',
  keywords: [
    'visual search', 'conjunctive search', 'visual scanning training',
    'find the letter', 'selective attention drill', 'visual discrimination',
    'letter search game', 'visual processing speed', 'attention to detail',
    'feature search', 'visual search paradigm', 'cognitive training',
    'free visual search test', 'concentration grid'
  ],
  openGraph: {
    title: 'Visual Search - Conjunctive Search & Visual Scanning Training',
    description: 'Find the letter C among 160 O distractors in a 16×10 grid. +1 point per correct find, -1 for wrong clicks. 60-second challenge with streak bonuses and search time tracking.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/visual-recognition/visual-search',
  },
};

export default function VisualSearchPage() {
  return <VisualSearchClient />;
}