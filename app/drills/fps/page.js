import FPSHubClient from './FPSHubClient';
import { DRILLS } from '../../../lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';

const fpsDrills = DRILLS.filter((d) => d.category === 'fps');
const fpsDrillCount = fpsDrills.length;

export const metadata = {
  // GSC (180d) for this URL: fps training 48 impr (pos 28.8), fps practice 28,
  // fps trainer 16, practice fps aim 12. The old title carried "aim trainer"
  // and "aim training" but never the phrase "FPS Training" those queries use.
  title: 'Free Aim Trainer - Online Aim Training for FPS Games',
  description: `Free FPS aim trainer online. ${fpsDrillCount} aim training drills - flick shots, tracking, recoil control and reaction time. For Valorant, CS2 and Apex.`,
  keywords: [
    'free fps aim trainer', 'fps aim trainer online', 'best aim trainer',
    'aim trainer online', 'free aim trainer', 'aim training online',
    'fps training online', 'free fps training', 'fps aim training',
    'Valorant aim trainer', 'CS2 aim training', 'Apex Legends aim trainer',
    'Overwatch aim training', 'Rainbow Six aim trainer', 'Fortnite aim practice',
    'flick shot training', 'tracking aim trainer', 'recoil control training',
    'reaction time test fps', 'strafe tracking aim', 'crosshair placement training',
    'target switching aim', 'target acquisition training', 'vertical tracking aim',
    '180 degree awareness', 'mouse accuracy test', 'aim training game',
    'esports aim training', 'competitive fps training', 'pro aim training',
    'raw mouse input aim', 'pointer lock aim trainer', 'fps sensitivity training',
    'gaming aim practice', 'mouse precision fps', 'aim improvement game',
    'skilldrills fps', 'skilldrills aim trainer', 'free online aim practice',
    'no download aim trainer', 'browser aim trainer', 'instant aim training',
    'professional aim training', 'comprehensive aim trainer',
    'click timing drills', 'how to improve aim in fps', 'cm 360 aim sensitivity',
    'micro correction aim', 'smooth pursuit tracking',
  ],
  openGraph: {
    title: 'Free Aim Trainer - Online Aim Training for FPS Games | SkillDrills',
    description: `Free FPS aim trainer hub. ${fpsDrillCount} professional aim training drills — flick shots, tracking, recoil control, reaction time. Valorant, CS2, Apex. No sign-up.`,
    type: 'website',
    url: 'https://skilldrills.online/drills/fps',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Free FPS Aim Trainer - Online Aim Training Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Aim Trainer - Online Aim Training for FPS Games | SkillDrills',
    description: `Free FPS aim trainer. ${fpsDrillCount} professional drills — flick shots, tracking, recoil control, reaction time. Valorant, CS2, Apex. No sign-up.`,
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps',
    languages: getAlternateLanguages('/drills/fps'),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does dedicated aim training transfer to tactical shooters like Valorant and CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dedicated aim training isolates pure mouse kinematics—such as micro-corrections, crosshair deceleration, and click timing—free from in-game round downtime, economy management, and spectating. In tactical shooters like Valorant and CS2 where time-to-kill (TTK) is sub-200ms, practicing hundreds of micro-flicks in a 10-minute browser drill conditions the motor cortex to execute sub-pixel adjustments reflexively, freeing cognitive bandwidth for crosshair placement and tactical positioning."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Click Timing, Tracking, and Target Switching?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FPS aiming divides into three foundational mechanical pillars: 1) Click Timing (Static & Dynamic Flicks): moving the cursor to a target and confirming the shot the instant the reticle intersects the hitbox, vital for single-tap weapons like the Vandal or AK-47; 2) Tracking (Smooth Pursuit & Reactive): continuously synchronizing reticle velocity with a moving target's vector, essential for automatic weapon fire in Apex Legends and Overwatch 2; and 3) Target Switching: snapping ballistically between multiple targets at maximum velocity with minimal dwell time, critical for multi-enemy clutch engagements."
      }
    },
    {
      "@type": "Question",
      "name": "How long should you practice aim drills each day for optimal improvement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The optimal aim training routine is 15 to 30 minutes of deliberate, focused practice per day, 4 to 6 days per week. Motor learning neuroscience indicates that neural fatigue degrades fine-motor calibration after approximately 35 minutes of continuous aiming. High-intensity, brief sessions followed by adequate sleep promote neural myelin consolidation, producing faster muscle memory gains and lower risk of repetitive strain injury (RSI) compared to marathon multi-hour sessions."
      }
    },
    {
      "@type": "Question",
      "name": "Should you use wrist aiming, arm aiming, or a hybrid technique?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Competitive esports players utilize a hybrid aiming technique: the forearm and elbow execute wide horizontal turns and 180-degree sweeps, the wrist manages medium-range target acquisition, and the fingertips provide fine sub-pixel micro-corrections and vertical recoil control. Relying exclusively on wrist aiming restricts your effective range and increases carpal tunnel risk, while purely arm aiming lacks the fine dexterity needed for precision headshots."
      }
    },
    {
      "@type": "Question",
      "name": "How do you find your optimal mouse sensitivity and cm/360?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Optimal sensitivity is measured in centimeters per 360-degree rotation (cm/360). For tactical shooters (Valorant, CS2), a lower sensitivity of 35 to 55 cm/360 provides maximum micro-adjustment stability. For tracking-heavy arena shooters (Apex Legends, Overwatch 2, The Finals), a medium sensitivity of 24 to 38 cm/360 balances rapid 180-degree turns with continuous target pursuit. To calibrate, choose a sensitivity where you can smoothly track a stationary point while strafing left and right without your crosshair jittering off-target."
      }
    },
    {
      "@type": "Question",
      "name": "Why does my aim feel shaky or inconsistent, and how do I fix it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shaky aim is predominantly caused by excessive muscular tension in the hand and forearm, over-gripping the mouse during high-stress gunfights, or using a sensitivity too high for your current fine motor control. To eliminate tremors: 1) Run smooth pursuit tracking drills to train fluid, low-tension cursor movement; 2) Lower your sensitivity by 10% to 15% to increase your margin of error; and 3) Ensure your forearm rests comfortably on the desk or mousepad to minimize friction drag."
      }
    },
    {
      "@type": "Question",
      "name": "Is an online browser aim trainer as responsive as downloadable software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. SkillDrills utilizes the modern HTML5 Canvas API and the W3C Raw Pointer Lock API, which completely bypasses operating system mouse acceleration curves and desktop boundaries to process unadjusted hardware movement deltas (movementX/movementY). Coupled with decoupled fixed-timestep physics capable of rendering at 240Hz, 360Hz, and beyond, browser drills deliver 1:1 esports-grade hardware translation with zero downloads or install footprint."
      }
    },
    {
      "@type": "Question",
      "name": "What is crosshair placement versus raw flick aiming, and which matters more?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crosshair placement is proactive spatial positioning—pre-aiming common sightlines and head-level angles before peeking—whereas raw flick aiming is reactive motor correction when an enemy appears away from your crosshair. In tactical shooters, crosshair placement accounts for approximately 70% of gunfight wins. However, elite raw flick precision and micro-correction speed are what secure the remaining 30% of unpredictable encounters, wide swings, and multi-target trades."
      }
    }
  ]
};

export default function FPSHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free FPS Aim Trainer - Best Online Aim Training Hub",
        "url": "https://skilldrills.online/drills/fps",
        "description": `Free FPS aim trainer hub with ${fpsDrillCount} professional aim training drills. Flick shots, tracking aim, recoil control, reaction time tests, strafe tracking, crosshair placement, target acquisition, and more. Valorant, CS2, Apex Legends compatible. No sign-up required.`,
        "author": { "@type": "Organization", "name": "SkillDrills" },
        "hasPart": fpsDrills.map((drill) => ({
          "@type": "WebApplication",
          "name": drill.name,
          "url": `https://skilldrills.online${drill.href}`
        }))
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FPSHubClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}