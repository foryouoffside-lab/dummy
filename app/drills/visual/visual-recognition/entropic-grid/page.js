import EntropicGridClient from './EntropicGridClient';

export const metadata = {
  title: 'Entropic Grid - Visual Search with Stamina & Entropy System Training',
  description: 'Find 2-character targets in a 100-cell grid while entropy randomly corrupts cells every 800ms. Stamina system with +5 for correct, -15 for wrong. 90-second challenge with target refresh every 15s.',
  keywords: [
    'entropic grid', 'visual search training', 'stamina system drill',
    'entropy search', 'target finding game', 'visual scanning drill',
    'concentration grid', 'character search', 'cognitive stamina',
    'visual processing speed', 'attention training', 'focus drill',
    'free visual search game', 'entropy challenge'
  ],
  openGraph: {
    title: 'Entropic Grid - Visual Search with Stamina & Entropy System',
    description: 'Find 2-character targets in a 100-cell grid. Entropy corrupts 3 cells every 800ms. Stamina system: +5 for correct, -15 for wrong, -0.5/s natural decay. 90-second challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/visual-recognition/entropic-grid',
  },
};

export default function EntropicGridPage() {
  return <EntropicGridClient />;
}