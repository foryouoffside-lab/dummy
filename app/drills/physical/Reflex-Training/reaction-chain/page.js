import ReactionChainClient from './ReactionChainClient';

export const metadata = {
  title: 'Reaction Chain Drill - Precision Stopping & Impulse | SkillDrills',
  description: 'Stop cursor on moving nodes to arrest them. No penalties, streak bonuses. Adaptive 400-1400px/s speed. Fullscreen doubles nodes. No sign-up.',
  keywords: [
    'reaction chain drill', 'kinetic arrest game', 'precision stopping training',
    'impulse control practice', 'cursor stopping drill', 'motor inhibition training',
    'stop cursor challenge', 'precision timing test', 'free impulse control game',
    'motor control stopping', 'reaction inhibition training', 'speed arrest drill',
    'stopping accuracy practice', 'kinetic control game', 'fullscreen reflex challenge',
    'mouse control training', 'FPS mouse precision', 'gaming reflex drill',
    'cognitive control exercise', 'motor response inhibition', 'cursor precision test',
    'adaptive speed training', 'streak bonus drill', 'no penalty reflex game',
    'skilldrills reaction chain', 'skilldrills kinetic arrest', 'free reflex training',
    'online impulse control', 'browser precision game', 'mouse stopping practice',
    'reaction speed drill', 'motor skill development', 'hand eye coordination',
    'gaming mouse practice', 'esports reflex training', 'competitive gaming drill',
    'cognitive motor training', 'inhibitory control exercise', 'stop signal task',
    'go no go training', 'response inhibition drill', 'executive function practice',
  ],
  openGraph: {
    title: 'Reaction Chain Drill - Precision Stopping | SkillDrills',
    description: 'Stop cursor on moving nodes. No penalties. Adaptive speed. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/Reflex-Training/reaction-chain',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Reaction Chain Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Chain Drill | SkillDrills',
    description: 'Train precision stopping. No penalties. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Reflex-Training/reaction-chain',
  },
};

export default function ReactionChainPage() {
  return (
    <>
      <noscript>
        <h1>Reaction Chain Drill - Precision Stopping & Impulse Control Training</h1>
        <p>Free kinetic arrest drill. Stop cursor on moving nodes. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Reflex Training", "item": "https://skilldrills.online/drills/physical/Reflex-Training" },
              { "@type": "ListItem", "position": 4, "name": "Reaction Chain" }
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
            "name": "Reaction Chain Drill",
            "url": "https://skilldrills.online/drills/physical/Reflex-Training/reaction-chain",
            "description": "Free precision stopping drill. Stop cursor on moving nodes to arrest them. No penalties, streak bonuses. Adaptive 400-1400px/s. Fullscreen doubles nodes.",
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
                "name": "What is the Reaction Chain Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free precision stopping game. Stop cursor on moving nodes to arrest them. Green ring = still enough. Red ring = moving. No penalties."
                }
              },
              {
                "@type": "Question",
                "name": "Are there penalties for missing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No point penalties. Only streak resets. Risk-free practice. Streak bonuses every 5 consecutive arrests reward consistency."
                }
              },
              {
                "@type": "Question",
                "name": "Is this helpful for FPS gaming?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Improves mouse control precision and impulse inhibition. Knowing when to stop is as important as flicking for Valorant, CS2, Apex."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This reaction chain drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ReactionChainClient />
    </>
  );
}