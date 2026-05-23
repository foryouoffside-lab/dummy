import AnchorFlickClient from './AnchorFlickClient';

export const metadata = {
  title: 'Anchor Flick Trainer - Raw Input FPS Aim Drill | SkillDrills',
  description: 'Master flick shots with raw mouse input. Click anchor, flick to shrinking target. Speed-based scoring, shot analytics, path efficiency tracking. No sign-up.',
  keywords: [
    'anchor flick trainer', 'flick shot training', 'flick aim practice free',
    'raw mouse input trainer', 'pointer lock aim trainer', 'FPS flick drill',
    'precision flick training', 'anchor based aim drill', 'flick shot distance',
    'flick accuracy trainer', 'FPS aim practice online', 'free flick trainer',
    'pixel distance flick', 'anchor target drill', 'shrinking target flick',
    'speed bonus flick', 'flick reaction time', 'flick path efficiency',
    'Valorant flick trainer', 'CS2 flick practice', 'Overwatch aim drill',
    'Apex Legends flick training', 'R6 Siege aim practice', 'competitive FPS training',
    'esports flick drill', 'gaming aim trainer free', 'mouse accuracy flick',
    'target acquisition flick', 'one tap flick trainer', 'headshot flick practice',
    'skilldrills flick trainer', 'skilldrills anchor flick', 'free aim trainer online',
    'browser flick trainer', 'no download aim trainer', 'web based flick drill',
    'flick shot analyzer', 'overshoot undershoot tracking', 'aim analytics free',
  ],
  openGraph: {
    title: 'Anchor Flick Trainer - Raw Input Aim | SkillDrills',
    description: 'Raw mouse input flick trainer with shrinking targets. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/flick-training',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Anchor Flick Trainer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anchor Flick Trainer | SkillDrills',
    description: 'Raw mouse input flick training with shrinking targets. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/flick-training',
  },
};

export default function AnchorFlickPage() {
  return (
    <>
      <noscript>
        <h1>Anchor Flick Trainer - Raw Mouse Input FPS Aim & Precision Training</h1>
        <p>Free anchor flick trainer with raw mouse input and speed-based scoring. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "FPS Training", "item": "https://skilldrills.online/drills/fps" },
              { "@type": "ListItem", "position": 3, "name": "Anchor Flick Trainer" }
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
            "name": "Anchor Flick Trainer",
            "url": "https://skilldrills.online/drills/fps/flick-training",
            "description": "Free anchor flick trainer with raw mouse input. Click anchor, flick to shrinking target for speed-based scoring. Shot analytics and path efficiency tracking.",
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
                "name": "What is the Anchor Flick Trainer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free FPS aim drill using raw mouse input. Click the anchor to spawn a shrinking target, then flick to hit it. Speed-based scoring rewards faster flicks."
                }
              },
              {
                "@type": "Question",
                "name": "How does scoring work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Points = 5000 divided by reaction time in ms (minimum 10). Faster flicks earn more points. Consecutive hits build combo streaks."
                }
              },
              {
                "@type": "Question",
                "name": "What analytics are tracked?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hits, misses, overshoots, undershoots, average reaction time, path efficiency, and average deviation from target center."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This flick trainer is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <AnchorFlickClient />
    </>
  );
}