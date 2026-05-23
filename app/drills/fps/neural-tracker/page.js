import NeuralTrackerClient from './NeuralTrackerClient';

export const metadata = {
  title: 'Neural Tracker - Smooth Target Drill | SkillDrills',
  description: 'Master smooth tracking with 5 bouncing balls and collision physics. Follow green target with raw mouse input. No penalties. No sign-up.',
  keywords: [
    'neural tracker', 'smooth tracking drill', 'continuous aim training',
    'target following practice', 'smooth aim FPS', 'tracking accuracy drill',
    'bouncing ball tracking', 'continuous tracking FPS', 'mouse tracking practice',
    'smooth aim trainer', 'precision tracking drill', 'free tracking trainer',
    'collision physics aim', 'positive reinforcement training',
    'FPS aim tracking', 'raw mouse input training', 'pointer lock aim trainer',
    'Valorant tracking practice', 'CS2 aim tracking', 'Overwatch tracking drill',
    'Apex Legends aim trainer', 'target prioritization training',
    'mouse control precision', 'sustained accuracy practice', 'no penalty aim trainer',
    'tracking score drill', 'accuracy percentage tracker', 'combo streak training',
    'free FPS aim drills', 'online tracking trainer', 'browser aim practice',
    'skilldrills neural tracker', 'skilldrills tracking drill', 'free aim tracking online',
    'competitive gaming practice', 'esports aim training', 'gaming mouse skills',
    'hand eye coordination FPS', 'visual tracking practice', 'moving target practice',
    'bouncing target aim', 'physics based aim trainer', 'realistic target movement',
  ],
  openGraph: {
    title: 'Neural Tracker - Smooth Target Drill | SkillDrills',
    description: 'Master smooth tracking with 5 bouncing balls and collision physics. Follow green target with raw mouse input. No penalties. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/neural-tracker',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Neural Tracker',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neural Tracker - Smooth Target Drill | SkillDrills',
    description: 'Master smooth tracking with 5 bouncing balls and collision physics. Follow green target with raw mouse input. No penalties. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/neural-tracker',
  },
};

export default function NeuralTrackerPage() {
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
              { "@type": "ListItem", "position": 2, "name": "FPS Training", "item": "https://skilldrills.online/drills/fps" },
              { "@type": "ListItem", "position": 3, "name": "Neural Tracker" }
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
            "name": "Neural Tracker",
            "url": "https://skilldrills.online/drills/fps/neural-tracker",
            "description": "Free smooth tracking drill with 5 bouncing balls and collision physics. Follow green target with raw mouse input. 60%+ accuracy earns points. No penalties.",
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
                "name": "What is the Neural Tracker drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free FPS aim drill with 5 bouncing balls using collision physics. Track the green target with raw mouse input. Earn points for 60%+ accuracy. No penalties."
                }
              },
              {
                "@type": "Question",
                "name": "Are there penalties for missing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No penalties. Pure positive reinforcement training. Misses simply don't earn points. Combo resets but score never decreases."
                }
              },
              {
                "@type": "Question",
                "name": "What FPS games does this help?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Valorant, CS2, Overwatch 2, Apex Legends, Call of Duty, Rainbow Six Siege, Fortnite, Rust, Escape from Tarkov, Destiny 2, and any tracking-heavy shooter."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This neural tracker is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <NeuralTrackerClient />
    </>
  );
}