import SymbolMatchingClient from './SymbolMatchingClient';

export const metadata = {
  title: 'Symbol Matching Drill - Cognitive Flexibility & Processing Speed Training',
  description: 'Train cognitive flexibility by matching Greek symbols to numbers with keys that change after every answer. 75-second challenge with 3 lives, reaction time tracking, and keyboard support (1-9).',
  keywords: [
    'symbol matching', 'cognitive flexibility', 'processing speed',
    'symbol recognition', 'reaction time test', 'brain training',
    'visual processing', 'cognitive switching', 'symbol coding',
    'mental flexibility', 'speed matching', 'cognitive assessment',
    'free brain game', 'symbol speed test', 'reaction training'
  ],
  openGraph: {
    title: 'Symbol Matching Drill - Cognitive Flexibility & Processing Speed',
    description: 'Match Greek symbols to numbers with constantly changing reference keys. 75-second challenge with reaction time tracking, lives system, combo streaks, and keyboard shortcuts.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/processing-speed/symbol-matching',
  },
};

export default function SymbolMatchingPage() {
  return <SymbolMatchingClient />;
}