import ReactiveStrafeClient from './ReactiveStrafeClient';

export const metadata = {
  title: 'Reactive Strafe Tracking - FPS Aim & Target Follow Drill | SkillDrills',
  description: 'Master horizontal target tracking with adaptive speed 12-35px/s. Zone-based scoring, raw mouse input, combo streaks. For Valorant, CS2, Overwatch, Apex. No sign-up.',
  keywords: [
    'reactive strafe tracking', 'FPS tracking drill', 'aim tracking training free',
    'target following practice', 'horizontal strafe aim', 'tracking accuracy FPS',
    'adaptive speed tracking', 'aim trainer strafe', 'FPS aim drill online',
    'reactive tracking test', 'mouse tracking practice', 'gaming aim training',
    'free aim trainer', 'strafe tracking drill', 'pointer lock aim trainer',
    'raw mouse input training', 'FPS aim practice', 'Valorant tracking practice',
    'CS2 aim trainer', 'Overwatch tracking drill', 'Apex Legends aim practice',
    'competitive FPS training', 'esports aim drill', 'mouse control training',
    'hand eye coordination FPS', 'smooth aim practice', 'tracking consistency drill',
    'free FPS training', 'online aim trainer', 'browser aim practice',
    'skilldrills reactive tracking', 'skilldrills FPS drill', 'free gaming practice',
    'no download aim trainer', 'instant aim practice', 'web based aim trainer',
  ],
  openGraph: {
    title: 'Reactive Strafe Tracking - FPS Aim Training | SkillDrills',
    description: 'Adaptive speed target tracking with zone-based scoring. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/reactive-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Reactive Strafe Tracking',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reactive Strafe Tracking | SkillDrills',
    description: 'Master FPS tracking aim with adaptive speed target. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/reactive-tracking',
  },
};

export default function ReactiveStrafePage() {
  return (
    <>
      <noscript>
        <h1>Reactive Strafe Tracking - FPS Aim & Target Following Training</h1>
        <p>Free FPS tracking drill with adaptive speed and zone-based precision scoring. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Reactive Strafe Tracking" }
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
            "name": "Reactive Strafe Tracking",
            "url": "https://skilldrills.online/drills/fps/reactive-tracking",
            "description": "Free FPS tracking drill with adaptive speed 12-35px/s. Zone-based scoring, raw mouse input, and combo streaks. For Valorant, CS2, Overwatch, Apex Legends.",
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
                "name": "What is Reactive Strafe Tracking?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free FPS aim drill practicing horizontal target tracking. Adaptive speed from 12-35px/s. Zone-based scoring rewards precision with Perfect, Good, and Edge tiers."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive speed work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Speed adapts to your accuracy. Above 70% accuracy speeds up; below 30% slows down. Range: 12-35 pixels per second. Always training at your edge."
                }
              },
              {
                "@type": "Question",
                "name": "What games does this help with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Valorant, CS2, Overwatch 2, Apex Legends, Call of Duty, Rainbow Six Siege, Fortnite, Escape from Tarkov, and Destiny 2."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This tracking drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ReactiveStrafeClient />
    </>
  );
}