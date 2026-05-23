import EntropicGridClient from './EntropicGridClient';

export const metadata = {
  title: 'Entropic Grid Drill - Visual Search & Stamina Training | SkillDrills',
  description: 'Find 2-char targets in a 100-cell grid while entropy corrupts 3 cells every 800ms. Stamina system with decay. Target refreshes every 15s. No sign-up.',
  keywords: [
    'entropic grid', 'visual search training', 'stamina system drill',
    'entropy search', 'target finding game', 'visual scanning drill',
    'concentration grid', 'character search', 'cognitive stamina',
    'visual processing speed', 'attention training', 'focus drill',
    'free visual search game', 'entropy challenge',
    'entropic grid free', 'visual search with entropy', 'stamina management game',
    'grid search drill', 'cognitive endurance training', 'visual noise drill',
    'sustained attention practice', 'processing under distraction', 'target search game',
    'skilldrills entropic grid', 'skilldrills visual search', 'skilldrills entropy',
    '100 cell grid search', 'character finding drill', 'stamina decay game',
    'memory flush drill', 'visual clutter training', 'search accuracy practice',
  ],
  openGraph: {
    title: 'Entropic Grid Drill - Visual Search & Stamina | SkillDrills',
    description: '100-cell grid with entropy corrupting 3 cells every 800ms. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/visual-recognition/entropic-grid',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Entropic Grid Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entropic Grid Drill | SkillDrills',
    description: '100-cell grid with entropy and stamina. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/visual-recognition/entropic-grid',
  },
};

export default function EntropicGridPage() {
  return (
    <>
      <noscript>
        <h1>Entropic Grid Drill - Visual Search with Stamina & Entropy System Training</h1>
        <p>Free visual search drill with 100-cell grid, entropy corruption, and stamina management. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
              { "@type": "ListItem", "position": 3, "name": "Visual Recognition", "item": "https://skilldrills.online/drills/visual/visual-recognition" },
              { "@type": "ListItem", "position": 4, "name": "Entropic Grid" }
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
            "name": "Entropic Grid Drill",
            "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid",
            "description": "Free visual search drill. 100-cell grid with entropy corrupting 3 cells every 800ms. Stamina system: +5 hit, -15 wrong, -0.5/s decay. Target changes every 15s.",
            "applicationCategory": "EducationalApplication",
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
                "name": "What is the Entropic Grid Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free visual search exercise. Find 2-char targets in a 100-cell grid. Entropy corrupts 3 cells every 800ms. Stamina system with decay."
                }
              },
              {
                "@type": "Question",
                "name": "How does the stamina system work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "100 stamina. +5 per correct hit, -15 per wrong click, -0.5/s decay. Stamina at zero = game over. Bar turns red below 30."
                }
              },
              {
                "@type": "Question",
                "name": "How does the entropy system work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Every 800ms, 3 random cells get new codes. 5% chance a corrupted cell becomes the target. Creates constant visual noise."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This entropic grid drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <EntropicGridClient />
    </>
  );
}