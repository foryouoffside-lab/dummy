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
      "name": "What is this reaction time training drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A free reaction time training and trajectory control game. Click-hold to charge, release to launch, steer mid-air with mouse. Land on green targets for points. Combo streaks every 5 hits in this 60-second reaction training challenge."
      }
    },
    {
      "@type": "Question",
      "name": "How do charge-and-launch mechanics work in this reaction training game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hold mouse on the ball to charge (cyan progress bar). Longer hold = higher jump. Release to launch. Move mouse mid-air to steer left or right and land on the target. Reaction time and precision both matter."
      }
    },
    {
      "@type": "Question",
      "name": "What skills does this reaction time training improve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reaction time, trajectory control, mouse precision, hand-eye coordination, timing accuracy, and quick decision-making for projectile aim — all critical skills in FPS games like Valorant, CS2, and Apex Legends."
      }
    },
    {
      "@type": "Question",
      "name": "Why does my score go down?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike standard aim trainers, this drill actively punishes bad accuracy. Missing a jump or hitting bounds triggers a penalty, draining your points and your master clock. You must rely on precision trajectories over spastic launching."
      }
    },
    {
      "@type": "Question",
      "name": "Why is the target shrinking and moving?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This is the engine's adaptive difficulty at work. As you successfully hit the target and build your streak, the target shrinks from a forgiving 35px down to a tiny 12px, and its random bouncing velocity increases."
      }
    },
    {
      "@type": "Question",
      "name": "How does mid-air steering affect trajectory control?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Once launched, moving your mouse left or right applies a gentle thrust, letting you adjust your trajectory in mid-air to align with moving targets."
      }
    },
    {
      "@type": "Question",
      "name": "Does this game help with projectile aim in FPS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, it trains you to estimate gravity curves, velocity, and timing, which are directly applicable to throwables like grenades, mollies, and character abilities."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score in the Jump Sequence drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score of 150+ points is Gold tier. Hitting 400+ points requires extreme trajectory precision and metronomic timing, placing you in the Master tier."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to sign up for this reaction time training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No registration required. This free reaction time training game works instantly in your browser — no downloads needed."
      }
    },
    {
      "@type": "Question",
      "name": "Is this physics skill game free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the Jump Sequence drill on SkillDrills is 100% free, ad-free, and runs entirely in your web browser."
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