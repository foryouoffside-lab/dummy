import ReflexTrainingDrillWrapper from './ReflexTrainingDrillWrapper';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — reflex-training-drill
// PRIMARY: "reflex training drill" — high-intent search, low KD
//          "target acquisition trainer" — exact mechanical concept match
// SECONDARY / LSI:
//   "reflex training game"            ~880/mo,   KD ~30%
//   "reflex game online"              ~1,000/mo, KD ~25%
//   "hand eye coordination gaming"    ~590/mo,   KD ~18%
//   "aim reflex trainer"              ~150/mo,   KD ~10%
// ============================================================

export const metadata = {
  title: 'Reflex Training Drill - Multi-Target Burst Reflex Game',
  description: 'Free reflex training drill online. React to multi-target bursts, sharpen divided attention and click response speed, and track your accuracy per round.',
  keywords: [
    'reflex training drill', 'multi target reflex trainer', 'aim reflex trainer',
    'reflex training game', 'reflex game online', 'hand eye coordination gaming',
    'fast reflex training', 'divided attention training', 'esports reaction training',
    'how to improve divided attention gaming', 'online reflex games free',
    'multi target acquisition trainer', 'burst reflex game',
    'free aim trainer browser', 'gaming hand eye coordination test', 'low latency reaction tool'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/reflex-training-drill',
    languages: getAlternateLanguages('/drills/reaction-speed/reflex-training-drill'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Reflex Training Drill - Multi-Target Burst Reflex Game | SkillDrills',
    description: 'Improve your divided attention and click response with this free Reflex Training Drill. Multiple targets flash on screen at once — clear the whole burst before time runs out.',
    url: 'https://skilldrills.online/drills/reaction-speed/reflex-training-drill',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reflex Training Drill - Multi-Target Burst Reflex Game',
    description: 'Improve your divided attention and click response. Free browser-based multi-target burst reflex drill with no downloads.',
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
    { "@type": "ListItem", "position": 4, "name": "Reflex Training Drill", "item": "https://skilldrills.online/drills/reaction-speed/reflex-training-drill" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reflex Training Drill — Multi-Target Burst Reflex Game | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/reflex-training-drill",
  "description": "Train reaction speed, divided attention, and simultaneous multi-target acquisition. A free device-adaptive burst reflex simulator for mobile, tablet, and desktop.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reflex Training, Divided Attention, Multi-Target Acquisition, Hand-Eye Coordination, Reflex Response"
};

const educationalSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  "name": "Reflex Training Drill (Multi-Target Burst Trainer)",
  "description": "Isolates and trains simultaneous multi-target acquisition, divided attention, motor reaction speed, and hand-eye alignment.",
  "applicationCategory": "EducationalGame",
  "operatingSystem": "Web Browser"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Multi-Target Burst & Divided Attention Reflexes",
  "description": "Step-by-step instructions on improving your simultaneous target acquisition and click response speed.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Launch the Drill",
      "text": "Press Start Drill to initialize the Reflex Training Drill in full screen."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Scan the Burst",
      "text": "Keep your eyes alert to every target flashing on screen at once — watch each one's countdown ring."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "React and Click",
      "text": "Click or tap each target's center before its individual timeout expires, prioritizing whichever is closest to disappearing."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Climb the Levels",
      "text": "Maintain high accuracy and consecutive hits to level up and face larger simultaneous target bursts."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can you train divided attention and multi-target reflexes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Repeated exposure to simultaneous stimuli strengthens parallel visual processing and reduces the tunnel-vision effect of fixating on one target."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill differ from single-target reaction tests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Single-target tests present one stimulus at a time. This drill spawns 2 to 5 targets simultaneously, so you must scan and clear a full burst under a shared time limit."
      }
    },
    {
      "@type": "Question",
      "name": "Which target should I clear first in a burst?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Watch the depleting countdown ring around each target and prioritize whichever is closest to timing out, not just the nearest one to your cursor."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score on this drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score above 5,000 indicates strong divided-attention reflexes, while scores exceeding 10,000 represent elite multi-target acquisition speed."
      }
    }
  ]
};

export default function ReflexTrainingDrillPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ReflexTrainingDrillWrapper />
    </>
  );
}
