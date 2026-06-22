import ReactionChainClient from './ReactionChainClient';

export const metadata = {
  title: 'Mouse Precision Test - Free Reaction Training & Reflex Game | SkillDrills',
  description: 'Free mouse precision test and reaction training game. Stop your cursor on moving nodes to arrest them — the best reflex training for mouse control and hand eye coordination. Adaptive speed 400–1400px/s. No sign-up.',
  keywords: [
    'mouse precision test', 'mouse precision training', 'free mouse precision test',
    'cursor precision test', 'mouse accuracy test', 'mouse control test online',
    'reaction training game', 'free reaction training', 'reaction training online',
    'reflex training game', 'reflex game online', 'free reflex game',
    'hand eye coordination test', 'hand eye coordination training', 'hand eye coordination game',
    'precision stopping game', 'impulse control game', 'motor control training',
    'cursor stopping drill', 'mouse control drill', 'click precision game',
    'reaction chain drill', 'kinetic arrest game', 'motor inhibition training',
    'reaction speed training', 'reaction time drill', 'reflex speed game',
    'FPS mouse precision', 'gaming mouse accuracy', 'esports mouse training',
    'Valorant mouse control', 'CS2 precision training', 'Apex mouse accuracy',
    'adaptive reaction training', 'streak bonus reflex', 'no penalty reflex game',
    'fullscreen reflex challenge', 'double node challenge', 'precision reflex drill',
    'cognitive control exercise', 'response inhibition game', 'stop signal training',
    'skilldrills reaction chain', 'skilldrills precision', 'free online reflex training',
    'browser mouse test', 'no download mouse precision', 'instant mouse accuracy game',
  ],
  openGraph: {
    title: 'Mouse Precision Test - Free Reaction Training & Reflex Game | SkillDrills',
    description: 'Free mouse precision test and reaction training game. Stop cursor on moving nodes. Best reflex training for mouse control. Adaptive speed. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/reflex-training/reaction-chain',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Mouse Precision Test - Reaction Training Game',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mouse Precision Test - Free Reaction Training & Reflex Game | SkillDrills',
    description: 'Free mouse precision test. Stop cursor on moving nodes. Best reaction training and reflex game for mouse control. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/reflex-training/reaction-chain',
  },
};

export default function ReactionChainPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Reflex Training", "item": "https://skilldrills.online/drills/physical/reflex-training" },
              { "@type": "ListItem", "position": 4, "name": "Mouse Precision Test - Reaction Chain" }
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
            "name": "Mouse Precision Test - Free Reaction Training & Reflex Game",
            "url": "https://skilldrills.online/drills/physical/reflex-training/reaction-chain",
            "description": "Free mouse precision test and reaction training game. Stop cursor on moving nodes to arrest them. No penalties, streak bonuses. Adaptive speed 400-1400px/s. Fullscreen mode doubles nodes. Best reflex training for hand eye coordination and mouse control.",
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
                "name": "What is this mouse precision test and reaction training game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free mouse precision test and reaction training drill. Moving nodes bounce across the screen — stop your cursor on them to arrest them. Green ring means you stopped precisely enough. No penalties, only streak bonuses for consistency."
                }
              },
              {
                "@type": "Question",
                "name": "Are there penalties in this reflex training game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No point penalties. Only streak resets on a miss. This makes it a risk-free reaction training game — great for building mouse precision confidence. Streak bonuses every 5 consecutive arrests reward consistent accuracy."
                }
              },
              {
                "@type": "Question",
                "name": "How does this mouse precision test help FPS gaming?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Improves cursor deceleration control and impulse inhibition — knowing when to stop is as important as flicking. Essential mouse precision training for Valorant, CS2, Apex Legends, and Overwatch 2."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this mouse precision test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free mouse precision test and reaction training game works instantly in your browser — no downloads needed."
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