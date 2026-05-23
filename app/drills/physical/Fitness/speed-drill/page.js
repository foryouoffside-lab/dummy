import SpeedDrillClient from './SpeedDrillClient';

export const metadata = {
  title: 'Speed Drill - Reaction & Clicking | SkillDrills',
  description: 'Click shrinking rings before they disappear. Adaptive velocity 1.5x-5.0x with streaks. 3 lives, no timeout penalty. No sign-up.',
  keywords: [
    'speed drill', 'reaction time training', 'precision clicking game',
    'shrinking ring drill', 'click speed test', 'reflex training game',
    'adaptive velocity drill', 'reaction speed practice', 'free aim trainer',
    'click accuracy game', 'speed clicking challenge', 'reaction time test',
    'precision motor skills', 'hand-eye coordination speed', 'reflex improvement',
    'free speed drill', 'online reaction test', 'clicking speed trainer',
    'FPS reaction training', 'gamer reflex drill', 'competitive gaming practice',
    'Valorant aim training', 'CS2 reflex practice', 'Apex Legends reaction',
    'esports reaction drill', 'gaming skills trainer', 'free reflex test',
    'speed clicking practice', 'target acquisition training', 'mouse accuracy drill',
    'visual reaction speed', 'motor response training', 'cognitive speed drill',
    'skilldrills speed drill', 'skilldrills physical training', 'free reaction drill',
    'physical fitness drill', 'reflex conditioning', 'speed response exercise',
    'adaptive difficulty trainer', 'streak based velocity', 'performance tracking drill',
    'no signup reaction test', 'browser reflex game', 'instant play speed drill',
  ],
  openGraph: {
    title: 'Speed Drill - Reaction & Clicking | SkillDrills',
    description: 'Click shrinking rings before they disappear. Adaptive velocity 1.5x-5.0x with streaks. 3 lives, no timeout penalty. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/Fitness/speed-drill',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Speed Drill Elite',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speed Drill - Reaction & Clicking | SkillDrills',
    description: 'Click shrinking rings before they disappear. Adaptive velocity 1.5x-5.0x with streaks. 3 lives, no timeout penalty. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Fitness/speed-drill',
  },
};

export default function SpeedDrillPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
              { "@type": "ListItem", "position": 3, "name": "Fitness", "item": "https://skilldrills.online/drills/physical/Fitness" },
              { "@type": "ListItem", "position": 4, "name": "Speed Drill" }
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
            "name": "Speed Drill Elite",
            "url": "https://skilldrills.online/drills/physical/Fitness/speed-drill",
            "description": "Free reaction time drill. Click shrinking rings with adaptive velocity 1.5x-5.0x. 3 lives, no timeout penalty. Reaction tracking.",
            "applicationCategory": "HealthApplication",
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
                "name": "What is the Speed Drill Elite?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free reaction time game. Click shrinking rings before they disappear. Adaptive velocity 1.5x-5.0x. 3 lives, no timeout penalty."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive velocity work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 1.8x, +0.2x every 3 hits (max 5.0x). Misses reduce by 0.3x. Colors: Green (normal), Orange (fast), Cyan (10+ streak), Red (3.5x+)."
                }
              },
              {
                "@type": "Question",
                "name": "Is this helpful for FPS gaming?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Trains reaction time and clicking precision for Valorant, CS2, Overwatch 2, Apex Legends, and Call of Duty."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This speed drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <SpeedDrillClient />
    </>
  );
}