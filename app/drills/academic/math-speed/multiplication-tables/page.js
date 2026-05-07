import MultiplicationClient from './MultiplicationClient';

export const metadata = {
  title: 'Factor Recall Lab - Multiplication Tables Speed Drill',
  description: 'Master multiplication tables with intelligent practice that prioritizes high-friction numbers (6-12). 3 ranges: 12×12, 15×15, 20×20. 60-second timed challenge with lives system, combo streaks, and performance tracking.',
  keywords: [
    'multiplication tables', 'times tables practice', 'multiplication drill',
    'factor recall', 'multiplication speed test', 'math facts practice',
    'times tables quiz', 'multiplication game', 'mental multiplication',
    'multiplication automaticity', 'math speed drill', 'times tables training',
    'multiplication practice', 'number facts'
  ],
  openGraph: {
    title: 'Factor Recall Lab - Multiplication Tables Speed Drill',
    description: 'Intelligent multiplication practice prioritizing hard-to-remember facts. 3 difficulty ranges with adaptive scoring. 60-second timed challenge with lives system and combo streaks.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/math-speed/multiplication-tables',
  },
};

export default function MultiplicationPage() {
  return <MultiplicationClient />;
}