import ProFlickClient from './ProFlickClient';
import DrillGuide from '@/components/drill/DrillGuide';

export const metadata = {
  title: "Flick Shot Trainer - Snap Aim Practice | SkillDrills",
  description: "Train your snap aim and muscle memory with our online Flick Shot Trainer. Perfect for Valorant, CS2, and Apex Legends players looking to improve speed.",
  keywords: [
    "flick shot trainer",
    "flick aim trainer",
    "flick shot practice",
    "snap aim trainer",
    "fps aim trainer online",
    "mouse accuracy trainer",
    "target acquisition trainer",
    "valorant flick trainer",
    "cs2 flick practice",
    "aim training online free",
    "browser aim trainer",
    "free flick shot practice",
    "snap flick training",
    "first shot accuracy trainer",
    "precision aim training",
    "mechanical aim trainer"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/flick-shot-training",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Flick Shot Trainer - Snap Aim Practice | SkillDrills",
    description: "Train your snap aim and muscle memory with our online Flick Shot Trainer. Perfect for Valorant, CS2, and Apex Legends players looking to improve speed.",
    url: "https://skilldrills.online/drills/fps/flick-shot-training",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Flick Shot Trainer - Snap Aim Practice | SkillDrills",
    description: "Train your snap aim and muscle memory with our online Flick Shot Trainer. Perfect for Valorant, CS2, and Apex Legends players looking to improve speed.",
  },
};

