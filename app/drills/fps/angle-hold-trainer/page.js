import AngleHoldClient from './AngleHoldClient';

export const metadata = {
  title: "Crosshair Placement & Angle Hold Trainer | SkillDrills",
  description: "Improve your crosshair placement and reaction time with our interactive angle holding trainer. Learn to counter peeker's advantage in Valorant and CS2.",
  keywords: [
    "crosshair placement trainer",
    "angle hold trainer",
    "crosshair placement training",
    "crosshair placement practice",
    "pre aim training",
    "corner pre-aiming practice",
    "peek reaction trainer",
    "peeker advantage training",
    "valorant crosshair placement",
    "cs2 crosshair placement",
    "r6 siege angle holding",
    "defensive fps training",
    "holding angles fps",
    "crosshair discipline training",
    "first shot accuracy trainer",
    "free crosshair placement trainer",
    "headshot crosshair placement"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/angle-hold-trainer",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Crosshair Placement & Angle Hold Trainer | SkillDrills",
    description: "Improve your crosshair placement and reaction time with our interactive angle holding trainer. Learn to counter peeker's advantage in Valorant and CS2.",
    url: "https://skilldrills.online/drills/fps/angle-hold-trainer",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Crosshair Placement & Angle Hold Trainer",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Crosshair Placement & Angle Hold Trainer | SkillDrills",
    description: "Improve your crosshair placement and reaction time with our interactive angle holding trainer. Learn to counter peeker's advantage in Valorant and CS2.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function AngleHoldPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Angle Hold Trainer", "item": "https://skilldrills.online/drills/fps/angle-hold-trainer" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Crosshair Placement & Angle Hold Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser-based FPS trainer teaching crosshair placement discipline, corner pre-aiming, and defensive angle holding for competitive tactical shooters.",
    "genre": "FPS Training / Crosshair Placement",
    "url": "https://skilldrills.online/drills/fps/angle-hold-trainer",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is crosshair placement and why does it matter in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Crosshair placement means keeping your crosshair at head height and pre-aimed at angles where enemies are likely to appear, rather than pointing at the floor or walls. Good crosshair placement eliminates the need for large corrections when an enemy appears, dramatically increasing your first-shot accuracy and headshot rate in games like Valorant and CS2."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Angle Hold Trainer drill teach?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This drill trains you to hold crosshairs at precise angles and react the moment a target peeks into your field of view. It simulates defensive corner-holding scenarios, teaching you to wait patiently with proper pre-aim and fire immediately when the peek occurs — replicating real tactical FPS gameplay."
        }
      },
      {
        "@type": "Question",
        "name": "How is angle holding different from flick shooting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flick shooting reacts to targets that appear outside your current crosshair. Angle holding is a defensive mechanic where you already have your crosshair placed exactly where the enemy will appear, minimizing required movement to zero and giving you the first-shot advantage. It is the #1 mechanical skill difference between bronze and gold players in CS2 and Valorant."
        }
      },
      {
        "@type": "Question",
        "name": "Does this trainer help with peeker's advantage in CS2 and Valorant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Peeker's advantage is the network/perception latency disadvantage that the defender faces when an enemy peeks a corner. This drill trains you to compensate by holding tighter angles with your crosshair already placed, reducing the adjustment distance needed and neutralizing the peeker's timing advantage."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice crosshair placement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Crosshair placement is a fundamentals drill. Spend at least 5-10 minutes per session before ranked play. Consistency over several weeks rewires the unconscious habit of always keeping your crosshair at head height, making good placement your default state rather than something you have to think about."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Practice Angle Holding & Pre-Aiming",
    "description": "Step-by-step instructions to train crosshair height and defensive angle holds against peeking targets.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Establish Crosshair Placement",
        "text": "Position your crosshair at head height, pre-aiming the corner edge where the peeking target will appear."
      },
      {
        "@type": "HowToStep",
        "name": "Start the Drill",
        "text": "Click 'Start' and lock in your visual focus. Keep your hand steady and prepare for the peeking target."
      },
      {
        "@type": "HowToStep",
        "name": "React and Shoot",
        "text": "Click instantly the millisecond the target crosses the corner plane. Do not over-flick; rely on your pre-aim."
      }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <AngleHoldClient />
    </>
  );
}

