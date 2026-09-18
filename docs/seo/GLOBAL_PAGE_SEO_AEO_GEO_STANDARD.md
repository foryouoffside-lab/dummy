# GLOBAL PAGE SEO, AEO & GEO OPTIMIZATION STANDARD
**SkillDrills International Search & Answer Engine Standard Operating Procedure**  
*Immutable Source of Truth — Every page optimization run MUST adhere strictly to these rules.*

---

## 1. THE FOUNDATIONAL PRINCIPLES (NON-NEGOTIABLE)

### Principle 1: Demand-Driven Country Page Creation Only
* **Rule:** NEVER create a country-specific localized page (`/ja/`, `/ko/`, `/pt/`, `/de/`, etc.) unless verified search demand exists in that specific country.
* **No Demand = No Page:** If a drill has zero or negligible search volume in France, DO NOT create a French page.
* **High Demand = Dedicated Country URL:** If a drill has high search demand in Brazil (`teste teclado`), build the dedicated `/pt/...` page with native keywords.
* **Universal Fallback (`x-default`):** Any country without a localized page falls back to the canonical English page (`x-default`). A visitor or bot from an unlocalized country accesses the English version seamlessly.
* **Never Auto-Redirect by IP:** Never use server-side 301/302 IP redirects to force users or bots to a locale. Search engine bots (Googlebot, Bingbot) crawl from US IPs and will be blocked from indexing foreign pages.

### Principle 2: Native Transcreation Over Machine Translation
* **Rule:** Never translate English keywords directly into foreign languages.
* Always discover what native speakers actually type into their local search engines (e.g., Japan: use `反射神経` [reflexes], NOT translated `反応速度` [reaction speed]).
* Target native queries that have **high local search volume + realistic/winnable competition**.
* **Do Not Discard Markets on One Seed:** Never write off a country because one translated keyword returned low volume. Test native synonyms, colloquial gamer terms, and hardware-specific vocabulary before making a decision.

### Principle 3: Data Integrity & Scientific Attribution Mandate
To maintain agency-grade credibility and prevent self-delusion, every report and agent run MUST follow these attribution standards:
1. **Google Autocomplete ≠ Search Volume:** Autocomplete proves that Google suggests the query due to popularity, NOT that it receives a specific number of searches per month. Never present autocomplete suggestions as volume metrics.
2. **Bing Volume ≠ Google Volume:** Bing Webmaster exact-match impressions reflect Bing search demand (~3–4% of global search). Never present a Bing API figure as Google search volume. Always state:
   > *"Bing reports exact-match volume of X/mo; Google Autocomplete confirms active query suggestion; Google-specific volume requires separate validation via GSC / Google Keyword Planner."*
3. **No Unsubstantiated "Virtually Zero Competition" Claims:** A competitor page having outdated HTML does not mean zero competition if they possess 5,000 referring domains and 10 years of domain trust. Actual SERP authority, backlink profiles, and domain ratings must be measured before claiming a ranking advantage.
4. **Country Targeting ≠ Language Targeting:** Portuguese is not automatically Brazil (`pt-BR` vs `pt-PT`). Always pair country and language explicitly (`gl=br&hl=pt`, `gl=kr&hl=ko`, `gl=jp&hl=ja`).
5. **GSC Performance Grounding:** Existing domain performance in Google Search Console must be checked before prioritizing any locale tree.

### Principle 4: Multi-Tool Research Protocol
Every optimization run must pull evidence from:
1. **Google Search Console (GSC):** Real impression, click, and query data for `skilldrills.online`.
2. **Google Trends:** Regional relative interest and seasonal demand across countries.
3. **Google Autocomplete / Suggest (via local `gl`/`hl`):** Real user query expansions and question modifiers.
4. **Bing Webmaster Tools API:** Exact-match monthly search volume by country code.
5. **Incognito Chrome Browser:** Manual SERP reverse-engineering of the Top 1–10 ranking pages in the target country to identify content gaps, schema structures, and missing features.

---