export default function FlickShotPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Pro Flick Trainer", "item": "https://skilldrills.online/drills/fps/flick-shot-training" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pro Flick Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser-based FPS aim trainer for improving flick shots, snap aim, and rapid target acquisition for competitive shooters.",
    "genre": "FPS Training / Flick Aim",
    "url": "https://skilldrills.online/drills/fps/flick-shot-training",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Pro Flick Trainer",
    "url": "https://skilldrills.online/drills/fps/flick-shot-training",
    "description": "A free browser-based FPS aim trainer for improving flick shots, snap aim, and rapid target acquisition for competitive shooters.",
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
        "name": "What is flick aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flick aim is the mechanical ability to quickly snap your crosshair to a target outside of your immediate focus area using a single, swift mouse movement."
        }
      },
      {
        "@type": "Question",
        "name": "How do I improve flick aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Improve flick aim by practicing raw input drills that penalize misses and reward speed, forcing you to map the physical mousepad space to your monitor accurately."
        }
      },
      {
        "@type": "Question",
        "name": "What is a good flick accuracy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A good baseline flick accuracy is around 70%. Advanced players aim for 80%+, while professional esports players maintain 90%+ precision during high-speed target acquisition."
        }
      },
      {
        "@type": "Question",
        "name": "Does flick training help Valorant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Valorant heavily relies on crosshair placement and first-shot accuracy. Flick training improves your ability to react and snap to off-angle enemies instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Does flick training help CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Counter-Strike requires immense micro and macro flicking, especially with AWPing or reacting to unexpected peekers."
        }
      },
      {
        "@type": "Question",
        "name": "Can flick aim be learned?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, flick aim is a physical motor skill. Through repetitive practice with zero hardware acceleration, you develop muscle memory that makes flicking subconscious."
        }
      },
      {
        "@type": "Question",
        "name": "How long should I practice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aim for 15-20 minutes of dedicated flick aim training daily before playing competitive matches to optimize muscle memory retention without causing fatigue."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use arm aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For macro-flicks (large distances across the screen), arm aiming is generally preferred as it provides better stability and consistency on low sensitivities."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use wrist aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wrist and fingertip aiming should be used for micro-flicks and fine adjustments once your arm brings the crosshair near the target."
        }
      },
      {
        "@type": "Question",
        "name": "How important is sensitivity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sensitivity is crucial. You must find a consistent sensitivity (eDPI) and stick to it so your brain can properly map physical hand movement to virtual crosshair movement."
        }
      },
      {
        "@type": "Question",
        "name": "Can aim trainers improve rank?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, aim trainers isolate mechanical flaws. By improving your raw mechanical skill, you win more aim duels, which naturally translates to ranking up."
        }
      },
      {
        "@type": "Question",
        "name": "What is target acquisition?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target acquisition is the combined cognitive and physical process of visually locating an enemy and moving your crosshair onto them."
        }
      },
      {
        "@type": "Question",
        "name": "What is snap aiming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Snap aiming is another term for flicking. It emphasizes the fast, abrupt 'snapping' motion of the crosshair onto a target."
        }
      },
      {
        "@type": "Question",
        "name": "Why do I overshoot targets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Overshooting usually means your sensitivity is too high, or you haven't built enough stopping power (deceleration control) in your wrist."
        }
      },
      {
        "@type": "Question",
        "name": "How do pro players train aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pros use a combination of dedicated aim trainers (like this one), in-game deathmatches, and routine warmup regimens to maintain peak mechanical precision."
        }
      },
      {
        "@type": "Question",
        "name": "How does the scoring system work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hits grant base points multiplied by your combo multiplier and level multiplier. Misses and timeouts reset your combo multiplier."
        }
      },
      {
        "@type": "Question",
        "name": "Does the drill get harder while I'm on a streak?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Beyond the 15-level curve, a live streak 'heat' system shrinks targets and speeds up spawns the longer your hit streak runs, capping out at the same 50-combo streak that maxes your score multiplier. A miss cools the heat back to your level's baseline, so a hot run never gets easier to sustain."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Practice Flick Shooting and Snap Aiming",
    "description": "Step-by-step instructions to train your mouse acceleration and snapping mechanics.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Reset to Center",
        "text": "Bring your crosshair back to the neutral center area. Maintain a relaxed grip on your mouse."
      },
      {
        "@type": "HowToStep",
        "name": "Spot the Spawned Target",
        "text": "Locate the target that spawns randomly inside your field of view."
      },
      {
        "@type": "HowToStep",
        "name": "Flick and Click",
        "text": "In a single, continuous acceleration curve, snap your mouse to the target center and click immediately."
      }
    ]
  };

  const flickGuide = {
    heading: "Flick Shot Training Guide & FPS Aim Benchmarks",
    intro: [
      "Flick aim (or snap targeting) is the biomechanical ability to rapidly transition your crosshair from an initial resting angle onto an unexpected target in a single ballistic motor movement. In tactical hero shooters like Valorant and tactical team shooters like Counter-Strike 2, winning opening duels hinges on sub-180ms micro-flicks and precise target confirmation.",
      "Our interactive Flick Shot Trainer trains neuromuscular saccades, target acquisition speed, and deceleration control directly inside your browser."
    ],
    benchmarks: {
      title: "Official Flick Shot Performance & Accuracy Tiers",
      headers: ["Accuracy %", "Avg Time-To-Kill", "Rank Classification", "Esports Tier Equivalent", "Mechanic Mastery"],
      rows: [
        ["> 95%", "< 180 ms", "Radiant / Global Elite", "Professional Esports", "Flawless first-shot accuracy, zero over-flick micro-adjustments"],
        ["88% – 94%", "180 – 240 ms", "Immortal / Faceit 10", "High Competitive", "Crisp snap flicks with instantaneous target confirmation"],
        ["78% – 87%", "240 – 310 ms", "Ascendant / Diamond", "Intermediate Gamer", "Reliable target acquisition with slight micro-correction latency"],
        ["65% – 77%", "310 – 380 ms", "Platinum / Gold", "Average Player", "Frequent over-shooting or under-flicking requiring second corrections"],
        ["< 65%", "> 400 ms", "Silver / Bronze", "Developing", "Inconsistent mouse deceleration and unstable crosshair placement"]
      ],
      note: "Data averaged across competitive tactical shooter aim trials under standard 1080p/1440p resolutions."
    },
    techniques: {
      title: "Optimal eDPI Sensitivity Alignment by Game",
      items: [
        {
          name: "Valorant Aim Calibration",
          desc: "Optimal eDPI range: 200 - 320 (DPI × In-Game Sens). E.g. 800 DPI with 0.25 - 0.4 sens. Emphasizes micro-adjustments and calm crosshair placement.",
          tips: "Prioritize arm aiming for 90° clearing and wrist precision for micro headshot adjustments."
        },
        {
          name: "Counter-Strike 2 (CS2) Calibration",
          desc: "Optimal eDPI range: 600 - 1000. E.g. 800 DPI with 0.8 - 1.25 sens. Balances spray control deceleration with crisp angle holding.",
          tips: "Pre-aim common angles at head level before initiating flick transitions."
        },
        {
          name: "Apex Legends & Tracking Shooters",
          desc: "Optimal eDPI range: 1000 - 1600. Higher sensitivity allows continuous 360° visual tracking and close-range dynamic movement.",
          tips: "Use a smooth glide mouse pad and train continuous pursuit tracking alongside flick drills."
        },
        {
          name: "Overwatch 2 Hero Calibration",
          desc: "Hitscan (Cassidy, Widowmaker): 3200 - 4800 eDPI. Tracking/Projectile (Tracer, Genji): 4800 - 7200 eDPI.",
          tips: "Separate your muscle memory routines between click-timing hitscan and continuous tracking heroes."
        }
      ]
    },
    steps: [
      "Click Start Drill to launch the fullscreen flick arena.",
      "Center your visual gaze on the crosshair focal point.",
      "The instant a target spawns, snap your mouse swiftly onto the target center and click.",
      "Avoid lazy slow panning—focus on snappy acceleration followed by immediate stopping power.",
      "Review your accuracy percentage, average time to target, and rank tier on the scorecard."
    ],
    audience: "Tactical FPS competitors (Valorant, CS2, Rainbow Six Siege), Battle Royale players (Apex, Fortnite), and gamers seeking crisp mechanical mouse accuracy.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    related: [
      { href: "/drills/fps/180-degree-awareness", label: "180° Awareness Scan" },
      { href: "/drills/fps/angle-hold-trainer", label: "Angle Hold & Peek" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
      { href: "/drills/motor/movement-speed/rapid-tapping", label: "CPS Click Speed Test" }
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
      <ProFlickClient />
      <DrillGuide guide={flickGuide} />
    </>
  );
}
