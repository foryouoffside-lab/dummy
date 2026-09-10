import MemoryClient from './MemoryClient';
import { DRILLS } from '../../../lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';

const memoryDrills = DRILLS.filter((d) => d.category === 'memory');
const MEMORY_COUNT = memoryDrills.length;

export const metadata = {
  // GSC (180d): memory drill 16 impr (pos 10.1), online memory training 14
  // (pos 43.6), memory training online 11 (pos 49.5). Leading with "Online
  // Memory Training" matches the two phrases stuck on page 5.
  title: `Free Memory Games Online - ${MEMORY_COUNT} Memory Tests`,
  description: `Free memory training with ${MEMORY_COUNT} drills across short-term, working, and spatial memory. Improve recall, digit span, and pattern memorization. No sign-up.`,
  keywords: [
    'memory training', 'memory drills', 'short term memory', 'working memory training',
    'spatial memory', 'brain training memory',
    'free memory exercises', 'memory improvement', 'cognitive memory training',
    'digit span', 'n-back training', 'word recall', 'memory games',
    'grid memorization', 'visual memory training', 'free brain games memory',
    'color sequence', 'object location', 'path tracing',
    'skilldrills memory', 'skilldrills brain training',
    'working memory training exercises', 'how to improve short term memory',
    'dual n-back training benefits', 'digit span test average score',
    'visual spatial memory games', 'spatial working memory capacity',
    'memory chunking technique', 'cognitive reserve brain training',
  ],
  openGraph: {
    title: `Free Memory Games & Memory Tests - ${MEMORY_COUNT} Drills | SkillDrills`,
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
    title: `Free Memory Games & Memory Tests - ${MEMORY_COUNT} Drills | SkillDrills`,
    description: `${MEMORY_COUNT} free memory drills. No sign-up required.`,
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory',
    languages: getAlternateLanguages('/drills/memory'),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between short-term memory and working memory?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Short-term memory is the passive storage buffer that holds small amounts of information temporarily (typically 15 to 30 seconds) without manipulation. Working memory, governed by the prefrontal cortex and Baddeley's multicomponent model, is the active mental workspace that retains, manipulates, updates, and applies information in real time—such as calculating math mentally, tracking rules during gameplay, or synthesizing complex arguments."
      }
    },
    {
      "@type": "Question",
      "name": "Does N-back training actually improve fluid intelligence and working memory?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Peer-reviewed cognitive neuroscience research demonstrates that adaptive N-back and Dual N-Back training strengthens the frontoparietal cognitive control network. Regularly updating mental representations while suppressing outdated stimulus interference enhances working memory capacity, reduces attentional distractibility, and exhibits positive near-transfer to fluid reasoning (Gf) and analytical problem-solving."
      }
    },
    {
      "@type": "Question",
      "name": "What is a normal human digit span score, and how can you improve it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average adult forward digit span is 7 ± 2 numbers (Miller's Law), while backward digit span averages 5 ± 1 numbers due to increased working memory load. Modern cognitive science models (such as Nelson Cowan's working capacity theory) suggest raw un-chunked storage is closer to 4 items. You can significantly expand your score by applying auditory chunking (grouping digits into 3 or 4-element rhythmic units) and activating the phonological rehearsal loop."
      }
    },
    {
      "@type": "Question",
      "name": "How do spatial memory drills (grid memorization and path tracing) transfer to real life?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spatial memory drills engage the hippocampus, parietal cortex, and the visuospatial sketchpad. Training grid matrix retention, coordinate recall, and multi-step path tracing improves everyday spatial orientation, architectural and interface navigation, mental rotation of 3D objects, and rapid tactical map awareness in competitive gaming."
      }
    },
    {
      "@type": "Question",
      "name": "What is memory chunking in cognitive psychology, and how does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chunking is an encoding strategy where isolated data items are bound into meaningful, structured clusters based on semantic associations, patterns, or rhythm. Because human working memory is limited by the number of active slots rather than the informational density of each slot, chunking allows you to store far more data (such as remembering a 12-digit number as three 4-digit groups) without overwhelming executive capacity."
      }
    },
    {
      "@type": "Question",
      "name": "Can daily memory training help build cognitive reserve and protect against decline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Engaging in consistent, progressive cognitive exercises contributes to cognitive reserve—the brain's resilience against age-related neurodegeneration and cognitive slowing. Regular memory training stimulates neuroplasticity, promotes synaptic dendritic branching in the hippocampus, and helps maintain fluid processing speed and executive functioning throughout adulthood."
      }
    },
    {
      "@type": "Question",
      "name": "How much memory training should you do each day for optimal results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The recommended routine is 15 to 20 minutes of high-focus memory training, 4 to 5 days per week. Cognitive fatigue sets in quickly during intense working memory tasks, causing diminishing returns after 25 minutes. Brief, frequent practice coupled with adequate slow-wave sleep ensures optimal synaptic consolidation and long-term memory stabilization."
      }
    },
    {
      "@type": "Question",
      "name": "Are online browser-based memory games scientifically valid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. SkillDrills implements computerized adaptations of classic neuropsychological testing paradigms, including the Wechsler Digit Span, the Corsi Block-Tapping task (visual grid matrices), and Kirby N-Back protocols. Standardized stimulus presentation times, millisecond precision scoring, and adaptive load scaling ensure lab-grade cognitive measurement accessible directly in the browser with no installation."
      }
    }
  ]
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MemoryClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}