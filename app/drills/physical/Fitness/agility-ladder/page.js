import AgilityLadderClient from './AgilityLadderClient';

export const metadata = {
  title: 'Agility Ladder Drill - Motor Sequencing & Coordination | SkillDrills',
  description: 'Free interactive agility ladder drill. Train motor sequencing with scrolling rungs in Left-Right pattern. Adaptive speed, 60s challenge. No sign-up.',
  keywords: [
    'agility ladder drill', 'sequence coordination training', 'ladder drill practice',
    'motor sequencing practice', 'speed coordination game', 'agility training online',
    'footwork pattern drill', 'sequential movement training', 'ladder exercise free',
    'coordination speed test', 'free agility drill', 'motor pattern practice',
    'reaction sequence training', 'adaptive speed ladder',
    'agility training for athletes', 'coordination drill for gamers', 'fitness coordination',
    'hand eye coordination training', 'motor planning exercise', 'reflex training game',
    'speed adaptation drill', 'pattern recognition practice', 'cognitive motor training',
    'skilldrills agility', 'skilldrills coordination', 'free fitness drills',
    'online agility test', 'browser coordination game', 'no download agility drill',
  ],
  openGraph: {
    title: 'Agility Ladder Drill - Coordination Training | SkillDrills',
    description: 'Free interactive agility ladder. Train motor sequencing with adaptive speed. 60s challenge.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/Fitness/agility-ladder',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Agility Ladder Drill - Motor Sequencing Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agility Ladder Drill | SkillDrills',
    description: 'Free coordination drill with adaptive speed. Train motor sequencing.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Fitness/agility-ladder',
  },
};

export default function AgilityLadderPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Physical Drills", "item": "https://skilldrills.online/drills/physical" },
              { "@type": "ListItem", "position": 3, "name": "Fitness", "item": "https://skilldrills.online/drills/physical/Fitness" },
              { "@type": "ListItem", "position": 4, "name": "Agility Ladder Drill" }
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
            "name": "Agility Ladder Drill",
            "url": "https://skilldrills.online/drills/physical/Fitness/agility-ladder",
            "description": "Free interactive agility ladder drill for motor sequencing and coordination training. Adaptive speed, 60-second timed challenge with scoring and best performance tracking.",
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
                "name": "What is the Agility Ladder Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free interactive coordination exercise where you navigate scrolling ladder rungs in a Left-Right sequence pattern. Speed adapts dynamically with each completed ladder in this 60-second timed challenge."
                }
              },
              {
                "@type": "Question",
                "name": "How does the adaptive speed work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The drill starts at 150px/s scroll speed. Each completed ladder increases speed by 8 px/s. Missing a ladder decreases speed by 20 px/s with a minimum of 100 px/s."
                }
              },
              {
                "@type": "Question",
                "name": "How is scoring calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each correct rung step earns +1 point. Completing all 4 rungs earns a +2 bonus. Missing an entire ladder costs -10 points. Best score saves locally."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This agility ladder drill is completely free and works instantly in your browser. Just visit and start training."
                }
              }
            ]
          })
        }}
      />
      <AgilityLadderClient />
    </>
  );
}