import ColorSequenceClient from './ColorSequenceClient';

export const metadata = {
  title: 'Color Sequence Drill - Visual Short-Term Memory Training | SkillDrills',
  description: 'Train visual memory with 6 vibrant colors and progressive sequences. Watch patterns play, then tap colors in order. Level-based scoring. No sign-up.',
  keywords: [
    'color sequence memory', 'visual memory drill', 'short term memory colors',
    'color pattern recall', 'sequence memory game', 'visual pattern memory',
    'color memory test', 'short term memory training', 'pattern recall drill',
    'visual sequence memory', 'color sequence game', 'memory sequence colors',
    'free memory drill', 'visual short term memory', 'color recall training',
    'color sequence free', 'visual sequence drill', 'color pattern memory free',
    'color order memory', 'progressive memory game', 'visual working memory',
    'color recall game', 'pattern sequence training', 'visual memory exercise',
    'skilldrills color sequence', 'skilldrills visual memory', 'skilldrills short term',
    'color tap sequence', 'memory level progression', 'visual pattern training',
    'sequential color recall', 'color order practice', 'visual memory improvement',
  ],
  openGraph: {
    title: 'Color Sequence Drill - Visual Memory Training | SkillDrills',
    description: '6 vibrant colors with progressive sequences. Memorize then tap in order. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/short-term-memory/color-sequence',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Color Sequence Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Sequence Drill | SkillDrills',
    description: '6 vibrant colors with progressive difficulty. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/short-term-memory/color-sequence',
  },
};

export default function ColorSequencePage() {
  return (
    <>
      <noscript>
        <h1>Color Sequence Drill - Short-Term Memory & Visual Pattern Recall</h1>
        <p>Free color sequence drill with 6 vibrant colors and progressive difficulty. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Memory Training", "item": "https://skilldrills.online/drills/memory" },
              { "@type": "ListItem", "position": 3, "name": "Short-Term Memory", "item": "https://skilldrills.online/drills/memory/short-term-memory" },
              { "@type": "ListItem", "position": 4, "name": "Color Sequence" }
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
            "name": "Color Sequence Drill",
            "url": "https://skilldrills.online/drills/memory/short-term-memory/color-sequence",
            "description": "Free visual memory drill with 6 vibrant colors. Watch color sequences play, then tap in order. Progressive sequence length = level + 2.",
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
                "name": "What is the Color Sequence Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free visual memory exercise with 6 colors. Watch sequences play at 1-second intervals, then tap colors in exact order. Green/red feedback dots."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sequence length = level + 2. Level 1 has 3 colors, Level 2 has 4, and so on. Correct sequences advance levels. Penalties reset the current sequence."
                }
              },
              {
                "@type": "Question",
                "name": "Who should use this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Children developing memory skills, adults maintaining cognitive function, seniors exercising recall. Accessible for all ages."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This color sequence drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ColorSequenceClient />
    </>
  );
}