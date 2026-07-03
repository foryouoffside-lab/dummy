import AntiStrafeJitterClient from './AntiStrafeJitterClient';

export const metadata = {
  title: "Counter-Strafe Aim Trainer - Strafe Duel Drill | SkillDrills",
  description: "Master movement accuracy with our online Counter-Strafe Aim Trainer. Learn shot-timing synchronization and beat strafing opponents in competitive FPS.",
  keywords: [
    "counter strafe aim trainer",
    "counter strafe training",
    "counter strafing practice",
    "strafe duel aim trainer",
    "how to counter strafe",
    "anti strafe training",
    "ADAD strafe shooting",
    "ADAD tracking drill",
    "strafe stop shot timing",
    "cs2 counter strafe",
    "valorant anti strafe",
    "strafe duel practice",
    "fps movement aim training",
    "read enemy movement fps"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/anti-strafe-jitter-duel",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Counter-Strafe Aim Trainer - Strafe Duel Drill | SkillDrills",
    description: "Master movement accuracy with our online Counter-Strafe Aim Trainer. Learn shot-timing synchronization and beat strafing opponents in competitive FPS.",
    url: "https://skilldrills.online/drills/fps/anti-strafe-jitter-duel",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Counter-Strafe Aim Trainer - Strafe Duel Drill",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Counter-Strafe Aim Trainer - Strafe Duel Drill | SkillDrills",
    description: "Master movement accuracy with our online Counter-Strafe Aim Trainer. Learn shot-timing synchronization and beat strafing opponents in competitive FPS.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function AntiStrafeJitterPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Counter-Strafe Aim Trainer", "item": "https://skilldrills.online/drills/fps/anti-strafe-jitter-duel" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Counter-Strafe Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser-based FPS drill training counter-strafing shot timing, anti-strafe accuracy, and ADAD jitter-duel tracking for competitive FPS games.",
    "genre": "FPS Training / Movement Mechanics",
    "url": "https://skilldrills.online/drills/fps/anti-strafe-jitter-duel",
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
        "name": "What is counter-strafing and why is it important in CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Counter-strafing is pressing the opposite movement key (A or D) to instantly stop your character's momentum, making you accurate while stationary for a brief window. In CS2, your bullets are inaccurate while moving, so counter-strafing creates the accuracy window needed to fire. This drill trains you to time shots within that accuracy window."
        }
      },
      {
        "@type": "Question",
        "name": "What is ADAD jitter strafing and how do I counter it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ADAD jitter strafing is rapidly pressing A and D to create an erratic side-to-side movement pattern that makes you harder to track. The counter is to read the rhythm and click at the natural pause points of the jitter, or to use spray-down techniques. This drill trains both tracking and pause-timing against jitter movement patterns."
        }
      },
      {
        "@type": "Question",
        "name": "How does this drill differ from a standard tracking trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard tracking trainers move targets predictably. This drill simulates ADAD and jitter-strafe patterns — the non-linear, rhythm-based movement that real enemies use in gunfights. It trains the specific split-second timing of reading a strafe direction change and clicking at the movement window."
        }
      },
      {
        "@type": "Question",
        "name": "Does this help with Apex Legends movement gunfights?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Apex Legends has highly mobile movement mechanics where enemies frequently perform strafe-based evasion during gunfights. This drill trains your ability to track and click accurately through jitter-based evasion, directly improving your ability to win mobile 1v1 gunfights at close range."
        }
      },
      {
        "@type": "Question",
        "name": "What skills does anti-strafe training improve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Anti-strafe training improves shot timing, movement reading, reactive tracking, click precision during direction changes, and the cognitive ability to anticipate the next strafe direction — all critical skills for winning close-range duels in competitive FPS games."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Practice Counter-Strafing Shot Timing",
    "description": "Step-by-step instructions to coordinate your movement stops with accurate clicks on moving targets.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Sync Movement Controls",
        "text": "Move left and right using the A and D keys. Coordinate your finger transitions to stop your character's velocity."
      },
      {
        "@type": "HowToStep",
        "name": "Acquire the Target",
        "text": "Observe the target's side-to-side ADAD movement. Read the deceleration pauses at each direction shift."
      },
      {
        "@type": "HowToStep",
        "name": "Tap the Opposite Key and Click",
        "text": "Press the opposite direction key (e.g., tap D while moving left) and click the target center at the exact instant you stop."
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

      <AntiStrafeJitterClient />
    </>
  );
}

