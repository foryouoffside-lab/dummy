import MentalMathClient from './MentalMathClient';

export const metadata = {
  title: 'Mental Math Speed Drill - Arithmetic Practice & Brain Training',
  description: 'Sharpen your mental arithmetic with timed math problems. 3 difficulty levels (Basic, Pro, Elite) covering addition, subtraction, and multiplication. 60-second race with lives system, combo streaks, and performance tracking.',
  keywords: [
    'mental math', 'speed math drill', 'arithmetic practice', 'mental calculation',
    'math training', 'brain math game', 'quick math quiz', 'number skills',
    'addition subtraction multiplication', 'math speed test', 'mental arithmetic',
    'timed math challenge', 'math brain training', 'calculation speed'
  ],
  openGraph: {
    title: 'Mental Math Speed Drill - Arithmetic Brain Training',
    description: '60-second mental math challenge with 3 difficulty levels. Practice addition, subtraction, and multiplication. Track accuracy, combo streaks, and beat your best score with lives system.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/math-speed/mental-math',
  },
};

export default function MentalMathPage() {
  return <MentalMathClient />;
}