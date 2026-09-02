import StrafeTrackingClient from './StrafeTrackingClient';

export const metadata = {
  title: "Strafe Tracking Aim Trainer | SkillDrills",
  description: "Master reactive tracking aim, counter-strafe reading, and smooth wrist glides for competitive shooters like Apex Legends, Overwatch 2, Valorant & CS2.",
  keywords: [
    "strafe tracking aim trainer",
    "reactive tracking practice fps",
    "adad strafe tracking drill",
    "apex legends tracking trainer",
    "overwatch 2 aim tracking",
    "aim smoothness trainer",
    "counter strafe reading drill",
    "tracking aim accuracy tool",
    "high ttk aim trainer",
    "free tracking aim trainer",
    "overtracking fix aim drill",
    "undertracking fix aim practice",
    "wrist glide smoothness trainer",
    "fps movement tracking drill",
    "valorant tracking practice",
    "cs2 strafe tracking drill",
    "the finals aim tracking",
    "call of duty tracking trainer",
    "hardware raw input tracking aim",
    "directional reading aim drill"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/strafe-tracking",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Strafe Tracking Aim Trainer | SkillDrills",
    description: "Master reactive tracking aim, counter-strafe reading, and smooth wrist glides for competitive shooters like Apex Legends, Overwatch 2, Valorant & CS2.",
    url: "https://skilldrills.online/drills/fps/strafe-tracking",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Strafe Tracking Aim Trainer | SkillDrills",
    description: "Master reactive tracking aim, counter-strafe reading, and smooth wrist glides for competitive shooters like Apex Legends, Overwatch 2, Valorant & CS2.",
  },
};

export default function StrafeTrackingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Strafe Tracking", "item": "https://skilldrills.online/drills/fps/strafe-tracking" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Strafe Tracking Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Master reactive tracking aim, counter-strafe reading, and smooth wrist glides for competitive FPS games.",
    "genre": "FPS Training / Reactive Tracking",
    "url": "https://skilldrills.online/drills/fps/strafe-tracking",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Strafe Tracking",
    "url": "https://skilldrills.online/drills/fps/strafe-tracking",
    "description": "Master reactive tracking aim, counter-strafe reading, and smooth wrist glides for competitive FPS games.",
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
        "name": "What is tracking aim in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tracking aim is the mechanical ability to keep your crosshair continuously locked onto an opponent moving in a 3D environment, which is highly critical in games with a high time-to-kill (TTK)."
        }
      },
      {
        "@type": "Question",
        "name": "How is tracking different from flicking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flicking requires rapid muscle memory snaps to hit a target and reset, while tracking requires continuous visual pursuit, direction change recognition, and smooth speed adjustment."
        }
      },
      {
        "@type": "Question",
        "name": "How do I improve reactive tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Improve reactive tracking by practicing against fast, unpredictable strafe speeds. Learn to read momentum changes without over-predicting or tensing your wrist."
        }
      },
      {
        "@type": "Question",
        "name": "Why do I overtrack targets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Overtracking happens when your crosshair moves faster than the target during a direction swap, which is often caused by predictive aiming or excessive mouse acceleration."
        }
      },
      {
        "@type": "Question",
        "name": "What causes shaky aim during tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Shaky aim is caused by excessive wrist tension, inappropriate mouse grip, or too high sensitivity. Smoothness aim drills help condition your hand to glide without micro-jitters."
        }
      },
      {
        "@type": "Question",
        "name": "How are errors penalised in Strafe Tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Losing contact with the target resets your active combo multiplier. When the optional Time Penalty setting is enabled, falling off-target for 1.0 cumulative second also deducts 0.6s from your timer."
        }
      },
      {
        "@type": "Question",
        "name": "Is tracking more important than flicking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on the game. Tracking is primary in high-TTK games (Apex Legends, Overwatch 2, The Finals), whereas flicking is more critical in tactical, low-TTK shooters (Valorant, CS2)."
        }
      },
      {
        "@type": "Question",
        "name": "Can tracking improve Apex Legends aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Gunfights in Apex Legends require landing full automatic magazines on dodging enemies. Consistent tracking practice is the single best way to improve Apex aim."
        }
      },
      {
        "@type": "Question",
        "name": "Can tracking improve Overwatch 2 aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target tracking is critical for heroes like Soldier: 76, Tracer, Zarya, and Sombra who rely on smooth pursuit and direction change recognition to maximize damage output."
        }
      },
      {
        "@type": "Question",
        "name": "What is counter-strafe reading?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Counter-strafe reading is your neurological speed in registering when an enemy reverses their horizontal direction, allowing you to re-align your crosshair with minimal lag."
        }
      },
      {
        "@type": "Question",
        "name": "What is aim smoothness?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Smoothness refers to moving your mouse at a constant, matching speed to the target without micro-corrections, jitters, or abrupt jerking movements."
        }
      },
      {
        "@type": "Question",
        "name": "How do professional players train tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pros use specialized software aim trainers to practice isolating horizontal sweeps, vertical tracking, and reaction speed under variable speeds."
        }
      },
      {
        "@type": "Question",
        "name": "What sensitivity is best for tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A moderate-to-low sensitivity (e.g., 25cm to 45cm per 360 rotation) is generally best for tracking, as it provides enough physical space to make smooth micro-adjustments."
        }
      },
      {
        "@type": "Question",
        "name": "Can this drill improve mouse control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Keeping your crosshair on dodging targets forces your wrist and fingers to build subtle motor-control adjustments, optimizing mouse handling."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to improve tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most players notice improvements in crosshair smoothness and reaction time after 2 weeks of daily, focused 10-minute training sessions."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Strafe Tracking Aim",
    "description": "Step-by-step instructions to train reactive tracking aim and counter-strafe reading.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Calibrate Sensitivity",
        "text": "Set your Universal Sens to match your main game sensitivity."
      },
      {
        "@type": "HowToStep",
        "name": "Lock Crosshair on Target",
        "text": "Keep your crosshair centered on the strafing target continuously to build combo multipliers."
      },
      {
        "@type": "HowToStep",
        "name": "React to Direction Swaps",
        "text": "Smoothly transition your crosshair when the target changes direction without over-predicting."
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
      <StrafeTrackingClient />
    </>
  );
}
