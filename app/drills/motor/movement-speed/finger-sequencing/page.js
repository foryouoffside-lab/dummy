import FingerSequencingClient from './FingerSequencingClient';

export const metadata = {
  title: "Sequence Aim Trainer - Mouse Accuracy Test | SkillDrills",
  description: "Improve mouse accuracy and finger speed with our free Sequence Aim Trainer. Practice sequential clicking, hand-eye coordination, and speed online.",
  keywords: [
    "sequence aim trainer",
    "mouse accuracy test",
    "sequential clicking game",
    "click speed test",
    "finger speed training",
    "mouse control game",
    "hand eye coordination test",
    "fast clicking game",
    "aim trainer sequence",
    "fps sequence practice",
    "valorant aim trainer",
    "cs2 aim trainer",
    "ordered clicking drill",
    "finger dexterity game",
    "motor sequencing drill",
    "free aim trainer online",
    "reaction time test"
  ],
  openGraph: {
    title: "Sequence Aim Trainer - Mouse Accuracy Test | SkillDrills",
    description: "Improve mouse accuracy and finger speed with our free Sequence Aim Trainer. Practice sequential clicking, hand-eye coordination, and speed online.",
    type: 'website',
    url: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Sequence Aim Trainer - Mouse Accuracy Test',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sequence Aim Trainer - Mouse Accuracy Test | SkillDrills",
    description: "Improve mouse accuracy and finger speed with our free Sequence Aim Trainer. Practice sequential clicking, hand-eye coordination, and speed online.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing',
  },
};

export default function FingerSequencingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Movement Speed", "item": "https://skilldrills.online/drills/motor/movement-speed" },
      { "@type": "ListItem", "position": 4, "name": "Sequence Aim Trainer", "item": "https://skilldrills.online/drills/motor/movement-speed/finger-sequencing" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Sequence Aim Trainer - Mouse Accuracy Test",
    "url": "https://skilldrills.online/drills/motor/movement-speed/finger-sequencing",
    "description": "Free sequential aim trainer and mouse accuracy test. Click 3 connected nodes from largest to smallest before the timer expires. Endless difficulty scaling.",
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
        "name": "What is a sequence aim trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A sequence aim trainer is a specialized mouse accuracy tool designed to practice moving the crosshair to multiple targets in a specific order under time pressure, simulating multi-kill scenarios in FPS games."
        }
      },
      {
        "@type": "Question",
        "name": "How do I improve my mouse clicking accuracy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can improve mouse accuracy by practicing sequential clicking games that force your brain to prioritize spatial order and precision over blind spam-clicking."
        }
      },
      {
        "@type": "Question",
        "name": "Is this a CPS (Clicks Per Second) test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, this is not a raw CPS test. This tool tests accurate spatial clicking and finger sequencing, penalizing you for missed clicks rather than just measuring how fast you can mash a button."
        }
      },
      {
        "@type": "Question",
        "name": "Does sequential aim training help in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it directly trains target-switching, crosshair pathing, and multi-kill sequencing in competitive shooters like Valorant, CS2, and Apex Legends."
        }
      },
      {
        "@type": "Question",
        "name": "How do you test hand-eye coordination?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By measuring how fast your hand can accurately track and click descending node sizes before a dynamic sequence timer expires, tracking both speed and precision."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Finger Sequencing",
    "description": "Step-by-step instructions to train sequential clicking accuracy and crosshair pathing speed.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Initiate target sequencing",
        "text": "Click the Start button. Multiple interconnected target nodes of varying sizes will render on the canvas."
      },
      {
        "@type": "HowToStep",
        "name": "Click in size order",
        "text": "Analyze target sizes immediately. Flick and click the nodes sequentially from largest to smallest before they timeout."
      },
      {
        "@type": "HowToStep",
        "name": "Maintain speed and precision",
        "text": "Avoid mashing your mouse buttons. Focus on smooth, rhythmic flicks between targets to maintain your streak value."
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

      <FingerSequencingClient />
    </>
  );
}