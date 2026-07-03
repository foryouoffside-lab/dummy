import InstantResponseClient from './InstantResponseClient';

export const metadata = {
  title: "FPS Reaction Time Test - Gaming Reflex Trainer | SkillDrills",
  description: "Test and train your reflex speed with our FPS Reaction Time Test. Measure click response times and improve visual reaction speed for competitive gaming.",
  keywords: [
    "fps reaction time test",
    "reaction time test fps",
    "reflex trainer fps",
    "visual reaction speed test",
    "click reaction test",
    "gaming reflex test",
    "reaction time trainer",
    "fps reflex training",
    "visual response speed",
    "reaction time test online",
    "valorant reaction training",
    "cs2 reaction time",
    "apex reflex training",
    "instant reaction trainer",
    "free reaction time test",
    "browser reflex trainer",
    "response time test gaming"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/instant-response",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "FPS Reaction Time Test - Gaming Reflex Trainer | SkillDrills",
    description: "Test and train your reflex speed with our FPS Reaction Time Test. Measure click response times and improve visual reaction speed for competitive gaming.",
    url: "https://skilldrills.online/drills/fps/instant-response",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "FPS Reaction Time Test - Gaming Reflex Trainer",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FPS Reaction Time Test - Gaming Reflex Trainer | SkillDrills",
    description: "Test and train your reflex speed with our FPS Reaction Time Test. Measure click response times and improve visual reaction speed for competitive gaming.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function InstantResponsePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Reaction Time Test", "item": "https://skilldrills.online/drills/fps/instant-response" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FPS Reaction Time Test",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser-based FPS drill measuring and training visual reaction time, click reflex speed, and stimulus response latency for competitive gaming.",
    "genre": "FPS Training / Reaction Speed",
    "url": "https://skilldrills.online/drills/fps/instant-response",
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
        "name": "What is a good reaction time for FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average human visual reaction time is 200-250 milliseconds. Competitive FPS players typically achieve 150-200ms reaction times after training. Professional esports players often measure below 150ms. However, raw reaction time is only one factor — decision-making, crosshair placement, and prediction also determine who wins gunfights."
        }
      },
      {
        "@type": "Question",
        "name": "How does this FPS reaction time test work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The drill displays a visual stimulus on screen and measures the time between stimulus appearance and your click response. It uses browser high-resolution timing APIs for accurate millisecond measurements. Multiple rounds are averaged to give a reliable baseline of your current visual reaction speed."
        }
      },
      {
        "@type": "Question",
        "name": "Can I actually improve my reaction time with training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. While genetics determine your absolute lower limit, consistent training reduces the cognitive overhead between stimulus detection and motor response. Regular practice teaches your visual system to process FPS-specific stimuli faster, and your motor system to execute clicks with less hesitation, effectively reducing your practical reaction time by 20-50ms over weeks of training."
        }
      },
      {
        "@type": "Question",
        "name": "What is visual reaction time vs. auditory reaction time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Visual reaction time (reacting to a visual stimulus like an enemy appearing) averages 200-250ms. Auditory reaction time (reacting to a sound like a gunshot) averages 150-180ms, making it inherently faster. This drill tests visual reaction time, which is the primary stimulus type in FPS games when enemies appear on screen."
        }
      },
      {
        "@type": "Question",
        "name": "How is this different from a general reaction time test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This drill is specifically designed for FPS context — it simulates the visual pattern of enemy targets appearing on screen and measures your click-to-target response. General reaction tests use simple colored shapes. This trainer presents FPS-relevant visual stimuli to build gaming-specific neural pathways."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Measure Your FPS Reaction Time",
    "description": "Step-by-step instructions to test and track your visual reaction speed.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Active Mode",
        "text": "Click 'Start' and focus your vision on the central trigger card area."
      },
      {
        "@type": "HowToStep",
        "name": "Wait for the Stimulus",
        "text": "Keep your hand relaxed. Wait for the visual trigger card to change color."
      },
      {
        "@type": "HowToStep",
        "name": "Click Instantly",
        "text": "Click your mouse key as fast as humanly possible the millisecond the color shifts. Repeat to compile your average latency."
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

      <InstantResponseClient />
    </>
  );
}

