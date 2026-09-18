# SkillDrills Global Transcreation & Optimization Playbook

**Status:** Active Master Execution Standard  
**Applies To:** All 82 Drills across all categories (`reaction-speed`, `physical`, `fps`, `visual-tracking`, `cognitive`, `motor`, `visual`, `memory`)  
**Mandate Source:** `AGENTS.md` and `docs/seo/GLOBAL_PAGE_SEO_AEO_GEO_STANDARD.md`

---

## 1. Executive Summary & Core Rules

This document records the exact protocol established and proven during the completion of the **Reaction Speed** category (8/8 drills) and **Drill #28** (`physical/balance-training/stability-challenge`). This standard **must be strictly followed for every remaining drill** in the catalog.

### Fundamental Non-Negotiable Rules:
1. **One Drill at a Time:** Never use batch scripts, loops, or mass templating. Each drill is researched, written, compiled, and verified individually.
2. **Absolute Ban on Translation:** Never mechanically translate English text. All non-English copy must be built from scratch around authentic, high-demand domestic search queries researched for each country market.
3. **Zero Content Trimming (Full Untrimmed Depth):** Localized pages must match or exceed the gold standard (`flick-shot-training`). Every drill page must include a full scientific intro with real motor control literature citations, a 5-tier benchmark table, training protocols, and 10 bespoke FAQs.
4. **Pre-Deployment Guardrail:** Absolute ZERO submissions to Bing API or IndexNow (`ENABLE_INDEXNOW=true` strictly forbidden) until final site deployment.

---

## 2. Seven-Locale Quality Checklist (Per Drill)

Each drill must exist across all 7 supported locales:
- `en`: English (Global / Fallback `x-default`)
- `de`: German (Germany / DACH)
- `ko`: Korean (South Korea)
- `ja`: Japanese (Japan)
- `pt`: Portuguese (Brazil & Portugal)
- `es`: Spanish (Spain & Latin America)
- `fr`: French (France & Francophonie)

### A. Metadata & SERP Snippet
- **Title Tag:** Maximum **60 characters**, front-loading the native primary search keyword followed by `| SkillDrills`.
- **Meta Description:** Maximum **155 characters**, active voice, summarizing the specific drill capability and benefits.
- **Canonical URL:** Self-referencing URL for every locale (e.g. `https://skilldrills.online/{locale}/drills/...`).
- **Keywords Array:** 8–15 distinct, authentic search phrases in the native language. **Zero English keyword leakage** in non-English arrays (e.g., no `"free aim trainer"`, `"how to improve"`, etc.).

### B. International Route Mapping (`lib/i18n/locales.js`)
- Every completed drill must be registered under `ROUTE_LOCALES` with all 6 non-default locales:
  ```js
  '/drills/<category>/<slug>': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  ```
- This ensures Next.js renders all **8 reciprocal alternate `hrefLang` links** (`en`, `de`, `ko`, `ja`, `pt`, `es`, `fr`, `x-default`) in the `<head>` of every page.

### C. Structured Data (Exactly 6 Schema.org JSON-LD Blocks)
Each localized page must inject exactly 6 JSON-LD schemas via `<script type="application/ld+json">`:
1. `BreadcrumbList`: Hierarchical path (`Home` > `Drills Hub` > `Category` > `Drill Name`).
2. `SoftwareApplication`: Localized application details, category, offers (`price: 0`).
3. `WebApplication`: Browser requirements (Pointer Lock API, WebGL, etc.).
4. `VideoGame`: Categorized gaming item, skill attributes, single-player.
5. `FAQPage`: Exactly 10 bespoke Q&As answering real domestic search queries.
6. `HowTo`: Step-by-step instructions (1 to 4 actionable steps) for completing the drill.

