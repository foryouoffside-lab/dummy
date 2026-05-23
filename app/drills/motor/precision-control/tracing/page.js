import TracingClient from './TracingClient';

export const metadata = {
  title: 'Wave Tracing - Flow State Tracking | SkillDrills',
  description: 'Follow a dynamic red wave filament with 45px tolerance. Auto-pauses off-wave, resumes on return. Two waveform modes. +1pt/sec. No sign-up.',
  keywords: [
    'wave tracing drill', 'cursor tracking practice', 'flow state training', 'smooth movement drill',
    'filament tracing game', 'mouse precision training', 'wave following practice', 'motor control exercise',
    'hand steadiness drill', 'tracking accuracy test', 'precision motor training free',
    'dynamic wave tracking', 'free tracing drill online', 'cursor control practice',
    'flow state drill', 'mouse smoothing practice', 'hand eye coordination drill',
    'gaming mouse training', 'aim smoothing drill', 'cursor precision test',
    'motor skills training', 'fine motor control practice', 'mouse accuracy drill',
    'free motor drills', 'online tracing game', 'browser wave tracing',
    'skilldrills tracing', 'skilldrills motor drill', 'free precision training',
    'smooth tracking exercise', 'wave following test', 'filament tracking drill',
    'flow meter training', 'streak tracking drill', 'auto resume tracing',
  ],
  openGraph: {
    title: 'Wave Tracing - Flow State Tracking | SkillDrills',
    description: 'Follow dynamic red wave filament. +1/sec on wave. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/precision-control/tracing',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Wave Tracing Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wave Tracing - Flow State Tracking | SkillDrills',
    description: 'Master smooth cursor tracking with flow state. Free.',
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
              { "@type": "ListItem", "position": 4, "name": "Wave Tracing" }
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
            "name": "Wave Tracing Drill",
            "url": "https://skilldrills.online/drills/motor/precision-control/tracing",
            "description": "Free wave tracing drill. Follow dynamic red filament with 45px tolerance. Auto-pauses off-wave, resumes on return. Two modes: Pulse and Harmonic.",
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
                "name": "What is the Wave Tracing Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free cursor tracking exercise. Follow a dynamic red wave filament with 45px tolerance. Auto-pauses off-wave. Two modes: Pulse and Harmonic."
                }
              },
              {
                "@type": "Question",
                "name": "What happens when I leave the wave?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Wave auto-pauses and stops scrolling. Flow meter decreases. Return to red filament to auto-resume. No penalties."
                }
              },
              {
                "@type": "Question",
                "name": "What are the two waveform modes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pulse (complex harmonic with varying amplitude) and Harmonic (smooth sine wave). Alternates every 6 seconds."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This wave tracing drill is completely free and works instantly in your browser."
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