import EntropicGridClient from './EntropicGridClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — entropic-grid (visual-entropic-grid)
// PRIMARY:  "concentration grid test"        — Classic attentional diagnostic & athletic search (~1,200 searches/mo)
//           "visual search test"             — Foundational cognitive psychophysics query
//           "concentration grid online free" — Direct free tool user intent
// SECONDARY / LSI:
//           "visual search task"             — Laboratory and clinical neuropsychological testing
//           "visual scanning test"           — Occupational therapy and vision assessment phrase
//           "cognitive focus grid"           — Mental concentration and sports psychology query
//           "attention concentration test"   — General attention measurement phrase
//           "visual noise filtering"         — Perceptual distraction suppression search
//           "visual recognition test"        — Pattern identification and reading speed query
//           "feature search test"            — Preattentive vs serial search psychophysics
//           "perceptual speed test"          — Cognitive processing rate benchmark
//           "visual cancellation test"       — Clinical cancellation task alternative
// LOCALES:
//           ja: "集中力グリッド テスト" (Concentration Grid Test)
//           ko: "집중력 그리드 검사" (Concentration Grid Test)
//           de: "konzentrationsgitter test" (Concentration Grid Test)
// ============================================================

export const metadata = {
  title: "Entropic Grid Visual Search - Free Concentration Grid Test",
  description: "Free concentration grid test. Find target codes on a 100-cell grid that regenerates every 700 ms, measuring visual scanning speed under noise.",
  keywords: [
    "concentration grid test",
    "concentration grid online free",
    "visual search test",
    "visual search task",
    "visual scanning test",
    "cognitive focus grid",
    "attention concentration test",
    "visual noise filtering",
    "visual recognition test",
    "feature search test",
    "perceptual speed test",
    "visual cancellation test"
  ],
  openGraph: {
    title: "Entropic Grid Visual Search - Free Concentration Grid Test | SkillDrills",
    description: "Train visual focus, selective attention, and visual scanning speed with a 100-cell concentration grid test under dynamic background noise.",
    type: "website",
    url: "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid",
    siteName: "SkillDrills",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Entropic Grid Visual Search - Free Concentration Grid Test | SkillDrills",
    description: "Train visual focus, selective attention, and visual scanning speed with a 100-cell concentration grid test under dynamic background noise.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid",
    languages: getAlternateLanguages('/drills/visual/visual-recognition/entropic-grid'),
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
    { "@type": "ListItem", "position": 4, "name": "Entropic Grid Visual Search", "item": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entropic Grid Visual Search – Free Concentration Grid Test",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free visual search and concentration grid test. Find target codes in a 100-cell grid under dynamic entropy noise, zero negative penalties, clean 45-second timer.",
  "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "dateModified": "2026-09-05"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Entropic Grid Visual Search Test",
  "browserRequirements": "Requires HTML5 canvas and JavaScript",
  "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid",
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
      "name": "What is the concentration grid test and how does it measure visual focus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A concentration grid test is an empirical psychological exercise that evaluates visual scanning speed, selective attention, and distractor suppression. Observers must locate target stimuli within a high-density alphanumeric matrix while filtering out task-irrelevant distractors under strict temporal constraints."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between parallel feature search and serial conjunctive search?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In parallel feature search, a target defined by a unique elementary feature (such as a distinct color) 'pops out' preattentively across the entire visual field in constant time. In serial conjunctive search, where the target shares features with distractors, observers must focus attention sequentially on individual items, causing search time to increase linearly with set size."
      }
    },
    {
      "@type": "Question",
      "name": "How does dynamic background noise affect visual recognition speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dynamic visual noise (such as the 700ms cell regeneration in Entropic Grid) triggers bottom-up exogenous attentional capture. These transient luminance and character shifts compete with top-down visual search templates, testing the dorsal visual stream's capacity to suppress distractor interference."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score on the 100-cell Entropic Grid drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "General users typically score between 250 and 499 points (Level 2). Experienced visual scanners and competitive gamers reach 500 to 749 points (Level 3), while elite performers achieve 750 to 1,000+ points (Level 4–5), maintaining sub-1.5 second target acquisition times despite intense background noise."
      }
    },
    {
      "@type": "Question",
      "name": "Why does visual search become harder as difficulty levels increase?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As difficulty levels advance, target code swap intervals accelerate and background entropy regeneration speeds up, increasing the perceptual load on visual short-term memory. Observers must manage faster cognitive re-indexing while maintaining spatial quadrant coverage."
      }
    },
    {
      "@type": "Question",
      "name": "What is perceptual load theory and how does it prevent distraction?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Formulated by Nilli Lavie, perceptual load theory posits that when a task imposes high perceptual load—such as scanning complex 2-character codes in a 100-cell array—attentional capacity is fully consumed by task-relevant stimuli. This sensory saturation automatically excludes background distractors from cognitive processing."
      }
    },
    {
      "@type": "Question",
      "name": "Can visual scanning and pattern recognition speed be trained?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Neurocognitive studies confirm that regular visual search practice expands the effective attentional visual field (useful field of view), increases saccadic scanning efficiency, and accelerates template matching in the ventral occipitotemporal cortex."
      }
    },
    {
      "@type": "Question",
      "name": "How does the 12-second target code swap mechanism work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every 12 seconds, or immediately upon reaching 5 target hits, the drill designates a new 2-character target code. This forces the visual working memory buffer to flush the previous search template and prime a new alphanumeric pattern, testing cognitive flexibility."
      }
    },
    {
      "@type": "Question",
      "name": "Are there penalties for clicking incorrect cells in Entropic Grid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Tapping an incorrect cell triggers an instant red visual flash without deducting accrued points or subtracting timer seconds. This design encourages aggressive, fluid visual exploration without penalizing rapid decision-making."
      }
    },
    {
      "@type": "Question",
      "name": "How do gamers and professionals use concentration grids for cognitive warm-ups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Athletes, pilots, and esports competitors use 2 to 3 rounds of 45-second concentration grid training as an oculomotor primer. It activates frontal-parietal attention networks, awakens peripheral parafoveal processing, and calms cognitive distractibility prior to performance."
      }
    }
  ]
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Entropic Grid Visual Search",
  "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid",
  "description": "Free entropic grid visual search test. Scan high-density dynamic noise matrices to rapidly detect target codes under shifting visual clutter.",
  "genre": ["Action", "Brain Game", "Visual Search"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Visual Scanning in High-Entropy Grids",
  "description": "Step-by-step instructions to train visual recognition speed and distractor filtering using our Entropic Grid drill.",
  "dateModified": "2026-09-05",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Identify the Target Character Pair",
      "text": "Examine the active 2-character target code displayed in the top HUD and prime your visual template for its features.",
      "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Deploy Serpentine Quadrant Sweeps",
      "text": "Partition the 100-cell grid into quadrants and sweep systematically across rows to minimize redundant saccades.",
      "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Suppress Peripheral Entropy Regeneration",
      "text": "Filter out background cell regeneration pulses and rely on parafoveal shape matching to locate candidate matches.",
      "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Acquire Target and Re-index on Code Swap",
      "text": "Tap the matching cell immediately to score points, and instantly update your memory buffer when the target code swaps.",
      "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid#step-4"
    }
  ]
};

