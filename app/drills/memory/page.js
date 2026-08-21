import MemoryClient from './MemoryClient';
import { DRILLS } from '../../../lib/drillsRegistry';

const memoryDrills = DRILLS.filter((d) => d.category === 'memory');
const MEMORY_COUNT = memoryDrills.length;

export const metadata = {
  // GSC (180d): memory drill 16 impr (pos 10.1), online memory training 14
  // (pos 43.6), memory training online 11 (pos 49.5). Leading with "Online
  // Memory Training" matches the two phrases stuck on page 5.
  title: `Online Memory Training - ${MEMORY_COUNT} Free Memory Drills`,
  description: `Free memory training with ${MEMORY_COUNT} drills across short-term, working, and spatial memory. Improve recall, digit span, and pattern memorization. No sign-up.`,
  keywords: [
    'memory training', 'memory drills', 'short term memory', 'working memory training',
    'spatial memory', 'brain training memory',
    'free memory exercises', 'memory improvement', 'cognitive memory training',
    'digit span', 'n-back training', 'word recall', 'memory games',
    'grid memorization', 'visual memory training', 'free brain games memory',
    'color sequence', 'object location', 'path tracing',
    'skilldrills memory', 'skilldrills brain training',
  ],
  openGraph: {
    title: `Memory Training - ${MEMORY_COUNT} Free Drills | SkillDrills`,
    description: `${MEMORY_COUNT} free memory training drills. No sign-up required.`,
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
    title: `Memory Training - ${MEMORY_COUNT} Free Drills | SkillDrills`,
    description: `${MEMORY_COUNT} free memory drills. No sign-up required.`,
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory',
  },
};

export default function MemoryPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/' },
      { '@type': 'ListItem', position: 2, name: 'All Drills', item: 'https://skilldrills.online/drills' },
      { '@type': 'ListItem', position: 3, name: 'Memory Drills', item: 'https://skilldrills.online/drills/memory' },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Memory Training - ${MEMORY_COUNT} Free Drills`,
    description: `Free memory training with ${MEMORY_COUNT} drills across short-term, working, and spatial memory.`,
    url: 'https://skilldrills.online/drills/memory',
    hasPart: memoryDrills.map((d) => ({
      '@type': 'WebPage',
      name: d.name,
      url: `https://skilldrills.online${d.href}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <MemoryClient />
    </>
  );
}