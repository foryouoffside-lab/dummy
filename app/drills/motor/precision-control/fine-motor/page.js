import FineMotorClient from './FineMotorClient';

export const metadata = {
  title: "Fine Motor Skills Training - Mouse Precision | SkillDrills",
  description: "Improve your fine motor skills and mouse control with our free online precision trainer. Practice cursor tracking and control exercises.",
  keywords: [
    "fine motor skills training online",
    "mouse precision trainer",
    "mouse control exercises",
    "fine motor exercises",
    "cursor precision test",
    "mouse accuracy trainer",
    "hand dexterity practice",
    "steady hand exercise",
    "occupational therapy online",
    "fps aim trainer",
    "cursor control training",
    "mouse control exercise",
    "hand eye coordination game",
    "cursor tracking game",
    "path tracking game"
  ],
  openGraph: {
    title: "Fine Motor Skills Training - Mouse Precision | SkillDrills",
    description: "Improve your fine motor skills and mouse control with our free online precision trainer. Practice cursor tracking and control exercises.",
    type: 'website',
    url: 'https://skilldrills.online/drills/motor/precision-control/fine-motor',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Fine Motor Skills Training - Mouse Precision',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Fine Motor Skills Training - Mouse Precision | SkillDrills",
    description: "Improve your fine motor skills and mouse control with our free online precision trainer. Practice cursor tracking and control exercises.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/precision-control/fine-motor',
  },
};

export default function FineMotorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Precision Control", "item": "https://skilldrills.online/drills/motor/precision-control" },
      { "@type": "ListItem", "position": 4, "name": "Fine Motor Skills Training", "item": "https://skilldrills.online/drills/motor/precision-control/fine-motor" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Fine Motor Skills Training - Mouse Precision Game",
    "url": "https://skilldrills.online/drills/motor/precision-control/fine-motor",
    "description": "Free fine motor skills training and mouse precision test. Track a scrolling wave path with your cursor to build hand steadiness and multi-directional mouse control.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires a modern web browser with JavaScript and Pointer Lock API support.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Organization", "name": "SkillDrills" },
    "isAccessibleForFree": true,
    "learningResourceType": "Educational Game",
    "teaches": "Fine Motor Skills, Mouse Precision, Hand Steadiness, Continuous Tracking, Hand-Eye Coordination"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I improve my fine motor skills online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can improve your fine motor skills online using interactive cursor control games. These exercises require micro-adjustments and steady movements, training the hand muscles and hand-eye coordination directly through your browser."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best mouse precision trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best mouse precision trainers are interactive tools that focus on path-tracking, flicking, and click accuracy. SkillDrills offers a free online mouse accuracy trainer that tracks cursor drift and calculates accuracy scores instantly."
        }
      },
      {
        "@type": "Question",
        "name": "What are some effective mouse control exercises?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Effective mouse control exercises include tracking moving paths, precision clicking tests, and micro-correction drills. These exercises build motor muscle memory, help stabilize shaky hands, and calibrate cursor control for gaming or drawing."
        }
      },
      {
        "@type": "Question",
        "name": "How do gamers benefit from steady hand training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FPS gamers (Valorant, CS2, Apex Legends) rely on smooth tracking to keep their crosshair on moving targets. This drill builds the foundational steadiness required for elite recoil control and tracking aim."
        }
      },
      {
        "@type": "Question",
        "name": "How do digital artists and designers benefit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Digital artists, architects, and graphic designers require immense hand stability to draw smooth curves and precise lines. This path tracking game acts as a perfect warm-up to calibrate hand stability before using a mouse or drawing tablet."
        }
      },
      {
        "@type": "Question",
        "name": "Can this be used for occupational therapy or rehabilitation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, many individuals use cursor control exercises to help rehabilitate hand mobility, regain fine motor control, or manage mild hand tremors through targeted, low-stress repetitive digital tasks."
        }
      },
      {
        "@type": "Question",
        "name": "What is Adrenaline Mode in this game?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "During the final 15 seconds of the drill, the game enters 'Adrenaline Mode.' The path distorts rapidly with micro-zigzags, the speed increases, and visual/audio cues simulate high-pressure scenarios to test your consistency under stress."
        }
      },
      {
        "@type": "Question",
        "name": "How does the scoring combo system work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your score multiplier increases the longer you stay perfectly locked on the path (up to 3x). If your cursor slips off the path, your streak breaks and the combo resets to 1x, forcing you to focus on consistency."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Fine Motor Skills and Mouse Precision",
    "description": "Step-by-step instructions to train fine motor tracking stability and path control accuracy.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Activate the scrolling path",
        "text": "Press Start. A scrolling wave path will appear at the right edge of the screen and begin moving leftward."
      },
      {
        "@type": "HowToStep",
        "name": "Track the path center",
        "text": "Keep your mouse cursor perfectly centered within the moving path container bounds. Follow the bends smoothly."
      },
      {
        "@type": "HowToStep",
        "name": "Survive the dynamic distortions",
        "text": "During the drill progression, stay locked onto the path through speed increases and high-frequency zigzag distortions without losing cursor alignment."
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

      <FineMotorClient />
    </>
  );
}