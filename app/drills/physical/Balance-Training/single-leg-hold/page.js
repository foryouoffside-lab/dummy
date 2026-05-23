import SingleLegEquilibriumClient from './SingleLegEquilibriumClient';

export const metadata = {
  title: 'Single Leg Equilibrium - Balance Stability Drill | SkillDrills',
  description: 'Maintain link between cursor and bouncing anchor. +1pt/2s connected, -1pt/s broken. Stability %, streak tracking. No sign-up.',
  keywords: [
    'single leg balance drill', 'equilibrium training', 'balance stability drill',
    'motor control exercise', 'cursor tracking stability', 'balance game online',
    'hand-eye coordination training', 'stability practice free', 'balance test online',
    'motor skills assessment', 'reaction balance training', 'free balance drill',
    'stability metrics', 'coordination exercise', 'balance challenge',
    'equilibrium test', 'motor control practice', 'sustained attention training',
    'mouse control drill', 'cursor accuracy practice', 'tracking stability test',
    'physical therapy exercise', 'balance rehabilitation', 'coordination assessment',
    'FPS aim training', 'mouse precision drill', 'hand stability exercise',
    'free coordination drill', 'online balance game', 'motor learning exercise',
    'skilldrills equilibrium', 'skilldrills balance', 'free physical training',
    'browser balance drill', 'no download coordination test', 'web based motor test',
  ],
  openGraph: {
    title: 'Single Leg Equilibrium - Balance Stability | SkillDrills',
    description: 'Maintain link between cursor and bouncing anchor. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/Balance-Training/single-leg-hold',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Single Leg Equilibrium',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Equilibrium Balance Drill | SkillDrills',
    description: 'Train motor control and stability. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Balance-Training/single-leg-hold',
  },
};

export default function SingleLegEquilibriumPage() {
  return (
    <>
      <noscript>
        <h1>Single Leg Equilibrium Drill - Balance Stability & Motor Control Training</h1>
        <p>Free equilibrium drill. Maintain cursor-anchor link. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
              { "@type": "ListItem", "position": 3, "name": "Balance Training", "item": "https://skilldrills.online/drills/physical/Balance-Training" },
              { "@type": "ListItem", "position": 4, "name": "Single Leg Equilibrium" }
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
            "name": "Single Leg Equilibrium Drill",
            "url": "https://skilldrills.online/drills/physical/Balance-Training/single-leg-hold",
            "description": "Free balance drill. Maintain cursor-anchor link. Green connected: +1pt/2s. Red broken: -1pt/s. Stability tracking. 60s challenge.",
            "applicationCategory": "HealthApplication",
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
                "name": "What is the Single Leg Equilibrium Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free balance exercise. Maintain cursor-anchor link. Green connected: +1pt/2s. Red broken: -1pt/s. Tracks stability, streaks, mistakes."
                }
              },
              {
                "@type": "Question",
                "name": "Is this useful for FPS gaming?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Smooth tracking and directional changes translate to better aim in Valorant, CS2, Overwatch, Apex Legends."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Balance stability, motor control, hand-eye coordination, sustained attention, mouse precision, and tracking accuracy."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This equilibrium drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <SingleLegEquilibriumClient />
    </>
  );
}