import PatternRecognitionClient from './PatternRecognitionClient';

export const metadata = {
  title: 'Math Pattern Recognition Drill - Number Sequence & Logical Reasoning Training',
  description: 'Train pattern recognition with 5 unique pattern types: Arithmetic, Geometric, Squares, Fibonacci, and Alternating sequences. Adaptive difficulty with 5,000+ unique non-repeating patterns. 60-second challenge with 3 lives and combo streaks.',
  keywords: [
    'pattern recognition', 'math patterns', 'number sequences',
    'logical reasoning', 'arithmetic sequence', 'geometric sequence',
    'fibonacci sequence', 'square numbers', 'alternating patterns',
    'math brain training', 'sequence prediction', 'pattern finding',
    'cognitive math drill', 'number pattern test', 'logical thinking'
  ],
  openGraph: {
    title: 'Math Pattern Recognition Drill - Number Sequence Training',
    description: '5 pattern types with 5,000+ unique non-repeating sequences. Arithmetic, Geometric, Squares, Fibonacci, and Alternating patterns. Adaptive difficulty with 60-second timed challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/memory/pattern-recognition',
  },
};

export default function PatternRecognitionPage() {
  return <PatternRecognitionClient />;
}