## 2. THE MANDATORY 14-STEP DEEP SERP AUDIT FRAMEWORK

For every target market and candidate keyword cluster, the following 14-step audit MUST be executed and documented before a single line of code is written:

```
Candidate Query (e.g., "teste teclado" in Brazil [gl=br, hl=pt])
  ├─ 1. Google SERP Capture: Record the Top 10 ranking URLs.
  ├─ 2. Search Intent Classification: Tool vs. Editorial vs. Review vs. Commercial.
  ├─ 3. Ranking Page Quality: Mobile UX, page speed, responsiveness, and interactive feel.
  ├─ 4. Localization Check: Is the ranking content native target language or machine-translated?
  ├─ 5. Title / H1 / Meta Audit: How do the top 3 competitors front-load keywords and CTR hooks?
  ├─ 6. Backlink & Domain Authority Profile: Estimate referring domains and domain strength.
  ├─ 7. Missing Functional & Technical Features: What is absent? (e.g., ABNT2 layout, anti-ghosting, key chatter).
  ├─ 8. People Also Ask (PAA) Extraction: Real localized questions asked by users in that country.
  ├─ 9. Autocomplete Variations & Long-Tail Extensions: Local query modifiers and intent shifts.
  ├─ 10. Competitor Feature Matrix: Direct comparison (Competitor features vs. SkillDrills capabilities).
  ├─ 11. True SERP Difficulty Score: Factoring domain authority gate vs. topical/UX advantage.
  ├─ 12. Volume Cross-Check: Bing measured exact match + GSC queries + Trends index.
  ├─ 13. Localized Keyword Cluster: Define Primary, Secondary, and Long-Tail Semantic terms.
  └─ 14. Probability of Reaching #1: Calculate win probability before deciding to build.
```

---

## 3. THE 30-POINT GLOBAL PAGE AUDIT CHECKLIST

Before any page is considered "Optimized and Ready for Production," it must pass all applicable checkpoints:

### Dimension 1: International Technical Architecture
- [ ] **1.1 Clean Locale URL:** Locale in path prefix (e.g., `/ja/drills/...`, `/ko/drills/...`, or root for English). No query strings (`?lang=ja`) or hash fragments.
- [ ] **1.2 Bidirectional `hreflang`:** Complete reciprocal matrix connecting all localized versions, self-referencing itself, plus an explicit `x-default` pointing to the English URL.
- [ ] **1.3 Self-Referencing Canonical:** Localized page canonical points to its exact own URL (e.g., `/pt/drills/...` canonical is `/pt/drills/...`, NEVER the English URL).
- [ ] **1.4 Sitemap Alternates:** URL present in `sitemap.xml` with `<xhtml:link rel="alternate" hreflang="..." href="..."/>` annotations.
- [ ] **1.5 SSR / Static Rendered HTML:** Core drill/tool canvas preview, H1, H2s, and educational guide exist in server-rendered HTML (never hidden behind client-only skeletons).
- [ ] **1.6 Core Web Vitals:** Worldwide fast delivery: TTFB < 150ms, LCP < 2.0s, CLS < 0.05.

### Dimension 2: Localized Intent & Search Intelligence
- [ ] **2.1 Measured Country Demand:** Verified monthly search volume > 0 in the target country (via Bing/GSC/Google).
- [ ] **2.2 Native Phrasing:** Primary keyword represents authentic local phrasing, idioms, and gamer terminology.
- [ ] **2.3 Local SERP Competitor Alignment:** Page format matches searcher expectations (e.g., if local competitors win with interactive tools, tool is above the fold).
- [ ] **2.4 Native Language Fidelity:** 100% of UI strings, instructions, buttons, and guides written in natural, fluent target language.

