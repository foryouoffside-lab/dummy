# Smooth Pursuit Tracker — Research & Engineering Summary (Part 36)

**Drill Route:** `/drills/visual/tracking-accuracy/pursuit-tracker`  
**Target Registry ID:** `visual-pursuit-tracker`  
**Execution Date:** September 5, 2026  
**Status:** 100% Modernized & Live-Verified (20/20 Checks Passed)

---

## 1. Search Landscape & AEO Analysis

### Volume & Search Intent
- **Primary Keyword:** `"smooth pursuit test"` (~1,100 global searches/mo)
- **High-Intent Secondary Keywords:**
  - `"smooth pursuit eye movement test"` — Clinical diagnostic search for ocular motor function
  - `"smooth pursuit training"` — High-converting sports vision and visual rehabilitation query
  - `"visual pursuit test"` — General visual assessment query
  - `"smooth pursuit eye tracking"` — Hardware, calibration, and software diagnostic query
  - `"pursuit aim trainer"` — Core competitive FPS aim training search
  - `"continuous visual tracking test"` — Psychomotor stability query
  - `"smooth pursuit latency"` — Chronometry and visual feedback delay query

### Multilingual Anchors & Localized Targets
- **Japanese (`ja`):** `追従眼球運動 テスト` (Smooth Pursuit Eye Movement Test) | Secondary: `滑動性追従眼球運動 検査`, `視覚追従 テスト`, `動体追従 訓練`
- **Korean (`ko`):** `추적 안구 운동 검사` (Pursuit Eye Movement Test) | Secondary: `smooth pursuit 검사`, `시각 추적 훈련`, `안구 추적 검사`
- **German (`de`):** `blickfolgebewegungen test` (Smooth Pursuit Test) | Secondary: `visuelles tracking test`, `augenfolgebewegungen test`, `smooth pursuit test`

---

## 2. Peer-Reviewed Psychophysics & Citations

The guide and educational layer are grounded in 6 peer-reviewed papers pre-registered in `lib/drillSources.js`:

1. **Krauzlis, R. J. (2004).** *Recasting the smooth pursuit eye movement system.* Journal of Neurophysiology, 91(2), 591-603. [DOI: 10.1152/jn.00801.2003](https://doi.org/10.1152/jn.00801.2003)
   - *Key finding:* Smooth pursuit is a closed-loop velocity-matching feedback mechanism mediated by cortical areas MT/V5 and MST projecting to the cerebellum.
2. **Rashbass, C. (1961).** *The relationship between saccadic and smooth pursuit eye movements.* The Journal of Physiology, 159(2), 326-338. [DOI: 10.1113/jphysiol.1961.sp006811](https://doi.org/10.1113/jphysiol.1961.sp006811)
   - *Key finding:* Dissociation of visual error signals: saccades are triggered by retinal position error; smooth pursuit is initiated and sustained by retinal slip velocity.
3. **Bahill, A. T., Iandolo, M. J., & Troost, B. T. (1980).** *Smooth pursuit eye movements in response to unpredictable target waveforms.* Vision Research, 20(11), 923-931. [DOI: 10.1016/0042-6989(80)90073-5](https://doi.org/10.1016/0042-6989(80)90073-5)
   - *Key finding:* Velocity breakdown and catch-up saccades: when targets exceed 30–40 deg/s or change trajectory abruptly, corrective saccades bridge spatial deficits.
4. **Leigh, R. J., & Zee, D. S. (2015).** *The Neurology of Eye Movements (5th ed.).* Oxford University Press, New York. [DOI: 10.1093/med/9780199969203.001.0001](https://doi.org/10.1093/med/9780199969203.001.0001)
   - *Key finding:* Brainstem and cerebellar pathways: pontine nuclei and the dorsal vermis/flocculus regulate smooth ocular acceleration.
5. **Land, M. F., & McLeod, P. (2000).** *From eye movements to actions: how batsmen hit the ball.* Nature Neuroscience, 3(12), 1340-1345. [DOI: 10.1038/81861](https://doi.org/10.1038/81861)
   - *Key finding:* Predictive feedforward models compensate for 100–130 ms visual-motor conduction delay by anticipating rebound vectors and foveal anchoring on target leading edges.
6. **Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015).** *Factors influencing the latency of simple reaction time.* Frontiers in Human Neuroscience, 9, 131. [DOI: 10.3389/fnhum.2015.00131](https://doi.org/10.3389/fnhum.2015.00131)
   - *Key finding:* Visual processing delays, input latency, and refresh rate quantization.

---

## 3. Structural & Component Modernization

### Client Component (`AutoPursuitClient.js`)
- **Header:** Replaced uppercase centered title with clean left-aligned sentence case `Smooth Pursuit Tracker` accompanied by an extractable 2-sentence AIO definition.
- **Stat Cards:** Expanded to hairline full-width layout (`grid grid-cols-4 gap-2 w-full`).
- **Heading Hierarchy:** Promoted `About` accordion headings (`h4` -> `h3`, `h5` -> `h4`).
- **Redundancy Elimination:** Removed duplicate client FAQ accordion (`id="faq"`) and duplicate client related drills grid, delegating single-source authority to `DrillGuide`.
- **Clean Imports:** Removed unused `Link`, `DrillFAQItem`, and `RELATED_DRILLS`.

### Server Component (`page.js`)
- **DrillGuide Integration:** Rendered below `AutoPursuitClient`, incorporating verified sources, psychophysics narrative, 5-tier benchmark table, 4 training protocols, and 10 PAA FAQs.
- **Schema Architecture (5 Schemas):**
  1. `BreadcrumbList`: 4-tier structured breadcrumb path.
  2. `SoftwareApplication`: Verified rating, pricing ($0), and `dateModified: "2026-09-05"`.
  3. `WebApplication`: Browser canvas execution requirements.
  4. `FAQPage`: 10 comprehensive questions matching high-volume user and diagnostic queries.
  5. `HowTo`: 3 clear operational steps for target acquisition, tracking, and lock maintenance.

---

## 4. Live Verification Audit

All 20 programmatic audit criteria passed at `http://localhost:3000/drills/visual/tracking-accuracy/pursuit-tracker`:
- [✓ PASS] HTTP 200 Status
- [✓ PASS] Sentence-case H1 'Smooth Pursuit Tracker'
- [✓ PASS] AIO Definition Snippet Present
- [✓ PASS] Stat Cards Grid Full Width ('w-full')
- [✓ PASS] Canvas Element Present
- [✓ PASS] Start Card Component Present
- [✓ PASS] Rules Accordion Present
- [✓ PASS] About Accordion Present
- [✓ PASS] About Heading Promoted to H3
- [✓ PASS] About Subcards Promoted to H4
- [✓ PASS] Purged Client FAQ Accordion
- [✓ PASS] Purged Client Related Drills Section
- [✓ PASS] DrillGuide Component Present
- [✓ PASS] Peer-Reviewed Citations Present (Krauzlis, Rashbass, Bahill, Leigh)
- [✓ PASS] 5-Tier Smooth Pursuit Benchmark Table
- [✓ PASS] 4 Training Protocols Present
- [✓ PASS] 10 PAA FAQs Present in Guide
- [✓ PASS] BreadcrumbList Schema Present
- [✓ PASS] SoftwareApplication & WebApplication Schemas
- [✓ PASS] dateModified: 2026-09-05 in Schemas
