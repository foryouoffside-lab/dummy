import FlowStateClient from './FlowInductionClient';

export const metadata = {
  title: "Flow State Trainer — Focus & Aim | SkillDrills",
  description: "Train concentration endurance, sustained attention, and flow state tracking for FPS games and cognitive deep work performance.",
  keywords: [
    "flow state aim trainer",
    "fps focus concentration drill",
    "sustained attention aim practice",
    "cognitive flow trainer fps",
    "deep focus tracking drill",
    "concentration endurance aim trainer",
    "bezier curve flow tracking",
    "free flow state focus drill",
    "apex legends flow trainer",
    "overwatch 2 focus tracking",
    "valorant flow state practice",
    "cs2 concentration trainer",
    "visual tracking endurance drill",
    "deep work cognitive aim trainer",
    "anti distraction tracking trainer",
    "fine motor focus control",
    "hardware raw input flow state",
    "continuous flow chain tracking",
    "aim tracking consistency tool",
    "cognitive control focus drill"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/flow-state",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Flow State Trainer — Focus & Aim | SkillDrills",
    description: "Train concentration endurance, sustained attention, and flow state tracking for FPS games and cognitive deep work performance.",
    url: "https://skilldrills.online/drills/fps/flow-state",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Flow State Trainer — Focus & Aim | SkillDrills",
    description: "Train concentration endurance, sustained attention, and flow state tracking for FPS games and cognitive deep work performance.",
  },
};

export default function FlowStatePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Flow State Trainer", "item": "https://skilldrills.online/drills/fps/flow-state" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Flow State Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Train concentration endurance, sustained attention, and flow state tracking for FPS games.",
    "genre": "FPS Training / Flow State",
    "url": "https://skilldrills.online/drills/fps/flow-state",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Flow State Trainer",
    "url": "https://skilldrills.online/drills/fps/flow-state",
    "description": "Train concentration endurance, sustained attention, and flow state tracking for FPS games.",
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
        "name": "What is flow state?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flow state, often called 'being in the zone', is a psychological state of deep focus and total immersion in an activity, resulting in peak performance and cognitive clarity."
        }
      },
      {
        "@type": "Question",
        "name": "Can flow state be trained?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, flow state can be trained by repeatedly engaging in activities that balance challenge and skill, such as sustained visual tracking drills, which build concentration endurance."
        }
      },
      {
        "@type": "Question",
        "name": "How long should I practice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For building focus endurance, aim for 10-15 minute daily sessions. Stop when you notice severe mental fatigue or frequent attention drift."
        }
      },
      {
        "@type": "Question",
        "name": "What is deep focus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Deep focus is the ability to sustain attention on a single complex task without succumbing to external distractions or internal cognitive drift."
        }
      },
      {
        "@type": "Question",
        "name": "How does flow improve learning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flow eliminates mental friction and distraction, allowing the brain's working memory to dedicate 100% of its resources to processing and storing new information."
        }
      },
      {
        "@type": "Question",
        "name": "How does flow improve gaming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In competitive gaming, flow state allows players to react intuitively, track targets flawlessly, and make split-second strategic decisions without conscious hesitation."
        }
      },
      {
        "@type": "Question",
        "name": "Can flow improve productivity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Operating in a flow state is the core principle behind 'Deep Work', allowing individuals to produce higher quality output in significantly less time."
        }
      },
      {
        "@type": "Question",
        "name": "What is sustained attention?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sustained attention is a component of executive functioning that involves maintaining consistent behavioral response and focus during continuous and repetitive activity."
        }
      },
      {
        "@type": "Question",
        "name": "Why does focus break and how are penalties applied?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A focus break occurs when your crosshair stays off the target for 1.0s or more, which resets your combo multiplier. If you have the optional Time Penalty enabled in your session settings, a focus break also deducts 0.6s from your clock."
        }
      },
      {
        "@type": "Question",
        "name": "What is attention control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Attention control is an individual's capacity to choose what they pay attention to and what they ignore. It is a critical metric for cognitive stability."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to improve concentration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With daily, deliberate practice using concentration tools, measurable improvements in sustained attention and focus duration can be seen in 2 to 4 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "Can this improve ADHD-like focus problems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While not a medical treatment, visual tracking exercises that provide immediate gamified feedback can help train the brain's reward pathways to sustain attention longer."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I train?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Daily practice is optimal for neuroplasticity. Use this drill as a 5-minute mental warmup before starting work, studying, or competitive gaming sessions."
        }
      },
      {
        "@type": "Question",
        "name": "What is peak flow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Peak flow occurs at the 80-100% mark of the Flow Meter. It represents total visual and motor synchronization, where tracking becomes predictive rather than reactive."
        }
      },
      {
        "@type": "Question",
        "name": "What is concentration endurance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Concentration endurance is the mental stamina required to maintain a high-level flow state over prolonged periods without cognitive degradation."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Flow State Focus",
    "description": "Step-by-step instructions to train concentration endurance and flow state visual tracking.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Adjust Sensitivity",
        "text": "Set your Universal Sens slider to match your primary game."
      },
      {
        "@type": "HowToStep",
        "name": "Track Fluid Bezier Target",
        "text": "Keep your crosshair continuously centered inside the moving target."
      },
      {
        "@type": "HowToStep",
        "name": "Maintain Concentration Combo",
        "text": "Avoid tracking breaks to sustain your Flow Chain and trigger high score multipliers."
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
      <FlowStateClient />
    </>
  );
}
