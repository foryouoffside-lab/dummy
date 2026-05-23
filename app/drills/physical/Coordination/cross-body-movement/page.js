import CrossBodyMovementClient from './CrossBodyMovementClient';

export const metadata = {
  title: 'Cross-Body Movement - Coordination | SkillDrills',
  description: 'Connect nodes across screen along vector paths. +5pts per connection, streak bonuses every 5. No penalties. 60-second challenge. No sign-up.',
  keywords: [
    'cross body movement drill', 'bilateral coordination training', 'linear movement practice',
    'motor control training', 'node connection game', 'hand-eye coordination drill',
    'cross body exercise free', 'motor skills practice online', 'coordination drill online',
    'bilateral integration training', 'movement accuracy test', 'free coordination game',
    'vector path training', 'motor precision drill', 'cross lateral training',
    'bilateral coordination exercises', 'cross body movement exercises', 'motor coordination test',
    'hand eye coordination training', 'mouse control practice', 'cursor precision training',
    'bilateral movement drill', 'coordination skills test', 'motor planning exercise',
    'physical therapy coordination', 'occupational therapy exercise', 'brain body connection',
    'cross midline exercises', 'bilateral integration activities', 'motor sequencing drill',
    'skilldrills cross body', 'skilldrills coordination', 'free motor skills training',
    'online coordination practice', 'browser motor drill', 'no download coordination game',
    'reaction coordination training', 'precision movement drill', 'fine motor control practice',
    'gaming coordination training', 'esports motor skills', 'FPS aim coordination',
    'sports coordination drill', 'athletic motor training', 'movement accuracy practice',
  ],
  openGraph: {
    title: 'Cross-Body Movement - Coordination | SkillDrills',
    description: 'Connect nodes across the screen along vector paths. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/Coordination/cross-body-movement',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Cross-Body Movement Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cross-Body Movement - Coordination | SkillDrills',
    description: 'Train bilateral coordination connecting nodes. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Coordination/cross-body-movement',
  },
};

export default function CrossBodyMovementPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Coordination", "item": "https://skilldrills.online/drills/physical/Coordination" },
              { "@type": "ListItem", "position": 4, "name": "Cross-Body Movement" }
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
            "name": "Cross-Body Movement Drill",
            "url": "https://skilldrills.online/drills/physical/Coordination/cross-body-movement",
            "description": "Free bilateral coordination drill. Connect nodes across screen along vector paths. +5pts/connection, streak bonuses. No penalties. 60s challenge.",
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
                "name": "What is the Cross-Body Movement Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free coordination exercise. Connect nodes on opposite screen sides along vector paths. +5pts/connection, streak bonuses every 5. No penalties."
                }
              },
              {
                "@type": "Question",
                "name": "What is bilateral coordination?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Using both body sides together in coordinated way. Involves brain hemisphere communication. Essential for walking, typing, sports, music."
                }
              },
              {
                "@type": "Question",
                "name": "Is this helpful for physical therapy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Cross-body exercises are common in PT/OT for bilateral coordination, motor planning, and neural pathway strengthening. Consult your provider."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This coordination drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <CrossBodyMovementClient />
    </>
  );
}