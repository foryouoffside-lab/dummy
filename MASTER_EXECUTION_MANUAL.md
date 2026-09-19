# SkillDrills Master Execution Manual: Goals, Rules & Workflow

> **MANDATE:** This manual is the single source of truth for all localization and depth expansion work in this repository. Follow all rules, quality gates, and workflow steps strictly without drifting.

---

## 1. Overarching Mission & Goal
- **Project:** SkillDrills Multi-Locale Platform (`global-drill-system-nextjs`)
- **Workspace:** `C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy`
- **Goal:** Elevate all 545 localized drill pages across 6 target languages (`de`, `es`, `fr`, `ja`, `ko`, `pt`) to complete parity with the canonical English versions (`app/drills`).
- **AEO / GEO Standard:** Every localized page must provide authoritative, comprehensive scientific depth so that Answer Engines (Perplexity, ChatGPT, Gemini, Claude) and search crawlers cite SkillDrills as the primary domain reference.

---

## 2. Inviolable Rules & Guardrails

### Rule 1: One Drill at a Time Rule (Strictly Enforced)
- Work strictly **one single drill route at a time**.
- NEVER use batch generation scripts, loops, or templated shortcuts across multiple drills.
- Research, author, verify, compile, and validate each drill individually before moving to the next.

### Rule 2: Absolute Ban on Translation / Mechanical Transcription
- NEVER transcribe or directly translate English drill copy into target languages.
- Every drill must be anchored in authentic native search queries researched in the regional search ecosystem (Google DE/ES/FR, Naver KO, Yahoo JP, local gaming/athletic communities).
- Use authentic native domain terminology (e.g. `끌어치기`, `에임 브레이킹`, `동체시력`, `エイム 反動制御`, `マウス 安定性 テスト`, `Maus Stabilitätstest`, `Hand-Auge-Koordination`).

### Rule 3: Zero Content Trimming (Preserve Full Depth)
- Localized pages must match or exceed the depth of the canonical English drill.
- Every page must contain:
  1. Full scientific introduction citing real motor control, neuroscience, and psychophysics literature.
  2. Multi-tier benchmark tables with localized metrics and percentiles.
  3. Minimum 4 detailed training protocols with biomechanical/calibration guidance.
  4. **10 bespoke, scientifically grounded FAQs** per page (ZERO placeholder titles like `Q4..Q10`, ZERO repeated answers).

### Rule 4: Pre-Deployment Guardrail (IndexNow Protection)
- Absolute ZERO submissions to Bing API or IndexNow (`ENABLE_INDEXNOW=true` strictly forbidden) until final site deployment.

### Rule 5: User-Excluded Scope
- `motor/keyboard-tester` is strictly handled by the user. Do NOT modify or audit this route.

---

## 3. The 5 Non-Negotiable Quality Gates (Per Drill)

Before any drill is marked resolved, it must pass all 5 gates:

| Gate | Criterion | Tool / Verification Command | Pass Condition |
| :--- | :--- | :--- | :--- |
| **G1: Props** | No unrendered props (`lead`, `scientificIntro`) | `node ./scratch/check_all_drillguide_props.js` | 0 defects for the route |
| **G2: Depth** | Full intro paras, 5 benchmark tiers, 4+ protocols, 10 FAQs | `node ./scratch/comprehensive_audit.js` | 0 defects for the route |
| **G3: Sources** | Valid source keys in `pickSources(...)` | Test import against `lib/drillSources.js` | Returns non-empty array |
| **G4: Syntax** | Valid JS/JSX syntax without build errors | `node -c <path_to_page.js>` | Exit code 0 on all files |
| **G5: Guardrail** | Search engine isolation | Inspect environment variables | `ENABLE_INDEXNOW=false` |

---

## 4. Operational Workflow (Phase by Phase)

```
[Phase 1: Deep Research] 
   └── Run AST & Prop Scanners -> Identify exact defect & missing items vs English
[Phase 2: Planning & Review]
   └── Draft implementation_plan.md -> Request review -> Await User Approval
[Phase 3: Deep Execution]
   └── Fix runtime props -> Author authentic native copy -> Add missing items
[Phase 4: 5-Gate Verification]
   └── Run Prop Scanner -> Run AST Auditor -> Run Syntax Check -> Confirm 0 defects
[Phase 5: Walkthrough & Log]
   └── Write walkthrough.md -> Update MASTER_EXECUTION_MANUAL.md
[Phase 6: Advance Queue]
   └── Move to next prioritized drill in the Roadmap
```

---

## 5. Execution Roadmap & Queue Status

### Phase 1: Completed Targets
- [x] **`memory/working-memory/n-back`**
  - **18 defects resolved across 6 locales.**
  - Props spread in `de`, `es`, `ja`, `ko`, `pt` (unlocked heading and 5 scientific intro paragraphs).
  - French (`fr`) expanded with 5-paragraph scientific intro, section heading, and 4th metric.
  - Verified: 0 remaining defects on this route.

- [x] **`reaction-speed/fps-tracking-trainer`**
  - **6 defects resolved across `es`, `fr`, `pt`.**
  - Structured `intro: { title, paragraphs: [...] }` replaces `scientificIntro` string in `es`, `fr`, `pt`.
  - Added 4th training protocol on strafe reversals and motor deceleration in `es`, `fr`, `pt`.
  - Verified: 0 remaining defects on this route (100% depth parity across all 6 locales).

---

### Phase 2: Active & Immediate Targets
- [ ] **Target 2 (ACTIVE): Broken `pickSources` Citation Strings (5 routes / 7 files)**
  - **Problem:** Files pass raw citation strings (e.g. `"Stroop, J. R. (1935)..."`) instead of citation keys (`'stroop1935'`), causing `pickSources` to return empty arrays `[]` at runtime.
    - `pt/drills/visual-tracking/strobe-prediction-pursuit/page.js`
    - `fr/drills/cognitive/focus/concentration-grid/page.js`
  - **Action:** Replace full citation strings with valid canonical keys from `lib/drillSources.js`.

- [ ] **Target 3: French Missing Techniques & Guide Depth (4 routes)**
  - **Affected:** `concentration-grid`, `grid-memorization`, `object-location`, `path-tracing`.
  - **Action:** Transcreate missing techniques and restore full guide depth.

- [ ] **Target 4: Systematic Iterative Resolution of Remaining 31 Routes**
  - Execute one route at a time through all remaining audit discrepancies until all 91 routes across all 6 locales reach 100% parity.
