import MemorySequenceClient from './MemorySequenceClient';

export const metadata = {
  title: 'Memory Sequence Drill - Working Memory & Pattern Recall | SkillDrills',
  description: 'Train spatial working memory by repeating patterns on expanding 4x4 to 7x7 grids. Sequences grow from 8 to 49 steps. 60-second challenge. No sign-up.',
  keywords: [
    'memory sequence drill', 'working memory training', 'spatial memory exercise',
    'pattern recall test', 'sequence memory game', 'memory improvement game',
    'cognitive training memory', 'brain training sequence', 'n-back alternative',
    'visual sequence test', 'memory span test', 'spatial recall practice',
    'working memory exercise', 'free memory training', 'memory game online',
    'sequence recall drill', 'spatial pattern memory', 'visual memory test',
    'memory grid challenge', 'pattern recognition memory', 'sequential memory',
    'brain fitness memory', 'cognitive enhancement memory', 'memory skills training',
    'short term memory exercise', 'memory retention practice', 'mental agility drill',
    'memory training for students', 'memory exercises for seniors', 'brain health memory',
    'ADHD memory training', 'focus and memory drill', 'concentration memory game',
    'skilldrills memory', 'skilldrills brain training', 'free cognitive drill',
    'online memory test', 'browser memory game', 'no download memory practice',
    'progressive memory challenge', 'adaptive memory training', 'spatial cognition test',
  ],
  openGraph: {
    title: 'Memory Sequence Drill - Working Memory Training | SkillDrills',
    description: 'Repeat patterns on 4x4 to 7x7 grids. Sequences grow 8 to 49 steps. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/memory/memory-sequence',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Memory Sequence Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memory Sequence Drill | SkillDrills',
    description: 'Train spatial working memory with expanding grids. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/memory/memory-sequence',
  },
};

export default function MemorySequencePage() {
  return (
    <>
      <noscript>
        <h1>Memory Sequence Drill - Spatial Working Memory & Pattern Recall Training</h1>
        <p>Free memory sequence drill. Repeat patterns on expanding 4x4 to 7x7 grids. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
              { "@type": "ListItem", "position": 3, "name": "Memory", "item": "https://skilldrills.online/drills/cognitive/memory" },
              { "@type": "ListItem", "position": 4, "name": "Memory Sequence" }
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Memory Sequence Drill",
            "url": "https://skilldrills.online/drills/cognitive/memory/memory-sequence",
            "description": "Free memory sequence drill for working memory training. Repeat patterns on expanding 4x4 to 7x7 grids. 60-second challenge with Memory Master achievement.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "author": { "@type": "Organization", "name": "SkillDrills" },
            "isAccessibleForFree": true
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the Memory Sequence Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free brain training exercise testing spatial working memory. Watch highlighted cells on a grid and repeat the pattern in exact order. Grids expand from 4x4 to 7x7."
                }
              },
              {
                "@type": "Question",
                "name": "What are the grid sizes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "4 levels: 4x4 (8-16 steps), 5x5 (15-25 steps), 6x6 (25-36 steps), and 7x7 (36-49 steps). Complete all to achieve Memory Master status."
                }
              },
              {
                "@type": "Question",
                "name": "What is Memory Master?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The highest achievement earned by completing the 7x7 grid with sequences up to 49 steps. Triggers a special celebration with trophy display."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This memory sequence drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <MemorySequenceClient />
    </>
  );
}