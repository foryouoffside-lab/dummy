import GridMemorizationClient from './GridMemorizationClient';

export const metadata = {
  title: 'Grid Memorization Drill - Spatial Memory & Visual Pattern Recall',
  description: 'Train spatial memory by memorizing lit cell positions on a grid. Progressive difficulty from 4×4 (5-9 cells) to 5×5 grid. 5-second memorization with instant fail on wrong cell click. 60-second timed challenge.',
  keywords: [
    'grid memorization', 'spatial memory', 'visual pattern memory',
    'grid pattern recall', 'spatial recall drill', 'visual spatial memory',
    'grid memory game', 'pattern location memory', 'spatial cognition',
    'visual grid drill', 'memory grid test', 'spatial memory training',
    'free memory drill', 'grid pattern recognition', 'visual spatial recall'
  ],
  openGraph: {
    title: 'Grid Memorization Drill - Spatial Memory & Pattern Recall',
    description: 'Progressive grid memorization from 4×4 to 5×5 with 5-9 lit cells. 5-second memorization, instant fail on wrong click. +3 for perfect, -3 for wrong cell. 60-second timed challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/spatial-memory/grid-memorization',
  },
};

export default function GridMemorizationPage() {
  return <GridMemorizationClient />;
}