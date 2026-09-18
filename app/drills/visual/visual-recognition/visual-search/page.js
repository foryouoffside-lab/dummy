import VisualSearchClient from './VisualSearchClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — visual-search (visual-visual-search)
// PRIMARY:  "visual search test"           — Core psychophysics & cognitive assessment search (~1,300 searches/mo)
//           "conjunctive visual search"     — Attentional theory and target isolation query
// SECONDARY / LSI:
//           "feature search test"          — Feature integration vs conjunctive comparison
//           "visual scanning test"         — Clinical and occupational scanning speed
//           "target discrimination drill"  — Actionable sports vision query
//           "visual search task"           — Experimental cognitive psychology paradigm
//           "visual inspection test"       — Occupational and quality control inspection
//           "symbol search test"           — Processing speed index assessment
//           "guided visual search"         — Wolfe's guided search model query
//           "selective attention search"   — Attentional filtering query
//           "visual search speed test"     — Latency and chronometry query
// LOCALES:
//           ja: "視覚探索 テスト" (Visual Search Test)
//           ko: "시각 탐색 검사" (Visual Search Test)
//           de: "visuelle suche test" (Visual Search Test)
// ============================================================

export const metadata = {
  title: 'Visual Search Test – Free Conjunction Search Drill',
  description: 'Test visual scanning speed, feature binding, and target isolation across dense distractor arrays. Free 45-second test based on Treisman and Wolfe models.',
  keywords: [
    'visual search test',
    'conjunctive visual search',
    'feature search test',
    'visual scanning test',
    'target discrimination drill',
    'visual search task',
    'visual inspection test',
    'symbol search test',
    'guided visual search',
    'selective attention search',
    'visual search speed test',
    'concentration letter grid',
  ],
  openGraph: {
    title: 'Conjunctive Visual Search Test – Free Target Isolation Drill | SkillDrills',
    description: 'Test visual scanning speed, feature binding, and target isolation across dense distractor arrays. Free 45-second interactive drill.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/visual-recognition/visual-search',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conjunctive Visual Search Test – Free Target Isolation Drill | SkillDrills',
    description: 'Test visual scanning speed, feature binding, and target isolation across dense distractor arrays. Free 45-second interactive drill.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/visual-recognition/visual-search',
    languages: getAlternateLanguages('/drills/visual/visual-recognition/visual-search'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/' },
    { '@type': 'ListItem', position: 2, name: 'Visual Training', item: 'https://skilldrills.online/drills/visual' },
    { '@type': 'ListItem', position: 3, name: 'Visual Recognition', item: 'https://skilldrills.online/drills/visual/visual-recognition' },
    { '@type': 'ListItem', position: 4, name: 'Conjunctive Visual Search Test', item: 'https://skilldrills.online/drills/visual/visual-recognition/visual-search' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Visual Search Test – Free Conjunction Search Drill',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free conjunctive visual search assessment. Scan high-density letter matrices with rotated distractors to measure target acquisition latency and selective attention.',
  url: 'https://skilldrills.online/drills/visual/visual-recognition/visual-search',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Conjunctive Visual Search Test',
  browserRequirements: 'Requires HTML5 and JavaScript enabled browser',
  url: 'https://skilldrills.online/drills/visual/visual-recognition/visual-search',
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
      name: 'What is a conjunctive visual search test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A conjunctive visual search test is a psychophysical assessment where an observer must locate a target defined by a combination of two or more visual features (such as shape, orientation, or color) embedded within a field of distractors that share individual features with the target.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does conjunctive search differ from simple feature search?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In simple feature search (e.g., finding a red dot among green dots), the target differs by a single salient property and "pops out" preattentively with search times virtually independent of set size. In conjunctive search, the target shares features with distractors, requiring serial or guided attentional scanning where reaction time increases with the number of items.',
      },
    },
    {
      '@type': 'Question',
      name: "What is Anne Treisman's Feature Integration Theory?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Feature Integration Theory (Treisman & Gelade, 1980) posits that basic visual features (color, orientation, spatial frequency) are extracted automatically and in parallel across early visual cortex. Binding these separate features into a unified object representation requires focused spatial attention directed sequentially to candidate item locations.',
      },
    },
    {
      '@type': 'Question',
      name: "What is Jeremy Wolfe's Guided Search model?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Guided Search model (Wolfe, 1994) demonstrates that visual search is not strictly serial or random. Instead, top-down knowledge about target features primes preattentive visual channels, creating a spatial priority map that guides the spotlight of focused attention directly toward the most likely target candidates.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good target acquisition time on this 96-cell grid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On a 12x8 matrix of 96 cells, elite visual searchers locate each target in under 450 milliseconds (>1500 points in 45 seconds). Competitive performers average 450–700 ms per target (1000–1450 points), while untrained baselines typically require 701–1,100 ms per target.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do rotated distractor letters make visual search harder?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As shown by Duncan & Humphreys (1989), search efficiency decreases as distractor-distractor homogeneity decreases and target-distractor similarity increases. Rotating distractor letters disrupts preattentive grouping, preventing the brain from filtering them out as a single background texture.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there score or time penalties for clicking incorrect cells?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Incorrect cell clicks flash red to signal a miss but do not deduct accumulated score points or shorten remaining seconds. This encourages decisive perceptual commitment while penalizing hesitation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does perceptual load affect distractor suppression?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Perceptual Load Theory (Lavie, 1995) states that when a display imposes high perceptual load (dense 96-cell clutter with rotated symbols), early sensory capacity is fully consumed, preventing distractor processing and reducing involuntary distraction.',
      },
    },
    {
      '@type': 'Question',
      name: 'What scanning pattern yields the highest visual search efficiency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Systematic serpentine (Z-pattern) row scanning paired with an expanded parafoveal zoom lens (Eriksen & St. James, 1986) yields the highest search efficiency, eliminating redundant saccades and preventing accidental re-inspection of already-searched cells.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does visual search performance translate to esports and athletics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Competitive gamers and field athletes encounter dense, cluttered environments where identifying enemy micro-movements, projectiles, or open teammates demands rapid conjunctive feature binding. Faster search speed directly lowers reaction latency and expands situational awareness.',
      },
    },
  ],
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Conjunctive Visual Search Test",
  "url": "https://skilldrills.online/drills/visual/visual-recognition/visual-search",
  "description": "Free conjunctive visual search assessment. Scan high-density letter matrices with rotated distractors to measure target acquisition latency and selective attention.",
  "genre": ["Action", "Brain Game", "Visual Search"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Conjunctive Visual Search and Target Isolation',
  description: 'Master serial scanning, feature binding, and target acquisition with our free Conjunctive Visual Search Test.',
  dateModified: '2026-09-05',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Identify the Active Target Character',
      text: 'Note the highlighted target symbol indicated in the HUD (such as C, E, or P) and identify its defining visual feature.',
      url: 'https://skilldrills.online/drills/visual/visual-recognition/visual-search#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Execute Serpentine Grid Sweeps',
      text: 'Scan the 12x8 cell matrix using smooth, horizontal serpentine sweeps rather than scattered random fixations.',
      url: 'https://skilldrills.online/drills/visual/visual-recognition/visual-search#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Isolate Feature Discrepancies',
      text: 'Detect open contours or unique segment intersections among the rotated distractors using parafoveal vision.',
      url: 'https://skilldrills.online/drills/visual/visual-recognition/visual-search#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Acquire and Retarget Immediately',
      text: 'Tap or click the target immediately upon identification. As the target relocates, instantly transition your gaze without pausing.',
      url: 'https://skilldrills.online/drills/visual/visual-recognition/visual-search#step-4',
    },
  ],
};

