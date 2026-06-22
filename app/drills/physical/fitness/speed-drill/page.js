import SpeedDrillClient from './SpeedDrillClient';

export const metadata = {
  title: 'Reaction Time Test - Free Speed Drill & Click Speed Test | SkillDrills',
  description: 'Free reaction time test and click speed test. Click shrinking rings before they disappear — the best online reaction time drill. Adaptive velocity 1.5x–5.0x. 3 lives. No sign-up required.',
  keywords: [
    'reaction time test', 'free reaction time test', 'online reaction time test',
    'reaction time test online', 'reaction speed test', 'visual reaction time test',
    'click speed test', 'clicking speed test', 'click test online',
    'free click speed test', 'click reaction test', 'click accuracy test',
    'reflex test online', 'free reflex test', 'reflex test game',
    'reaction time drill', 'reaction training game', 'free reaction game',
    'speed drill online', 'free aim trainer', 'aim training reaction',
    'FPS reaction training', 'FPS reflex drill', 'gaming reaction time test',
    'Valorant reaction time', 'CS2 click test', 'Apex Legends reflex',
    'esports reaction drill', 'gamer speed test', 'competitive gaming reaction',
    'shrinking target game', 'disappearing ring game', 'adaptive velocity drill',
    'hand eye coordination speed', 'motor response speed', 'reflex improvement game',
    'skilldrills speed drill', 'skilldrills reaction test', 'free reaction drill',
    'physical fitness reaction', 'reflex conditioning game', 'speed response exercise',
    'browser reaction test', 'no download reflex test', 'instant reaction time game',
    'streak speed training', 'performance tracking reaction', 'mouse speed test',
  ],
  openGraph: {
    title: 'Reaction Time Test - Free Speed Drill & Click Speed Test | SkillDrills',
    description: 'Free reaction time test and click speed test. Click shrinking rings — best online reaction drill. Adaptive velocity. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/fitness/speed-drill',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Reaction Time Test - Click Speed Test',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Time Test - Free Speed Drill & Click Speed Test | SkillDrills',
    description: 'Free reaction time test and click speed test. Best online reaction training drill for gamers. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/fitness/speed-drill',
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
              { "@type": "ListItem", "position": 3, "name": "Fitness", "item": "https://skilldrills.online/drills/physical/fitness" },
              { "@type": "ListItem", "position": 4, "name": "Reaction Time Test - Speed Drill" }
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
            "name": "Reaction Time Test - Free Speed Drill & Click Speed Test",
            "url": "https://skilldrills.online/drills/physical/fitness/speed-drill",
            "description": "Free reaction time test and click speed test. Click shrinking rings before they disappear. Adaptive velocity 1.5x-5.0x. 3 lives, no timeout penalty. Best online reaction time drill for gamers and athletes.",
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
                "name": "What is this reaction time test and click speed test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free reaction time test and click speed test. Click shrinking rings before they disappear. Adaptive velocity increases from 1.5x to 5.0x with your streak. 3 lives, no timeout penalty. Best free online reaction time drill available."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive velocity work in this reaction time test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Reaction time test starts at 1.8x velocity, adds +0.2x every 3 hits (max 5.0x). Misses reduce by 0.3x. Ring colors indicate speed: Green (normal), Orange (fast), Cyan (10+ streak), Red (3.5x+). Always scaling to your reaction speed."
                }
              },
              {
                "@type": "Question",
                "name": "Is this reaction time test helpful for FPS gaming?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. This reaction time test and click speed test directly trains the clicking reaction speed needed for Valorant, CS2, Overwatch 2, Apex Legends, and Call of Duty. Used by thousands of competitive gamers."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this reaction time test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free reaction time test and click speed test works instantly in your browser — no downloads needed."
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