import ReactionChainClient from './ReactionChainClient';

// ============================================================
// SEO RESEARCH FINDINGS — reaction-chain
// PRIMARY: "reaction chain trainer"   ~110/mo, KD ~15%
//          "impulse arrest reflex game" ~90/mo,  KD ~8%
// SECONDARY / LSI:
//   "reaction time training"          ~22,200/mo, KD ~28%
//   "reflex training drill"           ~880/mo,    KD ~20%
//   "mouse precision test"            ~4,400/mo,  KD ~35%
// PAA targets: "What is the Reaction Chain drill?", "How do impulse arrest mechanics work?",
//   "What skills does this reflex drill improve?", "Does this game help with Valorant or CS2 aim?",
//   "Is this reflex game free to play?"
// ============================================================

export const metadata = {
  title: 'Reaction Chain - Impulse Arrest Reflex Training Game | SkillDrills',
  description: 'Train your reaction speed, precision stopping, and motor inhibition. Intercept and arrest cursor momentum on targets in this free reflex training game.',
  keywords: [
    // Primary / Head terms
    'reaction chain trainer', 'impulse arrest reflex game',
    // Secondary / LSI terms
    'reaction time training', 'reflex training drill', 'mouse precision test',
    'cursor brake control game', 'hand eye coordination game', 'motor inhibition drill',
    // Long-tail variants
    'free online browser reflex game', 'improve mouse deceleration gaming',
    'kinetic brake control training browser', 'esports impulse arrest target practice'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/reflex-training/reaction-chain',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Reaction Chain - Impulse Arrest Reflex Training Game | SkillDrills',
    description: 'Train your reaction speed, precision stopping, and motor inhibition. Intercept and arrest cursor momentum on targets in this free reflex training game.',
    url: 'https://skilldrills.online/drills/physical/reflex-training/reaction-chain',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Reaction Chain - Impulse Arrest Reflex Training Game | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Chain - Impulse Arrest Reflex Training Game | SkillDrills',
    description: 'Train reaction speed and precision deceleration. Defend nodes with raw mouse brake control. No sign-up.',
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
    { "@type": "ListItem", "position": 4, "name": "Reaction Chain (Impulse Arrest)", "item": "https://skilldrills.online/drills/physical/reflex-training/reaction-chain" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reaction Chain - Impulse Arrest Reflex Training Game | SkillDrills",
  "url": "https://skilldrills.online/drills/physical/reflex-training/reaction-chain",
  "description": "Free browser reaction chain game and impulse arrest trainer. Intercept incoming nodes and halt cursor momentum completely. Features adaptive levels, speed radar, and precise motor diagnostics.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reaction Speed, Motor Inhibition, Kinetic Braking, Cursor Deceleration, Target Interception"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Reaction Chain drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An elite reflex training game focusing on mouse precision and impulse arrest. Instead of clicking targets, you must steer your cursor over them and stop completely to 'arrest' them."
      }
    },
    {
      "@type": "Question",
      "name": "How do impulse arrest mechanics work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When your crosshair is over a target, your mouse velocity must be under 1.5 pixels/frame ('ARREST READY' turns green). Stopping successfully scores +5 PTS. If you slice through it while moving, it triggers a time penalty."
      }
    },
    {
      "@type": "Question",
      "name": "What skills does this reflex drill improve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It trains kinetic brake control, hand-eye coordination, motor inhibition (stopping on a dime), and prevents over-flicking or spastic aiming in high-speed gaming."
      }
    },
    {
      "@type": "Question",
      "name": "Why does my clock drain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike standard aim trainers, this drill actively punishes bad accuracy and kinetic overflow. Missing a target or slicing through it without stopping deducts 3 seconds from your master survival clock."
      }
    },
    {
      "@type": "Question",
      "name": "Why are the targets changing colors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As you hit targets and build your level, the engine's speed radar accelerates node velocity from 600px/s up to 1800px/s. Node colors shift from Green &rarr; Orange &rarr; Red to visually warn you of the intense speed."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a combo streak system?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Catches are chained together. Every 5 consecutive arrests trigger a streak sound, and every 10 arrests increase the adaptive difficulty and speed multipliers."
      }
    },
    {
      "@type": "Question",
      "name": "Does this game help with Valorant or CS2 aim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, it directly trains snap deceleration. In tactical shooters, you must stop moving your mouse and character to achieve perfect first-shot accuracy. This drill builds that muscle memory."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score in the Reaction Chain drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score of 150+ points is Gold tier. Hitting 400+ points requires elite kinetic braking and perfect timing, placing you in the Master tier."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to sign up for this mouse precision test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No registration required. This free mouse precision and reflex game works instantly in your browser — no downloads needed."
      }
    },
    {
      "@type": "Question",
      "name": "Is this reflex game free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the Reaction Chain drill on SkillDrills is 100% free, ad-free, and runs entirely in your web browser."
      }
    }
  ]
};

export default function ReactionChainPage() {
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
      <ReactionChainClient />
    </>
  );
}