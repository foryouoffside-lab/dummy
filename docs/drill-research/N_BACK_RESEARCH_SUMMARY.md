# Comprehensive Research & Search Architecture Summary: N-Back Working Memory Test (`n-back`)

**Drill Directory:** `app/drills/memory/working-memory/n-back`  
**Route URL:** `/drills/memory/working-memory/n-back`  
**Category:** Working Memory / Cognitive Executive Function  
**Date of Modernization:** September 5, 2026  
**Status:** COMPLETE (20/20 Live Audits Passed)

---

## 1. Executive Summary & Core Methodology
The **N-Back Working Memory Test** is the gold standard continuous-recognition paradigm used in cognitive neuroscience and clinical neuropsychology to assess working memory capacity, continuous updating, and executive inhibitory control. Originally introduced by Wayne K. Kirchner in 1958, the task requires participants to monitor a sequential stream of visual stimuli (letters, spatial positions, or shapes) presented at rapid intervals (typically 2,000–3,000 ms stimulus onset asynchrony) and indicate whether the current item matches the item presented exactly *n* steps earlier.

Under House Style §8b, the drill was comprehensively overhauled:
1. **Left-Aligned Sentence-Case Typography:** Converted to `N-Back Working Memory Test` with an immediate, extractable 2-sentence AIO/definition snippet.
2. **Hairline Precision Grid:** Upgraded stat displays to `grid grid-cols-4 gap-2 w-full` with micro-labels (`N-LEVEL`, `ACCURACY`, `CORRECT`, `ERRORS`).
3. **Structured Single-Source Content Architecture:** Extracted duplicated client FAQ accordions and related cards into the unified `DrillGuide` component.
4. **Rich JSON-LD Multi-Schema (5 Types):** Injected `BreadcrumbList`, `SoftwareApplication`, `WebApplication`, `FAQPage`, and `HowTo` with `dateModified: "2026-09-05"`.
5. **Rigorous Cognitive Psychophysics & Chronometry:** Grounded in Wayne K. Kirchner (1958), Alan Baddeley (1986, 2000), Adele Diamond (2013), Susanne M. Jaeggi et al. (2008), Nelson Cowan (2001, 2010), and David L. Woods et al. (2015).

---

## 2. Keyword Intelligence & Search Intent Analysis
- **Primary Target Keyword:** `n back test` (Search Volume: 910 global, High Intent)
- **Secondary Target Keywords:**
  - `n back working memory test`
  - `dual n back test`
  - `n back task online`
  - `working memory test n back`
  - `n back cognitive test`
- **International Anchor Queries:**
  - Japanese (`ja`): `Nバック 課題` (N-Back Kadai)
  - Korean (`ko`): `N백 검사` (N-Back Geomsa)
- **Harvested Data Artifacts:**
  - `scripts/keywords/out/n-back-raw.json` (96 harvested search queries)
  - `scripts/keywords/out/n-back-global-2026-09-05.csv`
  - `scripts/keywords/out/n-back-global-2026-09-05.md`
- **Link Graph Integration:**
  Updated `lib/drillSeo.js` with exact query volume, secondary keywords, and East Asian international anchor translations.

---

## 3. Cognitive Psychophysics & Empirical Benchmark Tiers

