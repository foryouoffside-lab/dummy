import TargetAcquisitionClient from './TargetAcquisitionClient';

export const metadata = {
  title: "Target Acquisition Aim Trainer - First Shot Accuracy | SkillDrills",
  description: "Improve your visual target acquisition and threat identification speed. Practice first shot accuracy and cognitive aim response times online.",
  keywords: [
    "target acquisition aim training",
    "first shot accuracy drill",
    "visual target identification",
    "esports target acquisition",
    "target acquisition trainer",
    "target acquisition training",
    "fps target identification",
    "target recognition speed",
    "visual target detection",
    "fps decision making trainer",
    "cognitive aim trainer",
    "threat assessment training",
    "target selection drill",
    "valorant target acquisition",
    "cs2 target id training",
    "free target acquisition game"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/target-acquisition",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Target Acquisition Aim Trainer - First Shot Accuracy | SkillDrills",
    description: "Improve your visual target acquisition and threat identification speed. Practice first shot accuracy and cognitive aim response times online.",
    url: "https://skilldrills.online/drills/fps/target-acquisition",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Target Acquisition Aim Trainer - First Shot Accuracy",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Target Acquisition Aim Trainer - First Shot Accuracy | SkillDrills",
    description: "Improve your visual target acquisition and threat identification speed. Practice first shot accuracy and cognitive aim response times online.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function TargetAcquisitionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Target Acquisition", "item": "https://skilldrills.online/drills/fps/target-acquisition" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Target Acquisition Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS drill training visual target identification speed, threat recognition, and first-shot accuracy for competitive FPS games.",
    "genre": "FPS Training / Target Acquisition",
    "url": "https://skilldrills.online/drills/fps/target-acquisition",
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
        "name": "What is target acquisition in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target acquisition is the combined process of visually detecting a threat, identifying it as an enemy (not a teammate), deciding to engage, and getting your crosshair on the target fast enough to fire first. It involves both cognitive processing (recognition and decision) and mechanical execution (crosshair movement). This is the skill that separates players who \"see\" enemies fast from those who react slowly."
        }
      },
      {
        "@type": "Question",
        "name": "How does target acquisition differ from reaction time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reaction time measures the gap between stimulus appearance and your click. Target acquisition includes reaction time but adds the prior cognitive steps: visual scan → target detection → threat confirmation → aim → shoot. Better target acquisition means your brain identifies threats faster, giving your mechanical aim more time to respond accurately."
        }
      },
      {
        "@type": "Question",
        "name": "Why do some players always seem to see enemies before others?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Players with trained target acquisition have learned unconscious threat pattern recognition — their visual system has been trained to flag enemy silhouettes, color cues, and movement patterns faster than untrained players. This creates the illusion that they \"see first\" when actually their brain is processing the same visual information faster and more efficiently."
        }
      },
      {
        "@type": "Question",
        "name": "How does this help in Valorant compared to other drills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Valorant's round-based structure means you often peek corners or angles with partial information. Fast target acquisition is critical for winning the split-second timing battle when two players simultaneously come into view of each other. This drill specifically trains the speed of the visual identification → aim decision → click sequence."
        }
      },
      {
        "@type": "Question",
        "name": "What cognitive skills does target acquisition training improve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target acquisition training improves visual processing speed (how fast your eyes register a target), pattern recognition (identifying enemy silhouettes), selective attention (filtering enemies from background), and decision speed (choosing to engage). Together these create the \"faster\" perception that high-rank players possess."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Target Acquisition Speed",
    "description": "Step-by-step instructions to train visual identification latency and first-shot accuracy.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Establish visual scanning",
        "text": "Keep your eyes scanning active areas on screen. Do not lock your gaze to a static crosshair spot."
      },
      {
        "@type": "HowToStep",
        "name": "Identify the threat",
        "text": "The millisecond a target appears, visually identify its coordinates and confirm it is a threat."
      },
      {
        "@type": "HowToStep",
        "name": "Snap and engage",
        "text": "Flick directly to the confirmed target coordinates and click to fire. Focus on minimizing the visual detection-to-click latency."
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

      <TargetAcquisitionClient />
    </>
  );
}

