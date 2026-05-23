import MemoryClient from './MemoryClient';

export const metadata = {
  title: 'Memory Training - 15 Free Drills for Brain Fitness | SkillDrills',
  description: 'Free memory training with 15 drills across 5 categories. Improve short-term, working, long-term, spatial, and associative memory. No sign-up.',
  keywords: [
    'memory training', 'memory drills', 'short term memory', 'working memory training',
    'long term memory', 'spatial memory', 'associative memory', 'brain training memory',
    'free memory exercises', 'memory improvement', 'cognitive memory training',
    'digit span', 'n-back training', 'word recall', 'memory games',
    'grid memorization', 'name face memory', 'concept linking', 'story recall',
    'visual memory training', 'free brain games memory',
    'color sequence', 'object location', 'path tracing', 'mental arithmetic',
    'sentence span', 'paired associates', 'image association', 'sound pattern',
    'skilldrills memory', 'skilldrills brain training',
  ],
  openGraph: {
    title: 'Memory Training - 15 Free Drills for Brain Fitness | SkillDrills',
    description: '15 free memory training drills across 5 categories. No sign-up required.',
    type: 'website',
    url: 'https://skilldrills.online/drills/memory',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Memory Training Drills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memory Training - 15 Free Drills | SkillDrills',
    description: '15 free memory drills. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory',
  },
};

export default function MemoryPage() {
  return (
    <>
      <noscript>
        <h1>Memory Training Drills - 15 Free Exercises for Brain Fitness</h1>
        <p>Free memory training with 15 drills across 5 categories. No sign-up required.</p>
      </noscript>
      <MemoryClient />
    </>
  );
}