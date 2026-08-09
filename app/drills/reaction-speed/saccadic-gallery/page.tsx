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
  title: 'Saccadic Gallery - Online Saccadic Eye Exercises | SkillDrills',
  description: 'Practice saccadic eye exercises online with the free Saccadic Gallery training drill. Improve your eye tracking, visual processing speed, and ballistic eye sweeps. Free, mobile-friendly, and no download needed.',
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
    title: 'Saccadic Gallery - Online Saccadic Eye Exercises | SkillDrills',
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
      "name": "What are saccadic eye exercises?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic eye exercises train fast voluntary eye movements between visual targets, improving reading speed, vision therapy, and sports tracking."
      }
    },
    {
      "@type": "Question",
      "name": "What is a saccade in vision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A saccade is a quick, simultaneous movement of both eyes between phases of fixation. It is the fastest movement the human body can perform."
      }
    },
    {
      "@type": "Question",
      "name": "How does saccadic training help in FPS gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In games like CS2, Valorant, and Overwatch, targets spawn in different areas of your screen. Fast saccadic eye movements let you acquire enemies instantly."
      }
    },
    {
      "@type": "Question",
      "name": "Can you train saccadic eye movements online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Dedicated online vision utilities condition visual search speed, reducing saccadic latency and improving click synchronization."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect saccadic training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. High refresh rates (144Hz+) provide smoother target transitions during rapid eye sweeps, reducing visual motion blur."
      }
    },
    {
      "@type": "Question",
      "name": "Is Saccadic Gallery free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all drills on SkillDrills are 100% free with no signups, downloads, or pop-up ads required."
      }
    },
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
      "name": "How does level progression work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every 250 points earned levels up the drill, shortening target TTL and shrinking target radius to challenge your foveal accuracy."
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
        "text": "Yes. Sports vision specialists use saccadic eye drills to improve peripheral awareness and reaction speed in tennis, baseball, and martial arts."
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
      "name": "How often should I practice saccadic eye exercises?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A daily 5-minute session keeps ocular muscles agile, reduces visual fatigue, and sharpens visual scanning reflexes."
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