export default function VisualSearchPage() {
  const sources = pickSources('treisman1980', 'wolfe1994', 'duncan1989', 'lavie1995', 'eriksen1986', 'bacon1994', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <VisualSearchClient copy={{ title: "Conjunctive Visual Search Test" }} />

      <DrillGuide
        eyebrow="Visual Psychophysics & Attentional Architecture"
        title="The Science of Conjunctive Visual Search, Feature Integration & Target Isolation"
        sources={sources}
      >
        <p>
          In natural visual environments, targets rarely present themselves in complete isolation. Whether scanning an airport radar display, proofreading printed documents, or identifying an opponent peeking around cover in tactical esports, the human visual system must rapidly discriminate relevant signals embedded within high-density visual clutter. In psychophysics, this capability is evaluated through <strong>visual search paradigms</strong>, which measure how spatial attention interacts with sensory feature maps across time (Treisman &amp; Gelade, 1980; Wolfe, 1994).
        </p>

        <h3>Feature Search vs. Conjunctive Search: The Binding Problem</h3>
        <p>
          Classical visual psychophysics divides visual search into two primary regimes based on target salience and feature composition:
        </p>
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Feature Search (Parallel Pop-Out):</strong> When a target differs from distractors along a single continuous dimension—such as a single red circle among blue squares—early cortical neurons in visual area V1 register the discrepancy simultaneously across the entire visual field. Search latency remains flat regardless of whether the array contains 10 or 100 items (Treisman &amp; Gelade, 1980; Wolfe, 1994).
          </li>
          <li>
            <strong>Conjunctive Search (Serial &amp; Guided Binding):</strong> When a target is defined by a conjunction of features that individually overlap with surrounding distractors (e.g., locating a &apos;C&apos; among rotated &apos;O&apos;, &apos;Q&apos;, and &apos;G&apos; distractors), parallel preattentive mechanisms cannot resolve the target alone. The visual cortex must deploy focused spatial attention sequentially across candidate items, causing reaction time to increase in direct proportion to set size (Treisman &amp; Gelade, 1980; Duncan &amp; Humphreys, 1989).
          </li>
        </ul>
        <p>
          This phenomenon illustrates what cognitive neuroscientists term the <em>visual binding problem</em>: while early visual cortical areas process orientation, line closure, and curvature in separate modular feature maps, synthesizing those disparate features into a unified object perception requires active attentional allocation mediated by the posterior parietal cortex and frontal eye fields (Treisman &amp; Gelade, 1980; Wolfe, 1994).
        </p>

        <h3>Distractor Homogeneity &amp; Search Efficiency (Duncan &amp; Humphreys, 1989)</h3>
        <p>
          In seminal work on visual search efficiency, Duncan and Humphreys (1989) demonstrated that search performance is not determined by feature conjunctions alone, but by two critical perceptual relationships:
        </p>
        <ol className="list-decimal pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Target-Distractor Similarity:</strong> As the visual similarity between the target and distractors increases, discrimination thresholds rise, demanding more extensive foveal scrutiny and longer fixation durations.
          </li>
          <li>
            <strong>Distractor-Distractor Homogeneity:</strong> When distractors are uniform in orientation and form, the visual system groups them into a coherent background texture via Gestalt principles, allowing the target to stand out. However, when distractors are randomly rotated—as implemented in this drill—perceptual grouping breaks down completely, forcing individual serial evaluation of candidate cells.
          </li>
        </ol>

        <h3>Attentional Zoom Lens &amp; Perceptual Load (Lavie, 1995; Eriksen &amp; St. James, 1986)</h3>
        <p>
          How does the brain allocate attention across a 96-cell matrix? According to the zoom lens model of spatial attention (Eriksen &amp; St. James, 1986), visual attention functions as a variable-diameter spotlight. As the spotlight widens to encompass multiple cells, processing resolution decreases; conversely, when constricted to a single cell, resolution peaks at the expense of field-of-view coverage.
        </p>
        <p>
          Furthermore, Nilli Lavie&apos;s Perceptual Load Theory (Lavie, 1995) proves that cognitive distractibility depends on sensory bandwidth consumption. In low-load conditions, spare attentional capacity involuntarily spills over into task-irrelevant processing. In high-load conditions—such as our dense 12x8 letter matrix under rapid 45-second time pressure—perceptual capacity is fully saturated, enforcing stringent selective attention and suppressing extraneous mind wandering (Lavie, 1995; Bacon &amp; Egeth, 1994).
        </p>

        <h3>Empirical Search Latency Benchmarks</h3>
        <p>
          The bands below are an editorial guide to reading your own result on this 96-cell (12x8) matrix, not measured population norms. SkillDrills collects no aggregate data, and neither Treisman &amp; Gelade (1980) nor Wolfe (1994) publishes percentiles for this task — what they establish is the mechanism: a conjunction search, where no single feature isolates the target, scales with the number of distractors instead of popping out.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left border-collapse border border-white/10 text-xs sm:text-sm">
            <thead>
              <tr className="bg-white/5 text-slate-200">
                <th className="p-2.5 border border-white/10 font-bold">Tier</th>
                <th className="p-2.5 border border-white/10 font-bold">Target Acquisition Latency</th>
                <th className="p-2.5 border border-white/10 font-bold">45s Session Score</th>
                <th className="p-2.5 border border-white/10 font-bold">Editorial band</th>
                <th className="p-2.5 border border-white/10 font-bold">Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-cyan-400">Tier 1</td>
                <td className="p-2.5 border border-white/10">&lt; 450 ms</td>
                <td className="p-2.5 border border-white/10">&gt; 1,500 pts (10+ finds)</td>
                <td className="p-2.5 border border-white/10">Exceptional</td>
                <td className="p-2.5 border border-white/10">Elite Esports / Radar Intercept</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-blue-400">Tier 2</td>
                <td className="p-2.5 border border-white/10">450 – 700 ms</td>
                <td className="p-2.5 border border-white/10">1,050 – 1,450 pts (7–9 finds)</td>
                <td className="p-2.5 border border-white/10">Advanced</td>
                <td className="p-2.5 border border-white/10">Competitive Visual Athlete</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-emerald-400">Tier 3</td>
                <td className="p-2.5 border border-white/10">701 – 1,100 ms</td>
                <td className="p-2.5 border border-white/10">600 – 1,000 pts (4–6 finds)</td>
                <td className="p-2.5 border border-white/10">Typical</td>
                <td className="p-2.5 border border-white/10">Typical untrained result</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-amber-400">Tier 4</td>
                <td className="p-2.5 border border-white/10">1,101 – 1,600 ms</td>
                <td className="p-2.5 border border-white/10">300 – 550 pts (2–3 finds)</td>
                <td className="p-2.5 border border-white/10">Below typical</td>
                <td className="p-2.5 border border-white/10">Below Average / Visual Fatigue</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-rose-400">Tier 5</td>
                <td className="p-2.5 border border-white/10">&gt; 1,600 ms</td>
                <td className="p-2.5 border border-white/10">&lt; 300 pts (0–1 find)</td>
                <td className="p-2.5 border border-white/10">Starting out</td>
                <td className="p-2.5 border border-white/10">Attentional Tunneling / Clutter Overload</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>How to train visual search</h3>
        <p>
          To systematically compress target acquisition times and elevate search throughput, implement these four evidence-based scanning protocols during daily training:
        </p>
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Parallel Preattentive Coarse Filtering (Wolfe, 1994):</strong> Rather than foveating every character individually, keep gaze slightly elevated and allow peripheral vision to eliminate clusters of completely dissimilar shapes simultaneously. Only deploy focal foveation when a candidate shape matches the target&apos;s coarse boundary profile.
          </li>
          <li>
            <strong>Saccadic Fixation Cadence (Treisman &amp; Gelade, 1980; Woods et al., 2015):</strong> Saccadic eye movements require 20–40 ms in flight and 200–250 ms in fixation dwell time. Train your ocular motor rhythm to execute 3 to 4 ballistic fixations per row, taking in 3–4 items per fixation rather than one item at a time.
          </li>
          <li>
            <strong>Feature Discrepancy Isolation &amp; Distractor Suppression (Lavie, 1995; Duncan &amp; Humphreys, 1989):</strong> When searching for &apos;C&apos; among &apos;O&apos;, &apos;Q&apos;, and &apos;G&apos;, do not search for the full letter &apos;C&apos;. Instead, prime your visual system for <em>open gap detection</em>. Any continuous closed loop is instantly suppressed by early inhibitory feedback, leaving only broken arcs as candidate targets.
          </li>
          <li>
            <strong>Structured Serpentine Sweeping (Bacon &amp; Egeth, 1994; Eriksen &amp; St. James, 1986):</strong> Avoid chaotic erratic eye jumps across the grid. Execute a disciplined serpentine raster scan (left-to-right on row 1, right-to-left on row 2), maintaining systematic coverage that guarantees zero redundant re-inspections.
          </li>
        </ul>

        <h3>Frequently Asked Questions</h3>
        <div className="space-y-4 my-4">
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">What is a conjunctive visual search test?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              A conjunctive visual search test is a psychophysical assessment where an observer must locate a target defined by a combination of two or more visual features embedded within a field of distractors that share individual features with the target.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">How does conjunctive search differ from simple feature search?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              In simple feature search, the target differs by a single unique property (like color) and pops out preattentively. In conjunctive search, the target shares properties with distractors, requiring active attentional scanning where search time scales with grid density.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">What is Anne Treisman&apos;s Feature Integration Theory?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Treisman &amp; Gelade (1980) demonstrated that while basic features are extracted automatically in parallel by early visual cortex, binding those features into an object requires focused spatial attention directed sequentially to candidate locations.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">What is Jeremy Wolfe&apos;s Guided Search model?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Wolfe&apos;s Guided Search model (1994) shows that top-down knowledge about target attributes primes preattentive visual channels, generating a spatial priority map that guides focused attention directly toward the most likely target candidates.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">What is a good target acquisition time on this 96-cell grid?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Elite visual searchers isolate each target in under 450 ms (&gt;1,500 points in 45 seconds). Competitive performers average 450–700 ms per target, while untrained baselines require 701–1,100 ms per target.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Why do rotated distractor letters make visual search harder?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              As proven by Duncan &amp; Humphreys (1989), rotating distractors breaks distractor homogeneity and eliminates preattentive texture grouping, forcing the visual cortex to evaluate candidate cells through active serial scrutiny.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Are there score or time penalties for clicking incorrect cells?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              No. Tapping an incorrect cell flashes red but never deducts score points or reduces timer seconds, encouraging rapid perceptual commitment and preventing visual hesitation.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">How does perceptual load affect distractor suppression?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Perceptual Load Theory (Lavie, 1995) proves that high visual clutter completely consumes sensory processing capacity, preventing distractor intrusion and enforcing strict selective focus.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">What scanning pattern yields the highest visual search efficiency?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              A systematic serpentine (Z-pattern) row scan paired with an expanded zoom lens (Eriksen &amp; St. James, 1986) yields the highest search efficiency, eliminating search overlap and ocular backtracking.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">How does visual search performance translate to esports and athletics?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              High-level athletes and gamers operating in complex visual scenes depend on rapid conjunctive target binding to isolate opponents, track balls, and detect peripheral threats under extreme temporal pressure.
            </p>
          </div>
        </div>
      </DrillGuide>
    </>
  );
}
