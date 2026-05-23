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
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Path Tracing Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Path Tracing - Sequence Memory | SkillDrills',
    description: 'Train spatial memory with animated dot paths on expanding 3x3 to 7x7 grids. Retrace paths in exact order. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
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
            "description": "Free spatial memory drill with animated dot paths on 3x3 to 7x7 grids. Retrace paths in exact order. Instant fail on wrong click. +2 for perfect recall.",
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
                  "text": "A free spatial sequence exercise. Watch animated dot paths at 500ms intervals, then retrace in exact order. Instant fail on wrong click."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Path length = level + 3. Level 1 has 4 dots. Grid expands from 3x3 to 7x7 as paths grow longer. Infinite progression."
                }
              },
              {
                "@type": "Question",
                "name": "Who should use this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Students, professionals, gamers (strategy/MOBA), and anyone wanting better sequential spatial memory and route recall."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This path tracing drill is completely free and works instantly in your browser."
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