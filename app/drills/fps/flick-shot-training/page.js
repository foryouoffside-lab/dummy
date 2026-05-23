import ProFlickClient from './ProFlickClient';

export const metadata = {
  title: 'Pro Flick Training - Raw Mouse Input Aim Trainer | SkillDrills',
  description: 'Master flick shots with raw mouse input via Pointer Lock API. Sensitivity matched for Valorant, CS2, Overwatch, Apex, Fortnite, and Quake. No sign-up.',
  keywords: [
    'pro flick trainer', 'flick shot training', 'raw mouse input aim trainer',
    'free aim trainer', 'FPS flick practice', 'Valorant aim trainer',
    'CS2 aim practice', 'Overwatch flick training', 'Apex Legends aim drill',
    'Fortnite aim trainer', 'Quake flick practice', 'pointer lock aim trainer',
    'no acceleration aim training', '1:1 mouse input', 'sensitivity matched aim',
    'cm/360 calculator', 'flick accuracy drill', 'target acquisition speed',
    'reaction time training', 'path efficiency tracking', 'shot analysis tool',
    'overshoot undershoot analysis', 'competitive FPS training', 'esports aim practice',
    'free flick trainer online', 'browser aim trainer', 'no download aim practice',
    'skilldrills flick trainer', 'skilldrills FPS drill', 'pro grade aim training',
    'raw input flick practice', 'gaming mouse training', 'precision aim drill',
  ],
  openGraph: {
    title: 'Pro Flick Training - Raw Mouse Input Trainer | SkillDrills',
    description: 'Sensitivity-matched flick training with raw mouse input. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/flick-shot-training',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Pro Flick Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pro Flick Trainer - Raw Input Aim | SkillDrills',
    description: 'Sensitivity-matched flick training with raw mouse input. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/flick-shot-training',
  },
};

export default function ProFlickPage() {
  return (
    <>
      <noscript>
        <h1>Pro Flick Training Tool - Raw Mouse Input Aim Trainer for FPS Gaming</h1>
        <p>Free pro flick trainer with raw mouse input and sensitivity matching for Valorant, CS2, Overwatch, Apex, Fortnite, and Quake. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Pro Flick Training" }
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
            "name": "Pro Flick Training",
            "url": "https://skilldrills.online/drills/fps/flick-training",
            "description": "Free pro flick trainer with raw mouse input and sensitivity matching for Valorant, CS2, Overwatch, Apex, Fortnite, and Quake. Shot analysis included.",
            "applicationCategory": "GamingApplication",
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
                "name": "What is the Pro Flick Training Tool?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free browser aim trainer using raw mouse input via Pointer Lock API. Sensitivity matching for Valorant, CS2, Overwatch, Apex, Fortnite, and Quake with cm/360 calculation."
                }
              },
              {
                "@type": "Question",
                "name": "How does raw mouse input work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pointer Lock API provides raw mouse movement without OS acceleration. Sensitivity matched to your game using cm/360 for 1:1 muscle memory transfer."
                }
              },
              {
                "@type": "Question",
                "name": "What games are supported?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Valorant, CS2, Overwatch, Apex Legends, Fortnite, and Quake. Enter your DPI and in-game sensitivity for matched training."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This pro flick trainer is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ProFlickClient />
    </>
  );
}