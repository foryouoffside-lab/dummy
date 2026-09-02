import AntiStrafeJitterClient from './AntiStrafeJitterClient';

export const metadata = {
  title: "Anti-Strafe Jitter Trainer — Reactive Aim | SkillDrills",
  description: "Improve reactive tracking, anti-strafe aim, and high-frequency ADAD jitter duel tracking for competitive games like Apex Legends, Overwatch 2 & Warzone.",
  keywords: [
    "anti strafe jitter duel trainer",
    "reactive tracking aim trainer",
    "adad jitter tracking practice",
    "apex legends anti strafe drill",
    "overwatch 2 jitter duel trainer",
    "warzone close quarters tracking",
    "anti strafe reaction drill",
    "free reactive tracking aim trainer",
    "high ttk jitter tracking drill",
    "wrist jitter correction trainer",
    "fps reactive tracking practice",
    "valorant anti strafe practice",
    "cs2 jitter tracking trainer",
    "the finals tracking drill",
    "call of duty jitter duel",
    "hardware raw input jitter tracking",
    "continuous adad strafe tracking",
    "anti overflicking jitter trainer",
    "fine motor micro correction drill",
    "reactive direction change aim practice"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/anti-strafe-jitter-duel",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Anti-Strafe Jitter Trainer — Reactive Aim | SkillDrills",
    description: "Improve reactive tracking, anti-strafe aim, and high-frequency ADAD jitter duel tracking for competitive games like Apex Legends, Overwatch 2 & Warzone.",
    url: "https://skilldrills.online/drills/fps/anti-strafe-jitter-duel",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Anti-Strafe Jitter Trainer — Reactive Aim | SkillDrills",
    description: "Improve reactive tracking, anti-strafe aim, and high-frequency ADAD jitter duel tracking for competitive games like Apex Legends, Overwatch 2 & Warzone.",
  },
};

export default function AntiStrafeJitterPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Anti-Strafe Jitter Duel", "item": "https://skilldrills.online/drills/fps/anti-strafe-jitter-duel" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Anti-Strafe Jitter Duel Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Improve reactive tracking, anti-strafe aim, and high-frequency ADAD jitter duel tracking.",
    "genre": "FPS Training / Anti-Strafe",
    "url": "https://skilldrills.online/drills/fps/anti-strafe-jitter-duel",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Anti-Strafe Jitter Duel",
    "url": "https://skilldrills.online/drills/fps/anti-strafe-jitter-duel",
    "description": "Improve reactive tracking, anti-strafe aim, and high-frequency ADAD jitter duel tracking.",
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
        "name": "What is reactive tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reactive tracking is the mechanical ability in FPS games to continuously follow a rapidly and unpredictably moving target with your crosshair, requiring fast visual reaction and micro-corrections."
        }
      },
      {
        "@type": "Question",
        "name": "How do I improve tracking aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Improve tracking aim by maintaining high visual focus on the target itself rather than your crosshair, training against fast direction changes, and practicing smooth, continuous mouse adjustments without tensing your hand."
        }
      },
      {
        "@type": "Question",
        "name": "What is anti-strafe tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Anti-strafe tracking is a specialized aiming skill to counter an enemy's ADAD movement patterns, where the target quickly switches horizontal directions to break tracking alignment."
        }
      },
      {
        "@type": "Question",
        "name": "How do professional Apex players train tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional Apex Legends players practice tracking by using high-strafe reactive tracking trainers, learning target velocity changes, and performing smooth close-quarters tracking warmups."
        }
      },
      {
        "@type": "Question",
        "name": "How do Overwatch players improve tracking aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Overwatch players improve tracking aim by training against erratic movement patterns (like ADAD and crouch strafes) and maintaining crosshair alignment on high-mobility heroes like Tracer and Genji."
        }
      },
      {
        "@type": "Question",
        "name": "How are errors penalised in Anti-Strafe Jitter Duel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Losing tracking contact for 1.0s resets your streak combo multiplier. When the optional Time Penalty setting is enabled in your session preferences, each 1.0s tracking loss also deducts 0.6s from your clock."
        }
      },
      {
        "@type": "Question",
        "name": "Can this improve close-range aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this drill simulates rapid close-range strafes and jitter duels where targets move wide across your screen, forcing your eyes and wrist to make high-speed reactive adjustments."
        }
      },
      {
        "@type": "Question",
        "name": "Does this help Apex Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Apex duels are defined by fast ADAD strafes, slide jumps, and close-quarter jitter movements. This drill directly targets those reaction mechanics."
        }
      },
      {
        "@type": "Question",
        "name": "Does this help Overwatch?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. It trains your hand to match the instant, zero-momentum direction changes typical of Overwatch characters, improving hit registration for tracking heroes like Soldier: 76, Zarya, and Tracer."
        }
      },
      {
        "@type": "Question",
        "name": "Does this help Call of Duty?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, tracking and reading player movement changes is essential in Call of Duty for tracking slide cancelers and fast strafers in close-quarters gunfights."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend dedicating 10-15 minutes to reactive tracking and direction change drills daily before launching your games."
        }
      },
      {
        "@type": "Question",
        "name": "Is this drill free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this reactive tracking trainer is completely free to use and runs directly in any modern browser without requiring any downloads or account registration."
        }
      },
      {
        "@type": "Question",
        "name": "What skills does this improve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It improves anti-strafe response, jitter correction speed, continuous tracking uptime, mouse tension control, and target lock-on retention."
        }
      },
      {
        "@type": "Question",
        "name": "Can tracking drills improve consistency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, repetitive practice against high-speed direction shifts develops consistent wrist-to-screen coordinate mapping, minimizing mechanical errors and aiming panic."
        }
      },
      {
        "@type": "Question",
        "name": "How do I read fast direction changes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Do not try to guess when the target will turn. Relax your eyes, widen your focal awareness, and react to the target's change in velocity as a reflex rather than an anticipation."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Anti-Strafe Jitter Duel Aim",
    "description": "Step-by-step instructions to train reactive tracking against high-frequency ADAD jitter strafes.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Adjust Sensitivity",
        "text": "Set your Universal Sens slider to match your primary game."
      },
      {
        "@type": "HowToStep",
        "name": "Track ADAD Jitter Target",
        "text": "Keep your crosshair continuously locked on the target as it performs rapid horizontal direction switches."
      },
      {
        "@type": "HowToStep",
        "name": "Maintain Tracking Combos",
        "text": "Avoid tracking breaks to sustain high combo multipliers and extend your time budget."
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
      <AntiStrafeJitterClient />
    </>
  );
}
