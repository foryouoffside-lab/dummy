import PeripheralAwarenessClient from './PeripheralAwarenessClient';

export const metadata = {
  title: 'Peripheral Awareness - Edge Detection | SkillDrills',
  description: 'Train peripheral vision with edge-spawning targets. Fixate on center crosshair, detect targets at screen edges. Raw mouse input. No sign-up.',
  keywords: [
    'peripheral awareness trainer', 'edge target detection', 'peripheral vision FPS training',
    'visual field training drill', 'peripheral target practice', 'FPS awareness training free',
    'edge spawning targets drill', 'peripheral vision exercise', 'vision training for FPS',
    'center fixation drill', 'directional arrow guide', 'free FPS aim trainer',
    'peripheral detection test', 'gaming vision practice', 'raw mouse input trainer',
    'pointer lock aim drill', 'screen edge target practice', 'peripheral reaction test',
    'FPS peripheral vision', 'competitive gaming vision', 'esports vision training',
    'Valorant awareness drill', 'CS2 peripheral practice', 'Overwatch vision training',
    'Apex Legends awareness', 'Rainbow Six Siege vision', 'battlefield awareness FPS',
    'tunnel vision prevention', 'wide vision training', 'edge detection FPS',
    'free online FPS trainer', 'browser FPS drill', 'no download aim practice',
    'skilldrills peripheral', 'skilldrills FPS drill', 'free gaming practice',
  ],
  openGraph: {
    title: 'Peripheral Awareness - Edge Detection | SkillDrills',
    description: 'Train peripheral vision with edge-spawning targets. Fixate on center crosshair, detect targets at screen edges. Raw mouse input. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/peripheral-awareness',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Peripheral Awareness Trainer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peripheral Awareness - Edge Detection | SkillDrills',
    description: 'Train peripheral vision with edge-spawning targets. Fixate on center crosshair, detect targets at screen edges. Raw mouse input. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/peripheral-awareness',
  },
};

export default function PeripheralAwarenessPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Peripheral Awareness" }
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
            "name": "Peripheral Awareness Trainer",
            "url": "https://skilldrills.online/drills/fps/peripheral-awareness",
            "description": "Free FPS peripheral vision drill. Edge-spawning targets with raw mouse input, directional arrows, 3 lives, and reaction tracking.",
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
                "name": "What is the Peripheral Awareness Trainer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free FPS vision drill. White targets spawn at screen edges while you fixate on a green center crosshair. Detect and click using peripheral vision."
                }
              },
              {
                "@type": "Question",
                "name": "How does this improve FPS gaming?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trains detection of movement at screen edges without moving focal point. Reduces tunnel vision and improves battlefield awareness in competitive shooters."
                }
              },
              {
                "@type": "Question",
                "name": "What games does this help with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Valorant, CS2, Overwatch 2, Apex Legends, Call of Duty, Rainbow Six Siege, Fortnite, Escape from Tarkov, Destiny 2."
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

      <PeripheralAwarenessClient />
    </>
  );
}