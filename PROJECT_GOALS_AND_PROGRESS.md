# SkillDrills Global Localization & Content Depth Master Tracker

## 1. Project Overview & Overarching Goal
- **Repository:** `C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy`
- **Target Locales:** `de` (German), `es` (Spanish), `fr` (French), `ja` (Japanese), `ko` (Korean), `pt` (Portuguese) across 91 drill routes (545 localized pages total).
- **Core Objective:** Bring every localized drill page up to the full content, scientific, and structural depth of the canonical English versions (`app/drills`) to achieve elite Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) standards.
- **Depth Mandate:** Localized pages must never be shallow, trimmed, or incomplete. They must match or exceed English depth with full peer-reviewed motor-control literature, multi-tier benchmark tables, detailed training protocols, and 10 bespoke FAQs per drill.

---

## 2. Hard Mandates & Architectural Guardrails

### A. Localization & SEO Rules
1. **Absolute Ban on Mechanical Translation / Transcription:**
   - NEVER transcribe or directly translate English drill pages word-for-word into target languages.
   - Use authentic native domain terminology (e.g., in Korean: `끌어치기`, `에임 브레이킹`, `동체시력`; in Japanese: `エイム 反動制御`, `マウス 安定性 テスト`; in German: `Maus Stabilitätstest`, `Hand-Auge-Koordination`).
2. **Mandatory Country-Specific Keyword Research:**
   - Every drill page for every country must align with real, native search queries from regional search engines (Google, Naver, Yahoo Japan). Prioritize high-demand, low-competition ("Soft SERP") queries.
3. **Zero Content Trimming (Preserve Full Depth):**
   - Full scientific introductions citing real motor control literature.
   - Multi-tier benchmark tables (`benchmarks: { title, headers, rows, note }` or array of row objects).
   - In-depth training protocols and device/calibration guidance.
   - **10 bespoke, scientifically grounded FAQs** per page (ZERO placeholder titles like `Q4..Q10` and ZERO repeated boilerplate).

### B. Operational Guardrails
1. **One Drill at a Time Rule:**
   - Work strictly **one drill at a time**.
   - NEVER use batch generation scripts, loops, or templated shortcuts across multiple drills.
   - Author, verify, compile, and validate each drill individually before moving to the next.
2. **Pre-Deployment Search Engine Guardrail:**
   - Absolute ZERO submissions to Bing API or IndexNow (`ENABLE_INDEXNOW=true` strictly forbidden) until final site deployment.
3. **Excluded Scope:**
   - `motor/keyboard-tester`: Excluded by explicit user instruction (the user is handling this drill directly). Do NOT touch this drill.

---

## 3. Comprehensive Audit Baseline
- **Audit Tooling:** Built custom TypeScript AST scanner (`scratch/comprehensive_audit.js`) and runtime prop mismatch scanner (`scratch/check_all_drillguide_props.js`).
- **Baseline Audit Scope:** 91 canonical routes across 6 locales (545 localized pages).
- **Baseline Findings:**
  - Initial defect count: **194 discrepancies** across 35 distinct drill routes.
  - Leakage check: **0 English text leakages** and **0 placeholder strings** (`TODO`, `Lorem ipsum`, `Q4..Q10`).
  - Runtime prop audit: Detected silent prop drops where components defined content in `guide*` that was dropped by `<DrillGuide />` invocations at runtime, as well as broken `pickSources` calls.

---

## 4. Work Completed & Verified

### Route: `memory/working-memory/n-back` (18 Defects Resolved)
- **Status:** COMPLETED & VERIFIED
- **Files Modified:**
  - `app/de/drills/memory/working-memory/n-back/page.js`
  - `app/es/drills/memory/working-memory/n-back/page.js`
  - `app/ja/drills/memory/working-memory/n-back/page.js`
  - `app/ko/drills/memory/working-memory/n-back/page.js`
  - `app/pt/drills/memory/working-memory/n-back/page.js`
  - `app/fr/drills/memory/working-memory/n-back/page.js`
