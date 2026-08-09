import AimTrainerClient from './AimTrainerClient';

export const metadata = {
  title: "Aim Trainer Elite — Mouse Precision Trainer | SkillDrills",
  description: "Improve mouse accuracy, reaction speed, and target acquisition with this free FPS aim trainer. Score-based difficulty scaling for Valorant, CS2 & Apex.",
  keywords: [
    "aim trainer elite online",
    "free fps aim trainer",
    "mouse accuracy practice drill",
    "click accuracy aim trainer",
    "valorant micro flick trainer",
    "cs2 headshot accuracy drill",
    "apex legends target acquisition",
    "score based difficulty aim trainer",
    "raw mouse input precision drill",
    "hand eye coordination aim test",
    "free online gridshot trainer",
    "motor skill mouse precision",
    "fps target acquisition trainer",
    "the finals click timing drill",
    "call of duty aim practice",
    "universal sensitivity aim trainer",
    "continuous target flick drill",
    "anti overflicking aim trainer",
    "fine motor click control drill",
    "survival difficulty aim trainer"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Aim Trainer Elite — Mouse Precision Trainer | SkillDrills",
    description: "Improve mouse accuracy, reaction speed, and target acquisition with this free FPS aim trainer. Score-based difficulty scaling for Valorant, CS2 & Apex.",
    url: "https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Aim Trainer Elite — Mouse Precision Trainer | SkillDrills",
    description: "Improve mouse accuracy, reaction speed, and target acquisition with this free FPS aim trainer. Score-based difficulty scaling for Valorant, CS2 & Apex.",
  },
};

export default function AimTrainerPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Motor Drills", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Aim Trainer Elite", "item": "https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Aim Trainer Elite",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Improve mouse accuracy, reaction speed, and target acquisition with score-based difficulty scaling.",
    "genre": "FPS Training / Motor Precision",
    "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Aim Trainer Elite",
    "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer",
    "description": "Improve mouse accuracy, reaction speed, and target acquisition with score-based difficulty scaling.",
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
        "name": "What is Aim Trainer Elite?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aim Trainer Elite is a dynamic target acquisition drill designed to test and refine your mouse accuracy, target acquisition speed, and click timing."
        }
      },
      {
        "@type": "Question",
        "name": "How does this aim trainer improve mouse precision?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By spawning targets that dynamically shrink, move, and expire, the drill conditions fine motor control and rapid eye-to-hand target acquisition."
        }
      },
      {
        "@type": "Question",
        "name": "Does this help Valorant and CS2 aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, micro-flicking and clicking small targets directly translates to first-shot headshot precision in tactical shooters like Valorant and CS2."
        }
      },
      {
        "@type": "Question",
        "name": "How does score-based difficulty scaling work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As your score increases, the game engine automatically advances your level from 1 to 15, reducing target sizes and increasing movement speed."
        }
      },
      {
        "@type": "Question",
        "name": "What happens when a target times out?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When a target expires before you click it, your combo streak resets and a red error flash triggers without point loss."
        }
      },
      {
        "@type": "Question",
        "name": "How is tracking accuracy calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Accuracy is calculated as the ratio of successful target hits divided by total clicks, displayed as a percentage on the result dashboard."
        }
      },
      {
        "@type": "Question",
        "name": "Can I play this aim trainer on mobile devices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This drill requires pointer-lock mouse input for crosshair control, so it is not playable on touch-only phones or tablets. Use a desktop or laptop with a mouse for the full experience."
        }
      },
      {
        "@type": "Question",
        "name": "Does this trainer support universal mouse sensitivity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can adjust the Universal Sens slider to calibrate raw input cm/360 sensitivity before starting your session."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best way to practice with Aim Trainer Elite?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus on accuracy first before building speed. Rushed clicks reset your combo, while clean centered clicks build combo multipliers."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I warm up with this aim trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 10-15 minute session before playing competitive matches helps prime your motor cortex and eye-hand coordination."
        }
      },
      {
        "@type": "Question",
        "name": "Is this aim trainer completely free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Aim Trainer Elite is 100% free, requires no downloads or account registration, and runs natively in any modern web browser."
        }
      },
      {
        "@type": "Question",
        "name": "What is combo scaling in this drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sustaining consecutive hits without missing or letting targets expire builds combo multipliers up to 3.0x bonus points per hit."
        }
      },
      {
        "@type": "Question",
        "name": "Does this help with reaction speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, fast-expiring targets at higher difficulty levels train your brain to register target locations and execute click commands faster."
        }
      },
      {
        "@type": "Question",
        "name": "What causes missed clicks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Missed clicks occur when you fire before your crosshair is fully centered over the target hitbox, or when you over-flick past the target edge."
        }
      },
      {
        "@type": "Question",
        "name": "How does the 45-second session timer work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each session runs for a fixed 45 seconds, giving you a standardized time window to score maximum points and benchmark your performance."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Aim Precision and Target Acquisition",
    "description": "Step-by-step instructions to train mouse accuracy and click timing.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Adjust Sensitivity",
        "text": "Set your Universal Sens slider to match your primary game."
      },
      {
        "@type": "HowToStep",
        "name": "Acquire Target Circles",
        "text": "Click target circles as soon as they spawn across the grid area."
      },
      {
        "@type": "HowToStep",
        "name": "Maintain Combos",
        "text": "Sustain consecutive accurate hits without missing to build 3.0x score multipliers."
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
      <AimTrainerClient />
    </>
  );
}