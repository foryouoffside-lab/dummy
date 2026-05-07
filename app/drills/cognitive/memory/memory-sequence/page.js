import MemorySequenceClient from './MemorySequenceClient';

export const metadata = {
  title: 'Memory Sequence Drill - Spatial Pattern Recall & Working Memory Training',
  description: 'Train working memory by watching and repeating spatial sequences on expanding 4×4 to 7×7 grids. 60-second challenge with 3 lives, progression system, and Memory Master achievement at 7×7 completion.',
  keywords: [
    'memory sequence', 'working memory training', 'spatial memory',
    'pattern recall', 'sequence memory', 'memory game',
    'cognitive training memory', 'brain training sequence', 'n-back alternative',
    'visual sequence', 'memory span test', 'spatial recall',
    'working memory exercise', 'free memory training'
  ],
  openGraph: {
    title: 'Memory Sequence Drill - Spatial Pattern Recall Training',
    description: 'Watch and repeat spatial sequences on expanding grids (4×4 to 7×7). Sequences grow from 8 to 49 steps. 60-second challenge with lives system and Memory Master achievement.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/memory/memory-sequence',
  },
};

export default function MemorySequencePage() {
  return <MemorySequenceClient />;
}