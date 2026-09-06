# Divided Attention Test — Keyword Research, AEO/GEO & Overhaul Summary

**Drill Path:** `/drills/cognitive/attention/divided-attention`  
**Canonical Name:** Divided Attention Test  
**Category:** Cognitive Drills (`/drills/cognitive`)  
**Subcategory:** Attention Training  
**Audit Date:** 2026-09-05  

---

## 1. Metadata & Search Relevance Audit

| Surface | Copy / Target String | Character Count | Constraint Limit | Status |
|:---|:---|:---:|:---:|:---:|
| `<title>` | `Divided Attention Test - Free Dual-Task Focus Game` | **49** | $\le 60$ chars | **PASSED** |
| `<meta name="description">` | `Test your divided attention and dual-task capacity online. Track moving visual targets while processing numerical streams in this free split-focus drill.` | **153** | $\le 155$ chars | **PASSED** |
| OpenGraph Title | `Divided Attention Test - Free Dual-Task Focus Game \| SkillDrills` | 64 | Match title + brand | **PASSED** |
| OpenGraph Image Alt | `Divided Attention Test — free browser dual-task visual tracking & number stream cognitive drill` | 94 | Descriptive | **PASSED** |
| H1 Heading | `Divided Attention Test` | 22 | Sentence case, left-aligned | **PASSED** |
| Canonical URL | `https://skilldrills.online/drills/cognitive/attention/divided-attention` | — | Self-referencing | **PASSED** |

---

## 2. AEO & GEO Extractable Answer Block

Rendered directly below the left-aligned sentence-case H1:

> **Divided attention** is the executive capacity to allocate mental bandwidth across multiple concurrent stimulus streams without catastrophic error. Because central cognitive bottlenecks create severe dual-task interference when tasks compete for identical processing resources (Pashler, 1994; Wickens, 2002), sustained dual-task drills train the prefrontal cortex to orchestrate parallel visual and numerical channels with minimal cross-stream cost.

- **Extractability:** Concise 2-sentence direct answer providing immediate factual value for AI answer engines (Perplexity, ChatGPT Search, Bing Copilot, Google AI Overviews).
- **Literature Grounding:** Direct inline citations of Harold Pashler's Central Bottleneck Model (1994) and Christopher D. Wickens' Multiple Resource Theory (2002).
- **Non-Diagnostic Framing:** 100% athletic and educational focus with zero clinical/medical claims (§4.7).

---

## 3. Structured Data & Schema Parity Audit

| Schema Type | Implementation & Enhancements | Parity Status |
|:---|:---|:---:|
| `BreadcrumbList` | 4-tier hierarchy: Home $\to$ Drills Hub $\to$ Cognitive Drills $\to$ Divided Attention Test | 1:1 Verified |
| `WebApplication` | **Purged `aggregateRating`** (zero fabricated user review scores per §4.3). Added `dateModified: "2026-09-05"`, `isAccessibleForFree: true`, `applicationCategory: "EducationalApplication"`, and educational curriculum mappings. | Clean |
| `HowTo` | 4 instructional steps: Initiate Dual Stream, Track & Tap Visual Targets, Classify Numerical Stream Simultaneously, Maintain Dual Channel Accuracy. | 1:1 with gameplay |
| `FAQPage` | **10 comprehensive questions & answers**, single-source mapped to `DrillGuide` visible accordion via `faqSchema.mainEntity.map(...)`. | **100% DOM-Schema Parity** |

---

## 4. Peer-Reviewed Academic Literature & Verified DOIs

All performance tiers, mechanism analyses, and timing explanations in `lib/drillSources.js` and `DrillGuide` are backed by peer-reviewed experimental literature with permanent DOIs:

