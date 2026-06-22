import RapidTappingClient from './RapidTappingClient';

export const metadata = {
  title: 'Click Speed Test - Free Rapid Tapping & CPS Test | SkillDrills',
  description: 'Free click speed test online. Tap rapidly to keep a shrinking ball alive — the best CPS test and click endurance drill. Difficulty scales every 3 seconds. No sign-up required.',
  keywords: [
    'click speed test', 'free click speed test', 'online click speed test',
    'cps test', 'cps test online', 'clicks per second test',
    'click speed game', 'clicking speed test', 'click rate test',
    'rapid tapping test', 'tapping speed test', 'tap speed test',
    'mouse click speed', 'fast clicking test', 'click endurance test',
    'rapid clicking game', 'clicking endurance drill', 'tapping survival game',
    'click per second game', 'mouse spam test', 'clicking challenge',
    'FPS clicking practice', 'gaming click speed', 'MOBA clicking training',
    'Minecraft clicking speed', 'PvP click test', 'competitive clicking',
    'hand eye coordination click', 'reflex clicking game', 'motor speed training',
    'tapping stamina training', 'perpetual clicking game', 'endless click game',
    'skilldrills tapping', 'skilldrills click speed', 'free clicking drill',
    'browser click test', 'no download cps test', 'instant clicking game',
    'click fatigue training', 'mouse endurance test', 'rapid fire clicking',
  ],
  openGraph: {
    title: 'Click Speed Test - Free Rapid Tapping & CPS Test | SkillDrills',
    description: 'Free click speed test. Tap rapidly to keep a ball alive — best CPS test and clicking endurance drill. Scales every 3 seconds. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Click Speed Test - CPS Test Online',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Click Speed Test - Free Rapid Tapping & CPS Test | SkillDrills',
    description: 'Free click speed test and CPS test. Keep the shrinking ball alive. Best clicking endurance drill. No sign-up.',
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
              { "@type": "ListItem", "position": 4, "name": "Click Speed Test - Rapid Tapping" }
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
            "name": "Click Speed Test - Free Rapid Tapping & CPS Test",
            "url": "https://skilldrills.online/drills/motor/movement-speed/rapid-tapping",
            "description": "Free click speed test and CPS test. Endless survival clicking: tap to keep the shrinking ball alive. 10 clicks = 1 point. Difficulty increases 12% every 3 seconds. Best click endurance drill online.",
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
                "name": "What is this click speed test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free click speed test and CPS test game. Tap rapidly to keep a shrinking ball alive. Each click expands it 10px. Ball shrinks at increasing rate. 10 clicks = 1 point. Survive as long as possible in this endless click speed challenge."
                }
              },
              {
                "@type": "Question",
                "name": "How does difficulty increase in this CPS test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Shrink rate in this click speed test increases 12% every 3 seconds. Longer survival requires faster clicking. Maximum ball size is 140px. The longer you survive, the higher your clicks per second (CPS) must be."
                }
              },
              {
                "@type": "Question",
                "name": "Is this click speed test good for gaming?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. This CPS test and rapid tapping drill improves click speed and mouse endurance for FPS games (Valorant, CS2), MOBA games, and Minecraft PvP where fast clicking gives a competitive advantage."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this click speed test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free click speed test and CPS test works instantly in your browser — no downloads needed."
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