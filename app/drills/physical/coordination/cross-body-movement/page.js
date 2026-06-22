import CrossBodyMovementClient from './CrossBodyMovementClient';

export const metadata = {
  title: 'Hand Eye Coordination Game - Cross-Body Movement Training | SkillDrills',
  description: 'Free hand eye coordination game. Connect nodes across the screen along vector paths — the best coordination exercises for bilateral motor control. Streak bonuses, no penalties. 60 seconds. No sign-up.',
  keywords: [
    'hand eye coordination game', 'hand eye coordination exercises', 'hand eye coordination training',
    'free hand eye coordination game', 'online hand eye coordination', 'coordination game online',
    'coordination exercises online', 'coordination training online', 'free coordination exercises',
    'bilateral coordination training', 'cross body movement exercises', 'cross body exercise free',
    'motor coordination exercises', 'motor skills game online', 'motor control training',
    'cross midline exercises', 'bilateral integration training', 'brain body coordination',
    'node connection game', 'vector path training', 'movement accuracy training',
    'physical therapy coordination', 'occupational therapy exercise', 'motor planning game',
    'mouse control practice', 'cursor precision game', 'tracking game online',
    'FPS aim coordination', 'gaming coordination training', 'esports motor skills',
    'sports coordination drill', 'athletic coordination training', 'reflex coordination',
    'skilldrills cross body', 'skilldrills coordination', 'free motor skills game',
    'online coordination game', 'browser coordination drill', 'no download motor game',
    'streak bonus coordination', 'no penalty training game', 'positive coordination drill',
  ],
  openGraph: {
    title: 'Hand Eye Coordination Game - Free Cross-Body Movement Training | SkillDrills',
    description: 'Free hand eye coordination game. Connect nodes across the screen. Best coordination exercises for bilateral motor control. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/coordination/cross-body-movement',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Hand Eye Coordination Game - Cross-Body Movement Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hand Eye Coordination Game - Free Cross-Body Movement Training | SkillDrills',
    description: 'Free hand eye coordination game and coordination exercises. Connect nodes across the screen. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/coordination/cross-body-movement',
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
              { "@type": "ListItem", "position": 3, "name": "Coordination", "item": "https://skilldrills.online/drills/physical/coordination" },
              { "@type": "ListItem", "position": 4, "name": "Hand Eye Coordination Game - Cross-Body Movement" }
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
            "name": "Hand Eye Coordination Game - Cross-Body Movement Training",
            "url": "https://skilldrills.online/drills/physical/coordination/cross-body-movement",
            "description": "Free hand eye coordination game and coordination exercises. Connect nodes on opposite screen sides along vector paths. +5pts per connection, streak bonuses every 5. No penalties. 60-second bilateral coordination training challenge.",
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
                "name": "What is this hand eye coordination game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free hand eye coordination game and bilateral coordination exercise. Connect nodes on opposite screen sides along vector paths. +5pts per connection, streak bonuses every 5. No penalties in this 60-second coordination training challenge."
                }
              },
              {
                "@type": "Question",
                "name": "Why are cross-body coordination exercises effective?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cross-body coordination exercises require both brain hemispheres to communicate. Moving across the body midline activates bilateral neural pathways essential for walking, typing, sports performance, and gaming. This is one of the most effective coordination exercises available online."
                }
              },
              {
                "@type": "Question",
                "name": "Is this hand eye coordination game useful for physical therapy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Cross-body coordination exercises are commonly used in physical therapy and occupational therapy for bilateral coordination, motor planning, and neural pathway strengthening. Always consult your provider for clinical use."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this coordination game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free hand eye coordination game and coordination exercises drill works instantly in your browser — no downloads needed."
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