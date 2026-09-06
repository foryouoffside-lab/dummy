import DragAndDropClient from './DragAndDropClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — drag-and-drop (motor-drag-and-drop)
// PRIMARY:  "drag and drop test"          — Core diagnostic / motor precision query (~1,400 searches/mo)
//           "drag and drop mouse trainer" — Specialized training phrase
// SECONDARY / LSI:
//           "drag and drop precision"     — Spatial accuracy and stability term
//           "mouse drag test"             — Hardware and manual dexterity assessment
//           "cursor control test"         — General motor coordination query
//           "mouse coordination test"     — Fine motor evaluation query
//           "mouse dragging practice"     — Habitual skill drill search
//           "fine motor control test"     — Clinical and ergonomics search
//           "mouse stopping power"        — Sensorimotor deceleration term
//           "deceleration aim drill"      — FPS braking and target tracking query
//           "inventory drag drill"        — Tactical gaming interface manipulation
// LOCALES:
//           ja: "ドラッグ アンド ドロップ 練習" (Drag and Drop Practice / Mouse Control Test)
//           ko: "드래그 앤 드롭 테스트" (Drag and Drop Test / Mouse Control Drill)
//           de: "drag and drop test" (Drag and Drop Test Maus Präzision)
// ============================================================

export const metadata = {
  title: 'Drag and Drop Test – Free Mouse Control & Precision Drill',
  description: 'Train mouse dragging accuracy, cursor deceleration, and spatial release timing with this free online motor drill. Grounded in the Accot-Zhai Steering Law.',
  keywords: [
    'drag and drop test',
    'drag and drop mouse trainer',
    'drag and drop precision',
    'mouse drag test',
    'cursor control test',
    'mouse coordination test',
    'mouse dragging practice',
    'fine motor control test mouse',
    'mouse stopping power',
    'deceleration aim drill',
    'inventory drag drill',
    'free mouse trainer',
  ],
  openGraph: {
    title: 'Drag & Drop Mouse Trainer – Spatial Motor Precision Drill | SkillDrills',
    description: 'Train mouse dragging accuracy, cursor deceleration, and spatial release timing with this free online motor drill. Free, instant browser-based tool.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drag & Drop Mouse Trainer – Spatial Motor Precision Drill | SkillDrills',
    description: 'Train mouse dragging accuracy, cursor deceleration, and spatial release timing with this free online motor drill. Free, instant browser-based tool.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/drag-and-drop'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/' },
    { '@type': 'ListItem', position: 2, name: 'Motor Training', item: 'https://skilldrills.online/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Hand-Eye Coordination', item: 'https://skilldrills.online/drills/motor/hand-eye-coordination' },
    { '@type': 'ListItem', position: 4, name: 'Drag & Drop Mouse Trainer', item: 'https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Drag and Drop Test – Free Mouse Control & Precision Drill',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based drag and drop precision trainer. Refine mouse cursor deceleration, continuous spatial transport, and release timing with adaptive difficulty scaling.',
  url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Drag & Drop Mouse Trainer',
  browserRequirements: 'Requires HTML5 Canvas, Pointer Lock API, and JavaScript',
  url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop',
  applicationCategory: 'EducationalApplication',
  dateModified: '2026-09-05',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-05',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Drag & Drop Mouse Trainer and how does it test motor control?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Drag & Drop Mouse Trainer is an interactive sensorimotor drill designed to evaluate and train fine cursor steering, continuous spatial dragging accuracy, and release timing under time pressure. Users acquire a dynamic ball payload, transport it along an unconstrained spatial vector, and deposit it cleanly inside a moving container.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is dragging significantly more difficult than simple pointing or clicking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As demonstrated by MacKenzie, Sellen, and Buxton (1991), dragging imposes continuous isometric depression of the primary mouse switch while navigating spatial trajectories. This constant muscular co-contraction increases friction between the hand and mousepad, alters biomechanical finger posture, and reduces motor throughput by 15% to 25% compared to pointing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Accot-Zhai Steering Law and how does it apply to mouse dragging?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Formulated by Johnny Accot and Shumin Zhai (1997), the Steering Law extends Fitts\'s Law to continuous trajectory-based tasks. It establishes that movement time scales with the integral of trajectory length divided by tunnel width. In dragging tasks, maintaining the payload inside target boundaries requires continuous closed-loop visual feedback rather than open-loop ballistic bursts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do players overshoot moving target containers during rapid dragging?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Overshooting occurs when the neuromuscular braking impulse is mistimed relative to the target container\'s velocity vector. Elliott et al. (2010) identified that deceleration requires antagonist muscle recruitment (e.g., extensor digitorum and forearm flexors) to arrest limb momentum. Excessive acceleration during the primary impulse phase overloads closed-loop feedback latency (~100–150 ms), causing release outside the container rim.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does physical mouse grip style affect dragging accuracy and stability?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Palm grip provides maximum surface friction and forearm stabilization for smooth, consistent straight-line dragging. Claw grip offers greater vertical micro-adjustment dexterity through the fingertips but requires higher isometric endurance to maintain continuous button actuation without trembling.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does drag and drop training help competitive FPS and MOBA gamers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. In tactical FPS titles (e.g., CS2, Valorant, Apex Legends), rapid inventory management, shield-swapping, and weapon looting demand sub-300 ms drag-and-drop precision. In MOBAs and RTS titles (e.g., League of Legends, StarCraft II), precise marquee box selection and minimap steering dictate operational APM.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do professional UI/UX designers and video editors benefit from dragging drills?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Digital artists, CAD engineers, and video editors perform thousands of dragging operations daily—adjusting timeline playheads, trimming keyframes, and manipulating bezier curve anchor handles. Training cursor deceleration and release accuracy reduces repetitive strain and eliminates tedious micro-corrections.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is drag accuracy and combo multiplier calculated in this drill?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Accuracy is computed in real time as the total successful container drops divided by total drop attempts. Sustaining consecutive on-target drops increments an active combo multiplier up to 3.0x bonus points. Dropping outside the moving bucket boundary or letting the container timer expire resets the combo streak to zero.',
      },
    },
    {
      '@type': 'Question',
      name: 'What hardware settings optimize cursor deceleration and dragging precision?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Disable Windows mouse acceleration (Enhance Pointer Precision), use raw input with 800–1600 DPI, utilize a control-oriented cloth mousepad that provides predictable dynamic friction, and maintain a 1000 Hz+ mouse polling rate to eliminate position quantization jitter.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much daily drag and drop practice is recommended for muscle memory?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A structured 10 to 15 minute daily routine consisting of 4 to 6 continuous 45-second sessions is optimal. Focused brief training prevents neuromuscular forearm fatigue and tunnel syndrome while inducing neuroplastic stabilization of fine motor pathways.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Mouse Drag and Drop Precision and Deceleration',
  description: 'Master fine motor dragging control, cursor braking, and release timing using the SkillDrills Drag & Drop Mouse Trainer.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Acquire Payload Object',
      text: 'Position your crosshair over the stationary blue ball payload and press down the primary mouse switch to engage dragging mode.',
    },
    {
      '@type': 'HowToStep',
      name: 'Steer Along Optimal Vector',
      text: 'Transport the payload across the canvas stage toward the moving bucket container, maintaining smooth acceleration and minimizing lateral trajectory wobble.',
    },
    {
      '@type': 'HowToStep',
      name: 'Decelerate and Match Velocity',
      text: 'Apply antagonist forearm braking to decelerate the cursor as it nears the container boundary, compensating for the target\'s movement direction.',
    },
    {
      '@type': 'HowToStep',
      name: 'Release Cleanly Inside Target Boundary',
      text: 'Release the mouse button cleanly while the payload is fully contained within the hollow bucket rim to score points and build your combo multiplier.',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'mackenzie1991', 'fitts1954', 'elliott2010', 'woods2015'),
  intro: {
    title: 'The Biomechanics of Dragging, Steering, and Sensorimotor Deceleration',
    paragraphs: [
      'In human-computer interaction, continuous dragging represents a fundamentally distinct neuromuscular challenge compared to point-and-click targeting. While discrete pointing is governed by Fitts\'s Law (Fitts, 1954), dragging requires sustained isometric co-contraction of digit flexor muscles to keep the mouse switch depressed while simultaneously coordinating multiaxial limb translation across a physical surface.',
      'In their seminal empirical evaluation, MacKenzie, Sellen, and Buxton (1991) proved that dragging tasks suffer an inherent throughput penalty of 15% to 25% relative to discrete pointing. The continuous downward force alters the frictional coefficient between mouse skate skates and the mousepad, restricts fine finger articulation, and elevates neuromuscular motor noise.',
      'Furthermore, Johnny Accot and Shumin Zhai (1997) formulated the Steering Law to mathematically describe trajectory-constrained motor performance: movement time scales with the integral of distance over tunnel width along the entire trajectory. In dynamic dragging tasks, users must continually balance forward momentum against the necessity of decelerating within a moving terminal boundary (Elliott et al., 2010), engaging antagonistic muscle groups to prevent overshooting.',
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every target to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same mouse and display rather than against someone else\'s setup. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmarks: {
    title: 'Empirical Dragging & Deceleration Performance Tiers',
    caption: 'An editorial guide to reading your own result, not measured population norms — SkillDrills collects no aggregate data. The steering model follows Accot & Zhai (1997) and the pointing-vs-dragging comparison follows MacKenzie, Sellen & Buxton (1991); the band boundaries are the drill author\'s own judgement.',
    headers: ['Tier', 'Classification', 'Completion Rate / Combo', 'Mean Steering Time', 'Release Accuracy', 'Neuromuscular Profile'],
    rows: [
      [
        'Tier 1',
        'Elite / Pro Designer',
        'Lv. 12–15 (Combo > 18x)',
        '< 420 ms',
        '≥ 98.0%',
        'Smooth bell-shaped velocity profile, optimal deceleration braking, zero premature releases under high velocity.',
      ],
      [
        'Tier 2',
        'Advanced / Competitive',
        'Lv. 9–11 (Combo 12–17x)',
        '420–510 ms',
        '94.0%–97.9%',
        'Controlled deceleration, tight boundary tracking, minor terminal micro-adjustments (< 35 ms).',
      ],
      [
        'Tier 3',
        'Competent / Intermediate',
        'Lv. 6–8 (Combo 7–11x)',
        '511–640 ms',
        '87.0%–93.9%',
        'Slight trajectory overshooting during acceleration phase, noticeable velocity dips prior to container alignment.',
      ],
      [
        'Tier 4',
        'Novice / Developing',
        'Lv. 3–5 (Combo 3–6x)',
        '641–800 ms',
        '78.0%–86.9%',
        'Jerky multi-impulse steering, excessive finger grip tension causing mousepad drag and boundary clip errors.',
      ],
      [
        'Tier 5',
        'Baseline / Novice',
        'Lv. 1–2 (Combo < 3x)',
        '> 800 ms',
        '< 78.0%',
        'Sluggish transport velocity, frequent releases outside container rims, uncoordinated click-hold muscle fatigue.',
      ],
    ],
  },
  protocols: {
    title: 'How to train dragging accuracy',
    items: [
      {
        title: 'Protocol 1: Isometric Grip Force Stabilization (Levels 1–4)',
        description: 'Focus exclusively on maintaining minimal, relaxed downward switch pressure during mouse translation. Over-gripping the mouse switch stiffens the wrist flexors and induces high-frequency tremors. Aim for a feather-light click hold while executing smooth, deliberate transport strokes.',
      },
      {
        title: 'Protocol 2: Accot-Zhai Steering Tunnel Calibration (Levels 5–8)',
        description: 'Minimize spatial path deviation between payload pickup and the target container. Visualize an imaginary straight-line tunnel connecting the two coordinates; consciously eliminate lateral arc swings and zig-zag corrections to maximize steering throughput and conserve session time.',
      },
      {
        title: 'Protocol 3: Antagonist Deceleration & Release Braking (Levels 9–12)',
        description: 'Train deliberate cursor deceleration by engaging forearm extensor muscles 50 ms before crossing into the moving container boundary. Coordinate the mechanical switch release with the exact spatial apex of container transit to avoid trailing drops.',
      },
      {
        title: 'Protocol 4: Dynamic Lead-Angle Velocity Interception (Levels 13–15)',
        description: 'When target containers accelerate at high levels, steer your cursor toward the predicted interception intercept rather than the container\'s instantaneous position. Calculate a predictive lead angle to drop the payload smoothly into the container\'s future path.',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Drag & Drop Motor Control',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function DragAndDropPage() {
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
      <DragAndDropClient />
      <DrillGuide {...guideProps} />
    </>
  );
}
