import PrecisionFlickShotClient from './PrecisionFlickShotClient';

export const metadata = {
  title: "Flick Aim Trainer - Flick Shot Practice | SkillDrills",
  description: "Improve mouse accuracy and snap mechanical aim with our free Flick Aim Trainer. Practice rapid flick shot speed and click precision online.",
  keywords: [
    "Flick Aim Trainer",
    "Flick Shot Trainer",
    "Aim Trainer Online",
    "Mouse Accuracy Test",
    "Mouse Precision Training",
    "Click Accuracy Test",
    "FPS Aim Trainer",
    "Aim Training Game",
    "Free Aim Trainer",
    "Reaction Time Game",
    "Mouse Control Training",
    "Hand Eye Coordination",
    "Valorant Aim Trainer",
    "CS2 Aim Trainer",
    "Apex Aim Trainer",
    "Esports Aim Practice"
  ],
  openGraph: {
    title: "Flick Aim Trainer - Flick Shot Practice | SkillDrills",
    description: "Improve mouse accuracy and snap mechanical aim with our free Flick Aim Trainer. Practice rapid flick shot speed and click precision online.",
    type: 'website',
    url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Flick Aim Trainer - Flick Shot Practice'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Flick Aim Trainer - Flick Shot Practice | SkillDrills",
    description: "Improve mouse accuracy and snap mechanical aim with our free Flick Aim Trainer. Practice rapid flick shot speed and click precision online.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot'
  }
};

export default function PrecisionFlickShotPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Hand-Eye Coordination", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 4, "name": "Precision Flick Shot" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Precision Flick Shot - Flick Aim Trainer",
    "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot",
    "description": "Improve your flick aim, mouse accuracy, reaction time, and click precision with this free online Flick Aim Trainer.",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
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
        "name": "What is a Flick Aim Trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Flick Aim Trainer is a browser-based mouse accuracy test designed to improve your reaction speed, click accuracy, and spatial muscle memory by spawning targets that you must rapidly snap to and click before they disappear."
        }
      },
      {
        "@type": "Question",
        "name": "How do professional FPS players improve flick aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional players build muscle memory through endless repetition in dedicated aim training games, isolating the raw mechanical flick and center-click precision required to instantly acquire targets under pressure."
        }
      },
      {
        "@type": "Question",
        "name": "Does flick training improve Valorant aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, tactical shooters like Valorant and CS2 rely heavily on fast target acquisition and micro-flicks to hit headshots efficiently. This drill isolates that exact mechanical requirement."
        }
      },
      {
        "@type": "Question",
        "name": "Can this improve CS2 aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. CS2 demands immediate, raw mouse accuracy to win gunfights. By training yourself to hit the inner bulls-eye nodes of shrinking targets, you directly condition the precision needed for CS2."
        }
      },
      {
        "@type": "Question",
        "name": "Is this an aim trainer for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! The game features endless dynamic scaling. It starts out slow and forgiving at Level 1, and only increases in difficulty as you reach higher score thresholds, making it perfect for all skill levels."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice flick shots?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For optimal results, implement 10 to 15 minutes of flick shot training into your daily gaming warmup to effectively calibrate your hand-eye coordination before jumping into competitive matches."
        }
      },
      {
        "@type": "Question",
        "name": "Does this work on mobile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the precision clicking game handles touch events perfectly, making it an excellent reaction time and hand-eye coordination game for mobile users as well."
        }
      },
      {
        "@type": "Question",
        "name": "What skills does this improve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This drill targets flick aim, click accuracy, visual target acquisition, reaction speed, fine mouse control, and high-pressure spatial coordination."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Flick Aim",
    "description": "Step-by-step instructions to train snap aim mechanics and quick target acquisition.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Start the flick session",
        "text": "Press the Start button. Focus your eyes on the center of the training canvas layout."
      },
      {
        "@type": "HowToStep",
        "name": "Snap to targets",
        "text": "When a target spawns, make a rapid, single mechanical flick movement directly to the target center. Do not overflick."
      },
      {
        "@type": "HowToStep",
        "name": "Confirm click cleanly",
        "text": "Execute a clean click on the target node before it fades out, then reset your focus to the center canvas region."
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

      <PrecisionFlickShotClient />
    </>
  );
}