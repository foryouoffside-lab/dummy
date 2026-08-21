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
                "name": "What is hand eye coordination?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hand eye coordination is the neurological process of your brain simultaneously processing visual input from your eyes to guide and control the fine motor movements of your hands."
                }
              },
              {
                "@type": "Question",
                "name": "Why are cross body exercises important?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cross body exercises force the left and right hemispheres of your brain to communicate rapidly. This strengthens motor planning, spatial awareness, and overall physical agility."
                }
              },
              {
                "@type": "Question",
                "name": "Can this hand eye coordination game improve mouse control?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. By demanding long, perfectly straight, sweeping movements without deviating off a narrow path, it punishes jittery clicks and rewards smooth, deliberate mouse precision."
                }
              },
              {
                "@type": "Question",
                "name": "Are there time penalties for missing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, drifting off the designated vector path instantly triggers a 3-second penalty to your clock, but a successful connection grants a 3-second reward."
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