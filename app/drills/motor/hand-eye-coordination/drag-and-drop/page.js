import DragAndDropClient from './DragAndDropClient';

export const metadata = {
  title: "Drag & Drop Trainer — Mouse Spatial Control | SkillDrills",
  description: "Master mouse spatial dragging control, cursor deceleration speed, and release timing with this free online drag and drop precision trainer.",
  keywords: [
    "drag and drop precision trainer",
    "mouse spatial drag test",
    "free drag and drop precision drill",
    "cursor deceleration practice",
    "mouse stopping power trainer",
    "spatial coordinate drag test",
    "hand eye drag drop trainer",
    "score based drag precision drill",
    "raw mouse input drag trainer",
    "moving target drop test",
    "free online drag and drop game",
    "motor skill drag precision drill",
    "graphic designer mouse trainer",
    "video editor timeline precision drill",
    "mouse inventory drag practice",
    "universal sensitivity drag trainer",
    "micro drag precision drill",
    "anti overflicking drag trainer",
    "fine motor cursor control test",
    "survival difficulty drag precision"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Drag & Drop Trainer — Mouse Spatial Control | SkillDrills",
    description: "Master mouse spatial dragging control, cursor deceleration speed, and release timing with this free online drag and drop precision trainer.",
    url: "https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Drag & Drop Trainer — Mouse Spatial Control | SkillDrills",
    description: "Master mouse spatial dragging control, cursor deceleration speed, and release timing with this free online drag and drop precision trainer.",
  },
};

export default function DragAndDropPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Motor Drills", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Drag & Drop Precision Trainer", "item": "https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Drag & Drop Precision Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Master mouse spatial dragging control, cursor deceleration speed, and release timing.",
    "genre": "Cursor Control / Motor Precision",
    "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Drag & Drop Precision Trainer",
    "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop",
    "description": "Master mouse spatial dragging control, cursor deceleration speed, and release timing.",
    "gamePlatform": "Web Browser",
    "genre": ["Motor Precision Training", "Cursor Control"],
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
        "name": "What is the Drag and Drop Precision Trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Drag and Drop Precision Trainer is a specialized motor drill designed to test and refine fine cursor control, spatial dragging accuracy, and deceleration timing."
        }
      },
      {
        "@type": "Question",
        "name": "How does drag and drop training improve mouse control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By requiring you to click, transport, and accurately release objects into moving target zones under time pressure, it strengthens micro-motor pathways and cursor stability."
        }
      },
      {
        "@type": "Question",
        "name": "Does drag precision training benefit FPS players?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, dragging and releasing precise coordinates trains mouse deceleration and stopping power, essential for crosshair placement and inventory management."
        }
      },
      {
        "@type": "Question",
        "name": "How does difficulty scale in this drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As your score increases, the level scales from 1 to 15, shrinking target containers, accelerating movement speed, and shortening target lifespan."
        }
      },
      {
        "@type": "Question",
        "name": "What happens when a drop misses the target?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Releasing outside the target zone resets your current combo multiplier to zero and triggers a red error flash without point loss."
        }
      },
      {
        "@type": "Question",
        "name": "How is drag accuracy calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Accuracy is calculated as total successful target drops divided by total drop attempts, displayed as a real-time percentage."
        }
      },
      {
        "@type": "Question",
        "name": "Can I adjust mouse sensitivity for this drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — the Mouse Sensitivity slider in Session Settings on the drills hub matches your raw input multiplier and cm/360, and applies to every mouse-aimed drill."
        }
      },
      {
        "@type": "Question",
        "name": "Is this drag and drop drill free?",
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
          "text": "Sustaining consecutive accurate drops builds combo multipliers up to 3.0x bonus points per successful placement."
        }
      },
      {
        "@type": "Question",
        "name": "Can graphic designers and editors benefit from this drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, designers and editors build high-precision dragging dexterity needed for adjusting nodes, layers, and clip placement on timelines."
        }
      },
      {
        "@type": "Question",
        "name": "Does this drill support touch screen input?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This drill requires pointer-lock mouse input for cursor control, so it is not playable on touch-only phones or tablets. Use a desktop or laptop with a mouse for the full experience."
        }
      },
      {
        "@type": "Question",
        "name": "How long should I train drag precision daily?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 10-15 minute daily session helps build muscle memory and maintain high baseline cursor control."
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
        "name": "What is the best technique for high scores?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Maintain smooth, controlled dragging speed rather than rushing, avoiding premature drops outside target boundaries."
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
    "name": "How to Train Mouse Drag & Drop Precision",
    "description": "Step-by-step instructions to train mouse spatial dragging control, deceleration speed, and release timing.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Adjust Sensitivity",
        "text": "Set the Mouse Sensitivity slider in Session Settings on the drills hub to match your raw input multiplier."
      },
      {
        "@type": "HowToStep",
        "name": "Acquire and Drag Ball",
        "text": "Click or touch the draggable object and transport it smoothly toward the moving bucket container."
      },
      {
        "@type": "HowToStep",
        "name": "Release Inside Target",
        "text": "Release your mouse button or touch input precisely inside the moving target boundary to score points and build combo multipliers."
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
      <DragAndDropClient />
    </>
  );
}