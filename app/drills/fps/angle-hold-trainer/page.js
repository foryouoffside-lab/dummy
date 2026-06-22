import AngleHoldClient from './AngleHoldClient';

export const metadata = {
  title: 'Crosshair Placement Training - Free Angle Hold & Peek Drill | SkillDrills',
  description: 'Free crosshair placement training online. Train angle holding and peek reaction against cover-peeking targets. Supports CS2, Valorant, Apex sensitivity. Raw mouse input. No sign-up required.',
  keywords: [
    'crosshair placement training', 'crosshair placement practice', 'crosshair placement game',
    'angle hold trainer', 'angle holding practice', 'angle hold drill',
    'peek training fps', 'peeking practice game', 'counter peeker advantage',
    'fps aim training', 'fps reaction training', 'fps reflex drill',
    'prefire training', 'prefire drill online', 'corner holding game',
    'Valorant crosshair placement', 'CS2 angle holding', 'Apex peek training',
    'aim trainer online', 'free aim trainer', 'competitive fps training',
    'peeker advantage drill', 'crosshair discipline training', 'holding angles game',
    'reaction time fps', 'reflex fps game', 'raw mouse input aim',
    'skilldrills angle hold', 'skilldrills fps', 'free fps drill online',
    'browser crosshair trainer', 'no download aim training', 'instant fps practice',
    'esports angle training', 'pro aim technique', 'gaming crosshair drill',
  ],
  openGraph: {
    title: 'Crosshair Placement Training - Free Angle Hold & Peek Drill | SkillDrills',
    description: 'Free crosshair placement training. Train angle holding and peek reaction. CS2, Valorant, Apex compatible. Raw mouse input. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/angle-hold-trainer',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Crosshair Placement Training - Angle Hold Drill' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crosshair Placement Training - Free Angle Hold & Peek Drill | SkillDrills',
    description: 'Free crosshair placement training. Angle hold and peek reaction drill. CS2, Valorant, Apex. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://skilldrills.online/drills/fps/angle-hold-trainer' },
};

export default function AngleHoldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
          { "@type": "ListItem", "position": 2, "name": "FPS Training", "item": "https://skilldrills.online/drills/fps" },
          { "@type": "ListItem", "position": 3, "name": "Crosshair Placement Training - Angle Hold Drill" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Crosshair Placement Training - Free Angle Hold & Peek Drill",
        "url": "https://skilldrills.online/drills/fps/angle-hold-trainer",
        "description": "Free crosshair placement training and angle hold drill. Train reaction time against cover-peeking targets. Crosshair holding distance training. Supports CS2, Valorant, Apex Legends sensitivity. Raw mouse input via Pointer Lock.",
        "applicationCategory": "GameApplication", "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "SkillDrills" }, "isAccessibleForFree": true
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is this crosshair placement training drill?",
            "acceptedAnswer": { "@type": "Answer", "text": "A free crosshair placement training and angle hold drill. Trains reaction time against cover-peeking targets. Practice holding crosshair at head level and reacting to peeking enemies — critical skill in CS2, Valorant, and Apex Legends." }},
          { "@type": "Question", "name": "How does this improve angle holding in FPS games?",
            "acceptedAnswer": { "@type": "Answer", "text": "This crosshair placement training conditions your muscle memory to pre-aim at head height around common angles. Trains the peeker's advantage response — reacting the instant an enemy appears from cover." }},
          { "@type": "Question", "name": "Do I need to sign up for this crosshair placement training?",
            "acceptedAnswer": { "@type": "Answer", "text": "No registration required. This free crosshair placement training works instantly in your browser — no downloads needed." }}
        ]
      })}} />
      <AngleHoldClient />
    </>
  );
}