### Dimension 3: On-Page Search Architecture
- [ ] **3.1 Localized Title:** Front-loads the primary native keyword (first 40 chars), includes brand hook (`| SkillDrills`), under 60 characters / 600px.
- [ ] **3.2 Localized Meta Description:** Action-oriented, native copy, under 155 characters.
- [ ] **3.3 Single H1 & Logical Hierarchy:** Exactly one `<h1>` matching target search intent; semantic `<h2>` and `<h3>` tags structuring the content.
- [ ] **3.4 In-Language Internal Linking:** Internal links point strictly within the same language tree (e.g., `/ja/` page links to `/ja/drills`, not `/drills`).
- [ ] **3.5 Image & Asset Optimization:** Localized `alt` text on all images, canvases, and icons in the target language.

### Dimension 4: AEO (Answer Engine Optimization)
- [ ] **4.1 BLUF Direct Answer Blocks:** The first 40–60 words under each question H2 provide a direct, concise, factual definition or answer (Bottom Line Up Front).
- [ ] **4.2 Question-Based Headings:** H2s and H3s phrased as real search queries (e.g., "What is a good reaction time?", "Como testar o teclado?").
- [ ] **4.3 Structured Data Tables & Lists:** Benchmarks, norms, key mappings, and percentiles formatted in clean HTML tables and bulleted lists.
- [ ] **4.4 Zero Factual Contradictions:** All claims in page body, FAQ schema, and About page align 100% (no unsubstantiated "sub-millisecond" claims).

### Dimension 5: GEO (Generative Engine Optimization & Entity Graph)
- [ ] **5.1 Valid JSON-LD Schema:** Clean `BreadcrumbList`, `WebApplication`, and `FAQPage` schemas with valid Schema.org syntax.
- [ ] **5.2 Entity Disambiguation (`sameAs`):** Anchors target concepts to authoritative Knowledge Graph nodes (Wikidata / Wikipedia URIs) where applicable.
- [ ] **5.3 Transparent E-E-A-T Methodology:** Explains measurement methodology, browser hardware limitations, and cites scientific or testing sources.
- [ ] **5.4 Original Utility / Benchmark Hook:** Provides an instant interactive tool or proprietary benchmark data giving AI engines a compelling citation hook.
- [ ] **5.5 AI Crawlers Allowed:** `robots.txt` explicitly allows `GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, and `Google-Extended`.

### Dimension 6: Discovery, Indexing & Push
- [ ] **6.1 Automated IndexNow:** URL automatically dispatched to Bing, Yandex, and Naver upon deployment via `scripts/notify-indexnow.js`.
- [ ] **6.2 Non-Orphan Status:** URL reachable via at least 2 internal indexable links (hub pages, related drills, navigation).
- [ ] **6.3 Clean 200 HTTP Status:** No redirect chains, no 404s, `robots: { index: true, follow: true }`.

### Dimension 7: Global Authority & User Experience
- [ ] **7.1 Instant Browser Playability:** Tool interactive in 1 click; no login wall, no paywall, no intrusive modal popups.
- [ ] **7.2 Linkable Utility Moat:** High organic utility that solves an acute user problem (e.g., dead key test, aim training) worthy of forum citations.

---

## 4. THE 5-PHASE PAGE EXECUTION PROTOCOL

Whenever optimizing a drill page, follow these 5 mandatory phases in sequence:

```
PHASE 1: Demand & Market Discovery (GSC + Bing + Google Trends + Suggest)
   ↓
PHASE 2: 14-Step Local SERP Deep Audit (Incognito Chrome Top 1-10 Competitor Analysis)
   ↓
PHASE 3: Country Page Decision Gate (Demand Exists? YES -> Create /ja/, /ko/, etc. NO -> English x-default)
   ↓
PHASE 4: Implementation (Code, Metadata, BLUF Copy, Schema, Hreflang, Internal Links)
   ↓
PHASE 5: Verification & Push (Audit Checklist Review, IndexNow Submission, GSC Inspection)
```

### The Pre-Coding Gate (STRICT STOP):
* **ZERO code is written** until Phase 1 and Phase 2 are fully documented in the drill's research notes.
* If a market's true ranking probability is low due to insurmountable domain authority walls, pivot to long-tail modifiers or a different market.