export default function EntropicGridPage() {
  const sources = pickSources('treisman1980', 'wolfe1994', 'lavie1995', 'eriksen1986', 'posner1980', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <EntropicGridClient copy={{ title: "Entropic Grid Visual Search" }} />
      <DrillGuide
        eyebrow="Visual Cognition & Attention Psychophysics"
        title="The Science of Visual Search, Perceptual Load & Distractor Filtering"
        sources={sources}
      >
        <p>
          Visual search is the fundamental perceptual operation of locating a specific target among a field of distracting visual items. From a pilot scanning a crowded cockpit display to an esports competitor spotting an enemy silhouette in complex terrain, visual search efficiency dictates situational awareness and survival. In laboratory psychophysics, search efficiency is governed by the interaction between bottom-up visual saliency and top-down attentional control (Treisman &amp; Gelade, 1980; Wolfe, 1994).
        </p>

        <h3>Feature Integration &amp; Guided Search Architecture</h3>
        <p>
          According to Treisman and Gelade&apos;s (1980) landmark Feature Integration Theory, the visual system processes basic elementary visual features—such as color, orientation, and motion—in parallel across the entire visual field without focal attention. When a target differs from distractors by a single salient feature, it triggers a rapid, preattentive &quot;pop-out&quot; effect where response latency is independent of set size. However, when a target is defined by a conjunction of features (such as specific alphanumeric character pairings in the Entropic Grid), focal spatial attention must be deployed serially to bind those features together (Treisman &amp; Gelade, 1980). Wolfe&apos;s (1994) Guided Search framework explains that top-down attentional priorities bias this serial search, allowing observers to guide their gaze toward cells that most closely match the stored target template.
        </p>

        <h3>Perceptual Load &amp; Selective Distractor Inhibition</h3>
        <p>
          The continuous 700ms background character regeneration in Entropic Grid models real-world cognitive distraction. Under Lavie&apos;s (1995) Perceptual Load Theory, selective attention operates through a structural capacity limit. When a visual task imposes low perceptual load, surplus attentional capacity automatically &quot;spills over&quot; to process irrelevant distractors, increasing cognitive interference. Conversely, under high perceptual load—such as rapidly scanning a 100-cell matrix for dynamic alphanumeric digraphs—attentional bandwidth is fully consumed by task-relevant stimulus processing, establishing automatic neurochemical exclusion of background distractor noise (Lavie, 1995).
        </p>

        <h3>Zoom Lens Dynamics &amp; Parafoveal Scanning</h3>
        <p>
          Human visual attention does not operate as a fixed spotlight; rather, it functions as an elastic &quot;zoom lens&quot; (Eriksen &amp; St. James, 1986). Observers can dynamically adjust their attentional focus from a broad, low-resolution sweep of the entire 10x10 matrix to a tight, high-resolution cluster around individual 2x2 quadrants. High-performing visual searchers maximize parafoveal perception—extracting character shapes from the region just outside the central 2-degree foveal field—enabling them to reject distractors without executing individual ballistic saccades to each cell (Posner, 1980; Woods et al., 2015).
        </p>

        <h3>Visual Search Performance Benchmarks</h3>
        <p>
          Across standardized 45-second Entropic Grid trials, user performance is benchmarked into five distinct cognitive scanning tiers:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Tier</th>
                <th className="py-2.5 px-3 font-semibold">Classification</th>
                <th className="py-2.5 px-3 font-semibold">45s Score</th>
                <th className="py-2.5 px-3 font-semibold">Peak Level</th>
                <th className="py-2.5 px-3 font-semibold">Avg Acquisition</th>
                <th className="py-2.5 px-3 font-semibold">Cognitive Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-blue-400">Tier 1</td>
                <td className="py-2.5 px-3 font-semibold text-white">Apex Scanner</td>
                <td className="py-2.5 px-3 tabular-nums">1,000+ PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 5+</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 1.2s</td>
                <td className="py-2.5 px-3">Instantaneous quadrant triage; near-zero distractor capture; broad parafoveal span.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-teal-400">Tier 2</td>
                <td className="py-2.5 px-3 font-semibold text-white">Advanced Searcher</td>
                <td className="py-2.5 px-3 tabular-nums">750–999 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 4</td>
                <td className="py-2.5 px-3 tabular-nums">1.3–1.8s</td>
                <td className="py-2.5 px-3">High search velocity; effective noise filtering; rapid template re-indexing.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-emerald-400">Tier 3</td>
                <td className="py-2.5 px-3 font-semibold text-white">Focused Reader</td>
                <td className="py-2.5 px-3 tabular-nums">500–749 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 3</td>
                <td className="py-2.5 px-3 tabular-nums">1.9–2.5s</td>
                <td className="py-2.5 px-3">Systematic serpentine scanning; occasional pauses during target code swaps.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-amber-400">Tier 4</td>
                <td className="py-2.5 px-3 font-semibold text-white">Developing Scanner</td>
                <td className="py-2.5 px-3 tabular-nums">250–499 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 2</td>
                <td className="py-2.5 px-3 tabular-nums">2.6–3.5s</td>
                <td className="py-2.5 px-3">Serial cell-by-cell inspection; easily distracted by background character regeneration.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-400">Tier 5</td>
                <td className="py-2.5 px-3 font-semibold text-white">Noise Overwhelmed</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 250 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 1</td>
                <td className="py-2.5 px-3 tabular-nums">&gt; 3.5s</td>
                <td className="py-2.5 px-3">Cognitive bottleneck; frequent attentional capture by entropy flashes; narrow focus.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>How to train visual scanning</h3>
        <p>
          To systematically accelerate your visual recognition speed and suppress background entropy noise, deploy these four evidence-based protocols:
        </p>
        <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-300">
          <li>
            <strong>Quadrant Partitioning:</strong> Rather than scanning row by row across 100 cells, divide the grid mentally into four 5x5 quadrants. Sweep quadrant by quadrant in clockwise succession, reducing spatial search entropy and preventing redundant saccades (Eriksen &amp; St. James, 1986).
          </li>
          <li>
            <strong>Preattentive Digraph Anchoring:</strong> Focus on the first character of the target code as an initial feature filter. For example, if the target is &quot;K7&quot;, scan exclusively for the angular diagonal strokes of &quot;K&quot; and only inspect the second character once a candidate is detected (Treisman &amp; Gelade, 1980).
          </li>
          <li>
            <strong>Exogenous Noise Suppression:</strong> Recognize that background cells regenerate every 700ms. Treat these character flashes as peripheral motion noise rather than targets; hold your gaze steady and let top-down Guided Search filter out transient updates (Wolfe, 1994; Lavie, 1995).
          </li>
          <li>
            <strong>Zoom Lens Expansion:</strong> Avoid fixating on individual characters. Soften your gaze slightly to take in clusters of 4 to 9 cells simultaneously, relying on parafoveal pattern matching to trigger recognition (Eriksen &amp; St. James, 1986).
          </li>
        </ol>

        <h3>Frequently Asked Questions</h3>
        <div className="space-y-4 my-6">
          <div>
            <h4 className="font-semibold text-white">What is the concentration grid test and how does it measure visual focus?</h4>
            <p className="text-slate-300 mt-1">
              The concentration grid test evaluates visual search speed, selective attention, and distractor filtering by measuring how rapidly an observer can locate targets in a dense, noisy matrix under timed conditions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">What is the difference between parallel feature search and serial conjunctive search?</h4>
            <p className="text-slate-300 mt-1">
              Parallel search operates across the entire visual field simultaneously for simple unique features (pop-out effect). Conjunctive search requires focused serial inspection of individual items to bind multiple features together (Treisman &amp; Gelade, 1980).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">How does dynamic background noise affect visual recognition speed?</h4>
            <p className="text-slate-300 mt-1">
              Dynamic character shifts trigger involuntary exogenous attentional capture, forcing the visual cortex to expend cognitive effort suppressing task-irrelevant transients (Lavie, 1995).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">What is a good score on the 100-cell Entropic Grid drill?</h4>
            <p className="text-slate-300 mt-1">
              Average users score between 250 and 499 points (Level 2). Experienced scanners achieve 500 to 749 points, while elite competitive performers reach 750 to 1,000+ points with sub-1.2 second average target acquisitions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Why does visual search become harder as difficulty levels increase?</h4>
            <p className="text-slate-300 mt-1">
              Higher levels introduce faster target code swap cycles and accelerated entropy regeneration, testing the visual working memory buffer&apos;s ability to flush and prime new search templates under pressure.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">What is perceptual load theory and how does it prevent distraction?</h4>
            <p className="text-slate-300 mt-1">
              Perceptual load theory states that when a task fully exhausts perceptual capacity, distractor stimuli are automatically excluded from cognitive processing, preventing distraction (Lavie, 1995).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Can visual scanning and pattern recognition speed be trained?</h4>
            <p className="text-slate-300 mt-1">
              Yes. Systematic visual search practice widens the useful field of view, trains faster parafoveal processing, and streamlines saccadic trajectory planning (Woods et al., 2015).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">How does the 12-second target code swap mechanism work?</h4>
            <p className="text-slate-300 mt-1">
              Every 12 seconds (or every 5 successful hits), the target changes to a new 2-character code, demanding cognitive flexibility and preventing habitual gaze fixation on a single character shape.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Are there penalties for clicking incorrect cells in Entropic Grid?</h4>
            <p className="text-slate-300 mt-1">
              No. Tapping a non-target cell produces a momentary red visual flash without score or time deductions, allowing users to scan aggressively without fear of catastrophic failure.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">How do gamers and professionals use concentration grids for cognitive warm-ups?</h4>
            <p className="text-slate-300 mt-1">
              Athletes and gamers utilize 2 to 3 rounds of 45-second concentration grid training to activate dorsal and ventral attention streams and sharpen parafoveal awareness prior to competition.
            </p>
          </div>
        </div>
      </DrillGuide>
    </>
  );
}