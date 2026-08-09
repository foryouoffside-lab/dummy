import GridMemorizationClient from './GridMemorizationClient';

export const metadata = {
  title: 'Grid Memorization Pro - Spatial Memory Test & Drill | SkillDrills',
  description: 'Train spatial memory with progressive 4x4 to 5x5 grids. 1.5-second memorization of illuminated cells, zero negative penalties, 45-second session. Free online tool.',
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
    title: 'Grid Memorization Pro - Spatial Memory Test & Drill | SkillDrills',
    description: 'Train spatial memory with progressive 4x4 to 5x5 grids. 1.5-second pattern memorization, zero penalties. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/spatial-memory/grid-memorization',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grid Memorization Pro - Spatial Memory Test & Drill | SkillDrills',
    description: 'Train spatial memory with progressive 4x4 to 5x5 grids. 1.5s pattern memorization, zero penalties. Free.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/spatial-memory/grid-memorization',
  },
};

export default function GridMemorizationPage() {
  return (
    <>

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
              { "@type": "ListItem", "position": 4, "name": "Grid Memorization Pro" }
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
            "name": "Grid Memorization Pro Drill",
            "url": "https://skilldrills.online/drills/memory/spatial-memory/grid-memorization",
            "description": "Free spatial memory drill with progressive 4x4 to 5x5 grids. 1.5-second memorization of illuminated pattern cells, zero negative penalties, clean 45-second timer.",
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
                "name": "What is the Grid Memorization Pro Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free spatial working memory exercise. Memorize illuminated cells on a grid for 1.5 seconds, then tap all pattern cells back."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start at a 4x4 grid with 5 lit cells. Clearing rounds adds 1 cell up to 7, then upgrades to a 5x5 grid starting again at 5 cells and scaling toward 12."
                }
              },
              {
                "@type": "Question",
                "name": "Are there negative score or time penalties?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Tapping a wrong cell never deducts score points or reduces remaining timer seconds — the round just replays at the same difficulty."
                }
              },
              {
                "@type": "Question",
                "name": "How long does each drill session last?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each round is timed for exactly 45 seconds of continuous focus."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This drill runs directly in your browser with instant response."
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