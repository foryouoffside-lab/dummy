import PrecisionFlickShotClient from './PrecisionFlickShotClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — precision-flick-shot (motor-precision-flick-shot)
// PRIMARY:  "mouse accuracy test"         — Core benchmark / dexterity query (~3,600 searches/mo)
//           "precision flick shot"        — Direct tactical gamer training query
// SECONDARY / LSI:
//           "flick aim trainer"           — Core competitive FPS drill term
//           "flick shot test"             — Assessment query
//           "micro flick trainer"         — Precision targeting term
//           "mouse flick practice"        — Habitual skill drill search
//           "flick aim drill"             — Practical mechanical routine query
//           "target acquisition test"     — Reaction and tracking assessment
//           "bullseye aim test"           — Center-click accuracy search
//           "mouse click accuracy test"   — Timing and click accuracy query
//           "fps flick practice"          — Game-specific training phrase
//           "deceleration aim test"       — Stopping power chronometry query
// LOCALES:
//           ja: "フリック エイム 練習" (Flick Aim Practice / Mouse Accuracy Test)
//           ko: "플릭 에임 연습" (Flick Aim Practice / Mouse Accuracy Test)
//           de: "maus zielgenauigkeit test" (Mouse Target Accuracy Test)
// ============================================================

export const metadata = {
  title: 'Mouse Accuracy Test – Precision Flick Shot | SkillDrills',
  description: 'Free mouse accuracy test. Measure flick precision, target acquisition time and bulls-eye hit rate against the two-phase model of rapid aimed movement.',
  keywords: [
    'mouse accuracy test',
    'precision flick shot',
    'flick aim trainer',
    'flick shot test',
    'micro flick trainer',
    'mouse flick practice',
    'flick aim drill',
    'target acquisition test',
    'bullseye aim test',
    'mouse click accuracy test',
    'fps flick practice',
    'deceleration aim test',
    'free flick trainer',
  ],
  openGraph: {
    title: 'Mouse Accuracy Test – Precision Flick Shot | SkillDrills',
    description: 'Test mouse flick accuracy, target acquisition latency, and bulls-eye center precision with this free online flick trainer. Free, instant browser-based tool.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mouse Accuracy Test – Precision Flick Shot | SkillDrills',
    description: 'Test mouse flick accuracy, target acquisition latency, and bulls-eye center precision with this free online flick trainer. Free, instant browser-based tool.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/precision-flick-shot'),
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
    { '@type': 'ListItem', position: 4, name: 'Precision Flick Shot', item: 'https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Mouse Accuracy Test – Precision Flick Shot Trainer',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based flick aim trainer and mouse accuracy test. Test ballistic snapping velocity, center bulls-eye precision, and deceleration control with dynamic level progression.',
  url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-16',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Precision Flick Shot',
  browserRequirements: 'Requires HTML5 Canvas, Pointer Lock API, and JavaScript',
  url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot',
  applicationCategory: 'EducationalApplication',
  dateModified: '2026-09-16',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Mouse Accuracy Test – Precision Flick Shot Trainer',
  url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot',
  description: 'Measure flick precision, target acquisition latency, and bulls-eye accuracy against the two-phase model of rapid aimed movement.',
  genre: ['Shooting Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-16',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Precision Flick Shot drill and how does it test mouse accuracy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Precision Flick Shot is an interactive motor psychophysics drill measuring ballistic cursor flick velocity, target acquisition latency, and center bulls-eye accuracy. Observers acquire rapidly decaying circular targets across an expansive canvas, requiring immediate target prioritization and precise cursor braking.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Stochastic Optimized Submovement Model in flick aiming?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Formulated by David E. Meyer et al. (1988), the model states that rapid aimed movements consist of an initial ballistic primary submovement followed by optional feedback-guided corrective submovements. If neuromuscular noise in the primary stroke causes the cursor to miss the target region, a secondary submovement is executed, dramatically increasing total movement time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does bulls-eye scoring improve aiming mechanics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard aim trainers reward any contact within the outer target perimeter, reinforcing sloppy endpoint distributions. Awarding double bonus points (+200 PTS) for landing within the 8-pixel center core forces the motor system to minimize endpoint variance, translating directly to consistent headshot accuracy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do players over-flick or under-flick targets in tactical shooters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Over-flicking occurs when antagonist braking muscle groups fail to arrest limb momentum before the target boundary. Under-flicking occurs when players decelerate prematurely due to visual uncertainty. Consistent training under fixed sensitivity calibrates open-loop ballistic motor programs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does target decay rate challenge visual prioritization?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With two targets concurrently active on screen, players must execute rapid visual saccades to assess relative expiration timers. Prioritizing the target with the least remaining lifespan trains divided attention and cognitive task switching under strict temporal deadlines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does flick shot training transfer directly to CS2 and Valorant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. First-shot accuracy in tactical shooters relies on rapid micro-flicks from pre-aimed angles to enemy head hitboxes. Conditioning single-impulse ballistic snaps eliminates secondary corrective jitter during critical opening duels.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the ideal mouse sensitivity and DPI for flick training?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A sensitivity ranging between 30 cm and 45 cm per 360-degree rotation (equivalent to 800 DPI with 0.35–0.50 in Valorant or 1.1–1.6 in CS2) offers the optimal biomechanical balance between large forearm sweeping speed and fine wrist micro-flick precision.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is flick accuracy and session grading calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Accuracy represents total target hits divided by total clicks attempted. The system also tracks total bulls-eye center hits, peak combo streak, and highest level attained, assigning a comprehensive letter grade from D to S+ based on standardized throughput curves.',
      },
    },
    {
      '@type': 'Question',
      name: 'What hardware optimizations improve flick shot responsiveness?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use a high-refresh monitor (144 Hz or higher) to minimize display quantization delays (Woods et al., 2015), disable Windows Enhance Pointer Precision to guarantee 1:1 raw input mapping, and select an ultra-lightweight gaming mouse (under 65g) to reduce physical limb inertia.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often should I train precision flicking for optimal gains?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 10 to 15 minute daily routine prior to competitive play provides peak neural priming. Brief, highly focused sessions prevent neuromuscular fatigue and tendon strain while reinforcing long-term potentiation in motor cortex synapses.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Precision Mouse Flick Shots and Micro-Flick Accuracy',
  description: 'Step-by-step methodology to master ballistic mouse flicks, bulls-eye center targeting, and deceleration control.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Calibrate Crosshair and Sensitivity',
      text: 'Match your mouse sensitivity to your primary competitive title in Session Settings and center your vision on the stage crosshair.',
      url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Identify and Prioritize Spawning Target',
      text: 'Scan the canvas for target emergence, evaluating decay rings to engage the target closest to expiration first.',
      url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Execute Single-Impulse Ballistic Flick',
      text: 'Snap your mouse directly toward the target center in a single swift motion, avoiding jerky multi-step micro-corrections.',
      url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Brake Firmly and Eliminate Residual Drift',
      text: 'Recruit antagonist wrist muscles to arrest mouse momentum dead on the bulls-eye before clicking to guarantee center-mass registration.',
      url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot#step-4'
    },
  ],
};

