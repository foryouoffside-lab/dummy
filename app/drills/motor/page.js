import MotorDrillsClient from './MotorDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Mouse Precision & Hand Eye Coordination Drills - Free',
  description: 'Free aim trainer and motor skills drills online. 8 hand eye coordination, movement speed, and precision control tests. No sign-up.',
  keywords: [
    'free aim trainer', 'aim trainer online', 'motor skills drills', 'motor skills training',
    'hand eye coordination training', 'hand eye coordination game', 'hand eye coordination test',
    'mouse accuracy test', 'mouse precision training', 'mouse precision game',
    'click accuracy test', 'click speed test', 'cps test online',
    'reaction time test', 'reaction time training', 'reflex test online',
    'fine motor skills', 'fine motor skills training', 'fine motor skills game',
    'flick training', 'flick shot training', 'flick training online',
    'finger speed test', 'finger dexterity test', 'finger sequencing drill',
    'steady hand game', 'mouse tracing game', 'drag and drop game',
    'rhythm click game', 'timing accuracy game', 'synchronization drill',
    'FPS training online', 'gaming aim practice', 'esports training game',
    'Valorant aim trainer', 'CS2 aim training', 'Apex aim trainer',
    'keyboard recognition trainer', 'keybind speed trainer', 'keyboard layout trainer',
    'free motor training', 'online motor drills', 'precision control training',
    'movement speed drill', 'timing accuracy drill', 'coordination training',
    'skilldrills motor', 'skilldrills aim', 'free online skill training',
    'no download motor game', 'browser skill game', 'instant motor training',
    'motor skills game online', 'precision mouse training',
    'hand eye coordination exercises', 'how to improve mouse accuracy',
    'clicks per second test', 'cps test average', 'fitts law mouse accuracy',
    'finger dexterity exercises', 'steady hand test tremor control',
    'sub pixel mouse precision', 'fine motor skills games',
  ],
  openGraph: {
    title: 'Mouse Precision & Hand Eye Coordination Drills | SkillDrills',
    description: 'Free aim trainer and motor skills drills. 8 hand eye coordination, click speed, and precision control tests. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/motor',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Free Aim Trainer & Motor Skills Drills Online',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mouse Precision & Hand Eye Coordination Drills | SkillDrills',
    description: 'Free aim trainer and motor skills drills. 8 hand eye coordination, click speed, and precision control tests. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor',
    languages: getAlternateLanguages('/drills/motor'),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do online motor skills drills improve hand-eye coordination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Motor skills drills train the visuomotor feedback loop linking retinal image acquisition in the visual cortex to motor planning in the cerebellum and efferent signals in the motor cortex. By executing high-frequency micro-adjustments, rapid mouse clicks, and path-tracing challenges, your nervous system reduces sensorimotor delay, translating visual target changes into precise physical movement in under 180 milliseconds."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good CPS (Clicks Per Second) score, and what are the main clicking techniques?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An average person achieves 6 to 8 clicks per second (CPS) using standard finger tapping. Competitive gamers utilize specialized techniques: Jitter Clicking (tensing forearm muscles to vibrate the finger onto the switch) yields 10 to 14 CPS, while Butterfly Clicking (alternating index and middle fingers on a dual-registering switch) can exceed 15 to 22 CPS. For long-term health and precision, controlled jitter or standard rhythmic tapping is recommended to prevent repetitive strain injury (RSI)."
      }
    },
    {
      "@type": "Question",
      "name": "How does mouse path-tracing and steady hand training eliminate cursor jitter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cursor overshooting and erratic jitter stem from weak antagonist muscle deceleration—the inability of opposing hand muscles to brake momentum smoothly. Steady hand games and sinusoidal wave-tracing drills force continuous sub-pixel coordinate tracking, conditioning stabilizing muscle fibers in the wrist and forearm to suppress involuntary micro-tremors during fine pointing tasks."
      }
    },
    {
      "@type": "Question",
      "name": "What is Fitts's Law, and how does it optimize mouse movement speed and accuracy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fitts's Law is an established human-computer interaction principle stating that movement time is a logarithmic ratio of target distance divided by target width (MT = a + b * log2(2D/W)). Motor precision drills condition two-phase motor execution: an initial ballistic high-velocity sweep covering 80% to 90% of the distance, followed by a rapid sensory-guided micro-deceleration to cleanly acquire the target without bouncing or overshooting."
      }
    },
    {
      "@type": "Question",
      "name": "Why is keyboard dexterity and finger sequencing crucial for gaming and typing speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Keyboard dexterity relies on digit independence, specifically overcoming the anatomical tendon linkage between the ring and pinky fingers. Finger sequencing and keyboard recognition drills isolate finger actuation patterns, reducing chord transition latency, boosting touch-typing words-per-minute (WPM), and eliminating accidental key presses during high actions-per-minute (APM) gameplay."
      }
    },
    {
      "@type": "Question",
      "name": "What grip and posture provide the highest mouse precision and wrist stability?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ergonomists and pro esports players recommend an anchored forearm posture where the fleshy part of the forearm rests flat on the desk or mousepad, avoiding hard wrist pressure that compresses the carpal tunnel. A relaxed claw or hybrid fingertip grip allows fingers to control minute vertical micro-corrections while the wrist and arm manage broader directional sweeps."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to develop muscle memory for fine motor control?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Neural motor adaptation begins within the first 15 to 20 minutes of deliberate practice, but permanent motor consolidation requires 2 to 4 weeks of consistent training (15 minutes daily, 4 to 6 days per week). Sleep plays a critical biological role: slow-wave and REM sleep cycles consolidate motor memory traces from the cerebellum into the primary motor cortex (M1), converting deliberate effort into subconscious procedural reflex."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate are browser-based motor and mouse tests compared to desktop applications?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Browser timers are precise; the browser's input and display path is not. performance.now() resolves to 0.1ms, but end-to-end measurement is bounded by display refresh (about 8ms at 120Hz, 16ms at 60Hz) and mouse polling (about 1ms at 1000Hz, 8ms at 125Hz). These drills therefore resolve real differences of roughly 5ms and upward, which is enough to track your own progress on the same hardware and not enough to compare your score against someone else's on different hardware. A desktop application with raw input access can do better; any site claiming sub-millisecond precision from a web browser is overstating the platform."
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Free Aim Trainer & Motor Skills Drills - Mouse Precision Online",
  "url": "https://skilldrills.online/drills/motor",
  "description": "8 free motor skills drills and aim trainer games online. Hand eye coordination, click speed tests, flick training, and precision control drills. No sign-up required.",
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "hasPart": [
    // Hand-Eye Coordination (3 Drills)
    { "@type": "WebApplication", "name": "Aim Trainer - Target Snapping & Mouse Precision Test", "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer" },
    { "@type": "WebApplication", "name": "Drag and Drop - Cursor Grip & Spatial Timing Interception", "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop" },
    { "@type": "WebApplication", "name": "Precision Flick Shot - Aperture Centering & Target Snap Drill", "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot" },
    // Movement Speed (4 Drills)
    { "@type": "WebApplication", "name": "Keyboard Tester - Check Dead Keys, Ghosting & NKRO Rollover", "url": "https://skilldrills.online/drills/motor/keyboard-tester" },
    { "@type": "WebApplication", "name": "Finger Sequencing - Scale-Ordered Node Dexterity Test", "url": "https://skilldrills.online/drills/motor/movement-speed/finger-sequencing" },
    { "@type": "WebApplication", "name": "Keyboard Recognition - Keybind Muscle Memory Speed Trainer", "url": "https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition" },
    { "@type": "WebApplication", "name": "Rapid Tapping - CPS Click Cadence & Burst Speed Test", "url": "https://skilldrills.online/drills/motor/movement-speed/rapid-tapping" },
    // Precision Control (2 Drills)
    { "@type": "WebApplication", "name": "Steady Hand Trainer - Micro-Tremor Suppression & Path Tracing", "url": "https://skilldrills.online/drills/motor/precision-control/steady-hand" },
    { "@type": "WebApplication", "name": "Mouse Tracing - Continuous Wave Tracking & Path Guidance Drill", "url": "https://skilldrills.online/drills/motor/precision-control/tracing" }
  ]
};

export default function MotorDrillsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MotorDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}