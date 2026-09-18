import RhythmAnomalyClient from './RhythmAnomalyClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — rhythm-anomaly (visual-rhythm-anomaly)
// PRIMARY:  "visual timing test"             — Foundational temporal psychophysics search (~1,100 searches/mo)
//           "temporal discrimination test"   — Clinical neurological and perceptual test term
//           "visual rhythm test"             — Action-oriented rhythm drill search
// SECONDARY / LSI:
//           "flicker detection test"         — Critical flicker fusion and sensitivity search
//           "pulse detection test"           — Visual frequency perception term
//           "visual temporal perception"     — Neurocognitive vision research phrase
//           "critical flicker frequency test"— Standard psychophysical CFF assessment
//           "temporal visual acuity"         — High-precision time-domain vision term
//           "visual rhythm drill"            — Interactive training query
//           "visual anomaly detection"       — Pattern and motion mismatch identification
//           "temporal processing test"       — Cognitive timing and chronometry query
//           "visual flicker test"            — Medical and perceptual flicker test
// LOCALES:
//           ja: "視覚リズム テスト" (Visual Rhythm Test)
//           ko: "시각 리듬 검사" (Visual Rhythm Test)
//           de: "visueller rhythmus test" (Visual Rhythm Test)
// ============================================================

export const metadata = {
  title: "Visual Timing Test - Free Rhythm Anomaly Detection Drill",
  description: "Free visual timing test. Spot the one cell out of phase in a 6x6 pulsing matrix to measure how finely you can judge visual rhythm.",
  keywords: [
    "visual timing test",
    "temporal discrimination test",
    "visual rhythm test",
    "flicker detection test",
    "pulse detection test",
    "visual temporal perception",
    "critical flicker frequency test",
    "temporal visual acuity",
    "visual rhythm drill",
    "visual anomaly detection",
    "temporal processing test",
    "visual flicker test"
  ],
  openGraph: {
    title: "Visual Timing Test - Free Rhythm Anomaly Detection Drill | SkillDrills",
    description: "Train visual temporal discrimination, out-of-sync rhythm detection, and peripheral motion perception with this free 36-cell pulsing grid drill.",
    type: "website",
    url: "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly",
    siteName: "SkillDrills",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visual Timing Test - Free Rhythm Anomaly Detection Drill | SkillDrills",
    description: "Train visual temporal discrimination, out-of-sync rhythm detection, and peripheral motion perception with this free 36-cell pulsing grid drill.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly",
    languages: getAlternateLanguages('/drills/visual/visual-recognition/rhythm-anomaly'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Visual Recognition", "item": "https://skilldrills.online/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 4, "name": "Rhythm Anomaly Timing Test", "item": "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Rhythm Anomaly Timing Test – Free Visual Temporal Perception Drill",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free visual rhythm and temporal discrimination drill. 6x6 grid with 36 pulsing cells. Find out-of-sync anomaly cell in endless Time-Attack mode.",
  "url": "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "dateModified": "2026-09-05"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Visual Rhythm Anomaly Test",
  "browserRequirements": "Requires HTML5 canvas and JavaScript",
  "url": "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly",
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
      "name": "What is the Rhythm Anomaly test and what does it measure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Rhythm Anomaly test is an interactive psychophysical assessment that measures visual temporal frequency discrimination. Observers view a 6x6 array of 36 pulsing cells where the background pulses at a baseline frequency, requiring the observer to rapidly detect and select the single cell pulsing at an accelerated, out-of-phase rate."
      }
    },
    {
      "@type": "Question",
      "name": "How does the visual system detect out-of-sync rhythm and temporal frequency differences?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Temporal visual perception is mediated primarily by the magnocellular pathway, which possesses high temporal resolution (up to 40–50 Hz). When one cell pulses at a higher frequency or with phase lead, magnocellular transient neurons in primary visual cortex (V1) fire with distinct phase alignment, generating a salient preattentive motion-energy discrepancy that guides visual attention."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between magnocellular and parvocellular visual pathways in flicker detection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The magnocellular (M) pathway features large receptive fields, high contrast sensitivity, and rapid transient axonal conduction, making it optimized for detecting flicker, motion, and temporal anomalies. The parvocellular (P) pathway features smaller receptive fields and slower conduction, specialized for high spatial resolution, color discrimination, and fine detail."
      }
    },
    {
      "@type": "Question",
      "name": "What is Critical Flicker Frequency (CFF) and how does it relate to visual reaction speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Critical Flicker Frequency (CFF) is the threshold frequency at which an intermittent light stimulus transitions from appearing as a distinct flicker to a continuous, steady glow (typically 35–60 Hz in humans). A higher CFF indicates faster retinal temporal processing and shorter visual integration windows, correlating with superior dynamic visual acuity and faster reaction times."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score on the 36-cell Rhythm Anomaly test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In this 45-second drill, beginners typically score 50 to 99 points (Level 2–3). Competent visual performers achieve 100 to 149 points (Level 4–5), while elite visual athletes and competitive gamers reach 150 to 200+ points (Level 6–8+) with maximum streaks exceeding 10 consecutive detections."
      }
    },
    {
      "@type": "Question",
      "name": "Why does the drill grid pulse faster as your level increases?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As consecutive hits build your speed level, the baseline pulse frequency accelerates and the temporal difference (delta-T) between the anomaly and background tightens. This forces your visual system to operate closer to its temporal resolution ceiling while shrinking reaction timeout windows."
      }
    },
    {
      "@type": "Question",
      "name": "What is the purpose of the entropy scramble background flashes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The entropy scramble randomly illuminates non-target cells to introduce transient visual noise. This prevents users from relying on peripheral flash detection alone, forcing the dorsal visual stream to evaluate genuine rhythmic periodicity rather than isolated luminance blips."
      }
    },
    {
      "@type": "Question",
      "name": "Are there score or time penalties for clicking incorrect cells?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Misclicks and timeouts trigger a brief red flash and reset your current streak, but they never deduct accumulated points or shorten remaining session seconds, encouraging decisive perceptual commitment."
      }
    },
    {
      "@type": "Question",
      "name": "How do refresh rates (60Hz vs 144Hz+) affect visual temporal perception?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 60 Hz display presents frames every 16.7 milliseconds, which can quantize smooth sinusoidal pulse cycles and introduce subtle display stutter. A 144 Hz or 240 Hz monitor provides frame intervals of 6.9 ms to 4.2 ms, rendering cleaner luminance waveforms that enhance temporal frequency discrimination."
      }
    },
    {
      "@type": "Question",
      "name": "How do competitive gamers and athletes benefit from temporal rhythm training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "High-level esports players, baseball batters, and tennis players rely on temporal discrimination to judge projectile speed, opponent animation startup frames, and subtle peripheral movement. Rhythm training sharpens temporal sensitivity and strengthens peripheral motion detection."
      }
    }
  ]
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Rhythm Anomaly Timing Test",
  "url": "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly",
  "description": "Free rhythm anomaly visual timing drill. Detect subtle temporal phase shifts, micro-jitters, and frequency anomalies in pulsing optical streams.",
  "genre": ["Action", "Brain Game", "Timing Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Visual Rhythm and Temporal Anomaly Detection",
  "description": "Master visual timing discrimination, flicker detection, and phase shift recognition using our free Rhythm Anomaly drill.",
  "dateModified": "2026-09-05",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Lock Onto the Pulsing Rhythmic Metronome",
      "text": "Center your gaze on the visual strobe element and observe its rhythmic baseline flashing rate.",
      "url": "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Internalize the Baseline Periodic Cadence",
      "text": "Allow your visual cortex to synchronize with the steady pulse frequency to establish an internal temporal baseline.",
      "url": "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Detect the Temporal Phase Anomaly",
      "text": "Spot any sudden acceleration, hitch, stutter, or phase offset that breaks the established visual tempo.",
      "url": "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Register Immediate Perceptual Commitment",
      "text": "Click or tap immediately upon perceiving the rhythm disruption to log millisecond temporal discrimination latency.",
      "url": "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly#step-4"
    }
  ]
};

