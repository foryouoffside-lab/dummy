import OrbitalTrackingClient from './OrbitalTrackingClient';

export const metadata = {
  title: 'Orbital Tracking - Dynamic Orbit | SkillDrills',
  description: 'Master smooth tracking with dynamic circular orbits. Adaptive 100-300px radius, variable speed. Raw mouse input. No sign-up.',
  keywords: [
    'orbital tracking drill', 'orbit target tracking', 'circular aim training free',
    'dynamic orbit aim', 'FPS tracking practice', 'orbital aim trainer online',
    'circle tracking drill', 'adaptive radius tracking', 'smooth tracking FPS',
    'orbital movement aim', 'target orbit practice', 'free tracking trainer',
    'dynamic path tracking', 'orbital FPS drill', 'pointer lock aim training',
    'raw mouse input tracking', 'Valorant aim trainer', 'CS2 tracking practice',
    'Overwatch aim drill', 'Apex Legends tracking', 'FPS smooth aim practice',
    'tracking aim improvement', 'mouse control training', 'hand eye coordination FPS',
    'circular aim practice', 'orbit aim test', 'free FPS aim drills',
    'competitive gaming training', 'esports aim practice', 'gaming mouse skills',
    'skilldrills orbital', 'skilldrills tracking', 'free online aim trainer',
    'browser aim practice', 'no download tracking drill', 'instant aim training',
  ],
  openGraph: {
    title: 'Orbital Tracking - Dynamic Orbit | SkillDrills',
    description: 'Master smooth tracking with dynamic circular orbits. Adaptive 100-300px radius, variable speed. Raw mouse input. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/orbital-tracking-drill',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Orbital Tracking Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orbital Tracking - Dynamic Orbit | SkillDrills',
    description: 'Master smooth tracking with dynamic circular orbits. Adaptive 100-300px radius, variable speed. Raw mouse input. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/orbital-tracking-drill',
  },
};

export default function OrbitalTrackingPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Orbital Tracking" }
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
            "name": "Orbital Tracking Drill",
            "url": "https://skilldrills.online/drills/fps/orbital-tracking-drill",
            "description": "Free orbital tracking drill with dynamic circular orbits. Adaptive 100-300px radius, variable speed. Raw mouse input with +1 point per 50ms on target.",
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
                "name": "What is the Orbital Tracking Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free FPS aim drill tracking targets in dynamic circular orbits. Radius changes 100-300px with variable speed. Raw mouse input via Pointer Lock API."
                }
              },
              {
                "@type": "Question",
                "name": "How does orbital tracking improve FPS aim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trains tracking of curved-path targets essential for strafing enemies. Dynamic radius and speed simulate real player movement patterns."
                }
              },
              {
                "@type": "Question",
                "name": "What games does this help with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Valorant, CS2, Overwatch 2, Apex Legends, Call of Duty, Rainbow Six Siege, Fortnite, Rust, Escape from Tarkov, Destiny 2."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This orbital tracking drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <OrbitalTrackingClient />
    </>
  );
}