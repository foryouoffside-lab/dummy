import AntiZigzagClient from './AntiZigzagClient';

export const metadata = {
  title: "Anti-Zigzag Aim Trainer — Evasive Strafe | SkillDrills",
  description: "Master reactive tracking against erratic zigzag movement, slide cancels, and desync strafing in Apex Legends, Warzone, and Call of Duty Mobile.",
  keywords: [
    "anti zigzag movement trainer",
    "codm zigzag tracking drill",
    "evasive strafe tracking aim trainer",
    "apex legends anti zigzag practice",
    "warzone slide cancel tracking",
    "v crossover aiming drill",
    "desync strafe counter aim trainer",
    "free anti zigzag tracking drill",
    "reactive direction swap aim practice",
    "high ttk tracking trainer",
    "cod mobile strafe aim trainer",
    "fps erratic movement drill",
    "valorant anti strafe trainer",
    "cs2 anti zigzag practice",
    "the finals tracking drill",
    "call of duty anti strafe",
    "hardware raw input anti zigzag",
    "continuous strafe tracking aim",
    "anti overflicking tracking trainer",
    "fine motor reactive control drill"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/anti-zigzag-movement-trainer",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Anti-Zigzag Aim Trainer — Evasive Strafe | SkillDrills",
    description: "Master reactive tracking against erratic zigzag movement, slide cancels, and desync strafing in Apex Legends, Warzone, and Call of Duty Mobile.",
    url: "https://skilldrills.online/drills/fps/anti-zigzag-movement-trainer",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Anti-Zigzag Aim Trainer — Evasive Strafe | SkillDrills",
    description: "Master reactive tracking against erratic zigzag movement, slide cancels, and desync strafing in Apex Legends, Warzone, and Call of Duty Mobile.",
  },
};

export default function AntiZigzagPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Anti-Zigzag Movement Trainer", "item": "https://skilldrills.online/drills/fps/anti-zigzag-movement-trainer" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Anti-Zigzag Movement Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Master reactive tracking against erratic zigzag movement, slide cancels, and desync strafing.",
    "genre": "FPS Training / Anti-Zigzag",
    "url": "https://skilldrills.online/drills/fps/anti-zigzag-movement-trainer",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Anti-Zigzag Movement Trainer",
    "url": "https://skilldrills.online/drills/fps/anti-zigzag-movement-trainer",
    "description": "Master reactive tracking against erratic zigzag movement, slide cancels, and desync strafing.",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why do players zigzag in CODM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It throws off aim assist, desyncs the physical hitbox from the visual character model, and forces you to waste ammunition trying to track wide, unpredictable sweeps."
        }
      },
      {
        "@type": "Question",
        "name": "Should I zigzag back during gunfights?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes and no. While strafing is vital, excessive zigzagging without proper crosshair alignment will ruin your own aim. Good players balance evasion with precision."
        }
      },
      {
        "@type": "Question",
        "name": "Is this drill for touch screen or mouse?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Both. The engine dynamically scales the target sizes and hitboxes depending on whether you are swiping on a mobile device or aiming with a desktop mouse."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get a higher accuracy score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Stop predicting. Reactive tracking means letting your eyes process the direction change first, then snapping to the target. Predicting leads to over-flicking."
        }
      },
      {
        "@type": "Question",
        "name": "What is the V-crossover point?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It's the center of a zigzag strafe path. Instead of chasing the target to each extreme, aim at where the target crosses through the middle of its movement arc."
        }
      },
      {
        "@type": "Question",
        "name": "How does the level progression work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Every 1400 points increases your continuous level. Higher levels make targets smaller, faster, and perform more frequent direction reversals with tighter lifespan windows."
        }
      },
      {
        "@type": "Question",
        "name": "What sensitivity should I use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For tracking, moderate to low sensitivity (25–45 cm/360) works best. Set the Mouse Sensitivity slider in Session Settings on the drills hub to match your in-game settings — it applies to every mouse-aimed drill."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to click to damage the target?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. This drill uses pure dwell-tracking — hold your crosshair inside the target's hitbox and its health drains automatically for as long as you stay locked on. Break contact and the drain pauses until you reacquire it."
        }
      },
      {
        "@type": "Question",
        "name": "What stats does this drill track?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each run logs your tracking accuracy (frames on-target versus total frames), targets destroyed, targets that escaped, your best combo streak, and the peak level reached — all shown on the results screen after time runs out."
        }
      },
      {
        "@type": "Question",
        "name": "Can this improve my Apex Legends tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes significantly. Apex fights require 0.5–2s of continuous tracking to confirm kills. Training reactive tracking against direction changes directly improves your damage output."
        }
      },
      {
        "@type": "Question",
        "name": "How are errors penalised in Anti-Zigzag Movement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When a target escapes or tracking contact is broken for 1.0s, your combo resets to zero. When the optional Time Penalty setting is enabled, target escapes and 1.0s tracking losses deduct 0.6s from your clock."
        }
      },
      {
        "@type": "Question",
        "name": "How does the combo multiplier work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Every full second of unbroken crosshair lock adds +1 to your combo, which raises your score multiplier at fixed thresholds (3, 5, 7, 10, 15, 20, 30, and 50). Losing lock for a full second resets the combo back to zero."
        }
      },
      {
        "@type": "Question",
        "name": "Does this help with recoil control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Indirectly. The reactive micro-adjustments trained here apply to recoil tracking as well. For dedicated recoil training, try the Recoil Control drill."
        }
      },
      {
        "@type": "Question",
        "name": "Is this aim trainer free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this tracking trainer is 100% free, requires no sign-ups or downloads, and runs natively in modern browsers with hardware-level mouse input."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I train anti-zigzag tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "5–6 sessions per week of 10–15 minutes each. Daily warm-ups before ranked play are ideal for building and maintaining reactive tracking muscle memory."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Anti-Zigzag Strafe Tracking",
    "description": "Step-by-step instructions to train reactive tracking against erratic zigzag movement.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Adjust Sensitivity",
        "text": "Set the Mouse Sensitivity slider in Session Settings on the drills hub to match your primary game."
      },
      {
        "@type": "HowToStep",
        "name": "Aim at V-Crossover Center",
        "text": "Focus on the center of the target's strafe path rather than over-flicking behind outer sweeps."
      },
      {
        "@type": "HowToStep",
        "name": "Deplete Health Before Escape",
        "text": "Maintain continuous fire contact to eliminate targets before their lifespan timer expires."
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
      <AntiZigzagClient />
    </>
  );
}
