import LogicPuzzlesClient from './LogicPuzzlesClient';

export const metadata = {
  title: 'Logic Puzzles Drill - Problem Solving & Mathematical Reasoning Training',
  description: 'Solve 8 types of unique logic puzzles including sequences, algebra, PEMDAS, Fibonacci, exponents, percentages, and number manipulation. 60-second challenge with hint system, combo streaks, and level progression.',
  keywords: [
    'logic puzzles', 'math puzzles', 'problem solving', 'logical reasoning',
    'brain teasers', 'math problems', 'puzzle solving', 'critical thinking',
    'number sequences', 'algebra practice', 'mathematical reasoning',
    'cognitive puzzles', 'logic training', 'free puzzle games',
    'brain training puzzles'
  ],
  openGraph: {
    title: 'Logic Puzzles Drill - Problem Solving & Mathematical Reasoning',
    description: '8 puzzle types with unique non-repeating problems. Arithmetic sequences, algebra, PEMDAS, Fibonacci, exponents, percentages, and more. 60-second challenge with hints and combo streaks.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/problem-solving/logic-puzzles',
  },
};

export default function LogicPuzzlesPage() {
  return <LogicPuzzlesClient />;
}