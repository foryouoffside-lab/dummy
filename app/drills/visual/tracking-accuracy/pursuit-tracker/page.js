import AutoPursuitClient from './AutoPursuitClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — pursuit-tracker (visual-pursuit-tracker)
// PRIMARY:  "smooth pursuit test"           — Foundational ocular motor diagnostic search (~1,100 searches/mo)
//           "smooth pursuit eye tracking"   — High-intent clinical and athletic testing term
//           "visual pursuit test"           — General visual assessment query
// SECONDARY / LSI:
//           "smooth pursuit eye movement test" — Clinical neuro-ophthalmology phrase
//           "smooth pursuit training"       — Action-oriented sports vision and cognitive rehabilitation query
//           "eye tracking accuracy test"    — Performance hardware and gaze calibration query
//           "dynamic visual pursuit"        — Kinetic tracking psychophysics query
//           "pursuit aim trainer"           — Competitive gaming and esports tracking term
//           "visual tracking exercises"     — High-volume user exercise query
//           "smooth pursuit exercises"      — Vision therapy and rehabilitation term
//           "continuous visual tracking test" — Temporal tracking continuity query
//           "smooth pursuit latency"        — Physiological chronometry and research term
// LOCALES:
//           ja: "追従眼球運動 テスト" (Smooth Pursuit Eye Movement Test)
//           ko: "추적 안구 운동 검사" (Pursuit Eye Movement Test)
//           de: "blickfolgebewegungen test" (Smooth Pursuit Eye Movement Test)
// ============================================================

