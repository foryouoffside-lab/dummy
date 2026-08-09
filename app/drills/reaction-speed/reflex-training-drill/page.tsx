import ReflexTrainingDrillWrapper from './ReflexTrainingDrillWrapper';

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
  title: 'Reflex Training Drill - Multi-Target Burst Reflex Game | SkillDrills',
  description: 'Improve your divided attention and click response with this free Reflex Training Drill. Multiple targets flash on screen at once — clear the whole burst, calibrate your hand-eye coordination, and reduce your reaction latency online. Free, no download needed.',
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
      "name": "What is a reflex training drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is an interactive vision utility where several targets flash on screen at once and you must tap every one before it times out, measuring divided-attention reflex speed."
      }
    },
    {
      "@type": "Question",
      "name": "What is divided attention in gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Divided attention is the ability to process and react to multiple simultaneous stimuli instead of tracking a single target — critical when several enemies or events appear at once."
      }
    },
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
      "name": "Does monitor refresh rate affect burst reflex scores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Higher refresh rate monitors (144Hz, 240Hz, 360Hz) render each target's countdown ring more smoothly, helping you triage the burst with less input lag."
      }
    },
    {
      "@type": "Question",
      "name": "Is this reflex trainer free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all drills on SkillDrills are 100% free with no signups, downloads, or pop-up ads required."
      }
    },
    {
      "@type": "Question",
      "name": "What games benefit from multi-target burst training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fast arena shooters, battle royales (Apex Legends, Overwatch 2, Fortnite), and tactical shooters (Valorant, CS2) where multiple enemies can appear at once benefit heavily."
      }
    },
    {
      "@type": "Question",
      "name": "How does level progression work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every 250 points earned levels up the drill, adding more simultaneous burst targets (up to 5), shrinking their radius, and tightening each target's timeout."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I miss a click?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clicking empty background space triggers a red alert flash and a miss is logged against your accuracy — there's no score penalty, so keep going."
      }
    },
    {
      "@type": "Question",
      "name": "Can traditional athletes use this drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Sports vision research shows multi-object tracking and divided-attention drills enhance spatial awareness for tennis, hockey, and martial arts."
      }
    },
    {
      "@type": "Question",
      "name": "Does this drill support touchscreens and mobile devices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! It features generous touch hitpads and automatic orientation warnings for mobile devices."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I practice divided attention reflexes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A daily 5-10 minute session warms up your eye-hand coordination and maintains optimal visual alertness across multiple stimuli."
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
      "name": "Does mouse DPI affect burst reflex performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Using a comfortable mouse DPI (400-1600 DPI) ensures smooth, quick cursor jumps between the multiple targets in a burst."
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
