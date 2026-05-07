import ConcentrationGridClient from './ConcentrationGridClient';

export const metadata = {
  title: 'Concentration Grid Drill - Sequential Number Search & Focus Training',
  description: 'Train visual scanning and concentration by finding numbers in sequential order on expanding grids (3×3 to 8×8). 60-second challenge with 3 lives, level progression, combo streaks, and completion bonuses.',
  keywords: [
    'concentration grid', 'number search', 'sequential search',
    'focus training', 'visual scanning', 'concentration exercise',
    'grid search game', 'attention training', 'number sequence',
    'cognitive training', 'visual processing', 'focus drill',
    'brain training grid', 'concentration test'
  ],
  openGraph: {
    title: 'Concentration Grid Drill - Sequential Number Search & Focus Training',
    description: 'Find numbers in order (1→2→3...) on expanding grids from 3×3 to 8×8. 60-second timed challenge with lives system, level progression, and completion bonuses up to +150 points.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/focus/concentration-grid',
  },
};

export default function ConcentrationGridPage() {
  return <ConcentrationGridClient />;
}