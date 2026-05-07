import MathReactionClient from './MathReactionClient';

export const metadata = {
  title: 'Math-Reaction Drill - Speed Math Parity Training (Odd/Even)',
  description: 'Train your mental math speed and reaction time. Solve equations and quickly identify if the result is ODD or EVEN. 60-second challenge with adaptive difficulty window (600-1500ms). 3 lives system.',
  keywords: [
    'math reaction', 'odd even math', 'mental math speed', 'reaction time math',
    'parity training', 'quick math game', 'math reflex', 'number sense',
    'arithmetic reaction', 'speed calculation', 'math brain training',
    'addition subtraction multiplication', 'math reaction test'
  ],
  openGraph: {
    title: 'Math-Reaction Drill - Speed Math & Parity Training',
    description: 'Solve equations and identify odd/even results under time pressure. Adaptive difficulty window tightens with correct answers. 60-second challenge with 3 lives.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/math-speed/Math-Reaction',
  },
};

export default function MathReactionPage() {
  return <MathReactionClient />;
}