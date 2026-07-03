import RecoilControlClient from './RecoilControlClient';

export const metadata = {
  title: "Recoil Control Trainer - Spray Pattern Practice | SkillDrills",
  description: "Master weapon spray patterns and recoil compensation with our Recoil Control Trainer. Practice AK47 spray down and burst fire accuracy online.",
  keywords: [
    "recoil control trainer",
    "spray control training",
    "spray pattern trainer",
    "AK47 spray control trainer",
    "Valorant recoil control",
    "CS2 spray control drill",
    "recoil compensation training",
    "cs2 recoil control",
    "valorant spray control",
    "weapon spray training",
    "burst fire accuracy",
    "full auto spray training",
    "pubg recoil control",
    "apex legends recoil",
    "r6 siege recoil trainer",
    "recoil mastery trainer"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/recoil-control",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Recoil Control Trainer - Spray Pattern Practice | SkillDrills",
    description: "Master weapon spray patterns and recoil compensation with our Recoil Control Trainer. Practice AK47 spray down and burst fire accuracy online.",
    url: "https://skilldrills.online/drills/fps/recoil-control",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Recoil Control Trainer - Spray Pattern Practice",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Recoil Control Trainer - Spray Pattern Practice | SkillDrills",
    description: "Master weapon spray patterns and recoil compensation with our Recoil Control Trainer. Practice AK47 spray down and burst fire accuracy online.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
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
    "name": "Recoil Control Trainer",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is recoil control in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recoil control is the technique of moving your mouse in the opposite direction of a weapon's recoil pattern while firing, keeping your bullets on target during sustained fire. Every automatic weapon has a unique spray pattern — the path bullets travel when you hold down fire. Learning and compensating for this pattern is called spray control."
        }
      },
      {
        "@type": "Question",
        "name": "How do I learn the CS2 AK-47 spray pattern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The CS2 AK-47 spray pattern starts with a vertical rise, then curves left, then right, then becomes more random. Recoil control begins by pulling straight down for the first 5-8 bullets, then making leftward adjustment, then rightward. This drill trains pattern compensation through muscle memory without requiring you to consciously memorize the exact pattern."
        }
      },
      {
        "@type": "Question",
        "name": "Is spray control the same in Valorant as in CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Valorant has faster first-shot accuracy recovery, so Valorant professionals often prefer burst fire (2-3 shots, pause, 2-3 shots) over full sprays. CS2 rewards full spray mastery at close range where bullet spread is less critical. Both games benefit from this drill, but the application differs — Valorant players should focus on burst control, CS2 players on full pattern spray."
        }
      },
      {
        "@type": "Question",
        "name": "Should I practice recoil control before or after flick training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "After your warm-up and before ranked play, spend 5 minutes on spray control and 5 minutes on flick shots. Spray control warms up the fine motor control needed for both skills. Starting with recoil training activates your wrist muscles and builds the finger-control sensitivity that benefits all other aim types."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between recoil control and spray control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recoil control refers to compensating for a weapon's vertical kick during any firing mode — single shots, bursts, or sprays. Spray control specifically refers to managing recoil during sustained full-auto fire across an entire magazine. This drill trains both by adjusting difficulty from burst patterns to full sustained spray compensation."
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

      <RecoilControlClient />
    </>
  );
}

