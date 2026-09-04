import SaccadicGalleryWrapper from './SaccadicGalleryWrapper';

// ============================================================
// SEO RESEARCH FINDINGS — saccadic-gallery
// PRIMARY: "saccadic eye exercises" ~480/mo US, KD ~25% (Low-Medium)
//          "eye tracking training" ~250/mo US, KD ~18% (Low)
// SECONDARY / LSI:
//   "visual tracking exercises"       ~1,300/mo, KD ~30%
//   "saccadic eye movement training"  ~250/mo,   KD ~22%
//   "saccadic training online"        ~110/mo,   KD ~9%
// ============================================================

export const metadata = {
  title: 'Saccadic Gallery - Online Saccadic Eye Exercises',
  description: 'Free saccadic eye exercises online. Train rapid eye jumps between fixed targets to build faster visual scanning and sharper target acquisition.',
  keywords: [
    'saccadic eye exercises', 'eye tracking training', 'saccadic gallery',
    'visual tracking exercises', 'saccadic eye movement training', 'esports vision training',
    'saccadic training online', 'saccadic tracking exercises', 'ocular coordination training',
    'how to improve saccadic eye movement', 'vision therapy exercises online',
    'zig zag eye tracking test', 'ballistic eye sweeps trainer',
    'free eye exercises game', 'sports vision drills free', 'cognitive eye warmup'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/saccadic-gallery',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Saccadic Gallery - Online Saccadic Eye Exercises',
    description: 'Practice saccadic eye exercises online with the free Saccadic Gallery training drill. Improve your eye tracking, visual processing speed, and ballistic eye sweeps.',
    url: 'https://skilldrills.online/drills/reaction-speed/saccadic-gallery',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saccadic Gallery - Online Saccadic Eye Exercises',
    description: 'Track glowing targets flashing in a zig-zag gallery pattern. Free browser-based saccadic eye trainer with no downloads.',
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Drills Hub", "item": "https://skilldrills.online/drills" },
    { "@type": "ListItem", "position": 3, "name": "Reaction Speed", "item": "https://skilldrills.online/drills/reaction-speed" },
    { "@type": "ListItem", "position": 4, "name": "Saccadic Gallery", "item": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Saccadic Gallery — Online Saccadic Eye Exercises | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery",
  "description": "Sequence-based ballistic eye shifts. Track glowing targets flashing in a zig-zag gallery pattern to improve foveal sweep speed and eye movement agility.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Saccadic Eye Exercises, Visual Scanning, Ballistic Eye Sweeps, Eye Tracking Accuracy, Focus Speed"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Perform Saccadic Eye Exercises with Saccadic Gallery",
  "description": "Improve your foveal scanning and ballistic eye movements against glowing target sequence patterns.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Configure and Begin",
      "text": "Press Start Drill to launch Saccadic Gallery in full screen mode."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track Target Sequence",
      "text": "Focus your eyes on the sequence of targets as they light up in a gallery layout across the viewport."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Sweep Eyes Ballistically",
      "text": "Shift your focus quickly from one target to the next. Keep your head still; let your eye muscles execute the sweep."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Tap to Eliminate",
      "text": "Click or tap active targets as fast as possible to verify focus lock and keep your accuracy climbing."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between saccadic and smooth pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic movements are rapid jumps between targets, whereas smooth pursuit involves smoothly tracking a moving object across space."
      }
    },
    {
      "@type": "Question",
      "name": "Should I move my head or only my eyes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Keep your head still and move only your eyes. Moving only your eyes conditions true saccadic agility and faster neural processing."
      }
    },
    {
      "@type": "Question",
      "name": "What is saccadic latency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic latency is the time delay (typically 150-200ms) between the appearance of a visual target and the initiation of an eye jump."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score on Saccadic Gallery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score above 5,000 indicates strong ocular reflexes, while scores exceeding 10,000 represent elite saccadic eye speed."
      }
    }
  ]
};

export default function SaccadicGalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SaccadicGalleryWrapper />
    </>
  );
}
