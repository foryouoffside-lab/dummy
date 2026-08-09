import PathTracingClient from './PathTracingClient';

export const metadata = {
  title: 'Path Tracing - Sequence Memory | SkillDrills',
  description: 'Train spatial memory with animated dot paths on expanding 3x3 to 7x7 grids. Retrace paths in exact order. No sign-up.',
  keywords: [
    'path tracing', 'route memory', 'spatial sequence recall', 'path memory drill',
    'sequential spatial memory', 'route tracing game', 'path recall training',
    'spatial navigation memory', 'dot path memory', 'sequence tracing drill',
    'visual path memory', 'route learning test', 'free memory drill',
    'spatial sequence training', 'path following memory',
    'path tracing free', 'route memory drill free', 'dot sequence memory',
    'animated path memory', 'grid path recall', 'sequential route training',
    'spatial pattern sequence', 'path order memory', 'visual route tracing',
    'skilldrills path tracing', 'skilldrills spatial memory', 'skilldrills route',
    'dot path sequence', 'route recall practice', 'path memorization drill',
    'sequential dot memory', 'spatial ordering drill', 'path reproduction test',
  ],
  openGraph: {
    title: 'Path Tracing - Sequence Memory | SkillDrills',
    description: 'Train spatial memory with animated dot paths on expanding 3x3 to 7x7 grids. Retrace paths in exact order. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/spatial-memory/path-tracing',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Path Tracing - Sequence Memory | SkillDrills',
    description: 'Train spatial memory with animated dot paths on expanding 3x3 to 7x7 grids. Retrace paths in exact order. No sign-up.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/spatial-memory/path-tracing',
  },
};

export default function PathTracingPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Path Tracing" }
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
            "name": "Path Tracing Drill",
            "url": "https://skilldrills.online/drills/memory/spatial-memory/path-tracing",
            "description": "Free spatial memory drill with animated dot paths on 3x3 to 7x7 grids. Retrace paths in exact order, zero negative penalties, clean 45-second timer.",
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
                "name": "What is the Path Tracing Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free spatial sequence memory exercise. Watch animated dot paths at 500ms intervals, then retrace the exact path sequence on the grid."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts on a 3x3 grid with 3 steps. Clearing rounds adds steps and expands the grid up to 7x7."
                }
              },
              {
                "@type": "Question",
                "name": "Are there negative score or time penalties?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Tapping a wrong step never deducts score points or reduces remaining timer seconds — the round just replays at the same difficulty."
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

      <PathTracingClient />
    </>
  );
}