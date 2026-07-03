import DropCatchClient from './DropCatchClient';

// ============================================================
// SEO RESEARCH FINDINGS — drop-catch
// PRIMARY: "reflex test online"      ~2,900/mo, KD ~32%
//          "reflex training game"     ~210/mo,   KD ~18%
// SECONDARY / LSI:
//   "reaction speed game"             ~1,300/mo, KD ~26%
//   "reaction time drill"             ~880/mo,   KD ~20%
//   "hand eye coordination training"  ~140/mo,   KD ~10%
// PAA targets: "What is a reflex test?", "How does target recognition improve gaming?",
//   "Why are there red decoy balls?", "How does the adaptive difficulty work?",
//   "Is this reflex game free to play?"
// ============================================================

export const metadata = {
  title: 'Free Reflex Test Online - Drop Catch Reaction Speed Game | SkillDrills',
  description: 'Free reflex test online. Catch falling green targets and avoid red decoys — the best reflex training game for reaction speed and visual discrimination.',
  keywords: [
    // Primary / Head terms
    'reflex test online', 'reflex training game',
    // Secondary / LSI terms
    'reaction speed game', 'reaction time drill', 'hand eye coordination training',
    'free reflex test online', 'visual reflex test', 'visual discrimination training',
    // Long-tail variants
    'free online visual reflex test', 'improve clicking reflex speed gaming',
    'impulse control target recognition game', 'esports vertical reflex acquisition drill'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/reflex-training/drop-catch',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Free Reflex Test Online - Drop Catch Reaction Speed Game | SkillDrills',
    description: 'Free reflex test online. Catch falling green targets and avoid red decoys — the best reflex training game for reaction speed and visual discrimination.',
    url: 'https://skilldrills.online/drills/physical/reflex-training/drop-catch',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Free Reflex Test Online - Drop Catch Reaction Speed Game | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Reflex Test Online - Drop Catch Reaction Speed Game | SkillDrills',
    description: 'Free reflex test online. Catch green balls, avoid red decoys. Best adaptive reflex training game. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
    { "@type": "ListItem", "position": 3, "name": "Reflex Training", "item": "https://skilldrills.online/drills/physical/reflex-training" },
    { "@type": "ListItem", "position": 4, "name": "Reflex Test Online (Drop Catch)", "item": "https://skilldrills.online/drills/physical/reflex-training/drop-catch" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Free Reflex Test Online - Drop Catch Reaction Speed Game | SkillDrills",
  "url": "https://skilldrills.online/drills/physical/reflex-training/drop-catch",
  "description": "Free reflex test online and reflex training game. Catch falling green balls (+1pt), avoid red decoy balls marked X. Adaptive speed 400-800px/s. 3 lives, streak bonuses. Best free online reflex test available.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reaction Speed, Reflex Evasion, Target Discrimination, Visual Filtering, Neuromuscular Coordination"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a reflex test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A reflex test measures the speed and accuracy of your neuromuscular response to sudden visual stimuli. This specific test also measures target discrimination by forcing you to filter out decoy targets."
      }
    },
    {
      "@type": "Question",
      "name": "How does target recognition improve gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In competitive FPS games like Valorant or CS2, you must rapidly distinguish between enemies, teammates, and utility (like flashes). Target recognition training reduces false-positives (team damage or panic firing) and improves time-to-kill."
      }
    },
    {
      "@type": "Question",
      "name": "Why are there red decoy balls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The red decoys test your impulse control. Pure reaction speed is useless if you shoot the wrong target. The decoys force your brain to cognitively process the target's validity before executing the motor command."
      }
    },
    {
      "@type": "Question",
      "name": "How does the adaptive difficulty work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every 100 points you score triggers a Level Up. The engine automatically accelerates the falling velocity, shrinks the target radiuses, increases the spawn rate, and raises the probability of red decoys appearing."
      }
    },
    {
      "@type": "Question",
      "name": "Why does my timer drop so fast?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike standard aim trainers, this drill actively punishes bad accuracy and target mismanagement. Missing a green target subtracts -2.0s, and hitting a red decoy violently drains -4.0s from your clock. There are NO point deductions."
      }
    },
    {
      "@type": "Question",
      "name": "How does the survival clock work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You begin with a strict 60 seconds. Valid catches grant +1 second (capped at 120s max). The game ends when the clock hits zero, forcing you to maintain high accuracy and speed to survive."
      }
    },
    {
      "@type": "Question",
      "name": "What is impulse control training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Impulse control training conditions your brain to suppress an automatic physical reaction (clicking) until your visual cortex verifies the stimulus is correct (green vs red)."
      }
    },
    {
      "@type": "Question",
      "name": "Is this reflex game free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! The SkillDrills Reflex Test is entirely free, open-source, and runs purely in your web browser with zero downloads required."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score for the Reflex Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score of 800+ is Gold tier. 3000+ indicates Diamond-level discrimination speed, and 5000+ with 90% accuracy places you in the Master tier."
      }
    },
    {
      "@type": "Question",
      "name": "How long should I practice reflex training daily?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For optimal cognitive adaptation and motor learning, practicing this drill for 5 to 10 minutes a day is more effective than occasional hour-long sessions."
      }
    }
  ]
};

export default function DropCatchPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DropCatchClient />
    </>
  );
}