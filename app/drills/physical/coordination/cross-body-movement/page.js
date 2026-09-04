import CrossBodyMovementClient from './CrossBodyMovementClient';

export const metadata = {
  title: 'Hand Eye Coordination Game - Free Cross Body Drill',
  description: 'Free hand eye coordination game. Connect nodes across the screen to train bilateral coordination, cross-body movement and mouse accuracy.',
  keywords: [
    'hand eye coordination game', 'hand eye coordination exercises', 'hand eye coordination training',
    'free hand eye coordination game', 'online hand eye coordination', 'hand eye coordination test',
    'bilateral coordination training', 'cross body movement exercises', 'cross body coordination',
    'motor coordination exercises', 'fine motor skills game', 'motor control training',
    'cross midline exercises', 'bilateral integration training', 'brain body coordination',
    'occupational therapy exercises', 'physical therapy exercises', 'motor planning game',
    'mouse control practice', 'cursor precision game', 'gaming reflex training',
    'FPS aim training', 'gaming coordination training', 'esports motor skills',
    'sports coordination drill', 'athletic coordination training', 'mouse accuracy',
    'best hand eye coordination game', 'free motor skills game', 'browser coordination game'
  ],
  openGraph: {
    title: 'Hand Eye Coordination Game - Free Cross Body Drill',
    description: 'Improve bilateral coordination and fine motor skills with this free hand eye coordination game. Connect nodes across the screen to build cross-body movement accuracy.',
    type: 'website',
    url: 'https://skilldrills.online/drills/physical/coordination/cross-body-movement',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Hand Eye Coordination Game - Cross Body Movement Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hand Eye Coordination Game - Free Cross Body Drill',
    description: 'Play this free hand eye coordination game to improve bilateral motor control and mouse accuracy. No sign-up required.',
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
            "description": "Free hand eye coordination game targeting bilateral integration and cross-body movement. Tracing nodes across the screen improves mouse control. Features dynamic time rewards (+3s) and penalties (-3s).",
            "applicationCategory": "GameApplication",
            "operatingSystem": "Web Browser",
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
            "@type": "SoftwareApplication",
            "name": "SkillDrills Bilateral Coordination Trainer",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "All",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "1840"
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to play the Hand Eye Coordination Game",
            "description": "A step-by-step guide to testing your cross-body movement and bilateral motor control.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Activate the Node",
                "text": "Start by hovering your cursor over the White Node to activate the straight vector line."
              },
              {
                "@type": "HowToStep",
                "name": "Trace the Path",
                "text": "Physically trace your mouse along the glowing path, moving directly across your body's midline to reach the Green Node."
              },
              {
                "@type": "HowToStep",
                "name": "Maintain Accuracy",
                "text": "If you deviate outside the path's tolerance width, you will fail the connection and lose 3 seconds from your clock."
              },
              {
                "@type": "HowToStep",
                "name": "Survive the Clock",
                "text": "Earn 3 seconds back for every successful connection. Connect as many opposite-side nodes as possible to build high scores and survive."
              }
            ]
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
                "name": "What is Cross-Body Movement Pro?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cross-Body Movement Pro is a physical coordination drill testing bilateral motor control and diagonal line tracing precision. It forces players to sweep their mouse across large diagonal screen distances within tight corridor bounds."
                }
              },
              {
                "@type": "Question",
                "name": "How do vector connection mechanics work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Touch the starting cyan node to activate the connection line, then trace directly along the vector to the target magenta node. Deviating past the corridor tolerance breaks connection."
                }
              },
              {
                "@type": "Question",
                "name": "Does this drill improve gaming performance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Sweeping wide diagonal angles trains the arm muscles for large flick movements, target switching across screens, and smooth mouse resetting in fast-paced shooters."
                }
              },
              {
                "@type": "Question",
                "name": "How does difficulty scaling work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "As you score points, your level rises up to Level 15. Path corridor width shrinks from 10px down to 4px, node radius shrinks from 16px to 8px, and node placement variance increases."
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