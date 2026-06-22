import TracingClient from './TracingClient';

export const metadata = {
  title: 'Mouse Tracing Game - Free Wave Tracking Precision Drill | SkillDrills',
  description: 'Free mouse tracing game online. Follow a dynamic red wave filament with your cursor — the best mouse tracking game for precision control and smooth movement training. Auto-pauses off-wave. No sign-up.',
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
    'auto pause tracing', 'no penalty tracing', 'flow meter game',
    'skilldrills tracing', 'skilldrills motor drill', 'free precision training online',
    'browser tracing game', 'no download tracking game', 'instant mouse tracking',
  ],
  openGraph: {
    title: 'Mouse Tracing Game - Free Wave Tracking Precision Drill | SkillDrills',
    description: 'Free mouse tracing game. Follow a dynamic red wave filament — best mouse tracking game for precision and smooth movement. Auto-pauses off-wave. No sign-up.',
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
    description: 'Free mouse tracing game. Follow a dynamic wave filament. Best mouse tracking game for smooth precision. No sign-up.',
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
            "description": "Free mouse tracing game and wave tracking precision drill. Follow a dynamic red filament with 45px tolerance. Auto-pauses off-wave, resumes on return. Two modes: Pulse and Harmonic. Best mouse tracking game for smooth movement training.",
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
                "name": "What is this mouse tracing game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free mouse tracing game and wave tracking precision drill. Follow a dynamic red filament with 45px tolerance. Wave auto-pauses when you leave, resumes on return. Two modes: Pulse and Harmonic. Best free mouse tracking game for smooth movement training."
                }
              },
              {
                "@type": "Question",
                "name": "What happens when I leave the wave in this tracing game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The wave auto-pauses and stops scrolling. The flow meter decreases while off-wave. Return to the red filament to automatically resume. No penalties — this mouse tracing game focuses on positive smooth movement training."
                }
              },
              {
                "@type": "Question",
                "name": "What are the two waveform modes in this mouse tracking game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pulse mode: complex harmonic wave with varying amplitude — harder and less predictable. Harmonic mode: smooth sine wave — more rhythmic and flowable. Alternates every 6 seconds for varied mouse tracing practice."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this mouse tracing game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free mouse tracing game and wave tracking drill works instantly in your browser — no downloads needed."
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