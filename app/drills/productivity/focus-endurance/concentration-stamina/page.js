import ConcentrationStaminaClient from './ConcentrationStaminaClient';

export const metadata = {
  title: 'Constant Prime - Sustained Attention & Concentration Stamina Training',
  description: 'Train sustained attention with alternating rule sets (Vowels vs Primes). Adaptive speed 800-400ms based on accuracy. 60-second challenge with 3 lives, combo streaks, and automatic rule changes every 10 seconds.',
  keywords: [
    'sustained attention', 'concentration training', 'focus endurance',
    'cognitive flexibility', 'attention drill', 'constant prime',
    'task switching', 'selective attention', 'mental stamina',
    'focus training', 'attention span', 'cognitive control',
    'brain training attention', 'concentration exercise', 'adaptive speed drill'
  ],
  openGraph: {
    title: 'Constant Prime - Sustained Attention & Concentration Training',
    description: 'Alternating rule sets test cognitive flexibility. Adaptive speed tightens with accuracy. 3 lives protect your score. 60-second focus endurance challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/focus-endurance/concentration-stamina',
  },
};

export default function ConcentrationStaminaPage() {
  return <ConcentrationStaminaClient />;
}