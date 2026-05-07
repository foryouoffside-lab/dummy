import ColorSequenceClient from './ColorSequenceClient';

export const metadata = {
  title: 'Color Sequence Drill - Short-Term Memory & Visual Pattern Recall',
  description: 'Train visual short-term memory by memorizing and reproducing color sequences. 6 vibrant colors with progressive difficulty - sequence length increases with each level. 60-second timed challenge with level-based scoring.',
  keywords: [
    'color sequence memory', 'visual memory drill', 'short term memory colors',
    'color pattern recall', 'sequence memory game', 'visual pattern memory',
    'color memory test', 'short term memory training', 'pattern recall drill',
    'visual sequence memory', 'color sequence game', 'memory sequence colors',
    'free memory drill', 'visual short term memory', 'color recall training'
  ],
  openGraph: {
    title: 'Color Sequence Drill - Visual Short-Term Memory Training',
    description: '6 vibrant colors with progressive sequence length (level + 2). Memorize the pattern then tap colors in order. Level-based scoring with penalty system. 60-second timed challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/short-term-memory/color-sequence',
  },
};

export default function ColorSequencePage() {
  return <ColorSequenceClient />;
}