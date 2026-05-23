import ReactiveTrackingClient from './ReactiveTrackingClient';

export const metadata = {
  title: 'Reactive Tracking - Smooth Aim Drill | SkillDrills',
  description: 'Track a bouncing ball with raw mouse input. Directional arrows, accuracy tracking, combo streaks, lock-on ring. +1pt/150ms. No penalties. No sign-up.',
  keywords: [
    'reactive tracking trainer', 'single ball tracking', 'smooth aim training',
    'bouncing ball aim drill', 'tracking prediction practice', 'FPS tracking aim',
    'adaptive crosshair tracking', 'jitter movement aim', 'mouse tracking drill free',
    'smooth tracking FPS', 'directional arrow tracking', 'free tracking trainer online',
    'tracking lock-on indicator', 'reactive aim practice', 'pointer lock aim trainer',
    'raw mouse input tracking', 'Valorant tracking practice', 'CS2 aim tracking',
    'Overwatch tracking drill', 'Apex Legends aim trainer', 'competitive FPS tracking',
    'hand eye coordination tracking', 'mouse control precision', 'reactive aim FPS',
    'tracking accuracy trainer', 'combo streak tracking', 'bouncing ball aim trainer',
    'skilldrills reactive tracking', 'skilldrills FPS tracking', 'free FPS aim drill',
    'online tracking trainer', 'browser aim trainer', 'no download tracking practice',
  ],
  openGraph: {
    title: 'Reactive Tracking - Smooth Aim Drill | SkillDrills',
    description: 'Track a bouncing ball with raw mouse input. Directional arrows, combos. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/reactive-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Reactive Tracking Trainer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reactive Tracking - Smooth Aim Drill | SkillDrills',
    description: 'Master tracking aim with raw mouse input. Free FPS drill.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/reactive-tracking',
  },
};

export default function ReactiveTrackingPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Reactive Tracking" }
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
            "name": "Reactive Tracking Trainer",
            "url": "https://skilldrills.online/drills/fps/reactive-tracking",
            "description": "Free FPS tracking drill with raw mouse input. Track bouncing ball with directional arrows, lock-on ring, and combo streaks. +1 point every 150ms. No penalties.",
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
                "name": "What is the Reactive Tracking Trainer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free FPS aim drill tracking a bouncing ball with raw mouse input. Directional arrows, lock-on ring, real-time accuracy, and combo streaks. +1pt/150ms on target."
                }
              },
              {
                "@type": "Question",
                "name": "What visual feedback is provided?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Directional velocity arrow, green lock-on ring, connection line, real-time accuracy, combo counter, and total track time. Ball glows brighter when tracked."
                }
              },
              {
                "@type": "Question",
                "name": "What games does tracking help with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Valorant (Spectre, Stinger), CS2 (SMGs, rifles), Overwatch 2 (Soldier 76, Tracer), Apex Legends (R-99, R-301), Call of Duty, Rainbow Six Siege."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This tracking trainer is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ReactiveTrackingClient />
    </>
  );
}