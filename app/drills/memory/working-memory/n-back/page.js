import NBackClient from './NBackClient';

export const metadata = {
  title: '3-Back Training Drill - Working Memory & N-Back Cognitive Exercise',
  description: 'Train working memory with the classic N-Back task at 3-back difficulty. Letters appear every second - identify if current letter matches the one from 3 steps back. 60 letters per round. 60-second timed challenge with +1/-5 scoring.',
  keywords: [
    'n-back training', '3-back task', 'working memory exercise',
    'dual n-back', 'cognitive training n-back', 'working memory test',
    'n-back brain training', 'memory update drill', 'fluid intelligence training',
    'cognitive enhancement n-back', 'working memory span', 'n-back game',
    'free n-back training', 'brain working memory', 'cognitive n-back drill'
  ],
  openGraph: {
    title: '3-Back Training - Working Memory & N-Back Cognitive Exercise',
    description: 'Classic N-Back task at 3-back level. Letters appear every second - compare current with 3 steps back. 60 letters per round with ~23 matches. +1 correct, -5 wrong. 60-second timed challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/working-memory/n-back',
  },
};

export default function NBackPage() {
  return <NBackClient />;
}