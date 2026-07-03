import DragAndDropClient from './DragAndDropClient';

export const metadata = {
  title: "Drag and Drop Game - Mouse Precision Training | SkillDrills",
  description: "Improve fine motor control and cursor stability with our free Drag and Drop Game. Train mouse dragging precision and hand-eye coordination.",
  keywords: [
    "drag and drop game",
    "mouse precision training",
    "free drag and drop game",
    "mouse precision test",
    "fine motor skills training",
    "hand eye coordination game",
    "drag and drop game online",
    "mouse precision drill",
    "fine motor control game",
    "motor skills test",
    "mouse control training",
    "mouse dexterity training",
    "mouse dragging practice",
    "hand eye coordination test",
    "hand eye coordination training",
    "cursor precision game",
    "drag accuracy test",
    "mouse accuracy game"
  ],
  openGraph: {
    title: "Drag and Drop Game - Mouse Precision Training | SkillDrills",
    description: "Improve fine motor control and cursor stability with our free Drag and Drop Game. Train mouse dragging precision and hand-eye coordination.",
    type: 'website',
    url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Drag and Drop Game - Mouse Precision Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Drag and Drop Game - Mouse Precision Training | SkillDrills",
    description: "Improve fine motor control and cursor stability with our free Drag and Drop Game. Train mouse dragging precision and hand-eye coordination.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop',
  },
};

export default function DragAndDropPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Hand-Eye Coordination", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 4, "name": "Drag and Drop Game" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Drag and Drop Game - Free Mouse Precision Training",
    "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop",
    "description": "Free Drag and Drop Game for Mouse Precision Training. Improve fine motor control, cursor accuracy, hand-eye coordination, and drag precision with adaptive score-based difficulty. Timer-based progression system. No download required.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
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
        "name": "What is a drag and drop game?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A drag and drop game is an interactive browser drill where users click, hold, and move an object (like a ball) into a specific target zone. It is designed to test and improve spatial accuracy and motor control."
        }
      },
      {
        "@type": "Question",
        "name": "How does mouse precision training work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mouse precision training forces the user to make highly deliberate, controlled movements with their mouse or trackpad. By reducing the margin of error (target size) over time, the brain learns to refine its motor output for finer cursor control."
        }
      },
      {
        "@type": "Question",
        "name": "Can this improve cursor control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. This drill specifically isolates the 'drag' mechanic, which requires continuous muscle tension and smooth pathing. Practicing this improves overall cursor stability and eliminates shaky mouse movements."
        }
      },
      {
        "@type": "Question",
        "name": "Is this useful for FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While traditional aim trainers focus on quick flicks (clicks), drag and drop training improves the smooth tracking and tension control needed for recoil management and precise crosshair placement in games like Valorant and CS2."
        }
      },
      {
        "@type": "Question",
        "name": "Can designers benefit from this?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Graphic designers, illustrators, and 3D modelers rely heavily on pixel-perfect dragging for selecting nodes, drawing bezier curves, and moving assets. This drill directly trains those exact professional motor skills."
        }
      },
      {
        "@type": "Question",
        "name": "Can video editors benefit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Video editors constantly drag and drop clips onto timelines, adjust audio levels, and manipulate keyframes. Better mouse precision leads to faster, error-free editing workflows."
        }
      },
      {
        "@type": "Question",
        "name": "How is accuracy calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Accuracy is calculated as the percentage of your total drops that successfully land inside the target ring versus drops that miss the target entirely."
        }
      },
      {
        "@type": "Question",
        "name": "How does adaptive difficulty work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The difficulty scales automatically based on your score. As you reach higher score milestones (Levels 1-6), the target ring becomes smaller, moves faster, and demands higher spatial precision."
        }
      },
      {
        "@type": "Question",
        "name": "What is a good score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A score over 500 (Diamond rank) indicates strong fine motor control. Elite users with professional-level precision can consistently score over 1200 (Grandmaster)."
        }
      },
      {
        "@type": "Question",
        "name": "Can I play on mobile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! The drill is fully responsive and optimized for touch screens. You can tap, hold, and drag the ball just like you would use a mouse on a desktop."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For the best results in developing fine motor control, 5 to 10 minutes of daily practice is recommended. Consistency builds muscle memory faster than long, infrequent sessions."
        }
      },
      {
        "@type": "Question",
        "name": "Is the drill free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this Drag and Drop Mouse Precision Training game is 100% free. There are no downloads, no sign-ups, and no paywalls."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Drag and Drop Precision",
    "description": "Step-by-step instructions to train mouse dragging and target drop accuracy.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Pick up the interactive object",
        "text": "Hover your cursor over the ball, press and hold your primary mouse button to select it."
      },
      {
        "@type": "HowToStep",
        "name": "Drag to target area",
        "text": "Maintain mouse button tension. Drag the ball smoothly along the canvas workspace towards the active ring zone."
      },
      {
        "@type": "HowToStep",
        "name": "Release inside ring",
        "text": "Align the center of the ball with the target ring. Release your mouse button to execute a drop. Avoid dropping early or dragging past the ring."
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

      <DragAndDropClient />
    </>
  );
}