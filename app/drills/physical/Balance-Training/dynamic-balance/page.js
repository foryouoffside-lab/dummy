import DynamicBalanceClient from './DynamicBalanceClient';

export const metadata = {
  title: 'Dynamic Balance Training - Motor Control & Coordination | SkillDrills',
  description: 'Track a Lissajous trajectory target with cursor. +1pt/2s tracking, -1pt for missing. 60-second challenge with accuracy and streak tracking. No sign-up.',
  keywords: [
    'dynamic balance training', 'motor control drill', 'hand-eye coordination test',
    'tracking precision game', 'cursor tracking exercise', 'motor skills training',
    'balance coordination exercise', 'fine motor control practice', 'target tracking drill',
    'physical therapy exercise', 'reaction training', 'precision movement drill',
    'balance drill free', 'coordination training online', 'free motor skills test',
    'Lissajous tracking', 'smooth pursuit training', 'mouse control practice',
    'hand eye coordination game', 'motor learning exercise', 'tracking accuracy test',
    'gaming aim practice', 'FPS mouse control', 'precision aiming drill',
    'rehabilitation exercise', 'physical training online', 'motor rehabilitation',
    'athlete coordination training', 'sports training drill', 'reflex training game',
    'visual motor integration', 'eye hand coordination', 'movement control practice',
    'skilldrills balance', 'skilldrills motor control', 'free coordination drill',
    'online balance training', 'browser motor skills', 'no download coordination test',
    'fine motor assessment', 'gross motor practice', 'dexterity training online',
  ],
  openGraph: {
    title: 'Dynamic Balance Training - Motor Control | SkillDrills',
    description: 'Track a Lissajous trajectory target with your cursor. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/Balance-Training/dynamic-balance',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Dynamic Balance Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dynamic Balance Training | SkillDrills',
    description: 'Track a moving target with your cursor. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Balance-Training/dynamic-balance',
  },
};

export default function DynamicBalancePage() {
  return (
    <>
      <noscript>
        <h1>Dynamic Balance Training - Motor Control & Hand-Eye Coordination Drill</h1>
        <p>Free dynamic balance drill. Track a Lissajous trajectory target with cursor. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
              { "@type": "ListItem", "position": 3, "name": "Balance Training", "item": "https://skilldrills.online/drills/physical/Balance-Training" },
              { "@type": "ListItem", "position": 4, "name": "Dynamic Balance" }
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
            "name": "Dynamic Balance Training",
            "url": "https://skilldrills.online/drills/physical/Balance-Training/dynamic-balance",
            "description": "Free motor control drill. Track Lissajous trajectory target with cursor. +1pt/2s tracking, -1pt for missing. 60-second challenge.",
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
                "name": "What is the Dynamic Balance Training drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free motor control exercise. Track a Lissajous trajectory target with cursor. +1pt/2s tracking. Ring turns green (tracking) or red (miss)."
                }
              },
              {
                "@type": "Question",
                "name": "What is a Lissajous trajectory?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A complex curved path from two perpendicular sine waves. Creates figure-8 and spiral patterns. Unpredictable movement challenges tracking."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits from this training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gamers (aim precision), athletes (coordination), physical therapy patients (motor recovery), seniors (fine motor maintenance)."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This dynamic balance drill is completely free and works instantly in your browser."
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