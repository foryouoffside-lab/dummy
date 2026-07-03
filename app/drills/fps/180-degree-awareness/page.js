import AwarenessDrillClient from './AwarenessDrillClient';

export const metadata = {
  title: "180 Flick Aim Trainer - Snap Turn Drill | SkillDrills",
  description: "Master your reaction speed and spatial awareness with our online 180 Flick Aim Trainer. Practice snap turns, escape flanks, and dominate CS2 & Valorant.",
  keywords: [
    "180 flick aim trainer",
    "180 aim trainer",
    "180 degree aim training",
    "180 turn aim drill",
    "behind you awareness fps",
    "snap turn aim trainer",
    "CS2 180 snap",
    "Valorant 180 turn",
    "apex legends awareness",
    "fortnite 180 practice",
    "free fps aim trainer",
    "aim trainer browser",
    "improve game sense fps"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/180-degree-awareness",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "180 Flick Aim Trainer - Snap Turn Drill | SkillDrills",
    description: "Master your reaction speed and spatial awareness with our online 180 Flick Aim Trainer. Practice snap turns, escape flanks, and dominate CS2 & Valorant.",
    url: "https://skilldrills.online/drills/fps/180-degree-awareness",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "180 Flick Aim Trainer - Snap Turn Drill",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "180 Flick Aim Trainer - Snap Turn Drill | SkillDrills",
    description: "Master your reaction speed and spatial awareness with our online 180 Flick Aim Trainer. Practice snap turns, escape flanks, and dominate CS2 & Valorant.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function AwarenessDrillPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "180 Flick Aim Trainer", "item": "https://skilldrills.online/drills/fps/180-degree-awareness" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "180 Flick Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based 180 flick aim trainer to improve reaction speed, snap turns, and spatial awareness for CS2 and Valorant.",
    "genre": "FPS Training / Situational Awareness",
    "url": "https://skilldrills.online/drills/fps/180-degree-awareness",
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
        "name": "What is a 180-degree flick shot in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 180-degree flick shot is a rapid 180° spin followed immediately by an accurate shot on a target behind you. It is a critical mechanical skill in tactical FPS games like CS2 and Valorant, where enemies frequently appear from unexpected directions. This drill trains the full spin-and-shoot motion using raw mouse input."
        }
      },
      {
        "@type": "Question",
        "name": "How does the 180° Awareness drill train spin-shot accuracy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The drill spawns targets behind your current field of view, forcing you to execute a full 180-degree mouse sweep and click accurately on the target. This trains both mouse travel distance muscle memory and the snap-deceleration needed to stop precisely on a target after a full spin."
        }
      },
      {
        "@type": "Question",
        "name": "Does this drill help with behind-you awareness in Valorant and CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The drill directly simulates the scenario where you are flanked from behind. Regular practice trains your brain to respond instantly to behind-you threats, building the unconscious muscle memory needed to spin and eliminate the threat before they can react."
        }
      },
      {
        "@type": "Question",
        "name": "Is this different from a regular flick shot trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Standard flick trainers target enemies within your normal field of view. This drill forces a full 180-degree mouse sweep — a completely different motion involving greater mouse travel, higher inertia control, and different muscle memory patterns than short-range flicks."
        }
      },
      {
        "@type": "Question",
        "name": "What sensitivity settings should I use for 180-degree flick training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There is no single correct sensitivity. Most competitive players practice 180s at their current in-game sensitivity to transfer the exact muscle memory. The drill uses your real hardware mouse input, so simply play at your normal DPI and in-game sensitivity settings."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Practice the 180 Flick Aim Drill",
    "description": "Step-by-step instructions to train your snap targets and behind-you awareness using the SkillDrills trainer.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Configure Sensitivity",
        "text": "Set up the browser mouse input sensitivity to match your in-game Valorant or CS2 sensitivity settings."
      },
      {
        "@type": "HowToStep",
        "name": "Start the Drill",
        "text": "Click 'Start' to begin the scenario. A target will spawn directly behind your initial field of view."
      },
      {
        "@type": "HowToStep",
        "name": "Snap and Shoot",
        "text": "Perform a rapid 180-degree swipe, center your crosshair, and click the target before the timer expires."
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

      <AwarenessDrillClient />
    </>
  );
}

