import WordRecallClient from './WordRecallClient';

export const metadata = {
  title: 'Word Recall Drill - Short-Term Memory & Verbal Learning Training',
  description: 'Train verbal short-term memory by memorizing and recalling word lists. Progressive difficulty starting at 3 words with 10-second memorization. +1 per correct word, penalty equals word count. 50 unique words. 60-second timed challenge.',
  keywords: [
    'word recall', 'verbal memory', 'word list memory', 'short term memory words',
    'word recall test', 'verbal learning drill', 'word memory game',
    'free recall words', 'word list recall', 'verbal short term memory',
    'word memorization drill', 'vocabulary memory', 'free memory drill',
    'verbal recall training', 'word memory test'
  ],
  openGraph: {
    title: 'Word Recall Drill - Verbal Short-Term Memory Training',
    description: '50 unique words with progressive difficulty starting at 3 words. 10-second memorization with skip option. +1 per correct word, penalty equals word count on mistakes. Perfect recall advances to next level.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/short-term-memory/word-recall',
  },
};

export default function WordRecallPage() {
  return <WordRecallClient />;
}