### D. Scientific Guide & 5-Tier Benchmark Table
Every page must pass canonical `guideProps` into `<DrillGuide {...guideProps} />`:
- **Scientific Intro:** Multi-paragraph theoretical grounding citing peer-reviewed motor control and neuroscience literature via `pickSources(...)`.
- **Benchmark Table:** Standardized 5-tier table format:
  ```js
  benchmarks: {
    title: "Localized Table Title",
    headers: ["Tier", "Rank Title", "Metric / Score", "Level / Retention", "Grade", "Percentile"],
    rows: [
      ["Tier 1", "Apex / Radiant", "...", "...", "Nota S+", "Top 0.5% – 1%"],
      ["Tier 2", "Master / Advanced", "...", "...", "Nota A", "Top 5%"],
      ["Tier 3", "Competitive / Intermediate", "...", "...", "Nota B", "Top 20%"],
      ["Tier 4", "Developing / Regular", "...", "...", "Nota C", "Top 50%"],
      ["Tier 5", "Novice / Perturbed", "...", "...", "Nota D", "Base (Starting Out)"],
    ],
    note: "Scientific citation and testing methodology explanation."
  }
  ```
- **10 Bespoke FAQs:** Must match the 10 entries in `faqSchema.mainEntity`. Zero placeholder titles (`Q1..Q10`) and zero repeated boilerplate.

---

## 3. The 3-Step Verification Pipeline

Every drill must pass all three stages before being declared complete:

```
[Step 1: Source AST Audit (verify_drill_X.py)]
      │
      ▼
[Step 2: Production Build (npm run build)]
      │
      ▼
[Step 3: Static HTML Audit (audit_drill_X_html.py)]
      │
      ▼
[Step 4: Category Archive & Walkthrough Update]
```

### Stage 1: Source Code Verification Script (`verify_drill_X.py`)
A custom Python script evaluates all 7 workspace files (`page.js` / `page.tsx`) against:
- Title length <= 60 chars.
- Description length <= 155 chars.
- Exact self-referencing canonical URL.
- `languages: getAlternateLanguages('/drills/<category>/<slug>')`.
- Presence of all 6 schemas.
- >= 10 FAQs.
- Structured benchmark table with >= 5 tiers.
- Zero English keyword leaks in non-English keyword arrays.

### Stage 2: Production Build (`npm run build`)
- Compiles Next.js production build (`next build`).
- Must exit with **Exit Code 0** and successfully generate all static pages.
- Validates that TypeScript, JSX, imports, and component wrappers build cleanly without runtime exceptions.

### Stage 3: Prerendered Static HTML Audit (`audit_drill_X_html.py`)
A custom Python script audits the actual generated static HTML files in `.next/server/app/`:
- Verifies `<link rel="canonical" href="...">` matches the expected self URL.
- Verifies all **8 reciprocal `hrefLang` alternates** (`en`, `de`, `ko`, `ja`, `pt`, `es`, `fr`, `x-default`) are rendered in the HTML `<head>`.
- Verifies all **6 Schema.org JSON-LD scripts** are physically rendered in the DOM.
- Verifies the **benchmark `<table>`** element is rendered with at least 5 rows.

---

## 4. Archive & Non-Duplication Protocol

Once a category or drill is verified:
1. **Permanent Archive Folder:**
   - Save the localized keywords, titles, descriptions, and canonicals in `docs/completed-drills/<category>/`.
   - Create individual drill Markdown files (`01_<slug>.md`, etc.).
   - Create/update `registry.json` with machine-readable metadata.
   - Create/update `README.md` with the Master Localized Primary Keywords Matrix.
2. **Collision Prevention:**
   - Future drills must inspect `registry.json` and master keyword matrices to ensure their primary and secondary keywords do not cannibalize completed drills.
3. **Walkthrough Documentation:**
   - Record the drill in `walkthrough.md` with verified character counts, keywords, and audit results.

---

## 5. Execution Roadmap for the Remaining 73 Drills

The 73 remaining drills will be processed category-by-category using this exact playbook:

1. **Physical Training** (10 remaining drills, starting with `physical/coordination/complex-pattern`)
2. **FPS Drills** (15 remaining drills)
3. **Visual Tracking** (15 remaining drills)
4. **Cognitive** (8 remaining drills)
5. **Motor Control** (9 remaining drills)
6. **Visual Perception** (9 remaining drills)
7. **Memory** (7 remaining drills)
