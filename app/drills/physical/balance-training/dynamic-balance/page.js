import DynamicBalanceClient from './DynamicBalanceClient';

export const metadata = {
  title: 'Hand Eye Coordination Drill - Dynamic Balance Training | SkillDrills',
  description: 'Free hand eye coordination drill. Track a moving Lissajous target with your cursor — the ultimate balance training test. 60-second timed challenge with accuracy scoring. No sign-up required.',
  keywords: [
    'hand eye coordination drill', 'hand eye coordination test', 'hand eye coordination game',
    'hand eye coordination training', 'eye hand coordination exercise', 'free hand eye coordination test',
    'dynamic balance training', 'balance training online', 'balance training game free',
    'motor coordination drill', 'coordination training online', 'free coordination game',
    'cursor tracking drill', 'mouse tracking exercise', 'smooth pursuit training',
    'motor control exercise', 'fine motor control training', 'motor skills training online',
    'reaction training game', 'reflex training online', 'free reflex game',
    'aim trainer alternative', 'target tracking game', 'tracking accuracy test',
    'FPS mouse training', 'gaming aim practice', 'mouse precision training',
    'physical therapy balance exercise', 'motor rehabilitation online', 'balance exercise browser',
    'Lissajous tracking game', 'visual motor integration', 'eye tracking training',
    'balance coordination game', 'gross motor practice', 'dexterity training online',
    'skilldrills balance', 'skilldrills motor control', 'free physical training drill',
    'online balance test', 'no download coordination test', 'browser motor skills test',
  ],
  openGraph: {
    title: 'Hand Eye Coordination Drill - Free Dynamic Balance Training | SkillDrills',
    description: 'Free hand eye coordination drill. Track a moving Lissajous target — the ultimate balance training test. 60-second timed challenge. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/balance-training/dynamic-balance',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Hand Eye Coordination Drill - Dynamic Balance Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hand Eye Coordination Drill - Free Dynamic Balance Training | SkillDrills',
    description: 'Free hand eye coordination drill. Track a moving target — the ultimate balance training test. 60 seconds. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/balance-training/dynamic-balance',
  },
};

export default function DynamicBalancePage() {
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
              { "@type": "ListItem", "position": 3, "name": "Balance Training", "item": "https://skilldrills.online/drills/physical/balance-training" },
              { "@type": "ListItem", "position": 4, "name": "Dynamic Balance - Hand Eye Coordination Drill" }
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
            "name": "Hand Eye Coordination Drill - Dynamic Balance Training",
            "url": "https://skilldrills.online/drills/physical/balance-training/dynamic-balance",
            "description": "Free hand eye coordination drill and balance training game. Track a Lissajous trajectory target with cursor. +1pt/2s tracking. 60-second timed challenge with accuracy and motor telemetry.",
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
                "name": "What is the Dynamic Balance hand eye coordination drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free hand eye coordination training game. Track a Lissajous trajectory target with your cursor. Earn +1pt every 2 seconds on target. Ring turns green when tracking, red when missed. 60-second timed balance training challenge."
                }
              },
              {
                "@type": "Question",
                "name": "How does this improve hand eye coordination?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Lissajous path creates an unpredictable curved movement that forces continuous eye-hand synchronization. Smooth pursuit tracking at increasing speeds directly trains the neural pathways responsible for hand eye coordination."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits from this balance training drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gamers improving aim precision, athletes training coordination, physical therapy patients recovering motor function, and anyone wanting a free hand eye coordination test in their browser."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This hand eye coordination drill and balance training game is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <DynamicBalanceClient />
    </>
  );
}