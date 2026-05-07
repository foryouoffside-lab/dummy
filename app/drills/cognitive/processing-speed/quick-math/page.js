import QuickMathClient from './QuickMathClient';

export const metadata = {
  title: 'Quick Math Drill - Processing Speed & Mental Calculation Training',
  description: 'Boost mental processing speed with rapid math problems. Adaptive difficulty with unique non-repeating questions (+, -, ×, ÷). 60-second challenge with 3 lives, combo streaks, and persistent question history.',
  keywords: [
    'quick math', 'mental math speed', 'processing speed',
    'rapid calculation', 'math reflexes', 'arithmetic speed',
    'cognitive processing', 'number fluency', 'math practice',
    'speed math test', 'mental calculation drill', 'brain speed',
    'reaction math', 'free math speed test', 'cognitive training'
  ],
  openGraph: {
    title: 'Quick Math Drill - Processing Speed & Mental Calculation',
    description: 'Rapid mental math with adaptive difficulty. Never-repeating questions across +, -, ×, ÷. 60-second challenge with lives system, combo streaks, and persistent question history.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/processing-speed/quick-math',
  },
};

export default function QuickMathPage() {
  return <QuickMathClient />;
}