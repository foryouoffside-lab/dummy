import RapidTappingClient from './RapidTappingClient';

export const metadata = {
  title: 'Rapid Tapping - Click Speed Test | SkillDrills',
  description: 'Endless survival tapping. Click the shrinking ball to keep it alive. 10 clicks = 1 point. Difficulty +12% every 3s. Max ball 140px. No sign-up.',
  keywords: [
    'rapid tapping drill', 'click speed test', 'tapping endurance training', 'mouse clicking speed test',
    'click per second test', 'tapping drill online', 'endurance clicking practice', 'rapid click training',
    'mouse spam test', 'click speed drill free', 'tapping stamina training', 'perpetual clicking game',
    'free tapping test', 'click endurance drill', 'mouse speed endurance', 'click speed challenge',
    'FPS clicking practice', 'MOBA click training', 'gaming mouse speed', 'fast clicking test',
    'click speed improver', 'mouse endurance test', 'tapping survival game', 'click rate test',
    'speed clicking practice', 'mouse button spam', 'click fatigue training', 'rapid fire clicking',
    'skilldrills tapping', 'skilldrills click speed', 'free clicking drill',
    'online tapping test', 'browser click test', 'no download click speed',
    'endless clicker game', 'click survival challenge', 'mouse accuracy and speed',
    'hand eye coordination click', 'reflex clicking practice', 'competitive clicking',
  ],
  openGraph: {
    title: 'Rapid Tapping - Click Speed Test | SkillDrills',
    description: 'Endless survival tapping. 10 clicks = 1 point. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Rapid Tapping Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rapid Tapping - Click Speed Test | SkillDrills',
    description: 'Endless survival clicking. 10 clicks = 1 point. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping',
  },
};

export default function RapidTappingPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
              { "@type": "ListItem", "position": 3, "name": "Movement Speed", "item": "https://skilldrills.online/drills/motor/movement-speed" },
              { "@type": "ListItem", "position": 4, "name": "Rapid Tapping" }
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
            "name": "Rapid Tapping Drill",
            "url": "https://skilldrills.online/drills/motor/movement-speed/rapid-tapping",
            "description": "Free endless survival tapping drill. Click shrinking ball to keep it alive. 10 clicks = 1 point. Difficulty +12% every 3s. Max ball 140px.",
            "applicationCategory": "GameApplication",
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
                "name": "What is the Rapid Tapping Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free endless survival clicking game. Click the ball to expand it 10px per click. Ball shrinks at increasing rate. 10 clicks = 1 point."
                }
              },
              {
                "@type": "Question",
                "name": "How does difficulty increase?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Shrink rate increases 12% every 3 seconds. Longer survival requires faster clicking. Max ball size 140px."
                }
              },
              {
                "@type": "Question",
                "name": "Does this help with FPS/MOBA gaming?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Improves click speed and mouse endurance for FPS (Valorant, CS2) and MOBA games. Survival format simulates competitive pressure."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This rapid tapping drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <RapidTappingClient />
    </>
  );
}