- **Actions Taken:**
  1. `de`, `es`, `ja`, `ko`, `pt`: Replaced `<DrillGuide lead={guide*.lead} ... />` with `<DrillGuide {...guide*} />`. Unlocked the section heading and the 5-paragraph scientific literature review (Kirchner 1958, Baddeley 1986, Diamond 2013, Jaeggi 2008, Cowan 2001, Woods 2015) that were previously omitted at runtime.
  2. `fr`: Authored bespoke 5-paragraph scientific intro in French, added section heading, added 4th metric (`Score cumulé de session`), and spread into `<DrillGuide {...guideFr} />`.
- **Validation:**
  - `check_all_drillguide_props.js`: `UNRENDERED_INTRO_PROP_MISMATCH` dropped to 0 for this route.
  - AST audit defect count dropped from 194 to 176 (-18 defects).
  - All 6 locales have 5 intro paragraphs, 5 benchmark rows, 4 techniques, and 10+ bespoke FAQs.
  - Syntax check: `node -c` clean across all 6 files.

---

## 5. Prioritized Execution Queue (Remaining Work)

### Target 1: `reaction-speed/fps-tracking-trainer` (Next Immediate Task)
- **Locales affected:** `es`, `fr`, `pt`
- **Defects:**
  - `scientificIntro` prop mismatch: Guide object defines `scientificIntro`, but `DrillGuide.js` only ingests `lead`, `intro`, or `overview`. The scientific intro is silently dropped at runtime.
  - `protocols` array trimmed to 3 items (English has 4 items).
- **Files:**
  - `app/es/drills/reaction-speed/fps-tracking-trainer/page.js`
  - `app/fr/drills/reaction-speed/fps-tracking-trainer/page.js`
  - `app/pt/drills/reaction-speed/fps-tracking-trainer/page.js`
- **Planned Fix:** Rename `scientificIntro` to `intro`, add the 4th protocol item in each language, verify via scanner.

### Target 2: Broken `pickSources` Invocations (5 Routes / 7 Files)
- **Problem:** Files pass full literature citations (e.g. `"Stroop, J. R. (1935)..."`) instead of short source keys (e.g. `'stroop1935'`), causing `pickSources` to return an empty array `[]` at runtime.
- **Affected Files:**
  1. `app/es/drills/cognitive/focus/distraction-fighter/page.js`
  2. `app/fr/drills/cognitive/focus/distraction-fighter/page.js`
  3. `app/pt/drills/cognitive/focus/distraction-fighter/page.js`
  4. `app/es/drills/visual-tracking/strobe-prediction-pursuit/page.js`
  5. `app/fr/drills/visual-tracking/strobe-prediction-pursuit/page.js`
  6. `app/pt/drills/visual-tracking/strobe-prediction-pursuit/page.js`
  7. `app/fr/drills/cognitive/focus/concentration-grid/page.js`
- **Planned Fix:** Replace full text citations with valid keys from `lib/drillSources.js`.

### Target 3: French Missing Techniques & Guide Depth
- **Routes:**
  - `app/fr/drills/cognitive/focus/concentration-grid/page.js`
  - `app/fr/drills/memory/spatial-memory/grid-memorization/page.js`
  - `app/fr/drills/memory/spatial-memory/object-location/page.js`
  - `app/fr/drills/memory/spatial-memory/path-tracing/page.js`
- **Planned Fix:** Transcreate missing technique items and restore benchmark/intro depth.

### Target 4: Systematic Resolution of Remaining Depth Discrepancies
- Proceed route by route through the remaining AST audit findings until all 35 routes across all 6 locales reach 100% parity with canonical standards.

---

## 6. Audit & Verification Commands
- **Runtime Prop Mismatch Scanner:**
  ```powershell
  node ./scratch/check_all_drillguide_props.js
  ```
- **AST Content Depth Auditor:**
  ```powershell
  node ./scratch/comprehensive_audit.js
  ```
- **Syntax Check Template:**
  ```powershell
  node -c "<path_to_page.js>"
  ```
