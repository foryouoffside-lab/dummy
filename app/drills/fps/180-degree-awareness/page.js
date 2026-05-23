import AwarenessDrillClient from './AwarenessDrillClient';

export const metadata = {
  title: '180-Degree Awareness - FPS Vision | SkillDrills',
  description: 'Train 180-degree awareness with edge targets at 8% and 92% horizontal. Raw mouse input via Pointer Lock. 60-second challenge. No sign-up.',
  keywords: [
    '180 degree awareness trainer', 'FPS awareness training', 'peripheral vision FPS drill',
    'aim training peripheral', 'gaming awareness drill', 'reaction time FPS test',
    'edge target training', 'field of view training', 'FPS aim drill free',
    'peripheral reaction test', 'gaming vision training', '180 degree FPS drill',
    'awareness trainer online', 'free FPS training', 'raw mouse input trainer',
    'pointer lock aim training', 'Valorant awareness practice', 'CS2 peripheral training',
    'Overwatch aim trainer', 'Apex Legends awareness drill', 'competitive FPS training',
    'wide angle target acquisition', 'edge spawn aim trainer', 'screen edge reaction test',
    'FPS peripheral awareness', 'gaming peripheral vision', 'esports awareness training',
    'skilldrills awareness', 'skilldrills FPS drill', 'free aim training online',
    'mouse control training', 'raw input FPS practice', 'browser FPS trainer',
  ],
  openGraph: {
    title: '180-Degree Awareness - FPS Vision | SkillDrills',
    description: 'Train 180-degree awareness with edge targets at 8% and 92% horizontal. Raw mouse input via Pointer Lock. 60-second challenge. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/180-degree-awareness',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: '180 Degree Awareness Trainer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '180-Degree Awareness - FPS Vision | SkillDrills',
    description: 'Train 180-degree awareness with edge targets at 8% and 92% horizontal. Raw mouse input via Pointer Lock. 60-second challenge. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/180-degree-awareness',
  },
};

export default function AwarenessDrillPage() {
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
              { "@type": "ListItem", "position": 3, "name": "180° Awareness Trainer" }
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
            "name": "180° Awareness Trainer",
            "url": "https://skilldrills.online/drills/fps/180-degree-awareness",
            "description": "Free FPS awareness drill with edge targets at 8% and 92% horizontal. Raw mouse input via Pointer Lock API. 60-second challenge with combo streaks.",
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
                "name": "What is the 180 Degree Awareness Trainer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free FPS training drill using raw mouse input via Pointer Lock API. Edge targets spawn at 8% and 92% horizontal to train 180-degree peripheral vision for competitive gaming."
                }
              },
              {
                "@type": "Question",
                "name": "How does raw mouse input work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Uses browser Pointer Lock API to capture raw mouse movement without acceleration or smoothing, similar to in-game raw input settings."
                }
              },
              {
                "@type": "Question",
                "name": "What FPS games does this help with?",
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
                  "text": "No registration required. This awareness trainer is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <AwarenessDrillClient />
    </>
  );
}