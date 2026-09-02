import RecoilControlClient from './RecoilControlClient';

export const metadata = {
  title: "Recoil Control Trainer - Spray Practice | SkillDrills",
  description: "Master weapon spray patterns and recoil compensation with our Recoil Control Trainer. Practice AK47 spray down and burst fire accuracy online.",
  keywords: [
    "recoil control trainer",
    "spray pattern practice",
    "AK47 spray control drill",
    "CS2 recoil control practice",
    "Valorant spray control trainer",
    "how to control recoil in cs2",
    "how to master spray patterns fps",
    "best recoil control drill browser",
    "free spray pattern trainer online",
    "how to pull down on spray",
    "improve first magazine accuracy",
    "spray control training",
    "recoil compensation training",
    "burst fire accuracy"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/recoil-control",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Recoil Control Trainer - Spray Practice | SkillDrills",
    description: "Master weapon spray patterns and recoil compensation with our Recoil Control Trainer. Practice AK47 spray down and burst fire accuracy online.",
    url: "https://skilldrills.online/drills/fps/recoil-control",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Recoil Control Trainer - Spray Practice | SkillDrills",
    description: "Master weapon spray patterns and recoil compensation with our Recoil Control Trainer. Practice AK47 spray down and burst fire accuracy online.",
  },
};

export default function RecoilControlPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Recoil Control", "item": "https://skilldrills.online/drills/fps/recoil-control" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Recoil Control Pro",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS drill for mastering recoil control, spray patterns, and weapon compensation for CS2, Valorant, PUBG, and other shooters.",
    "genre": "FPS Training / Recoil & Spray Control",
    "url": "https://skilldrills.online/drills/fps/recoil-control",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Recoil Control Pro",
    "url": "https://skilldrills.online/drills/fps/recoil-control",
    "description": "A free browser FPS drill for mastering recoil control, spray patterns, and weapon compensation for CS2, Valorant, PUBG, and other shooters.",
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
        "name": "What is recoil control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recoil control is the mechanical compensation players perform by moving their mouse in the exact opposite direction of a weapon's automatic firing kickback to keep bullet placement accurate."
        }
      },
      {
        "@type": "Question",
        "name": "How do I control recoil in CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In CS2, weapons like the AK-47 have set spray patterns. You must pull down your mouse for the first 10 bullets, then drift it left and right in a mirror shape of the spray pattern."
        }
      },
      {
        "@type": "Question",
        "name": "Does this help Valorant players?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Valorant weapons like the Vandal have vertical recoil for the first few shots, followed by horizontal sway. Training spray control helps you manage the early vertical climb and control bursts."
        }
      },
      {
        "@type": "Question",
        "name": "What is spray pattern training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spray pattern training involves memorizing the exact offset path of bullets during sustained automatic fire and practicing the reverse path to hold a tight cluster."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice recoil control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Daily practice of 5 to 10 minutes before launching competitive matches is highly recommended to build and maintain weapon control muscle memory."
        }
      },
      {
        "@type": "Question",
        "name": "How are errors penalised in Recoil Control Pro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Missing shots or emptying a magazine with less than 40% accuracy resets your combo streak. When the optional Time Penalty setting is enabled, a magazine discipline failure also deducts 0.6s from your clock."
        }
      },
      {
        "@type": "Question",
        "name": "Why do my bullets spread?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bullets spread due to a combination of recoil (the predictable path the gun kicks) and inaccuracy bloom (the random spread deviation caused by movement or sustained fire)."
        }
      },
      {
        "@type": "Question",
        "name": "Can recoil control improve consistency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, knowing how to control your spray means you don't have to rely entirely on single-tap headshots, giving you reliable backup options in close-to-medium range fights."
        }
      },
      {
        "@type": "Question",
        "name": "Is this recoil trainer free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this Recoil Control Trainer is 100% free, runs in any modern web browser, and does not require downloads or sign-ups."
        }
      },
      {
        "@type": "Question",
        "name": "What skills does this drill improve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It improves mouse pull-down timing, spray discipline, weapon pattern familiarity, horizontal control, and physical muscle memory."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Master Recoil Control",
    "description": "Step-by-step instructions to train weapon spray pattern compensation and improve accuracy.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Initiate sustained fire",
        "text": "Hold your firing key to start the spray. Observe the direction the crosshair kicks."
      },
      {
        "@type": "HowToStep",
        "name": "Pull down vertically",
        "text": "For the first 5-8 bullets, pull your mouse straight down at a consistent velocity to counteract the vertical kick."
      },
      {
        "@type": "HowToStep",
        "name": "Compensate horizontal sway",
        "text": "As the pattern shifts horizontally (e.g., left then right), move your mouse in the exact opposite direction (e.g., right then left) to keep the bullets centered."
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
      <RecoilControlClient />
    </>
  );
}
