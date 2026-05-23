import TargetAcquisitionClient from './TargetAcquisitionClient';

export const metadata = {
  title: 'Target Acquisition Drill - Luminance Priority FPS Training | SkillDrills',
  description: 'Click 5 targets in brightness order from highest to lowest opacity. 90-second challenge with score tracking, streak bonuses, and penalties. No sign-up.',
  keywords: [
    'target acquisition drill', 'FPS aim training', 'luminance priority training',
    'brightness targeting drill', 'visual priority FPS', 'free aim trainer',
    'target selection practice', 'opacity-based aiming', 'priority targeting FPS',
    'visual discrimination training', 'FPS reflex drill', 'competitive gaming practice',
    'Valorant aim trainer', 'CS2 target practice', 'Apex Legends training',
    'Overwatch aim drill', 'free FPS drills', 'online aim trainer',
    'mouse precision training', 'visual processing speed', 'gaming skills improvement',
    'skilldrills target acquisition', 'skilldrills FPS drill', 'free gaming practice',
  ],
  openGraph: {
    title: 'Target Acquisition Drill - Luminance Priority | SkillDrills',
    description: 'Click 5 targets in brightness order. 90-second challenge. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/target-acquisition',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Target Acquisition Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Target Acquisition FPS Drill | SkillDrills',
    description: 'Train luminance-based priority targeting. 90s challenge. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/target-acquisition',
  },
};

export default function TargetAcquisitionPage() {
  return (
    <>
      <noscript>
        <h1>Target Acquisition FPS Drill - Luminance Priority Aim Training</h1>
        <p>Free target acquisition drill. Click 5 targets in brightness order. 90-second challenge. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Target Acquisition" }
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
            "name": "Target Acquisition Drill",
            "url": "https://skilldrills.online/drills/fps/target-acquisition",
            "description": "Free FPS target acquisition drill. Click 5 targets in brightness order from highest to lowest opacity. 90-second challenge with streak bonuses and penalties.",
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
                "name": "What is the Target Acquisition drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free FPS exercise training luminance-based priority targeting. Click 5 targets in brightness order. +1 per correct set, -1 penalty for wrong order."
                }
              },
              {
                "@type": "Question",
                "name": "How does luminance targeting work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Targets appear with opacity from 1.0 to 0.4. Click in descending brightness order. Trains quick identification of most visible threats in varied lighting."
                }
              },
              {
                "@type": "Question",
                "name": "What games does this help with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Valorant, CS2, Overwatch 2, Apex Legends, Call of Duty, Rainbow Six Siege, Fortnite, and any competitive shooter."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This target acquisition drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <TargetAcquisitionClient />
    </>
  );
}