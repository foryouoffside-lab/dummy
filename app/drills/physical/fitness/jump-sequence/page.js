import JumpSequenceClient from './JumpSequenceClient';

// ============================================================
// SEO RESEARCH FINDINGS — jump-sequence
// PRIMARY: "reaction time training"   ~22,200/mo, KD ~28%
//          "reaction training game"    ~3,600/mo,  KD ~30%
// SECONDARY / LSI:
//   "reaction time drill"              ~880/mo,    KD ~20%
//   "trajectory control game"          ~110/mo,    KD ~12%
//   "precision jumping game"           ~90/mo,     KD ~9%
// PAA targets: "What is this reaction time training drill?", "How do charge-and-launch mechanics work?",
//   "What skills does this reaction time training improve?", "Do I need to sign up?",
//   "Why does my score go down?"
// ============================================================

export const metadata = {
  title: 'Reaction Time Training - Free Jump Sequence Precision Drill',
  description: 'Free reaction time training game. Charge, launch and steer mid-air to land on moving targets - trains trajectory control and reaction timing.',
  keywords: [
    // Primary / Head terms
    'reaction time training', 'reaction training game',
    // Secondary / LSI terms
    'reaction time drill', 'trajectory control game', 'precision jumping game',
    'mid air steering game', 'aim training reaction', 'timing accuracy training',
    // Long-tail variants
    'free online reaction time training', 'charge and launch accuracy drill browser',
    'improve trajectory control reaction time', 'esports reaction training game online'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/fitness/jump-sequence',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Reaction Time Training - Free Jump Sequence Precision Drill | SkillDrills',
    description: 'Free reaction time training game. Charge, launch and steer mid-air to land on moving targets - trains trajectory control and reaction timing.',
    url: 'https://skilldrills.online/drills/physical/fitness/jump-sequence',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Reaction Time Training - Jump Sequence Precision Drill | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Time Training - Free Jump Sequence Precision Drill | SkillDrills',
    description: 'Free reaction time training and trajectory control drill. Best reaction training game for gamers and athletes. No sign-up.',
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
    { "@type": "ListItem", "position": 3, "name": "Fitness", "item": "https://skilldrills.online/drills/physical/fitness" },
    { "@type": "ListItem", "position": 4, "name": "Reaction Time Training (Jump Sequence)", "item": "https://skilldrills.online/drills/physical/fitness/jump-sequence" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reaction Time Training - Jump Sequence Precision Drill | SkillDrills",
  "url": "https://skilldrills.online/drills/physical/fitness/jump-sequence",
  "description": "Free reaction time training and trajectory control drill. Charge-and-launch mechanic with mid-air mouse steering. Land on green targets for points. Combo streaks every 5 hits. Best reaction training drill for gamers and athletes.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reaction Time, Trajectory Control, Precision Jumping, Mid-Air Mouse Steering, Dynamic Target Interception"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Jump Sequence Pro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jump Sequence Pro is a physical fitness & motor control drill that trains trajectory calculation, charge timing, and mid-air steering. Players charge jump velocity and steer their airborne character to intercept dynamic moving targets."
      }
    },
    {
      "@type": "Question",
      "name": "How do jump controls work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hover your crosshair over your player circle at the bottom floor, hold mouse click to charge jump power, and release to launch into the air. While airborne, move your mouse left or right to steer."
      }
    },
    {
      "@type": "Question",
      "name": "Does this drill improve gaming performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Steering in mid-air and timing jump releases trains the neuromuscular coordination required for movement shooter mechanics, rocket jumping, and dynamic aerial tracking in games like Apex Legends and Overwatch."
      }
    },
    {
      "@type": "Question",
      "name": "How does difficulty scaling work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As you score points, your level rises up to Level 15. Target movement speed accelerates up to 900+ px/s, target radius shrinks from 35px down to 12px, and target trajectory turns erratically."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score in Jump Sequence Pro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Scoring 8,000+ points earns a Gold or Platinum grade, while reaching 17,000+ points with high trajectory accuracy places you in the Master tier."
      }
    }
  ]
};

export default function JumpSequencePage() {
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
      <JumpSequenceClient />
    </>
  );
}