### A. Theoretical Grounding
- **Wayne K. Kirchner (1958):** Introduced the N-back continuous-updating task to examine age-related differences in the retention of rapidly changing visual information.
- **Alan Baddeley (1986, 2000):** Multi-component working memory model detailing the interaction between the central executive, phonological loop, and visuospatial sketchpad during continuous memory updating.
- **Adele Diamond (2013):** Core executive function taxonomy linking working memory updating with cognitive flexibility and inhibitory control.
- **Susanne M. Jaeggi et al. (2008):** PNAS landmark study on working memory training through adaptive N-back tasks and transfer effects on fluid intelligence ($G_f$).
- **Nelson Cowan (2001, 2010):** The magical number 4 in short-term memory: capacity limits of focal attentional focus without chunking strategies.
- **David L. Woods et al. (2015):** Precise computerized latency chronometry and signal detection theory ($d'$ sensitivity) in working memory paradigms.

### B. Empirical Stratification
| Tier | Performance Band | N-Level & Accuracy | Cognitive & Neurological Profile |
| :--- | :--- | :--- | :--- |
| **Tier 1** | Exceptional / Elite | 4-Back (Accuracy $\ge 85\%$) or 5-Back | Elite central executive bandwidth; flawless rapid buffer displacement without interference. |
| **Tier 2** | Superior | 3-Back (Accuracy $\ge 85\%$) | High-capacity working memory; rapid phonological buffer updating and robust proactive interference inhibition. |
| **Tier 3** | Solid Baseline | 2-Back (Accuracy $\ge 80\%$) | Standard healthy adult cognitive benchmark; stable updating under moderate cognitive load. |
| **Tier 4** | Moderate | 2-Back (Accuracy $60\% - 79\%$) | Functional short-term retention, but susceptible to lures and rapid temporal decay. |
| **Tier 5** | Developing | 1-Back (Accuracy $< 80\%$) or 2-Back ($< 60\%$) | High vulnerability to attentional capture; significant central executive depletion. |

---

## 4. Evidence-Based Training Protocols

1. **Protocol 1: Dual-Modality Buffer Expansion (Adaptive N-Back)**
   - *Frequency:* 4 sessions/week, 20 minutes/session, 6-week progressive cycle.
   - *Design:* Train at $N-1$ until accuracy exceeds $85\%$ across 3 consecutive blocks, then increment to $N$. Return to $N-1$ if accuracy drops below $70\%$.
2. **Protocol 2: High-Speed Executive Updating Sprint**
   - *Frequency:* 3 sessions/week, 10 minutes/session.
   - *Design:* Rapid stimulus presentation (1,500 ms ISI) at 2-Back to force rapid phonological and spatial buffer evacuation.
3. **Protocol 3: Lure Discrimination & Interference Resistance**
   - *Frequency:* 2 sessions/week, 15 minutes/session.
   - *Design:* Stimulus streams embedded with 40% $(N-1)$ and $(N+1)$ lure stimuli to systematically train lateral prefrontal inhibitory control.
4. **Protocol 4: Tactical Esports Working Memory Maintenance**
   - *Frequency:* Daily warm-up, 5 minutes prior to competitive play.
   - *Design:* Fast 2-Back to 3-Back calibration routine to prime prefrontal dopaminergic gating.

---

## 5. Live Production Audit Results

Live endpoint verified via `scratch/verify_n_back_live.js` against Next.js production/dev runtime:

| # | Check Parameter | Expected Target | Live Status |
| :---: | :--- | :--- | :---: |
| 1 | HTTP Response | Status 200 OK | **PASS** |
| 2 | Typography H1 | Left-aligned sentence-case `N-Back Working Memory Test` | **PASS** |
| 3 | Definition Snippet | 2-sentence direct answer container | **PASS** |
| 4 | Metric Display | `grid grid-cols-4 gap-2 w-full` hairline cards | **PASS** |
| 5 | BreadcrumbList Schema | Structured JSON-LD with hierarchy | **PASS** |
| 6 | SoftwareApplication Schema | `applicationCategory: "HealthApplication"` | **PASS** |
| 7 | WebApplication Schema | `operatingSystem: "Any"` | **PASS** |
| 8 | FAQPage Schema | Structured entity schema | **PASS** |
| 9 | HowTo Schema | Step-by-step test execution schema | **PASS** |
| 10 | Freshness Timestamp | `dateModified: "2026-09-05"` | **PASS** |
| 11 | Citation: Kirchner | Wayne K. Kirchner (1958) | **PASS** |
| 12 | Citation: Baddeley | Alan Baddeley (1986, 2000) | **PASS** |
| 13 | Citation: Diamond | Adele Diamond (2013) | **PASS** |
| 14 | Citation: Jaeggi et al. | Susanne M. Jaeggi et al. (2008) | **PASS** |
| 15 | Citation: Cowan | Nelson Cowan (2001, 2010) | **PASS** |
| 16 | Citation: Woods et al. | David L. Woods et al. (2015) | **PASS** |
| 17 | Empirical Tiers | 5 distinct benchmark performance bands | **PASS** |
| 18 | Harvested PAA FAQs | 10 high-value questions injected | **PASS** |
| 19 | Client FAQ Cleanup | Duplicate client `id="faq"` removed | **PASS** |
| 20 | Client Cross-Links | Duplicate client related cards removed | **PASS** |

**Final Audit Score:** 20 / 20 Checks Passed (100% Compliance with House Style §8b).