const guideProps = {
  sources: pickSources('meyer1988', 'fitts1954', 'mackenzie1992', 'elliott2010', 'woodworth1899', 'woods2015'),
  intro: {
    title: 'The Biomechanics of Ballistic Micro-Flicks and Submovement Optimization',
    paragraphs: [
      'In competitive marksmanship and human-computer interaction, a flick shot is a high-velocity, discrete manual aiming movement executed under extreme time constraints. Robert S. Woodworth (1899) first established that goal-directed movements operate via a dual-phase control architecture: an initial ballistic impulse that propels the limb toward the target, followed by a current control phase where visual feedback guides terminal adjustments.',
      'In their seminal theoretical framework, David E. Meyer et al. (1988) formulated the Stochastic Optimized Submovement Model. They proved that human motor output is subject to neural noise proportional to movement velocity. When players flick too fast, primary movement endpoint scatter increases. If the primary impulse lands outside the target boundaries, a costly secondary corrective submovement (~150–200 ms latency) must be triggered.',
      'To achieve elite flicking throughput (MacKenzie, 1992), aimers must calibrate their ballistic impulse velocity so that the primary movement distribution falls reliably within target confines. By rewarding inner bulls-eye center hits, this drill trains the sensorimotor system to tighten endpoint distribution dispersion and minimize corrective deceleration submovements.',
      'The distance-versus-size trade-off behind a flick is Fitts\'s Law: movement time grows with the log of the distance to a target divided by its width (Fitts, 1954). The modern synthesis of the two-phase account — one ballistic impulse followed by visually guided correction, and the many processes that feed it — is Elliott et al. (2010).',
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every target to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same mouse and display rather than against someone else\'s setup. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmarks: {
    title: 'Empirical Flick Shot and Mouse Accuracy Performance Tiers',
    caption: 'An editorial guide to reading your own result, not measured population norms — SkillDrills collects no aggregate data. The two-phase movement model follows Woodworth (1899) and Meyer et al. (1988); the band boundaries are the drill author\'s own judgement.',
    headers: ['Tier', 'Classification', 'Level / Combo Streak', 'Mean Acquisition Latency', 'Click Accuracy', 'Bulls-eye Ratio', 'Neuromuscular Profile'],
    rows: [
      [
        'Tier 1',
        'Apex Flick Master',
        'Lv. 15+ (Combo > 20x)',
        '< 340 ms',
        '≥ 96.0%',
        '> 65%',
        'Pure single-impulse ballistic trajectories, near-zero secondary submovements, sub-10 ms antagonist braking.',
      ],
      [
        'Tier 2',
        'Elite Gunfighter',
        'Lv. 11–14 (Combo 14–19x)',
        '340–420 ms',
        '91.0%–95.9%',
        '45%–64%',
        'Sharp foveal verification, micro-corrective secondary submovement < 30 ms, minimal trajectory drift.',
      ],
      [
        'Tier 3',
        'Competent Marksman',
        'Lv. 7–10 (Combo 8–13x)',
        '421–520 ms',
        '84.0%–90.9%',
        '25%–44%',
        'Frequent outer-ring hits, slight overshooting during rapid target transitions, occasional double-clicking.',
      ],
      [
        'Tier 4',
        'Developing Fragger',
        'Lv. 4–6 (Combo 4–7x)',
        '521–660 ms',
        '74.0%–83.9%',
        '10%–24%',
        'Multi-impulse jerky corrections, elevated endpoint variance from over-accelerating, hesitation before release.',
      ],
      [
        'Tier 5',
        'Baseline / Novice',
        'Lv. 1–3 (Combo < 4x)',
        '> 660 ms',
        '< 74.0%',
        '< 10%',
        'Under-shooting, frequent misses, slow target reacquisition latency, uncoordinated wrist-arm transitions.',
      ],
    ],
  },
  protocols: {
    title: 'How to train flick accuracy',
    items: [
      {
        title: 'Protocol 1: Primary Ballistic Impulse Calibration (Levels 1–4)',
        description: 'Prioritize a single smooth flick over rushing. Eliminate stuttering hesitation or mid-flight pauses. Commit to your primary ballistic trajectory and rely on open-loop motor memory to land within the outer target perimeter.',
      },
      {
        title: 'Protocol 2: Meyer Stochastic Submovement Minimization (Levels 5–8)',
        description: 'Consciously aim for the inner 8-pixel center bulls-eye core. Aiming for a smaller virtual target forces the motor cortex to suppress motor noise, narrowing your overall shot distribution and preventing near-miss edge clicks.',
      },
      {
        title: 'Protocol 3: Dual-Target Priority Sequencing (Levels 9–12)',
        description: 'When two targets spawn simultaneously, utilize rapid peripheral vision to evaluate expiration timers. Acquire and eliminate the older, higher-decay target first before snapping across the screen to the newly spawned target.',
      },
      {
        title: 'Protocol 4: Antagonist Deceleration & Overflick Braking (Levels 13–15)',
        description: 'At extreme speeds, actively recruit antagonist wrist extensor muscles to brake the mouse precisely over the target center. Practice hard stops on target coordinates to prevent momentum over-sliding.',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Flick Aiming and Accuracy',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const copyEn = {
  title: "Precision Flick Shot",
  subtitle: "Target Decay & Bulls-Eye Micro-Flicks • Endless Level Progression",
  startButtonText: "START DRILL",
  playAgainText: "Play Again",
  shareText: "Share Score",
  exitText: "Exit",
  accuracyLabel: "Accuracy",
  targetHitsLabel: "Target Hits",
  bullseyesLabel: "Bulls-eyes",
  peakLevelLabel: "Peak Level",
  rulesTitle: "Drill Instructions & Scoring System",
  rulesItems: [
    { num: "1", text: "Bullseye Hit", highlight: "+200 PTS / +0.6s", result: "Inner Core Shot Precision" },
    { num: "2", text: "Standard Hit", highlight: "+100 PTS / +0.6s", result: "Rapid Peripheral Target Acquisition" },
    { num: "3", text: "Level Progression", highlight: "+1 Level / 1400 PTS", result: "Targets Shrink & Decay Faster" },
    { num: "4", text: "Miss & Timeout", highlight: "Combo Reset", result: "Penalty Deducts -0.8s" }
  ],
};

export default function PrecisionFlickShotPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <PrecisionFlickShotClient copy={copyEn} />
      <DrillGuide {...guideProps} />
      <DrillFooter />
    </>
  );
}
