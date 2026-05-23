import GridMemorizationClient from './GridMemorizationClient';

export const metadata = {
  title: 'Grid Memorization Drill - Spatial Memory & Pattern Recall | SkillDrills',
  description: 'Train spatial memory with progressive 4x4 to 5x5 grids. 5-second memorization, then tap all lit cells. Instant fail on wrong click. No sign-up.',
  keywords: [
    'grid memorization', 'spatial memory', 'visual pattern memory',
    'grid pattern recall', 'spatial recall drill', 'visual spatial memory',
    'grid memory game', 'pattern location memory', 'spatial cognition',
    'visual grid drill', 'memory grid test', 'spatial memory training',
    'free memory drill', 'grid pattern recognition', 'visual spatial recall',
    'grid memorization free', 'spatial memory drill free', 'grid pattern game',
    'position memory drill', 'grid cell memory', 'visual spatial training',
    'spatial pattern recall', 'grid location memory', 'spatial working memory',
    'skilldrills grid memorization', 'skilldrills spatial memory', 'skilldrills visual',
    'pattern grid practice', 'spatial cognition drill', 'visual position memory',
    'grid memory exercise', 'spatial recall practice', 'grid recognition drill',
  ],
  openGraph: {
    title: 'Grid Memorization Drill - Spatial Memory | SkillDrills',
    description: 'Progressive 4x4 to 5x5 grid. 5-second memorization, instant fail on wrong click. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/spatial-memory/grid-memorization',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Grid Memorization Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grid Memorization Drill | SkillDrills',
    description: 'Progressive grid memorization. Instant fail on wrong click. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/spatial-memory/grid-memorization',
  },
};

export default function GridMemorizationPage() {
  return (
    <>
      <noscript>
        <h1>Grid Memorization Drill - Spatial Memory & Visual Pattern Recall</h1>
        <p>Free grid memorization drill with progressive 4x4 to 5x5 grids. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Spatial Memory", "item": "https://skilldrills.online/drills/memory/spatial-memory" },
              { "@type": "ListItem", "position": 4, "name": "Grid Memorization" }
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
            "name": "Grid Memorization Drill",
            "url": "https://skilldrills.online/drills/memory/spatial-memory/grid-memorization",
            "description": "Free spatial memory drill with progressive 4x4 to 5x5 grids. 5-second memorization of lit cells, instant fail on wrong click. +3 points for perfect recall.",
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
                "name": "What is the Grid Memorization Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free spatial memory exercise. Memorize illuminated cells on a grid for 5 seconds, then tap them all back. Instant fail on wrong click."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start at 4x4 grid with 5 lit cells. Perfect recall adds +1 cell up to 9. Then graduate to 5x5 grid, again 5-9 cells."
                }
              },
              {
                "@type": "Question",
                "name": "Who should use this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Students (STEM), designers, engineers, gamers (map memory), architects, and anyone wanting better spatial working memory."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This grid memorization drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <GridMemorizationClient />
    </>
  );
}