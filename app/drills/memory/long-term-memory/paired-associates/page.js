import PairedAssociatesClient from './PairedAssociatesClient';

export const metadata = {
  title: 'Paired Associates Drill - Long-Term Memory & Word Pair Training',
  description: 'Train paired associate memory with 80 unique word pairs across 5 difficulty tiers. Memorize word pairs then recall the match from 3 options. Adaptive rounds add +1 pair each level. 60-second timed challenge.',
  keywords: [
    'paired associates', 'word pair memory', 'associative memory training',
    'paired associate learning', 'word matching drill', 'long term memory pairs',
    'memory association pairs', 'word link training', 'pair recall drill',
    'associative recall pairs', 'cognitive memory pairs', 'paired recall test',
    'free memory drill', 'word pair practice', 'paired associate test'
  ],
  openGraph: {
    title: 'Paired Associates Drill - Word Pair Memory Training',
    description: '80 unique word pairs across 5 difficulty tiers from Common to Expert. Memorize pairs then select the correct match. Adaptive difficulty adds +1 pair per round. 60-second timed challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/long-term-memory/paired-associates',
  },
};

export default function PairedAssociatesPage() {
  return <PairedAssociatesClient />;
}