import TowerOfHanoiClient from './TowerOfHanoiClient';

export const metadata = {
  title: 'Tower of Hanoi Drill - Recursive Problem Solving & Strategic Planning Training',
  description: 'Master the classic Tower of Hanoi puzzle with progressive 3-8 disk levels. 60-second challenge with +10 points per level, perfect move celebrations, and efficiency tracking. No penalties for invalid moves.',
  keywords: [
    'tower of hanoi', 'recursive puzzle', 'problem solving game',
    'strategic planning', 'logical thinking', 'brain teaser',
    'cognitive puzzle', 'hanoi tower', 'disk stacking puzzle',
    'algorithmic thinking', 'puzzle training', 'brain training game',
    'classic puzzle', 'free puzzle game', 'recursive thinking'
  ],
  openGraph: {
    title: 'Tower of Hanoi Drill - Strategic Problem Solving Training',
    description: 'Classic recursive puzzle with progressive 3-8 disk levels. Auto-advancing difficulty with perfect move celebrations. 60-second challenge with efficiency scoring and no penalties.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/problem-solving/tower-of-hanoi',
  },
};

export default function TowerOfHanoiPage() {
  return <TowerOfHanoiClient />;
}