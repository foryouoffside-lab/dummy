import PhysicalDrillsClient from './PhysicalDrillsClient';

export const metadata = {
  title: 'Free Physical Training Drills - Reflex, Balance & Coordination Online | SkillDrills',
  description: 'Free physical training drills online — reaction time tests, reflex games, balance training, agility ladder drills, and coordination exercises. 11 hand eye coordination and motor skills drills. No sign-up.',
  keywords: [
    'physical training drills', 'free physical training online', 'physical training game',
    'reaction time test', 'free reaction time test', 'online reaction time test',
    'reflex test online', 'free reflex training', 'reflex game online',
    'balance training online', 'free balance training', 'balance test online',
    'agility ladder drills', 'agility training online', 'free agility drills',
    'hand eye coordination exercises', 'hand eye coordination training', 'hand eye coordination game',
    'coordination exercises online', 'coordination training game', 'free coordination drill',
    'motor skills training', 'motor control exercises', 'fine motor training online',
    'reflex training for gamers', 'FPS training online', 'gaming reaction time',
    'dodge game online', 'pattern memory game', 'mouse precision test',
    'balance exercises online', 'stability training game', 'click speed test',
    'free fitness drills online', 'online fitness games', 'motor fitness training',
    'physical therapy exercises online', 'rehabilitation training game', 'sports training drills',
    'skilldrills physical', 'skilldrills fitness', 'skilldrills reflex',
    'no download physical training', 'browser fitness drills', 'instant motor training',
    '11 free drills', 'physical skill games', 'body training online free',
  ],
  openGraph: {
    title: 'Free Physical Training Drills - Reflex, Balance & Coordination Online | SkillDrills',
    description: 'Free physical training drills — reaction time tests, reflex games, balance training, agility ladder drills, and hand eye coordination exercises. 11 drills. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/physical',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Free Physical Training Drills - Reflex, Balance & Coordination',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Physical Training Drills - Reflex, Balance & Coordination | SkillDrills',
    description: 'Free reaction time tests, reflex games, balance training, agility drills, and coordination exercises. 11 drills. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical',
  },
};

export default function PhysicalDrillsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Free Physical Training Drills - Reflex, Balance & Coordination",
            "url": "https://skilldrills.online/drills/physical",
            "description": "11 free physical training drills covering reaction time tests, reflex games, balance training, agility ladder drills, and hand eye coordination exercises. No sign-up required.",
            "author": { "@type": "Organization", "name": "SkillDrills" },
            "hasPart": [
              { "@type": "WebApplication", "name": "Hand Eye Coordination Drill - Dynamic Balance", "url": "https://skilldrills.online/drills/physical/balance-training/dynamic-balance" },
              { "@type": "WebApplication", "name": "Single Leg Balance Exercises - Balance Training Online", "url": "https://skilldrills.online/drills/physical/balance-training/single-leg-hold" },
              { "@type": "WebApplication", "name": "Balance Test Online - Stability Challenge", "url": "https://skilldrills.online/drills/physical/balance-training/stability-challenge" },
              { "@type": "WebApplication", "name": "Pattern Memory Game - Coordination Training", "url": "https://skilldrills.online/drills/physical/coordination/complex-pattern" },
              { "@type": "WebApplication", "name": "Hand Eye Coordination Game - Cross-Body Movement", "url": "https://skilldrills.online/drills/physical/coordination/cross-body-movement" },
              { "@type": "WebApplication", "name": "Agility Ladder Drills - Online Agility Training", "url": "https://skilldrills.online/drills/physical/fitness/agility-ladder" },
              { "@type": "WebApplication", "name": "Reaction Time Training - Jump Sequence", "url": "https://skilldrills.online/drills/physical/fitness/jump-sequence" },
              { "@type": "WebApplication", "name": "Reaction Time Test - Click Speed Test", "url": "https://skilldrills.online/drills/physical/fitness/speed-drill" },
              { "@type": "WebApplication", "name": "Free Reflex Test Online - Drop Catch", "url": "https://skilldrills.online/drills/physical/reflex-training/drop-catch" },
              { "@type": "WebApplication", "name": "Dodge Game Online - Quick Dodge", "url": "https://skilldrills.online/drills/physical/reflex-training/quick-dodge" },
              { "@type": "WebApplication", "name": "Mouse Precision Test - Reaction Chain", "url": "https://skilldrills.online/drills/physical/reflex-training/reaction-chain" }
            ]
          })
        }}
      />
      <PhysicalDrillsClient />
    </>
  );
}