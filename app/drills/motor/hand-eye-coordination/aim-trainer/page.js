import AimTrainerClient from './AimTrainerClient';

export const metadata = {
  title: "Free Aim Trainer Online - Elite Mouse Accuracy | SkillDrills",
  description: "Improve mouse accuracy and reflex speed with our free online aim trainer. Train hand-eye coordination for Valorant, CS2, and Apex Legends.",
  keywords: [
    "free aim trainer online",
    "aim trainer",
    "aim trainer elite",
    "aim training game",
    "mouse accuracy test",
    "mouse accuracy drill",
    "fps aim trainer",
    "valorant aim trainer",
    "cs2 aim trainer",
    "hand eye coordination training",
    "aim practice",
    "mobile aim trainer",
    "browser aim trainer"
  ],
  openGraph: {
    title: "Free Aim Trainer Online - Elite Mouse Accuracy | SkillDrills",
    description: "Improve mouse accuracy and reflex speed with our free online aim trainer. Train hand-eye coordination for Valorant, CS2, and Apex Legends.",
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Free Aim Trainer Online - Elite Mouse Accuracy',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Aim Trainer Online - Elite Mouse Accuracy | SkillDrills",
    description: "Improve mouse accuracy and reflex speed with our free online aim trainer. Train hand-eye coordination for Valorant, CS2, and Apex Legends.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer',
  },
};

export default function AimTrainerPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Hand-Eye Coordination", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 4, "name": "Aim Trainer Elite" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Aim Trainer Elite - Free Aim Trainer Online",
    "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer",
    "description": "Aim Trainer Elite is a free aim trainer online that improves mouse and touch accuracy. Features a time-based survival system where hits add time and misses deduct time. Perfect for Valorant, CS2, and general hand-eye coordination training.",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All (Desktop, Mobile, Tablet)",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Organization", "name": "SkillDrills" },
    "isAccessibleForFree": true
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Aim Trainer Elite?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aim Trainer Elite is a free aim trainer online designed to improve mouse and touch accuracy through an adaptive, time-based survival mode. You click moving targets to build your score while managing a strict countdown timer."
        }
      },
      {
        "@type": "Question",
        "name": "How does this improve aiming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By forcing you to acquire and click dynamic targets under time pressure, it isolates and trains hand-eye coordination, reaction speed, and raw mechanical precision."
        }
      },
      {
        "@type": "Question",
        "name": "Does it help Valorant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it heavily improves first-shot accuracy, micro-flicking, and fast crosshair placement recovery—all of which are crucial for winning duels in tactical shooters like Valorant."
        }
      },
      {
        "@type": "Question",
        "name": "Does it help CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. CS2 requires pinpoint precision and extremely fast reaction times. This drill trains the exact mechanical muscle memory needed for crisp headshots and fast target acquisition."
        }
      },
      {
        "@type": "Question",
        "name": "Does it improve reaction time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Targets have limited lifespans and move unpredictably. Tracking and clicking them before they time out forces your brain to process visual stimuli and execute motor commands much faster."
        }
      },
      {
        "@type": "Question",
        "name": "Why does difficulty increase?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The drill features a score-based progression system. As your score increases, you advance through levels where targets become smaller, move faster, and adopt more erratic trajectories to continuously push your limits."
        }
      },
      {
        "@type": "Question",
        "name": "How does the time system work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You start with 60 seconds on the clock. A correct hit grants +10 Score and adds +1 second to your timer. However, a miss-click or a target timeout penalizes you by deducting -1 second. Your score never decreases, but your survival depends on your accuracy."
        }
      },
      {
        "@type": "Question",
        "name": "Can I play on mobile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Aim Trainer Elite is fully responsive and supports touch input across mobile devices and tablets. Target sizes automatically scale based on your screen size. Landscape mode is recommended for the best experience."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use the Free Aim Trainer",
    "description": "Step-by-step instructions to train mouse accuracy, speed, and flicking mechanics.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Start the trainer session",
        "text": "Click the Start button. Prepare for targets to spawn at random points on the training canvas."
      },
      {
        "@type": "HowToStep",
        "name": "Acquire targets sequentially",
        "text": "Flick your cursor to the center of each spawned target. Tap or click to destroy them before they fade out."
      },
      {
        "@type": "HowToStep",
        "name": "Maintain accuracy for time bonus",
        "text": "Avoid miss-clicks. Correct hits add valuable time, whereas misses or timeouts deduct time, testing your target pacing."
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

      <AimTrainerClient />
    </>
  );
}