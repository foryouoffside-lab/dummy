import ComplexPatternClient from './ComplexPatternClient';

export const metadata = {
  title: 'Complex Pattern Elite - Pattern Memory & Motor Coordination Training',
  description: 'Memorize and replicate complex path patterns with your mouse. Shape-based scoring compares your drawing to the original. Adaptive complexity increases with success. 60-second pattern recognition challenge.',
  keywords: [
    'complex pattern training', 'pattern memory drill', 'motor coordination exercise',
    'shape drawing practice', 'pattern replication game', 'hand-eye coordination',
    'spatial memory training', 'motor control patterns', 'drawing accuracy test',
    'visual memory drill', 'coordination challenge', 'free pattern game',
    'adaptive difficulty patterns', 'motor skills assessment', 'path drawing practice'
  ],
  openGraph: {
    title: 'Complex Pattern Elite - Pattern Memory & Motor Coordination',
    description: 'Memorize path patterns in 2 seconds, then draw them from memory. Shape-based scoring with adaptive complexity. Train spatial memory and fine motor control in a 60-second challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Coordination/complex-pattern',
  },
};

export default function ComplexPatternPage() {
  return <ComplexPatternClient />;
}