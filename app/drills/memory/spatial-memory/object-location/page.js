import ObjectLocationClient from './ObjectLocationClient';

export const metadata = {
  title: 'Object Location Pro - Spatial Memory Test & Drill | SkillDrills',
  description: 'Train spatial position memory with emoji objects on expanding 3x3 to 7x7 grids. 1.5-second memorization, zero negative penalties, 45-second session. Free online tool.',
  keywords: [
    'object location memory', 'spatial position recall', 'object placement memory',
    'spatial memory grid', 'location memory drill', 'object position test',
    'spatial recall training', 'where was it memory', 'object grid memory',
    'visual spatial memory', 'location recall drill', 'position memory game',
    'free memory drill', 'spatial cognition training', 'object location test',
    'object location free', 'spatial position drill free', 'emoji grid memory',
    'object placement recall', 'grid position memory', 'spatial location training',
    'where is it memory', 'object position drill', 'visual spatial recall',
    'skilldrills object location', 'skilldrills spatial memory', 'skilldrills position',
    'emoji memory grid', 'location memory practice', 'spatial object recall',
    'position memory exercise', 'grid object memory', 'spatial awareness drill',
  ],
  openGraph: {
    title: 'Object Location Pro - Spatial Memory Test & Drill | SkillDrills',
    description: 'Train spatial position memory with emoji objects on expanding 3x3 to 7x7 grids. 1.5-second memorization, zero penalties. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/spatial-memory/object-location',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Object Location Pro - Spatial Memory Test & Drill | SkillDrills',
    description: 'Train spatial position memory with emoji objects on expanding 3x3 to 7x7 grids. 1.5s memorization, zero penalties. Free.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/spatial-memory/object-location',
  },
};

export default function ObjectLocationPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Object Location Pro" }
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
            "name": "Object Location Pro Drill",
            "url": "https://skilldrills.online/drills/memory/spatial-memory/object-location",
            "description": "Free spatial memory drill with emoji objects on progressive 3x3 to 7x7 grids. 1.5-second pattern memorization, zero negative penalties, clean 45-second timer.",
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
                "name": "What is the Object Location Pro Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free spatial position memory exercise. Memorize emoji object locations on a grid for 1.5 seconds, then tap the position of the target object on a blank grid."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive grid expansion work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 3x3 grid with 2 objects. Clearing rounds adds more objects and expands the grid to 4x4, 5x5, 6x6, and 7x7."
                }
              },
              {
                "@type": "Question",
                "name": "Are there negative score or time penalties?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Tapping an incorrect location never deducts score points or reduces remaining timer seconds — the round just replays at the same difficulty."
                }
              },
              {
                "@type": "Question",
                "name": "Does difficulty decrease on mistakes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. The level remains unchanged when a mistake is made, allowing you to master your current level."
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

      <ObjectLocationClient />
    </>
  );
}