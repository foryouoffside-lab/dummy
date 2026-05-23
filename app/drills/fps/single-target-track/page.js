import SingleTargetTrackClient from './SingleTargetTrackClient';

export const metadata = {
  title: 'Single Target Track - Smooth Aim | SkillDrills',
  description: 'Track a bouncing target with raw mouse input. Lock-on glow, +1pt/200ms, streak bonuses every 10 ticks. Direction arrows when off-target. No penalties. No sign-up.',
  keywords: [
    'single target tracking', 'smooth tracking aim trainer', 'precision aim drill',
    'lock-on aim training', 'cursor tracking practice', 'FPS aim practice free',
    'target following exercise', 'mouse precision training', 'tracking accuracy FPS',
    'green target tracking', 'arrow direction indicator', 'free aim trainer online',
    'lock-on feedback drill', 'smooth mouse control', 'raw mouse input training',
    'pointer lock aim trainer', 'Valorant tracking practice', 'CS2 aim training',
    'Apex Legends aim drill', 'Overwatch tracking practice', 'competitive FPS training',
    'mouse control exercise', 'hand eye coordination FPS', 'aim consistency drill',
    'tracking aim improvement', 'smooth aim builder', 'FPS warm up drill',
    'free FPS aim trainer', 'browser aim training', 'no download aim practice',
    'skilldrills tracking', 'skilldrills aim trainer', 'free tracking drill',
    'esports aim training', 'gaming mouse practice', 'pro aim warm up',
  ],
  openGraph: {
    title: 'Single Target Track - Smooth Aim | SkillDrills',
    description: 'Raw mouse input tracking with lock-on glow. +1pt/200ms. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/single-target-track',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Single Target Tracking',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Single Target Track - Smooth Aim | SkillDrills',
    description: 'Smooth tracking with raw mouse input. Lock-on glow, streaks. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/single-target-track',
  },
};

export default function SingleTargetTrackPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Single Target Tracking" }
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
            "name": "Single Target Tracking Drill",
            "url": "https://skilldrills.online/drills/fps/single-target-track",
            "description": "Free FPS tracking drill with raw mouse input. Lock-on glow, +1pt/200ms, streak bonuses, direction arrows. No penalties.",
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
                "name": "What is the Single Target Tracking Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free FPS aim trainer with raw mouse input. Track a bouncing target that glows green on lock-on. +1pt/200ms with streak bonuses every 10 ticks."
                }
              },
              {
                "@type": "Question",
                "name": "How does the lock-on system work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Target glows green with lock-on ring when crosshair is on it. Direction arrows guide you when off-target. Real-time accuracy feedback."
                }
              },
              {
                "@type": "Question",
                "name": "What games does this help with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Valorant, CS2, Apex Legends, Overwatch 2, Call of Duty, Rainbow Six Siege, Fortnite, Escape from Tarkov, Destiny 2."
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

      <SingleTargetTrackClient />
    </>
  );
}