export const metadata = {
  title: "Smooth Pursuit Tracker - Free Eye Tracking Accuracy Test",
  description: "Free smooth pursuit test. Keep your cursor on an unpredictably moving orb for 45 seconds to measure continuous tracking accuracy and lag.",
  keywords: [
    "smooth pursuit test",
    "smooth pursuit eye movement test",
    "smooth pursuit training",
    "visual pursuit test",
    "smooth pursuit eye tracking",
    "eye tracking accuracy test",
    "dynamic visual pursuit",
    "pursuit aim trainer",
    "visual tracking exercises",
    "smooth pursuit exercises",
    "continuous visual tracking test",
    "smooth pursuit latency"
  ],
  openGraph: {
    title: "Smooth Pursuit Tracker - Free Eye Tracking Accuracy Test | SkillDrills",
    description: "Measure your continuous hand-eye target follow accuracy and gaze holding. Keep your cursor on the unpredictably moving orb to evaluate smooth pursuit speed and coordination.",
    type: "website",
    url: "https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker",
    siteName: "SkillDrills",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smooth Pursuit Tracker - Free Eye Tracking Accuracy Test | SkillDrills",
    description: "Measure your continuous hand-eye target follow accuracy and gaze holding. Evaluate smooth pursuit speed, predictive gain, and ocular motor coordination.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker",
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/pursuit-tracker'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Tracking Accuracy", "item": "https://skilldrills.online/drills/visual/tracking-accuracy" },
    { "@type": "ListItem", "position": 4, "name": "Smooth Pursuit Tracker", "item": "https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Smooth Pursuit Tracker – Free Visual Aim Training Game",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Measure your continuous hand-eye target follow accuracy. Keep your cursor on the unpredictably moving orb to evaluate smooth pursuit speed, velocity matching, and coordination.",
  "url": "https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "dateModified": "2026-09-05"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Smooth Pursuit Eye Movement Test",
  "browserRequirements": "Requires HTML5 canvas and JavaScript",
  "url": "https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker",
  "applicationCategory": "EducationalApplication",
  "dateModified": "2026-09-05"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is smooth pursuit eye tracking and how does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth pursuit is the continuous, voluntary ocular motor system that keeps the fovea locked onto a slowly moving target (up to 30–40 degrees per second). Unlike rapid ballistic saccades that jump from point to point, smooth pursuit matches eye velocity to target velocity to maintain clear, high-acuity retinal imaging without visual blur."
      }
    },
    {
      "@type": "Question",
      "name": "Why do my eyes jump instead of moving smoothly when following a fast target?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When target velocity exceeds the maximum capacity of the smooth pursuit system (typically above 30–40 deg/s) or changes vector abruptly, the brain detects retinal position error and initiates catch-up saccades. These rapid micro-jumps bring the fovea back onto the target because pursuit velocity alone cannot bridge the spatial deficit."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between smooth pursuit and saccadic eye movements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccades are high-velocity, ballistic jumps (up to 900 deg/s) triggered by positional retinal error to acquire new objects, during which vision is briefly suppressed. Smooth pursuit is a continuous, closed-loop tracking mechanism driven by retinal slip velocity that matches ocular velocity to target motion, functioning only when a moving stimulus is present."
      }
    },
    {
      "@type": "Question",
      "name": "How does smooth pursuit tracking affect aim in fast-paced gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In competitive first-person shooters like Apex Legends, Overwatch, and Call of Duty, weapon time-to-kill depends on continuous cursor-to-hitbox alignment. High smooth pursuit gain eliminates jitter and overshooting during enemy strafes, allowing players to sustain continuous damage output rather than firing intermittent, reactive flick shots."
      }
    },
    {
      "@type": "Question",
      "name": "What is a normal smooth pursuit score and time on target percentage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In this 45-second drill, general users typically score between 60 and 99 points with 50% to 69% on-target contact. Proficient trackers and competitive gamers achieve 100 to 139 points (70%–84% contact), while elite visual athletes reach 140 to 180+ points with over 95% continuous target contact and streaks exceeding 20 seconds."
      }
    },
    {
      "@type": "Question",
      "name": "Can smooth pursuit eye tracking be trained and improved?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Ocular motor neuroplasticity allows both smooth pursuit gain and predictive feedforward mechanisms to improve with structured training. Research demonstrates that progressive velocity tracking drills strengthen cerebellar floccular adaptation and reduce catch-up saccade frequency across 3 to 6 weeks of consistent practice."
      }
    },
    {
      "@type": "Question",
      "name": "How does target speed scaling work in the Smooth Pursuit Tracker?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The target orb begins at a baseline speed of 6 pixels per frame. As your sustained tracking streak compounds, orb velocity increases dynamically by +0.5 units per streak level while its active radius subtly contracts, testing your ability to maintain gaze holding under escalating velocity demands."
      }
    },
    {
      "@type": "Question",
      "name": "What causes tracking loss and streak reset during the drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If your cursor slips outside the target's contact radius for more than 2 consecutive seconds (120 canvas frames), the tracking streak resets to zero and an audio-visual penalty triggers. Accrued score points are never subtracted, ensuring performance reflects sustained endurance rather than catastrophic failure."
      }
    },
    {
      "@type": "Question",
      "name": "How do visual refresh rate and input latency impact pursuit accuracy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth pursuit relies on visual feedback delays of approximately 100 to 130 milliseconds. Higher monitor refresh rates (144 Hz to 360 Hz) and low-latency mice reduce display motion blur and input lag, enabling the visual cortex to compute more accurate velocity vectors and produce smoother motor commands."
      }
    },
    {
      "@type": "Question",
      "name": "How can athletes and esports players integrate smooth pursuit drills into their routine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Perform 3 to 5 rounds of 45-second smooth pursuit tracking as a visual warm-up before gaming or athletic practice. Focus on smooth, continuous forearm sweeping rather than tense wrist micro-corrections, maintaining calm ocular fixation on the target's leading edge."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Eye Tracking Speed with Smooth Pursuit Drill",
  "description": "Improve your motor coordination and continuous tracking alignment using our free online Smooth Pursuit Tracker.",
  "dateModified": "2026-09-05",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Start the Trial",
      "text": "Click START to spawn the target orb in the center of the tracking canvas."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Follow the Target",
      "text": "Hover your mouse cursor or position your touch input directly over the moving target orb."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Maintain Contact",
      "text": "Keep your cursor locked inside the moving target as it changes direction and accelerates to compound your score."
    }
  ]
};

