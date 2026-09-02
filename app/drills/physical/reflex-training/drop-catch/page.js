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
  title: 'Reflex Drop Catch — Free Reflex Test Online & Game',
  description: 'Free reflex test online. Catch falling green targets and avoid red decoys in this reflex training game for reaction speed and visual discrimination.',
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
    title: 'Reflex Drop Catch — Free Reflex Test Online & Game',
    description: 'Free reflex test online. Catch falling green targets and avoid red decoys in this reflex training game for reaction speed and visual discrimination.',
    url: 'https://skilldrills.online/drills/physical/reflex-training/drop-catch',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reflex Drop Catch — Free Reflex Test Online & Game',
    description: 'Free reflex test online. Catch falling green targets and avoid red decoys in this reflex training game for reaction speed and visual discrimination.',
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
    { "@type": "ListItem", "position": 4, "name": "Reflex Drop Catch", "item": "https://skilldrills.online/drills/physical/reflex-training/drop-catch" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Reflex Drop Catch — Free Reflex Test Online & Game",
  "url": "https://skilldrills.online/drills/physical/reflex-training/drop-catch",
  "description": "Free reflex test online and reflex training game. Catch falling green balls (+100pt), avoid red decoy balls marked X.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reaction Speed, Reflex Evasion, Target Discrimination, Visual Filtering, Neuromuscular Coordination"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Reflex Drop Catch — Free Reflex Test Online & Game",
  "url": "https://skilldrills.online/drills/physical/reflex-training/drop-catch",
  "description": "Free reflex test online. Catch falling green targets and avoid red decoys in this reflex training game for reaction speed and visual discrimination.",
  "genre": ["Reflex Training", "Esports", "Aim Trainer", "Reaction Speed"],
  "gamePlatform": "Web Browser",
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
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
        "text": "A reflex test measures the speed and accuracy of your neuromuscular response to sudden visual stimuli, filtering out decoy targets."
      }
    },
    {
      "@type": "Question",
      "name": "How does target recognition improve gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In competitive FPS games like Valorant or CS2, you must rapidly distinguish between enemies, teammates, and utility (like flashes)."
      }
    },
    {
      "@type": "Question",
      "name": "Why are there red decoy balls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The red decoys test your impulse control. Pure reaction speed is useless if you shoot the wrong target."
      }
    },
    {
      "@type": "Question",
      "name": "How does adaptive difficulty work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As your score increases, difficulty scales continuously. Falling velocity accelerates, radiuses shrink, and decoy probability increases."
      }
    },
    {
      "@type": "Question",
      "name": "What happens when I miss or hit a decoy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Missing a green target or clicking a red decoy resets your combo multiplier back to 1.0x and triggers a red flash overlay. Clean catches add +0.6s to your timer, and missing a target or hitting a decoy deducts 0.8s when time penalty is enabled in settings."
      }
    },
    {
      "@type": "Question",
      "name": "How long does each session run?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each session starts with a 45-second timer. Catching green targets earns +0.6s time extensions, allowing skilled players to extend runs dynamically as difficulty ramps up."
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
      "name": "How long should I practice reflex training daily?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For optimal cognitive adaptation and motor learning, practicing this drill for 5 to 10 minutes a day is more effective than occasional hour-long sessions."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Practice the Reflex Drop Catch Drill",
  "description": "Step-by-step instructions to train reaction speed and target discrimination using the SkillDrills Reflex Drop Catch trainer.",
  "step": [
    { "@type": "HowToStep", "name": "Watch the Drop Zone", "text": "Balls fall from the top of the screen at increasing speed as your level rises." },
    { "@type": "HowToStep", "name": "Identify the Color", "text": "Green balls are safe scoring targets; red balls marked with an X are decoys." },
    { "@type": "HowToStep", "name": "Catch Green, Avoid Red", "text": "Click green balls before they fall past to earn +0.6s time extensions, and never click a red decoy to keep your combo streak intact." }
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
      <DropCatchClient />
    </>
  );
}