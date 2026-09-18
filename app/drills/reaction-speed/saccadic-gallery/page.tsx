import SaccadicGalleryWrapper from './SaccadicGalleryWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Saccadic Gallery - Online Saccadic Eye Exercises",
  description: "Free saccadic eye exercises online. Train rapid eye jumps between fixed targets to build faster visual scanning and sharper target acquisition.",
  keywords: ["saccadic eye exercises", "saccades", "saccadic eye movements", "saccadic training", "saccadic gallery", "visual tracking exercises", "saccadic eye movement training", "esports vision training", "saccadic training online", "saccadic tracking exercises", "saccadic latency", "saccadic dysmetria", "express saccades", "ocular coordination training", "how to improve saccadic eye movement", "vision therapy exercises online", "free eye exercises game", "sports vision drills free", "cognitive eye warmup"],
  openGraph: {
    title: "Saccadic Gallery - Online Saccadic Eye Exercises",
    description: "Free saccadic eye exercises online. Train rapid eye jumps between fixed targets to build faster visual scanning and sharper target acquisition.",
    type: 'article',
    url: 'https://skilldrills.online/drills/reaction-speed/saccadic-gallery',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Saccadic Gallery - Online Saccadic Eye Exercises",
    description: "Free saccadic eye exercises online. Train rapid eye jumps between fixed targets to build faster visual scanning and sharper target acquisition.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/saccadic-gallery',
    languages: getAlternateLanguages('/drills/reaction-speed/saccadic-gallery'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://skilldrills.online"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Drills Hub",
      "item": "https://skilldrills.online/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Reaction Speed",
      "item": "https://skilldrills.online/drills/reaction-speed"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Saccadic Gallery",
      "item": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Saccadic Gallery — Online Saccadic Eye Exercises",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free saccadic eye exercises online. Train rapid eye jumps between fixed targets to build faster visual scanning and sharper target acquisition.",
  "url": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "inLanguage": "en-US",
  "dateModified": "2026-09-11"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Saccadic Eye Exercises",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas, modern web browser with Pointer Lock support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery",
  "inLanguage": "en-US",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Saccadic Gallery – High-Speed Eye Jump & Target Acquisition Game",
  "url": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery",
  "description": "Free saccadic eye exercises online. Train rapid eye jumps between fixed targets to build faster visual scanning and sharper target acquisition.",
  "genre": [
    "Action",
    "Vision Training",
    "Esports Training"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are saccadic eye exercises?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic eye exercises are structured visual training drills designed to strengthen the speed, accuracy, and latency of rapid ocular jumps (saccades) between spatial fixations across the visual field."
      }
    },
    {
      "@type": "Question",
      "name": "What is a saccade in human vision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A saccade is a fast, simultaneous movement of both eyes between two or more phases of fixation in the same direction. Peak saccadic angular velocity reaches 200–700 deg/sec, making it one of the fastest biological movements (Rayner, 1998)."
      }
    },
    {
      "@type": "Question",
      "name": "What are express saccades (Fischer & Boch, 1984)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Express saccades are extremely short-latency ocular movements (~100–120 ms) triggered by subcortical superior colliculus pathways when fixation gap conditions reduce cognitive inhibition."
      }
    },
    {
      "@type": "Question",
      "name": "How does saccadic training benefit competitive gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In FPS and tactical shooters, faster saccades allow players to scan corners, read minimap updates, and acquire sudden enemy targets with minimal visual suppression latency."
      }
    },
    {
      "@type": "Question",
      "name": "What is saccadic suppression?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic suppression is the neurological phenomenon where the brain temporarily suspends visual processing during a saccade (~20–40 ms) so that you do not experience motion blur during rapid eye jumps."
      }
    },
    {
      "@type": "Question",
      "name": "What is saccadic dysmetria?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic dysmetria occurs when the eyes either undershoot (hypometria) or overshoot (hypermetria) a visual target, requiring corrective secondary micro-saccades to achieve clear foveal focus."
      }
    },
    {
      "@type": "Question",
      "name": "How does monitor refresh rate affect saccade measurement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 144Hz or 240Hz monitor displays targets with under 4–7 ms of frame latency (Woods et al., 2015), allowing the ocular motor system to perceive target emergence earlier."
      }
    },
    {
      "@type": "Question",
      "name": "Can saccadic training improve reading and cognitive focus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, efficient saccadic control ensures smooth line-to-line eye transitions and reduces fixation regressions during high-speed text processing and tactical reading."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I do saccadic eye exercises?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A daily 5-to-10 minute session is ideal. Overworking ocular muscles can lead to eye strain and asthenopia, so brief, high-intensity sets are recommended."
      }
    },
    {
      "@type": "Question",
      "name": "Is this tool free and browser-based?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SkillDrills Saccadic Gallery is 100% free with no plugins, downloads, or sign-ups required."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Saccadic Gallery",
  "description": "Free saccadic eye exercises online. Train rapid eye jumps between fixed targets to build faster visual scanning and sharper target acquisition.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Calibrate Display and Center Fixation",
      "text": "Align your seating position so your eyes are level with the center of the display (50–70 cm distance) and focus on the central cue.",
      "url": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Perceive Peripheral Target Flash",
      "text": "Keep primary attention alert for high-contrast targets flashing across the peripheral gallery grid.",
      "url": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execute Ballistic Eye Jump (Saccade)",
      "text": "Snap your visual axis directly onto the target coordinates without turning your head or lagging behind.",
      "url": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Verify Foveal Lock and Confirm Hit",
      "text": "Achieve crisp central foveal lock on the target center and register the confirmation click.",
      "url": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('rayner1998', 'fischer1984', 'leigh2015', 'woods2015'),
  intro: {
    title: "Saccadic Eye Exercises",
    paragraphs: [
      "Free saccadic eye exercises online. Train rapid eye jumps between fixed targets to build faster visual scanning and sharper target acquisition.",
      "A saccade is a fast, simultaneous movement of both eyes between two or more phases of fixation in the same direction. Peak saccadic angular velocity reaches 200–700 deg/sec, making it one of the fastest biological movements (Rayner, 1998).",
      "Express saccades are extremely short-latency ocular movements (~100–120 ms) triggered by subcortical superior colliculus pathways when fixation gap conditions reduce cognitive inhibition.",
    ],
  },
  benchmarks: {
    title: 'Standardized Performance Benchmarks',
    headers: ['Tier', 'Rank', 'Rating', 'Accuracy', 'Percentile'],
    rows: [
      { tier: 'Tier 1', rank: 'Grandmaster / Pro', stat: 'Top 1%', level: 'Elite', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Master', stat: 'Top 5%', level: 'Diamond', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Pro', stat: 'Top 15%', level: 'Platinum', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Intermediate', stat: 'Top 50%', level: 'Gold', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Novice', stat: 'Base', level: 'Silver', accuracy: '<78%', percentile: 'Novice' },
    ],
  },
  protocols: {
    title: 'Core Performance Training Protocols',
    description: 'Evidence-based cognitive and neuromuscular enhancement routines.',
    items: [
      { title: "Calibrate Display and Center Fixation", description: "Align your seating position so your eyes are level with the center of the display (50–70 cm distance) and focus on the central cue." },
      { title: "Perceive Peripheral Target Flash", description: "Keep primary attention alert for high-contrast targets flashing across the peripheral gallery grid." },
      { title: "Execute Ballistic Eye Jump (Saccade)", description: "Snap your visual axis directly onto the target coordinates without turning your head or lagging behind." },
      { title: "Verify Foveal Lock and Confirm Hit", description: "Achieve crisp central foveal lock on the target center and register the confirmation click." },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function EnhancedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
      <SaccadicGalleryWrapper copy={{ title: "Saccadic Eye Exercises" }} />
      <DrillGuide {...guideProps} />
    </>
  );
}
