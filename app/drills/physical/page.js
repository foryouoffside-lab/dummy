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
    '11 free drills', 'physical skill games', 'body training online free'
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
      <PhysicalDrillsClient />
    </>
  );
}