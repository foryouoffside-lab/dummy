import ArithmeticRaceClient from './ArithmeticRaceClient';

export const metadata = {
  title: 'Arithmetic Race Drill - Speed Math & Mental Calculation Training',
  description: 'Boost your mental math speed with timed arithmetic challenges. 3 difficulty levels (Basic, Pro, Elite) with addition, subtraction, and multiplication. 60-second race with lives system and combo bonuses.',
  keywords: [
    'arithmetic race', 'speed math', 'mental math training', 'math drill',
    'calculation speed', 'arithmetic practice', 'math game', 'quick math',
    'mental calculation', 'math speed test', 'number skills', 'math quiz',
    'addition subtraction multiplication', 'timed math challenge'
  ],
  openGraph: {
    title: 'Arithmetic Race Drill - Speed Math & Mental Calculation',
    description: '60-second mental math challenge with 3 difficulty levels. Practice addition, subtraction, and multiplication. Track accuracy, combo streaks, and beat your best score.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/math-speed/arithmetic-race',
  },
};

export default function ArithmeticRacePage() {
  return <ArithmeticRaceClient />;
}