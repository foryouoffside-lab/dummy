import VisualRhythmInterceptClient from './VisualRhythmInterceptClient';

// ============================================================
// SEO RESEARCH FINDINGS — visual-rhythm-intercept
// PRIMARY: "visual rhythm intercept"   ~110/mo, KD ~12%
//          "reflex rhythm game"        ~210/mo,  KD ~15%
// SECONDARY / LSI:
//   "timing reflex trainer"            ~320/mo,  KD ~18%
//   "hand eye timing"                  ~140/mo,  KD ~10%
//   "rhythm coordination online"       ~90/mo,   KD ~8%
// PAA targets: "What is the Visual Rhythm Intercept drill?", "What are the score and time adjustments?",
//   "What skills are trained by this rhythmic reflex game?", "Can I use mobile touch controls?",
//   "Is this visual action game free?"
// ============================================================

export const metadata = {
  title: 'Visual Rhythm Intercept - Reflex Training Drill | SkillDrills',
  description: 'Train visual rhythm, reflex interception, and timing accuracy with the Rhythm Intercept game. Press corresponding keys or tap sectors as orbital threats align. Play free online.',
  keywords: [
    // Primary / Head terms
    'visual rhythm intercept', 'reflex rhythm game',
    // Secondary / LSI terms
    'timing reflex trainer', 'hand eye timing', 'rhythm coordination online',
    'pro timing drill', 'esports rhythm game', 'keyboard rhythm trainer',
    // Long-tail variants
    'free online rhythmic reflex test', 'improve visual timing accuracy gaming',
    'orbital target intercept trainer browser', 'keyboard layout reflexes training'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/reflex-training/visual-rhythm-intercept',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Visual Rhythm Intercept - Reflex Training Drill | SkillDrills',
    description: 'Intercept orbital timing pulses in alignment with four quadrant targets. Build rhythm reflexes. Play free online.',
    url: 'https://skilldrills.online/drills/physical/reflex-training/visual-rhythm-intercept',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Visual Rhythm Intercept - Reflex Training Drill | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Rhythm Intercept - Reflex Training Drill | SkillDrills',
    description: 'Intercept orbital timing pulses in alignment with four quadrant targets. Play free online.',
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
    { "@type": "ListItem", "position": 4, "name": "Visual Rhythm Intercept", "item": "https://skilldrills.online/drills/physical/reflex-training/visual-rhythm-intercept" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Visual Rhythm Intercept - Reflex Training Drill | SkillDrills",
  "url": "https://skilldrills.online/drills/physical/reflex-training/visual-rhythm-intercept",
  "description": "A timing and rhythm-based reflex trainer. Align user actions with incoming orbital waves. Hitting perfect beats adds time; missing deducts time.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reaction Speed, Visual Timing, Rhythmic Interception, Spatial Prediction, Hand-Eye Coordination"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Visual Rhythm Intercept drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A timing and rhythm-based reflex trainer. Align keyboard actions (W/A/S/D or arrow keys) or tap sectors with incoming orbital pulses. Intercepting pulses at perfect overlap rewards you with score bonuses and time extensions."
      }
    },
    {
      "@type": "Question",
      "name": "What are the score and time adjustments in Rhythm Intercept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Perfect intercept adds +30 * Level PTS and +1.5s time; Good intercept adds +15 * Level PTS and +0.8s time; any missed timing or misclick triggers a -2.0s penalty."
      }
    },
    {
      "@type": "Question",
      "name": "What skills are trained by this rhythmic reflex game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It trains precise timing, rhythmic visual prediction, high-frequency tactile response coordination, multi-quadrant scanning, and stress stabilization under tempo scaling."
      }
    },
    {
      "@type": "Question",
      "name": "Why does my survival clock drain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To punish button-mashing and mistiming. Failing to press a key when a pulse overlaps the guide, or pressing the wrong lane key, deducts 2 seconds from your survival clock."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use mobile touch controls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! You can tap directly on the Top, Right, Bottom, or Left quadrants on the screen. The game automatically adapts to touch gestures and registers quadrant overlaps."
      }
    },
    {
      "@type": "Question",
      "name": "How do levels change the game speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every 250 points, the engine levels up. Higher levels reduce the pulse spawn interval (from 1.6s down to 0.7s) and accelerate pulse speeds, putting your temporal reflexes to the ultimate test."
      }
    },
    {
      "@type": "Question",
      "name": "Does this game help with esports and FPS gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Peak player performance relies on rhythmic timing consistency and spatial coordinate prediction. Synchronizing your physical inputs with rapidly shifting visual cues translates to better weapon shooting cadence and fluid movement."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score in Rhythm Intercept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score of 400+ points is Gold tier. Hitting 1200+ points requires flawless timing at high levels, placing you in the Master tier."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need any special hardware or downloads for this game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. This game works directly inside standard desktop and mobile browsers, requiring no registration, configuration, or software downloads."
      }
    },
    {
      "@type": "Question",
      "name": "Is this visual action game free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the Visual Rhythm Intercept drill on SkillDrills is 100% free, ad-free, and runs entirely in your web browser."
      }
    }
  ]
};

export default function VisualRhythmInterceptPage() {
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
      <VisualRhythmInterceptClient />
    </>
  );
}

