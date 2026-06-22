import AgilityLadderClient from './AgilityLadderClient';

export const metadata = {
  title: 'Agility Ladder Drills - Free Online Coordination Training | SkillDrills',
  description: 'Free agility ladder drills online. Train motor sequencing with scrolling rungs — the best agility training game for speed, coordination, and footwork pattern practice. Adaptive speed, 60-second challenge. No sign-up.',
  keywords: [
    'agility ladder drills', 'agility ladder drill online', 'free agility ladder drills',
    'agility ladder training', 'agility training online', 'agility test online',
    'agility drill online', 'agility ladder exercises', 'online agility training',
    'coordination training online', 'motor sequencing training', 'sequencing drill online',
    'footwork pattern drill', 'ladder drill practice', 'speed coordination game',
    'agility training for athletes', 'agility drills for speed', 'agility drills for soccer',
    'agility drills for basketball', 'agility drills for football', 'agility drills for kids',
    'agility training game', 'agility game online free', 'speed agility drill',
    'hand eye coordination training', 'reaction sequence training', 'motor pattern practice',
    'adaptive speed agility', 'sequential movement training', 'motor planning exercise',
    'pattern recognition training', 'cognitive motor training', 'agility coordination game',
    'FPS coordination training', 'gaming reflex training', 'competitive gaming agility',
    'skilldrills agility', 'skilldrills coordination', 'free fitness drills online',
    'online agility test game', 'browser agility drill', 'no download agility training',
  ],
  openGraph: {
    title: 'Agility Ladder Drills - Free Online Agility Training | SkillDrills',
    description: 'Free agility ladder drills online. Best agility training game for speed, coordination, and footwork. Adaptive speed, 60-second challenge. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/fitness/agility-ladder',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Agility Ladder Drills - Online Agility Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agility Ladder Drills - Free Online Agility Training | SkillDrills',
    description: 'Free agility ladder drills. Best online agility training for speed and coordination. Adaptive speed. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/fitness/agility-ladder',
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
              { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
              { "@type": "ListItem", "position": 3, "name": "Fitness", "item": "https://skilldrills.online/drills/physical/fitness" },
              { "@type": "ListItem", "position": 4, "name": "Agility Ladder Drills" }
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
            "name": "Agility Ladder Drills - Free Online Agility Training",
            "url": "https://skilldrills.online/drills/physical/fitness/agility-ladder",
            "description": "Free agility ladder drills and online agility training game. Navigate scrolling ladder rungs in Left-Right sequence patterns. Adaptive speed scales with performance. 60-second timed agility challenge with scoring and best performance tracking.",
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
                "name": "What are agility ladder drills online?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free interactive agility ladder drill game where you navigate scrolling rungs in a Left-Right sequence pattern — simulating classic footwork agility ladder drills digitally. Speed adapts dynamically in this 60-second agility training challenge."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive speed work in these agility drills?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Agility ladder drills start at 150px/s. Each completed ladder increases speed by 8 px/s. Missing a ladder decreases speed by 20 px/s with a minimum of 100 px/s — always matching your agility level."
                }
              },
              {
                "@type": "Question",
                "name": "What sports benefit from agility ladder drills?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Agility ladder drills benefit soccer, basketball, football, tennis, rugby, martial arts, and any sport requiring footwork speed, coordination, and reaction time. This online version trains the same sequencing patterns."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for these agility ladder drills?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. These free agility ladder drills work instantly in your browser — no downloads, no sign-up needed."
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