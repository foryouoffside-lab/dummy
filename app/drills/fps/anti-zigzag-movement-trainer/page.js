import AntiZigzagClient from './AntiZigzagClient';

export const metadata = {
  title: "Anti-Zigzag Movement Trainer - FPS Aim Training | SkillDrills",
  description: "Master target tracking and movement prediction against unpredictable zig-zag strafing, slides, crouch spam, and fake-outs in modern FPS shooters.",
  keywords: [
    "anti-zigzag movement trainer",
    "anti-strafe training",
    "movement prediction aim trainer",
    "fps aim training",
    "target tracking drill",
    "zig-zag aim trainer",
    "apex legends tracking practice",
    "call of duty mobile aim training",
    "reactive tracking trainer",
    "mouse control training",
    "valorant tracking drill",
    "cs2 tracking practice",
    "free aim trainer online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/anti-zigzag-movement-trainer",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Anti-Zigzag Movement Trainer - FPS Aim Training | SkillDrills",
    description: "Master target tracking and movement prediction against unpredictable zig-zag strafing, slides, crouch spam, and fake-outs in modern FPS shooters.",
    url: "https://skilldrills.online/drills/fps/anti-zigzag-movement-trainer",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Anti-Zigzag Movement Trainer - FPS Aim Training",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Anti-Zigzag Movement Trainer - FPS Aim Training | SkillDrills",
    description: "Master target tracking and movement prediction against unpredictable zig-zag strafing, slides, crouch spam, and fake-outs in modern FPS shooters.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function AntiZigzagMovementPage() {
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
    "description": "A free browser-based FPS drill designed to train target tracking, reactive aim corrections, and movement prediction against human-like zig-zag movement, slide, jump, and crouch spam patterns.",
    "genre": "FPS Training / Reactive Tracking",
    "url": "https://skilldrills.online/drills/fps/anti-zigzag-movement-trainer",
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
        "name": "What is anti-zigzag aim training in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Anti-zigzag aim training focuses on tracking targets that change speed and direction erratically. Rather than following smooth paths, targets perform left-right strafes, sudden crouches, jump-strafes, and sliding dashes. This drill develops the player's reactive visual tracking and rapid micro-adjustments to keep their crosshair locked on targets utilizing evasive movement techniques."
        }
      },
      {
        "@type": "Question",
        "name": "Why is zig-zag tracking harder than standard tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard tracking relies on smooth pursuit, where the target's trajectory is predictable. Zig-zag tracking forces the brain into reactive pursuit. When a target suddenly changes direction or accelerates, the player undergoes a visual reaction delay (typically 150-250ms). Training this drill reduces overflicking and improves recovery speed to reacquire the target."
        }
      },
      {
        "@type": "Question",
        "name": "How does target tracking benefit Apex Legends and CoD: Mobile players?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "High time-to-kill (TTK) shooters like Apex Legends, Warzone, and Call of Duty: Mobile require continuous damage application to confirm kills. Skilled opponents use aggressive slide-jumping, crouch spamming, and zig-zag strafing to throw off your aim. Training with human-like movement variables directly builds the muscle memory needed to track these high-speed evasion techniques."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best mouse sensitivity for tracking evasive targets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tracking benefit from moderate to low sensitivities (typically between 25cm to 45cm per 360). High sensitivities cause cursor jitter and overflicking, whereas extremely low sensitivities require excessive physical effort to follow rapid 180-degree changes. The universal sensitivity slider on this drill allows you to match your preferred in-game settings."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Anti-Zigzag Tracking",
    "description": "Step-by-step training routine to counter evasive zig-zag strafes, jumps, and slide movements.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Anchor Crosshair Center",
        "text": "Lock your gaze onto the center of the moving target rather than staring at your crosshair. Keeping your hand relaxed reduces muscle-tension jitters."
      },
      {
        "@type": "HowToStep",
        "name": "React to Reversals",
        "text": "When the target suddenly switches directions (fake-outs or burst strafes), avoid wild flicking. Make a controlled micro-adjustment to align your cursor back to the target center."
      },
      {
        "@type": "HowToStep",
        "name": "Practice All Modes",
        "text": "Train in Prediction Mode to build response anticipation, Recovery Mode to train snap reacquisition, and Advanced Movement to master tracking vertical jumps and low slide profiles."
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
