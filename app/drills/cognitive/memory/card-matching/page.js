import CardMatchingClient from './CardMatchingClient';

export const metadata = {
  title: 'Card Matching Drill - Visual Memory & Pair Recall Training',
  description: 'Train visual memory by matching pairs of icons on progressively expanding grids (12 to 32+ cards). 60-second challenge with 15+ unique icons, level progression, combo streaks, and +10 points per grid completion.',
  keywords: [
    'card matching', 'memory game', 'pair matching', 'visual memory',
    'memory training', 'concentration game', 'matching pairs',
    'brain training memory', 'cognitive memory game', 'pattern matching',
    'visual recall', 'memory exercise', 'free memory game',
    'card flip game', 'concentration memory'
  ],
  openGraph: {
    title: 'Card Matching Drill - Visual Memory & Pair Recall Training',
    description: 'Match pairs of icons on expanding grids from 12 to 32+ cards. 15+ unique icons, progressive difficulty, combo streaks every 3 matches. 60-second timed challenge with level progression.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/memory/card-matching',
  },
};

export default function CardMatchingPage() {
  return <CardMatchingClient />;
}