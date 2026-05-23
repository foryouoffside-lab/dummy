import FlickShot240Client from './FlickShot240Client';

export const metadata = {
  title: 'Flick Shot 240FPS - Adaptive Aim | SkillDrills',
  description: 'Master flick shots with adaptive target windows 150-1000ms. Timer ring feedback, 5 lives, shot analytics. For Valorant, CS2, Apex. No sign-up.',
  keywords: [
    'flick shot 240fps', 'adaptive flick drill', 'FPS flick training', 'aim trainer flick',
    'speed flick practice', 'reflex flick training', 'target window aim', 'FPS aim drill',
    'flick shot accuracy', 'adaptive window trainer', 'reaction flick test', 'free aim trainer',
    '240fps flick shots', 'timer ring aim drill', 'flick shot trainer free',
    'FPS aim practice online', 'Valorant flick trainer', 'CS2 aim practice',
    'adaptive target window', 'flick accuracy drill', 'mouse precision trainer',
    'competitive FPS training', 'esports aim practice', 'gaming reflex trainer',
    'free FPS drills', 'online aim trainer', 'browser flick training',
    'skilldrills flick shot', 'skilldrills FPS', 'skilldrills aim trainer',
    'flick shot reaction test', 'target acquisition practice', 'precision aiming drill',
    'FPS warm up drill', 'daily aim practice', 'flick shot improvement',
  ],
  openGraph: {
    title: 'Flick Shot 240FPS - Adaptive Aim | SkillDrills',
    description: 'Master flick shots with adaptive target windows 150-1000ms. Timer ring feedback, 5 lives, shot analytics. For Valorant, CS2, Apex. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/flick-shot-240fps',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Flick Shot 240FPS Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flick Shot 240FPS - Adaptive Aim | SkillDrills',
    description: 'Master flick shots with adaptive target windows 150-1000ms. Timer ring feedback, 5 lives, shot analytics. For Valorant, CS2, Apex. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/flick-shot-240fps',
  },
};

export default function FlickShot240Page() {
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
              { "@type": "ListItem", "position": 3, "name": "Flick Shot 240FPS" }
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
            "name": "Flick Shot 240FPS Drill",
            "url": "https://skilldrills.online/drills/fps/flick-shot-240fps",
            "description": "Free adaptive flick shot trainer at 240FPS. Target windows 150-1000ms with timer ring feedback and detailed shot analytics.",
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
                "name": "What is the Flick Shot 240FPS Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free adaptive aim trainer at 240FPS. White targets with adaptive 150-1000ms window. Timer ring shows Green/Yellow/Red. 5 lives and shot analytics."
                }
              },
              {
                "@type": "Question",
                "name": "How does the adaptive window work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 800ms. Fast hits shrink window to 150ms minimum. Misses expand to 1000ms maximum. Personalized difficulty at your current skill level."
                }
              },
              {
                "@type": "Question",
                "name": "What analytics are tracked?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hits, misses, best reaction time, combo streaks, accuracy, overshoot/undershoot counts, average reaction time, and path efficiency."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This flick trainer is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <FlickShot240Client />
    </>
  );
}