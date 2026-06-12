import DropCatchClient from './DropCatchClient';

export const metadata = {
  title: 'Drop Catch - Reaction Speed Drill | SkillDrills',
  description: 'Catch falling green balls (+1pt), avoid red decoys marked X. Adaptive 400-800px/s speed. 3 lives, streak bonuses. 60-second challenge. No sign-up.',
  keywords: [
    'reflex drop catch', 'reaction speed game', 'visual discrimination training',
    'falling ball catch drill', 'reflex training online', 'click reaction game free',
    'drop catch practice', 'reflex test online free', 'free reaction game',
    'hand-eye coordination catch', 'speed reflex drill', 'visual processing game',
    'catch the ball game', 'reaction time improvement', 'reflex challenge',
    'free reflex training', 'online reflex test', 'reaction speed practice',
    'visual discrimination test', 'target identification drill', 'adaptive reflex game',
    'reflex training for gamers', 'reflex training for athletes', 'FPS reflex practice',
    'esports reflex training', 'gaming reaction speed', 'sports reflex drill',
    'quick reaction game', 'mouse accuracy reflex', 'click speed reflex',
    'skilldrills drop catch', 'skilldrills reflex training', 'free online reflex drill',
    'brain training reflex', 'cognitive reflex exercise', 'visual reaction test',
    'hand eye coordination game', 'motor skills reflex', 'physical reflex training',
    'no download reflex game', 'browser reflex test', 'instant reflex practice',
  ],
  openGraph: {
    title: 'Drop Catch - Reaction Speed Drill | SkillDrills',
    description: 'Catch green balls, avoid red decoys. Adaptive speed. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/reflex-training/drop-catch',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Reflex Drop Catch Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drop Catch - Reaction Speed Drill | SkillDrills',
    description: 'Catch green, avoid red. Adaptive speed. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/reflex-training/drop-catch',
  },
};

export default function DropCatchPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Reflex Training", "item": "https://skilldrills.online/drills/physical/reflex-training" },
              { "@type": "ListItem", "position": 4, "name": "Drop Catch" }
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
            "name": "Reflex Drop Catch Drill",
            "url": "https://skilldrills.online/drills/physical/reflex-training/drop-catch",
            "description": "Free reflex drill. Catch falling green balls (+1pt), avoid red decoys (X). Adaptive 400-800px/s speed. 3 lives, streak bonuses.",
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
                "name": "What is the Reflex Drop Catch drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free reflex game. Catch falling green balls (+1pt), avoid red decoys with X. Adaptive 400-800px/s speed. 3 lives."
                }
              },
              {
                "@type": "Question",
                "name": "What are the fake decoy balls?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "25% are red decoys marked X. Test visual discrimination. Clicking red costs 1 life. Dual-task training for speed and accuracy."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Speed increases every 2 catches from 400 to 800 px/s. Spawn rate also increases. Always challenging at your level."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This reflex drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <DropCatchClient />
    </>
  );
}