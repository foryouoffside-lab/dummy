import PrecisionFlickShotClient from './PrecisionFlickShotClient';

export const metadata = {
  title: "Mouse Accuracy Test - Free Precision Flick Aim Trainer",
  description: "Master mouse flick accuracy, target acquisition speed, and center-click bulls-eye precision with this free online flick shot trainer for Valorant & CS2.",
  keywords: [
    "precision flick shot trainer",
    "flick aim practice test",
    "free flick shot drill",
    "valorant flick aim trainer",
    "cs2 headshot flick test",
    "mouse target acquisition drill",
    "bullseye flick shot practice",
    "score based flick aim trainer",
    "raw mouse input flick test",
    "shrinking target flick drill",
    "free online flick aim game",
    "motor skill flick shot practice",
    "esports flick accuracy trainer",
    "apex legends flick aim drill",
    "call of duty flick reaction",
    "universal sensitivity flick trainer",
    "micro flick accuracy trainer",
    "anti overflicking aim drill",
    "fine motor flick control test",
    "survival difficulty flick shot"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Mouse Accuracy Test - Free Precision Flick Aim Trainer",
    description: "Master mouse flick accuracy, target acquisition speed, and center-click bulls-eye precision with this free online flick shot trainer for Valorant & CS2.",
    url: "https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mouse Accuracy Test - Free Precision Flick Aim Trainer",
    description: "Master mouse flick accuracy, target acquisition speed, and center-click bulls-eye precision with this free online flick shot trainer for Valorant & CS2.",
  },
};

export default function PrecisionFlickShotPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Motor Drills", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Precision Flick Shot Trainer", "item": "https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Precision Flick Shot Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Master mouse flick accuracy, target acquisition speed, and center-click bulls-eye precision.",
    "genre": "FPS Training / Motor Precision",
    "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Precision Flick Shot Trainer",
    "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot",
    "description": "Master mouse flick accuracy, target acquisition speed, and center-click bulls-eye precision.",
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
        "name": "What is the Precision Flick Shot Trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Precision Flick Shot Trainer is an advanced motor drill engineered to test and improve mouse flick accuracy, target acquisition speed, and center-click timing."
        }
      },
      {
        "@type": "Question",
        "name": "How does flick shot training improve FPS aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By training your hand to rapidly snap to target coordinates and stop cleanly before clicking, you build refined muscle memory for flicking in tactical shooters."
        }
      },
      {
        "@type": "Question",
        "name": "Does flick accuracy training help Valorant and CS2 players?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, opening duels and headshots in Valorant and CS2 rely heavily on fast micro-flicks and precise crosshair placement trained in this drill."
        }
      },
      {
        "@type": "Question",
        "name": "How does difficulty scale in this trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Every 1400 points earned advances your level without cap, shrinking target hitboxes and accelerating target decay rates — two targets stay active on screen throughout."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Bulls-eye mechanic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Clicking within the inner 8-pixel center of a target awards double points (+200 PTS) and spawns yellow spark effects."
        }
      },
      {
        "@type": "Question",
        "name": "What happens when you miss a click?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Clicking empty space or letting a target decay out resets your combo multiplier to zero and triggers a red error flash. When the optional Time Penalty is enabled, 0.8s is deducted."
        }
      },
      {
        "@type": "Question",
        "name": "How is flick accuracy calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Accuracy is calculated as total target hits divided by total clicks, displayed as a real-time percentage."
        }
      },
      {
        "@type": "Question",
        "name": "Does this trainer support raw mouse input sensitivity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the Universal Sens slider allows you to match your raw input multiplier and cm/360 sensitivity setting."
        }
      },
      {
        "@type": "Question",
        "name": "Is this precision flick shot drill free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the drill is 100% free with no sign-ups or downloads required, running directly in modern web browsers."
        }
      },
      {
        "@type": "Question",
        "name": "How do combo multipliers work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sustaining consecutive target hits without missing builds combo multipliers up to 3.0x bonus points per successful flick."
        }
      },
      {
        "@type": "Question",
        "name": "Does this drill support touch screen input?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This drill requires pointer-lock mouse input for crosshair control, so it is not playable on touch-only phones or tablets. Use a desktop or laptop with a mouse for the full experience."
        }
      },
      {
        "@type": "Question",
        "name": "How long should I train flick accuracy daily?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 10-15 minute daily session before competitive gaming helps calibrate hand-eye coordination and spatial snapping accuracy."
        }
      },
      {
        "@type": "Question",
        "name": "How is high performance maintained during gameplay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The canvas engine utilizes cached backdrop grid rendering and hardware-accelerated requestAnimationFrame loops for smooth 60+ FPS performance."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best technique for high flick scores?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus on smooth deceleration so your cursor stops directly over the target center rather than over-shooting past the edges."
        }
      },
      {
        "@type": "Question",
        "name": "How does the session timer work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each session starts with 45 seconds on the clock. Clean target hits add +0.6s to extend your run. When the optional Time Penalty setting is enabled, misses and expirations deduct 0.8s."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Mouse Flick Shot Precision",
    "description": "Step-by-step instructions to train mouse flick accuracy, target acquisition speed, and center-click bulls-eyes.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Adjust Sensitivity",
        "text": "Set your Universal Sens slider to match your raw in-game sensitivity."
      },
      {
        "@type": "HowToStep",
        "name": "Flick & Snap Crosshair",
        "text": "Rapidly move your crosshair directly toward newly spawned targets across the grid area."
      },
      {
        "@type": "HowToStep",
        "name": "Hit Inner Bulls-eye",
        "text": "Click precisely within the inner center of targets to earn double points (+200 PTS) and build combo multipliers."
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
      <PrecisionFlickShotClient />
    </>
  );
}