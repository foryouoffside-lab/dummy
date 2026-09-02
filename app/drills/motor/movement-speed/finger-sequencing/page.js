import FingerSequencingClient from './FingerSequencingClient';

export const metadata = {
  title: "Sequence Aim Trainer — Finger Speed Test | SkillDrills",
  description: "Master sequential target switching and finger speed with our free Sequence Aim Trainer. Improve hand-eye coordination and mouse control for Valorant & CS2.",
  keywords: [
    "sequence aim trainer",
    "mouse accuracy test",
    "finger sequencing aim drill",
    "sequential clicking test",
    "click speed test online",
    "finger speed training fps",
    "mouse control aim drill",
    "hand eye coordination test",
    "fast target switching aim trainer",
    "valorant target switching drill",
    "cs2 sequence click trainer",
    "ordered target click trainer",
    "finger dexterity aim test",
    "motor sequencing drill online",
    "free online sequence aim trainer",
    "micro flick accuracy test",
    "fps multi target acquisition",
    "crosshair pathing accuracy test",
    "mouse dexterity practice",
    "browser aim trainer sequence",
    "sequential click speed test",
    "apex legends target switching",
    "overwatch 2 finger speed drill",
    "pro aim trainer sequence mode",
    "spatial sequential clicking game"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/motor/movement-speed/finger-sequencing",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Sequence Aim Trainer — Finger Speed Test | SkillDrills",
    description: "Master sequential target switching and finger speed with our free Sequence Aim Trainer. Improve hand-eye coordination and mouse control for Valorant & CS2.",
    url: "https://skilldrills.online/drills/motor/movement-speed/finger-sequencing",
    siteName: "SkillDrills",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sequence Aim Trainer — Finger Speed Test | SkillDrills",
    description: "Master sequential target switching and finger speed with our free Sequence Aim Trainer. Improve hand-eye coordination and mouse control for Valorant & CS2.",
  },
};

export default function FingerSequencingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Movement Speed", "item": "https://skilldrills.online/drills/motor/movement-speed" },
      { "@type": "ListItem", "position": 4, "name": "Sequence Aim Trainer", "item": "https://skilldrills.online/drills/motor/movement-speed/finger-sequencing" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Sequence Aim Trainer - Mouse Accuracy Test",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based sequence aim trainer and mouse accuracy test. Click connected target nodes sequentially from largest to smallest before the sequence timer disengages.",
    "genre": "Motor Skills / Mouse Control / Aim Training",
    "url": "https://skilldrills.online/drills/motor/movement-speed/finger-sequencing",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Sequence Aim Trainer Pro",
    "gamePlatform": "Web Browser",
    "genre": ["Aim Trainer", "Mouse Accuracy", "Motor Skills"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "url": "https://skilldrills.online/drills/motor/movement-speed/finger-sequencing",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a sequence aim trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A sequence aim trainer is a specialized mouse accuracy tool designed to practice moving the crosshair to multiple targets in a specific size order under time pressure, simulating multi-target acquisition in competitive shooters."
        }
      },
      {
        "@type": "Question",
        "name": "How does finger sequencing improve FPS aiming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Finger sequencing conditions your brain and motor pathways to execute precise multi-target micro-flicks in rapid succession without crosshair overshooting or hesitation between target transfers."
        }
      },
      {
        "@type": "Question",
        "name": "How is this different from a simple click speed test (CPS)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A CPS test measures raw spam clicks on a stationary box. Sequence Aim Training measures spatial accuracy, rapid crosshair pathing, micro-adjustments, and ordered visual recognition under strict time limits."
        }
      },
      {
        "@type": "Question",
        "name": "Does sequential target training help in Valorant and CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. In clutch situations where multiple enemies push your angle, being able to clear targets in quick sequential succession from primary threat to secondary threat is critical to winning rounds."
        }
      },
      {
        "@type": "Question",
        "name": "How do you calculate accuracy in this sequence trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Accuracy is calculated as the ratio of successful ordered node hits to total mouse click actions. Missed clicks on empty canvas space or clicking nodes out of size order penalizes your accuracy."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best mouse sensitivity for finger sequencing drills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend using your exact in-game competitive sensitivity (typically 25cm - 45cm per 360 turn) so that your motor memory directly translates to in-game target switching."
        }
      },
      {
        "@type": "Question",
        "name": "How does difficulty scaling work in Level 1 to 15?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As your score increases, target node radii shrink, allowed sequence window times tighten, and distance spreads expand across 15 dynamic difficulty levels."
        }
      },
      {
        "@type": "Question",
        "name": "Can I train on mobile or touch screen devices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! The drill fully supports high-speed touch interactions on mobile and tablet displays, allowing you to train finger dexterity on any device."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice sequence aim training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Integrating 5 to 10 minutes of sequential click training into your daily warmup routine before ranked matches builds sharp muscle memory and warm finger reflexes."
        }
      },
      {
        "@type": "Question",
        "name": "What is the combo multiplier system?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Completing node chains sequentially builds your combo streak. Sustaining consecutive unbroken chains boosts your point multiplier up to 3.0x, driving elite leaderboard scores."
        }
      },
      {
        "@type": "Question",
        "name": "Why do node sizes change within each chain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Node sizes descend from largest to smallest to train initial broad flicking followed by fine micro-correction, mimicking initial enemy target locking followed by headshot refinement."
        }
      },
      {
        "@type": "Question",
        "name": "Is this sequence aim trainer completely free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SkillDrills Sequence Aim Trainer is 100% free with no sign-ups, downloads, or paywalls required."
        }
      },
      {
        "@type": "Question",
        "name": "What games benefit most from finger sequence training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Valorant, Counter-Strike 2, Apex Legends, Overwatch 2, Rainbow Six Siege, and Call of Duty: Warzone."
        }
      },
      {
        "@type": "Question",
        "name": "How can I share my score card results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "After completing a 45-second drill session, click the 'Share Score Card' button in the results modal to instantly copy your verified performance summary to share with friends or on social media."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Sequence Aiming & Finger Speed",
    "description": "Step-by-step instructions to train sequential click accuracy and target switching speed.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Start the Drill",
        "text": "Configure your sensitivity multiplier and click 'Start Drill' to activate the sequence arena."
      },
      {
        "@type": "HowToStep",
        "name": "Identify Node Order",
        "text": "Instantly scan the canvas to identify target nodes ordered from largest radius to smallest radius."
      },
      {
        "@type": "HowToStep",
        "name": "Execute Sequential Flicks",
        "text": "Flick smoothly and click each node in strict descending order before the sequence countdown expires."
      },
      {
        "@type": "HowToStep",
        "name": "Extend Clock & Scale Difficulty",
        "text": "Clean node hits add +0.6s to the clock. Target radii shrink and timers tighten continuously as your score and combo grow."
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

      <FingerSequencingClient />
    </>
  );
}