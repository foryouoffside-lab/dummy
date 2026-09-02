import TargetAcquisitionClient from './TargetAcquisitionClient';

export const metadata = {
  title: "Target Acquisition Trainer - First Shot Aim | SkillDrills",
  description: "Improve your visual target acquisition and threat identification speed. Practice first shot accuracy and cognitive aim response times online.",
  keywords: [
    "target acquisition aim trainer",
    "first shot accuracy drill",
    "target selection training fps",
    "CS2 target acquisition practice",
    "Valorant target priority drill",
    "how to find enemies faster in fps",
    "how to improve target selection valorant",
    "best drill for first shot accuracy",
    "free browser target acquisition trainer",
    "visual discrimination training for gamers",
    "how to stop missing the right target",
    "target recognition speed",
    "visual target detection",
    "cognitive aim trainer"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/target-acquisition",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Target Acquisition Trainer - First Shot Aim | SkillDrills",
    description: "Improve your visual target acquisition and threat identification speed. Practice first shot accuracy and cognitive aim response times online.",
    url: "https://skilldrills.online/drills/fps/target-acquisition",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Target Acquisition Trainer - First Shot Aim | SkillDrills",
    description: "Improve your visual target acquisition and threat identification speed. Practice first shot accuracy and cognitive aim response times online.",
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
    "name": "Target Acquisition Pro",
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

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Target Acquisition Pro",
    "url": "https://skilldrills.online/drills/fps/target-acquisition",
    "description": "A free browser FPS drill training visual target identification speed, threat recognition, and first-shot accuracy for competitive FPS games.",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser"
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
          "text": "Target acquisition is the combined process of visually detecting a threat, identifying it as an enemy (not a teammate), deciding to engage, and getting your crosshair on the target fast enough to fire first. It involves both cognitive processing (recognition and decision) and mechanical execution (crosshair movement). This is the skill that separates players who see enemies fast from those who react slowly."
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
          "text": "Players with trained target acquisition have learned unconscious threat pattern recognition — their visual system has been trained to flag enemy silhouettes, color cues, and movement patterns faster than untrained players. This creates the illusion that they see first when actually their brain is processing the same visual information faster and more efficiently."
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
          "text": "Target acquisition training improves visual processing speed (how fast your eyes register a target), pattern recognition (identifying enemy silhouettes), selective attention (filtering enemies from background), and decision speed (choosing to engage). Together these create the faster perception that high-rank players possess."
        }
      },
      {
        "@type": "Question",
        "name": "How are errors penalised in Target Acquisition Pro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Clicking a darker target out of order or clicking empty space resets your streak combo multiplier. When the optional Time Penalty setting is enabled in your session preferences, each mistake also deducts 0.6s from your clock."
        }
      },
      {
        "@type": "Question",
        "name": "How does target acquisition impact CS2 and tactical shooters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In CS2, time-to-kill is extremely fast. Spotting a target's head pixel a fraction of a second earlier grants the critical advantage needed to secure first-bullet headshots."
        }
      },
      {
        "@type": "Question",
        "name": "What is the optimal daily target acquisition training routine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend 10 to 15 minutes of target acquisition drills at the start of your gaming session to warm up visual processing speed before entering competitive matches."
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
      <TargetAcquisitionClient />
    </>
  );
}
