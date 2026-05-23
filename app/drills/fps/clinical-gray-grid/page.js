import ClinicalGrayGridClient from './ClinicalGrayGridClient';

export const metadata = {
  title: 'Clinical Gray Grid - Aim & Reaction | SkillDrills',
  description: '4x4 grid with 450ms red flash targets. Raw mouse input, 3 lives, shot analytics tracking overshoots and path efficiency. No sign-up.',
  keywords: [
    'clinical gray grid', '4x4 grid aim trainer', 'precision aim training', 'grid reaction drill',
    'FPS grid aim', 'target acquisition drill', 'red target grid', 'aim precision FPS',
    'grid click training', 'reaction time grid', 'clinical aim drill', 'free aim trainer online',
    'FPS precision drill', 'grid target practice', 'pointer lock aim trainer',
    'raw mouse input training', 'flick aim grid', '450ms target drill', 'shot analytics aim',
    'overshoot undershoot tracking', 'path efficiency aim', '4x4 target grid',
    'Valorant aim trainer', 'CS2 aim practice', 'Overwatch aim drill', 'Apex aim training',
    'free FPS aim trainer', 'online aim practice', 'browser aim trainer', 'no download aim drill',
    'mouse accuracy grid', 'click timing practice', 'reaction speed grid',
    'competitive gaming aim', 'esports aim training', 'precision mouse control',
    'skilldrills clinical grid', 'skilldrills aim trainer', 'free grid aim test',
  ],
  openGraph: {
    title: 'Clinical Gray Grid - Aim & Reaction | SkillDrills',
    description: '4x4 grid with 450ms red flash targets. Raw mouse input, 3 lives, shot analytics tracking overshoots and path efficiency. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/clinical-gray-grid',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Clinical Gray Grid',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clinical Gray Grid - Aim & Reaction | SkillDrills',
    description: '4x4 grid with 450ms red flash targets. Raw mouse input, 3 lives, shot analytics tracking overshoots and path efficiency. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/clinical-gray-grid',
  },
};

export default function ClinicalGrayGridPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Clinical Gray Grid" }
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
            "name": "Clinical Gray Grid",
            "url": "https://skilldrills.online/drills/fps/clinical-gray-grid",
            "description": "Free FPS aim trainer with 4x4 grid, 450ms targets, raw mouse input, and detailed shot analytics. 60-second challenge.",
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
                "name": "What is the Clinical Gray Grid?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free precision FPS aim trainer with 16 nodes in a 4x4 grid. Red targets flash for 450ms with random delays. Raw mouse input via Pointer Lock API."
                }
              },
              {
                "@type": "Question",
                "name": "What shot analytics are tracked?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Overshoots, undershoots, average reaction time, path efficiency, and average deviation from target center. Identifies aiming patterns for improvement."
                }
              },
              {
                "@type": "Question",
                "name": "Which FPS games does this help?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Valorant, CS2, Overwatch 2, Apex Legends, Call of Duty, Rainbow Six Siege, Fortnite, Rust, Escape from Tarkov, and Destiny 2."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This aim trainer is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ClinicalGrayGridClient />
    </>
  );
}