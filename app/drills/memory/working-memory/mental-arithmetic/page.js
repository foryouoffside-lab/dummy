import MentalArithmeticClient from './MentalArithmeticClient';

export const metadata = {
  title: 'Mental Arithmetic Drill - Working Memory & Mental Calculation Training',
  description: 'Train working memory with mental arithmetic problems (+, -, ×, ÷). 10-second time limit per problem with auto-advancing rounds. Difficulty scales with score across 8 levels. 60-second timed challenge with +1/-1 scoring.',
  keywords: [
    'mental arithmetic', 'working memory math', 'mental calculation drill',
    'math working memory', 'arithmetic brain training', 'mental math practice',
    'working memory exercise', 'calculation memory drill', 'math brain game',
    'mental computation training', 'arithmetic working memory', 'number memory drill',
    'free memory math', 'cognitive math training', 'mental math test'
  ],
  openGraph: {
    title: 'Mental Arithmetic Drill - Working Memory & Calculation Training',
    description: 'Train working memory with timed mental arithmetic. 4 operations (+, -, ×, ÷) across 8 difficulty levels. 10-second per problem with auto-advance. Difficulty scales with score. 60-second challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/working-memory/mental-arithmetic',
  },
};

export default function MentalArithmeticPage() {
  return <MentalArithmeticClient />;
}