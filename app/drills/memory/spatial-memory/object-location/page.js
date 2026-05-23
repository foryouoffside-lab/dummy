import ObjectLocationClient from './ObjectLocationClient';

export const metadata = {
  title: 'Object Location Drill - Spatial Position Memory Training | SkillDrills',
  description: 'Train spatial memory with 10 emoji objects on expanding 3x3 to 7x7 grids. Memorize positions, then find the target. Auto-advancing rounds. No sign-up.',
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
    title: 'Object Location Drill - Spatial Memory | SkillDrills',
    description: '10 emoji objects on expanding 3x3 to 7x7 grids. Memorize then find. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/spatial-memory/object-location',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Object Location Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Object Location Drill | SkillDrills',
    description: '10 emoji objects on expanding grids. Memorize then find. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/spatial-memory/object-location',
  },
};

export default function ObjectLocationPage() {
  return (
    <>
      <noscript>
        <h1>Object Location Drill - Spatial Memory & Position Recall Training</h1>
        <p>Free object location drill with 10 emoji objects on expanding 3x3 to 7x7 grids. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 4, "name": "Object Location" }
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
            "name": "Object Location Drill",
            "url": "https://skilldrills.online/drills/memory/spatial-memory/object-location",
            "description": "Free spatial memory drill with 10 emoji objects on expanding 3x3 to 7x7 grids. 3-4 second memorization, find target on empty grid. Auto-advancing rounds.",
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
                "name": "What is the Object Location Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free spatial memory exercise with 10 emoji objects on grids. 3-4 second memorization, then find where the target object was on an empty grid."
                }
              },
              {
                "@type": "Question",
                "name": "How does grid expansion work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 3x3 with 2 objects. Grid expands to 4x4, 5x5, 6x6, and 7x7 as more objects are added. Font auto-adjusts."
                }
              },
              {
                "@type": "Question",
                "name": "Who should use this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Students (STEM), designers, architects, gamers, and anyone wanting to remember where they placed everyday items."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This object location drill is completely free and works instantly in your browser."
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