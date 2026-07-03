import SaccadicGalleryClient from './SaccadicGalleryClient';

// ============================================================
// SEO RESEARCH FINDINGS — saccadic-gallery
// PRIMARY: "saccadic eye exercises" ~480/mo US, KD ~25% (Low-Medium)
//          "eye tracking training" ~250/mo US, KD ~18% (Low)
// SECONDARY / LSI:
//   "visual tracking exercises"       ~1,300/mo, KD ~30%
//   "saccadic eye movement training"  ~250/mo,   KD ~22%
//   "saccadic training online"        ~110/mo,   KD ~9%
//   "esports vision training"         ~250/mo,   KD ~12%
//   "saccadic tracking exercises"     ~90/mo,    KD ~15%
// PAA targets: "What are saccadic eye exercises?", "Who needs saccadic eye exercises?",
//   "How do you improve saccadic eye movement?", "What is the difference between saccadic and smooth pursuit?"
// Key entities: ballistic eye sweeps, zig-zag pattern, visual processing speed,
//   foveal sweeps, ocular coordination, visual cortex, attention shifting
// ============================================================

export const metadata = {
  title: 'Saccadic Gallery - Online Saccadic Eye Exercises | SkillDrills',
  description: 'Practice saccadic eye exercises online with the free Saccadic Gallery training drill. Improve your eye tracking, visual processing speed, and ballistic eye sweeps. Free, mobile-friendly, and no download needed.',
  keywords: [
    // Primary / Head terms
    'saccadic eye exercises', 'eye tracking training', 'saccadic gallery',
    // Secondary / LSI terms
    'visual tracking exercises', 'saccadic eye movement training', 'esports vision training',
    'saccadic training online', 'saccadic tracking exercises', 'ocular coordination training',
    // Long-tail variants
    'how to improve saccadic eye movement', 'vision therapy exercises online',
    'zig zag eye tracking test', 'ballistic eye sweeps trainer',
    // General
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
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Saccadic Gallery - Online Saccadic Eye Exercises | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saccadic Gallery - Online Saccadic Eye Exercises',
    description: 'Track glowing targets flashing in a zig-zag gallery pattern. Free browser-based saccadic eye trainer with no downloads.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
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
      "text": "Open the Saccadic Gallery drill. Choose your target size, select color preset, and click Begin Drill."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track target sequence",
      "text": "Focus your eyes on the sequence of targets as they light up in a zig-zag gallery layout across the viewport."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Sweep eyes ballisticly",
      "text": "Shift your focus quickly from one target to the next. Avoid moving your head; let your eye muscles execute the sweep."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Tap to eliminate",
      "text": "Click or tap the active targets as fast as possible to verify focus lock and keep your survival timer alive."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Saccadic Gallery Drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic Gallery is a sequence-based reflex training game where you track targets flashing in a zig-zag gallery pattern. It trains ballistic eye shifts, focal re-acquisition speeds, and overall visual tracking."
      }
    },
    {
      "@type": "Question",
      "name": "What are saccadic eye exercises?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic eye exercises are visual drills designed to improve saccades — the quick, simultaneous movements of both eyes in the same direction. These exercises strengthen eye muscles, improve coordination, and speed up visual information processing."
      }
    },
    {
      "@type": "Question",
      "name": "Who can benefit from saccadic eye exercises?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic eye training is highly beneficial for competitive gamers (to scan minimaps/corners), traditional athletes (to scan the playfield), students/professionals (to speed up reading and scanning text), and individuals undergoing vision therapy or cognitive rehabilitation."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between saccadic and smooth pursuit eye movements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic eye movements are quick, jumpy movements made when shifting focus between static objects (like scanning lines of text). Smooth pursuit is the slow, continuous movement of the eyes when tracking a single moving target (like tracking a flying bird)."
      }
    },
    {
      "@type": "Question",
      "name": "How does this training help FPS gamers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In FPS games (like Valorant, CS2, or Call of Duty), players must constantly scan the screen, look at the minimap, check ammo, and re-acquire focus on suddenly appearing enemies. This gallery drill conditions your eyes to execute these sweeps cleanly with minimal response lag."
      }
    },
    {
      "@type": "Question",
      "name": "Can saccadic eye training improve reading speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Reading requires your eyes to jump from word to word (saccades) and pause briefly to process the meaning (fixation). Saccadic exercises train your ocular muscles to make faster, more accurate jumps and reduce regressions (backtracking), which directly improves reading speed and comprehension."
      }
    },
    {
      "@type": "Question",
      "name": "How do I practice saccadic eye exercises?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can practice online using this Saccadic Gallery drill. Keep your head still and let only your eyes do the work as you shift focus to locate and click targets emerging sequentially across the screen."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect saccadic sweeps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Higher refresh rate monitors display target appearances instantly with zero ghosting. This helps your eyes lock onto the exact coordinate of the newly flashed target without visual artifacts."
      }
    },
    {
      "@type": "Question",
      "name": "Is this eye tracking training free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all eye exercises and reaction drills on SkillDrills are 100% free with no signups, downloads, or pop-up ads. You can practice directly in your browser."
      }
    },
    {
      "@type": "Question",
      "name": "Can I play this saccadic training drill on mobile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Saccadic Gallery is fully touch-optimized for smartphones and tablets. It recommends landscape mode for an optimal zig-zag visual sweep layout."
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
      <SaccadicGalleryClient />
    </>
  );
}
