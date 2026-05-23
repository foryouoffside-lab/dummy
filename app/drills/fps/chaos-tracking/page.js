import PeripheralTrackingClient from './PeripheralTrackingClient';

export const metadata = {
  title: 'Peripheral Tracking Drill - Dual Target FPS Awareness | SkillDrills',
  description: 'Train peripheral vision by tracking two targets simultaneously. Raw mouse input, combo streaks up to 10x. 60-second challenge for Valorant, CS2, Apex. No sign-up.',
  keywords: [
    'peripheral tracking drill', 'dual target tracking', 'FPS peripheral vision training',
    'multi-target awareness drill', 'peripheral vision training free', 'tracking drill FPS',
    'dual sphere tracking', 'vision training FPS', 'spatial awareness drill',
    'peripheral focus training', 'gaming vision drill', 'free aim trainer',
    'peripheral awareness FPS', 'multi target aim training', 'pointer lock training',
    'raw mouse input drill', 'FPS awareness training', 'battlefield awareness drill',
    'peripheral vision exercise', 'dual target aim practice', 'vision tracking test',
    'Valorant aim trainer', 'CS2 peripheral training', 'Apex awareness drill',
    'Overwatch tracking practice', 'competitive FPS training', 'esports vision drill',
    'free FPS drills', 'online aim trainer free', 'browser FPS training',
    'skilldrills peripheral', 'skilldrills tracking drill', 'free vision training',
    'mouse control precision', 'hand eye coordination FPS', 'gaming mouse practice',
    'spatial tracking exercise', 'dual focus training', 'split attention drill',
    'visual processing speed', 'target tracking accuracy', 'peripheral detection training',
  ],
  openGraph: {
    title: 'Peripheral Tracking Drill - FPS Awareness | SkillDrills',
    description: 'Track two moving targets simultaneously. Raw mouse input. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/peripheral-awareness',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Peripheral Tracking Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peripheral Tracking Drill | SkillDrills',
    description: 'Train peripheral vision with dual target tracking. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/peripheral-awareness',
  },
};

export default function PeripheralTrackingPage() {
  return (
    <>
      <noscript>
        <h1>Peripheral Tracking Drill - Dual Target FPS Awareness & Vision Training</h1>
        <p>Free dual target tracking drill for FPS peripheral vision training. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Peripheral Tracking" }
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
            "name": "Peripheral Tracking Drill",
            "url": "https://skilldrills.online/drills/fps/peripheral-awareness",
            "description": "Free FPS peripheral tracking drill. Track cyan and magenta targets simultaneously with raw mouse input. 60-second challenge with combo streaks.",
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
                "name": "What is the Peripheral Tracking Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free FPS tool tracking two moving targets simultaneously. Cyan focus target and magenta peripheral target. Raw mouse input via Pointer Lock API."
                }
              },
              {
                "@type": "Question",
                "name": "How does it improve FPS gaming?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trains split attention by tracking primary and secondary targets. Develops ability to monitor multiple threats and maintain spatial awareness during firefights."
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
                  "text": "No registration required. This peripheral tracking drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <PeripheralTrackingClient />
    </>
  );
}