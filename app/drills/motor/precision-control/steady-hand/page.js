import SteadyHandClient from './SteadyHandClient';

export const metadata = {
  title: 'Steady Hand - Path Tracking Drill | SkillDrills',
  description: 'Trace a winding corridor with steady cursor control. Complete laps for 15 points. Corridor shrinks 50px to 12px with streak. No sign-up.',
  keywords: [
    'steady hand drill', 'path tracing game', 'precision tracking test', 'motor endurance training',
    'steady cursor control', 'hand stability training', 'path following drill online',
    'precision motor control', 'circuit training game', 'mouse steadiness practice',
    'fine motor endurance', 'hand tremor control', 'smooth movement practice',
    'free steady hand drill', 'stability training', 'cursor precision test',
    'hand eye coordination mouse', 'motor skill development', 'fine motor control exercise',
    'mouse accuracy training', 'cursor path following', 'steady hand challenge',
    'motor control assessment', 'hand steadiness test', 'precision movement drill',
    'free motor skills practice', 'online coordination game', 'mouse control improvement',
    'gamer hand steadiness', 'artist cursor control', 'surgeon hand training',
    'skilldrills steady hand', 'skilldrills motor drill', 'free precision training',
  ],
  openGraph: {
    title: 'Steady Hand - Path Tracking Drill | SkillDrills',
    description: 'Trace winding corridor with steady cursor. 15pts per lap. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/precision-control/steady-hand',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Sustained Circuit Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steady Hand - Path Tracking Drill | SkillDrills',
    description: 'Trace the path, keep steady. Free precision training.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/precision-control/steady-hand',
  },
};

export default function SteadyHandPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
              { "@type": "ListItem", "position": 3, "name": "Precision Control", "item": "https://skilldrills.online/drills/motor/precision-control" },
              { "@type": "ListItem", "position": 4, "name": "Steady Hand" }
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
            "name": "Sustained Circuit Drill",
            "url": "https://skilldrills.online/drills/motor/precision-control/steady-hand",
            "description": "Free steady hand drill. Trace winding corridor with cursor. 15pts per lap. Corridor shrinks 50px to 12px with streak. 30s lap time limit.",
            "applicationCategory": "GameApplication",
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
                "name": "What is the Sustained Circuit drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free precision motor drill. Trace a winding corridor with cursor. 15pts per lap. Corridor shrinks 50px to 12px with streak."
                }
              },
              {
                "@type": "Question",
                "name": "How does the corridor shrinking work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 50px wide. Each lap shrinks by 2px (min 12px). Fail resets to 50px. Longer streak = narrower path."
                }
              },
              {
                "@type": "Question",
                "name": "Does this help with hand tremors?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Regular practice can help train smoother controlled movements. Not medical treatment but useful for improving cursor stability."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This steady hand drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <SteadyHandClient />
    </>
  );
}