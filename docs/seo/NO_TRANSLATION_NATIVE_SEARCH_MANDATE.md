# Strict Localization & International SEO Mandate: No Translation, Native Search Research Only

**Status:** Enforced Rule  
**Applies To:** All localized drill pages (`ko`, `ja`, `de`, and future locales) across SkillDrills.  
**Reference Gold Standard:** [`http://localhost:3001/ko/drills/fps/flick-shot-training`](file:///C:/Users/sangmesh/Desktop/global-drill-system-nextjs%20-%20Copy/app/ko/drills/fps/flick-shot-training/page.js)

---

## 1. Core Principles & Non-Negotiable Directives

### 1.1 Absolute Ban on Machine Translation and Transcription
- **NEVER directly translate English copy into foreign languages.**
- Mechanical translation, word-for-word substitution, and automated transcriptions are strictly prohibited.
- English training terms must NOT be transliterated phonetically or translated literally when native domain terms exist (e.g., in Korean FPS/motor training, users search for `끌어치기` and `에임 브레이킹`, not awkward direct translations; in balance drills, users search for `균형 감각 테스트`, `외력 저항`, `마우스 제동력`).

### 1.2 Mandatory Country-Specific Keyword Research
- Every single drill page must be built upon real search queries uncovered through localized research for each target country:
  - **South Korea (`ko`):** Google Korea, Naver search queries, DC Inside FPS/gaming communities, Korean sports science/rehab portals.
  - **Japan (`ja`):** Google Japan, Yahoo! Japan Realtime/Search, 5channel, Japanese esports/rehab guides.
  - **Germany (`de`):** Google Germany/DACH, computerbase, specialized German ergonomics and sports physiology sites.
- **Prioritize High-Demand, Low-Competition ("Soft SERP") Keywords:**
  - Target long-tail, high-intent phrases where competitors provide thin or non-existent content.
  - Find the exact queries users type to test or improve that specific cognitive, visual, or motor capability.

### 1.3 Replace Transcribed Content with Searched Native Keywords
- The primary H1, title tag, meta description, drill guide headers, body copy, and FAQ questions must directly integrate the researched high-demand, low-competition keywords.
- Content must read as if natively authored by a local specialist (sports scientist, optometrist, or elite competitive coach) living and working in that country.

### 1.4 Zero Content Trimming (Preserve Full Depth)
- **NEVER slash, condense, or truncate content on localized pages.**
- Every localized page must feature:
  1. **Full Scientific Introduction:** Multiple paragraphs explaining the neuromuscular, cognitive, or physiological mechanism with formal citations (e.g., Schmidt & Lee, Fitts, Woods et al., Elliott et al.).
  2. **Multi-Tier Benchmark Tables:** Complete structured table (`benchmarks: { title, headers, rows, note }`) detailing physiological latency, percentiles, tiers (Novice to Elite), and clinical/competitive thresholds.
  3. **In-Depth Training & Calibration Protocols:** Game-by-game or equipment-by-equipment calibration tips (DPI/eDPI, posture, display refresh rates).
  4. **10 Bespoke, Scientifically Grounded FAQs:** Exactly 10 unique questions and detailed, distinct answers addressing real user dilemmas.
     - **FORBIDDEN:** Numbered placeholder FAQs (`핵심 분석 Q4..Q10`, `重要ポイント Q4..Q10`, `Häufige Frage Q4..Q10`).
     - **FORBIDDEN:** Duplicating the same answer or meta description across multiple FAQs.

### 1.5 One Drill at a Time Rule (Zero Batch Generation)
- **Work strictly on ONE single drill at a time.**
- **Batch generation scripts (`build_all_*`), mass file loops, and automated template stamps are strictly forbidden.**
- For each drill:
  1. Conduct localized keyword research for Korea, Japan, and Germany.
  2. Handcraft the Korean page (`/ko/.../page.js`), Japanese page (`/ja/.../page.js`), and German page (`/de/.../page.js`).
  3. Verify JSON-LD schemas (`BreadcrumbList`, `SoftwareApplication`, `WebApplication`, `VideoGame`, `FAQPage`, `HowTo`).
  4. Compile and test with Next.js build.
  5. Present for inspection before proceeding to the next drill.

### 1.6 Pre-Deployment Search Engine Guardrail
- **Absolute zero submissions to Bing or IndexNow API (`ENABLE_INDEXNOW=true` strictly forbidden)** until final deployment approval.

---

## 2. Audit Verification Checklist for Every Single Drill

Before any localized drill page is considered complete, it must pass the following verification:

| Check | Requirement | Verification Method |
|---|---|---|
| 1 | **Native Keyword Integration** | Primary & secondary keywords derived from local query research, not translated English |
| 2 | **No Translation Artifacts** | Authentic phrasing throughout title, meta description, headers, and body |
| 3 | **Full In-Depth Guide** | Comprehensive scientific introduction with literature citations (minimum 3 paragraphs) |
| 4 | **Benchmark Data Table** | Complete `benchmarks` object with `title`, `headers`, `rows` (5+ rows), and `note` |
| 5 | **10 Bespoke FAQs** | Exactly 10 distinct questions with 10 distinct, non-templated answers |
| 6 | **Zero Placeholder Text** | No `Q1..Q10` repetitive templates, no identical boilerplate paragraphs |
| 7 | **Structured Data (Schema)** | Full `FAQPage`, `HowTo`, `SoftwareApplication`, `BreadcrumbList` schemas present and valid |
| 8 | **Build Verification** | Page passes `npx next build` with zero syntax or hydration errors |

---

## 3. Storage & Enforcement Locations

This rule is permanently active in the following locations:
1. **Antigravity Global Agent Rules:** `C:\Users\sangmesh\.gemini\config\AGENTS.md` (Loaded into context on every turn)
2. **Workspace Agent Rules:** `C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy\AGENTS.md` (Workspace root)
3. **Reference Standard Document:** `C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy\docs\seo\NO_TRANSLATION_NATIVE_SEARCH_MANDATE.md`