export default function RhythmAnomalyPage() {
  const sources = pickSources('holcombe2009', 'kelly1961', 'delange1958', 'burr1980', 'posner1980', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <RhythmAnomalyClient copy={{ title: "Rhythm Anomaly Timing Test" }} />
      <DrillGuide
        eyebrow="Temporal Psychophysics & Visual Chronometry"
        title="The Science of Visual Rhythm, Flicker Fusion & Temporal Frequency Discrimination"
        sources={sources}
      >
        <p>
          While conventional visual acuity tests measure spatial resolution—the ability to resolve fine details across retinal space—the visual system is equally bounded by <em>temporal resolution</em>: the ability to separate visual events in time. In real-world environments, rapid projectile flight, adversary micro-movements, and peripheral hazard detection depend not on static vision, but on how rapidly the visual cortex can sample time-varying luminance signals (De Lange, 1958; Kelly, 1961; Holcombe, 2009).
        </p>

        <h3>Temporal Modulation Transfer &amp; The Magnocellular Pathway</h3>
        <p>
          The primary visual pathway bifurcates into two distinct anatomical streams: the parvocellular (P) pathway and the magnocellular (M) pathway. The magnocellular pathway is populated by large ganglion cells with rapid dendritic integration and thick, myelinated axons projecting to the dorsal stream. Because of their minimal conduction latency, M-pathway neurons excel at processing high temporal frequencies, detecting subtle phase shifts and luminance oscillations up to 40–50 Hz (De Lange, 1958; Holcombe, 2009). When a single cell in the Rhythm Anomaly grid pulses faster than its neighbors, the local temporal frequency delta creates a phase-advance signal that triggers automatic, preattentive magnocellular pop-out (Kelly, 1961; Burr, 1980).
        </p>

        <h3>Two Limits on Temporal Vision: Fast Sampling vs. Slow Binding</h3>
        <p>
          In a comprehensive review of visual temporal processing, Holcombe (2009) proved that human temporal perception possesses two distinct physiological ceilings:
        </p>
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Low-Level Subcortical Temporal Limit (~40–50 Hz):</strong> Early retinal and V1 magnocellular neurons can resolve temporal contrast and flicker at rates exceeding 40 Hz (De Lange, 1958; Kelly, 1961).
          </li>
          <li>
            <strong>High-Level Cortical Binding Limit (~2–5 Hz):</strong> Consciously identifying what a stimulus is or binding multiple features requires higher cortical feedback loops, operating at a much slower rate of 2 to 5 cycles per second (Holcombe, 2009).
          </li>
        </ul>
        <p>
          Rhythm Anomaly trains the bridge between these systems: observers must rely on early magnocellular flicker sensitivity to detect the anomaly candidate, then execute rapid top-down attentional verification before the target cycle finishes.
        </p>

        <h3>Temporal Integration Windows &amp; Entropy Noise</h3>
        <p>
          The visual system integrates light over brief temporal windows of approximately 30 to 100 milliseconds (Burr, 1980; Woods et al., 2015). Stimuli occurring within a single integration window fuse into a single perceptual event. The intermittent &quot;entropy scramble&quot; flashes in Rhythm Anomaly inject stochastic transients into this integration window, forcing the brain to separate true sustained sinusoidal frequency modulation from isolated, non-predictive luminance blips (Burr, 1980; Posner, 1980).
        </p>

        <h3>Visual Temporal Performance Benchmarks</h3>
        <p>
          Performance across 45-second trials on the 36-cell pulsing matrix is classified into five empirical temporal acuity tiers:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Tier</th>
                <th className="py-2.5 px-3 font-semibold">Classification</th>
                <th className="py-2.5 px-3 font-semibold">45s Score</th>
                <th className="py-2.5 px-3 font-semibold">Speed Level</th>
                <th className="py-2.5 px-3 font-semibold">Delta-T Window</th>
                <th className="py-2.5 px-3 font-semibold">Temporal Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-purple-400">Tier 1</td>
                <td className="py-2.5 px-3 font-semibold text-white">Chrono-Master</td>
                <td className="py-2.5 px-3 tabular-nums">200+ PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 8+</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 60 ms</td>
                <td className="py-2.5 px-3">Instant phase-lead isolation; robust noise suppression; near-CFF sensitivity.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-teal-400">Tier 2</td>
                <td className="py-2.5 px-3 font-semibold text-white">Phase Detector</td>
                <td className="py-2.5 px-3 tabular-nums">150–199 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 6–7</td>
                <td className="py-2.5 px-3 tabular-nums">60–90 ms</td>
                <td className="py-2.5 px-3">High temporal acuity; rapid anomaly isolation within 1–2 full pulse periods.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-blue-400">Tier 3</td>
                <td className="py-2.5 px-3 font-semibold text-white">Proficient Rhythmist</td>
                <td className="py-2.5 px-3 tabular-nums">100–149 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 4–5</td>
                <td className="py-2.5 px-3 tabular-nums">91–130 ms</td>
                <td className="py-2.5 px-3">Consistent rhythm comparison; occasional pauses when background tempo accelerates.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-amber-400">Tier 4</td>
                <td className="py-2.5 px-3 font-semibold text-white">Developing Perceiver</td>
                <td className="py-2.5 px-3 tabular-nums">50–99 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 2–3</td>
                <td className="py-2.5 px-3 tabular-nums">131–180 ms</td>
                <td className="py-2.5 px-3">Relies on serial cell inspection; vulnerable to distraction from entropy flickers.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-400">Tier 5</td>
                <td className="py-2.5 px-3 font-semibold text-white">Phase Blurry</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 50 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 1</td>
                <td className="py-2.5 px-3 tabular-nums">&gt; 180 ms</td>
                <td className="py-2.5 px-3">Broad temporal integration blur; struggles to differentiate subtle pulse speed deltas.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>How to train timing discrimination</h3>
        <p>
          To enhance your temporal discrimination threshold and accelerate anomaly identification, apply these four structured protocols:
        </p>
        <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-300">
          <li>
            <strong>Magnocellular Soft Focus:</strong> Never stare fixedly at a single cell. Anchor your gaze at the center of the 6x6 grid and soften your focus, allowing peripheral magnocellular receptive fields to monitor global luminance oscillations simultaneously (Holcombe, 2009).
          </li>
          <li>
            <strong>Phase-Wavefront Comparison:</strong> Look for the &quot;early burst.&quot; Because the anomaly cell pulses at a higher frequency, it will consistently reach peak brightness before surrounding cells, creating a perceptible spatial phase wavefront (Kelly, 1961).
          </li>
          <li>
            <strong>Entropy Flicker Filtering:</strong> Distinguish between solitary brief flashes (entropy noise) and repetitive rhythmic cycles (targets). Give your visual system 200–300 ms to confirm that a flash repeats cyclically before clicking (Burr, 1980).
          </li>
          <li>
            <strong>Tempo Calibration Rhythm:</strong> When advancing to a higher speed level, pause for a fraction of a second to internalize the new baseline grid tempo. Synchronizing your internal visual clock prevents false alarms caused by temporary cadence mismatches (De Lange, 1958).
          </li>
        </ol>

        <h3>Frequently Asked Questions</h3>
        <div className="space-y-4 my-6">
          <div>
            <h4 className="font-semibold text-white">What is the Rhythm Anomaly test and what does it measure?</h4>
            <p className="text-slate-300 mt-1">
              The Rhythm Anomaly test evaluates visual temporal discrimination by challenging observers to identify an out-of-sync, faster-pulsing cell among 35 synchronized background cells within a 6x6 matrix.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">How does the visual system detect out-of-sync rhythm and temporal frequency differences?</h4>
            <p className="text-slate-300 mt-1">
              The magnocellular visual pathway processes rapid luminance oscillations and transient events up to 40–50 Hz. Phase leads in anomalous cells trigger early neuronal spikes in primary visual cortex, producing preattentive pop-out (Kelly, 1961).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">What is the difference between magnocellular and parvocellular visual pathways in flicker detection?</h4>
            <p className="text-slate-300 mt-1">
              Magnocellular neurons possess large receptive fields and high conduction velocity, optimized for temporal frequency, motion, and flicker. Parvocellular neurons have smaller receptive fields and slower conduction, optimized for fine color and high spatial detail (Holcombe, 2009).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">What is Critical Flicker Frequency (CFF) and how does it relate to visual reaction speed?</h4>
            <p className="text-slate-300 mt-1">
              Critical Flicker Frequency (CFF) is the rate at which intermittent light fuses into a steady source (35–60 Hz). Higher CFF thresholds reflect shorter temporal integration windows and faster perceptual sampling rates (De Lange, 1958).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">What is a good score on the 36-cell Rhythm Anomaly test?</h4>
            <p className="text-slate-300 mt-1">
              Novices score 50 to 99 points (Level 2–3). Experienced visual performers reach 100 to 149 points, and elite athletes/esports competitors score 150 to 200+ points with streaks over 10 consecutive anomaly detections.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Why does the drill grid pulse faster as your level increases?</h4>
            <p className="text-slate-300 mt-1">
              Building consecutive hits accelerates the baseline grid pulse frequency and narrows the temporal discrimination window, progressively testing your visual system closer to its temporal resolution limits.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">What is the purpose of the entropy scramble background flashes?</h4>
            <p className="text-slate-300 mt-1">
              Entropy scramble flashes introduce brief non-periodic luminance blips, preventing users from relying on simple brightness detection and enforcing true temporal frequency comparison (Burr, 1980).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Are there score or time penalties for clicking incorrect cells?</h4>
            <p className="text-slate-300 mt-1">
              No. Misclicks and timeouts reset your current streak but never deduct accumulated score points or subtract remaining session time, encouraging fast and fluid visual exploration.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">How do refresh rates (60Hz vs 144Hz+) affect visual temporal perception?</h4>
            <p className="text-slate-300 mt-1">
              Higher refresh rates (144 Hz–240 Hz) deliver frame intervals under 7 ms, rendering clean sinusoidal pulse curves that minimize temporal aliasing and enhance subtle phase-lead detection (Woods et al., 2015).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">How do competitive gamers and athletes benefit from temporal rhythm training?</h4>
            <p className="text-slate-300 mt-1">
              Dynamic athletes and gamers rely on temporal discrimination to recognize projectile trajectories, animation startup frames, and peripheral micro-movements, gaining a cognitive edge in time-pressured environments.
            </p>
          </div>
        </div>
      </DrillGuide>
    </>
  );
}