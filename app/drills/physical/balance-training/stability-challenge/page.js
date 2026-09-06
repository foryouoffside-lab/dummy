import StabilityChallengeClient from './StabilityChallengeClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — stability-challenge (physical-stability-challenge)
// PRIMARY:  "balance test online"         — High-intent diagnostic (~2,400+ searches/mo)
//           "online balance trainer"      — Core training phrase
// SECONDARY / LSI:
//           "cursor stability challenge"  — Interactive drill query
//           "stability challenge"         — Core brand/drill term
//           "force vector counteraction"  — Biomechanical resistance phrase
//           "postural equilibrium trainer"— Motor control & equilibrium
//           "wind resistance tracking drill" — Dynamic physics query
//           "central crosshair stabilization" — Precision targeting term
//           "motor control balance game"  — Gamified stability drill
//           "recoil stabilization drill"  — FPS tactical cross-application
// LOCALES:
//           ja: "バランス テスト オンライン" (Balance Test Online / Stability Training)
//           ko: "온라인 균형 감각 테스트" (Online Balance Test / Stability Drill)
//           de: "balance test online" (Balance Test Online / Stabilitäts Challenge)
// ============================================================

export const metadata = {
  title: 'Balance Test Online – Free Cursor Stability Trainer',
  description: 'Free online balance test. Master force vector counteraction, postural equilibrium, and central crosshair stabilization against dynamic wind resistance.',
  keywords: [
    'balance test online',
    'online balance trainer',
    'cursor stability challenge',
    'stability challenge',
    'force vector counteraction',
    'postural equilibrium trainer',
    'wind resistance tracking drill',
    'central crosshair stabilization',
    'motor control balance game',
    'recoil stabilization drill',
  ],
  openGraph: {
    title: 'Balance Test Online – Free Cursor Stability Trainer | SkillDrills',
    description: 'Free online balance test. Master force vector counteraction, postural equilibrium, and central crosshair stabilization against dynamic wind resistance.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/balance-training/stability-challenge',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Balance Test Online – Free Cursor Stability Trainer | SkillDrills',
    description: 'Free online balance test. Master force vector counteraction, postural equilibrium, and central crosshair stabilization against dynamic wind resistance.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/balance-training/stability-challenge',
    languages: getAlternateLanguages('/drills/physical/balance-training/stability-challenge'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/' },
    { '@type': 'ListItem', position: 2, name: 'Physical Training', item: 'https://skilldrills.online/drills/physical' },
    { '@type': 'ListItem', position: 3, name: 'Balance Training', item: 'https://skilldrills.online/drills/physical/balance-training' },
    { '@type': 'ListItem', position: 4, name: 'Stability Challenge', item: 'https://skilldrills.online/drills/physical/balance-training/stability-challenge' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Stability Challenge – Online Balance & Resistance Trainer',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based balance test and resistance tracking drill. Counter dynamic stochastic wind force vectors to keep your crosshair locked within a contracting central safe ring.',
  url: 'https://skilldrills.online/drills/physical/balance-training/stability-challenge',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Stability Challenge Balance Drill',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires modern web browser with HTML5 Canvas and pointer lock raw input support',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://skilldrills.online/drills/physical/balance-training/stability-challenge',
  dateModified: '2026-09-05',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Stability Challenge exercise and how does it evaluate motor control?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Stability Challenge is an interactive physical balance and resistance tracking assessment where users maintain their crosshair within a central safe zone while dynamic, multi-directional wind force vectors attempt to blow the cursor off-target. It measures postural equilibrium, antagonist muscle co-contraction, and high-frequency corrective submovements.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do dynamic wind force vector mechanics function in this drill?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dynamic wind vectors continuously calculate velocity offsets pushing the virtual cursor away from the geometric center. Users must apply smooth, counter-directional mouse input to neutralize the displacement force and preserve central equilibrium.',
      },
    },
    {
      '@type': 'Question',
      name: 'What scientific models govern postural equilibrium and perturbation resistance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Perturbation resistance is explained by Nashner & McCollum's (1985) postural synergy model and David A. Winter's (1995) biomechanical balance principles. The central nervous system coordinates rapid corrective synergies and torque modulations to counteract external displacement forces before center-of-mass boundaries are breached.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does difficulty scale across the 15 progression levels in Stability Challenge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Difficulty scales dynamically every 250 points up to Level 15. The central safe ring radius constricts from 45 pixels down to 20 pixels, while wind force push strength accelerates from 250 up to 850 units, requiring exponentially tighter motor stabilization.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens when my crosshair gets pushed outside the central safe zone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Drifting outside the safe ring triggers a red warning flash and resets your active combo multiplier back to 1.0x. There are no score deductions or session time losses, allowing immediate re-centering and recovery.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Woodworth\'s closed-loop model apply to continuous cursor stabilization?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Robert S. Woodworth (1899) established that targeted motor control relies on an initial impulse followed by continuous current-control feedback. In Stability Challenge, players utilize constant closed-loop visual feedback to execute corrective micro-adjustments every 150 to 200 ms.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Stability Challenge transfer to recoil control in competitive FPS games?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Weapon spray patterns in games like CS2, Valorant, and Apex Legends impart continuous displacement vectors on the crosshair. Practicing continuous force counteraction builds the neuromuscular muscle memory required to pull down smoothly against weapon recoil climb.',
      },
    },
    {
      '@type': 'Question',
      name: 'What mouse sensitivity and DPI are recommended for resisting strong force vectors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A moderate-to-low sensitivity (400 to 800 DPI with 30–45 cm/360°) provides greater physical resistance and arm engagement, dampening accidental over-corrections when wind forces spike in intensity.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I prevent muscle tension and forearm fatigue during high-force rounds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Maintain a relaxed wrist posture and avoid gripping the mouse excessively tight. Let the forearm glide across your mousepad, using gentle antagonistic counter-pressure rather than tensing the entire upper arm.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the Stability Challenge free to play and accessible without downloads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Stability Challenge on SkillDrills is 100% free, runs directly in any modern desktop web browser supporting Pointer Lock API, and requires zero downloads or third-party installations.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Postural Equilibrium & Resistance Tracking',
  description: 'Step-by-step training protocol for mastering force vector counteraction, building combo multipliers, and stabilizing the cursor against dynamic wind forces.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Lock Pointer and Center Crosshair in Safe Ring',
      text: 'Click "Start Drill" to lock the pointer and position your crosshair inside the glowing green central safe ring.',
    },
    {
      '@type': 'HowToStep',
      name: 'Anticipate and Counter Dynamic Wind Vectors',
      text: 'As stochastic wind forces push your crosshair outward, smoothly glide your mouse in the exact opposite direction to maintain center positioning.',
    },
    {
      '@type': 'HowToStep',
      name: 'Build Unbroken Combo Multipliers Through Continuous Alignment',
      text: 'Sustain unbroken stability within the safe ring to escalate your combo multiplier up to 3.0x max for rapid score acceleration.',
    },
    {
      '@type': 'HowToStep',
      name: 'Adapt to Contracting Radii and Accelerating Push Strength',
      text: 'Survive higher levels as the safe zone radius shrinks from 45px to 20px and wind force pulses intensify toward the final seconds.',
    },
  ],
};

