import ClickAccuracyClient from './ClickAccuracyClient';

export const metadata = {
  title: "Mouse Accuracy Test - Click Accuracy Drill | SkillDrills",
  description: "Test and improve your cursor precision with our free mouse accuracy test. Practice single-target click tracking and FPS flick shots.",
  keywords: [
    "mouse accuracy test",
    "click accuracy drill",
    "click accuracy test",
    "mouse precision test",
    "mouse precision training",
    "aim trainer game",
    "free mouse accuracy test",
    "online mouse accuracy test",
    "click accuracy game",
    "cursor precision test",
    "free aim trainer",
    "aim training online",
    "flick shot training",
    "flick shot practice",
    "FPS aim drill",
    "single target aim training",
    "precision clicking game",
    "hand eye coordination test",
    "hand eye coordination game",
    "reaction time test"
  ],
  openGraph: {
    title: "Mouse Accuracy Test - Click Accuracy Drill | SkillDrills",
    description: "Test and improve your cursor precision with our free mouse accuracy test. Practice single-target click tracking and FPS flick shots.",
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/click-accuracy',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Mouse Accuracy Test - Click Accuracy Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mouse Accuracy Test - Click Accuracy Drill | SkillDrills",
    description: "Test and improve your cursor precision with our free mouse accuracy test. Practice single-target click tracking and FPS flick shots.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/hand-eye-coordination/click-accuracy',
  },
};

export default function ClickAccuracyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Hand-Eye Coordination", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 4, "name": "Mouse Accuracy Test - Click Accuracy Drill" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Mouse Accuracy Test - Click Accuracy Drill",
    "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/click-accuracy",
    "description": "Free mouse accuracy test and click accuracy drill. Single target teleports every 1.5s. Shrinks 12px to 7px with streak. 3-life system, millisecond reaction tracking. Best free mouse precision test online.",
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
        "name": "What is this free mouse accuracy test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A free mouse accuracy test and click accuracy drill. A single target teleports every 1.5 seconds. It shrinks from 12px to 7px with streak progression. 3-life system. Tracks millisecond reaction time. Best free click accuracy test online."
        }
      },
      {
        "@type": "Question",
        "name": "How does the streak system work in this click accuracy drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target shrinks 0.12px per streak hit (minimum 7px). Colors: white (0-4 streak), green (5-9), cyan (10+). 10x streak bonuses. 20x streak special reward. Miss resets streak. 3-life protection system."
        }
      },
      {
        "@type": "Question",
        "name": "Is this mouse accuracy test good for FPS flick shots?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. This click accuracy drill directly trains the single-target flick shot accuracy needed for Valorant, CS2, Overwatch 2, and Apex Legends. Teleporting target mimics enemies appearing unpredictably."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to sign up for this mouse accuracy test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No registration required. This free mouse accuracy test and click accuracy drill works instantly in your browser — no downloads needed."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Click Accuracy",
    "description": "Step-by-step instructions to train cursor precision and single-target click tracking.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Initiate click accuracy session",
        "text": "Click Start to begin. An initial circular target will render on the canvas."
      },
      {
        "@type": "HowToStep",
        "name": "Track teleporting targets",
        "text": "Follow the target as it teleports to a new position. Click it within the active window duration."
      },
      {
        "@type": "HowToStep",
        "name": "Build target shrink streak",
        "text": "Consecutive hits shrink the target, requiring higher precision. Focus on clean, deliberate wrist flick movements rather than rushing."
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

      <ClickAccuracyClient />
    </>
  );
}