import TracingClient from './TracingClient';

export const metadata = {
  title: 'Mouse Tracing Game - Free Wave Tracking Precision Drill | SkillDrills',
  description: 'Free mouse tracing game online. Follow a continuously scrolling red wave filament with your cursor — the best mouse tracking game for precision control and flow-state endurance training. Speed ramps up over 45 seconds. No sign-up.',
  keywords: [
    'mouse tracing game', 'mouse tracing game online', 'free mouse tracing game',
    'wave tracing game', 'cursor tracing game', 'mouse tracking game',
    'mouse tracking exercise', 'cursor tracking drill', 'tracking game online',
    'smooth mouse movement', 'smooth cursor game', 'flow state training game',
    'mouse precision training', 'mouse precision game', 'cursor control game',
    'hand eye coordination game', 'hand eye coordination training', 'hand eye coordination drill',
    'fine motor control game', 'fine motor skills game', 'motor precision training',
    'wave following game', 'filament tracking drill', 'dynamic wave game',
    'aim smoothing game', 'mouse smoothing drill', 'tracking accuracy game',
    'FPS tracking training', 'gaming mouse tracking', 'aim trainer tracking',
    'smooth pursuit training', 'visual motor game', 'motor control exercise',
    'adaptive speed tracing', 'no penalty tracing', 'flow meter game',
    'skilldrills tracing', 'skilldrills motor drill', 'free precision training online',
    'browser tracing game', 'no download tracking game', 'instant mouse tracking',
  ],
  openGraph: {
    title: 'Mouse Tracing Game - Free Wave Tracking Precision Drill | SkillDrills',
    description: 'Free mouse tracing game. Follow a continuously scrolling red wave filament — best mouse tracking game for precision and flow-state endurance. Speed ramps up over 45 seconds. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/precision-control/tracing',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Mouse Tracing Game - Wave Tracking Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mouse Tracing Game - Free Wave Tracking Precision Drill | SkillDrills',
    description: 'Free mouse tracing game. Follow a continuously scrolling wave filament. Best mouse tracking game for flow-state precision. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/precision-control/tracing',
  },
};

export default function TracingPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Mouse Tracing Game - Wave Tracking Drill" }
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
            "name": "Mouse Tracing Game - Free Wave Tracking Precision Drill",
            "url": "https://skilldrills.online/drills/motor/precision-control/tracing",
            "description": "Free mouse tracing game and wave tracking precision drill. Follow a continuously scrolling red filament with a 20px tolerance band. The wave never stops — re-acquire it quickly after slipping off to keep your flow score climbing. Speed ramps up over the 45-second session. Best mouse tracking game for flow-state endurance training.",
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
                "name": "Why does the wave keep moving?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The continuous motion mimics tracking smooth dynamic targets in tactical games. Re-acquiring target alignment under motion trains rapid adaptive crosshair recentering."
                }
              },
              {
                "@type": "Question",
                "name": "How is Flow Integrity calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Flow Integrity is a 0-100 meter that rises while your crosshair stays aligned on the wave and drains when you drift off, tracked across your 45-second session."
                }
              }
            ]
          })
        }}
      />
      <TracingClient />
    </>
  );
}