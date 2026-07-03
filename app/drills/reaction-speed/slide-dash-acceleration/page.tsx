import SlideDashAccelerationClient from './SlideDashAccelerationClient';

// ============================================================
// SEO RESEARCH FINDINGS — slide-dash-acceleration
// PRIMARY: "visual tracking exercises" ~1,300/mo US, KD ~30% (Medium)
//          "smooth pursuit eye training" ~1,300/mo, KD ~30% (clinical overlap)
// SECONDARY / LSI:
//   "saccadic eye movement test"      ~150/mo,   KD ~22%
//   "dynamic visual acuity exercises" ~90/mo,    KD ~15%
//   "esports vision training"         ~250/mo,   KD ~12%
//   "aim tracking practice"           ~150/mo,   KD ~10%
// PAA targets: "What are visual tracking exercises?", "How do you train smooth pursuit?",
//   "Does visual tracking training help gaming?", "What is the difference between smooth pursuit and saccadic movements?"
// Key entities: slide dash acceleration, burst acceleration, gaze stabilization, foveal pursuit,
//   retinal slip compensation, target re-acquisition speed, choice reaction latency
// ============================================================

export const metadata = {
  title: 'Slide Dash Acceleration - Visual Tracking Exercises | SkillDrills',
  description: 'Improve your dynamic eye movement with the free Slide Dash Acceleration drill. Practice visual tracking exercises online, train smooth pursuit against sudden burst accelerations, and boost your reaction speed.',
  keywords: [
    // Primary / Head terms
    'visual tracking exercises', 'smooth pursuit eye training', 'slide dash acceleration',
    // Secondary / LSI terms
    'dynamic visual acuity exercises', 'esports vision training', 'aim tracking practice',
    'saccadic eye movement test', 'foveal tracking', 'visual processing speed test',
    // Long-tail variants
    'how to track accelerated targets', 'aim trainer burst acceleration',
    'fix shaky tracking aim', 'eye movement exercises online',
    // General
    'free online reaction game', 'sports vision drills free', 'low latency eye test'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/slide-dash-acceleration',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Slide Dash Acceleration - Visual Tracking Exercises | SkillDrills',
    description: 'Improve your dynamic eye movement with the free Slide Dash Acceleration drill. Practice visual tracking exercises online and train smooth pursuit against sudden burst accelerations.',
    url: 'https://skilldrills.online/drills/reaction-speed/slide-dash-acceleration',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Slide Dash Acceleration - Visual Tracking Exercises | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Slide Dash Acceleration - Visual Tracking Exercises',
    description: 'Track target slides that undergo sudden high-speed burst dash accelerations. Free browser-based visual tracking exercises.',
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
    { "@type": "ListItem", "position": 4, "name": "Slide Dash Acceleration", "item": "https://skilldrills.online/drills/reaction-speed/slide-dash-acceleration" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Slide Dash Acceleration — Visual Tracking Exercises | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/slide-dash-acceleration",
  "description": "Track target slides that undergo sudden high-speed burst dash accelerations to train gaze stabilization, foveal pursuit, and target re-acquisition speed.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Visual Tracking Exercises, Smooth Pursuit, Gaze Stabilization, Target Re-acquisition Speed, Dynamic Ocular Agility"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train with Slide Dash Acceleration",
  "description": "Improve your smooth pursuit tracking and focus re-acquisition against sudden target speed bursts.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Start the Drill",
      "text": "Open the Slide Dash Acceleration drill. Select your visual settings, color scheme, and click Begin Drill to launch the target."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track Target Movement",
      "text": "Focus your eyes on the moving target sphere. Track its path smoothly as it moves across the viewport."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "React to Dash Bursts",
      "text": "When the target suddenly executes a high-speed dash, keep your gaze locked to absorb the visual change and adjust your cursor immediately."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Hold click to eliminate",
      "text": "Hold your cursor centered on the target to trigger active hits and avoid timeouts before the 60-second limit expires."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Slide Dash Acceleration Drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Slide Dash Acceleration is an online visual tracking game where you follow targets that undergo sudden burst accelerations. It is designed to train gaze stabilization, smooth pursuit, and foveal target re-acquisition speed."
      }
    },
    {
      "@type": "Question",
      "name": "What are visual tracking exercises?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visual tracking exercises are eye exercises designed to improve the coordination of ocular muscles, enabling you to track moving objects smoothly and switch focus between static points without losing alignment or experiencing eye strain."
      }
    },
    {
      "@type": "Question",
      "name": "How does tracking acceleration improve gaming reflexes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In competitive gaming, opponents rarely move at constant speeds. They slide-cancel, dodge, jump, and change velocities. Training against targets that accelerate suddenly teaches your brain to compensate for 'retinal slip' and adjust your mouse positioning instantly."
      }
    },
    {
      "@type": "Question",
      "name": "What is smooth pursuit eye training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth pursuit is the visual ability to track a moving object continuously. Smooth pursuit training strengthens the neurological link between your eyes, visual cortex, and motor coordination, which helps you follow dynamic targets cleanly."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between smooth pursuit and saccadic movements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth pursuit refers to continuous eye tracking of a single moving target. Saccades are rapid, jumpy ballistic shifts of the eyes when jumping between multiple static targets (like scanning different corners)."
      }
    },
    {
      "@type": "Question",
      "name": "How does this training help in fast-paced shooters like Apex Legends?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Apex Legends features high-speed movements, sliding, and character abilities (like Octane's stim or Pathfinder's grapple) that cause sudden velocity spikes. Training your eyes on Slide Dash Acceleration reduces your visual-motor processing delay when countering these bursts."
      }
    },
    {
      "@type": "Question",
      "name": "How can I reduce aim shakiness when tracking accelerated targets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shakiness is caused by physical muscle tension and high sensitivity. Try to consciously relax your forearm, lower your mouse sensitivity (30-45 cm/360 is recommended), and practice smooth, fluid sweeps rather than jerking."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor frame rate affect my tracking performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Higher monitor refresh rates (144Hz+) significantly reduce screen tearing and blur, which allows you to perceive target borders clearly and react to sudden speed spikes much faster."
      }
    },
    {
      "@type": "Question",
      "name": "Is this visual tracking game free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all eye exercises and reaction training games on SkillDrills are 100% free with no signups, downloads, or pop-up ads required. You can play directly in your browser."
      }
    },
    {
      "@type": "Question",
      "name": "Can I practice visual tracking exercises on mobile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Slide Dash Acceleration is fully touch-optimized for mobile viewports, allowing you to trace and track targets directly on your tablet or smartphone screen."
      }
    }
  ]
};

export default function SlideDashAccelerationPage() {
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
      <SlideDashAccelerationClient />
    </>
  );
}
