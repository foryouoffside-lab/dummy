import SteadyHandClient from './SteadyHandClient';

export const metadata = {
  title: 'Steady Hand Game - Free Mouse Path Tracing Drill | SkillDrills',
  description: 'Free steady hand game online. Trace a winding corridor with steady cursor control — the best mouse precision and hand steadiness drill. Corridor shrinks with streak. No sign-up.',
  keywords: [
    'steady hand game', 'steady hand game online', 'free steady hand game',
    'steady hand test', 'steady hand drill', 'hand steadiness test',
    'mouse path tracing', 'path tracing game', 'mouse tracing game',
    'cursor path game', 'mouse maze game', 'mouse control game',
    'mouse precision training', 'mouse precision test', 'cursor precision game',
    'hand eye coordination game', 'hand eye coordination training', 'hand eye coordination test',
    'fine motor control game', 'fine motor skills game', 'fine motor training',
    'motor control exercise', 'motor precision drill', 'precision movement game',
    'hand tremor game', 'hand stability training', 'smooth cursor control',
    'gaming mouse steadiness', 'digital artist mouse control', 'graphic design precision',
    'surgeon hand training', 'occupational therapy game', 'motor rehabilitation game',
    'circuit tracing game', 'winding path game', 'corridor tracing drill',
    'skilldrills steady hand', 'skilldrills motor drill', 'free precision training',
    'browser steady hand game', 'no download tracing game', 'instant mouse game',
  ],
  openGraph: {
    title: 'Steady Hand Game - Free Mouse Path Tracing Drill | SkillDrills',
    description: 'Free steady hand game online. Trace a winding corridor with steady cursor control. Best hand steadiness and mouse precision drill. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/precision-control/steady-hand',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Steady Hand Game - Mouse Path Tracing',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steady Hand Game - Free Mouse Path Tracing Drill | SkillDrills',
    description: 'Free steady hand game. Trace a winding corridor. Best mouse precision and hand steadiness drill. No sign-up.',
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
              { "@type": "ListItem", "position": 4, "name": "Steady Hand Game - Mouse Path Tracing" }
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
            "name": "Steady Hand Game - Free Mouse Path Tracing Drill",
            "url": "https://skilldrills.online/drills/motor/precision-control/steady-hand",
            "description": "Free steady hand game and mouse path tracing drill. Trace a winding corridor with cursor. 15pts per lap. Corridor shrinks 50px to 12px with streak. 30-second lap time limit. Best hand steadiness game online.",
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
                "name": "Why does my cursor teleport back?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If your crosshair deviates from the exact glowing cyan line, it is an instant failure. The engine continuously runs a mathematical check between your mouse coordinates and the line, penalizing you and resetting your crosshair to the starting safe zone."
                }
              },
              {
                "@type": "Question",
                "name": "How should I grip the mouse?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hold the mouse with a relaxed grip. Tensing your muscles will cause micro-jitters, pushing your crosshair off the tracking line. Smooth, flowing motions are key."
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