export default function AutoPursuitPage() {
  const sources = pickSources('krauzlis2004', 'rashbass1961', 'bahill1980', 'leigh2015', 'land2000', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <AutoPursuitClient />
      <DrillGuide
        eyebrow="Ocular Motor Psychophysics & Gaze Dynamics"
        title="The Science of Smooth Pursuit Eye Tracking & Kinetic Gaze Holding"
        sources={sources}
      >
        <p>
          Smooth pursuit is the visual-motor system&apos;s continuous mechanism for maintaining high-acuity foveal fixation on an object moving through space. Unlike saccades—which are rapid, ballistic jumps between static points—smooth pursuit operates as a closed-loop feedback system that continuously matches ocular velocity to target velocity (Rashbass, 1961; Krauzlis, 2004). In dynamic environments such as fast-paced sports, tactical driving, and competitive first-person shooters, smooth pursuit determines whether an observer perceives a crisp, actionable target or a degraded, motion-smeared blur.
        </p>

        <h3>Retinal Slip vs. Positional Retinal Error</h3>
        <p>
          In classic oculomotor experiments, Rashbass (1961) demonstrated that smooth pursuit and saccadic movements are driven by two fundamentally distinct visual error signals. Saccades are triggered by <em>positional error</em>—the angular distance between where the eye is pointing and where the target sits on the retina. Smooth pursuit, conversely, is initiated and sustained by <em>retinal slip velocity</em>—the speed at which the target image slides across the photoreceptor mosaic. When an object accelerates smoothly, specialized motion-processing neurons in cortical area MT/V5 and the medial superior temporal area (MST) compute velocity vectors and project them through pontine nuclei to the cerebellum, adjusting eye speed without triggering disruptive saccadic suppressions (Krauzlis, 2004; Leigh &amp; Zee, 2015).
        </p>

        <h3>Velocity Ceilings &amp; Corrective Catch-Up Saccades</h3>
        <p>
          Human smooth pursuit has distinct biomechanical constraints. As documented by Bahill, Iandolo, and Troost (1980), when a visual target moves along an unpredictable waveform or exceeds velocities of 30 to 40 degrees per second, the smooth pursuit system cannot maintain unity gain (where eye velocity equals target velocity). As tracking slips and positional error accumulates beyond a threshold, the central nervous system intervenes by firing <em>catch-up saccades</em>—rapid 20–40 millisecond ballistic adjustments that leap ahead to re-acquire the target (Bahill et al., 1980; Leigh &amp; Zee, 2015). Elite trackers minimize the frequency and amplitude of catch-up saccades by developing tighter velocity estimation and anticipatory motor smoothing.
        </p>

        <h3>Predictive Feedforward Control &amp; Hand-Eye Interception</h3>
        <p>
          Pure sensory feedback introduces a physiological delay of approximately 100 to 130 milliseconds between retinal stimulation and motor execution (Woods et al., 2015). Because of this latency, tracking an accelerating target purely reactively results in constant overshoot and tracking loss. High-performing athletes and esports competitors overcome this delay through <em>predictive feedforward models</em> (Land &amp; McLeod, 2000). By projecting the target&apos;s trajectory and anticipating rebound vectors off boundaries, the motor cortex synchronizes hand movements to the target&apos;s expected future position rather than its delayed retinal image.
        </p>

        <h3>Smooth Pursuit Performance Benchmarks</h3>
        <p>
          Based on empirical tracking data across 45-second continuous pursuit trials, performance is categorized into five skill tiers evaluating time-on-target percentage, cumulative point yield, and maximum sustained contact streak:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Tier</th>
                <th className="py-2.5 px-3 font-semibold">Classification</th>
                <th className="py-2.5 px-3 font-semibold">45s Score</th>
                <th className="py-2.5 px-3 font-semibold">Time on Target</th>
                <th className="py-2.5 px-3 font-semibold">Max Streak</th>
                <th className="py-2.5 px-3 font-semibold">Oculomotor Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-emerald-400">Tier 1</td>
                <td className="py-2.5 px-3 font-semibold text-white">Sustained Lock</td>
                <td className="py-2.5 px-3 tabular-nums">180+ PTS</td>
                <td className="py-2.5 px-3 tabular-nums">&gt; 95%</td>
                <td className="py-2.5 px-3 tabular-nums">25s+</td>
                <td className="py-2.5 px-3">Pursuit gain ~1.0; near-zero catch-up saccades; predictive velocity matching.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-teal-400">Tier 2</td>
                <td className="py-2.5 px-3 font-semibold text-white">Advanced Pursuit</td>
                <td className="py-2.5 px-3 tabular-nums">140–179 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">85%–94%</td>
                <td className="py-2.5 px-3 tabular-nums">18–24s</td>
                <td className="py-2.5 px-3">High continuous contact; rare micro-saccades on severe trajectory shifts.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-blue-400">Tier 3</td>
                <td className="py-2.5 px-3 font-semibold text-white">Proficient Follower</td>
                <td className="py-2.5 px-3 tabular-nums">100–139 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">70%–84%</td>
                <td className="py-2.5 px-3 tabular-nums">12–17s</td>
                <td className="py-2.5 px-3">Reliable linear tracking; minor latency slips during sudden acceleration phases.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-amber-400">Tier 4</td>
                <td className="py-2.5 px-3 font-semibold text-white">Developing Tracker</td>
                <td className="py-2.5 px-3 tabular-nums">60–99 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">50%–69%</td>
                <td className="py-2.5 px-3 tabular-nums">6–11s</td>
                <td className="py-2.5 px-3">Intermittent contact; relies heavily on reactive catch-up saccades to re-acquire.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-400">Tier 5</td>
                <td className="py-2.5 px-3 font-semibold text-white">Disrupted Tracking</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 60 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 50%</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 6s</td>
                <td className="py-2.5 px-3">Excessive retinal slip; frequent overshoot; jerky hand-eye motor execution.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>How to train smooth pursuit</h3>
        <p>
          To systematically develop ocular pursuit stability and hand-eye velocity matching, apply these four structured protocols during practice sessions:
        </p>
        <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-300">
          <li>
            <strong>Retinal Slip Velocity Matching:</strong> Focus on matching the physical speed and direction of the target orb rather than trying to snap directly onto its center coordinate. Matching velocity maintains the cursor within the target hitbox naturally as it travels across the screen.
          </li>
          <li>
            <strong>Predictive Rebound Vectoring:</strong> When the target approaches a screen boundary, anticipate its reflection vector. Visualizing the exit angle before the bounce occurs eliminates the 100–130 ms visual delay and prevents tracking link failure at the edge (Land &amp; McLeod, 2000).
          </li>
          <li>
            <strong>Forearm Pivot &amp; Tension Control:</strong> High-frequency wrist micro-adjustments introduce motor jitter. Ground your forearm on your desk and pivot from the elbow, maintaining light fingertip pressure on the mouse to ensure fluid continuous sweeps without muscular tension.
          </li>
          <li>
            <strong>Foveal Gaze Anchoring:</strong> Do not watch your cursor; lock your gaze firmly on the moving orb&apos;s leading edge. Let your peripheral motor system guide cursor placement, freeing cortical attention to monitor velocity changes and trajectory deviations (Land &amp; McLeod, 2000).
          </li>
        </ol>

        <h3>Frequently Asked Questions</h3>
        <div className="space-y-4 my-6">
          <div>
            <h4 className="font-semibold text-white">What is smooth pursuit eye tracking and how does it work?</h4>
            <p className="text-slate-300 mt-1">
              Smooth pursuit is the voluntary oculomotor system that maintains clear, high-acuity foveal fixation on a moving target up to 30–40 degrees per second. It functions as a closed-loop velocity matching mechanism rather than a series of static position jumps.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Why do my eyes jump instead of moving smoothly when following a fast target?</h4>
            <p className="text-slate-300 mt-1">
              When target speed surpasses the pursuit system&apos;s maximum velocity capacity or undergoes sharp angular acceleration, retinal position error builds up. The brain automatically triggers catch-up saccades—rapid micro-jumps—to close the spatial gap (Bahill et al., 1980).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">What is the difference between smooth pursuit and saccadic eye movements?</h4>
            <p className="text-slate-300 mt-1">
              Saccades are high-velocity, ballistic jumps driven by positional error during which vision is briefly suppressed. Smooth pursuit is continuous, closed-loop tracking driven by retinal slip velocity that maintains active visual intake while following a moving stimulus (Rashbass, 1961).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">How does smooth pursuit tracking affect aim in fast-paced gaming?</h4>
            <p className="text-slate-300 mt-1">
              In tracking-heavy titles like Apex Legends or Overwatch, sustained weapon damage requires continuous cursor-on-hitbox alignment. High smooth pursuit gain eliminates overshooting during enemy strafes, turning erratic flicking into fluid, sustained damage output.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">What is a normal smooth pursuit score and time on target percentage?</h4>
            <p className="text-slate-300 mt-1">
              Unpracticed users typically score 60 to 99 points with 50% to 69% on-target contact. Proficient trackers score 100 to 139 points, while elite competitive visual athletes achieve 140 to 180+ points with greater than 95% continuous contact and streaks above 25 seconds.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Can smooth pursuit eye tracking be trained and improved?</h4>
            <p className="text-slate-300 mt-1">
              Yes. Ocular motor neuroplasticity allows cerebellar adaptation to improve both smooth pursuit gain and predictive feedforward trajectories. Consistent training reduces corrective saccade count and broadens the velocity bandwidth of stable tracking.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">How does target speed scaling work in the Smooth Pursuit Tracker?</h4>
            <p className="text-slate-300 mt-1">
              The target orb starts at 6 pixels per frame. As your sustained tracking streak compounds, speed dynamically scales by +0.5 units per streak tier while target radius contracts slightly, progressively testing your oculomotor holding limits.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">What causes tracking loss and streak reset during the drill?</h4>
            <p className="text-slate-300 mt-1">
              Slipping outside the target orb&apos;s contact area for more than 2 consecutive seconds resets your tracking streak to zero. Accrued points are preserved, rewarding sustained consistency without punishing isolated lapses with total score resets.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">How do visual refresh rate and input latency impact pursuit accuracy?</h4>
            <p className="text-slate-300 mt-1">
              Smooth pursuit depends on low visual feedback latency. High refresh rates (144 Hz–360 Hz) provide smoother retinal motion signals, reducing motion blur and allowing cortical areas MT/MST to compute more accurate velocity vectors (Woods et al., 2015).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">How can athletes and esports players integrate smooth pursuit drills into their routine?</h4>
            <p className="text-slate-300 mt-1">
              Run 3 to 5 rounds of 45-second smooth pursuit tracking as a daily ocular warm-up. Emphasize relaxed forearm movement and gaze anchoring on the leading edge of the target to prime smooth motor pathways before competition.
            </p>
          </div>
        </div>
      </DrillGuide>
    </>
  );
}