1. **Pashler, H. (1994):** *Dual-task interference in simple tasks: Data and theory.*  
   *Psychological Bulletin*, 116(2), 220–244.  
   DOI: [`10.1037/0033-2909.116.2.220`](https://doi.org/10.1037/0033-2909.116.2.220)  
   *Contribution:* Defines the psychological refractory period (PRP) and the central structural bottleneck in response selection.
2. **Wickens, C. D. (2002):** *Multiple resources and performance prediction.*  
   *Theoretical Issues in Ergonomics Science*, 3(2), 159–177.  
   DOI: [`10.1080/14639220210123806`](https://doi.org/10.1080/14639220210123806)  
   *Contribution:* Multiple Resource Theory; explains why separating tasks into spatial visual tracking and symbolic numerical classification reduces cross-channel interference.
3. **Strayer, D. L., & Johnston, W. A. (2001):** *Driven to distraction: Dual-task studies of simulated driving and conversing on a cellular telephone.*  
   *Psychological Science*, 12(6), 462–466.  
   DOI: [`10.1111/1467-9280.00386`](https://doi.org/10.1111/1467-9280.00386)  
   *Contribution:* Quantifies dual-task costs in driving (twofold increase in missed signals and slower brake responses under secondary cognitive load).
4. **Spelke, E., Hirst, W., & Neisser, U. (1976):** *Skills of divided attention.*  
   *Cognition*, 4(3), 215–230.  
   DOI: [`10.1016/0010-0277(76)90018-4`](https://doi.org/10.1016/0010-0277(76)90018-4)  
   *Contribution:* Proves that divided attention is an expandable cognitive skill that responds to systematic practice through task automation.
5. **Woods, D. L., et al. (2015):** *Factors influencing the latency of simple reaction time.*  
   *Frontiers in Human Neuroscience*, 9, 131.  
   DOI: [`10.3389/fnhum.2015.00131`](https://doi.org/10.3389/fnhum.2015.00131)  
   *Contribution:* Establishes display quantization latency (~16.7 ms at 60 Hz down to ~4.1 ms at 240 Hz) and input polling limits.

---

## 5. Zero Anchor Drift Audit

Rule 6 of §10c: Every cross-link pointing to `/drills/cognitive/attention/divided-attention` must use the exact anchor `Divided Attention Test` defined in `DRILL_SEO`.

| File Location | Previous Anchor | Updated Anchor | Status |
|:---|:---|:---|:---:|
| `lib/drillsRegistry.js` | `"Divided Attention"` | `"Divided Attention Test"` | **MATCH** |
| `lib/drillSeo.js` | `anchor: 'Divided Attention Test'` | `anchor: 'Divided Attention Test'` | **CANONICAL** |
| `ConcentrationStaminaClient.js` | `"Divided Attention Test"` | `"Divided Attention Test"` | **MATCH** |
| `concentration-stamina/page.js` | `"Divided Attention Test"` | `"Divided Attention Test"` | **MATCH** |
| `SymbolMatchingClient.js` | `"Divided Attention"` | `"Divided Attention Test"` | **FIXED** |
| `RSVPReaderClient.js` | `"Divided Attention"` | `"Divided Attention Test"` | **FIXED** |
| `DistractionFighterClient.js` | `"Divided Attention"` | `"Divided Attention Test"` | **FIXED** |
| `ConcentrationGridClient.js` | `"Divided Attention"` | `"Divided Attention Test"` | **FIXED** |
| `DualTargetFlowClient.js` | `"Divided Attention"` | `"Divided Attention Test"` | **FIXED** |

---

## 6. §8b House Style & Layout Overhaul

1. **Title & AEO Answer:** Moved from centered all-caps to a left-aligned, sentence-case H1 (`Divided Attention Test`) sitting directly above the drill box with a 2-sentence sourced answer.
2. **Stat Cards:** Converted from narrow centered container (`max-w-2xl mx-auto`) to full-width flush cards (`grid grid-cols-4 gap-2 w-full -mb-2`), aligning flush with the canvas stage.
3. **Accordion Cleanup:** Removed duplicate handwritten client FAQ accordion to eliminate schema-DOM divergence. Only `DrillGuide` renders the FAQ, sourced directly from `faqSchema.mainEntity`.
4. **Start Card & Share Assets:** Updated `FpsStartCard` title and share sheet text to canonical `Divided Attention Test`.
5. **No Game Loop Touches:** All core game physics, speed ramping, combo multipliers, and storage key (`skilldrills_divided_attention_v8`) remain completely intact.
