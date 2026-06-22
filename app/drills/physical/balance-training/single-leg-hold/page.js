import SingleLegEquilibriumClient from './SingleLegEquilibriumClient';

export const metadata = {
  title: 'Single Leg Balance Exercises - Free Balance Training Online | SkillDrills',
  description: 'Free single leg balance exercises online. Maintain cursor link to a moving anchor — the best balance training game for stability and motor control. 60-second timed challenge. No sign-up.',
  keywords: [
    'single leg balance exercises', 'single leg balance training', 'balance training online',
    'balance training game', 'free balance training', 'balance test online',
    'balance exercises online', 'balance training for athletes', 'balance drill free',
    'motor control exercise', 'stability training online', 'stability drill free',
    'hand eye coordination training', 'coordination training online', 'coordination game free',
    'equilibrium training', 'balance stability drill', 'balance challenge game',
    'physical therapy balance exercises', 'balance rehabilitation online', 'vestibular training',
    'cursor tracking stability', 'mouse precision training', 'tracking accuracy test',
    'FPS aim training', 'mouse control drill', 'gaming coordination practice',
    'balance game online free', 'online balance test', 'free motor skills test',
    'brain body balance training', 'neuromuscular training', 'proprioception exercises',
    'skilldrills equilibrium', 'skilldrills balance', 'free physical training online',
    'browser balance drill', 'no download balance test', 'instant balance game',
  ],
  openGraph: {
    title: 'Single Leg Balance Exercises - Free Balance Training Online | SkillDrills',
    description: 'Free single leg balance exercises and balance training game online. Track a moving anchor — 60-second timed stability challenge. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/balance-training/single-leg-hold',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Single Leg Balance Exercises - Balance Training Online',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Single Leg Balance Exercises - Free Balance Training Online | SkillDrills',
    description: 'Free single leg balance exercises online. Best balance training game for motor control. 60 seconds. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/balance-training/single-leg-hold',
  },
};

export default function SingleLegEquilibriumPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
              { "@type": "ListItem", "position": 3, "name": "Balance Training", "item": "https://skilldrills.online/drills/physical/balance-training" },
              { "@type": "ListItem", "position": 4, "name": "Single Leg Balance Exercises" }
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
            "name": "Single Leg Balance Exercises - Balance Training Online",
            "url": "https://skilldrills.online/drills/physical/balance-training/single-leg-hold",
            "description": "Free single leg balance exercises and online balance training game. Maintain cursor-anchor link to a bouncing target. +1pt/2s connected, -1pt/s broken. Stability tracking, streaks, 60-second challenge.",
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
                "name": "What are single leg balance exercises online?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free digital balance training game that simulates single leg balance exercises. Maintain cursor-anchor link to a bouncing target. Green connected: +1pt/2s. Red broken: -1pt/s. Tracks stability percentage, streaks, and mistakes."
                }
              },
              {
                "@type": "Question",
                "name": "How does this balance training help athletes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Smooth cursor tracking and directional control transfers to real balance training skills. Also improves aim precision in FPS games like Valorant, CS2, Overwatch, and Apex Legends."
                }
              },
              {
                "@type": "Question",
                "name": "What skills do these balance exercises improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Balance stability, motor control, hand-eye coordination, sustained attention, mouse precision, tracking accuracy, and neuromuscular coordination — all developed through this online balance training drill."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. These single leg balance exercises and balance training drills are completely free and work instantly in your browser."
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