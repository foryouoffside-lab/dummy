import ClickAccuracyClient from './ClickAccuracyClient';

export const metadata = {
  title: 'Click Accuracy Elite - Precision Mouse Training | SkillDrills',
  description: 'Single teleporting target shrinks from 12px to 7px with streak. 1.5s teleport interval. 3-life system, reaction tracking. No sign-up.',
  keywords: [
    'click accuracy', 'mouse precision', 'precision clicking', 'teleport target',
    'click trainer', 'mouse accuracy drill', 'reaction time test', 'precision aim',
    'single target tracking', 'mouse control practice', 'click speed test',
    'accuracy training', 'FPS aim drill', 'free aim trainer', 'mouse coordination',
    'click accuracy free', 'teleport target drill free', 'precision mouse training',
    'single target aim', 'mouse click precision', 'reaction click test',
    'shrinking target drill', 'cursor accuracy practice', 'precision clicking game',
    'skilldrills click accuracy', 'skilldrills motor drills', 'skilldrills precision',
    'flick shot practice', 'mouse accuracy test', 'click precision training',
    'target tracking drill', 'precision aim practice', 'mouse control training free',
  ],
  openGraph: {
    title: 'Click Accuracy Elite - Precision Mouse | SkillDrills',
    description: 'Single teleporting target shrinks with streak. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/click-accuracy',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Click Accuracy Elite',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Click Accuracy Elite | SkillDrills',
    description: 'Single teleporting target. Reaction tracking. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/hand-eye-coordination/click-accuracy',
  },
};

export default function ClickAccuracyPage() {
  return (
    <>
      <noscript>
        <h1>Click Accuracy Elite - Precision Mouse Training & Teleport Tracking</h1>
        <p>Free click accuracy drill with single teleporting target. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
              { "@type": "ListItem", "position": 3, "name": "Hand-Eye Coordination", "item": "https://skilldrills.online/drills/motor/hand-eye-coordination" },
              { "@type": "ListItem", "position": 4, "name": "Click Accuracy" }
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
            "name": "Click Accuracy Elite",
            "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/click-accuracy",
            "description": "Free precision mouse drill. Single target teleports every 1.5s. Shrinks from 12px to 7px with streak. 3-life system, millisecond reaction tracking.",
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
                "name": "What is the Click Accuracy Elite?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free precision mouse drill. Single target teleports every 1.5s. Shrinks 12px to 7px with streak. Colors: white (0-4), green (5-9), cyan (10+)."
                }
              },
              {
                "@type": "Question",
                "name": "How does the streak system work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Target shrinks 0.12px per streak (min 7px). 10x streak bonuses. 20x streak special sound. Miss resets streak. 3-life protection system."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mouse precision, click accuracy, target tracking, reaction speed, and hand-eye coordination. Transfers to FPS flick shots and graphic design."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This click accuracy drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ClickAccuracyClient />
    </>
  );
}