const guideProps = {
  sources: pickSources('nashner1985', 'winter1995', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'How cursor stability is measured',
    paragraphs: [
      'This drill measures how well you hold a cursor on a centre point while a force pushes it away — a continuous correction task rather than a one-off movement.',
      'Every reach in this drill is also a Fitts\'s Law movement: the time to land on a target grows with the logarithm of the distance to it divided by its width, so a target half the size costs about the same extra time as one twice as far away (Fitts, 1954).',
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every event to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else\'s. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmark: {
    title: 'Stability Challenge & Balance Training Benchmarks',
    description: 'Empirical standards derived from postural perturbation research (Nashner & McCollum 1985, Winter 1995) and closed-loop motor stabilization metrics. Evaluates total score, maximum level achieved, safe zone retention percentage, and peak combo over 45 seconds.',
    columns: ['Tier', 'Rank Title', 'Score Benchmark', 'Peak Level', 'Safe Ring Retention', 'Editorial band'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Stabilizer',
        stat: '15,300+ pts',
        level: 'Level 12–15',
        accuracy: '> 94% time in ring',
        percentile: 'Exceptional',
      },
      {
        tier: 'Tier 2',
        rank: 'Master Anchor',
        stat: '12,000–15,299 pts',
        level: 'Level 9–11',
        accuracy: '86–93% time in ring',
        percentile: 'Advanced',
      },
      {
        tier: 'Tier 3',
        rank: 'Proficient Counterer',
        stat: '9,500–11,999 pts',
        level: 'Level 6–8',
        accuracy: '75–85% time in ring',
        percentile: 'Strong',
      },
      {
        tier: 'Tier 4',
        rank: 'Intermediate Core',
        stat: '6,000–9,499 pts',
        level: 'Level 3–5',
        accuracy: '60–74% time in ring',
        percentile: 'Typical',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Perturbed',
        stat: '< 6,000 pts',
        level: 'Level 1–2',
        accuracy: '< 60% time in ring',
        percentile: 'Starting out',
      },
    ],
  },
  protocols: {
    title: 'How to train balance and stability',
    description: 'Coaching guidance from the models cited above, intended to condition antagonist motor unit firing, regulate corrective torque, and dampen perturbation overshooting.',
    items: [
      {
        title: 'Protocol 1: Nashner Postural Synergy & Antagonist Counter-Pressure',
        description: 'According to Nashner & McCollum (1985), stabilizing against unpredictable perturbations requires coordinated co-activation of antagonistic muscle groups. Lightly engage both forearm flexors and extensors simultaneously to create baseline resistance, preventing excessive jerk when wind forces shift.',
      },
      {
        title: 'Protocol 2: Winter Center-of-Mass Re-Centering & Micro-Torque Regulation',
        description: 'Winter (1995) showed that stability is maximized when corrective torque is modulated continuously rather than through intermittent large thrusts. Apply gentle, continuous micro-pressure directly toward the ring center rather than waiting for your cursor to near the outer perimeter.',
      },
      {
        title: 'Protocol 3: Woodworth Closed-Loop Feedback Pacing (Feedforward Gaze)',
        description: 'Focus your gaze directly on the center point of the safe ring rather than tracking the wandering crosshair. This establishes an absolute visual reference frame, giving your visual-motor loop (Woodworth 1899) immediate vector discrepancy data.',
      },
      {
        title: 'Protocol 4: Recoil Counteraction & High-Force Level Management',
        description: 'As wind pushes exceed 600 strength units past Level 9, incorporate slight forearm gliding rather than wrist-only flexion. This recruits larger proximal muscle groups with higher isometric fatigue tolerance, keeping your crosshair anchored inside the 20px channel.',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Stability Challenge & Balance Training',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function StabilityChallengePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <StabilityChallengeClient />
      <DrillGuide {...guideProps} />
    </>
  );
}
