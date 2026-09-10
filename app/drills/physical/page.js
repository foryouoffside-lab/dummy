import PhysicalDrillsClient from './PhysicalDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO METADATA OPTIMIZATION — /drills/physical (Sector Hub)
// PRIMARY: "physical training drills"     ~480/mo, KD ~15%
//          "coordination training game"   ~250/mo, KD ~10%
// SECONDARY:
//   "reflex test online"                  ~74,000/mo
//   "balance exercises online"            ~2,900/mo
//   "hand eye coordination game"          ~1,600/mo
// ============================================================

export const metadata = {
  // GSC (180d): physical drills (pos 9.0) and physical fitness drills (pos 50)
  // land here against a title that never said "physical drills".
  title: 'Free Agility Drills - Reflex, Balance & Coordination',
  description: 'Free online physical training drills and games. Train your reaction time, reflexes, stability, balance, agility, and motor coordination. 11 free drills.',
  keywords: [
    'physical training drills', 'free physical training online', 'physical training game',
    'reaction time test', 'free reaction time test', 'online reaction time test',
    'reflex test online', 'free reflex training', 'reflex game online',
    'balance training online', 'free balance training', 'balance test online',
    'agility ladder drills', 'agility training online', 'free agility drills',
    'hand eye coordination exercises', 'hand eye coordination training', 'hand eye coordination game',
    'coordination exercises online', 'coordination training game', 'free coordination drill',
    'motor skills training', 'motor control exercises', 'fine motor training online',
    'reflex training for gamers', 'FPS training online', 'gaming reaction time',
    'dodge game online', 'pattern memory game', 'mouse precision test',
    'balance exercises online', 'stability training game', 'click speed test',
    'free fitness drills online', 'online fitness games', 'motor fitness training',
    'physical therapy exercises online', 'rehabilitation training game', 'sports training drills',
    'skilldrills physical', 'skilldrills fitness', 'skilldrills reflex',
    'no download physical training', 'browser fitness drills', 'instant motor training',
    '11 free drills', 'physical skill games', 'body training online free',
    'agility ladder drills online', 'reaction chain impulse arrest',
    'how to improve footwork agility', 'balance exercises online game',
    'cross body coordination drills', 'peripheral threat scanning',
    'sports agility training exercises', 'dodge reflex test online',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical',
    languages: getAlternateLanguages('/drills/physical'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Free Agility Drills - Reflex, Balance & Coordination | SkillDrills',
    description: 'Free online physical training drills — reaction time tests, reflex games, balance training, agility ladder drills, and coordination exercises. 11 free drills. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/physical',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Free Agility Drills - Reflex, Balance & Coordination | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Agility Drills - Reflex, Balance & Coordination | SkillDrills',
    description: 'Free reaction time tests, reflex games, balance training, agility drills, and coordination exercises. 11 drills. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Free Physical Training Drills - Reflex, Balance & Coordination",
  "url": "https://skilldrills.online/drills/physical",
  "description": "11 free physical training drills covering reaction time tests, reflex games, balance training, agility ladder drills, and hand eye coordination exercises. No sign-up required.",
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "hasPart": [
    // Balance Training (1 Drill)
    { "@type": "WebApplication", "name": "Stability Challenge - Wind Force Resistance Game", "url": "https://skilldrills.online/drills/physical/balance-training/stability-challenge" },
    // Coordination (3 Drills)
    { "@type": "WebApplication", "name": "Complex Pattern - Memory Path Drawing Game", "url": "https://skilldrills.online/drills/physical/coordination/complex-pattern" },
    { "@type": "WebApplication", "name": "Cross Body Movement - Multi-Node Coordinate Interception", "url": "https://skilldrills.online/drills/physical/coordination/cross-body-movement" },
    { "@type": "WebApplication", "name": "Dynamic Grid Evasion - 3x3 Fast Reflex Dodge Game", "url": "https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion" },
    // Fitness (3 Drills)
    { "@type": "WebApplication", "name": "Agility Ladder - Scrolling Footwork Agility Drill", "url": "https://skilldrills.online/drills/physical/fitness/agility-ladder" },
    { "@type": "WebApplication", "name": "Jump Sequence - Ball Launch & Target Calibration", "url": "https://skilldrills.online/drills/physical/fitness/jump-sequence" },
    { "@type": "WebApplication", "name": "Speed Drill - Shrinking Reflex Target Game", "url": "https://skilldrills.online/drills/physical/fitness/speed-drill" },
    // Reflex Training (4 Drills)
    { "@type": "WebApplication", "name": "Drop Catch - Decoy Ball Avoidance Reflex Test", "url": "https://skilldrills.online/drills/physical/reflex-training/drop-catch" },
    { "@type": "WebApplication", "name": "Quick Dodge - Homing Threat Chaos Game", "url": "https://skilldrills.online/drills/physical/reflex-training/quick-dodge" },
    { "@type": "WebApplication", "name": "Reaction Chain - Impulse Arrest Deceleration Drill", "url": "https://skilldrills.online/drills/physical/reflex-training/reaction-chain" },
    { "@type": "WebApplication", "name": "Peripheral Threat Sweeper - Reactive Vision Perimeter Scan", "url": "https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do computerized agility ladder drills translate to real-world footwork and athletic agility?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Computerized scrolling agility ladders train high-speed visual cue recognition and rhythm synchronization. By conditioning the brain to execute rapid, timed movement decisions in response to moving targets, your motor cortex accelerates cadence timing, directly translating into faster change-of-direction (COD) speed, tighter footwork, and reduced ground contact time in sports like basketball, soccer, and tennis."
      }
    },
    {
      "@type": "Question",
      "name": "What is an impulse arrest reaction chain, and how does it prevent over-committing in sports?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An impulse arrest reaction chain measures your neuromuscular ability to rapidly cancel or alter an already-initiated action when an unexpected decoy or penalty cue appears. Conditioning inhibitory pathways in the basal ganglia and prefrontal cortex allows athletes to halt forward momentum in under 150 milliseconds, preventing dangerous over-commitments against feints, fakes, or unpredictable opponent dodges."
      }
    },
    {
      "@type": "Question",
      "name": "How does virtual balance training (like wind force stability challenges) improve physical equilibrium?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dynamic equilibrium relies on continuous sensorimotor integration between visual gaze stability, the inner ear vestibular system, and proprioceptive feedback. Wind-force resistance drills train the central nervous system to calculate micro-counter-forces in real time, conditioning stabilizing muscle recruitment and postural control to resist sudden directional perturbations."
      }
    },
    {
      "@type": "Question",
      "name": "Why is cross-body movement and bilateral coordination essential for athletic performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cross-body movements require neural signals to cross the corpus callosum, bridging the brain's left and right hemispheres. Multi-node coordinate interception drills coordinate diagonal kinetic chains (such as right arm extension synchronized with left rotational mechanics), improving multi-directional agility, striking power, and whole-body spatial awareness."
      }
    },
    {
      "@type": "Question",
      "name": "How do fast 3x3 grid evasion drills improve real-time dodge reaction times?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike predictable static reaction tests, dynamic 3x3 grid evasion drills present chaotic, multi-vector obstacles with randomized speeds. This trains the parietal cortex to maintain continuous predictive spatial mapping, cutting choice-reaction latency from an average of 280ms down to under 190ms in high-pressure evasive scenarios."
      }
    },
    {
      "@type": "Question",
      "name": "How does peripheral vision scanning enhance athletic awareness and injury prevention?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Peripheral threat sweeper drills expand your Functional Field of View (FFOV). Processing moving stimuli on the perimeter activates the brain's magnocellular visual pathway, triggering rapid evasive motor responses to approaching threats or blindside opponents without requiring direct central foveation, significantly reducing sports injury risks."
      }
    },
    {
      "@type": "Question",
      "name": "What is the optimal training routine for physical reaction and agility drills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The optimal protocol is 15 to 25 minutes of high-intensity cognitive-agility drills per session, 3 to 5 times per week. Because neuromuscular precision demands maximum synaptic energy, practicing past 30 minutes induces Central Nervous System (CNS) fatigue, which degrades reaction mechanics and provides diminishing returns."
      }
    },
    {
      "@type": "Question",
      "name": "Can online browser-based reflex games complement physical gym agility training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. While digital drills do not replace musculoskeletal strength or plyometric power, they specifically isolate and accelerate the perceptual-cognitive phase of athleticism. By speeding up visual detection, threat interpretation, and motor command firing, athletes reduce perceptual lag, allowing physical strength and agility to execute with maximum efficiency on the field."
      }
    }
  ]
};

export default function PhysicalDrillsPage() {
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
      <PhysicalDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}