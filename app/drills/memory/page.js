import MemoryClient from './MemoryClient';

export const metadata = {
  title: 'Memory Training Drills - Short-Term, Working, Long-Term, Spatial & Associative Memory',
  description: 'Free memory training with 15 drills across 5 categories. Improve short-term, working, long-term, spatial, and associative memory. Track your progress with no login required.',
  keywords: [
    'memory training', 'memory drills', 'short term memory', 'working memory training',
    'long term memory', 'spatial memory', 'associative memory', 'brain training memory',
    'free memory exercises', 'memory improvement', 'cognitive memory training',
    'digit span', 'n-back training', 'word recall', 'memory games',
    'grid memorization', 'name face memory', 'concept linking', 'story recall',
    'visual memory training', 'free brain games memory'
  ],
  openGraph: {
    title: 'Memory Training Drills - Free Memory Exercises & Brain Training',
    description: '15 free memory training drills across 5 categories. Practice short-term, working, long-term, spatial, and associative memory. No login required.',
    type: 'website',
    url: 'https://skilldrills.online/drills/memory',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory',
  },
};

export default function MemoryPage() {
  return <MemoryClient />;
}