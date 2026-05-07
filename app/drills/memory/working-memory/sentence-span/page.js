import SentenceSpanClient from './SentenceSpanClient';

export const metadata = {
  title: 'Sentence Span Drill - Working Memory & Verbal Processing Training',
  description: 'Train verbal working memory by reading sentences and recalling key nouns. Progressive difficulty with 30 unique sentences. Level-based scoring with 70% accuracy threshold. 60-second timed challenge with no penalties.',
  keywords: [
    'sentence span', 'verbal working memory', 'sentence recall drill',
    'reading span task', 'verbal memory training', 'sentence memory test',
    'working memory span', 'noun recall drill', 'verbal processing memory',
    'sentence comprehension memory', 'reading memory span', 'verbal working memory test',
    'free memory drill', 'sentence span task', 'verbal recall training'
  ],
  openGraph: {
    title: 'Sentence Span Drill - Verbal Working Memory Training',
    description: '30 unique sentences with progressive difficulty. Read sentences (2s each) then recall key nouns. Level-based scoring with 70% threshold. No penalties - pure working memory practice. 60-second challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/working-memory/sentence-span',
  },
};

export default function SentenceSpanPage() {
  return <SentenceSpanClient />;
}