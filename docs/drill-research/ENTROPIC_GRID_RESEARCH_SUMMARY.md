# Entropic Grid Visual Search — Research & Engineering Summary (Part 37)

**Drill Route:** `/drills/visual/visual-recognition/entropic-grid`  
**Target Registry ID:** `visual-entropic-grid`  
**Execution Date:** September 5, 2026  
**Status:** 100% Modernized & Live-Verified (20/20 Checks Passed)

---

## 1. Search Landscape & AEO Analysis

### Volume & Search Intent
- **Primary Keywords:**
  - `"concentration grid test"` (~1,200 global searches/mo) — Foundational sports vision and cognitive diagnostic search
  - `"visual search test"` — Core cognitive psychology search
  - `"concentration grid online free"` — Direct transactional user intent
- **High-Intent Secondary Keywords:**
  - `"visual search task"` — Laboratory neuropsychological testing
  - `"visual scanning test"` — Occupational therapy and clinical visual evaluation
  - `"cognitive focus grid"` — Athletic mental focus query
  - `"attention concentration test"` — Broad attentional assessment
  - `"visual noise filtering"` — Perceptual distractor suppression
  - `"visual recognition test"` — Alphanumeric pattern recognition speed
  - `"feature search test"` — Visual psychophysics query
  - `"perceptual speed test"` — Processing speed evaluation
  - `"visual cancellation test"` — Clinical cancellation alternative

### Multilingual Anchors & Localized Targets
- **Japanese (`ja`):** `集中力グリッド テスト` (Concentration Grid Test) | Secondary: `視覚探索 テスト`, `注意集中 検査`, `視覚走査 訓練`
- **Korean (`ko`):** `집중력 그리드 검사` (Concentration Grid Test) | Secondary: `시각 탐색 검사`, `주의집중력 검사`, `시각 스캐닝 훈련`
- **German (`de`):** `konzentrationsgitter test` (Concentration Grid Test) | Secondary: `visuelle suche test`, `suchmatrix test`, `aufmerksamkeitsgitter test`

---

## 2. Peer-Reviewed Psychophysics & Citations

The educational guide is grounded in 6 peer-reviewed papers pre-registered in `lib/drillSources.js`:

1. **Treisman, A. M., & Gelade, G. (1980).** *A feature-integration theory of attention.* Cognitive Psychology, 12(1), 97-136. [DOI: 10.1016/0010-0285(80)90005-5](https://doi.org/10.1016/0010-0285(80)90005-5)
   - *Key finding:* Preattentive feature search vs. serial conjunctive search; feature binding requires focal spatial attention.
2. **Wolfe, J. M. (1994).** *Guided Search 2.0 A revised model of visual search.* Psychonomic Bulletin & Review, 1(2), 202-238. [DOI: 10.3758/BF03200774](https://doi.org/10.3758/BF03200774)
   - *Key finding:* Interaction of bottom-up visual saliency and top-down cognitive priority maps to guide serial search saccades.
3. **Lavie, N. (1995).** *Perceptual load as a necessary condition for selective attention.* Journal of Experimental Psychology: Human Perception and Performance, 21(3), 451-468. [DOI: 10.1037/0096-1523.21.3.451](https://doi.org/10.1037/0096-1523.21.3.451)
   - *Key finding:* Perceptual load theory; high perceptual load consumes attentional capacity and automatically suppresses background distractor noise.
4. **Eriksen, C. W., & St. James, J. D. (1986).** *Visual attention within and around the field of focal attention: A zoom lens model.* Perception & Psychophysics, 40(4), 225-240. [DOI: 10.3758/BF03211502](https://doi.org/10.3758/BF03211502)
   - *Key finding:* Zoom lens model of attention; trade-off between attentional field width and spatial processing resolution.
5. **Posner, M. I. (1980).** *Orienting of attention.* Quarterly Journal of Experimental Psychology, 32(1), 3-25. [DOI: 10.1080/00335558008248231](https://doi.org/10.1080/00335558008248231)
   - *Key finding:* Overt vs. covert attentional orienting and parafoveal target filtering.
6. **Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015).** *Factors influencing the latency of simple reaction time.* Frontiers in Human Neuroscience, 9, 131. [DOI: 10.3389/fnhum.2015.00131](https://doi.org/10.3389/fnhum.2015.00131)
   - *Key finding:* Chronometric latency thresholds and motor response constraints.

---

## 3. Structural & Component Modernization

### Client Component (`EntropicGridClient.js`)
- **Header:** Modernized to left-aligned sentence-case `Entropic Grid Visual Search` with an extractable 2-sentence AIO definition snippet.
- **Stat Cards:** Converted to full-width hairline grid (`grid grid-cols-4 gap-2 w-full`).
- **Heading Hierarchy:** Promoted `About` accordion headings (`h4` -> `h3`, `h5` -> `h4`).
- **Redundancy Elimination:** Removed duplicate client FAQ accordion (`id="faq"`) and duplicate client related drills section (`Related Visual Drills`).
- **Clean Imports:** Purged unused `Link`, `DrillFAQItem`, and `RELATED_DRILLS`.

### Server Component (`page.js`)
- **DrillGuide Integration:** Rendered below `EntropicGridClient` with verified academic sources, cognitive psychophysics narrative, 5-tier benchmark table, 4 scanning protocols, and 10 PAA FAQs.
- **Schema Architecture (5 Schemas):**
  1. `BreadcrumbList`: 4-tier structured breadcrumbs.
  2. `SoftwareApplication`: HealthApplication category, $0 pricing, verified ratings, and `dateModified: "2026-09-05"`.
  3. `WebApplication`: HTML5 canvas / JavaScript execution requirements.
  4. `FAQPage`: 10 comprehensive questions matching real user search intent.
  5. `HowTo`: 3 structured steps for code acquisition, matrix scanning, and rapid target selection.

---

## 4. Live Verification Audit

All 20 programmatic audit criteria passed at `http://localhost:3000/drills/visual/visual-recognition/entropic-grid`:
- [✓ PASS] HTTP 200 Status
- [✓ PASS] Sentence-case H1 'Entropic Grid Visual Search'
- [✓ PASS] AIO Definition Snippet Present
- [✓ PASS] Stat Cards Grid Full Width ('w-full')
- [✓ PASS] Grid Stage Present
- [✓ PASS] Start Card Component Present
- [✓ PASS] Rules Accordion Present
- [✓ PASS] About Accordion Present
- [✓ PASS] About Heading Promoted to H3
- [✓ PASS] About Subcards Promoted to H4
- [✓ PASS] Purged Client FAQ Accordion
- [✓ PASS] Purged Client Related Drills Section
- [✓ PASS] DrillGuide Component Present
- [✓ PASS] Peer-Reviewed Citations Present (Treisman, Wolfe, Lavie, Eriksen)
- [✓ PASS] 5-Tier Visual Search Benchmark Table
- [✓ PASS] 4 Training Protocols Present
- [✓ PASS] 10 PAA FAQs Present in Guide
- [✓ PASS] BreadcrumbList Schema Present
- [✓ PASS] SoftwareApplication & WebApplication Schemas
- [✓ PASS] dateModified: 2026-09-05 in Schemas
