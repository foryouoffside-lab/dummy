import DropCatchClient from './DropCatchClient';

export const metadata = {
  title: 'Free Reflex Test Online - Drop Catch Reaction Speed Game | SkillDrills',
  description: 'Free reflex test online. Catch falling green balls and avoid red decoys — the best reflex training game for reaction speed and visual discrimination. Adaptive 400–800px/s. 3 lives. No sign-up.',
  keywords: [
    'free reflex test online', 'reflex test online', 'online reflex test',
    'reflex test game', 'reflex test free', 'visual reflex test',
    'reflex training game', 'free reflex training', 'reflex training online',
    'reaction time game', 'reaction speed game', 'reaction time drill',
    'free reaction game online', 'online reaction game', 'reaction speed training',
    'catch the ball game', 'catch falling balls game', 'catch game online',
    'hand eye coordination catch', 'hand eye coordination game', 'hand eye coordination training',
    'visual discrimination training', 'visual processing game', 'target identification drill',
    'reflex game for gamers', 'FPS reflex training', 'esports reflex drill',
    'Valorant reflex training', 'CS2 reaction game', 'Apex Legends reflex',
    'click reaction game free', 'mouse reflex test', 'click speed reflex',
    'adaptive reflex game', 'drop catch practice', 'falling object reflex',
    'skilldrills drop catch', 'skilldrills reflex training', 'free online reflex drill',
    'brain training reflex', 'cognitive reflex game', 'reflex improvement test',
    'no download reflex game', 'browser reflex test', 'instant reflex training',
    'streak bonus reflex', '3 lives reflex game', 'physical reflex training',
  ],
  openGraph: {
    title: 'Free Reflex Test Online - Drop Catch Reaction Speed Game | SkillDrills',
    description: 'Free reflex test online. Catch green balls, avoid red decoys. Best reflex training game with adaptive speed. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/reflex-training/drop-catch',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Free Reflex Test Online - Drop Catch Reaction Speed Game',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Reflex Test Online - Drop Catch Reaction Speed Game | SkillDrills',
    description: 'Free reflex test online. Catch green balls, avoid red decoys. Best adaptive reflex training game. No sign-up.',
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
              { "@type": "ListItem", "position": 4, "name": "Free Reflex Test Online - Drop Catch" }
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
            "name": "Free Reflex Test Online - Drop Catch Reaction Speed Game",
            "url": "https://skilldrills.online/drills/physical/reflex-training/drop-catch",
            "description": "Free reflex test online and reflex training game. Catch falling green balls (+1pt), avoid red decoy balls marked X. Adaptive speed 400-800px/s. 3 lives, streak bonuses. Best free online reflex test available.",
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
                "name": "What is this free reflex test online?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free reflex test online and reflex training game. Catch falling green balls (+1pt each), avoid red decoy balls marked X (costs a life). Adaptive speed increases from 400 to 800px/s. 3 lives, streak bonuses, 60-second challenge."
                }
              },
              {
                "@type": "Question",
                "name": "What are the red decoy balls in this reflex game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "25% of falling balls are red decoys marked with X. They test visual discrimination alongside reaction speed. Clicking a red decoy costs 1 life. This dual-task reflex test trains both speed and accuracy simultaneously."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive difficulty work in this reflex test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Reflex test speed increases every 2 catches, scaling from 400px/s up to 800px/s. Spawn rate also increases. The reflex training game always stays challenging at your current skill level."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this reflex test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free reflex test online works instantly in your browser — no downloads needed. Start your reflex training immediately."
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