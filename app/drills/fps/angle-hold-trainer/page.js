import AngleHoldClient from './AngleHoldClient';

export const metadata = {
  title: "Crosshair Placement & Angle Hold Trainer | SkillDrills",
  description: "Improve your crosshair placement and reaction time with our interactive angle holding trainer. Learn to counter peeker's advantage in Valorant and CS2.",
  keywords: [
    "angle hold aim trainer",
    "crosshair placement drill",
    "pre-fire training fps",
    "CS2 angle holding practice",
    "Valorant crosshair placement trainer",
    "how to hold an angle in cs2",
    "how to stop pre-firing",
    "best crosshair placement drill browser",
    "how to improve peek reaction time",
    "free angle holding trainer online",
    "how to punish jiggle peekers",
    "crosshair placement trainer",
    "pre aim training",
    "peeker advantage training"
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
  },
  twitter: {
    card: 'summary_large_image',
    title: "Crosshair Placement & Angle Hold Trainer | SkillDrills",
    description: "Improve your crosshair placement and reaction time with our interactive angle holding trainer. Learn to counter peeker's advantage in Valorant and CS2.",
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
    "name": "Angle Hold Pro",
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

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Angle Hold Pro",
    "url": "https://skilldrills.online/drills/fps/angle-hold-trainer",
    "description": "A free browser-based FPS trainer teaching crosshair placement discipline, corner pre-aiming, and defensive angle holding for competitive tactical shooters.",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is crosshair placement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Crosshair placement is a core shooter mechanic where you position your aim cursor exactly where an enemy's head is expected to spawn or appear, minimizing the physical distance required to shoot them."
        }
      },
      {
        "@type": "Question",
        "name": "What is peeker's advantage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Peeker's advantage is a latency-driven delay where a moving player rounding a corner gets to see a stationary player holding the angle slightly before the stationary player's screen updates with their presence."
        }
      },
      {
        "@type": "Question",
        "name": "How do CS2 and Valorant players hold angles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Players hold corners by leaving a slight horizontal gap between the corner wall and their crosshair. This offset accommodates their visual reaction delay, allowing them to click without needing to flick when an enemy swings wide."
        }
      },
      {
        "@type": "Question",
        "name": "How far should my crosshair be from the wall?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If enemies consistently push past your crosshair before you can click, hold wider (further away from the corner). If you shoot early and miss, hold tighter. Adjust the distance to match your reaction latency."
        }
      },
      {
        "@type": "Question",
        "name": "How are errors penalised in Angle Hold Pro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By default, pre-firing early, shooting a fake peek, missing, or letting an enemy retreat resets your streak combo without reducing clock time. When the optional Time Penalty setting is enabled, each error deducts 0.8s from the session clock."
        }
      },
      {
        "@type": "Question",
        "name": "Which competitive shooters does this drill help?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This drill directly benefits Valorant defenders holding site angles, CS2 players covering bomb site holds against peeker swings, and Rainbow Six Siege anchors who need fast passive-hold reaction speed against tight-angle peeks."
        }
      },
      {
        "@type": "Question",
        "name": "What skills does this drill improve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It improves trigger discipline, peek reaction speed, crosshair-to-corner distance calibration, and visual tracking of fast, variable peeks."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice crosshair placement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend dedicating 10-15 minutes to crosshair placement and angle holding drills daily before your gaming sessions."
        }
      },
      {
        "@type": "Question",
        "name": "Is this drill free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this drill is completely free to use and runs directly in any modern browser without requiring any downloads or account registration."
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <AngleHoldClient />
    </>
  );
}
