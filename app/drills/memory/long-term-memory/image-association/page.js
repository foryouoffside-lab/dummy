import ImageAssociationClient from './ImageAssociationClient';

export const metadata = {
  title: 'Image Association Drill - Long-Term Memory & Visual Association Training',
  description: 'Train visual association memory by memorizing items with 5 related words. 30 unique items across 3 categories with emoji visuals. 5-second memorization then free recall. +1 per correct word, -1 per wrong. 60-second timed challenge.',
  keywords: [
    'image association', 'visual memory training', 'association memory',
    'word association drill', 'visual association game', 'long term memory',
    'memory association practice', 'image word association', 'free recall drill',
    'visual learning memory', 'associative learning game', 'memory improvement',
    'free memory training', 'visual association drill', 'cognitive memory exercise'
  ],
  openGraph: {
    title: 'Image Association Drill - Visual Memory & Word Association Training',
    description: '30 unique items with emoji visuals and 5 associated words each. 5-second memorization phase then type all words you remember. +1 for correct, -1 for wrong. 60-second timed challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/long-term-memory/image-association',
  },
};

export default function ImageAssociationPage() {
  return <ImageAssociationClient />;
}